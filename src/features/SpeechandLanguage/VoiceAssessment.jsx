
import { useState,useEffect } from "react";
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

export default function VoiceAssessment({mode = "objective"}) {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => {
      const updated = { ...prev, [name]: value };

      // Auto-calculate MPT (longest of 3 /a/ trials)
      if (["a_trial1", "a_trial2", "a_trial3"].includes(name)) {
        const trials = [
          parseFloat(updated.a_trial1) || 0,
          parseFloat(updated.a_trial2) || 0,
          parseFloat(updated.a_trial3) || 0
        ];
        const longest = Math.max(...trials);
        updated.mpt = longest > 0 ? longest.toFixed(1) : "";
      }

      // Auto-calculate S/Z ratio (longest s / longest z)
      if (["s_trial1","s_trial2","s_trial3","z_trial1","z_trial2","z_trial3"].includes(name)) {
        const sTrials = [
          parseFloat(updated.s_trial1) || 0,
          parseFloat(updated.s_trial2) || 0,
          parseFloat(updated.s_trial3) || 0
        ];
        const zTrials = [
          parseFloat(updated.z_trial1) || 0,
          parseFloat(updated.z_trial2) || 0,
          parseFloat(updated.z_trial3) || 0
        ];
        const longestS = Math.max(...sTrials);
        const longestZ = Math.max(...zTrials);
        if (longestS > 0 && longestZ > 0) {
          updated.sz_ratio = (longestS / longestZ).toFixed(2);
        } else {
          updated.sz_ratio = "";
        }
      }

      // Auto-calculate GRBASI final score string e.g. G1R2B1A0S1I0
      const grbasiFields = ["grbasi_grade","grbasi_roughness","grbasi_breathiness","grbasi_asthenia","grbasi_strain","grbasi_instability"];
      if (grbasiFields.includes(name)) {
        const g = updated.grbasi_grade       ?? "";
        const r = updated.grbasi_roughness   ?? "";
        const b = updated.grbasi_breathiness ?? "";
        const a = updated.grbasi_asthenia    ?? "";
        const s = updated.grbasi_strain      ?? "";
        const i = updated.grbasi_instability ?? "";
        if ([g,r,b,a,s,i].every(v => v !== "")) {
          updated.grbasi_score = `G${g}R${r}B${b}A${a}S${s}I${i}`;
        }
      }

      return updated;
    });
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

useEffect(() => {
  const { a1, a2, a3, s1, s2, s3, z1, z2, z3 } = values;

  const maxA = Math.max(a1 || 0, a2 || 0, a3 || 0);
  const maxS = Math.max(s1 || 0, s2 || 0, s3 || 0);
  const maxZ = Math.max(z1 || 0, z2 || 0, z3 || 0);

  const sz = maxZ ? (maxS / maxZ).toFixed(2) : "";

  setValues(prev => ({
    ...prev,
    mpt: maxA || "",
    sz_ratio: sz
  }));
}, [values.a1, values.a2, values.a3, values.s1, values.s2, values.s3, values.z1, values.z2, values.z3]);


useEffect(() => {
  const {
    grade,
    roughness,
    breathiness,
    asthenia,
    strain,
    instability
  } = values;

  const score =
    `G${grade ?? 0}R${roughness ?? 0}B${breathiness ?? 0}A${asthenia ?? 0}S${strain ?? 0}I${instability ?? 0}`;

  setValues(prev => ({
    ...prev,
    grbasi_score: score
  }));
}, [
  values.grade,
  values.roughness,
  values.breathiness,
  values.asthenia,
  values.strain,
  values.instability
]);



  /* ================= SCHEMA ================= */

  const SCHEMA_SUBJECTIVE = {
    sections: [
      {
        title: "Voice History",
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
      label: "Date or duration",
      type: "input"
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
            type: "input",
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
          // {
          //   name: "diet_intake",
          //   label: "Diet intake",
          //   type: "textarea"
          // },
          {
  type: "subheading",
  label: "Diet Intake"
},
{
  name: "diet_intake",
  label: "Enter Diet Intake Details",
  type: "textarea",
  placeholder: "Type diet intake information here..."
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
  label: "Neck / shoulder tension",
  type: "radio",
  options: YES_NO_OPTIONS
}

        ]
      }
    ]
  };

  const scoreOptions = [
  { label: "0 - Normal", value: 0 },
  { label: "1 - Mild", value: 1 },
  { label: "2 - Moderate", value: 2 },
  { label: "3 - Severe", value: 3 }
];
// const SCHEMA_OBJECTIVE = {
//   sections: [
//     {
//       title: "Voice Assessment",
//       fields: [

