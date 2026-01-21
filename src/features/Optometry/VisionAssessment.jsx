import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function VisionAssessment({ onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const VisionTherapyAssessmentSchema ={
  title: "Vision for Driving",
  fields: [
    { type: "subheading", label: "Vision for Driving" },

    {
      type: "row",
      fields: [
        {
          type: "input",
          name: "visual_acuity_aided",
          label: "Visual Acuity – Aided"
        },
        {
          type: "input",
          name: "visual_acuity_unaided",
          label: "Visual Acuity – Unaided"
        }
      ]
    },

    {
      type: "row",
      fields: [
        {
          type: "input",
          name: "color_vision",
          label: "Color Vision"
        },
        {
          type: "textarea",
          name: "color_vision_status",
          label: "Status"
        }
      ]
    },

    {
      type: "row",
      fields: [
        {
          type: "input",
          name: "visual_field",
          label: "Visual Field"
        },
        {
          type: "textarea",
          name: "visual_field_file",
          label: "pdf/image"
        }
      ]
    },

    {
      type: "row",
      fields: [
        {
          type: "single-select",
          name: "visual_field_status",
          label: "Status",
          options: [
            { label: "Pass/ Pass w Exception/ Red Flag/ Fail", value: "pass_exception_fail" }
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
    />
  );
}
