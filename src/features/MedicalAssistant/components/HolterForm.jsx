import React, { useState, useEffect } from "react";
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
  { value: "major", label: { en: "MAJOR CARDIAC ISSUE", ms: "MASALAH JANTUNG UTAMA" } },
  { value: "minor", label: { en: "MINOR CARDIAC ISSUE", ms: "MASALAH JANTUNG KECIL" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
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
  { value: "medical_assistant", label: { en: "MEDICAL ASSISTANT", ms: "PEMBANTU PERUBATAN" } },
  { value: "cardiovascular_technologist", label: { en: "CARDIOVASCULAR TECHNOLOGIST", ms: "TEKNOLOGIST KARDIOVASKULAR" } },
  { value: "medical_officer", label: { en: "MEDICAL OFFICER", ms: "PEGAWAI PERUBATAN" } },
  { value: "cardiologist", label: { en: "CARDIOLOGIST", ms: "PAKAR KARDIOLOGI" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "positive", label: { en: "POSITIVE STUDY", ms: "KAJIAN POSITIF" } },
  { value: "negative", label: { en: "NEGATIVE STUDY", ms: "KAJIAN NEGATIF" } }
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
            label: { en: "DATE OF APPOINTMENT", ms: "TARIKH TEMUJANJI" },
            type: "date",
            placeholder: { en: "Select date", ms: "Pilih tarikh" }
          },
          {
            name: "type_holter",
            label: { en: "TYPE OF HOLTER", ms: "JENIS HOLTER" },
            type: "radio",
            options: TYPE_HOLTER_OPTIONS,
            labelAbove: true
          },
          {
            type: "row",
            fields: [
              { name: "diagnosis", label: { en: "DIAGNOSIS (Grouping ICD)", ms: "DIAGNOSIS (Kumpulan ICD)" }, type: "input", readOnly: true },
              { name: "age", label: { en: "AGE", ms: "UMUR" }, type: "input", readOnly: true },
              { name: "gender", label: { en: "GENDER", ms: "JANTINA" }, type: "input", readOnly: true }
            ]
          },
          {
            name: "underlying",
            label: { en: "UNDERLYING", ms: "PENYEBAB ASAS" },
            type: "radio",
            options: UNDERLYING_OPTIONS
          },
          {
            name: "underlying_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "underlying", equals: "others" }
          },
          {
            name: "hours_recording",
            label: { en: "HOURS RECORDING", ms: "JAM RAKAMAN" },
            type: "radio",
            options: HOURS_RECORDING_OPTIONS
          },
          {
            name: "ecg_channel",
            label: { en: "ECG CHANNEL", ms: "SALURAN ECG" },
            type: "radio",
            options: ECG_CHANNEL_OPTIONS
          },
          {
            name: "emr_technical_report",
            label: { en: "EMR TECHNICAL REPORT BY", ms: "LAPORAN TEKNIKAL EMR OLEH" },
            type: "radio",
            options: EMR_REPORT_OPTIONS,
            labelAbove: true
          },
          {
            name: "final_report",
            label: { en: "FINAL REPORT", ms: "LAPORAN AKHIR" },
            type: "radio",
            options: FINAL_REPORT_OPTIONS
          },
          { type: "subheading", label: { en: "GRAF", ms: "GRAF" } },
          {
            type: "row",
            fields: [
              {
                name: "graf_1",
                label: { en: "Upload", ms: "Muat naik" },
                title: { en: "GRAF 1", ms: "GRAF 1" },
                type: "attach-file",
                accept: "image/*,.pdf"
              },
              {
                name: "graf_2",
                label: { en: "Upload", ms: "Muat naik" },
                title: { en: "GRAF 2", ms: "GRAF 2" },
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
      schema={HOLTER_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
      language={language}
    />
  );
}
