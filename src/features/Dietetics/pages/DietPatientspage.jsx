// src/features/Diet/pages/DietDepartmentPage.jsx
import React, { useState } from "react";
import InitialAssessmentForm from "../components/DietInitialAssessmentForm";
import PatientDetails from "../components/PatientDetails";
import DietDashboard from "../components/DietDashboard";
import ExaminationAssessmentForm from "../components/ExistingPatientPage";
import PatientReports from "../../PatientReports"

export default function DietDepartmentPage({ patients, department }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [patientSubTab, setPatientSubTab] = useState("new");

  // ⭐ MERGE LOCALSTORAGE WITH MAIN LIST
  let finalPatients = patients.map(p => {
    let saved = localStorage.getItem("patient_" + p.id);
    return saved ? { ...p, ...JSON.parse(saved) } : p;
  });

  const list = finalPatients.filter(p => p.departments.includes(department));

  // OLD follow-up check
  function isFollowupPatient(p) {
    if (!p) return false;
    try {
      const key = "patient_" + (p.id ? p.id : "anon") + "_finalSubmittedAt";
      return !!localStorage.getItem(key);
    } catch {
      return false;
    }
  }

  // NEW final-submitted check
  function isFinalSubmitted(p) {
    try {
      const key = "patient_" + p.id + "_icf_map_v1_final_v1";
      return !!localStorage.getItem(key);
    } catch {
      return false;
    }
  }

  const newPatients = list.filter(p => !isFinalSubmitted(p));
  const existingPatients = list.filter(p => isFinalSubmitted(p));

  const [existingPatient, setExistingPatient] = useState(null);
  const [openExistingForm, setOpenExistingForm] = useState(false);

  // OPEN EXISTING
  function handleOpenExistingPatient(p) {
    setExistingPatient(p);
    setOpenExistingForm(true);
  }

  if (existingPatient && openExistingForm) {
    return (
      <ExaminationAssessmentForm
        patient={existingPatient}
        department={department}
        onBack={() => {
          setExistingPatient(null);
          setOpenExistingForm(false);
        }}
      />
    );
  }

  // STEP 2: details
  function handleOpenPatient(p) {
    setSelectedPatient(p);
    const followup = isFollowupPatient(p);
    setShowDetails(followup);
  }

  if (selectedPatient && showDetails) {
    return (
      <PatientDetails
        patient={selectedPatient}
        department={department}
        onBack={() => {
          setSelectedPatient(null);
          setShowDetails(false);
        }}
      />
    );
  }

  // STEP 1: Initial Diet Assessment
  if (selectedPatient && !showDetails) {
    return (
      <InitialAssessmentForm
        patient={selectedPatient}
        department={department}
        onSubmit={() => setShowDetails(true)}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  // -------------------- UI layout --------------------
  return (
    <div style={{ padding: 20 }}>
      <h2>{department} Department</h2>

      {/* ---------------- Main Tabs ---------------- */}
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <button
          onClick={() => setActiveTab("dashboard")}
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            border: activeTab === "dashboard" ? "2px solid #000" : "1px solid #ccc",
            color: activeTab === "dashboard" ? "#fff" : "#000",
            backgroundColor: activeTab === "dashboard" ? "#007bff" : "#fff",
            cursor: "pointer"
          }}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("patients")}
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            border: activeTab === "patients" ? "2px solid #000" : "1px solid #ccc",
            color: activeTab === "patients" ? "#fff" : "#000",
            backgroundColor: activeTab === "patients" ? "#007bff" : "#fff",
            cursor: "pointer"
          }}
        >
          Patients
        </button>
      </div>

      {/* ---------------- Dashboard ---------------- */}
      {activeTab === "dashboard" && (
        <DietDashboard
          patients={list}
          onSelectPatient={p => handleOpenPatient(p)}
          onOpenPatients={() => setActiveTab("patients")}
          onOpenAppointments={() => alert("Appointments page coming soon")}
        />
      )}

      {/* ---------------------- PATIENTS TAB ---------------------- */}
      {activeTab === "patients" && (
        <div style={{ marginTop: 10 }}>

          {/* -------- Sub Tabs: New | Existing | Reports -------- */}
          <div
            style={{
              display: "flex",
              gap: 30,
              borderBottom: "1px solid #d3d3d3",
              marginBottom: 12
            }}
          >
            <div
              onClick={() => setPatientSubTab("new")}
              style={{
                paddingBottom: 6,
                cursor: "pointer",
                fontSize: 16,
                borderBottom: patientSubTab === "new" ? "3px solid #2a41e8" : "3px solid transparent",
                color: patientSubTab === "new" ? "#000" : "#555",
                fontWeight: patientSubTab === "new" ? "600" : "500"
              }}
            >
              New Patients
            </div>

            <div
              onClick={() => setPatientSubTab("existing")}
              style={{
                paddingBottom: 6,
                cursor: "pointer",
                fontSize: 16,
                borderBottom: patientSubTab === "existing" ? "3px solid #2a41e8" : "3px solid transparent",
                color: patientSubTab === "existing" ? "#000" : "#555",
                fontWeight: patientSubTab === "existing" ? "600" : "500"
              }}
            >
              Existing Patients
            </div>

            {/* ⭐ NEW REPORTS TAB */}
            <div
              onClick={() => setPatientSubTab("reports")}
              style={{
                paddingBottom: 6,
                cursor: "pointer",
                fontSize: 16,
                borderBottom: patientSubTab === "reports" ? "3px solid #2a41e8" : "3px solid transparent",
                color: patientSubTab === "reports" ? "#000" : "#555",
                fontWeight: patientSubTab === "reports" ? "600" : "500"
              }}
            >
              Reports
            </div>
          </div>

          {/* -------- NEW PATIENTS -------- */}
          {patientSubTab === "new" && (
            <div>
              {newPatients.length === 0 ? (
                <div style={{ fontSize: 13, color: "#777" }}>No new patients.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {newPatients.map(p => (
                    <div
                      key={p.id}
                      onClick={() => handleOpenExistingPatient(p)}
                      style={{
                        padding: "8px 10px",
                        border: "1px solid #ddd",
                        borderRadius: 6,
                        cursor: "pointer",
                        background: "#f7faff",
                        fontSize: 14,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <span>
                        <strong>{p.name}</strong> — ICD: {p.icd}
                      </span>
                      <span style={{ fontSize: 12, color: "#0050ff" }}>Start →</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* -------- EXISTING PATIENTS -------- */}
          {patientSubTab === "existing" && (
            <div>
              {existingPatients.length === 0 ? (
                <div style={{ fontSize: 13, color: "#777" }}>
                  No final-submitted patients yet.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {existingPatients.map(p => (
                    <div
                      key={p.id}
                      onClick={() => handleOpenExistingPatient(p)}
                      style={{
                        padding: "8px 10px",
                        border: "1px solid #ddd",
                        borderRadius: 6,
                        cursor: "pointer",
                        background: "#f3fff3",
                        fontSize: 14,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <span>
                        <strong>{p.name}</strong> — ICD: {p.icd}
                      </span>
                      <span style={{ fontSize: 12, color: "green" }}>Finalised</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* -------- ⭐ REPORTS TAB ⭐ -------- */}
          {patientSubTab === "reports" && (
            <div>
              {!selectedPatient ? (
                <div style={{ fontSize: 13, color: "#777" }}>
                  Select a patient from New/Existing to view reports.
                </div>
              ) : (
                <PatientReports patient={selectedPatient} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
