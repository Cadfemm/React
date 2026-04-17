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

// Common schema for both prosthetics and orthosis
const SUB_COMMON_SCHEMA = {
  title: "",
  actions: [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ],
  sections: [
    {
      fields: [
        {
          name: "k_level",
          label: "K-Level (ammo pro)",
          type: "input",
          readOnly: true,
          showIf: {
            field: "assignment_type",
            equals: "prosthetics"
          }
        },
        {
          name: "grip_strength",
          label: "Grip Strength",
          type: "input",
          readOnly: true
        },
        {
          name: "lower_limb_mmt",
          label: "MMT Lower Limb",
          type: "input"
        },
        {
          name: "upper_limb_mmt",
          label: "MMT Upper Limb",
          type: "input"
        },
        {
          name: "stump_pain",
          label: "Stump Pain",
          type: "input"
        },
        {
          name: "pain_score",
          label: "Pain Score",
          type: "scale-slider",
          min: 0,
          max: 10
        },
        {
          name: "remarks",
          label: "Remarks",
          type: "textarea"
        }
      ]
    }
  ]
}

const OBJ_COMMON_SCHEMA = [
  {
    name: "patient_complaint",
    label: "Patient Complaint",
    type: "textarea"
  },
  {
    name: "functional_difficulty",
    label: "Functional Difficulty",
    type: "textarea"
  }
]

const ASS_COMMON_SCHEMA = [
   {
    name: "lower_limb_mmt",
    label: "MMT Lower Limb",
    type: "input",
    readOnly: true
  },
  {
    name: "upper_limb_mmt",
    label: "MMT Upper Limb",
    type: "input",
    readOnly: true
  },
  {
    name: "rom",
    label: "ROM",
    type: "input"
  },
  {
    name: "tone",
    label: "Tone",
    type: "input",
    readOnly: true
  },
  {
    name: "sensation",
    label: "Sensation",
    type: "input",
    readOnly: true
  },
  {
    name: "skin_condition",
    label: "Skin Condition",
    type: "checkbox-group",
    options: [
      { label: "Itchy/Dry in Creases", value: "dry_creases"},
      { label: "Scaly/Silvery", value: "silvery"},
      { label: "Brownish/Swollen", value: "swollen"},
      { label: "Hot/Red/Painful", value: "painful"},
      { label: "Rough/Tiny Bumps", value: "rough"},
    ]
  },
  {
    name: "wound",
    label: "Wound",
    type: "image",
  }
]

const PLAN_COMMON_SCHEMA = [
  {
    name: "intervention",
    label: "Intervention",
    type: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" }
    ]
  }
]

const FOLLOW_UP_COMMON_SCHEMA = [
  {
    name: "adjustment",
    label: "Adjustment",
    type: "radio",
    options: [
      {label: "Yes", value: "yes"},
      {label: "No", value: "no"}
    ]
  },
  {
    name: "adjustment_date",
    label: "Adjustment Date",
    type: "date"
  },
  {
    name: "remarks",
    label: "Remarks",
    type: "textarea"
  }
]

//  ORTHOSIS SCHEMAS

const ORTHO_OBJECTIVE_SCHEMA = {
  title: "",
  actions: SUB_COMMON_SCHEMA.actions,
  sections: [
    {
      fields: OBJ_COMMON_SCHEMA.concat([
        {
          name: "region",
          label: "Region/Type",
          type: "checkbox-group",
          options: [
            { label: "Upper Limb", value: "upper_limb"},
            { label: "Lower Limb", value: "lower_limb"},
            { label: "Spinal", value: "spinal"}
          ]
        },
        {
          name: "side",
          label: "Side",
          type: "checkbox-group",
          options: [
            { label: "Right", value: "right"},
            { label: "Left", value: "left"},
            { label: "Bilateral", value: "bilateral"}
          ]
        },
        {
          name: "level",
          label: "Level",
          type: "radio",
          options: [
            { label: "FO", value: "fo"},
            { label: "AFO", value: "afo"},
            { label: "KO", value: "ko"},
            { label: "KAFO", value: "kafo"},
            { label: "Wrist-Hand", value: "wrist_hand"},
            { label: "Elbow", value: "elbow"},
            { label: "Shoulder", value: "shoulder"},
            { label: "TLSO", value: "tlso"},
            { label: "LSO", value: "lso"},
            { label: "Cervical", value: "cervical"}
          ]
        },
        {
          name: "indication",
          label: "Indication",
          type: "checkbox-group",
          options: [
            { label: "Shoulder Sublux", value: "shoulder_sublux"},
            { label: "Prevent Sublux", value: "prevent_sublux"},
            { label: "Weakness", value: "weakness"},
            { label: "Spasticity", value: "spasticity"},
            { label: "Pain", value: "pain"},
            { label: "Instability", value: "instability"},
            { label: "Deformity", value: "deformity"},
            { label: "Post-OP", value: "post_op"}
          ]
        },
        {
          name: "control_issue",
          label: "Control Issue",
          type: "checkbox-group",
          options: [
            { label: "Foot Drop", value: "foot_drop"},
            { label: "Knee Hyperextension", value: "knee_hyperextension"},
            { label: "Knee Instability", value: "knee_instability"},
            { label: "Limited ROM", value: "limited_rom"},
            { label: "Contracture", value: "contracture"},
            { label: "Poor Balance", value: "poor_balance"}
          ]
        },
        {
          name: "pain_score",
          label: "Pain Score",
          type: "scale-slider",
          min: 0,
          max: 10
        }
      ])
    }
  ]
};

