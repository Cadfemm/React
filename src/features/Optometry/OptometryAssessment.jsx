import React, { useState } from "react";

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
import VisualFunctionForm from "./VisionFunctionalAssessmenmt";
import BVDAssessment from "./BvdqAssessment";
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
  const [activeAssessmentKey, setActiveAssessmentKey] = useState(null);

  /* --------- Store Form Results --------- */
  const [adultCSE, setAdultCSE] = useState(null);
  const [adultSpeech, setAdultSpeech] = useState(null);
  const [adultVoice, setAdultVoice] = useState(null);
  const [adultTrache, setAdultTrache] = useState(null);
  const [binocularVision, setBinocularVision] = useState(null);

  const [paedSpeech, setPaedSpeech] = useState(null);
  const [paedFeeding, setPaedFeeding] = useState(null);

  const objectiveAssessments = [
    {
      key: "BINOCULAR_VISION",
      label: "Binocular Vision",
      Component: BinocularVisionAssessment,
      onChange: setBinocularVision,
    },
    {
      key: "REFRACTION",
      label: "Refraction Assessment",
      Component: RefractionAssessment,
      onChange: setAdultSpeech,
    },
    {
      key: "VISION_DRIVING",
      label: "Vision For Driving",
      Component: VisionAssessment,
      onChange: setAdultVoice,
    },
    {
      key: "OCULAR_HEALTH",
      label: "Ocular Health / Structure",
      Component: OcularHealthAssessment,
      onChange: setAdultTrache,
    },
    {
      key: "SPECIAL_DIAGNOSTIC",
      label: "Special Diagnostic",
      Component: SpecialDiagnosticAssessment,
      onChange: setPaedFeeding,
    },
    {
      key: "LVQOL",
      label: "Low Vision Quality of Life Questionnaire (LVQoL)",
      Component: LVQoLForm,
      onChange: setPaedFeeding,
    },
    {
      key: "BRAIN_VISION",
      label: "Brain Vision Injury",
      Component: BrainVisionInjury,
      onChange: setPaedFeeding,
    },
    {
      key: "VISUAL_FUNCTION",
      label: "Visual Function Questionnaire",
      Component: VisualFunctionForm,
      onChange: setPaedFeeding,
    },
    {
      key: "BVDQ",
      label: "BVDQ Assessment",
      Component: BVDAssessment,
      onChange: setPaedFeeding,
    },
  ];

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

  const handleObjectiveAction = (action) => {
    if (action?.startsWith("open_obj_")) {
      const key = action.replace("open_obj_", "");
      setActiveAssessmentKey(key);
    }
  };

  return (
    <div style={styles.container}>
      {/* Objective assessments quick access (always visible)
      <div style={styles.objectiveWrapper}>
        <div style={styles.objectiveTitle}>Objective Assessments</div>
        <div style={styles.objectiveRow}>
          {objectiveAssessments.map((item) => (
            <button
              key={item.key}
              style={styles.objectiveBtn}
              onClick={() =>
                setActiveAssessmentKey((prev) =>
                  prev === item.key ? null : item.key
                )
              }
            >
              {item.label}
            </button>
          ))}
        </div>
        <div style={styles.helperText}>
          Click an assessment to open it right below.
        </div>
      </div>

      {activeAssessmentKey && (
        <InlineAssessmentCard
          title={
            objectiveAssessments.find((a) => a.key === activeAssessmentKey)
              ?.label || "Assessment"
          }
          onClose={() => setActiveAssessmentKey(null)}
        >
          {(() => {
            const item = objectiveAssessments.find(
              (a) => a.key === activeAssessmentKey
            );
            if (!item) return null;
            const { Component, onChange } = item;
            return (
              <Component
                patient={patient}
                onBack={() => setActiveAssessmentKey(null)}
                onChange={onChange}
                onSubmit={onChange}
              />
            );
          })()}
        </InlineAssessmentCard>
      )} */}

      {/* Primary: Optometry Initial Assessment */}
      <OptometryIAAssessment
        patient={patient}
        onChange={setPaedSpeech}
        onBack={onBack}
        onAction={handleObjectiveAction}
      />
    </div>
  );
}

function InlineAssessmentCard({ title, children, onClose }) {
  return (
    <div style={styles.inlineCard}>
      <div style={styles.inlineHeader}>
        <div style={styles.inlineTitle}>{title}</div>
        <button style={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
      </div>
      <div style={styles.inlineBody}>{children}</div>
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

  objectiveWrapper: {
    marginTop: 20,
    padding: 16,
    border: "1px solid #E5E7EB",
    borderRadius: 10,
    background: "#F8FAFC",
  },

  objectiveTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    color: "#0F172A",
  },

  objectiveRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  objectiveBtn: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #CBD5E1",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    color: "#0F172A",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },

  helperText: {
    marginTop: 8,
    fontSize: 12,
    color: "#475569",
  },

  inlineCard: {
    marginTop: 16,
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    background: "#fff",
    overflow: "visible",
    boxShadow: "none",
  },

  inlineHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    borderBottom: "1px solid #E5E7EB",
    background: "#F8FAFC",
  },

  inlineTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: "#0F172A",
  },

  closeBtn: {
    border: "1px solid #CBD5E1",
    background: "#fff",
    fontSize: 16,
    cursor: "pointer",
    color: "#0F172A",
    padding: "6px 10px",
    borderRadius: 999,
    transition: "all 0.2s ease",
  },

  inlineBody: {
    padding: 14,
    background: "#fff",
    maxHeight: "none",
    overflowY: "visible",
  },
};
