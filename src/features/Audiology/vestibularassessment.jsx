import React, { useState, useMemo } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export function VestibularAdvancedForm({ onBack, mode }) {
  const [values, setValues] = useState({});
  const [scoresVisible, setScoresVisible] = useState(true);

  const DHI_QUESTIONS = [
  "Does looking up increase your problem?",
  "Because of your problem, do you feel frustrated?",
  "Because of your problem, do you restrict your travel for business or pleasure?",
  "Does walking down the aisle of a supermarket increase your problem?",
  "Because of your problem, do you have difficulty getting into or out of bed?",
  "Does your problem significantly restrict your participation in social activities (dinner, movies, parties)?",
  "Because of your problem, do you have difficulty reading?",
  "Does performing activities like sports or household chores increase your problem?",
  "Because of your problem, are you afraid to leave your home without someone accompanying you?",
  "Because of your problem, have you been embarrassed in front of others?",
  "Do quick movements of your head increase your problem?",
  "Because of your problem, do you avoid heights?",
  "Does turning over in bed increase your problem?",
  "Because of your problem, is it difficult to do strenuous housework or yard work?",
  "Because of your problem, are you afraid people may think you are intoxicated?",
  "Because of your problem, is it difficult to go for a walk by yourself?",
  "Does walking down a sidewalk increase your problem?",
  "Because of your problem, is it difficult for you to concentrate?",
  "Because of your problem, is it difficult to walk around your house in the dark?",
  "Because of your problem, are you afraid to stay home alone?",
  "Because of your problem, do you feel handicapped?",
  "Has your problem placed stress on your relationships with family or friends?",
  "Because of your problem, are you depressed?",
  "Does your problem interfere with your job or household responsibilities?",
  "Does bending over increase your problem?"
];
const VVAS_QUESTIONS = [
  "Walking through a supermarket aisle",
  "Being a passenger in a car",
  "Being under fluorescent lights",
  "Watching traffic at a busy intersection",
  "Walking through a shopping mall",
  "Going down an escalator",
  "Watching a movie at the movie theatre",
  "Walking over a patterned floor",
  "Watching action television"
];
const VHQ_QUESTIONS = [
  { text: "I find that the vertigo does restrict me socially" },
  { text: "I can still take part in active leisure pursuits", reverse: true },
  { text: "Some of my friends or relations get impatient because of the vertigo" },
  { text: "I can move around quickly and freely", reverse: true },
  { text: "I feel less confident than I used to" },
  { text: "I am happy to go out alone" },
  { text: "My vertigo means that my family life is restricted" },
  { text: "I find some of my less active hobbies difficult" },
  { text: "I am still able to travel despite the vertigo", reverse: true },
  { text: "I try to avoid bending over" },
  { text: "My family takes the vertigo in its stride", reverse: true },
  { text: "My friends are unsure how to react" },
  { text: "I think something seriously wrong with me" },
  { text: "People are understanding about the vertigo", reverse: true },
  { text: "I get anxious about unexpected vertigo attacks" },
  { text: "During an attack I can carry on", reverse: true },
  { text: "I find the attacks frightening" },
  { text: "I am able to walk long distances", reverse: true },
  { text: "The vertigo worries me" },
  { text: "I avoid making plans in advance" },
  { text: "I can carry out everyday activities", reverse: true },
  { text: "I am afraid of spoiling things for others" },
  { text: "I get depressed because of vertigo" },
  { text: "If I sit during attack I am fine", reverse: true },
  { text: "If I have vertigo in public I get embarrassed" }
];
const MVVSS_QUESTIONS = [
  "Perasaan seolah-olah benda atau keadaan sekeliling berpusing atau bergerak, selama kurang dari dua minit",
  "Berasa telinga tersumbat",
  "Menggigil, menggeletar",
  "Perasaan berasa pening-pening lalat, terapung-apung atau 'giddy', selama lebih dari 12 jam",
  "Kesukaran untuk bernafas, bernafas dengan tercungap-cungap",
  "Berpeluh berlebihan",
  "Perasaan seolah-olah benda atau sekeliling berpusing atau bergerak, selama 20 minit hingga satu jam",
  "Muntah",
  "Sakit kepala atau berasa berat dalam kepala",
  "Berasa hilang keseimbangan badan sehingga ingin terjatuh, berpanjangan lebih dari 12 jam",
  "Berdenyut-denyut, mencucuk-cucuk atau kebas di bahagian badan tertentu",
  "Berasa hilang keseimbangan badan sehingga ingin terjatuh, berpanjanjangan kurang dari dua minit",
  "Sakit di bahagian jantung atau dada",
  "Perasaan berasa pening-pening lalat, terapung-apung atau 'giddy', selama kurang 20 minit hingga satu jam"
];
const MVVSS_OPTIONS = [
  { label: "Tidak pernah (0)", value: 0 },
  { label: "Beberapa kali (1–3 kali setahun) (1)", value: 1 },
  { label: "Banyak kali (4–12 kali setahun) (2)", value: 2 },
  { label: "Agak kerap (lebih dari sekali sebulan) (3)", value: 3 },
  { label: "Sangat kerap (lebih dari sekali seminggu) (4)", value: 4 }
];
  // =========================
  // ✅ CALCULATIONS
  // =========================

  const computeDHI = (v) => {
    let physical = 0, emotional = 0, functional = 0;
    const get = (x) => Number(x || 0);

    const P = [1,4,11,13,17,25];
    const E = [2,9,10,15,18,20,21,22,23];
    const F = [3,5,6,7,8,12,14,16,19,24];

    P.forEach(i => physical += get(v[`dhi_${i}`]));
    E.forEach(i => emotional += get(v[`dhi_${i}`]));
    F.forEach(i => functional += get(v[`dhi_${i}`]));

    const total = physical + emotional + functional;

    let interpretation = "";
    if (total <= 16) interpretation = "No handicap";
    else if (total <= 34) interpretation = "Mild";
    else if (total <= 52) interpretation = "Moderate";
    else interpretation = "Severe";

    return { physical, emotional, functional, total, interpretation };
  };

  const computeVVAS = (v) => {
    const vals = Array.from({ length: 9 }).map((_, i) =>
      Number(v[`vvas_${i + 1}`] || 0)
    );

    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const score = avg * 10;

    let interpretation = "";
    if (score === 0) interpretation = "None";
    else if (score <= 40) interpretation = "Mild";
    else if (score <= 70) interpretation = "Moderate";
    else interpretation = "Severe";

    return { score: score.toFixed(1), interpretation };
  };

  const computeVHQ = (v) => {
    let total = 0;
    for (let i = 1; i <= 25; i++) {
      total += Number(v[`vhq_${i}`] || 0);
    }
    return { total };
  };

  const computeMVVSS = (v) => {
    let total = 0;
    for (let i = 1; i <= 14; i++) {
      total += Number(v[`mvvss_${i}`] || 0);
    }
    return { total };
  };

  // =========================
  // ✅ HANDLE CHANGE
  // =========================
  const handleChange = (name, value) => {
    setValues((prev) => {
      const updated = { ...prev, [name]: value };

      const dhi = computeDHI(updated);
      const vvas = computeVVAS(updated);
      const vhq = computeVHQ(updated);
      const mvvss = computeMVVSS(updated);

      return {
        ...updated,

        // DHI
        dhi_physical: dhi.physical,
        dhi_emotional: dhi.emotional,
        dhi_functional: dhi.functional,
        dhi_total: dhi.total,
        dhi_interpretation: dhi.interpretation,

        // VVAS
        vvas_score: vvas.score,
        vvas_interpretation: vvas.interpretation,

        // VHQ
        vhq_total: vhq.total,

        // MVVSS
        mvvss_total: mvvss.total
      };
    });
  };

  // =========================
  // ✅ SCHEMA
  // =========================

  const schema = {
    title: "Additional Vestibular Profile",
    enableScoreToggle: true,
    actions: [{ type: "toggle-show-scores" }, { type: "back", label: "Back" }],

    sections: [
      {
        title: null, // Single unified section
        fields: [
          // =========================
          // CASE HISTORY
          // =========================
          { type: "subheading", label: "Case History (Vestibular)" },

        { type: "info-text", label: "1. Symptoms" },
        { name: "vertigo", label: "Vertigo / Spinning", type: "radio", options: ["No", "Yes"] },
        { name: "dizziness", label: "Dizziness / Spatial disorientation", type: "radio", options: ["No", "Yes"] },
        { name: "postural", label: "Postural symptoms", type: "checkbox-group", options: [
          { label: "Postural instability / unsteadiness", value: "Postural instability / unsteadiness" },
          { label: "Falls", value: "Falls" },
          { label: "Near falls", value: "Near falls" },
          { label: "Directional pulsion", value: "Directional pulsion" }
        ]},
        { name: "visual", label: "Visuo-vestibular symptoms", type: "checkbox-group", options: [
          { label: "Visual tilt", value: "Visual tilt" },
          { label: "Visual lag", value: "Visual lag" },
          { label: "Oscillopsia", value: "Oscillopsia" },
          { label: "Movement induced blur", value: "Movement induced blur" }
        ]},

        { type: "info-text", label: "2. Triggers" },
        { name: "situational", label: "Situational", type: "checkbox-group", options: [
          { label: "Stress", value: "Stress" },
          { label: "Missed sleep", value: "Missed sleep" },
          { label: "Smells", value: "Smells" },
          { label: "Sunlight", value: "Sunlight" },
          { label: "Hunger", value: "Hunger" },
          { label: "Foods", value: "Foods" },
          { label: "Fatigue", value: "Fatigue" },
          { label: "Travel", value: "Travel" },
          { label: "Others", value: "Others" }
        ]},
        { name: "third_window", label: "Third window", type: "checkbox-group", options: [
          { label: "Loud sounds", value: "Loud sounds" },
          { label: "Laughing", value: "Laughing" },
          { label: "Lifting weight", value: "Lifting weight" },
          { label: "Coughing", value: "Coughing" },
          { label: "Blowing nose", value: "Blowing nose" },
          { label: "Straining", value: "Straining" },
          { label: "Others", value: "Others" }
        ]},
        { name: "movement", label: "Movement", type: "checkbox-group", options: [
          { label: "Bending over", value: "Bending over" },
          { label: "Lying down", value: "Lying down" },
          { label: "Getting up from bed", value: "Getting up from bed" },
          { label: "Fast movement R/L", value: "Fast movement R/L" },
          { label: "Looking up", value: "Looking up" },
          { label: "Rolling in bed", value: "Rolling in bed" },
          { label: "Getting up from sitting", value: "Getting up from sitting" },
          { label: "Turning head R/L", value: "Turning head R/L" },
          { label: "Others", value: "Others" }
        ]},

        { name: "environmental", label: "Environmental", type: "checkbox-group", options: [
          { label: "Open spaces", value: "Open spaces" },
          { label: "Heights", value: "Heights" },
          { label: "Darkness", value: "Darkness" },
          { label: "Crowded places", value: "Crowded places" },
          { label: "Shopping malls", value: "Shopping malls" },
          { label: "Uneven ground", value: "Uneven ground" },
          { label: "Others", value: "Others" }
        ]},

        { type: "info-text", label: "3. Duration" },
        { name: "duration", label: "Episode duration", type: "radio", options: [
          "<10s","10s–1min","1–5min","30min–12h","12–72h","Weeks",">3 days–<1 week","Months"
        ]},

        { type: "info-text", label: "4. Onset" },
        { name: "onset_date", label: "Date / How long ago", type: "input" },
        { name: "onset_after", label: "After what?", type: "radio", options: [
          "Severe vertigo","Trauma","Immobilization","Surgery","No association",
          "Medication","New diagnosis","Fever","Others"
        ]},

        { type: "info-text", label: "5. Frequency" },
        { name: "frequency", label: "Symptom frequency", type: "radio", options: [
          "Only once","Several times/day","Daily (intermittent)","Continuous",
          "Variable symptom-free period","Only with trigger","Daily","Weekly",
          "Several years","Continuous with worsening","Others"
        ]},

        { type: "info-text", label: "6. Evolution" },
        { name: "evolution", label: "Symptom evolution", type: "radio", options: [
          "Worst initially then improving",
          "Worsening day by day",
          "Severe during attacks only",
          "Stable with little fluctuation",
          "Others"
        ]},

        { type: "info-text", label: "7. Otological" },
        { name: "hearing", label: "Hearing loss", type: "input" },
        { name: "ear_pressure", label: "Ear pressure / fullness", type: "radio", options: ["No","Right","Left","Bilateral"] },
        { name: "vesicles", label: "Vesicles in or around ear", type: "radio", options: ["No","Right","Left","Bilateral"] },
        { name: "paresthesia", label: "Paresthesia", type: "radio", options: ["No","Right","Left","Bilateral"] },
        { name: "tinnitus", label: "Tinnitus", type: "radio", options: ["No","Right","Left","Bilateral"] },
        { name: "ear_pain", label: "Pain in or around ear", type: "radio", options: ["No","Right","Left","Bilateral"] },
        { name: "ear_discharge", label: "Ear discharge", type: "radio", options: ["No","Right","Left","Bilateral"] },
        { name: "autophony", label: "Autophony", type: "radio", options: ["No","Right","Left","Bilateral"] },

        { type: "info-text", label: "8. Neurological" },
        { name: "headache", label: "Headache", type: "radio", options: ["No","Yes"] },
        { name: "facial_weakness", label: "Facial weakness", type: "radio", options: ["No","Yes"] },
        { name: "photophobia", label: "Photophobia", type: "radio", options: ["No","Yes"] },
        { name: "facial_numbness", label: "Facial numbness", type: "radio", options: ["No","Yes"] },
        { name: "diplopia", label: "Diplopia", type: "radio", options: ["No","Yes"] },
        { name: "neuro_other", label: "Others", type: "input" },

        { type: "info-text", label: "9. Others" },
        { name: "meds", label: "Current medications", type: "input" },
        { name: "conditions", label: "Concurrent medical conditions", type: "checkbox-group", options: [
          { label: "Diabetes", value: "Diabetes" },
          { label: "Hypertension", value: "Hypertension" },
          { label: "Dyslipidemia", value: "Dyslipidemia" },
          { label: "Others", value: "Others" }
        ]},
        { name: "improved_meds", label: "Which medicine improved symptoms?", type: "input" },

          // =========================
          // TOGGLES
          // =========================
          { type: "subheading", label: "Scales" },

          { name: "enable_dhi", label: "Dizziness Handicap Inventory (DHI)", type: "radio", options: ["Yes", "No"] },
          { name: "enable_vvas", label: "Visual Vertigo Analogue Score (VVAS)", type: "radio", options: ["Yes", "No"] },
          { name: "enable_vhq", label: "Vertigo Handicap Questionnaire (VHQ)", type: "radio", options: ["Yes", "No"] },
          { name: "enable_mvvss", label: "Malay Version Vertigo Symptom Scale (MVVSS)", type: "radio", options: ["Yes", "No"] },

          // =========================
          // DHI
          // =========================
          { type: "subheading", label: "Dizziness Handicap Inventory (DHI)", showIf: { field: "enable_dhi", equals: "Yes" } },

          ...DHI_QUESTIONS.map((q, i) => ({
            name: `dhi_${i + 1}`,
            label: `${i + 1}. ${q}`,
            type: "radio-matrix",
            options: scoresVisible
              ? [{ label: "No (0)", value: 0 }, { label: "Sometimes (2)", value: 2 }, { label: "Always (4)", value: 4 }]
              : [{ label: "No", value: 0 }, { label: "Sometimes", value: 2 }, { label: "Always", value: 4 }],
            showIf: { field: "enable_dhi", equals: "Yes" }
          })),

          ...(scoresVisible ? [
            { name: "dhi_physical", label: "Physical", type: "score-box", showIf: { field: "enable_dhi", equals: "Yes" } },
            { name: "dhi_emotional", label: "Emotional", type: "score-box", showIf: { field: "enable_dhi", equals: "Yes" } },
            { name: "dhi_functional", label: "Functional", type: "score-box", showIf: { field: "enable_dhi", equals: "Yes" } },
            { name: "dhi_total", label: "Total", type: "score-box", showIf: { field: "enable_dhi", equals: "Yes" } },
            { name: "dhi_interpretation", label: "Interpretation", type: "score-box", showIf: { field: "enable_dhi", equals: "Yes" } },
          ] : []),

          // =========================
          // VVAS
          // =========================
          { type: "subheading", label: "Visual Vertigo Analogue Score (VVAS)", showIf: { field: "enable_vvas", equals: "Yes" } },
          { type: "info-text", text: "0 = none, 10 = worst possible", showIf: { field: "enable_vvas", equals: "Yes" } },
          ...VVAS_QUESTIONS.map((q, i) => ({
            name: `vvas_${i + 1}`,
            label: `${i + 1}. ${q}`,
            type: "scale-slider",
            min: 0,
            max: 10,
            showIf: { field: "enable_vvas", equals: "Yes" }
          })),

          ...(scoresVisible ? [
            { name: "vvas_score", label: "Score", type: "score-box", showIf: { field: "enable_vvas", equals: "Yes" } },
            { name: "vvas_interpretation", label: "Interpretation", type: "score-box", showIf: { field: "enable_vvas", equals: "Yes" } },
          ] : []),

          // =========================
          // VHQ
          // =========================
          { type: "subheading", label: "Vertigo Handicap Questionnaire (VHQ)", showIf: { field: "enable_vhq", equals: "Yes" } },

          ...VHQ_QUESTIONS.map((q, i) => ({
            name: `vhq_${i + 1}`,
            label: `${i + 1}. ${q.text}`,
            type: "radio-matrix",
            options: scoresVisible
              ? [{ label: "Never (0)", value: 0 }, { label: "Occasionally (1)", value: 1 }, { label: "Sometimes (2)", value: 2 }, { label: "Often (3)", value: 3 }, { label: "Always (4)", value: 4 }]
              : [{ label: "Never", value: 0 }, { label: "Occasionally", value: 1 }, { label: "Sometimes", value: 2 }, { label: "Often", value: 3 }, { label: "Always", value: 4 }],
            showIf: { field: "enable_vhq", equals: "Yes" }
          })),

          ...(scoresVisible ? [{ name: "vhq_total", label: "Total", type: "score-box", showIf: { field: "enable_vhq", equals: "Yes" } }] : []),
          {
            name: "vhq_work",
            label: "26. Are you currently employed?",
            type: "radio",
            options: scoresVisible
              ? [
                  { label: "No (0)", value: 0 },
                  { label: "Yes (1)", value: 1 }
                ]
              : [
                  { label: "No", value: 0 },
                  { label: "Yes", value: 1 }
                ],
            showIf: { field: "enable_vhq", equals: "Yes" }
          },

          {
            name: "vhq_26a",
            label: "Did you give up work because of vertigo?",
            type: "radio",
            options: ["No", "Yes"],
            showIf: { field: "vhq_work", equals: 0 }
          },

          {
            name: "vhq_26b",
            label: "Have you changed your work because of vertigo?",
            type: "radio",
            options: ["No", "Yes"],
            showIf: { field: "vhq_work", equals: 1 }
          },

          {
            name: "vhq_26c",
            label: "Does vertigo cause difficulty at work?",
            type: "radio",
            options: ["No", "Yes"],
            showIf: { field: "vhq_work", equals: 1 }
          },
          // =========================
          // MVVSS
          // =========================
          { type: "subheading", label: "Malay Version Vertigo Symptom Scale (MVVSS)", showIf: { field: "enable_mvvss", equals: "Yes" } },

          ...MVVSS_QUESTIONS.map((q, i) => ({
            name: `mvvss_${i + 1}`,
            label: `${i + 1}. ${q}`,
            type: "radio-matrix",
            options: scoresVisible ? MVVSS_OPTIONS : MVVSS_OPTIONS.map(o => ({ ...o, label: o.label.replace(/ \(\d+\)/, "") })),
            showIf: { field: "enable_mvvss", equals: "Yes" }
          })),

          ...(scoresVisible ? [{ name: "mvvss_total", label: "Total", type: "score-box", showIf: { field: "enable_mvvss", equals: "Yes" } }] : []),

          // =========================
          // FUNCTIONAL
          // =========================
          { type: "subheading", label: "Functional and Daily Life Impact for vestibular" },

          { name: "work", label: "Work / Study", type: "input" },
          { name: "communication", label: "Communication", type: "input" },
          { name: "social", label: "Family / Social", type: "input" },
          { name: "rest", label: "Relaxation / Rest", type: "input" },
          { name: "outdoor", label: "Outdoor / Public noise tolerance", type: "input" },

          // =========================
          // COUNSELING
          // =========================
          {
            type: "subheading",
            label: "Counseling Summary",
            showIf: { field: "mode", equals: "followup" }
          },

          { name: "understanding", label: "Patient’s understanding of vestibular disorder", type: "input", showIf: { field: "mode", equals: "followup" } },
          { name: "goals", label: "Expectations / goals", type: "input", showIf: { field: "mode", equals: "followup" } },
          { name: "motivation", label: "Motivation for therapy", type: "input", showIf: { field: "mode", equals: "followup" } },
          { name: "education", label: "Education & counseling provided", type: "input", showIf: { field: "mode", equals: "followup" } },
          { name: "next_steps", label: "Recommended next steps", type: "input", showIf: { field: "mode", equals: "followup" } }
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

export function VestibularAdvancedFormObj({ onBack }) {
  const [values, setValues] = useState({});

  // =========================
  // HELPERS
  // =========================

  const formatLabel = (str) =>
    str.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const buildEyeSection = (prefix, title, metrics) => ({
    title,
    fields: metrics.flatMap((metric) => [
      { type: "subheading", label: metric },

      {
        type: "row",
        fields: [
          {
            name: `${prefix}_${metric}_right`,
            label: "Right Eye",
            type: "input",
          },
          {
            name: `${prefix}_${metric}_left`,
            label: "Left Eye",
            type: "input",
          },
        ],
      },

      {
        name: `${prefix}_${metric}_impression`,
        label: "Impression",
        type: "input",
      },
    ]),
  });

  const buildBinaryOptions = (prefix, title) => ({
    title,
    fields: [
      "Horizontal Left Passive",
      "Horizontal Right Passive",
      "Vertical Up Passive",
      "Vertical Down Passive",
      "Horizontal Left Active",
      "Horizontal Right Active",
      "Vertical Up Active",
      "Vertical Down Active",
    ].map((key) => ({
      name: `${prefix}_${key}`,
      label: formatLabel(key),
      type: "radio-matrix",
      options: [
        { label: "Within normal range", value: 0 },
        { label: "Deviated", value: 1 },
      ],
    })),
  });

  // =========================
  // FGA AUTO SCORE
  // =========================
  const fgaScore = useMemo(() => {
    return Object.keys(values)
      .filter((k) => k.startsWith("fga_"))
      .reduce((sum, k) => sum + (Number(values[k]) || 0), 0);
  }, [values]);

  // =========================
  // SCHEMA
  // =========================

  const schema = {
    title: "Vestibular Evaluation",
    actions: [{ type: "back", label: "Back" }],

    sections: [
      // =========================
      // SACCADE
      // =========================
      buildEyeSection("saccade_h", "Saccade - Horizontal", [
        "Velocity",
        "Precision",
        "Latency",
      ]),
      buildEyeSection("saccade_v", "Saccade - Vertical", [
        "Velocity",
        "Precision",
        "Latency",
      ]),

      // =========================
      // SMOOTH PURSUIT
      // =========================
      buildEyeSection("smooth_h", "Smooth Pursuit - Horizontal", [
        "Velocity",
        "Precision",
      ]),

      // =========================
      // OPTOKINETIC
      // =========================
      buildEyeSection("opto_lr", "Optokinetic Test - Left to Right", [
        "Gain",
        "Fast Phase Direction",
      ]),
      buildEyeSection("opto_rl", "Optokinetic Test - Right to Left", [
        "Velocity",
        "Precision",
      ]),
      buildEyeSection("opto_tb", "Optokinetic Test - Top to Bottom", [
        "Velocity",
        "Precision",
      ]),
      buildEyeSection("opto_bt", "Optokinetic Test - Bottom to Top", [
        "Velocity",
        "Precision",
      ]),

      // =========================
      // NYSTAGMUS
      // =========================
      buildEyeSection("nystagmus_light_h", "Nystagmus: Spontaneous in Light - Horizontal", [
        "Slow Phase Velocity",
        "Amplitude",
      ]),
      buildEyeSection("nystagmus_light_v", "Nystagmus: Spontaneous in Light - Vertical", [
        "Slow Phase Velocity",
        "Amplitude",
      ]),
      buildEyeSection("nystagmus_dark_h", "Nystagmus: Spontaneous in Dark - Horizontal", [
        "Slow Phase Velocity",
        "Amplitude",
      ]),
      buildEyeSection("nystagmus_dark_v", "Nystagmus: Spontaneous in Dark - Vertical", [
        "Slow Phase Velocity",
        "Amplitude",
      ]),
      buildEyeSection("headshake_h", "Nystagmus: High Frequency Head Shake - Horizontal", [
        "Slow Phase Velocity",
        "Amplitude",
      ]),
      buildEyeSection("headshake_v", "Nystagmus: High Frequency Head Shake - Vertical", [
        "Slow Phase Velocity",
        "Amplitude",
      ]),

      {
        title: "Nystagmus - Others",
        fields: [
          { name: "nystagmus_other_test", label: "Test", type: "textarea" },
          {
            name: "nystagmus_other_impression",
            label: "Impression",
            type: "textarea",
          },
        ],
      },

      // =========================
      // GAZE (ALL DIRECTIONS)
      // =========================
      buildEyeSection("gaze_center", "Gaze Test: Centre - Fixation", [
        "Horizontal - Slow Phase Velocity",
        "Horizontal - Amplitude",
        "Vertical - Slow Phase Velocity",
        "Vertical - Amplitude"
      ]),

      buildEyeSection("gaze_left", "Gaze Test: Left - Fixation", [
        "Horizontal - Slow Phase Velocity",
        "Horizontal - Amplitude",
        "Vertical - Slow Phase Velocity",
        "Vertical - Amplitude"
      ]),

      buildEyeSection("gaze_up", "Gaze Test: Up - Fixation", [
        "Horizontal - Slow Phase Velocity",
        "Horizontal - Amplitude",
        "Vertical - Slow Phase Velocity",
        "Vertical - Amplitude"
      ]),

      buildEyeSection("gaze_right", "Gaze Test: Right - Fixation", [
        "Horizontal - Slow Phase Velocity",
        "Horizontal - Amplitude",
        "Vertical - Slow Phase Velocity",
        "Vertical - Amplitude"
      ]),

      buildEyeSection("gaze_down", "Gaze Test: Down - Fixation", [
        "Horizontal - Slow Phase Velocity",
        "Horizontal - Amplitude",
        "Vertical - Slow Phase Velocity",
        "Vertical - Amplitude"
      ]),

      // =========================
      // SVV
      // =========================
      {
        title: "Subjective Visual Vertical",
        fields: ["clockwise", "anticlockwise", "blank"].map((dir) => ({
          type: "row",
          cols: 2,
          fields: [
            {
              name: `svv_${dir}_result`,
              label: `${formatLabel(dir)} Result`,
              type: "input"
            },
            {
              name: `svv_${dir}_impression`,
              label: `${formatLabel(dir)} Impression`,
              type: "input"
            }
          ]
        }))
      },

      // =========================
      // POSITIONAL
      // =========================
      {
        title: "Positional Test",
        fields: [
          { name: "positional_test", label: "Test", type: "textarea" },
          { name: "positional_impression", label: "Impression", type: "textarea" },
        ],
      },

      // =========================
      // DVA + GAZE STABILIZATION
      // =========================
      buildBinaryOptions("dva", "Dynamic Visual Acuity (DVA)"),
      buildBinaryOptions("gaze_stab", "Gaze Stabilization"),

      // =========================
      // vHIT
      // =========================
      {
        title: "Video Head Impulse Test (vHIT)",
        fields: [
          // {
          //   name: "vhit_pdf",
          //   label: "Require PDF attachment",
          //   type: "file-upload-modal"
          // },

          ...["anterior", "lateral", "posterior"].flatMap((canal) =>
            ["R", "L"].map((side) => ({
              type: "row",
              cols: 5,
              fields: [
                {
                  name: `vhit_${canal}_${side}_n`,
                  label: `${formatLabel(canal)} ${side} n`,
                  type: "input"
                },
                {
                  name: `vhit_${canal}_${side}_gain`,
                  label: `${formatLabel(canal)} ${side} Mean Gain`,
                  type: "input"
                },
                {
                  name: `vhit_${canal}_${side}_sd`,
                  label: `${formatLabel(canal)} ${side} Standard Deviation`,
                  type: "input"
                },
                {
                  name: `vhit_${canal}_${side}_asym`,
                  label: `${formatLabel(canal)} ${side} Asymetry (%)`,
                  type: "input"
                },
                {
                  name: `vhit_${canal}_${side}_impression`,
                  label: `${formatLabel(canal)} ${side} Impression`,
                  type: "input"
                }
              ]
            }))
          )
        ]
      },

      // =========================
      // POSTUROGRAPHY
      // =========================
      {
        title: "Posturography",
        fields: [
          {
            name: "posturography_risk",
            label: "Risk of Falling",
            type: "radio",
            options: [
              { label: "Green (0% to 40%)", value: 0 },
              { label: "Yellow (41% to 60%)", value: 1 },
              { label: "Red (60% and above)", value: 2 },
            ],
          },
        ],
      },

      // =========================
      // FGA
      // =========================
      {
        title: "Functional Gait Assessment",
        fields: [
          "Gait Level Surface",
          "Change in Gait Speed",
          "Gait with Horizontal Head Turns",
          "Gait with Vertical Head Turns",
          "Gait and Pivot Turn",
          "Step Over Obstacle",
          "Gait with Narrow Base of Support",
          "Gait with Eyes Closed",
          "Ambulating Backward",
          "Steps"
        ]
          .map((k) => ({
            name: `fga_${k}`,
            label: formatLabel(k),
            type: "radio",
            options: [
              { label: "Normal", value: 3 },
              { label: "Mild impairment", value: 2 },
              { label: "Moderate impairment", value: 1 },
              { label: "Severe impairment", value: 0 },
            ],
          }))
          .concat([
            {
              name: "fga_total",
             label: `**Total Score (${fgaScore}/30)**`,
              type: "display",
            },
          ]),
      },

      // =========================
      // cVEMP
      // =========================
        {
          title: "cVEMP",
          fields: [
            // {
            //   name: "cvemp_pdf",
            //   label: "Require PDF attachment",
            //   type: "file-upload-modal"
            // },

            {
              type: "row",
              cols: 5,
              fields: [
                { name: "cvemp_right_n", label: "Right Ear N", type: "input" },
                { name: "cvemp_right_p1", label: "Right Ear P1", type: "input" },
                { name: "cvemp_right_n1", label: "Right Ear N1", type: "input" },
                { name: "cvemp_right_asym", label: "Right Ear P1-N1 %", type: "input" },
                { name: "cvemp_right_impression", label: "Right Ear Impression", type: "input" }
              ]
            },

            {
              type: "row",
              cols: 5,
              fields: [
                { name: "cvemp_left_n", label: "Left Ear N", type: "input" },
                { name: "cvemp_left_p1", label: "Left Ear P1", type: "input" },
                { name: "cvemp_left_n1", label: "Left Ear N1", type: "input" },
                { name: "cvemp_left_asym", label: "Left Ear P1-N1 %", type: "input" },
                { name: "cvemp_left_impression", label: "Left Ear Impression", type: "input" }
              ]
            }
          ]
        },

        {
          title: "oVEMP",
          fields: [
            // {
            //   name: "ovemp_pdf",
            //   label: "Attached PDF",
            //   type: "file-upload-modal"
            // },

            {
              type: "row",
              cols: 5,
              fields: [
                { name: "ovemp_right_n", label: "Right Ear N", type: "input" },
                { name: "ovemp_right_n1", label: "Right Ear N1", type: "input" },
                { name: "ovemp_right_p1", label: "Right Ear P1", type: "input" },
                { name: "ovemp_right_asym", label: "Right Ear N1-P1 %", type: "input" },
                { name: "ovemp_right_impression", label: "Right Ear Impression", type: "input" }
              ]
            },

            {
              type: "row",
              cols: 5,
              fields: [
                { name: "ovemp_left_n", label: "Left Ear N", type: "input" },
                { name: "ovemp_left_n1", label: "Left Ear N1", type: "input" },
                { name: "ovemp_left_p1", label: "Left Ear P1", type: "input" },
                { name: "ovemp_left_asym", label: "Left Ear N1-P1 %", type: "input" },
                { name: "ovemp_left_impression", label: "Left Ear Impression", type: "input" }
              ]
            }
          ]
        },
    ],
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