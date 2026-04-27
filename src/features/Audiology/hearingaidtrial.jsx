import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

/* ── Option sets ── */
const AID_TYPES_W  = ["0-BTE","1-RIC","2-Custom","3-CROS","4-BCHA"];
const AID_TYPES    = ["BTE","RIC","Custom","CROS","BCHA"];
const FORMULAS_W   = ["0-NAL-NL2","1-DSL","2-Manufacturer"];
const FORMULAS     = ["NAL-NL2","DSL","Manufacturer"];

const SOUND_W  = ["0-Clear","1-Muffled","2-Sharp","3-Natural"];
const SOUND    = ["Clear","Muffled","Sharp","Natural"];
const SPEECH_W = ["0-Improved","1-No change","2-Reduced"];
const SPEECH   = ["Improved","No change","Reduced"];
const COMFORT_W= ["0-Comfortable","1-Too loud","2-Too soft"];
const COMFORT  = ["Comfortable","Too loud","Too soft"];
const LOCAL_W  = ["0-Good","1-Fair","2-Poor"];
const LOCAL    = ["Good","Fair","Poor"];
const FBWH_W   = ["0-None","1-Occasional","2-Frequent"];
const FBWH     = ["None","Occasional","Frequent"];

const HL_TYPE_W  = ["0-Conductive","1-Sensorineural","2-Mixed"];
const HL_TYPE    = ["Conductive","Sensorineural","Mixed"];
const VERIF_W    = ["0-Achieved","1-Partial","2-Not achieved"];
const VERIF      = ["Achieved","Partial","Not achieved"];
const ADAPT_W    = ["0-First-fit","1-Adjusted","2-Full target"];
const ADAPT      = ["First-fit","Adjusted","Full target"];
const TARGET_W   = ["0-Within target","1-Below target","2-Above target"];
const TARGET     = ["Within target","Below target","Above target"];
const MPO_W      = ["0-Appropriate","1-Too high","2-Too low"];
const MPO        = ["Appropriate","Too high","Too low"];
const FB_TEST_W  = ["0-Passed","1-Not passed"];
const FB_TEST    = ["Passed","Not passed"];
const SATISF_W   = ["0-Excellent","1-Good","2-Fair","3-Poor"];
const SATISF     = ["Excellent","Good","Fair","Poor"];
const OUTCOME_W  = ["0-Improved","1-Stable"];
const OUTCOME    = ["Improved","Stable"];

const PROGRAMS = [
  { label: "General",   value: "general"   },
  { label: "Noise",     value: "noise"     },
  { label: "Music",     value: "music"     },
  { label: "TV",        value: "tv"        },
  { label: "Telephone", value: "telephone" },
  { label: "Custom",    value: "custom"    },
];
const FEATURES = [
  { label: "Feedback Manager", value: "feedback_manager" },
  { label: "Noise Reduction",  value: "noise_reduction"  },
  { label: "Directionality",   value: "directionality"   },
  { label: "Speech Enhancer",  value: "speech_enhancer"  },
  { label: "Sound therapy",    value: "sound_therapy"    },
];

