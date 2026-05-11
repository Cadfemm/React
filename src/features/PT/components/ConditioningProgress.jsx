
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
    ],  sections: [{
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
    ],
  sections: [
    {
      title: "Therapeutic Interventions",
      fields: [


// =========================
// THERAPEUTIC EXERCISES
// =========================
{
  type: "subheading",
  label: "Therapeutic Exercises"
},

{
  name: "therapeutic_exercise_list",
  
  type: "checkbox-group",
  options: [
    { label: "ROM Exercise", value: "rom_exercise" },
    { label: "Strengthening Exercise", value: "strengthening_exercise" },
    { label: "Gait Training", value: "gait_training" },
    { label: "Weight-bearing Exercise", value: "weight_bearing_exercise" },
    { label: "Balance Training", value: "balance_training" },
    { label: "Mat Activity", value: "mat_activity" },
    { label: "Postural Control Training", value: "postural_control_training" },
    { label: "Coordination", value: "coordination" },
    { label: "Stretching", value: "stretching" },
    { label: "Endurance Training", value: "endurance_training" }
  ]
},

// =========================
// ROM EXERCISE
{
  name: "rom_exercise_type",
  label: "ROM Type",
  type: "radio",
  options: [
    { label: "Passive", value: "passive" },
    { label: "Active", value: "active" },
    { label: "Assisted", value: "assisted" }
  ],
  showIf: {
    field: "therapeutic_exercise_list",
    includes: "rom_exercise"
  }
},
{ type: "row", showIf: { field: "therapeutic_exercise_list", includes: "rom_exercise" }, fields: [
  { name: "rom_exercise_remarks", label: "Remark", type: "textarea" },
]},
// =========================

// =========================
// STRENGTHENING EXERCISE
// =========================
{ type: "row", showIf: { field: "therapeutic_exercise_list", includes: "strengthening_exercise" }, fields: [
  { name: "strengthening_exercise_remarks", label: "Strengthening Exercise Remarks", type: "textarea" },
]},

// =========================
// GAIT TRAINING
// =========================
{
  name: "gait_training_mode",
  label: "Gait Training Mode",
  type: "radio",
  options: [
    { label: "With BWS", value: "with_bws" },
    { label: "Without BWS", value: "without_bws" },
    { label: "Parallel Bar", value: "parallel_bar" }
  ],
  showIf: {
    field: "therapeutic_exercise_list",
    includes: "gait_training"
  }
},
{ type: "row", showIf: { field: "therapeutic_exercise_list", includes: "gait_training" }, fields: [
  { name: "gait_training_remarks", label: "Gait Training Remarks", type: "textarea" },
]},

// =========================
// WEIGHT-BEARING EXERCISE
// =========================
{ type: "row", showIf: { field: "therapeutic_exercise_list", includes: "weight_bearing_exercise" }, fields: [
  { name: "weight_bearing_exercise_remarks", label: "Weight-bearing Exercise Remarks", type: "textarea" },
]},

// =========================
// BALANCE TRAINING
// =========================
{
  name: "balance_training_type",
  label: "Balance Training Type",
  type: "radio",
  options: [
    { label: "Static", value: "static" },
    { label: "Dynamic", value: "dynamic" }
  ],
  showIf: {
    field: "therapeutic_exercise_list",
    includes: "balance_training"
  }
},
{ type: "row", showIf: { field: "therapeutic_exercise_list", includes: "balance_training" }, fields: [
  { name: "balance_training_remarks", label: "Balance Training Remarks", type: "textarea" },
]},

// =========================
// MAT ACTIVITY
// =========================
{ type: "row", showIf: { field: "therapeutic_exercise_list", includes: "mat_activity" }, fields: [
  { name: "mat_activity_remarks", label: "Mat Activity Remarks", type: "textarea" },
]},

// =========================
// POSTURAL CONTROL TRAINING
// =========================
{ type: "row", showIf: { field: "therapeutic_exercise_list", includes: "postural_control_training" }, fields: [
  { name: "postural_control_training_remarks", label: "Postural Control Training Remarks", type: "textarea" },
]},

// =========================
// COORDINATION
// =========================
{ type: "row", showIf: { field: "therapeutic_exercise_list", includes: "coordination" }, fields: [
  { name: "coordination_remarks", label: "Coordination Remarks", type: "textarea" },
]},

// =========================
// STRETCHING
// =========================
{
  name: "stretching_type",
  label: "Stretching Type",
  type: "radio",
  options: [
    { label: "Passive", value: "passive" },
    { label: "Active", value: "active" }
  ],
  showIf: {
    field: "therapeutic_exercise_list",
    includes: "stretching"
  }
},
{ type: "row", showIf: { field: "therapeutic_exercise_list", includes: "stretching" }, fields: [
  { name: "stretching_remarks", label: "Stretching Remarks", type: "textarea" },
]},

// =========================
// ENDURANCE TRAINING
// =========================
{ type: "row", showIf: { field: "therapeutic_exercise_list", includes: "endurance_training" }, fields: [
  { name: "endurance_training_remarks", label: "Endurance Training Remarks", type: "textarea" },
]},
{
          type: "subheading",
          label: "Functional Exercises (Exercise Modalities)"
        },

        {
          name: "functional_exercises",
      
          type: "checkbox-group",
          options: [
            {
              label: "AXELERO Gait and Balance",
              value: "axelero_gait_balance"
            },
            {
              label: "Akuis Sintesi Pro",
              value: "akuis_sintesi_pro"
            },
            {
              label: "BIODEX Isokinetic",
              value: "biodex_isokinetic"
            },
            { label: "DBC Machine", value: "dbc_machine" },
            { label: "HUR System", value: "hur_system" },
            { label: "Treadmill", value: "treadmill" },
            {
              label: "Multipurpose Gym",
              value: "multipurpose_gym"
            },
            { label: "Power Plate", value: "power_plate" },
            {
              label: "Quadriceps Bench",
              value: "quadriceps_bench"
            },
            {
              label: "Hip Abductor/Adductor Machine",
              value: "hip_machine"
            },
            {
              label: "FIBOD Balance Training",
              value: "fibod_balance"
            },
            {
              label: "Static Bicycle",
              value: "static_bicycle"
            },
            { label: "Leg Press", value: "leg_press" },
            {
              label: "Recumbent Bike (Nordic Track)",
              value: "recumbent_bike"
            },
            {
              label: "Recumbent Stepper (SciFit)",
              value: "recumbent_stepper"
            },
            {
              label: "Cross Trainer (SciFit)",
              value: "cross_trainer"
            },
            {
              label: "Battle Rope Training",
              value: "battle_rope"
            },
            {
              label: "Balance System SD",
              value: "balance_system_sd"
            }
          ]
        },


        // ======================================================
        // AXELERO
        // ======================================================

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

        { type: "row", showIf: { field: "axelero_mode", equals: "duration" }, fields: [
          { name: "axelero_time", label: "Time", type: "input" },
          { name: "axelero_speed", label: "Speed", type: "input", showIf: { field: "functional_exercises", includes: "axelero_gait_balance" } },
        ]},

        { type: "row", showIf: { field: "axelero_mode", equals: "distance" }, fields: [
          { name: "axelero_distance", label: "Distance", type: "input" },
        ]},

        // ======================================================
        // AKUIS SINTESI PRO
        // ======================================================

        {
          name: "akuis_training_type",
          label: "Akuis Sintesi Pro - Types of Exercise",
          type: "checkbox-group",
          options: [
            { label: "Constant Training", value: "constant" },
            { label: "Eccentric Training", value: "eccentric" },
            { label: "Auxotonic Training", value: "auxotonic" },
            { label: "Viscous Training", value: "viscous" },
            { label: "Vibration Training", value: "vibration" },
            { label: "Precision Training", value: "precision" },
            { label: "Magnetic Training", value: "magnetic" },
            { label: "Isometric Training", value: "isometric" },
            { label: "Isokinetic Training", value: "isokinetic" },
            { label: "Random Training", value: "random" }
          ],
          showIf: {
            field: "functional_exercises",
            includes: "akuis_sintesi_pro"
          }
        },

        // ======================================================
        // CONSTANT TRAINING
        // ======================================================

       {
  type: "subheading",
  label: "Constant Training",
  showIf: {
    field: "akuis_training_type",
    includes: "constant"
  }
},
{
  type: "row",
  fields: [
    {
      name: "constant_weight",
      label: "Weight (kg)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "constant"
      }
    },
    {
      name: "constant_angle",
      label: "Angle (degree)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "constant"
      }
    }
  ]
},

{
  type: "subheading",
  label: "Eccentric Training",
  showIf: {
    field: "akuis_training_type",
    includes: "eccentric"
  }
},
{
  type: "row",
  fields: [
    {
      name: "eccentric_weight",
      label: "Weight (kg)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "eccentric"
      }
    },
    {
      name: "eccentric_angle",
      label: "Angle (degree)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "eccentric"
      }
    }
  ]
},

