import React, { useState } from "react";

export default function CognitiveAssessmentForm() {
  /* --------------------------
     STATE FOR ALL FIELDS
  --------------------------- */
  const [impairment, setImpairment] = useState("");
  const [stateOfConsciousness, setStateOfConsciousness] = useState("");

  const [alert, setAlert] = useState("");
  const [lessResponsive, setLessResponsive] = useState("");

  const [gcsScore, setGcsScore] = useState(null);
  const [showGcsModal, setShowGcsModal] = useState(false);

  const [ranchoResult, setRanchoResult] = useState(null);
  const [showRanchoModal, setShowRanchoModal] = useState(false);

  const [jfkResult, setJfkResult] = useState(null);
  const [showJfkModal, setShowJfkModal] = useState(false);

  const [orientation, setOrientation] = useState({
    time: "",
    place: "",
    person: "",
  });

  const [memory, setMemory] = useState("");
  const [attention, setAttention] = useState("");
  const [emotion, setEmotion] = useState("");
  const [neglect, setNeglect] = useState("");
  const [apraxia, setApraxia] = useState("");

  const [language, setLanguage] = useState({
    cmd3: "",
    cmd2: "",
    cmd1: "",
    consistency: "",
  });

  const [sleep, setSleep] = useState({
    quality: "",
    function: "",
  });

  const [participation, setParticipation] = useState({
    attPerson: "",
    attEnvironment: "",
    simpleProblem: "",
    complexProblem: "",
    decision: "",
  });

  /* --------------------------
     INTERNAL CSS
  --------------------------- */
  const styles = {
    container: {
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      background: "#fff",
      padding: 16,
      borderRadius: 8,
      border: "1px solid #ddd",
      marginBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 10,
    },
    label: {
      fontWeight: 600,
      marginBottom: 6,
      display: "block",
    },
    select: {
      width: "100%",
      padding: 8,
      borderRadius: 6,
      border: "1px solid #ccc",
      marginBottom: 12,
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
      padding: 20,
    },
    modal: {
      background: "#fff",
      padding: 20,
      borderRadius: 8,
      width: "100%",
      maxWidth: 500,
      maxHeight: "90vh",
      overflowY: "auto",
    },
    closeBtn: {
      marginTop: 10,
      padding: "8px 14px",
      background: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 14,
    },
  };

  /* ------------------------------
      COMPONENT: MODALS 
  ------------------------------ */

  /* ---------- GCS MODAL ---------- */
  const GcsModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h3>Glasgow Coma Scale (GCS)</h3>

        <label style={styles.label}>Eye Response (1–4)</label>
        <select style={styles.select} id="gcs_eye">
          <option value="">Select</option>
          <option value="1">1 - No eye opening</option>
          <option value="2">2 - To pain</option>
          <option value="3">3 - To speech</option>
          <option value="4">4 - Spontaneous</option>
        </select>

        <label style={styles.label}>Motor Response (1–6)</label>
        <select style={styles.select} id="gcs_motor">
          <option value="">Select</option>
          <option value="1">1 - No movement</option>
          <option value="2">2 - Extension</option>
          <option value="3">3 - Flexion</option>
          <option value="4">4 - Withdrawal</option>
          <option value="5">5 - Localizes pain</option>
          <option value="6">6 - Obeys commands</option>
        </select>

        <label style={styles.label}>Verbal Response (1–5)</label>
        <select style={styles.select} id="gcs_verbal">
          <option value="">Select</option>
          <option value="1">1 - None</option>
          <option value="2">2 - Incomprehensible</option>
          <option value="3">3 - Inappropriate</option>
          <option value="4">4 - Confused</option>
          <option value="5">5 - Oriented</option>
        </select>

        <button
          style={styles.closeBtn}
          onClick={() => {
            const e = Number(document.getElementById("gcs_eye").value || 0);
            const m = Number(document.getElementById("gcs_motor").value || 0);
            const v = Number(document.getElementById("gcs_verbal").value || 0);
            setGcsScore(e + m + v);
            setShowGcsModal(false);
          }}
        >
          Save Score
        </button>
      </div>
    </div>
  );

  /* ---------- RANCHO MODAL ---------- */
  const RanchoModal = ({ onClose, onSave }) => {
    const [selected, setSelected] = useState(null);

    const ranchoLevels = [
      { level: 1, title: "Level I – No response", description: "No response." },
      { level: 2, title: "Level II – Generalized response", description: "Generalized reaction to stimuli." },
      { level: 3, title: "Level III – Localized response", description: "Localized response to stimuli." },
      { level: 4, title: "Level IV – Confused/agitated", description: "Agitated & confused behavior." },
      { level: 5, title: "Level V – Confused, inappropriate", description: "Random, non-purposeful responses." },
      { level: 6, title: "Level VI – Confused, appropriate", description: "Goal-directed with cues." },
      { level: 7, title: "Level VII – Automatic", description: "Appropriate, robot-like daily routine." },
      { level: 8, title: "Level VIII – Purposeful", description: "Independent in safe settings." },
    ];

    return (
      <div style={styles.modalOverlay}>
        <div style={{ ...styles.modal, maxWidth: 650 }}>
          <h3>Rancho Los Amigos Scale</h3>

          {ranchoLevels.map((lvl) => (
            <div
              key={lvl.level}
              onClick={() => setSelected(lvl)}
              style={{
                padding: 10,
                borderRadius: 6,
                marginBottom: 8,
                border: selected?.level === lvl.level ? "2px solid #007bff" : "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              <b>{lvl.title}</b>
              <div>{lvl.description}</div>
            </div>
          ))}

          <button
            style={styles.closeBtn}
            onClick={() => {
              if (selected) onSave(selected);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  /* ---------- JFK CRS-R MODAL ---------- */
  const JfkModal = ({ onClose, onSave }) => {
    const [scores, setScores] = useState({
      auditory: null,
      visual: null,
      motor: null,
      verbal: null,
      communication: null,
      arousal: null,
    });

    const handleSelect = (domain, value) =>
      setScores((p) => ({ ...p, [domain]: value }));

    const total = Object.values(scores).reduce((a, b) => a + (b || 0), 0);

    const section = (title, domain, arr) => (
      <>
        <h4 style={{ marginTop: 16 }}>{title}</h4>
        {arr.map((item) => (
          <div
            key={item.score}
            onClick={() => handleSelect(domain, item.score)}
            style={{
              padding: 8,
              borderRadius: 6,
              border: scores[domain] === item.score ? "2px solid #007bff" : "1px solid #ccc",
              marginBottom: 6,
              cursor: "pointer",
            }}
          >
            {item.score} – {item.label}
          </div>
        ))}
      </>
    );

    return (
      <div style={styles.modalOverlay}>
        <div style={{ ...styles.modal, maxWidth: 650 }}>
          <h3>JFK Coma Recovery Scale – CRS-R</h3>

          {section("AUDITORY", "auditory", [
            { score: 4, label: "Consistent Command Following" },
            { score: 3, label: "Reproducible Command Following" },
            { score: 2, label: "Localization to Sound" },
            { score: 1, label: "Auditory Startle" },
            { score: 0, label: "None" },
          ])}

          {section("VISUAL", "visual", [
            { score: 5, label: "Object Recognition" },
            { score: 4, label: "Reaching" },
            { score: 3, label: "Visual Pursuit" },
            { score: 2, label: "Fixation" },
            { score: 1, label: "Visual Startle" },
            { score: 0, label: "None" },
          ])}

          {section("MOTOR", "motor", [
            { score: 6, label: "Functional Object Use" },
            { score: 5, label: "Automatic Motor Response" },
            { score: 4, label: "Object Manipulation" },
            { score: 3, label: "Localization to Pain" },
            { score: 2, label: "Flexion Withdrawal" },
            { score: 1, label: "Abnormal Posturing" },
            { score: 0, label: "None" },
          ])}

          {section("VERBAL", "verbal", [
            { score: 3, label: "Intelligible Verbalization" },
            { score: 2, label: "Vocalization" },
            { score: 1, label: "Oral Reflexive" },
            { score: 0, label: "None" },
          ])}

          {section("COMMUNICATION", "communication", [
            { score: 2, label: "Functional Accurate" },
            { score: 1, label: "Intentional but Non-functional" },
            { score: 0, label: "None" },
          ])}

          {section("AROUSAL", "arousal", [
            { score: 3, label: "Attention" },
            { score: 2, label: "Eye Opening (No Stimulus)" },
            { score: 1, label: "Eye Opening (With Stimulus)" },
            { score: 0, label: "Unresponsive" },
          ])}

          <button
            style={styles.closeBtn}
            onClick={() => {
              onSave({ total, details: scores });
              onClose();
            }}
          >
            Save CRS-R Score
          </button>
        </div>
      </div>
    );
  };

  /* -------------------------
      MAIN RETURN
  -------------------------- */
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cognitive Assessment</h2>

      {/* Question: Cognitive impairment */}
      <div style={styles.card}>
        <label style={styles.label}>Is there any cognitive impairment?</label>
        <select
          style={styles.select}
          value={impairment}
          onChange={(e) => setImpairment(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* ------------------------------------
          SHOW EVERYTHING ONLY IF "YES"
      ------------------------------------ */}
      {impairment === "Yes" && (
        <>
          {/* HISTORY */}
          <div style={styles.card}>
            <h3 style={styles.title}>History</h3>

            <label style={styles.label}>b110: State of consciousness</label>
            <select
              style={styles.select}
              value={stateOfConsciousness}
              onChange={(e) => setStateOfConsciousness(e.target.value)}
            >
              <option value="">Select Option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>

            <label style={styles.label}>Alert</label>
            <select
              style={styles.select}
              value={alert}
              onChange={(e) => setAlert(e.target.value)}
            >
              <option value="">Select</option>
              <option>YES</option>
              <option>NO</option>
            </select>

            <label style={styles.label}>Less responsive</label>
            <select
              style={styles.select}
              value={lessResponsive}
              onChange={(e) => setLessResponsive(e.target.value)}
            >
              <option value="">Select</option>
              <option>YES</option>
              <option>NO</option>
            </select>

            {/* GCS */}
            <label style={styles.label}>GCS Score</label>
            <button style={styles.closeBtn} onClick={() => setShowGcsModal(true)}>
              Refer Chart
            </button>
            {gcsScore !== null && <p>Final Score: <b>{gcsScore}</b></p>}

            {/* RANCHO */}
            <label style={styles.label}>Rancho Los Amigos Scale</label>
            <button style={styles.closeBtn} onClick={() => setShowRanchoModal(true)}>
              Refer Chart
            </button>
            {ranchoResult && (
              <div style={{ marginTop: 10 }}>
                <b>{ranchoResult.title}</b>
                <p>{ranchoResult.description}</p>
              </div>
            )}

            {/* JFK CRS-R */}
            <label style={styles.label}>JFK CRS-R Score</label>
            <button style={styles.closeBtn} onClick={() => setShowJfkModal(true)}>
              Refer Chart
            </button>
            {jfkResult && (
              <div style={{ marginTop: 10 }}>
                <b>Total: {jfkResult.total} / 23</b>
              </div>
            )}
          </div>

          {/* ORIENTATION */}
          <div style={styles.card}>
            <h3 style={styles.title}>Orientation Functions</h3>

            <label style={styles.label}>Orientation to time</label>
            <select
              style={styles.select}
              value={orientation.time}
              onChange={(e) =>
                setOrientation({ ...orientation, time: e.target.value })
              }
            >
              <option value="">Select</option>
              <option>YES</option>
              <option>NO</option>
            </select>

            <label style={styles.label}>Orientation to place</label>
            <select
              style={styles.select}
              value={orientation.place}
              onChange={(e) =>
                setOrientation({ ...orientation, place: e.target.value })
              }
            >
              <option value="">Select</option>
              <option>YES</option>
              <option>NO</option>
            </select>

            <label style={styles.label}>Orientation to person</label>
            <select
              style={styles.select}
              value={orientation.person}
              onChange={(e) =>
                setOrientation({ ...orientation, person: e.target.value })
              }
            >
              <option value="">Select</option>
              <option>YES</option>
              <option>NO</option>
            </select>
          </div>
        </>
      )}

      {/* RENDER MODALS */}
      {showGcsModal && <GcsModal />}
      {showRanchoModal && (
        <RanchoModal onClose={() => setShowRanchoModal(false)} onSave={setRanchoResult} />
      )}
      {showJfkModal && (
        <JfkModal onClose={() => setShowJfkModal(false)} onSave={setJfkResult} />
      )}
    </div>
  );
}
