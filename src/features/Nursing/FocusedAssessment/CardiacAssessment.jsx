import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function CardiacAssessment({ layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const CARDIAC_SCHEMA = {
    title: "Focussed Cardiac Assessment",
    sections: [
      // ═══════════════════════════════════════════════════════════════
      // SECTION 1 — SUBJECTIVE
      // ═══════════════════════════════════════════════════════════════
      {
        title: "Subjective",
        fields: [
          {
            name: "card_complaints",
            label: "1. Current Cardiac Complaints",
            type: "checkbox-group",
            options: [
              { label: "Chest pain/pressure", value: "chest_pain" },
              { label: "Palpitations", value: "palpitations" },
              { label: "Shortness of breath", value: "sob" },
              { label: "Orthopnea", value: "orthopnea" },
              { label: "Paroxysmal nocturnal dyspnea", value: "pnd" },
              { label: "Dizziness/light-headedness", value: "dizziness" },
              { label: "Syncope", value: "syncope" },
              { label: "Fatigue/exercise intolerance", value: "fatigue" },
              { label: "Peripheral swelling", value: "peripheral_swelling" },
              { label: "Other", value: "other" }
            ]
          },
          {
            name: "card_complaints_other_specify",
            label: "Other — Specify",
            type: "input",
            showIf: { field: "card_complaints", includes: "other" }
          },
          // ─── 2. Chest Pain ───
          {
            name: "card_chest_pain_present",
            label: "2. Chest Pain — Chest pain present?",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "card_chest_pain_onset",
            label: "Onset",
            type: "radio",
            showIf: { field: "card_chest_pain_present", equals: "yes" },
            options: [
              { label: "Sudden", value: "sudden" },
              { label: "Gradual", value: "gradual" }
            ]
          },
          {
            name: "card_chest_pain_location",
            label: "Location",
            type: "radio",
            showIf: { field: "card_chest_pain_present", equals: "yes" },
            options: [
              { label: "Central", value: "central" },
              { label: "Left-sided", value: "left" },
              { label: "Right-sided", value: "right" },
              { label: "Epigastric", value: "epigastric" },
              { label: "Other", value: "other" }
            ]
          },
          {
            name: "card_chest_pain_radiation",
            label: "Radiation",
            type: "radio",
            showIf: { field: "card_chest_pain_present", equals: "yes" },
            options: [
              { label: "None", value: "none" },
              { label: "Left arm", value: "left_arm" },
              { label: "Jaw", value: "jaw" },
              { label: "Back", value: "back" },
              { label: "Shoulder", value: "shoulder" }
            ]
          },
          {
            name: "card_chest_pain_character",
            label: "Character",
            type: "radio",
            showIf: { field: "card_chest_pain_present", equals: "yes" },
            options: [
              { label: "Pressure", value: "pressure" },
              { label: "Tightness", value: "tightness" },
              { label: "Burning", value: "burning" },
              { label: "Sharp", value: "sharp" },
              { label: "Crushing", value: "crushing" }
            ]
          },
          {
            name: "card_chest_pain_severity",
            label: "Severity (0–10)",
            type: "scale-slider",
            min: 0,
            max: 10,
            step: 1,
            showValue: true,
            showIf: { field: "card_chest_pain_present", equals: "yes" }
          },
          {
            name: "card_chest_pain_duration",
            label: "Duration",
            type: "input",
            showIf: { field: "card_chest_pain_present", equals: "yes" }
          },
          {
            name: "card_chest_pain_aggravating",
            label: "Aggravating factors",
            type: "radio",
            showIf: { field: "card_chest_pain_present", equals: "yes" },
            options: [
              { label: "Exertion", value: "exertion" },
              { label: "Stress", value: "stress" },
              { label: "Breathing", value: "breathing" },
              { label: "Movement", value: "movement" },
              { label: "Meals", value: "meals" }
            ]
          },
          {
            name: "card_chest_pain_relieving",
            label: "Relieving factors",
            type: "radio",
            showIf: { field: "card_chest_pain_present", equals: "yes" },
            options: [
              { label: "Rest", value: "rest" },
              { label: "Nitroglycerin", value: "nitroglycerin" },
              { label: "Oxygen", value: "oxygen" },
              { label: "Medications", value: "medications" },
              { label: "None", value: "none" }
            ]
          },
          // ─── 3. Dyspnea ───
          {
            name: "card_dyspnea_present",
            label: "3. Dyspnea",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "card_dyspnea_occurs",
            label: "Occurs",
            type: "radio",
            showIf: { field: "card_dyspnea_present", equals: "yes" },
            options: [
              { label: "At rest", value: "at_rest" },
              { label: "With exertion", value: "with_exertion" },
              { label: "Nocturnal", value: "nocturnal" }
            ]
          },
          {
            name: "card_dyspnea_onset",
            label: "Onset",
            type: "radio",
            showIf: { field: "card_dyspnea_present", equals: "yes" },
            options: [
              { label: "Sudden", value: "sudden" },
              { label: "Progressive", value: "progressive" }
            ]
          },
          {
            name: "card_dyspnea_orthopnea",
            label: "Orthopnea",
            type: "radio",
            showIf: { field: "card_dyspnea_present", equals: "yes" },
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "card_dyspnea_orthopnea_pillows",
            label: "Pillows used",
            type: "input",
            showIf: { field: "card_dyspnea_orthopnea", equals: "yes" }
          },
          {
            name: "card_dyspnea_pnd",
            label: "Paroxysmal nocturnal dyspnea",
            type: "radio",
            showIf: { field: "card_dyspnea_present", equals: "yes" },
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "card_dyspnea_severity",
            label: "Severity (0–10)",
            type: "scale-slider",
            min: 0,
            max: 10,
            step: 1,
            showValue: true,
            showIf: { field: "card_dyspnea_present", equals: "yes" }
          },
          // ─── 4. Palpitations ───
          {
            name: "card_palpitations",
            label: "4. Palpitations",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none" },
              { label: "Occasional", value: "occasional" },
              { label: "Frequent", value: "frequent" },
              { label: "With dizziness", value: "with_dizziness" },
              { label: "With chest pain", value: "with_chest_pain" },
              { label: "Irregular heartbeat sensation", value: "irregular" }
            ]
          },
          // ─── 5. Edema / Fluid Retention ───
          {
            name: "card_edema_fluid",
            label: "5. Edema / Fluid Retention",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none" },
              { label: "Ankles", value: "ankles" },
              { label: "Legs", value: "legs" },
              { label: "Abdomen", value: "abdomen" },
              { label: "Facial/periorbital", value: "facial" }
            ]
          },
          {
            name: "card_edema_onset",
            label: "Onset",
            type: "radio",
            options: [
              { label: "Sudden", value: "sudden" },
              { label: "Gradual", value: "gradual" }
            ]
          },
          {
            name: "card_edema_worse_evening",
            label: "Worse in evening?",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          // ─── 6. Syncope / Presyncope ───
          {
            name: "card_syncope",
            label: "6. Syncope / Presyncope",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Dizziness", value: "dizziness" },
              { label: "Near fainting", value: "near_fainting" },
              { label: "Fainting episodes", value: "fainting" }
            ]
          },
          {
            name: "card_syncope_trigger",
            label: "Trigger",
            type: "radio",
            showIf: { field: "card_syncope", oneOf: ["dizziness", "near_fainting", "fainting"] },
            options: [
              { label: "Standing", value: "standing" },
              { label: "Exertion", value: "exertion" },
              { label: "Postural change", value: "postural" },
              { label: "Unknown", value: "unknown" }
            ]
          },
          // ─── 7. Past Cardiac History ───
          {
            name: "card_past_history",
            label: "7. Past Cardiac History",
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
              { label: "Cardiac surgery/intervention", value: "cardiac_surgery" },
              { label: "Stroke/TIA", value: "stroke_tia" },
              { label: "Peripheral vascular disease", value: "pvd" },
              { label: "None", value: "none" }
            ]
          },
          // ─── 8. Cardiac Medications / Devices ───
          {
            name: "card_medications_devices",
            label: "8. Cardiac Medications / Devices",
            type: "checkbox-group",
            options: [
              { label: "Antihypertensives", value: "antihypertensives" },
              { label: "Antianginals", value: "antianginals" },
              { label: "Anticoagulants", value: "anticoagulants" },
              { label: "Antiplatelets", value: "antiplatelets" },
              { label: "Diuretics", value: "diuretics" },
              { label: "Beta blockers", value: "beta_blockers" },
              { label: "ACE/ARB", value: "ace_arb" },
              { label: "Digoxin", value: "digoxin" },
              { label: "Pacemaker", value: "pacemaker" },
              { label: "ICD", value: "icd" },
              { label: "LifeVest", value: "lifevest" },
              { label: "None", value: "none" }
            ]
          },
          // ─── 9. Functional Cardiac Status ───
          {
            name: "card_functional_status",
            label: "9. Functional Cardiac Status (Rehab)",
            type: "checkbox-group",
            options: [
              { label: "Independent ADLs", value: "independent" },
              { label: "Fatigue with minimal exertion", value: "fatigue_minimal" },
              { label: "Dyspnea with exertion", value: "doe" },
              { label: "Unable to tolerate activity", value: "unable" },
              { label: "Requires rest breaks", value: "rest_breaks" },
              { label: "Requires oxygen with activity", value: "oxygen_activity" }
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
          { type: "subheading", label: "10. Cardiac Rhythm / Monitor" },
          {
            name: "card_rhythm",
            label: "Rhythm",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Sinus rhythm", value: "sinus" },
              { label: "Sinus bradycardia", value: "sinus_brady" },
              { label: "Sinus tachycardia", value: "sinus_tachy" },
              { label: "Atrial fibrillation/flutter", value: "af_flutter" },
              { label: "SVT - Supraventricular Tachycardia", value: "svt" },
              { label: "VT - Ventricular Tachycardia", value: "vt" },
              { label: "PVCs - Premature Ventricular Contractions", value: "pvcs" },
              { label: "Paced rhythm", value: "paced" },
              { label: "Other", value: "other" }
            ]
          },
          {
            name: "card_rhythm_other",
            label: "Other — Specify",
            type: "input",
            showIf: { field: "card_rhythm", equals: "other" }
          },
          {
            name: "card_rate_bpm",
            label: "Rate (bpm)",
            type: "input"
          },
          {
            name: "card_regularity",
            label: "Regularity",
            type: "radio",
            options: [
              { label: "Regular", value: "regular" },
              { label: "Irregular", value: "irregular" }
            ]
          },
          { type: "subheading", label: "11. Vital Signs (include time)" },
          {
            name: "card_vital_time",
            label: "Time recorded",
            type: "input",
            placeholder: "e.g. 14:30"
          },
          {
            name: "card_vital_trend",
            label: "Trend",
            type: "radio",
            options: [
              { label: "Stable", value: "stable" },
              { label: "Improving", value: "improving" },
              { label: "Worsening", value: "worsening" }
            ]
          },
          { type: "subheading", label: "12. General Appearance" },
          {
            name: "card_general_appearance",
            label: "General Appearance",
            type: "checkbox-group",
            options: [
              { label: "Comfortable at rest", value: "comfortable" },
              { label: "Dyspneic at rest", value: "dyspneic" },
              { label: "Diaphoretic", value: "diaphoretic" },
              { label: "Pale/ashen", value: "pale" },
              { label: "Cyanotic", value: "cyanotic" },
              { label: "Anxious", value: "anxious" },
              { label: "Altered sensorium", value: "altered" }
            ]
          },
          { type: "subheading", label: "13. Neurological Status" },
          {
            name: "card_orientation",
            label: "Orientation",
            type: "checkbox-group",
            options: [
              { label: "Person", value: "person" },
              { label: "Place", value: "place" },
              { label: "Time", value: "time" },
              { label: "Situation", value: "situation" }
            ]
          },
          {
            name: "card_speech",
            label: "Speech",
            type: "radio",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Slurred", value: "slurred" },
              { label: "Garbled", value: "garbled" }
            ]
          },
          {
            name: "card_facial_symmetry",
            label: "Facial symmetry",
            type: "radio",
            options: [
              { label: "Symmetric", value: "symmetric" },
              { label: "Asymmetric", value: "asymmetric" }
            ]
          },
          {
            name: "card_visual_fields",
            label: "Visual fields",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Deficit", value: "deficit" }
            ]
          },
          {
            name: "card_pupils",
            label: "Pupils",
            type: "radio",
            options: [
              { label: "Equal/reactive", value: "equal_reactive" },
              { label: "Unequal", value: "unequal" },
              { label: "Non-reactive", value: "non_reactive" }
            ]
          },
          { type: "subheading", label: "14. Respiratory Status" },
          {
            name: "card_breathing_pattern",
            label: "Breathing pattern",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Labored", value: "labored" },
              { label: "Tachypnea", value: "tachypnea" },
              { label: "Accessory muscle use", value: "accessory" }
            ]
          },
          {
            name: "card_lung_sounds",
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
          {
            name: "card_oxygen_device",
            label: "Oxygen device",
            type: "radio",
            labelAbove: true,
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
            name: "card_flow_rate",
            label: "Flow rate (L/min)",
            type: "input"
          },
          { type: "subheading", label: "15. Cardiac Auscultation" },
          {
            name: "card_heart_sounds",
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
          {
            name: "card_pmi",
            label: "PMI",
            type: "radio",
            options: [
              { label: "Normal location", value: "normal" },
              { label: "Displaced", value: "displaced" },
              { label: "Not palpable", value: "not_palpable" }
            ]
          },
          { type: "subheading", label: "16. Peripheral Pulses" },
          {
            name: "card_radial_pulses",
            label: "Radial pulses",
            type: "radio",
            options: [
              { label: "0", value: "0" },
              { label: "1+", value: "1" },
              { label: "2+", value: "2" },
              { label: "3+", value: "3" },
              { label: "4+", value: "4" },
              { label: "Equal bilaterally", value: "equal" },
              { label: "Unequal", value: "unequal" }
            ]
          },
          {
            name: "card_pedal_pulses",
            label: "Pedal pulses (DP/PT)",
            type: "radio",
            options: [
              { label: "Palpable", value: "palpable" },
              { label: "Doppler required", value: "doppler" },
              { label: "Absent", value: "absent" }
            ]
          },
          { type: "subheading", label: "17. Capillary Refill" },
          {
            name: "card_cap_refill",
            label: "Capillary Refill",
            type: "radio",
            options: [
              { label: "≤ 2 seconds", value: "normal" },
              { label: "> 2 seconds", value: "delayed" }
            ]
          },
          { type: "subheading", label: "18. Edema" },
          {
            name: "card_edema_grade",
            label: "Edema",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "1+", value: "1" },
              { label: "2+", value: "2" },
              { label: "3+", value: "3" },
              { label: "4+", value: "4" }
            ]
          },
          {
            name: "card_edema_location",
            label: "Location",
            type: "checkbox-group",
            options: [
              { label: "Ankles", value: "ankles" },
              { label: "Legs", value: "legs" },
              { label: "Sacrum", value: "sacrum" },
              { label: "Hands", value: "hands" },
              { label: "Generalized", value: "generalized" }
            ]
          },
          { type: "subheading", label: "19. Skin Integrity / Lines & Devices" },
          {
            name: "card_skin",
            label: "Skin",
            type: "radio",
            options: [
              { label: "Warm/dry", value: "warm_dry" },
              { label: "Cool/clammy", value: "cool_clammy" },
              { label: "Pale", value: "pale" },
              { label: "Cyanotic", value: "cyanotic" },
              { label: "Diaphoretic", value: "diaphoretic" }
            ]
          },
          {
            name: "card_iv_sites",
            label: "IV sites",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Redness", value: "redness" },
              { label: "Swelling", value: "swelling" },
              { label: "Leakage", value: "leakage" }
            ]
          },
          {
            name: "card_lines_devices",
            label: "Lines/devices present",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Peripheral IV", value: "peripheral_iv" },
              { label: "Central line", value: "central_line" },
              { label: "Arterial line", value: "arterial_line" },
              { label: "Chest tube", value: "chest_tube" },
              { label: "Dialysis catheter", value: "dialysis_cath" },
              { label: "Feeding tube", value: "feeding_tube" },
              { label: "Pacemaker/ICD", value: "pacemaker_icd" },
              { label: "None", value: "none" }
            ]
          },
          { type: "subheading", label: "20. Abdomen" },
          {
            name: "card_bowel_sounds",
            label: "Bowel sounds",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Hypoactive", value: "hypoactive" },
              { label: "Hyperactive", value: "hyperactive" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "card_distension",
            label: "Distension",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Mild", value: "mild" },
              { label: "Moderate", value: "moderate" },
              { label: "Severe", value: "severe" }
            ]
          },
          {
            name: "card_tenderness",
            label: "Tenderness",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Present", value: "present" }
            ]
          },
          { type: "subheading", label: "21. Musculoskeletal / Motor" },
          {
            name: "card_ue_strength",
            label: "Upper extremity strength",
            type: "radio",
            options: [
              { label: "Equal", value: "equal" },
              { label: "Unequal", value: "unequal" },
              { label: "Weak", value: "weak" }
            ]
          },
          {
            name: "card_le_strength",
            label: "Lower extremity strength",
            type: "radio",
            options: [
              { label: "Equal", value: "equal" },
              { label: "Unequal", value: "unequal" },
              { label: "Weak", value: "weak" }
            ]
          },
          {
            name: "card_sensation",
            label: "Sensation",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Numbness", value: "numbness" },
              { label: "Tingling", value: "tingling" }
            ]
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // SECTION 3 — FUNCTIONAL IMPACT (REHAB)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SECTION 3 — FUNCTIONAL IMPACT (REHAB)",
        fields: [
          {
            name: "card_activity_tolerance",
            label: "22. Activity Tolerance",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Full tolerance", value: "full" },
              { label: "Mild limitation", value: "mild" },
              { label: "Moderate limitation", value: "moderate" },
              { label: "Severe limitation", value: "severe" },
              { label: "Unable to participate", value: "unable" }
            ]
          },
          {
            name: "card_adl_performance",
            label: "23. ADL Performance",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Independent", value: "independent" },
              { label: "Requires pacing", value: "pacing" },
              { label: "Requires rest breaks", value: "rest_breaks" },
              { label: "Requires assistance", value: "assistance" },
              { label: "Dependent", value: "dependent" }
            ]
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // SECTION 4 — RED FLAGS
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SECTION 4 — RED FLAGS (Auto-Alert)",
        fields: [
          {
            name: "card_red_flags",
            label: "Red flags (select all that apply)",
            type: "checkbox-group",
            options: [
              { label: "Chest pain unrelieved by rest/Nitroglycerin", value: "chest_pain_unrelieved" },
              { label: "New malignant arrhythmia", value: "malignant_arrhythmia" },
              { label: "HR <40 or >130", value: "hr_abnormal" },
              { label: "SBP <90 or >180", value: "sbp_abnormal" },
              { label: "SpO₂ <90%", value: "spo2_low" },
              { label: "Acute pulmonary edema", value: "pulmonary_edema" },
              { label: "Syncope", value: "syncope" },
              { label: "New focal neurological deficit", value: "neuro_deficit" },
              { label: "Sudden unequal pulses", value: "unequal_pulses" }
            ]
          }
        ]
      }
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
