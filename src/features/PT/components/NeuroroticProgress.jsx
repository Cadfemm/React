
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

        {
  type: "subheading",
  label: "Conventional Exercise"
},

{
  name: "conventional_exercise",

  type: "checkbox-group",
  options: [
    { label: "Gait Training", value: "gait_training" },
    { label: "Others", value: "others" }
  ]
},

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
    field: "conventional_exercise",
    includes: "gait_training"
  }
},

{
  name: "gait_training_remarks",
  label: "Gait Training Remarks",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "conventional_exercise",
    includes: "gait_training"
  }
},

{
  name: "conventional_exercise_other",
  label: "Others",
  type: "input",
  showIf: {
    field: "conventional_exercise",
    includes: "others"
  }
},

{
  name: "conventional_exercise_other_remarks",
  label: "Others Remarks",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "conventional_exercise",
    includes: "others"
  }
},
{
  type: "subheading",
  label: "Modalities Exercise"
},

{
  name: "modalities_exercise",
  label: "Modalities Exercise",
  type: "checkbox-group",
  options: [
    { label: "Cyberdyne HAL LL", value: "cyberdyne_hal_ll" },
    { label: "Cyberdyne HAL SJ", value: "cyberdyne_hal_sj" },
    { label: "Cyberdyne HAL Lumbar", value: "cyberdyne_hal_lumbar" },
    { label: "Luna EMG", value: "luna_emg" },
    { label: "Stella Bio", value: "stella_bio" },
    { label: "Meissa OT", value: "meissa_ot" },
    { label: "Sidra LEG", value: "sidra_leg" },
    { label: "FESIA Walk", value: "fesia_walk" },
    { label: "FESIA Grasp", value: "fesia_grasp" },
    { label: "FESIA Bike", value: "fesia_bike" },
    { label: "Arm Motus EMU", value: "arm_motus_emu" },
    { label: "Arm Motus M2 Pro", value: "arm_motus_m2_pro" },
    { label: "Exo Motus", value: "exo_motus" },
    { label: "Ankle Motus", value: "ankle_motus" },
    { label: "Pelma Motus", value: "pelma_motus" },
    { label: "Wrist Motus", value: "wrist_motus" },
    { label: "Cycle Motus", value: "cycle_motus" },
    { label: "MyndMove", value: "myndmove" },
    { label: "Vibramoov", value: "vibramoov" },
    { label: "ROBERT", value: "robert" },
    { label: "Tymo", value: "tymo" },
    { label: "Pablo", value: "pablo" },
    { label: "BWS Walker", value: "bws_walker" },
    { label: "Syrebo", value: "syrebo" },
    { label: "Chattanooga", value: "chattanooga" },
    {
      label: "Brain Computer Interface (BCI)",
      value: "brain_computer_interface"
    },
    { label: "Others", value: "others" }
  ]
},

// ======================================================
// Cyberdyne HAL LL
// ======================================================

{
  type: "subheading",
  label: "Cyberdyne HAL LL",
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_ll"
  }
},

{
  name: "hal_ll_equipment",
  label: "Equipment",
  type: "radio",
  options: [
    { label: "Treadmill", value: "treadmill" },
    { label: "AIO Walker", value: "aio_walker" },
    { label: "Ceiling Hoist", value: "ceiling_hoist" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_ll"
  }
},

{
  name: "hal_ll_region",
  label: "Region",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_ll"
  }
},

{
  name: "hal_ll_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_ll"
  }
},

{
  name: "hal_ll_remarks",
  label: "Remarks",
  type: "textarea",
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_ll"
  }
},

// ======================================================
// Cyberdyne HAL SJ
// ======================================================

{
  type: "subheading",
  label: "Cyberdyne HAL SJ",
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_sj"
  }
},

{
  name: "hal_sj_region",
  label: "Region",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_sj"
  }
},

{
  name: "hal_sj_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_sj"
  }
},

{
  name: "hal_sj_remarks",
  label: "Remarks",
  type: "textarea",
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_sj"
  }
},

// ======================================================
// Cyberdyne HAL Lumbar
// ======================================================

{
  type: "subheading",
  label: "Cyberdyne HAL Lumbar",
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_lumbar"
  }
},

{
  name: "hal_lumbar_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_lumbar"
  }
},

{
  name: "hal_lumbar_remarks",
  label: "Remarks",
  type: "textarea",
  showIf: {
    field: "modalities_exercise",
    includes: "cyberdyne_hal_lumbar"
  }
},
// ======================================================
// LUNA EMG
// ======================================================

{
  type: "subheading",
  label: "Luna EMG",
  showIf: {
    field: "modalities_exercise",
    includes: "luna_emg"
  }
},

