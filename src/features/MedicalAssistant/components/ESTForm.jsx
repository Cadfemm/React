import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const TYPE_EST_OPTIONS = [
  { value: "treadmill", label: "Exercise stress test treadmill" },
  { value: "treadmill_wheelchair", label: "Exercise stress test treadmill with wheelchair" },
  { value: "ergometry", label: "Ergometry" }
];

const INDICATION_OPTIONS = [
  { value: "induce_aneurysm", label: "INDUCE Aneurysm" },
  { value: "chronotropic_factor", label: "CHRONOTROPIC FACTOR" },
  { value: "ischemic_changes", label: "ISCHEMIC CHANGES" },
  { value: "cad_screening", label: "CAD SCREENING" },
  { value: "treatment_progressing", label: "TREATMENT PROGRESSING" }
];

const UNDERLYING_OPTIONS = [
  { value: "major", label: "MAJOR CARDIAC ISSUE" },
  { value: "minor", label: "MINOR CARDIAC ISSUE" },
  { value: "others", label: "OTHERS" }
];

const PROTOCOL_OPTIONS = [
  { value: "bruce", label: "Bruce" },
  { value: "modified_bruce", label: "Modified Bruce" },
  { value: "who", label: "WHO" },
  { value: "others", label: "OTHERS" }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: "MEDICAL ASSISTANT" },
  { value: "cardiovascular_technologist", label: "CARDIOVASCULAR TECHNOLOGIST" },
  { value: "medical_officer", label: "MEDICAL OFFICER" },
  { value: "cardiologist", label: "CARDIOLOGIST" }
];

const FINAL_REPORT_OPTIONS = [
  { value: "positive", label: "POSITIVE STRESS TEST" },
  { value: "negative", label: "NEGATIVE STRESS TEST" },
  { value: "others", label: "OTHERS" }
];

function formatToday() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function computeBmi(height, weight) {
  const h = parseFloat(height);
  const w = parseFloat(weight);
  if (isNaN(h) || isNaN(w) || h <= 0) return "";
  const hm = h / 100;
  return (w / (hm * hm)).toFixed(1);
}

export default function ESTForm({ patient, onBack }) {
  const age = patient?.age ?? "-";
  const height = patient?.height ?? "";
  const weight = patient?.weight ?? "";
  const bmi = patient?.bmi ?? computeBmi(height, weight);
  const diagnosis = patient?.icd ?? patient?.diagnosis ?? "-";

  const [values, setValues] = useState({
    date_of_appointment: formatToday(),
    type_est: "",
    age,
    bmi,
    target_heart_rate: "",
    diagnosis,
    indication: "",
    underlying: "",
    underlying_others: "",
    protocol: "",
    protocol_others: "",
    emr_technical_report: "",
    final_report: "",
    final_report_others: "",
    graf_1: null,
    graf_2: null
  });

  useEffect(() => {
    const h = patient?.height ?? "";
    const w = patient?.weight ?? "";
    const bmiVal = patient?.bmi ?? computeBmi(h, w);
    setValues(v => ({
      ...v,
      age: patient?.age ?? "-",
      bmi: bmiVal,
      diagnosis: patient?.icd ?? patient?.diagnosis ?? "-"
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
  };

  const EST_SCHEMA = {
    title: "EST (EXERCISE STRESS TEST)",
    actions: [{ type: "back", label: "Back" }],
    sections: [
      {
        fields: [
          {
            name: "date_of_appointment",
            label: "DATE OF APPOINTMENT",
            type: "date",
            placeholder: "Select date"
          },
          {
            name: "type_est",
            label: "TYPE OF EST",
            type: "radio",
            options: TYPE_EST_OPTIONS,
            labelAbove: true
          },
          {
            type: "row",
            fields: [
              { name: "age", label: "AGE", type: "input", readOnly: true },
              { name: "bmi", label: "BMI", type: "input", readOnly: true }
            ]
          },
          {
            name: "target_heart_rate",
            label: "TARGET HEART RATE",
            type: "input",
            placeholder: "Free text"
          },
          {
            name: "diagnosis",
            label: "DIAGNOSIS (Grouping ICD)",
            type: "input",
            readOnly: true
          },
          {
            name: "indication",
            label: "INDICATION",
            type: "radio",
            options: INDICATION_OPTIONS,
            labelAbove: true
          },
          {
            name: "underlying",
            label: "UNDERLYING",
            type: "radio",
            options: UNDERLYING_OPTIONS
          },
          {
            name: "underlying_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Free text",
            showIf: { field: "underlying", equals: "others" }
          },
          {
            name: "protocol",
            label: "PROTOCOL",
            type: "radio",
            options: PROTOCOL_OPTIONS
          },
          {
            name: "protocol_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Free text",
            showIf: { field: "protocol", equals: "others" }
          },
          {
            name: "emr_technical_report",
            label: "EMR TECHNICAL REPORT BY",
            type: "radio",
            options: EMR_REPORT_OPTIONS,
            labelAbove: true
          },
          {
            name: "final_report",
            label: "FINAL REPORT",
            type: "radio",
            options: FINAL_REPORT_OPTIONS
          },
          {
            name: "final_report_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Free text",
            showIf: { field: "final_report", equals: "others" }
          },
          { type: "subheading", label: "GRAF" },
          {
            type: "row",
            fields: [
              {
                name: "graf_1",
                label: "Upload",
                type: "attach-file",
                accept: "image/*,.pdf"
              },
              {
                name: "graf_2",
                label: "Upload",
                type: "attach-file",
                accept: "image/*,.pdf"
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={EST_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
    />
  );
}
