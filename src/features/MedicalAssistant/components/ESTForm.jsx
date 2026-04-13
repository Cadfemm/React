import React, { useState, useEffect } from "react";
import PatientCard from "../../../shared/cards/PatientCard"
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object" && text !== null && !Array.isArray(text)) return text[lang] || text.en || "";
  return String(text);
};

const TYPE_EST_OPTIONS = [
  { value: "treadmill", label: { en: "Exercise Stress Test Treadmill", ms: "Ujian Tekanan Senaman Treadmill" } },
  { value: "treadmill_wheelchair", label: { en: "Exercise Stress Test Treadmill With Wheelchair", ms: "Ujian Tekanan Senaman Treadmill Dengan Kerusi Roda" } },
  { value: "ergometry", label: { en: "Ergometry", ms: "Ergometri" } }
];

const INDICATION_OPTIONS = [
  { value: "pre_phase_ii", label: { en: "Pre Cardiac Rehabilitation Phase II", ms: "Fasa II Rehabilitasi Jantung Awal" } },
  { value: "post_phase_ii", label: { en: "Post Cardiac Rehabilitation Phase II", ms: "Fasa II Rehabilitasi Jantung Selepas" } },
  { value: "post_phase_iii", label: { en: "Post Cardiac Rehabilitation Phase III", ms: "Fasa III Rehabilitasi Jantung Selepas" } },
  { value: "cardiac_screening", label: { en: "Cardiac Screening", ms: "Saringan Jantung" } },
  { value: "others", label: { en: "Others", ms: "Lain-lain" } }
];

// const INDICATION_OPTIONS = [
//   { value: "induce_aneurysm", label: { en: "Induce Aneurysm", ms: "Induce Aneurisma" } },
//   { value: "chronotropic_factor", label: { en: "Chronotropic Factor", ms: "Faktor Kronotropik" } },
//   { value: "ischemic_changes", label: { en: "Ischemic Changes", ms: "Perubahan Iskemik" } },
//   { value: "cad_screening", label: { en: "CAD Screening", ms: "Saringan CAD" } },
//   { value: "treatment_progressing", label: { en: "Treatment Progressing", ms: "Kemajuan Rawatan" } }
// ];

const UNDERLYING_OPTIONS = [
  { value: "major", label: { en: "Major Cardiac Issue", ms: "Masalah Jantung Utama" } },
  { value: "minor", label: { en: "Minor Cardiac Issue", ms: "Masalah Jantung Kecil" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
];

const PROTOCOL_OPTIONS = [
  { value: "bruce", label: { en: "Bruce", ms: "Bruce" } },
  { value: "modified_bruce", label: { en: "Modified Bruce", ms: "Bruce Diubah Suai" } },
  { value: "who", label: { en: "WHO", ms: "WHO" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: { en: "Medical Assistant", ms: "Pembantu Perubatan" } },
  { value: "cardiovascular_technologist", label: { en: "Cardiovascular Technologist", ms: "Teknologis Kardiovaskular" } },
  { value: "medical_officer", label: { en: "Medical Officer", ms: "Pegawai Perubatan" } },
  { value: "cardiologist", label: { en: "Cardiologist", ms: "Pakar Kardiologi" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "positive", label: { en: "Positive Stress Test", ms: "Ujian Tekanan Positif" } },
  { value: "negative", label: { en: "Negative Stress Test", ms: "Ujian Tekanan Negatif" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
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
  const [language, setLanguage] = useState("en");
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
    if (type === "toggle-language") {
      setLanguage(l => (l === "en" ? "ms" : "en"));
    }
    if (type === "back") onBack?.();
  };

  const PATIENT_SCHEMA = {
    title: "Patient Information",
    sections: []
  }

  const EST_SCHEMA = {
    enableLanguageToggle: true,
      title: { en: "EST (Exercise Stress Test)", ms: "EST (Ujian Tekanan Senaman)" },    actions: [
      { type: "toggle-language" },
      { type: "back", label: { en: "Back", ms: "Kembali" } }
    ],
    sections: [
      {
        fields: [
          {
            name: "date_of_appointment",
            label: { en: "Date of Appointment", ms: "Tarikh Temujanji" },
            type: "date",
            placeholder: { en: "Select date", ms: "Pilih tarikh" }
          },
          {
            name: "type_est",
            label: { en: "Type of EST", ms: "Jenis EST" },
            type: "radio",
            options: TYPE_EST_OPTIONS,
            labelAbove: true
          },
          {
            type: "row",
            fields: [
              { name: "bmi", label: { en: "BMI", ms: "BMI" }, type: "input", readOnly: true }
            ]
          },
          {
            name: "target_heart_rate",
            label: { en: "Target Heart Rate", ms: "Kadar Denyutan Jantung Sasaran" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" }
          },
          // {
          //   name: "indication",
          //   label: { en: "Indication", ms: "Indikasi" },
          //   type: "radio",
          //   options: INDICATION_OPTIONS,
          //   labelAbove: true
          // },
          {
  name: "indication",
  label: { en: "Indication", ms: "Indikasi" },
  type: "radio",
  options: INDICATION_OPTIONS,
  labelAbove: true
},
{
  name: "indication_others",
  label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
  type: "input",
  placeholder: { en: "Free text", ms: "Teks bebas" },
  showIf: { field: "indication", equals: "others" }
},
          {
            name: "protocol",
            label: { en: "Protocol", ms: "Protokol" },
            type: "radio",
            options: PROTOCOL_OPTIONS
          },
          {
            name: "protocol_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "protocol", equals: "others" }
          },
          // {
          //   name: "emr_technical_report",
          //   label: { en: "EMR Technical Report By", ms: "Laporan Teknikal EMR Oleh" },
          //   type: "radio",
          //   options: EMR_REPORT_OPTIONS,
          //   labelAbove: true
          // },
          { type: "subheading", label: { en: "Graph", ms: "Graph" } },
          {
            type: "row",
            fields: [
              {
                name: "graf_1",
                label: { en: "Upload", ms: "Muat naik" },
                title: { en: "Graph 1", ms: "Graph 1" },
                type: "attach-file",
                accept: "image/*,.pdf"
              },
              {
                name: "graf_2",
                label: { en: "Upload", ms: "Muat naik" },
                title: { en: "Graph 2", ms: "Graph 2" },
                type: "attach-file",
                accept: "image/*,.pdf"
              }
            ]
          },
          {
            name: "final_report",
            label: { en: "Final Report", ms: "Laporan Akhir" },
            type: "radio",
            // labelAbove:true,
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
        schema={EST_SCHEMA}
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