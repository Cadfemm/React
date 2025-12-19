import React, { useState, useMemo } from "react";

/* ---------------- DATA ---------------- */

const dermatomes = [
  "C2","C3","C4","C5","C6","C7","C8",
  "T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12",
  "L1","L2","L3","L4","L5",
  "S1","S2","S3","S4-5",
];

const keyMuscles = [
  { level: "C5", muscle: "Elbow flexors" },
  { level: "C6", muscle: "Wrist extensors" },
  { level: "C7", muscle: "Elbow extensors" },
  { level: "C8", muscle: "Finger flexors" },
  { level: "T1", muscle: "Finger abductors" },
  { level: "L2", muscle: "Hip flexors" },
  { level: "L3", muscle: "Knee extensors" },
  { level: "L4", muscle: "Ankle dorsiflexors" },
  { level: "L5", muscle: "Long toe extensors" },
  { level: "S1", muscle: "Ankle plantar flexors" },
];

/* ---------------- COMPONENT ---------------- */

export default function SpinalcordInjury() {

  /* ---------- STATE ---------- */

  const [patientInfo, setPatientInfo] = useState({
    name: "",
    id: "",
    date: "",
    examiner: "",
  });

  const [sensory, setSensory] = useState(
    dermatomes.map(lvl => ({
      level: lvl,
      rightLT: "",
      rightPP: "",
      leftLT: "",
      leftPP: "",
    }))
  );

  const [motor, setMotor] = useState(
    keyMuscles.map(m => ({ ...m, right: "", left: "" }))
  );

  /* ---------- HELPERS ---------- */

  const handleSensoryChange = (i, field, val) => {
    setSensory(prev => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [field]: val };
      return copy;
    });
  };

  const parseScore = v => Number.isFinite(+v) ? +v : 0;

  const sensoryTotals = useMemo(() => {
    let rLT=0,lLT=0,rPP=0,lPP=0;
    sensory.forEach(s => {
      rLT+=parseScore(s.rightLT);
      lLT+=parseScore(s.leftLT);
      rPP+=parseScore(s.rightPP);
      lPP+=parseScore(s.leftPP);
    });
    return { rLT,lLT,rPP,lPP };
  }, [sensory]);

  /* ---------- STYLES ---------- */

  const styles = {
    container: { maxWidth: 1200, margin: "0 auto", padding: 20, fontFamily: "Arial" },
    section: { border: "1px solid #ddd", borderRadius: 8, padding: 16, marginBottom: 20 },
    title: { fontSize: 18, fontWeight: 700, marginBottom: 10 },
    label: { fontSize: 12, fontWeight: 600 },
    input: { width: "100%", padding: 6, fontSize: 12 },
    table: { width: "100%", borderCollapse: "collapse", fontSize: 12 },
    th: { border: "1px solid #ccc", padding: 6, background: "#2f7f88", color: "#fff" },
    td: { border: "1px solid #ddd", padding: 4, textAlign: "center" },
    tdLabel: { border: "1px solid #ddd", padding: 4, fontWeight: 600 },
    tiny: { width: 36, textAlign: "center" },
  };

  /* ---------- RENDER ---------- */

  return (
    <div style={styles.container}>

      <h2 style={{ textAlign: "center" }}>ASIA / ISNCSCI Assessment</h2>

      {/* PATIENT INFO */}
      <div style={styles.section}>
        <div style={styles.title}>Patient Information</div>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={styles.label}>Patient Name</div>
            <input style={styles.input} value={patientInfo.name}
              onChange={e=>setPatientInfo({...patientInfo,name:e.target.value})}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={styles.label}>Patient ID</div>
            <input style={styles.input} value={patientInfo.id}
              onChange={e=>setPatientInfo({...patientInfo,id:e.target.value})}/>
          </div>
        </div>
      </div>

      {/* -------- SENSORY EXAM WITH IMAGE -------- */}
      <div style={styles.section}>
        <div style={styles.title}>Sensory Examination (LT / PP)</div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr style={{ verticalAlign: "top" }}>

              {/* LEFT TABLE */}
              <td style={{ padding: 0 }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Lvl</th>
                      <th style={styles.th}>LT</th>
                      <th style={styles.th}>PP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensory.map((s,i)=>(
                      <tr key={s.level}>
                        <td style={styles.tdLabel}>{s.level}</td>
                        <td style={styles.td}>
                          <input style={styles.tiny} value={s.rightLT}
                            onChange={e=>handleSensoryChange(i,"rightLT",e.target.value)}/>
                        </td>
                        <td style={styles.td}>
                          <input style={styles.tiny} value={s.rightPP}
                            onChange={e=>handleSensoryChange(i,"rightPP",e.target.value)}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>

              {/* CENTER IMAGE – HEIGHT LOCKED */}
              <td style={{ width: 420, padding: 0 }}>
                <div style={{
                  height: "1000px",
                  display: "flex",
                  alignItems: "stretch",
                  justifyContent: "center",
                }}>
                  <img
                    src="/asia-body.png"
                    alt="Dermatome Map"
                    style={{
                      height: "1000px",
                      width: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              </td>

              {/* RIGHT TABLE */}
              <td style={{ padding: 0 }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>LT</th>
                      <th style={styles.th}>PP</th>
                      <th style={styles.th}>Lvl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensory.map((s,i)=>(
                      <tr key={s.level}>
                        <td style={styles.td}>
                          <input style={styles.tiny} value={s.leftLT}
                            onChange={e=>handleSensoryChange(i,"leftLT",e.target.value)}/>
                        </td>
                        <td style={styles.td}>
                          <input style={styles.tiny} value={s.leftPP}
                            onChange={e=>handleSensoryChange(i,"leftPP",e.target.value)}/>
                        </td>
                        <td style={styles.tdLabel}>{s.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>

            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: 8, fontWeight: 600 }}>
          Right LT: {sensoryTotals.rLT} · Left LT: {sensoryTotals.lLT} ·
          Right PP: {sensoryTotals.rPP} · Left PP: {sensoryTotals.lPP}
        </div>
      </div>

      {/* MOTOR EXAM */}
      <div style={styles.section}>
        <div style={styles.title}>Motor Examination</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Level</th>
              <th style={styles.th}>Key Muscle</th>
              <th style={styles.th}>Right</th>
              <th style={styles.th}>Left</th>
            </tr>
          </thead>
          <tbody>
            {motor.map((m,i)=>(
              <tr key={m.level}>
                <td style={styles.tdLabel}>{m.level}</td>
                <td style={styles.tdLabel}>{m.muscle}</td>
                <td style={styles.td}><input style={styles.tiny} /></td>
                <td style={styles.td}><input style={styles.tiny} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
