import React, { useState, useEffect } from "react";
import PatientCard from "../../../shared/cards/PatientCard"
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object" && text !== null && !Array.isArray(text)) return text[lang] || text.en || "";
  return String(text);
};

const YES_NO_OPTIONS = [
  { value: "yes", label: { en: "Yes", ms: "Ya" } },
  { value: "no", label: { en: "No", ms: "Tidak" } }
];

const STOP_BANG_OPTIONS = [
  { value: "1_3", label: { en: "1-3 Items", ms: "1-3 Item" } },
  { value: "3_8", label: { en: "3-8 Items", ms: "3-8 Item" } }
];

const NIGHT_OPTIONS = [
  { value: "1", label: { en: "1 Night", ms: "1 Malam" } },
  { value: "2", label: { en: "2 Night", ms: "2 Malam" } },
  { value: "3", label: { en: "3 Night", ms: "3 Malam" } }
];

const TECHNICAL_AIRFLOW_OPTIONS = [
  { value: "rip_belts", label: { en: "Respiratory Effort: Thoracic and abdominal RIP belts", ms: "Usaha Pernafasan: Tali RIP toraks dan abdomen" } },
  { value: "spo2_pr", label: { en: "Oxygen saturation and Pulse Rate", ms: "Ketepuan oksigen dan Kadar Nadi" } },
  { value: "snoring", label: { en: "Snoring", ms: "Dengkuran" } }
];

const SCORING_TABLE_OPTIONS = [
  { value: "normal", label: { en: "0-5 Apnoea + hypopnoea events per hour / Normal", ms: "0-5 kejadian apnoea + hipopnoea sejam / Normal" } },
  { value: "mild", label: { en: "6-15 Apnoea + hypopnoea events per hour / Mild sleep apnoea", ms: "6-15 kejadian apnoea + hipopnoea sejam / Apnoea tidur ringan" } },
  { value: "moderate", label: { en: "16-29 Apnoea + hypopnoea events per hour / Moderate sleep apnoea", ms: "16-29 kejadian apnoea + hipopnoea sejam / Apnoea tidur sederhana" } },
  { value: "severe", label: { en: "30 Or greater apnoea + hypopnoea events per hour / Severe sleep apnoea", ms: "30 atau lebih kejadian apnoea + hipopnoea sejam / Apnoea tidur teruk" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "normal", label: { en: "Normal", ms: "Normal" } },
  { value: "abnormal", label: { en: "Abnormal", ms: "Tidak Normal" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: { en: "Medical Assistant", ms: "Pembantu Perubatan" } },
  { value: "sleep_technologist", label: { en: "Sleep Technologist", ms: "Teknologis Tidur" } },
  { value: "neurologist", label: { en: "Neurologist", ms: "Pakar Neurologi" } },
  { value: "respiratory_therapist", label: { en: "Respiratory Therapist", ms: "Ahli Terapi Respiratori" } }
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

  const PATIENT_SCHEMA = {
    title: "Patient Information",
    sections: []
  }

  const PSG_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "PSG (Polysomnogram)", ms: "PSG (Polysomnogram)" },
    actions: [
      { type: "toggle-language" },
      { type: "back", label: { en: "Back", ms: "Kembali" } }
    ],
    sections: [
      {
        fields: [
          {
            name: "date_of_appointment",
            label: { en: "Date Of Appointment", ms: "Tarikh Temujanji" },
            type: "date",
            placeholder: { en: "Select date", ms: "Pilih tarikh" }
          },
          {
            type: "row",
            fields: [
              { name: "neck_circumference", label: { en: "Neck Circumference (Cm)", ms: "Lilitan Leher (Cm)" }, type: "input" },
              { name: "bmi_conclusion", label: { en: "BMI Conclusion", ms: "Kesimpulan BMI" }, type: "input", readOnly: true }
            ]
          },
          { type: "subheading", label: { en: "Sleep Assessment", ms: "Penilaian Tidur" } },
          {
            name: "stop_bang",
            label: { en: "Stop Bang Sleep Score", ms: "Skor Tidur Stop Bang" },
            type: "radio",
            options: STOP_BANG_OPTIONS
          },
          {
            type: "row",
            fields: [
              {
                name: "high_risk_osa",
                label: { en: "High Risk Of OSA", ms: "Risiko Tinggi OSA" },
                type: "radio",
                options: YES_NO_OPTIONS
              },
              {
                name: "low_risk_osa",
                label: { en: "Low Risk Of OSA", ms: "Risiko Rendah OSA" },
                type: "radio",
                options: YES_NO_OPTIONS
              }
            ]
          },
          {
            name: "night_procedure",
            label: { en: "Night / Procedure", ms: "Malam / Prosedur" },
            type: "radio",
            options: NIGHT_OPTIONS
          },
          { type: "subheading", label: { en: "Technical Airflow", ms: "Aliran Udara Teknikal" } },
          {
            name: "technical_airflow",
            label: { en: "Technical Airflow", ms: "Aliran Udara Teknikal" },
            type: "checkbox-group",
            options: TECHNICAL_AIRFLOW_OPTIONS
          },
          {
            type: "row",
            fields: [
              { name: "cpap", label: { en: "CPAP", ms: "CPAP" }, type: "radio", options: YES_NO_OPTIONS },
              { name: "bpap", label: { en: "BPAP", ms: "BPAP" }, type: "radio", options: YES_NO_OPTIONS },
              { name: "snoring", label: { en: "Snoring", ms: "Dengkuran" }, type: "radio", options: YES_NO_OPTIONS }
            ]
          },
          {
            name: "scoring_table",
            label: { en: "Scoring Table", ms: "Jadual Skor" },
            type: "radio",
            options: SCORING_TABLE_OPTIONS,
            labelAbove: true
          },
          {
            name: "previous_psg",
            label: { en: "Previous PSG", ms: "PSG Sebelumnya" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "previous_psg_image",
            label: "Upload Report",
            type: "attach-file",
            showIf: {
              field: "previous_psg",
              equals: "yes"
            }
          },
          { type: "subheading", label: { en: "Report", ms: "Laporan" } },
          {
            name: "graf",
            title: { en: "GRAF", ms: "GRAF" },
            type: "attach-file",
            accept: "image/*,.pdf,video/*"
          },
          {
            name: "emr_technical_report",
            label: { en: "EMR Technical Report By", ms: "Laporan Teknikal EMR Oleh" },
            type: "radio",
            options: EMR_REPORT_OPTIONS,
            labelAbove: true
          },
          {
            name: "final_report",
            label: { en: "Final Report", ms: "Laporan Akhir" },
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
        ]
      }
    ]
  };

  return (
    <div>
      <CommonFormBuilder
        schema={PATIENT_SCHEMA}
        values={{}}
        onChange={() => {}}
      >
        <PatientCard patient={patient}/>
        <button style={doctorsReportBtn}>
          Doctors Reports
        </button>
      </CommonFormBuilder>
      <CommonFormBuilder
        schema={PSG_SCHEMA}
        values={values}
        onChange={onChange}
        onAction={handleAction}
        language={language}
      />
    </div>
  );
}

const doctorsReportBtn = {
  padding: "10px 20px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 8
};