
import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
// features/neuro/assessments/registry.js
import MMTForm from "../../PT/components/MMTForm";
import TUG from "../../PT/components/TUGForm";
import MASForm from "../../PT/components/MASForm";
import SARAForm from "./SARAForm";
import BergBalanceScale from "./BBS";
import UpperExtremityAssessment from "./Flug";
import TISAssessment from "./TsiAssessment";
import ROMForm from "./RomForm";
import FIMAssessment from "./Fim";
import ARATAssessment from "./Arat";
import JHFTAssessment from "./Jfht";
import BoxAndBlockTest from "./BoxBlockTest";
import SixMWTForm from "../../PT/components/SixMWTForm";
import PurduePegboardTest from "./ppt";
import ScarAssessmentForm from "./vas";
import DASHAssessment from "./Dash";
import PatientCard from "../../../shared/cards/PatientCard";
import GripStrengthForm, { GripOnlyForm, PinchOnlyForm } from "../../PT/components/GripStrengthForm";

export const NEURO_ASSESSMENT_REGISTRY = {
  rom: ROMForm,
  mmt: MMTForm,
  arat: ARATAssessment,
  bbt:BoxAndBlockTest,
  jfht: JHFTAssessment,
vas:ScarAssessmentForm,
  bbs: BergBalanceScale,
  dash: DASHAssessment,
  ppt: PurduePegboardTest,
  tug: TUG,
  six_mwt: SixMWTForm,
  sixmwt: SixMWTForm,
  grip_strength:  GripOnlyForm,
  pinch_strength: PinchOnlyForm,
};

/* ===================== OPTIONS ===================== */

