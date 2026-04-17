import React, { useState, useMemo } from "react";
import EmptyState from "../../shared/ui/EmptyState";
import { ShimmerRow } from "../../shared/ui/Shimmer";

/* ── Assessment type cards ─────────────────────────────── */
const ASSESSMENT_CARDS = [
  { id: "initial",  title: "Initial Assessment",   desc: "Comprehensive assessment for new patient visit",    icon: "📋", accent: "#1D4ED8", tag: "New Patient",    tagBg: "#dbeafe", tagColor: "#1d4ed8" },
  { id: "followup", title: "Follow-up Visit",       desc: "Review progress and adjust treatment plan",         icon: "🔄", accent: "#059669", tag: "Returning",      tagBg: "#d1fae5", tagColor: "#065f46" },
  { id: "progress", title: "Progress Intervention", desc: "Document interventions and track outcomes",         icon: "📈", accent: "#7C3AED", tag: "Ongoing Care",   tagBg: "#ede9fe", tagColor: "#5b21b6" },
  { id: "group",    title: "Group Intervention",    desc: "Record group session and multi-patient notes",      icon: "👥", accent: "#DC2626", tag: "Group Session",  tagBg: "#fee2e2", tagColor: "#991b1b" },
];

/* ── Status palette ────────────────────────────────────── */
const STATUS = {
  new:      { bg: "#ECFDF5", color: "#166534", border: "#A7F3D0", dot: "#22C55E" },
  ongoing:  { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE", dot: "#3B82F6" },
  done:     { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0", dot: "#22C55E" },
  inactive: { bg: "#F8FAFC", color: "#64748B", border: "#E2E8F0", dot: "#94A3B8" },
};

function StatusPill({ status }) {
  const n = (status || "New").trim().toLowerCase();
  const s = STATUS[n] || STATUS.inactive;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
      {n === "new" ? "New" : status}
    </span>
  );
}

function AssessmentCard({ card, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", borderRadius: 14, border: "1px solid #e9ecef", borderTop: `3px solid ${card.accent}`, padding: "22px 22px 18px", cursor: "pointer", transition: "box-shadow .2s, transform .2s", display: "flex", flexDirection: "column", minHeight: 190, boxShadow: hovered ? `0 12px 32px ${card.accent}22` : "0 2px 8px rgba(0,0,0,0.06)", transform: hovered ? "translateY(-3px)" : "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: card.accent + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{card.icon}</div>
        <span style={{ background: card.tagBg, color: card.tagColor, borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{card.tag}</span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{card.title}</div>
      <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, flex: 1 }}>{card.desc}</div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: card.accent }}>Open Assessment</span>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: card.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 700 }}>›</div>
      </div>
    </div>
  );
}

const AVATAR_COLORS = ["#DBEAFE", "#D1FAE5", "#FEF3C7", "#FCE7F3", "#EDE9FE", "#FFEDD5"];

