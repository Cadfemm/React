import React, { useState } from "react";

/* ── Norms table ── */
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

function icfGrade(pct) {
  if (pct === null) return "—";
  if (pct >= 95) return "0  (≥95%)";
  if (pct >= 75) return "1  (75–94%)";
  if (pct >= 50) return "2  (50–74%)";
  if (pct >= 25) return "3  (25–49%)";
  return "4  (<25%)";
}

function icfColor(pct) {
  if (pct === null) return "transparent";
  if (pct >= 95) return "#dcfce7";
  if (pct >= 75) return "#fef9c3";
  if (pct >= 50) return "#fed7aa";
  if (pct >= 25) return "#fecaca";
  return "#f87171";
}

/* ── One R or L row ── */
function IsometricRow({ side, rowKey, gender, values, onChange }) {
  const mm   = parseFloat(values[`${rowKey}_mm`]) || null;
  const bw   = parseFloat(values[`${rowKey}_bw`]) || null;
  const mg   = values[`${rowKey}_mg`] || "";

  const pctBW     = (mm !== null && bw > 0) ? parseFloat(((mm / bw) * 100).toFixed(1)) : null;
  const norm      = mg && NORMS[mg] ? (gender === "female" ? NORMS[mg].women : NORMS[mg].men) : null;
  const pctOfNorm = (pctBW !== null && norm) ? parseFloat(((pctBW / norm) * 100).toFixed(1)) : null;

  return (
    <tr>
      <td style={{ ...td, fontWeight: 700, textAlign: "center", background: "#f8fafc" }}>{side}</td>
      <td style={td}>
        <input type="number" min="0" step="0.1" style={inp}
          value={values[`${rowKey}_mm`] || ""}
          onChange={e => onChange(`${rowKey}_mm`, e.target.value)}
          placeholder="kg" />
      </td>
      <td style={td}>
        <input type="number" min="0" step="0.1" style={inp}
          value={values[`${rowKey}_bw`] || ""}
          onChange={e => onChange(`${rowKey}_bw`, e.target.value)}
          placeholder="kg" />
      </td>
      <td style={{ ...td, fontWeight: 600, color: "#0369a1" }}>
        {pctBW !== null ? `${pctBW}%` : "—"}
      </td>
      <td style={td}>
        <select style={{ ...inp, minWidth: 210 }}
          value={mg}
          onChange={e => onChange(`${rowKey}_mg`, e.target.value)}>
          <option value="">Select muscle group</option>
          {MUSCLE_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </td>
      <td style={{ ...td, color: "#0369a1", fontWeight: 600, textAlign: "center" }}>
        {norm !== null ? `${norm}%` : "—"}
      </td>
      <td style={{ ...td, fontWeight: 600, textAlign: "center" }}>
        {pctOfNorm !== null ? `${pctOfNorm}%` : "—"}
      </td>
      <td style={{ ...td, background: icfColor(pctOfNorm), fontWeight: 700, textAlign: "center" }}>
        {icfGrade(pctOfNorm)}
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
        Gender (from patient record): <strong style={{ color: "#0f172a", textTransform: "capitalize" }}>{gender}</strong>
      </div>

      {/* ── Table ── */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr style={{ background: "#1e3a5f", color: "#fff" }}>
              {["Side", "Muscle Meter (kg)", "BW (kg)", "%BW", "Muscle Group", "Norm (%BW)", "% of Norm", "ICF"].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((g, idx) => (
              <React.Fragment key={g.id}>
                <IsometricRow side="R" rowKey={`iso_g${g.id}_r`} gender={gender} values={values} onChange={onChange} />
                <IsometricRow side="L" rowKey={`iso_g${g.id}_l`} gender={gender} values={values} onChange={onChange} />
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

      {/* ── ICF Legend ── */}
      <div style={{ marginTop: 24, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 16, maxWidth: 340 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a", marginBottom: 10 }}>ICF Interpretation (% of Norms)</div>
        <table style={{ borderCollapse: "collapse", fontSize: 13, width: "100%" }}>
          <thead>
            <tr style={{ background: "#bfdbfe" }}>
              <th style={{ ...th, color: "#1e3a5f", width: 60 }}>ICF</th>
              <th style={{ ...th, color: "#1e3a5f" }}>% of Norms</th>
            </tr>
          </thead>
          <tbody>
            {[["0","≥ 95%","#dcfce7"],["1","75 – 94%","#fef9c3"],["2","50 – 74%","#fed7aa"],["3","25 – 49%","#fecaca"],["4","< 25%","#f87171"]].map(([i,r,bg]) => (
              <tr key={i} style={{ background: bg }}>
                <td style={{ ...td, textAlign: "center", fontWeight: 700 }}>{i}</td>
                <td style={td}>{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = { padding: "10px 12px", textAlign: "left", border: "1px solid #cbd5e1", fontSize: 12, fontWeight: 700 };
const td = { padding: "8px 10px", border: "1px solid #e2e8f0", fontSize: 13, verticalAlign: "middle" };
const inp = { padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: 5, fontSize: 13, width: "100%", boxSizing: "border-box" };
