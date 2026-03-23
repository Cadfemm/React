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

const CSE_OPTIONAL_SECTIONS = {
  subjective: ["Chief Complaint", "Current Diet Intake", "Oral", "Enteral feeding"],
  objective: [
    "General Observation",
    "Oral-motor Structure Observation",
    "Cranial Nerve Examination",
    "Clinical Swallowing Evaluation (CSE)",
    "Oral Phase Observations",
    "Pharyngeal Phase Observations",
    "Functional Oral Intake Scale (FOIS)",
    "Swallowing Recommendations",
    "Safe Swallowing Strategies",
    "Monitoring During Oral Intake",
    "Oral Care",
    "Therapy",
    "Other Management"
  ]
};

export default function ClinicalSwallowingEvaluation({ patient, onBack, mode = "initial" }) {
  const isFollowup = mode === "followup";
  const [values, setValues] = useState({});
  const [commonValues, setCommonValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");
  const CSE_SCHEMA = {
    title: "Clinical Swallowing Evaluation (CSE)",

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
  label: "Patient/family reported",
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

{
  name: "presenting_complaints_other",
  label: "Other (please specify)",
  type: "textarea",
  showIf: {
    field: "presenting_complaints",
    includes: "Other(s)"
  }
},


   { type: "subheading", label: "Current Diet Intake" },

{
  name: "dietMode",
  label: "Current intake type",
  type: "checkbox-group",
  options: ["Oral", "Enteral"].map(v => ({ label: v, value: v }))
},

/* ================= ORAL ================= */

{
  type: "subheading",
  label: "Oral",
  showIf: {
    field: "dietMode",
    includes: "Oral"
  }
},

{
  type: "row",
  showIf: {
    field: "dietMode",
    includes: "Oral"
  },
  fields: [
    {
      name: "oral_food_consistency",
      label: "Food consistency",
      type: "single-select",
      options: [
                "Level 3 – Moderately thick",
        "Level 4 – Extremely thick",
        "Level 5 – Minced & moist",
        "Level 6 – Soft & bite-sized",
        "Level 7 EC – Regular Easy to chew",
        "Level 7 – Regular"
      ].map(v => ({ label: v, value: v }))
    },
    {
      name: "oral_fluid_consistency",
      label: "Fluids consistency",
      type: "single-select",
      options: [
        "Level 0 – Thin",
        "Level 1 – Slightly thick",
        "Level 2 – Mildly thick",
        "Level 3 – Moderately thick",
        "Level 4 – Extremely thick"
      ].map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  showIf: {
    field: "dietMode",
    includes: "Oral"
  },
  fields: [
    {
      name: "oral_amount",
      label: "Amount",
      type: "single-select",
      options: ["Half portion", "Full portion"].map(v => ({ label: v, value: v }))
    },
  ]
},
{
  name: "oral_frequency",
  type: "textarea",
  label: "Frequency(times/day)",
  placeholder: "times/day"
},

/* ================= ENTERAL ================= */

{
  type: "subheading",
  label: "Enteral feeding",
  showIf: {
    field: "dietMode",
    includes: "Enteral"
  }
},

{
  name: "enteral_type",
  label: "Type",
  type: "single-select",
  options: [
    "Orogastric Tube (OGT)",
    "Nasogastric Tube (NGT)",
    "Nasojejunal Tube (NJT)",
    "Gastrostomy Tube (G-tube)",
    "Jejunostomy Tube (J-tube)"
  ].map(v => ({ label: v, value: v })),
  showIf: {
    field: "dietMode",
    includes: "Enteral"
  }
},

{
  name: "enteral_regimen",
  label: "Regimen",
  type: "textarea",
  showIf: {
    field: "dietMode",
    includes: "Enteral"
  }
},

{
  name: "enteral_other",
  label: "Other(s)",
  type: "textarea",
  showIf: {
    field: "dietMode",
    includes: "Enteral"
  }
},

{
  name: "enteral_schedule",
  label: "Feeding schedule",
  type: "single-select",
  options: ["3-hourly", "4-hourly", "Continuous"]
    .map(v => ({ label: v, value: v })),
  showIf: {
    field: "dietMode",
    includes: "Enteral"
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
    { name: "spo2", type: "input", label: "SpO₂ (Oxygen Saturation):", placeholder: "" },
    { name: "hr", type: "input", label: "HR (Heart Rate)", placeholder: "" }
  ]
},

{
  type: "row",
  fields: [
    { name: "rr", type: "input", label: "RR (Respiratory Rate)", placeholder: "breaths/min" },
    { type: "subheading", label: "" } // empty placeholder to keep 2-column balance
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
    }
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
    },
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


          /* ================= CLINICAL SWALLOWING EVALUATION ================= */

          { type: "subheading", label: "Clinical Swallowing Evaluation (CSE)" },



          /* ---------- Fluids ---------- */

          {
            name: "cseFluids",
            label: "Fluids ",
            type: "multi-select-dropdown",
            options: [
              "Level 0 – Thin",
              "Level 1 – Slightly Thick",
              "Level 2 – Mildly Thick",
              "Level 3 – Moderately Thick"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "cseFluidsNotes",
            type: "multi-notes",
            source: "cseFluids"
          },

          /* ---------- Foods ---------- */

          {
            name: "cseFoods",
            label: "Foods ",
            type: "multi-select-dropdown",
            options: [
              "Level 4 – Extremely Thick / Pureed",
              "Level 5 – Minced & Moist",
              "Level 6 – Soft & Bite-sized",
              "Level 7 EC – Regular Easy to Chew",
              "Level 7 – Regular"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "cseFoodsNotes",
            type: "multi-notes",
            source: "cseFoods"
          },

          /* ---------- Oral Phase Observations ---------- */

      { type: "subheading", label: "Oral Phase Observations" },

{
  type: "row",
  fields: [
    {
      name: "cseLipSeal",
      label: "Lip seal",
      type: "single-select",
      options: [
        { label: "Adequate", value: "adequate" },
        { label: "Left anterior spillage", value: "left_spillage" },
        { label: "Right anterior spillage", value: "right_spillage" }
      ]
    },
    {
      name: "cseMastication",
      label: "Mastication",
      type: "single-select",
      options: [
        { label: "Functional", value: "functional" },
        { label: "Impaired", value: "impaired" }
      ]
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "cseOralResidue",
      label: "Oral residue",
      type: "single-select",
      options: [
        { label: "None", value: "none" },
        { label: "Mild", value: "mild" },
        { label: "Moderate", value: "moderate" },
        { label: "Severe", value: "severe" }
      ]
    },
  
  ]
},


          /* ---------- Pharyngeal Phase Observations ---------- */

          { type: "subheading", label: "Pharyngeal Phase Observations" },

          {
            name: "cseNasalRegurgitation",
            label: "Nasal regurgitation",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },

          {
            name: "cseCough",
            label: "Cough / Throat clear",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },

          {
            name: "cseVoicePost",
            label: "Voice post-swallow",
            type: "single-select",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Wet", value: "wet" },
              { label: "Aphonia", value: "aphonia" }
            ]
          },

          {
            name: "cseCervicalAusc",
            label: "Cervical auscultation",
            type: "single-select",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Reduced", value: "reduced" },
              { label: "Wet / gurgly", value: "wet" },
              { label: "N/A", value: "na" }
            ]
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
  name: "noSwallowingImpairment",
  label: "No swallowing impairment observed",
  type: "checkbox-group",
  options: [{ label: "No swallowing impairment observed", value: "no_impairment" }]
},

{
  name: "dysphagia_characteristics",
  label: "The patient presents with dysphagia",
  type: "multi-select-dropdown",
  options: [
    "Anterior spillage",
    "Slow / ineffective mastication",
    "Oral residue post swallow",
    "Overt signs of aspiration (coughing, wet voice, increased work of breathing)",
    "Suspected silent aspiration (reduced cough response)",
    "Other(s)"
  ].map(v => ({ label: v, value: v }))
},

{
  name: "dysphagia_other",
  label: "Others",
  type: "textarea",
  showIf: {
    field: "dysphagia_characteristics",
    includes: "Other(s)"
  }
},

          { type: "subheading", label: "Functional Oral Intake Scale (FOIS)" },

/* -------- TUBE DEPENDENT (Levels 1–3) -------- */
{
  name: "fois_tube_dependent",
  label: "Tube Dependent (Levels 1–3)",
  type: "single-select",
  options: [
    { label: "Level 1 – No oral intake", value: "1" },
    { label: "Level 2 – Tube dependent with minimal / inconsistent oral intake", value: "2" },
    { label: "Level 3 – Tube dependent with consistent oral intake", value: "3" }
  ]
},

/* -------- TOTAL ORAL INTAKE (Levels 4–7) -------- */
{
  name: "fois_total_oral",
  label: "Total Oral Intake (Levels 4–7)",
  type: "single-select",
  options: [
    { label: "Level 4 – Total oral intake of a single consistency", value: "4" },
    { label: "Level 5 – Total oral intake of multiple consistencies requiring special preparation", value: "5" },
    {
      label:
        "Level 6 – Total oral intake with no special preparation, but must avoid specific foods or liquid items",
      value: "6"
    },
    { label: "Level 7 – Total oral intake with no restrictions", value: "7" }
  ]
},
        ]
      },

      /* ======================================================
         P – PLAN
      ====================================================== */
     {
  title: "P – Plan",
  fields: [

    { type: "subheading", label: "Swallowing Recommendations" },

    {
      type: "row",
      fields: [
        {
          name: "plan_food_iddsi",
          label: "Food – IDDSI level",
          type: "multi-select-dropdown",
          options: [
              "Level 3 – Moderately thick",
        "Level 4 – Extremely thick",
        "Level 5 – Minced & moist",
        "Level 6 – Soft & bite-sized",
        "Level 7 EC – Regular Easy to chew",
        "Level 7 – Regular"
          ].map(v => ({ label: v, value: v }))
        },
        {
          name: "plan_food_amount",
          label: "Amount",
          type: "single-select",
          options: ["Oral-trails","Half portion", "Full portion"].map(v => ({ label: v, value: v }))
        }
      ]
    },

    {
      type: "row",
      fields: [
                {
          name: "plan_oral_frequency",
          label: "Frequency (times/day)",
          type: "input",
          placeholder: "times/day"
        },
        {
          name: "plan_fluids_iddsi",
          label: "Fluids – IDDSI level",
          type: "multi-select-dropdown",
          options: [  "Level 0 – Thin",
        "Level 1 – Slightly thick",
        "Level 2 – Mildly thick",
        "Level 3 – Moderately thick",
        "Level 4 – Extremely thick"]
            .map(v => ({ label: v, value: v }))
        },
      
      ]
    },

    {
      type: "row",
      fields: [
  {
          name: "plan_fluid_amount",
          label: "Amount (e.g. 50 ml / 100 ml)",
          type: "input",
          placeholder: "e.g. 50 ml / 100 ml"
        },
        {
          name: "plan_enteral_frequency",
          label: "Frequency (as & when / every feed)",
          type: "input",
          placeholder: "as & when / every feed"
        }
      ]
    },



    { type: "subheading", label: "Safe Swallowing Strategies" },

    {
      name: "safe_strategies",
      type: "multi-select-dropdown",
      options: [
        "Upright fully during intake & 30 min post",
        "Feed via spoon only",
        "Small sips / bites",
        "Slow rate",
        "Provide verbal cue to swallow",
        "Double / multiple swallows",
        "Voluntary cough",
        "Head turn to the weak side",
        "Head tilt to the strong side",
        "Chin tuck",
        "Cyclic ingestion"
      ].map(v => ({ label: v, value: v }))
    },

    { type: "subheading", label: "Monitoring During Oral Intake" },

    {
      name: "monitoring",
      type: "multi-select-dropdown",
      options: [
        "Monitor for overt signs of aspiration (coughing, throat clearing, wet/gurgly voice, increased respiratory effort, desaturation)",
        "Stop oral intake if overt aspiration occurs or patient fatigues",
        "Document tolerance and clinical signs post-intake"
      ].map(v => ({ label: v, value: v }))
    },

    { type: "subheading", label: "Oral Care" },

    {
      name: "oral_care_method",
      label: "Method",
      type: "multi-select-dropdown",
      options: ["Brush teeth", "Gauze stick", "Gargle"]
        .map(v => ({ label: v, value: v }))
    },

    {
      name: "oral_care_frequency",
      label: "Frequency",
      type: "single-select",
      options: [
        "Once daily",
        "Twice daily",
        "3–4 times/day",
        "Before & after meals"
      ].map(v => ({ label: v, value: v }))
    },

    { type: "subheading", label: "Therapy" },

    {
      name: "therapy_plan",
      type: "multi-select-dropdown",
      options: [
        "Training about swallowing",
        "Education about swallowing",
        "Advising about swallowing"
      ].map(v => ({ label: v, value: v }))
    },

    { type: "subheading", label: "Other Management" },

    {
      name: "referral_specialist",
      label: "Referral – Specialist",
      type: "textarea",
      placeholder: "Free text"
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
    ...CSE_SCHEMA,
    sections: (CSE_SCHEMA.sections || []).map(section => ({
      ...section,
      fields: flattenRadioRows((section.fields || []).map(normalizeFieldTypes))
    }))
  };

  const commonSectionFieldsBase = [
    { name: "patient_seen", label: "Patient was seen", type: "radio", options: [{ label: "Unaccompanied", value: "Unaccompanied" }, { label: "Accompanied by caregiver", value: "Accompanied by caregiver" }] },
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
    fields: (section.fields || []).filter(f => {
      if (f?.type === "subheading" && f?.label === "General Observation") return false;
      return !ADULT_COMMON_FIELD_NAMES.includes(f?.name);
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
      return {
        ...schema,
        sections: (schema.sections || []).map(sec => ({
          ...sec,
          fields: withOptionalSections(sec.fields || [], labels)
        }))
      };
    };
    return {
      ...base,
      subjective: base.subjective ? applyOpt(base.subjective, CSE_OPTIONAL_SECTIONS.subjective) : null,
      objective: base.objective ? applyOpt(base.objective, CSE_OPTIONAL_SECTIONS.objective) : null
    };
  }, [isFollowup]);

  const tabOrder = ["subjective", "objective", "assessment", "plan"].filter(t => schemaMap[t]);

  const onAction = (type) => {
    if (type === "back") onBack?.();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Adult Clinical Swallowing Evaluation", values);
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
