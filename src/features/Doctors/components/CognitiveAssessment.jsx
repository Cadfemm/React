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
function useScrollLock() {
  const scrollRef = React.useRef(null);
  const scrollTopRef = React.useRef(0);

  const saveScroll = () => {
    if (scrollRef.current) {
      scrollTopRef.current = scrollRef.current.scrollTop;
    }
  };

  const restoreScroll = () => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollTopRef.current;
      }
    });
  };

  return { scrollRef, saveScroll, restoreScroll };
}

export default function CognitiveSoapAssessment() {

  const [hasCognitiveImpairment, setHasCognitiveImpairment] = useState("");
  const { scrollRef, saveScroll, restoreScroll } = useScrollLock();

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

  const [obeyAbility, setObeyAbility] = useState("");

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
  const [doctorMode, setDoctorMode] = useState(true);

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

  const PHQ_OPTIONS = [
    { label: "Not at all", value: 0 },
    { label: "Several days", value: 1 },
    { label: "More than half the days", value: 2 },
    { label: "Nearly every day", value: 3 }
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
  const DASS_OPTIONS = [
    { label: "Did not apply to me at all", value: 0 },
    { label: "Applied some of the time", value: 1 },
    { label: "Applied a good part of time", value: 2 },
    { label: "Applied most of the time", value: 3 }
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
  const Toggle = ({ checked, onChange, label }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>

      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 42,
          height: 22,
          borderRadius: 999,
          background: checked ? "#2563EB" : "#CBD5E1",
          position: "relative",
          cursor: "pointer",
          transition: "background 0.2s"
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: 2,
            left: checked ? 22 : 2,
            transition: "left 0.2s",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
          }}
        />
      </div>
    </div>
  );


  const ScoreRow = ({ button, children }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr", // 🔑 fixed left column
        alignItems: "center",
        gap: 16,
        marginTop: 10,
        paddingBottom:10
      }}
    >
      <div>{button}</div>
      <div>{children}</div>
    </div>
  );

  const Phq9Modal = () => {
    const questions = [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself — or that you are a failure",
      "Trouble concentrating on things",
      "Moving or speaking slowly / being restless",
      "Thoughts of self-harm or being better off dead"
    ];

    const total = phq9Values.reduce((s, v) => s + (v ?? 0), 0);

    return (
      <div style={styles.modalOverlay}>
        <div
          style={{
            ...styles.modal,
            width: 820,
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16
            }}
          >
            {/* LEFT : TITLE + INFO ICON */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h3 style={{ margin: 0 }}>
                Patient Health Questionnaire (PHQ-9)
              </h3>

              {doctorMode && (
                <div className="scale-info">
                  <div className="scale-info-icon">i</div>
                  <div className="scale-tooltip">
                    <div><b>0–4</b> : Minimal or None</div>
                    <div><b>5–9</b> : Mild</div>
                    <div><b>10–14</b> : Moderate</div>
                    <div><b>15–19</b> : Moderately Severe</div>
                    <div><b>20–27</b> : Severe</div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT : DOCTOR MODE TOGGLE */}
            <Toggle
              label="Doctor Mode"
              checked={doctorMode}
              onChange={setDoctorMode}
            />
          </div>




          {/* TABLE BODY (SCROLLS) */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed"
              }}
            >
              {/* HEADER */}
              <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
                <tr>
                  <th style={{ ...styles.th, width: "40%" }}></th>
                  {PHQ_OPTIONS.map(opt => (
                    <th key={opt.label} style={styles.th}>
                      {opt.label}
                      {doctorMode && <div style={{ fontWeight: 700 }}>({opt.value})</div>}
                    </th>
                  ))}

                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {questions.map((q, i) => (
                  <tr key={i}>
                    <td style={styles.tdLabel}>
                      {i + 1}. {q}
                    </td>

                    {PHQ_OPTIONS.map(opt => (
                      <td key={opt.value} style={styles.td}>
                        <input
                          type="radio"
                          name={`phq-${i}`}
                          tabIndex={-1}
                          checked={phq9Values[i] === opt.value}
                          onChange={() => {
                            saveScroll();

                            setPhq9Values(prev => {
                              const copy = [...prev];
                              copy[i] = opt.value;
                              return copy;
                            });

                            restoreScroll();
                          }}

                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER (FIXED) */}
          {/* FOOTER (ALWAYS FIXED POSITION & ALIGNMENT) */}
          <div
            style={{
              borderTop: "1px solid #E5E7EB",
              paddingTop: 12,
              marginTop: 12,
              display: "flex",
              alignItems: "center"
            }}
          >
            {/* LEFT : SCORE PLACEHOLDER (FIXED WIDTH) */}
            <div
              style={{
                flex: 1,               // 🔑 reserves space
                fontWeight: 700,
                minHeight: 22          // prevents height jump
              }}
            >
              {doctorMode && `Total PHQ-9 Score: ${total}`}
            </div>

            {/* RIGHT : ACTION BUTTONS (NEVER MOVE) */}
            <div
              style={{
                display: "flex",
                gap: 12
              }}
            >
              <button
                style={styles.secondaryBtn}
                onClick={() => setShowPhq9(false)}
              >
                Cancel
              </button>

              <button
                style={styles.primaryBtn}
                onClick={() => {
                  const severity =
                    total <= 4 ? "Minimal / None" :
                      total <= 9 ? "Mild" :
                        total <= 14 ? "Moderate" :
                          total <= 19 ? "Moderately Severe" :
                            "Severe";

                  setPhqResult({ total, severity });
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
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it is hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid, as if something awful might happen"
    ];

    const total = gad7Values.reduce((s, v) => s + (v ?? 0), 0);

    return (
      <div style={styles.modalOverlay}>
        <div
          style={{
            ...styles.modal,
            width: 820,
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h3 style={{ margin: 0 }}>Generalized Anxiety Disorder (GAD-7)</h3>

              {doctorMode && (
                <div className="scale-info">
                  <div className="scale-info-icon">i</div>
                  <div className="scale-tooltip">
                    <div><b>0–4</b> Minimal / None</div>
                    <div><b>5–9</b> Mild</div>
                    <div><b>10–14</b> Moderate</div>
                    <div><b>15–21</b> Severe</div>
                  </div>
                </div>
              )}
            </div>

            <Toggle
              label="Doctor Mode"
              checked={doctorMode}
              onChange={setDoctorMode}
            />
          </div>



          {/* TABLE BODY (SCROLLS) */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed"
              }}
            >
              {/* HEADER */}
              <thead ref={scrollRef} style={{ position: "sticky", top: 0, zIndex: 2 }}>
                <tr>
                  <th style={{ ...styles.th, width: "40%" }}></th>
                  {PHQ_OPTIONS.map(opt => (
                    <th key={opt.label} style={styles.th}>
                      {opt.label}
                      {doctorMode && <div style={{ fontWeight: 700 }}>({opt.value})</div>}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {questions.map((q, i) => (
                  <tr key={i}>
                    <td style={styles.tdLabel}>
                      {i + 1}. {q}
                    </td>

                    {PHQ_OPTIONS.map(opt => (
                      <td key={opt.value} style={styles.td}>
                        <input
                          type="radio"
                          name={`gad-${i}`}
                          tabIndex={-1}
                          checked={gad7Values[i] === opt.value}
                          onChange={() => {
                            saveScroll();
                            setGad7Values(prev => {
                              const copy = [...prev];
                              copy[i] = opt.value;
                              return copy;
                            });
                            restoreScroll();
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER (FIXED) */}
          {/* FOOTER (ALWAYS STABLE) */}
          <div
            style={{
              borderTop: "1px solid #E5E7EB",
              paddingTop: 12,
              marginTop: 12,
              display: "flex",
              alignItems: "center"
            }}
          >
            {/* LEFT : SCORE PLACEHOLDER */}
            <div
              style={{
                flex: 1,
                fontWeight: 700,
                minHeight: 22
              }}
            >
              {doctorMode && `Total GAD-7 Score: ${total}`}
            </div>

            {/* RIGHT : ACTION BUTTONS (NEVER MOVE) */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                style={styles.secondaryBtn}
                onClick={() => setShowGad7(false)}
              >
                Cancel
              </button>

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
    );
  };

  const DassModal = () => {
    const QUESTIONS = [
      { q: "1. I found it hard to wind down.", type: "stress", i: 0 },
      { q: "2. I was aware of dryness of my mouth.", type: "anxiety", i: 0 },
      { q: "3. I couldn’t seem to experience any positive feeling at all.", type: "depression", i: 0 },
      { q: "4. I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion).", type: "anxiety", i: 1 },
      { q: "5. I found it difficult to work up the initiative to do things.", type: "depression", i: 1 },
      { q: "6. I tended to over-react to situations.", type: "stress", i: 1 },
      { q: "7. I experienced trembling.", type: "anxiety", i: 2 },
      { q: "8. I felt that I was using a lot of nervous energy.", type: "stress", i: 2 },
      { q: "9. I was worried about situations in which I might panic and make a fool of myself.", type: "anxiety", i: 3 },
      { q: "10. I felt that I had nothing to look forward to.", type: "depression", i: 2 },
      { q: "11. I found myself getting agitated.", type: "stress", i: 3 },
      { q: "12. I found it difficult to relax.", type: "stress", i: 4 },
      { q: "13. I felt down-hearted and blue.", type: "depression", i: 3 },
      { q: "14. I was intolerant of anything that kept me from getting on with what I was doing.", type: "stress", i: 5 },
      { q: "15. I felt I was close to panic.", type: "anxiety", i: 4 },
      { q: "16. I was unable to become enthusiastic.", type: "depression", i: 4 },
      { q: "17. I felt I wasn’t worth much as a person.", type: "depression", i: 5 },
      { q: "18. I felt that I was rather touchy.", type: "stress", i: 6 },
      { q: "19. I was aware of the action of my heart in the absence of physical exertion.", type: "anxiety", i: 5 },
      { q: "20. I felt scared without any good reason.", type: "anxiety", i: 6 },
      { q: "21. I felt that life was meaningless.", type: "depression", i: 6 }
    ];

    const sum = arr => arr.reduce((s, v) => s + (v ?? 0), 0);

    const total = {
      depression: sum(dassValues.depression),
      anxiety: sum(dassValues.anxiety),
      stress: sum(dassValues.stress)
    };
    const getDassSeverity = (score, type) => {
      if (type === "depression") {
        if (score <= 9) return "Normal";
        if (score <= 13) return "Mild";
        if (score <= 20) return "Moderate";
        if (score <= 27) return "Severe";
        return "Extremely Severe";
      }

      if (type === "anxiety") {
        if (score <= 7) return "Normal";
        if (score <= 9) return "Mild";
        if (score <= 14) return "Moderate";
        if (score <= 19) return "Severe";
        return "Extremely Severe";
      }

      if (type === "stress") {
        if (score <= 14) return "Normal";
        if (score <= 18) return "Mild";
        if (score <= 25) return "Moderate";
        if (score <= 33) return "Severe";
        return "Extremely Severe";
      }
    };

    return (
      <div style={styles.modalOverlay}>
        <div
          style={{
            ...styles.modal,
            width: 900,
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h3 style={{ margin: 0 }}>Depression Anxiety Stress Scale (DASS-21)</h3>

              {doctorMode && (
                <div className="scale-info">
                  <div className="scale-info-icon">i</div>
                  <div className="scale-tooltip" style={{ width: 520 }}>
                    <b>Depression</b><br />
                    0–9 Normal · 10–13 Mild · 14–20 Moderate · 21–27 Severe · 28+ Extreme<br /><br />
                    <b>Anxiety</b><br />
                    0–7 Normal · 8–9 Mild · 10–14 Moderate · 15–19 Severe · 20+ Extreme<br /><br />
                    <b>Stress</b><br />
                    0–14 Normal · 15–18 Mild · 19–25 Moderate · 26–33 Severe · 34+ Extreme
                  </div>
                </div>
              )}
            </div>

            <Toggle
              label="Doctor Mode"
              checked={doctorMode}
              onChange={setDoctorMode}
            />
          </div>

          {/* TABLE BODY */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
                <tr>
                  <th style={{ ...styles.th, width: "45%" }}></th>
                  {DASS_OPTIONS.map(opt => (
                    <th key={opt.value} style={styles.th}>
                      {opt.label}
                      {doctorMode && <div style={{ fontWeight: 700 }}>({opt.value})</div>}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {QUESTIONS.map((item, idx) => (
                  <tr key={idx}>
                    <td style={styles.tdLabel}>{item.q}</td>

                    {DASS_OPTIONS.map(opt => (
                      <td key={opt.value} style={styles.td}>
                        <input
                          type="radio"
                          name={`dass-${idx}`}
                          checked={dassValues[item.type][item.i] === opt.value}
                          onChange={() => {
                            saveScroll();
                            setDassValues(prev => {
                              const updated = [...prev[item.type]];
                              updated[item.i] = opt.value;
                              return { ...prev, [item.type]: updated };
                            });
                            restoreScroll();
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div style={styles.modalFooter}>
            <div style={{ fontWeight: 700 }}>
              {doctorMode && (
                <>
                  DEPRESSION: {total.depression} &nbsp;|&nbsp;
                  ANXIETY: {total.anxiety} &nbsp;|&nbsp;
                  STRESS: {total.stress}
                </>
              )}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button style={styles.secondaryBtn} onClick={() => setShowDass(false)}>
                Cancel
              </button>
              <button
                style={styles.primaryBtn}
                onClick={() => {
                  const result = {
                    depression: {
                      score: total.depression,
                      severity: getDassSeverity(total.depression, "depression")
                    },
                    anxiety: {
                      score: total.anxiety,
                      severity: getDassSeverity(total.anxiety, "anxiety")
                    },
                    stress: {
                      score: total.stress,
                      severity: getDassSeverity(total.stress, "stress")
                    }
                  };

                  setDassResult(result);   // ✅ THIS WAS MISSING
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

    const [score, setScore] = useState({
      orientationTime: 0,
      orientationPlace: 0,
      registration: 0,
      attention: 0,
      recall: 0,
      language: 0,
      copy: 0
    });

    const [orientationTimeFilled, setOrientationTimeFilled] = useState(false);
    const [orientationPlaceFilled, setOrientationPlaceFilled] = useState(false);

    const [consciousness, setConsciousness] = useState("");


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
          <div
            style={{
              padding: 20,
              overflowY: "auto",
              overflowX: "hidden",   // 🔑 KILLS horizontal scroll
              maxWidth: "100%"       // 🔑 prevents child overflow
            }}
          >

            {/* ORIENTATION – TIME */}
            <Section title="Orientation – Time (5)">
              <Q text="What is the (year) (season) (date) (day) (month)?" />

              <Row cols={5}>
                {["Year", "Season", "Date", "Day", "Month"].map(p => (
                  <input
                    key={p}
                    placeholder={p}
                    style={input}
                    onChange={() => {
                      if (!orientationTimeFilled) {
                        setOrientationTimeFilled(true);
                        setScore(s => ({ ...s, orientationTime: 5 }));
                      }
                    }}
                  />
                ))}
              </Row>
            </Section>


            {/* ORIENTATION – PLACE */}
            <Section title="Orientation – Place (5)">
              <Q text="Where are we (state) (country) (town) (hospital) (floor)?" />

              <Row cols={5}>
                {["State", "Country", "Town", "Hospital", "Floor"].map(p => (
                  <input
                    key={p}
                    placeholder={p}
                    style={input}
                    onChange={() => {
                      if (!orientationPlaceFilled) {
                        setOrientationPlaceFilled(true);
                        setScore(s => ({ ...s, orientationPlace: 5 }));
                      }
                    }}
                  />
                ))}
              </Row>
            </Section>


            {/* REGISTRATION */}
            <Section title="Registration (3)">
              <Q text=" Name 3 objects: 1 second to say each.  Then ask the patient
all 3 after you have said them.  Give 1 point for each correct answer.  
Then repeat them until he/she learns all 3. Count trials and record." />
              <Row cols={3}>
                <input style={input} />
                <input style={input} />
                <input style={input} />
              </Row>
              <Q text="Trails" />
              <input style={{ ...input, maxWidth: 260 }} />
              <YesNo onYes={() => setScore(s => ({ ...s, registration: 3 }))} />

            </Section>

            {/* ATTENTION */}
            <Section title="Attention & Calculation (5)">
              <Q text="Serial 7’s OR spell “WORLD” backwardSerial 7’s.  1 point for each correct answer.  Stop after 5 answers.
Alternatively spell “world” backward." />
              <input placeholder="WORLD backward" style={{ ...input, maxWidth: 260 }} />
              <YesNo onYes={() => setScore(s => ({ ...s, attention: 5 }))} />
            </Section>

            {/* RECALL */}
            <Section title="Recall (3)">
              <Q text=" Ask for the 3 objects repeated above.  Give 1 point for each correct answer" />
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
            <Section title="Assess level of consciousness">
              <Q text="Assess level of consciousness along a continuum" />

              <div style={{ display: "flex", gap: 20, marginTop: 6 }}>
                {["Alert", "Drowsy", "Stupor", "Coma"].map(opt => (
                  <label key={opt} style={{ display: "flex", gap: 6 }}>
                    <input
                      type="radio"
                      name="consciousness"
                      checked={consciousness === opt}
                      onChange={() => setConsciousness(opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
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
            <div >
              <button style={styles.secondaryBtn} onClick={() => setShowMMSE(false)}
              >Cancel</button>
              <button
                style={styles.primaryBtn}
                onClick={() => {
                  setMmseScore(totalScore);
                  setShowMMSE(false);
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(120px, 1fr))`,
        gap: 12,
        marginBottom: 8,
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      {children}
    </div>
  );


  const YesNo = ({ onYes }) => (
    <div style={{ display: "flex", gap: 20, marginTop: 6 }}>
      <label><input type="radio" onChange={onYes} /> Correct</label>
      <label><input type="radio" /> Inorrect</label>
    </div>
  );

  const input = {
    width: "100%",
    minWidth: 0,              // 🔑 CRITICAL
    padding: "9px 12px",
    borderRadius: 8,
    border: "1px solid #CBD5E1",
    fontSize: 13,
    boxSizing: "border-box"   // 🔑 CRITICAL
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
              onChange={v => {
                saveScroll();
                setIsiValues({ ...isiValues, q1: v })
                restoreScroll();
              }
              }
              options={ISI_SEVERITY_OPTIONS}
            />

            <Select
              label="2. Difficulty staying asleep"
              value={isiValues.q2}
              onChange={v => {
                saveScroll();
                setIsiValues({ ...isiValues, q2: v })
                restoreScroll();
              }}
              options={ISI_SEVERITY_OPTIONS}
            />

            <Select
              label="3. Problems waking up too early"
              value={isiValues.q3}
              onChange={v => {
                saveScroll();
                setIsiValues({ ...isiValues, q3: v })
                restoreScroll();
              }}
              options={ISI_SEVERITY_OPTIONS}
            />

            <Select
              label="4. Satisfaction with current sleep pattern"
              value={isiValues.q4}
              onChange={v => {
                saveScroll();
                setIsiValues({ ...isiValues, q4: v })
                restoreScroll();
              }}
              options={ISI_SATISFACTION_OPTIONS}
            />

            <Select
              label="5. Noticeability of sleep problem to others"
              value={isiValues.q5}
              onChange={v => {
                saveScroll();
                setIsiValues({ ...isiValues, q5: v })
                restoreScroll();
              }}
              options={ISI_NOTICEABILITY_OPTIONS}
            />

            <Select
              label="6. Worry / distress about sleep problem"
              value={isiValues.q6}
              onChange={v => {
                saveScroll();
                setIsiValues({ ...isiValues, q6: v })
                restoreScroll();
              }}
              options={ISI_WORRY_OPTIONS}
            />

            <Select
              label="7. Interference with daily functioning"
              value={isiValues.q7}
              onChange={v => {
                saveScroll();
                setIsiValues({ ...isiValues, q7: v })
                restoreScroll();
              }}
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
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12
            }}
          >
            <h3 style={{ margin: 0 }}>
              JFK Coma Recovery Scale – Revised (CRS-R)
            </h3>

            {/* INFO TOOLTIP */}
            <div style={{ position: "relative" }} className="jfk-info">
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  backgroundColor: "#2563EB",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                i
              </div>

              {/* TOOLTIP CARD */}
              <div className="jfk-tooltip">
                <div><b>No symbol</b>Denotes Unresponsive Wakefulness Syndrome </div>
                <div><b>*</b> Minimally Conscious State Minus (MCS-)</div>
                <div><b>■</b> Minimally Conscious State Plus (MCS+)</div>
                <div><b>+</b> Emergence from Minimally Conscious State (eMCS)</div>

              </div>
            </div>
          </div>


          {/* BODY – ONLY THIS SCROLLS */}
          <div style={{ flex: 1, overflowY: "auto", paddingRight: 8 }}>

            <div style={SECTION_STYLE}>
              <Select
                label="Auditory Function Scale"
                value={jfkValues.auditory}
                onChange={v => {
                  saveScroll();
                  setJfkValues({ ...jfkValues, auditory: v })
                  restoreScroll();
                }}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Auditory startle", value: 1 },
                  { label: "2 – Localization to sound", value: 2 },
                  { label: "3 – Reproducible movement to command ■", value: 3 },
                  { label: "4 – Consistent  movement to command ■", value: 4 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Visual Function Scale"
                value={jfkValues.visual}
                onChange={v => {
                  saveScroll();
                  setJfkValues({ ...jfkValues, visual: v })
                  restoreScroll();
                }}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Visual startle", value: 1 },
                  { label: "2 – Fixation *", value: 2 },
                  { label: "3 – Visual pursuit*", value: 3 },
                  { label: "4 – Object localization:Reaching*", value: 4 },
                  { label: "5 – Object recognition ■", value: 5 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Motor Function Scale"
                value={jfkValues.motor}
                onChange={v => {
                  saveScroll();
                  setJfkValues({ ...jfkValues, motor: v })
                  restoreScroll();
                }}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Abnormal posturing", value: 1 },
                  { label: "2 – Flexion withdrawal", value: 2 },
                  { label: "3 – Localization to Noxious stimulation *", value: 3 },
                  { label: "4 – Object manipulation *", value: 4 },
                  { label: "5 – Automatic motor response *", value: 5 },
                  { label: "6 – Functional object use +", value: 6 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Oromotor/Verbal Function Scale"
                value={jfkValues.verbal}
                onChange={v => {
                  saveScroll();
                  setJfkValues({ ...jfkValues, verbal: v })
                  restoreScroll();
                }}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Oral reflexive movement", value: 1 },
                  { label: "2 – Vocalization/Oral movement", value: 2 },
                  { label: "3 – Intelligible verbalization ■", value: 3 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Communication Scale"
                value={jfkValues.communication}
                onChange={v => {
                  saveScroll();
                  setJfkValues({ ...jfkValues, communication: v })
                  restoreScroll();
                }}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Non-functional:intentional ■", value: 1 },
                  { label: "2 – Functional accurate +", value: 2 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Arousal Scale"
                value={jfkValues.arousal}
                onChange={v => {
                  saveScroll();
                  setJfkValues({ ...jfkValues, arousal: v })
                  restoreScroll();
                }}
                options={[
                  { label: "0 – Unarousable", value: 0 },
                  { label: "1 – Eye opening with stimulation", value: 1 },
                  { label: "2 – Eye opening w/o stimulation", value: 2 },
                  { label: "3 – Attention", value: 3 }
                ]}
              />
            </div>

          </div>

          {/* FOOTER – FIXED */}
          {/* FOOTER – FIXED (NON-SCROLLING) */}
          <div
            style={{
              borderTop: "1px solid #E5E7EB",
              paddingTop: 10,
              fontSize: 12
            }}
          >
            {/* SYMBOL LEGEND */}
            {/* <div style={{ marginBottom: 8,fontSize:15,fontWeight:700, color: "#374151" }}>
    <div>No symbol Denotes Unresponsive Wakefulness Syndrome </div>
    <div>* Denotes Minimally Conscious State Minus (MCS-)</div>
    <div>■ Denotes Minimally Conscious State Plus (MCS+)</div>
    <div>+ Denotes emergence from Minimally Conscious State (eMCS)</div>
  </div> */}

            {/* SCORE + ACTIONS */}
            <div
              style={{
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
      </div>
    );
  };

  const RanchoModal = ({ onClose, onSave, value }) => {
    const [selected, setSelected] = useState(value);

    const levels = [
      {
        level: 1,
        title: "Level I – No response: total assistance",
        desc:
          "Your patient did not respond to external stimuli and may appear to be asleep."
      },
      {
        level: 2,
        title: "Level II – Generalized response: total assistance",
        desc:
          "Your patient reacts to external stimuli in non-specific, inconsistent, and non-purposeful manners. Their responses are limited and typically the same even if the stimuli are different."
      },
      {
        level: 3,
        title: "Level III – Localized response: total assistance",
        desc:
          "Your patient responds specifically and inconsistently with delays to stimuli. Their responses are directly related to stimuli and may respond more to people they know than strangers."
      },
      {
        level: 4,
        title: "Level IV – Confused/agitated: maximal assistance",
        desc:
          "Your patient exhibits bizarre, non-purposeful, incoherent, or inappropriate behaviors. Their agitation appears more from internal confusion than external factors. They have no short-term recall, and their attention is short and non-selective."
      },
      {
        level: 5,
        title: "Level V – Confused, inappropriate non-agitated: maximal assistance",
        desc:
          "Your patient gives random, fragmented, and non-purposeful responses to complex or unstructured stimuli. They are able to follow simple commands consistently, but their memory and selective attention are impaired, and new information is not retained. Behavior and verbal responses are often inappropriate, and the patient may appear confused and often talks. However, the patient does not seem agitated by internal factors, unlike Level IV, but may still be agitated by unpleasant external stimuli."
      },
      {
        level: 6,
        title: "Level VI – Confused, appropriate: moderate assistance",
        desc:
          "Your patient gives context-appropriate, goal-directed responses, and is dependent upon external input for direction. They are capable of retaining learning for tasks before the injury, and there is carry-over for relearned tasks, but not for new tasks. They have some awareness of self, situation, and environment, but not of specific impairments and safety concerns. Memory problems persist."
      },
      {
        level: 7,
        title: "Level VII – Automatic, appropriate: minimal assistance for daily living skills",
        desc:
          "Your patient behaves appropriately in familiar settings, is able to perform daily routines automatically, and shows carry-over for new learning at lower than normal rates. They are able to initiate social interactions and show interest in social and recreational activities in structured settings, but their judgment remains impaired. They still need minimal supervision for learning and safety."
      },
      {
        level: 8,
        title: "Level VIII – Purposeful, appropriate: stand by assistance",
        desc:
          "Your patient is consistently oriented to person, place, and time. They independently perform familiar tasks in non-distracting environments. They show emerging awareness of their impairments and how these affect performance, but they need stand-by assistance to compensate. The patient uses memory aids for daily schedules and acknowledges the emotions of others, requiring only minimal help to respond appropriately. They demonstrate improved memory for past and future events but often experience depression, irritability, and a low frustration threshold."
      },
      {
        level: 9,
        title: "Level IX – Purposeful, appropriate: stand-by assistance on request",
        desc:
          "Your patient can switch between different tasks and complete them independently. They acknowledge impairments that interfere with tasks and use compensatory strategies. However, they struggle to anticipate challenges without assistance. With help, they can consider consequences of actions and decisions. They recognize others’ emotional needs with stand-by assistance and continue to experience depression and low frustration tolerance."
      },
      {
        level: 10,
        title: "Level X – Purposeful, appropriate: modified independent",
        desc:
          "Your patient can multitask across different environments using extra time or assistive devices. They independently develop tools and methods for memory retention. They anticipate and manage obstacles from impairments and make appropriate decisions, although they may require more time or compensatory strategies. They interact appropriately in social situations but may show intermittent depression and low frustration tolerance under stress."
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
                          onChange={() => {
                            saveScroll();
                            setAnswers(prev => ({ ...prev, [i]: opt.value }))
                            restoreScroll();
                          }
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
            onChange={v => {
              saveScroll();
              setGcsValues({
                ...gcsValues,
                eye: v
              })
              restoreScroll();
            }
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
            onChange={v => {
              saveScroll();
              setGcsValues({
                ...gcsValues,
                verbal: v
              })
              restoreScroll();
            }
            }
            options={[
              { label: "1-No movement", value: 1 },
              { label: "2-Incomprehensible", value: 2 },
              { label: "3-Inappropriate", value: 3 },
              { label: "4-Confused", value: 4 },
              { label: "5-Oriented", value: 5 }
            ]}
          />
          <Select
            label="Motor Response"
            value={gcsValues.motor}
            onChange={v => {
              saveScroll();
              setGcsValues({
                ...gcsValues,
                motor: v
              })
              restoreScroll();
            }
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
        total <= 10 ? "Mild sleep difficulties" :
          total <= 15 ? "Moderate sleep difficulties" :
            "Severe sleep difficulties";

    const setVal = (key, value) =>
      setAnswers(prev => ({ ...prev, [key]: value }));

    return (
      <div style={styles.modalOverlay}>
        <div style={{ ...styles.modal, width: 860, maxHeight: "85vh" }}>

          <h3>Pittsburgh Sleep Quality Index (PSQI)</h3>

          <div style={{ overflowY: "auto", flex: 1 }}>

            {/* ================= Q1–Q4 NORMAL INPUTS ================= */}
            <div style={{ marginBottom: 14 }}>
              <div style={styles.qLabel}>
                1. During the past month, what time have you usually gone to bed at night?
              </div>
              <input style={styles.input} placeholder="Time" />
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={styles.qLabel}>
                2. During the past month, how long (in minutes) has it usually taken you to fall asleep each night?
              </div>
              <input style={styles.input} placeholder="Minutes" />
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={styles.qLabel}>
                3. During the past month, what time have you usually gotten up in the morning?
              </div>
              <input style={styles.input} placeholder="Time" />
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={styles.qLabel}>
                4. During the past month, how many hours of actual sleep did you get at night?
              </div>
              <input style={styles.input} placeholder="Hours" />
            </div>

            {/* ================= Q5 TABLE ================= */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 18 }}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: "45%" }}>
                    5. During the past month, how often have you had trouble sleeping because you…
                  </th>
                  {PSQI_OPTIONS.map(opt => (
                    <th key={opt.value} style={styles.th}>
                      <div>{opt.label}</div>
                      <div style={{ fontWeight: 700 }}>({opt.value})</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "Cannot get to sleep within 30 minutes",
                  "Wake up in the middle of the night or early morning",
                  "Have to get up to use the bathroom",
                  "Cannot breathe comfortably",
                  "Cough or snore loudly",
                  "Feel too cold",
                  "Feel too hot",
                  "Have bad dreams",
                  "Have pain",
                  "Other reason(s), please describe"
                ].map((q, i) => (
                  <tr key={i}>
                    <td style={styles.tdLabel}>{q}</td>
                    {PSQI_OPTIONS.map(opt => (
                      <td key={opt.value} style={styles.td}>
                        <input
                          type="radio"
                          name={`q5-${i}`}
                          checked={answers[`q5-${i}`] === opt.value}
                          onChange={() => setVal(`q5-${i}`, opt.value)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ================= Q6 ================= */}
            <div style={{ marginBottom: 16 }}>
              <div style={styles.qLabel}>
                6. During the past month, how often have you taken medicine to help you sleep (prescribed or “over the counter”)?
              </div>
              <select
                style={styles.input}
                onChange={e => setVal("q6", Number(e.target.value))}
              >
                <option value="">Select</option>
                {PSQI_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* ================= Q7 ================= */}
            <div style={{ marginBottom: 16 }}>
              <div style={styles.qLabel}>
                7. During the past month, how often have you had trouble staying awake while driving, eating meals, or engaging in social activity?
              </div>
              <select
                style={styles.input}
                onChange={e => setVal("q7", Number(e.target.value))}
              >
                <option value="">Select</option>
                {PSQI_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* ================= Q8 ================= */}
            <div style={{ marginBottom: 16 }}>
              <div style={styles.qLabel}>
                8. During the past month, how much of a problem has it been for you to keep up enough enthusiasm to get things done?
              </div>
              <select
                style={styles.input}
                onChange={e => setVal("q8", Number(e.target.value))}
              >
                <option value="">Select</option>
                <option value={0}>No problem at all (0)</option>
                <option value={1}>Only a very slight problem (1)</option>
                <option value={2}>Somewhat of a problem (2)</option>
                <option value={3}>A very big problem (3)</option>
              </select>
            </div>

            {/* ================= Q9 ================= */}
            <div style={{ marginBottom: 18 }}>
              <div style={styles.qLabel}>
                9. During the past month, how would you rate your sleep quality overall?
              </div>
              <select
                style={styles.input}
                onChange={e => setVal("q9", Number(e.target.value))}
              >
                <option value="">Select</option>
                <option value={0}>Very good</option>
                <option value={1}>Fairly good</option>
                <option value={2}>Fairly bad</option>
                <option value={3}>Very bad</option>
              </select>
            </div>

            {/* ================= Q10 TABLE ================= */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ ...styles.th, width: "45%" }}>
                    10. Do you have a bed partner or room mate?
                  </th>
                  {PSQI_OPTIONS.map(opt => (
                    <th key={opt.value} style={styles.th}>
                      <div>{opt.label}</div>
                      <div style={{ fontWeight: 700 }}>({opt.value})</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "Loud snoring",
                  "Long pauses between breaths while asleep",
                  "Legs twitching or jerking while you sleep",
                  "Episodes of disorientation or confusion during sleep",
                  "Other restlessness while you sleep, please describe"
                ].map((q, i) => (
                  <tr key={i}>
                    <td style={styles.tdLabel}>{q}</td>
                    {PSQI_OPTIONS.map(opt => (
                      <td key={opt.value} style={styles.td}>
                        <input
                          type="radio"
                          name={`q10-${i}`}
                          checked={answers[`q10-${i}`] === opt.value}
                          onChange={() => setVal(`q10-${i}`, opt.value)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          {/* ================= FOOTER ================= */}
          <div style={styles.modalFooter}>
            <div style={{ fontWeight: 700 }}>
              Total PSQI Score: {total} ({interpretation})
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button style={styles.secondaryBtn} onClick={onClose}>Cancel</button>
              <button
                style={styles.primaryBtn}
                onClick={() => onSave({ score: total, interpretation })}
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
          label="State of consciousness"
          value={alert}
          onChange={setAlert}
          options={["Alert", "Altered consciousness"]}
        />

        {alert === "Altered consciousness" && (
          <>
            <ScoreRow
              button={
                <button style={styles.secondaryBtn} onClick={() => setShowGcs(true)}>
                  Glasgow Coma Scale chart
                </button>
              }
            >
              {gcsScore && (
                <div style={{ fontWeight: 700 }}>
                  E{gcsValues.eye || 0} V{gcsValues.verbal || 0} M{gcsValues.motor || 0}
                  {" = "}
                  {gcsScore}/15
                </div>
              )}
            </ScoreRow>

            <ScoreRow
              button={
                <button style={styles.secondaryBtn} onClick={() => setShowJfk(true)}>
                  JFK CRS-R chart
                </button>
              }
            >
              {jfkTotal !== null && (
                <div style={{ fontWeight: 700 }}>
                  JFK Score: {jfkTotal}
                </div>
              )}
            </ScoreRow>

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
              options={["Once Daily(OD)", "Twice Daily(BD)", "Thrice Daily(TDS)", "Four Times Daily(QID)"]}
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
          <h3 style={styles.cardTitle}>Ability to obey command</h3>

          <RadioRow
            label="Ability to obey command"
            value={obeyAbility}
            onChange={v => {
              setObeyAbility(v);

              // reset only when changed
              setLanguage({
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
            }}
            options={["Intact", "Impaired"]}
          />
          {obeyAbility === "Intact" && (
            <>
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
            </>
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
              <div >

              
       <ScoreRow
                button={

                  <button style={styles.secondaryBtn} onClick={() => setShowPhq9(true)}>Patient Health Questionnaire (PHQ-9)</button>
                }
                >

                 {phqResult && (
                    <div style={{ fontWeight: 600 }}>
                      <div>Total Score: {phqResult.total}</div>
                      <div>Depression Severity: {phqResult.severity}</div>
                    </div>
                  )}

                </ScoreRow>



                <ScoreRow
                button={

                  <button style={styles.secondaryBtn} onClick={() => setShowGad7(true)}>Generalized Anxiety Disorder (GAD-7)</button>
                }
                >

                  {gadResult && (
                    <div style={{ fontWeight: 600 }}>
                      <div>Total Score: {gadResult.total}</div>
                      <div>Anxiety Severity: {gadResult.severity}</div>
                    </div>
                  )}

                </ScoreRow>



              
                <ScoreRow
                  button={
                    <button style={styles.secondaryBtn} onClick={() => setShowDass(true)}>
                      Depression Anxiety Stress Scale (DASS-21)
                    </button>
                  }
                >
                  {dassResult && (
                    <div style={{ display: "flex", gap: 24, fontWeight: 600 }}>
                      <div>
                        DEPRESSION SCORE : {dassResult.depression.score}
                        ({dassResult.depression.severity})
                      </div>
                      <div>
                        ANXIETY SCORE : {dassResult.anxiety.score}
                        ({dassResult.anxiety.severity})
                      </div>
                      <div>
                        STRESS SCORE : {dassResult.stress.score}
                        ({dassResult.stress.severity})
                      </div>
                    </div>
                  )}
                </ScoreRow>

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
              <ScoreRow
                button={
                  <button style={styles.secondaryBtn} onClick={() => setShowIsi(true)}>
                    Insomnia Severity Index (ISI)
                  </button>
                }
              >
                {isiTotal !== null && (
                  <>
                    <div style={{ fontWeight: 600 }}>ISI Score: {isiTotal}</div>
                    <div style={{  fontWeight: 600 }}>
                      Interpretation: {isiInterpretation(isiTotal)}
                    </div>
                  </>
                )}
              </ScoreRow>

              <ScoreRow
                button={
                  <button style={styles.secondaryBtn} onClick={() => setShowEss(true)}>
                    Epworth Sleepiness Scale (ESS)
                  </button>
                }
              >
                {essTotal !== null && (
                  <>
                    <div style={{ fontWeight: 600 }}>ESS Score: {essTotal}</div>
                    <div style={{  fontWeight: 600 }}>
                      Interpretation: {essInterpretation(essTotal)}
                    </div>
                  </>
                )}
              </ScoreRow>

              <ScoreRow
                button={
                  <button style={styles.secondaryBtn} onClick={() => setShowPsqi(true)}>
                    Pittsburgh Sleep Quality Index (PSQI)
                  </button>
                }
              >
                {psqiScore !== null && (
                  <>
                    <div style={{ fontWeight: 600 }}>PSQI Score: {psqiScore}</div>
                    <div style={{  fontWeight: 600 }}>
                      Interpretation: {psqiInterpretation(psqiScore)}
                    </div>
                  </>
                )}
              </ScoreRow>

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
          <h3 style={styles.cardTitle}>Additional outcome measure	 </h3>

          {/* ===== MMSE ROW ===== */}
          <ScoreRow
            button={
              <button style={styles.secondaryBtn} onClick={() => setShowMMSE(true)}>
                Mini-Mental State Examination (MMSE)
              </button>
            }
          >
            {mmseScore !== null && (
              <div style={{ fontWeight: 700 }}>
                MMSE Total Score: {mmseScore} / 30
              </div>
            )}
          </ScoreRow>

          <ScoreRow
            button={
              <button style={styles.secondaryBtn} onClick={() => setShowRancho(true)}>
                Rancho Los Amigos Revised Scale (RLAR-S)
              </button>
            }
          >
            {ranchoValue && (
              <div style={{ fontWeight: 700 }}>
                RLAR-S Level: {ranchoValue}
              </div>
            )}
          </ScoreRow>

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

