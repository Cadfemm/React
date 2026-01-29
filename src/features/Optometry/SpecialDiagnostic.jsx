
import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function SpecialDiagnosticAssessment({ onBack, layout = "root" }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const OcularHealthAssessmentSchema ={
  title: "Special Diagnostic",
  sections: [
    {
      title: null,
      fields: [
        {
          type: "checkbox-group",
          name: "special_diagnostic_sections",
          options: [
            { label: "Ocular Coherent Tomography", value: "oct" },
            { label: "Visual Evoked Potential / Electroretinogram", value: "vep" },
            { label: "Hess Chart", value: "hess" },
            { label: "Right Eye Vision System", value: "revs" },
            { label: "Corneal Topography", value: "topo" },
            { label: "Ocular Efficiency Test / DEM Test", value: "dem" },
            { label: "Automated Perimeter", value: "ap" },
            { label: "Microperimeter", value: "micro" },
            { label: "Neuroptix Pupillometer", value: "np" },
            { label: "Color Vision Test", value: "cv" }
          ]
        }
      ]
    },
    {
      title: "Ocular Coherent Tomography",
      showIf: { field: "special_diagnostic_sections", includes: "oct" },
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
        { type: "input", name: "oct_impression", label: "Clinical Findings" }
      ]
    },

    {
      title: "Visual Evoked Potential / Electroretinogram",
      showIf: { field: "special_diagnostic_sections", includes: "vep" },
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
        { type: "input", name: "vep_impression", label: "Clinical Findings" }
      ]
    },

    {
      title: "Hess Chart",
      showIf: { field: "special_diagnostic_sections", includes: "hess" },
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
        { type: "input", name: "hess_impression", label: "Clinical Findings" }
      ]
    },

    {
      title: "Right Eye Vision System",
      showIf: { field: "special_diagnostic_sections", includes: "revs" },
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
        { type: "input", name: "revs_impression", label: "Clinical Findings" }
      ]
    },

    {
      title: "Corneal Topography",
      showIf: { field: "special_diagnostic_sections", includes: "topo" },
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
        { type: "input", name: "topo_impression", label: "Clinical Findings" }
      ]
    },

    {
      title: "Ocular Efficiency Test / DEM Test",
      showIf: { field: "special_diagnostic_sections", includes: "dem" },
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
        { type: "input", name: "dem_impression", label: "Clinical Findings" }
      ]
    },

    {
      title: "Automated Perimeter",
      showIf: { field: "special_diagnostic_sections", includes: "ap" },
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
        { type: "input", name: "ap_impression", label: "Clinical Findings" }
      ]
    },

    {
      title: "Microperimeter",
      showIf: { field: "special_diagnostic_sections", includes: "micro" },
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
        { type: "input", name: "micro_impression", label: "Clinical Findings" }
      ]
    },

    {
      title: "Neuroptix Pupillometer",
      showIf: { field: "special_diagnostic_sections", includes: "np" },
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
        { type: "input", name: "np_impression", label: "Clinical Findings" }
      ]
    },

    {
      title: "Color Vision Test",
      showIf: { field: "special_diagnostic_sections", includes: "cv" },
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
        { type: "input", name: "cv_impression", label: "Clinical Findings" }
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
        layout={layout}
    />
  );
}