//         /* ================= BASIC ASSESSMENT ================= */
//         {
//           type: "subheading",
//           label: "Assessment Codes"
//         },
//         {
//           type: "group",
//           fields: [
//             {
//               name: "respiration_assessment",
//               type: "checkbox",
//               label: "JTB.AA.ZZ Assessment of respiration function"
//             },
//             {
//               name: "voice_speech_assessment",
//               type: "checkbox",
//               label: "JU1.AA.ZZ Assessment of voice and speech functions"
//             }
//           ]
//         },

//         /* ================= RESPIRATORY ================= */
//         {
//           type: "subheading",
//           label: "A. Respiratory Observations"
//         },
//         {
//           type: "group",
//           fields: [
//             {
//               name: "breathing_type",
//               label: "Type of breathing",
//               type: "radio",
//               options: [
//                 { label: "Nose", value: "nose" },
//                 { label: "Mouth", value: "mouth" }
//               ]
//             },
//             {
//               name: "breathing_pattern",
//               label: "Breathing pattern",
//               type: "radio",
//               options: [
//                 { label: "Clavicular", value: "clavicular" },
//                 { label: "Thoracic", value: "thoracic" },
//                 { label: "Diaphragmatic", value: "diaphragmatic" }
//               ]
//             }
//           ]
//         },

//         /* ================= S/Z RATIO ================= */
//         {
//           type: "subheading",
//           label: "S/Z Ratio"
//         },
//         {
//           type: "radio",
//           fields: [
//             {
//               name: "sz_ratio",
//               label: "S/Z Ratio",
//               type: "number",
//               readOnly: true
//             },

//             {
//               type: "radio",
//               label: "/s/ trials",
//               fields: [
//                 { name: "s_trial_1", label: "Trial 1", type: "number" },
//                 { name: "s_trial_2", label: "Trial 2", type: "number" },
//                 { name: "s_trial_3", label: "Trial 3", type: "number" }
//               ]
//             },

//             {
//               type: "radio",
//               label: "/z/ trials",
//               fields: [
//                 { name: "z_trial_1", label: "Trial 1", type: "number" },
//                 { name: "z_trial_2", label: "Trial 2", type: "number" },
//                 { name: "z_trial_3", label: "Trial 3", type: "number" }
//               ]
//             }
//           ]
//         },

//         /* ================= ACOUSTIC ================= */
//         {
//           type: "subheading",
//           label: "B. Acoustic Analysis (Praat)"
//         },
//         {
//           type: "radio",
//           fields: [
//             { name: "f0_mean", label: "F0 Mean (Hz)", type: "number" },
//             { name: "jitter", label: "Jitter (%)", type: "number" },
//             { name: "shimmer", label: "Shimmer (%)", type: "number" },
//             { name: "hnr_cpp", label: "HNR / CPP (dB)", type: "number" },
//             { name: "intensity_range", label: "Intensity Range (dB)", type: "number" }
//           ]
//         },

//         /* ================= GRBASI ================= */
//         {
//           type: "subheading",
//           label: "C. GRBASI Scale"
//         },
//         {
//           type: "radio",
//           fields: [
//             {
//               name: "grbasi_score",
//               label: "Final Score",
//               type: "input",
//               readOnly: true
//             },
//             { name: "g_grade", label: "Grade", type: "radio", options: scoreOptions },
//             { name: "g_roughness", label: "Roughness", type: "radio", options: scoreOptions },
//             { name: "g_breathiness", label: "Breathiness", type: "radio", options: scoreOptions },
//             { name: "g_asthenia", label: "Asthenia", type: "radio", options: scoreOptions },
//             { name: "g_strain", label: "Strain", type: "radio", options: scoreOptions },
//             { name: "g_instability", label: "Instability", type: "radio", options: scoreOptions }
//           ]
//         },

//         /* ================= CAPE-V ================= */
//         {
//           type: "subheading",
//           label: "D. CAPE-V"
//         },
//         {
//           type: "radio",
//           fields: [
//             { name: "cape_overall", label: "Overall Severity", type: "slider", min: 0, max: 100 },
//             { name: "cape_roughness", label: "Roughness", type: "slider", min: 0, max: 100 },
//             { name: "cape_breathiness", label: "Breathiness", type: "slider", min: 0, max: 100 },
//             { name: "cape_strain", label: "Strain", type: "slider", min: 0, max: 100 },
//             { name: "cape_pitch", label: "Pitch", type: "slider", min: 0, max: 100 },
//             { name: "cape_loudness", label: "Loudness", type: "slider", min: 0, max: 100 },
//             { name: "cape_resonance", label: "Resonance", type: "slider", min: 0, max: 100 }
//           ]
//         }

