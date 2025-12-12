import React, { useState } from "react";
import "../styles/ClinicalSwallowEvaluation.css";

import ClinicalSwallowSubjective from "./ClinicalSwallowSubjective";
import ClinicalSwallowObjective from "./ClinicalSwallowObjective";
import ClinicalSwallowAssessment from "./ClinicalSwallowAssessment";
import Plan from "./ClinicalSwallowPlan";

export default function ClinicalSwallowCombined() {
  const [activeTab, setActiveTab] = useState("subjective");

  return (
    <div className="cse-container">
      <h2>Clinical Swallow Evaluation</h2>
 <span className="icf-tag" style={{marginBottom:"20px"}}>ICF: b510 — Ingestion functions</span>
      <div
        className="tabbs"
        style={{ gap: 20, backgroundColor: "#f3f6f9", display: "flex",marginTop:"20px" }}
      >
        <button
          className={activeTab === "subjective" ? "active" : ""}
          onClick={() => setActiveTab("subjective")}
        >
          Subjective
        </button>
        <button
          className={activeTab === "objective" ? "active" : ""}
          onClick={() => setActiveTab("objective")}
        >
          Objective
        </button>
        <button
          className={activeTab === "assessment" ? "active" : ""}
          onClick={() => setActiveTab("assessment")}
        >
          Assessment
        </button>
        <button
          className={activeTab === "plan" ? "active" : ""}
          onClick={() => setActiveTab("plan")}
        >
          Plan
        </button>
      </div>

      <div className="tabb-content">
        {activeTab === "subjective" && <ClinicalSwallowSubjective />}
        {activeTab === "objective" && <ClinicalSwallowObjective />}
        {activeTab === "assessment" && <ClinicalSwallowAssessment />}
        {activeTab === "plan" && <Plan />}
      </div>

      {/* ---------------------- Global Compensatory & Therapy Section ---------------------- */}
      <div className="section-container" style={{ marginTop: "40px" }}>
        <h3>Compensatory Strategies & Follow-up Plan</h3>

        <div className="sub-section">
          <h4>Compensatory Strategies</h4>
          <div className="checkbox-grid">
            {[
              "Chin tuck",
              "Head turn (to weaker side)",
              "Head tilt (to stronger side)",
              "Controlled bolus volume/size",
              "Cyclic ingestion",
              "Effortful swallow",
              "Supraglottic swallow",
              "Super-supraglottic swallow",
              "Double swallows",
              "Multiple swallows per bolus",
              "Verbal cueing",
              "Voluntary cough",
            ].map((strategy) => (
              <label key={strategy} className="checkbox-item">
                <input type="checkbox" />
                {strategy}
              </label>
            ))}
          </div>
        </div>

        <div className="sub-section">
          <h4>Oral Care</h4>
          <input
            type="text"
            placeholder="e.g., 3–4x/day before/after meal/oral trials"
            style={{ width: "50%" }}
          />
        </div>

        <div className="sub-section">
          <h4>Assessment (ICHI Codes)</h4>
          <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
            <li>KTC.AE.AD – Video endoscopic evaluation of swallowing</li>
            <li>KTC.AM.ZZ – Observation of swallowing</li>
          </ul>
        </div>

        <div className="sub-section">
          <h4>Therapy (ICHI Codes)</h4>
          <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
            <li>KTC.PH.ZZ – Training about swallowing</li>
            <li>KTC.PM.ZZ – Education about swallowing</li>
            <li>KTC.PN.ZZ – Advising about swallowing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
