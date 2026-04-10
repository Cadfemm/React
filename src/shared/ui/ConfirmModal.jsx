import { memo, useEffect } from "react";
import { createPortal } from "react-dom";

if (typeof document !== "undefined" && !document.getElementById("__cm_kf__")) {
  const s = document.createElement("style");
  s.id = "__cm_kf__";
  s.textContent = `
    @keyframes cm_bg   { from{opacity:0} to{opacity:1} }
    @keyframes cm_card { from{opacity:0;transform:translateY(12px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  `;
  document.head.appendChild(s);
}

const ACCENT = { submit: "#2563EB", warning: "#D97706", danger: "#DC2626" };

const ConfirmModal = memo(function ConfirmModal({
  variant      = "submit",
  title        = "Confirm Action",
  message      = "",
  checklist    = [],
  meta         = [],
  confirmLabel = "Confirm",
  cancelLabel  = "Cancel",
  onConfirm,
  onCancel,
}) {
  const accent = ACCENT[variant] || ACCENT.submit;

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onCancel?.(); };
    window.addEventListener("keydown", fn);
    // prevent body scroll while modal open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onCancel]);

  const modal = (
    <div style={S.overlay} onClick={onCancel}>
      <div style={S.card} onClick={e => e.stopPropagation()}>

        {/* accent line */}
        <div style={{ height: 4, background: accent, borderRadius: "12px 12px 0 0" }} />

        <div style={S.body}>
          {/* title */}
          <div style={S.titleRow}>
            <div style={{ ...S.iconBox, background: accent + "18", color: accent }}>
              {variant === "danger" ? "✕" : variant === "warning" ? "!" : "✓"}
            </div>
            <span style={S.title}>{title}</span>
          </div>

          {message && <p style={S.message}>{message}</p>}

          {/* meta */}
          {meta.length > 0 && (
            <div style={S.metaTable}>
              {meta.map((r, i) => (
                <div key={i} style={{ ...S.metaRow, background: i % 2 === 0 ? "#F8FAFC" : "#fff", borderBottom: i < meta.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <span style={S.metaLabel}>{r.label}</span>
                  <span style={{ ...S.metaValue, color: accent }}>{r.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* checklist */}
          {checklist.length > 0 && (
            <div style={S.checkBox}>
              {checklist.map((item, i) => (
                <div key={i} style={S.checkRow}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="7.5" cy="7.5" r="7.5" fill={accent} />
                    <path d="M4 7.8l2.2 2.2 4.8-5" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={S.checkText}>{item}</span>
                </div>
              ))}
            </div>
          )}

          <div style={S.divider} />

          {/* actions */}
          <div style={S.actions}>
            <button style={S.cancelBtn} onClick={onCancel}>{cancelLabel}</button>
            <button style={{ ...S.confirmBtn, background: accent }} onClick={onConfirm}>{confirmLabel}</button>
          </div>

          <p style={S.audit}>This action will be recorded in the audit trail</p>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
});

export default ConfirmModal;

const S = {
  overlay:    { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, background: "rgba(8,18,40,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "cm_bg .2s ease", fontFamily: "Inter, Roboto, sans-serif" },
  card:       { width: "min(440px, 92vw)", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.04)", animation: "cm_card .22s cubic-bezier(.34,1.4,.64,1)" },
  body:       { padding: "20px 22px 18px", display: "flex", flexDirection: "column", gap: 14 },
  titleRow:   { display: "flex", alignItems: "center", gap: 12 },
  iconBox:    { width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 900, flexShrink: 0 },
  title:      { fontSize: 16, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.2px" },
  message:    { fontSize: 13, color: "#475569", lineHeight: 1.65, margin: 0 },
  metaTable:  { borderRadius: 8, border: "1px solid #E2E8F0", overflow: "hidden" },
  metaRow:    { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px" },
  metaLabel:  { fontSize: 12, color: "#64748B", fontWeight: 500 },
  metaValue:  { fontSize: 12, fontWeight: 700 },
  checkBox:   { background: "#F8FAFC", borderRadius: 8, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 },
  checkRow:   { display: "flex", alignItems: "flex-start", gap: 9 },
  checkText:  { fontSize: 13, color: "#334155", lineHeight: 1.5 },
  divider:    { height: 1, background: "#F1F5F9" },
  actions:    { display: "flex", gap: 10 },
  cancelBtn:  { flex: 1, padding: "10px 0", borderRadius: 8, border: "1.5px solid #E2E8F0", background: "#F8FAFC", color: "#475569", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  confirmBtn: { flex: 2, padding: "10px 0", borderRadius: 8, border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  audit:      { fontSize: 11, color: "#94A3B8", textAlign: "center", margin: 0 },
};