const ORTHO_ASSESSMENT_SCHEMA = {
  title: "",
  actions: SUB_COMMON_SCHEMA.actions,
  sections: [
    {
      fields: ASS_COMMON_SCHEMA.concat([
        {
          name: "functional_problems",
          label: "Functional Problems",
          type: "input",
          readOnly: true
        },
        {
          type: "subheading",
          label: "Gait Assessment"
        },
        {
          name: "walking_aid_used",
          label: "Walking Aid Used",
          type: "single-select",
          options:[
            { label: "None", value: "none"},
            { label: "SPC", value: "spc"},
            { label: "Quadripod", value: "quadripod"},
            { label: "WF", value: "wf"},
            { label: "Wheelchair", value: "wheelchair"}
          ]
        },
        {
          name: "walking_pattern",
          label: "Walking Pattern",
          type: "single-select",
          options: [
            { label: "Normal", value: "normal"},
            { label: "Hemiplegic", value: "hemiplegic"},
            { label: "Antalgic", value: "antalgic"},
            { label: "Ataxic", value: "ataxic"},
            { label: "Trendelenburg", value: "trendelenburg"}
          ]
        },
        {
          name: "foot_clearance",
          label: "Foot Clearance",
          type: "single-select",
          options: [
            { label: "Normal", value: "normal"},
            { label: "Reduced", value: "reduced"},
            { label: "Dragging", value: "dragging"},
            { label: "Foot Drop", value: "foot_drop"}
          ]
        },
        {
          name: "step_length",
          label: "Step Length",
          type: "single-select",
          options: [
            { label: "Normal", value: "normal"},
            { label: "Shortened Affected Side", value: "shortened_affected_side"}
          ]
        },
        {
          name: "stance_phase",
          label: "Stance Phase",
          type: "single-select",
          options: [
            { label: "Knee Collapse", value: "knee_collapse"},
            { label: "Genu Recurvatum", value: "genu_recurvatum"},
            { label: "Hip Instability", value: "hip_instability"},
            { label: "Normal", value: "normal"}
          ]
        },
        {
          name: "swing_phase",
          label: "Swing Phase",
          type: "single-select",
          options: [
            { label: "Circumduction", value: "circumduction"},
            { label: "Hip Hiking", value: "hip_hiking"},
            { label: "Reduced Flexion", value: "reduced_flexion"}
          ]
        },
        {
          name: "weight_bearing",
          label: "Weight Bearing",
          type: "single-select",
          options: [
            { label: "Symmetrical", value: "symmetrical"},
            { label: "Asymmetrical", value: "asymmetrical"}
          ]
        },
        {
          name: "balance_gait",
          label: "Balance Gait",
          type: "single-select",
          options: [
            { label: "Good", value: "good"},
            { label: "Fair", value: "fair"},
            { label: "Poor", value: "poor"}
          ]
        },
        {
          name: "endurance",
          label: "Endurance",
          type: "single-select",
          options: [
            { label: "Limited Distance", value: "distance_limited"},
            { label: "Fatigue_early", value: "fatigue_early"},
            { label: "Good", value: "good"}
          ]
        }
      ])
    }
  ]
};


const ORTHO_PLAN_SCHEMA = {
  title: "",
  actions: SUB_COMMON_SCHEMA.actions,
  sections: [
    {
      fields: PLAN_COMMON_SCHEMA.concat([
        {
          name: "orthosis_category",
          label: "Orthosis Category",
          type: "checkbox-group",
          options: [
            { label: "Ready-Made", value: "ready_made"},
            { label: "Custom-Made", value: "custom_made"}
          ]
        },
        {
          name: "orthosis_type",
          label: "Orthosis Type",
          type: "single-select",
          options: [
            { label: "FO", value: "fo"},
            { label: "AFO Rigid", value: "afo_rigid"},
            { label: "AFO Hinged", value: "afo_hinged"},
            { label: "AFO PLS", value: "afo_pls"},
            { label: "GRAFO", value: "grafo"},
            { label: "KO", value: "ko"},
            { label: "KAFO", value: "kafo"},
            { label: "WHO Functional", value: "who_functional"},
            { label: "WHO Resting", value: "who_resting"},
            { label: "WHO Anti-Spastic", value: "who_anti_spastic"},
            { label: "Elbow ROM", value: "elbow_rom"},
            { label: "Shoulder Support", value: "shoulder_support"},
            { label: "LSO", value: "lso"},
            { label: "TLSO", value: "tlso"},
            { label: "Cervical Collar", value: "cervical_collar"}
          ]
        },
        {
          name: "item",
          label: "Item",
          type: "single-select",
          options: [
            { label: "Others", value: "others"}
          ],
          showIf: {
            field: "orthosis_category",
            equals: "ready_made"
          }
        },
        {
          name: "others",
          label: "Others",
          type: "textarea",
          showIf: {
            field: "item",
            equals: "others"
          }
        },
        {
          name: "casting_date",
          label: "Casting Date",
          type: "date",
          showIf: {
            field: "orthosis_category",
            equals: "custom_made"
          }
        },
        {
          name: "filling_date",
          label: "Filling Date",
          type: "date",
          showIf: {
            field: "orthosis_category",
            equals: "custom_made"
          }
        },
        {
          name: "follow_up",
          label: "Follow-Up",
          type: "single-select",
          options: [
            { label:"Others", value: "others"}
          ],
          showIf: {
            field: "orthosis_category",
            equals: "custom_made"
          }
        },
        {
          name: "others",
          label: "Others",
          type: "textarea",
          showIf: {
            field: "follow_up",
            equals: "others"
          }
        }
      ])
    }
  ] 
};

const ORTHO_FOLLOW_UP_SCHEMA = {
  title: "",
  actions: SUB_COMMON_SCHEMA.actions,
  sections: [
    {
      fields: FOLLOW_UP_COMMON_SCHEMA.concat([
        {
          name: "othosis_checkbox",
          type: "checkbox-group",
          options: [
            {label: "Review Existing Orthosis", value: "existing_orthosis"},
          ]
        },
        {
          name: "fitting_issue_checkbox",
          type: "checkbox-group",
          options: [
            {label:"Pressure", value: "pressure"},
            {label: "Loose", value: "loose"},
            {label: "Discomfort", value: "discomfort"}
          ]
        },
        {
          name: "gait_issue_checkbox",
          type: "checkbox-group",
          options: [
            {label:"Gait Deviation Observed", value: "gait_deviation"},
            {label: "Skin Issue Related to Orthosis", value: "skin_orthosis"},
            {label: "Request New Orthosis", value: "request_new_orthosis"},
            {label: "Reassessment After", value: "reassessment_after"},
            {label: "Others", value: "others"}
          ]
        },
        {
          name: "others",
          label: "Others",
          type: "textarea",
          showIf: {
            field: "gait_issue_checkbox",
            equals: "others"
          }
        }
      ])
    }
  ]
}
/* ===================== PROSTHETICS SCHEMAS ===================== */

