import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

const SHIFTS = [
  { key: "morning", label: "Shift A", sub: "7am–3pm",  color: "#fffbeb", labelColor: "#92400e", hours: [7,8,9,10,11,12,13,14] },
  { key: "evening", label: "Shift B", sub: "3pm–11pm", color: "#f0fdf4", labelColor: "#166534", hours: [15,16,17,18,19,20,21,22] },
  { key: "night",   label: "Shift C", sub: "11pm–7am", color: "#eff6ff", labelColor: "#1e40af", hours: [23,0,1,2,3,4,5,6] },
];

const REFERENCE_CODES = [
  { code: "R",  label: "Refused" },
  { code: "C",  label: "Given by carer / taken by own" },
  { code: "H",  label: "Withheld" },
  { code: "HL", label: "Home leave" },
];

const NOW = new Date();
const COL_PRESC = 155;
const COL_SHIFT = 80;
const COL_SUB   = 42;
const COL_DAY   = 52;
const ITEM_H    = 28;
const VISIBLE   = 6;
const COL_H     = VISIBLE * ITEM_H + 26;
const DROP_W    = 130;

function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function emptyShiftData(days) {
  return Object.fromEntries(SHIFTS.map((s) => [s.key, Array.from({ length: days }, () => ({ time: "", sign: "" }))]));
}
function buildPrescription(year, month) {
  return { id: Date.now() + Math.random(), prescription: "", startDate: "", endDate: "", notes: "", signature: "", year, month, shifts: emptyShiftData(daysInMonth(year, month)) };
}
function resizeShifts(p, year, month) {
  const days = daysInMonth(year, month);
  return { ...p, year, month, shifts: Object.fromEntries(SHIFTS.map((s) => [s.key, Array.from({ length: days }, (_, i) => p.shifts[s.key]?.[i] || { time: "", sign: "" })])) };
}
function pad(n) { return String(n).padStart(2, "0"); }
function fmt(h, m) { return `${pad(h)}:${pad(m)}`; }

