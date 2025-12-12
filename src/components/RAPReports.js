import React from "react";
import "../styles/RAPSubmission.css";

export default function RAPSubmission() {
  return (
    <div className="rap-container">
      {/* Header */}
      <div className="patient-header-light">
        <h2>Submission Pack (PERKESO)</h2>
        <div className="rap-tags">
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

      <h4 className="subheader">Artifacts for payer submission</h4>

      {/* Action Buttons */}
      <div className="rap-actions">
        <button className="primary-btn">Submission Pack</button>
        <button className="secondary-btn">Assemble</button>
        <button className="secondary-btn">Mark as Submitted</button>
      </div>

      {/* Table */}
      <div className="rap-table-wrapper">
        <table className="rap-table">
          <thead>
            <tr>
              <th>Artifact</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Interim/Discharge Report PDF</td>
              <td><span className="status ready">Ready</span></td>
              <td>Generated today</td>
            </tr>
            <tr>
              <td>Code Summary (ICD/ICF/ICHI)</td>
              <td><span className="status ready">Ready</span></td>
              <td>Attached</td>
            </tr>
            <tr>
              <td>Authorisation Letter</td>
              <td><span className="status ready">Ready</span></td>
              <td>Auto-filled</td>
            </tr>
            <tr>
              <td>Evidence (photos, consent)</td>
              <td><span className="status ready">Ready</span></td>
              <td>2 files</td>
            </tr>
            <tr>
              <td>E-billing CSV</td>
              <td><span className="status pending">Pending</span></td>
              <td>Generate after HOD sign-off</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
