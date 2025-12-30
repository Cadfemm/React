import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder"


export default function VisualAssessment() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("Visual Assessment Data:", values);
    }
  };
  const yesNo = [
  { label: "YES", value: "YES" },
  { label: "NO", value: "NO" }
];
 const VISUAL_SCHEMA = {
  title: "Visual Assessment",

  sections: [
    // ---------------- GATE QUESTION ----------------
    {
      title: null,
      fields: [
        {
          name: "ocularPain",
          label: "Ocular Pain",
          type: "radio",
          options: [
            { label: "YES", value: "YES" },
            { label: "NO", value: "NO" }
          ],
          validation: { required: true }
        }
      ]
    },

    // ---------------- VISUAL DISTURBANCE ----------------
    {
      title: "Visual Disturbance",
      showIf: { field: "ocularPain", equals: "YES" },
      fields: [
        { name: "diplopia", label: "Diplopia", type: "radio", options: yesNo },
        { name: "blurredVision", label: "Blurred vision / haloes around lights", type: "radio", options: yesNo },
        { name: "suddenLoss", label: "Sudden onset visual loss", type: "radio", options: yesNo },
        { name: "gradualLoss", label: "Gradual onset visual loss", type: "radio", options: yesNo },
        { name: "floaters", label: "Flashes and floaters", type: "radio", options: yesNo }
      ]
    },

    // ---------------- EYELID CONDITIONS ----------------
    {
      title: "Eyelid Conditions",
      showIf: { field: "ocularPain", equals: "YES" },
      fields: [
        { name: "ptosis", label: "Ptosis", type: "radio", options: yesNo },
        { name: "chalazion", label: "Chalazion", type: "radio", options: yesNo },
        { name: "blepharitis", label: "Blepharitis", type: "radio", options: yesNo },
        { name: "entropion", label: "Entropion / Ectropion", type: "radio", options: yesNo }
      ]
    },

    // ---------------- VISUAL FIELD ----------------
    {
      title: "Visual Field Abnormalities",
      showIf: { field: "ocularPain", equals: "YES" },
      fields: [
        { name: "centralDefect", label: "Central visual field defect", type: "radio", options: yesNo },
        { name: "peripheralLoss", label: "Peripheral visual field loss", type: "radio", options: yesNo },
        { name: "hemianopia", label: "Hemianopia", type: "radio", options: yesNo }
      ]
    }
  ]
};


  return (
    <CommonFormBuilder
      schema={VISUAL_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    >
    </CommonFormBuilder>
  );
}
