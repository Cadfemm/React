import React, { useState } from "react";
/* ===== Import department components ===== */
import Neuro from "./Neuro";
import SpinalCordInjury from "./SpinalcordInjury";
import Hydro from "./Hydro";
import Musculoskeletal from "./Musculoskeletal";
import Conditioning from "./Conditioning";
import Cardiorespiratory from "./Cardiorespiratory";
import Amputee from "./Amputee";

export default function ProgramTabsWithContent({ patient }) {
  const tabs = [
    { key: "conditioning", label: "Cognitive" },
    { key: "neuro", label: "Neurology" },
    { key: "msk", label: "Musculoskeletal" },
    { key: "sci", label: "Spinal Cord Injury" },
    { key: "amputee", label: "Amputee" },
    { key: "cardio", label: "Work Hardening & Cardiorespiratory" },
  ];

  const [activeTab, setActiveTab] = useState("sci");

  const renderContent = () => {
    switch (activeTab) {
      case "neuro":
        return <Neuro patient={patient} />;

      case "sci":
        return <SpinalCordInjury />;

      case "hydro":
        return <Hydro />;

      case "msk":
        return <Musculoskeletal />;

      case "conditioning":
        return <Conditioning patient={patient}/>;

      case "cardio":
        return <Cardiorespiratory />;

      case "amputee":
        return <Amputee patient={patient}/>;

      default:
        return null;
    }
  };

  return (
    <div>
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
