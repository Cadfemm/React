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

      /* ===================================================== */
      /* PRIMARY SUBJECTIVE INFORMATION                        */
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
          },

          {
            type: "textarea",
            name: "case_medical_history",
            label: "Case & Medical History"
          }

        ]
      },

      /* ===================================================== */
      /* SOCIAL & PERSONAL HISTORY                             */
      /* ===================================================== */

      {
        title: "Social & Personal History",
        fields: [

          {
            type: "textarea",
            name: "family_social_history",
            label: "Family & Social History"
          },

          {
            type: "textarea",
            name: "work_history",
            label: "Work History"
          },

          {
            type: "textarea",
            name: "client_expectations",
            label: "Client Expectations"
          },

          {
            type: "textarea",
            name: "driving_history",
            label: "Driving History"
          }

        ]
      },

      /* ===================================================== */
      /* DRIVING DETAILS                                       */
      /* ===================================================== */

      {
        title: "Driving Details",
        fields: [

          {
            type: "checkbox-group",
            name: "driving_license_type",
            label: "Driving License Type",
            options: [
              { label: "None", value: "None" },
              { label: "B2", value: "B2" },
              { label: "D", value: "D" },
              { label: "E", value: "E" },
              { label: "GDL", value: "GDL" },
              { label: "PSV", value: "PSV" },
              { label: "Others", value: "Other" }
            ]
          },

          {
            type: "radio",
            name: "returned_to_driving",
            label: "Returned to Drive Post Injury?",
            options: ["Yes", "No"]
          },

          {
            type: "textarea",
            name: "driving_duration_distance",
            label: "If Yes – Duration & Distance",
            showIf: {
              field: "returned_to_driving",
              equals: "Yes"
            }
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



      /* ===================================================== */
      /* PHYSICAL STATUS                                       */
      /* ===================================================== */

      {
        title: "Physical Status",
        fields: [
          {
            name: "neuro_scales",
            type: "assessment-launcher",
            options: [
              { label: "Range of Motion (ROM)", value: "rom" },
              { label: "Manual Muscle Test (MMT)", value: "mmt" },
              // { label: "Muscle Tone (MAS)", value: "mas" },
              // { label: "Functional Ambulation Category (FAC)", value: "fac" },
              // { label: "Motor Assessment Scale", value: "motor_mas" },
              // { label: "Fugl Meyer Assessment – Lower Extremity (FMA-LE)", value: "fma_le" },
              // { label: "Stand and Reposition Aids (SARA)", value: "sara" },
              // { label: "10 Meter Walk Test", value: "10mwt" },
              // { label: "Berg Balance Scale (BBS)", value: "bbs" },
              // { label: "Visual Analog Scale (VAS)", value: "vas" },
              // { label: "Timed Up and Go (TUG)", value: "tug" },
              // { label: "6 Minutes Walk Test (6MWT)", value: "6mwt" },
              // {label: "Fugl Meyer Assessment (FMA-UE)", value: "flug" },
              // {label: "Trunk Impairment Scale (TIS)", value: "tsi" }

            ]
          },
          {
            type: "radio",
            name: "dominant_side",
            label: "Dominant",
            options: ["Right", "Left"]
          },

          {
            type: "checkbox-group",
            name: "affected_side",
            label: "Affected",
            options: [
              { label: "Left UE", value: "LUE" },
              { label: "Right UE", value: "RUE" },
              { label: "Left LE", value: "LLE" },
              { label: "Right LE", value: "RLE" }
            ]
          }

        ]
      },

      /* ===================================================== */
      /* STUMP / SKIN CONDITION                                */
      /* ===================================================== */

      {
        title: "Stump / Skin Condition",
        fields: [

          {
            type: "radio",
            name: "wound_status",
            label: "Wound",
            options: ["Nil", "Present"]
          },

          {
            type: "textarea",
            name: "wound_details",
            label: "Wound Details",
            showIf: { field: "wound_status", equals: "Present" }
          },

          {
            type: "checkbox-group",
            name: "muscle_condition",
            label: "Muscle",
            options: [
              { label: "Firm", value: "Firm" },
              { label: "Flabby", value: "Flabby" },
              { label: "Atrophied", value: "Atrophied" },
              { label: "Others", value: "Other" }
            ]
          },

          {
            type: "radio",
            name: "edema",
            label: "Edema",
            options: ["Nil", "Present"]
          },

          {
            type: "input",
            name: "edema_grade",
            label: "Grade / Measurement"
          },

          {
            type: "checkbox-group",
            name: "skin_condition",
            label: "Skin",
            options: [
              { label: "Normal", value: "Normal" },
              { label: "Dry", value: "Dry" },
              { label: "Fragile", value: "Fragile" },
              { label: "Discoloured", value: "Discoloured" },
              { label: "Breakdown", value: "Breakdown" }
            ]
          },

          {
            type: "checkbox-group",
            name: "scar_type",
            label: "Scar",
            options: [
              { label: "Matured", value: "Matured" },
              { label: "Adhered", value: "Adhered" },
              { label: "Hypertrophic", value: "Hypertrophic" },
              { label: "Keloid", value: "Keloid" }
            ]
          },

          {
            type: "checkbox-group",
            name: "stump_shape",
            label: "Shape",
            options: [
              { label: "Conical", value: "Conical" },
              { label: "Cylindrical", value: "Cylindrical" },
              { label: "Bulbous", value: "Bulbous" }
            ]
          }

        ]
      },

      /* ===================================================== */
      /* SENSATION / PAIN                                      */
      /* ===================================================== */

      {
        title: "Sensation / Pain (Residual Limb)",
        fields: [

          {
            type: "radio",
            name: "phantom_sensation",
            label: "Phantom Sensation",
            options: ["Nil", "Sometimes", "Present", "Absent"]
          },

          {
            type: "radio",
            name: "phantom_pain",
            label: "Phantom Pain",
            options: ["Nil", "Sometimes", "Present", "Absent"]
          },

          {
            type: "input",
            name: "phantom_vas",
            label: "Phantom Pain VAS (0–10)"
          },

          {
            type: "radio",
            name: "stump_pain",
            label: "Stump Pain",
            options: ["Nil", "Sometimes", "Present", "Absent"]
          },

          {
            type: "input",
            name: "stump_vas",
            label: "Stump Pain VAS (0–10)"
          },

          {
            type: "radio",
            name: "hypersensitivity",
            label: "Hypersensitivity",
            options: ["Nil", "Yes"]
          },

          {
            type: "radio",
            name: "light_touch",
            label: "Light Touch",
            options: ["Intact", "Impaired"]
          },

          {
            type: "radio",
            name: "deep_touch",
            label: "Deep Touch",
            options: ["Intact", "Impaired"]
          },

          {
            type: "textarea",
            name: "semmes_weinstein",
            label: "Semmes Weinstein (if applicable)"
          }

        ]
      },

      /* ===================================================== */
      /* MOBILITY & AMBULATION                                 */
      /* ===================================================== */

      {
        title: "Mobility & Ambulation",
        fields: [

          {
            type: "checkbox-group",
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
            type: "checkbox-group",
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
          }

        ]
      },

      /* ===================================================== */
      /* TRANSFER                                              */
      /* ===================================================== */

      {
        title: "Transfer",
        fields: [

          {
            type: "checkbox-group",
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
            type: "checkbox-group",
            name: "toilet_transfer",
            label: "Toilet Transfer",
            options: [
              { label: "Independent", value: "Independent" },
              { label: "Assistance", value: "Assistance" }
            ]
          },

          {
            type: "textarea",
            name: "car_transfer",
            label: "Car Transfer (with/without prosthesis)"
          }

        ]
      },

      /* ===================================================== */
      /* STANDING TOLERANCE                                    */
      /* ===================================================== */

      {
        title: "Standing Tolerance",
        fields: [

          {
            type: "input",
            name: "standing_duration",
            label: "Standing Duration (minutes)"
          },

          {
            type: "radio",
            name: "standing_status",
            label: "Standing Status",
            options: ["Independent", "Requires Support", "Unable"]
          },

          {
            type: "textarea",
            name: "standing_observation",
            label: "Observation"
          }

        ]
      },

      /* ===================================================== */
      /* BALANCE TESTING                                       */
      /* ===================================================== */

      {
        title: "Balance Testing",
        fields: [

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
          }

        ]
      },

      /* ===================================================== */
      /* STRENGTH TESTING – JAMAR                              */
      /* ===================================================== */

      {
        title: "Strength Testing (Jamar Dynamometer)",
        fields: [

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
      },

      /* ===================================================== */
      /* STANDARDIZED OUTCOME MEASURES                         */
      /* ===================================================== */

      // {
      //   title: "Standardized Outcome Measures",
      //   fields: [

      //     {
      //       type: "checkbox-group",
      //       name: "objective_outcomes",
      //       label: "Include Assessments",
      //       options: [
      //         { label: "ROM (Active/Passive) – UL", value: "ROM" },
      //         { label: "MMT – UL", value: "MMT" },
      //         { label: "FIM", value: "FIM" },
      //         { label: "Lawton IADL", value: "Lawton" },
      //         { label: "MoCA", value: "MoCA" }
      //       ]
      //     }

      //   ]
      // },

      /* ===================================================== */
      /* FUNCTIONAL PERFORMANCE                                */
      /* ===================================================== */

      // {
      //   title: "Functional Performance",
      //   fields: [

      //     {
      //       type: "checkbox-group",
      //       name: "functional_performance",
      //       label: "Select",
      //       options: [
      //         { label: "ADL Assessment", value: "ADL" },
      //         { label: "IADL Assessment", value: "IADL" },
      //         { label: "Domestic Tasks", value: "Domestic" },
      //         { label: "Assistive Device Use", value: "AssistiveDevice" },
      //         { label: "Posture & Movement Analysis", value: "Posture" },
      //         { label: "Balance & Coordination Assessment", value: "Balance" }
      //       ]
      //     }

      //   ]
      // }

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
      /* FUNCTIONAL LIMITATIONS                                */
      /* ===================================================== */

      {
        title: "Functional Limitations",
        fields: [

          {
            type: "checkbox-group",
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
            type: "textarea",
            name: "functional_limitations_other",
            label: "If Others, Specify",
            showIf: {
              field: "functional_limitations",
              includes: "Other"
            }
          }

        ]
      },

      /* ===================================================== */
      /* UNDERLYING CAUSE                                      */
      /* ===================================================== */

      {
        title: "Underlying Cause",
        subtitle: "Include this in Neuro as well",
        fields: [

          {
            type: "checkbox-group",
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
            type: "textarea",
            name: "underlying_cause_other",
            label: "If Others, Specify",
            showIf: {
              field: "underlying_cause",
              includes: "Other"
            }
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
            name: "clinical_impression",
            label: "Clinical Impression"
          }
        ]
      },

      /* ===================================================== */
      /* REHAB PROGNOSIS                                       */
      /* ===================================================== */

      {
        title: "Rehabilitation Prognosis",
        fields: [

          {
            type: "radio",
            name: "rehab_prognosis",
            label: "Select Prognosis",
            options: ["Excellent", "Good", "Fair", "Poor"]
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