
import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function OcularHealthAssessment({ onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const OcularHealthAssessmentSchema ={
  title: "Ocular Health / Structure",
  fields: [
  {
      type: "row",
      fields: [
         {
      type: "date",
      name: "anterior_date",
      label: "Date"
    },
      ]
    },



    // {
    //   type: "row",
    //   fields: [
    //     { type: "textarea", name: "anterior_re_doc", label: "Right Eye (RE)" },
    //     { type: "textarea", name: "anterior_le_doc", label: "Left Eye (LE)" }
    //   ]
    // },

    {
      type: "grid-header",
      cols: ["Right Eye (RE)", "Left Eye (LE)", "Comment / Remark"]
    },

    // ===== FREE TEXT =====
    {
      type: "grid-row",
      name: "ac_eyelashes",
      label: "Eyelashes",
      cols: ["textarea", "textarea", "textarea"]
    },

    // ===== DROPDOWN SCALE =====
    {
      type: "grid-row",
      name: "ac_lid",
      label: "Lid",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ]
    },
    {
      type: "grid-row",
      name: "ac_conjunctiva",
      label: "Conjunctiva",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ]
    },
    {
      type: "grid-row",
      name: "ac_sclera",
      label: "Sclera",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ]
    },
    {
      type: "grid-row",
      name: "ac_iris",
      label: "Iris",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ]
    },
    {
      type: "grid-row",
      name: "ac_cornea",
      label: "Cornea",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ]
    },
    {
      type: "grid-row",
      name: "ac_crystalline_lens",
      label: "Crystalline Lens",
      cols: ["textarea", "textarea", "textarea"]
    },
    {
      type: "grid-row",
      name: "ac_depth",
      label: "Depth",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ]
    },
    {
      type: "grid-row",
      name: "ac_tears_quality",
      label: "Tears Quality",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ]
    },
    {
      type: "grid-row",
      name: "ac_other",
      label: "Other Test",
      cols: ["textarea", "textarea", "textarea"]
    },

    {
      type: "textarea",
      name: "ac_impression",
      label: "Impression / Management & Plan"
    },
    {
      type: "textarea",
      name: "ac_remark",
      label: "Remark"
    },
    // ===== Fundus Camera =====
    { type: "subheading", label: "Fundus Camera – Posterior Chamber" },

    {
      type: "row",
      fields: [
        { type: "date", name: "fundus_date", label: "Date", format: "DD/MM/YYYY" }
      ]
    },

    {
      type: "grid-header",
      cols: ["Right Eye (RE)", "Left Eye (LE)"]
    },

    {
      type: "grid-row",
      name: "fundus_images",
      label: "Fundus Images",
      cols: [
        { type: "file-upload-modal", name: "fundus_re_image", accept: "image/*,.pdf" },
        { type: "file-upload-modal", name: "fundus_le_image", accept: "image/*,.pdf" }
      ]
    },

    {
      type: "grid-row",
      name: "fundus_media",
      label: "Media",
      cols: ["input", "input"]
    },

    {
      type: "grid-row",
      name: "fundus_cd_ratio",
      label: "C/D Ratio",
      cols: ["input", "input"]
    },

    {
      type: "grid-row",
      name: "fundus_av_ratio",
      label: "A/V Ratio",
      cols: ["input", "input"]
    },

    {
      type: "grid-row",
      name: "fundus_background",
      label: "Background",
      cols: ["input", "input"]
    },

    {
      type: "grid-row",
      name: "fundus_macula",
      label: "Macula",
      cols: ["input", "input"]
    },

    {
      type: "textarea",
      name: "fundus_impression",
      label: "Impression, Management & Plan"
    },
    {
      type: "textarea",
      name: "fundus_remark",
      label: "Remark"
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
      schema={OcularHealthAssessmentSchema}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    />
  );
}
