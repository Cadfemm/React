import React, { useState } from "react";
import { icdData } from "../../../data/masterData";
import AssessmentRenderer from "./AssessmentRenderer";

export default function PatientDetails({ patient, department, onBack }) {

  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [activeTab, setActiveTab] = useState("subjective"); // SUBJECTIVE | OBJECTIVE

  const mapping = icdData[patient.icd]?.[department];

  if (!mapping) {
    return <p>No mapping found for this ICD and department.</p>;
  }

  // full assessment list
  const assessments = mapping.Assessments.flatMap(a =>
    a.split("\n").map(item => item.trim()).filter(x => x !== "")
  );

  // SIMPLE classification logic (you can improve manually)
  const subjectiveList = assessments.filter(a =>
    a.toLowerCase().includes("subjective") ||
    a.toLowerCase().includes("phq") ||
    a.toLowerCase().includes("sleep") ||
    a.toLowerCase().includes("goal") ||
    a.toLowerCase().includes("screen") ||
    a.toLowerCase().includes("question") ||
    a.toLowerCase().includes("hads") ||
    a.toLowerCase().includes("gad")
  );

  const objectiveList = assessments.filter(a => !subjectiveList.includes(a));

  return (
    <div style={{ padding: 20 }}>
     
      {/* Back Button */}
      <button 
        onClick={onBack}
        style={{
          marginBottom: 20,
          padding: "8px 14px",
          border: "1px solid #333",
          borderRadius: 6,
          cursor: "pointer",
          background: "#1b1919ff",
          color:"#886464ff !important"
        }}
      >
        ← Back
      </button>

      <h3>{patient.name} — {patient.icd}</h3>
      <hr />

      <h4>ICF</h4>
      {mapping.ICF.map((i, index) => <p key={index}>{i}</p>)}

      <h4>ICHI</h4>
      {mapping.ICHI.map((i, index) => (
        <pre key={index} style={{ whiteSpace: "pre-wrap" }}>{i}</pre>
      ))}

      {/* TAB SECTION */}
      <h3 style={{ marginTop: 30 }}>Assessments</h3>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab("subjective")}
          style={{
            padding: "10px 18px",
            borderRadius: 6,
            border: activeTab === "subjective" ? "2px solid #000" : "1px solid #aaa",
            background: activeTab === "subjective" ? "#ddd" : "#f7f7f7",
            color:"#000",
            cursor: "pointer"
          }}
        >
          Subjective
        </button>

        <button
          onClick={() => setActiveTab("objective")}
          style={{
            padding: "10px 18px",
            borderRadius: 6,
            border: activeTab === "objective" ? "2px solid #000" : "1px solid #aaa",
            background: "#1b1919ff",
            color:"#000",
            background: activeTab === "objective" ? "#ddd" : "#f7f7f7",
            cursor: "pointer"
          }}
        >
          Objective
        </button>
      </div>

      {/* LIST OF ASSESSMENTS */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" ,color:"#000"}}>
        
        {activeTab === "subjective" &&
          (subjectiveList.length > 0 ? subjectiveList.map((a, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAssessment(a)}
              style={{
                padding: "10px 12px",
                border: "1px solid #333",
                borderRadius: 6,

                cursor: "pointer"
              }}
            >
              {a}
            </button>
          )) : <p>No subjective assessments</p>)
        }

        {activeTab === "objective" &&
          (objectiveList.length > 0 ? objectiveList.map((a, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAssessment(a)}
              style={{
                padding: "10px 12px",
                border: "1px solid #333",
                borderRadius: 6,
                
                cursor: "pointer"
              }}
            >
              {a}
            </button>
          )) : <p>No objective assessments</p>)
        }

      </div>

      {/* RENDER SELECTED ASSESSMENT */}
      <div style={{ marginTop: 20 }}>
        <AssessmentRenderer selected={selectedAssessment} />
      </div>
    </div>
  );
}
