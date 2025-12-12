import React, { useState } from "react";

export default function SpasmSpasticity() {
  const [hasSpasm, setHasSpasm] = useState("");
  const [psfs, setPsfs] = useState(null);
  const [mas, setMas] = useState(null);
  const [tardieu, setTardieu] = useState({ r1: "", r2: "" });

  /* ---------- INTERNAL CSS ---------- */
  const styles = {
    container: { padding: 20, fontFamily: "Arial, sans-serif",   margin: "0 auto" },
    card: {
      background: "#fff",
      padding: 16,
      borderRadius: 8,
      border: "1px solid #ccc",
      marginBottom: 20,
    },
    label: { fontWeight: 600, marginBottom: 6, display: "block" },
    select: {
      width: "100%",
      padding: 8,
      borderRadius: 6,
      border: "1px solid #ccc",
      marginBottom: 12,
    },
    item: {
      padding: 10,
      border: "1px solid #ddd",
      borderRadius: 6,
      marginBottom: 8,
      cursor: "pointer",
    },
    selectedItem: {
      background: "#e8f1ff",
      border: "2px solid #007bff",
    },
    sectionTitle: { fontSize: 18, fontWeight: 700, marginBottom: 10 },
    row: { display: "flex", gap: 10 },
    half: { flex: 1 },
  };

  /* ---------- OPTIONS ---------- */

  const psfsOptions = [
    { score: 0, text: "No spasms" },
    { score: 1, text: "Mild spasms induced by stimulation" },
    { score: 2, text: "Infrequent spasms < once per hour" },
    { score: 3, text: "Spasms > once per hour" },
    { score: 4, text: "Spasms > 10 times per hour" },
  ];

  const masOptions = [
    { score: "0", text: "0 – No increase in tone" },
    { score: "1", text: "1 – Slight increase in tone; catch/release at end ROM" },
    { score: "1+", text: "1+ – Slight increase in tone; catch/release through 1/2 ROM" },
    { score: "2", text: "2 – Marked increase in tone through ROM; part moved easily" },
    { score: "3", text: "3 – Considerable increase in tone; passive movement difficult" },
    { score: "4", text: "4 – Part rigid in flexion/extension" },
  ];

  return (
    <div style={styles.container}>
      <h2>Spasm & Spasticity Assessment</h2>

      {/* QUESTION */}
      <div style={styles.card}>
        <label style={styles.label}>Is there any spasm/spasticity?</label>
        <select
          style={styles.select}
          value={hasSpasm}
          onChange={(e) => setHasSpasm(e.target.value)}
        >
          <option value="">Select</option>
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
      </div>

      {/* SHOW SCALES ONLY IF YES */}
      {hasSpasm === "YES" && (
        <>
          {/* ---------- PSFS ---------- */}
          <div style={styles.card}>
            <div style={styles.sectionTitle}>Penn Spasm Frequency Scale (PSFS)</div>

            {psfsOptions.map((item) => (
              <div
                key={item.score}
                style={{
                  ...styles.item,
                  ...(psfs === item.score ? styles.selectedItem : {}),
                }}
                onClick={() => setPsfs(item.score)}
              >
                <b>{item.score}</b> – {item.text}
              </div>
            ))}

            {psfs !== null && (
              <p>
                <b>Selected:</b> {psfs} – {psfsOptions.find((x) => x.score === psfs)?.text}
              </p>
            )}
          </div>

          {/* ---------- MODIFIED ASHWORTH SCALE ---------- */}
          <div style={styles.card}>
            <div style={styles.sectionTitle}>Modified Ashworth Scale (MAS)</div>

            {masOptions.map((item) => (
              <div
                key={item.score}
                style={{
                  ...styles.item,
                  ...(mas === item.score ? styles.selectedItem : {}),
                }}
                onClick={() => setMas(item.score)}
              >
                {item.text}
              </div>
            ))}

            {mas && (
              <p>
                <b>Selected:</b> {masOptions.find((x) => x.score === mas)?.text}
              </p>
            )}
          </div>

          {/* ---------- MODIFIED TARDIEU SCALE ---------- */}
          <div style={styles.card}>
            <div style={styles.sectionTitle}>Modified Tardieu Scale</div>

            <label style={styles.label}>R1 – Angle of muscle reaction</label>
            <input
              type="number"
              placeholder="Enter R1 angle"
              style={styles.select}
              value={tardieu.r1}
              onChange={(e) => setTardieu({ ...tardieu, r1: e.target.value })}
            />

            <label style={styles.label}>R2 – Passive ROM</label>
            <input
              type="number"
              placeholder="Enter R2 angle"
              style={styles.select}
              value={tardieu.r2}
              onChange={(e) => setTardieu({ ...tardieu, r2: e.target.value })}
            />

            {tardieu.r1 && tardieu.r2 && (
              <p>
                <b>Dynamic Tone (R2 − R1):</b> {Number(tardieu.r2) - Number(tardieu.r1)}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
