 import React, { useState } from "react";

const DEFAULT_ROWS = 5;

const URGENCY_OPTIONS = ["None", "Mild", "Moderate", "Severe"];

function emptyRow() {
  return { time: "", date: "", fluidType: "", fluidVolume: "", urineVolume: "", urgency: "", leakVolume: "", leakActivity: "", remarks: "" };
}

function buildRows(n) {
  return Array.from({ length: n }, emptyRow);
}

export default function BladderDiaryChart({ patient }) {
  const [rows, setRows] = useState(buildRows(DEFAULT_ROWS));
  const [patientName, setPatientName]   = useState(patient?.name || "");
  const [patientId,   setPatientId]     = useState(patient?.id   || "");
  const [startDate,   setStartDate]     = useState("");
  const [endDate,     setEndDate]       = useState("");
  const [clinician,   setClinician]     = useState("");

  const updateCell = (rowIdx, field, val) =>
    setRows((p) => p.map((r, i) => (i === rowIdx ? { ...r, [field]: val } : r)));

  const addRow    = () => setRows((p) => [...p, emptyRow()]);
  const removeRow = (idx) => setRows((p) => p.filter((_, i) => i !== idx));

  /* totals */
  const totalFluid  = rows.reduce((s, r) => s + (parseFloat(r.fluidVolume)  || 0), 0);
  const totalUrine  = rows.reduce((s, r) => s + (parseFloat(r.urineVolume)  || 0), 0);
  const totalLeak   = rows.reduce((s, r) => s + (parseFloat(r.leakVolume)   || 0), 0);

  return (
    <div style={page}>

      {/* ── Header ── */}
      <div style={pageHeader}>
        <div>
          <div style={pageTitle}>Bladder Diary</div>
          {/* <div style={pageSubtitle}>Nursing · Continence Assessment</div> */}
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
        <div style={infoField}>
          <label style={infoLabel}>Patient Name</label>
          <input style={infoInput} value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Full name" />
        </div>
        <div style={infoField}>
          <label style={infoLabel}>MRN / ID</label>
          <input style={infoInput} value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="MRN" />
        </div>
        <div style={infoField}>
          <label style={infoLabel}>Diary Start</label>
          <input type="date" style={infoInput} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div style={infoField}>
          <label style={infoLabel}>Diary End</label>
          <input type="date" style={infoInput} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div style={infoField}>
          <label style={infoLabel}>Clinician</label>
          <input style={infoInput} value={clinician} onChange={(e) => setClinician(e.target.value)} placeholder="Name / signature" />
        </div>
      </div>

      <div style={instructionBox}>
        <span style={instrIcon}>ℹ</span>
        <span style={instrText}>
          Record every fluid intake and every time you pass urine or experience leakage. Include the time, type and volume of fluid drunk, volume of urine passed, any urgency felt, and any leakage with the activity that caused it.
        </span>
      </div> */}

      {/* ── Table ── */}
      <div style={tableCard}>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                {/* Time / Date */}
                <th rowSpan={2} style={{ ...th, ...thSticky, width: 90 }}>Time / Date</th>
                {/* Fluid intake */}
                <th colSpan={2} style={{ ...th, ...thGroup, background: "#dbeafe", color: "#1e40af" }}>Fluid Intake (drinks, soups)</th>
                {/* Urine */}
                <th colSpan={2} style={{ ...th, ...thGroup, background: "#dbeafe", color: "#1e40af" }}>Urine</th>
                {/* Leaking */}
                <th colSpan={2} style={{ ...th, ...thGroup, background: "#dbeafe", color: "#1e40af" }}>Leaking</th>
                {/* Remarks */}
                <th rowSpan={2} style={{ ...th, width: 120 }}>Remarks</th>
                {/* Actions */}
                <th rowSpan={2} style={{ ...th, width: 36 }}></th>
              </tr>
              <tr>
                <th style={{ ...th, background: "#eff6ff", color: "#1e40af", fontSize: 10 }}>Type</th>
                <th style={{ ...th, background: "#eff6ff", color: "#1e40af", fontSize: 10 }}>Vol (ml)</th>
                <th style={{ ...th, background: "#eff6ff", color: "#1e40af", fontSize: 10 }}>Vol (ml)</th>
                <th style={{ ...th, background: "#eff6ff", color: "#1e40af", fontSize: 10 }}>Urgency</th>
                <th style={{ ...th, background: "#eff6ff", color: "#1e40af", fontSize: 10 }}>Vol (ml)</th>
                <th style={{ ...th, background: "#eff6ff", color: "#1e40af", fontSize: 10 }}>Activity when leaking</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={i % 2 === 0 ? trEven : trOdd}>
                  {/* Time / Date */}
                  <td style={{ ...td, ...tdSticky, background: i % 2 === 0 ? "#f8fafc" : "#fff" }}>
                    <input type="time" style={cellInput} value={row.time} onChange={(e) => updateCell(i, "time", e.target.value)} />
                    <input type="date" style={{ ...cellInput, marginTop: 2, fontSize: 8 }} value={row.date} onChange={(e) => updateCell(i, "date", e.target.value)} />
                  </td>
                  {/* Fluid type */}
                  <td style={{ ...td, background: "#f8fbff" }}>
                    <input style={cellInput} value={row.fluidType} onChange={(e) => updateCell(i, "fluidType", e.target.value)} placeholder="e.g. water" />
                  </td>
                  {/* Fluid volume */}
                  <td style={{ ...td, background: "#f8fbff" }}>
                    <input type="number" style={{ ...cellInput, textAlign: "right" }} value={row.fluidVolume} onChange={(e) => updateCell(i, "fluidVolume", e.target.value)} placeholder="0" min="0" />
                  </td>
                  {/* Urine volume */}
                  <td style={{ ...td, background: "#f8fbff" }}>
                    <input type="number" style={{ ...cellInput, textAlign: "right" }} value={row.urineVolume} onChange={(e) => updateCell(i, "urineVolume", e.target.value)} placeholder="0" min="0" />
                  </td>
                  {/* Urgency */}
                  <td style={{ ...td, background: "#f8fbff" }}>
                    <select style={cellSelect} value={row.urgency} onChange={(e) => updateCell(i, "urgency", e.target.value)}>
                      <option value="">—</option>
                      {URGENCY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </td>
                  {/* Leak volume */}
                  <td style={{ ...td, background: "#f8fbff" }}>
                    <input type="number" style={{ ...cellInput, textAlign: "right" }} value={row.leakVolume} onChange={(e) => updateCell(i, "leakVolume", e.target.value)} placeholder="0" min="0" />
                  </td>
                  {/* Leak activity */}
                  <td style={{ ...td, background: "#f8fbff" }}>
                    <input style={cellInput} value={row.leakActivity} onChange={(e) => updateCell(i, "leakActivity", e.target.value)} placeholder="e.g. coughing" />
                  </td>
                  {/* Remarks */}
                  <td style={td}>
                    <input style={cellInput} value={row.remarks} onChange={(e) => updateCell(i, "remarks", e.target.value)} />
                  </td>
                  {/* Remove */}
                  <td style={{ ...td, textAlign: "center" }}>
                    {rows.length > 1 && (
                      <button style={removeBtn} onClick={() => removeRow(i)} title="Remove row">✕</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Totals footer */}
            <tfoot>
              <tr>
                <td style={tfootTd} colSpan={2}>Totals</td>
                <td style={{ ...tfootTd, color: "#1e40af", fontWeight: 700 }}>{totalFluid > 0 ? `${totalFluid} ml` : "—"}</td>
                <td style={{ ...tfootTd, color: "#166534", fontWeight: 700 }}>{totalUrine > 0 ? `${totalUrine} ml` : "—"}</td>
                <td style={tfootTd}></td>
                <td style={{ ...tfootTd, color: "#854d0e", fontWeight: 700 }}>{totalLeak > 0 ? `${totalLeak} ml` : "—"}</td>
                <td style={tfootTd} colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Add row */}
        <div style={tableFooter}>
          <button style={addBtn} onClick={addRow}>＋ Add Row</button>
          <div style={totalsBar}>
            <span style={totalChip}>💧 Fluid in: <b>{totalFluid} ml</b></span>
            <span style={totalChip}>🚽 Urine out: <b>{totalUrine} ml</b></span>
            <span style={totalChip}>💦 Leakage: <b>{totalLeak} ml</b></span>
            {totalFluid > 0 && totalUrine > 0 && (
              <span style={{ ...totalChip, background: "#eff6ff", color: "#1e40af" }}>
                Balance: <b>{totalFluid - totalUrine - totalLeak} ml</b>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      <div style={legend}>
        <span style={legendTitle}>Urgency Scale</span>
        {[["None","No urgency"], ["Mild","Slight urge, easily deferred"], ["Moderate","Strong urge, manageable"], ["Severe","Overwhelming urge, unable to defer"]].map(([k, v]) => (
          <div key={k} style={legendItem}><span style={legendKey}>{k}</span><span style={legendVal}>{v}</span></div>
        ))}
      </div>
    </div>
  );
}

/* ══ Styles ══ */
const page        = { width: "100%", boxSizing: "border-box", padding: "24px 28px", fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" };
const pageHeader  = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 };
const pageTitle   = { fontSize: 20, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px" };
const pageSubtitle= { fontSize: 12, color: "#64748b", marginTop: 2 };
const patientBadge= { background: "#1e40af", color: "#fff", borderRadius: 10, padding: "8px 16px", textAlign: "right" };
const badgeName   = { fontWeight: 700, fontSize: 14 };
const badgeId     = { fontSize: 11, opacity: 0.8, marginTop: 2 };

const infoBar   = { display: "flex", gap: 16, flexWrap: "wrap", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px", marginBottom: 14 };
const infoField = { display: "flex", flexDirection: "column", gap: 3, minWidth: 130 };
const infoLabel = { fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" };
const infoInput = { border: "none", borderBottom: "1.5px solid #cbd5e1", outline: "none", fontSize: 12, padding: "3px 2px", background: "transparent", color: "#0f172a" };

const instructionBox = { display: "flex", gap: 10, alignItems: "flex-start", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#1e40af" };
const instrIcon = { fontSize: 15, flexShrink: 0 };
const instrText = { lineHeight: 1.5 };

const tableCard  = { background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden", marginBottom: 16 };
const tableWrap  = { overflowX: "auto" };
const table      = { borderCollapse: "collapse", width: "100%", fontSize: 11 };

const th = { border: "1px solid #e2e8f0", padding: "7px 8px", fontWeight: 700, fontSize: 11, textAlign: "center", background: "#f1f5f9", color: "#475569", whiteSpace: "nowrap" };
const thGroup  = { border: "1px solid #e2e8f0", padding: "6px 8px", fontWeight: 700, fontSize: 11, textAlign: "center" };
const thSticky = { position: "sticky", left: 0, zIndex: 3, background: "#f1f5f9" };

const td       = { border: "1px solid #e2e8f0", padding: "3px 4px", verticalAlign: "middle" };
const tdSticky = { position: "sticky", left: 0, zIndex: 2 };
const trEven   = { background: "#f8fafc" };
const trOdd    = { background: "#fff" };

const cellInput  = { width: "100%", border: "none", outline: "none", fontSize: 11, background: "transparent", padding: "2px 3px", color: "#1e293b", boxSizing: "border-box" };
const cellSelect = { width: "100%", border: "none", outline: "none", fontSize: 11, background: "transparent", padding: "2px 2px", color: "#1e293b", cursor: "pointer" };

const tfootTd  = { border: "1px solid #e2e8f0", padding: "6px 8px", background: "#f1f5f9", fontSize: 11, textAlign: "center", color: "#475569" };

const tableFooter = { display: "flex", alignItems: "center", gap: 16, padding: "10px 14px", borderTop: "1px solid #e2e8f0", flexWrap: "wrap" };
const addBtn      = { padding: "8px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 6px rgba(37,99,235,0.25)" };
const totalsBar   = { display: "flex", gap: 10, flexWrap: "wrap" };
const totalChip   = { background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "#475569" };

const removeBtn = { background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 13, fontWeight: 700, padding: "1px 4px" };

const legend      = { display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 16px" };
const legendTitle = { fontWeight: 700, fontSize: 11, color: "#475569", marginRight: 4 };
const legendItem  = { display: "flex", gap: 6, alignItems: "center" };
const legendKey   = { fontWeight: 700, fontSize: 11, background: "#fef9c3", color: "#854d0e", borderRadius: 4, padding: "1px 7px" };
const legendVal   = { fontSize: 11, color: "#64748b" };
