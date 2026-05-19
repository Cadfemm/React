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
 export const EVOKE_SCHEMA = {
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
            label: { en: "Date of Appointment", ms: "Tarikh Temujanji" },
            type: "date",
            placeholder: { en: "Select Date", ms: "Pilih Tarikh" }
          },
          {
            name: "type_of_study",
            label: { en: "Type of Study", ms: "Jenis Kajian" },
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
          // {
          //   name: "emr_technical_report",
          //   label: { en: "Emr Technical Report By", ms: "Laporan Teknikal Emr Oleh" },
          //   type: "radio",
          //   options: EMR_REPORT_OPTIONS,
          //   labelAbove: true
          // },
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
  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: "",
    past_family_history: "",
    alerts_and_allergies: ""
  });

  const storageKey = patient
    ? `psychology_assessment_draft_${patient.id}`
    : null;
 useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setValues(JSON.parse(saved).values || {});
  }, [storageKey]);


 useEffect(() => {
        if (!patient) return;
        setPatientHistory({
          past_medical_history: patient.medical_history || "",
          past_family_history: patient.family_medical_history || "",
          alerts_and_allergies: patient.alerts_and_allergies_history || ""
        });
      }, [patient]);
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
function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
  if (!patient) return null;

  const safe = (v) => v ?? "-";
  const formatDate = (d) => d ? new Date(d).toLocaleDateString() : "-";

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        fontSize: 14
      }}>
        <div><b>Name:</b> {safe(patient.name)}</div>
        <div><b>IC:</b> {safe(patient.id)}</div>
        <div><b>DOB:</b> {formatDate(patient.dob)}</div>

        <div><b>Age / Gender:</b> {safe(patient.age)} / {safe(patient.sex)}</div>
        <div><b>ICD:</b> {safe(patient.icd)}</div>
        <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>

        <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
        <div><b>Duration of Diagnosis:</b> -</div>
        <div><b>Primary Diagnosis:</b> {safe(patient.diagnosis_history)}</div>

        <div><b>Secondary Diagnosis:</b> {safe(patient.medical_history)}</div>
        <div><b>Dominant Side:</b> {safe(patient.dominant_side)}</div>
        <div><b>Language Preference:</b> {safe(patient.language_preference)}</div>

        <div><b>Education Level:</b> {safe(patient.education_background)}</div>
        <div><b>Occupation:</b> {safe(patient.occupation)}</div>
        <div><b>Work Status:</b> {safe(patient.employment_status)}</div>

        <div><b>Driving Status:</b> {safe(patient.driving_status)}</div>
        <div><b>PP/OB:</b> {safe(patient.pp_ob)}</div>
        <div><b>Weight:</b> {patient.weight ? `${patient.weight} kg` : "-"}</div>

        {/* ===== HISTORY ===== */}
        <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
        
           <h3>Patient History</h3>
        
                  <div>
                    <b>Past Medical History</b>
                    <textarea
                      style={textarea}
                      value={patientHistory.past_medical_history}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          past_medical_history: e.target.value
                        }))
                      }
                    />
                  </div>

          
          <div>
                    <b>Family History</b>
                    <textarea
                      style={textarea}
                      value={patientHistory.past_family_history}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          past_family_history: e.target.value
                        }))
                      }
                    />
                  </div>

        
           <div>
                    <b>Allergies</b>
                    <textarea
                      style={textarea}
                      value={patientHistory.alerts_and_allergies}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          alerts_and_allergies: e.target.value
                        }))
                      }
                    />
                  </div>

          <button style={alertBtn}>🚨 Alerts</button>
        </div>
      </div>
    </div>
  );
}

  return (
    <div>
     <CommonFormBuilder
          schema={{ title: "Patient Information", sections: [] }}
          values={{}}
          onChange={() => {}}
        >
          <PatientInformationBlock
            patient={patient}
            patientHistory={patientHistory}
            setPatientHistory={setPatientHistory}
          />
        
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
const textarea = {
          width: "100%",
          minHeight: 90,
          marginTop: 6,
          marginBottom: 12,
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid #d1d5db",
          fontSize: 14,
          resize: "vertical"
};
const alertBtn = {
  marginTop: 10,
          padding: "10px 20px",
          borderRadius: 6,
          border: "1.5px solid #007bff",
          background: "#007bff",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer"
};
