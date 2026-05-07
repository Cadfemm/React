import React from "react";
import {
  k, Sel, CellInput, SaveRow, Legend, ProximalTable, SettingsTable, PerformTable, TableHeading,
  OPTS_01, tbl, tdC, legend01,
} from "./NeuracShared";

const CERVICAL_MOVEMENTS = ["Retraction","Rotation Right","Rotation Left","Lat Flex Right","Lat Flex Left","Extension"];
const CERVICAL_SETTINGS  = ["Supine Cervical Setting","Prone Cervical Setting","Inclined Sitting Cervical Setting","Left Side-lying Cervical Setting","Right Side-lying Cervical Setting"];
const PROXIMAL_GROUPS = [
  { group: "Lumbo-Pelvic-Hip",  tests: ["Supine Pelvic Lift","Supine Bridge","Side-lying Hip Adduction","Side-lying Hip Abduction"] },
  { group: "Shoulder Complex",  tests: ["Scapular Protraction","Scapular Retraction","Shoulder Abd/ER","Shoulder Abd/IR"] },
  { group: "Other",             tests: ["",""] },
];

const PERFORM_ROWS = [
  "Core Brace","Abduction","Heel Raise","Adduction",
  "Scapula Assist","Scapula Retraction","Scapula Stabilization",
];

const MOVEMENT_TOOLTIP = ["0 = Not satisfactory (Neurac treatment indicated)","1 = Satisfactory"];
const PROXIMAL_TOOLTIP = ["0 = Weak Link (Neurac treatment indicated)","Decide:","P = Pain","D = Dysfunctional Movement","F = Functional Movement"];

export default function CervicalNeuracAssessment({ values = {}, onChange, onSave, onClear }) {
  const get = (key) => values[key] || "";
  const set = (key, val) => onChange(key, val);

  const mvTotal = (test) =>
    ["rom","mc","pfm"].reduce((s, col) => s + (Number(get(`cm_${k(test)}_${col}`)) || 0), 0);
  const colTotal = (col) =>
    CERVICAL_MOVEMENTS.reduce((s, t) => s + (Number(get(`cm_${k(t)}_${col}`)) || 0), 0);
  const overallTotal = () =>
    CERVICAL_MOVEMENTS.reduce((s, t) => s + mvTotal(t), 0);

  return (
    <div style={{ padding: "16px 20px", background: "#fff" }}>

      {/* 4) Perform+ Test */}
      <PerformTable prefix="cervical" rows={PERFORM_ROWS} values={values} onChange={onChange} />

      {/* Neurac Test Protocol — Cervical Movements */}
      <TableHeading title="Neurac Test Protocol — Cervical Movements" tooltip={MOVEMENT_TOOLTIP} />
      <div style={{ overflowX: "auto", marginBottom: 4 }}>
        <table style={tbl}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: 160, textAlign: "left" }}>Tests</th>
              <th style={thStyle}>ROM</th>
              <th style={thStyle}>Movement Control</th>
              <th style={thStyle}>Pain Free Movement</th>
              <th style={{ ...thStyle, minWidth: 130 }}>Comments</th>
              <th style={{ ...thStyle, width: 60 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {CERVICAL_MOVEMENTS.map(test => (
              <tr key={test}>
                <td style={{ padding: "7px 10px", border: "1px solid #e5e7eb", color: "#dc2626", fontWeight: 600 }}>{test}</td>
                <td style={tdC}><Sel options={OPTS_01} value={get(`cm_${k(test)}_rom`)} onChange={v => set(`cm_${k(test)}_rom`, v)} /></td>
                <td style={tdC}><Sel options={OPTS_01} value={get(`cm_${k(test)}_mc`)}  onChange={v => set(`cm_${k(test)}_mc`,  v)} /></td>
                <td style={tdC}><Sel options={OPTS_01} value={get(`cm_${k(test)}_pfm`)} onChange={v => set(`cm_${k(test)}_pfm`, v)} /></td>
                <td style={{ padding: "7px 10px", border: "1px solid #e5e7eb" }}><CellInput value={get(`cm_${k(test)}_comment`)} onChange={v => set(`cm_${k(test)}_comment`, v)} /></td>
                <td style={{ ...tdC, fontWeight: 700, color: "#2563eb" }}>/{mvTotal(test)}</td>
              </tr>
            ))}
            <tr style={{ background: "#f1f5f9" }}>
              <td style={{ padding: "7px 10px", border: "1px solid #e5e7eb", fontWeight: 700 }}>Total Scores</td>
              <td style={{ ...tdC, fontWeight: 700 }}>/{colTotal("rom")}</td>
              <td style={{ ...tdC, fontWeight: 700 }}>/{colTotal("mc")}</td>
              <td style={{ ...tdC, fontWeight: 700 }}>/{colTotal("pfm")}</td>
              <td style={{ padding: "7px 10px", border: "1px solid #e5e7eb", fontWeight: 700, color: "#6b7280" }}>Overall Score</td>
              <td style={{ ...tdC, fontWeight: 800, color: "#2563eb" }}>/{overallTotal()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Legend text={legend01} />

      {/* Cervical Settings */}
      <TableHeading title="Cervical Settings" tooltip={MOVEMENT_TOOLTIP} />
      <SettingsTable title="" prefix="cs" rows={CERVICAL_SETTINGS} values={values} onChange={onChange} />

      {/* Additional Proximal Tests */}
      <TableHeading title="Additional Myofascial Chain Tests for Neck Examination" tooltip={PROXIMAL_TOOLTIP} />
      <ProximalTable title="" prefix="cx_px" groups={PROXIMAL_GROUPS} values={values} onChange={onChange} />

      <SaveRow onSave={onSave} onClear={onClear} />
    </div>
  );
}

const thStyle = {
  background: "#f1f5f9", fontWeight: 700, padding: "8px 10px",
  border: "1px solid #d1d5db", color: "#111827", textAlign: "center",
};
