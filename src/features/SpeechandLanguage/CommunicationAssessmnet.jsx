
import { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

/* ================= CONSTANTS ================= */

const YES_NO_OPTIONS = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" }
];

const IMPAIRMENT_SCALE_OPTIONS = [
  { label: "0 - No impairment", value: "0" },
  { label: "1 - Mild impairment", value: "1" },
  { label: "2 - Moderate impairment", value: "2" },
  { label: "3 - Severe impairment", value: "3" },
  { label: "4 - Complete impairment", value: "4" }
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
  { label: "5 - Completely intelligible", value: "5" },
  { label: "4 - Mostly intelligible", value: "4" },
  { label: "3 - Somewhat intelligible", value: "3" },
  { label: "2 - Mostly unintelligible", value: "2" },
  { label: "1 - Completely unintelligible", value: "1" }
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

export default function CommunicationAssessment({ mode = "objective" }) {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleAction = (type) => {
    // reserved for future actions
  };

  /* ================= SCHEMA_OBJECTIVE ================= */
  const SCHEMA_OBJECTIVE = {
    sections: [
      {
        fields: [
          // ===== SPEECH FUNCTIONS =====
          {
            name: "speech_functions",
            label: "Speech Language Assessment",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Language", value: "language" },
              { label: "Speech", value: "speech" }
            ]
          },

          // ===== LANGUAGE SECTION =====
          { type: "subheading", label: "Language", showIf: { field: "speech_functions", equals: "language" } },

          {
            name: "language_assessment_tools",
            label: "Assessment tool",
            type: "checkbox-group",
            showIf: { field: "speech_functions", equals: "language" },
            options: [
              { label: "Western Aphasia Battery – Revised", value: "wab_r" },
              { label: "Boston Diagnostic Aphasia Examination", value: "bdae" },
              { label: "Cognitive Linguistic Quick Test", value: "clqt" },
              { label: "Comprehensive Aphasia Test", value: "cat" },
              { label: "Mount Wilga High Level Language Test (MWHLLT)", value: "mwhllt" },
              { label: "Other (specify)", value: "other" }
            ]
          },
          {
            name: "language_assessment_other",
            label: "Specify other assessment tool",
            type: "input",
            showIf: {
              field: "language_assessment_tools",
              includes: "other",
              and: { field: "speech_functions", equals: "language" }
            }
          },

          {
            name: "language_score",
            label: "Score",
            type: "input",
            placeholder: "Enter score...",
            showIf: { field: "speech_functions", equals: "language" }
          },

          // ===== LANGUAGE IMPAIRMENTS =====
          { type: "subheading", label: "Impairments observed in", showIf: { field: "speech_functions", equals: "language" } },

          {
            name: "lang_impairments",
            label: "Impairments observed in",
            type: "checkbox-group",
            showIf: { field: "speech_functions", equals: "language" },
            options: [
              { label: "Auditory comprehension", value: "auditory_comprehension" },
              { label: "Verbal expression", value: "verbal_expression" },
              { label: "Naming / Word-finding", value: "naming" },
              { label: "Sentence formulation", value: "sentence_formulation" },
              { label: "Pragmatics", value: "pragmatics" },
              { label: "Cognitive-communication skills", value: "cognitive_comm" },
              { label: "Reading comprehension", value: "reading_comprehension" },
              { label: "Written expression", value: "written_expression" },
              { label: "Other (specify)", value: "other" }
            ]
          },
          {
            name: "lang_impairments_other",
            label: "Specify other impairment",
            type: "input",
            showIf: {
              field: "lang_impairments",
              includes: "other",
              and: { field: "speech_functions", equals: "language" }
            }
          },

          {
            name: "lang_auditory_severity",
            label: "Auditory comprehension – severity",
            type: "single-select",
            options: impairmentSeverityOptions,
            placeholder: "— Select severity —",
            showIf: {
              field: "lang_impairments",
              includes: "auditory_comprehension",
              and: { field: "speech_functions", equals: "language" }
            }
          },

          // ===== SPEECH SECTION =====
          { type: "subheading", label: "Speech", showIf: { field: "speech_functions", equals: "speech" } },

          {
            name: "speech_assessment_tools",
            label: "Assessment tool",
            type: "checkbox-group",
            showIf: { field: "speech_functions", equals: "speech" },
            options: [
              { label: "Frenchay Dysarthria Assessment (FDA-2)", value: "fda2" },
              { label: "Robertson", value: "robertson" },
              { label: "Apraxia Battery for Adults (ABA-2)", value: "aba2" },
              { label: "Stuttering Severity Index (SSI-4)", value: "ssi4" },
              { label: "One Page Stuttering Assessment", value: "one_page" },
              { label: "Other (specify)", value: "other" }
            ]
          },
          {
            name: "speech_assessment_other",
            label: "Specify other assessment tool",
            type: "input",
            showIf: { field: "speech_assessment_tools", includes: "other" }
          },

          {
            name: "speech_score",
            label: "Score",
            type: "input",
            placeholder: "Enter score...",
            showIf: { field: "speech_functions", equals: "speech" }
          },

          {
            name: "speech_fda2_graph",
            label: "Upload FDA-2 graph",
            type: "attach-file",
            accept: "image/*,.pdf",
            showIf: { field: "speech_assessment_tools", includes: "fda2" }
          },

          // ===== SPEECH IMPAIRMENTS =====
          { type: "subheading", label: "Impairments observed in", showIf: { field: "speech_functions", equals: "speech" } },

          {
            name: "speech_impairments",
            label: "Impairments observed in",
            type: "checkbox-group",
            showIf: { field: "speech_functions", equals: "speech" },
            options: [
              { label: "Reflexes", value: "reflexes" },
              { label: "Respiratory support", value: "respiration" },
              { label: "Phonatory function", value: "phonatory" },
              { label: "Articulation: Lips / Tongue", value: "articulation" },
              { label: "Resonance", value: "resonance" },
              { label: "Prosody & intelligibility", value: "intelligibility" },
              { label: "Other (specify)", value: "other" }
            ]
          },

          {
            name: "reflexes_severity",
            label: "Reflexes – severity",
            type: "single-select",
            options: [
              ...IMPAIRMENT_SCALE_OPTIONS,
              { label: "Other (specify)", value: "other" }
            ],
            placeholder: "— Select severity —",
            showIf: { field: "speech_impairments", includes: "reflexes" }
          },
          {
            name: "reflexes_severity_other",
            label: "Specify other severity",
            type: "input",
            showIf: { field: "reflexes_severity", equals: "other" }
          },

          {
            name: "respiratory_severity",
            label: "Respiratory support – severity",
            type: "single-select",
            options: [
              ...IMPAIRMENT_SCALE_OPTIONS,
              { label: "Other (specify)", value: "other" }
            ],
            placeholder: "— Select severity —",
            showIf: { field: "speech_impairments", includes: "respiration" }
          },
          {
            name: "respiratory_severity_other",
            label: "Specify other severity",
            type: "input",
            showIf: { field: "respiratory_severity", equals: "other" }
          },

          {
            name: "phonatory_severity",
            label: "Phonatory function – severity",
            type: "single-select",
            options: [
              ...IMPAIRMENT_SCALE_OPTIONS,
              { label: "Other (specify)", value: "other" }
            ],
            placeholder: "— Select severity —",
            showIf: { field: "speech_impairments", includes: "phonatory" }
          },
          {
            name: "phonatory_severity_other",
            label: "Specify other severity",
            type: "input",
            showIf: { field: "phonatory_severity", equals: "other" }
          },

          {
            name: "articulation_severity",
            label: "Articulation: Lips / Tongue – severity",
            type: "single-select",
            options: [
              ...IMPAIRMENT_SCALE_OPTIONS,
              { label: "Other (specify)", value: "other" }
            ],
            placeholder: "— Select severity —",
            showIf: { field: "speech_impairments", includes: "articulation" }
          },
          {
            name: "articulation_severity_other",
            label: "Specify other severity",
            type: "input",
            showIf: { field: "articulation_severity", equals: "other" }
          },

          {
            name: "resonance_severity",
            label: "Resonance – severity",
            type: "single-select",
            options: [
              ...IMPAIRMENT_SCALE_OPTIONS,
              { label: "Other (specify)", value: "other" }
            ],
            placeholder: "— Select severity —",
            showIf: { field: "speech_impairments", includes: "resonance" }
          },
          {
            name: "resonance_severity_other",
            label: "Specify other severity",
            type: "input",
            showIf: { field: "resonance_severity", equals: "other" }
          },

          {
            name: "prosody_severity",
            label: "Prosody & intelligibility – severity",
            type: "single-select",
            options: [
              ...IMPAIRMENT_SCALE_OPTIONS,
              { label: "Other (specify)", value: "other" }
            ],
            placeholder: "— Select severity —",
            showIf: { field: "speech_impairments", includes: "intelligibility" }
          },
          {
            name: "prosody_severity_other",
            label: "Specify other severity",
            type: "input",
            showIf: { field: "prosody_severity", equals: "other" }
          },

          {
            name: "speech_impairments_other",
            label: "Specify other impairment",
            type: "input",
            showIf: { field: "speech_impairments", includes: "other" }
          },

          {
            name: "intelligibility_rating",
            label: "Intelligibility rating",
            type: "radio",
            labelAbove: true,
            options: INTELLIGIBILITY_OPTIONS,
            showIf: { field: "speech_functions", equals: "speech" }
          }
        ]
      }
    ]
  };

  /* ================= SCHEMA_ASSESSMENT ================= */
  const SCHEMA_ASSESSMENT = {
    sections: [
      {
        title: "Communication Assessment",
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
            type: "checkbox-group",
            showIf: { field: "speech_language_status", equals: "impaired" },
            options: [
              { label: "Aphasia", value: "aphasia" },
              { label: "Dysarthria", value: "dysarthria" },
              { label: "Apraxia of Speech", value: "apraxia" },
              { label: "Cognitive-Communication Disorder", value: "cognitive_comm" },
              { label: "Other and unspecified speech disturbances", value: "other_speech" },
              { label: "Stuttering / stammering", value: "stuttering" },
              { label: "Cluttering", value: "cluttering" }
            ]
          },

          // --- Aphasia ---
          {
            name: "aphasia_type",
            label: "Aphasia type",
            type: "checkbox-group",
            options: [
              { label: "Broca's", value: "brocas" },
              { label: "Wernicke's", value: "wernickes" },
              { label: "Global", value: "global" },
              { label: "Anomic", value: "anomic" },
              { label: "Other", value: "other" }
            ],
            showIf: { field: "speech_language_diagnoses", includes: "aphasia" }
          },
          {
            name: "aphasia_other",
            label: "Other aphasia type",
            type: "input",
            showIf: { field: "aphasia_type", includes: "other" }
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
            showIf: { field: "speech_language_diagnoses", includes: "aphasia" }
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
            showIf: { field: "speech_language_diagnoses", includes: "dysarthria" }
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
            showIf: { field: "speech_language_diagnoses", includes: "cognitive_comm" }
          },

          // --- Other speech disturbances ---
          {
            name: "other_speech_details",
            label: "Please specify",
            type: "input",
            showIf: { field: "speech_language_diagnoses", includes: "other_speech" }
          }
        ]
      }
    ]
  };

  /* ================= SCHEMA_PLAN ================= */
  const SCHEMA_PLAN = {
    sections: [
      {
        title: "Plan",
        fields: [
          { type: "subheading", label: "Communication Plan" },
          {
            name: "speech_exercises",
            label: "Speech exercises",
            type: "textarea"
          },
          {
            name: "Other management",
            label: "Other management",
            type: "radio",
            options: [
              { label: "Referral for medical management", value: "Referral for medical management" },
              { label: "Further Assessment", value: "Further Assessment" }
            ]
          }
        ]
      }
    ]
  };

  /* ================= SCHEMA_SUBJECTIVE ================= */
  const SCHEMA_SUBJECTIVE = {
    sections: [
      {
        title: "Voice Assessment",
        fields: [
          { type: "subheading", label: "Medical history (related to voice)" },
          { name: "reflux", label: "Reflux", type: "radio", options: YES_NO_OPTIONS },
          { name: "throat_surgery", label: "Throat surgery", type: "radio", options: YES_NO_OPTIONS },
          { name: "vf_pathology", label: "Known VF pathology", type: "radio", options: YES_NO_OPTIONS },
          { name: "current_medication", label: "Current medication", type: "textarea" },

          { type: "subheading", label: "Voice History" },
          {
            type: "row",
            fields: [
              { name: "onset", label: "Onset", type: "radio", options: ["Gradual", "Sudden"] },
              { name: "onset_duration", label: "Date or duration", type: "date" }
            ]
          },
          { name: "progression", label: "Progression", type: "radio", options: ["Better", "Worse", "No change"] },
          { name: "vocal_misuse", label: "Vocal misuse/abuse behaviours", type: "checkbox-group", options: MISUSE_OPTIONS },
          { name: "vocal_demand", label: "Vocal Demand Level", type: "radio", options: ["Low", "Moderate", "High", "Elite Voice User"] },
          { name: "talking_hours", label: "Hours of talking per day", type: "radio", options: ["<1", "1-3", "3-5", ">5"] },

          { type: "subheading", label: "Lifestyle / Dietary Habits" },
          { name: "water_intake", label: "Daily water intake", type: "radio", options: ["<0.5L", "0.5-1.0L", "1-1.5L", "1.5-2.0L", ">2.0L"] },
          { name: "smoking", label: "Smoking", type: "radio", options: YES_NO_OPTIONS },
          { name: "smoking_packs", label: "Packs/day", type: "input", showIf: { field: "smoking", equals: "YES" } },
          { name: "vaping", label: "Vaping exposure", type: "radio", options: YES_NO_OPTIONS },
          { name: "second_hand_smoke", label: "Second-hand smoke exposure", type: "radio", options: YES_NO_OPTIONS },
          { name: "hydration_habits", label: "Hydration habits", type: "checkbox-group", options: HYDRATION_OPTIONS },
          { name: "diet_intake", label: "Diet intake", type: "textarea" },
          { name: "alcohol", label: "Alcohol", type: "radio", options: ["Never", "Occasionally", "Daily"] },
          { name: "caffeine", label: "Caffeine", type: "radio", options: ["None", "1-2 cups/day", ">2 cups/day"] },
          { name: "spicy_food", label: "Spicy food", type: "radio", options: ["Rare", "Regular"] },
          { name: "dairy", label: "Dairy", type: "radio", options: ["Rare", "Regular"] },
          { name: "acidic_food", label: "Acidic foods (citrus)", type: "radio", options: ["Rare", "Regular"] },
          { name: "late_eating", label: "Eating late at night", type: "radio", options: YES_NO_OPTIONS },

          { type: "subheading", label: "Associated Symptoms" },
          { name: "globus", label: "Globus sensation", type: "radio", options: YES_NO_OPTIONS },
          { name: "throat_dryness", label: "Throat dryness", type: "radio", options: YES_NO_OPTIONS },
          { name: "throat_tightness", label: "Throat tension / tightness", type: "radio", options: YES_NO_OPTIONS },
          { name: "pain_talking", label: "Pain when talking", type: "radio", options: YES_NO_OPTIONS },
          { name: "vocal_fatigue", label: "Vocal fatigue / endurance issues", type: "radio", options: YES_NO_OPTIONS },
          { name: "dysphagia_liquids", label: "Dysphagia or coughing with liquids", type: "radio", options: YES_NO_OPTIONS },
          { name: "breathlessness_talking", label: "Feeling out of breath when talking", type: "radio", options: YES_NO_OPTIONS },
          { name: "other_symptoms", label: "Other(s)", type: "textarea" },

          { type: "subheading", label: "Musculoskeletal symptoms" },
          { name: "jaw_tension", label: "Jaw tension / teeth clenching", type: "radio", options: YES_NO_OPTIONS },
          { name: "neck_shoulder_tension", label: "Neck/shoulder tension", type: "radio", options: YES_NO_OPTIONS }
        ]
      }
    ]
  };

  const SCHEMA_MAP = {
    subjective: SCHEMA_SUBJECTIVE,
    objective: SCHEMA_OBJECTIVE,
    assessment: SCHEMA_ASSESSMENT,
    plan: SCHEMA_PLAN
  };

  return (
    <div style={{ padding: 20 }}>
      <CommonFormBuilder
        schema={SCHEMA_MAP[mode] ?? { sections: [] }}
        values={values}
        layout="nested"
        onChange={handleChange}
        onAction={handleAction}
      />
    </div>
  );
}
