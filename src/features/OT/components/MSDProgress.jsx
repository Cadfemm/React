
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
    ],  sections: [{
    fields: [
      { name: "complaint", label: "Cheif Complaint", type: "input", placeholder: "Therapist assessment..." },
      { name: "History of Present", label: "History of Present Illnes", type: "input" },
      {
  name: "pain",
  label: "Pain",
  type: "input",
  rows: 3,
  placeholder: "Enter pain details"
},
{
  name: "functional_complaints",
  label: "Functional Complaints",
  type: "input",
  rows: 3,
  placeholder: "Enter functional complaints"
},
{
  name: "adl_iadl_limitations",
  label: "ADL / IADL Limitations",
  type: "input",
  rows: 3,
  placeholder: "Enter ADL/IADL limitations"
},
{
  name: "fatigue",
  label: "Fatigue",
  type: "input",
  rows: 3,
  placeholder: "Enter fatigue details"
},
{
  name: "work_home_participation",
  label: "Work / Home Participation",
  type: "input",
  rows: 3,
  placeholder: "Enter work/home participation details"
},
{
  name: "patient_goals",
  label: "Patient Goals",
  type: "input",
  rows: 3,
  placeholder: "Enter patient goals"
}
      
    ],
  }],
};
const OBJECTIVE_SCHEMA = {
 
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [
    {
     
      fields: [

// ======================================================
// PAIN MANAGEMENT
// ======================================================

  { type: "subheading", label: "Therapeutic Interventions" },
  /* ===================== PAIN MANAGEMENT & SYMPTOM MODULATION ===================== */
 { type: "subheading", label: "Pain Management & Symptom Modulation" },
{
  name: "pain_management_symptom_modulation_items",
 
  type: "checkbox-group",
  options: [
    {
      label: "Manual Therapy / Soft Tissue Release",
      value: "manual_therapy_soft_tissue_release"
    },
    {
      label: "Heat Therapy",
      value: "heat_therapy"
    },
    {
      label: "Ice / Cryocuff",
      value: "ice_cryocuff"
    },
    {
      label: "Fluidotherapy",
      value: "fluidotherapy"
    },
    {
      label: "Ultrasound Therapy",
      value: "ultrasound_therapy"
    },
    {
      label: "Transcutaneous Electrical Nerve Stimulation (TENS)",
      value: "tens"
    },
    {
      label: "Neuromuscular Electrical Nerve Stimulation (NMES)",
      value: "nmes"
    },
    {
      label: "Laser Therapy (Lightforce Laser)",
      value: "laser_therapy"
    },
    {
      label: "Avazzia Pro",
      value: "avazzia_pro"
    },
    {
      label: "Others (Positioning, Pacing)",
      value: "others"
    }
  ]
},

/* ===================== MANUAL THERAPY / SOFT TISSUE RELEASE ===================== */
{
  name: "manual_therapy_remarks",
  label: "Manual Therapy / Soft Tissue Release Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "manual_therapy_soft_tissue_release"
  }
},

/* ===================== HEAT THERAPY ===================== */
{
  name: "heat_therapy_body_part",
  label: "Heat Therapy - Body Part",
  type: "input",
  placeholder: "Enter body part",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "heat_therapy"
  }
},
{
  name: "heat_therapy_duration",
  label: "Heat Therapy - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "heat_therapy"
  }
},
{
  name: "heat_therapy_remarks",
  label: "Heat Therapy Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "heat_therapy"
  }
},

/* ===================== ICE / CRYOCUFF ===================== */
{
  name: "ice_cryocuff_body_part",
  label: "Ice / Cryocuff - Body Part",
  type: "input",
  placeholder: "Enter body part",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "ice_cryocuff"
  }
},
{
  name: "ice_cryocuff_duration",
  label: "Ice / Cryocuff - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "ice_cryocuff"
  }
},
{
  name: "ice_cryocuff_remarks",
  label: "Ice / Cryocuff Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "ice_cryocuff"
  }
},

/* ===================== FLUIDOTHERAPY ===================== */
{
  name: "pain_fluidotherapy_side",
  label: "Fluidotherapy - Side",
  type: "radio",
  options: [
    { label: "Right", value: "right" },
    { label: "Left", value: "left" },
    { label: "Bilateral", value: "bilateral" }
  ],
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "fluidotherapy"
  }
},
{
  name: "pain_fluidotherapy_duration",
  label: "Fluidotherapy - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "fluidotherapy"
  }
},
{
  name: "pain_fluidotherapy_remarks",
  label: "Fluidotherapy Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "fluidotherapy"
  }
},

/* ===================== ULTRASOUND THERAPY ===================== */
{
  name: "ultrasound_region",
  label: "Ultrasound Therapy - Region",
  type: "input",
  placeholder: "Enter region",
  showIf: {
    field: "pain_management_symptom_modulation_items",
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
    field: "pain_management_symptom_modulation_items",
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
    field: "pain_management_symptom_modulation_items",
    includes: "ultrasound_therapy"
  }
},
{
  name: "ultrasound_intensity",
  label: "Ultrasound Therapy - Intensity (W/cm²)",
  type: "input",
  placeholder: "Enter intensity",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "ultrasound_therapy"
  }
},
{
  name: "ultrasound_duration",
  label: "Ultrasound Therapy - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "ultrasound_therapy"
  }
},
{
  name: "ultrasound_remarks",
  label: "Ultrasound Therapy Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "ultrasound_therapy"
  }
},

/* ===================== TENS ===================== */
{
  name: "tens_mode",
  label: "TENS - Mode",
  type: "radio",
  options: [
    { label: "Conventional", value: "conventional" },
    { label: "Low Frequency", value: "low_frequency" },
    { label: "Modulation", value: "modulation" },
    { label: "Burst", value: "burst" }
  ],
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "tens"
  }
},
{
  name: "tens_pulse_width",
  label: "TENS - Pulse Width (µs)",
  type: "input",
  placeholder: "Enter pulse width",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "tens"
  }
},
{
  name: "tens_intensity",
  label: "TENS - Intensity (mA)",
  type: "input",
  placeholder: "Enter intensity",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "tens"
  }
},
{
  name: "tens_duration",
  label: "TENS - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "tens"
  }
},
{
  name: "tens_remarks",
  label: "TENS Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "tens"
  }
},

/* ===================== NMES ===================== */
{
  name: "nmes_frequency",
  label: "NMES - Frequency (Hz)",
  type: "input",
  placeholder: "Enter frequency",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "nmes"
  }
},
{
  name: "nmes_pulse_width",
  label: "NMES - Pulse Width (µs)",
  type: "input",
  placeholder: "Enter pulse width",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "nmes"
  }
},
{
  name: "nmes_intensity",
  label: "NMES - Intensity (mA)",
  type: "input",
  placeholder: "Enter intensity",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "nmes"
  }
},
{
  name: "nmes_ramp_time",
  label: "NMES - Ramp Time (Seconds)",
  type: "input",
  placeholder: "Enter ramp time",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "nmes"
  }
},
{
  name: "nmes_duration",
  label: "NMES - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "nmes"
  }
},
{
  name: "nmes_remarks",
  label: "NMES Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "nmes"
  }
},

