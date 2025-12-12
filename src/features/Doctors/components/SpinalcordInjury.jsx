import React, { useState, useMemo } from "react";

const dermatomes = [
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "C8",
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
  "T10",
  "T11",
  "T12",
  "L1",
  "L2",
  "L3",
  "L4",
  "L5",
  "S1",
  "S2",
  "S3",
  "S4-5",
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

export default function SpinalcordInjury() {
  /* -------------------------------
     STATE
  -------------------------------- */
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    id: "",
    date: "",
    examiner: "",
  });

  const [sensory, setSensory] = useState(
    dermatomes.map((d) => ({
      level: d,
      rightLT: "",
      leftLT: "",
      rightPP: "",
      leftPP: "",
    }))
  );

  const [motor, setMotor] = useState(
    keyMuscles.map((m) => ({
      ...m,
      right: "",
      left: "",
    }))
  );

  const [vac, setVac] = useState(""); // Voluntary anal contraction (Yes/No)
  const [dap, setDap] = useState(""); // Deep anal pressure (Yes/No)

  const [aisGrade, setAisGrade] = useState("");
  const [zpp, setZpp] = useState({
    motorRight: "",
    motorLeft: "",
    sensoryRight: "",
    sensoryLeft: "",
  });

  /* -------------------------------
     INTERNAL CSS
  -------------------------------- */
  const styles = {
    container: {
      padding: 20,
      fontFamily: "Arial, sans-serif",
      maxWidth: 1100,
      margin: "0 auto",
    },
    section: {
      background: "#ffffffff",
      border: "1px solid #dcdcdc",
      borderRadius: 8,
      padding: 16,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 10,
    },
    label: {
      fontWeight: 600,
      fontSize: 13,
      marginBottom: 4,
      display: "block",
    },
    input: {
      width: "100%",
      padding: 6,
      borderRadius: 4,
      border: "1px solid #ccc",
      fontSize: 13,
      boxSizing: "border-box",
      marginBottom: 8,
    },
    row: {
      display: "flex",
      gap: 12,
      marginBottom: 8,
    },
    col: {
      flex: 1,
    },
    smallText: {
      fontSize: 11,
      color: "#777",
    },
    tableWrap: {
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 12,
    },
    th: {
      border: "1px solid #ddd",
      padding: 6,
      background: "#368792ff",
      fontWeight: 700,
      textAlign: "center",
      whiteSpace: "nowrap",
    },
    td: {
      border: "1px solid #ddd",
      padding: 4,
      textAlign: "center",
    },
    tdLabel: {
      border: "1px solid #ddd",
      padding: 4,
      textAlign: "left",
      whiteSpace: "nowrap",
      fontWeight: 600,
    },
    tinyInput: {
      width: "40px",
      padding: 3,
      borderRadius: 4,
      border: "1px solid #ccc",
      fontSize: 11,
      textAlign: "center",
    },
    badge: {
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 999,
      background: "#eef4ff",
      border: "1px solid #c3d1ff",
      fontSize: 11,
      fontWeight: 600,
      marginLeft: 8,
    },
    totalsRow: {
      marginTop: 10,
      fontSize: 13,
      fontWeight: 600,
    },
  };

  /* -------------------------------
     HELPERS
  -------------------------------- */

  const handleSensoryChange = (index, field, value) => {
    setSensory((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleMotorChange = (index, side, value) => {
    setMotor((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [side]: value };
      return copy;
    });
  };

  const parseScore = (val) => {
    const n = Number(val);
    return Number.isFinite(n) ? n : 0;
  };

  const sensoryTotals = useMemo(() => {
    let rightLT = 0,
      leftLT = 0,
      rightPP = 0,
      leftPP = 0;
    sensory.forEach((s) => {
      rightLT += parseScore(s.rightLT);
      leftLT += parseScore(s.leftLT);
      rightPP += parseScore(s.rightPP);
      leftPP += parseScore(s.leftPP);
    });
    return { rightLT, leftLT, rightPP, leftPP };
  }, [sensory]);

  const motorTotals = useMemo(() => {
    let right = 0,
      left = 0;
    motor.forEach((m) => {
      right += parseScore(m.right);
      left += parseScore(m.left);
    });
    return { right, left };
  }, [motor]);

  /* -------------------------------
     RENDER
  -------------------------------- */
  return (
    <div style={styles.container}>
      <h2>ASIA / ISNCSCI Assessment</h2>
      <p style={styles.smallText}>
        Clean digital version of the ASIA/ISNCSCI worksheet. Use 0–2 for sensory
        (LT & PP) and 0–5 for motor key muscles, as per standard guidelines.
      </p>

      {/* PATIENT INFO */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Patient Information</div>
        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Patient Name</label>
            <input
              style={styles.input}
              value={patientInfo.name}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, name: e.target.value })
              }
            />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Patient ID / MRN</label>
            <input
              style={styles.input}
              value={patientInfo.id}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, id: e.target.value })
              }
            />
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Exam Date</label>
            <input
              type="date"
              style={styles.input}
              value={patientInfo.date}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, date: e.target.value })
              }
            />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Examiner</label>
            <input
              style={styles.input}
              value={patientInfo.examiner}
              onChange={(e) =>
                setPatientInfo({ ...patientInfo, examiner: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* SENSORY EXAM */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          Sensory Examination
          <span style={styles.badge}>LT & PP · 0 = Absent · 1 = Altered · 2 = Normal</span>
        </div>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th} rowSpan={2}>
                  Dermatome
                </th>
                <th style={styles.th} colSpan={2}>
                  Right
                </th>
                <th style={styles.th} colSpan={2}>
                  Left
                </th>
              </tr>
              <tr>
                <th style={styles.th}>LT</th>
                <th style={styles.th}>PP</th>
                <th style={styles.th}>LT</th>
                <th style={styles.th}>PP</th>
              </tr>
            </thead>
            <tbody>
              {sensory.map((row, idx) => (
                <tr key={row.level}>
                  <td style={styles.tdLabel}>{row.level}</td>
                  <td style={styles.td}>
                    <input
                      style={styles.tinyInput}
                      value={row.rightLT}
                      onChange={(e) =>
                        handleSensoryChange(idx, "rightLT", e.target.value)
                      }
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      style={styles.tinyInput}
                      value={row.rightPP}
                      onChange={(e) =>
                        handleSensoryChange(idx, "rightPP", e.target.value)
                      }
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      style={styles.tinyInput}
                      value={row.leftLT}
                      onChange={(e) =>
                        handleSensoryChange(idx, "leftLT", e.target.value)
                      }
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      style={styles.tinyInput}
                      value={row.leftPP}
                      onChange={(e) =>
                        handleSensoryChange(idx, "leftPP", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.totalsRow}>
          Right LT: {sensoryTotals.rightLT} · Left LT: {sensoryTotals.leftLT} ·
          Right PP: {sensoryTotals.rightPP} · Left PP: {sensoryTotals.leftPP}
        </div>
      </div>

      {/* MOTOR EXAM */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          Motor Examination
          <span style={styles.badge}>0–5 key muscle grading</span>
        </div>
        <div style={styles.tableWrap}>
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
              {motor.map((row, idx) => (
                <tr key={row.level}>
                  <td style={styles.tdLabel}>{row.level}</td>
                  <td style={styles.tdLabel}>{row.muscle}</td>
                  <td style={styles.td}>
                    <input
                      style={styles.tinyInput}
                      value={row.right}
                      onChange={(e) =>
                        handleMotorChange(idx, "right", e.target.value)
                      }
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      style={styles.tinyInput}
                      value={row.left}
                      onChange={(e) =>
                        handleMotorChange(idx, "left", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.totalsRow}>
          UEMS / LEMS Total – Right: {motorTotals.right} · Left:{" "}
          {motorTotals.left}
        </div>
      </div>

      {/* SACRAL EXAM + AIS + ZPP */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Sacral Exam & Classification</div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Voluntary Anal Contraction (VAC)</label>
            <select
              style={styles.input}
              value={vac}
              onChange={(e) => setVac(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Deep Anal Pressure (DAP)</label>
            <select
              style={styles.input}
              value={dap}
              onChange={(e) => setDap(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>AIS Grade (A–E)</label>
            <select
              style={styles.input}
              value={aisGrade}
              onChange={(e) => setAisGrade(e.target.value)}
            >
              <option value="">Select</option>
              <option value="A">A – Complete</option>
              <option value="B">B – Sensory incomplete</option>
              <option value="C">C – Motor incomplete</option>
              <option value="D">D – Motor incomplete (functionally useful)</option>
              <option value="E">E – Normal</option>
            </select>
          </div>
          <div style={styles.col}>
            <label style={styles.label}>AIS Comments / Notes</label>
            <textarea
              rows={3}
              style={{ ...styles.input, resize: "vertical" }}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>ZPP – Motor Right</label>
            <input
              style={styles.input}
              value={zpp.motorRight}
              onChange={(e) =>
                setZpp({ ...zpp, motorRight: e.target.value })
              }
            />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>ZPP – Motor Left</label>
            <input
              style={styles.input}
              value={zpp.motorLeft}
              onChange={(e) => setZpp({ ...zpp, motorLeft: e.target.value })}
            />
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>ZPP – Sensory Right</label>
            <input
              style={styles.input}
              value={zpp.sensoryRight}
              onChange={(e) =>
                setZpp({ ...zpp, sensoryRight: e.target.value })
              }
            />
          </div>
          <div style={styles.col}>
            <label style={styles.label}>ZPP – Sensory Left</label>
            <input
              style={styles.input}
              value={zpp.sensoryLeft}
              onChange={(e) =>
                setZpp({ ...zpp, sensoryLeft: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
