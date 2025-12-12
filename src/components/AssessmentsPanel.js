
import React from "react";
import axios from "axios";
import MultiSelect from "./MultiSelect";
const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});




function AssessmentsPanel({ apiBase, selectedIchiCodes, onSummaryChange }) {
  // assessments available for the selected ICHI (deduped by name)
  const [assessments, setAssessments] = React.useState([]);           // ["MMT", ...]
  // inputs per assessment
  const [inputsByAssess, setInputsByAssess] = React.useState({});     // { "MMT": [ {input, range, min, max} ] }
  // selected inputs per assessment
  const [selInputs, setSelInputs] = React.useState({});               // { "MMT": Set(["Right Upper Limb", ...]) }
  // score chosen per (assessment|input)
  const [scores, setScores] = React.useState({});                     // { "MMT|Right Upper Limb": 3 }
  const [msg, setMsg] = React.useState("");

  const getJSON = async (u) => {
    const r = await fetch(u);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  };

  // dedupe + load assessments whenever ICHI selection changes
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setMsg("");
        const names = new Set();
        for (const code of selectedIchiCodes) {
          const list = await getJSON(`${apiBase}/assessments/by-ichi/${encodeURIComponent(code)}`);
          list.forEach(n => names.add(n));
        }
        if (cancelled) return;
        const arr = Array.from(names).sort();
        setAssessments(arr);

        // preload inputs for each assessment (once)
        const nextInputs = {};
        for (const name of arr) {
          const items = await getJSON(`${apiBase}/assessments/inputs/${encodeURIComponent(name)}`);
          nextInputs[name] = items;
        }
        if (cancelled) return;
        setInputsByAssess(nextInputs);
      } catch (e) {
        setMsg(`Failed to load assessments: ${e.message}`);
        setAssessments([]);
        setInputsByAssess({});
      }
    })();
    return () => { cancelled = true; };
  }, [apiBase, selectedIchiCodes.join("|")]);

  // helper: range "a-b" -> [a..b]
  const numsFromRange = (rangeStr, min, max) => {
    if (Number.isFinite(min) && Number.isFinite(max) && min <= max) {
      return Array.from({length:(max-min+1)}, (_,i)=>min+i);
    }
    const m = (rangeStr || "").match(/^(\d+)\s*-\s*(\d+)$/);
    if (!m) return [];
    const a = parseInt(m[1],10), b = parseInt(m[2],10);
    if (isNaN(a) || isNaN(b) || a>b) return [];
    return Array.from({length:(b-a+1)}, (_,i)=>a+i);
  };

  // emit normalized summary up
  React.useEffect(() => {
    const summary = assessments.map(name => {
      const selected = Array.from(selInputs[name] || []);
      return {
        assessment: name,
        items: selected.map(label => ({
          input: label,
          score: scores[`${name}|${label}`]
        }))
      };
    }).filter(x => x.items.length > 0);
    onSummaryChange?.(summary);
  }, [assessments, selInputs, scores, onSummaryChange]);

  const toggleInput = (name, label) => {
    setSelInputs(prev => {
      const s = new Set(prev[name] || []);
      if (s.has(label)) s.delete(label); else s.add(label);
      return { ...prev, [name]: s };
    });
  };

  return (
    <div className="box" style={{marginTop:12, paddingLeft:"40px"}}>
      <div className="box-title" style={{fontWeight:600}}>Assessments</div>
      {msg && <div className="note">{msg}</div>}
      {assessments.length === 0 ? (
        <div className="muted">No Assessments for the Selected ICHI.</div>
      ) : (
        <>
          {assessments.map(name => {
            const inputs = inputsByAssess[name] || [];
            const chosen = selInputs[name] || new Set();

            return (
              <div key={name} style={{marginBottom:12}}>
                <div className="row" style={{alignItems:"center"}}>
                  <div className="label">{name}</div>
                  <div>
                    {/* Inputs dropdown (no duplicates because server already dedupes per assessment) */}
                    <MultiSelect
                      options={inputs.map(it => ({ value: it.input, label: it.input }))}
                      selected={chosen}
                      onChange={(setVal)=>setSelInputs(prev=>({ ...prev, [name]: setVal }))}
                      placeholder={`Select ${name} Inputs…`}
                      width={560}
                    />
                  </div>
                </div>

                {/* Rows for selected inputs with score dropdown */}
                {Array.from(chosen).map(label => {
                  const info = inputs.find(it => it.input === label) || {};
                  const numbers = numsFromRange(info.range, info.min, info.max);
                  const key = `${name}|${label}`;
                  const value = scores[key] ?? (numbers.length ? numbers[0] : "");
                  return (
                    <div key={key} className="row" style={{alignItems:"center"}}>
                      <div className="label" style={{fontWeight:500}}>{label}</div>
                      <div style={{display:"flex", gap:8, alignItems:"center"}}>
                        <span className="pill">range: <b>{info.range || (Number.isFinite(info.min)&&Number.isFinite(info.max)?`${info.min}-${info.max}`:"—")}</b></span>
                        {numbers.length > 0 ? (
                          <select className="input" value={value}
                                  onChange={e=>setScores(prev=>({ ...prev, [key]: Number(e.target.value) }))} style={{maxWidth:160}}>
                            {numbers.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        ) : <span className="muted">No numeric range</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
export default AssessmentsPanel;