const PROSTHETICS_OBJECTIVE_SCHEMA = {
  title: "",
  actions: SUB_COMMON_SCHEMA.actions,

  sections: [
    {
      fields: OBJ_COMMON_SCHEMA.concat([
        {
          name: "prothesis_restoration",
          label: "Prothesis Restoration",
          type: "radio",
          options: [
            { label:"New", value: "new"},
            { label: "Repair", value: "repair"}
          ]
        },
        {
          name: "amputation",
          label: "Amputation",
          type: "radio",
          options: [
            { label: "Yes", value: "yes"},
            { label: "No", value: "no"}
          ]
        },
        {
          name: "amputation_side",
          label: "Amputation Side",
          type: "checkbox-group",
          options: [
            { label: "Right", value: "right"},
            { label: "Left", value: "left"},
            { label: "Bilateral", value: "bilateral"}
          ]
        },
        {
          name: "amputation_level",
          label: "Amputation Level",
          type: "radio",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ],
        },
        
        {
          name: "wound_body_diagram",
          label: "Mark Wound Location on Body Diagram",
          type: "wound-location-marker",
          views: [
            { key: "body", label: "Body (Front/Back)", src: "/amputation.png" },
            { key: "hands", label: "Hands", src: "/hands_high.png" },
            { key: "feet", label: "Feet", src: "/feet_high.png" },
          ],
          showIf: {
            field: "amputation_level",
            equals: "yes"
          }
        },
        {
          name: "region",
          label: "Region",
          type: "checkbox-group",
          options: [
            { label: "Upper Limb", value: "upper_limb" },
            { label: "Lower Limb", value: "lower_limb" },
          ],
          showIf: {
            field: "amputation_level",
            equals: "yes",
          },
        },
        {
          name: "amp_upper_limb_location",
          label: "Upper Limb Location",
          type: "checkbox-group",
          options: [
            { label: "Above Elbow", value: "above_elbow" },
            { label: "Below Elbow", value: "below_elbow" },
            { label: "Shoulder", value: "shoulder" },
            { label: "Elbow", value: "elbow" },
            { label: "Carpal / Metacarpal", value: "carpal_metacarpal" },
            { label: "Finger", value: "finger" },
          ],
          showIf: {
            field: "region",
            includes: "upper_limb",
            and: {
              field: "amputation_level",
              equals: "yes",
            },
          },
        },
        {
          name: "amp_upper_limb_location_notes",
          label: "Specify",
          type: "textarea",
          showIf: {
            or: [
              { field: "amp_upper_limb_location", includes: "above_elbow" },
              { field: "amp_upper_limb_location", includes: "below_elbow" },
              { field: "amp_upper_limb_location", includes: "shoulder" },
              { field: "amp_upper_limb_location", includes: "elbow" },
              { field: "amp_upper_limb_location", includes: "carpal_metacarpal" },
              { field: "amp_upper_limb_location", includes: "finger" },
            ],
          },
        },
        {
          name: "amp_lower_limb_location",
          label: "Lower Limb Location",
          type: "checkbox-group",
          options: [
            { label: "Above Knee", value: "above_knee" },
            { label: "Below Knee", value: "below_knee" },
            { label: "Hip Disarticulation", value: "hip_disarticulation" },
            { label: "Knee Disarticulation", value: "knee_disarticulation" },
            { label: "Carpal / Metacarpal", value: "carpal_metacarpal" },
            { label: "Rays Amputation", value: "rays_amputation" },
          ],
          showIf: {
            field: "region",
            includes: "lower_limb",
            and: {
              field: "amputation_level",
              equals: "yes",
            },
          },
        },
        {
          name: "amp_lower_limb_location_notes",
          label: "Specify",
          type: "textarea",
          showIf: {
            or: [
              { field: "amp_lower_limb_location", includes: "above_knee" },
              { field: "amp_lower_limb_location", includes: "below_knee" },
              { field: "amp_lower_limb_location", includes: "hip_disarticulation" },
              { field: "amp_lower_limb_location", includes: "knee_disarticulation" },
              { field: "amp_lower_limb_location", includes: "carpal_metacarpal" },
              { field: "amp_lower_limb_location", includes: "rays_amputation" },
            ],
          },
        },
        { 
          name: "stump_shape",
          label: "Stump Shape",
          type: "input"
        },
        {
          name: "stump_condition",
          label: "Stump Condition",
          type: "checkbox-group",
          options: [
            { label: "Healed", value: "healed"},
            { label: "Scarred", value: "scarred"},
            { label: "Infected", value: "infected"},
            { label: "Edema", value: "edema"},
            { label: "Sensitive", value: "sensitive"},
            { label: "Adherent Tissue", value: "adherent_tissue"}
          ]
        },
        {
          name: "stump_length",
          label: "Stump Length",
          type: "input"
        },
        {
          name: "pain_type",
          label: "Type of Pain",
          type: "radio",
          options: [
            { label: "Phantom Limb Pain", value: "phantom_limb_pain"},
            { label: "Residual Limb Pain", value: "residual_limb_pain"}
          ]
        },
        {
          name: "phantom_limb_checkbox",
          type: "checkbox-group",
          options: [
            { label: "The missing part", value: "missing_part"}
          ],
          showIf: {
            field: "pain_type",
            equals: "phantom_limb_pain"
          }
        },
        {
          name: "residual_limb_checkbox",
          type: "checkbox-group",
          options: [
            { label: "The stump/surgical site", value: "surgical_site"}
          ],
          showIf: {
            field: "pain_type",
            equals: "residual_limb_pain"
          }
        },
        {
          name: "pain_score",
          label: "Pain Score",
          type: "scale-slider",
          min: 0,
          max: 10
        }
      ]) 
    }
  ]
};

