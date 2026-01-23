import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function RefractionAssessment({ onBack , layout = "root"}) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const RefractionAssessmentSchema ={
    title: "Refraction Assessment",
    // subtitle: "Ophthalmology / Orthoptics Evaluation",
    sections: [
      {
        title: "Subjective",
        fields: [
          { type: "subheading", label: "Refraction Assessment" },
{
  type: "row",
  fields: [
    {
      type: "file-upload-modal",
      label: "Auto-refractor File",
      name: "auto_refractor_file"
    },
    {
      type: "file-upload-modal",
      label: "Keratometry Reading File",
      name: "keratometry_reading_file"
    }
  ]
},

          {
                type: "textarea",
                name: "auto_refractor",
                label: "Auto-refractor"
              },

       {
                type: "textarea",
                name: "keratometry_reading",
                label: "Keratometry Reading"
              },

         {
                type: "textarea",
                name: "retinoscopy",
                label: "Retinoscopy"
              },
 
          { type: "subheading", label: "Subjective Refraction" },

         {
  type: "refraction-12col",
  name: "subjective_refraction",
  rows: [
    { label: "Distance", value: "distance" },
    { label: "ADD", value: "add" },
    { label: "Near", value: "near" }
  ],
  groups: [
    {
      label: "Right Eye",
      columns: ["Sphere", "Cylinder", "Axis", "Prism", "Acuity"]
    },
    {
      label: "Left Eye",
      columns: ["Sphere", "Cylinder", "Axis", "Prism", "Acuity"]
    },
    {
      label: "Pupil",
      columns: ["Distance", "Height"]
    }
  ]
},

          { type: "subheading", label: "Final Prescription" },

         {
  type: "refraction-12col",
  name: "final_refraction",
  rows: [
    { label: "Distance", value: "distance" },
    { label: "ADD", value: "add" },
    { label: "Near", value: "near" }
  ],
  groups: [
    {
      label: "Right Eye",
      columns: ["Sphere", "Cylinder", "Axis", "Prism", "Acuity"]
    },
    {
      label: "Left Eye",
      columns: ["Sphere", "Cylinder", "Axis", "Prism", "Acuity"]
    },
    {
      label: "Pupil",
      columns: ["Distance", "Height"]
    }
  ]
},
         

         {
                type: "textarea",
                name: "bcva_category",
                label: "Best Corrected Visual Acuity (BCVA) – Vision Category"
              },

          {
            type: "textarea",
            name: "refraction_remark",
            label: "Remark"
          },

          {
            type: "textarea",
            name: "vision_notes",
            label: "Vision"
          },
        ]
      }
    ]
  };

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("PAED IA Speech & Language", values);
    }

    if (type === "back") {
      onBack?.();   
    }
  };


  return (
    <CommonFormBuilder
      schema={RefractionAssessmentSchema}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
        layout={layout}
    />
  );
}
