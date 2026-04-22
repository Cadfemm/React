import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const RPE_LEVELS = [
  { value: 1,  label: "Rest",                  bg: "#93c5fd", text: "#1e3a5f" },
  { value: 2,  label: "Really Easy",            bg: "#93c5fd", text: "#1e3a5f" },
  { value: 3,  label: "Easy",                   bg: "#86efac", text: "#14532d" },
  { value: 4,  label: "Moderate",               bg: "#86efac", text: "#14532d" },
  { value: 5,  label: "Challenging",            bg: "#fde68a", text: "#78350f" },
  { value: 6,  label: "Hard",                   bg: "#fde68a", text: "#78350f" },
  { value: 7,  label: "",                        bg: "#fde68a", text: "#78350f" },
  { value: 8,  label: "Really Hard",            bg: "#fb923c", text: "#fff"    },
  { value: 9,  label: "Really, Really Hard",    bg: "#fb923c", text: "#fff"    },
  { value: 10, label: "Maximal",                bg: "#ef4444", text: "#fff"    },
];

function getLevel(score) {
  return RPE_LEVELS.find(l => l.value === parseInt(score)) || null;
}

export default function RPEForm({ values, onChange }) {
  const schema = {
    title: "Rating of Perceived Exertion (RPE Scale)",
    fields: [
      {
        name: "rpe_score",
        label: "RPE Score (1–10)",
        type: "scale-slider",
        min: 1, max: 10, step: 1, showValue: true,
        ranges: [
          { min: 1,  max: 2,  label: "Rest / Really Easy", color: "#93c5fd" },
          { min: 2,  max: 4,  label: "Easy / Moderate",    color: "#86efac" },
          { min: 4,  max: 7,  label: "Challenging / Hard", color: "#fde68a" },
          { min: 7,  max: 9,  label: "Really Hard",        color: "#fb923c" },
          { min: 9,  max: 10, label: "Maximal",            color: "#ef4444" },
        ],
      },
      { name: "rpe_score", label: "Score", type: "score-box" },
    ],
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      submitted={false}
      layout="nested"
    />
  );
}
