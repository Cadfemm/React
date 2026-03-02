import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const YES_NO_OPTIONS = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];

const MSK_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

const CONSENT_AND_REFERRAL_SCHEMA = {
  title: "",
  sections: [
    {
      fields: [
        {
          name: "consent_risks_benefits",
          type: "checkbox-group",
          options: [{ label: "Risks/benefits explained", value: "yes" }]
        },
        {
          name: "consent_verbalized",
          type: "checkbox-group",
          options: [{ label: "Patient verbalized understanding", value: "yes" }]
        },
        {
          type: "row",
          fields: [
            {
              name: "consent_obtained",
              type: "checkbox-group",
              options: [{ label: "Consent obtained", value: "yes" }]
            },
            {
              name: "consent_upload",
              label: "Upload",
              type: "file-upload",
              showIf: { field: "consent_obtained", includes: "yes" }
            }
          ]
        },
        {
          name: "hep_reviewed",
          type: "checkbox-group",
          options: [
            {
              label: "Home Exercise Program (HEP) reviewed and demonstrated",
              value: "yes"
            }
          ]
        },
        {
          name: "current_diagnosis",
          label: "Current Diagnosis",
          type: "multi-select-dropdown",
          options: [
            { label: "Stroke", value: "stroke" },
            { label: "Traumatic Brain Injury", value: "tbi" },
            { label: "Parkinson Disease", value: "parkinson" },
            { label: "Spinal Cord Injury", value: "sci" },
            { label: "Peripheral Neuropathy", value: "peripheral_neuropathy" },
            { label: "Ligament injuries", value: "ligament_injuries" },
            { label: "Ataxia", value: "ataxia" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "current_diagnosis_other",
          label: "Other Diagnosis (specify)",
          type: "textarea",
          showIf: { field: "current_diagnosis", includes: "others" }
        },
        {
          name: "equipment_owned",
          label: "List of Equipment Owned",
          type: "checkbox-group",
          options: [
            { label: "PERKESO", value: "perkeso" },
            { label: "NGO", value: "ngo" },
            { label: "Self-purchased", value: "self" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "equipment_perkeso",
          label: "PERKESO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "perkeso" }
        },
        {
          name: "equipment_ngo",
          label: "NGO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "ngo" }
        },
        {
          name: "equipment_self",
          label: "Self-purchased Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "self" }
        },
        {
          name: "equipment_others",
          label: "Other Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "others" }
        },
        { type: "subheading", label: "Referral Information" },
        {
          name: "referred_by",
          label: "Referred by",
          type: "input",
          readOnly: true
        },
        {
          name: "referral_reasons",
          label: "Referral Reasons",
          type: "textarea",
          readOnly: true
        }
      ]
    }
  ]
};

const SUBJECTIVE_SCHEMA = {
  actions: [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ],
  sections: [
    {
      fields: [
        {
          name: "msk_chief_complaint",
          label: "Chief Complaint",
          type: "checkbox-group",
          options: [
            { label: "Pain", value: "pain" },
            { label: "Stiffness", value: "stiffness" },
            { label: "Weakness", value: "weakness" },
            { label: "Instability", value: "instability" },
            { label: "Numbness / Tingling", value: "numbness_tingling" },
            { label: "Swelling", value: "swelling" },
            { label: "Functional difficulty", value: "functional_difficulty" }
          ]
        },
        {
          name: "msk_body_region",
          label: "Body Region",
          type: "checkbox-group",
          options: [
            { label: "Cervical", value: "cervical" },
            { label: "Thoracic", value: "thoracic" },
            { label: "Lumbar", value: "lumbar" },
            { label: "Shoulder", value: "shoulder" },
            { label: "Elbow", value: "elbow" },
            { label: "Wrist", value: "wrist" },
            { label: "Hip", value: "hip" },
            { label: "Knee", value: "knee" },
            { label: "Ankle", value: "ankle" },
            { label: "Other", value: "other" }
          ]
        },
        {
          name: "msk_body_region_other",
          label: "Body Region – Other (specify)",
          type: "input",
          showIf: { field: "msk_body_region", includes: "other" }
        },
        {
          name: "msk_side",
          label: "Side",
          type: "radio",
          options: [
            { label: "Right", value: "right" },
            { label: "Left", value: "left" },
            { label: "Bilateral", value: "bilateral" }
          ]
        },
        {
          name: "msk_pain_nrs",
          label: "Pain Scale (NRS)",
          type: "scale-slider",
          min: 0,
          max: 10,
          step: 1,
          showValue: true
        },
        {
          name: "msk_pain_type",
          label: "Pain Type",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Sharp", value: "sharp" },
            { label: "Dull", value: "dull" },
            { label: "Radiating", value: "radiating" },
            { label: "Burning", value: "burning" },
            { label: "Aching", value: "aching" },
            { label: "Intermittent", value: "intermittent" },
            { label: "Constant", value: "constant" }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "msk_duration",
              label: "Duration",
              type: "input"
            },
            {
              name: "msk_aggravating_factors",
              label: "Aggravating Factors",
              type: "input"
            },
            {
              name: "msk_relieving_factors",
              label: "Relieving Factors",
              type: "input"
            }
          ]
        },
        {
          name: "msk_free_text",
          label: "Free text",
          type: "textarea"
        },
        { type: "subheading", label: "History of Present Illness" },
        {
          name: "msk_hpi_location",
          label: "Location",
          type: "input"
        },
        {
          name: "msk_hpi_onset",
          label: "Onset",
          type: "radio",
          options: [
            { label: "Acute", value: "acute" },
            { label: "Subacute", value: "subacute" },
            { label: "Chronic", value: "chronic" }
          ]
        },
        {
          name: "msk_mechanism_of_injury",
          label: "Mechanism of injury",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Trauma", value: "trauma" },
            { label: "Overuse", value: "overuse" },
            { label: "Postural", value: "postural" },
            { label: "Unknown", value: "unknown" }
          ]
        },
        {
          name: "msk_mechanism_free_text",
          label: "Mechanism of injury – Free text",
          type: "input"
        },
        {
          name: "msk_stage",
          label: "Stage",
          type: "radio",
          options: [
            { label: "Acute", value: "acute" },
            { label: "Subacute", value: "subacute" },
            { label: "Chronic", value: "chronic" }
          ]
        },
        {
          name: "msk_progression",
          label: "Progression",
          type: "radio",
          options: [
            { label: "Improving", value: "improving" },
            { label: "Static", value: "static" },
            { label: "Worsening", value: "worsening" }
          ]
        },
        {
          name: "msk_hpi_pain_nrs",
          label: "Pain Scale (NRS)",
          type: "scale-slider",
          min: 0,
          max: 10,
          step: 1,
          showValue: true
        },
        {
          name: "msk_red_flags",
          label: "Red Flag Screening (Mandatory)",
          type: "checkbox-group",
          options: [
            { label: "Fever", value: "fever" },
            { label: "Unexplained weight loss", value: "weight_loss" },
            { label: "Night pain (non-mechanical)", value: "night_pain" },
            { label: "Recent trauma", value: "recent_trauma" },
            { label: "Cancer history", value: "cancer_history" },
            { label: "Long-term steroid use", value: "steroid_use" },
            { label: "Incontinence", value: "incontinence" },
            { label: "Saddle anesthesia", value: "saddle_anesthesia" },
            { label: "Progressive neurological deficit", value: "neuro_deficit" }
          ]
        },
        {
          name: "msk_functional_limitations_present",
          label: "Functional Limitations present?",
          type: "radio",
          options: YES_NO_OPTIONS
        },
        {
          name: "msk_difficulty_with",
          label: "Difficulty with",
          type: "checkbox-group",
          showIf: { field: "msk_functional_limitations_present", equals: "yes" },
          options: [
            { label: "Sitting", value: "sitting" },
            { label: "Standing", value: "standing" },
            { label: "Walking", value: "walking" },
            { label: "Stairs", value: "stairs" },
            { label: "Lifting", value: "lifting" },
            { label: "Dressing", value: "dressing" },
            { label: "Work duties", value: "work_duties" },
            { label: "Sleep disturbance", value: "sleep_disturbance" }
          ]
        },
        {
          name: "msk_difficulty_describe",
          label: "Describe functional limitations",
          type: "input",
          showIf: { field: "msk_functional_limitations_present", equals: "yes" }
        },
        {
          name: "msk_functional_severity",
          label: "Functional Limitation Severity",
          type: "radio",
          showIf: { field: "msk_functional_limitations_present", equals: "yes" },
          options: [
            { label: "Mild", value: "mild" },
            { label: "Moderate", value: "moderate" },
            { label: "Severe", value: "severe" }
          ]
        },
        {
          name: "msk_patient_goals",
          label: "Patient Goals",
          type: "checkbox-group",
          options: [
            { label: "Pain reduction", value: "pain_reduction" },
            { label: "Return to work", value: "return_to_work" },
            { label: "Improve ROM", value: "improve_rom" },
            { label: "Improve strength", value: "improve_strength" },
            { label: "Improve function", value: "improve_function" },
            { label: "Return to sport", value: "return_to_sport" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "msk_patient_goals_other",
          label: "Patient Goals – Others (specify)",
          type: "input",
          showIf: { field: "msk_patient_goals", includes: "others" }
        }
      ]
    }
  ]
};

function MskPatientInfo({ patient }) {
  if (!patient) return null;

  const today = new Date();

  const formatDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return "-";
    return dt.toLocaleDateString();
  };

  const calculateDuration = (onset) => {
    if (!onset) return "-";
    const onsetDate = new Date(onset);
    const diffMs = today - onsetDate;
    if (diffMs < 0 || Number.isNaN(onsetDate.getTime())) return "-";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
  };

  return (
    <div style={section}>
      <div style={patientGrid}>
        <div><b>Name:</b> {patient.name}</div>
        <div><b>IC:</b> {patient.id}</div>
        <div><b>DOB:</b> {formatDate(patient.dob)}</div>
        <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
        <div><b>ICD:</b> {patient.icd}</div>
        <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
        <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
    <div>
          <b>Duration of Diagnosis:</b>{" "}
          {calculateDuration(patient.date_of_onset)}
        </div>
        <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
        <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
        <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
        <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
        <div><b>Education Level:</b> {patient.education_background || "-"}</div>
        <div><b>Occupation:</b> {patient.occupation || "-"}</div>
        <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
        <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
      </div>
    </div>
  );
}

const AMBULATORY_OPTIONS = [
  { label: "Independent walking", value: "independent" },
  { label: "Wheelchair", value: "wheelchair" },
  { label: "Quadripod narrow base", value: "quadripod_narrow" },
  { label: "Quadripod wide base", value: "quadripod_wide" },
  { label: "Walking stick", value: "stick" },
  { label: "Walking frame", value: "frame" },
  { label: "Elbow crutches", value: "crutches" },
  { label: "Others", value: "others" }
];

const OBJECTIVE_SCHEMA = {
  title: "OBJECTIVE",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
        { type: "subheading", label: "Vital Signs" },
        {
          type: "row",
          fields: [
            {
              name: "obj_body_temp",
              label: "Body Temperature (°C)",
              type: "input",
              placeholder: "°C"
            },
            {
              name: "obj_heart_rate",
              label: "Heart Rate (/min)",
              type: "input",
              placeholder: "/min"
            },
            {
              name: "obj_resp_rate",
              label: "Respiratory Rate (/min)",
              type: "input",
              placeholder: "/min"
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "obj_bp",
              label: "Blood Pressure (mmHg)",
              type: "input",
              placeholder: "e.g. 120/80"
            },
            {
              name: "obj_spo2",
              label: "Oxygen Saturation (SpO₂) (%)",
              type: "input",
              placeholder: "%"
            }
          ]
        },

        { type: "subheading", label: "General Observation" },
        {
          name: "msk_gait_pattern",
          label: "Gait Pattern",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Normal", value: "normal" },
            { label: "Antalgic", value: "antalgic" },
            { label: "Hemiplegic", value: "hemiplegic" },
            { label: "Spastic (scissoring)", value: "spastic_scissoring" },
            { label: "Ataxic", value: "ataxic" },
            { label: "Parkinsonian", value: "parkinsonian" },
            { label: "Steppage (high-stepping)", value: "steppage" },
            { label: "Trendelenburg", value: "trendelenburg" },
            { label: "Circumduction", value: "circumduction" },
            { label: "Crouch gait", value: "crouch_gait" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "msk_gait_other",
          label: "Gait Pattern – Other",
          type: "input",
          showIf: { field: "msk_gait_pattern", equals: "others" }
        },
        {
          name: "msk_weight_shifting",
          label: "Weight Shifting",
          type: "radio",
          options: [
            { label: "Symmetrical", value: "symmetrical" },
            { label: "Reduced", value: "reduced" },
            { label: "Absent", value: "absent" }
          ]
        },
        {
          name: "msk_weight_reduced_side",
          label: "Specify Reduced",
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
            { label: "Bilateral", value: "bilateral" }
          ],
          showIf: { field: "msk_weight_shifting", equals: "reduced" }
        },
        {
          name: "msk_weight_absent_side",
          label: "Specify Absent",
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
            { label: "Bilateral", value: "bilateral" }
          ],
          showIf: { field: "msk_weight_shifting", equals: "absent" }
        },
        {
          name: "msk_foot_clearance",
          label: "Foot Clearance",
          type: "radio",
          options: [
            { label: "Adequate", value: "adequate" },
            { label: "Reduced", value: "reduced" },
            { label: "Dragging", value: "dragging" }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "msk_stance_phase_left",
              label: "Stance Phase Left",
              type: "single-select",
              options: [
                { label: "Normal", value: "normal" },
                { label: "Prolonged", value: "prolonged" },
                { label: "Reduced", value: "reduced" },
                { label: "Instability noted", value: "instability" }
              ]
            },
            {
              name: "msk_stance_phase_right",
              label: "Stance Phase Right",
              type: "single-select",
              options: [
                { label: "Normal", value: "normal" },
                { label: "Prolonged", value: "prolonged" },
                { label: "Reduced", value: "reduced" },
                { label: "Instability noted", value: "instability" }
              ]
            }
          ]
        },
        {
          name: "msk_swing_phase",
          label: "Swing Phase (Foot–Ground Clearance)",
          type: "radio",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Reduced", value: "reduced" }
          ]
        },
        {
          name: "msk_assistive_device",
          label: "Assistive device",
          type: "radio",
          options: [
            { label: "None", value: "none" },
            { label: "Cane", value: "cane" },
            { label: "Walker", value: "walker" },
            { label: "Crutches", value: "crutches" }
          ]
        },
        {
          name: "msk_distress",
          label: "Distress",
          type: "radio",
          options: [
            { label: "None", value: "none" },
            { label: "Mild", value: "mild" },
            { label: "Moderate", value: "moderate" },
            { label: "Severe", value: "severe" }
          ]
        },
        {
          name: "msk_postural_type",
          label: "Global Postural Type",
          type: "checkbox-group",
          options: [
            { label: "Normal alignment", value: "normal" },
            { label: "Flat back", value: "flat_back" },
            { label: "Sway back", value: "sway_back" },
            { label: "Increased lordosis", value: "lordosis" },
            { label: "Increased kyphosis", value: "kyphosis" },
            { label: "Forward head posture", value: "forward_head" },
            { label: "Extended neck posture", value: "extended_neck" },
            { label: "Scoliosis", value: "scoliosis" },
            { label: "Combined pattern", value: "combined" }
          ]
        },
        {
          name: "msk_side_of_deviation",
          label: "Side of deviation (if applicable)",
          type: "radio",
          options: [
            { label: "Right", value: "right" },
            { label: "Left", value: "left" }
          ]
        },
        {
          name: "msk_deviation_comments",
          label: "Deviation – Comments",
          type: "input",
          showIf: {
            field: "msk_side_of_deviation",
            oneOf: ["right", "left"]
          }
        },

        { type: "subheading", label: "Scapular Position (Upper Quadrant) – Right Scapula" },
        {
          name: "msk_scapula_right_position",
          label: "Right Scapula Position",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Normal", value: "normal" },
            { label: "Elevated", value: "elevated" },
            { label: "Depressed", value: "depressed" },
            { label: "Anterior tilt", value: "anterior_tilt" },
            { label: "Winging", value: "winging" },
            { label: "Abducted", value: "abducted" },
            { label: "Protracted", value: "protracted" },
            { label: "Retracted", value: "retracted" }
          ]
        },
        {
          name: "msk_scapula_right_symmetry",
          label: "Right Scapula Symmetry",
          type: "radio",
          options: [
            { label: "Symmetrical", value: "symmetrical" },
            { label: "Asymmetrical", value: "asymmetrical" }
          ]
        },

        { type: "subheading", label: "Scapular Position (Upper Quadrant) – Left Scapula" },
        {
          name: "msk_scapula_left_position",
          label: "Left Scapula Position",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Normal", value: "normal" },
            { label: "Elevated", value: "elevated" },
            { label: "Depressed", value: "depressed" },
            { label: "Anterior tilt", value: "anterior_tilt" },
            { label: "Winging", value: "winging" },
            { label: "Abducted", value: "abducted" },
            { label: "Protracted", value: "protracted" },
            { label: "Retracted", value: "retracted" }
          ]
        },
        {
          name: "msk_scapula_left_symmetry",
          label: "Left Scapula Symmetry",
          type: "radio",
          options: [
            { label: "Symmetrical", value: "symmetrical" },
            { label: "Asymmetrical", value: "asymmetrical" }
          ]
        },

        { type: "subheading", label: "Pelvic Alignment" },
        {
          name: "msk_pelvic_iliac_crest",
          label: "Iliac Crest Level",
          type: "radio",
          options: [
            { label: "Symmetrical", value: "symmetrical" },
            { label: "Right higher", value: "right_higher" },
            { label: "Left higher", value: "left_higher" }
          ]
        },
        {
          name: "msk_pelvic_tilt",
          label: "Pelvic Tilt (Sagittal Plane)",
          type: "radio",
          options: [
            { label: "Neutral", value: "neutral" },
            { label: "Anterior tilt", value: "anterior_tilt" },
            { label: "Posterior tilt", value: "posterior_tilt" }
          ]
        },
        {
          name: "msk_pelvic_position",
          label: "Pelvic Position (Frontal / Transverse Plane)",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Lateral tilt – Right", value: "lateral_right" },
            { label: "Lateral tilt – Left", value: "lateral_left" },
            { label: "Rotation – Right", value: "rotation_right" },
            { label: "Rotation – Left", value: "rotation_left" }
          ]
        },

        { type: "subheading", label: "Hip Alignment" },
        {
          name: "msk_hip_alignment_right",
          label: "Hip Alignment: Right",
          type: "radio",
          options: [
            { label: "Neutral", value: "neutral" },
            { label: "Flexed", value: "flexed" },
            { label: "Extended", value: "extended" },
            { label: "Medial rotation", value: "medial_rotation" },
            { label: "Lateral rotation", value: "lateral_rotation" }
          ]
        },
        {
          name: "msk_hip_alignment_left",
          label: "Hip Alignment: Left",
          type: "radio",
          options: [
            { label: "Neutral", value: "neutral" },
            { label: "Flexed", value: "flexed" },
            { label: "Extended", value: "extended" },
            { label: "Medial rotation", value: "medial_rotation" },
            { label: "Lateral rotation", value: "lateral_rotation" }
          ]
        },

        { type: "subheading", label: "Knee Alignment" },
        {
          name: "msk_knee_alignment_left",
          label: "Knee Alignment: Left",
          type: "radio",
          options: [
            { label: "Neutral", value: "neutral" },
            { label: "Hyperextended", value: "hyperextended" },
            { label: "Flexed", value: "flexed" },
            { label: "Valgus", value: "valgus" },
            { label: "Varum", value: "varum" }
          ]
        },
        {
          name: "msk_knee_alignment_right",
          label: "Knee Alignment: Right",
          type: "radio",
          options: [
            { label: "Neutral", value: "neutral" },
            { label: "Hyperextended", value: "hyperextended" },
            { label: "Flexed", value: "flexed" },
            { label: "Valgus", value: "valgus" },
            { label: "Varum", value: "varum" }
          ]
        },

        { type: "subheading", label: "Tibial Alignment" },
        {
          name: "msk_tibia_right",
          label: "Right Tibia",
          type: "radio",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Torsion", value: "torsion" }
          ]
        },
        {
          name: "msk_tibia_left",
          label: "Left Tibia",
          type: "radio",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Torsion", value: "torsion" }
          ]
        },

        { type: "subheading", label: "Foot Alignment" },
        {
          name: "msk_foot_alignment",
          label: "Right / Left Foot",
          type: "radio",
          options: [
            { label: "Neutral", value: "neutral" },
            { label: "Pronated", value: "pronated" },
            { label: "Supinated", value: "supinated" }
          ]
        },

        { type: "subheading", label: "Scales" },
        {
          name: "msk_scales",
          label: "",
          type: "assessment-launcher",
          options: [
            { label: "Oswestry Disability Index", value: "oswestry" },
            { label: "Neck Disability Index (NDI)", value: "ndi" },
            { label: "Upper Limb Functional Scale (ULFS)", value: "ulfs" },
            { label: "Brachial Assessment Tool (BRAT)", value: "brat" },
            { label: "Lower Limb Functional Scale Measures", value: "llfs" },
            { label: "Range of motion", value: "rom" },
            { label: "MMT", value: "mmt" },
            { label: "Isometric Test", value: "isometric" }
          ]
        },

        { type: "subheading", label: "Special Tests" },
        {
          name: "msk_special_tests",
          label: "",
          type: "assessment-launcher",
          options: [
            { label: "Muscle Length Test", value: "muscle_length" },
            { label: "Neurodynamic Test", value: "neurodynamic" },
            { label: "PAIVM", value: "paivm" },
            { label: "Balance Test", value: "balance_test" },
            { label: "Special Test", value: "special_test" },
            { label: "Lower Limb Discrepancy Test", value: "lld_test" }
          ]
        }
      ]
    }
  ]
};

