import React, { useState, useEffect } from "react";
import PatientCard from "../../../shared/cards/PatientCard"
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object" && text !== null && !Array.isArray(text)) return text[lang] || text.en || "";
  return String(text);
};

const TYPE_EEG_OPTIONS = [
  { value: "routine", label: { en: "Routine EEG", ms: "EEG Rutin" } },
  { value: "sleep_deprived", label: { en: "Sleep Deprived EEG", ms: "EEG Kurang Tidur" } },
  { value: "video_telemetry", label: { en: "Video Telemetry Recording", ms: "Rakaman Telemetri Video" } }
];

const SEDATION_OPTIONS = [
  { value: "yes", label: { en: "Yes", ms: "Ya" } },
  { value: "no", label: { en: "No", ms: "Tidak" } }
];

const SENSITIVITY_OPTIONS = [
  { value: "5", label: { en: "5 μV/mm", ms: "5 μV/mm" } },
  { value: "7", label: { en: "7 μV/mm", ms: "7 μV/mm" } },
  { value: "10", label: { en: "10 μV/mm", ms: "10 μV/mm" } },
  { value: "15", label: { en: "15 μV/mm", ms: "15 μV/mm" } }
];

const HIGH_FREQ_OPTIONS = [
  { value: "off", label: { en: "OFF", ms: "MATIKAN" } },
  { value: "50", label: { en: "50 Hz", ms: "50 Hz" } },
  { value: "70", label: { en: "70 Hz", ms: "70 Hz" } },
  { value: "100", label: { en: "100 Hz", ms: "100 Hz" } }
];

const LOW_FREQ_OPTIONS = [
  { value: "off", label: { en: "OFF", ms: "MATIKAN" } },
  { value: "0.1", label: { en: "0.1 Hz", ms: "0.1 Hz" } },
  { value: "0.3", label: { en: "0.3 Hz", ms: "0.3 Hz" } },
  { value: "0.5", label: { en: "0.5 Hz", ms: "0.5 Hz" } }
];

const PAPER_SPEED_OPTIONS = [
  { value: "60", label: { en: "60 mm/sec", ms: "60 mm/saat" } },
  { value: "30", label: { en: "30 mm/sec", ms: "30 mm/saat" } },
  { value: "16", label: { en: "16 mm/sec", ms: "16 mm/saat" } },
  { value: "3_10", label: { en: "3-10 mm/sec", ms: "3-10 mm/saat" } }
];

