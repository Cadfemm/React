import React, { useState, useRef, useMemo } from "react";

// import PaedIASpeechLanguage from "./PaedSpeechAssessment";
// import PaedIAFeeding from "./PaedFeedingAssessment";

import BinocularVisionAssessment from "./BinocularVisionAssessment";
import VisionAssessment from "./VisionAssessment";
import RefractionAssessment from "./RefractionAssessment";
import OcularHealthAssessment from "./OcularHealthAssessment";
import OptometryIAAssessment from "./OptometryIA";
import SpecialDiagnosticAssessment from "./SpecialDiagnostic";
import LVQoLForm from "./LowVisionQualityAssessment";
import BrainVisionInjury from "./BrainVisionInjury";
// import SpeechLanguageAssessment from "./AdultSpeechandLanguage";
// import VoiceAssessment from "./AdultVoice";
// import TracheostomyWeaningEvaluation from "./AdultTracheostomy";



// const Tracheostomy = ({ patient, onChange, onBack }) => (
//   <TracheostomyWeaningEvaluation
//     patient={patient}
//     onBack={onBack}
//     onSubmit={onChange}
//   />
// );

// const Voice = ({ patient, onChange, onBack }) => (
//   <VoiceAssessment patient={patient} onBack={onBack} onSubmit={onChange} />
// );

// const SpeechLanguage = ({ patient, onChange, onBack }) => (
//   <SpeechLanguageAssessment
//     patient={patient}
//     onBack={onBack}
//     onSubmit={onChange}
//   />
// );


// const PaedIAFeed = ({ patient, onChange, onBack }) => (
//   <PaedIAFeeding patient={patient} onBack={onBack} onSubmit={onChange} />
// );

// const PaedIASpeech = ({ patient, onChange, onBack }) => (
//   <PaedIASpeechLanguage
//     patient={patient}
//     onBack={onBack}
//     onSubmit={onChange}
//   />
// );

export default function AssessmentForm({ patient, onSave, onBack }) {
  const isAdult = patient?.age >= 20;

  const tabs = [
    "Optometry Initial Assessment",
    "BINOCULAR VISION",
    "VISION FOR DRIVING",
    "REFRACTION ASSESSMENT",
    "Ocular Health/Structure",
    "Special Diagnostic",
    "Low Vision Quality of Life Questionnaire (LVQoL)",
    "Brain Vision Injury"
  ]

  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef(null);

  /* --------- Store Form Results --------- */
  const [adultCSE, setAdultCSE] = useState(null);
  const [adultSpeech, setAdultSpeech] = useState(null);
  const [adultVoice, setAdultVoice] = useState(null);
  const [adultTrache, setAdultTrache] = useState(null);
  const [binocularVision, setBinocularVision] = useState(null);

  const [paedSpeech, setPaedSpeech] = useState(null);
  const [paedFeeding, setPaedFeeding] = useState(null);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (scrollRef.current && scrollRef.current.children[index]) {
      scrollRef.current.children[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  };

  const handleSaveAssessment = () => {
    if (!patient) {
      alert("No patient selected");
      return;
    }

    const record = {
      patientId: patient.id,
      age: patient.age,
      createdAt: new Date().toISOString(),
      category: isAdult ? "ADULT" : "PAEDIATRIC",
      data: isAdult
        ? {
            clinicalSwallowing: adultCSE,
            speechLanguage: adultSpeech,
            voice: adultVoice,
            tracheostomy: adultTrache,
          }
        : {
            speechLanguage: paedSpeech,
            feeding: paedFeeding,
          },
    };

    const key = `patient_${patient.id}_assessments`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([...existing, record]));

    onSave?.(record);
    alert("Assessment saved successfully");
  };

  return (
    <div style={styles.container}>
      {/* ================= TABS ================= */}
      <div style={{ marginTop: 12 }}>
        <div ref={scrollRef} style={styles.tabsRow}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              style={{
                ...styles.tabBtn,
                background: activeTab === index ? "#2563EB" : "transparent",
                color: activeTab === index ? "#fff" : "#111827",
                border:
                  activeTab === index
                    ? "2px solid #2563EB"
                    : "1px solid #E5E7EB",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.divider} />

      {/* ================= FORM CONTENT ================= */}
      <div>
        {tabs[activeTab] === "BINOCULAR VISION" && (
          <BinocularVisionAssessment
            patient={patient}
            onBack={onBack}
            onSubmit={setBinocularVision}
          />
        )}

        {tabs[activeTab] === "REFRACTION ASSESSMENT" && (
          <RefractionAssessment
            patient={patient}
            onChange={setAdultSpeech}
            onBack={onBack}
          />
        )}

        {tabs[activeTab] === "VISION FOR DRIVING" && (
          <VisionAssessment
            patient={patient}
            onChange={setAdultVoice}
            onBack={onBack}
          />
        )}

        {tabs[activeTab] === "Ocular Health/Structure" && (
          <OcularHealthAssessment
            patient={patient}
            onChange={setAdultTrache}
            onBack={onBack}
          />
        )}

        {tabs[activeTab] === "Optometry Initial Assessment" && (
          <OptometryIAAssessment
            patient={patient}
            onChange={setPaedSpeech}
            onBack={onBack}
          />
        )}

            {tabs[activeTab] === "Special Diagnostic" && (
            <SpecialDiagnosticAssessment
                patient={patient}
                onChange={setPaedFeeding}
                onBack={onBack}
            />
            )}

            {tabs[activeTab] === "Low Vision Quality of Life Questionnaire (LVQoL)" && (
            <LVQoLForm
                patient={patient}
                onChange={setPaedFeeding}
                onBack={onBack}
            />
            )}
            {tabs[activeTab] === "Brain Vision Injury" && (
            <BrainVisionInjury
                patient={patient}
                onChange={setPaedFeeding}
                onBack={onBack}
            />
            )}
      </div>

     
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },

  tabsRow: {
    display: "flex",
    gap: 14,
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },

  tabBtn: {
    padding: "10px 18px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: "nowrap",
    background: "transparent",
  },

  divider: {
    margin: "12px 0",
    borderBottom: "2px solid #E5E7EB",
  },

  saveBtn: {
    padding: "10px 16px",
    borderRadius: 8,
    background: "#2563EB",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },

  backBtn: {
    padding: "10px 16px",
    borderRadius: 8,
    background: "#F3F4F6",
    border: "1px solid #E5E7EB",
    cursor: "pointer",
  },
};
