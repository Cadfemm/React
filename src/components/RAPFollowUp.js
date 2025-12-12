import React from "react";
import "../styles/RAPFollowUp.css";

export default function RAPFollowUp() {
  return (
    <div className="followup-container">
      {/* Header */}
      <div className="patient-header-light">
        <h2>Approvals Inbox</h2>
        <div className="followup-tags">
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

      <h4 className="subheader">HOD queue</h4>

      {/* Buttons */}
      <div className="followup-actions">
        <button className="primary-btn">Approvals Inbox</button>
        <button className="secondary-btn">Bulk Approve</button>
        <button className="secondary-btn">Return with Comments</button>
      </div>

      {/* Table */}
      <div className="followup-table-wrapper">
        <table className="followup-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Item</th>
              <th>Version</th>
              <th>Submitted By</th>
              <th>Submitted On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Lee</td>
              <td>RAP</td>
              <td>v1</td>
              <td>Case Manager</td>
              <td>2025-10-20</td>
              <td><span className="status pending">Pending HOD</span></td>
            </tr>
            <tr>
              <td>John Lee</td>
              <td>Interim Report</td>
              <td>v1</td>
              <td>Case Manager</td>
              <td>2025-11-03</td>
              <td><span className="status pending">Pending HOD</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
