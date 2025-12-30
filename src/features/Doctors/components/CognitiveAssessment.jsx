import React, { useState, useRef, useEffect } from "react";

const Card = ({ title, children }) => (
  <div style={styles.card}>
    <h3 style={styles.title}>{title}</h3>
    {children}
  </div>
);

const RadioRow = ({ label, value, onChange, options }) => (
  <div style={styles.row}>
    <span style={styles.rowLabel}>{label}</span>
    <div style={styles.radioRow}>
      {options.map(o => (
        <label key={o} style={styles.radio}>
          <input
            type="radio"
            checked={value === o}
            onChange={() => onChange(o)}
          />
          {o}
        </label>
      ))}
    </div>
  </div>
);

const SelectRow = ({ label, value, onChange, options }) => (
  <div style={styles.row}>
    <span style={styles.rowLabel}>{label}</span>
    <select
      style={styles.selectRight}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">Select</option>
      {options.map(o => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>
      {label}
    </label>
    <select
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #CBD5E1"
      }}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
    >
      <option value="">Select</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);
const TextArea = ({ placeholder }) => (
  <textarea
    placeholder={placeholder}
    style={styles.textArea}
  />
);
export default function CognitiveSoapAssessment() {

  const [hasCognitiveImpairment, setHasCognitiveImpairment] = useState("");

  const [alert, setAlert] = useState("");

  const [orientation, setOrientation] = useState({
    person: "", place: "", time: ""
  });

  const [memory, setMemory] = useState({
    immediate: "", recent: "", remote: ""
  });

  const [attention, setAttention] = useState("");

  const [mood, setMood] = useState("");

  const [visuo, setVisuo] = useState({
    neglect: "", apraxia: ""
  });
  const [gcsScore, setGcsScore] = useState(null);

  const [language, setLanguage] = useState({
    cmd3: "",
    cmd3Clue: "",
    cmd3CueType: "",

    cmd2: "",
    cmd2Clue: "",
    cmd2CueType: "",

    cmd1: "",
    cmd1Clue: "",
    cmd1CueType: "",

    consistency: ""
  });


  const [sleepFall, setSleepFall] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");
  const [gcsBreakdown, setGcsBreakdown] = useState({
    eye: null,
    motor: null,
    verbal: null
  });

  const [showIsi, setShowIsi] = useState(false);
  const [showGcs, setShowGcs] = useState(false);
  const [activityParticipation, setActivityParticipation] = useState({
    attentionPerson: "",
    attentionEnvironment: "",
    simpleProblemSolving: "",
    complexProblemSolving: "",
    decisionMaking: ""
  });

  const [gcsValues, setGcsValues] = useState({
    eye: "",
    motor: "",
    verbal: ""
  });

  const [isiValues, setIsiValues] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null
  });
  const CLUE_OPTIONS = ["With Clues", "Without Clues"];

  const CUE_TYPE_OPTIONS = [
    "With verbal cues",
    "With visual cues"
  ];
  const [showMMSE, setShowMMSE] = useState(false);
  const [showMOCA, setShowMOCA] = useState(false);
  const [showRLAR, setShowRLAR] = useState(false);

  const [mmseScore, setMmseScore] = useState(null);
  const [rlarScore, setRlarScore] = useState(null);


  const CONSISTENCY_OPTIONS = ["Consistent", "Inconsistent"];
  const [gcs, gcsotal] = useState({ multi: "", jfk: "", gcs: "" });
  const [isiTotal, setIsiTotal] = useState(null);
  const ISI_SEVERITY_OPTIONS = [
    { label: "None", value: 0 },
    { label: "Mild", value: 1 },
    { label: "Moderate", value: 2 },
    { label: "Severe", value: 3 },
    { label: "Very Severe", value: 4 }
  ];

  const ISI_SATISFACTION_OPTIONS = [
    { label: "0 - Very Satisfied", value: 0 },
    { label: "1 - Satisfied", value: 1 },
    { label: "2 - Moderately Satisfied", value: 2 },
    { label: "3 - Dissatisfied", value: 3 },
    { label: "4 - Very Dissatisfied", value: 4 }
  ];

  const ISI_NOTICEABILITY_OPTIONS = [
    { label: "0 - Not at all", value: 0 },
    { label: "1 - A Little", value: 1 },
    { label: "2 - Somewhat", value: 2 },
    { label: "3 - Much", value: 3 },
    { label: "4 - Very Much Noticeable", value: 4 }
  ];

  const ISI_WORRY_OPTIONS = [
    { label: "0 - Not at all Worried", value: 0 },
    { label: "1 - A Little", value: 1 },
    { label: "2 - Somewhat", value: 2 },
    { label: "3 - Much", value: 3 },
    { label: "4 - Very Much Worried", value: 4 }
  ];
  const [showJfk, setShowJfk] = useState(false);

  const ISI_INTERFERENCE_OPTIONS = [
    { label: "0 - Not at all Interfering", value: 0 },
    { label: "1 - A Little", value: 1 },
    { label: "2 - Somewhat", value: 2 },
    { label: "3 - Much", value: 3 },
    { label: "4 - Very Much Interfering", value: 4 }
  ];
  const [showRancho, setShowRancho] = useState(false);
  const [ranchoValue, setRanchoValue] = useState(null);

  const [jfkValues, setJfkValues] = useState({
    auditory: null,
    visual: null,
    motor: null,
    verbal: null,
    communication: null,
    arousal: null
  });
  const [showEss, setShowEss] = useState(false);

  const [essValues, setEssValues] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
    q8: null
  });

  const [essTotal, setEssTotal] = useState(null);
  const [showPsqi, setShowPsqi] = useState(false);
  const [psqiScore, setPsqiScore] = useState(null);
  const [psqiData, setPsqiData] = useState({});
  const [showPhq9, setShowPhq9] = useState(false);
  const [showGad7, setShowGad7] = useState(false);
  const [showDass, setShowDass] = useState(false);

  const [phq9Values, setPhq9Values] = useState(Array(9).fill(null));
  const [gad7Values, setGad7Values] = useState(Array(7).fill(null));
  const [dassValues, setDassValues] = useState({
    depression: Array(7).fill(null),
    anxiety: Array(7).fill(null),
    stress: Array(7).fill(null)
  });

  const [phq9Score, setPhq9Score] = useState(null);
  const [gad7Score, setGad7Score] = useState(null);
  const [dassScore, setDassScore] = useState(null);
  const MOOD_OPTIONS = [
    { label: "Not at all (0)", value: 0 },
    { label: "Several days (1)", value: 1 },
    { label: "More than half the days (2)", value: 2 },
    { label: "Nearly every day (3)", value: 3 }
  ];


  const [phqResult, setPhqResult] = useState(null);
  const [gadResult, setGadResult] = useState(null);
  const [dassResult, setDassResult] = useState(null);


  const [jfkTotal, setJfkTotal] = useState(null);
  const ESS_OPTIONS = [
    { label: "Would never nod off", value: 0 },
    { label: "Slight chance of nodding off", value: 1 },
    { label: "Moderate chance of nodding off", value: 2 },
    { label: "High chance of nodding off", value: 3 }
  ];
  const PSQI_QUESTIONS = [
    "Cannot fall asleep within 30 minutes",
    "Wake up in the middle of the night",
    "Have to get up to use the bathroom",
    "Cannot breathe comfortably",
    "Cough or snore loudly",
    "Feel too cold",
    "Feel too hot",
    "Have bad dreams",
    "Have pain"
  ];
  const PSQI_OPTIONS = [
    { value: 0, label: "0 – Not during the past month" },
    { value: 1, label: "1 – Less than once a week" },
    { value: 2, label: "2 – Once or twice a week" },
    { value: 3, label: "3 – Three or more times a week" }
  ];
  const isiInterpretation = (score) => {
    if (score <= 7) return "No clinically significant insomnia";
    if (score <= 14) return "Subthreshold insomnia";
    if (score <= 21) return "Clinical insomnia (moderate severity)";
    return "Clinical insomnia (severe)";
  };
  const psqiInterpretation = (score) => {
    if (score <= 5) {
      return "Good sleep quality ";
    }
    if (score <= 10) {
      return "Mild sleep difficulties";
    }
    if (score <= 15) {
      return "Moderate sleep difficulties";
    }
    return "Severe sleep difficulties ";
  };


  const essInterpretation = (score) => {
    if (score <= 10) return "Normal";
    if (score <= 14) return "Mild Sleepiness";
    if (score <= 17) return "Moderate Sleepiness";
    return "Severe Sleepiness";
  };

  const ESS_QUESTIONS = [
    "Sitting and reading",
    "Watching TV",
    "Sitting inactive in a public place (e.g., meeting, theater)",
    "As a passenger in a car for an hour or more without stopping",
    "Lying down to rest when circumstances permit",
    "Sitting and talking to someone",
    "Sitting quietly after a meal without alcohol",
    "In a car, while stopped for a few minutes in traffic or at a light"
  ];
  const Phq9Modal = () => {
    const questions = [
      "1.Little interest or pleasure in doing things.",
      "2.Feeling down, depressed, or hopeless.",
      "3.Trouble falling or staying asleep, or sleeping too much.",
      "4. tired or having little energy.",
      "5.Poor appetite or overeating.",
      "6.Feeling bad about yourself — or that you are a failure or have let yourself or your family down.",
      "7.Trouble concentrating on things, such as reading the newspaper or watching television.",
      "8.Moving or speaking so slowly that other people could have noticed? Or being so fidgety or restless that you have been moving more than usual.",
      "9.Thoughts that you would be better off dead or of hurting yourself in some way."
    ];



    const total = phq9Values.reduce((s, v) => s + (v ?? 0), 0);


    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3>Patient Health Questionnaire (PHQ-9)</h3>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {questions.map((q, i) => (
              <Select
                key={i}
                label={q}
                value={phq9Values[i]}
                onChange={v => {
                  const copy = [...phq9Values];
                  copy[i] = v;
                  setPhq9Values(copy);
                }}
                options={MOOD_OPTIONS}
              />
            ))}
          </div>

          <div style={styles.modalFooter}>
            <div>Total Score: {total}</div>
            <div style={{ display: "flex", gap: 12 }}>
              <button style={styles.secondaryBtn} onClick={() => setShowPhq9(false)}>Cancel</button>
              <button
                style={styles.primaryBtn}
                onClick={() => {
                  const severity =
                    total <= 4 ? "Minimal / None" :
                      total <= 9 ? "Mild" :
                        total <= 14 ? "Moderate" :
                          total <= 19 ? "Moderately Severe" :
                            "Severe";

                  setPhqResult({
                    total,
                    severity
                  });

                  setPhq9Score(total);
                  setShowPhq9(false);
                }}
              >
                Save
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  };
  const Gad7Modal = () => {
    const questions = [
      "1.Feeling nervous, anxious, or on edge.",
      "2.Not being able to stop or control worrying.",
      "3.Worrying too much about different things.",
      "4.Trouble relaxing.",
      "5.Being so restless that it is hard to sit still.",
      "6.Becoming easily annoyed or irritable.",
      "7.Feeling afraid, as if something awful might happen."
    ];


    const total = gad7Values.reduce((s, v) => s + (v ?? 0), 0);

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3>Generalized Anxiety Disorder (GAD-7)</h3>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {questions.map((q, i) => (
              <Select
                key={i}
                label={q}
                value={gad7Values[i]}
                onChange={v => {
                  const copy = [...gad7Values];
                  copy[i] = v;
                  setGad7Values(copy);
                }}
                options={MOOD_OPTIONS}
              />
            ))}
          </div>

          <div style={styles.modalFooter}>
            <div>Total Score: {total}</div>
            <div style={{ display: "flex", gap: 12 }}>
              <button style={styles.secondaryBtn} onClick={() => setShowGad7(false)}>Cancel</button>
              <button

                style={styles.primaryBtn}
                onClick={() => {
                  const severity =
                    total <= 4 ? "Minimal / None" :
                      total <= 9 ? "Mild" :
                        total <= 14 ? "Moderate" :
                          "Severe";

                  setGadResult({ total, severity });
                  setGad7Score(total);
                  setShowGad7(false);
                }}
              >
                Save
              </button>


            </div>
          </div>
        </div>
      </div>
    )
  }
  const DassModal = () => {
    /* ================= QUESTION MAP ================= */
    const QUESTIONS = [
      { q: "1. I found it hard to wind down.", type: "stress", i: 0 },
      { q: "2. I was aware of dryness of my mouth.", type: "anxiety", i: 0 },
      { q: "3. I couldn’t seem to experience any positive feeling at all.", type: "depression", i: 0 },
      { q: "4. I experienced breathing difficulty.", type: "anxiety", i: 1 },
      { q: "5. I found it difficult to work up the initiative to do things.", type: "depression", i: 1 },
      { q: "6. I tended to over-react to situations.", type: "stress", i: 1 },
      { q: "7. I experienced trembling.", type: "anxiety", i: 2 },
      { q: "8. I felt that I was using a lot of nervous energy.", type: "stress", i: 2 },
      { q: "9. I was worried about situations in which I might panic.", type: "anxiety", i: 3 },
      { q: "10. I felt that I had nothing to look forward to.", type: "depression", i: 2 },
      { q: "11. I found myself getting agitated.", type: "stress", i: 3 },
      { q: "12. I found it difficult to relax.", type: "stress", i: 4 },
      { q: "13. I felt down-hearted and blue.", type: "depression", i: 3 },
      { q: "14. I was intolerant of anything that kept me from getting on with what I was doing.", type: "stress", i: 5 },
      { q: "15. I felt I was close to panic.", type: "anxiety", i: 4 },
      { q: "16. I was unable to become enthusiastic about anything.", type: "depression", i: 4 },
      { q: "17. I felt I wasn’t worth much as a person.", type: "depression", i: 5 },
      { q: "18. I felt that I was rather touchy.", type: "stress", i: 6 },
      { q: "19. I was aware of the action of my heart.", type: "anxiety", i: 5 },
      { q: "20. I felt scared without any good reason.", type: "anxiety", i: 6 },
      { q: "21. I felt that life was meaningless.", type: "depression", i: 6 }
    ];

    /* ================= TOTAL ================= */
    const sum = arr =>
      arr.reduce((s, v) => s + (Number(v) || 0), 0);

    const total = {
      depression: sum(dassValues.depression),
      anxiety: sum(dassValues.anxiety),
      stress: sum(dassValues.stress)
    };

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <h3>DASS-21</h3>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {QUESTIONS.map((item, idx) => (
              <Select
                key={idx}
                label={item.q}
                value={dassValues[item.type][item.i]}
                onChange={val => {
                  setDassValues(prev => {
                    const updated = [...prev[item.type]];
                    updated[item.i] = Number(val);

                    return {
                      ...prev,
                      [item.type]: updated
                    };
                  });
                }}


                options={MOOD_OPTIONS}
              />
            ))}
          </div>

          <div style={styles.modalFooter}>
            <div>
              D:{total.depression} | A:{total.anxiety} | S:{total.stress}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={styles.secondaryBtn}
                onClick={() => setShowDass(false)}
              >
                Cancel
              </button>

              <button
                style={styles.primaryBtn}
                onClick={() => {
                  setDassResult({
                    depression: {
                      score: total.depression,
                      severity:
                        total.depression <= 9 ? "Normal" :
                          total.depression <= 13 ? "Mild" :
                            total.depression <= 20 ? "Moderate" :
                              total.depression <= 27 ? "Severe" :
                                "Extremely Severe"
                    },
                    anxiety: {
                      score: total.anxiety,
                      severity:
                        total.anxiety <= 7 ? "Normal" :
                          total.anxiety <= 9 ? "Mild" :
                            total.anxiety <= 14 ? "Moderate" :
                              total.anxiety <= 19 ? "Severe" :
                                "Extremely Severe"
                    },
                    stress: {
                      score: total.stress,
                      severity:
                        total.stress <= 14 ? "Normal" :
                          total.stress <= 18 ? "Mild" :
                            total.stress <= 25 ? "Moderate" :
                              total.stress <= 33 ? "Severe" :
                                "Extremely Severe"
                    }
                  });

                  setDassScore(total);
                  setShowDass(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const MOCAModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h3>Montreal Cognitive Assessment (MOCA)</h3>

        <div style={{ padding: 20, fontSize: 15 }}>
          <p>
            MOCA assessment is performed using the standardized questionnaire
            prepared by the rehabilitation team.
          </p>

          <p style={{ fontWeight: 600 }}>
            Please refer to the MOCA assessment sheet for scoring and interpretation.
          </p>
        </div>

        <div style={styles.modalFooter}>
          <button style={styles.primaryBtn} onClick={() => setShowMOCA(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const MMSEModal = ({ onClose, onSave }) => {
    const canvasRef = React.useRef(null);
    const drawing = React.useRef(false);

    const [score, setScore] = React.useState({
      registration: 0,
      attention: 0,
      recall: 0,
      language: 0,
      copy: 0
    });

    const totalScore = Object.values(score).reduce((a, b) => a + b, 0);

    /* ================= DRAWING ================= */
    const startDraw = e => {
      drawing.current = true;
      draw(e);
    };

    const stopDraw = () => {
      drawing.current = false;
      const ctx = canvasRef.current.getContext("2d");
      ctx.beginPath();
    };

    const draw = e => {
      if (!drawing.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();

      const x =
        (e.clientX || e.touches?.[0]?.clientX) - rect.left;
      const y =
        (e.clientY || e.touches?.[0]?.clientY) - rect.top;

      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#0f172a";
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const clearCanvas = () => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 320, 220);
    };

    /* ================= UI ================= */
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}>
        <div style={{
          background: "#fff",
          width: 900,
          maxHeight: "90vh",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column"
        }}>

          {/* HEADER */}
          <div style={{
            padding: 18,
            borderBottom: "1px solid #E5E7EB",
            fontSize: 18,
            fontWeight: 700
          }}>
            Mini Mental State Examination (MMSE)
          </div>

          {/* BODY */}
          <div style={{ padding: 20, overflowY: "auto" }}>

            {/* ORIENTATION – TIME */}
            <Section title="Orientation – Time (5)">
              <Q text="What is the (year) (season) (date) (day) (month)?" />
              <Row cols={5}>
                {["Year", "Season", "Date", "Day", "Month"].map(p => (
                  <input key={p} placeholder={p} style={input} />
                ))}
              </Row>
            </Section>

            {/* ORIENTATION – PLACE */}
            <Section title="Orientation – Place (5)">
              <Q text="Where are we (state) (country) (town) (hospital) (floor)?" />
              <Row cols={5}>
                {["State", "Country", "Town", "Hospital", "Floor"].map(p => (
                  <input key={p} placeholder={p} style={input} />
                ))}
              </Row>
            </Section>

            {/* REGISTRATION */}
            <Section title="Registration (3)">
              <Q text="Name 3 objects: 1 second to say each. Then ask the patient to repeat all 3." />
              <Row cols={3}>
                <input style={input} />
                <input style={input} />
                <input style={input} />
              </Row>
              <YesNo onYes={() => setScore(s => ({ ...s, registration: 3 }))} />
            </Section>

            {/* ATTENTION */}
            <Section title="Attention & Calculation (5)">
              <Q text="Serial 7’s OR spell “WORLD” backward." />
              <input placeholder="WORLD backward" style={{ ...input, maxWidth: 260 }} />
              <YesNo onYes={() => setScore(s => ({ ...s, attention: 5 }))} />
            </Section>

            {/* RECALL */}
            <Section title="Recall (3)">
              <Q text="Ask for the 3 objects repeated above." />
              <Row cols={3}>
                <input style={input} />
                <input style={input} />
                <input style={input} />
              </Row>
              <YesNo onYes={() => setScore(s => ({ ...s, recall: 3 }))} />
            </Section>

            {/* LANGUAGE */}
            <Section title="Language (8)">
              <Q text="Name a pencil and a watch." />
              <Row cols={2}>
                <input placeholder="Pencil" style={input} />
                <input placeholder="Watch" style={input} />
              </Row>

              <Q text='Repeat the following: “No ifs, ands, or buts”' />
              <input style={input} />

              <Q text="Follow a 3-stage command:" />
              <div style={helper}>
                Take a paper in your hand, fold it in half, and put it on the floor.
              </div>
              <textarea style={textarea} rows={2} />

              <Q text="Read and obey the following:" />
              <div style={readBox}>CLOSE YOUR EYES</div>

              <Q text="Write a sentence." />
              <textarea style={textarea} rows={2} />

              <YesNo onYes={() => setScore(s => ({ ...s, language: 8 }))} />
            </Section>

            {/* COPY DESIGN */}
            <Section title="Copy the design shown (1)">
              <Row cols={2}>
                <div style={designBox}>
                  <img src="/mmse-pentagon.png" alt="MMSE" style={{ width: "100%" }} />
                </div>
                <div style={designBox}>
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={220}
                    style={canvas}
                    onMouseDown={startDraw}
                    onMouseMove={draw}
                    onMouseUp={stopDraw}
                    onTouchStart={startDraw}
                    onTouchMove={draw}
                    onTouchEnd={stopDraw}
                  />
                  <button onClick={clearCanvas} style={clearBtn}>
                    Clear drawing
                  </button>
                </div>
              </Row>
              <YesNo onYes={() => setScore(s => ({ ...s, copy: 1 }))} />
            </Section>

          </div>

          {/* FOOTER */}
          <div style={{
            padding: 16,
            borderTop: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{ fontSize: 14 }}>
              Total MMSE Score: <strong>{totalScore} / 30</strong>
            </div>
            <div>
              <button style={secondaryBtn} onClick={() => setShowMMSE(false)}
              >Cancel</button>
              <button
                style={primaryBtn}
               onClick={() => {
                  setMmseScore(totalScore);
                  setShowMMSE(false);
                }}
              >
                Save MMSE
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  /* ================= HELPERS & STYLES ================= */

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{title}</div>
      {children}
    </div>
  );

  const Q = ({ text }) => (
    <div style={{ fontSize: 13, color: "#334155", marginBottom: 8 }}>{text}</div>
  );

  const Row = ({ cols, children }) => (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols},1fr)`,
      gap: 12,
      marginBottom: 8
    }}>
      {children}
    </div>
  );

  const YesNo = ({ onYes }) => (
    <div style={{ display: "flex", gap: 20, marginTop: 6 }}>
      <label><input type="radio" onChange={onYes} /> Yes</label>
      <label><input type="radio" /> No</label>
    </div>
  );

  const input = {
    padding: "9px 12px",
    borderRadius: 8,
    border: "1px solid #CBD5E1",
    fontSize: 13
  };

  const textarea = { ...input, width: "100%" };

  const helper = { fontSize: 12, color: "#64748B", marginBottom: 6 };

  const readBox = {
    border: "1px dashed #CBD5E1",
    padding: 10,
    borderRadius: 8,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 8
  };

  const designBox = {
    border: "1px solid #CBD5E1",
    borderRadius: 10,
    padding: 10
  };

  const canvas = {
    width: "100%",
    border: "1px solid #CBD5E1",
    borderRadius: 8
  };

  const clearBtn = {
    marginTop: 6,
    fontSize: 12
  };

  const primaryBtn = {
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 22px",
    fontWeight: 700,
    marginLeft: 10
  };

  const secondaryBtn = {
    background: "#F1F5F9",
    border: "1px solid #CBD5E1",
    borderRadius: 10,
    padding: "10px 18px"
  };




  const IsiModal = () => {
    const total =
      (isiValues.q1 ?? 0) +
      (isiValues.q2 ?? 0) +
      (isiValues.q3 ?? 0) +
      (isiValues.q4 ?? 0) +
      (isiValues.q5 ?? 0) +
      (isiValues.q6 ?? 0) +
      (isiValues.q7 ?? 0);

    return (
      <div style={styles.modalOverlay}>
        <div
          style={{
            ...styles.modal,
            display: "flex",
            flexDirection: "column",
            maxHeight: "80vh"
          }}
        >
          {/* ===== HEADER ===== */}
          <h3 style={{ marginBottom: 12 }}>
            Insomnia Severity Index (ISI)
          </h3>

          {/* ===== BODY (SCROLL ONLY QUESTIONS) ===== */}
          <div style={{ flex: 1, overflowY: "auto", paddingRight: 6 }}>

            <Select
              label="1. Difficulty falling asleep"
              value={isiValues.q1}
              onChange={v => setIsiValues({ ...isiValues, q1: v })}
              options={ISI_SEVERITY_OPTIONS}
            />

            <Select
              label="2. Difficulty staying asleep"
              value={isiValues.q2}
              onChange={v => setIsiValues({ ...isiValues, q2: v })}
              options={ISI_SEVERITY_OPTIONS}
            />

            <Select
              label="3. Problems waking up too early"
              value={isiValues.q3}
              onChange={v => setIsiValues({ ...isiValues, q3: v })}
              options={ISI_SEVERITY_OPTIONS}
            />

            <Select
              label="4. Satisfaction with current sleep pattern"
              value={isiValues.q4}
              onChange={v => setIsiValues({ ...isiValues, q4: v })}
              options={ISI_SATISFACTION_OPTIONS}
            />

            <Select
              label="5. Noticeability of sleep problem to others"
              value={isiValues.q5}
              onChange={v => setIsiValues({ ...isiValues, q5: v })}
              options={ISI_NOTICEABILITY_OPTIONS}
            />

            <Select
              label="6. Worry / distress about sleep problem"
              value={isiValues.q6}
              onChange={v => setIsiValues({ ...isiValues, q6: v })}
              options={ISI_WORRY_OPTIONS}
            />

            <Select
              label="7. Interference with daily functioning"
              value={isiValues.q7}
              onChange={v => setIsiValues({ ...isiValues, q7: v })}
              options={ISI_INTERFERENCE_OPTIONS}
            />

          </div>

          {/* ===== FOOTER (FIXED) ===== */}
          <div
            style={{
              borderTop: "1px solid #E5E7EB",
              paddingTop: 12,
              marginTop: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ fontWeight: 600 }}>
              Total ISI Score: {total}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={styles.secondaryBtn}
                onClick={() => setShowIsi(false)}
              >
                Cancel
              </button>

              <button
                style={styles.primaryBtn}
                onClick={() => {
                  setIsiTotal(total);
                  setShowIsi(false);
                }}
              >
                Save
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const JfkModal = () => {
    const total =
      (jfkValues.auditory ?? 0) +
      (jfkValues.visual ?? 0) +
      (jfkValues.motor ?? 0) +
      (jfkValues.verbal ?? 0) +
      (jfkValues.communication ?? 0) +
      (jfkValues.arousal ?? 0);

    const SECTION_STYLE = { marginBottom: 14 };

    return (
      <div style={styles.modalOverlay}>
        <div
          style={styles.modal}
        >
          {/* HEADER */}
          <h3 style={{ marginBottom: 12 }}>
            JFK Coma Recovery Scale – Revised (CRS-R)
          </h3>

          {/* BODY – ONLY THIS SCROLLS */}
          <div style={{ flex: 1, overflowY: "auto", paddingRight: 8 }}>

            <div style={SECTION_STYLE}>
              <Select
                label="Auditory Function Scale"
                value={jfkValues.auditory}
                onChange={v => setJfkValues({ ...jfkValues, auditory: v })}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Auditory startle", value: 1 },
                  { label: "2 – Localization to sound", value: 2 },
                  { label: "3 – Reproducible movement to command*", value: 3 },
                  { label: "4 – Consistent  movement to command*", value: 4 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Visual Function Scale"
                value={jfkValues.visual}
                onChange={v => setJfkValues({ ...jfkValues, visual: v })}
                options={[
                  { label: "0 – None*", value: 0 },
                  { label: "1 – Visual startle*", value: 1 },
                  { label: "2 – Fixation*", value: 2 },
                  { label: "3 – Visual pursuit*", value: 3 },
                  { label: "4 – Object localization:Reaching*", value: 4 },
                  { label: "5 – Object recognition*", value: 5 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Motor Function Scale"
                value={jfkValues.motor}
                onChange={v => setJfkValues({ ...jfkValues, motor: v })}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Abnormal posturing", value: 1 },
                  { label: "2 – Flexion withdrawal", value: 2 },
                  { label: "3 – Localization to Noxious stimulation*", value: 3 },
                  { label: "4 – Object manipulation*", value: 4 },
                  { label: "5 – Automatic motor response*", value: 5 },
                  { label: "6 – Functional object use+", value: 6 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Oromotor/Verbal Function Scale"
                value={jfkValues.verbal}
                onChange={v => setJfkValues({ ...jfkValues, verbal: v })}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Oral reflexive movement", value: 1 },
                  { label: "2 – Vocalization/Oral movement", value: 2 },
                  { label: "3 – Intelligible verbalization*", value: 3 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Communication Scale"
                value={jfkValues.communication}
                onChange={v => setJfkValues({ ...jfkValues, communication: v })}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Non-functional:intentional", value: 1 },
                  { label: "2 – Functional accurate*", value: 2 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Arousal Scale"
                value={jfkValues.arousal}
                onChange={v => setJfkValues({ ...jfkValues, arousal: v })}
                options={[
                  { label: "0 – Unresponsive", value: 0 },
                  { label: "1 – Eye opening w/o stimulation", value: 1 },
                  { label: "2 – Eye opening with stimulation", value: 2 },
                  { label: "3 – Attention", value: 3 }
                ]}
              />
            </div>

          </div>

          {/* FOOTER – FIXED */}
          <div
            style={{
              borderTop: "1px solid #E5E7EB",
              paddingTop: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ fontWeight: 700 }}>
              Total CRS-R Score: {total}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={styles.secondaryBtn}
                onClick={() => setShowJfk(false)}
              >
                Cancel
              </button>

              <button
                style={styles.primaryBtn}
                onClick={() => {
                  setJfkTotal(total);
                  setShowJfk(false);
                }}
              >
                Save
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const RanchoModal = ({ onClose, onSave, value }) => {
    const [selected, setSelected] = useState(value);

    const levels = [
      {
        level: 1,
        title: "Level I – No response (Total assistance)",
        desc: "Patient does not respond to external stimuli and may appear asleep."
      },
      {
        level: 2,
        title: "Level II – Generalized response (Total assistance)",
        desc: "Responds inconsistently and non-purposefully to stimuli."
      },
      {
        level: 3,
        title: "Level III – Localized response (Total assistance)",
        desc: "Responds specifically but inconsistently to stimuli."
      },
      {
        level: 4,
        title: "Level IV – Confused / Agitated (Maximal assistance)",
        desc: "Agitated behavior, non-purposeful responses."
      },
      {
        level: 5,
        title: "Level V – Confused, inappropriate (Maximal assistance)",
        desc: "Random, fragmented responses to complex commands."
      },
      {
        level: 6,
        title: "Level VI – Confused, appropriate (Moderate assistance)",
        desc: "Goal-directed behavior with external input."
      },
      {
        level: 7,
        title: "Level VII – Automatic, appropriate (Minimal assistance)",
        desc: "Performs daily routines automatically but lacks insight."
      },
      {
        level: 8,
        title: "Level VIII – Purposeful, appropriate (Stand-by assistance)",
        desc: "Aware of deficits and compensates appropriately."
      },
      {
        level: 9,
        title: "Level IX – Purposeful, appropriate (Stand-by assistance on request)",
        desc: "Independent with standby assistance when needed."
      },
      {
        level: 10,
        title: "Level X – Purposeful, appropriate (Modified independent)",
        desc: "Independent in structured and unstructured environments."
      }
    ];

    return (
      <div style={styles.modalOverlay}>
        <div style={{ ...styles.modal, maxWidth: 720 }}>

          <h3 style={{ marginBottom: 14 }}>
            Rancho Los Amigos Scale – Revised (RLAR-S)
          </h3>

          {/* SCROLLABLE BODY */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              paddingRight: 8
            }}
          >


            {levels.map(lvl => (
              <label
                key={lvl.level}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: 12,
                  borderRadius: 8,
                  border:
                    selected === lvl.level
                      ? "2px solid #2563EB"
                      : "1px solid #E5E7EB",
                  marginBottom: 10,
                  cursor: "pointer",
                  background:
                    selected === lvl.level ? "#EFF6FF" : "#fff"
                }}
              >
                <input
                  type="checkbox"
                  checked={selected === lvl.level}
                  onChange={() => setSelected(lvl.level)}
                />
                <div>
                  <div style={{ fontWeight: 700 }}>{lvl.title}</div>
                  <div style={{ fontSize: 13, color: "#475569" }}>
                    {lvl.desc}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* FOOTER */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 16
            }}
          >
            <button
              style={styles.secondaryBtn}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              style={styles.primaryBtn}
              disabled={!selected}
              onClick={() => {
                onSave(selected);
                onClose();
              }}
            >
              Save
            </button>
          </div>

        </div>
      </div>
    );
  };

  const EssModal = ({ onClose = () => { }, onSave = () => { }, initialValues = {} }) => {

    const [answers, setAnswers] = useState(
      ESS_QUESTIONS.reduce(
        (acc, _, i) => ({ ...acc, [i]: initialValues[i] ?? null }),
        {}
      )
    );

    const totalScore = Object.values(answers).reduce(
      (sum, v) => sum + (v ?? 0),
      0
    );

    return (
      <div style={styles.modalOverlay}>
        <div style={{ ...styles.modal, width: 820, maxHeight: "85vh", display: "flex", flexDirection: "column" }}>

          {/* HEADER */}
          <h2 style={{ marginBottom: 16 }}>Epworth Sleepiness Scale (ESS)</h2>

          {/* TABLE (SCROLLABLE BODY ONLY) */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>

              {/* TABLE HEADER */}
              <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>

                <tr>
                  <th style={styles.th}></th>
                  {ESS_OPTIONS.map(opt => (
                    <th key={opt.value} style={styles.th}>
                      {opt.label}
                      <div style={{ fontWeight: 700 }}>({opt.value})</div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {ESS_QUESTIONS.map((q, i) => (
                  <tr key={i}>
                    <td style={styles.tdLabel}>{q}</td>

                    {ESS_OPTIONS.map(opt => (
                      <td key={opt.value} style={styles.td}>
                        <input
                          type="radio"
                          name={`ess-${i}`}
                          checked={answers[i] === opt.value}
                          onChange={() =>
                            setAnswers(prev => ({ ...prev, [i]: opt.value }))
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER (FIXED) */}
          <div style={styles.modalFooter}>
            <div style={{ fontWeight: 700 }}>
              Total ESS Score: {totalScore}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button style={styles.secondaryBtn} onClick={onClose}>
                Cancel
              </button>
              <button
                style={styles.primaryBtn}
                onClick={() => onSave({ total: totalScore, answers })}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const GcsModal = () => {
    const total =
      (gcsValues.eye ?? 0) +
      (gcsValues.motor ?? 0) +
      (gcsValues.verbal ?? 0);

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>

          <h3 style={{ marginBottom: 16 }}>
            Glasgow Coma Scale (GCS)
          </h3>

          {/* EYE */}
          <Select
            label="Eye Opening"
            value={gcsValues.eye}
            onChange={v =>
              setGcsValues({
                ...gcsValues,
                eye: v
              })
            }
            options={[
              { label: "1-None", value: 1 },
              { label: "2-To pain", value: 2 },
              { label: "3-To speech", value: 3 },
              { label: "4-Spontaneous", value: 4 }
            ]}
          />


          <Select
            label="Verbal Response"
            value={gcsValues.verbal}
            onChange={v =>
              setGcsValues({
                ...gcsValues,
                verbal: v
              })
            }
            options={[
              { label: "1-None", value: 1 },
              { label: "2-Incomprehensible", value: 2 },
              { label: "3-Inappropriate", value: 3 },
              { label: "4-Confused", value: 4 },
              { label: "5-Oriented", value: 5 }
            ]}
          />
          <Select
            label="Motor Response"
            value={gcsValues.motor}
            onChange={v =>
              setGcsValues({
                ...gcsValues,
                motor: v
              })
            }
            options={[
              { label: "1-No movement", value: 1 },
              { label: "2-Extension", value: 2 },
              { label: "3-Abnormal flexion", value: 3 },
              { label: "4-Withdrawal(from painful stimulus)", value: 4 },
              { label: "5-Localizes pain", value: 5 },
              { label: "6-Obeys commands", value: 6 }
            ]}
          />

          {/* TOTAL */}
          <div style={{ marginTop: 12, fontWeight: 600 }}>
            Total GCS Score: {total}
          </div>

          {/* FOOTER */}
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
              gap: 12
            }}
          >
            <button
              style={styles.secondaryBtn}
              onClick={() => setShowGcs(false)}
            >
              Cancel
            </button>

            <button
              style={styles.primaryBtn}
              onClick={() => {
                setGcsScore(total);
                setShowGcs(false);
              }}
            >
              Save
            </button>
          </div>

        </div>
      </div>
    );
  };

  const PsqiModal = ({ onClose, onSave }) => {
    const [answers, setAnswers] = useState({});

    const total = Object.values(answers).reduce((s, v) => s + (v ?? 0), 0);

    const interpretation =
      total <= 5 ? "Good sleep quality" :
        total <= 10 ? "Mild disturbance" :
          total <= 15 ? "Moderate disturbance" :
            "Severe sleep disturbance";

    return (
      <div style={styles.modalOverlay}>
        <div style={{ ...styles.modal, width: 820 }}>

          <h3>Pittsburgh Sleep Quality Index (PSQI)</h3>

          <div style={{ flex: 1, overflowY: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed"   // 🔑 CRITICAL for alignment
              }}
            >
              {/* ===== HEADER (FIXED) ===== */}
              <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
                <tr>
                  <th style={{ ...styles.th, width: "38%" }}></th>

                  {PSQI_OPTIONS.map(opt => (
                    <th key={opt.value} style={styles.th}>
                      <div style={{ fontWeight: 700 }}>{opt.value}</div>
                      <div style={{ fontSize: 12 }}>{opt.label.replace(/^\d+\s*–\s*/, "")}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* ===== BODY (SCROLLS) ===== */}
              <tbody>
                {PSQI_QUESTIONS.map((q, i) => (
                  <tr key={i}>
                    {/* QUESTION */}
                    <td style={styles.tdLabel}>{q}</td>

                    {/* OPTIONS */}
                    {PSQI_OPTIONS.map(opt => (
                      <td key={opt.value} style={styles.td}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <input
                            type="radio"
                            name={`psqi-${i}`}
                            checked={answers[i] === opt.value}
                            onChange={() =>
                              setAnswers(prev => ({
                                ...prev,
                                [i]: opt.value
                              }))
                            }
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div style={styles.modalFooter}>
            <div>
              Total PSQI Score: {total} ({interpretation})
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button style={styles.secondaryBtn} onClick={onClose}>Cancel</button>
              <button
                style={styles.primaryBtn}
                onClick={() =>
                  onSave({
                    score: total,
                    interpretation,
                    values: answers
                  })
                }
              >
                Save
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  };



  return (
    <div style={styles.container}>

      <Card >
        <RadioRow
          label="Cognitive"
          value={hasCognitiveImpairment}
          onChange={setHasCognitiveImpairment}
          options={["Intact", "Impaired"]}
        />

        <RadioRow
          label="Altered consciousness?"
          value={alert}
          onChange={setAlert}
          options={["Alert", "Altered consciousness"]}
        />

        {alert === "Altered consciousness" && (
          <>
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              <button style={styles.secondaryBtn} onClick={() => setShowGcs(true)}>
                Glasgow Coma Scale chart
              </button>
              {(gcsValues.eye || gcsValues.verbal || gcsValues.motor) && (
                <div style={{ fontWeight: 600 }}>
                  E{gcsValues.eye || 0} V{gcsValues.verbal || 0} M{gcsValues.motor || 0}
                  {" = "}
                  {gcsScore}/15
                </div>
              )}

            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 8, paddingBottom: 10 }}>
              <button style={styles.secondaryBtn} onClick={() => setShowJfk(true)}>
                JFK CRS-R chart
              </button>
              {jfkTotal !== null && <div style={{ fontWeight: 600 }}>JFK Score: {jfkTotal}</div>}
            </div>
            <span style={styles.rowLabel}>Please specify</span>

            <TextArea />

            <SelectRow
              label="Monitor GCS"
              value={gcs.monitor}
              onChange={gcsotal}
              options={["Per shift", "Daily", "Weekly"]}
            />

            <SelectRow
              label="Repeat JFK Coma Recovery Scale"
              value={gcs.jfk}
              onChange={gcsotal}
              options={["Weekly", "2 weekly"]}
            />

            <SelectRow
              label="For multimodal sensory stimulation"
              value={gcs.multi}
              onChange={gcsotal}
              options={["OD", "BD", "TDS", "QID"]}
            />
            <span style={styles.rowLabel}>Plan To teach carer regarding multimodal sensory stimulation</span>
            <TextArea />
            <span style={styles.rowLabel}>Others</span>
            <TextArea />
          </>
        )}

        <div>
          <h3 style={styles.cardTitle}>Orientation</h3>
          <RadioRow
            label="Orientation functions"
            value={orientation.status}
            onChange={v => setOrientation({ ...orientation, status: v })}
            options={["Intact", "Impaired"]}
          />

          {orientation.status === "Impaired" && (
            <>
              <RadioRow
                label="Orientation to time"
                value={orientation.time}
                onChange={v => setOrientation({ ...orientation, time: v })}
                options={["Yes", "No"]}
              />

              <RadioRow
                label="Orientation to place"
                value={orientation.place}
                onChange={v => setOrientation({ ...orientation, place: v })}
                options={["Yes", "No"]}
              />

              <RadioRow
                label="Orientation to person"
                value={orientation.person}
                onChange={v => setOrientation({ ...orientation, person: v })}
                options={["Yes", "No"]}
              />
              <span style={styles.rowLabel}>Please specify</span>

              <TextArea />
              <span style={styles.rowLabel}> Orientation board</span>

              <TextArea />
              <span style={styles.rowLabel}>Others</span>

              <TextArea />
            </>
          )}

        </div>
        <div>
          <h3 style={styles.cardTitle}>Ability to obey command </h3>

          {/* -------- 3 STEP -------- */}
          <RadioRow
            label="Obey 3-step command"
            value={language.cmd3}
            onChange={v =>
              setLanguage({
                ...language,
                cmd3: v,
                cmd3Clue: "",
                cmd3CueType: "",
                cmd2: "",
                cmd2Clue: "",
                cmd2CueType: "",
                cmd1: "",
                cmd1Clue: "",
                cmd1CueType: "",
                consistency: ""
              })
            }
            options={["YES", "NO"]}
          />

          {language.cmd3 === "YES" && (
            <>
              <SelectRow
                label="How did the patient obey the 3-step command?"
                value={language.cmd3Clue}
                onChange={v =>
                  setLanguage({ ...language, cmd3Clue: v, cmd3CueType: "" })
                }
                options={CLUE_OPTIONS}
              />

              {language.cmd3Clue === "With Clues" && (
                <SelectRow
                  label="Type of cues used"
                  value={language.cmd3CueType}
                  onChange={v =>
                    setLanguage({ ...language, cmd3CueType: v })
                  }
                  options={CUE_TYPE_OPTIONS}
                />
              )}
            </>
          )}

          {/* -------- 2 STEP -------- */}
          {language.cmd3 === "NO" && (
            <RadioRow
              label="Obey 2-step command"
              value={language.cmd2}
              onChange={v =>
                setLanguage({
                  ...language,
                  cmd2: v,
                  cmd2Clue: "",
                  cmd2CueType: "",
                  cmd1: "",
                  cmd1Clue: "",
                  cmd1CueType: "",
                  consistency: ""
                })
              }
              options={["YES", "NO"]}
            />
          )}

          {language.cmd3 === "NO" && language.cmd2 === "YES" && (
            <>
              <SelectRow
                label="How did the patient obey the 2-step command?"
                value={language.cmd2Clue}
                onChange={v =>
                  setLanguage({ ...language, cmd2Clue: v, cmd2CueType: "" })
                }
                options={CLUE_OPTIONS}
              />

              {language.cmd2Clue === "With Clues" && (
                <SelectRow
                  label="Type of cues used"
                  value={language.cmd2CueType}
                  onChange={v =>
                    setLanguage({ ...language, cmd2CueType: v })
                  }
                  options={CUE_TYPE_OPTIONS}
                />
              )}
            </>
          )}

          {/* -------- 1 STEP -------- */}
          {language.cmd3 === "NO" && language.cmd2 === "NO" && (
            <RadioRow
              label="Obey 1-step command"
              value={language.cmd1}
              onChange={v =>
                setLanguage({
                  ...language,
                  cmd1: v,
                  cmd1Clue: "",
                  cmd1CueType: "",
                  consistency: ""
                })
              }
              options={["YES", "NO"]}
            />
          )}

          {language.cmd3 === "NO" &&
            language.cmd2 === "NO" &&
            language.cmd1 === "YES" && (
              <>
                <SelectRow
                  label="How did the patient obey the 1-step command?"
                  value={language.cmd1Clue}
                  onChange={v =>
                    setLanguage({ ...language, cmd1Clue: v, cmd1CueType: "" })
                  }
                  options={CLUE_OPTIONS}
                />

                {language.cmd1Clue === "With Clues" && (
                  <SelectRow
                    label="Type of cues used"
                    value={language.cmd1CueType}
                    onChange={v =>
                      setLanguage({ ...language, cmd1CueType: v })
                    }
                    options={CUE_TYPE_OPTIONS}
                  />
                )}
              </>
            )}

          {/* -------- CONSISTENCY -------- */}
          {(language.cmd3 === "YES" ||
            language.cmd2 === "YES" ||
            language.cmd1 === "YES") && (
              <SelectRow
                label="Consistency"
                value={language.consistency}
                onChange={v =>
                  setLanguage({ ...language, consistency: v })
                }
                options={CONSISTENCY_OPTIONS}
              />
            )}
          <span style={styles.rowLabel}>To use simple command in all activities</span>

          <TextArea />
          <span style={styles.rowLabel}>Others</span>

          <TextArea />
        </div>


        <div>
          <h3 style={styles.cardTitle}>Memory</h3>
          <RadioRow
            label="Memory function"
            value={memory.status}
            onChange={v => setMemory({ ...memory, status: v })}
            options={["Intact", "Impaired"]}
          />
          {memory.status === "Impaired" && (
            <>

              <span style={styles.rowLabel}>Please specify</span>
              <TextArea />
              <span style={styles.rowLabel}>To use simple command in all activities</span>

              <TextArea />
              <span style={styles.rowLabel}>Others</span>

              <TextArea />

            </>
          )}

        </div>

        <div>
          <h3 style={styles.cardTitle}>Attention</h3>
          <RadioRow
            label="Attention function"
            value={attention}
            onChange={setAttention}
            options={["Good", "Poor"]}
          />

          {attention === "Poor" && (
            <>

              <span style={styles.rowLabel}>Please specify</span>

              <TextArea />
              <span style={styles.rowLabel}>To do activities in low stimulus environment to reduce distraction</span>

              <TextArea />
              <span style={styles.rowLabel}>Others</span>

              <TextArea />
            </>
          )}

        </div>

        <div>
          <h3 style={styles.cardTitle}>Emotional</h3>
          <RadioRow
            label="Emotional / Mood functions"
            value={mood}
            onChange={setMood}
            options={["Normal mood", "Altered mood"]}
          />
          {mood === "Altered mood" && (
            <>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button style={styles.secondaryBtn} onClick={() => setShowPhq9(true)}>Patient Health Questionnaire (PHQ-9)</button>
                {phqResult && (
                  <div style={{ fontWeight: 600 }}>
                    <div>Total Score: {phqResult.total}</div>
                    <div>Depression Severity: {phqResult.severity}</div>
                  </div>
                )}


              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>

                <button style={styles.secondaryBtn} onClick={() => setShowGad7(true)}>Generalized Anxiety Disorder (GAD-7)</button>
                {gadResult && (
                  <div style={{ fontWeight: 600 }}>
                    <div>Total Score: {gadResult.total}</div>
                    <div>Anxiety Severity: {gadResult.severity}</div>
                  </div>
                )}


              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>

                <button style={styles.secondaryBtn} onClick={() => setShowDass(true)}>Depression Anxiety Stress Scale (DASS-21)</button>
                {dassResult && (
                  <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
                    <div style={{ fontWeight: 600 }}>
                      DEPRESSION SCORE : {dassResult.depression.score}
                      ({dassResult.depression.severity})
                    </div>
                    <div style={{ fontWeight: 600 }}>
                      ANXIETY SCORE : {dassResult.anxiety.score}
                      ({dassResult.anxiety.severity})
                    </div>
                    <div style={{ fontWeight: 600 }}>
                      STRESS SCORE : {dassResult.stress.score}
                      ({dassResult.stress.severity})
                    </div>
                  </div>
                )}

              </div>


              <span style={styles.rowLabel}>Please specify</span>

              <TextArea />
              <span style={styles.rowLabel}>Monitor patient's mood</span>

              <TextArea />
              <span style={styles.rowLabel}>Inform if patient exhibit abnormal behaviour</span>

              <TextArea />
              <span style={styles.rowLabel}>Repeat assessment weekly / when needed</span>

              <TextArea />
              <span style={styles.rowLabel}>Others</span>
              <TextArea />

            </>
          )}


        </div>

        <div>
          <h3 style={styles.cardTitle}>Perceptual Skills</h3>


          <RadioRow
            label="Perceptual functions"
            value={visuo.status}
            onChange={v => setVisuo({ ...visuo, status: v })}
            options={["Intact", "Impaired"]}
          />

          {visuo.status === "Impaired" && (
            <>
              <RadioRow
                label="Neglect"
                value={visuo.neglect}
                onChange={v => setVisuo({ ...visuo, neglect: v })}
                options={["YES", "NO"]}
              />

              <RadioRow
                label="Apraxia"
                value={visuo.apraxia}
                onChange={v => setVisuo({ ...visuo, apraxia: v })}
                options={["YES", "NO"]}
              />

              <span style={styles.rowLabel}>Please specify</span>

              <TextArea />
              <span style={styles.rowLabel}>To give more stimulation and aproach from patient's left side</span>

              <TextArea />
              <span style={styles.rowLabel}>Others</span>
              <TextArea />
            </>
          )}

        </div>

        <div>
          <h3 style={styles.cardTitle}>Sleep</h3>
          <RadioRow
            label="Sleep Quality"
            value={sleepQuality}
            onChange={setSleepQuality}
            options={["Good", "Poor"]}
          />

          {(sleepFall === "NO" || sleepQuality === "Poor") && (
            <>
              <div style={{ marginTop: 10, display: "flex", gap: 20 }}>
                <button
                  style={styles.secondaryBtn}
                  onClick={() => setShowIsi(true)}
                >
                  Insomnia Severity Index (ISI)
                </button>

                {isiTotal !== null && (
                  <div style={{ fontWeight: 600 }}>
                    ISI Score: {isiTotal} <br />
                    Interpretation: {isiInterpretation(isiTotal)}
                  </div>
                )}
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 20 }}>
                <button
                  style={styles.secondaryBtn}
                  onClick={() => setShowEss(true)}
                >
                  Epworth Sleepiness Scale (ESS)
                </button>

                {essTotal !== null && (
                  <div style={{ fontWeight: 600 }}>
                    ESS Score: {essTotal} <br />
                    Interpretation: {essInterpretation(essTotal)}
                  </div>
                )}
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 20 }}>
                <button
                  style={styles.secondaryBtn}
                  onClick={() => setShowPsqi(true)}
                >
                  Pittsburgh Sleep Quality Index (PSQI)
                </button>

                {psqiScore !== null && (
                  <div style={{ fontWeight: 600 }}>
                    PSQI Score: {psqiScore} <br />
                    Interpretation: {psqiInterpretation(psqiScore)}
                  </div>
                )}
              </div>
              <span style={styles.rowLabel}>Please specify</span>
              <TextArea />
              <span style={styles.rowLabel}>Education on sleep hygiene</span>
              <TextArea />
              <span style={styles.rowLabel}>To avoid caffein few hours before sleep time</span>
              <TextArea />
              <span style={styles.rowLabel}>For relaxation therapy</span>
              <TextArea />
              <span style={styles.rowLabel}>Others</span>
              <TextArea />
            </>
          )}

        </div>


        <div>
          <h3 style={styles.cardTitle}>Activity and Participation</h3>

          <RadioRow
            label="Problem solving"
            value={activityParticipation.attentionPerson}
            onChange={v =>
              setActivityParticipation({
                ...activityParticipation,
                attentionPerson: v
              })
            }
            options={["Intact", "Impaired"]} />
          <RadioRow
            label="Decision making"
            value={activityParticipation.attentionEnvironment}
            onChange={v =>
              setActivityParticipation({
                ...activityParticipation,
                attentionEnvironment: v
              })
            }
            options={["Intact", "Impaired"]}
          />

        </div>

        <div>
          <h3 style={styles.cardTitle}>Activity and Participation</h3>

          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <button style={styles.secondaryBtn} onClick={() => setShowMMSE(true)}>
              MMSE
            </button>

            {/* <button style={styles.secondaryBtn} onClick={() => setShowMOCA(true)}>
              MOCA
            </button> */}

            <button style={styles.secondaryBtn} onClick={() => setShowRancho(true)}>
              Rancho Los Amigos Revised Scale (RLAR-S)
            </button>
          </div>

          {mmseScore !== null && (
            <div style={{ fontWeight: 700, marginTop: 8 }}>
              MMSE Total Score: {mmseScore}
            </div>
          )}

          {rlarScore && (
            <div style={{ fontWeight: 700, marginTop: 8 }}>
              RLAR-S Level: {rlarScore}
            </div>
          )}


        </div>
        {showGcs && <GcsModal />}
        {showMMSE && <MMSEModal />}
        {/* {showMOCA && <MOCAModal />} */}

        {showIsi && <IsiModal />}
        {showPhq9 && <Phq9Modal />}
        {showGad7 && <Gad7Modal />}
        {showDass && <DassModal />}

        {
          showRancho && (
            <RanchoModal
              value={ranchoValue}
              onClose={() => setShowRancho(false)}
              onSave={setRanchoValue}
            />
          )
        }

        {
          showJfk && (
            <JfkModal
              onClose={() => setShowJfk(false)}
              onSave={(data) => {
                console.log("CRS-R Score:", data);
              }}
            />
          )
        }
        {
          showEss && (
            <EssModal
              onClose={() => setShowEss(false)}
              onSave={({ total, answers }) => {
                setEssTotal(total);
                setEssValues(answers);
                setShowEss(false);
              }}
            />
          )
        }

        {
          showPsqi && (
            <PsqiModal
              onClose={() => setShowPsqi(false)}
              onSave={({ score, values }) => {
                setPsqiScore(score);
                setPsqiData(values);
                setShowPsqi(false);
              }}
              initialValues={psqiData}
            />
          )
        }

      </Card >


    </div >
  );
}

const styles = {
  container: { maxWidth: 1000, margin: "0 auto", padding: 24 },
  card: { background: "#fff", padding: 18, borderRadius: 14, marginBottom: 18, border: "1px solid #E5E7EB" },
  title: { fontSize: 26, fontWeight: 700, marginBottom: 12, },
  cardTitle: {
    fontSize: 20,
    paddingBottom: 4,
    paddingTop: 14,
    fontWeight: 700,
    marginBottom: 12,
    textAlign: "left",
    alignSelf: "flex-start"
  },
  scoreBox: {
    background: "#F1F5FF",
    borderRadius: 12,
    padding: 16,
    fontWeight: 700,
    marginTop: 12
  },

  scoreMini: {
    background: "#F1F5FF",
    padding: 14,
    borderRadius: 12,
    fontWeight: 700,
    minWidth: 220,
    textAlign: "center"
  },

  row: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  rowLabel: { fontWeight: 600, flex: 1, fontSize: 15 },
  radioRow: { display: "flex", gap: 40 },
  radio: { display: "flex", gap: 6, alignItems: "center" },
  inlineWithBtn: { display: "flex", alignItems: "center", gap: 12 },
  submitBtn: { padding: "14px 28px", background: "#2563EB", color: "#fff", borderRadius: 12, border: "none", fontWeight: 700 },
  selectRight: {
    minWidth: 100,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #CBD5E1"
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  secondaryBtn: {
    padding: "4px 10px",
    background: "#EEF2FF",
    color: "#1E40AF",
    borderRadius: 999,   // pill
    fontSize: 12,
    fontWeight: 600,
    border: "1px solid #C7D2FE",
    cursor: "pointer"
  },

  primaryBtn: {
    padding: "10px 18px",
    background: "#2563EB",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    cursor: "pointer"
  },

  modal: {
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    width: 720,
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column"
  },
  th: {
    border: "1px solid #CBD5E1",
    padding: 10,
    fontSize: 13,
    textAlign: "center",
    background: "#F8FAFC",
    color: "#0F172A",
    fontWeight: 600
  },


  tdLabel: {
    border: "1px solid #CBD5E1",
    padding: 10,
    fontWeight: 600,
    width: "35%"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginTop: 24,
    marginBottom: 12,
    color: "#0F172A"
  },

  qLabel: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 6,
    display: "block",
    color: "#1E293B"
  },

  helperText: {
    fontSize: 12,
    fontWeight: 400,
    color: "#475569",
    marginTop: 4
  },

  languageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #CBD5E1",
    fontSize: 14
  },

  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #CBD5E1",
    fontSize: 14,
    resize: "none"
  },

  readBox: {
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px dashed #94A3B8",
    fontWeight: 700,
    letterSpacing: 1,
    width: "fit-content"
  },

  copyRow: {
    display: "flex",
    gap: 20,
    marginTop: 12
  },

  designBox: {
    flex: 1,
    height: 240,
    border: "1px solid #CBD5E1",
    borderRadius: 12,
    padding: 10,
    position: "relative",
    background: "#fff"
  },

  canvas: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    cursor: "crosshair"
  },

  canvasHint: {
    position: "absolute",
    bottom: 8,
    right: 12,
    fontSize: 11,
    color: "#64748B"
  },

  td: {
    border: "1px solid #CBD5E1",
    textAlign: "center"
  },

  modalFooter: {
    borderTop: "1px solid #E5E7EB",
    paddingTop: 12,
    marginTop: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }

};

