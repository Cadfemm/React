import React, { useState } from "react";

/* ── Norms (values are already %BW, e.g. 15 means 15%BW) ── */
const NORMS = {
  "Shoulder Flexors":            { men: 15,   women: 15   },
  "Shoulder Adductors":          { men: 21,   women: 21   },
  "Shoulder Abductors":          { men: 14,   women: 14   },
  "Shoulder Extensors":          { men: 21,   women: 21   },
  "Elbow Flexors (Biceps)":      { men: 34,   women: 34   },
  "Elbow Extensors (Triceps)":   { men: 22.5, women: 22.5 },
  "Wrist Extensors":             { men: 18,   women: 18   },
  "Wrist Flexors":               { men: 20,   women: 20   },
  "Hip Flexors":                 { men: 34,   women: 34   },
  "Hip Extensors":               { men: 34,   women: 34   },
  "Hip Abductors":               { men: 24,   women: 24   },
  "Hip Adductors":               { men: 25.5, women: 25.5 },
  "Knee Extensors (Quadriceps)": { men: 67,   women: 67   },
  "Knee Flexors (Hamstrings)":   { men: 34,   women: 34   },
  "Ankle Dorsiflexors":          { men: 29,   women: 29   },
  "Ankle Inversion":             { men: 28,   women: 28   },
  "Ankle Eversion":              { men: 27,   women: 27   },
};

const MUSCLE_OPTIONS = Object.keys(NORMS);

/* ICF grade from % of Norm */
function icfGrade(pct) {
  if (pct === null) return null;
  if (pct >= 95) return { grade: "0", range: "≥ 95%",    bg: "#dcfce7", text: "#166534" };
  if (pct >= 75) return { grade: "1", range: "75–94%",   bg: "#fef9c3", text: "#854d0e" };
  if (pct >= 50) return { grade: "2", range: "50–74%",   bg: "#fed7aa", text: "#9a3412" };
  if (pct >= 25) return { grade: "3", range: "25–49%",   bg: "#fecaca", text: "#991b1b" };
  return              { grade: "4", range: "< 25%",    bg: "#f87171", text: "#fff"    };
}

