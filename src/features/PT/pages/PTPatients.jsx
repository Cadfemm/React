import React, { useState, useMemo } from "react";
import PTPatientDetails from "../components/PatientDetails";

/* ── Assessment type cards ── */
const ASSESSMENT_TYPES = [
  { id: "initial",  title: "Initial Assessment",   desc: "Comprehensive assessment for new patient visit",  icon: "📋", accent: "#1D4ED8", tag: "New Patient",   tagBg: "#dbeafe", tagColor: "#1d4ed8" },
  { id: "followup", title: "Re-assessment",         desc: "Reassess progress and update the treatment plan", icon: "🔄", accent: "#059669", tag: "Returning",     tagBg: "#d1fae5", tagColor: "#065f46" },
  { id: "progress", title: "Progress Intervention", desc: "Document interventions and track outcomes",       icon: "📈", accent: "#7C3AED", tag: "Ongoing Care",  tagBg: "#ede9fe", tagColor: "#5b21b6" },
  { id: "group",    title: "Group Intervention",    desc: "Record group session and multi-patient notes",    icon: "👥", accent: "#DC2626", tag: "Group Session", tagBg: "#fee2e2", tagColor: "#991b1b" },
];

/* ── Assessment card ── */
function AssessmentCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 14,
        border: "1px solid #e9ecef",
        borderTop: `3px solid ${item.accent}`,
        padding: "22px 22px 18px", cursor: "pointer",
        transition: "box-shadow .2s, transform .2s",
        display: "flex", flexDirection: "column", minHeight: 190,
        boxShadow: hovered ? `0 12px 32px ${item.accent}22` : "0 2px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: item.accent + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
          {item.icon}
        </div>
        <span style={{ background: item.tagBg, color: item.tagColor, borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
          {item.tag}
        </span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{item.title}</div>
      <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, flex: 1 }}>{item.desc}</div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: item.accent }}>Open Assessment</span>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: item.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 700 }}>›</div>
      </div>
    </div>
  );
}

/* ── Patient row ── */
const AVATAR_COLORS = ["#DBEAFE","#D1FAE5","#FEF3C7","#FCE7F3","#EDE9FE","#FFEDD5"];