const YES_NO = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];
const Static_Dynamic = [
  { label: "Static", value: "static" },
  { label: "Dynamic", value: "dynamic" }
];
const Functional_assessment = [
  { label: "Independent", value: "independent" },
  { label: "Supervision", value: "supervision" },
  { label: "Minimal Assistance", value: "mia" },
  { label: "Moderate Assistance", value: "moa" },
  { label: "Maximal Assistance", value: "maa" },
  { label: "Dependent", value: "dependent" },
  { label: "Not Assessed / NotApplicable", value: "NA" },

];
const PROGNOSIS_OPTIONS = [
  { label: "Excellent", value: "excellent" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" }
];

const AMBULATORY_OPTIONS = [
  { label: "Independent walking", value: "independent" },
  { label: "Wheelchair", value: "wheelchair" },
  { label: "Quadripod narrowbase", value: "Quadripodnarrowbase" },
  { label: "Quadripod wide base", value: "Quadripodwidebase" },
  { label: "Walking stick", value: "stick" },
  { label: "Walking frame", value: "frame" },
  { label: "Elbow crutches", value: "crutches" },
  { label: "Others", value: "others" }
];
// const PATIENT_ENVIRONMENT_SCHEMA = {
//   title: "Patient Environment",
//   sections: [
//     {
//       fields: [

//         /* ================= EQUIPMENT OWNED ================= */
//         {
//           name: "equipment_owned",
//           label: "List of Equipment Owned",
//           type: "checkbox-group",
//           options: [
//             { label: "PERKESO", value: "perkeso" },
//             { label: "NGO", value: "ngo" },
//             { label: "Self-purchased", value: "self" },
//             { label: "Others", value: "others" }
//           ]
//         },

//         /* ===== CONDITIONAL TEXT AREAS ===== */
//         {
//           name: "equipment_perkeso",
//           label: "PERKESO Equipment Details",
//           type: "textarea",
//           showIf: { field: "equipment_owned", includes: "perkeso" }
//         },
//         {
//           name: "equipment_ngo",
//           label: "NGO Equipment Details",
//           type: "textarea",
//  showIf: { field: "equipment_owned", includes: "ngo" }
//         },
//         {
//           name: "equipment_self",
//           label: "Self-purchased Equipment Details",
//           type: "textarea",
//  showIf: { field: "equipment_owned", includes: "self" }
//         },
//         {
//           name: "equipment_others",
//           label: "Other Equipment Details",
//           type: "textarea",
//  showIf: { field: "equipment_owned", includes: "others" }
//         },

//         /* ================= HOME ENVIRONMENT ================= */
//         {
//           name: "home_environment",
//           label: "Home Environment",
//           type: "textarea"
//         },

//         /* ================= TYPE OF HOUSE ================= */
//         {
//           name: "house_type",
//           label: "Type of House",
//           type: "single-select",
//           options: [
//             { label: "Single-storey", value: "single" },
//             { label: "Double-storey", value: "double" },
//             { label: "Apartment with elevator", value: "apartment" },
//             { label: "Others", value: "others" }
//           ]
//         },
//         {
//           name: "house_type_other",
//           label: "If Others, specify",
//           type: "textarea",
//           showIf: { field: "house_type", equals: "others" }
//         },

//         /* ================= TYPE OF TOILET ================= */
//         {
//           name: "toilet_type",
//           label: "Toilet Type",
//           type: "checkbox-group",
//           options: [
//             { label: "Sitting", value: "sitting" },
//             { label: "Squatting", value: "squatting" }
//           ]
//         },

//         /* ================= EDUCATION LEVEL ================= */
//         {
//           name: "education_level",
//           label: "Education Level",
//           type: "single-select",
//           options: [
//             { label: "Primary", value: "primary" },
//             { label: "Secondary", value: "secondary" },
//             { label: "Diploma", value: "diploma" },
//             { label: "Degree", value: "degree" },
//             { label: "Master", value: "master" },
//             { label: "PhD", value: "phd" },
//             { label: "Others", value: "others" }
//           ]
//         },
//         {
//           name: "education_other",
//           label: "If Others, specify",
//           type: "textarea",
//           showIf: { field: "education_level", equals: "others" }
//         }

//       ]
//     }
//   ]
// };




export default function MusculoskeletalAssessment({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `neuro_assessment_draft_${patient.id}`
    : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setValues(JSON.parse(saved).values || {});
    }
  }, [storageKey]);
  useEffect(() => {
    if (!patient) return;

    setValues(v => ({
      ...v,
      pmh_from_registration:
        patient.medical_history || "No data available",

      family_social_from_registration:
        patient.diagnosis_history || "No data available"
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
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
      alert("Neuro draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Neuro assessment submitted");
  };
const SUBJECTIVE_SCHEMA = {
  title: "",

  sections: [
    {
      fields: [

        {
          type: "textarea",
          name: "chief_complaint",
          label: "Chief Complaint"
        },

        /* Pain Assessment */

        {
          type: "radio",
          name: "pain_location",
          label: "Pain Location",
          labelAbove: true,
          options: [
            { label: "Neck", value: "neck" },
            { label: "Shoulder", value: "shoulder" },
            { label: "Back", value: "back" },
            { label: "Upper Limb (UE)", value: "ue" },
            { label: "Lower Limb (LE)", value: "le" },
            { label: "Multiple", value: "multiple" }
          ]
        },

        {
          type: "scale-slider",
          name: "pain_intensity",
          label: "Pain Intensity (NPRS 0–10)",
          min: 0,
          max: 10,
          step: 1,
          showValue: true
        },

        {
          type: "radio",
          name: "pain_behavior",
          label: "Pain Behavior",
          labelAbove: true,
          options: [
            { label: "With movement", value: "movement" },
            { label: "Prolonged position", value: "prolonged_position" },
            { label: "Lifting", value: "lifting" },
            { label: "End of day", value: "end_day" }
          ]
        },

        {
          type: "textarea",
          name: "neurological_symptoms",
          label: "Neurological / Sensory Symptoms (e.g. numbness, tingling, radiation)"
        },

        /* History */

        {
          type: "textarea",
          name: "history_present_illness",
          label: "History of Present Illness"
        },


        {
          type: "textarea",
          name: "medication_pain_management",
          label: "Medication / Pain Management (if relevant)"
        },

        {
          type: "textarea",
          name: "client_goals_expectations",
          label: "Client's Goals & Expectations"
        },

        {
          type: "subheading",
          label: "F. Driving & Community Mobility"
        },

        /* Driving */

        {
          type: "radio",
          name: "driving_license_type",
          label: "Driving License Type",
          labelAbove: true,
          options: [
            { label: "None", value: "none" },
            { label: "B2", value: "b2" },
            { label: "D", value: "d" },
            { label: "E", value: "e" },
            { label: "GDL", value: "gdl" },
            { label: "PSV", value: "psv" }
          ]
        },

        {
          type: "radio",
          name: "driving_status_post_injury",
          label: "Driving Status Post-Injury",
          labelAbove: true,
          options: [
            { label: "Not driving", value: "not_driving" },
            { label: "Short distance only", value: "short_distance" },
            { label: "Independent driving", value: "independent" }
          ]
        },

        {
          type: "radio",
          name: "community_mobility_limitation",
          label: "Community Mobility Limitation",
          labelAbove: true,
          options: [
            { label: "Public transport", value: "public_transport" },
            { label: "Walking tolerance", value: "walking_tolerance" },
            { label: "Riding", value: "riding" },
            { label: "None", value: "none" }
          ]
        },

        {
          type: "textarea",
          name: "mobility_notes",
          label: "Notes"
        }

      ]
    }
  ]
};


const CONSENT_AND_REFERRAL_SCHEMA = {
  title: "",
  sections: [
    {
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "consent_obtained",
              type: "checkbox-group",
              options: [{ label: "Consent obtained", value: "yes" }]
            },
            {
              name: "consent_upload",
              label: "Upload",
              type: "file-upload",
              showIf: { field: "consent_obtained", includes: "yes" }
            }
          ]
        },
        {
          name: "hep_reviewed",
          type: "checkbox-group",
          options: [{ label: "Home Exercise Program (HEP) reviewed and demonstrated", value: "yes" }]
        },
        {
          name: "current_diagnosis",
          label: "Current Diagnosis",
          type: "multi-select-dropdown",
          options: [
            { label: "Stroke", value: "stroke" },
            { label: "Traumatic Brain Injury", value: "tbi" },
            { label: "Parkinson Disease", value: "parkinson" },
            { label: "Spinal Cord Injury", value: "sci" },
            { label: "Peripheral Neuropathy", value: "peripheral_neuropathy" },
            { label: "Ligament injuries", value: "ligament_injuries" },
            { label: "Ataxia", value: "ataxia" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "current_diagnosis_other",
          label: "Other Diagnosis (specify)",
          type: "textarea",
          showIf: { field: "current_diagnosis", includes: "others" }
        },
        {
          name: "equipment_owned",
          label: "List of Equipment Owned",
          type: "checkbox-group",
          options: [
            { label: "PERKESO", value: "perkeso" },
            { label: "NGO", value: "ngo" },
            { label: "Self-purchased", value: "self" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "equipment_perkeso",
          label: "PERKESO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "perkeso" }
        },
        {
          name: "equipment_ngo",
          label: "NGO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "ngo" }
        },
        {
          name: "equipment_self",
          label: "Self-purchased Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "self" }
        },
        {
          name: "equipment_others",
          label: "Other Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "others" }
        }
        ,
        { type: "subheading", label: "Referral Information" },
        {
          name: "referred_by",
          label: "Referred by",
          type: "input",
          readOnly: true
        },
        {
          name: "referral_reasons",
          label: "Referral Reasons",
          type: "textarea",
          readOnly: true
        }
      ]
    }
  ]
};
  const NEURO_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: [

    ]
  };
const OBJECTIVE_SCHEMA = {
  title: "",

  sections: [
    {
      fields: [

        {
          type: "subheading",
          label: "1. Physical Status"
        },

        {
          type: "radio",
          name: "dominant_hand",
          label: "Dominant Hand",
          options: [
            { label: "Right", value: "right" },
            { label: "Left", value: "left" }
          ]
        },

        {
          type: "checkbox-group",
          name: "affected_area",
          label: "Affected Area",
          labelAbove: true,
          options: [
            { label: "Left UE", value: "left_ue" },
            { label: "Right UE", value: "right_ue" },
            { label: "Left LE", value: "left_le" },
            { label: "Right LE", value: "right_le" },
            { label: "Others", value: "others" }
          ]
        },

        {
          type: "input",
          name: "affected_area_other",
          label: "Other Affected Area",
          showIf: {
            field: "affected_area",
            includes: "others"
          }
        },

        {
          type: "subheading",
          label: "1b. Sensory Screening (Quick – OT)"
        },

        {
          type: "radio",
          name: "sensation_status",
          label: "Sensation Status",
          options: [
            { label: "Intact", value: "intact" },
            { label: "Impaired", value: "impaired" },
            { label: "Absent", value: "absent" }
          ]
        },

        {
          type: "checkbox-group",
          name: "sensory_domains",
          label: "Sensory Domains Affected",
          showIf: { field: "sensation_status", equals: "impaired" },
          options: [
            { label: "Light touch", value: "light_touch" },
            { label: "Pain (sharp/dull)", value: "pain" },
            { label: "Temperature", value: "temperature" },
            { label: "Proprioception", value: "proprioception" },
            { label: "Hypersensitivity", value: "hypersensitivity" }
          ]
        },

        {
          type: "textarea",
          name: "functional_impact",
          label: "Functional Impact on ADL / Work"
        },

        {
          type: "checkbox-group",
          name: "functional_impact_area",
          label: "Affected Limb (Functional Impact)",
          options: [
            { label: "Left UE", value: "left_ue" },
            { label: "Right UE", value: "right_ue" },
            { label: "Left LE", value: "left_le" },
            { label: "Right LE", value: "right_le" },
            { label: "Others", value: "others" }
          ]
        },

        {
          type: "input",
          name: "functional_impact_other",
          label: "Other Area",
          showIf: {
            field: "functional_impact_area",
            includes: "others"
          }
        },

        {
          type: "subheading",
          label: "2. Mobility & Ambulation"
        },

        {
          type: "radio",
          name: "weight_bearing_status",
          label: "Weight Bearing Status",
          options: [
            { label: "Full WB", value: "full_wb" },
            { label: "Partial WB", value: "partial_wb" },
            { label: "Non-WB", value: "non_wb" }
          ]
        },

        {
          type: "radio",
          name: "short_distance_mobility",
          label: "Short Distance Mobility",
          options: [
            { label: "Independent", value: "independent" },
            { label: "Aid-assisted", value: "assist" },
            { label: "Wheelchair", value: "wheelchair" }
          ]
        },

        {
          type: "radio",
          name: "long_distance_mobility",
          label: "Long Distance Mobility",
          options: [
            { label: "Independent", value: "independent" },
            { label: "Aid-assisted", value: "assist" },
            { label: "Wheelchair", value: "wheelchair" }
          ]
        },

        {
          type: "subheading",
          label: "3. Standardised Outcome Measures"
        },

        {
          type: "assessment-launcher",
          name: "upper_limb_measures",
          label: "",
          options: [
            { label: "ROM ", value: "rom" },
            { label: "Manual Muscle Testing (MMT)", value: "mmt" },
            { label: "QuickDASH", value: "dash" },
            { label: "Action Research Arm Test (ARAT)", value: "arat" },
            { label: "Jebsen Hand Function Test", value: "jfht" },
            { label: "Box and Block Test", value: "bbt" },
            { label: "Grip strength", value: "grip_strength" },
            { label: "Pinch strength", value: "pinch_strength" },
            { label: "Purdue Pegboard Test", value: "ppt" },
            { label: "Timed Up and Go (TUG)", value: "tug" },
            { label: "6-Minute Walk Test", value: "six_mwt" },
            { label: "Berg Balance Scale (BBS)", value: "bbs" },
            { label: "Oswestry Disability Index (ODI)", value: "odi" },
            { label: "Visual Analogue Scale (VAS)", value: "vas" }
          ]
        },
        {
          type: "subheading",
          label: "H. Functional Performance"
        },

        {
          type: "single-select",
          name: "adl_performance",
          label: "ADL Performance Level",
          options: [
            { label: "Independent", value: "independent" },
            { label: "Modified Independent", value: "modified_independent" },
            { label: "Assistance", value: "assistance" },
            { label: "Dependent", value: "dependent" }
          ]
        },

        {
          type: "checkbox-group",
          name: "observed_limitations",
          label: "Observed Limitations",
          options: [
            { label: "Dressing", value: "dressing" },
            { label: "Toileting", value: "toileting" },
            { label: "Transfers", value: "transfers" },
            { label: "Mobility", value: "mobility" },
            { label: "Household tasks", value: "household_tasks" }
          ]
        },

        {
          type: "checkbox-group",
          name: "postural_movement_issues",
          label: "Postural & Movement Issues",
          options: [
            { label: "Poor endurance", value: "endurance" },
            { label: "Poor body mechanics", value: "body_mechanics" },
            { label: "Reduced balance", value: "balance" }
          ]
        },

        {
          type: "textarea",
          name: "therapist_observation_notes",
          label: "Therapist Observation Notes"
        }

      ]
    }
  ]
};

// ...existing code...
const ASSESSMENT_SCHEMA = {
  title: "",

  sections: [
    {
      fields: [

        {
          type: "textarea",
          name: "problem_list",
          label: "Problem List"
        },

        {
          type: "radio",
          name: "clinical_impression",
          label: "Clinical Impression",
          labelAbove: true,
          options: [
            { label: "Pain dominant", value: "pain_dominant" },
            { label: "Strength deficit", value: "strength_deficit" },
            { label: "Mobility limitation", value: "mobility_limitation" },
            { label: "Work-related", value: "work_related" },
            { label: "Others", value: "others" }
          ]
        },

        {
          type: "textarea",
          name: "clinical_impression_notes",
          label: "Clinical Impression Notes",
          showIf: {
            field: "clinical_impression",
            equals: "others"
          }
        },

        {
          type: "radio",
          name: "rehabilitation_potential",
          label: "Rehabilitation Potential",
          labelAbove: true,
          options: [
            { label: "Excellent", value: "excellent" },
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" }
          ]
        },

       

      
      ]
    }
  ]
};

const PLAN_SCHEMA = {
  title: "",

  sections: [
    {
      fields: [

     { type: "subheading", label: "Short Term Goals (2–4 Weeks)" },
        { type: "dynamic-goals", name: "short_term_goals" },
        
        { type: "subheading", label: "Long Term Goals (6–12 Weeks)" },
        { type: "dynamic-goals", name: "long_term_goals" },
        
        {
          label: "Therapeutic Intervention",
          type: "checkbox-group",
          name: "therapeutic_intervention",
          label: "Therapeutic Intervention",
          options: [
            { label: "ROM exercise", value: "rom_exercise" },
            { label: "Strengthening", value: "strengthening" },
            { label: "Endurance training", value: "endurance_training" },
            { label: "Joint protection", value: "joint_protection" },
            { label: "Pain management", value: "pain_management" },
            { label: "Fine motor training", value: "fine_motor_training" }
          ]
        },

        {
          label: "Functional Training",
          type: "checkbox-group",
          name: "functional_training",
          label: "Functional Training",
          options: [
            { label: "ADL", value: "adl" },
            { label: "IADL", value: "iadl" },
            { label: "Work simulation", value: "work_simulation" },
            { label: "Driving", value: "driving" },
            { label: "Riding", value: "riding" }
          ]
        },

      
        
        {
          type: "checkbox-group",
          name: "assistive_device_plan",
          label: "Assistive / Adaptive Device Plan",
          options: [
            { label: "Splint", value: "splint" },
            { label: "Mobility aid", value: "mobility_aid" },
            { label: "Home modification", value: "home_modification" },
            { label: "Nil", value: "nil" }
          ]
        }

      ]
    }
  ]
};

  const TREATMENT_PLAN_LABEL_MAP = {
    bed_mobility: "Bed mobility training",
    transfer: "Transfer training",
    MTM: "Muscle tone management",
    SBT: "Sitting balance training",
    StBT: "Standing balance training",
    FRE: "Functional ROM Exercise",
    strength: "Functional strengthening exercise",
    endurance: "Endurance training",
    FT: "Functional training",
    gait: "Gait training",
    WAP: "Walking aid prescription",
    bobath: "Bobath / NDT",
    others: "Others"
  };

  /* ===================== UI ===================== */
  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  const tabOrder = ["subjective", "objective", "assessment", "plan"];

  const [patientHistory, setPatientHistory] = useState({
  past_medical_history: patient?.medical_history || "",
  past_family_history: patient?.family_medical_history || "",
  alerts_and_allergies: patient?.alerts_and_allergies_history || ""
});
function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
  if (!patient) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return "-";
    }
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        fontSize: 14
      }}>
        <div><b>Name:</b> {patient.name}</div>
        <div><b>IC:</b> {patient.id}</div>
        <div><b>DOB:</b> {formatDate(patient.dob)}</div>

        <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
        <div><b>ICD:</b> {patient.icd}</div>
        <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>

        <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
        <div><b>Duration of Diagnosis:</b> -</div>
        <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>

        <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
        <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
        <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>

        <div><b>Education Level:</b> {patient.education_background || "-"}</div>
        <div><b>Occupation:</b> {patient.occupation || "-"}</div>
        <div><b>Work Status:</b> {patient.employment_status || "-"}</div>

        <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
        <div><b>Marital Status:</b> {patient.marital_status || "-"}</div>

        {/* ===== HISTORY ===== */}
        <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
          <h3>Patient History</h3>

          <div>
            <b>Past Medical History</b>
            <textarea
              style={textarea}
              value={patientHistory.past_medical_history}
              onChange={(e) =>
                setPatientHistory(prev => ({
                  ...prev,
                  past_medical_history: e.target.value
                }))
              }
            />
          </div>

          <div>
            <b>Family History</b>
            <textarea
              style={textarea}
              value={patientHistory.past_family_history}
              onChange={(e) =>
                setPatientHistory(prev => ({
                  ...prev,
                  past_family_history: e.target.value
                }))
              }
            />
          </div>

          <div>
            <b>Allergies</b>
            <textarea
              style={textarea}
              value={patientHistory.alerts_and_allergies}
              onChange={(e) =>
                setPatientHistory(prev => ({
                  ...prev,
                  alerts_and_allergies: e.target.value
                }))
              }
            />
          </div>

          <button style={alertBtn}>🚨 Alerts</button>
        </div>
      </div>
    </div>
  );
}
const textarea = {
  width: "100%",
  minHeight: 90,
  marginTop: 6,
  marginBottom: 12,
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 14,
  resize: "vertical"
};