const PROSTHETICS_ASSESSMENT_SCHEMA = {
  title: "",
  actions: SUB_COMMON_SCHEMA.actions,
  sections: [
    {
      fields: ASS_COMMON_SCHEMA.concat([
        {
          name: "k_level",
          label: "K-Level (ammo pro)",
          type: "input",
          readOnly: true
        },
        {
          name: "grip_strength",
          label: "Grip Strength",
          type: "input",
          readOnly: true
        },
        {
          name: "stump_picture",
          label: "Stump Picture",
          type: "attach-file",
          accept: "application/pdf,image/*",
          multiple: false,
          previewSize: { width: 400, height: 400 },
          hideInputAfterSelect: true
        },
        {
          type: "row",
          cols: 5,
          compact: true,
          fields: [
            { label: "Date", type: "label" },
            { label: "Proximal", type: "label" },
            { label: "Middle", type: "label" },
            { label: "Distal", type: "label" },
            { label: "Flexion", type: "label" }
          ]
        },
        {
          type: "dynamic-section",
          name: "stump_measurements",
          fields: [
            {
              type: "row",
              cols: 5,
              compact: true,
              fields: [
                { type: "date", name: "date" },
                { type: "input", name: "proximal" },
                { type: "input", name: "middle" },
                { type: "input", name: "distal" },
                { type: "input", name: "flexion" }
              ]
            }
          ]
        },
        {
          name: "stump_length",
          label: "Stump Length",
          type: "input"
        },
        {
          name: "measurement_date",
          label: "Measurement Date",
          type: "date"
        },
        {
          name: "stump_management_value",
          label: "Stump Management Value",
          type: "input"
        }
      ])
    }
  ]
};

