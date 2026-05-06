import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export function HyperacusisAdvancedForm({ onBack, mode }) {
  const [values, setValues] = useState({});
  const [vasScoresVisible, setVasScoresVisible] = useState(true);
  const [hqScoresVisible, setHqScoresVisible] = useState(true);
  const [khalfaScoresVisible, setKhalfaScoresVisible] = useState(true);

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
        vas_loudness_score:     vas.loudness,
        vas_annoyance_score:    vas.annoyance,
        vas_loudness_severity:  vas.loudness_severity,
        vas_annoyance_severity: vas.annoyance_severity,
        hq_att: hq.att, hq_soc: hq.soc, hq_emo: hq.emo, hq_total: hq.total,
        khalfa_func: khalfa.func, khalfa_soc: khalfa.soc,
        khalfa_emo:  khalfa.emo,  khalfa_total: khalfa.total
      };
    });
  };

  // ══════════════════════════════════════════════════════════
  // MAIN SCHEMA — title + Back button + case history + scale selectors
  // ══════════════════════════════════════════════════════════
  const mainSchema = {
    title: "Additional Hyperacusis Profile",
    actions: [{ type: "back", label: "Back" }],
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
         {
            name: "associated",
            label: "Associated symptoms",
            type: "checkbox-group",
            options: [
              { label: "None", value: "associated_none" },
              { label: "Hearing loss", value: "hearing_loss" },
              { label: "Vertigo", value: "vertigo" },
              { label: "Ear fullness", value: "ear_fullness" },
              { label: "Otalgia", value: "otalgia" },
              // { label: "Hyperacusis", value: "hyperacusis" },
              { label: "Other", value: "other" }
            ]
          },
          {
            name: "associated_details",
            label: "Specify",
            type: "textarea",
            showIf: { field: "associated", notEmpty: true }
          },
        {
            name: "exposure",
            label: "Noise exposure history",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none" },
              { label: "Recreational", value: "recreational" },
              { label: "Occupational", value: "occupational" }
            ]
          },
          {
            name: "exposure_details",
            label: "Specify",
            type: "textarea",
            showIf: { field: "exposure", notEmpty: true }
          },
        { name: "triggers",   label: "Type of sounds that trigger discomfort", type: "input" },
        { name: "situations", label: "Situations where sound intolerance is most noticeable", type: "input" },
        { name: "reaction",   label: "Typical reaction to sound exposure", type: "input" },
        { name: "impact",     label: "Daily impact (work, sleep, social interaction)", type: "input" },

        { type: "subheading", label: "Subjective Rating Scales" },
        { name: "enable_vas",    label: "Visual Analog Scale (VAS)",                  type: "radio", options: ["Yes","No"] },
        { name: "enable_hq",     label: "Hyperacusis Questionnaire (HQ)",             type: "radio", options: ["Yes","No"] },
        { name: "enable_khalfa", label: "Modified Khalfa Hyperacusis Questionnaire",  type: "radio", options: ["Yes","No"] }
      ]
    }]
  };

  // ══════════════════════════════════════════════════════════
  // VAS SCHEMA — own Doctor View toggle
  // ══════════════════════════════════════════════════════════
  const vasSchema = {
    title: "Visual Analog Scale (VAS)",
    enableScoreToggle: true,
    actions: [{ type: "toggle-show-scores" }],
    sections: [{
      title: null,
      fields: [
        { type: "info-text", text: "0 = none, 10 = worst possible" },
        { name: "vas_loudness",  label: "VAS — Loudness Discomfort", type: "scale-slider", min: 0, max: 10 },
        ...(vasScoresVisible ? [{ name: "vas_loudness_severity",  label: "Severity", type: "score-box" }] : []),
        { name: "vas_annoyance", label: "VAS — Annoyance", type: "scale-slider", min: 0, max: 10 },
        ...(vasScoresVisible ? [{ name: "vas_annoyance_severity", label: "Severity", type: "score-box" }] : [])
      ]
    }]
  };

  // ══════════════════════════════════════════════════════════
  // HQ SCHEMA — own Doctor View toggle
  // ══════════════════════════════════════════════════════════
  const hqSchema = {
    title: "Hyperacusis Questionnaire (HQ)",
    enableScoreToggle: true,
    actions: [{ type: "toggle-show-scores" }],
    sections: [{
      title: null,
      fields: [
        ...HQ_QUESTIONS.map((q, i) => ({
          name: `hq_${i + 1}`, label: `${i + 1}. ${q}`, type: "radio-matrix",
          options: hqScoresVisible
            ? [{ label: "No (0)", value: 0 }, { label: "A little (1)", value: 1 }, { label: "Quite a lot (2)", value: 2 }, { label: "A lot (3)", value: 3 }]
            : [{ label: "No",     value: 0 }, { label: "A little",     value: 1 }, { label: "Quite a lot",     value: 2 }, { label: "A lot",     value: 3 }]
        })),
        ...(hqScoresVisible ? [
          { name: "hq_att",   label: "Attentional", type: "score-box" },
          { name: "hq_soc",   label: "Social",      type: "score-box" },
          { name: "hq_emo",   label: "Emotional",   type: "score-box" },
          { name: "hq_total", label: "Total",        type: "score-box" }
        ] : [])
      ]
    }]
  };

  // ══════════════════════════════════════════════════════════
  // KHALFA SCHEMA — own Doctor View toggle
  // ══════════════════════════════════════════════════════════
  const khalfaSchema = {
    title: "Modified Khalfa Questionnaire",
    enableScoreToggle: true,
    actions: [{ type: "toggle-show-scores" }],
    sections: [{
      title: null,
      fields: [
        ...KHALFA_QUESTIONS.map((q, i) => ({
          name: `khalfa_${i + 1}`, label: `${i + 1}. ${q}`, type: "radio-matrix",
          options: khalfaScoresVisible
            ? [{ label: "No (0)", value: 0 }, { label: "Sometimes (2)", value: 2 }, { label: "Yes (4)", value: 4 }]
            : [{ label: "No",     value: 0 }, { label: "Sometimes",     value: 2 }, { label: "Yes",     value: 4 }]
        })),
        ...(khalfaScoresVisible ? [
          { name: "khalfa_func",  label: "Functional", type: "score-box" },
          { name: "khalfa_soc",   label: "Social",     type: "score-box" },
          { name: "khalfa_emo",   label: "Emotional",  type: "score-box" },
          { name: "khalfa_total", label: "Total",      type: "score-box" }
        ] : [])
      ]
    }]
  };

  // ══════════════════════════════════════════════════════════
  // FUNCTIONAL IMPACT & COUNSELING SCHEMA — no toggle
  // ══════════════════════════════════════════════════════════
  const lifestyleSchema = {
    sections: [{
      title: null,
      fields: [
        { type: "subheading", label: "Functional and Daily Life Impact for hyperacusis" },
        { name: "work",          label: "Work / Study",                     type: "input" },
        { name: "communication", label: "Communication",                    type: "input" },
        { name: "social",        label: "Family / Social",                  type: "input" },
        { name: "rest",          label: "Relaxation / Rest",                type: "input" },
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

  const allValues = { ...values, mode };

  return (
    <div>
      {/* Main form: title + Back button + case history + scale selectors */}
      <CommonFormBuilder
        schema={mainSchema}
        values={allValues}
        onChange={handleChange}
        layout="nested"
        onAction={(type) => {
          if (type === "back") onBack();
        }}
      />

      {/* VAS — only when enabled, with its own Doctor View toggle */}
      {values.enable_vas === "Yes" && (
        <CommonFormBuilder
          schema={vasSchema}
          values={allValues}
          onChange={handleChange}
          layout="nested"
          showScores={vasScoresVisible}
          onAction={(type) => {
            if (type === "toggle-show-scores") setVasScoresVisible(v => !v);
          }}
        />
      )}

      {/* HQ — only when enabled, with its own Doctor View toggle */}
      {values.enable_hq === "Yes" && (
        <CommonFormBuilder
          schema={hqSchema}
          values={allValues}
          onChange={handleChange}
          layout="nested"
          showScores={hqScoresVisible}
          onAction={(type) => {
            if (type === "toggle-show-scores") setHqScoresVisible(v => !v);
          }}
        />
      )}

      {/* Khalfa — only when enabled, with its own Doctor View toggle */}
      {values.enable_khalfa === "Yes" && (
        <CommonFormBuilder
          schema={khalfaSchema}
          values={allValues}
          onChange={handleChange}
          layout="nested"
          showScores={khalfaScoresVisible}
          onAction={(type) => {
            if (type === "toggle-show-scores") setKhalfaScoresVisible(v => !v);
          }}
        />
      )}

      {/* Functional impact & counseling — no toggle */}
      <CommonFormBuilder
        schema={lifestyleSchema}
        values={allValues}
        onChange={handleChange}
        layout="nested"
      />
    </div>
  );
}

export function HyperacusisAdvancedFormObj({ onBack }) {
  const [values, setValues] = useState({});

  const FREQUENCIES = ["500", "1000", "2000", "4000"];

  const schema = {
    title: "Hyperacusis Assessment",
    actions: [{ type: "back", label: "Back" }],

    sections: [
    {
    title: null,
    fields: [
      {
        type: "accordion",
        name: "ldl_section",
        label: "Loudness Discomfort Levels (LDL)",
        defaultOpen: false,

        children: [
          {
            type: "refraction-12col",
            name: "ldl_matrix",
            cornerLabel: "Frequency",
            cornerLikeGroupHeader: true,
            showColumnHeaders: true,
            showGroupHeaders: false,

            groups: [
              {
                label: null,
                columns: [
                  { key: "Right Ear (dB HL)" },
                  { key: "Left Ear (dB HL)" }
                ]
              }
            ],

            rows: FREQUENCIES.map(freq => ({
              value: freq,
              label: `${freq} Hz`,
              columns: [
                { type: "input" },
                { type: "input" }
              ]
            }))
          }
        ]
      },
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
        type: "accordion",
        name: "intervention_section",
        label: "Interventions",
        defaultOpen: false,

        children: [
          {
            type: "refraction-12col",
            name: "intervention_matrix",

            cornerLabel: "",
            cornerLikeGroupHeader: false,
            showColumnHeaders: true,

            groups: [
              {
                label: "",
                columns: [
                  { key: "Yes / No" },
                  { key: "Remarks" }
                ]
              }
            ],

            rows: [
              {
                value: "counselling",
                label: "Counselling",
                columns: [
                  {
                    type: "select",
                    options: [
                      { label: "No", value: 0 },
                      { label: "Yes", value: 1 }
                    ]
                  },
                  { type: "input" }
                ]
              },
              {
                value: "sound",
                label: "Sound Desensitisation / Sound Tolerance Training",
                columns: [
                  {
                    type: "select",
                    options: [
                      { label: "No", value: 0 },
                      { label: "Yes", value: 1 }
                    ]
                  },
                  { type: "input" }
                ]
              },
              {
                value: "hearingaid",
                label: "Hearing Aids / Assistive Devices",
                columns: [
                  {
                    type: "select",
                    options: [
                      { label: "No", value: 0 },
                      { label: "Yes", value: 1 }
                    ]
                  },
                  { type: "input" }
                ]
              },
              {
                value: "environment",
                label: "Environmental Modification",
                columns: [
                  {
                    type: "select",
                    options: [
                      { label: "No", value: 0 },
                      { label: "Yes", value: 1 }
                    ]
                  },
                  { type: "input" }
                ]
              }
            ]
          }
        ]
      },
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