{
  type: "subheading",
  label: "Auxotonic Training",
  showIf: {
    field: "akuis_training_type",
    includes: "auxotonic"
  }
},
{
  type: "row",
  fields: [
    {
      name: "auxotonic_stiffness",
      label: "Stiffness Level",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "auxotonic"
      }
    },
    {
      name: "auxotonic_min_load",
      label: "Min Load (kg)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "auxotonic"
      }
    },
    {
      name: "auxotonic_angle",
      label: "Angle (degree)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "auxotonic"
      }
    }
  ]
},

{
  type: "subheading",
  label: "Viscous Training",
  showIf: {
    field: "akuis_training_type",
    includes: "viscous"
  }
},
{
  type: "row",
  fields: [
    {
      name: "viscous_viscosity_level",
      label: "Viscosity Level",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "viscous"
      }
    },
    {
      name: "viscous_min_load",
      label: "Min Load (kg)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "viscous"
      }
    },
    {
      name: "viscous_return_load",
      label: "Return Load (kg)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "viscous"
      }
    }
  ]
},
{
  type: "row",
  fields: [
    {
      name: "viscous_space_transition",
      label: "Space Transition (cm)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "viscous"
      }
    },
    {
      name: "viscous_angle",
      label: "Angle (degree)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "viscous"
      }
    }
  ]
},

{
  type: "subheading",
  label: "Vibration Training",
  showIf: {
    field: "akuis_training_type",
    includes: "vibration"
  }
},
{
  type: "row",
  fields: [
    {
      name: "vibration_base_load",
      label: "Base Load (kg)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "vibration"
      }
    },
    {
      name: "vibration_amplitude",
      label: "Amplitude (kg)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "vibration"
      }
    },
    {
      name: "vibration_frequency",
      label: "Frequency (Hz)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "vibration"
      }
    }
  ]
},

{
  type: "subheading",
  label: "Precision Training",
  showIf: {
    field: "akuis_training_type",
    includes: "precision"
  }
},
{
  type: "row",
  fields: [
    {
      name: "precision_load",
      label: "Load (kg)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "precision"
      }
    },
    {
      name: "precision_angle",
      label: "Angle (degree)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "precision"
      }
    }
  ]
},

{
  type: "subheading",
  label: "Magnetic Training",
  showIf: {
    field: "akuis_training_type",
    includes: "magnetic"
  }
},
{
  type: "row",
  fields: [
    {
      name: "magnetic_stiffness",
      label: "Stiffness Level",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "magnetic"
      }
    },
    {
      name: "magnetic_max_load",
      label: "Max Load (kg)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "magnetic"
      }
    },
    {
      name: "magnetic_min_load",
      label: "Min Load (kg)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "magnetic"
      }
    }
  ]
},
{
  type: "row",
  fields: [
    {
      name: "magnetic_angle",
      label: "Angle (degree)",
      type: "input",
      showIf: {
        field: "akuis_training_type",
        includes: "magnetic"
      }
    }
  ]
},
        {
  type: "subheading",
  label: "BIODEX Isokinetic",
  showIf: {
    field: "functional_exercises",
    includes: "biodex_isokinetic"
  }
},

{ type: "row", showIf: { field: "functional_exercises", includes: "biodex_isokinetic" }, fields: [
  { name: "biodex_mode_training", label: "Mode of Training", type: "input", placeholder: "Exercise" },
  { name: "biodex_rom_setup", label: "ROM Setup", type: "input" },
]},

