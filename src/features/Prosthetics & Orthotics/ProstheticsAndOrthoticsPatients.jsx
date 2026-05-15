
import React, { useState, useEffect, useMemo } from "react";
import api from "../../shared/api/apiClient";
import { API_URL } from "../../platform/config/api.config";
import OrthoticsAssessment from "./ProstheticsAndOrthoticsAssessments";
import OrthoticsFollowUp   from "./ProstheticsAndOrthoticsFollowUp";
import WheelchairAssessment from "./WheelchairAssessment";
import ThreeDAssessment from "./ThreeDAssessment";

const ASSESSMENT_CARDS = [
  { id: "initial",  title: "Initial Assessment",    desc: "Comprehensive assessment for new patient visit",   icon: "📋", accent: "#1D4ED8", tag: "New Patient",   tagBg: "#dbeafe", tagColor: "#1d4ed8" },
  { id: "followup", title: "Follow-up Visit",        desc: "Review progress and adjust treatment plan",        icon: "🔄", accent: "#059669", tag: "Returning",     tagBg: "#d1fae5", tagColor: "#065f46" },
  { id: "progress", title: "Progress Intervention",  desc: "Document interventions and track outcomes",        icon: "📈", accent: "#7C3AED", tag: "Ongoing Care",  tagBg: "#ede9fe", tagColor: "#5b21b6" },
  { id: "group",    title: "Group Intervention",     desc: "Record group session and multi-patient notes",     icon: "👥", accent: "#DC2626", tag: "Group Session", tagBg: "#fee2e2", tagColor: "#991b1b" },
];

const AVATAR_COLORS = ["#DBEAFE", "#D1FAE5", "#FEF3C7", "#FCE7F3", "#EDE9FE", "#FFEDD5"];

const CARD_META = {
  "Wheelchair":      { icon: "🦽", label: "Wheelchair Assessment", color: "#0EA5E9" },
  "3D":              { icon: "🧊", label: "3D Assessment",          color: "#8B5CF6" },
  "My Appointments": { icon: "📅", label: "Appointments",           color: "#2563EB" },
};

const DEPARTMENT = "Prosthetics & Orthotics";

/* ── Assessment type card ── */
function AssessmentTypeCard({ card, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #E9ECEF",
        borderTop: `3px solid ${card.accent}`,
        padding: "22px 22px 18px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        minHeight: 190,
        transition: "box-shadow .2s, transform .2s",
        boxShadow: hovered ? `0 12px 32px ${card.accent}22` : "0 2px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-3px)" : "none"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: card.accent + "12",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
        }}>{card.icon}</div>
        <span style={{
          background: card.tagBg, color: card.tagColor,
          borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700
        }}>{card.tag}</span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{card.title}</div>
      <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, flex: 1 }}>{card.desc}</div>
      <div style={{
        marginTop: 18, paddingTop: 14, borderTop: "1px solid #F3F4F6",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: card.accent }}>Open Assessment</span>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", background: card.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 16, fontWeight: 700
        }}>›</div>
      </div>
    </div>
  );
}

