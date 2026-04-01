import { useState } from "react";

const DEFAULT_ROWS = 7;

const MEAL_COLS = [
  { meal: "Breakfast", cols: ["Pre", "Post Prandial"] },
  { meal: "Lunch",     cols: ["Pre", "Post Prandial"] },
  { meal: "Dinner",    cols: ["Pre", "Post Prandial"] },
];
const EXTRA_COLS = ["Pre Bed", "Late Night (3am–4am)"];

// flat column keys for state
const ALL_KEYS = [
  "breakfast_pre", "breakfast_post",
  "lunch_pre",     "lunch_post",
  "dinner_pre",    "dinner_post",
  "pre_bed",       "late_night",
];

function emptyRow() {
  return ALL_KEYS.reduce((o, k) => ({ ...o, [k]: "" }), { date: "" });
}

function getRangeStyle(val) {
  const n = parseFloat(val);
  if (!val || isNaN(n)) return {};
  if (n < 4.0)  return { background: "#fee2e2", color: "#991b1b", fontWeight: 700 }; // hypo
  if (n > 10.0) return { background: "#ffedd5", color: "#c2410c", fontWeight: 700 }; // hyper
  return { background: "#dcfce7", color: "#166534" }; // normal
}

export default function GlucoseMonitorChart({ patient }) {
  const [rows, setRows]           = useState(Array.from({ length: DEFAULT_ROWS }, emptyRow));
  const [targetMin, setTargetMin] = useState("4.0");
  const [targetMax, setTargetMax] = useState("10.0");
  const [unit, setUnit]           = useState("mmol/L");

  const updateCell = (ri, key, val) =>
    setRows((p) => p.map((r, i) => (i === ri ? { ...r, [key]: val } : r)));

  const addRow    = () => setRows((p) => [...p, emptyRow()]);
  const removeRow = (ri) => setRows((p) => p.filter((_, i) => i !== ri));

  return (
    <div style={page}>

      {/* ── Header ── */}
      <div style={pageHeader}>
        <div>
          <div style={pageTitle}>Glucose Monitoring Chart</div>
          {/* <div style={pageSubtitle}>Nursing · Blood Glucose Record</div> */}
        </div>
        {patient && (
          <div style={patientBadge}>
            <div style={badgeName}>{patient.name}</div>
            {patient.id && <div style={badgeId}>MRN: {patient.id}</div>}
          </div>
        )}
      </div>

      {/* ── Settings bar ── */}
      {/* <div style={settingsBar}>
        <div style={settingField}>
          <label style={settingLabel}>Unit</label>
          <select style={settingSelect} value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="mmol/L">mmol/L</option>
            <option value="mg/dL">mg/dL</option>
          </select>
        </div>
        <div style={settingField}>
          <label style={settingLabel}>Target Min ({unit})</label>
          <input style={settingInput} value={targetMin} onChange={(e) => setTargetMin(e.target.value)} />
        </div>
        <div style={settingField}>
          <label style={settingLabel}>Target Max ({unit})</label>
          <input style={settingInput} value={targetMax} onChange={(e) => setTargetMax(e.target.value)} />
        </div>
        <div style={rangeLegend}>
          <span style={{ ...legendChip, background: "#fee2e2", color: "#991b1b" }}>Low (&lt;{targetMin})</span>
          <span style={{ ...legendChip, background: "#dcfce7", color: "#166534" }}>Normal</span>
          <span style={{ ...legendChip, background: "#ffedd5", color: "#c2410c" }}>High (&gt;{targetMax})</span>
        </div>
      </div> */}

      {/* ── Table ── */}
      <div style={tableCard}>
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th rowSpan={2} style={{ ...th, ...thDate }}>Date</th>
                {MEAL_COLS.map(({ meal }) => (
                  <th key={meal} colSpan={2} style={{ ...th, ...thMeal }}>{meal}</th>
                ))}
                {EXTRA_COLS.map((col) => (
                  <th key={col} rowSpan={2} style={{ ...th, ...thExtra }}>{col}</th>
                ))}
                <th rowSpan={2} style={{ ...th, width: 36, background: "#eff6ff" }}></th>
              </tr>
              <tr>
                {MEAL_COLS.map(({ meal, cols }) =>
                  cols.map((c) => (
                    <th key={`${meal}_${c}`} style={{ ...th, ...thSub }}>{c}</th>
                  ))
                )}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={ri % 2 === 0 ? trEven : trOdd}>
                  <td style={{ ...td, ...tdDate }}>
                    <input type="date" style={cellInput} value={row.date}
                      onChange={(e) => updateCell(ri, "date", e.target.value)} />
                  </td>
                  {ALL_KEYS.map((key) => {
                    const rangeStyle = getRangeStyle(row[key]);
                    return (
                      <td key={key} style={{ ...td, ...rangeStyle }}>
                        <input
                          style={{ ...cellInput, textAlign: "center", ...rangeStyle, background: "transparent" }}
                          value={row[key]}
                          onChange={(e) => updateCell(ri, key, e.target.value)}
                          placeholder="—"
                          inputMode="decimal"
                        />
                      </td>
                    );
                  })}
                  <td style={{ ...td, textAlign: "center" }}>
                    {rows.length > 1 && (
                      <button style={removeBtn} onClick={() => removeRow(ri)} title="Delete row">
                        🗑
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={tableFooter}>
          <button style={addBtn} onClick={addRow}>＋ Add Row</button>
        </div>
      </div>

      {/* ── Notes ── */}
      <div style={notesBox}>
        <span style={notesLabel}>Notes / Insulin Actions</span>
        <textarea style={notesArea} rows={3} placeholder="Record any insulin doses, hypoglycaemic episodes, or clinical actions taken…" />
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

const settingsBar  = { display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px", marginBottom: 16 };
const settingField = { display: "flex", flexDirection: "column", gap: 3 };
const settingLabel = { fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" };
const settingSelect= { border: "1px solid #e2e8f0", borderRadius: 6, padding: "4px 8px", fontSize: 12, outline: "none", background: "#f8fafc", color: "#1e293b" };
const settingInput = { border: "1px solid #e2e8f0", borderRadius: 6, padding: "4px 8px", fontSize: 12, outline: "none", width: 70, background: "#f8fafc", color: "#1e293b" };
const rangeLegend  = { display: "flex", gap: 8, alignItems: "center", marginLeft: "auto" };
const legendChip   = { fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "3px 10px" };

const tableCard  = { background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden", marginBottom: 16 };
const tableWrap  = { overflowX: "auto" };
const table      = { borderCollapse: "collapse", width: "100%", fontSize: 11 };

const th      = { border: "1px solid #e2e8f0", padding: "7px 8px", fontWeight: 700, fontSize: 11, textAlign: "center", whiteSpace: "nowrap" };
const thDate  = { background: "#e8f0fe", color: "#1e3a8a", position: "sticky", left: 0, zIndex: 3, minWidth: 100 };
const thMeal  = { background: "#dbeafe", color: "#1e40af" };
const thSub   = { background: "#eff6ff", color: "#1e40af", fontSize: 10 };
const thExtra = { background: "#dbeafe", color: "#1e40af", minWidth: 80 };

const td      = { border: "1px solid #e2e8f0", padding: "2px 4px", verticalAlign: "middle", minWidth: 72 };
const tdDate  = { position: "sticky", left: 0, zIndex: 2, background: "#f8fafc", minWidth: 100 };
const trEven  = { background: "#f8fafc" };
const trOdd   = { background: "#fff" };

const cellInput = { width: "100%", border: "none", outline: "none", fontSize: 11, background: "transparent", padding: "4px 3px", color: "#1e293b", boxSizing: "border-box" };

const tableFooter = { padding: "10px 14px", borderTop: "1px solid #e2e8f0" };
const addBtn      = { padding: "8px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 6px rgba(37,99,235,0.25)" };
const removeBtn   = { background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 14, padding: "1px 4px" };

const notesBox   = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 16px" };
const notesLabel = { fontWeight: 700, fontSize: 12, color: "#475569", display: "block", marginBottom: 8 };
const notesArea  = { width: "100%", border: "1px solid #e2e8f0", borderRadius: 6, padding: "8px 10px", fontSize: 12, resize: "vertical", fontFamily: "inherit", color: "#1e293b", boxSizing: "border-box", outline: "none" };
