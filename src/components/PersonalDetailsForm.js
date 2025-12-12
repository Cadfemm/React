import { useEffect, useMemo, useState, useCallback } from "react";
import EmploymentDetailsForm from "./EmploymentDetailsForm";
import FinancialDetailsForm from "./FinancialDetailsForm";
import AsyncPatientSearch from "./AsyncPatientSearch";
import { DateTriple } from "../pages/Menu";
import {Row} from "../pages/Menu";
import axios from "axios";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});



function PersonalDetailsForm({ value, onChange, onFinancialChange, onEmploymentChange }) {
  // controlled form via parent
  const form = value;
  const set = useCallback((k, v) => {
  onChange(prev => ({ ...prev, [k]: v }));
}, [onChange]);

  const [innerTab, setInnerTab]   = useState("PATIENT"); // PATIENT | FINANCIAL | EMPLOYMENT
  const [userType, setUserType]   = useState("New");     // New | Existing
  const [existingPick, setExistingPick] = useState("");
  const [history, setHistory]     = useState([]);
  const [status, setStatus]       = useState("idle");    // idle | saving | saved | error
  const [msg, setMsg]             = useState("");

  const days   = useMemo(() => Array.from({length:31}, (_,i)=>(`${i+1}`.padStart(2,"0"))), []);
  const months = useMemo(() => [
    {v:"01",n:"Jan"},{v:"02",n:"Feb"},{v:"03",n:"Mar"},{v:"04",n:"Apr"},
    {v:"05",n:"May"},{v:"06",n:"Jun"},{v:"07",n:"Jul"},{v:"08",n:"Aug"},
    {v:"09",n:"Sep"},{v:"10",n:"Oct"},{v:"11",n:"Nov"},{v:"12",n:"Dec"},
  ], []);
  const years  = useMemo(() => {
    const y = new Date().getFullYear();
    const a = [];
    for (let i = y; i >= 1900; i--) a.push(`${i}`);
    return a;
  }, []);
  const fmtDate = (d, m, y) => (d && m && y) ? `${y}-${m}-${d}` : null;

  // Load an existing patient by pick (fills demographics + history)
  useEffect(() => {
    if (userType !== "Existing" || !existingPick) return;
    (async () => {
      try {
        setMsg(""); setStatus("idle");
        set("photo_url", p.photo_url || "");
setPhotoPreview(p.photo_url || "");
setPhotoFile(null);

        // demographics
        const r1 = await fetch(`${API}/patients/${encodeURIComponent(existingPick)}`);
        if (!r1.ok) throw new Error(`HTTP ${r1.status}`);
        const p = await r1.json();
        set("patient_id", p.patient_id || "");
        set("patient_name", p.patient_name || "");
        if (p.date_of_birth) {
          const [Y,M,D] = p.date_of_birth.split("-");
          set("dob_year", Y || ""); set("dob_month", M || ""); set("dob_day", D || "");
        } else { set("dob_year",""); set("dob_month",""); set("dob_day",""); }
        if (p.date_register_otc) {
          const [RY,RM,RD] = p.date_register_otc.split("-");
          set("reg_year", RY || ""); set("reg_month", RM || ""); set("reg_day", RD || "");
        } else { set("reg_year",""); set("reg_month",""); set("reg_day",""); }
        set("gender", p.gender || "");
        set("marital", p.marital_status || "");
        set("nationality", p.nationality || "");
        set("occupation", p.occupation || "");

        // history
        const r2 = await fetch(`${API}/patients/${encodeURIComponent(existingPick)}/history`);
        const hist = r2.ok ? await r2.json() : [];
        setHistory(hist || []);
      } catch (e) {
        setMsg(`Failed to load patient: ${e.message}`);
      }
    })();
  }, [userType, existingPick]);

  // Real save for personal details (create or update)
  const handleSave = async (e) => {
    e.preventDefault();
    if (status === "saving") return;
    setStatus("saving"); setMsg("");

    try {
      const dob = fmtDate(form.dob_day, form.dob_month, form.dob_year);
      const reg = fmtDate(form.reg_day, form.reg_month, form.reg_year);

      const payload = {
        patient_name: (form.patient_name || "").trim(),
        gender: form.gender || "",
        marital_status: form.marital || "",
        nationality: form.nationality || "",
        occupation: form.occupation || "",
        date_of_birth: dob,
        date_register_otc: reg
      };

      let res;
      if (userType === "Existing" && form.patient_id) {
        // update
        res = await fetch(`${API}/patients/${encodeURIComponent(form.patient_id)}`, {
          method: "PUT",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(payload)
        });
      } else {
        // create
        res = await fetch(`${API}/patients`, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(payload)
        });
      }

      const errBody = await (res.ok ? null : res.json().catch(()=>null));
      if (!res.ok) throw new Error(`${res.status} ${errBody?.error || res.statusText}`);

      const out = await res.json();
      // VERY IMPORTANT: put returned id into parent state so other tabs can save
      if (out.patient_id) set("patient_id", out.patient_id);

      setStatus("saved");
      setMsg(out.message || "Saved.");
    } catch (e2) {
      setStatus("error");
      setMsg(`Save failed: ${e2.message}`);
    }
  };

