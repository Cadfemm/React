import React, { useState, useCallback, useMemo, useEffect } from "react";
import { ShimmerRow } from "../shared/ui/Shimmer";
import EmptyState from "../shared/ui/EmptyState";
import api from "../shared/api/apiClient"
import { API_URL } from "../platform/config/api.config";

// Assessment
import OptometryAssessment from "./Optometry/components/OptometryAssessment";
import PsychologyAssessment from "./Psychology/components/PsychologyAssessment";
import PsychologyFollowUpAssessment from "./Psychology/components/PsychologyFollowupAssessment";

/* ── Status palette ─────────────────────────────────────────────────────── */
const STATUS = {
  new:      { bg: "#ECFDF5", color: "#166534", border: "#A7F3D0", dot: "#22C55E" },
  ongoing:  { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE", dot: "#3B82F6" },
  done:     { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0", dot: "#22C55E" },
  inactive: { bg: "#F8FAFC", color: "#64748B", border: "#E2E8F0", dot: "#94A3B8" },
};

function StatusPill({ status }) {
  const normalized = (status || "New").trim().toLowerCase();
  const s = STATUS[normalized] || STATUS.inactive;
  const label = normalized === "new" ? "New" : (status || "Unknown");
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "6px 12px", borderRadius: 999,
      fontSize: 12, fontWeight: 700, letterSpacing: "0.15px",
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      boxShadow: "0 6px 12px rgba(15,23,42,0.035)",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {label}
    </span>
  );
}

/* ── Option cards ───────────────────────────────────────────────────────── */
const OPTION_CARDS = [
  {
    id: "initial",  title: "Initial Assessment",
    desc: "Comprehensive SOAP assessment for new patient visit",
    icon: "📋", accent: "#1D4ED8",
    tag: "New Patient", tagColor: "#dbeafe", tagText: "#1d4ed8",
  },
  {
    id: "followup", title: "Follow-up Visit",
    desc: "Review progress, update findings and adjust treatment plan",
    icon: "🔄", accent: "#059669",
    tag: "Returning", tagColor: "#d1fae5", tagText: "#065f46",
  },
  {
    id: "progress", title: "Progress Intervention",
    desc: "Document clinical interventions and track patient outcomes",
    icon: "📈", accent: "#7C3AED",
    tag: "Ongoing Care", tagColor: "#ede9fe", tagText: "#5b21b6",
  },
  {
    id: "group",    title: "Group Intervention",
    desc: "Record group therapy session and multi-patient documentation",
    icon: "👥", accent: "#DC2626",
    tag: "Group Session", tagColor: "#fee2e2", tagText: "#991b1b",
  },
];

export default function Patients({ Department, onBack, loading = false }) {
  const userRole = localStorage.getItem("userRole") || "";
  const [selectedPatient,      setSelectedPatient]      = useState(null);
  const [assessmentView,       setAssessmentView]       = useState(null);
  const [submittedAssessments, setSubmittedAssessments] = useState({});
  const [submittedFollowups,   setSubmittedFollowups]   = useState({});
  const [search,               setSearch]               = useState("");
  const [patients,             setPatients]             = useState([])

  const handleBackToPatients = useCallback(() => { setSelectedPatient(null); setAssessmentView(null); }, []);
  const handleBackToCards    = useCallback(() => setAssessmentView(null), []);
  const handleInitialSubmit  = useCallback((v) => setSubmittedAssessments(p => ({ ...p, [selectedPatient.id]: v })), [selectedPatient]);
  const handleFollowupSubmit = useCallback((v) => setSubmittedFollowups(p => ({ ...p, [selectedPatient.id]: v })), [selectedPatient]);

  /* Fetch patients department wise */
  useEffect(() => {
    const fetchPatients = async () => {
      try{
        const res = await api.get(
          API_URL.PATIENT + (['Admin', 'Staff'].includes(userRole)? `?department=${Department}`:'')
        )
        setPatients(res.data.results);
      } catch(e){
        setPatients([]);
      }
    }
    fetchPatients();
  }, [])

  /* hooks must be before early returns */
  const filtered = useMemo(() => patients.filter(p => {
    const q = search.toLowerCase();
    return !q || (p.name||"").toLowerCase().includes(q) || (p.email||"").toLowerCase().includes(q) || (p.mrn||"").toLowerCase().includes(q);
  }), [patients, search]);

  /* ── Assessment views ── */
  if (selectedPatient && assessmentView === "initial") {
    const saved = submittedAssessments[selectedPatient.id] ?? null;
    if (Department === 'optometry') {
      return <OptometryAssessment patient={selectedPatient} mode="initial" savedValues={saved} readOnly={!!saved} onSubmit={handleInitialSubmit} onBack={handleBackToCards} />;
    } else if (Department === 'psychology') {
      return (
        <PsychologyAssessment
          patient={selectedPatient}
          mode="initial" 
          savedValues={saved} 
          readOnly={!!saved} 
          onSubmit={handleInitialSubmit} 
          onBack={handleBackToCards}
        />
      );
    }
    
  }
  if (selectedPatient && assessmentView === "followup") {
    const saved = submittedFollowups[selectedPatient.id] ?? null;
    if (Department === 'optometry') {
      return <OptometryAssessment patient={selectedPatient} mode="followup" savedValues={saved} readOnly={!!saved} onSubmit={handleFollowupSubmit} onBack={handleBackToCards} />;
    } else if (Department === 'psychology') {
      return (
        <PsychologyFollowUpAssessment
          patient={selectedPatient}
          mode="initial" 
          savedValues={saved} 
          readOnly={!!saved} 
          onSubmit={handleInitialSubmit} 
          onBack={handleBackToCards}
        />
      );
    }
  }
  if (selectedPatient && (assessmentView === "progress" || assessmentView === "group")) {
    const card = OPTION_CARDS.find(c => c.id === assessmentView);
    return (
      <div style={S.page}>
        <PageHeader title={card.title} sub={`Patient: ${selectedPatient.name || selectedPatient.email}`} onBack={handleBackToCards} backLabel="← Back" />
        <EmptyState icon={card.icon} title={`${card.title} — Coming Soon`} message="This module is under development." action={{ label: "← Back to Options", onClick: handleBackToCards }} />
      </div>
    );
  }

  /* ── Assessment type selection ── */
  if (selectedPatient) {
    const initials = ((selectedPatient.name || selectedPatient.email || "P")
      .split(" ").map(w => w[0]).join("").slice(0, 2)).toUpperCase();
    return (
      <div style={S.selectionPage}>

        {/* ── Top bar ── */}
        <div style={S.patientBanner}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button style={S.headerBackBtn} onClick={handleBackToPatients}>← Back</button>
            <div style={S.patientAvatar}>{initials}</div>
            <div>
              <div style={S.patientName}>{selectedPatient.name || selectedPatient.email}</div>
              <div style={S.patientMeta}>
                {[
                  selectedPatient.mrn && `MRN: ${selectedPatient.mrn}`,
                  selectedPatient.age && `${selectedPatient.age} yrs`,
                  selectedPatient.gender,
                  selectedPatient.icd && `ICD: ${selectedPatient.icd}`,
                ].filter(Boolean).join("  ·  ")}
              </div>
            </div>
          </div>
          <div style={S.patientBannerRight}>
            <div style={S.bannerStat}>
              <div style={S.bannerStatVal}>3</div>
              <div style={S.bannerStatLabel}>Previous Visits</div>
            </div>
            <div style={S.bannerDivider} />
            <div style={S.bannerStat}>
              <div style={S.bannerStatVal}>Apr 2026</div>
              <div style={S.bannerStatLabel}>Last Visit</div>
            </div>
            <div style={S.bannerDivider} />
            <div style={S.bannerStat}>
              <div style={{ ...S.bannerStatVal, color: "#10b981" }}>Active</div>
              <div style={S.bannerStatLabel}>Status</div>
            </div>

          </div>
        </div>

        {/* ── Body ── */}
        <div style={S.selectionBody}>
          <div style={S.selectionHeading}>Select Assessment Type</div>
          <div style={S.selectionSubheading}>
            Choose the appropriate assessment for this patient visit
          </div>

          <div style={S.cardsGrid}>
            {OPTION_CARDS.map(card => (
              <AssessmentCard key={card.id} card={card} onClick={() => setAssessmentView(card.id)} />
            ))}
          </div>
        </div>

      </div>
    );
  }

  /* ── Patient list ── */
  return (
    <div style={S.page}>
      <div style={S.headerRow}>
        <div style={S.headerTitleRow}>
          <button style={S.headerBackBtn} onClick={onBack}>&lt;</button>
          <div>
            <h1 style={S.pageTitle}>Patients</h1>
            <p style={S.pageSub}>Premium optometry patient queue</p>
          </div>
        </div>

        <div style={S.headerActions}>
          <div style={S.searchBox}>
            <svg style={S.searchIcon} width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="6" stroke="#64748B" strokeWidth="1.8"/>
              <path d="M12.5 12.5l3 3" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              style={S.searchInput}
              placeholder="Search patient name, MRN or ICD"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button style={S.clearBtn} onClick={() => setSearch("")}>✕</button>
            )}
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div style={S.tableCard}>
        {/* Header */}
        <div style={S.thead}>
          <div style={S.th}>Patient</div>
          <div style={S.th}>MRN / ICD</div>
          <div style={S.th}>Status</div>
          <div style={{ ...S.th, textAlign: "right" }}>Action</div>
        </div>

        {/* Body */}
        {loading ? (
          Array.from({ length: 5 }, (_, i) => <ShimmerRow key={i} />)
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="🧑‍⚕️"
            title={search ? "No patients match your search" : "No patients assigned"}
            message={search ? "Try a different name or MRN." : "Patients assigned to you will appear here once registered."}
          />
        ) : (
          filtered.map((p, idx) => (
            <PatientRow
              key={p.id}
              patient={p}
              idx={idx}
              onStart={() => setSelectedPatient(p)}
            />
          ))
        )}
      </div>

      {/* Footer count */}
      {!loading && filtered.length > 0 && (
        <div style={S.footerCount}>
          Showing <strong>{filtered.length}</strong> of <strong>{patients.length}</strong> patient{patients.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function PageHeader({ title, sub, onBack, backLabel }) {
  return (
    <div style={S.pageHeader}>
      <div>
        <h1 style={S.pageTitle}>{title}</h1>
        {sub && <p style={S.pageSub}>{sub}</p>}
      </div>
      <button
        style={S.backBtn}
        onMouseEnter={e => e.currentTarget.style.background = "#F1F5F9"}
        onMouseLeave={e => e.currentTarget.style.background = "#fff"}
        onClick={onBack}
      >
        {backLabel}
      </button>
    </div>
  );
}

function PatientRow({ patient: p, idx, onStart }) {
  const [hovered, setHovered] = useState(false);
  const initial = ((p.name || p.email || "P")[0] || "P").toUpperCase();
  return (
    <div
      style={{
        ...S.tr,
        background: hovered ? "#F8FAFF" : idx % 2 === 0 ? "#fff" : "#FAFBFC",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Patient */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ ...S.avatar, background: AVATAR_COLORS[initial.charCodeAt(0) % AVATAR_COLORS.length] }}>
          {initial}
        </div>
        <div>
          <div style={S.tdName}>{p.name || p.email}</div>
          {(p.age || p.gender) && (
            <div style={S.tdSub}>{[p.age && `${p.age} yrs`, p.gender].filter(Boolean).join(" · ")}</div>
          )}
        </div>
      </div>

      {/* MRN */}
      <div style={S.tdMuted}>{p.mrn || p.icd || "—"}</div>

      {/* Status */}
      <div><StatusPill status={p.status} /></div>

      {/* Action */}
      <div style={{ textAlign: "right" }}>
        <button
          style={S.startBtn}
          onMouseEnter={e => { e.currentTarget.style.background = "#0058FF"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#0058FF"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#0058FF"; e.currentTarget.style.borderColor = "#BFDBFE"; }}
          onClick={onStart}
        >
          Begin assessment
        </button>
      </div>
    </div>
  );
}

function AssessmentCard({ card, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...S.card,
        boxShadow: hovered ? `0 16px 40px ${card.accent}25` : "0 2px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "none",
        borderTop: `3px solid ${card.accent}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ ...S.cardIconWrap, background: card.accent + "12", color: card.accent }}>
          <span style={{ fontSize: 22 }}>{card.icon}</span>
        </div>
        <span style={{ ...S.cardTag, background: card.tagColor, color: card.tagText }}>
          {card.tag}
        </span>
      </div>

      {/* Title */}
      <div style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{card.title}</div>

      {/* Description */}
      <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, flex: 1 }}>{card.desc}</div>

      {/* Footer */}
      <div style={{
        marginTop: 20, paddingTop: 14,
        borderTop: "1px solid #f3f4f6",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: card.accent }}>Open Assessment</span>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: card.accent, display: "flex",
          alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 16, fontWeight: 700,
          transition: "transform .2s",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}>›</div>
      </div>
    </div>
  );
}

/* ── Avatar color palette ───────────────────────────────────────────────── */
const AVATAR_COLORS = ["#DBEAFE", "#D1FAE5", "#FEF3C7", "#FCE7F3", "#EDE9FE", "#FFEDD5"];

/* ── Styles ─────────────────────────────────────────────────────────────── */
const S = {
  page:       { padding: "28px 28px 32px", background: "#F2F6FB", minHeight: "100vh", fontFamily: "Inter, Roboto, sans-serif" },

  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 },
  pageTitle:  { fontSize: 24, fontWeight: 800, color: "#0F172A", margin: "0 0 4px 0", lineHeight: 1.12 },
  pageSub:    { fontSize: 13, color: "#475569", margin: 0, opacity: 0.92 },
  headerBackBtn: {
    background: "#fff",
    border: "1px solid #D1D5DB",
    color: "#0F172A",
    borderRadius: 999,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(15,23,42,0.08)",
    transition: "background .15s, transform .15s",
  },
  backBtn:    {
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "#fff", border: "1px solid #E2E8F0",
    color: "#475569", borderRadius: 8,
    padding: "8px 16px", fontSize: 13, fontWeight: 500,
    cursor: "pointer", whiteSpace: "nowrap",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    transition: "background .15s",
  },

  /* toolbar */
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  headerTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  headerActions: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    maxWidth: 520,
  },
  controls: { display: "flex", gap: 12, marginBottom: 18, alignItems: "flex-end", flexWrap: "wrap" },
  searchBox:    {
    width: "100%",
    maxWidth: 520,
    minWidth: 260,
    position: "relative",
    display: "flex", alignItems: "center",
    background: "#fff", border: "1px solid #D1D5DB",
    borderRadius: 16, boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
  },
  searchIcon:   { position: "absolute", left: 16, pointerEvents: "none", flexShrink: 0, color: "#94A3B8" },
  searchInput:  {
    width: "100%", padding: "12px 44px 12px 44px",
    border: "none", borderRadius: 16,
    fontSize: 13, fontWeight: 500, color: "#111827", background: "transparent",
    outline: "none", boxSizing: "border-box",
  },
  clearBtn:     { position: "absolute", right: 10, background: "none", border: "none", cursor: "pointer", color: "#64748B", fontSize: 13, padding: 2 },

  /* table */
  tableCard:  {
    background: "#fff", borderRadius: 28,
    border: "1px solid #E5E7EB", overflow: "hidden",
    boxShadow: "0 24px 80px rgba(15,23,42,0.08)",
  },
  thead:      {
    display: "grid", gridTemplateColumns: "2.5fr 2fr 1.2fr 1fr",
    padding: "18px 24px", background: "#F8FAFC",
    borderBottom: "1px solid #E6E8F0",
  },
  th:         { fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.18em" },
  tr:         {
    display: "grid", gridTemplateColumns: "2.5fr 1.8fr 1.2fr 1fr",
    padding: "14px 20px", alignItems: "center",
    borderBottom: "1px solid #F1F5F9",
    transition: "background .15s, transform .15s",
  },

  avatar:     {
    width: 32, height: 32, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 700, color: "#1E40AF", flexShrink: 0,
  },
  tdName:     { fontSize: 15, fontWeight: 700, color: "#111827" },
  tdSub:      { fontSize: 12, color: "#6B7280", marginTop: 4, lineHeight: 1.4 },
  tdMuted:    { fontSize: 13, color: "#6B7280", fontFamily: "monospace" },

  startBtn:   {
    background: "#fff", border: "1px solid #2563EB",
    color: "#2563EB", borderRadius: 999,
    padding: "8px 18px", fontSize: 13, fontWeight: 700,
    cursor: "pointer", transition: "transform .18s, box-shadow .18s, background .18s, color .18s",
    boxShadow: "0 10px 24px rgba(37,99,235,0.12)",
  },

  footerCount: { marginTop: 12, fontSize: 12, color: "#94A3B8", textAlign: "right" },

  /* cards */
  selectionPage: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "calc(100vh - 56px)",
    background: "#f5f7fa",
  },
  patientBanner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    padding: "16px 28px",
    flexWrap: "wrap",
    gap: 16,
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  patientAvatar: {
    width: 44, height: 44, borderRadius: 10,
    background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
    color: "#fff", fontSize: 15, fontWeight: 800,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, letterSpacing: "0.5px",
  },
  patientName: { fontSize: 17, fontWeight: 700, color: "#0f172a" },
  patientMeta: { fontSize: 12, color: "#6b7280", marginTop: 3 },
  patientBannerRight: { display: "flex", alignItems: "center", gap: 24 },
  bannerStat: { textAlign: "center" },
  bannerStatVal: { fontSize: 15, fontWeight: 700, color: "#111827" },
  bannerStatLabel: { fontSize: 11, color: "#9ca3af", marginTop: 2 },
  bannerDivider: { width: 1, height: 30, background: "#e5e7eb" },
  selectionBody: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 28px",
  },
  selectionHeading: {
    fontSize: 22, fontWeight: 700, color: "#0f172a",
    marginBottom: 6, textAlign: "center",
  },
  selectionSubheading: {
    fontSize: 14, color: "#6b7280",
    marginBottom: 32, textAlign: "center",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 18,
    width: "100%",
    maxWidth: 860,
  },
  card: {
    background: "#fff",
    border: "1px solid #e9ecef",
    borderRadius: 14,
    padding: "22px 22px 18px",
    cursor: "pointer",
    transition: "box-shadow .2s, transform .2s",
    display: "flex", flexDirection: "column",
    minHeight: 200,
  },
  cardTag: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
  },
  cardIconWrap: {
    width: 46, height: 46, borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
};
