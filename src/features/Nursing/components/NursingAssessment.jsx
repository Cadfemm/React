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
import RespiratoryAssessment from "../FocusedAssessment/RespiratoryAssessment";
import CardiacAssessment from "../FocusedAssessment/CardiacAssessment";
import GIOrGUAssessment from "../FocusedAssessment/GIOrGUAssessment";
import SkinAssessment from "../FocusedAssessment/SkinAssessment";
import EyeAssessment from "../FocusedAssessment/EyeAssessment";
import HeadNeckAssessment from "../FocusedAssessment/HeadNeckAssessment";
import RenalAssessment from "../FocusedAssessment/RenalAssessment";
import MusculoskeletalAssessment from "../FocusedAssessment/MusculoskeletalAssessment";

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

function RespiratoryAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("respiratory_assessment_launcher_active", null);
  return (
    <div>
      <RespiratoryAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function CardiacAssessmentAdapter({ values, onChange }) {
  const handleBack = () => {
    onChange("cardiac_assessment_launcher_active", null);
    onChange("cardiac_assessment_launcher_heart_vascular_active", null);
  };
  return (
    <div>
      <CardiacAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function GIOrGUAssessmentAdapter({ values, onChange }) {
  const handleBack = () => {
    onChange("gi_gu_assessment_launcher_active", null);
    onChange("gi_gu_assessment_launcher_gu_active", null);
  };
  return (
    <div>
      <GIOrGUAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function SkinAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("skin_assessment_launcher_active", null);
  return (
    <div>
      <SkinAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function EyeAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("eye_assessment_launcher_active", null);
  return (
    <div>
      <EyeAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function HeadNeckAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("head_neck_assessment_launcher_active", null);
  return (
    <div>
      <HeadNeckAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function RenalAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("renal_assessment_launcher_active", null);
  return (
    <div>
      <RenalAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function MusculoskeletalAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("musculoskeletal_assessment_launcher_active", null);
  return (
    <div>
      <MusculoskeletalAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
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
  diabetic_foot_assessment: DiabeticFootAssessmentAdapter,
  respiratory_assessment: RespiratoryAssessmentAdapter,
  cardiac_assessment: CardiacAssessmentAdapter,
  gi_gu_assessment: GIOrGUAssessmentAdapter,
  skin_assessment: SkinAssessmentAdapter,
  eye_assessment: EyeAssessmentAdapter,
  head_neck_assessment: HeadNeckAssessmentAdapter,
  renal_assessment: RenalAssessmentAdapter,
  musculoskeletal_assessment: MusculoskeletalAssessmentAdapter
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
      const bpRaw = loaded.obj_bp;
      const sysPart = String(bpRaw || "").split("/")[0].trim();
      const sys = parseInt(sysPart, 10);
      const bpOutOfRange = Number.isFinite(sys) && (sys < 90 || sys > 180);
      const anyPulseAbsent = loaded.hv_radial_quality === "absent" || loaded.hv_dorsalis_pedis_quality === "absent" || loaded.hv_posterior_tibial_quality === "absent";
      loaded.show_cardiac_launcher = bpOutOfRange || anyPulseAbsent;
      const nauseaYes = loaded.gi_nausea_vomiting === "yes";
      const uo = parseFloat(loaded.gu_urine_output);
      loaded.show_gi_gu_launcher = nauseaYes || (Number.isFinite(uo) && uo < 0.5);
      const renalUo = parseFloat(loaded.gu_urine_output);
      loaded.show_renal_launcher = Number.isFinite(renalUo) && renalUo < 0.5;
      const mskAbnormal = loaded.msk_rom === "limited" || loaded.msk_strength === "decreased"
        || ["unsteady", "assistive_device"].includes(loaded.msk_gait)
        || loaded.msk_joint_swelling_deformity === "present"
        || loaded.msk_pain_with_movement === "yes"
        || ["weak", "edematous"].includes(loaded.msk_lower_extremity);
      loaded.show_msk_launcher = !!mskAbnormal;
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
      // Show Cardiac Assessment launcher when BP systolic < 90 or > 180, or any peripheral pulse is absent
      const bpPulseNames = ["obj_bp", "obj_height", "obj_weight", "hv_radial_quality", "hv_dorsalis_pedis_quality", "hv_posterior_tibial_quality"];
      if (bpPulseNames.includes(name)) {
        const bpRaw = next.obj_bp;
        const sysPart = String(bpRaw || "").split("/")[0].trim();
        const sys = parseInt(sysPart, 10);
        const bpOutOfRange = Number.isFinite(sys) && (sys < 90 || sys > 180);
        const anyPulseAbsent = next.hv_radial_quality === "absent" || next.hv_dorsalis_pedis_quality === "absent" || next.hv_posterior_tibial_quality === "absent";
        next.show_cardiac_launcher = bpOutOfRange || anyPulseAbsent;
      }
      // Show GI/GU Assessment launcher when Nausea/vomiting = Yes (Abdomen/GI) or Urine output < 0.5 mL/hr (Genitourinary)
      const giGuNames = ["gi_nausea_vomiting", "gu_urine_output"];
      if (giGuNames.includes(name)) {
        const nauseaYes = next.gi_nausea_vomiting === "yes";
        const uo = parseFloat(next.gu_urine_output);
        next.show_gi_gu_launcher = nauseaYes || (Number.isFinite(uo) && uo < 0.5);
      }
      // Show Renal Assessment launcher when urine output < 0.5 mL/hr (Genitourinary)
      if (name === "gu_urine_output") {
        const renalUo = parseFloat(next.gu_urine_output);
        next.show_renal_launcher = Number.isFinite(renalUo) && renalUo < 0.5;
      }
      // Show Musculoskeletal Assessment launcher when any MSK finding is abnormal
      const mskNames = ["msk_rom", "msk_strength", "msk_gait", "msk_joint_swelling_deformity", "msk_pain_with_movement", "msk_lower_extremity"];
      if (mskNames.includes(name)) {
        const mskAbnormal = next.msk_rom === "limited" || next.msk_strength === "decreased"
          || ["unsteady", "assistive_device"].includes(next.msk_gait)
          || next.msk_joint_swelling_deformity === "present"
          || next.msk_pain_with_movement === "yes"
          || ["weak", "edematous"].includes(next.msk_lower_extremity);
        next.show_msk_launcher = !!mskAbnormal;
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
          { name: "past_medical_surgical", label: "Past Medical/Surgical", type: "textarea" },
          { name: "past_family_medical_history ", label: "Past Family Medical History ", type: "textarea" }
        ]
      },
      {
        title: "Pain Assessment",
        fields: [
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
          { name: "pain_free_text", label: "Specify", type: "textarea", showIf: { field: "pain_present", equals: "yes" } }
        ]
      },
      {
        title: "Functional Status",
        fields: [
          { name: "difficulty_mobility_transfers", label: "Difficulty with mobility/transfers", type: "radio", options: YES_NO_OPTIONS },
          { name: "adl_limitations", label: "ADL limitations", type: "radio", options: YES_NO_OPTIONS },
          { name: "sleep_pattern", label: "Sleep pattern", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Disturbed", value: "disturbed" }] },
          { name: "appetite_functional", label: "Appetite", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Decreased", value: "decreased" }, { label: "Increased", value: "increased" }] },
          { name: "fatigue_reduced_endurance", label: "Fatigue/reduced endurance", type: "radio", options: YES_NO_OPTIONS },
          { name: "functional_status_specify", label: "Specify", type: "textarea" }
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
          {
            name: "cardiac_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Cardiac Assessment", value: "cardiac_assessment" }],
            showIf: {
              or: [
                { field: "show_cardiac_launcher", equals: true },
                { field: "hv_radial_quality", equals: "absent" },
                { field: "hv_dorsalis_pedis_quality", equals: "absent" },
                { field: "hv_posterior_tibial_quality", equals: "absent" }
              ]
            }
          },
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
          { name: "drains_wound_vac", label: "Drains/wound VAC", type: "radio", options: YES_NO_OPTIONS }
        ]
      },
      {
        title: "On Admission: Head-to-Toe Physical Assessment",
        fields: [
          { type: "subheading", label: "Neurological" },
          {
            name: "neuro_loc",
            label: "Level of consciousness",
            type: "radio",
            options: [
              { label: "Alert", value: "alert" },
              { label: "Drowsy", value: "drowsy" },
              { label: "Lethargic", value: "lethargic" },
              { label: "Unresponsive", value: "unresponsive" }
            ]
          },
          {
            name: "neuro_cognition_orientation",
            label: "Cognition / Orientation",
            type: "checkbox-group",
            options: [
              { label: "Person", value: "person" },
              { label: "Place", value: "place" },
              { label: "Time", value: "time" },
              { label: "Situation", value: "situation" }
            ]
          },
          {
            name: "neuro_communication",
            label: "Communication",
            type: "checkbox-group",
            options: [
              { label: "Normal speech", value: "normal_speech" },
              { label: "Dysarthria", value: "dysarthria" },
              { label: "Expressive aphasia", value: "expressive_aphasia" },
              { label: "Receptive aphasia", value: "receptive_aphasia" },
              { label: "Global aphasia", value: "global_aphasia" },
              { label: "Uses Alternative Communication Strategies (AAC / writing / gestures / device)", value: "aac" }
            ]
          },
          {
            name: "neuro_pupils",
            label: "Pupils",
            type: "radio",
            options: [
              { label: "Equal", value: "equal" },
              { label: "Reactive", value: "reactive" },
              { label: "Non-reactive", value: "non_reactive" }
            ]
          },
          {
            name: "neuro_motor_strength",
            label: "Motor strength",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Weak (specify side)", value: "weak" }
            ]
          },
          {
            name: "neuro_motor_strength_specify",
            label: "Motor strength – weak (specify side)",
            type: "input",
            showIf: { field: "neuro_motor_strength", equals: "weak" }
          },
          {
            name: "neuro_sensory_function",
            label: "Sensory function",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Impaired (specify)", value: "impaired" }
            ]
          },
          {
            name: "neuro_sensory_function_specify",
            label: "Sensory function – impaired (specify)",
            type: "input",
            showIf: { field: "neuro_sensory_function", equals: "impaired" }
          },
          {
            name: "neuro_reflexes",
            label: "Reflexes",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Hypoactive", value: "hypoactive" },
              { label: "Hyperactive", value: "hyperactive" }
            ]
          },
          {
            name: "neuro_coordination_gait",
            label: "Coordination / gait",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Unsteady", value: "unsteady" }
            ]
          },
          {
            name: "neuro_deficits",
            label: "Neurological deficits",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Present (specify)", value: "present" }
            ]
          },
          {
            name: "neuro_deficits_specify",
            label: "Neurological deficits – specify",
            type: "textarea",
            showIf: { field: "neuro_deficits", equals: "present" }
          },
          {
            name: "neuro_overall_specify",
            label: "Specify",
            type: "textarea"
          },

          { type: "subheading", label: "Head and Neck" },
          {
            name: "hn_head",
            label: "Head",
            type: "radio",
            options: [
              { label: "Normocephalic", value: "normocephalic" },
              { label: "Abnormal (specify)", value: "abnormal" }
            ]
          },
          {
            name: "hn_head_specify",
            label: "Head – abnormal (specify)",
            type: "input",
            showIf: { field: "hn_head", equals: "abnormal" }
          },
          {
            name: "hn_eyes",
            label: "Eyes",
            type: "checkbox-group",
            options: [
              { label: "PERRLA", value: "perrla" },
              { label: "Redness", value: "redness" },
              { label: "Discharge", value: "discharge" },
              { label: "Visual deficit", value: "visual_deficit" }
            ]
          },
          {
            name: "eye_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Eye Assessment", value: "eye_assessment" }],
            showIf: {
              or: [
                { field: "hn_eyes", includes: "redness" },
                { field: "hn_eyes", includes: "discharge" },
                { field: "hn_eyes", includes: "visual_deficit" }
              ]
            }
          },
          {
            name: "hn_ears",
            label: "Ears",
            type: "checkbox-group",
            options: [
              { label: "Clear canals", value: "clear_canals" },
              { label: "Discharge", value: "discharge" },
              { label: "Hearing deficit", value: "hearing_deficit" }
            ]
          },
          {
            name: "hn_ears_audiology_referral",
            label: "Audiology referral indicated",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ],
            showIf: { field: "hn_ears", includes: "hearing_deficit" }
          },
          {
            name: "hn_nose",
            label: "Nose",
            type: "radio",
            options: [
              { label: "Patent", value: "patent" },
              { label: "Congestion", value: "congestion" },
              { label: "Discharge", value: "discharge" }
            ]
          },
          {
            name: "hn_mouth",
            label: "Mouth / oral mucosa",
            type: "checkbox-group",
            options: [
              { label: "Moist", value: "moist" },
              { label: "Dry", value: "dry" },
              { label: "Pale", value: "pale" },
              { label: "Lesions", value: "lesions" }
            ]
          },
          {
            name: "hn_throat",
            label: "Throat / swallowing",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Dysphagia", value: "dysphagia" }
            ]
          },
          {
            name: "hn_neck",
            label: "Neck",
            type: "checkbox-group",
            options: [
              { label: "Supple", value: "supple" },
              { label: "Masses", value: "masses" },
              { label: "Lymphadenopathy", value: "lymphadenopathy" }
            ]
          },
          {
            name: "hn_jvd",
            label: "Jugular venous distension (JVD)",
            type: "radio",
            options: [
              { label: "Absent", value: "absent" },
              { label: "Present", value: "present" }
            ]
          },
          {
            name: "head_neck_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Head & Neck Assessment", value: "head_neck_assessment" }],
            showIf: {
              or: [
                { field: "hn_head", equals: "abnormal" },
                { field: "hn_neck", includes: "masses" },
                { field: "hn_neck", includes: "lymphadenopathy" }
              ]
            }
          },
          { type: "subheading", label: "Chest & Lungs / Respiratory System" },
          {
            name: "resp_breathing_pattern",
            label: "Breathing pattern",
            type: "radio",
            options: [
              { label: "Regular", value: "regular" },
              { label: "Labored", value: "labored" },
              { label: "Shallow", value: "shallow" }
            ]
          },
          {
            name: "resp_chest_expansion",
            label: "Chest expansion",
            type: "radio",
            options: [
              { label: "Symmetrical", value: "symmetrical" },
              { label: "Asymmetrical", value: "asymmetrical" }
            ]
          },
          {
            name: "resp_breath_sounds",
            label: "Breath sounds",
            type: "checkbox-group",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Wheeze", value: "wheeze" },
              { label: "Crackles", value: "crackles" },
              { label: "Diminished", value: "diminished" }
            ]
          },
          {
            name: "resp_o2_saturation",
            label: "Oxygen saturation (%)",
            type: "input",
            placeholder: "%"
          },
          {
            name: "resp_o2_mode",
            label: "Oxygen delivery",
            type: "radio",
            options: [
              { label: "Room air (RA)", value: "ra" },
              { label: "O₂", value: "o2" }
            ]
          },
          {
            name: "resp_distress_signs",
            label: "Signs of respiratory distress",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Retractions", value: "retractions" },
              { label: "Nasal flaring", value: "nasal_flaring" },
              { label: "Cyanosis", value: "cyanosis" }
            ]
          },
          {
            name: "respiratory_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Respiratory Assessment", value: "respiratory_assessment" }],
            showIf: { field: "resp_distress_signs", oneOf: ["retractions", "nasal_flaring", "cyanosis"] }
          },
          {
            name: "resp_work_of_breathing",
            label: "Work of breathing",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Increased", value: "increased" }
            ]
          },
          {
            name: "resp_lung_auscultation",
            label: "Lung auscultation",
            type: "radio",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Abnormal (specify)", value: "abnormal" }
            ]
          },
          {
            name: "resp_lung_auscultation_specify",
            label: "Lung auscultation – abnormal (specify)",
            type: "textarea",
            showIf: { field: "resp_lung_auscultation", equals: "abnormal" }
          },
          { type: "subheading", label: "Heart & Vascular System" },
          {
            name: "hv_rhythm",
            label: "Rhythm",
            type: "radio",
            options: [
              { label: "Regular", value: "regular" },
              { label: "Irregular", value: "irregular" }
            ]
          },
          {
            name: "hv_heart_sounds",
            label: "Heart sounds",
            type: "radio",
            options: [
              { label: "S1 S2 normal", value: "normal" },
              { label: "Murmur", value: "murmur" },
              { label: "Extra sounds", value: "extra_sounds" }
            ]
          },
          {
            name: "hv_radial_quality",
            label: "Peripheral pulses — Radial",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Weak", value: "weak" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "hv_dorsalis_pedis_quality",
            label: "Peripheral pulses — Dorsalis pedis",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Weak", value: "weak" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "hv_posterior_tibial_quality",
            label: "Peripheral pulses — Posterior tibial",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Weak", value: "weak" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "cardiac_assessment_launcher_heart_vascular",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Cardiac Assessment", value: "cardiac_assessment" }],
            showIf: {
              or: [
                { field: "show_cardiac_launcher", equals: true },
                { field: "hv_radial_quality", equals: "absent" },
                { field: "hv_dorsalis_pedis_quality", equals: "absent" },
                { field: "hv_posterior_tibial_quality", equals: "absent" }
              ]
            }
          },
          {
            name: "hv_cap_refill",
            label: "Capillary refill (seconds)",
            type: "input",
            placeholder: "e.g. 2"
          },
          {
            name: "hv_edema",
            label: "Edema",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "+1", value: "1" },
              { label: "+2", value: "2" },
              { label: "+3", value: "3" },
              { label: "+4", value: "4" }
            ]
          },
          {
            name: "hv_edema_location",
            label: "Edema location",
            type: "input",
            placeholder: "Location",
            showIf: { field: "hv_edema", oneOf: ["1", "2", "3", "4"] }
          },
          {
            name: "hv_skin_temp_color",
            label: "Skin temperature / colour",
            type: "radio",
            options: [
              { label: "Warm", value: "warm" },
              { label: "Cool", value: "cool" },
              { label: "Pale", value: "pale" },
              { label: "Cyanotic", value: "cyanotic" }
            ]
          },
          { type: "subheading", label: "Abdomen / Gastrointestinal System" },
          {
            name: "gi_inspection",
            label: "Inspection",
            type: "radio",
            options: [
              { label: "Flat", value: "flat" },
              { label: "Distended", value: "distended" },
              { label: "Symmetrical", value: "symmetrical" }
            ]
          },
          {
            name: "gi_palpation",
            label: "Palpation",
            type: "radio",
            options: [
              { label: "Soft", value: "soft" },
              { label: "Tender", value: "tender" },
              { label: "Guarding", value: "guarding" },
              { label: "Masses", value: "masses" }
            ]
          },
          {
            name: "gi_bowel_sounds",
            label: "Bowel sounds",
            type: "radio",
            options: [
              { label: "Normoactive", value: "normoactive" },
              { label: "Hypoactive", value: "hypoactive" },
              { label: "Hyperactive", value: "hyperactive" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "gi_nausea_vomiting",
            label: "Nausea / vomiting",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gi_focused_referral",
            label: "GI focused assessment indicated",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ],
            showIf: { field: "gi_nausea_vomiting", equals: "yes" }
          },
          {
            name: "gi_gu_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "GI or GU Assessment", value: "gi_gu_assessment" }],
            showIf: { field: "show_gi_gu_launcher", equals: true }
          },
          {
            name: "gi_last_bm",
            label: "Last bowel movement",
            type: "input"
          },
          {
            name: "gi_continence",
            label: "Continence",
            type: "radio",
            options: [
              { label: "Continent", value: "continent" },
              { label: "Incontinent", value: "incontinent" }
            ]
          },
          {
            name: "gi_frequency",
            label: "Frequency",
            type: "radio",
            options: [
              { label: "Daily", value: "daily" },
              { label: "Every ___ days", value: "every_x_days" },
              { label: "Irregular", value: "irregular" }
            ]
          },
          {
            name: "gi_frequency_specify",
            label: "Frequency – every ___ days",
            type: "input",
            placeholder: "e.g. every 3 days",
            showIf: { field: "gi_frequency", equals: "every_x_days" }
          },
          {
            name: "gi_ease_defecation",
            label: "Ease of defecation",
            type: "radio",
            options: [
              { label: "No straining", value: "no_straining" },
              { label: "Straining", value: "straining" },
              { label: "Painful", value: "painful" }
            ]
          },
          {
            name: "gi_ostomy_present",
            label: "Ostomy present",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gi_ostomy_type",
            label: "Ostomy type",
            type: "input",
            placeholder: "Type",
            showIf: { field: "gi_ostomy_present", equals: "yes" }
          },
          {
            name: "gi_abdominal_distension_bowel",
            label: "Abdominal distension related to bowel",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gi_bowel_function",
            label: "Bowel Function",
            type: "radio",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Needs some help", value: "needs_help" },
              { label: "Dependent", value: "dependent" }
            ]
          },
          {
            name: "gi_bowel_method_needs_help",
            label: "Method (Needs some help)",
            type: "radio",
            options: [
              { label: "Toilet", value: "toilet" },
              { label: "Diaper", value: "diaper" }
            ],
            showIf: { field: "gi_bowel_function", equals: "needs_help" }
          },
          {
            name: "gi_bowel_method_dependent",
            label: "Method (Dependent)",
            type: "radio",
            options: [
              { label: "Digital rectal stimulation", value: "digital_stimulation" },
              { label: "Manual evacuation", value: "manual_evacuation" },
              { label: "Suppository", value: "suppository" },
              { label: "Enema", value: "enema" },
              { label: "Lactulose", value: "lactulose" }
            ],
            showIf: { field: "gi_bowel_function", equals: "dependent" }
          },
          { type: "subheading", label: "Genitourinary System" },
          {
            name: "gu_voiding",
            label: "Voiding",
            type: "radio",
            options: [
              { label: "Spontaneous", value: "spontaneous" },
              { label: "Assisted", value: "assisted" },
              { label: "Catheterized", value: "catheterized" }
            ]
          },
          {
            name: "gu_urine_output",
            label: "Urine output (mL/hr)",
            type: "input",
            placeholder: "mL/hr"
          },
          {
            name: "gi_gu_assessment_launcher_gu",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "GI or GU Assessment", value: "gi_gu_assessment" }],
            showIf: { field: "show_gi_gu_launcher", equals: true }
          },
          {
            name: "gu_urine_appearance",
            label: "Urine colour / clarity",
            type: "radio",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Cloudy", value: "cloudy" },
              { label: "Dark", value: "dark" },
              { label: "Hematuria", value: "hematuria" }
            ]
          },
          {
            name: "gu_dysuria",
            label: "Dysuria",
            type: "radio",
            options: [
              { label: "Absent", value: "absent" },
              { label: "Present", value: "present" }
            ]
          },
          {
            name: "renal_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Renal Assessment", value: "renal_assessment" }],
            showIf: { field: "show_renal_launcher", equals: true }
          },
          {
            name: "gu_incontinence",
            label: "Incontinence",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gu_bladder_function",
            label: "Bladder Function",
            type: "radio",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Needs some help", value: "needs_help" },
              { label: "Full dependent", value: "full_dependent" }
            ]
          },
          {
            name: "gu_bladder_method_full_dependent",
            label: "Bladder management method (Full dependent)",
            type: "radio",
            options: [
              { label: "Intermittent catheterization", value: "intermittent_catheter" },
              { label: "Indwelling (Foley) catheter", value: "indwelling_foley" },
              { label: "Suprapubic catheter", value: "suprapubic_catheter" },
              { label: "Condom (external) catheter", value: "condom_catheter" }
            ],
            showIf: { field: "gu_bladder_function", equals: "full_dependent" }
          },

          { type: "subheading", label: "Endocrine / Metabolic" },
          {
            name: "endo_diabetes",
            label: "Diabetes",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Type 1", value: "type1" },
              { label: "Type 2", value: "type2" },
              { label: "Gestational", value: "gestational" }
            ]
          },
          {
            name: "endo_hypoglycemia_symptoms",
            label: "Hypoglycemia symptoms",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "endo_hyperglycemia_symptoms",
            label: "Hyperglycemia symptoms",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "endo_steroid_therapy",
            label: "Steroid therapy",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "endo_hba1c",
            label: "HbA1c (if available)",
            type: "input"
          },

          { type: "subheading", label: "Nutrition / Tissue Perfusion Risk" },
          {
            name: "nut_oral_intake",
            label: "Oral intake",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Reduced", value: "reduced" },
              { label: "Minimal / NPO", value: "minimal_npo" }
            ]
          },
          {
            name: "nut_weight_change",
            label: "Weight change",
            type: "radio",
            options: [
              { label: "Stable", value: "stable" },
              { label: "Loss >5% in 30 days", value: "loss_5_30" },
              { label: "Loss >10% in 6 months", value: "loss_10_6" }
            ]
          },
          {
            name: "nut_appetite",
            label: "Appetite",
            type: "radio",
            options: [
              { label: "Good", value: "good" },
              { label: "Fair", value: "fair" },
              { label: "Poor", value: "poor" }
            ]
          },
          {
            name: "nut_albumin",
            label: "Albumin / prealbumin (if available)",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Low", value: "low" }
            ]
          },
          {
            name: "nut_swallow_difficulty",
            label: "Swallow difficulty",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },

          { type: "subheading", label: "Musculoskeletal System" },
          {
            name: "msk_rom",
            label: "Range of motion (ROM)",
            type: "radio",
            options: [
              { label: "Full", value: "full" },
              { label: "Limited (specify joint)", value: "limited" }
            ]
          },
          {
            name: "msk_rom_specify",
            label: "ROM limited – specify joint",
            type: "input",
            showIf: { field: "msk_rom", equals: "limited" }
          },
          {
            name: "msk_strength",
            label: "Muscle strength",
            type: "radio",
            options: [
              { label: "5/5", value: "5_5" },
              { label: "↓ strength (location)", value: "decreased" }
            ]
          },
          {
            name: "msk_strength_specify",
            label: "Muscle strength ↓ – location",
            type: "input",
            showIf: { field: "msk_strength", equals: "decreased" }
          },
          {
            name: "msk_gait",
            label: "Gait",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Unsteady", value: "unsteady" },
              { label: "Uses assistive device", value: "assistive_device" }
            ]
          },
          {
            name: "msk_joint_swelling_deformity",
            label: "Joint swelling / deformity",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Present", value: "present" }
            ]
          },
          {
            name: "msk_pain_with_movement",
            label: "Pain with movement",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes (location)", value: "yes" }
            ]
          },
          {
            name: "msk_pain_with_movement_location",
            label: "Pain with movement – location",
            type: "input",
            showIf: { field: "msk_pain_with_movement", equals: "yes" }
          },
          {
            name: "msk_lower_extremity",
            label: "Lower extremity assessment",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Weak", value: "weak" },
              { label: "Edematous", value: "edematous" }
            ]
          },
          {
            name: "musculoskeletal_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Musculoskeletal Assessment", value: "musculoskeletal_assessment" }],
            showIf: { field: "show_msk_launcher", equals: true }
          },

          { type: "subheading", label: "Integumentary System / Skin Integrity" },
          {
            name: "skin_colour",
            label: "Skin colour",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Pale", value: "pale" },
              { label: "Cyanotic", value: "cyanotic" },
              { label: "Jaundiced", value: "jaundiced" }
            ]
          },
          {
            name: "skin_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Skin Focused Assessment", value: "skin_assessment" }],
            showIf: { field: "skin_colour", equals: "pale" }
          },
          {
            name: "skin_temperature",
            label: "Temperature",
            type: "radio",
            options: [
              { label: "Warm", value: "warm" },
              { label: "Cool", value: "cool" }
            ]
          },
          {
            name: "skin_moisture",
            label: "Moisture",
            type: "radio",
            options: [
              { label: "Dry", value: "dry" },
              { label: "Moist", value: "moist" },
              { label: "Diaphoretic", value: "diaphoretic" }
            ]
          },
          {
            name: "skin_turgor",
            label: "Turgor",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Poor", value: "poor" }
            ]
          },
          {
            name: "skin_integrity",
            label: "Integrity",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Dry", value: "dry" },
              { label: "Cracks", value: "cracks" },
              { label: "Callus", value: "callus" },
              { label: "Fissures", value: "fissures" }
            ]
          },

          { type: "subheading", label: "Wounds / Pressure Injury" },
          {
            name: "pi_ulcer_wound_present",
            label: "Ulcer / wound present",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "pi_braden_scale",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Braden Scale", value: "braden_scale" }],
            showIf: { field: "pi_ulcer_wound_present", equals: "yes" }
          },
          {
            name: "pi_drainage",
            label: "Drainage",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Serous", value: "serous" },
              { label: "Purulent", value: "purulent" },
              { label: "Bloody", value: "bloody" }
            ]
          },
          {
            name: "pi_dressing_status",
            label: "Dressing status",
            type: "radio",
            options: [
              { label: "Clean/dry/intact", value: "clean_dry_intact" },
              { label: "Soiled", value: "soiled" },
              { label: "Loose", value: "loose" }
            ]
          },

          { type: "subheading", label: "Mobility / Activity" },
          {
            name: "pi_position_tolerance",
            label: "Current position tolerance",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Independent repositioning", value: "independent_repositioning" },
              { label: "Requires assistance to reposition", value: "requires_assistance" },
              { label: "Bedbound / Chairbound", value: "bedbound_chairbound" }
            ]
          },
          {
            name: "pi_transfers",
            label: "Transfers",
            type: "radio",
            options: [
              { label: "Independent", value: "independent" },
              { label: "One assist", value: "one_assist" },
              { label: "Two assist / mechanical lift", value: "two_assist_mech_lift" }
            ]
          },
          {
            name: "pi_ambulation",
            label: "Ambulation",
            type: "radio",
            options: [
              { label: "Independent", value: "independent" },
              { label: "With assistive device", value: "assistive_device" },
              { label: "Unable to ambulate", value: "unable" }
            ]
          },
          {
            name: "pi_time_same_position",
            label: "Time in same position",
            type: "radio",
            options: [
              { label: "<2 hours", value: "lt_2h" },
              { label: "≥2 hours", value: "gte_2h" }
            ]
          },
          {
            name: "pi_pressure_areas",
            label: "Pressure areas (sacrum, coccyx, heels, elbows)",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Reddened", value: "reddened" },
              { label: "Breakdown (stage ___)", value: "breakdown" }
            ]
          },
          {
            name: "pi_breakdown_stage",
            label: "Breakdown stage",
            type: "input",
            placeholder: "Stage",
            showIf: { field: "pi_pressure_areas", equals: "breakdown" }
          },
          {
            name: "pi_skin_moisture",
            label: "Skin moisture",
            type: "radio",
            options: [
              { label: "Dry", value: "dry" },
              { label: "Occasionally moist", value: "occasionally_moist" },
              { label: "Frequently moist", value: "frequently_moist" },
              { label: "Constantly moist", value: "constantly_moist" }
            ]
          },
          {
            name: "pi_incontinence_type",
            label: "Incontinence",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Urinary", value: "urinary" },
              { label: "Fecal", value: "fecal" },
              { label: "Dual", value: "dual" }
            ]
          },
          {
            name: "pi_perspiration",
            label: "Perspiration / diaphoresis",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "pi_devices_moisture",
            label: "Devices causing moisture (diapers, catheters, drains)",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },

          { type: "subheading", label: "Behavioral / Mental Status Observation" },
          {
            name: "beh_appearance",
            label: "Appearance",
            type: "radio",
            options: [
              { label: "Well-groomed", value: "well_groomed" },
              { label: "Disheveled", value: "disheveled" },
              { label: "Neglected", value: "neglected" }
            ]
          },
          {
            name: "beh_behavior",
            label: "Behavior",
            type: "radio",
            options: [
              { label: "Calm", value: "calm" },
              { label: "Cooperative", value: "cooperative" },
              { label: "Agitated", value: "agitated" },
              { label: "Aggressive", value: "aggressive" },
              { label: "Withdrawn", value: "withdrawn" }
            ]
          },
          {
            name: "beh_psychomotor",
            label: "Psychomotor activity",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Increased", value: "increased" },
              { label: "Decreased", value: "decreased" }
            ]
          },
          {
            name: "beh_eye_contact",
            label: "Eye contact",
            type: "radio",
            options: [
              { label: "Appropriate", value: "appropriate" },
              { label: "Poor", value: "poor" },
              { label: "Avoidant", value: "avoidant" }
            ]
          },
          {
            name: "beh_speech",
            label: "Speech",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Pressured", value: "pressured" },
              { label: "Slow", value: "slow" },
              { label: "Incoherent", value: "incoherent" }
            ]
          },
          {
            name: "beh_mood",
            label: "Mood",
            type: "radio",
            options: [
              { label: "Euthymic", value: "euthymic" },
              { label: "Anxious", value: "anxious" },
              { label: "Depressed", value: "depressed" },
              { label: "Irritable", value: "irritable" }
            ]
          },
          {
            name: "beh_affect",
            label: "Affect",
            type: "radio",
            options: [
              { label: "Appropriate", value: "appropriate" },
              { label: "Flat", value: "flat" },
              { label: "Labile", value: "labile" }
            ]
          },
          {
            name: "beh_thought_process",
            label: "Thought process",
            type: "radio",
            options: [
              { label: "Logical", value: "logical" },
              { label: "Disorganized", value: "disorganized" }
            ]
          },
          {
            name: "beh_thought_content",
            label: "Thought content",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Delusions", value: "delusions" },
              { label: "Hallucinations", value: "hallucinations" }
            ]
          },
          {
            name: "beh_orientation_person",
            label: "Oriented to person",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "beh_orientation_place",
            label: "Oriented to place",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "beh_orientation_time",
            label: "Oriented to time",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "beh_obeys_3_step",
            label: "Obeys 3-step command",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "beh_insight_judgment",
            label: "Insight / judgment",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Impaired", value: "impaired" }
            ]
          },
          {
            name: "beh_risk_behaviors",
            label: "Risk behaviors observed",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Self-harm", value: "self_harm" },
              { label: "Harm to others", value: "harm_others" },
              { label: "Wandering", value: "wandering" }
            ]
          }
        ]
      },
      {
        fields: [
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
        fields: [
          {
            name: "assessment_problem_summary",
            label: "Problem Summary",
            type: "textarea"
          },
          {
            type: "subheading",
            label: "Problem List"
          },
          {
            name: "assessment_problem_list",
            label: "Impaired mobility",
            type: "checkbox-group",
            options: [
              { label: "Acute pain", value: "acute_pain" },
              { label: "Impaired skin integrity", value: "impaired_skin_integrity" },
              { label: "Risk for aspiration", value: "risk_aspiration" },
              { label: "Impaired urinary elimination", value: "impaired_urinary_elimination" },
              { label: "Impaired cognition", value: "impaired_cognition" },
              { label: "Infection risk", value: "infection_risk" }
            ]
          },
          {
            name: "assessment_problem_other",
            label: "Other problem",
            type: "input"
          },
          {
            type: "subheading",
            label: "Severity / Status"
          },
          {
            name: "assessment_severity",
            label: "Severity",
            type: "checkbox-group",
            options: [
              { label: "Mild", value: "mild" },
              { label: "Moderate", value: "moderate" },
              { label: "Severe", value: "severe" },
              { label: "Improving", value: "improving" },
              { label: "Stable", value: "stable" },
              { label: "Deteriorating", value: "deteriorating" }
            ]
          },
          {
            type: "subheading",
            label: "Functional Impact"
          },
          {
            name: "assessment_functional_impact",
            label: "Functional impact",
            type: "checkbox-group",
            options: [
              { label: "Affects ambulation", value: "affects_ambulation" },
              { label: "Affects transfers", value: "affects_transfers" },
              { label: "Affects self-care", value: "affects_self_care" },
              { label: "Affects continence", value: "affects_continence" },
              { label: "Affects communication", value: "affects_communication" },
              { label: "Affects swallowing", value: "affects_swallowing" }
            ]
          },
          {
            name: "assessment_other_notes",
            label: "Others",
            type: "input"
          },
          {
            name: "assessment_risk_level",
            label: "Risk Level (related to falls, skin, aspiration, infection)",
            type: "radio",
            options: [
              { label: "Low", value: "low" },
              { label: "Moderate", value: "moderate" },
              { label: "High", value: "high" }
            ]
          },
          {
            name: "assessment_clinical_impression",
            label: "Clinical Interpretation / Impression",
            type: "textarea"
          },
          {
            name: "assessment_rehab_interpretation",
            label: "Rehab-Specific Interpretation (participation tolerance, endurance, therapy readiness)",
            type: "textarea"
          }
        ]
      }
    ]
  };

  const PLAN_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: [
          {
            name: "plan_nursing_interventions",
            label: "Nursing Interventions",
            type: "textarea"
          },
          {
            name: "plan_monitoring",
            label: "Monitoring Plan",
            type: "textarea"
          },
          {
            name: "plan_safety_measures",
            label: "Safety Measures / Precautions implemented",
            type: "textarea"
          },
          {
            name: "plan_therapy_coordination",
            label: "Therapy Coordination (PT / OT / SLP involvement)",
            type: "textarea"
          },
          {
            name: "plan_patient_family_education",
            label: "Patient and family Education",
            type: "textarea"
          },
          {
            name: "plan_reassessment_timeline",
            label: "Reassessment Timeline",
            type: "date"
          }
        ]
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
