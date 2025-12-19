import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PsychologyAssessmentForm from "./PsychologyAssignments"


export default function Patients() {
  const history = useHistory();
  const [tab, setTab] = useState("new");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const newPatients = [
    { id:2,name: "Asfas", icd: "Stroke", status: "New" },
    { id:3,name: "Rahul", icd: "Depression", status: "New" }
  ];

  const existingPatients = [
    { id:4,name: "Anita", icd: "Anxiety", status: "Ongoing" },
    { id:5,name: "Kiran", icd: "PTSD", status: "Follow-up" }
  ];

  const data = tab === "new" ? newPatients : existingPatients;

  const styles = {
    wrapper: {
      padding: 24,
      background: "#F8FAFC",
      minHeight: "100vh"
    },

    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 18
    },

    back: {
      cursor: "pointer",
      color: "#2563EB",
      fontWeight: 600,
      fontSize: 14
    },

    title: {
      fontSize: 20,
      fontWeight: 700,
      color: "#0F172A"
    },

    tabs: {
      display: "flex",
      gap: 20,
      borderBottom: "1px solid #E5E7EB",
      marginBottom: 20
    },

    tab: (active) => ({
      paddingBottom: 10,
      fontWeight: 600,
      cursor: "pointer",
      color: active ? "#2563EB" : "#64748B",
      borderBottom: active ? "3px solid #2563EB" : "3px solid transparent"
    }),

    card: {
      background: "#fff",
      borderRadius: 16,
      border: "1px solid #EEF2F7",
      overflow: "hidden"
    },

    row: {
      display: "grid",
      gridTemplateColumns: "2fr 2fr 1.5fr 1fr",
      padding: "14px 18px",
      alignItems: "center"
    },

    headerRow: {
      background: "#F9FAFB",
      fontSize: 13,
      fontWeight: 600,
      color: "#6B7280"
    },

    bodyRow: {
      borderTop: "1px solid #EEF2F7",
      cursor: "pointer",
      transition: "background 0.2s ease"
    },

    name: {
      fontWeight: 600,
      color: "#0F172A"
    },

    icd: {
      color: "#475569",
      fontSize: 14
    },

    badge: (status) => ({
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
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

    start: {
      textAlign: "right"
    },

    startBtn: {
      padding: "6px 14px",
      borderRadius: 8,
      background: "#2563EB",
      color: "#fff",
      fontSize: 13,
      fontWeight: 600,
      border: "none",
      cursor: "pointer"
    }
  };

  if (selectedPatient) {
    return (
      <PsychologyAssessmentForm
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Patients</div>
        </div>
        <div style={styles.back} onClick={() => history.push("/psychologypatients")}>
          ← Back to Dashboard
        </div>
      </div>

      {/* TABS */}
      <div style={styles.tabs}>
        <div style={styles.tab(tab === "new")} onClick={() => setTab("new")}>
          New Patients
        </div>
        <div
          style={styles.tab(tab === "existing")}
          onClick={() => setTab("existing")}
        >
          Existing Patients
        </div>
      </div>

      {/* TABLE CARD */}
      <div style={styles.card}>
        {/* HEADER ROW */}
        <div style={{ ...styles.row, ...styles.headerRow }}>
          <div>Patient</div>
          <div>ICD</div>
          <div>Status</div>
          <div style={{ textAlign: "right" }}>Action</div>
        </div>

        {/* DATA ROWS */}
        {data.map((p, i) => (
          <div
            key={i}
            style={styles.row}
            className="row"
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F8FAFC")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            <div style={styles.name}>{p.name}</div>
            <div style={styles.icd}>{p.icd}</div>
            <div>
              <span style={styles.badge(p.status)}>{p.status}</span>
            </div>
            <div style={styles.start}>
              <button
                style={styles.startBtn}
                onClick={() => setSelectedPatient(p)}
              >
                Start →
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
