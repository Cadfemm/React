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
  // { name: "complaint", label: "Cheif Complaint", type: "input", placeholder: "Therapist assessment..." },
      { name: "History of Present", label: "History of Present Illnes", type: "input" },
{
  name: "new_finding",
  label: "New Finding",
  type: "input",
  placeholder: "Example: Wound, low mood, swelling, redness, dizziness",
  speechToText: true,
  ocr: true
},
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
  label: "Modalities"
},

{
  name: "modalities",
  label: "Modalities",
  type: "checkbox-group",
  options: [
    { label: "Motomed", value: "motomed" },
    { label: "Fesia Grasp", value: "fesia_grasp" },
    { label: "Fesia Bike", value: "fesia_bike" },
    { label: "Fesia Gait", value: "fesia_gait" },
    { label: "Robo Hand", value: "robo_hand" },
    { label: "Fluidotherapy", value: "fluidotherapy" },
    { label: "Chattanooga", value: "chattanooga" },
    { label: "Flint Rehab - FITMI", value: "flint_rehab_fitmi" },
    { label: "Flint Rehab - Music Glove", value: "flint_rehab_music_glove" },
    { label: "Saebo Stim", value: "saebo_stim" },
    { label: "Galileo", value: "galileo" },
    { label: "Recumbent Stepper", value: "recumbent_stepper" },
    { label: "Multigym", value: "multigym" },
    { label: "Tilt Table", value: "tilt_table" },
    { label: "Treadmill", value: "treadmill" },
    { label: "Ceiling Hoist", value: "ceiling_hoist" },
    { label: "Hot Pack", value: "hot_pack" },
    { label: "Cryocuff", value: "cryocuff" },
    { label: "Xcite2", value: "xcite2" },
    { label: "Sonopuls", value: "sonopuls" },
    { label: "Laser", value: "laser" },
    { label: "Syrebo Robotic Glove", value: "syrebo_robotic_glove" },
    { label: "Stella Bio", value: "stella_bio" },
    { label: "SCI Fit Step One", value: "sci_fit_step_one" },
    { label: "Ankle Motus", value: "ankle_motus" },
    { label: "Arm Motus", value: "arm_motus" },
    { label: "Others", value: "others" }
  ]
},


/* =========================
   Motomed
========================= */
{type:'subheading',label:'Motomed',showIf:{field:'modalities',includes:'Motomed'}},

{
  name: "motomed_minutes",
  label: "Motomed - Minutes",
  type: "input",
  placeholder: "Enter minutes",
  showIf: { field: "modalities", includes: "motomed" }
},

/* =========================
   Fesia Grasp
========================= */
// {
//   name: "fesia_grasp_exercise_type",
//   label: "Fesia Grasp - Type of Exercise",
//   type: "input",
//   placeholder: "Enter exercise type",
//   showIf: { field: "modalities", includes: "fesia_grasp" }
// },
// {
//   name: "fesia_grasp_minutes",
//   label: "Fesia Grasp - Minutes",
//   type: "input",
//   placeholder: "Enter minutes",
//   showIf: { field: "modalities", includes: "fesia_grasp" }
// },
{type:'subheading',label:'Fesia Grasp',showIf:{field:'modalities',includes:'fesia_grasp'}},
{
  name: "fesia_grasp",
  label: "Fesia Grasp",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "fesia_grasp"
  },
  fields: [
    {
      name: "fesia_grasp_exercise_type",
      label: "Type of Exercise",
      type: "input",
      placeholder: "Enter exercise type"
    },
    {
      name: "fesia_grasp_minutes",
      label: "Minutes",
      type: "input",
      placeholder: "Enter minutes"
    }
  ]
},

