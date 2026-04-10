import { memo, useEffect, useState } from "react";

if (typeof document !== "undefined" && !document.getElementById("__toast_kf__")) {
  const s = document.createElement("style");
  s.id = "__toast_kf__";
  s.textContent = `
    @keyframes toast_in  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    @keyframes toast_out { from{opacity:1} to{opacity:0;transform:translateY(8px)} }
  `;
  document.head.appendChild(s);
}

const V = {
  success: { bg: "#ECFDF5", border: "#6EE7B7", text: "#065F46", iconBg: "#10B981", icon: "✓" },
  error:   { bg: "#FEF2F2", border: "#FECACA", text: "#991B1B", iconBg: "#EF4444", icon: "✕" },
  info:    { bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF", iconBg: "#3B82F6", icon: "i" },
  warning: { bg: "#FFFBEB", border: "#FDE68A", text: "#92400E", iconBg: "#F59E0B", icon: "!" },
};

const Toast = memo(function Toast({ message, variant = "info", duration = 3500, onClose }) {
  const [leaving, setLeaving] = useState(false);
  const v = V[variant] || V.info;

  const dismiss = () => { setLeaving(true); setTimeout(() => onClose?.(), 280); };
  useEffect(() => { if (!duration) return; const t = setTimeout(dismiss, duration); return () => clearTimeout(t); }, [duration]);

  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 10000,
      display: "flex", alignItems: "center", gap: 10,
      padding: "12px 16px", borderRadius: 12,
      background: v.bg, border: `1px solid ${v.border}`,
      boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
      minWidth: 260, maxWidth: 380,
      animation: leaving ? "toast_out .28s ease forwards" : "toast_in .28s ease",
      fontFamily: "Inter, Roboto, sans-serif",
    }}>
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: v.iconBg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, flexShrink: 0 }}>
        {v.icon}
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: v.text, flex: 1, lineHeight: 1.4 }}>{message}</span>
      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: v.text, opacity: 0.5, lineHeight: 0 }} onClick={dismiss}>✕</button>
    </div>
  );
});

export default Toast;
