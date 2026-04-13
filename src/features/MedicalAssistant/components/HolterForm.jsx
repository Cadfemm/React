import React, { useState, useEffect } from "react";
import PatientCard from "../../../shared/cards/PatientCard"
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object" && text !== null && !Array.isArray(text)) return text[lang] || text.en || "";
  return String(text);
};

const TYPE_HOLTER_OPTIONS = [
  { value: "recording_devices", label: { en: "Recording Devices", ms: "Peranti Rakaman" } },
  { value: "patch", label: { en: "Patch", ms: "Tampal" } }
];

const UNDERLYING_OPTIONS = [
  { value: "major", label: { en: "Major Cardiac Issue", ms: "Masalah Jantung Utama" } },
  { value: "minor", label: { en: "Minor Cardiac Issue", ms: "Masalah Jantung Kecil" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
];

const HOURS_RECORDING_OPTIONS = [
  { value: "7", label: { en: "7 hrs", ms: "7 jam" } },
  { value: "12", label: { en: "12 hrs", ms: "12 jam" } },
  { value: "24", label: { en: "24 hrs", ms: "24 jam" } },
  { value: "48", label: { en: "48 hrs", ms: "48 jam" } },
  { value: "76", label: { en: "76 hrs", ms: "76 jam" } }
];

const ECG_CHANNEL_OPTIONS = [
  { value: "2", label: { en: "2 CH", ms: "2 CH" } },
  { value: "3", label: { en: "3 CH", ms: "3 CH" } },
  { value: "4", label: { en: "4 CH", ms: "4 CH" } },
  { value: "5", label: { en: "5 CH", ms: "5 CH" } },
  { value: "6", label: { en: "6 CH", ms: "6 CH" } }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: { en: "Medical Assistant", ms: "Pembantu Perubatan" } },
  { value: "cardiovascular_technologist", label: { en: "Cardiovascular Technologist", ms: "Teknologis Kardiovaskular" } },
  { value: "medical_officer", label: { en: "Medical Officer", ms: "Pegawai Perubatan" } },
  { value: "cardiologist", label: { en: "Cardiologist", ms: "Pakar Kardiologi" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "positive", label: { en: "Positive Study", ms: "Kajian Positif" } },
  { value: "negative", label: { en: "Negative Study", ms: "Kajian Negatif" } }
];

function formatToday() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export default function HolterForm({ patient, onBack }) {
  const [language, setLanguage] = useState("en");
  const diagnosis = patient?.icd ?? patient?.diagnosis ?? "-";
  const age = patient?.age ?? "-";
  const gender = patient?.sex || patient?.gender || "-";

  const [values, setValues] = useState({
    date_of_appointment: formatToday(),
    type_holter: "",
    diagnosis,
    age,
    gender,
    underlying: "",
    underlying_others: "",
    hours_recording: "",
    ecg_channel: "",
    emr_technical_report: "",
    final_report: "",
    graf_1: null,
    graf_2: null
  });

  useEffect(() => {
    setValues(v => ({
      ...v,
      diagnosis: patient?.icd ?? patient?.diagnosis ?? "-",
      age: patient?.age ?? "-",
      gender: patient?.sex || patient?.gender || "-"
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

  const HOLTER_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "HOLTER", ms: "HOLTER" },
    actions: [
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
            name: "type_holter",
            label: { en: "Type of Holter", ms: "Jenis Holter" },
            type: "radio",
            options: TYPE_HOLTER_OPTIONS,
            labelAbove: true
          },
          {
            name: "hours_recording",
            label: { en: "Hours Recording", ms: "Jam Rakaman" },
            type: "radio",
            options: HOURS_RECORDING_OPTIONS
          },
          {
            name: "ecg_channel",
            label: { en: "ECG Channel", ms: "Saluran ECG" },
            type: "radio",
            options: ECG_CHANNEL_OPTIONS
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
            type: "textarea",
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
        schema={HOLTER_SCHEMA}
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