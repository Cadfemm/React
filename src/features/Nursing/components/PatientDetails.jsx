import React, { useState } from "react";
import NursingAssessment from "./NursingAssessment";
import ShiftAssessment from "./ShiftAssessment";
import WoundAssessment from "../pages/WoundAssessment";
import CarerLogBook from "./CarerLogBook";
import NursingSwallowScreener from "./NursingSwallowScreener";

const MAIN_TABS = [
  { key: "admission",    label: "Admission Nursing" },
  { key: "shift",        label: "Shift Assessment" },
  { key: "wound",        label: "Wound Assessment (WATFS)" },
  { key: "carer",        label: "Carer Log Book" },
  // { key: "swallow",      label: "Swallow Screener" },
  { key: "reassessment", label: "Re Assessment" },
  { key: "discharge",    label: "Discharge" },
];

export default function PatientDetails({ patient, onBack }) {
  const [activeMainTab, setActiveMainTab] = useState("admission");

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12, padding: "16px 24px 0" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#2563eb", fontSize: 14 }}>
          Back
        </button>
      </div>

      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #ddd", marginBottom: 12, padding: "0 24px", flexWrap: "wrap" }}>
        {MAIN_TABS.map(({ key, label }) => (
          <div
            key={key}
            onClick={() => setActiveMainTab(key)}
            style={{
              padding: "10px 18px", fontWeight: 600, cursor: "pointer", fontSize: 13,
              borderBottom: activeMainTab === key ? "3px solid #2451b3" : "3px solid transparent",
              color: activeMainTab === key ? "#2451b3" : "#0f172a",
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {activeMainTab === "admission" && (
        <NursingAssessment patient={patient} onSubmit={(v) => console.log(v)} onBack={onBack} />
      )}
      {activeMainTab === "shift" && (
        <ShiftAssessment patient={patient} onSubmit={(v) => console.log(v)} onBack={() => setActiveMainTab("admission")} />
      )}
      {activeMainTab === "wound" && (
        <WoundAssessment patient={patient} onBack={() => setActiveMainTab("admission")} />
      )}
      {activeMainTab === "carer" && (
        <CarerLogBook patient={patient} onBack={() => setActiveMainTab("admission")} />
      )}
      {/* {activeMainTab === "swallow" && (
        <NursingSwallowScreener patient={patient} onBack={() => setActiveMainTab("admission")} />
      )} */}
      {activeMainTab === "reassessment" && (
        <div style={{ padding: 24, color: "#6b7280" }}>Re Assessment – Coming soon</div>
      )}
      {activeMainTab === "discharge" && (
        <div style={{ padding: 24, color: "#6b7280" }}>Discharge – Coming soon</div>
      )}
    </div>
  );
}
