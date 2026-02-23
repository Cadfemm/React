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
  rom:ROMForm
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
 const  Functional_assessment  = [
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
 
  /* ===================== SCHEMAS ===================== */
 
  const SUBJECTIVE_SCHEMA = {
  title: "",
  sections: [

    /* ===================================================== */
    /* SUBJECTIVE                                            */
    /* ===================================================== */

    {
      title: "",
      fields: [

        {
          type: "textarea",
          name: "chief_complaint",
          label: "Chief Complaint"
        },

        {
          type: "textarea",
          name: "history_present_illness",
          label: "History of Present Illness"
        }

      ]
    },

    /* ===================================================== */
    /* MEDICAL INFORMATION                                   */
    /* ===================================================== */

    {
      title: "Medical Information",
      fields: [

        { type: "input", name: "primary_diagnosis", label: "Primary Medical Diagnosis" },

        { type: "input", name: "secondary_diagnosis", label: "Secondary Diagnoses / Comorbidities" },

        { type: "date", name: "onset_date", label: "Date of Onset" },

        {
          type: "input",
          name: "duration_since_diagnosis",
          label: "Duration of Diagnosis (Auto-calculated)"
        },

        { type: "textarea", name: "surgical_history", label: "Surgical History" }

      ]
    },

    /* ===================================================== */
    /* COMMON NEUROLOGICAL CONDITIONS                        */
    /* ===================================================== */

    {
      title: "Common Neurological Conditions",
      fields: [

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
        }

      ]
    },

    /* ===================================================== */
    /* PRIOR LEVEL OF FUNCTION                               */
    /* ===================================================== */

    {
      title: "Prior Level of Function (Pre-Morbid)",
      fields: [

        {
          type: "radio",
          name: "independent_basic_adls",
          label: "Independent in Basic ADLs",
          options: ["Yes", "No"]
        },

        {
          type: "radio",
          name: "independent_iadls",
          label: "Independent in IADLs",
          options: ["Yes", "No"]
        },

        {
          type: "radio",
          name: "employment_status",
          label: "Employment Status",
          options: [
            { label: "Working", value: "Working" },
            { label: "Retired", value: "Retired" },
            { label: "Unemployed", value: "Unemployed" }
          ]
        },

        {
          type: "radio",
          name: "return_to_work",
          label: "Return to Work Plan",
          options: ["Yes", "No"]
        },

        {
          type: "textarea",
          name: "return_to_work_details",
          label: "Return to Work Details",
          showIf: { field: "return_to_work", equals: "Yes" }
        },

        {
          type: "radio",
          name: "driving_pre_injury",
          label: "Driving Pre-Injury",
          options: ["Yes", "No"]
        },

        {
          type: "textarea",
          name: "assistive_devices",
          label: "Assistive Devices Previously Used"
        },

        {
          type: "textarea",
          name: "previous_rehab",
          label: "Previous Rehab History"
        }

      ]
    },

    /* ===================================================== */
    /* LIVING SITUATION                                      */
    /* ===================================================== */

    {
      title: "Living Situation & Context",
      fields: [

        {
          type: "single-select",
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
          type: "textarea",
          name: "residence_other",
          label: "Others",
          showIf: { field: "residence_type", equals: "Other" }
        },

        { type: "input", name: "lives_with", label: "Lives With" },

        {
          type: "single-select",
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
          type: "single-select",
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
          type: "radio",
          name: "toilet_type",
          label: "Type of Toilet",
          options: ["Sitting", "Squatting"]
        }

      ]
    },

    /* ===================================================== */
    /* EDUCATION                                             */
    /* ===================================================== */

    {
      title: "Educational Level",
      fields: [

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
        }

      ]
    },

 

    {
      title: "Equipment Owned",
      fields: [

        {
          type: "textarea",
          name: "equipment_perkeso",
          label: "PERKESO"
        },

        {
          type: "textarea",
          name: "equipment_ngo",
          label: "NGO"
        },

        {
          type: "textarea",
          name: "equipment_self_purchased",
          label: "Self-purchased"
        },

        {
          type: "textarea",
          name: "equipment_others",
          label: "Others"
        }

      ]
    },



    /* ===================================================== */
    /* DRIVING                                               */
    /* ===================================================== */

    {
      title: "Driving & Licensing",
      fields: [

        {
          type: "single-select",
          name: "driving_license_type",
          label: "Driving License Type",
          options: [
            { label: "None", value: "None" },
            { label: "B2", value: "B2" },
            { label: "D", value: "D" },
            { label: "E", value: "E" },
            { label: "GDL", value: "GDL" },
            { label: "PSV", value: "PSV" },
            { label: "Other", value: "Other" }
          ]
        },

        {
          type: "radio",
          name: "returned_to_driving",
          label: "Returned to Driving Post-Injury",
          options: ["Yes", "No"]
        },

        {
          type: "input",
          name: "driving_duration_distance",
          label: "If Yes – Duration & Distance",
          showIf: { field: "returned_to_driving", equals: "Yes" }
        }

      ]
    },

    /* ===================================================== */
    /* FAMILY & GOALS                                        */
    /* ===================================================== */

    {
      title: "Family & Social History",
      fields: [
        { type: "textarea", name: "family_social_history", label: "Details" }
      ]
    },

    {
      title: "Client Expectations / Patient Goals",
      fields: [
        { type: "textarea", name: "patient_goals", label: "Goals" }
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


    /* ===================================================== */
    /* FUNCTIONAL & MOBILITY STATUS                          */
    /* ===================================================== */

    {
      fields: [
  {
      name: "neuro_scales",
      type: "assessment-launcher",
      options: [
        { label: "Range of Motion (ROM)", value: "rom" },
        { label: "Manual Muscle Test (MMT)", value: "mmt" },
        { label: "Muscle Tone (MAS)", value: "mas" },
        // { label: "Functional Ambulation Category (FAC)", value: "fac" },
        // { label: "Motor Assessment Scale", value: "motor_mas" },
        // { label: "Fugl Meyer Assessment – Lower Extremity (FMA-LE)", value: "fma_le" },
        // { label: "Stand and Reposition Aids (SARA)", value: "sara" },
        // { label: "10 Meter Walk Test", value: "10mwt" },
        // { label: "Berg Balance Scale (BBS)", value: "bbs" },
        // { label: "Visual Analog Scale (VAS)", value: "vas" },
        // { label: "Timed Up and Go (TUG)", value: "tug" },
        // { label: "6 Minutes Walk Test (6MWT)", value: "6mwt" },
        {label: "Fugl Meyer Assessment (FMA-UE)", value: "flug" },
        {label: "Trunk Impairment Scale (TIS)", value: "tsi" }
      
      ]
    },
        {
          type: "radio",
          name: "dominant_hand",
          label: "Dominant Hand",
          options: ["Right", "Left"]
        },

        {
          type: "checkbox-group",
          name: "affected_side",
          label: "Affected Side",
          position:"side",
          options: [
            { label: "LUE", value: "LUE" },
            { label: "RUE", value: "RUE" },
            { label: "LLE", value: "LLE" },
            { label: "RLE", value: "RLE" }
          ]
        },

        {
          type: "single-select",
          name: "assist_level",
          label: "Assist Level (EMR Dropdown)",
          options: [
            { label: "Independent", value: "Independent" },
            { label: "Supervision", value: "Supervision" },
            { label: "SBA", value: "SBA" },
            { label: "CGA", value: "CGA" },
            { label: "Min Assist", value: "MinA" },
            { label: "Mod Assist", value: "ModA" },
            { label: "Max Assist", value: "MaxA" },
            { label: "Dependent", value: "Dependent" }
          ]
        }

      ]
    },

    /* ===================================================== */
    /* NEURO FACTORS OBSERVED                                */
    /* ===================================================== */

    {
      title: "Neuro Factors Observed",
      fields: [

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
        }

      ]
    },

    /* ===================================================== */
    /* MOTOR ASSESSMENT                                      */
    /* ===================================================== */

    {
      title: "Motor Assessment",
      fields: [

        { type: "subheading", label: "Tone" },

        {
          type: "checkbox-group",
          name: "tone_type",
          label: "Tone Type",
          position:"side",
          options: [
            { label: "Normal", value: "Normal" },
            { label: "Hypotonic", value: "Hypotonic" },
            { label: "Hypertonic", value: "Hypertonic" }
          ]
        },

        {
          type: "input",
          name: "mas_grade",
          label: "MAS Grade (if applicable)"
        },

        { type: "subheading", label: "AROM" },

        {
          type: "row",
          fields: [
            { type: "input", name: "arom_rue", label: "RUE" },
            { type: "input", name: "arom_lue", label: "LUE" }
          ]
        },

        { type: "subheading", label: "Strength (MMT)" },

        {
          type: "row",
          fields: [
            { type: "input", name: "mmt_rue", label: "RUE (/5)" },
            { type: "input", name: "mmt_lue", label: "LUE (/5)" }
          ]
        },

        { type: "subheading", label: "Coordination" },

        {
          type: "radio",
          name: "finger_to_nose",
          label: "Finger-to-Nose",
          options: ["Intact", "Impaired"]
        },

        {
          type: "radio",
          name: "rapid_alt_movement",
          label: "Rapid Alternating Movement",
          options: ["Intact", "Impaired"]
        },

        {
          type: "input",
          name: "functional_reach_cm",
          label: "Functional Reach (cm)"
        },

        { type: "subheading", label: "Fine Motor" },

        {
          type: "input",
          name: "nine_hole_peg",
          label: "9-Hole Peg Test (sec)"
        },

        {
          type: "radio",
          name: "functional_grasp",
          label: "Functional Grasp",
          options: ["Effective", "Ineffective"]
        }

      ]
    },

    /* ===================================================== */
    /* BALANCE & POSTURAL CONTROL                            */
    /* ===================================================== */

    {
      title: "Balance & Postural Control",
      fields: [

        {
          type: "radio",
          name: "sitting_balance",
          label: "Sitting Balance",
          options: ["Static", "Dynamic", "Poor"]
        },

        {
          type: "input",
          name: "standing_tolerance",
          label: "Standing Tolerance (minutes)"
        },

        {
          type: "radio",
          name: "loss_of_balance_adl",
          label: "Loss of Balance During ADL",
          options: ["Yes", "No"]
        },

        {
          type: "input",
          name: "assistive_device_used",
          label: "Assistive Device Used"
        }

      ]
    },

    /* ===================================================== */
    /* AMBULATORY STATUS                                     */
    /* ===================================================== */

    {
      title: "Ambulatory Status – Short Distance",
      fields: [

        {
          type: "checkbox-group",
          name: "ambulatory_status",
          label: "Ambulatory Status",
          options: [
            { label: "Independent Walking", value: "IndependentWalking" },
            { label: "Wheelchair", value: "Wheelchair" },
            { label: "Quadripod (Narrow/Wide)", value: "Quadripod" },
            { label: "Walking Stick", value: "WalkingStick" },
            { label: "Walking Frame", value: "WalkingFrame" },
            { label: "Elbow Crutches", value: "ElbowCrutches" },
            { label: "Other", value: "Other" }
          ]
        }

      ]
    },

    /* ===================================================== */
    /* STANDARDIZED OUTCOME MEASURES                         */
    /* ===================================================== */

    // {
    //   title: "Standardized Outcome Measures (Baseline – Auto Reminder Monthly)",
    //   fields: [

    //     {
    //       type: "checkbox-group",
    //       name: "standard_measures",
    //       label: "Scales / Scores",
    //       options: [
    //         { label: "ROM (Active/Passive)", value: "ROM" },
    //         { label: "MMT", value: "MMT" },
    //         { label: "MAS", value: "MAS" },
    //         { label: "FIM", value: "FIM" },
    //         { label: "MoCA / CASP", value: "MoCA" },
    //         { label: "FMA-UE", value: "FMAUE" },
    //         { label: "ARAT", value: "ARAT" },
    //         { label: "Jebsen Hand Function", value: "Jebsen" },
    //         { label: "Box & Block", value: "BoxBlock" },
    //         { label: "SARA", value: "SARA" },
    //         { label: "TIS", value: "TIS" }
    //       ]
    //     }

    //   ]
    // },

    /* ===================================================== */
    /* FUNCTIONAL ASSESSMENTS                                */
    /* ===================================================== */

    // {
    //   title: "Functional Assessments",
    //   fields: [

    //     {
    //       type: "checkbox-group",
    //       name: "functional_assessments",
    //       label: "Select Assessments",
    //       options: [
    //         { label: "ADL Assessment", value: "ADL" },
    //         { label: "IADL Assessment", value: "IADL" },
    //         { label: "Domestic Activity Assessment", value: "Domestic" },
    //         { label: "Assistive Device Assessment", value: "AssistiveDevice" },
    //         { label: "Postural & Movement Analysis", value: "PosturalMovement" },
    //         { label: "Balance & Coordination Assessment", value: "BalanceCoordination" }
    //       ]
    //     }

    //   ]
    // },

    /* ===================================================== */
    /* CLINICAL OBSERVATIONS / TESTS                         */
    /* ===================================================== */

    {
      title: "Clinical Observations / Tests",
      fields: [

        {
          type: "checkbox-group",
          name: "clinical_tests",
          label: "Clinical Tests",
          // position:'side',
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

 
  const ASSESSMENT_SCHEMA = {
  title: "Assessment",
  sections: [

    /* ===================================================== */
    /* PROBLEM LIST                                          */
    /* ===================================================== */

    {
      title: "Problem List",
      fields: [
        {
          type: "textarea",
          name: "problem_list",
          label: "Problem List"
        }
      ]
    },

    /* ===================================================== */
    /* CLINICAL IMPRESSION                                   */
    /* ===================================================== */

    {
      title: "Clinical Impression",
      fields: [

        {
          type: "textarea",
          name: "functional_limitations",
          label: "Functional Limitations"
        },

        {
          type: "textarea",
          name: "clinical_diagnosis",
          label: "Diagnosis"
        }

      ]
    },

    /* ===================================================== */
    /* REHABILITATION POTENTIAL                              */
    /* ===================================================== */

    {
      title: "Rehabilitation Potential",
      fields: [

        {
          type: "radio",
          name: "rehab_potential",
          label: "Select Potential Level",
          options: ["Excellent", "Good", "Fair", "Poor"]
        },

        {
          type: "info-text",
          name: "rehab_note",
          text: "(Based on cognition, motivation, severity, comorbidities)"
        }

      ]
    }

  ]
};

  const PLAN_SCHEMA =  {
  title: "",
  sections: [

    /* ===================================================== */
    /* SHORT TERM GOALS                                      */
    /* ===================================================== */

    {
      title: "Short Term Goals (2–4 Weeks)",
      fields: [
        {
          type: "dynamic-goals",
          name: "short_term_goals"
        }
      ]
    },
    
    // {
    //   title: "Short Term Goals Frequency & Duration",
    //   fields: [

    //     {
    //       type: "input",
    //       name: "sessions_per_week",
    //       label: "Sessions per Week"
    //     },

    //     {
    //       type: "input",
    //       name: "minutes_per_session",
    //       label: "Minutes per Session"
    //     },

    //     {
    //       type: "input",
    //       name: "planned_duration_weeks",
    //       label: "Planned Duration (Weeks)"
    //     }

    //   ]
    // },


    /* ===================================================== */
    /* LONG TERM GOALS                                       */
    /* ===================================================== */

    {
      title: "Long Term Goals (6–12 Weeks)",
      fields: [
        {
          type: "dynamic-goals",
          name: "long_term_goals"
        }
      ]
    },

  //  {
  //     title: "Long Term Goals Frequency & Duration",
  //     fields: [

  //       {
  //         type: "input",
  //         name: "sessions_per_week",
  //         label: "Sessions per Week"
  //       },

  //       {
  //         type: "input",
  //         name: "minutes_per_session",
  //         label: "Minutes per Session"
  //       },

  //       {
  //         type: "input",
  //         name: "planned_duration_weeks",
  //         label: "Planned Duration (Weeks)"
  //       }

  //     ]
  //   },

    /* ===================================================== */
    /* INTERVENTION PLAN                                     */
    /* ===================================================== */

   {
  title: "Intervention Plan",
  fields: [

    {
      type: "checkbox-group",
      name: "intervention_plan",
      label: "Select Interventions",
      options: [
        { label: "Attention & concentration training", value: "Attention" },
        { label: "Orientation", value: "Orientation" },
        { label: "Memory restorative & retraining", value: "Memory" },
        { label: "Executive function training", value: "Executive" },
        { label: "Processing speed tasks", value: "Processing" },
        { label: "Cognitive remediation therapy", value: "CRT" },
        { label: "Computer-based training using games", value: "Computer" },
        { label: "Perceptual training", value: "Perceptual" }
      ]
    },

    {
      type: "single-select",
      name: "perceptual_training_type",
      label: "Perceptual Training Type",
      options: [
        { label: "Praxis training", value: "Praxis" },
        { label: "Spatial Perception training", value: "Spatial" },
        { label: "Visuospatial & Constructional skills training", value: "Visuospatial" },
        { label: "Visual perceptual skills training", value: "VisualPerceptual" },
        { label: "Visual scanning & tracking exercises", value: "VisualScanning" }
      ],
      showIf: {
        field: "intervention_plan",
        includes: "Perceptual"
      }
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

  const today = new Date();

  const calculateAge = (dob) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const calculateDuration = (onsetDate) => {
    if (!onsetDate) return "-";
    const onset = new Date(onsetDate);
    const diffYears = today.getFullYear() - onset.getFullYear();
    return `${diffYears} years`;
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "-";

  return (
    <div style={section}>
      <div style={patientGrid}>

        <div><b>Name:</b> {patient.name || "-"}</div>
        <div><b>MRN / ID:</b> {patient.mrn || "-"}</div>
        <div><b>Date of Birth:</b> {formatDate(patient?.dob)}</div>
        <div><b>Age:</b> {calculateAge(patient?.dob)}</div>

        <div><b>Date of Assessment:</b> {formatDate(patient?.assessment_date)}</div>
        <div><b>Date of Onset:</b> {formatDate(patient?.onset_date)}</div>
        <div><b>Duration of Diagnosis:</b> {calculateDuration(patient?.onset_date)}</div>

        <div><b>Primary Diagnosis:</b> {patient.primary_dx || "-"}</div>
        <div><b>Secondary Diagnosis:</b> {patient.secondary_dx || "-"}</div>

        <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
        <div><b>Language Preference:</b> {patient.language || "-"}</div>
        <div><b>Education Level:</b> {patient.education || "-"}</div>

        <div><b>Occupation:</b> -</div>
        <div><b>Work Status:</b>-</div>
        <div><b>Driving Status:</b> {patient?.driving_status?.join(", ") || "-"}</div>

        <div><b>Name of Therapist:</b> -</div>
                <div><b>Referral Reasons:</b> -</div>
        <div><b>Details:</b> -</div>


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
      onChange={() => {}}
    >
      <NeuroPatientInfo patient={patient} />
    </CommonFormBuilder>
 
    {/* ===== NEW ENVIRONMENT CARD ===== */}
    {/* <CommonFormBuilder
      schema={PATIENT_ENVIRONMENT_SCHEMA}
      values={values}
      onChange={onChange}
    /> */}
 
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
    <button style={submitBtn} onClick={handleSubmit}>
      Submit Neuro Assessment
    </button>
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