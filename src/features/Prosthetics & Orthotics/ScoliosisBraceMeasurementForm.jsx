import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

const LOWER_LIMB_FIELDS = [
  { name: "A", label: "A", top: "20%", left: "30%" },
  { name: "B", label: "B", top: "40%", left: "30%" },
  { name: "C", label: "C", top: "60%", left: "30%" },
  { name: "D", label: "D", top: "80%", left: "30%" },
  { name: "E", label: "E", top: "50%", left: "50%" },
  { name: "F", label: "F", top: "70%", left: "50%" },
  { name: "G", label: "G", top: "20%", left: "50%" },
];

const SCOLIOSIS_BRACE_MEASUREMENT_SCHEMA = {
  title: "Scoliosis Brace Measurement Form",

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
            { name: "age", label: "Menses", type: "input" },
            { name: "gender", label: "Cob Angle", type: "input" }
          ]
        },
   {
          name: "activity_level",
          label: "Scoliosis Level",
          type: "radio",
          options: [
            { label: "X-ray film copy", value: "x_ray" },
            { label: "X-ray film System", value: "system" },
            { label: "CD", value: "Cd" },
          ]
        },
      ]
    },

    /* ================= AFFECTED AREAS ================= */
    {
      title: "Affected Areas",
      fields: [
        {
          name: "affected_areas",
          type: "image-anatomy-selector",
          image: "/bodymeasure.png",
          markers: LOWER_LIMB_FIELDS
        }
      ]
    },

    /* ================= BODY MEASUREMENTS ================= */
    {
      title: "Body Measurements",
      fields: [
        {
          type: "row",
          fields: [
            { name: "chest_circumference", label: "Chest Circumference (cm)", type: "input" },
            { name: "waist_circumference", label: "Waist Circumference (cm)", type: "input" }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "hip_circumference", label: "Hip Circumference (cm)", type: "input" },
            { name: "shoulder_width", label: "Shoulder Width (cm)", type: "input" }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "axilla_to_waist", label: "Axilla to Waist (cm)", type: "input" },
            { name: "waist_to_hip", label: "Waist to Hip (cm)", type: "input" }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "sternal_notch_to_waist", label: "Sternal Notch to Waist (cm)", type: "input" },
            { name: "umbilicus_to_floor", label: "Umbilicus to Floor (cm)", type: "input" }
          ]
        }
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
        }      ]
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

export default function ScoliosisBraceMeasurementForm({
  values,
  onChange
}) {
  return (
    <CommonFormBuilder
      schema={SCOLIOSIS_BRACE_MEASUREMENT_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}