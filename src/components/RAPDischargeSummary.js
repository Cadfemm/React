import React from "react";
import "../styles/DischargeSummary.css";

export default function DischargeSummary() {
  return (
    <div className="discharge-container">
      {/* Header */}
      <div className="patient-header-light">
        <h2>Discharge Report</h2>
        <div className="discharge-tags">
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

      <h4 className="subheader">Final outcomes & spend</h4>

      {/* Buttons */}
      <div className="discharge-actions">
        <button className="primary-btn">Discharge Report</button>
        <button className="secondary-btn">Print</button>
        <button className="secondary-btn">Export PDF</button>
      </div>

      {/* Summary Table */}
      <div className="discharge-box">
        <table className="data-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Diagnoses (ICD)</td>
              <td>NCT72.3, ME82</td>
            </tr>
            <tr>
              <td>Interventions (ICHI)</td>
              <td>7A00, 9B12</td>
            </tr>
            <tr>
              <td>Outcomes (ICF)</td>
              <td>d450 improved to Mild</td>
            </tr>
            <tr>
              <td>GAS</td>
              <td>0 = 20.00 m, +1 = 30.00 m</td>
            </tr>
            <tr>
              <td>Authorisation</td>
              <td>Sessions used 25.00 / 30, Spend RM 33,600.00</td>
            </tr>
          </tbody>
        </table>
        <p className="signoff">
          Sign-off: Therapist → Case Manager → HOD → CMO (optional)
        </p>
      </div>
    </div>
  );
}
