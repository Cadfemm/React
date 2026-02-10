// OrthoticsAssessment.jsx
import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";
import LowerExtremityOrthoticsPrescription from "./LowerExtremityorthoticsAssessment";
import UpperExtremityOrthoticsPrescription from "./UpperExtremityorthoticsAssessment";
import AboveKneeMeasurementForm from "./AboveKneeMeasurementForm";
import AnkleFootOrthosisMeasurementForm from "./AnkleFootOrthosisMeasurementForm";
import BelowKneeMeasurementForm from "./BelowKneeMeasurementForm";
import CorrectiveAccommodativeFootOrthosisForm from "./CorrectiveAccommodativeFootOrthosisForm";
import ScoliosisBraceMeasurementForm from "./ScoliosisBraceMeasurementForm";
/* ===================== OPTIONS ===================== */

const YES_NO = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];

const CLASSIFICATION = [
  { label: "Neuro", value: "neuro" },
  { label: "SCI", value: "sci" },
  { label: "MSD", value: "msd" },
  { label: "Others", value: "others" }
];

const ORTHOTICS_ASSESSMENT_REGISTRY = {
  lower_extremity_orthotics: LowerExtremityOrthoticsPrescription,
  upper_extremity_orthotics: UpperExtremityOrthoticsPrescription,
  above_knee_measurement: AboveKneeMeasurementForm,
  ankle_foot_orthosis_measurement: AnkleFootOrthosisMeasurementForm,
  below_knee_measurement: BelowKneeMeasurementForm,
  corrective_accommodative_foot_orthosis: CorrectiveAccommodativeFootOrthosisForm,
  scoliosis_brace_measurement: ScoliosisBraceMeasurementForm
};


const PROGNOSIS = [
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" }
];

const WALKING_AID = [
  { label: "None", value: "none" },
  { label: "SPC", value: "spc" },
  { label: "Quadripod", value: "quadripod" },
  { label: "Walking Frame", value: "wf" },
  { label: "Wheelchair", value: "wheelchair" }
];

const WALKING_PATTERN = [
  { label: "Normal", value: "normal" },
  { label: "Hemiplegic", value: "hemiplegic" },
  { label: "Antalgic", value: "antalgic" },
  { label: "Ataxic", value: "ataxic" },
  { label: "Trendelenburg", value: "trendelenburg" }
];

const FOOT_CLEARANCE = [
  { label: "Normal", value: "normal" },
  { label: "Reduced", value: "reduced" },
  { label: "Dragging", value: "dragging" },
  { label: "Foot Drop", value: "foot_drop" }
];

const STEP_LENGTH = [
  { label: "Normal", value: "normal" },
  { label: "Shortened (affected side)", value: "short_affected" }
];

const STANCE_PHASE = [
  { label: "Normal", value: "normal" },
  { label: "Knee collapse", value: "knee_collapse" },
  { label: "Genu recurvatum", value: "genu_recurvatum" },
  { label: "Hip instability", value: "hip_instability" }
];

const SWING_PHASE = [
  { label: "Normal", value: "normal" },
  { label: "Circumduction", value: "circumduction" },
  { label: "Hip hiking", value: "hip_hiking" },
  { label: "Reduced flexion", value: "reduced_flexion" }
];

const WEIGHT_BEARING = [
  { label: "Symmetrical", value: "symmetrical" },
  { label: "Asymmetrical", value: "asymmetrical" }
];

const GAIT_BALANCE = [
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" }
];

const ENDURANCE = [
  { label: "Good", value: "good" },
  { label: "Limited distance", value: "limited" },
  { label: "Fatigue early", value: "fatigue" }
];

const INDICATIONS = [
  { label: "Improve stability", value: "stability" },
  { label: "Improve foot clearance", value: "clearance" },
  { label: "Reduce pain", value: "pain" },
  { label: "Prevent deformity", value: "deformity" },
  { label: "Support weak limb", value: "support" }
];

const ORTHOSIS_TYPES = [
  "FO",
  "AFO Rigid",
  "AFO Hinged",
  "AFO PLS",
  "GRAFO",
  "KO",
  "KAFO",
  "WHO Functional",
  "WHO Resting",
  "WHO Anti-spastic",
  "Elbow ROM",
  "Shoulder Support",
  "LSO",
  "TLSO",
  "Cervical Collar"
].map(v => ({ label: v, value: v }));

