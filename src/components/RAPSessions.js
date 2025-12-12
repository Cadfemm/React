import React from "react";
import "../styles/RAPSessions.css";

export default function RAPSessions() {
  return (
    <div className="schedule-container">
      {/* Header */}
      <div className="patient-header-light">
        <h2>Scheduling & Phases</h2>
        <div className="schedule-tags">
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

      <h4 className="subheader">Criteria-based progression</h4>

      {/* Action Buttons */}
      <div className="schedule-actions">
        <div>
          <button className="primary-btn">Phases & Criteria</button>
          <button className="secondary-btn">Add Criteria</button>
        </div>
        <button className="secondary-btn right-btn">
          Auto alerts when criteria met
        </button>
      </div>

      {/* Criteria Table */}
      <div className="schedule-table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Phase</th>
              <th>Entry Criteria</th>
              <th>Exit Criteria</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Phase 1</td>
              <td>Berg +5.00 in 2.00 weeks</td>
              <td>Walk 20.00 m unaided</td>
            </tr>
          </tbody>
        </table>

        {/* Sub-actions */}
        <div className="sub-actions">
          <button className="secondary-btn">Scheduling</button>
          <button className="secondary-btn">Check Conflicts</button>
          <button className="secondary-btn">Notify Patient</button>
        </div>

        {/* Session Table */}
        <table className="schedule-table mt-2">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Intervention</th>
              <th>Resource</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-10-22</td>
              <td>10:00</td>
              <td>VR Gait</td>
              <td>VR-01 / R1</td>
              <td>Booked</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
