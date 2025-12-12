import React, { useState, useEffect, useMemo } from "react";
import AssessmentsPanel from "./AssessmentsPanel";
import MultiSelect from "./MultiSelect";
import axios from "axios";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});

function ICHITab({ icdCode, icfCode, onSummaryChange }) {
  const [rows, setRows] = useState([]);           // [{ icf_code, ichi_code, ichi_name }]
  const [catMap, setCatMap] = useState({});       // { icf_code: category }
  const [busy, setBusy] = useState(false);
  const [msg, setMsg]   = useState("");

  // single selection across all categories
  const [selected, setSelected] = useState(new Set());

  // modalities + note
  const [modsOptions, setModsOptions]   = useState([]);        // [{value,label}]
  const [modsSelected, setModsSelected] = useState(new Set()); // Set<string>
  const [note, setNote] = useState("");
const [assessSummary, setAssessSummary] = useState([]); // [{assessment, items:[{input,score}]}]

  // active tab/category
  const [activeCat, setActiveCat] = useState("");
// options
const [rangeOpts, setRangeOpts] = useState([]);      // [{value,label}]
const [durationOpts, setDurationOpts] = useState([]);

// selections per modalityId string
const [rangeSelByMod, setRangeSelByMod] = useState({});     // { '7': 2, ... }
const [durSelByMod, setDurSelByMod]     = useState({});     // { '7': 8, ... }

  const API = process.env.REACT_APP_API || "";
  const NOTE_MAX = 1000;

  const getJSON = async (u) => {
    const r = await fetch(u);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  };

  // ────────────────────────────────────────────────────────────────────────────
  // 1) Load ICHI list (by ICD only) and ICF→Category map (from your grouped API)
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    setRows([]);
    setSelected(new Set());
    setModsSelected(new Set());
    setNote("");
    setActiveCat("");
    setMsg("");
    onSummaryChange?.({ selected: [], modalities: [], note: "" });

    if (!icdCode) { setMsg("Pick an ICD first."); return; }

    (async () => {
      try {
        setBusy(true);

        // ICHI list for this ICD (grouped by ICF → flatten)
        const dataIchi = await getJSON(`${API}/map/icdcode-to-ichi/${encodeURIComponent(icdCode)}`);
        const flat = [];
        Object.entries(dataIchi.by_icf || {}).forEach(([icf, arr]) => {
          (arr || []).forEach(x => flat.push({ icf_code: icf, ichi_code: x.ichi_code, ichi_name: x.ichi_name }));
        });
        setRows(flat);


        // ICF → Category mapping (no heuristics, use DB categories)
        const dataCats = await getJSON(`${API}/map/icdcode-to-icf/${encodeURIComponent(icdCode)}/grouped`);
        const g = dataCats.groups || {};
        const map = {};
        
        // 🔹 Filter to include only Neurophysics/Neuropsych
        const allowedCategories = ["Neurophysics", "Neuropsych"];
        
        Object.entries(g).forEach(([category, arr]) => {
          if (allowedCategories.includes(category)) {
            (arr || []).forEach(p => { map[p.icf_code] = category; });
          }
        });
        setCatMap(map);

        if (flat.length === 0) setMsg("No ICHI mapped for this ICD.");
      } catch (e) {
        setMsg(`Failed to load ICHI / ICF categories: ${e.message}`);
      } finally {
        setBusy(false);
      }
    })();
  }, [icdCode]);

  // ──────────────────────────────────────
  // 2) Load modalities once (or per ICD)
  // ──────────────────────────────────────
  useEffect(() => {
    setModsOptions([]); setModsSelected(new Set());
    (async () => {
      try {
        const opts = await getJSON(`${API}/modalities`);
        setModsOptions(opts || []);
      } catch (e) {
        setMsg(m => (m ? m + " | " : "") + `Failed to load modalities: ${e.message || e}`);
      }
    })();
  }, [API]);

  // ──────────────────────────────────────────────────────────────
  // 3) Build per-category options (only categories with options)
  // ──────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────
  // 3) Build per-category options (only categories with options)
  // ──────────────────────────────────────────────────────────────
  const optsByCat = useMemo(() => {
    const buckets = {};
    const allowedCategories = ["Neurophysics", "Neuropsych"];
    
    rows.forEach(r => {
      const cat = catMap[r.icf_code];
      // 🔹 Skip if category is not in allowed list
      if (!cat || !allowedCategories.includes(cat)) return;
      
      const value = `${r.icf_code}::${r.ichi_code}`;
      const label = `${r.ichi_code} — ${r.ichi_name}  [${r.icf_code}]`;
      if (!buckets[cat]) buckets[cat] = new Map();
      if (!buckets[cat].has(value)) buckets[cat].set(value, { value, label });
    });

    const out = {};
    Object.entries(buckets).forEach(([k, m]) => {
      out[k] = Array.from(m.values()).sort((a,b)=>a.value.localeCompare(b.value));
    });
    return out;
  }, [rows, catMap]);

  // Order tabs: your preferred first, then alpha for any others present
  const catOrder = ["Neuropsych", "PT", "OT", "Other"];
  const tabKeys = useMemo(() => {
    const keys = Object.keys(optsByCat);
    return keys.sort((a,b) =>
      ((catOrder.indexOf(a) === -1 ? 99 : catOrder.indexOf(a)) -
       (catOrder.indexOf(b) === -1 ? 99 : catOrder.indexOf(b))) || a.localeCompare(b)
    );
  }, [optsByCat]);

  // Keep active tab valid
  useEffect(() => {
    if (!tabKeys.length) { setActiveCat(""); return; }
    setActiveCat(prev => (tabKeys.includes(prev) ? prev : tabKeys[0]));
  }, [tabKeys]);

  const msOptions = useMemo(
    () => (activeCat ? (optsByCat[activeCat] || []) : []),
    [activeCat, optsByCat]
  );

  // ────────────────────────────────────────────
  // 4) Emit summary when selections / note change
  // ────────────────────────────────────────────