/* ===================== SCHEMAS ===================== */

const ORTHOTICS_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

const SUBJECTIVE_SCHEMA = {
  actions: [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ],
  fields: [
    { name: "pain_score", label: "Pain Score (0–10)", type: "input" },
    { name: "patient_complaint", label: "Patient Complaint", type: "textarea" },
    {
      name: "functional_difficulty",
      label: "Functional Difficulty (ADL / Mobility / Work)",
      type: "textarea"
    },
    {
      name: "patient_goals",
      label: "Patient Goals / Expectations",
      type: "textarea"
    }
  ]
};

const OBJECTIVE_SCHEMA = {
  title: "Objective",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      title: "Orthotics Prescription Forms",
      showIf: { field: "assignment_type", equals: "orthotics" },
      fields: [
        {
          name: "orthotics_objective_forms",
          type: "assessment-launcher",
          options: [
            {
              label: "Lower Extremity Orthotics Prescription",
              value: "lower_extremity_orthotics"
            },
            {
              label: "Upper Extremity Orthotics Prescription",
              value: "upper_extremity_orthotics"
            },
            {
              label: "Above Knee Measurement Form",
              value: "above_knee_measurement"
            },
            {
              label: "Ankle Foot Orthosis Measurement Form",
              value: "ankle_foot_orthosis_measurement"
            },
            {
              label: "Below Knee Measurement Form",
              value: "below_knee_measurement"
            },
            {
              label: "Corrective / Accommodative Foot Orthosis Measurement Form",
              value: "corrective_accommodative_foot_orthosis"
            },
            {
              label: "Scoliosis Brace Measurement Form",
              value: "scoliosis_brace_measurement"
            }
          ]
        }
      ]
    },

    {
      title: "Physical Examination (Auto from MDT)",
      fields: [
        { name: "ul_mmt_r", label: "UL MMT Right", type: "textarea", readOnly: true },
        { name: "ul_mmt_l", label: "UL MMT Left", type: "textarea", readOnly: true },
        { name: "ll_mmt_r", label: "LL MMT Right", type: "textarea", readOnly: true },
        { name: "ll_mmt_l", label: "LL MMT Left", type: "textarea", readOnly: true },
        { name: "rom_auto", label: "ROM", type: "textarea", readOnly: true },
        { name: "tone_auto", label: "Tone", type: "textarea", readOnly: true },
        { name: "sensation_auto", label: "Sensation", type: "textarea", readOnly: true },
        { name: "skin_auto", label: "Skin Condition", type: "textarea", readOnly: true },
        {
          name: "po_picture",
          label: "Upload Picture (P&O)",
          type: "file-upload-modal"
        },
        {
          name: "functional_problems",
          label: "Functional Problems (editable)",
          type: "textarea"
        }
      ]
    },
    {
      title: "Gait Assessment",
      fields: [
        { name: "walking_aid", label: "Walking Aid Used", type: "radio", options: WALKING_AID },
        { name: "walking_pattern", label: "Walking Pattern", type: "radio", options: WALKING_PATTERN },
        { name: "foot_clearance", label: "Foot Clearance", type: "radio", options: FOOT_CLEARANCE },
        { name: "step_length", label: "Step Length", type: "radio", options: STEP_LENGTH },
        { name: "stance_phase", label: "Stance Phase", type: "radio", options: STANCE_PHASE },
        { name: "swing_phase", label: "Swing Phase", type: "radio", options: SWING_PHASE },
        { name: "weight_bearing", label: "Weight Bearing", type: "radio", options: WEIGHT_BEARING },
        { name: "gait_balance", label: "Balance During Gait", type: "radio", options: GAIT_BALANCE },
        { name: "endurance", label: "Endurance", type: "radio", options: ENDURANCE }
      ]
    }
  ]
};

const ASSESSMENT_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  fields: [
    { name: "orthotic_need", label: "Orthotic Need", type: "input" },
    {
      name: "indications",
      label: "Indication for Orthosis",
      type: "multi-select-dropdown",
      options: INDICATIONS
    },
    { name: "clinical_impression", label: "Clinical Impression", type: "textarea" },
    { name: "prognosis", label: "Prognosis", type: "single-select", options: PROGNOSIS }
  ]
};