const PROSTHETICS_PLAN_SCHEMA = {
  title: "",
  actions: SUB_COMMON_SCHEMA.actions,
  sections: [
    {
      fields: PLAN_COMMON_SCHEMA.concat([
        {
          name: "suspension",
          label: "Suspension",
          type: "single-select",
          options: [
            { label: "Easy Sleeve", value: "easy_sleeve" },
            { label: "Genu Sleeve", value: "genu_sleeve" },
            { label: "Juzo Suspension Sleeve", value: "juzo_suspension_sleeve" },
            { label: "Lite Liner Supreme Gel Suspension", value: "lite_liner_supreme_gel_suspension" },
            { label: "Distal End Silicone Cup", value: "distal_end_silicone_cup" },
            { label: "Extreme Trans Femoral Locking Liner / Trans Femoral Cushion Liner", value: "extreme_trans_femoral_locking_liner_trans_femoral_cushion_liner" },
            { label: "Anterior Posterior Tapered Liner", value: "anterior_posterior_tapered_liner" },
            { label: "General Purpose Liner", value: "general_purpose_liner" },
            { label: "4Seal Classic Standard TF", value: "4seal_classic_standard_tf" },
            { label: "Iceross Dermo Cushion TT", value: "iceross_dermo_cushion_tt" },
            { label: "Iceross Dermo Locking", value: "iceross_dermo_locking" },
            { label: "Iceross Transfemoral Locking", value: "iceross_transfemoral_locking" },
            { label: "Iceross Sport Locking TT", value: "iceross_sport_locking_tt" },
            { label: "Streifeneder AK Control Sil", value: "streifenedar_ak_control_sil" },
            { label: "Streifeneder BK Comfortsil Basic", value: "streifenedar_bk_comfortsil_basic" },
            { label: "Caleo 3D (6Y93)", value: "caleo_3d_6y93" },
            { label: "Caleo (6Y92)", value: "caleo_6y92" },
            { label: "Skeo Skinguard (TF/AK) (6Y85)", value: "skeo_skinguard_tf_ak_6y85" },
            { label: "Proseal Sil Liner (6Y81)", value: "proseal_sil_liner_6y81" },
            { label: "Proseal Ring (452A1)", value: "proseal_ring_452a1" },
            { label: "Kiss Lanyard System", value: "kiss_lanyard_system" },
            { label: "Easy Fit", value: "easy_fit" },
            { label: "Easyliner Lock", value: "easyliner_lock" },
            { label: "Easyliner Stretch Gel Cushion Liner", value: "easyliner_stretch_gel_cushion_liner" },
            { label: "Superior Performance Cushion Liner", value: "superior_performance_cushion_liner" },
            { label: "Superior Performance Gel Locking Liner", value: "superior_performance_gel_locking_liner" },
            { label: "Softskin Air S40 Without Distal Attachment", value: "softskin_air_s40_without_distal_attachment" },
            { label: "Softskin Air S50", value: "softskin_airs50" },
            { label: "Softskin Air S50CL Without Distal Attachment", value: "softskin_airs50cl_without_distal_attachment" },
            { label: "Lite Liner Gel Supreme Locking Standard 4W9", value: "lite_liner_gel_supreme_locking_standard_4w9" },
            { label: "Proximal Seal Cushion Liner", value: "proximal_seal_cushion_liner" },
            { label: "Liberty II Locking Liner", value: "liberty_ii_locking_liner" },
            { label: "Stepline Plus Evolution (With Distal Attachment)", value: "stepline_plus_evolution_with_distal_attachment" },
            { label: "Stepline Plus Evolution (Without Distal Attachment)", value: "stepline_plus_evolution_without_distal_attachment" },
            { label: "Stepline Plus AK (With Distal Attachment)", value: "stepline_plus_ak_with_distal_attachment" },
            { label: "Stepline Plus AK (Without Distal Attachment)", value: "stepline_plus_ak_without_distal_attachment" },
            { label: "Stepline Plus Sealing Sleeve", value: "stepline_plus_sealing_sleeve" },
            { label: "Silicone Pro Liner Cushion", value: "silicone_pro_liner_cushion" },
            { label: "Silicone Pro Liner Lock", value: "silicone_pro_liner_lock" },
            { label: "Eco Liner Lock", value: "eco_liner_lock" },
            { label: "Eco Liner Cushion", value: "eco_liner_cushion" },
            { label: "Free Text", value: "free_text" }
          ],
          showIf: {
            field: "intervention",
            equals: "yes"
        }
      },
        {
          name: "socker_design",
          label: "Socket Design",
          type: "single-select",
          options: [
            { label: "Transtibial PP Socket (PTB/PTS/TSB)", value: "transtibial_pp_socket_ptb_pts_tsb" },
            { label: "Transtibial PP/PE Double Socket (PTB/PTS/TSB)", value: "transtibial_pp_pe_double_socket_ptb_pts_tsb" },
            { label: "Transtibial Laminated Socket (PTB/PTS/TSB)", value: "transtibial_laminated_socket_ptb_pts_tsb" },
            { label: "Transtibial Laminated Double Socket", value: "transtibial_laminated_double_socket" },
            { label: "Knee Disarticulation PP Socket With Pelite Liner", value: "knee_disarticulation_pp_socket_with_pelite_liner" },
            { label: "Knee Disarticulation PP/PE Double Socket", value: "knee_disarticulation_pp_pe_double_socket" },
            { label: "Knee Disarticulation Laminated Socket", value: "knee_disarticulation_laminated_socket" },
            { label: "Transfemoral PP Socket (Quadrilateral/Ischial)", value: "transfemoral_pp_socket_quadrilateral_ischial" },
            { label: "Transfemoral PP/PE Double Socket (Quadrilateral/Ischial)", value: "transfemoral_pp_pe_double_socket_quadrilateral_ischial" },
            { label: "Transfemoral Laminated Socket (Quadrilateral/Ischial)", value: "transfemoral_laminated_socket_quadrilateral_ischial" },
            { label: "Transfemoral Laminated Double Socket + PP/PE (Quadrilateral/Ischial)", value: "transfemoral_laminated_double_socket_pp_pe_quadrilateral_ischial" },
            { label: "Hip Disarticulation PP Socket", value: "hip_disarticulation_pp_socket" },
            { label: "Hip Polypropylene Double Socket", value: "hip_polypropylene_double_socket" },
            { label: "Hip Disarticulation Laminated Socket", value: "hip_disarticulation_laminated_socket" },
            { label: "Symes PP Socket", value: "symes_pp_socket" },
            { label: "Symes Laminated Socket With Pelite", value: "symes_laminated_socket_with_pelite" },
            { label: "Chopart Socket", value: "chopart_socket" },
            { label: "Syme 3D Socket", value: "syme_3d_socket" },
            { label: "Syme Transparent Check Socket", value: "syme_transparent_check_socket" },
            { label: "Below Knee Carbon Laminate Socket", value: "below_knee_carbon_laminate_socket" },
            { label: "Below Knee Adjustable Carbon Laminate Socket", value: "below_knee_adjustable_carbon_laminate_socket" },
            { label: "Below Knee Transparent Check Socket", value: "below_knee_transparent_check_socket" },
            { label: "Below Knee 3D Socket", value: "below_knee_3d_socket" },
            { label: "Above Knee Adjustable Carbon Laminate Socket", value: "above_knee_adjustable_carbon_laminate_socket" },
            { label: "Above Knee Transparent Check Socket", value: "above_knee_transparent_check_socket" },
            { label: "Above Knee 3D Socket", value: "above_knee_3d_socket" },
            { label: "Through Knee Transparent Check Socket", value: "through_knee_transparent_check_socket" },
            { label: "Free Text", value: "free_text" }
          ],
          showIf: {
            field: "intervention",
            equals: "yes"
        }
        },
        {
          name: "knee_joint",
          label: "Knee Joint",
          type: "single-select",
          options: [
            { label: "V One Microprocessor-Controlled Knee", value: "v_one_microprocessor_controlled_knee" },
            { label: "Orion 2 Knee Joint", value: "orion_2_knee_joint" },
            { label: "Plie 3 MPC Electronic Knee", value: "plie_3_mpc_electronic_knee" },
            { label: "Total Knee 1900 Polycentric Knee With Geometric Locking System", value: "total_knee_1900_polycentric_knee_with_geometric_locking_system" },
            { label: "Total Knee 2100", value: "total_knee_2100" },
            { label: "3R78 Polycentric Knee Joint With Pneumatic Swing Phase Control", value: "3r78_polycentric_knee_joint_with_pneumatic_swing_phase_control" },
            { label: "Endolite ESK+ With PSPC", value: "endolite_esk_pspc" },
            { label: "4 Bar Knee Joint System (3R20)", value: "4_bar_knee_joint_system_3r20" },
            { label: "Four Bar Knee Joint With Integrated Extension Assist (3R20)", value: "four_bar_knee_joint_with_integrated_extension_assist_3r20" },
            { label: "Mauch Knee", value: "mauch_knee" },
            { label: "Modular Polycentric EBS Knee Joint With Hydraulic Swing Phase Control (3R60)", value: "modular_polycentric_ebs_knee_joint_hydraulic_swing_phase_control_3r60" },
            { label: "Compact Semi-Automatic Knee Lock (SAKL)", value: "compact_semi_automatic_knee_lock_sakl" },
            { label: "OFM1 SE Balance Knee", value: "ofm1_se_balance_knee" },
            { label: "Modular Single Axis Knee Joint With Pneumatic Swing Phase Control (3R92)", value: "modular_single_axis_knee_joint_pneumatic_swing_phase_control_3r92" },
            { label: "Hy-Stan 4 Bar Knee", value: "hy_stan_4_bar_knee" },
            { label: "Hy-Stan 4 Bar Pneumatic Knee", value: "hy_stan_4_bar_pneumatic_knee" },
            { label: "Graph-Lite 4 Bar Knee With Manual Lock", value: "graph_lite_4_bar_knee_with_manual_lock" },
            { label: "Graph-Lite 5 Bar Pneumatic Knee High Activity", value: "graph_lite_5_bar_pneumatic_knee_high_activity" },
            { label: "Knee Joint With Extension Assist", value: "knee_joint_with_extension_assist" },
            { label: "Monocentric Brake Knee Joint With Stance Flexion And Manual Lock", value: "monocentric_brake_knee_joint_with_stance_flexion_and_manual_lock" },
            { label: "Waterproof Knee Joint With Lock", value: "waterproof_knee_joint_with_lock" },
            { label: "Stand Auto Lock Pneumatic Knee", value: "stand_auto_lock_pneumatic_knee" },
            { label: "4 Bar Mechanical Knee Joint (Flat Top)", value: "4_bar_mechanical_knee_joint_flat_top" },
            { label: "Hydraulic Polycentric Knee Joint With Extension Assist", value: "hydraulic_polycentric_knee_joint_with_extension_assist" },
            { label: "Polycentric Knee Joint With Lock", value: "polycentric_knee_joint_with_lock" },
            { label: "Polycentric Knee Joint", value: "polycentric_knee_joint" },
            { label: "Pneumatic Polycentric Knee Joint", value: "pneumatic_polycentric_knee_joint" },
            { label: "Phoenix Graph-Lite 4 Bar Pneumatic Knee", value: "phoenix_graph_lite_4_bar_pneumatic_knee" },
            { label: "Matik", value: "matik" },
            { label: "Hy-Stan 4 Bar Knee Disarticulation Knee", value: "hy_stan_4_bar_knee_disarticulation_knee" },
            { label: "4-Bar Knee (Economy)", value: "4_bar_knee_economy" },
            { label: "4 Bar Geometric Straight Lock Pneumatic Knee", value: "4_bar_geometric_straight_lock_pneumatic_knee" },
            { label: "Graph Lite 4-Bar Pneumatic Knee Disarticulation Knee", value: "graph_lite_4_bar_pneumatic_knee_disarticulation_knee" },
            { label: "Graph Lite 4 Bar Pneumatic Knee (Mini)", value: "graph_lite_4_bar_pneumatic_knee_mini" },
            { label: "Free Text", value: "free_text" }
          ],
          showIf: {
            field: "intervention",
            equals: "yes"
        }
        },
        {
          name: "foot",
          label: "Foot",
          type: "single-select",
          options: [
            { label: "1S101 Sach+ Foot", value: "1s101_sach_foot" },
            { label: "2R8 M10 Sach Foot Adapter", value: "2r8_m10_sach_foot_adapter" },
            { label: "1H38 Single Axis Foot", value: "1h38_single_axis_foot" },
            { label: "2R10 Single Axis Foot Adapter", value: "2r10_single_axis_foot_adapter" },
            { label: "2R33 Single Axis Foot Adapter With Screw", value: "2r33_single_axis_foot_adapter_with_screw" },
            { label: "1D10 Dynamic Foot With Adapter", value: "1d10_dynamic_foot_with_adapter" },
            { label: "1D35 Dynamic Motion Foot", value: "1d35_dynamic_motion_foot" },
            { label: "Endolite Multiflex Foot", value: "endolite_multiflex_foot" },
            { label: "1WR95 Water Resistance Foot", value: "1wr95_water_resistance_foot" },
            { label: "Sach Foot", value: "sach_foot" },
            { label: "Single Axis Flat Foot With Toes", value: "single_axis_flat_foot_with_toes" },
            { label: "Quantum Syme Foot Spring Module", value: "quantum_syme_foot_spring_module" },
            { label: "1C63 Triton Low Profile", value: "1c63_triton_low_profile" },
            { label: "Foot Shell For Triton Low Profile Foot", value: "foot_shell_for_triton_low_profile_foot" },
            { label: "Senator Prosthetic Foot", value: "senator_prosthetic_foot" },
            { label: "Endurance Foot", value: "endurance_foot" },
            { label: "Feather Carbon Foot", value: "feather_carbon_foot" },
            { label: "Trias Energy Storing Foot (1C30)", value: "trias_energy_storing_foot_1c30" },
            { label: "Adjustable Single Axis Ankle", value: "adjustable_single_axis_ankle" },
            { label: "Foot Adapter With Screw Connection", value: "foot_adapter_with_screw_connection" },
            { label: "Multiflex Ankle Standard", value: "multiflex_ankle_standard" },
            { label: "Multiflex Snubber", value: "multiflex_snubber" },
            { label: "Hy-Stan Single Axis Ankle", value: "hy_stan_single_axis_ankle" },
            { label: "Hy-Stan Ultra-Short Ankle", value: "hy_stan_ultra_short_ankle" },
            { label: "Adjustable Multi-Axis Ankle Joint", value: "adjustable_multi_axis_ankle_joint" },
            { label: "Mono-Axis Ankle Joint", value: "mono_axis_ankle_joint" },
            { label: "Single Axis With Pyramid", value: "single_axis_with_pyramid" },
            { label: "Single Axis Ankle Joint With Pyramid", value: "single_axis_ankle_joint_with_pyramid" },
            { label: "Graph-Lite Multi-Axis Ankle", value: "graph_lite_multi_axis_ankle" },
            { label: "Vacuum Ankle Adaptor", value: "vacuum_ankle_adaptor" },
            { label: "Hydraulic Vacuum Ankle", value: "hydraulic_vacuum_ankle" },
            { label: "Stainless Steel Pyramid Base (Max 125Kg)", value: "stainless_steel_pyramid_base_max_125kg" },
            { label: "Proteor Sach Foot", value: "proteor_sach_foot" },
            { label: "Sierra (FS1)", value: "sierra_fs1" },
            { label: "Highlander (FS3)", value: "highlander_fs3" },
            { label: "Freedom Agilix (F15)", value: "freedom_agilix_f15" },
            { label: "Dynastar", value: "dynastar" },
            { label: "Dynastep", value: "dynastep" },
            { label: "Freedom Dynadapt (F10)", value: "freedom_dynadapt_f10" },
            { label: "Rush Hipro", value: "rush_hipro" },
            { label: "Rush Rampage LP", value: "rush_rampage_lp" },
            { label: "Kinterra Foot/Ankle (ROM)", value: "kinterra_foot_ankle_rom" },
            { label: "Super Sach Foot", value: "super_sach_foot" },
            { label: "Motion Control Foot", value: "motion_control_foot" },
            { label: "Kare Dynamic Foot With Ankle", value: "kare_dynamic_foot_with_ankle" },
            { label: "Carbon Foot Cover (For Endurance Foot)", value: "carbon_foot_cover_for_endurance_foot" },
            { label: "Footshell For Trias", value: "footshell_for_trias" },
            { label: "Footshell (Proteor Foot)", value: "footshell_proteor_foot" },
            { label: "Rush Foot Cover", value: "rush_foot_cover" },
            { label: "Feather Carbon Foot Cover", value: "feather_carbon_foot_cover" },
            { label: "Kare Dynamic Foot Cover", value: "kare_dynamic_foot_cover" },
            { label: "Foot Cover (Tehsen)", value: "foot_cover_tehsen" },
            { label: "Foot Shell (Gen 3, Gen 2, Shockwave, Kinnex)", value: "foot_shell_gen3_gen2_shockwave_kinnex" },
            { label: "Foot Cover", value: "foot_cover" },
            { label: "Foot Shell (Ossur Foot Shell)", value: "foot_shell_ossur" },
            { label: "Foot Cover For CPI", value: "foot_cover_for_cpi" },
            { label: "High Definition Silicone Foot Cover For Partial Foot", value: "high_definition_silicone_foot_cover_partial" },
            { label: "HDSF (With Carbon Fibre Foot Plate)", value: "hdsf_with_carbon_fibre_foot_plate" },
            { label: "High Definition Silicone Foot Cover For Partial Foot - High Top Ankle", value: "high_definition_silicone_foot_cover_partial_high_top" },
            { label: "HDSF (With Carbon Fibre Foot Plate) - High Top Ankle", value: "hdsf_with_carbon_fibre_foot_plate_high_top" },
            { label: "Free Text", value: "free_text" }
          ],
          showIf: {
            field: "intervention",
            equals: "yes"
        }
        },
        {
          name: "others",
          label: "Others",
          type: "textarea",
          showIf: {
            field: "intervention",
            equals: "yes"
        }
        },
        {
          name: "casting_date",
          label: "Casting Date",
          type: "date",
          showIf: {
            field: "intervention",
            equals: "yes"
        }
        },
        {
          name: "fitting_date",
          label: "Fitting Date",
          type: "date",
          showIf: {
            field: "intervention",
            equals: "yes"
        }
        },
        {
          name: "follow_up",
          label: "Follow-Up",
          type: "checkbox-group",
          options: [
            { label: "2 Weeks", value: "weeks_2"},
            { label: "4 Weeks", value: "weeks_4"},
            { label: "Others", value: "others"}
          ],
          showIf: {
            field: "intervention",
            equals: "yes"
        }
        },
        {
          name: "others",
          label: "Others",
          type: "textarea",
          showIf: {
            field: "follow_up",
            equals: "others"
          }
        },
        {
          name: "upload_measurement",
          label: "Upload Measurement Form",
          type: "file-upload-modal",
          showIf: {
            field: "intervention",
            equals: "yes"
        }
        },
        {
          name: "plan_others",
          label: "Specify",
          type: "textarea",
          showIf: {
            field: "intervention",
            equals: "no"
        }
        }
      ])
    }
  ]
};

