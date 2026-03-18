import React, { useState, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function StrengthTest() {

  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues(v => ({
      ...v,
      [name]: value
    }));
  };

  /* ================= AVERAGE FUNCTION ================= */
  const avg = (a, b, c) => {
    const nums = [a, b, c].map(Number).filter(n => !isNaN(n));
    if (nums.length === 0) return "";
    return (nums.reduce((s, n) => s + n, 0) / nums.length).toFixed(2);
  };

  /* ================= COMPUTED VALUES ================= */
  const computedValues = useMemo(() => ({
    ...values,

    /* Grip */
    grip_avg_right: avg(values.grip_trial1_Right, values.grip_trial2_Right, values.grip_trial3_Right),
    grip_avg_left: avg(values.grip_trial1_Left, values.grip_trial2_Left, values.grip_trial3_Left),

    /* Lateral */
    lateral_avg_right: avg(values.lateral_trial1_Right, values.lateral_trial2_Right, values.lateral_trial3_Right),
    lateral_avg_left: avg(values.lateral_trial1_Left, values.lateral_trial2_Left, values.lateral_trial3_Left),

    /* Tip */
    tip_avg_right: avg(values.tip_trial1_Right, values.tip_trial2_Right, values.tip_trial3_Right),
    tip_avg_left: avg(values.tip_trial1_Left, values.tip_trial2_Left, values.tip_trial3_Left),

    /* Tripod */
    tripod_avg_right: avg(values.tripod_trial1_Right, values.tripod_trial2_Right, values.tripod_trial3_Right),
    tripod_avg_left: avg(values.tripod_trial1_Left, values.tripod_trial2_Left, values.tripod_trial3_Left)

  }), [values]);

  /* ================= SCHEMA ================= */
  const SCHEMA = {
    title: "Strength Test",

    sections: [

      /* ===== GRIP ===== */
      {
        type: "subheading",
        label: "Grip Strength"
      },
      {
        type: "grid-table-flat",
        name: "grip",
        headers: ["Right", "Left"],
        rows: [
          { key: "trial1", label: "1st Trial" },
          { key: "trial2", label: "2nd Trial" },
          { key: "trial3", label: "3rd Trial" }
        ]
      },
      {
        type: "row",
        fields: [
          { type: "input", name: "grip_avg_right", label: "Average Right (kgF)", readOnly: true },
          { type: "input", name: "grip_avg_left", label: "Average Left (kgF)", readOnly: true }
        ]
      },

      /* ===== LATERAL ===== */
      {
        type: "subheading",
        label: "Lateral Pinch"
      },
      {
        type: "grid-table-flat",
        name: "lateral",
        headers: ["Right", "Left"],
        rows: [
          { key: "trial1", label: "1st Trial" },
          { key: "trial2", label: "2nd Trial" },
          { key: "trial3", label: "3rd Trial" }
        ]
      },
      {
        type: "row",
        fields: [
          { type: "input", name: "lateral_avg_right", label: "Average Right (kgF)", readOnly: true },
          { type: "input", name: "lateral_avg_left", label: "Average Left (kgF)", readOnly: true }
        ]
      },

      /* ===== TIP ===== */
      {
        type: "subheading",
        label: "Tip Pinch"
      },
      {
        type: "grid-table-flat",
        name: "tip",
        headers: ["Right", "Left"],
        rows: [
          { key: "trial1", label: "1st Trial" },
          { key: "trial2", label: "2nd Trial" },
          { key: "trial3", label: "3rd Trial" }
        ]
      },
      {
        type: "row",
        fields: [
          { type: "input", name: "tip_avg_right", label: "Average Right (kgF)", readOnly: true },
          { type: "input", name: "tip_avg_left", label: "Average Left (kgF)", readOnly: true }
        ]
      },

      /* ===== TRIPOD ===== */
      {
        type: "subheading",
        label: "Tripod Pinch"
      },
      {
        type: "grid-table-flat",
        name: "tripod",
        headers: ["Right", "Left"],
        rows: [
          { key: "trial1", label: "1st Trial" },
          { key: "trial2", label: "2nd Trial" },
          { key: "trial3", label: "3rd Trial" }
        ]
      },
      {
        type: "row",
        fields: [
          { type: "input", name: "tripod_avg_right", label: "Average Right (kgF)", readOnly: true },
          { type: "input", name: "tripod_avg_left", label: "Average Left (kgF)", readOnly: true }
        ]
      }

    ]
  };

  /* ================= RENDER ================= */
  return (
    <CommonFormBuilder
      schema={SCHEMA}
      values={computedValues}
      onChange={onChange}
    />
  );
}