import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ── Shared option sets ── */
const FREQ_NEVER_ALWAYS = [
  { label: "Never",     value: "0" },
  { label: "Rarely",    value: "1" },
  { label: "Sometimes", value: "2" },
  { label: "Often",     value: "3" },
  { label: "Always",    value: "4" },
];

const FREQ_ALWAYS_NEVER = [
  { label: "Always",    value: "0" },
  { label: "Often",     value: "1" },
  { label: "Sometimes", value: "2" },
  { label: "Rarely",    value: "3" },
  { label: "Never",     value: "4" },
];

const SEVERITY = [
  { label: "None",     value: "0" },
  { label: "Mild",     value: "1" },
  { label: "Moderate", value: "2" },
  { label: "Severe",   value: "3" },
  { label: "Extreme",  value: "4" },
];

const FREQ_MONTHLY = [
  { label: "Never",      value: "0" },
  { label: "Monthly",    value: "1" },
  { label: "Weekly",     value: "2" },
  { label: "Daily",      value: "3" },
  { label: "Always",     value: "4" },
];

const FREQ_CONSTANTLY = [
  { label: "Never",      value: "0" },
  { label: "Monthly",    value: "1" },
  { label: "Weekly",     value: "2" },
  { label: "Daily",      value: "3" },
  { label: "Constantly", value: "4" },
];

const LIFESTYLE = [
  { label: "Not at all", value: "0" },
  { label: "Mildly",     value: "1" },
  { label: "Moderately", value: "2" },
  { label: "Severely",   value: "3" },
  { label: "Totally",    value: "4" },
];

const CONFIDENCE = [
  { label: "Not at all",  value: "0" },
  { label: "Mildly",      value: "1" },
  { label: "Moderately",  value: "2" },
  { label: "Severely",    value: "3" },
  { label: "Extremely",   value: "4" },
];

/* ── Key groups ── */
const SYM_KEYS = ["faos_s1","faos_s2","faos_s3","faos_s4","faos_s5","faos_s6","faos_s7"];
const PAIN_KEYS = ["faos_p1","faos_p2","faos_p3","faos_p4","faos_p5","faos_p6","faos_p7","faos_p8","faos_p9"];
const ADL_KEYS  = ["faos_a1","faos_a2","faos_a3","faos_a4","faos_a5","faos_a6","faos_a7","faos_a8",
                   "faos_a9","faos_a10","faos_a11","faos_a12","faos_a13","faos_a14","faos_a15","faos_a16","faos_a17"];
const SP_KEYS   = ["faos_sp1","faos_sp2","faos_sp3","faos_sp4","faos_sp5"];
const QOL_KEYS  = ["faos_q1","faos_q2","faos_q3","faos_q4"];

function sumKeys(keys, values) {
  return keys.reduce((acc, k) => acc + (Number(values?.[k]) || 0), 0);
}
function subscaleScore(sum, max) {
  return (100 - ((sum / max) * 100)).toFixed(1);
}

/* ── Helper builders ── */
const rm = (name, label, options) => ({
  type: "radio", name, label, labelAbove: true, options,
});

function ScoreBox({ label, score, color = "#2563eb" }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 16px", borderRadius: 8, background: color,
      color: "#fff", fontSize: 14, marginTop: 8,
    }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 16 }}>{score}</span>
    </div>
  );
}

