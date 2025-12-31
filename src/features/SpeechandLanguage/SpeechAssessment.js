import React, { useState, useRef } from "react";
import PaedIASpeechLanguage from "./PaedSpeechAssessment"
import PaedIAFeeding from "./PaedFeedingAssessment"
import FeedingAssessment from "./AdultSpeechAssessment"


function AdultSpeech({ patient, onChange, onBack }) {
  return (
       <>  <FeedingAssessment
        patient={patient} onBack={onBack}
        onSubmit={onChange}/></>
  );
}



function HAMA({ onChange, patient, onBack }) {
  return (
    <></>
  );
}

function HAMD({ patient, onChange, onBack }) {
  return (
       <></>
  );
}
      


function PSS({ patient, onChange, onBack }) {
  return (
        <></>
  );
}



function PaedIAFeed({ patient, onChange, onBack }) {
  return (
        <PaedIAFeeding
        patient={patient} onBack={onBack}
        onSubmit={onChange}
      />
  );
}

function PaedIASpeech({ patient, onChange, onBack }) {
  return (
         <PaedIASpeechLanguage
        patient={patient} onBack={onBack}
        onSubmit={onChange}
      />
  );
}


/* -------------------------------------------------------------
   MAIN PSYCHOLOGY ASSESSMENT FORM
------------------------------------------------------------- */

export default function AssessmentForm({ patient, onSave, onBack }) {
  const tabs = ["SPEECH-LANGUAGE ASSESSMENT","PAEDIATRIC INITIAL FEEDING/SWALLOWING ASSESSMENT", "PAEDIATRIC INITIAL SPEECH-LANGUAGE ASSESSMENT"	  ];
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef(null);

  /* --------- Store Scale Data --------- */
  const [dass21, setDass21] = useState(null);
  const [hama, setHama] = useState(null);
  const [hamd, setHamd] = useState(null);
  const [pss, setPss] = useState(null);
  const [gad7, setGad7] = useState(null);
  const [phq9, setPhq9] = useState(null);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (scrollRef.current && scrollRef.current.children[index]) {
      scrollRef.current.children[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  };

  /* --------- SAVE ASSESSMENT --------- */
  const handleSaveAssessment = () => {
    if (!patient) {
      alert("No patient selected");
      return;
    }

    const record = {
      patientId: patient.id,
      createdBy: "Psychology",
      createdAt: new Date().toISOString(),
      scales: {
        dass21,
        hama,
        hamd,
        pss,
        gad7,
        phq9,
      },
    };

    const key = `patient_${patient.id}_psychology_assessments`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([...existing, record]));

    if (onSave) onSave(record);

    alert("Psychology assessment saved successfully");
  };

  return (
    <div
      style={{
        width: "100%",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* ================= SUBJECTIVE ================= */}
      {/* <h2 style={styles.sectionTitle}>Psychology Assessment</h2> */}
      {/* ================= TABS ================= */}
      <div style={{ marginTop: 24 }}>
        <div
          ref={scrollRef}
          className="tabs-row"
          style={styles.tabsRow}
        >
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
                    : "1px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ================= DIVIDER ================= */}
      <div style={styles.divider} />

      {/* ================= FORM CONTENT ================= */}
      <div >
        {tabs[activeTab] === "SPEECH-LANGUAGE ASSESSMENT" && (
          <AdultSpeech
            patient={patient}
            onChange={setDass21}
            onBack={onBack}
          />
        )}

        {tabs[activeTab] === "PAEDIATRIC INITIAL FEEDING/SWALLOWING ASSESSMENT"&& (
          <PaedIAFeed
            patient={patient}
            onChange={setGad7}
            onBack={onBack}
          />
        )}

        {tabs[activeTab] === "Hamilton Anxiety Rating Scale (HAM-A)" && (
          <HAMA onChange={setHama} patient={patient} onBack={onBack} />
        )}
        {tabs[activeTab] === "Hamilton Depression Rating Scale (HAM-D)" && (
          <HAMD onChange={setHamd} patient={patient} onBack={onBack} />
        )}
        {tabs[activeTab] === "Perceived Stress Scale (PSS)" && (
          <PSS patient={patient}  onBack={onBack} onChange={setPss} />
        )}

        {tabs[activeTab] === "PAEDIATRIC INITIAL SPEECH-LANGUAGE ASSESSMENT" && (
          <PaedIASpeech patient={patient} onBack={onBack} onChange={setPhq9} />
        )}
      </div>
    </div>
  );

}
const styles = {
  sectionTitle: {
    textAlign: "center",
    
   
  },

  subjectiveTextarea: {
    width: "100%",
    minHeight: 110,
    padding: 14,
    fontSize: 15,
    borderRadius: 10,
    border: "1px solid #CBD5E1",
    outline: "none",
  },

 tabsRow: {
  display: "flex",
  gap: 14,
  overflowX: "auto",
  scrollbarWidth: "none",    
  msOverflowStyle: "none",       
  justifyContent: "left",
},

  tabBtn: {
    padding: "10px 18px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: "nowrap",
  },

  divider: {
    margin: "10px 0",
    borderBottom: "2px solid #E5E7EB",
  },
};
