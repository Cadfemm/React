import React, { useState, useEffect } from "react";
import "../styles/ClinicalSwallowEvaluation.css";

export default function ClinicalSwallowObjective() {
  const [form, setForm] = useState({
    generalObservation: "",
    positionSeen: "",
    vitals: "",
    oralHygiene: "",
    teeth: "",
    hardPalate: "",
    softPalate: "",
    tongue: "",
    upperLip: "",
    cnV: "",
    cnVII: "",
    cnIXX: "",
    cnXII: "",
    fluidLevel: "",
    solidLevel: "",
    lipSeal: "",
    mastication: "",
    oralResidue: "",
    nasalRegurgitation: "",
    coughClear: "",
    voicePostSwallow: "",
    cervicalPre: "",
    cervicalPost: "",
    timestamp: "",
  });

  useEffect(() => {
    const now = new Date();
    setForm((prev) => ({ ...prev, timestamp: now.toLocaleString() }));
  }, []);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    console.log("Objective Data:", form);
    alert("✅ Objective Assessment Saved!");
  };

  return (
    <div className="section-container">
      <h3>O – Objective</h3>
      <p className="timestamp">Timestamp: {form.timestamp}</p>

      {/* ===================== GENERAL OBSERVATION ===================== */}
      <div className="sub-section">
        <h4>General Observation</h4>

        <div className="grid-row">
          <div>
            <label>Alertness:</label>
            <select onChange={(e) => handleChange("generalObservation", e.target.value)}>
              <option value="">Select</option>
              <option>Alert</option>
              <option>Fleeting Alertness</option>
              <option>Drowsy</option>
            </select>
          </div>
          <div>
            <label>Position seen:</label>
            <input
              type="text"
              placeholder="e.g., sitting in chair / propped upright in bed"
              onChange={(e) => handleChange("positionSeen", e.target.value)}
            />
          </div>
        </div>

        <div className="grid-row">
          <div>
            <label>Vitals:</label>
            <input
              type="text"
              placeholder="Enter vitals or note ‘N/A’"
              onChange={(e) => handleChange("vitals", e.target.value)}
            />
          </div>
          <div>
            <label>Oral hygiene:</label>
            <select onChange={(e) => handleChange("oralHygiene", e.target.value)}>
              <option value="">Select</option>
              <option>Poor</option>
              <option>Fair</option>
              <option>Good</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===================== ORAL-MOTOR STRUCTURE ===================== */}
      <div className="sub-section">
        <h4>Oral-Motor Structure Observation</h4>

        <div className="grid-row">
          <div>
            <label>s3200 Teeth:</label>
            <select onChange={(e) => handleChange("teeth", e.target.value)}>
              <option value="">Select</option>
              <option>Complete</option>
              <option>Incomplete</option>
              <option>Dentures</option>
              <option>Edentulous</option>
            </select>
          </div>

          <div>
            <label>s32020 Hard Palate:</label>
            <select onChange={(e) => handleChange("hardPalate", e.target.value)}>
              <option value="">Select</option>
              <option>NAD</option>
              <option>Cleft</option>
            </select>
          </div>
        </div>

        <div className="grid-row">
          <div>
            <label>s32021 Soft Palate:</label>
            <select onChange={(e) => handleChange("softPalate", e.target.value)}>
              <option value="">Select</option>
              <option>NAD</option>
              <option>Cleft</option>
            </select>
          </div>

          <div>
            <label>s3203 Tongue:</label>
            <select onChange={(e) => handleChange("tongue", e.target.value)}>
              <option value="">Select</option>
              <option>NAD</option>
              <option>Fasciculations</option>
              <option>Deviated to weak side</option>
              <option>Thrush</option>
              <option>Mucositis</option>
              <option>Xerostomia</option>
            </select>
          </div>
        </div>

        <div className="grid-row">
          <div>
            <label>s32040 Upper Lip:</label>
            <select onChange={(e) => handleChange("upperLip", e.target.value)}>
              <option value="">Select</option>
              <option>NAD</option>
              <option>Cleft</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===================== CRANIAL NERVE EXAM ===================== */}
      <div className="sub-section">
        <h4>Cranial Nerve Exam</h4>

        <div className="grid-row">
          <div>
            <label>CN V (ROM/Rate/Strength):</label>
            <select onChange={(e) => handleChange("cnV", e.target.value)}>
              <option value="">Select</option>
              <option>WNL</option>
              <option>Reduced</option>
            </select>
          </div>

          <div>
            <label>CN VII (ROM/Rate/Strength):</label>
            <select onChange={(e) => handleChange("cnVII", e.target.value)}>
              <option value="">Select</option>
              <option>WNL</option>
              <option>Reduced</option>
              <option>Symmetrical</option>
              <option>Asymmetrical</option>
              <option>Facial Droop</option>
            </select>
          </div>
        </div>

        <div className="grid-row">
          <div>
            <label>CN IX, X:</label>
            <select onChange={(e) => handleChange("cnIXX", e.target.value)}>
              <option value="">Select</option>
              <option>WNL</option>
              <option>Reduced</option>
              <option>Voluntary cough - WNL</option>
              <option>Voluntary cough - Reduced</option>
              <option>Voice quality - NAD</option>
              <option>Voice quality - Impaired</option>
            </select>
          </div>

          <div>
            <label>CN XII (ROM/Rate/Strength):</label>
            <select onChange={(e) => handleChange("cnXII", e.target.value)}>
              <option value="">Select</option>
              <option>WNL</option>
              <option>Reduced</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===================== CLINICAL SWALLOWING EVALUATION ===================== */}
      <div className="sub-section">
        <h4>Clinical Swallowing Evaluation (CSE)</h4>
        <p className="ktc-tag">KTC.AA.ZZ Assessment of swallowing | KTC.AC.ZZ Test of swallowing</p>

        <div className="grid-row">
          <div>
            <label>Fluids (IDDSI):</label>
            <select onChange={(e) => handleChange("fluidLevel", e.target.value)}>
              <option value="">Select Level</option>
              <option>Level 0</option>
              <option>Level 1</option>
              <option>Level 2</option>
              <option>Level 3</option>
              <option>Level 4</option>
            </select>
          </div>

          <div>
            <label>Solids (IDDSI):</label>
            <select onChange={(e) => handleChange("solidLevel", e.target.value)}>
              <option value="">Select Level</option>
              <option>Level 4</option>
              <option>Level 5</option>
              <option>Level 6</option>
              <option>Level 7EC</option>
              <option>Level 7</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===================== ORAL STAGE ===================== */}
      <div className="sub-section">
        <h4>Oral Stage Observations</h4>
        <div className="grid-row">
          <div>
            <label>Lip Seal:</label>
            <select onChange={(e) => handleChange("lipSeal", e.target.value)}>
              <option value="">Select</option>
              <option>Adequate</option>
              <option>Anterior Spillage</option>
            </select>
          </div>

          <div>
            <label>Mastication:</label>
            <select onChange={(e) => handleChange("mastication", e.target.value)}>
              <option value="">Select</option>
              <option>Functional</option>
              <option>Impaired</option>
            </select>
          </div>

          <div>
            <label>Oral Residue:</label>
            <select onChange={(e) => handleChange("oralResidue", e.target.value)}>
              <option value="">Select</option>
              <option>Present</option>
              <option>Absent</option>
            </select>
          </div>
        </div>
      </div>

      {/* ===================== PHARYNGEAL STAGE ===================== */}
      <div className="sub-section">
        <h4>Pharyngeal Stage Observations</h4>

        <div className="grid-row">
          <div>
            <label>Nasal Regurgitation:</label>
            <select onChange={(e) => handleChange("nasalRegurgitation", e.target.value)}>
              <option value="">Select</option>
              <option>Yes (observed during trial)</option>
              <option>No (not observed)</option>
            </select>
          </div>

          <div>
            <label>Cough / Throat Clear:</label>
            <select onChange={(e) => handleChange("coughClear", e.target.value)}>
              <option value="">Select</option>
              <option>Present</option>
              <option>Absent</option>
            </select>
          </div>
        </div>

        <div className="grid-row">
          <div>
            <label>Voice Post-Swallow:</label>
            <select onChange={(e) => handleChange("voicePostSwallow", e.target.value)}>
              <option value="">Select</option>
              <option>Wet</option>
              <option>Clear</option>
            </select>
          </div>

          <div>
            <label>Cervical Auscultation (Pre-swallow sounds):</label>
            <select onChange={(e) => handleChange("cervicalPre", e.target.value)}>
              <option value="">Select</option>
              <option>Normal</option>
              <option>Reduced</option>
              <option>Wet</option>
              <option>Gurgly</option>
              <option>N/A</option>
            </select>
          </div>
        </div>

        <div className="grid-row">
          <div>
            <label>Cervical Auscultation (Post-swallow sounds):</label>
            <select onChange={(e) => handleChange("cervicalPost", e.target.value)}>
              <option value="">Select</option>
              <option>Normal</option>
              <option>Reduced</option>
              <option>Wet</option>
              <option>Gurgly</option>
              <option>N/A</option>
            </select>
          </div>
        </div>
      </div>

      <button className="save-btn" onClick={handleSubmit}>💾 Save Objective</button>
    </div>
  );
}
