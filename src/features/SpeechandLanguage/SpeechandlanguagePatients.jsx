
import React, { useState } from "react";
import SpeechAssessmentForm from "./SpeechAssessment";

const OPTION_CARDS = [
  { id: "initial", title: "Initial Assessment", description: "Full SOAP assessment for new patient", icon: "📋", color: "#2563EB" },
  { id: "followup", title: "Follow-up Visit", description: "Follow-up visit documentation", icon: "🔄", color: "#059669" },
  { id: "progress", title: "Progress Intervention", description: "Track progress and interventions", icon: "📈", color: "#7C3AED" },
  { id: "group", title: "Group Intervention", description: "Group session documentation", icon: "👥", color: "#EA580C" }
];

export default function SpeechPatients({ Patients,onBack }) {
  const [tab, setTab] = useState("new");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [assessmentView, setAssessmentView] = useState(null); // null | 'initial' | 'followup' | 'progress' | 'group'
  const [submittedAssessments, setSubmittedAssessments] = useState({}); // { [patientId]: record } – initial only
  const [submittedFollowups, setSubmittedFollowups] = useState({}); // { [patientId]: record } – follow-up only
  console.log("patients",Patients)
 const newPatients = (Patients || []).filter(p => p.status !== "Old");
const existingPatients = []


  const patients = tab === "new" ? newPatients : existingPatients;

  /* ---------------- RENDER INITIAL ASSESSMENT ---------------- */
  if (selectedPatient && assessmentView === "initial") {
    const initialSaved = submittedAssessments[selectedPatient.id] ?? null;
    const initialReadOnly = !!initialSaved;
    return (
      <SpeechAssessmentForm
        patient={selectedPatient}
        mode="initial"
        savedValues={initialSaved}
        readOnly={initialReadOnly}
        onSave={(record) => {
          setSubmittedAssessments(prev => ({
            ...prev,
            [selectedPatient.id]: record
          }));
        }}
        onBack={() => setAssessmentView(null)}
      />
    );
  }

  /* ---------------- RENDER FOLLOW-UP (fresh visit, separate save key) ---------------- */
  if (selectedPatient && assessmentView === "followup") {
    const followupSaved = submittedFollowups[selectedPatient.id] ?? null;
    const followupReadOnly = !!followupSaved;
    return (
      <SpeechAssessmentForm
        patient={selectedPatient}
        mode="followup"
        savedValues={followupSaved}
        readOnly={followupReadOnly}
        onSave={(record) => {
          setSubmittedFollowups(prev => ({
            ...prev,
            [selectedPatient.id]: record
          }));
        }}
        onBack={() => setAssessmentView(null)}
      />
    );
  }

  /* ---------------- RENDER 4 OPTION CARDS when patient selected ---------------- */
  if (selectedPatient) {
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
              setSelectedPatient(null);
              setAssessmentView(null);
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
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => {
                if (card.id === "initial") setAssessmentView("initial");
                else if (card.id === "followup") setAssessmentView("followup");
                else alert(`${card.title} – Coming soon`);
              }}
            >
              <div style={{ ...styles.optionCardIcon, background: `${card.color}20`, color: card.color }}>
                {card.icon}
              </div>
              <h3 style={styles.optionCardTitle}>{card.title}</h3>
              <p style={styles.optionCardDesc}>{card.description}</p>
              <span style={{ ...styles.optionCardArrow, color: card.color }}>Open →</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* ================= HEADER ================= */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Patients</h1>
          <p style={styles.subtitle}>
            Manage and start speech & language assessments
          </p>
        </div>

        <button style={styles.backBtn} onClick={onBack}>
          ← Back to Dashboard
        </button>
      </div>

      {/* ================= TABS ================= */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(tab === "new" ? styles.activeTab : {})
          }}
          onClick={() => setTab("new")}
        >
          New Patients
        </button>

        <button
          style={{
            ...styles.tab,
            ...(tab === "existing" ? styles.activeTab : {})
          }}
          onClick={() => setTab("existing")}
        >
          Existing Patients
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div style={styles.card}>
        <div style={{ ...styles.row, ...styles.headerRow }}>
          <div>Patient</div>
          <div>ICD</div>
          <div>Status</div>
          <div style={{ textAlign: "right" }}>Action</div>
        </div>

      {patients.length === 0 ? (
  <div style={styles.emptyState}>
    Patients are not configured yet
  </div>
) : (
  patients.map((p) => (
    <div
      key={p.id}
      style={styles.row}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "#F8FAFC")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "#FFFFFF")
      }
    >
      <div style={styles.name}>{p.name}</div>
      <div style={styles.icd}>{p.icd}</div>

      <div>
        <span style={styles.badge(p.status)}>{p.status ?? "New"}</span>
      </div>

      <div style={{ textAlign: "right" }}>
        <button
          style={styles.startBtn}
          onClick={() => setSelectedPatient(p)}
        >
          Start →
        </button>
      </div>
    </div>
  ))
)}

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: 32,
    background: "#F8FAFC",
    minHeight: "100vh"
  },
emptyState: {
  padding: "40px 20px",
  textAlign: "center",
  color: "#64748B",
  fontSize: 15,
  fontWeight: 500
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

  tabs: {
    display: "flex",
    gap: 20,
    borderBottom: "1px solid #E5E7EB",
    marginBottom: 24
  },

  tab: {
    paddingBottom: 12,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#64748B"
  },

  activeTab: {
    color: "#2563EB",
    borderBottom: "3px solid #2563EB"
  },

  card: {
    background: "#FFFFFF",
    borderRadius: 16,
    border: "1px solid #E5E7EB",
    overflow: "hidden"
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18,
    marginTop: 14
  },
  optionCard: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #E5E7EB",
    padding: 18,
    cursor: "pointer",
    transition: "all 0.15s ease",
    borderLeft: "6px solid",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
  },
  optionCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    marginBottom: 10
  },
  optionCardTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: "#0F172A",
    margin: "6px 0"
  },
  optionCardDesc: {
    fontSize: 13,
    color: "#64748B",
    margin: "0 0 10px 0",
    lineHeight: 1.4
  },
  optionCardArrow: {
    fontSize: 13,
    fontWeight: 700
  },

  row: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr 1.5fr 1fr",
    padding: "16px 20px",
    alignItems: "center"
  },

  headerRow: {
    background: "#F9FAFB",
    fontSize: 13,
    fontWeight: 700,
    color: "#6B7280"
  },

  name: {
    fontWeight: 700,
    fontSize: 15,
    color: "#0F172A"
  },

  icd: {
    fontSize: 14,
    color: "#475569"
  },

  badge: (status) => ({
    padding: "5px 12px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background:
      status === "New"
        ? "#EEF2FF"
        : status === "Ongoing"
        ? "#ECFDF5"
        : "#FFF7ED",
    color:
      status === "New"
        ? "#4338CA"
        : status === "Ongoing"
        ? "#047857"
        : "#B45309"
  }),

  startBtn: {
    background: "#2563EB",
    color: "#FFFFFF",
    border: "none",
    padding: "8px 16px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer"
  }
};
