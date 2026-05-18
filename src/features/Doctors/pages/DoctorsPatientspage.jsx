// src/features/Diet/pages/DietDepartmentPage.jsx
import React, { useState } from "react";
import {DoctorsInitialAssessmentForm} from "../components/DoctorsInitialAssessment";
import PatientDetails from "../components/PatientDetails";
import DoctorsDashboard from "../components/DoctorsDashboard";
import {ExaminationDAssessmentForm} from "../components/ExistingPatientPage";
import ProcedureAssessment from "../components/ProcedureAssessment";

/* ── Assessment cards (standard 4 + Procedure for Doctors only) ── */
const DOCTOR_ASSESSMENT_CARDS = [
  { id: "initial",   title: "Initial Assessment",    desc: "Comprehensive assessment for new patient visit",   icon: "📋", accent: "#1D4ED8", tag: "New Patient",    tagBg: "#dbeafe", tagColor: "#1d4ed8" },
  { id: "followup",  title: "Follow-up Visit",        desc: "Review progress and adjust treatment plan",        icon: "🔄", accent: "#059669", tag: "Returning",      tagBg: "#d1fae5", tagColor: "#065f46" },
  { id: "progress",  title: "Progress Intervention",  desc: "Document interventions and track outcomes",        icon: "📈", accent: "#7C3AED", tag: "Ongoing Care",   tagBg: "#ede9fe", tagColor: "#5b21b6" },
  { id: "group",     title: "Group Intervention",     desc: "Record group session and multi-patient notes",     icon: "👥", accent: "#DC2626", tag: "Group Session",  tagBg: "#fee2e2", tagColor: "#991b1b" },
  { id: "procedure", title: "Procedure Assessment",   desc: "BTI, FEES, rTMS, tDCS, NESA, EST and more",       icon: "🩺", accent: "#0891B2", tag: "Procedure",      tagBg: "#cffafe", tagColor: "#0e7490" },
];

function DoctorAssessmentCard({ card, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", borderRadius: 14, border: "1px solid #e9ecef", borderTop: `3px solid ${card.accent}`, padding: "22px 22px 18px", cursor: "pointer", transition: "box-shadow .2s, transform .2s", display: "flex", flexDirection: "column", minHeight: 190, boxShadow: hovered ? `0 12px 32px ${card.accent}22` : "0 2px 8px rgba(0,0,0,0.06)", transform: hovered ? "translateY(-3px)" : "none" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: card.accent + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{card.icon}</div>
        <span style={{ background: card.tagBg, color: card.tagColor, borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{card.tag}</span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{card.title}</div>
      <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, flex: 1 }}>{card.desc}</div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: card.accent }}>Open Assessment</span>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: card.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 700 }}>›</div>
      </div>
    </div>
  );
}

export default function DoctorsDepartmentPage({ patients, department, updatePatientInMainList }) {

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [assessmentView, setAssessmentView] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
const [patientSubTab, setPatientSubTab] = useState("new");

  const list = patients.filter(p => Array.isArray(p.departments) && p.departments.includes(department));

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
    setAssessmentView(null); // show card selection first
    setShowDetails(false);
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

  // PROCEDURE ASSESSMENT
  if (selectedPatient && assessmentView === "procedure") {
    return (
      <ProcedureAssessment
        patient={selectedPatient}
        onSubmit={() => setAssessmentView(null)}
        onBack={() => setAssessmentView(null)}
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
          setAssessmentView(null);
          setShowDetails(false);
        }}
      />
    );
  }

  // STEP 1: initial/followup/progress/group form
  if (selectedPatient && assessmentView && assessmentView !== "procedure") {
    return (
      <DoctorsInitialAssessmentForm
        patient={selectedPatient}
        onUpdatePatient={updatePatientInMainList}
        department={department}
        onSubmit={() => setShowDetails(true)}
        onBack={() => setAssessmentView(null)}
      />
    );
  }

  // CARD SELECTION: patient selected but no assessment chosen yet
  if (selectedPatient && !assessmentView) {
    const initials = ((selectedPatient.name || selectedPatient.email || "P").split(" ").map(w => w[0]).join("").slice(0, 2)).toUpperCase();
    return (
      <div style={{ minHeight: "100%" }}>
        {/* Patient banner */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={() => setSelectedPatient(null)} style={{ padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1px solid #d1d5db", background: "#fff" }}>← Back</button>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "#fff", fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{initials}</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{selectedPatient.name || selectedPatient.email}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>
                {[selectedPatient.mrn && `MRN: ${selectedPatient.mrn}`, selectedPatient.age && `${selectedPatient.age} yrs`, selectedPatient.gender, selectedPatient.icd && `ICD: ${selectedPatient.icd}`].filter(Boolean).join("  ·  ")}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>{department}</div>
        </div>
        {/* Cards */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 28px" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>Select Assessment Type</div>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 32 }}>Choose the appropriate assessment for this patient visit</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, width: "100%", maxWidth: 860 }}>
            {DOCTOR_ASSESSMENT_CARDS.map(card => (
              <DoctorAssessmentCard key={card.id} card={card} onClick={() => setAssessmentView(card.id)} />
            ))}
          </div>
        </div>
      </div>
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
 