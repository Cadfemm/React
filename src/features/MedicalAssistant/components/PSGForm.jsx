import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object" && text !== null && !Array.isArray(text)) return text[lang] || text.en || "";
  return String(text);
};

const YES_NO_OPTIONS = [
  { value: "yes", label: { en: "YES", ms: "YA" } },
  { value: "no", label: { en: "NO", ms: "TIDAK" } }
];

const STOP_BANG_OPTIONS = [
  { value: "1_3", label: { en: "1-3 ITEMS", ms: "1-3 ITEM" } },
  { value: "3_8", label: { en: "3-8 ITEMS", ms: "3-8 ITEM" } }
];

const NIGHT_OPTIONS = [
  { value: "1", label: { en: "1 NIGHT", ms: "1 MALAM" } },
  { value: "2", label: { en: "2 NIGHT", ms: "2 MALAM" } },
  { value: "3", label: { en: "3 NIGHT", ms: "3 MALAM" } }
];

const TECHNICAL_AIRFLOW_OPTIONS = [
  { value: "rip_belts", label: { en: "Respiratory Effort: Thoracic and abdominal RIP belts", ms: "Usaha Pernafasan: Tali RIP toraks dan abdomen" } },
  { value: "spo2_pr", label: { en: "Oxygen saturation and Pulse Rate", ms: "Ketepuan oksigen dan Kadar Nadi" } },
  { value: "snoring", label: { en: "Snoring", ms: "Dengkuran" } }
];

