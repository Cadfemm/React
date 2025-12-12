// src/features/Diet/pages/DietDepartmentPage.jsx
import React, { useState } from "react";
import {DoctorsInitialAssessmentForm} from "../components/DoctorsInitialAssessment";
import PatientDetails from "../components/PatientDetails";
import DoctorsDashboard from "../components/DoctorsDashboard";
import {ExaminationDAssessmentForm} from "../components/ExistingPatientPage";

export default function DoctorsDepartmentPage({ patients, department, updatePatientInMainList }) {

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
const [patientSubTab, setPatientSubTab] = useState("new");

  const list = patients.filter(p => p.departments.includes(department));

  // OLD final-submission key (not used anymore)
  function isFollowupPatient(p) {
    if (!p) return false;
    try {
      const key = "patient_" + (p.id ? p.id : "anon") + "_finalSubmittedAt";
      const raw = window.localStorage.getItem(key);
      return !!raw;
    } catch (e) {
      return false;
    }
  }

  // NEW final-submission detection (from PatientDetails.jsx)
function isExistingForDoctor(p) {
  try {
    // 1) Old logic: ICF final submission (still respected if you use it)
    const finalKey = `patient_${p.id}_icf_map_v1_final_v1`;
    const hasFinalICF = !!localStorage.getItem(finalKey);

    // 2) New logic: Doctor initial assessment + referral
    const docExistingKey = `patient_${p.id}_doctor_existing`;
    const docExisting = localStorage.getItem(docExistingKey);

    return hasFinalICF || !!docExisting;
  } catch (e) {
    return false;
  }
}


const newPatients = list.filter((p) => !isExistingForDoctor(p));
const existingPatients = list.filter((p) => isExistingForDoctor(p));

  const [existingPatient, setExistingPatient] = useState(null);
const [openExistingForm, setOpenExistingForm] = useState(false);


  // central handler
  function handleOpenPatient(p) {
    setSelectedPatient(p);
    const followup = isFollowupPatient(p);
    setShowDetails(followup);
  }
function handleOpenExistingPatient(p) {
  setExistingPatient(p);
  setOpenExistingForm(true);
}
if (existingPatient && openExistingForm) {
  return (
    <ExaminationDAssessmentForm
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

  // STEP 1: initial form
  if (selectedPatient && !showDetails) {
    return (
      <DoctorsInitialAssessmentForm
        patient={selectedPatient}
        onUpdatePatient={updatePatientInMainList}
        department={department}
        onSubmit={() => setShowDetails(true)}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  // UI layout
  return (
    <div style={{ padding: 20 }}>
      <h2>{department} Department</h2>

      {/* Tabs */}
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

      {/* -------------------- DASHBOARD -------------------- */}
      {activeTab === "dashboard" && (
        <DoctorsDashboard
          patients={list}
          onSelectPatient={p => handleOpenPatient(p)}
          onOpenPatients={() => setActiveTab("patients")}
          onOpenAppointments={() => alert("Appointments page coming soon")}
        />
      )}

      {/* -------------------- PATIENTS TAB -------------------- */}
{activeTab === "patients" && (
  <div style={{ marginTop: 10 }}>

    {/* TAB HEADERS */}
    <div style={{ 
      display: "flex", 
      gap: 30, 
      borderBottom: "1px solid #d3d3d3",
      marginBottom: 12 
    }}>
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
    </div>

    {/* CONTENT BASED ON ACTIVE SUBTAB */}
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
                <span><strong>{p.name}</strong> — ICD: {p.icd}</span>
                <span style={{ fontSize: 12, color: "#0050ff" }}>Start →</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )}

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
    <span><strong>{p.name}</strong> — ICD: {p.icd}</span>
    <span style={{ fontSize: 12, color: "green" }}>Finalised</span>
  </div>
))}

          </div>
        )}
      </div>
    )}

  </div>
)}

    </div>
  );
}
 