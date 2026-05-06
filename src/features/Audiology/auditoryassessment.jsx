import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";
import {Hearingaidtrial } from "../Audiology/hearingaidtrial";

export function AuditoryAdvancedForm({ onBack, mode }) {
  const [values, setValues] = useState({});
  const [vasScoresVisible, setVasScoresVisible] = useState(true);
  const [hhiaScoresVisible, setHhiaScoresVisible] = useState(true);

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
  // CALCULATIONS
  // =========================
  const getSeverityLabel = (score) => {
    const val = Number(score || 0);
    if (val <= 2) return "Minimal";
    if (val <= 4) return "Mild";
    if (val <= 6) return "Moderate";
    if (val <= 8) return "Severe";
    return "Very Severe";
  };

  const computeHHIA = (v) => {
    let social = 0;
    let emotional = 0;

    const getVal = (x) => Number(x || 0);

    const socialQs    = [1,3,6,7,9,11,13,15,16,19,21,23];
    const emotionalQs = [2,4,5,8,10,12,14,17,18,20,22,24,25];

    socialQs.forEach(i    => social    += getVal(v[`hhia_${i}`]));
    emotionalQs.forEach(i => emotional += getVal(v[`hhia_${i}`]));

    const total = social + emotional;
    const totalPercent    = (total    / 100) * 100;
    const socialPercent   = (social   / 48)  * 100;
    const emotionalPercent= (emotional/ 52)  * 100;

    let interpretation = "";
    if (totalPercent <= 16) interpretation = "No handicap";
    else if (totalPercent <= 42) interpretation = "Mild to Moderate";
    else interpretation = "Significant";

    return {
      social, emotional, total,
      totalPercent:     totalPercent.toFixed(1),
      socialPercent:    socialPercent.toFixed(1),
      emotionalPercent: emotionalPercent.toFixed(1),
      interpretation
    };
  };

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (name, value) => {
    setValues((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "emotional_vas") {
        updated.emotional_severity = getSeverityLabel(value);
      }
      if (name === "social_vas") {
        updated.social_severity = getSeverityLabel(value);
      }

      if (name.startsWith("hhia_")) {
        const hhia = computeHHIA(updated);
        return {
          ...updated,
          hhia_social:             hhia.social,
          hhia_emotional:          hhia.emotional,
          hhia_total:              hhia.total,
          hhia_total_percent:      hhia.totalPercent,
          hhia_social_percent:     hhia.socialPercent,
          hhia_emotional_percent:  hhia.emotionalPercent,
          hhia_interpretation:     hhia.interpretation
        };
      }

      return updated;
    });
  };

  // =========================
  // SCHEMAS
  // =========================

  // Main: title + Back button (no scales here — scales are always shown)
  const mainSchema = {
    title: "Additional Auditory Profile",
    actions: [{ type: "back", label: "Back" }],
    sections: [{
      title: null,
      fields: [
      {
        name: "enable_vas",
        label: "Subjective Rating Scales (Hearing Loss)",
        type: "radio",
        options: ["Yes", "No"]
      },
      {
        name: "enable_hhia",
        label: "HHIA (Hearing Handicap Inventory for Adults)",
        type: "radio",
        options: ["Yes", "No"]
      },
      {
        name: "enable_cosi",
        label: "COSI (Client Oriented Scale of Improvement)",
        type: "radio",
        options: ["Yes", "No"]
      }
      ]
    }]
  };

  // VAS - own Doctor View toggle
  const vasSchema = {
    title: "Subjective Rating Scales (Hearing Loss)",
    enableScoreToggle: true,
    actions: [{ type: "toggle-show-scores" }],
    sections: [{
      title: null,
      fields: [
        { type: "info-text", text: "0 = none, 10 = worst possible" },
        { name: "emotional_vas", label: "Analogue Scale : Emotional (0-10)", type: "scale-slider", min: 0, max: 10 },
        ...(vasScoresVisible ? [{ name: "emotional_severity", label: "Emotional Severity", type: "score-box" }] : []),
        { name: "social_vas", label: "Analogue Scale : Social / Situational (0-10)", type: "scale-slider", min: 0, max: 10 },
        ...(vasScoresVisible ? [{ name: "social_severity", label: "Social Severity", type: "score-box" }] : [])
      ]
    }]
  };

  // HHIA - own Doctor View toggle
  const hhiaSchema = {
    title: "HHIA (Hearing Handicap Inventory for Adults)",
    enableScoreToggle: true,
    actions: [{ type: "toggle-show-scores" }],
    sections: [{
      title: null,
      fields: [
        ...HHIA_QUESTIONS.map((q, i) => ({
          name: `hhia_${i + 1}`,
          label: `${i + 1}. ${q}`,
          type: "radio-matrix",
          options: hhiaScoresVisible
            ? [{ label: "No (0)", value: 0 }, { label: "Sometimes (2)", value: 2 }, { label: "Yes (4)", value: 4 }]
            : [{ label: "No", value: 0 }, { label: "Sometimes", value: 2 }, { label: "Yes", value: 4 }]
        })),
        { type: "info-text", text: "Scoring: No=0, Sometimes=2, Yes=4" },
        ...(hhiaScoresVisible ? [
          { name: "hhia_social",            label: "Social Score (/48)",    type: "score-box" },
          { name: "hhia_emotional",         label: "Emotional Score (/52)", type: "score-box" },
          { name: "hhia_total",             label: "Total Score (/100)",    type: "score-box" },
          { name: "hhia_social_percent",    label: "Social %",              type: "score-box" },
          { name: "hhia_emotional_percent", label: "Emotional %",           type: "score-box" },
          { name: "hhia_total_percent",     label: "Total %",               type: "score-box" },
          { name: "hhia_interpretation",    label: "Interpretation",        type: "score-box" }
        ] : [])
      ]
    }]
  };

  // COSI + Counseling - no toggle
  const cosiSchema = {
    sections: [{
      title: null,
      fields: [
        { type: "subheading", label: "Client oriented scale of improvement (COSI)" },
        {
          type: "checkbox-group",
          name: "hearing_situations",
          label: "Step 1: Pre-Intervention - Identify Listening Goals. Choose 5 goals",
          options: [
            { label: "Conversation with 1 or 2 in quiet",    value: "conversation_1_2_quiet" },
            { label: "Conversation with 1 or 2 in noise",    value: "conversation_1_2_noise" },
            { label: "Conversation with group in quiet",     value: "conversation_group_quiet" },
            { label: "Conversation with group in noise",     value: "conversation_group_noise" },
            { label: "Television/Radio @ normal volume",     value: "tv_radio_normal_volume" },
            { label: "Familiar speaker on phone",            value: "familiar_speaker_phone" },
            { label: "Unfamiliar speaker on phone",          value: "unfamiliar_speaker_phone" },
            { label: "Hearing phone ring from another room", value: "phone_ring_other_room" },
            { label: "Hear front door bell or knock",        value: "door_bell_knock" },
            { label: "Hear traffic",                         value: "hear_traffic" },
            { label: "Increased social contact",             value: "increased_social_contact" },
            { label: "Feel embarrassed or stupid",           value: "feel_embarrassed_stupid" },
            { label: "Feeling left out",                     value: "feeling_left_out" },
            { label: "Feeling upset or angry",               value: "feeling_upset_angry" },
            { label: "Church or meeting",                    value: "church_meeting" },
            { label: "Other",                                value: "other" }
          ]
        },
        { type: "info-text", label: "In which specific situations do you most want to hear better?" },
        {
          type: "dynamic-section",
          name: "cosi_goals",
          fields: [
            { name: "goal",     label: "Goal",           type: "input" },
            { name: "priority", label: "Priority (1-5)", type: "radio", options: ["1", "2", "3", "4", "5"] }
          ]
        },

        { type: "info-text", label: "Step-2: Post-Intervention - Degree of Change", showIf: { field: "mode", equals: "followup" } },
        {
          type: "dynamic-section",
          name: "cosi_change",
          showIf: { field: "mode", equals: "followup" },
          fields: [
            { name: "goal",   label: "Goal",             type: "input" },
            { name: "change", label: "Degree of Change", type: "radio",
              options: ["Much better","Better","Slightly better","No change","Worse"] }
          ]
        },

        { type: "info-text", label: "Step 3: Post-Intervention - Final Ability Rating", showIf: { field: "mode", equals: "followup" } },
        {
          type: "dynamic-section",
          name: "cosi_final",
          showIf: { field: "mode", equals: "followup" },
          fields: [
            { name: "goal",  label: "Goal",                type: "input" },
            { name: "final", label: "Final Ability Rating", type: "radio",
              options: ["Hardly ever","Occasionally","Half the time","Most of the time","Almost always"] }
          ]
        },

        { type: "subheading", label: "Counseling Summary", showIf: { field: "mode", equals: "followup" } },
        { name: "understanding", label: "Patient's understanding of hearing loss", type: "input", showIf: { field: "mode", equals: "followup" } },
        { name: "goals",         label: "Expectations / goals",                   type: "input", showIf: { field: "mode", equals: "followup" } },
        { name: "education",     label: "Education provided",                     type: "input", showIf: { field: "mode", equals: "followup" } },
        { name: "next_steps",    label: "Recommended next steps",                 type: "input", showIf: { field: "mode", equals: "followup" } }
      ]
    }]
  };

  const allValues = { ...values, mode };

  return (
    <div>
      {/* Title + Back button */}
      <CommonFormBuilder
        schema={mainSchema}
        values={allValues}
        onChange={handleChange}
        layout="nested"
        onAction={(type) => { if (type === "back") onBack(); }}
      />

      {/* VAS - own Doctor View toggle */}
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

      {/* HHIA - own Doctor View toggle */}
      {values.enable_hhia === "Yes" && (
        <CommonFormBuilder
          schema={hhiaSchema}
          values={allValues}
          onChange={handleChange}
          layout="nested"
          showScores={hhiaScoresVisible}
          onAction={(type) => {
            if (type === "toggle-show-scores") setHhiaScoresVisible(v => !v);
          }}
        />
      )}

      {/* COSI + Counseling - no toggle */}
      {values.enable_cosi === "Yes" && (
        <CommonFormBuilder
          schema={cosiSchema}
          values={allValues}
          onChange={handleChange}
          layout="nested"
        />
      )}
    </div>
  );
}