{
  name: "biodex_region",
  label: "Region",
  type: "radio",
  options: [
    { label: "Shoulder", value: "shoulder" },
    { label: "Elbow", value: "elbow" },
    { label: "Wrist", value: "wrist" },
    { label: "Hip", value: "hip" },
    { label: "Knee", value: "knee" },
    { label: "Ankle", value: "ankle" },
    { label: "Forearm", value: "forearm" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "biodex_isokinetic"
  }
},

{
  name: "biodex_mode_setup",
  label: "Mode Setup",
  type: "checkbox-group",
  options: [
    { label: "Isokinetic", value: "isokinetic" },
    { label: "Isometric", value: "isometric" },
    { label: "Isotonic", value: "isotonic" },
    { label: "Passive", value: "passive" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "biodex_isokinetic"
  }
},

// ======================================================
// ISOKINETIC
// ======================================================


// ======================================================
// ISOMETRIC
// ======================================================
// ======================================================
// ISOKINETIC
// ======================================================

{
  type: "subheading",
  label: "Isokinetic Parameters",
  showIf: {
    field: "biodex_mode_setup",
    equals: "isokinetic"
  }
},

{ type: "row", showIf: { field: "biodex_mode_setup", equals: "isokinetic" }, fields: [
  { name: "biodex_isokinetic_speed_away", label: "Speed Away", type: "input" },
  { name: "biodex_isokinetic_repetition", label: "Set Repetition", type: "input" },
]},
{
  name: "biodex_isokinetic_contraction",
  label: "Set Contraction",
  type: "radio",
  options: [
    { label: "Concentric", value: "concentric" },
    { label: "Eccentric", value: "eccentric" }
  ],
  showIf: {
    field: "biodex_mode_setup",
    equals: "isokinetic"
  }
},
{ type: "row", showIf: { field: "biodex_mode_setup", equals: "isokinetic" }, fields: [
  { name: "biodex_isokinetic_set", label: "Set", type: "input" },
]},

// ======================================================
// ISOMETRIC
// ======================================================

{
  type: "subheading",
  label: "Isometric Parameters",
  showIf: {
    field: "biodex_mode_setup",
    equals: "isometric"
  }
},

{ type: "row", showIf: { field: "biodex_mode_setup", equals: "isometric" }, fields: [
  { name: "biodex_isometric_remarks", label: "Remarks", type: "textarea" },
]},

// ======================================================
// ISOTONIC
// ======================================================

{
  type: "subheading",
  label: "Isotonic Parameters",
  showIf: {
    field: "biodex_mode_setup",
    equals: "isotonic"
  }
},

{ type: "row", showIf: { field: "biodex_mode_setup", equals: "isotonic" }, fields: [
  { name: "biodex_isotonic_torque_setting", label: "Torque Setting", type: "input" },
  { name: "biodex_isotonic_repetition", label: "Set Repetition", type: "input" },
]},
{
  name: "biodex_isotonic_contraction",
  label: "Set Contraction",
  type: "radio",
  options: [
    { label: "Concentric", value: "concentric" },
    { label: "Eccentric", value: "eccentric" }
  ],
  showIf: {
    field: "biodex_mode_setup",
    equals: "isotonic"
  }
},
{ type: "row", showIf: { field: "biodex_mode_setup", equals: "isotonic" }, fields: [
  { name: "biodex_isotonic_set", label: "Set", type: "input" },
]},

// ======================================================
// PASSIVE
// ======================================================

{
  type: "subheading",
  label: "Passive Parameters",
  showIf: {
    field: "biodex_mode_setup",
    equals: "passive"
  }
},

{ type: "row", showIf: { field: "biodex_mode_setup", equals: "passive" }, fields: [
  { name: "biodex_passive_speed_away", label: "Speed Away", type: "input" },
  { name: "biodex_passive_torque_setting", label: "Torque Setting", type: "input" },
]},
{ type: "row", showIf: { field: "biodex_mode_setup", equals: "passive" }, fields: [
  { name: "biodex_passive_pause_away", label: "Pause Away", type: "input" },
  { name: "biodex_passive_repetition", label: "Set Repetition", type: "input" },
]},
{ type: "row", showIf: { field: "biodex_mode_setup", equals: "passive" }, fields: [
  { name: "biodex_passive_set", label: "Set", type: "input" },
]},
// {
//   name: "biodex_isokinetic_speed_away",
//   label: "Speed Away",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "isokinetic"
//   }
// },

// {
//   name: "biodex_isokinetic_contraction",
//   label: "Set Contraction",
//   type: "radio",
//   options: [
//     { label: "Concentric", value: "concentric" },
//     { label: "Eccentric", value: "eccentric" }
//   ],
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "isokinetic"
//   }
// },

// {
//   name: "biodex_isokinetic_repetition",
//   label: "Set Repetition",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "isokinetic"
//   }
// },

// {
//   name: "biodex_isokinetic_set",
//   label: "Set",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "isokinetic"
//   }
// },

// {
//   name: "biodex_isometric_remarks",
//   label: "Remarks",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "isometric"
//   }
// },

// // ======================================================
// // ISOTONIC
// // ======================================================

// {
//   name: "biodex_isotonic_torque_setting",
//   label: "Torque Setting",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "isotonic"
//   }
// },

// {
//   name: "biodex_isotonic_contraction",
//   label: "Set Contraction",
//   type: "radio",
//   options: [
//     { label: "Concentric", value: "concentric" },
//     { label: "Eccentric", value: "eccentric" }
//   ],
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "isotonic"
//   }
// },

// {
//   name: "biodex_isotonic_repetition",
//   label: "Set Repetition",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "isotonic"
//   }
// },

// {
//   name: "biodex_isotonic_set",
//   label: "Set",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "isotonic"
//   }
// },

// // ======================================================
// // PASSIVE
// // ======================================================

// {
//   name: "biodex_passive_speed_away",
//   label: "Speed Away",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "passive"
//   }
// },

// {
//   name: "biodex_passive_torque_setting",
//   label: "Torque Setting",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "passive"
//   }
// },

// {
//   name: "biodex_passive_pause_away",
//   label: "Pause Away",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "passive"
//   }
// },

// {
//   name: "biodex_passive_repetition",
//   label: "Set Repetition",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "passive"
//   }
// },

// {
//   name: "biodex_passive_set",
//   label: "Set",
//   type: "input",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "passive"
//   }
// },
// {
//   type: "subheading",
//   label: "Isokinetic Parameters",
//   showIf: {
//     field: "biodex_mode_setup",
//     equals: "isokinetic"
//   }
// },
// ======================================================
// RESULT PARAMETERS
// ======================================================

{
  type: "subheading",
  label: "Result Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "biodex_isokinetic"
  }
},

{
  type: "row",
  fields: [
    {
      name: "biodex_peak_torque",
      label: "Peak Torque",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "biodex_isokinetic"
      }
    },
    {
      name: "biodex_total_work",
      label: "Total Works",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "biodex_isokinetic"
      }
    },
    {
      name: "biodex_coefficient_variable",
      label: "% Coefficient of Variable",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "biodex_isokinetic"
      }
    }
  ]
},
// ======================================================
// DBC MACHINE
// ======================================================

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
  options: [
    { label: "Lumbar Flexion", value: "lumbar_flexion" },
    { label: "Lumbar Extension", value: "lumbar_extension" },
    { label: "Lumbar Lateral Flexion", value: "lumbar_lateral_flexion" },
    { label: "Trunk Rotation", value: "trunk_rotation" },
    {
      label: "Cervical Flexion/Extension",
      value: "cervical_flexion_extension"
    },
    { label: "Cervical Rotation", value: "cervical_rotation" },
    {
      label: "Isometric Trunk Stabilization",
      value: "isometric_trunk_stabilization"
    },
    {
      label: "Progressive Resistance Spine Training",
      value: "progressive_resistance_spine_training"
    }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "dbc_machine"
  }
},

// {
//   name: "dbc_weight",
//   label: "Weight (kg/lbs)",
//   type: "input",
//   showIf: {
//     field: "functional_exercises",
//     includes: "dbc_machine"
//   }
// },

// {
//   name: "dbc_reps",
//   label: "Repetitions",
//   type: "input",
//   showIf: {
//     field: "functional_exercises",
//     includes: "dbc_machine"
//   }
// },

// {
//   name: "dbc_set",
//   label: "Set",
//   type: "input",
//   showIf: {
//     field: "functional_exercises",
//     includes: "dbc_machine"
//   }
// },

// {
//   name: "dbc_hold",
//   label: "Hold",
//   type: "input",
//   showIf: {
//     field: "functional_exercises",
//     includes: "dbc_machine"
//   }
// },

// {
//   name: "dbc_rest",
//   label: "Rest",
//   type: "input",
//   showIf: {
//     field: "functional_exercises",
//     includes: "dbc_machine"
//   }
// },

// {
//   name: "dbc_remarks",
//   label: "Remarks",
//   type: "input",
//   showIf: {
//     field: "functional_exercises",
//     includes: "dbc_machine"
//   }
// },
// {
//   name: "dbc_remarks",
//   label: "Others",
//   type: "input",
//   showIf: {
//     field: "functional_exercises",
//     includes: "dbc_machine"
//   }
// },
// ======================================================
// DBC MACHINE
// ======================================================

{
  type: "subheading",
  label: "DBC Machine Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "dbc_machine"
  }
},

{
  type: "row",
  fields: [
    {
      name: "dbc_weight",
      label: "Weight (kg/lbs)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "dbc_machine"
      }
    },
    {
      name: "dbc_reps",
      label: "Repetitions",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "dbc_machine"
      }
    },
    {
      name: "dbc_set",
      label: "Set",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "dbc_machine"
      }
    }
  ]
},
{
  type: "row",
  fields: [
    {
      name: "dbc_hold",
      label: "Hold",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "dbc_machine"
      }
    },
    {
      name: "dbc_rest",
      label: "Rest",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "dbc_machine"
      }
    },
    {
      name: "dbc_others",
      label: "Others",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "dbc_machine"
      }
    }
  ]
},
// ======================================================
// HUR SYSTEM
// ======================================================

{
  type: "subheading",
  label: "HUR System",
  showIf: {
    field: "functional_exercises",
    includes: "hur_system"
  }
},

{
  type: "row",
  fields: [
    {
      name: "hur_exercise_type",
      label: "Types of Exercise",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "hur_system"
      }
    },
    {
      name: "hur_minutes",
      label: "Minutes",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "hur_system"
      }
    },
    {
      name: "hur_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "hur_system"
      }
    },
    {
  name: "hur_other_exercise",
  label: "Other Exercise",
  type: "input",
  showIf: {
    field: "functional_exercises",
    includes: "hur_system"
  }
},
  ]
},


// ======================================================
// TREADMILL
// ======================================================

