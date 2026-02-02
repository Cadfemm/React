
import React, { useState } from "react";
import OrthoticsAssessment from "./ProstheticsAndOrthoticsAssessments";

export default function ProstheticsAndOrthoticsPatients({ Patients, onBack }) {
  const [tab, setTab] = useState("new");
  const [selectedPatient, setSelectedPatient] = useState(null);
  console.log("patients", Patients)
  const newPatients = (Patients || []).filter(p => p.status !== "Old");
  const existingPatients = []


  const patients = tab === "new" ? newPatients : existingPatients;

  /* ---------------- RENDER ASSESSMENT ---------------- */
if (selectedPatient) {
  return (
    <div style={{ width: "100%", padding: 0 }}>
      <OrthoticsAssessment
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
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
            Manage and start psychology assessments
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