/* ── Single R or L row ── */
function IsometricRow({ side, rowKey, mirrorKey, gender, values, onChange }) {
  const mm  = parseFloat(values[`${rowKey}_mm`]) || null;
  const bw  = parseFloat(values[`${rowKey}_bw`]) || null;
  const mg  = values[`${rowKey}_mg`] || "";

  /* %BW = (Muscle Meter / Body Weight) × 100 */
  const pctBW = (mm !== null && bw > 0)
    ? parseFloat(((mm / bw) * 100).toFixed(1))
    : null;

  /* Norm is already in %BW units */
  const norm = mg && NORMS[mg]
    ? (gender === "female" ? NORMS[mg].women : NORMS[mg].men)
    : null;

  /* % of Norm = (%BW / Norm) × 100  — both sides are %BW so this is correct */
  const pctOfNorm = (pctBW !== null && norm)
    ? parseFloat(((pctBW / norm) * 100).toFixed(1))
    : null;

  const icf = icfGrade(pctOfNorm);

  /* When BW changes, mirror to the other side */
  const handleBW = (val) => {
    onChange(`${rowKey}_bw`, val);
    onChange(`${mirrorKey}_bw`, val);
  };

  return (
    <tr>
      <td style={{ ...td, fontWeight: 700, textAlign: "center", background: "#f8fafc", width: 40 }}>{side}</td>

      {/* Muscle Meter */}
      <td style={td}>
        <input type="number" min="0" step="0.1" style={inp}
          value={values[`${rowKey}_mm`] || ""}
          onChange={e => onChange(`${rowKey}_mm`, e.target.value)}
          placeholder="kg" />
      </td>

      {/* BW — shared between R and L */}
      <td style={td}>
        <input type="number" min="0" step="0.1" style={inp}
          value={values[`${rowKey}_bw`] || ""}
          onChange={e => handleBW(e.target.value)}
          placeholder="kg" />
      </td>

      {/* %BW — auto */}
      <td style={{ ...td, fontWeight: 600, color: "#0369a1", textAlign: "center" }}>
        {pctBW !== null ? `${pctBW}%` : "—"}
      </td>

      {/* Muscle Group dropdown */}
      <td style={td}>
        <select style={{ ...inp, minWidth: 210 }}
          value={mg}
          onChange={e => onChange(`${rowKey}_mg`, e.target.value)}>
          <option value="">Select muscle group</option>
          {MUSCLE_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </td>

      {/* Norm (%BW) — auto from gender + muscle group */}
      <td style={{ ...td, color: "#0369a1", fontWeight: 600, textAlign: "center" }}>
        {norm !== null ? `${norm}%` : "—"}
      </td>

      {/* % of Norm — auto */}
      <td style={{ ...td, fontWeight: 600, textAlign: "center" }}>
        {pctOfNorm !== null ? `${pctOfNorm}%` : "—"}
      </td>

      {/* ICF — inline badge */}
      <td style={{ ...td, textAlign: "center" }}>
        {icf ? (
          <span style={{
            display: "inline-block", padding: "3px 10px",
            background: icf.bg, color: icf.text,
            borderRadius: 6, fontWeight: 700, fontSize: 12
          }}>
            {icf.grade} &nbsp;<span style={{ fontWeight: 400 }}>({icf.range})</span>
          </span>
        ) : "—"}
      </td>
    </tr>
  );
}

/* ── Main component ── */
export default function IsometricTestForm({ values, onChange }) {
  const gender = values["iso_gender"] || "male";

  const [groups, setGroups] = useState(
    values["iso_groups"] || [{ id: 1 }]
  );

  const addGroup = () => {
    const next = [...groups, { id: Date.now() }];
    setGroups(next);
    onChange("iso_groups", next);
  };

  const removeGroup = (id) => {
    const next = groups.filter(g => g.id !== id);
    setGroups(next);
    onChange("iso_groups", next);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13 }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 4 }}>
        Isometric Strength Test
      </div>
      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>
        Gender (from patient record):&nbsp;
        <strong style={{ color: "#0f172a", textTransform: "capitalize" }}>{gender}</strong>
        &nbsp;·&nbsp;
        <span style={{ color: "#475569" }}>%BW = Muscle Meter ÷ Body Weight × 100 &nbsp;|&nbsp; % of Norm = %BW ÷ Norm × 100</span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr style={{ background: "#1e3a5f", color: "#fff" }}>
              {["Side","Muscle Meter (kg)","BW (kg)","%BW","Muscle Group","Norm (%BW)","% of Norm","ICF"].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((g, idx) => (
              <React.Fragment key={g.id}>
                <IsometricRow
                  side="R" rowKey={`iso_g${g.id}_r`} mirrorKey={`iso_g${g.id}_l`}
                  gender={gender} values={values} onChange={onChange}
                />
                <IsometricRow
                  side="L" rowKey={`iso_g${g.id}_l`} mirrorKey={`iso_g${g.id}_r`}
                  gender={gender} values={values} onChange={onChange}
                />
                {groups.length > 1 && (
                  <tr>
                    <td colSpan={8} style={{ padding: "2px 8px", background: "#fef2f2" }}>
                      <button onClick={() => removeGroup(g.id)}
                        style={{ fontSize: 11, color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}>
                        ✕ Remove this muscle group
                      </button>
                    </td>
                  </tr>
                )}
                {idx < groups.length - 1 && (
                  <tr><td colSpan={8} style={{ height: 6, background: "#f1f5f9" }} /></tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={addGroup} style={{
        marginTop: 12, padding: "8px 18px", background: "#2563eb",
        color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer"
      }}>
        + Add Muscle Group
      </button>
    </div>
  );
}

const th = { padding: "10px 12px", textAlign: "left", border: "1px solid #cbd5e1", fontSize: 12, fontWeight: 700 };
const td = { padding: "8px 10px", border: "1px solid #e2e8f0", fontSize: 13, verticalAlign: "middle" };
const inp = { padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: 5, fontSize: 13, width: "100%", boxSizing: "border-box" };
