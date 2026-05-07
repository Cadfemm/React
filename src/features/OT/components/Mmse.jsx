import React, { useMemo, useRef, useState } from "react";

const QUESTIONS = {
  q1: [
    "What year is this?",
    "What is the current season?",
    "What month is this?",
    "What is the date today?",
    "What day of the week is it?"
  ],
  q2: [
    "Which country are we in right now?",
    "What state/province are we in?",
    "What city or town are we in?",
    "What building are we in?",
    "On which floor are we located?"
  ],
  q3: [
    "BALL",
    "CAR",
    "MAN"
  ],
  q4: [
    "D",
    "L",
    "R",
    "O",
    "W"
  ],
  q5: [
    "BALL",
    "CAR",
    "MAN"
  ],
  q6: ["What object is this? (Show a wrist watch)"],
  q7: ["What object is this? (Show a pencil)"],
  q8: ["Repeat this phrase: No ifs, ands, or buts."],
  q9: ["Read and perform: CLOSE YOUR EYES"],
  q10: [
    "Take the paper in your right/left hand",
    "Fold it in half",
    "Put it on the floor"
  ],
  q11: ["Write a complete sentence on a piece of paper."]
};

function FlatRow({ index, title, groupKey, isLast, responses, scores, toggleResponse }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 120px",
        gap: 16,
        padding: "14px 0",
        borderBottom: isLast ? "none" : "1px solid #E5E7EB"
      }}
    >
      <div>
        <div
          style={{
            fontSize: 14,
            color: "#0F172A",
            lineHeight: 1.5,
            fontWeight: 600,
            marginBottom: 8
          }}
        >
          {index}. {title}
        </div>
        <div>
          {QUESTIONS[groupKey].map((question, itemIdx) => (
            <label
              key={`${groupKey}-${itemIdx}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginBottom: 6,
                cursor: "pointer"
              }}
            >
              <input
                type="checkbox"
                checked={responses[groupKey][itemIdx]}
                onChange={() => toggleResponse(groupKey, itemIdx)}
                style={{ marginTop: 2 }}
              />
              <span style={{ fontSize: 14, color: "#334155", lineHeight: 1.5 }}>
                {QUESTIONS[groupKey].length > 1 ? `${itemIdx + 1}. ` : ""}
                {question}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end"
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>
          {scores[groupKey]}
        </span>
        <span style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>
          / {QUESTIONS[groupKey].length}
        </span>
      </div>
    </div>
  );
}
 
export default function MMSEAssessment({ onSave, onCancel }) {
  const scrollRef = useRef(null);
 
  const [responses, setResponses] = useState(
    Object.fromEntries(
      Object.entries(QUESTIONS).map(([key, items]) => [
        key,
        items.map(() => false)
      ])
    )
  );
 
  const [pentagonCorrect, setPentagonCorrect] = useState(null);
  const [pentagonImage, setPentagonImage] = useState(null);
 
  const toggleResponse = (groupKey, index) => {
    setResponses((prev) => ({
      ...prev,
      [groupKey]: prev[groupKey].map((checked, idx) =>
        idx === index ? !checked : checked
      )
    }));
  };
 
  const scores = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(responses).map(([key, values]) => [
          key,
          values.filter(Boolean).length
        ])
      ),
    [responses]
  );

  const total = Object.values(scores).reduce((a, b) => a + b, 0) + (pentagonCorrect ? 1 : 0);
 
  const interpretation =
    total >= 26 ? "Normal" :
    total >= 20 ? "Mild cognitive impairment" :
    total >= 10 ? "Moderate cognitive impairment" :
    "Severe cognitive impairment";
 
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
          title="Time Orientation"
          groupKey="q1"
          responses={responses}
          scores={scores}
          toggleResponse={toggleResponse}
        />
 
        <FlatRow
          index={2}
          title="Place Orientation"
          groupKey="q2"
          responses={responses}
          scores={scores}
          toggleResponse={toggleResponse}
        />
 
        <FlatRow
          index={3}
          title="Registration (Repeat words)"
          groupKey="q3"
          responses={responses}
          scores={scores}
          toggleResponse={toggleResponse}
        />
 
        <FlatRow
          index={4}
          title="Spell WORLD backwards"
          groupKey="q4"
          responses={responses}
          scores={scores}
          toggleResponse={toggleResponse}
        />
 
        <FlatRow
          index={5}
          title="Recall words"
          groupKey="q5"
          responses={responses}
          scores={scores}
          toggleResponse={toggleResponse}
        />
 
        <FlatRow
          index={6}
          title="Naming"
          groupKey="q6"
          responses={responses}
          scores={scores}
          toggleResponse={toggleResponse}
        />
 
        <FlatRow
          index={7}
          title="Naming"
          groupKey="q7"
          responses={responses}
          scores={scores}
          toggleResponse={toggleResponse}
        />
 
        <FlatRow
          index={8}
          title="Repetition"
          groupKey="q8"
          responses={responses}
          scores={scores}
          toggleResponse={toggleResponse}
        />
 
        <FlatRow
          index={9}
          title="Reading and obeying"
          groupKey="q9"
          responses={responses}
          scores={scores}
          toggleResponse={toggleResponse}
        />
 
        <FlatRow
          index={10}
          title="3-step command"
          groupKey="q10"
          responses={responses}
          scores={scores}
          toggleResponse={toggleResponse}
        />
 
        <FlatRow
          index={11}
          title="Writing"
          groupKey="q11"
          responses={responses}
          scores={scores}
          toggleResponse={toggleResponse}
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