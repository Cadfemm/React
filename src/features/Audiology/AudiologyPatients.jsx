import React, { useState, useEffect, useMemo } from "react";
import AudiologyDepartmentAdultPage    from "./components/AudiologyAdultIA";
import AudiologyDepartmentPediatricPage from "./components/AudiologyPediatricIA";
import AudiologyProgressAssessmentForm from "./components/AudiologyProgress";
import AudiologyGroupAssessmentForm from "./components/AudiologyGroup";
import api from "../../shared/api/apiClient";
import { API_URL } from "../../platform/config/api.config";

/* ── Assessment type cards ── */
const OPTION_CARDS = [
  { id: "initial",  title: "Initial Assessment",    desc: "Full SOAP assessment for new patient",      icon: "📋", color: "#2563EB" },
  { id: "followup", title: "Follow-up Visit",        desc: "Follow-up visit documentation",             icon: "🔄", color: "#059669" },
  { id: "progress", title: "Progress Intervention",  desc: "Track progress and interventions",          icon: "📈", color: "#7C3AED" },
  { id: "group",    title: "Group Intervention",     desc: "Group session documentation",               icon: "👥", color: "#EA580C" },
];

const DEPARTMENT = "Audiology";

/* ── Age-based component selector ── */
function getAssessmentComponent(patient) {
  const age = Number(patient?.age ?? 99);
  return age < 20 ? AudiologyDepartmentPediatricPage : AudiologyDepartmentAdultPage;
}

/* ── Avatar colours ── */
const AVATAR_COLORS = ["#DBEAFE", "#D1FAE5", "#FEF3C7", "#FCE7F3", "#EDE9FE", "#FFEDD5"];

