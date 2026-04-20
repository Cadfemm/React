// src/features/Diet/pages/DietDepartmentPage.jsx
import React, { useState } from "react";
import InitialAssessmentForm from "../components/DietInitialAssessmentForm";
import DietFollowupAssessmentForm from "../components/DietFollowupAssessmentForm";
import DietProgressAssessmentForm from "../components/DietProgressAssessmentForm";
import PatientDetails from "../components/PatientDetails";
import DietDashboard from "../components/DietDashboard";
import ExaminationAssessmentForm from "../components/ExistingPatientPage";
import PatientReports from "../../PatientReports"

const OPTION_CARDS = [
  { id: "initial", title: "Initial Assessment", description: "Full SOAP assessment for new patient", icon: "📋", color: "#2563EB" },
  { id: "followup", title: "Follow-up Visit", description: "Follow-up visit documentation", icon: "🔄", color: "#059669" },
  { id: "progress", title: "Progress Intervention", description: "Track progress and interventions", icon: "📈", color: "#7C3AED" },
  { id: "group", title: "Group Intervention", description: "Group session documentation", icon: "👥", color: "#EA580C" }
];

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
    setShowDetails("cards");
  }

  if (selectedPatient && showDetails === "cards") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
          minHeight: "calc(100vh - 80px)",
          background: "#F2F6FB",
          padding: "32px 28px 40px"
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            maxWidth: 1040,
            marginBottom: 18
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "100%"
            }}
          >
            {/* ROUND BACK BUTTON */}
            <button
              onClick={() => {
                setSelectedPatient(null);
                setShowDetails(false);
                setActiveTab("dashboard");
              }}
              style={{
                background: "#fff",
                border: "1px solid #D1D5DB",
                color: "#0F172A",
                borderRadius: "999px",
                width: 42,
                height: 42,
                fontSize: 20,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(15,23,42,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0
              }}
            >
              {"<"}
            </button>

            {/* PATIENT NAME */}
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                color: "#0F172A"
              }}
            >
              {selectedPatient.name}
            </h1>
          </div>
        </div>

        {/* CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(280px, 1fr))",
            gap: 20,
            justifyContent: "center",
            width: "100%",
            maxWidth: 720,
            margin: "30px auto 0"
          }}
        >
          {OPTION_CARDS.map(card => (
            <div
              key={card.id}
              onClick={() => setShowDetails(card.id)}
              style={{
                background: "#fff",
                border: "1px solid #E9ECEF",
                borderTop: `2px solid ${card.color}`,
                borderRadius: 22,
                padding: "24px 22px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                minHeight: 210,
                width: "100%",
                maxWidth: 320,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
              }}
            >
              <div style={{ fontSize: 30, marginBottom: 12 }}>
                {card.icon}
              </div>

              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0F172A",
                  marginBottom: 6
                }}
              >
                {card.title}
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: "#64748B",
                  flex: 1,
                  lineHeight: 1.55
                }}
              >
                {card.description}
              </div>

              <div
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 600,
                  color: card.color
                }}
              >
                Open →
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

    // STEP 1: Initial Diet Assessment
  if (selectedPatient && showDetails === "initial") {
    return (
      <InitialAssessmentForm
        patient={selectedPatient}
        department={department}
        onSubmit={() => setShowDetails("cards")}
        onBack={() => setShowDetails("cards")}
      />
    );
  }

  if (selectedPatient && showDetails === "followup") {
    return (
      <DietFollowupAssessmentForm
        patient={selectedPatient}
        department={department}
        onBack={() => setShowDetails("cards")}
      />
    );
  }

  if (selectedPatient && showDetails === "progress") {
    return (
      <DietProgressAssessmentForm
        patient={selectedPatient}
        department={department}
        onBack={() => setShowDetails("cards")}
      />
    );
  }

  if (selectedPatient && showDetails === "group") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F8FAFC",
          padding: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "50px 60px",
            borderRadius: 20,
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            textAlign: "center",
            maxWidth: 500
          }}
        >
          <div style={{ fontSize: 50 }}>👥</div>

          <h2 style={{ marginTop: 15 }}>Group Intervention</h2>

          <p style={{ color: "#64748B", marginTop: 10 }}>
            This module is coming soon.
          </p>

          <button
            onClick={() => setShowDetails("cards")}
            style={{
              marginTop: 25,
              padding: "12px 24px",
              borderRadius: 10,
              border: "none",
              background: "#2563EB",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            ← Back to Options
          </button>
        </div>
      </div>
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
