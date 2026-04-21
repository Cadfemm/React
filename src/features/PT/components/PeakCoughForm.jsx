import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const PCM_RANGES = [
  { label: "Inefficient / Severe Risk", min: 0,   max: 160, bg: "#fecaca", color: "#991b1b", icon: "🔴" },
  { label: "Impaired / Risky",          min: 161, max: 270, bg: "#fed7aa", color: "#9a3412", icon: "🟠" },
  { label: "Adequate",                  min: 271, max: 359, bg: "#fef9c3", color: "#854d0e", icon: "🟡" },
  { label: "Optimal / Healthy",         min: 360, max: Infinity, bg: "#dcfce7", color: "#166534", icon: "✅" },
];

function pcmInterpret(val) {
  const v = parseFloat(val);
  if (isNaN(v) || val === "" || val === undefined) return null;
  return PCM_RANGES.find(r => v >= r.min && v <= r.max) || null;
}

export default function PeakCoughForm({ values, onChange }) {
  const schema = {
    title: "Peak Cough Meter",
    fields: [
      { name: "pcm_value", label: "Peak Cough Flow (L/min)", type: "input", placeholder: "e.g. 300" },
      {
        name: "_pcm_interp",
        type: "custom",
        render: ({ values }) => {
          const res = pcmInterpret(values["pcm_value"]);
          if (!res) return (
            <div style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>
              Enter a value to see interpretation.
            </div>
          );
          return (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 8,
              background: res.bg, color: res.color,
              fontWeight: 700, fontSize: 13, border: `1px solid ${res.color}33`
            }}>
              {res.icon} {res.label}
            </span>
          );
        }
      },
    ],
  };

  return (
    <CommonFormBuilder schema={schema} values={values} onChange={onChange} submitted={false} layout="nested" />
  );
}
