import React, { useState } from "react";
import NursingAssessment from "./NursingAssessment";

const MAIN_TABS = [
  { key: "admission", label: "Admission Nursing" },
  { key: "shift", label: "Shift Assessment" },
  { key: "reassessment", label: "Re Assessment" },
  { key: "discharge", label: "Discharge" }
];

export default function PatientDetails({ patient, department, onBack }) {
  const [activeMainTab, setActiveMainTab] = useState("admission");

  return (
    <div style={container}>
      <div style={headerRow}>
        <button onClick={onBack} style={backBtn}>← Back</button>
      </div>

      {/* ===== 4 MAIN TABS ===== */}
      <div style={tabBar}>
        {MAIN_TABS.map(({ key, label }) => (
          <div
            key={key}
            style={activeMainTab === key ? tabActive : tabBtn}
            onClick={() => setActiveMainTab(key)}
          >
            {label}
          </div>
        ))}
      </div>

      {/* ===== TAB CONTENT ===== */}
      {activeMainTab === "admission" && (
        <NursingAssessment
          patient={patient}
          onSubmit={(values) => {
            console.log("Nursing assessment submitted:", values);
          }}
          onBack={onBack}
        />
      )}
      {activeMainTab === "shift" && (
        <div style={placeholderContent}>
          <p>Shift Assessment – Coming soon</p>
        </div>
      )}
      {activeMainTab === "reassessment" && (
        <div style={placeholderContent}>
          <p>Re Assessment – Coming soon</p>
        </div>
      )}
      {activeMainTab === "discharge" && (
        <div style={placeholderContent}>
          <p>Discharge – Coming soon</p>
        </div>
      )}
    </div>
  );
}

const container = {};

const headerRow = {
  display: "flex",
  alignItems: "center",
  marginBottom: 12,
  padding: "0 24px",
  paddingTop: 16
};

const backBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#2563eb",
  fontSize: 14
};

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "flex-start",
  borderBottom: "1px solid #ddd",
  marginBottom: 12,
  padding: "0 24px"
};

const tabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#0f172a"
};

const tabActive = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  borderBottom: "3px solid #2451b3",
  color: "#2451b3"
};

const placeholderContent = {
  padding: 24,
  color: "#6b7280"
};
