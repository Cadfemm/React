import React, { useState, useEffect } from "react";
import SpinalCordInjury from "./SpinalcordInjury";
import DryNeedlingAssessment from "./DryNeedlingAssessment";
import WallClimbingAssessment from "./WallClimbingAssessment";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import MetaMotusGalileoAssessment from "./MetaMotusGalileoAssessment";
import ATVConsentForm from "./ATVConsentForm";
import NeuracTherapyAssessment from './NeuracTherapyAssessment'

import CervicalNeuracAssessment from "./CervicalNeuracAssessment";
import ShoulderNeuracAssessment from "./ShoulderNeuracAssessment";
import ElbowNeuracAssessment from "./ElbowNeuracAssessment";
import LumbarNeuracAssessment from "./LumbarNeuracAssessment";
import KneeNeuracAssessment from "./KneeNeuracAssessment";
import HipNeuracAssessment from "./HipNeuracAssessment";
import NeuromodulationAssessment from "./NeuromodulationAssessment";
import CybernicsAssessment from "./CybernicsAssessment";

/* ── Progress pages ── */
import NeuracTherapyProgress   from "./NeuracTherapyProgress";
import NeuromodulationProgress from "./NeuromodulationProgress";
import NeuroroticProgress      from "./NeuroroticProgress";
/* ── Consent & Referral schema ── */
const CONSENT_AND_REFERRAL_SCHEMA = {
  sections: [
    {
      fields: [
        { name: "gait_report",    label: "Upload",          type: "attach-file" },
        { name: "cheif_complaint", label: "Chief Complaint", type: "input"   },
      ],
    },
  ],
};

/* ── Progress sub-type data ── */
const PROGRESS_SUBTYPES = [
  { key: "neurac",          title: "Neurac Therapy",           desc: "Neurac sling-based neuromuscular therapy progress",    icon: "🔗", accent: "#2563eb", tagBg: "#dbeafe", tagColor: "#1d4ed8" },
  { key: "neuromodulation", title: "Neuromodulation",          desc: "Neuromodulation intervention progress notes",          icon: "⚡", accent: "#7c3aed", tagBg: "#ede9fe", tagColor: "#5b21b6" },
  { key: "cybernics",       title: "Neurorobotic & Cybernics", desc: "Cyberdyne HAL and neurorobotic intervention progress", icon: "🤖", accent: "#059669", tagBg: "#d1fae5", tagColor: "#065f46" },
];

function ProgressSubtypeCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 14, border: "1px solid #e9ecef",
        borderTop: `3px solid ${item.accent}`, padding: "22px 22px 18px", cursor: "pointer",
        transition: "box-shadow .2s, transform .2s", display: "flex", flexDirection: "column", minHeight: 160,
        boxShadow: hovered ? `0 12px 32px ${item.accent}22` : "0 2px 8px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: item.accent + "12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{item.icon}</div>
        <span style={{ background: item.tagBg, color: item.tagColor, borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>Progress</span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{item.title}</div>
      <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, flex: 1 }}>{item.desc}</div>
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: item.accent }}>Open Progress</span>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: item.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 700 }}>›</div>
      </div>
    </div>
  );
}

const backBtnStyle = {
  background: "none", border: "1px solid #d1d5db", borderRadius: 8,
  padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer",
};

/* ══════════════════════════════════════════════════════════
   Assessment Type selection cards
══════════════════════════════════════════════════════════ */
const ASSESSMENT_TYPES = [
  { id: "initial",  title: "Initial Assessment",   desc: "Comprehensive assessment for new patient visit",  icon: "📋", accent: "#1D4ED8", tag: "New Patient",   tagBg: "#dbeafe", tagColor: "#1d4ed8" },
  { id: "followup", title: "Re-Assessment",         desc: "Review progress and adjust treatment plan",       icon: "🔄", accent: "#059669", tag: "Returning",     tagBg: "#d1fae5", tagColor: "#065f46" },
  { id: "progress", title: "Progress Intervention", desc: "Document interventions and track outcomes",       icon: "📈", accent: "#7C3AED", tag: "Ongoing Care",  tagBg: "#ede9fe", tagColor: "#5b21b6" },
  { id: "group",    title: "Group Intervention",    desc: "Record group session and multi-patient notes",    icon: "👥", accent: "#DC2626", tag: "Group Session", tagBg: "#fee2e2", tagColor: "#991b1b" },
];

