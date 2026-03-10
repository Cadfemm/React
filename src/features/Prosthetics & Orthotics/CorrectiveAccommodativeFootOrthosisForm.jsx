import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

const FOOT_FIELDS = [
  { name: "lenght of foot", label: "Length of Foot", top: "20%", left: "30%" },

];
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
const CORRECTIVE_ACCOMMODATIVE_FOOT_ORTHOSIS_SCHEMA = {
  title: "Corrective / Accommodative Foot Orthosis Measurement Form",

  sections: [
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

    /* ================= AFFECTED AREAS ================= */
    {
      title: "Affected Areas",
      fields: [
        
        {
          name: "affected_areas",
          type: "image-anatomy-selector",
          image: "/foot.png",
          markers: FOOT_FIELDS,
          width: "small",
          height: "small"
        },
         { name: "type of insole", label: "Type of Insole", type: "radio", options: [
              { label: "hight arch insole", value: "high arch insole" },
              { label: "low arch insole", value: "low arch insole" },
              { label: "total arch insole", value: "total arch insole" },
            ]}
      ]

    },



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

export default function CorrectiveAccommodativeFootOrthosisForm({
  values,
  onChange
}) {
  return (
    <CommonFormBuilder
      schema={CORRECTIVE_ACCOMMODATIVE_FOOT_ORTHOSIS_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}