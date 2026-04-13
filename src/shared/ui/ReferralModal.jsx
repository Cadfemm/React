import { memo, useState, useCallback } from "react";

/* ── keyframe injected once ─────────────────────────────────────────────── */
if (typeof document !== "undefined" && !document.getElementById("__ref_kf__")) {
  const s = document.createElement("style");
  s.id = "__ref_kf__";
  s.textContent = `
    @keyframes ref_bg   { from{opacity:0} to{opacity:1} }
    @keyframes ref_card { from{opacity:0;transform:translateY(14px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
    .__ref_dept:hover   { border-color: var(--bs-primary) !important; background: #EFF6FF !important; }
    .__ref_dept.selected { border-color: var(--bs-primary) !important; background: #EFF6FF !important; }
    .__ref_submit:hover { opacity:.9 !important; }
  `;
  document.head.appendChild(s);
}

const DEPARTMENTS = [
  { id: "physiotherapy",    label: "Physiotherapy",          icon: "🦵" },
  { id: "occupational",     label: "Occupational Therapy",   icon: "🖐️" },
  { id: "speech",           label: "Speech & Language",      icon: "🗣️" },
  { id: "audiology",        label: "Audiology",              icon: "👂" },
  { id: "psychology",       label: "Psychology",             icon: "🧠" },
  { id: "dietetics",        label: "Dietetics",              icon: "🥗" },
  { id: "prosthetics",      label: "Prosthetics & Orthotics",icon: "🦾" },
  { id: "nursing",          label: "Nursing",                icon: "💉" },
  { id: "medical",          label: "Medical Officer",        icon: "🩺" },
  { id: "social",           label: "Social Work",            icon: "🤝" },
  { id: "pharmacy",         label: "Pharmacy",               icon: "💊" },
  { id: "radiology",        label: "Radiology",              icon: "🔬" },
];

/**
 * ReferralModal — multi-department referral selector.
 *
 * Props:
 *   patient    – patient object (for display)
 *   onSubmit   – called with { departments: string[], notes: string }
 *   onClose    – called to dismiss
 */