function AssessmentTypeCard({ item, onClick }) {
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

/* ══════════════════════════════════════════════════════════
   Main Tabs
══════════════════════════════════════════════════════════ */
export default function IntegratedRehabProgramTabs({ patient, mode, onBack }) {
  const tabs = [
    { key: "motion_capture",  label: "Motion Capture"          },
    { key: "advance_fitness", label: "Advance Fitness Program" },
    { key: "neurac_therapy",  label: "Neurac Therapy"          },
    { key: "neuromodulation", label: "Neuromodulation"         },
    { key: "cybernics",       label: "Neurorobotic & Cybernics" },
    { key: "metamotus",       label: "MetaMotus™ Galileo"      },
  ];

  // If mode is passed from parent (DepartmentPatients), use it directly.
  // If not, manage selection internally.
  const modeFromProp = !!mode;
  const [assessmentType, setAssessmentType] = useState(mode || null);
  const [activeTab, setActiveTab]           = useState("motion_capture");
    // const [activeTab, setActiveTab] = useState("subjective");
  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: "",
    past_family_history:  "",
    alerts_and_allergies: "",
  });

  useEffect(() => {
    if (!patient) return;
    setPatientHistory({
      past_medical_history: patient.medical_history || "",
      past_family_history:  patient.family_medical_history || "",
      alerts_and_allergies: patient.alerts_and_allergies_history || "",
    });
  }, [patient]);

  // Back handler: if mode came from prop → call onBack (go to DepartmentPatients card screen)
  // If mode was selected internally → go back to internal selection screen
  const handleBack = () => {
    if (modeFromProp) {
      onBack?.();
    } else {
      setAssessmentType(null);
      setActiveTab("motion_capture");
    }
  };

  /* ── STEP 1: No assessment type → show selection cards ── */
  if (!assessmentType) {
    return (
      <div style={{ padding: "40px 28px", fontFamily: "Inter, system-ui", background: "#f8fafc", minHeight: "100vh" }}>
        {/* Back button top-right */}
        {onBack && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <button type="button" onClick={onBack} style={backBtnStyle}>← Back to Patients</button>
          </div>
        )}
        {/* Centered title */}
        {/* <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#111827" }}>Select Assessment Type</h1>
          <p style={{ margin: "8px 0 0", fontSize: 14, color: "#6b7280" }}>Choose the appropriate assessment for this patient visit</p>
        </div> */}
        <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 36,
    width: "100%"
  }}
>
  <h1
    style={{
      margin: 0,
      fontSize: 26,
      fontWeight: 800,
      color: "#111827"
    }}
  >
    Select Assessment Type
  </h1>
  <p
    style={{
      margin: "8px 0 0",
      fontSize: 14,
      color: "#6b7280",
      maxWidth: "600px"
    }}
  >
    Choose the appropriate assessment for this patient visit
  </p>
