import { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

/* ================= CONSTANTS ================= */


const YES_NO_OPTIONS = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" }
];

const IMPAIRMENT_SCALE_OPTIONS = [
  { label: "0 - No impairment", value: 0 },
  { label: "1 - Mild impairment", value: 1 },
  { label: "2 - Moderate impairment", value: 2 },
  { label: "3 - Severe impairment", value: 3 },
  { label: "4 - Complete impairment", value: 4 }
];
const impairmentSeverityOptions = [
  { label: "qm0 - No impairment", value: "qm0" },
  { label: "qm1 - Mild impairment", value: "qm1" },
  { label: "qm2 - Moderate impairment", value: "qm2" },
  { label: "qm3 - Severe impairment", value: "qm3" },
  { label: "qm4 - Complete impairment", value: "qm4" },
  { label: "qm8 - Not applicable", value: "qm8" },
  { label: "qm9 - Not specified", value: "qm9" }
];
const INTELLIGIBILITY_OPTIONS = [
  { label: "5 - Completely intelligible", value: 5 },
  { label: "4 - Mostly intelligible", value: 4 },
  { label: "3 - Moderately intelligible", value: 3 },
  { label: "2 - Mostly unintelligible", value: 2 },
  { label: "1 - Completely unintelligible", value: 1 }
];




const MISUSE_OPTIONS = [
  { label: "Screaming", value: "screaming" },
  { label: "Shouting", value: "shouting" },
  { label: "Excessive throat clearing", value: "throat_clearing" }
];

const HYDRATION_OPTIONS = [
  { label: "Sips frequently", value: "sips" },
  { label: "Long gaps without drinking", value: "gaps" }
];
/* ================= COMPONENT ================= */

