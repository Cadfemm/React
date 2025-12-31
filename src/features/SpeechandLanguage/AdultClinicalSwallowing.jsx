import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function ClinicalSwallowingEvaluation() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const CSE_SCHEMA = {
  title: "Clinical Swallowing Evaluation (CSE)",

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
            "Drooling",
            "Coughing with drink",
            "Choking on food",
            "Food/pills stuck in throat",
            "Pain on swallowing (odynophagia)",
            "Other(s)"
          ].map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "Current Diet Intake" },

        { type: "subheading", label: "Oral" },

        {
          name: "oral_food_consistency",
          label: "Food consistency",
          type: "multi-select-dropdown",
          options: ["IDDSI Level 3", "IDDSI Level 4", "IDDSI Level 5", "IDDSI Level 6", "IDDSI Level 7EC", "IDDSI Level 7"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "oral_fluid_consistency",
          label: "Fluids consistency",
          type: "multi-select-dropdown",
          options: ["IDDSI Level 0", "IDDSI Level 1", "IDDSI Level 2", "IDDSI Level 3", "IDDSI Level 4"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "oral_amount",
          label: "Amount",
          type: "single-select",
          options: ["Half portion", "Full portion"].map(v => ({ label: v, value: v }))
        },

        {
          name: "oral_frequency",
          type: "inline-input",
          inlineLabel: "Frequency:",
          placeholder: "times/day"
        },

        { type: "subheading", label: "Enteral feeding" },

        {
          name: "enteral_type",
          label: "Type",
          type: "multi-select-dropdown",
          options: ["OGT", "NGT", "NJT", "G-tube", "J-tube"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "enteral_regimen",
          label: "Regimen",
          type: "textarea"
        },

        {
          name: "enteral_other",
          label: "Other(s)",
          type: "input"
        },

        {
          name: "enteral_schedule",
          label: "Feeding schedule",
          type: "single-select",
          options: ["3-hourly", "4-hourly", "Continuous"]
            .map(v => ({ label: v, value: v }))
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

        { type: "subheading", label: "Cranial Nerve Examination" },

        { name: "cn5_motor", label: "CN V: Motor (Jaw ROM/strength)", type: "single-select", options: ["WNL", "Reduced"].map(v => ({ label: v, value: v })) },
        { name: "cn5_sensory", label: "CN V: Sensory (Facial sensation)", type: "single-select", options: ["WNL", "Reduced"].map(v => ({ label: v, value: v })) },

        { name: "cn7_motor", label: "CN VII: Motor (Facial movements)", type: "single-select", options: ["WNL", "Reduced"].map(v => ({ label: v, value: v })) },
        { name: "cn7_symmetry", label: "Facial symmetry", type: "single-select", options: ["Symmetry", "Asymmetrical", "Lt Facial Droop", "Rt Facial Droop"].map(v => ({ label: v, value: v })) },
        { name: "cn7_sensory", label: "CN VII: Sensory (Taste – ant 2/3 tongue)", type: "single-select", options: ["WNL", "Reduced", "Not Tested"].map(v => ({ label: v, value: v })) },

        { name: "cn9_10_motor", label: "CN IX & X: Motor (SP, Cough)", type: "single-select", options: ["WNL", "Reduced"].map(v => ({ label: v, value: v })) },
        { name: "cn9_10_sensory", label: "CN IX & X: Sensory (Gag)", type: "single-select", options: ["WNL", "Reduced", "Not Tested"].map(v => ({ label: v, value: v })) },
        { name: "voice_quality", label: "Voice quality", type: "single-select", options: ["NAD", "Impaired"].map(v => ({ label: v, value: v })) },

        { name: "cn12_motor", label: "CN XII: Motor (Tongue ROM/strength)", type: "single-select", options: ["WNL", "Reduced"].map(v => ({ label: v, value: v })) }
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
            "No swallowing impairment observed",
            "Dysphagia (ICD-10: R13)"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "dysphagia_characteristics",
          label: "Characteristics (tick all that apply)",
          type: "multi-select-dropdown",
          options: [
            "Anterior spillage",
            "Slow / ineffective mastication",
            "Oral residue post swallow",
            "Overt signs of aspiration",
            "Suspected silent aspiration",
            "Other(s)"
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
            "KTC.PH.ZZ Training about swallowing",
            "KTC.PM.ZZ Education about swallowing",
            "KTC.PN.ZZ Advising about swallowing"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "referral_specialist",
          label: "Referral – Specialist",
          type: "input"
        },

        {
          name: "further_assessment",
          label: "Further assessment",
          type: "multi-select-dropdown",
          options: [
            "KTC.AE.AD Video endoscopic evaluation of swallowing",
            "KTC.AM.ZZ Observation of swallowing",
            "SE1.AA.ZZ Assessment of communication, unspecified",
            "SE1.AC.ZZ Test of communication, unspecified"
          ].map(v => ({ label: v, value: v }))
        }
      ]
    }
  ]
};


  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("CSE Values:", values);
    }
  };

  return (
    <CommonFormBuilder
      schema={CSE_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    />
  );
}
