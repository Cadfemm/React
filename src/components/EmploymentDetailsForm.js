import { useEffect, useState } from "react";
import {Row} from "../pages/Menu";
import axios from "axios";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});


function EmploymentDetailsForm({ patientId , onChangeData }) {
  const [data, setData] = useState({
    employment_status: "Unemployed",
    occupation: "",
    industry: "Others",
    last_drawn_salary_rm: "0.00",
    osi_code: "U",
    osi_label: "Unemployed",
  });
  const [status, setStatus] = useState("idle");
  const [msg, setMsg]       = useState("");

  const set = (k,v)=>setData(prev=>({...prev,[k]:v}));

  const EMPLOYMENT_STATUSES = [
    "Unemployed","Employed - Full-time","Employed - Part-time",
    "Self-employed","Student","Retired","Homemaker","Unable to work","Other"
  ];
  const INDUSTRIES = [
    "Healthcare","Information Technology","Education","Finance",
    "Manufacturing","Retail","Hospitality","Construction","Public Sector","Others"
  ];
  const OSI_OPTIONS = [
    { code:"U", label:"Unemployed (U)" },
    { code:"R", label:"Realistic (R)" },
    { code:"I", label:"Investigative (I)" },
    { code:"A", label:"Artistic (A)" },
    { code:"S", label:"Social (S)" },
    { code:"E", label:"Enterprising (E)" },
    { code:"C", label:"Conventional (C)" },
  ];
useEffect(() => {
    onChangeData?.(data);
  }, [data, onChangeData]);

  // Load existing
  useEffect(()=>{
    if (!patientId) return;
    (async ()=>{
      try{
        setMsg("");
        const r = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/employment`);
        if (r.ok){
          const d = await r.json();
          if (d && d.patient_id) {
            setData(prev=>({
              ...prev,
              ...d,
              last_drawn_salary_rm: (d.last_drawn_salary_rm ?? "0.00").toString(),
              osi_code: d.osi_code || "U",
              osi_label: d.osi_label || "Unemployed"
            }));
          }
        }
      } catch(e){ setMsg(`Load failed: ${e.message}`); }
    })();
  }, [patientId]);

  // Save
  const save = async () => {
    try{
      if (!patientId) { alert("Save Patient Details first to get a Patient ID."); return; }
      setStatus("saving"); setMsg("");

      const payload = {
        ...data,
        last_drawn_salary_rm: data.last_drawn_salary_rm === "" ? 0.0 : Number(data.last_drawn_salary_rm),
      };

      const r = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/employment`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      const errBody = await (r.ok ? null : r.json().catch(()=>null));
      if (!r.ok) throw new Error(`${r.status} ${errBody?.error || r.statusText}`);

      const out = await r.json();
      setStatus("saved");
      setMsg(out.message || "Employment details saved");
    }catch(e){
      setStatus("idle");
      setMsg(`Save failed: ${e.message}`);
    }
  };

  return (
    <div>
      <div className="barTitle">Employment Details</div>

      <Row label="Current Employment Status *">
        <select className="input" value={data.employment_status} onChange={e=>set("employment_status", e.target.value)}>
          {EMPLOYMENT_STATUSES.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </Row>

      <Row label="Occupation">
        <input className="input" placeholder="e.g., Teacher / Engineer / NA"
               value={data.occupation} onChange={e=>set("occupation", e.target.value)} />
      </Row>

      <Row label="Industry">
        <select className="input" value={data.industry} onChange={e=>set("industry", e.target.value)}>
          {INDUSTRIES.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </Row>

      <Row label="Last Drawn Salary (RM) *">
        <input className="input" type="number" step="0.01"
               value={data.last_drawn_salary_rm}
               onChange={e=>set("last_drawn_salary_rm", e.target.value)} />
      </Row>

      <Row label="Occupational Search Inventory (OSI)">
        <select className="input"
                value={data.osi_code}
                onChange={e=>{
                  const code = e.target.value;
                  const opt = OSI_OPTIONS.find(o=>o.code===code);
                  set("osi_code", code);
                  set("osi_label", opt?.label || "");
                }}>
          {OSI_OPTIONS.map(o => <option key={o.code} value={o.code}>{o.label}</option>)}
        </select>
      </Row>

      <div className="actions">
        <button
          className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`}
          style={{ margin: "20px" }}
          type="button"
          onClick={save}
          disabled={status === "saving" || !patientId}
          aria-busy={status === "saving"}
        >
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save Employment"}
        </button>
        {msg && <span className="hint" style={{marginLeft:10}}>{msg}</span>}
        {!patientId && <span className="hint" style={{marginLeft:10}}>Save Patient Details first to get a Patient ID.</span>}
      </div>
    </div>
  );
}
export default EmploymentDetailsForm;