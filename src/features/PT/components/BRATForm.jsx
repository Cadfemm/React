import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ── Scale columns ── */
const BRAT_GROUPS = [
  { label: "Cannot do now (0)",   columns: [{ key: "0" }] },
  { label: "Very hard (1)",       columns: [{ key: "1" }] },
  { label: "A little hard (2)",   columns: [{ key: "2" }] },
  { label: "Easy to do (3)",      columns: [{ key: "3" }] },
];

const r = (value, label) => ({
  value,
  label,
  columns: [
    { type: "radio", value: "0" },
    { type: "radio", value: "1" },
    { type: "radio", value: "2" },
    { type: "radio", value: "3" },
  ],
});

/* ── Row definitions ── */
const S1_ROWS = [
  r("s1_q1", "1. Use both arms to put on a T-shirt"),
  r("s1_q2", "2. Use both arms to put on a pair of trousers"),
  r("s1_q3", "3. Use both hands to put on socks"),
  r("s1_q4", "4. Use both hands to put toothpaste on a toothbrush"),
  r("s1_q5", "5. Use both hands to do up belt buckle"),
  r("s1_q6", "6. Tuck your shirt in using your affected hand"),
  r("s1_q7", "7. Use both hands to do up shirt buttons"),
  r("s1_q8", "8. Use both hands to do up tight trouser buttons e.g. jeans"),
];

const S2_ROWS = [
  r("s2_q9",  "9. Wash both hands at same time"),
  r("s2_q10", "10. Use both hands to push a pram, lawnmower or shopping trolley"),
  r("s2_q11", "11. Use both hands to do up zip including putting ends together"),
  r("s2_q12", "12. Use both hands to spread butter or jam on a piece of bread"),
  r("s2_q13", "13. Use both hands to tie up a rubbish bag and put in the bin"),
  r("s2_q14", "14. Use both hands to tie up shoe laces"),
  r("s2_q15", "15. Use a knife and fork at the same time"),
  r("s2_q16", "16. Carry an object only using your affected arm so your other arm/hand is free"),
  r("s2_q17", "17. Pick up a small object with the fingers of your affected hand e.g. a coin or pen"),
  r("s2_q18", "18. Hold a pot of food with 1 hand and stir it with the other"),
  r("s2_q19", "19. Use both arms/hands to change the sheet on a bed"),
  r("s2_q20", "20. Use both hands to wash your face"),
  r("s2_q21", "21. Use both arms to peg clothes on the washing line"),
  r("s2_q22", "22. Use both hands to type on a keyboard"),
  r("s2_q23", "23. Turn on a light switch using only your affected arm"),
  r("s2_q24", "24. Use your affected hand to wash your other armpit"),
  r("s2_q25", "25. Use both arms to lift a box or bag onto a shelf at eye level"),
];

const S3_ROWS = [
  r("s3_q26", "26. Maintain control of your affected arm so you don't need to wear a sling"),
  r("s3_q27", "27. Hold an object between your affected upper arm and your chest wall, e.g. a book"),
  r("s3_q28", "28. Hold an object draped over your affected forearm, e.g. an article of clothing"),
  r("s3_q29", "29. Stabilize an object with your affected arm while you manipulate it with your other hand"),
  r("s3_q30", "30. Lift your affected arm to put it through the sleeve of a shirt"),
  r("s3_q31", "31. Roll over when sleeping without having to wake to move your affected arm"),
];

const SW_ROWS = [
  r("sw_q1", "Brush your teeth with your affected arm"),
  r("sw_q2", "Write with a pen or pencil with your affected arm"),
  r("sw_q3", "Use a computer mouse with your affected hand"),
  r("sw_q4", "Wipe yourself after going to the toilet with your affected arm"),
];

/* ── Score helper ──
   refraction-12col stores radio selection at key: `${tableName}_${rowValue}_${colIndex}`
   The selected col.value ("0"–"3") is stored at the index of the clicked column.
   We scan all 4 column indices and return the numeric value of whichever is set. */
function rowScore(tableName, rowValue, values) {
  for (let i = 0; i < 4; i++) {
    const v = values[`${tableName}_${rowValue}_${i}`];
    if (v !== undefined && v !== "") return Number(v);
  }
  return null; // unanswered
}

