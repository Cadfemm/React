import React from "react";
import "../styles/TherapyPlan.css";

export default function TherapyPlan() {
  return (
    <div className="therapy-container">
      {/* Header */}
      <div className="patient-header-light">
        <h2>Interventions (ICHI) & Protocols</h2>
        <div className="therapy-tags">
          <span className="tag">RAP State: Active</span>
          <span className="tag">Version: v3</span>
          <span className="tag">Managed by: <strong>Case Manager</strong></span>
          <span className="tag">Approver: <strong>HOD (CMO oversight)</strong></span>
          <span className="tag">Standards: ICD · ICF · ICHI · CARF</span>
          <div className="currency">
            Currency
            <select>
              <option>RM</option>
              <option>USD</option>
              <option>INR</option>
            </select>
          </div>
        </div>
      </div>

      <h4 className="subheader">Linked devices and guardrails</h4>

      {/* Buttons */}
      <div className="therapy-actions">
        <button className="primary-btn">Interventions (ICHI)</button>
        <button className="secondary-btn">Add Intervention</button>
        <button className="secondary-btn">Link Protocol</button>
      </div>

      {/* Table */}
      <div className="therapy-table-wrapper">
        <table className="therapy-table">
          <thead>
            <tr>
              <th>ICHI</th>
              <th>Protocol</th>
              <th>Freq</th>
              <th>Dosage</th>
              <th>Device</th>
              <th>Therapist</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>7A00 VR gait training</td>
              <td>VR Gait Level 1</td>
              <td>3/wk</td>
              <td>30.00 min</td>
              <td>VR-01</td>
              <td>Therapist A</td>
            </tr>
            <tr>
              <td>9B12 FES wrist flexor</td>
              <td>FES Wrist Flexor</td>
              <td>2/wk</td>
              <td>15.00 min</td>
              <td>FES-02</td>
              <td>Therapist B</td>
            </tr>
          </tbody>
        </table>

        {/* Guardrail Notice */}
        <div className="guardrail">
          Guardrail: FES protocol requires intact skin; verify assessment photo uploaded.
        </div>
      </div>
    </div>
  );
}
