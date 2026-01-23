import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

/* ---------------- OPTIONS ---------------- */

const SEVERITY_OPTIONS = [
  { label: "MI (Mild)", value: 1 },
  { label: "MO (Moderately Deviant)", value: 2 },
  { label: "SE (Severely Deviant)", value: 3 }
];

const CONSISTENCY_OPTIONS = [
  { label: "C (Consistent)", value: 1 },
  { label: "I (Intermittent)", value: 0.5 }
];

/* ---------------- SCHEMA ---------------- */

const VoiceQualitySchema = {
  title: "Consensus Auditory-Perceptual Evaluation of Voice (CAPE-V)",
  sections: [
    {
      title: "Voice Parameters",
      fields: [
//         {
//   type: "info-text",
//   text: [
//     "The following parameters of voice quality will be rated upon completion of the following tasks:",
//     "1. Sustained vowels, /a/ and /i/ for 3–5 seconds duration each.",
//     "2. Sentence production:",
//     "   a. The blue spot is on the key again.",
//     "   b. How hard did he hit him?",
//     "   c. We were away a year ago.",
//     "   d. We eat eggs every Easter.",
//     "   e. My mama makes lemon muffins.",
//     "   f. Peter will keep at the peak.",
//     "3. Spontaneous speech in response to:",
//     "   “Tell me about your favorite problem.” or",
//     "   “Tell me how your voice is functioning.”"
//   ]
// },
      {
    name: "consent",
            label: " Sustained vowels, /a/ and /i/ for 3–5 seconds duration each.",
            type: "textarea",
},
  {
    name: "sentence_production",
    label: `2. Sentence production:,
       a. The blue spot is on the key again.  ,
       b. How hard did he hit him? ,
       c. We were away a year ago. ,
       d. We eat eggs every Easter. ,
       e. My mama makes lemon muffins. ,
       f. Peter will keep at the peak. `,
            type: "textarea",
},
    {
    name: "vowel",
            label: `3. Spontaneous speech in response to:",
       “Tell me about your favorite problem.” or,
       “Tell me how your voice is functioning.`,
            type: "textarea",
},

     {
  type: "row",
  fields: [
    {
      type: "single-select",
      name: "overall_severity_severity",
      label: "Overall Severity – Severity",
      options: SEVERITY_OPTIONS
    },
    {
      type: "single-select",
      name: "overall_severity_consistency",
      label: "Overall Severity – Consistency",
      options: CONSISTENCY_OPTIONS
    },
    {
      type: "input",
      name: "overall_severity_score",
      label: "Overall Severity – Score /100"
    }
  ]
},

{
  type: "row",
  fields: [
    {
      type: "single-select",
      name: "roughness_severity",
      label: "Roughness – Severity",
      options: SEVERITY_OPTIONS
    },
    {
      type: "single-select",
      name: "roughness_consistency",
      label: "Roughness – Consistency",
      options: CONSISTENCY_OPTIONS
    },
    {
      type: "input",
      name: "roughness_score",
      label: "Roughness – Score /100"
    }
  ]
},

{
  type: "row",
  fields: [
    {
      type: "single-select",
      name: "breathiness_severity",
      label: "Breathiness – Severity",
      options: SEVERITY_OPTIONS
    },
    {
      type: "single-select",
      name: "breathiness_consistency",
      label: "Breathiness – Consistency",
      options: CONSISTENCY_OPTIONS
    },
    {
      type: "input",
      name: "breathiness_score",
      label: "Breathiness – Score /100"
    }
  ]
},

{
  type: "row",
  fields: [
    {
      type: "single-select",
      name: "strain_severity",
      label: "Strain – Severity",
      options: SEVERITY_OPTIONS
    },
    {
      type: "single-select",
      name: "strain_consistency",
      label: "Strain – Consistency",
      options: CONSISTENCY_OPTIONS
    },
    {
      type: "input",
      name: "strain_score",
      label: "Strain – Score /100"
    }
  ]
},

{
  type: "row",
  fields: [
    {
      type: "single-select",
      name: "pitch_severity",
      label: "Pitch – Severity",
      options: SEVERITY_OPTIONS
    },
    {
      type: "single-select",
      name: "pitch_consistency",
      label: "Pitch – Consistency",
      options: CONSISTENCY_OPTIONS
    },
    {
      type: "input",
      name: "pitch_score",
      label: "Pitch – Score /100"
    }
  ]
},

{
  type: "row",
  fields: [
    {
      type: "single-select",
      name: "loudness_severity",
      label: "Loudness – Severity",
      options: SEVERITY_OPTIONS
    },
    {
      type: "single-select",
      name: "loudness_consistency",
      label: "Loudness – Consistency",
      options: CONSISTENCY_OPTIONS
    },
    {
      type: "input",
      name: "loudness_score",
      label: "Loudness – Score /100"
    }
  ]
},

        {
          type: "radio",
          name: "resonance_status",
          label: "Resonance",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Other", value: "other" }
          ]
        },

        {
          type: "textarea",
          name: "resonance_other",
          label: "Other (Provide description)",
          showIf: {
            field: "resonance_status",
            equals: "other"
          }
        }
      ]
    }
  ]
};

/* ---------------- CALCULATION ---------------- */

function calcRowScore(sev, cons) {
  if (!sev || !cons) return 0;
  return Math.round(sev * cons * 33);
}

function applyScores(values) {
  const rows = [
    "overall_severity",
    "roughness",
    "breathiness",
    "strain",
    "pitch",
    "loudness"
  ];

  const next = { ...values };

  rows.forEach(r => {
    const row = Array.isArray(values[r]) ? values[r] : [];
    const sev = row[0];
    const cons = row[1];
    next[`${r}_score`] = calcRowScore(sev, cons);
  });

  return next;
}

/* ---------------- COMPONENT ---------------- */

export default function VoiceQualityAssessment({ onBack }) {
  const [values, setValues] = React.useState({});

  const handleChange = (name, payload) => {
    const next = { ...values };

    // grid-row payload: { col, value }
    if (payload && typeof payload === "object" && "col" in payload) {
      const prev = Array.isArray(values[name]) ? values[name] : [];
      const updated = [...prev];
      updated[payload.col] = payload.value;
      next[name] = updated;
    } else {
      next[name] = payload;
    }

    const scored = applyScores(next);
    setValues(scored);
  };

  return (
    <>
      <CommonFormBuilder
        schema={VoiceQualitySchema}
        values={values}
        onChange={handleChange}
        // layout={layout}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(220px, 1fr))", gap: 16, margin: 24 }}>
        <div style={pill}>Overall: {values.overall_severity_score || 0}/100</div>
        <div style={pill}>Roughness: {values.roughness_score || 0}/100</div>
        <div style={pill}>Breathiness: {values.breathiness_score || 0}/100</div>
        <div style={pill}>Strain: {values.strain_score || 0}/100</div>
        <div style={pill}>Pitch: {values.pitch_score || 0}/100</div>
        <div style={pill}>Loudness: {values.loudness_score || 0}/100</div>
      </div>
    </>
  );
}

const pill = {
  padding: "14px 18px",
  borderRadius: 12,
  border: "1px solid #CBD5E1",
  fontWeight: 700
};