export default function ProstheticsAndOrthoticsPatients({ selectedCard, onBack }) {
  const [tab, setTab]                         = useState("new");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [assessmentMode, setAssessmentMode]   = useState(null); // initial | followup | progress | group
  const [patients, setPatients]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [search, setSearch]                   = useState("");

  const userRole = localStorage.getItem("userRole") || "";

  /* ── Fetch patients from API ── */
  useEffect(() => {
    const fetchPatients = async () => {
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
    fetchPatients();
  }, []);

  /* ── Filter by tab + search ── */
  const newPatients      = useMemo(() => patients.filter(p => (p.status || "").toLowerCase() !== "old"), [patients]);
  const existingPatients = useMemo(() => patients.filter(p => (p.status || "").toLowerCase() === "old"), [patients]);
  const baseList         = tab === "new" ? newPatients : existingPatients;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return baseList;
    return baseList.filter(p =>
      (p.name  || "").toLowerCase().includes(q) ||
      (p.email || "").toLowerCase().includes(q) ||
      (p.mrn   || "").toLowerCase().includes(q) ||
      (p.icd   || "").toLowerCase().includes(q)
    );
  }, [baseList, search]);

  const meta = CARD_META[selectedCard] || { icon: "📋", label: "Assessment", color: "#2563EB" };

  /* ── Step 3: Assessment form ── */
  if (selectedPatient && assessmentMode) {
    if (selectedCard === "Wheelchair") {
      return <WheelchairAssessment patient={selectedPatient} onBack={() => setAssessmentMode(null)} />;
    }
    if (selectedCard === "3D") {
      return <ThreeDAssessment patient={selectedPatient} onBack={() => setAssessmentMode(null)} />;
    }
    // Follow-up → dedicated follow-up form
    if (assessmentMode === "followup") {
      return (
        <OrthoticsFollowUp
          patient={selectedPatient}
          onBack={() => setAssessmentMode(null)}
          onSubmit={() => setAssessmentMode(null)}
        />
      );
    }
    // Initial / Progress / Group → main assessment form with mode passed
    return (
      <OrthoticsAssessment
        patient={selectedPatient}
        mode={assessmentMode}
        onBack={() => setAssessmentMode(null)}
      />
    );
  }

  /* ── Step 2: Assessment type selection (My Appointments only) ── */
  if (selectedPatient && selectedCard === "My Appointments") {
    const initials = (selectedPatient.name || selectedPatient.email || "P")
      .split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const avatarBg = AVATAR_COLORS[initials.charCodeAt(0) % AVATAR_COLORS.length];

    return (
      <div style={{ minHeight: "100vh" }}>
        {/* Patient banner */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #E5E7EB",
          padding: "16px 28px", display: "flex", justifyContent: "space-between",
          alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              onClick={() => setSelectedPatient(null)}
              style={{
                padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                cursor: "pointer", background: "#fff", border: "1px solid #CBD5E1", color: "#374151"
              }}
            >← Back</button>
            <div style={{
              width: 44, height: 44, borderRadius: 10, background: avatarBg,
              color: "#1E40AF", fontSize: 15, fontWeight: 800,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>{initials}</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}>
                {selectedPatient.name || selectedPatient.email}
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>
                {[
                  selectedPatient.mrn  && `MRN: ${selectedPatient.mrn}`,
                  selectedPatient.age  && `${selectedPatient.age} yrs`,
                  selectedPatient.gender,
                  selectedPatient.icd  && `ICD: ${selectedPatient.icd}`
                ].filter(Boolean).join("  ·  ")}
              </div>
            </div>
          </div>
          <div style={{
            fontSize: 12, fontWeight: 600, color: "#64748B",
            background: "#F1F5F9", padding: "4px 12px", borderRadius: 999
          }}>
            Prosthetics &amp; Orthotics
          </div>
        </div>

        {/* Card grid */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "44px 28px" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
            Select Assessment Type
          </div>
          <div style={{ fontSize: 14, color: "#6B7280", marginBottom: 36 }}>
            Choose the appropriate assessment for this patient visit
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20, width: "100%", maxWidth: 860
          }}>
            {ASSESSMENT_CARDS.map(card => (
              <AssessmentTypeCard
                key={card.id}
                card={card}
                onClick={() => setAssessmentMode(card.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Step 1 (Wheelchair / 3D): go straight to assessment on patient click ── */
  if (selectedPatient) {
    if (selectedCard === "Wheelchair") {
      return <WheelchairAssessment patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
    }
    if (selectedCard === "3D") {
      return <ThreeDAssessment patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;
    }
  }

  return (
    <div style={styles.page}>
      {/* ================= HEADER ================= */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: `${meta.color}18`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, flexShrink: 0
          }}>
            {meta.icon}
          </div>
          <div>
            <h1 style={styles.title}>{meta.label}</h1>
            <p style={styles.subtitle}>
              Select a patient to open their {meta.label.toLowerCase()} form
            </p>
          </div>
        </div>
        <button style={styles.backBtn} onClick={onBack}>
          ← Back to Dashboard
        </button>
      </div>

      {/* ================= ASSESSMENT TYPE PILL ================= */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: `${meta.color}12`, border: `1px solid ${meta.color}40`,
        borderRadius: 999, padding: "5px 14px", marginBottom: 20,
        fontSize: 13, fontWeight: 600, color: meta.color
      }}>
        <span>{meta.icon}</span>
        {meta.label}
      </div>

      {/* ================= SEARCH ================= */}
      <div style={{
        position: "relative", display: "flex", alignItems: "center",
        background: "#fff", border: "1px solid #D1D5DB", borderRadius: 12,
        marginBottom: 20, maxWidth: 480,
        boxShadow: "0 2px 8px rgba(15,23,42,0.06)"
      }}>
        <svg style={{ position: "absolute", left: 14, pointerEvents: "none" }}
          width="16" height="16" viewBox="0 0 18 18" fill="none">
          <circle cx="8" cy="8" r="6" stroke="#94A3B8" strokeWidth="1.8"/>
          <path d="M12.5 12.5l3 3" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <input
          style={{
            width: "100%", padding: "10px 36px 10px 38px",
            border: "none", borderRadius: 12, fontSize: 13,
            color: "#111827", background: "transparent", outline: "none"
          }}
          placeholder="Search by name, MRN or ICD…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            style={{ position: "absolute", right: 10, background: "none", border: "none", cursor: "pointer", color: "#94A3B8", fontSize: 14 }}
          >✕</button>
        )}
      </div>

      {/* ================= TABS ================= */}
      <div style={styles.tabs}>
        <button
          style={{ ...styles.tab, ...(tab === "new" ? styles.activeTab(meta.color) : {}) }}
          onClick={() => setTab("new")}
        >
          New Patients
          <span style={{
            marginLeft: 6, fontSize: 11, fontWeight: 700,
            background: tab === "new" ? `${meta.color}18` : "#F1F5F9",
            color: tab === "new" ? meta.color : "#94A3B8",
            borderRadius: 999, padding: "1px 7px"
          }}>{newPatients.length}</span>
        </button>
        <button
          style={{ ...styles.tab, ...(tab === "existing" ? styles.activeTab(meta.color) : {}) }}
          onClick={() => setTab("existing")}
        >
          Existing Patients
          <span style={{
            marginLeft: 6, fontSize: 11, fontWeight: 700,
            background: tab === "existing" ? `${meta.color}18` : "#F1F5F9",
            color: tab === "existing" ? meta.color : "#94A3B8",
            borderRadius: 999, padding: "1px 7px"
          }}>{existingPatients.length}</span>
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div style={styles.card}>
        <div style={{ ...styles.row, ...styles.headerRow }}>
          <div>Patient</div>
          <div>MRN / ICD</div>
          <div>Assessment</div>
          <div>Status</div>
          <div style={{ textAlign: "right" }}>Action</div>
        </div>

        {loading ? (
          /* skeleton rows */
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ ...styles.row, gap: 12 }}>
              {Array.from({ length: 5 }).map((__, j) => (
                <div key={j} style={{
                  height: 16, borderRadius: 6,
                  background: "#F1F5F9",
                  width: j === 4 ? 80 : "80%",
                  animation: "pulse 1.4s ease-in-out infinite"
                }} />
              ))}
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🧑‍⚕️</div>
            <div style={{ fontWeight: 700, color: "#374151", marginBottom: 4 }}>
              {search ? "No patients match your search" : "No patients assigned"}
            </div>
            <div style={{ fontSize: 13, color: "#94A3B8" }}>
              {search ? "Try a different name or MRN." : `Patients assigned to ${DEPARTMENT} will appear here.`}
            </div>
          </div>
        ) : (
          filtered.map((p, idx) => (
            <div
              key={p.id}
              style={{
                ...styles.row,
                background: idx % 2 === 0 ? "#fff" : "#FAFBFC"
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F0F7FF")}
              onMouseLeave={e => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#FAFBFC")}
            >
              {/* Patient name + avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  background: `${meta.color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: meta.color
                }}>
                  {((p.name || p.email || "P")[0] || "P").toUpperCase()}
                </div>
                <div>
                  <div style={styles.name}>{p.name || p.email}</div>
                  {(p.age || p.gender) && (
                    <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 1 }}>
                      {[p.age && `${p.age} yrs`, p.gender].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </div>
              </div>

              {/* MRN / ICD */}
              <div style={{ fontSize: 13, color: "#64748B", fontFamily: "monospace" }}>
                {p.mrn || p.icd || "—"}
              </div>

              {/* Assessment badge */}
              <div>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                  background: `${meta.color}12`, color: meta.color,
                  border: `1px solid ${meta.color}30`
                }}>
                  {meta.icon} {meta.label}
                </span>
              </div>

              {/* Status */}
              <div>
                <span style={styles.badge(p.status)}>{p.status ?? "New"}</span>
              </div>

              {/* Action */}
              <div style={{ textAlign: "right" }}>
                <button
                  style={{ ...styles.startBtn, background: meta.color }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  onClick={() => setSelectedPatient(p)}
                >
                  Open →
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= COUNT ================= */}
      {!loading && filtered.length > 0 && (
        <div style={{ marginTop: 10, fontSize: 12, color: "#94A3B8", textAlign: "right" }}>
          Showing <strong>{filtered.length}</strong> of <strong>{baseList.length}</strong> patient{baseList.length !== 1 ? "s" : ""}
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: 32,
    background: "#F8FAFC",
    minHeight: "100vh"
  },
  emptyState: {
    padding: "48px 20px",
    textAlign: "center",
    color: "#64748B",
    fontSize: 15,
    fontWeight: 500
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    color: "#0F172A",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B"
  },
  backBtn: {
    background: "transparent",
    border: "1px solid #CBD5E1",
    padding: "8px 14px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    color: "#2563EB",
    flexShrink: 0
  },
  tabs: {
    display: "flex",
    gap: 20,
    borderBottom: "1px solid #E5E7EB",
    marginBottom: 24
  },
  tab: {
    paddingBottom: 12,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    background: "none",
    border: "none",
    color: "#64748B",
    display: "flex",
    alignItems: "center"
  },
  activeTab: (color) => ({
    color: color,
    borderBottom: `3px solid ${color}`
  }),
  card: {
    background: "#FFFFFF",
    borderRadius: 16,
    border: "1px solid #E5E7EB",
    overflow: "hidden"
  },
  row: {
    display: "grid",
    gridTemplateColumns: "2.5fr 1.8fr 2fr 1.2fr 1fr",
    padding: "14px 20px",
    alignItems: "center",
    borderBottom: "1px solid #F1F5F9"
  },
  headerRow: {
    background: "#F9FAFB",
    fontSize: 11,
    fontWeight: 700,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    borderBottom: "1px solid #E5E7EB"
  },
  name: {
    fontWeight: 700,
    fontSize: 15,
    color: "#0F172A"
  },
  badge: (status) => {
    const s = (status || "New").toLowerCase();
    return {
      padding: "4px 12px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
      background: s === "new" ? "#EEF2FF" : s === "ongoing" ? "#ECFDF5" : s === "old" ? "#F1F5F9" : "#FFF7ED",
      color:      s === "new" ? "#4338CA" : s === "ongoing" ? "#047857" : s === "old" ? "#64748B" : "#B45309"
    };
  },
  startBtn: {
    color: "#FFFFFF",
    border: "none",
    padding: "8px 16px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity .15s"
  }
};
