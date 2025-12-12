import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});


function TaskPerformanceSimulationTab({ patientId, value, onChange, onSaved }) {
  const DEMANDS = ["Seldom", "Occasional", "Frequent"];
  const [status, setStatus] = useState("idle"); // idle | saving | saved
  const [jobDemandBased, setJobDemandBased] = React.useState(value?.jobDemandBased ?? true);
  const [rows, setRows] = React.useState(
    value?.rows || [
      { task: "Lift 10 kg crate (floor-table)", demand: "Occasional", result: "Completed with mild pain", pass: "Yes" },
      { task: "Overhead reach 1 min", demand: "Frequent", result: "Requires pacing / brief rest", pass: "Yes" },
      { task: "Climb ladder 3 rungs", demand: "Seldom", result: "Not attempted — safety", pass: "No" }
    ]
  );
  const [evidence, setEvidence] = React.useState(
    value?.evidence || "Video evidence attached for lift task; HR to review for fit-to-task mapping."
  );

  React.useEffect(() => {
    if (!patientId) return;
    (async () => {
      try {
        const r = await fetch(`${API}/tps/${encodeURIComponent(patientId)}`);
        if (r.ok) {
          const d = await r.json();
          setJobDemandBased(!!d.jobDemandBased);
          setRows(d.rows || []);
          setEvidence(d.evidence || "");
        }
      } catch {}
    })();
  }, [patientId]);

  React.useEffect(() => onChange?.({ jobDemandBased, rows, evidence }), [jobDemandBased, rows, evidence, onChange]);

  const addRow = () => setRows(r => [...r, { task: "", demand: "Occasional", result: "", pass: "Yes" }]);
  const delRow = (i) => setRows(r => r.filter((_, idx) => idx !== i));
  const setCell = (i, patch) => setRows(r => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));

  const save = async () => {
    if (!patientId) return;
    try {
      await fetch(`${API}/tps/${encodeURIComponent(patientId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDemandBased, rows, evidence })
      });
      onSaved?.(); // add to audit trail
    } catch {
      // optionally toast
    }
  };
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
    <section className="card">
      <div className="tps-head">
        <div className="soap-title">Task Performance Simulation (TPS)</div>
        <span className="btn tiny" title="toggle">{jobDemandBased ? "Job-demand based" : "Not job-demand based"}</span>
      </div>

      <div className="box soft">
        <table className="table">
          <thead>
            <tr>
              <th style={{width:"38%"}}>Task</th>
              <th style={{width:"16%"}}>Job demand</th>
              <th>Observed result</th>
              <th style={{width:"10%"}}>Pass</th>
              <th style={{width:"6%"}}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>
                  <input className="input" value={r.task} onChange={e=>setCell(i,{task:e.target.value})} />
                </td>
                <td>
                  <select className="input" value={r.demand} onChange={e=>setCell(i,{demand:e.target.value})}>
                    {DEMANDS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </td>
                <td>
                  <input className="input" value={r.result} onChange={e=>setCell(i,{result:e.target.value})} />
                </td>
                <td>
                  <select className="input" value={r.pass} onChange={e=>setCell(i,{pass:e.target.value})}>
                    <option>Yes</option><option>No</option>
                  </select>
                </td>
                <td><button className="ms-mini" onClick={()=>delRow(i)} title="Remove">✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="actions">
          <button className="btn" onClick={addRow}>Add task</button>
        </div>
      </div>

      <div className="box soft">
        <div className="box-title">Summary & Evidence</div>
        <textarea
          className="input ta"
          rows={4}
          value={evidence}
          onChange={e=>setEvidence(e.target.value)}
          placeholder="Notes, links to videos, HR review points…"
        />
      </div>

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
    </section>
  );
}
export default TaskPerformanceSimulationTab;