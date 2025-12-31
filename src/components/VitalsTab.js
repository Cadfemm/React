import React from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";
const api = axios.create({ baseURL: API });

function VitalsTab({ patientId, encounterId, onSaved }) {
  const NOTE_MAX = 1000;
  const toLocalDT = (d = new Date()) =>
    new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  const n = (v) => (v === "" || v === null ? "" : Number(v));
  const calcMAP = (sys, dia) =>
    sys !== "" && dia !== "" ? Math.round((Number(sys) + 2 * Number(dia)) / 3) : "";
  const calcBMI = (cm, kg) => {
    if (cm === "" || kg === "") return "";
    const m = Number(cm) / 100;
    return m > 0 ? Number(kg) / (m * m) : "";
  };
const [activeTab, setActiveTab] = React.useState("VITALS"); 
// "VITALS" | "REPORTS"

const [openReport, setOpenReport] = React.useState(null);
const medicalReports = [
  {
    id: "cbc",
    title: "Complete Blood Count (CBC)",
    content: `
Hemoglobin: 13.4 g/dL
WBC: 7,800 /µL
Platelets: 2.4 lakh /µL
RBC Count: 4.8 million /µL
Interpretation: Within normal limits
    `,
  },
  {
    id: "echo",
    title: "2D Echocardiography",
    content: `
LV Ejection Fraction: 60%
No regional wall motion abnormality
Valves: Normal
Impression: Normal cardiac function
    `,
  },
  {
    id: "urine",
    title: "Urine Routine Examination",
    content: `
Color: Pale yellow
Protein: Nil
Sugar: Nil
Pus cells: 1–2 / HPF
Impression: Normal
    `,
  },
  {
    id: "xray",
    title: "Chest X-Ray",
    content: `
Lung fields: Clear
Cardiac silhouette: Normal
No active pulmonary disease
    `,
  },
];

  const [v, setV] = React.useState({
    ts: toLocalDT(),
    position: "sitting",
    hr_bpm: "",
    bp_sys: "",
    bp_dia: "",

    rr_bpm: "",
    spo2_pct: "",
    o2_flow_lpm: "",
    temp_c: "",
    temp_method: "oral",
    pain_0_10: "",
    rpe_0_10: "",
    o_sup_hr: "", o_sup_sys: "", o_sup_dia: "",
    o_sit_hr: "", o_sit_sys: "", o_sit_dia: "",
    o_std_hr: "", o_std_sys: "", o_std_dia: "",
    peak_hr: "", peak_spo2: "", peak_rpe: "",
    rec1_hr: "", rec1_spo2: "",
    rec3_hr: "", 
    height_cm: "", weight_kg: "", bmi: "",
    device: "", site_bp: "", cuff_size: "", site_spo2: "",
    notes: "", 
  });

  React.useEffect(() => {
    setV((p) => ({ ...p, map: calcMAP(p.bp_sys, p.bp_dia) }));
  }, [v.bp_sys, v.bp_dia]);

  React.useEffect(() => {
    setV((p) => ({ ...p, bmi: calcBMI(p.height_cm, p.weight_kg) }));
  }, [v.height_cm, v.weight_kg]);

  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));

  // 🔄 Generate random vitals
  const fetchRandomVitals = () => {
    const rand = (min, max, dec = 0) =>
      (Math.random() * (max - min) + min).toFixed(dec);
    const rv = {
      
      bp_sys: rand(110, 130),
      bp_dia: rand(70, 85),
      rr_bpm: rand(12, 20),
      spo2_pct: rand(95, 99),
      o2_flow_lpm: rand(0, 2, 1),
      temp_c: rand(36.3, 37.4, 1),
      pain_0_10: rand(0, 3),
      rpe_0_10: rand(0, 5),
      peak_hr: rand(120, 160),
      peak_spo2: rand(94, 98),
      rec1_hr: rand(100, 120),
      rec1_spo2: rand(95, 98),
      rec3_hr: rand(80, 100),
      
      height_cm: rand(155, 185),
      weight_kg: rand(55, 90),
      device: "Welch Allyn Connex 6000",
      site_bp: "Left Arm",
      
      site_spo2: "Finger",
    
      
    };
    rv.map = calcMAP(rv.bp_sys, rv.bp_dia);
    rv.bmi = calcBMI(rv.height_cm, rv.weight_kg);
    setV((p) => ({ ...p, ...rv }));
  };

  const [status, setStatus] = React.useState("idle");
  const save = async () => {
    if (!patientId) return;
    setStatus("saving");
    const payload = {
      patient_id: patientId,
      encounter_id: encounterId || null,
      vitals: {
        ts: new Date(v.ts).toISOString(),
        position: v.position,
        hr_bpm: n(v.hr_bpm),
        bp: { sys: n(v.bp_sys), dia: n(v.bp_dia), map: n(v.map), site: v.site_bp, cuff: v.cuff_size },
        rr_bpm: n(v.rr_bpm),
        spo2_pct: n(v.spo2_pct),
        o2_flow_lpm: v.o2_flow_lpm === "" ? null : n(v.o2_flow_lpm),
        temp_c: v.temp_c === "" ? null : n(v.temp_c),
        temp_method: v.temp_method,
        pain_0_10: v.pain_0_10 === "" ? null : n(v.pain_0_10),
        rpe_0_10: v.rpe_0_10 === "" ? null : n(v.rpe_0_10),
      },
      device: v.device,
      site_spo2: v.site_spo2,
      notes: v.notes,
      allergy: v.allergy,
    };

    try {
      const r = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/vitals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("save failed");
      setStatus("saved");
      onSaved?.();
      setTimeout(() => setStatus("idle"), 1500);
    } catch (e) {
      console.error(e);
      setStatus("idle");
      alert("Failed to save vitals.");
    }
  };
