import React from "react";
import "../styles/InitialAssessment.css";

export default function RAPInitialAssessment() {
  return (
    <div className="assessment-container">
      {/* Header Section */}
      <div className="patient-header-light h2">
        <h2>Diagnoses & Functional Profile</h2>
        <div className="assessment-tags">
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

      <h4 className="subheader">ICD · ICF capture</h4>

      {/* Two side-by-side boxes */}
      <div className="assessment-grid">
        {/* ICD Section */}
        <div className="assessment-box">
          <h3>Diagnoses (ICD-11)</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Description</th>
                <th>Primary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NCT72.3</td>
                <td>Injury of peroneal nerve</td>
                <td>
                  <select>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>ME82</td>
                <td>Type 2 diabetes mellitus</td>
                <td>
                  <select>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ICF Section */}
        <div className="assessment-box">
          <h3>Functional / Context (ICF)</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Severity</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>d450 Walking</td>
                <td>
                  <select>
                    <option>Severe</option>
                    <option>Moderate</option>
                    <option>Mild</option>
                  </select>
                </td>
                <td>
                  <input type="text" placeholder="Foot drop" />
                </td>
              </tr>
              <tr>
                <td>e120 Products/tech for mobility</td>
                <td>
                  <select>
                    <option>Barrier</option>
                    <option>Facilitator</option>
                  </select>
                </td>
                <td>
                  <input type="text" placeholder="Needs AFO" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
