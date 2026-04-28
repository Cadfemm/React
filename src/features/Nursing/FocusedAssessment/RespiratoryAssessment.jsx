import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function RespiratoryAssessment({ layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const labelStyle = { display: "flex", alignItems: "center", gap: 8, fontSize: 14, marginBottom: 4 };

  const RESPIRATORY_SCHEMA = {
    title: "Respiratory Focused Assessment",
    sections: [
      // ─────────────────────────────────────────────
      // RESPIRATORY HISTORY
      // ─────────────────────────────────────────────
      {
        title: "RESPIRATORY HISTORY",
        fields: [
          {
            // Multiple complaints can coexist → checkbox
            name: "respiratory_complaint",
            label: "Respiratory Complaint (select all that apply)",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none", exclusive: true },
              { label: "Shortness of breath", value: "sob" },
              { label: "Cough", value: "cough" },
              { label: "Wheeze", value: "wheeze" },
              { label: "Chest tightness", value: "chest_tightness" },
              { label: "Chest pain on breathing", value: "chest_pain_breathing" },
              { label: "Fatigue on exertion", value: "fatigue_exertion" },
              { label: "Fever / recent respiratory infection", value: "fever_infection" },
              { label: "Frank haemoptysis", value: "haemoptysis" }
            ]
          },
          {
            // Other with specify below
            name: "respiratory_complaint_other_custom",
            type: "custom",
            render: ({ values, onChange }) => {
              const checked = values["respiratory_complaint"] || [];
              const toggle = (val) => {
                const next = checked.includes(val)
                  ? checked.filter((v) => v !== val)
                  : [...checked, val];
                onChange("respiratory_complaint", next);
              };
              return (
                <div>
                  <label style={labelStyle}>
                    <input type="checkbox" checked={checked.includes("other")} onChange={() => toggle("other")} />
                    Other:
                  </label>
                  {checked.includes("other") && (
                    <input
                      type="text"
                      value={values["respiratory_complaint_other_specify"] || ""}
                      onChange={(e) => onChange("respiratory_complaint_other_specify", e.target.value)}
                      placeholder="Specify other complaint"
                      style={{
                        marginTop: 8,
                        padding: "8px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        fontSize: 14,
                        width: "300px"
                      }}
                    />
                  )}
                </div>
              );
            }
          },
          // Dyspnoea: 2 options → side-by-side
          {
            name: "dyspnoea_present",
            label: "Dyspnoea",
            type: "radio",
            position: "side",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          // Dyspnoea details - show when Yes is selected
          {
            name: "dyspnoea_details",
            type: "custom",
            render: ({ values, onChange }) => {
              if (values["dyspnoea_present"] !== "yes") return null;
              
              return (
                <div style={{ marginLeft: 20, padding: "10px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#f9fafb" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 12 }}>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Onset</label>
                      {["Sudden", "Gradual", "Unknown"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="dyspnoea_onset"
                            checked={values["dyspnoea_onset"] === item.toLowerCase()}
                            onChange={() => onChange("dyspnoea_onset", item.toLowerCase())}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Occurs</label>
                      {["At rest", "With exertion", "Nocturnal"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="dyspnoea_occurs"
                            checked={values["dyspnoea_occurs"] === item.toLowerCase().replace(" ", "_")}
                            onChange={() => onChange("dyspnoea_occurs", item.toLowerCase().replace(" ", "_"))}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Severity (0-10)</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={values["dyspnoea_severity"] || ""}
                        onChange={(e) => onChange("dyspnoea_severity", e.target.value)}
                        style={{ width: "100%", padding: "6px", border: "1px solid #d1d5db", borderRadius: "4px" }}
                      />
                    </div>
                  </div>
                </div>
              );
            }
          },
          // Orthopnoea: 2 options → side-by-side
          {
            name: "orthopnoea",
            label: "Orthopnoea",
            type: "radio",
            position: "side",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          // Orthopnoea pillows - show when Yes is selected
          {
            name: "orthopnoea_pillows_field",
            type: "custom",
            render: ({ values, onChange }) => {
              if (values["orthopnoea"] !== "yes") return null;
              return (
                <div style={{ marginTop: 8 }}>
                  <label style={{ fontSize: 13, marginBottom: 4, display: "block" }}>Pillows used:</label>
                  <input
                    type="text"
                    value={values["orthopnoea_pillows"] || ""}
                    onChange={(e) => onChange("orthopnoea_pillows", e.target.value)}
                    placeholder="Number of pillows"
                    style={{ padding: "6px", border: "1px solid #d1d5db", borderRadius: "4px", width: "150px" }}
                  />
                </div>
              );
            }
          },
          // PND: 2 options → side-by-side
          {
            name: "pnd",
            label: "PND",
            type: "radio",
            position: "side",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          // Cough: 2 options → side-by-side
          {
            name: "cough_present",
            label: "Cough",
            type: "radio",
            position: "side",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          // Cough details - show when Yes is selected
          {
            name: "cough_details",
            type: "custom",
            render: ({ values, onChange }) => {
              if (values["cough_present"] !== "yes") return null;
              
              return (
                <div style={{ marginLeft: 20, padding: "10px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#f9fafb" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Duration</label>
                      {["Acute <3 wks", "Subacute 3–8 wks", "Chronic >8 wks"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="cough_duration"
                            checked={values["cough_duration"] === item.toLowerCase().replace(/[^a-z0-9]/g, "_")}
                            onChange={() => onChange("cough_duration", item.toLowerCase().replace(/[^a-z0-9]/g, "_"))}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Character</label>
                      {["Dry", "Productive"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="cough_character"
                            checked={values["cough_character"] === item.toLowerCase()}
                            onChange={() => onChange("cough_character", item.toLowerCase())}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Timing</label>
                      {["Morning", "Night", "Continuous", "Intermittent"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="cough_timing"
                            checked={values["cough_timing"] === item.toLowerCase()}
                            onChange={() => onChange("cough_timing", item.toLowerCase())}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
          },
          // Sputum section - show when cough is productive
          {
            name: "sputum_section",
            label: "Sputum (if productive)",
            type: "custom",
            render: ({ values, onChange }) => {
              if (values["cough_character"] !== "productive") return null;
              
              return (
                <div style={{ marginLeft: 20, padding: "10px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#f9fafb" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Amount</label>
                      {["Scant", "Small", "Moderate", "Large"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="sputum_amount"
                            checked={values["sputum_amount"] === item.toLowerCase()}
                            onChange={() => onChange("sputum_amount", item.toLowerCase())}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Odour</label>
                      {["None", "Foul"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="sputum_odour"
                            checked={values["sputum_odour"] === item.toLowerCase()}
                            onChange={() => onChange("sputum_odour", item.toLowerCase())}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Colour</label>
                      {["Clear", "White", "Yellow", "Green", "Blood-tinged", "Rust", "Black"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="sputum_colour"
                            checked={values["sputum_colour"] === item.toLowerCase().replace("-", "_")}
                            onChange={() => onChange("sputum_colour", item.toLowerCase().replace("-", "_"))}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Consistency</label>
                      {["Thin", "Thick"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="sputum_consistency"
                            checked={values["sputum_consistency"] === item.toLowerCase()}
                            onChange={() => onChange("sputum_consistency", item.toLowerCase())}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
          },
          // Smoking: 3 options → side-by-side
          {
            name: "smoking_status",
            label: "Smoking",
            type: "radio",
            position: "side",
            options: [
              { label: "Never", value: "never" },
              { label: "Former", value: "former" },
              { label: "Current", value: "current" }
            ]
          },
          // Pack-years field - show when Former or Current is selected
          {
            name: "pack_years_field",
            type: "custom",
            render: ({ values, onChange }) => {
              if (!["former", "current"].includes(values["smoking_status"])) return null;
              return (
                <div style={{ marginTop: 8 }}>
                  <label style={{ fontSize: 13, marginBottom: 4, display: "block" }}>Pack-years (auto-calc):</label>
                  <input
                    type="text"
                    value={values["pack_years"] || ""}
                    onChange={(e) => onChange("pack_years", e.target.value)}
                    style={{ padding: "6px", border: "1px solid #d1d5db", borderRadius: "4px", width: "150px" }}
                  />
                </div>
              );
            }
          },
          // Environmental Exposure: 4 options → side-by-side
          {
            name: "environmental_exposure",
            label: "Environmental Exposure",
            type: "checkbox-group",
            position: "side",
            options: [
              { label: "Second-hand smoke", value: "second_hand_smoke" },
              { label: "Occupational dust/chemicals", value: "occupational" },
              { label: "Biomass fuel", value: "biomass_fuel" },
              { label: "None", value: "none", exclusive: true }
            ]
          },
          // Past Respiratory History: 10 options → display below
          {
            name: "past_respiratory_history",
            label: "Past Respiratory History",
            type: "checkbox-group",
            options: [
              { label: "Asthma", value: "asthma" },
              { label: "COPD", value: "copd" },
              { label: "Tuberculosis", value: "tuberculosis" },
              { label: "Pneumonia (recurrent)", value: "pneumonia" },
              { label: "Pulmonary embolism", value: "pe" },
              { label: "Lung cancer", value: "lung_cancer" },
              { label: "Obstructive sleep apnoea", value: "osa" },
              { label: "COVID lung disease", value: "covid_lung" },
              { label: "Mechanical ventilation Hx", value: "mech_vent_hx" },
              { label: "Chest trauma/surgery", value: "chest_trauma" },
              { label: "None", value: "none", exclusive: true }
            ]
          },
          // Current Respiratory Treatments: 7 options → display below
          {
            name: "current_respiratory_treatments",
            label: "Current Respiratory Treatments",
            type: "checkbox-group",
            options: [
              { label: "Inhalers", value: "inhalers" },
              { label: "Nebulisers", value: "nebulisers" },
              { label: "Oxygen therapy", value: "oxygen" },
              { label: "Steroids", value: "steroids" },
              { label: "Antibiotics", value: "antibiotics" },
              { label: "CPAP/BiPAP", value: "cpap_bipap" },
              { label: "None", value: "none", exclusive: true }
            ]
          },
          // Functional Respiratory Status: 6 options → display below
          {
            name: "functional_respiratory_status",
            label: "Functional Respiratory Status",
            type: "radio",
            options: [
              { label: "Speaks full sentences without breathlessness", value: "full_sentences" },
              { label: "Dyspnoea on exertion", value: "doe" },
              { label: "Dyspnoea at rest", value: "dar" },
              { label: "Requires rest breaks", value: "rest_breaks" },
              { label: "Requires oxygen during activity", value: "oxygen_activity" },
              { label: "Unable to tolerate therapy", value: "unable" }
            ]
          }
        ]
      },

      // ─────────────────────────────────────────────
      // CLINICAL EXAMINATION
      // ─────────────────────────────────────────────
      {
        title: "CLINICAL EXAMINATION",
        fields: [
          // Breathing Pattern
          {
            name: "breathing_pattern_section",
            label: "Breathing Pattern",
            type: "custom",
            render: ({ values, onChange }) => (
              <div>
                <label style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, display: "block" }}>Breathing Pattern</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 12 }}>
                  {[
                    "Normal/easy breathing", "Tachypnoea", "Bradypnoea", "Laboured breathing",
                    "Air hunger", "Pursed-lip breathing", "Tripod positioning", "Accessory muscle use", "Agonal respirations"
                  ].map((item) => (
                    <label key={item} style={labelStyle}>
                      <input
                        type="checkbox"
                        checked={(values["breathing_pattern"] || []).includes(item.toLowerCase().replace(/[^a-z0-9]/g, "_"))}
                        onChange={() => {
                          const current = values["breathing_pattern"] || [];
                          const val = item.toLowerCase().replace(/[^a-z0-9]/g, "_");
                          const next = current.includes(val)
                            ? current.filter(v => v !== val)
                            : [...current, val];
                          onChange("breathing_pattern", next);
                        }}
                      />
                      {item}
                    </label>
                  ))}
                </div>
                <div>
                  <label style={{ fontSize: 13, marginBottom: 4, display: "block" }}>RR (/min):</label>
                  <input
                    type="number"
                    value={values["respiratory_rate"] || ""}
                    onChange={(e) => onChange("respiratory_rate", e.target.value)}
                    style={{ padding: "6px", border: "1px solid #d1d5db", borderRadius: "4px", width: "100px" }}
                  />
                </div>
              </div>
            )
          },
          // Level of Consciousness: 5 options → display below
          {
            name: "level_of_consciousness",
            label: "Level of Consciousness",
            type: "radio",
            options: [
              { label: "Alert", value: "alert" },
              { label: "Restless/agitated", value: "restless" },
              { label: "Drowsy", value: "drowsy" },
              { label: "Obtunded", value: "obtunded" },
              { label: "Unresponsive", value: "unresponsive" }
            ]
          },
          // Chest Wall & Expansion: 6 options → display below
          {
            name: "chest_wall_expansion",
            label: "Chest Wall & Expansion",
            type: "checkbox-group",
            options: [
              { label: "Symmetrical expansion", value: "symmetrical" },
              { label: "Asymmetrical expansion", value: "asymmetrical" },
              { label: "Barrel chest", value: "barrel_chest" },
              { label: "Retractions", value: "retractions" },
              { label: "Flail segment", value: "flail_segment" },
              { label: "Chest deformity", value: "chest_deformity" }
            ]
          },
          // Airway & Secretions: 5 options → display below
          {
            name: "airway_secretions",
            label: "Airway & Secretions",
            type: "checkbox-group",
            options: [
              { label: "Airway patent", value: "patent" },
              { label: "Drooling", value: "drooling" },
              { label: "Audible secretions", value: "audible_secretions" },
              { label: "Gurgling", value: "gurgling" },
              { label: "Stridor", value: "stridor" }
            ]
          },
          // Skin & Perfusion: 6 options → display below
          {
            name: "skin_perfusion",
            label: "Skin & Perfusion",
            type: "checkbox-group",
            options: [
              { label: "Normal colour", value: "normal_colour" },
              { label: "Central cyanosis", value: "central_cyanosis" },
              { label: "Peripheral cyanosis", value: "peripheral_cyanosis" },
              { label: "Pallor", value: "pallor" },
              { label: "Diaphoresis", value: "diaphoresis" },
              { label: "Clubbing", value: "clubbing" }
            ]
          },
          // SpO2 and Flow rate
          {
            name: "spo2",
            label: "SpO₂ (%)",
            type: "input"
          },
          {
            name: "flow_rate",
            label: "Flow rate (L/min)",
            type: "input"
          },
          // Oxygen device: 7 options → display below
          {
            name: "oxygen_device",
            label: "Oxygen device",
            type: "radio",
            options: [
              { label: "Room air", value: "room_air" },
              { label: "Nasal cannula", value: "nasal_cannula" },
              { label: "Simple mask", value: "simple_mask" },
              { label: "Non-rebreather", value: "non_rebreather" },
              { label: "HFNC", value: "hfnc" },
              { label: "CPAP/BiPAP", value: "cpap_bipap" },
              { label: "Mechanical ventilation", value: "mechanical_ventilation" }
            ]
          },
          // Primary Breath Sounds: 5 options → display below
          {
            name: "primary_breath_sounds",
            label: "Primary Breath Sounds",
            type: "radio",
            options: [
              { label: "Vesicular (normal)", value: "vesicular" },
              { label: "Bronchovesicular", value: "bronchovesicular" },
              { label: "Bronchial", value: "bronchial" },
              { label: "Diminished", value: "diminished" },
              { label: "Absent", value: "absent" }
            ]
          },
          // Distribution: 3 options + specify → side-by-side
          {
            name: "breath_sounds_distribution",
            label: "Distribution",
            type: "radio",
            position: "side",
            options: [
              { label: "Bilateral", value: "bilateral" },
              { label: "Right-sided", value: "right_sided" },
              { label: "Left-sided", value: "left_sided" }
            ]
          },
          // Localised specify option
          {
            name: "distribution_localised_custom",
            type: "custom",
            render: ({ values, onChange }) => (
              <div>
                <label style={labelStyle}>
                  <input
                    type="radio"
                    name="breath_sounds_distribution"
                    checked={values["breath_sounds_distribution"] === "localised"}
                    onChange={() => onChange("breath_sounds_distribution", "localised")}
                  />
                  Localised — specify:
                </label>
                {values["breath_sounds_distribution"] === "localised" && (
                  <input
                    type="text"
                    value={values["breath_sounds_localised_specify"] || ""}
                    onChange={(e) => onChange("breath_sounds_localised_specify", e.target.value)}
                    placeholder="Specify location"
                    style={{
                      marginTop: 4,
                      padding: "6px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      width: "200px"
                    }}
                  />
                )}
              </div>
            )
          },
          // Adventitious Sounds
          {
            name: "adventitious_sounds",
            label: "Adventitious Sounds",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none", exclusive: true },
              { label: "Crackles — Fine", value: "crackles_fine" },
              { label: "Crackles — Coarse", value: "crackles_coarse" },
              { label: "Wheezes — Inspiratory", value: "wheezes_inspiratory" },
              { label: "Wheezes — Expiratory", value: "wheezes_expiratory" },
              { label: "Rhonchi", value: "rhonchi" },
              { label: "Stridor", value: "stridor" },
              { label: "Pleural friction rub", value: "pleural_friction_rub" }
            ]
          },
          // Adventitious Sounds Location
          {
            name: "adventitious_sounds_location",
            label: "Location(s)",
            type: "input"
          },
          // Palpation: Tactile Fremitus: 3 options → side-by-side
          {
            name: "tactile_fremitus",
            label: "Tactile Fremitus",
            type: "radio",
            position: "side",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Increased", value: "increased" },
              { label: "Decreased", value: "decreased" }
            ]
          },
          // Chest Expansion: 2 options → side-by-side
          {
            name: "chest_expansion_palpation",
            label: "Chest Expansion",
            type: "radio",
            position: "side",
            options: [
              { label: "Symmetrical", value: "symmetrical" },
              { label: "Asymmetrical", value: "asymmetrical" }
            ]
          },
          // Subcutaneous Crepitus: 2 options → side-by-side
          {
            name: "subcutaneous_crepitus",
            label: "Subcutaneous Crepitus",
            type: "radio",
            position: "side",
            options: [
              { label: "Absent", value: "absent" },
              { label: "Present", value: "present" }
            ]
          },
          // Crepitus Location - show when Present
          {
            name: "crepitus_location_field",
            type: "custom",
            render: ({ values, onChange }) => {
              if (values["subcutaneous_crepitus"] !== "present") return null;
              return (
                <div style={{ marginTop: 8 }}>
                  <label style={{ fontSize: 13, marginBottom: 4, display: "block" }}>Location:</label>
                  <input
                    type="text"
                    value={values["crepitus_location"] || ""}
                    onChange={(e) => onChange("crepitus_location", e.target.value)}
                    placeholder="Specify location"
                    style={{ padding: "6px", border: "1px solid #d1d5db", borderRadius: "4px", width: "200px" }}
                  />
                </div>
              );
            }
          },
          // Voice Sounds: Bronchophony: 2 options → side-by-side
          {
            name: "bronchophony",
            label: "Bronchophony",
            type: "radio",
            position: "side",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Positive", value: "positive" }
            ]
          },
          // Egophony: 2 options → side-by-side
          {
            name: "egophony",
            label: "Egophony",
            type: "radio",
            position: "side",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Positive", value: "positive" }
            ]
          },
          // Whispered pectoriloquy: 2 options → side-by-side
          {
            name: "whispered_pectoriloquy",
            label: "Whispered pectoriloquy",
            type: "radio",
            position: "side",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Positive", value: "positive" }
            ]
          }
        ]
      },

      // ─────────────────────────────────────────────
      // FUNCTIONAL IMPACT (REHAB)
      // ─────────────────────────────────────────────
      {
        title: "FUNCTIONAL IMPACT (REHAB)",
        fields: [
          // Therapy tolerance → radio (5 options, display below)
          {
            name: "therapy_tolerance",
            label: "Therapy Tolerance",
            type: "radio",
            options: [
              { label: "Full", value: "full" },
              { label: "Mild limitation", value: "mild" },
              { label: "Moderate limitation", value: "moderate" },
              { label: "Severe limitation", value: "severe" },
              { label: "Unable", value: "unable" }
            ]
          },
          // ADL impact → radio (5 options, display below)
          {
            name: "adl_impact",
            label: "ADL Impact",
            type: "radio",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Requires pacing", value: "pacing" },
              { label: "Rest breaks", value: "rest_breaks" },
              { label: "Needs oxygen", value: "needs_oxygen" },
              { label: "Dependent — dyspnoea", value: "dependent" }
            ]
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={RESPIRATORY_SCHEMA}
      values={values}
      onChange={onChange}
      layout={layout}
    />
  );
}