export function AuditoryAdvancedFormObj({ onBack, mode  }) {
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
    title: "Auditory Assessment",
    actions: [{ type: "back", label: "Back" }],

    sections: [
     {
      title: "Hearing Aid Trial",
      showIf: { field: "mode", equals: "followup" },
      fields: [
        {
          name: "hearingaidtrial_required",
          label: "Hearing Aid Trial",
          type: "radio",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },
        {
          name: "hearingaidtrial_launcher_obj",
          label: "",
          type: "assessment-launcher",
          showIf: { field: "hearingaidtrial_required", equals: "yes" },
          options: [{ label: "Hearing Aid Trial", value: "hearingaidtrial_form_obj" }]
        }
      ]
    },

      // =========================
      // ACOUSTIC REFLEX
      // =========================
      {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "acoustic_reflex_section",
            label: "Acoustic Reflex - Frequency (Hz)",
            defaultOpen: false,
            children: [
              {
                type: "refraction-12col",
                name: "acoustic_reflex_matrix",
                cornerLabel: "Frequency",
                cornerLikeGroupHeader: true,
                showColumnHeaders: true,
                groups: [{
                  label: "",
                  columns: [
                    { key: "Ipsilateral (Right Ear, dB HL)" },
                    { key: "Ipsilateral (Left Ear, dB HL)" },
                    { key: "Contralateral (Right Ear Stim)" },
                    { key: "Contralateral (Left Ear Stim)" }
                  ]
                }],
                rows: FREQUENCIES.map(freq => ({
                  value: freq,
                  label: `${freq} Hz`,
                  columns: [
                    { type: "select", options: reflexOptions },
                    { type: "select", options: reflexOptions },
                    { type: "select", options: reflexOptions },
                    { type: "select", options: reflexOptions }
                  ]
                }))
              }
            ]
          }
        ]
      },

      // =========================
      // ETF
      // =========================
      {
        title: "Eustachian Tube Function",
        fields: [
          {
            type: "row",
            cols: 2,
            labelAbove: true,
            fields: [
              {
                name: "etf_right",
                label: "Right Ear Peak Pressure (daPa)",
                type: "radio",
                options: [
                  { label: "Normal", value: 0 },
                  { label: "Reduced", value: 1 },
                  { label: "Absent", value: 2 }
                ]
              },
              {
                name: "etf_left",
                label: "Left Ear Peak Pressure (daPa)",
                type: "radio",
                options: [
                  { label: "Normal", value: 0 },
                  { label: "Reduced", value: 1 },
                  { label: "Absent", value: 2 }
                ]
              }
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
          {
            type: "checkbox-group",
            name: "speech_tests",
            label: "",
            options: [
              { label: "Speech Reception Threshold (SRT)", value: "srt" },
              { label: "Word Recognition Score (WRS)",     value: "wrs" },
              { label: "Listening Comprehension Task (LCT)", value: "lct" },
              { label: "Auditory Processing Task (APT)",   value: "apt" }
            ]
          },
          { type: "row", cols: 2, showIf: { field: "speech_tests", includes: "srt" }, fields: [{ name: "srt_r", label: "SRT Right Ear", type: "input" }, { name: "srt_l", label: "SRT Left Ear", type: "input" }] },
          { type: "row", cols: 2, showIf: { field: "speech_tests", includes: "wrs" }, fields: [{ name: "wrs_r", label: "WRS Right Ear", type: "input" }, { name: "wrs_l", label: "WRS Left Ear", type: "input" }] },
          { type: "row", cols: 2, showIf: { field: "speech_tests", includes: "lct" }, fields: [{ name: "lct_r", label: "LCT Right Ear", type: "input" }, { name: "lct_l", label: "LCT Left Ear", type: "input" }] },
          { type: "row", cols: 2, showIf: { field: "speech_tests", includes: "apt" }, fields: [{ name: "apt_r", label: "APT Right Ear", type: "input" }, { name: "apt_l", label: "APT Left Ear", type: "input" }] },
          { name: "remarks", label: "Remarks", type: "input", showIf: { field: "speech_tests", notEmpty: true } }
        ]
      },

      // =========================
      // ASSR
      // =========================
      {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "assr_section",
            label: "Auditory Steady-State Response",
            defaultOpen: false,
            children: [
              {
                type: "refraction-12col",
                name: "assr_matrix",
                cornerLabel: "Frequency",
                cornerLikeGroupHeader: true,
                showColumnHeaders: true,
                groups: [{ label: "", columns: [{ key: "Right Ear Threshold (dB nHL)" }, { key: "Left Ear Threshold (dB nHL)" }] }],
                rows: FREQUENCIES.map(freq => ({
                  value: freq,
                  label: `${freq} Hz`,
                  columns: [{ type: "select", options: thresholdOptions }, { type: "select", options: thresholdOptions }]
                }))
              },
              { name: "assr_imp", label: "Impression", type: "input" }
            ]
          }
        ]
      },

      // =========================
      // ABR
      // =========================
      {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "abr_section",
            label: "Auditory Brainstem Response",
            defaultOpen: false,
            children: [
              {
                type: "refraction-12col",
                name: "abr_matrix",
                cornerLabel: "",
                cornerLikeGroupHeader: false,
                showColumnHeaders: true,
                groups: [{ label: "", columns: [{ key: "Right Ear" }, { key: "Left Ear" }] }],
                rows: [
                  { value: "abr",        label: "Auditory Brainstem Response", columns: [{ type: "input" }, { type: "input" }] },
                  { value: "impression", label: "Impression",                  columns: [{ type: "input" }, { type: "input" }] }
                ]
              }
            ]
          }
        ]
      },

      // =========================
      // ELECTROPHYSIOLOGY
      // =========================
      {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "ep_section",
            label: "Electrophysiology For Hearing",
            defaultOpen: false,
            children: [
              {
                type: "refraction-12col",
                name: "ep_matrix",
                cornerLabel: "",
                cornerLikeGroupHeader: false,
                showColumnHeaders: true,
                groups: [{ label: "", columns: [{ key: "Right Ear" }, { key: "Left Ear" }] }],
                rows: [
                  { value: "ep",         label: "Electrophysiology For Hearing", columns: [{ type: "input" }, { type: "input" }] },
                  { value: "impression", label: "Impression",                    columns: [{ type: "input" }, { type: "input" }] }
                ]
              }
            ]
          }
        ]
      },

      // =========================
      // SPECIAL TEST
      // =========================
      {
        title: "Special Test",
        fields: [
          { name: "special_test", label: "Details", type: "input" }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={{ ...values, mode }}
      layout="nested"
      onChange={(n, v) => setValues((prev) => ({ ...prev, [n]: v }))}
      onAction={(type) => type === "back" && onBack?.()}
      assessmentRegistry={{
        hearingaidtrial_form_obj: ({ onChange }) => (
          <Hearingaidtrial
            mode={mode}
            onBack={() => onChange("hearingaidtrial_launcher_obj", null)}
          />
        )
      }}
    />
  );
}