const ASSESSMENT_SCHEMA = {
  title: "ASSESSMENT",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
        {
          name: "msk_problem_list",
          label: "Problem list",
          type: "textarea"
        },
        {
          name: "msk_clinical_impression",
          label: "Clinical Impression",
          type: "textarea"
        },
        {
          name: "msk_rehab_potential",
          label: "Rehabilitation Potential",
          type: "radio",
          options: [
            { label: "Excellent", value: "excellent" },
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Guarded", value: "guarded" },
            { label: "Poor", value: "poor" }
          ]
        }
      ]
    }
  ]
};

const PLAN_SCHEMA = {
  title: "PLAN",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      title: "Short-Term Goals (2–4 weeks)",
      fields: [
        {
          type: "dynamic-goals",
          name: "msk_short_term_goals"
        }
      ]
    },
    {
      title: "Long-Term Goals (6–12 weeks)",
      fields: [
        {
          type: "dynamic-goals",
          name: "msk_long_term_goals"
        }
      ]
    },
    {
      title: "Interventions",
      fields: [
        {
          name: "msk_interventions",
          label: "Interventions",
          type: "textarea"
        }
      ]
    }
  ]
};

export default function Musculoskeletal({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [activeTab, setActiveTab] = useState("subjective");
  const [submitted, setSubmitted] = useState(false);

  const storageKey = patient ? `pt_msk_assessment_draft_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setValues(JSON.parse(saved).values || {});
    }
  }, [storageKey]);

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      referred_by: patient.case_manager || "",
      referral_reasons: patient.diagnosis_history || patient.icd || ""
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleSave = () => {
    if (!storageKey) return;
    localStorage.setItem(
      storageKey,
      JSON.stringify({ values, updatedAt: new Date() })
    );
    alert("Musculoskeletal draft saved");
  };

  const handleClear = () => {
    setValues({});
    setSubmitted(false);
    if (storageKey) localStorage.removeItem(storageKey);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Musculoskeletal assessment submitted");
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  const nextTab = (tab) => {
    if (tab === "subjective") return "objective";
    if (tab === "objective") return "assessment";
    if (tab === "assessment") return "plan";
    return "plan";
  };

  return (
    <div style={mainContent}>
      {/* ===== PATIENT INFORMATION CARD ===== */}
      <CommonFormBuilder
        schema={MSK_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => {}}
      >
        <MskPatientInfo patient={patient} />
      </CommonFormBuilder>

      {/* ===== CONSENT & REFERRAL ===== */}
      <CommonFormBuilder
        schema={CONSENT_AND_REFERRAL_SCHEMA}
        values={values}
        onChange={onChange}
      />

      {/* ===== TABS ===== */}
      <div style={tabBar}>
        {["subjective", "objective", "assessment", "plan"].map(tab => (
          <div
            key={tab}
            style={activeTab === tab ? tabActive : tabBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* ===== TAB CONTENT ===== */}
      <CommonFormBuilder
        schema={schemaMap[activeTab]}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={(type) => {
          if (type === "back") onBack?.();
          if (type === "clear") handleClear();
          if (type === "save") handleSave();
        }}
      >
        <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button
              type="button"
              style={submitBtn}
              onClick={() => setActiveTab(nextTab(activeTab))}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              style={submitBtn}
              onClick={handleSubmit}
            >
              Submit Musculoskeletal Assessment
            </button>
          )}
        </div>
      </CommonFormBuilder>
    </div>
  );
}

const mainContent = { margin: "0 auto" };

const section = {
  marginBottom: 24
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  marginTop: 20
};

const submitBtn = {
  padding: "8px 18px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer"
};

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12,
  marginTop: 24
};

const tabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#0f172a"
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2451b3",
  color: "#2451b3"
};
