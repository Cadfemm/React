

import React, { useState, useEffect } from "react";
import PatientCard from "../../../shared/cards/PatientCard";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const mainContent = {};

/**
 * Resus Bay Information - consolidated VIEW from all related departments.
 * Data is read-only, sourced from patient and departmental records.
 */
export default function ResusBayInformationForm({ patient, onBack }) {
  const [language, setLanguage] = useState("en");
   const [values, setValues] = useState({});

  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: "",
    past_family_history: "",
    alerts_and_allergies: ""
  });

  useEffect(() => {
    if (!patient) return;
    setPatientHistory({
      past_medical_history: patient.medical_history || "",
      past_family_history:  patient.family_medical_history || "",
      alerts_and_allergies: patient.alerts_and_allergies_history || ""
    });
  }, [patient]);
  const storageKey = patient
    ? `psychology_assessment_draft_${patient.id}`
    : null;

   useEffect(() => {
      if (!storageKey) return;
      const saved = localStorage.getItem(storageKey);
      if (saved) setValues(JSON.parse(saved).values || {});
    }, [storageKey]);
  

  useEffect(() => {
            if (!storageKey) return;
            const saved = localStorage.getItem(storageKey);
            if (saved) {
              try {
                setValues(JSON.parse(saved).values || {});
              } catch {}
            }
          }, [storageKey]);

  const formValues = {
    aduan:               patient?.complaint || patient?.medical_history || patient?.diagnosis_history || "-",
    bp:                  patient?.vitals?.bp   || patient?.bp    || "-",
    rr:                  patient?.vitals?.rr   || patient?.rr    || "-",
    spo2:                patient?.vitals?.spo2 || patient?.spo2  || "-",
    hr:                  patient?.vitals?.hr   || patient?.pulse || patient?.hr || "-",
    temp:                patient?.vitals?.temp || patient?.temp  || "-",
    ps:                  patient?.vitals?.ps   || patient?.ps    || "-",
    xray_status:         patient?.xray_status         || "non_indicator",
    xray_result:         patient?.xray_result         || "",
    lab_status:          patient?.lab_status          || "non_indicator",
    lab_result:          patient?.lab_result          || "",
    doctor_plan:         patient?.doctor_plan         || patient?.report_from_doctor || "",
    diagnosis:           patient?.diagnosis           || patient?.diagnosis_history  || "",
    dirawat_oleh_doktor: patient?.treated_by_doctor   || patient?.doctor_name        || "",
    status_ob_pp:        patient?.status_ob_pp        || "",
    others:              patient?.resus_others        || ""
  };

  const RESUS_BAY_SCHEMA = {
    enableLanguageToggle: true,
    title: "Clinical Entry",
    actions: [
      { type: "toggle-language" },
      { type: "back", label: { en: "Back", ms: "Kembali" } }
    ],
    sections: [{
      fields: [
        { name: "aduan", label: { en: "Complaint", ms: "Aduan" }, type: "textarea", readOnly: true },
        { type: "subheading", label: { en: "Vital Signs & Measurements", ms: "Tanda Vital" } },
        { type: "row", fields: [
          { name: "bp",   label: { en: "BP",   ms: "BP"   }, type: "input" },
          { name: "rr",   label: { en: "RR",   ms: "RR"   }, type: "input" },
          { name: "spo2", label: { en: "SPO2", ms: "SPO2" }, type: "input" },
          { name: "hr",   label: { en: "HR",   ms: "HR"   }, type: "input" },
          { name: "temp", label: { en: "T",    ms: "T"    }, type: "input" },
          { name: "ps",   label: { en: "P/S",  ms: "P/S"  }, type: "input" }
        ]},
        { type: "subheading", label: { en: "Reports", ms: "Laporan" } },
        { name: "xray_status", label: { en: "X-Ray", ms: "X-Ray" }, type: "radio", readOnly: true,
          options: [
            { value: "non_indicator", label: { en: "Non Indicator", ms: "Tiada Petunjuk" } },
            { value: "done",          label: { en: "Done",          ms: "Selesai"         } }
          ]
        },
        { name: "xray_result", label: { en: "X-Ray Result", ms: "Keputusan X-Ray" }, type: "textarea",
          placeholder: { en: "X-Ray result", ms: "Keputusan X-Ray" }, readOnly: true,
          showIf: { field: "xray_status", equals: "done" }
        },
        { name: "lab_status", label: { en: "Lab Result", ms: "Keputusan Makmal" }, type: "radio", readOnly: true,
          options: [
            { value: "non_indicator", label: { en: "Non Indicator", ms: "Tiada Petunjuk" } },
            { value: "done",          label: { en: "Done",          ms: "Selesai"         } }
          ]
        },
        { name: "lab_result", label: { en: "Lab Result", ms: "KEPUTUSAN MAKMAL" }, type: "textarea",
          placeholder: { en: "Lab result", ms: "Keputusan makmal" }, readOnly: true,
          showIf: { field: "lab_status", equals: "done" }
        },
        { type: "subheading", label: { en: "Diagnosis & Status", ms: "Diagnosis & Status" } },
        { name: "diagnosis",           label: { en: "Diagnosis",         ms: "Diagnosis"           }, type: "input",    readOnly: true },
        { name: "dirawat_oleh_doktor", label: { en: "Treated by Doctor", ms: "Dirawat Oleh Doktor" }, type: "input",    readOnly: true },
        { name: "doctor_plan",         label: { en: "Plan / Management", ms: "Pelan / Pengurusan"  }, type: "textarea", readOnly: true },
        { name: "others",              label: { en: "Others",            ms: "Lain-Lain"           }, type: "textarea", readOnly: true }
      ]
    }]
  };

  const handleAction = (type) => {
    if (type === "toggle-language") setLanguage(l => (l === "en" ? "ms" : "en"));
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
  /* ===================== RENDER ===================== */

  return (
    <div style={mainContent}>

      {/* ===== PATIENT INFORMATION CARD ===== */}
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
      {/* ===== CLINICAL ENTRY ===== */}
      <CommonFormBuilder
        schema={RESUS_BAY_SCHEMA}
        values={formValues}
        onChange={() => {}}
        onAction={handleAction}
        language={language}
      >
        <div style={{ textAlign: "right", marginTop: -40, marginBottom: 20 }}>
          <span
            style={{ color: "#0050ff", fontSize: 13, cursor: "pointer", fontWeight: 600 }}
            onClick={() => typeof window?.openVitals === "function" && window.openVitals(patient)}
          >
            Know more →
          </span>
        </div>
      </CommonFormBuilder>

    </div>
  );
}

/* ===================== STYLES ===================== */

const historyTextarea = {
  width: "100%",
  minHeight: 90,
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 14,
  fontFamily: "inherit",
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
  fontSize: 14,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 6
};

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

