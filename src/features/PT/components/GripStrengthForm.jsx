import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

function avg(...vals) {
  const nums = vals.map(Number).filter(n => !isNaN(n) && n !== 0);
  if (!nums.length) return null;
  return parseFloat((nums.reduce((s, n) => s + n, 0) / nums.length).toFixed(2));
}

export default function GripStrengthForm({ values, onChange }) {
  const avgGripR  = avg(values.grip_t1_r,  values.grip_t2_r,  values.grip_t3_r);
  const avgGripL  = avg(values.grip_t1_l,  values.grip_t2_l,  values.grip_t3_l);
  const avgPinchR = avg(values.pinch_t1_r, values.pinch_t2_r, values.pinch_t3_r);
  const avgPinchL = avg(values.pinch_t1_l, values.pinch_t2_l, values.pinch_t3_l);

  const schema = {
    title: "Grip Strength (Dynamometer)",
    fields: [
      { type: "subheading", label: "Grip Strength (kgF)" },
      {
        type: "row",
        fields: [
          { name: "grip_t1_r", label: "Trial 1 – Right", type: "input", placeholder: "kgF" },
          { name: "grip_t1_l", label: "Trial 1 – Left",  type: "input", placeholder: "kgF" },
        ]
      },
      {
        type: "row",
        fields: [
          { name: "grip_t2_r", label: "Trial 2 – Right", type: "input", placeholder: "kgF" },
          { name: "grip_t2_l", label: "Trial 2 – Left",  type: "input", placeholder: "kgF" },
        ]
      },
      {
        type: "row",
        fields: [
          { name: "grip_t3_r", label: "Trial 3 – Right", type: "input", placeholder: "kgF" },
          { name: "grip_t3_l", label: "Trial 3 – Left",  type: "input", placeholder: "kgF" },
        ]
      },
      {
        name: "_grip_avg",
        type: "custom",
        render: ({ values }) => {
          const r = avg(values.grip_t1_r, values.grip_t2_r, values.grip_t3_r);
          const l = avg(values.grip_t1_l, values.grip_t2_l, values.grip_t3_l);
          return (
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              {[["Right", r], ["Left", l]].map(([side, val]) => (
                <div key={side} style={{
                  flex: 1, padding: "10px 14px", background: "#f0f9ff",
                  border: "1px solid #bae6fd", borderRadius: 8, textAlign: "center"
                }}>
                  <div style={{ fontSize: 12, color: "#64748b" }}>Average {side}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#0369a1" }}>
                    {val !== null ? `${val} kgF` : "—"}
                  </div>
                </div>
              ))}
            </div>
          );
        }
      },

      { type: "subheading", label: "Pinch Strength (kgF)" },
      {
        type: "row",
        fields: [
          { name: "pinch_t1_r", label: "Trial 1 – Right", type: "input", placeholder: "kgF" },
          { name: "pinch_t1_l", label: "Trial 1 – Left",  type: "input", placeholder: "kgF" },
        ]
      },
      {
        type: "row",
        fields: [
          { name: "pinch_t2_r", label: "Trial 2 – Right", type: "input", placeholder: "kgF" },
          { name: "pinch_t2_l", label: "Trial 2 – Left",  type: "input", placeholder: "kgF" },
        ]
      },
      {
        type: "row",
        fields: [
          { name: "pinch_t3_r", label: "Trial 3 – Right", type: "input", placeholder: "kgF" },
          { name: "pinch_t3_l", label: "Trial 3 – Left",  type: "input", placeholder: "kgF" },
        ]
      },
      {
        name: "_pinch_avg",
        type: "custom",
        render: ({ values }) => {
          const r = avg(values.pinch_t1_r, values.pinch_t2_r, values.pinch_t3_r);
          const l = avg(values.pinch_t1_l, values.pinch_t2_l, values.pinch_t3_l);
          return (
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              {[["Right", r], ["Left", l]].map(([side, val]) => (
                <div key={side} style={{
                  flex: 1, padding: "10px 14px", background: "#f0f9ff",
                  border: "1px solid #bae6fd", borderRadius: 8, textAlign: "center"
                }}>
                  <div style={{ fontSize: 12, color: "#64748b" }}>Average {side}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#0369a1" }}>
                    {val !== null ? `${val} kgF` : "—"}
                  </div>
                </div>
              ))}
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

export function GripOnlyForm({ values, onChange }) {
  const schema = {
    title: "Grip Strength (Dynamometer)",
    fields: [
      { type: "subheading", label: "Grip Strength (kgF)" },
      { type: "row", fields: [
        { name: "grip_t1_r", label: "Trial 1 – Right", type: "input", placeholder: "kgF" },
        { name: "grip_t1_l", label: "Trial 1 – Left",  type: "input", placeholder: "kgF" },
      ]},
      { type: "row", fields: [
        { name: "grip_t2_r", label: "Trial 2 – Right", type: "input", placeholder: "kgF" },
        { name: "grip_t2_l", label: "Trial 2 – Left",  type: "input", placeholder: "kgF" },
      ]},
      { type: "row", fields: [
        { name: "grip_t3_r", label: "Trial 3 – Right", type: "input", placeholder: "kgF" },
        { name: "grip_t3_l", label: "Trial 3 – Left",  type: "input", placeholder: "kgF" },
      ]},
      {
        name: "_grip_avg", type: "custom",
        render: ({ values }) => {
          const r = avg(values.grip_t1_r, values.grip_t2_r, values.grip_t3_r);
          const l = avg(values.grip_t1_l, values.grip_t2_l, values.grip_t3_l);
          return (
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              {[["Right", r], ["Left", l]].map(([side, val]) => (
                <div key={side} style={{ flex: 1, padding: "10px 14px", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "#64748b" }}>Average {side}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#0369a1" }}>{val !== null ? `${val} kgF` : "—"}</div>
                </div>
              ))}
            </div>
          );
        }
      },
    ],
  };
  return <CommonFormBuilder schema={schema} values={values} onChange={onChange} submitted={false} layout="nested" />;
}

export function PinchOnlyForm({ values, onChange }) {
  const schema = {
    title: "Pinch Strength (Dynamometer)",
    fields: [
      { type: "subheading", label: "Pinch Strength (kgF)" },
      { type: "row", fields: [
        { name: "pinch_t1_r", label: "Trial 1 – Right", type: "input", placeholder: "kgF" },
        { name: "pinch_t1_l", label: "Trial 1 – Left",  type: "input", placeholder: "kgF" },
      ]},
      { type: "row", fields: [
        { name: "pinch_t2_r", label: "Trial 2 – Right", type: "input", placeholder: "kgF" },
        { name: "pinch_t2_l", label: "Trial 2 – Left",  type: "input", placeholder: "kgF" },
      ]},
      { type: "row", fields: [
        { name: "pinch_t3_r", label: "Trial 3 – Right", type: "input", placeholder: "kgF" },
        { name: "pinch_t3_l", label: "Trial 3 – Left",  type: "input", placeholder: "kgF" },
      ]},
      {
        name: "_pinch_avg", type: "custom",
        render: ({ values }) => {
          const r = avg(values.pinch_t1_r, values.pinch_t2_r, values.pinch_t3_r);
          const l = avg(values.pinch_t1_l, values.pinch_t2_l, values.pinch_t3_l);
          return (
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              {[["Right", r], ["Left", l]].map(([side, val]) => (
                <div key={side} style={{ flex: 1, padding: "10px 14px", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "#64748b" }}>Average {side}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#0369a1" }}>{val !== null ? `${val} kgF` : "—"}</div>
                </div>
              ))}
            </div>
          );
        }
      },
    ],
  };
  return <CommonFormBuilder schema={schema} values={values} onChange={onChange} submitted={false} layout="nested" />;
}
