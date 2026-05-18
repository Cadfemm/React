import React, { useState } from "react";

/* ── Standard assessment components ── */
import WorkRehab      from "./workrehab";
import VocationalRehab from "./vocationalrehab";

/* ── Progress components ── */
import WorkhardeningProgress from "./WorkhardeningProgress";

/* ── Assessment type cards ── */
const ASSESSMENT_TYPES = [
  { id: "initial",  title: "Initial Assessment",   desc: "Comprehensive assessment for new patient visit",  icon: "📋", accent: "#1D4ED8", tag: "New Patient",   tagBg: "#dbeafe", tagColor: "#1d4ed8" },
  { id: "followup", title: "Re-Assessment",         desc: "Review progress and adjust treatment plan",       icon: "🔄", accent: "#059669", tag: "Returning",     tagBg: "#d1fae5", tagColor: "#065f46" },
  { id: "progress", title: "Progress Intervention", desc: "Document interventions and track outcomes",       icon: "📈", accent: "#7C3AED", tag: "Ongoing Care",  tagBg: "#ede9fe", tagColor: "#5b21b6" },
  { id: "group",    title: "Group Intervention",    desc: "Record group session and multi-patient notes",    icon: "👥", accent: "#DC2626", tag: "Group Session", tagBg: "#fee2e2", tagColor: "#991b1b" },
];

function AssessmentCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", borderRadius: 14, border: "1px solid #e9ecef", borderTop: `3px solid ${item.accent}`, padding: "22px 22px 18px", cursor: "pointer", transition: "box-shadow .2s, transform .2s", display: "flex", flexDirection: "column", minHeight: 190, boxShadow: hovered ? `0 12px 32px ${item.accent}22` : "0 2px 8px rgba(0,0,0,0.06)", transform: hovered ? "translateY(-3px)" : "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: item.accent + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{item.icon}</div>
        <span style={{ background: item.tagBg, color: item.tagColor, borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{item.tag}</span>
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

const TABS = [
  { key: "workrehab",      label: "Work Rehab"      },
  { key: "vocationalrehab", label: "Vocational Rehab" },
];

const TYPE_COLORS = { initial: { bg: "#dbeafe", color: "#1d4ed8" }, followup: { bg: "#d1fae5", color: "#065f46" }, progress: { bg: "#ede9fe", color: "#5b21b6" }, group: { bg: "#fee2e2", color: "#991b1b" } };
const TYPE_LABELS = { initial: "Initial Assessment", followup: "Re-Assessment", progress: "Progress Intervention", group: "Group Intervention" };

export default function PatientDetails({ patient, department, mode, onBack }) {
  const [assessmentType, setAssessmentType] = useState(mode || null);
  const [activeTab, setActiveTab]           = useState("workrehab");

  /* ── STEP 1: Select Assessment Type ── */
  if (!assessmentType) {
    return (
      <div style={{ padding: "40px 28px", fontFamily: "Inter, system-ui", background: "#f8fafc", minHeight: "100vh" }}>
        {onBack && <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}><button onClick={onBack} style={backBtnStyle}>← Back to Patients</button></div>}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#111827" }}>Select Assessment Type</h1>
          <p style={{ margin: "8px 0 0", fontSize: 14, color: "#6b7280" }}>Choose the appropriate assessment for this patient visit</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 860, margin: "0 auto" }}>
          {ASSESSMENT_TYPES.map(item => <AssessmentCard key={item.id} item={item} onClick={() => setAssessmentType(item.id)} />)}
        </div>
      </div>
    );
  }

  /* ── STEP 2: Tabs with content ── */
  const renderContent = () => {
    if (assessmentType === "progress") {
      switch (activeTab) {
        case "workrehab":       return <WorkhardeningProgress patient={patient} onBack={() => setAssessmentType(null)} />;
        case "vocationalrehab": return <VocationalRehab       patient={patient} />;
        default: return null;
      }
    }
    switch (activeTab) {
      case "workrehab":       return <WorkRehab       patient={patient} />;
      case "vocationalrehab": return <VocationalRehab patient={patient} />;
      default: return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
        <button onClick={() => setAssessmentType(null)} style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>← Back</button>
        <span style={{ padding: "4px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: TYPE_COLORS[assessmentType]?.bg || "#f1f5f9", color: TYPE_COLORS[assessmentType]?.color || "#374151" }}>
          {TYPE_LABELS[assessmentType] || assessmentType}
        </span>
      </div>
      {/* Tabs */}
      <div style={tabRow}>
        {TABS.map(tab => (
          <div key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ ...tabItem, ...(activeTab === tab.key ? activeTabStyle : {}) }}>
            {tab.label}
          </div>
        ))}
      </div>
      <div style={contentContainer}>{renderContent()}</div>
    </div>
  );
}

const backBtnStyle = { background: "none", border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer" };
const tabRow = { display: "flex", gap: 0, padding: "0 12px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb", flexWrap: "nowrap", overflowX: "auto" };
const tabItem = { padding: "12px 20px 10px", fontSize: 14, fontWeight: 600, cursor: "pointer", color: "#111827", borderBottom: "3px solid transparent", whiteSpace: "nowrap", flexShrink: 0 };
const activeTabStyle = { color: "#2563eb", borderBottom: "3px solid #2563eb" };
const contentContainer = { padding: 16 };
