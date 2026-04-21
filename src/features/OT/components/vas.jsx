import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const SCORE_KEYS = ["vas_pigmentation","vas_vascularity","vas_pliability","vas_height","vas_pain","vas_itchiness"];

export default function ScarAssessmentForm({ values = {}, onChange = () => {} }) {
  const total = SCORE_KEYS.reduce((sum, k) => sum + (Number(values[k]) || 0), 0);
  const answered = SCORE_KEYS.filter(k => values[k] !== undefined && values[k] !== "").length;

  const schema = {
    title: "Visual Analogue Scale (VAS)",
    fields: [
      {
        name: "vas_pigmentation", label: "Pigmentation", type: "radio",
        options: [
          { label: "Normal (0)",            value: "0" },
          { label: "Hypopigmentation (1)",  value: "1" },
          { label: "Hyperpigmentation (2)", value: "2" },
        ]
      },
      {
        name: "vas_vascularity", label: "Vascularity", type: "radio",
        options: [
          { label: "Normal (0)", value: "0" },
          { label: "Pink (1)",   value: "1" },
          { label: "Red (2)",    value: "2" },
          { label: "Purple (3)", value: "3" },
        ]
      },
      {
        name: "vas_pliability", label: "Pliability", type: "radio",
        options: [
          { label: "Normal (0)",      value: "0" },
          { label: "Supple (1)",      value: "1" },
          { label: "Firm (2)",        value: "2" },
          { label: "Banding (3)",     value: "3" },
          { label: "Contracture (4)", value: "4" },
        ]
      },
      {
        name: "vas_height", label: "Height", type: "radio",
        options: [
          { label: "Flat (0)",   value: "0" },
          { label: "< 2mm (1)", value: "1" },
          { label: "< 5mm (2)", value: "2" },
          { label: "> 5mm (3)", value: "3" },
        ]
      },
      {
        name: "vas_pain", label: "Pain", type: "radio",
        options: [
          { label: "None (0)",       value: "0" },
          { label: "Occasional (1)", value: "1" },
          { label: "Medication (2)", value: "2" },
        ]
      },
      {
        name: "vas_itchiness", label: "Itchiness", type: "radio",
        options: [
          { label: "None (0)",       value: "0" },
          { label: "Occasional (1)", value: "1" },
          { label: "Medication (2)", value: "2" },
        ]
      },
      { name: "vas_total", label: "Total Score", type: "score-box" },
    ],
  };

  const computedValues = { ...values, vas_total: answered > 0 ? total : undefined };

  return (
    <CommonFormBuilder
      schema={schema}
      values={computedValues}
      onChange={onChange}
      submitted={false}
      layout="nested"
    />
  );
}
