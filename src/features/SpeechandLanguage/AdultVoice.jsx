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

const VOICE_OPTIONAL_SECTIONS = {
  subjective: ["Chief Complaint", "Medical history (related to voice)", "Voice History", "Lifestyle / Dietary Habits", "Diet Intake", "Associated Symptoms", "Musculoskeletal symptoms"],
  objective: [
    "General Observation",
    "Oral-motor Structure Observation",
    "Voice Parameters",
    "A. Respiratory Observations",
    "B. Objective Voice Measures",
    "Acoustic Analysis (Praat) – Sustained /a/ for 3 trials (best trial analysed)",
    "C. Perceptual Voice Measures",
    "Diagnoses / Findings"
  ]
};

export default function VoiceAssessment({ patient, onBack, mode = "initial" }) {
  const isFollowup = mode === "followup";
  const [values, setValues] = useState({});
  const [commonValues, setCommonValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");


  const VOICE_ASSESSMENT_SCHEMA = {
    title: "Voice Assessment",
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
              "Hoarse / weak / strained voice",
              "Reduced vocal loudness or difficulty projecting voice",
              "Voice fatigue / worsens with prolonged speaking",
              "Pain or discomfort when speaking (odynophonia)",
              "Running out of air while speaking / shortness of breath during voice use",
              "Other(s)"
            ].map(v => ({ label: v, value: v }))
          },
          {
  name: "presenting_complaints_other",
  label: "Other – please specify",
  type: "textarea",
  showIf: {
    field: "presenting_complaints",
    includes: "Other(s)"
  }
},


          { type: "subheading", label: "Medical history (related to voice)" },

          {
            name: "reflux",
            label: "Reflux",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          {
            name: "throat_surgery",
            label: "Throat surgery",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          {
            name: "known_vf_pathology",
            label: "Known VF pathology",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          {
            name: "current_medication",
            label: "Current medication",
            type: "textarea"
          },

          { type: "subheading", label: "Voice History" },

          {
            name: "onset",
            label: "Onset",
            type: "radio",
            options: ["Gradual", "Sudden"].map(v => ({ label: v, value: v }))
          },

          {
            type: "row",
            fields: [
              {
                name: "onset_duration",
                label: "Date or duration",
                type: "input"
              },
              {
                name: "progression",
                label: "Progression",
                type: "single-select",
                options: ["Better", "Worse", "No change"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "vocal_misuse",
                label: "Vocal misuse / abuse behaviours",
                type: "multi-select-dropdown",
                options: ["Screaming", "Shouting", "Excessive throat clearing"]
                  .map(v => ({ label: v, value: v }))
              },
              {
                name: "vocal_demand",
                label: "Vocal Demand Level scale",
                type: "single-select",
                options: ["Low", "Moderate", "High", "Elite Voice User"]
                  .map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "hours_talking",
                label: "Hours of talking per day",
                type: "single-select",
                options: ["<1", "1–3", "3–5", ">5 hrs"]
                  .map(v => ({ label: v, value: v }))
              },

            ]
          },


          { type: "subheading", label: "Lifestyle / Dietary Habits" },

       
              {
                name: "water_intake",
                label: "Daily water intake",
                type: "single-select",
                options: ["<0.5L", "0.5–1.0L", "1–1.5L", "1.5–2.0L", ">2.0L"]
                  .map(v => ({ label: v, value: v }))
              },


          {
            name: "smoking",
            label: "Smoking",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },
          {
  name: "smoking_details",
  label: "Packs / day or details",
  type: "input", 
  placeholder: "e.g. 5 cigarettes/day",
  showIf: {
    field: "smoking",
    equals: "Yes"
  }
},


          {
            name: "vaping",
            label: "Vaping exposure",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          {
            name: "second_hand_smoke",
            label: "Second-hand smoke exposure",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          {
            name: "hydration_habits",
            label: "Hydration habits",
            type: "multi-select-dropdown",
            options: ["Sips frequently", "Long gaps without drinking"]
              .map(v => ({ label: v, value: v }))
          },

          { type: "subheading", label: "Diet Intake" },

          {
            name: "alcohol",
            label: "Alcohol",
            type: "single-select",
            options: ["Never", "Occasionally", "Daily"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "caffeine",
            label: "Caffeine",
            type: "single-select",
            options: ["None", "1–2 cups/day", ">2 cups/day"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "spicy_food",
            label: "Spicy food",
            type: "radio",
            options: ["Rare", "Regular"].map(v => ({ label: v, value: v }))
          },

          {
            name: "dairy",
            label: "Dairy",
            type: "radio",
            options: ["Rare", "Regular"].map(v => ({ label: v, value: v }))
          },

          {
            name: "acidic_foods",
            label: "Acidic foods (citrus)",
            type: "radio",
            options: ["Rare", "Regular"].map(v => ({ label: v, value: v }))
          },

          {
            name: "eating_late",
            label: "Eating late at night",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          { type: "subheading", label: "Associated Symptoms" },

          ...[
            "Globus sensation",
            "Throat dryness",
            "Throat tension / tightness",
            "Pain when talking",
            "Vocal fatigue / endurance issues",
            "Dysphagia or coughing with liquids",
            "Feeling out of breath when talking"
          ].map(label => ({
            name: label,
            label,
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          })),

          {
            name: "associated_other",
            label: "Other(s)",
            type: "textarea"
          },

          { type: "subheading", label: "Musculoskeletal symptoms" },

          {
            name: "jaw_tension",
            label: "Jaw tension / teeth clenching",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
          },

          {
            name: "neck_tension",
            label: "Neck/shoulder tension",
            type: "radio",
            options: ["Yes", "No"].map(v => ({ label: v, value: v }))
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
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "tongue",
                label: "Tongue",
                type: "single-select",
                options: ["No Abnormality Detected (NAD)", "Deviation", "Fasciculations", "Thrush", "Reduced ROM"]
                  .map(v => ({ label: v, value: v }))
              },
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

          { type: "subheading", label: "Voice Parameters" },

          { type: "subheading", label: "A. Respiratory Observations" },

          {
            name: "breathing_type",
            label: "Type of breathing",
            type: "single-select",
            options: ["Nose", "Mouth"].map(v => ({ label: v, value: v }))
          },

          {
            name: "breathing_pattern",
            label: "Breathing pattern",
            type: "single-select",
            options: ["Clavicular", "Thoracic", "Diaphragmatic"]
              .map(v => ({ label: v, value: v }))
          },

          { type: "subheading", label: "B. Objective Voice Measures" },

          {
            name: "mpt_average",
            label: "Maximum Phonation Time (MPT) – average of 3 trials (s)",
            type: "input"
          },

          /* /a/ trials */
          {
            type: "milestone-grid",
            heading: "/a/",
            rows: [
              {
                left: { name: "a_trial_1", label: "Trial 1", placeholder: "s" },
                right: { name: "a_trial_2", label: "Trial 2", placeholder: "s" }
              },
              {
                left: { name: "a_trial_3", label: "Trial 3", placeholder: "s" }
              }
            ]
          },

          /* /s/ trials */
          {
            type: "milestone-grid",
            heading: "/s/",
            rows: [
              {
                left: { name: "s_trial_1", label: "Trial 1", placeholder: "s" },
                right: { name: "s_trial_2", label: "Trial 2", placeholder: "s" }
              },
              {
                left: { name: "s_trial_3", label: "Trial 3", placeholder: "s" }
              }
            ]
          },

          /* /z/ trials */
          {
            type: "milestone-grid",
            heading: "/z/",
            rows: [
              {
                left: { name: "z_trial_1", label: "Trial 1", placeholder: "s" },
                right: { name: "z_trial_2", label: "Trial 2", placeholder: "s" }
              },
              {
                left: { name: "z_trial_3", label: "Trial 3", placeholder: "s" }
              }
            ]
          },


          {
            name: "sz_ratio",
            label: "s/z ratio (Normal ≈ 1.0, >1.4 = possible vocal fold inefficiency, <0.8 = possible phonation difficulty)",
            type: "input"
          },

          { type: "subheading", label: "Acoustic Analysis (Praat) – Sustained /a/ for 3 trials (best trial analysed)" },

          {
            name: "f0_mean",
            label: "F0 Mean (Hz)",
            type: "input"
          },
          {
            name: "jitter",
            label: "Jitter(%)",
            type: "input"
          },
          {
            name: "shimmer",
            label: "Shimmer(%)",
            type: "input"
          },
          {
            name: "hnr_cpp",
            label: "HNR / CPP (dB)",
            type: "input"
          },
          {
            name: "intensity_range",
            label: "Intensity Range (dB)",
            type: "input"
          },


          { type: "subheading", label: "C. Perceptual Voice Measures" },

          {
            name: "grbasi",
            label: " Grade, Roughness, Breathiness, Asthenia, Strain, Instability (GRBASI Scale)",
            type: "single-select",
            options: ["Grade", "Roughness", "Breathiness", "Asthenia", "Strain", "Instability"]
              .map(v => ({ label: v, value: v }))
          },

          {
            name: "capev",
            label: "Consensus Auditory-Perceptual Evaluation of Voice (CAPE-V score)",
            type: "single-select",
            options: [
              "Overall severity",
              "Roughness",
              "Breathiness",
              "Strain",
              "Pitch",
              "Loudness",
              "Resonance (if applicable)"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "vhi_10",
            label: "Voice Handicap Index – 10 (VHI-10) score",
            type: "input"
          },

          {
            name: "rsi_score",
            label: "Reflux Symptom Index (RSI) score",
            type: "input"
          },

        

        ]
      },

      /* ======================================================
         A – ANALYSIS / ASSESSMENT
      ====================================================== */
      {
        title: "Assessment",
        fields: [

{ type: "subheading", label: "Diagnoses / Findings" },

{
  name: "voiceWithinLimits",
  label: "Voice is within functional limits",
  type: "radio",
  options: [
    { label: "Yes", value: "YES" },
    { label: "No", value: "NO" }
  ]
},

{
  name: "voiceDiagnoses",
  label: "The patient presents with",
  type: "multi-select-dropdown",
  options: [
    "Dysphonia",
    "Aphonia",
    "Hypernasality / Hyponasality",
    "Other and unspecified voice disturbances",
      "Breathy dysphonia",
    "Strained / rough voicing",
    "Reduced loudness",
    "Possible VF pathology"
  ].map(v => ({ label: v, value: v })),
 
},



    
          {
            name: "Others",
            label: "Others",
            type: "textarea"
          },
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
    ...VOICE_ASSESSMENT_SCHEMA,
    sections: (VOICE_ASSESSMENT_SCHEMA.sections || []).map(section => ({
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
      subjective: base.subjective ? applyOpt(base.subjective, VOICE_OPTIONAL_SECTIONS.subjective) : null,
      objective: base.objective ? applyOpt(base.objective, VOICE_OPTIONAL_SECTIONS.objective) : null
    };
  }, [isFollowup]);
  const tabOrder = ["subjective", "objective", "assessment", "plan"].filter(t => schemaMap[t]);

  const onAction = (type) => {
    if (type === "back") onBack?.();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Adult Voice Assessment", values);
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




