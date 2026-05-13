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
  title: "Intervention",
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [
    {
      fields: [

        /* =========================
           Therapeutic Interventions Main Selection
        ========================= */

        {
          type: "subheading",
          label: "Therapeutic Interventions"
        },

        

        /* =========================
           1. Therapeutic Exercises
        ========================= */

        {
          type: "subheading",
          label: "Therapeutic Exercises",
          
        },

        {
          name: "therapeutic_exercises",
        
          type: "checkbox-group",
     
          options: [
            { label: "ROM exercise", value: "rom_exercise" },
            { label: "Strengthening exercise", value: "strengthening_exercise" },
            { label: "Gait training", value: "gait_training" },
            { label: "Weight-bearing exercise", value: "weight_bearing_exercise" },
            { label: "Balance training", value: "balance_training" },
            { label: "Mat Activity", value: "mat_activity" },
            { label: "Postural control training", value: "postural_control_training" },
            { label: "Coordination", value: "coordination" },
            { label: "Mirror Therapy", value: "mirror_therapy" }
          ]
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

        { type: "row", showIf: { field: "therapeutic_exercises", includes: "rom_exercise" }, fields: [
          { name: "rom_exercise_remarks", label: "ROM Exercise Remarks", type: "input" },
        ]},

        {
          name: "strengthening_exercise_type",
          label: "Strengthening Exercise Type",
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

        { type: "row", showIf: { field: "therapeutic_exercises", includes: "strengthening_exercise" }, fields: [
          { name: "strengthening_exercise_remarks", label: "Strengthening Exercise Remarks", type: "input" },
        ]},

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

        { type: "row", showIf: { field: "therapeutic_exercises", includes: "gait_training" }, fields: [
          { name: "gait_training_remarks", label: "Gait Training Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "therapeutic_exercises", includes: "weight_bearing_exercise" }, fields: [
          { name: "weight_bearing_remarks", label: "Weight-Bearing Exercise Remarks", type: "input" },
        ]},

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

        { type: "row", showIf: { field: "therapeutic_exercises", includes: "balance_training" }, fields: [
          { name: "balance_training_remarks", label: "Balance Training Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "therapeutic_exercises", includes: "mat_activity" }, fields: [
          { name: "mat_activity_remarks", label: "Mat Activity Remarks", type: "input" },
        ]},

        
        { type: "row", showIf: { field: "therapeutic_exercises", includes: "postural_control_training" }, fields: [
          { name: "postural_control_training_remarks", label: "Postural Control Training Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "therapeutic_exercises", includes: "coordination" }, fields: [
          { name: "coordination_remarks", label: "Coordination Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "therapeutic_exercises", includes: "mirror_therapy" }, fields: [
          { name: "mirror_therapy_remarks", label: "Mirror Therapy Remarks", type: "input" },
        ]},

        /* =========================
           2. Functional Mobility Training
        ========================= */

        {
          type: "subheading",
          label: "Functional Mobility Training",
         
        },

        {
          name: "functional_mobility_training",
          
          type: "checkbox-group",
         
          options: [
            { label: "Bed Mobility training", value: "bed_mobility_training" },
            { label: "Transfer training", value: "transfer_training" },
            { label: "Standing to floor training", value: "standing_to_floor_training" },
            { label: "Floor to standing training", value: "floor_to_standing_training" },
            { label: "Wheelchair Training", value: "wheelchair_training" },
            { label: "Walking Aids Training", value: "walking_aids_training" },
            { label: "PPAM Aid", value: "ppam_aid" },
            { label: "Donning/doffing training", value: "donning_doffing_training" }
          ]
        },

        { type: "row", showIf: { field: "functional_mobility_training", includes: "bed_mobility_training" }, fields: [
          { name: "bed_mobility_training_remarks", label: "Bed Mobility Training Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "functional_mobility_training", includes: "transfer_training" }, fields: [
          { name: "transfer_training_remarks", label: "Transfer Training Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "functional_mobility_training", includes: "standing_to_floor_training" }, fields: [
          { name: "standing_to_floor_training_remarks", label: "Standing to Floor Training Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "functional_mobility_training", includes: "floor_to_standing_training" }, fields: [
          { name: "floor_to_standing_training_remarks", label: "Floor to Standing Training Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "functional_mobility_training", includes: "wheelchair_training" }, fields: [
          { name: "wheelchair_training_remarks", label: "Wheelchair Training Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "functional_mobility_training", includes: "walking_aids_training" }, fields: [
          { name: "walking_aids_training_remarks", label: "Walking Aids Training Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "functional_mobility_training", includes: "ppam_aid" }, fields: [
          { name: "ppam_aid_remarks", label: "PPAM Aid Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "functional_mobility_training", includes: "donning_doffing_training" }, fields: [
          { name: "donning_doffing_training_remarks", label: "Donning/Doffing Training Remarks", type: "input" },
        ]},

        /* =========================
           3. Manual Therapy
        ========================= */

        {
          type: "subheading",
          label: "Manual Therapy",
          
        },

        {
          name: "manual_therapy",
          
          type: "checkbox-group",
          
          options: [
            { label: "Stretching", value: "stretching" },
            {
              label: "Soft tissue manipulation",
              value: "soft_tissue_manipulation"
            },
            { label: "Others", value: "others" }
          ]
        },

        {
          name: "stretching_type",
          label: "Stretching Type",
          type: "radio",
          options: [
            { label: "Passive", value: "passive" },
            { label: "Active", value: "active" }
          ],
          showIf: {
            field: "manual_therapy",
            includes: "stretching"
          }
        },

        { type: "row", showIf: { field: "manual_therapy", includes: "stretching" }, fields: [
          { name: "stretching_remarks", label: "Stretching Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "manual_therapy", includes: "soft_tissue_manipulation" }, fields: [
          { name: "soft_tissue_manipulation_remarks", label: "Soft Tissue Manipulation Remarks", type: "input" },
        ]},

        { type: "row", showIf: { field: "manual_therapy", includes: "others" }, fields: [
          { name: "manual_therapy_others", label: "Others", type: "input" },
        ]},
        {
  type: "subheading",
  label: "Functional Exercises (Exercise Modalities)"
},

{
  name: "functional_exercises",
  // label: "Exercise Modalities",
  type: "checkbox-group",
  options: [
    { label: "AXELERO Gait and Balance", value: "axelero_gait_balance" },
    { label: "Akuis Sintesi Pro", value: "akuis_sintesi_pro" },
    { label: "Balance System SD", value: "balance_system_sd" },
    { label: "DBC Machine", value: "dbc_machine" },
    { label: "Treadmill", value: "treadmill" },
    { label: "Biodex Isokinetic", value: "biodex_isokinetic" },
    { label: "Multipurpose Gym", value: "multipurpose_gym" },
    { label: "Power Plate", value: "power_plate" },
    { label: "Quadriceps Bench", value: "quadriceps_bench" },
    { label: "FIBOD Balance Training", value: "fibod_balance_training" },
    { label: "Static Bicycle", value: "static_bicycle" },
    { label: "Leg Press", value: "leg_press" },
    { label: "Recumbent Bike (Nordiac Track)", value: "recumbent_bike" },
    { label: "Recumbent Stepper (SciFit)", value: "recumbent_stepper" },
    { label: "Rowing", value: "rowing" },
    { label: "Elliptical trainer (SciFit)", value: "elliptical_trainer" },
    { label: "HUR", value: "hur" },
    { label: "Huber", value: "huber" },
    { label: "D-Wall", value: "d_wall" },
    { label: "Others", value: "others" }
  ]
},
/* =========================
   AXELERO Gait and Balance
========================= */

{
  type: "subheading",
  label: "AXELERO Gait and Balance",
  showIf: {
    field: "functional_exercises",
    includes: "axelero_gait_balance"
  }
},

{
  name: "axelero_mode",
  label: "Mode of Training",
  type: "radio",
  options: [
    { label: "Duration", value: "duration" },
    { label: "Distance", value: "distance" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "axelero_gait_balance"
  }
},

{
  type: "row",
  showIf: {
    field: "axelero_mode",
    equals: "duration"
  },
  fields: [
    {
      name: "axelero_duration_time",
      label: "Time",
      type: "input"
    },
    {
      name: "axelero_duration_speed",
      label: "Speed",
      type: "input"
    }
  ]
},
{
  type: "row",
  showIf: {
    field: "axelero_mode",
    equals: "distance"
  },
  fields: [
    {
      name: "axelero_distance",
      label: "Distance",
      type: "input"
    },
    {
      name: "axelero_distance_speed",
      label: "Speed",
      type: "input"
    }
  ]
},
{
  type: "subheading",
  label: "Akuis Sintesi Pro",
  showIf: {
    field: "functional_exercises",
    includes: "akuis_sintesi_pro"
  }
},

{
  name: "akuis_training_types",
  label: "Types of Exercise",
  type: "checkbox-group",
  showIf: {
    field: "functional_exercises",
    includes: "akuis_sintesi_pro"
  },
  options: [
    { label: "Constant Training", value: "constant_training" },
    { label: "Eccentric Training", value: "eccentric_training" },
    { label: "Auxotonic Training", value: "auxotonic_training" },
    { label: "Viscous Training", value: "viscous_training" },
    { label: "Vibration Training", value: "vibration_training" },
    { label: "Precision Training", value: "precision_training" },
    { label: "Magnetic Training", value: "magnetic_training" },
    { label: "Isometric Training", value: "isometric_training" },
    { label: "Isokinetic Training", value: "isokinetic_training" },
    { label: "Random Training", value: "random_training" }
  ]
},


{
  type: "subheading",
  label: "Constant Training",
  showIf: {
    field: "akuis_training_types",
    includes: "constant_training"
  }
},
{
  type: "row",
  showIf: {
    field: "akuis_training_types",
    includes: "constant_training"
  },
  fields: [
    {
      name: "akuis_weight",
      label: "Weight (kg)",
      type: "input"
    },
    {
      name: "akuis_angle",
      label: "Constant Angle / Fixed Position (degree)",
      type: "input"
    }
  ]
},

//
// Eccentric Training
//
{
  type: "subheading",
  label: "Eccentric Training",
  showIf: {
    field: "akuis_training_types",
    includes: "eccentric_training"
  }
},
{
  type: "row",
  showIf: {
    field: "akuis_training_types",
    includes: "eccentric_training"
  },
  fields: [
    {
      name: "akuis_eccentric_weight",
      label: "Weight (kg)",
      type: "input"
    },
    {
      name: "akuis_eccentric_angle",
      label: "Constant Angle / Fixed Position (degree)",
      type: "input"
    }
  ]
},

//
// Auxotonic Training
//
{
  type: "subheading",
  label: "Auxotonic Training",
  showIf: {
    field: "akuis_training_types",
    includes: "auxotonic_training"
  }
},
{
  type: "row",
  showIf: {
    field: "akuis_training_types",
    includes: "auxotonic_training"
  },
  fields: [
    {
      name: "akuis_auxotonic_stiffness",
      label: "Stiffness Level",
      type: "input"
    },
    {
      name: "akuis_auxotonic_min_load",
      label: "Min Load (kg)",
      type: "input"
    },
    {
      name: "akuis_auxotonic_angle",
      label: "Constant Angle / Fixed Position (degree)",
      type: "input"
    }
  ]
},

//
// Viscous Training
//
{
  type: "subheading",
  label: "Viscous Training",
  showIf: {
    field: "akuis_training_types",
    includes: "viscous_training"
  }
},
{
  type: "row",
  showIf: {
    field: "akuis_training_types",
    includes: "viscous_training"
  },
  fields: [
    {
      name: "akuis_viscous_viscosity",
      label: "Viscosity Level",
      type: "input"
    },
    {
      name: "akuis_viscous_min_load",
      label: "Min Load (kg)",
      type: "input"
    },
    {
      name: "akuis_viscous_return_load",
      label: "Return Load (kg)",
      type: "input"
    },
    {
      name: "akuis_viscous_space_transition",
      label: "Space Transition (cm)",
      type: "input"
    },
    {
      name: "akuis_viscous_angle",
      label: "Constant Angle / Fixed Position (degree)",
      type: "input"
    }
  ]
},

//
// Vibration Training
//
{
  type: "subheading",
  label: "Vibration Training",
  showIf: {
    field: "akuis_training_types",
    includes: "vibration_training"
  }
},
{
  type: "row",
  showIf: {
    field: "akuis_training_types",
    includes: "vibration_training"
  },
  fields: [
    {
      name: "akuis_vibration_base_load",
      label: "Base Load (kg)",
      type: "input"
    },
    {
      name: "akuis_vibration_amplitude",
      label: "Amplitude (kg)",
      type: "input"
    },
    {
      name: "akuis_vibration_frequency",
      label: "Frequency (Hz)",
      type: "input"
    },
    {
      name: "akuis_vibration_angle",
      label: "Constant Angle / Fixed Position (degree)",
      type: "input"
    }
  ]
},

//
// Precision Training
//
{
  type: "subheading",
  label: "Precision Training",
  showIf: {
    field: "akuis_training_types",
    includes: "precision_training"
  }
},
{
  type: "row",
  showIf: {
    field: "akuis_training_types",
    includes: "precision_training"
  },
  fields: [
    {
      name: "akuis_precision_load",
      label: "Load (kg)",
      type: "input"
    },
    {
      name: "akuis_precision_angle",
      label: "Constant Angle / Fixed Position (degree)",
      type: "input"
    }
  ]
},

//
// Magnetic Training
//
{
  type: "subheading",
  label: "Magnetic Training",
  showIf: {
    field: "akuis_training_types",
    includes: "magnetic_training"
  }
},
{
  type: "row",
  showIf: {
    field: "akuis_training_types",
    includes: "magnetic_training"
  },
  fields: [
    {
      name: "akuis_magnetic_stiffness",
      label: "Stiffness Level",
      type: "input"
    },
    {
      name: "akuis_magnetic_max_load",
      label: "Max Load (kg)",
      type: "input"
    },
    {
      name: "akuis_magnetic_min_load",
      label: "Min Load (kg)",
      type: "input"
    },
    {
      name: "akuis_magnetic_angle",
      label: "Constant Angle / Fixed Position (degree)",
      type: "input"
    }
  ]
},

//
// Isometric Training
//
{
  type: "subheading",
  label: "Isometric Training",
  showIf: {
    field: "akuis_training_types",
    includes: "isometric_training"
  }
},
{
  type: "row",
  showIf: {
    field: "akuis_training_types",
    includes: "isometric_training"
  },
  fields: [
    {
      name: "akuis_isometric_position",
      label: "Position (cm)",
      type: "input"
    },
    {
      name: "akuis_isometric_angle",
      label: "Constant Angle / Fixed Position (degree)",
      type: "input"
    }
  ]
},

//
// Isokinetic Training
//
{
  type: "subheading",
  label: "Isokinetic Training",
  showIf: {
    field: "akuis_training_types",
    includes: "isokinetic_training"
  }
},
{
  type: "row",
  showIf: {
    field: "akuis_training_types",
    includes: "isokinetic_training"
  },
  fields: [
    {
      name: "akuis_isokinetic_speed",
      label: "Speed (mm/s)",
      type: "input"
    },
    {
      name: "akuis_isokinetic_return_load",
      label: "Return Load (kg)",
      type: "input"
    },
    {
      name: "akuis_isokinetic_start_position",
      label: "Start Position (cm)",
      type: "input"
    },
    {
      name: "akuis_isokinetic_stop_position",
      label: "Stop Position (cm)",
      type: "input"
    },
    {
      name: "akuis_isokinetic_angle",
      label: "Constant Angle / Fixed Position (degree)",
      type: "input"
    }
  ]
},

//
// Random Training
//
{
  type: "subheading",
  label: "Random Training",
  showIf: {
    field: "akuis_training_types",
    includes: "random_training"
  }
},
{
  type: "row",
  showIf: {
    field: "akuis_training_types",
    includes: "random_training"
  },
  fields: [
    {
      name: "akuis_random_base_load",
      label: "Base Load (kg)",
      type: "input"
    },
    {
      name: "akuis_random_lambda",
      label: "Lambda Level",
      type: "input"
    },
    {
      name: "akuis_random_amplitude",
      label: "Amplitude (kg)",
      type: "input"
    },
    {
      name: "akuis_random_angle",
      label: "Constant Angle / Fixed Position (degree)",
      type: "input"
    }
  ]
},
// Balance System SD

{
  name: "balance_system_sd_mode",
  label: "Mode of Training",
  type: "radio",
  showIf: {
    field: "functional_exercises",
    includes: "balance_system_sd"
  },
  options: [
    { label: "Training", value: "training" },
    { label: "Testing", value: "testing" }
  ]
},

// =========================
// IF TRAINING
// =========================

// Postural Stability
{
  type: "subheading",
  label: "Postural Stability",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},
{
  name: "bsd_postural_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Static", value: "static" },
    { label: "Dynamic", value: "dynamic" }
  ],
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},

{
  type: "row",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  },
  fields: [
    {
      name: "bsd_postural_level",
      label: "Level (1-12)",
      type: "input"
    },
    {
      name: "bsd_postural_phase_target",
      label: "Phase Target",
      type: "input"
    },
    {
      name: "bsd_postural_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},

// Weight Shift
{
  type: "subheading",
  label: "Weight Shift",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},
{
  name: "bsd_weight_shift_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Static", value: "static" },
    { label: "Dynamic", value: "dynamic" }
  ],
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},

{
  type: "row",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  },
  fields: [
    {
      name: "bsd_weight_shift_level",
      label: "Level (1-12)",
      type: "input"
    },
    {
      name: "bsd_weight_shift_rotate_target",
      label: "Rotate Target / Skill Level",
      type: "input"
    },
    {
      name: "bsd_weight_shift_weight_bearing",
      label: "% Weight Bearing",
      type: "input"
    },
    {
      name: "bsd_weight_shift_duration_score",
      label: "Duration / Score",
      type: "input"
    }
  ]
},

// Limit of Stability
{
  type: "subheading",
  label: "Limit of Stability",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},
{ type: "row", showIf: { field: "balance_system_sd_mode", equals: "training" }, fields: [
  { name: "bsd_limit_skill_level", label: "Skill Level", type: "input" },
]},
{
  name: "bsd_limit_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Static", value: "static" },
    { label: "Dynamic", value: "dynamic" }
  ],
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},

{
  type: "row",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  },
  fields: [
    {
      name: "bsd_limit_level",
      label: "Level (1-12)",
      type: "input"
    },
    {
      name: "bsd_limit_time_score",
      label: "Time Score",
      type: "input"
    }
  ]
},
// Maze Control
{
  type: "subheading",
  label: "Maze Control",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},
{ type: "row", showIf: { field: "balance_system_sd_mode", equals: "training" }, fields: [
  { name: "bsd_maze_skill_level", label: "Skill Level", type: "input" },
]},
{
  name: "bsd_maze_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Static", value: "static" },
    { label: "Dynamic", value: "dynamic" }
  ],
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},
{ type: "row", showIf: { field: "balance_system_sd_mode", equals: "training" }, fields: [
  { name: "bsd_maze_time_score", label: "Time Score", type: "input" },
]},

// Random Control Training
{
  type: "subheading",
  label: "Random Control Training",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},
{ type: "row", showIf: { field: "balance_system_sd_mode", equals: "training" }, fields: [
  { name: "bsd_random_circle_speed", label: "Circle Speed / Skill Level", type: "input" },
]},
{
  name: "bsd_random_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Static", value: "static" },
    { label: "Dynamic", value: "dynamic" }
  ],
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},

{
  type: "row",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  },
  fields: [
    {
      name: "bsd_random_level",
      label: "Level (1-12)",
      type: "input"
    },
    {
      name: "bsd_random_time_score",
      label: "Time Score",
      type: "input"
    }
  ]
},

// Others
{ type: "row", showIf: { field: "balance_system_sd_mode", equals: "training" }, fields: [
  { name: "bsd_others", label: "Others", type: "input" },
]},
{
  type: "subheading",
  label: "DBC Machine",
  showIf: {
    field: "functional_exercises",
    includes: "dbc_machine"
  }
},

{
  name: "dbc_exercise_types",
  label: "Types of Exercise",
  type: "checkbox-group",
  showIf: {
    field: "functional_exercises",
    includes: "dbc_machine"
  },
  options: [
    { label: "Lumbar flexion", value: "lumbar_flexion" },
    { label: "Lumbar extension", value: "lumbar_extension" },
    { label: "Lumbar lateral flexion", value: "lumbar_lateral_flexion" },
    { label: "Trunk rotation", value: "trunk_rotation" },
    { label: "Cervical flexion/extension", value: "cervical_flexion_extension" },
    { label: "Cervical rotation", value: "cervical_rotation" },
    { label: "Isometric trunk stabilization", value: "isometric_trunk_stabilization" },
    { label: "Progressive resistance spine training", value: "progressive_resistance_spine_training" }
  ]
},

{
  type: "subheading",
  label: "Treadmill",
  showIf: {
    field: "functional_exercises",
    includes: "treadmill"
  }
},


{
  type: "row",
  fields: [
    {
      name: "treadmill_exercise_type",
      label: "Types of Exercise",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "treadmill"
      }
    },
    {
      name: "treadmill_time",
      label: "Time",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "treadmill"
      }
    },
    
  ]
},
{
  type: "row",
  showIf: { field: "functional_exercises", includes: "biodex_isokinetic" },
  fields: [
    { name: "biodex_remarks", label: "Biodex Isokinetic Remarks", type: "input" },
  ]
},
{
  type: "subheading",
  label: "Multipurpose Gym",
  showIf: {
    field: "functional_exercises",
    includes: "multipurpose_gym"
  }
},

{
  name: "gym_exercise_types",
  label: "Types of Exercise",
  type: "checkbox-group",
  showIf: {
    field: "functional_exercises",
    includes: "multipurpose_gym"
  },
  options: [
    { label: "Lat pulldown", value: "lat_pulldown" },
    { label: "Seated row", value: "seated_row" },
    { label: "Chest press", value: "chest_press" },
    { label: "Cable crossover", value: "cable_crossover" },
    { label: "Triceps pushdown", value: "triceps_pushdown" },
    { label: "Biceps curl", value: "biceps_curl" },
    { label: "Functional cable training", value: "functional_cable_training" },
    { label: "Core rotations", value: "core_rotations" },
    { label: "Assisted pull-ups", value: "assisted_pull_ups" },
    { label: "Functional movement patterns", value: "functional_movement_patterns" }
  ]
},
{
  type: "subheading",
  label: "Multipurpose Gym  - Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "multipurpose_gym"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "multipurpose_gym"
  },
  fields: [
    {
      name: "gym_weight",
      label: "Weight",
      type: "input"
    },
    {
      name: "gym_reps",
      label: "Reps",
      type: "input"
    },
    {
      name: "gym_sets",
      label: "Sets",
      type: "input"
    },
    {
      name: "gym_hold",
      label: "Hold",
      type: "input"
    },
    {
      name: "gym_rest",
      label: "Rest",
      type: "input"
    },
    {
      name: "gym_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},

{
  type: "row",
  showIf: { field: "functional_exercises", includes: "others" },
  fields: [
    { name: "functional_exercises_others", label: "Others", type: "input" },
  ]
},

{
  type: "subheading",
  label: "DBC Machine - Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "dbc_machine"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "dbc_machine"
  },
  fields: [
    {
      name: "dbc_weight",
      label: "Weight",
      type: "input"
    },
    {
      name: "dbc_reps",
      label: "Reps",
      type: "input"
    },
    {
      name: "dbc_sets",
      label: "Sets",
      type: "input"
    },
    {
      name: "dbc_hold",
      label: "Hold",
      type: "input"
    },
    {
      name: "dbc_rest",
      label: "Rest",
      type: "input"
    },
    {
      name: "dbc_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},
// =========================
// Power Plate
// =========================

{
  name: "power_plate_mode",
  label: "Mode of Exercise",
  type: "radio",
  showIf: {
    field: "functional_exercises",
    includes: "power_plate"
  },
  options: [
    { label: "Manual Mode", value: "manual_mode" },
    { label: "Single Movements", value: "single_movements" },
    { label: "Physical Rehab", value: "physical_rehab" },
    { label: "Complete Program", value: "complete_program" }
  ]
},

// =========================
// 1. Manual Mode
// =========================

{
  type: "subheading",
  label: "Manual Mode",
  showIf: {
    field: "power_plate_mode",
    equals: "manual_mode"
  }
},

{ type: "row", showIf: { field: "power_plate_mode", equals: "manual_mode" }, fields: [
  { name: "pp_manual_time", label: "Time", type: "input" },
  { name: "pp_manual_vibration_level", label: "Vibration Level", type: "input" },
]},

{
  name: "pp_manual_cable_resistance",
  label: "Cable Resistance",
  type: "radio",
  options: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" }
  ],
  showIf: {
    field: "power_plate_mode",
    equals: "manual_mode"
  }
},

// =========================
// 2. Single Movements
// =========================

{
  type: "subheading",
  label: "Single Movements",
  showIf: {
    field: "power_plate_mode",
    equals: "single_movements"
  }
},

{
  name: "pp_single_movement_types",
  label: "Movement Type",
  type: "checkbox-group",
  options: [
    { label: "Stretch", value: "stretch" },
    { label: "Balance", value: "balance" },
    { label: "Core", value: "core" },
    { label: "Strength", value: "strength" },
    { label: "Massage", value: "massage" }
  ],
  showIf: {
    field: "power_plate_mode",
    equals: "single_movements"
  }
},


{
  type: "row",
  showIf: {
    field: "power_plate_mode",
    equals: "single_movements"
  },
  fields: [
    {
      name: "pp_single_type_exercise",
      label: "Type Exercise",
      type: "input"
    },
    {
      name: "pp_single_time",
      label: "Time",
      type: "input"
    },
    {
      name: "pp_single_vibration_level",
      label: "Vibration Level",
      type: "input"
    }
  ]
},
// =========================
// 3. Physical Rehab
// =========================

{
  type: "subheading",
  label: "Physical Rehab",
  showIf: {
    field: "power_plate_mode",
    equals: "physical_rehab"
  }
},

{
  name: "pp_physical_rehab_areas",
  label: "Rehab Area",
  type: "checkbox-group",
  options: [
    { label: "Shoulder", value: "shoulder" },
    { label: "Elbow Wrist", value: "elbow_wrist" },
    { label: "Hip", value: "hip" },
    { label: "Knee", value: "knee" },
    { label: "Cervical Spine", value: "cervical_spine" },
    { label: "Thoracic Spine", value: "thoracic_spine" },
    { label: "Lumbar Spine", value: "lumbar_spine" },
    { label: "Ankle", value: "ankle" },
    { label: "Foot", value: "foot" }
  ],
  showIf: {
    field: "power_plate_mode",
    equals: "physical_rehab"
  }
},

{
  type: "row",
  showIf: {
    field: "power_plate_mode",
    equals: "physical_rehab"
  },
  fields: [
    {
      name: "pp_physical_vibration_level",
      label: "Vibration Level",
      type: "input"
    },
    {
      name: "pp_physical_time",
      label: "Time",
      type: "input"
    }
  ]
},


// =========================
// 4. Complete Program
// =========================

{
  type: "subheading",
  label: "Complete Program",
  showIf: {
    field: "power_plate_mode",
    equals: "complete_program"
  }
},

// Neuro Health

{
  name: "pp_neuro_health_program",
  label: "Neuro Health Program",
  type: "checkbox-group",
  options: [
    { label: "Fall Prevention", value: "fall_prevention" },
    { label: "Neurodegen", value: "neurodegen" },
    { label: "SCI", value: "sci" },
    { label: "Biodensity (Pre-Post)", value: "biodensity_pre_post" }
  ],
  showIf: {
    field: "power_plate_mode",
    equals: "complete_program"
  }
},

{
  type: "row",
  showIf: {
    field: "power_plate_mode",
    equals: "complete_program"
  },
  fields: [
    {
      name: "pp_neuro_health_vibration",
      label: "Neuro Health - Vibration Level",
      type: "input"
    },
    {
      name: "pp_neuro_health_time",
      label: "Neuro Health - Time",
      type: "input"
    }
  ]
},

// Pain Relief

{
  name: "pp_pain_relief_program",
  label: "Pain Relief Program",
  type: "checkbox-group",
  options: [
    { label: "LBP", value: "lbp" },
    { label: "Neck or Upper Back", value: "neck_upper_back" },
    { label: "Legs", value: "legs" },
    { label: "Arms", value: "arms" }
  ],
  showIf: {
    field: "power_plate_mode",
    equals: "complete_program"
  }
},

{
  type: "row",
  showIf: {
    field: "power_plate_mode",
    equals: "complete_program"
  },
  fields: [
    {
      name: "pp_pain_relief_vibration",
      label: "Pain Relief - Vibration Level",
      type: "input"
    },
    {
      name: "pp_pain_relief_time",
      label: "Pain Relief - Time",
      type: "input"
    }
  ]
},

// Common Condition

{
  name: "pp_common_condition_program",
  label: "Common Condition Program",
  type: "checkbox-group",
  options: [
    { label: "Flexibility", value: "flexibility" },
    { label: "Neuropathy", value: "neuropathy" },
    { label: "Circulation", value: "circulation" },
    { label: "Aid Therapy", value: "aid_therapy" },
    { label: "Strong Bones", value: "strong_bones" }
  ],
  showIf: {
    field: "power_plate_mode",
    equals: "complete_program"
  }
},

{
  type: "row",
  showIf: {
    field: "power_plate_mode",
    equals: "complete_program"
  },
  fields: [
    {
      name: "pp_common_condition_vibration",
      label: "Common Condition - Vibration Level",
      type: "input"
    },
    {
      name: "pp_common_condition_time",
      label: "Common Condition - Time",
      type: "input"
    }
  ]
},
{
  type: "subheading",
  label: "Quadriceps Bench",
  showIf: {
    field: "functional_exercises",
    includes: "quadriceps_bench"
  }
},

{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "quadriceps_bench"
  },
  fields: [
    {
      name: "quadriceps_bench_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "quadriceps_bench_sets",
      label: "Sets",
      type: "input"
    },
    {
      name: "quadriceps_bench_reps",
      label: "Reps",
      type: "input"
    }
  ]
},

{
  type: "subheading",
  label: "FIBOD Balance Training",
  showIf: {
    field: "functional_exercises",
    includes: "fibod_balance_training"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "fibod_balance_training"
  },
  fields: [
    {
      name: "fibod_balance_training_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "fibod_balance_training_time",
      label: "Time",
      type: "input"
    },
    {
      name: "fibod_balance_training_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks..."
    }
  ]
},


{
  type: "subheading",
  label: "Static Bicycle",
  showIf: {
    field: "functional_exercises",
    includes: "static_bicycle"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "static_bicycle"
  },
  fields: [
    {
      name: "static_bicycle_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "static_bicycle_time",
      label: "Time",
      type: "input"
    },
    {
      name: "static_bicycle_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks..."
    }
  ]
},


/* =========================
   Leg Press
========================= */

{
  type: "subheading",
  label: "Leg Press",
  showIf: {
    field: "functional_exercises",
    includes: "leg_press"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "leg_press"
  },
  fields: [
    {
      name: "leg_press_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "leg_press_sets",
      label: "Sets",
      type: "input"
    },
    {
      name: "leg_press_reps",
      label: "Reps",
      type: "input"
    },
    {
      name: "leg_press_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks..."
    }
  ]
},


{
  type: "subheading",
  label: "Recumbent Bike (Nordiac Track)",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_bike"
  }
},

{
  name: "recumbent_bike_exercise_types",
  label: "Types of Exercise",
  type: "checkbox-group",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_bike"
  },
  options: [
    {
      label: "Low-impact cycling",
      value: "low_impact_cycling"
    },
    {
      label: "Interval training",
      value: "interval_training"
    },
    {
      label: "Resistance progression",
      value: "resistance_progression"
    },
    {
      label: "Cardiovascular endurance",
      value: "cardiovascular_endurance"
    }
  ]
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_bike"
  },
  fields: [
    {
      name: "recumbent_bike_duration",
      label: "Duration (Min)",
      type: "input"
    },
    {
      name: "recumbent_bike_distance",
      label: "Distance (KM)",
      type: "input"
    },
    {
      name: "recumbent_bike_resistance",
      label: "Resistance Level",
      type: "input"
    },
    {
      name: "recumbent_bike_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks..."
    }
  ]
},


{
  type: "subheading",
  label: "Recumbent Stepper (SciFit)",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_stepper"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_stepper"
  },
  fields: [
    {
      name: "recumbent_stepper_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "recumbent_stepper_time",
      label: "Time",
      type: "input"
    },
    {
      name: "recumbent_stepper_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks..."
    }
  ]
},



/* =========================
   Rowing
========================= */

{
  type: "subheading",
  label: "Rowing",
  showIf: {
    field: "functional_exercises",
    includes: "rowing"
  }
},


{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "rowing"
  },
  fields: [
    {
      name: "rowing_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "rowing_time",
      label: "Time",
      type: "input"
    }
  ]
},
/* =========================
   Elliptical Trainer (SciFit)
========================= */

{
  type: "subheading",
  label: "Elliptical Trainer (SciFit)",
  showIf: {
    field: "functional_exercises",
    includes: "elliptical_trainer"
  }
},
{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "elliptical_trainer"
  },
  fields: [
    {
      name: "elliptical_trainer_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "elliptical_trainer_time",
      label: "Time",
      type: "input"
    },
    {
      name: "elliptical_trainer_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks..."
    }
  ]
},


/* =========================
   HUR
========================= */

{
  type: "subheading",
  label: "HUR",
  showIf: {
    field: "functional_exercises",
    includes: "hur"
  }
},



{
  type: "row",
  showIf: {
    field: "functional_exercises",
    includes: "hur"
  },
  fields: [
    {
      name: "hur_exercise_type",
      label: "Types of Exercise",
      type: "input"
    },
    {
      name: "hur_reps",
      label: "Reps",
      type: "input"
    }
  ]
},
/* =========================
   Huber
========================= */

{
  type: "subheading",
  label: "Huber",
  showIf: {
    field: "functional_exercises",
    includes: "huber"
  }
},

{ type: "row", showIf: { field: "functional_exercises", includes: "huber" }, fields: [
  { name: "huber_remarks", label: "Remarks", type: "input" },
]},
{
  type: "subheading",
  label: "D-Wall",
  showIf: {
    field: "functional_exercises",
    includes: "d_wall"
  }
},

/* =========================
   Training Library
========================= */


{
  name: "dwall_sections",
 
  type: "checkbox-group",
  showIf: {
    field: "functional_exercises",
    includes: "d_wall"
  },
  options: [
    { label: "Training Library", value: "training_library" },
    { label: "Exer Games", value: "exer_games" }
  ]
},

/* =========================
   Training Library
========================= */

{
  type: "subheading",
  label: "Training Library",
  showIf: {
    field: "dwall_sections",
    includes: "training_library"
  }
},

{
  name: "dwall_training_library",
  label: "Training Library",
  type: "checkbox-group",
  showIf: {
    field: "dwall_sections",
    includes: "training_library"
  },
  options: [
    { label: "Balance", value: "balance" },
    { label: "Strength", value: "strength" },
    { label: "Endurance", value: "endurance" },
    { label: "Mobility", value: "mobility" },
    { label: "Agility", value: "agility" }
  ]
},

{ type: "row", showIf: { field: "dwall_training_library", includes: "balance" }, fields: [
  { name: "dwall_balance", label: "Balance", type: "input" },
  { name: "dwall_strength", label: "Strength", type: "input", showIf: { field: "dwall_training_library", includes: "strength" } },
]},

{ type: "row", showIf: { field: "dwall_training_library", includes: "endurance" }, fields: [
  { name: "dwall_endurance", label: "Endurance", type: "input" },
  { name: "dwall_mobility", label: "Mobility", type: "input", showIf: { field: "dwall_training_library", includes: "mobility" } },
]},

{ type: "row", showIf: { field: "dwall_training_library", includes: "agility" }, fields: [
  { name: "dwall_agility", label: "Agility", type: "input" },
]},

{ type: "row", showIf: { field: "dwall_sections", includes: "training_library" }, fields: [
  { name: "dwall_repetitions", label: "Repetitions", type: "input" },
  { name: "dwall_series", label: "Series", type: "input" },
]},

{ type: "row", showIf: { field: "dwall_sections", includes: "training_library" }, fields: [
  { name: "dwall_time", label: "Time", type: "input" },
  { name: "dwall_loads", label: "Loads", type: "input" },
]},

{ type: "row", showIf: { field: "dwall_sections", includes: "training_library" }, fields: [
  { name: "dwall_final_score", label: "Final Score", type: "input" },
  { name: "dwall_training_remarks", label: "Remarks", type: "input" },
]},

/* =========================
   Exer Games
========================= */

{
  type: "subheading",
  label: "Exer Games",
  showIf: {
    field: "dwall_sections",
    includes: "exer_games"
  }
},

{
  name: "dwall_exer_games",
  label: "Exer Games",
  type: "checkbox-group",
  showIf: {
    field: "dwall_sections",
    includes: "exer_games"
  },
  options: [
    { label: "Equilibrium", value: "equilibrium" },
    { label: "Ski", value: "ski" },
    { label: "Fly", value: "fly" },
    { label: "Shooting Range", value: "shooting_range" },
    { label: "Fruit cutter", value: "fruit_cutter" },
    { label: "Shelf", value: "shelf" },
    { label: "Library", value: "library" },
    { label: "Move", value: "move" },
    { label: "Navigation", value: "navigation" },
    { label: "Upper limbs", value: "upper_limbs" },
    { label: "Freewalk", value: "freewalk" },
    { label: "Occupation Therapy", value: "occupation_therapy" }
  ]
},

{ type: "row", showIf: { field: "dwall_sections", includes: "exer_games" }, fields: [
  { name: "dwall_games_time", label: "Time", type: "input" },
  { name: "dwall_games_levels", label: "Levels", type: "input" },
]},

{ type: "row", showIf: { field: "dwall_sections", includes: "exer_games" }, fields: [
  { name: "dwall_games_final_score", label: "Final Score", type: "input" },
  { name: "dwall_games_remarks", label: "Remarks", type: "input" },
]},
           {
  type: "subheading",
  label: "Pain Management"
},
{
  name: "pain_management",
  // label: "Pain Management Modalities",
  type: "checkbox-group",
  options: [
    { label: "Cold Therapy", value: "cold_therapy" },
    { label: "Hot Therapy", value: "hot_therapy" },
    { label: "TENS", value: "tens" },
    { label: "Ultrasound", value: "ultrasound" },
    { label: "Laser Therapy", value: "laser_therapy" },
    { label: "Dry needling", value: "dry_needling" },
    { label: "Others", value: "others" }
  ]
},

{ type: "row", showIf: { field: "pain_management", includes: "cold_therapy" }, fields: [
  { name: "cold_therapy_remarks", label: "Cold Therapy Remarks", type: "input" },
]},
{ type: "row", showIf: { field: "pain_management", includes: "hot_therapy" }, fields: [
  { name: "hot_therapy_remarks", label: "Hot Therapy Remarks", type: "input" },
]},
{ type: "row", showIf: { field: "pain_management", includes: "tens" }, fields: [
  { name: "tens_remarks", label: "TENS Remarks", type: "input" },
]},
{ type: "row", showIf: { field: "pain_management", includes: "ultrasound" }, fields: [
  { name: "ultrasound_remarks", label: "Ultrasound Remarks", type: "input" },
]},
{ type: "row", showIf: { field: "pain_management", includes: "laser_therapy" }, fields: [
  { name: "laser_therapy_remarks", label: "Laser Therapy Remarks", type: "input" },
]},
{ type: "row", showIf: { field: "pain_management", includes: "dry_needling" }, fields: [
  { name: "dry_needling_remarks", label: "Dry Needling Remarks", type: "input" },
]},
{ type: "row", showIf: { field: "pain_management", includes: "others" }, fields: [
  { name: "pain_management_others", label: "Others", type: "input" },
]},

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
  name: "therapist_notes",
  label: "Therapist Notes",
  type: "checkbox-group",
  options: [
    { label: "Continue exercise", value: "continue_exercise" },
    { label: "Reduce pain", value: "reduce_pain" },
    { label: "Improve strength", value: "improve_strength" },
    { label: "Increase ROM", value: "increase_rom" },
    { label: "Improve endurance", value: "improve_endurance" },
    { label: "Improve balance", value: "improve_balance" },
    { label: "Progress gait", value: "progress_gait" },
    { label: "Correct posture", value: "correct_posture" },
    { label: "Improve bed mobility", value: "improve_bed_mobility" },
    { label: "Improve transferring technique", value: "improve_transferring_technique" },
    { label: "Improve donning/doffing technique", value: "improve_donning_doffing_technique" },
    { label: "Reduce edema and stump volume", value: "reduce_edema_stump_volume" },
    { label: "Carer Training and Education", value: "carer_training_education" },
    { label: "Monitor vital signs during exercise", value: "monitor_vital_signs" },
    { label: "Patient education", value: "patient_education" },
    { label: "Weight loss", value: "weight_loss" },
    { label: "Others", value: "others" }
  ]
},
{
  name: "therapist_notes_others",
  label: "Others",
  type: "input",
  showIf: {
    field: "therapist_notes",
    includes: "others"
  }
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
export default function AmputeeProgress({ patient, onBack }) {
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

  const onChange = (name, value) => setValues(v => ({ ...v, [name]: value }));
const handleSubmit = () => {
    setSubmitted(true);
    console.log("Submitted:", values);
    alert("Assessment submitted");
  };

  const tabOrder = ["subjective", "objective", "assessment", "plan"];
  const activeTabIdx = tabOrder.indexOf(activeTab);

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