const PROSTHETICS_FOLLOW_UP_SCHEMA = {
  title: "",
  actions: SUB_COMMON_SCHEMA.actions,
  sections: [
    {
      fields: FOLLOW_UP_COMMON_SCHEMA.concat([
        {
          name: "stump_picture",
          label: "Stump Picture",
          type: "file-upload-modal"
        },
        {
          name: "measurement_date",
          label: "Measurement Date",
          type: "date"
        },
        {
          name: "stump_measurement_value",
          label: "Stump Measurement Value",
          type: "input"
        },
        // {
        //   name: "add_measurement",
        //   label: "Add Measurement",
        //   type: "button"
        // }
      ])
    }
  ]
}

const PROSTHETICS_CHECKOUT_SCHEMA = {
  title: "",
  actions: SUB_COMMON_SCHEMA.actions,
  sections: [
    {
      fields: [
        {type: "subheading", label: "Prosthetic Fit & Tolerance"},
        {
          name: "socket_fit",
          label: "Socket Fit",
          type: "radio",
          options: YES_NO
        },
        {
          name: "details",
          label: "Details",
          type: "textarea",
          showIf: {
            field: "socket_fit",
            equals: "yes"
          }
        },
        {
          name: "alignment",
          label: "Alignment",
          type: "radio",
          options: [
            {label: "Good", value:"good"},
            {label: "Poor", value: "poor"}
          ]
        },
        {
          name: "details",
          label: "Details",
          type: "textarea",
          showIf: {
            field: "alignment",
            equals: "poor"
          }
        },
        {
          name: "bony_prominence",
          label: "Bony Prominence/Pressure Sensitive Area",
          type: "radio",
          options: YES_NO
        },
        {
          name: "docuement",
          label: "Upload Image",
          type: "file-upload-modal",
          showIf: {
            field: "bony_prominence",
            equals: "yes"
          }
        },
        {type: "subheading", label: "Changing Body Position"},
        {
          name: "changing_body_position",
          label: "Changing Body Position From Lying Down",
          type: "radio",
          labelAbove: true,
          options: [
            {label: "Independent", value: "independent"},
            {label: "With Supervision", value: "super_vision"},
            {label: "Minimal Assist", value: "minimal_assist"},
            {label: "Moderate Assist", value: "moderate_assist"},
            {label: "Maximal Assist", value: "maximal_assist"}
          ]
        },
        {
          name: "from_squatting",
          label: "From Squatting or Kneeling",
          type: "radio",
          options: [
            {label: "Independent", value: "independent"},
            {label: "With Supervision", value: "super_vision"},
            {label: "Minimal Assist", value: "minimal_assist"},
            {label: "Moderate Assist", value: "moderate_assist"},
            {label: "Maximal Assist", value: "maximal_assist"}
          ]
        },
        {
          name: "from_sitting",
          label: "From Sitting or Standing",
          type: "radio",
          options: [
            {label: "Independent", value: "independent"},
            {label: "With Supervision", value: "super_vision"},
            {label: "Minimal Assist", value: "minimal_assist"},
            {label: "Moderate Assist", value: "moderate_assist"},
            {label: "Maximal Assist", value: "maximal_assist"}
          ]
        },
        {
          name: "rolling_over",
          label: "Rolling Over",
          type: "radio",
          options: [
            {label: "Independent", value: "independent"},
            {label: "With Supervision", value: "super_vision"},
            {label: "Minimal Assist", value: "minimal_assist"},
            {label: "Moderate Assist", value: "moderate_assist"},
            {label: "Maximal Assist", value: "maximal_assist"}
          ]
        },
        {
          name: "bending",
          label: "Bending",
          type: "radio",
          options: [
            {label: "Independent", value: "independent"},
            {label: "With Supervision", value: "super_vision"},
            {label: "Minimal Assist", value: "minimal_assist"},
            {label: "Moderate Assist", value: "moderate_assist"},
            {label: "Maximal Assist", value: "maximal_assist"}
          ]
        },
        {
          name: "shifting_body_garvity",
          label: "Shifting the Body's Centre of Gravity",
          type: "radio",
          labelAbove: true,
          options: [
            {label: "Independent", value: "independent"},
            {label: "With Supervision", value: "super_vision"},
            {label: "Minimal Assist", value: "minimal_assist"},
            {label: "Moderate Assist", value: "moderate_assist"},
            {label: "Maximal Assist", value: "maximal_assist"}
          ]
        },
        {
          name: "maintaining_body_position",
          label: "Maintaining a Body Position",
          type: "radio",
          labelAbove: true,
          options: [
            {label: "Good", value: "good"},
            {label: "Fair", value: "fair"},
            {label: "Poor", value: "poor"},
          ]
        },
        {
          name: "transferring_oneself",
          label: "Transferring Oneself",
          type: "radio",
          labelAbove: true,
          options: [
            {label: "Independent", value: "independent"},
            {label: "Supervision", value: "super_vision"},
            {label: "Contract Guard", value: "contract_guard"},
            {label: "Minimal Assist", value: "minimal_assist"},
            {label: "Moderate Assist", value: "moderate_assist"},
            {label: "Maximal Assist", value: "maximal_assist"},
            {label: "Total Assist", value: "total_assist"}
          ]
        },
        {type: "subheading", label: "Walking"},
        {
          name: "walking_short_distances",
          label: "Walking Short Distances",
          type: "radio",
          labelAbove: true,
          options: [
            {label: "Without Aid", value: "without_aid"},
            {label: "Walking Frame", value: "walking_frame"},
            {label: "Axillary Crutches", value: "axillary_crutches"},
            {label: "Elbow Crutches", value: "elbow_crutches"},
            {label: "Quadripod", value: "quadripod"},
            {label: "Walking Stick", value: "walking_stick"},
            {label: "Wheelchair", value: "wheelchair"}
          ]
        },
        {
          name: "walking_long_distances",
          label: "Walking Long Distances",
          type: "radio",
          labelAbove: true,
          options: [
            {label: "Without Aid", value: "without_aid"},
            {label: "Walking Frame", value: "walking_frame"},
            {label: "Axillary Crutches", value: "axillary_crutches"},
            {label: "Elbow Crutches", value: "elbow_crutches"},
            {label: "Quadripod", value: "quadripod"},
            {label: "Walking Stick", value: "walking_stick"},
            {label: "Wheelchair", value: "wheelchair"}
          ]
        },
        {
          name: "dressing",
          label: "Dressing (Donning/Doffing Prosthesis)",
          type: "radio",
          labelAbove: true,
          options: [
            {label: "Independent", value: "independent"},
            {label: "Assisted", value: "assisted"}
          ]
        },
        {type: "subheading", label: "Environmental Factors"},
        {
          name: "assistive_products",
          label: "Assistive Products",
          type: "radio",
          labelAbove: true,
          options:  [
            {label: "Wheelchair", value: "wheelchair"},
            {label: "Walking Frame", value: "walking_frame"},
            {label: "Axillary Crutches", value: "axillary_crutches"},
            {label: "Elbow Crutches", value: "elbow_crutches"},
            {label: "Quadripod", value: "quadripod"},
            {label: "Walking Stick", value: "walking_stick"}            
          ]
        },
        {
          name: "family_support",
          label: "Family Support",
          type: "radio",
          options: YES_NO
        }
      ]
    }
  ]
}

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
      label: "Inspire Scheme",
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
    { type: "date", name: "po_date", label: "PO Date" },
    {
      name: "visit_type",
      label: "Type of Visit",
      type: "radio",
      labelAbove: true,
      options: [
        { label: "Walk-in", value: "walk_in" },
        { label: "IA", value: "ia" },
        { label: "Follow-Up", value: "follow_up" },
        ...(assignmentType === "orthotics"
          ? []
          : [{ label: "Checkout", value: "checkout" }])
      ]
    }
  ]
});
/* ===================== COMPONENT ===================== */

