import React from "react";

/* ══════════════════════════════════════════════════════════
   Shared utilities for all Neurac sub-tab assessments
══════════════════════════════════════════════════════════ */

/* ── Dropdown options ── */
export const OPTS_01   = [{ label: "—", value: "" }, { label: "0 – Not satisfactory", value: "0" }, { label: "1 – Satisfactory", value: "1" }];
export const OPTS_0123 = [{ label: "—", value: "" }, { label: "0", value: "0" }, { label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }];
export const OPTS_PDF  = [{ label: "—", value: "" }, { label: "P – Pain", value: "P" }, { label: "D – Dysfunctional Move", value: "D" }, { label: "F – Functional Move", value: "F" }];

/* ── Safe key helper ── */
export function k(str) {
  return (str || "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

/* ── Reusable select ── */
export function Sel({ options, value, onChange, width = 110 }) {
  return (
    <select
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      style={{
        width, padding: "5px 6px",
        border: "1px solid #d1d5db", borderRadius: 5,
        fontSize: 12, background: "#fff", color: "#111827", cursor: "pointer",
      }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

/* ── Text input ── */
export function CellInput({ value, onChange, placeholder = "" }) {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "5px 7px",
        border: "1px solid #d1d5db", borderRadius: 5,
        fontSize: 12, background: "#fff",
      }}
    />
  );
}

/* ── Save button row ── */
export function SaveRow({ onSave, onClear }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
      {onClear && (
        <button type="button" onClick={onClear}
          style={{
            padding: "8px 20px", borderRadius: 6,
            border: "1px solid #d1d5db", background: "#fff",
            color: "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}
        >
          Clear
        </button>
      )}
      <button type="button" onClick={onSave}
        style={{
          padding: "8px 24px", borderRadius: 6,
          border: "none", background: "#2563eb",
          color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
        }}
      >
        Save
      </button>
    </div>
  );
}

/* ── Section label ── */
export const sectionLabel = { fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 8, marginTop: 4 };

/* ── Table title (centered, with top border) ── */
export const tableTitle = {
  fontWeight: 800, fontSize: 15, color: "#111827",
  textAlign: "center", marginBottom: 8,
  padding: "8px 0", borderTop: "2px solid #e5e7eb",
};

/* ── Table styles ── */
export const tbl  = { width: "100%", borderCollapse: "collapse", fontSize: 13 };
export const th   = { background: "#f1f5f9", fontWeight: 700, padding: "8px 10px", border: "1px solid #d1d5db", color: "#111827", textAlign: "center" };
export const thN  = { background: "#f1f5f9", fontWeight: 700, padding: "8px 10px", border: "1px solid #d1d5db", color: "#111827", textAlign: "center", width: 40 };
export const td   = { padding: "7px 10px", border: "1px solid #e5e7eb", verticalAlign: "middle", fontSize: 13 };
export const tdC  = { padding: "7px 10px", border: "1px solid #e5e7eb", verticalAlign: "middle", fontSize: 13, textAlign: "center" };
export const tdN  = { padding: "7px 10px", border: "1px solid #e5e7eb", verticalAlign: "middle", fontSize: 13, textAlign: "center", color: "#6b7280", fontSize: 12 };
export const groupHeader = { padding: "7px 10px", border: "1px solid #e5e7eb", fontWeight: 800, fontSize: 13, color: "#111827", background: "#f9fafb" };

/* ── Legend ── */
export const legend01  = "0 = not satisfactory (Neurac treatment indicated)     1 = satisfactory";
export const legendPDF = "0 = Weak Link (Neurac treatment indicated)\nDecide: P = Pain, D = Dysfunctional Movement, F = Functional Movement";

export function Legend({ text }) {
  return (
    <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4, marginBottom: 4, whiteSpace: "pre-line" }}>
      {text}
    </div>
  );
}

/* ── Proximal table with Left/Right merged headers ── */
export function ProximalTable({ title, prefix, groups, values, onChange }) {
  const get = (key) => values[key] || "";
  const set = (key, val) => onChange(key, val);

  const grandTotal = () =>
    groups.flatMap(({ tests }) =>
      tests.map(test => {
        const bk = `${prefix}_${k(test)}`;
        return (Number(values[`${bk}_l_score`]) || 0) + (Number(values[`${bk}_r_score`]) || 0);
      })
    ).reduce((a, b) => a + b, 0);

  return (
    <>
      <div style={tableTitle}>{title}</div>
      <div style={{ overflowX: "auto", marginBottom: 4 }}>
        <table style={tbl}>
          <thead>
            {/* Row 1: merged Left side / Right side */}
            <tr>
              <th style={{ ...th, width: 180 }} rowSpan={2}>Tests</th>
              <th style={{ ...th }} colSpan={2}>Left Side</th>
              <th style={{ ...th }} colSpan={2}>Right Side</th>
              <th style={{ ...th, minWidth: 120 }} rowSpan={2}>Comments</th>
              <th style={{ ...th, width: 60 }} rowSpan={2}>Total</th>
            </tr>
            {/* Row 2: sub-headers */}
            <tr>
              <th style={{ ...th, fontSize: 11, fontWeight: 600, background: "#f8fafc" }}>Score (0–3)</th>
              <th style={{ ...th, fontSize: 11, fontWeight: 600, background: "#f8fafc" }}>P / D / F</th>
              <th style={{ ...th, fontSize: 11, fontWeight: 600, background: "#f8fafc" }}>Score (0–3)</th>
              <th style={{ ...th, fontSize: 11, fontWeight: 600, background: "#f8fafc" }}>P / D / F</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(({ group, tests }) => (
              <React.Fragment key={group || "main"}>
                {group && <tr><td colSpan={7} style={groupHeader}>{group}</td></tr>}
                {tests.map(test => {
                  const bk = `${prefix}_${k(test)}`;
                  const ls = Number(get(`${bk}_l_score`)) || 0;
                  const rs = Number(get(`${bk}_r_score`)) || 0;
                  return (
                    <tr key={test}>
                      <td style={{ ...td, color: test ? "#dc2626" : "#9ca3af", fontWeight: 600, fontSize: 12 }}>
                        {test || "—"}
                      </td>
                      <td style={tdC}><Sel options={OPTS_0123} value={get(`${bk}_l_score`)} onChange={v => set(`${bk}_l_score`, v)} width={90} /></td>
                      <td style={tdC}><Sel options={OPTS_PDF}  value={get(`${bk}_l_pdf`)}   onChange={v => set(`${bk}_l_pdf`,   v)} width={110} /></td>
                      <td style={tdC}><Sel options={OPTS_0123} value={get(`${bk}_r_score`)} onChange={v => set(`${bk}_r_score`, v)} width={90} /></td>
                      <td style={tdC}><Sel options={OPTS_PDF}  value={get(`${bk}_r_pdf`)}   onChange={v => set(`${bk}_r_pdf`,   v)} width={110} /></td>
                      <td style={td}><CellInput value={get(`${bk}_comment`)} onChange={v => set(`${bk}_comment`, v)} /></td>
                      <td style={{ ...tdC, fontWeight: 700, color: "#2563eb" }}>{ls + rs}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
            <tr style={{ background: "#f1f5f9" }}>
              <td style={{ ...td, fontWeight: 700 }}>Total Scores</td>
              <td colSpan={4} style={td}></td>
              <td style={{ ...td, fontWeight: 700, color: "#6b7280" }}>Overall Score</td>
              <td style={{ ...tdC, fontWeight: 800, color: "#2563eb" }}>{grandTotal()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Legend text={legendPDF} />
    </>
  );
}

/* ── Settings table (Global Comp / Position / Pain Free / Abdominal Resp) ── */
export function SettingsTable({ title, prefix, rows, values, onChange }) {
  const get = (key) => values[key] || "";
  const set = (key, val) => onChange(key, val);

  return (
    <>
      <div style={{ ...tableTitle, marginTop: 24 }}>{title}</div>
      <div style={{ overflowX: "auto", marginBottom: 4 }}>
        <table style={tbl}>
          <thead>
            <tr>
              <th style={{ ...th, width: 180 }}>Tests</th>
              <th style={{ ...th, width: 110 }}>Global Comp.</th>
              <th style={{ ...th, width: 110 }}>Position</th>
              <th style={{ ...th, width: 110 }}>Pain Free</th>
              <th style={{ ...th, width: 140 }}>Abdominal Respiration</th>
              <th style={{ ...th, width: 110 }}>Fatigue Occurs</th>
              <th style={{ ...th, width: 110 }}>Total Hold Time</th>
              <th style={{ ...th, minWidth: 120 }}>Comments</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(test => (
              <tr key={test}>
                <td style={{ ...td, color: "#dc2626", fontWeight: 600, fontSize: 12 }}>{test}</td>
                <td style={tdC}><Sel options={OPTS_01} value={get(`${prefix}_${k(test)}_gc`)}  onChange={v => set(`${prefix}_${k(test)}_gc`,  v)} width={100} /></td>
                <td style={tdC}><Sel options={OPTS_01} value={get(`${prefix}_${k(test)}_pos`)} onChange={v => set(`${prefix}_${k(test)}_pos`, v)} width={100} /></td>
                <td style={tdC}><Sel options={OPTS_01} value={get(`${prefix}_${k(test)}_pf`)}  onChange={v => set(`${prefix}_${k(test)}_pf`,  v)} width={100} /></td>
                <td style={tdC}><Sel options={OPTS_01} value={get(`${prefix}_${k(test)}_ar`)}  onChange={v => set(`${prefix}_${k(test)}_ar`,  v)} width={100} /></td>
                <td style={tdC}><CellInput value={get(`${prefix}_${k(test)}_fatigue`)} onChange={v => set(`${prefix}_${k(test)}_fatigue`, v)} placeholder="Yes / No" /></td>
                <td style={tdC}><CellInput value={get(`${prefix}_${k(test)}_hold`)}    onChange={v => set(`${prefix}_${k(test)}_hold`,    v)} placeholder="sec" /></td>
                <td style={td}> <CellInput value={get(`${prefix}_${k(test)}_comment`)} onChange={v => set(`${prefix}_${k(test)}_comment`, v)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Legend text={legend01} />
    </>
  );
}

/* ── ROM / Isometric table ── */
export function PhaseTable({ sectionNum, title, prefix, rows, colLabel, values, onChange }) {
  const get = (key) => values[key] || "";
  const set = (key, val) => onChange(key, val);

  return (
    <>
      <div style={sectionLabel}>{sectionNum}) {title}</div>
      <div style={{ overflowX: "auto", marginBottom: 20 }}>
        <table style={tbl}>
          <thead>
            <tr>
              <th style={thN}>No</th>
              <th style={{ ...th, width: 180 }}>Movement</th>
              <th style={{ ...th, minWidth: 140 }}>{colLabel} (Initial)</th>
              <th style={{ ...th, minWidth: 140 }}>{colLabel} (Mid)</th>
              <th style={{ ...th, minWidth: 140 }}>{colLabel} (Final)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((mv, i) => (
              <tr key={mv}>
                <td style={tdN}>{i + 1}</td>
                <td style={td}>{mv}</td>
                {["initial","mid","final"].map(phase => (
                  <td key={phase} style={td}>
                    <CellInput
                      value={get(`${prefix}_${k(mv)}_${phase}`)}
                      onChange={v => set(`${prefix}_${k(mv)}_${phase}`, v)}
                      placeholder={colLabel}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ── Perform+ table with Positive / Negative radio ── */
export function PerformTable({ prefix, rows, values, onChange }) {
  const get = (key) => values[key] || "";
  const set = (key, val) => onChange(key, val);

  return (
    <>
      <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 12, marginTop: 4 }}>
        Perform+ Test
      </div>
      <div style={{
        border: "1px solid #e5e7eb", borderRadius: 10,
        background: "#fff", marginBottom: 24, overflow: "hidden",
      }}>
        {rows.map((test, i) => {
          const resultKey = `${prefix}_perform_${k(test)}_result`;
          const result    = get(resultKey);
          return (
            <div
              key={test}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom: i < rows.length - 1 ? "1px solid #f1f5f9" : "none",
                background: "#fff",
              }}
            >
              {/* Test name */}
              <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{test}</span>

              {/* Positive / Negative radios */}
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                {["Positive", "Negative"].map(opt => (
                  <label
                    key={opt}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontSize: 14, cursor: "pointer",
                      color: result === opt
                        ? (opt === "Positive" ? "#dc2626" : "#16a34a")
                        : "#374151",
                      fontWeight: result === opt ? 600 : 400,
                    }}
                  >
                    <input
                      type="radio"
                      name={resultKey}
                      value={opt}
                      checked={result === opt}
                      onChange={() => set(resultKey, opt)}
                      style={{ accentColor: opt === "Positive" ? "#dc2626" : "#16a34a", width: 16, height: 16 }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export const otherTextarea = {
  width: "100%", minHeight: 80, padding: "8px 10px",
  border: "1px solid #d1d5db", borderRadius: 6,
  fontSize: 13, resize: "vertical", marginBottom: 20,
};

/* ── Info Tooltip (blue circle ⓘ icon with hover popup) ── */
export function InfoTooltip({ text }) {
  const [visible, setVisible] = React.useState(false);
  return (
    <div
      style={{ display: "inline-flex", position: "relative", marginLeft: 8, cursor: "pointer", verticalAlign: "middle" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Blue circle info icon */}
      <div style={{
        width: 22, height: 22, borderRadius: "50%",
        background: "#2563eb",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <span style={{
          color: "#fff", fontWeight: 800, fontSize: 13,
          fontFamily: "Georgia, serif", lineHeight: 1,
          userSelect: "none",
        }}>i</span>
      </div>

      {/* Tooltip popup */}
      {visible && (
        <div style={{
          position: "absolute", zIndex: 20,
          top: "130%", left: "50%", transform: "translateX(-50%)",
          width: 280, background: "#1e293b", color: "#fff",
          borderRadius: 8, padding: "10px 14px",
          fontSize: 12, lineHeight: "20px",
          whiteSpace: "pre-line", pointerEvents: "none",
          boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
        }}>
          {/* Arrow */}
          <div style={{
            position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)",
            width: 0, height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "6px solid #1e293b",
          }} />
          {Array.isArray(text) ? text.map((line, i) => <div key={i}>{line}</div>) : text}
        </div>
      )}
    </div>
  );
}

/* ── Table title with optional tooltip ── */
export function TableHeading({ title, tooltip }) {
  return (
    <div style={{ ...tableTitle, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {title}
      {tooltip && <InfoTooltip text={tooltip} />}
    </div>
  );
}
