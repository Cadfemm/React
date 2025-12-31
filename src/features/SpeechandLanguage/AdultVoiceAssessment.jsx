import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function VoiceAssessment() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };
  const VOICE_ASSESSMENT_SCHEMA = {
  title: "Voice Assessment",

  sections: [

    /* ======================================================
       S – SUBJECTIVE
    ====================================================== */
    {
      title: "S – Subjective",
      fields: [

        {
          name: "patient_seen",
          label: "Patient was seen",
          type: "single-select",
          options: [
            { label: "Unaccompanied", value: "Unaccompanied" },
            { label: "Accompanied by caregiver", value: "Accompanied by caregiver" }
          ]
        },

        {
          name: "consent",
          label: "Consent",
          type: "textarea",
          helper:
            "Verbal consent was obtained from the patient/family / The patient was seen in their best interest"
        },

        { type: "subheading", label: "Presenting Complaints" },

        {
          name: "presenting_complaints",
          label: "Patient/family reported (tick all that apply)",
          type: "multi-select-dropdown",
          options: [
            "Hoarse / weak / strained voice",
            "Reduced vocal loudness or difficulty projecting voice",
            "Voice fatigue / worsens with prolonged speaking",
            "Pain or discomfort when speaking (odynophonia)",
            "Running out of air while speaking / shortness of breath during voice use",
            "Other(s)"
          ].map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "Medical history (related to voice)" },

        {
          name: "reflux",
          label: "Reflux",
          type: "single-select",
          options: ["Yes", "No"].map(v => ({ label: v, value: v }))
        },

        {
          name: "throat_surgery",
          label: "Throat surgery",
          type: "single-select",
          options: ["Yes", "No"].map(v => ({ label: v, value: v }))
        },

        {
          name: "known_vf_pathology",
          label: "Known VF pathology",
          type: "single-select",
          options: ["Yes", "No"].map(v => ({ label: v, value: v }))
        },

        {
          name: "current_medication",
          label: "Current medication",
          type: "input"
        },

        { type: "subheading", label: "Voice History" },

        {
          name: "onset",
          label: "Onset",
          type: "single-select",
          options: ["Gradual", "Sudden"].map(v => ({ label: v, value: v }))
        },

        {
          name: "onset_duration",
          label: "Date or duration",
          type: "input"
        },

        {
          name: "progression",
          label: "Progression",
          type: "single-select",
          options: ["Better", "Worse", "No change"].map(v => ({ label: v, value: v }))
        },

        {
          name: "vocal_misuse",
          label: "Vocal misuse/abuse behaviours",
          type: "multi-select-dropdown",
          options: ["Screaming", "Shouting", "Excessive throat clearing"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "vocal_demand",
          label: "Vocal Demand Level scale",
          type: "single-select",
          options: ["Low", "Moderate", "High", "Elite Voice User"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "hours_talking",
          label: "Hours of talking per day",
          type: "single-select",
          options: ["<1", "1–3", "3–5", ">5 hrs"]
            .map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "Lifestyle / Dietary Habits" },

        {
          name: "water_intake",
          label: "Daily water intake",
          type: "single-select",
          options: ["<0.5L", "0.5–1.0L", "1–1.5L", "1.5–2.0L", ">2.0L"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "smoking",
          label: "Smoking",
          type: "single-select",
          options: ["Yes", "No"].map(v => ({ label: v, value: v }))
        },

        {
          name: "packs_per_day",
          label: "packs/day",
          type: "input"
        },

        {
          name: "vaping",
          label: "Vaping exposure",
          type: "single-select",
          options: ["Yes", "No"].map(v => ({ label: v, value: v }))
        },

        {
          name: "second_hand_smoke",
          label: "Second-hand smoke exposure",
          type: "single-select",
          options: ["Yes", "No"].map(v => ({ label: v, value: v }))
        },

        {
          name: "hydration_habits",
          label: "Hydration habits",
          type: "multi-select-dropdown",
          options: ["Sips frequently", "Long gaps without drinking"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "alcohol",
          label: "Alcohol",
          type: "single-select",
          options: ["Never", "Occasionally", "Daily"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "caffeine",
          label: "Caffeine",
          type: "single-select",
          options: ["None", "1–2 cups/day", ">2 cups/day"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "spicy_food",
          label: "Spicy food",
          type: "single-select",
          options: ["Rare", "Regular"].map(v => ({ label: v, value: v }))
        },

        {
          name: "dairy",
          label: "Dairy",
          type: "single-select",
          options: ["Rare", "Regular"].map(v => ({ label: v, value: v }))
        },

        {
          name: "acidic_foods",
          label: "Acidic foods (citrus)",
          type: "single-select",
          options: ["Rare", "Regular"].map(v => ({ label: v, value: v }))
        },

        {
          name: "eating_late",
          label: "Eating late at night",
          type: "single-select",
          options: ["Yes", "No"].map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "Associated Symptoms" },

        ...[
          "Globus sensation",
          "Throat dryness",
          "Throat tension / tightness",
          "Pain when talking",
          "Vocal fatigue / endurance issues",
          "Dysphagia or coughing with liquids",
          "Feeling out of breath when talking"
        ].map(label => ({
          name: label,
          label,
          type: "single-select",
          options: ["Yes", "No"].map(v => ({ label: v, value: v }))
        })),

        {
          name: "associated_other",
          label: "Other(s)",
          type: "input"
        },

        { type: "subheading", label: "Musculoskeletal symptoms" },

        {
          name: "jaw_tension",
          label: "Jaw tension / teeth clenching",
          type: "single-select",
          options: ["Yes", "No"].map(v => ({ label: v, value: v }))
        },

        {
          name: "neck_tension",
          label: "Neck/shoulder tension",
          type: "single-select",
          options: ["Yes", "No"].map(v => ({ label: v, value: v }))
        }
      ]
    },

    /* ======================================================
       O – OBJECTIVE
    ====================================================== */
    {
      title: "O – Objective",
      fields: [

        { type: "subheading", label: "General Observation" },

        {
          name: "arousal_level",
          label: "Arousal level",
          type: "single-select",
          options: ["Alert", "Fleeting alertness", "Drowsy"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "sitting_in",
          label: "Sitting in",
          type: "single-select",
          options: ["Chair", "Wheelchair", "Bed"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "position",
          label: "Position",
          type: "single-select",
          options: [
            "Upright (90 degrees)",
            "Slightly reclined",
            "60 degrees",
            "45 degrees"
          ].map(v => ({ label: v, value: v }))
        },

        { name: "spo2", type: "inline-input", inlineLabel: "SPO2:", placeholder: "free text" },
        { name: "hr", type: "inline-input", inlineLabel: "HR:", placeholder: "free text" },
        { name: "rr", type: "inline-input", inlineLabel: "RR:", placeholder: "breaths/min" },

        {
          name: "oral_hygiene",
          label: "Oral hygiene",
          type: "single-select",
          options: ["Poor", "Fair", "Good"]
            .map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "Oral-motor Structure Observation" },

        {
          name: "teeth",
          label: "Teeth",
          type: "single-select",
          options: ["Complete", "Incomplete", "Dentures", "Edentulous"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "hard_palate",
          label: "Hard palate",
          type: "single-select",
          options: ["NAD", "High arch", "Cleft"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "hard_palate_remarks",
          label: "Remarks",
          type: "input"
        },

        {
          name: "soft_palate",
          label: "Soft palate",
          type: "single-select",
          options: ["NAD", "Reduced elevation", "Bifid uvula", "Scarring"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "tongue",
          label: "Tongue",
          type: "multi-select-dropdown",
          options: ["NAD", "Deviation", "Fasciculations", "Thrush", "Reduced ROM"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "lips",
          label: "Lips",
          type: "multi-select-dropdown",
          options: ["NAD", "Reduced seal", "Asymmetry", "Cleft", "Scarring"]
            .map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "Voice Parameters" },

        { type: "subheading", label: "A. Respiratory Observations" },

        {
          name: "breathing_type",
          label: "Type of breathing",
          type: "single-select",
          options: ["Nose", "Mouth"].map(v => ({ label: v, value: v }))
        },

        {
          name: "breathing_pattern",
          label: "Breathing pattern",
          type: "single-select",
          options: ["Clavicular", "Thoracic", "Diaphragmatic"]
            .map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "B. Objective Voice Measures" },

        {
          name: "mpt_average",
          label: "Maximum Phonation Time (MPT) – average of 3 trials",
          type: "input"
        },

        {
          name: "a_trials",
          label: "/a/ (3 trials)",
          type: "multi-select-dropdown",
          options: ["Trial 1", "Trial 2", "Trial 3"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "s_trials",
          label: "/s/ (3 trials)",
          type: "multi-select-dropdown",
          options: ["Trial 1", "Trial 2", "Trial 3"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "z_trials",
          label: "/z/ (3 trials)",
          type: "multi-select-dropdown",
          options: ["Trial 1", "Trial 2", "Trial 3"]
            .map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "Acoustic Analysis (Praat)" },

        {
          name: "f0_mean",
          label: "F0 Mean (Hz)",
          type: "input"
        },
        {
          name: "jitter",
          label: "Jitter (%)",
          type: "input"
        },
        {
          name: "shimmer",
          label: "Shimmer (%)",
          type: "input"
        },
        {
          name: "hnr_cpp",
          label: "HNR / CPP (dB)",
          type: "input"
        },
        {
          name: "intensity_range",
          label: "Intensity Range (dB)",
          type: "input"
        },

        { type: "subheading", label: "C. Perceptual Voice Measures" },

        {
          name: "grbasi",
          label: "GRBASI Scale",
          type: "multi-select-dropdown",
          options: ["Grade", "Roughness", "Breathiness", "Asthenia", "Strain", "Instability"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "capev",
          label: "CAPE-V score",
          type: "multi-select-dropdown",
          options: [
            "Overall severity",
            "Roughness",
            "Breathiness",
            "Strain",
            "Pitch",
            "Loudness",
            "Resonance (if applicable)"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "vhi_10",
          label: "VHI-10 score",
          type: "input"
        },

        {
          name: "rsi_score",
          label: "RSI score",
          type: "input"
        }
      ]
    },

    /* ======================================================
       A – ANALYSIS / ASSESSMENT
    ====================================================== */
    {
      title: "A – Analysis / Assessment",
      fields: [

        {
          name: "diagnosis",
          label: "Diagnoses / Findings (ICD-10)",
          type: "multi-select-dropdown",
          options: [
            "Voice is within functional limits",
            "Dysphonia (ICD-10: R49.0)",
            "Aphonia (ICD-10: R49.1)",
            "Hypernasality and hyponasality (ICD-10: R49.2)",
            "Other and unspecified voice disorders (ICD-10: R49.8)"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "voice_characteristics",
          label: "Characteristics (tick all that apply)",
          type: "multi-select-dropdown",
          options: [
            "Breathy dysphonia",
            "Strained / rough voicing",
            "Reduced loudness",
            "Possible VF pathology"
          ].map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "ICF Functional Impact" },

        {
          name: "icf_body_functions",
          label: "Body Functions",
          type: "multi-select-dropdown",
          options: [
            "b310 Voice functions",
            "b167 Mental functions of language",
            "b152 Emotional functions"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "icf_activities",
          label: "Activities & Participation",
          type: "multi-select-dropdown",
          options: [
            "d330 Speaking",
            "d350 Conversation",
            "d710 Basic interpersonal interactions",
            "d750 Informal social relationships"
          ].map(v => ({ label: v, value: v }))
        }
      ]
    },

    /* ======================================================
       P – PLAN
    ====================================================== */
    {
      title: "P – Plan",
      fields: [

        {
          name: "therapy",
          label: "Therapy",
          type: "multi-select-dropdown",
          options: [
            "JUB.PH.ZZ Training of voice functions",
            "JUB.PM.ZZ Education about voice functions",
            "JUB.PN.ZZ Advising about voice functions"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "referral_specialist",
          label: "Referral – Specialist",
          type: "input"
        },

        {
          name: "further_assessment",
          label: "Further Assessment",
          type: "multi-select-dropdown",
          options: [
            "SE1.AA.ZZ Assessment of communication, unspecified",
            "SE1.AC.ZZ Test of communication, unspecified",
            "SE1.AM.ZZ Observation of communication, unspecified",
            "SE1.AN.ZZ Interview in relation to communication, unspecified"
          ].map(v => ({ label: v, value: v }))
        }
      ]
    }
  ]
};


  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("Voice Assessment Values:", values);
    }
  };

  return (
    <CommonFormBuilder
      schema={VOICE_ASSESSMENT_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    />
  );
}
