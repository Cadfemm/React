import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object" && text !== null && !Array.isArray(text)) return text[lang] || text.en || "";
  return String(text);
};

const TYPE_EEG_OPTIONS = [
  { value: "routine", label: { en: "ROUTINE EEG", ms: "EEG RUTIN" } },
  { value: "sleep_deprived", label: { en: "SLEEP DEPRIVED EEG", ms: "EEG KURANG TIDUR" } },
  { value: "video_telemetry", label: { en: "VIDEO TELEMETRY RECORDING", ms: "RAKAMAN TELEMETRI VIDEO" } }
];

const SEDATION_OPTIONS = [
  { value: "yes", label: { en: "YES", ms: "YA" } },
  { value: "no", label: { en: "NO", ms: "TIDAK" } }
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
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

const YES_NO_OPTIONS = [
  { value: "yes", label: { en: "YES", ms: "YA" } },
  { value: "no", label: { en: "NO", ms: "TIDAK" } }
];

const HYPERVENTILATION_OPTIONS = [
  { value: "3_min", label: { en: "3 MINUTES", ms: "3 MINIT" } },
  { value: "5_min", label: { en: "5 MINUTES", ms: "5 MINIT" } },
  { value: "not_done", label: { en: "NOT DONE", ms: "TIDAK DILAKUKAN" } }
];

const DIAGNOSIS_OPTIONS = [
  { value: "stroke", label: { en: "STROKE", ms: "STROK" } },
  { value: "tbi", label: { en: "TBI", ms: "TBI" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "normal", label: { en: "NORMAL EEG", ms: "EEG NORMAL" } },
  { value: "abnormal", label: { en: "ABNORMAL EEG", ms: "EEG TIDAK NORMAL" } },
  { value: "borderline", label: { en: "BORDERLINE EEG", ms: "EEG SEMPADAN" } }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: { en: "MEDICAL ASSISTANT", ms: "PEMBANTU PERUBATAN" } },
  { value: "eeg_technologist", label: { en: "EEG TECHNOLOGIST", ms: "TEKNOLOGIST EEG" } },
  { value: "neurologist", label: { en: "NEUROLOGIST", ms: "PAKAR NEUROLOGI" } }
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
            label: { en: "DATE OF APPOINTMENT", ms: "TARIKH TEMUJANJI" },
            type: "date",
            placeholder: { en: "Select date", ms: "Pilih tarikh" }
          },
          {
            name: "type_eeg",
            label: { en: "TYPE OF EEG", ms: "JENIS EEG" },
            type: "radio",
            options: TYPE_EEG_OPTIONS,
            labelAbove: true
          },
          {
            type: "row",
            fields: [
              { name: "gender", label: { en: "GENDER", ms: "JANTINA" }, type: "input", readOnly: true },
              { name: "age", label: { en: "AGE", ms: "UMUR" }, type: "input", readOnly: true }
            ]
          },
          {
            name: "general_appearance",
            label: { en: "GENERAL APPEARANCE & MENTAL STATUS", ms: "PENAMPAKAN UMUM & STATUS MENTAL" },
            type: "textarea",
            placeholder: { en: "Free text", ms: "Teks bebas" }
          },
          {
            name: "medication",
            label: { en: "MEDICATION", ms: "UBATAN" },
            type: "textarea",
            placeholder: { en: "Free text", ms: "Teks bebas" }
          },
          {
            name: "sedation",
            label: { en: "SEDATION", ms: "SEDASI" },
            type: "radio",
            options: SEDATION_OPTIONS
          },
          { type: "subheading", label: { en: "Technical Settings", ms: "Tetapan Teknikal" } },
          {
            name: "sensitivity",
            label: { en: "SENSITIVITY", ms: "KEHASILAN" },
            type: "radio",
            options: SENSITIVITY_OPTIONS
          },
          {
            name: "high_freq_filter",
            label: { en: "HIGH FREQUENCY FILTER", ms: "PENAPIS FREKUENSI TINGGI" },
            type: "radio",
            options: HIGH_FREQ_OPTIONS
          },
          {
            name: "low_freq_filter",
            label: { en: "LOW FREQUENCY FILTER", ms: "PENAPIS FREKUENSI RENDAH" },
            type: "radio",
            options: LOW_FREQ_OPTIONS
          },
          {
            name: "paper_speed",
            label: { en: "PAPER SPEED", ms: "KELAJUAN KERTAS" },
            type: "radio",
            options: PAPER_SPEED_OPTIONS
          },
          {
            name: "montages",
            label: { en: "MONTAGES", ms: "MONTAGES" },
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
            label: { en: "ELECTROCARDIOGRAM", ms: "ELEKTROKARDIOGRAM" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "electromyogram",
            label: { en: "ELECTROMYOGRAM", ms: "ELEKTROMIOGRAM" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "photic_stimulation",
            label: { en: "PHOTIC STIMULATION", ms: "RANGSANGAN FOTIK" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "hyperventilation",
            label: { en: "HYPERVENTILATION", ms: "HIPERVENTILASI" },
            type: "radio",
            options: HYPERVENTILATION_OPTIONS
          },
          {
            name: "previous_eeg",
            label: { en: "PREVIOUS EEG", ms: "EEG SEBELUMNYA" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          { type: "subheading", label: { en: "Report", ms: "Laporan" } },
          {
            name: "diagnosis",
            label: { en: "DIAGNOSIS", ms: "DIAGNOSIS" },
            type: "radio",
            options: DIAGNOSIS_OPTIONS
          },
          {
            name: "diagnosis_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "diagnosis", equals: "others" }
          },
          {
            name: "final_report",
            label: { en: "FINAL REPORT", ms: "LAPORAN AKHIR" },
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
          },
          {
            name: "graf",
            title: { en: "GRAF (RUNNING GRAF REPORT & VIDEO)", ms: "GRAF (LAPORAN GRAF BERJALAN & VIDEO)" },
            type: "attach-file",
            accept: "image/*,.pdf,video/*"
          },
          {
            name: "emr_factual_report",
            label: { en: "EMR FACTUAL REPORT", ms: "LAPORAN FAKTA EMR" },
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
      schema={EEG_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
      language={language}
    />
  );
}
