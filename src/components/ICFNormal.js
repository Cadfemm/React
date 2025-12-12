import React, { useState, useEffect } from "react";
import axios from "axios";
 
const API = "http://127.0.0.1:5000"; // backend base URL
 
const api = axios.create({
  baseURL: API,
});
 
function ICFNormal({ icdCode, onSummaryChange, onSelectICF }) {
  const [groups, setGroups] = useState({});
  const [active, setActive] = useState("");
  const [childOpts, setChildOpts] = useState({}); // { 'b730': [ {key,label} ] }
  const [childSel, setChildSel]   = useState({}); // { 'b730': 'b7300' }
  const [qualOpts, setQualOpts]   = useState({}); // { 'b7300': [ {key,label,range,name} ] }
  const [qualSel, setQualSel]     = useState({}); // { 'b7300': 'qm1' }
  const [scoreSel, setScoreSel]   = useState({}); // { 'b7300|qm1': 7 }
  const [busy, setBusy] = useState(false);
  const [msg, setMsg]   = useState("");
 
  const order = ["PT","OT","Neuropsych","Other","Uncategorized"];
  const getJSON = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); };
 
  // Parse "0-4", "005-24", "25-49", "96-100" → [0..4], [5..24], etc.
  const rangeToNumbers = (rangeStr) => {
    if (!rangeStr) return []; // e.g., qm8/qm9 → hide
    const s = (rangeStr || "").trim().replace(/^0+/, (m)=> (m==="0" ? "0" : "")); // keep a single 0; strip other leading zeros
    const m = s.match(/^(\d+)\s*-\s*(\d+)$/);
    if (!m) return [];
    const lo = parseInt(m[1],10);
    const hi = parseInt(m[2],10);
    if (isNaN(lo) || isNaN(hi) || lo>hi) return [];
    const out = [];
    for (let n=lo;n<=hi;n++) out.push(n);
    return out;
  };
 
  // Load grouped parent ICFs
  useEffect(() => {
    setGroups({}); setActive("");
    setChildOpts({}); setChildSel({});
    setQualOpts({}); setQualSel({});
    setScoreSel({});
    setMsg("");
    onSummaryChange?.([]);  // reset summary
    onSelectICF?.("");      // reset ICF context for ICHI
    if (!icdCode) { setMsg("Pick an ICD first in the ICD tab."); return; }
 
    (async () => {
      try {
        setBusy(true);
        const d = await getJSON(`${API}/map/icdcode-to-icf/${encodeURIComponent(icdCode)}/grouped`);
        const g = d.groups || {};
        const keys = Object.keys(g).sort((a,b) =>
          (order.indexOf(a)===-1?99:order.indexOf(b)===-1?99:order.indexOf(a)-order.indexOf(b)) || a.localeCompare(b)
        );
        setGroups(g);
        setActive(keys[0] || "");
      } catch (e) { setMsg(`Failed to load ICF: ${e.message}`); }
      finally { setBusy(false); }
    })();
  }, [icdCode]);
 
  const loadChildren = async (parentCode) => {
    if (childOpts[parentCode]) return;
    try {
      const rows = await getJSON(`${API}/icf/children/${encodeURIComponent(parentCode)}`);
      setChildOpts(prev => ({...prev, [parentCode]: rows}));
    } catch (e) { setMsg(`Failed to load child ICFs for ${parentCode}: ${e.message}`); }
  };
 
  const chooseChild = async (parentCode, childCode) => {
    setChildSel(prev => ({...prev, [parentCode]: childCode}));
    onSelectICF?.(childCode || "");  // keep single selected ICF context for ICHI tab
 
    // Reset any qualifier/score tied to this child
    setQualSel(prev => ({...prev, [childCode]: ""}));
    const updatedScores = {...scoreSel};
    Object.keys(updatedScores).forEach(k => { if (k.startsWith(childCode + "|")) delete updatedScores[k]; });
    setScoreSel(updatedScores);
 
    if (!childCode) { emitSummary(); return; }
 
    try {
      const rows = await getJSON(`${API}/icf/qualifiers/${encodeURIComponent(childCode)}`);
      setQualOpts(prev => ({...prev, [childCode]: rows}));
      setQualSel(prev => ({...prev, [childCode]: rows[0]?.key || ""}));
      // also set an initial score if that first qualifier has a valid range
      const firstRange = rows[0]?.range || "";
      const nums = rangeToNumbers(firstRange);
      if (nums.length) setScoreSel(s => ({...s, [childCode + "|" + (rows[0].key)]: nums[0]}));
    } catch (e) { setMsg(`Failed to load qualifiers for ${childCode}: ${e.message}`); }
  };
 
  const chooseQualifier = (childCode, qualId, qualRange) => {
    setQualSel(prev => ({...prev, [childCode]: qualId}));
    // reset score for this (child|qual) pair
    const key = `${childCode}|${qualId}`;
    const nums = rangeToNumbers(qualRange);
    setScoreSel(prev => {
      const clone = {...prev};
      // remove any scores belonging to this child but a previous qualifier
      Object.keys(clone).forEach(k => { if (k.startsWith(childCode + "|")) delete clone[k]; });
      if (nums.length) clone[key] = nums[0]; // default to first
      return clone;
    });
  };
 
  // Build & emit normalized summary whenever driving states change
  useEffect(() => { emitSummary(); }, [groups, childOpts, childSel, qualOpts, qualSel, scoreSel]);
 
  const emitSummary = () => {
    const out = [];
    Object.values(groups).flat().forEach(parent => {
      const parent_icf = parent.icf_code;
      const parent_name = parent.name;
      const childCode = childSel[parent_icf] || "";
      if (!childCode) return; // only include if doctor picked a child
 
      const childLabel = (childOpts[parent_icf]||[]).find(x => x.key === childCode)?.label || childCode;
 
      const qid = qualSel[childCode] || "";
      const qrec = (qualOpts[childCode]||[]).find(x => x.key === qid);
      const qualifier_label = qrec?.label || qid;
      const range = qrec?.range || "";
      const score = scoreSel[`${childCode}|${qid}`];
 
      out.push({
        parent_icf, parent_name,
        child_icf: childCode, child_name: childLabel,
        qualifier_id: qid, qualifier_label, range, score
      });
    });
    onSummaryChange?.(out);
  };
 
  const keys = Object.keys(groups).sort((a,b) =>
    (order.indexOf(a)===-1?99:order.indexOf(b)===-1?99:order.indexOf(a)-order.indexOf(b)) || a.localeCompare(b)
  );
 
  return (
    <section className="card">
            <div className="buttonbar"style={{display:"flex", gap:8, marginBottom:12, flexWrap:"wrap"}}>
        {keys.map(k => (
          <button key={k} className={`btn ${active===k?"active":""}`} onClick={()=>setActive(k)} disabled={busy}>
            {k} ({groups[k]?.length||0})
          </button>
        ))}
      </div>
      <div className="cardheading"><h2 className="title">ICF</h2>
      <p className="subtitle">ICD selected: <strong>{icdCode || "—"}</strong></p>
 </div>

 
      {msg && <div className="note">{msg}</div>}
 
      {(groups[active]||[]).map(p => {
        const parentCode = p.icf_code;
        const childList  = childOpts[parentCode] || [];
        const chosenChild= childSel[parentCode] || "";
        const rangeList  = chosenChild ? (qualOpts[chosenChild] || []) : [];
        const chosenQual = chosenChild ? (qualSel[chosenChild] || "") : "";
 
        const selectedRangeObj = rangeList.find(r => r.key === chosenQual);
        const selectedRangeStr = selectedRangeObj?.range || "";
        const nums = (() => {
          if (!selectedRangeStr) return [];
          const m = selectedRangeStr.match(/^(\d+)\s*-\s*(\d+)$/);
          if (!m) return [];
          const lo = parseInt(m[1],10), hi=parseInt(m[2],10);
          return Array.from({length:(hi-lo+1)}, (_,i)=>lo+i);
        })();
        const scoreKey = `${chosenChild}|${chosenQual}`;
        const chosenScore = scoreSel[scoreKey] ?? "";
 
        return (
          <div key={parentCode} className="row" style={{alignItems:"center"}}>
            <div className="label">{parentCode} — {p.name}</div>
            <div style={{display:"flex", gap:8, flexWrap:"wrap", alignItems:"center"}}>
              {/* Child ICF dropdown */}
              <select className="input"
                      onFocus={()=>loadChildren(parentCode)}
                      value={chosenChild}
                      onChange={e=>chooseChild(parentCode, e.target.value)}
                      style={{minWidth:280}}>
                <option value="">{childList.length ? "— Choose Child ICF —" : "— Loading / None —"}</option>
                {childList.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
 
              {/* Range dropdown */}
              <select className="input" disabled={!chosenChild || !rangeList.length}
                      value={chosenQual}
                      onChange={e=>{
                        const newQual = e.target.value;
                        const ro = rangeList.find(r => r.key === newQual);
                        chooseQualifier(chosenChild, newQual, ro?.range || "");
                      }}
                      style={{minWidth:280}}>
                <option value="">{rangeList.length ? "— Choose Range —" : "— No Ranges —"}</option>
                {rangeList.map(r => (
                  <option key={r.key} value={r.key}>
                    {r.label}{r.range ? ` (${r.range})` : ""}
                  </option>
                ))}
              </select>
 
              {/* Number dropdown: only when range is valid (hide for qm8/qm9) */}
              {nums.length > 0 && (
                <>
                  <div className="pill">Range: <strong>{selectedRangeStr}</strong></div>
                  <select className="input" value={chosenScore}
                          onChange={e=>setScoreSel(prev=>({...prev, [scoreKey]: Number(e.target.value)}))}
                          style={{minWidth:120}}>
                    {nums.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
 
export default ICFNormal;