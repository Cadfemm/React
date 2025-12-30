import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function PaedIAFeeding() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("Feeding IA Values:", values);
    }
  };

  return (
    <CommonFormBuilder
      schema={FEEDING_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    />
  );
}

/* ======================================================
   SCHEMA – PAED IA FEEDING
====================================================== */
const FEEDING_SCHEMA = {
  title: "Paediatric Initial Assessment",
  subtitle: "Feeding / Swallowing",

  actions: [{ type: "submit", label: "Save Assessment" }],

  sections: [
    {
      title: "Paed IA – Feeding",
      fields: [

        /* ======================================================
           S – SUBJECTIVE
        ====================================================== */

        { type: "subheading", label: "S – Subjective" },

       

        {
          name: "accompaniedBy",
          label: "Patient was seen",
          type: "single-select",
          options: [
            { label: "Unaccompanied", value: "unaccompanied" },
            { label: "Accompanied by parent(s)/guardian(s)", value: "accompanied" }
          ]
        },

        {
          name: "consent",
          label: "Consent",
          type: "textarea",
          helper:
            "Verbal consent was obtained from the caregiver. The child was seen in his/her/their best interest."
        },

        /* ---------- Chief Complaint ---------- */

        { type: "subheading", label: "Chief Complaint" },

        {
          name: "feedingConcerns",
          label: "Family / caregiver reported (tick all that apply)",
          type: "multi-select-dropdown",
          options: [
            "Prolonged feeding time (>30 mins)",
            "Gagging / vomiting during feeds",
            "Coughing / choking during feeds",
            "Poor oral intake / refusal",
            "Drooling excessively",
            "Difficulty transitioning textures",
            "Oral aversion",
            "Picky eating / selective eating",
            "Food avoidance or refusal behaviours",
            "Tube weaning",
            "Other"
          ].map(v => ({ label: v, value: v }))
        },

        /* ---------- Medical History ---------- */

        { type: "subheading", label: "Medical History" },

        {
          name: "feedingMedicalHistory",
          label: "Check all that apply",
          type: "multi-select-dropdown",
          options: [
            "NICU stay",
            "Cardiorespiratory concerns",
            "Reflux",
            "Recurrent chest infections",
            "Tracheomalacia",
            "Cleft palate",
            "Tracheostomy",
            "Seizure",
            "Prematurity",
            "Developmental delay",
            "Other"
          ].map(v => ({ label: v, value: v }))
        },

        /* ---------- Feeding / Dietary Information ---------- */

        { type: "subheading", label: "Feeding / Dietary Information" },

        {
          name: "nutritionSource",
          label: "Main source of nutrition",
          type: "multi-select-dropdown",
          options: [
            "Oral",
            "NG tube",
            "PEG",
            "Mixed feeding"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "oralFeedingMethod",
          label: "Feeding method – Oral",
          type: "multi-select-dropdown",
          options: [
            "Breastfed",
            "Bottle-fed",
            "Spoon",
            "Cup",
            "Straw"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "enteralFeedingMethod",
          label: "Feeding method – Enteral",
          type: "multi-select-dropdown",
          options: [
            "OGT",
            "NGT",
            "G-tube",
            "J-tube",
            "Mixed"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "currentFeedingRegimen",
          label: "Current feeding regimen",
          type: "textarea"
        },

        {
          name: "dietTexture",
          label: "Textures tolerated – Diet consistency (IDDSI)",
          type: "multi-select-dropdown",
          options: [
            "Level 3",
            "Level 4",
            "Level 5",
            "Level 6",
            "Level 7 EC",
            "Level 7 Regular"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "fluidTexture",
          label: "Fluids tolerated – IDDSI level",
          type: "multi-select-dropdown",
          options: [
            "Level 0 – Thin",
            "Level 1 – Slightly thick",
            "Level 2 – Mildly thick",
            "Level 3 – Moderately thick",
            "Level 4 – Extremely thick"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "preferredFoods",
          label: "Preferred foods",
          type: "textarea"
        },

        {
          name: "avoidedFoods",
          label: "Avoided foods / textures",
          type: "textarea"
        },

        {
          name: "feedingDuration",
          type: "inline-input",
          inlineLabel: "Feeding duration per meal:",
          placeholder: "minutes"
        },

        {
          name: "mainFeeder",
          label: "Main feeder",
          type: "single-select",
          options: [
            { label: "Self", value: "self" },
            { label: "Caregiver", value: "caregiver" },
            { label: "Therapist", value: "therapist" }
          ]
        },

        {
          name: "mealtimeEnvironment",
          label: "Mealtime environment",
          type: "textarea"
        },

        /* ---------- Growth & Nutrition ---------- */

        { type: "subheading", label: "Growth & Nutrition" },

        {
          name: "recentWeight",
          type: "inline-input",
          inlineLabel: "Recent weight:",
          placeholder: "kg"
        },

        {
          name: "recentHeight",
          type: "inline-input",
          inlineLabel: "Recent height:",
          placeholder: "cm"
        },

        {
          name: "dietitianConcern",
          label: "Concerns raised by Dietitian",
          type: "single-select",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
            { label: "N/A", value: "na" }
          ]
        },

        /* ---------- Developmental Feeding History ---------- */

        { type: "subheading", label: "Developmental Feeding History" },

        {
          name: "ageSolids",
          type: "inline-input",
          inlineLabel: "Age introduced to solids:",
          placeholder: "months"
        },

        {
          name: "textureProgression",
          label: "Progression of textures",
          type: "single-select",
          options: [
            { label: "WNL", value: "wnl" },
            { label: "Delayed", value: "delayed" },
            { label: "Regression", value: "regression" }
          ]
        },

        /* ======================================================
           O – OBJECTIVE
        ====================================================== */

      {
  title: "O – Objective",
  fields: [

    /* ======================================================
       GENERAL OBSERVATION
    ====================================================== */

    { type: "subheading", label: "General Observation" },

    {
      name: "seating",
      label: "Seating in",
      type: "single-select",
      options: [
        { label: "High chair", value: "high_chair" },
        { label: "Parent lap", value: "lap" },
        { label: "Floor", value: "floor" },
        { label: "Other", value: "other" }
      ]
    },

    {
      name: "behaviourRegulation",
      label: "Behavioural regulation",
      type: "single-select",
      options: [
        { label: "Calm", value: "calm" },
        { label: "Active", value: "active" },
        { label: "Easily distracted", value: "distracted" },
        { label: "Upset", value: "upset" },
        { label: "Requires sensory input / modulation", value: "sensory" }
      ]
    },

    {
      name: "feedingPosition",
      label: "Position during feeding",
      type: "single-select",
      options: [
        { label: "Upright (90°)", value: "90" },
        { label: "Slightly reclined", value: "reclined" },
        { label: "60°", value: "60" },
        { label: "45°", value: "45" }
      ]
    },

    {
      name: "feeder",
      label: "Feeder",
      type: "single-select",
      options: [
        { label: "Self", value: "self" },
        { label: "Caregiver", value: "caregiver" },
        { label: "Therapist", value: "therapist" }
      ]
    },

    {
      name: "engagementWithFeeder",
      label: "Engagement with feeder",
      type: "single-select",
      options: [
        { label: "Good", value: "good" },
        { label: "Reduced", value: "reduced" }
      ]
    },

    /* ======================================================
       ORAL-MOTOR STRUCTURE & FUNCTION OBSERVATION
    ====================================================== */

    { type: "subheading", label: "Oral-motor structure & function observation" },

    {
      name: "teethStructure",
      label: "s3200 Teeth",
      type: "single-select",
      options: [
        { label: "Age-appropriate", value: "age_appropriate" },
        { label: "Delayed eruption", value: "delayed" },
        { label: "Caries", value: "caries" }
      ]
    },

    {
      name: "hardPalateStructure",
      label: "s32020 Hard palate",
      type: "single-select",
      options: [
        { label: "NAD", value: "nad" },
        { label: "High arch", value: "high_arch" },
        { label: "Cleft", value: "cleft" }
      ]
    },

    {
      name: "softPalateStructure",
      label: "s32021 Soft palate",
      type: "single-select",
      options: [
        { label: "NAD", value: "nad" },
        { label: "Reduced elevation", value: "reduced" },
        { label: "Bifid uvula", value: "bifid" },
        { label: "Scarring", value: "scarring" },
        { label: "VPI – suspected", value: "vpi" }
      ]
    },

    {
      name: "nasalResonance",
      label: "b3101 Quality of nasal resonance",
      type: "single-select",
      options: [
        { label: "WNL", value: "wnl" },
        { label: "Hypernasal", value: "hypernasal" },
        { label: "Hyponasal", value: "hyponasal" }
      ]
    },

    {
      name: "tongueStructure",
      label: "s3203 Tongue",
      type: "multi-select-dropdown",
      options: [
        "NAD",
        "Deviation",
        "Fasciculations",
        "Thrush",
        "Reduced ROM"
      ].map(v => ({ label: v, value: v }))
    },

    {
      name: "lipStructure",
      label: "s3204 Lips",
      type: "multi-select-dropdown",
      options: [
        "NAD",
        "Reduced seal",
        "Asymmetry",
        "Cleft",
        "Scarring"
      ].map(v => ({ label: v, value: v }))
    },

    {
      name: "oralStructureRemarks",
      label: "Remarks",
      type: "textarea"
    },

    /* ======================================================
       ORAL-MOTOR EXAMINATION
    ====================================================== */

    { type: "subheading", label: "Oral-Motor Examination" },

    {
      name: "lipSealExam",
      label: "Lips (s3204): Seal",
      type: "single-select",
      options: [
        { label: "Adequate", value: "adequate" },
        { label: "Inadequate", value: "inadequate" },
        { label: "Drooling", value: "drooling" }
      ]
    },

    {
      name: "tongueROMExam",
      label: "Tongue (s3203): ROM",
      type: "single-select",
      options: [
        { label: "Adequate", value: "adequate" },
        { label: "Reduced", value: "reduced" },
        { label: "Thrust", value: "thrust" },
        { label: "Restriction", value: "restriction" }
      ]
    },

    {
      name: "palateExam",
      label: "Hard & Soft Palate",
      type: "single-select",
      options: [
        { label: "NAD", value: "nad" },
        { label: "High-arched", value: "high_arch" },
        { label: "Cleft", value: "cleft" }
      ]
    },

    {
      name: "teethExam",
      label: "Teeth (s3200)",
      type: "single-select",
      options: [
        { label: "Age-appropriate", value: "age_appropriate" },
        { label: "Delayed eruption", value: "delayed" },
        { label: "Caries", value: "caries" }
      ]
    },

    {
      name: "jawStability",
      label: "Jaw stability",
      type: "single-select",
      options: [
        { label: "Good", value: "good" },
        { label: "Poor", value: "poor" },
        { label: "Bite reflex", value: "bite_reflex" }
      ]
    },

    {
      name: "ssbCoordination",
      label: "Suck-swallow-breathe coordination",
      type: "single-select",
      options: [
        { label: "Adequate", value: "adequate" },
        { label: "Disrupted", value: "disrupted" }
      ]
    },

    /* ======================================================
       CRANIAL NERVES
    ====================================================== */

    { type: "subheading", label: "Cranial Nerves" },

    {
      name: "cn5",
      label: "CN V – Chewing strength",
      type: "single-select",
      options: [
        { label: "WNL", value: "wnl" },
        { label: "Reduced", value: "reduced" }
      ]
    },

    {
      name: "cn7",
      label: "CN VII – Symmetry",
      type: "single-select",
      options: [
        { label: "WNL", value: "wnl" },
        { label: "Asymmetrical", value: "asymmetrical" }
      ]
    },

    {
      name: "cn9_10",
      label: "CN IX/X – Gag / Voice",
      type: "multi-select-dropdown",
      options: [
        "Gag present",
        "Gag reduced",
        "Voice clear",
        "Voice wet"
      ].map(v => ({ label: v, value: v }))
    },

    {
      name: "cn12",
      label: "CN XII – Tongue function",
      type: "single-select",
      options: [
        { label: "WNL", value: "wnl" },
        { label: "Reduced", value: "reduced" }
      ]
    },

    /* ======================================================
       FEEDING OBSERVATION
    ====================================================== */

    { type: "subheading", label: "Feeding Observation" },

    {
      name: "feedingObservationCodes",
      label: "Observation codes",
      type: "multi-select-dropdown",
      options: [
        "KTB.AM.ZZ Observation of ingestion functions",
        "KTC.AM.ZZ Observation of swallowing"
      ].map(v => ({ label: v, value: v }))
    },

    /* ---------- Consistencies & Amount ---------- */

    { type: "subheading", label: "Consistencies & Amount Trialled" },

    {
      name: "fluidConsistency",
      label: "Fluids – IDDSI level (tick all that apply)",
      type: "multi-select-dropdown",
      options: [
        "Level 0 – Thin",
        "Level 1 – Slightly thick",
        "Level 2 – Mildly thick",
        "Level 3 – Moderately thick"
      ].map(v => ({ label: v, value: v }))
    },

    {
      name: "foodConsistency",
      label: "Food – IDDSI level (tick all that apply)",
      type: "multi-select-dropdown",
      options: [
        "Level 4 – Extremely thick",
        "Level 5 – Minced & moist",
        "Level 6 – Soft & bite-sized",
        "Level 7 EC – Regular",
        "Level 7 – Regular"
      ].map(v => ({ label: v, value: v }))
    },

    {
      name: "feedingMethodObserved",
      label: "Method of feeding (tick all that apply)",
      type: "multi-select-dropdown",
      options: [
        "Bottle",
        "Breast",
        "Spoon",
        "Cup",
        "Straw"
      ].map(v => ({ label: v, value: v }))
    },

    /* ---------- Oral Phase ---------- */

    { type: "subheading", label: "Oral Phase Observations" },

    {
      name: "oralAcceptance",
      label: "Oral acceptance",
      type: "single-select",
      options: [
        { label: "Good", value: "good" },
        { label: "Limited", value: "limited" },
        { label: "Refused", value: "refused" }
      ]
    },

    {
      name: "lipSealUtensil",
      label: "Lip seal on utensil",
      type: "single-select",
      options: [
        { label: "Adequate", value: "adequate" },
        { label: "Poor", value: "poor" }
      ]
    },

    {
      name: "bolusControl",
      label: "Bolus control",
      type: "single-select",
      options: [
        { label: "WNL", value: "wnl" },
        { label: "Loss anterior", value: "loss_anterior" },
        { label: "Loss lateral", value: "loss_lateral" }
      ]
    },

    {
      name: "mastication",
      label: "Mastication",
      type: "single-select",
      options: [
        { label: "Efficient", value: "efficient" },
        { label: "Munching only", value: "munching" },
        { label: "Poor", value: "poor" }
      ]
    },

    {
      name: "oralResidue",
      label: "Oral residue",
      type: "radio",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },

    /* ---------- Pharyngeal Phase ---------- */

    { type: "subheading", label: "Pharyngeal Phase Observations" },

    {
      name: "nasalRegurgitation",
      label: "Nasal regurgitation",
      type: "radio",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },

    {
      name: "coughSigns",
      label: "Cough / throat clear",
      type: "multi-select-dropdown",
      options: [
        "Cough",
        "Wet voice",
        "Colour change",
        "Stress cues"
      ].map(v => ({ label: v, value: v }))
    },

    {
      name: "voicePostSwallow",
      label: "Voice post-swallow",
      type: "single-select",
      options: [
        { label: "Clear", value: "clear" },
        { label: "Wet", value: "wet" },
        { label: "Aphonia", value: "aphonia" }
      ]
    },

    {
      name: "cervicalAuscultation",
      label: "Cervical auscultation",
      type: "single-select",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Reduced", value: "reduced" },
        { label: "Wet / gurgly", value: "wet" },
        { label: "N/A", value: "na" }
      ]
    },

    /* ---------- Other Observations ---------- */

    { type: "subheading", label: "Other Observations" },

    {
      name: "respiration",
      label: "Respiration",
      type: "single-select",
      options: [
        { label: "Stable", value: "stable" },
        { label: "Desaturation", value: "desaturation" },
        { label: "Increased WOB", value: "wob" }
      ]
    },

    {
      name: "spo2Baseline",
      type: "inline-input",
      inlineLabel: "SPO2 baseline:",
      placeholder: "%"
    },

    {
      name: "spo2Post",
      type: "inline-input",
      inlineLabel: "SPO2 post exposure:",
      placeholder: "%"
    },

    {
      name: "mealtimeDuration",
      label: "Mealtime duration",
      type: "single-select",
      options: [
        { label: "< 30 mins", value: "<30" },
        { label: "> 30 mins", value: ">30" }
      ]
    }
  ]
},


        /* ======================================================
           A – ANALYSIS / ASSESSMENT
        ====================================================== */

        { type: "subheading", label: "A – Analysis / Assessment" },

        {
          name: "feedingDiagnosis",
          label: "Diagnoses / Findings (ICD-10)",
          type: "multi-select-dropdown",
          options: [
            "No feeding or swallowing difficulties observed",
            "Feeding disorder (P98.2)",
            "Dysphagia (R13)"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "feedingCharacteristics",
          label: "Characteristics (tick all that apply)",
          type: "multi-select-dropdown",
          options: [
            "Oral phase",
            "Pharyngeal phase",
            "Feeding skills",
            "Sensory regulation"
          ].map(v => ({ label: v, value: v }))
        },

        /* ---------- ICF Functional Impact ---------- */

        { type: "subheading", label: "ICF Functional Impact" },

        {
          name: "icfBodyFunctions",
          label: "Body Functions",
          type: "multi-select-dropdown",
          options: [
            "b510 Ingestion functions",
            "b5100 Sucking",
            "b5101 Biting",
            "b5102 Chewing",
            "b5103 Manipulation of food in mouth",
            "b5104 Salivation",
            "b5105 Swallowing",
            "b440 Respiration functions",
            "b310 Voice functions"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "icfBodyStructures",
          label: "Body Structures",
          type: "multi-select-dropdown",
          options: [
            "s320 Structure of mouth",
            "s3200 Teeth",
            "s3202 Structure of palate",
            "s32020 Hard palate",
            "s32021 Soft palate",
            "s3203 Tongue",
            "s3204 Structure of lips"
          ].map(v => ({ label: v, value: v }))
        },

        /* ======================================================
           P – PLAN
        ====================================================== */

        { type: "subheading", label: "P – Plan" },

        {
          name: "feedingTherapyPlan",
          label: "Therapy",
          type: "multi-select-dropdown",
          options: [
            "KTB.PH.ZZ Training of ingestion functions",
            "KTB.PM.ZZ Education about ingestion functions",
            "KTB.PN.ZZ Advising about ingestion functions",
            "KTB.PZ.ZZ Counselling in relation to ingestion functions",
            "KTB.RB.ZZ Practical support in relation to ingestion functions",
            "KTB.RC.ZZ Emotional support in relation to ingestion functions",
            "KTC.PH.ZZ Training about swallowing",
            "KTC.PM.ZZ Education about swallowing",
            "KTC.PN.ZZ Advising about swallowing"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "referralSpecialist",
          label: "Referral – Specialist",
          type: "input"
        },

        {
          name: "furtherAssessment",
          label: "Further assessment",
          type: "multi-select-dropdown",
          options: [
            "KTB.AA.ZZ Assessment of ingestion functions",
            "KTB.AC.ZZ Test of ingestion functions",
            "KTB.AM.ZZ Observation of ingestion functions",
            "KTC.AE.AD Video endoscopic evaluation of swallowing",
            "KTC.AM.ZZ Observation of swallowing"
          ].map(v => ({ label: v, value: v }))
        }
      ]
    }
  ]
};

