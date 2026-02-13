import React, { useEffect, useState, createContext, useContext } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import BarthelIndexForm from "./BarthelIndexForm";
import ADLForm from "./ADLForm";
import PatientHistoryForm from "./PatientHistoryForm";
import MorseFallScaleForm from "./MorseFallScaleForm";
import BradenScaleForm from "./BradenScaleForm";
import WoundTreatmentFlowsheetForm from "./WoundTreatmentFlowsheetForm";
import NumericPainRatingScaleForm from "./NumericPainRatingScaleForm";
import DiabeticFootAssessmentForm from "./DiabeticFootAssessmentForm";

// Create context to pass patient to assessment components
const PatientContext = createContext(null);

// Adapter components that bridge values/onChange to patient/onSubmit/onBack
function BarthelIndexAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`barthel_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <BarthelIndexForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function ADLAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`adl_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <ADLForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function PatientHistoryAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`patient_history_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <PatientHistoryForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function MorseFallScaleAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`morse_fall_scale_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <MorseFallScaleForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function BradenScaleAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`braden_scale_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <BradenScaleForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function WoundTreatmentFlowsheetAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`wound_flowsheet_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <WoundTreatmentFlowsheetForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function NumericPainRatingScaleAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`numeric_pain_scale_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <NumericPainRatingScaleForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function DiabeticFootAssessmentAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`diabetic_foot_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <DiabeticFootAssessmentForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

// Assessment Registry
export const NURSING_ASSESSMENT_REGISTRY = {
  barthel: BarthelIndexAdapter,
  adl: ADLAdapter,
  patient_history: PatientHistoryAdapter,
  morse_fall_scale: MorseFallScaleAdapter,
  braden_scale: BradenScaleAdapter,
  wound_treatment_flowsheet: WoundTreatmentFlowsheetAdapter,
  numeric_pain_rating_scale: NumericPainRatingScaleAdapter,
  diabetic_foot_assessment: DiabeticFootAssessmentAdapter
};

/* ===================== COMPONENT ===================== */

