import { useState } from "react";

const SEIZURE_TYPES = [
  "Generalised Tonic-Clonic",
  "Focal with Impaired Awareness",
  "Focal Aware",
  "Absence",
  "Myoclonic",
  "Status Epilepticus",
  "Other",
];

const YES_NO = ["Yes", "No"];

const COLUMNS = [
  { key: "timestamp",       label: "Timestamp\n(Entry)",          width: 90,  type: "datetime-local" },
  { key: "event_no",        label: "Event #",                     width: 56,  type: "text" },
  { key: "date",            label: "Date",                        width: 100, type: "date" },
  { key: "start_time",      label: "Start Time\n(hh:mm:ss)",      width: 90,  type: "time" },
  { key: "stop_time",       label: "Stop Time\n(hh:mm:ss)",       width: 90,  type: "time" },
  { key: "duration",        label: "Duration\n(hh:mm:ss)",        width: 80,  type: "text" },
  { key: "seizure_type",    label: "Seizure Type",                width: 140, type: "select", options: SEIZURE_TYPES },
  { key: "aura",            label: "Aura\n(Y/N)",                 width: 60,  type: "select", options: YES_NO },
  { key: "loc",             label: "LOC\n(Y/N)",                  width: 60,  type: "select", options: YES_NO },
  { key: "motor_features",  label: "Motor Features",              width: 130, type: "text" },
  { key: "eyes",            label: "Eyes",                        width: 80,  type: "text" },
  { key: "respiratory",     label: "Respiratory",                 width: 90,  type: "text" },
  { key: "spo2",            label: "SpO2 (%)",                    width: 70,  type: "text" },
  { key: "hr",              label: "HR (bpm)",                    width: 70,  type: "text" },
  { key: "bp",              label: "BP (mmHg)",                   width: 80,  type: "text" },
  { key: "bg",              label: "BG (mg/dL\nor mmol/L)",       width: 80,  type: "text" },
  { key: "gi_or_meds",      label: "GI/Stool or\nMeds(Y/N)",      width: 80,  type: "select", options: YES_NO },
  { key: "injuries",        label: "Injuries\n(Y/N)",             width: 70,  type: "select", options: YES_NO },
  { key: "injury_details",  label: "Injury Details",              width: 120, type: "text" },
  { key: "tongue_bite",     label: "Tongue Bite/\nIncontinence (Y/N)", width: 100, type: "select", options: YES_NO },
  { key: "interventions",   label: "Interventions\n(Time – Action – Details)", width: 160, type: "text" },
  { key: "medications",     label: "Medications Given\n(Time – Drug – Dose – Route)", width: 170, type: "text" },
  { key: "response",        label: "Response to\nIntervention",   width: 110, type: "text" },
  { key: "postictal",       label: "Post-ictal\nGCS/Alertness",   width: 100, type: "text" },
  { key: "returned_baseline", label: "Returned to\nBaseline (Time)", width: 100, type: "time" },
  { key: "witness",         label: "Witness\n(Name/Role)",        width: 110, type: "text" },
  { key: "nurse_initials",  label: "Nurse\nInitials",             width: 70,  type: "text" },
];

const STICKY_COLS = 3; // Timestamp, Event#, Date stay frozen

function emptyRow() {
  return COLUMNS.reduce((o, c) => ({ ...o, [c.key]: "" }), {});
}

const DEFAULT_ROWS = 5;

