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
          readOnly: true
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
          type: "input",
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
          type: "file-upload-modal"
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
          options: []
        },
        {
          name: "socker_design",
          label: "Socket Design",
          type: "single-select",
          options: []
        },
        {
          name: "knee_joint",
          label: "Knee Joint",
          type: "single-select",
          options: []
        },
        {
          name: "foot",
          label: "Foot",
          type: "single-select",
          options: []
        },
        {
          name: "others",
          label: "Others",
          type: "textarea"
        },
        {
          name: "casting_date",
          label: "Casting Date",
          type: "date"
        },
        {
          name: "fitting_date",
          label: "Fitting Date",
          type: "date"
        },
        {
          name: "follow_up",
          label: "Follow-Up",
          type: "checkbox-group",
          options: [
            { label: "2 Weeks", value: "weeks_2"},
            { label: "4 Weeks", value: "weeks_4"},
            { label: "Others", value: "others"}
          ]
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
          type: "file-upload-modal"
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
        {
          name: "add_measurement",
          label: "Add Measurement",
          type: "button"
        }
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
    { type: "date", name: "po_date", label: "PO Date" },
    {
      name: "visit_type",
      label: "Type of Visit",
      type: "radio",
      labelAbove: true,
      options: [
        { label: "Walk-in", value: "walk_in"},
        { label: "IA", value: "ia"},
        { label: "Follow-Up", value: "follow_up"},
        { label: "Checkout", value: "checkout"}
      ]
    }
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

  useEffect(() => {
    console.log(values?.visit_type)
    console.log(schemaMap[activeTab])
    if (values?.visit_type === "checkout" && values?.assignment_type === "prosthetics"){
      console.log('-------------called---------------', values.visit_type)
      setActiveTab("checkout")
    } else if (values?.visit_type === "follow_up"){
      console.log('-------------called followup---------------', values.visit_type)
      setActiveTab("follow_up")
    } else {
      console.log('-------------------called subjective-------------')
      setActiveTab("subjective")
    }
    console.log(schemaMap[activeTab])
  }, [values])

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
              color: activeTab === tab ? "#2451b3" : "#0f172a",
              borderBottom: activeTab === tab ? "3px solid #2451b3" : "none"
            }}
            onClick={() => setActiveTab(tab.replace('-', '_'))}
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