// Max size: 50 MB
const MAX_PHOTO_BYTES = 50 * 1024 * 1024;

// NEW: photo upload state
const [photoFile, setPhotoFile]       = useState(null);
const [photoPreview, setPhotoPreview] = useState(""); // objectURL or existing URL
const [photoStatus, setPhotoStatus]   = useState("idle"); // idle|saving|saved|error
const [photoMsg, setPhotoMsg]         = useState("");

// revoke object URLs when preview changes
useEffect(() => {
  return () => {
    if (photoPreview && photoPreview.startsWith("blob:")) {
      try { URL.revokeObjectURL(photoPreview); } catch {}
    }
  };
}, [photoPreview]);

// Pick file handler
const onPickPhoto = (e) => {
  const f = e.target.files?.[0];
  if (!f) return;
  if (!f.type.startsWith("image/")) {
    setPhotoMsg("Please choose an image file."); setPhotoFile(null); return;
  }
  if (f.size > MAX_PHOTO_BYTES) {
    setPhotoMsg("Max size is 50 MB."); setPhotoFile(null); return;
  }
  setPhotoMsg(""); setPhotoFile(f);
  const url = URL.createObjectURL(f);
  setPhotoPreview(url);
};

// Clear selection (does not delete server copy)
const clearPhoto = () => {
  setPhotoFile(null);
  setPhotoMsg("");
  // keep preview if it is the existing server URL; clear if it's a blob
  if (photoPreview.startsWith("blob:")) setPhotoPreview("");
};

