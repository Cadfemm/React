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
import LowerLimbProsthesisPrescription from "./LowerExtremityProsthetics"
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
  lower_extremity_prosthotics:LowerLimbProsthesisPrescription,
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
  { label: "Single Point Cane (SPC)", value: "spc" },
  { label: "Quadripod", value: "quadripod" },
  { label: "Walking Frame", value: "wf" },
  { label: "Wheelchair", value: "wheelchair" },
  { label: "None", value: "none" },
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
    { name: "chief_complaint", label: "Chief Complaint", type: "textarea" },
    { name: "history_present_illness", label: "History of Present Illness", type: "textarea" },
    {
      type: "scale-slider",
      name: "pain_score",
      label: "Pain Score (0–10)",
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
    {
      name: "functional_difficulty",
      label: "Functional Difficulty (Patient Reported)",
      type: "textarea"
    },
    {
      type: "radio",
      name: "phantom_limb_pain",
      label: "Phantom Limb Sensation / Pain",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      type: "textarea",
      name: "functional",
      label: "Specify Phantom Limb Sensation",
      showIf: {
        field: "phantom_limb_pain",
        equals: "yes"
      }
    },
    {
      name: "patient_goals",
      label: "Patient Goals / Expectations",
      type: "textarea"
    },
        {
      type: "checkbox-group",
      name: "additional_symptoms",
      label: "Additional Symptoms",
      options: [
        { label: "Pain", value: "yes" },
        { label: "Weakness", value: "yes" },
        { label: "Instability", value: "yes" },
        { label: "Spasticity", value: "yes" },
        { label: "Deformity", value: "yes" },
        { label: "Fatigue during walking", value: "yes" }
      ]
    },
  ]
};

