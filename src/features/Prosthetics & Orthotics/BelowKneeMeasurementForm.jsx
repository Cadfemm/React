import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

const LOWER_LIMB_FIELDS = [
  { name: "A", label: "A", top: "10%", left: "45%" },
  { name: "B", label: "B", top: "20%", left: "45%" },
  { name: "C", label: "C", top: "30%", left: "45%" },
  { name: "D", label: "D", top: "40%", left: "45%" },
  { name: "E", label: "E", top: "50%", left: "45%" },
  { name: "F", label: "F", top: "60%", left: "45%" }, // Thigh
  { name: "G", label: "G", top: "70%", left: "45%" }, // Leg
  { name: "H", label: "H", top: "80%", left: "45%" }, // Foot
  { name: "I", label: "I", top: "90%", left: "45%" }, // Whole limb
  { name: "J", label: "J", top: "10%", left: "30%" },
  { name: "K", label: "K", top: "20%", left: "30%" },
  { name: "L", label: "L", top: "30%", left: "30%" },
  { name: "M", label: "M", top: "40%", left: "30%" },
];

const BELOW_KNEE_MEASUREMENT_SCHEMA = {
  title: "Below Knee Measurement Form",

  sections: [
    /* ================= PATIENT INFO ================= */
      {
      title: "Patient Details",
      fields: [
        {
          type: "row",
          fields: [
            { name: "age", label: "RN", type: "input" },
            { name: "gender", label: "IC", type: "input" }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "weight", label: "Referral Date", type: "date" },
            { name: "height", label: "Fitting Date", type: "date" }
          ]
        },
         {
          type: "row",
          fields: [
            { name: "weight", label: "Amp side", type: "input" },
            { name: "height", label: "K-level", type: "input" }
          ]
        },
              { name: "notes", label: "Notes", type: "textarea" }

      ]
    },
    /* ================= AFFECTED AREAS ================= */
    {
      title: "Affected Areas",
      fields: [
        {
          name: "affected_areas",
          type: "image-anatomy-selector",
          image: "/belowknee.png",
          markers: LOWER_LIMB_FIELDS
        }
      ]
    },

    /* ================= MEASUREMENTS ================= */
    {
      title: "Measurements",
      fields: [
        {
          type: "row",
          fields: [
            { name: "proximal_circumference", label: "Flexion angle", type: "input" },
            { name: "mid_circumference", label: "Medial AP", type: "input" }
          ]
        },
      
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
        },   {
          name: "remarks",
          label: "Notes",
          type: "textarea"
        }
      ]
    },

  
  ]
};

export default function BelowKneeMeasurementForm({
  values,
  onChange
}) {
  return (
    <CommonFormBuilder
      schema={BELOW_KNEE_MEASUREMENT_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}