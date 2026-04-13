import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export function HyperacusisAdvancedForm({ onBack, mode }) {
  const [values, setValues] = useState({});

  const HQ_QUESTIONS = [
    "Do you ever use ear-plugs or ear-muffs to reduce your noise perception (do not consider use during high exposure)?",
    "Do you find it harder to ignore sounds around you in everyday situations?",
    "Do you have trouble reading in a noisy or loud environment?",
    "Do you have trouble concentrating in noisy surroundings?",
    "Do you have difficulty listening to conversations in noisy places?",
    "Has anyone told you that you tolerate noise or certain sounds badly?",
    "Are you particularly sensitive to or bothered by street noise?",
    "Do you find noise unpleasant in social situations (clubs, concerts, etc.)?",
    "When someone suggests going out, do you think about the noise you will face?",
    "Do you turn down invitations because of noise?",
    "Do noises bother you more in a quiet place than in a slightly noisy room?",
    "Do stress and tiredness reduce your ability to concentrate in noise?",
    "Are you less able to concentrate in noise toward the end of the day?",
    "Do noise and certain sounds cause you stress and irritation?"
  ];

  const KHALFA_QUESTIONS = [
    "Do you have trouble concentrating in a noisy or loud environment?",
    "Do you have trouble reading in a noisy or loud environment?",
    "Do you use earplugs or earmuffs to reduce noise perception?",
    "Do you find it harder to ignore sounds in everyday situations?",
    "Do you find it difficult to listen to announcements (airport, airplane)?",
    "Are you sensitive to or bothered by street noise?",
    "Do you automatically cover your ears with louder sounds?",
    "Do you think about noise when planning outings?",
    "Do you avoid going out because of noise?",
    "Do you find noise unpleasant in social situations?",
    "Has anyone told you that you tolerate noise poorly?",
    "Are you bothered by sounds others are not?",
    "Are you afraid of sounds others are not?",
    "Do noise and sounds cause stress and irritation?",
    "Are you less able to concentrate in noise later in the day?",
    "Do stress and tiredness reduce concentration in noise?",
    "Do sounds annoy you but not others?",
    "Are you emotionally drained by daily sounds?",
    "Do daily sounds have emotional impact?",
    "Are you irritated by sounds that others tolerate?"
  ];

  // =========================
  // ✅ CALCULATIONS
  // =========================

  const getVASSeverity = (score, type) => {
    if (score <= 2) return type === "annoyance" ? "No annoyance" : "Minimal";
    if (score <= 4) return "Mild";
    if (score <= 6) return "Moderate";
    if (score <= 8) return "Severe";
    return "Extreme";
  };

  const computeVAS = (v) => {
    const loudness = Number(v.vas_loudness || 0);
    const annoyance = Number(v.vas_annoyance || 0);

    return {
      loudness,
      annoyance,
      loudness_severity: getVASSeverity(loudness),
      annoyance_severity: getVASSeverity(annoyance, "annoyance")
    };
  };

  const computeHQ = (v) => {
    let att = 0, soc = 0, emo = 0;

    const getVal = (x) => Number(x || 0);

    [1,2,3,4].forEach(i => att += getVal(v[`hq_${i}`]));
    [5,6,7,8,9,10].forEach(i => soc += getVal(v[`hq_${i}`]));
    [11,12,13,14].forEach(i => emo += getVal(v[`hq_${i}`]));

    const total = att + soc + emo;

    return { att, soc, emo, total };
  };

  const computeKhalfa = (v) => {
    let func = 0, soc = 0, emo = 0;

    const getVal = (x) => Number(x || 0);

    [1,2,3,4,5,6,7].forEach(i => func += getVal(v[`khalfa_${i}`]));
    [8,9,10,11,12,13].forEach(i => soc += getVal(v[`khalfa_${i}`]));
    [14,15,16,17,18,19,20].forEach(i => emo += getVal(v[`khalfa_${i}`]));

    const total = func + soc + emo;

    return { func, soc, emo, total };
  };

  // =========================
  // ✅ HANDLE CHANGE
  // =========================
  const handleChange = (name, value) => {
    setValues((prev) => {
      const updated = { ...prev, [name]: value };

      const vas = computeVAS(updated);
      const hq = computeHQ(updated);
      const khalfa = computeKhalfa(updated);

      return {
        ...updated,

        // VAS
        vas_loudness_score: vas.loudness,
        vas_annoyance_score: vas.annoyance,
        vas_loudness_severity: vas.loudness_severity,
        vas_annoyance_severity: vas.annoyance_severity,

        // HQ
        hq_att: hq.att,
        hq_soc: hq.soc,
        hq_emo: hq.emo,
        hq_total: hq.total,

        // Khalfa
        khalfa_func: khalfa.func,
        khalfa_soc: khalfa.soc,
        khalfa_emo: khalfa.emo,
        khalfa_total: khalfa.total
      };
    });
  };

  // =========================
  // ✅ SCHEMA
  // =========================

  const schema = {
    title: "Additional Hyperacusis Profile",
    actions: [{ type: "back", label: "Back" }],

    sections: [
      {
        title: null, // Single unified section
        fields: [
          // =========================
          // CASE HISTORY
          // =========================
          { type: "subheading", label: "Case History (Hyperacusis)" },

          { name: "onset", label: "Onset", type: "input" },
          { name: "duration", label: "Duration", type: "input" },
          { name: "progression", label: "Progression", type: "input" },

          {
            name: "ears",
            label: "Ears affected",
            type: "radio",
            options: ["Right", "Left", "Bilateral"]
          },

          {
            name: "associated",
            label: "Associated symptoms",
            type: "radio",
            options: [
              "Hearing loss",
              "Vertigo",
              "Ear fullness",
              "Otalgia",
              "Hyperacusis",
              "Other"
            ]
          },

          { name: "triggers", label: "Triggering sounds", type: "input" },
          { name: "situations", label: "Situations", type: "input" },
          { name: "reaction", label: "Reaction to sound", type: "input" },
          { name: "impact", label: "Daily impact", type: "input" },

          // =========================
          // TOGGLES
          // =========================
          { type: "subheading", label: "Subjective Rating Scales" },

          { name: "enable_vas", label: "VAS", type: "radio", options: ["Yes", "No"] },
          { name: "enable_hq", label: "HQ", type: "radio", options: ["Yes", "No"] },
          { name: "enable_khalfa", label: "Khalfa", type: "radio", options: ["Yes", "No"] },

          // =========================
          // VAS
          // =========================
          { type: "subheading", label: "VAS", showIf: { field: "enable_vas", equals: "Yes" } },

          { name: "vas_loudness", label: "Loudness", type: "scale-slider", min: 0, max: 10, showIf: { field: "enable_vas", equals: "Yes" } },
          { name: "vas_loudness_severity", label: "Severity", type: "score-box", showIf: { field: "enable_vas", equals: "Yes" } },

          { name: "vas_annoyance", label: "Annoyance", type: "scale-slider", min: 0, max: 10, showIf: { field: "enable_vas", equals: "Yes" } },
          { name: "vas_annoyance_severity", label: "Severity", type: "score-box", showIf: { field: "enable_vas", equals: "Yes" } },

          // =========================
          // HQ
          // =========================
          { type: "subheading", label: "Hyperacusis Questionnaire (HQ)", showIf: { field: "enable_hq", equals: "Yes" } },

          ...HQ_QUESTIONS.map((q, i) => ({
            name: `hq_${i + 1}`,
            label: `${i + 1}. ${q}`,
            type: "radio-matrix",
            options: [
              { label: "No (0)", value: 0 },
              { label: "A little (1)", value: 1 },
              { label: "Quite a lot (2)", value: 2 },
              { label: "A lot (3)", value: 3 }
            ],
            showIf: { field: "enable_hq", equals: "Yes" }
          })),

          { name: "hq_att", label: "Attentional", type: "score-box", showIf: { field: "enable_hq", equals: "Yes" } },
          { name: "hq_soc", label: "Social", type: "score-box", showIf: { field: "enable_hq", equals: "Yes" } },
          { name: "hq_emo", label: "Emotional", type: "score-box", showIf: { field: "enable_hq", equals: "Yes" } },
          { name: "hq_total", label: "Total", type: "score-box", showIf: { field: "enable_hq", equals: "Yes" } },

          // =========================
          // KHALFA
          // =========================
          { type: "subheading", label: "Modified Khalfa Questionnaire", showIf: { field: "enable_khalfa", equals: "Yes" } },

          ...KHALFA_QUESTIONS.map((q, i) => ({
            name: `khalfa_${i + 1}`,
            label: `${i + 1}. ${q}`,
            type: "radio-matrix",
            options: [
              { label: "No (0)", value: 0 },
              { label: "Sometimes (2)", value: 2 },
              { label: "Yes (4)", value: 4 }
            ],
            showIf: { field: "enable_khalfa", equals: "Yes" }
          })),

          { name: "khalfa_func", label: "Functional", type: "score-box", showIf: { field: "enable_khalfa", equals: "Yes" } },
          { name: "khalfa_soc", label: "Social", type: "score-box", showIf: { field: "enable_khalfa", equals: "Yes" } },
          { name: "khalfa_emo", label: "Emotional", type: "score-box", showIf: { field: "enable_khalfa", equals: "Yes" } },
          { name: "khalfa_total", label: "Total", type: "score-box", showIf: { field: "enable_khalfa", equals: "Yes" } },

          // =========================
          // FUNCTIONAL IMPACT
          // =========================
          { type: "subheading", label: "Functional Impact" },

          { name: "work", label: "Work / Study", type: "input" },
          { name: "communication", label: "Communication", type: "input" },
          { name: "social", label: "Family / Social", type: "input" },
          { name: "rest", label: "Rest / Relaxation", type: "input" },
          { name: "noise", label: "Noise tolerance", type: "input" },

          // =========================
          // COUNSELING
          // =========================
          {
            type: "subheading",
            label: "Counseling Summary",
            showIf: { field: "mode", equals: "followup" }
          },

          { name: "understanding", label: "Understanding", type: "input", showIf: { field: "mode", equals: "followup" } },
          { name: "goals", label: "Goals", type: "input", showIf: { field: "mode", equals: "followup" } },
          { name: "motivation", label: "Motivation", type: "input", showIf: { field: "mode", equals: "followup" } },
          { name: "education", label: "Education", type: "input", showIf: { field: "mode", equals: "followup" } },
          { name: "next_steps", label: "Next steps", type: "input", showIf: { field: "mode", equals: "followup" } }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={{ ...values, mode }}
      onChange={handleChange}
      layout="nested"
      onAction={(type) => type === "back" && onBack()}
    />
  );
}

export function HyperacusisAdvancedFormObj({ onBack }) {
  const [values, setValues] = useState({});

  const FREQUENCIES = ["500", "1000", "2000", "4000"];

  const schema = {
    title: "Objective Hyperacusis Assessment",
    actions: [{ type: "back", label: "Back" }],

    sections: [
      {
        title: "Loudness Discomfort Levels (LDL)",
        fields: FREQUENCIES.flatMap((freq) => [
          {
            type: "subheading",
            label: `${freq} Hz`
          },
          {
            type: "row",
            fields: [
              {
                name: `ldl_r_${freq}`,
                label: "Right (dB HL)",
                type: "input"
              },
              {
                name: `ldl_l_${freq}`,
                label: "Left (dB HL)",
                type: "input"
              }
            ]
          }
        ])
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      layout="nested"
      onChange={(n, v) =>
        setValues((prev) => ({ ...prev, [n]: v }))
      }
      onAction={(type) => type === "back" && onBack?.()}
    />
  );
}