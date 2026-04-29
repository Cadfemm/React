import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== SCHEMA ===================== */

const TUG_SCHEMA = {
  title: "Timed Up and Go (TUG)",
  sections: [
    {
      fields: [
        {
          type: "textarea",
          name: "assistive_device",
          label: "Assistive Device and/or Bracing Used",
          helper: "Example: Walker, Cane, AFO, Knee brace, None"
        },

        { type: "subheading", label: "Timed Up and Go (TUG)" },

        {
          type: "row",
          fields: [
            { type: "input", name: "tug_trial1", label: "Trial 1 (s)", placeholder: "e.g. 12.4" },
            { type: "input", name: "tug_trial2", label: "Trial 2 (s)", placeholder: "e.g. 11.8" },
            { type: "input", name: "tug_trial3", label: "Trial 3 (s)", placeholder: "e.g. 12.1" },
          ]
        },

        {
          type: "custom",
          name: "tug_score_display",
          render: ({ values }) => {
            const t1 = parseFloat(values?.tug_trial1);
            const t2 = parseFloat(values?.tug_trial2);
            const t3 = parseFloat(values?.tug_trial3);
            const valid = [t1, t2, t3].filter(n => !isNaN(n));
            const avg = valid.length
              ? (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2)
              : "—";

            return (
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "#f9fafb",
                fontWeight: 600,
                fontSize: 14,
                marginTop: 8
              }}>
                <span style={{ color: "#0F172A" }}>TUG Average</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
                  {avg}{avg !== "—" ? " s" : ""}
                </span>
              </div>
            );
          }
        }
      ]
    }
  ]
};

/* ===================== COMPONENT ===================== */

export default function TUG({ values: externalValues, onChange: externalOnChange, layout }) {
  const [localValues, setLocalValues] = useState({});

  const values = externalValues ?? localValues;
  const onChange = externalOnChange ?? ((name, val) => setLocalValues(v => ({ ...v, [name]: val })));

  return (
    <CommonFormBuilder
      schema={TUG_SCHEMA}
      values={values}
      onChange={onChange}
      layout={layout ?? "nested"}
    />
  );
}
