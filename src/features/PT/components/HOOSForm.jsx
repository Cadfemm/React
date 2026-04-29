import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ── Option sets ── */
const FREQ_OPTIONS = [
  { label: "Never",   value: "0" },
  { label: "Monthly", value: "1" },
  { label: "Weekly",  value: "2" },
  { label: "Daily",   value: "3" },
  { label: "Always",  value: "4" },
];

const SEVERITY_OPTIONS = [
  { label: "None",     value: "0" },
  { label: "Mild",     value: "1" },
  { label: "Moderate", value: "2" },
  { label: "Severe",   value: "3" },
  { label: "Extreme",  value: "4" },
];

const LIFESTYLE_OPTIONS = [
  { label: "Not at all", value: "0" },
  { label: "Mildly",     value: "1" },
  { label: "Moderately", value: "2" },
  { label: "Severely",   value: "3" },
  { label: "Totally",    value: "4" },
];

/* ── Keys ── */
const PAIN_KEYS = ["hoos_pain_freq", "hoos_pain_flat", "hoos_pain_stairs", "hoos_pain_sitting"];
const FUNC_KEYS = [
  "hoos_func_rising", "hoos_func_standing", "hoos_func_car",
  "hoos_func_twist", "hoos_func_awareness", "hoos_func_lifestyle",
  "hoos_func_confidence", "hoos_func_difficulty",
];
const ALL_KEYS = [...PAIN_KEYS, ...FUNC_KEYS];

function sumKeys(keys, values) {
  return keys.reduce((acc, k) => acc + (Number(values?.[k]) || 0), 0);
}

function hoosScore(values) {
  const raw = sumKeys(ALL_KEYS, values);
  return (100 - ((raw / 48) * 100)).toFixed(1);
}

function ScoreBox({ label, score, color = "#2563eb" }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 16px", borderRadius: 8, background: color,
      color: "#fff", fontSize: 14, marginTop: 8,
    }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 16 }}>{score}</span>
    </div>
  );
}

const HOOS_SCHEMA = {
  title: "Hip Disability and Osteoarthritis Outcome Score (HOOS-12)",
  sections: [
    {
      fields: [
        {
          type: "label",
          label: "Instructions: Answer every question by selecting one option per row. 0 = no problem, 4 = extreme problem."
        },

        /* ── PAIN accordion ── */
        {
          type: "accordion",
          name: "hoos_pain_acc",
          label: "PAIN",
          defaultOpen: true,
          children: [
            {
              type: "radio",
              name: "hoos_pain_freq",
              label: "How often do you experience hip pain?",
              labelAbove: true,
              options: FREQ_OPTIONS,
            },
            { type: "subheading", label: "Hip pain during the last week while:" },
            {
              type: "radio-matrix",
              name: "hoos_pain_flat",
              label: "Walking on a flat surface",
              matrixHeaderLabel: "Pain level",
              options: SEVERITY_OPTIONS,
              showInfoInRow: false,
            },
            {
              type: "radio-matrix",
              name: "hoos_pain_stairs",
              label: "Going up or down stairs",
              options: SEVERITY_OPTIONS,
              showInfoInRow: false,
            },
            {
              type: "radio-matrix",
              name: "hoos_pain_sitting",
              label: "Sitting or lying",
              options: SEVERITY_OPTIONS,
              showInfoInRow: false,
            },
            {
              type: "custom",
              name: "hoos_pain_score_box",
              render: ({ values }) => (
                <ScoreBox label="Pain Subscale Score" score={`${sumKeys(PAIN_KEYS, values)} / 16`} />
              )
            },
          ]
        },

        /* ── FUNCTION accordion ── */
        {
          type: "accordion",
          name: "hoos_func_acc",
          label: "Function, Daily Living",
          defaultOpen: true,
          children: [
            {
              type: "label",
              label: "Degree of difficulty experienced in the last week due to your hip:"
            },
            {
              type: "radio-matrix",
              name: "hoos_func_rising",
              label: "Rising from sitting",
              matrixHeaderLabel: "Difficulty",
              options: SEVERITY_OPTIONS,
              showInfoInRow: false,
            },
            {
              type: "radio-matrix",
              name: "hoos_func_standing",
              label: "Standing",
              options: SEVERITY_OPTIONS,
              showInfoInRow: false,
            },
            {
              type: "radio-matrix",
              name: "hoos_func_car",
              label: "Getting in/out of car",
              options: SEVERITY_OPTIONS,
              showInfoInRow: false,
            },
            {
              type: "radio-matrix",
              name: "hoos_func_twist",
              label: "Twisting/pivoting on your injured hip",
              options: SEVERITY_OPTIONS,
              showInfoInRow: false,
            },
            {
              type: "radio",
              name: "hoos_func_awareness",
              label: "How often are you aware of your hip problem?",
              labelAbove: true,
              options: FREQ_OPTIONS,
            },
            {
              type: "radio",
              name: "hoos_func_lifestyle",
              label: "Have you modified your lifestyle to avoid activities potentially damaging to your hip?",
              labelAbove: true,
              options: LIFESTYLE_OPTIONS,
            },
            {
              type: "radio",
              name: "hoos_func_confidence",
              label: "How much are you troubled with lack of confidence in your hip?",
              labelAbove: true,
              options: LIFESTYLE_OPTIONS,
            },
            {
              type: "radio",
              name: "hoos_func_difficulty",
              label: "In general, how much difficulty do you have with your hip?",
              labelAbove: true,
              options: LIFESTYLE_OPTIONS,
            },
            {
              type: "custom",
              name: "hoos_func_score_box",
              render: ({ values }) => (
                <ScoreBox label="Function Subscale Score" score={`${sumKeys(FUNC_KEYS, values)} / 32`} />
              )
            },
          ]
        },

        /* ── Total ── */
        {
          type: "custom",
          name: "hoos_total_box",
          render: ({ values }) => (
            <ScoreBox
              label="HOOS-12 Summary Score  (0 = worst · 100 = best)"
              score={`${hoosScore(values)} / 100`}
              color="#1e3a5f"
            />
          )
        },

        {
          type: "label",
          label: "The HOOS-12 contains 12 questions scored 0–4. The summary score is converted to a 0–100 scale where 100 is the best possible outcome."
        },
      ]
    }
  ]
};

export default function HOOSForm({ values = {}, onChange }) {
  return (
    <CommonFormBuilder
      schema={HOOS_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}
