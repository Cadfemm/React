import { useEffect, useMemo, useState } from "react";
import * as React from "react";
import Select from "react-select";


 
/* If CRA proxy set to http://127.0.0.1:5000 keep API="". Otherwise set REACT_APP_API. */
const API = process.env.REACT_APP_API || "";
 
export default function App() {
  const [tab, setTab] = useState("ICD");        // "PERSONAL" | "ICD" | "ICF" | "ICHI" | "SUMMARY"
  const [icdCode, setIcdCode] = useState("");   // deepest ICD from ICD tab
  const [icdPath, setIcdPath] = useState([]);   // [{ depth, table, key, label }]
  const [icfCode, setIcfCode] = useState("");   // optional single ICF child context for ICHI
 
  // Patient controlled form state in App (for summary & persistence)
  const [patient, setPatient] = useState({
    patient_id: "",
    patient_name: "",
    reg_day: "", reg_month: "", reg_year: "",
    dob_day: "", dob_month: "", dob_year: "",
    gender: "", marital: "", nationality: "", occupation: ""
  });
 
  // Summaries emitted from sub-tabs
  const [icfSummary, setIcfSummary]   = useState([]); // array of normalized records
  const [ichiSummary, setIchiSummary] = useState({ selected: [], modalities: [], note: "" });
 
  return (
    <>
      <StyleBlock />
      <div className="page">
        {/* Left rail */}
        <aside className="rail">
          <div className="brand">CADFEM • SV</div>
          <nav className="tabs">
            <button className={`tab ${tab==="PERSONAL"?"active":""}`} onClick={()=>setTab("PERSONAL")}>Personal details</button>
            <button className={`tab ${tab==="ICD"?"active":""}`} onClick={()=>setTab("ICD")}>ICD</button>
            <button className={`tab ${tab==="ICF"?"active":""}`} onClick={()=>setTab("ICF")} disabled={!icdCode}>ICF</button>
            <button className={`tab ${tab==="ICHI"?"active":""}`} onClick={()=>setTab("ICHI")} disabled={!icdCode}>ICHI</button>
            <button className={`tab ${tab==="SUMMARY"?"active":""}`} onClick={()=>setTab("SUMMARY")}>Patient summary</button>
          </nav>
        </aside>
 
        {/* Main area */}
        <main className="main">
          {/* PERSONAL */}
          <section style={{display: tab==="PERSONAL" ? "block" : "none"}}>
            <PersonalDetailsForm value={patient} onChange={setPatient} />
          </section>
 
          {/* ICD */}
          <section style={{display: tab==="ICD" ? "block" : "none"}}>
            <ICDInfinite
              onDeepestICDChange={(code) => { setIcdCode(code); setIcfCode(""); }}
              onPathChange={setIcdPath}
            />
          </section>
 
          {/* ICF */}
          <section style={{display: tab==="ICF" ? "block" : "none"}}>
            <ICFTab
              icdCode={icdCode}
              onSummaryChange={setIcfSummary}
              onSelectICF={setIcfCode}   // keep a single ICF child context for ICHI (optional)
            />
          </section>
 
          {/* ICHI */}
          <section style={{display: tab==="ICHI" ? "block" : "none"}}>
            <ICHITab
              icdCode={icdCode}
              icfCode={icfCode}
              onSummaryChange={setIchiSummary}
            />
          </section>
 
          {/* SUMMARY */}
          <section style={{display: tab==="SUMMARY" ? "block" : "none"}}>
            <PatientSummary
              patient={patient}
              icdPath={icdPath}
              icdCode={icdCode}
              icfSummary={icfSummary}
              ichiSummary={ichiSummary}
            />
          </section>
        </main>
      </div>
    </>
  );
}
 
