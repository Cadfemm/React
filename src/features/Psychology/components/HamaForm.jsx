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
      "Anxious mood - Worries, anticipation of the worst, fearful anticipation, irritability",
      "Tension - Feelings of tension, fatigability, startle response, moved to tears easily, trembling, feelings of restlessness, inability to relax",
      "Fears - Of dark, of strangers, of being left alone, of animals, of traffic, of crowds",
      "Insomnia - Difficulty in falling asleep, broken sleep, unsatisfying sleep and fatigue on waking, dreams, nightmares, night terrorsInsomnia - Difficulty falling or staying asleep",
      "Intellectual - Difficulty concentrating, poor memory",
      "Depressed mood - Loss of interest, lack of pleasure in hobbies, depression, early waking, diurnal swing",
      "Somatic (muscular) - Pains and aches, twitching, stiffness, myoclonic jerks, grinding of teeth, unsteady voice, increased muscular toneSomatic (muscular) - Aches, stiffness, twitching",
      "Somatic (sensory) - Tinnitus, blurring of vision, hot and cold flushes, feelings of weakness, pricking sensation",
      "Cardiovascular symptoms - Tachycardia, palpitations, pain in chest, throbbing of vessels, fainting feelings, missing beat",
      "Respiratory symptoms - Pressure or constriction in chest, choking feelings, sighing, dyspnea",
      "Gastrointestinal symptoms - Difficulty in swallowing, wind abdominal pain, burning sensations, abdominal fullness, nausea, vomitting, borborygmi, looseness of bowels, loss of weight, constipation",
      "Genitourinary symptoms - Frequency of micturition, urgency of micturition, amenorrhea, menorrhagia, development of frigidity, premature ejaculation, loss of libido, impotence",
      "Autonomic symptoms - Dry mouth, flushing, pallor, tendency to sweat, giddiness, tension headache, raising of hair",
      "Behavior at interview - Fidgeting, restlessness or pacing, tremor of hands, furrowed brow, strained face, sighing or rapid respiration, facial pallor, swallowing, etc."
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
      <div style={summaryWrap}>
  <div style={scoreRow}>
    <div style={scorePill}>
      TOTAL SCORE : {totalScore}
    </div>

    <div style={severityPill}>
      ANXIETY SEVERITY : {severity}
    </div>
  </div>

  <div style={submitRow}>
    <button style={submitBtn} onClick={handleSubmit}>
      Submit
    </button>
  </div>
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