/* ===================== LASER THERAPY ===================== */
{
  name: "laser_therapy_body_part",
  label: "Laser Therapy - Body Part",
  type: "input",
  placeholder: "Enter body part",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "laser_therapy"
  }
},
{
  name: "laser_therapy_power",
  label: "Laser Therapy - Power (Watts)",
  type: "input",
  placeholder: "Enter power",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "laser_therapy"
  }
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
    field: "pain_management_symptom_modulation_items",
    includes: "laser_therapy"
  }
},
{
  name: "laser_therapy_remarks",
  label: "Laser Therapy Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "laser_therapy"
  }
},

/* ===================== AVAZZIA PRO ===================== */
{
  name: "avazzia_pro_body_part",
  label: "Avazzia Pro - Body Part",
  type: "input",
  placeholder: "Enter body part",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "avazzia_pro"
  }
},
{
  name: "avazzia_pro_power",
  label: "Avazzia Pro - Power (Watts)",
  type: "input",
  placeholder: "Enter power",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "avazzia_pro"
  }
},
{
  name: "avazzia_pro_remarks",
  label: "Avazzia Pro Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "avazzia_pro"
  }
},

/* ===================== OTHERS ===================== */
{
  name: "pain_management_other",
  label: "Others (Positioning, Pacing)",
  type: "input",
  placeholder: "Specify other intervention",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "others"
  }
},
{
  name: "pain_management_other_remarks",
  label: "Others Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_symptom_modulation_items",
    includes: "others"
  }
},
/* ===================== SWELLING / EDEMA MANAGEMENT ===================== */
{ type: "subheading", label: "Swelling / Edema Management" },
{
  name: "swelling_edema_management_items",
  
  type: "checkbox-group",
  options: [
    {
      label: "Ice / Cryocuff",
      value: "ice_cryocuff"
    },
    {
      label: "Compression / Tubigrip / Pressure Garment",
      value: "compression_tubigrip_pressure_garment"
    },
    {
      label: "Laser Therapy (if applicable)",
      value: "laser_therapy"
    },
    {
      label: "Others (Elevation, Edema Massage, Muscle Pump Exercises)",
      value: "others"
    }
  ]
},

/* ===================== ICE / CRYOCUFF ===================== */
{
  name: "edema_ice_body_part",
  label: "Ice / Cryocuff - Body Part",
  type: "input",
  placeholder: "Enter body part",
  showIf: {
    field: "swelling_edema_management_items",
    includes: "ice_cryocuff"
  }
},
{
  name: "edema_ice_duration",
  label: "Ice / Cryocuff - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "swelling_edema_management_items",
    includes: "ice_cryocuff"
  }
},
{
  name: "edema_ice_remarks",
  label: "Ice / Cryocuff Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "swelling_edema_management_items",
    includes: "ice_cryocuff"
  }
},

/* ===================== COMPRESSION / TUBIGRIP ===================== */
{
  name: "compression_area",
  label: "Compression / Tubigrip / Pressure Garment - Area",
  type: "input",
  placeholder: "Enter area",
  showIf: {
    field: "swelling_edema_management_items",
    includes: "compression_tubigrip_pressure_garment"
  }
},
{
  name: "compression_remarks",
  label: "Compression Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "swelling_edema_management_items",
    includes: "compression_tubigrip_pressure_garment"
  }
},

/* ===================== LASER THERAPY ===================== */
{
  name: "edema_laser_body_part",
  label: "Laser Therapy - Body Part",
  type: "input",
  placeholder: "Enter body part",
  showIf: {
    field: "swelling_edema_management_items",
    includes: "laser_therapy"
  }
},
{
  name: "edema_laser_power",
  label: "Laser Therapy - Power (Watts)",
  type: "input",
  placeholder: "Enter power",
  showIf: {
    field: "swelling_edema_management_items",
    includes: "laser_therapy"
  }
},
{
  name: "edema_laser_mode",
  label: "Laser Therapy - Mode",
  type: "radio",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed", value: "pulsed" }
  ],
  showIf: {
    field: "swelling_edema_management_items",
    includes: "laser_therapy"
  }
},
{
  name: "edema_laser_energy",
  label: "Laser Therapy - Total Energy (Joules)",
  type: "input",
  placeholder: "Enter total energy",
  showIf: {
    field: "swelling_edema_management_items",
    includes: "laser_therapy"
  }
},
{
  name: "edema_laser_remarks",
  label: "Laser Therapy Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "swelling_edema_management_items",
    includes: "laser_therapy"
  }
},

/* ===================== OTHERS ===================== */
{
  name: "edema_others",
  label: "Others (Elevation / Edema Massage / Muscle Pump Exercises)",
  type: "input",
  rows: 3,
  placeholder: "Enter other edema management strategies",
  showIf: {
    field: "swelling_edema_management_items",
    includes: "others"
  }
},
{ type: "subheading", label: " Neuromuscular Re-education / Functional Stimulation " },
/* ===================== FUNCTIONAL EXERCISE MODALITIES ===================== */

{
  name: "functional_exercise_modalities_items",
  // label: "Functional Exercises (Modalities)",
  type: "checkbox-group",
  options: [
    {
      label: "MOTOMED",
      value: "motomed"
    },
    {
      label: "Robo Hand",
      value: "robo_hand"
    },
    {
      label: "FITMI",
      value: "fitmi"
    },
    {
      label: "Music Glove",
      value: "music_glove"
    },
    {
      label: "Saebo Stim",
      value: "saebo_stim"
    },
    {
      label: "Saebo Pro",
      value: "saebo_pro"
    },
    {
      label: "EMS",
      value: "ems"
    },
    {label:"Driving Simulator",value:'driving_simulator'},
    {label:"Upper limb functional training",value:'upper_limb_functional_training'},
    {label:"Grasp / reach / manipulation training",value:'grasp_reach_manipulation_training'},
    {label:'Laser Therapy',value:'laser_therapy'},
    {label:"Scar management",value:'scar_management'},
    {label:"Tissue mobilisation techniques",value:'tissue_mobilisation_techniques'},
    {label:"Other",value:'other'},


  ]
},

/* ===================== MOTOMED ===================== */
{
  name: "motomed_duration",
  label: "MOTOMED - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration in minutes",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "motomed"
  }
},

/* ===================== ROBO HAND ===================== */
{
  name: "robo_hand_type",
  label: "Robo Hand - Type",
  type: "input",
  placeholder: "Enter type",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "robo_hand"
  }
},
{
  name: "robo_hand_duration",
  label: "Robo Hand - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "robo_hand"
  }
},

/* ===================== FITMI ===================== */
{
  name: "fitmi_exercise",
  label: "FITMI - Exercise",
  type: "input",
  placeholder: "Enter exercise type",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "fitmi"
  }
},
{
  name: "fitmi_reps",
  label: "FITMI - Repetitions",
  type: "input",
  placeholder: "Enter repetitions",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "fitmi"
  }
},
{
  name: "fitmi_duration",
  label: "FITMI - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "fitmi"
  }
},

