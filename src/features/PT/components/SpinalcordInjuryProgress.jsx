import { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PatientCard from "../../../shared/cards/PatientCard";

/* ── Shared actions ── */
const ACTIONS = [
  { type: "clear", label: "Clear" },
  { type: "save",  label: "Save"  },
];

/* ══════════════════════════════════════════════════════════
   SCHEMAS
══════════════════════════════════════════════════════════ */

const SUBJECTIVE_SCHEMA = {
  title: "Progress Note",
  actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [{
    fields: [
      { name: "complaint", label: "Cheif Complaint", type: "input", placeholder: "Therapist assessment..." },
      { name: "History of Present", label: "History of Present Illnes", type: "input" },
      
    ],
  }],
};


const OBJECTIVE_SCHEMA = {
  title: "Objective",
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [
    {
      title: "Therapeutic Interventions",
      fields: [

        // =========================
        // Therapeutic Exercises Selection
        // =========================
        {
          name: "therapeutic_exercises",
          // label: "Select Therapeutic Exercises",
          type: "checkbox-group",
          options: [
            {
              label: "ROM exercise",
              value: "rom_exercise"
            },
            {
              label: "Strengthening exercise",
              value: "strengthening_exercise"
            },
            {
              label: "Gait training",
              value: "gait_training"
            },
            {
              label: "Weight-bearing exercise",
              value: "weight_bearing_exercise"
            },
            {
              label: "Balance training",
              value: "balance_training"
            },
            {
              label: "Mat Activity",
              value: "mat_activity"
            },
            {
              label: "Postural control training",
              value: "postural_control_training"
            },
            {
              label: "Coordination",
              value: "coordination"
            }
          ]
        },

        // =========================
        // ROM Exercise
        // =========================
        {
          type: "subheading",
          label: "ROM Exercise",
          showIf: {
            field: "therapeutic_exercises",
            includes: "rom_exercise"
          }
        },
        {
          name: "rom_exercise_type",
          label: "ROM Exercise Type",
          type: "radio",
          options: [
            { label: "Passive", value: "passive" },
            { label: "Active", value: "active" },
            { label: "Assisted", value: "assisted" }
          ],
          showIf: {
            field: "therapeutic_exercises",
            includes: "rom_exercise"
          }
        },
        {
          name: "rom_exercise_remarks",
          label: "Remarks",
          type: "input",
          showIf: { field: "therapeutic_exercises", includes: "rom_exercise" }
        },

        // =========================
        // Strengthening Exercise
        // =========================
        {
          type: "subheading",
          label: "Strengthening Exercise",
          showIf: {
            field: "therapeutic_exercises",
            includes: "strengthening_exercise"
          }
        },
        {
          name: "strengthening_exercise_type",
          label: "Select Area",
          type: "radio",
          options: [
            { label: "UL", value: "ul" },
            { label: "LL", value: "ll" }
          ],
          showIf: {
            field: "therapeutic_exercises",
            includes: "strengthening_exercise"
          }
        },
        {
          name: "strengthening_exercise_remarks",
          label: "Remarks",
          type: "input",
          showIf: { field: "therapeutic_exercises", includes: "strengthening_exercise" }
        },

        // =========================
        // Gait Training
        // =========================
        {
          type: "subheading",
          label: "Gait Training",
          showIf: {
            field: "therapeutic_exercises",
            includes: "gait_training"
          }
        },
        {
          name: "gait_training_type",
          label: "Gait Training Type",
          type: "radio",
          options: [
            { label: "With BWS", value: "with_bws" },
            { label: "Without BWS", value: "without_bws" },
            { label: "Parallel Bar", value: "parallel_bar" }
          ],
          showIf: {
            field: "therapeutic_exercises",
            includes: "gait_training"
          }
        },
        {
          name: "gait_training_remarks",
          label: "Remarks",
          type: "input",
          showIf: { field: "therapeutic_exercises", includes: "gait_training" }
        },

        // =========================
        // Weight-bearing Exercise
        // =========================
        {
          type: "subheading",
          label: "Weight-bearing Exercise",
          showIf: {
            field: "therapeutic_exercises",
            includes: "weight_bearing_exercise"
          }
        },
        {
          name: "weight_bearing_exercise_remarks",
          label: "Remarks",
          type: "input",
          showIf: { field: "therapeutic_exercises", includes: "weight_bearing_exercise" }
        },

        // =========================
        // Balance Training
        // =========================
        {
          type: "subheading",
          label: "Balance Training",
          showIf: {
            field: "therapeutic_exercises",
            includes: "balance_training"
          }
        },
        {
          name: "balance_training_type",
          label: "Balance Training Type",
          type: "radio",
          options: [
            { label: "Static", value: "static" },
            { label: "Dynamic", value: "dynamic" }
          ],
          showIf: {
            field: "therapeutic_exercises",
            includes: "balance_training"
          }
        },
        {
          name: "balance_training_remarks",
          label: "Remarks",
          type: "input",
         
          showIf: {
            field: "therapeutic_exercises",
            includes: "balance_training"
          }
        },

        // =========================
        // Mat Activity
        // =========================
        {
          type: "subheading",
          label: "Mat Activity",
          showIf: {
            field: "therapeutic_exercises",
            includes: "mat_activity"
          }
        },
        {
          name: "mat_activity_remarks",
          label: "Remarks",
          type: "input",
          
          showIf: {
            field: "therapeutic_exercises",
            includes: "mat_activity"
          }
        },

        // =========================
        // Postural Control Training
        // =========================
        {
          type: "subheading",
          label: "Postural Control Training",
          showIf: {
            field: "therapeutic_exercises",
            includes: "postural_control_training"
          }
        },
        {
          name: "postural_control_training_remarks",
          label: "Remarks",
          type: "input",
         
          showIf: {
            field: "therapeutic_exercises",
            includes: "postural_control_training"
          }
        },

        // =========================
        // Coordination
        // =========================
        {
          type: "subheading",
          label: "Coordination",
          showIf: {
            field: "therapeutic_exercises",
            includes: "coordination"
          }
        },
        {
          name: "coordination_remarks",
          label: "Remarks",
          type: "input",
          
          showIf: {
            field: "therapeutic_exercises",
            includes: "coordination"
          }
        },
        {
  type: "subheading",
  label: "Functional Mobility Training"
},
{
  name: "functional_mobility_training",
  // label: "Select Functional Mobility Training",
  type: "checkbox-group",
  options: [
    {
      label: "Bed Mobility training",
      value: "bed_mobility_training"
    },
    {
      label: "Transfer training",
      value: "transfer_training"
    },
    {
      label: "Standing to floor training",
      value: "standing_to_floor_training"
    },
    {
      label: "Floor to standing training",
      value: "floor_to_standing_training"
    },
    {
      label: "Wheelchair Training",
      value: "wheelchair_training"
    },
    {
      label: "Walking Aids Training",
      value: "walking_aids_training"
    }
  ]
},

// =========================
// Bed Mobility Training
// =========================
{
  name: "bed_mobility_training_remarks",
  label: "Bed Mobility Training Remarks",
  type: "input",
  
  showIf: {
    field: "functional_mobility_training",
    includes: "bed_mobility_training"
  }
},

// =========================
// Transfer Training
// =========================
{
  name: "transfer_training_remarks",
  label: "Transfer Training Remarks",
  type: "input",
  
  showIf: {
    field: "functional_mobility_training",
    includes: "transfer_training"
  }
},

// =========================
// Standing to Floor Training
// =========================
{
  name: "standing_to_floor_training_remarks",
  label: "Standing to Floor Training Remarks",
  type: "input",
  
  showIf: {
    field: "functional_mobility_training",
    includes: "standing_to_floor_training"
  }
},

// =========================
// Floor to Standing Training
// =========================
{
  name: "floor_to_standing_training_remarks",
  label: "Floor to Standing Training Remarks",
  type: "input",
  
  showIf: {
    field: "functional_mobility_training",
    includes: "floor_to_standing_training"
  }
},

// =========================
// Wheelchair Training
// =========================
{
  name: "wheelchair_training_remarks",
  label: "Wheelchair Training Remarks",
  type: "input",
 
  showIf: {
    field: "functional_mobility_training",
    includes: "wheelchair_training"
  }
},

// =========================
// Walking Aids Training
// =========================
{
  name: "walking_aids_training_remarks",
  label: "Walking Aids Training Remarks",
  type: "input",
 
  showIf: {
    field: "functional_mobility_training",
    includes: "walking_aids_training"
  }
},
{
  type: "subheading",
  label: "Manual Therapy"
},
{
  name: "manual_therapy",
  // label: "Select Manual Therapy",
  type: "checkbox-group",
  options: [
    {
      label: "Bobath/NDT Therapy",
      value: "bobath_ndt_therapy"
    },
    {
      label: "Stretching",
      value: "stretching"
    },
    {
      label: "Soft tissue manipulation",
      value: "soft_tissue_manipulation"
    },
    {
      label: "Others",
      value: "others"
    }
  ]
},

// =========================
// Bobath / NDT Therapy
// =========================
{
  type: "subheading",
  label: "Bobath / NDT Therapy",
  showIf: {
    field: "manual_therapy",
    includes: "bobath_ndt_therapy"
  }
},
{
  name: "bobath_ndt_area",
  label: "Choose Area",
  type: "checkbox-group",
  options: [
    {
      label: "Trunk & Pelvis",
      value: "trunk_pelvis"
    },
    {
      label: "Lower Limb",
      value: "lower_limb"
    },
    {
      label: "Upper Limb & Hand",
      value: "upper_limb_hand"
    },
    {
      label: "Neck",
      value: "neck"
    }
  ],
  showIf: {
    field: "manual_therapy",
    includes: "bobath_ndt_therapy"
  }
},
{
  name: "bobath_ndt_difficulty_level",
  label: "Difficulty Level",
  type: "radio",
  info: {
    title: "Difficulty Level Guide",
    content: [
      "Low — Requires full facilitation (hand-over-hand), Poor selective control, Synergy pattern dominant",
      "Moderate — Partial facilitation required, Emerging selective movement, Able to initiate movement with cues",
      "High — Minimal facilitation / supervision only, Good motor control, Able to perform functional task independently",
    ]
  },
  options: [
    { label: "Low",      value: "low"      },
    { label: "Moderate", value: "moderate" },
    { label: "High",     value: "high"     },
  ],
  showIf: {
    field: "manual_therapy",
    includes: "bobath_ndt_therapy"
  }
},
// {
//   name: "bobath_ndt_duration",
//   label: "Duration (Minutes)",
//   type: "input",
//   min: 0,
//   showIf: {
//     field: "manual_therapy",
//     includes: "bobath_ndt_therapy"
//   }
// },
// {
//   name: "bobath_ndt_remarks",
//   label: "Remarks",
//   type: "input",
//   rows: 3,
//   showIf: {
//     field: "manual_therapy",
//     includes: "bobath_ndt_therapy"
//   }
// },
{
  type: "row",
  showIf: {
    field: "manual_therapy",
    includes: "bobath_ndt_therapy"
  },
  fields: [
    {
      name: "bobath_ndt_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "bobath_ndt_remarks",
      label: "Remarks",
      type:"input",
      rows: 3
    }
  ]
},

// =========================
// Stretching
// =========================
{
  type: "subheading",
  label: "Stretching",
  showIf: {
    field: "manual_therapy",
    includes: "stretching"
  }
},
{
  name: "stretching_type",
  label: "Stretching Type",
  type: "radio",
  options: [
    {
      label: "Passive",
      value: "passive"
    },
    {
      label: "Active",
      value: "active"
    }
  ],
  showIf: {
    field: "manual_therapy",
    includes: "stretching"
  }
},
{
  name: "stretching_remarks",
  label: "Remarks",
  type: "input",
  
  showIf: {
    field: "manual_therapy",
    includes: "stretching"
  }
},

// =========================
// Soft Tissue Manipulation
// =========================
{
  type: "subheading",
  label: "Soft Tissue Manipulation",
  showIf: {
    field: "manual_therapy",
    includes: "soft_tissue_manipulation"
  }
},
{
  name: "soft_tissue_manipulation_remarks",
  label: "Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "manual_therapy",
    includes: "soft_tissue_manipulation"
  }
},

// =========================
// Others
// =========================
{
  type: "subheading",
  label: "Others",
  showIf: {
    field: "manual_therapy",
    includes: "others"
  }
},
{
  name: "manual_therapy_others",
  label: "Specify Other Manual Therapy",
  type: "input",
  showIf: {
    field: "manual_therapy",
    includes: "others"
  }
},
{
  type: "subheading",
  label: "Functional Exercises (Exercise Modalities)"
},
{
  name: "functional_exercise_modalities",
  
  type: "checkbox-group",
  options: [
    { label: "Cycling", value: "cycling" },
     { label: "FESIA Walk", value: "fesia_walk" },
    { label: "FESIA Cycle", value: "fesia_cycle" },
   { label: "FESIA Hand", value: "fesia_hand" },
    { label: "Functional Electrical Stimulation (FES)", value: "fes" },
    { label: "Treadmill", value: "treadmill" },
    
    
   
    
    
    
   
    
    {label:'Stepper',value:'stepper'},
    {label:'Multigym',value:'multigym'},
    {label:'Leg Extension',value:'leg_extension'},
    {label:'Leg Curl',value:'leg_curl'},
    {label:'Leg Press',value:'leg_press'},
    {label:'Chest Press',value:'chest_press'},
   
    
   
     {label:'Pulley Station',value:"pulley_station"},
    { label: "Galileo Vibration Plate", value: "galileo_vibration_plate" },
    { label: "Chattanooga Wireless Pro", value: "chattanooga_wireless_pro" },
    { label: "Tilt Table", value: "tilt_table" },
    { label: "Xcite", value: "xcite" },
    { label: "Evolv Easystand", value: "evolv_easystand" },
     { label: "Vibramoov", value: "vibramoov" },
    { label: "Others", value: "others" }
  ]
},

// =========================
// Cycling

// =========================
{
  type: "subheading",
  label: "Cycling",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "cycling"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "cycling"
  },
  fields: [
    {
      name: "cycling_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "cycling_minutes",
      label: "Cycling Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "cycling_remarks",
      label: "Cycling Remarks",
      type: "input",
      rows: 3
    }
  ]
},
{
  type: "subheading",
  label: "Pulley Station",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "pulley_station"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "pulley_station"
  },
  fields: [
    {
      name: "pulley_repetitions",
      label: "Repetitions",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "pulley_sets",
      label: "Sets",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "pulley_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
// =========================
// Sidra LEG

// =========================
{
  type: "subheading",
  label: "FESIA Hand",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "fesia_hand"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "fesia_hand"
  },
  fields: [
    {
      name: "fesia_hand_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_hand_frequency",
      label: "Frequency (Hz)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_hand_pulse_width",
      label: "Pulse Width (μs)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_hand_amplitude",
      label: "Amplitude (mA)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_hand_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
{
  type: "subheading",
  label: "Functional Electrical Stimulation (FES)",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "fes"
  }
},

{
  name: "fes_selection",
  label: "Selection",
  type: "radio",
  options: [
    { label: "Upper Limb (UL)", value: "ul" },
    { label: "Lower Limb (LL)", value: "ll" }
  ],
  showIf: {
    field: "functional_exercise_modalities",
    includes: "fes"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "fes"
  },
  fields: [
    {
      name: "fes_free_text",
      label: "Notes",
      type: "input"
    },
    {
      name: "fes_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fes_frequency",
      label: "Frequency (Hz)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fes_pulse_width",
      label: "Pulse Width (μs)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fes_amplitude",
      label: "Amplitude (mA)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fes_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
{
  type: "subheading",
  label: "Stepper",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "stepper"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "stepper"
  },
  fields: [
    {
      name: "stepper_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "stepper_minutes",
      label: "Minutes",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "stepper_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
{
  type: "subheading",
  label: "Multigym",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "multigym"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "multigym"
  },
  fields: [
    {
      name: "multigym_exercise",
      label: "Exercise",
      type: "input"
    },
    {
      name: "multigym_repetitions",
      label: "Repetitions",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "multigym_sets",
      label: "Sets",
      type: "input",
      inputType: "number",
      min: 0
    }
  ]
},
{
  type: "subheading",
  label: "Leg Extension",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "leg_extension"
  }
},

// ======================================================
// LEG EXTENSION - One Row
// ======================================================

{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "leg_extension"
  },
  fields: [
    {
      name: "leg_extension_repetitions",
      label: "Repetitions",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "leg_extension_sets",
      label: "Sets",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "leg_extension_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},

// ======================================================
// MULTIGYM REMARKS - One Row
// ======================================================

{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "multigym"
  },
  fields: [
    {
      name: "multigym_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
{
  type: "subheading",
  label: "Leg Curl",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "leg_curl"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "leg_curl"
  },
  fields: [
    {
      name: "leg_curl_repetitions",
      label: "Repetitions",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "leg_curl_sets",
      label: "Sets",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "leg_curl_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
{
  type: "subheading",
  label: "Leg Press",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "leg_press"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "leg_press"
  },
  fields: [
    {
      name: "leg_press_repetitions",
      label: "Repetitions",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "leg_press_sets",
      label: "Sets",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "leg_press_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
{
  type: "subheading",
  label: "Chest Press",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "chest_press"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "chest_press"
  },
  fields: [
    {
      name: "chest_press_repetitions",
      label: "Repetitions",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "chest_press_sets",
      label: "Sets",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "chest_press_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
// =========================
// HP Cosmos Treadmill
{
  type: "subheading",
  label: "Treadmill",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "treadmill"
  }
},
// =========================
{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "treadmill"
  },
  fields: [
    {
      name: "hp_cosmos_speed",
      label: "Speed",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "hp_cosmos_elevation",
      label: "Elevation",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "hp_cosmos_distance",
      label: "Distance",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "hp_cosmos_minutes",
      label: "Minutes",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "hp_cosmos_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
// =========================
// Pablo
{
  type: "subheading",
  label: "Pablo",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "pablo"
  }
},
// =========================

{
  name: "pablo_therapy_program",
  label: "Therapy Program",
  type: "checkbox-group",
  options: [
    { label: "1D Accuracy", value: "1d_accuracy" },
    { label: "1D Reaction", value: "1d_reaction" },
    { label: "2D Motor Function", value: "2d_motor_function" },
    { label: "2D Cognition", value: "2d_cognition" }
  ],
  showIf: {
    field: "functional_exercise_modalities",
    includes: "pablo"
  }
},
{
  name: "pablo_exercise_type",
  label: "Types of Exercise",
  type: "input",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "pablo"
  }
},
{
  name: "pablo_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "pablo"
  }
},
{
  name: "pablo_remarks",
  label: "Remarks",
  type: "input",

  showIf: {
    field: "functional_exercise_modalities",
    includes: "pablo"
  }
},
{
  type: "subheading",
  label: "Tymo",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "tymo"
  }
},
{
  type: "subheading",
  label: "Chattanooga Wireless Pro",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "chattanooga_wireless_pro"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "chattanooga_wireless_pro"
  },
  fields: [
    {
      name: "chattanooga_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "chattanooga_frequency",
      label: "Frequency (Hz)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "chattanooga_pulse_width",
      label: "Pulse Width (μs)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "chattanooga_amplitude",
      label: "Amplitude (mA)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "chattanooga_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
// =========================
// Tymo
// =========================
{
  name: "tymo_therapy_program",
  label: "Therapy Program",
  type: "checkbox-group",
  options: [
    { label: "1D Accuracy", value: "1d_accuracy" },
    { label: "1D Reaction", value: "1d_reaction" },
    { label: "2D Motor Function", value: "2d_motor_function" },
    { label: "2D Cognition", value: "2d_cognition" }
  ],
  showIf: {
    field: "functional_exercise_modalities",
    includes: "tymo"
  }
},
{
  name: "tymo_exercise_type",
  label: "Types of Exercise",
  type: "input",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "tymo"
  }
},
{
  name: "tymo_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "tymo"
  }
},
{
  name: "tymo_remarks",
  label: "Remarks",
  type: "input",
  
  showIf: {
    field: "functional_exercise_modalities",
    includes: "tymo"
  }
},
//
// =========================

// =========================


// =========================
// Tilt Table
// =========================
{
  type: "subheading",
  label: "Tilt Table",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "tilt_table"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "tilt_table"
  },
  fields: [
    {
      name: "tilt_table_degree",
      label: "Tilting Degree",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "tilt_table_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "tilt_table_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},

// =========================
// Galileo Vibration Plate
// =========================
{
  type: "subheading",
  label: "Galileo Vibration Plate",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "galileo_vibration_plate"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "galileo_vibration_plate"
  },
  fields: [
    {
      name: "galileo_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "galileo_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "galileo_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
{
  type: "subheading",
  label: "Xcite",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "xcite"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "xcite"
  },
  fields: [
    {
      name: "xcite_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "xcite_frequency",
      label: "Frequency (Hz)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "xcite_pulse_width",
      label: "Pulse Width (μs)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "xcite_amplitude",
      label: "Amplitude (mA)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "xcite_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
//
// =========================
// Evolv Easystand
// =========================
{
  type: "subheading",
  label: "Evolv Easystand",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "evolv_easystand"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "evolv_easystand"
  },
  fields: [
    {
      name: "evolv_easystand_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "evolv_easystand_activity",
      label: "Activity",
      type: "input"
    },
    {
      name: "evolv_easystand_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},

// =========================
// Lusio Mate
// =========================
{
  type: "subheading",
  label: "Lusio Mate",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "lusio_mate"
  }
},
{
  name: "lusio_mate_exercise_type",
  label: "Types of Exercise",
  type: "input",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "lusio_mate"
  }
},
{
  name: "lusio_mate_minutes",
  label: "Minutes",
  type: "input",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "lusio_mate"
  }
},
{
  name: "lusio_mate_remarks",
  label: "Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "functional_exercise_modalities",
    includes: "lusio_mate"
  }
},
//
// =========================
// Vibramoov
// =========================
{
  type: "subheading",
  label: "Vibramoov",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "vibramoov"
  }
},
{
  name: "vibramoov_mode",
  label: "Mode",
  type: "radio",
  options: [
    {
      label: "Functional Proprioceptive Stimulations (FPS)",
      value: "fps"
    },
    {
      label: "Focal Vibration (FV)",
      value: "fv"
    }
  ],
  showIf: {
    field: "functional_exercise_modalities",
    includes: "vibramoov"
  }
},

// =========================
// FPS Mode - Body Parts
// =========================
{
  name: "vibramoov_body_parts",
  label: "Body Parts",
  type: "radio",
  options: [
    {
      label: "Legs",
      value: "legs"
    },
    {
      label: "Arms",
      value: "arms"
    }
  ],
  showIf: {
    field: "vibramoov_mode",
    equals: "fps"
  }
},

// =========================
// FPS - Legs
// =========================
{
  type: "subheading",
  label: "FPS Mode - Legs",
  showIf: {
    field: "vibramoov_body_parts",
    equals: "legs"
  }
},
{
  name: "vibramoov_legs_position",
  label: "Position",
  type: "radio",
  options: [
    {
      label: "Lying Down",
      value: "lying_down"
    },
    {
      label: "Verticalized",
      value: "verticalized"
    },
    {
      label: "Standing",
      value: "standing"
    }
  ],
  showIf: {
    field: "vibramoov_body_parts",
    equals: "legs"
  }
},
{
  name: "vibramoov_legs_exercises",
  label: "Exercises",
  type: "checkbox-group",
  options: [
    {
      label: "Multi Activity",
      value: "multi_activity"
    },
    {
      label: "Gait",
      value: "gait"
    },
    {
      label: "Flexions",
      value: "flexions"
    },
    {
      label: "Stairs",
      value: "stairs"
    },
    {
      label: "Postural Control",
      value: "postural_control"
    }
  ],
  showIf: {
    field: "vibramoov_body_parts",
    equals: "legs"
  }
},
{
  name: "vibramoov_legs_intensity",
  label: "Intensity",
  type: "radio",
  options: [
    {
      label: "Low",
      value: "low"
    },
    {
      label: "Medium",
      value: "medium"
    },
    {
      label: "High",
      value: "high"
    }
  ],
  showIf: {
    field: "vibramoov_body_parts",
    equals: "legs"
  }
},
{
  type: "row",
  showIf: {
    field: "vibramoov_body_parts",
    equals: "legs"
  },
  fields: [
    {
      name: "vibramoov_legs_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "vibramoov_legs_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},

// =========================
// FPS - Arms
// =========================
{
  type: "subheading",
  label: "FPS Mode - Arms",
  showIf: {
    field: "vibramoov_body_parts",
    equals: "arms"
  }
},
{
  name: "vibramoov_arms_side",
  label: "Side",
  type: "radio",
  options: [
    {
      label: "Bilateral",
      value: "bilateral"
    },
    {
      label: "Left",
      value: "left"
    },
    {
      label: "Right",
      value: "right"
    }
  ],
  showIf: {
    field: "vibramoov_body_parts",
    equals: "arms"
  }
},
{
  name: "vibramoov_arms_exercises",
  label: "Exercises",
  type: "checkbox-group",
  options: [
    {
      label: "Multi Activity",
      value: "multi_activity"
    },
    {
      label: "Reaching-pointing",
      value: "reaching_pointing"
    },
    {
      label: "Writing-Drawing",
      value: "writing_drawing"
    },
    {
      label: "ADL",
      value: "adl"
    }
  ],
  showIf: {
    field: "vibramoov_body_parts",
    equals: "arms"
  }
},
{
  name: "vibramoov_arms_intensity",
  label: "Intensity",
  type: "radio",
  options: [
    {
      label: "Low",
      value: "low"
    },
    {
      label: "Medium",
      value: "medium"
    },
    {
      label: "High",
      value: "high"
    }
  ],
  showIf: {
    field: "vibramoov_body_parts",
    equals: "arms"
  }
},
{
  type: "row",
  showIf: {
    field: "vibramoov_body_parts",
    equals: "arms"
  },
  fields: [
    {
      name: "vibramoov_arms_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "vibramoov_arms_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},

// =========================
// Focal Vibration (FV)
// =========================
{
  type: "subheading",
  label: "Focal Vibration (FV)",
  showIf: {
    field: "vibramoov_mode",
    equals: "fv"
  }
},
{
  name: "vibramoov_fv_level",
  label: "Level",
  type: "radio",
  options: [
    {
      label: "Severe",
      value: "severe"
    },
    {
      label: "Moderate",
      value: "moderate"
    }
  ],
  showIf: {
    field: "vibramoov_mode",
    equals: "fv"
  }
},
{
  name: "vibramoov_fv_intensity",
  label: "Intensity",
  type: "radio",
  options: [
    {
      label: "Long",
      value: "long"
    },
    {
      label: "Short",
      value: "short"
    }
  ],
  showIf: {
    field: "vibramoov_mode",
    equals: "fv"
  }
},
{
  type: "row",
  showIf: {
    field: "vibramoov_mode",
    equals: "fv"
  },
  fields: [
    {
      name: "vibramoov_fv_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "vibramoov_fv_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
//
// =========================
// Huber 360
// =========================


// =========================
// Flexibility & Mobility
// =========================
{
  type: "subheading",
  label: "Flexibility and Mobility",
  showIf: {
    field: "huber360_training_type",
    includes: "flexibility_mobility"
  }
},
{
  name: "huber360_flexibility_body_parts",
  label: "Body Parts",
  type: "checkbox-group",
  options: [
    { label: "Shoulder (flexibility & mobility)", value: "shoulder" },
    { label: "Hip (mobility)", value: "hip" },
    { label: "Knee (mobility)", value: "knee" },
    { label: "Ankle (mobility)", value: "ankle" },
    { label: "Thoracic (flexibility & mobility)", value: "thoracic" },
    { label: "Lumbar (flexibility & mobility)", value: "lumbar" },
    { label: "Glutes (flexibility)", value: "glutes" },
    { label: "Hamstring (flexibility)", value: "hamstring" },
    { label: "Calf (flexibility)", value: "calf" }
  ],
  showIf: {
    field: "huber360_training_type",
    includes: "flexibility_mobility"
  }
},
{
  name: "huber360_flexibility_side",
  label: "Side",
  type: "radio",
  options: [
    { label: "Right", value: "right" },
    { label: "Left", value: "left" },
    { label: "Right + Left", value: "bilateral" }
  ],
  showIf: {
    field: "huber360_training_type",
    includes: "flexibility_mobility"
  }
},
{
  name: "huber360_flexibility_level",
  label: "Level",
  type: "radio",
  options: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" }
  ],
  showIf: {
    field: "huber360_training_type",
    includes: "flexibility_mobility"
  }
},
{
  name: "huber360_flexibility_coordination",
  label: "Coordination (%)",
  type: "input",
  showIf: {
    field: "huber360_training_type",
    includes: "flexibility_mobility"
  }
},
{
  name: "huber360_flexibility_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "huber360_training_type",
    includes: "flexibility_mobility"
  }
},

// =========================
// Dynamic Reinforcement
// =========================
{
  type: "subheading",
  label: "Dynamic Reinforcement",
  showIf: {
    field: "huber360_training_type",
    includes: "dynamic_reinforcement"
  }
},
{
  name: "huber360_dynamic_body_parts",
  label: "Body Parts",
  type: "checkbox-group",
  options: [
    { label: "Biceps brachii", value: "biceps_brachii" },
    { label: "Pectoralis major", value: "pectoralis_major" },
    { label: "Abdominal external/oblique", value: "abdominal_external_oblique" },
    { label: "Rectus abdominis", value: "rectus_abdominis" },
    { label: "Abductors", value: "abductors" },
    { label: "Quadriceps femoris", value: "quadriceps_femoris" },
    { label: "Infraspinatus", value: "infraspinatus" },
    { label: "Triceps brachii", value: "triceps_brachii" },
    { label: "Latissimus dorsi", value: "latissimus_dorsi" },
    { label: "Quadratus Lumborum", value: "quadratus_lumborum" },
    { label: "Glutes", value: "glutes" },
    { label: "Adductors", value: "adductors" },
    { label: "Gastrocnemius", value: "gastrocnemius" }
  ],
  showIf: {
    field: "huber360_training_type",
    includes: "dynamic_reinforcement"
  }
},
{
  name: "huber360_dynamic_level",
  label: "Level",
  type: "radio",
  options: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" }
  ],
  showIf: {
    field: "huber360_training_type",
    includes: "dynamic_reinforcement"
  }
},
{
  name: "huber360_dynamic_average_strength",
  label: "Average Strength",
  type: "input",
  showIf: {
    field: "huber360_training_type",
    includes: "dynamic_reinforcement"
  }
},
{
  name: "huber360_dynamic_coordination",
  label: "Coordination (%)",
  type: "number",
  showIf: {
    field: "huber360_training_type",
    includes: "dynamic_reinforcement"
  }
},
{
  name: "huber360_dynamic_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "huber360_training_type",
    includes: "dynamic_reinforcement"
  }
},

// =========================
// Posture and Balance
// =========================
{
  type: "subheading",
  label: "Posture and Balance",
  showIf: {
    field: "huber360_training_type",
    includes: "posture_balance"
  }
},
{
  name: "huber360_posture_games",
  label: "Games",
  type: "checkbox-group",
  options: [
    { label: "Game 1", value: "game_1" },
    { label: "Game 2", value: "game_2" },
    { label: "Game 3", value: "game_3" },
    { label: "Game 4", value: "game_4" },
    { label: "Game 5", value: "game_5" },
    { label: "Game 6", value: "game_6" }
  ],
  showIf: {
    field: "huber360_training_type",
    includes: "posture_balance"
  }
},
{
  name: "huber360_posture_level",
  label: "Level",
  type: "radio",
  options: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" }
  ],
  showIf: {
    field: "huber360_training_type",
    includes: "posture_balance"
  }
},
{
  name: "huber360_posture_coordination",
  label: "Coordination (%)",
  type: "input",
  showIf: {
    field: "huber360_training_type",
    includes: "posture_balance"
  }
},
{
  name: "huber360_posture_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "huber360_training_type",
    includes: "posture_balance"
  }
},

// =========================
// Resistance
// =========================
{
  type: "subheading",
  label: "Resistance",
  showIf: {
    field: "huber360_training_type",
    includes: "resistance"
  }
},
{
  name: "huber360_resistance_games",
  label: "Games",
  type: "checkbox-group",
  options: [
    { label: "Game 1", value: "game_1" },
    { label: "Game 2", value: "game_2" },
    { label: "Game 3", value: "game_3" },
    { label: "Game 4", value: "game_4" },
    { label: "Game 5", value: "game_5" },
    { label: "Game 6", value: "game_6" }
  ],
  showIf: {
    field: "huber360_training_type",
    includes: "resistance"
  }
},
{
  name: "huber360_resistance_level",
  label: "Level",
  type: "radio",
  options: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" }
  ],
  showIf: {
    field: "huber360_training_type",
    includes: "resistance"
  }
},
{
  name: "huber360_resistance_coordination",
  label: "Coordination (%)",
  type: "input",
  showIf: {
    field: "huber360_training_type",
    includes: "resistance"
  }
},
{
  name: "huber360_resistance_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "huber360_training_type",
    includes: "resistance"
  }
},
//
// =========================



// =========================

// =========================


// =========================
// FESIA Walk
// =========================
{
  type: "subheading",
  label: "FESIA Walk",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "fesia_walk"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "fesia_walk"
  },
  fields: [
    {
      name: "fesia_walk_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_walk_frequency",
      label: "Frequency (Hz)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_walk_pulse_width",
      label: "Pulse Width (μs)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_walk_amplitude",
      label: "Amplitude (mA)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_walk_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},

// =========================
// FESIA Cycle
// =========================
{
  type: "subheading",
  label: "FESIA Cycle",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "fesia_cycle"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "fesia_cycle"
  },
  fields: [
    {
      name: "fesia_cycle_duration",
      label: "Duration (Minutes)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_cycle_frequency",
      label: "Frequency (Hz)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_cycle_pulse_width",
      label: "Pulse Width (μs)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_cycle_amplitude",
      label: "Amplitude (mA)",
      type: "input",
      inputType: "number",
      min: 0
    },
    {
      name: "fesia_cycle_remarks",
      label: "Remarks",
      type: "input",
      rows: 3
    }
  ]
},
// =========================
// Others
// =========================
{
  type: "subheading",
  label: "Others",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "others"
  }
},
{
  name: "functional_exercise_other",
  label: "Specify Other Exercise Modality",
  type: "input",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "others"
  }
},
{
  type: "subheading",
  label: "Pain Management"
},
{
  name: "pain_management",
  // label: "Select Pain Management",
  type: "checkbox-group",
  options: [
    {
      label: "Cold Therapy",
      value: "cold_therapy"
    },
    {
      label: "Heat Therapy",
      value: "heat_therapy"
    },
    {
      label: "Laser Therapy",
      value: "laser_therapy"
    },
    {
      label: "CryoMag Therapy",
      value: "cryomag_therapy"
    },
    {
      label: "IFT",
      value: "ultrasound_therapy"
    },
    {
      label: "Transcutaneous Electrical Nerve Stimulation (TENS)",
      value: "tens"
    },
    
  ]
},

// =========================
// Cold Therapy
// =========================
{
  name: "cold_therapy_remarks",
  label: "Cold Therapy Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "pain_management",
    includes: "cold_therapy"
  }
},

// =========================
// Heat Therapy
// =========================
{
  name: "heat_therapy_remarks",
  label: "Heat Therapy Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "pain_management",
    includes: "heat_therapy"
  }
},

// =========================
// Laser Therapy
// =========================
{
  name: "laser_therapy_remarks",
  label: "Laser Therapy Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "pain_management",
    includes: "laser_therapy"
  }
},

// =========================
// CryoMag Therapy
// =========================
{
  name: "cryomag_therapy_remarks",
  label: "CryoMag Therapy Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "pain_management",
    includes: "cryomag_therapy"
  }
},

// =========================
// IFT
// =========================
{
  name: "ultrasound_therapy_remarks",
  label: "IFT Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "pain_management",
    includes: "ultrasound_therapy"
  }
},

// =========================
// TENS
// =========================
{
  name: "tens_therapy_remarks",
  label: "TENS Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "pain_management",
    includes: "tens"
  }
},

// =========================
// Others
// =========================
   ]
    }
  ]
};
const ASSESSMENT_SCHEMA = {
  title: "Assessment & Response",
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [{
    fields: [
    
      { name: "assessment_notes", label: "Clinical Impression / Notes", type: "input", placeholder: "Therapist assessment..." },


      
    ],
  }],
};

const PLAN_SCHEMA = {
  title: "Plan",
  actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [{
    fields: [
      { type: "subheading", label: "Short-Term Goals (2–4 weeks)" },
        {
            type: "dynamic-goals",
            name: "short_term_goals"
          },
          { type: "subheading", label: "Long-Term Goals (6–12 weeks)" },
          {
            type: "dynamic-goals",
            name: "long_term_goals"
          },  
          {
  type: "subheading",
  label: "P – Plan"
},

// =========================
// 1) Therapeutic Exercises
// =========================
{
  name: "plan_therapeutic_exercises",
  label: "Therapeutic Exercises",
  type: "checkbox-group",
  options: [
    { label: "Continue exercise program", value: "continue_program" },
    { label: "Improve strength", value: "improve_strength" },
    { label: "Improve postural and core control", value: "improve_postural_core_control" },
    { label: "Increase ROM", value: "increase_rom" },
    { label: "Improve balance", value: "improve_balance" },
    { label: "Improve coordination", value: "improve_coordination" },
    { label: "Progress gait / ambulation training", value: "progress_gait" }
  ]
},
{
  name: "plan_therapeutic_exercises_comments",
  label: "Comments",
  type: "input"
},

// =========================
// 2) Functional Mobility Training
// =========================
{
  name: "plan_functional_mobility",
  label: "Functional Mobility Training",
  type: "checkbox-group",
  options: [
    { label: "Improve bed mobility", value: "bed_mobility" },
    { label: "Improve transfer", value: "transfer" },
    { label: "Improve wheelchair skills", value: "wheelchair_skills" },
    { label: "Improve gait and walking skills", value: "gait_walking" }
  ]
},
{
  name: "plan_functional_mobility_comments",
  label: "Comments",
  type: "input"
},

// =========================
// 3) Manual Therapy
// =========================
{
  name: "plan_manual_therapy",
  label: "Manual Therapy",
  type: "checkbox-group",
  options: [
    { label: "Continue passive stretching", value: "passive_stretching" },
    { label: "Continue soft tissue mobilization", value: "soft_tissue_mobilization" },
    { label: "Continue Bobath/NDT Therapy", value: "bobath_ndt" }
  ]
},
{
  name: "plan_manual_therapy_comments",
  label: "Comments",
  type: "input"
},

// =========================
// 4) Functional Exercises
// =========================
{
  name: "plan_functional_exercises",
  label: "Functional Exercises",
  type: "checkbox-group",
  options: [
    { label: "Continue functional exercise program", value: "continue_program" },
    { label: "Functional exercise progression (review of exercise modalities)", value: "progression" }
  ]
},
{
  name: "plan_functional_exercises_comments",
  label: "Comments",
  type: "input"
},

// =========================
// 5) Pain Management
// =========================
{
  name: "plan_pain_management",
  label: "Pain Management",
  type: "checkbox-group",
  options: [
    { label: "Continue pain management program", value: "continue_program" },
    { label: "Refer for further pain management intervention", value: "refer_intervention" }
  ]
},
{
  name: "plan_pain_management_comments",
  label: "Comments",
  type: "input"
},

// =========================
// 6) Education
// =========================
{
  name: "plan_education",
  label: "Education",
  type: "checkbox-group",
  options: [
    { label: "Patient education", value: "patient_education" },
    { label: "Carer Training", value: "carer_training" },
    { label: "Continue safety supervision", value: "safety_supervision" },
    { label: "Others", value: "others" }
  ]
},
{
  name: "plan_education_other",
  label: "Others",
  type: "input",
  showIf: {
    field: "plan_education",
    includes: "others"
  }
},
{
  name: "plan_education_comments",
  label: "Comments",
  type: "input"
},  
 
    ],
  }],
};

const SOAP_TABS = [
  { key: "subjective",     label: "Subjective"     },
  { key: "objective", label: "Objective" },
  { key: "assessment",   label: "Assessment"   },
  { key: "plan",         label: "Plan"         },
];

const SCHEMA_MAP = {
  subjective:     SUBJECTIVE_SCHEMA,
  objective: OBJECTIVE_SCHEMA,
  assessment:   ASSESSMENT_SCHEMA,
  plan:         PLAN_SCHEMA,
};

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function SpinalcordInjuryProgress({ patient, onBack }) {
  const [values, setValues]       = useState({});
  const [activeTab, setActiveTab] = useState("subjective");
   const [submitted, setSubmitted] = useState(false);
  const [patientHistory, setPatientHistory] = useState({
      past_medical_history: "",
      past_family_history: "",
      alerts_and_allergies: ""
    });
    useEffect(() => {
          if (!patient) return;
          setPatientHistory({
            past_medical_history: patient.medical_history || "",
            past_family_history: patient.family_medical_history || "",
            alerts_and_allergies: patient.alerts_and_allergies_history || ""
          });
        }, [patient]);

  const storageKey = patient ? `amputee_progress_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setValues(JSON.parse(saved).values || {});
  }, [storageKey]);
   useEffect(() => {
          if (!storageKey) return;
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            try {
              setValues(JSON.parse(saved).values || {});
            } catch {}
          }
        }, [storageKey]);

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      session_date: v.session_date || new Date().toISOString().split("T")[0],
    }));
  }, [patient]);
  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Submitted:", values);
    alert("Assessment submitted");
  };

  const tabOrder = ["subjective", "objective", "assessment", "plan"];
  const activeTabIdx = tabOrder.indexOf(activeTab);

  const onChange = (name, value) => setValues(v => ({ ...v, [name]: value }));

  // const handleAction = (type) => {
  //   if (type === "clear") setValues({});
  //   if (type === "save") {
  //     if (storageKey) localStorage.setItem(storageKey, JSON.stringify({ values, updatedAt: new Date() }));
  //     alert("Progress & Intervention saved.");
  //   }
  // };
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
      alert("Spinal draft saved");
    }
  };
function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
  if (!patient) return null;

  const safe = (v) => v ?? "-";
  const formatDate = (d) => d ? new Date(d).toLocaleDateString() : "-";

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        fontSize: 14
      }}>
        <div><b>Name:</b> {safe(patient.name)}</div>
        <div><b>IC:</b> {safe(patient.id)}</div>
        <div><b>DOB:</b> {formatDate(patient.dob)}</div>

        <div><b>Age / Gender:</b> {safe(patient.age)} / {safe(patient.sex)}</div>
        <div><b>ICD:</b> {safe(patient.icd)}</div>
        <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>

        <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
        <div><b>Duration of Diagnosis:</b> -</div>
        <div><b>Primary Diagnosis:</b> {safe(patient.diagnosis_history)}</div>

        <div><b>Secondary Diagnosis:</b> {safe(patient.medical_history)}</div>
        <div><b>Dominant Side:</b> {safe(patient.dominant_side)}</div>
        <div><b>Language Preference:</b> {safe(patient.language_preference)}</div>

        <div><b>Education Level:</b> {safe(patient.education_background)}</div>
        <div><b>Occupation:</b> {safe(patient.occupation)}</div>
        <div><b>Work Status:</b> {safe(patient.employment_status)}</div>

        <div><b>Driving Status:</b> {safe(patient.driving_status)}</div>
        <div><b>PP/OB:</b> {safe(patient.pp_ob)}</div>
        <div><b>Weight:</b> {patient.weight ? `${patient.weight} kg` : "-"}</div>

        {/* ===== HISTORY ===== */}
        <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
        
           <h3>Patient History</h3>
        
                  <div>
                    <b>Past Medical History</b>
                    <input
                      style={input}
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
                    <input
                      style={input}
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
                    <input
                      style={input}
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
  return (
    <div>
      {/* Patient Information */}
         <CommonFormBuilder
                schema={{ title: "Patient Information", sections: [] }}
                values={{}}
                onChange={() => {}}
              >
                <PatientInformationBlock
                  patient={patient}
                  patientHistory={patientHistory}
                  setPatientHistory={setPatientHistory}
                />
              
                <button style={doctorsReportBtn}>
                  Doctors Reports
                </button>
              </CommonFormBuilder>
      

      {/* SOAP-style Tabs */}
      <div style={tabBar}>
        {SOAP_TABS.map(tab => (
          <div
            key={tab.key}
            style={activeTab === tab.key ? tabActive : tabBtn}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>
     
      {/* Tab Content */}
      <CommonFormBuilder
        schema={SCHEMA_MAP[activeTab]}
        values={values}
        onChange={onChange}
        onAction={handleAction}
      />
       <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button style={submitBtn} onClick={() => setActiveTab(tabOrder[activeTabIdx + 1])}>
              Next
            </button>
          ) : (
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Assessment
            </button>
          )}
        </div>

    </div>
  );
}

/* ── Styles ── */
const tabBar    = { display: "flex", gap: 12, justifyContent: "center", borderBottom: "1px solid #ddd", marginBottom: 12 };
const tabBtn    = { padding: "10px 22px", fontWeight: 600, cursor: "pointer", color: "#0f172a" };
const tabActive = { ...tabBtn, borderBottom: "3px solid #2451b3", color: "#2451b3" };
const backBtn   = { marginTop: 10, padding: "8px 18px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", color: "#374151", fontWeight: 600, cursor: "pointer" };
const input = {
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
const doctorsReportBtn = {
  padding: "10px 20px", background: "#2563EB", color: "#fff",
  border: "none", borderRadius: 6, fontSize: 14,
  fontWeight: 600, cursor: "pointer", marginTop: 8
};
const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 16
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer"
};

