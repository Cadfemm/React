import React, { useState } from "react";

import PaedIASpeechLanguage from "./PaedSpeechAssessment";
import PaedIAFeeding from "./PaedFeedingAssessment";
import ClinicalSwallowingEvaluation from "./AdultSwallowing";

export default function AssessmentForm({ patient, mode = "initial", onBack }) {

  const isAdult = patient?.age >= 20;

  const paedTabs = [
    { key: "speech", label: "PAEDIATRIC SPEECH-LANGUAGE" },
    { key: "feeding", label: "PAEDIATRIC FEEDING/SWALLOWING" }
  ];

  const [activeTab, setActiveTab] = useState("speech");

  if (isAdult) {
    return (
      <div style={{ padding: 16 }}>
        <ClinicalSwallowingEvaluation patient={patient} onBack={onBack} mode={mode} />
      </div>
    );
  }

  return (
    <div>
      <div style={tabRow} role="tablist">
        {paedTabs.map(tab => (
          <div
            key={tab.key}
            role="tab"
            tabIndex={0}
            aria-selected={activeTab === tab.key}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveTab(tab.key); }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveTab(tab.key); } }}
            style={{ ...tabItem, ...(activeTab === tab.key ? activeTabStyle : {}) }}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div style={{ padding: 16 }}>
        {activeTab === "speech"
          ? <PaedIASpeechLanguage patient={patient} onBack={onBack} mode={mode} />
          : <PaedIAFeeding patient={patient} onBack={onBack} mode={mode} />}
      </div>
    </div>
  );
}

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