/* =========================
   Fesia Bike
========================= */
// {
//   name: "fesia_bike_exercise_type",
//   label: "Fesia Bike - Type of Exercise",
//   type: "input",
//   placeholder: "Enter exercise type",
//   showIf: { field: "modalities", includes: "fesia_bike" }
// },
// {
//   name: "fesia_bike_minutes",
//   label: "Fesia Bike - Minutes",
//   type: "input",
//   placeholder: "Enter minutes",
//   showIf: { field: "modalities", includes: "fesia_bike" }
// },
{type:'subheading',label:'Fesia Bike',showIf:{field:'modalities',includes:'fesia_bike'}},
{
  name: "fesia_bike",
  label: "Fesia Bike",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "fesia_bike"
  },
  fields: [
    {
      name: "fesia_bike_exercise_type",
      label: "Type of Exercise",
      type: "input",
      placeholder: "Enter exercise type"
    },
    {
      name: "fesia_bike_minutes",
      label: "Minutes",
      type: "input",
      placeholder: "Enter minutes"
    }
  ]
},
/* =========================
   Fesia Gait
========================= */
// {
//   name: "fesia_gait_exercise_type",
//   label: "Fesia Gait - Type of Exercise",
//   type: "input",
//   placeholder: "Enter exercise type",
//   showIf: { field: "modalities", includes: "fesia_gait" }
// },
// {
//   name: "fesia_gait_minutes",
//   label: "Fesia Gait - Minutes",
//   type: "input",
//   placeholder: "Enter minutes",
//   showIf: { field: "modalities", includes: "fesia_gait" }
// },
{type:'subheading',label:'Fesia Gait',showIf:{field:'modalities',includes:'fesia_gait'}},
{
  name: "fesia_gait",
  label: "Fesia Gait",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "fesia_gait"
  },
  fields: [
    {
      name: "fesia_gait_exercise_type",
      label: "Type of Exercise",
      type: "input",
      placeholder: "Enter exercise type"
    },
    {
      name: "fesia_gait_minutes",
      label: "Minutes",
      type: "input",
      placeholder: "Enter minutes"
    }
  ]
},

/* =========================
   Robo Hand
========================= */
// {
//   name: "robo_hand_exercise_type",
//   label: "Robo Hand - Type of Exercise",
//   type: "input",
//   placeholder: "Enter exercise type",
//   showIf: { field: "modalities", includes: "robo_hand" }
// },
// {
//   name: "robo_hand_minutes",
//   label: "Robo Hand - Minutes",
//   type: "input",
//   placeholder: "Enter minutes",
//   showIf: { field: "modalities", includes: "robo_hand" }
// },
{
  type: "subheading",
  label: "Robo Hand Parameters",
  showIf: {
    field: "modalities",
    includes: "robo_hand"
  }
},
{
  name: "robo_hand",
  label: "Robo Hand",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "robo_hand"
  },
  fields: [
    {
      name: "robo_hand_exercise_type",
      label: "Type of Exercise",
      type: "input",
      placeholder: "Enter exercise type"
    },
    {
      name: "robo_hand_minutes",
      label: "Minutes",
      type: "input",
      placeholder: "Enter minutes"
    }
  ]
},

/* =========================
   Fluidotherapy
========================= */
// {
//   name: "fluidotherapy_temperature",
//   label: "Fluidotherapy - Temperature",
//   type: "input",
//   placeholder: "Enter temperature",
//   showIf: { field: "modalities", includes: "fluidotherapy" }
// },
// {
//   name: "fluidotherapy_minutes",
//   label: "Fluidotherapy - Minutes",
//   type: "input",
//   placeholder: "Enter minutes",
//   showIf: { field: "modalities", includes: "fluidotherapy" }
// },
{
  type: "subheading",
  label: "Fluidotherapy Parameters",
  showIf: {
    field: "modalities",
    includes: "fluidotherapy"
  }
},
{
  name: "fluidotherapy",
  label: "Fluidotherapy",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "fluidotherapy"
  },
  fields: [
    {
      name: "fluidotherapy_temperature",
      label: "Temperature",
      type: "input",
      placeholder: "Enter temperature"
    },
    {
      name: "fluidotherapy_minutes",
      label: "Minutes",
      type: "input",
      placeholder: "Enter minutes"
    }
  ]
},

