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
  { name: "I", label: "I", top: "90%", left: "45%" },  // Whole limb
  { name: "J", label: "J", top: "10%", left: "30%" },
  { name: "K", label: "K", top: "20%", left: "30%" },
  { name: "L", label: "L", top: "30%", left: "30%" },
  { name: "M", label: "M", top: "40%", left: "30%" },
  { name: "N", label: "N", top: "50%", left: "30%" },
  { name: "O", label: "O", top: "60%", left: "30%" },
  { name: "P", label: "P", top: "70%", left: "30%" },
  { name: "Q", label: "Q", top: "80%", left: "30%" },
  { name: "R", label: "R", top: "90%", left: "30%" },
  { name: "S", label: "S", top: "10%", left: "60%" },
  { name: "T", label: "T", top: "20%", left: "60%" }

];

const ANKLE_FOOT_ORTHOSIS_MEASUREMENT_SCHEMA = {
  title: "Ankle Foot Orthosis Measurement Form",

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
       { name: "diagnosis", label: "Diagnosis", type: "textarea" },
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
          image: "/anklefoot.png",
          markers: LOWER_LIMB_FIELDS
        }
      ]
    },

    // /* ================= MEASUREMENTS ================= */
    // {
    //   title: "Measurements",
    //   fields: [
    //     {
    //       type: "row",
    //       fields: [
    //         { name: "foot_length", label: "Foot Length (cm)", type: "input" },
    //         { name: "heel_width", label: "Heel Width (cm)", type: "input" }
    //       ]
    //     },
    //     {
    //       type: "row",
    //       fields: [
    //         { name: "ankle_circumference", label: "Ankle Circumference (cm)", type: "input" },
    //         { name: "midfoot_circumference", label: "Midfoot Circumference (cm)", type: "input" }
    //       ]
    //     },
    //     {
    //       type: "row",
    //       fields: [
    //         { name: "calf_circumference", label: "Calf Circumference (cm)", type: "input" },
    //         { name: "tibial_tuberosity_height", label: "Tibial Tuberosity Height (cm)", type: "input" }
    //       ]
    //     }
    //   ]
    // },

    // /* ================= ORTHOSIS DETAILS ================= */
    // {
    //   title: "Orthosis Details",
    //   fields: [
    //     {
    //       name: "orthosis_type",
    //       label: "Orthosis Type",
    //       type: "single-select",
    //       options: [
    //         { label: "Solid AFO", value: "solid_afo" },
    //         { label: "Articulated AFO", value: "articulated_afo" },
    //         { label: "Ground Reaction AFO", value: "grafo" },
    //         { label: "Dynamic AFO", value: "dynamic_afo" }
    //       ]
    //     },
    //     {
    //       type: "row",
    //       fields: [
    //         { name: "material", label: "Material", type: "input" },
    //         { name: "hinge_type", label: "Hinge Type", type: "input" }
    //       ]
    //     }
    //   ]
    // },

    /* ================= PROCESS ================= */
    {
      title: "Process",
      fields: [
        {
          type: "row",
          fields: [
            { name: "casting_date", label: "Assigned Date", type: "date" },
            { name: "fitting_date", label: "Filling Date", type: "date" }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "modification_date", label: "Modify Date", type: "date" },
            { name: "delivery_date", label: "Moulding Date", type: "date" }
          ]
        },
         {
          type: "row",
          fields: [
            { name: "finish_date", label: "Finishing Date", type: "date" },
            { name: "delivery_date", label: "Counter Date", type: "date" }
          ]
        },
        /* ================= REMARKS ================= */
       
            {
              name: "remarks",
              label: "Notes",
              type: "textarea"
            }
      ]
    },

      
    
  ]
};

export default function AnkleFootOrthosisMeasurementForm({
  values,
  onChange
}) {
  return (
    <CommonFormBuilder
      schema={ANKLE_FOOT_ORTHOSIS_MEASUREMENT_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}