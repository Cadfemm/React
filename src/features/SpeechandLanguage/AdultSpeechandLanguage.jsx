import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function SpeechLanguageAssessment({ onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };
  const SPEECH_LANGUAGE_SCHEMA = {
    title: "Speech & Language Initial Assessment",
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
  label: "Patient/family reported challenges",
  type: "multi-select-dropdown",
  options: [
    "Understanding spoken language",
    "Expressing thoughts verbally",
    "Reading comprehension",
    "Written expression",
    "Speech clarity / intelligibility",
    "Voice quality",
    "Additional concerns"
  ].map(v => ({ label: v, value: v }))
},

{
  name: "presenting_complaints_other",
  label: "Additional concerns (specify)",
  type: "textarea",
  showIf: {
    field: "presenting_complaints",
    includes: "Additional concerns"
  }
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

          { type: "subheading", label: "Communication Screening" },

          {
            type: "row",
            fields: [
              {
                name: "conversationalAdequacy",
                label: "Conversational adequacy & coherence",
                type: "single-select",
                options: ["Intact", "Impaired"].map(v => ({ label: v, value: v }))
              },
              {
                name: "understandingCommands",
                label: "Understanding commands (1, 2, multi-step)",
                type: "single-select",
                options: ["Intact", "Impaired"].map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "responseToQuestions",
                label: "Response to questions",
                type: "single-select",
                options: ["Intact", "Impaired"].map(v => ({ label: v, value: v }))
              },
              {
                name: "automaticSpeech",
                label: "Automatic speech",
                type: "single-select",
                options: ["Intact", "Impaired"].map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "speechClarity",
                label: "Speech clarity",
                type: "single-select",
                options: ["Intact", "Impaired"].map(v => ({ label: v, value: v }))
              },
              {
                name: "primaryLanguage",
                label: "Primary language",
                type: "input"
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "otherLanguages",
                label: "Other language(s)",
                type: "input"
              },

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
              },
                  {
                name: "tongue",
                label: "Tongue",
                type: "single-select",
                options: ["No Abnormality Detected (NAD)", "Deviation", "Fasciculations", "Thrush", "Reduced ROM"]
                  .map(v => ({ label: v, value: v }))
              },
            ]
          },

          {
            type: "row",
            fields: [
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
          { type: "subheading", label: "Cranial Nerve Examination" },

          {
            type: "row",
            fields: [
              {
                name: "cn5_motor",
                label: "CN V: Motor (Jaw ROM/strength)",
                type: "single-select",
                options: ["Within Normal Limits (WNL)", "Reduced"].map(v => ({ label: v, value: v }))
              },
              {
                name: "cn5_sensory",
                label: "CN V: Sensory (Facial sensation)",
                type: "single-select",
                options: ["Within Normal Limits (WNL)", "Reduced"].map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "cn7_motor",
                label: "CN VII: Motor (Facial movements)",
                type: "single-select",
                options: ["Within Normal Limits (WNL)", "Reduced"].map(v => ({ label: v, value: v }))
              },
              {
                name: "cn7_symmetry",
                label: "Facial symmetry",
                type: "single-select",
                options: ["Symmetry", "Asymmetrical", "Lt Facial Droop", "Rt Facial Droop"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "cn7_sensory",
                label: "CN VII: Sensory (Taste – ant 2/3 tongue)",
                type: "single-select",
                options: ["Within Normal Limits (WNL)", "Reduced", "Not Tested"]
                  .map(v => ({ label: v, value: v }))
              },
              {
                name: "cn9_10_motor",
                label: "CN IX & X: Motor (SP, Cough)",
                type: "single-select",
                options: ["Within Normal Limits (WNL)", "Reduced"].map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "cn9_10_sensory",
                label: "CN IX & X: Sensory (Gag)",
                type: "single-select",
                options: ["Within Normal Limits (WNL)", "Reduced", "Not Tested"]
                  .map(v => ({ label: v, value: v }))
              },
              {
                name: "voice_quality",
                label: "Voice quality",
                type: "single-select",
                options: ["No Abnormality Detected (NAD)", "Impaired"].map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "cn12_motor",
                label: "CN XII: Motor (Tongue ROM/strength)",
                type: "single-select",
                options: ["Within Normal Limits (WNL)", "Reduced"].map(v => ({ label: v, value: v }))
              },

            ]
          },


          {
            name: "enableLanguageAssessment",
            label: "Language Assessment",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },
          // {
          //   type: "subheading",
          //   label: "Language Assessment",
          //   showIf: { field: "enableLanguageAssessment", equals: "YES" }
          // },

          {
            name: "languageAssessmentTools",
            label: "Assessment tool",
            type: "multi-select-dropdown",
            options: [
              "WAB-R (Western Aphasia Battery – Revised)",
              "BDAE (Boston Diagnostic Aphasia Examination)",
              "CLQT (Cognitive Linguistic Quick Test)",
              "CAT (Comprehensive Aphasia Test)",
              "MWHLT (Malay Word Hearing & Language Test)",
              "Other"
            ].map(v => ({ label: v, value: v })),
            showIf: { field: "enableLanguageAssessment", equals: "YES" }
          },

          {
            type: "multi-select-details",
            sourceField: "languageAssessmentTools",
            namePrefix: "languageToolNote",
            labelPrefix: "Details for",
            showIf: { field: "enableLanguageAssessment", equals: "YES" }
          },

        
          {
            name: "languageImpairmentsObserved",
            label: "Impairments observed in",
            type: "multi-select-dropdown",
            options: [
              "Auditory comprehension",
              "Verbal expression",
              "Naming / Word-finding",
              "Sentence formulation",
              "Pragmatics",
              "Cognitive-communication skills",
              "Reading comprehension",
              "Written expression",
              "Other"
            ].map(v => ({ label: v, value: v })),
            showIf: { field: "enableLanguageAssessment", equals: "YES" }
          },

          {
            name: "languageImpairmentsObserved_other",
            label: "Other (specify)",
            type: "textarea",
            showIf: {
              field: "languageImpairmentsObserved",
              includes: "Other"
            }
          },




          {
            name: "enableSpeechAssessment",
            label: "Speech Assessment",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },


          {
            name: "speechAssessmentTools",
            label: "Assessment tool",
            type: "multi-select-dropdown",
            options: [
              "FDA-2 (Frenchay Dysarthria Assessment – 2)",
              "Robertson Dysarthria Profile",
              "ABA-2 (Assessment of Bulbar Function)",
              "SSI-4 (Stuttering Severity Instrument – 4)",
              "The One Page Stuttering Assessment",
              "Other"
            ].map(v => ({ label: v, value: v })),
            showIf: { field: "enableSpeechAssessment", equals: "YES" }
          },

          {
            type: "multi-select-details",
            sourceField: "speechAssessmentTools",
            namePrefix: "speechToolNote",
            labelPrefix: "Details for",
            showIf: { field: "enableSpeechAssessment", equals: "YES" }
          },

         

          {
            name: "speechImpairmentsObserved",
            label: "Impairments observed in",
            type: "multi-select-dropdown",
            options: [
              "Reflexes",
              "Respiratory support",
              "Phonatory function",
              "Articulation – Lips",
              "Articulation – Tongue",
              "Resonance",
              "Prosody & intelligibility",
              "Other"
            ].map(v => ({ label: v, value: v })),
            showIf: { field: "enableSpeechAssessment", equals: "YES" }
          },

          {
            name: "speechImpairmentsObserved_other",
            label: "Other (specify)",
            type: "textarea",
            showIf: {
              field: "speechImpairmentsObserved",
              includes: "Other"
            }
          },

          {
            name: "intelligibilityRating",
            label: "Intelligibility rating",
            type: "textarea",
            showIf: { field: "enableSpeechAssessment", equals: "YES" }
          },


        ]
      },

      /* ======================================================
         A – ANALYSIS / ASSESSMENT
      ====================================================== */
      {
        title: "Analysis / Assessment",
        fields: [



     {
  name: "diagnoses",
  label: "The patient presents with",
  type: "multi-select-dropdown",
  options: [
    "Aphasia",
    "Dysarthria",
    "Apraxia of Speech",
    "Cognitive-Communication Disorder",
    "Other and unspecified speech disturbances",
    "Stuttering (stammering)",
    "Cluttering"
  ].map(v => ({ label: v, value: v }))
},

/* ================= APHASIA ================= */

{
  name: "aphasiaType",
  label: "Aphasia – Type",
  type: "single-select",
  options: [
    "Broca’s",
    "Wernicke’s",
    "Global",
    "Anomic",
    "Other"
  ].map(v => ({ label: v, value: v })),
  showIf: {
    field: "diagnoses",
    includes: "Aphasia"
  }
},

{
  name: "aphasiaTypeOther",
  label: "Aphasia – Type (Specify)",
  type: "textarea",
  showIf: {
    field: "aphasiaType",
    equals: "Other"
  }
},


{
  name: "aphasiaSeverity",
  label: "Aphasia – Severity",
  type: "single-select",
  options: ["Mild", "Moderate", "Severe"].map(v => ({ label: v, value: v })),
  showIf: {
    field: "diagnoses",
    includes: "Aphasia"
  }
},

/* ================= DYSARTHRIA ================= */

{
  name: "dysarthriaType",
  label: "Dysarthria – Type",
  type: "single-select",
  options: [
    "Flaccid",
    "Spastic",
    "Ataxic",
    "Hypokinetic",
    "Hyperkinetic",
    "Mixed"
  ].map(v => ({ label: v, value: v })),
  showIf: {
    field: "diagnoses",
    includes: "Dysarthria"
  }
},



/* ================= COGNITIVE-COMMUNICATION ================= */

{
  name: "cognitiveAssociatedWith",
  label: "Cognitive-Communication Disorder – Associated with",
  type: "multi-select-dropdown",
  options: ["TBI", "Stroke", "Dementia"].map(v => ({ label: v, value: v })),
  showIf: {
    field: "diagnoses",
    includes: "Cognitive-Communication Disorder"
  }
},

/* ================= OTHER ================= */

{
  name: "otherSpeechDisorder",
  label: "Other (specify)",
  type: "textarea",
  showIf: {
    field: "diagnoses",
    includes: "Other and unspecified speech disturbances"
  }
}

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
      schema={SPEECH_LANGUAGE_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    />
  );
}
