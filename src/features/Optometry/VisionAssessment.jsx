import { useState, useCallback, memo } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

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
      type: "input",
      name: "color_vision_status",
      label: "Status"
    },
    {
      type: "attach-file",
      name: "visual_field",
      label: "Visual Field"
    },
    {
      type: "input",
      name: "visual_field_file",
      label: "Visual Field"
    },
    {
      type: "row",
      fields: [
        {
          type: "radio",
          name: "visual_field_status",
          label: "Status",
          options: [
            { label: "Pass", value: "Pass" },
            { label: "Pass With Exception", value: "Pass Exception" },
            { label: "Red Flag", value: "Red Flag" },
            { label: "Fail", value: "Fail" }
          ]
        }
      ]
    },

    {
      type: "input",
      name: "impression_management",
      label: "Clinical Findings"
    },
    {
      type: "button",
      name: "save",
      label: "Save",
      action: "save"
    }
  ]
}

const VisionAssessment = memo(function VisionAssessment({ schema, onBack, layout = "root", values: externalValues, onChange: externalOnChange }) {
  const [internalValues, setInternalValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const values = externalValues ?? internalValues;

  const internalOnChange = useCallback((name, value) => {
    setInternalValues(v => ({ ...v, [name]: value }));
  }, []);

  const onChange = externalOnChange ?? internalOnChange;

  const onAction = useCallback((type) => {
    if (type === "submit") setSubmitted(true);
    if (type === "back")   onBack?.();
  }, [onBack]);

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
});

export default VisionAssessment;
