import { memo } from "react";

const EmptyState = memo(function EmptyState({ icon = "📭", title = "Nothing here yet", message = "", action }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "56px 24px", textAlign: "center", gap: 10 }}>
      <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>{title}</div>
      {message && <div style={{ fontSize: 13, color: "#64748B", maxWidth: 320, lineHeight: 1.6 }}>{message}</div>}
      {action && (
        <button
          style={{ marginTop: 8, padding: "9px 20px", background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
    </div>
  );
});

export default EmptyState;