/* =========================
   Chattanooga
========================= */
// {
//   name: "chattanooga_body_region",
//   label: "Chattanooga - Body Region",
//   type: "input",
//   placeholder: "Enter body region",
//   showIf: { field: "modalities", includes: "chattanooga" }
// },
// {
//   name: "chattanooga_hz",
//   label: "Chattanooga - Hz",
//   type: "input",
//   placeholder: "Enter frequency (Hz)",
//   showIf: { field: "modalities", includes: "chattanooga" }
// },
// {
//   name: "chattanooga_ma",
//   label: "Chattanooga - mA",
//   type: "input",
//   placeholder: "Enter intensity (mA)",
//   showIf: { field: "modalities", includes: "chattanooga" }
// },
// {
//   name: "chattanooga_minutes",
//   label: "Chattanooga - Minutes",
//   type: "input",
//   placeholder: "Enter minutes",
//   showIf: { field: "modalities", includes: "chattanooga" }
// },
{
  type: "subheading",
  label: "Chattanooga",
  showIf: {
    field: "modalities",
    includes: "chattanooga"
  }
},
{
  name: "chattanooga",
  label: "Chattanooga (Wireless Pro)",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "chattanooga"
  },
  fields: [
    
    {
      name: "chattanooga_body_region",
      label: "Body Region",
      type: "input",
      placeholder: "Enter body region"
    },
    {
      name: "chattanooga_hz",
      label: "Hz",
      type: "input",
      placeholder: "Enter frequency (Hz)"
    },
    {
      name: "chattanooga_ma",
      label: "mA",
      type: "input",
      placeholder: "Enter intensity (mA)"
    },
    {
      name: "chattanooga_minutes",
      label: "Minutes",
      type: "input",
      placeholder: "Enter minutes"
    }
  ]
},
{
  type: "subheading",
  label: "Flint Rehab",
  showIf: {
    field: "modalities",
    includes: "flint_rehab_music_glove"
  }
},
{
  name: "flint_rehab_music_glove",
  label: "Flint Rehab - Music Glove",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "flint_rehab_music_glove"
  },
  fields: [
    {
      name: "music_glove_region",
      label: "Region",
      type: "input",
      placeholder: "Enter region"
    },
    {
      name: "music_glove_difficulty",
      label: "Difficulty Level / Speed",
      type: "input",
      placeholder: "Enter difficulty level or speed"
    },
    {
      name: "music_glove_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    }
  ]
},
// {
//   name: "music_glove_region",
//   label: "Music Glove - Region",
//   type: "input",
//   showIf: {
//     field: "modalities",
//     includes: "flint_rehab_music_glove"
//   }
// },
// {
//   name: "music_glove_difficulty",
//   label: "Difficulty Level / Speed",
//   type: "input",
//   showIf: {
//     field: "modalities",
//     includes: "flint_rehab_music_glove"
//   }
// },
// {
//   name: "music_glove_duration",
//   label: "Duration (Minutes)",
//   type: "input",
//   showIf: {
//     field: "modalities",
//     includes: "flint_rehab_music_glove"
//   }
// },
// {
//   name: "saebo_body_region",
//   label: "Saebo Stim - Body Region",
//   type: "input",
//   showIf: {
//     field: "modalities",
//     includes: "saebo_stim"
//   }
// },
// {
//   name: "saebo_duration",
//   label: "Duration (Minutes)",
//   type: "input",
//   showIf: {
//     field: "modalities",
//     includes: "saebo_stim"
//   }
// },
{type: "subheading", label: "Saebo Stim", showIf: {field: "modalities", includes: "saebo_stim"}},
{
  name: "saebo_stim",
  label: "Saebo Stim",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "saebo_stim"
  },
  fields: [
    {
      name: "saebo_body_region",
      label: "Body Region",
      type: "input",
      placeholder: "Enter body region"
    },
    {
      name: "saebo_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    }
  ]
},
// {

//   name: "fitmi_exercise_type",
//   label: "FITMI - Type of Exercise",
//   type: "input",
//   showIf: {
//     field: "modalities",
//     includes: "flint_rehab_fitmi"
//   }
// },
// {
//   name: "fitmi_repetition",
//   label: "FITMI - Repetition",
//   type: "input",
//   showIf: {
//     field: "modalities",
//     includes: "flint_rehab_fitmi"
//   }
// },
// {
//   name: "fitmi_duration_minutes",
//   label: "FITMI - Duration (Minutes)",
//   type: "input",
//   showIf: {
//     field: "modalities",
//     includes: "flint_rehab_fitmi"
//   }
// },
{type: "subheading", label: "FITMI", showIf: {field: "modalities", includes: "flint_rehab_fitmi"}},