// export default function CommunicationAssessment() {
export default function CommunicationAssessment({ mode = "objective" }) {
  const [values, setValues] = useState({});

const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
const createImpairment = (name, label) => ({
  type: "group",
  label: label,
  fields: [
    {
      name: `${name}_selected`,
      type: "checkbox",
      label: "Select"
    },
    {
      name: `${name}_severity`,
      type: "radio",
      label: "Severity",
      options: impairmentSeverityOptions,
      visibleIf: {
        field: `${name}_selected`,
        value: true
      }
    }
  ]
});
const SCHEMA_OBJECTIVE = {
  section_name: "Speech-Language Assessment",
  fields: [
    // {
    //   type: "group",
    //   label: "Communication Domains",
    //   fields: [
    //     {
    //       name: "receiving_spoken_messages",
    //       type: "checkbox-group",
    //       label: "SEA.AA.ZZ Receiving spoken messages"
    //     },
    //     {
    //       name: "producing_communication",
    //       type: "checkbox-group",
    //       label: "SF2.AA.ZZ Producing communication"
    //     }
    //   ]
    // },
    {
  name: "speech_language_status",
  label: "Speech-Language",
  type: "checkbox-group",
  options: [
    {
      label: "Assessment of receiving spoken messages",
      value: "receiving_spoken_messages"
    },
    {
      label: "Assessment of producing communication",
      value: "producing_communication"
    },
    {
      label: "Assessment of articulation functions",
      value: "articulation_functions"
    },
    {
      label: "Assessment of fluency and rhythm of speech",
      value: "fluency_rhythm"
    }
  ]
},

    {
      type: "group",
      label: "Speech Functions",
      fields: [
        {
          name: "articulation_functions",
          type: "checkbox-group",
          label: "Articulation functions"
        },
        {
          name: "fluency_rhythm",
          type: "checkbox-group",
          label: "Fluency and rhythm"
        }
      ]
    },
     {
    name: "speech_assessment_tools",
    label: "Assessment tool-language",
    type: "checkbox-group",
     options: [
        { label: "Western Aphasia Battery – Revised", value: "wab_r" },
        { label: "Boston Diagnostic Aphasia Examination", value: "bdae" },
        { label: "Cognitive Linguistic Quick Test", value: "clqt" },
        { label: "Comprehensive Aphasia Test", value: "cat" },
        { label: "Mount Wilga High Level Language Test (MWHLLT)", value: "mwhllt" },
        { label: "Other", value: "other" }
      ]
  },

    {
      name: "language_score",
      type: "input",
      label: "Score",
      placeholder: "Enter score..."
    },
    {
  type: "group",
  label: "Assessment Tool",
  fields: [
    
    {
      name: "assessment_tools_other",
      label: "Other (please specify)",
      type: "text",
      placeholder: "Enter assessment tool...",
      showIf: {
        field: "assessment_tools",
        includes: "other"   // ✅ correct for checkbox-group
      }
    }
  ]
},
     {
    name: "speech_assessment_tools",
    label: "Assessment tool-speech",
    type: "checkbox-group",
    options: [
      { label: "Frenchay Dysarthria Assessment, 2nd Ed. (FDA-2)", value: "fda2" },
      { label: "Robertson", value: "robertson" },
      { label: "Apraxia Battery for Adults, 2nd Ed. (ABA-2)", value: "aba2" },
      { label: "Stuttering Severity Index, 4th Ed. (SSI-4)", value: "ssi4" },
      { label: "The One Page Stuttering Assessment", value: "one_page_stuttering" },
      { label: "Other", value: "other" }
    ]
  },
  {
    name: "speech_assessment_other",
    label: "If other, specify",
    type: "input",
    showIf: {
      field: "speech_assessment_tools",
      includes: "other"
    }
  },
  {
    name: "speech_score",
    label: "Score",
    type: "input"
  },
  // {
  //   name: "speech_fda2_graph",
  //   label: "Upload FDA-2 graph",
  //   type: "file",
  //   accept: "image/*"
  // },

  {
  name: "speech_fda2_graph",
  label: "Upload FDA-2 graph",
  type: "file",
  accept: "file",
  multiple: false,
  maxSize: 5, // MB (if your builder supports it)
  helperText: "Upload image (JPG, PNG) max 5MB"
},

  {
    name: "speech_impairments",
    label: "Impairments observed in",
    type: "checkbox-group",
    options: [
      { label: "Respiration", value: "respiration" },
      { label: "Phonation", value: "phonation" },
      { label: "Articulation", value: "articulation" },
      { label: "Resonance", value: "resonance" },
      { label: "Prosody", value: "prosody" },
      { label: "Intelligibility", value: "intelligibility" },
      { label: "Rate of speech", value: "rate" },
      { label: "Fluency", value: "fluency" },
      { label: "Other", value: "other" }
    ]
  },
  {
    name: "speech_impairments_other",
    label: "Other impairments (please specify)",
    type: "input",
    showIf: {
      field: "speech_impairments",
      includes: "other"
    }
  },
   {
    name: "reflexes",
    label: "Reflexes",
    type: "radio",
    options: IMPAIRMENT_SCALE_OPTIONS
  },
  {
    name: "respiratory_support",
    label: "Respiratory support",
    type: "radio",
    options: IMPAIRMENT_SCALE_OPTIONS
  },
  {
    name: "phonatory_function",
    label: "Phonatory function",
    type: "radio",
    options: IMPAIRMENT_SCALE_OPTIONS
  },
  {
    name: "articulation_lips_tongue",
    label: "Articulation: Lips / Tongue",
    type: "radio",
    options: IMPAIRMENT_SCALE_OPTIONS
  },
  {
    name: "resonance",
    label: "Resonance",
    type: "radio",
    options: IMPAIRMENT_SCALE_OPTIONS
  },
  {
    name: "prosody_intelligibility",
    label: "Prosody & intelligibility",
    type: "radio",
    options: IMPAIRMENT_SCALE_OPTIONS
  },
  // {
  //   name: "other_impairment",
  //   label: "Other(s)",
  //   type: "input"
  // },
  {
  name: "intelligibility_rating",
  label: "Intelligibility rating",
  type: "radio",
  options: INTELLIGIBILITY_OPTIONS,
  required: true
},
  ]
};

const SCHEMA_ASSESSMENT = {
  sections: [
    {
      title: "Assessment",
      fields: [
        {
          name: "speech_language_status",
          label: "Speech-Language",
          type: "radio",
          options: [
            { label: "No speech and language impairment observed", value: "none" },
            { label: "The patient presents with impairment(s)", value: "impaired" }
          ]
        },

        {
          name: "speech_language_diagnoses",
          label: "The patient presents with",
          type: "checkbox-group",   // ✅ also FIXED (was checkbox ❌)
          options: [
            { label: "Aphasia", value: "aphasia" },
            { label: "Dysarthria", value: "dysarthria" }
          ]
        },
        {
    name: "speech_language_diagnoses",
    label: "The patient presents with",
    type: "checkbox-group",
    options: [
      { label: "Aphasia (ICD-10: R47.0)", value: "aphasia" },
      { label: "Dysarthria (ICD-10: R47.1)", value: "dysarthria" },
      { label: "Apraxia of Speech (ICD-10: R48.2)", value: "apraxia" },
      { label: "Cognitive-Communication Disorder (ICD-10: R41.841)", value: "cognitive_comm" },
      { label: "Other and unspecified speech disturbances (ICD-10: R47.8)", value: "other_speech" },
      { label: "Stuttering / stammering (ICD-10: F98.5)", value: "stuttering" },
      { label: "Cluttering (ICD-10: F98.6)", value: "cluttering" },


    ]
  },

  // --- Aphasia ---
  {
    name: "aphasia_type",
    label: "Aphasia type",
    type: "checkbox-group",
    options: [
      { label: "Broca’s", value: "brocas" },
      { label: "Wernicke’s", value: "wernickes" },
      { label: "Global", value: "global" },
      { label: "Anomic", value: "anomic" },
      { label: "Other", value: "other" }
    ],
    showIf: {
      field: "speech_language_diagnoses",
      includes: "aphasia"
    }
  },
  {
    name: "aphasia_other",
    label: "Other aphasia type",
    type: "input",
    showIf: {
      field: "aphasia_type",
      includes: "other"
    }
  },
  {
    name: "aphasia_severity",
    label: "Aphasia severity",
    type: "radio",
    options: [
      { label: "Mild", value: "mild" },
      { label: "Moderate", value: "moderate" },
      { label: "Severe", value: "severe" }
    ],
    showIf: {
      field: "speech_language_diagnoses",
      includes: "aphasia"
    }
  },

  // --- Dysarthria ---
  {
    name: "dysarthria_type",
    label: "Dysarthria type",
    type: "checkbox-group",
    options: [
      { label: "Flaccid", value: "flaccid" },
      { label: "Spastic", value: "spastic" },
      { label: "Ataxic", value: "ataxic" },
      { label: "Hypokinetic", value: "hypokinetic" },
      { label: "Hyperkinetic", value: "hyperkinetic" },
      { label: "Mixed", value: "mixed" }
    ],
    showIf: {
      field: "speech_language_diagnoses",
      includes: "dysarthria"
    }
  },

  // --- Cognitive-Communication Disorder ---
  {
    name: "cognitive_comm_associated",
    label: "Associated with",
    type: "checkbox-group",
    options: [
      { label: "TBI", value: "tbi" },
      { label: "Stroke", value: "stroke" },
      { label: "Dementia", value: "dementia" }
    ],
    showIf: {
      field: "speech_language_diagnoses",
      includes: "cognitive_comm"
    }
  },

  // --- Optional free text for "Other speech disturbances" ---
  {
    name: "other_speech_details",
    label: "Please specify",
    type: "input",
    showIf: {
      field: "speech_language_diagnoses",
      includes: "other_speech"
    }
  },
  

        // 👉 keep rest of your fields here
      ]
    }
  ]
};




const SCHEMA_PLAN = {
  sections: [
    {
      title: "Plan",
      fields: [
                  { type: "subheading", label: "Communication_Plan" },

        {
          name: "speech_language_therapy",
          label: "Therapy",
          type: "checkbox-group",
          options: [
            {
              label: "SEA.PH.ZZ – Training in receiving spoken messages",
              value: "SEA.PH.ZZ"
            },
            {
              label: "SFA.PH.ZZ – Training in speaking",
              value: "SFA.PH.ZZ"
            }
          ]
        },
        {
          name: "speech_exercises",
          label: "Speech exercises",
          type: "textarea"
        },

        {
          name: "medical_referral",
          label: "Referral for medical management",
          type: "radio",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },

        {
          name: "further_assessment",
          label: "Further Assessment",
          type: "checkbox-group",
          options: [
            {
              label: "SE1.AA.ZZ – Assessment of communication",
              value: "SE1.AA.ZZ"
            },
            {
              label: "SE1.AC.ZZ – Test of communication",
              value: "SE1.AC.ZZ"
            },
            {
              label: "SE1.AM.ZZ – Observation of communication",
              value: "SE1.AM.ZZ"
            },
            {
              label: "SE1.AN.ZZ – Interview",
              value: "SE1.AN.ZZ"
            },
            {
              label: "KTB.AA.ZZ – Assessment of ingestion",
              value: "KTB.AA.ZZ"
            },
            {
              label: "KTC.AA.ZZ – Assessment of swallowing",
              value: "KTC.AA.ZZ"
            }
          ]
        }
      ]
    }
  ]
};
const SCHEMA_SUBJECTIVE = {
    sections: [
      {
        title: "Voice Assessment",
        fields: [

          /* ===== MEDICAL HISTORY ===== */
          {
            type: "subheading",
            label: "Medical history (related to voice)"
          },
          {
            name: "reflux",
            label: "Reflux",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "throat_surgery",
            label: "Throat surgery",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "vf_pathology",
            label: "Known VF pathology",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "current_medication",
            label: "Current medication",
            type: "textarea"
          },

          /* ===== VOICE HISTORY ===== */
          {
            type: "subheading",
            label: "Voice History"
          },
       
        {
  type: "row",
  fields: [
    {
      name: "onset",
      label: "Onset",
      type: "radio",
      options: ["Gradual", "Sudden"]
    },
    {
      name: "onset_duration",
      label: "Date",
      type: "date"
    }
  ]
},
          {
            name: "progression",
            label: "Progression",
            type: "radio",
            options: ["Better", "Worse", "No change"],
          },
          {
            name: "vocal_misuse",
            label: "Vocal misuse/abuse behaviours",
            type: "checkbox-group",
            options: MISUSE_OPTIONS
          },
          {
            name: "vocal_demand",
            label: "Vocal Demand Level",
            type: "radio",
            options: ["Low", "Moderate", "High", "Elite Voice User"]
          },
          {
            name: "talking_hours",
            label: "Hours of talking per day",
            type: "radio",
            options: ["<1", "1-3", "3-5", ">5"]
          },

          /* ===== LIFESTYLE / DIETARY ===== */
          {
            type: "subheading",
            label: "Lifestyle / Dietary Habits"
          },
          {
            name: "water_intake",
            label: "Daily water intake",
            type: "radio",
            options: ["<0.5L", "0.5-1.0L", "1-1.5L", "1.5-2.0L", ">2.0L"]
          },
          {
            name: "smoking",
            label: "Smoking",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "smoking_packs",
            label: "Packs/day",
            type: "textarea",
            showIf: { field: "smoking", equals: "YES" }
          },
          {
            name: "vaping",
            label: "Vaping exposure",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "second_hand_smoke",
            label: "Second-hand smoke exposure",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "hydration_habits",
            label: "Hydration habits",
            type: "checkbox-group",
            options: HYDRATION_OPTIONS
          },
          {
            name: "diet_intake",
            label: "Diet intake",
            type: "textarea"
          },
          {
            name: "alcohol",
            label: "Alcohol",
            type: "radio",
            options: ["Never", "Occasionally", "Daily"]
          },
          {
            name: "caffeine",
            label: "Caffeine",
            type: "radio",
            options: ["None", "1-2 cups/day", ">2 cups/day"]
          },
          {
            name: "spicy_food",
            label: "Spicy food",
            type: "radio",
            options: ["Rare", "Regular"]
          },
          {
            name: "dairy",
            label: "Dairy",
            type: "radio",
            options: ["Rare", "Regular"]
          },
          {
            name: "acidic_food",
            label: "Acidic foods (citrus)",
            type: "radio",
            options: ["Rare", "Regular"]
          },
          {
            name: "late_eating",
            label: "Eating late at night",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
  type: "subheading",
  label: "Associated Symptoms"
},

{
  name: "globus",
  label: "Globus sensation",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "throat_dryness",
  label: "Throat dryness",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "throat_tightness",
  label: "Throat tension / tightness",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "pain_talking",
  label: "Pain when talking",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "vocal_fatigue",
  label: "Vocal fatigue / endurance issues",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "dysphagia_liquids",
  label: "Dysphagia or coughing with liquids",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "breathlessness_talking",
  label: "Feeling out of breath when talking",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "other_symptoms",
  label: "Other(s)",
  type: "textarea"
},
{
  type: "subheading",
  label: "Musculoskeletal symptoms"
},

{
  name: "jaw_tension",
  label: "Jaw tension / teeth clenching",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "neck_shoulder_tension",
  label: "Neck/shoulder tension",
  type: "radio",
  options: YES_NO_OPTIONS
}

        ]
      }
    ]
  };

const SCHEMA_MAP = {
  subjective : SCHEMA_SUBJECTIVE,

  objective: SCHEMA_OBJECTIVE,
  assessment: SCHEMA_ASSESSMENT,
  plan: SCHEMA_PLAN
};
  return (
  //   <div style={{ padding: 20 }}>
  //   {SCHEMA_MAP.map((item) => (
  //       <CommonFormBuilder
  //         key={item.key}
  //         schema={item.schema}
  //         values={values}
  //         onChange={handleChange}
  //       />
  //     ))}
  // </div>
  <div style={{ padding: 20 }}>
          {/* <CommonFormBuilder
            schema={SCHEMA_MAP[mode]}
            values={values}
            onChange={handleChange}
          /> */}
          <CommonFormBuilder
  schema={SCHEMA_MAP[mode] ?? { sections: [] }}
  values={values}
  onChange={handleChange}
/>
        </div>
  );
}