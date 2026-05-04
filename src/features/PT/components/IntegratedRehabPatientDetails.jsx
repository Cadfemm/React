import React, { useState } from "react";

const PROGRAM_TABS = [
  "Motion Capture",
  "Advance Fitness Program",
  "Neurac Therapy",
  "Neuromodulation",
  "Cybernics",
];

const SOAP_TABS = ["Subjective", "Objective", "Assessment", "Plan"];

export default function IntegratedRehabPatientDetails({ patient }) {
  const [activeProgram, setActiveProgram] = useState(PROGRAM_TABS[0]);
  const [activeSoap, setActiveSoap] = useState(SOAP_TABS[0]);

  return (
    <div style={styles.page}>
      <div style={styles.topUtilityTabs}>
        {["Home", "Files", "Upload"].map((t) => (
          <div key={t} style={styles.utilityTab}>{t}</div>
        ))}
        <div style={styles.topRight}>
          <span style={styles.iconDot}>🔔</span>
          <span style={styles.iconDot}>👤</span>
        </div>
      </div>

      <div style={styles.programTabsRow}>
        {PROGRAM_TABS.map((tab) => (
          <div
            key={tab}
            onClick={() => {
              setActiveProgram(tab);
              setActiveSoap("Subjective");
            }}
            style={{
              ...styles.programTab,
              ...(activeProgram === tab ? styles.programTabActive : {}),
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <div style={styles.patientInfoCard}>
          <h3 style={styles.infoTitle}>Patient Information</h3>
          <div style={styles.infoGrid}>
            <Info label="Name" value={patient?.name || "Anika"} />
            <Info label="IC" value={patient?.id || "-"} />
            <Info label="DOB" value={patient?.dob || "-"} />
            <Info label="Age / Gender" value={`${patient?.age || "30"} / ${patient?.sex || "-"}`} />
            <Info label="ICD" value={patient?.icd || "-"} />
            <Info label="Date of Assessment" value={new Date().toLocaleDateString("en-GB")} />
            <Info label="Date of Onset" value={patient?.date_of_onset || "-"} />
            <Info label="Duration of Diagnosis" value="-" />
            <Info label="Primary Diagnosis" value={patient?.diagnosis_history || "-"} />
            <Info label="Secondary Diagnosis" value={patient?.medical_history || "-"} />
            <Info label="Dominant Side" value={patient?.dominant_side || "-"} />
            <Info label="Language Preference" value={patient?.language_preference || "-"} />
            <Info label="Education Level" value={patient?.education_background || "-"} />
            <Info label="Occupation" value={patient?.occupation || "-"} />
            <Info label="Work Status" value={patient?.employment_status || "-"} />
            <Info label="Driving Status" value={patient?.driving_status || "-"} />
          </div>
        </div>

        <div style={styles.soapTabs}>
          {SOAP_TABS.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveSoap(tab)}
              style={{
                ...styles.soapTab,
                ...(activeSoap === tab ? styles.soapTabActive : {}),
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        <div style={styles.content}>
          <h3 style={styles.contentTitle}>
            {activeProgram} - {activeSoap}
          </h3>
          <p style={styles.contentText}>
            Fill {activeSoap.toLowerCase()} details for {activeProgram}.
          </p>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={styles.infoItem}>
      <span style={styles.infoLabel}>{label}:</span> <span style={styles.infoValue}>{value}</span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100%",
    background: "#f8fafc",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    overflow: "hidden",
  },
  topUtilityTabs: {
    display: "flex",
    gap: 22,
    alignItems: "center",
    padding: "12px 16px 8px",
    background: "#f3f4f6",
    borderBottom: "1px solid #d1d5db",
  },
  utilityTab: {
    fontWeight: 600,
    color: "#334155",
    fontSize: 14,
  },
  topRight: {
    marginLeft: "auto",
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  iconDot: {
    fontSize: 18,
  },
  programTabsRow: {
    display: "flex",
    gap: 32,
    padding: "12px 14px 0 14px",
    borderBottom: "1px solid #e5e7eb",
    background: "#fff",
    overflowX: "auto",
  },
  programTab: {
    paddingBottom: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    color: "#111827",
    borderBottom: "3px solid transparent",
    whiteSpace: "nowrap",
  },
  programTabActive: {
    color: "#2563eb",
    borderBottom: "3px solid #2563eb",
  },
  card: {
    marginTop: 10,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    margin: 14,
    overflow: "hidden",
  },
  patientInfoCard: {
    padding: "18px 20px 8px",
    borderBottom: "1px solid #e5e7eb",
  },
  infoTitle: {
    margin: "0 0 12px",
    fontSize: 16,
    color: "#111827",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(180px, 1fr))",
    gap: "10px 22px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: 14,
    paddingBottom: 10,
  },
  infoItem: {
    fontSize: 14,
    lineHeight: 1.4,
    color: "#111827",
  },
  infoLabel: {
    fontWeight: 700,
  },
  infoValue: {
    color: "#374151",
    fontWeight: 500,
  },
  soapTabs: {
    display: "flex",
    gap: 34,
    padding: "12px 16px 0 16px",
    borderBottom: "1px solid #e5e7eb",
    background: "#fff",
    overflowX: "auto",
  },
  soapTab: {
    paddingBottom: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    color: "#111827",
    borderBottom: "3px solid transparent",
    whiteSpace: "nowrap",
  },
  soapTabActive: {
    color: "#2563eb",
    borderBottom: "3px solid #2563eb",
  },
  content: {
    padding: 16,
    minHeight: 180,
  },
  contentTitle: {
    marginTop: 0,
    marginBottom: 8,
    fontSize: 18,
    color: "#0f172a",
  },
  contentText: {
    margin: 0,
    fontSize: 14,
    color: "#475569",
  },
};
