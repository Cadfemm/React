import React, { useEffect, useMemo, useState } from "react";
import CommonFormBuilder, { withOptionalSections } from "../CommonComponenets/FormBuilder";

const ADULT_COMMON_STORAGE_VERSION = "v1";
const ADULT_COMMON_STORAGE_KEY_PREFIX = "patient_adult_common_fields";
const ADULT_COMMON_ALIAS_GROUPS = [
  ["sitting", "sitting_in"],
  ["arousal", "arousal_level"],
  ["SpO₂ (Oxygen Saturation)", "spo2"]
];
const ADULT_COMMON_FIELD_NAMES = [
  "patient_seen",
  "consent",
  "arousal",
  "arousal_level",
  "sitting",
  "sitting_in",
  "position",
  "oral_hygiene",
  "SpO₂ (Oxygen Saturation)",
  "spo2",
  "hr",
  "rr"
];

function getAdultCommonPatch(name, value) {
  const patch = { [name]: value };
  for (const [left, right] of ADULT_COMMON_ALIAS_GROUPS) {
    if (name === left) patch[right] = value;
    if (name === right) patch[left] = value;
  }
  return patch;
}

function normalizeFieldTypes(field) {
  if (!field || typeof field !== "object") return field;
  if (field.type === "single-select") return { ...field, type: "radio" };
  if (field.type === "multi-select-dropdown") return { ...field, type: "checkbox-group" };
  if (field.type === "row" && Array.isArray(field.fields)) {
    return { ...field, fields: field.fields.map(normalizeFieldTypes) };
  }
  return field;
}

function flattenRadioRows(fields) {
  return (fields || []).flatMap(field => {
    if (field?.type === "row" && Array.isArray(field.fields)) {
      const nonPlaceholder = field.fields.filter(
        child => !(child?.type === "subheading" && (!child?.label || child.label === ""))
      );
      const allRadios = nonPlaceholder.length > 0 && nonPlaceholder.every(child => child?.type === "radio");
      if (allRadios) return nonPlaceholder;
    }
    return [field];
  });
}

const ADULT_SPEECH_OPTIONAL_SECTIONS = {
  subjective: ["Chief Complaint"],
  objective: ["General Observation", "Communication Screening", "Oral-motor Structure Observation", "Cranial Nerve Examination", "Referral"]
};