const PLAN_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  fields: [
    {
      name: "orthosis_category",
      label: "Orthosis Category",
      type: "single-select",
      options: [
        { label: "Ready-Made", value: "ready" },
        { label: "Custom-Made", value: "custom" }
      ]
    },

    /* READY-MADE */
    {
      name: "ready_model",
      label: "Orthosis Model",
      type: "input",
      showIf: { field: "orthosis_category", equals: "ready" }
    },
    {
      name: "ready_size",
      label: "Size",
      type: "single-select",
      options: ["S", "M", "L", "XL"].map(v => ({ label: v, value: v })),
      showIf: { field: "orthosis_category", equals: "ready" }
    },
    {
      name: "ready_adjustment",
      label: "Adjustment Required",
      type: "radio",
      options: YES_NO,
      showIf: { field: "orthosis_category", equals: "ready" }
    },

    /* CUSTOM-MADE */
    {
      name: "custom_casting",
      label: "Casting Required",
      type: "radio",
      options: YES_NO,
      showIf: { field: "orthosis_category", equals: "custom" }
    },
    {
      name: "custom_modification",
      label: "Modification Notes",
      type: "textarea",
      showIf: { field: "orthosis_category", equals: "custom" }
    },
    {
      name: "custom_material",
      label: "Material Type",
      type: "single-select",
      options: [
        { label: "Soft", value: "soft" },
        { label: "Semi-rigid", value: "semi" },
        { label: "Rigid", value: "rigid" }
      ],
      showIf: { field: "orthosis_category", equals: "custom" }
    },
    {
      name: "custom_features",
      label: "Custom Features",
      type: "checkbox-group",
      options: [
        { label: "Straps", value: "straps" },
        { label: "Padding", value: "padding" },
        { label: "Hinges", value: "hinges" },
        { label: "Others", value: "others" }
      ],
      showIf: { field: "orthosis_category", equals: "custom" }
    },

    { type: "subheading", label: "Orthosis Details" },

    {
      name: "orthosis_type",
      label: "Orthosis Type",
      type: "single-select",
      options: ORTHOSIS_TYPES
    },
    {
      name: "orthosis_material",
      label: "Material",
      type: "single-select",
      options: [
        { label: "Soft", value: "soft" },
        { label: "Semi-rigid", value: "semi" },
        { label: "Rigid", value: "rigid" }
      ]
    },
    { name: "orthosis_notes", label: "Additional Notes", type: "input" },
    { name: "measurement_date", label: "Measurement Date", type: "date" },
    { name: "casting_required", label: "Casting Required", type: "radio", options: YES_NO },
    { name: "casting_date", label: "Casting Date", type: "date" },
    {
      name: "follow_up",
      label: "Follow-up",
      type: "single-select",
      options: [
        { label: "2 weeks", value: "2w" },
        { label: "4 weeks", value: "4w" },
        { label: "Others", value: "others" }
      ]
    }
  ]
};

/* ===================== PROSTHETICS SCHEMAS ===================== */

const PROSTHETICS_SUBJECTIVE_SCHEMA = {

  actions: [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ],
  sections: [
       {
      title: "Prosthetic Status",
      fields: [
        {
          type: "radio",
          name: "prosthesis_restoration",
          label: "Prosthesis Restoration",
          options: [
            { label: "New", value: "new" },
            { label: "Repair", value: "repair" }
          ]
        },
        {
          type: "radio",
          name: "inspire_scheme",
          label: "INSPIRE Scheme",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },
        {
          name: "supplier_name",
          label: "Supplier Name",
          type: "single-select",
          showIf: { field: "inspire_scheme", equals: "yes" },
          options: [
            { label: "Unit P&O PRPSB", value: "unit_po_prpsb" },
            { label: "TehLin", value: "tehlin" },
            { label: "Warisan Jasamedik", value: "warisan" },
            { label: "Limb Brace", value: "limb_brace" },
            { label: "Bioapps", value: "bioapps" },
            { label: "Hasba Medik", value: "hasba" },
            { label: "Restu Progresif", value: "restu" },
            { label: "Central Limb", value: "central_limb" },
            { label: "RS Alfa", value: "rs_alfa" },
            { label: "Secure Logic Tech (SLT)", value: "slt" }
          ]
        },
        { type: "date", name: "po_date", label: "PO Date" }
      ]
    },

    /* ================= SUBJECTIVE ================= */
    {
      title: "Subjective",
      fields: [
        { name: "chief_complaint", label: "Chief Complaint", type: "textarea" },
        { name: "history_present_illness", label: "History of Present Illness", type: "textarea" },
        { name: "stump_pain", label: "Stump Pain", type: "textarea" },
        { name: "pain_score", label: "Pain Score (1–10)", type: "input" }
      ]
    },
  ]
};

