import { useEffect, useState } from "react";
import {Row} from "../pages/Menu";
import axios from "axios";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});

function FinancialDetailsForm({ patientId, onChangeData }) {
  const [data, setData]   = useState({
    payer_type: "Self-pay",
    insurer_existing: "",
    create_new_insurer: "No",
    pricing_policy: "",
    contact_no: "",
    email: "",
    gl_from: "",
    gl_to: "",
    amount_rm: "",
    policy_ref: "",
    oku_holder: "No",
    oku_id: "",
    upload_copy_of_gl: "No change of File",
  });
  const [status, setStatus] = useState("idle");
  const [msg, setMsg]       = useState("");
useEffect(() => {
    onChangeData?.(data);
  }, [data, onChangeData]);
  const set = (k,v)=>setData(prev=>({...prev,[k]:v}));

  const INSURERS = ["AXA","Cigna","Allianz","William Russell","AIA","Bupa","GeoBlue","IMG","MSIG"];
  const PRICING_POLICIES = [
    "Systematic approach",
    "Standing answer to recurring questions",
    "Alignment with business objectives",
    "Consideration of various factors"
  ];

  // Load existing
  useEffect(()=>{
    if (!patientId) return;
    (async ()=>{
      try{
        setMsg("");
        const r = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/financial`);
        if (r.ok){
          const d = await r.json();
          if (d && d.patient_id) {
            setData(prev=>({
              ...prev, ...d,
              amount_rm: d.amount_rm ?? "", // keep editable
              oku_holder: d.oku_holder || "No",
              oku_id: d.oku_id || ""
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

      const payload = { ...data };
      // numeric & conditional cleanup
      const amt = parseFloat(String(payload.amount_rm).replace(/,/g, ""));
      payload.amount_rm = Number.isFinite(amt) ? amt : null;
      if (payload.oku_holder !== "Yes") payload.oku_id = "";

      const r = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/financial`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      const errBody = await (r.ok ? null : r.json().catch(()=>null));
      if (!r.ok) throw new Error(`${r.status} ${errBody?.error || r.statusText}`);

      const out = await r.json();
      setStatus("saved");
      setMsg(out.message || "Financial details saved");
    }catch(e){
      setStatus("idle");
      setMsg(`Save failed: ${e.message}`);
    }
  };

  return (
    <div>
      <div className="barTitle">Financial Details</div>

      <Row label="Payer Type">
        <select className="input" value={data.payer_type} onChange={e=>set("payer_type", e.target.value)}>
          <option>Self-pay</option><option>Insurance</option><option>Corporate</option><option>Government</option><option>Other</option>
        </select>
      </Row>

      <Row label="Create New Insurer / Company?">
        <select className="input" value={data.create_new_insurer} onChange={e=>set("create_new_insurer", e.target.value)}>
          <option>No</option><option>Yes</option>
        </select>
      </Row>

      <div className="barTitle soft">Payer Information</div>

      <Row label="Select Existing Payer">
        <select className="input" value={data.insurer_existing} onChange={e=>set("insurer_existing", e.target.value)}>
          <option value="">— Select Insurer —</option>
          {INSURERS.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </Row>

      <Row label="Pricing Policy">
        <select className="input" value={data.pricing_policy} onChange={e=>set("pricing_policy", e.target.value)}>
          <option value="">— Select Policy —</option>
          {PRICING_POLICIES.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </Row>

      <Row label="Contact No">
        <input className="input" placeholder="e.g., +91-XXXXXXXXXX"
               value={data.contact_no} onChange={e=>set("contact_no", e.target.value)} />
      </Row>

      <Row label="e-Mail">
        <input className="input" placeholder="payer@example.com"
               value={data.email} onChange={e=>set("email", e.target.value)} />
      </Row>

      <Row label="GL Date From">
        <input className="input" type="date" value={data.gl_from} onChange={e=>set("gl_from", e.target.value)} style={{maxWidth:220}} />
      </Row>

      <Row label="To">
        <input className="input" type="date" value={data.gl_to} onChange={e=>set("gl_to", e.target.value)} style={{maxWidth:220}} />
      </Row>

      <Row label="Amount (RM)">
        <input className="input" type="number" step="0.01"
               value={data.amount_rm} onChange={e=>set("amount_rm", e.target.value)} />
      </Row>

      <Row label="Policy Reference">
        <input className="input" placeholder="Policy Reference"
               value={data.policy_ref} onChange={e=>set("policy_ref", e.target.value)} />
      </Row>

      <Row label="OKU Card Holder">
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <select className="input" style={{maxWidth:220}} value={data.oku_holder} onChange={e=>{
            const v = e.target.value; set("oku_holder", v); if (v !== "Yes") set("oku_id", "");
          }}>
            <option>No</option><option>Yes</option>
          </select>
          {data.oku_holder === "Yes" && (
            <input className="input" style={{maxWidth:260}} placeholder="Enter OKU ID"
                   value={data.oku_id} onChange={e=>set("oku_id", e.target.value)} />
          )}
        </div>
      </Row>

      <Row label="Upload Copy of GL">
        <select className="input" value={data.upload_copy_of_gl} onChange={e=>set("upload_copy_of_gl", e.target.value)}>
          <option>No change of file</option>
          <option>Upload now (coming soon)</option>
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
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save Financial"}
        </button>
        {msg && <span className="hint" style={{marginLeft:10}}>{msg}</span>}
        {!patientId && <span className="hint" style={{marginLeft:10}}>Save Patient Details first to get a Patient ID.</span>}
      </div>
    </div>
  );
}
export default FinancialDetailsForm;