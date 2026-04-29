import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export function HyperacusisAdvancedForm({ onBack, mode }) {
  const [values, setValues] = useState({});
  const [scoresVisible, setScoresVisible] = useState(true);

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

  /* ── Calculations ── */
  const getVASSeverity = (score, type) => {
    if (score <= 2) return type === "annoyance" ? "No annoyance" : "Minimal";
    if (score <= 4) return "Mild";
    if (score <= 6) return "Moderate";
    if (score <= 8) return "Severe";
    return "Extreme";
  };

  const computeVAS = (v) => {
    const loudness  = Number(v.vas_loudness  || 0);
    const annoyance = Number(v.vas_annoyance || 0);
    return {
      loudness, annoyance,
      loudness_severity:  getVASSeverity(loudness),
      annoyance_severity: getVASSeverity(annoyance, "annoyance")
    };
  };

  const computeHQ = (v) => {
    const g = (x) => Number(v[`hq_${x}`] || 0);
    const att   = [1,2,3,4].reduce((s,i) => s + g(i), 0);
    const soc   = [5,6,7,8,9,10].reduce((s,i) => s + g(i), 0);
    const emo   = [11,12,13,14].reduce((s,i) => s + g(i), 0);
    return { att, soc, emo, total: att + soc + emo };
  };

  const computeKhalfa = (v) => {
    const g = (x) => Number(v[`khalfa_${x}`] || 0);
    const func = [1,2,3,4,5,6,7].reduce((s,i) => s + g(i), 0);
    const soc  = [8,9,10,11,12,13].reduce((s,i) => s + g(i), 0);
    const emo  = [14,15,16,17,18,19,20].reduce((s,i) => s + g(i), 0);
    return { func, soc, emo, total: func + soc + emo };
  };

  /* ── Handle change ── */
  const handleChange = (name, value) => {
    setValues((prev) => {
      const updated = { ...prev, [name]: value };
      const vas    = computeVAS(updated);
      const hq     = computeHQ(updated);
      const khalfa = computeKhalfa(updated);
      return {
        ...updated,
        vas_loudness_score:    vas.loudness,
        vas_annoyance_score:   vas.annoyance,
        vas_loudness_severity: vas.loudness_severity,
        vas_annoyance_severity:vas.annoyance_severity,
        hq_att: hq.att, hq_soc: hq.soc, hq_emo: hq.emo, hq_total: hq.total,
        khalfa_func: khalfa.func, khalfa_soc: khalfa.soc,
        khalfa_emo:  khalfa.emo,  khalfa_total: khalfa.total
      };
    });
  };

  /* ── Schema ── */
  const schema = {
    title: "Additional Hyperacusis Profile",
    enableScoreToggle: true,
    actions: [{ type: "toggle-show-scores" }, { type: "back", label: "Back" }],
    sections: [{
      title: null,
      fields: [
        { type: "subheading", label: "Case History (Hyperacusis)" },
        { name: "onset",       label: "Onset of Hyperacusis",      type: "input" },
        { name: "duration",    label: "Duration",                   type: "input" },
        { name: "progression", label: "Progression of symptoms",    type: "input" },
        { name: "ears",        label: "Ears affected", type: "radio",
          options: ["Right", "Left", "Bilateral"],
          showIf: { field: "mode", equals: "followup" } },
        { name: "associated", label: "Associated symptoms", type: "radio",
          options: ["Hearing loss","Vertigo","Ear fullness","Otalgia","Hyperacusis","Other"] },
        { name: "exposure", label: "Noise exposure history", type: "radio",
          options: ["Occupational","Recreational","None"] },
        { name: "triggers",   label: "Type of sounds that trigger discomfort", type: "input" },
        { name: "situations", label: "Situations where sound intolerance is most noticeable", type: "input" },
        { name: "reaction",   label: "Typical reaction to sound exposure", type: "input" },
        { name: "impact",     label: "Daily impact (work, sleep, social interaction)", type: "input" },

        { type: "subheading", label: "Subjective Rating Scales" },
        { name: "enable_vas",    label: "Visual Analog Scale (VAS)",              type: "radio", options: ["Yes","No"] },
        { name: "enable_hq",     label: "Hyperacusis Questionnaire (HQ)",         type: "radio", options: ["Yes","No"] },
        { name: "enable_khalfa", label: "Modified Khalfa Hyperacusis Questionnaire", type: "radio", options: ["Yes","No"] },

        /* VAS */
        { type: "subheading", label: "Visual Analog Scale (VAS)", showIf: { field: "enable_vas", equals: "Yes" } },
        { type: "info-text", text: "0 = none, 10 = worst possible", showIf: { field: "enable_vas", equals: "Yes" } },
        { name: "vas_loudness",  label: "VAS — Loudness Discomfort", type: "scale-slider", min: 0, max: 10, showIf: { field: "enable_vas", equals: "Yes" } },
        ...(scoresVisible ? [{ name: "vas_loudness_severity",  label: "Severity", type: "score-box", showIf: { field: "enable_vas", equals: "Yes" } }] : []),
        { name: "vas_annoyance", label: "VAS — Annoyance", type: "scale-slider", min: 0, max: 10, showIf: { field: "enable_vas", equals: "Yes" } },
        ...(scoresVisible ? [{ name: "vas_annoyance_severity", label: "Severity", type: "score-box", showIf: { field: "enable_vas", equals: "Yes" } }] : []),

        /* HQ */
        { type: "subheading", label: "Hyperacusis Questionnaire (HQ)", showIf: { field: "enable_hq", equals: "Yes" } },
        ...HQ_QUESTIONS.map((q, i) => ({
          name: `hq_${i + 1}`, label: `${i + 1}. ${q}`, type: "radio-matrix",
          options: scoresVisible
            ? [{ label: "No (0)", value: 0 }, { label: "A little (1)", value: 1 }, { label: "Quite a lot (2)", value: 2 }, { label: "A lot (3)", value: 3 }]
            : [{ label: "No",     value: 0 }, { label: "A little",     value: 1 }, { label: "Quite a lot",     value: 2 }, { label: "A lot",     value: 3 }],
          showIf: { field: "enable_hq", equals: "Yes" }
        })),
        ...(scoresVisible ? [
          { name: "hq_att",   label: "Attentional", type: "score-box", showIf: { field: "enable_hq", equals: "Yes" } },
          { name: "hq_soc",   label: "Social",      type: "score-box", showIf: { field: "enable_hq", equals: "Yes" } },
          { name: "hq_emo",   label: "Emotional",   type: "score-box", showIf: { field: "enable_hq", equals: "Yes" } },
          { name: "hq_total", label: "Total",        type: "score-box", showIf: { field: "enable_hq", equals: "Yes" } },
        ] : []),

        /* Khalfa */
        { type: "subheading", label: "Modified Khalfa Questionnaire", showIf: { field: "enable_khalfa", equals: "Yes" } },
        ...KHALFA_QUESTIONS.map((q, i) => ({
          name: `khalfa_${i + 1}`, label: `${i + 1}. ${q}`, type: "radio-matrix",
          options: scoresVisible
            ? [{ label: "No (0)", value: 0 }, { label: "Sometimes (2)", value: 2 }, { label: "Yes (4)", value: 4 }]
            : [{ label: "No",     value: 0 }, { label: "Sometimes",     value: 2 }, { label: "Yes",     value: 4 }],
          showIf: { field: "enable_khalfa", equals: "Yes" }
        })),
        ...(scoresVisible ? [
          { name: "khalfa_func",  label: "Functional", type: "score-box", showIf: { field: "enable_khalfa", equals: "Yes" } },
          { name: "khalfa_soc",   label: "Social",     type: "score-box", showIf: { field: "enable_khalfa", equals: "Yes" } },
          { name: "khalfa_emo",   label: "Emotional",  type: "score-box", showIf: { field: "enable_khalfa", equals: "Yes" } },
          { name: "khalfa_total", label: "Total",      type: "score-box", showIf: { field: "enable_khalfa", equals: "Yes" } },
        ] : []),

        { type: "subheading", label: "Functional and Daily Life Impact for hyperacusis" },
        { name: "work",          label: "Work / Study",                    type: "input" },
        { name: "communication", label: "Communication",                   type: "input" },
        { name: "social",        label: "Family / Social",                 type: "input" },
        { name: "rest",          label: "Relaxation / Rest",               type: "input" },
        { name: "noise",         label: "Outdoor / Public noise tolerance", type: "input" },

        { type: "subheading", label: "Counseling Summary", showIf: { field: "mode", equals: "followup" } },
        { name: "understanding", label: "Patient's understanding of tinnitus",  type: "input", showIf: { field: "mode", equals: "followup" } },
        { name: "goals",         label: "Expectations / goals",                 type: "input", showIf: { field: "mode", equals: "followup" } },
        { name: "motivation",    label: "Motivation for therapy",               type: "input", showIf: { field: "mode", equals: "followup" } },
        { name: "education",     label: "Education & counseling provided",      type: "input", showIf: { field: "mode", equals: "followup" } },
        { name: "next_steps",    label: "Recommended next steps",               type: "input", showIf: { field: "mode", equals: "followup" } }
      ]
    }]
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={{ ...values, mode }}
      onChange={handleChange}
      layout="nested"
      showScores={scoresVisible}
      onAction={(type) => {
        if (type === "toggle-show-scores") setScoresVisible(v => !v);
        if (type === "back") onBack();
      }}
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
        fields: [
          ...FREQUENCIES.flatMap((freq) => [
            { type: "subheading", label: `${freq} Hz` },
            {
              type: "row",
              cols: 2,
              fields: [
                {
                  name: `ldl_r_${freq}`,
                  label: "Right Ear (dB HL)",
                  type: "input"
                },
                {
                  name: `ldl_l_${freq}`,
                  label: "Left Ear (dB HL)",
                  type: "input"
                }
              ]
            }
          ]),

          {
            type: "subheading",
            label: "Special Test"
          },
          {
            name: "special_test",
            label: "Details",
            type: "input"
          },

          {
            type: "subheading",
            label: "Intervention: Counselling"
          },
          {
            type: "row",
            cols: 2,
            fields: [
              {
                name: "counselling_option",
                label: "Required ?",
                type: "radio",
                options: [
                  { label: "No", value: 0 },
                  { label: "Yes", value: 1 }
                ]
              },
              {
                name: "counselling_notes",
                label: "Remarks",
                type: "input"
              }
            ]
          },

          {
            type: "subheading",
            label: "Intervention: Sound Desensitisation / Sound Tolerance Training"
          },
          {
            type: "row",
            cols: 2,
            fields: [
              {
                name: "sound_option",
                label: "Required ?",
                type: "radio",
                options: [
                  { label: "No", value: 0 },
                  { label: "Yes", value: 1 }
                ]
              },
              {
                name: "sound_notes",
                label: "Remarks",
                type: "input"
              }
            ]
          },

          {
            type: "subheading",
            label: "Intervention: Hearing Aids / Assistive Devices"
          },
          {
            type: "row",
            cols: 2,
            fields: [
              {
                name: "hearingaid_option",
                label: "Required ?",
                type: "radio",
                options: [
                  { label: "No", value: 0 },
                  { label: "Yes", value: 1 }
                ]
              },
              {
                name: "hearingaid_notes",
                label: "Remarks",
                type: "input"
              }
            ]
          },

          {
            type: "subheading",
            label: "Intervention: Environmental Modification"
          },
          {
            type: "row",
            cols: 2,
            fields: [
              {
                name: "environment_option",
                label: "Required ?",
                type: "radio",
                options: [
                  { label: "No", value: 0 },
                  { label: "Yes", value: 1 }
                ]
              },
              {
                name: "environment_notes",
                label: "Remarks",
                type: "input"
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      layout="nested"
      onChange={(n, v) => setValues((prev) => ({ ...prev, [n]: v }))}
      onAction={(type) => type === "back" && onBack?.()}
    />
  );
}