{
  name: "flint_rehab_fitmi",
  label: "Flint Rehab - FITMI",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "flint_rehab_fitmi"
  },
  fields: [
    {
      name: "fitmi_exercise_type",
      label: "Type of Exercise",
      type: "input",
      placeholder: "Enter type of exercise"
    },
    {
      name: "fitmi_repetition",
      label: "Repetition",
      type: "input",
      placeholder: "Enter repetition"
    },
    {
      name: "fitmi_duration_minutes",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    }
  ]
},
/* =========================
   Tilt Table
========================= */
// {
//   name: "tilt_table_duration",
//   label: "Tilt Table - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "tilt_table"
//   }
// },
// {
//   name: "tilt_table_angle",
//   label: "Tilt Table - Angle (Degrees)",
//   type: "input",
//   placeholder: "Enter tilt angle",
//   showIf: {
//     field: "modalities",
//     includes: "tilt_table"
//   }
// },
{
  name: "tilt_table",
  label: "Tilt Table",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "tilt_table"
  },
  fields: [
    {
      name: "tilt_table_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "tilt_table_angle",
      label: "Angle (Degrees)",
      type: "input",
      placeholder: "Enter tilt angle"
    }
  ]
},
// {
//   name: "galileo_duration",
//   label: "Galileo - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "galileo"
//   }
// },
// {
//   name: "galileo_frequency",
//   label: "Galileo - Frequency",
//   type: "input",
//   placeholder: "Enter frequency",
//   showIf: {
//     field: "modalities",
//     includes: "galileo"
//   }
// },
{type:'subheading',label:'Galileo',showIf:{field:'modalities',includes:'galileo'}},
{
  name: "galileo",
  label: "Galileo",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "galileo"
  },
  fields: [
    {
      name: "galileo_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "galileo_frequency",
      label: "Frequency",
      type: "input",
      placeholder: "Enter frequency"
    }
  ]
},
/* =========================
   Recumbent Stepper
========================= */
// {
//   name: "recumbent_stepper_duration",
//   label: "Recumbent Stepper - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "recumbent_stepper"
//   }
// },
// {
//   name: "recumbent_stepper_resistance",
//   label: "Recumbent Stepper - Difficulty / Resistance",
//   type: "input",
//   placeholder: "Enter resistance or difficulty level",
//   showIf: {
//     field: "modalities",
//     includes: "recumbent_stepper"
//   }
// },
{
  name: "recumbent_stepper",
  label: "Recumbent Stepper",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "recumbent_stepper"
  },
  fields: [
    {
      name: "recumbent_stepper_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "recumbent_stepper_resistance",
      label: "Difficulty / Resistance",
      type: "input",
      placeholder: "Enter resistance or difficulty level"
    }
  ]
},

/* =========================
   Multigym
========================= */
{
  name: "multigym_details",
  label: "Multigym",
  type: "input",
  placeholder: "Enter multigym exercises / parameters / remarks",
  showIf: {
    field: "modalities",
    includes: "multigym"
  }
},

/* =========================
   Treadmill
========================= */
// {
//   name: "treadmill_duration",
//   label: "Treadmill - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "treadmill"
//   }
// },
// {
//   name: "treadmill_speed_difficulty",
//   label: "Treadmill - Difficulty Level / Speed",
//   type: "input",
//   placeholder: "Enter speed or difficulty level",
//   showIf: {
//     field: "modalities",
//     includes: "treadmill"
//   }
// },
{
  name: "treadmill",
  label: "Treadmill - Speed & Duration",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "treadmill"
  },
  fields: [
    {
      name: "treadmill_speed_difficulty",
      label: "Speed / Difficulty Level",
      type: "input",
      placeholder: "Enter speed or difficulty level"
    },
    {
      name: "treadmill_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    }
  ]
},
/* =========================
   Xcite2
========================= */
// {
//   name: "xcite2_duration",
//   label: "Xcite2 - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "xcite2"
//   }
// },
// {
//   name: "xcite2_mode",
//   label: "Xcite2 - Mode",
//   type: "input",
//   placeholder: "Enter mode",
//   showIf: {
//     field: "modalities",
//     includes: "xcite2"
//   }
// },
// {
//   name: "xcite2_frequency",
//   label: "Xcite2 - Frequency",
//   type: "input",
//   placeholder: "Enter frequency",
//   showIf: {
//     field: "modalities",
//     includes: "xcite2"
//   }
// },
{
  name: "xcite2",
  label: "Xcite2",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "xcite2"
  },
  fields: [
    {
      name: "xcite2_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "xcite2_mode",
      label: "Mode",
      type: "input",
      placeholder: "Enter mode"
    },
    {
      name: "xcite2_frequency",
      label: "Frequency",
      type: "input",
      placeholder: "Enter frequency"
    }
  ]
},
// {
//   name: "sonopuls_duration",
//   label: "Sonopuls - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "sonopuls"
//   }
// },
// {
//   name: "sonopuls_placement",
//   label: "Sonopuls - Placement",
//   type: "input",
//   placeholder: "Enter treatment placement / body area",
//   showIf: {
//     field: "modalities",
//     includes: "sonopuls"
//   }
// },
{
  name: "sonopuls",
  label: "Sonopuls",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "sonopuls"
  },
  fields: [
    {
      name: "sonopuls_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "sonopuls_placement",
      label: "Placement",
      type: "input",
      placeholder: "Enter treatment placement / body area"
    }
  ]
},
/* =========================
   Hot Pack
========================= */

{
  name: "hot_pack",
  label: "Hot Pack",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "hot_pack"
  },
  fields: [
    {
      name: "hot_pack_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "hot_pack_placement",
      label: "Placement",
      type: "input",
      placeholder: "Enter treatment placement / body area"
    }
  ]
},
// {
//   name: "hot_pack_duration",
//   label: "Hot Pack - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "hot_pack"
//   }
// },
// {
//   name: "hot_pack_placement",
//   label: "Hot Pack - Placement",
//   type: "input",
//   placeholder: "Enter treatment placement / body area",
//   showIf: {
//     field: "modalities",
//     includes: "hot_pack"
//   }
// },