function PatientRow({ patient: p, idx, onStart }) {
  const [hovered, setHovered] = useState(false);
  const initial = ((p.name || "P")[0] || "P").toUpperCase();
  const STATUS = {
    new:      { bg: "#ECFDF5", color: "#166534", border: "#A7F3D0", dot: "#22C55E" },
    ongoing:  { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE", dot: "#3B82F6" },
    done:     { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0", dot: "#22C55E" },
    inactive: { bg: "#F8FAFC", color: "#64748B", border: "#E2E8F0", dot: "#94A3B8" },
  };
  const n = (p.status || "new").trim().toLowerCase();
  const s = STATUS[n] || STATUS.inactive;

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "2.5fr 1.8fr 1.2fr 1fr", padding: "14px 20px", alignItems: "center", borderBottom: "1px solid #F1F5F9", background: hovered ? "#F8FAFF" : idx % 2 === 0 ? "#fff" : "#FAFBFC", transition: "background .15s" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: AVATAR_COLORS[initial.charCodeAt(0) % AVATAR_COLORS.length], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#1E40AF", flexShrink: 0 }}>
          {initial}
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{p.name}</div>
          {(p.age || p.sex) && <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{[p.age && `${p.age} yrs`, p.sex].filter(Boolean).join(" · ")}</div>}
        </div>
      </div>
      <div style={{ fontSize: 13, color: "#6B7280", fontFamily: "monospace" }}>{p.mrn || p.icd || "—"}</div>
      <div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
          {n === "new" ? "New" : p.status}
        </span>
      </div>
      <div style={{ textAlign: "right" }}>
        <button
          onClick={onStart}
          onMouseEnter={e => { e.currentTarget.style.background = "#0058FF"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0058FF"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#2563EB"; e.currentTarget.style.borderColor = "#BFDBFE"; }}
          style={{ background: "#fff", border: "1px solid #2563EB", color: "#2563EB", borderRadius: 999, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .18s" }}
        >
          Begin assessment
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   Flow:
   1. Patient list → click "Begin assessment"
   2. Select Assessment Type (Initial / Re-assessment / Progress / Group)
   3. PTPatientDetails opens with condition tabs
      (Spinal Cord Injury | Neurology | Hydrotherapy | MSK | Conditioning | Cardio | Amputee)
      Each tab shows the assessment in the selected mode
══════════════════════════════════════════════════════════ */
export default function PTPatients({ patients = [], Patients, onBack }) {
  const allPatients = patients.length ? patients : (Patients || []);
  const [search, setSearch]                   = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [assessmentType, setAssessmentType]   = useState(null);

  const filtered = useMemo(() =>
    allPatients.filter(p =>
      !search ||
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.icd  || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.mrn  || "").toLowerCase().includes(search.toLowerCase())
    ),
    [allPatients, search]
  );

  /* ── STEP 3: Show PTPatientDetails with condition tabs + assessment type ── */
  if (selectedPatient && assessmentType) {
    return (
      <PTPatientDetails
        patient={selectedPatient}
        assessmentType={assessmentType}
        onBack={() => setAssessmentType(null)}
      />
    );
  }

  /* ── STEP 2: Select Assessment Type ── */
  if (selectedPatient && !assessmentType) {
    return (
      <div style={page}>
        <div style={pageHeader}>
          <div>
            <h1 style={pageTitle}>Select Assessment Type</h1>
            <p style={pageSubtitle}>Choose the appropriate assessment for this patient visit</p>
          </div>
          <button type="button" style={backBtnStyle} onClick={() => setSelectedPatient(null)}>
            ← Back to Patients
          </button>
        </div>
        <div style={cardsGrid}>
          {ASSESSMENT_TYPES.map(t => (
            <AssessmentCard key={t.id} item={t} onClick={() => setAssessmentType(t.id)} />
          ))}
        </div>
      </div>
    );
  }

  /* ── STEP 1: Patient list ── */
  return (
    <div style={page}>
      <div style={pageHeader}>
        <div>
          <h1 style={pageTitle}>Physiotherapy Patients</h1>
          <p style={pageSubtitle}>Patient queue for Physiotherapy</p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={searchWrap}>
            <span style={{ color: "#9ca3af", fontSize: 16 }}>🔍</span>
            <input
              style={searchInput}
              placeholder="Search patient name, MRN or ICD"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {typeof onBack === "function" && (
            <button type="button" style={backBtnStyle} onClick={onBack}>← Back</button>
          )}
        </div>
      </div>

      <div style={tableWrap}>
        <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1.8fr 1.2fr 1fr", padding: "10px 20px", background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
          {["PATIENT","MRN / ICD","STATUS","ACTION"].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: "0.06em" }}>{h}</div>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>No patients found</div>
        ) : (
          filtered.map((p, i) => (
            <PatientRow key={p.id || i} patient={p} idx={i} onStart={() => setSelectedPatient(p)} />
          ))
        )}
      </div>
    </div>
  );
}

/* ── Styles ── */
const page        = { padding: "24px 28px", fontFamily: "Inter, system-ui", background: "#f8fafc", minHeight: "100vh" };
const pageHeader  = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 };
const pageTitle   = { margin: 0, fontSize: 22, fontWeight: 800, color: "#111827" };
const pageSubtitle = { margin: "4px 0 0", fontSize: 13, color: "#6b7280" };
const backBtnStyle = { background: "none", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer" };
const searchWrap  = { display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "8px 14px", minWidth: 300 };
const searchInput = { border: "none", outline: "none", fontSize: 14, color: "#111827", background: "transparent", width: "100%" };
const tableWrap   = { background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" };
const cardsGrid   = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 };
