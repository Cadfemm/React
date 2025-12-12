import React from "react";
import "../styles/ReviewAdjust.css";

export default function ReviewAdjust() {
  return (
    <div className="review-container">
      {/* Header */}
      <div className="patient-header-light">
        <h2>Review & Adjust</h2>
        <div className="review-tags">
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

      {/* ---------------------- INTERIM REPORT ---------------------- */}
      <section className="review-section">
        <h4 className="subheader">Interim Report</h4>

        <div className="review-actions">
          <button className="primary-btn">Interim Report</button>
          <button className="secondary-btn">Print</button>
          <button className="secondary-btn">Export PDF</button>
        </div>

        <div className="two-column">
          {/* Left column: Progress */}
          <div className="review-box">
            <h3>Progress Summary</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Measure</th>
                  <th>Baseline</th>
                  <th>Current</th>
                  <th>Δ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Berg</td>
                  <td>24.00 pts</td>
                  <td>31.00 pts</td>
                  <td>7.00 pts</td>
                </tr>
              </tbody>
            </table>
            <div className="chart-placeholder">
              <div className="chart-line"></div>
            </div>
          </div>

          {/* Right column: Adherence */}
          <div className="review-box">
            <h3>Sessions & Adherence</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Planned</th>
                  <th>Completed</th>
                  <th>Adherence</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>20.00</td>
                  <td>17.00</td>
                  <td>85.00%</td>
                </tr>
              </tbody>
            </table>
            <p className="signoff">Sign-off: Therapist → Case Manager → HOD</p>
          </div>
        </div>
      </section>

      {/* ---------------------- BUDGET & AUTHORISATION ---------------------- */}
      <section className="review-section">
        <h2 style={{color:"#3A3FAD"}}className="patient-header-light">Budget & Authorisation</h2>

        <div className="review-actions">
          <button className="primary-btn">Benefit Caps & Tariff</button>
          <button className="secondary-btn">Recalc Budget</button>
          <button className="secondary-btn">Request Authorisation</button>
        </div>

        <div className="two-column">
          {/* Left Column: Line Items */}
          <div className="review-box">
            <h3>Line Items</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TH-VR</td>
                  <td>VR Session</td>
                  <td>12</td>
                  <td>RM1,800.00</td>
                  <td>RM21,600.00</td>
                </tr>
                <tr>
                  <td>TH-FES</td>
                  <td>FES Session</td>
                  <td>8</td>
                  <td>RM1,200.00</td>
                  <td>RM9,600.00</td>
                </tr>
              </tbody>
            </table>
            <p className="note">
              Compliance checks: caps, dates within funding window, eligible codes, evidence uploaded.
            </p>
          </div>

          {/* Right Column: Caps */}
          <div className="review-box">
            <h3>Authorisation & Caps</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Session Cap</td>
                  <td>30.00</td>
                </tr>
                <tr>
                  <td>Amount Cap</td>
                  <td>RM40,000.00</td>
                </tr>
                <tr>
                  <td>Authorisation #</td>
                  <td className="muted">AUTO on approval</td>
                </tr>
                <tr>
                  <td>Balance</td>
                  <td className="green-text">RM12,400.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
