import React, { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});



function RAPTab({ data, onChange, onSave }) {
  const toggle = (k) =>
    onChange({
      ...data,
      checks: { ...data.checks, [k]: !data.checks[k] }
    });

  const setField = (k, v) => onChange({ ...data, [k]: v });
const [status, setStatus] = useState("idle"); // idle | saving | saved
  const total = 6;
  const done = Object.values(data.checks).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);
const handleSave = async (e) => {
    e.preventDefault();
    if (status === "saving") return;

    setStatus("saving");

    const MIN_DELAY = 2000; // 2s (set 3000 for ~3s)
    const start = Date.now();

    try {
      // TODO: call your real API here
      // await api.save(payload);
      await new Promise(r => setTimeout(r, 300)); // simulated fast save

      const elapsed = Date.now() - start;
      if (elapsed < MIN_DELAY) {
        await new Promise(r => setTimeout(r, MIN_DELAY - elapsed));
      }

      setStatus("saved");
      
    } catch (e2) {
      setStatus("idle"); // or keep saved/error as you prefer
    }
  };
  return (
    <section className="card rap-wrap">
      <div className="rap-header">
        <h2 className="title">RAP • Case & RTW</h2>
        <span className="pill right">CARF aligned</span>
      </div>

      {/* Readiness checklist */}
      <div className="box rap-card">
        <div className="box-title">Readiness to Work (RTW)</div>

        <div className="check-grid">
          <label className="check"><input type="checkbox" checked={data.checks.tps} onChange={()=>toggle("tps")}/> TPS completed (evidence)</label>
          <label className="check"><input type="checkbox" checked={data.checks.med} onChange={()=>toggle("med")}/> Medical clearance</label>
          <label className="check"><input type="checkbox" checked={data.checks.workplace} onChange={()=>toggle("workplace")}/> Workplace modification plan</label>
          <label className="check"><input type="checkbox" checked={data.checks.vocational} onChange={()=>toggle("vocational")}/> Vocational retraining plan</label>
          <label className="check"><input type="checkbox" checked={data.checks.family} onChange={()=>toggle("family")}/> Family readiness/support</label>
          <label className="check"><input type="checkbox" checked={data.checks.employer} onChange={()=>toggle("employer")}/> Employer commitment/placement</label>
        </div>

        <div className="progress-row">
          <div className="label">Computed Readiness</div>
          <div className="progress">
            <div className="bar" style={{width: `${pct}%`}} />
          </div>
          <div className="pct">{pct}%</div>
        </div>
      </div>

      {/* Light-Duty Proposal */}
      <div className="box rap-card">
        <div className="box-title">Light-Duty Proposal</div>

        <div className="rap-form">
          <div className="row">
            <div className="label">Start date</div>
            <input className="input" type="date"
              value={data.start_date}
              onChange={e=>setField("start_date", e.target.value)}
            />
          </div>

          <div className="row">
            <div className="label">Duration (weeks)</div>
            <select className="input"
              value={data.duration_weeks}
              onChange={e=>setField("duration_weeks", Number(e.target.value))}>
              {Array.from({length:12}, (_,i)=>i+1).map(n=>(
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="label">Placement</div>
            <select className="input"
              value={data.placement}
              onChange={e=>setField("placement", e.target.value)}>
              <option>Light assembly / QC</option>
              <option>Clerical / front desk</option>
              <option>Inventory (no lifting)</option>
              <option>Adjusted workstation</option>
            </select>
          </div>

          <div className="row" style={{alignItems:"start"}}>
            <div className="label">Restrictions & accommodations</div>
            <textarea
              className="input ta"
              rows={4}
              value={data.restrictions}
              onChange={e=>setField("restrictions", e.target.value)}
              placeholder="e.g., No lifting >10kg; avoid ladder work; adjustable workstation"
            />
          </div>
        </div>

        {/* <div className="actions">
          <button className="btn savebtn" onClick={onSave}>Save</button>
        </div> */}
<div className="actions">
      <button
        className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`}
        style={{ margin: "20px" }}
        type="button"          // use "button" so form doesn't auto-submit
        onClick={handleSave}
        disabled={status === "saving"}
        aria-busy={status === "saving"}
      >
        {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save"}
      </button>
    </div>

      </div>

      {/* CARF - Closure Criteria */}
      <div className="box rap-card">
        <div className="box-title">CARF-Closure Criteria</div>

        <li>Suitable employment secured / return to original job with accommodations</li>
        <li>30/60/90 day sustainability checks documented</li>
        <li>Residual barriers addressed; follow-up plan in place</li>
      </div>






    </section>
  );
}
export default RAPTab;