{
  type: "subheading",
  label: "Treadmill",
  showIf: {
    field: "functional_exercises",
    includes: "treadmill"
  }
},

{
  name: "treadmill_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    { label: "Walking (Slow)", value: "walking_slow" },
    { label: "Walking (Moderate)", value: "walking_moderate" },
    { label: "Walking (Fast)", value: "walking_fast" },
    { label: "Jogging", value: "jogging" },
    { label: "Running", value: "running" },
    { label: "Incline Walking/Running", value: "incline_training" },
    { label: "Interval Training", value: "interval_training" },
    { label: "Endurance Walking", value: "endurance_walking" },
    { label: "Backward Walking", value: "backward_walking" },
    { label: "Side Walking", value: "side_walking" },
    { label: "Gait Retraining Drills", value: "gait_retraining" },
    { label: "Others", value: "others" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "treadmill"
  }
},


{
  type: "subheading",
  label: "Treadmill Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "treadmill"
  }
},
{
  type: "row",
  fields: [
    {
      name: "treadmill_duration",
      label: "Duration (Min)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "treadmill"
      }
    },
    {
      name: "treadmill_distance",
      label: "Distance (KM)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "treadmill"
      }
    },
    {
      name: "treadmill_elevation",
      label: "Elevation Level",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "treadmill"
      }
    }
  ]
},
{ type: "row", showIf: { field: "treadmill_exercise_type", includes: "others" }, fields: [
  { name: "treadmill_other_exercise", label: "Other Exercise", type: "textarea" },
]},
// ======================================================
// MULTIPURPOSE GYM
// ======================================================

{
  type: "subheading",
  label: "Multipurpose Gym",
  showIf: {
    field: "functional_exercises",
    includes: "multipurpose_gym"
  }
},

{
  name: "gym_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    { label: "Lat Pulldown", value: "lat_pulldown" },
    { label: "Seated Row", value: "seated_row" },
    { label: "Chest Press", value: "chest_press" },
    { label: "Cable Crossover", value: "cable_crossover" },
    { label: "Triceps Pushdown", value: "triceps_pushdown" },
    { label: "Biceps Curl", value: "biceps_curl" },
    { label: "Functional Cable Training", value: "functional_cable_training" },
    { label: "Core Rotations", value: "core_rotations" },
    { label: "Assisted Pull-ups", value: "assisted_pullups" },
    { label: "Functional Movement Patterns", value: "functional_movement_patterns" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "multipurpose_gym"
  }
},
{
  type: "subheading",
  label: "Multipurpose Gym Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "multipurpose_gym"
  }
},

{
  type: "row",
  fields: [
    {
      name: "gym_weight",
      label: "Weight (kg/lbs)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "multipurpose_gym"
      }
    },
    {
      name: "gym_reps",
      label: "Repetitions",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "multipurpose_gym"
      }
    },
    {
      name: "gym_sets",
      label: "Sets",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "multipurpose_gym"
      }
    }
  ]
},
{
  type: "row",
  fields: [
    {
      name: "gym_hold",
      label: "Hold",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "multipurpose_gym"
      }
    },
    {
      name: "gym_rest",
      label: "Rest",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "multipurpose_gym"
      }
    },
    {
      name: "gym_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "multipurpose_gym"
      }
    }
  ]
},
// ======================================================
// POWER PLATE
// ======================================================

{
  type: "subheading",
  label: "Power Plate",
  showIf: {
    field: "functional_exercises",
    includes: "power_plate"
  }
},

{
  name: "power_plate_mode",
  label: "Mode of Exercise",
  type: "radio",
  options: [
    { label: "Manual Mode", value: "manual_mode" },
    { label: "Single Movement", value: "single_movement" },
    { label: "Physical Rehab", value: "physical_rehab" },
    { label: "Complete Program", value: "complete_program" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "power_plate"
  }
},

// ======================================================
// MANUAL MODE
// ======================================================

{ type: "row", showIf: { field: "power_plate_mode", equals: "manual_mode" }, fields: [
  { name: "power_plate_manual_time", label: "Time", type: "input" },
  { name: "power_plate_manual_vibration", label: "Vibration Level", type: "input" },
]},

{
  name: "power_plate_manual_resistance",
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

// ======================================================
// SINGLE MOVEMENT
// ======================================================

{
  name: "power_plate_single_movement_type",
  label: "Single Movement Type",
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
    equals: "single_movement"
  }
},

{
  type: "row",
  fields: [
    {
      name: "power_plate_single_exercise",
      label: "Type Exercise",
      type: "input",
      showIf: {
        field: "power_plate_mode",
        equals: "single_movement"
      }
    },
    {
      name: "power_plate_single_time",
      label: "Time",
      type: "input",
      showIf: {
        field: "power_plate_mode",
        equals: "single_movement"
      }
    },
    {
      name: "power_plate_single_vibration",
      label: "Vibration Level",
      type: "input",
      showIf: {
        field: "power_plate_mode",
        equals: "single_movement"
      }
    }
  ]
},

// ======================================================
// PHYSICAL REHAB
// ======================================================

{
  name: "power_plate_rehab_region",
  label: "Physical Rehab Region",
  type: "checkbox-group",
  options: [
    { label: "Shoulder", value: "shoulder" },
    { label: "Elbow", value: "elbow" },
    { label: "Wrist", value: "wrist" },
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
  fields: [
    {
      name: "power_plate_rehab_vibration",
      label: "Vibration Level",
      type: "input",
      showIf: {
        field: "power_plate_mode",
        equals: "physical_rehab"
      }
    },
    {
      name: "power_plate_rehab_time",
      label: "Time",
      type: "input",
      showIf: {
        field: "power_plate_mode",
        equals: "physical_rehab"
      }
    }
  ]
},

// ======================================================
// COMPLETE PROGRAM
// ======================================================

{
  name: "power_plate_program_category",
  label: "Program Category",
  type: "radio",
  options: [
    { label: "Neuro Health", value: "neuro_health" },
    { label: "Pain Relief", value: "pain_relief" },
    { label: "Common Condition", value: "common_condition" }
  ],
  showIf: {
    field: "power_plate_mode",
    equals: "complete_program"
  }
},

// ======================================================
// NEURO HEALTH
// ======================================================

{
  name: "power_plate_neuro_program",
  label: "Neuro Health Program",
  type: "checkbox-group",
  options: [
    { label: "Fall Prevention", value: "fall_prevention" },
    { label: "Neurodegen", value: "neurodegen" },
    { label: "SCI", value: "sci" },
    { label: "Biodensity (Pre-Post)", value: "biodensity" }
  ],
  showIf: {
    field: "power_plate_program_category",
    equals: "neuro_health"
  }
},

{
  type: "row",
  fields: [
    {
      name: "power_plate_neuro_vibration",
      label: "Vibration Level",
      type: "input",
      showIf: {
        field: "power_plate_program_category",
        equals: "neuro_health"
      }
    },
    {
      name: "power_plate_neuro_time",
      label: "Time",
      type: "input",
      showIf: {
        field: "power_plate_program_category",
        equals: "neuro_health"
      }
    }
  ]
},
// ======================================================
// PAIN RELIEF
// ======================================================

{
  name: "power_plate_pain_program",
  label: "Pain Relief Program",
  type: "checkbox-group",
  options: [
    { label: "LBP", value: "lbp" },
    { label: "Neck or Upper Back", value: "neck_upper_back" },
    { label: "Legs", value: "legs" },
    { label: "Arms", value: "arms" }
  ],
  showIf: {
    field: "power_plate_program_category",
    equals: "pain_relief"
  }
},

{
  type: "row",
  fields: [
    {
      name: "power_plate_pain_vibration",
      label: "Vibration Level",
      type: "input",
      showIf: {
        field: "power_plate_program_category",
        equals: "pain_relief"
      }
    },
    {
      name: "power_plate_pain_time",
      label: "Time",
      type: "input",
      showIf: {
        field: "power_plate_program_category",
        equals: "pain_relief"
      }
    }
  ]
},

// ======================================================
// COMMON CONDITION
// ======================================================

{
  name: "power_plate_common_program",
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
    field: "power_plate_program_category",
    equals: "common_condition"
  }
},

{
  type: "row",
  fields: [
    {
      name: "power_plate_common_vibration",
      label: "Vibration Level",
      type: "input",
      showIf: {
        field: "power_plate_program_category",
        equals: "common_condition"
      }
    },
    {
      name: "power_plate_common_time",
      label: "Time",
      type: "input",
      showIf: {
        field: "power_plate_program_category",
        equals: "common_condition"
      }
    }
  ]
},
// ======================================================
// QUADRICEPS BENCH
// ======================================================

{
  type: "subheading",
  label: "Quadriceps Bench",
  showIf: {
    field: "functional_exercises",
    includes: "quadriceps_bench"
  }
},

{
  name: "quadriceps_bench_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    {
      label: "Knee Extension (Single Leg)",
      value: "knee_extension_single"
    },
    {
      label: "Knee Extension (Double Leg)",
      value: "knee_extension_double"
    },
    {
      label: "Knee Flexion (Single Leg)",
      value: "knee_flexion_single"
    },
    {
      label: "Knee Flexion (Double Leg)",
      value: "knee_flexion_double"
    },
    {
      label: "Isometric Quad/Hamstring Hold",
      value: "isometric_hold"
    },
    {
      label: "Eccentric Quadriceps/Hamstrings Training",
      value: "eccentric_training"
    },
    {
      label: "Controlled ROM Training",
      value: "controlled_rom"
    }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "quadriceps_bench"
  }
},
{
  type: "subheading",
  label: "Quadriceps Bench Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "quadriceps_bench"
  }
},
{
  type: "row",
  fields: [
    {
      name: "quadriceps_bench_weight",
      label: "Weight (kg/lbs)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "quadriceps_bench"
      }
    },
    {
      name: "quadriceps_bench_reps",
      label: "Repetitions",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "quadriceps_bench"
      }
    },
    {
      name: "quadriceps_bench_sets",
      label: "Sets",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "quadriceps_bench"
      }
    },
     {
      name: "quadriceps_bench_hold",
      label: "Hold (Sec)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "quadriceps_bench"
      }
    },
    {
      name: "quadriceps_bench_rest",
      label: "Rest (Sec/Min)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "quadriceps_bench"
      }
    },
    {
      name: "quadriceps_bench_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "quadriceps_bench"
      }
    },
  ]
},

