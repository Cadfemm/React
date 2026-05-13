import { useState, useEffect } from "react";
import TUG from "./TUGForm";
import MMTForm from "./MMTForm";
import ROMForm from "./ROMForm";
import MASForm from "./MASForm";
import WSTForm from "./WSTForm";
import MFRTForm from "./MFRTForm";
import BergBalanceScale from "./BBS";
import WISCIForm from "./WISCIForm";
import SixMWTForm from "./SixMWTForm";
import SixMWPTForm from "./SixMWPTForm";
import TenMWTForm from "./TenMWTForm";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import CervicalNeuracAssessment from "./CervicalNeuracAssessment";
import ElbowNeuracAssessment from "./ElbowNeuracAssessment";
import ShoulderNeuracAssessment from "./ShoulderNeuracAssessment";
import KneeNeuracAssessment from "./KneeNeuracAssessment";
import HipNeuracAssessment from "./HipNeuracAssessment";
import LumbarNeuracAssessment from "./LumbarNeuracAssessment";
import IsometricTestForm from "./IsometricTestForm";

const POS_NEG_OPTIONS = [
  { label: "Positive", value: "positive" },
  { label: "Negative", value: "negative" }
];
const ACTIONS = [
  { type: "back",  label: "Back"  },
  { type: "clear", label: "Clear" },
  { type: "save",  label: "Save"  },
];

const SUBJECTIVE_SCHEMA = {
  actions: ACTIONS,
  sections: [{
    fields: [
      { name: "chief_complaint",  label: "Chief Complaint",                 type: "input" },
      { name: "hopi",             label: "History of Presenting Illness",    type: "input" },
       {
          type: "subheading",
          label: "Patient Goals"
        },
      { name: "short_term_goals", label: "Short Term Goals",                 type: "input" },
      { name: "long_term_goals",  label: "Long Term Goals",                  type: "input" },
    ],
  }],
};

const OBJECTIVE_SCHEMA = {
  title: "OBJECTIVE",
  actions: ACTIONS,
  sections: [{
    fields: [
      { type: "subheading", label: "Outcome Measures" },
      {
        name: "neuro_scales",
        type: "assessment-launcher",
        options: [
          { label: "Range of Motion (ROM)",value: "rom" },
          { label: "Isometric Test",value: "isometric" }
          
          
        ],
      },
      {
   name: "others",
      label: "Others",
      type: "textarea",
},
//          {
//           type: "subheading",
//           label: "Perform+ Test"
//         },

//       {
//   name: "core_brace",
//   label: "Core Brace",
//   type: "radio",
//   options: POS_NEG_OPTIONS 
// },
//     {
//   name: "abduction",
//   label: "Abduction",
//   type: "radio",
//   options: POS_NEG_OPTIONS 
// },
//     {
//   name: "heel_raise",
//   label: "Heel raise",
//   type: "radio",
//   options: POS_NEG_OPTIONS 
// },
//     {
//   name: "scapula_assist",
//   label: "Scapula assist",
//   type: "radio",
//   options: POS_NEG_OPTIONS 
// },
//     {
//   name: "scapula_retraction",
//   label: "Scapula Retraction",
//   type: "radio",
//   options: POS_NEG_OPTIONS 
// },
//     {
//   name: "scapula_stabilization",
//   label: "Scapula stabilization",
//   type: "radio",
//   options: POS_NEG_OPTIONS 
// },
//     {
//   name: "msk_functional_limitation",
//   label: "Core Brace",
//   type: "radio",
//   options: POS_NEG_OPTIONS 
// },
// {
//    name: "others",
//       label: "Others",
//       type: "textarea",
// }



    ],
  }],
};

const ASSESSMENT_SCHEMA = {
  title: "ASSESSMENT",
  actions: ACTIONS,
  sections: [{
    fields: [{
      name: "clinical_impression",
      label: "Clinical Impression",
      type: "textarea",
      placeholder: "Enter clinical findings and summary...",
    }],
  }],
};

const PLAN_SCHEMA = {
  title: "",
  actions: ACTIONS,
  sections: [{
    fields: [
      { type: "subheading",    label: "Short-Term Goals (2–4 weeks)" },
      { type: "dynamic-goals", name: "short_term_goals"              },
      { type: "subheading",    label: "Long-Term Goals (6–12 weeks)" },
      { type: "dynamic-goals", name: "long_term_goals"               },
      { name: "Interventions", label: "Interventions", type: "input"   },
      { name: "plan",          label: "Plan",          type: "textarea" },
    ],
  }],
};

