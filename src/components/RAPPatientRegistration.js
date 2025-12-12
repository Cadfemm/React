import React from "react";
import "../styles/PatientRegistration.css";

export default function RAPPatientRegistration() {
  return (
    <div className="patient-container-light">
      <div className="patient-header-light">
        <h2>Patient Overview</h2>
        <div className="patient-header-tags">
          <span className="tag-light">RAP State: Active</span>
          <span className="tag-light">Version: v3</span>
          <span className="tag-light">
            Managed by: <strong>Case Manager</strong>
          </span>
          <span className="tag-light">
            Approver: <strong>HOD (CMO oversight)</strong>
          </span>
          <span className="tag-light">Standards: ICD · ICF · ICHI · CARF</span>
          <div className="currency-light">
            Currency
            <select>
              <option>RM</option>
              <option>USD</option>
              <option>INR</option>
            </select>
          </div>
        </div>
      </div>

      <h4 className="subheader-light">Scheme / Eligibility & Summary</h4>

      <div className="form-grid-light">
        <div className="form-group-light">
          <label>Patient</label>
          <input type="text" placeholder="John Lee / MRN" />
        </div>

        <div className="form-group-light">
          <label>Employer / Injury Date</label>
          <input type="text" placeholder="ABC Sdn Bhd / 2025-09-12" />
        </div>

        <div className="form-group-light">
          <label>Scheme</label>
          <input type="text" placeholder="Employment Injury" />
        </div>

        <div className="form-group-light">
          <label>Benefit Code</label>
          <input type="text" placeholder="e.g., PRS-01" />
        </div>

        <div className="form-group-light">
          <label>PERKESO Case ID</label>
          <input type="text" placeholder="PSK-2025-000123" />
        </div>

        <div className="form-group-light">
          <label>Eligibility</label>
          <select>
            <option>Verified</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="form-group-light">
          <label>Funding Window</label>
          <input type="text" placeholder="2025-09-12 – 2025-10-05" />
        </div>

        <div className="form-group-light full">
          <label>Case Summary</label>
          <textarea placeholder="Injury and cuts in the leg dimensional area, baseline risk…" />
        </div>
      </div>
    </div>
  );
}
