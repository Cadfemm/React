import React from "react";

export default function YBalanceTestForm({ values, onChange }) {
  const limbR = parseFloat(values["ybt_limb_r"]) || null;
  const limbL = parseFloat(values["ybt_limb_l"]) || null;

  const calcNorm = (reach, limb) => {
    const r = parseFloat(reach);
    if (!limb || isNaN(r) || r === 0) return null;
    return parseFloat(((r / limb) * 100).toFixed(2));
  };

  const normR = calcNorm(values["ybt_reach_r"], limbR);
  const normL = calcNorm(values["ybt_reach_l"], limbL);

  const normStyle = (n) =>
    n === null ? { color: "#94a3b8" }
    : n >= 90  ? { color: "#166534", fontWeight: 700 }
               : { color: "#991b1b", fontWeight: 700 };

  /* Mirror limb length between R and L */
  const handleLimb = (side, val) => {
    onChange(`ybt_limb_${side}`, val);
    onChange(`ybt_limb_${side === "r" ? "l" : "r"}`, val);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13 }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 16 }}>
        Y Balance Test
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr style={{ background: "#1e3a5f", color: "#fff" }}>
              {["Side", "Limb Length (cm)", "Reach Distance (cm)", "Normalized Reach (%)"].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { side: "R", limbKey: "ybt_limb_r", reachKey: "ybt_reach_r", norm: normR },
              { side: "L", limbKey: "ybt_limb_l", reachKey: "ybt_reach_l", norm: normL },
            ].map(row => (
              <tr key={row.side}>
                <td style={{ ...td, fontWeight: 700, textAlign: "center", background: "#f8fafc", width: 50 }}>
                  {row.side}
                </td>
                <td style={td}>
                  <input
                    type="number" min="0" step="0.1" style={inp}
                    value={values[row.limbKey] || ""}
                    onChange={e => handleLimb(row.side.toLowerCase(), e.target.value)}
                    placeholder="cm"
                  />
                </td>
                <td style={td}>
                  <input
                    type="number" min="0" step="0.1" style={inp}
                    value={values[row.reachKey] || ""}
                    onChange={e => onChange(row.reachKey, e.target.value)}
                    placeholder="cm"
                  />
                </td>
                <td style={{ ...td, textAlign: "center", ...normStyle(row.norm) }}>
                  {row.norm !== null ? `${row.norm}%` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formula + normal reference */}
      <div style={{
        marginTop: 14, display: "flex", alignItems: "center",
        gap: 24, flexWrap: "wrap", fontSize: 12, color: "#475569"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span>Normalized reach =</span>
          <div style={{ textAlign: "center", paddingLeft: 8 }}>
            <div style={{ borderBottom: "1px solid #475569", paddingBottom: 2, marginBottom: 2 }}>
              Reach distance
            </div>
            <div>Limb length</div>
          </div>
          <span>× 100</span>
        </div>
        <span style={{
          padding: "4px 12px", background: "#dcfce7",
          color: "#166534", borderRadius: 6, fontWeight: 600
        }}>
          &gt; 90% is normal
        </span>
      </div>
    </div>
  );
}

const th = { padding: "10px 12px", textAlign: "left", border: "1px solid #cbd5e1", fontSize: 12, fontWeight: 700 };
const td = { padding: "8px 10px", border: "1px solid #e2e8f0", fontSize: 13, verticalAlign: "middle" };
const inp = { padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: 5, fontSize: 13, width: "100%", boxSizing: "border-box" };
