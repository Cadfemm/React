import React, { useState } from "react";

const C = {
  primary: "#1a6b8a",
  primaryDark: "#0d3d52",
  primaryLight: "#e8f4f8",
  subHeader: "#d0e9f7",
  border: "#b2c8d8",
  text: "#0f172a",
  muted: "#475569",
  white: "#fff",
  rowAlt: "#f7fbfd",
};

const CODES = [
  { code: "L", desc: "left" },
  { code: "R", desc: "right" },
  { code: "B", desc: "back" },
  { code: "P", desc: "prone (front)" },
  { code: "M", desc: "mobilised" },
  { code: "S", desc: "seated" },
];

const INSTRUCTIONS = [
  "Inspect skin at every positional change and document below.",
  "Encourage patients/clients to reposition/mobilise where possible.",
  "Reposition the patient/client to reduce the risk of further damage, e.g. using the degree tilt.",
  "Use manual handling aids to minimise risk of friction and shear, e.g. glide sheets.",
  "Patients/clients on any form of pressure redistribution equipment still require skin inspection and regular repositioning.",
  "Provide suitable seating including pressure redistribution cushions as required.",
  "Acutely ill patients/clients should be seated for no longer than 2 hours and returned to bed (side lying or 30 degree tilt) for no less than 1 hour.",
];

const EMPTY_ROW = { time: "", from: "", to: "", skin_comments: "", action_taken: "", initials: "" };
const DEFAULT_ROWS = 16;

export default function RepositioningSkinChart({ patient, onBack }) {
  const [rows, setRows] = useState(
    Array.from({ length: DEFAULT_ROWS }, () => ({ ...EMPTY_ROW }))
  );
  const [saved, setSaved] = useState(false);
  const [chartDate, setChartDate] = useState("");

  const updateRow = (i, field, val) => {
    setRows((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r));
    setSaved(false);
  };

  const addRow = () => setRows((prev) => [...prev, { ...EMPTY_ROW }]);

  const handleSave = () => {
    setSaved(true);
    alert("Chart saved successfully.");
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 40px", fontFamily: "Segoe UI, sans-serif", color: C.text }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.primary }}>Daily Repositioning & Skin Inspection Chart</div>
        {patient?.name && (
          <div style={{ fontSize: 13, color: C.muted }}>
            {patient.name}
            {patient.id && <span style={{ marginLeft: 10 }}>| MRN: {patient.id}</span>}
          </div>
        )}
      </div>

      {/* ── Date Selector ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: C.primaryDark }}>Date:</label>
        <input
          type="date"
          value={chartDate}
          onChange={e => setChartDate(e.target.value)}
          style={{ padding: "6px 12px", border: `1.5px solid ${C.border}`, borderRadius: 6, fontSize: 13, color: C.text }}
        />
      </div>
      <div style={{ border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 18px", background: C.white, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: C.primaryDark, marginRight: 4 }}>Codes:</span>
        {CODES.map(({ code, desc }) => (
          <span key={code} style={{ fontSize: 13, color: C.text }}>
            <strong>{code}</strong> = {desc}
            <span style={{ color: C.border, marginLeft: 8 }}>|</span>
          </span>
        ))}
      </div>

      {/* ── Chart Table ── */}
      <div style={{ overflowX: "auto", border: `1.5px solid ${C.border}`, borderRadius: 10, marginBottom: 16 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr>
              {[
                { label: "Time", w: "9%" },
                { label: "Repositioning (Use Codes)", sub: "From → To", w: "16%" },
                { label: "Skin Inspection Comments", w: "32%" },
                { label: "Action Taken", w: "28%" },
                { label: "Signature / Initials", w: "15%" },
              ].map((col, i) => (
                <th key={i} style={{
                  background: C.primary, color: C.white, padding: "10px 12px",
                  fontSize: 12, fontWeight: 700, border: `1px solid ${C.border}`,
                  textAlign: "left", width: col.w, verticalAlign: "middle",
                }}>
                  {col.label}
                  {col.sub && <div style={{ fontSize: 10, fontWeight: 400, color: "#cce4f5", marginTop: 2 }}>{col.sub}</div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? C.white : C.rowAlt }}>
                {/* Time */}
                <td style={td}>
                  <input
                    type="time"
                    value={row.time}
                    onChange={(e) => updateRow(i, "time", e.target.value)}
                    style={inputStyle("100%")}
                  />
                </td>

                {/* From → To codes */}
                <td style={td}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <CodeSelect value={row.from} onChange={(v) => updateRow(i, "from", v)} placeholder="From" />
                    <span style={{ color: C.muted, fontSize: 13 }}>→</span>
                    <CodeSelect value={row.to} onChange={(v) => updateRow(i, "to", v)} placeholder="To" />
                  </div>
                </td>

                {/* Skin comments */}
                <td style={td}>
                  <input
                    type="text"
                    value={row.skin_comments}
                    onChange={(e) => updateRow(i, "skin_comments", e.target.value)}
                    placeholder="e.g. Left Hip Non Blanching"
                    style={inputStyle("100%")}
                  />
                </td>

                {/* Action taken */}
                <td style={td}>
                  <input
                    type="text"
                    value={row.action_taken}
                    onChange={(e) => updateRow(i, "action_taken", e.target.value)}
                    placeholder="e.g. Reassess at next level change"
                    style={inputStyle("100%")}
                  />
                </td>

                {/* Initials */}
                <td style={td}>
                  <input
                    type="text"
                    value={row.initials}
                    onChange={(e) => updateRow(i, "initials", e.target.value)}
                    placeholder="Initials"
                    style={inputStyle("100%")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Actions ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <button onClick={addRow} style={btnOutline}>+ Add Row</button>
        <div style={{ display: "flex", gap: 10 }}>
          {onBack && <button onClick={onBack} style={btnSecondary}>Back</button>}
          <button onClick={handleSave} style={btnPrimary}>{saved ? "✓ Saved" : "Save Chart"}</button>
        </div>
      </div>
    </div>
  );
}



function CodeSelect({ value, onChange, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        flex: 1, padding: "5px 6px", border: `1.5px solid ${C.border}`,
        borderRadius: 5, fontSize: 12, color: value ? C.primaryDark : C.muted,
        background: value ? C.primaryLight : C.white, fontWeight: value ? 700 : 400,
        cursor: "pointer",
      }}
    >
      <option value="">{placeholder}</option>
      {CODES.map(({ code, desc }) => (
        <option key={code} value={code}>{code} — {desc}</option>
      ))}
    </select>
  );
}

const td = {
  padding: "6px 10px",
  border: `1px solid ${C.border}`,
  verticalAlign: "middle",
};

const inputStyle = (width) => ({
  width,
  padding: "5px 8px",
  border: `1.5px solid ${C.border}`,
  borderRadius: 5,
  fontSize: 12,
  color: C.text,
  background: C.white,
  boxSizing: "border-box",
});

const btnPrimary = {
  background: C.primary, color: "#fff", border: "none",
  borderRadius: 7, padding: "9px 24px", fontWeight: 700, fontSize: 13, cursor: "pointer",
};

const btnSecondary = {
  background: C.white, color: C.primary, border: `2px solid ${C.primary}`,
  borderRadius: 7, padding: "9px 24px", fontWeight: 700, fontSize: 13, cursor: "pointer",
};

const btnOutline = {
  background: C.white, color: C.primaryDark, border: `1.5px dashed ${C.border}`,
  borderRadius: 7, padding: "8px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer",
};
