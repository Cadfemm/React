import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});


function MultiSelect({ options, selected, onChange, placeholder="Select…", width=420 }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
 
  const filtered = useMemo(() => {
    const s = (q || "").toLowerCase();
    if (!s) return options;
    return options.filter(o =>
      o.value.toLowerCase().includes(s) ||
      (o.label || "").toLowerCase().includes(s)
    );
  }, [q, options]);
 
  const toggle = (val) => {
    const next = new Set(selected);
    if (next.has(val)) next.delete(val); else next.add(val);
    onChange(next);
  };
  const allVisibleSelected = filtered.length > 0 && filtered.every(o => selected.has(o.value));
  const selectAllVisible = () => {
    const next = new Set(selected);
    filtered.forEach(o => next.add(o.value));
    onChange(next);
  };
  const clearVisible = () => {
    const next = new Set(selected);
    filtered.forEach(o => next.delete(o.value));
    onChange(next);
  };
 
  return (
    <div className="ms" style={{width}}>
      <button type="button" className="ms-btn" onClick={()=>setOpen(o=>!o)}>
        {selected.size ? `${selected.size} selected` : placeholder}
        <span className="ms-caret">▾</span>
      </button>
 
      {open && (
        <div className="ms-pop">
          <div className="ms-hdr">
            <input className="ms-search" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)} />
            <div className="ms-actions">
              <button className="ms-mini" onClick={selectAllVisible} disabled={filtered.length===0 || allVisibleSelected}>Select All</button>
              <button className="ms-mini" onClick={clearVisible} disabled={filtered.length===0}>Clear</button>
              <button className="ms-mini" onClick={()=>setOpen(false)}>Apply</button>
            </div>
          </div>
          <div className="ms-list">
            {filtered.length===0 ? (
              <div className="ms-empty">No matches</div>
            ) : filtered.map(o => (
              <label key={o.value} className="ms-item">
                <input type="checkbox" checked={selected.has(o.value)} onChange={()=>toggle(o.value)} />
                <span>{o.label || o.value}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default MultiSelect;