</div>
        {/* Strict 2-column grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          maxWidth: 860,
          margin: "0 auto",
        }}>
          {ASSESSMENT_TYPES.map(item => (
            <AssessmentTypeCard key={item.id} item={item} onClick={() => setAssessmentType(item.id)} />
          ))}
        </div>
      </div>
    );
  }

  /* ── STEP 2: Assessment type selected → show tabs ── */
  const TYPE_COLORS = {
    initial:  { bg: "#dbeafe", color: "#1d4ed8" },
    followup: { bg: "#d1fae5", color: "#065f46" },
    progress: { bg: "#ede9fe", color: "#5b21b6" },
    group:    { bg: "#fee2e2", color: "#991b1b" },
  };
  const TYPE_LABELS = {
    initial:  "Initial Assessment",
    followup: "Re-Assessment",
    progress: "Progress Intervention",
    group:    "Group Intervention",
  };

  const renderContent = () => {
    /* Progress → route each tab to its progress component */
    if (assessmentType === "progress") {
      switch (activeTab) {
        case "motion_capture":
          return <EmptySoapPanel patient={patient} patientHistory={patientHistory} setPatientHistory={setPatientHistory} onBack={handleBack} />;
        case "advance_fitness":
          return <AdvanceFitnessWithSubTabs patient={patient} onBack={handleBack} />;
        case "neurac_therapy":
          return <NeuracTherapyProgress patient={patient} onBack={handleBack} />;
        case "neuromodulation":
          return <NeuromodulationProgress patient={patient} onBack={handleBack} />;
        case "cybernics":
          return <NeuroroticProgress patient={patient} onBack={handleBack} />;
        case "metamotus":
          return <MetaMotusGalileoAssessment patient={patient} onBack={handleBack} />;
        default:
          return null;
      }
    }

    /* Initial / Re-Assessment / Group → standard assessment components */
    switch (activeTab) {
      case "motion_capture":
        return <EmptySoapPanel patient={patient} patientHistory={patientHistory} setPatientHistory={setPatientHistory} onBack={handleBack} />;
      case "advance_fitness":
        return <AdvanceFitnessWithSubTabs patient={patient} onBack={handleBack} />;
      case "neurac_therapy":
        return <NeuracTherapyAssessment patient={patient} onBack={handleBack} />;
      case "neuromodulation":
        return <NeuromodulationAssessment patient={patient} onBack={handleBack} />;
      case "cybernics":
        return <CybernicsAssessment patient={patient} onBack={handleBack} />;
      case "metamotus":
        return <MetaMotusGalileoAssessment patient={patient} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header: back + assessment type badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
        <button
          type="button"
          onClick={handleBack}
          style={{ background: "none", border: "none", color: "#2563eb", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          ← Back
        </button>
        <span style={{
          padding: "4px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700,
          background: TYPE_COLORS[assessmentType]?.bg || "#f1f5f9",
          color:      TYPE_COLORS[assessmentType]?.color || "#374151",
        }}>
          {TYPE_LABELS[assessmentType] || assessmentType}
        </span>
      </div>

      {/* Tabs */}
      <div style={tabRow}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{ ...tabItem, ...(activeTab === tab.key ? activeTabStyle : {}) }}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div style={contentContainer}>{renderContent()}</div>
    </div>
  );
}

/* ── Advance Fitness: Wall Climbing + Dry Needling ── */
function AdvanceFitnessWithSubTabs({ patient, onBack }) {
  const subTabs = [
    { key: "wall_climbing", label: "Wall Climbing" },
    { key: "dry_needling",  label: "Dry Needling"  },
  ];
  const [activeSub, setActiveSub] = useState("wall_climbing");

  // Shared ATV consent state — synced across both sub-tabs
  const [atvConsentValues, setAtvConsentValues] = useState({});
  const [atvSubmitted, setAtvSubmitted]         = useState(false);

  const onAtvSubmit = (data) => {
    setAtvConsentValues(data);
    setAtvSubmitted(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "left", borderBottom: "2px solid #e5e7eb", background: "#fff" }}>
        {subTabs.map((t) => (
          <div
            key={t.key}
            onClick={() => setActiveSub(t.key)}
            style={{
              padding: "14px 32px",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: activeSub === t.key ? "#2563eb" : "#374151",
              borderBottom: activeSub === t.key ? "3px solid #2563eb" : "3px solid transparent",
              marginBottom: -2,
              transition: "color .15s",
            }}
          >
            {t.label}
          </div>
        ))}
      </div>
      {activeSub === "wall_climbing" && (
        <WallClimbingAssessment
          patient={patient}
          sharedAtvValues={atvConsentValues}
          sharedAtvSubmitted={atvSubmitted}
          onAtvSubmit={onAtvSubmit}
          onBack={onBack}
        />
      )}
      {activeSub === "dry_needling" && (
        <DryNeedlingAssessment
          patient={patient}
          sharedAtvValues={atvConsentValues}
          sharedAtvSubmitted={atvSubmitted}
          onAtvSubmit={onAtvSubmit}
          onBack={onBack}
        />
      )}
    </div>
  );
}
function NeuracTherapyTabs({ patient }) {
  const subTabs = [
    { key: "cervical", label: "Cervical" },
    { key: "shoulder", label: "Shoulder" },
    { key: "elbow",    label: "Elbow"    },
    { key: "lumbar",   label: "Lumbar"   },
    { key: "knee",     label: "Knee"     },
    { key: "hip",      label: "Hip"      },
  ];

  const [activeSub, setActiveSub] = useState("cervical");

  return (
    <div>
      {/* Tabs — same style as Motion Capture */}
      <div style={{ display: "flex", justifyContent: "center", borderBottom: "2px solid #e5e7eb", background: "#fff" }}>
        {subTabs.map((t) => (
          <div
            key={t.key}
            onClick={() => setActiveSub(t.key)}
            style={{
              padding: "14px 28px",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: activeSub === t.key ? "#2563eb" : "#374151",
              borderBottom: activeSub === t.key ? "3px solid #2563eb" : "3px solid transparent",
              marginBottom: -2,
              transition: "color .15s",
            }}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* Content */}
      {activeSub === "cervical" && <CervicalNeuracAssessment patient={patient} />}
      {activeSub === "shoulder" && <ShoulderNeuracAssessment patient={patient} />}
      {activeSub === "elbow" && <ElbowNeuracAssessment patient={patient} />}
      {activeSub === "lumbar" && <LumbarNeuracAssessment patient={patient} />}
      {activeSub === "knee" && <KneeNeuracAssessment patient={patient} />}
      {activeSub === "hip" && <HipNeuracAssessment patient={patient} />}
    </div>
  );
}
/* ── Motion Capture: Foot Scan / Gait Analysis / Electromyography ── */
function MotionCaptureSubTabs({ patient, values, onChange }) {
  const subTabs = [
    { key: "foot_scan",        label: "Foot Scan"              },
    { key: "gait_analysis",    label: "Gait Analysis"          },
    { key: "electromyography", label: "Electromyography (EMG)" },
  ];
  const [activeSub, setActiveSub] = useState("foot_scan");


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", borderBottom: "2px solid #e5e7eb", background: "#fff" }}>
        {subTabs.map((t) => (
          <div
            key={t.key}
            onClick={() => setActiveSub(t.key)}
            style={{
              padding: "14px 32px",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: activeSub === t.key ? "#2563eb" : "#374151",
              borderBottom: activeSub === t.key ? "3px solid #2563eb" : "3px solid transparent",
              marginBottom: -2,
              transition: "color .15s",
            }}
          >
            {/* {t.label} */}
          </div>
        ))}
      </div>
     
    </div>
  );
}

/* ── Motion Capture SOAP schemas ── */
const MC_SUBJECTIVE_SCHEMA = {
  
  actions: [
    { type: "back",  label: "Back"  },
    { type: "clear", label: "Clear" },
    { type: "save",  label: "Save"  },
  ],
 sections: [{ fields: [
   
    { name: "mc_gait_report",         label: "Upload Gait Report",  type: "attach-file" },
    { name: "mc_chief_complaint_obj", label: "Chief Complaint",     type: "input" },
      {
            name: "hpi",
            label: "History of Presenting Illness (HPI)",
            type: "input"
          }
  ]}],
};

const MC_OBJECTIVE_SCHEMA = {
  
  actions: [
    { type: "back",  label: "Back"  },
    { type: "clear", label: "Clear" },
    { type: "save",  label: "Save"  },
  ],
  sections: [{ fields: [
   
    { name: "mc_gait_report",         label: "Upload Gait Report",  type: "attach-file" },
    { name: "mc_chief_complaint_obj", label: "Chief Complaint",     type: "input" },
     {
            name: "hpi",
            label: "History of Presenting Illness (HPI)",
            type: "input"
          }
  ]}],
};

const MC_ASSESSMENT_SCHEMA = {

  actions: [
    { type: "back",  label: "Back"  },
    { type: "clear", label: "Clear" },
    { type: "save",  label: "Save"  },
  ],
 sections: [{ fields: [
   
    { name: "mc_gait_report",         label: "Upload Gait Report",  type: "attach-file" },
    { name: "mc_chief_complaint_obj", label: "Chief Complaint",     type: "input" },
     {
            name: "hpi",
            label: "History of Presenting Illness (HPI)",
            type: "input"
          }
  ]}],
};


const MC_SOAP_TABS = [
  { key: "subjective",  label: "Foot Scan"              },
  { key: "objective",   label: "Gait Analysis"          },
  { key: "assessment",  label: "Electromyography (EMG)" },
];
const MC_SCHEMA_MAP = {
  subjective:  MC_SUBJECTIVE_SCHEMA,
  objective:   MC_OBJECTIVE_SCHEMA,
  assessment:  MC_ASSESSMENT_SCHEMA,
};

/* ── EmptySoapPanel (Motion Capture main view) ── */
function EmptySoapPanel({ patient, patientHistory, setPatientHistory, onBack }) {
  const storageKey = patient ? `motion_capture_${patient.id}` : null;
  const [values, setValues]       = useState({});
  const [activeSOAP, setActiveSOAP] = useState("subjective");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) { try { setValues(JSON.parse(saved).values || {}); } catch {} }
  }, [storageKey]);

  const onChange = (name, value) => setValues(v => ({ ...v, [name]: value }));

  const handleAction = (type) => {
    if (type === "back")  { onBack?.(); }
    if (type === "clear") { setValues({}); localStorage.removeItem(storageKey); }
    if (type === "save")  {
      if (storageKey) localStorage.setItem(storageKey, JSON.stringify({ values, updatedAt: new Date() }));
      alert("Motion Capture draft saved");
    }
  };

  const soapOrder = ["subjective", "objective", "assessment"];
  const soapIdx   = soapOrder.indexOf(activeSOAP);

  return (
    <div style={emptyWrap}>
      {/* Patient Information */}
      <CommonFormBuilder
        schema={{ title: "Patient Information", sections: [] }}
        values={{}}
        onChange={() => {}}
      >
        <PatientInformationBlock
          patient={patient}
          patientHistory={patientHistory}
          setPatientHistory={setPatientHistory}
        />
        <button style={doctorsReportBtn}>Doctors Reports</button>
      </CommonFormBuilder>

      {/* SOAP Tabs — uppercase centered style */}
      <div style={{ display: "flex", justifyContent: "center", borderBottom: "2px solid #e5e7eb", background: "#fff" }}>
        {MC_SOAP_TABS.map(t => (
          <div
            key={t.key}
            onClick={() => setActiveSOAP(t.key)}
            style={{
              padding: "14px 32px",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: activeSOAP === t.key ? "#2563eb" : "#374151",
              borderBottom: activeSOAP === t.key ? "3px solid #2563eb" : "3px solid transparent",
              marginBottom: -2,
              transition: "color .15s",
            }}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* SOAP Content */}
      <CommonFormBuilder
        schema={MC_SCHEMA_MAP[activeSOAP]}
        values={values}
        onChange={onChange}
        onAction={handleAction}
      />

      {/* Motion Capture sub-tabs (inside Objective) */}
      {activeSOAP === "objective" && (
        <MotionCaptureSubTabs patient={patient} values={values} onChange={onChange} />
      )}

      {/* Next / Submit */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 16px" }}>
        {soapIdx < soapOrder.length - 1 ? (
          <button
            style={submitBtnStyle}
            onClick={() => setActiveSOAP(soapOrder[soapIdx + 1])}
          >
            Next →
          </button>
        ) : (
          <button
            style={submitBtnStyle}
            onClick={() => { setSubmitted(true); alert("Motion Capture assessment submitted"); }}
          >
            Submit Assessment
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Patient Information block ── */
function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
  if (!patient) return null;
  const safe       = (v) => v ?? "-";
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "-");

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        fontSize: 14,
      }}>
        <div><b>Name:</b> {safe(patient.name)}</div>
        <div><b>IC:</b> {safe(patient.id)}</div>
        <div><b>DOB:</b> {formatDate(patient.dob)}</div>
        <div><b>Age / Gender:</b> {safe(patient.age)} / {safe(patient.sex)}</div>
        <div><b>ICD:</b> {safe(patient.icd)}</div>
        <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>
        <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
        <div><b>Duration of Diagnosis:</b> -</div>
        <div><b>Primary Diagnosis:</b> {safe(patient.diagnosis_history)}</div>
        <div><b>Secondary Diagnosis:</b> {safe(patient.medical_history)}</div>
        <div><b>Dominant Side:</b> {safe(patient.dominant_side)}</div>
        <div><b>Language Preference:</b> {safe(patient.language_preference)}</div>
        <div><b>Education Level:</b> {safe(patient.education_background)}</div>
        <div><b>Occupation:</b> {safe(patient.occupation)}</div>
        <div><b>Work Status:</b> {safe(patient.employment_status)}</div>
        <div><b>Driving Status:</b> {safe(patient.driving_status)}</div>
        <div><b>PP/OB:</b> {safe(patient.pp_ob)}</div>
        <div><b>Weight:</b> {patient.weight ? `${patient.weight} kg` : "-"}</div>

        <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
          <h3>Patient History</h3>
          <div>
            <b>Past Medical History</b>
            <input
              style={input}
              value={patientHistory.past_medical_history}
              onChange={(e) =>
                setPatientHistory((prev) => ({ ...prev, past_medical_history: e.target.value }))
              }
            />
          </div>
          <div>
            <b>Family History</b>
            <input
              style={input}
              value={patientHistory.past_family_history}
              onChange={(e) =>
                setPatientHistory((prev) => ({ ...prev, past_family_history: e.target.value }))
              }
            />
          </div>
          <div>
            <b>Allergies</b>
            <input
              style={input}
              value={patientHistory.alerts_and_allergies}
              onChange={(e) =>
                setPatientHistory((prev) => ({ ...prev, alerts_and_allergies: e.target.value }))
              }
            />
          </div>
          <button style={alertBtn}>🚨 Alerts</button>
        </div>
      </div>
    </div>
  );
}

/* ── Styles ── */
const tabRow = {
  display: "flex",
  gap: 32,
  padding: "12px 16px 0",
  borderBottom: "1px solid #e5e7eb",
  background: "#f9fafb",
  flexWrap: "wrap",
};
const tabItem = {
  paddingBottom: 8,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  color: "#111827",
  borderBottom: "3px solid transparent",
  whiteSpace: "nowrap",
};
const activeTabStyle = {
  color: "#2563eb",
  borderBottom: "3px solid #2563eb",
};
const contentContainer = { padding: 16 };
const emptyWrap = {
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  background: "#fff",
  overflow: "hidden",
};
const subTabRow = {
  display: "flex",
  gap: 0,
  borderBottom: "2px solid #e5e7eb",
  background: "#f1f5f9",
  padding: "0 16px",
};
const subTabItem = {
  padding: "10px 24px",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  color: "#475569",
  borderBottom: "3px solid transparent",
  marginBottom: -2,
};
const subTabActive = {
  color: "#2563eb",
  borderBottom: "3px solid #2563eb",
  background: "#fff",
};
const input = {
  width: "100%",
  minHeight: 90,
  marginTop: 6,
  marginBottom: 12,
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 14,
  resize: "vertical",
};
const alertBtn = {
  marginTop: 10,
  padding: "10px 20px",
  borderRadius: 6,
  border: "1.5px solid #007bff",
  background: "#007bff",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};
const doctorsReportBtn = {
  padding: "10px 20px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 8,
};
const submitBtnStyle = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer",
};
const tabBar = {
  display: "flex", gap: 12, justifyContent: "center",
  borderBottom: "1px solid #ddd", marginBottom: 12,
};
const tabBtn    = { padding: "10px 22px", fontWeight: 600, cursor: "pointer", color: "#0f172a" };
const tabActive = { ...tabBtn, borderBottom: "3px solid #2451b3", color: "#2451b3" };
