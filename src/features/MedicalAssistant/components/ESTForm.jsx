import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object" && text !== null && !Array.isArray(text)) return text[lang] || text.en || "";
  return String(text);
};

const TYPE_EST_OPTIONS = [
  { value: "treadmill", label: { en: "Exercise stress test treadmill", ms: "Ujian tekanan senaman treadmill" } },
  { value: "treadmill_wheelchair", label: { en: "Exercise stress test treadmill with wheelchair", ms: "Ujian tekanan senaman treadmill dengan kerusi roda" } },
  { value: "ergometry", label: { en: "Ergometry", ms: "Ergometri" } }
];

const INDICATION_OPTIONS = [
  { value: "induce_aneurysm", label: { en: "INDUCE Aneurysm", ms: "INDUCE Aneurisma" } },
  { value: "chronotropic_factor", label: { en: "CHRONOTROPIC FACTOR", ms: "FAKTOR KRONOTROPIK" } },
  { value: "ischemic_changes", label: { en: "ISCHEMIC CHANGES", ms: "PERUBAHAN ISKEMIK" } },
  { value: "cad_screening", label: { en: "CAD SCREENING", ms: "SISTING CAD" } },
  { value: "treatment_progressing", label: { en: "TREATMENT PROGRESSING", ms: "KEMAJUAN RAWATAN" } }
];

const UNDERLYING_OPTIONS = [
  { value: "major", label: { en: "MAJOR CARDIAC ISSUE", ms: "MASALAH JANTUNG UTAMA" } },
  { value: "minor", label: { en: "MINOR CARDIAC ISSUE", ms: "MASALAH JANTUNG KECIL" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

const PROTOCOL_OPTIONS = [
  { value: "bruce", label: { en: "Bruce", ms: "Bruce" } },
  { value: "modified_bruce", label: { en: "Modified Bruce", ms: "Bruce Diubahsuai" } },
  { value: "who", label: { en: "WHO", ms: "WHO" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: { en: "MEDICAL ASSISTANT", ms: "PEMBANTU PERUBATAN" } },
  { value: "cardiovascular_technologist", label: { en: "CARDIOVASCULAR TECHNOLOGIST", ms: "TEKNOLOGIST KARDIOVASKULAR" } },
  { value: "medical_officer", label: { en: "MEDICAL OFFICER", ms: "PEGAWAI PERUBATAN" } },
  { value: "cardiologist", label: { en: "CARDIOLOGIST", ms: "PAKAR KARDIOLOGI" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "positive", label: { en: "POSITIVE STRESS TEST", ms: "UJIAN TEKANAN POSITIF" } },
  { value: "negative", label: { en: "NEGATIVE STRESS TEST", ms: "UJIAN TEKANAN NEGATIF" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
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

  const EST_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "EST (EXERCISE STRESS TEST)", ms: "EST (UJIAN TEKANAN SENAMAN)" },
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
            name: "type_est",
            label: { en: "TYPE OF EST", ms: "JENIS EST" },
            type: "radio",
            options: TYPE_EST_OPTIONS,
            labelAbove: true
          },
          {
            type: "row",
            fields: [
              { name: "age", label: { en: "AGE", ms: "UMUR" }, type: "input", readOnly: true },
              { name: "bmi", label: { en: "BMI", ms: "BMI" }, type: "input", readOnly: true }
            ]
          },
          {
            name: "target_heart_rate",
            label: { en: "TARGET HEART RATE", ms: "KADAR DENYUTAN JANTUNG SASARAN" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" }
          },
          {
            name: "diagnosis",
            label: { en: "DIAGNOSIS (Grouping ICD)", ms: "DIAGNOSIS (Kumpulan ICD)" },
            type: "input",
            readOnly: true
          },
          {
            name: "indication",
            label: { en: "INDICATION", ms: "INDIKASI" },
            type: "radio",
            options: INDICATION_OPTIONS,
            labelAbove: true
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
            name: "protocol",
            label: { en: "PROTOCOL", ms: "PROTOKOL" },
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
          {
            name: "final_report_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "final_report", equals: "others" }
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
      schema={EST_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
      language={language}
    />
  );
}
