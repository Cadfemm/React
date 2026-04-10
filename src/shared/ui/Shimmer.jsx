import React, { memo } from "react";

/* ── keyframe injected once globally ─────────────────────────────────────── */
const STYLE_ID = "__shared_shimmer_style__";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes _shimmer {
      0%   { background-position: -600px 0; }
      100% { background-position:  600px 0; }
    }
    ._shimmer-block {
      background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
      background-size: 600px 100%;
      animation: _shimmer 1.4s ease-in-out infinite;
      border-radius: 6px;
    }
  `;
  document.head.appendChild(s);
}

/** Generic shimmer rectangle — compose into any layout */
export const ShimmerBlock = memo(function ShimmerBlock({ width = "100%", height = 16, style }) {
  return <div className="_shimmer-block" style={{ width, height, borderRadius: 6, ...style }} />;
});

/** Mimics a patient-table row (name / code / badge / action) */
export const ShimmerRow = memo(function ShimmerRow() {
  return (
    <div style={rowWrap}>
      <ShimmerBlock width="40%" height={14} />
      <ShimmerBlock width="25%" height={14} />
      <ShimmerBlock width="18%" height={22} style={{ borderRadius: 999 }} />
      <ShimmerBlock width="15%" height={32} style={{ borderRadius: 10, marginLeft: "auto" }} />
    </div>
  );
});

/** Mimics a dashboard stat card (icon + title + value) */
export const ShimmerCard = memo(function ShimmerCard() {
  return (
    <div style={cardWrap}>
      <ShimmerBlock width={40} height={40} style={{ borderRadius: 10, flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <ShimmerBlock width="60%" height={13} />
        <ShimmerBlock width="30%" height={18} />
      </div>
    </div>
  );
});

/** Mimics a form section (heading + N labelled input fields) */
export const ShimmerForm = memo(function ShimmerForm({ rows = 5 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: "24px 0" }}>
      <ShimmerBlock width="35%" height={22} />
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <ShimmerBlock width="22%" height={12} />
          <ShimmerBlock width="100%" height={38} style={{ borderRadius: 8 }} />
        </div>
      ))}
    </div>
  );
});

const rowWrap = {
  display: "grid",
  gridTemplateColumns: "2fr 2fr 1.5fr 1fr",
  padding: "16px 20px",
  alignItems: "center",
  gap: 12,
  borderBottom: "1px solid #F1F5F9",
};

const cardWrap = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: 18,
  background: "#fff",
  borderRadius: 14,
  border: "1px solid #EEF2F7",
  minHeight: 80,
};