/* =========================
   Cryocuff
========================= */
// {
//   name: "cryocuff_duration",
//   label: "Cryocuff - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "cryocuff"
//   }
// },
// {
//   name: "cryocuff_placement",
//   label: "Cryocuff - Placement",
//   type: "input",
//   placeholder: "Enter treatment placement / body area",
//   showIf: {
//     field: "modalities",
//     includes: "cryocuff"
//   }
// },
{
  name: "cryocuff",
  label: "Cryocuff",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "cryocuff"
  },
  fields: [
    {
      name: "cryocuff_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "cryocuff_placement",
      label: "Placement",
      type: "input",
      placeholder: "Enter treatment placement / body area"
    }
  ]
},

/*
/* =========================
   Laser
========================= */
{
  name: "laser",
  label: "Laser",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "laser"
  },
  fields: [
    {
      name: "laser_duration",
      label: "Duration (Minutes)",
      type: "input",
      placeholder: "Enter duration in minutes"
    },
    {
      name: "laser_frequency",
      label: "Frequency",
      type: "input",
      placeholder: "Enter frequency"
    }
  ]
},
// {
//   name: "laser_duration",
//   label: "Laser - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "laser"
//   }
// },
// {
//   name: "laser_frequency",
//   label: "Laser - Frequency",
//   type: "input",
//   placeholder: "Enter frequency",
//   showIf: {
//     field: "modalities",
//     includes: "laser"
//   }
// },

/* =========================
   Syrebo Robotic Glove
========================= */
{
  name: "syrebo_robotic_glove",
  label: "Syrebo Robotic Glove",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "syrebo_robotic_glove"
  },
  fields: [
    {
      name: "syrebo_robotic_glove_mode",
      label: "Mode",
      type: "input",
      placeholder: "Enter mode"
    },
    {
      name: "syrebo_robotic_glove_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Minutes"
    }
  ]
},
// {
//   name: "syrebo_robotic_glove_duration",
//   label: "Syrebo Robotic Glove - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "syrebo_robotic_glove"
//   }
// },
// {
//   name: "syrebo_robotic_glove_mode",
//   label: "Syrebo Robotic Glove - Mode",
//   type: "input",
//   placeholder: "Enter mode",
//   showIf: {
//     field: "modalities",
//     includes: "syrebo_robotic_glove"
//   }
// },

/* =========================
   Stella Bio
========================= */
// {
//   name: "stella_bio_duration",
//   label: "Stella Bio - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "stella_bio"
//   }
// },
// {
//   name: "stella_bio_mode",
//   label: "Stella Bio - Mode",
//   type: "input",
//   placeholder: "Enter mode",
//   showIf: {
//     field: "modalities",
//     includes: "stella_bio"
//   }
// },
// {
//   name: "stella_bio_frequency",
//   label: "Stella Bio - Frequency",
//   type: "input",
//   placeholder: "Enter frequency",
//   showIf: {
//     field: "modalities",
//     includes: "stella_bio"
//   }
// },
{
  name: "stella_bio",
  label: "Stella Bio",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "stella_bio"
  },
  fields: [
    {
      name: "stella_bio_mode",
      label: "Mode",
      type: "input",
      placeholder: "Enter mode"
    },
    {
      name: "stella_bio_frequency",
      label: "Frequency",
      type: "input",
      placeholder: "Enter frequency"
    },
    {
      name: "stella_bio_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Minutes"
    }
  ]
},
/* =========================
   SCI Fit Step One
========================= */
{
  name: "sci_fit_step_one",
  label: "SCI Fit Step One",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "sci_fit_step_one"
  },
  fields: [
    {
      name: "sci_fit_step_one_difficulty_resistance",
      label: "Difficulty / Resistance",
      type: "input",
      placeholder: "Enter difficulty or resistance level"
    },
    {
      name: "sci_fit_step_one_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Minutes"
    }
  ]
},
// {
//   name: "sci_fit_step_one_duration",
//   label: "SCI Fit Step One - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "sci_fit_step_one"
//   }
// },
// {
//   name: "sci_fit_step_one_difficulty_resistance",
//   label: "SCI Fit Step One - Difficulty / Resistance",
//   type: "input",
//   placeholder: "Enter difficulty or resistance level",
//   showIf: {
//     field: "modalities",
//     includes: "sci_fit_step_one"
//   }
// },

