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

export const NEURO_ASSESSMENT_REGISTRY = {
  mmt: MMTForm,
  tug: TUG,
  mas: MASForm,
  sara: SARAForm,
  bbs: BergBalanceScale,
  fma_le: FMALEForm,
  flug: UpperExtremityAssessment,
  tsi: TISAssessment,
  rom: ROMForm
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




export default function AmputeeAssessment({ patient, onSubmit, onBack }) {
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

  /* ===================== SCHEMAS ===================== */
const SUBJECTIVE_SCHEMA = {
  title: "",
  sections: [
    {
      fields: [
        { type: "subheading", label: "Chief Complaint & History" },
        { type: "input", name: "chief_complaint", label: "Chief Complaint" },
        { type: "input", name: "history_present_illness", label: "History of Present Illness" },
        { type: "input", name: "case_medical_history", label: "Case & Medical History" },

        { type: "subheading", label: "Social & Personal History" },
        { type: "input", name: "family_social_history", label: "Family & Social History" },
        { type: "input", name: "work_history", label: "Work History" },
        { type: "input", name: "client_expectations", label: "Client Expectations" },
        { type: "input", name: "driving_history", label: "Driving History" },

        { type: "subheading", label: "Driving Details" },
        {
          type: "single-select",
          name: "driving_license_type",
          label: "Driving License Type",
          options: [
            { label: "None", value: "None" },
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
        { type: "radio", name: "returned_to_driving", label: "Returned to Drive Post Injury?", options: ["Yes", "No"] },
        {
          type: "textarea",
          name: "driving_duration_distance",
          label: "If Yes – Duration & Distance",
          showIf: { field: "returned_to_driving", equals: "Yes" }
        }
      ]
    }
  ]
};
// ...existing code...

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
        { type: "subheading", label: "Physical Status" },
        {
          name: "neuro_scales",
          type: "assessment-launcher",
          options: [
            { label: "Range of Motion (ROM)", value: "rom" },
            { label: "Manual Muscle Test (MMT)", value: "mmt" },
            { label: "Functional Independence Measure (FIM)", value: "mas" },
            { label: "Lawton IADL", value: "fac" },
            { label: "Montreal Cognitive Assessment (MoCA)", value: "moca" }
          ]
        },
        { type: "radio", name: "dominant_side", label: "Dominant", options: ["Right", "Left"] },
        {
          type: "checkbox-group",
          name: "affected_side",
          label: "Affected",
          position: "side",
          options: [
            { label: "Left UE", value: "LUE" },
            { label: "Right UE", value: "RUE" },
            { label: "Left LE", value: "LLE" },
            { label: "Right LE", value: "RLE" }
          ]
        },

        { type: "subheading", label: "Stump / Skin Condition" },
        { type: "radio", name: "wound_status", label: "Wound", options: ["Nil", "Present"] },
        {
          type: "textarea",
          name: "wound_details",
          label: "Wound Details",
          showIf: { field: "wound_status", equals: "Present" }
        },
        {
          type: "single-select",
          name: "muscle_condition",
          label: "Muscle",
          position: "side",
          options: [
            { label: "Firm", value: "Firm" },
            { label: "Flabby", value: "Flabby" },
            { label: "Atrophied", value: "Atrophied" },
            { label: "Others", value: "Other" }
          ]
        },
        {
          type: "input",
          name: "muscle_condition_other",
          label: "Please specify",
          placeholder: "Enter muscle condition",
          position: "side",
          showIf: { field: "muscle_condition", equals: "Other" }
        },
        { type: "radio", name: "edema", label: "Edema", options: ["Nil", "Present"] },
        { type: "input", name: "edema_grade", label: "Grade / Measurement" },
        {
          type: "radio",
          name: "skin_condition",
          label: "Skin",
          position: "side",
          options: [
            { label: "Normal", value: "Normal" },
            { label: "Dry", value: "Dry" },
            { label: "Fragile", value: "Fragile" },
            { label: "Discoloured", value: "Discoloured" },
            { label: "Breakdown", value: "Breakdown" }
          ]
        },
        {
          type: "radio",
          name: "scar_type",
          label: "Scar",
          position: "side",
          options: [
            { label: "Matured", value: "Matured" },
            { label: "Adhered", value: "Adhered" },
            { label: "Hypertrophic", value: "Hypertrophic" },
            { label: "Keloid", value: "Keloid" }
          ]
        },
        {
          type: "radio",
          name: "stump_shape",
          label: "Shape",
          position: "side",
          options: [
            { label: "Conical", value: "Conical" },
            { label: "Cylindrical", value: "Cylindrical" },
            { label: "Bulbous", value: "Bulbous" }
          ]
        },

        { type: "subheading", label: "Sensation / Pain (Residual Limb)" },
        { type: "radio", name: "phantom_sensation", label: "Phantom Sensation", options: ["Nil", "Sometimes", "Present", "Absent"] },
        { type: "radio", name: "phantom_pain", label: "Phantom Pain", options: ["Nil", "Sometimes", "Present", "Absent"] },
        {
          type: "scale-slider",
          name: "phantom_vas",
          label: "Phantom Pain VAS (0–10)",
          min: 0,
          max: 10,
          step: 1,
          showValue: true,
          ranges: [
            { min: 0, max: 3, color: "#16a34a", label: "Mild" },
            { min: 4, max: 6, color: "#f59e0b", label: "Moderate" },
            { min: 7, max: 10, color: "#dc2626", label: "Severe" }
          ]
        },
        { type: "radio", name: "stump_pain", label: "Stump Pain", options: ["Nil", "Sometimes", "Present", "Absent"] },
        {
          type: "scale-slider",
          name: "stump_vas",
          label: "Stump Pain VAS (0–10)",
          min: 0,
          max: 10,
          step: 1,
          showValue: true,
          ranges: [
            { min: 0, max: 3, color: "#16a34a", label: "Mild" },
            { min: 4, max: 6, color: "#f59e0b", label: "Moderate" },
            { min: 7, max: 10, color: "#dc2626", label: "Severe" }
          ]
        },
        { type: "radio", name: "hypersensitivity", label: "Hypersensitivity", options: ["Nil", "Yes"] },
        { type: "radio", name: "light_touch", label: "Light Touch", options: ["Intact", "Impaired"] },
        { type: "radio", name: "deep_touch", label: "Deep Touch", options: ["Intact", "Impaired"] },
        { type: "textarea", name: "semmes_weinstein", label: "Semmes Weinstein (if applicable)" },

        { type: "subheading", label: "Mobility & Ambulation" },
        {
          type: "single-select",
          name: "short_distance",
          label: "Short Distance",
          options: [
            { label: "Independent Walking", value: "Independent" },
            { label: "Wheelchair", value: "Wheelchair" },
            { label: "Quadripod Narrow Base", value: "QuadNarrow" },
            { label: "Quadripod Wide Base", value: "QuadWide" },
            { label: "Walking Stick", value: "Stick" },
            { label: "Walking Frame", value: "Frame" },
            { label: "Elbow Crutches", value: "ElbowCrutches" },
            { label: "Axillary Crutches", value: "Axillary" },
            { label: "Others", value: "Other" }
          ]
        },
        {
          type: "input",
          name: "short_distance_other",
          label: "Please specify (Short Distance)",
          showIf: { field: "short_distance", equals: "Other" }
        },
        {
          type: "single-select",
          name: "long_distance",
          label: "Long Distance",
          options: [
            { label: "Independent Walking", value: "Independent" },
            { label: "Wheelchair", value: "Wheelchair" },
            { label: "Quadripod Narrow Base", value: "QuadNarrow" },
            { label: "Walking Stick", value: "Stick" },
            { label: "Walking Frame", value: "Frame" },
            { label: "Elbow Crutches", value: "ElbowCrutches" },
            { label: "Others", value: "Other" }
          ]
        },
        {
          type: "input",
          name: "long_distance_other",
          label: "Please specify (Long Distance)",
          placeholder: "Enter walking aid",
          showIf: { field: "long_distance", equals: "Other" }
        },

        { type: "subheading", label: "Transfer" },
        {
          type: "single-select",
          name: "bed_chair_transfer",
          label: "Bed ↔ Chair",
          options: [
            { label: "Independent", value: "Independent" },
            { label: "Supervision", value: "Supervision" },
            { label: "Minimal Assistance", value: "MinA" },
            { label: "Moderate Assistance", value: "ModA" },
            { label: "Max Assistance", value: "MaxA" }
          ]
        },
        {
          type: "radio",
          name: "toilet_transfer",
          label: "Toilet Transfer",
          options: [
            { label: "Independent", value: "Independent" },
            { label: "Assistance", value: "Assistance" }
          ]
        },
        { type: "input", name: "car_transfer", label: "Car Transfer (with/without prosthesis)" },

        { type: "subheading", label: "Standing Tolerance" },
        { type: "input", name: "standing_duration", label: "Standing Duration (minutes)" },
        { type: "radio", name: "standing_status", label: "Standing Status", options: ["Independent", "Requires Support", "Unable"] },
        { type: "input", name: "standing_observation", label: "Observation" },

        { type: "subheading", label: "Balance Testing" },
        {
          type: "grid-table-flat",
          name: "balance_table",
          headers: ["Without Prosthesis", "With Prosthesis"],
          rows: [
            { key: "sit_static", label: "Sitting – Static" },
            { key: "sit_dynamic", label: "Sitting – Dynamic" },
            { key: "stand_static", label: "Standing – Static" },
            { key: "stand_dynamic", label: "Standing – Dynamic" }
          ]
        },

        { type: "subheading", label: "Strength Testing (Jamar Dynamometer)" },
        {
          type: "grid-table-flat",
          name: "jamar_table",
          headers: ["Right (KGF)", "Left (KGF)"],
          rows: [
            { key: "grip", label: "Grip" },
            { key: "tip", label: "Tip" },
            { key: "lateral", label: "Lateral" },
            { key: "tripod", label: "Tripod" }
          ]
        }
      ]
    }
  ]
};