const SCHEMA_MAP = {
  subjective: SUBJECTIVE_SCHEMA,
  objective:  OBJECTIVE_SCHEMA,
  assessment: ASSESSMENT_SCHEMA,
  plan:       PLAN_SCHEMA,
};

const SPINAL_ASSESSMENT_REGISTRY = {
  tug:     TUG,
  rom:     ROMForm,
  mmt:     MMTForm,
  mas:     MASForm,
  wst:     WSTForm,
  mfrt:    MFRTForm,
  wisci:   WISCIForm,
  tenmwt:  TenMWTForm,
  sixmwt:  SixMWTForm,
  sixmwpt: SixMWPTForm,
  bbs:     BergBalanceScale,
  isometric: IsometricTestForm,
  
};

const SUB_TABS = [
  { key: "cervical", label: "Cervical" },
  { key: "shoulder", label: "Shoulder" },
  { key: "elbow",    label: "Elbow"    },
  { key: "lumbar",   label: "Lumbar"   },
  { key: "knee",     label: "Knee"     },
  { key: "hip",      label: "Hip"      },
];

/* ══════════════════════════════════════════════════════════
   MAIN — sub-tabs always visible at top
══════════════════════════════════════════════════════════ */
export default function NeuracTherapyAssessment({ patient, onSubmit, onBack }) {
  const [activeSub, setActiveSub] = useState("cervical");

  return (
    <div>
      {/* Sub-tabs always visible */}
      <div style={subTabRow}>
        {SUB_TABS.map(tab => (
          <div
            key={tab.key}
            onClick={() => setActiveSub(tab.key)}
            style={{ ...subTabItem, ...(activeSub === tab.key ? subTabActive : {}) }}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Selected sub-tab content */}
      <div style={{ background: "#fff" }}>
        {activeSub === "cervical" && <NeuracSoapWrapper patient={patient} region="cervical" onSubmit={onSubmit} onBack={onBack} />}
        {activeSub === "shoulder" && <NeuracSoapWrapper patient={patient} region="shoulder" onSubmit={onSubmit} onBack={onBack} />}
        {activeSub === "elbow"    && <NeuracSoapWrapper patient={patient} region="elbow"    onSubmit={onSubmit} onBack={onBack} />}
        {activeSub === "lumbar"   && <NeuracSoapWrapper patient={patient} region="lumbar"   onSubmit={onSubmit} onBack={onBack} />}
        {activeSub === "knee"     && <NeuracSoapWrapper patient={patient} region="knee"     onSubmit={onSubmit} onBack={onBack} />}
        {activeSub === "hip"      && <NeuracSoapWrapper patient={patient} region="hip"      onSubmit={onSubmit} onBack={onBack} />}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   NeuracSoapWrapper — Patient Info + SOAP tabs per sub-tab
   Objective: Outcome Measures (assessment-launcher) +
              region-specific Neurac tables below
══════════════════════════════════════════════════════════ */
function NeuracSoapWrapper({ patient, region, onSubmit, onBack }) {
  const [values, setValues]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");
  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: "",
    past_family_history:  "",
    alerts_and_allergies: "",
  });

  const storageKey = patient ? `neurac_${region}_draft_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setValues(JSON.parse(saved).values || {});
  }, [storageKey]);

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      referred_by:      patient.case_manager      || "",
      referral_reasons: patient.diagnosis_history || patient.icd || "",
    }));
    setPatientHistory({
      past_medical_history: patient.medical_history              || "",
      past_family_history:  patient.family_medical_history       || "",
      alerts_and_allergies: patient.alerts_and_allergies_history || "",
    });
  }, [patient]);

  const onChange = (name, value) => setValues(v => ({ ...v, [name]: value }));

  const handleAction = (type) => {
    if (type === "back")  onBack?.();
    if (type === "clear") { setValues({}); setSubmitted(false); localStorage.removeItem(storageKey); }
    if (type === "save")  {
      localStorage.setItem(storageKey, JSON.stringify({ values, updatedAt: new Date() }));
      alert(`${region.charAt(0).toUpperCase() + region.slice(1)} draft saved`);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Neurac Therapy assessment submitted");
  };

  const saveProps = {
    onSave:  () => handleAction("save"),
    onClear: () => handleAction("clear"),
  };

  const TABS = ["subjective", "objective", "assessment", "plan"];

  return (
    <div style={{ padding: "0 0 16px" }}>

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

      {/* SOAP Tabs */}
      <div style={tabBar}>
        {TABS.map(tab => (
          <div
            key={tab}
            style={activeTab === tab ? tabActive : tabBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* OBJECTIVE — Outcome Measures + region Neurac tables */}
      {activeTab === "objective" && (
        <>
          {/* Outcome Measures assessment-launcher */}
          <CommonFormBuilder
            schema={OBJECTIVE_SCHEMA}
            values={values}
            onChange={onChange}
            onAction={handleAction}
            assessmentRegistry={SPINAL_ASSESSMENT_REGISTRY}
          />

          {/* Region-specific Neurac tables below */}
          {region === "cervical" && <CervicalNeuracAssessment values={values} onChange={onChange} {...saveProps} />}
          {region === "shoulder" && <ShoulderNeuracAssessment values={values} onChange={onChange} {...saveProps} />}
          {region === "elbow"    && <ElbowNeuracAssessment    values={values} onChange={onChange} {...saveProps} />}
          {region === "lumbar"   && <LumbarNeuracAssessment   values={values} onChange={onChange} {...saveProps} />}
          {region === "knee"     && <KneeNeuracAssessment     values={values} onChange={onChange} {...saveProps} />}
          {region === "hip"      && <HipNeuracAssessment      values={values} onChange={onChange} {...saveProps} />}

          <div style={{ ...submitRow, padding: "0 16px 8px" }}>
            <button type="button" style={submitBtn} onClick={() => setActiveTab("assessment")}>
              Next
            </button>
          </div>
        </>
      )}

      {/* SUBJECTIVE / ASSESSMENT / PLAN */}
      {activeTab !== "objective" && (
        <CommonFormBuilder
          schema={SCHEMA_MAP[activeTab]}
          values={values}
          onChange={onChange}
          submitted={submitted}
          onAction={handleAction}
          assessmentRegistry={SPINAL_ASSESSMENT_REGISTRY}
        >
          <div style={submitRow}>
            {activeTab !== "plan" ? (
              <button
                type="button"
                style={submitBtn}
                onClick={() => {
                  if (activeTab === "subjective") setActiveTab("objective");
                  else if (activeTab === "assessment") setActiveTab("plan");
                }}
              >
                Next
              </button>
            ) : (
              <button type="button" style={submitBtn} onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </CommonFormBuilder>
      )}
    </div>
  );
}

/* ── Patient Information Block ── */
function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
  if (!patient) return null;
  const safe       = (v) => v ?? "-";
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "-");

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12, fontSize: 14,
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
          {[
            { key: "past_medical_history", label: "Past Medical History" },
            { key: "past_family_history",  label: "Family History"       },
            { key: "alerts_and_allergies", label: "Allergies"            },
          ].map(({ key, label }) => (
            <div key={key}>
              <b>{label}</b>
              <textarea
                style={textarea}
                value={patientHistory[key]}
                onChange={e => setPatientHistory(prev => ({ ...prev, [key]: e.target.value }))}
              />
            </div>
          ))}
          <button style={alertBtn}>🚨 Alerts</button>
        </div>
      </div>
    </div>
  );
}

/* ── Styles ── */
const subTabRow    = { display: "flex", gap: 0, borderBottom: "2px solid #e5e7eb", background: "#f1f5f9", padding: "0 16px" };
const subTabItem   = { padding: "10px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer", color: "#475569", borderBottom: "3px solid transparent", marginBottom: -2 };
const subTabActive = { color: "#2563eb", borderBottom: "3px solid #2563eb", background: "#fff" };
const tabBar       = { display: "flex", gap: 12, justifyContent: "center", borderBottom: "1px solid #ddd", marginBottom: 12 };
const tabBtn       = { padding: "10px 22px", fontWeight: 600, cursor: "pointer", color: "#0f172a" };
const tabActive    = { ...tabBtn, borderBottom: "3px solid #2451b3", color: "#2451b3" };
const submitRow    = { display: "flex", justifyContent: "flex-end", marginTop: 20 };
const submitBtn    = { padding: "12px 32px", background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700 };
const textarea     = { width: "100%", minHeight: 90, marginTop: 6, marginBottom: 12, padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, resize: "vertical" };
const alertBtn     = { marginTop: 10, padding: "10px 20px", borderRadius: 6, border: "1.5px solid #007bff", background: "#007bff", color: "#fff", fontWeight: 600, cursor: "pointer" };
const doctorsReportBtn = { padding: "10px 20px", background: "#2563EB", color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8 };
