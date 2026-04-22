import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const NORMS = {
  female: { "18-29": 2500, "30-39": 2300, "40-49": 2100, "50-59": 1900, "60+": 1700 },
  male:   { "18-29": 3000, "30-39": 2800, "40-49": 2600, "50-59": 2400, "60+": 2200 },
};

function getAgeGroup(age) {
  const a = parseInt(age);
  if (isNaN(a)) return null;
  if (a >= 18 && a <= 29) return "18-29";
  if (a >= 30 && a <= 39) return "30-39";
  if (a >= 40 && a <= 49) return "40-49";
  if (a >= 50 && a <= 59) return "50-59";
  if (a >= 60)            return "60+";
  return null;
}

function interpret(val, age, gender) {
  const v = parseFloat(val);
  if (isNaN(v) || !val) return null;
  const g   = gender?.toLowerCase().includes("f") ? "female" : "male";
  const ag  = getAgeGroup(age);
  if (!ag) return null;
  const threshold = NORMS[g][ag];
  return v >= threshold
    ? { label: "Good", bg: "#dcfce7", color: "#166534", icon: "✅", threshold }
    : { label: "Poor", bg: "#fecaca", color: "#991b1b", icon: "⚠️", threshold };
}

export default function IncentiveSpirometryForm({ values, onChange }) {
  const schema = {
    title: "Incentive Spirometry",
    fields: [
      { name: "is_value", label: "Incentive Spirometry (ml)", type: "input", placeholder: "e.g. 2400" },
      {
        name: "_is_interp",
        type: "custom",
        render: ({ values }) => {
          const age    = values["sts_age"]    || "";
          const gender = values["iso_gender"] || "male";
          const res    = interpret(values["is_value"], age, gender);

          if (!res) return (
            <div style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>
              Enter age, gender and value to see interpretation.
            </div>
          );

          const g  = gender?.toLowerCase().includes("f") ? "Female" : "Male";
          const ag = getAgeGroup(age);

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                Norm for <strong>{g}</strong>, Age <strong>{ag}</strong>: ≥ {res.threshold} ml
              </div>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 8,
                background: res.bg, color: res.color,
                fontWeight: 700, fontSize: 13, border: `1px solid ${res.color}33`,
                alignSelf: "flex-start"
              }}>
                {res.icon} {res.label}
              </span>
            </div>
          );
        }
      },
    ],
  };

  return (
    <CommonFormBuilder schema={schema} values={values} onChange={onChange} submitted={false} layout="nested" />
  );
}
