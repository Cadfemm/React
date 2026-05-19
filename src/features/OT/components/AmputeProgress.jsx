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
// {
//   type: "subheading",
//   label: "Interventions Provided"
// },
// {
//   type: "subheading",
//   label: "Pre-Prosthesis Training"
// },
// {
//   name: "pre_prosthesis_therapeutic_exercises",
//   label: "Therapeutic Exercises",
//   type: "checkbox-group",
//   options: [
//     {
//       label: "Functional ROM Exercise",
//       value: "functional_rom_exercise"
//     },
//     {
//       label: "Functional Strengthening Exercise",
//       value: "functional_strengthening_exercise"
//     },
//     {
//       label: "Functional Mobility Exercise",
//       value: "functional_mobility_exercise"
//     },
//     {
//       label: "Functional Endurance Exercise",
//       value: "functional_endurance_exercise"
//     },
//     {
//       label: "Functional Balance Exercise",
//       value: "functional_balance_exercise"
//     },
//     {
//       label: "Fine Motor and Dexterity Training",
//       value: "fine_motor_dexterity_training"
//     },
//     {
//       label: "Education on Stump Management",
//       value: "education_on_stump_management"
//     },
//     {
//       label: "Sensory Desensitization",
//       value: "sensory_desensitization"
//     },
//     {
//       label: "Wheelchair Training",
//       value: "wheelchair_training"
//     },
//     {
//       label: "Education",
//       value: "education_home_program"
//     }
//   ]
// },

// /* Functional ROM Exercise */
// {
//   name: "functional_rom_exercise_remarks",
//   label: "Functional ROM Exercise Remarks",
//   type: "input",
//   placeholder: "Enter ROM exercise details",
//   showIf: {
//     field: "pre_prosthesis_therapeutic_exercises",
//     includes: "functional_rom_exercise"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Functional Strengthening Exercise */
// {
//   name: "functional_strengthening_exercise_remarks",
//   label: "Functional Strengthening Exercise Remarks",
//   type: "input",
//   placeholder: "Enter strengthening exercise details",
//   showIf: {
//     field: "pre_prosthesis_therapeutic_exercises",
//     includes: "functional_strengthening_exercise"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Functional Mobility Exercise */
// {
//   name: "functional_mobility_exercise_remarks",
//   label: "Functional Mobility Exercise Remarks",
//   type: "input",
//   placeholder: "Enter transfer / walking aids / wheelchair training details",
//   showIf: {
//     field: "pre_prosthesis_therapeutic_exercises",
//     includes: "functional_mobility_exercise"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Functional Endurance Exercise */
// {
//   name: "functional_endurance_exercise_remarks",
//   label: "Functional Endurance Exercise Remarks",
//   type: "input",
//   placeholder: "Enter endurance exercise details",
//   showIf: {
//     field: "pre_prosthesis_therapeutic_exercises",
//     includes: "functional_endurance_exercise"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Functional Balance Exercise */
// {
//   name: "functional_balance_type",
//   label: "Balance Type",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "pre_prosthesis_therapeutic_exercises",
//     includes: "functional_balance_exercise"
//   }
// },
// {
//   name: "functional_balance_exercise_remarks",
//   label: "Functional Balance Exercise Remarks",
//   type: "input",
//   placeholder: "Enter balance exercise details",
//   showIf: {
//     field: "pre_prosthesis_therapeutic_exercises",
//     includes: "functional_balance_exercise"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Fine Motor and Dexterity Training */
// {
//   name: "fine_motor_dexterity_training_remarks",
//   label: "Fine Motor and Dexterity Training Remarks",
//   type: "input",
//   placeholder: "Enter fine motor and dexterity training details",
//   showIf: {
//     field: "pre_prosthesis_therapeutic_exercises",
//     includes: "fine_motor_dexterity_training"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Education on Stump Management */
// {
//   name: "education_on_stump_management_remarks",
//   label: "Education on Stump Management Remarks",
//   type: "input",
//   placeholder: "Enter stump management education details",
//   showIf: {
//     field: "pre_prosthesis_therapeutic_exercises",
//     includes: "education_on_stump_management"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Sensory Desensitization */
// {
//   name: "sensory_desensitization_remarks",
//   label: "Sensory Desensitization Remarks",
//   type: "input",
//   placeholder: "Enter desensitization details",
//   showIf: {
//     field: "pre_prosthesis_therapeutic_exercises",
//     includes: "sensory_desensitization"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Wheelchair Training */
// {
//   name: "wheelchair_training_remarks",
//   label: "Wheelchair Training Remarks",
//   type: "input",
//   placeholder: "Enter wheelchair training details (e.g. motorized)",
//   showIf: {
//     field: "pre_prosthesis_therapeutic_exercises",
//     includes: "wheelchair_training"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Education (Home Program / Exercise) */
// {
//   name: "education_home_program_remarks",
//   label: "Education (Home Program / Exercise) Remarks",
//   type: "input",
//   placeholder: "Enter home program or exercise education details",
//   showIf: {
//     field: "pre_prosthesis_therapeutic_exercises",
//     includes: "education_home_program"
//   },
//   speechToText: true,
//   ocr: true
// },
// {
//   type: "subheading",
//   label: "Post-Prosthesis Training"
// },
// {
//   name: "post_prosthesis_therapeutic_exercises",
//   label: "Therapeutic Exercises",
//   type: "checkbox-group",
//   options: [
//     {
//       label: "Functional ROM Exercise",
//       value: "functional_rom_exercise"
//     },
//     {
//       label: "Functional Strengthening Exercise",
//       value: "functional_strengthening_exercise"
//     },
//     {
//       label: "Functional Mobility Exercise",
//       value: "functional_mobility_exercise"
//     },
//     {
//       label: "Functional Endurance Exercise",
//       value: "functional_endurance_exercise"
//     },
//     {
//       label: "Functional Balance Exercise",
//       value: "functional_balance_exercise"
//     },
//     {
//       label: "Fine Motor and Dexterity Training",
//       value: "fine_motor_dexterity_training"
//     },
//     {
//       label: "Education",
//       value: "education"
//     },
//     {
//       label: "Others",
//       value: "others"
//     }
//   ]
// },

