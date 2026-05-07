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
/* ── Consent & Referral schema ── */
const CONSENT_AND_REFERRAL_SCHEMA = {
  
  sections: [
    {
      fields: [

 
        {
  name: "gait_report",
  label: "Upload ",
  type: "attach-file",
 
},
{
  name: "cheif_complaint",
  label: "Cheif Complaint ",
  type: "textarea",
 
},

        
      ],
    },
  ],
};

/* ══════════════════════════════════════════════════════════
   Main Tabs
══════════════════════════════════════════════════════════ */
export default function IntegratedRehabProgramTabs({ patient }) {
  const tabs = [
    { key: "motion_capture",  label: "Motion Capture"          },
    { key: "advance_fitness", label: "Advance Fitness Program" },
    { key: "neurac_therapy",  label: "Neurac Therapy"          },
    { key: "neuromodulation", label: "Neuromodulation"         },
    { key: "cybernics",       label: " Neurorobotic & Cybernics"               },
    { key: "metamotus",       label: "MetaMotus™ Galileo"      },
  ];

  const [activeTab, setActiveTab]           = useState("motion_capture");
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

  const renderContent = () => {
    switch (activeTab) {
      case "motion_capture":
        return (
          <EmptySoapPanel
            patient={patient}
            patientHistory={patientHistory}
            setPatientHistory={setPatientHistory}
          />
        );
      case "advance_fitness":
        return <AdvanceFitnessWithSubTabs patient={patient} />;
      case "neurac_therapy":
        return <NeuracTherapyAssessment patient={patient} />;
      case "neuromodulation":
        return <NeuromodulationAssessment patient={patient} />;
      case "cybernics":
        return <CybernicsAssessment patient={patient} />;
      case "metamotus":
        return <MetaMotusGalileoAssessment patient={patient} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={tabRow}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...tabItem,
              ...(activeTab === tab.key ? activeTabStyle : {}),
            }}
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
function AdvanceFitnessWithSubTabs({ patient }) {
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
      <div style={subTabRow}>
        {subTabs.map((t) => (
          <div
            key={t.key}
            onClick={() => setActiveSub(t.key)}
            style={{ ...subTabItem, ...(activeSub === t.key ? subTabActive : {}) }}
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
        />
      )}
      {activeSub === "dry_needling" && (
        <DryNeedlingAssessment
          patient={patient}
          sharedAtvValues={atvConsentValues}
          sharedAtvSubmitted={atvSubmitted}
          onAtvSubmit={onAtvSubmit}
        />
      )}
    </div>
  );
}
function NeuracTherapyTabs({ patient }) {
  const subTabs = [
    { key: "cervical", label: "Cervical" },
    { key: "shoulder", label: "Shoulder" },
    { key: "elbow", label: "Elbow" },
    { key: "lumbar", label: "Lumbar" },
    { key: "knee", label: "Knee" },
    { key: "hip", label: "Hip" }
  ];

  const [activeSub, setActiveSub] = useState("cervical");

  return (
    <div>
      {/* Tabs */}
      <div style={subTabRow}>
        {subTabs.map((t) => (
          <div
            key={t.key}
            onClick={() => setActiveSub(t.key)}
            style={{
              ...subTabItem,
              ...(activeSub === t.key ? subTabActive : {})
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
function MotionCaptureSubTabs({ patient }) {
  const subTabs = [
    { key: "foot_scan",        label: "Foot Scan"              },
    { key: "gait_analysis",    label: "Gait Analysis"          },
    { key: "electromyography", label: "Electromyography (EMG)" },
  ];
  const [activeSub, setActiveSub] = useState("foot_scan");

  return (
    <div>
      <div style={{ ...subTabRow, justifyContent: "center" }}>
        {subTabs.map((t) => (
          <div
            key={t.key}
            onClick={() => setActiveSub(t.key)}
            style={{ ...subTabItem, ...(activeSub === t.key ? subTabActive : {}) }}
          >
            {t.label}
          </div>
        ))}
      </div>
      <div style={{ padding: 16 }}>
        {activeSub === "foot_scan"        && <ConsentSubTab patient={patient} storageKey="foot_scan"        />}
        {activeSub === "gait_analysis"    && <ConsentSubTab patient={patient} storageKey="gait_analysis"    />}
        {activeSub === "electromyography" && <ConsentSubTab patient={patient} storageKey="electromyography" />}
      </div>
    </div>
  );
}

/* shared consent form for each motion-capture sub-tab */
function ConsentSubTab({ patient }) {
  const [consentValues, setConsentValues] = useState({
    referred_by:      patient?.case_manager || "",
    referral_reasons: patient?.diagnosis_history || patient?.icd || "",
  });

  return (
    <CommonFormBuilder
      schema={CONSENT_AND_REFERRAL_SCHEMA}
      values={consentValues}
      onChange={(name, val) =>
        setConsentValues((prev) => ({ ...prev, [name]: val }))
      }
    />
  );
}

/* ── EmptySoapPanel (Motion Capture main view) ── */
function EmptySoapPanel({ patient, patientHistory, setPatientHistory }) {
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

      {/* Motion Capture sub-tabs */}
      <MotionCaptureSubTabs patient={patient} />
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
            <textarea
              style={textarea}
              value={patientHistory.past_medical_history}
              onChange={(e) =>
                setPatientHistory((prev) => ({ ...prev, past_medical_history: e.target.value }))
              }
            />
          </div>
          <div>
            <b>Family History</b>
            <textarea
              style={textarea}
              value={patientHistory.past_family_history}
              onChange={(e) =>
                setPatientHistory((prev) => ({ ...prev, past_family_history: e.target.value }))
              }
            />
          </div>
          <div>
            <b>Allergies</b>
            <textarea
              style={textarea}
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
const textarea = {
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
