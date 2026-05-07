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
          { label: "None", value: "none"},
          { label: "Postural instability / unsteadiness", value: "Postural instability / unsteadiness" },
          { label: "Falls", value: "Falls" },
          { label: "Near falls", value: "Near falls" },
          { label: "Directional pulsion", value: "Directional pulsion" }
        ]},
        { name: "visual", label: "Visuo-vestibular symptoms", type: "checkbox-group", options: [
          { label: "None", value: "none"},
          { label: "Visual tilt", value: "Visual tilt" },
          { label: "Visual lag", value: "Visual lag" },
          { label: "Oscillopsia", value: "Oscillopsia" },
          { label: "Movement induced blur", value: "Movement induced blur" }
        ]},

        { type: "info-text", label: "2. Triggers" },
        { name: "situational", label: "Situational", type: "checkbox-group", options: [
          { label: "None", value: "none"},
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
        {
          name: "situational_details",
          label: "Specify",
          type: "textarea",
          showIf: { field: "situational", includes: "Others" }
        },
        { name: "third_window", label: "Third window", type: "checkbox-group", options: [
          { label: "None", value: "none"},
          { label: "Loud sounds", value: "Loud sounds" },
          { label: "Laughing", value: "Laughing" },
          { label: "Lifting weight", value: "Lifting weight" },
          { label: "Coughing", value: "Coughing" },
          { label: "Blowing nose", value: "Blowing nose" },
          { label: "Straining", value: "Straining" },
          { label: "Others", value: "Others" }
        ]},
        {
          name: "third_window_details",
          label: "Specify",
          type: "textarea",
          showIf: { field: "third_window", includes: "Others" }
        },
        { name: "movement", label: "Movement", type: "checkbox-group", options: [
          { label: "None", value: "none"},
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
        {
          name: "movement_details",
          label: "Specify",
          type: "textarea",
          showIf: { field: "movement", includes: "Others" }
        },

        { name: "environmental", label: "Environmental", type: "checkbox-group", options: [
          { label: "None", value: "none"},
          { label: "Open spaces", value: "Open spaces" },
          { label: "Heights", value: "Heights" },
          { label: "Darkness", value: "Darkness" },
          { label: "Crowded places", value: "Crowded places" },
          { label: "Shopping malls", value: "Shopping malls" },
          { label: "Uneven ground", value: "Uneven ground" },
          { label: "Others", value: "Others" }
        ]},
        {
          name: "environmental_details",
          label: "Specify",
          type: "textarea",
          showIf: { field: "environmental", includes: "Others" }
        },

        { type: "info-text", label: "3. Duration" },
        {
          name: "duration",
          label: "Episode duration",
          type: "checkbox-group",
          options: [
            { label: "<10s", value: "<10s" },
            { label: "10s-1min", value: "10s-1min" },
            { label: "1-5min", value: "1-5min" },
            { label: "30min-12h", value: "30min-12h" },
            { label: "12-72h", value: "12-72h" },
            { label: "Weeks", value: "weeks" },
            { label: ">3 days-<1 week", value: "3d_1w" },
            { label: "Months", value: "months" }
          ]
        },

        { type: "info-text", label: "4. Onset" },
        { name: "onset_date", label: "Date / How long ago", type: "input" },
        {
          name: "onset_after",
          label: "After what?",
          type: "checkbox-group",
          options: [
            { label: "Severe vertigo", value: "severe_vertigo" },
            { label: "Trauma", value: "trauma" },
            { label: "Immobilization", value: "immobilization" },
            { label: "Surgery", value: "surgery" },
            { label: "No association", value: "none" },
            { label: "Medication", value: "medication" },
            { label: "New diagnosis", value: "new_diagnosis" },
            { label: "Fever", value: "fever" },
            { label: "Others", value: "other" }
          ]
        },
        {
        name: "onset_after_details",
        label: "Specify",
        type: "textarea",
        showIf: { field: "onset_after", includes: "other" }
      },

        { type: "info-text", label: "5. Frequency" },
        {
          name: "frequency",
          label: "Symptom frequency",
          type: "checkbox-group",
          options: [
            { label: "Only once", value: "once" },
            { label: "Several times/day", value: "several_per_day" },
            { label: "Daily (intermittent)", value: "daily_intermittent" },
            { label: "Continuous", value: "continuous" },
            { label: "Variable symptom-free period", value: "variable_free" },
            { label: "Only with trigger", value: "trigger_only" },
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Several years", value: "years" },
            { label: "Continuous with worsening", value: "worsening" },
            { label: "Others", value: "other" }
          ]
        },
        {
          name: "frequency_details",
          label: "Specify",
          type: "textarea",
          showIf: { field: "frequency", includes: "other" }
        },

        { type: "info-text", label: "6. Evolution" },
        {
          name: "evolution",
          label: "Symptom evolution",
          type: "checkbox-group",
          options: [
            { label: "Worst initially then improving", value: "initial_worst_improving" },
            { label: "Worsening day by day", value: "worsening_daily" },
            { label: "Severe during attacks only", value: "attack_only" },
            { label: "Stable with little fluctuation", value: "stable" },
            { label: "Others", value: "other" }
          ]
        },
        {
          name: "evolution_details",
          label: "Specify",
          type: "textarea",
          showIf: { field: "evolution", includes: "other" }
        },

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
        {
          name: "conditions_details",
          label: "Specify",
          type: "textarea",
          showIf: { field: "conditions", includes: "Others" }
        },
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

  const buildGazeMatrix = (name, label) => ({
  title: null,
  fields: [
    {
      type: "accordion",
      name: `${name}_section`,
      label,
      defaultOpen: false,

      children: [
        {
          type: "refraction-12col",
          name: `${name}_matrix`,

          cornerLabel: "",
          cornerLikeGroupHeader: false,
          showColumnHeaders: true,
          showGroupHeaders: false,

          groups: [
            {
              label: null,
              columns: [
                { key: "Right Eye" },
                { key: "Left Eye" },
                { key: "Impression" }
              ]
            }
          ],

          rows: [
            {
              value: "h_spv",
              label: "Horizontal - Slow Phase Velocity",
              columns: [{ type: "input" }, { type: "input" }, { type: "input" }]
            },
            {
              value: "h_amp",
              label: "Horizontal - Amplitude",
              columns: [{ type: "input" }, { type: "input" }, { type: "input" }]
            },
            {
              value: "v_spv",
              label: "Vertical - Slow Phase Velocity",
              columns: [{ type: "input" }, { type: "input" }, { type: "input" }]
            },
            {
              value: "v_amp",
              label: "Vertical - Amplitude",
              columns: [{ type: "input" }, { type: "input" }, { type: "input" }]
            }
          ]
        }
      ]
    }
  ]
});
const buildGazePairMatrix = (name, label) => ({
  title: null,
  fields: [
    {
      type: "accordion",
      name: `${name}_section`,
      label,
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: `${name}_matrix`,
          cornerLabel: "",
          cornerLikeGroupHeader: false,
          showColumnHeaders: true,
          showGroupHeaders: true,
          groups: [
            {
              label: "Horizontal",
              columns: [{ key: "Right Eye" }, { key: "Left Eye" }]
            },
            {
              label: "Vertical",
              columns: [{ key: "Right Eye" }, { key: "Left Eye" }]
            }
          ],
          rows: [
            {
              value: "spv",
              label: "Slow Phase Velocity",
              columns: [{ type: "input" }, { type: "input" }, { type: "input" }, { type: "input" }]
            },
            {
              value: "amp",
              label: "Amplitude",
              columns: [{ type: "input" }, { type: "input" }, { type: "input" }, { type: "input" }]
            }
          ]
        },
        {
          name: `${name}_impression`,
          label: "Impression",
          type: "input"
        }
      ]
    }
  ]
});
const buildBinaryOptions = (prefix, title) => ([
  {
    type: "subheading",
    label: title
  },

  {
    type: "subheading",
    label: "Dynamic Visual Acuity (Passive)"
  },

  ...[
    "Horizontal Left Passive",
    "Horizontal Right Passive",
    "Vertical Up Passive",
    "Vertical Down Passive",
    "Left Anterior Passive",
    "Right Posterior Passive",
    "Right Anterior Passive",
    "Left Posterior Passive"
  ].map(item => ({
    name: `${prefix}_${item.toLowerCase().replace(/\s+/g, "_")}`,
    label: item,
    type: "radio-matrix",
    options: [
      { label: "Within normal range", value: 0 },
      { label: "Deviated", value: 1 }
    ]
  })),

  {
    type: "subheading",
    label: "Dynamic Visual Acuity (Active)"
  },

  ...[
    "Horizontal Left Active",
    "Horizontal Right Active",
    "Vertical Up Active",
    "Vertical Down Active",
    "Left Anterior Active",
    "Right Posterior Active",
    "Right Anterior Active",
    "Left Posterior Active"
  ].map(item => ({
    name: `${prefix}_${item.toLowerCase().replace(/\s+/g, "_")}`,
    label: item,
    type: "radio-matrix",
    options: [
      { label: "Within normal range", value: 0 },
      { label: "Deviated", value: 1 }
    ]
  }))
]);
const buildBinaryOptionsgaze = (prefix, title) => ([
  {
    type: "subheading",
    label: title
  },

  {
    type: "subheading",
    label: "Gaze Stabilization (Passive)"
  },

  ...[
    "Horizontal Left Passive",
    "Horizontal Right Passive",
    "Vertical Up Passive",
    "Vertical Down Passive",
    "Left Anterior Passive",
    "Right Posterior Passive",
    "Right Anterior Passive",
    "Left Posterior Passive",
    "Vertical Down Active"
  ].map(item => ({
    name: `${prefix}_${item.toLowerCase().replace(/\s+/g, "_")}`,
    label: item,
    type: "radio-matrix",
    options: [
      { label: "Within normal range", value: 0 },
      { label: "Deviated", value: 1 }
    ]
  })),

  {
    type: "subheading",
    label: "Gaze Stabilization (Active)"
  },

  ...[
    "Horizontal Left Active",
    "Horizontal Right Active",
    "Vertical Up Active",
    "Vertical Down Active",
    "Left Anterior Active",
    "Right Posterior Active",
    "Right Anterior Active",
    "Left Posterior Active",
    "Vertical Down Active"
  ].map(item => ({
    name: `${prefix}_${item.toLowerCase().replace(/\s+/g, "_")}`,
    label: item,
    type: "radio-matrix",
    options: [
      { label: "Within normal range", value: 0 },
      { label: "Deviated", value: 1 }
    ]
  }))
]);
  // =========================
  // FGA AUTO SCORE
  // =========================
  const fgaScore = useMemo(() => {
    // Updated filter to catch keys inside the matrix structure if needed, 
    // but primarily looks for keys starting with fga_
    return Object.keys(values)
      .filter((k) => k.startsWith("fga_"))
      .reduce((sum, k) => sum + (Number(values[k]) || 0), 0);
  }, [values]);

  // =========================
  // SCHEMA
  // =========================

  const schema = {
    title: "Vestibular Assessment",
    actions: [{ type: "back", label: "Back" }],

    sections: [
      {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "saccade_section",
            label: "Videonystagmography Saccade",
            defaultOpen: false,

            children: [
              {
                type: "refraction-12col",
                name: "saccade_matrix",

                cornerLabel: "",
                cornerLikeGroupHeader: false,
                showColumnHeaders: true,
                showGroupHeaders: true,

                groups: [
                  {
                    label: "Horizontal",
                    columns: [
                      { key: "Right Eye" },
                      { key: "Left Eye" }
                    ]
                  },
                  {
                    label: "Vertical",
                    columns: [
                      { key: "Right Eye" },
                      { key: "Left Eye" }
                    ]
                  }
                ],

                rows: [
                  {
                    value: "velocity",
                    label: "Velocity",
                    columns: [
                      { type: "input" },
                      { type: "input" },
                      { type: "input" },
                      { type: "input" }
                    ]
                  },
                  {
                    value: "precision",
                    label: "Precision",
                    columns: [
                      { type: "input" },
                      { type: "input" },
                      { type: "input" },
                      { type: "input" }
                    ]
                  },
                  {
                    value: "latency",
                    label: "Latency",
                    columns: [
                      { type: "input" },
                      { type: "input" },
                      { type: "input" },
                      { type: "input" }
                    ]
                  }
                ]
              },
              {
                name: "saccade_impression",
                label: "Impression",
                type: "input"
              }
            ]
          }
        ]
      },
      // =========================
      // SMOOTH PURSUIT
      // =========================
      {
      title: null,
      fields: [
        {
          type: "accordion",
          name: "smooth_section",
          label: "Videonystagmography Smooth Pursuit",
          defaultOpen: false,

          children: [
            {
              type: "refraction-12col",
              name: "smooth_matrix",

              cornerLabel: "",
              cornerLikeGroupHeader: false,
              showColumnHeaders: true,
              showGroupHeaders: true,

              groups: [
                {
                  label: "Horizontal",
                  columns: [
                    { key: "Right Eye" },
                    { key: "Left Eye" }
                  ]
                },
                {
                  label: "Vertical",
                  columns: [
                    { key: "Right Eye" },
                    { key: "Left Eye" }
                  ]
                }
              ],

              rows: [
                {
                  value: "velocity",
                  label: "Velocity",
                  columns: [
                    { type: "input" },
                    { type: "input" },
                    { type: "input" },
                    { type: "input" }
                  ]
                },
                {
                  value: "precision",
                  label: "Precision",
                  columns: [
                    { type: "input" },
                    { type: "input" },
                    { type: "input" },
                    { type: "input" }
                  ]
                }
              ]
            },
            {
              name: "smooth_impression",
              label: "Impression",
              type: "input"
            }
          ]
        }
      ]
    },

      // =========================
      // OPTOKINETIC
      // =========================
      {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "opto_lr_section",
            label: "Optokinetic Test - Left to Right",
            defaultOpen: false,

            children: [
              {
                type: "refraction-12col",
                name: "opto_lr_matrix",

                cornerLabel: "",
                cornerLikeGroupHeader: false,
                showColumnHeaders: true,

                groups: [
                  {
                    label: "",
                    columns: [
                      { key: "Right Eye" },
                      { key: "Left Eye" },
                      { key: "Impression" }
                    ]
                  }
                ],

                rows: [
                  {
                    value: "gain",
                    label: "Gain",
                    columns: [{ type: "input" }, { type: "input" }, { type: "input" }]
                  },
                  {
                    value: "fast_phase",
                    label: "Fast Phase Direction",
                    columns: [{ type: "input" }, { type: "input" }, { type: "input" }]
                  }
                ]
              }
            ]
          }
        ]
      },
            {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "opto_rl_section",
            label: "Optokinetic Test - Right to Left",
            defaultOpen: false,

            children: [
              {
                type: "refraction-12col",
                name: "opto_rl_matrix",

                cornerLabel: "",
                cornerLikeGroupHeader: false,
                showColumnHeaders: true,

                groups: [
                  {
                    label: "",
                    columns: [
                      { key: "Right Eye" },
                      { key: "Left Eye" },
                      { key: "Impression" }
                    ]
                  }
                ],

                rows: [
                  {
                    value: "velocity",
                    label: "Velocity",
                    columns: [{ type: "input" }, { type: "input" }, { type: "input" }]
                  },
                  {
                    value: "precision",
                    label: "Precision",
                    columns: [{ type: "input" }, { type: "input" }, { type: "input" }]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "opto_vertical_section",
            label: "Optokinetic Test - Vertical",
            defaultOpen: false,
            children: [
              {
                type: "refraction-12col",
                name: "opto_vertical_matrix",
                cornerLabel: "",
                cornerLikeGroupHeader: false,
                showColumnHeaders: true,
                showGroupHeaders: true,
                groups: [
                  {
                    label: "Top to Bottom",
                    columns: [{ key: "Right Eye" }, { key: "Left Eye" }]
                  },
                  {
                    label: "Bottom to Top",
                    columns: [{ key: "Right Eye" }, { key: "Left Eye" }]
                  }
                ],
                rows: [
                  {
                    value: "velocity",
                    label: "Velocity",
                    columns: [{ type: "input" }, { type: "input" }, { type: "input" }, { type: "input" }]
                  },
                  {
                    value: "precision",
                    label: "Precision",
                    columns: [{ type: "input" }, { type: "input" }, { type: "input" }, { type: "input" }]
                  }
                ]
              },
              {
                name: "opto_vertical_impression",
                label: "Impression",
                type: "input"
              }
            ]
          }
        ]
      },

      // =========================
      // NYSTAGMUS
      // =========================
      // Nystagmus - Light (Horizontal)
    // ======================
    {
      title: null,
      fields: [
        {
          type: "accordion",
          name: "nystagmus_light_section",
          label: "Nystagmus: Spontaneous in Light",
          defaultOpen: false,
          children: [
            {
              type: "refraction-12col",
              name: "nystagmus_light_matrix",
              cornerLabel: "",
              cornerLikeGroupHeader: false,
              showColumnHeaders: true,
              showGroupHeaders: true,
              groups: [
                {
                  label: "Horizontal",
                  columns: [{ key: "Right Eye" }, { key: "Left Eye" }]
                },
                {
                  label: "Vertical",
                  columns: [{ key: "Right Eye" }, { key: "Left Eye" }]
                }
              ],
              rows: [
                {
                  value: "spv",
                  label: "Slow Phase Velocity",
                  columns: [{ type: "input" }, { type: "input" }, { type: "input" }, { type: "input" }]
                },
                {
                  value: "amp",
                  label: "Amplitude",
                  columns: [{ type: "input" }, { type: "input" }, { type: "input" }, { type: "input" }]
                }
              ]
            },
            {
              name: "nystagmus_light_impression",
              label: "Impression",
              type: "input"
            }
          ]
        }
      ]
    },

    // ======================
    // Nystagmus - Dark (Horizontal)
    // ======================
    {
      title: null,
      fields: [
        {
          type: "accordion",
          name: "nystagmus_dark_section",
          label: "Nystagmus: Spontaneous in Dark",
          defaultOpen: false,
          children: [
            {
              type: "refraction-12col",
              name: "nystagmus_dark_matrix",
              cornerLabel: "",
              cornerLikeGroupHeader: false,
              showColumnHeaders: true,
              showGroupHeaders: true,
              groups: [
                {
                  label: "Horizontal",
                  columns: [{ key: "Right Eye" }, { key: "Left Eye" }]
                },
                {
                  label: "Vertical",
                  columns: [{ key: "Right Eye" }, { key: "Left Eye" }]
                }
              ],
              rows: [
                {
                  value: "spv",
                  label: "Slow Phase Velocity",
                  columns: [{ type: "input" }, { type: "input" }, { type: "input" }, { type: "input" }]
                },
                {
                  value: "amp",
                  label: "Amplitude",
                  columns: [{ type: "input" }, { type: "input" }, { type: "input" }, { type: "input" }]
                }
              ]
            },
            {
              name: "nystagmus_dark_impression",
              label: "Impression",
              type: "input"
            }
          ]
        }
      ]
    },

    // ======================
    // Head Shake - Horizontal
    // ======================
    {
      title: null,
      fields: [
        {
          type: "accordion",
          name: "headshake_section",
          label: "High Frequency Head Shake",
          defaultOpen: false,
          children: [
            {
              type: "refraction-12col",
              name: "headshake_matrix",
              cornerLabel: "",
              cornerLikeGroupHeader: false,
              showColumnHeaders: true,
              showGroupHeaders: true,
              groups: [
                {
                  label: "Horizontal",
                  columns: [{ key: "Right Eye" }, { key: "Left Eye" }]
                },
                {
                  label: "Vertical",
                  columns: [{ key: "Right Eye" }, { key: "Left Eye" }]
                }
              ],
              rows: [
                {
                  value: "spv",
                  label: "Slow Phase Velocity",
                  columns: [{ type: "input" }, { type: "input" }, { type: "input" }, { type: "input" }]
                },
                {
                  value: "amp",
                  label: "Amplitude",
                  columns: [{ type: "input" }, { type: "input" }, { type: "input" }, { type: "input" }]
                }
              ]
            },
            {
              name: "headshake_impression",
              label: "Impression",
              type: "input"
            }
          ]
        }
      ]
    },

    // ======================
    // Others (keep as is)
    // ======================
    {
      title: "Nystagmus - Others",
      fields: [
        {
          type: "row",
          cols: 2,
          fields: [
            {
              name: "nystagmus_other_test",
              label: "Test",
              type: "input"
            },
            {
              name: "nystagmus_other_impression",
              label: "Impression",
              type: "input"
            }
          ]
        }
      ]
    },

      // =========================
      // GAZE (ALL DIRECTIONS)
      // =========================
      buildGazeMatrix("gaze_center", "Gaze Test: Centre With Fixation"),
      buildGazePairMatrix("gaze_left_right", "Gaze Test: Left / Right With Fixation"),
      buildGazePairMatrix("gaze_up_down", "Gaze Test: Up / Down With Fixation"),
      buildGazeMatrix("gaze_center_without", "Gaze Test: Centre Without Fixation"),
      buildGazePairMatrix("gaze_left_right_without", "Gaze Test: Left / Right Without Fixation"),
      buildGazePairMatrix("gaze_up_down_without", "Gaze Test: Up / Down Without Fixation"),
      // =========================
      // SVV
      // =========================
      {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "svv_section",
            label: "Subjective Visual Vertical",
            defaultOpen: false,

            children: [
              {
                type: "refraction-12col",
                name: "svv_matrix",

                cornerLabel: "",
                cornerLikeGroupHeader: false,
                showColumnHeaders: true,
                showGroupHeaders: false,

                groups: [
                  {
                    label: null,
                    columns: [
                      { key: "Result" },
                      { key: "Impression" }
                    ]
                  }
                ],

                rows: [
                  {
                    value: "clockwise",
                    label: "Clockwise",
                    columns: [
                      { type: "input" },
                      { type: "input" }
                    ]
                  },
                  {
                    value: "anticlockwise",
                    label: "Anticlockwise",
                    columns: [
                      { type: "input" },
                      { type: "input" }
                    ]
                  },
                  {
                    value: "blank",
                    label: "Blank",
                    columns: [
                      { type: "input" },
                      { type: "input" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "positional_section",
            label: "Positional Test",
            defaultOpen: false,

            children: [
              {
                type: "refraction-12col",
                name: "positional_matrix",

                cornerLabel: "",
                cornerLikeGroupHeader: false,
                showColumnHeaders: true,
                showGroupHeaders: false,

                groups: [
                  {
                    label: null,
                    columns: [
                      { key: "Right Side" },
                      { key: "Left Side" }
                    ]
                  }
                ],

                rows: [
                  {
                    value: "dixhallpike",
                    label: "Dix Hallpike",
                    columns: [{ type: "input" }, { type: "input" }]
                  },
                  {
                    value: "epley",
                    label: "Epley Maneuver",
                    columns: [{ type: "input" }, { type: "input" }]
                  },
                  {
                    value: "rolltest",
                    label: "Roll Test",
                    columns: [{ type: "input" }, { type: "input" }]
                  },
                  {
                    value: "barbecue",
                    label: "Barbecue Roll Test",
                    columns: [{ type: "input" }, { type: "input" }]
                  },
                  {
                    value: "supine",
                    label: "Supine Straight Head Extension",
                    columns: [{ type: "input" }, { type: "input" }]
                  },
                  {
                    value: "semont",
                    label: "Semont",
                    columns: [{ type: "input" }, { type: "input" }]
                  },
                  {
                    value: "gufoni",
                    label: "Gufoni",
                    columns: [{ type: "input" }, { type: "input" }]
                  },
                  {
                    value: "appiani",
                    label: "Appiani",
                    columns: [{ type: "input" }, { type: "input" }]
                  },
                  {
                    value: "others",
                    label: "Others",
                    columns: [{ type: "input" }, { type: "input" }]
                  }
                ]
              }
            ]
          }
        ]
      },
      // =========================
      // DVA + GAZE STABILIZATION
      // =========================
      {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "dva_section",
            label: "Dynamic Visual Acuity (DVA)",
            defaultOpen: false,

            children: [
              ...buildBinaryOptions("dva", "")
            ]
          },

          {
            type: "accordion",
            name: "gaze_section",
            label: "Gaze Stabilization",
            defaultOpen: false,

            children: [
              ...buildBinaryOptionsgaze("gaze_stab", "")
            ]
          }
        ]
      },

      // =========================
      // vHIT
      // =========================
      {
      title: null,
      fields: [
        {
          type: "accordion",
          name: "vhit_section",
          label: "Video Head Impulse Test (vHIT)",
          defaultOpen: false,

          children: [
            {
              type: "refraction-12col",
              name: "vhit_matrix",

              cornerLabel: "Canal",
              cornerLikeGroupHeader: true,
              showColumnHeaders: true,
              showGroupHeaders: false,

              groups: [
                {
                  label: null,
                  columns: [
                    { key: "n" },
                    { key: "Mean Gain" },
                    { key: "Standard Deviation" },
                    { key: "Asymmetry (%)" },
                    { key: "Impression" }
                  ]
                }
              ],

              rows: [
                { value: "anterior_r", label: "Anterior Right", columns: [{type:"input"},{type:"input"},{type:"input"},{type:"input"},{type:"input"}] },
                { value: "anterior_l", label: "Anterior Left",  columns: [{type:"input"},{type:"input"},{type:"input"},{type:"input"},{type:"input"}] },

                { value: "lateral_r", label: "Lateral Right",   columns: [{type:"input"},{type:"input"},{type:"input"},{type:"input"},{type:"input"}] },
                { value: "lateral_l", label: "Lateral Left",    columns: [{type:"input"},{type:"input"},{type:"input"},{type:"input"},{type:"input"}] },

                { value: "posterior_r", label: "Posterior Right", columns: [{type:"input"},{type:"input"},{type:"input"},{type:"input"},{type:"input"}] },
                { value: "posterior_l", label: "Posterior Left",  columns: [{type:"input"},{type:"input"},{type:"input"},{type:"input"},{type:"input"}] }
              ]
            }
          ]
        }
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
      // FGA (Refactored to Accordion/Matrix)
      // =========================
      {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "fga_section",
            label: "Functional Gait Assessment",
            defaultOpen: false,
            children: [
              ...[
                { key: "gait_level_surface", label: "Gait Level Surface" },
                { key: "change_in_gait_speed", label: "Change in Gait Speed" },
                { key: "gait_with_horizontal_head_turns", label: "Gait with Horizontal Head Turns" },
                { key: "gait_with_vertical_head_turns", label: "Gait with Vertical Head Turns" },
                { key: "gait_and_pivot_turn", label: "Gait and Pivot Turn" },
                { key: "step_over_obstacle", label: "Step Over Obstacle" },
                { key: "gait_with_narrow_base_of_support", label: "Gait with Narrow Base of Support" },
                { key: "gait_with_eyes_closed", label: "Gait with Eyes Closed" },
                { key: "ambulating_backward", label: "Ambulating Backward" },
                { key: "steps", label: "Steps" }
              ].map((item) => ({
                name: `fga_${item.key}`,
                label: item.label,
                type: "radio-matrix",
                options: [
                  { label: "Normal (3)", value: 3 },
                  { label: "Mild impairment (2)", value: 2 },
                  { label: "Moderate impairment (1)", value: 1 },
                  { label: "Severe impairment (0)", value: 0 }
                ]
              })),
              {
                name: "fga_total_display",
                label: `**Total Score (${fgaScore}/30)**`,
                type: "display",
                style: { marginTop: "1rem", fontWeight: "bold", fontSize: "1.1em" }
              }
            ]
          }
        ]
      },

      // =========================
      // cVEMP
      // =========================
       {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "cvemp_section",
            label: "cVEMP",
            defaultOpen: false,

            children: [
              {
                type: "refraction-12col",
                name: "cvemp_matrix",

                cornerLabel: "Side",
                cornerLikeGroupHeader: true,

                showColumnHeaders: true,
                showGroupHeaders: false,

                groups: [
                  {
                    label: null,
                    columns: [
                      { key: "N" },
                      { key: "P1" },
                      { key: "N1" },
                      { key: "P1-N1 (%)" },
                      { key: "Impression" }
                    ]
                  }
                ],

                rows: [
                  {
                    value: "right",
                    label: "Right Ear",
                    columns: [
                      { type: "input", name: "cvemp_right_n" },
                      { type: "input", name: "cvemp_right_p1" },
                      { type: "input", name: "cvemp_right_n1" },
                      { type: "input", name: "cvemp_right_asym" },
                      { type: "input", name: "cvemp_right_impression" }
                    ]
                  },
                  {
                    value: "left",
                    label: "Left Ear",
                    columns: [
                      { type: "input", name: "cvemp_left_n" },
                      { type: "input", name: "cvemp_left_p1" },
                      { type: "input", name: "cvemp_left_n1" },
                      { type: "input", name: "cvemp_left_asym" },
                      { type: "input", name: "cvemp_left_impression" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

       {
        title: null,
        fields: [
          {
            type: "accordion",
            name: "ovemp_section",
            label: "oVEMP",
            defaultOpen: false,

            children: [
              {
                type: "refraction-12col",
                name: "ovemp_matrix",

                cornerLabel: "Side",
                cornerLikeGroupHeader: true,

                showColumnHeaders: true,
                showGroupHeaders: false,

                groups: [
                  {
                    label: null,
                    columns: [
                      { key: "N" },
                      { key: "N1" },
                      { key: "P1" },
                      { key: "N1-P1 (%)" },
                      { key: "Impression" }
                    ]
                  }
                ],

                rows: [
                  {
                    value: "right",
                    label: "Right Ear",
                    columns: [
                      { type: "input", name: "ovemp_right_n" },
                      { type: "input", name: "ovemp_right_n1" },
                      { type: "input", name: "ovemp_right_p1" },
                      { type: "input", name: "ovemp_right_asym" },
                      { type: "input", name: "ovemp_right_impression" }
                    ]
                  },
                  {
                    value: "left",
                    label: "Left Ear",
                    columns: [
                      { type: "input", name: "ovemp_left_n" },
                      { type: "input", name: "ovemp_left_n1" },
                      { type: "input", name: "ovemp_left_p1" },
                      { type: "input", name: "ovemp_left_asym" },
                      { type: "input", name: "ovemp_left_impression" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
       
    {
      title: null,
      fields: [
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

              cornerLabel: "Intervention",
              cornerLikeGroupHeader: true,
              showColumnHeaders: true,

              groups: [
                {
                  label: null,
                  columns: [
                    { key: "Yes / No" },
                    { key: "Remarks" }
                  ]
                }
              ],

              rows: [
                {
                  value: "vre",
                  label: "Vestibular Rehabilitation Exercises",
                  columns: [
                    {
                      type: "select",
                      name: "vre_option",
                      options: [
                        { label: "No", value: 0 },
                        { label: "Yes", value: 1 }
                      ]
                    },
                    { type: "input", name: "vre_notes" }
                  ]
                },
                {
                  value: "crm",
                  label: "Canalith Repositioning Maneuver",
                  columns: [
                    {
                      type: "select",
                      name: "crm_option",
                      options: [
                        { label: "No", value: 0 },
                        { label: "Yes", value: 1 }
                      ]
                    },
                    { type: "input", name: "crm_notes" }
                  ]
                },
                {
                  value: "gst",
                  label: "Gaze Stability Training",
                  columns: [
                    {
                      type: "select",
                      name: "gst_option",
                      options: [
                        { label: "No", value: 0 },
                        { label: "Yes", value: 1 }
                      ]
                    },
                    { type: "input", name: "gst_notes" }
                  ]
                },
                {
                  value: "fall",
                  label: "Fall Prevention Education",
                  columns: [
                    {
                      type: "select",
                      name: "fall_option",
                      options: [
                        { label: "No", value: 0 },
                        { label: "Yes", value: 1 }
                      ]
                    },
                    { type: "input", name: "fall_notes" }
                  ]
                },
                {
                  value: "psycho",
                  label: "Psychosocial Counseling",
                  columns: [
                    {
                      type: "select",
                      name: "psycho_option",
                      options: [
                        { label: "No", value: 0 },
                        { label: "Yes", value: 1 }
                      ]
                    },
                    { type: "input", name: "psycho_notes" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
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