/* =========================
   Ankle Motus
========================= */
// {
//   name: "ankle_motus_duration",
//   label: "Ankle Motus - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "ankle_motus"
//   }
// },
// {
//   name: "ankle_motus_mode",
//   label: "Ankle Motus - Mode",
//   type: "input",
//   placeholder: "Enter mode",
//   showIf: {
//     field: "modalities",
//     includes: "ankle_motus"
//   }
// },
{
  name: "ankle_motus",
  label: "Ankle Motus",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "ankle_motus"
  },
  fields: [
    {
      name: "ankle_motus_mode",
      label: "Mode",
      type: "input",
      placeholder: "Enter mode"
    },
    {
      name: "ankle_motus_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Minutes"
    }
  ]
},

/* =========================
   Arm Motus
========================= */
// {
//   name: "arm_motus_duration",
//   label: "Arm Motus - Duration (Minutes)",
//   type: "input",
//   placeholder: "Enter duration in minutes",
//   showIf: {
//     field: "modalities",
//     includes: "arm_motus"
//   }
// },
// {
//   name: "arm_motus_mode",
//   label: "Arm Motus - Mode",
//   type: "input",
//   placeholder: "Enter mode",
//   showIf: {
//     field: "modalities",
//     includes: "arm_motus"
//   }
// },
{
  name: "arm_motus",
  label: "Arm Motus",
  type: "row",
  showIf: {
    field: "modalities",
    includes: "arm_motus"
  },
  fields: [
    {
      name: "arm_motus_mode",
      label: "Mode",
      type: "input",
      placeholder: "Enter mode"
    },
    {
      name: "arm_motus_duration",
      label: "Duration (min)",
      type: "input",
      placeholder: "Minutes"
    }
  ]
},
/* =========================
   Others
========================= */
{
  name: "modalities_other",
  label: "Other Modality",
  type: "input",
  placeholder: "Specify other modality",
  showIf: { field: "modalities", includes: "others" }
},
{
  name: "therapeutic_exercises",
  label: "Therapeutic Exercises",
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
      label: "Muscle Tone Management",
      value: "muscle_tone_management"
    },
    {
      label: "Fine Motor and Dexterity Training",
      value: "fine_motor_and_dexterity_training"
    },
    {
      label: "Bobath/NDT Therapy",
      value: "bobath_ndt_therapy"
    },
    {
      label: "Trunk and Core Control Training",
      value: "trunk_and_core_control_training"
    },
    {
      label: "Lower Limbs Activity Training",
      value: "lower_limbs_activity_training"
    },
    {
      label: "Endurance / Cardiovascular Training",
      value: "endurance_cardiovascular_training"
    },
    {
      label: "Balance Training",
      value: "balance_training"
    },
    {
      label: "Others",
      value: "others"
    }
  ]
},

// Bobath/NDT Therapy sub-options
{
  name: "bobath_ndt_regions",
  label: "Bobath/NDT Therapy - Choose Region",
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
    field: "therapeutic_exercises",
    includes: "bobath_ndt_therapy"
  }
},

// Others free text
{
  name: "therapeutic_exercises_others",
  label: "Others (Specify)",
  type: "input",
  placeholder: "Enter other therapeutic exercises",
  showIf: {
    field: "therapeutic_exercises",
    includes: "others"
  }
},
{
  name: "adl_functional_training",
  label: "ADL and Functional Training",
  type: "checkbox-group",
  options: [
    {
      label: "ADL Training",
      value: "adl_training"
    },
    {
      label: "IADL Training",
      value: "iadl_training"
    },
    {
      label: "Driving Rehabilitation",
      value: "driving_rehabilitation"
    },
    {
      label: "Riding Rehabilitation",
      value: "riding_rehabilitation"
    },
    {
      label: "Others",
      value: "others"
    }
  ]
},

/* ===================== ADL TRAINING ===================== */
{
  name: "adl_training_items",
  label: "ADL Training Activities",
  type: "checkbox-group",
  options: [
    { label: "Eating/Feeding", value: "eating_feeding" },
    { label: "Bathing/Showering Simulation", value: "bathing_showering_simulation" },
    { label: "Dressing (UG/LG/Inner Garment/Socks/Shoes)", value: "dressing" },
    { label: "Grooming", value: "grooming" },
    { label: "Toileting Simulation", value: "toileting_simulation" },
    { label: "Sphincter Control", value: "sphincter_control" },
    { label: "Bed Mobility", value: "bed_mobility" },
    { label: "Transfers (Bed)", value: "transfers_bed" },
    { label: "Transfers (Toilet)", value: "transfers_toilet" },
    { label: "Advanced Transfer (Car)", value: "advanced_transfer_car" },
    { label: "Advanced Transfer (Ground)", value: "advanced_transfer_ground" },
    {
      label: "Locomotion/Functional Mobility (Walking/Wheelchair Training)",
      value: "locomotion_functional_mobility"
    },
    { label: "Stair Training", value: "stair_training" }
  ],
  showIf: {
    field: "adl_functional_training",
    includes: "adl_training"
  }
},

