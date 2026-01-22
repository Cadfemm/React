import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function VisionAssessment({ onBack, layout = "root" }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const VisionTherapyAssessmentSchema = {
    title: "Vision for Driving",
    fields: [
      { type: "subheading", label: "Visual Acuity" },
      {
        type: "grid-header",
        cols: ["Right Eye (RE)", "Left Eye (LE)"]
      },
      {
        type: "grid-row",
        name: "va_aided",
        label: "Aided",
        cols: ["RE", "LE"]
      },
      {
        type: "grid-row",
        name: "va_unaided",
        label: "Unaided",
        cols: ["RE", "LE"]
      },
      {
        type: "radio",
        name: "color_vision",
        label: "Color Vision",
         options: [
              { label: "Passed", value: "Passed" },
              { label: "Failed", value: "Failed" }
            ]
      },
      {
        type: "textarea",
        name: "color_vision_status",
        label: "Status"
      },
      {
        type: "file-upload-modal",
        name: "visual_field",
        label: "Visual Field"
      },
      {
        type: "textarea",
        name: "visual_field_file",
        label: "Visual Field"
      },
      {
        type: "row",
        fields: [
          {
            type: "single-select",
            name: "visual_field_status",
            label: "Status",
            options: [
              { label: "Pass", value: "Pass" },
              { label: "Pass  Exception", value: "Pass Exception" },
              { label: "Red Flag", value: "Red Flag" },
              { label: "Fail", value: "Fail" }
            ]
          }
        ]
      },

      {
        type: "textarea",
        name: "impression_management",
        label: "Impression, Management & Plan"
      },

      {
        type: "textarea",
        name: "driving_remark",
        label: "Remark"
      }
    ]
  }

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
      layout={layout}
    />
  );
}
