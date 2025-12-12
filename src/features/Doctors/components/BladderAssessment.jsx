import React, { useState } from "react";

export default function BladderAssessment() {
  const styles = {
    card: {
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: 8,
      padding: "18px 20px",
      marginBottom: 20,
      fontFamily: "Inter, sans-serif",
    },
    header: {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 12,
      color: "#222",
    },
    row: {
      marginBottom: 16,
    },
    label: {
      fontSize: 15,
      fontWeight: 600,
      marginBottom: 6,
      color: "#333",
    },
    radioGroup: {
      display: "flex",
      gap: 20,
      marginTop: 4,
    },
    radio: {
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    select: {
      width: "100%",
      padding: "8px 10px",
      borderRadius: 6,
      border: "1px solid #bbb",
      fontSize: 14,
      background: "#fff",
    },
    input: {
      width: "100%",
      padding: "8px 10px",
      borderRadius: 6,
      border: "1px solid #bbb",
      fontSize: 14,
      marginTop: 8,
    },
  };

  const [urinaryProblem, setUrinaryProblem] = useState("");

  const [data, setData] = useState({
    currentMethod: "",
    currentMethodOther: "",
    sensate: "",
    sensateNotes: "",
    control: "",
    controlNotes: "",
    hold: "",
    holdNotes: "",
    urgency: "",
    urgencyNotes: "",
    hesitancy: "",
    hesitancyNotes: "",
    history: "",
    historyNotes: "",
    imaging: "",
    imagingNotes: "",
    additional: "",
  });

  const update = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const catheterOptions = [
    "Spontaneous",
    "Continuous Bladder Drainage (CBD)",
    "Condom catheter",
    "Clean Intermittent Self-Catheterization (CISC)",
    "Clean Intermittent Catheterization (CIC)",
    "Supra Pubic Catheterization (SPC)",
    "Others",
  ];

  return (
    <div style={styles.card}>
      <div style={styles.header}>BLADDER ISSUE</div>

      {/* MAIN QUESTION */}
      <div style={styles.row}>
        <div style={styles.label}>Any urinary problem?</div>
        <div style={styles.radioGroup}>
          {["Yes", "No"].map((opt) => (
            <label key={opt} style={styles.radio}>
              <input
                type="radio"
                name="urinaryProblem"
                value={opt}
                checked={urinaryProblem === opt}
                onChange={() => setUrinaryProblem(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* If NO → Stop here */}
      {urinaryProblem === "Yes" && (
        <>
          {/* CURRENTLY ON */}
          <div style={styles.row}>
            <div style={styles.label}>Currently on:</div>

            <select
              style={styles.select}
              value={data.currentMethod}
              onChange={(e) => update("currentMethod", e.target.value)}
            >
              <option value="">Select</option>
              {catheterOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            {data.currentMethod === "Others" && (
              <input
                style={styles.input}
                placeholder="Please specify"
                value={data.currentMethodOther}
                onChange={(e) => update("currentMethodOther", e.target.value)}
              />
            )}
          </div>

          {/* Helper for YES/NO + text */}
          {[
            { key: "sensate", label: "1. Able to sensate?", notesKey: "sensateNotes" },
            { key: "control", label: "2. Able to control?", notesKey: "controlNotes" },
            { key: "hold", label: "3. Able to hold?", notesKey: "holdNotes" },
            { key: "urgency", label: "4. Any urgency?", notesKey: "urgencyNotes" },
            { key: "hesitancy", label: "5. Hesitancy?", notesKey: "hesitancyNotes" },
            { key: "history", label: "6. History of bladder stone/UTI/other problem?", notesKey: "historyNotes" },
            { key: "imaging", label: "7. Any imaging/procedure/surgery done? (UDS/SCC/USG)", notesKey: "imagingNotes" },
          ].map((item) => (
            <div key={item.key} style={styles.row}>
              <div style={styles.label}>{item.label}</div>

              <div style={styles.radioGroup}>
                {["Yes", "No"].map((opt) => (
                  <label key={opt} style={styles.radio}>
                    <input
                      type="radio"
                      name={item.key}
                      value={opt}
                      checked={data[item.key] === opt}
                      onChange={() => update(item.key, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>

              {data[item.key] === "Yes" && (
                <input
                  style={styles.input}
                  placeholder="Please specify"
                  value={data[item.notesKey]}
                  onChange={(e) => update(item.notesKey, e.target.value)}
                />
              )}
            </div>
          ))}

          {/* ADDITIONAL QUESTION */}
          <div style={styles.row}>
            <div style={styles.label}>8. Other additional question?</div>
            <input
              style={styles.input}
              placeholder="Write any additional notes"
              value={data.additional}
              onChange={(e) => update("additional", e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
}
