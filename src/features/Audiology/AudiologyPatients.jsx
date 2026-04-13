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

  /* ================= AUTO SELECT PATIENT ================= */
  useEffect(() => {
    if (patients.length === 1) {
      setSelectedPatient(patients[0]);
    }
  }, [patients]);

  /* ================= ADULT INITIAL ================= */
  if (selectedPatient && assessmentView === "initial-adult") {
    const saved = submittedAssessments[selectedPatient.id] ?? null;

    return (
      <AudiologyDepartmentAdultPage
        patient={selectedPatient}
        mode="initial"
        savedValues={saved}
        readOnly={!!saved}
        onSubmit={(values) => {
          setSubmittedAssessments(prev => ({
            ...prev,
            [selectedPatient.id]: values
          }));
        }}
        onBack={() => setAssessmentView(null)}
      />
    );
  }

  /* ================= PEDIATRIC INITIAL ================= */
  if (selectedPatient && assessmentView === "initial-pediatric") {
    return (
      <AudiologyDepartmentPediatricPage
        patient={selectedPatient}
        mode="initial"
        onBack={() => setAssessmentView(null)}
      />
    );
  }

/* ================= ADULT FOLLOW-UP ================= */
if (selectedPatient && assessmentView === "followup-adult") {
  const saved = submittedFollowups[selectedPatient.id] ?? null;

  return (
    <AudiologyDepartmentAdultPage
      patient={selectedPatient}
      mode="followup"
      savedValues={saved}
      readOnly={!!saved}
      onSubmit={(values) => {
        setSubmittedFollowups(prev => ({
          ...prev,
          [selectedPatient.id]: values
        }));
      }}
      onBack={() => setAssessmentView(null)}
    />
  );
}

/* ================= PEDIATRIC FOLLOW-UP ================= */
if (selectedPatient && assessmentView === "followup-pediatric") {
  return (
    <AudiologyDepartmentPediatricPage
      patient={selectedPatient}
      mode="followup"
      onBack={() => setAssessmentView(null)}
    />
  );
}

  /* ================= SHOW CARDS DIRECTLY ================= */
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
                if (card.id === "initial") {
                  if (selectedPatient.age > 20) {
                    setAssessmentView("initial-adult");
                  } else {
                    setAssessmentView("initial-pediatric");
                  }
                } else if (card.id === "followup") {
                    if (selectedPatient.age > 20) {
                        setAssessmentView("followup-adult");
                    } else {
                        setAssessmentView("followup-pediatric");
                    }
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

  /* ================= FALLBACK ================= */
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
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
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
    fontWeight: 700
  },

  optionCardDesc: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 12
  },

  optionCardArrow: {
    fontSize: 14,
    fontWeight: 600
  }
};