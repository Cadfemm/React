import React, { useState, useEffect } from "react";

function Sec({ title, expanded, onToggle, children }) {
  return (
    <div style={st.section}>
      <div style={st.secHead} onClick={onToggle}>
        <span style={st.secTitle}>{title}</span>
        <span style={{ fontSize: 12, color: "#93c5fd" }}>{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && <div style={st.secBody}>{children}</div>}
    </div>
  );
}
function SecStatic({ title, children }) {
  return (
    <div style={st.section}>
      <div style={{ ...st.secHead, cursor: "default" }}>
        <span style={st.secTitle}>{title}</span>
      </div>
      <div style={st.secBody}>{children}</div>
    </div>
  );
}
function F({ label, children }) {
  return <div style={st.field}>{label && <label style={st.label}>{label}</label>}{children}</div>;
}
function Inp({ name, type = "text", step, v, set }) {
  return <input type={type} step={step} value={v[name] ?? ""} style={st.input} onChange={e => set(name, type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value)} />;
}
function Txt({ name, rows = 2, v, set }) {
  return <textarea rows={rows} value={v[name] ?? ""} style={st.textarea} onChange={e => set(name, e.target.value)} />;
}
function Sel({ name, opts, v, set }) {
  return (
    <select value={v[name] ?? ""} style={st.select} onChange={e => set(name, e.target.value)}>
      <option value="">Select...</option>
      {opts.map(o => { const val = typeof o === "object" ? o.value : o; const lbl = typeof o === "object" ? o.label : o; return <option key={val} value={val}>{lbl}</option>; })}
    </select>
  );
}
function Radios({ name, opts, v, set }) {
  return (
    <div style={st.radioGroup}>
      {opts.map(o => { const val = typeof o === "object" ? o.value : o; const lbl = typeof o === "object" ? o.label : o;
        return <label key={val} style={st.radioLabel}><input type="radio" name={name} value={val} checked={v[name] === val} onChange={() => set(name, val)} style={{ marginRight: 5 }} />{lbl}</label>; })}
    </div>
  );
}
function Checks({ name, opts, v, set }) {
  const cur = v[name] || [];
  const toggle = val => set(name, cur.includes(val) ? cur.filter(x => x !== val) : [...cur, val]);
  return (
    <div style={st.radioGroup}>
      {opts.map(o => { const val = typeof o === "object" ? o.value : o; const lbl = typeof o === "object" ? o.label : o;
        return <label key={val} style={st.radioLabel}><input type="checkbox" checked={cur.includes(val)} onChange={() => toggle(val)} style={{ marginRight: 5 }} />{lbl}</label>; })}
    </div>
  );
}
function NRS({ name, v, set }) {
  const val = v[name] ?? 0;
  const scoreColor = val >= 7 ? "#ef4444" : val >= 4 ? "#f59e0b" : "#3b82f6";
  const scoreLabel = val <= 3 ? "Mild (0–3)" : val <= 6 ? "Moderate (4–6)" : "Severe (7–10)";
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        {[["Mild (0–3)", "#3b82f6"], ["Moderate (4–6)", "#f59e0b"], ["Severe (7–10)", "#ef4444"]].map(([lbl, c]) => (
          <span key={lbl} style={{ fontSize: 12, fontWeight: 600, color: "#fff", background: c, borderRadius: 20, padding: "3px 12px" }}>{lbl}</span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2, padding: "0 1px" }}>
        {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
          <span key={n} style={{ fontSize: 11, color: "#9ca3af", width: 18, textAlign: "center" }}>{n}</span>
        ))}
      </div>
      <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 8, borderRadius: 999, pointerEvents: "none",
          background: "linear-gradient(to right,#3b82f6 0%,#3b82f6 30%,#f59e0b 30%,#f59e0b 60%,#ef4444 60%,#ef4444 100%)" }} />
        <input type="range" min={0} max={10} value={val}
          onChange={e => set(name, Number(e.target.value))}
          className="nrs-slider"
          style={{ position: "relative", zIndex: 1, width: "100%", margin: 0,
            appearance: "none", WebkitAppearance: "none", background: "transparent", cursor: "pointer", height: 20 }} />
      </div>
      <div style={{ marginTop: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: scoreColor, borderRadius: 6, padding: "3px 12px" }}>
          Score: {val} — {scoreLabel}
        </span>
      </div>
    </div>
  );
}
function ScoreBox({ label, value, color }) {
  return (
    <div style={{ border: `2px solid ${color || "#2563eb"}`, borderRadius: 8, padding: "8px 16px", minWidth: 110, textAlign: "center", color: color || "#2563eb" }}>
      <div style={{ fontSize: 11, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{value ?? "—"}</div>
    </div>
  );
}
function ADLTable({ v, set }) {
  const domains = ["Feeding","Grooming","Bathing","Dressing (upper)","Dressing (lower)","Toileting","Continence"];
  const levels = ["Independent","Setup only","Partial assist (25-75%)","Full assist / Total","N/A"];
  return (
    <div style={{ overflowX: "auto", marginBottom: 12 }}>
      <table style={st.table}>
        <thead><tr><th style={st.th}>ADL Domain</th>{levels.map(l => <th key={l} style={st.th}>{l}</th>)}</tr></thead>
        <tbody>{domains.map(d => { const key = "adl_" + d.toLowerCase().replace(/[^a-z]/g, "_"); return (
          <tr key={d}><td style={st.td}>{d}</td>{levels.map(l => <td key={l} style={{ ...st.td, textAlign: "center" }}><input type="radio" name={key} value={l} checked={v[key] === l} onChange={() => set(key, l)} /></td>)}</tr>
        );})}</tbody>
      </table>
    </div>
  );
}
function DynBlock({ items, name, set, addLabel, children }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={st.block}>
          <div style={st.blockHead}>
            <b>{addLabel.replace("+ Add ", "")} {i + 1}</b>
            {items.length > 1 && <button onClick={() => set(name, items.filter((_, j) => j !== i))} style={st.rmBtn}>✕</button>}
          </div>
          {children(item, i)}
        </div>
      ))}
      <button onClick={() => set(name, [...items, {}])} style={st.addBtn}>{addLabel}</button>
    </div>
  );
}
function WoundTable({ v, set }) {
  const wounds = v.wounds || [{},{},{}];
  const upd = (i, f, val) => { const n = [...wounds]; n[i] = { ...n[i], [f]: val }; set("wounds", n); };
  const addRow = () => set("wounds", [...wounds, {}]);
  return (
    <div style={{ marginBottom: 8 }}>
      <table style={{ ...st.table, tableLayout: "fixed", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ ...st.th, width: 28 }}>#</th>
            <th style={{ ...st.th, width: "16%" }}>Site / Type</th>
            <th style={{ ...st.th, width: "11%" }}>Size (L×W×D cm)</th>
            <th style={{ ...st.th, width: "12%" }}>Tissue type</th>
            <th style={{ ...st.th, width: "12%" }}>Exudate</th>
            <th style={{ ...st.th, width: "10%" }}>Odour</th>
            <th style={{ ...st.th, width: "14%" }}>Periwound skin</th>
            <th style={st.th}>Dressing / Treatment</th>
            <th style={{ ...st.th, width: 28 }}></th>
          </tr>
        </thead>
        <tbody>
          {wounds.map((w, i) => (
            <tr key={i}>
              <td style={{ ...st.td, textAlign: "center", fontWeight: 700, color: "#1d4ed8" }}>{i + 1}</td>
              <td style={st.td}><input value={w.site || ""} onChange={e => upd(i, "site", e.target.value)} style={st.inlineInput} /></td>
              <td style={st.td}><input value={w.size || ""} onChange={e => upd(i, "size", e.target.value)} style={st.inlineInput} placeholder="L×W×D" /></td>
              <td style={st.td}><select value={w.tissue || ""} onChange={e => upd(i, "tissue", e.target.value)} style={st.inlineSelect}><option value="">…</option>{["Granulating","Slough","Necrotic","Epithelialising","Mixed"].map(o => <option key={o}>{o}</option>)}</select></td>
              <td style={st.td}><select value={w.exudate || ""} onChange={e => upd(i, "exudate", e.target.value)} style={st.inlineSelect}><option value="">…</option>{["None","Minimal (serous)","Moderate","Heavy (purulent)"].map(o => <option key={o}>{o}</option>)}</select></td>
              <td style={st.td}><select value={w.odour || ""} onChange={e => upd(i, "odour", e.target.value)} style={st.inlineSelect}><option value="">…</option>{["None","Mild","Offensive"].map(o => <option key={o}>{o}</option>)}</select></td>
              <td style={st.td}><input value={w.periwound || ""} onChange={e => upd(i, "periwound", e.target.value)} style={st.inlineInput} /></td>
              <td style={st.td}><input value={w.dressing || ""} onChange={e => upd(i, "dressing", e.target.value)} style={st.inlineInput} /></td>
              <td style={st.td}>{wounds.length > 1 && <button onClick={() => set("wounds", wounds.filter((_, j) => j !== i))} style={st.rmBtn}>✕</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} style={{ ...st.addBtn, marginTop: 6 }}>+ Add Row</button>
    </div>
  );
}
function SCIBowelBladder({ v, set }) {
  const rows = v.sci_chart || [{ bladder: "", time: "", volume: "", bowel: "", bristol: "", notes: "" },
                                { bladder: "", time: "", volume: "", bowel: "", bristol: "", notes: "" },
                                { bladder: "", time: "", volume: "", bowel: "", bristol: "", notes: "" }];
  const upd = (i, f, val) => { const n = [...rows]; n[i] = { ...n[i], [f]: val }; set("sci_chart", n); };
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontWeight: 700, fontSize: 12, color: "#1e40af", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 6 }}>SCI — Bowel & Bladder Chart</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ ...st.table, tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "18%" }} /><col style={{ width: "10%" }} /><col style={{ width: "12%" }} />
            <col style={{ width: "18%" }} /><col style={{ width: "12%" }} /><col />
          </colgroup>
          <thead>
            <tr>
              <th style={st.th}>Bladder management</th>
              <th style={st.th}>Time</th>
              <th style={st.th}>Volume (mL)</th>
              <th style={st.th}>Bowel management</th>
              <th style={st.th}>Bristol type</th>
              <th style={st.th}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={st.td}><input value={r.bladder || ""} onChange={e => upd(i, "bladder", e.target.value)} style={st.inlineInput} placeholder={i === 0 ? "e.g. IDC, ISC" : ""} /></td>
                <td style={st.td}><input type="time" value={r.time || ""} onChange={e => upd(i, "time", e.target.value)} style={st.inlineInput} /></td>
                <td style={st.td}><input value={r.volume || ""} onChange={e => upd(i, "volume", e.target.value)} style={st.inlineInput} placeholder="mL" /></td>
                <td style={st.td}><input value={r.bowel || ""} onChange={e => upd(i, "bowel", e.target.value)} style={st.inlineInput} placeholder={i === 0 ? "e.g. Suppository" : ""} /></td>
                <td style={st.td}><input value={r.bristol || ""} onChange={e => upd(i, "bristol", e.target.value)} style={st.inlineInput} placeholder="1–7" /></td>
                <td style={st.td}><input value={r.notes || ""} onChange={e => upd(i, "notes", e.target.value)} style={st.inlineInput} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => set("sci_chart", [...rows, { bladder: "", time: "", volume: "", bowel: "", bristol: "", notes: "" }])} style={{ ...st.addBtn, marginTop: 6 }}>+ Row</button>
    </div>
  );
}
function TherapySessions({ v, set }) {
  const sessions = v.therapy_sessions || [{}];
  const upd = (i, f, val) => { const n = [...sessions]; n[i] = { ...n[i], [f]: val }; set("therapy_sessions", n); };
  return (
    <DynBlock items={sessions} name="therapy_sessions" set={set} addLabel="+ Add Therapy Session">
      {(sess, i) => (<>
        <div style={st.g3}>
          <F label="Discipline"><select value={sess.discipline || ""} onChange={e => upd(i, "discipline", e.target.value)} style={st.select}><option value="">—</option>{["Physiotherapy","Occupational Therapy","Speech & Language Therapy","Dietetics","Psychology","Social Work","Other"].map(o => <option key={o}>{o}</option>)}</select></F>
          <F label="Time"><input type="time" value={sess.time || ""} onChange={e => upd(i, "time", e.target.value)} style={st.input} /></F>
          <F label="Duration (min)"><input type="number" value={sess.duration || ""} onChange={e => upd(i, "duration", e.target.value)} style={st.input} /></F>
        </div>
        <F label="Session Notes"><textarea rows={2} value={sess.notes || ""} onChange={e => upd(i, "notes", e.target.value)} style={st.textarea} /></F>
        <F label="Therapist Co-signature"><input value={sess.cosign || ""} onChange={e => upd(i, "cosign", e.target.value)} style={st.input} /></F>
      </>)}
    </DynBlock>
  );
}
function RehabGoals({ v, set }) {
  const goals = v.rehab_goals || [{}];
  const upd = (i, f, val) => { const n = [...goals]; n[i] = { ...n[i], [f]: val }; set("rehab_goals", n); };
  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <table style={st.table}>
          <thead><tr><th style={st.th}>Goal</th><th style={st.th}>Target Date</th><th style={st.th}>Status</th><th style={st.th}>Nurse / Therapist</th><th style={st.th}></th></tr></thead>
          <tbody>{goals.map((g, i) => (
            <tr key={i}>
              <td style={st.td}><input value={g.description || ""} onChange={e => upd(i, "description", e.target.value)} style={{ ...st.input, margin: 0 }} /></td>
              <td style={st.td}><input type="date" value={g.target_date || ""} onChange={e => upd(i, "target_date", e.target.value)} style={{ ...st.input, margin: 0 }} /></td>
              <td style={st.td}><select value={g.status || ""} onChange={e => upd(i, "status", e.target.value)} style={{ ...st.select, margin: 0 }}><option value="">—</option>{["On track","Achieved","Not met","Modified"].map(o => <option key={o}>{o}</option>)}</select></td>
              <td style={st.td}><input value={g.nurse_therapist || ""} onChange={e => upd(i, "nurse_therapist", e.target.value)} style={{ ...st.input, margin: 0 }} /></td>
              <td style={st.td}>{goals.length > 1 && <button onClick={() => set("rehab_goals", goals.filter((_, j) => j !== i))} style={st.rmBtn}>✕</button>}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <button onClick={() => set("rehab_goals", [...goals, {}])} style={st.addBtn}>+ Add Goal</button>
    </div>
  );
}
export default function ShiftAssessment({ patient, onSubmit, onBack }) {
  const [v, setV] = useState({});
  const [exp, setExp] = useState({});
  const storageKey = patient ? `shift_assessment_draft_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setV(JSON.parse(saved).values || {});
  }, [storageKey]);

  // inject thumb styles once
  useEffect(() => {
    const id = "nrs-thumb-style";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      input[type=range].nrs-slider { -webkit-appearance: none; appearance: none; outline: none; }
      input[type=range].nrs-slider::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#1d4ed8; border:3px solid #fff; box-shadow:0 1px 6px rgba(0,0,0,0.3); cursor:pointer; margin-top:-5px; }
      input[type=range].nrs-slider::-moz-range-thumb { width:18px; height:18px; border-radius:50%; background:#1d4ed8; border:3px solid #fff; box-shadow:0 1px 6px rgba(0,0,0,0.3); cursor:pointer; border:none; }
      input[type=range].nrs-slider::-webkit-slider-runnable-track { height:8px; border-radius:999px; background:transparent; }
      input[type=range].nrs-slider::-moz-range-track { height:8px; border-radius:999px; background:transparent; }
    `;
    document.head.appendChild(s);
  }, []);

  const set = (name, value) => {
    setV(prev => {
      const next = { ...prev, [name]: value };
      if (name.startsWith("braden_") && name !== "braden_total" && name !== "braden_risk") {
        const t = ["braden_sensory","braden_moisture","braden_activity","braden_mobility","braden_nutrition","braden_friction"].reduce((a, k) => a + Number(next[k] || 0), 0);
        next.braden_total = t;
        next.braden_risk = t <= 9 ? "Very High" : t <= 12 ? "High" : t <= 14 ? "Moderate" : t <= 18 ? "Mild" : "Low";
      }
      return next;
    });
  };

  const tog = id => setExp(p => ({ ...p, [id]: !p[id] }));
  const allIds = ["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","s11","s12","s13","s14","s15"];
  const openCount = allIds.filter(id => exp[id]).length;
  const saveDraft = () => { if (storageKey) { localStorage.setItem(storageKey, JSON.stringify({ values: v, updatedAt: new Date() })); alert("Draft saved"); } };

  // ── Alert triggers (per HTML spec) ──
  const alerts = [];
  const bpSys = v.bp ? parseInt(v.bp.split("/")[0]) : null;
  if (bpSys && (bpSys > 160 || bpSys < 90)) alerts.push("Systolic BP >160 or <90 mmHg");
  if (v.hr && (v.hr > 100 || v.hr < 50)) alerts.push("HR >100 or <50 bpm");
  if (v.spo2 && v.spo2 < 94) alerts.push("SpO2 <94%");
  if (v.temp && (v.temp > 38 || v.temp < 36)) alerts.push("Temp >38°C or <36°C");
  if ((v.pain_at_rest ?? 0) >= 7) alerts.push("Pain NRS ≥7");
  if (v.neuro_deterioration === "Yes — escalated") alerts.push("Neuro deterioration noted");
  if (v.urine_output !== "" && v.urine_output !== undefined && parseFloat(v.urine_output) < 0.5) alerts.push("Urine output <0.5 mL/kg/hr");
  if (v.morse_total >= 45) alerts.push("Morse Fall Score ≥45");
  if ((v.skin_condition || []).includes("Erythema") || (v.pressure_injury_prevention || []).length > 0) {
    if (v.new_pressure_injury === "Yes") alerts.push("New pressure injury identified");
  }
  if (v.incident_type && (v.incident_type || []).length > 0) alerts.push("Incident occurred this shift");

  return (
    <div style={st.wrap}>

      {/* ── Header ── */}
      <div style={st.header}>
        <div>
          <div style={st.headerTitle}>Rehabilitation Unit — Nursing Shift Assessment</div>
          <div style={st.headerSub}>Clinical Documentation · Version 2.0 · Multidisciplinary Integrated</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={onBack} style={st.btnSec}>← Back</button>
          <button onClick={saveDraft} style={st.btnSec}>Save Draft</button>
          <button onClick={() => { onSubmit?.(v); alert("Submitted"); }} style={st.btnPrimary}>Submit Assessment</button>
        </div>
      </div>

      {/* ── Shift selector ── */}
      <div style={st.shiftBar}>
        <span style={st.shiftLabel}>Shift</span>
        {["Morning","Evening","Night"].map(sh => (
          <button key={sh} onClick={() => set("shift_time", sh)}
            style={{ ...st.shiftBtn, ...(v.shift_time === sh ? st.shiftBtnOn : {}) }}>{sh}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={st.progressPill}>{openCount}/{allIds.length} sections open</div>
          <div style={st.progressTrack}><div style={{ ...st.progressFill, width: `${Math.round((openCount / allIds.length) * 100)}%` }} /></div>
          <span style={{ fontSize: 12, color: "#6b7280" }}>{Math.round((openCount / allIds.length) * 100)}%</span>
        </div>
      </div>

      {/* ── Alerts ── */}
      {alerts.length > 0 && (
        <div style={st.alertBox}>
          <span style={st.alertIcon}>⚠</span>
          <div>
            <div style={st.alertTitle}>Automated Alert Triggers — Nurse action required</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", marginTop: 4 }}>
              {alerts.map((a, i) => <span key={i} style={st.alertChip}>{a}</span>)}
            </div>
          </div>
        </div>
      )}

      {/* ── Expand / Collapse ── */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <button onClick={() => setExp(Object.fromEntries(allIds.map(k => [k, true])))} style={st.btnGhost}>Expand All</button>
        <button onClick={() => setExp({})} style={st.btnGhost}>Collapse All</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>

        {/* ── Patient Identification (always open) ── */}
        <SecStatic title="Patient Identification & Shift Details">
          <div style={st.g2}>
            <F label="Patient Full Name"><Inp name="patient_name" v={v} set={set} /></F>
            <F label="MRN / Patient ID"><Inp name="mrn" v={v} set={set} /></F>
            <F label="Ward / Bed"><Inp name="ward_bed" v={v} set={set} /></F>
            <F label="Date"><Inp name="assessment_date" type="date" v={v} set={set} /></F>
            <F label="Primary Diagnosis"><Inp name="primary_diagnosis" v={v} set={set} /></F>
            <F label="Attending Doctor"><Inp name="attending_doctor" v={v} set={set} /></F>
            <F label="Admission Date"><Inp name="admission_date" type="date" v={v} set={set} /></F>
            <F label="Day of Admission"><Inp name="day_of_admission" v={v} set={set} /></F>
            <F label="Current Rehab Goal"><Inp name="current_rehab_goal" v={v} set={set} /></F>
            <F label="Expected Discharge Date"><Inp name="expected_discharge_date" type="date" v={v} set={set} /></F>
            <F label="Assessing Nurse"><Inp name="assessing_nurse" v={v} set={set} /></F>
            <F label="Handover Received From"><Inp name="handover_from" v={v} set={set} /></F>
            <F label="Co-signature (if required)"><Inp name="co_signature" v={v} set={set} /></F>
            <F label="Shift Time"><Inp name="shift_time_detail" v={v} set={set} /></F>
          </div>
        </SecStatic>

        {/* ── Vital Signs ── */}
        <Sec title="Vital Signs" expanded={exp.s1} onToggle={() => tog("s1")}>
          <div style={st.g4}>
            <F label="BP (mmHg)"><Inp name="bp" v={v} set={set} /></F>
            <F label="HR (bpm)"><Inp name="hr" type="number" v={v} set={set} /></F>
            <F label="RR (/min)"><Inp name="rr" type="number" v={v} set={set} /></F>
            <F label="Temp (°C)"><Inp name="temp" type="number" step="0.1" v={v} set={set} /></F>
            <F label="SpO2 (%)"><Inp name="spo2" type="number" v={v} set={set} /></F>
            <F label="Blood Glucose (mmol/L)"><Inp name="blood_glucose" type="number" step="0.1" v={v} set={set} /></F>
          </div>
          <div style={st.g2}>
            <F label="O2 Support"><Radios name="o2_support" opts={["Room air","Nasal cannula","Face mask","HFNC","Ventilator"]} v={v} set={set} /></F>
            <F label="Posture During Observations"><Radios name="posture_during_obs" opts={["Lying","Sitting","Standing"]} v={v} set={set} /></F>
          </div>
          <F label="Vital Sign Concerns">
            <Radios name="vital_sign_concerns" opts={["All within normal limits","Abnormal — detail below"]} v={v} set={set} />
          </F>
          <F label="Vital Signs Notes"><Txt name="vital_signs_notes" rows={3} v={v} set={set} /></F>
        </Sec>

        {/* ── Pain Assessment ── */}
        <Sec title="Pain Assessment (NRS)" expanded={exp.s2} onToggle={() => tog("s2")}>
          <F label={`Pain at Rest — NRS 0–10 (${v.pain_at_rest ?? 0})`}><NRS name="pain_at_rest" v={v} set={set} /></F>
          <F label={`Pain on Movement — NRS 0–10 (${v.pain_on_movement ?? 0})`}><NRS name="pain_on_movement" v={v} set={set} /></F>
          <div style={st.g2}>
            <F label="Pain Location"><Inp name="pain_location" v={v} set={set} /></F>
            <F label="Pain Character"><Sel name="pain_character" opts={["Aching","Burning","Sharp","Throbbing","Radiating","Cramping","Pressure"]} v={v} set={set} /></F>
            <F label="Aggravating Factors"><Inp name="aggravating_factors" v={v} set={set} /></F>
            <F label="Relieving Factors"><Inp name="relieving_factors" v={v} set={set} /></F>
          </div>
          <F label="Intervention Given">
            <Checks name="pain_intervention" opts={["Analgesic administered (per MAR)","Non-pharmacological measure","Repositioning / elevation","Ice / heat therapy","Referral to doctor / pain team","Patient declined","None required"]} v={v} set={set} />
          </F>
          <F label={`Pain Reassessment post-intervention — NRS 0–10 (${v.pain_reassessment ?? 0})`}><NRS name="pain_reassessment" v={v} set={set} /></F>
          <F label="Time of Reassessment"><Inp name="pain_reassessment_time" type="time" v={v} set={set} /></F>
        </Sec>

        {/* ── Neurological ── */}
        <Sec title="Neurological & Cognitive Status" expanded={exp.s3} onToggle={() => tog("s3")}>
          <div style={st.g2}>
            <F label="Level of Consciousness">
              <Sel name="level_of_consciousness" opts={["Alert & orientated ×3","Alert, confused","Drowsy — responsive to voice","Responsive to pain only","Unresponsive"]} v={v} set={set} />
            </F>
            <div>
              <div style={st.label}>GCS Score (E / V / M)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                <Sel name="gcs_eyes"   opts={["1","2","3","4"]}       v={v} set={set} />
                <Sel name="gcs_verbal" opts={["1","2","3","4","5"]}   v={v} set={set} />
                <Sel name="gcs_motor"  opts={["1","2","3","4","5","6"]} v={v} set={set} />
              </div>
            </div>
          </div>
          <div style={st.g2}>
            <F label="Orientation"><Checks name="orientation" opts={["Person","Place","Time","Situation","Disoriented"]} v={v} set={set} /></F>
            <F label="Behaviour / Mood"><Checks name="behaviour_mood" opts={["Cooperative","Anxious","Agitated","Depressed","Withdrawn","Disinhibited"]} v={v} set={set} /></F>
            <F label="Motor Function (affected side)"><Sel name="motor_function" opts={["Full strength bilaterally","Mild weakness (4/5)","Moderate weakness (3/5)","Severe weakness (≤2/5)","Plegia","N/A"]} v={v} set={set} /></F>
            <F label="Sensory Status"><Sel name="sensory_status" opts={["Intact","Reduced light touch","Absent sensation","Hyperaesthesia","N/A"]} v={v} set={set} /></F>
            <F label="Pupils"><Checks name="pupils" opts={["Equal & reactive","Unequal","Sluggish","Fixed — escalate"]} v={v} set={set} /></F>
            <F label="Headache / Nausea / Vomiting"><Checks name="headache_nausea" opts={["None","Headache","Nausea","Vomiting"]} v={v} set={set} /></F>
          </div>
          <F label="Neuro Nursing Notes"><Txt name="neuro_notes" v={v} set={set} /></F>

          {/* 3A — TBI / Stroke */}
          <div style={st.condModule}>
            <div style={st.condModuleTitle}>3A — TBI / Stroke Neuro Checks <span style={st.condModuleBadge}>TBI / Stroke patients only</span></div>
            <F label={`Agitated Behaviour Scale (ABS) — Score: ${v.abs_score ?? 14}`}>
              <input type="range" min={14} max={70} value={v.abs_score ?? 14} style={{ width: "100%", accentColor: "#1d4ed8", marginBottom: 4 }} onChange={e => set("abs_score", Number(e.target.value))} />
              <div style={st.scaleHint}>≤21 none · 22–28 mild · 29–35 moderate · &gt;35 severe</div>
            </F>
            <div style={st.g2}>
              <F label="Neuro Obs Frequency"><Radios name="neuro_obs_frequency" opts={["Hourly","2-hourly","4-hourly","Per doctor's order"]} v={v} set={set} /></F>
              <F label="Dysphagia Risk"><Radios name="dysphagia_risk" opts={["No concern","Suspected — SLT referral made","Modified diet / fluids in place"]} v={v} set={set} /></F>
              <F label="IDDSI Level (if modified diet)"><Sel name="iddsi_level" opts={["N/A","0 — Thin","1 — Slightly thick","2 — Mildly thick","3 — Liquidised","4 — Pureed","5 — Minced & moist","6 — Soft & bite-sized","7 — Regular"]} v={v} set={set} /></F>
              <F label="Neuro Deterioration This Shift?"><Radios name="neuro_deterioration" opts={["No","Yes — escalated"]} v={v} set={set} /></F>
            </div>
            <div style={st.g3}>
              <F label="Aphasia"><Sel name="aphasia" opts={["None","Expressive","Receptive","Global"]} v={v} set={set} /></F>
              <F label="Spasticity"><Sel name="spasticity" opts={["None","Upper limb","Lower limb","Bilateral"]} v={v} set={set} /></F>
              <F label="Shoulder Subluxation"><Sel name="shoulder_subluxation" opts={["None","Present — sling in use","Refer PT"]} v={v} set={set} /></F>
            </div>
          </div>

          {/* 3B — SCI */}
          <div style={st.condModule}>
            <div style={st.condModuleTitle}>3B — Spinal Cord Injury Checks <span style={st.condModuleBadge}>SCI patients only</span></div>
            <div style={st.g2}>
              <F label="Level of Injury"><Inp name="sci_level_of_injury" v={v} set={set} /></F>
              <F label="ASIA Grade"><Sel name="asia_grade" opts={["A — Complete","B — Sensory incomplete","C — Motor incomplete","D — Motor incomplete","E — Normal"]} v={v} set={set} /></F>
              <F label="Spinal Precautions"><Sel name="spinal_precautions" opts={["N/A","Log roll required","Hard collar in situ","TLSO brace worn","Halo traction"]} v={v} set={set} /></F>
              <F label="Positioning"><Radios name="sci_positioning" opts={["Supine","Left lateral","Right lateral","Semi-Fowler","Prone"]} v={v} set={set} /></F>
            </div>
            <F label="Autonomic Dysreflexia Signs">
              <Checks name="autonomic_dysreflexia" opts={["None","Sudden BP rise","Bradycardia","Severe headache","Sweating above injury","Protocol initiated"]} v={v} set={set} />
            </F>
            <SCIBowelBladder v={v} set={set} />
          </div>
        </Sec>

        {/* ── Respiratory ── */}
        <Sec title="Respiratory Assessment" expanded={exp.s4} onToggle={() => tog("s4")}>
          <div style={st.g2}>
            <F label="Respiratory Effort"><Checks name="respiratory_effort" opts={["Effortless","Mild effort","Laboured","Accessory muscles","Paradoxical"]} v={v} set={set} /></F>
            <F label="Breath Sounds"><Checks name="breath_sounds" opts={["Clear bilaterally","Crackles (R)","Crackles (L)","Wheeze","Reduced air entry","Absent"]} v={v} set={set} /></F>
            <F label="Cough"><Checks name="cough" opts={["None","Dry","Productive (clear)","Productive (coloured)"]} v={v} set={set} /></F>
            <F label="Airway Management"><Checks name="airway_management" opts={["N/A","Suction (oropharyngeal)","Suction (tracheostomy)","Nebuliser","Chest physiotherapy"]} v={v} set={set} /></F>
          </div>
        </Sec>

        {/* ── Mobility & ADL ── */}
        <Sec title="Mobility & Activities of Daily Living (ADL)" expanded={exp.s5} onToggle={() => tog("s5")}>
          <div style={st.g2}>
            <F label="Bed Mobility"><Sel name="bed_mobility" opts={["Independent","Supervision only","Minimal assist (25%)","Moderate assist (50%)","Maximal assist (75%)","Total dependence"]} v={v} set={set} /></F>
            <F label="Transfers (Bed ↔ Chair)"><Sel name="transfers" opts={["Independent","Supervision","1-person assist","2-person assist","Hoist required","Contraindicated"]} v={v} set={set} /></F>
            <F label="Ambulation Level"><Sel name="ambulation_level" opts={["Walks independently","Aid — unsupervised","Aid + supervision","Aid + 1-person assist","Sitting balance only","Bedbound"]} v={v} set={set} /></F>
            <F label="Assistive Device"><Checks name="assistive_device" opts={["None","Walking frame","Quad cane","Standard cane","Crutches","Wheelchair","Hoist / sling","Air vest"]} v={v} set={set} /></F>
          </div>
          <div style={st.tableLabel}>ADL Assessment</div>
          <ADLTable v={v} set={set} />
          <F label="ADL Nursing Notes"><Txt name="adl_nursing_notes" v={v} set={set} /></F>
        </Sec>

        {/* ── Fluid I/O ── */}
        <Sec title="Fluid Intake & Output" expanded={exp.s6} onToggle={() => tog("s6")}>
          <div style={st.fluidGrid}>
            {[["Oral Intake (mL)","oral_intake"],["IV Intake (mL)","iv_intake"],["NGT/PEG Intake (mL)","ngt_peg_intake"],["Total Intake (mL)","total_intake"],
              ["Urine Output (mL)","urine_output"],["Other Output (mL)","other_output"],["Total Output (mL)","total_output"],["Fluid Balance (mL)","fluid_balance"]].map(([lbl, name]) => (
              <div key={name} style={st.fluidCell}>
                <div style={st.fluidCellLabel}>{lbl}</div>
                <input type="number" value={v[name] ?? ""} style={st.fluidInput} onChange={e => set(name, e.target.value === "" ? "" : Number(e.target.value))} />
              </div>
            ))}
          </div>
          <div style={st.g2}>
            <F label="Diet / Appetite"><Checks name="diet_appetite" opts={["Full meal taken","Half meal","Poor intake (<25%)","Nil by mouth","NGT fed","PEG fed"]} v={v} set={set} /></F>
            <F label="Bladder Management"><Checks name="bladder_management" opts={["Continent","IDC in-situ","Incontinence pad","Intermittent catheterisation"]} v={v} set={set} /></F>
            <F label="Stool / Bowel"><Checks name="stool_bowel" opts={["None","Formed (normal)","Loose","Liquid / diarrhoea","Constipated","Pad soiled"]} v={v} set={set} /></F>
            <F label="Swallowing Concern"><Checks name="swallowing_concern" opts={["No concern","Coughing on fluids","Coughing on solids","SLT referral made"]} v={v} set={set} /></F>
          </div>
          <div style={st.condModule}>
            <div style={st.condModuleTitle}>6A — Nutrition Assessment</div>
            <div style={st.g2}>
              <F label="Nutritional Risk Screen"><Sel name="nutritional_risk" opts={["Low risk","Moderate — dietitian referral","High — urgent dietitian review"]} v={v} set={set} /></F>
              <F label="BMI (if known)"><Inp name="bmi" type="number" step="0.1" v={v} set={set} /></F>
              <F label="Enteral / Parenteral Nutrition"><Sel name="enteral_parenteral" opts={["None","NGT enteral","PEG enteral","TPN","Supplementary oral feeds"]} v={v} set={set} /></F>
              <F label="Last Dietitian Review"><Inp name="last_dietitian_review" type="date" v={v} set={set} /></F>
            </div>
            <F label="Nutrition Concerns This Shift">
              <Checks name="nutrition_concerns" opts={["None","Weight loss noted","Refusal to eat","Aspiration risk","Tube feed intolerance"]} v={v} set={set} />
            </F>
          </div>
        </Sec>

        {/* ── Skin & Wound ── */}
        <Sec title="Skin Integrity & Wound Assessment" expanded={exp.s7} onToggle={() => tog("s7")}>
          <F label="General Skin Condition">
            <Checks name="skin_condition" opts={["Intact","Dry / scaly","Oedematous","Mottled","Erythema","Bruising","Rash"]} v={v} set={set} />
          </F>
          <F label="New Pressure Injury Identified This Shift?">
            <Radios name="new_pressure_injury" opts={["No","Yes"]} v={v} set={set} />
          </F>
          <div style={st.condModule}>
            <div style={st.condModuleTitle}>Braden Scale Score (Pressure Injury Risk)</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              {[["Very High (≤9)", "#ef4444"], ["High (10–12)", "#f97316"], ["Moderate (13–14)", "#f59e0b"], ["Mild (15–18)", "#3b82f6"], ["Low (≥19)", "#6366f1"]].map(([lbl, c]) => (
                <span key={lbl} style={{ fontSize: 11, fontWeight: 600, color: "#fff", background: c, borderRadius: 20, padding: "2px 10px" }}>{lbl}</span>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2, padding: "0 1px" }}>
              {[0,2,4,6,8,10,12,14,16,18,20,23].map(n => (
                <span key={n} style={{ fontSize: 10, color: "#9ca3af", textAlign: "center" }}>{n}</span>
              ))}
            </div>
            <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
              <div style={{ position: "absolute", left: 0, right: 0, height: 8, borderRadius: 999, pointerEvents: "none",
                background: "linear-gradient(to right,#ef4444 0%,#ef4444 39%,#f97316 39%,#f97316 52%,#f59e0b 52%,#f59e0b 61%,#3b82f6 61%,#3b82f6 78%,#6366f1 78%,#6366f1 100%)" }} />
              <input type="range" min={0} max={23} value={v.braden_total ?? 0}
                className="nrs-slider"
                onChange={e => {
                  const t = Number(e.target.value);
                  set("braden_total", t);
                  set("braden_risk", t <= 9 ? "Very High" : t <= 12 ? "High" : t <= 14 ? "Moderate" : t <= 18 ? "Mild" : "Low");
                }}
                style={{ position: "relative", zIndex: 1, width: "100%", margin: 0,
                  appearance: "none", WebkitAppearance: "none", background: "transparent", cursor: "pointer", height: 20 }} />
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", borderRadius: 6, padding: "3px 12px",
                background: !v.braden_risk || v.braden_risk === "Very High" ? "#ef4444" : v.braden_risk === "High" ? "#f97316" : v.braden_risk === "Moderate" ? "#f59e0b" : v.braden_risk === "Mild" ? "#3b82f6" : "#6366f1" }}>
                Score: {v.braden_total ?? 0} — {v.braden_risk ?? "Very High"} Risk
              </span>
            </div>
            <div style={st.scaleHint}>≤9 very high · 10–12 high · 13–14 moderate · 15–18 mild · ≥19 low</div>
          </div>
          <div style={st.tableLabel}>Wound Documentation</div>
          <WoundTable v={v} set={set} />
          <div style={st.infoNote}>Attach wound photograph labelled with date, time, and nurse ID. Log in photographic record.</div>
          <F label="Pressure Injury Prevention Measures">
            <Checks name="pressure_injury_prevention" opts={["2-hourly repositioning chart active","Pressure-relieving mattress in use","Heel protectors applied","Moisture barrier cream","Air vest in use (log updated)","Repositioning chart updated","Patient / family education done","Dietitian referral for nutrition"]} v={v} set={set} />
          </F>
        </Sec>

        {/* ── Fall Risk ── */}
        <Sec title="Safety & Fall Risk Assessment" expanded={exp.s8} onToggle={() => tog("s8")}>
          <div style={st.condModule}>
            <div style={st.condModuleTitle}>Morse Fall Scale Score</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              {[["Low (0–24)", "#3b82f6"], ["Moderate (25–44)", "#f59e0b"], ["High (≥45)", "#ef4444"]].map(([lbl, c]) => (
                <span key={lbl} style={{ fontSize: 12, fontWeight: 600, color: "#fff", background: c, borderRadius: 20, padding: "3px 12px" }}>{lbl}</span>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2, padding: "0 1px" }}>
              {[0,10,20,30,40,50,60,70,80,90,100,110,125].map(n => (
                <span key={n} style={{ fontSize: 10, color: "#9ca3af", textAlign: "center" }}>{n}</span>
              ))}
            </div>
            <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
              <div style={{ position: "absolute", left: 0, right: 0, height: 8, borderRadius: 999, pointerEvents: "none",
                background: "linear-gradient(to right,#3b82f6 0%,#3b82f6 19%,#f59e0b 19%,#f59e0b 36%,#ef4444 36%,#ef4444 100%)" }} />
              <input type="range" min={0} max={125} value={v.morse_total ?? 0}
                className="nrs-slider"
                onChange={e => {
                  const t = Number(e.target.value);
                  set("morse_total", t);
                  set("morse_risk", t < 25 ? "Low" : t < 45 ? "Moderate" : "High");
                }}
                style={{ position: "relative", zIndex: 1, width: "100%", margin: 0,
                  appearance: "none", WebkitAppearance: "none", background: "transparent", cursor: "pointer", height: 20 }} />
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", borderRadius: 6, padding: "3px 12px",
                background: !v.morse_risk || v.morse_risk === "Low" ? "#3b82f6" : v.morse_risk === "Moderate" ? "#f59e0b" : "#ef4444" }}>
                Score: {v.morse_total ?? 0} — {v.morse_risk ?? "Low"}
              </span>
            </div>
            <div style={st.scaleHint}>0–24 low · 25–44 moderate · ≥45 high — initiate high-risk falls protocol</div>
          </div>
          <F label="Fall This Shift?"><Radios name="fall_this_shift" opts={["No fall","Near miss","Fall occurred — incident report filed"]} v={v} set={set} /></F>
          {v.fall_this_shift === "Fall occurred — incident report filed" && <F label="Incident Report No."><Inp name="incident_report_no" v={v} set={set} /></F>}
          <F label="Fall Prevention Measures Active This Shift">
            <Checks name="fall_prevention_measures" opts={["Bed in lowest position","Bed rails raised (×2)","Call bell within reach","Non-slip footwear","Supervised ambulation only","Hip protector worn","Environment cleared","Fall alert wristband in place","Patient / family educated"]} v={v} set={set} />
          </F>
          <div style={st.g2}>
            <F label="Restraint Use"><Sel name="restraint_use" opts={["None","Mitts (bilateral)","Wrist restraint","Soft vest","Bed rails as restraint"]} v={v} set={set} /></F>
            <F label="Restraint Consent & Review"><Checks name="restraint_consent" opts={["N/A","Consent obtained","Reviewed this shift","Pending"]} v={v} set={set} /></F>
          </div>
        </Sec>

        {/* ── Incident ── */}
        <Sec title="Incident Documentation" expanded={exp.s9} onToggle={() => tog("s9")}>
          <div style={st.infoNote}>Complete if any incident occurred this shift. All incidents require a separate Incident Report Form to be filed.</div>
          <F label="Incident Type"><Checks name="incident_type" opts={["Fall","Near-miss fall","Syncope / collapse","Acute clinical deterioration","Medication error","Skin tear / injury","Other"]} v={v} set={set} /></F>
          <div style={st.g2}>
            <F label="Time of Incident"><Inp name="incident_time" type="time" v={v} set={set} /></F>
            <F label="Location"><Inp name="incident_location" v={v} set={set} /></F>
            <F label="Witnesses"><Inp name="incident_witnesses" v={v} set={set} /></F>
            <F label="Doctor Notified"><Radios name="doctor_notified" opts={["Yes","No"]} v={v} set={set} /></F>
            <F label="Patient Status Pre-Incident"><Checks name="patient_status_pre_incident" opts={["Ambulatory","In bed","In chair","Transferring","In bathroom"]} v={v} set={set} /></F>
            <F label="Supervision at Time of Incident"><Radios name="supervision_at_incident" opts={["Unsupervised","Supervised","1:1 care"]} v={v} set={set} /></F>
          </div>
          <F label="Injuries Sustained"><Checks name="injuries_sustained" opts={["No injury","Minor skin tear","Haematoma","Laceration","Suspected fracture — escalate","Head injury — CT ordered"]} v={v} set={set} /></F>
          <F label="Post-Incident Monitoring Initiated"><Checks name="post_incident_monitoring" opts={["Neuro obs initiated","Vital signs monitored","Pain assessed","X-ray ordered","CT ordered","Family notified","Incident report filed"]} v={v} set={set} /></F>
          <F label="Incident Narrative"><Txt name="incident_narrative" rows={4} v={v} set={set} /></F>
        </Sec>

        {/* ── Therapy ── */}
        <Sec title="Therapy Session Record" expanded={exp.s10} onToggle={() => tog("s10")}>
          <div style={st.infoNote}>Allied health disciplines must co-sign their respective entries in the document.</div>
          <TherapySessions v={v} set={set} />
        </Sec>

        {/* ── Nursing Care ── */}
        <Sec title="Nursing Care & Interventions" expanded={exp.s11} onToggle={() => tog("s11")}>
          <div style={st.g2}>
            <F label="Personal Care Completed"><Checks name="personal_care" opts={["Bed bath","Shower (assisted)","Oral hygiene","Hair care","Shaving","Nail care"]} v={v} set={set} /></F>
            <F label="Medications & IV Management"><Checks name="medications_iv" opts={["All regular meds given","PRN administered (per MAR)","Medication withheld — reason documented","IV infusion maintained","PIV patent — site reviewed","PICC flushed — dressing intact","Central line bundle care done","IV site changed this shift"]} v={v} set={set} /></F>
          </div>
          <F label="Additional Nursing Interventions"><Txt name="additional_interventions" v={v} set={set} /></F>
        </Sec>

        {/* ── Carer & Family ── */}
        <Sec title="Carer & Family Involvement Log" expanded={exp.s12} onToggle={() => tog("s12")}>
          <div style={st.g2}>
            <F label="Primary Carer Name"><Inp name="carer_name" v={v} set={set} /></F>
            <F label="Relationship to Patient"><Inp name="carer_relationship" v={v} set={set} /></F>
            <F label="Carer Present This Shift"><Radios name="carer_present" opts={["Yes","No","Phone contact made"]} v={v} set={set} /></F>
            <F label="Visit / Contact Time"><Inp name="carer_visit_time" type="time" v={v} set={set} /></F>
          </div>
          <F label="Carer Training / Education Provided This Shift">
            <Checks name="carer_training" opts={["N/A","Transfer technique","Skin / wound care","Medication management","Pressure injury prevention","Falls prevention","Home exercise programme","Discharge instructions reviewed"]} v={v} set={set} />
          </F>
          <div style={st.g2}>
            <F label="Carer Comprehension Level"><Radios name="carer_comprehension" opts={["Understood well","Partial understanding","Needs follow-up","Interpreter required"]} v={v} set={set} /></F>
            <F label="Carer Concerns Raised"><Txt name="carer_concerns" v={v} set={set} /></F>
          </div>
        </Sec>

        {/* ── ISBAR ── */}
        <Sec title="Clinical Assessment & ISBAR Handover" expanded={exp.s13} onToggle={() => tog("s13")}>
          <div style={st.g2}>
            <F label="Overall Clinical Status This Shift"><Radios name="overall_clinical_status" opts={["Improving","Stable","No change","Deteriorating","Medical review requested"]} v={v} set={set} /></F>
            <F label="Rehab Goal Progress"><Radios name="rehab_goal_progress" opts={["Goal achieved","Progressing","No progress","Regression noted","Not yet addressed"]} v={v} set={set} /></F>
            <F label="Pending Investigations / Reviews"><Inp name="pending_investigations" v={v} set={set} /></F>
            <F label="Escalation Made To"><Inp name="escalation_made_to" v={v} set={set} /></F>
          </div>
          <div style={st.isbarGrid}>
            {[
              { name: "isbar_identification", code: "I", label: "Identification", hint: "Patient name, MRN, diagnosis, ward/bed, attending doctor" },
              { name: "isbar_situation",      code: "S", label: "Situation",      hint: "Key clinical issue or reason for this handover entry" },
              { name: "isbar_background",     code: "B", label: "Background",     hint: "Relevant medical and functional history informing current status" },
              { name: "isbar_assessment",     code: "A", label: "Assessment",     hint: "Nurse's clinical interpretation of patient condition this shift" },
              { name: "isbar_recommendation", code: "R", label: "Recommendation", hint: "Actions required, monitoring instructions, goals for next shift" },
            ].map(({ name, code, label, hint }) => (
              <div key={name} style={st.isbarRow}>
                <div style={st.isbarCode}>{code}</div>
                <div style={{ flex: 1 }}>
                  <div style={st.isbarLabel}>{label}</div>
                  <div style={st.isbarHint}>{hint}</div>
                  <Txt name={name} rows={3} v={v} set={set} />
                </div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ── Discharge Planning ── */}
        <Sec title="Discharge Planning & Goal Tracking" expanded={exp.s14} onToggle={() => tog("s14")}>
          <div style={st.infoNote}>Update at each shift. Coordinate with multidisciplinary team. Discharge plan to be initiated at admission.</div>
          <div style={st.g2}>
            <F label="Planned Discharge Date"><Inp name="planned_discharge_date" type="date" v={v} set={set} /></F>
            <F label="Discharge Destination"><Sel name="discharge_destination" opts={["Home","Home + community support","Hostel / supported living","Nursing home","Inpatient transfer"]} v={v} set={set} /></F>
            <F label="Hostel Availability"><Sel name="hostel_availability" opts={["N/A","Awaiting placement","Confirmed"]} v={v} set={set} /></F>
            <F label="Transport Arranged"><Radios name="transport_arranged" opts={["N/A","Pending","Confirmed"]} v={v} set={set} /></F>
            <F label="Home Environment Assessed"><Checks name="home_environment" opts={["N/A","OT home visit completed","Modifications identified","Modifications completed"]} v={v} set={set} /></F>
            <F label="Inter-Facility Transfer Request"><Radios name="inter_facility_transfer" opts={["N/A","Pending","Submitted — awaiting","Confirmed"]} v={v} set={set} /></F>
          </div>
          <div style={st.tableLabel}>Rehabilitation Goals Progress Tracking</div>
          <RehabGoals v={v} set={set} />
          <F label="Patient & Family Education Completed This Shift">
            <Checks name="patient_family_education" opts={["Diagnosis & rehab process explained","Medication purpose & side-effects","Falls prevention strategies","Pressure injury prevention","Home exercise programme issued","Assistive device use demonstrated","Community services / referrals","Discharge instructions reviewed"]} v={v} set={set} />
          </F>
          <F label="Discharge Planning Notes"><Txt name="discharge_planning_notes" v={v} set={set} /></F>
        </Sec>

        {/* ── Sign-off ── */}
        <Sec title="Sign-off & Authorisation" expanded={exp.s15} onToggle={() => tog("s15")}>
          <div style={st.g3}>
            <F label="Assessing Nurse (print)"><Inp name="signoff_nurse_name" v={v} set={set} /></F>
            <F label="Designation"><Inp name="signoff_designation" v={v} set={set} /></F>
            <F label="Nurse ID / Stamp"><Inp name="signoff_nurse_id" v={v} set={set} /></F>
            <F label="Signature"><Inp name="signoff_signature" v={v} set={set} /></F>
            <F label="Date"><Inp name="signoff_date" type="date" v={v} set={set} /></F>
            <F label="Time"><Inp name="signoff_time" type="time" v={v} set={set} /></F>
            <F label="Co-signature (if applicable)"><Inp name="cosign_name" v={v} set={set} /></F>
            <F label="Designation"><Inp name="cosign_designation" v={v} set={set} /></F>
            <F label="Date & Time"><Inp name="cosign_datetime" v={v} set={set} /></F>
          </div>
          <div style={st.legalNote}>
            This document is a legal health record. All entries must be legible, dated, timed, and signed. Corrections must be made by single strikethrough with initials and date — do not erase or use correction fluid. Incomplete assessments must be countersigned by the shift-in-charge nurse.
          </div>
        </Sec>

      </div>
    </div>
  );
}

const st = {
  wrap:            { fontFamily: "Inter,system-ui,sans-serif", background: "#f0f4f8", minHeight: "100vh", padding: 24 },
  header:          { display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(135deg,#1d4ed8 0%,#3b82f6 100%)", color: "#fff", padding: "18px 28px", borderRadius: 14, marginBottom: 14, boxShadow: "0 4px 20px rgba(29,78,216,0.25)" },
  headerTitle:     { fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.3px" },
  headerSub:       { fontSize: 12, color: "#bfdbfe", marginTop: 3 },
  shiftBar:        { background: "#fff", borderRadius: 10, padding: "12px 20px", marginBottom: 12, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", flexWrap: "wrap" },
  shiftLabel:      { fontWeight: 700, fontSize: 13, color: "#374151", marginRight: 4 },
  shiftBtn:        { padding: "6px 18px", borderRadius: 20, border: "1.5px solid #d1d5db", background: "#f9fafb", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#374151" },
  shiftBtnOn:      { background: "#1d4ed8", color: "#fff", border: "1.5px solid #1d4ed8" },
  progressPill:    { fontSize: 12, color: "#6b7280", whiteSpace: "nowrap" },
  progressTrack:   { width: 120, height: 6, background: "#e5e7eb", borderRadius: 999, overflow: "hidden" },
  progressFill:    { height: "100%", background: "#3b82f6", borderRadius: 999, transition: "width 0.3s" },
  alertBox:        { display: "flex", gap: 14, alignItems: "flex-start", background: "#fff5f5", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "14px 18px", marginBottom: 12 },
  alertIcon:       { fontSize: 22, lineHeight: 1, flexShrink: 0 },
  alertTitle:      { fontWeight: 700, color: "#dc2626", fontSize: 13, marginBottom: 2 },
  alertChip:       { fontSize: 12, color: "#b91c1c", background: "#fee2e2", borderRadius: 4, padding: "2px 8px" },
  btnGhost:        { background: "#fff", border: "1px solid #d1d5db", color: "#374151", padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12 },
  section:         { background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden", border: "1px solid #e2e8f0" },
  secHead:         { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 22px", cursor: "pointer", userSelect: "none", background: "#eff6ff", borderBottom: "1px solid #dbeafe" },
  secTitle:        { fontWeight: 700, fontSize: 14, color: "#1e40af", letterSpacing: "-0.2px" },
  secBody:         { padding: "20px 22px" },
  field:           { marginBottom: 14 },
  label:           { display: "block", fontSize: 12, fontWeight: 600, color: "#4b5563", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.4px" },
  input:           { width: "100%", padding: "9px 12px", border: "1.5px solid #d1d5db", borderRadius: 7, fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" },
  textarea:        { width: "100%", padding: "9px 12px", border: "1.5px solid #d1d5db", borderRadius: 7, fontSize: 13, resize: "vertical", outline: "none", boxSizing: "border-box", background: "#fff" },
  select:          { width: "100%", padding: "9px 12px", border: "1.5px solid #d1d5db", borderRadius: 7, fontSize: 13, background: "#fff", outline: "none", boxSizing: "border-box" },
  radioGroup:      { display: "flex", flexWrap: "wrap", gap: "8px 18px" },
  radioLabel:      { display: "flex", alignItems: "center", fontSize: 13, cursor: "pointer", color: "#374151", gap: 5 },
  g2:              { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 6 },
  g3:              { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 6 },
  g4:              { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 6 },
  condModule:      { background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "16px 18px", marginTop: 14, marginBottom: 6 },
  condModuleTitle: { fontWeight: 700, fontSize: 13, color: "#1e40af", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 },
  condModuleBadge: { fontSize: 11, background: "#dbeafe", color: "#1d4ed8", borderRadius: 4, padding: "2px 8px", fontWeight: 500 },
  scaleHint:       { fontSize: 11, color: "#6b7280", marginTop: 4, fontStyle: "italic" },
  tableLabel:      { fontWeight: 700, fontSize: 13, color: "#1e40af", marginBottom: 8, marginTop: 14, borderLeft: "3px solid #3b82f6", paddingLeft: 8 },
  table:           { width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 8 },
  th:              { background: "#1d4ed8", color: "#fff", padding: "9px 12px", textAlign: "left", fontWeight: 600, fontSize: 12, border: "1px solid #1d4ed8" },
  td:              { padding: "8px 12px", border: "1px solid #e5e7eb", fontSize: 13, verticalAlign: "middle" },
  block:           { border: "1px solid #e2e8f0", borderRadius: 9, padding: 16, marginBottom: 12, background: "#f8fafc" },
  blockHead:       { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  rmBtn:           { background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16, padding: "0 4px" },
  addBtn:          { background: "#1d4ed8", color: "#fff", border: "none", padding: "8px 18px", borderRadius: 7, cursor: "pointer", fontSize: 13, fontWeight: 600, marginTop: 4 },
  fluidGrid:       { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden", marginBottom: 16 },
  fluidCell:       { padding: "12px 14px", borderRight: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", background: "#fff" },
  fluidCellLabel:  { fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 6 },
  fluidInput:      { width: "100%", padding: "7px 10px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, fontWeight: 600, color: "#1e40af", outline: "none", boxSizing: "border-box", background: "#f8fafc" },
  infoNote:        { background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 7, padding: "10px 14px", fontSize: 12, color: "#92400e", marginBottom: 14 },
  isbarGrid:       { display: "flex", flexDirection: "column", gap: 12, marginTop: 8 },
  isbarRow:        { display: "flex", gap: 14, alignItems: "flex-start" },
  isbarCode:       { width: 36, height: 36, borderRadius: "50%", background: "#1d4ed8", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0, marginTop: 2 },
  isbarLabel:      { fontWeight: 700, fontSize: 13, color: "#1e40af", marginBottom: 2 },
  isbarHint:       { fontSize: 11, color: "#9ca3af", marginBottom: 5 },
  legalNote:       { background: "#fef9c3", border: "1px solid #fde047", borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "#713f12", marginTop: 14, lineHeight: 1.7 },
  btnPrimary:      { background: "#1d4ed8", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 700, boxShadow: "0 2px 8px rgba(29,78,216,0.3)" },
  btnSec:          { background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.35)", padding: "9px 18px", borderRadius: 8, cursor: "pointer", fontSize: 13 },
  inlineInput:     { width: "100%", padding: "5px 7px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 12, outline: "none", boxSizing: "border-box", background: "#fff" },
  inlineSelect:    { width: "100%", padding: "5px 7px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: 12, background: "#fff", outline: "none", boxSizing: "border-box" },
};
