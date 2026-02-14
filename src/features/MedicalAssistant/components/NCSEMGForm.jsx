import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object" && text !== null && !Array.isArray(text)) return text[lang] || text.en || "";
  return String(text);
};

const TYPE_OF_STUDY_OPTIONS = [
  { value: "ncs", label: { en: "Nerves Conduction Study (NCS)", ms: "Kajian Pengaliran Saraf (NCS)" } },
  { value: "emg", label: { en: "Electromyogram (EMG)", ms: "Elektromiogram (EMG)" } }
];

const YES_NO_OPTIONS = [
  { value: "yes", label: { en: "YES", ms: "YA" } },
  { value: "no", label: { en: "NO", ms: "TIDAK" } }
];

const LOCATION_OPTIONS = [
  { value: "upper", label: { en: "UPPER EXTREMITY", ms: "ANGGOTA BADAN ATAS" } },
  { value: "lower", label: { en: "LOWER EXTREMITY", ms: "ANGGOTA BADAN BAWAH" } },
  { value: "upper_lower", label: { en: "UPPER & LOWER EXTREMITY", ms: "ANGGOTA BADAN ATAS & BAWAH" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

const STUDY_MODALITY_OPTIONS = [
  { value: "motor", label: { en: "MOTOR STUDY", ms: "KAJIAN MOTOR" } },
  { value: "sensory", label: { en: "SENSORY STUDY", ms: "KAJIAN DERIA" } },
  { value: "motor_sensory", label: { en: "MOTOR & SENSORY STUDY", ms: "KAJIAN MOTOR & DERIA" } },
  { value: "late_response", label: { en: "LATE RESPONSE", ms: "RESPON LAMBAT" } }
];

const SENSITIVITY_OPTIONS = [
  { value: "20", label: { en: "20 μV", ms: "20 μV" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

const DURATION_OPTIONS = [
  { value: "1", label: { en: "1 m/sec", ms: "1 m/saat" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

const TIME_BASE_OPTIONS = [
  { value: "2", label: { en: "2 m/sec", ms: "2 m/saat" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: { en: "MEDICAL ASSISTANT", ms: "PEMBANTU PERUBATAN" } },
  { value: "electroneuro_technician", label: { en: "ELECTRONEURODIAGNOSTIC TECHNICIAN", ms: "TEKNIKAL ELEKTRONEURODIAGNOSTIK" } },
  { value: "neurologist", label: { en: "NEUROLOGIST", ms: "PAKAR NEUROLOGI" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "normal", label: { en: "NORMAL FINDINGS", ms: "PEMERHATIAN NORMAL" } },
  { value: "abnormal", label: { en: "ABNORMAL FINDINGS", ms: "PEMERHATIAN TIDAK NORMAL" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

function formatToday() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export default function NCSEMGForm({ patient, onBack }) {
  const [language, setLanguage] = useState("en");
  const diagnosis = patient?.icd ?? patient?.diagnosis ?? "-";
  const age = patient?.age ?? "-";
  const height = patient?.height ?? "-";

  const [values, setValues] = useState({
    date_of_appointment: formatToday(),
    type_of_study: "ncs",
    diagnosis,
    age,
    height,
    trace_old_report: "",
    location: "",
    location_others: "",
    study_modality: "",
    previous_study: "",
    sensitivity: "",
    sensitivity_others: "",
    duration: "",
    duration_others: "",
    time_base: "",
    time_base_others: "",
    emr_factual_report: "",
    final_report: "",
    final_report_others: "",
    graf_1: null,
    graf_2: null
  });

  useEffect(() => {
    setValues(v => ({
      ...v,
      diagnosis: patient?.icd ?? patient?.diagnosis ?? "-",
      age: patient?.age ?? "-",
      height: patient?.height ?? "-"
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

  const NCSEMG_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "NCS & EMG", ms: "NCS & EMG" },
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
            name: "type_of_study",
            label: { en: "TYPE OF STUDY", ms: "JENIS KAJIAN" },
            type: "radio",
            options: TYPE_OF_STUDY_OPTIONS,
            labelAbove: true
          },
          {
            type: "row",
            fields: [
              { name: "diagnosis", label: { en: "DIAGNOSIS (Grouping ICD)", ms: "DIAGNOSIS (Kumpulan ICD)" }, type: "input", readOnly: true },
              { name: "age", label: { en: "AGE", ms: "UMUR" }, type: "input", readOnly: true }
            ]
          },
          {
            name: "height",
            label: { en: "HEIGHT (cm)", ms: "TINGGI (cm)" },
            type: "input",
            readOnly: true
          },
          {
            name: "trace_old_report",
            label: { en: "TRACE OLD REPORT", ms: "JEJAK LAPORAN LAMA" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "location",
            label: { en: "LOCATION", ms: "LOKASI" },
            type: "radio",
            options: LOCATION_OPTIONS
          },
          {
            name: "location_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "location", equals: "others" }
          },
          {
            name: "study_modality",
            label: { en: "TYPE OF STUDY (Modality)", ms: "JENIS KAJIAN (Modaliti)" },
            type: "radio",
            options: STUDY_MODALITY_OPTIONS,
            labelAbove: true
          },
          {
            name: "previous_study",
            label: { en: "PREVIOUS STUDY", ms: "KAJIAN SEBELUMNYA" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "sensitivity",
            label: { en: "SENSITIVITY", ms: "KEHASILAN" },
            type: "radio",
            options: SENSITIVITY_OPTIONS
          },
          {
            name: "sensitivity_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "sensitivity", equals: "others" }
          },
          {
            name: "duration",
            label: { en: "DURATION", ms: "TEMPOH" },
            type: "radio",
            options: DURATION_OPTIONS
          },
          {
            name: "duration_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "duration", equals: "others" }
          },
          {
            name: "time_base",
            label: { en: "TIME BASE", ms: "ASAAS MASA" },
            type: "radio",
            options: TIME_BASE_OPTIONS
          },
          {
            name: "time_base_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "time_base", equals: "others" }
          },
          {
            name: "emr_factual_report",
            label: { en: "EMR FACTUAL REPORT", ms: "LAPORAN FAKTA EMR" },
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
      schema={NCSEMG_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
      language={language}
    />
  );
}
