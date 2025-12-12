import React, { useState } from "react";

export default function BowelAssessment() {
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
      marginBottom: 10,
      color: "#222",
    },
    row: {
      marginBottom: 14,
    },
    label: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 6,
      color: "#333",
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
    },
    radioGroup: {
      display: "flex",
      gap: 20,
      marginTop: 6,
    },
    radio: {
      fontSize: 14,
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    smallNote: {
      fontSize: 12,
      marginTop: 4,
      color: "#666",
    },
  };

  const [data, setData] = useState({
    frequency: "",
    frequencyOther: "",
    sensate: "",
    control: "",
    stoolType: "",
    meds: "",
    medsNotes: "",
    manualEvac: "",
    digitalStim: "",
  });

  const update = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const bristolTypes = [
    { value: "1", label: "Type 1 – Separate hard lumps (Severe constipation)" },
    { value: "2", label: "Type 2 – Lumpy / sausage-like (Mild constipation)" },
    { value: "3", label: "Type 3 – Normal (Cracks on surface)" },
    { value: "4", label: "Type 4 – Normal (Smooth soft sausage)" },
    { value: "5", label: "Type 5 – Soft blobs (Lacking fibre)" },
    { value: "6", label: "Type 6 – Mushy (Mild diarrhea)" },
    { value: "7", label: "Type 7 – Liquid (Severe diarrhea)" },
  ];

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Bowl Assessment</h2>

      {/* Frequency */}
      <div style={styles.row}>
        <div style={styles.label}>1. Frequency of defecation</div>
        <select
          style={styles.select}
          value={data.frequency}
          onChange={(e) => update("frequency", e.target.value)}
        >
          <option value="">Select</option>
          <option value="once_day">Once per day</option>
          <option value="twice_day">Twice per day</option>
          <option value="once_2days">Once every 2 days</option>
          <option value="few_days">Once every few days</option>
          <option value="other">Others</option>
        </select>

        {data.frequency === "other" && (
          <input
            style={{ ...styles.input, marginTop: 6 }}
            placeholder="Please specify"
            value={data.frequencyOther}
            onChange={(e) => update("frequencyOther", e.target.value)}
          />
        )}
      </div>

      {/* Sensation */}
      <div style={styles.row}>
        <div style={styles.label}>2. Able to sensate</div>
        <div style={styles.radioGroup}>
          {["Yes", "No", "Unsure"].map((opt) => (
            <label key={opt} style={styles.radio}>
              <input
                type="radio"
                name="sensate"
                value={opt}
                checked={data.sensate === opt}
                onChange={() => update("sensate", opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Control */}
      <div style={styles.row}>
        <div style={styles.label}>3. Able to hold / control</div>
        <div style={styles.radioGroup}>
          {["Yes", "No", "Unsure"].map((opt) => (
            <label key={opt} style={styles.radio}>
              <input
                type="radio"
                name="control"
                value={opt}
                checked={data.control === opt}
                onChange={() => update("control", opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Stool Consistency */}
      <div style={styles.row}>
        <div style={styles.label}>4. Stool consistency (Bristol Chart)</div>

        <select
          style={styles.select}
          value={data.stoolType}
          onChange={(e) => update("stoolType", e.target.value)}
        >
          <option value="">Select Type</option>
          {bristolTypes.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>

        <div style={styles.smallNote}>Refer to Bristol Stool Chart image.</div>
      </div>

      {/* Medication Use */}
      <div style={styles.row}>
        <div style={styles.label}>
          5. Medication use for defecation
        </div>
        <div style={styles.radioGroup}>
          {["Yes", "No"].map((opt) => (
            <label key={opt} style={styles.radio}>
              <input
                type="radio"
                name="meds"
                value={opt}
                checked={data.meds === opt}
                onChange={() => update("meds", opt)}
              />
              {opt}
            </label>
          ))}
        </div>

        {data.meds === "Yes" && (
          <input
            style={{ ...styles.input, marginTop: 6 }}
            placeholder="Please state the medication"
            value={data.medsNotes}
            onChange={(e) => update("medsNotes", e.target.value)}
          />
        )}
      </div>

      {/* Manual Evacuation */}
      <div style={styles.row}>
        <div style={styles.label}>6. Manual evacuation?</div>
        <div style={styles.radioGroup}>
          {["Yes", "No"].map((opt) => (
            <label key={opt} style={styles.radio}>
              <input
                type="radio"
                name="manualEvac"
                value={opt}
                checked={data.manualEvac === opt}
                onChange={() => update("manualEvac", opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* Digital Rectal Stimulation */}
      <div style={styles.row}>
        <div style={styles.label}>7. Digital rectal stimulation?</div>
        <div style={styles.radioGroup}>
          {["Yes", "No"].map((opt) => (
            <label key={opt} style={styles.radio}>
              <input
                type="radio"
                name="digitalStim"
                value={opt}
                checked={data.digitalStim === opt}
                onChange={() => update("digitalStim", opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
