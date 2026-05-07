import React, { useState, useEffect, useRef } from "react";
import PatientCard from "../../../shared/cards/PatientCard";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import DryNeedling from "../../OT/components/DryNeedling";
import WallClimbing from "../../OT/components/WallClimbing";
import ATVConsentForm from "./ATVConsentForm";

const SOAP_TABS = ["subjective", "objective", "assessment", "plan"];
const ACTIONS   = [
  { type: "back",  label: "Back"  },
  { type: "clear", label: "Clear" },
  { type: "save",  label: "Save"  },
];

const SUBJECTIVE_SCHEMA = {
  actions: ACTIONS,
  sections: [{
    fields: [
      {
        name: "consent_type",
        label: "Consent",
        type: "single-select",
        options: [
          { label: "Wall Climbing", value: "wall_climbing" },
          { label: "Dry Needling",  value: "dry_needling"  },
          { label: "ATV Form",      value: "atv"           },
        ],
      },
      {
        name: "route_selection",
        label: "Route Selection",
        type: "checkbox-group",
        options: [
          { label: "Adaptive Wall",   value: "adaptive_wall"   },
          { label: "Curved Wall",     value: "curved_wall"     },
          { label: "Bouldering Wall", value: "bouldering_wall" },
        ],
      },
    ],
  }],
};