/* ===================== MUSIC GLOVE ===================== */
{
  name: "music_glove_level",
  label: "Music Glove - Level",
  type: "radio",
  options: [
    { label: "Low", value: "low" },
    { label: "Moderate", value: "moderate" },
    { label: "High", value: "high" }
  ],
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "music_glove"
  }
},
{
  name: "music_glove_duration",
  label: "Music Glove - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "music_glove"
  }
},

/* ===================== SAEOBO STIM ===================== */
{
  name: "saebo_stim_region",
  label: "Saebo Stim - Region",
  type: "input",
  placeholder: "Enter region",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "saebo_stim"
  }
},
{
  name: "saebo_stim_duration",
  label: "Saebo Stim - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "saebo_stim"
  }
},

/* ===================== SAEOBO PRO ===================== */
{
  name: "saebo_pro_region",
  label: "Saebo Pro - Region",
  type: "input",
  placeholder: "Enter region",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "saebo_pro"
  }
},
{
  name: "saebo_pro_duration",
  label: "Saebo Pro - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "saebo_pro"
  }
},

/* ===================== EMS ===================== */
{
  name: "ems_region",
  label: "EMS - Region",
  type: "input",
  placeholder: "Enter region",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "ems"
  }
},
{
  name: "ems_duration",
  label: "EMS - Duration (Minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "ems"
  }
},{
  name: "driving_simulator_mode",
  label: "Driving Simulator - Mode",
  type: "radio",
  options: [
    { label: "Auto Transmission", value: "auto" },
    { label: "Manual Transmission", value: "manual" }
  ],
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "driving_simulator"
  }
},
{
  name: "driving_simulator_duration",
  label: "Driving Simulator - Duration (min)",
  type: "radio",
  options: [
    { label: "15", value: "15" },
    { label: "20", value: "20" },
    { label: "25", value: "25" },
    { label: "30", value: "30" },
    { label: "35", value: "35" },
    { label: "40", value: "40" },
    { label: "45", value: "45" },
    { label: "50", value: "50" }
  ],
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "driving_simulator"
  }
},

/* ===================== UPPER LIMB FUNCTIONAL TRAINING ===================== */
{
  name: "upper_limb_task",
  label: "Upper Limb Functional Training - Task",
  type: "input",
  placeholder: "Enter task",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "upper_limb_functional_training"
  }
},

/* ===================== GRASP / REACH ===================== */
{
  name: "grasp_reach_activity",
  label: "Grasp / Reach / Manipulation - Activity",
  type: "input",
  placeholder: "Enter activity",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "grasp_reach_manipulation_training"
  }
},

/* ===================== LASER THERAPY ===================== */
{
  name: "laser_body_part",
  label: "Laser Therapy - Body Part",
  type: "input",
  placeholder: "Enter body part",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "laser_therapy"
  }
},
{
  name: "laser_power",
  label: "Laser Therapy - Power (Watts)",
  type: "input",
  placeholder: "Enter power",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "laser_therapy"
  }
},
{
  name: "laser_mode",
  label: "Laser Therapy - Mode",
  type: "radio",
  options: [
    { label: "Continuous", value: "continuous" },
    { label: "Pulsed", value: "pulsed" }
  ],
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "laser_therapy"
  }
},
{
  name: "laser_energy",
  label: "Laser Therapy - Total Energy (Joules)",
  type: "input",
  placeholder: "Enter energy",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "laser_therapy"
  }
},
{
  name: "laser_remarks",
  label: "Laser Therapy Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "laser_therapy"
  }
},

/* ===================== SCAR MANAGEMENT ===================== */
{
  name: "scar_technique",
  label: "Scar Management - Technique",
  type: "input",
  placeholder: "Massage / Desensitisation",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "scar_management"
  }
},
{
  name: "scar_area",
  label: "Scar Management - Area",
  type: "input",
  placeholder: "Enter area",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "scar_management"
  }
},
{
  name: "scar_duration",
  label: "Scar Management - Duration (min)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "scar_management"
  }
},
{
  name: "scar_remarks",
  label: "Scar Management Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "scar_management"
  }
},

/* ===================== TISSUE MOBILISATION ===================== */
{
  name: "tissue_technique",
  label: "Tissue Mobilisation - Technique",
  type: "input",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "tissue_mobilisation_techniques"
  }
},
{
  name: "tissue_area",
  label: "Tissue Mobilisation - Target Area",
  type: "input",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "tissue_mobilisation_techniques"
  }
},
{
  name: "tissue_duration",
  label: "Tissue Mobilisation - Duration (min)",
  type: "input",
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "tissue_mobilisation_techniques"
  }
},
{
  name: "tissue_remarks",
  label: "Tissue Mobilisation Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "tissue_mobilisation_techniques"
  }
},

/* ===================== OTHERS ===================== */
{
  name: "other_modalities",
  label: "Others (Taping / Silicone / Vibration Therapy)",
  type: "input",
  rows: 3,
  showIf: {
    field: "functional_exercise_modalities_items",
    includes: "other"
  }
},

/* ===================== REMARKS ===================== */
// {
//   name: "functional_exercise_modalities_remarks",
//   label: "Remarks",
//   type: "input",
//   rows: 3,
//   placeholder: "Enter remarks"
// },


/* ===================== THERAPEUTIC EXERCISE (FUNCTIONAL REHABILITATION) ===================== */
{type:"subheading", label: "Therapeutic Exercise (Functional Rehabilitation)"},
{
  name: "therapeutic_functional_rehab_items",

  type: "checkbox-group",
  options: [
    { label: "ROM / Mobilisation Exercises", value: "rom_mobilisation" },
    { label: "Stretching / Flexibility Training", value: "stretching_flexibility" },
    { label: "Strengthening (Functional / Task Specific)", value: "strengthening" },
    { label: "Endurance Training", value: "endurance" },
    { label: "Coordination Training", value: "coordination" },
    { label: "Balance Training", value: "balance" },
    { label: "Gait / Mobility Training", value: "gait_mobility" },
    { label: "Functional Task Training (Task Simulation)", value: "functional_task" },
    { label: "Fine Motor / Dexterity Training", value: "fine_motor_dexterity" },
    { label: "Hand Function Training (Grip / Pinch / Manipulation)", value: "hand_function" },
    { label: "Others", value: "others" }
  ]
},

/* ===================== ROM / MOBILISATION ===================== */
{
  name: "rom_type",
  label: "ROM Type",
  type: "radio",
  options: [
    { label: "Active", value: "active" },
    { label: "AAROM", value: "aarom" },
    { label: "PROM", value: "prom" }
  ],
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "rom_mobilisation"
  }
},
{
  name: "rom_body_part",
  label: "Body Part",
  type: "input",
  placeholder: "Enter body part",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "rom_mobilisation"
  }
},
{
  name: "rom_reps_sets",
  label: "Repetitions / Sets",
  type: "input",
  placeholder: "Enter reps / sets",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "rom_mobilisation"
  }
},
{
  name: "rom_remarks",
  label: "ROM Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "rom_mobilisation"
  }
},

