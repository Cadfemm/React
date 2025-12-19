import React, { useState, useRef } from "react";
import DASSFormBuilder from "./DassForm";
import PSSFormBuilder from "./PssForm";
import PHQ9FormBuilder from "./PhqForm";
import HAM_A_FormBuilder from "./HamaForm";
import GAD7FormBuilder from "./GadForm";


function ScaleWrapper({ title, children }) {
  return (
    <div style={{ padding: "10px 0" }}>
      {children}
    </div>
  );
}

function DASS21({ patient, onChange, onBack }) {
  return (
    <DASSFormBuilder
      patient={patient}
      onSubmit={onChange}
      onBack={onBack}
    />
  );
}



function HAMA({ onChange, patient, onBack }) {
  return (
    <ScaleWrapper>
      <HAM_A_FormBuilder
        patient={patient}
       onSubmit={onChange}
        onBack={onBack}
      />
    </ScaleWrapper>
  );
}

function HAMD({ onChange }) {
  return (
    <ScaleWrapper >
      <textarea
        placeholder="Enter responses / score for HAM-D"
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", minHeight: 120 }}
      />
    </ScaleWrapper>
  );
}

function PSS({ patient, onChange, onBack }) {
  return (
    <ScaleWrapper >
      <PSSFormBuilder
        patient={patient} onBack={onBack}     
       onSubmit={onChange}
      />
    </ScaleWrapper>
  );
}



function GAD7({ patient, onChange, onBack }) {
  return (
    <ScaleWrapper title="Generalized Anxiety Disorder (GAD-7)">
      <GAD7FormBuilder
       patient={patient}
      onSubmit={onChange}
      onBack={onBack}
      />
    </ScaleWrapper>
  );
}

function PHQ9({ patient, onChange, onBack }) {
  return (
    <ScaleWrapper>
      <PHQ9FormBuilder
        patient={patient} onBack={onBack}
        onSubmit={onChange}
      />
    </ScaleWrapper>
  );
}


/* -------------------------------------------------------------
   MAIN PSYCHOLOGY ASSESSMENT FORM
------------------------------------------------------------- */

export default function PsychologyAssessmentForm({ patient, onSave, onBack }) {
  const tabs = ["Depression Anxiety Stress Scale (DASS)", "Hamilton Anxiety Rating Scale (HAM-A)", "Perceived Stress Scale (PSS)", "Generalized Anxiety Disorder (GAD)", "Patient Health Questionnaire (PHQ)"];
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
      <h2 style={styles.sectionTitle}>Subjective</h2>

      <textarea
        placeholder="Enter subjective notes here..."
        style={styles.subjectiveTextarea}
      />

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

      {/* ================= OBJECTIVE ================= */}
      <h2 style={styles.sectionTitle}>Objective</h2>

      {/* ================= FORM CONTENT ================= */}
      <div >
        {tabs[activeTab] === "Depression Anxiety Stress Scale (DASS)" && (
          <DASS21
            patient={patient}
            onChange={setDass21}
            onBack={onBack}
          />
        )}

        {tabs[activeTab] === "Generalized Anxiety Disorder (GAD)" && (
          <GAD7
            patient={patient}
            onChange={setGad7}
            onBack={onBack}
          />
        )}

        {tabs[activeTab] === "Hamilton Anxiety Rating Scale (HAM-A)" && (
          <HAMA onChange={setHama}    patient={patient} onBack={onBack} />
        )}
        {tabs[activeTab] === "HAM-D" && (
          <HAMD onChange={setHamd} />
        )}
        {tabs[activeTab] === "Perceived Stress Scale (PSS)" && (
          <PSS patient={patient}  onBack={onBack} onChange={setPss} />
        )}

        {tabs[activeTab] === "Patient Health Questionnaire (PHQ)" && (
          <PHQ9 patient={patient} onBack={onBack} onChange={setPhq9} />
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
