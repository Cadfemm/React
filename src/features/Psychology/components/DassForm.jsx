import React, { useState, useEffect, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function DASSFormBuilder({ patient, onSubmit, onBack }) {
  const DEPRESSION = ["q3", "q5", "q10", "q13", "q16", "q17", "q21"];
  const ANXIETY = ["q2", "q4", "q7", "q9", "q15", "q19", "q20"];
  const STRESS = ["q1", "q6", "q8", "q11", "q12", "q14", "q18"];

  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  /* ================= STORAGE KEY ================= */
  const storageKey = patient?.id
    ? `psychology::${patient.id}::DASS`
    : null;

  /* ================= SCHEMA ================= */
  const DASS_SCHEMA = {
    title: "Depression Anxiety Stress Scale (DASS)",
    actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "print", label: "Print" },
      { type: "save", label: "Save" }
    ],
    fields: [
      { name: "q1", label: "I found it hard to wind down." },
      { name: "q2", label: "I was aware of dryness of my mouth." },
      { name: "q3", label: "I couldn’t seem to experience any positive feeling at all." },
      { name: "q4", label: "I experienced breathing difficulty." },
      { name: "q5", label: "I found it difficult to work up the initiative to do things." },
      { name: "q6", label: "I tended to over-react to situations." },
      { name: "q7", label: "I experienced trembling." },
      { name: "q8", label: "I felt that I was using a lot of nervous energy." },
      { name: "q9", label: "I was worried about situations in which I might panic." },
      { name: "q10", label: "I felt that I had nothing to look forward to." },
      { name: "q11", label: "I found myself getting agitated." },
      { name: "q12", label: "I found it difficult to relax." },
      { name: "q13", label: "I felt down-hearted and blue." },
      { name: "q14", label: "I was intolerant of anything that kept me from getting on." },
      { name: "q15", label: "I felt I was close to panic." },
      { name: "q16", label: "I was unable to become enthusiastic." },
      { name: "q17", label: "I felt I wasn’t worth much as a person." },
      { name: "q18", label: "I felt that I was rather touchy." },
      { name: "q19", label: "I was aware of the action of my heart." },
      { name: "q20", label: "I felt scared without any good reason." },
      { name: "q21", label: "I felt that life was meaningless." }
    ].map(f => ({
      ...f,
      type: "single-select",
      validation: { required: true, message: "This question is required" },
      options: [
        { label: "Did not apply to me at all (0)", value: 0 },
        { label: "Applied some of the time (1)", value: 1 },
        { label: "Applied a good part of time (2)", value: 2 },
        { label: "Applied most of the time (3)", value: 3 }
      ]
    }))
  };

  /* ================= AUTO REFILL ================= */
  useEffect(() => {
    if (!storageKey) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues(parsed.values || {});
      setSubmitted(false);
    }
  }, [storageKey]);

  /* ================= HANDLERS ================= */
  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: Number(value) }));
  };

  const calc = keys =>
    keys.reduce((sum, k) => sum + (values[k] ?? 0), 0);

  const scores = useMemo(() => ({
    depression: calc(DEPRESSION),
    anxiety: calc(ANXIETY),
    stress: calc(STRESS)
  }), [values]);

  const severity = (score, type) => {
    const ranges = {
      depression: [[9, "Normal"], [13, "Mild"], [20, "Moderate"], [27, "Severe"], [Infinity, "Extremely Severe"]],
      anxiety: [[7, "Normal"], [9, "Mild"], [14, "Moderate"], [19, "Severe"], [Infinity, "Extremely Severe"]],
      stress: [[14, "Normal"], [18, "Mild"], [25, "Moderate"], [33, "Severe"], [Infinity, "Extremely Severe"]]
    };
    return ranges[type].find(r => score <= r[0])[1];
  };

  const allRequiredFilled = () =>
    DASS_SCHEMA.fields.every(f => values[f.name] !== undefined);

  /* ================= ACTIONS ================= */
  const handleAction = (type) => {
    switch (type) {
      case "back":
        onBack?.();
        break;

      case "clear":
        setValues({});
        setSubmitted(false);
        if (storageKey) localStorage.removeItem(storageKey);
        break;

      case "save":
        if (!storageKey) return;
        localStorage.setItem(
          storageKey,
          JSON.stringify({ values, updatedAt: new Date().toISOString() })
        );
        alert("Draft saved successfully");
        break;

      case "print":
        window.print();
        break;

      default:
        break;
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    setSubmitted(true);

    if (!allRequiredFilled()) {
      alert("Please answer all required questions");
      return;
    }

    const payload = {
      patientId: patient.id,
      scale: "DASS-21",
      values,
      scores,
      submittedAt: new Date().toISOString()
    };

    localStorage.setItem(storageKey, JSON.stringify({ values }));
    console.log("DASS Submitted:", payload);
    alert("DASS-21 submitted successfully");

    onSubmit?.(payload);
  };

  return (
    <div style={mainContent}>
      <CommonFormBuilder
        schema={DASS_SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
      >
        <div style={scoreRow}>
          {["depression", "anxiety", "stress"].map(type => (
            <div key={type} style={scoreBox}>
              {type.toUpperCase()} SCORE : {scores[type]} ({severity(scores[type], type)})
            </div>
          ))}
        </div>

        <div style={submitRow}>
          <button
            style={{
              ...submitBtn,
          
            }}
            disabled={!allRequiredFilled()}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}

/* ================= STYLES ================= */

const mainContent = { margin: "0 auto" };

const scoreRow = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginTop: 16
};

const scoreBox = {
  background: "#f1f5ff",
  border: "1px solid #d6e2ff",
  borderRadius: 6,
  padding: "6px 12px",
  fontSize: 14,
  fontWeight: 600
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 24
};

const submitBtn = {
  padding: "12px 34px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700
};
