import React, { useState, useEffect } from "react";
import AudiologyDepartmentAdultPage from "./components/AudiologyAdultIA";
import AudiologyDepartmentPediatricPage from "./components/AudiologyPediatricIA";

const OPTION_CARDS = [
  { id: "initial", title: "Initial Assessment", description: "Full SOAP assessment for new patient", icon: "📋", color: "#2563EB" },
  { id: "followup", title: "Follow-up Visit", description: "Follow-up visit documentation", icon: "🔄", color: "#059669" },
  { id: "progress", title: "Progress Intervention", description: "Track progress and interventions", icon: "📈", color: "#7C3AED" },
  { id: "group", title: "Group Intervention", description: "Group session documentation", icon: "👥", color: "#EA580C" }
];

export default function AudiologyPatients({ Patients, onBack }) {
  const patients = Patients || [];

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [assessmentView, setAssessmentView] = useState(null);

  const [submittedAssessments, setSubmittedAssessments] = useState({});
  const [submittedFollowups, setSubmittedFollowups] = useState({});

  /* ================= AUTO-SELECT IF SINGLE PATIENT ================= */
  useEffect(() => {
    if (patients.length === 1 && !selectedPatient) {
      console.log("🎯 Auto-selecting single patient:", patients[0]);
      setSelectedPatient(patients[0]);
    }
  }, [patients, selectedPatient]);

  /* ================= DEBUG LOGS ================= */
  console.log("---- RENDER ----");
  console.log("selectedPatient:", selectedPatient);
  console.log("assessmentView:", assessmentView);
  console.log("patients:", patients);

  /* ================= INITIAL ================= */
  if (selectedPatient && assessmentView === "initial") {
    console.log("👉 Opening INITIAL assessment");

    const Component =
      selectedPatient.age > 20
        ? AudiologyDepartmentAdultPage
        : AudiologyDepartmentPediatricPage;

    const saved = submittedAssessments[selectedPatient.id] ?? null;

    return (
      <Component
        patient={selectedPatient}
        mode="initial"
        savedValues={saved}
        readOnly={!!saved}
        onSubmit={(values) => {
          console.log("✅ Initial Submitted:", values);

          setSubmittedAssessments((prev) => ({
            ...prev,
            [selectedPatient.id]: values
          }));
        }}
        onBack={() => {
          console.log("⬅️ Back from INITIAL");
          setAssessmentView(null);
        }}
      />
    );
  }

  /* ================= FOLLOWUP ================= */
  if (selectedPatient && assessmentView === "followup") {
    console.log("👉 Opening FOLLOW-UP assessment");

    const Component =
      selectedPatient.age > 20
        ? AudiologyDepartmentAdultPage
        : AudiologyDepartmentPediatricPage;

    const saved = submittedFollowups[selectedPatient.id] ?? null;

    return (
      <Component
        patient={selectedPatient}
        mode="followup"
        savedValues={saved}
        readOnly={!!saved}
        onSubmit={(values) => {
          console.log("✅ Follow-up Submitted:", values);

          setSubmittedFollowups((prev) => ({
            ...prev,
            [selectedPatient.id]: values
          }));
        }}
        onBack={() => {
          console.log("⬅️ Back from FOLLOW-UP");
          setAssessmentView(null);
        }}
      />
    );
  }

  /* ================= CARDS ================= */
  if (selectedPatient) {
    console.log("🟦 Showing CARDS");

    return (
      <div style={styles.page}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Patient: {selectedPatient.name}</h1>
            <p style={styles.subtitle}>Choose an assessment or visit type</p>
          </div>

          <button
            style={styles.backBtn}
            onClick={() => {
              console.log("⬅️ Back to Patients clicked");

              setSelectedPatient(null);
              setAssessmentView(null);
              onBack();
            }}
          >
            ← Back to Patients
          </button>
        </div>

        <div style={styles.cardsGrid}>
          {OPTION_CARDS.map((card) => (
            <div
              key={card.id}
              style={{
                ...styles.optionCard,
                borderLeftColor: card.color
              }}
              onClick={() => {
                console.log("🟨 Card clicked:", card.id);

                if (card.id === "initial") {
                  setAssessmentView("initial");
                } else if (card.id === "followup") {
                  setAssessmentView("followup");
                } else {
                  alert(`${card.title} – Coming soon`);
                }
              }}
            >
              <div style={{ ...styles.optionCardIcon, background: `${card.color}20`, color: card.color }}>
                {card.icon}
              </div>

              <h3 style={styles.optionCardTitle}>{card.title}</h3>
              <p style={styles.optionCardDesc}>{card.description}</p>
              <span style={{ ...styles.optionCardArrow, color: card.color }}>
                Open →
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= PATIENT LIST (ONLY FOR MULTIPLE PATIENTS) ================= */
  if (patients.length > 1) {
    console.log("🟩 Showing PATIENT LIST");

    return (
      <div style={styles.page}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Patients List</h1>
            <p style={styles.subtitle}>Select a patient to begin assessment</p>
          </div>

          <button style={styles.backBtn} onClick={onBack}>
            ← Back to Dashboard
          </button>
        </div>

        <div style={styles.patientGrid}>
          {patients.map((p) => (
            <div
              key={p.id}
              style={styles.patientCard}
              onClick={() => {
                console.log("🟩 Patient selected:", p);
                setSelectedPatient(p);
              }}
            >
              <div style={styles.patientIcon}>👤</div>
              <div>
                <div style={styles.patientName}>{p.name}</div>
                <div style={styles.patientAge}>Age: {p.age} yrs</div>
                {p.icd && <div style={styles.patientIcd}>ICD: {p.icd}</div>}
              </div>
              <div style={styles.patientArrow}>→</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= FALLBACK (LOADING STATE) ================= */
  console.log("⏳ Loading...");
  return null;
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: 32,
    background: "#F8FAFC",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28
  },

  title: {
    fontSize: 28,
    fontWeight: 800,
    color: "#0F172A",
    marginBottom: 4
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B"
  },

  backBtn: {
    background: "transparent",
    border: "1px solid #CBD5E1",
    padding: "8px 14px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    color: "#2563EB"
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 24,
    marginTop: 8,
    maxWidth: 640,
    marginLeft: "auto",
    marginRight: "auto"
  },

  optionCard: {
    background: "#FFFFFF",
    borderRadius: 16,
    border: "1px solid #E5E7EB",
    borderLeftWidth: 4,
    padding: 24,
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    transition: "all 0.2s ease"
  },

  optionCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    marginBottom: 14
  },

  optionCardTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8
  },

  optionCardDesc: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 12
  },

  optionCardArrow: {
    fontSize: 14,
    fontWeight: 600
  },

  patientGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 16,
    marginTop: 16
  },

  patientCard: {
    background: "#FFFFFF",
    borderRadius: 12,
    border: "1px solid #E5E7EB",
    padding: 20,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 16,
    transition: "all 0.2s ease"
  },

  patientIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: "#2563EB20",
    color: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    flexShrink: 0
  },

  patientName: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0F172A",
    marginBottom: 4
  },

  patientAge: {
    fontSize: 14,
    color: "#64748B"
  },

  patientIcd: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 2
  },

  patientArrow: {
    marginLeft: "auto",
    fontSize: 20,
    color: "#CBD5E1",
    fontWeight: 600
  }
};