/* ===================== STRETCHING ===================== */
{
  name: "stretching_muscle_group",
  label: "Muscle Group",
  type: "input",
  placeholder: "Enter muscle group",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "stretching_flexibility"
  }
},
{
  name: "stretch_hold_time",
  label: "Hold Time (sec)",
  type: "input",
  placeholder: "Enter hold time",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "stretching_flexibility"
  }
},
{
  name: "stretch_repetitions",
  label: "Repetitions",
  type: "input",
  placeholder: "Enter repetitions",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "stretching_flexibility"
  }
},
{
  name: "stretch_remarks",
  label: "Stretching Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "stretching_flexibility"
  }
},

/* ===================== STRENGTHENING ===================== */
{
  name: "strength_muscle_task",
  label: "Muscle Group / Task",
  type: "input",
  placeholder: "Enter muscle group or task",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "strengthening"
  }
},
{
  name: "strength_resistance",
  label: "Resistance Level",
  type: "input",
  placeholder: "Enter resistance level",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "strengthening"
  }
},
{
  name: "strength_reps_sets",
  label: "Repetitions / Sets",
  type: "input",
  placeholder: "Enter reps / sets",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "strengthening"
  }
},
{
  name: "strength_remarks",
  label: "Strengthening Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "strengthening"
  }
},

/* ===================== ENDURANCE ===================== */
{
  name: "endurance_activity",
  label: "Activity",
  type: "input",
  placeholder: "Enter activity",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "endurance"
  }
},
{
  name: "endurance_duration",
  label: "Duration (minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "endurance"
  }
},
{
  name: "endurance_remarks",
  label: "Endurance Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "endurance"
  }
},

/* ===================== COORDINATION ===================== */
{
  name: "coordination_activity",
  label: "Activity",
  type: "input",
  placeholder: "Enter activity",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "coordination"
  }
},
{
  name: "coordination_reps_duration",
  label: "Repetitions / Duration",
  type: "input",
  placeholder: "Enter value",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "coordination"
  }
},
{
  name: "coordination_remarks",
  label: "Coordination Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "coordination"
  }
},

/* ===================== BALANCE ===================== */
{
  name: "balance_type",
  label: "Type",
  type: "radio",
  options: [
    { label: "Static", value: "static" },
    { label: "Dynamic", value: "dynamic" }
  ],
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "balance"
  }
},
{
  name: "balance_support_level",
  label: "Support Level",
  type: "input",
  placeholder: "Enter support level",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "balance"
  }
},
{
  name: "balance_duration",
  label: "Duration",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "balance"
  }
},
{
  name: "balance_remarks",
  label: "Balance Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "balance"
  }
},

/* ===================== GAIT / MOBILITY ===================== */
{
  name: "gait_type",
  label: "Type",
  type: "radio",
  options: [
    { label: "With Aid", value: "with_aid" },
    { label: "Without Aid", value: "without_aid" }
  ],
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "gait_mobility"
  }
},
{
  name: "gait_distance_duration",
  label: "Distance / Duration",
  type: "input",
  placeholder: "Enter distance or duration",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "gait_mobility"
  }
},
{
  name: "gait_remarks",
  label: "Gait Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "gait_mobility"
  }
},

/* ===================== FUNCTIONAL TASK ===================== */
{
  name: "functional_task_name",
  label: "Task",
  type: "input",
  placeholder: "Enter task",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "functional_task"
  }
},
{
  name: "functional_task_difficulty",
  label: "Level of Difficulty",
  type: "input",
  placeholder: "Enter difficulty",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "functional_task"
  }
},
{
  name: "functional_task_duration",
  label: "Duration",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "functional_task"
  }
},
{
  name: "functional_task_remarks",
  label: "Functional Task Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "functional_task"
  }
},

/* ===================== FINE MOTOR ===================== */
{
  name: "fine_motor_activity",
  label: "Activity",
  type: "input",
  placeholder: "Enter activity",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "fine_motor_dexterity"
  }
},
{
  name: "fine_motor_reps_duration",
  label: "Repetitions / Duration",
  type: "input",
  placeholder: "Enter value",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "fine_motor_dexterity"
  }
},
{
  name: "fine_motor_remarks",
  label: "Fine Motor Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "fine_motor_dexterity"
  }
},

/* ===================== HAND FUNCTION ===================== */
{
  name: "hand_function_type",
  label: "Type",
  type: "radio",
  options: [
    { label: "Grip", value: "grip" },
    { label: "Pinch", value: "pinch" },
    { label: "Manipulation", value: "manipulation" }
  ],
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "hand_function"
  }
},
{
  name: "hand_function_tool",
  label: "Tool",
  type: "input",
  placeholder: "Enter tool",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "hand_function"
  }
},
{
  name: "hand_function_reps_duration",
  label: "Repetitions / Duration",
  type: "input",
  placeholder: "Enter value",
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "hand_function"
  }
},
{
  name: "hand_function_remarks",
  label: "Hand Function Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "hand_function"
  }
},

/* ===================== OTHERS ===================== */
{
  name: "therapeutic_other_remarks",
  label: "Others Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "therapeutic_functional_rehab_items",
    includes: "others"
  }
},


/* ===================== FUNCTIONAL EXERCISE / ACTIVITY-BASED REHAB ===================== */
{type:"subheading", label: "Functional Exercise / Activity-Based Rehabilitation"},
{
  name: "functional_activity_rehab_items",

  type: "checkbox-group",
  options: [
    { label: "Cycling / Recumbent Bike", value: "cycling_recumbent_bike" },
    { label: "Upper Limb Functional Training", value: "upper_limb_functional_training" },
    { label: "Lower Limb Functional Training", value: "lower_limb_functional_training" },
    { label: "ADL Simulation Tasks", value: "adl_simulation_tasks" },
    { label: "Work Simulation / Task-Specific Conditioning", value: "work_simulation" },
    { label: "Others", value: "others" }
  ]
},

/* ===================== CYCLING ===================== */
{
  name: "cycling_type",
  label: "Type",
  type: "radio",
  options: [
    { label: "Cycling", value: "cycling" },
    { label: "Recumbent Bike", value: "recumbent_bike" }
  ],
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "cycling_recumbent_bike"
  }
},
{
  name: "cycling_duration",
  label: "Duration (minutes)",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "cycling_recumbent_bike"
  }
},
{
  name: "cycling_remarks",
  label: "Cycling Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "cycling_recumbent_bike"
  }
},

/* ===================== UPPER LIMB FUNCTIONAL TRAINING ===================== */
{
  name: "upper_limb_activity",
  label: "Activity",
  type: "input",
  placeholder: "e.g. reaching, lifting, carrying, grasp-release",
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "upper_limb_functional_training"
  }
},
{
  name: "upper_limb_duration",
  label: "Duration",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "upper_limb_functional_training"
  }
},
{
  name: "upper_limb_remarks",
  label: "Upper Limb Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "upper_limb_functional_training"
  }
},

