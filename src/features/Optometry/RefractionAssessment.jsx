import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function RefractionAssessment({ onBack, layout = "root" }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const RefractionAssessmentSchema = {
    title: "Refraction Assessment",
    sections: [
      {
        fields: [
          {
            name: "refraction_sections",
            type: "checkbox-group",
            options: [
              { label: "Auto-Refractor", value: "auto_refractor_file" },
              { label: "Keratometry", value: "keratometry_file" },
              { label: "Retinoscopy", value: "retinoscopy" },
              { label: "Subjective Refraction", value: "subjective_refraction" },
              { label: "Final Prescription", value: "final_prescription" }
            ]
          },
          {
            type: "row",
            fields: [
              {
                type: "attach-file",
                label: "Auto-refractor Right Ear",
                name: "auto_refractor_file",
                accept: "application/pdf,image/*",
                multiple: false,
                hideInputAfterSelect: true,
                previewSize: { width: 400, height: 400 },
              },
              {
                type: "attach-file",
                label: "Auto-refractor Left Ear",
                name: "keratometry_reading_file",
                accept: "application/pdf,image/*",
                multiple: false,
                hideInputAfterSelect: true,
                previewSize: { width: 400, height: 400 },
              }
            ],
            showIf: {
              field: "refraction_sections",
              includes: "auto_refractor_file"
            }
          },
          {
            type: "input",
            name: "auto_refractor",
            label: "Auto-refractor",
            showIf: {
              field: "refraction_sections",
              includes: "auto_refractor_file"
            }
          },
          {
            type: "row",
            fields: [
              {
                type: "attach-file",
                label: "Keratometry Right Ear",
                name: "keratometry_file_right",
                accept: "application/pdf,image/*",
                multiple: false,
                hideInputAfterSelect: true,
                previewSize: { width: 400, height: 400 },
              },
              {
                type: "attach-file",
                label: "Keratometry Left Ear",
                name: "keratometry_file_left",
                accept: "application/pdf,image/*",
                multiple: false,
                hideInputAfterSelect: true,
                previewSize: { width: 400, height: 400 },
              }
            ],
            showIf: {
              field: "refraction_sections",
              includes: "keratometry_file"
            }
          },
          {
            type: "input",
            name: "keratometry_reading",
            label: "Keratometry Reading",
            showIf: {
              field: "refraction_sections",
              includes: "keratometry_file"
            }
          },
          {
            type: "input",
            name: "retinoscopy",
            label: "Retinoscopy",
            showIf: {
              field: "refraction_sections",
              includes: "retinoscopy"
            }
          },
          {
            type: "subheading",
            label: "Subjective Refraction",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "refraction-col",
            name: "subjective_refraction",
  rows: [
              { label: "Distance", value: "distance" },
              { label: "ADD", value: "add", merge: 4 }, // merges Sphere→Prism inside EACH group
              { label: "Near", value: "near" }
            ],
            groups: [
              { label: "Right Eye", columns: ["Sphere", "Cylinder", "Axis", "Prism", "Acuity"] },
              { label: "Left Eye", columns: ["Sphere", "Cylinder", "Axis", "Prism", "Acuity"] },
              { label: "Pupil", columns: ["Distance", "Height"] }
            ],
            showIf: {
              field: "refraction_sections",
              includes: "subjective_refraction"
            }
          },


          {
            type: "subheading",
            label: "Final Prescription",
            showIf: {
              field: "refraction_sections",
              includes: "final_prescription"
            }
          },
          {
            type: "refraction-col",
            name: "final_refraction",
            rows: [
              { label: "Distance", value: "distance" },
              { label: "ADD", value: "add", merge: 4 }, // merges Sphere→Prism inside EACH group
              { label: "Near", value: "near" }
            ],
            groups: [
              { label: "Right Eye", columns: ["Sphere", "Cylinder", "Axis", "Prism", "Acuity"] },
              { label: "Left Eye", columns: ["Sphere", "Cylinder", "Axis", "Prism", "Acuity"] },
              { label: "Pupil", columns: ["Distance", "Height"] }
            ],
                showIf: {
              field: "refraction_sections",
              includes: "final_prescription"
            }
          },


          {
            type: "input",
            name: "bcva_category",
            label: "Best Corrected Visual Acuity (BCVA) – Vision Category"
          },

          {
            type: "input",
            name: "refraction_remark",
            label: "Remark"
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
