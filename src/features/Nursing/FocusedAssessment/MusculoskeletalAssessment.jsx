import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const YES_NO_OPTIONS = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];

export default function MusculoskeletalAssessment({ layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const MSK_SCHEMA = {
    title: "Focussed Musculoskeletal Assessment",
    sections: [
      // ═══════════════════════════════════════════════════════════════
      // SUBJECTIVE (Patient-Reported)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SUBJECTIVE (Patient-Reported)",
        fields: [
          { type: "subheading", label: "1. Pain & Symptoms" },
          {
            name: "msk_pain_present",
            label: "Pain present",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_pain_location",
            label: "Location(s)",
            type: "input",
            placeholder: "e.g. lower back, right knee"
          },
          {
            name: "msk_pain_onset",
            label: "Onset",
            type: "radio",
            options: [
              { label: "Sudden", value: "sudden" },
              { label: "Gradual", value: "gradual" }
            ]
          },
          {
            name: "msk_pain_duration",
            label: "Duration",
            type: "input",
            placeholder: "e.g. 2 days, 1 week"
          },
          {
            name: "msk_pain_character",
            label: "Character",
            type: "radio",
            options: [
              { label: "Sharp", value: "sharp" },
              { label: "Dull", value: "dull" },
              { label: "Aching", value: "aching" },
              { label: "Burning", value: "burning" },
              { label: "Stiffness", value: "stiffness" }
            ]
          },
          {
            name: "msk_pain_severity",
            label: "Severity (0–10)",
            type: "scale-slider",
            min: 0,
            max: 10,
            step: 1,
            showValue: true
          },
          {
            name: "msk_pain_radiation",
            label: "Radiation",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_radiation_where",
            label: "Where",
            type: "input",
            showIf: { field: "msk_pain_radiation", equals: "yes" }
          },
          {
            name: "msk_aggravating_factors",
            label: "Aggravating factors",
            type: "checkbox-group",
            options: [
              { label: "Movement", value: "movement" },
              { label: "Weight bearing", value: "weight_bearing" },
              { label: "Activity", value: "activity" },
              { label: "Rest", value: "rest" },
              { label: "Weather", value: "weather" }
            ]
          },
          {
            name: "msk_relieving_factors",
            label: "Relieving factors",
            type: "checkbox-group",
            options: [
              { label: "Rest", value: "rest" },
              { label: "Heat", value: "heat" },
              { label: "Ice", value: "ice" },
              { label: "Medications", value: "medications" },
              { label: "Positioning", value: "positioning" }
            ]
          },
          { type: "subheading", label: "2. Functional Limitations" },
          {
            name: "msk_difficulty_with",
            label: "Difficulty with",
            type: "checkbox-group",
            options: [
              { label: "Walking", value: "walking" },
              { label: "Standing", value: "standing" },
              { label: "Sitting", value: "sitting" },
              { label: "Transfers", value: "transfers" },
              { label: "Stairs", value: "stairs" },
              { label: "Lifting", value: "lifting" },
              { label: "Reaching", value: "reaching" },
              { label: "Gripping", value: "gripping" },
              { label: "Fine motor tasks", value: "fine_motor" }
            ]
          },
          {
            name: "msk_assistive_device",
            label: "Assistive device used",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "None", value: "none" },
              { label: "Cane", value: "cane" },
              { label: "Walker", value: "walker" },
              { label: "Crutches", value: "crutches" },
              { label: "Wheelchair", value: "wheelchair" },
              { label: "Brace/Splint", value: "brace_splint" }
            ]
          },
          {
            name: "msk_falls_6_12_months",
            label: "Falls in last 6–12 months",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_falls_number",
            label: "Number",
            type: "input",
            showIf: { field: "msk_falls_6_12_months", equals: "yes" },
            helper: "Consider Morse Fall Scale if indicated"
          },
          {
            name: "msk_activity_tolerance",
            label: "Activity tolerance",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Reduced", value: "reduced" },
              { label: "Unable", value: "unable" }
            ]
          },
          { type: "subheading", label: "3. Stiffness & Mobility" },
          {
            name: "msk_morning_stiffness",
            label: "Morning stiffness >30 minutes",
            type: "radio-matrix",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_joint_locking",
            label: "Joint locking/catching",
            type: "radio-matrix",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_joint_instability",
            label: "Joint instability/giving way",
            type: "radio-matrix",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_muscle_spasms",
            label: "Muscle spasms/cramps",
            type: "radio-matrix",
            options: YES_NO_OPTIONS
          },
          { type: "subheading", label: "4. Swelling & Deformity (Patient Reported)" },
          {
            name: "msk_joint_swelling_subj",
            label: "Joint swelling",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_joint_swelling_location",
            label: "Location",
            type: "input",
            showIf: { field: "msk_joint_swelling_subj", equals: "yes" }
          },
          {
            name: "msk_redness_warmth",
            label: "Redness/warmth",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_visible_deformity",
            label: "Visible deformity",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          { type: "subheading", label: "5. Injury / Surgical History" },
          {
            name: "msk_recent_trauma",
            label: "Recent trauma/fall",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_recent_trauma_date",
            label: "Date",
            type: "input",
            showIf: { field: "msk_recent_trauma", equals: "yes" }
          },
          {
            name: "msk_fracture_dislocation",
            label: "Fracture/dislocation",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_fracture_site",
            label: "Site",
            type: "input",
            showIf: { field: "msk_fracture_dislocation", equals: "yes" }
          },
          {
            name: "msk_surgery_replacement",
            label: "Surgery/joint replacement",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_surgery_type_date",
            label: "Type/date",
            type: "input",
            showIf: { field: "msk_surgery_replacement", equals: "yes" }
          },
          {
            name: "msk_chronic_conditions",
            label: "Chronic conditions",
            type: "checkbox-group",
            options: [
              { label: "Osteoarthritis", value: "osteoarthritis" },
              { label: "Rheumatoid arthritis", value: "rheumatoid_arthritis" },
              { label: "Gout", value: "gout" },
              { label: "Osteoporosis", value: "osteoporosis" },
              { label: "Back pain", value: "back_pain" },
              { label: "Scoliosis", value: "scoliosis" },
              { label: "Disc disease", value: "disc_disease" },
              { label: "Tendinopathy", value: "tendinopathy" }
            ]
          },
          { type: "subheading", label: "6. Medications & Risk Factors" },
          {
            name: "msk_analgesics_nsaids",
            label: "Analgesics/NSAIDs",
            type: "radio-matrix",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_steroids_longterm",
            label: "Steroids (long-term)",
            type: "radio-matrix",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_bone_health_meds",
            label: "Bone health meds (calcium, Vit D, bisphosphonates)",
            type: "radio-matrix",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_occupation_sports",
            label: "Occupation/sports overuse",
            type: "radio-matrix",
            options: YES_NO_OPTIONS
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // OBJECTIVE (Clinician-Observed)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "OBJECTIVE (Clinician-Observed)",
        fields: [
          { type: "subheading", label: "1. General Observation" },
          {
            name: "msk_posture",
            label: "Posture",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Kyphosis", value: "kyphosis" },
              { label: "Lordosis", value: "lordosis" },
              { label: "Scoliosis", value: "scoliosis" },
              { label: "Asymmetry", value: "asymmetry" }
            ]
          },
          {
            name: "msk_gait",
            label: "Gait",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Antalgic", value: "antalgic" },
              { label: "Shuffling", value: "shuffling" },
              { label: "Ataxic", value: "ataxic" },
              { label: "Trendelenburg", value: "trendelenburg" },
              { label: "Assisted", value: "assisted" }
            ]
          },
          {
            name: "msk_use_of_aids",
            label: "Use of aids",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Cane", value: "cane" },
              { label: "Walker", value: "walker" },
              { label: "Crutches", value: "crutches" },
              { label: "Wheelchair", value: "wheelchair" },
              { label: "Brace", value: "brace" }
            ]
          },
          { type: "subheading", label: "2. Inspection" },
          {
            name: "msk_joint_alignment",
            label: "Joint alignment",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Swollen", value: "swollen" },
              { label: "Red", value: "red" },
              { label: "Deformed", value: "deformed" }
            ]
          },
          {
            name: "msk_muscle_bulk",
            label: "Muscle bulk",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Atrophy", value: "atrophy" },
              { label: "Hypertrophy", value: "hypertrophy" }
            ]
          },
          {
            name: "msk_skin_over_joints",
            label: "Skin over joints",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Bruising", value: "bruising" },
              { label: "Surgical scars", value: "surgical_scars" },
              { label: "Warmth", value: "warmth" }
            ]
          },
          { type: "subheading", label: "3. Palpation" },
          {
            name: "msk_tenderness",
            label: "Tenderness",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "msk_tenderness_site",
            label: "Site",
            type: "input",
            showIf: { field: "msk_tenderness", equals: "present" }
          },
          {
            name: "msk_temperature",
            label: "Temperature",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Increased", value: "increased" },
              { label: "Decreased", value: "decreased" }
            ]
          },
          {
            name: "msk_crepitus",
            label: "Crepitus",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "msk_muscle_tone",
            label: "Muscle tone",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Spastic", value: "spastic" },
              { label: "Flaccid", value: "flaccid" },
              { label: "Rigid", value: "rigid" }
            ]
          },
          { type: "subheading", label: "4. Range of Motion (ROM)" },
          {
            name: "msk_active_rom",
            label: "Active ROM",
            type: "radio",
            options: [
              { label: "Full", value: "full" },
              { label: "Limited", value: "limited" },
              { label: "Painful", value: "painful" }
            ]
          },
          {
            name: "msk_passive_rom",
            label: "Passive ROM",
            type: "radio",
            options: [
              { label: "Full", value: "full" },
              { label: "Limited", value: "limited" },
              { label: "Painful", value: "painful" }
            ]
          },
          {
            name: "msk_joints_assessed",
            label: "Joint(s) assessed",
            type: "input"
          },
          {
            name: "msk_end_feel",
            label: "End feel",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Hard", value: "hard" },
              { label: "Soft", value: "soft" },
              { label: "Empty", value: "empty" }
            ]
          },
          { type: "subheading", label: "5. Strength (MMT) — Score may appear in PT" },
          {
            name: "msk_upper_limb_strength",
            label: "Upper limb",
            type: "scale-slider",
            min: 0,
            max: 5,
            step: 1,
            showValue: true
          },
          {
            name: "msk_lower_limb_strength",
            label: "Lower limb",
            type: "scale-slider",
            min: 0,
            max: 5,
            step: 1,
            showValue: true
          },
          {
            name: "msk_grip_strength",
            label: "Grip strength",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Reduced", value: "reduced" }
            ]
          },
          { type: "subheading", label: "6. Joint Stability / Special Tests" },
          {
            name: "msk_joint_stability",
            label: "Joint stability",
            type: "radio",
            options: [
              { label: "Stable", value: "stable" },
              { label: "Unstable", value: "unstable" }
            ]
          },
          {
            name: "msk_special_tests",
            label: "Special tests performed",
            type: "input"
          },
          {
            name: "msk_special_tests_results",
            label: "Results",
            type: "radio",
            options: [
              { label: "Positive", value: "positive" },
              { label: "Negative", value: "negative" }
            ]
          },
          { type: "subheading", label: "7. Neurovascular Status (Distal to Joint)" },
          {
            name: "msk_sensation",
            label: "Sensation",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Reduced", value: "reduced" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "msk_pulses",
            label: "Pulses",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Diminished", value: "diminished" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "msk_capillary_refill",
            label: "Capillary refill",
            type: "input",
            placeholder: "seconds"
          },
          {
            name: "msk_color_temperature",
            label: "Color/temperature of distal limb",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Pale", value: "pale" },
              { label: "Cool", value: "cool" },
              { label: "Cyanotic", value: "cyanotic" }
            ]
          },
          { type: "subheading", label: "8. Swelling / Measurements" },
          {
            name: "msk_joint_effusion",
            label: "Joint effusion",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "msk_circumference_cm",
            label: "Circumference (if applicable)",
            type: "input",
            placeholder: "cm"
          },
          {
            name: "msk_limb_length_discrepancy",
            label: "Limb length discrepancy",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "msk_limb_length_amount",
            label: "Amount",
            type: "input",
            placeholder: "cm",
            showIf: { field: "msk_limb_length_discrepancy", equals: "yes" }
          },
          { type: "subheading", label: "9. Functional Performance (Observed)" },
          {
            name: "msk_bed_mobility",
            label: "Bed mobility",
            type: "radio",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Assisted", value: "assisted" },
              { label: "Dependent", value: "dependent" }
            ]
          },
          {
            name: "msk_transfers",
            label: "Transfers",
            type: "radio",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Assisted", value: "assisted" },
              { label: "Dependent", value: "dependent" }
            ]
          },
          {
            name: "msk_ambulation_distance",
            label: "Ambulation – Distance",
            type: "input",
            placeholder: "m"
          },
          {
            name: "msk_ambulation_assistance",
            label: "Ambulation – Assistance",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Supervision", value: "supervision" },
              { label: "Minimal", value: "minimal" },
              { label: "Moderate", value: "moderate" },
              { label: "Max", value: "max" }
            ]
          },
          {
            name: "msk_balance_sitting",
            label: "Balance – Sitting",
            type: "radio",
            options: [
              { label: "Good", value: "good" },
              { label: "Fair", value: "fair" },
              { label: "Poor", value: "poor" }
            ]
          },
          {
            name: "msk_balance_standing",
            label: "Balance – Standing",
            type: "radio",
            options: [
              { label: "Good", value: "good" },
              { label: "Fair", value: "fair" },
              { label: "Poor", value: "poor" }
            ]
          },
          { type: "subheading", label: "RED FLAGS (Auto-Alert in EMR)" },
          {
            name: "msk_red_flags",
            label: "Red Flags",
            type: "checkbox-group",
            options: [
              { label: "Acute trauma with deformity", value: "acute_trauma_deformity" },
              { label: "Neurovascular compromise", value: "neurovascular_compromise" },
              { label: "Suspected fracture/dislocation", value: "suspected_fracture" },
              { label: "Hot swollen joint + fever (septic arthritis)", value: "septic_arthritis" },
              { label: "Sudden inability to bear weight", value: "unable_bear_weight" },
              { label: "Progressive neurological deficit", value: "progressive_neuro_deficit" }
            ]
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={MSK_SCHEMA}
      values={values}
      onChange={onChange}
      layout={layout}
    />
  );
}