/* ===================== IADL TRAINING ===================== */
{
  name: "iadl_training_items",
  label: "IADL Training Activities",
  type: "checkbox-group",
  options: [
    { label: "Telephone Use", value: "telephone_use" },
    { label: "Shopping", value: "shopping" },
    { label: "Food Preparation", value: "food_preparation" },
    { label: "Housekeeping", value: "housekeeping" },
    { label: "Laundry", value: "laundry" },
    { label: "Mode of Transportation", value: "mode_of_transportation" },
    { label: "Medication Management", value: "medication_management" },
    { label: "Financial Management", value: "financial_management" }
  ],
  showIf: {
    field: "adl_functional_training",
    includes: "iadl_training"
  }
},

/* ===================== DRIVING REHABILITATION ===================== */
{
  name: "driving_rehabilitation_items",
  label: "Driving Rehabilitation Activities",
  type: "checkbox-group",
  options: [
    { label: "Off-road Driving", value: "off_road_driving" },
    { label: "On-road Driving", value: "on_road_driving" }
  ],
  showIf: {
    field: "adl_functional_training",
    includes: "driving_rehabilitation"
  }
},

/* ===================== RIDING REHABILITATION ===================== */
// {
//   name: "riding_rehabilitation_details",
//   label: "Riding Rehabilitation Details",
//   type: "input",
//   placeholder: "Enter riding rehabilitation details",
//   rows: 3,
//   showIf: {
//     field: "adl_functional_training",
//     includes: "riding_rehabilitation"
//   }
// },

/* ===================== OTHERS ===================== */
{
  name: "adl_functional_training_others",
  label: "Others (Specify)",
  type: "input",
  placeholder: "Enter other ADL and functional training activities",
  showIf: {
    field: "adl_functional_training",
    includes: "others"
  }
},
{
  name: "assistive_adaptive_devices",
  label: "Assistive & Adaptive Devices",
  type: "checkbox-group",
  options: [
    { label: "Splint", value: "splint" },
    { label: "Pressure Garment", value: "pressure_garment" },
    { label: "Tubigrip", value: "tubigrip" },
    { label: "Adaptive Nail Clipper", value: "adaptive_nail_clipper" },
    { label: "Lightweight Wheelchair", value: "lightweight_wheelchair" },
    { label: "Ultralight Weight Wheelchair", value: "ultralight_weight_wheelchair" },
    { label: "Motorised Wheelchair", value: "motorised_wheelchair" },
    { label: "Commode Chair / Commode Wheelchair", value: "commode_chair_wheelchair" },
    { label: "Cushion (Air/Foam/Gel)", value: "cushion" },
    { label: "Palmar Pocket", value: "palmar_pocket" },
    { label: "Transfer Board", value: "transfer_board" },
    { label: "Others", value: "others" }
  ]
},

/* ===================== SPLINT ===================== */
{
  name: "splint_details",
  label: "Splint Details",
  type: "input",
  placeholder: "Enter splint details",
  showIf: {
    field: "assistive_adaptive_devices",
    includes: "splint"
  }
},

/* ===================== PRESSURE GARMENT ===================== */
{
  name: "pressure_garment_details",
  label: "Pressure Garment Details",
  type: "input",
  placeholder: "Enter pressure garment details",
  showIf: {
    field: "assistive_adaptive_devices",
    includes: "pressure_garment"
  }
},

/* ===================== LIGHTWEIGHT WHEELCHAIR ===================== */
{
  name: "lightweight_wheelchair_details",
  label: "Lightweight Wheelchair Details",
  type: "input",
  placeholder: "Enter lightweight wheelchair details",
  showIf: {
    field: "assistive_adaptive_devices",
    includes: "lightweight_wheelchair"
  }
},
// {
//   name: "lightweight_wheelchair_link",
//   label: "TRRC Rehabilitation Equipment",
//   type: "link",
//   url: "/trrc-rehabilitation-equipment",
//   text: "View TRRC Rehabilitation Equipment",
//   showIf: {
//     field: "assistive_adaptive_devices",
//     includes: "lightweight_wheelchair"
//   }
// },