/* ─────────────────────────────────────────
   ShiftTimePicker
   Dropdown rendered via portal with fixed
   positioning that tracks the cell on scroll
───────────────────────────────────────── */
function ShiftTimePicker({ value, shiftHours, onChange, bgColor }) {
  const [open, setOpen]   = useState(false);
  const [rect, setRect]   = useState(null);
  const [selH, setSelH]   = useState(null);
  const [selM, setSelM]   = useState(null);
  const triggerRef        = useRef();
  const dropRef           = useRef();

  // sync selections from value
  useEffect(() => {
    if (value) { const [h, m] = value.split(":").map(Number); setSelH(h); setSelM(m); }
    else { setSelH(null); setSelM(null); }
  }, [value]);

  // recompute rect on scroll / resize so dropdown tracks the cell
  const updateRect = useCallback(() => {
    if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect());
  }, []);

  useEffect(() => {
    if (!open) return;
    updateRect();
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [open, updateRect]);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const h = (e) => {
      if (triggerRef.current?.contains(e.target) || dropRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const pickHour = (h) => { const m = selM ?? 0; setSelH(h); onChange(fmt(h, m)); };
  const pickMin  = (m) => { const h = selH ?? shiftHours[0]; setSelM(m); setSelH(h); onChange(fmt(h, m)); };
  const clear    = (e) => { e.stopPropagation(); onChange(""); setSelH(null); setSelM(null); setOpen(false); };

  const allMins = Array.from({ length: 60 }, (_, i) => i);

  // position: below the cell, centred, using fixed coords
  const dropStyle = rect ? {
    position: "fixed",
    top:  rect.bottom + 2,
    left: rect.left + rect.width / 2 - DROP_W / 2,
    width: DROP_W,
    zIndex: 99999,
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
    overflow: "hidden",
  } : { display: "none" };

  const dropdown = open && ReactDOM.createPortal(
    <div ref={dropRef} style={dropStyle}>
      <div style={{ display: "flex" }}>
        {/* Hour */}
        <div style={{ flex: 1, borderRight: "1px solid #f1f5f9" }}>
          <div style={tpHead}>Hour</div>
          <div style={{ height: COL_H, overflowY: "auto" }}>
            {shiftHours.map((h) => (
              <div key={h} style={{ ...tpItem, height: ITEM_H, lineHeight: `${ITEM_H}px`, ...(selH === h ? tpActive : {}) }}
                onMouseDown={() => pickHour(h)}>{pad(h)}</div>
            ))}
          </div>
        </div>
        {/* Minute */}
        <div style={{ flex: 1 }}>
          <div style={tpHead}>Min</div>
          <div style={{ height: COL_H, overflowY: "auto" }}>
            {allMins.map((m) => (
              <div key={m} style={{ ...tpItem, height: ITEM_H, lineHeight: `${ITEM_H}px`, ...(selM === m ? tpActive : {}) }}
                onMouseDown={() => pickMin(m)}>{pad(m)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <div ref={triggerRef} style={{ width: "100%", height: "100%" }}>
      <div style={{ ...tpTrigger, background: bgColor }} onClick={() => setOpen((o) => !o)}>
        {value ? <span style={tpVal}>{value}</span> : <span style={tpPh}>--:--</span>}
        {value && <span style={tpX} onMouseDown={clear}>×</span>}
      </div>
      {dropdown}
    </div>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function MedicationAdministrationChart({ patient }) {
  const [allergies, setAllergies] = useState("");
  const [rows, setRows] = useState([
    buildPrescription(NOW.getFullYear(), NOW.getMonth()),
    buildPrescription(NOW.getFullYear(), NOW.getMonth()),
  ]);

  const updateRow = (idx, field, val) =>
    setRows((p) => p.map((r, i) => (i === idx ? { ...r, [field]: val } : r)));

  const changeMonth = (idx, year, month) =>
    setRows((p) => p.map((r, i) => (i === idx ? resizeShifts(r, year, month) : r)));

  const updateShiftCell = (rowIdx, shiftKey, dayIdx, field, val) =>
    setRows((p) =>
      p.map((r, i) => {
        if (i !== rowIdx) return r;
        const arr = [...r.shifts[shiftKey]];
        arr[dayIdx] = { ...arr[dayIdx], [field]: val };
        return { ...r, shifts: { ...r.shifts, [shiftKey]: arr } };
      })
    );

  const addRow    = () => setRows((p) => [...p, buildPrescription(NOW.getFullYear(), NOW.getMonth())]);
  const removeRow = (idx) => setRows((p) => p.filter((_, i) => i !== idx));

  return (
    <div style={page}>
      {/* header */}
      <div style={pageHeader}>
        <div>
          <div style={pageTitle}>Medication Chart</div>
          {/* <div style={pageSubtitle}>Nursing · Inpatient Record</div> */}
        </div>
        {patient && (
          <div style={patientBadge}>
            <div style={patientBadgeName}>{patient.name}</div>
            {patient.id && <div style={patientBadgeId}>MRN: {patient.id}</div>}
          </div>
        )}
      </div>

      {/* allergy */}
      <div style={allergyBanner}>
        <span style={allergyIcon}>⚠</span>
        <span style={allergyTag}>ALLERGIES</span>
        <input style={allergyInput} value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="Document known drug / food / latex allergies…" />
      </div>

      {/* cards */}
      <div style={cardStack}>
        {rows.map((row, rowIdx) => {
          const days    = daysInMonth(row.year, row.month);
          const dayNums = Array.from({ length: days }, (_, i) => i + 1);
          return (
            <div key={row.id} style={card}>
              {/* card header */}
              <div style={cardHeader}>
                <span style={cardHeaderLabel}>Prescription {rowIdx + 1}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <input type="month" style={monthInput}
                    value={`${row.year}-${pad(row.month + 1)}`}
                    onChange={(e) => { const [y, m] = e.target.value.split("-"); changeMonth(rowIdx, Number(y), Number(m) - 1); }} />
                  {rows.length > 1 && (
                    <button style={cardRemoveBtn} onClick={() => removeRow(rowIdx)}>Remove ✕</button>
                  )}
                </div>
              </div>

              {/* grid */}
              <div style={gridOuter}>
                <table style={gridTable}>
                  <colgroup>
                    <col style={{ width: COL_PRESC, minWidth: COL_PRESC }} />
                    <col style={{ width: COL_SHIFT, minWidth: COL_SHIFT }} />
                    <col style={{ width: COL_SUB,   minWidth: COL_SUB   }} />
                    {dayNums.map((d) => <col key={d} style={{ width: COL_DAY, minWidth: COL_DAY }} />)}
                  </colgroup>
                  <thead>
                    <tr>
                      <th style={{ ...thBase, ...stickyPresc }}>Prescription</th>
                      <th style={{ ...thBase, ...stickyShift }}>Shift</th>
                      <th style={{ ...thBase, ...stickySub, color: "#94a3b8" }}></th>
                      {dayNums.map((d) => <th key={d} style={thDay}>{d}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {SHIFTS.map((shift, si) => (
                      <React.Fragment key={shift.key}>
                        <tr>
                          {si === 0 && (
                            <td rowSpan={SHIFTS.length * 2} style={{ ...prescTd, ...stickyPresc }}>
                              <textarea style={prescTextarea} value={row.prescription}
                                onChange={(e) => updateRow(rowIdx, "prescription", e.target.value)}
                                placeholder="Drug name, dose, route, frequency…" />
                            </td>
                          )}
                          <td rowSpan={2} style={{ ...shiftLabelTd, ...stickyShift, background: shift.color, color: shift.labelColor }}>
                            <div style={shiftLabelMain}>{shift.label}</div>
                            <div style={shiftLabelSub}>{shift.sub}</div>
                          </td>
                          <td style={{ ...subLabelTd, ...stickySub, background: shift.color }}>TIME</td>
                          {row.shifts[shift.key].map((cell, di) => (
                            <td key={di} style={{ ...timeTd, background: shift.color }}>
                              <ShiftTimePicker
                                value={cell.time}
                                shiftHours={shift.hours}
                                bgColor={shift.color}
                                onChange={(v) => updateShiftCell(rowIdx, shift.key, di, "time", v)}
                              />
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td style={{ ...subLabelTd, ...stickySub, background: shift.color }}>SIGN</td>
                          {row.shifts[shift.key].map((cell, di) => (
                            <td key={di} style={signTd}>
                              <input style={signInput} value={cell.sign} maxLength={4}
                                onChange={(e) => updateShiftCell(rowIdx, shift.key, di, "sign", e.target.value)} />
                            </td>
                          ))}
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* footer */}
              <div style={cardFooter}>
                <div style={footerRow}>
                  <div style={footerField}>
                    <label style={fieldLabel}>Start Date</label>
                    <input type="date" style={fieldInput} value={row.startDate}
                      onChange={(e) => updateRow(rowIdx, "startDate", e.target.value)} />
                  </div>
                  <div style={footerField}>
                    <label style={fieldLabel}>End Date</label>
                    <input type="date" style={fieldInput} value={row.endDate}
                      onChange={(e) => updateRow(rowIdx, "endDate", e.target.value)} />
                  </div>
                </div>
                <div style={footerField}>
                  <label style={fieldLabel}>Notes</label>
                  <input style={{ ...fieldInput, width: "100%" }} value={row.notes}
                    onChange={(e) => updateRow(rowIdx, "notes", e.target.value)}
                    placeholder="Additional clinical notes…" />
                </div>
                <div style={footerField}>
                  <label style={fieldLabel}>Prescriber Signature</label>
                  <input style={{ ...fieldInput, minWidth: 200 }} value={row.signature}
                    onChange={(e) => updateRow(rowIdx, "signature", e.target.value)}
                    placeholder="Sign here" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* bottom bar */}
      <div style={bottomBar}>
        <button style={addBtn} onClick={addRow}>＋ Add Prescription</button>
        <div style={refPanel}>
          <span style={refHeading}>Reference</span>
          {REFERENCE_CODES.map(({ code, label }) => (
            <div key={code} style={refItem}>
              <span style={refCode}>{code}</span>
              <span style={refLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══ Layout styles ══ */
const stickyPresc = { position: "sticky", left: 0, zIndex: 3 };
const stickyShift = { position: "sticky", left: COL_PRESC, zIndex: 3 };
const stickySub   = { position: "sticky", left: COL_PRESC + COL_SHIFT, zIndex: 3 };

const page        = { width: "100%", boxSizing: "border-box", padding: "24px 28px", fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" };
const pageHeader  = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 };
const pageTitle   = { fontSize: 20, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px" };
const pageSubtitle= { fontSize: 12, color: "#64748b", marginTop: 2 };
const patientBadge= { background: "#dbeafe", color: "#1e3a8a", borderRadius: 10, padding: "8px 16px", textAlign: "right", border: "1px solid #c7d9fb" };
const patientBadgeName = { fontWeight: 700, fontSize: 14, color: "#1e3a8a" };
const patientBadgeId   = { fontSize: 11, opacity: 0.7, marginTop: 2, color: "#1e3a8a" };

const allergyBanner = { display: "flex", alignItems: "center", gap: 10, background: "#fff7ed", border: "1.5px solid #fb923c", borderRadius: 10, padding: "10px 16px", marginBottom: 20 };
const allergyIcon   = { fontSize: 16, color: "#ea580c" };
const allergyTag    = { fontWeight: 800, fontSize: 12, color: "#c2410c", letterSpacing: "0.06em", whiteSpace: "nowrap" };
const allergyInput  = { flex: 1, border: "none", background: "transparent", fontSize: 13, outline: "none", color: "#7c2d12" };

const cardStack = { display: "flex", flexDirection: "column", gap: 20, marginBottom: 20 };
const card      = { background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" };
const cardHeader= { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#3b5fa0", padding: "10px 16px", borderBottom: "2px solid #2d4f8a" };
const cardHeaderLabel = { color: "#fff", fontWeight: 700, fontSize: 14 };
const monthInput      = { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", borderRadius: 6, fontSize: 12, fontWeight: 600, padding: "4px 8px", cursor: "pointer", outline: "none", colorScheme: "dark" };
const cardRemoveBtn   = { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", borderRadius: 6, fontSize: 11, fontWeight: 600, padding: "4px 10px", cursor: "pointer" };

const gridOuter = { overflowX: "auto", width: "100%" };
const gridTable = { borderCollapse: "collapse", fontSize: 11, tableLayout: "fixed" };

const thBase = { border: "1px solid #c7d9fb", padding: "6px 8px", background: "#e8f0fe", color: "#1e3a8a", fontWeight: 700, fontSize: 11, textAlign: "center", whiteSpace: "nowrap" };
const thDay  = { border: "1px solid #c7d9fb", padding: "6px 4px", background: "#dbeafe", color: "#1e3a8a", fontWeight: 700, fontSize: 11, textAlign: "center" };

const prescTd      = { border: "1px solid #e2e8f0", padding: "8px 10px", verticalAlign: "top", background: "#f8fafc" };
const prescTextarea= { width: "100%", border: "1px solid #e2e8f0", borderRadius: 6, padding: "6px 8px", fontSize: 11, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box", background: "#fff", color: "#1e293b", lineHeight: 1.5, minHeight: 90 };

const shiftLabelTd  = { border: "1px solid #e2e8f0", padding: "4px 6px", textAlign: "center", verticalAlign: "middle", fontWeight: 700 };
const shiftLabelMain= { fontSize: 11, fontWeight: 800 };
const shiftLabelSub = { fontSize: 9, fontWeight: 500, opacity: 0.75, marginTop: 1 };

const subLabelTd = { border: "1px solid #e2e8f0", padding: "3px 4px", fontWeight: 700, fontSize: 9, textAlign: "center", color: "#64748b", letterSpacing: "0.04em" };
const timeTd     = { border: "1px solid #e2e8f0", padding: 0, textAlign: "center" };
const signTd     = { border: "1px solid #e2e8f0", padding: 1, background: "#fff", textAlign: "center" };
const signInput  = { width: "100%", border: "none", outline: "none", fontSize: 10, background: "transparent", textAlign: "center", padding: "2px 0", color: "#1e293b", boxSizing: "border-box" };

const cardFooter = { padding: "14px 16px", borderTop: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", flexDirection: "column", gap: 10 };
const footerRow  = { display: "flex", gap: 24, flexWrap: "wrap" };
const footerField= { display: "flex", flexDirection: "column", gap: 3 };
const fieldLabel = { fontSize: 10, fontWeight: 700, color: "#64748b", letterSpacing: "0.06em", textTransform: "uppercase" };
const fieldInput = { border: "none", borderBottom: "1.5px solid #cbd5e1", outline: "none", fontSize: 12, padding: "4px 2px", background: "transparent", color: "#0f172a", minWidth: 130 };

const bottomBar = { display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", paddingTop: 4 };
const addBtn    = { padding: "10px 24px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(37,99,235,0.3)" };
const refPanel  = { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 14px" };
const refHeading= { fontWeight: 700, fontSize: 11, color: "#475569", marginRight: 4, letterSpacing: "0.05em" };
const refItem   = { display: "flex", gap: 5, alignItems: "center" };
const refCode   = { fontWeight: 800, fontSize: 11, background: "#dbeafe", color: "#1e40af", borderRadius: 4, padding: "1px 7px" };
const refLabel  = { fontSize: 11, color: "#475569" };

/* ── Picker styles ── */
const tpTrigger = { display: "flex", alignItems: "center", justifyContent: "center", height: 26, fontSize: 9, fontWeight: 600, cursor: "pointer", userSelect: "none", gap: 2 };
const tpVal     = { color: "#1e293b" };
const tpPh      = { color: "#94a3b8" };
const tpX       = { color: "#94a3b8", fontSize: 11, cursor: "pointer", marginLeft: 1 };
const tpHead    = { padding: "4px 0", textAlign: "center", fontSize: 9, fontWeight: 700, color: "#94a3b8", background: "#f8fafc", letterSpacing: "0.06em", position: "sticky", top: 0, zIndex: 1 };
const tpItem    = { textAlign: "center", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#1e293b", userSelect: "none", boxSizing: "border-box" };
const tpActive  = { background: "#dbeafe", color: "#1e40af", fontWeight: 700 };