/* ---------------- ICD CASCADE (N-level) ---------------- */
function ICDInfinite({ onDeepestICDChange, onPathChange }) {
  const [levels, setLevels] = useState([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
 
  const getJSON = async (url) => {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  };
 
  useEffect(() => {
    (async () => {
      try {
        setBusy(true); setMsg("");
        const data = await getJSON(`${API}/nsd`);
        setLevels([[
          { table:"nervous_system_diseases", label:"Nervous system", options:data, value:"", parentKey:null }
        ]]);
        onDeepestICDChange?.("");
        onPathChange?.([]);
      } catch (e) { setMsg(`Failed to load NSD: ${e.message}`); }
      finally { setBusy(false); }
    })();
  }, []);
 
  const deepestSelected = (lvls) => {
    for (let d = lvls.length - 1; d >= 0; d--) {
      for (let i = lvls[d].length - 1; i >= 0; i--) if (lvls[d][i].value) return lvls[d][i].value;
    }
    return "";
  };
 
  const computePath = (lvls) => {
    // path := list of selected sets with table, key, label
    const out = [];
    lvls.forEach((row, depth) => {
      row.forEach((set) => {
        if (set.value) {
          const opt = set.options.find(o => o.key === set.value);
          out.push({ depth, table: set.table, key: set.value, label: opt?.label || set.value });
        }
      });
    });
    return out;
  };
 
  const onPick = async (depth, idx, value) => {
    setLevels(prev => {
      const clone = prev.map(row => row.map(s => ({...s})));
      clone[depth][idx].value = value;
      const trimmed = clone.slice(0, depth + 1);
      const code = deepestSelected(trimmed);
      onDeepestICDChange?.(code);
      onPathChange?.(computePath(trimmed));
      return trimmed;
    });
    if (!value) return;
 
    try {
      setBusy(true); setMsg("");
      const parent = levels[depth][idx];
      const children = await getJSON(`${API}/tree/children/${encodeURIComponent(parent.table)}/${encodeURIComponent(value)}`);
      if (!children.length) return;
 
      const nextTable = children[0].table || parent.table;
      const nextRow = [{
        table: nextTable,
        label: `Level ${depth + 2}`,
        options: children.map(c => ({ key: c.key, label: c.label, table: c.table })),
        value: "",
        parentKey: value
      }];
      setLevels(prev => {
        const merged = [...prev.slice(0, depth + 1), nextRow];
        onDeepestICDChange?.(deepestSelected(merged));
        onPathChange?.(computePath(merged));
        return merged;
      });
    } catch (e) { setMsg(`Failed to load children: ${e.message}`); }
    finally { setBusy(false); }
  };
 
  return (
    <section className="card">
      <h2 className="title">ICD Cascade (N-level)</h2>
      {levels.map((row, depth) => (
        <div key={depth} className="row">
          <div className="label">{row[0]?.label || `Level ${depth+1}`}</div>
          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            {row.map((set, i) => (
              <select key={`${depth}-${i}`} className="input" value={set.value}
                      onChange={e=>onPick(depth,i,e.target.value)}>
                <option value="">{`— select from ${(set.label||`level ${depth+1}`).toLowerCase()} —`}</option>
                {set.options.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
              </select>
            ))}
          </div>
        </div>
      ))}
      {msg && <div className="note">{msg}</div>}
    </section>
  );
}
 
/* ---------------- ICF Tab: parent ICF -> child ICF -> ranges ---------------- */
function ICFTab({ icdCode, onSummaryChange, onSelectICF }) {
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
      <h2 className="title">ICF</h2>
      <p className="subtitle">ICD selected: <strong>{icdCode || "—"}</strong></p>
 
      <div style={{display:"flex", gap:8, marginBottom:12, flexWrap:"wrap"}}>
        {keys.map(k => (
          <button key={k} className={`btn ${active===k?"active":""}`} onClick={()=>setActive(k)} disabled={busy}>
            {k} ({groups[k]?.length||0})
          </button>
        ))}
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
                <option value="">{childList.length ? "— choose child ICF —" : "— loading / none —"}</option>
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
                <option value="">{rangeList.length ? "— choose range —" : "— no ranges —"}</option>
                {rangeList.map(r => (
                  <option key={r.key} value={r.key}>
                    {r.label}{r.range ? ` (${r.range})` : ""}
                  </option>
                ))}
              </select>
 
              {/* Number dropdown: only when range is valid (hide for qm8/qm9) */}
              {nums.length > 0 && (
                <>
                  <div className="pill">range: <strong>{selectedRangeStr}</strong></div>
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
 
/* ---------------- ICHI Tab: multi-select, modalities, note ---------------- */



// ICHI → Assessment mapping
const ICHI_TO_ASSESS = {
  "MUB.AA.ZZ": "MMT",
  "MUC.AA.ZZ": "MMT",
  "MUD.AA.ZZ": "MMT",
  "MU2.AA.ZZ": "MMT",
};

// Assessment → Inputs
const ASSESS_INPUTS = {
  "MMT": [
    "Right Upper Limb",
    "Right Lower Limb",
    "Left Upper Limb",
    "Left Lower Limb",
  ],
};
// Fixed treatment ranges
const TREATMENT_RANGE = [
  "1 week",
  "10 days",
  "15 days",
  "25 days",
  "30 days",
  "45 days",
];

// { modalityValue: "1 week" | "10 days" | ... }



// Allowed scores
const SCORE_CHOICES = [0, 1, 2, 3, 4, 5];

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

  // active tab/category
  const [activeCat, setActiveCat] = useState("");
// Per-assessment selected inputs: { MMT: ['Right Upper Limb', ...] }
const [assessInputsSel, setAssessInputsSel] = useState({});

// Per-assessment scores: { MMT: { 'Right Upper Limb': 3, 'Left Lower Limb': 5 } }
const [assessScores, setAssessScores] = useState({});
const [treatRange, setTreatRange] = useState({});
const distinctAssessments = useMemo(() => {
  const codes = Array.from(selected).map(v => v.split("::")[1]);  // get ICHI code
  const names = codes.map(c => ICHI_TO_ASSESS[c]).filter(Boolean);
  return Array.from(new Set(names)); // dedupe
}, [selected]);
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
        Object.entries(g).forEach(([category, arr]) => {
          (arr || []).forEach(p => { map[p.icf_code] = (category || "Other"); });
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
useEffect(() => {
  // remove assessment state for assessments no longer implied by selection
  setAssessInputsSel(prev => {
    const next = {};
    distinctAssessments.forEach(a => { next[a] = prev[a] || []; });
    return next;
  });
  setAssessScores(prev => {
    const next = {};
    distinctAssessments.forEach(a => { next[a] = prev[a] || {}; });
    return next;
  });
}, [distinctAssessments]);

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
// prune treatment selections when modalities are unselected
useEffect(() => {
  setTreatRange(prev => {
    const next = {};
    for (const v of Array.from(modsSelected)) {
      if (prev[v]) next[v] = prev[v];
    }
    return next;
  });
}, [modsSelected]);

  // ──────────────────────────────────────────────────────────────
  // 3) Build per-category options (only categories with options)
  // ──────────────────────────────────────────────────────────────
  const optsByCat = useMemo(() => {
    const buckets = {};
    rows.forEach(r => {
      const cat = catMap[r.icf_code] || "Other";
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
    return { value: v, label: o?.label || v };
  });

  const assessments = distinctAssessments.map(aName => ({
    assessment: aName,
    inputs: (assessInputsSel[aName] || []).map(inp => ({
      name: inp,
      score: (assessScores[aName] || {})[inp] ?? null,
    })),
  }));

  // build treatment plan
  const treatment_plan = Array.from(modsSelected).map(v => {
    const o = modsOptions.find(x => x.value === v);
    return {
      modality_value: v,
      modality_label: o?.label || v,
      range: treatRange[v] || null,  // e.g., "10 days"
    };
  });

  onSummaryChange?.({ selected: sel, modalities: mods, note, assessments, treatment_plan });
}, [
  rows, selected, modsSelected, note, modsOptions,
  distinctAssessments, assessInputsSel, assessScores, treatRange, onSummaryChange
]);



  // helpers
  const onNoteChange = (e) => setNote(e.target.value.slice(0, NOTE_MAX));
  const removeIchiChip = (val) => { const n = new Set(selected); n.delete(val); setSelected(n); };
  const removeModChip  = (val) => { const n = new Set(modsSelected); n.delete(val); setModsSelected(n); };

  return (
    <section className="card">
      {/* Header */}
      <div className="card-head">
        <h2 className="title">ICHI</h2>
        <button className="btn ai" title="AI mode (coming soon)" disabled>AI mode</button>
      </div>

      <p className="subtitle">
        ICD: <strong>{icdCode || "—"}</strong>
        {" · "}
        ICF (context): <strong>{icfCode || "— all relevant ICFs —"}</strong>
      </p>

      {msg && <div className="note">{msg}</div>}

      {/* Tabs */}
      {tabKeys.length > 0 ? (
        <div style={{display:"flex", gap:8, marginBottom:10, flexWrap:"wrap"}}>
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
        <div style={{display:"flex", gap:6, flexWrap:"wrap", margin:"8px 0 6px"}}>
          {Array.from(selected).map(v => (
            <span key={v} className="chip">
              {v.split("::")[1]}
              <button className="chip-x" onClick={() => removeIchiChip(v)}>×</button>
            </span>
          ))}
          <button className="btn" onClick={()=>setSelected(new Set())}>Clear all</button>
        </div>
      )}
{/* Assessment inputs (checkbox multiselect) */}
{distinctAssessments.length > 0 && (
  <div style={{ marginTop: 12 }}>
    <h4 style={{ margin: "8px 0 10px" , textAlign:"left"}}>Assessments</h4>

    {distinctAssessments.map((aName) => {
      // Local vars are defined INSIDE the map, so eslint sees them.
      const inputs = ASSESS_INPUTS[aName] || [];
      const chosen = assessInputsSel[aName] || [];
      const scores = assessScores[aName] || {};

      const onChangeInputs = (vals) => {
        const newVals = (vals || []).map(v => v.value);

        // update chosen inputs for this assessment
        setAssessInputsSel(prev => ({ ...prev, [aName]: newVals }));

        // drop scores that no longer have a selected input
        setAssessScores(prev => {
          const next = { ...(prev[aName] || {}) };
          Object.keys(next).forEach(k => { if (!newVals.includes(k)) delete next[k]; });
          return { ...prev, [aName]: next };
        });
      };

      const onChangeScore = (inp, val) => {
        setAssessScores(prev => ({
          ...prev,
          [aName]: { ...(prev[aName] || {}), [inp]: (val === "" ? null : Number(val)) }
        }));
      };

      return (
        <div
          key={aName}
          style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, marginBottom: 10 }}
        >
          <div style={{ fontWeight: 600, marginBottom: 8 }}>{aName}</div>

          <div className="row" style={{ alignItems: "center", gap: 10 }}>
            <div className="label" style={{ minWidth: 140 }}>Assessment inputs</div>

            <Select
              isMulti
              options={inputs.map(inp => ({ value: inp, label: inp }))}
              value={chosen.map(v => ({ value: v, label: v }))}
              onChange={onChangeInputs}
              classNamePrefix="rs"
              styles={{ container: base => ({ ...base, minWidth: 320 }) }}
              placeholder="Select assessment inputs…"
            />
          </div>

          {chosen.length > 0 && (
            <div style={{ marginTop: 10 , display: 'flex'}}>
              {chosen.map(inp => (
                <div key={inp} className="row" style={{ alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div className="label" style={{ minWidth: 140 }}>{inp} score</div>
                  <select
                    value={scores[inp] ?? ""}
                    onChange={(e) => onChangeScore(inp, e.target.value)}
                    className="input"
                    style={{ minWidth: 120 }}
                  >
                    <option value="">— select —</option>
                    {SCORE_CHOICES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    })}
  </div>
)}



      {/* Modalities */}
      <div className="row" style={{alignItems:"center", marginTop: 8}}>
        <div className="label">Pick Modalities</div>
        <div>
          <MultiSelect
            options={modsOptions}
            selected={modsSelected}
            onChange={setModsSelected}
            placeholder="Select modalities…"
            width={560}
          />
        </div>
      </div>

      {/* Modalities chips */}
      {modsSelected.size > 0 && (
        <div style={{display:"flex", gap:6, flexWrap:"wrap", margin:"6px 0 6px"}}>
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
{/* Treatment range per selected modality */}
{modsSelected.size > 0 && (
  <div style={{ marginTop: 10 , display: 'flex'}}>
    {Array.from(modsSelected).map(v => {
      const o = modsOptions.find(x => x.value === v);
      const label = o?.label || v;
      const value = treatRange[v] || null;

      return (
        <div key={v} className="row" style={{ alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div className="label" style={{ minWidth: 140 }}>
            {label} — Treatment range
          </div>
          <div style={{ minWidth: 260 }}>
            <Select
              isClearable
              options={TREATMENT_RANGE.map(s => ({ value: s, label: s }))}
              value={value ? { value, label: value } : null}
              onChange={(opt) => {
                setTreatRange(prev => ({ ...prev, [v]: opt?.value || null }));
              }}
              placeholder="Select treatment range…"
              classNamePrefix="rs"
            />
          </div>
        </div>
      );
    })}
  </div>
)}

      {/* Notes */}
      <div className="row" style={{alignItems:"flex-start"}}>
        <div className="label">Clinical note</div>
        <div>
          <textarea
            className="input ta"
            rows={5}
            placeholder="Write notes, rationale, plan, or observations…"
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







 
 
 
/* ---------------- Patient Summary ---------------- */
function PatientSummary({ patient, icdPath, icdCode, icfSummary, ichiSummary }) {
  const dob = (patient.dob_year && patient.dob_month && patient.dob_day)
    ? `${patient.dob_year}-${patient.dob_month}-${patient.dob_day}` : "";
 
  const reg = (patient.reg_year && patient.reg_month && patient.reg_day)
    ? `${patient.reg_year}-${patient.reg_month}-${patient.reg_day}` : "";
 
  const breadcrumb = icdPath.length
    ? icdPath.map(x => x.label).join("  ›  ")
    : (icdCode || "—");
 
  return (
    <section className="card">
      <div className="card-head">
        <h2 className="title">Patient summary</h2>
        <button className="btn ai" disabled title="AI mode (coming soon)">AI mode</button>
      </div>
      <p className="subtitle">A compact key sheet containing demographics and selections.</p>
 
      {/* Patient */}
      <div className="grid2">
        <div className="box">
          <div className="box-title">Patient details</div>
          <div className="kv"><span>Patient ID</span><strong>{patient.patient_id || "—"}</strong></div>
          <div className="kv"><span>Name</span><strong>{patient.patient_name || "—"}</strong></div>
          <div className="kv"><span>Register date</span><strong>{reg || "—"}</strong></div>
          <div className="kv"><span>Date of birth</span><strong>{dob || "—"}</strong></div>
          <div className="kv"><span>Gender</span><strong>{patient.gender || "—"}</strong></div>
          <div className="kv"><span>Marital status</span><strong>{patient.marital || "—"}</strong></div>
          <div className="kv"><span>Nationality</span><strong>{patient.nationality || "—"}</strong></div>
          <div className="kv"><span>Occupation</span><strong>{patient.occupation || "—"}</strong></div>
        </div>
 
        <div className="box">
          <div className="box-title">ICD</div>
          <div style={{whiteSpace:"pre-wrap"}}>{breadcrumb}</div>
        </div>
      </div>
 
      {/* ICF */}
      <div className="box" style={{marginTop:12}}>
        <div className="box-title">ICF selections</div>
        {icfSummary.length === 0 ? (
          <div className="muted">No ICF selection recorded.</div>
        ) : (
          <div className="icf-list">
            {icfSummary.map((x, i) => (
              <div className="icf-row" key={`${x.parent_icf}-${x.child_icf}-${i}`}>
                <div className="icf-head">
                  <span className="badge">{x.parent_icf}</span> {x.parent_name}
                </div>
                <div className="icf-sub">
                  <span className="badge soft">{x.child_icf}</span> {x.child_name}
                </div>
                {(x.range || x.qualifier_label) && (
                  <div className="icf-sub">
                    <span className="kv-inline"><b>Qualifier:</b> {x.qualifier_label || "—"}</span>
                    {x.range ? <span className="kv-inline"><b>Range:</b> {x.range}</span> : null}
                    {Number.isFinite(x.score) ? <span className="kv-inline"><b>Score:</b> {x.score}</span> : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
 
      {/* ICHI + Modalities */}
      <div className="grid2" style={{marginTop:12}}>
        <div className="box">
          <div className="box-title">ICHI actions</div>
          {(!ichiSummary.selected || ichiSummary.selected.length===0) ? (
            <div className="muted">No ICHI selected.</div>
          ) : (
            <ul className="flat">
              {ichiSummary.selected.map((r,i)=>(
                <li key={`${r.icf_code}-${r.ichi_code}-${i}`}>
                  <strong>{r.ichi_code}</strong> — {r.ichi_name} <span className="dim">[{r.icf_code}]</span>
                </li>
              ))}
            </ul>
          )}
        </div>
 
        <div className="box">
          <div className="box-title">Modalities</div>
          {(!ichiSummary.modalities || ichiSummary.modalities.length===0) ? (
            <div className="muted">No modalities selected.</div>
          ) : (
            <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
              {ichiSummary.modalities.map((m,i)=>(
                <span key={`${m.value}-${i}`} className="chip">{m.label}</span>
              ))}
            </div>
          )}
        </div>
      </div>
 
      {/* Notes */}
      <div className="box" style={{marginTop:12}}>
        <div className="box-title">Clinical note / plan</div>
        <div className="note-view">
          {ichiSummary.note ? ichiSummary.note : <span className="muted">No note provided.</span>}
        </div>
      </div>
    </section>
  );
}
 
/* ---------------- Personal details (New/Existing + Save + History) ---------------- */
function PersonalDetailsForm({ value, onChange }) {
  // controlled form = use the value passed from App and mutate via onChange
  const form = value;
  const set = (k, v) => onChange(prev => ({ ...prev, [k]: v }));
 
  const [userType, setUserType] = useState("New");     // "New" | "Existing"
  const [existingPick, setExistingPick] = useState(""); // selected existing patient_id
  const [history, setHistory] = useState([]);          // prior visits / improvements
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
 
  const days   = useMemo(() => Array.from({length:31}, (_,i)=>(`${i+1}`.padStart(2,"0"))), []);
  const months = useMemo(() => [
    {v:"01",n:"Jan"}, {v:"02",n:"Feb"}, {v:"03",n:"Mar"}, {v:"04",n:"Apr"},
    {v:"05",n:"May"}, {v:"06",n:"Jun"}, {v:"07",n:"Jul"}, {v:"08",n:"Aug"},
    {v:"09",n:"Sep"}, {v:"10",n:"Oct"}, {v:"11",n:"Nov"}, {v:"12",n:"Dec"},
  ], []);
  const years  = useMemo(() => { const y=new Date().getFullYear(); const a=[]; for(let i=y;i>=1900;i--) a.push(`${i}`); return a; }, []);
 
  const fmtDate = (d,m,y) => (d && m && y) ? `${y}-${m}-${d}` : "";
 
  // Load existing patient selection => fill demographics + history
  useEffect(() => {
    if (userType !== "Existing" || !existingPick) return;
    (async () => {
      try {
        setBusy(true); setMsg("");
        // Demographics
        const r1 = await fetch(`${API}/patients/${encodeURIComponent(existingPick)}`);
        if (!r1.ok) throw new Error(`HTTP ${r1.status}`);
        const p = await r1.json();
        set("patient_id", p.patient_id || "");
        set("patient_name", p.patient_name || "");
        if (p.date_of_birth) {
          const [Y,M,D] = p.date_of_birth.split("-");
          set("dob_year", Y || ""); set("dob_month", M || ""); set("dob_day", D || "");
        }
        if (p.date_register_otc) {
          const [RY,RM,RD] = p.date_register_otc.split("-");
          set("reg_year", RY || ""); set("reg_month", RM || ""); set("reg_day", RD || "");
        }
        set("gender", p.gender || "");
        set("marital", p.marital_status || "");
        set("nationality", p.nationality || "");
        set("occupation", p.occupation || "");
 
        // History
        const r2 = await fetch(`${API}/patients/${encodeURIComponent(existingPick)}/history`);
        const hist = r2.ok ? await r2.json() : [];
        setHistory(hist || []);
      } catch (e) {
        setMsg(`Failed to load patient: ${e.message}`);
      } finally { setBusy(false); }
    })();
  }, [userType, existingPick]);
 
  // Create or Update patient record
  const handleSave = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      setBusy(true);
      const payload = {
        patient_id: form.patient_id || null, // allow server to assign if null
        patient_name: (form.patient_name || "").trim(),
        date_register_otc: fmtDate(form.reg_day, form.reg_month, form.reg_year),
        date_of_birth:     fmtDate(form.dob_day,  form.dob_month,  form.dob_year),
        gender: form.gender || "",
        marital_status: form.marital || "",
        nationality: form.nationality || "",
        occupation: form.occupation || ""
      };
 
      let res;
      if (userType === "Existing" && form.patient_id) {
        // update
        res = await fetch(`${API}/patients/${encodeURIComponent(form.patient_id)}`, {
          method: "PUT", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload)
        });
      } else {
        // new
        res = await fetch(`${API}/patients`, {
          method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload)
        });
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const out = await res.json();
 
      // If backend generated an ID on POST, set it into form
      if (out.patient_id && out.created) set("patient_id", out.patient_id);
 
      setMsg(out.message || "Saved.");
    } catch (e) {
      setMsg(`Save failed: ${e.message}`);
    } finally {
      setBusy(false);
    }
  };
 
  return (
    <section className="card">
      <h2 className="title">Personal details</h2>
      <p className="subtitle">Demographics-style form. Supports New and Existing patients.</p>
 
      {/* User Type & Patient ID */}
      <div className="row">
        <div className="label">User type</div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <select className="input" value={userType} onChange={e=>{ setUserType(e.target.value); setExistingPick(""); }}>
            <option value="New">New user</option>
            <option value="Existing">Existing user</option>
          </select>
 
          {/* Patient ID (readonly if existing / assigned) */}
          <input className="input" style={{maxWidth:200}}
                 placeholder="Patient ID"
                 value={form.patient_id || ""}
                 onChange={e=>set("patient_id", e.target.value)}
                 readOnly={userType==="Existing"}
          />
        </div>
      </div>
 
      {/* Existing user: Async search box */}
      {userType === "Existing" && (
        <div className="row">
          <div className="label">Find patient</div>
          <div>
            <AsyncPatientSearch value={existingPick} onSelect={(pid)=>setExistingPick(pid)} />
            <div className="hint" style={{marginTop:6}}>Search by ID or name. Picking one will auto-fill the form and show history.</div>
          </div>
        </div>
      )}
 
      {/* Demographics */}
      <form onSubmit={handleSave} className="form">
        <Row label="Patient name" icon="👁️">
          <input className="input" placeholder="Enter full name"
                 value={form.patient_name || ""} onChange={e=>set("patient_name", e.target.value)} />
        </Row>
        <Row label="Date Register OTC"><DateTriple form={form} onChange={set} pfx="reg" days={days} months={months} years={years} /></Row>
        <Row label="Date of Birth"><DateTriple form={form} onChange={set} pfx="dob" days={days} months={months} years={years} /></Row>
 
        <Row label="Gender" icon="👁️">
          <select className="input" value={form.gender || ""} onChange={e=>set("gender", e.target.value)}>
            <option value="">— select gender —</option>
            <option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option>
          </select>
        </Row>
 
        <Row label="Marital Status" icon="👁️">
          <select className="input" value={form.marital || ""} onChange={e=>set("marital", e.target.value)}>
            <option value="">— select status —</option>
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
          <button className="btn" type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</button>
          {msg && <span className="hint" style={{marginLeft:10}}>{msg}</span>}
        </div>
      </form>
 
      {/* History for Existing user */}
      {userType === "Existing" && (
        <div className="box" style={{marginTop:12}}>
          <div className="box-title">Past visits / improvements</div>
          {history.length === 0 ? (
            <div className="muted">No prior records found.</div>
          ) : (
            <ul className="flat">
              {history.map((h, i)=>(
                <li key={i}>
                  <b>{h.date || h.timestamp || "—"}</b> — {h.summary || h.note || h.detail || "Entry"}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
 
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
    <div className="ms" style={{width: 420, position:"relative"}}>
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
 
/* ---------------- Reusable MultiSelect ---------------- */
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
              <button className="ms-mini" onClick={selectAllVisible} disabled={filtered.length===0 || allVisibleSelected}>Select all</button>
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
 
/* ---------------- Common Rows ---------------- */
function Row({label, children, icon}) {
  return (
    <div className="row">
      <div className="label">
        <div>{label}</div>
        {icon && <span className="icon" title="visibility">{icon}</span>}
      </div>
      <div>{children}</div>
    </div>
  );
}
function DateTriple({form, onChange, pfx, days, months, years}) {
  return (
    <div className="triple">
      <select className="input" value={form[`${pfx}_day`]} onChange={e=>onChange(`${pfx}_day`, e.target.value)}>
        <option value="">dd</option>{days.map(d=><option key={d} value={d}>{d}</option>)}
      </select>
      <select className="input" value={form[`${pfx}_month`]} onChange={e=>onChange(`${pfx}_month`, e.target.value)}>
        <option value="">mm</option>{months.map(m=><option key={m.v} value={m.v}>{m.n}</option>)}
      </select>
      <select className="input" value={form[`${pfx}_year`]} onChange={e=>onChange(`${pfx}_year`, e.target.value)}>
        <option value="">yyyy</option>{years.map(y=><option key={y} value={y}>{y}</option>)}
      </select>
      <span className="calendar" title="calendar">📅</span>
    </div>
  );
}
 
/* ---------------- Styles ---------------- */
function StyleBlock() {
  return (
    <style>{`
      :root { --bg:#f6fbff; --ink:#0d2b52; --ink2:#5a6b85; --stroke:#e6eef7; --focus:#2563eb; }
      * { box-sizing:border-box; }
      body { margin:0; background:var(--bg); font-family:system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
      .page { display:grid; grid-template-columns:260px 1fr; min-height:100vh; }
      .rail { background:linear-gradient(180deg,#0e1726 0%,#0a1320 100%); color:#cbd5e1; border-right:1px solid rgba(255,255,255,.06);
              padding:18px 14px; position:sticky; top:0; height:100vh; display:flex; flex-direction:column; gap:12px; }
      .brand { color:#e2e8f0; font-weight:900; letter-spacing:.2px; padding:10px 12px; border-radius:12px;
               background:rgba(255,255,255,.04); box-shadow:inset 0 0 0 1px rgba(255,255,255,.05); }
      .tabs { display:flex; flex-direction:column; gap:16px; }
      .tab { appearance:none; width:100%; text-align:left; background:linear-gradient(180deg,#0e1726 0%,#0a1320 100%); color:#fff !important; border:0; padding:10px 12px;
             border-radius:12px; font-weight:600; cursor:pointer; transition:background .18s, color .18s, box-shadow .18s, transform .02s;}
      .tab:hover { background:linear-gradient(90deg, rgba(34,211,238,.22) 0%, rgba(59,130,246,.25) 100%); color:#fff; }
      .tab:active { transform:translateY(1px); }
      .tab.active { color:#fff; background:linear-gradient(90deg, rgba(34,211,238,.22) 0%, rgba(59,130,246,.25) 100%);
                    box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), 0 10px 24px rgba(2,132,199,.18); }
      .tab:focus-visible { outline:none; box-shadow:0 0 0 3px rgba(56,189,248,.45); }
 
      .main { padding:24px; }
      .card { background:linear-gradient(180deg,#fff 0%, #f7fbff 100%); border:1px solid var(--stroke); border-radius:16px;
              padding:18px 18px 8px; box-shadow:0 10px 28px rgba(12,46,87,.06); }
      .title { margin:0 0 6px; color:var(--ink); }
      .subtitle { margin:0 0 14px; color:var(--ink2); }
      .note { margin-top:10px; border:1px solid #e0e7ff; background:#f6f9ff; padding:10px; border-radius:10px; color:#3b5bcc; }
      .row { display:grid; grid-template-columns:260px 1fr; gap:14px; align-items:flex-start; margin:12px 0; }
      .label { font-weight:800; color:var(--ink);font-size:20px; display:flex; align-items:center; gap:8px; }
      .input { width:100%; padding:0px 10px; border-radius:12px; border:1px solid #dbe6f3; background:#fff; font-size:18px; }
      .input:focus { outline:none; border-color:var(--focus); box-shadow:0 0 0 3px rgba(37,99,235,.12); }
      .triple { display:flex; gap:8px; align-items:center; }
      .form { margin:0; padding:0; border-radius:10px; box-shadow:0 !important; display:block; }
      .actions { display:flex; gap:10px; padding-top:10px; }
      .btn { padding:10px 14px; border-radius:10px; border:1px solid #dbe6f3; background:#fff; cursor:pointer; }
      .btn.active { background:#00345f; border-color:#00345f; color:#fff; }
 
      /* chips */
      .chip { display:inline-flex; align-items:center; gap:6px; padding:4px 8px;
               border:1px solid #cfe1ff; border-radius:10px;  }
      .chip-x { border:0; background:transparent; cursor:pointer; font-weight:800;
    color: #00345f !important;
    margin: 0px !important; }
 
      /* multiselect */
      .ms { position:relative; }
      .catTabs {
  display:flex; gap:8px; flex-wrap:wrap; margin:4px 0 10px;
}
.catTab {
  padding:8px 12px; border-radius:10px;
  border:1px solid #dbe6f3; background:#fff; cursor:pointer;
  font-weight:700; color:#0d2b52;
}
.catTab.active {
  background:#00345f; border-color:#00345f; color:#fff;
}
.catTab:disabled { opacity:.5; cursor:not-allowed; }
      .ms-btn { width:100%; text-align:left; padding:10px 12px; border-radius:12px; border:1px solid #dbe6f3; background:#fff; }
      .ms-caret { float:right; opacity:.6; }
      .ms-pop { position:absolute; z-index:20; margin-top:6px; width:100%; background:#fff; border:1px solid #dbe6f3;
                border-radius:12px; box-shadow:0 10px 28px rgba(12,46,87,.08); }
      .ms-hdr { padding:10px; border-bottom:1px solid #eef3fb; display:flex; gap:8px; align-items:center; }
      .ms-search { flex:1; padding:8px 10px; border-radius:8px; border:1px solid #dbe6f3; }
      .ms-actions { display:flex; gap:6px; }
      .ms-mini { padding:6px 8px; border-radius:8px; border:1px solid #dbe6f3; background:#f9fbff; cursor:pointer; }
      .ms-list { max-height:260px; overflow:auto; padding:8px 10px; }
      .ms-item { display:flex; gap:8px; align-items:center; padding:6px 4px; }
      .ms-empty { padding:12px; color:#6b7280; }
 
      /* Summary page */
      .grid2 { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
      .box { border:1px solid var(--stroke); background:#fff; border-radius:12px; padding:12px; }
      .box-title { font-weight:800; color:var(--ink); margin-bottom:8px; }
 
      .kv { display:flex; justify-content:space-between; gap:14px; padding:6px 0; border-bottom:1px dashed #edf2fb; }
      .kv:last-child { border-bottom:0; }
      .kv > span { color:#4b5563; }
      .kv-inline { margin-right:12px; color:#374151; }
 
      .icf-list { display:flex; flex-direction:column; gap:10px; }
      .icf-row { padding:10px; border:1px solid #e9eef7; border-radius:10px; background:#f9fbff; }
      .icf-head { margin-bottom:4px; }
      .icf-sub { color:#334155; }
     
      .pill { padding:8px 12px; border:1px solid #dbe6f3; border-radius:12px; background:#fff; }
      ul.flat { list-style:none; margin:0; padding-left:0; }
      ul.flat li { margin:6px 0; }
      .dim { color:#6b7280; }
      .muted { color:#6b7280; }
 
      /* Top bar inside card */
      .card-head { display:flex; align-items:center; justify-content:space-between; margin-bottom: 6px; }
      .btn.ai { opacity:.7; cursor:not-allowed; background:#f5f7fb; border-color:#dbe6f3; }
 
      /* Textarea visual */
      .input.ta { resize: vertical; min-height: 100px; }
 
      /* Tiny gray helper text */
      .hint { font-size: 12px; color: #6b7280; margin-top: 6px; }
 
      .preview { margin-top:12px; background:#0b1f3a; color:#e8f0ff; padding:12px; border-radius:12px; overflow:auto; }
      @media (max-width:900px){ .row{ grid-template-columns:1fr; } }
    `}</style>
  );
}