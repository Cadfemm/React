import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function VoiceAssessment(onBack) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);


  const VOICE_ASSESSMENT_SCHEMA = {
    title: "Voice Assessment",
  actions: [
    { type: "back", label: "Back" },
  ],
    sections: [

      /* ======================================================
         S – SUBJECTIVE
      ====================================================== */
      {
        title: "Subjective",
        fields: [

          {
            name: "patient_seen",
            label: "Patient was seen",
            type: "radio",
            options: [
              { label: "Unaccompanied", value: "Unaccompanied" },
              { label: "Accompanied by caregiver", value: "Accompanied by caregiver" }
            ]
          },

          {
            name: "consent",
            label: "Consent (Verbal)",
            type: "textarea",

          },

          { type: "subheading", label: "Presenting Complaints" },

          {
            name: "presenting_complaints",
            label: "Patient/family reported",
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
          {
  name: "presenting_complaints_other",
  label: "Other – please specify",
  type: "textarea",
  showIf: {
    field: "presenting_complaints",
    includes: "Other(s)"
  }
},


          { type: "subheading", label: "Medical history (related to voice)" },

          {
            name: "reflux",
            label: "Reflux",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          {
            name: "throat_surgery",
            label: "Throat surgery",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          {
            name: "known_vf_pathology",
            label: "Known VF pathology",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          {
            name: "current_medication",
            label: "Current medication",
            type: "textarea"
          },

          { type: "subheading", label: "Voice History" },

          {
            name: "onset",
            label: "Onset",
            type: "radio",
            options: ["Gradual", "Sudden"].map(v => ({ label: v, value: v }))
          },

          {
            type: "row",
            fields: [
              {
                name: "onset_duration",
                label: "Date or duration",
                type: "input"
              },
              {
                name: "progression",
                label: "Progression",
                type: "single-select",
                options: ["Better", "Worse", "No change"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "vocal_misuse",
                label: "Vocal misuse / abuse behaviours",
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
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "hours_talking",
                label: "Hours of talking per day",
                type: "single-select",
                options: ["<1", "1–3", "3–5", ">5 hrs"]
                  .map(v => ({ label: v, value: v }))
              },

            ]
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
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },
          {
  name: "smoking_details",
  label: "Packs / day or details",
  type: "input", 
  placeholder: "e.g. 5 cigarettes/day",
  showIf: {
    field: "smoking",
    equals: "Yes"
  }
},


          {
            name: "vaping",
            label: "Vaping exposure",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          {
            name: "second_hand_smoke",
            label: "Second-hand smoke exposure",
            type: "radio",
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
            type: "radio",
            options: ["Rare", "Regular"].map(v => ({ label: v, value: v }))
          },

          {
            name: "dairy",
            label: "Dairy",
            type: "radio",
            options: ["Rare", "Regular"].map(v => ({ label: v, value: v }))
          },

          {
            name: "acidic_foods",
            label: "Acidic foods (citrus)",
            type: "radio",
            options: ["Rare", "Regular"].map(v => ({ label: v, value: v }))
          },

          {
            name: "eating_late",
            label: "Eating late at night",
            type: "radio",
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
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          })),

          {
            name: "associated_other",
            label: "Other(s)",
            type: "textarea"
          },

          { type: "subheading", label: "Musculoskeletal symptoms" },

          {
            name: "jaw_tension",
            label: "Jaw tension / teeth clenching",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          {
            name: "neck_tension",
            label: "Neck/shoulder tension",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          }
        ]
      },

      /* ======================================================
         O – OBJECTIVE
      ====================================================== */
      {
        title: "Objective",
        fields: [

          { type: "subheading", label: "General Observation" },

          {
            type: "row",
            fields: [
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
              }
            ]
          },

          {
            type: "row",
            fields: [
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
              {
                name: "oral_hygiene",
                label: "Oral hygiene",
                type: "single-select",
                options: ["Poor", "Fair", "Good"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              { name: "SpO₂ (Oxygen Saturation)", type: "input", label: "SpO₂ (Oxygen Saturation):", placeholder: "" },
              { name: "hr", type: "input", label: "HR (Heart Rate):", placeholder: "" }
            ]
          },

          {
            type: "row",
            fields: [
              { name: "rr", type: "input", label: "RR (Respiratory Rate)", placeholder: "breaths/min" },


            ]
          },


          { type: "subheading", label: "Oral-motor Structure Observation" },

          {
            type: "row",
            fields: [
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
                options: ["No Abnormality Detected (NAD)", "High arch", "Cleft"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [

              {
                name: "soft_palate",
                label: "Soft palate",
                type: "single-select",
                options: ["No Abnormality Detected (NAD)", "Reduced elevation", "Bifid uvula", "Scarring"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "tongue",
                label: "Tongue",
                type: "single-select",
                options: ["No Abnormality Detected (NAD)", "Deviation", "Fasciculations", "Thrush", "Reduced ROM"]
                  .map(v => ({ label: v, value: v }))
              },
              {
                name: "lips",
                label: "Lips",
                type: "single-select",
                options: ["No Abnormality Detected (NAD)", "Reduced seal", "Asymmetry", "Cleft", "Scarring"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },
          {
            name: "hard_palate_remarks",
            label: "Remarks",
            type: "textarea"
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
            label: "Maximum Phonation Time (MPT) – average of 3 trials (s)",
            type: "input"
          },

          /* /a/ trials */
          {
            type: "milestone-grid",
            heading: " 3 trials",
            rows: [
              {
                left: { name: "a_trial_1", label: "Trial 1", placeholder: "s" },
                right: { name: "a_trial_2", label: "Trial 2", placeholder: "s" }
              },
              {
                left: { name: "a_trial_3", label: "Trial 3", placeholder: "s" }
              }
            ]
          },

          /* /s/ trials */
          {
            type: "milestone-grid",
            heading: " 3 trials",
            rows: [
              {
                left: { name: "s_trial_1", label: "Trial 1", placeholder: "s" },
                right: { name: "s_trial_2", label: "Trial 2", placeholder: "s" }
              },
              {
                left: { name: "s_trial_3", label: "Trial 3", placeholder: "s" }
              }
            ]
          },

          /* /z/ trials */
          {
            type: "milestone-grid",
            heading: " 3 trials",
            rows: [
              {
                left: { name: "z_trial_1", label: "Trial 1", placeholder: "s" },
                right: { name: "z_trial_2", label: "Trial 2", placeholder: "s" }
              },
              {
                left: { name: "z_trial_3", label: "Trial 3", placeholder: "s" }
              }
            ]
          },


          {
            name: "sz_ratio",
            label: "s/z ratio (Normal ≈ 1.0, >1.4 = possible vocal fold inefficiency, <0.8 = possible phonation difficulty)",
            type: "input"
          },

          { type: "subheading", label: "Acoustic Analysis (Praat) – Sustained /a/ for 3 trials (best trial analysed)" },

          {
            name: "f0_mean",
            label: "F0 Mean (Hz)",
            type: "input"
          },
          {
            name: "jitter",
            label: "Jitter ",
            type: "input"
          },
          {
            name: "shimmer",
            label: "Shimmer%",
            type: "input"
          },
          {
            name: "hnr_cpp",
            label: "HNR / CPP ",
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
            label: " Grade, Roughness, Breathiness, Asthenia, Strain, Instability (GRBASI Scale)",
            type: "single-select",
            options: ["Grade", "Roughness", "Breathiness", "Asthenia", "Strain", "Instability"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "capev",
            label: "Consensus Auditory-Perceptual Evaluation of Voice (CAPE-V score)",
            type: "single-select",
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
            label: "Voice Handicap Index – 10 (VHI-10) score",
            type: "input"
          },

          {
            name: "rsi_score",
            label: "Reflux Symptom Index (RSI) score",
            type: "input"
          },

        

        ]
      },

      /* ======================================================
         A – ANALYSIS / ASSESSMENT
      ====================================================== */
      {
        title: "Analysis / Assessment",
        fields: [

{ type: "subheading", label: "Diagnoses / Findings" },

{
  name: "voiceWithinLimits",
  label: "Voice is within functional limits",
  type: "radio",
  options: [
    { label: "Yes", value: "YES" },
    { label: "No", value: "NO" }
  ]
},

{
  name: "voiceDiagnoses",
  label: "The patient presents with",
  type: "multi-select-dropdown",
  options: [
    "Dysphonia",
    "Aphonia",
    "Hypernasality / Hyponasality",
    "Other and unspecified voice",
      "Breathy dysphonia",
    "Strained / rough voicing",
    "Reduced loudness",
    "Possible VP pathology"
  ].map(v => ({ label: v, value: v })),
 
},



    
          {
            name: "Others",
            label: "Others",
            type: "textarea"
          },
        ]
      },

      /* ======================================================
         P – PLAN
      ====================================================== */
      {
        title: "Plan",
        fields: [

          {
            name: "Others",
            label: "Others",
            type: "textarea"
          },

        ]
      }
    ]
  };


  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

const onAction = (type) => {
  if (type === "submit") {
    setSubmitted(true);
    console.log("PAED IA Speech & Language", values);
  }

  if (type === "back") {
    onBack?.();   // go back to Patients page
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




