import React, { useState, useRef } from "react";

export default function MMSEAssessment({ onSave, onCancel }) {

  const MAX = {
    q1: 5, q2: 5, q3: 3, q4: 5, q5: 3,
    q6: 1, q7: 1, q8: 1, q9: 1, q10: 3,
    q11: 1
  };

  const scrollRef = useRef(null);

  const [scores, setScores] = useState(
    Object.keys(MAX).reduce((a, k) => ({ ...a, [k]: 0 }), {})
  );

  const [pentagonCorrect, setPentagonCorrect] = useState(null);
  const [pentagonImage, setPentagonImage] = useState(null);

  const setScore = (k, v) => {
    const val = Math.max(0, Math.min(MAX[k], Number(v) || 0));
    setScores(s => ({ ...s, [k]: val }));
  };

  const total =
    Object.values(scores).reduce((a, b) => a + b, 0) +
    (pentagonCorrect ? 1 : 0);

  const interpretation =
    total >= 26 ? "Normal" :
    total >= 20 ? "Mild cognitive impairment" :
    total >= 10 ? "Moderate cognitive impairment" :
    "Severe cognitive impairment";

  const FlatRow = ({ index, text, max, value, onChange, isLast }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 80px",
        gap: 20,
        padding: "14px 0",
        borderBottom: isLast ? "none" : "1px solid #E5E7EB"
      }}
    >
      <div
        style={{
          fontSize: 14,
          color: "#0F172A",
          lineHeight: 1.65,
          whiteSpace: "pre-line"
        }}
      >
        <span style={{ fontWeight: 600 }}>{index}. </span>
        {text}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end"
        }}
      >
        <input
          type="number"
          min={0}
          max={max}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: 56,
            height: 38,
            borderRadius: 8,
            border: "1px solid #CBD5E1",
            textAlign: "center",
            fontSize: 15,
            fontWeight: 600,
            background: "#fff"
          }}
        />
        <span style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>
          / {max}
        </span>
      </div>
    </div>
  );

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        border: "1px solid #E5E7EB",
        borderRadius: 16,
        background: "#fff",
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* HEADER */}
      <div
        style={{
          padding: "18px 22px",
          borderBottom: "1px solid #E5E7EB",
          fontSize: 18,
          fontWeight: 700
        }}
      >
        Mini-Mental State Examination (MMSE)
      </div>

      {/* BODY */}
      <div
        ref={scrollRef}
        style={{
          padding: 20
        }}
      >
        <FlatRow
          index={1}
          max={5}
          value={scores.q1}
          onChange={v => setScore("q1", v)}
          text={`What year is this?
What is the current season?
What month is this?
What is the date today?
What day of the week is it?`}
        />

        <FlatRow
          index={2}
          max={5}
          value={scores.q2}
          onChange={v => setScore("q2", v)}
          text={`Which country are we in right now?
What state/province are we in?
What city or town are we in?
What building are we in?
On which floor are we located?`}
        />

        <FlatRow
          index={3}
          max={3}
          value={scores.q3}
          onChange={v => setScore("q3", v)}
          text={`I’m going to name three words/objects and you need to repeat them.
Then remember them because I’m going to ask you to name them again later.
Words: BALL – CAR – MAN`}
        />

        <FlatRow
          index={4}
          max={5}
          value={scores.q4}
          onChange={v => setScore("q4", v)}
          text={`Spell WORLD backwards.
Answer: D-L-R-O-W`}
        />

        <FlatRow
          index={5}
          max={3}
          value={scores.q5}
          onChange={v => setScore("q5", v)}
          text={`Now, name the three objects/words I asked you to remember.`}
        />

        <FlatRow
          index={6}
          max={1}
          value={scores.q6}
          onChange={v => setScore("q6", v)}
          text={`What object is this? (Show a wrist watch)`}
        />

        <FlatRow
          index={7}
          max={1}
          value={scores.q7}
          onChange={v => setScore("q7", v)}
          text={`What object is this? (Show a pencil)`}
        />

        <FlatRow
          index={8}
          max={1}
          value={scores.q8}
          onChange={v => setScore("q8", v)}
          text={`Repeat this phrase: No ifs, ands, or buts.`}
        />

        <FlatRow
          index={9}
          max={1}
          value={scores.q9}
          onChange={v => setScore("q9", v)}
          text={`Read the words and then do what it says.
Instruction shown: CLOSE YOUR EYES`}
        />

        <FlatRow
          index={10}
          max={3}
          value={scores.q10}
          onChange={v => setScore("q10", v)}
          text={`Take the paper in your right/left hand,
fold it in half,
and put it on the floor.`}
        />

        <FlatRow
          index={11}
          max={1}
          value={scores.q11}
          onChange={v => setScore("q11", v)}
          text={`Make up and write a complete sentence on a piece of paper.`}
          isLast
        />

        {/* QUESTION 12 */}
        <div style={{ paddingTop: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>
            12. Copy the design (Pentagons)
          </div>

          <img
            src="/mmse-pentagon.png"
            alt="Pentagon"
            style={{
              width: 140,
              border: "1px solid #CBD5E1",
              borderRadius: 10,
              padding: 8
            }}
          />

          <div style={{ marginTop: 10 }}>
            <input
              type="file"
              accept="image/*"
              onChange={e => setPentagonImage(e.target.files[0])}
            />
          </div>

          <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
            <label>
              <input
                type="radio"
                name="pentagon"
                checked={pentagonCorrect === true}
                onChange={() => setPentagonCorrect(true)}
              />
              Correct
            </label>

            <label>
              <input
                type="radio"
                name="pentagon"
                checked={pentagonCorrect === false}
                onChange={() => setPentagonCorrect(false)}
              />
              Incorrect
            </label>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          borderTop: "1px solid #E5E7EB",
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <b>Total Score:</b> {total} / 30
          <br />
          <b>Interpretation:</b> {interpretation}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onCancel}>
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({
                total,
                interpretation,
                breakdown: scores,
                pentagonCorrect,
                pentagonImage
              })
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}