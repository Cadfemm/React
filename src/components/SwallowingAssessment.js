import React, { useState } from "react";
import Select, { components } from "react-select";
import "../styles/SwallowingAssessment.css";

const CheckboxOption = (props) => (
  <components.Option {...props}>
    <input
      type="checkbox"
      checked={props.isSelected}
      onChange={() => null}
      style={{ marginRight: "8px" }}
    />
    <label>{props.label}</label>
  </components.Option>
);

function SwallowingAssessment() {
  // ==========================================
  // 🔹 STANDARD QUALIFIER DROPDOWN OPTIONS
  // ==========================================
  const qualifierOptions = [
    "qm0 - No impairment (0–4%)",
    "qm1 - Mild impairment (5–24%)",
    "qm2 - Moderate impairment (25–49%)",
    "qm3 - Severe impairment (50–95%)",
    "qm4 - Complete impairment (96–100%)",
    "qm8 - Not applicable",
    "qm9 - Not specified",
  ];

  const [showICHI, setShowICHI] = useState(false);


  const createQualifierFields = (labels) =>
    labels.map((label) => ({
      label,
      type: "custom",
      options: qualifierOptions,
    }));

  // ==========================================
  // 🔹 BODY FUNCTIONS (Existing History + Examination)
  // ==========================================
  const BodyFunctions = {
    History: {
      "Swallowing Difficulties": {
        fields: [
          { label: "Coughing", type: "severity" },
          { label: "Choking", type: "yesno" },
          { label: "Sensation of Food Sticking", type: "yesno" },
          { label: "Lung infection", type: "custom", options: ["Low", "Moderate", "High", "Critical"] },
        ],
      },
      "Onset & Progression": {
        fields: [
          { label: "Sudden (post-stroke)", type: "custom", options: ["Recent", "Chronic"] },
          { label: "Gradual (neurological disease)", type: "severity" },
        ],
      },
      "Food/liquid preferences": {
        fields: [
          { label: "Textures or types that are difficult to swallow", type: "custom", options: ["Puree", "Liquid", "Solid"] },
        ],
      },
      "Dietary modifications": {
        fields: [
          { label: "Pureed diet", type: "yesno" },
          { label: "Thickened liquids", type: "severity" },
          { label: "Assisted feeding", type: "custom", options: ["Rare", "Frequent", "Always"] },
        ],
      },
      "Symptoms During Meals": {
        fields: [
          { label: "Drooling", type: "yesno" },
          { label: "Nasal Regurgitation", type: "yesno" },
          { label: "Wet/Gurgly Voice", type: "yesno" },
          { label: "Fatigue", type: "yesno" },
        ],
      },
      "Past medical history": {
        fields: [
          { label: "Stroke", type: "yesno" },
          { label: "Neurological Disorders", type: "yesno" },
          { label: "Head/Neck Surgery", type: "yesno" },
          { label: "Dental Issues", type: "yesno" },
        ],
      },
      "Medications": {
        fields: [
          { label: "Drugs Affecting Saliva", type: "yesno" },
          { label: "Drugs Affecting Muscle Control", type: "yesno" },
          { label: "Drugs Affecting Alertness", type: "yesno" },
        ],
      },
      "Psychosocial Factors": {
        fields: [
          { label: "Caregiver support", type: "custom", options: ["Required", "Need Presence", "Not Required", "Monitoring"] },
          { label: "Meal environment", type: "yesno" },
          { label: "Impact on Daily Life", type: "custom", options: ["1", "2", "3", "4"] },
        ],
      },
    },

    Examination: {
      "Oral motor function": {
        fields: createQualifierFields(["Lip closure", "Tongue mobility", "Jaw strength", "Dentition", "Gag reflex"]),
      },
      "Pharyngeal function": {
        fields: createQualifierFields(["Laryngeal elevation", "Epiglottic movement", "Voice changes"]),
      },
      "Airway protection / cough reflex": {
        fields: createQualifierFields(["Presence/absence of choking", "Aspiration signs"]),
      },
      "Swallowing trials": {
        fields: createQualifierFields(["Thin liquids", "Thick liquids", "Pureed", "Solid – tolerance and safety"]),
      },
      "Compensatory strategies": {
        fields: createQualifierFields(["Head tilt", "Effortful swallow", "Multiple swallows"]),
      },
      "Instrumental assessment (if done)": {
        fields: createQualifierFields(["FEES – swallowing mechanics", "Aspiration risk"]),
      },
      "Functional assessment": {
        fields: createQualifierFields(["FOIS", "Other swallowing scales"]),
      },
      "Nutritional status": {
        fields: createQualifierFields(["Weight", "Hydration", "Lab values (if relevant)"]),
      },
    },
  };

  // ==========================================
  // 🍽️ ACTIVITY & PARTICIPATION (d550 – Eating)
  // ==========================================
  const ActivityParticipation = {
    "d550 – Eating": {
      fields: [
        { label: "1. Carrying out the actions to eat food, including chewing", type: "custom", options: qualifierOptions },
        { label: "2. Carrying out the actions to eat food, including swallowing", type: "custom", options: qualifierOptions },
        { label: "3. Using utensils", type: "custom", options: qualifierOptions },
        { label: "4. Ability to eat independently or with assistance", type: "custom", options: qualifierOptions },
        { label: "5. Ability to eat independently using utensils", type: "custom", options: qualifierOptions },
        { label: "6. Manage food textures", type: "custom", options: qualifierOptions },
      ],
    },
  };

  // ==========================================
  // 🌍 ENVIRONMENTAL FACTORS (e110, e355)
  // ==========================================
  const EnvironmentalFactors = {
    "e110 – Products or substances for personal consumption": {
      fields: [
        { label: "1. Food consistency modification", type: "custom", options: qualifierOptions },
        { label: "2. Thickened liquids", type: "custom", options: qualifierOptions },
        { label: "3. Supervision or assistance during meals", type: "custom", options: qualifierOptions },
      ],
    },
    "e355 – Health professionals": {
      fields: [
        { label: "Role of rehabilitation physician or speech-language pathologist in intervention", type: "text" },
      ],
    },
  };

  // ==========================================
  // 🔹 COMBINED CONFIG STRUCTURE
  // ==========================================
  const swallowingConfig = {
    "1. Body Functions": BodyFunctions,
    "2. Activity and Participation": ActivityParticipation,
    "3. Environmental Factors": EnvironmentalFactors,
  };

  // ==========================================
  // 🔹 STATE MANAGEMENT
  // ==========================================
  const [selectedOptions, setSelectedOptions] = useState({});
  const [nestedSelections, setNestedSelections] = useState({});
  const [responses, setResponses] = useState({});

  const handleMainSelect = (category, selected) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: selected || [],
    }));
  };

  const handleNestedSelect = (parentKey, selected) => {
    setNestedSelections((prev) => ({
      ...prev,
      [parentKey]: selected || [],
    }));
  };

  const handleResponseChange = (main, sub, value) => {
    setResponses((prev) => ({
      ...prev,
      [main]: {
        ...(prev[main] || {}),
        [sub]: value,
      },
    }));
  };

  // ==========================================
  // 🔹 SELECT STYLING
  // ==========================================
  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: 8,
      borderColor: "#d1d5db",
      backgroundColor: "#f9fafb",
      minHeight: 45,
      boxShadow: "none",
      "&:hover": { borderColor: "#2563eb" },
    }),
    menu: (base) => ({ ...base, zIndex: 9999 }),
  };

  // ==========================================
  // 🔹 INPUT RENDERER
  // ==========================================
  const renderInputByType = (type, field, category) => {
    switch (type) {
      case "yesno":
        return (
          <select
            className="input-field"
            onChange={(e) =>
              handleResponseChange(category, field.label, e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        );

      case "text":
        return (
          <input
            type="text"
            className="input-field"
            placeholder="Enter details"
            onChange={(e) =>
              handleResponseChange(category, field.label, e.target.value)
            }
          />
        );

      case "severity":
        return (
          <select
            multiple
            className="input-field"
            onChange={(e) =>
              handleResponseChange(
                category,
                field.label,
                Array.from(e.target.selectedOptions, (opt) => opt.value)
              )
            }
          >
            {["No", "Mild", "Moderate", "Severe"].map((val) => (
              <option key={val}>{val}</option>
            ))}
          </select>
        );

      case "custom":
        return (
          <select
            className="input-field"
            onChange={(e) =>
              handleResponseChange(category, field.label, e.target.value)
            }
          >
            <option value="">Select</option>
            {field.options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        );

      default:
        return (
          <input
            type="text"
            className="input-field"
            placeholder="Enter details"
            onChange={(e) =>
              handleResponseChange(category, field.label, e.target.value)
            }
          />
        );
    }
  };

  // ==========================================
  // 🔹 RENDER SUB-INPUTS (now handles nested + selection)
  // ==========================================
  const renderSubInputs = (category) => {
    const selectedObjects = selectedOptions[category] || [];
    const selectedItems = selectedObjects.map((o) => o.value);

    return selectedItems.map((item) => {
      const group = swallowingConfig[category]?.[item];

      // 🧩 CASE 1: Direct fields
      if (group?.fields) {
        return (
          <div key={item} className="sub-card">
            <h4 className="sub-title">{item}</h4>
            <div className="sub-grid">
              {group.fields.map((field, idx) => (
                <div key={idx} className="sub-field">
                  <label>{field.label}</label>
                  {renderInputByType(field.type, field, category)}
                </div>
              ))}
            </div>
          </div>
        );
      }

      // 🧩 CASE 2: Nested structure (History/Examination)
      if (group && typeof group === "object") {
        const formatted = Object.keys(group).map((k) => ({
          value: k,
          label: k,
        }));
        const nestedSelected = nestedSelections[item] || [];

        return (
          <div key={item} className="sub-card">
            <h4 className="sub-title">{item}</h4>
            <Select
              options={formatted}
              isMulti
              closeMenuOnSelect={false}
              components={{ Option: CheckboxOption }}
              styles={customStyles}
              value={nestedSelected}
              onChange={(sel) => handleNestedSelect(item, sel)}
              placeholder={`Select ${item} sections...`}
            />
            {nestedSelected.map((sel) => {
              const subConfig = group[sel.value];
              return (
                <div key={sel.value} className="sub-card">
                  <h5 className="sub-title">{sel.value}</h5>
                  <div className="sub-grid">
                    {subConfig.fields.map((field, idx) => (
                      <div key={idx} className="sub-field">
                        <label>{field.label}</label>
                        {renderInputByType(field.type, field, category)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      return null;
    });
  };

  // ==========================================
  // 🔹 MAIN RENDER
  // ==========================================
  return (
    <div className="swallowing-container">
      <h2 className="page-title"> Doctor Assessment</h2>
 <span className="icf-tag">ICF: b510 — Ingestion functions</span>
      {Object.entries(swallowingConfig).map(([category, items]) => {
        const formatted = Object.keys(items).map((k) => ({
          value: k,
          label: k,
        }));

        return (
          <div key={category} className="assessment-section">
            <div className="section-header">{category}</div>
            <Select
              options={formatted}
              isMulti
              closeMenuOnSelect={false}
              components={{ Option: CheckboxOption }}
              styles={customStyles}
              value={selectedOptions[category] || []}
              onChange={(sel) => handleMainSelect(category, sel)}
              placeholder="Select items..."
            />
            <div className="sub-sections">{renderSubInputs(category)}</div>
          </div>
        );
      })}

      <div className="result-section">
        <h4>Collected Responses</h4>
        {Object.keys(responses).length === 0 ? (
          <p style={{ color: "#6b7280" }}>No responses recorded yet.</p>
        ) : (
          Object.entries(responses).map(([category, data]) => (
            <div key={category} className="response-table-container">
              <h5 className="response-category">{category}</h5>
              <table className="response-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Response</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(data).map(([field, value]) => (
                    <tr key={field}>
                      <td>{field}</td>
                      <td>
                        {Array.isArray(value)
                          ? value.join(", ")
                          : value || <em style={{ color: "#9ca3af" }}>—</em>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>

{/* ==============================
    🧩 ICHI INTERVENTIONS (TOGGLED)
============================== */}
<div className="ichi-section">
  <div className="ichi-header">
    <h3 className="ichi-title">🧩 ICHI – Interventions</h3>
    <button
      className="ichi-toggle-btn"
      onClick={() => setShowICHI(!showICHI)}
    >
      {showICHI ? "Hide Interventions" : "Show Interventions"}
    </button>
  </div>

  {showICHI && (
    <div className="ichi-content">
      {/* ---- Assessment Section ---- */}
      <h4 className="ichi-subtitle">Intervention (Assessment)</h4>
      <table className="ichi-table">
        <thead>
          <tr>
            <th>Procedure</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clinical Swallowing Assessment</td>
            <td>
              Bedside swallow evaluation to observe chewing, oral control, and risk of aspiration (GUSS)
            </td>
          </tr>
          <tr>
            <td>Instrumental Assessment</td>
            <td>
              Videofluoroscopic Swallow Study (VFSS) or Fibreoptic Endoscopic Evaluation of Swallowing (FEES)
            </td>
          </tr>
        </tbody>
      </table>

      {/* ---- Management Section ---- */}
      <h4 className="ichi-subtitle" style={{ marginTop: "25px" }}>
        Intervention (Management)
      </h4>
      <table className="ichi-table">
        <thead>
          <tr>
            <th>Procedure</th>
            <th>ICHI Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Swallowing therapy / exercises</td>
            <td>JA01.Z</td>
            <td>Oral motor, pharyngeal exercises</td>
          </tr>
          <tr>
            <td>Compensatory techniques</td>
            <td>JA02.Z</td>
            <td>Postural adjustment, diet modification, adaptive feeding equipment</td>
          </tr>
          <tr>
            <td>Neuromuscular stimulation (if indicated)</td>
            <td>JA03.Z</td>
            <td>Electrical stimulation of swallowing muscles</td>
          </tr>
          <tr>
            <td>Patient / caregiver education</td>
            <td>JA04.Z</td>
            <td>Instruction on safe eating strategies, meal preparation, and monitoring for aspiration</td>
          </tr>
          <tr>
            <td>Feeding assistance</td>
            <td>JB01.Z</td>
            <td>Providing physical assistance during meals or supervision as required</td>
          </tr>
        </tbody>
      </table>
    </div>
  )}
</div>






    </div>


  );




}

export default SwallowingAssessment;
