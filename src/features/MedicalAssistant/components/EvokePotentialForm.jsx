import React, { useState, useEffect } from "react";
import PatientCard from "../../../shared/cards/PatientCard"
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
  { value: "yes", label: { en: "Yes", ms: "Ya" } },
  { value: "no", label: { en: "No", ms: "Tidak" } }
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
  { value: "medical_assistant", label: { en: "Medical Assistant", ms: "Pembantu Perubatan" } },
  { value: "electroneuro_technician", label: { en: "Electroneurodiagnostic Technician", ms: "Teknikal Elektroneurodiagnostik" } },
  { value: "medical_officer", label: { en: "Medical Officer", ms: "Pegawai Perubatan" } },
  { value: "neurologist", label: { en: "Neurologist", ms: "Pakar Neurologi" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "normal", label: { en: "Normal Findings", ms: "Pemerhatian Normal" } },
  { value: "abnormal", label: { en: "Abnormal Findings", ms: "Pemerhatian Tidak Normal" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
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

  const PATIENT_SCHEMA = {
    title: "Patient Information",
    sections: []
  }

  const EVOKE_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "Evoke Potential Study", ms: "Kajian Potensi Terangsang" },
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
            placeholder: { en: "Select Date", ms: "Pilih Tarikh" }
          },
          {
            name: "type_of_study",
            label: { en: "Type Of Study", ms: "Jenis Kajian" },
            type: "radio",
            options: TYPE_OF_STUDY_OPTIONS,
            labelAbove: true
          },
          {
            name: "trace_old_report",
            label: { en: "Trace Old Report", ms: "Jejak Laporan Lama" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "mode_selection",
            label: { en: "Mode Selection", ms: "Pemilihan Mod" },
            type: "radio",
            options: MODE_SELECTION_OPTIONS
          },
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
            name: "impedance_check",
            label: { en: "Impedance Check", ms: "Semakan Impedans" },
            type: "radio",
            options: IMPEDANCE_OPTIONS
          },
          {
            name: "emr_technical_report",
            label: { en: "Emr Technical Report By", ms: "Laporan Teknikal Emr Oleh" },
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
        schema={EVOKE_SCHEMA}
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