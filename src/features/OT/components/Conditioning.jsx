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
  title: "Subjective",
  sections: [

    /* ===================================================== */
    /* SUBJECTIVE NARRATIVE                                  */
    /* ===================================================== */

    {
      title: "Subjective",
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
        },
        {
          type: "textarea",
          name: "case_medical_history",
          label: "Case & Medical History"
        },
        {
          type: "textarea",
          name: "family_social_history",
          label: "Family & Social History"
        }

      ]
    },

    /* ===================================================== */
    /* CLIENT PERCEPTION OF FUNCTIONAL IMPACT                */
    /* ===================================================== */

    {
      title: "Client Perception of Functional Impact",
      fields: [

        {
          type: "checkbox-group",
          name: "functional_impact",
          label: "Affected Areas",
          options: [
            { label: "Home", value: "Home" },
            { label: "Work", value: "Work" },
            { label: "School", value: "School" },
            { label: "Community", value: "Community" },
            { label: "Driving", value: "Driving" },
            { label: "Social Participation", value: "SocialParticipation" }
          ]
        },

        {
          type: "textarea",
          name: "functional_impact_description",
          label: "Description"
        },

        {
          type: "textarea",
          name: "client_goals",
          label: "Client Goals"
        }

      ]
    },

    /* ===================================================== */
    /* PRIOR LEVEL OF FUNCTION (PLOF) – ADL                  */
    /* ===================================================== */

    {
      title: "Prior Level of Function – ADL",
      fields: [

        {
          type: "scale-table",
          name: "plof_adl",
          columns: [
            { label: "Independent", value: "Independent" },
            { label: "Supervision", value: "Supervision" },
            { label: "Assistance", value: "Assistance" },
            { label: "Dependent", value: "Dependent" }
          ],
          rows: [
            "Feeding",
            "Grooming",
            "Upper Body Dressing",
            "Lower Body Dressing",
            "Bathing",
            "Toileting",
            "Transfers",
            "Functional Mobility"
          ]
        }

      ]
    },

    /* ===================================================== */
    /* PRIOR LEVEL OF FUNCTION (PLOF) – IADL                 */
    /* ===================================================== */

    {
      title: "Prior Level of Function – IADL",
      fields: [

        {
          type: "scale-table",
          name: "plof_iadl",
          columns: [
            { label: "Independent", value: "Independent" },
            { label: "Supervision", value: "Supervision" },
            { label: "Assistance", value: "Assistance" },
            { label: "Dependent", value: "Dependent" }
          ],
          rows: [
            "Meal Preparation",
            "Housekeeping",
            "Laundry",
            "Shopping",
            "Medication Management",
            "Financial Management",
            "Community Mobility",
            "Driving"
          ]
        }

      ]
    },

    /* ===================================================== */
    /* SOCIAL & ENVIRONMENTAL STATUS                          */
    /* ===================================================== */

    {
      title: "Social & Environmental Context",
      fields: [

        {
          type: "checkbox-group",
          name: "employment_status",
          label: "Employment Status",
          options: [
            { label: "Employed", value: "Employed" },
            { label: "Student", value: "Student" },
            { label: "Homemaker", value: "Homemaker" },
            { label: "Retired", value: "Retired" },
            { label: "Unemployed", value: "Unemployed" }
          ]
        },

        {
          type: "radio",
          name: "driving_status",
          label: "Driving",
          options: ["Yes", "No"]
        },

        {
          type: "radio",
          name: "community_mobility",
          label: "Community Mobility",
          options: ["Independent", "Assisted"]
        },

        {
          type: "checkbox-group",
          name: "living_environment",
          label: "Living Environment",
          options: [
            { label: "Alone", value: "Alone" },
            { label: "With Spouse", value: "Spouse" },
            { label: "With Family", value: "Family" },
            { label: "Caregiver Available", value: "CaregiverAvailable" }
          ]
        },

        {
          type: "checkbox-group",
          name: "home_type",
          label: "Home Type",
          options: [
            { label: "Apartment", value: "Apartment" },
            { label: "Independent House", value: "IndependentHouse" },
            { label: "Assisted Facility", value: "AssistedFacility" }
          ]
        },

        {
          type: "textarea",
          name: "environmental_barriers",
          label: "Environmental Barriers"
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
  title: "Objective",
  sections: [

    /* ===================================================== */
    /* FUNCTIONAL COGNITIVE PERFORMANCE (Observed)          */
    /* ===================================================== */

   

        /* ================= MEDICATION MANAGEMENT ================= */

        {
          title: "Medication Management",
          fields: [

            {
              type: "single-select",
              name: "med_initiation",
              label: "Initiation",
              options: ["Intact", "Requires Prompting", "Unable"]
            },
            {
              type: "single-select",
              name: "med_sequencing",
              label: "Sequencing",
              options: ["Intact", "Impaired", "Severely Impaired"]
            },
            {
              type: "single-select",
              name: "med_safety",
              label: "Safety Awareness",
              options: ["Intact", "Reduced", "Unsafe"]
            },
            {
              type: "single-select",
              name: "med_assistance",
              label: "Assistance Level",
              options: ["I", "SV", "Min A", "Mod A", "Max A", "TD"]
            },
            {
              type: "checkbox-group",
              name: "med_cueing",
              label: "Cueing Type",
              options: [
                { label: "Verbal", value: "Verbal" },
                { label: "Visual", value: "Visual" },
                { label: "Gestural", value: "Gestural" },
                { label: "Physical", value: "Physical" }
              ]
            },
            {
              type: "checkbox-group",
              name: "med_error_type",
              label: "Error Type",
              options: [
                { label: "Omission", value: "Omission" },
                { label: "Commission", value: "Commission" },
                { label: "Timing Error", value: "Timing" },
                { label: "Perseveration", value: "Perseveration" }
              ]
            }

          ]
        },

        /* ================= MEAL PREPARATION ================= */

        {
          title: "Meal Preparation",
          fields: [

            {
              type: "single-select",
              name: "meal_initiation",
              label: "Initiation",
              options: ["Intact", "Delayed", "Unable"]
            },
            {
              type: "single-select",
              name: "meal_sequencing",
              label: "Sequencing",
              options: ["Intact", "Impaired", "Severely Impaired"]
            },
            {
              type: "single-select",
              name: "meal_safety",
              label: "Safety Awareness",
              options: ["Intact", "Reduced", "Unsafe"]
            },
            {
              type: "single-select",
              name: "meal_assistance",
              label: "Assistance Level",
              options: ["I", "M I", "SV", "Min A", "Mod A", "Max A", "TD"]
            },
            {
              type: "checkbox-group",
              name: "meal_cueing",
              label: "Cueing Type",
              options: [
                { label: "Verbal", value: "Verbal" },
                { label: "Visual", value: "Visual" },
                { label: "Gestural", value: "Gestural" },
                { label: "Physical", value: "Physical" }
              ]
            },
            {
              type: "checkbox-group",
              name: "meal_error_type",
              label: "Error Type",
              options: [
                { label: "Step Omission", value: "StepOmission" },
                { label: "Disorganization", value: "Disorganization" },
                { label: "Safety Error", value: "SafetyError" }
              ]
            }

          ]
        },

        /* ================= CALENDAR / SCHEDULING ================= */

        {
          title: "Calendar / Scheduling Use",
          fields: [

            {
              type: "single-select",
              name: "calendar_initiation",
              label: "Initiation",
              options: ["Independent", "Requires Prompting", "Unable"]
            },
            {
              type: "single-select",
              name: "calendar_consistency",
              label: "Consistency",
              options: ["Consistent", "Inconsistent", "Unable"]
            },
            {
              type: "single-select",
              name: "calendar_cueing",
              label: "Cueing Required",
              options: ["Verbal", "Visual", "None"]
            },
            {
              type: "single-select",
              name: "calendar_carryover",
              label: "Carryover",
              options: ["Good", "Limited", "Poor"]
            },
            {
              type: "single-select",
              name: "calendar_time_awareness",
              label: "Time Awareness",
              options: ["Intact", "Impaired"]
            }

          ]
        },

  
    /* ===================================================== */
    /* COGNITIVE DOMAIN EXAMINATION                          */
    /* ===================================================== */

    {
      title: "Cognitive Domain Examination",
      fields: [

        {
          type: "single-select",
          name: "problem_solving",
          label: "Problem Solving",
          options: ["Intact", "Mild", "Moderate", "Severe"]
        },
        {
          type: "single-select",
          name: "task_initiation",
          label: "Task Initiation",
          options: ["Independent", "Requires Prompting", "Unable"]
        },
        {
          type: "single-select",
          name: "mental_flexibility",
          label: "Mental Flexibility",
          options: ["Intact", "Decreased", "Severely Impaired"]
        },
        {
          type: "single-select",
          name: "organization",
          label: "Organization",
          options: ["Intact", "Impaired", "Severely Impaired"]
        }

      ]
    },

    /* ===================================================== */
    /* ATTENTION                                              */
    /* ===================================================== */

    {
      title: "Attention",
      fields: [

        {
          type: "single-select",
          name: "sustained_attention",
          label: "Sustained Attention",
          options: ["Intact", "Variable", "Impaired", "Severely Impaired"]
        },
        {
          type: "single-select",
          name: "selective_attention",
          label: "Selective Attention",
          options: ["Intact", "Variable", "Impaired", "Severely Impaired"]
        },
        {
          type: "radio",
          name: "distractibility",
          label: "Distractibility",
          options: ["Present", "Absent"]
        }

      ]
    },

    /* ===================================================== */
    /* ORIENTATION / MEMORY / EXECUTIVE                      */
    /* ===================================================== */

    {
      title: "Additional Cognitive Findings",
      fields: [

        {
          type: "checkbox-group",
          name: "orientation",
          label: "Orientation",
          options: [
            { label: "Person", value: "Person" },
            { label: "Place", value: "Place" },
            { label: "Time", value: "Time" },
            { label: "Situation", value: "Situation" }
          ]
        },

        { type: "textarea", name: "orientation_comments", label: "Comments" },

        {
          type: "checkbox-group",
          name: "memory",
          label: "Memory",
          options: [
            { label: "Immediate", value: "Immediate" },
            { label: "Short-term", value: "ShortTerm" },
            { label: "Working", value: "Working" },
            { label: "Long-term", value: "LongTerm" }
          ]
        },

        {
          type: "checkbox-group",
          name: "executive_function",
          label: "Executive Function",
          options: [
            { label: "Planning", value: "Planning" },
            { label: "Sequencing", value: "Sequencing" },
            { label: "Organization", value: "Organization" },
            { label: "Problem Solving", value: "ProblemSolving" },
            { label: "Abstract Reasoning", value: "Abstract" },
            { label: "Mental Flexibility", value: "Flexibility" }
          ]
        },

        {
          type: "checkbox-group",
          name: "safety_judgment",
          label: "Safety & Judgment",
          options: [
            { label: "Poor Insight", value: "PoorInsight" },
            { label: "Impulsive", value: "Impulsive" },
            { label: "Unsafe in Kitchen", value: "KitchenUnsafe" },
            { label: "Medication Mismanagement", value: "MedMismanagement" },
            { label: "Requires Supervision", value: "Supervision" }
          ]
        }

      ]
    },

    /* ===================================================== */
    /* STANDARDIZED COGNITIVE SCREENING                      */
    /* ===================================================== */

    {
      title: "Standardized Cognitive Screening & Assessment",
      fields: [

        {
          type: "checkbox-group",
          name: "cognitive_tools_used",
          label: "Tick Relevant Tools",
          options: [
            { label: "MoCA", value: "MoCA" },
            { label: "CASP", value: "CASP" },
            { label: "MMSE", value: "MMSE" },
            { label: "SLUMS", value: "SLUMS" },
            { label: "LOTCA", value: "LOTCA" },
            { label: "DLOTCA", value: "DLOTCA" },
            { label: "DLOTCA-G", value: "DLOTCA-G" },
            { label: "COTNAB", value: "COTNAB" },
            { label: "RPAB", value: "RPAB" },
            { label: "DCQ", value: "DCQ" },
            { label: "COGBAT (VTS)", value: "COGBAT" }
          ]
        }

      ]
    },

    /* ===================================================== */
    /* FUNCTIONAL PERFORMANCE ASSESSMENT                     */
    /* ===================================================== */

    {
      title: "Functional Performance Assessment",
      fields: [

        { type: "textarea", name: "observation", label: "Observation" },

        {
          type: "radio",
          name: "insight",
          label: "Insight",
          options: ["Good", "Partial", "Poor"]
        },

        {
          type: "radio",
          name: "communication",
          label: "Communication",
          options: ["Intact", "Impaired"]
        },

        {
          type: "radio",
          name: "endurance",
          label: "Endurance",
          options: ["Adequate", "Reduced"]
        },

        {
          type: "textarea",
          name: "compensatory_strategies",
          label: "Compensatory Strategies Observed"
        }

      ]
    }

  ]
};

  const ASSESSMENT_SCHEMA = {
  title: "Assessment",
  sections: [

    /* ===================================================== */
    /* COGNITIVE ANALYSIS                                    */
    /* ===================================================== */

    {
      title: "Assessment",
      fields: [

        {
          type: "textarea",
          name: "cognitive_strengths",
          label: "Cognitive Strengths"
        },

        {
          type: "textarea",
          name: "cognitive_deficits",
          label: "Cognitive Deficits (Problem List)"
        },

        {
          type: "checkbox-group",
          name: "impact_on_occupational_performance",
          label: "Impacts of Cognitive Deficits on Occupational Performance",
          options: [
            { label: "ADL limitation", value: "ADL" },
            { label: "IADL limitation", value: "IADL" },
            { label: "Work limitation", value: "Work" },
            { label: "Driving safety concern", value: "Driving" },
            { label: "Community participation restriction", value: "Community" },
            { label: "Requires supervision", value: "Supervision" }
          ]
        },

        {
          type: "textarea",
          name: "safety_concerns",
          label: "Safety Concerns"
        },

        {
          type: "radio",
          name: "rehabilitation_prognosis",
          label: "Rehabilitation Prognosis",
          options: ["Good", "Fair", "Guarded", "Poor"]
        },

        {
          type: "textarea",
          name: "clinical_impression",
          label: "Clinical Impression"
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
    
    {
      title: "Short Term Goals Frequency & Duration",
      fields: [

        {
          type: "input",
          name: "sessions_per_week",
          label: "Sessions per Week"
        },

        {
          type: "input",
          name: "minutes_per_session",
          label: "Minutes per Session"
        },

        {
          type: "input",
          name: "planned_duration_weeks",
          label: "Planned Duration (Weeks)"
        }

      ]
    },


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

   {
      title: "Long Term Goals Frequency & Duration",
      fields: [

        {
          type: "input",
          name: "sessions_per_week",
          label: "Sessions per Week"
        },

        {
          type: "input",
          name: "minutes_per_session",
          label: "Minutes per Session"
        },

        {
          type: "input",
          name: "planned_duration_weeks",
          label: "Planned Duration (Weeks)"
        }

      ]
    },

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
  function NeuroPatientInfo({ patient }) {
    if (!patient) return null;

    return (
      <div style={section}>
        <div style={patientGrid}>

          <div><b>Name:</b> {patient.name}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {formatDate(patient.dob)}</div>
          <div><b>Age:</b> {patient.age}</div>
          {/* <div><b>ICD:</b> {patient.icd}</div> */}
          <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
          {/* <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
      <div>
        <b>Duration of Diagnosis:</b>{" "}
        {calculateDuration(patient.date_of_onset)}
      </div>
  */}


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