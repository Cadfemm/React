import React, { useEffect, useMemo, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function HAM_A_FormBuilder({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  /* ---------------- STORAGE KEY ---------------- */
  const storageKey = patient
    ? `psychology_hama_draft_${patient.name}`
    : null;

  /* ---------------- SCHEMA ---------------- */
  const HAM_A_SCHEMA = {
    title: "Hamilton Anxiety Rating Scale (HAM-A )",
    actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "print", label: "Print" },
      { type: "save", label: "Save" }
    ],
    fields: [
      "Anxious mood - Worries, anticipation of the worst, irritability",
      "Tension - Feelings of tension, trembling, restlessness",
      "Fears - Of dark, strangers, being alone, crowds",
      "Insomnia - Difficulty falling or staying asleep",
      "Intellectual - Difficulty concentrating, poor memory",
      "Depressed mood - Loss of interest, early waking",
      "Somatic (muscular) - Aches, stiffness, twitching",
      "Somatic (sensory) - Tinnitus, blurred vision, flushes",
      "Cardiovascular - Palpitations, chest pain",
      "Respiratory - Chest tightness, choking sensation",
      "Gastrointestinal - Nausea, abdominal discomfort",
      "Genitourinary - Urgency, loss of libido",
      "Autonomic - Dry mouth, sweating, dizziness",
      "Behavior at interview - Restlessness, tremor"
    ].map((text, index) => ({
      name: `q${index + 1}`,
      label: `${index + 1}. ${text}`,
      type: "single-select",
      options: [
        { label: "Not present (0)", value: 0 },
        { label: "Mild (1)", value: 1 },
        { label: "Moderate (2)", value: 2 },
        { label: "Severe (3)", value: 3 },
        { label: "Very Severe (4)", value: 4 }
      ]
    }))
  };

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
  const totalScore = useMemo(
    () =>
      Object.values(values).reduce(
        (sum, v) => sum + (v ?? 0),
        0
      ),
    [values]
  );

  const severity = useMemo(() => {
    if (totalScore < 17) return "Mild";
    if (totalScore <= 24) return "Mild to Moderate";
    if (totalScore <= 30) return "Moderate to Severe";
    return "Severe";
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
        onSubmit?.({ totalScore: 0, severity: "Mild" });
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
        alert("HAM-A draft saved successfully");
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
      `HAM-A Submitted\n\nScore: ${totalScore}\nSeverity: ${severity}`
    );
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={mainContent}>
      <CommonFormBuilder
        schema={HAM_A_SCHEMA}
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
            Anxiety Severity: {severity}
          </div>

          <button style={submitBtn} onClick={handleSubmit}>
            Submit HAM-A Assessment
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
