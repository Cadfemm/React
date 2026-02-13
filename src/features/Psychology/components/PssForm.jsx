import React, { useEffect, useMemo, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function PSSFormBuilder({ patient, onSubmit, onBack, layout }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scoresVisible, setScoresVisible] = useState(true);

  /* ---------------- STORAGE KEY ---------------- */
  const storageKey = patient?.id
    ? `psychology::${patient.id}::PSS`
    : null;

  /* ---------------- SCHEMA ---------------- */
  const PSS_SCHEMA = useMemo(() => {
    const optionsWithScores = [
      { label: "Never (0)", value: 0 },
      { label: "Almost never (1)", value: 1 },
      { label: "Sometimes (2)", value: 2 },
      { label: "Fairly often (3)", value: 3 },
      { label: "Very often (4)", value: 4 }
    ];
    const optionsWithoutScores = [
      { label: "Never", value: 0 },
      { label: "Almost never", value: 1 },
      { label: "Sometimes", value: 2 },
      { label: "Fairly often", value: 3 },
      { label: "Very often", value: 4 }
    ];

    return {
      title: "Perceived Stress Scale (PSS)",
      enableScoreToggle: true,
      actions: [{ type: "toggle-show-scores" }],
      sections: [
        {
          fields: [
            { name: "q1", label: "1. In the last month, how often have you been upset because of something that happened unexpectedly?" },
            { name: "q2", label: "2. In the last month, how often have you felt that you were unable to control the important things in your life?" },
            { name: "q3", label: "3. In the last month, how often have you felt nervous and stressed?" },
            { name: "q4", label: "4. In the last month, how often have you felt confident about your ability to handle your personal problems?" },
            { name: "q5", label: "5. In the last month, how often have you felt that things were going your way?" },
            { name: "q6", label: "6. In the last month, how often have you found that you could not cope with all the things that you had to do?" },
            { name: "q7", label: "7. In the last month, how often have you been able to control irritations in your life?" },
            { name: "q8", label: "8. In the last month, how often have you felt that you were on top of things?" },
            { name: "q9", label: "9. In the last month, how often have you been angered because of things that were outside of your control?" },
            { name: "q10", label: "10. In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?" }
          ].map((f, i) => ({
            ...f,
            type: "radio-matrix",
            validation: { required: true, message: "This question is required" },
            info: i === 0 && scoresVisible ? {
              title: "PSS Scale",
              content: [
                "0 – Never",
                "1 – Almost never",
                "2 – Sometimes",
                "3 – Fairly often",
                "4 – Very often"
              ]
            } : undefined,
            showInfoInRow: false,
            options: scoresVisible ? optionsWithScores : optionsWithoutScores
          }))
        }
      ]
    };
  }, [scoresVisible]);

  /* Reverse scored questions */
  const REVERSED = ["q4", "q5", "q7", "q8"];

  /* ---------------- AUTO REFILL ---------------- */
  useEffect(() => {
    if (!storageKey) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues(parsed.values || {});
      setSubmitted(false);
    }
  }, [storageKey]);

  /* ---------------- HANDLERS ---------------- */
  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: Number(value) }));
  };

  const allRequiredFilled = useMemo(() => {
    return PSS_SCHEMA.sections[0].fields.every(f => values[f.name] !== undefined);
  }, [values]);

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
      case "toggle-show-scores":
        setScoresVisible(v => !v);
        break;

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

    if (!allRequiredFilled) {
      alert("Please answer all required questions");
      return;
    }

    const payload = {
      patientId: patient?.id,
      scale: "PSS",
      values,
      totalScore,
      severity,
      submittedAt: new Date().toISOString()
    };

    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify({ values }));
    }
    console.log("PSS Submitted:", payload);
    alert("PSS submitted successfully");

    onSubmit?.(payload);
  };

  /* ---------------- UI ---------------- */
  return (
    <div style={mainContent}>
      <CommonFormBuilder
        schema={PSS_SCHEMA}
        values={values}
        onChange={onChange}
        layout="nested"
        submitted={submitted}
        onAction={handleAction}
        showScores={scoresVisible}
      >
        {/* ---------- SUMMARY ---------- */}
      {scoresVisible && (
      <div style={summaryWrap}>
  {/* Row 1: Score + Severity */}
  <div style={scoreRow}>
    <div style={scorePill}>
      Total Score: {totalScore}
    </div>

    <div style={severityPill}>
      Stress Severity: {severity}
    </div>
  </div>

  {/* Row 2: Submit button */}
  <div style={submitRow}>
    <button
      style={{
        ...submitBtn,
      }}
      disabled={!allRequiredFilled}
      onClick={handleSubmit}
    >
      Submit
    </button>
  </div>
</div>
      )}

      </CommonFormBuilder>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const mainContent = {
  margin: "0 auto",
};

const summaryWrap = {
  width: "90%",
  margin: "24px auto 0",
  padding: 20
};

const scoreRow = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap"
};
const severityPill = {
  flex: 1,
  background: "#FFF7ED",        // light orange
  border: "1px solid #FED7AA",  // orange border
  borderRadius: 10,
  padding: "14px 18px",
  fontSize: 16,
  fontWeight: 700,
   color: "#1f2937",         // dark orange text
  minWidth: 260
};


const scorePill = {
  flex: 1,
  background: "#f1f5ff",
  border: "1px solid #d6e2ff",
  borderRadius: 10,
  padding: "14px 18px",
  fontSize: 16,
  fontWeight: 700,
  color: "#1f2937",
  minWidth: 260
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

