import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ── Scale options per section ── */
const PSYCHOSOCIAL_OPTS = [
  { label: "Strongly disagree (1)", value: "1" },
  { label: "Disagree (2)",          value: "2" },
  { label: "Agree (3)",             value: "3" },
  { label: "Strongly agree (4)",    value: "4" },
  { label: "Not applicable",        value: "na" },
];

const ACTIVITY_OPTS = [
  { label: "Yes, limited a lot (2)", value: "2" },
  { label: "Limited a little (1)",   value: "1" },
  { label: "No, not limited (0)",    value: "0" },
  { label: "Not applicable",         value: "na" },
];

const SATISFACTION_OPTS = [
  { label: "Not satisfied (1)", value: "1" },
  { label: "Satisfied (2)",     value: "2" },
  { label: "Very satisfied (3)",value: "3" },
];

const row = (name, label, opts) => ({
  type: "radio-matrix", name, label, options: opts, showInfoInRow: false,
});

/* ── Score helper ── */
function sectionScore(keys, values, naValue = "na") {
  let total = 0, answered = 0;
  keys.forEach(k => {
    const v = values[k];
    if (v && v !== naValue) { total += Number(v); answered++; }
  });
  return { total, answered };
}

function ScoreBar({ label, total, answered, max }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 16px", background: "#0369a1", borderRadius: 8, marginTop: 12
    }}>
      <span style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{label}</span>
      <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>
        {answered === 0 ? `— / ${max}` : `${total} / ${max}`}
      </span>
    </div>
  );
}