const OBJECTIVE_SCHEMA = {
  title: "",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [{
   

    fields: [
      { type: "subheading", label: "Physical Examination" },
      { name: "ul_mmt_r", label: "UL MMT Right", type: "textarea", readOnly: true },
      { name: "ul_mmt_l", label: "UL MMT Left", type: "textarea", readOnly: true },
      { name: "ll_mmt_r", label: "LL MMT Right", type: "textarea", readOnly: true },
      { name: "ll_mmt_l", label: "LL MMT Left", type: "textarea", readOnly: true },
      { name: "rom_auto", label: "ROM", type: "textarea", readOnly: true },
      { name: "tone_auto", label: "Tone", type: "textarea", readOnly: true },
      { name: "sensation_auto", label: "Sensation", type: "textarea", readOnly: true },
      { name: "skin_auto", label: "Skin Condition", type: "textarea", readOnly: true },
      { name: "po_picture", label: "Upload Picture (P&O)", type: "file-upload-modal" },
      { name: "functional_problems", label: "Functional Problems", type: "textarea" },
      {type: "subheading", label: "Orthotic Assessment"},
           {
          name: "orthotics_objective_forms",
          type: "assessment-launcher",
          options: [
            {
              label: "Lower Extremity Orthotics Prescription",
              value: "lower_extremity_orthotics"
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
        },
      {
        type: "subheading",
        label: "Postural / Alignment Assessment"
      },

      {
        type: "radio",
        name: "pelvic_alignment",
        label: "Pelvic Alignment",
        options: [
          { label: "Neutral", value: "neutral" },
          { label: "Anterior tilt", value: "anterior_tilt" },
          { label: "Posterior tilt", value: "posterior_tilt" },
          { label: "Obliquity", value: "obliquity" }
        ]
      },

      {
        type: "radio",
        name: "knee_alignment",
        label: "Knee Alignment",
        options: [
          { label: "Neutral", value: "neutral" },
          { label: "Varus", value: "varus" },
          { label: "Valgus", value: "valgus" },
          { label: "Flexion deformity", value: "flexion_deformity" },
          { label: "Recurvatum", value: "recurvatum" }
        ]
      },

      {
        type: "radio",
        name: "foot_alignment",
        label: "Foot Alignment",
        options: [
          { label: "Neutral", value: "neutral" },
          { label: "Pes planus", value: "pes_planus" },
          { label: "Pes cavus", value: "pes_cavus" },
          { label: "Equinus", value: "equinus" },
          { label: "Calcaneus", value: "calcaneus" }
        ]
      },

      {
        type: "radio",
        name: "spinal_alignment",
        label: "Spinal Alignment",
        options: [
          { label: "Normal", value: "normal" },
          { label: "Kyphosis", value: "kyphosis" },
          { label: "Lordosis", value: "lordosis" },
          { label: "Scoliosis", value: "scoliosis" }
        ]
      },

      {
  type: "subheading",
  label: "Joint Contracture / Deformity"
},

{
  type: "radio",
  name: "ankle_contracture",
  label: "Ankle Contracture",
  options: [
    { label: "Mild", value: "mild" },
    { label: "Moderate", value: "moderate" },
    { label: "Severe", value: "severe" },
    { label: "None", value: "none" },
  ]
},

{
  type: "radio",
  name: "knee_contracture",
  label: "Knee Contracture",
  options: [
    { label: "Mild", value: "mild" },
    { label: "Moderate", value: "moderate" },
    { label: "Severe", value: "severe" },
    { label: "None", value: "none" },
  ]
},

{
  type: "radio",
  name: "hip_contracture",
  label: "Hip Contracture",
  options: [
    { label: "Mild", value: "mild" },
    { label: "Moderate", value: "moderate" },
    { label: "Severe", value: "severe" },
    { label: "None", value: "none" },
  ]
},

{
  type: "checkbox-group",
  name: "upper_limb_contracture",
  label: "Upper Limb Contracture",
  options: [
    { label: "Elbow", value: "elbow" },
    { label: "Wrist", value: "wrist" },
    { label: "Fingers", value: "fingers" }
  ]
},{
  type: "subheading",
  label: "Skin & Limb Inspection"
},

{
  type: "radio",
  name: "skin_condition",
  label: "Skin Condition",
  position: "side",
  options: [
    { label: "Normal", value: "normal" },
    { label: "Redness", value: "redness" },
    { label: "Pressure area", value: "pressure_area" },
    { label: "Ulcer", value: "ulcer" },
    { label: "Scar", value: "scar" }
  ]
},

{
  type: "radio",
  name: "pressure_risk_areas",
  label: "Pressure Risk Areas",
  position: "side",
  options: [
    { label: "Heel", value: "heel" },
    { label: "Malleolus", value: "malleolus" },
    { label: "Tibial crest", value: "tibial_crest" },
    { label: "Metatarsal head", value: "metatarsal_head" },
    { label: "Olecranon", value: "olecranon" },
    { label: "Wrist", value: "wrist" }
  ]
},

{
  type: "attach-file",
  name: "limb_picture",
  label: "Upload Picture"
},
      { type: "subheading", label: "Gait Assessment" },
      { name: "walking_aid", label: "Walking Aid Used", type: "radio", options: WALKING_AID },
      { name: "walking_pattern", label: "Walking Pattern", type: "radio", options: WALKING_PATTERN },
      { name: "foot_clearance", label: "Foot Clearance", type: "radio", options: FOOT_CLEARANCE },
      { name: "step_length", label: "Step Length", type: "radio", options: STEP_LENGTH },
      { name: "stance_phase", label: "Stance Phase", type: "radio", options: STANCE_PHASE },
      { name: "swing_phase", label: "Swing Phase", type: "radio", options: SWING_PHASE },
      { name: "weight_bearing", label: "Weight Bearing", type: "radio", options: WEIGHT_BEARING },
      { name: "gait_balance", label: "Balance During Gait", type: "radio", options: GAIT_BALANCE },
      {
        type: "radio", name: "static_balance", label: "Static Balance", options: [
          { label: "Good", value: "good" },
          { label: "Fair", value: "fair" },
          { label: "Poor", value: "poor" }
        ]
      },

      {
        type: "radio",
        name: "dynamic_balance",
        label: "Dynamic Balance",
        options: [
          { label: "Good", value: "good" },
          { label: "Fair", value: "fair" },
          { label: "Poor", value: "poor" }
        ]
      },
      { name: "endurance", label: "Endurance", type: "radio", options: ENDURANCE },

    ]
  }]
};

const ASSESSMENT_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  fields: [
    // { name: "orthotic_need", label: "Orthotic Need", type: "input" },
    // {
    //   name: "indications",
    //   label: "Indication for Orthosis",
    //   type: "multi-select-dropdown",
    //   options: INDICATIONS
    // },
    { name: "clinical_impression", label: "Clinical Impression", type: "textarea" },
        { name: "functional_limitation_summary", label: "Functional Limitation Summary", type: "textarea" },

    { name: "prognosis", label: "Prognosis", type: "radio", options: PROGNOSIS }
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
        { name: "fitting_date", label: "Fitting Date", type: "date" },

    { name: "casting_date", label: "Casting Date", type: "date" },
    {
  type: "subheading",
  label: "Orthosis Wearing Schedule"
},

{
  type: "radio",
  name: "usage_plan",
  label: "Usage Plan",
  labelAbove: true,
  // position: "side",
  options: [
    { label: "Full day use", value: "full_day_use" },
    { label: "During ambulation", value: "during_ambulation" },
    { label: "Activity specific", value: "activity_specific" },
    { label: "Night splint", value: "night_splint" }
  ]
},

{
  type: "radio",
  name: "patient_education_provided",
  label: "Patient Education Provided",
  labelAbove: true,
  // position: "side",
  options: [
    { label: "Donning & doffing", value: "donning_doffing" },
    { label: "Skin monitoring", value: "skin_monitoring" },
    { label: "Cleaning instructions", value: "cleaning_instructions" },
    { label: "Wearing schedule explained", value: "wearing_schedule_explained" }
  ]
},
    {
      name: "follow_up",
      label: "Follow-up",
      type: "radio",
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
    /* ================= SUBJECTIVE ================= */
    {
      title: "",
      fields: [
        { name: "chief_complaint", label: "Chief Complaint", type: "textarea" },
        { name: "history_present_illness", label: "History of Present Illness", type: "textarea" },
        { name: "stump_pain", label: "Stump Pain", type: "textarea" },

        {
          type: "radio",
          name: "phantom_limb_pain",
          label: "Phantom Limb Sensation / Pain",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },
        {
          type: "textarea",
          name: "functional_difficulty",
          label: "Specify Phantom Limb Sensation",
          showIf: {
            field: "phantom_limb_pain",
            equals: "yes"
          }
        },

        {
          type: "scale-slider",
          name: "pain_score",
          label: "Pain Score (0–10)",
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
      ]
    },
  ]
};

const PROSTHETICS_OBJECTIVE_SCHEMA = {
  title: "",
  actions: PROSTHETICS_SUBJECTIVE_SCHEMA.actions,

  sections: [
    {
      fields: [
        { type: "subheading", label: "A.Functional Classification" },
        {
          type: "radio",
          name: "k_level",
          label: "K-Level",
          labelAbove: true,
          options: [
            { label: "K0 – No prosthetic ambulation potential", value: "K0" },
            { label: "K1 – Household ambulator", value: "K1" },
            { label: "K2 – Limited community ambulator", value: "K2" },
            { label: "K3 – Community ambulator (variable cadence)", value: "K3" },
            { label: "K4 – High activity / athletic level", value: "K4" }
          ]
        },

        { type: "subheading", label: "B.Physical Performance Measures" },

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
        },
       {
          name: "orthotics_objective_forms",
          type: "assessment-launcher",
          options: [
        
             {
              label: "Lower Extremity Prosthetics Prescription.",
              value: "lower_extremity_prosthotics"
            },
            {
              label: "Upper Extremity Prosthetics Prescription",
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
        },
        { type: "subheading", label: "C. Residual Limb Evaluation" },

        { type: "subheading", name: "Level of amputation", label: "Level of amputation" },

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
          showIf: { field: "lower_limb_level", includes: "others" }
        },

        {
          type: "textarea",
          name: "upper_limb_other_details",
          label: "Upper Limb – Others (Specify)",
          showIf: { field: "upper_limb_level", includes: "others" }
        },

        { type: "date", name: "amputation_date", label: "Date of Amputation" },

        {
          type: "checkbox-group",
          name: "cause",
          label: "Cause",
          position: "side",
          options: [
            { label: "Trauma", value: "trauma" },
            { label: "Vascular", value: "vascular" },
            { label: "Infection", value: "infection" },
            { label: "Tumour", value: "tumour" },
            { label: "Congenital", value: "congenital" }
          ]
        },

        {
          type: "grid-table-flat",
          name: "circumference",
          labelWidth: "200px",
          inputWidth: "120px",
          boxWidth: "100px",
          headers: ["Circumference (cm)"],
          rows: [
            { key: "proximal", label: "Proximal" },
            { key: "middle", label: "Middle" },
            { key: "distal", label: "Distal" },
            { key: "length_residual", label: "Length of Residual Limb (cm)" },
            { key: "contralateral_reference", label: "Contralateral Limb Reference (cm)" }
          ]
        },

        { type: "subheading", label: "D. Skin Integrity & Limb Condition" },

        {
          type: "radio",
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
          type: "radio",
          name: "phantom_sensation",
          label: "Phantom Sensation / Pain",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },

        {
          type: "radio",
          name: "bony_prominences",
          label: "Bony Prominences",
          options: [
            { label: "Present", value: "present" },
            { label: "None", value: "none" },
          ]
        },

        {
          type: "textarea",
          name: "bony_prominences_notes",
          label: "Specify",
          showIf: { field: "bony_prominences", equals: "present" }
        },

        { type: "textarea", name: "additional_notes", label: "Additional Notes" },

        { type: "subheading", label: "E. Wound Assessment" },

        {
          type: "radio",
          name: "wound_present",
          label: "Wound Present",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },

        {
          type: "input",
          name: "wound_location",
          label: "Location",
          showIf: { field: "wound_present", equals: "yes" }
        },

        {
          type: "input",
          name: "wound_size",
          label: "Size (L × W × D)",
          showIf: { field: "wound_present", equals: "yes" }
        },

        {
          type: "input",
          name: "wound_stage_type",
          label: "Stage / Type",
          showIf: { field: "wound_present", equals: "yes" }
        },

        { type: "subheading", label: "F.Stump Characteristics" },

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
    }
  ]
};

const PROSTHETICS_ASSESSMENT_SCHEMA = {
  actions: PROSTHETICS_SUBJECTIVE_SCHEMA.actions,
  fields: [



    /* ===== Clinical Impression ===== */
    {
      type: "textarea",
      name: "clinical_impression",
      label: "Clinical Impression"
    },
    {
      type: "textarea",
      name: "Functional Level Summary:",
      label: "Functional Level Summary:"
    },
    {
      type: "textarea",
      name: "Residual Limb Condition",
      label: "Residual Limb Condition"
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
        },
        {
          type: "date",
          name: "assessment_next_review",
          label: "Next Review Date"
        },
      ]
    }
  ]
};
const getConsentSchema = (assignmentType) => ({
  title: assignmentType === "orthotics"
    ? "Orthotics Status"
    : "Prosthetic Status",

  fields: [
    {
      type: "radio",
      name: "prosthesis_restoration",
      label: assignmentType === "orthotics" ? "Orthotics Restoration" : "Prosthesis Restoration",
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
});
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
          <div><b>DOB:</b> {patient?.dob}</div>
          <div><b>Age / Gender:</b> {patient?.age} / {patient?.sex}</div>
          <div><b>ICD:</b> {patient?.icd}</div>
          <div><b>Date of Assessment:</b> {patient?.date_of_assessment}</div>
          <div><b>Date of Onset:</b> {patient?.date_of_onset}</div>
          <div>
            <b>Duration of Diagnosis:</b>{" "}
            {patient?.date_of_onset}
          </div>
          <div><b>Primary Diagnosis:</b> {patient?.diagnosis_history || "-"}</div>
          <div><b>Secondary Diagnosis:</b> {patient?.medical_history || "-"}</div>

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
      <CommonFormBuilder
        schema={getConsentSchema(values.assignment_type)}
        values={values}
        onChange={onChange}
      />
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