useEffect(() => {
  const sel = rows
    .filter(r => selected.has(`${r.icf_code}::${r.ichi_code}`))
    .map(r => ({ icf_code: r.icf_code, ichi_code: r.ichi_code, ichi_name: r.ichi_name }));

  const mods = Array.from(modsSelected).map(v => {
    const o = modsOptions.find(x => x.value === v);
    const rangeId = rangeSelByMod[v] ?? null;
    const durId   = durSelByMod[v]   ?? null;
    const rangeLabel = rangeOpts.find(x => x.value === rangeId)?.label ?? "";
    const durLabel   = durationOpts.find(x => x.value === durId)?.label ?? "";
    return {
      value: v,
      label: o?.label ?? v,
      range_id: rangeId,
      range_label: rangeLabel,
      duration_id: durId,
      duration_label: durLabel
    };
  });

  // If your linter chokes on func?.(args), use the fallback below.
  if (typeof onSummaryChange === "function") {
    onSummaryChange({
      selected: sel,
      modalities: mods,
      note,
      assessments: assessSummary
    });
  }
}, [
  rows,
  selected,
  modsSelected,
  note,
  modsOptions,
  assessSummary,
  onSummaryChange,
  rangeSelByMod,
  durSelByMod,
  rangeOpts,
  durationOpts
]);