const PROSTHETICS_OBJECTIVE_SCHEMA = {
  title: "Objective",
  actions: PROSTHETICS_SUBJECTIVE_SCHEMA.actions,
  sections: [    /* ================= OBJECTIVE ================= */
    {
      title: "Objective",
      fields: [
        {
          type: "radio",
          name: "k_level",
          label: "Functional Classification (K-Level – PT Input)",
          options: [
            { label: "K0", value: "k0" },
            { label: "K1", value: "k1" },
            { label: "K2", value: "k2" },
            { label: "K3", value: "k3" },
            { label: "K4", value: "k4" }
          ]
        },

      ]
    },
    {
      title: "Physical Performance Measures",
      fields: [

        {
          type: "row",
          fields: [
            { name: "grip_right", label: "Grip Strength – Right (kg)", type: "input" },
            { name: "grip_left", label: "Grip Strength – Left (kg)", type: "input" }
          ]
        },

        {
          type: "row",
          fields: [
            { name: "mmt_ll_right", label: "MMT Lower Limb – Right /5", type: "input" },
            { name: "mmt_ll_left", label: "MMT Lower Limb – Left /5", type: "input" }
          ]
        },

        {
          type: "row",
          fields: [
            { name: "mmt_ul_right", label: "MMT Upper Limb – Right /5", type: "input" },
            { name: "mmt_ul_left", label: "MMT Upper Limb – Left /5", type: "input" }
          ]
        }
      ]
    },

    /* ================= RESIDUAL LIMB ================= */
    {
      title: "Residual Limb Evaluation",
      fields: [
        { type: "date", name: "assessment_date", label: "Date of Assessment" },

   {
  type: "row",
  fields: [
    {
      type: "multi-select-dropdown",
      name: "lower_limb_level",
      label: "Lower Limb",
      options: [
        { label: "Above Knee (AK)", value: "ak" },
        { label: "Below Knee (BK)", value: "bk" },
        { label: "Hip Disarticulation", value: "hip" },
        { label: "Rays Amputation", value: "rays" },
        { label: "Carpal / Metacarpal", value: "carpal" },
        { label: "Others", value: "others" }
      ]
    },

    {
      type: "multi-select-dropdown",
      name: "upper_limb_level",
      label: "Upper Limb",
      options: [
        { label: "Above Elbow (AE)", value: "ae" },
        { label: "Below Elbow (BE)", value: "be" },
        { label: "Shoulder Disarticulation", value: "shoulder" },
        { label: "Rays Amputation", value: "rays" },
        { label: "Carpal / Metacarpal", value: "carpal" },
        { label: "Others", value: "others" }
      ]
    }
  ]
},

        {
          type: "textarea",
          name: "lower_limb_other_details",
          label: "Lower Limb – Others (Specify)",
          showIf: {
            field: "lower_limb_level",
            includes: "others"
          }
        },


        {
          type: "textarea",
          name: "upper_limb_other_details",
          label: "Upper Limb – Others (Specify)",
          showIf: {
            field: "upper_limb_level",
            includes: "others"
          }
        },


        { type: "date", name: "amputation_date", label: "Date of Amputation" },

        {
          type: "checkbox-group",
          name: "cause",
          label: "Cause",
          options: [
            { label: "Trauma", value: "trauma" },
            { label: "Vascular", value: "vascular" },
            { label: "Infection", value: "infection" },
            { label: "Tumour", value: "tumour" },
            { label: "Congenital", value: "congenital" }
          ]
        },

        { name: "referring_physician", label: "Referring Physician", type: "textarea" },
        { name: "diagnosis_code", label: "Diagnosis Code", type: "textarea" }
      ]
    },

    /* ================= MEASUREMENTS ================= */
    {
      title: "Residual Limb Measurements (Baseline)",
      fields: [
        {
          type: "grid-table-flat",
          name: "circumference",
          headers: ["Circumference (cm)"],
          rows: [
            { key: "proximal", label: "Proximal" },
            { key: "middle", label: "Middle" },
            { key: "distal", label: "Distal" },
            { key: "Length of Residual Limb (cm)", label: "Length of Residual Limb (cm)" },
            { key: "Contralateral Limb Reference (cm)", label: "Contralateral Limb Reference (cm)" },   

          ]
        },
       
      ]
    },

    /* ================= SKIN CONDITION ================= */
    {
      title: "Skin Integrity & Limb Condition",
      fields: [
        {
          type: "checkbox-group",
          name: "skin_condition",
          label: "Skin Condition",
           position: "side",
          options: [
            { label: "Intact", value: "intact" },
            { label: "Dry", value: "dry" },
            { label: "Fragile", value: "fragile" },
            { label: "Macerated", value: "macerated" },
            { label: "Wound", value: "wound" },
            { label: "Scar Adhesion", value: "scar" }
          ]
        },

        {
          type: "checkbox-group",
          name: "edema",
          label: "Edema",
            position: "side",
          options: [
            { label: "None", value: "none" },
            { label: "Mild", value: "mild" },
            { label: "Moderate", value: "moderate" },
            { label: "Severe", value: "severe" }
          ]
        },

        // Added remaining fields for comprehensive skin and limb assessment
        {
          type: "checkbox-group",
          name: "skin_temperature",
          label: "Skin Temperature",
          position: "side",
          options: [
            { label: "Warm", value: "warm" },
            { label: "Cool", value: "cool" },
            { label: "Cold", value: "cold" }
          ]
        },

        {
          type: "checkbox-group",
          name: "skin_color",
          label: "Skin Color",
          position: "side",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Pale", value: "pale" },
            { label: "Red", value: "red" },
            { label: "Cyanotic", value: "cyanotic" }
          ]
        },

          /* ===== Sensation ===== */
    {
      type: "checkbox-group",
      name: "sensation",
      label: "Sensation",
      position: "side",
      options: [
        { label: "Intact", value: "intact" },
        { label: "Reduced", value: "reduced" },
        { label: "Absent", value: "absent" },
        { label: "Hypersensitive", value: "hypersensitive" }
      ]
    },

    /* ===== Pain / Tenderness ===== */
    {
      type: "checkbox-group",
      name: "pain_tenderness",
      label: "Pain / Tenderness",
            position: "side",

      options: [
        { label: "None", value: "none" },
        { label: "Mild", value: "mild" },
        { label: "Moderate", value: "moderate" },
        { label: "Severe", value: "severe" }
      ]
    },

    /* ===== Phantom Sensation / Pain ===== */
    {
      type: "radio",
      name: "phantom_sensation",
      label: "Phantom Sensation / Pain",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },

    /* ===== Shape ===== */
    {
      type: "checkbox-group",
      name: "stump_shape",
      label: "Shape",
            position: "side",

      options: [
        { label: "Conical", value: "conical" },
        { label: "Cylindrical", value: "cylindrical" },
        { label: "Bulbous", value: "bulbous" },
        { label: "Irregular", value: "irregular" }
      ]
    },

    /* ===== Bony Prominences ===== */
    {
      type: "radio",
      name: "bony_prominences",
      label: "Bony Prominences",
      options: [
        { label: "None", value: "none" },
        { label: "Present", value: "present" }
      ]
    },
    {
      type: "textarea",
      name: "bony_prominences_notes",
      label: " specify",
      showIf: { field: "bony_prominences", equals: "present" }
    },

    /* ===== Scars ===== */
    {
      type: "checkbox-group",
      name: "scars",
      label: "Scars",
      position: "side",
      options: [
        { label: "None", value: "none" },
        { label: "Healed", value: "healed" },
        { label: "Adherent", value: "adherent" },
        { label: "Painful", value: "painful" }
      ]
    },

        {
          type: "textarea",
          name: "additional_notes",
          label: "Additional Notes on Skin Integrity & Limb Condition"
        }
      ]
    },
    {
  title: "Wound Assessment (If Present)",
  fields: [

    /* ===== Is Wound Present ===== */
    {
      type: "radio",
      name: "wound_present",
      label: "Wound Present",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },

    /* ===== Location ===== */
    {
      type: "input",
      name: "wound_location",
      label: "Location",
      showIf: { field: "wound_present", equals: "yes" }
    },

    /* ===== Size ===== */
    {
      type: "input",
      name: "wound_size",
      label: "Size (L × W × D)",
      placeholder: "e.g. 4 × 2 × 1 cm",
      showIf: { field: "wound_present", equals: "yes" }
    },

    /* ===== Exudate ===== */
    {
      type: "checkbox-group",
      name: "wound_exudate",
      label: "Exudate",
      position: "side",
      options: [
        { label: "None", value: "none" },
        { label: "Serous", value: "serous" },
        { label: "Purulent", value: "purulent" }
      ],
      showIf: { field: "wound_present", equals: "yes" }
    },

    /* ===== Odor ===== */
    {
      type: "radio",
      name: "wound_odor",
      label: "Odor",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ],
      showIf: { field: "wound_present", equals: "yes" }
    },

    /* ===== Stage / Type ===== */
    {
      type: "input",
      name: "wound_stage_type",
      label: "Stage / Type",
      showIf: { field: "wound_present", equals: "yes" }
    },

    /* ===== Dressing Used ===== */
    {
      type: "input",
      name: "wound_dressing_used",
      label: "Dressing Used",
      showIf: { field: "wound_present", equals: "yes" }
    }

  ]
},
{
  title: "Stump Characteristics",
  fields: [
    {
      type: "radio",
      name: "stump_length",
      label: "Stump Length",
      options: [
        { label: "Short", value: "short" },
        { label: "Medium", value: "medium" },
        { label: "Long", value: "long" }
      ]
    },
    {
      type: "radio",
      name: "stump_shape",
      label: "Stump Shape",
      options: [
        { label: "Bulbous", value: "bulbous" },
        { label: "Cylindrical", value: "cylindrical" },
        { label: "Conical", value: "conical" }
      ]
    },
    {
      type: "radio",
      name: "muscle_tissue",
      label: "Muscle Tissue",
      options: [
        { label: "Firm", value: "firm" },
        { label: "Adequate", value: "adequate" },
        { label: "Flabby", value: "flabby" }
      ]
    },
    {
      type: "radio",
      name: "keloid_present",
      label: "Keloid Present",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    }
  ]
}]
};