// Upload to backend (adjust endpoint if needed)
async function uploadProfilePhoto(patientId) {
  if (!photoFile || !patientId) return;
  setPhotoStatus("saving"); setPhotoMsg("");
  try {
    const fd = new FormData();
    fd.append("file", photoFile);
    // Example endpoint: PUT /patients/:id/photo  (use POST if your API expects it)
    const res = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/photo`, {
      method: "PUT",
      body: fd,
    });
    const errBody = await (res.ok ? null : res.json().catch(()=>null));
    if (!res.ok) throw new Error(`${res.status} ${errBody?.error || res.statusText}`);

    const out = await res.json().catch(()=>({}));
    // If your API returns the stored URL:
    if (out.photo_url) {
      set("photo_url", out.photo_url);
      setPhotoPreview(out.photo_url);
    }
    setPhotoStatus("saved");
    setPhotoMsg("Photo uploaded.");
  } catch (e) {
    setPhotoStatus("error");
    setPhotoMsg(`Upload failed: ${e.message}`);
  }
}





  return (
    <section className="card">
      {/* Inner tabs */}

      <div className="innerTabs">
        
        <button type="button"
          className={`innerTab ${innerTab==="PATIENT"?"active":""}`}
          onClick={()=>setInnerTab("PATIENT")}
        >Patient Details</button>
        <button type="button"
          className={`innerTab ${innerTab==="FINANCIAL"?"active":""}`}
          onClick={()=>setInnerTab("FINANCIAL")}
        >Financial Details</button>
        <button type="button"
          className={`innerTab ${innerTab==="EMPLOYMENT"?"active":""}`}
          onClick={()=>setInnerTab("EMPLOYMENT")}
        >Employment Details</button>
      </div>
{/* Profile Photo (max 50 MB) */}
<div className="row" style={{ padding: "10px",  gap: 16, alignItems: "center", flexWrap: "wrap" }}>
  <div style={{
    width: 104, height: 104, borderRadius: "6px", overflow: "hidden",
    border: "1px solid #ddd", background: "#f6f6f6", display: "flex",
    alignItems: "center", justifyContent: "center"
  }}>
    {photoPreview ? (
      <img
        src={photoPreview}
        alt="Profile"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : (
      <span style={{ fontSize: 12, color: "#999", textAlign: "center", padding: 8 }}>
        No photo
      </span>
    )}
  </div>

  <div style={{ display: "grid", gap: 8, minWidth: 240 }}>
    <input
      type="file"
      accept="image/*"
      onChange={onPickPhoto}
      style={{ maxWidth: 280 }}
    />
    <div style={{ gap: 8,display:"flex", flexWrap: "wrap" }}>
      <button type="button" className="btn" onClick={() => uploadProfilePhoto(form.patient_id || "")}
        disabled={!photoFile || photoStatus === "saving"}>
        {photoStatus === "saving" ? "Uploading…" : "Photo Uploaded"}
      </button>
      <button type="button" className="btn" onClick={clearPhoto} disabled={!photoFile && !photoPreview}>
        Clear
      </button>
    </div>
    <div className="hint" style={{ fontSize: 12, color: "#666" }}>
      Max size: 50&nbsp;MB. Accepted: images only.
    </div>
    {photoMsg && (
      <div className="hint" style={{ color: photoStatus === "error" ? "#b00020" : "#2f6f2f" }}>
        {photoMsg}
      </div>
    )}
  </div>
</div>

      {/* Employment Tab */}
      <div style={{display: innerTab==="EMPLOYMENT" ? "block" : "none"}}>
       <EmploymentDetailsForm
      patientId={form.patient_id}          // ⬅️ was patient.patient_id (undefined here)
      onChangeData={onEmploymentChange}    // ⬅️ pass parent setter from App
    />
      </div>

      {/* Patient Tab */}
      <div style={{display: innerTab==="PATIENT" ? "block" : "none"}}>
        <div className="row" style={{padding:"40px 10px 10px 10px"}}>
          <div className="label">User type</div>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <select className="input" value={userType}
              onChange={e=>{ setUserType(e.target.value); setExistingPick(""); }}>
              <option value="New">Private</option>
              <option value="Existing">SOCSO</option>
            </select>

            <input className="input" style={{maxWidth:200}}
              placeholder="Patient ID - IND0002"
              value={form.patient_id || ""}
              onChange={e=>set("patient_id", e.target.value)}
              readOnly={userType==="Existing"}
            />
          </div>
        </div>

        {userType === "Existing" && (
          <div className="row">
            <div className="label" style={{margin:"12px"}}>Find patient</div>
            <div>
              <AsyncPatientSearch value={existingPick} onSelect={(pid)=>setExistingPick(pid)} />
              <div className="hint" style={{marginTop:6}}>
                Search by ID or name. Picking one will auto-fill the form and show history.
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSave} className="form">
          <Row label="Patient name">
            <input className="input" placeholder="Enter Full Name"
              value={form.patient_name || ""}
              onChange={e=>set("patient_name", e.target.value)} />
          </Row>

          <Row label="Date Register OTC">
            <DateTriple form={form} onChange={set} pfx="reg" days={days} months={months} years={years} />
          </Row>

          <Row label="Date of Birth">
            <DateTriple form={form} onChange={set} pfx="dob" days={days} months={months} years={years} />
          </Row>

          <Row label="Gender">
            <select className="input" value={form.gender || ""} onChange={e=>set("gender", e.target.value)}>
              <option value="">— Select Gender —</option>
              <option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option>
            </select>
          </Row>

          <Row label="Marital Status">
            <select className="input" value={form.marital || ""} onChange={e=>set("marital", e.target.value)}>
              <option value="">— Select Status —</option>
              <option>Single</option><option>Married</option><option>Separated</option>
              <option>Divorced</option><option>Widowed</option>
            </select>
          </Row>

          <Row label="Nationality">
            <input className="input" placeholder="e.g., Indian"
              value={form.nationality || ""} onChange={e=>set("nationality", e.target.value)} />
          </Row>

          <Row label="Occupation">
            <input className="input" placeholder="e.g., Engineer"
              value={form.occupation || ""} onChange={e=>set("occupation", e.target.value)} />
          </Row>

          <div className="actions">
            {/* <button
              className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`}
              style={{ margin: "20px" }}
              type="submit"
              disabled={status === "saving"}
              aria-busy={status === "saving"}
            >
              {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save"}
            </button> */}
            {msg && <span className="hint" style={{marginLeft:10}}>{msg}</span>}
          </div>
        </form>

        {userType === "Existing" && (
          <div className="box" style={{marginTop:12}}>
            <div className="box-title">Past visits / improvements</div>
            {history.length === 0 ? (
              <div className="muted">No prior records found.</div>
            ) : (
              <ul className="flat">
                {history.map((h, i)=>(
                  <li key={i}><b>{h.date || h.timestamp || "—"}</b> — {h.summary || h.note || h.detail || "Entry"}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Financial Tab */}
      <div style={{display: innerTab==="FINANCIAL" ? "block" : "none"}}>
        <FinancialDetailsForm
      patientId={form.patient_id}          // ⬅️ use form.patient_id
      onChangeData={onFinancialChange}     // ⬅️ pass parent setter from App
    />
      </div>
    </section>
  );
}
export default PersonalDetailsForm;