//       ]
//     }
//   ]
// };

// const SCHEMA_OBJECTIVE = {
//   sections: [
//     {
//       title: "Voice Assessment",
//       fields: [

//         /* ================= A. RESPIRATORY ================= */
//         {
//           type: "subheading",
//           label: "A. Respiratory Observations"
//         },
//         {
//           type: "row",
//           fields: [
//             {
//               name: "breathing_type",
//               label: "Type of breathing",
//               type: "radio",
//               options: [
//                 { label: "Nose", value: "nose" },
//                 { label: "Mouth", value: "mouth" }
//               ]
//             },
//             {
//               name: "breathing_pattern",
//               label: "Breathing pattern",
//               type: "radio",
//               options: [
//                 { label: "Clavicular", value: "clavicular" },
//                 { label: "Thoracic", value: "thoracic" },
//                 { label: "Diaphragmatic", value: "diaphragmatic" }
//               ]
//             }
//           ]
//         },

//         /* ================= B. OBJECTIVE VOICE ================= */
//         {
//           type: "subheading",
//           label: "B. Objective Voice Measures"
//         },

//         {
//           type: "group",
//           label: "Maximum Phonation Time (MPT)",
//           fields: [
//             {
//               type: "row",
//               fields: [
//                 { name: "a1", label: "/a/ Trial 1 (s)", type: "number" },
//                 { name: "a2", label: "/a/ Trial 2 (s)", type: "number" },
//                 { name: "a3", label: "/a/ Trial 3 (s)", type: "number" }
//               ]
//             },
//             {
//               name: "mpt",
//               label: "MPT (Longest /a/)",
//               type: "number",
//               readOnly: true
//             }
//           ]
//         },

//         {
//           type: "group",
//           label: "S/Z Ratio",
//           fields: [
//             {
//               type: "row",
//               fields: [
//                 { name: "s1", label: "/s/ Trial 1", type: "number" },
//                 { name: "s2", label: "/s/ Trial 2", type: "number" },
//                 { name: "s3", label: "/s/ Trial 3", type: "number" }
//               ]
//             },
//             {
//               type: "row",
//               fields: [
//                 { name: "z1", label: "/z/ Trial 1", type: "number" },
//                 { name: "z2", label: "/z/ Trial 2", type: "number" },
//                 { name: "z3", label: "/z/ Trial 3", type: "number" }
//               ]
//             },
//             {
//               name: "sz_ratio",
//               label: "S/Z Ratio (longest s / longest z)",
//               type: "number",
//               readOnly: true,
//               helperText:
//                 "Normal ≈ 1.0 | >1.4 inefficiency | <0.8 phonation issue"
//             }
//           ]
//         },

//         /* ================= ACOUSTIC ================= */
//         {
//           type: "subheading",
//           label: "Acoustic Analysis (Praat)"
//         },
//         {
//           type: "note",
//           label: "Task: Sustained /a/ for 3 trials (best trial analysed)"
//         },
//         {
//           type: "group",
//           fields: [
//             { name: "f0_mean", label: "F0 Mean (Hz)", type: "number" },
//             { name: "jitter", label: "Jitter (%)", type: "number" },
//             { name: "shimmer", label: "Shimmer (%)", type: "number" },
//             { name: "hnr_cpp", label: "HNR / CPP (dB)", type: "number" },
//             { name: "intensity_range", label: "Intensity Range (dB)", type: "number" }
//           ]
//         },

//         {
//           type: "note",
//           label: "Typical Range: Jitter <1% | Shimmer <3–4% | HNR >12 dB | CPP >13–14 dB"
//         },

//         /* ================= GRBASI ================= */
//         {
//           type: "subheading",
//           label: "C. Perceptual Voice Measures (GRBASI)"
//         },
//         {
//           type: "group",
//           fields: [
//             {
//               name: "g",
//               label: "Grade",
//               type: "radio",
//               options: scoreOptions
//             },
//             {
//               name: "r",
//               label: "Roughness",
//               type: "radio",
//               options: scoreOptions
//             },
//             {
//               name: "b",
//               label: "Breathiness",
//               type: "radio",
//               options: scoreOptions
//             },
//             {
//               name: "a",
//               label: "Asthenia",
//               type: "radio",
//               options: scoreOptions
//             },
//             {
//               name: "s",
//               label: "Strain",
//               type: "radio",
//               options: scoreOptions
//             },
//             {
//               name: "i",
//               label: "Instability",
//               type: "radio",
//               options: scoreOptions
//             },
//             {
//               name: "grbasi_score",
//               label: "Final Score (GxRxBxAxSxIx)",
//               type: "text",
//               readOnly: true
//             }
//           ]
//         },