const SCORING_TABLE_OPTIONS = [
  { value: "normal", label: { en: "0-5 apnoea + hypopnoea events per hour / Normal", ms: "0-5 kejadian apnoea + hipopnoea sejam / Normal" } },
  { value: "mild", label: { en: "6-15 apnoea + hypopnoea events per hour / Mild sleep apnoea", ms: "6-15 kejadian apnoea + hipopnoea sejam / Apnoea tidur ringan" } },
  { value: "moderate", label: { en: "16-29 apnoea + hypopnoea events per hour / Moderate sleep apnoea", ms: "16-29 kejadian apnoea + hipopnoea sejam / Apnoea tidur sederhana" } },
  { value: "severe", label: { en: "30 or greater apnoea + hypopnoea events per hour / Severe sleep apnoea", ms: "30 atau lebih kejadian apnoea + hipopnoea sejam / Apnoea tidur teruk" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "normal", label: { en: "NORMAL", ms: "NORMAL" } },
  { value: "abnormal", label: { en: "ABNORMAL", ms: "TIDAK NORMAL" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: { en: "MEDICAL ASSISTANT", ms: "PEMBANTU PERUBATAN" } },
  { value: "sleep_technologist", label: { en: "SLEEP TECHNOLOGIST", ms: "TEKNOLOGIST TIDUR" } },
  { value: "neurologist", label: { en: "NEUROLOGIST", ms: "PAKAR NEUROLOGI" } },
  { value: "respiratory_therapist", label: { en: "RESPIRATORY THERAPIST", ms: "AHLI TERAPI RESPIRATORI" } }
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
  const [language, setLanguage] = useState("en");
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
    if (type === "toggle-language") {
      setLanguage(l => (l === "en" ? "ms" : "en"));
    }
    if (type === "back") onBack?.();
  };

  const PSG_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "PSG (POLYSOMNOGRAM)", ms: "PSG (POLISOMNOGRAM)" },
    actions: [
      { type: "toggle-language" },
      { type: "back", label: { en: "Back", ms: "Kembali" } }
    ],
    sections: [
      {
        fields: [
          {
            name: "date_of_appointment",
            label: { en: "DATE OF APPOINTMENT", ms: "TARIKH TEMUJANJI" },
            type: "date",
            placeholder: { en: "Select date", ms: "Pilih tarikh" }
          },
          {
            type: "row",
            fields: [
              { name: "gender", label: { en: "GENDER", ms: "JANTINA" }, type: "input", readOnly: true },
              { name: "height", label: { en: "HEIGHT (cm)", ms: "TINGGI (cm)" }, type: "input", readOnly: true }
            ]
          },
          {
            type: "row",
            fields: [
              { name: "weight", label: { en: "WEIGHT (kg)", ms: "BERAT (kg)" }, type: "input", readOnly: true },
              { name: "neck_circumference", label: { en: "NECK CIRCUMFERENCE (CM)", ms: "LILITAN LEHER (CM)" }, type: "input", readOnly: true }
            ]
          },
          {
            type: "row",
            fields: [
              { name: "bmi", label: { en: "BMI", ms: "BMI" }, type: "input", readOnly: true },
              { name: "bmi_conclusion", label: { en: "BMI Conclusion", ms: "Kesimpulan BMI" }, type: "input", readOnly: true }
            ]
          },
          {
            name: "diagnosis",
            label: { en: "DIAGNOSIS (Grouping ICD)", ms: "DIAGNOSIS (Kumpulan ICD)" },
            type: "input",
            readOnly: true
          },
          { type: "subheading", label: { en: "Sleep Assessment", ms: "Penilaian Tidur" } },
          {
            name: "stop_bang",
            label: { en: "STOP BANG SLEEP SCORE", ms: "SKOR TIDUR STOP BANG" },
            type: "radio",
            options: STOP_BANG_OPTIONS
          },
          {
            type: "row",
            fields: [
              {
                name: "high_risk_osa",
                label: { en: "HIGH RISK OF OSA", ms: "RISIKO TINGGI OSA" },
                type: "radio",
                options: YES_NO_OPTIONS
              },
              {
                name: "low_risk_osa",
                label: { en: "LOW RISK OF OSA", ms: "RISIKO RENDAH OSA" },
                type: "radio",
                options: YES_NO_OPTIONS
              }
            ]
          },
          {
            name: "night_procedure",
            label: { en: "NIGHT / PROCEDURE", ms: "MALAM / PROSEDUR" },
            type: "radio",
            options: NIGHT_OPTIONS
          },
          { type: "subheading", label: { en: "Technical Airflow", ms: "Aliran Udara Teknikal" } },
          {
            name: "technical_airflow",
            label: { en: "TECHNICAL AIRFLOW", ms: "ALIRAN UDARA TEKNIKAL" },
            type: "checkbox-group",
            options: TECHNICAL_AIRFLOW_OPTIONS
          },
          {
            type: "row",
            fields: [
              { name: "cpap", label: { en: "CPAP", ms: "CPAP" }, type: "radio", options: YES_NO_OPTIONS },
              { name: "bpap", label: { en: "BPAP", ms: "BPAP" }, type: "radio", options: YES_NO_OPTIONS },
              { name: "snoring", label: { en: "SNORING", ms: "DENGKURAN" }, type: "radio", options: YES_NO_OPTIONS }
            ]
          },
          {
            name: "scoring_table",
            label: { en: "SCORING TABLE", ms: "JADUAL SKOR" },
            type: "radio",
            options: SCORING_TABLE_OPTIONS,
            labelAbove: true
          },
          {
            name: "previous_psg",
            label: { en: "PREVIOUS PSG", ms: "PSG SEBELUMNYA" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          { type: "subheading", label: { en: "Report", ms: "Laporan" } },
          {
            name: "final_report",
            label: { en: "FINAL REPORT", ms: "LAPORAN AKHIR" },
            type: "radio",
            options: FINAL_REPORT_OPTIONS
          },
          {
            name: "final_report_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "final_report", equals: "others" }
          },
          {
            name: "graf",
            title: { en: "GRAF", ms: "GRAF" },
            type: "attach-file",
            accept: "image/*,.pdf,video/*"
          },
          {
            name: "emr_technical_report",
            label: { en: "EMR TECHNICAL REPORT BY", ms: "LAPORAN TEKNIKAL EMR OLEH" },
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
      language={language}
    />
  );
}