const PROSTHETICS_ASSESSMENT_SCHEMA = {
  actions: PROSTHETICS_SUBJECTIVE_SCHEMA.actions,
   fields: [

    /* ===== Dates ===== */
    {
      type: "date",
      name: "assessment_date",
      label: "Date of Assessment"
    },
    {
      type: "date",
      name: "amputation_date",
      label: "Date of Amputation"
    },

    /* ===== Cause ===== */
    {
      type: "checkbox-group",
      name: "amputation_cause",
      label: "Cause",
      options: [
        { label: "Trauma", value: "trauma" },
        { label: "Vascular", value: "vascular" },
        { label: "Infection", value: "infection" },
        { label: "Tumour", value: "tumour" },
        { label: "Congenital", value: "congenital" }
      ]
    },

    /* ===== Referrer ===== */
    {
      type: "input",
      name: "referring_physician",
      label: "Referring Physician"
    },

    /* ===== Clinical Impression ===== */
    {
      type: "textarea",
      name: "clinical_impression",
      label: "Clinical Impression"
    },

    /* ===== Casting Readiness ===== */
    {
      type: "radio",
      name: "assessment_ready_for_casting",
      label: "Ready for Casting",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      type: "textarea",
      name: "assessment_casting_reason",
      label: "If No – Reason / Plan",
      showIf: { field: "assessment_ready_for_casting", equals: "no" }
    },
    {
      type: "date",
      name: "assessment_next_review",
      label: "Next Review Date"
    },
    {
  title: "Stump Characteristics",
  fields: [
    {
      type: "radio",
      name: "stump_length",
      label: "Stump Length",
      options: [
        { label: "Short", value: "short" },
        { label: "Medium", value: "medium" },
        { label: "Long", value: "long" }
      ]
    },
    {
      type: "input",
      name: "stump_length_notes",
      label: "Stump Length (Free Text / Notes)"
    },
    {
      type: "radio",
      name: "stump_shape",
      label: "Stump Shape",
      options: [
        { label: "Bulbous", value: "bulbous" },
        { label: "Cylindrical", value: "cylindrical" },
        { label: "Conical", value: "conical" }
      ]
    },
    {
      type: "radio",
      name: "muscle_tissue_type",
      label: "Tissue Type (Muscle)",
      options: [
        { label: "Firm", value: "firm" },
        { label: "Adequate", value: "adequate" },
        { label: "Flabby", value: "flabby" }
      ]
    },
    {
      type: "radio",
      name: "keloid_presence",
      label: "Presence of Keloid",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    }
  ]
},{
  title: "Joint Range / Alignment",
  fields: [
    {
      type: "input",
      name: "hip_flexion_angle",
      label: "Hip Flexion Angle (°)",
      placeholder: "e.g. 110"
    },
    {
      type: "input",
      name: "knee_flexion_angle",
      label: "Knee Flexion Angle (°)",
      placeholder: "e.g. 120"
    },
    {
      type: "input",
      name: "abduction_angle",
      label: "Abduction Angle (°)",
      placeholder: "e.g. 15"
    }
  ]
},
{
  title: "Casting Readiness (Assessment)",
  fields: [
    {
      type: "radio",
      name: "assessment_ready_for_casting",
      label: "Ready for Casting",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      type: "textarea",
      name: "assessment_casting_plan",
      label: "If No – Justification / Plan",
      showIf: { field: "assessment_ready_for_casting", equals: "no" }
    },
    {
      type: "date",
      name: "assessment_next_review_date",
      label: "Next Review Date"
    }
  ]
},
{
  title: "Lower Limb Prosthesis Prescription (Assessment)",
  fields: [
    {
      type: "checkbox-group",
      name: "ll_suspension_system",
      label: "Suspension System",
      options: [
        { label: "Pelite", value: "pelite" },
        { label: "Pin Lock", value: "pin_lock" },
        { label: "Suction", value: "suction" },
        { label: "Lanyard", value: "lanyard" },
        { label: "Seal-in", value: "seal_in" }
      ]
    },
    {
      type: "checkbox-group",
      name: "ll_socket_design",
      label: "Socket Design",
      options: [
        { label: "Patella Tendon Bearing (PTB)", value: "ptb" },
        { label: "Total Surface Bearing (TSB)", value: "tsb" },
        { label: "Ischial Containment (IC)", value: "ic" },
        { label: "Quadrilateral", value: "quadrilateral" }
      ]
    },
    {
      type: "checkbox-group",
      name: "ll_knee_joint",
      label: "Knee Joint",
      options: [
        { label: "Safety Knee", value: "safety" },
        { label: "4-Bar Knee", value: "four_bar" },
        { label: "Pneumatic", value: "pneumatic" }
      ]
    },
    {
      type: "checkbox-group",
      name: "ll_foot_type",
      label: "Foot",
      options: [
        { label: "SACH", value: "sach" },
        { label: "Single Axis", value: "single_axis" },
        { label: "Multi-flex", value: "multi_flex" },
        { label: "Energy Storing", value: "energy_storing" }
      ]
    }
  ]
}



  ]
};

