import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

function interpret(val, threshold) {
  const v = parseFloat(val);
  if (isNaN(v) || val === "" || val === undefined) return null;
  return v >= threshold
    ? { label: "Good", bg: "#dcfce7", color: "#166534", icon: "✅" }
    : { label: "Poor", bg: "#fecaca", color: "#991b1b", icon: "⚠️" };
}

export default function ChestExpansionForm({ values, onChange }) {
  const schema = {
    title: "Chest Expansion",
    fields: [
      {
        type: "row",
        fields: [
          { name: "ce_upper",  label: "Upper Intercostal (cm)",  type: "input", placeholder: "0 – 6" },
          { name: "ce_middle", label: "Middle Intercostal (cm)", type: "input", placeholder: "0 – 6" },
          { name: "ce_lower",  label: "Lower Intercostal (cm)",  type: "input", placeholder: "0 – 6" },
        ],
      },
      {
        name: "_ce_interp",
        type: "custom",
        render: ({ values }) => {
          const rows = [
            { key: "ce_upper",  label: "Upper Intercostal",  threshold: 1.5 },
            { key: "ce_middle", label: "Middle Intercostal", threshold: 2.0 },
            { key: "ce_lower",  label: "Lower Intercostal",  threshold: 4.0 },
          ];
          const anyEntered = rows.some(r => values[r.key] !== undefined && values[r.key] !== "");
          if (!anyEntered) return null;
          return (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
              {rows.map(r => {
                const res = interpret(values[r.key], r.threshold);
                if (!res) return null;
                return (
                  <span key={r.key} style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "6px 14px", borderRadius: 8,
                    background: res.bg, color: res.color,
                    fontWeight: 700, fontSize: 13, border: `1px solid ${res.color}33`
                  }}>
                    {res.icon} {r.label}: {res.label}
                  </span>
                );
              })}
            </div>
          );
        }
      },
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