export function Hearingaidtrial({ onBack }) {
  const [values,        setValues]        = useState({});
  const [scoresVisible, setScoresVisible] = useState(false); // Doctor View off by default

  const handleChange = (name, value) =>
    setValues(prev => ({ ...prev, [name]: value }));

  /* ── Score calculation (Part B) ── */
  const trialScore = (n) => {
    let s = 0;
    const v = values;
    if (["clear","natural"].includes((v[`t${n}_sound`]  || "").toLowerCase())) s += 2;
    if ((v[`t${n}_speech`]   || "").toLowerCase() === "improved")              s += 2;
    if ((v[`t${n}_comfort`]  || "").toLowerCase() === "comfortable")           s += 2;
    if ((v[`t${n}_local`]    || "").toLowerCase() === "good")                  s += 2;
    if ((v[`t${n}_fbwh`]     || "").toLowerCase() === "none")                  s += 2;
    return s;
  };

  const s1 = trialScore(1), s2 = trialScore(2), s3 = trialScore(3);
  const best = Math.max(s1, s2, s3);
  const bestTrial = best === 0 ? "—"
    : s1 === best ? "Trial 1"
    : s2 === best ? "Trial 2"
    : "Trial 3";
  const recommendation =
    best >= 8 ? `${bestTrial} — strongly recommended`
    : best >= 6 ? `${bestTrial} — recommended with fine tuning`
    : "Further hearing aid adjustment required";

  /* ── Helpers ── */
  const opts  = (w, n) => scoresVisible ? w : n;  // with/without score labels
  const score = (name, label) =>                   // score-box only in doctor view
    scoresVisible ? [{ name, label, type: "score-box" }] : [];

  /* ── Trial block (B) ── */
  const trialBlock = (n) => [
    { type: "subheading", label: `Trial ${n}` },
    /* Right ear */
    { type: "subheading", label: "Right ear" },
    { name: `t${n}_r_model`,   label: "Make / Model",         type: "input" },
    { name: `t${n}_r_type`,    label: "Type",                 type: "radio", labelAbove: true, options: opts(AID_TYPES_W, AID_TYPES) },
    { name: `t${n}_r_formula`, label: "Prescriptive Formula", type: "radio", labelAbove: true, options: opts(FORMULAS_W, FORMULAS) },
    { name: `t${n}_r_outcome`, label: "Trial Outcome",        type: "input" },
    /* Left ear */
    { type: "subheading", label: "Left ear" },
    { name: `t${n}_l_model`,   label: "Make / Model",         type: "input" },
    { name: `t${n}_l_type`,    label: "Type",                 type: "radio", labelAbove: true, options: opts(AID_TYPES_W, AID_TYPES) },
    { name: `t${n}_l_formula`, label: "Prescriptive Formula", type: "radio", labelAbove: true, options: opts(FORMULAS_W, FORMULAS) },
    { name: `t${n}_l_outcome`, label: "Trial Outcome",        type: "input" },
  ];

  /* ── Patient feedback (B) — one row per category, 3 trial columns ── */
  const feedbackBlock = () => [
    { type: "subheading", label: "Patient Feedback" },

    { type: "subheading", label: "Sound quality" },
    { name: "t1_sound", label: "Trial 1", type: "radio", labelAbove: true, options: opts(SOUND_W, SOUND) },
    { name: "t2_sound", label: "Trial 2", type: "radio", labelAbove: true, options: opts(SOUND_W, SOUND) },
    { name: "t3_sound", label: "Trial 3", type: "radio", labelAbove: true, options: opts(SOUND_W, SOUND) },

    { type: "subheading", label: "Speech understanding" },
    { name: "t1_speech", label: "Trial 1", type: "radio", labelAbove: true, options: opts(SPEECH_W, SPEECH) },
    { name: "t2_speech", label: "Trial 2", type: "radio", labelAbove: true, options: opts(SPEECH_W, SPEECH) },
    { name: "t3_speech", label: "Trial 3", type: "radio", labelAbove: true, options: opts(SPEECH_W, SPEECH) },

    { type: "subheading", label: "Loudness comfort" },
    { name: "t1_comfort", label: "Trial 1", type: "radio", labelAbove: true, options: opts(COMFORT_W, COMFORT) },
    { name: "t2_comfort", label: "Trial 2", type: "radio", labelAbove: true, options: opts(COMFORT_W, COMFORT) },
    { name: "t3_comfort", label: "Trial 3", type: "radio", labelAbove: true, options: opts(COMFORT_W, COMFORT) },

    { type: "subheading", label: "Localization" },
    { name: "t1_local", label: "Trial 1", type: "radio", labelAbove: true, options: opts(LOCAL_W, LOCAL) },
    { name: "t2_local", label: "Trial 2", type: "radio", labelAbove: true, options: opts(LOCAL_W, LOCAL) },
    { name: "t3_local", label: "Trial 3", type: "radio", labelAbove: true, options: opts(LOCAL_W, LOCAL) },

    { type: "subheading", label: "Feedback / whistling" },
    { name: "t1_fbwh", label: "Trial 1", type: "radio", labelAbove: true, options: opts(FBWH_W, FBWH) },
    { name: "t2_fbwh", label: "Trial 2", type: "radio", labelAbove: true, options: opts(FBWH_W, FBWH) },
    { name: "t3_fbwh", label: "Trial 3", type: "radio", labelAbove: true, options: opts(FBWH_W, FBWH) },

    { name: "trial_result", label: "Trial Result", type: "input" },

    /* Score boxes — doctor view only */
    ...score("t1_score", "Trial 1 Score /10"),
    ...score("t2_score", "Trial 2 Score /10"),
    ...score("t3_score", "Trial 3 Score /10"),
  ];

  const schema = {
    title: "Hearing Aid Trial & Fitting",
    enableScoreToggle: true,
    actions: [{ type: "toggle-show-scores" }, { type: "back", label: "Back" }],
    sections: [

      /* ══ Part B ══ */
      {
        title: "Part B: Hearing Aid Trial",
        fields: [
          ...trialBlock(1),
          ...trialBlock(2),
          ...trialBlock(3),
          ...feedbackBlock(),
        ]
      },

      /* ══ Part C ══ */
      {
        title: "Part C: Summary of Hearing Aid Model",
        fields: [
          { type: "subheading", label: "a) Type of Hearing Loss" },
          { name: "hl_type_r", label: "Right ear", type: "radio", labelAbove: true, options: opts(HL_TYPE_W, HL_TYPE) },
          { name: "hl_type_l", label: "Left ear",  type: "radio", labelAbove: true, options: opts(HL_TYPE_W, HL_TYPE) },

          { type: "subheading", label: "b) Degree" },
          { name: "degree_r", label: "Right ear", type: "input" },
          { name: "degree_l", label: "Left ear",  type: "input" },

          { type: "subheading", label: "c) Model of Hearing Aid" },
          { name: "ha_model_r", label: "Right ear", type: "input" },
          { name: "ha_model_l", label: "Left ear",  type: "input" },
        ]
      },

      /* ══ Part D ══ */
      {
        title: "Part D: Hearing Aid Fitting",
        fields: [
          { name: "prog_software",    label: "Programming Software",       type: "input" },
          { name: "fit_formula",      label: "Prescription Formula",       type: "radio", labelAbove: true, options: opts(FORMULAS_W, FORMULAS) },
          { name: "verif_target",     label: "Verification Target",        type: "radio", labelAbove: true, options: opts(VERIF_W, VERIF) },
          { name: "adapt_level",      label: "Adaptation Level",           type: "radio", labelAbove: true, options: opts(ADAPT_W, ADAPT) },
          { name: "programs",         label: "Programs Configured",        type: "checkbox-group", options: PROGRAMS },
          { name: "features",         label: "Features Activated",         type: "checkbox-group", options: FEATURES },
          { name: "assistive_device", label: "Additional Assistive Device",type: "input" },
        ]
      },

      /* ══ Part E ══ */
      {
        title: "Part E: Verification (Objective Assessment)",
        fields: [
          { name: "verif_pdf", label: "Attach Verification PDF", type: "file-upload-modal" },

          { type: "subheading", label: "Real Ear Measurement (REM)" },
          { name: "rem_target",  label: "Target Achieved", type: "radio", labelAbove: true, options: opts(TARGET_W, TARGET) },
          { name: "rem_remarks", label: "Remarks",         type: "input" },

          { type: "subheading", label: "Visible Speech Mapping" },
          { name: "vsm_target",  label: "Target Achieved", type: "radio", labelAbove: true, options: opts(TARGET_W, TARGET) },
          { name: "vsm_remarks", label: "Remarks",         type: "input" },

          { type: "subheading", label: "Maximum Power Output (MPO)" },
          { name: "mpo_target",  label: "Target Achieved", type: "radio", labelAbove: true, options: opts(MPO_W, MPO) },
          { name: "mpo_remarks", label: "Remarks",         type: "input" },

          { type: "subheading", label: "Feedback Test" },
          { name: "fb_test",     label: "Result",  type: "radio", labelAbove: true, options: opts(FB_TEST_W, FB_TEST) },
          { name: "fb_remarks",  label: "Remarks", type: "input" },

          { type: "subheading", label: "Aided Response" },
          { name: "aided_target",  label: "Target Achieved", type: "radio", labelAbove: true, options: opts(TARGET_W, TARGET) },
          { name: "aided_remarks", label: "Remarks",         type: "input" },
        ]
      },

      /* ══ Part F ══ */
      {
        title: "Part F: Validation (Subjective Outcome)",
        fields: [
          /* Tool table */
          { type: "subheading", label: "COSI (Client Oriented Scale of Improvement)" },
          { name: "cosi_result",         label: "Result",         type: "input" },
          { name: "cosi_interpretation", label: "Interpretation", type: "input" },

          { type: "subheading", label: "HHIA / HHIE (Hearing Handicap Inventory)" },
          { name: "hhia_result",         label: "Result",         type: "input" },
          { name: "hhia_interpretation", label: "Interpretation", type: "input" },

          { type: "subheading", label: "Speech Perception (Quiet)" },
          { name: "sp_quiet_unaided", label: "Unaided (%)", type: "input" },
          { name: "sp_quiet_aided",   label: "Aided (%)",   type: "input" },
          { name: "sp_quiet_outcome", label: "Outcome",     type: "radio", labelAbove: true, options: opts(OUTCOME_W, OUTCOME) },

          { type: "subheading", label: "Speech Perception (Noise)" },
          { name: "sp_noise_unaided", label: "Unaided (%)", type: "input" },
          { name: "sp_noise_aided",   label: "Aided (%)",   type: "input" },
          { name: "sp_noise_outcome", label: "Outcome",     type: "radio", labelAbove: true, options: opts(OUTCOME_W, OUTCOME) },

          { type: "subheading", label: "Overall Satisfaction" },
          { name: "satisfaction",       label: "Rating",   type: "radio", labelAbove: true, options: opts(SATISF_W, SATISF) },
          { name: "satisfaction_notes", label: "Comments", type: "input" },

          /* Subjective rating scales */
          { type: "subheading", label: "Subjective Rating Scales (Hearing Loss)" },
          { name: "vas_emotional", label: "Analogue Scale: Emotional (0–10)",           type: "scale-slider", min: 0, max: 10 },
          { name: "vas_social",    label: "Analogue Scale: Social / Situational (0–10)", type: "scale-slider", min: 0, max: 10 },
          { name: "hhia_score",    label: "Hearing Handicap Inventory for Adults (HHIA)", type: "input" },
          { name: "cosi_score",    label: "Client Oriented Scale of Improvement (COSI)",  type: "input" },

          /* Doctor-view scores for Part F */
          ...score("f_satisfaction_score", "Satisfaction Score"),
          ...score("f_speech_quiet_score", "Speech Perception (Quiet) Score"),
          ...score("f_speech_noise_score", "Speech Perception (Noise) Score"),
        ]
      },

      /* ══ Scoring Summary — doctor view only ══ */
      ...(scoresVisible ? [{
        title: "Scoring Summary",
        fields: [
          { name: "t1_score",       label: "Trial 1 Score /10",      type: "score-box" },
          { name: "t2_score",       label: "Trial 2 Score /10",      type: "score-box" },
          { name: "t3_score",       label: "Trial 3 Score /10",      type: "score-box" },
          { name: "best_score",     label: "Best Score /10",         type: "score-box" },
          { name: "best_trial",     label: "Best Performing Trial",  type: "score-box" },
          { name: "recommendation", label: "Recommendation",         type: "score-box" },
        ]
      }] : []),
    ]
  };

  /* ── Satisfaction score helper ── */
  const satisfScore = () => {
    const m = { excellent: 4, good: 3, fair: 2, poor: 1 };
    return m[(values.satisfaction || "").toLowerCase()] ?? 0;
  };
  const speechScore = (aided, unaided) => {
    const a = parseFloat(values[aided]  || 0);
    const u = parseFloat(values[unaided]|| 0);
    return a > u ? `+${(a - u).toFixed(1)}%` : `${(a - u).toFixed(1)}%`;
  };

  return (
    <CommonFormBuilder
      schema={schema}
      layout="nested"
      values={{
        ...values,
        t1_score: s1,
        t2_score: s2,
        t3_score: s3,
        best_score: best,
        best_trial: bestTrial,
        recommendation,
        f_satisfaction_score: satisfScore(),
        f_speech_quiet_score: speechScore("sp_quiet_aided", "sp_quiet_unaided"),
        f_speech_noise_score: speechScore("sp_noise_aided", "sp_noise_unaided"),
      }}
      onChange={handleChange}
      showScores={scoresVisible}
      onAction={(type) => {
        if (type === "toggle-show-scores") setScoresVisible(v => !v);
        if (type === "back") onBack?.();
      }}
    />
  );
}