const ASSESSMENT_SCHEMA = {
  title: "Assessment",
  sections: [
    {
      fields: [
        { type: "subheading", label: "Problem List" },
        { type: "textarea", name: "problem_list", label: "Problem List" },

        { type: "subheading", label: "Functional Limitations" },
        {
          type: "single-select",
          name: "functional_limitations",
          label: "Select Functional Limitations",
          options: [
            { label: "Gait Impairment", value: "Gait" },
            { label: "Unsafe Transfers", value: "Transfers" },
            { label: "Prosthesis-related Issues", value: "Prosthesis" },
            { label: "Pain & Sensory Issues", value: "PainSensory" },
            { label: "Balance & Postural Control", value: "Balance" },
            { label: "Others", value: "Other" }
          ]
        },
        {
          type: "input",
          name: "functional_limitations_other",
          label: "Others, Specify",
          showIf: { field: "functional_limitations", equals: "Other" }
        },

        { type: "subheading", label: "Underlying Cause" },
        {
          type: "single-select",
          name: "underlying_cause",
          label: "Select Underlying Cause",
          options: [
            { label: "Diabetes Mellitus", value: "DM" },
            { label: "Peripheral Vascular Disease", value: "PVD" },
            { label: "Trauma", value: "Trauma" },
            { label: "Infection", value: "Infection" },
            { label: "Tumor", value: "Tumor" },
            { label: "Others", value: "Other" }
          ]
        },
        {
          type: "input",
          name: "underlying_cause_other",
          label: "Others, Specify",
          showIf: { field: "underlying_cause", equals: "Other" }
        },

        { type: "subheading", label: "Clinical Impression" },
        { type: "textarea", name: "clinical_impression", label: "Clinical Impression" },

        { type: "subheading", label: "Rehabilitation Prognosis" },
        { type: "radio", name: "rehab_prognosis", label: "Select Prognosis", options: ["Excellent", "Good", "Fair", "Poor"] }
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
  type: "checkbox-group",
  name: "intervention_plan",
  label: "Intervention Plan",
  options: [
    { label: "Functional Endurance", value: "FunctionalEndurance" },
    { label: "Functional Balance", value: "FunctionalBalance" },
    { label: "Wheelchair training", value: "WheelchairTraining" },
    { label: "Education", value: "Education" },
    { label: "Community Reintegration", value: "CommunityReintegration" },
    { label: "Driving Assessment", value: "DrivingAssessment" },
    { label: "Riding Assessment", value: "RidingAssessment" }
  ]
},

{ type: "subheading", label: "ADL Training" },
{
  type: "checkbox-group",
  name: "adl_training",
  label: "",
  options: [
    { label: "Dressing", value: "Dressing" },
    { label: "Bathing", value: "Bathing" },
    { label: "Feeding", value: "Feeding" },
    { label: "Grooming", value: "Grooming" },
    { label: "Transfers", value: "Transfers" },
    { label: "Locomotion", value: "Locomotion" }
  ]
},

{ type: "subheading", label: "IADL Training" },
{
  type: "checkbox-group",
  name: "iadl_training",
  label: "",
  options: [
    { label: "Telephoning", value: "Telephoning" },
    { label: "Shopping", value: "Shopping" },
    { label: "Food Preparation", value: "FoodPreparation" },
    { label: "Housekeeping", value: "Housekeeping" },
    { label: "Laundry", value: "Laundry" },
    { label: "Mode of transportation", value: "ModeOfTransportation" },
    { label: "Medication management", value: "MedicationManagement" },
    { label: "Money management", value: "MoneyManagement" }
  ]
},

{ type: "subheading", label: "Driving / Riding Rehab" },
{
  type: "checkbox-group",
  name: "driving_riding_rehab",
  label: "",
  options: [
    { label: "Driving Rehabilitation", value: "DrivingRehabilitation" },
    { label: "Riding Rehabilitation", value: "RidingRehabilitation" }
  ]
},

{ type: "subheading", label: "Assistive & Adaptive Devices" },
{
  type: "checkbox-group",
  name: "assistive_devices",
  label: "",
  options: [
    { label: "Splint", value: "Splint" },
    { label: "Pressure garment", value: "PressureGarment" },
    { label: "Tubular", value: "Tubular" },
    { label: "Manual wheelchair", value: "ManualWheelchair" },
    { label: "Lightweight wheelchair", value: "LightweightWheelchair" },
    { label: "Ultralight wheelchair", value: "UltralightWheelchair" },
    { label: "Motorised wheelchair", value: "MotorisedWheelchair" },
    { label: "Commode", value: "Commode" },
    { label: "Others", value: "AssistiveOthers" }
  ]
},
{
  type: "textarea",
  name: "assistive_devices_others",
  label: "Please specify",
  showIf: { field: "assistive_devices", includes: "AssistiveOthers" }
},

{ type: "subheading", label: "Treatment Plan: Therapeutic Exercise (Multiselect)" },
{
  type: "checkbox-group",
  name: "therapeutic_exercise",
  label: "",
  options: [
    { label: "Functional ROM", value: "FunctionalROM" },
    { label: "Fine Motor Training", value: "FineMotorTraining" },
    { label: "Stump Management Station", value: "StumpManagement" },
    { label: "Functional Mobility", value: "FunctionalMobility" },
    { label: "Sensory Desensitization", value: "SensoryDesensitization" }
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
              Submit Amputee Assessment
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