
import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

function calculateVF(values) {
  const nums = Object.keys(values)
    .filter(k => k.startsWith("vf_tasks_"))
    .map(k => Number(values[k]))
    .filter(v => !isNaN(v));

  const sum = nums.reduce((s, v) => s + v, 0);

  let impairment = "";
  if (sum <= 5) impairment = "Very severe impairment";
  else if (sum <= 16) impairment = "Severe impairment";
  else if (sum <= 41) impairment = "Moderate impairment";
  else if (sum <= 51) impairment = "Mild impairment";
  else impairment = "No visual impairment";

  const vfScore = Math.round((sum / 55) * 100);

  return { sum, impairment, vfScore };
}




export default function VisualFunctionForm({schema, layout = "root"}) {
  const [values, setValues] = React.useState({});

  const handleChange = (name, value) => {
    const next = { ...values, [name]: value };

    const { sum, impairment, vfScore } = calculateVF(next);
    next.vf_sum = sum;
    next.vf_impairment = impairment;
    next.vf_score = vfScore;

    setValues(next);
  };
  return (
    <>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={handleChange}
        layout={layout}
      />

      <div style={{ display: "flex", gap: 16, margin: 24 }}>
        <div style={pill}>Sum of Points: {values.vf_sum || 0}</div>
        <div style={pill}>Impairment: {values.vf_impairment || "-"}</div>
        <div style={pill}>VF Score: {values.vf_score || 0}</div>
      </div>
    </>
  );
}

const pill = {
  padding: "14px 18px",
  borderRadius: 12,
  border: "1px solid #CBD5E1",
  fontWeight: 700,
  minWidth: 200
};