/* ===================== LOWER LIMB FUNCTIONAL TRAINING ===================== */
{
  name: "lower_limb_activity",
  label: "Activity",
  type: "input",
  placeholder: "e.g. sit-to-stand, stepping, stair training",
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "lower_limb_functional_training"
  }
},
{
  name: "lower_limb_repetitions",
  label: "Repetitions",
  type: "input",
  placeholder: "Enter repetitions",
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "lower_limb_functional_training"
  }
},
{
  name: "lower_limb_remarks",
  label: "Lower Limb Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "lower_limb_functional_training"
  }
},

/* ===================== ADL SIMULATION ===================== */
{
  name: "adl_task",
  label: "Task",
  type: "radio",
  options: [
    { label: "Dressing", value: "dressing" },
    { label: "Grooming", value: "grooming" },
    { label: "Feeding", value: "feeding" },
    { label: "Toileting", value: "toileting" },
    { label: "Transfers", value: "transfers" }
  ],
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "adl_simulation_tasks"
  }
},
{
  name: "adl_assistance_level",
  label: "Assistance Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "adl_simulation_tasks"
  }
},
{
  name: "adl_remarks",
  label: "ADL Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "adl_simulation_tasks"
  }
},

/* ===================== WORK SIMULATION ===================== */
{
  name: "work_task",
  label: "Task",
  type: "input",
  placeholder: "Enter task",
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "work_simulation"
  }
},
{
  name: "work_intensity",
  label: "Intensity Level",
  type: "radio",
  options: [
    { label: "Low", value: "low" },
    { label: "Moderate", value: "moderate" },
    { label: "High", value: "high" }
  ],
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "work_simulation"
  }
},
{
  name: "work_remarks",
  label: "Work Simulation Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "work_simulation"
  }
},

/* ===================== OTHERS ===================== */
{
  name: "functional_activity_other_remarks",
  label: "Others Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "functional_activity_rehab_items",
    includes: "others"
  }
},

/* ===================== ADL & IADL TRAINING (CORE OT COMPONENT) ===================== */
// {
//   name: "adl_iadl_core_items",
//   label: "Core OT Component",
//   type: "radio",
//   options: [
//     { label: "ADL Training", value: "adl_training" },
//     { label: "IADL Training", value: "iadl_training" }
//   ]
// },
{type:"subheading", label: "ADL & IADL Training (Core OT Component)"},
{
  name: "adl_iadl_mode",
  label: "Core OT Component",
  type: "radio",
  options: [
    { label: "ADL Training", value: "adl_training" },
    { label: "IADL Training", value: "iadl_training" }
  ]
},

{
  name: "adl_iadl_core_items",
  label: "ADL Training",
  type: "checkbox-group",
  options: [
    { label: "Dressing", value: "dressing" },
    { label: "Grooming", value: "grooming" },
    { label: "Feeding", value: "feeding" },
    { label: "Toileting", value: "toileting" },
    { label: "Bathing", value: "bathing" },
    { label: "Transfers (Bed/Chair/Toilet)", value: "transfers" },
    { label: "Locomotion", value: "locomotion" },

    
  ],
   showIf: {
    field: "adl_iadl_mode",
    equals: "adl_training"
  }
},

/* ===================== ADL DETAILS ===================== */

/* Dressing */
{
  name: "dressing_type",
  label: "Dressing Type",
  type: "input",
  placeholder: "Upper / Lower / Full",
  showIf: {
    field: "adl_iadl_core_items",
    includes: "dressing"
  }
},
{
  name: "dressing_technique",
  label: "Technique Used",
  type: "input",
  placeholder: "Enter technique",
  showIf: {
    field: "adl_iadl_core_items",
    includes: "dressing"
  }
},
{
  name: "dressing_assistance",
  label: "Assistance Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "adl_iadl_core_items",
    includes: "dressing"
  }
},
{
  name: "dressing_remarks",
  label: "Dressing Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "adl_iadl_core_items",
    includes: "dressing"
  }
},

/* Grooming */
{
  name: "grooming_task_type",
  label: "Task Type",
  type: "input",
  placeholder: "e.g. shaving, hair care, oral care",
  showIf: {
    field: "adl_iadl_core_items",
    includes: "grooming"
  }
},
{
  name: "grooming_assistance",
  label: "Assistance Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "adl_iadl_core_items",
    includes: "grooming"
  }
},
{
  name: "grooming_remarks",
  label: "Grooming Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "adl_iadl_core_items",
    includes: "grooming"
  }
},

/* Feeding */
{
  name: "feeding_method",
  label: "Method",
  type: "radio",
  options: [
    { label: "Oral", value: "oral" },
    { label: "Assisted", value: "assisted" },
    { label: "Adaptive Utensils", value: "adaptive_utensils" }
  ],
  showIf: {
    field: "adl_iadl_core_items",
    includes: "feeding"
  }
},
{
  name: "feeding_dominant_hand",
  label: "Dominant Hand Involvement",
  type: "input",
  placeholder: "Enter details",
  showIf: {
    field: "adl_iadl_core_items",
    includes: "feeding"
  }
},
{
  name: "feeding_assistance",
  label: "Assistance Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "adl_iadl_core_items",
    includes: "feeding"
  }
},
{
  name: "feeding_remarks",
  label: "Feeding Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "adl_iadl_core_items",
    includes: "feeding"
  }
},

/* Toileting */
{
  name: "toileting_component",
  label: "Component",
  type: "input",
  placeholder: "Transfer / hygiene / clothing management",
  showIf: {
    field: "adl_iadl_core_items",
    includes: "toileting"
  }
},
{
  name: "toileting_type",
  label: "Toilet Type Used",
  type: "radio",
  options: [
    { label: "Standard", value: "standard" },
    { label: "Commode", value: "commode" },
    { label: "Raised Toilet Seat", value: "raised_toilet_seat" }
  ],
  showIf: {
    field: "adl_iadl_core_items",
    includes: "toileting"
  }
},
{
  name: "toileting_assistance",
  label: "Assistance Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "adl_iadl_core_items",
    includes: "toileting"
  }
},
{
  name: "toileting_remarks",
  label: "Toileting Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "adl_iadl_core_items",
    includes: "toileting"
  }
},

/* Bathing */
{
  name: "bathing_method",
  label: "Method",
  type: "radio",
  options: [
    { label: "Shower", value: "shower" },
    { label: "Sponge Bath", value: "sponge_bath" },
    { label: "Assisted Bath", value: "assisted_bath" }
  ],
  showIf: {
    field: "adl_iadl_core_items",
    includes: "bathing"
  }
},
{
  name: "bathing_position",
  label: "Position",
  type: "radio",
  options: [
    { label: "Standing", value: "standing" },
    { label: "Sitting", value: "sitting" }
  ],
  showIf: {
    field: "adl_iadl_core_items",
    includes: "bathing"
  }
},
{
  name: "bathing_assistance",
  label: "Assistance Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "adl_iadl_core_items",
    includes: "bathing"
  }
},
{
  name: "bathing_remarks",
  label: "Bathing Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "adl_iadl_core_items",
    includes: "bathing"
  }
},

