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

const TRACHE_OPTIONAL_SECTIONS = {
  subjective: ["Chief Complaint"],
  objective: [
    "General Observation",
    "Suction needs (airway clearance function)",
    "Tracheostomy Status",
    "Baseline Vitals & Humidification",
    "Tracheostomy Weaning Evaluation",
    "Clinical Observations",
    "Tracheostomy Weaning Progress Scale (TWPS)",
    "Tracheostomy Weaning – Plan",
    "Oral Care",
    "Therapy"
  ]
};

export default function TracheostomyWeaningEvaluation({ patient, onBack, mode = "initial" }) {
  const isFollowup = mode === "followup";
  const [values, setValues] = useState({});
  const [commonValues, setCommonValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  const TRACHEOSTOMY_WEANING_SCHEMA = {
    title: "Tracheostomy Weaning Evaluation",
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
            options: ["Unaccompanied", "Accompanied by caregiver"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "consent",
            label: "Consent (Verbal)",
            type: "textarea",

          },

          { type: "subheading", label: "Chief Complaint" },

{
  name: "presenting_complaints",
  label: "Patient/family reported",
  type: "multi-select-dropdown",
  options: [
    "Poor secretion management",
    "Absent or weak voice",
    "Difficulty tolerating cuff deflation or speaking valve",
    "Unable to wean / decannulate",
    "Increased coughing during oral intake",
    "Other(s)"
  ].map(v => ({ label: v, value: v }))
},

{
  name: "presenting_complaints_other",
  label: "Other – please specify",
  type: "textarea",
  showIf: {
    field: "presenting_complaints",
    includes: "Others"
  }
},

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
      name: "arousal",
      label: "Arousal level",
      type: "single-select",
      options: ["Alert", "Fleeting alertness", "Drowsy"]
        .map(v => ({ label: v, value: v }))
    },
    {
      name: "sitting",
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


          { type: "subheading", label: "Suction needs (airway clearance function)" },

          {
            name: "suction_frequency",
            label: "Frequency",
            type: "input"
          },

          {
            name: "secretion_amount",
            label: "Secretion amount",
            type: "single-select",
            options: ["Small", "Moderate"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "secretion_colour",
            label: "Colour",
            type: "single-select",
            options: ["Whitish", "Yellowish", "Greenish", "Blood-tinged"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "secretion_consistency",
            label: "Consistency",
            type: "single-select",
            options: ["Thick", "Loose"]
              .map(v => ({ label: v, value: v }))
          },

          { type: "subheading", label: "Tracheostomy Status" },

          { name: "trach_date", label: "Date of tracheostomy insertion", type: "input" },
          { name: "trach_reason", label: "Reason for insertion", type: "textarea" },

          {
            name: "tube_size",
            label: "Tube size (mm)",
            type: "single-select",
            options: ["5.0", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "tube_type",
            label: "Tube type",
            type: "single-select",
            options: ["Fenestrated", "Non-fenestrated"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "tube_lumen",
            label: "Lumen",
            type: "single-select",
            options: ["Single-lumen", "Double-lumen"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "tube_brand",
            label: "Brand",
            type: "single-select",
            options: ["Portex", "Rusch", "Shiley"]
              .map(v => ({ label: v, value: v }))
          },

          { name: "tube_other", label: "Other", type: "textarea" },

          {
            name: "cuff_status",
            label: "Cuff status",
            type: "single-select",
            options: ["Inflated", "Deflated", "Cuffless"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "inner_cannula",
            label: "Inner cannula",
            type: "single-select",
            options: ["Present", "Absent"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "inner_cannula_type",
            label: "If present",
            type: "single-select",
            showIf: { field: "inner_cannula", equals: "Present" },
            options: ["Fenestrated", "Non-fenestrated"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "ventilation",
            label: "Ventilation",
            type: "single-select",
            options: ["On room air", "O2 via trache mask", "O2 via Swedish nose"]
              .map(v => ({ label: v, value: v }))
          },

          { name: "flow_rate", label: "Flow rate (L of O2)", type: "input" },

          {
            name: "humidification",
            label: "Humidification method",
            type: "single-select",
            options: ["Heat and Moisture Exchanger (HME)", "Nebuliser", "Heated humidifier", "None"]
              .map(v => ({ label: v, value: v }))
          },
          { type: "subheading", label: "Baseline Vitals & Humidification" },

          {
            name: "humidificationMethod",
            label: "Humidification method",
            type: "single-select",
            options: [
              "Heat and Moisture Exchanger (HME)",
              "Nebuliser",
              "Heated humidifier",
              "None"
            ].map(v => ({ label: v, value: v }))
          },

          {
            type: "row",
            fields: [
              { name: "baseline_SpO₂ (Oxygen Saturation)", label: "SPO2 (%)", type: "input" },
              { name: "baseline_rr", label: "RR (bpm)", type: "input" }
            ]
          },
          {
            type: "row",
            fields: [
              { name: "baseline_hr", label: "HR (breaths/min)", type: "input" },
              {
                name: "pre_eval_suction", label: "Pre-evaluation suction", type: "single-select",
                options: ["Done", "Not required"].map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "secretion_amount",
                label: "Secretion amount",
                type: "single-select",
                options: ["Small", "Moderate"].map(v => ({ label: v, value: v }))
              },
              {
                name: "secretion_colour",
                label: "Colour",
                type: "single-select",
                options: ["Whitish", "Yellowish", "Greenish", "Blood-tinged"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },
          {
            name: "secretion_consistency",
            label: "Consistency",
            type: "single-select",
            options: ["Thick", "Loose"].map(v => ({ label: v, value: v }))
          },
          { type: "subheading", label: "Tracheostomy Weaning Evaluation" },

          {
            name: "cuffTrial",
            label: "Cuff deflation trial ",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },

          {
            type: "row",
            showIf: { field: "cuffTrial", equals: "yes" },
            fields: [
              {
                name: "cuff_deflation",
                label: "Deflation",
                type: "single-select",
                options: ["Partial", "Complete"].map(v => ({ label: v, value: v }))
              },
              {
                name: "cuff_tolerated",
                label: "Tolerated",
                type: "single-select",
                options: ["Yes", "No"].map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            showIf: { field: "cuffTrial", equals: "yes" },
            fields: [
              { name: "cuff_spo2", label: "SPO2 (%)", type: "input" },
              { name: "cuff_rr", label: "RR (bpm)", type: "input" }
            ]
          },
          {
            name: "cuff_hr",
            label: "HR (breaths/min)",
            type: "input",
            showIf: { field: "cuffTrial", equals: "yes" }
          },
          {
            name: "speakingValveTrial",
            label: "Speaking valve trial",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },

          {
            showIf: { field: "speakingValveTrial", equals: "yes" },
            type: "row",
            fields: [
              { name: "sv_duration", label: "Duration tolerated (minutes)", type: "input" },
              {
                name: "sv_voice_quality",
                label: "Voice quality",
                type: "single-select",
                options: ["Clear", "Wet", "Breathy", "Strained", "Absent"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            showIf: { field: "speakingValveTrial", equals: "yes" },
            type: "row",
            fields: [
              {
                name: "sv_wob",
                label: "Work of breathing",
                type: "single-select",
                options: ["Normal", "Increased"].map(v => ({ label: v, value: v }))
              },
              { name: "sv_spo2", label: "SPO2 (%)", type: "input" }
            ]
          },
          {
  type: "row",
  fields: [
        { name: "hr", type: "input", label: "HR (Heart Rate):", placeholder: "" },

    { name: "rr", type: "input", label: "RR (Respiratory Rate)", placeholder: "breaths/min" },
    
   
  ]
},
          {
            name: "digitalOcclusionTrial",
            label: "Digital Occlusion trial ",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },

          {
            type: "row",
            showIf: { field: "digitalOcclusionTrial", equals: "yes" },
            fields: [
              {
                name: "do_duration",
                label: "Duration tolerated (minutes)",
                type: "input"
              },
              {
                name: "do_voice_quality",
                label: "Voice quality",
                type: "single-select",
                options: ["Clear", "Wet", "Breathy", "Strained", "Absent"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            showIf: { field: "digitalOcclusionTrial", equals: "yes" },
            fields: [
              {
                name: "do_wob",
                label: "Work of breathing",
                type: "single-select",
                options: ["Normal", "Increased"].map(v => ({ label: v, value: v }))
              },
              { name: "do_spo2", label: "SPO2 (%)", type: "input" }
            ]
          },

          {
            type: "row",
            showIf: { field: "digitalOcclusionTrial", equals: "yes" },
            fields: [
              { name: "do_rr", label: "RR (bpm)", type: "input" },
              { name: "do_hr", label: "HR (breaths/min)", type: "input" }
            ]
          },
          {
            name: "cappingTrial",
            label: "Capping trial ",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },

          {
            type: "row",
            showIf: { field: "cappingTrial", equals: "yes" },
            fields: [
              {
                name: "cap_duration",
                label: "Duration tolerated (minutes)",
                type: "input"
              },
              {
                name: "cap_voice_quality",
                label: "Voice quality",
                type: "single-select",
                options: ["Clear", "Wet", "Breathy", "Strained", "Absent"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            showIf: { field: "cappingTrial", equals: "yes" },
            fields: [
              {
                name: "cap_wob",
                label: "Work of breathing",
                type: "single-select",
                options: ["Normal", "Increased"].map(v => ({ label: v, value: v }))
              },
              { name: "cap_spo2", label: "SPO2 (%)", type: "input" }
            ]
          },

          {
            type: "row",
            showIf: { field: "cappingTrial", equals: "yes" },
            fields: [
              { name: "cap_rr", label: "RR (bpm)", type: "input" },
              { name: "cap_hr", label: "HR (breaths/min)", type: "input" }
            ]
          },
{
  type: "subheading",
  label: "Clinical Observations"
},

{
  name: "clinicalObservations",
  label: "",
  type: "multi-select-dropdown",
  options: [
    "Stable SpO₂ ≥ 95% on room air",
    "Stable RR & HR during capping or speaking valve trial",
    "Adequate cough reflex and secretion clearance",
    "Phonation achieved with speaking valve",
    "No significant desaturation (>3% drop) or respiratory distress"
  ].map(v => ({ label: v, value: v }))
}

        ]
      },

      /* ======================================================
         A – ANALYSIS / ASSESSMENT
      ====================================================== */
      {
        title: "Assessment",
        fields: [

{
  name: "noDifficulties",
  label: "No difficulties observed during tracheostomy weaning. The patient is a suitable candidate to proceed with the tracheostomy weaning programme.",
  type: "checkbox-group",
  options: [{ label: "No difficulties observed during tracheostomy weaning. The patient is a suitable candidate to proceed with the tracheostomy weaning programme.", value: "no_difficulties" }]
},

{
  name: "patientPresents",
  label: "The patient presents with poor tolerance to tracheostomy capping and currently requires full tracheostomy dependence.",
  type: "checkbox-group",
  options: [{ label: "The patient presents with poor tolerance to tracheostomy capping and currently requires full tracheostomy dependence.", value: "patient_presents" }]
},

          {
            name: "associated_conditions",
            label: "The patient also exhibits",
            type: "multi-select-dropdown",
            options: [
              "Dysphonia",
              "Dysphagia"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "clinical_interpretation",
            label: "Clinical Interpretation",
            type: "multi-select-dropdown",
            options: [
              "Poor tolerance of cuff deflation",
              "Inadequate airway patency during capping",
              "Poor secretion management",
              "Reduced cough strength",
              "Reduced laryngeal / velopharyngeal competence",
              "Suspected upper airway obstruction",
              "Anxiety or reduced cooperation limiting weaning",
              "Suitable candidate for capping trials / decannulation",
              "Other(s)"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "candidate_for_weaning",
            label: "Candidate for tracheostomy weaning",
            type: "single-select",
            options: ["Yes", "No", "Requires further evaluation (FEES / VFSS)"]
              .map(v => ({ label: v, value: v }))
          },

          { type: "subheading", label: "Tracheostomy Weaning Progress Scale (TWPS)" },

          {
            name: "twps",
            label: "Tracheostomy Weaning Progress Scale  (TWPS) level",
            type: "single-select",
            options: [
              "0 – Fully ventilator-dependent",
              "1 – Cuff deflation tolerated briefly",
              "2 – Speaking valve tolerated <30 mins",
              "3 – Capping tolerated >30 mins",
              "4 – Independent breathing with capped tube",
              "5 – Decannulated successfully"
            ].map(v => ({ label: v, value: v }))
          }
        ]
      },

      /* ======================================================
         P – PLAN
      ====================================================== */
      {
        title: "Plan",
        fields: [
         { type: "subheading", label: "Tracheostomy Weaning – Plan" },

{
  name: "capping_duration",
  label: "Suggested capping duration (hours)",
  type: "input",
  placeholder: "free text"
},

{
  name: "capping_frequency",
  label: "Frequency (times/day)",
  type: "input",
  placeholder: "free text"
},

{
  name: "monitoring_notes",
  label: "Monitoring (SpO₂, HR, work of breathing)",
  type: "textarea"
},

/* ================= ORAL CARE ================= */

{ type: "subheading", label: "Oral Care" },

{
  name: "oral_care_method",
  label: "Method",
  type: "multi-select-dropdown",
  options: [
    "Brush teeth",
    "Gauze stick",
    "Gargle"
  ].map(v => ({ label: v, value: v }))
},

{
  name: "oral_care_frequency",
  label: "Frequency",
  type: "single-select",
  options: [
    "3–4 times/day",
    "Before meals",
    "After meals",
    "Oral trials"
  ].map(v => ({ label: v, value: v }))
},

/* ================= THERAPY ================= */

{ type: "subheading", label: "Therapy" },

{
  name: "therapy_plan",
  type: "multi-select-dropdown",
  options: [
    "Observation of breathing functions",
    "Voice facilitation intervention",
    "Assessment of swallowing",
    "Training about swallowing / airway clearance",
    " Advising about swallowing / airway management"
  ].map(v => ({ label: v, value: v }))
},

/* ================= OTHER MANAGEMENT ================= */


{
  name: "referral_specialist",
  label: "Others",
  type: "textarea",
  
}



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
    } catch (e) {}
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
        } catch (e) {}
        return next;
      });
    }
  };

  const normalizedSchema = {
    ...TRACHEOSTOMY_WEANING_SCHEMA,
    sections: (TRACHEOSTOMY_WEANING_SCHEMA.sections || []).map(section => ({
      ...section,
      fields: flattenRadioRows((section.fields || []).map(normalizeFieldTypes))
    }))
  };

  const commonSectionFieldsBase = [
    { name: "patient_seen", label: "Patient was seen", type: "radio", options: ["Unaccompanied", "Accompanied by caregiver"].map(v => ({ label: v, value: v })) },
    { name: "consent", label: "Consent (Verbal)", type: "textarea" },
    { type: "subheading", label: "General Observation" },
    { name: "arousal_level", label: "Arousal level", type: "radio", options: ["Alert", "Fleeting alertness", "Drowsy"].map(v => ({ label: v, value: v })) },
    { name: "sitting_in", label: "Sitting in", type: "radio", options: ["Chair", "Wheelchair", "Bed"].map(v => ({ label: v, value: v })) },
    { name: "position", label: "Position", type: "radio", options: ["Upright (90 degrees)", "Slightly reclined", "60 degrees", "45 degrees"].map(v => ({ label: v, value: v })) },
    { name: "oral_hygiene", label: "Oral hygiene", type: "radio", options: ["Poor", "Fair", "Good"].map(v => ({ label: v, value: v })) },
    { name: "spo2", label: "SpO₂ (Oxygen Saturation)", type: "input" },
    { name: "hr", label: "HR (Heart Rate)", type: "input" },
    { name: "rr", label: "RR (Respiratory Rate)", type: "input" }
  ];

  const commonSectionFields = useMemo(() => {
    if (!isFollowup) return commonSectionFieldsBase;
    return withOptionalSections(commonSectionFieldsBase, ["General Observation"]);
  }, [isFollowup]);

  const stripFromSection = (section) => ({
    ...section,
    fields: (section.fields || []).filter(f => !ADULT_COMMON_FIELD_NAMES.includes(f?.name))
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
      subjective: base.subjective ? applyOpt(base.subjective, TRACHE_OPTIONAL_SECTIONS.subjective) : null,
      objective: base.objective ? applyOpt(base.objective, TRACHE_OPTIONAL_SECTIONS.objective) : null
    };
  }, [isFollowup]);
  const tabOrder = ["subjective", "objective", "assessment", "plan"].filter(t => schemaMap[t]);

  const onAction = (type) => {
    if (type === "back") onBack?.();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Adult Tracheostomy Weaning", values);
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