const PROSTHETICS_PLAN_SCHEMA = {
  actions: PROSTHETICS_SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      title: "Lower Limb Prosthesis Prescription",
      fields: [
        {
          type: "checkbox-group",
          name: "ll_suspension_system",
          label: "Suspension System",
          options: [
            { label: "Pelite", value: "pelite" },
            { label: "Pin Lock", value: "pin_lock" },
            { label: "Suction", value: "suction" },
            { label: "Lanyard", value: "lanyard" },
            { label: "Seal-in", value: "seal_in" }
          ]
        },
        {
          type: "checkbox-group",
          name: "ll_socket_design",
          label: "Socket Design",
          options: [
            { label: "Patella Tendon Bearing (PTB)", value: "ptb" },
            { label: "Total Surface Bearing (TSB)", value: "tsb" },
            { label: "Ischial Containment (IC)", value: "ic" },
            { label: "Quadrilateral", value: "quadrilateral" }
          ]
        },
        {
          type: "checkbox-group",
          name: "ll_knee_joint",
          label: "Knee Joint",
          options: [
            { label: "Safety Knee", value: "safety" },
            { label: "4-Bar Knee", value: "4_bar" },
            { label: "Pneumatic", value: "pneumatic" }
          ]
        },
        {
          type: "checkbox-group",
          name: "ll_foot_type",
          label: "Foot",
          options: [
            { label: "SACH", value: "sach" },
            { label: "Single Axis", value: "single_axis" },
            { label: "Multi-flex", value: "multi_flex" },
            { label: "Energy Storing", value: "energy_storing" }
          ]
        }
      ]
    },
    {
      title: "Upper Limb Prosthesis Prescription",
      fields: [
        {
          type: "checkbox-group",
          name: "ul_functionality",
          label: "Functionality",
          options: [
            { label: "Cosmesis", value: "cosmesis" },
            { label: "Mechanical", value: "mechanical" },
            { label: "Myoelectric Hand", value: "myoelectric" }
          ]
        },
        {
          type: "checkbox-group",
          name: "ul_socket_type",
          label: "Socket Type",
          options: [
            { label: "Transradial", value: "transradial" },
            { label: "Transhumeral", value: "transhumeral" },
            { label: "Partial Hand", value: "partial_hand" },
            { label: "Finger", value: "finger" }
          ]
        }
      ]
    },
    {
      title: "Scheduling",
      fields: [
        {
          type: "date",
          name: "casting_date",
          label: "Casting Date"
        },
        {
          type: "date",
          name: "fitting_date",
          label: "Fitting Date",
          helper: "Auto: 4 working days post casting"
        }
      ]
    }
  ]
};