// /* Functional ROM Exercise */
// {
//   name: "post_functional_rom_exercise_remarks",
//   label: "Functional ROM Exercise Remarks",
//   type: "input",
//   placeholder: "Enter ROM exercise details",
//   showIf: {
//     field: "post_prosthesis_therapeutic_exercises",
//     includes: "functional_rom_exercise"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Functional Strengthening Exercise */
// {
//   name: "post_functional_strengthening_exercise_remarks",
//   label: "Functional Strengthening Exercise Remarks",
//   type: "input",
//   placeholder: "Enter strengthening exercise details",
//   showIf: {
//     field: "post_prosthesis_therapeutic_exercises",
//     includes: "functional_strengthening_exercise"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Functional Mobility Exercise */
// {
//   name: "post_functional_mobility_exercise_remarks",
//   label: "Functional Mobility Exercise Remarks",
//   type: "input",
//   placeholder: "Enter transfer / walking aids / wheelchair training details",
//   showIf: {
//     field: "post_prosthesis_therapeutic_exercises",
//     includes: "functional_mobility_exercise"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Functional Endurance Exercise */
// {
//   name: "post_functional_endurance_exercise_remarks",
//   label: "Functional Endurance Exercise Remarks",
//   type: "input",
//   placeholder: "Enter endurance exercise details",
//   showIf: {
//     field: "post_prosthesis_therapeutic_exercises",
//     includes: "functional_endurance_exercise"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Functional Balance Exercise */
// {
//   name: "post_functional_balance_type",
//   label: "Balance Type",
//   type: "radio",
//   options: [
//     { label: "Static", value: "static" },
//     { label: "Dynamic", value: "dynamic" }
//   ],
//   showIf: {
//     field: "post_prosthesis_therapeutic_exercises",
//     includes: "functional_balance_exercise"
//   }
// },
// {
//   name: "post_functional_balance_exercise_remarks",
//   label: "Functional Balance Exercise Remarks",
//   type: "input",
//   placeholder: "Enter balance exercise details",
//   showIf: {
//     field: "post_prosthesis_therapeutic_exercises",
//     includes: "functional_balance_exercise"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Fine Motor and Dexterity Training */
// {
//   name: "post_fine_motor_dexterity_training_remarks",
//   label: "Fine Motor and Dexterity Training Remarks",
//   type: "input",
//   placeholder: "Enter fine motor and dexterity training details",
//   showIf: {
//     field: "post_prosthesis_therapeutic_exercises",
//     includes: "fine_motor_dexterity_training"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Education */
// {
//   name: "post_education_remarks",
//   label: "Education Remarks",
//   type: "input",
//   placeholder: "Enter education details",
//   showIf: {
//     field: "post_prosthesis_therapeutic_exercises",
//     includes: "education"
//   },
//   speechToText: true,
//   ocr: true
// },

// /* Others */
// {
//   name: "post_others_remarks",
//   label: "Others Remarks",
//   type: "input",
//   placeholder: "Enter other intervention details",
//   showIf: {
//     field: "post_prosthesis_therapeutic_exercises",
//     includes: "others"
//   },
//   speechToText: true,
//   ocr: true
// },
{
  type: "subheading",
  label: "Interventions Provided"
},
{
  type: "subheading",
  label: "Modalities used"
},

