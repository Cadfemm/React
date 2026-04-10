import React, { useState } from "react";

/* ===== Import department components ===== */
import WorkRehab from "./workrehab";
import VocationalRehab from "./vocationalrehab";

export default function PatientDetails({ patient, department, onBack }) {
  const tabs = [
    { key: "workrehab", label: "Work Rehab" },
    { key: "vocationalrehab", label: "Vocational Rehab" },
  ];

  const [activeTab, setActiveTab] = useState("workrehab");

  const renderContent = () => {
    switch (activeTab) {
      case "workrehab":
        return <WorkRehab patient={patient} />;

      case "vocationalrehab":
        return <VocationalRehab patient={patient} />;

      default:
        return null;
    }
  };

  return (
    <div>
      {/* ================= BACK BUTTON ================= */}
      {/* {onBack && (
        <div style={headerRow}>
          <button onClick={onBack} style={backBtn}>← Back to Patients</button>
        </div>
      )} */}

      {/* ================= TABS ================= */}
      <div style={tabRow}>
        {tabs.map(tab => (
          <div
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...tabItem,
              ...(activeTab === tab.key ? activeTabStyle : {})
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      <div style={contentContainer}>
        {renderContent()}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const headerRow = {
  padding: "12px 12px 0px 12px",
  marginBottom: 8
};

const backBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#2563eb",
  fontSize: 14,
  fontWeight: 600
};

const tabRow = {
  display: "flex",
  gap: 40,
  padding: "12px 12px 0px 12px",
  borderBottom: "1px solid #e5e7eb",
  background: "#f9fafb"
};

const tabItem = {
  paddingBottom: 8,
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  color: "#111827",
  borderBottom: "3px solid transparent"
};

const activeTabStyle = {
  color: "#2563eb",
  borderBottom: "3px solid #2563eb"
};

const contentContainer = {
  padding: 16
};