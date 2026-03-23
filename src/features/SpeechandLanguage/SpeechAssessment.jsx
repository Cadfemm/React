import React, { useEffect, useState } from "react";

import PaedIASpeechLanguage from "./PaedSpeechAssessment";
import PaedIAFeeding from "./PaedFeedingAssessment";
import VoiceQualityAssessment from "./CapeAssement";
import ClinicalSwallowingEvaluation from "./AdultSwallowing";
import SpeechLanguageAssessment from "./AdultSpeechandLanguage";
import VoiceAssessment from "./AdultVoice";
import TracheostomyWeaningEvaluation from "./AdultTracheostomy";
import VoiceIndices from "./VoiceHandicapAssessment";

export default function AssessmentForm({ patient, mode = "initial", onBack }) {

  const isAdult = patient?.age >= 20;

  const adultTabs = [
    { key: "cse", label: "ADULT CLINICAL SWALLOWING" },
    { key: "speech", label: "ADULT SPEECH-LANGUAGE" },
    { key: "voice", label: "ADULT VOICE" },
    { key: "trache", label: "TRACHEOSTOMY WEANING" },
    // { key: "cape", label: "CAPE-V" },
    // { key: "vhi", label: "VOICE HANDICAP INDEX" }
  ];

  const paedTabs = [
    { key: "speech", label: "PAEDIATRIC SPEECH-LANGUAGE" },
    { key: "feeding", label: "PAEDIATRIC FEEDING/SWALLOWING" }
  ];

  const tabs = isAdult ? adultTabs : paedTabs;

  const [activeTab, setActiveTab] = useState(tabs[0]?.key);

  useEffect(() => {
    setActiveTab(isAdult ? "cse" : "speech");
  }, [patient?.id, mode, isAdult]);

  /* ================= CONTENT ================= */

  const renderContent = () => {
    switch (activeTab) {

      case "cse":
        return (
          <ClinicalSwallowingEvaluation patient={patient} onBack={onBack} mode={mode} />
        );

      case "speech":
        return isAdult
          ? <SpeechLanguageAssessment patient={patient} onBack={onBack} mode={mode} />
          : <PaedIASpeechLanguage patient={patient} onBack={onBack} mode={mode} />;

      case "voice":
        return <VoiceAssessment patient={patient} onBack={onBack} mode={mode} />;

      case "trache":
        return (
          <TracheostomyWeaningEvaluation patient={patient} onBack={onBack} mode={mode} />
        );

      // case "cape":
      //   return <VoiceQualityAssessment patient={patient} />;

      // case "vhi":
      //   return <VoiceIndices patient={patient} />;

      case "feeding":
        return <PaedIAFeeding patient={patient} onBack={onBack} mode={mode} />;

      default:
        return null;
    }
  };

  return (
    <div>
      {/* ================= TABS (same as Initial) ================= */}
      <div style={tabRow} role="tablist">
        {tabs.map(tab => (
          <div
            key={tab.key}
            role="tab"
            tabIndex={0}
            aria-selected={activeTab === tab.key}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab(tab.key);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveTab(tab.key);
              }
            }}
            style={{
              ...tabItem,
              ...(activeTab === tab.key ? activeTabStyle : {})
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* ================= CONTENT (patient info, common, SOAP - same as Initial; section checkboxes in followup) ================= */}
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