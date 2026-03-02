import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const VOICE_OPTIONS = [
  { label: "Normal", value: "normal" },
  { label: "Positive", value: "positive" }
];

export default function RespiratoryAssessment({ layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Pack-years = packs/day × years (when both present); clear when either is empty
  useEffect(() => {
    const packs = parseFloat(values.resp_smoking_packs_per_day, 10);
    const years = parseFloat(values.resp_smoking_years, 10);
    const next = Number.isFinite(packs) && Number.isFinite(years)
      ? String(packs * years)
      : "";
    setValues((prev) => (prev.resp_smoking_pack_years === next ? prev : { ...prev, resp_smoking_pack_years: next }));
  }, [values.resp_smoking_packs_per_day, values.resp_smoking_years]);

  const RESPIRATORY_SCHEMA = {
    title: "Respiratory Assessment",
    sections: [
      // ═══════════════════════════════════════════════════════════════
      // SECTION 1 — SUBJECTIVE
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SECTION 1 — SUBJECTIVE (Patient Reported)",
        fields: [
          {
            name: "resp_complaint",
            label: "1. Current Respiratory Complaint",
            type: "checkbox-group",
            options: [
              { label: "Shortness of breath", value: "shortness_of_breath" },
              { label: "Cough", value: "cough" },
              { label: "Frank hemoptysis (if selected, must go to doctor)", value: "frank_hemoptysis" },
              { label: "Wheeze", value: "wheeze" },
              { label: "Chest tightness", value: "chest_tightness" },
              { label: "Chest pain on breathing", value: "chest_pain_breathing" },
              { label: "Fatigue on exertion", value: "fatigue_exertion" },
              { label: "Fever", value: "fever" },
              { label: "Recent Respiratory infection", value: "recent_resp_infection" },
              { label: "Other", value: "other" }
            ]
          },
          {
            type: "info-text",
            text: "⚠ If Frank hemoptysis was selected, patient must go to doctor.",
            showIf: { field: "resp_complaint", includes: "frank_hemoptysis" }
          },
          {
            name: "resp_complaint_other_specify",
            label: "Other — Specify",
            type: "input",
            showIf: { field: "resp_complaint", includes: "other" }
          },
          // ─── 2. Dyspnea ───
          {
            name: "resp_dyspnea_present",
            label: "2. Dyspnea — Dyspnea present?",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "resp_dyspnea_onset",
            label: "Onset",
            type: "radio",
            showIf: { field: "resp_dyspnea_present", equals: "yes" },
            options: [
              { label: "Sudden", value: "sudden" },
              { label: "Gradual", value: "gradual" },
              { label: "Unknown", value: "unknown" }
            ]
          },
          {
            name: "resp_dyspnea_occurs",
            label: "Occurs",
            type: "radio",
            showIf: { field: "resp_dyspnea_present", equals: "yes" },
            options: [
              { label: "At rest", value: "at_rest" },
              { label: "With exertion", value: "with_exertion" },
              { label: "At night", value: "at_night" }
            ]
          },
          {
            name: "resp_dyspnea_severity",
            label: "Severity (0–10)",
            type: "scale-slider",
            min: 0,
            max: 10,
            step: 1,
            showValue: true,
            showIf: { field: "resp_dyspnea_present", equals: "yes" }
          },
          {
            name: "resp_orthopnea",
            label: "Orthopnea",
            type: "radio",
            showIf: { field: "resp_dyspnea_present", equals: "yes" },
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "resp_orthopnea_pillows",
            label: "Pillows used",
            type: "input",
            showIf: { field: "resp_orthopnea", equals: "yes" }
          },
          {
            name: "resp_pnd",
            label: "Paroxysmal nocturnal Dyspnea",
            type: "radio",
            showIf: { field: "resp_dyspnea_present", equals: "yes" },
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          // ─── 3. Cough ───
          { type: "subheading", label: "3. Cough" },
          {
            name: "resp_cough_present",
            label: "Cough present?",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "resp_cough_duration",
            label: "Duration",
            type: "radio",
            showIf: { field: "resp_cough_present", equals: "yes" },
            options: [
              { label: "Acute (<3 weeks)", value: "acute" },
              { label: "Subacute (3–8 weeks)", value: "subacute" },
              { label: "Chronic (>8 weeks)", value: "chronic" }
            ]
          },
          {
            name: "resp_cough_timing",
            label: "Timing",
            type: "radio",
            showIf: { field: "resp_cough_present", equals: "yes" },
            options: [
              { label: "Morning", value: "morning" },
              { label: "Night", value: "night" },
              { label: "Continuous", value: "continuous" },
              { label: "Intermittent", value: "intermittent" }
            ]
          },
          {
            name: "resp_cough_character",
            label: "Character",
            type: "radio",
            showIf: { field: "resp_cough_present", equals: "yes" },
            options: [
              { label: "Dry", value: "dry" },
              { label: "Productive", value: "productive" }
            ]
          },
          // ─── 4. Sputum ───
          { type: "subheading", label: "4. Sputum (If Productive)" },
          {
            name: "resp_sputum_amount",
            label: "Amount",
            type: "radio",
            options: [
              { label: "Scant", value: "scant" },
              { label: "Small", value: "small" },
              { label: "Moderate", value: "moderate" },
              { label: "Large", value: "large" }
            ]
          },
          {
            name: "resp_sputum_color",
            label: "Color",
            type: "radio",
            options: [
              { label: "Clear", value: "clear" },
              { label: "White", value: "white" },
              { label: "Yellow", value: "yellow" },
              { label: "Green", value: "green" },
              { label: "Blood-tinged", value: "blood_tinged" },
              { label: "Rust-colored", value: "rust" },
              { label: "Black", value: "black" }
            ]
          },
          {
            name: "resp_sputum_odor",
            label: "Odor",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Foul", value: "foul" }
            ]
          },
          {
            name: "resp_sputum_consistency",
            label: "Consistency",
            type: "radio",
            options: [
              { label: "Thin", value: "thin" },
              { label: "Thick", value: "thick" }
            ]
          },
          // ─── 5. Smoking / Exposure ───
          { type: "subheading", label: "5. Smoking / Exposure" },
          {
            name: "resp_smoking_status",
            label: "Smoking status",
            type: "radio",
            options: [
              { label: "Never", value: "never" },
              { label: "Former", value: "former" },
              { label: "Current", value: "current" }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "resp_smoking_packs_per_day",
                label: "Packs/day",
                type: "input",
                showIf: { field: "resp_smoking_status", oneOf: ["former", "current"] }
              },
              {
                name: "resp_smoking_years",
                label: "Years",
                type: "input",
                showIf: { field: "resp_smoking_status", oneOf: ["former", "current"] }
              }
            ]
          },
          {
            name: "resp_smoking_pack_years",
            label: "Pack-years (auto-calculated)",
            type: "input",
            readOnly: true,
            showIf: { field: "resp_smoking_status", oneOf: ["former", "current"] }
          },
          {
            name: "resp_environmental_exposure",
            label: "Environmental exposure",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Second-hand smoke", value: "second_hand_smoke" },
              { label: "Occupational dust/chemicals", value: "occupational" },
              { label: "Biomass fuel exposure", value: "biomass" },
              { label: "None", value: "none" }
            ]
          },
          // ─── 6. Past Respiratory History ───
          {
            name: "resp_past_history",
            label: "6. Past Respiratory History",
            type: "checkbox-group",
            options: [
              { label: "Asthma", value: "asthma" },
              { label: "COPD", value: "copd" },
              { label: "Tuberculosis", value: "tb" },
              { label: "Pneumonia (recurrent)", value: "pneumonia" },
              { label: "Pulmonary embolism", value: "pe" },
              { label: "Lung cancer", value: "lung_cancer" },
              { label: "Obstructive sleep apnea", value: "osa" },
              { label: "COVID-related lung disease", value: "covid_lung" },
              { label: "Mechanical ventilation history", value: "mech_vent" },
              { label: "Chest trauma/surgery", value: "chest_trauma" },
              { label: "None", value: "none" }
            ]
          },
          // ─── 7. Current Respiratory Treatments ───
          {
            name: "resp_current_treatments",
            label: "7. Current Respiratory Treatments",
            type: "checkbox-group",
            options: [
              { label: "Inhalers", value: "inhalers" },
              { label: "Nebulizers", value: "nebulizers" },
              { label: "Oxygen therapy", value: "oxygen" },
              { label: "Steroids", value: "steroids" },
              { label: "Antibiotics", value: "antibiotics" },
              { label: "CPAP/BiPAP", value: "cpap_bipap" },
              { label: "None", value: "none" }
            ]
          },
          // ─── 8. Functional Respiratory Status ───
          {
            name: "resp_functional_status",
            label: "8. Functional Respiratory Status",
            type: "checkbox-group",
            options: [
              { label: "Speaks full sentences without breathlessness", value: "full_sentences" },
              { label: "Dyspnea on exertion", value: "doe" },
              { label: "Dyspnea at rest", value: "dor" },
              { label: "Requires rest breaks", value: "rest_breaks" },
              { label: "Requires oxygen during activity", value: "oxygen_activity" },
              { label: "Unable to tolerate therapy due to breathlessness", value: "unable_therapy" }
            ]
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // SECTION 2 — OBJECTIVE
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SECTION 2 — OBJECTIVE (Clinician Observed)",
        fields: [
          { type: "subheading", label: "1. General Breathing Pattern" },
          {
            name: "resp_breathing_pattern",
            label: "General Breathing Pattern",
            type: "checkbox-group",
            options: [
              { label: "Normal/easy breathing", value: "normal" },
              { label: "Tachypnea", value: "tachypnea" },
              { label: "Bradypnea", value: "bradypnea" },
              { label: "Labored breathing", value: "labored" },
              { label: "Air hunger", value: "air_hunger" },
              { label: "Pursed-lip breathing", value: "pursed_lip" },
              { label: "Tripod positioning", value: "tripod" },
              { label: "Accessory muscle use", value: "accessory" },
              { label: "Agonal respirations", value: "agonal" }
            ]
          },
          {
            name: "resp_breathing_rate",
            label: "Respiratory rate (breaths/min)",
            type: "input"
          },
          {
            name: "resp_loc",
            label: "3. Level of Consciousness",
            type: "radio",
            options: [
              { label: "Alert", value: "alert" },
              { label: "Restless/agitated", value: "restless" },
              { label: "Drowsy", value: "drowsy" },
              { label: "Obtunded", value: "obtunded" },
              { label: "Unresponsive", value: "unresponsive" }
            ]
          },
          {
            name: "resp_chest_wall_expansion",
            label: "4. Chest Wall & Expansion",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Symmetrical expansion", value: "symmetrical" },
              { label: "Asymmetrical expansion", value: "asymmetrical" },
              { label: "Barrel chest", value: "barrel" },
              { label: "Retractions", value: "retractions" },
              { label: "Flail segment", value: "flail" },
              { label: "Chest deformity", value: "deformity" }
            ]
          },
          {
            name: "resp_airway_secretions",
            label: "5. Airway & Secretions",
            type: "radio",
            options: [
              { label: "Airway patent", value: "patent" },
              { label: "Drooling", value: "drooling" },
              { label: "Audible secretions", value: "audible_secretions" },
              { label: "Gurgling", value: "gurgling" },
              { label: "Stridor", value: "stridor" }
            ]
          },
          {
            name: "resp_skin_perfusion",
            label: "6. Skin & Perfusion",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Normal color", value: "normal" },
              { label: "Central cyanosis", value: "central_cyanosis" },
              { label: "Peripheral cyanosis", value: "peripheral_cyanosis" },
              { label: "Pallor", value: "pallor" },
              { label: "Diaphoresis", value: "diaphoresis" },
              { label: "Clubbing", value: "clubbing" }
            ]
          },
          { type: "subheading", label: "7. Oxygenation" },
          {
            type: "row",
            fields: [
              { name: "resp_ox_spo2", label: "SpO₂ (%)", type: "input" },
              {
                name: "resp_ox_device",
                label: "Oxygen device",
                type: "radio",
                labelAbove: true,
                options: [
                  { label: "Room air", value: "room_air" },
                  { label: "Nasal cannula", value: "nasal_cannula" },
                  { label: "Simple mask", value: "simple_mask" },
                  { label: "Non-rebreather", value: "non_rebreather" },
                  { label: "HFNC", value: "hfnc" },
                  { label: "CPAP/BiPAP", value: "cpap_bipap" },
                  { label: "Mechanical ventilation", value: "mech_vent" }
                ]
              }
            ]
          },
          {
            name: "resp_ox_flow_rate",
            label: "Flow rate (L/min)",
            type: "input"
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // SECTION 3 — AUSCULTATION
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SECTION 3 — AUSCULTATION",
        fields: [
          {
            name: "resp_breath_sounds",
            label: "8. Breath Sounds (Primary)",
            type: "radio",
            options: [
              { label: "Vesicular (normal)", value: "vesicular" },
              { label: "Bronchovesicular", value: "bronchovesicular" },
              { label: "Bronchial", value: "bronchial" },
              { label: "Diminished", value: "diminished" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "resp_breath_sounds_distribution",
            label: "Distribution",
            type: "radio",
            options: [
              { label: "Bilateral", value: "bilateral" },
              { label: "Right sided", value: "right" },
              { label: "Left-sided", value: "left" },
              { label: "Localized", value: "localized" }
            ]
          },
          {
            name: "resp_adventitious",
            label: "9. Adventitious Sounds",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none" },
              { label: "Crackles — Fine", value: "crackles_fine" },
              { label: "Crackles — Coarse", value: "crackles_coarse" },
              { label: "Wheezes — Inspiratory", value: "wheezes_insp" },
              { label: "Wheezes — Expiratory", value: "wheezes_exp" },
              { label: "Rhonchi", value: "rhonchi" },
              { label: "Stridor", value: "stridor" },
              { label: "Pleural friction rub", value: "pleural_rub" }
            ]
          },
          {
            name: "resp_adventitious_location",
            label: "Location(s)",
            type: "input",
            placeholder: "Free text"
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // SECTION 4 — VOICE SOUNDS (radio matrix)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SECTION 4 — VOICE SOUNDS",
        fields: [
          {
            type: "grid-header",
            label: "",
            cols: ["Normal", "Positive"]
          },
          {
            name: "resp_bronchophony",
            label: "Bronchophony",
            type: "radio-matrix",
            options: VOICE_OPTIONS
          },
          {
            name: "resp_egophony",
            label: "Egophony",
            type: "radio-matrix",
            options: VOICE_OPTIONS
          },
          {
            name: "resp_whispered_pectoriloquy",
            label: "Whispered pectoriloquy",
            type: "radio-matrix",
            options: VOICE_OPTIONS
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // SECTION 5 — PALPATION
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SECTION 5 — PALPATION",
        fields: [
          {
            name: "resp_tactile_fremitus",
            label: "10. Tactile Fremitus",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Increased", value: "increased" },
              { label: "Decreased", value: "decreased" }
            ]
          },
          {
            name: "resp_crepitus",
            label: "11. Crepitus",
            type: "radio",
            options: [
              { label: "Absent", value: "absent" },
              { label: "Present", value: "present" }
            ]
          },
          {
            name: "resp_crepitus_location",
            label: "Location (if present)",
            type: "input",
            showIf: { field: "resp_crepitus", equals: "present" }
          },
          {
            name: "resp_chest_expansion_palpation",
            label: "12. Chest Expansion",
            type: "radio",
            options: [
              { label: "Symmetrical", value: "symmetrical" },
              { label: "Asymmetrical", value: "asymmetrical" }
            ]
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // SECTION 6 — FUNCTIONAL IMPACT (REHAB)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SECTION 6 — FUNCTIONAL IMPACT (REHAB)",
        fields: [
          {
            name: "resp_therapy_tolerance",
            label: "13. Therapy Tolerance",
            type: "radio",
            options: [
              { label: "Full tolerance", value: "full" },
              { label: "Mild limitation", value: "mild" },
              { label: "Moderate limitation", value: "moderate" },
              { label: "Severe limitation", value: "severe" },
              { label: "Unable to participate", value: "unable" }
            ]
          },
          {
            name: "resp_adl_impact",
            label: "14. ADL Impact",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Independent", value: "independent" },
              { label: "Requires pacing", value: "pacing" },
              { label: "Requires rest breaks", value: "rest_breaks" },
              { label: "Requires oxygen", value: "oxygen" },
              { label: "Dependent due to dyspnea", value: "dependent" }
            ]
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // SECTION 7 — RED FLAGS
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SECTION 7 — RED FLAGS (Auto-Alert)",
        fields: [
          {
            name: "resp_red_flags",
            label: "Red flags (select all that apply)",
            type: "checkbox-group",
            options: [
              { label: "RR <10 or >30", value: "rr_abnormal" },
              { label: "SpO₂ <90% on oxygen", value: "spo2_low" },
              { label: "Silent chest", value: "silent_chest" },
              { label: "Severe accessory muscle use", value: "severe_accessory" },
              { label: "Stridor", value: "stridor" },
              { label: "Cyanosis", value: "cyanosis" },
              { label: "Altered consciousness", value: "altered_consciousness" },
              { label: "Sudden unilateral absent breath sounds", value: "unilateral_absent" }
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
