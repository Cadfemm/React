import React, { useState } from "react";
import { k, SaveRow, ProximalTable, PerformTable, TableHeading } from "./NeuracShared";

const HIP_PROXIMAL = [
  { group: null, tests: ["Supine Pelvic Lift","Supine Bridge","Side-lying Hip Adduction","Side-lying Hip Abduction","Prone Hip Extension"] },
  { group: "Additional Tests*", tests: ["Scapular Protraction","Scapular Retraction"] },
];
const PERFORM_ROWS = ["Core Brace","Abduction","Heel Raise","Scapula Assist"];
const PROXIMAL_TOOLTIP = ["0 = Weak Link (Neurac treatment indicated)","Decide:","P = Pain","D = Dysfunctional Movement","F = Functional Movement"];
const SOAP_TABS = ["subjective","objective","assessment","plan"];

export default function HipNeuracAssessment({ values = {}, onChange, onSave, onClear }) {
  const [activeTab, setActiveTab] = useState("subjective");
  const get = (key) => values[key] || "";
  const set = (key, val) => onChange(key, val);

  return (
    <div style={{ background: "#fff" }}>
      <div style={tabBar}>
        {SOAP_TABS.map(tab => (
          <div key={tab} style={activeTab === tab ? tabActive : tabBtn} onClick={() => setActiveTab(tab)}>
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {activeTab === "subjective" && (
        <div style={tabContent}>
          <div style={fieldLabel}>Chief Complaint</div>
          <textarea style={textareaStyle} value={get("hip_chief_complaint")} onChange={e => set("hip_chief_complaint", e.target.value)} placeholder="Enter chief complaint..." />
          <div style={fieldLabel}>History of Presenting Illness</div>
          <textarea style={textareaStyle} value={get("hip_hopi")} onChange={e => set("hip_hopi", e.target.value)} placeholder="Enter history..." />
          <div style={fieldLabel}>Short Term Goals</div>
          <input style={inputStyle} value={get("hip_short_goals")} onChange={e => set("hip_short_goals", e.target.value)} placeholder="Short term goals..." />
          <div style={fieldLabel}>Long Term Goals</div>
          <input style={inputStyle} value={get("hip_long_goals")} onChange={e => set("hip_long_goals", e.target.value)} placeholder="Long term goals..." />
          <SaveRow onSave={onSave} onClear={onClear} />
        </div>
      )}

      {activeTab === "objective" && (
        <div style={tabContent}>
          <PerformTable prefix="hip" rows={PERFORM_ROWS} values={values} onChange={onChange} />
          <TableHeading title="Myofascial Chain Tests for Hip Examination" tooltip={PROXIMAL_TOOLTIP} />
          <ProximalTable title="" prefix="hip_px" groups={HIP_PROXIMAL} values={values} onChange={onChange} />
          <SaveRow onSave={onSave} onClear={onClear} />
        </div>
      )}

      {activeTab === "assessment" && (
        <div style={tabContent}>
          <div style={fieldLabel}>Clinical Impression</div>
          <textarea style={textareaStyle} value={get("hip_clinical_impression")} onChange={e => set("hip_clinical_impression", e.target.value)} placeholder="Enter clinical findings..." />
          <SaveRow onSave={onSave} onClear={onClear} />
        </div>
      )}

      {activeTab === "plan" && (
        <div style={tabContent}>
          <div style={fieldLabel}>Interventions</div>
          <input style={inputStyle} value={get("hip_interventions")} onChange={e => set("hip_interventions", e.target.value)} placeholder="Enter interventions..." />
          <div style={fieldLabel}>Plan</div>
          <textarea style={textareaStyle} value={get("hip_plan")} onChange={e => set("hip_plan", e.target.value)} placeholder="Enter plan..." />
          <SaveRow onSave={onSave} onClear={onClear} />
        </div>
      )}
    </div>
  );
}

const tabBar    = { display: "flex", gap: 12, justifyContent: "center", borderBottom: "1px solid #ddd" };
const tabBtn    = { padding: "10px 22px", fontWeight: 600, cursor: "pointer", color: "#0f172a" };
const tabActive = { ...tabBtn, borderBottom: "3px solid #2451b3", color: "#2451b3" };
const tabContent = { padding: "16px 20px" };
const fieldLabel = { fontWeight: 600, fontSize: 14, color: "#374151", marginBottom: 6, marginTop: 12 };
const textareaStyle = { width: "100%", minHeight: 90, padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, resize: "vertical", marginBottom: 4 };
const inputStyle    = { width: "100%", padding: "9px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, marginBottom: 4 };
