import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const YES_NO_OPTIONS = [
  { value: "yes", label: "YES" },
  { value: "no", label: "NO" }
];

const STOP_BANG_OPTIONS = [
  { value: "1_3", label: "1-3 ITEMS" },
  { value: "3_8", label: "3-8 ITEMS" }
];

const NIGHT_OPTIONS = [
  { value: "1", label: "1 NIGHT" },
  { value: "2", label: "2 NIGHT" },
  { value: "3", label: "3 NIGHT" }
];

const TECHNICAL_AIRFLOW_OPTIONS = [
  { value: "rip_belts", label: "Respiratory Effort: Thoracic and abdominal RIP belts" },
  { value: "spo2_pr", label: "Oxygen saturation and Pulse Rate" },
  { value: "snoring", label: "Snoring" }
];

const SCORING_TABLE_OPTIONS = [
  { value: "normal", label: "0-5 apnoea + hypopnoea events per hour / Normal" },
  { value: "mild", label: "6-15 apnoea + hypopnoea events per hour / Mild sleep apnoea" },
  { value: "moderate", label: "16-29 apnoea + hypopnoea events per hour / Moderate sleep apnoea" },
  { value: "severe", label: "30 or greater apnoea + hypopnoea events per hour / Severe sleep apnoea" }
];

const FINAL_REPORT_OPTIONS = [
  { value: "normal", label: "NORMAL" },
  { value: "abnormal", label: "ABNORMAL" },
  { value: "others", label: "OTHERS" }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: "MEDICAL ASSISTANT" },
  { value: "sleep_technologist", label: "SLEEP TECHNOLOGIST" },
  { value: "neurologist", label: "NEUROLOGIST" },
  { value: "respiratory_therapist", label: "RESPIRATORY THERAPIST" }
];

function formatToday() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function getBmiConclusion(bmi) {
  const n = parseFloat(bmi);
  if (isNaN(n) || bmi === "" || bmi == null) return "-";
  if (n < 16) return "Less than 16.0 – Severely Underweight";
  if (n <= 18.5) return "16.0 to 18.5 – Underweight";
  if (n <= 25) return "18.6 to 25.0 – Normal Weight";
  if (n <= 30) return "25.1 to 30.0 – Overweight";
  if (n <= 35) return "30.1 to 35.0 – Moderately Obese";
  return "Greater than 35.0 – Severely Obese";
}

function computeBmi(height, weight) {
  const h = parseFloat(height);
  const w = parseFloat(weight);
  if (isNaN(h) || isNaN(w) || h <= 0) return "";
  const hm = h / 100;
  return (w / (hm * hm)).toFixed(1);
}

export default function PSGForm({ patient, onBack }) {
  const gender = patient?.sex || patient?.gender || "-";
  const height = patient?.height ?? "";
  const weight = patient?.weight ?? "";
  const neckCircumference = patient?.neck_circumference ?? patient?.neck_cm ?? "-";
  const diagnosis = patient?.icd ?? patient?.diagnosis ?? "-";
  const bmiRaw = patient?.bmi ?? computeBmi(height, weight);
  const bmiConclusion = getBmiConclusion(bmiRaw);

  const [values, setValues] = useState({
    date_of_appointment: formatToday(),
    gender,
    height,
    weight,
    neck_circumference: neckCircumference,
    bmi: bmiRaw,
    bmi_conclusion: bmiConclusion,
    diagnosis,
    stop_bang: "",
    high_risk_osa: "",
    low_risk_osa: "",
    night_procedure: "",
    technical_airflow: [],
    cpap: "",
    bpap: "",
    snoring: "",
    scoring_table: "",
    previous_psg: "",
    final_report: "",
    final_report_others: "",
    graf: null,
    emr_technical_report: ""
  });

  useEffect(() => {
    const h = patient?.height ?? "";
    const w = patient?.weight ?? "";
    const bmi = patient?.bmi ?? computeBmi(h, w);
    setValues(v => ({
      ...v,
      gender: patient?.sex || patient?.gender || "-",
      height: h,
      weight: w,
      neck_circumference: patient?.neck_circumference ?? patient?.neck_cm ?? "-",
      bmi: bmi,
      bmi_conclusion: getBmiConclusion(bmi),
      diagnosis: patient?.icd ?? patient?.diagnosis ?? "-"
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
  };

  const PSG_SCHEMA = {
    title: "PSG (POLYSOMNOGRAM)",
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
            type: "row",
            fields: [
              { name: "gender", label: "GENDER", type: "input", readOnly: true },
              { name: "height", label: "HEIGHT (cm)", type: "input", readOnly: true }
            ]
          },
          {
            type: "row",
            fields: [
              { name: "weight", label: "WEIGHT (kg)", type: "input", readOnly: true },
              { name: "neck_circumference", label: "NECK CIRCUMFERENCE (CM)", type: "input", readOnly: true }
            ]
          },
          {
            type: "row",
            fields: [
              { name: "bmi", label: "BMI", type: "input", readOnly: true },
              { name: "bmi_conclusion", label: "BMI Conclusion", type: "input", readOnly: true }
            ]
          },
          {
            name: "diagnosis",
            label: "DIAGNOSIS (Grouping ICD)",
            type: "input",
            readOnly: true
          },
          { type: "subheading", label: "Sleep Assessment" },
          {
            name: "stop_bang",
            label: "STOP BANG SLEEP SCORE",
            type: "radio",
            options: STOP_BANG_OPTIONS
          },
          {
            type: "row",
            fields: [
              {
                name: "high_risk_osa",
                label: "HIGH RISK OF OSA",
                type: "radio",
                options: YES_NO_OPTIONS
              },
              {
                name: "low_risk_osa",
                label: "LOW RISK OF OSA",
                type: "radio",
                options: YES_NO_OPTIONS
              }
            ]
          },
          {
            name: "night_procedure",
            label: "NIGHT / PROCEDURE",
            type: "radio",
            options: NIGHT_OPTIONS
          },
          { type: "subheading", label: "Technical Airflow" },
          {
            name: "technical_airflow",
            label: "TECHNICAL AIRFLOW",
            type: "checkbox-group",
            options: TECHNICAL_AIRFLOW_OPTIONS.map(o => ({ value: o.value, label: o.label }))
          },
          {
            type: "row",
            fields: [
              { name: "cpap", label: "CPAP", type: "radio", options: YES_NO_OPTIONS },
              { name: "bpap", label: "BPAP", type: "radio", options: YES_NO_OPTIONS },
              { name: "snoring", label: "SNORING", type: "radio", options: YES_NO_OPTIONS }
            ]
          },
          {
            name: "scoring_table",
            label: "SCORING TABLE",
            type: "radio",
            options: SCORING_TABLE_OPTIONS,
            labelAbove: true
          },
          {
            name: "previous_psg",
            label: "PREVIOUS PSG",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          { type: "subheading", label: "Report" },
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
          {
            name: "graf",
            label: "GRAF",
            type: "attach-file",
            accept: "image/*,.pdf,video/*"
          },
          {
            name: "emr_technical_report",
            label: "EMR TECHNICAL REPORT BY",
            type: "radio",
            options: EMR_REPORT_OPTIONS,
            labelAbove: true
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={PSG_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
    />
  );
}
