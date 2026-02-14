import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object" && text !== null && !Array.isArray(text)) return text[lang] || text.en || "";
  return String(text);
};

const TYPE_OF_STUDY_OPTIONS = [
  { value: "vep", label: { en: "Visual Evoked Potential", ms: "Potensi Terangsang Visual" } },
  { value: "baep", label: { en: "Brain Stem Auditory Evoked Potential", ms: "Potensi Terangsang Pendengaran Batang Otak" } },
  { value: "ssep_lower", label: { en: "Somatosensory Evoked Potential Lower Limb (Posterior Tibial Nerves)", ms: "Potensi Terangsang Somatosensori Anggota Bawah (Saraf Tibial Posterior)" } },
  { value: "ssep_upper", label: { en: "Somatosensory Evoked Potential Upper Limb (Median Nerves)", ms: "Potensi Terangsang Somatosensori Anggota Atas (Saraf Median)" } }
];

const YES_NO_OPTIONS = [
  { value: "yes", label: { en: "YES", ms: "YA" } },
  { value: "no", label: { en: "NO", ms: "TIDAK" } }
];

const MODE_SELECTION_OPTIONS = [
  { value: "vep_pattern", label: { en: "VEP PATTERN", ms: "CORAK VEP" } },
  { value: "vep_goggles", label: { en: "VEP-GOGGLES", ms: "VEP-GOGGEL" } },
  { value: "baer", label: { en: "BAER", ms: "BAER" } },
  { value: "ssep", label: { en: "SSEP", ms: "SSEP" } }
];

const SENSITIVITY_OPTIONS = [
  { value: "off", label: { en: "OFF", ms: "MATIKAN" } },
  { value: "20", label: { en: "20 μV/mm", ms: "20 μV/mm" } }
];

const HIGH_FREQ_OPTIONS = [
  { value: "off", label: { en: "OFF", ms: "MATIKAN" } },
  { value: "100", label: { en: "100 Hz", ms: "100 Hz" } }
];

const LOW_FREQ_OPTIONS = [
  { value: "off", label: { en: "OFF", ms: "MATIKAN" } },
  { value: "1", label: { en: "1 Hz", ms: "1 Hz" } }
];

const IMPEDANCE_OPTIONS = [
  { value: "under_5", label: { en: "< 5 kΩ", ms: "< 5 kΩ" } },
  { value: "over_5", label: { en: "> 5 kΩ", ms: "> 5 kΩ" } }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: { en: "MEDICAL ASSISTANT", ms: "PEMBANTU PERUBATAN" } },
  { value: "electroneuro_technician", label: { en: "ELECTRONEURODIAGNOSTIC TECHNICIAN", ms: "TEKNIKAL ELEKTRONEURODIAGNOSTIK" } },
  { value: "medical_officer", label: { en: "MEDICAL OFFICER", ms: "PEGAWAI PERUBATAN" } },
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

export default function EvokePotentialForm({ patient, onBack }) {
  const [language, setLanguage] = useState("en");
  const diagnosis = patient?.icd ?? patient?.diagnosis ?? "-";

  const [values, setValues] = useState({
    date_of_appointment: formatToday(),
    type_of_study: "",
    diagnosis,
    trace_old_report: "",
    mode_selection: "",
    sensitivity: "",
    high_freq_filter: "",
    low_freq_filter: "",
    impedance_check: "",
    emr_technical_report: "",
    final_report: "",
    final_report_others: ""
  });

  useEffect(() => {
    setValues(v => ({
      ...v,
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

  const EVOKE_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "EVOKE POTENTIAL STUDY", ms: "KAJIAN POTENSI TERANGSANG" },
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
            name: "diagnosis",
            label: { en: "DIAGNOSIS (Grouping ICD)", ms: "DIAGNOSIS (Kumpulan ICD)" },
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
            name: "mode_selection",
            label: { en: "MODE SELECTION", ms: "PEMILIHAN MOD" },
            type: "radio",
            options: MODE_SELECTION_OPTIONS
          },
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
            name: "impedance_check",
            label: { en: "IMPEDANCE CHECK", ms: "SEMAKAN IMPEDANS" },
            type: "radio",
            options: IMPEDANCE_OPTIONS
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
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={EVOKE_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
      language={language}
    />
  );
}
