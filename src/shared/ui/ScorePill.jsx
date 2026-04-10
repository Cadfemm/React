import { memo } from "react";

const PALETTES = {
  blue:   { bg: "#EFF6FF", border: "#BFDBFE", text: "#1D4ED8" },
  amber:  { bg: "#FFFBEB", border: "#FDE68A", text: "#92400E" },
  green:  { bg: "#ECFDF5", border: "#6EE7B7", text: "#065F46" },
  red:    { bg: "#FEF2F2", border: "#FECACA", text: "#991B1B" },
  purple: { bg: "#F5F3FF", border: "#DDD6FE", text: "#5B21B6" },
};

const ScorePill = memo(function ScorePill({ label, value, color = "blue" }) {
  const p = PALETTES[color] || PALETTES.blue;
  return (
    <div style={{ flex: 1, minWidth: 130, background: p.bg, border: `1px solid ${p.border}`, borderRadius: 12, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 3 }}>
      <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: p.text, opacity: 0.75 }}>{label}</span>
      <span style={{ fontSize: 20, fontWeight: 800, color: p.text, lineHeight: 1.2 }}>{value}</span>
    </div>
  );
});

export default ScorePill;