// ======================================================
// HIP ABDUCTOR / ADDUCTOR MACHINE
// ======================================================

{
  type: "subheading",
  label: "Hip Abductor / Adductor Machine",
  showIf: {
    field: "functional_exercises",
    includes: "hip_machine"
  }
},

{
  name: "hip_machine_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    { label: "Hip Abduction", value: "hip_abduction" },
    { label: "Hip Adduction", value: "hip_adduction" },
    { label: "Isometric Holds", value: "isometric_holds" },
    { label: "Slow Controlled Reps", value: "slow_controlled_reps" },
    { label: "Endurance Training", value: "endurance_training" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "hip_machine"
  }
},

{
  name: "hip_machine_level",
  label: "Level",
  type: "radio",
  options: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "hip_machine"
  }
},
{
  type: "subheading",
  label: "Hip Machine Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "hip_machine"
  }
},
{
  type: "row",
  fields: [
    {
      name: "hip_machine_reps",
      label: "Repetitions",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "hip_machine"
      }
    },
    {
      name: "hip_machine_sets",
      label: "Sets",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "hip_machine"
      }
    },
    {
      name: "hip_machine_hold",
      label: "Hold (Sec)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "hip_machine"
      }
    },
     {
      name: "hip_machine_rest",
      label: "Rest (Sec/Min)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "hip_machine"
      }
    },
    {
      name: "hip_machine_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "hip_machine"
      }
    },
  ]
},
// {
//   type: "row",
//   fields: [
//     {
//       name: "hip_machine_rest",
//       label: "Rest (Sec/Min)",
//       type: "input",
//       showIf: {
//         field: "functional_exercises",
//         includes: "hip_machine"
//       }
//     },
//     {
//       name: "hip_machine_remarks",
//       label: "Remarks",
//       type: "input",
//       showIf: {
//         field: "functional_exercises",
//         includes: "hip_machine"
//       }
//     }
//   ]
// },
// ======================================================
// FIBOD BALANCE TRAINING
// ======================================================

{
  type: "subheading",
  label: "FIBOD Balance Training",
  showIf: {
    field: "functional_exercises",
    includes: "fibod_balance"
  }
},

{
  name: "fibod_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    { label: "Static Balance", value: "static_balance" },
    { label: "Dynamic Balance", value: "dynamic_balance" },
    { label: "Single-leg Stance", value: "single_leg_stance" },
    { label: "Proprioception Drills", value: "proprioception_drills" },
    { label: "Weight Shifting", value: "weight_shifting" },
    { label: "Coordination Training", value: "coordination_training" },
    { label: "Reactive Balance Exercises", value: "reactive_balance_exercises" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "fibod_balance"
  }
},
{
  type: "subheading",
  label: "FIBOD Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "fibod_balance"
  }
},

{
  type: "row",
  fields: [
    {
      name: "fibod_time",
      label: "Time",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "fibod_balance"
      }
    },
    {
      name: "fibod_score",
      label: "Score",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "fibod_balance"
      }
    }
  ]
},
// ======================================================
// STATIC BICYCLE
// ======================================================

{
  type: "subheading",
  label: "Static Bicycle",
  showIf: {
    field: "functional_exercises",
    includes: "static_bicycle"
  }
},

{
  name: "static_bicycle_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    {
      label: "Low Resistance Cycling",
      value: "low_resistance_cycling"
    },
    {
      label: "Moderate Steady-state Cycling",
      value: "moderate_steady_state_cycling"
    },
    {
      label: "High Resistance Cycling",
      value: "high_resistance_cycling"
    },
    {
      label: "Interval Cycling",
      value: "interval_cycling"
    },
    {
      label: "One-leg Cycling",
      value: "one_leg_cycling"
    },
    {
      label: "Warm-up / Cool-down Cycling",
      value: "warmup_cooldown_cycling"
    }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "static_bicycle"
  }
},
{
  type: "subheading",
  label: "Static Bicycle Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "static_bicycle"
  }
},
{
  type: "row",
  fields: [
    {
      name: "static_bicycle_duration",
      label: "Duration (Min)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "static_bicycle"
      }
    },
    {
      name: "static_bicycle_distance",
      label: "Distance (KM)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "static_bicycle"
      }
    },
    {
      name: "static_bicycle_resistance",
      label: "Resistance Level",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "static_bicycle"
      }
    },
    {
  name: "static_bicycle_remarks",
  label: "Remarks",
  type: "input",
  showIf: {
    field: "functional_exercises",
    includes: "static_bicycle"
  }
},
  ]
},

// ======================================================
// LEG PRESS
// ======================================================

{
  type: "subheading",
  label: "Leg Press",
  showIf: {
    field: "functional_exercises",
    includes: "leg_press"
  }
},

