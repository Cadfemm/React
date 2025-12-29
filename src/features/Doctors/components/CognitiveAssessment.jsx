import React, { useState } from "react";

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
    cmd3How: "",
    cmd2: "",
    cmd2How: "",
    cmd1: "",
    cmd1How: "",
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
  const COMMAND_HOW_OPTIONS = [
    "Independently",
    "With verbal cues",
    "With visual cues",
  ];

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


  const [jfkTotal, setJfkTotal] = useState(null);
  const ESS_OPTIONS = [
    { label: "Would never nod off", value: 0 },
    { label: "Slight chance of nodding off", value: 1 },
    { label: "Moderate chance of nodding off", value: 2 },
    { label: "High chance of nodding off", value: 3 }
  ];

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
                label="Auditory Function"
                value={jfkValues.auditory}
                onChange={v => setJfkValues({ ...jfkValues, auditory: v })}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Auditory startle", value: 1 },
                  { label: "2 – Localization to sound", value: 2 },
                  { label: "3 – Reproducible command following", value: 3 },
                  { label: "4 – Consistent command following", value: 4 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Visual Function"
                value={jfkValues.visual}
                onChange={v => setJfkValues({ ...jfkValues, visual: v })}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Visual startle", value: 1 },
                  { label: "2 – Fixation", value: 2 },
                  { label: "3 – Visual pursuit", value: 3 },
                  { label: "4 – Reaching", value: 4 },
                  { label: "5 – Object recognition", value: 5 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Motor Function"
                value={jfkValues.motor}
                onChange={v => setJfkValues({ ...jfkValues, motor: v })}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Abnormal posturing", value: 1 },
                  { label: "2 – Flexion withdrawal", value: 2 },
                  { label: "3 – Localization to pain", value: 3 },
                  { label: "4 – Object manipulation", value: 4 },
                  { label: "5 – Automatic motor response", value: 5 },
                  { label: "6 – Functional object use", value: 6 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Verbal Function"
                value={jfkValues.verbal}
                onChange={v => setJfkValues({ ...jfkValues, verbal: v })}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Oral reflexive movement", value: 1 },
                  { label: "2 – Vocalization", value: 2 },
                  { label: "3 – Intelligible verbalization", value: 3 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Communication"
                value={jfkValues.communication}
                onChange={v => setJfkValues({ ...jfkValues, communication: v })}
                options={[
                  { label: "0 – None", value: 0 },
                  { label: "1 – Intentional but non-functional", value: 1 },
                  { label: "2 – Functional accurate", value: 2 }
                ]}
              />
            </div>

            <div style={SECTION_STYLE}>
              <Select
                label="Arousal"
                value={jfkValues.arousal}
                onChange={v => setJfkValues({ ...jfkValues, arousal: v })}
                options={[
                  { label: "0 – Unresponsive", value: 0 },
                  { label: "1 – Eye opening with stimulation", value: 1 },
                  { label: "2 – Eye opening without stimulation", value: 2 },
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
            label="Eye Response"
            value={gcsValues.eye}
            onChange={v =>
              setGcsValues({
                ...gcsValues,
                eye: v
              })
            }
            options={[
              { label: "1-No eye opening", value: 1 },
              { label: "2-To pain", value: 2 },
              { label: "3-To speech", value: 3 },
              { label: "4-Spontaneous", value: 4 }
            ]}
          />

          {/* MOTOR */}

          {/* VERBAL */}
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
              { label: "3-Flexion", value: 3 },
              { label: "4-Withdrawal", value: 4 },
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

  const PsqiModal = ({ onClose, onSave, initialValues = {} }) => {
    const [values, setValues] = useState(initialValues);

    const freqOptions = [
      { label: "Not during past month", value: 0 },
      { label: "Less than once a week", value: 1 },
      { label: "Once or twice a week", value: 2 },
      { label: "Three or more times a week", value: 3 }
    ];

    const calcScore = () =>
      Object.values(values).reduce((s, v) => s + (v ?? 0), 0);

    return (
      <div style={styles.modalOverlay}>
        <div style={{ ...styles.modal, maxHeight: "85vh" }}>

          <h3>Pittsburgh Sleep Quality Index (PSQI)</h3>

          {/* BODY */}
          <div style={{ flex: 1, overflowY: "auto", paddingRight: 8 }}>
            {[
              "Cannot get to sleep within 30 minutes",
              "Wake up in the middle of the night",
              "Have to get up to use the bathroom",
              "Cannot breathe comfortably",
              "Cough or snore loudly",
              "Feel too cold",
              "Feel too hot",
              "Have bad dreams",
              "Have pain"
            ].map((q, i) => (
              <Select
                key={i}
                label={q}
                value={values[i]}
                onChange={v => setValues(p => ({ ...p, [i]: v }))}
                options={freqOptions}
              />
            ))}
          </div>

          {/* FOOTER */}
          <div style={styles.modalFooter}>
            <div style={{ fontWeight: 700 }}>
              PSQI Score: {calcScore()}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button style={styles.secondaryBtn} onClick={onClose}>
                Cancel
              </button>
              <button
                style={styles.primaryBtn}
                onClick={() =>
                  onSave({ score: calcScore(), values })
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

      <Card title="Subjective">
        <RadioRow
          label="Is there any cognitive impairment?"
          value={hasCognitiveImpairment}
          onChange={setHasCognitiveImpairment}
          options={["YES", "NO"]}
        />
            <RadioRow
              label="State of consciousness is Alert"
              value={alert}
              onChange={setAlert}
              options={["YES", "NO"]}
            />

            {alert === "NO" && (
              <div>

                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 20
                  }}
                >
                  <button
                    style={styles.secondaryBtn}
                    onClick={() => setShowGcs(true)}
                  >
                    Glasgow Coma Scale (GCS) Chart
                  </button>

                  {gcsValues.eye && <div>Eye Score: {gcsValues.eye}</div>}
                  {gcsValues.verbal && <div>Verbal Score: {gcsValues.verbal}</div>}
                  {gcsValues.motor && <div>Motor Score: {gcsValues.motor}</div>}
                </div>

                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 20
                  }}
                >
                  <button
                    style={styles.secondaryBtn}
                    onClick={() => setShowRancho(true)}
                  >
                    Ranchos Los Amigos Revised Scale (RLAR-S) Chart
                  </button>

                  {ranchoValue && (
                    <div >
                      RLAR-S Level: {ranchoValue}
                    </div>
                  )}


                </div>

                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 20
                  }}
                >

                  <button
                    style={styles.secondaryBtn}
                    onClick={() => setShowJfk(true)}
                  >
                    JFK Coma Recovery Scale (CRS-R)
                  </button>

                  {jfkTotal !== null && (
                    <div >
                      CRS-R Score: {jfkTotal}
                    </div>
                  )}




                </div>
              </div>
            )}

            <div>
              <h3 style={styles.cardTitle}>Orientation</h3>
              <RadioRow
                label="Orientation to person"
                value={orientation.person}
                onChange={v => setOrientation({ ...orientation, person: v })}
                options={["YES", "NO"]}
              />
              <RadioRow
                label="Orientation to place"
                value={orientation.place}
                onChange={v => setOrientation({ ...orientation, place: v })}
                options={["YES", "NO"]}
              />
              <RadioRow
                label="Orientation to time"
                value={orientation.time}
                onChange={v => setOrientation({ ...orientation, time: v })}
                options={["YES", "NO"]}
              />
            </div>
           
            <div>
              <h3 style={styles.cardTitle}>Memory</h3>
              <RadioRow
                label="Immediate memory"
                value={memory.immediate}
                onChange={v => setMemory({ ...memory, immediate: v })}
                options={["YES", "NO"]}
              />
              <RadioRow
                label="Recent memory"
                value={memory.recent}
                onChange={v => setMemory({ ...memory, recent: v })}
                options={["YES", "NO"]}
              />
              <RadioRow
                label="Remote memory"
                value={memory.remote}
                onChange={v => setMemory({ ...memory, remote: v })}
                options={["YES", "NO"]}
              />
            </div>
           
            <div>
              <h3 style={styles.cardTitle}>Attention</h3>
              <SelectRow
                label="Status of attention"
                value={attention}
                onChange={setAttention}
                options={["Able to focus", "Easily distracted"]}
              />
            </div>
          
            <div>
              <h3 style={styles.cardTitle}>Emotional</h3>
              <SelectRow
                label="Emotional / Mood functions"
                value={mood}
                onChange={setMood}
                options={["Good mood", "Euthymic", "Distress", "Stress"]}
              />
            </div>
          
            <div>
              <h3 style={styles.cardTitle}>Perceptual Skills</h3>
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
            </div>
      
            <div>
              <h3 style={styles.cardTitle}>Language & Communication</h3>

              <RadioRow
                label="Obey 3-step command"
                value={language.cmd3}
                onChange={v =>
                  setLanguage({
                    ...language,
                    cmd3: v,
                    cmd3How: "",
                    cmd2: "",
                    cmd2How: "",
                    cmd1: "",
                    cmd1How: ""
                  })
                }
                options={["YES", "NO"]}
              />

              {language.cmd3 === "YES" && (
                <SelectRow
                  label="How did the patient obey the 3-step command?"
                  value={language.cmd3How}
                  onChange={v =>
                    setLanguage({ ...language, cmd3How: v })
                  }
                  options={COMMAND_HOW_OPTIONS}
                />
              )}

              {language.cmd3 === "NO" && (
                <RadioRow
                  label="Obey 2-step command"
                  value={language.cmd2}
                  onChange={v =>
                    setLanguage({
                      ...language,
                      cmd2: v,
                      cmd2How: "",
                      cmd1: "",
                      cmd1How: ""
                    })
                  }
                  options={["YES", "NO"]}
                />
              )}

              {language.cmd3 === "NO" && language.cmd2 === "YES" && (
                <SelectRow
                  label="How did the patient obey the 2-step command?"
                  value={language.cmd2How}
                  onChange={v =>
                    setLanguage({ ...language, cmd2How: v })
                  }
                  options={COMMAND_HOW_OPTIONS}
                />
              )}

              {language.cmd3 === "NO" && language.cmd2 === "NO" && (
                <RadioRow
                  label="Obey 1-step command"
                  value={language.cmd1}
                  onChange={v =>
                    setLanguage({
                      ...language,
                      cmd1: v,
                      cmd1How: ""
                    })
                  }
                  options={["YES", "NO"]}
                />
              )}

              {language.cmd3 === "NO" &&
                language.cmd2 === "NO" &&
                language.cmd1 === "YES" && (
                  <SelectRow
                    label="How did the patient obey the 1-step command?"
                    value={language.cmd1How}
                    onChange={v =>
                      setLanguage({ ...language, cmd1How: v })
                    }
                    options={COMMAND_HOW_OPTIONS}
                  />
                )}

              <RadioRow
                label="Consistency"
                value={language.consistency}
                onChange={v =>
                  setLanguage({ ...language, consistency: v })
                }
                options={["YES", "NO"]}
              />
            </div>

          
            <div>
              <h3 style={styles.cardTitle}>Sleep</h3>
              <RadioRow
                label="Able to fall asleep ?"
                value={sleepFall}
                onChange={setSleepFall}
                options={["YES", "NO"]}
              />

              <RadioRow
                label="Quality of sleep?"
                value={sleepQuality}
                onChange={setSleepQuality}
                options={["Good", "Poor"]}
              />

              {(sleepFall === "NO" || sleepQuality === "Poor") && (
                <div>

                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 20
                    }}
                  >
                    <button
                      style={styles.secondaryBtn}
                      onClick={() => setShowIsi(true)}
                    >
                      Insomnia Severity Index (ISI) Chart
                    </button>

                    {isiTotal !== null && (
                      <div >
                        ISI Score: {isiTotal}
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 20
                    }}
                  >
                    <button
                      style={styles.secondaryBtn}
                      onClick={() => setShowEss(true)}
                    >
                      Epworth Sleepiness Scale (ESS) Chart
                    </button>

                    {essTotal !== null && (
                      <div>
                        ESS Score: {essTotal}
                      </div>
                    )}


                  </div>

                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 20
                    }}
                  >
                    <button
                      style={styles.secondaryBtn}
                      onClick={() => setShowPsqi(true)}
                    >
                      Pittsburgh Sleep Quality Index (PSQI) Chart
                    </button>

                    {psqiScore !== null && (
                      <div>
                        PSQI Score: {psqiScore}
                      </div>
                    )}


                  </div>
                </div>


              )}
            </div>
           
            <div>
              <h3 style={styles.cardTitle}>Activity and Participation</h3>

              <RadioRow
                label="Focusing attention on person"
                value={activityParticipation.attentionPerson}
                onChange={v =>
                  setActivityParticipation({
                    ...activityParticipation,
                    attentionPerson: v
                  })
                }
                options={["YES", "NO"]}
              />

              <RadioRow
                label=" Focusing attention on environment"
                value={activityParticipation.attentionEnvironment}
                onChange={v =>
                  setActivityParticipation({
                    ...activityParticipation,
                    attentionEnvironment: v
                  })
                }
                options={["YES", "NO"]}
              />



              <RadioRow
                label="Simple problem solving"
                value={activityParticipation.simpleProblemSolving}
                onChange={v =>
                  setActivityParticipation({
                    ...activityParticipation,
                    simpleProblemSolving: v
                  })
                }
                options={["YES", "NO"]}
              />

              <RadioRow
                label=" Complex problem solving"
                value={activityParticipation.complexProblemSolving}
                onChange={v =>
                  setActivityParticipation({
                    ...activityParticipation,
                    complexProblemSolving: v
                  })
                }
                options={["YES", "NO"]}
              />

              <RadioRow
                label=" Making decision"
                value={activityParticipation.decisionMaking}
                onChange={v =>
                  setActivityParticipation({
                    ...activityParticipation,
                    decisionMaking: v
                  })
                }
                options={["YES", "NO"]}
              />
            </div>

            {showGcs && <GcsModal />}
            {showIsi && <IsiModal />}
            {showRancho && (
              <RanchoModal
                value={ranchoValue}
                onClose={() => setShowRancho(false)}
                onSave={setRanchoValue}
              />
            )}

            {showJfk && (
              <JfkModal
                onClose={() => setShowJfk(false)}
                onSave={(data) => {
                  console.log("CRS-R Score:", data);
                }}
              />
            )}
            {showEss && (
              <EssModal
                onClose={() => setShowEss(false)}
                onSave={({ total, answers }) => {
                  setEssTotal(total);
                  setEssValues(answers);
                  setShowEss(false);
                }}
              />
            )}

            {showPsqi && (
              <PsqiModal
                onClose={() => setShowPsqi(false)}
                onSave={({ score, values }) => {
                  setPsqiScore(score);
                  setPsqiData(values);
                  setShowPsqi(false);
                }}
                initialValues={psqiData}
              />
            )}

      </Card>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
        <button style={styles.submitBtn}>Save</button>
      </div>
    </div>
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

