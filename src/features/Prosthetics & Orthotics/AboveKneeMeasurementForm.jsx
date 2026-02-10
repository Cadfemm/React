import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";
const LOWER_LIMB_FIELDS = [
  { name: "A", label: "A" },
  { name: "B", label: "B" },
  { name: "C", label: "C" },
  { name: "D", label: "D" },
  { name: "E", label: "E" },
  { name: "F", label: "F" }, // Thigh
  { name: "G", label: "G" }, // Leg
  { name: "H", label: "H" }, // Foot
  { name: "I", label: "I" }  // Whole limb
];

const ABOVE_KNEE_MEASUREMENT_SCHEMA = {
  title: "Above Knee Measurement Form",

  sections: [
    /* ================= PATIENT INFO ================= */
    {
      title: "Patient Details",
      fields: [
        {
          type: "row",
          fields: [
            { name: "age", label: "Age", type: "input" },
            { name: "gender", label: "Gender", type: "single-select", options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" }
            ]}
          ]
        },
        {
          type: "row",
          fields: [
            { name: "weight", label: "Weight (kg)", type: "input" },
            { name: "height", label: "Height (cm)", type: "input" }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "amp_side", label: "Amp Side", type: "single-select", options: [
              { label: "Left", value: "left" },
              { label: "Right", value: "right" }
            ]},
            { name: "k_level", label: "K-Level", type: "single-select", options: [
              { label: "K1", value: "k1" },
              { label: "K2", value: "k2" },
              { label: "K3", value: "k3" },
              { label: "K4", value: "k4" }
            ]}
          ]
        }
      ]
    },

    /* ================= AFFECTED AREAS ================= */
    {
      title: "Affected Areas",
      fields: [
        {
          name: "affected_areas",
          type: "image-anatomy-selector",
          image: "/lowerlimb.png",
          markers: LOWER_LIMB_FIELDS
        }
      ]
    },

    /* ================= BALANCE & MEASUREMENTS ================= */
    {
      title: "Measurements",
      fields: [
        { name: "balance", label: "Balance", type: "input" },
        {
          type: "row",
          fields: [
            { name: "flexion_angle", label: "Flexion Angle", type: "input" },
            { name: "medial_ap", label: "Medial AP", type: "input" }
          ]
        }
      ]
    },

    /* ================= SUSPENSION SYSTEM ================= */
    {
      title: "Suspension System",
      fields: [
        {
          type: "row",
          fields: [
            { name: "pelite", label: "Pelite", type: "input" },
            { name: "pelite_comfort_gel", label: "Pelite & Comfort Gel", type: "input" }
          ]
        },
        { name: "silicone_liner", label: "Silicone Liner (Pin & Lock / Seal In)", type: "input" }
      ]
    },

    /* ================= PROCESS ================= */
    {
      title: "Process",
      fields: [
        {
          type: "row",
          fields: [
            { name: "casting", label: "Casting", type: "date" },
            { name: "assigned", label: "Assigned", type: "date" }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "filling", label: "Filling", type: "date" },
            { name: "modify", label: "Modify", type: "date" }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "moulding", label: "Moulding", type: "date" },
            { name: "finishing", label: "Finishing / Counter", type: "date" }
          ]
        },
        { name: "fitting", label: "Fitting", type: "date" }
      ]
    },

    /* ================= CIRCUMFERENCE TABLE ================= */
    {
      title: "Circumference Measurement (cm)",
      fields: [
        {
          type: "grid-table-flat",
          name: "circumference",
          headers: ["Stump", "Cast", "Reduction %", "Goal", "Final"],
          rows: [
            { key: "level_1", label: "Level 1" },
            { key: "level_2", label: "Level 2" },
            { key: "level_3", label: "Level 3" },
            { key: "level_4", label: "Level 4" }
          ]
        }
      ]
    },

    /* ================= REMARKS ================= */
    {
      title: "Notes",
      fields: [
        {
          name: "remarks",
          label: "Notes",
          type: "textarea"
        }
      ]
    }
  ]
};

export default function AboveKneeMeasurementForm({
  values,
  onChange
}) {
  return (
    <CommonFormBuilder
      schema={ABOVE_KNEE_MEASUREMENT_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}