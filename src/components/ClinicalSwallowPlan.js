import React, { useState, useEffect } from "react";
import "../styles/ClinicalSwallowEvaluation.css";

export default function ClinicalSwallowPlan() {
  const [form, setForm] = useState({
    dietLevel: "",
    dietAmount: "",
    dietFrequency: "",
    fluidLevel: "",
    fluidAmount: "",
    fluidFrequency: "",
    nonOralFeeding: "",
    safeAdvice: [],
    timestamp: "",
  });

  useEffect(() => {
    const now = new Date();
    setForm((prev) => ({ ...prev, timestamp: now.toLocaleString() }));
  }, []);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleAdvice = (advice) => {
    setForm((prev) => {
      const exists = prev.safeAdvice.includes(advice);
      return {
        ...prev,
        safeAdvice: exists
          ? prev.safeAdvice.filter((a) => a !== advice)
          : [...prev.safeAdvice, advice],
      };
    });
  };

  const handleSubmit = () => {
    console.log("Plan Data:", form);
    alert("✅ Plan Saved!");
  };

  const adviceList = [
    "Ensure patient is fully alert and upright during all oral intake",
    "Feed in small amounts slowly",
    "Monitor closely for signs of aspiration or respiratory distress",
    "Resume NPO and contact SLT immediately if concerns arise",
  ];

  return (
    <div className="section-container">
      <h3>P – Plan</h3>
      <p className="timestamp">Timestamp: {form.timestamp}</p>

      {/* ---------------- Swallowing Recommendations ---------------- */}
      <div className="sub-section">
        <h4>Swallowing Recommendations</h4>

        {/* Diet Section */}
        <div className="grid-row">
          <div>
            <label>Diet (IDDSI Level):</label>
            <select onChange={(e) => handleChange("dietLevel", e.target.value)}>
              <option value="">Select Level</option>
              <option>Level 4</option>
              <option>Level 5</option>
              <option>Level 6</option>
              <option>Level 7EC</option>
              <option>Level 7</option>
            </select>
          </div>

          <div>
            <label>Amount:</label>
            <select onChange={(e) => handleChange("dietAmount", e.target.value)}>
              <option value="">Select</option>
              <option>Oral trials</option>
              <option>Half portion</option>
              <option>Full portion</option>
            </select>
          </div>

          <div>
            <label>Frequency:</label>
            <select
              onChange={(e) => handleChange("dietFrequency", e.target.value)}
            >
              <option value="">Select</option>
              <option>1x</option>
              <option>2x</option>
              <option>3x</option>
            </select>
          </div>
        </div>

        {/* Fluids Section */}
        <div className="grid-row">
          <div>
            <label>Fluids (IDDSI Level):</label>
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
            <label>Amount:</label>
            <select
              onChange={(e) => handleChange("fluidAmount", e.target.value)}
            >
              <option value="">Select</option>
              <option>50 ml</option>
              <option>100 ml</option>
              <option>As & when required</option>
            </select>
          </div>

          <div>
            <label>Frequency:</label>
            <select
              onChange={(e) => handleChange("fluidFrequency", e.target.value)}
            >
              <option value="">Select</option>
              <option>Every feeding time</option>
              <option>As & when required</option>
            </select>
          </div>
        </div>

        {/* Non-Oral Feeding */}
        <div className="grid-row">
          <div>
            <label>Non-Oral Feeding:</label>
            <input
              type="text"
              placeholder="e.g., Continue NG / PEG / PEJ as per dietitian’s orders"
              onChange={(e) => handleChange("nonOralFeeding", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ---------------- Safe Swallowing Advice ---------------- */}
      <div className="sub-section">
        <h4>Safe Swallowing Advice</h4>
        <div className="checkbox-grid">
          {adviceList.map((advice) => (
            <label key={advice} className="checkbox-item">
              <input
                type="checkbox"
                checked={form.safeAdvice.includes(advice)}
                onChange={() => toggleAdvice(advice)}
              />
              {advice}
            </label>
          ))}
        </div>
      </div>

      <button className="save-btn" onClick={handleSubmit}>
        💾 Save Plan
      </button>
    </div>
  );
}