/* ===================== ULTRALIGHT WEIGHT WHEELCHAIR ===================== */
{
  name: "ultralight_weight_wheelchair_details",
  label: "Ultralight Weight Wheelchair Details",
  type: "input",
  placeholder: "Enter ultralight weight wheelchair details",
  showIf: {
    field: "assistive_adaptive_devices",
    includes: "ultralight_weight_wheelchair"
  }
},
// {
//   name: "ultralight_weight_wheelchair_link",
//   label: "TRRC Rehabilitation Equipment",
//   type: "link",
//   url: "/trrc-rehabilitation-equipment",
//   text: "View TRRC Rehabilitation Equipment",
//   showIf: {
//     field: "assistive_adaptive_devices",
//     includes: "ultralight_weight_wheelchair"
//   }
// },

/* ===================== MOTORISED WHEELCHAIR ===================== */
{
  name: "motorised_wheelchair_details",
  label: "Motorised Wheelchair Details",
  type: "input",
  placeholder: "Enter motorised wheelchair details",
  showIf: {
    field: "assistive_adaptive_devices",
    includes: "motorised_wheelchair"
  }
},
// {
//   name: "motorised_wheelchair_link",
//   label: "TRRC Rehabilitation Equipment",
//   type: "link",
//   url: "/trrc-rehabilitation-equipment",
//   text: "View TRRC Rehabilitation Equipment",
//   showIf: {
//     field: "assistive_adaptive_devices",
//     includes: "motorised_wheelchair"
//   }
// },

/* ===================== COMMODE CHAIR / WHEELCHAIR ===================== */
{
  name: "commode_chair_wheelchair_details",
  label: "Commode Chair / Commode Wheelchair Details",
  type: "input",
  placeholder: "Enter commode chair/wheelchair details",
  showIf: {
    field: "assistive_adaptive_devices",
    includes: "commode_chair_wheelchair"
  }
},

/* ===================== CUSHION ===================== */
{
  name: "cushion_details",
  label: "Cushion Details (Air/Foam/Gel)",
  type: "input",
  placeholder: "Enter cushion details",
  showIf: {
    field: "assistive_adaptive_devices",
    includes: "cushion"
  }
},
// {
//   name: "cushion_link",
//   label: "TRRC Rehabilitation Equipment",
//   type: "link",
//   url: "/trrc-rehabilitation-equipment",
//   text: "View TRRC Rehabilitation Equipment",
//   showIf: {
//     field: "assistive_adaptive_devices",
//     includes: "cushion"
//   }
// },

/* ===================== TRANSFER BOARD ===================== */
{
  name: "transfer_board_details",
  label: "Transfer Board Details",
  type: "input",
  placeholder: "Enter transfer board details",
  showIf: {
    field: "assistive_adaptive_devices",
    includes: "transfer_board"
  }
},

/* ===================== OTHERS ===================== */
{
  name: "assistive_adaptive_devices_others",
  label: "Others (Specify)",
  type: "input",
  placeholder: "Enter other assistive and adaptive devices",
  showIf: {
    field: "assistive_adaptive_devices",
    includes: "others"
  }
},
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
  name: "client_progress",
  label: "Client Demonstrates",
  type: "radio",
  options: [
    { label: "Improvement", value: "improvement" },
    { label: "No Change", value: "no_change" },
    { label: "Decline", value: "decline" }
  ]
},

{
  name: "progress_adls",
  label: "ADLs",
  type: "input",
  placeholder: "Enter progress in activities of daily living",
  speechToText: true,
  ocr: true
},

{
  name: "progress_iadls",
  label: "IADLs",
  type: "input",
  placeholder: "Enter progress in instrumental activities of daily living",
  speechToText: true,
  ocr: true
},

{
  name: "progress_wheelchair_skills",
  label: "Wheelchair Skills",
  type: "input",
  placeholder: "Enter progress in wheelchair skills",
  speechToText: true,
  ocr: true
},

{
  name: "progress_transfers",
  label: "Transfers",
  type: "input",
  placeholder: "Enter progress in transfer abilities",
  speechToText: true,
  ocr: true
},

{
  name: "progress_driving",
  label: "Driving",
  type: "input",
  placeholder: "Enter progress in driving rehabilitation",
  speechToText: true,
  ocr: true
},

{
  name: "progress_riding",
  label: "Riding",
  type: "input",
  placeholder: "Enter progress in riding rehabilitation",
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
  name: "continue_rehabilitation_targeting",
  label: "Continue Rehabilitation Targeting / Focus On",
  type: "input",
  placeholder: "Enter rehabilitation goals and target areas",
  speechToText: true,
  ocr: true
},

{
  name: "home_exercise_program",
  label: "Home Exercise Program",
  type: "input",
  placeholder: "Enter prescribed home exercise program",
  speechToText: true,
  ocr: true
},

{
  name: "plan_others",
  label: "Others",
  type: "input",
  placeholder: "Enter any additional plan details",
  speechToText: true,
  ocr: true
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