useEffect(() => {
  (async () => {
    try {
      const r = await getJSON(`${API}/treatment/ranges`);
      const d = await getJSON(`${API}/treatment/durations`);
      setRangeOpts(r || []);
      setDurationOpts(d || []);
    } catch (e) {
      setMsg(m => (m? m+" | " : "") + `Failed to load treatment lookups: ${e.message}`);
    }
  })();
}, [API]);
useEffect(() => {
  const ids = new Set(Array.from(modsSelected)); // modality_id strings
  setRangeSelByMod(prev => {
    const n = {...prev}; Object.keys(n).forEach(k => { if (!ids.has(k)) delete n[k]; }); return n;
  });
  setDurSelByMod(prev => {
    const n = {...prev}; Object.keys(n).forEach(k => { if (!ids.has(k)) delete n[k]; }); return n;
  });
}, [modsSelected]);


  // helpers
  const onNoteChange = (e) => setNote(e.target.value.slice(0, NOTE_MAX));
  const removeIchiChip = (val) => { const n = new Set(selected); n.delete(val); setSelected(n); };
  const removeModChip  = (val) => { const n = new Set(modsSelected); n.delete(val); setModsSelected(n); };

  return (
    <section className="card">
      {/* Header */}
            {/* Tabs */}
      {tabKeys.length > 0 ? (
        <div style={{display:"flex", gap:8, marginBottom:10, flexWrap:"wrap",backgroundColor:"#EEF6FF"}}>
          {tabKeys.map(k => (
            <button
              key={k}
              className={`btn ${activeCat===k ? "active" : ""}`}
              onClick={()=>setActiveCat(k)}
              disabled={busy}
            >
              {k} ({optsByCat[k]?.length || 0})
            </button>
          ))}
        </div>
      ) : (
        <div className="muted">No ICHI options available for this ICD.</div>
      )}
      <div className="cardheading">
      <div className="card-head">
        <h2 className="title">ICHI</h2>
        <button className="btn ai" title="AI mode (coming soon)" disabled>AI mode</button>
      </div>

      <p className="subtitle">
        ICD: <strong>{icdCode || "—"}</strong>
        {" · "}
        ICF (context): <strong>{icfCode || "— all relevant ICFs —"}</strong>
      </p>
</div>
      {msg && <div className="note">{msg}</div>}



      {/* Active tab's dropdown */}
      {activeCat && (
        <div className="row" style={{alignItems:"center"}}>
          <div className="label">ICHI — {activeCat}</div>
          <div>
            <MultiSelect
              options={msOptions}
              selected={selected}
              onChange={setSelected}
              placeholder={busy ? "Loading…" : `Select ${activeCat} ICHI…`}
              width={560}
            />
          </div>
        </div>
      )}

      {/* Selected ICHI chips */}
      {selected.size > 0 && (
        <div style={{display:"flex", gap:6, flexWrap:"wrap", margin:"8px 30px 6px"}}>
          {Array.from(selected).map(v => (
            <span key={v} className="chip">
              {v.split("::")[1]}
              <button className="chip-x" onClick={() => removeIchiChip(v)}>×</button>
            </span>
          ))}
          <button className="btn" onClick={()=>setSelected(new Set())}>Clear All</button>
        </div>
      )}
{/* NEW: Assessments driven by selected ICHI */}
<AssessmentsPanel
  apiBase={API}
  selectedIchiCodes={Array.from(selected).map(v => v.split("::")[1])}
  onSummaryChange={setAssessSummary}
/>
      {/* Modalities */}
      <div className="row" style={{alignItems:"center", marginTop: 8}}>
        <div className="label" style={{fontWeight:600}}>Pick Modalities</div>
        <div>
          <MultiSelect
            options={modsOptions}
            selected={modsSelected}
            onChange={setModsSelected}
            placeholder="Select Modalities…"
            width={560}
          />
        </div>
      </div>

      {/* Modalities chips */}
      {modsSelected.size > 0 && (
        <div style={{display:"flex", gap:6, flexWrap:"wrap", margin:"6px 0 6px",paddingLeft:"30px"}}>
          {Array.from(modsSelected).map(v => {
            const o = modsOptions.find(x => x.value === v);
            return (
              <span key={v} className="chip">
                {o?.label || v}
                <button className="chip-x" onClick={() => removeModChip(v)}>×</button>
              </span>
            );
          })}
          <button className="btn" onClick={()=>setModsSelected(new Set())}>Clear</button>
        </div>
      )}
{modsSelected.size > 0 && (
  <div className="box" style={{marginTop:8,paddingLeft:"30px",width:"50%",paddingBottom:40}}>
    <div className="box-title" style={{fontWeight:600}}>Treatment plan per modality</div>
    <div style={{display:"grid", gridTemplateColumns:"1fr 220px 240px", gap:8, alignItems:"center" , paddingTop:"20px"}}>
      <div className="label" style={{fontSize:14}}>Modality</div>
      <div className="label" style={{fontSize:14}}>Treatment Range</div>
      <div className="label" style={{fontSize:14}}>Treatment Duration</div>

      {Array.from(modsSelected).map(mid => {
        const m = modsOptions.find(x => x.value === mid);
        return (
          <React.Fragment key={mid}>
            <div><span className="badge">{mid}</span> {m?.label || mid}</div>

            <select className="input"
              value={rangeSelByMod[mid] ?? ""}
              onChange={e => setRangeSelByMod(s=>({...s, [mid]: e.target.value? Number(e.target.value): undefined}))}>
              <option value="">— Select —</option>
              {rangeOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            <select className="input"
              value={durSelByMod[mid] ?? ""}
              onChange={e => setDurSelByMod(s=>({...s, [mid]: e.target.value? Number(e.target.value): undefined}))}>
              <option value="">— Select —</option>
              {durationOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </React.Fragment>
        );
      })}
    </div>
  </div>
)}

      {/* Notes */}
      <div className="row" style={{alignItems:"flex-start"}}>
        <div className="label" style={{fontWeight:600}}>Clinical Note / Plan</div>
        <div>
          <textarea
            className="input ta"
            rows={5}
            placeholder="Write Notes, Rationale, Plan, or Observations…"
            value={note}
            onChange={onNoteChange}
            maxLength={NOTE_MAX}
            style={{minWidth: "560px"}}
          />
          <div className="hint">{note.length}/{NOTE_MAX}</div>
        </div>
      </div>

      {/* Optional compact list of selected ICHI */}
      {selected.size > 0 && (
        <ul className="flat" style={{marginTop:8}}>
          {rows
            .filter(r => selected.has(`${r.icf_code}::${r.ichi_code}`))
            .map((r, i) => (
              <li key={`${r.icf_code}-${r.ichi_code}-${i}`}>
                <strong>{r.ichi_code}</strong> — {r.ichi_name} <span className="dim">[{r.icf_code}]</span>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}

export default ICHITab;