/* Transfers */
{
  name: "transfer_type",
  label: "Type",
  type: "input",
  placeholder: "Bed / Chair / Toilet / Car",
  showIf: {
    field: "adl_iadl_core_items",
    includes: "transfers"
  }
},
{
  name: "transfer_technique",
  label: "Technique",
  type: "input",
  placeholder: "Stand pivot / slide board / assisted lift",
  showIf: {
    field: "adl_iadl_core_items",
    includes: "transfers"
  }
},
{
  name: "transfer_assistance",
  label: "Assistance Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "adl_iadl_core_items",
    includes: "transfers"
  }
},
{
  name: "transfer_remarks",
  label: "Transfers Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "adl_iadl_core_items",
    includes: "transfers"
  }
},

/* Locomotion */
{
  name: "locomotion_mode",
  label: "Mode",
  type: "input",
  placeholder: "Walking / Wheelchair / Assistive device",
  showIf: {
    field: "adl_iadl_core_items",
    includes: "locomotion"
  }
},
{
  name: "locomotion_distance",
  label: "Distance",
  type: "input",
  placeholder: "Enter distance",
  showIf: {
    field: "adl_iadl_core_items",
    includes: "locomotion"
  }
},
{
  name: "locomotion_assistance",
  label: "Assistance Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "adl_iadl_core_items",
    includes: "locomotion"
  }
},
{
  name: "locomotion_remarks",
  label: "Locomotion Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "adl_iadl_core_items",
    includes: "locomotion"
  }
},

/* ===================== IADL TRAINING ===================== */

{
  name: "iadl_training_items",
  label: "IADL Training",
  type: "checkbox-group",
  options: [
    { label: "Cooking", value: "cooking" },
    { label: "Housekeeping", value: "housekeeping" },
    { label: "Laundry", value: "laundry" },
    { label: "Shopping", value: "shopping" },
    { label: "Transport / Community Mobility", value: "transport_community_mobility" },
    { label: "Medication Management", value: "medication_management" },
    { label: "Financial Tasks", value: "financial_tasks" },
    { label: "Telephone Use", value: "telephone_use" },
    { label: "Driving / Riding Rehabilitation", value: "driving_riding_rehabilitation" }
  ],
  showIf: {
    field: "adl_iadl_mode",
    equals: "iadl_training"
  }
},

/* ===================== COOKING ===================== */
{
  name: "cooking_level",
  label: "Cooking Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "cooking"
  }
},
{
  name: "cooking_safety",
  label: "Safety",
  type: "radio",
  options: [
    { label: "Adequate", value: "adequate" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "cooking"
  }
},
{
  name: "cooking_remarks",
  label: "Cooking Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "iadl_training_items",
    includes: "cooking"
  }
},

/* ===================== HOUSEKEEPING ===================== */
{
  name: "housekeeping_level",
  label: "Housekeeping Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "housekeeping"
  }
},
{
  name: "housekeeping_tolerance",
  label: "Tolerance",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "housekeeping"
  }
},
{
  name: "housekeeping_remarks",
  label: "Housekeeping Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "iadl_training_items",
    includes: "housekeeping"
  }
},

/* ===================== LAUNDRY ===================== */
{
  name: "laundry_level",
  label: "Laundry Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "laundry"
  }
},
{
  name: "laundry_tolerance",
  label: "Tolerance",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "laundry"
  }
},
{
  name: "laundry_remarks",
  label: "Laundry Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "iadl_training_items",
    includes: "laundry"
  }
},

/* ===================== SHOPPING ===================== */
{
  name: "shopping_level",
  label: "Shopping Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "shopping"
  }
},
{
  name: "shopping_mobility_requirement",
  label: "Mobility Requirement",
  type: "radio",
  options: [
    { label: "None", value: "none" },
    { label: "Assistive Device", value: "assistive_device" },
    { label: "Wheelchair", value: "wheelchair" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "shopping"
  }
},
{
  name: "shopping_remarks",
  label: "Shopping Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "iadl_training_items",
    includes: "shopping"
  }
},

/* ===================== TRANSPORT / COMMUNITY MOBILITY ===================== */
{
  name: "transport_level",
  label: "Transport Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "transport_community_mobility"
  }
},
{
  name: "transport_safety_awareness",
  label: "Safety Awareness",
  type: "radio",
  options: [
    { label: "Adequate", value: "adequate" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "transport_community_mobility"
  }
},
{
  name: "transport_remarks",
  label: "Transport Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "iadl_training_items",
    includes: "transport_community_mobility"
  }
},

/* ===================== MEDICATION MANAGEMENT ===================== */
{
  name: "medication_level",
  label: "Medication Management Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "medication_management"
  }
},
{
  name: "medication_compliance",
  label: "Compliance",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "medication_management"
  }
},
{
  name: "medication_remarks",
  label: "Medication Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "iadl_training_items",
    includes: "medication_management"
  }
},

/* ===================== FINANCIAL TASKS ===================== */
{
  name: "financial_level",
  label: "Financial Tasks Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "financial_tasks"
  }
},
{
  name: "financial_cognitive_ability",
  label: "Cognitive Ability",
  type: "radio",
  options: [
    { label: "Adequate", value: "adequate" },
    { label: "Mild Difficulty", value: "mild_difficulty" },
    { label: "Impaired", value: "impaired" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "financial_tasks"
  }
},
{
  name: "financial_remarks",
  label: "Financial Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "iadl_training_items",
    includes: "financial_tasks"
  }
},

/* ===================== TELEPHONE USE ===================== */
{
  name: "telephone_level",
  label: "Telephone Use Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" },
    { label: "Dependent", value: "dependent" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "telephone_use"
  }
},
{
  name: "telephone_function",
  label: "Function Use",
  type: "radio",
  options: [
    { label: "Basic", value: "basic" },
    { label: "Advanced", value: "advanced" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "telephone_use"
  }
},
{
  name: "telephone_remarks",
  label: "Telephone Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "iadl_training_items",
    includes: "telephone_use"
  }
},

/* ===================== DRIVING / RIDING ===================== */
{
  name: "driving_level",
  label: "Driving / Riding Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "minimal_assist" },
    { label: "Supervision", value: "supervision" },
    { label: "Not Ready", value: "not_ready" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "driving_riding_rehabilitation"
  }
},
{
  name: "driving_safety",
  label: "Safety",
  type: "radio",
  options: [
    { label: "Adequate", value: "adequate" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "driving_riding_rehabilitation"
  }
},
{
  name: "driving_remarks",
  label: "Driving Remarks",
  type: "input",
  rows: 3,
  showIf: {
    field: "iadl_training_items",
    includes: "driving_riding_rehabilitation"
  }
},
{type: "subheading", label: "Patient Education"},
{
  name: "patient_education_items",
 
  type: "checkbox-group",
  options: [
    {
      label: "Joint Protection Strategies",
      value: "joint_protection_strategies"
    },
    {
      label: "Energy Conservation Techniques",
      value: "energy_conservation_techniques"
    },
    {
      label: "Ergonomic Education",
      value: "ergonomic_education"
    },
    {
      label: "Home Exercise Program (HEP)",
      value: "hep"
    },
    {
      label: "Caregiver Training",
      value: "caregiver_training"
    },
    {
      label: "Work Modification Advice",
      value: "work_modification_advice"
    }
  ]
},

/* ===================== JOINT PROTECTION STRATEGIES ===================== */
{
  name: "joint_protection_understanding",
  label: "Joint Protection Strategies - Understanding",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "patient_education_items",
    includes: "joint_protection_strategies"
  }
},
{
  name: "joint_protection_remarks",
  label: "Joint Protection Strategies - Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "patient_education_items",
    includes: "joint_protection_strategies"
  }
},

