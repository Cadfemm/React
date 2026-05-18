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
 
  actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [{
    fields: [
      {
  type: "subheading",
  label: "Session Notes"
},

{
  name: "any_complaints",
  label: "Any Complaints",
  type: "input",
  placeholder: "Enter patient's complaints",
  speechToText: true,
  ocr: true
},
  { name: "History of Present", label: "History of Present Illnes", type: "input" },

{
        name: "pain_score",
        label: "Pain Score(Visual Analog Scale)",
        type: "scale-slider",

        min: 0,
        max: 10,
        ranges: [
          {
            min: 0,
            max: 1,
            label: "Mild",
            color: "#22c55e"   // green
          },
          {
            min: 1,
            max: 5,
            label: "Moderate",
            color: "#facc15"   // yellow
          },
          {
            min: 5,
            max: 10,
            label: "Severe",
            color: "#ef4444"   // red
          }
        ],
        showValue: true
      },
      {
  name: "new_finding",
  label: "New Finding",
  type: "input",
  placeholder: "Example: Wound, low mood, swelling, redness, dizziness",
  speechToText: true,
  ocr: true
},
// {
//   name: "pain_scale",
//   label: "Pain Scale (if applicable)",
//   type: "input",
//   placeholder: "Example: NRS Pain Score before / during / end of session",
//   speechToText: true,
//   ocr: true
// },


     
      
    ],
  }],
};