//         /* ================= CAPE-V ================= */
//         {
//           type: "subheading",
//           label: "CAPE-V"
//         },
//         {
//           type: "note",
//           label: "0–100 scale (0 normal, 100 severe)"
//         },
//         {
//           type: "group",
//           fields: [
//             { name: "cape_overall", label: "Overall Severity", type: "slider", min: 0, max: 100 },
//             { name: "cape_roughness", label: "Roughness", type: "slider", min: 0, max: 100 },
//             { name: "cape_breathiness", label: "Breathiness", type: "slider", min: 0, max: 100 },
//             { name: "cape_strain", label: "Strain", type: "slider", min: 0, max: 100 },
//             { name: "cape_pitch", label: "Pitch", type: "slider", min: 0, max: 100 },
//             { name: "cape_loudness", label: "Loudness", type: "slider", min: 0, max: 100 },
//             { name: "cape_resonance", label: "Resonance", type: "slider", min: 0, max: 100 }
//           ]
//         }

//       ]
//     }
//   ]
// };
const CAPE_V_GUIDE =
  "Normal (0-10) / Mild deviation (11-30) / Moderate deviation (31-60) / Severe deviation (61-100)";

// const scoreOptions = [
//   { label: "0 - Normal", value: 0 },
//   { label: "1 - Mild", value: 1 },
//   { label: "2 - Moderate", value: 2 },
//   { label: "3 - Severe", value: 3 }
// ];

// const SCHEMA_OBJECTIVE = {
//   section_name: "Voice Assessment",
//   fields: [

//     /* ================= A. RESPIRATORY ================= */
//     {
//       type: "group",
//       label: "A. Respiratory Observations",
//       fields: [
//         {
//           name: "breathing_type",
//           label: "Type of breathing",
//           type: "radio",
//           options: [
//             { label: "Nose", value: "nose" },
//             { label: "Mouth", value: "mouth" }
//           ]
//         },
//         {
//           name: "breathing_pattern",
//           label: "Breathing pattern",
//           type: "radio",
//           options: [
//             { label: "Clavicular", value: "clavicular" },
//             { label: "Thoracic", value: "thoracic" },
//             { label: "Diaphragmatic", value: "diaphragmatic" }
//           ]
//         }
//       ]
//     },

//     /* ================= B. OBJECTIVE ================= */
//     {
//       type: "group",
//       label: "B. Objective Voice Measures",
//       fields: [

//         {
//           name: "mpt",
//           label: "Maximum Phonation Time (auto longest /a/)",
//           type: "number",
//           readOnly: true
//         },

//         {
//           type: "group",
//           label: "/a/ (3 trials)",
//           fields: [
//             { name: "a1", label: "Trial 1 (s)", type: "number" },
//             { name: "a2", label: "Trial 2 (s)", type: "number" },
//             { name: "a3", label: "Trial 3 (s)", type: "number" }
//           ]
//         },

//         {
//           name: "sz_ratio",
//           label: "s/z ratio (auto)",
//           type: "number",
//           readOnly: true,
//           helperText:
//             "Normal ≈ 1.0 | >1.4 inefficiency | <0.8 phonation issue"
//         },

//         {
//           type: "group",
//           label: "/s/ (3 trials)",
//           fields: [
//             { name: "s1", label: "Trial 1", type: "number" },
//             { name: "s2", label: "Trial 2", type: "number" },
//             { name: "s3", label: "Trial 3", type: "number" }
//           ]
//         },

//         {
//           type: "group",
//           label: "/z/ (3 trials)",
//           fields: [
//             { name: "z1", label: "Trial 1", type: "number" },
//             { name: "z2", label: "Trial 2", type: "number" },
//             { name: "z3", label: "Trial 3", type: "number" }
//           ]
//         }
//       ]
//     },

//     /* ================= ACOUSTIC ================= */
//     {
//       type: "group",
//       label: "Acoustic Analysis (Praat)",
//       fields: [
//         {
//           type: "note",
//           label: "Task: Sustained /a/ for 3 trials (best trial analysed)"
//         },
//         { name: "f0", label: "F0 Mean (Hz)", type: "number" },
//         { name: "jitter", label: "Jitter (%)", type: "number" },
//         { name: "shimmer", label: "Shimmer (%)", type: "number" },
//         { name: "hnr", label: "HNR / CPP (dB)", type: "number" },
//         { name: "intensity", label: "Intensity Range (dB)", type: "number" },
//         {
//           type: "note",
//           label:
//             "Typical: Jitter <1% | Shimmer <3–4% | HNR >12 dB | CPP >13–14 dB"
//         }
//       ]
//     },

