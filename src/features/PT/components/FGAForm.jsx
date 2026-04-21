import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const FGA_OPTIONS = [
  { label: "3 – Normal",              value: "3" },
  { label: "2 – Mild impairment",     value: "2" },
  { label: "1 – Moderate impairment", value: "1" },
  { label: "0 – Severe impairment",   value: "0" },
];

const row = (name, label) => ({
  type: "radio-matrix", name, label, options: FGA_OPTIONS, showInfoInRow: false,
});

function totalScore(values) {
  const keys = ["fga_1","fga_2","fga_3","fga_4","fga_5","fga_6","fga_7","fga_8","fga_9","fga_10"];
  let total = 0, answered = 0;
  keys.forEach(k => {
    const v = values[k];
    if (v !== undefined && v !== "") { total += Number(v); answered++; }
  });
  return { total, answered };
}

export default function FGAForm({ values, onChange }) {
  const schema = {
    title: "Functional Gait Assessment (FGA)",
    fields: [
      row("fga_1",  "1. Gait on a level surface"),
      row("fga_2",  "2. Change in gait speed"),
      row("fga_3",  "3. Gait with horizontal head turns"),
      row("fga_4",  "4. Gait with vertical head turns"),
      row("fga_5",  "5. Gait and pivot turn"),
      row("fga_6",  "6. Step over obstacle"),
      row("fga_7",  "7. Gait with narrow base of support"),
      row("fga_8",  "8. Gait with eyes closed"),
      row("fga_9",  "9. Ambulating backwards"),
      row("fga_10", "10. Steps"),
      {
        name: "_fga_total",
        type: "custom",
        render: ({ values }) => {
          const { total, answered } = totalScore(values);
          return (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", background: "#0369a1", borderRadius: 8, marginTop: 16
            }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Total Score</span>
              <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>
                {answered === 0 ? "— / 30" : `${total} / 30`}
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
