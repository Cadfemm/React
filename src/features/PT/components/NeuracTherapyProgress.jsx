
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
      title: "Neurac Therapy Interventions",
      fields: [

        

{
  name: "lumbar_neurac_sections",
  label: "Lumbar Neurac Protocol",
  type: "checkbox-group",

  options: [
    {
      label: "Mysofascial Chain Exercise",
      value: "mysofascial_chain_exercise"
    },
    {
      label: "Lumbar Settings",
      value: "lumbar_settings"
    }
  ]
},

// =====================================================
// A) MYSOFASCIAL CHAIN EXERCISE
// =====================================================

{
  name: "lumbar_mysofascial_chain_exercise",
  label: "Mysofascial Chain Exercise",
  type: "checkbox-group",
  showIf: {
    field: "lumbar_neurac_sections",
    includes: "mysofascial_chain_exercise"
  },
  options: [
    {
      label: "Supine Pelvic Lift",
      value: "supine_pelvic_lift"
    },
    {
      label: "Supine Bridging",
      value: "supine_bridging"
    },
    {
      label: "Prone Bridging",
      value: "prone_bridging"
    },
    {
      label: "Side-Lying Hip Abduction",
      value: "side_lying_hip_abduction"
    },
    {
      label: "Side-Lying Hip Adduction",
      value: "side_lying_hip_adduction"
    },
    {
      label: "Others",
      value: "others"
    }
  ]
},

// ----- Supine Pelvic Lift Parameters -----
{ type: "row", showIf: { field: "lumbar_mysofascial_chain_exercise", includes: "supine_pelvic_lift" }, fields: [
  { name: "lumbar_supine_pelvic_lift_setup", label: "Supine Pelvic Lift - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "lumbar_supine_pelvic_lift_repetitions", label: "Supine Pelvic Lift - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "lumbar_mysofascial_chain_exercise", includes: "supine_pelvic_lift" }, fields: [
  { name: "lumbar_supine_pelvic_lift_sets", label: "Supine Pelvic Lift - Sets", type: "input", placeholder: "Enter sets" },
  { name: "lumbar_supine_pelvic_lift_pain_level", label: "Supine Pelvic Lift - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// ----- Supine Bridging Parameters -----
{ type: "row", showIf: { field: "lumbar_mysofascial_chain_exercise", includes: "supine_bridging" }, fields: [
  { name: "lumbar_supine_bridging_setup", label: "Supine Bridging - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "lumbar_supine_bridging_repetitions", label: "Supine Bridging - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "lumbar_mysofascial_chain_exercise", includes: "supine_bridging" }, fields: [
  { name: "lumbar_supine_bridging_sets", label: "Supine Bridging - Sets", type: "input", placeholder: "Enter sets" },
  { name: "lumbar_supine_bridging_pain_level", label: "Supine Bridging - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// ----- Prone Bridging Parameters -----
{ type: "row", showIf: { field: "lumbar_mysofascial_chain_exercise", includes: "prone_bridging" }, fields: [
  { name: "lumbar_prone_bridging_setup", label: "Prone Bridging - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "lumbar_prone_bridging_repetitions", label: "Prone Bridging - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "lumbar_mysofascial_chain_exercise", includes: "prone_bridging" }, fields: [
  { name: "lumbar_prone_bridging_sets", label: "Prone Bridging - Sets", type: "input", placeholder: "Enter sets" },
  { name: "lumbar_prone_bridging_pain_level", label: "Prone Bridging - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// ----- Side-Lying Hip Abduction Parameters -----
{ type: "row", showIf: { field: "lumbar_mysofascial_chain_exercise", includes: "side_lying_hip_abduction" }, fields: [
  { name: "lumbar_side_lying_hip_abduction_setup", label: "Side-Lying Hip Abduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "lumbar_side_lying_hip_abduction_repetitions", label: "Side-Lying Hip Abduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "lumbar_mysofascial_chain_exercise", includes: "side_lying_hip_abduction" }, fields: [
  { name: "lumbar_side_lying_hip_abduction_sets", label: "Side-Lying Hip Abduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "lumbar_side_lying_hip_abduction_pain_level", label: "Side-Lying Hip Abduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// ----- Side-Lying Hip Adduction Parameters -----
{ type: "row", showIf: { field: "lumbar_mysofascial_chain_exercise", includes: "side_lying_hip_adduction" }, fields: [
  { name: "lumbar_side_lying_hip_adduction_setup", label: "Side-Lying Hip Adduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "lumbar_side_lying_hip_adduction_repetitions", label: "Side-Lying Hip Adduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "lumbar_mysofascial_chain_exercise", includes: "side_lying_hip_adduction" }, fields: [
  { name: "lumbar_side_lying_hip_adduction_sets", label: "Side-Lying Hip Adduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "lumbar_side_lying_hip_adduction_pain_level", label: "Side-Lying Hip Adduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// ----- Others -----
{
  type: "input",
  name: "lumbar_mysofascial_chain_exercise_others",
  label: "Others",
  placeholder: "Enter other exercises",
  showIf: {
    field: "lumbar_mysofascial_chain_exercise",
    includes: "others"
  }
},

// =====================================================
// B) LUMBAR SETTINGS
// =====================================================

{
  name: "lumbar_settings_exercises",
  label: "Lumbar Settings",
  type: "checkbox-group",
  options: [
    { label: "Supine", value: "supine" },
    { label: "Prone", value: "prone" },
    { label: "Left Side Lying", value: "left_side_lying" },
    { label: "Right Side Lying", value: "right_side_lying" },
    { label: "Others", value: "others" }
  ],
  showIf: {
    field: "lumbar_neurac_sections",
    includes: "lumbar_settings"
  }
},

// ==================== SUPINE ====================
{ type: "row", showIf: { field: "lumbar_settings_exercises", includes: "supine" }, fields: [
  { name: "lumbar_settings_supine_setup", label: "Supine - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "lumbar_settings_supine_repetitions", label: "Supine - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "lumbar_settings_exercises", includes: "supine" }, fields: [
  { name: "lumbar_settings_supine_sets", label: "Supine - Sets", type: "input", placeholder: "Enter sets" },
  { name: "lumbar_settings_supine_pain_level", label: "Supine - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// ==================== PRONE ====================
{ type: "row", showIf: { field: "lumbar_settings_exercises", includes: "prone" }, fields: [
  { name: "lumbar_settings_prone_setup", label: "Prone - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "lumbar_settings_prone_repetitions", label: "Prone - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "lumbar_settings_exercises", includes: "prone" }, fields: [
  { name: "lumbar_settings_prone_sets", label: "Prone - Sets", type: "input", placeholder: "Enter sets" },
  { name: "lumbar_settings_prone_pain_level", label: "Prone - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// ==================== LEFT SIDE LYING ====================
{ type: "row", showIf: { field: "lumbar_settings_exercises", includes: "left_side_lying" }, fields: [
  { name: "lumbar_settings_left_side_lying_setup", label: "Left Side Lying - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "lumbar_settings_left_side_lying_repetitions", label: "Left Side Lying - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "lumbar_settings_exercises", includes: "left_side_lying" }, fields: [
  { name: "lumbar_settings_left_side_lying_sets", label: "Left Side Lying - Sets", type: "input", placeholder: "Enter sets" },
  { name: "lumbar_settings_left_side_lying_pain_level", label: "Left Side Lying - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// ==================== RIGHT SIDE LYING ====================
{ type: "row", showIf: { field: "lumbar_settings_exercises", includes: "right_side_lying" }, fields: [
  { name: "lumbar_settings_right_side_lying_setup", label: "Right Side Lying - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "lumbar_settings_right_side_lying_repetitions", label: "Right Side Lying - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "lumbar_settings_exercises", includes: "right_side_lying" }, fields: [
  { name: "lumbar_settings_right_side_lying_sets", label: "Right Side Lying - Sets", type: "input", placeholder: "Enter sets" },
  { name: "lumbar_settings_right_side_lying_pain_level", label: "Right Side Lying - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// ==================== OTHERS ====================
{
  type: "input",
  name: "lumbar_settings_others",
  label: "Others",
  placeholder: "Enter other lumbar settings",
  showIf: {
    field: "lumbar_settings_exercises",
    includes: "others"
  }
},
        { type: "subheading", label: "Hip Neurac Protocol" },

{
  name: "mysofascial_chain_exercise",
  label: "Mysofascial Chain Exercise",
  type: "checkbox-group",
  options: [
    {
      label: "Supine Pelvic Lift",
      value: "supine_pelvic_lift"
    },
    {
      label: "Supine Bridging",
      value: "supine_bridging"
    },
    {
      label: "Prone Bridging",
      value: "prone_bridging"
    },
    {
      label: "Side-Lying Hip Abduction",
      value: "side_lying_hip_abduction"
    },
    {
      label: "Side-Lying Hip Adduction",
      value: "side_lying_hip_adduction"
    }
  ]
},

// =====================================================
// SUPINE PELVIC LIFT
// =====================================================
{ type: "row", showIf: { field: "mysofascial_chain_exercise", includes: "supine_pelvic_lift" }, fields: [
  { name: "supine_pelvic_lift_setup", label: "Supine Pelvic Lift - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "supine_pelvic_lift_repetitions", label: "Supine Pelvic Lift - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "mysofascial_chain_exercise", includes: "supine_pelvic_lift" }, fields: [
  { name: "supine_pelvic_lift_sets", label: "Supine Pelvic Lift - Sets", type: "input", placeholder: "Enter sets" },
  { name: "supine_pelvic_lift_pain_level", label: "Supine Pelvic Lift - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// SUPINE BRIDGING
// =====================================================
// {
//   type: "input",
//   name: "supine_bridging_setup",
//   label: "Supine Bridging - Set Up",
//   placeholder: "Enter set up",
//   showIf: {
//     field: "lumbar_mysofascial_chain_exercise",
//     includes: "supine_bridging"
//   }
// },
{ type: "row", showIf: { field: "mysofascial_chain_exercise", includes: "supine_bridging" }, fields: [
  { name: "supine_bridging_setup", label: "Supine Bridging - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "supine_bridging_repetitions", label: "Supine Bridging - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "mysofascial_chain_exercise", includes: "supine_bridging" }, fields: [
  { name: "supine_bridging_sets", label: "Supine Bridging - Sets", type: "input", placeholder: "Enter sets" },
  { name: "supine_bridging_pain_level", label: "Supine Bridging - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// PRONE BRIDGING
// =====================================================
{ type: "row", showIf: { field: "mysofascial_chain_exercise", includes: "prone_bridging" }, fields: [
  { name: "prone_bridging_setup", label: "Prone Bridging - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "prone_bridging_repetitions", label: "Prone Bridging - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "mysofascial_chain_exercise", includes: "prone_bridging" }, fields: [
  { name: "prone_bridging_sets", label: "Prone Bridging - Sets", type: "input", placeholder: "Enter sets" },
  { name: "prone_bridging_pain_level", label: "Prone Bridging - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// SIDE-LYING HIP ABDUCTION
// =====================================================
{ type: "row", showIf: { field: "mysofascial_chain_exercise", includes: "side_lying_hip_abduction" }, fields: [
  { name: "side_lying_hip_abduction_setup", label: "Side-Lying Hip Abduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "side_lying_hip_abduction_repetitions", label: "Side-Lying Hip Abduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "mysofascial_chain_exercise", includes: "side_lying_hip_abduction" }, fields: [
  { name: "side_lying_hip_abduction_sets", label: "Side-Lying Hip Abduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "side_lying_hip_abduction_pain_level", label: "Side-Lying Hip Abduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// SIDE-LYING HIP ADDUCTION
// =====================================================
{ type: "row", showIf: { field: "mysofascial_chain_exercise", includes: "side_lying_hip_adduction" }, fields: [
  { name: "side_lying_hip_adduction_setup", label: "Side-Lying Hip Adduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "side_lying_hip_adduction_repetitions", label: "Side-Lying Hip Adduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "mysofascial_chain_exercise", includes: "side_lying_hip_adduction" }, fields: [
  { name: "side_lying_hip_adduction_sets", label: "Side-Lying Hip Adduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "side_lying_hip_adduction_pain_level", label: "Side-Lying Hip Adduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},


// =====================================================
// KNEE NEURAC PROTOCOL
// =====================================================
{ type: "subheading", label: "Knee Neurac Protocol" },
{
  name: "knee_neurac_protocol",
  label: "Mysofascial Chain Exercise",
  type: "checkbox-group",
  options: [
    { label: "Supine Pelvic Lift", value: "supine_pelvic_lift" },
    { label: "Side-Lying Hip Abduction", value: "side_lying_hip_abduction" },
    { label: "Side-Lying Hip Adduction", value: "side_lying_hip_adduction" },
    { label: "Supine Knee Flexion", value: "supine_knee_flexion" },
    { label: "Prone Knee Flexion", value: "prone_knee_flexion" },
    { label: "Others", value: "others" }
  ]
},

// =====================================================
// SUPINE PELVIC LIFT
// =====================================================
{ type: "row", showIf: { field: "knee_neurac_protocol", includes: "supine_pelvic_lift" }, fields: [
  { name: "knee_supine_pelvic_lift_setup", label: "Supine Pelvic Lift - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "knee_supine_pelvic_lift_repetitions", label: "Supine Pelvic Lift - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "knee_neurac_protocol", includes: "supine_pelvic_lift" }, fields: [
  { name: "knee_supine_pelvic_lift_sets", label: "Supine Pelvic Lift - Sets", type: "input", placeholder: "Enter sets" },
  { name: "knee_supine_pelvic_lift_pain_level", label: "Supine Pelvic Lift - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// SIDE-LYING HIP ABDUCTION
// =====================================================
{ type: "row", showIf: { field: "knee_neurac_protocol", includes: "side_lying_hip_abduction" }, fields: [
  { name: "knee_side_lying_hip_abduction_setup", label: "Side-Lying Hip Abduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "knee_side_lying_hip_abduction_repetitions", label: "Side-Lying Hip Abduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "knee_neurac_protocol", includes: "side_lying_hip_abduction" }, fields: [
  { name: "knee_side_lying_hip_abduction_sets", label: "Side-Lying Hip Abduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "knee_side_lying_hip_abduction_pain_level", label: "Side-Lying Hip Abduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// SIDE-LYING HIP ADDUCTION
// =====================================================
{ type: "row", showIf: { field: "knee_neurac_protocol", includes: "side_lying_hip_adduction" }, fields: [
  { name: "knee_side_lying_hip_adduction_setup", label: "Side-Lying Hip Adduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "knee_side_lying_hip_adduction_repetitions", label: "Side-Lying Hip Adduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "knee_neurac_protocol", includes: "side_lying_hip_adduction" }, fields: [
  { name: "knee_side_lying_hip_adduction_sets", label: "Side-Lying Hip Adduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "knee_side_lying_hip_adduction_pain_level", label: "Side-Lying Hip Adduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// SUPINE KNEE FLEXION
// =====================================================
{ type: "row", showIf: { field: "knee_neurac_protocol", includes: "supine_knee_flexion" }, fields: [
  { name: "knee_supine_knee_flexion_setup", label: "Supine Knee Flexion - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "knee_supine_knee_flexion_repetitions", label: "Supine Knee Flexion - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "knee_neurac_protocol", includes: "supine_knee_flexion" }, fields: [
  { name: "knee_supine_knee_flexion_sets", label: "Supine Knee Flexion - Sets", type: "input", placeholder: "Enter sets" },
  { name: "knee_supine_knee_flexion_pain_level", label: "Supine Knee Flexion - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// PRONE KNEE FLEXION
// =====================================================
{ type: "row", showIf: { field: "knee_neurac_protocol", includes: "prone_knee_flexion" }, fields: [
  { name: "knee_prone_knee_flexion_setup", label: "Prone Knee Flexion - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "knee_prone_knee_flexion_repetitions", label: "Prone Knee Flexion - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "knee_neurac_protocol", includes: "prone_knee_flexion" }, fields: [
  { name: "knee_prone_knee_flexion_sets", label: "Prone Knee Flexion - Sets", type: "input", placeholder: "Enter sets" },
  { name: "knee_prone_knee_flexion_pain_level", label: "Prone Knee Flexion - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// OTHERS
// =====================================================
{
  type: "input",
  name: "knee_neurac_protocol_others",
  label: "Others",
  placeholder: "Enter other exercises",
  showIf: {
    field: "knee_neurac_protocol",
    includes: "others"
  }
},
{ type: "subheading", label: "Shoulder Neurac Protocol" },
// =====================================================
// SHOULDER NEURAC PROTOCOL
// =====================================================

{
  name: "shoulder_neurac_protocol",
  label: "Mysofascial Chain Exercise",
  type: "checkbox-group",
  options: [
    { label: "Supine Pelvic Lift", value: "supine_pelvic_lift" },
    { label: "Scapular Protraction", value: "scapular_protraction" },
    { label: "Scapular Retraction", value: "scapular_retraction" },
    { label: "Shoulder Abd/ER", value: "shoulder_abd_er" },
    { label: "Shoulder Abd/IR", value: "shoulder_abd_ir" },
    { label: "Side-Lying Hip Abduction", value: "side_lying_hip_abduction" },
    { label: "Side-Lying Hip Adduction", value: "side_lying_hip_adduction" },
    { label: "Others", value: "others" }
  ]
},

// =====================================================
// SUPINE PELVIC LIFT
// =====================================================
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "supine_pelvic_lift" }, fields: [
  { name: "shoulder_supine_pelvic_lift_setup", label: "Supine Pelvic Lift - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "shoulder_supine_pelvic_lift_repetitions", label: "Supine Pelvic Lift - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "supine_pelvic_lift" }, fields: [
  { name: "shoulder_supine_pelvic_lift_sets", label: "Supine Pelvic Lift - Sets", type: "input", placeholder: "Enter sets" },
  { name: "shoulder_supine_pelvic_lift_pain_level", label: "Supine Pelvic Lift - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// SCAPULAR PROTRACTION
// =====================================================
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "scapular_protraction" }, fields: [
  { name: "shoulder_scapular_protraction_setup", label: "Scapular Protraction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "shoulder_scapular_protraction_repetitions", label: "Scapular Protraction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "scapular_protraction" }, fields: [
  { name: "shoulder_scapular_protraction_sets", label: "Scapular Protraction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "shoulder_scapular_protraction_pain_level", label: "Scapular Protraction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// SCAPULAR RETRACTION
// =====================================================
// =====================================================
// SCAPULAR RETRACTION
// =====================================================
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "scapular_retraction" }, fields: [
  { name: "shoulder_scapular_retraction_setup", label: "Scapular Retraction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "shoulder_scapular_retraction_repetitions", label: "Scapular Retraction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "scapular_retraction" }, fields: [
  { name: "shoulder_scapular_retraction_sets", label: "Scapular Retraction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "shoulder_scapular_retraction_pain_level", label: "Scapular Retraction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// SHOULDER ABD/ER
// =====================================================
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "shoulder_abd_er" }, fields: [
  { name: "shoulder_abd_er_setup", label: "Shoulder Abd/ER - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "shoulder_abd_er_repetitions", label: "Shoulder Abd/ER - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "shoulder_abd_er" }, fields: [
  { name: "shoulder_abd_er_sets", label: "Shoulder Abd/ER - Sets", type: "input", placeholder: "Enter sets" },
  { name: "shoulder_abd_er_pain_level", label: "Shoulder Abd/ER - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// SHOULDER ABD/IR
// =====================================================
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "shoulder_abd_ir" }, fields: [
  { name: "shoulder_abd_ir_setup", label: "Shoulder Abd/IR - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "shoulder_abd_ir_repetitions", label: "Shoulder Abd/IR - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "shoulder_abd_ir" }, fields: [
  { name: "shoulder_abd_ir_sets", label: "Shoulder Abd/IR - Sets", type: "input", placeholder: "Enter sets" },
  { name: "shoulder_abd_ir_pain_level", label: "Shoulder Abd/IR - Pain Level", type: "input", placeholder: "Enter pain level" },
]},
 
// =====================================================
// SIDE-LYING HIP ABDUCTION
// =====================================================
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "side_lying_hip_abduction" }, fields: [
  { name: "shoulder_side_lying_hip_abduction_setup", label: "Side-Lying Hip Abduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "shoulder_side_lying_hip_abduction_repetitions", label: "Side-Lying Hip Abduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "side_lying_hip_abduction" }, fields: [
  { name: "shoulder_side_lying_hip_abduction_sets", label: "Side-Lying Hip Abduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "shoulder_side_lying_hip_abduction_pain_level", label: "Side-Lying Hip Abduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// SIDE-LYING HIP ADDUCTION
// =====================================================
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "side_lying_hip_adduction" }, fields: [
  { name: "shoulder_side_lying_hip_adduction_setup", label: "Side-Lying Hip Adduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "shoulder_side_lying_hip_adduction_repetitions", label: "Side-Lying Hip Adduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "shoulder_neurac_protocol", includes: "side_lying_hip_adduction" }, fields: [
  { name: "shoulder_side_lying_hip_adduction_sets", label: "Side-Lying Hip Adduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "shoulder_side_lying_hip_adduction_pain_level", label: "Side-Lying Hip Adduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// =====================================================
// OTHERS
// =====================================================
{
  type: "input",
  name: "shoulder_neurac_protocol_others",
  label: "Others",
  placeholder: "Enter other exercises",
  showIf: {
    field: "shoulder_neurac_protocol",
    includes: "others"
  }
},

// =====================================================
// 5. ELBOW NEURAC PROTOCOL
// =====================================================
{ type: "subheading", label: "Elbow Neurac Protocol" },
{
  name: "elbow_neurac_protocol",
  label: "Mysofascial Chain Exercise ",
  type: "checkbox-group",
  options: [
    { label: "Supine Pelvic Lift", value: "supine_pelvic_lift" },
    { label: "Shoulder Abd/ER", value: "shoulder_abd_er" },
    { label: "Shoulder Abd/IR", value: "shoulder_abd_ir" },
    { label: "Elbow Flexion", value: "elbow_flexion" },
    { label: "Elbow Extension", value: "elbow_extension" },
    { label: "Side-Lying Hip Abduction", value: "side_lying_hip_abduction" },
    { label: "Side-Lying Hip Adduction", value: "side_lying_hip_adduction" },
    { label: "Scapular Protraction", value: "scapular_protraction" },
    { label: "Scapular Retraction", value: "scapular_retraction" },
    { label: "Others", value: "others" }
  ]
},

// -------------------- SUPINE PELVIC LIFT --------------------
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "supine_pelvic_lift" }, fields: [
  { name: "elbow_supine_pelvic_lift_setup", label: "Supine Pelvic Lift - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "elbow_supine_pelvic_lift_repetitions", label: "Supine Pelvic Lift - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "supine_pelvic_lift" }, fields: [
  { name: "elbow_supine_pelvic_lift_sets", label: "Supine Pelvic Lift - Sets", type: "input", placeholder: "Enter sets" },
  { name: "elbow_supine_pelvic_lift_pain_level", label: "Supine Pelvic Lift - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SHOULDER ABD/ER --------------------
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "shoulder_abd_er" }, fields: [
  { name: "elbow_shoulder_abd_er_setup", label: "Shoulder Abd/ER - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "elbow_shoulder_abd_er_repetitions", label: "Shoulder Abd/ER - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "shoulder_abd_er" }, fields: [
  { name: "elbow_shoulder_abd_er_sets", label: "Shoulder Abd/ER - Sets", type: "input", placeholder: "Enter sets" },
  { name: "elbow_shoulder_abd_er_pain_level", label: "Shoulder Abd/ER - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SHOULDER ABD/IR --------------------
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "shoulder_abd_ir" }, fields: [
  { name: "elbow_shoulder_abd_ir_setup", label: "Shoulder Abd/IR - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "elbow_shoulder_abd_ir_repetitions", label: "Shoulder Abd/IR - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "shoulder_abd_ir" }, fields: [
  { name: "elbow_shoulder_abd_ir_sets", label: "Shoulder Abd/IR - Sets", type: "input", placeholder: "Enter sets" },
  { name: "elbow_shoulder_abd_ir_pain_level", label: "Shoulder Abd/IR - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- ELBOW FLEXION --------------------
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "elbow_flexion" }, fields: [
  { name: "elbow_flexion_setup", label: "Elbow Flexion - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "elbow_flexion_repetitions", label: "Elbow Flexion - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "elbow_flexion" }, fields: [
  { name: "elbow_flexion_sets", label: "Elbow Flexion - Sets", type: "input", placeholder: "Enter sets" },
  { name: "elbow_flexion_pain_level", label: "Elbow Flexion - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- ELBOW EXTENSION --------------------
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "elbow_extension" }, fields: [
  { name: "elbow_extension_setup", label: "Elbow Extension - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "elbow_extension_repetitions", label: "Elbow Extension - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "elbow_extension" }, fields: [
  { name: "elbow_extension_sets", label: "Elbow Extension - Sets", type: "input", placeholder: "Enter sets" },
  { name: "elbow_extension_pain_level", label: "Elbow Extension - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SIDE-LYING HIP ABDUCTION --------------------
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "side_lying_hip_abduction" }, fields: [
  { name: "elbow_side_lying_hip_abduction_setup", label: "Side-Lying Hip Abduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "elbow_side_lying_hip_abduction_repetitions", label: "Side-Lying Hip Abduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "side_lying_hip_abduction" }, fields: [
  { name: "elbow_side_lying_hip_abduction_sets", label: "Side-Lying Hip Abduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "elbow_side_lying_hip_abduction_pain_level", label: "Side-Lying Hip Abduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SIDE-LYING HIP ADDUCTION --------------------
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "side_lying_hip_adduction" }, fields: [
  { name: "elbow_side_lying_hip_adduction_setup", label: "Side-Lying Hip Adduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "elbow_side_lying_hip_adduction_repetitions", label: "Side-Lying Hip Adduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "side_lying_hip_adduction" }, fields: [
  { name: "elbow_side_lying_hip_adduction_sets", label: "Side-Lying Hip Adduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "elbow_side_lying_hip_adduction_pain_level", label: "Side-Lying Hip Adduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SCAPULAR PROTRACTION --------------------
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "scapular_protraction" }, fields: [
  { name: "elbow_scapular_protraction_setup", label: "Scapular Protraction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "elbow_scapular_protraction_repetitions", label: "Scapular Protraction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "scapular_protraction" }, fields: [
  { name: "elbow_scapular_protraction_sets", label: "Scapular Protraction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "elbow_scapular_protraction_pain_level", label: "Scapular Protraction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SCAPULAR RETRACTION --------------------
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "scapular_retraction" }, fields: [
  { name: "elbow_scapular_retraction_setup", label: "Scapular Retraction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "elbow_scapular_retraction_repetitions", label: "Scapular Retraction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "elbow_neurac_protocol", includes: "scapular_retraction" }, fields: [
  { name: "elbow_scapular_retraction_sets", label: "Scapular Retraction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "elbow_scapular_retraction_pain_level", label: "Scapular Retraction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- OTHERS --------------------
{
  type: "input",
  name: "elbow_neurac_protocol_others",
  label: "Others",
  placeholder: "Enter other exercises",
  showIf: {
    field: "elbow_neurac_protocol",
    includes: "others"
  }
},
   
{ type: "subheading", label: "Cervical Neurac Protocol" },
// =====================================================
// 6. CERVICAL NEURAC PROTOCOL
// =====================================================

{
  name: "cervical_neurac_sections",
  // label: "Cervical Neurac Protocol",
  type: "checkbox-group",
  options: [
    {
      label: "Mysofascial Chain Exercise",
      value: "mysofascial_chain_exercise"
    },
    {
      label: "Cervical Movements",
      value: "cervical_movements"
    },
    {
      label: "Cervical Settings",
      value: "cervical_settings"
    },
    {
      label: "Others",
      value: "others"
    }
   
  ]
},

// =====================================================
// A) MYSOFASCIAL CHAIN EXERCISE
// =====================================================

// =====================================================
// CERVICAL - MYSOFASCIAL CHAIN EXERCISE
// =====================================================

{
  name: "cervical_mysofascial_chain_exercise",
  label: "Mysofascial Chain Exercise",
  type: "checkbox-group",
  showIf: {
    field: "cervical_neurac_sections",
    includes: "mysofascial_chain_exercise"
  },
  options: [
    { label: "Supine Pelvic Lift", value: "supine_pelvic_lift" },
    { label: "Supine Bridging", value: "supine_bridging" },
    { label: "Side-Lying Hip Abduction", value: "side_lying_hip_abduction" },
    { label: "Side-Lying Hip Adduction", value: "side_lying_hip_adduction" },
    { label: "Scapular Protraction", value: "scapular_protraction" },
    { label: "Scapular Retraction", value: "scapular_retraction" },
    { label: "Shoulder Abd/ER", value: "shoulder_abd_er" },
    { label: "Shoulder Abd/IR", value: "shoulder_abd_ir" },
    { label: "Others", value: "others" }
  ]
},

// -------------------- SUPINE PELVIC LIFT --------------------
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "supine_pelvic_lift" }, fields: [
  { name: "cervical_supine_pelvic_lift_setup", label: "Supine Pelvic Lift - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_supine_pelvic_lift_repetitions", label: "Supine Pelvic Lift - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "supine_pelvic_lift" }, fields: [
  { name: "cervical_supine_pelvic_lift_sets", label: "Supine Pelvic Lift - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_supine_pelvic_lift_pain_level", label: "Supine Pelvic Lift - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SUPINE BRIDGING --------------------
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "supine_bridging" }, fields: [
  { name: "cervical_supine_bridging_setup", label: "Supine Bridging - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_supine_bridging_repetitions", label: "Supine Bridging - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "supine_bridging" }, fields: [
  { name: "cervical_supine_bridging_sets", label: "Supine Bridging - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_supine_bridging_pain_level", label: "Supine Bridging - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SIDE-LYING HIP ABDUCTION --------------------
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "side_lying_hip_abduction" }, fields: [
  { name: "cervical_side_lying_hip_abduction_setup", label: "Side-Lying Hip Abduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_side_lying_hip_abduction_repetitions", label: "Side-Lying Hip Abduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "side_lying_hip_abduction" }, fields: [
  { name: "cervical_side_lying_hip_abduction_sets", label: "Side-Lying Hip Abduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_side_lying_hip_abduction_pain_level", label: "Side-Lying Hip Abduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SIDE-LYING HIP ADDUCTION --------------------
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "side_lying_hip_adduction" }, fields: [
  { name: "cervical_side_lying_hip_adduction_setup", label: "Side-Lying Hip Adduction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_side_lying_hip_adduction_repetitions", label: "Side-Lying Hip Adduction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "side_lying_hip_adduction" }, fields: [
  { name: "cervical_side_lying_hip_adduction_sets", label: "Side-Lying Hip Adduction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_side_lying_hip_adduction_pain_level", label: "Side-Lying Hip Adduction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SCAPULAR PROTRACTION --------------------
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "scapular_protraction" }, fields: [
  { name: "cervical_scapular_protraction_setup", label: "Scapular Protraction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_scapular_protraction_repetitions", label: "Scapular Protraction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "scapular_protraction" }, fields: [
  { name: "cervical_scapular_protraction_sets", label: "Scapular Protraction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_scapular_protraction_pain_level", label: "Scapular Protraction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SCAPULAR RETRACTION --------------------
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "scapular_retraction" }, fields: [
  { name: "cervical_scapular_retraction_setup", label: "Scapular Retraction - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_scapular_retraction_repetitions", label: "Scapular Retraction - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "scapular_retraction" }, fields: [
  { name: "cervical_scapular_retraction_sets", label: "Scapular Retraction - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_scapular_retraction_pain_level", label: "Scapular Retraction - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SHOULDER ABD/ER --------------------
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "shoulder_abd_er" }, fields: [
  { name: "cervical_shoulder_abd_er_setup", label: "Shoulder Abd/ER - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_shoulder_abd_er_repetitions", label: "Shoulder Abd/ER - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "shoulder_abd_er" }, fields: [
  { name: "cervical_shoulder_abd_er_sets", label: "Shoulder Abd/ER - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_shoulder_abd_er_pain_level", label: "Shoulder Abd/ER - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- SHOULDER ABD/IR --------------------
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "shoulder_abd_ir" }, fields: [
  { name: "cervical_shoulder_abd_ir_setup", label: "Shoulder Abd/IR - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_shoulder_abd_ir_repetitions", label: "Shoulder Abd/IR - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_mysofascial_chain_exercise", includes: "shoulder_abd_ir" }, fields: [
  { name: "cervical_shoulder_abd_ir_sets", label: "Shoulder Abd/IR - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_shoulder_abd_ir_pain_level", label: "Shoulder Abd/IR - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- OTHERS --------------------
{
  type: "input",
  name: "cervical_mysofascial_chain_exercise_others",
  label: "Others",
  placeholder: "Enter other exercises",
  showIf: {
    field: "cervical_mysofascial_chain_exercise",
    includes: "others"
  }
},
// =====================================================
// B) CERVICAL MOVEMENTS
// =====================================================

// =====================================================
// CERVICAL MOVEMENTS
// =====================================================

{
  name: "cervical_movements",
  label: "Cervical Movements",
  type: "checkbox-group",
  showIf: {
    field: "cervical_neurac_sections",
    includes: "cervical_movements"
  },
  options: [
    { label: "Rotation", value: "rotation" },
    { label: "Rotation Right", value: "rotation_right" },
    { label: "Rotation Left", value: "rotation_left" },
    { label: "Lateral Flexion Right", value: "lateral_flexion_right" },
    { label: "Lateral Flexion Left", value: "lateral_flexion_left" },
    { label: "Extension", value: "extension" },
    { label: "Others", value: "others" }
  ]
},

// -------------------- ROTATION --------------------
{ type: "row", showIf: { field: "cervical_movements", includes: "rotation" }, fields: [
  { name: "cervical_rotation_setup", label: "Rotation - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_rotation_repetitions", label: "Rotation - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_movements", includes: "rotation" }, fields: [
  { name: "cervical_rotation_sets", label: "Rotation - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_rotation_pain_level", label: "Rotation - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- ROTATION RIGHT --------------------
{ type: "row", showIf: { field: "cervical_movements", includes: "rotation_right" }, fields: [
  { name: "cervical_rotation_right_setup", label: "Rotation Right - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_rotation_right_repetitions", label: "Rotation Right - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_movements", includes: "rotation_right" }, fields: [
  { name: "cervical_rotation_right_sets", label: "Rotation Right - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_rotation_right_pain_level", label: "Rotation Right - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- ROTATION LEFT --------------------
{ type: "row", showIf: { field: "cervical_movements", includes: "rotation_left" }, fields: [
  { name: "cervical_rotation_left_setup", label: "Rotation Left - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_rotation_left_repetitions", label: "Rotation Left - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_movements", includes: "rotation_left" }, fields: [
  { name: "cervical_rotation_left_sets", label: "Rotation Left - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_rotation_left_pain_level", label: "Rotation Left - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- LATERAL FLEXION RIGHT --------------------
{ type: "row", showIf: { field: "cervical_movements", includes: "lateral_flexion_right" }, fields: [
  { name: "cervical_lateral_flexion_right_setup", label: "Lateral Flexion Right - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_lateral_flexion_right_repetitions", label: "Lateral Flexion Right - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_movements", includes: "lateral_flexion_right" }, fields: [
  { name: "cervical_lateral_flexion_right_sets", label: "Lateral Flexion Right - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_lateral_flexion_right_pain_level", label: "Lateral Flexion Right - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- LATERAL FLEXION LEFT --------------------
{ type: "row", showIf: { field: "cervical_movements", includes: "lateral_flexion_left" }, fields: [
  { name: "cervical_lateral_flexion_left_setup", label: "Lateral Flexion Left - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_lateral_flexion_left_repetitions", label: "Lateral Flexion Left - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_movements", includes: "lateral_flexion_left" }, fields: [
  { name: "cervical_lateral_flexion_left_sets", label: "Lateral Flexion Left - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_lateral_flexion_left_pain_level", label: "Lateral Flexion Left - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- EXTENSION --------------------
{ type: "row", showIf: { field: "cervical_movements", includes: "extension" }, fields: [
  { name: "cervical_extension_setup", label: "Extension - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_extension_repetitions", label: "Extension - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_movements", includes: "extension" }, fields: [
  { name: "cervical_extension_sets", label: "Extension - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_extension_pain_level", label: "Extension - Pain Level", type: "input", placeholder: "Enter pain level" },
]},

// -------------------- OTHERS --------------------
{
  type: "input",
  name: "cervical_movements_others",
  label: "Others",
  placeholder: "Enter other cervical movements",
  showIf: {
    field: "cervical_movements",
    includes: "others"
  }
},

// =====================================================
// C) CERVICAL SETTINGS
// =====================================================

// =====================================================
// C) CERVICAL SETTINGS
// =====================================================

{
  name: "cervical_settings",
  label: "Cervical Settings",
  type: "checkbox-group",
  options: [
    { label: "Supine", value: "supine" },
    { label: "Prone", value: "prone" },
    { label: "Left Side Lying", value: "left_side_lying" },
    { label: "Right Side Lying", value: "right_side_lying" },
    { label: "Others", value: "others" }
  ],
  showIf: {
    field: "cervical_neurac_sections",
    includes: "cervical_settings"
  }
},

// ==================== SUPINE ====================
{ type: "row", showIf: { field: "cervical_settings", includes: "supine" }, fields: [
  { name: "cervical_settings_supine_setup", label: "Supine - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_settings_supine_repetitions", label: "Supine - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_settings", includes: "supine" }, fields: [
  { name: "cervical_settings_supine_sets", label: "Supine - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_settings_supine_pain_level", label: "Supine - Pain Level", type: "input", placeholder: "Enter pain level (0-10)" },
]},

// ==================== PRONE ====================
{ type: "row", showIf: { field: "cervical_settings", includes: "prone" }, fields: [
  { name: "cervical_settings_prone_setup", label: "Prone - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_settings_prone_repetitions", label: "Prone - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_settings", includes: "prone" }, fields: [
  { name: "cervical_settings_prone_sets", label: "Prone - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_settings_prone_pain_level", label: "Prone - Pain Level", type: "input", placeholder: "Enter pain level (0-10)" },
]},

// ==================== LEFT SIDE LYING ====================
{ type: "row", showIf: { field: "cervical_settings", includes: "left_side_lying" }, fields: [
  { name: "cervical_settings_left_side_lying_setup", label: "Left Side Lying - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_settings_left_side_lying_repetitions", label: "Left Side Lying - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_settings", includes: "left_side_lying" }, fields: [
  { name: "cervical_settings_left_side_lying_sets", label: "Left Side Lying - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_settings_left_side_lying_pain_level", label: "Left Side Lying - Pain Level", type: "input", placeholder: "Enter pain level (0-10)" },
]},

// ==================== RIGHT SIDE LYING ====================
{ type: "row", showIf: { field: "cervical_settings", includes: "right_side_lying" }, fields: [
  { name: "cervical_settings_right_side_lying_setup", label: "Right Side Lying - Set Up", type: "input", placeholder: "Enter set up" },
  { name: "cervical_settings_right_side_lying_repetitions", label: "Right Side Lying - Repetitions", type: "input", placeholder: "Enter repetitions" },
]},
{ type: "row", showIf: { field: "cervical_settings", includes: "right_side_lying" }, fields: [
  { name: "cervical_settings_right_side_lying_sets", label: "Right Side Lying - Sets", type: "input", placeholder: "Enter sets" },
  { name: "cervical_settings_right_side_lying_pain_level", label: "Right Side Lying - Pain Level", type: "input", placeholder: "Enter pain level (0-10)" },
]},

// ==================== OTHERS ====================
{
  type: "input",
  name: "cervical_settings_others",
  label: "Others",
  placeholder: "Enter other cervical settings",
  showIf: {
    field: "cervical_settings",
    includes: "others"
  }
},

// =====================================================
// GENERIC PARAMETER FIELDS FOR ALL SELECTED ITEMS
// =====================================================
// Use the same 4 parameter fields for each selected option:
// - Set Up (input)
// - Repetitions (input)
// - Sets (input)
// - Pain Level (input)
//
// Example pattern:
// {
//   type: "input",
//   name: "cervical_supine_pelvic_lift_setup",
//   label: "Supine Pelvic Lift - Set Up",
//   showIf: {
//     field: "cervical_mysofascial_chain_exercise",
//     includes: "supine_pelvic_lift"
//   }
// },
// {
//   type: "input",
//   name: "cervical_supine_pelvic_lift_repetitions",
//   label: "Supine Pelvic Lift - Repetitions",
//   showIf: {
//     field: "cervical_mysofascial_chain_exercise",
//     includes: "supine_pelvic_lift"
//   }
// },
// {
//   type: "input",
//   name: "cervical_supine_pelvic_lift_sets",
//   label: "Supine Pelvic Lift - Sets",
//   showIf: {
//     field: "cervical_mysofascial_chain_exercise",
//     includes: "supine_pelvic_lift"
//   }
// },
// {
//   type: "input",
//   name: "cervical_supine_pelvic_lift_pain_level",
//   label: "Supine Pelvic Lift - Pain Level",
//   showIf: {
//     field: "cervical_mysofascial_chain_exercise",
//     includes: "supine_pelvic_lift"
//   }
// },

// =====================================================
// OTHERS TEXT FIELDS
// =====================================================

{
  type: "input",
  name: "cervical_mysofascial_chain_exercise_others",
  label: "Mysofascial Chain Exercise - Others",
  placeholder: "Enter other exercises",
  showIf: {
    field: "cervical_mysofascial_chain_exercise",
    includes: "others"
  }
},
{
  type: "input",
  name: "cervical_movements_others",
  label: "Cervical Movements - Others",
  placeholder: "Enter other movements",
  showIf: {
    field: "cervical_movements",
    includes: "others"
  }
},
{
  type: "input",
  name: "cervical_neurac_sections_others",
  label: "Others",
  placeholder: "Enter other cervical neurac protocol details",
  showIf: {
    field: "cervical_neurac_sections",
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
  name: "therapist_notes",
  // label: "Therapist Notes",
  type: "checkbox-group",
  options: [
    {
      label: "Continue Current Therapy Program",
      value: "continue_current_therapy_program"
    },
    {
      label: "Therapy Progression Based on Functional Level",
      value: "therapy_progression_based_on_functional_level"
    },
    {
      label: "Review and Revisit of Therapy Plan",
      value: "review_and_revisit_of_therapy_plan"
    },
    {
      label: "Others",
      value: "others"
    }
  ]
},
{
  type: "input",
  name: "continue_current_therapy_program_comment",
  label: "Comment",
  placeholder: "Enter comments",
  showIf: {
    field: "therapist_notes",
    includes: "continue_current_therapy_program"
  }
},
{
  type: "input",
  name: "therapy_progression_based_on_functional_level_comment",
  label: "Comment",
  placeholder: "Enter comments",
  showIf: {
    field: "therapist_notes",
    includes: "therapy_progression_based_on_functional_level"
  }
},
{
  type: "input",
  name: "review_and_revisit_of_therapy_plan_comment",
  label: "Comment",
  placeholder: "Enter comments",
  showIf: {
    field: "therapist_notes",
    includes: "review_and_revisit_of_therapy_plan"
  }
},
{
  type: "input",
  name: "others_comment",
  label: "Comment",
  placeholder: "Enter other notes",
  showIf: {
    field: "therapist_notes",
    includes: "others"
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