import React, { useState } from "react";
import XRayInformationForm from "./XRayInformationForm";
import ResusBayInformationForm from "./ResusBayInformationForm";
import FleetManagementForm from "./FleetManagementForm";
import LabRequestForm from "./LabRequestForm";
import EEGForm from "./EEGForm";
import PSGForm from "./PSGForm";
import NCSEMGForm from "./NCSEMGForm";
import EvokePotentialForm from "./EvokePotentialForm";
import ESTForm from "./ESTForm";
import HolterForm from "./HolterForm";

const TABS = [
  { key: "urgent", label: "Urgent care" },
  { key: "neuro", label: "Neuro & Cardio" }
];

const URGENT_OPTIONS = [
  { key: "resusbay", label: "RESUS BAY" },
  { key: "fleet", label: "FLEET Management" },
  { key: "lab", label: "Lab" },
  { key: "xray", label: "X-Ray" },
  { key: "daycare", label: "Day care" }
];

const NEURO_OPTIONS = [
  { key: "eeg", label: "EEG" },
  { key: "psg", label: "PSG" },
  { key: "ncs_emg", label: "NCS, EMG" },
  { key: "evoke", label: "EVOKE POTENTIAL STUDY" },
  { key: "est", label: "EST" },
  { key: "holter", label: "HOLTER" }
];

export default function MedicalAssistantPatientDetails({ patient, onBack }) {
  const [activeTab, setActiveTab] = useState("urgent");
  const [selectedUrgent, setSelectedUrgent] = useState("resusbay");
  const [selectedNeuro, setSelectedNeuro] = useState("eeg");

  const renderUrgentContent = (key) => {
    switch (key) {
      case "resusbay":
        return <ResusBayInformationForm patient={patient} onBack={onBack} />;
      case "fleet":
        return <FleetManagementForm patient={patient} onBack={onBack} />;
      case "lab":
        return <LabRequestForm patient={patient} onBack={onBack} />;
      case "xray":
        return <XRayInformationForm patient={patient} onBack={onBack} />;
      case "daycare":
        return (
          <div style={{ color: "#6b7280", fontStyle: "italic" }}>
            Day care content to be provided
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (activeTab === "urgent") {
      return (
        <div style={urgentContent}>
          <div style={radioRow}>
            <div style={radioGroup}>
              {URGENT_OPTIONS.map(opt => (
                <label key={opt.key} style={radioLabel}>
                  <input
                    type="radio"
                    name="urgent-option"
                    checked={selectedUrgent === opt.key}
                    onChange={() => setSelectedUrgent(opt.key)}
                    style={radioInput}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          {selectedUrgent && renderUrgentContent(selectedUrgent)}
        </div>
      );
    }
    if (activeTab === "neuro") {
      return (
        <div style={neuroContent}>
          <div style={radioRow}>
            <div style={radioGroup}>
              {NEURO_OPTIONS.map(opt => (
                <label key={opt.key} style={radioLabel}>
                  <input
                    type="radio"
                    name="neuro-option"
                    checked={selectedNeuro === opt.key}
                    onChange={() => setSelectedNeuro(opt.key)}
                    style={radioInput}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          {selectedNeuro === "eeg" && <EEGForm patient={patient} onBack={onBack} />}
          {selectedNeuro === "psg" && <PSGForm patient={patient} onBack={onBack} />}
          {selectedNeuro === "ncs_emg" && <NCSEMGForm patient={patient} onBack={onBack} />}
          {selectedNeuro === "evoke" && <EvokePotentialForm patient={patient} onBack={onBack} />}
          {selectedNeuro === "est" && <ESTForm patient={patient} onBack={onBack} />}
          {selectedNeuro === "holter" && <HolterForm patient={patient} onBack={onBack} />}
          {selectedNeuro && !["eeg", "psg", "ncs_emg", "evoke", "est", "holter"].includes(selectedNeuro) && (
            <div style={{ color: "#6b7280", fontStyle: "italic" }}>
              {NEURO_OPTIONS.find(o => o.key === selectedNeuro)?.label} – content to be provided
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={page}>
      {/* Two tabs: Urgent care | Neuro & Cardio */}
      <div style={tabRow}>
        {TABS.map(tab => (
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

      <div style={contentContainer}>
        {renderContent()}
      </div>
    </div>
  );
}

const page = {
  fontFamily: "Inter, system-ui",
  background: "#f8fafc",
  minHeight: "100vh"
};

const tabRow = {
  display: "flex",
  gap: 40,
  padding: "12px 12px 0 12px",
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

const contentContainer = {};

const urgentContent = {
  display: "flex",
  flexDirection: "column",
  gap: 8
};

const neuroContent = {
  display: "flex",
  flexDirection: "column",
  gap: 8
};

const radioRow = {
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  marginBottom: 8
};

const radioGroup = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px 32px",
  alignItems: "center"
};

const radioLabel = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  fontSize: 14,
  color: "#111827",
  fontWeight: 500
};

const radioInput = {
  width: 16,
  height: 16,
  accentColor: "#2563eb",
  cursor: "pointer",
  margin: 0
};