function subscaleScore(tableName, rows, values) {
  let total = 0;
  let answered = 0;
  rows.forEach(row => {
    const s = rowScore(tableName, row.value, values);
    if (s !== null) { total += s; answered++; }
  });
  return { total, answered, max: rows.length * 3 };
}

/* ── Score display component ── */
function ScoreDisplay({ label, total, answered, max }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 16px", background: "#f0f9ff",
      border: "1px solid #bae6fd", borderRadius: 8, marginTop: 12
    }}>
      <span style={{ fontWeight: 600, fontSize: 14, color: "#0369a1" }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 16, color: "#0c4a6e" }}>
        {answered === 0 ? "—" : `${total} / ${max}`}
      </span>
    </div>
  );
}

/* ── Main component ── */
export default function BRATForm({ values, onChange }) {
  const s1 = subscaleScore("brat_s1", S1_ROWS, values);
  const s2 = subscaleScore("brat_s2", S2_ROWS, values);
  const s3 = subscaleScore("brat_s3", S3_ROWS, values);
  const grandTotal = s1.total + s2.total + s3.total;
  const grandAnswered = s1.answered + s2.answered + s3.answered;

  const schema = {
    title: "Brachial Assessment Tool (BrAT)",
    fields: [
      /* Subscale 1 */
      {
        type: "accordion", name: "brat_subscale1",
        label: "Subscale 1: Dressing and Grooming",
        defaultOpen: true,
        children: [
          { type: "refraction-12col", name: "brat_s1", cornerLabel: "Activity",
            cornerLikeGroupHeader: true, showColumnHeaders: true,
            groups: BRAT_GROUPS, rows: S1_ROWS },
        ],
      },
      /* Subscale 2 */
      {
        type: "accordion", name: "brat_subscale2",
        label: "Subscale 2: Arm and Hand",
        defaultOpen: false,
        children: [
          { type: "refraction-12col", name: "brat_s2", cornerLabel: "Activity",
            cornerLikeGroupHeader: true, showColumnHeaders: true,
            groups: BRAT_GROUPS, rows: S2_ROWS },
        ],
      },
      /* Subscale 3 */
      {
        type: "accordion", name: "brat_subscale3",
        label: "Subscale 3: Arm Only (No Hand)",
        defaultOpen: false,
        children: [
          { type: "refraction-12col", name: "brat_s3", cornerLabel: "Activity",
            cornerLikeGroupHeader: true, showColumnHeaders: true,
            groups: BRAT_GROUPS, rows: S3_ROWS },
        ],
      },
      /* Totals — custom render */
      {
        name: "_brat_totals",
        type: "custom",
        render: ({ values }) => {
          const s1 = subscaleScore("brat_s1", S1_ROWS, values);
          const s2 = subscaleScore("brat_s2", S2_ROWS, values);
          const s3 = subscaleScore("brat_s3", S3_ROWS, values);
          const grand = s1.total + s2.total + s3.total;
          const anyAnswered = s1.answered + s2.answered + s3.answered > 0;
          return (
            <div style={{ marginTop: 8 }}>
              <ScoreDisplay label="Subscale 1 Total" total={s1.total} answered={s1.answered} max={s1.max} />
              <ScoreDisplay label="Subscale 2 Total" total={s2.total} answered={s2.answered} max={s2.max} />
              <ScoreDisplay label="Subscale 3 Total" total={s3.total} answered={s3.answered} max={s3.max} />
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 16px", background: "#0369a1",
                borderRadius: 8, marginTop: 8
              }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Total Score (Subscale 1+2+3)</span>
                <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>
                  {anyAnswered ? `${grand} / 93` : "—"}
                </span>
              </div>
            </div>
          );
        }
      },
      /* Optional writing arm */
      {
        type: "accordion", name: "brat_writing",
        label: "Optional: If Affected Arm is Writing Arm (Do NOT add to total)",
        defaultOpen: false,
        children: [
          { type: "refraction-12col", name: "brat_sw", cornerLabel: "Activity",
            cornerLikeGroupHeader: true, showColumnHeaders: true,
            groups: BRAT_GROUPS, rows: SW_ROWS },
        ],
      },
    ],
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      submitted={false}
      layout="nested"
    />
  );
}