export default function SeizureChart({ patient }) {
  const [rows, setRows] = useState(Array.from({ length: DEFAULT_ROWS }, emptyRow));
  const [patientName, setPatientName] = useState(patient?.name || "");
  const [patientId,   setPatientId]   = useState(patient?.id   || "");
  const [ward,        setWard]        = useState("");
  const [consultant,  setConsultant]  = useState("");
  const [diagnosis,   setDiagnosis]   = useState("");

  const updateCell = (ri, key, val) =>
    setRows((p) => p.map((r, i) => (i === ri ? { ...r, [key]: val } : r)));

  const addRow    = () => setRows((p) => [...p, emptyRow()]);
  const removeRow = (ri) => setRows((p) => p.filter((_, i) => i !== ri));

  // compute sticky left offsets
  const stickyLeft = COLUMNS.reduce((acc, col, i) => {
    acc[i] = i === 0 ? 0 : acc[i - 1] + COLUMNS[i - 1].width;
    return acc;
  }, {});

  return (
    <div style={page}>
      {/* ── Header ── */}
      <div style={pageHeader}>
        <div>
          <div style={pageTitle}>Seizure Monitoring Chart</div>
          {/* <div style={pageSubtitle}>Nursing · Neurological Observation Record</div> */}
        </div>
        {patient && (
          <div style={patientBadge}>
            <div style={badgeName}>{patient.name}</div>
            {patient.id && <div style={badgeId}>MRN: {patient.id}</div>}
          </div>
        )}
      </div>

      {/* ── Patient info bar ── */}
      {/* <div style={infoBar}>
        {[
          ["Patient Name", patientName, setPatientName, "text"],
          ["MRN / ID",     patientId,   setPatientId,   "text"],
          ["Ward / Unit",  ward,        setWard,        "text"],
          ["Consultant",   consultant,  setConsultant,  "text"],
          ["Diagnosis",    diagnosis,   setDiagnosis,   "text"],
        ].map(([label, val, setter, type]) => (
          <div key={label} style={infoField}>
            <label style={infoLabel}>{label}</label>
            <input type={type} style={infoInput} value={val}
              onChange={(e) => setter(e.target.value)} placeholder={label} />
          </div>
        ))}
      </div> */}

      {/* ── Legend ── */}
      <div style={legendBar}>
        <span style={legendTitle}>Key</span>
        <span style={legendItem}><b>LOC</b> = Loss of Consciousness</span>
        <span style={legendItem}><b>GI</b> = Gastrointestinal symptoms</span>
        <span style={legendItem}><b>BG</b> = Blood Glucose</span>
        <span style={legendItem}><b>Post-ictal</b> = Post-seizure state</span>
      </div>

      {/* ── Table ── */}
      <div style={tableCard}>
        <div style={tableWrap}>
          <table style={table}>
            <colgroup>
              {COLUMNS.map((col) => (
                <col key={col.key} style={{ width: col.width, minWidth: col.width }} />
              ))}
              <col style={{ width: 40, minWidth: 40 }} />
            </colgroup>
            <thead>
              <tr>
                {COLUMNS.map((col, ci) => (
                  <th
                    key={col.key}
                    style={{
                      ...th,
                      ...(ci < STICKY_COLS ? { position: "sticky", left: stickyLeft[ci], zIndex: 4, background: "#3b5fa0", color: "#fff" } : {}),
                      whiteSpace: "pre-line",
                    }}
                  >
                    {col.label}
                  </th>
                ))}
                <th style={{ ...th, background: "#dbeafe", color: "#1e3a8a", width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={ri % 2 === 0 ? trEven : trOdd}>
                  {COLUMNS.map((col, ci) => {
                    const isSticky = ci < STICKY_COLS;
                    const bgColor  = ri % 2 === 0 ? "#f8fafc" : "#fff";
                    return (
                      <td
                        key={col.key}
                        style={{
                          ...td,
                          ...(isSticky ? { position: "sticky", left: stickyLeft[ci], zIndex: 2, background: bgColor, boxShadow: ci === STICKY_COLS - 1 ? "2px 0 4px rgba(0,0,0,0.06)" : "none" } : {}),
                        }}
                      >
                        {col.type === "select" ? (
                          <select style={cellSelect} value={row[col.key]}
                            onChange={(e) => updateCell(ri, col.key, e.target.value)}>
                            <option value="">—</option>
                            {col.options.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input
                            type={col.type === "text" ? "text" : col.type}
                            style={cellInput}
                            value={row[col.key]}
                            onChange={(e) => updateCell(ri, col.key, e.target.value)}
                          />
                        )}
                      </td>
                    );
                  })}
                  <td style={{ ...td, textAlign: "center" }}>
                    {rows.length > 1 && (
                      <button style={removeBtn} onClick={() => removeRow(ri)} title="Delete">🗑</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={tableFooter}>
          <button style={addBtn} onClick={addRow}>＋ Add Row</button>
          <span style={rowCount}>{rows.length} event{rows.length !== 1 ? "s" : ""} recorded</span>
        </div>
      </div>

      {/* ── Notes ── */}
      <div style={notesBox}>
        <label style={notesLabel}>Clinical Notes / Additional Observations</label>
        <textarea style={notesArea} rows={3}
          placeholder="Record any additional clinical observations, escalation actions, or physician notifications…" />
      </div>
    </div>
  );
}

/* ══ Styles ══ */
const page         = { width: "100%", boxSizing: "border-box", padding: "24px 28px", fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" };
const pageHeader   = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 };
const pageTitle    = { fontSize: 20, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px" };
const pageSubtitle = { fontSize: 12, color: "#64748b", marginTop: 2 };
const patientBadge = { background: "#dbeafe", color: "#1e3a8a", borderRadius: 10, padding: "8px 16px", textAlign: "right", border: "1px solid #c7d9fb" };
const badgeName    = { fontWeight: 700, fontSize: 14 };
const badgeId      = { fontSize: 11, opacity: 0.7, marginTop: 2 };

const infoBar   = { display: "flex", gap: 16, flexWrap: "wrap", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px", marginBottom: 14 };
const infoField = { display: "flex", flexDirection: "column", gap: 3, minWidth: 130, flex: 1 };
const infoLabel = { fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" };
const infoInput = { border: "none", borderBottom: "1.5px solid #cbd5e1", outline: "none", fontSize: 12, padding: "3px 2px", background: "transparent", color: "#0f172a" };

const legendBar   = { display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "8px 14px", marginBottom: 14, fontSize: 11 };
const legendTitle = { fontWeight: 700, color: "#1e3a8a", marginRight: 4 };
const legendItem  = { color: "#475569" };

const tableCard  = { background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden", marginBottom: 16 };
const tableWrap  = { overflowX: "auto" };
const table      = { borderCollapse: "collapse", fontSize: 11 };

const th = {
  border: "1px solid #c7d9fb", padding: "7px 6px",
  fontWeight: 700, fontSize: 10, textAlign: "center",
  background: "#dbeafe", color: "#1e3a8a",
  lineHeight: 1.4, verticalAlign: "bottom",
};

const td     = { border: "1px solid #e2e8f0", padding: "2px 3px", verticalAlign: "middle" };
const trEven = { background: "#f8fafc" };
const trOdd  = { background: "#fff" };

const cellInput  = { width: "100%", border: "none", outline: "none", fontSize: 10, background: "transparent", padding: "3px 2px", color: "#1e293b", boxSizing: "border-box" };
const cellSelect = { width: "100%", border: "none", outline: "none", fontSize: 10, background: "transparent", padding: "2px 1px", color: "#1e293b", cursor: "pointer" };

const tableFooter = { display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", borderTop: "1px solid #e2e8f0" };
const addBtn      = { padding: "8px 20px", background: "#3b5fa0", color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 6px rgba(59,95,160,0.25)" };
const rowCount    = { fontSize: 12, color: "#94a3b8" };
const removeBtn   = { background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 14, padding: "1px 4px" };

const notesBox   = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px" };
const notesLabel = { fontWeight: 700, fontSize: 12, color: "#475569", display: "block", marginBottom: 8 };
const notesArea  = { width: "100%", border: "1px solid #e2e8f0", borderRadius: 6, padding: "8px 10px", fontSize: 12, resize: "vertical", fontFamily: "inherit", color: "#1e293b", boxSizing: "border-box", outline: "none" };
