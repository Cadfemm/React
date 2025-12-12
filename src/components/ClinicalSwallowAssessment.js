import React, { useState, useEffect } from "react";
import "../styles/ClinicalSwallowEvaluation.css";

export default function ClinicalSwallowAssessment() {
  const [form, setForm] = useState({
    swallowProblem: "",
    dysphagiaType: "",
    characteristics: "",
    bCodes: [],
    foisLevel: "",
    timestamp: "",
  });

  useEffect(() => {
    const now = new Date();
    setForm((prev) => ({ ...prev, timestamp: now.toLocaleString() }));
  }, []);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // ✅ true multi-select toggle logic
  const toggleCode = (code) => {
    setForm((prev) => {
      const exists = prev.bCodes.includes(code);
      return {
        ...prev,
        bCodes: exists
          ? prev.bCodes.filter((c) => c !== code)
          : [...prev.bCodes, code],
      };
    });
  };

  const handleSubmit = () => {
    console.log("Assessment Data:", form);
    alert("✅ Assessment Saved!");
  };

  const foisDescriptions = {
    0: "Normal swallowing mechanism.",
    1: "Minimal dysphagia – slight deviation from normal swallow; no diet change required.",
    2: "Mild dysphagia – manageable with swallow suggestions and slight dietary modification.",
    3: "Mild–moderate dysphagia – aspiration risk reduced with techniques and modified diet.",
    4: "Moderate dysphagia – significant aspiration potential; supervision or tube feeding may be required.",
    5: "Moderately severe dysphagia – aspiration 5–10%; alternative feeding mode required.",
    6: "Severe dysphagia – >10% aspiration; 'Nothing by mouth' recommended.",
  };

  const bCodeList = [
    "b5101 Biting",
    "b5102 Chewing",
    "b5103 Manipulation of food in the mouth",
    "b51050 Oral swallowing",
    "b51051 Pharyngeal swallowing",
  ];

  return (
    <div className="section-container">
      <h3>A – Analysis / Assessment</h3>
      <p className="timestamp">Timestamp: {form.timestamp}</p>

      {/* ---------------- Swallowing Observation ---------------- */}
      <div className="sub-section">
        <h4>Swallowing Observation</h4>
        <label>No swallowing problem observed during CSE today:</label>
        <select onChange={(e) => handleChange("swallowProblem", e.target.value)}>
          <option value="">Select</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      {/* ---------------- Dysphagia Characterization ---------------- */}
      <div className="sub-section">
        <h4>Dysphagia Characterization</h4>

        <div className="grid-row">
          <div>
            <label>Type of Dysphagia:</label>
            <select onChange={(e) => handleChange("dysphagiaType", e.target.value)}>
              <option value="">Select</option>
              <option>Oral Dysphagia</option>
              <option>Pharyngeal Dysphagia</option>
              <option>Oropharyngeal Dysphagia</option>
            </select>
          </div>

          <div>
            <label>Characterized by:</label>
            <input
              type="text"
              placeholder="e.g., anterior spillage / oral residue / aspiration signs"
              onChange={(e) => handleChange("characteristics", e.target.value)}
            />
          </div>
        </div>

        <label>Relevant ICF Codes (multi-select):</label>
        <div className="checkbox-grid">
          {bCodeList.map((code) => (
            <label key={code} className="checkbox-item">
              <input
                type="checkbox"
                checked={form.bCodes.includes(code)}
                onChange={() => toggleCode(code)} // ✅ true multi-select toggle
              />
              {code}
            </label>
          ))}
        </div>
      </div>

      {/* ---------------- FOIS Scale ---------------- */}
      <div className="sub-section">
        <h4>Functional Oral Intake Scale (FOIS)</h4>
        <div className="fois-scale">
          {[0, 1, 2, 3, 4, 5, 6].map((lvl) => (
            <div
              key={lvl}
              className={`fois-level fois-${lvl} ${
                form.foisLevel === lvl ? "selected" : ""
              }`}
              onClick={() => handleChange("foisLevel", lvl)}
            >
              {lvl}
            </div>
          ))}
        </div>

        {form.foisLevel !== "" && (
          <p className="fois-desc">
            <strong>Level {form.foisLevel}:</strong>{" "}
            {foisDescriptions[form.foisLevel]}
          </p>
        )}
      </div>

      <button className="save-btn" onClick={handleSubmit}>
        💾 Save Assessment
      </button>
    </div>
  );
}
