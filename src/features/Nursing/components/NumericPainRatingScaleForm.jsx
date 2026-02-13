import React, { useState, useEffect, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const SCALE_MIN = 0;
const SCALE_MAX = 10;

function parseRating(v) {
  const n = Number(v);
  if (v === "" || v == null) return null;
  if (!Number.isFinite(n) || n < SCALE_MIN || n > SCALE_MAX) return null;
  return n;
}

export default function NumericPainRatingScaleForm({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const storageKey = patient?.id
    ? `nursing_numeric_pain_scale_draft_${patient.id}`
    : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues(parsed.values || {});
      setSubmitted(false);
    }
  }, [storageKey]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

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
        alert("Numeric Pain Rating Scale draft saved successfully");
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = {
      patientId: patient?.id,
      scale: "Numeric Rating Scale (NRS) 0-10",
      values,
      submittedAt: new Date().toISOString()
    };
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify({ values }));
    }
    alert("Numeric Pain Rating Scale submitted successfully");
    onSubmit?.(payload);
  };

  const current = parseRating(values.current_pain);
  const best = parseRating(values.best_pain);
  const worst = parseRating(values.worst_pain);
  const average = useMemo(() => {
    const valid = [current, best, worst].filter(n => n != null);
    if (valid.length === 0) return null;
    return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
  }, [current, best, worst]);

  const valuesWithAverage = useMemo(
    () => ({ ...values, pain_average: average ?? "" }),
    [values, average]
  );

  const SCHEMA = {
    title: "Numeric Rating Scale (NRS) 0-10",
    sections: [
      {
        fields: [
          { name: "current_pain", label: "Current pain", type: "input", placeholder: "0–10" },
          { name: "best_pain", label: "Best pain (past 24 hours)", type: "input", placeholder: "0–10" },
          { name: "worst_pain", label: "Worst pain (past 24 hours)", type: "input", placeholder: "0–10" },
          { name: "pain_average", label: "Average pain (past 24 hours)", type: "score-box" }
        ]
      }
    ]
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={SCHEMA}
        values={valuesWithAverage}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        layout="nested"
      >
        {/* Visual scale 0–10 with severity labels */}
        <div style={{ marginTop: 24, padding: "0 16px", marginBottom: 24 }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: "#0F172A" }}>
            Numeric Rating Scale (NRS) 0-10
          </div>
          <div style={{ position: "relative", paddingTop: 8, paddingBottom: 36 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              {Array.from({ length: SCALE_MAX - SCALE_MIN + 1 }, (_, i) => SCALE_MIN + i).map(n => (
                <span key={n} style={{ width: 24, textAlign: "center", fontSize: 14, fontWeight: 600, color: "#374151" }}>
                  {n}
                </span>
              ))}
            </div>
            <div style={{ height: 4, background: "linear-gradient(to right, #22c55e 0%, #eab308 35%, #f97316 65%, #dc2626 100%)", borderRadius: 2, marginBottom: 24 }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginTop: -20 }}>
              <span>None (0)</span>
              <span>Mild (1–3)</span>
              <span>Moderate (4–6)</span>
              <span>Severe (7–10)</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              padding: "12px 34px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Submit
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}