{
  name: "leg_press_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    {
      label: "Bilateral Leg Press",
      value: "bilateral_leg_press"
    },
    {
      label: "Single-leg Press",
      value: "single_leg_press"
    },
    {
      label: "High Foot Placement (Glutes Focus)",
      value: "high_foot_placement"
    },
    {
      label: "Low Foot Placement (Quads Focus)",
      value: "low_foot_placement"
    },
    {
      label: "Eccentric Loading",
      value: "eccentric_loading"
    },
    {
      label: "Power Press (Explosive)",
      value: "power_press"
    },
    {
      label: "Endurance Sets",
      value: "endurance_sets"
    }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "leg_press"
  }
},
{
  type: "subheading",
  label: "Leg Press Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "leg_press"
  }
},
{
  type: "row",
  fields: [
    {
      name: "leg_press_weight",
      label: "Weight (kg/lbs)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "leg_press"
      }
    },
    {
      name: "leg_press_reps",
      label: "Repetitions",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "leg_press"
      }
    },
    {
      name: "leg_press_sets",
      label: "Sets",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "leg_press"
      }
    },
    {
      name: "leg_press_hold",
      label: "Hold (Sec)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "leg_press"
      }
    },
    {
      name: "leg_press_rest",
      label: "Rest (Sec/Min)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "leg_press"
      }
    },
    {
      name: "leg_press_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "leg_press"
      }
    }
  ]
},

// ======================================================
// RECUMBENT BIKE (NORDIC TRACK)
// ======================================================
{
  type: "subheading",
  label: "Recumbent Bike (Nordic Track)",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_bike"
  }
},
{
  name: "recumbent_bike_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    { label: "Low-impact Cycling", value: "low_impact_cycling" },
    { label: "Interval Training", value: "interval_training" },
    { label: "Resistance Progression", value: "resistance_progression" },
    { label: "Cardiovascular Endurance", value: "cardiovascular_endurance" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_bike"
  }
},
{
  type: "subheading",
  label: "Recumbent Bike Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_bike"
  }
},


{
  type: "row",
  fields: [
    {
      name: "recumbent_bike_duration",
      label: "Duration (Min)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "recumbent_bike"
      }
    },
    {
      name: "recumbent_bike_distance",
      label: "Distance (KM)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "recumbent_bike"
      }
    },
    {
      name: "recumbent_bike_resistance",
      label: "Resistance Level",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "recumbent_bike"
      }
    },
    {
  name: "recumbent_bike_remarks",
  label: "Remarks",
  type: "input",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_bike"
  }
},
  ]
},

// ======================================================
// RECUMBENT STEPPER (SCIFIT)
// ======================================================
{
  type: "subheading",
  label: "Recumbent Stepper (SciFit)",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_stepper"
  }
},
{
  name: "recumbent_stepper_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    { label: "Full-body Stepping", value: "full_body_stepping" },
    { label: "Upper Limb Only", value: "upper_limb_only" },
    { label: "Lower Limb Only", value: "lower_limb_only" },
    { label: "Interval Stepping", value: "interval_stepping" },
    {
      label: "Upper/Lower Body Coordination",
      value: "upper_lower_body_coordination"
    }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_stepper"
  }
},
{
  type: "subheading",
  label: "Recumbent Stepper Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "recumbent_stepper"
  }
},
{
  type: "row",
  fields: [
    {
      name: "recumbent_stepper_duration",
      label: "Duration (Min)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "recumbent_stepper"
      }
    },
    {
      name: "recumbent_stepper_resistance",
      label: "Resistance Level",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "recumbent_stepper"
      }
    },
    {
      name: "recumbent_stepper_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "recumbent_stepper"
      }
    }
  ]
},
// ======================================================
// CROSS TRAINER (SCIFIT)
// ======================================================
{
  type: "subheading",
  label: "Cross Trainer (SciFit)",
  showIf: {
    field: "functional_exercises",
    includes: "cross_trainer"
  }
},
{
  name: "cross_trainer_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    { label: "Forward Elliptical", value: "forward_elliptical" },
    { label: "Reverse Elliptical", value: "reverse_elliptical" },
    { label: "Interval Training", value: "interval_training" },
    { label: "Endurance Training", value: "endurance_training" },
    {
      label: "Upper/Lower Body Coordination",
      value: "upper_lower_body_coordination"
    }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "cross_trainer"
  }
},
{
  type: "subheading",
  label: "Cross Trainer Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "cross_trainer"
  }
},
{
  type: "row",
  fields: [
    {
      name: "cross_trainer_duration",
      label: "Duration (Min)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "cross_trainer"
      }
    },
    {
      name: "cross_trainer_resistance",
      label: "Resistance Level",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "cross_trainer"
      }
    },
    {
      name: "cross_trainer_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "cross_trainer"
      }
    }
  ]
},
// ======================================================
// BATTLE ROPE TRAINING
// ======================================================
{
  type: "subheading",
  label: "Battle Rope Training",
  showIf: {
    field: "functional_exercises",
    includes: "battle_rope"
  }
},
{
  name: "battle_rope_exercise_type",
  label: "Types of Exercise",
  type: "checkbox-group",
  options: [
    { label: "Alternating Waves", value: "alternating_waves" },
    { label: "Double Waves", value: "double_waves" },
    { label: "Slams", value: "slams" },
    { label: "Side-to-side Waves", value: "side_to_side_waves" },
    { label: "Circles", value: "circles" },
    { label: "Power Intervals", value: "power_intervals" },
    { label: "Endurance Intervals", value: "endurance_intervals" },
    { label: "Others", value: "others" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "battle_rope"
  }
},

{ type: "row", showIf: { field: "battle_rope_exercise_type", includes: "others" }, fields: [
  { name: "battle_rope_other_exercise", label: "Other Exercise", type: "textarea" },
]},
{
  type: "subheading",
  label: "Battle Rope Parameters",
  showIf: {
    field: "functional_exercises",
    includes: "battle_rope"
  }
},

{
  type: "row",
  fields: [
    {
      name: "battle_rope_reps",
      label: "Repetitions",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "battle_rope"
      }
    },
    {
      name: "battle_rope_sets",
      label: "Sets",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "battle_rope"
      }
    },
    {
      name: "battle_rope_hold",
      label: "Hold (Sec)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "battle_rope"
      }
    },
      {
      name: "battle_rope_rest",
      label: "Rest (Min/Sec)",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "battle_rope"
      }
    },
    {
      name: "battle_rope_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "functional_exercises",
        includes: "battle_rope"
      }
    }
  ]
},

// ======================================================
// BALANCE SYSTEM SD
// ======================================================

// {
//   name: "balance_system_mode",
//   label: "Mode of Training",
//   type: "radio",
//   options: [
//     { label: "Training", value: "training" },
//     { label: "Testing", value: "testing" }
//   ],
//   showIf: {
//     field: "functional_exercises",
//     includes: "balance_system_sd"
//   }
// },

// // ======================================================
// // POSTURAL STABILITY
// // ======================================================

// {
//   name: "postural_stability_type",
//   label: "Postural Stability Type",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "postural_stability_level",
//   label: "Level (1-12)",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "postural_stability_phase_target",
//   label: "Phase Target",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "postural_stability_remarks",
//   label: "Postural Stability Remarks",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// // ======================================================
// // WEIGHT SHIFT
// // ======================================================

// {
//   name: "weight_shift_type",
//   label: "Weight Shift Type",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "weight_shift_level",
//   label: "Level (1-12)",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "weight_shift_target",
//   label: "Rotate Target / Skill Level",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// // ======================================================
// // % WEIGHT BEARING
// // ======================================================

// {
//   name: "weight_bearing_duration",
//   label: "Duration",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "weight_bearing_score",
//   label: "Score",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// // ======================================================
// // LIMIT OF STABILITY
// // ======================================================

// {
//   name: "limit_stability_skill_level",
//   label: "Skill Level",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "limit_stability_type",
//   label: "Limit of Stability Type",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "limit_stability_level",
//   label: "Level (1-12)",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "limit_stability_time_score",
//   label: "Time Score",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// // ======================================================
// // MAZE CONTROL
// // ======================================================

