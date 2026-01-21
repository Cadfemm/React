import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function ClinicalSwallowingEvaluation({ onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const VisionTherapyAssessmentSchema = {
    title: "Vision Therapy Assessment",
    subtitle: "Ophthalmology / Orthoptics Evaluation",
    sections: [
      {
        title: "Subjective",
        fields: [
          { type: "subheading", label: "Refraction Assessment" },

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

          { type: "subheading", label: "Subjective Refraction" },

          {
            type: "grid-header",
            cols: ["Right Eye", "", "", "", "", "Left Eye", "", "", "", ""]
          },

          {
            type: "grid-header",
            cols: [
              "Sphere", "Cylinder", "Axis", "Prism", "Visual Acuity",
              "Sphere", "Cylinder", "Axis", "Prism", "Visual Acuity"
            ]
          },
          {
            type: "grid-row",
            name: "sr_distance",
            label: "Distance",
            cols: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
          },
          {
            type: "grid-row",
            name: "sr_add",
            label: "ADD",
            cols: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
          },
          {
            type: "grid-row",
            name: "sr_near",
            label: "Near",
            cols: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
          },
          { type: "subheading", label: "Final Prescription" },
          {
            type: "grid-header",
            cols: ["Right Eye", "", "", "", "", "Left Eye", "", "", "", "", "Pupil", ""]
          },
          {
            type: "grid-header",
            cols: [
              "Sphere", "Cylinder", "Axis", "Prism", "Visual Acuity",
              "Sphere", "Cylinder", "Axis", "Prism", "Visual Acuity",
              "Distance", "Height"
            ]
          },
          {
            type: "grid-row",
            name: "fp_distance",
            label: "Distance",
            cols: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
          },
          {
            type: "grid-row",
            name: "fp_add",
            label: "ADD",
            cols: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
          },
          {
            type: "grid-row",
            name: "fp_near",
            label: "Near",
            cols: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
          },
          {
            type: "textarea",
            name: "bcva_category",
            label: "BCVA – Vision Category"
          },
          {
            type: "textarea",
            name: "refraction_remark",
            label: "Remark"
          },
          {
             type: "single-select-dropdown",
            name: "lid",
            label: "LID",
            options: [
              { label: "Normal", value: "1" },
              { label: "Trace", value: "2" },
              { label: "Mild", value: "3" },
              { label: "Moderate", value: "4" },
              { label: "Severe", value: "5" }
            ]
          },
           {
             type: "single-select-dropdown",
            name: "conjunctiva",
            label: "Conjunctiva",
            options: [
              { label: "Normal", value: "1" },
              { label: "Trace", value: "2" },
              { label: "Mild", value: "3" },
              { label: "Moderate", value: "4" },
              { label: "Severe", value: "5" }
            ]
          },
            {
             type: "single-select-dropdown",
            name: "sclera",
            label: "Sclera",
            options: [
              { label: "Normal", value: "1" },
              { label: "Trace", value: "2" },
              { label: "Mild", value: "3" },
              { label: "Moderate", value: "4" },
              { label: "Severe", value: "5" }
            ]
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
      schema={VisionTherapyAssessmentSchema}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    />
  );
}
