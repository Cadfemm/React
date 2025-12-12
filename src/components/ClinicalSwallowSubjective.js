import React, { useState, useEffect } from "react";
import "../styles/ClinicalSwallowEvaluation.css";

export default function ClinicalSwallowSubjective() {
  const [form, setForm] = useState({
    freeText: "",
    accompanied: "",
    consent: "",
    coughing: "",
    foodStuck: "",
    painSwallow: "",
    difficultyConsistency: "",
    currentDiet: "",
    iddsiSolid: "",
    iddsiFluid: "",
    dietAmount: "",
    dietFrequency: "",
    feedingType: "",
    feedingRegime: "",
    feedingFreq: "",
    timestamp: "",
  });

  useEffect(() => {
    const now = new Date();
    setForm((prev) => ({ ...prev, timestamp: now.toLocaleString() }));
  }, []);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    console.log("Subjective Data:", form);
    alert("✅ Subjective Assessment Saved!");
  };

  return (
    <div className="section-container">
      <h2>S – Subjective</h2>
      <p className="timestamp">Timestamp: {form.timestamp}</p>

      {/* Free text + consent section */}
      <div className="sub-section">
        <p>
          <strong>
            Thank you for referring this patient for a swallowing evaluation.
          </strong>
        </p>

        <label>Free Text:</label>
        <textarea
          placeholder="The patient was seen unaccompanied/accompanied by..."
          onChange={(e) => handleChange("freeText", e.target.value)}
        />

        <label>Accompanied By:</label>
        <input
          type="text"
          placeholder="e.g., family / alone / caregiver"
          onChange={(e) => handleChange("accompanied", e.target.value)}
        />

        <label>Consent Type:</label>
        <select onChange={(e) => handleChange("consent", e.target.value)}>
          <option value="">Select</option>
          <option>Verbal consent obtained</option>
          <option>Seen in patient’s best interest</option>
        </select>
      </div>

      {/* Patient / Family Reported */}
      <div className="sub-section">
        <h3>Patient / Family Reported</h3>

        {/* Three separate Yes/No dropdowns */}
        <div className="triple-field">
          <div className="field-group">
            <label>Coughing when swallowing:</label>
            <select
              value={form.coughing}
              onChange={(e) => handleChange("coughing", e.target.value)}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="field-group">
            <label>Food stuck in throat:</label>
            <select
              value={form.foodStuck}
              onChange={(e) => handleChange("foodStuck", e.target.value)}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div className="field-group">
            <label>Pain when swallowing:</label>
            <select
              value={form.painSwallow}
              onChange={(e) => handleChange("painSwallow", e.target.value)}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        {/* Difficulty & Diet dropdowns */}
        <div className="double-field" style={{display:"flex"}}>
          <div className="field-group">
            <label>Difficulties noted on food/fluid consistencies:</label>
            <select
              value={form.difficultyConsistency}
              onChange={(e) =>
                handleChange("difficultyConsistency", e.target.value)
              }
            >
              <option value="">Select</option>
              <option>Liquid</option>
              <option>Puree</option>
              <option>Solid</option>
            </select>
          </div>

          <div className="field-group">
            <label>Current Diet Intake:</label>
            <select
              value={form.currentDiet}
              onChange={(e) => handleChange("currentDiet", e.target.value)}
            >
              <option value="">Select</option>
              <option>Liquid</option>
              <option>Puree</option>
              <option>Solid</option>
            </select>
          </div>
        </div>

        {/* IDDSI + amount + frequency */}
        <div className="grid-row">
          <div>
            <label>Diet Consistency (Solids):</label>
            <input
              type="text"
              placeholder="IDDSI L4–L7"
              onChange={(e) => handleChange("iddsiSolid", e.target.value)}
            />
          </div>
          <div>
            <label>Fluid Consistency:</label>
            <input
              type="text"
              placeholder="IDDSI L0–L4"
              onChange={(e) => handleChange("iddsiFluid", e.target.value)}
            />
          </div>
        </div>

        <div className="grid-row">
          <div>
            <label>Amount:</label>
            <input
              type="text"
              placeholder="e.g., half/full portion"
              onChange={(e) => handleChange("dietAmount", e.target.value)}
            />
          </div>
          <div>
            <label>Frequency:</label>
            <input
              type="text"
              placeholder="e.g., 3x/day, 4-hourly"
              onChange={(e) => handleChange("dietFrequency", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Enteral feeding section */}
      <div className="sub-section">
        <h3>Enteral Feeding</h3>

        <div className="grid-row">
          <div>
            <label>Type:</label>
            <select onChange={(e) => handleChange("feedingType", e.target.value)}>
              <option value="">Select</option>
              <option>NGT</option>
              <option>NJT</option>
              <option>PEG</option>
              <option>JJT</option>
            </select>
          </div>
          <div>
            <label>Regime:</label>
            <input
              type="text"
              placeholder="x scoops / x ml of water"
              onChange={(e) => handleChange("feedingRegime", e.target.value)}
            />
          </div>
        </div>

        <label>Frequency:</label>
        <select onChange={(e) => handleChange("feedingFreq", e.target.value)}>
          <option value="">Select</option>
          <option>3-hourly</option>
          <option>4-hourly</option>
        </select>
      </div>

      <button className="save-btn" onClick={handleSubmit}>
        💾 Save Subjective
      </button>
    </div>
  );
}
