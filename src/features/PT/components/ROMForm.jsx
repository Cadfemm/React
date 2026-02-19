import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const ROM_CERVICAL_SCHEMA = {
  title: "RANGE OF MOTION MEASUREMENTS (Degrees)",
  sections: [
    {
      fields: [
        { type: "subheading", label: "Cervical Spine" },
        {
          type: "grid-header",
          label: "Movement",
          cols: ["Right", "Left", "Normal"]
        },
        {
          type: "grid-row",
          name: "rom_cervical_flexion",
          label: "Flexion",
          cols: ["input", "input", { type: "static", value: "45°" }]
        },
        {
          type: "grid-row",
          name: "rom_cervical_extension",
          label: "Extension",
          cols: ["input", "input", { type: "static", value: "45°" }]
        },
        {
          type: "grid-row",
          name: "rom_cervical_rotation",
          label: "Rotation",
          cols: ["input", "input", { type: "static", value: "60°" }]
        },
        {
          type: "grid-row",
          name: "rom_cervical_lateral_flexion",
          label: "Lateral Flexion",
          cols: ["input", "input", { type: "static", value: "45°" }]
        },
        { type: "subheading", label: "Shoulder" },
        {
          type: "grid-header",
          label: "Movement",
          cols: ["Right", "Left", "Normal"]
        },
        {
          type: "grid-row",
          name: "rom_shoulder_flexion",
          label: "Flexion",
          cols: ["input", "input", { type: "static", value: "180°" }]
        },
        {
          type: "grid-row",
          name: "rom_shoulder_extension",
          label: "Extension",
          cols: ["input", "input", { type: "static", value: "60°" }]
        },
        {
          type: "grid-row",
          name: "rom_shoulder_abduction",
          label: "Abduction",
          cols: ["input", "input", { type: "static", value: "180°" }]
        },
        {
          type: "grid-row",
          name: "rom_shoulder_adduction",
          label: "Adduction",
          cols: ["input", "input", { type: "static", value: "30°" }]
        },
        {
          type: "grid-row",
          name: "rom_shoulder_internal_rotation",
          label: "Internal Rotation",
          cols: ["input", "input", { type: "static", value: "70°" }]
        },
        {
          type: "grid-row",
          name: "rom_shoulder_external_rotation",
          label: "External Rotation",
          cols: ["input", "input", { type: "static", value: "90°" }]
        },
        { type: "subheading", label: "Elbow / Forearm" },
        {
          type: "grid-header",
          label: "Movement",
          cols: ["Right", "Left", "Normal"]
        },
        {
          type: "grid-row",
          name: "rom_elbow_flexion",
          label: "Flexion",
          cols: ["input", "input", { type: "static", value: "150°" }]
        },
        {
          type: "grid-row",
          name: "rom_elbow_extension",
          label: "Extension",
          cols: ["input", "input", { type: "static", value: "0°" }]
        },
        {
          type: "grid-row",
          name: "rom_elbow_pronation",
          label: "Pronation",
          cols: ["input", "input", { type: "static", value: "80°" }]
        },
        {
          type: "grid-row",
          name: "rom_elbow_supination",
          label: "Supination",
          cols: ["input", "input", { type: "static", value: "80°" }]
        },
        { type: "subheading", label: "Wrist / Hand" },
        {
          type: "grid-header",
          label: "Movement",
          cols: ["Right", "Left", "Normal"]
        },
        {
          type: "grid-row",
          name: "rom_wrist_flexion",
          label: "Flexion",
          cols: ["input", "input", { type: "static", value: "80°" }]
        },
        {
          type: "grid-row",
          name: "rom_wrist_extension",
          label: "Extension",
          cols: ["input", "input", { type: "static", value: "70°" }]
        },
        {
          type: "grid-row",
          name: "rom_wrist_radial_deviation",
          label: "Radial Deviation",
          cols: ["input", "input", { type: "static", value: "20°" }]
        },
        {
          type: "grid-row",
          name: "rom_wrist_ulnar_deviation",
          label: "Ulnar Deviation",
          cols: ["input", "input", { type: "static", value: "30°" }]
        },
        { type: "subheading", label: "Thoracolumbar Spine" },
        {
          type: "grid-header",
          label: "Movement",
          cols: ["Right", "Left", "Normal"]
        },
        {
          type: "grid-row",
          name: "rom_thoracolumbar_flexion",
          label: "Flexion",
          cols: ["input", "input", { type: "static", value: "60°" }]
        },
        {
          type: "grid-row",
          name: "rom_thoracolumbar_extension",
          label: "Extension",
          cols: ["input", "input", { type: "static", value: "25°" }]
        },
        {
          type: "grid-row",
          name: "rom_thoracolumbar_rotation",
          label: "Rotation (R/L)",
          cols: ["input", "input", { type: "static", value: "30°" }]
        },
        {
          type: "grid-row",
          name: "rom_thoracolumbar_side_bending",
          label: "Side Bending (R/L)",
          cols: ["input", "input", { type: "static", value: "25°" }]
        },
        { type: "subheading", label: "Hip" },
        {
          type: "grid-header",
          label: "Movement",
          cols: ["Right", "Left", "Normal"]
        },
        {
          type: "grid-row",
          name: "rom_hip_flexion",
          label: "Flexion",
          cols: ["input", "input", { type: "static", value: "120°" }]
        },
        {
          type: "grid-row",
          name: "rom_hip_extension",
          label: "Extension",
          cols: ["input", "input", { type: "static", value: "20°" }]
        },
        {
          type: "grid-row",
          name: "rom_hip_abduction",
          label: "Abduction",
          cols: ["input", "input", { type: "static", value: "45°" }]
        },
        {
          type: "grid-row",
          name: "rom_hip_adduction",
          label: "Adduction",
          cols: ["input", "input", { type: "static", value: "30°" }]
        },
        {
          type: "grid-row",
          name: "rom_hip_internal_rotation",
          label: "Internal Rotation",
          cols: ["input", "input", { type: "static", value: "40°" }]
        },
        {
          type: "grid-row",
          name: "rom_hip_external_rotation",
          label: "External Rotation",
          cols: ["input", "input", { type: "static", value: "45°" }]
        },
        { type: "subheading", label: "Knee" },
        {
          type: "grid-header",
          label: "Movement",
          cols: ["Right", "Left", "Normal"]
        },
        {
          type: "grid-row",
          name: "rom_knee_flexion",
          label: "Flexion",
          cols: ["input", "input", { type: "static", value: "135°" }]
        },
        {
          type: "grid-row",
          name: "rom_knee_extension",
          label: "Extension",
          cols: ["input", "input", { type: "static", value: "0°" }]
        },
        { type: "subheading", label: "Ankle / Foot" },
        {
          type: "grid-header",
          label: "Movement",
          cols: ["Right", "Left", "Normal"]
        },
        {
          type: "grid-row",
          name: "rom_ankle_dorsiflexion",
          label: "Dorsiflexion",
          cols: ["input", "input", { type: "static", value: "20°" }]
        },
        {
          type: "grid-row",
          name: "rom_ankle_plantarflexion",
          label: "Plantarflexion",
          cols: ["input", "input", { type: "static", value: "50°" }]
        },
        {
          type: "grid-row",
          name: "rom_ankle_inversion",
          label: "Inversion",
          cols: ["input", "input", { type: "static", value: "35°" }]
        },
        {
          type: "grid-row",
          name: "rom_ankle_eversion",
          label: "Eversion",
          cols: ["input", "input", { type: "static", value: "15°" }]
        },
        { type: "subheading", label: "Clinical Interpretation" },
        {
          type: "radio",
          name: "rom_status",
          label: "ROM Status",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Mild restriction", value: "mild_restriction" },
            { label: "Moderate restriction", value: "moderate_restriction" },
            { label: "Severe restriction", value: "severe_restriction" }
          ]
        },
        {
          type: "radio",
          name: "rom_pattern",
          label: "Pattern",
          options: [
            { label: "Capsular", value: "capsular" },
            { label: "non-capsular", value: "non_capsular" },
            { label: "Pain-limited", value: "pain_limited" },
            { label: "Structural", value: "structural" }
          ]
        },
        {
          type: "textarea",
          name: "rom_contributing_factors",
          label: "Contributing factors"
        },
        { type: "subheading", label: "Pain During Movement" },
        {
          type: "radio",
          name: "rom_pain_at_rest",
          label: "Pain at Rest",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },
        {
          type: "radio",
          name: "rom_pain_with_motion",
          label: "Pain with Motion",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },
        {
          type: "radio",
          name: "rom_end_feel",
          label: "End Feel",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Capsular", value: "capsular" },
            { label: "Spasm", value: "spasm" },
            { label: "Empty", value: "empty" },
            { label: "Hard", value: "hard" },
            { label: "Soft", value: "soft" }
          ]
        }
      ]
    }
  ]
};

export default function ROMForm({ values, onChange }) {
  return (
    <CommonFormBuilder
      schema={ROM_CERVICAL_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}
