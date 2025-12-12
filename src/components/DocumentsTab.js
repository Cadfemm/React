import React from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});


function DocumentsTab({ patientId }) {
  const [rows, setRows] = React.useState([]); // [{name,date,url}]

  // Place these three files under: frontend /public/docs/
  // e.g., public/docs/Intial Assessment.pdf
  const STATIC_DOCS = React.useMemo(() => ([
    {
      name: "Intial Assessment.pdf",
      date: "25-08-2025",
      
    },
    {
      name: "Petient-Flow_EMR_TPS.docs",
      date: "22-08-2025",
     
    },
    {
      name: "TPS Session.mp4",
      date: "20-08-2025",
    
    }
  ]), []);

  const dedupeByName = React.useCallback((list) => {
    const seen = new Set();
    return list.filter(r => {
      const key = (r?.name || "").toLowerCase().trim();
      if (!key) return false;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const load = React.useCallback(async () => {
    let dynamic = [];
    if (patientId) {
      try {
        const r = await fetch(`${API}/documents/${encodeURIComponent(patientId)}`);
        if (r.ok) {
          const data = await r.json();
          // normalize dynamic rows to always have name/date/url fields
          dynamic = (Array.isArray(data) ? data : []).map(it => ({
            name: it.name || it.filename || "file",
            date: it.date || it.created || "—",
            url: it.url || it.link || ""
          }));
        }
      } catch {}
    }
    // Merge static + dynamic and de-dupe by filename
    setRows(dedupeByName([...STATIC_DOCS, ...dynamic]));
  }, [patientId, STATIC_DOCS, dedupeByName]);

  React.useEffect(() => { load(); }, [load]);

  const onDrop = async (e) => {
    e.preventDefault();
    if (!patientId) return;
    const files = e.dataTransfer.files;
    if (!files?.length) return;
    const fd = new FormData();
    [...files].forEach(f => fd.append("files", f));
    await fetch(`${API}/documents/${encodeURIComponent(patientId)}/upload`, { method:"POST", body: fd }).catch(()=>{});
    load();
  };

  const onPick = async (e) => {
    if (!patientId) return;
    const files = e.target.files;
    if (!files?.length) return;
    const fd = new FormData();
    [...files].forEach(f => fd.append("files", f));
    await fetch(`${API}/documents/${encodeURIComponent(patientId)}/upload`, { method:"POST", body: fd }).catch(()=>{});
    load();
  };

  const sample = async () => {
    // optional helper to seed demo files from API (static docs stay regardless)
    if (!patientId) return;
    await fetch(`${API}/documents/${encodeURIComponent(patientId)}/sample`, { method:"POST" }).catch(()=>{});
    load();
  };

  return (
    <section className="card">
      <div className="box soft" style={{margin:"20px"}}>
        <div className="doc-head">
          <div className="box-title">Documents</div>
          <button className="ms-mini" onClick={sample} disabled={!patientId}>Sample Files</button>
        </div>

        <table className="table doc" style={{marginTop:"20px"}}>
          <thead>
            <tr>
              <th>File</th>
              <th style={{width:"18%"}}>Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}>
                <td>
                  {r.url
                    ? <a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a>
                    : r.name}
                </td>
                <td>{r.date || "—"}</td>
              </tr>
            ))}
            {rows.length===0 && (
              <tr><td colSpan={2} className="muted">No files yet.</td></tr>
            )}
          </tbody>
        </table>

        <div className="dropzone"
             onDragOver={e=>e.preventDefault()}
             onDrop={onDrop}>
          Drop files here to upload
          <input type="file" multiple onChange={onPick} style={{display:"none"}} id="doc-pick"/>
          <label htmlFor="doc-pick" className="ms-mini" style={{marginLeft:8, cursor:"pointer"}}>or Choose</label>
        </div>
      </div>
    </section>
  );
}
export default DocumentsTab;