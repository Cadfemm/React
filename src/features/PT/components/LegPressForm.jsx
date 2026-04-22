import React from "react";

export default function LegPressForm({ values, onChange }) {
  const calc = (rm, bw) => {
    const r = parseFloat(rm), b = parseFloat(bw);
    if (!r || !b || b === 0) return null;
    return parseFloat(((r / b) * 100).toFixed(2));
  };

  const pctR = calc(values["lp_rm_r"], values["lp_bw_r"]);
  const pctL = calc(values["lp_rm_l"], values["lp_bw_l"]);

  /* Mirror BW between R and L */
  const handleBW = (side, val) => {
    onChange(`lp_bw_${side}`, val);
    onChange(`lp_bw_${side === "r" ? "l" : "r"}`, val);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13 }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 16 }}>
        1RM Leg Press
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
          <thead>
            <tr style={{ background: "#1e3a5f", color: "#fff" }}>
              {["Side", "Measured 1RM (kg)", "BW (kg)", "%BW"].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { side: "R", rmKey: "lp_rm_r", bwKey: "lp_bw_r", pct: pctR },
              { side: "L", rmKey: "lp_rm_l", bwKey: "lp_bw_l", pct: pctL },
            ].map(row => (
              <tr key={row.side}>
                <td style={{ ...td, fontWeight: 700, textAlign: "center", background: "#f8fafc", width: 50 }}>
                  {row.side}
                </td>
                <td style={td}>
                  <input type="number" min="0" step="0.1" style={inp}
                    value={values[row.rmKey] || ""}
                    onChange={e => onChange(row.rmKey, e.target.value)}
                    placeholder="kg" />
                </td>
                <td style={td}>
                  <input type="number" min="0" step="0.1" style={inp}
                    value={values[row.bwKey] || ""}
                    onChange={e => handleBW(row.side.toLowerCase(), e.target.value)}
                    placeholder="kg" />
                </td>
                <td style={{ ...td, textAlign: "center", fontWeight: 600, color: "#0369a1" }}>
                  {row.pct !== null ? `${row.pct}%` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formula */}
      <div style={{
        marginTop: 14, display: "flex", alignItems: "center",
        gap: 8, fontSize: 12, color: "#475569"
      }}>
        <span>%BW =</span>
        <div style={{ textAlign: "center" }}>
          <div style={{ borderBottom: "1px solid #475569", paddingBottom: 2, marginBottom: 2 }}>1RM (kg)</div>
          <div>BW (kg)</div>
        </div>
        <span>× 100%</span>
      </div>
    </div>
  );
}

const th = { padding: "10px 12px", textAlign: "left", border: "1px solid #cbd5e1", fontSize: 12, fontWeight: 700 };
const td = { padding: "8px 10px", border: "1px solid #e2e8f0", fontSize: 13, verticalAlign: "middle" };
const inp = { padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: 5, fontSize: 13, width: "100%", boxSizing: "border-box" };
