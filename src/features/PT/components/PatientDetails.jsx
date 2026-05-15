import React, { useState } from "react";

/* ── Initial / Follow-up / Group assessment components ── */
import Neuro             from "./Neuro";
import SpinalCordInjury  from "./SpinalcordInjury";
import Hydro             from "./Hydro";
import Musculoskeletal   from "./Musculoskeletal";
import Conditioning      from "./Conditioning";
import Cardiorespiratory from "./Cardiorespiratory";
import Amputee           from "./Amputee";

/* ── Progress-specific components ── */
import AmputeeProgress           from "./AmputeeProgress";
import SpinalcordInjuryProgress  from "./SpinalcordInjuryProgress";
import NeuroProgress             from "./NeuroProgress";
import HydroProgress             from "./HydroProgress";
import MSDProgress               from "./MSDProgress";
import ConditionProgress         from "./ConditioningProgress";
import CardiorespiratoryProgress from "./CardiorespiratoryProgress";

const TABS = [
  { key: "sci",          label: "Spinal Cord Injury" },
  { key: "neuro",        label: "Neurology"          },
  { key: "hydro",        label: "Hydrotherapy"       },
  { key: "msk",          label: "Musculoskeletal"    },
  { key: "conditioning", label: "Conditioning"       },
  { key: "cardio",       label: "Cardiorespiratory"  },
  { key: "amputee",      label: "Amputee"            },
];

const TYPE_LABELS = {
  initial:  "Initial Assessment",
  // followup: "Follow-up Visit",
    followup: "Re-Assessments",

  progress: "Progress Intervention",
  group:    "Group Intervention",
};

const TYPE_COLORS = {
  initial:  { bg: "#dbeafe", color: "#1d4ed8" },
  followup: { bg: "#d1fae5", color: "#065f46" },
  progress: { bg: "#ede9fe", color: "#5b21b6" },
  group:    { bg: "#fee2e2", color: "#991b1b" },
};

/* assessmentType: "initial" | "followup" | "progress" | "group" */
export default function ProgramTabsWithContent({ patient, assessmentType, mode, onBack }) {
  const [activeTab, setActiveTab] = useState("sci");

  // Accept either assessmentType (from PTPatients) or mode (from DepartmentPatients)
  const currentMode = assessmentType || mode;

  const sharedProps = { patient, mode: currentMode, onBack: onBack || undefined };

  const renderContent = () => {
    /* ── Progress Intervention → dedicated progress pages ── */
    if (currentMode === "progress") {
      switch (activeTab) {
        case "sci":          return <SpinalcordInjuryProgress  patient={patient} onBack={onBack} />;
        case "neuro":        return <NeuroProgress             patient={patient} onBack={onBack} />;
        case "hydro":        return <HydroProgress             patient={patient} onBack={onBack} />;
        case "msk":          return <MSDProgress               patient={patient} onBack={onBack} />;
        case "conditioning": return <ConditionProgress         patient={patient} onBack={onBack} />;
        case "cardio":       return <CardiorespiratoryProgress patient={patient} onBack={onBack} />;
        case "amputee":      return <AmputeeProgress           patient={patient} onBack={onBack} />;
        default:             return null;
      }
    }

    /* ── Initial / Follow-up / Group → standard assessment pages ── */
    switch (activeTab) {
      case "sci":          return <SpinalCordInjury  {...sharedProps} />;
      case "neuro":        return <Neuro             {...sharedProps} />;
      case "hydro":        return <Hydro             {...sharedProps} />;
      case "msk":          return <Musculoskeletal   {...sharedProps} />;
      case "conditioning": return <Conditioning      {...sharedProps} />;
      case "cardio":       return <Cardiorespiratory {...sharedProps} />;
      case "amputee":      return <Amputee           {...sharedProps} />;
      default:             return null;
    }
  };

  return (
    <div>
      {/* Header bar — assessment type badge + back button */}
      {(currentMode || onBack) && (
        <div style={headerBar}>
          {onBack && (
            <button type="button" onClick={onBack} style={backBtn}>← Back</button>
          )}
          {currentMode && (
            <span style={{
              ...typeBadge,
              background: TYPE_COLORS[currentMode]?.bg    || "#f1f5f9",
              color:      TYPE_COLORS[currentMode]?.color || "#374151",
            }}>
              {TYPE_LABELS[currentMode] || currentMode}
            </span>
          )}
        </div>
      )}

      {/* Condition tabs */}
      <div style={tabRow}>
        {TABS.map(tab => (
          <div
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{ ...tabItem, ...(activeTab === tab.key ? activeTabStyle : {}) }}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={contentContainer}>
        {renderContent()}
      </div>
    </div>
  );
}

/* ── Styles ── */
const headerBar = {
  display: "flex", alignItems: "center", gap: 12,
  padding: "10px 16px", background: "#f9fafb",
  borderBottom: "1px solid #e5e7eb",
};
const backBtn = {
  background: "none", border: "none",
  color: "#2563eb", fontWeight: 700, fontSize: 14, cursor: "pointer",
};
const typeBadge = {
  padding: "4px 14px", borderRadius: 999,
  fontSize: 12, fontWeight: 700,
};
const tabRow = {
  display: "flex", gap: 0, flexWrap: "wrap",
  padding: "0 12px",
  borderBottom: "1px solid #e5e7eb",
  background: "#f9fafb",
};
const tabItem = {
  padding: "12px 20px",
  fontSize: 14, fontWeight: 600,
  cursor: "pointer", color: "#111827",
  borderBottom: "3px solid transparent",
  whiteSpace: "nowrap",
};
const activeTabStyle = {
  color: "#2563eb",
  borderBottom: "3px solid #2563eb",
};
const contentContainer = { padding: 16 };