{
  name: "functional_exercise_modalities",
  // label: "Functional Exercise Modalities",
  type: "checkbox-group",
  options: [
    { label: "Chattanooga Wireless Pro", value: "chattanooga_wireless_pro" },
    { label: "Hot Pack", value: "hot_pack" },
    { label: "Cold Pack", value: "cold_pack" },
    { label: "Cryo Cuff", value: "cryo_cuff" },
    { label: "Light Force (Laser)", value: "light_force_laser" },
    { label: "Ultrasound", value: "ultrasound" },
    { label: "Vital Sign Monitor", value: "vital_sign_monitor" },
    { label: "Bobath Couch", value: "bobath_couch" },

    { label: "Shuttle Recovery", value: "shuttle_recovery" },
    { label: "Recumbent Bike", value: "recumbent_bike" },
    { label: "Upright Bike", value: "upright_bike" },
    { label: "MOTOMED", value: "motomed" },
    { label: "Rowing", value: "rowing" },
    { label: "Shoulder Pulley", value: "shoulder_pulley" },
   

    { label: "Others", value: "others" }
  ]
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
  name: "chattanooga_wireless_pro",
  label: "Chattanooga Wireless Pro",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "chattanooga_wireless_pro"
  },
  fields: [
    {
      name: "chattanooga_wireless_pro_mode",
      label: "Mode",
      type: "input",
      placeholder: "Enter mode"
    },
    {
      name: "chattanooga_wireless_pro_intensity",
      label: "Intensity",
      type: "input",
      placeholder: "Enter intensity"
    },
    {
      name: "chattanooga_wireless_pro_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "chattanooga_wireless_pro_area",
      label: "Area",
      type: "input",
      placeholder: "Enter treatment area"
    }
  ]
},
{
  type: "subheading",
  label: "Hot Pack",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "hot_pack"
  }
},
{
  name: "hot_pack",
  label: "Hot Pack",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "hot_pack"
  },
  fields: [
    {
      name: "hot_pack_area",
      label: "Area",
      type: "input",
      placeholder: "Enter treatment area"
    },
    {
      name: "hot_pack_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "hot_pack_position",
      label: "Position",
      type: "input",
      placeholder: "Enter patient position"
    }
  ]
},
{
  type: "subheading",
  label: "cold Pack",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "cold_pack"
  }
},
{
  name: "cold_pack",
  label: "Cold Pack",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "cold_pack"
  },
  fields: [
    {
      name: "cold_pack_area",
      label: "Area",
      type: "input",
      placeholder: "Enter treatment area"
    },
    {
      name: "cold_pack_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "cold_pack_position",
      label: "Position",
      type: "input",
      placeholder: "Enter patient position"
    }
  ]
},
{
  type: "subheading",
  label: "Cryo Cuff",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "cryo_cuff"
  }
},
{
  name: "cryo_cuff",
  label: "Cryo Cuff",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "cryo_cuff"
  },
  fields: [
    {
      name: "cryo_cuff_area",
      label: "Area",
      type: "input",
      placeholder: "Enter treatment area"
    },
    {
      name: "cryo_cuff_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "cryo_cuff_compression",
      label: "Compression",
      type: "input",
      placeholder: "Enter compression setting"
    }
  ]
},
{
  type: "subheading",
  label: "Light Force",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "light_force_laser"
  }
},
{
  name: "light_force_laser",
  label: "Light Force (Laser)",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "light_force_laser"
  },
  fields: [
    {
      name: "light_force_laser_mode",
      label: "Mode",
      type: "input",
      placeholder: "Enter mode"
    },
    {
      name: "light_force_laser_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "light_force_laser_area",
      label: "Area",
      type: "input",
      placeholder: "Enter treatment area"
    }
  ]
},
{
  type: "subheading",
  label: "Ultrasound",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "ultrasound"
  }
},
{
  name: "ultrasound",
  label: "Ultrasound",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "ultrasound"
  },
  fields: [
    {
      name: "ultrasound_frequency",
      label: "Frequency (MHz)",
      type: "input",
      placeholder: "Enter frequency"
    },
    {
      name: "ultrasound_mode",
      label: "Mode",
      type: "input",
      placeholder: "Continuous / Pulsed"
    },
    {
      name: "ultrasound_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "ultrasound_area",
      label: "Area",
      type: "input",
      placeholder: "Enter treatment area"
    }
  ]
},
{
  type: "subheading",
  label: "Vital Sign Monitor",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "vital_sign_monitor"
  }
},
{
  name: "vital_sign_monitor",
  label: "Vital Sign Monitor",
  type: "row",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "vital_sign_monitor"
  },
  fields: [
    {
      name: "vital_sign_monitor_pre_bp",
      label: "Pre BP (mmHg)",
      type: "input",
      placeholder: "e.g. 120/80"
    },
    {
      name: "vital_sign_monitor_pre_hr",
      label: "Pre HR (bpm)",
      type: "input",
      placeholder: "Enter heart rate"
    },
    {
      name: "vital_sign_monitor_pre_spo2",
      label: "Pre SpO₂ (%)",
      type: "input",
      placeholder: "Enter oxygen saturation"
    },
    {
      name: "vital_sign_monitor_post_bp",
      label: "Post BP (mmHg)",
      type: "input",
      placeholder: "e.g. 118/78"
    },
    {
      name: "vital_sign_monitor_post_hr",
      label: "Post HR (bpm)",
      type: "input",
      placeholder: "Enter heart rate"
    },
    {
      name: "vital_sign_monitor_post_spo2",
      label: "Post SpO₂ (%)",
      type: "input",
      placeholder: "Enter oxygen saturation"
    }
  ]
},
/* ───────── Shuttle Recovery ───────── */
{
  type: "subheading",
  label: "Shuttle Recovery",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "shuttle_recovery"
  }
},
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
    
  ]
},

