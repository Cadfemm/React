import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

const FOOT_FIELDS = [
  { name: "lenght of foot", label: "Length of Foot", top: "20%", left: "30%" },

];

const CORRECTIVE_ACCOMMODATIVE_FOOT_ORTHOSIS_SCHEMA = {
  title: "Corrective / Accommodative Foot Orthosis Measurement Form",

  sections: [
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