//     /* ================= GRBASI ================= */
//     {
//       type: "group",
//       label: "C. Perceptual Voice Measures (GRBASI)",
//       fields: [
//         {
//           type: "note",
//           label:
//             "Final score auto-generated as GxRxBxAxSxIx"
//         },

//         { name: "grade", label: "Grade", type: "radio", options: scoreOptions },
//         { name: "roughness", label: "Roughness", type: "radio", options: scoreOptions },
//         { name: "breathiness", label: "Breathiness", type: "radio", options: scoreOptions },
//         { name: "asthenia", label: "Asthenia", type: "radio", options: scoreOptions },
//         { name: "strain", label: "Strain", type: "radio", options: scoreOptions },
//         { name: "instability", label: "Instability", type: "radio", options: scoreOptions },

//         {
//           name: "grbasi_score",
//           label: "Final GRBASI Score",
//           type: "text",
//           readOnly: true
//         }
//       ]
//     },

//     /* ================= CAPE-V ================= */
//     {
//       type: "group",
//       label: "CAPE-V (0–100 scale)",
//       fields: [
//         { name: "cape_overall", label: "Overall Severity", type: "slider", min: 0, max: 100, helperText: CAPE_V_GUIDE },
//         { name: "cape_roughness", label: "Roughness", type: "slider", min: 0, max: 100, helperText: CAPE_V_GUIDE },
//         { name: "cape_breathiness", label: "Breathiness", type: "slider", min: 0, max: 100, helperText: CAPE_V_GUIDE },
//         { name: "cape_strain", label: "Strain", type: "slider", min: 0, max: 100, helperText: CAPE_V_GUIDE },
//         { name: "cape_pitch", label: "Pitch", type: "slider", min: 0, max: 100, helperText: CAPE_V_GUIDE },
//         { name: "cape_loudness", label: "Loudness", type: "slider", min: 0, max: 100, helperText: CAPE_V_GUIDE },
//         { name: "cape_resonance", label: "Resonance", type: "slider", min: 0, max: 100, helperText: CAPE_V_GUIDE }
//       ]
//     }

//   ]
// };
// const scoreOptions = [
//   { label: "0 - Normal", value: 0 },
//   { label: "1 - Mild", value: 1 },
//   { label: "2 - Moderate", value: 2 },
//   { label: "3 - Severe", value: 3 }
// ];

