import React, { useEffect, useMemo, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function HAM_A_FormBuilder({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [scoresVisible, setScoresVisible] = useState(true);

  /* ---------------- STORAGE KEY ---------------- */
  const storageKey = patient?.id
    ? `psychology::${patient.id}::HAMA`
    : null;

  /* ---------------- SCHEMA ---------------- */
  const HAM_A_SCHEMA = useMemo(() => {
    const optionsWithScores = [
      { label: "Not present (0)", value: 0 },
      { label: "Mild (1)", value: 1 },
      { label: "Moderate (2)", value: 2 },
      { label: "Severe (3)", value: 3 },
      { label: "Very Severe (4)", value: 4 }
    ];
    const optionsWithoutScores = [
      { label: "Not present", value: 0 },
      { label: "Mild", value: 1 },
      { label: "Moderate", value: 2 },
      { label: "Severe", value: 3 },
      { label: "Very Severe", value: 4 }
    ];

    return {
      title: "Hamilton Anxiety Rating Scale (HAM-A)",
      enableScoreToggle: true,
      actions: [{ type: "toggle-show-scores" }],
      sections: [
        {
          fields: [
            "Anxious mood - Worries, anticipation of the worst, fearful anticipation, irritability",
            "Tension - Feelings of tension, fatigability, startle response, moved to tears easily, trembling, feelings of restlessness, inability to relax",
            "Fears - Of dark, of strangers, of being left alone, of animals, of traffic, of crowds",
            "Insomnia - Difficulty in falling asleep, broken sleep, unsatisfying sleep and fatigue on waking, dreams, nightmares, night terrors",
            "Intellectual - Difficulty concentrating, poor memory",
            "Depressed mood - Loss of interest, lack of pleasure in hobbies, depression, early waking, diurnal swing",
            "Somatic (muscular) - Pains and aches, twitching, stiffness, myoclonic jerks, grinding of teeth, unsteady voice, increased muscular tone",
            "Somatic (sensory) - Tinnitus, blurring of vision, hot and cold flushes, feelings of weakness, pricking sensation",
            "Cardiovascular symptoms - Tachycardia, palpitations, pain in chest, throbbing of vessels, fainting feelings, missing beat",
            "Respiratory symptoms - Pressure or constriction in chest, choking feelings, sighing, dyspnea",
            "Gastrointestinal symptoms - Difficulty in swallowing, wind abdominal pain, burning sensations, abdominal fullness, nausea, vomitting, borborygmi, looseness of bowels, loss of weight, constipation",
            "Genitourinary symptoms - Frequency of micturition, urgency of micturition, amenorrhea, menorrhagia, development of frigidity, premature ejaculation, loss of libido, impotence",
            "Autonomic symptoms - Dry mouth, flushing, pallor, tendency to sweat, giddiness, tension headache, raising of hair",
            "Behavior at interview - Fidgeting, restlessness or pacing, tremor of hands, furrowed brow, strained face, sighing or rapid respiration, facial pallor, swallowing, etc."
          ].map((text, index) => {
            const parts = text.split(" - ");
            const questionLabel = parts[0]; // Part before dash
            const description = parts[1] || ""; // Part after dash
            
            let info = undefined;
            let rowInfo = undefined;
            
            if (index === 0) {
              // First question: Scale info for header (only when Doctor View ON), description for row (always)
              if (scoresVisible) {
                info = {
                  title: "HAM-A Scale",
                  content: [
                    "0 – Not present",
                    "1 – Mild",
                    "2 – Moderate",
                    "3 – Severe",
                    "4 – Very Severe"
                  ]
                };
              }
              if (description) {
                rowInfo = {
                  title: `1. ${questionLabel}`,
                  content: [description]
                };
              }
            } else if (description) {
              // All other questions: Use description after dash as row info (always show)
              rowInfo = {
                title: `${index + 1}. ${questionLabel}`,
                content: [description]
              };
            }
            
            return {
              name: `q${index + 1}`,
              label: `${index + 1}. ${questionLabel}`,
              type: "radio-matrix",
              validation: { required: true, message: "This question is required" },
              info: info,
              rowInfo: rowInfo,
              showInfoInRow: true,
              options: scoresVisible ? optionsWithScores : optionsWithoutScores
            };
          })
        }
      ]
    };
  }, [scoresVisible]);

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
    return HAM_A_SCHEMA.sections[0].fields.every(f => values[f.name] !== undefined);
  }, [values, HAM_A_SCHEMA]);

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
        layout="nested"
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        showScores={scoresVisible}
      >
      {scoresVisible && (
      <div style={summaryWrap}>
  <div style={scoreRow}>
    <div style={scorePill}>
      TOTAL SCORE : {totalScore}
    </div>

    <div style={severityPill}>
      ANXIETY SEVERITY : {severity}
    </div>
  </div>
</div>
      )}

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



