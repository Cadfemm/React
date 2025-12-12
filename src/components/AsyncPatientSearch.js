import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});


function AsyncPatientSearch({ value, onSelect }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState([]);
  const [busy, setBusy] = useState(false);
 
  useEffect(() => {
    if (!q || q.length < 2) { setOpts([]); return; }
    const t = setTimeout(async () => {
      try {
        setBusy(true);
        const r = await fetch(`${API}/patients/search?q=${encodeURIComponent(q)}`);
        if (r.ok) {
          const a = await r.json(); // [{patient_id, patient_name, date_of_birth}]
          const mapped = a.map(p => ({
            value: p.patient_id,
            label: `${p.patient_id} — ${p.patient_name || ""}${p.date_of_birth ? ` (${p.date_of_birth})` : ""}`
          }));
          setOpts(mapped);
          setOpen(true);
        }
      } finally { setBusy(false); }
    }, 280);
    return () => clearTimeout(t);
  }, [q]);
 
  return (
    <div className="ms" style={{width: 420, position:"relative",paddingRight:"20px"}}>
      <input
        className="input"
        placeholder="Type patient ID or name…"
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        onFocus={()=>q && setOpen(true)}
      />
      {open && opts.length>0 && (
        <div className="ms-pop" style={{position:"absolute", width:"100%"}}>
          <div className="ms-list">
            {opts.map(o => (
              <div key={o.value} className="ms-item"
                   onClick={() => { onSelect(o.value); setQ(o.label); setOpen(false); }}>
                {o.label}
              </div>
            ))}
          </div>
        </div>
      )}
      {busy && <div className="hint" style={{marginTop:6}}>Searching…</div>}
    </div>
  );
}
export default AsyncPatientSearch;