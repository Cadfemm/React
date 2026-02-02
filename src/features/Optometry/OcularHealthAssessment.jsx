
import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function OcularHealthAssessment({ onBack , layout = "root"}) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const OcularHealthAssessmentSchema ={
  title: "Ocular Health / Structure",
  fields: [
    {
      type: "checkbox-group",
      name: "ocular_health_sections",
      options: [
        { label: "Slit Lamp - Anterior Chamber", value: "slit_lamp_anterior" },
        { label: "Fundus Camera – Posterior Chamber", value: "fundus_camera_posterior" }
      ]
    },

    { 
      type: "subheading", 
      label: "Slit Lamp - Anterior Chamber",
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },

 {
      type: "row",
      fields: [
        { type: "date", name: "anterior_date", label: "Date", format: "DD/MM/YYYY" }
      ],
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },
{
  type: "row",
  name: "Eyelashes_Images",
  label: "Eyelashes",
  fields: [
    {
      type: "attach-file",
      label: "Eyelashes Image (LE)",
      name: "Eyelashes_Images_le",
      accept: "image/*,.pdf"
    },
    {
      type: "attach-file",
      label: "Eyelashes Image (RE)",
      name: "Eyelashes_Images_re",
      accept: "image/*,.pdf"
    },
  ],
  showIf: {
    field: "ocular_health_sections",
    includes: "slit_lamp_anterior"
  }
},
{
  type: "textarea",
  label: "Eyelashes Remark",
  name: "Eyelashes_remark",
  placeholder: "Enter findings / remarks...",
    showIf: {
    field: "ocular_health_sections",
    includes: "slit_lamp_anterior"
  }
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
      cols: ["Right Eye (RE)", "Left Eye (LE)", "Comment / Remark"],
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },
     

    // ===== FREE TEXT =====
    // {
    //   type: "grid-row",
    //   name: "ac_eyelashes",
    //   label: "Eyelashes",
    //   cols: ["textarea", "textarea", "textarea"],
    //   showIf: {
    //     field: "ocular_health_sections",
    //     includes: "slit_lamp_anterior"
    //   }
    // },

    // ===== DROPDOWN SCALE =====
    {
      type: "grid-row",
      name: "ac_lid",
      label: "Lid",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ],
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },
    {
      type: "grid-row",
      name: "ac_conjunctiva",
      label: "Conjunctiva",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ],
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },
    {
      type: "grid-row",
      name: "ac_sclera",
      label: "Sclera",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ],
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },
    {
      type: "grid-row",
      name: "ac_iris",
      label: "Iris",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ],
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },
    {
      type: "grid-row",
      name: "ac_cornea",
      label: "Cornea",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ],
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },
    {
      type: "grid-row",
      name: "ac_crystalline_lens",
      label: "Crystalline Lens",
      cols: ["textarea", "textarea", "textarea"],
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },
    {
      type: "grid-row",
      name: "ac_depth",
      label: "Depth",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ],
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },
    {
      type: "grid-row",
      name: "ac_tears_quality",
      label: "Tears Quality",
      cols: [
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        { type: "single-select", options: ["0 - Normal", "1 - Trace", "2 - Mild", "3 - Moderate", "4 - Severe"] },
        "textarea"
      ],
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },
    {
      type: "grid-row",
      name: "ac_other",
      label: "Other Test",
      cols: ["textarea", "textarea", "textarea"],
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },

    {
      type: "input",
      name: "ac_impression",
      label: "Clinical Findings",
      showIf: {
        field: "ocular_health_sections",
        includes: "slit_lamp_anterior"
      }
    },
    // ===== Fundus Camera =====
    { 
      type: "subheading", 
      label: "Fundus Camera – Posterior Chamber",
      showIf: {
        field: "ocular_health_sections",
        includes: "fundus_camera_posterior"
      }
    },

    {
      type: "row",
      fields: [
        { type: "date", name: "fundus_date", label: "Date", format: "DD/MM/YYYY" }
      ],
      showIf: {
        field: "ocular_health_sections",
        includes: "fundus_camera_posterior"
      }
    },

    {
  type: "row",
  name: "fundus_images",
  label: "Fundus Images",
  fields: [
    {
      type: "attach-file",
      label: "Fundus Images (LE)",
      name: "fundus_images_le",
      accept: "image/*,.pdf"
    },
    {
      type: "attach-file",
      label: "Fundus Images (RE)",
      name: "fundus_images_re",
      accept: "image/*,.pdf"
    },
  ],
  showIf: {
 field: "ocular_health_sections",
        includes: "fundus_camera_posterior"
  }
},

{
  type: "textarea",
  label: "Fundus Images Remark",
  name: "fundus_images_remark",
    showIf: {
 field: "ocular_health_sections",
        includes: "fundus_camera_posterior"
  }
},
    {
      type: "grid-header",
      cols: ["Right Eye (RE)", "Left Eye (LE)"],
      showIf: {
        field: "ocular_health_sections",
        includes: "fundus_camera_posterior"
      }
    },



    {
      type: "grid-row",
      name: "fundus_media",
      label: "Media",
      cols: ["input", "input"],
      showIf: {
        field: "ocular_health_sections",
        includes: "fundus_camera_posterior"
      }
    },

    {
      type: "grid-row",
      name: "fundus_cd_ratio",
      label: "C/D Ratio",
      cols: ["input", "input"],
      showIf: {
        field: "ocular_health_sections",
        includes: "fundus_camera_posterior"
      }
    },

    {
      type: "grid-row",
      name: "fundus_av_ratio",
      label: "A/V Ratio",
      cols: ["input", "input"],
      showIf: {
        field: "ocular_health_sections",
        includes: "fundus_camera_posterior"
      }
    },

    {
      type: "grid-row",
      name: "fundus_background",
      label: "Background",
      cols: ["input", "input"],
      showIf: {
        field: "ocular_health_sections",
        includes: "fundus_camera_posterior"
      }
    },

    {
      type: "grid-row",
      name: "fundus_macula",
      label: "Macula",
      cols: ["input", "input"],
      showIf: {
        field: "ocular_health_sections",
        includes: "fundus_camera_posterior"
      }
    },

    {
      type: "input",
      name: "fundus_impression",
      label: "Clinical Findings",
      showIf: {
        field: "ocular_health_sections",
        includes: "fundus_camera_posterior"
      }
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
        layout={layout}
    />
  );
}