const OBJECTIVE_SCHEMA = {
 
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [
    {
      fields: [
{
  type: "subheading",
  label: "Interventions Provided"
},
{
  type: "subheading",
  label: "Pre-Prosthesis Training"
},
{
  name: "pre_prosthesis_therapeutic_exercises",
  label: "Therapeutic Exercises",
  type: "checkbox-group",
  options: [
    {
      label: "Functional ROM Exercise (Passive / Active / Assisted)",
      value: "functional_rom_exercise"
    },
    {
      label: "Functional Strengthening Exercise (Upper Limb / Lower Limb)",
      value: "functional_strengthening_exercise"
    },
    {
      label: "Functional Mobility Exercise (Transfer Training / Walking Aids Training / Wheelchair Training)",
      value: "functional_mobility_exercise"
    },
    {
      label: "Functional Endurance Exercise",
      value: "functional_endurance_exercise"
    },
    {
      label: "Functional Balance Exercise",
      value: "functional_balance_exercise"
    },
    {
      label: "Fine Motor and Dexterity Training",
      value: "fine_motor_dexterity_training"
    },
    {
      label: "Education on Stump Management",
      value: "education_on_stump_management"
    },
    {
      label: "Sensory Desensitization",
      value: "sensory_desensitization"
    },
    {
      label: "Wheelchair Training (e.g. Motorized)",
      value: "wheelchair_training"
    },
    {
      label: "Education (Home Program / Exercise)",
      value: "education_home_program"
    }
  ]
},

/* Functional ROM Exercise */
{
  name: "functional_rom_exercise_remarks",
  label: "Functional ROM Exercise Remarks",
  type: "input",
  placeholder: "Enter ROM exercise details",
  showIf: {
    field: "pre_prosthesis_therapeutic_exercises",
    includes: "functional_rom_exercise"
  },
  speechToText: true,
  ocr: true
},

/* Functional Strengthening Exercise */
{
  name: "functional_strengthening_exercise_remarks",
  label: "Functional Strengthening Exercise Remarks",
  type: "input",
  placeholder: "Enter strengthening exercise details",
  showIf: {
    field: "pre_prosthesis_therapeutic_exercises",
    includes: "functional_strengthening_exercise"
  },
  speechToText: true,
  ocr: true
},

/* Functional Mobility Exercise */
{
  name: "functional_mobility_exercise_remarks",
  label: "Functional Mobility Exercise Remarks",
  type: "input",
  placeholder: "Enter transfer / walking aids / wheelchair training details",
  showIf: {
    field: "pre_prosthesis_therapeutic_exercises",
    includes: "functional_mobility_exercise"
  },
  speechToText: true,
  ocr: true
},

/* Functional Endurance Exercise */
{
  name: "functional_endurance_exercise_remarks",
  label: "Functional Endurance Exercise Remarks",
  type: "input",
  placeholder: "Enter endurance exercise details",
  showIf: {
    field: "pre_prosthesis_therapeutic_exercises",
    includes: "functional_endurance_exercise"
  },
  speechToText: true,
  ocr: true
},

/* Functional Balance Exercise */
{
  name: "functional_balance_type",
  label: "Balance Type",
  type: "radio",
  options: [
    { label: "Static", value: "static" },
    { label: "Dynamic", value: "dynamic" }
  ],
  showIf: {
    field: "pre_prosthesis_therapeutic_exercises",
    includes: "functional_balance_exercise"
  }
},
{
  name: "functional_balance_exercise_remarks",
  label: "Functional Balance Exercise Remarks",
  type: "input",
  placeholder: "Enter balance exercise details",
  showIf: {
    field: "pre_prosthesis_therapeutic_exercises",
    includes: "functional_balance_exercise"
  },
  speechToText: true,
  ocr: true
},

/* Fine Motor and Dexterity Training */
{
  name: "fine_motor_dexterity_training_remarks",
  label: "Fine Motor and Dexterity Training Remarks",
  type: "input",
  placeholder: "Enter fine motor and dexterity training details",
  showIf: {
    field: "pre_prosthesis_therapeutic_exercises",
    includes: "fine_motor_dexterity_training"
  },
  speechToText: true,
  ocr: true
},

/* Education on Stump Management */
{
  name: "education_on_stump_management_remarks",
  label: "Education on Stump Management Remarks",
  type: "input",
  placeholder: "Enter stump management education details",
  showIf: {
    field: "pre_prosthesis_therapeutic_exercises",
    includes: "education_on_stump_management"
  },
  speechToText: true,
  ocr: true
},

/* Sensory Desensitization */
{
  name: "sensory_desensitization_remarks",
  label: "Sensory Desensitization Remarks",
  type: "input",
  placeholder: "Enter desensitization details",
  showIf: {
    field: "pre_prosthesis_therapeutic_exercises",
    includes: "sensory_desensitization"
  },
  speechToText: true,
  ocr: true
},

/* Wheelchair Training */
{
  name: "wheelchair_training_remarks",
  label: "Wheelchair Training Remarks",
  type: "input",
  placeholder: "Enter wheelchair training details (e.g. motorized)",
  showIf: {
    field: "pre_prosthesis_therapeutic_exercises",
    includes: "wheelchair_training"
  },
  speechToText: true,
  ocr: true
},

/* Education (Home Program / Exercise) */
{
  name: "education_home_program_remarks",
  label: "Education (Home Program / Exercise) Remarks",
  type: "input",
  placeholder: "Enter home program or exercise education details",
  showIf: {
    field: "pre_prosthesis_therapeutic_exercises",
    includes: "education_home_program"
  },
  speechToText: true,
  ocr: true
},
{
  type: "subheading",
  label: "Post-Prosthesis Training"
},
{
  name: "post_prosthesis_therapeutic_exercises",
  label: "Therapeutic Exercises",
  type: "checkbox-group",
  options: [
    {
      label: "Functional ROM Exercise (Passive / Active / Assisted)",
      value: "functional_rom_exercise"
    },
    {
      label: "Functional Strengthening Exercise (Upper Limb / Lower Limb)",
      value: "functional_strengthening_exercise"
    },
    {
      label: "Functional Mobility Exercise (Transfer Training / Walking Aids Training / Wheelchair Training)",
      value: "functional_mobility_exercise"
    },
    {
      label: "Functional Endurance Exercise",
      value: "functional_endurance_exercise"
    },
    {
      label: "Functional Balance Exercise",
      value: "functional_balance_exercise"
    },
    {
      label: "Fine Motor and Dexterity Training",
      value: "fine_motor_dexterity_training"
    },
    {
      label: "Education",
      value: "education"
    },
    {
      label: "Others",
      value: "others"
    }
  ]
},

/* Functional ROM Exercise */
{
  name: "post_functional_rom_exercise_remarks",
  label: "Functional ROM Exercise Remarks",
  type: "input",
  placeholder: "Enter ROM exercise details",
  showIf: {
    field: "post_prosthesis_therapeutic_exercises",
    includes: "functional_rom_exercise"
  },
  speechToText: true,
  ocr: true
},

/* Functional Strengthening Exercise */
{
  name: "post_functional_strengthening_exercise_remarks",
  label: "Functional Strengthening Exercise Remarks",
  type: "input",
  placeholder: "Enter strengthening exercise details",
  showIf: {
    field: "post_prosthesis_therapeutic_exercises",
    includes: "functional_strengthening_exercise"
  },
  speechToText: true,
  ocr: true
},

/* Functional Mobility Exercise */
{
  name: "post_functional_mobility_exercise_remarks",
  label: "Functional Mobility Exercise Remarks",
  type: "input",
  placeholder: "Enter transfer / walking aids / wheelchair training details",
  showIf: {
    field: "post_prosthesis_therapeutic_exercises",
    includes: "functional_mobility_exercise"
  },
  speechToText: true,
  ocr: true
},

/* Functional Endurance Exercise */
{
  name: "post_functional_endurance_exercise_remarks",
  label: "Functional Endurance Exercise Remarks",
  type: "input",
  placeholder: "Enter endurance exercise details",
  showIf: {
    field: "post_prosthesis_therapeutic_exercises",
    includes: "functional_endurance_exercise"
  },
  speechToText: true,
  ocr: true
},

/* Functional Balance Exercise */
{
  name: "post_functional_balance_type",
  label: "Balance Type",
  type: "radio",
  options: [
    { label: "Static", value: "static" },
    { label: "Dynamic", value: "dynamic" }
  ],
  showIf: {
    field: "post_prosthesis_therapeutic_exercises",
    includes: "functional_balance_exercise"
  }
},
{
  name: "post_functional_balance_exercise_remarks",
  label: "Functional Balance Exercise Remarks",
  type: "input",
  placeholder: "Enter balance exercise details",
  showIf: {
    field: "post_prosthesis_therapeutic_exercises",
    includes: "functional_balance_exercise"
  },
  speechToText: true,
  ocr: true
},

/* Fine Motor and Dexterity Training */
{
  name: "post_fine_motor_dexterity_training_remarks",
  label: "Fine Motor and Dexterity Training Remarks",
  type: "input",
  placeholder: "Enter fine motor and dexterity training details",
  showIf: {
    field: "post_prosthesis_therapeutic_exercises",
    includes: "fine_motor_dexterity_training"
  },
  speechToText: true,
  ocr: true
},

/* Education */
{
  name: "post_education_remarks",
  label: "Education Remarks",
  type: "input",
  placeholder: "Enter education details",
  showIf: {
    field: "post_prosthesis_therapeutic_exercises",
    includes: "education"
  },
  speechToText: true,
  ocr: true
},

/* Others */
{
  name: "post_others_remarks",
  label: "Others Remarks",
  type: "input",
  placeholder: "Enter other intervention details",
  showIf: {
    field: "post_prosthesis_therapeutic_exercises",
    includes: "others"
  },
  speechToText: true,
  ocr: true
},
{
  type: "subheading",
  label: "Functional Exercises (Exercise Modalities)"
},
{
  name: "functional_exercise_modalities",
  // label: "Select Exercise Modalities",
  type: "checkbox-group",
  options: [
    { label: "Shuttle Recovery", value: "shuttle_recovery" },
    { label: "Recumbent Bike", value: "recumbent_bike" },
    { label: "Upright Bike", value: "upright_bike" },
    { label: "Motomed", value: "motomed" },
    { label: "Rowing", value: "rowing" },
    { label: "Shoulder Pulley", value: "shoulder_pulley" },
    { label: "Bobath Couch", value: "bobath_couch" },
    { label: "Fibod Balance Board", value: "fibod_balance_board" },
    { label: "Others", value: "others" }
  ]
},

/* ───────── Shuttle Recovery ───────── */
// {
//   name: "shuttle_recovery_resistance",
//   label: "Shuttle Recovery - Resistance",
//   type: "input",
//   placeholder: "Enter resistance",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "shuttle_recovery"
//   }
// },
// {
//   name: "shuttle_recovery_sets_reps",
//   label: "Shuttle Recovery - Sets / Reps",
//   type: "input",
//   placeholder: "e.g. 3 sets × 10 reps",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "shuttle_recovery"
//   }
// },
// {
//   name: "shuttle_recovery_remarks",
//   label: "Shuttle Recovery Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "shuttle_recovery"
//   },
//   speechToText: true,
//   ocr: true
// },
{
  name: "shuttle_recovery",
  label: "Shuttle Recovery",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "shuttle_recovery"
  },
  fields: [
    {
      name: "shuttle_recovery_resistance",
      label: "Resistance",
      type: "input",
      placeholder: "Enter resistance"
    },
    {
      name: "shuttle_recovery_sets_reps",
      label: "Sets / Reps",
      type: "input",
      placeholder: "e.g. 3 sets × 10 reps"
    },
    {
      name: "shuttle_recovery_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},

/* ───────── Recumbent Bike ───────── */
// {
//   name: "recumbent_bike_resistance_level",
//   label: "Recumbent Bike - Resistance Level",
//   type: "input",
//   placeholder: "Enter resistance level",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "recumbent_bike"
//   }
// },
// {
//   name: "recumbent_bike_duration",
//   label: "Recumbent Bike - Duration (min)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "recumbent_bike"
//   }
// },
// {
//   name: "recumbent_bike_remarks",
//   label: "Recumbent Bike Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "recumbent_bike"
//   },
//   speechToText: true,
//   ocr: true
// },
{
  name: "recumbent_bike",
  label: "Recumbent Bike",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "recumbent_bike"
  },
  fields: [
    {
      name: "recumbent_bike_resistance_level",
      label: "Resistance Level",
      type: "input",
      placeholder: "Enter resistance level"
    },
    {
      name: "recumbent_bike_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "recumbent_bike_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},

/* ───────── Upright Bike ───────── */
// {
//   name: "upright_bike_resistance_level",
//   label: "Upright Bike - Resistance Level",
//   type: "input",
//   placeholder: "Enter resistance level",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "upright_bike"
//   }
// },
// {
//   name: "upright_bike_duration",
//   label: "Upright Bike - Duration (min)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "upright_bike"
//   }
// },
// {
//   name: "upright_bike_remarks",
//   label: "Upright Bike Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "upright_bike"
//   },
//   speechToText: true,
//   ocr: true
// },
{
  name: "upright_bike",
  label: "Upright Bike",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "upright_bike"
  },
  fields: [
    {
      name: "upright_bike_resistance_level",
      label: "Resistance Level",
      type: "input",
      placeholder: "Enter resistance level"
    },
    {
      name: "upright_bike_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "upright_bike_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},

/* ───────── Motomed ───────── */
{
  name: "motomed_limbs",
  label: "Motomed - Upper Limbs / Lower Limbs",
  type: "radio",
  options: [
    { label: "Upper Limbs", value: "upper_limbs" },
    { label: "Lower Limbs", value: "lower_limbs" }
  ],
  showIf: {
    field: "functional_exercise_modalities",
    includes: "motomed"
  }
},
// {
//   name: "motomed_duration",
//   label: "Motomed - Duration (min)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "motomed"
//   }
// },
// {
//   name: "motomed_remarks",
//   label: "Motomed Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "motomed"
//   },
//   speechToText: true,
//   ocr: true
// },

{
  name: "motomed",
  label: "Motomed",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "motomed"
  },
  fields: [
    {
      name: "motomed_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "motomed_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},
/* ───────── Rowing ───────── */
// {
//   name: "rowing_resistance_level",
//   label: "Rowing - Resistance Level",
//   type: "input",
//   placeholder: "Enter resistance level",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "rowing"
//   }
// },
// {
//   name: "rowing_duration",
//   label: "Rowing - Duration (min)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "rowing"
//   }
// },
// {
//   name: "rowing_remarks",
//   label: "Rowing Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "rowing"
//   },
//   speechToText: true,
//   ocr: true
// }
{
  name: "rowing",
  label: "Rowing",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "rowing"
  },
  fields: [
    {
      name: "rowing_resistance_level",
      label: "Resistance Level",
      type: "input",
      placeholder: "Enter resistance level"
    },
    {
      name: "rowing_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "rowing_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},

/* ───────── Shoulder Pulley ───────── */
{
  name: "shoulder_pulley_type",
  label: "Shoulder Pulley - Type (AAROM / AROM)",
  type: "radio",
  options: [
    { label: "AAROM", value: "aarom" },
    { label: "AROM", value: "arom" }
  ],
  showIf: {
    field: "functional_exercise_modalities",
    includes: "shoulder_pulley"
  }
},
// {
//   name: "shoulder_pulley_duration",
//   label: "Shoulder Pulley - Duration (min)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "shoulder_pulley"
//   }
// },
// {
//   name: "shoulder_pulley_remarks",
//   label: "Shoulder Pulley Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "shoulder_pulley"
//   },
//   speechToText: true,
//   ocr: true
// },
{
  name: "shoulder_pulley",
  label: "Shoulder Pulley",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "shoulder_pulley"
  },
  fields: [
    {
      name: "shoulder_pulley_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "shoulder_pulley_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},

/* ───────── Bobath Couch ───────── */
// {
//   name: "bobath_couch_exercise_type",
//   label: "Bobath Couch - Type of Exercise",
//   type: "input",
//   placeholder: "Enter exercise type",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "bobath_couch"
//   }
// },
// {
//   name: "bobath_couch_duration",
//   label: "Bobath Couch - Duration (min)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "bobath_couch"
//   }
// },
// {
//   name: "bobath_couch_remarks",
//   label: "Bobath Couch Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "bobath_couch"
//   },
//   speechToText: true,
//   ocr: true
// },
{
  name: "bobath_couch",
  label: "Bobath Couch",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "bobath_couch"
  },
  fields: [
    {
      name: "bobath_couch_exercise_type",
      label: "Type of Exercise",
      type: "input",
      placeholder: "Enter exercise type"
    },
    {
      name: "bobath_couch_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "bobath_couch_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},
/* ───────── Fibod Balance Board ───────── */
// {
//   name: "fibod_balance_board_exercise_type",
//   label: "Fibod Balance Board - Type of Exercise",
//   type: "input",
//   placeholder: "Enter exercise type",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "fibod_balance_board"
//   }
// },
// {
//   name: "fibod_balance_board_duration",
//   label: "Fibod Balance Board - Duration (min)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "fibod_balance_board"
//   }
// },
// {
//   name: "fibod_balance_board_repetition",
//   label: "Fibod Balance Board - Repetition",
//   type: "input",
//   placeholder: "Enter repetitions",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "fibod_balance_board"
//   }
// },
// {
//   name: "fibod_balance_board_remarks",
//   label: "Fibod Balance Board Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "functional_exercise_modalities",
//     includes: "fibod_balance_board"
//   },
//   speechToText: true,
//   ocr: true
// },
{
  name: "fibod_balance_board",
  label: "Fibod Balance Board",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "fibod_balance_board"
  },
  fields: [
    {
      name: "fibod_balance_board_exercise_type",
      label: "Type of Exercise",
      type: "input",
      placeholder: "Enter exercise type"
    },
    {
      name: "fibod_balance_board_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "fibod_balance_board_repetition",
      label: "Repetition",
      type: "input",
      placeholder: "Enter repetitions"
    },
    {
      name: "fibod_balance_board_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},
/* ───────── Others ───────── */
{
  name: "functional_exercise_other_name",
  label: "Other Exercise",
  type: "input",
  placeholder: "Enter exercise name",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "others"
  }
},
{
  name: "functional_exercise_other_remarks",
  label: "Other Exercise Remarks",
  type: "input",
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "others"
  },
  speechToText: true,
  ocr: true
},
{
  type: "subheading",
  label: "Swelling Management"
},
{
  name: "swelling_management_modalities",
 
  type: "checkbox-group",
  options: [
    { label: "Ice / Cryocuff", value: "ice_cryocuff" },
    { label: "Laser Therapy (Lightforce Laser)", value: "laser_therapy" },
    { label: "Others", value: "others" }
  ]
},

/* ─────────────────────────────
   Ice / Cryocuff
───────────────────────────── */
// {
//   name: "ice_cryocuff_body_part",
//   label: "Ice / Cryocuff - Body Part",
//   type: "input",
//   placeholder: "Enter body part",
//   showIf: {
//     field: "swelling_management_modalities",
//     includes: "ice_cryocuff"
//   }
// },
// {
//   name: "ice_cryocuff_duration",
//   label: "Ice / Cryocuff - Duration (minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "swelling_management_modalities",
//     includes: "ice_cryocuff"
//   }
// },
// {
//   name: "ice_cryocuff_remarks",
//   label: "Ice / Cryocuff Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "swelling_management_modalities",
//     includes: "ice_cryocuff"
//   },
//   speechToText: true,
//   ocr: true
// },

{
  name: "ice_cryocuff",
  label: "Ice / Cryocuff",
  type: "row",
  showIf: {
    field: "swelling_management_modalities",
    includes: "ice_cryocuff"
  },
  fields: [
    {
      name: "ice_cryocuff_body_part",
      label: "Body Part",
      type: "input",
      placeholder: "Enter body part"
    },
    {
      name: "ice_cryocuff_duration",
      label: "Duration (minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "ice_cryocuff_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},
/* ─────────────────────────────
   Laser Therapy (Lightforce Laser)
───────────────────────────── */
// {
//   name: "laser_therapy_body_parts",
//   label: "Laser Therapy - Body Parts",
//   type: "input",
//   placeholder: "Enter body parts treated",
//   showIf: {
//     field: "swelling_management_modalities",
//     includes: "laser_therapy"
//   }
// },
// {
//   name: "laser_therapy_applicator_type",
//   label: "Laser Therapy - Type of Applicator",
//   type: "input",
//   placeholder: "Enter applicator type",
//   showIf: {
//     field: "swelling_management_modalities",
//     includes: "laser_therapy"
//   }
// },
// {
//   name: "laser_therapy_power_watts",
//   label: "Laser Therapy - Power (Watts)",
//   type: "input",
//   placeholder: "Enter power in watts",
//   showIf: {
//     field: "swelling_management_modalities",
//     includes: "laser_therapy"
//   }
// },
{
  name: "laser_therapy",
  label: "Laser Therapy",
  type: "row",
  showIf: {
    field: "swelling_management_modalities",
    includes: "laser_therapy"
  },
  fields: [
    {
      name: "laser_therapy_body_parts",
      label: "Body Parts",
      type: "input",
      placeholder: "Enter body parts treated"
    },
    {
      name: "laser_therapy_applicator_type",
      label: "Type of Applicator",
      type: "input",
      placeholder: "Enter applicator type"
    },
    {
      name: "laser_therapy_power_watts",
      label: "Power (Watts)",
      type: "input",
      placeholder: "Enter power in watts"
    }
  ]
},
{
  name: "laser_therapy_mode",
  label: "Laser Therapy - Mode",
  type: "radio",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed", value: "pulsed" }
  ],
  showIf: {
    field: "swelling_management_modalities",
    includes: "laser_therapy"
  }
},
{
  name: "laser_therapy_total_energy_joules",
  label: "Laser Therapy - Total Energy (Joules)",
  type: "input",
  placeholder: "Enter total energy in joules",
  showIf: {
    field: "swelling_management_modalities",
    includes: "laser_therapy"
  }
},
{
  name: "laser_therapy_remarks",
  label: "Laser Therapy Remarks",
  type: "input",
  placeholder: "Enter remarks",
  showIf: {
    field: "swelling_management_modalities",
    includes: "laser_therapy"
  },
  speechToText: true,
  ocr: true
},

/* ─────────────────────────────
   Others
───────────────────────────── */
{
  name: "swelling_management_other_parameters",
  label: "Others - Parameters",
  type: "input",
  placeholder: "Enter other modality and parameters",
  showIf: {
    field: "swelling_management_modalities",
    includes: "others"
  },
  speechToText: true,
  ocr: true
},
{
  name: "swelling_management_other_remarks",
  label: "Others Remarks",
  type: "input",
  placeholder: "Enter remarks",
  showIf: {
    field: "swelling_management_modalities",
    includes: "others"
  },
  speechToText: true,
  ocr: true
},
{
  type: "subheading",
  label: "Pain Management"
},
{
  name: "pain_management_modalities",
  label: "Select Modalities",
  type: "checkbox-group",
  options: [
    { label: "Manual Therapy", value: "manual_therapy" },
    { label: "Heat Therapy", value: "heat_therapy" },
    { label: "Ultrasound Therapy", value: "ultrasound_therapy" },
    { label: "Ice / Cryocuff", value: "ice_cryocuff" },
    { label: "Chattanooga Wireless Pro", value: "chattanooga_wireless_pro" }
  ]
},

/* ─────────────────────────────
   Manual Therapy
───────────────────────────── */
{
  name: "manual_therapy_remarks",
  label: "Manual Therapy Remarks",
  type: "input",
  placeholder: "Enter manual therapy details and remarks",
  showIf: {
    field: "pain_management_modalities",
    includes: "manual_therapy"
  },
  speechToText: true,
  ocr: true
},

/* ─────────────────────────────
   Heat Therapy
───────────────────────────── */
{
  name: "heat_therapy",
  label: "Heat Therapy",
  type: "row",
  showIf: {
    field: "pain_management_modalities",
    includes: "heat_therapy"
  },
  fields: [
    {
      name: "heat_therapy_body_part",
      label: "Body Part",
      type: "input",
      placeholder: "Enter body part treated"
    },
    {
      name: "heat_therapy_duration",
      label: "Duration (minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "heat_therapy_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},
// {
//   name: "heat_therapy_body_part",
//   label: "Heat Therapy - Body Part",
//   type: "input",
//   placeholder: "Enter body part treated",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "heat_therapy"
//   }
// },
// {
//   name: "heat_therapy_duration",
//   label: "Heat Therapy - Duration (minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "heat_therapy"
//   }
// },
// {
//   name: "heat_therapy_remarks",
//   label: "Heat Therapy Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "heat_therapy"
//   },
//   speechToText: true,
//   ocr: true
// },

/* ─────────────────────────────
   Ultrasound Therapy
───────────────────────────── */
{
  name: "ultrasound_body_part",
  label: "Ultrasound Therapy - Body Part",
  type: "input",
  placeholder: "Enter body part treated",
  showIf: {
    field: "pain_management_modalities",
    includes: "ultrasound_therapy"
  }
},
{
  name: "ultrasound_frequency",
  label: "Ultrasound Therapy - Frequency",
  type: "radio",
  options: [
    { label: "1 MHz", value: "1_mhz" },
    { label: "3 MHz", value: "3_mhz" }
  ],
  showIf: {
    field: "pain_management_modalities",
    includes: "ultrasound_therapy"
  }
},
{
  name: "ultrasound_duty_cycle",
  label: "Ultrasound Therapy - Duty Cycle",
  type: "radio",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed", value: "pulsed" }
  ],
  showIf: {
    field: "pain_management_modalities",
    includes: "ultrasound_therapy"
  }
},
// {
//   name: "ultrasound_intensity",
//   label: "Ultrasound Therapy - Intensity (W/cm²)",
//   type: "input",
//   placeholder: "Enter intensity",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "ultrasound_therapy"
//   }
// },
// {
//   name: "ultrasound_duration",
//   label: "Ultrasound Therapy - Duration (minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "ultrasound_therapy"
//   }
// },
// {
//   name: "ultrasound_remarks",
//   label: "Ultrasound Therapy Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "ultrasound_therapy"
//   },
//   speechToText: true,
//   ocr: true
// },
{
  name: "ultrasound_therapy",
  label: "Ultrasound Therapy",
  type: "row",
  showIf: {
    field: "pain_management_modalities",
    includes: "ultrasound_therapy"
  },
  fields: [
    {
      name: "ultrasound_intensity",
      label: "Intensity (W/cm²)",
      type: "input",
      placeholder: "Enter intensity"
    },
    {
      name: "ultrasound_duration",
      label: "Duration (minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "ultrasound_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},
/* ─────────────────────────────
   Ice / Cryocuff
───────────────────────────── */
// {
//   name: "pain_ice_cryocuff_body_part",
//   label: "Ice / Cryocuff - Body Part",
//   type: "input",
//   placeholder: "Enter body part treated",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "ice_cryocuff"
//   }
// },
// {
//   name: "pain_ice_cryocuff_duration",
//   label: "Ice / Cryocuff - Duration (minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "ice_cryocuff"
//   }
// },
// {
//   name: "pain_ice_cryocuff_remarks",
//   label: "Ice / Cryocuff Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "ice_cryocuff"
//   },
//   speechToText: true,
//   ocr: true
// },

{
  name: "pain_ice_cryocuff",
  label: "Ice / Cryocuff",
  type: "row",
  showIf: {
    field: "pain_management_modalities",
    includes: "ice_cryocuff"
  },
  fields: [
    {
      name: "pain_ice_cryocuff_body_part",
      label: "Body Part",
      type: "input",
      placeholder: "Enter body part treated"
    },
    {
      name: "pain_ice_cryocuff_duration",
      label: "Duration (minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "pain_ice_cryocuff_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},
/* ─────────────────────────────
   Chattanooga Wireless Pro
───────────────────────────── */
// {
//   name: "chattanooga_body_part",
//   label: "Chattanooga Wireless Pro - Body Part",
//   type: "input",
//   placeholder: "Enter body part treated",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "chattanooga_wireless_pro"
//   }
// },
// {
//   name: "chattanooga_modes",
//   label: "Chattanooga Wireless Pro - Modes",
//   type: "input",
//   placeholder: "Enter mode(s)",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "chattanooga_wireless_pro"
//   }
// },
// {
//   name: "chattanooga_intensity",
//   label: "Chattanooga Wireless Pro - Intensity",
//   type: "input",
//   placeholder: "Enter intensity",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "chattanooga_wireless_pro"
//   }
// },
// {
//   name: "chattanooga_duration",
//   label: "Chattanooga Wireless Pro - Duration (minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "chattanooga_wireless_pro"
//   }
// },
// {
//   name: "chattanooga_remarks",
//   label: "Chattanooga Wireless Pro Remarks",
//   type: "input",
//   placeholder: "Enter remarks",
//   showIf: {
//     field: "pain_management_modalities",
//     includes: "chattanooga_wireless_pro"
//   },
//   speechToText: true,
//   ocr: true
// },
{
  name: "chattanooga_wireless_pro",
  label: "Chattanooga Wireless Pro",
  type: "row",
  showIf: {
    field: "pain_management_modalities",
    includes: "chattanooga_wireless_pro"
  },
  fields: [
    {
      name: "chattanooga_body_part",
      label: "Body Part",
      type: "input",
      placeholder: "Enter body part treated"
    },
    {
      name: "chattanooga_modes",
      label: "Modes",
      type: "input",
      placeholder: "Enter mode(s)"
    },
    {
      name: "chattanooga_intensity",
      label: "Intensity",
      type: "input",
      placeholder: "Enter intensity"
    },
    {
      name: "chattanooga_duration",
      label: "Duration (minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "chattanooga_remarks",
      label: "Remarks",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    }
  ]
},
{
  type: "subheading",
  label: "ADL and Functional Training"
},

/* =========================
   i) ADL Training
========================= */
{
  name: "adl_training_items",
  label: "ADL Training",
  type: "checkbox-group",
  options: [
    { label: "Dressing", value: "dressing" },
    { label: "Toileting", value: "toileting" },
    { label: "Eating / Feeding", value: "eating_feeding" },
    { label: "Grooming", value: "grooming" },
    { label: "Sphincter Control", value: "sphincter_control" },
    { label: "Transfers", value: "transfers" },
    {
      label: "Locomotion (Wheelchair Propelling / Walking with Aids)",
      value: "locomotion"
    }
  ]
},

{
  name: "adl_dressing_type",
  label: "Dressing Type",
  type: "checkbox-group",
  options: [
    { label: "Upper Garment", value: "upper_garment" },
    { label: "Lower Garment", value: "lower_garment" },
    { label: "Inner Garment", value: "inner_garment" }
  ],
  showIf: {
    field: "adl_training_items",
    includes: "dressing"
  }
},

{
  name: "adl_training_remarks",
  label: "ADL Training Remarks",
  type: "input",
  placeholder: "Enter ADL training details"
},

/* =========================
   ii) IADL Training
========================= */
{
  name: "iadl_training_items",
  label: "IADL Training",
  type: "checkbox-group",
  options: [
    {
      label: "Telephone / Communication Aide Training",
      value: "telephone_communication"
    },
    {
      label: "Food Preparation Simulation Training",
      value: "food_preparation_simulation"
    },
    {
      label: "Home Management Training",
      value: "home_management"
    },
    {
      label: "Medication Management",
      value: "medication_management"
    },
    {
      label: "Financial Management",
      value: "financial_management"
    },
    {
      label: "Driving Rehabilitation",
      value: "driving_rehabilitation"
    },
    {
      label: "Riding Rehabilitation",
      value: "riding_rehabilitation"
    }
  ]
},

{
  name: "iadl_training_remarks",
  label: "IADL Training Remarks",
  type: "input",
  placeholder: "Enter IADL training details"
},

/* =========================
   Leisure & Recreational Training
========================= */
{
  type: "subheading",
  label: "Leisure & Recreational Training"
},

{
  name: "leisure_training_items",
  label: "Leisure & Recreational Activities",
  type: "checkbox-group",
  options: [
    { label: "Morning Walk", value: "morning_walk" },
    { label: "Indoor Games", value: "indoor_games" },
    { label: "Gardening", value: "gardening" },
    { label: "Community Reintegration", value: "community_reintegration" },
    { label: "Others", value: "others" }
  ]
},

{
  name: "leisure_training_other",
  label: "Other Leisure Activity",
  type: "input",
  placeholder: "Specify other activity",
  showIf: {
    field: "leisure_training_items",
    includes: "others"
  }
},

{
  name: "leisure_training_remarks",
  label: "Leisure & Recreational Training Remarks",
  type: "input",
  placeholder: "Enter leisure and recreational training details"
},

/* =========================
   Assistive & Adaptive Devices Prescription Plan
========================= */
{
  type: "subheading",
  label: "Assistive & Adaptive Devices Prescription Plan"
},

{
  name: "assistive_devices_prescription",
  label: "Assistive & Adaptive Devices",
  type: "checkbox-group",
  options: [
    { label: "Splint", value: "splint" },
    { label: "Pressure Garment", value: "pressure_garment" },
    { label: "Tubigrip", value: "tubigrip" },
    { label: "Adaptive Nail Clipper", value: "adaptive_nail_clipper" },
    { label: "Lightweight Wheelchair", value: "lightweight_wheelchair" },
    { label: "Ultralightweight Wheelchair", value: "ultralightweight_wheelchair" },
    { label: "Motorised / Electric Wheelchair", value: "motorised_electric_wheelchair" },
    { label: "Commode", value: "commode" },
    { label: "Transfer Board", value: "transfer_board" },
    { label: "Others", value: "others" }
  ]
},

{
  name: "assistive_devices_other",
  label: "Other Assistive Device",
  type: "input",
  placeholder: "Specify other assistive device",
  showIf: {
    field: "assistive_devices_prescription",
    includes: "others"
  }
},

{
  name: "assistive_devices_prescription_remarks",
  label: "Assistive Devices Remarks (Sizing, Type, Details)",
  type: "input",
  placeholder: "Enter sizing, type, and additional details"
}
        /* =========================
           Therapeutic Interventions Main Selection
        ========================= */

      ]
    }
  ]
};
const ASSESSMENT_SCHEMA = {
 
 actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [{
    fields: [
    
      { name: "assessment_notes", label: "Clinical Impression / Notes", type: "input", placeholder: "Therapist assessment..." },


      {
  name: "client_progress_status",
  label: "Client Demonstrates",
  type: "checkbox-group",
  options: [
    { label: "Improvement", value: "improvement" },
    { label: "No Change", value: "no_change" },
    { label: "Decline", value: "decline" },
     { label: "With Prosthesis", value: "with_prosthesis" },
    { label: "Without Prosthesis", value: "without_prosthesis" },
    // {label:"Targeted Performance Compared to Last Session",value:'Targeted_performance'}

  ]
},
// {
//   name: "prosthesis_status",
//   label: "Performance Observed",
//   type: "checkbox-group",
//   options: [
//     { label: "With Prosthesis", value: "with_prosthesis" },
//     { label: "Without Prosthesis", value: "without_prosthesis" }
//   ]
// },
// {
//   name: "targeted_performance_notes",
//   label: "Targeted Performance Compared to Last Session",
//   type: "input",
//   placeholder: "Describe changes in targeted performance",
//   speechToText: true,
//   ocr: true
// },
{
  name: "strengths_client_benefited",
  label: "Strengths / Client Benefited (Increased Independence) Using",
  type: "input",
  placeholder: "Enter strengths and areas of increased independence",
  speechToText: true,
  ocr: true
},
{
  name: "barriers_to_performance",
  label: "Barriers to Performance / Areas of Difficulty",
  type: "input",
  placeholder: "Enter barriers and areas of difficulty",
  speechToText: true,
  ocr: true
},
{
  name: "underlying_cause",
  label: "Others / Underlying Cause",
  type: "input",
  placeholder: "Enter other contributing factors or underlying causes",
  speechToText: true,
  ocr: true
}
    ],
  }],
};

const PLAN_SCHEMA = {
  
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
  label: "Therapist Notes"
},
{
  name: "therapist_notes_adl",
  label: "Activities of Daily Living",
  type: "checkbox-group",
  options: [
    {
      label: "Improve independent Eating / Feeding",
      value: "improve_independent_eating_feeding"
    },
    {
      label: "Improve independent Bathing / Showering",
      value: "improve_independent_bathing_showering"
    },
    {
      label: "Improve independent Dressing (Upper Garment)",
      value: "improve_independent_dressing_upper_garment"
    },
    {
      label: "Improve independent Dressing (Lower Garment)",
      value: "improve_independent_dressing_lower_garment"
    },
    {
      label: "Improve independent in Grooming",
      value: "improve_independent_grooming"
    },
    {
      label: "Improve independent in Toileting",
      value: "improve_independent_toileting"
    },
    {
      label: "Improve independent in Bed Mobility",
      value: "improve_independent_bed_mobility"
    },
    {
      label: "Improve independent in Transfers (Bed)",
      value: "improve_independent_transfers_bed"
    },
    {
      label: "Improve independent in Transfers (Toilet)",
      value: "improve_independent_transfers_toilet"
    },
    {
      label: "Improve independent in Advanced Transfer (Car)",
      value: "improve_independent_advanced_transfer_car"
    },
    {
      label: "Improve independent in Advanced Transfer (Different Level)",
      value: "improve_independent_advanced_transfer_different_level"
    },
    {
      label: "Improve independent in Advanced Transfer (Ground)",
      value: "improve_independent_advanced_transfer_ground"
    },
    {
      label: "Improve independent in Locomotion / Functional Mobility (Walking)",
      value: "improve_independent_locomotion_walking"
    },
    {
      label: "Improve independent in Locomotion / Functional Mobility (Wheelchair)",
      value: "improve_independent_locomotion_wheelchair"
    },
    {
      label: "Improve independent in Stair Management",
      value: "improve_independent_stair_management"
    }
  ]
},
{
  name: "therapist_notes_adl_comments",
  label: "Comments",
  type: "input",
  placeholder: "Enter therapist comments",
  speechToText: true,
  ocr: true
},
{
  type: "subheading",
  label: "Instrumental Activities of Daily Living"
},
{
  type: "subheading",
  label: "Activities of Daily Living "
},
{
  name: "therapist_notes_iadl",
  // label: "Instrumental Activities of Daily Living",
  type: "checkbox-group",
  options: [
    {
      label: "Improve independent in Telephone Use",
      value: "improve_independent_telephone_use"
    },
    {
      label: "Improve independent in Shopping",
      value: "improve_independent_shopping"
    },
    {
      label: "Improve independent in Food Preparation",
      value: "improve_independent_food_preparation"
    },
    {
      label: "Improve independent in Housekeeping",
      value: "improve_independent_housekeeping"
    },
    {
      label: "Improve independent in Laundry",
      value: "improve_independent_laundry"
    },
    {
      label: "Improve independent in Transportation",
      value: "improve_independent_transportation"
    },
    {
      label: "Improve independent in Medication Management",
      value: "improve_independent_medication_management"
    },
    {
      label: "Improve independent in Financial Management",
      value: "improve_independent_financial_management"
    }
  ]
},
{
  name: "therapist_notes_iadl_comments",
  label: "Comments",
  type: "input",
  placeholder: "Enter therapist comments",
  speechToText: true,
  ocr: true
},
/* ─────────────────────────────────────────────────────────────
   3) Continue Current Therapy Program
   4) Functional Mobility Training
   5) Functional Exercises
   Therapist Notes Schema
───────────────────────────────────────────────────────────── */

{
  type: "subheading",
  label: "Continue Current Therapy Program"
},
{
  name: "continue_current_therapy_program_items",
  // label: "Select Applicable Items",
  type: "checkbox-group",
  options: [
    
    {
      label: "Continue Exercise Program",
      value: "continue_exercise_program"
    },
    {
      label: "Continue Pain Management",
      value: "continue_pain_management"
    },
    {
      label: "Continue Swelling Management",
      value: "continue_swelling_management"
    },
    {
      label: "Continue Desensitization Technique",
      value: "continue_desensitization_technique"
    },
    {
      label: "Continue Upper Limb Strength",
      value: "continue_upper_limb_strength"
    },
    {
      label: "Continue Lower Limb Strength",
      value: "continue_lower_limb_strength"
    },
    {
      label: "Continue ROM Exercise",
      value: "continue_rom_exercise"
    },
    {
      label: "Continue Balance Exercise",
      value: "continue_balance_exercise"
    },
    {
      label: "Continue Gait / Ambulation Training",
      value: "continue_gait_ambulation_training"
    },
    {
      label: "Continue Leisure and Recreational Training",
      value: "continue_leisure_recreational_training"
    }
  ]
},
{
  name: "continue_rom_exercise_details",
  label: "ROM Exercise Details",
  type: "input",
  placeholder: "Enter ROM exercise details",
  showIf: {
    field: "continue_current_therapy_program_items",
    includes: "continue_rom_exercise"
  },
  speechToText: true,
  ocr: true
},
{
  name: "continue_balance_exercise_details",
  label: "Balance Exercise Details",
  type: "input",
  placeholder: "Enter balance exercise details",
  showIf: {
    field: "continue_current_therapy_program_items",
    includes: "continue_balance_exercise"
  },
  speechToText: true,
  ocr: true
},
{
  name: "continue_current_therapy_program_comments",
  label: "Comments",
  type: "input",
  placeholder: "Enter comments",
  speechToText: true,
  ocr: true
},

/* ───────────────────────────────────────────────────────────── */

{
  type: "subheading",
  label: "Functional Mobility Training"
},
{
  name: "functional_mobility_training_items",
  // label: "Select Applicable Items",
  type: "checkbox-group",
  options: [
    {
      label: "Improve Transfer",
      value: "improve_transfer"
    },
    {
      label: "Improve Wheelchair Skills",
      value: "improve_wheelchair_skills"
    },
    {
      label: "Improve Ambulation With or Without Walking Aid",
      value: "improve_ambulation_with_or_without_walking_aid"
    }
  ]
},
{
  name: "functional_mobility_training_comments",
  label: "Comments",
  type: "input",
  placeholder: "Enter comments",
  speechToText: true,
  ocr: true
},

/* ───────────────────────────────────────────────────────────── */

{
  type: "subheading",
  label: "Functional Exercises"
},
{
  name: "functional_exercises_items",
  // label: "Select Applicable Items",
  type: "checkbox-group",
  options: [
    {
      label: "Continue Functional Exercise Program",
      value: "continue_functional_exercise_program"
    },
    {
      label: "Functional Exercise Progression (Review of Exercise Modalities)",
      value: "functional_exercise_progression"
    }
  ]
},
{
  name: "functional_exercises_comments",
  label: "Comments",
  type: "input",
  placeholder: "Enter comments",
  speechToText: true,
  ocr: true
},
/* ─────────────────────────────────────────────────────────────
   6) Driving / Riding (Assessment)
───────────────────────────────────────────────────────────── */
{
  type: "subheading",
  label: "Driving / Riding (Assessment)"
},
{
  name: "driving_riding_assessment_comments",
  label: "Comments",
  type: "input",
  placeholder: "Enter driving / riding assessment comments",
  speechToText: true,
  ocr: true
},

/* ─────────────────────────────────────────────────────────────
   7) Assistive & Adaptive Devices Prescription
───────────────────────────────────────────────────────────── */
{
  type: "subheading",
  label: "Assistive & Adaptive Devices Prescription"
},
{
  name: "assistive_adaptive_devices_prescription_comments",
  label: "Comments",
  type: "input",
  placeholder: "Enter assistive and adaptive devices prescription comments",
  speechToText: true,
  ocr: true
},

/* ─────────────────────────────────────────────────────────────
   8) Education
───────────────────────────────────────────────────────────── */
{
  type: "subheading",
  label: "Education"
},
{
  name: "education_items",
  
  type: "checkbox-group",
  options: [
    {
      label: "Patient Education",
      value: "patient_education"
    },
    {
      label: "Carer Training",
      value: "carer_training"
    },
    {
      label: "Others",
      value: "others"
    }
  ]
},
{
  name: "education_other_details",
  label: "Others (Specify)",
  type: "input",
  placeholder: "Enter other education details",
  showIf: {
    field: "education_items",
    includes: "others"
  },
  speechToText: true,
  ocr: true
},
{
  name: "education_comments",
  label: "Comments",
  type: "input",
  placeholder: "Enter education comments",
  speechToText: true,
  ocr: true
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