/* ===================== ENERGY CONSERVATION TECHNIQUES ===================== */
{
  name: "energy_conservation_understanding",
  label: "Energy Conservation Techniques - Understanding",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "patient_education_items",
    includes: "energy_conservation_techniques"
  }
},
{
  name: "energy_conservation_remarks",
  label: "Energy Conservation Techniques - Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "patient_education_items",
    includes: "energy_conservation_techniques"
  }
},

/* ===================== ERGONOMIC EDUCATION ===================== */
{
  name: "ergonomic_area_addressed",
  label: "Ergonomic Education - Area Addressed",
  type: "radio",
  options: [
    { label: "Home", value: "home" },
    { label: "Work", value: "work" },
    { label: "ADL", value: "adl" }
  ],
  showIf: {
    field: "patient_education_items",
    includes: "ergonomic_education"
  }
},
{
  name: "ergonomic_understanding",
  label: "Ergonomic Education - Understanding",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "patient_education_items",
    includes: "ergonomic_education"
  }
},
{
  name: "ergonomic_remarks",
  label: "Ergonomic Education - Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "patient_education_items",
    includes: "ergonomic_education"
  }
},

/* ===================== HOME EXERCISE PROGRAM (HEP) ===================== */
{
  name: "hep_compliance",
  label: "HEP - Compliance",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "patient_education_items",
    includes: "hep"
  }
},
{
  name: "hep_understanding",
  label: "HEP - Understanding",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "patient_education_items",
    includes: "hep"
  }
},
{
  name: "hep_remarks",
  label: "HEP - Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "patient_education_items",
    includes: "hep"
  }
},

/* ===================== CAREGIVER TRAINING ===================== */
{
  name: "caregiver_involvement",
  label: "Caregiver Training - Involvement",
  type: "radio",
  options: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ],
  showIf: {
    field: "patient_education_items",
    includes: "caregiver_training"
  }
},
{
  name: "caregiver_understanding",
  label: "Caregiver Training - Understanding",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "patient_education_items",
    includes: "caregiver_training"
  }
},
{
  name: "caregiver_remarks",
  label: "Caregiver Training - Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "patient_education_items",
    includes: "caregiver_training"
  }
},

/* ===================== WORK MODIFICATION ADVICE ===================== */
{
  name: "work_modification_receptiveness",
  label: "Work Modification Advice - Receptiveness",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "patient_education_items",
    includes: "work_modification_advice"
  }
},
{
  name: "work_modification_understanding",
  label: "Work Modification Advice - Understanding",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "patient_education_items",
    includes: "work_modification_advice"
  }
},
{
  name: "work_modification_remarks",
  label: "Work Modification Advice - Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "patient_education_items",
    includes: "work_modification_advice"
  }
},
{type: "subheading", label: "Assistive Devices / Adaptive Equipment"},
{
  name: "assistive_adaptive_equipment_items",
  
  type: "checkbox-group",
  options: [
    {
      label: "Splint / Orthosis",
      value: "splint_orthosis"
    },
    {
      label: "Tubigrip / Compression Garment",
      value: "tubigrip_compression_garment"
    },
    {
      label: "ADL Adaptive Devices",
      value: "adl_adaptive_devices"
    },
    {
      label: "Mobility Aids",
      value: "mobility_aids"
    },
    {
      label: "Wheelchair",
      value: "wheelchair"
    },
    {
      label: "Others",
      value: "others"
    }
  ]
},

/* ===================== SPLINT / ORTHOSIS ===================== */
{
  name: "splint_type",
  label: "Splint / Orthosis - Type",
  type: "input",
  placeholder: "Enter type",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "splint_orthosis"
  }
},
{
  name: "splint_body_part",
  label: "Splint / Orthosis - Body Part",
  type: "input",
  placeholder: "Enter body part",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "splint_orthosis"
  }
},
{
  name: "splint_wearing_schedule",
  label: "Splint / Orthosis - Wearing Schedule",
  type: "input",
  placeholder: "Enter wearing schedule",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "splint_orthosis"
  }
},
{
  name: "splint_purpose",
  label: "Splint / Orthosis - Purpose",
  type: "radio",
  options: [
    { label: "Pain Relief", value: "pain_relief" },
    { label: "Support", value: "support" },
    { label: "Correction", value: "correction" },
    { label: "Function", value: "function" }
  ],
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "splint_orthosis"
  }
},
{
  name: "splint_remarks",
  label: "Splint / Orthosis Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "splint_orthosis"
  }
},

/* ===================== TUBIGRIP / COMPRESSION ===================== */
{
  name: "compression_area",
  label: "Tubigrip / Compression Garment - Area",
  type: "input",
  placeholder: "Enter area",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "tubigrip_compression_garment"
  }
},
{
  name: "compression_size_grade",
  label: "Size / Grade",
  type: "input",
  placeholder: "Enter size or grade",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "tubigrip_compression_garment"
  }
},
{
  name: "compression_wearing_duration",
  label: "Wearing Duration",
  type: "input",
  placeholder: "Enter duration",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "tubigrip_compression_garment"
  }
},
{
  name: "compression_purpose",
  label: "Purpose",
  type: "radio",
  options: [
    { label: "Edema Control", value: "edema_control" },
    { label: "Support", value: "support" }
  ],
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "tubigrip_compression_garment"
  }
},
{
  name: "compression_remarks",
  label: "Compression Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "tubigrip_compression_garment"
  }
},

/* ===================== ADL ADAPTIVE DEVICES ===================== */
{
  name: "adl_device_type",
  label: "ADL Device Type",
  type: "input",
  placeholder: "e.g. reacher, built-up handle, dressing aid",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "adl_adaptive_devices"
  }
},
{
  name: "adl_task",
  label: "ADL Task",
  type: "input",
  placeholder: "Enter ADL task",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "adl_adaptive_devices"
  }
},
{
  name: "adl_training_level",
  label: "Training Level",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "mi" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" }
  ],
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "adl_adaptive_devices"
  }
},
{
  name: "adl_effectiveness",
  label: "Effectiveness",
  type: "radio",
  options: [
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" }
  ],
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "adl_adaptive_devices"
  }
},
{
  name: "adl_remarks",
  label: "ADL Devices Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "adl_adaptive_devices"
  }
},

