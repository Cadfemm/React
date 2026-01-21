
import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function SpecialDiagnosticAssessment({ onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const OcularHealthAssessmentSchema ={
  title: "Special Diagnostic",
  sections: [
    {
      title: "Ocular Coherent Tomography",
      fields: [
        {
          type: "row",
          fields: [
            { type: "date", name: "oct_re_date", label: "Right Eye (RE) – Date of Assessment" },
            { type: "date", name: "oct_le_date", label: "Left Eye (LE) – Date of Assessment" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "file-upload-modal", name: "oct_re_file", label: "Right Eye (RE)" },
            { type: "file-upload-modal", name: "oct_le_file", label: "Left Eye (LE)" }
          ]
        },
        { type: "textarea", name: "oct_impression", label: "Impression, Management & Plan" },
        { type: "textarea", name: "oct_remark", label: "Remark" }
      ]
    },

    {
      title: "Visual Evoked Potential / Electroretinogram",
      fields: [
        {
          type: "row",
          fields: [
            { type: "date", name: "vep_re_date", label: "Right Eye (RE) – Date of Assessment" },
            { type: "date", name: "vep_le_date", label: "Left Eye (LE) – Date of Assessment" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "file-upload-modal", name: "vep_re_file", label: "Right Eye (RE)" },
            { type: "file-upload-modal", name: "vep_le_file", label: "Left Eye (LE)" }
          ]
        },
        { type: "textarea", name: "vep_impression", label: "Impression, Management & Plan" },
        { type: "textarea", name: "vep_remark", label: "Remark" }
      ]
    },

    {
      title: "Hess Chart",
      fields: [
        {
          type: "row",
          fields: [
            { type: "date", name: "hess_re_date", label: "Right Eye (RE) – Date of Assessment" },
            { type: "date", name: "hess_le_date", label: "Left Eye (LE) – Date of Assessment" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "file-upload-modal", name: "hess_re_file", label: "Right Eye (RE)" },
            { type: "file-upload-modal", name: "hess_le_file", label: "Left Eye (LE)" }
          ]
        },
        { type: "textarea", name: "hess_impression", label: "Impression, Management & Plan" },
        { type: "textarea", name: "hess_remark", label: "Remark" }
      ]
    },

    {
      title: "Right Eye Vision System",
      fields: [
        {
          type: "row",
          fields: [
            { type: "date", name: "revs_re_date", label: "Right Eye (RE) – Date of Assessment" },
            { type: "date", name: "revs_le_date", label: "Left Eye (LE) – Date of Assessment" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "file-upload-modal", name: "revs_re_file", label: "Right Eye (RE)" },
            { type: "file-upload-modal", name: "revs_le_file", label: "Left Eye (LE)" }
          ]
        },
        { type: "textarea", name: "revs_impression", label: "Impression, Management & Plan" },
        { type: "textarea", name: "revs_remark", label: "Remark" }
      ]
    },

    {
      title: "Corneal Topography",
      fields: [
        {
          type: "row",
          fields: [
            { type: "date", name: "topo_re_date", label: "Right Eye (RE) – Date of Assessment" },
            { type: "date", name: "topo_le_date", label: "Left Eye (LE) – Date of Assessment" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "file-upload-modal", name: "topo_re_file", label: "Right Eye (RE)" },
            { type: "file-upload-modal", name: "topo_le_file", label: "Left Eye (LE)" }
          ]
        },
        { type: "textarea", name: "topo_impression", label: "Impression, Management & Plan" },
        { type: "textarea", name: "topo_remark", label: "Remark" }
      ]
    },

    {
      title: "Ocular Efficiency Test / DEM Test",
      fields: [
        {
          type: "row",
          fields: [
            { type: "date", name: "dem_re_date", label: "Right Eye (RE) – Date of Assessment" },
            { type: "date", name: "dem_le_date", label: "Left Eye (LE) – Date of Assessment" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "file-upload-modal", name: "dem_re_file", label: "Right Eye (RE)" },
            { type: "file-upload-modal", name: "dem_le_file", label: "Left Eye (LE)" }
          ]
        },
        { type: "textarea", name: "dem_impression", label: "Impression, Management & Plan" },
        { type: "textarea", name: "dem_remark", label: "Remark" }
      ]
    },

    {
      title: "Automated Perimeter",
      fields: [
        { type: "input", name: "ap_equipment", label: "Equipment" },
        {
          type: "row",
          fields: [
            { type: "date", name: "ap_re_date", label: "Right Eye (RE) – Date of Assessment" },
            { type: "date", name: "ap_le_date", label: "Left Eye (LE) – Date of Assessment" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "file-upload-modal", name: "ap_re_file", label: "Right Eye (RE)" },
            { type: "file-upload-modal", name: "ap_le_file", label: "Left Eye (LE)" }
          ]
        },
        { type: "textarea", name: "ap_impression", label: "Impression, Management & Plan" },
        { type: "textarea", name: "ap_remark", label: "Remark" }
      ]
    },

    {
      title: "Microperimeter",
      fields: [
        {
          type: "row",
          fields: [
            { type: "date", name: "micro_re_date", label: "Right Eye (RE) – Date of Assessment" },
            { type: "date", name: "micro_le_date", label: "Left Eye (LE) – Date of Assessment" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "file-upload-modal", name: "micro_re_file", label: "Right Eye (RE)" },
            { type: "file-upload-modal", name: "micro_le_file", label: "Left Eye (LE)" }
          ]
        },
        { type: "textarea", name: "micro_impression", label: "Impression, Management & Plan" },
        { type: "textarea", name: "micro_remark", label: "Remark" }
      ]
    },

    {
      title: "Neuroptix Pupillometer",
      fields: [
        {
          type: "row",
          fields: [
            { type: "date", name: "np_re_date", label: "Right Eye (RE) – Date of Assessment" },
            { type: "date", name: "np_le_date", label: "Left Eye (LE) – Date of Assessment" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "file-upload-modal", name: "np_re_file", label: "Right Eye (RE)" },
            { type: "file-upload-modal", name: "np_le_file", label: "Left Eye (LE)" }
          ]
        },
        { type: "textarea", name: "np_impression", label: "Impression, Management & Plan" },
        { type: "textarea", name: "np_remark", label: "Remark" }
      ]
    },

    {
      title: "Color Vision Test",
      fields: [
        { type: "input", name: "cv_method", label: "Method" },
        {
          type: "row",
          fields: [
            { type: "date", name: "cv_re_date", label: "Right Eye (RE) – Date of Assessment" },
            { type: "date", name: "cv_le_date", label: "Left Eye (LE) – Date of Assessment" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "file-upload-modal", name: "cv_re_file", label: "Right Eye (RE)" },
            { type: "file-upload-modal", name: "cv_le_file", label: "Left Eye (LE)" }
          ]
        },
        { type: "textarea", name: "cv_impression", label: "Impression, Management & Plan" },
        { type: "textarea", name: "cv_remark", label: "Remark" }
      ]
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
      schema={OcularHealthAssessmentSchema}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    />
  );
}