const SCHEMA_OBJECTIVE = {
  sections: [
    /* ================= A. RESPIRATORY ================= */
    {
      title: "A. Respiratory Observations",
      fields: [
        {
          name: "breathing_type",
          label: "Type of breathing",
          type: "radio",
          options: [
            { label: "Nose", value: "nose" },
            { label: "Mouth", value: "mouth" }
          ]
        },
        {
          name: "breathing_pattern",
          label: "Breathing pattern",
          type: "radio",
          options: [
            { label: "Clavicular", value: "clavicular" },
            { label: "Thoracic", value: "thoracic" },
            { label: "Diaphragmatic", value: "diaphragmatic" }
          ]
        }
      ]
    },

    /* ================= B. OBJECTIVE VOICE MEASURES ================= */
    {
      title: "B. Objective Voice Measures",
      fields: [
        // --- MPT ---
        { type: "subheading", label: "Maximum Phonation Time (MPT)  –  auto-populate longest /a/" },
        {
          type: "row",
          fields: [
            { name: "a_trial1", label: "/a/ Trial 1 (s)", type: "input" },
            { name: "a_trial2", label: "/a/ Trial 2 (s)", type: "input" },
            { name: "a_trial3", label: "/a/ Trial 3 (s)", type: "input" },
            { name: "mpt", label: "MPT – Longest (s)", type: "input", readOnly: true }
          ]
        },

        // --- S/Z Ratio ---
        { type: "subheading", label: "S/Z Ratio  (longest s ÷ longest z)  –  Normal reference ≈ 1.0" },
        
        {
          type: "row",
          fields: [
            { name: "s_trial1", label: "/s/ Trial 1 (s)", type: "input" },
            { name: "s_trial2", label: "/s/ Trial 2 (s)", type: "input" },
            { name: "s_trial3", label: "/s/ Trial 3 (s)", type: "input" }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "z_trial1", label: "/z/ Trial 1 (s)", type: "input" },
            { name: "z_trial2", label: "/z/ Trial 2 (s)", type: "input" },
            { name: "z_trial3", label: "/z/ Trial 3 (s)", type: "input" }
          ]
        },
        { name: "sz_ratio", label: "S/Z Ratio (auto-calculated)", type: "input", readOnly: true },
        {
          type: "info-text",
          text: "Elevated ratio (>1.4) → possible vocal fold inefficiency | Low ratio (<0.8) → phonation difficulties possible"
        },
        // --- Acoustic Analysis (Praat) ---
        { type: "subheading", label: "Acoustic Analysis (Praat)  –  Task: Sustained /a/ for 3 trials (best trial analysed)" },
        {
          type: "row",
          fields: [
            { name: "f0_mean", label: "F0 Mean (Hz)", type: "input" },
            { name: "jitter", label: "Jitter (%)", type: "input" }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "shimmer", label: "Shimmer (%)", type: "input" },
            { name: "hnr_cpp", label: "HNR / CPP (dB)", type: "input" }
          ]
        },
        { name: "intensity_range", label: "Intensity Range (dB)", type: "input" },
        {
          type: "note",
          label: "Typical Range:  Jitter <1%  |  Shimmer <3–4%  |  HNR >12 dB  |  CPP >13–14 dB (sustained vowel)"
        }
      ]
    },

    /* ================= C. PERCEPTUAL VOICE MEASURES ================= */
    {
      title: "C. Perceptual Voice Measures",
      fields: [
        // --- GRBASI ---
        { type: "subheading", label: "GRBASI Scale  – GxRxBxAxSxIx" },
        { name: "grbasi_grade",       label: "Grade",       type: "radio",  options: scoreOptions },
        { name: "grbasi_roughness",   label: "Roughness",   type: "radio", options: scoreOptions },
        { name: "grbasi_breathiness", label: "Breathiness", type: "radio", options: scoreOptions },
        { name: "grbasi_asthenia",    label: "Asthenia",    type: "radio", options: scoreOptions },
        { name: "grbasi_strain",      label: "Strain",      type: "radio",  options: scoreOptions },
        { name: "grbasi_instability", label: "Instability", type: "radio", options: scoreOptions },
        { name: "grbasi_score", label: "GRBASI Final Score", type: "input", readOnly: true },

        // --- CAPE-V ---
        { type: "subheading", label: "CAPE-V Overall Severity" },

        // { name: "cape_overall", label: "Overall Severity", type: "scale-slider", min: 0, max: 100, step: 1, showValue: true,
        //   ranges: [
        //     { from: 0,  to: 10, label: "Normal",            color: "#22c55e" },
        //     { from: 11, to: 30, label: "Mild deviation",    color: "#84cc16" },
        //     { from: 31, to: 60, label: "Moderate deviation",color: "#f59e0b" },
        //     { from: 61, to: 100,label: "Severe deviation",  color: "#ef4444" }
        //   ]
        // },
        {
          name: "overall_severity",
          label: "Overall Severity",
          type: "radio",
          options: [
            { label: "Consistent", value: "consistent" },
            { label: "Intermittent", value: "intermittent" }
          ]
        },
        { name: "cape_overall", label: "", type: "scale-slider", min: 0, max: 100, step: 1, showValue: true,
          ranges: [
            { from: 0,  to: 10, label: "Normal",            color: "#22c55e" },
            { from: 11, to: 30, label: "Mild deviation",    color: "#84cc16" },
            { from: 31, to: 60, label: "Moderate deviation",color: "#f59e0b" },
            { from: 61, to: 100,label: "Severe deviation",  color: "#ef4444" }
          ]
        },
        {
          name: "overall_roughness",
          label: "Roughness",
          type: "radio",
          options: [
            { label: "Consistent", value: "consistent" },
            { label: "Intermittent", value: "intermittent" }
          ]
        },
        { name: "cape_roughness", label: "", type: "scale-slider", min: 0, max: 100, step: 1, showValue: true,
          ranges: [
            { from: 0,  to: 10, label: "Normal",            color: "#22c55e" },
            { from: 11, to: 30, label: "Mild deviation",    color: "#84cc16" },
            { from: 31, to: 60, label: "Moderate deviation",color: "#f59e0b" },
            { from: 61, to: 100,label: "Severe deviation",  color: "#ef4444" }
          ]
        },
        {
          name: "overall_breathiness",
          label: "Breathiness",
          type: "radio",
          options: [
            { label: "Consistent", value: "consistent" },
            { label: "Intermittent", value: "intermittent" }
          ]
        },
        { name: "cape_breathiness", label: "", type: "scale-slider", min: 0, max: 100, step: 1, showValue: true,
          ranges: [
            { from: 0,  to: 10, label: "Normal",            color: "#22c55e" },
            { from: 11, to: 30, label: "Mild deviation",    color: "#84cc16" },
            { from: 31, to: 60, label: "Moderate deviation",color: "#f59e0b" },
            { from: 61, to: 100,label: "Severe deviation",  color: "#ef4444" }
          ]
        },
        {
          name: "overall_strain",
          label: "Strain",
          type: "radio",
          options: [
            { label: "Consistent", value: "consistent" },
            { label: "Intermittent", value: "intermittent" }
          ]
        },
        { name: "cape_strain", label: "", type: "scale-slider", min: 0, max: 100, step: 1, showValue: true,
          ranges: [
            { from: 0,  to: 10, label: "Normal",            color: "#22c55e" },
            { from: 11, to: 30, label: "Mild deviation",    color: "#84cc16" },
            { from: 31, to: 60, label: "Moderate deviation",color: "#f59e0b" },
            { from: 61, to: 100,label: "Severe deviation",  color: "#ef4444" }
          ]
        },
        {
          name: "overall_pitch",
          label: "Pitch",
          type: "radio",
          options: [
            { label: "Consistent", value: "consistent" },
            { label: "Intermittent", value: "intermittent" }
          ]
        },
        { name: "cape_pitch", label: "", type: "scale-slider", min: 0, max: 100, step: 1, showValue: true,
          ranges: [
            { from: 0,  to: 10, label: "Normal",            color: "#22c55e" },
            { from: 11, to: 30, label: "Mild deviation",    color: "#84cc16" },
            { from: 31, to: 60, label: "Moderate deviation",color: "#f59e0b" },
            { from: 61, to: 100,label: "Severe deviation",  color: "#ef4444" }
          ]
        },
        {
          name: "overall_loudness",
          label: "Loudness",
          type: "radio",
          options: [
            { label: "Consistent", value: "consistent" },
            { label: "Intermittent", value: "intermittent" }
          ]
        },
        { name: "cape_loudness", label: "", type: "scale-slider", min: 0, max: 100, step: 1, showValue: true,
          ranges: [
            { from: 0,  to: 10, label: "Normal",            color: "#22c55e" },
            { from: 11, to: 30, label: "Mild deviation",    color: "#84cc16" },
            { from: 31, to: 60, label: "Moderate deviation",color: "#f59e0b" },
            { from: 61, to: 100,label: "Severe deviation",  color: "#ef4444" }
          ]
        },
        {
          name: "overall_resonance",
          label: " Resonance",
          type: "radio",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Other", value: "other" }
          ],
        },
        {
          name: "overall_resonance_other",
          label: "Specify",
          type: "textarea",
          showIf: { field: "overall_resonance", equals: "other" }
        },
        // Resonance — Yes/No toggle, scale only shows when Yes
        // { name: "cape_resonance_applicable", label: "Resonance (if applicable)", type: "radio",
        //   options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
        // },
        { name: "cape_resonance", label: "Resonance", type: "scale-slider", min: 0, max: 100, step: 1, showValue: true,
          showIf: { field: "cape_resonance_applicable", equals: "yes" },
          ranges: [
            { from: 0,  to: 10, label: "Normal",            color: "#22c55e" },
            { from: 11, to: 30, label: "Mild deviation",    color: "#84cc16" },
            { from: 31, to: 60, label: "Moderate deviation",color: "#f59e0b" },
            { from: 61, to: 100,label: "Severe deviation",  color: "#ef4444" }
          ]
        }
      ]
    }
  ]
};
  const SCHEMA_ASSESSMENT = {
  sections: [
    {
      title: "Clinical Impression",
      fields: [
        {
          name: "voice_status",
          label: "Voice Status",
          type: "radio",
          options: [
            { label: "Voice is within functional limits", value: "voice_normal" },
            { label: "The patient presents with voice disorders", value: "presents_with" }
          ]
        },

        // {
        //   type: "subheading",
        //   label: "The patient presents with",
        //   showIf: { field: "voice_status", equals: "presents_with" }
        // },

        {
          name: "voice_diagnosis",
          label: "The patient presents with",
          type: "checkbox-group",
          showIf: { field: "voice_status", equals: "presents_with" },
          options: [
            {
              label: "Dysphonia",
              value: "dysphonia"
            },
            {
              label: "Aphonia",
              value: "aphonia"
            },
            {
              label: "Hypernasality / Hyponasality",
              value: "resonance_disorder"
            },
            {
              label: "Other voice disturbances",
              value: "other_voice_disorder"
            }
          ]
        },

        // {
        //   type: "subheading",
        //   label: "Characteristics",
        //   showIf: { field: "voice_status", equals: "presents_with" }
        // },

        {
          name: "voice_characteristics",
          label: "Characteristics",

          type: "checkbox-group",
          showIf: { field: "voice_status", equals: "presents_with" },
          options: [
            {
              label: "Breathy dysphonia",
              value: "breathy"
            },
            {
              label: "Strained/rough voice",
              value: "strained"
            },
            {
              label: "Reduced loudness",
              value: "low_loudness"
            },
            {
              label: "Possible VF pathology",
              value: "vf_pathology"
            }
          ]
        }
      ]
    }
  ]
};
const SCHEMA_PLAN = {
  sections: [
    {
      title: "Plan",
      fields: [
        // {
        //   name: "voice_therapy",
        //   label: "Therapy",
        //   type: "checkbox-group",
        //   options: [
        //     {
        //       label: "JUB.PH.ZZ Training of voice functions",
        //       value: "training_voice_functions"
        //     },
        //     {
        //       label: "JUB.PM.ZZ Education about voice functions",
        //       value: "education_voice_functions"
        //     },
        //     {
        //       label: "JUB.PN.ZZ Advising about voice functions",
        //       value: "advising_voice_functions"
        //     }
        //   ]
        // },

        // ✅ separate field
        {
          name: "voice_exercises",
          label: "Voice exercises",
          type: "textarea",
          placeholder: "Enter voice exercises..."
        },

        // ✅ FIX: checkbox-group needs options
      
        {
            name: "Other management",
            label: "Other management",
            type: "radio",
            options: [
              { label: "Referral for medical management", value: "Referral for medical management" },
              { label: "Further Assessment", value: "Further Assessment" }
            ]
          },

        // ✅ separate field
        //           { type: "subheading", label: "further_assessment" },

        // {
        //   name: "further_assessment",
          
        //   type: "radio",
        //   options: [
        //     {
        //       label: "SE1.AA.ZZ Assessment of communication, unspecified",
        //       value: "assessment"
        //     },
        //     {
        //       label: "SE1.AC.ZZ Test of communication, unspecified",
        //       value: "test"
        //     },
        //     {
        //       label: "SE1.AM.ZZ Observation of communication, unspecified",
        //       value: "observation"
        //     },
        //     {
        //       label: "SE1.AN.ZZ Interview in relation to communication, unspecified",
        //       value: "interview"
        //     }
        //   ]
        // }
      ]
    }
  ]
};







