import { useState, useCallback, memo } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

const YES_NO = [
  { label: "Yes", value: "1" },
  { label: "No",  value: "0" },
];

const LSCHEMA = {
  title: "Low Vision Rehabilitation",
  sections: [{
    fields: [
      { name: "case_background_sections", label: "Case Background", type: "textarea" },

      { type: "subheading", label: "Current LVD/s" },
      { type: "grid-header", cols: ["RE", "LE", "Comments"] },
      { type: "grid-row", name: "current_lvd",        label: "Current LVD/s", cols: [{ type: "single-select", options: YES_NO }, { type: "single-select", options: YES_NO }, "input"] },
      { type: "grid-row", name: "lvd_distance",        label: "Distance",      cols: ["input", "input", "input"] },
      { type: "grid-row", name: "lvd_near",            label: "Near",          cols: ["input", "input", "input"] },

      { type: "subheading", label: "Visual Acuity" },
      { type: "grid-header", cols: ["RE", "LE", "Comments"] },
      { type: "grid-row", name: "va_distance",         label: "Distance",      cols: ["input", "input", "input"] },
      { type: "grid-row", name: "va_near",             label: "Near",          cols: ["input", "input", "input"] },
      { type: "grid-row", name: "visual_field_assessment", label: "Visual Field Assessment", cols: [{ type: "file-upload-modal" }, { type: "file-upload-modal" }, "input"] },
      { type: "grid-row", name: "contrast_sensitivity",label: "Contrast Sensitivity",       cols: ["input", "input", "input"] },

      { type: "subheading", label: "Refraction" },
      { type: "grid-header", cols: ["RE", "LE", "Comments"] },
      { type: "grid-row", name: "refraction_distance", label: "Distance",      cols: ["input", "input", "input"] },
      { type: "grid-row", name: "refraction_near",     label: "Near",          cols: ["input", "input", "input"] },
      { type: "grid-row", name: "magnification_needed",label: "Magnification Needed", cols: ["input", "input", "input"] },

      { type: "subheading", label: "Low Vision Aid Trial" },
      // { type: "grid-header", cols: ["Description", "D/N", "R/L", "VA", "Comments"] },
      // { type: "grid-row", name: "optical",     label: "Optical",     cols: ["input", "input", "input", "input", "input"] },
      // { type: "grid-row", name: "non_optical", label: "Non Optical", cols: ["input", "input", "input", "input", "input"] },
{
  type: "dynamic-section",
  name: "low_vision_aid_trial",

  fields: [
    {
      name: "type",
      label: "Type",
      type: "single-select",
      options: [
        { label: "Optical", value: "optical" },
        { label: "Non Optical", value: "non_optical" }
      ]
    },

    {
      type: "row",
      cols: 5,
      fields: [
        {
          name: "description",
          label: "Description",
          type: "input"
        },
        {
          name: "dn",
          label: "D/N",
          type: "input"
        },
        {
          name: "rl",
          label: "R/L",
          type: "input"
        },
        {
          name: "va",
          label: "VA",
          type: "input"
        },
        {
          name: "comments",
          label: "Comments",
          type: "input"
        }
      ]
    }
  ]
},
      { name: "impressions_management_plan", label: "Impression, Management & Plan", type: "textarea" },
      { name: "remarks",                     label: "Remarks",                       type: "textarea" },
      { name: "low_vision_prescription",     label: "Low Vision Prescription",       type: "textarea" },
      { name: "low_vision_followup",  label: "Low Vision Follow up", type: "radio", options: YES_NO },
      { name: "low_vision_referral",  label: "Low Vision Referral",  type: "radio", options: YES_NO },
    ],
  }],
};

const LowVisionAssessment = memo(function LowVisionAssessment({ schema, onBack, layout = "root", values: externalValues, onChange: externalOnChange }) {
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
      schema={LSCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
      layout={layout}
    />
  );
});

export default LowVisionAssessment;