const MONTAGES_OPTIONS = [
  { value: "av_referential", label: { en: "AV Referential", ms: "AV Referential" } },
  { value: "bipolar", label: { en: "Bipolar / Double Banana", ms: "Bipolar / Double Banana" } },
  { value: "transverse", label: { en: "Transverse", ms: "Melintang" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
];

const YES_NO_OPTIONS = [
  { value: "yes", label: { en: "Yes", ms: "Ya" } },
  { value: "no", label: { en: "No", ms: "Tidak" } }
];

const HYPERVENTILATION_OPTIONS = [
  { value: "3_min", label: { en: "3 Minutes", ms: "3 Minit" } },
  { value: "5_min", label: { en: "5 Minutes", ms: "5 Minit" } },
  { value: "not_done", label: { en: "Not Done", ms: "Tidak Dilakukan" } }
];

const DIAGNOSIS_OPTIONS = [
  { value: "stroke", label: { en: "STROKE", ms: "STROK" } },
  { value: "tbi", label: { en: "TBI", ms: "TBI" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "normal", label: { en: "Normal EEG", ms: "EEG Normal" } },
  { value: "abnormal", label: { en: "Abnormal EEG", ms: "EEG Tidak Normal" } },
  { value: "borderline", label: { en: "Borderline EEG", ms: "EEG Sempadan" } }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: { en: "Medical Assistant", ms: "Pembantu Perubatan" } },
  { value: "eeg_technologist", label: { en: "EEG Technologist", ms: "Teknologis EEG" } },
  { value: "neurologist", label: { en: "Neurologist", ms: "Pakar Neurologi" } }
];

function formatToday() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export default function EEGForm({ patient, onBack }) {
  const [language, setLanguage] = useState("en");
  const gender = patient?.sex || patient?.gender || "-";
  const age = patient?.age ?? "-";

  const [values, setValues] = useState({
    date_of_appointment: formatToday(),
    type_eeg: "routine",
    gender,
    age,
    general_appearance: "",
    medication: "",
    sedation: "no",
    sensitivity: "",
    high_freq_filter: "",
    low_freq_filter: "",
    paper_speed: "",
    montages: "",
    montages_others: "",
    electrocardiogram: "",
    electromyogram: "",
    photic_stimulation: "",
    hyperventilation: "",
    previous_eeg: "",
    diagnosis: "",
    diagnosis_others: "",
    final_report: "",
    final_report_abnormal: "",
    final_report_borderline: "",
    graf: null,
    emr_factual_report: ""
  });

  useEffect(() => {
    setValues(v => ({
      ...v,
      gender: patient?.sex || patient?.gender || "-",
      age: patient?.age ?? "-"
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

  const EEG_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "EEG", ms: "EEG" },
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
            name: "type_eeg",
            label: { en: "Type Of EEG", ms: "Jenis EEG" },
            type: "radio",
            options: TYPE_EEG_OPTIONS,
            labelAbove: true
          },
          {
            name: "general_appearance",
            label: { en: "General Appearance & Mental Status", ms: "Penampakan Umum & Status Mental" },
            type: "textarea",
            placeholder: { en: "Free text", ms: "Teks bebas" }
          },
          {
            name: "medication",
            label: { en: "Medication", ms: "Ubatan" },
            type: "textarea",
            readOnly: true,
            placeholder: { en: "Free text", ms: "Teks bebas" }
          },
          {
            name: "sedation",
            label: { en: "Sedation", ms: "Sedasi" },
            type: "radio",
            options: SEDATION_OPTIONS
          },
          { type: "subheading", label: { en: "Technical Settings", ms: "Tetapan Teknikal" } },
          {
            name: "sensitivity",
            label: { en: "Sensitivity", ms: "Kehasilan" },
            type: "radio",
            options: SENSITIVITY_OPTIONS
          },
          {
            name: "high_freq_filter",
            label: { en: "High Frequency Filter", ms: "Penapis Frekuensi Tinggi" },
            type: "radio",
            options: HIGH_FREQ_OPTIONS
          },
          {
            name: "low_freq_filter",
            label: { en: "Low Frequency Filter", ms: "Penapis Frekuensi Rendah" },
            type: "radio",
            options: LOW_FREQ_OPTIONS
          },
          {
            name: "paper_speed",
            label: { en: "Paper Speed", ms: "Kelajuan Kertas" },
            type: "radio",
            options: PAPER_SPEED_OPTIONS
          },
          {
            name: "montages",
            label: { en: "Montages", ms: "Montages" },
            type: "radio",
            options: MONTAGES_OPTIONS
          },
          {
            name: "montages_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "montages", equals: "others" }
          },
          {
            name: "electrocardiogram",
            label: { en: "Electrocardiogram", ms: "Elektrokardiogram" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "electromyogram",
            label: { en: "Electromyogram", ms: "Elektromiogram" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "photic_stimulation",
            label: { en: "Photic Stimulation", ms: "Rangsangan Fotik" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "hyperventilation",
            label: { en: "Hyperventilation", ms: "Hiperventilasi" },
            type: "radio",
            options: HYPERVENTILATION_OPTIONS
          },
          {
            name: "previous_eeg",
            label: { en: "Previous EEG", ms: "EEG Sebelumnya" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          { type: "subheading", label: { en: "Report", ms: "Laporan" } },
          {
            name: "graf",
            title: { en: "Graf (Running Graf Report & Video)", ms: "Graf (Laporan Graf Berjalan & Video)" },
            type: "attach-file",
            accept: "image/*,.pdf,video/*"
          },
          {
            name: "final_report",
            label: { en: "Final Report", ms: "Laporan Akhir" },
            type: "radio",
            options: FINAL_REPORT_OPTIONS
          },
          {
            name: "final_report_abnormal",
            label: { en: "Specify", ms: "Nyatakan" },
            type: "textarea",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "final_report", equals: "abnormal" }
          },
          {
            name: "final_report_borderline",
            label: { en: "Specify", ms: "Nyatakan" },
            type: "textarea",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "final_report", equals: "borderline" }
          }
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
        schema={EEG_SCHEMA}
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