function PatientRow({ patient: p, idx, onStart }) {
  const [hovered, setHovered] = useState(false);
  const initial = ((p.name || p.email || "P")[0] || "P").toUpperCase();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1.8fr 1.2fr 1fr", padding: "14px 20px", alignItems: "center", borderBottom: "1px solid #F1F5F9", background: hovered ? "#F8FAFF" : idx % 2 === 0 ? "#fff" : "#FAFBFC", transition: "background .15s" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: AVATAR_COLORS[initial.charCodeAt(0) % AVATAR_COLORS.length], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#1E40AF", flexShrink: 0 }}>{initial}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{p.name || p.email}</div>
          {(p.age || p.gender) && <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{[p.age && `${p.age} yrs`, p.gender].filter(Boolean).join(" · ")}</div>}
        </div>
      </div>
      <div style={{ fontSize: 13, color: "#6B7280", fontFamily: "monospace" }}>{p.mrn || p.icd || "—"}</div>
      <div><StatusPill status={p.status} /></div>
      <div style={{ textAlign: "right" }}>
        <button onClick={onStart}
          onMouseEnter={e => { e.currentTarget.style.background = "#0058FF"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0058FF"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#0058FF"; e.currentTarget.style.borderColor = "#BFDBFE"; }}
          style={{ background: "#fff", border: "1px solid #2563EB", color: "#2563EB", borderRadius: 999, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .18s" }}>
          Begin assessment
        </button>
      </div>
    </div>
  );
}

/**
 * Common patients page for all departments.
 *
 * Props:
 *   patients        - array of all patients
 *   department      - string department name (used to filter)
 *   onBack          - fn to go back to dashboard
 *   AssessmentComponent - the department's assessment component (receives { patient, mode, onBack })
 *   loading         - optional bool
 */
export default function DepartmentPatients({ patients = [], department, onBack, AssessmentComponent, loading = false }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [assessmentView, setAssessmentView] = useState(null);
  const [search, setSearch] = useState("");

  const deptPatients = useMemo(() =>
    patients.filter(p => !department || (Array.isArray(p.departments) ? p.departments.includes(department) : true)),
    [patients, department]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return !q ? deptPatients : deptPatients.filter(p =>
      (p.name || "").toLowerCase().includes(q) ||
      (p.email || "").toLowerCase().includes(q) ||
      (p.mrn || "").toLowerCase().includes(q)
    );
  }, [deptPatients, search]);

  const handleBack = () => { setAssessmentView(null); setSelectedPatient(null); };
  const handleBackToCards = () => setAssessmentView(null);

  /* ── Assessment view ── */
  if (selectedPatient && assessmentView) {
    if (AssessmentComponent) {
      return (
        <AssessmentComponent
          patient={selectedPatient}
          mode={assessmentView}
          onBack={handleBackToCards}
          onSubmit={handleBackToCards}
        />
      );
    }
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#6b7280" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#374151" }}>{assessmentView === "initial" ? "Initial Assessment" : assessmentView === "followup" ? "Follow-up Visit" : "Intervention"} — Coming Soon</div>
        <div style={{ fontSize: 13, marginTop: 6 }}>This module is under development for {department}.</div>
        <button onClick={handleBackToCards} style={{ marginTop: 20, padding: "9px 20px", borderRadius: 8, border: "1px solid #2563eb", background: "#fff", color: "#2563eb", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Back</button>
      </div>
    );
  }

  /* ── Assessment type selection ── */
  if (selectedPatient) {
    const initials = ((selectedPatient.name || selectedPatient.email || "P").split(" ").map(w => w[0]).join("").slice(0, 2)).toUpperCase();
    return (
      <div style={{ minHeight: "100%", background: "#f5f7fa", fontFamily: "'Inter', system-ui, sans-serif" }}>
        {/* Patient banner */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={() => setSelectedPatient(null)} className="dash-btn-outline" style={{ padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Back</button>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "#fff", fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{initials}</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{selectedPatient.name || selectedPatient.email}</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>
                {[selectedPatient.mrn && `MRN: ${selectedPatient.mrn}`, selectedPatient.age && `${selectedPatient.age} yrs`, selectedPatient.gender, selectedPatient.icd && `ICD: ${selectedPatient.icd}`].filter(Boolean).join("  ·  ")}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>{department}</div>
        </div>
        {/* Cards */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 28px" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>Select Assessment Type</div>
          <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 32 }}>Choose the appropriate assessment for this patient visit</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, width: "100%", maxWidth: 860 }}>
            {ASSESSMENT_CARDS.map(card => (
              <AssessmentCard key={card.id} card={card} onClick={() => setAssessmentView(card.id)} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Patient list ── */
  return (
    <div style={{ padding: "28px 28px 32px", background: "#F2F6FB", minHeight: "100vh", fontFamily: "Inter, Roboto, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={onBack} className="dash-btn-outline" style={{ padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 8px 20px rgba(15,23,42,0.08)" }}>← Back</button>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", margin: "0 0 4px 0" }}>{department} Patients</h1>
            <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>Patient queue for {department}</p>
          </div>
        </div>
        <div style={{ width: "100%", maxWidth: 520, position: "relative", display: "flex", alignItems: "center", background: "#fff", border: "1px solid #D1D5DB", borderRadius: 16, boxShadow: "0 10px 30px rgba(15,23,42,0.08)" }}>
          <svg style={{ position: "absolute", left: 16, pointerEvents: "none" }} width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#64748B" strokeWidth="1.8"/>
            <path d="M12.5 12.5l3 3" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input style={{ width: "100%", padding: "12px 44px", border: "none", borderRadius: 16, fontSize: 13, fontWeight: 500, color: "#111827", background: "transparent", outline: "none" }}
            placeholder="Search patient name, MRN or ICD" value={search} onChange={e => setSearch(e.target.value)} />
          {search && <button style={{ position: "absolute", right: 10, background: "none", border: "none", cursor: "pointer", color: "#64748B", fontSize: 13 }} onClick={() => setSearch("")}>✕</button>}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 28, border: "1px solid #E5E7EB", overflow: "hidden", boxShadow: "0 24px 80px rgba(15,23,42,0.08)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.5fr 2fr 1.2fr 1fr", padding: "18px 24px", background: "#F8FAFC", borderBottom: "1px solid #E6E8F0" }}>
          {["Patient", "MRN / ICD", "Status", "Action"].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.18em" }}>{h}</div>
          ))}
        </div>
        {loading ? Array.from({ length: 5 }, (_, i) => <ShimmerRow key={i} />) :
          filtered.length === 0 ? (
            <EmptyState icon="🧑‍⚕️" title={search ? "No patients match your search" : "No patients assigned"} message={search ? "Try a different name or MRN." : `Patients assigned to ${department} will appear here.`} />
          ) : (
            filtered.map((p, idx) => <PatientRow key={p.id} patient={p} idx={idx} onStart={() => setSelectedPatient(p)} />)
          )
        }
      </div>
      {!loading && filtered.length > 0 && (
        <div style={{ marginTop: 12, fontSize: 12, color: "#94A3B8", textAlign: "right" }}>
          Showing <strong>{filtered.length}</strong> of <strong>{deptPatients.length}</strong> patient{deptPatients.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
