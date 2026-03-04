import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
// features/neuro/assessments/registry.js
import MMTForm from "./MMTForm";
import TUG from "./TUGForm";
import MASForm from "./MASForm";
import SARAForm from "./SARAForm";
import BergBalanceScale from "./BBS";
import FMALEForm from "./FMALEForm";
import UpperExtremityAssessment from "./Flug";
import TISAssessment from "./TsiAssessment";
import ROMForm from "./RomForm";
import SLUMSAssessment from "./Slums";
import DLOTCAFullAssessment from "./Dlocta";
import DLOTCA_G_Full from "./Dlocta-g";
import MMSEAssessment from "./Mmse";
import LOTCAForm from "./Lotca";

export const NEURO_ASSESSMENT_REGISTRY = {
  mmt: MMTForm,
  tug: TUG,
  mas: MASForm,
  sara: SARAForm,
  bbs: BergBalanceScale,
  fma_le: FMALEForm,
  flug: UpperExtremityAssessment,
  tsi: TISAssessment,
  rom: ROMForm,
  sara: SARAForm,
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




export default function NeuroAssessment({ patient, onSubmit, onBack }) {
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
        // SUBJECTIVE
        { type: "input", name: "chief_complaint", label: "Chief Complaint" },
        { type: "input", name: "history_present_illness", label: "History of Present Illness" },

        // MEDICAL INFORMATION (as subheading)
        { type: "subheading", label: "Medical Information" },
        { type: "textarea", name: "family_history", label: "Family & Social History" },
        { type: "textarea", name: "medical_history", label: "Past Medical History" },
        { type: "input", name: "surgical_history", label: "Surgical History" },

        // COMMON NEURO CONDITIONS
        { type: "subheading", label: "Common Neurological Conditions" },
        {
          type: "checkbox-group",
          name: "neuro_conditions",
          label: "",
          options: [
            { label: "Stroke", value: "Stroke" },
            { label: "Traumatic Brain Injury", value: "TBI" },
            { label: "Spinal Cord Injury", value: "SCI" },
            { label: "Parkinson’s Disease", value: "Parkinsons" },
            { label: "Multiple Sclerosis", value: "MS" },
            { label: "Brain Tumor", value: "BrainTumor" },
            { label: "Other", value: "Other" }
          ]
        },
        {
          type: "textarea",
          name: "neuro_other_details",
          label: "Others",
          showIf: { includes: "Other", field: "neuro_conditions" }
        },

        // PRIOR LEVEL OF FUNCTION
        {
    type: "subheading",
    label: "Prior Level of Function (PLOF)"
  },
  {
    name: "plof_mobility",
    label: "Mobility prior to current condition",
    labelAbove: true,
    type: "radio",
    options: [
      { label: "Independent community ambulation", value: "community" },
      { label: "Independent household ambulation", value: "household" },
      { label: "Ambulated with aid", value: "aid" },
      { label: "Wheelchair dependent", value: "wheelchair" },
      { label: "Bedbound", value: "bedbound" }
    ]
  },
  {
    name: "plof_mobility_aid",
    label: "Specify aid used",
    type: "input",
    showIf: { field: "plof_mobility", equals: "aid" }
  },
  {
    name: "plof_transfers",
    label: "Transfers prior to current condition",
    labelAbove: true,
    type: "radio",
    options: [
      { label: "Independent", value: "independent" },
      { label: "Supervision", value: "supervision" },
      { label: "Assistance", value: "assistance" }
    ]
  },
  {
    name: "plof_adl",
    label: "ADL status prior to current condition",
    labelAbove: true,
    type: "radio",
    options: [
      { label: "Independent", value: "independent" },
      { label: "Minimal assistance", value: "minimal" },
      { label: "Moderate assistance", value: "moderate" },
      { label: "Dependent", value: "dependent" }
    ]
  },
  {
    name: "plof_work_role",
    label: "Work / role participation prior to condition",
    labelAbove: true,
    type: "radio",
    options: [
      { label: "Full-time work", value: "full_time" },
      { label: "Part-time work", value: "part_time" },
      { label: "Homemaker", value: "homemaker" },
      { label: "Student", value: "student" },
      { label: "Retired", value: "retired" }
    ]
  },
  {
    name: "plof_recreation",
    label: "Recreational / social participation",
    type: "radio",
    options: [
      { label: "Independent", value: "independent" },
      { label: "Limited", value: "limited" },
      { label: "None", value: "none" }
    ]
  },
  {
    name: "plof_remarks",
    label: "Remarks",
    type: "textarea"
  },
        // LIVING SITUATION & CONTEXT
        { type: "subheading", label: "Living Situation & Context" },
        {
          type: "radio",
          name: "residence_type",
          label: "Residence",
          options: [
            { label: "Home", value: "Home" },
            { label: "Rehab Facility", value: "Rehab" },
            { label: "LTC", value: "LTC" },
            { label: "Other", value: "Other" }
          ]
        },
        {
          type: "input",
          name: "residence_other",
          label: "Others",
          showIf: { field: "residence_type", equals: "Other" }
        },
        { type: "input", name: "lives_with", label: "Lives With" },
        {
          type: "radio",
          name: "caregiver_support",
          label: "Caregiver Support Level",
          options: [
            { label: "Independent", value: "Independent" },
            { label: "Supervision", value: "Supervision" },
            { label: "Partial Assist", value: "Partial" },
            { label: "Full Assist", value: "Full" }
          ]
        },
       
        { type: "textarea", name: "home_environment", label: "Home Environment" },
        {
          type: "radio",
          name: "house_type",
          label: "Type of House",
          options: [
            { label: "Single-storey", value: "Single" },
            { label: "Double-storey", value: "Double" },
            { label: "Apartment (Lift)", value: "Apartment" },
            { label: "Other", value: "Other" }
          ]
        },
        {
          type: "input",
          name: "house_type_other",
          label: "Others",
          placeholder: "Enter house type",
          showIf: { field: "house_type", equals: "Other" }
        },
        { type: "radio", name: "toilet_type", label: "Type of Toilet", options: ["Sitting", "Squatting"] },

        // EDUCATION
        { type: "subheading", label: "Educational Level" },
        {
          type: "single-select",
          name: "education_level",
          label: "Highest Education",
          options: [
            { label: "Primary", value: "Primary" },
            { label: "Secondary", value: "Secondary" },
            { label: "Diploma", value: "Diploma" },
            { label: "Degree", value: "Degree" },
            { label: "Master", value: "Master" },
            { label: "PhD", value: "PhD" },
            { label: "Other", value: "Other" }
          ]
        },
        {
          type: "input",
          name: "education_level_other",
          label: "Please specify",
          showIf: { field: "education_level", equals: "Other" }
        },

        // DRIVING & LICENSING
        { type: "subheading", label: "Driving & Licensing" },
        {
          type: "single-select",
          name: "driving_license_type",
          label: "Driving License Type",
          options: [
            { label: "None – No Driving License", value: "None" },
            { label: "B2 – Motor Car (Private Vehicle)", value: "B2" },
            { label: "D – Heavy Motor Vehicle", value: "D" },
            { label: "E – Heavy Trailer Vehicle", value: "E" },
            { label: "GDL – Goods Driving License", value: "GDL" },
            { label: "PSV – Public Service Vehicle", value: "PSV" },
            { label: "Other", value: "Other" }
          ]
        },
        {
          type: "input",
          name: "driving_license_other",
          label: "Please specify",
          showIf: { field: "driving_license_type", equals: "Other" }
        },
        { type: "radio", name: "returned_to_driving", label: "Returned to Driving Post-Injury", options: ["Yes", "No"] },
        {
          type: "input",
          name: "driving_duration_distance",
          label: "Duration & Distance",
          showIf: { field: "returned_to_driving", equals: "Yes" }
        },

        // CLIENT EXPECTATIONS / GOALS
        { type: "subheading", label: "Client Expectations / Patient Goals" },
        { type: "textarea", name: "patient_goals", label: "" }
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
          name: "consent_risks_benefits",
          type: "checkbox-group",
          options: [{ label: "Risks/benefits explained", value: "yes" }]
        },
        {
          name: "consent_verbalized",
          type: "checkbox-group",
          options: [{ label: "Patient verbalized understanding", value: "yes" }]
        },
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
        { type: "subheading", label: "Functional & Mobility Status" },
        {
          name: "neuro_scales",
          type: "assessment-launcher",
          options: [
            { label: "Range of Motion (ROM)", value: "rom" },
            { label: "Manual Muscle Test (MMT)", value: "mmt" },
            { label: "Muscle Tone (MAS)", value: "mas" },
            { label: "Scale for the Assessment and Rating of Ataxia (SARA)", value: "sara" },
            { label: "Fugl Meyer Assessment (FMA-UE)", value: "flug" },
            { label: "Trunk Impairment Scale (TIS)", value: "tsi" },
            { label: "Box & Block", value: "fma_le" },
            { label: "Functional Independence Measure (FIM)", value: "FIM" },
            { label: "Action Research Arm Test(ARAT)", value: "motor_mas" },
            { label: "Montreal Cognitive Assessment (MoCA)", value: "moca" },
            { label: "Jebsen Hand Function", value: "bbs" }
          ]
        },
        { type: "radio", name: "dominant_hand", label: "Dominant Hand", options: ["Right", "Left"] },
        {
          type: "checkbox-group",
          name: "affected_side",
          label: "Affected Side",
          options: [
            { label: "LUE – Left Upper Extremity", value: "LUE" },
            { label: "RUE – Right Upper Extremity", value: "RUE" },
            { label: "LLE – Left Lower Extremity", value: "LLE" },
            { label: "RLE – Right Lower Extremity", value: "RLE" }
          ]
        },
        {
          type: "radio",
          name: "assist_level",
          label: "Assist Level",
          labelAbove: true,
          options: [
            { label: "Independent", value: "Independent" },
            { label: "Supervision", value: "Supervision" },
            { label: "SBA – Stand-By Assist", value: "SBA" },
            { label: "CGA – Contact Guard Assist", value: "CGA" },
            { label: "Min Assist", value: "MinA" },
            { label: "Mod Assist", value: "ModA" },
            { label: "Max Assist", value: "MaxA" },
            { label: "Dependent", value: "Dependent" }
          ]
        },

        { type: "subheading", label: "Neuro Factors Observed" },
        {
          type: "checkbox-group",
          name: "neuro_factors",
          label: "",
          options: [
            { label: "Hemiparesis", value: "Hemiparesis" },
            { label: "Ataxia", value: "Ataxia" },
            { label: "Spasticity", value: "Spasticity" },
            { label: "Hypotonia", value: "Hypotonia" },
            { label: "Neglect", value: "Neglect" },
            { label: "Apraxia", value: "Apraxia" },
            { label: "Sensory Loss", value: "SensoryLoss" },
            { label: "Cognitive Deficit", value: "CognitiveDeficit" },
            { label: "Visual-Perceptual Deficit", value: "VisualPerceptual" }
          ]
        },

        { type: "subheading", label: "Motor Assessment" },
        { type: "subheading", label: "Tone" },
        {
          type: "radio",
          name: "tone_type",
          label: "Tone Type",
          position: "side",
          options: [
            { label: "Normal", value: "Normal" },
            { label: "Hypotonic", value: "Hypotonic" },
            { label: "Hypertonic", value: "Hypertonic" }
          ]
        },
        { type: "input", name: "mas_grade", label: "MAS Grade" },

        { type: "subheading", label: "AROM" },
        {
          type: "row",
          fields: [
            { type: "input", name: "arom_rue", label: "Right Upper Extremity (RUE)" },
            { type: "input", name: "arom_lue", label: "Left Upper Extremity (LUE)" }
          ]
        },

        { type: "subheading", label: "Strength (MMT)" },
        {
          type: "row",
          fields: [
            { type: "input", name: "mmt_rue", label: "Right Upper Extremity (RUE) (/5)" },
            { type: "input", name: "mmt_lue", label: "Left Upper Extremity (LUE) (/5)" }
          ]
        },

        { type: "subheading", label: "Coordination" },
        { type: "radio", name: "finger_to_nose", label: "Finger-to-Nose", options: ["Intact", "Impaired"] },
        { type: "radio", name: "rapid_alt_movement", label: "Rapid Alternating Movement", options: ["Intact", "Impaired"] },
        { type: "input", name: "functional_reach_cm", label: "Functional Reach (cm)" },

        { type: "subheading", label: "Fine Motor" },
        { type: "input", name: "nine_hole_peg", label: "9-Hole Peg Test (sec)" },
        { type: "radio", name: "functional_grasp", label: "Functional Grasp", options: ["Effective", "Ineffective"] },

        { type: "subheading", label: "Balance & Postural Control" },
        { type: "radio", name: "sitting_balance", label: "Sitting Balance", options: ["Static", "Dynamic", "Poor"] },
        { type: "input", name: "standing_tolerance", label: "Standing Tolerance (minutes)" },
        { type: "radio", name: "loss_of_balance_adl", label: "Loss of Balance During ADL", options: ["Yes", "No"] },
        { type: "input", name: "assistive_device_used", label: "Assistive Device Used" },

        { type: "subheading", label: "Ambulatory Status – Short Distance" },
        {
          type: "radio",
          name: "ambulatory_status",
          label: "Ambulatory Status",
          labelAbove: true,
          options: [
            { label: "Independent Walking", value: "IndependentWalking" },
            { label: "Wheelchair", value: "Wheelchair" },
            { label: "Quadripod (Narrow/Wide)", value: "Quadripod" },
            { label: "Walking Stick", value: "WalkingStick" },
            { label: "Walking Frame", value: "WalkingFrame" },
            { label: "Elbow Crutches", value: "ElbowCrutches" },
            { label: "Other", value: "Other" }
          ]
        },
        {
          type: "input",
          name: "ambulatory_status_other",
          label: "Please specify",
          showIf: { field: "ambulatory_status", equals: "Other" }
        },

        { type: "subheading", label: "Clinical Observations / Tests" },
        {
          type: "checkbox-group",
          name: "clinical_tests",
          label: "Clinical Tests",
          options: [
            { label: "Strength Testing", value: "StrengthTesting" },
            { label: "Sensory Testing", value: "SensoryTesting" },
            { label: "Balance Testing", value: "BalanceTesting" },
            { label: "Fine Motor / Dexterity Testing", value: "FineMotorTesting" }
          ]
        }
      ]
    }
  ]
};