// {
//   name: "maze_control_skill_level",
//   label: "Maze Control Skill Level",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "maze_control_type",
//   label: "Maze Control Type",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "maze_control_time_score",
//   label: "Time Score",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// // ======================================================
// // RANDOM CONTROL TRAINING
// // ======================================================

// {
//   name: "random_control_circle_speed",
//   label: "Circle Speed / Skill Level",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "random_control_type",
//   label: "Random Control Type",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "random_control_level",
//   label: "Level (1-12)",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "random_control_time_score",
//   label: "Time Score",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// // ======================================================
// // OTHERS
// // ======================================================

// {
//   name: "balance_system_other",
//   label: "Others",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },

// {
//   name: "balance_system_other_remarks",
//   label: "Other Remarks",
//   type: "input",
//   showIf: {
//     field: "balance_system_mode",
//     equals: "training"
//   }
// },
// ======================================================
// BALANCE SYSTEM SD
// ======================================================
// {
//   type: "subheading",
//   label: "Balance System SD",
//   showIf: {
//     field: "functional_exercises",
//     includes: "balance_system_sd"
//   }
// },
// {
//   name: "balance_system_sd_mode",
//   label: "Mode of Training",
//   type: "radio",
//   options: [
//     { label: "Training", value: "training" },
//     { label: "Testing", value: "testing" }
//   ],
//   showIf: {
//     field: "functional_exercises",
//     includes: "balance_system_sd"
//   }
// },

// // ======================================================
// // POSTURAL STABILITY
// // ======================================================

// {
//   name: "postural_stability_type",
//   label: "Postural Stability",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "postural_stability_level",
//   label: "Level (1-12)",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "postural_stability_phase_target",
//   label: "Phase Target",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "postural_stability_remarks",
//   label: "Remarks",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// // ======================================================
// // WEIGHT SHIFT
// // ======================================================

// {
//   name: "weight_shift_type",
//   label: "Weight Shift",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "weight_shift_level",
//   label: "Level (1-12)",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "weight_shift_target",
//   label: "Rotate Target / Skill Level",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// // ======================================================
// // % WEIGHT BEARING
// // ======================================================

// {
//   name: "weight_bearing_duration",
//   label: "Duration",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "weight_bearing_score",
//   label: "Score",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// // ======================================================
// // LIMIT OF STABILITY
// // ======================================================

// {
//   name: "limit_stability_skill_level",
//   label: "Skill Level",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "limit_stability_type",
//   label: "Static / Dynamic",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "limit_stability_level",
//   label: "Level (1-12)",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "limit_stability_time_score",
//   label: "Time Score",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// // ======================================================
// // MAZE CONTROL
// // ======================================================

// {
//   name: "maze_control_skill_level",
//   label: "Skill Level",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "maze_control_type",
//   label: "Static / Dynamic",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "maze_control_time_score",
//   label: "Time Score",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// // ======================================================
// // RANDOM CONTROL TRAINING
// // ======================================================

// {
//   name: "random_control_circle_speed",
//   label: "Circle Speed / Skill Level",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "random_control_type",
//   label: "Static / Dynamic",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "random_control_level",
//   label: "Level (1-12)",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },

// {
//   name: "random_control_time_score",
//   label: "Time Score",
//   type: "input",
//   showIf: {
//     field: "balance_system_sd_mode",
//     equals: "training"
//   }
// },
// ======================================================
// BALANCE SYSTEM SD
// ======================================================

{
  type: "subheading",
  label: "Balance System SD",
  showIf: {
    field: "functional_exercises",
    includes: "balance_system_sd"
  }
},

{
  name: "balance_system_sd_mode",
  label: "Mode of Training",
  type: "radio",
  options: [
    { label: "Training", value: "training" },
    { label: "Testing", value: "testing" }
  ],
  showIf: {
    field: "functional_exercises",
    includes: "balance_system_sd"
  }
},

// ======================================================
// POSTURAL STABILITY
// ======================================================

{
  type: "subheading",
  label: "Postural Stability",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},

{
  name: "balance_postural_stability_type",
  label: "Type",
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
  fields: [
    {
      name: "balance_postural_stability_level",
      label: "Level (1-12)",
      type: "input",
      showIf: {
        field: "balance_system_sd_mode",
        equals: "training"
      }
    },
    {
      name: "balance_postural_stability_phase_target",
      label: "Phase Target",
      type: "input",
      showIf: {
        field: "balance_system_sd_mode",
        equals: "training"
      }
    },
    {
      name: "balance_postural_stability_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "balance_system_sd_mode",
        equals: "training"
      }
    }
  ]
},

// ======================================================
// WEIGHT SHIFT
// ======================================================

{
  type: "subheading",
  label: "Weight Shift",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},

{
  name: "balance_weight_shift_type",
  label: "Type",
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
  fields: [
    {
      name: "balance_weight_shift_level",
      label: "Level (1-12)",
      type: "input",
      showIf: {
        field: "balance_system_sd_mode",
        equals: "training"
      }
    },
    {
      name: "balance_weight_shift_rotate_target",
      label: "Rotate Target / Skill Level",
      type: "input",
      showIf: {
        field: "balance_system_sd_mode",
        equals: "training"
      }
    },
    {
      name: "balance_weight_shift_weight_bearing",
      label: "% Weight Bearing",
      type: "input",
      showIf: {
        field: "balance_system_sd_mode",
        equals: "training"
      }
    }
  ]
},
{ type: "row", showIf: { field: "balance_system_sd_mode", equals: "training" }, fields: [
  { name: "balance_weight_shift_duration_score", label: "Duration / Score", type: "input" },
]},

// ======================================================
// LIMIT OF STABILITY
// ======================================================

{
  type: "subheading",
  label: "Limit of Stability",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},

{ type: "row", showIf: { field: "balance_system_sd_mode", equals: "training" }, fields: [
  { name: "balance_limit_stability_skill_level", label: "Skill Level", type: "input" },
]},

{
  name: "balance_limit_stability_type",
  label: "Type",
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
  fields: [
    {
      name: "balance_limit_stability_level",
      label: "Level (1-12)",
      type: "input",
      showIf: {
        field: "balance_system_sd_mode",
        equals: "training"
      }
    },
    {
      name: "balance_limit_stability_time_score",
      label: "Time Score",
      type: "input",
      showIf: {
        field: "balance_system_sd_mode",
        equals: "training"
      }
    }
  ]
},
// ======================================================
// MAZE CONTROL
// ======================================================

{
  type: "subheading",
  label: "Maze Control",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},

{ type: "row", showIf: { field: "balance_system_sd_mode", equals: "training" }, fields: [
  { name: "balance_maze_control_skill_level", label: "Skill Level", type: "input" },
]},

{
  name: "balance_maze_control_type",
  label: "Type",
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
  { name: "balance_maze_control_time_score", label: "Time Score", type: "input" },
]},

// ======================================================
// RANDOM CONTROL TRAINING
// ======================================================

{
  type: "subheading",
  label: "Random Control Training",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},

{ type: "row", showIf: { field: "balance_system_sd_mode", equals: "training" }, fields: [
  { name: "balance_random_control_circle_speed", label: "Circle Speed / Skill Level", type: "input" },
]},

{
  name: "balance_random_control_type",
  label: "Type",
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
  { name: "balance_random_control_level", label: "Level (1-12)", type: "input" },
  { name: "balance_random_control_time_score", label: "Time Score", type: "input" },
]},

// ======================================================
// OTHERS
// ======================================================

{
  type: "subheading",
  label: "Others",
  showIf: {
    field: "balance_system_sd_mode",
    equals: "training"
  }
},


// ======================================================
// OTHERS
// ======================================================