return (
  <section className="card vitals">

    {/* TAB HEADER */}
    <div style={tabHeader}>
      <button
        style={activeTab === "VITALS" ? tabActive : tabBtn}
        onClick={() => setActiveTab("VITALS")}
      >
        Vitals
      </button>

      <button
        style={activeTab === "REPORTS" ? tabActive : tabBtn}
        onClick={() => setActiveTab("REPORTS")}
      >
        Medical Reports
      </button>
    </div>

  {activeTab === "VITALS" && (
  <>
    {
   
      <div>
      <div className="cardheading"><h2 className="title">Vitals — Rehab Capture</h2></div>

    {/* BASELINE */}
    <div className="section" style={{margin:"12px 20px"}}>
      <div className="grid" style={{alignItems:"end"}}>
        <div className="field" style={{gridColumn:"span 3"}}>
          <div className="label-sm">Time</div>
          <div className="control">
            <input type="datetime-local" className="input-sm" value={v.ts} onChange={set("ts")} />
          </div>
        </div>

        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Position</div>
          <select className="select-sm" value={v.position} onChange={set("position")}>
            <option>sitting</option><option>standing</option><option>supine</option>
          </select>
        </div>

        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">HR (bpm)</div>
          <div className="control">
            <input type="number" className="input-sm num" value={v.hr_bpm} onChange={set("hr_bpm")} />
          </div>
        </div>

        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">RR (bpm)</div>
          <input type="number" className="input-sm num" value={v.rr_bpm} onChange={set("rr_bpm")} />
        </div>

        <div className="field" style={{gridColumn:"span 1"}}>
          <div className="label-sm">SpO₂ (%)</div>
          <input type="number" className="input-sm num" value={v.spo2_pct} onChange={set("spo2_pct")} />
        </div>

        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">O₂ flow (L/min)</div>
          <input type="number" step="0.1" className="input-sm num" value={v.o2_flow_lpm} onChange={set("o2_flow_lpm")} />
        </div>
      </div>

      <div className="grid" style={{marginTop:10, alignItems:"end"}}>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">BP systolic</div>
          <input type="number" className="input-sm num" value={v.bp_sys} onChange={set("bp_sys")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">BP diastolic</div>
          <input type="number" className="input-sm num" value={v.bp_dia} onChange={set("bp_dia")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">MAP (auto)</div>
          <input className="input-sm num" value={v.map} readOnly />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">BP site</div>
          <input className="input-sm" placeholder="Left Arm" value={v.site_bp} onChange={set("site_bp")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">BP cuff</div>
          <input className="input-sm" placeholder="Adult / Large" value={v.cuff_size} onChange={set("cuff_size")} />
        </div>

        <div className="right" style={{gridColumn:"span 2"}}>
          <button className="btn btn-link" onClick={() => setV(p => ({...p, ts: toLocalDT()}))}>Now</button>
          <div className="chip-info">Last edited auto-saves on Save</div>
        </div>
      </div>

      <div className="grid" style={{marginTop:10}}>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Temp (°C)</div>
          <input type="number" step="0.1" className="input-sm num" value={v.temp_c} onChange={set("temp_c")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Method</div>
          <select className="select-sm" value={v.temp_method} onChange={set("temp_method")}>
            <option>Oral</option><option>Tympanic</option><option>Axillary</option><option>Rectal</option>
          </select>
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Pain (0–10)</div>
          <input type="number" min="0" max="10" className="input-sm num" value={v.pain_0_10} onChange={set("pain_0_10")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">RPE (0–10)</div>
          <input type="number" min="0" max="10" className="input-sm num" value={v.rpe_0_10} onChange={set("rpe_0_10")} />
        </div>
      </div>
    </div>

    {/* ORTHOSTATICS */}
    <div className="section" style={{margin:"12px 20px"}}>
      <div className="box-title" style={{marginBottom:6}}>Orthostatics (HR & BP)</div>

      <table className="vtable">
        <thead>
          <tr>
            <th className="right" style={{textAlign:"left"}}>Position</th>
            <th>HR (bpm)</th><th>Sys</th><th>Dia</th>
          </tr>
        </thead>
      </table>

      <div className="vrow">
        <div className="pos">Supine</div>
        <input type="number" className="input-sm num" value={v.o_sup_hr} onChange={set("o_sup_hr")} />
        <input type="number" className="input-sm num" value={v.o_sup_sys} onChange={set("o_sup_sys")} />
        <input type="number" className="input-sm num" value={v.o_sup_dia} onChange={set("o_sup_dia")} />
      </div>
      <div className="vrow">
        <div className="pos">Sitting</div>
        <input type="number" className="input-sm num" value={v.o_sit_hr} onChange={set("o_sit_hr")} />
        <input type="number" className="input-sm num" value={v.o_sit_sys} onChange={set("o_sit_sys")} />
        <input type="number" className="input-sm num" value={v.o_sit_dia} onChange={set("o_sit_dia")} />
      </div>
      <div className="vrow">
        <div className="pos">Standing</div>
        <input type="number" className="input-sm num" value={v.o_std_hr} onChange={set("o_std_hr")} />
        <input type="number" className="input-sm num" value={v.o_std_sys} onChange={set("o_std_sys")} />
        <input type="number" className="input-sm num" value={v.o_std_dia} onChange={set("o_std_dia")} />
      </div>
    </div>

    {/* EXERCISE SESSION */}
    <div className="section" style={{margin:"12px 20px"}}>
      <div className="box-title" style={{marginBottom:6}}>Exercise Session — Peak & Recovery</div>
      <div className="grid">
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Peak HR</div>
          <input type="number" className="input-sm num" value={v.peak_hr} onChange={set("peak_hr")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Peak SpO₂</div>
          <input type="number" className="input-sm num" value={v.peak_spo2} onChange={set("peak_spo2")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Peak RPE</div>
          <input type="number" min="0" max="10" className="input-sm num" value={v.peak_rpe} onChange={set("peak_rpe")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">HR @ 1 min</div>
          <input type="number" className="input-sm num" value={v.rec1_hr} onChange={set("rec1_hr")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">SpO₂ @ 1 min</div>
          <input type="number" className="input-sm num" value={v.rec1_spo2} onChange={set("rec1_spo2")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}} />
      </div>

      <div className="grid" style={{marginTop:10}}>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">HR @ 3 min</div>
          <input type="number" className="input-sm num" value={v.rec3_hr} onChange={set("rec3_hr")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">SpO₂ @ 3 min</div>
          <input type="number" className="input-sm num" value={v.rec3_spo2} onChange={set("rec3_spo2")} />
        </div>
      </div>
    </div>

    {/* ANTHROPOMETRICS + NOTES */}
    <div className="section" style={{margin:"12px 20px"}}>
      <div className="box-title" style={{marginBottom:6}}>Anthropometrics & Notes</div>
      <div className="grid">
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Height (cm)</div>
          <input type="number" step="0.1" className="input-sm num" value={v.height_cm} onChange={set("height_cm")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Weight (kg)</div>
          <input type="number" step="0.1" className="input-sm num" value={v.weight_kg} onChange={set("weight_kg")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">BMI (auto)</div>
          <input className="input-sm num" value={v.bmi === "" ? "" : Number(v.bmi).toFixed(1)} readOnly />
        </div>
        <div className="field" style={{gridColumn:"span 3"}}>
          <div className="label-sm">Device</div>
          <input className="input-sm" value={v.device} onChange={set("device")} placeholder="Welch Allyn Connex 6000" />
        </div>
        <div className="field" style={{gridColumn:"span 3"}}>
          <div className="label-sm">SpO₂ site</div>
          <input className="input-sm" value={v.site_spo2} onChange={set("site_spo2")} placeholder="finger / ear" />
        </div>
        <div className="field" style={{gridColumn:"span 12"}}>
          <div className="label-sm">Notes</div>
          <textarea className="ta-sm" rows={3} maxLength={NOTE_MAX} value={v.notes} onChange={set("notes")}
            placeholder="e.g., arrhythmia detected, movement artifact, cuff mismatch" />
        </div>
      </div>
    </div>
<div className="cardheading"><h2 className="title">
  Allergic To </h2></div>
    {/* Allergy allerts*/}
    <div className="section" style={{margin:"12px 20px"}}>
      <div className="box-title" style={{marginBottom:6}}>Allergic Reactions to </div>
      <div className="grid">



        <div className="field" style={{gridColumn:"span 12"}}>
          <div className="label-sm">Mention to which the Patient feels allergic reactions for </div>
          <textarea className="ta-sm" rows={3} maxLength={NOTE_MAX} value={v.notes} onChange={set("notes")}
            placeholder="e.g., Eating Brinjal" />
        </div>
      </div>
    </div>
      <div
        className="actions"
        style={{
          display: "flex",
          gap: 10,
          margin: "10px 20px 20px",
          justifyContent: "flex-end",
        }}
      >
        <button className="btn" onClick={() => setV((p) => ({ ...p, ts: toLocalDT() }))}>
          Set time to Now
        </button>

        {/* 🔄 New button */}
        <button
          className="btn"
          style={{ backgroundColor: "#0284c7", color: "#fff" }}
          onClick={fetchRandomVitals}
        >
          🔄 Fetch From Machine
        </button>

        <button
          className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`}
          onClick={save}
          disabled={status === "saving"}
        >
          {status === "saving"
            ? "Saving…"
            : status === "saved"
            ? "Saved"
            : "Save"}
        </button>
      </div>
      </div>
   }
      </>
)}
{activeTab === "REPORTS" && (
  <div style={{ padding: 20 }}>

    {/* REPORT BUTTONS */}
    <div style={reportGrid}>
      {medicalReports.map((r) => (
        <button
          key={r.id}
          style={reportBtn}
          onClick={() => setOpenReport(r)}
        >
          📄 {r.title}
        </button>
      ))}
    </div>

    {/* OPEN REPORT */}
    {openReport && (
      <div style={reportBox}>
        <h3>{openReport.title}</h3>
        <pre style={reportContent}>{openReport.content}</pre>

        <button style={closeBtn} onClick={() => setOpenReport(null)}>
          Close Report
        </button>
      </div>
    )}
  </div>
)}
  </section>
);

  
}
const tabHeader = {
  display: "flex",
  gap: 10,
  borderBottom: "1px solid #ddd",
  marginBottom: 12,
};

const tabBtn = {
  padding: "8px 16px",
  border: "none",
 
  cursor: "pointer",
  fontWeight: 600,
};

const tabActive = {
  ...tabBtn,
  backgroundColor:"#0f172a"
};

const reportGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const reportBtn = {
  padding: "12px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
  textAlign: "left",
};

const reportBox = {
  marginTop: 20,
  padding: 16,
  border: "1px solid #ddd",
  borderRadius: 8,
  background: "#fff",
};

const reportContent = {
  whiteSpace: "pre-wrap",
  background: "#f9fafb",
  padding: 12,
  borderRadius: 6,
};

const closeBtn = {
  marginTop: 10,
  padding: "6px 14px",
};

export default VitalsTab;