const OBJECTIVE_SCHEMA = {
  actions: ACTIONS,
  sections: [{
    fields: [
      { type: "subheading", label: "1) Overall Climbing Performance" },
      { name: "overall_performance", label: "Performance", type: "radio",
        options: [
          { label: "Pass",                              value: "pass"     },
          { label: "Pass with assistance & adaptation", value: "assisted" },
          { label: "Unable to complete",                value: "unable"   },
        ],
      },
      { name: "time_min", label: "Time (minutes)", type: "input" },
      { name: "time_sec", label: "Time (seconds)", type: "input" },
      { type: "subheading", label: "2) Strength and Power" },
      { name: "grip_strength",    label: "Grip Strength",            type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { name: "upper_body_power", label: "Upper Body Pulling Power", type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { type: "subheading", label: "3) Core Stability and Tension" },
      { name: "body_tension",     label: "Body Tension",    type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { name: "core_endurance",   label: "Core Endurance",  type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { name: "postural_control", label: "Postural Control",type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { type: "subheading", label: "4) Lower Body and Footwork" },
      { name: "foot_precision",      label: "Foot Precision",     type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { name: "lower_limb_strength", label: "Lower Limb Strength",type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { name: "hip_mobility",        label: "Hip Flexibility",    type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { type: "subheading", label: "5) Mobility and Movement Efficiency" },
      { name: "hip_shoulder_flexibility", label: "Hip & Shoulder Flexibility", type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { name: "movement_coordination",    label: "Movement Coordination",     type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { name: "weight_transfer",          label: "Weight Transfer",           type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { type: "subheading", label: "6) Endurance" },
      { name: "endurance", label: "Endurance", type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
      { type: "subheading", label: "7) Attention & Concentration" },
      { name: "attention", label: "Attention & Concentration", type: "radio", options: ["Good","Fair","Poor"].map(v=>({label:v,value:v.toLowerCase()})) },
    ],
  }],
};

const ASSESSMENT_SCHEMA = {
  actions: ACTIONS,
  sections: [{ fields: [{ name: "clinical_impression", label: "Clinical Impression", type: "textarea" }] }],
};

const PLAN_SCHEMA = {
  actions: ACTIONS,
  sections: [{ fields: [{ name: "plan", label: "Plan", type: "textarea" }] }],
};

const SCHEMA_MAP = { subjective: SUBJECTIVE_SCHEMA, objective: OBJECTIVE_SCHEMA, assessment: ASSESSMENT_SCHEMA, plan: PLAN_SCHEMA };

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   sharedAtvValues / sharedAtvSubmitted / onAtvSubmit
   are passed from AdvanceFitnessWithSubTabs so ATV state
   is shared between Wall Climbing and Dry Needling tabs.
══════════════════════════════════════════════════════════ */
export default function WallClimbingAssessment({ patient, sharedAtvValues = {}, sharedAtvSubmitted = false, onAtvSubmit }) {
  const [values, setValues]       = useState({});
  const [activeTab, setActiveTab] = useState("subjective");
  const [openConsent, setOpenConsent] = useState(null);

  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: patient?.medical_history || "",
    past_family_history:  patient?.family_medical_history || "",
    alerts_and_allergies: patient?.alerts_and_allergies_history || "",
  });

  const dryNeedlingRef  = useRef({});
  const wallClimbingRef = useRef({});

  useEffect(() => {
    if (!patient) return;
    setPatientHistory({
      past_medical_history: patient.medical_history              || "",
      past_family_history:  patient.family_medical_history       || "",
      alerts_and_allergies: patient.alerts_and_allergies_history || "",
    });
  }, [patient]);

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (name === "consent_type" && value) {
      setOpenConsent(value);
    }
  };

  const handleAction = (type) => {
    if (type === "clear") setValues({});
    if (type === "save")  alert("Wall Climbing Assessment draft saved");
  };

  const closeModal = () => {
    setOpenConsent(null);
    setValues(prev => ({ ...prev, consent_type: "" }));
  };

  const wallClimbingSaved = !!values.wall_climbing_consent?.saved;
  const dryNeedlingSaved  = !!values.dry_needling_consent?.saved;

  return (
    <div>
      {/* Patient Info */}
      <CommonFormBuilder schema={{ title: "Patient Information", sections: [] }} values={{}} onChange={() => {}}>
        <PatientCard patient={patient} />
        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Patient History</div>
          {[
            { key: "past_medical_history", label: "Past Medical History" },
            { key: "past_family_history",  label: "Family History"       },
            { key: "alerts_and_allergies", label: "Allergies"            },
          ].map(({ key, label }) => (
            <div key={key} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
              <textarea value={patientHistory[key]} onChange={e => setPatientHistory(p => ({ ...p, [key]: e.target.value }))} style={historyTextarea} />
            </div>
          ))}
          <button type="button" style={alertBtn}>🚨 Alerts</button>
        </div>
        <button style={doctorsReportBtn}>Doctors Reports</button>
      </CommonFormBuilder>

      {/* SOAP Tabs */}
      <div style={tabBar}>
        {SOAP_TABS.map(tab => (
          <div key={tab} style={activeTab === tab ? tabActive : tabBtn} onClick={() => setActiveTab(tab)}>
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* SOAP Form */}
      <CommonFormBuilder schema={SCHEMA_MAP[activeTab]} values={values} onChange={onChange} onAction={handleAction} />

      {/* Consent status badges */}
      {activeTab === "subjective" && (wallClimbingSaved || dryNeedlingSaved || sharedAtvSubmitted) && (
        <div style={consentStatusBar}>
          {wallClimbingSaved  && <span style={savedBadge}>✅ Wall Climbing Signed</span>}
          {dryNeedlingSaved   && <span style={savedBadge}>✅ Dry Needling Signed</span>}
          {sharedAtvSubmitted && <span style={savedBadge}>✅ ATV Consent Signed</span>}
        </div>
      )}

      {/* ── Wall Climbing Modal ── */}
      {openConsent === "wall_climbing" && (
        <ConsentModal title="Wall Climbing Consent" onClose={closeModal}>
          {wallClimbingSaved && <SubmittedBanner text="Wall Climbing Consent already submitted." />}
          <WallClimbing
            key={`wall-${values.wall_climbing_consent?.submittedAt || "new"}`}
            patient={patient}
            initialValues={values.wall_climbing_consent || {}}
            onBack={closeModal}
            onValuesChange={latest => { wallClimbingRef.current = latest; }}
            onSubmit={consentData => {
              onChange("wall_climbing_consent", { ...consentData, submittedAt: new Date().toISOString(), saved: true });
            }}
          />
          {/* ATV appears after Wall Climbing is saved */}
          {wallClimbingSaved && (
            <AtvSection
              patient={patient}
              sharedAtvValues={sharedAtvValues}
              sharedAtvSubmitted={sharedAtvSubmitted}
              onAtvSubmit={onAtvSubmit}
            />
          )}
          <ModalFooter onClose={closeModal} />
        </ConsentModal>
      )}

      {/* ── Dry Needling Modal ── */}
      {openConsent === "dry_needling" && (
        <ConsentModal title="Dry Needling Consent" onClose={closeModal}>
          {dryNeedlingSaved && <SubmittedBanner text="Dry Needling Consent already submitted." />}
          <DryNeedling
            key={`dry-${values.dry_needling_consent?.submittedAt || "new"}`}
            patient={patient}
            initialValues={values.dry_needling_consent || {}}
            onBack={closeModal}
            onValuesChange={latest => { dryNeedlingRef.current = latest; }}
            onSubmit={consentData => {
              onChange("dry_needling_consent", { ...consentData, submittedAt: new Date().toISOString(), saved: true });
            }}
          />
          {/* ATV appears after Dry Needling is saved */}
          {dryNeedlingSaved && (
            <AtvSection
              patient={patient}
              sharedAtvValues={sharedAtvValues}
              sharedAtvSubmitted={sharedAtvSubmitted}
              onAtvSubmit={onAtvSubmit}
            />
          )}
          <ModalFooter onClose={closeModal} />
        </ConsentModal>
      )}

      {/* ── ATV-only Modal ── */}
      {openConsent === "atv" && (
        <ConsentModal title="ATV Rehabilitation Therapy Consent" onClose={closeModal}>
          <AtvSection
            patient={patient}
            sharedAtvValues={sharedAtvValues}
            sharedAtvSubmitted={sharedAtvSubmitted}
            onAtvSubmit={onAtvSubmit}
          />
          <ModalFooter onClose={closeModal} />
        </ConsentModal>
      )}
    </div>
  );
}

/* ── Shared ATV section (reused in all modals) ── */
function AtvSection({ patient, sharedAtvValues, sharedAtvSubmitted, onAtvSubmit }) {
  const [localValues, setLocalValues] = useState(sharedAtvValues || {});

  useEffect(() => {
    setLocalValues(sharedAtvValues || {});
  }, [sharedAtvValues]);

  return (
    <>
      <div style={{ borderTop: "2px dashed #e5e7eb", margin: "28px 0" }} />
      <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 12 }}>
        ATV Rehabilitation Therapy Consent
      </div>
      {sharedAtvSubmitted && (
        <SubmittedBanner text={`ATV Consent already submitted on ${new Date().toLocaleDateString()}.`} />
      )}
      <ATVConsentForm
        patient={patient}
        values={localValues}
        onChange={(name, val) => setLocalValues(prev => ({ ...prev, [name]: val }))}
        submitted={sharedAtvSubmitted}
        onSubmit={(data) => {
          onAtvSubmit?.(data); // notify parent → syncs to Dry Needling tab too
        }}
      />
    </>
  );
}

/* ── Helpers ── */
function SubmittedBanner({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", marginBottom: 14, background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#166534" }}>
      <span>✅</span><span>{text}</span>
    </div>
  );
}

function ModalFooter({ onClose }) {
  return (
    <div style={{ marginTop: 20, textAlign: "right" }}>
      <button onClick={onClose} style={{ padding: "9px 24px", borderRadius: 6, background: "#2563eb", color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        Close
      </button>
    </div>
  );
}

function ConsentModal({ title, children, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 12, width: "100%", maxWidth: 860, maxHeight: "92vh", display: "flex", flexDirection: "column", boxShadow: "0 8px 40px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 22px", borderBottom: "1px solid #e5e7eb", flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#111827" }}>{title}</span>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#6b7280", padding: "2px 6px" }}>✕</button>
        </div>
        <div style={{ overflowY: "auto", padding: "20px 24px", flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

/* ── Styles ── */
const tabBar = {
  display: "flex", gap: 12, justifyContent: "center",
  borderBottom: "1px solid #ddd", marginBottom: 12,
};
const tabBtn    = { padding: "10px 22px", fontWeight: 600, cursor: "pointer", color: "#0f172a" };
const tabActive = { ...tabBtn, borderBottom: "3px solid #2451b3", color: "#2451b3" };

const historyTextarea = { width: "100%", minHeight: 90, padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, fontFamily: "inherit", resize: "vertical" };
const alertBtn      = { marginTop: 10, padding: "10px 20px", borderRadius: 6, border: "1.5px solid #007bff", background: "#007bff", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" };
const doctorsReportBtn = { padding: "10px 20px", background: "#2563EB", color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8 };
const consentStatusBar = { display: "flex", gap: 10, flexWrap: "wrap", padding: "10px 16px", margin: "0 0 8px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8 };
const savedBadge    = { display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: "#dcfce7", border: "1px solid #86efac", color: "#166534", fontWeight: 600, fontSize: 12 };
