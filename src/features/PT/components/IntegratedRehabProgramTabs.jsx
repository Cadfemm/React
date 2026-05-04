import React, { useState } from "react";
import SpinalCordInjury from "./SpinalcordInjury";
import AdvanceFitnessProgramAssessment from "./AdvanceFitnessProgramAssessment";

export default function IntegratedRehabProgramTabs({ patient }) {
  const tabs = [
    { key: "motion_capture", label: "Motion Capture" },
    { key: "advance_fitness", label: "Advance Fitness Program" },
    { key: "neurac_therapy", label: "Neurac Therapy" },
    { key: "neuromodulation", label: "Neuromodulation" },
    { key: "cybernics", label: "Cybernics" },
  ];

  const [activeTab, setActiveTab] = useState("motion_capture");

  const renderContent = () => {
    switch (activeTab) {
      case "motion_capture":
        return <EmptySoapPanel patient={patient} />;
      case "advance_fitness":
        return <AdvanceFitnessProgramAssessment patient={patient} />;
      case "neurac_therapy":
        return <SpinalCordInjury patient={patient} />;
      case "neuromodulation":
        return <SpinalCordInjury patient={patient} />;
      case "cybernics":
        return <SpinalCordInjury patient={patient} />;
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

function EmptySoapPanel({ patient }) {
  const soapTabs = ["subjective", "objective", "assessment", "plan"];
  const [activeSoapTab, setActiveSoapTab] = useState("subjective");

  return (
    <div style={emptyWrap}>
      <div style={patientInfoWrap}>
        <h3 style={patientInfoTitle}>Patient Information</h3>
        <div style={patientInfoGrid}>
          <InfoRow label="Name" value={patient?.name || "-"} />
          <InfoRow label="IC" value={patient?.id || "-"} />
          <InfoRow label="DOB" value={patient?.dob || "-"} />
          <InfoRow label="Age / Gender" value={`${patient?.age || "-"} / ${patient?.sex || "-"}`} />
          <InfoRow label="ICD" value={patient?.icd || "-"} />
          <InfoRow label="Date of Assessment" value={new Date().toLocaleDateString("en-GB")} />
          <InfoRow label="Date of Onset" value={patient?.date_of_onset || "-"} />
          <InfoRow label="Duration of Diagnosis" value="-" />
          <InfoRow label="Primary Diagnosis" value={patient?.diagnosis_history || "-"} />
          <InfoRow label="Secondary Diagnosis" value={patient?.medical_history || "-"} />
          <InfoRow label="Dominant Side" value={patient?.dominant_side || "-"} />
          <InfoRow label="Language Preference" value={patient?.language_preference || "-"} />
          <InfoRow label="Education Level" value={patient?.education_background || "-"} />
          <InfoRow label="Occupation" value={patient?.occupation || "-"} />
          <InfoRow label="Work Status" value={patient?.employment_status || "-"} />
          <InfoRow label="Driving Status" value={patient?.driving_status || "-"} />
        </div>
      </div>

      <div style={preSoapWrap}>
        <h3 style={patientInfoTitle}>Consent & Referral</h3>
        <div style={consentGrid}>
          <label style={checkRow}>
            <input type="checkbox" />
            <span>Consent obtained</span>
          </label>
          <div style={uploadBox}>Upload</div>
          <label style={checkRow}>
            <input type="checkbox" />
            <span>Home Exercise Program (HEP) reviewed and demonstrated</span>
          </label>
        </div>
        <div style={referralGrid}>
          <InfoRow label="Referred by" value={patient?.case_manager || "-"} />
          <InfoRow label="Referral Reasons" value={patient?.diagnosis_history || patient?.icd || "-"} />
        </div>
      </div>

      <div style={soapTabRow}>
        {soapTabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveSoapTab(tab)}
            style={{
              ...soapTabItem,
              ...(activeSoapTab === tab ? soapTabActive : {}),
            }}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>
      <div style={emptyContent} />
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={infoItem}>
      <strong>{label}:</strong> {value}
    </div>
  );
}

const tabRow = {
  display: "flex",
  gap: 40,
  padding: "12px 12px 0px 12px",
  borderBottom: "1px solid #e5e7eb",
  background: "#f9fafb",
};

const tabItem = {
  paddingBottom: 8,
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  color: "#111827",
  borderBottom: "3px solid transparent",
};

const activeTabStyle = {
  color: "#2563eb",
  borderBottom: "3px solid #2563eb",
};

const contentContainer = {
  padding: 16,
};

const emptyWrap = {
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  background: "#fff",
};

const patientInfoWrap = {
  padding: "16px 16px 6px",
};

const patientInfoTitle = {
  margin: "0 0 12px",
  fontSize: 22,
  color: "#111827",
};

const patientInfoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "10px 16px",
  borderTop: "1px solid #e5e7eb",
  paddingTop: 12,
  paddingBottom: 8,
};

const infoItem = {
  fontSize: 14,
  color: "#1f2937",
};

const preSoapWrap = {
  padding: "8px 16px 12px",
  borderTop: "1px solid #e5e7eb",
};

const consentGrid = {
  display: "grid",
  gap: 10,
  marginTop: 6,
  marginBottom: 10,
};

const checkRow = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  fontSize: 14,
  color: "#111827",
};

const uploadBox = {
  width: 120,
  textAlign: "center",
  border: "1px dashed #94a3b8",
  borderRadius: 8,
  padding: "8px 10px",
  fontSize: 13,
  color: "#475569",
  background: "#f8fafc",
};

const referralGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const soapTabRow = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  paddingTop: 8,
};

const soapTabItem = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#0f172a",
  borderBottom: "3px solid transparent",
};

const soapTabActive = {
  color: "#2451b3",
  borderBottom: "3px solid #2451b3",
};

const emptyContent = {
  minHeight: 380,
};
