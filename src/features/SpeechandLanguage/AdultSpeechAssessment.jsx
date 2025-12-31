import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";


export default function FeedingAssessment() {
    /* ===============================
    FORM STATE
    =============================== */
    const [values, setValues] = useState({});
    const [submitted, setSubmitted] = useState(false);
const SPEECH_LANGUAGE_SCHEMA = {
  title: "Speech & Language Initial Assessment",

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
          label: "Patient/family reported challenges in (tick all that apply)",
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

        { type: "subheading", label: "Communication screening" },

        ...[
          "Conversational adequacy & coherence",
          "Understanding commands (1, 2, multi-step)",
          "Response to questions",
          "Automatic speech",
          "Speech clarity"
        ].map(label => ({
          name: label,
          label,
          type: "single-select",
          options: ["Intact", "Impaired"]
            .map(v => ({ label: v, value: v }))
        })),

        { name: "primary_language", label: "Primary language", type: "input" },
        { name: "other_languages", label: "Other language(s)", type: "input" },

        { type: "subheading", label: "Oral-motor structure observation" },

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

        { name: "oral_motor_remarks", label: "Remarks", type: "textarea" },

        { type: "subheading", label: "Cranial Nerve Examination" },

        { name: "cn5_motor", label: "CN V: Motor (Jaw ROM/strength)", type: "single-select", options: ["WNL", "Reduced"].map(v => ({ label: v, value: v })) },
        { name: "cn5_sensory", label: "CN V: Sensory (Facial sensation)", type: "single-select", options: ["WNL", "Reduced"].map(v => ({ label: v, value: v })) },

        { name: "cn7_motor", label: "CN VII: Motor (Facial movements)", type: "single-select", options: ["WNL", "Reduced"].map(v => ({ label: v, value: v })) },
        { name: "facial_symmetry", label: "Facial Symmetry", type: "single-select", options: ["Symmetry", "Asymmetrical", "LFD", "RFD"].map(v => ({ label: v, value: v })) },
        { name: "cn7_sensory", label: "CN VII: Sensory (Taste – ant 2/3 tongue)", type: "single-select", options: ["WNL", "Reduced", "Not Tested"].map(v => ({ label: v, value: v })) },

        { name: "cn9_10_motor", label: "CN IX & X: Motor (SP, Cough)", type: "single-select", options: ["WNL", "Reduced"].map(v => ({ label: v, value: v })) },
        { name: "cn9_10_sensory", label: "CN IX & X: Sensory (Gag)", type: "single-select", options: ["WNL", "Reduced", "Not Tested"].map(v => ({ label: v, value: v })) },
        { name: "voice_quality", label: "Voice quality", type: "single-select", options: ["NAD", "Impaired"].map(v => ({ label: v, value: v })) },

        { name: "cn12_motor", label: "CN XII: Motor (Tongue ROM/strength)", type: "single-select", options: ["WNL", "Reduced"].map(v => ({ label: v, value: v })) },

        { type: "subheading", label: "Language Assessment" },

        {
          name: "language_codes",
          label: "Assessment codes",
          type: "multi-select-dropdown",
          options: [
            "SEA.AA.ZZ Assessment of receiving spoken messages",
            "SF2.AA.ZZ Assessment of producing communication, not elsewhere classified"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "language_tools",
          label: "Assessment tool",
          type: "multi-select-dropdown",
          options: ["WAB-R", "BDAE", "CLQT", "CAT", "MWHLT"]
            .map(v => ({ label: v, value: v }))
        },

        { name: "language_other_tool", label: "Other", type: "input" },
        { name: "language_score", label: "Score", type: "input" },

        {
          name: "language_impairments",
          label: "Impairments observed in (tick all)",
          type: "multi-select-dropdown",
          options: [
            "Auditory comprehension",
            "Verbal expression",
            "Naming / Word-finding",
            "Sentence formulation",
            "Pragmatics",
            "Cognitive-communication skills",
            "Reading comprehension",
            "Written expression"
          ].map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "Speech Assessment" },

        {
          name: "speech_codes",
          label: "Assessment code",
          type: "multi-select-dropdown",
          options: [
            "JU1.AA.ZZ Assessment of voice and speech functions, unspecified"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "speech_tools",
          label: "Assessment tool",
          type: "multi-select-dropdown",
          options: ["FDA-2", "Robertson", "ABA-2", "SSI-4", "The One Page Stuttering"]
            .map(v => ({ label: v, value: v }))
        },

        { name: "speech_other_tool", label: "Other", type: "input" },
        { name: "speech_score", label: "Score", type: "input" },

        {
          name: "speech_impairments",
          label: "Impairments observed in (tick all)",
          type: "multi-select-dropdown",
          options: [
            "Reflexes",
            "Respiratory support",
            "Phonatory function",
            "Articulation: Lips / Tongue",
            "Resonance",
            "Prosody & intelligibility"
          ].map(v => ({ label: v, value: v }))
        },

        { name: "intelligibility_rating", label: "Intelligibility rating", type: "input" }
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
          label: "The patient presents with (tick all that apply)",
          type: "multi-select-dropdown",
          options: [
            "Aphasia (ICD-10: R47.0)",
            "Dysarthria (ICD-10: R47.1)",
            "Apraxia of Speech (ICD-10: R48.2)",
            "Cognitive-Communication Disorder (ICD-10 CM: R41.841)",
            "Other and unspecified speech disturbances (ICD-10: R47.8)",
            "Stuttering (ICD-10: F98.5)",
            "Cluttering (ICD-10: F98.6)"
          ].map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "ICF Functional Impact" },

        {
          name: "icf_body_functions",
          label: "Body Functions",
          type: "multi-select-dropdown",
          options: [
            "b167 Mental functions of language",
            "b1670 Reception of language",
            "b1671 Expression of language",
            "b1672 Integrative language functions",
            "b320 Articulation",
            "b330 Fluency of speech",
            "b340 Voice functions"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "icf_activities",
          label: "Activities & Participation",
          type: "multi-select-dropdown",
          options: [
            "d310 Receiving spoken messages",
            "d330 Speaking",
            "d350 Conversation",
            "d355 Nonverbal communication"
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
            "SEA.PH.ZZ Training in receiving spoken messages",
            "SFA.PH.ZZ Training in speaking"
          ].map(v => ({ label: v, value: v }))
        },

        { name: "referral_specialist", label: "Referral – Specialist", type: "input" },

        {
          name: "further_assessment",
          label: "Further assessment",
          type: "multi-select-dropdown",
          options: [
            "SE1.AA.ZZ Assessment of communication, unspecified",
            "SE1.AC.ZZ Test of communication, unspecified",
            "SE1.AM.ZZ Observation of communication, unspecified",
            "SE1.AN.ZZ Interview in relation to communication, unspecified",
            "KTB.AA.ZZ Assessment of ingestion functions",
            "KTC.AA.ZZ Assessment of swallowing"
          ].map(v => ({ label: v, value: v }))
        }
      ]
    }
  ]
};



  const onChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

 
  const onAction = action => {
    if (action.type === "submit") {
      setSubmitted(true);

      console.log("FEEDING FORM VALUES:", values);
    }
  };

  /* ===============================
     RENDER
  =============================== */
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