export default function AudiologyPatients({ onBack }) {
  const userRole = localStorage.getItem("userRole") || "";

  const [patients,         setPatients]         = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [search,           setSearch]           = useState("");
  const [selectedPatient,  setSelectedPatient]  = useState(null);
  const [assessmentView,   setAssessmentView]   = useState(null); // "initial" | "followup" | "progress" | "group"

  /* ── Fetch patients from API ── */
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const url = API_URL.PATIENT +
          (['Admin', 'Staff'].includes(userRole)
            ? `?department=${encodeURIComponent(DEPARTMENT)}`
            : '');
        const res = await api.get(url);
        setPatients(res.data.results || []);
      } catch {
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  /* ── Search filter ── */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return patients;
    return patients.filter(p =>
      (p.name  || "").toLowerCase().includes(q) ||
      (p.email || "").toLowerCase().includes(q) ||
      (p.mrn   || "").toLowerCase().includes(q) ||
      (p.icd   || "").toLowerCase().includes(q)
    );
  }, [patients, search]);

  /* ── Step 3: Assessment form ── */
  if (selectedPatient && assessmentView) {
    const Component = getAssessmentComponent(selectedPatient);
    const isAdult   = Component === AudiologyDepartmentAdultPage;

    // progress — dedicated form for both adult and pediatric
    if (assessmentView === "progress") {
      return (
        <AudiologyProgressAssessmentForm
          patient={selectedPatient}
          onSubmit={() => setAssessmentView(null)}
          onBack={() => setAssessmentView(null)}
        />
      );
    }

    // group — coming soon
    if (assessmentView === "group") {
      return (
        <AudiologyGroupAssessmentForm
          patient={selectedPatient}
          onSubmit={() => setAssessmentView(null)}
          onBack={() => setAssessmentView(null)}
        />
      );
    }

    return (
      <Component
        patient={selectedPatient}
        mode={assessmentView}
        onSubmit={() => setAssessmentView(null)}
        onBack={() => setAssessmentView(null)}
      />
    );
  }

  /* ── Step 2: Assessment type cards ── */
  if (selectedPatient) {
    const age     = Number(selectedPatient.age ?? 0);
    const isAdult = age >= 20;
    const initial = (selectedPatient.name || selectedPatient.email || "P")
      .split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const avatarBg = AVATAR_COLORS[initial.charCodeAt(0) % AVATAR_COLORS.length];

    return (
      <div style={S.selectionPage}>
        {/* Patient banner */}
        <div style={S.banner}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button style={S.backBtn} onClick={() => setSelectedPatient(null)}>← Back</button>
            <div style={{ ...S.avatar, background: avatarBg }}>{initial}</div>
            <div>
              <div style={S.patientName}>{selectedPatient.name || selectedPatient.email}</div>
              <div style={S.patientMeta}>
                {[
                  selectedPatient.mrn    && `MRN: ${selectedPatient.mrn}`,
                  selectedPatient.age    && `${selectedPatient.age} yrs`,
                  selectedPatient.gender,
                  selectedPatient.icd    && `ICD: ${selectedPatient.icd}`,
                ].filter(Boolean).join("  ·  ")}
              </div>
            </div>
          </div>
          {/* Age-based routing indicator */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: isAdult ? "#EFF6FF" : "#F0FDF4",
            border: `1px solid ${isAdult ? "#BFDBFE" : "#BBF7D0"}`,
            borderRadius: 999, padding: "6px 14px",
            fontSize: 12, fontWeight: 700,
            color: isAdult ? "#1D4ED8" : "#15803D"
          }}>
            {isAdult ? "🧑 Adult Assessment" : "👶 Pediatric Assessment"}
            <span style={{ fontWeight: 400, opacity: 0.7 }}>
              (Age {selectedPatient.age})
            </span>
          </div>
        </div>

        {/* Cards */}
        <div style={S.selectionBody}>
          <div style={S.selectionHeading}>Select Assessment Type</div>
          <div style={S.selectionSub}>
            Choose the appropriate assessment for this patient visit
          </div>
          <div style={S.cardsGrid}>
            {OPTION_CARDS.map(card => (
              <AssessmentCard
                key={card.id}
                card={card}
                onClick={() => setAssessmentView(card.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Step 1: Patient list ── */
  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.headerRow}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button style={S.backBtn} onClick={onBack}>← Back</button>
          <div>
            <h1 style={S.pageTitle}>Audiology Patients</h1>
            <p style={S.pageSub}>Select a patient to begin assessment</p>
          </div>
        </div>

        {/* Search */}
        <div style={S.searchBox}>
          <svg style={S.searchIcon} width="16" height="16" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#94A3B8" strokeWidth="1.8"/>
            <path d="M12.5 12.5l3 3" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            style={S.searchInput}
            placeholder="Search by name, MRN or ICD…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button style={S.clearBtn} onClick={() => setSearch("")}>✕</button>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={S.tableCard}>
        <div style={S.thead}>
          {["Patient", "MRN / ICD", "Age", "Status", "Action"].map(h => (
            <div key={h} style={S.th}>{h}</div>
          ))}
        </div>

        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ ...S.tr, gap: 12 }}>
              {Array.from({ length: 5 }).map((__, j) => (
                <div key={j} style={{
                  height: 16, borderRadius: 6, background: "#F1F5F9",
                  width: j === 4 ? 80 : "80%",
                  animation: "pulse 1.4s ease-in-out infinite"
                }} />
              ))}
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div style={S.emptyState}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🎧</div>
            <div style={{ fontWeight: 700, color: "#374151", marginBottom: 4 }}>
              {search ? "No patients match your search" : "No patients assigned"}
            </div>
            <div style={{ fontSize: 13, color: "#94A3B8" }}>
              {search ? "Try a different name or MRN." : "Patients assigned to Audiology will appear here."}
            </div>
          </div>
        ) : (
          filtered.map((p, idx) => {
            const age     = Number(p.age ?? 0);
            const isAdult = age >= 20;
            const initial = ((p.name || p.email || "P")[0] || "P").toUpperCase();
            return (
              <div
                key={p.id}
                style={{ ...S.tr, background: idx % 2 === 0 ? "#fff" : "#FAFBFC" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F0F7FF")}
                onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#FAFBFC")}
              >
                {/* Patient */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    ...S.avatar,
                    background: AVATAR_COLORS[initial.charCodeAt(0) % AVATAR_COLORS.length]
                  }}>{initial}</div>
                  <div>
                    <div style={S.tdName}>{p.name || p.email}</div>
                    {p.gender && <div style={S.tdSub}>{p.gender}</div>}
                  </div>
                </div>

                {/* MRN / ICD */}
                <div style={S.tdMuted}>{p.mrn || p.icd || "—"}</div>

                {/* Age + routing badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={S.tdName}>{p.age ? `${p.age} yrs` : "—"}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "2px 7px",
                    borderRadius: 999,
                    background: isAdult ? "#EFF6FF" : "#F0FDF4",
                    color: isAdult ? "#1D4ED8" : "#15803D",
                    border: `1px solid ${isAdult ? "#BFDBFE" : "#BBF7D0"}`
                  }}>
                    {isAdult ? "Adult" : "Pediatric"}
                  </span>
                </div>

                {/* Status */}
                <div><StatusPill status={p.status} /></div>

                {/* Action */}
                <div style={{ textAlign: "right" }}>
                  <button
                    style={S.startBtn}
                    onMouseEnter={e => { e.currentTarget.style.background = "#0058FF"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#2563EB"; }}
                    onClick={() => setSelectedPatient(p)}
                  >
                    Begin →
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {!loading && filtered.length > 0 && (
        <div style={{ marginTop: 10, fontSize: 12, color: "#94A3B8", textAlign: "right" }}>
          Showing <strong>{filtered.length}</strong> of <strong>{patients.length}</strong> patient{patients.length !== 1 ? "s" : ""}
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
    </div>
  );
}

/* ── Status pill ── */
const STATUS_MAP = {
  new:      { bg: "#ECFDF5", color: "#166534", border: "#A7F3D0", dot: "#22C55E" },
  ongoing:  { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE", dot: "#3B82F6" },
  done:     { bg: "#F0FDF4", color: "#15803D", border: "#BBF7D0", dot: "#22C55E" },
  inactive: { bg: "#F8FAFC", color: "#64748B", border: "#E2E8F0", dot: "#94A3B8" },
};
function StatusPill({ status }) {
  const n = (status || "New").trim().toLowerCase();
  const s = STATUS_MAP[n] || STATUS_MAP.inactive;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
      {n === "new" ? "New" : status}
    </span>
  );
}

/* ── Assessment card ── */
function AssessmentCard({ card, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 14,
        border: "1px solid #E9ECEF", borderTop: `3px solid ${card.color}`,
        padding: "22px 22px 18px", cursor: "pointer",
        display: "flex", flexDirection: "column", minHeight: 180,
        transition: "box-shadow .2s, transform .2s",
        boxShadow: hovered ? `0 12px 32px ${card.color}22` : "0 2px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-3px)" : "none"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: card.color + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
          {card.icon}
        </div>
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{card.title}</div>
      <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, flex: 1 }}>{card.desc}</div>
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: card.color }}>Open Assessment</span>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: card.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 700 }}>›</div>
      </div>
    </div>
  );
}

/* ── Styles ── */
const S = {
  page: { padding: "28px 28px 32px", background: "#F2F6FB", minHeight: "100vh", fontFamily: "Inter, Roboto, sans-serif" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, marginBottom: 20 },
  pageTitle: { fontSize: 24, fontWeight: 800, color: "#0F172A", margin: "0 0 4px 0" },
  pageSub:   { fontSize: 13, color: "#475569", margin: 0 },
  backBtn: {
    background: "#fff", border: "1px solid #CBD5E1", padding: "8px 14px",
    borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#374151",
    flexShrink: 0
  },
  searchBox: {
    position: "relative", display: "flex", alignItems: "center",
    background: "#fff", border: "1px solid #D1D5DB", borderRadius: 12,
    maxWidth: 420, width: "100%", boxShadow: "0 2px 8px rgba(15,23,42,0.06)"
  },
  searchIcon:  { position: "absolute", left: 14, pointerEvents: "none" },
  searchInput: { width: "100%", padding: "10px 36px 10px 38px", border: "none", borderRadius: 12, fontSize: 13, color: "#111827", background: "transparent", outline: "none" },
  clearBtn:    { position: "absolute", right: 10, background: "none", border: "none", cursor: "pointer", color: "#94A3B8", fontSize: 14 },
  tableCard: { background: "#fff", borderRadius: 20, border: "1px solid #E5E7EB", overflow: "hidden", boxShadow: "0 8px 32px rgba(15,23,42,0.07)" },
  thead: { display: "grid", gridTemplateColumns: "2.5fr 1.8fr 1.5fr 1.2fr 1fr", padding: "14px 20px", background: "#F8FAFC", borderBottom: "1px solid #E6E8F0" },
  th:    { fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.12em" },
  tr:    { display: "grid", gridTemplateColumns: "2.5fr 1.8fr 1.5fr 1.2fr 1fr", padding: "14px 20px", alignItems: "center", borderBottom: "1px solid #F1F5F9", transition: "background .15s" },
  avatar: { width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#1E40AF", flexShrink: 0 },
  tdName: { fontSize: 15, fontWeight: 700, color: "#111827" },
  tdSub:  { fontSize: 12, color: "#6B7280", marginTop: 2 },
  tdMuted:{ fontSize: 13, color: "#6B7280", fontFamily: "monospace" },
  startBtn: { background: "#fff", border: "1px solid #2563EB", color: "#2563EB", borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .18s" },
  emptyState: { padding: "48px 20px", textAlign: "center", color: "#64748B" },

  /* selection page */
  selectionPage: { display: "flex", flexDirection: "column", minHeight: "100vh", background: "#F5F7FA" },
  banner: { background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },
  patientName: { fontSize: 17, fontWeight: 700, color: "#0F172A" },
  patientMeta: { fontSize: 12, color: "#6B7280", marginTop: 3 },
  selectionBody: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "44px 28px" },
  selectionHeading: { fontSize: 22, fontWeight: 800, color: "#0F172A", marginBottom: 6, textAlign: "center" },
  selectionSub: { fontSize: 14, color: "#6B7280", marginBottom: 36, textAlign: "center" },
  cardsGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, width: "100%", maxWidth: 860 },
};
