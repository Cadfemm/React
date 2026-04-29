import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const SLIDER_RANGES = [
  { from: 0,  to: 2,  color: "#22c55e", label: "None"     },
  { from: 3,  to: 5,  color: "#f59e0b", label: "Moderate" },
  { from: 6,  to: 8,  color: "#f97316", label: "Severe"   },
  { from: 9,  to: 10, color: "#ef4444", label: "Worst"    },
];

const slider = (name, label) => ({
  type: "scale-slider",
  name,
  label,
  min: 0,
  max: 10,
  step: 1,
  showValue: true,
  ranges: SLIDER_RANGES,
});

const PAIN_KEYS   = ["pain_worst", "pain_lying", "pain_high_shelf", "pain_neck", "pain_push"];
const DIS_KEYS    = ["dis_hair", "dis_back", "dis_undershirt", "dis_shirt", "dis_pants", "dis_shelf", "dis_heavy", "dis_pocket"];

function sumKeys(keys, values) {
  return keys.reduce((acc, k) => acc + (Number(values?.[k]) || 0), 0);
}

function pct(score, max) {
  return `${score}/${max} = ${max > 0 ? ((score / max) * 100).toFixed(1) : "0.0"}%`;
}

const SPADI_SCHEMA = {
  title: "Shoulder Pain & Disability Index (SPADI)",
  sections: [
    {
      fields: [
        {
          type: "accordion",
          name: "spadi_pain",
          label: "PAIN",
          defaultOpen: true,
          children: [
            { type: "label", label: "0 = no pain  |  10 = worst pain imaginable" },
            slider("pain_worst",      "At its worst"),
            slider("pain_lying",      "When lying on the involved side?"),
            slider("pain_high_shelf", "Reaching for something on a high shelf?"),
            slider("pain_neck",       "Touching the back of your neck?"),
            slider("pain_push",       "Pushing with the involved arm?"),
            {
              type: "custom",
              name: "pain_total_display",
              render: ({ values }) => {
                const score = sumKeys(PAIN_KEYS, values);
                return (
                  <div style={scoreBoxStyle("#2563eb")}>
                    <span>Total Pain Score</span>
                    <span>{pct(score, 50)}</span>
                  </div>
                );
              }
            },
          ]
        },

        {
          type: "accordion",
          name: "spadi_disability",
          label: "DISABILITY",
          defaultOpen: true,
          children: [
            { type: "label", label: "0 = no difficulty  |  10 = so difficult it requires help" },
            slider("dis_hair",       "Washing your hair?"),
            slider("dis_back",       "Washing your back?"),
            slider("dis_undershirt", "Putting on an undershirt or jumper?"),
            slider("dis_shirt",      "Putting on a shirt that buttons down the front?"),
            slider("dis_pants",      "Putting on your pants?"),
            slider("dis_shelf",      "Placing an object on a high shelf?"),
            slider("dis_heavy",      "Carrying a heavy object of 10 pounds (4.5 kilograms)?"),
            slider("dis_pocket",     "Removing something from your back pocket?"),
            {
              type: "custom",
              name: "dis_total_display",
              render: ({ values }) => {
                const score = sumKeys(DIS_KEYS, values);
                return (
                  <div style={scoreBoxStyle("#2563eb")}>
                    <span>Total Disability Score</span>
                    <span>{pct(score, 80)}</span>
                  </div>
                );
              }
            },
          ]
        },

        {
          type: "custom",
          name: "spadi_total_display",
          render: ({ values }) => {
            const total = sumKeys([...PAIN_KEYS, ...DIS_KEYS], values);
            return (
              <div style={scoreBoxStyle("#1e3a5f")}>
                <span style={{ fontWeight: 700 }}>TOTAL SPADI SCORE</span>
                <span style={{ fontWeight: 700 }}>{pct(total, 130)}</span>
              </div>
            );
          }
        },
      ]
    }
  ]
};

function scoreBoxStyle(bg) {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 16px",
    borderRadius: 8,
    background: bg,
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
  };
}

export default function SPADIForm({ values = {}, onChange }) {
  return (
    <CommonFormBuilder
      schema={SPADI_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}
