import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

function pfInterpret(val) {
  const v = parseFloat(val);
  if (isNaN(v) || val === "" || val === undefined) return null;
  return v >= 400
    ? { label: "Normal",    bg: "#dcfce7", color: "#166534", icon: "✅" }
    : { label: "Abnormal",  bg: "#fecaca", color: "#991b1b", icon: "⚠️" };
}

export default function PeakFlowForm({ values, onChange }) {
  const schema = {
    title: "Peak Flow Meter",
    fields: [
      { name: "pfm_value", label: "Peak Flow Meter (L/min)", type: "input", placeholder: "e.g. 420" },
      {
        name: "_pfm_interp",
        type: "custom",
        render: ({ values }) => {
          const res = pfInterpret(values["pfm_value"]);
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
              <span style={{ fontWeight: 400, fontSize: 12, marginLeft: 4 }}>
                ({parseFloat(values["pfm_value"]).toFixed(0)} L/min — {res.label === "Normal" ? "≥ 400" : "< 400"})
              </span>
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
