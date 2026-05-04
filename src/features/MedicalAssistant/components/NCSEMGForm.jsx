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
  { value: "ncs", label: { en: "Nerves Conduction Study (NCS)", ms: "Kajian Pengaliran Saraf (NCS)" } },
  { value: "emg", label: { en: "Electromyogram (EMG)", ms: "Elektromiogram (EMG)" } },
  { value: "both", label: {en: "Both", ms: "Both"}}
];

const YES_NO_OPTIONS = [
  { value: "yes", label: { en: "Yes", ms: "Ya" } },
  { value: "no", label: { en: "No", ms: "Tidak" } }
];

const LOCATION_OPTIONS = [
  { value: "upper", label: { en: "Upper Extremity", ms: "Anggota Badan Atas" } },
  { value: "lower", label: { en: "Lower Extremity", ms: "Anggota Badan Bawah" } },
  { value: "upper_lower", label: { en: "Upper & Lower Extremity", ms: "Anggota Badan Atas & Bawah" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
];

const STUDY_MODALITY_OPTIONS = [
  { value: "motor", label: { en: "Motor Study", ms: "Kajian Motor" } },
  { value: "sensory", label: { en: "Sensory Study", ms: "Kajian Deria" } },
  { value: "motor_sensory", label: { en: "Motor & Sensory Study", ms: "Kajian Motor & Deria" } },
  { value: "late_response", label: { en: "Late Response", ms: "Respon Lambat" } }
];

const SENSITIVITY_OPTIONS = [
  { value: "20", label: { en: "20 μV", ms: "20 μV" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
];

const DURATION_OPTIONS = [
  { value: "1", label: { en: "1 m/sec", ms: "1 m/saat" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
];

const TIME_BASE_OPTIONS = [
  { value: "2", label: { en: "2 m/sec", ms: "2 m/saat" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: { en: "Medical Assistant", ms: "Pembantu Perubatan" } },
  { value: "electroneuro_technician", label: { en: "Electroneurodiagnostic Technician", ms: "Teknikal Elektroneurodiagnostik" } },
  { value: "neurologist", label: { en: "Neurologist", ms: "Pakar Neurologi" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "normal", label: { en: "Normal Findings", ms: "Pemerhatian Normal" } },
  { value: "abnormal", label: { en: "Abnormal Findings", ms: "Pemerhatian Tidak Normal" } },
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

  // const PATIENT_SCHEMA = {
  //   title: "Patient Information",
  //   sections: []
  // }
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

  const NCSEMG_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "NCS(Nerve conduction studies) & EMG(Electomyography)", ms: "NCS & EMG" },
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
            name: "location",
            label: { en: "Location", ms: "Lokasi" },
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
            label: { en: "Type Of Study (Modality)", ms: "Jenis Kajian (Modaliti)" },
            type: "radio",
            options: STUDY_MODALITY_OPTIONS,
            labelAbove: true
          },
          {
            name: "previous_study",
            label: { en: "Previous Study", ms: "Kajian Sebelumnya" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
  name: "previous_study_upload",
  label: { en: "Upload Previous NCS/EMG", ms: "Muat naik NCS/EMG Sebelumnya" },
  type: "attach-file",
  accept: "image/*,.pdf",
  showIf: { field: "previous_study", equals: "yes" }
},
          {
            name: "sensitivity",
            label: { en: "Sensitivity", ms: "Kehasilan" },
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
            label: { en: "Duration", ms: "Tempoh" },
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
            label: { en: "Time Base", ms: "Asas Masa" },
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
            options: FINAL_REPORT_OPTIONS
          },
          {
            name: "final_report_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "final_report", oneOf: ["normal", "abnormal"] }
          },
        ]
      }
    ]
  };

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
        schema={NCSEMG_SCHEMA}
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
