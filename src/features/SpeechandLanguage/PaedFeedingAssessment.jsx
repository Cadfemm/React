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

const FEEDING_SCHEMA = {
  title: "Paediatric Initial Assessment",
  subtitle: "Feeding / Swallowing",


  sections: [

    /* ======================================================
       S – SUBJECTIVE
    ====================================================== */
    {
      title: "S – Subjective",
      fields: [

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

        { type: "subheading", label: "Feeding / Dietary Information" },

        {
          name: "nutritionSource",
          label: "Main source of nutrition",
          type: "multi-select-dropdown",
          options: ["Oral", "NG tube", "PEG", "Mixed feeding"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "oralFeedingMethod",
          label: "Feeding method – Oral",
          type: "multi-select-dropdown",
          options: ["Breastfed", "Bottle-fed", "Spoon", "Cup", "Straw"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "enteralFeedingMethod",
          label: "Feeding method – Enteral",
          type: "multi-select-dropdown",
          options: ["OGT", "NGT", "G-tube", "J-tube", "Mixed"]
            .map(v => ({ label: v, value: v }))
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

        { name: "preferredFoods", label: "Preferred foods", type: "textarea" },
        { name: "avoidedFoods", label: "Avoided foods / textures", type: "textarea" },

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

        { name: "mealtimeEnvironment", label: "Mealtime environment", type: "textarea" },

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

        { type: "subheading", label: "Oral-motor structure & function observation" },

        {
          name: "teethStructure",
          label: "Teeth",
          type: "single-select",
          options: [
            { label: "Age-appropriate", value: "age_appropriate" },
            { label: "Delayed eruption", value: "delayed" },
            { label: "Caries", value: "caries" }
          ]
        },

        {
          name: "hardPalateStructure",
          label: "Hard palate",
          type: "single-select",
          options: [
            { label: "NAD", value: "nad" },
            { label: "High arch", value: "high_arch" },
            { label: "Cleft", value: "cleft" }
          ]
        },

        {
          name: "softPalateStructure",
          label: "Soft palate",
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
          label: "Quality of nasal resonance",
          type: "single-select",
          options: [
            { label: "WNL", value: "wnl" },
            { label: "Hypernasal", value: "hypernasal" },
            { label: "Hyponasal", value: "hyponasal" }
          ]
        },

        {
          name: "tongueStructure",
          label: "Tongue",
          type: "multi-select-dropdown",
          options: ["NAD", "Deviation", "Fasciculations", "Thrush", "Reduced ROM"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "lipStructure",
          label: "Lips",
          type: "multi-select-dropdown",
          options: ["NAD", "Reduced seal", "Asymmetry", "Cleft", "Scarring"]
            .map(v => ({ label: v, value: v }))
        },

        {
          name: "oralStructureRemarks",
          label: "Remarks",
          type: "textarea"
        },

        { type: "subheading", label: "Feeding Observation" },

        {
          name: "feedingObservationCodes",
          label: "Observation codes",
          type: "multi-select-dropdown",
          options: [
            " Observation of ingestion functions",
            " Observation of swallowing"
          ].map(v => ({ label: v, value: v }))
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

        { type: "subheading", label: "ICF Functional Impact" },

        {
          name: "icfBodyFunctions",
          label: "Body Functions",
          type: "multi-select-dropdown",
          options: [
            "Ingestion functions",
            "Sucking",
            "Biting",
            "Chewing",
            "Manipulation of food in mouth",
            "Salivation",
            "Swallowing",
            "Respiration functions",
            "Voice functions"
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "icfBodyStructures",
          label: "Body Structures",
          type: "multi-select-dropdown",
          options: [
            "Structure of mouth",
            "Teeth",
            "Structure of palate",
            "Hard palate",
            "Soft palate",
            "Tongue",
            "Structure of lips"
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
          name: "feedingTherapyPlan",
          label: "Therapy",
          type: "multi-select-dropdown",
          options: [
            "Training of ingestion functions",
            "Education about ingestion functions",
            "Advising about ingestion functions",
            "Counselling in relation to ingestion functions",
            "Practical support in relation to ingestion functions",
            "Emotional support in relation to ingestion functions",
            "Training about swallowing",
            "Education about swallowing",
            "Advising about swallowing"
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
            "Assessment of ingestion functions",
            "Test of ingestion functions",
            "Observation of ingestion functions",
            "Video endoscopic evaluation of swallowing",
            "Observation of swallowing"
          ].map(v => ({ label: v, value: v }))
        }
      ]
    }
  ]
};