/* ===================== COMPONENT ===================== */

export default function OrthoticsAssessment({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({ assignment_type: 'orthotics' });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  const storageKey = patient ? `orthotics_draft_${patient.id}` : null;

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
      ul_mmt_r: patient.ul_mmt_r,
      ul_mmt_l: patient.ul_mmt_l,
      ll_mmt_r: patient.ll_mmt_r,
      ll_mmt_l: patient.ll_mmt_l,
      rom_auto: patient.rom,
      tone_auto: patient.tone,
      sensation_auto: patient.sensation,
      skin_auto: patient.skin
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
    if (type === "clear") {
      setValues({ assignment_type: 'orthotics' });
      setSubmitted(false);
      localStorage.removeItem(storageKey);
    }
    if (type === "save") {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ values, updatedAt: new Date() })
      );
      alert("Orthotics draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Orthotics assessment submitted");
  };

  const schemaMap = values.assignment_type === 'orthotics' ? {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  } : {
    subjective: PROSTHETICS_SUBJECTIVE_SCHEMA,
    objective: PROSTHETICS_OBJECTIVE_SCHEMA,
    assessment: PROSTHETICS_ASSESSMENT_SCHEMA,
    plan: PROSTHETICS_PLAN_SCHEMA
  };

  function PatientInfo({ patient, values, onChange }) {
    if (!patient) return null;
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          fontSize: 14
        }}>
          <div><b>Name:</b> {patient.name}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {patient.dob}</div>
          <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
          <div><b>Primary Diagnosis:</b> {patient.icd}</div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <b>What do you want to perform?</b>
            <div style={{ display: 'flex', gap: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="radio"
                  name="assignment_type"
                  value="orthotics"
                  checked={values.assignment_type === 'orthotics'}
                  onChange={(e) => onChange('assignment_type', e.target.value)}
                />
                Orthotics
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="radio"
                  name="assignment_type"
                  value="prosthetics"
                  checked={values.assignment_type === 'prosthetics'}
                  onChange={(e) => onChange('assignment_type', e.target.value)}
                />
                Prosthetics
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={ORTHOTICS_CONTAINER_SCHEMA}
        values={values}
        onChange={onChange}
      >
        <PatientInfo patient={patient} values={values} onChange={onChange} />
      </CommonFormBuilder>

      <div style={{
        display: "flex",
        gap: 12,
        justifyContent: "center",
        borderBottom: "1px solid #ddd",
        marginBottom: 12
      }}>
        {["subjective", "objective", "assessment", "plan"].map(tab => (
          <div
            key={tab}
            style={{
              padding: "10px 22px",
              fontWeight: 600,
              cursor: "pointer",
              color: activeTab === tab ? "#2451b3" : "#0f172a",
              borderBottom: activeTab === tab ? "3px solid #2451b3" : "none"
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

     <CommonFormBuilder
  schema={schemaMap[activeTab]}
  values={values}
  onChange={onChange}
  submitted={submitted}
  onAction={handleAction}
  assessmentRegistry={ORTHOTICS_ASSESSMENT_REGISTRY}
>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button
            style={{
              padding: "12px 32px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}
