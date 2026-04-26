import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export function TinnitusAdvancedForm({ onBack, mode }) {
  const [values, setValues] = useState({});
  const [scoresVisible, setScoresVisible] = useState(true);

  const THI_QUESTIONS = [
    "Because of your tinnitus, is it difficult for you to concentrate?",
    "Does the loudness of your tinnitus make it difficult for you to hear people?",
    "Does your tinnitus make you angry?",
    "Does your tinnitus make you confused?",
    "Because of your tinnitus, do you feel desperate?",
    "Do you complain a great deal about your tinnitus?",
    "Because of your tinnitus, do you have trouble falling asleep at night?",
    "Do you feel as though you cannot escape your tinnitus?",
    "Does your tinnitus interfere with your ability to enjoy social activities?",
    "Because of your tinnitus, do you feel frustrated?",
    "Because of your tinnitus, do you feel that you have a terrible disease?",
    "Does your tinnitus make it difficult to enjoy life?",
    "Does your tinnitus interfere with your job or household responsibilities?",
    "Because of your tinnitus, do you find that you are often irritable?",
    "Because of your tinnitus, is it difficult for you to read?",
    "Does your tinnitus make you upset?",
    "Do you feel that your tinnitus has placed stress on your relationships?",
    "Do you find it difficult to focus your attention away from your tinnitus?",
    "Do you feel that you have no control over your tinnitus?",
    "Because of your tinnitus, do you often feel tired?",
    "Because of your tinnitus, do you feel depressed?",
    "Does your tinnitus make you feel anxious?",
    "Do you feel that you can no longer cope with your tinnitus?",
    "Does your tinnitus get worse when you are under stress?",
    "Does your tinnitus make you feel insecure?"
  ];

  const TFI_QUESTIONS = [
    "What percentage of your time awake were you consciously aware of your tinnitus?",
    "How strong or loud was your tinnitus on average?",
    "What percentage of your time awake were you annoyed by your tinnitus?",
    "How easy was it for you to ignore your tinnitus?",
    "How much control do you feel you have over your tinnitus?",
    "How often did your tinnitus make it difficult to concentrate?",
    "How often did your tinnitus make it difficult to think clearly?",
    "How often did your tinnitus disturb your sleep?",
    "How often did your tinnitus make it difficult to fall asleep?",
    "How often did your tinnitus make it difficult to stay asleep?",
    "How much did your tinnitus interfere with your ability to hear clearly?",
    "How much did your tinnitus interfere with understanding people's voices?",
    "How much did your tinnitus interfere with enjoyment of music or TV?",
    "How much did your tinnitus interfere with your ability to relax?",
    "How much did your tinnitus stress you out?",
    "How much did your tinnitus interfere with social activities?",
    "How often did your tinnitus make you feel irritable?",
    "How much did your tinnitus interfere with enjoyment of life?",
    "How anxious did you feel because of your tinnitus?",
    "How depressed did you feel because of your tinnitus?",
    "How hopeless did you feel because of your tinnitus?"
  ];

  // ✅ CALCULATIONS (DONE OUTSIDE BUILDER)
  const computeTHI = (v) => {
    let score = 0;

    const getTHIValue = (val) => {
      if (val === 0 || val === "0") return 0;
      if (val === 2 || val === "2") return 2;
      if (val === 4 || val === "4") return 4;
      return 0;
    };

    for (let i = 1; i <= 25; i++) {
      score += getTHIValue(v[`thi_${i}`]);
    }

    let interpretation = "";
    if (score <= 16) interpretation = "No handicap";
    else if (score <= 36) interpretation = "Mild";
    else if (score <= 56) interpretation = "Moderate";
    else if (score <= 76) interpretation = "Severe";
    else interpretation = "Catastrophic";

    return { score, interpretation };
  };

  const computeTFI = (v) => {
    const getNum = (val) => Number(val || 0);

    const domains = [
      [1, 2, 3],
      [4, 5],
      [6, 7],
      [8, 9, 10],
      [11, 12, 13],
      [14, 15],
      [16, 17, 18],
      [19, 20, 21]
    ];

    const scores = domains.map((group) => {
      const avg =
        group.reduce((sum, i) => sum + getNum(v[`tfi_${i}`]), 0) /
        group.length;

      return avg * 10;
    });

    const total =
      scores.reduce((a, b) => a + b, 0) / scores.length;

    let severityLevel = "";
    let interpretation = "";

    if (total <= 17) {
      severityLevel = "Negligible";
      interpretation = "No or minimal tinnitus problem";
    } else if (total <= 31) {
      severityLevel = "Mild";
      interpretation = "Noticeable but not significantly bothersome";
    } else if (total <= 53) {
      severityLevel = "Moderate";
      interpretation = "Problematic; interferes with some activities";
    } else if (total <= 72) {
      severityLevel = "Severe";
      interpretation = "Substantial negative impact";
    } else {
      severityLevel = "Very Severe";
      interpretation = "Extremely bothersome, affects daily life";
    }

    return {
      score: total.toFixed(1),
      severityLevel,
      interpretation
    };
  };

  const computeVAS = (v) => {
    const getNum = (val) => Number(val || 0);

    const getSeverity = (score) => {
      if (score <= 2) return "Minimal";
      if (score <= 4) return "Mild";
      if (score <= 6) return "Moderate";
      if (score <= 8) return "Severe";
      return "Very Severe";
    };

    const loudness = getNum(v.vas_loudness);
    const annoyance = getNum(v.vas_annoyance);
    const awareness = getNum(v.vas_awareness);

    return {
      loudness,
      annoyance,
      awareness,
      loudness_severity: getSeverity(loudness),
      annoyance_severity: getSeverity(annoyance),
      awareness_severity: getSeverity(awareness)
    };
  };

  // ✅ HANDLE CHANGE (AUTO COMPUTE)
  const handleChange = (name, value) => {
    setValues((prev) => {
      const updated = { ...prev, [name]: value };

      const thi = computeTHI(updated);
      const tfi = computeTFI(updated);
      const vas = computeVAS(updated);

      return {
        ...updated,

        // ✅ THI
        thi_score: thi.score,
        thi_interpretation: thi.interpretation,

        // ✅ TFI
        tfi_score: tfi.score,
        tfi_severity_level: tfi.severityLevel,
        tfi_interpretation: tfi.interpretation,

        // ✅ VAS
        vas_loudness_score: vas.loudness,
        vas_annoyance_score: vas.annoyance,
        vas_awareness_score: vas.awareness,

        vas_loudness_severity: vas.loudness_severity,
        vas_annoyance_severity: vas.annoyance_severity,
        vas_awareness_severity: vas.awareness_severity
      };
    });
  };

  const schema = {
    title: "Additional Tinnitus Profile",
    enableScoreToggle: true,
    actions: [{ type: "toggle-show-scores" }, { type: "back", label: "Back" }],

    sections: [
      {
        title: null,
        fields: [
          // ══════════════════════════════════════════════════════════
          // CASE HISTORY
          // ══════════════════════════════════════════════════════════
          { type: "subheading", label: "Case History (Tinnitus)" },

          { name: "onset", label: "Onset of Tinnitus", type: "input" },
          { name: "duration", label: "Duration", type: "input" },

          {
            name: "type",
            label: "Type",
            type: "radio",
            options: ["Constant", "Intermittent", "Pulsatile", "Noise", "Tonal"]
          },

          {
            name: "ears",
            label: "Ears affected",
            type: "radio",
            options: ["Right", "Left", "Bilateral", "In head"],
            showIf: { field: "mode", equals: "followup" }
          },

          {
            name: "perceived_pitch",
            label: "Perceived pitch",
            type: "radio",
            options: [
              { label: "Low", value: "0" },
              { label: "Mid", value: "1" },
              { label: "High", value: "2" }
            ]
          },

          { name: "triggering_factors", label: "Triggering factors", type: "input" },

          {
            name: "associated_symptoms",
            label: "Associated symptoms",
            type: "radio",
            options: [
              { label: "Hearing loss", value: "0" },
              { label: "Vertigo", value: "1" },
              { label: "Ear fullness", value: "2" },
              { label: "Otalgia", value: "3" },
              { label: "Hyperacusis", value: "4" },
              { label: "Other", value: "5" }
            ]
          },

          {
            name: "associated_symptoms_other",
            label: "If Other, specify",
            type: "textarea",
            showIf: { field: "associated_symptoms", equals: "5" }
          },

          { name: "previous_treatment", label: "Previous treatment / intervention", type: "input" },

          {
            name: "noise_exposure",
            label: "Noise exposure history",
            type: "radio",
            options: [
              { label: "None", value: "0" },
              { label: "Recreational", value: "1" },
              { label: "Occupational", value: "2" }
            ]
          },

          { name: "ototoxic_drugs", label: "Ototoxic drug use", type: "input" },
          { name: "family_history", label: "Family history", type: "input" },

          // ══════════════════════════════════════════════════════════
          // SUBJECTIVE RATING SCALES
          // ══════════════════════════════════════════════════════════
          { type: "subheading", label: "Subjective Rating Scales For Tinnitus" },

          { name: "enable_vas", label: "Tinnitus Visual Analog Scale (VAS)", type: "radio", options: ["Yes", "No"] },
          { name: "enable_thi", label: "Tinnitus Handicap Inventory (THI)", type: "radio", options: ["Yes", "No"] },
          { name: "enable_tfi", label: "Tinnitus Functional Index (TFI)", type: "radio", options: ["Yes", "No"] },

          // ══════════════════════════════════════════════════════════
          // VAS SECTION
          // ══════════════════════════════════════════════════════════
          { type: "subheading", label: "Tinnitus Visual Analog Scale (VAS)", showIf: { field: "enable_vas", equals: "Yes" } },
          { type: "info-text", text: "0 = none, 10 = worst possible", showIf: { field: "enable_vas", equals: "Yes" } },

          { name: "vas_loudness", label: "Tinnitus Loudness - How loud is your tinnitus most of the time?", type: "scale-slider", min: 0, max: 10, showIf: { field: "enable_vas", equals: "Yes" } },
          ...(scoresVisible ? [{ name: "vas_loudness_severity", label: "Loudness Severity", type: "score-box", showIf: { field: "enable_vas", equals: "Yes" } }] : []),

          { name: "vas_annoyance", label: "Tinnitus Annoyance - How annoying or bothersome is your tinnitus?", type: "scale-slider", min: 0, max: 10, showIf: { field: "enable_vas", equals: "Yes" } },
          ...(scoresVisible ? [{ name: "vas_annoyance_severity", label: "Annoyance Severity", type: "score-box", showIf: { field: "enable_vas", equals: "Yes" } }] : []),

          { name: "vas_awareness", label: "Tinnitus Awareness - How much of the time are you aware of your tinnitus?", type: "scale-slider", min: 0, max: 10, showIf: { field: "enable_vas", equals: "Yes" } },
          ...(scoresVisible ? [{ name: "vas_awareness_severity", label: "Awareness Severity", type: "score-box", showIf: { field: "enable_vas", equals: "Yes" } }] : []),

          // ══════════════════════════════════════════════════════════
          // THI SECTION
          // ══════════════════════════════════════════════════════════
          { type: "subheading", label: "THI", showIf: { field: "enable_thi", equals: "Yes" } },

          ...THI_QUESTIONS.map((q, i) => ({
            name: `thi_${i + 1}`,
            label: `${i + 1}. ${q}`,
            type: "radio-matrix",
            options: scoresVisible
              ? [{ label: "No (0)", value: "0" }, { label: "Sometimes (2)", value: "2" }, { label: "Yes (4)", value: "4" }]
              : [{ label: "No", value: "0" }, { label: "Sometimes", value: "2" }, { label: "Yes", value: "4" }],
            showIf: { field: "enable_thi", equals: "Yes" }
          })),

          { type: "info-text", text: "Scoring: No = 0, Sometimes = 2, Yes = 4", showIf: { field: "enable_thi", equals: "Yes" } },

          ...(scoresVisible ? [
            { name: "thi_score", label: "THI Score", type: "score-box", showIf: { field: "enable_thi", equals: "Yes" } },
            { name: "thi_interpretation", label: "Interpretation", type: "score-box", showIf: { field: "enable_thi", equals: "Yes" } },
          ] : []),

          // ══════════════════════════════════════════════════════════
          // TFI SECTION
          // ══════════════════════════════════════════════════════════
          { type: "subheading", label: "TFI", showIf: { field: "enable_tfi", equals: "Yes" } },

          ...TFI_QUESTIONS.map((q, i) => ({
            name: `tfi_${i + 1}`,
            label: `${i + 1}. ${q}`,
            type: "scale-slider",
            min: 0,
            max: 10,
            showIf: { field: "enable_tfi", equals: "Yes" }
          })),

          ...(scoresVisible ? [
            { name: "tfi_score", label: "TFI Score", type: "score-box", showIf: { field: "enable_tfi", equals: "Yes" } },
            { name: "tfi_severity_level", label: "Severity Level", type: "score-box", showIf: { field: "enable_tfi", equals: "Yes" } },
            { name: "tfi_interpretation", label: "Interpretation", type: "score-box", showIf: { field: "enable_tfi", equals: "Yes" } },
          ] : []),

          // ══════════════════════════════════════════════════════════
          // LIFESTYLE & FUNCTIONAL IMPACT
          // ══════════════════════════════════════════════════════════
          { type: "subheading", label: "Lifestyle & Functional Impact (Tinnitus)" },

          { name: "sleep", label: "Sleep Quality", type: "input" },
          { name: "concentration", label: "Concentration / Attention", type: "input" },
          { name: "stress", label: "Stress Level", type: "input" },
          { name: "functioning", label: "Daily Functioning", type: "input" },
          { name: "sound", label: "Use of Hearing Aids / Sound Therapy", type: "input" },

          // ══════════════════════════════════════════════════════════
          // COUNSELING SUMMARY
          // ══════════════════════════════════════════════════════════
          { type: "subheading", label: "Counseling Summary", showIf: { field: "mode", equals: "followup" } },
          { name: "understanding", label: "Client's Understanding Of Tinnitus", type: "input", showIf: { field: "mode", equals: "followup" } },
          { name: "recommendations", label: "Recommendations", type: "input", showIf: { field: "mode", equals: "followup" } }
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
      showScores={scoresVisible}
      onAction={(type) => {
        if (type === "toggle-show-scores") setScoresVisible(v => !v);
        if (type === "back") onBack();
      }}
    />
  );
}

export function TinnitusAdvancedFormObj({ onBack }) {
  const [values, setValues] = useState({});

  const schema = {
    title: "Tinnitus Assessment",
    actions: [{ type: "back", label: "Back" }],

    sections: [
      {
        title: "Tinnitus Psychoacoustic Measurements",
        fields: [
          {
            type: "subheading",
            label: "Pitch Matching(Hz)"
          },
          {
            type: "row",
            fields: [
              { name: "pitch_r", label: "Right Ear", type: "input" },
              { name: "pitch_l", label: "Left Ear", type: "input" }
            ]
          },

          {
            type: "subheading",
            label: "Loudness Matching (dB HL)"
          },
          {
            type: "row",
            fields: [
              { name: "loudness_r", label: "Right Ear", type: "input" },
              { name: "loudness_l", label: "Left Ear", type: "input" }
            ]
          },

          {
            type: "subheading",
            label: "Minimum Masking Level (MML) (dBHL)"
          },
          {
            type: "row",
            fields: [
              { name: "mml_r", label: "Right Ear", type: "input" },
              { name: "mml_l", label: "Left Ear", type: "input" }
            ]
          },

          {
            type: "subheading",
            label: "Residual Inhibition"
          },
          {
            type: "row",
            fields: [
              { name: "ri_r", label: "Right Ear", type: "input" },
              { name: "ri_l", label: "Left Ear", type: "input" }
            ]
          },

          {
            type: "subheading",
            label: "Loudness Discomfort Level (LDL)"
          },
          {
            type: "row",
            fields: [
              { name: "ldl_r", label: "Right Ear", type: "input" },
              { name: "ldl_l", label: "Left Ear", type: "input" }
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
      onChange={(n, v) => setValues(prev => ({ ...prev, [n]: v }))}
      onAction={(type) => type === "back" && onBack?.()}
    />
  );
}