const FAOS_SCHEMA = {
  title: "Foot and Ankle Outcome Score (FAOS)",
  sections: [{
    fields: [
      {
        type: "label",
        label: "Instructions: This survey asks for your opinion about your foot/ankle. Answer each question by ticking the appropriate box (only one box for each question). If you are uncertain about how to answer a question, please give the best answer you can."
      },

      /* ── I. SYMPTOMS ── */
      {
        type: "accordion", name: "faos_sym_acc", label: "I. Symptoms", defaultOpen: true,
        children: [
          { type: "label", label: "Answer these questions thinking of your foot/ankle symptoms during the last week." },
          rm("faos_s1", "S1. Do you have swelling in your foot/ankle?",                                          FREQ_NEVER_ALWAYS, "Frequency"),
          rm("faos_s2", "S2. Do you feel grinding, hear clicking, or any other type of noise when your foot/ankle moves?", FREQ_NEVER_ALWAYS),
          rm("faos_s3", "S3. Does your foot/ankle catch or hang up when moving?",                                FREQ_NEVER_ALWAYS),
          rm("faos_s4", "S4. Can you straighten your foot/ankle fully?",                                         FREQ_ALWAYS_NEVER),
          rm("faos_s5", "S5. Can you bend your foot/ankle fully?",                                               FREQ_ALWAYS_NEVER),
          { type: "label", label: "Stiffness is a sensation of restriction or slowness in the ease with which you move your foot/ankle joint." },
          rm("faos_s6", "S6. How severe is your foot/ankle joint stiffness after first wakening in the morning?", SEVERITY),
          rm("faos_s7", "S7. How severe is your foot/ankle joint stiffness after sitting, lying, or resting later in the day?", SEVERITY),
          {
            type: "custom", name: "faos_sym_score",
            render: ({ values }) => {
              const s = sumKeys(SYM_KEYS, values);
              return <ScoreBox label="Symptoms Subscale Score" score={`${subscaleScore(s, 28)} / 100`} />;
            }
          },
        ]
      },

      /* ── II. PAIN ── */
      {
        type: "accordion", name: "faos_pain_acc", label: "II. Pain", defaultOpen: true,
        children: [
          {
            type: "radio", name: "faos_p1", label: "P1. How often do you experience foot/ankle pain?",
            labelAbove: true, options: FREQ_MONTHLY,
          },
          { type: "subheading", label: "What amount of foot/ankle pain have you experienced the last week during the following activities?" },
          rm("faos_p2", "P2. Twisting/pivoting on your foot/ankle",  SEVERITY, "Pain level"),
          rm("faos_p3", "P3. Straightening foot/ankle fully",         SEVERITY),
          rm("faos_p4", "P4. Bending foot/ankle fully",               SEVERITY),
          rm("faos_p5", "P5. Walking on a flat surface",              SEVERITY),
          rm("faos_p6", "P6. Going up or down stairs",                SEVERITY),
          rm("faos_p7", "P7. At night while in bed",                  SEVERITY),
          rm("faos_p8", "P8. Sitting or lying",                       SEVERITY),
          rm("faos_p9", "P9. Standing upright",                       SEVERITY),
          {
            type: "custom", name: "faos_pain_score",
            render: ({ values }) => {
              const s = sumKeys(PAIN_KEYS, values);
              return <ScoreBox label="Pain Subscale Score" score={`${subscaleScore(s, 36)} / 100`} />;
            }
          },
        ]
      },

      /* ── III. FUNCTION, DAILY LIVING ── */
      {
        type: "accordion", name: "faos_adl_acc", label: "III. Function, Daily Living", defaultOpen: false,
        children: [
          { type: "label", label: "This section describes your ability to move around and to look after yourself. For each of the following activities, please indicate the degree of difficulty you have experienced in the last week due to your foot/ankle." },
          rm("faos_a1",  "A1. Descending stairs",                                          SEVERITY, "Difficulty"),
          rm("faos_a2",  "A2. Ascending stairs",                                           SEVERITY),
          rm("faos_a3",  "A3. Rising from sitting",                                        SEVERITY),
          rm("faos_a4",  "A4. Standing",                                                   SEVERITY),
          rm("faos_a5",  "A5. Bending to the floor/pick up an object",                     SEVERITY),
          rm("faos_a6",  "A6. Walking on a flat surface",                                  SEVERITY),
          rm("faos_a7",  "A7. Getting in/out of car",                                      SEVERITY),
          rm("faos_a8",  "A8. Going shopping",                                             SEVERITY),
          rm("faos_a9",  "A9. Putting on socks/stockings",                                 SEVERITY),
          rm("faos_a10", "A10. Rising from bed",                                           SEVERITY),
          rm("faos_a11", "A11. Taking off socks/stockings",                                SEVERITY),
          rm("faos_a12", "A12. Lying in bed (turning over, maintaining foot/ankle position)", SEVERITY),
          rm("faos_a13", "A13. Getting in/out of bath",                                    SEVERITY),
          rm("faos_a14", "A14. Sitting",                                                   SEVERITY),
          rm("faos_a15", "A15. Getting on/off toilet",                                     SEVERITY),
          rm("faos_a16", "A16. Heavy domestic duties (moving heavy boxes, scrubbing floors, etc)", SEVERITY),
          rm("faos_a17", "A17. Light domestic duties (cooking, dusting, etc)",             SEVERITY),
          {
            type: "custom", name: "faos_adl_score",
            render: ({ values }) => {
              const s = sumKeys(ADL_KEYS, values);
              return <ScoreBox label="Daily Living Subscale Score" score={`${subscaleScore(s, 68)} / 100`} />;
            }
          },
        ]
      },

      /* ── IV. SPORTS & RECREATION ── */
      {
        type: "accordion", name: "faos_sp_acc", label: "IV. Function, Sports and Recreational Activities", defaultOpen: false,
        children: [
          { type: "label", label: "This section describes your ability to be active on a higher level. For each of the following activities, please indicate the degree of difficulty you have experienced in the last week due to your foot/ankle." },
          rm("faos_sp1", "SP1. Squatting",                                    SEVERITY, "Difficulty"),
          rm("faos_sp2", "SP2. Running",                                      SEVERITY),
          rm("faos_sp3", "SP3. Jumping",                                      SEVERITY),
          rm("faos_sp4", "SP4. Twisting/pivoting on your injured foot/ankle", SEVERITY),
          rm("faos_sp5", "SP5. Kneeling",                                     SEVERITY),
          {
            type: "custom", name: "faos_sp_score",
            render: ({ values }) => {
              const s = sumKeys(SP_KEYS, values);
              return <ScoreBox label="Sports & Recreation Subscale Score" score={`${subscaleScore(s, 20)} / 100`} />;
            }
          },
        ]
      },

      /* ── V. QUALITY OF LIFE ── */
      {
        type: "accordion", name: "faos_qol_acc", label: "V. Quality of Life", defaultOpen: false,
        children: [
          {
            type: "radio", name: "faos_q1",
            label: "Q1. How often are you aware of your foot/ankle problem?",
            labelAbove: true, options: FREQ_CONSTANTLY,
          },
          {
            type: "radio", name: "faos_q2",
            label: "Q2. Have you modified your lifestyle to avoid activities potentially damaging to your foot/ankle?",
            labelAbove: true, options: LIFESTYLE,
          },
          {
            type: "radio", name: "faos_q3",
            label: "Q3. How much are you troubled with lack of confidence in your foot/ankle?",
            labelAbove: true, options: CONFIDENCE,
          },
          rm("faos_q4", "Q4. In general, how much difficulty do you have with your foot/ankle?", SEVERITY),
          {
            type: "custom", name: "faos_qol_score",
            render: ({ values }) => {
              const s = sumKeys(QOL_KEYS, values);
              return <ScoreBox label="Quality of Life Subscale Score" score={`${subscaleScore(s, 16)} / 100`} />;
            }
          },
        ]
      },

      /* ── TOTAL ── */
      {
        type: "custom", name: "faos_total",
        render: ({ values }) => {
          const all = sumKeys([...SYM_KEYS, ...PAIN_KEYS, ...ADL_KEYS, ...SP_KEYS, ...QOL_KEYS], values);
          return (
            <ScoreBox
              label="FAOS Total Score  (0 = worst · 100 = best)"
              score={`${subscaleScore(all, 168)} / 100`}
              color="#1e3a5f"
            />
          );
        }
      },
    ]
  }]
};

export default function FAOSForm({ values = {}, onChange }) {
  return (
    <CommonFormBuilder
      schema={FAOS_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}