export default function SpeechLanguageAssessment({ patient, onBack, mode = "initial" }) {
  const isFollowup = mode === "followup";
  const [values, setValues] = useState({});
  const [commonValues, setCommonValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

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

          { type: "subheading", label: "Chief Complaint" },

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

          { name: "rr", type: "input", label: "RR (Respiratory Rate)", placeholder: "breaths/min" },

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
            name: "otherLanguages",
            label: "Other language(s)",
            type: "input"
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
            name: "lips",
            label: "Lips",
            type: "single-select",
            options: ["No Abnormality Detected (NAD)", "Reduced seal", "Asymmetry", "Cleft", "Scarring"]
              .map(v => ({ label: v, value: v }))
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
            name: "cn12_motor",
            label: "CN XII: Motor (Tongue ROM/strength)",
            type: "single-select",
            options: ["Within Normal Limits (WNL)", "Reduced"].map(v => ({ label: v, value: v }))
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
        title: "Assessment",
        fields: [

          {
            name: "noSpeechLanguageImpairment",
            label: "No speech and language impairment observed",
            type: "checkbox-group",
            options: [{ label: "No speech and language impairment observed", value: "no_impairment" }]
          },

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
          { type: "subheading", label: "Referral" },

          {
            name: "referral_specialist",
            label: "Specialist:",
            type: "textarea",
            placeholder: "Free text"
          },

          {
            name: "Others",
            label: "Others",
            type: "textarea"
          },
        ]
      }
    ]
  };
  const patientId = patient?.id ?? patient?.patientId ?? null;
  const commonStorageKey = patientId
    ? `${ADULT_COMMON_STORAGE_KEY_PREFIX}_${patientId}_${ADULT_COMMON_STORAGE_VERSION}`
    : null;

  useEffect(() => {
    if (!commonStorageKey) return;
    try {
      const stored = JSON.parse(localStorage.getItem(commonStorageKey) || "{}");
      if (stored && typeof stored === "object") {
        setCommonValues(stored);
        setValues(prev => ({ ...prev, ...stored }));
      }
    } catch (e) { }
  }, [commonStorageKey]);

  const onChange = (name, value) => {
    const commonPatch = ADULT_COMMON_FIELD_NAMES.includes(name)
      ? getAdultCommonPatch(name, value)
      : null;
    setValues(v => ({ ...v, ...(commonPatch || { [name]: value }) }));
    if (commonPatch && commonStorageKey) {
      setCommonValues(prev => {
        const next = { ...(prev || {}), ...commonPatch };
        try {
          localStorage.setItem(commonStorageKey, JSON.stringify(next));
        } catch (e) { }
        return next;
      });
    }
  };

  const normalizedSchema = {
    ...SPEECH_LANGUAGE_SCHEMA,
    sections: (SPEECH_LANGUAGE_SCHEMA.sections || []).map(section => ({
      ...section,
      fields: flattenRadioRows((section.fields || []).map(normalizeFieldTypes))
    }))
  };

  const commonSectionFieldsBase = [
    {
      name: "patient_seen",
      label: "Patient was seen",
      type: "radio",
      options: [
        { label: "Unaccompanied", value: "Unaccompanied" },
        { label: "Accompanied by caregiver", value: "Accompanied by caregiver" }
      ]
    },
    { name: "consent", label: "Consent (Verbal)", type: "textarea" },
    { type: "subheading", label: "General Observation" },
    {
      name: "arousal_level",
      label: "Arousal level",
      type: "radio",
      options: ["Alert", "Fleeting alertness", "Drowsy"].map(v => ({ label: v, value: v }))
    },
    {
      name: "sitting_in",
      label: "Sitting in",
      type: "radio",
      options: ["Chair", "Wheelchair", "Bed"].map(v => ({ label: v, value: v }))
    },
    {
      name: "position",
      label: "Position",
      type: "radio",
      options: ["Upright (90 degrees)", "Slightly reclined", "60 degrees", "45 degrees"].map(v => ({ label: v, value: v }))
    },
    {
      name: "oral_hygiene",
      label: "Oral hygiene",
      type: "radio",
      options: ["Poor", "Fair", "Good"].map(v => ({ label: v, value: v }))
    },
    { name: "spo2", label: "SpO₂ (Oxygen Saturation)", type: "input" },
    { name: "hr", label: "HR (Heart Rate)", type: "input" },
    { name: "rr", label: "RR (Respiratory Rate)", type: "input" }
  ];

  const commonSectionFields =  commonSectionFieldsBase;

  const stripFromSection = (section) => ({
    ...section,
    fields: (section.fields || []).flatMap(f => {
      if (f?.type === "subheading" && f?.label === "General Observation") return [];
      if (ADULT_COMMON_FIELD_NAMES.includes(f?.name)) return [];
      if (f?.type === "row" && Array.isArray(f.fields)) {
        const kept = f.fields.filter(child => !ADULT_COMMON_FIELD_NAMES.includes(child?.name));
        if (kept.length === 0) return [];
        if (kept.length === f.fields.length) return [f];
        return [{ ...f, fields: kept }];
      }
      return [f];
    })
  });

  const sectionByTitle = Object.fromEntries(
    (normalizedSchema.sections || [])
      .filter(s => typeof s?.title === "string")
      .map(s => [s.title.toLowerCase(), s])
  );
  const schemaMap = useMemo(() => {
    const base = {
      subjective: sectionByTitle.subjective ? { title: "", sections: [stripFromSection(sectionByTitle.subjective)] } : null,
      objective: sectionByTitle.objective ? { title: "", sections: [stripFromSection(sectionByTitle.objective)] } : null,
      assessment: sectionByTitle.assessment ? { title: "", sections: [stripFromSection(sectionByTitle.assessment)] } : null,
      plan: sectionByTitle.plan ? { title: "", sections: [stripFromSection(sectionByTitle.plan)] } : null
    };
    if (!isFollowup) return base;
    const applyOpt = (schema, labels) => {
      if (!schema || !labels?.length) return schema;
      return { ...schema, sections: (schema.sections || []).map(sec => ({ ...sec, fields: withOptionalSections(sec.fields || [], labels) })) };
    };
    return {
      ...base,
      subjective: base.subjective ? applyOpt(base.subjective, ADULT_SPEECH_OPTIONAL_SECTIONS.subjective) : null,
      objective: base.objective ? applyOpt(base.objective, ADULT_SPEECH_OPTIONAL_SECTIONS.objective) : null
    };
  }, [isFollowup]);
  const tabOrder = ["subjective", "objective", "assessment", "plan"].filter(t => schemaMap[t]);

  const onAction = (type) => {
    if (type === "back") onBack?.();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Adult Speech & Language", values);
  };
  const NEURO_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: [

    ]
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const today = new Date();

  const calculateDuration = (onset) => {
    if (!onset) return "-";
    const onsetDate = new Date(onset);
    const diffMs = today - onsetDate;

    if (diffMs < 0) return "-";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
  };
  const section = {
    marginBottom: 24
  };

  const patientGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
    fontSize: 14
  };


  function NeuroPatientInfo({ patient }) {
    if (!patient) return null;

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
  return (
    <div>
      <CommonFormBuilder
        schema={NEURO_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => { }}
      >
        <NeuroPatientInfo patient={patient} />
      </CommonFormBuilder>
      <CommonFormBuilder
        schema={{ title: "", sections: [{ title: "", fields: commonSectionFields }] }}
        values={commonValues}
        onChange={onChange}
        submitted={submitted}
        onAction={onAction}
      />
      <div style={tabBar} role="tablist">
        {tabOrder.map(tab => (
          <div
            key={tab}
            role="tab"
            tabIndex={0}
            style={activeTab === tab ? tabActive : tabBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab(tab);
            }}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>
      <CommonFormBuilder
        schema={schemaMap[activeTab] || schemaMap[tabOrder[0]]}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={onAction}
      />
      <div style={submitRow}>
        {activeTab !== tabOrder[tabOrder.length - 1] ? (
          <button style={submitBtn} onClick={() => setActiveTab(tabOrder[tabOrder.indexOf(activeTab) + 1])}>Next</button>
        ) : (
          <button style={submitBtn} onClick={handleSubmit}>Submit Assessment</button>
        )}
      </div>
    </div>
  );
}

const tabBar = { display: "flex", gap: 12, justifyContent: "center", borderBottom: "1px solid #ddd", marginBottom: 12 };
const tabBtn = { padding: "10px 22px", fontWeight: 600, cursor: "pointer" };
const tabActive = { ...tabBtn, borderBottom: "3px solid #2563EB", color: "#2563EB" };
const submitRow = { display: "flex", justifyContent: "flex-end", marginTop: 20 };
const submitBtn = { padding: "12px 32px", background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600 };