{
  name: "luna_emg_region",
  label: "Region",
  type: "radio",
  options: [
    { label: "Shoulder", value: "shoulder" },
    { label: "Elbow", value: "elbow" },
    { label: "Wrist", value: "wrist" },
    { label: "Hip", value: "hip" },
    { label: "Knee", value: "knee" },
    { label: "Ankle", value: "ankle" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "luna_emg"
  }
},

// ======================================================
// ORTHOPEDIC MODE
// ======================================================

{
  name: "luna_emg_ortho_mode",
  label: "Orthopedic Mode",
  type: "checkbox-group",
  options: [
    { label: "CPM (Exercise Time / Speed / Max Torque)", value: "cpm" },
    { label: "Elastic Resistance", value: "elastic_resistance" },
    { label: "Joint Position Sense - Visible Position", value: "jps_visible" },
    { label: "Joint Position Sense - Hidden Position", value: "jps_hidden" },
    { label: "Weight Lifting", value: "weight_lifting" },
    { label: "Dynamic Reversal", value: "dynamic_reversal" },
    { label: "Progressive CPM", value: "progressive_cpm" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "luna_emg"
  }
},


// ======================================================
// NEUROLOGIC MODE
// ======================================================

{
  name: "luna_emg_neuro_mode",
  label: "Neurologic Mode",
  type: "radio",
  options: [
    { label: "Advanced EMG Biofeedback", value: "adv_emg_biofeedback" },
    { label: "EMG Biofeedback", value: "emg_biofeedback" },
    { label: "Reactive EMG T&H", value: "reactive_emg_th" },
    { label: "Reactive EMG T&R", value: "reactive_emg_tr" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "luna_emg"
  }
},

// ======================================================
// COMMON PARAMETERS
// ======================================================

{
  name: "luna_emg_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "luna_emg"
  }
},
{
  type: "subheading",
  label: "Stella Bio",
  showIf: {
    field: "modalities_exercise",
    includes: "stella_bio"
  }
},

// ======================================================
// SELECTION EXERCISE
// ======================================================

{
  name: "stella_bio_selection_exercise",
  label: "Selection Exercise",
  type: "radio",
  options: [
    { label: "Neuro", value: "neuro" },
    { label: "Ortho", value: "ortho" },
    { label: "Pain", value: "pain" },
    { label: "Pelvic", value: "pelvic" },
    { label: "Sport", value: "sport" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "stella_bio"
  }
},

// ======================================================
// NEURO MODE
// ======================================================

{
  name: "stella_bio_neuro_ems_mode",
  label: "NEURO - EMS Mode Exercise",
  type: "checkbox-group",
  options: [
    { label: "Mild Atrophy", value: "mild_atrophy" },
    { label: "Severe Atrophy", value: "severe_atrophy" },
    { label: "Muscle Spasm Relaxation", value: "muscle_spasm_relaxation" },
    { label: "Grasp and Release", value: "grasp_release" },
    { label: "Open & Close", value: "open_close" },
    { label: "Arm Extension/Support", value: "arm_extension_support" },
    { label: "Hand to Mouth", value: "hand_to_mouth" },
    { label: "EMS User Program", value: "ems_user_program" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "neuro"
  }
},

{
  name: "stella_bio_neuro_ems_emg_mode",
  label: "NEURO - EMS + EMG Mode Exercise",
  type: "checkbox-group",
  options: [
    { label: "Grasp and Release (EMG triggered)", value: "grasp_release_emg" },
    { label: "Open & Close (EMG triggered)", value: "open_close_emg" },
    { label: "Arm Extension/Support (EMG triggered)", value: "arm_extension_support_emg" },
    { label: "Hand to Mouth (EMG triggered)", value: "hand_to_mouth_emg" },
    { label: "EMG Triggered (1 channel)", value: "emg_triggered_1ch" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "neuro"
  }
},

{
  name: "stella_bio_neuro_emg_mode",
  label: "NEURO - EMG Mode Exercise",
  type: "checkbox-group",
  options: [
    { label: "5s Work – 5s Rest", value: "5_5" },
    { label: "10s Work – 10s Rest", value: "10_10" },
    { label: "Quick Flicks", value: "quick_flicks" },
    { label: "EMG Endurance Training", value: "emg_endurance" },
    { label: "EMG Biofeedback", value: "emg_biofeedback" },
    { label: "EMG View", value: "emg_view" },
    { label: "EMG View with MVC", value: "emg_view_mvc" },
    { label: "Relaxation Analysis", value: "relaxation_analysis" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "neuro"
  }
},

{
  name: "stella_bio_neuro_emg_games",
  label: "NEURO - EMG Games",
  type: "checkbox-group",
  options: [
    { label: "Cosmic Mission", value: "cosmic_mission" },
    { label: "Others", value: "others" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "neuro"
  }
},

{
  name: "stella_bio_neuro_emg_games_others",
  label: "NEURO - EMG Games Others",
  type: "input",
  showIf: {
    field: "stella_bio_neuro_emg_games",
    includes: "others"
  }
},

// ======================================================
// ORTHO MODE (sample structure)
// ======================================================

{
  name: "stella_bio_ortho_ems_mode",
  label: "ORTHO - EMS Mode Exercise",
  type: "checkbox-group",
  options: [
    { label: "Muscle Atrophy", value: "muscle_atrophy" },
    { label: "EMG User Program", value: "emg_user_program" },
    { label: "Circulation", value: "circulation" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "ortho"
  }
},

{
  name: "stella_bio_ortho_emg_mode",
  label: "ORTHO - EMG Mode Exercise",
  type: "checkbox-group",
  options: [
    { label: "5s Work – 5s Rest", value: "5_5" },
    { label: "10s Work – 10s Rest", value: "10_10" },
    { label: "Quick Flicks", value: "quick_flicks" },
    { label: "EMG Endurance Training", value: "emg_endurance" },
    { label: "EMG Biofeedback", value: "emg_biofeedback" },
    { label: "EMG View", value: "emg_view" },
    { label: "EMG View with MVC", value: "emg_view_mvc" },
    { label: "Relaxation Analysis", value: "relaxation_analysis" },
    { label: "Low Back Pain Test", value: "low_back_pain_test" },
    { label: "Sorensen Test", value: "sorensen_test" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "ortho"
  }
},

// ======================================================
// PAIN MODE
// ======================================================

{
  name: "stella_bio_pain_tens_mode",
  label: "PAIN - TENS Mode Exercise",
  type: "checkbox-group",
  options: [
    { label: "Conventional", value: "conventional" },
    { label: "Frequency Modulated", value: "frequency_modulated" },
    { label: "Acupuncture", value: "acupuncture" },
    { label: "Burst", value: "burst" },
    { label: "User Program", value: "user_program" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "pain"
  }
},

// ======================================================
// PELVIC MODE (sample)
// ======================================================

{
  name: "stella_bio_pelvic_ems_mode",
  label: "PELVIC - EMS Mode Exercise",
  type: "checkbox-group",
  options: [
    { label: "Fecal Incontinence", value: "fecal_incontinence" },
    { label: "Mixed Incontinence", value: "mixed_incontinence" },
    { label: "Urge Incontinence", value: "urge_incontinence" },
    { label: "Stress Incontinence", value: "stress_incontinence" },
    { label: "Relaxation", value: "relaxation" },
    { label: "Relaxation Plus", value: "relaxation_plus" },
    { label: "EMS Pelvic User Program", value: "ems_pelvic_user_program" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "pelvic"
  }
},

{
  name: "stella_bio_pelvic_emg_games",
  label: "PELVIC - EMG Games",
  type: "checkbox-group",
  options: [
    { label: "Cosmic Mission", value: "cosmic_mission" },
    { label: "Others", value: "others" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "pelvic"
  }
},

{
  name: "stella_bio_pelvic_emg_games_others",
  label: "PELVIC - EMG Games Others",
  type: "input",
  showIf: {
    field: "stella_bio_pelvic_emg_games",
    includes: "others"
  }
},
// ======================================================
// SPORT MODE
// ======================================================

{
  name: "stella_bio_sport_ems_mode",
  label: "SPORT - EMS Mode Exercise",
  type: "checkbox-group",
  options: [
    { label: "Agonist / Antagonist", value: "agonist_antagonist" },
    { label: "Power Training", value: "power_training" },
    { label: "Muscle Strengthening", value: "muscle_strengthening" },
    { label: "Exercise Prep", value: "exercise_prep" },
    { label: "Active Recovery", value: "active_recovery" },
    { label: "Massage", value: "massage" },
    { label: "Endurance Training", value: "endurance_training" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "sport"
  }
},

{
  name: "stella_bio_sport_emg_mode",
  label: "SPORT - EMG Mode Exercise",
  type: "checkbox-group",
  options: [
    { label: "5s Work – 5s Rest", value: "5_5" },
    { label: "10s Work – 10s Rest", value: "10_10" },
    { label: "Quick Flicks", value: "quick_flicks" },
    { label: "EMG Endurance Training", value: "emg_endurance_training" },
    { label: "EMG Biofeedback", value: "emg_biofeedback" },
    { label: "EMG View", value: "emg_view" },
    { label: "EMG View with MVC", value: "emg_view_mvc" },
    { label: "Relaxation Analysis", value: "relaxation_analysis" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "sport"
  }
},

{
  name: "stella_bio_sport_emg_games",
  label: "SPORT - EMG Games",
  type: "radio",
  options: [
    { label: "Cosmic Mission", value: "cosmic_mission" },
    { label: "Others", value: "others" }
  ],
  showIf: {
    field: "stella_bio_selection_exercise",
    equals: "sport"
  }
},

{
  name: "stella_bio_sport_emg_games_others",
  label: "SPORT - EMG Games Others",
  type: "input",
  showIf: {
    field: "stella_bio_sport_emg_games",
    includes: "others"
  }
},
{
  type: "subheading",
  label: "Meissa OT",
  showIf: {
    field: "modalities_exercise",
    includes: "meissa_ot"
  }
},

{
  name: "meissa_ot_training_type",
  label: "Training Type",
  type: "checkbox-group",
  options: [
    { label: "CPM", value: "cpm" },
    { label: "CPM + EMS", value: "cpm_ems" },
    { label: "CPM + EMG", value: "cpm_emg" },
    { label: "CPM + EMG + EMS", value: "cpm_emg_ems" },
    { label: "CAM Isokinetic", value: "cam_isokinetic" },
    { label: "CAM Turn Key", value: "cam_turn_key" },
    { label: "CAM Torque", value: "cam_torque" },
    { label: "CPM Force", value: "cpm_force" },
    { label: "Cosmic Mission", value: "cosmic_mission" },
    { label: "Dream Drive", value: "dream_drive" },
    { label: "Rope-Nope", value: "rope_nope" },
    { label: "Others", value: "others" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "meissa_ot"
  }
},

{
  name: "meissa_ot_others",
  label: "Others (Free Text)",
  type: "input",
  showIf: {
    field: "meissa_ot_training_type",
    includes: "others"
  }
},

{
  name: "meissa_ot_time_repetition",
  label: "Time / Repetition",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "meissa_ot"
  }
},

{
  name: "meissa_ot_side",
  label: "Side",
  type: "radio",
  options: [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "meissa_ot"
  }
},

{
  name: "meissa_ot_remarks",
  label: "Remarks",
  type: "textarea",
  showIf: {
    field: "modalities_exercise",
    includes: "meissa_ot"
  }
},

// ======================================================
// SIDRA LEG
// ======================================================

{
  type: "subheading",
  label: "Sidra LEG",
  showIf: {
    field: "modalities_exercise",
    includes: "sidra_leg"
  }
},

{
  name: "sidra_leg_training_type",
  label: "Training Type",
  type: "checkbox-group",
  options: [
    { label: "CPM Knee", value: "cpm_knee" },
    { label: "CPM Ankle", value: "cpm_ankle" },
    { label: "CPM Knee with Synced Ankle", value: "cpm_knee_synced_ankle" },
    { label: "CPM Knee Progressive", value: "cpm_knee_progressive" },
    { label: "CPM Ankle Progressive", value: "cpm_ankle_progressive" },
    { label: "CPM Knee with Synced Ankle Progressive", value: "cpm_knee_synced_ankle_progressive" },
    { label: "CPM + EMG Knee", value: "cpm_emg_knee" },
    { label: "CPM EMG + Ankle", value: "cpm_emg_ankle" },
    { label: "CPM EMG Knee with Synced Ankle", value: "cpm_emg_knee_synced_ankle" },
    { label: "CPM + EMS Knee", value: "cpm_ems_knee" },
    { label: "CPM + EMS Ankle", value: "cpm_ems_ankle" },
    { label: "Others", value: "others" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "sidra_leg"
  }
},

{
  name: "sidra_leg_others",
  label: "Others (Free Text)",
  type: "input",
  showIf: {
    field: "sidra_leg_training_type",
    includes: "others"
  }
},

{
  name: "sidra_leg_time_repetition",
  label: "Time / Repetition",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "sidra_leg"
  }
},

{
  name: "sidra_leg_side",
  label: "Side",
  type: "radio",
  options: [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "sidra_leg"
  }
},

{
  name: "sidra_leg_remarks",
  label: "Remarks",
  type: "textarea",
  showIf: {
    field: "modalities_exercise",
    includes: "sidra_leg"
  }
},
{
  type: "subheading",
  label: "FESIA Walk",
  showIf: {
    field: "modalities_exercise",
    includes: "fesia_walk"
  }
},

{
  name: "fesia_walk_protocols",
  label: "Protocols",
  type: "checkbox-group",
  options: [
    { label: "Habituation", value: "habituation" },
    { label: "Tone Reduction", value: "tone_reduction" },
    { label: "Repetitive Task Training", value: "repetitive_task_training" },
    { label: "Gait", value: "gait" },
    { label: "Balance", value: "balance" },
    { label: "External Assistance", value: "external_assistance" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "fesia_walk"
  }
},

{
  name: "fesia_walk_side",
  label: "Side",
  type: "radio",
  options: [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
    { label: "Bilateral", value: "bilateral" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "fesia_walk"
  }
},

{
  name: "fesia_walk_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "fesia_walk"
  }
},

// ======================================================
// FESIA GRASP
// ======================================================

{
  type: "subheading",
  label: "FESIA Grasp",
  showIf: {
    field: "modalities_exercise",
    includes: "fesia_grasp"
  }
},

{
  name: "fesia_grasp_protocols",
  label: "Protocols",
  type: "checkbox-group",
  options: [
    { label: "Habituation", value: "habituation" },
    { label: "Tone Reduction", value: "tone_reduction" },
    { label: "Repetitive Task Training", value: "repetitive_task_training" },
    { label: "Sensory Motion Trigger Stimulation", value: "sensory_motion_trigger_stimulation" },
    { label: "ADLs Training", value: "adls_training" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "fesia_grasp"
  }
},

{
  name: "fesia_grasp_side",
  label: "Side",
  type: "radio",
  options: [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "fesia_grasp"
  }
},

{
  name: "fesia_grasp_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "fesia_grasp"
  }
},

// ======================================================
// FESIA BIKE
// ======================================================

{
  type: "subheading",
  label: "FESIA Bike",
  showIf: {
    field: "modalities_exercise",
    includes: "fesia_bike"
  }
},

{
  name: "fesia_bike_side",
  label: "Side",
  type: "radio",
  options: [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
    { label: "Bilateral", value: "bilateral" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "fesia_bike"
  }
},

{
  name: "fesia_bike_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "fesia_bike"
  }
},
{
  type: "subheading",
  label: "Arm Motus EMU",
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_emu"
  }
},

// ======================================================
// MOTOR COORDINATION
// ======================================================

{
  name: "arm_motus_emu_motor_coordination_mode",
  label: "Motor Coordination - Training Mode",
  type: "checkbox-group",
  options: [
    { label: "Musical Note", value: "musical_note" },
    { label: "Go Fishing", value: "go_fishing" },
    { label: "Trajectory Training", value: "trajectory_training" },
    { label: "Touch It", value: "touch_it" },
    { label: "Table Tennis", value: "table_tennis" },
    { label: "Botanical Garden", value: "botanical_garden" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_emu"
  }
},

{
  name: "arm_motus_emu_motor_coordination_type",
  label: "Motor Coordination - Type",
  type: "radio",
  options: [
    { label: "Active", value: "active" },
    { label: "Passive", value: "passive" },
    { label: "Resistance", value: "resistance" },
    { label: "Assisted", value: "assisted" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_emu"
  }
},

{
  name: "arm_motus_emu_motor_coordination_duration",
  label: "Motor Coordination Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_emu"
  }
},

// ======================================================
// COGNITIVE TRAINING
// ======================================================

{
  name: "arm_motus_emu_cognitive_mode",
  label: "Cognitive Training - Mode",
  type: "radio",
  options: [
    { label: "Happy Restaurant", value: "happy_restaurant" },
    { label: "Clever Mind", value: "clever_mind" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_emu"
  }
},

{
  name: "arm_motus_emu_cognitive_type",
  label: "Cognitive Training - Type",
  type: "radio",
  options: [
    { label: "Assisted", value: "assisted" },
    { label: "Active", value: "active" },
    { label: "Resistance", value: "resistance" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_emu"
  }
},

{
  name: "arm_motus_emu_cognitive_duration",
  label: "Cognitive Training Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_emu"
  }
},
{
  type: "subheading",
  label: "Arm Motus M2 Pro",
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_m2_pro"
  }
},

// ======================================================
// MOTOR COORDINATION
// ======================================================

{
  name: "arm_motus_m2_motor_coordination_mode",
  label: "Motor Coordination - Training Mode",
  type: "checkbox-group",
  options: [
    { label: "Zoo & Friends", value: "zoo_friends" },
    { label: "Herbal Garden", value: "herbal_garden" },
    { label: "Ball", value: "ball" },
    { label: "Defend Base", value: "defend_base" },
    { label: "Cube World", value: "cube_world" },
    { label: "Musical Note", value: "musical_note" },
    { label: "Go Fishing", value: "go_fishing" },
    { label: "Botanical Garden", value: "botanical_garden" },
    { label: "Colour Rush", value: "colour_rush" },
    { label: "Galaxy War", value: "galaxy_war" },
    { label: "Table Tennis", value: "table_tennis" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_m2_pro"
  }
},

{
  name: "arm_motus_m2_motor_coordination_type",
  label: "Motor Coordination - Type",
  type: "radio",
  options: [
    { label: "Active", value: "active" },
    { label: "Passive", value: "passive" },
    { label: "Resistance", value: "resistance" },
    { label: "Assisted", value: "assisted" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_m2_pro"
  }
},

{
  name: "arm_motus_m2_motor_coordination_duration",
  label: "Motor Coordination - Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_m2_pro"
  }
},

// ======================================================
// COGNITIVE TRAINING
// ======================================================

{
  name: "arm_motus_m2_cognitive_mode",
  label: "Cognitive Training - Mode",
  type: "radio",
  options: [
    { label: "Wrack A Mole", value: "whack_a_mole" },
    { label: "Find Treasure", value: "find_treasure" },
    { label: "Happy Restaurant", value: "happy_restaurant" },
    { label: "Clever Mind", value: "clever_mind" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_m2_pro"
  }
},

{
  name: "arm_motus_m2_cognitive_type",
  label: "Cognitive Training - Type",
  type: "radio",
  options: [
    { label: "Passive", value: "passive" },
    { label: "Assisted", value: "assisted" },
    { label: "Active", value: "active" },
    { label: "Resistance", value: "resistance" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_m2_pro"
  }
},

{
  name: "arm_motus_m2_cognitive_duration",
  label: "Cognitive Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_m2_pro"
  }
},

// ======================================================
// ISOMETRIC TRAINING
// ======================================================

{
  name: "arm_motus_m2_isometric_type",
  label: "Isometric Training Type",
  type: "radio",
  options: [
    { label: "Active", value: "active" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_m2_pro"
  }
},

{
  name: "arm_motus_m2_isometric_duration",
  label: "Isometric Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "arm_motus_m2_pro"
  }
},
{
  type: "subheading",
  label: "Exo Motus",
  showIf: {
    field: "modalities_exercise",
    includes: "exo_motus"
  }
},

// ======================================================
// PASSIVE MODE
// ======================================================

{
  name: "exo_motus_passive_mode",
  label: "Training Mode (Passive)",
  type: "radio",
  options: [
    { label: "Walking", value: "walking" },
    { label: "Stepping", value: "stepping" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "exo_motus"
  }
},

{
  name: "exo_motus_passive_speed",
  label: "Speed (Level)",
  type: "radio",
  options: [
    { label: "Level 1", value: "1" },
    { label: "Level 2", value: "2" },
    { label: "Level 3", value: "3" },
    { label: "Level 4", value: "4" },
    { label: "Level 5", value: "5" },
    { label: "Level 6", value: "6" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "exo_motus"
  }
},

{
  name: "exo_motus_passive_step_length",
  label: "Step Length (Level)",
  type: "radio",
  options: [
    { label: "Level 1", value: "1" },
    { label: "Level 2", value: "2" },
    { label: "Level 3", value: "3" },
    { label: "Level 4", value: "4" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "exo_motus"
  }
},

{
  name: "exo_motus_passive_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "exo_motus"
  }
},

// ======================================================
// ASSISTED MODE
// ======================================================

{
  name: "exo_motus_assisted_mode",
  label: "Training Mode (Assisted)",
  type: "radio",
  options: [
    { label: "Walking", value: "walking" },
    { label: "Stepping", value: "stepping" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "exo_motus"
  }
},

{
  name: "exo_motus_assisted_guidance_force",
  label: "Guidance Force (Level)",
  type: "radio",
  options: [
    { label: "Level 1", value: "1" },
    { label: "Level 2", value: "2" },
    { label: "Level 3", value: "3" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "exo_motus"
  }
},

{
  name: "exo_motus_assisted_step_length",
  label: "Step Length (Level)",
  type: "radio",
  options: [
    { label: "Level 1", value: "1" },
    { label: "Level 2", value: "2" },
    { label: "Level 3", value: "3" },
    { label: "Level 4", value: "4" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "exo_motus"
  }
},

{
  name: "exo_motus_assisted_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "exo_motus"
  }
},
{
  type: "subheading",
  label: "Ankle Motus",
  showIf: {
    field: "modalities_exercise",
    includes: "ankle_motus"
  }
},

// ======================================================
// MOTOR COORDINATION
// ======================================================

{
  name: "ankle_motus_motor_coordination_mode",
  label: "Motor Coordination - Training Mode",
  type: "checkbox-group",
  options: [
    { label: "Botanical Garden", value: "botanical_garden" },
    { label: "Spring Pong", value: "spring_pong" },
    { label: "Tower Defense", value: "tower_defense" },
    { label: "Colour Rush", value: "colour_rush" },
    { label: "Galaxy War", value: "galaxy_war" },
    { label: "Ocean Adventure", value: "ocean_adventure" },
    { label: "Cube War", value: "cube_war" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "ankle_motus"
  }
},

{
  name: "ankle_motus_motor_coordination_type",
  label: "Motor Coordination - Training Type",
  type: "radio",
  options: [
    { label: "Active", value: "active" },
    { label: "Passive", value: "passive" },
    { label: "Resistance", value: "resistance" },
    { label: "Assisted", value: "assisted" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "ankle_motus"
  }
},

{
  name: "ankle_motus_motor_coordination_duration",
  label: "Motor Coordination Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "ankle_motus"
  }
},

// ======================================================
// COGNITIVE TRAINING
// ======================================================

{
  name: "ankle_motus_cognitive_type",
  label: "Cognitive Training Type",
  type: "radio",
  options: [
    { label: "Assisted", value: "assisted" },
    { label: "Active", value: "active" },
    { label: "Resistance", value: "resistance" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "ankle_motus"
  }
},

{
  name: "ankle_motus_cognitive_duration",
  label: "Cognitive Training Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "ankle_motus"
  }
},

// ======================================================
// ISOMETRIC TRAINING
// ======================================================

{
  name: "ankle_motus_isometric_duration",
  label: "Isometric Training (Air Gunner) Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "ankle_motus"
  }
},

// ======================================================
// STRETCHING
// ======================================================

{
  name: "ankle_motus_stretching_duration",
  label: "Stretching Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "ankle_motus"
  }
},

// ======================================================
// PELMA MOTUS
// ======================================================

{
  type: "subheading",
  label: "Pelma Motus",
  showIf: {
    field: "modalities_exercise",
    includes: "pelma_motus"
  }
},

{
  name: "pelma_motus_trajectory",
  label: "Training Trajectory",
  type: "radio",
  options: [
    { label: "Random", value: "random" },
    { label: "Circular", value: "circular" },
    { label: "Forward", value: "forward" },
    { label: "Backward", value: "backward" },
    { label: "Left", value: "left" },
    { label: "Right", value: "right" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "pelma_motus"
  }
},

{
  name: "pelma_motus_scene",
  label: "Type Scene",
  type: "radio",
  options: [
    { label: "Barefoot", value: "barefoot" },
    { label: "Accessory", value: "accessory" },
    { label: "Shoes", value: "shoes" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "pelma_motus"
  }
},

{
  name: "pelma_motus_difficulty",
  label: "Difficulty",
  type: "radio",
  options: [
    { label: "Easy", value: "easy" },
    { label: "Normal", value: "normal" },
    { label: "Hard", value: "hard" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "pelma_motus"
  }
},

{
  name: "pelma_motus_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "pelma_motus"
  }
},
{
  type: "subheading",
  label: "Wrist Motus",
  showIf: {
    field: "modalities_exercise",
    includes: "wrist_motus"
  }
},

// ======================================================
// MOTOR COORDINATION
// ======================================================

{
  name: "wrist_motus_motor_coordination_mode",
  label: "Motor Coordination - Training Mode",
  type: "checkbox-group",
  options: [
    { label: "Botanical Garden", value: "botanical_garden" },
    { label: "Spring Pong", value: "spring_pong" },
    { label: "Tower Defense", value: "tower_defense" },
    { label: "Colour Rush", value: "colour_rush" },
    { label: "Galaxy War", value: "galaxy_war" },
    { label: "Table Tennis", value: "table_tennis" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "wrist_motus"
  }
},

{
  name: "wrist_motus_motor_coordination_type",
  label: "Motor Coordination - Training Type",
  type: "radio",
  options: [
    { label: "Active", value: "active" },
    { label: "Passive", value: "passive" },
    { label: "Resistance", value: "resistance" },
    { label: "Assisted", value: "assisted" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "wrist_motus"
  }
},

{
  name: "wrist_motus_motor_coordination_duration",
  label: "Motor Coordination - Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "wrist_motus"
  }
},

// ======================================================
// COGNITIVE TRAINING
// ======================================================

{
  name: "wrist_motus_cognitive_type",
  label: "Cognitive Training Type",
  type: "radio",
  options: [
    { label: "Assisted", value: "assisted" },
    { label: "Active", value: "active" },
    { label: "Resistance", value: "resistance" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "wrist_motus"
  }
},

{
  name: "wrist_motus_cognitive_duration",
  label: "Cognitive Training Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "wrist_motus"
  }
},

// ======================================================
// ISOMETRIC TRAINING
// ======================================================

{
  name: "wrist_motus_isometric_type",
  label: "Isometric Training Type",
  type: "radio",
  options: [
    { label: "Active", value: "active" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "wrist_motus"
  }
},

{
  name: "wrist_motus_isometric_duration",
  label: "Isometric Training Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "wrist_motus"
  }
},
{
  type: "subheading",
  label: "Cycle Motus",
  showIf: {
    field: "modalities_exercise",
    includes: "cycle_motus"
  }
},

{
  name: "cycle_motus_training_type",
  label: "Training Type",
  type: "radio",
  options: [
    { label: "Cross Cycling", value: "cross_cycling" },
    { label: "Horizontal", value: "horizontal" },
    { label: "Sync Cycling", value: "sync_cycling" },
    { label: "Leg Trainer", value: "leg_trainer" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "cycle_motus"
  }
},

{
  name: "cycle_motus_training_mode",
  label: "Training Mode",
  type: "radio",
  options: [
    { label: "Intelligent", value: "intelligent" },
    { label: "Active", value: "active" },
    { label: "Passive", value: "passive" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "cycle_motus"
  }
},

{
  name: "cycle_motus_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "cycle_motus"
  }
},

// ======================================================
// MYNDMOVE
// ======================================================

{
  type: "subheading",
  label: "MyndMove",
  showIf: {
    field: "modalities_exercise",
    includes: "myndmove"
  }
},

{
  name: "myndmove_protocols",
  label: "Protocols",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "modalities_exercise",
    includes: "myndmove"
  }
},

{
  name: "myndmove_side",
  label: "Side",
  type: "radio",
  options: [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "myndmove"
  }
},

{
  name: "myndmove_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "myndmove"
  }
},
{
  type: "subheading",
  label: "Vibramoov",
  showIf: {
    field: "modalities_exercise",
    includes: "vibramoov"
  }
},

// ======================================================
// MOBILITY FPS - LEGS
// ======================================================

{
  name: "vibramoov_mode",
  label: "Mode",
  type: "radio",
  options: [
    { label: "Protocol Treatment - Mobility FPS", value: "mobility_fps" },
    { label: "Hypertonia Focal Vibration", value: "hypertonia_focal_vibration" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "vibramoov"
  }
},

{
  name: "vibramoov_body_part_legs",
  label: "Body Part (Legs)",
  type: "radio",
  options: [
    { label: "Legs", value: "legs" }
  ],
  showIf: {
    field: "vibramoov_mode",
    equals: "mobility_fps"
  }
},

{
  name: "vibramoov_position_legs",
  label: "Position (Legs)",
  type: "radio",
  options: [
    { label: "Lying Down", value: "lying_down" },
    { label: "Verticalized", value: "verticalized" },
    { label: "Standing", value: "standing" }
  ],
  showIf: {
    field: "vibramoov_mode",
    equals: "mobility_fps"
  }
},

{
  name: "vibramoov_activity_legs",
  label: "Activity (Legs)",
  type: "checkbox-group",
  options: [
    { label: "Multi Activity", value: "multi_activity" },
    { label: "Gait", value: "gait" },
    { label: "Flexions", value: "flexions" },
    { label: "Stairs", value: "stairs" },
    { label: "Postural Control", value: "postural_control" },
    { label: "Gait (Manual or Automatic)", value: "gait_manual_automatic" }
  ],
  showIf: {
    field: "vibramoov_mode",
    equals: "mobility_fps"
  }
},

{
  name: "vibramoov_intensity_legs",
  label: "Intensity (Legs)",
  type: "radio",
  options: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" }
  ],
  showIf: {
    field: "vibramoov_mode",
    equals: "mobility_fps"
  }
},

{
  name: "vibramoov_duration_legs",
  label: "Duration (Legs)",
  type: "input",
  showIf: {
    field: "vibramoov_mode",
    equals: "mobility_fps"
  }
},

// ======================================================
// ARMS
// ======================================================

{
  name: "vibramoov_body_part_arms",
  label: "Body Parts (Arms)",
  type: "radio",
  options: [
    { label: "Bilateral", value: "bilateral" },
    { label: "Left Arm", value: "left_arm" },
    { label: "Right Arm", value: "right_arm" }
  ],
  showIf: {
    field: "vibramoov_mode",
    equals: "mobility_fps"
  }
},

{
  name: "vibramoov_activity_arms",
  label: "Activity (Arms)",
  type: "checkbox-group",
  options: [
    { label: "Multi Activity", value: "multi_activity" },
    { label: "Reaching / Pointing", value: "reaching_pointing" },
    { label: "Writing / Drawing", value: "writing_drawing" },
    { label: "Activities of Daily Living", value: "adl" }
  ],
  showIf: {
    field: "vibramoov_mode",
    equals: "mobility_fps"
  }
},

{
  name: "vibramoov_intensity_arms",
  label: "Intensity (Arms)",
  type: "radio",
  options: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" }
  ],
  showIf: {
    field: "vibramoov_mode",
    equals: "mobility_fps"
  }
},

{
  name: "vibramoov_duration_arms",
  label: "Duration (Arms)",
  type: "input",
  showIf: {
    field: "vibramoov_mode",
    equals: "mobility_fps"
  }
},

// ======================================================
// HYPERTONIA FOCAL VIBRATION
// ======================================================

{
  name: "vibramoov_hypertonia_intensity",
  label: "Intensity",
  type: "radio",
  options: [
    { label: "Severe", value: "severe" },
    { label: "Moderate", value: "moderate" }
  ],
  showIf: {
    field: "vibramoov_mode",
    equals: "hypertonia_focal_vibration"
  }
},

{
  name: "vibramoov_hypertonia_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "vibramoov_mode",
    equals: "hypertonia_focal_vibration"
  }
},

{
  name: "vibramoov_remarks",
  label: "Remarks",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "modalities_exercise",
    includes: "vibramoov"
  }
},
{
  type: "subheading",
  label: "ROBERT",
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

// ======================================================
// LOWER EXTREMITY
// ======================================================

{
  name: "robert_primary_joint_lower",
  label: "Primary Joint (Lower Extremity)",
  type: "radio",
  options: [
    { label: "Hip", value: "hip" },
    { label: "Knee", value: "knee" },
    { label: "Ankle", value: "ankle" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_side_lower",
  label: "Side",
  type: "radio",
  options: [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_position_lower",
  label: "Position",
  type: "radio",
  options: [
    { label: "Supine", value: "supine" },
    { label: "Lateral", value: "lateral" },
    { label: "Seated", value: "seated" },
    { label: "Prone", value: "prone" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_movement_lower",
  label: "Movement",
  type: "checkbox-group",
  options: [
    { label: "Flexion", value: "flexion" },
    { label: "Extension", value: "extension" },
    { label: "Abduction", value: "abduction" },
    { label: "Adduction", value: "adduction" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_motion_setup_lower",
  label: "Motion Setup",
  type: "radio",
  options: [
    { label: "Active", value: "active" },
    { label: "Guided", value: "guided" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_repetition_lower",
  label: "Repetition",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_resistance_lower",
  label: "Resistance",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_sas_lower",
  label: "SAS",
  type: "radio",
  options: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

// ======================================================
// UPPER EXTREMITY
// ======================================================

{
  name: "robert_primary_joint_upper",
  label: "Primary Joint (Upper Extremity)",
  type: "radio",
  options: [
    { label: "Shoulder", value: "shoulder" },
    { label: "Elbow", value: "elbow" },
    { label: "Wrist", value: "wrist" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_position_upper",
  label: "Position",
  type: "radio",
  options: [
    { label: "Supine", value: "supine" },
    { label: "Seated", value: "seated" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_movement_upper",
  label: "Movement",
  type: "checkbox-group",
  options: [
    { label: "Shoulder Internal & External Rotation", value: "shoulder_rotation" },
    { label: "Shoulder Flexion & Extension", value: "shoulder_flex_ext" },
    { label: "Shoulder Abduction & Adduction", value: "shoulder_abd_add" },
    { label: "Elbow Flexion & Extension", value: "elbow_flex_ext" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_motion_setup_upper",
  label: "Motion Setup",
  type: "radio",
  options: [
    { label: "Active", value: "active" },
    { label: "Guided", value: "guided" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_repetition_upper",
  label: "Repetition",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_resistance_upper",
  label: "Resistance",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},

{
  name: "robert_sas_upper",
  label: "SAS",
  type: "radio",
  options: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "robert"
  }
},
{
  type: "subheading",
  label: "Tymo",
  showIf: {
    field: "modalities_exercise",
    includes: "tymo"
  }
},

{
  name: "tymo_therapy_programs",
  label: "Therapy Programs",
  type: "radio",
  options: [
    { label: "1D Accuracy", value: "1d_accuracy" },
    { label: "1D Reaction", value: "1d_reaction" },
    { label: "2D Motor Function", value: "2d_motor_function" },
    { label: "2D Cognition", value: "2d_cognition" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "tymo"
  }
},

{
  name: "tymo_exercise_type",
  label: "Types of Exercise",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "tymo"
  }
},

{
  name: "tymo_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "tymo"
  }
},

{
  name: "tymo_remarks",
  label: "Remarks",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "modalities_exercise",
    includes: "tymo"
  }
},
{
  type: "subheading",
  label: "Pablo",
  showIf: {
    field: "modalities_exercise",
    includes: "pablo"
  }
},

{
  name: "pablo_therapy_programs",
  label: "Therapy Programs",
  type: "radio",
  options: [
    { label: "1D Accuracy", value: "1d_accuracy" },
    { label: "1D Reaction", value: "1d_reaction" },
    { label: "2D Motor Function", value: "2d_motor_function" },
    { label: "2D Cognition", value: "2d_cognition" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "pablo"
  }
},

{
  name: "pablo_exercise_type",
  label: "Types of Exercise",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "pablo"
  }
},

{
  name: "pablo_duration",
  label: "Duration",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "pablo"
  }
},

{
  name: "pablo_remarks",
  label: "Remarks",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "modalities_exercise",
    includes: "pablo"
  }
},

// ======================================================
// BWS Walker
// ======================================================

{
  type: "subheading",
  label: "BWS Walker",
  showIf: {
    field: "modalities_exercise",
    includes: "bws_walker"
  }
},

{
  name: "bws_walker_remarks",
  label: "Remarks",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "modalities_exercise",
    includes: "bws_walker"
  }
},
{
  type: "subheading",
  label: "Syrebo",
  showIf: {
    field: "modalities_exercise",
    includes: "syrebo"
  }
},

{
  name: "syrebo_training_mode",
  label: "Training",
  type: "radio",
  options: [
    { label: "Group Mode", value: "group_mode" },
    { label: "Refined Mode", value: "refined_mode" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "syrebo"
  }
},

{
  name: "syrebo_group_mode",
  label: "Group Mode",
  type: "radio",
  options: [
    { label: "Passive Training", value: "passive_training" },
    { label: "Master Slave", value: "master_slave" },
    { label: "Assistance", value: "assistance" },
    { label: "Resistance", value: "resistance" }
  ],
  showIf: {
    field: "syrebo_training_mode",
    equals: "group_mode"
  }
},

{
  name: "syrebo_refined_mode",
  label: "Refined Mode",
  type: "radio",
  options: [
    { label: "Passive Training", value: "passive_training" },
    { label: "Action Library", value: "action_library" },
    { label: "Master Slave", value: "master_slave" },
    { label: "Functional Training", value: "functional_training" }
  ],
  showIf: {
    field: "syrebo_training_mode",
    equals: "refined_mode"
  }
},

{
  name: "syrebo_training_time",
  label: "Training Time",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "syrebo"
  }
},
{
  type: "subheading",
  label: "Chattanooga",
  showIf: {
    field: "modalities_exercise",
    includes: "chattanooga"
  }
},

{
  name: "chattanooga_region",
  label: "Region",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "chattanooga"
  }
},

{
  name: "chattanooga_side",
  label: "Side",
  type: "radio",
  options: [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "chattanooga"
  }
},
{
  type: "subheading",
  label: "Brain Computer Interface (BCI)",
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},

{
  name: "bci_region",
  label: "Region",
  type: "radio",
  options: [
    { label: "Right Wrist, Left Wrist", value: "right_wrist_left_wrist" },
    { label: "Right Wrist, Left Ankle", value: "right_wrist_left_ankle" },
    { label: "Left Wrist, Right Ankle", value: "left_wrist_right_ankle" }
  ],
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},

{
  name: "bci_intensity",
  label: "Intensity (mA)",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},

{
  name: "bci_total_set",
  label: "Total Set",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},

{
  type: "subheading",
  label: "Total Time",
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},

{
  name: "bci_total_time_1",
  label: "Total Time 1",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},

{
  name: "bci_total_time_2",
  label: "Total Time 2",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},

{
  name: "bci_total_time_3",
  label: "Total Time 3",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},

{
  type: "subheading",
  label: "Scoring",
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},

{
  name: "bci_scoring_1",
  label: "Scoring 1 (%)",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},

{
  name: "bci_scoring_2",
  label: "Scoring 2 (%)",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},

{
  name: "bci_scoring_3",
  label: "Scoring 3 (%)",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "brain_computer_interface"
  }
},
{
  name: "modalities_exercise_other",
  label: "Others",
  type: "input",
  showIf: {
    field: "modalities_exercise",
    includes: "others"
  }
},

{
  name: "modalities_exercise_other_remarks",
  label: "Others Remarks",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "modalities_exercise",
    includes: "others"
  }
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
    { label: "Hot Therapy", value: "hot_therapy" },
    { label: "Laser", value: "laser" },
    { label: "Other", value: "other" }
  ]
},

{
  name: "cold_therapy_remarks",
  label: "Cold Therapy Remarks",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "pain_management",
    includes: "cold_therapy"
  }
},

{
  name: "hot_therapy_remarks",
  label: "Hot Therapy Remarks",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "pain_management",
    includes: "hot_therapy"
  }
},

{
  name: "laser_remarks",
  label: "Laser Remarks",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "pain_management",
    includes: "laser"
  }
},

{
  name: "other_pain_management",
  label: "Other",
  type: "input",
  showIf: {
    field: "pain_management",
    includes: "other"
  }
},

{
  name: "other_pain_management_remarks",
  label: "Other Remarks",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "pain_management",
    includes: "other"
  }
},


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
    
      { name: "assessment_notes", label: "Clinical Impression / Notes", type: "textarea", placeholder: "Therapist assessment..." },


      
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
        {
  type: "subheading",
  label: "Therapist Notes"
},

{
  name: "plan_therapist_notes",
  label: "Therapist Notes",
  type: "checkbox-group",
  options: [
    {
      label: "Continue Intervention",
      value: "continue_intervention"
    },
    {
      label: "Modify Parameters",
      value: "modify_parameters"
    },
    {
      label: "Progress Exercises To",
      value: "progress_exercises_to"
    },
    {
      label: "Frequency of Next Treatment",
      value: "frequency_next_treatment"
    },
    {
      label: "Reassessment Plan",
      value: "reassessment_plan"
    },
    {
      label: "Remarks",
      value: "remarks"
    }
  ]
},

{
  name: "plan_modify_parameters",
  label: "Modify Parameters (if any)",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "plan_therapist_notes",
    includes: "modify_parameters"
  }
},

{
  name: "plan_progress_exercises_to",
  label: "Progress Exercises To",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "plan_therapist_notes",
    includes: "progress_exercises_to"
  }
},

{
  name: "plan_frequency_next_treatment",
  label: "Frequency of Next Treatment",
  type: "input",
  showIf: {
    field: "plan_therapist_notes",
    includes: "frequency_next_treatment"
  }
},

{
  name: "plan_reassessment_plan",
  label: "Reassessment Plan",
  type: "textarea",
  rows: 3,
  showIf: {
    field: "plan_therapist_notes",
    includes: "reassessment_plan"
  }
},

{
  name: "plan_remarks",
  label: "Remarks",
  type: "textarea",
  rows: 4,
  showIf: {
    field: "plan_therapist_notes",
    includes: "remarks"
  }
},

        // ======================================================
        // THERAPIST NOTES
        // ======================================================

       

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
export default function NeuroroticProgress({ patient, onBack }) {
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
                    <textarea
                      style={textarea}
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
                    <textarea
                      style={textarea}
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
                    <textarea
                      style={textarea}
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
const textarea = {
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