export default function OrthoticsAssessment({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({ assignment_type: 'orthotics', amp_upper_limb_location: [],
  amp_lower_limb_location: [], });
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

  // Only sync tab when visit/assignment mode changes — not on every field edit (that was resetting SOA&P tabs to Subjective).
  useEffect(() => {
    if (values?.visit_type === "checkout" && values?.assignment_type === "prosthetics") {
      setActiveTab("checkout");
    } else if (values?.visit_type === "follow_up") {
      setActiveTab("follow_up");
    } else {
      setActiveTab("subjective");
    }
  }, [values?.visit_type, values?.assignment_type]);

  const onChange = (name, value) => {
    setValues(v => {
      const next = { ...v, [name]: value };
      if (name === "assignment_type" && value === "orthotics" && v.visit_type === "checkout") {
        delete next.visit_type;
      }
      return next;
    });
    // Orthotics has no checkout schema; avoid one frame with activeTab "checkout" + orthotics (crashes FormBuilder).
    if (name === "assignment_type" && value === "orthotics") {
      setActiveTab(t => (t === "checkout" ? "subjective" : t));
    }
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
    if (type === "clear") {
      setValues({ assignment_type: 'orthotics',amp_upper_limb_location: [],
    amp_lower_limb_location: [], });
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
    plan: ORTHO_PLAN_SCHEMA,
    subjective: SUB_COMMON_SCHEMA,
    objective: ORTHO_OBJECTIVE_SCHEMA,
    assessment: ORTHO_ASSESSMENT_SCHEMA,
    follow_up: ORTHO_FOLLOW_UP_SCHEMA,
  } : {
    plan: PROSTHETICS_PLAN_SCHEMA,
    subjective: SUB_COMMON_SCHEMA,
    objective: PROSTHETICS_OBJECTIVE_SCHEMA,
    assessment: PROSTHETICS_ASSESSMENT_SCHEMA,    
    follow_up: PROSTHETICS_FOLLOW_UP_SCHEMA,
    checkout: PROSTHETICS_CHECKOUT_SCHEMA
  };

  const assessmentSchemaKey =
    values?.assignment_type === "orthotics" && values?.visit_type === "checkout"
      ? "subjective"
      : activeTab;
  const assessmentSchema =
    schemaMap[assessmentSchemaKey] ?? schemaMap.subjective;

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
        {(
          (values?.visit_type === "checkout" && values.assignment_type === "prosthetics" )
          ? ["checkout"]
          : values?.visit_type === "follow_up"
          ? ["follow-up"]
          : ["subjective", "objective", "assessment", "plan"]
        ).map(tab => (
          <div
            key={tab}
            style={{
              padding: "10px 22px",
              fontWeight: 600,
              cursor: "pointer",
              color: activeTab === tab.replace("-", "_") ? "#2451b3" : "#0f172a",
              borderBottom: activeTab === tab.replace("-", "_") ? "3px solid #2451b3" : "none"
            }}
            onClick={() => setActiveTab(tab.replace('-', '_'))}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      <CommonFormBuilder
        schema={assessmentSchema}
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