export default function NursingAssessment({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `nursing_assessment_draft_${patient.id}`
    : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const loaded = JSON.parse(saved).values || {};
      const h = parseFloat(loaded.obj_height);
      const w = parseFloat(loaded.obj_weight);
      if (h > 0 && w > 0) loaded.obj_bmi = (w / Math.pow(h / 100, 2)).toFixed(1);
      setValues(loaded);
    }
  }, [storageKey]);

  const onChange = (name, value) => {
    setValues(v => {
      const next = { ...v, [name]: value };
      if (name === "obj_height" || name === "obj_weight") {
        const h = parseFloat(name === "obj_height" ? value : v.obj_height);
        const w = parseFloat(name === "obj_weight" ? value : v.obj_weight);
        if (h > 0 && w > 0) next.obj_bmi = (w / Math.pow(h / 100, 2)).toFixed(1);
      }
      return next;
    });
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();

    if (type === "clear") {
      setValues({});
      setSubmitted(false);
      localStorage.removeItem(storageKey);
    }

    if (type === "save") {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ values, updatedAt: new Date() })
      );
      alert("Nursing draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Nursing assessment submitted");
  };

  /* ===================== SCHEMAS ===================== */

  const YES_NO_OPTIONS = [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }];

  const SUBJECTIVE_SCHEMA = {
    actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
    sections: [
      {
        fields: [
          { name: "chief_complaint", label: "Chief Complaint", type: "input" },
          { name: "history_present_illness", label: "History of Present Illness", type: "input" },
          { type: "subheading", label: "Pain Assessment" },
          { name: "pain_present", label: "Pain present", type: "radio", options: YES_NO_OPTIONS },
          { type: "subheading", label: "Full pain panel (OPQRST)", showIf: { field: "pain_present", equals: "yes" } },
          { type: "row", fields: [
            { name: "pain_onset", label: "O — Onset", type: "date" },
            { name: "pain_provocation", label: "P — Provocation/Palliation", type: "radio", options: [
              { label: "With movement", value: "with_movement" },
              { label: "At rest", value: "at_rest" },
              { label: "Both", value: "both" },
              { label: "Relieved by", value: "relieved_by" }
            ]}
          ], showIf: { field: "pain_present", equals: "yes" } },
          { name: "pain_provocation_relieved_by", label: "Specify relieved by", type: "input", showIf: { field: "pain_provocation", equals: "relieved_by" } },
          { type: "row", fields: [
            { name: "pain_quality", label: "Q — Quality", type: "input" },
            { name: "pain_region", label: "R — Region/Radiation", type: "input" }
          ], showIf: { field: "pain_present", equals: "yes" } },
          { type: "row", fields: [
            { name: "pain_severity_at_rest", label: "S — Severity At rest (0–10)", type: "single-select", options: [0,1,2,3,4,5,6,7,8,9,10].map(n => ({ label: String(n), value: String(n) })) },
            { name: "pain_severity_with_movement", label: "S — Severity With movement (0–10)", type: "single-select", options: [0,1,2,3,4,5,6,7,8,9,10].map(n => ({ label: String(n), value: String(n) })) }
          ], showIf: { field: "pain_present", equals: "yes" }},
          { name: "pain_assessment_form", label: "", type: "assessment-launcher", options: [{ label: "Numeric Rating Scale", value: "numeric_pain_rating_scale" }], showIf: { field: "pain_present", equals: "yes" } },
          { name: "pain_timing", label: "T — Timing", type: "input", showIf: { field: "pain_present", equals: "yes" } },
          { name: "aggravating_factors", label: "Aggravating Factors", type: "radio", options: YES_NO_OPTIONS, showIf: { field: "pain_present", equals: "yes" } },
          { name: "aggravating_factors_detail", label: "Aggravating Factors — Details", type: "input", showIf: { field: "aggravating_factors", equals: "yes" } },
          { name: "relieving_factors", label: "Relieving Factors", type: "radio", options: YES_NO_OPTIONS, showIf: { field: "pain_present", equals: "yes" } },
          { name: "relieving_factors_detail", label: "Relieving Factors — Details", type: "input", showIf: { field: "relieving_factors", equals: "yes" } },
          { name: "pain_type", label: "Pain Type", type: "checkbox-group", options: [
            { label: "Burning", value: "burning" },
            { label: "Tingling", value: "tingling" },
            { label: "Numbness", value: "numbness" },
            { label: "Sharp", value: "sharp" },
            { label: "Cramping", value: "cramping" }
          ], showIf: { field: "pain_present", equals: "yes" }},
          { name: "pain_at_rest_night", label: "Pain at Rest/ Night Pain", type: "radio", options: YES_NO_OPTIONS, showIf: { field: "pain_present", equals: "yes" } },
          { name: "pain_free_text", label: "Specify", type: "textarea", showIf: { field: "pain_present", equals: "yes" } },
          { type: "subheading", label: "Functional Status" },
          { name: "difficulty_mobility_transfers", label: "Difficulty with mobility/transfers", type: "radio", options: YES_NO_OPTIONS },
          { name: "adl_limitations", label: "ADL limitations", type: "radio", options: YES_NO_OPTIONS },
          { name: "sleep_pattern", label: "Sleep pattern", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Disturbed", value: "disturbed" }] },
          { name: "appetite_functional", label: "Appetite", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Decreased", value: "decreased" }, { label: "Increased", value: "increased" }] },
          { name: "fatigue_reduced_endurance", label: "Fatigue/reduced endurance", type: "radio", options: YES_NO_OPTIONS },
          { name: "functional_status_specify", label: "Specify", type: "textarea" }
        ]
      },
      {
        title: "Psychosocial & Emotional Status",
        fields: [
          { name: "mood_emotional_status", label: "Mood/emotional status", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Abnormal", value: "abnormal" }] },
          { name: "anxiety_stress_depression", label: "Anxiety/stress/depression symptoms", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "restlessness_pacing", label: "Restlessness/pacing", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "family_social_support", label: "Family/social support available", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "aggression", label: "Aggression (verbal/physical)", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "hallucinations_delusions", label: "Hallucinations/delusions reported", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "suicidal_ideation", label: "Suicidal ideation/self-harm thoughts", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "psychiatric_diagnosis_history", label: "Current psychiatric diagnosis/history", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "psychiatric_diagnosis_specify", label: "Specify", type: "textarea", showIf: { field: "psychiatric_diagnosis_history", equals: "yes" } },
          { name: "medications_for_behavior", label: "Medications for Behavior", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "psychosocial_specify", label: "Specify", type: "textarea" }
        ]
      },
      {
        title: "Bowel and Bladder",
        fields: [
          { name: "bowel_pattern", label: "Bowel pattern", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Abnormal", value: "abnormal" }] },
          { name: "bladder_pattern", label: "Bladder pattern", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Abnormal", value: "abnormal" }] },
          { name: "incontinence_present", label: "Incontinence present", type: "radio", options: YES_NO_OPTIONS },
          { name: "bowel_bladder_specify", label: "Specify", type: "textarea" }
        ]
      },
      {
        title: "Nutrition & Hydration",
        fields: [
          { name: "appetite_level", label: "Appetite level", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Poor", value: "poor" }, { label: "Increased", value: "increased" }] },
          { name: "dietary_intake_adequate", label: "Dietary intake adequate", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "swallowing_difficulty", label: "Swallowing difficulty", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "daily_fluid_intake_adequate", label: "Daily fluid intake adequate", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "significant_weight_change", label: "Significant weight change in past year", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "weight_change_specify", label: "Specify", type: "textarea", showIf: { field: "significant_weight_change", equals: "yes" } },
          { name: "nutrition_hydration_specify", label: "Specify", type: "textarea" }
        ]
      },
      {
        title: "Safety & Comfort Concerns",
        fields: [
          { name: "history_of_falls", label: "History of falls/near-falls", type: "radio", options: YES_NO_OPTIONS },
          { name: "morse_fall_scale_launcher", label: "", type: "assessment-launcher", options: [{ label: "Morse Fall Scale", value: "morse_fall_scale" }], showIf: { field: "history_of_falls", equals: "yes" } },
          { name: "dizziness_balance_issues", label: "Dizziness/balance issues", type: "radio", options: YES_NO_OPTIONS },
          { type: "subheading", label: "Orthostatic vitals", showIf: { field: "dizziness_balance_issues", equals: "yes" } },
          { type: "row", fields: [
            { name: "ortho_supine_bp", label: "Supine: BP", type: "input" },
            { name: "ortho_supine_hr", label: "Supine: HR", type: "input" }
          ], showIf: { field: "dizziness_balance_issues", equals: "yes" } },
          { type: "row", fields: [
            { name: "ortho_sitting_bp", label: "Sitting: BP", type: "input" },
            { name: "ortho_sitting_hr", label: "Sitting: HR", type: "input" }
          ], showIf: { field: "dizziness_balance_issues", equals: "yes" } },
          { type: "row", fields: [
            { name: "ortho_stand1_bp", label: "Standing (1 min): BP", type: "input" },
            { name: "ortho_stand1_hr", label: "Standing (1 min): HR", type: "input" }
          ], showIf: { field: "dizziness_balance_issues", equals: "yes" } },
          { type: "row", fields: [
            { name: "ortho_stand3_bp", label: "Standing (3 min): BP", type: "input" },
            { name: "ortho_stand3_hr", label: "Standing (3 min): HR", type: "input" }
          ], showIf: { field: "dizziness_balance_issues", equals: "yes" } },
          { name: "pain_with_movement", label: "Pain with movement/positioning", type: "radio", options: YES_NO_OPTIONS },
          { name: "fear_hesitation_mobility", label: "Fear/hesitation with mobility", type: "radio", options: YES_NO_OPTIONS },
          { name: "safety_comfort_specify", label: "Specify", type: "textarea" }
        ]
      },
      {
        title: "Cardiorespiratory & Autonomic Symptoms",
        fields: [
          { name: "chest_pain", label: "Chest pain", type: "radio", options: YES_NO_OPTIONS },
          { name: "dyspnea", label: "Dyspnea at rest/exertion", type: "radio", options: YES_NO_OPTIONS },
          { name: "palpitations", label: "Palpitations", type: "radio", options: YES_NO_OPTIONS },
          { name: "dizziness_syncope", label: "Dizziness/syncope", type: "radio", options: YES_NO_OPTIONS },
          { name: "orthostatic_symptoms", label: "Orthostatic symptoms", type: "radio", options: YES_NO_OPTIONS },
          { name: "exercise_intolerance", label: "Exercise intolerance/fatigue", type: "radio", options: YES_NO_OPTIONS },
          { name: "cardiorespiratory_specify", label: "Specify", type: "textarea" }
        ]
      },
      {
        title: "Allergies & Alerts",
        fields: [
          { name: "drug_allergies", label: "Drug allergies", type: "radio", options: YES_NO_OPTIONS },
          { name: "drug_allergies_specify", label: "Specify", type: "input", showIf: { field: "drug_allergies", equals: "yes" } },
          { name: "food_allergies", label: "Food allergies", type: "radio", options: YES_NO_OPTIONS },
          { name: "food_allergies_specify", label: "Specify", type: "input", showIf: { field: "food_allergies", equals: "yes" } },
          { name: "latex_allergy", label: "Latex allergy", type: "radio", options: YES_NO_OPTIONS },
          { name: "latex_allergy_specify", label: "Specify", type: "input", showIf: { field: "latex_allergy", equals: "yes" } },
          { name: "environmental_allergies", label: "Environmental allergies", type: "radio", options: YES_NO_OPTIONS },
          { name: "environmental_allergies_specify", label: "Specify", type: "input", showIf: { field: "environmental_allergies", equals: "yes" } },
          { name: "reaction_type", label: "Reaction type", type: "checkbox-group", options: [
            { label: "Rash", value: "rash" },
            { label: "Anaphylaxis", value: "anaphylaxis" },
            { label: "GI upset", value: "gi_upset" },
            { label: "Respiratory", value: "respiratory" },
            { label: "Other", value: "other" }
          ]},
          { name: "reaction_type_other", label: "Specify", type: "input", showIf: { field: "reaction_type", includes: "other" } }
        ]
      },
      {
        title: "Medication Reconciliation",
        fields: [
          { name: "current_prescription_meds", label: "Current prescription medications", type: "radio", options: YES_NO_OPTIONS },
          { name: "current_prescription_meds_specify", label: "Specify", type: "input", showIf: { field: "current_prescription_meds", equals: "yes" } },
          { name: "otc_herbal_supplements", label: "OTC/herbal supplements", type: "radio", options: YES_NO_OPTIONS },
          { name: "otc_herbal_supplements_specify", label: "Specify", type: "input", showIf: { field: "otc_herbal_supplements", equals: "yes" } },
          { name: "medication_adherence_issues", label: "Medication adherence issues", type: "radio", options: YES_NO_OPTIONS },
          { name: "medication_adherence_specify", label: "Specify", type: "input", showIf: { field: "medication_adherence_issues", equals: "yes" } },
          { name: "recent_medication_changes", label: "Recent medication changes", type: "radio", options: YES_NO_OPTIONS },
          { name: "recent_medication_changes_specify", label: "Specify", type: "input", showIf: { field: "recent_medication_changes", equals: "yes" } },
          { name: "high_risk_meds", label: "High-risk meds", type: "checkbox-group", options: [
            { label: "Insulin", value: "insulin" },
            { label: "Anticoagulants", value: "anticoagulants" },
            { label: "Opioids", value: "opioids" },
            { label: "Sedatives", value: "sedatives" },
            { label: "Steroids", value: "steroids" }
          ]}
        ]
      },
      {
        title: "Infection Risk & Exposure Screening",
        fields: [
          { name: "fever_infection_14days", label: "Fever/infection in past 14 days", type: "radio", options: YES_NO_OPTIONS },
          { name: "fever_infection_specify", label: "Specify", type: "input", showIf: { field: "fever_infection_14days", equals: "yes" } },
          { name: "tb_exposure_history", label: "TB exposure/history", type: "radio", options: YES_NO_OPTIONS },
          { name: "tb_exposure_specify", label: "Specify", type: "input", showIf: { field: "tb_exposure_history", equals: "yes" } },
          { name: "mrsa_vre_mdro_history", label: "MRSA/VRE/MDRO history", type: "radio", options: YES_NO_OPTIONS },
          { name: "mrsa_vre_mdro_specify", label: "Specify", type: "input", showIf: { field: "mrsa_vre_mdro_history", equals: "yes" } },
          { name: "recent_international_travel", label: "Recent international travel", type: "radio", options: YES_NO_OPTIONS },
          { name: "recent_travel_specify", label: "Specify", type: "input", showIf: { field: "recent_international_travel", equals: "yes" } }
        ]
      },
      {
        title: "Discharge Readiness",
        fields: [
          { name: "caregiver_available_discharge", label: "Caregiver available at discharge", type: "radio", options: YES_NO_OPTIONS },
          { name: "home_environment_safe", label: "Home environment safe", type: "radio", options: YES_NO_OPTIONS },
          { name: "barriers_to_discharge", label: "Barriers to discharge", type: "checkbox-group", options: [
            { label: "Financial", value: "financial" },
            { label: "Mobility", value: "mobility" },
            { label: "Housing", value: "housing" },
            { label: "Transport", value: "transport" },
            { label: "None", value: "none" }
          ]}
        ]
      }
    ]
  };

  const OBJECTIVE_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: [
          { type: "subheading", label: "Vital Signs" },
          { type: "row", fields: [
            { name: "obj_body_temp", label: "Body Temperature (°C)", type: "input", placeholder: "°C" },
            { name: "obj_heart_rate", label: "Heart Rate (/min)", type: "input", placeholder: "/min" },
            { name: "obj_resp_rate", label: "Respiratory Rate (/min)", type: "input", placeholder: "/min" }
          ]},
          { type: "row", fields: [
            { name: "obj_bp", label: "Blood Pressure (mmHg)", type: "input", placeholder: "e.g. 120/80" },
            { name: "obj_spo2", label: "Oxygen Saturation (SpO₂) (%)", type: "input", placeholder: "%" }
          ]},
          { type: "subheading", label: "Anthropometry" },
          { type: "row", fields: [
            { name: "obj_height", label: "Height (cm)", type: "input" },
            { name: "obj_weight", label: "Weight (kg)", type: "input", placeholder: "kg" }
          ]},
          { name: "obj_bmi", label: "BMI (kg/m²)", type: "score-box" },
          { type: "subheading", label: "Devices / Lines / Tubes" },
          { name: "iv_access", label: "IV access", type: "radio", options: [
            { label: "None", value: "none" },
            { label: "Peripheral", value: "peripheral" },
            { label: "Central", value: "central" }
          ]},
          { name: "iv_access_site", label: "Site", type: "input", showIf: { field: "iv_access", oneOf: ["peripheral", "central"] } },
          { name: "oxygen_device", label: "Oxygen device", type: "radio", options: [
            { label: "Room air", value: "room_air" },
            { label: "NC", value: "nc" },
            { label: "Mask", value: "mask" },
            { label: "Vent", value: "vent" }
          ]},
          { name: "urinary_catheter", label: "Urinary catheter", type: "radio", options: YES_NO_OPTIONS },
          { name: "feeding_tube", label: "Feeding tube", type: "radio", options: [
            { label: "NG", value: "ng" },
            { label: "PEG", value: "peg" },
            { label: "None", value: "none" }
          ]},
          { name: "drains_wound_vac", label: "Drains/wound VAC", type: "radio", options: YES_NO_OPTIONS },
          {
            type: "subheading",
            label: "Forms"
          },
          {
            name: "nursing_assessments",
            type: "assessment-launcher",
            options: [
              { label: "Barthel Index", value: "barthel" },
              { label: "ADL", value: "adl" },
              { label: "Patient History", value: "patient_history" },
              { label: "Morse Fall Scale", value: "morse_fall_scale" },
              { label: "Braden Scale", value: "braden_scale" },
              { label: "Wound Treatment Flowsheet", value: "wound_treatment_flowsheet" },
              { label: "Numeric Rating Scale (NRS) 0-10", value: "numeric_pain_rating_scale" },
              { label: "Diabetic Foot Assessment", value: "diabetic_foot_assessment" }
            ]
          }
        ]
      }
    ]
  };

  const ASSESSMENT_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: []
      }
    ]
  };

  const PLAN_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: []
      }
    ]
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const today = new Date();

  const NURSING_PATIENT_INFO_SCHEMA = {
    title: "Patient Information",
    sections: [
      {
        fields: [
          { type: "row", fields: [
            { name: "patient_name", label: "Name", type: "input", readOnly: true },
            { name: "patient_ic", label: "IC", type: "input", readOnly: true },
            { name: "patient_dob", label: "DOB", type: "input", readOnly: true },
            { name: "patient_age_gender", label: "Age / Gender", type: "input", readOnly: true }
          ]},
          { type: "subheading", label: "Diagnosis" },
          { type: "row", fields: [
            { name: "primary_diagnosis", label: "Primary Diagnosis", type: "input", readOnly: true },
            { name: "secondary_diagnosis", label: "Secondary Diagnosis", type: "input", readOnly: true }
          ]},
          { type: "subheading", label: "Allergies" },
          { name: "allergy_drug", label: "Drug", type: "input" },
          { name: "allergy_food", label: "Food", type: "input" },
          { name: "allergy_environmental", label: "Environmental", type: "input" },
          { type: "subheading", label: "General Information" },
          { type: "row", fields: [
            { name: "marital_status", label: "Marital Status", type: "input", readOnly: true },
            { name: "employment_status", label: "Employment Status", type: "input", readOnly: true }
          ]},
          { type: "row", fields: [
            { name: "occupation", label: "Occupation", type: "input", readOnly: true },
            { name: "education_background", label: "Education Background", type: "input", readOnly: true }
          ]},
          { type: "row", fields: [
            { name: "living_environment", label: "Living Environment", type: "input", readOnly: true },
            { name: "main_caregiver", label: "Main Caregiver", type: "input", readOnly: true }
          ]},
          { type: "subheading", label: "Biological Status" },
          { name: "biological_status", type: "checkbox-group", options: [
            { label: "Comorbidities & Medical history", value: "comorbidities" },
            { label: "Physical limitation", value: "physical_limitation" },
            { label: "Chronic pain / sleep issue", value: "chronic_pain_sleep" }
          ]},
          { type: "subheading", label: "Psychological" },
          { name: "psychological", type: "checkbox-group", options: [
            { label: "Emotional status (anxiety, depression, coping)", value: "emotional_status" },
            { label: "Cognitive Function", value: "cognitive_function" },
            { label: "Stressor", value: "stressor" }
          ]},
          { type: "subheading", label: "Social" },
          { name: "social", type: "checkbox-group", options: [
            { label: "Family & Caregiver support", value: "family_caregiver" },
            { label: "Financial / Insurance status", value: "financial_insurance" },
            { label: "Language/communication barriers", value: "language_barriers" },
            { label: "Cultural / religious considerations", value: "cultural_religious" }
          ]},
          { type: "row", fields: [
            { name: "unit_ward", label: "Unit/Ward", type: "input" },
            { name: "attending_physician", label: "Attending Physician", type: "checkbox-group", options: [
              { label: "Dr. Liaya", value: "Dr.Liaya" },
              { label: "Mr. Tan", value: "Mr.Tan" },
              { label: "Dr. Hussain", value: "Dr.Hussain" },
              { label: "Dr. Naz", value: "Dr.Naz" }
            ]}
          ]},
          { type: "row", fields: [
            { name: "date_of_admission", label: "Date of Admission", type: "date" },
            { name: "reason_for_admission", label: "Reason for Admission", type: "input" }
          ]}
        ]
      }
    ]
  };

  const nursingPatientInfoValues = {
    ...values,
    patient_name: patient?.name || "-",
    patient_ic: patient?.id || "-",
    patient_dob: formatDate(patient?.dob),
    patient_age_gender: `${patient?.age ?? "-"} / ${patient?.sex || "-"}`,
    primary_diagnosis: patient?.icd || patient?.diagnosis_history || "-",
    secondary_diagnosis: patient?.secondary_diagnosis || "-",
    marital_status: patient?.marital_status || "-",
    employment_status: patient?.employment_status || "-",
    occupation: patient?.occupation || "-",
    education_background: (patient?.education_background === "Other" && patient?.education_background_other)
      ? patient.education_background_other
      : (patient?.education_background || "-"),
    living_environment: (patient?.living_environment === "Other" && patient?.living_environment_other)
      ? patient.living_environment_other
      : (patient?.living_environment || "-"),
    main_caregiver: patient?.main_caregiver || "-"
  };

    const handleDoctorsReport = () => {
      alert("Report will be generating soon");
    };

  /* ===================== RENDER ===================== */

  return (
    <PatientContext.Provider value={patient}>
      <div style={mainContent}>
        {/* ===== PATIENT INFORMATION CARD ===== */}
        <CommonFormBuilder
          schema={NURSING_PATIENT_INFO_SCHEMA}
          values={nursingPatientInfoValues}
          onChange={onChange}
        >
          <div style={{ ...section, marginTop: 16 }}>
            <button style={doctorsReportBtn} onClick={handleDoctorsReport}>
              Doctors Reports
            </button>
          </div>
        </CommonFormBuilder>

        {/* ===== TABS ===== */}
        <div style={tabBar}>
          {["subjective", "objective", "assessment", "plan"].map(tab => (
            <div
              key={tab}
              style={activeTab === tab ? tabActive : tabBtn}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </div>
          ))}
        </div>

        {/* ===== TAB CONTENT ===== */}
        <CommonFormBuilder
          schema={schemaMap[activeTab]}
          values={values}
          onChange={onChange}
          submitted={submitted}
          onAction={handleAction}
          assessmentRegistry={NURSING_ASSESSMENT_REGISTRY}
        >
          {/* Submit button */}
          <div style={submitRow}>
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Nursing Assessment
            </button>
          </div>
        </CommonFormBuilder>
      </div>
    </PatientContext.Provider>
  );
}

/* ===================== STYLES ===================== */

const mainContent = { margin: "0 auto", width: "100%" };

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
};

const tabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#0f172a"
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2451b3",
  color: "#2451b3"
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 20
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700
};

const section = {
  marginBottom: 24
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};

const doctorsReportBtn = {
  padding: "10px 20px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 8
};