export default function TAPESForm({ values, onChange }) {
  const schema = {
    title: "Trinity Amputation and Prosthesis Experience Scales (TAPES)",
    fields: [

      { type: "subheading", label: "Part 1" },

      /* ── Section 1: Psychosocial Adjustment ── */
      {
        type: "accordion", name: "tapes_psychosocial",
        label: "Section 1: Psychosocial Adjustment",
        defaultOpen: true,
        children: [
          { type: "subheading", label: "" },
          row("tp_1",  "1. I have adjusted to having a prosthesis",                                    PSYCHOSOCIAL_OPTS),
          row("tp_2",  "2. As time goes by, I accept my prosthesis more",                              PSYCHOSOCIAL_OPTS),
          row("tp_3",  "3. I feel that I have dealt successfully with this trauma in my life",         PSYCHOSOCIAL_OPTS),
          row("tp_4",  "4. Although I have a prosthesis, my life is full",                             PSYCHOSOCIAL_OPTS),
          row("tp_5",  "5. I have gotten used to wearing a prosthesis",                                PSYCHOSOCIAL_OPTS),
          row("tp_6",  "6. I don't care if somebody looks at my prosthesis",                           PSYCHOSOCIAL_OPTS),
          row("tp_7",  "7. I find it easy to talk about my prosthesis",                                PSYCHOSOCIAL_OPTS),
          row("tp_8",  "8. I don't mind people asking about my prosthesis",                            PSYCHOSOCIAL_OPTS),
          row("tp_9",  "9. I find it easy to talk about my limb loss in conversation",                 PSYCHOSOCIAL_OPTS),
          row("tp_10", "10. I don't care if somebody notices that I am limping",                       PSYCHOSOCIAL_OPTS),
          row("tp_11", "11. A prosthesis interferes with the ability to do my work",                   PSYCHOSOCIAL_OPTS),
          row("tp_12", "12. Having a prosthesis makes me more dependent on others than I would like",  PSYCHOSOCIAL_OPTS),
          row("tp_13", "13. Having a prosthesis limits the kind of work that I can do",                PSYCHOSOCIAL_OPTS),
          row("tp_14", "14. Being an amputee means that I can't do what I want to do",                 PSYCHOSOCIAL_OPTS),
          row("tp_15", "15. Having a prosthesis limits the amount of work that I can do",              PSYCHOSOCIAL_OPTS),
          {
            name: "_tp_score", type: "custom",
            render: ({ values }) => {
              const keys = Array.from({length:15},(_,i)=>`tp_${i+1}`);
              const { total, answered } = sectionScore(keys, values);
              return <ScoreBar label="Section 1 Score" total={total} answered={answered} max={60} />;
            }
          },
        ],
      },

      /* ── Section 2: Activity Restriction ── */
      {
        type: "accordion", name: "tapes_activity",
        label: "Section 2: Activity Restriction",
        defaultOpen: false,
        children: [
          { type: "subheading", label: "" },
          row("ta_a", "(a) Vigorous activities, such as running, lifting heavy objects, participating in strenuous sports", ACTIVITY_OPTS),
          row("ta_b", "(b) Climbing several flights of stairs",   ACTIVITY_OPTS),
          row("ta_c", "(c) Running for a bus",                    ACTIVITY_OPTS),
          row("ta_d", "(d) Sport and recreation",                 ACTIVITY_OPTS),
          row("ta_e", "(e) Climbing one flight of stairs",        ACTIVITY_OPTS),
          row("ta_f", "(f) Walking more than a mile",             ACTIVITY_OPTS),
          row("ta_g", "(g) Walking half a mile",                  ACTIVITY_OPTS),
          row("ta_h", "(h) Walking 100 metres",                   ACTIVITY_OPTS),
          row("ta_i", "(i) Working on hobbies",                   ACTIVITY_OPTS),
          row("ta_j", "(j) Going to work",                        ACTIVITY_OPTS),
          {
            name: "_ta_score", type: "custom",
            render: ({ values }) => {
              const keys = ["ta_a","ta_b","ta_c","ta_d","ta_e","ta_f","ta_g","ta_h","ta_i","ta_j"];
              const { total, answered } = sectionScore(keys, values);
              return <ScoreBar label="Section 2 Score" total={total} answered={answered} max={20} />;
            }
          },
        ],
      },

      /* ── Section 3: Prosthesis Satisfaction ── */
      {
        type: "accordion", name: "tapes_satisfaction",
        label: "Section 3: Prosthesis Satisfaction",
        defaultOpen: false,
        children: [
          { type: "subheading", label: "" },
          row("ts_i",    "(i) Colour",      SATISFACTION_OPTS),
          row("ts_ii",   "(ii) Shape",      SATISFACTION_OPTS),
          row("ts_iii",  "(iii) Appearance",SATISFACTION_OPTS),
          row("ts_iv",   "(iv) Weight",     SATISFACTION_OPTS),
          row("ts_v",    "(v) Usefulness",  SATISFACTION_OPTS),
          row("ts_vi",   "(vi) Reliability",SATISFACTION_OPTS),
          row("ts_vii",  "(vii) Fit",       SATISFACTION_OPTS),
          row("ts_viii", "(viii) Comfort",  SATISFACTION_OPTS),
          {
            name: "_ts_score", type: "custom",
            render: ({ values }) => {
              const keys = ["ts_i","ts_ii","ts_iii","ts_iv","ts_v","ts_vi","ts_vii","ts_viii"];
              const { total, answered } = sectionScore(keys, values, null);
              return <ScoreBar label="Section 3 Score" total={total} answered={answered} max={24} />;
            }
          },
        ],
      },

      /* ── Overall Satisfaction Slider ── */
      {
        name: "tapes_overall_satisfaction",
        label: "Please circle the number (0–10) that best describes how satisfied you are with your prosthesis?",
        type: "scale-slider",
        min: 0, max: 10, step: 1, showValue: true,
        ranges: [
          { min: 0, max: 4,  label: "Not at all Satisfied", color: "#ef4444" },
          { min: 4, max: 7,  label: "Moderately Satisfied",  color: "#f59e0b" },
          { min: 7, max: 10, label: "Very Satisfied",        color: "#22c55e" },
        ],
      },
      { name: "tapes_overall_satisfaction", label: "Overall Satisfaction Score", type: "score-box" },

      /* ── Part II ── */
      {
        type: "accordion", name: "tapes_part2",
        label: "Part II",
        defaultOpen: false,
        children: [
          /* Q1 */
          { name: "p2_hours_worn", label: "1. On average, how many hours a day do you wear your prosthesis?", type: "input", placeholder: "hours" },

          /* Q2 — radio-matrix */
          {
            name: "p2_health",
            label: "2. In general, would you say your health is:",
            type: "radio-matrix",
            options: [
              { label: "Very Poor (1)", value: "1" }, { label: "Poor (2)", value: "2" },
              { label: "Fair (3)",      value: "3" }, { label: "Good (4)", value: "4" },
              { label: "Very Good (5)", value: "5" },
            ]
          },

          /* Q3 — radio-matrix */
          {
            name: "p2_physical",
            label: "3. In general, would you say your physical capabilities are:",
            type: "radio-matrix",
            options: [
              { label: "Very Poor (1)", value: "1" }, { label: "Poor (2)", value: "2" },
              { label: "Fair (3)",      value: "3" }, { label: "Good (4)", value: "4" },
              { label: "Very Good (5)", value: "5" },
            ]
          },

          /* Q4 — Stump Pain */
          {
            name: "p2_stump_pain",
            label: "4(a) Do you experience residual limb (stump) pain (pain in the remaining part of your amputated limb)?",
            type: "radio", labelAbove: true,
            options: [{ label: "No (0)", value: "0" }, { label: "Yes (1)", value: "1" }]
          },
          { name: "p2_stump_freq",
            label: "(b) During the last week, how many times have you experienced stump pain?",
            type: "input", placeholder: "number of times",
            showIf: { field: "p2_stump_pain", equals: "1" }
          },
          { name: "p2_stump_duration",
            label: "(c) How long, on average, did each episode of pain last?",
            type: "input", placeholder: "duration",
            showIf: { field: "p2_stump_pain", equals: "1" }
          },
          {
            name: "p2_stump_level",
            label: "(d) Average level of stump pain during the last week:",
            type: "radio", labelAbove: true,
            showIf: { field: "p2_stump_pain", equals: "1" },
            options: [
              { label: "Excruciating (5)", value: "5" }, { label: "Horrible (4)",      value: "4" },
              { label: "Distressing (3)",  value: "3" }, { label: "Discomforting (2)", value: "2" },
              { label: "Mild (1)",         value: "1" },
            ]
          },
          {
            name: "p2_stump_interfere",
            label: "(e) How much did stump pain interfere with your normal lifestyle (e.g. work, social and family activities) during the last week?",
            type: "radio", labelAbove: true,
            showIf: { field: "p2_stump_pain", equals: "1" },
            options: [
              { label: "A Lot (5)",      value: "5" }, { label: "Quite a Bit (4)", value: "4" },
              { label: "Moderately (3)", value: "3" }, { label: "A Little Bit (2)", value: "2" },
              { label: "Not at All (1)", value: "1" },
            ]
          },

          /* Q5 — Phantom Limb Pain */
          {
            name: "p2_phantom_pain",
            label: "5(a) Do you experience phantom limb pain (pain in the part of the limb which was amputated)?",
            type: "radio", labelAbove: true,
            options: [{ label: "No (0)", value: "0" }, { label: "Yes (1)", value: "1" }]
          },
          { name: "p2_phantom_freq",
            label: "(b) During the last week, how many times have you experienced phantom limb pain?",
            type: "input", placeholder: "number of times",
            showIf: { field: "p2_phantom_pain", equals: "1" }
          },
          { name: "p2_phantom_duration",
            label: "(c) How long, on average, did each episode of pain last?",
            type: "input", placeholder: "duration",
            showIf: { field: "p2_phantom_pain", equals: "1" }
          },
          {
            name: "p2_phantom_level",
            label: "(d) Average level of phantom limb pain during the last week:",
            type: "radio", labelAbove: true,
            showIf: { field: "p2_phantom_pain", equals: "1" },
            options: [
              { label: "Excruciating (5)", value: "5" }, { label: "Horrible (4)",      value: "4" },
              { label: "Distressing (3)",  value: "3" }, { label: "Discomforting (2)", value: "2" },
              { label: "Mild (1)",         value: "1" },
            ]
          },
          {
            name: "p2_phantom_interfere",
            label: "(e) How much did phantom limb pain interfere with your normal lifestyle (e.g. work, social and family activities) during the last week?",
            type: "radio", labelAbove: true,
            showIf: { field: "p2_phantom_pain", equals: "1" },
            options: [
              { label: "A Lot (5)",      value: "5" }, { label: "Quite a Bit (4)", value: "4" },
              { label: "Moderately (3)", value: "3" }, { label: "A Little Bit (2)", value: "2" },
              { label: "Not at All (1)", value: "1" },
            ]
          },

          /* Q6 — Other Medical Problems */
          {
            name: "p2_other_problems",
            label: "6(a) Do you experience any other medical problems apart from stump pain or phantom limb pain?",
            type: "radio", labelAbove: true,
            options: [{ label: "No (0)", value: "0" }, { label: "Yes (1)", value: "1" }]
          },
          { name: "p2_other_specify",
            label: "(b) Please specify what problems you experience",
            type: "input",
            showIf: { field: "p2_other_problems", equals: "1" }
          },
          { name: "p2_other_freq",
            label: "(c) During the last week, how many times have you suffered from these medical problems?",
            type: "input", placeholder: "number of times",
            showIf: { field: "p2_other_problems", equals: "1" }
          },
          { name: "p2_other_duration",
            label: "(d) How long, on average, did each problem last?",
            type: "input", placeholder: "duration",
            showIf: { field: "p2_other_problems", equals: "1" }
          },
          {
            name: "p2_other_level",
            label: "(e) Level of pain from these problems during the last week:",
            type: "radio", labelAbove: true,
            showIf: { field: "p2_other_problems", equals: "1" },
            options: [
              { label: "Excruciating (5)", value: "5" }, { label: "Horrible (4)",      value: "4" },
              { label: "Distressing (3)",  value: "3" }, { label: "Discomforting (2)", value: "2" },
              { label: "Mild (1)",         value: "1" },
            ]
          },
          {
            name: "p2_other_interfere",
            label: "(f) How much did these medical problems interfere with your normal lifestyle (e.g. work, social and family activities) during the last week?",
            type: "radio", labelAbove: true,
            showIf: { field: "p2_other_problems", equals: "1" },
            options: [
              { label: "A Lot (5)",      value: "5" }, { label: "Quite a Bit (4)", value: "4" },
              { label: "Moderately (3)", value: "3" }, { label: "A Little Bit (2)", value: "2" },
              { label: "Not at All (1)", value: "1" },
            ]
          },
          {
            name: "p2_other_pain_extra",
            label: "(g) Do you experience any other pain that you have not previously mentioned?",
            type: "radio", labelAbove: true,
            showIf: { field: "p2_other_problems", equals: "1" },
            options: [{ label: "No (0)", value: "0" }, { label: "Yes (1)", value: "1" }]
          },
          { name: "p2_other_pain_specify",
            label: "If yes, please specify",
            type: "input",
            showIf: { field: "p2_other_pain_extra", equals: "1" }
          },

          /* Q7 */
          {
            name: "p2_completed_by",
            label: "7. Did you complete this questionnaire?",
            type: "radio", labelAbove: true,
            options: [{ label: "On your own", value: "own" }, { label: "With assistance", value: "assisted" }]
          },

          /* Q8 — auto today's date */
          {
            name: "_p2_date",
            type: "custom",
            render: () => (
              <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>8. Date of Completion: </span>
                {new Date().toLocaleDateString()}
              </div>
            )
          },
        ],
      },

    ],
  };

  return (
    <CommonFormBuilder schema={schema} values={values} onChange={onChange} submitted={false} layout="nested" />
  );
}