const FORM_SCHEMAS = {
  subjective: SCHEMA_SUBJECTIVE,
  objective: SCHEMA_OBJECTIVE,
  assessment: SCHEMA_ASSESSMENT,
  plan: SCHEMA_PLAN
};  /* ================= UI ================= */

  return (
   
  // <div>
  //   {FORM_SECTIONS.map((item) => (
  //       <CommonFormBuilder
  //         key={item.key}
  //         schema={item.schema}
  //         values={values}
  //         onChange={handleChange}
  //       />
  //     ))}
  // </div>
  <div style={{ padding: 20 }}>
          <CommonFormBuilder
  schema={FORM_SCHEMAS[mode] ?? { sections: [] }}
  values={values}
  layout="nested"
  onChange={handleChange}
/>
        </div>
);
    
    // <div>
    //   <h2>Voice Assessment</h2>

    //   <CommonFormBuilder
    //     schema={SCHEMA_SUBJECTIVE_VOICE}
    //     values={values}
    //     onChange={handleChange}
    //   />
    //   <CommonFormBuilder
    //     schema={SCHEMA_VOICE_PLAN}
    //     values={values}
    //     onChange={handleChange}
    //   />
    //   <CommonFormBuilder
    //     schema={SCHEMA_VOICE_ASSESSMENT}
    //     values={values}
    //     onChange={handleChange}
    //   />
    //   <CommonFormBuilder
    //     schema={SCHEMA_VOICE_OBJECTIVE}
    //     values={values}
    //     onChange={handleChange}
    //   />
    //   <CommonFormBuilder
    //     schema={SCHEMA_ASSESSMENT_COMMUNICATION}
    //     values={values}
    //     onChange={handleChange}
    //   />
    //   <CommonFormBuilder
    //     schema={SCHEMA_OBJECTIVE_COMMUNICATION}
    //     values={values}
    //     onChange={handleChange}
        
    //   />
    //   <CommonFormBuilder
    //     schema={SCHEMA_PLAN_COMMUNICATION}
    //     values={values}
    //     onChange={handleChange}
    //   />
    // </div>
 
}
const styles = {
  section: {
    marginBottom: "30px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fafafa"
  },
  sectionTitle: {
    marginBottom: "10px",
    color: "#333"
  }
};