{
  type: "row",
  fields: [
    {
      name: "balance_system_sd_others",
      label: "Others",
      type: "input",
      showIf: {
        field: "balance_system_sd_mode",
        equals: "training"
      }
    },
    {
      name: "balance_system_sd_other_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "balance_system_sd_mode",
        equals: "training"
      }
    }
  ]
},
// ======================================================
// PAIN MANAGEMENT
// ======================================================

{
  type: "subheading",
  label: "Pain Management"
},

{
  name: "pain_management",
  
  type: "checkbox-group",
  options: [
    { label: "Cold Therapy", value: "cold_therapy" },
    { label: "Heat Therapy", value: "heat_therapy" },
    { label: "Laser Therapy", value: "laser_therapy" },
    { label: "Ultrasound Therapy", value: "ultrasound_therapy" },
    { label: "Others", value: "others" }
  ]
},

// ======================================================
// COLD THERAPY
// ======================================================

{
  type: "row",
  fields: [
    {
      name: "cold_therapy_body_part",
      label: "Body Part",
      type: "input",
      showIf: {
        field: "pain_management",
        includes: "cold_therapy"
      }
    },
    {
      name: "cold_therapy_duration",
      label: "Duration (Minutes)",
      type: "input",
      showIf: {
        field: "pain_management",
        includes: "cold_therapy"
      }
    },
    {
      name: "cold_therapy_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "pain_management",
        includes: "cold_therapy"
      }
    }
  ]
},
// ======================================================
// HEAT THERAPY
// ======================================================

{
  type: "row",
  fields: [
    {
      name: "heat_therapy_body_part",
      label: "Body Part",
      type: "input",
      showIf: {
        field: "pain_management",
        includes: "heat_therapy"
      }
    },
    {
      name: "heat_therapy_duration",
      label: "Duration",
      type: "input",
      showIf: {
        field: "pain_management",
        includes: "heat_therapy"
      }
    },
    {
      name: "heat_therapy_remarks",
      label: "Remarks",
      type: "input",
      showIf: {
        field: "pain_management",
        includes: "heat_therapy"
      }
    }
  ]
},
// ======================================================
// LASER THERAPY
// ======================================================

{
  type: "row",
  fields: [
    {
      name: "laser_therapy_body_parts",
      label: "Body Parts",
      type: "input",
      showIf: {
        field: "pain_management",
        includes: "laser_therapy"
      }
    },
    {
      name: "laser_therapy_applicator",
      label: "Types of Applicators",
      type: "input",
      showIf: {
        field: "pain_management",
        includes: "laser_therapy"
      }
    },
    {
      name: "laser_therapy_power",
      label: "Power (Watts)",
      type: "input",
      showIf: {
        field: "pain_management",
        includes: "laser_therapy"
      }
    }
  ]
},
{
  name: "laser_therapy_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed", value: "pulsed" }
  ],
  showIf: {
    field: "pain_management",
    includes: "laser_therapy"
  }
},

{ type: "row", showIf: { field: "pain_management", includes: "laser_therapy" }, fields: [
  { name: "laser_therapy_total_energy", label: "Total Energy (Joules)", type: "input" },
]},

// ======================================================
// ULTRASOUND THERAPY
// ======================================================

{ type: "row", showIf: { field: "pain_management", includes: "ultrasound_therapy" }, fields: [
  { name: "ultrasound_therapy_remarks", label: "Remarks", type: "textarea" },
]},

{ type: "row", showIf: { field: "pain_management", includes: "others" }, fields: [
  { name: "pain_management_others", label: "Others", type: "textarea" },
]},
        
      ]
    },

    // =========================
    // THERAPEUTIC MODALITIES (FIXED AS SEPARATE SECTION)
    // =========================
    
  ]
};


const ASSESSMENT_SCHEMA = {
  title: "Assessment & Response",
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [{
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
  sections: [
    {
      title: "Therapist Notes",
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
        // =========================
        // THERAPIST NOTES
        // =========================
        {
          name: "therapist_notes",
          label: "Therapist Notes",
          type: "checkbox-group",
          options: [
            {
              label: "Continue Current Therapy Program",
              value: "continue_current_program"
            },
            {
              label: "Therapy Progression Based on Functional Level",
              value: "therapy_progression"
            },
            {
              label: "Review and Revisit of Therapy Plan",
              value: "review_revisit_therapy"
            },
            {
              label: "Others",
              value: "others"
            }
          ]
        },

        // =========================
        // CONTINUE CURRENT PROGRAM
        // =========================
        {
          type: "subheading",
          label: "Continue Current Therapy Program",
          showIf: {
            field: "therapist_notes",
            includes: "continue_current_program"
          }
        },

        {
          name: "continue_current_program_options",
          label: "Select",
          type: "checkbox-group",
          options: [
            {
              label: "Continue Therapeutic Exercises",
              value: "continue_therapeutic_exercises"
            },
            {
              label: "Continue Functional Exercises",
              value: "continue_functional_exercises"
            }
          ],
          showIf: {
            field: "therapist_notes",
            includes: "continue_current_program"
          }
        },

        {
          name: "continue_current_program_comment",
          label: "Comment",
          type: "input",
          showIf: {
            field: "therapist_notes",
            includes: "continue_current_program"
          }
        },

        // =========================
        // THERAPY PROGRESSION
        // =========================
        {
          type: "subheading",
          label: "Therapy Progression Based on Functional Level",
          showIf: {
            field: "therapist_notes",
            includes: "therapy_progression"
          }
        },

        {
          name: "therapy_progression_options",
          
          type: "checkbox-group",
          options: [
            {
              label: "Therapeutic Exercise Progression",
              value: "therapeutic_exercise_progression"
            },
            {
              label: "Functional Exercise Progression",
              value: "functional_exercise_progression"
            }
          ],
          showIf: {
            field: "therapist_notes",
            includes: "therapy_progression"
          }
        },

        {
          name: "therapy_progression_comment",
         
          type: "input",
          showIf: {
            field: "therapist_notes",
            includes: "therapy_progression"
          }
        },

        // =========================
        // REVIEW & REVISIT
        // =========================
        {
          type: "subheading",
          label: "Review and Revisit of Therapy Plan",
          showIf: {
            field: "therapist_notes",
            includes: "review_revisit_therapy"
          }
        },

        {
          name: "review_revisit_options",
         
          type: "checkbox-group",
          options: [
            {
              label: "Review Pain Management Program",
              value: "review_pain_management"
            },
            {
              label: "Review Therapeutic Exercises",
              value: "review_therapeutic_exercises"
            },
            {
              label: "Review Functional Exercises",
              value: "review_functional_exercises"
            }
          ],
          showIf: {
            field: "therapist_notes",
            includes: "review_revisit_therapy"
          }
        },

        {
          name: "review_revisit_comment",
          label: "Comment",
          type: "input",
          showIf: {
            field: "therapist_notes",
            includes: "review_revisit_therapy"
          }
        },

        // =========================
        // OTHERS
        // =========================
        {
          name: "therapist_notes_others",
          label: "Others",
          type: "input",
          showIf: {
            field: "therapist_notes",
            includes: "others"
          }
        },

        {
          name: "therapist_notes_others_comment",
          label: "Comment",
          type: "input",
          showIf: {
            field: "therapist_notes",
            includes: "others"
          }
        },
        
      ]
    }
  ]
};



const SOAP_TABS = [
  { key: "subjective",    label: "Subjective"    },
  { key: "objective",     label: "Objective"     },
 
  { key: "assessment",    label: "Assessment"    },
  { key: "plan",          label: "Plan"          },
];

const SCHEMA_MAP = {
  subjective:   SUBJECTIVE_SCHEMA,
  objective:    OBJECTIVE_SCHEMA,
 
  assessment:   ASSESSMENT_SCHEMA,
  plan:         PLAN_SCHEMA,
};

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function ConditionProgress({ patient, onBack }) {
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