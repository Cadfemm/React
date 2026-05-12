import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function CardiacAssessment({ layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const labelStyle = { display: "flex", alignItems: "center", gap: 8, fontSize: 14, marginBottom: 4 };

  const CARDIAC_SCHEMA = {
    title: "Cardiac Focused Assessment",
    sections: [
      // ─────────────────────────────────────────────
      // CARDIAC HISTORY
      // ─────────────────────────────────────────────
      {
        title: "CARDIAC HISTORY",
        fields: [
          {
            // Multiple complaints can coexist → checkbox
            name: "cardiac_complaint",
            label: "Cardiac Complaint (select all that apply)",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none", exclusive: true },
              { label: "Chest pain/pressure", value: "chest_pain" },
              { label: "Palpitations", value: "palpitations" },
              { label: "Shortness of breath", value: "sob" },
              { label: "Orthopnoea", value: "orthopnoea" },
              { label: "PND", value: "pnd" },
              { label: "Dizziness/light-headedness", value: "dizziness" },
              { label: "Syncope", value: "syncope" },
              { label: "Fatigue/exercise intolerance", value: "fatigue" },
              { label: "Peripheral swelling", value: "swelling" }
            ]
          },
          {
            // Other with specify below
            name: "cardiac_complaint_other_custom",
            type: "custom",
            render: ({ values, onChange }) => {
              const checked = values["cardiac_complaint"] || [];
              const toggle = (val) => {
                const next = checked.includes(val)
                  ? checked.filter((v) => v !== val)
                  : [...checked, val];
                onChange("cardiac_complaint", next);
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
                      value={values["cardiac_complaint_other_specify"] || ""}
                      onChange={(e) => onChange("cardiac_complaint_other_specify", e.target.value)}
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
          // Chest Pain: 2 options → side-by-side
          {
            name: "chest_pain_present",
            label: "Chest Pain",
            type: "radio",
            position: "side",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          // Chest pain details - show when Yes is selected
          {
            name: "chest_pain_details",
            type: "custom",
            render: ({ values, onChange }) => {
              if (values["chest_pain_present"] !== "yes") return null;
              
              return (
                <div style={{ marginLeft: 20, padding: "10px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#f9fafb" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Onset</label>
                      {["Sudden", "Gradual"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="chest_pain_onset"
                            checked={values["chest_pain_onset"] === item.toLowerCase()}
                            onChange={() => onChange("chest_pain_onset", item.toLowerCase())}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Character</label>
                      {["Pressure", "Tightness", "Burning", "Sharp", "Crushing"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="chest_pain_character"
                            checked={values["chest_pain_character"] === item.toLowerCase()}
                            onChange={() => onChange("chest_pain_character", item.toLowerCase())}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Location</label>
                      {["Central", "Left-sided", "Right-sided", "Epigastric", "Other"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="chest_pain_location"
                            checked={values["chest_pain_location"] === item.toLowerCase().replace("-", "_")}
                            onChange={() => onChange("chest_pain_location", item.toLowerCase().replace("-", "_"))}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Radiation</label>
                      {["None", "Left arm", "Jaw", "Back", "Shoulder"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="chest_pain_radiation"
                            checked={values["chest_pain_radiation"] === item.toLowerCase().replace(" ", "_")}
                            onChange={() => onChange("chest_pain_radiation", item.toLowerCase().replace(" ", "_"))}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Severity (0-10)</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={values["chest_pain_severity"] || ""}
                        onChange={(e) => onChange("chest_pain_severity", e.target.value)}
                        style={{ width: "100%", padding: "6px", border: "1px solid #d1d5db", borderRadius: "4px" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Duration</label>
                      <input
                        type="text"
                        value={values["chest_pain_duration"] || ""}
                        onChange={(e) => onChange("chest_pain_duration", e.target.value)}
                        placeholder="e.g. 30 minutes"
                        style={{ width: "100%", padding: "6px", border: "1px solid #d1d5db", borderRadius: "4px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Aggravating</label>
                      {["Exertion", "Stress", "Breathing", "Movement", "Meals"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="checkbox"
                            checked={(values["chest_pain_aggravating"] || []).includes(item.toLowerCase())}
                            onChange={() => {
                              const current = values["chest_pain_aggravating"] || [];
                              const next = current.includes(item.toLowerCase())
                                ? current.filter(v => v !== item.toLowerCase())
                                : [...current, item.toLowerCase()];
                              onChange("chest_pain_aggravating", next);
                            }}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Relieving</label>
                      {["Rest", "GTN/Nitroglycerin", "Oxygen", "Medications", "None"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="checkbox"
                            checked={(values["chest_pain_relieving"] || []).includes(item.toLowerCase().replace("/", "_"))}
                            onChange={() => {
                              const current = values["chest_pain_relieving"] || [];
                              const val = item.toLowerCase().replace("/", "_");
                              const next = current.includes(val)
                                ? current.filter(v => v !== val)
                                : [...current, val];
                              onChange("chest_pain_relieving", next);
                            }}
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
          // Dyspnoea (cardiac): 2 options → side-by-side
          {
            name: "dyspnoea_present",
            label: "Dyspnoea (cardiac)",
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
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Onset</label>
                      {["Sudden", "Progressive"].map((item) => (
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

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Orthopnoea</label>
                      {["No", "Yes"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="orthopnoea"
                            checked={values["orthopnoea"] === item.toLowerCase()}
                            onChange={() => onChange("orthopnoea", item.toLowerCase())}
                          />
                          {item}
                        </label>
                      ))}
                      {values["orthopnoea"] === "yes" && (
                        <div style={{ marginTop: 8 }}>
                          <label style={{ fontSize: 13, marginBottom: 4, display: "block" }}>Pillows:</label>
                          <input
                            type="text"
                            value={values["orthopnoea_pillows"] || ""}
                            onChange={(e) => onChange("orthopnoea_pillows", e.target.value)}
                            placeholder="Number of pillows"
                            style={{ width: "100%", padding: "6px", border: "1px solid #d1d5db", borderRadius: "4px" }}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>PND</label>
                      {["No", "Yes"].map((item) => (
                        <label key={item} style={labelStyle}>
                          <input
                            type="radio"
                            name="pnd"
                            checked={values["pnd"] === item.toLowerCase()}
                            onChange={() => onChange("pnd", item.toLowerCase())}
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
          // Palpitations: 6 options → display below
          {
            name: "palpitations",
            label: "Palpitations",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none", exclusive: true },
              { label: "Occasional", value: "occasional" },
              { label: "Frequent", value: "frequent" },
              { label: "With dizziness", value: "with_dizziness" },
              { label: "With chest pain", value: "with_chest_pain" },
              { label: "Irregular heartbeat sensation", value: "irregular" }
            ]
          },
          // Oedema / Fluid Retention
          {
            name: "oedema_location",
            label: "Oedema / Fluid Retention Location",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none", exclusive: true },
              { label: "Ankles", value: "ankles" },
              { label: "Legs", value: "legs" },
              { label: "Abdomen", value: "abdomen" },
              { label: "Facial/periorbital", value: "facial" }
            ]
          },
          // Oedema Onset: 2 options → side-by-side
          {
            name: "oedema_onset",
            label: "Oedema Onset",
            type: "radio",
            position: "side",
            options: [
              { label: "Sudden", value: "sudden" },
              { label: "Gradual", value: "gradual" }
            ]
          },
          // Oedema Worse in evening: 2 options → side-by-side
          {
            name: "oedema_worse_evening",
            label: "Worse in evening?",
            type: "radio",
            position: "side",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          // Syncope / Presyncope
          {
            name: "syncope_presyncope_type",
            label: "Syncope / Presyncope",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Dizziness", value: "dizziness" },
              { label: "Near fainting", value: "near_fainting" },
              { label: "Fainting episodes", value: "fainting" }
            ]
          },
          // Syncope Trigger - show when not None
          {
            name: "syncope_trigger_field",
            type: "custom",
            render: ({ values, onChange }) => {
              if (values["syncope_presyncope_type"] === "none" || !values["syncope_presyncope_type"]) return null;
              return (
                <div style={{ marginLeft: 20, padding: "10px", border: "1px solid #e5e7eb", borderRadius: "6px", background: "#f9fafb" }}>
                  <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, display: "block" }}>Trigger</label>
                  {["Standing", "Exertion", "Postural change", "Unknown"].map((item) => (
                    <label key={item} style={labelStyle}>
                      <input
                        type="radio"
                        name="syncope_trigger"
                        checked={values["syncope_trigger"] === item.toLowerCase().replace(" ", "_")}
                        onChange={() => onChange("syncope_trigger", item.toLowerCase().replace(" ", "_"))}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              );
            }
          },
          // Past Cardiac History: 11 options → display below
          {
            name: "past_cardiac_history",
            label: "Past Cardiac History",
            type: "checkbox-group",
            options: [
              { label: "Hypertension", value: "hypertension" },
              { label: "Coronary artery disease", value: "cad" },
              { label: "Heart failure", value: "heart_failure" },
              { label: "Myocardial infarction", value: "mi" },
              { label: "Valvular disease", value: "valvular" },
              { label: "Arrhythmia", value: "arrhythmia" },
              { label: "Pacemaker/ICD", value: "pacemaker_icd" },
              { label: "Congenital heart disease", value: "congenital" },
              { label: "Cardiac surgery/intervention", value: "surgery" },
              { label: "Stroke/TIA", value: "stroke_tia" },
              { label: "Peripheral vascular disease", value: "pvd" },
              { label: "None", value: "none", exclusive: true }
            ]
          },
          // Cardiac Medications / Devices: 12 options → display below
          {
            name: "cardiac_medications_devices",
            label: "Cardiac Medications / Devices",
            type: "checkbox-group",
            options: [
              { label: "Antihypertensives", value: "antihypertensives" },
              { label: "Antianginals", value: "antianginals" },
              { label: "Anticoagulants", value: "anticoagulants" },
              { label: "Antiplatelets", value: "antiplatelets" },
              { label: "Diuretics", value: "diuretics" },
              { label: "Beta blockers", value: "beta_blockers" },
              { label: "ACE inhibitor/ARB", value: "ace_arb" },
              { label: "Digoxin", value: "digoxin" },
              { label: "Pacemaker", value: "pacemaker" },
              { label: "ICD", value: "icd" },
              { label: "LifeVest", value: "lifevest" },
              { label: "None", value: "none", exclusive: true }
            ]
          },
          // Functional Cardiac Status: 6 options → display below
          {
            name: "functional_cardiac_status",
            label: "Functional Cardiac Status (Rehab)",
            type: "radio",
            options: [
              { label: "Independent ADLs without limitation", value: "independent" },
              { label: "Fatigue with minimal exertion", value: "fatigue_minimal" },
              { label: "Dyspnoea with exertion", value: "dyspnoea_exertion" },
              { label: "Requires rest breaks", value: "rest_breaks" },
              { label: "Requires oxygen with activity", value: "oxygen_activity" },
              { label: "Unable to tolerate activity", value: "unable" }
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
          // Cardiac Rhythm: 9 options → display below
          {
            name: "cardiac_rhythm",
            label: "Cardiac Rhythm",
            type: "radio",
            options: [
              { label: "Sinus rhythm", value: "sinus" },
              { label: "Sinus bradycardia", value: "sinus_brady" },
              { label: "Sinus tachycardia", value: "sinus_tachy" },
              { label: "Atrial fibrillation/flutter", value: "af_flutter" },
              { label: "SVT", value: "svt" },
              { label: "VT", value: "vt" },
              { label: "PVCs", value: "pvcs" },
              { label: "Paced rhythm", value: "paced" },
              { label: "Other", value: "other" }
            ]
          },
          // Other rhythm specify
          {
            name: "cardiac_rhythm_other_field",
            type: "custom",
            render: ({ values, onChange }) => {
              if (values["cardiac_rhythm"] !== "other") return null;
              return (
                <div style={{ marginTop: 8 }}>
                  <label style={{ fontSize: 13, marginBottom: 4, display: "block" }}>Specify:</label>
                  <input
                    type="text"
                    value={values["cardiac_rhythm_other_specify"] || ""}
                    onChange={(e) => onChange("cardiac_rhythm_other_specify", e.target.value)}
                    placeholder="Specify other rhythm"
                    style={{ padding: "6px", border: "1px solid #d1d5db", borderRadius: "4px", width: "200px" }}
                  />
                </div>
              );
            }
          },
          // Rate and Regularity
          {
            name: "cardiac_rate_bpm",
            label: "Rate (bpm)",
            type: "input"
          },
          // Regularity: 2 options → side-by-side
          {
            name: "cardiac_regularity",
            label: "Regularity",
            type: "radio",
            position: "side",
            options: [
              { label: "Regular", value: "regular" },
              { label: "Irregular", value: "irregular" }
            ]
          },
          // Vital Signs
          {
            name: "vital_bp",
            label: "BP (mmHg)",
            type: "input"
          },
          {
            name: "vital_hr",
            label: "HR (bpm)",
            type: "input"
          },
          {
            name: "vital_rr",
            label: "RR (/min)",
            type: "input"
          },
          {
            name: "vital_spo2",
            label: "SpO₂ (%)",
            type: "input"
          },
          {
            name: "vital_temp",
            label: "Temp (°C/°F)",
            type: "input"
          },
          {
            name: "vital_recorded_at",
            label: "Recorded at",
            type: "input"
          },
          // Vital Trend: 3 options → side-by-side
          {
            name: "vital_trend",
            label: "Trend",
            type: "radio",
            position: "side",
            options: [
              { label: "Stable", value: "stable" },
              { label: "Improving", value: "improving" },
              { label: "Worsening", value: "worsening" }
            ]
          },
          // General Appearance: 7 options → display below
          {
            name: "general_appearance",
            label: "General Appearance",
            type: "checkbox-group",
            options: [
              { label: "Comfortable at rest", value: "comfortable" },
              { label: "Dyspnoeic at rest", value: "dyspnoeic" },
              { label: "Diaphoretic", value: "diaphoretic" },
              { label: "Pale/ashen", value: "pale" },
              { label: "Cyanotic", value: "cyanotic" },
              { label: "Anxious", value: "anxious" },
              { label: "Altered sensorium", value: "altered" }
            ]
          },
          // Neurological Screening
          {
            name: "neuro_orientation",
            label: "Orientation",
            type: "checkbox-group",
            options: [
              { label: "Person", value: "person" },
              { label: "Place", value: "place" },
              { label: "Time", value: "time" },
              { label: "Situation", value: "situation" }
            ]
          },
          // Speech: 3 options → side-by-side
          {
            name: "neuro_speech",
            label: "Speech",
            type: "radio",
            position: "side",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Slurred", value: "slurred" },
              { label: "Garbled", value: "garbled" }
            ]
          },
          // Facial symmetry: 2 options → side-by-side
          {
            name: "neuro_facial_symmetry",
            label: "Facial symmetry",
            type: "radio",
            position: "side",
            options: [
              { label: "Symmetric", value: "symmetric" },
              { label: "Asymmetric — facial droop", value: "asymmetric_droop" }
            ]
          },
          // Visual fields: 2 options → side-by-side
          {
            name: "neuro_visual_fields",
            label: "Visual fields",
            type: "radio",
            position: "side",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Deficit", value: "deficit" }
            ]
          },
          // Respiratory Status
          {
            name: "resp_breathing",
            label: "Breathing",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Laboured", value: "laboured" },
              { label: "Tachypnoea", value: "tachypnoea" },
              { label: "Accessory muscle use", value: "accessory" }
            ]
          },
          // Lung sounds: 5 options → display below
          {
            name: "resp_lung_sounds",
            label: "Lung sounds",
            type: "radio",
            options: [
              { label: "Clear bilaterally", value: "clear" },
              { label: "Crackles", value: "crackles" },
              { label: "Wheezes", value: "wheezes" },
              { label: "Diminished", value: "diminished" },
              { label: "Rhonchi", value: "rhonchi" }
            ]
          },
          // O₂ device: 6 options → display below
          {
            name: "resp_o2_device",
            label: "O₂ device",
            type: "radio",
            options: [
              { label: "Room air", value: "room_air" },
              { label: "Nasal cannula", value: "nasal_cannula" },
              { label: "Simple mask", value: "simple_mask" },
              { label: "HFNC", value: "hfnc" },
              { label: "CPAP/BiPAP", value: "cpap_bipap" },
              { label: "Mechanical ventilation", value: "mech_vent" }
            ]
          },
          {
            name: "resp_flow_rate",
            label: "Flow rate (L/min)",
            type: "input"
          },
          // Heart sounds: 5 options → display below
          {
            name: "cardiac_heart_sounds",
            label: "Heart sounds",
            type: "radio",
            options: [
              { label: "S1 S2 normal", value: "s1_s2_normal" },
              { label: "Murmur", value: "murmur" },
              { label: "S3", value: "s3" },
              { label: "S4", value: "s4" },
              { label: "Pericardial friction rub", value: "pericardial_rub" }
            ]
          },
          // PMI: 3 options → side-by-side
          {
            name: "cardiac_pmi",
            label: "PMI",
            type: "radio",
            position: "side",
            options: [
              { label: "Normal location", value: "normal" },
              { label: "Displaced", value: "displaced" },
              { label: "Not palpable", value: "not_palpable" }
            ]
          },
          // Radial pulse: 7 options → display below
          {
            name: "radial_pulse",
            label: "Radial pulse",
            type: "radio",
            options: [
              { label: "0", value: "0" },
              { label: "1+", value: "1_plus" },
              { label: "2+ (normal)", value: "2_plus" },
              { label: "3+", value: "3_plus" },
              { label: "4+", value: "4_plus" },
              { label: "Equal bilaterally", value: "equal" },
              { label: "Unequal", value: "unequal" }
            ]
          },
          // Pedal pulse: 3 options → side-by-side
          {
            name: "pedal_pulse",
            label: "Pedal pulse (DP/PT)",
            type: "radio",
            position: "side",
            options: [
              { label: "Palpable", value: "palpable" },
              { label: "Doppler required", value: "doppler" },
              { label: "Absent", value: "absent" }
            ]
          },
          // Capillary refill: 2 options → side-by-side
          {
            name: "capillary_refill",
            label: "Capillary refill",
            type: "radio",
            position: "side",
            options: [
              { label: "≤2 seconds (normal)", value: "normal" },
              { label: ">2 seconds (impaired)", value: "delayed" }
            ]
          },
          // Oedema Grade: 5 options → display below
          {
            name: "oedema_grade",
            label: "Oedema Grade",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "1+", value: "1_plus" },
              { label: "2+", value: "2_plus" },
              { label: "3+", value: "3_plus" },
              { label: "4+", value: "4_plus" }
            ]
          },
          // Oedema Location: 5 options → display below
          {
            name: "oedema_exam_location",
            label: "Oedema Location",
            type: "checkbox-group",
            options: [
              { label: "Ankles", value: "ankles" },
              { label: "Legs", value: "legs" },
              { label: "Sacrum", value: "sacrum" },
              { label: "Hands", value: "hands" },
              { label: "Generalised", value: "generalised" }
            ]
          },
          // IV site: 4 options → side-by-side
          {
            name: "iv_site",
            label: "IV site",
            type: "radio",
            position: "side",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Redness/swelling", value: "redness_swelling" },
              { label: "Leakage", value: "leakage" }
            ]
          },
          // Lines/devices: 8 options → display below
          {
            name: "lines_devices",
            label: "Lines/devices",
            type: "checkbox-group",
            options: [
              { label: "Peripheral IV", value: "peripheral_iv" },
              { label: "Central line", value: "central_line" },
              { label: "Arterial line", value: "arterial_line" },
              { label: "Chest tube", value: "chest_tube" },
              { label: "Dialysis catheter", value: "dialysis_cath" },
              { label: "Feeding tube", value: "feeding_tube" },
              { label: "Pacemaker/ICD", value: "pacemaker_icd" },
              { label: "None", value: "none", exclusive: true }
            ]
          }
        ]
      },

      // ─────────────────────────────────────────────
      // FUNCTIONAL IMPACT (REHAB)
      // ─────────────────────────────────────────────
      // {
      //   title: "FUNCTIONAL IMPACT (REHAB)",
      //   fields: [
      //     // Activity tolerance → radio (5 options, display below)
      //     {
      //       name: "activity_tolerance",
      //       label: "Activity Tolerance",
      //       type: "radio",
      //       options: [
      //         { label: "Full", value: "full" },
      //         { label: "Mild limitation", value: "mild" },
      //         { label: "Moderate limitation", value: "moderate" },
      //         { label: "Severe", value: "severe" },
      //         { label: "Unable", value: "unable" }
      //       ]
      //     },
      //     // ADL performance → radio (5 options, display below)
      //     {
      //       name: "adl_performance",
      //       label: "ADL Performance",
      //       type: "radio",
      //       options: [
      //         { label: "Independent", value: "independent" },
      //         { label: "Pacing required", value: "pacing" },
      //         { label: "Rest breaks", value: "rest_breaks" },
      //         { label: "Assistance needed", value: "assistance" },
      //         { label: "Dependent", value: "dependent" }
      //       ]
      //     }
      //   ]
      // }
    ]
  };

  return (
    <CommonFormBuilder
      schema={CARDIAC_SCHEMA}
      values={values}
      onChange={onChange}
      layout={layout}
    />
  );
}