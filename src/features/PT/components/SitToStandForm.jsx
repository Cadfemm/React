import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ── Norms table ── */
const NORMS = {
  female: {
    "60-64": { below: 12, avgLow: 12, avgHigh: 17 },
    "65-69": { below: 11, avgLow: 11, avgHigh: 16 },
    "70-74": { below: 10, avgLow: 10, avgHigh: 15 },
    "75-79": { below: 10, avgLow: 10, avgHigh: 15 },
    "80-84": { below: 9,  avgLow: 9,  avgHigh: 14 },
    "85-89": { below: 8,  avgLow: 8,  avgHigh: 13 },
    "90-94": { below: 4,  avgLow: 4,  avgHigh: 11 },
  },
  male: {
    "60-64": { below: 14, avgLow: 14, avgHigh: 19 },
    "65-69": { below: 12, avgLow: 12, avgHigh: 18 },
    "70-74": { below: 12, avgLow: 12, avgHigh: 18 },
    "75-79": { below: 11, avgLow: 11, avgHigh: 17 },
    "80-84": { below: 10, avgLow: 10, avgHigh: 16 },
    "85-89": { below: 8,  avgLow: 8,  avgHigh: 15 },
    "90-94": { below: 7,  avgLow: 7,  avgHigh: 14 },
  },
};

function getAgeGroup(age) {
  const a = parseInt(age);
  if (isNaN(a)) return null;
  if (a >= 60 && a <= 64) return "60-64";
  if (a >= 65 && a <= 69) return "65-69";
  if (a >= 70 && a <= 74) return "70-74";
  if (a >= 75 && a <= 79) return "75-79";
  if (a >= 80 && a <= 84) return "80-84";
  if (a >= 85 && a <= 89) return "85-89";
  if (a >= 90 && a <= 94) return "90-94";
  return null;
}

function getInterpretation(score, gender, age) {
  const g = gender?.toLowerCase().includes("f") ? "female" : "male";
  const ag = getAgeGroup(age);
  if (!ag || score === undefined || score === null || score === "") return null;
  const norm = NORMS[g]?.[ag];
  if (!norm) return null;
  const s = parseInt(score);
  if (s < norm.below)   return { label: "Below Average",  color: "#ef4444", bg: "#fecaca", note: "Risk for falls" };
  if (s <= norm.avgHigh) return { label: "Average",        color: "#d97706", bg: "#fef9c3", note: "Normal range"   };
  return                        { label: "Above Average",  color: "#16a34a", bg: "#dcfce7", note: "Good performance"};
}

export default function SitToStandForm({ values, onChange }) {
  const gender = values["sts_gender"] || values["iso_gender"] || "male";
  const age    = values["sts_age"]    || values["patient_age"] || "";
  const score  = values["sts_score"];
  const interp = getInterpretation(score, gender, age);

  const ageGroup = getAgeGroup(age);
  const g = gender?.toLowerCase().includes("f") ? "female" : "male";
  const norm = ageGroup ? NORMS[g]?.[ageGroup] : null;

  const schema = {
    title: "30-Second Sit-to-Stand Test",
    fields: [
      /* Patient info row */
      {
        type: "row",
        fields: [
          { name: "sts_age",    label: "Patient Age",  type: "input", placeholder: "e.g. 72" },
          {
            name: "sts_gender", label: "Gender", type: "radio",
            options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }]
          },
        ]
      },

      /* Score slider 0–25 step 1 */
      {
        name: "sts_score",
        label: "Number of Stands Completed (0–25)",
        type: "scale-slider",
        min: 0, max: 25, step: 1, showValue: true,
        ranges: [
          { min: 0,  max: 8,  label: "Below Average", color: "#ef4444" },
          { min: 8,  max: 17, label: "Average",        color: "#f59e0b" },
          { min: 17, max: 25, label: "Above Average",  color: "#22c55e" },
        ],
      },

      /* Score display */
      { name: "sts_score", label: "Score", type: "score-box" },

      /* Interpretation — custom render */
      {
        name: "_sts_interp",
        type: "custom",
        render: ({ values }) => {
          const sc   = values["sts_score"];
          const gen  = values["sts_gender"] || values["iso_gender"] || "male";
          const ag   = values["sts_age"] || "";
          const res  = getInterpretation(sc, gen, ag);
          const ageG = getAgeGroup(ag);
          const gKey = gen?.toLowerCase().includes("f") ? "female" : "male";
          const nr   = ageG ? NORMS[gKey]?.[ageG] : null;

          return (
            <div style={{ marginTop: 12 }}>
              {/* Norm reference */}
              {nr && (
                <div style={{
                  padding: "10px 14px", background: "#f0f9ff",
                  border: "1px solid #bae6fd", borderRadius: 8, marginBottom: 10,
                  fontSize: 13, color: "#0369a1"
                }}>
                  <strong>Norm for {gKey === "female" ? "Female" : "Male"}, Age {ageG}:</strong>
                  &nbsp; Below Average: &lt;{nr.below} &nbsp;|&nbsp;
                  Average: {nr.avgLow}–{nr.avgHigh} &nbsp;|&nbsp;
                  Above Average: &gt;{nr.avgHigh}
                </div>
              )}

              {/* Interpretation badge */}
              {res ? (
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", background: res.bg,
                  border: `1px solid ${res.color}`, borderRadius: 8
                }}>
                  <span style={{ fontSize: 22 }}>
                    {res.label === "Below Average" ? "⚠️" : res.label === "Average" ? "✅" : "🏆"}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: res.color }}>{res.label}</div>
                    <div style={{ fontSize: 12, color: "#374151" }}>{res.note}</div>
                  </div>
                  <div style={{
                    marginLeft: "auto", fontWeight: 800, fontSize: 20, color: res.color
                  }}>
                    {sc ?? "—"}
                  </div>
                </div>
              ) : (
                <div style={{ color: "#94a3b8", fontSize: 13, fontStyle: "italic" }}>
                  Enter age, gender and score to see interpretation.
                </div>
              )}
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
