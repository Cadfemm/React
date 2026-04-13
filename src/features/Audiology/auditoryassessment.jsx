import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export function AuditoryAdvancedForm({ onBack, mode }) {
  const [values, setValues] = useState({});

  const HHIA_QUESTIONS = [
    "Does a hearing problem cause you to use the phone less often than you would like?",
    "Does a hearing problem cause you to feel embarrassed when meeting new people?",
    "Does a hearing problem cause you to avoid groups of people?",
    "Does a hearing problem make you irritable?",
    "Does a hearing problem cause you to feel frustrated when talking to members of your family?",
    "Does a hearing problem cause you difficulty when attending a party?",
    "Does a hearing problem cause you difficulty hearing/understanding coworkers, clients, or customers?",
    "Do you feel handicapped by a hearing problem?",
    "Does a hearing problem cause you difficulty when visiting friends, relatives or neighbors?",
    "Does a hearing problem cause you to feel frustrated when talking to coworkers or clients?",
    "Does a hearing problem cause you difficulty in the movies or theater?",
    "Does a hearing problem cause you to be nervous?",
    "Does a hearing problem cause you to visit friends/relatives less often than you would like?",
    "Does a hearing problem cause you to have arguments with family members?",
    "Does a hearing problem cause you difficulty when listening to TV or radio?",
    "Does a hearing problem cause you to go shopping less often than you would like?",
    "Does any problem or difficulty with your hearing upset you at all?",
    "Does a hearing problem cause you to want to be by yourself?",
    "Does a hearing problem cause you to talk to family members less often than you would like?",
    "Do you feel that any difficulty with your hearing limits your personal or social life?",
    "Does a hearing problem cause you difficulty in a restaurant with relatives or friends?",
    "Does a hearing problem cause you to feel depressed?",
    "Does a hearing problem cause you to listen to TV or radio less than you would like?",
    "Does a hearing problem cause you to feel uncomfortable when talking to friends?",
    "Does a hearing problem cause you to feel left out when you are with a group of people?"
  ];

  // =========================
  // ✅ CALCULATIONS
  // =========================

  const computeHHIA = (v) => {
    let social = 0;
    let emotional = 0;

    const getVal = (x) => Number(x || 0);

    const socialQs = [1,3,6,7,9,11,13,15,16,19,21,23];
    const emotionalQs = [2,4,5,8,10,12,14,17,18,20,22,24,25];

    socialQs.forEach(i => social += getVal(v[`hhia_${i}`]));
    emotionalQs.forEach(i => emotional += getVal(v[`hhia_${i}`]));

    const total = social + emotional;

    const totalPercent = (total / 100) * 100;
    const socialPercent = (social / 48) * 100;
    const emotionalPercent = (emotional / 52) * 100;

    let interpretation = "";
    if (totalPercent <= 16) interpretation = "No handicap";
    else if (totalPercent <= 42) interpretation = "Mild to Moderate";
    else interpretation = "Significant";

    return {
      social,
      emotional,
      total,
      totalPercent: totalPercent.toFixed(1),
      socialPercent: socialPercent.toFixed(1),
      emotionalPercent: emotionalPercent.toFixed(1),
      interpretation
    };
  };

  // =========================
  // ✅ HANDLE CHANGE
  // =========================
  const handleChange = (name, value) => {
    setValues((prev) => {
      const updated = { ...prev, [name]: value };

      const hhia = computeHHIA(updated);

      return {
        ...updated,

        hhia_social: hhia.social,
        hhia_emotional: hhia.emotional,
        hhia_total: hhia.total,

        hhia_total_percent: hhia.totalPercent,
        hhia_social_percent: hhia.socialPercent,
        hhia_emotional_percent: hhia.emotionalPercent,

        hhia_interpretation: hhia.interpretation
      };
    });
  };

  // =========================
  // ✅ SCHEMA
  // =========================

  const schema = {
    title: "Additional Auditory Profile",
    actions: [{ type: "back", label: "Back" }],

    sections: [
      {
        title: null, // Single unified section
        fields: [
          // =========================
          // SUBJECTIVE SCALES
          // =========================
          { type: "subheading", label: "Subjective Rating Scales" },

          { name: "emotional_vas", label: "Emotional (0–10)", type: "scale-slider", min: 0, max: 10 },
          { name: "social_vas", label: "Social / Situational (0–10)", type: "scale-slider", min: 0, max: 10 },

          // =========================
          // HHIA
          // =========================
          { type: "subheading", label: "HHIA (Hearing Handicap Inventory for Adults)" },

          ...HHIA_QUESTIONS.map((q, i) => ({
            name: `hhia_${i + 1}`,
            label: `${i + 1}. ${q}`,
            type: "radio-matrix",
            options: [
              { label: "No (0)", value: 0 },
              { label: "Sometimes (2)", value: 2 },
              { label: "Yes (4)", value: 4 }
            ]
          })),

          { type: "info-text", text: "Scoring: No=0, Sometimes=2, Yes=4" },

          { name: "hhia_social", label: "Social Score (/48)", type: "score-box" },
          { name: "hhia_emotional", label: "Emotional Score (/52)", type: "score-box" },
          { name: "hhia_total", label: "Total Score (/100)", type: "score-box" },

          { name: "hhia_social_percent", label: "Social %", type: "score-box" },
          { name: "hhia_emotional_percent", label: "Emotional %", type: "score-box" },
          { name: "hhia_total_percent", label: "Total %", type: "score-box" },

          { name: "hhia_interpretation", label: "Interpretation", type: "score-box" },

          // =========================
          // COSI - PRE
          // =========================
          { type: "subheading", label: "COSI – Pre Intervention" },

          ...Array.from({ length: 5 }).map((_, i) => ([
            {
              name: `cosi_goal_${i + 1}`,
              label: `Goal ${i + 1}`,
              type: "input"
            },
            {
              name: `cosi_priority_${i + 1}`,
              label: "Priority (1–5)",
              type: "radio",
              options: ["1","2","3","4","5"]
            }
          ])).flat(),

          // =========================
          // COSI - CHANGE
          // =========================
          { type: "subheading", label: "COSI – Degree of Change" },

          ...Array.from({ length: 5 }).map((_, i) => ({
            name: `cosi_change_${i + 1}`,
            label: `Goal ${i + 1}`,
            type: "radio",
            options: ["Much better", "Better", "Slightly better", "No change", "Worse"]
          })),

          // =========================
          // COSI - FINAL
          // =========================
          { type: "subheading", label: "COSI – Final Ability" },

          ...Array.from({ length: 5 }).map((_, i) => ({
            name: `cosi_final_${i + 1}`,
            label: `Goal ${i + 1}`,
            type: "radio",
            options: [
              "Hardly ever",
              "Occasionally",
              "Half the time",
              "Most of the time",
              "Almost always"
            ]
          })),

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

export function AuditoryAdvancedFormObj({ onBack }) {
  const [values, setValues] = useState({});

  const FREQUENCIES = ["500", "1000", "2000", "4000"];

  const reflexOptions = [
    { label: "Present", value: 0 },
    { label: "Elevated", value: 1 },
    { label: "Absent", value: 2 }
  ];

  const thresholdOptions = Array.from({ length: 21 }).map((_, i) => ({
    label: `${i * 5}`,
    value: i * 5
  }));

  const schema = {
    title: "Objective Auditory Assessment",
    actions: [{ type: "back", label: "Back" }],

    sections: [
      // =========================
      // ACOUSTIC REFLEX
      // =========================
      {
        title: "Acoustic Reflex",
        fields: FREQUENCIES.flatMap(freq => [
          {
            type: "subheading",
            label: `${freq} Hz`
          },
          {
            name: `ipsi_r_${freq}`,
            label: "Ipsilateral Right",
            type: "radio",
            options: reflexOptions
          },
          {
            name: `ipsi_l_${freq}`,
            label: "Ipsilateral Left",
            type: "radio",
            options: reflexOptions
          },
          {
            name: `contra_r_${freq}`,
            label: "Contralateral Right Stim",
            type: "radio",
            options: reflexOptions
          },
          {
            name: `contra_l_${freq}`,
            label: "Contralateral Left Stim",
            type: "radio",
            options: reflexOptions
          },
          {
            name: `reflex_impression_${freq}`,
            label: "Impression",
            type: "textarea"
          }
        ])
      },

      // =========================
      // ETF
      // =========================
      {
        title: "Eustachian Tube Function",
        fields: [
          {
            name: "etf_right",
            label: "Right Ear",
            type: "radio",
            options: [
              { label: "Normal", value: 0 },
              { label: "Reduced", value: 1 },
              { label: "Absent", value: 2 }
            ]
          },
          {
            name: "etf_left",
            label: "Left Ear",
            type: "radio",
            options: [
              { label: "Normal", value: 0 },
              { label: "Reduced", value: 1 },
              { label: "Absent", value: 2 }
            ]
          }
        ]
      },

      // =========================
      // SPEECH
      // =========================
      {
        title: "Speech Test",
        fields: [
          { name: "srt_r", label: "SRT Right", type: "input" },
          { name: "srt_l", label: "SRT Left", type: "input" },
          { name: "wrs_r", label: "WRS Right", type: "input" },
          { name: "wrs_l", label: "WRS Left", type: "input" },
          { name: "speech_remark", label: "Remarks", type: "textarea" }
        ]
      },

      // =========================
      // ASSR
      // =========================
      {
        title: "ASSR",
        fields: FREQUENCIES.flatMap(freq => [
          {
            name: `assr_r_${freq}`,
            label: `${freq} Hz Right`,
            type: "select",
            options: thresholdOptions
          },
          {
            name: `assr_l_${freq}`,
            label: `${freq} Hz Left`,
            type: "select",
            options: thresholdOptions
          }
        ])
      },

      // =========================
      // ABR
      // =========================
      {
        title: "ABR",
        fields: [
          { name: "abr_r", label: "Right Ear", type: "textarea" },
          { name: "abr_l", label: "Left Ear", type: "textarea" },
          { name: "abr_impression", label: "Impression", type: "textarea" }
        ]
      },

      // =========================
      // ELECTROPHYSIOLOGY
      // =========================
      {
        title: "Electrophysiology",
        fields: [
          { name: "ep_r", label: "Right Ear", type: "textarea" },
          { name: "ep_l", label: "Left Ear", type: "textarea" },
          { name: "ep_impression", label: "Impression", type: "textarea" }
        ]
      },

      // =========================
      // SPECIAL TEST
      // =========================
      {
        title: "Special Test",
        fields: [
          { name: "special_test", label: "Details", type: "textarea" }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      layout="nested"
      onChange={(n, v) => setValues(prev => ({ ...prev, [n]: v }))}
      onAction={(type) => type === "back" && onBack?.()}
    />
  );
}