/* ===================== MOBILITY AIDS ===================== */
{
  name: "mobility_aid_type",
  label: "Mobility Aid Type",
  type: "radio",
  options: [
    { label: "Cane", value: "cane" },
    { label: "Crutches", value: "crutches" },
    { label: "Walker", value: "walker" },
    { label: "Frame", value: "frame" }
  ],
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "mobility_aids"
  }
},
{
  name: "mobility_weight_bearing_status",
  label: "Weight Bearing Status",
  type: "input",
  placeholder: "Enter weight bearing status",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "mobility_aids"
  }
},
{
  name: "mobility_distance_tolerance",
  label: "Distance Tolerance",
  type: "input",
  placeholder: "Enter distance tolerance",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "mobility_aids"
  }
},
{
  name: "mobility_assistance_level",
  label: "Level of Assistance",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "mi" },
    { label: "Supervision", value: "supervision" },
    { label: "Assist", value: "assist" }
  ],
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "mobility_aids"
  }
},
{
  name: "mobility_remarks",
  label: "Mobility Aids Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "mobility_aids"
  }
},

/* ===================== WHEELCHAIR ===================== */
{
  name: "wheelchair_type",
  label: "Wheelchair Type",
  type: "radio",
  options: [
    { label: "Manual", value: "manual" },
    { label: "Lightweight", value: "lightweight" },
    { label: "Ultra-light", value: "ultra_light" },
    { label: "Motorised", value: "motorised" }
  ],
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "wheelchair"
  }
},
{
  name: "wheelchair_seating_tolerance",
  label: "Seating Tolerance (Minutes)",
  type: "input",
  placeholder: "Enter seating tolerance",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "wheelchair"
  }
},
{
  name: "wheelchair_ability",
  label: "Ability",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "MI", value: "mi" },
    { label: "Assist", value: "assist" }
  ],
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "wheelchair"
  }
},
{
  name: "wheelchair_pressure_relief",
  label: "Pressure Relief Ability",
  type: "radio",
  options: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ],
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "wheelchair"
  }
},
{
  name: "wheelchair_remarks",
  label: "Wheelchair Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "wheelchair"
  }
},

/* ===================== OTHERS ===================== */
{
  name: "assistive_other_device",
  label: "Other Device",
  type: "input",
  placeholder: "Specify device",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "others"
  }
},
{
  name: "assistive_other_purpose",
  label: "Purpose",
  type: "input",
  placeholder: "Enter purpose",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "others"
  }
},
{
  name: "assistive_other_remarks",
  label: "Others Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_equipment_items",
    includes: "others"
  }
}

      ]
    },

    

    // =========================
    // THERAPEUTIC MODALITIES (FIXED AS SEPARATE SECTION)
    // =========================
    
  ]
};


const ASSESSMENT_SCHEMA = {
 
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [{
    fields: [
    
      { name: "assessment_notes", label: "Clinical Impression / Notes", type: "input", placeholder: "Therapist assessment..." },

/* ===================== FUNCTIONAL PERFORMANCE SUMMARY ===================== */

{
  name: "functional_performance",
  label: "Functional Performance",
  type: "radio",
  options: [
    { label: "Improved", value: "improved" },
    { label: "No Change", value: "no_change" },
    { label: "Decline", value: "decline" }
  ]
},

{
  name: "adl_iadl_independence_level",
  label: "ADL / IADL Independence Level",
  type: "input",
  rows: 2,
  placeholder: "Enter ADL/IADL independence level"
},

{
  name: "pain_impact_on_function",
  label: "Pain Impact on Function",
  type: "input",
  rows: 2,
  placeholder: "Enter pain impact on function"
},

{
  name: "patient_participation_tolerance",
  label: "Patient Participation & Tolerance",
  type: "input",
  rows: 2,
  placeholder: "Enter participation and tolerance"
},

{
  name: "ot_clinical_impression",
  label: "OT Clinical Impression",
  type: "input",
  rows: 3,
  placeholder: "Enter occupational therapy clinical impression"
},

// {
//   name: "functional_performance_free_text",
//   label: "Free Text",
//   type: "input",
//   rows: 4,
//   placeholder: "Enter additional notes"
// },
      
    ],
  }],
};

const PLAN_SCHEMA = {
  
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

        // ======================================================
        // THERAPIST NOTES
        // ======================================================

       /* ===================== THERAPIST PLAN ===================== */

{
  name: "therapist_plan",
  label: "Therapist Plan",
  type: "checkbox-group",
  options: [
    {
      label: "Continue Current OT Rehabilitation Program",
      value: "continue_current_ot_program"
    },
    {
      label: "Progression of Functional Activities",
      value: "progression_of_functional_activities"
    },
    {
      label: "Work / Functional Capacity Conditioning",
      value: "work_functional_capacity_conditioning"
    },
    {
      label: "Home Program Reinforcement (HEP)",
      value: "home_program_reinforcement"
    },
    {
      label: "Caregiver Training / Education",
      value: "caregiver_training_education"
    },
    {
      label: "Review and Reassessment Plan",
      value: "review_reassessment_plan"
    },
    {
      label: "Referral (if required)",
      value: "referral"
    }
  ]
},

/* ===================== CONTINUE CURRENT OT REHABILITATION PROGRAM ===================== */
{
  name: "continue_current_ot_program_items",
  label: "Continue Current OT Rehabilitation Program",
  type: "checkbox-group",
  options: [
    { label: "Pain / Symptom Management", value: "pain_symptom_management" },
    { label: "Therapeutic Exercises", value: "therapeutic_exercises" },
    { label: "Functional Training", value: "functional_training" },
    { label: "ADL / IADL Retraining", value: "adl_iadl_retraining" }
  ],
  showIf: {
    field: "therapist_plan",
    includes: "continue_current_ot_program"
  }
},

/* ===================== PROGRESSION OF FUNCTIONAL ACTIVITIES ===================== */
{
  name: "progression_of_functional_activities_items",
  label: "Progression of Functional Activities",
  type: "checkbox-group",
  options: [
    { label: "Increase Task Complexity", value: "increase_task_complexity" },
    {
      label: "Increase Independence Level",
      value: "increase_independence_level"
    },
    {
      label: "Increase Endurance / Tolerance",
      value: "increase_endurance_tolerance"
    }
  ],
  showIf: {
    field: "therapist_plan",
    includes: "progression_of_functional_activities"
  }
},

/* ===================== REFERRAL ===================== */
{
  name: "referral_options",
  label: "Referral (If Required)",
  type: "radio",
  options: [
    { label: "MDT", value: "mdt" },
    { label: "Work Hardening", value: "work_hardening" },
    { label: "FCE", value: "fce" },
    { label: "Others", value: "others" }
  ],
  showIf: {
    field: "therapist_plan",
    includes: "referral"
  }
},
{
  name: "referral_other",
  label: "Other Referral",
  type: "input",
  placeholder: "Specify other referral",
  showIf: {
    field: "referral_options",
    includes: "others"
  }
},

/* ===================== COMMENT ===================== */
{
  name: "therapist_plan_comment",
  label: "Comment",
  type: "input",
  rows: 3,
  placeholder: "Enter comments"
},

/* ===================== NOTES / COMMENTS ===================== */
{
  name: "therapist_plan_notes_comments",
  label: "Notes / Comments",
  type: "input",
  rows: 4,
  placeholder: "Enter notes or comments"
}

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
export default function MSDProgress({ patient, onBack }) {
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