const ReferralModal = memo(function ReferralModal({ patient, onSubmit, onClose }) {
  const [selected, setSelected] = useState([]);
  const [notes,    setNotes]    = useState("");
  const [urgency,  setUrgency]  = useState("routine");

  const toggle = useCallback((id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  }, []);

  const handleSubmit = useCallback(() => {
    if (selected.length === 0) return;
    onSubmit?.({ departments: selected, notes, urgency });
    onClose?.();
  }, [selected, notes, urgency, onSubmit, onClose]);

  return (
    <div style={overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div style={card} onClick={e => e.stopPropagation()}>

        {/* ── Header ── */}
        <div style={header}>
          <div>
            <div style={headerTitle}>Referral Request</div>
            {patient && (
              <div style={headerSub}>
                {patient.email || patient.name || "Patient"} · {new Date().toLocaleDateString("en-GB")}
              </div>
            )}
          </div>
          <button style={closeBtn} onClick={onClose} aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div style={body}>

          {/* ── Urgency ── */}
          <div style={sectionLabel}>Urgency</div>
          <div style={urgencyRow}>
            {[
              { value: "routine",  label: "Routine",  color: "#059669", bg: "#ECFDF5", border: "#6EE7B7" },
              { value: "urgent",   label: "Urgent",   color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
              { value: "emergency",label: "Emergency",color: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
            ].map(u => (
              <button
                key={u.value}
                onClick={() => setUrgency(u.value)}
                style={{
                  ...urgencyBtn,
                  borderColor: urgency === u.value ? u.color : "#E2E8F0",
                  background:  urgency === u.value ? u.bg : "#F8FAFC",
                  color:       urgency === u.value ? u.color : "#64748B",
                  fontWeight:  urgency === u.value ? 700 : 500,
                }}
              >
                {u.label}
              </button>
            ))}
          </div>

          {/* ── Department grid ── */}
          <div style={sectionLabel}>
            Select Departments
            {selected.length > 0 && (
              <span style={countBadge}>{selected.length} selected</span>
            )}
          </div>
          <div style={deptGrid}>
            {DEPARTMENTS.map(dept => {
              const isSelected = selected.includes(dept.id);
              return (
                <button
                  key={dept.id}
                  className={`__ref_dept${isSelected ? " selected" : ""}`}
                  onClick={() => toggle(dept.id)}
                  style={{
                    ...deptBtn,
                    borderColor: isSelected ? "var(--bs-primary)" : "#E2E8F0",
                    background:  isSelected ? "#EFF6FF" : "#FAFBFC",
                  }}
                >
                  <span style={deptIcon}>{dept.icon}</span>
                  <span style={{ ...deptLabel, color: isSelected ? "var(--bs-primary)" : "#334155", fontWeight: isSelected ? 700 : 500 }}>
                    {dept.label}
                  </span>
                  {isSelected && (
                    <span style={checkMark}>✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Notes ── */}
          <div style={sectionLabel}>Clinical Notes <span style={optional}>(optional)</span></div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Reason for referral, relevant clinical findings..."
            style={notesArea}
            rows={3}
          />

          {/* ── Actions ── */}
          <div style={actions}>
            <button style={cancelBtn} onClick={onClose}>Cancel</button>
            <button
              className="__ref_submit"
              style={{ ...submitBtn, opacity: selected.length === 0 ? 0.45 : 1, cursor: selected.length === 0 ? "not-allowed" : "pointer" }}
              onClick={handleSubmit}
              disabled={selected.length === 0}
            >
              Send Referral{selected.length > 0 ? ` (${selected.length})` : ""}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
});

export default ReferralModal;

/* ── Styles — matches RMS global CSS ─────────────────────────────────────── */
const overlay    = { position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", backdropFilter:"blur(3px)", WebkitBackdropFilter:"blur(3px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999, animation:"ref_bg .18s ease" };
const card       = { width:"min(560px,94vw)", maxHeight:"90vh", background:"#fff", borderRadius:6, border:"1px solid #dee2e6", boxShadow:"0 6px 24px rgba(0,0,0,.12)", animation:"ref_card .2s ease", display:"flex", flexDirection:"column", overflow:"hidden" };
const header     = { display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"14px 16px", borderBottom:"1px solid #dee2e6", flexShrink:0 };
const headerTitle= { fontSize:15, fontWeight:600, color:"#212529" };
const headerSub  = { fontSize:12, color:"#6c757d", marginTop:2 };
const closeBtn   = { background:"none", border:"none", cursor:"pointer", padding:4, borderRadius:4, lineHeight:0, color:"#6c757d" };
const body       = { padding:"14px 16px 16px", overflowY:"auto", display:"flex", flexDirection:"column", gap:12 };
const sectionLabel = { fontSize:11, fontWeight:600, color:"#6c757d", textTransform:"uppercase", letterSpacing:"0.5px", display:"flex", alignItems:"center", gap:8 };
const countBadge = { background:"#0058ff", color:"#fff", borderRadius:999, padding:"1px 8px", fontSize:10, fontWeight:600, letterSpacing:0 };
const urgencyRow = { display:"flex", gap:8 };
const urgencyBtn = { flex:1, padding:"7px 0", borderRadius:6, border:"1.5px solid", fontSize:12, cursor:"pointer", transition:"all .15s", fontWeight:500 };
const deptGrid   = { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 };
const deptBtn    = { display:"flex", alignItems:"center", gap:7, padding:"8px 10px", borderRadius:6, border:"1px solid", cursor:"pointer", transition:"all .15s", textAlign:"left", position:"relative", background:"#fff" };
const deptIcon   = { fontSize:16, flexShrink:0 };
const deptLabel  = { fontSize:12, lineHeight:1.3, flex:1 };
const checkMark  = { position:"absolute", top:4, right:6, fontSize:10, color:"#0058ff", fontWeight:700 };
const notesArea  = { width:"100%", padding:"8px 10px", borderRadius:6, border:"1px solid #dee2e6", fontSize:13, color:"#212529", resize:"vertical", fontFamily:"inherit", outline:"none", boxSizing:"border-box" };
const actions    = { display:"flex", gap:8, paddingTop:4 };
const cancelBtn  = { flex:1, padding:"8px 0", borderRadius:6, border:"1px solid #dee2e6", background:"#fff", color:"#6c757d", fontSize:13, fontWeight:500, cursor:"pointer" };
const submitBtn  = { flex:2, padding:"8px 0", borderRadius:6, border:"none", background:"#0058ff", color:"#fff", fontSize:13, fontWeight:600, transition:"opacity .15s" };
const optional   = { fontWeight:400, textTransform:"none", letterSpacing:0, color:"#adb5bd", fontSize:11 };