const alertBtn = {
  marginTop: 10,
  padding: "10px 20px",
  borderRadius: 6,
  border: "1.5px solid #007bff",
  background: "#007bff",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer"
};
  return (
    <div style={mainContent}>

      {/* ===== PATIENT INFORMATION CARD ===== */}
      <CommonFormBuilder
        schema={NEURO_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => { }}
      >
        <PatientInformationBlock patient={patient} patientHistory={patientHistory} setPatientHistory={setPatientHistory}/>
      </CommonFormBuilder>

      {/* ===== NEW ENVIRONMENT CARD ===== */}
   <CommonFormBuilder
      schema={CONSENT_AND_REFERRAL_SCHEMA}
      values={values}
      onChange={onChange}
    />

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
      {/* ===== TAB CONTENT ===== */}
      <CommonFormBuilder
        schema={schemaMap[activeTab]}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        assessmentRegistry={NEURO_ASSESSMENT_REGISTRY}
      >

        {/* 🔹 ADD MATRIX ONLY IN PLAN TAB */}
        {activeTab === "plan" &&
          Array.isArray(values.treatment_plan) &&
          values.treatment_plan.length > 0 && (

            <div style={{ marginTop: 20 }}>
              <h3>Treatment Plan Schedule</h3>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9" }}>
                    <th style={th}>Treatment</th>
                    <th style={th}>Frequency</th>
                    <th style={th}>Duration</th>
                  </tr>
                </thead>

                <tbody>
                  {values.treatment_plan.map(plan => (
                    <tr key={plan}>
                      <td style={td}>
                        <b>{TREATMENT_PLAN_LABEL_MAP[plan] || plan}</b>
                      </td>


                      <td style={td}>
                        <input
                          type="text"
                          placeholder="e.g. 5 days/week"
                          value={values[`freq_${plan}`] || ""}
                          onChange={e =>
                            onChange(`freq_${plan}`, e.target.value)
                          }
                        />
                      </td>

                      <td style={td}>
                        <input
                          type="text"
                          placeholder="e.g. 30 mins / 6 weeks"
                          value={values[`dur_${plan}`] || ""}
                          onChange={e =>
                            onChange(`dur_${plan}`, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button
              style={submitBtn}
              onClick={() => {
                const idx = tabOrder.indexOf(activeTab);
                const next = tabOrder[Math.min(tabOrder.length - 1, idx + 1)];
                setActiveTab(next);
              }}
            >
              Next
            </button>
          ) : (
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Neuro Assessment
            </button>
          )}
        </div>

      </CommonFormBuilder>


    </div>
  );
}

/* ===================== STYLES ===================== */

const mainContent = { margin: "0 auto" };

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
};
const section = {
  marginBottom: 24
};

const sectionTitle = {
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 12,
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: 6,
  color: "#0F172A"
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
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
const th = {
  border: "1px solid #ccc",
  padding: 10,
  textAlign: "left"
};

const td = {
  border: "1px solid #ccc",
  padding: 10
};