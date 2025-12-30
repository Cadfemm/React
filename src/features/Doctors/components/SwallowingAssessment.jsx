// SwallowingAssessment.jsx
import React, { useState, useEffect } from "react";

export default function SwallowingAssessment({ onChange }) {
  // -------------------- Swallowing States --------------------
  const [hasDifficulty, setHasDifficulty] = useState("");
  const [onset, setOnset] = useState("");
  const [foodDifficulty, setFoodDifficulty] = useState("");
 
  const [dietModification, setDietModification] = useState("");
  const [symptoms, setSymptoms] = useState("");

  // -------------------- Speech & Language States --------------------
  const [speechItems, setSpeechItems] = useState({
    // 1) Impairment of body functions
    clear: "no",
    hoarseness: "no",
    aphonia: "no",
    dysarthria: "no",
    repetition: "no",
    fluency: "no",
    comprehension: "no",
    naming: "no",
    alternativeVoice: "no",

    // 2) Activities & Participation
    receiving: "no",
    speaking: "no",
    sound: "no",
    simpleMsg: "no",
    complexMsg: "no",

    // 3) Environmental factors
    assistiveDevice: "no",
    envText: "",
  });

  // -------------------- Parent Notify --------------------
  useEffect(() => {
    if (!onChange) return;
    onChange({
      hasDifficulty,
      onset,
      foodDifficulty,
      dietModification,
      symptoms,
      speechItems,
    });
  }, [
    hasDifficulty,
    onset,
    foodDifficulty,
    dietModification,
    symptoms,
    speechItems,
    onChange,
  ]);

  // -------------------- Internal CSS --------------------
  const styles = {
    card: {
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: 6,
      padding: "14px 16px",
      fontFamily: "Inter, sans-serif",
      marginBottom: 18,
    },
    header: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 6,
      color: "#222",
    },
    row: {
      display: "flex",
      gap: 12,
      marginBottom: 10,
      alignItems: "center",
    },
    label: {
      width: 250,
      fontSize: 14,
      fontWeight: 600,
      color: "#333",
    },
    select: {
      flex: 1,
      padding: "6px 8px",
      borderRadius: 4,
      border: "1px solid #ccc",
      fontSize: 14,
    },
    title: {
      fontSize: 16,
      fontWeight: 500,
      marginTop: 20,
      marginBottom:20,
    },
    radioRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "6px 0",
      fontSize: 14,
      alignItems: "center",
    },
    radios: {
      display: "flex",
      gap: 16,
    },
    textInput: {
      width: "100%",
      padding: "6px 8px",
      borderRadius: 4,
      border: "1px solid #ccc",
      fontSize: 14,
      marginTop: 6,
    },
  };

  const renderRadio = (key) => (
    <div style={styles.radios}>
      <label>
        <input
          type="radio"
          name={key}
          value="yes"
          checked={speechItems[key] === "yes"}
          onChange={() => setSpeechItems({ ...speechItems, [key]: "yes" })}
        />{" "}
        YES
      </label>
      <label>
        <input
          type="radio"
          name={key}
          value="no"
          checked={speechItems[key] === "no"}
          onChange={() => setSpeechItems({ ...speechItems, [key]: "no" })}
        />{" "}
        NO
      </label>
    </div>
  );

  // -------------------- Component --------------------
  return (
    <div style={styles.card}>
      <h3>SWALLOWING</h3>

      {/* QUESTION 1 */}
      <div style={styles.row}>
        <div style={styles.label}>
          Question 1: Is there any swallowing difficulty?
        </div>
        <select
          style={styles.select}
          value={hasDifficulty}
          onChange={(e) => setHasDifficulty(e.target.value)}
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* SWALLOWING FOLLOW-UP QUESTIONS */}
      {hasDifficulty === "yes" && (
        <>
          <div style={styles.title}>Swallowing Assessment</div>

          <div style={styles.row}>
            <div style={styles.label}>Onset & Progression</div>
            <select
              style={styles.select}
              value={onset}
              onChange={(e) => setOnset(e.target.value)}
            >
              <option value="">Select</option>
              <option value="sudden">Sudden onset</option>
              <option value="gradual">Gradual onset</option>
            </select>
          </div>

          <div style={styles.row}>
            <div style={styles.label}>Food / Liquid Difficulties</div>
            <select
              style={styles.select}
              value={foodDifficulty}
              onChange={(e) => setFoodDifficulty(e.target.value)}
            >
              <option value="">Select</option>
              <option value="thin">Thin liquids</option>
              <option value="thick">Thick liquids</option>
              <option value="solids">Solids</option>
              <option value="all">All textures</option>
            </select>
          </div>

          <div style={styles.row}>
            <div style={styles.label}>Dietary Modifications</div>
            <select
              style={styles.select}
              value={dietModification}
              onChange={(e) => setDietModification(e.target.value)}
            >
              <option value="">Select</option>
              <option value="normal">Normal diet</option>
              <option value="soft">Soft/minced diet</option>
              <option value="pureed">Pureed diet</option>
              <option value="thickened">Thickened liquids</option>
              <option value="assisted">Assisted feeding</option>
              <option value="enteral">Enteral feeding (NGT/PEG)</option>
            </select>
          </div>

          <div style={styles.row}>
            <div style={styles.label}>Symptoms During Meals</div>
            <select
              style={styles.select}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            >
              <option value="">Select</option>
              <option value="none">No symptoms</option>
              <option value="cough">Mild coughing / throat clearing</option>
              <option value="drooling">Drooling / food spillage</option>
              <option value="wet_voice">Wet or gurgly voice</option>
              <option value="nasal">Nasal regurgitation</option>
              <option value="fatigue">Fatigue / prolonged mealtime</option>
              <option value="choking">Choking / aspiration</option>
              <option value="avoidance">Avoidance of eating</option>
            </select>
          </div>
        </>
      )}

      {/* -------------------- SPEECH & LANGUAGE SECTION -------------------- */}
      <h2 style={styles.title}>SPEECH & LANGUAGE</h2>

      {/* 1) Impairment of body functions */}
      <div style={styles.title}>1) Impairment of Body Functions</div>

      {[
        ["Clear Voice", "clear"],
        ["Hoarseness", "hoarseness"],
        ["Aphonia", "aphonia"],
        ["Dysarthria", "dysarthria"],
        ["Repetition Problem", "repetition"],
        ["Fluency of Speech", "fluency"],
        ["Language comprehension", "comprehension"],
        ["Naming through speech", "naming"],
        ["Alternative voice/speech function", "alternativeVoice"],
      ].map(([label, key]) => (
        <div key={key} style={styles.radioRow}>
          <div>{label}</div>
          {renderRadio(key)}
        </div>
      ))}

      {/* 2) Activities & Participation */}
      <div style={styles.title}>2) Activities & Participation</div>

      {[
        ["Communicating - Receiving", "receiving"],
        ["Speaking", "speaking"],
        ["Producing meaningful sound", "sound"],
        ["Producing simple message", "simpleMsg"],
        ["Producing complex message", "complexMsg"],
      ].map(([label, key]) => (
        <div key={key} style={styles.radioRow}>
          <div>{label}</div>
          {renderRadio(key)}
        </div>
      ))}

      {/* 3) Environmental Factors */}
      <div style={styles.title}>3) Environmental Factors</div>

      <div style={styles.radioRow}>
        <div>Assistive devices / technology</div>
        {renderRadio("assistiveDevice")}
      </div>

      <textarea
        style={styles.textInput}
        placeholder="Free text notes"
        value={speechItems.envText}
        onChange={(e) =>
          setSpeechItems({ ...speechItems, envText: e.target.value })
        }
      />

      <div style={{ marginTop: 10, fontSize: 12, fontWeight: 600 }}>
        If there's difficulty, REFER TO DIETITIAN AND SPEECH
      </div>
    </div>
  );
}