/* ───────── Recumbent Bike ───────── */
{
  type: "subheading",
  label: "Recumbent Bike",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "recumbent_bike"
  }
},
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
    
  ]
},

/* ───────── Upright Bike ───────── */
{
  type: "subheading",
  label: "Upright Bike",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "upright_bike"
  }
},
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
    
  ]
},

/* ───────── Motomed ───────── */
{
  type: "subheading",
  label: "MOtomed",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "motomed"
  }
},
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
      name: "motomed_remarks",
      label: "Mode",
      type: "input",
      placeholder: "Enter remarks",
      speechToText: true,
      ocr: true
    },
    {
      name: "motomed_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    
  ]
},
/* ───────── Rowing ───────── */
{
  type: "subheading",
  label: "Rowing",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "rowing"
  }
},
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
    
  ]
},

/* ───────── Shoulder Pulley ───────── */
{
  type: "subheading",
  label: "Shoulder Pulley",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "shoulder_pulley"
  }
},
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
      label: "Sets/Reps",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    
  ]
},

/* ───────── Bobath Couch ───────── */
{
  type: "subheading",
  label: "Bobath Couch",
  showIf: {
    field: "functional_exercise_modalities",
    includes: "bobath_couch"
  }
},
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
      label: "Activity",
      type: "input",
      placeholder: "Enter exercise type"
    },
    {
      name: "bobath_couch_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    
  ]
},
/* ───────── Fibod Balance Board ───────── */

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
  label: "Pre-Prosthesis Training"
},
{
  name: "pre_prosthesis_therapeutic_exercises",
  // label: "Therapeutic Exercises",
  type: "checkbox-group",
  options: [
    {
      label: "Functional ROM Exercise",
      value: "functional_rom_exercise"
    },
    {
      label: "Functional Strengthening Exercise",
      value: "functional_strengthening_exercise"
    },
    {
      label: "Functional Mobility Exercise",
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
      label: "Wheelchair Training",
      value: "wheelchair_training"
    },
    {
      label: "Education",
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
  // label: "Therapeutic Exercises",
  type: "checkbox-group",
  options: [
    {
      label: "Functional ROM Exercise",
      value: "functional_rom_exercise"
    },
    {
      label: "Functional Strengthening Exercise",
      value: "functional_strengthening_exercise"
    },
    {
      label: "Functional Mobility Exercise",
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
  type: "radio",
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



/* =========================
   Leisure & Recreational Training
========================= */
{
  type: "subheading",
  label: "Leisure & Recreational Training"
},

{
  name: "leisure_training_items",
  // label: "Leisure & Recreational Activities",
  type: "checkbox-group",
  options: [
    { label: "Morning Walk", value: "morning_walk" },
    { label: "Indoor Games", value: "indoor_games" },
    { label: "Gardening", value: "gardening" },
    // { label: "Community Reintegration", value: "community_reintegration" },
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

// {
//   name: "leisure_training_remarks",
//   label: "Leisure & Recreational Training others",
//   type: "input",
//   placeholder: "Enter leisure and recreational training details"
// },

/* =========================
   Assistive & Adaptive Devices Prescription Plan
========================= */
{
  type: "subheading",
  label: "Assistive & Adaptive Devices Prescription Plan"
},

{
  name: "assistive_devices_prescription",
  // label: "Assistive & Adaptive Devices",
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
    // { label: "Transfer Board", value: "transfer_board" },
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
   

  ]
},

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
          {type:'input',
            name:'plan',
            label:'Plan',
          }
          

 
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