// ...existing code...
const ASSESSMENT_SCHEMA = {
  title: "Assessment",
  sections: [
    {
      fields: [
        { type: "subheading", label: "Problem List" },
        { type: "textarea", name: "problem_list", label: "Problem List" },

        { type: "subheading", label: "Clinical Impression" },
        { type: "textarea", name: "functional_limitations", label: "Functional Limitations" },
        { type: "textarea", name: "clinical_diagnosis", label: "Diagnosis" },

        { type: "subheading", label: "Rehabilitation Potential" },
        {
          type: "radio",
          name: "rehab_potential",
          label: "Select Potential Level",
          options: ["Excellent", "Good", "Fair", "Poor"]
        },
        { type: "info-text", name: "rehab_note", text: "(Based on cognition, motivation, severity, comorbidities)" }
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

        { type: "subheading", label: "Intervention Plan" },
{
  type: "checkbox-group",
  name: "intervention_plan",
  label: "Intervention Plan",
  options: [
    { label: "ADL Retraining", value: "ADLRetraining" },
    { label: "IADL Retraining", value: "IADLRetraining" },
    { label: "Muscle Tone Management", value: "MuscleTone" },
    { label: "GMI Training", value: "GMI" },
    { label: "Constraint Induced Movement Therapy (CIMT)", value: "CIMT" },
    { label: "Functional ROM Exercise", value: "FunctionalROM" },
    { label: "Functional Strengthening exercise", value: "Strengthening" },
    { label: "Fine Motor Training", value: "FineMotor" },
    { label: "Bobath/NDT Therapy", value: "BobathNDT" },
    { label: "Equipment Prescription (Lightweight WC, Commode WC)", value: "EquipmentPrescription" },
    { label: "Assistive and adaptive equipment Recommendation", value: "AssistiveEquipment" },
    { label: "Driving and riding Assessment", value: "DrivingAssessment" },
    { label: "Others", value: "Others" }
  ]
},
{
  type: "textarea",
  name: "intervention_plan_others",
  label: "If others, specify",
  showIf: { field: "intervention_plan", includes: "Others" }
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
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const today = new Date();

  const calculateDuration = (onset) => {
    if (!onset) return "-";
    const onsetDate = new Date(onset);
    const diffMs = today - onsetDate;

    if (diffMs < 0) return "-";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  const tabOrder = ["subjective", "objective", "assessment", "plan"];

  // function NeuroPatientInfo({ patient }) {
  //   if (!patient) return null;

  // return (
  //   <div style={section}>
  //     <div style={patientGrid}>

  //       <div><b>Name:</b> {patient.name}</div>
  //       <div><b>IC:</b> {patient.id}</div>
  //       <div><b>DOB:</b> {formatDate(patient.dob)}</div>
  //       <div><b>Age:</b> {patient.age}</div> 
  //       {/* <div><b>ICD:</b> {patient.icd}</div> */}
  //       <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
  //       {/* <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
  //       <div>
  //         <b>Duration of Diagnosis:</b>{" "}
  //         {calculateDuration(patient.date_of_onset)}
  //       </div>
  //   */}


  //     </div>
  //   </div>
  // );

  // }

  function NeuroPatientInfo({ patient }) {
    if (!patient) return null;

    return (
      <div style={section}>
        <div style={patientGrid}>

          <div><b>Name:</b> {patient.name}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {formatDate(patient.dob)}</div>
          <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
          <div><b>ICD:</b> {patient.icd}</div>
          <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
          <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
          <div>
            <b>Duration of Diagnosis:</b>{" "}
            {calculateDuration(patient.date_of_onset)}
          </div>
          <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
          <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
          <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
          <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
          <div><b>Education Level:</b> {patient.education_background || "-"}</div>
          <div><b>Occupation:</b> {patient.occupation || "-"}</div>
          <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
          <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
        </div>
      </div>
    );

  }

  return (
    <div style={mainContent}>

      {/* ===== PATIENT INFORMATION CARD ===== */}
      <CommonFormBuilder
        schema={NEURO_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => { }}
      >
        <NeuroPatientInfo patient={patient} />
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