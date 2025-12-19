import React, { useEffect, useMemo, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function PSSFormBuilder({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  /* ---------------- STORAGE KEY ---------------- */
  const storageKey = patient
    ? `psychology_pss_draft_${patient.name}`
    : null;

  /* ---------------- SCHEMA ---------------- */
  const PSS_SCHEMA = {
    title: "Perceived Stress Scale (PSS)",
    actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "print", label: "Print" },
      { type: "save", label: "Save" }
    ],
    fields: [
      { name: "q1", label: "In the last month, how often have you been upset because of something that happened unexpectedly?" },
      { name: "q2", label: "In the last month, how often have you felt that you were unable to control the important things in your life?" },
      { name: "q3", label: "In the last month, how often have you felt nervous and stressed?" },
      { name: "q4", label: "In the last month, how often have you felt confident about your ability to handle your personal problems?" },
      { name: "q5", label: "In the last month, how often have you felt that things were going your way?" },
      { name: "q6", label: "In the last month, how often have you found that you could not cope with all the things that you had to do?" },
      { name: "q7", label: "In the last month, how often have you been able to control irritations in your life?" },
      { name: "q8", label: "In the last month, how often have you felt that you were on top of things?" },
      { name: "q9", label: "In the last month, how often have you been angered because of things that were outside of your control?" },
      { name: "q10", label: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?" }
    ].map(f => ({
      ...f,
      type: "single-select",
      options: [
        { label: "Never (0)", value: 0 },
        { label: "Almost never (1)", value: 1 },
        { label: "Sometimes (2)", value: 2 },
        { label: "Fairly often (3)", value: 3 },
        { label: "Very often (4)", value: 4 }
      ]
    }))
  };

  /* Reverse scored questions */
  const REVERSED = ["q4", "q5", "q7", "q8"];

  /* ---------------- LOAD SAVED DRAFT ---------------- */
  useEffect(() => {
    if (!storageKey) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues(parsed.values || {});
      setSubmitted(false);
    }
  }, [storageKey]);

  /* ---------------- CHANGE ---------------- */
  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: Number(value) }));
  };

  /* ---------------- SCORE ---------------- */
  const totalScore = useMemo(() => {
    return Object.entries(values).reduce((sum, [key, value]) => {
      if (value === undefined) return sum;
      return sum + (REVERSED.includes(key) ? 4 - value : value);
    }, 0);
  }, [values]);

  const severity = useMemo(() => {
    if (totalScore <= 13) return "Low Stress";
    if (totalScore <= 26) return "Moderate Stress";
    return "High Stress";
  }, [totalScore]);

  /* ---------------- ACTION HANDLER ---------------- */
  const handleAction = (type) => {
    switch (type) {
      case "back":
        onBack?.();
        break;

      case "clear":
        setValues({});
        setSubmitted(false);
        if (storageKey) localStorage.removeItem(storageKey);
        onSubmit?.({ totalScore: 0, severity: "Low Stress" });
        break;

      case "print":
        window.print();
        break;

      case "save":
        if (!storageKey) return;

        localStorage.setItem(
          storageKey,
          JSON.stringify({
            values,
            updatedAt: new Date().toISOString()
          })
        );
        alert("PSS draft saved successfully");
        break;

      default:
        break;
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    setSubmitted(true);

    const result = { totalScore, severity };
    onSubmit?.(result);

    alert(
      `PSS Submitted\n\nScore: ${totalScore}\nSeverity: ${severity}`
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={mainContent}>
      <CommonFormBuilder
        schema={PSS_SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
      >
        {/* ---------- SUMMARY ---------- */}
        <div style={summaryWrap}>
          <div style={scoreBox}>
            Total Score: {totalScore}
          </div>

          <div style={severityBox}>
            Stress Severity: {severity}
          </div>

          <button style={submitBtn} onClick={handleSubmit}>
            Submit PSS Assessment
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const mainContent = {
  margin: "0 auto",
};

const summaryWrap = {
  marginTop: 20,
  display: "flex",
  flexDirection: "column",
  gap: 10
};

const scoreBox = {
  background: "#eef2ff",
  border: "1px solid #c7d2fe",
  padding: 12,
  borderRadius: 8,
  fontSize: 15,
  fontWeight: 700
};

const severityBox = {
  background: "#fff7ed",
  border: "1px solid #fed7aa",
  padding: 12,
  borderRadius: 8,
  fontSize: 15,
  fontWeight: 700
};

const submitBtn = {
  marginTop: 10,
  padding: "12px 26px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer"
};
