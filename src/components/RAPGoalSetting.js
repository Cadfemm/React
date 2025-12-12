import React from "react";
import "../styles/GoalSetting.css";

export default function GoalSetting() {
  return (
    <div className="goal-container">
      {/* Header */}
      <div className="patient-header-light">
        <h2>SMART Goals & GAS</h2>
        <div className="goal-tags">
          <span className="tag">RAP State: Active</span>
          <span className="tag">Version: v3</span>
          <span className="tag">
            Managed by: <strong>Case Manager</strong>
          </span>
          <span className="tag">
            Approver: <strong>HOD (CMO oversight)</strong>
          </span>
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

      <h4 className="subheader">Targets and attainment scales</h4>

      {/* Action Buttons */}
      <div className="goal-actions">
        <button className="primary-btn">SMART Goals & GAS</button>
        <button className="secondary-btn">Add Goal</button>
        <button className="secondary-btn">From Template (Neuro)</button>
      </div>

      {/* Table Section */}
      <div className="goal-table-wrapper">
        <table className="goal-table">
          <thead>
            <tr>
              <th>Goal</th>
              <th>ICF</th>
              <th>Target</th>
              <th>GAS</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ambulate 20.00 m without AFO</td>
              <td>d450</td>
              <td>4.00 weeks</td>
              <td>0 = 20.00 m · +2 = 40.00 m</td>
              <td>Therapist</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
