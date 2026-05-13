import React, { useState, useMemo, memo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import { localDateTimeString } from "../../../shared/utils/dateFormatter";

const ACTIONS_WITH_NEXT = [
  { type: "back",  label: "Back"  },
  { type: "clear", label: "Clear" },
  { type: "save",  label: "Save"  },
];

const TAB_ORDER = ["subjective", "objective", "assessment", "plan"];

const TAB_META = {
  subjective: { label: "Subjective"  },
  objective:  { label: "Objective"   },
  assessment: { label: "Assessment"  },
  plan:       { label: "Plan"        },
};

/* ── Patient header — matches OptometryAssessment style ── */
const OptometryPatientInfo = memo(function OptometryPatientInfo({ patient }) {
  if (!patient) return null;
  const initial = (patient.name || patient.email || "P")[0].toUpperCase();
  const fields = [
    { label: "Date of Birth",      value: localDateTimeString(patient.date_of_birth) || "—" },
    { label: "Age / Gender",       value: `${patient.age || "—"} / ${patient.gender || "—"}` },
    { label: "ICD Code",           value: patient.icd || "—" },
    { label: "Date of Assessment", value: new Date().toLocaleDateString("en-GB") },
    { label: "Medical History",    value: patient.medical_history || "No data" },
    { label: "Allergies",          value: patient.allergies || "None recorded" },
  ];

  return (
    <div style={PI.card}>
      <div style={PI.header}>
        <div style={PI.headerLeft}>
          <div style={PI.avatar}>{initial}</div>
          <div>
            <div style={PI.name}>{patient.name || patient.email || "Patient"}</div>
            <div style={PI.metaRow}>
              <span style={PI.metaChip}><span style={PI.metaDot} />IC: {patient.id || "—"}</span>
              <span style={PI.metaDivider} />
              <span style={PI.metaChip}><span style={PI.metaDot} />Optometry</span>
              <span style={PI.metaDivider} />
              <span style={PI.metaChip}><span style={PI.metaDot} />{new Date().toLocaleDateString("en-GB")}</span>
              <span style={PI.metaDivider} />
              <span style={{ ...PI.metaChip, background: "rgba(255,255,255,0.25)", color: "#fff", fontWeight: 700, borderRadius: 999, padding: "2px 10px" }}>
                Progress Intervention
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style={PI.grid}>
        {fields.map((f, i) => (
          <div key={f.label} style={{
            ...PI.field,
            borderRight: (i + 1) % 3 !== 0 ? "1px solid #f1f5f9" : "none",
            borderBottom: i < 3 ? "1px solid #f1f5f9" : "none",
          }}>
            <div style={PI.fieldLabel}>{f.label}</div>
            <div style={PI.fieldValue}>{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

/* ── Main component ── */
export default function OptometryProgressAssessment({ patient, onSubmit, onBack }) {
  const [values,    setValues]    = useState({});
  const [activeTab, setActiveTab] = useState("subjective");

  const activeTabIdx = TAB_ORDER.indexOf(activeTab);

  const handleChange = (name, value) => setValues(prev => ({ ...prev, [name]: value }));

  const handleAction = (type) => {
    if (type === "back")  { onBack?.(); return; }
    if (type === "clear") { setValues({}); return; }
    if (type === "save")  { onSubmit?.(values); return; }
    if (type === "next") {
      const idx = TAB_ORDER.indexOf(activeTab);
      if (idx < TAB_ORDER.length - 1) setActiveTab(TAB_ORDER[idx + 1]);
    }
  };

  const schemaMap = useMemo(() => ({
    subjective: {
      title: "",
      actions: ACTIONS_WITH_NEXT,
      sections: [{
        fields: [
          {
            name: "session_for",
            label: "Session For",
            type: "radio",
            options: [
              { label: "Vision Therapy",                  value: "vision_therapy" },
              { label: "Visual Rehabilitation",           value: "visual_rehabilitation" },
              { label: "Low Vision-Blind Rehabilitation", value: "low_vision_blind_rehab" }
            ]
          },
          {
            name: "consent",
            label: "Consent",
            type: "checkbox-group",
            options: [
                {
                label: "Consultation has been given based on findings. Client was in his/her best interest.",
                value: "yes"
                }
            ]
            },
          { name: "new_complaints", label: "New Complaint(s)", type: "textarea" },
           {
            name: "session",
            label: "Session(s)",
            type: "custom",
            render: ({ values, onChange }) => (
                <input
                min="1"
                max="1000"
                type="number"
                name="session"
                value={values.session || "1"}
                onChange={(e) => onChange("session", e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8
                }}
                />
            )
            }
        ]
      }]
    },

    objective: {
      title: "",
      actions: ACTIONS_WITH_NEXT,
      sections: [{
        fields: [
          { name: "case_overview", label: "Case Overview", type: "textarea" },
          {
            name: "modalities",
            label: "Modalities",
            type: "checkbox-group",
            options: [
              { label: "Home Exercise",      value: "home_exercise"      },
              { label: "In Office Training", value: "in_office_training" },
              { label: "Both",               value: "both"               }
            ]
          },
          { name: "strategies", label: "Strategies", type: "textarea" },
          {
            name: "objectives",
            label: "Objectives",
            type: "dynamic-section",
            fields: [{ name: "objective_text", label: "Objective", type: "input" }]
          }
        ]
      }]
    },

    assessment: {
      title: "",
      actions: ACTIONS_WITH_NEXT,
      sections: [{
        fields: [{
          name: "tasks",
          label: "Tasks",
          type: "dynamic-section",
          fields: [
            { name: "task",        label: "Task",              type: "input"    },
            {
              name: "achievement",
              label: "Achievement",
              type: "radio",
              options: [
                { label: "Excellent", value: "excellent" },
                { label: "Good",      value: "good"      },
                { label: "Fair",      value: "fair"      },
                { label: "Poor",      value: "poor"      }
              ]
            },
            { name: "comment", label: "Comment / Remark", type: "input" }
          ]
        }]
      }]
    },

    plan: {
      title: "",
      actions: ACTIONS_WITH_NEXT,
      sections: [{
        fields: [
          { name: "plan_text",    label: "Plan",    type: "textarea" },
          { name: "comment_text", label: "Comment", type: "textarea" },
          { name: "remark_text",  label: "Remark",  type: "textarea" }
        ]
      }]
    }
  }), []);

  return (
    <div style={S.page}>
      {/* Patient header */}
      <div style={S.patientCardWrap}>
        <OptometryPatientInfo patient={patient} />
      </div>

      {/* SOAP shell */}
      <div style={S.soapShell}>
        {/* Tab bar */}
        <div style={S.tabBar}>
          {TAB_ORDER.map((tab, idx) => {
            const isActive = activeTab === tab;
            const isDone   = idx < activeTabIdx;
            return (
              <button
                key={tab}
                style={{ ...S.tab, ...(isActive ? S.tabActive : isDone ? S.tabDone : {}) }}
                onClick={() => setActiveTab(tab)}
              >
                {TAB_META[tab].label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div style={S.tabContent}>
          <CommonFormBuilder
            schema={schemaMap[activeTab]}
            values={values}
            onChange={handleChange}
            onAction={handleAction}
          >
            {activeTab !== "plan" && (
              <div style={S.actionRow}>
                <button
                  style={S.nextBtn}
                  onMouseEnter={e => e.currentTarget.style.background = "#1a6fc4"}
                  onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                  onClick={() => handleAction("next")}
                >
                  Next: {TAB_META[TAB_ORDER[activeTabIdx + 1]]?.label} →
                </button>
              </div>
            )}
            {activeTab === "plan" && (
              <div style={S.actionRow}>
                <button
                  style={S.submitBtn}
                  onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                  onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                  onClick={() => onSubmit?.(values)}
                >
                  Submit Progress Assessment
                </button>
              </div>
            )}
          </CommonFormBuilder>
        </div>
      </div>
    </div>
  );
}

/* ── Styles — identical to OptometryAssessment ── */
const S = {
  page: {
    background: "#f0f4f8",
    minHeight: "100vh",
    fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
    padding: "16px",
  },
  patientCardWrap: {
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
    marginBottom: 14,
    border: "1px solid #e0f2fe",
  },
  soapShell: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  },
  tabBar: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    background: "#fff",
    borderBottom: "1px solid #f1f5f9",
  },
  tab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 8px",
    background: "none",
    border: "none",
    borderBottom: "3px solid transparent",
    marginBottom: -1,
    fontSize: 13,
    fontWeight: 500,
    color: "#64748b",
    cursor: "pointer",
    transition: "color .15s",
    whiteSpace: "nowrap",
    letterSpacing: "0.01em",
  },
  tabActive: {
    color: "#2563eb",
    fontWeight: 700,
    borderBottomColor: "transparent",
    background: "none",
  },
  tabDone: {
    color: "#16a34a",
  },
  tabContent: {
    width: "100%",
  },
  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    padding: "16px 24px",
    borderTop: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  nextBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "9px 24px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background .15s",
    boxShadow: "0 1px 4px rgba(37,99,235,0.2)",
  },
  submitBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "9px 24px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background .15s",
    boxShadow: "0 1px 4px rgba(37,99,235,0.2)",
  },
};

/* ── Patient header card styles — identical to OptometryAssessment ── */
const PI = {
  card: { background: "#fff", overflow: "hidden" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background: "#dbeafe",
    borderBottom: "1px solid #bae6fd",
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  avatar: {
    width: 38, height: 38, borderRadius: "50%",
    background: "#0284c7", border: "2px solid #bae6fd",
    color: "#fff", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: 15, fontWeight: 800, flexShrink: 0,
  },
  name:    { fontSize: 15, fontWeight: 700, color: "#0c4a6e", marginBottom: 2 },
  metaRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  metaChip: {
    display: "inline-flex", alignItems: "center", gap: 4,
    fontSize: 11, color: "#0369a1", fontWeight: 500,
  },
  metaDot: {
    width: 4, height: 4, borderRadius: "50%",
    background: "#0284c7", display: "inline-block",
  },
  metaDivider: { width: 1, height: 11, background: "#bae6fd", display: "inline-block" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", background: "#fff" },
  field: { padding: "10px 20px", minHeight: 52 },
  fieldLabel: {
    fontSize: 10, fontWeight: 700, color: "#94a3b8",
    textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 3,
  },
  fieldValue: { fontSize: 13, fontWeight: 500, color: "#1e293b" },
};
