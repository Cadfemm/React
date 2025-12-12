import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});

const GAS_BASE = `${API}/gas`; 

function GasGoalsNATab({ icfChildren = [], onSummaryChange }) {
  const codes = useMemo(() => Array.from(new Set(icfChildren)), [icfChildren]);

  // Define the ICF Parent to ICF Category mapping (based on Table 1)
  const parentCategoryMapping = {
    'b730': 'PT',  // Example: b730 -> PT
    'b110': 'Neurophysics', 
    'b740': 'PT',
    'b735': 'PT',
    'b749': 'PT', // Example: b110 -> Neurophysics
    // Add more mappings here
  };

  const [scales, setScales] = useState({});   // { code: [{score, label}] }
  const [selection, setSelection] = useState({}); // { code: "2" | "0" | "-1" | "" }
  const [loading, setLoading] = useState({});   // { code: boolean }
  const [categories, setCategories] = useState({}); // { code: category }
  const [activeTab, setActiveTab] = useState(""); // To track which tab is active

  const scoreText = (v) => {
    const n = Number(v);
    return Number.isNaN(n) ? "" : (n > 0 ? `+${n}` : String(n));
  };

  // Generate static analytics data for pie charts and bar chart
  const staticAnalytics = [
    { label: "Improvement", value: 2, date: "2025-07-10" }, // Diagram 1
    { label: "Improvement", value: 20, date: "2025-08-20" }, // Diagram 2
    { label: "Improvement", value: 45, date: new Date().toISOString().slice(0, 10) }, // Diagram 3 (current date)
  ];

  const pieChartData = staticAnalytics.map(item => ({
    labels: ["Improvement", "Remaining"],
    datasets: [{
      data: [item.value, 100 - item.value],
      backgroundColor: ["green", "gray"],
    }]
  }));

  const barChartData = {
    labels: ["2025-07-10", "2025-08-20", new Date().toISOString().slice(0, 10)],
    datasets: [
      {
        label: "Improvement (%)",
        data: [2, 20, 45], // Example improvements
        backgroundColor: "green",
      },
      {
        label: "Decrement (%)",
        data: [0, 0, 0], // No decrement for now, but you can add values
        backgroundColor: "red",
      }
    ]
  };

  // Prune selections if a code disappears
  useEffect(() => {
    setSelection(prev =>
      Object.fromEntries(Object.entries(prev).filter(([c]) => codes.includes(c)))
    );
  }, [codes]);

  // Fetch scales for missing codes (in parallel)
  useEffect(() => {
    const missing = codes.filter(c => !scales[c]);
    if (!missing.length) return;

    let alive = true;
    (async () => {
      setLoading(p => ({ ...p, ...Object.fromEntries(missing.map(c => [c, true])) })); 
      try {
        const entries = await Promise.all(
          missing.map(async c => {
            try {
              const res = await fetch(`${GAS_BASE}/scale/${encodeURIComponent(c)}`);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const json = await res.json();
              return [c, json?.options || []];
            } catch (e) {
              console.error("GAS fetch failed for", c, e);
              return [c, []];
            }
          })
        );
        if (!alive) return;
        setScales(p => ({ ...p, ...Object.fromEntries(entries) }));
      } finally {
        if (alive) setLoading(p => ({ ...p, ...Object.fromEntries(missing.map(c => [c, false])) }));
      }
    })();

    return () => { alive = false; };
  }, [codes, scales]);

  // Fetch ICF categories based on ICF parent codes
  useEffect(() => {
    const newCategories = {};
    codes.forEach(code => {
      const parentCode = code.substring(0, 4); // Assuming parent code is the first 4 characters
      newCategories[code] = parentCategoryMapping[parentCode] || 'Unknown';
    });
    setCategories(newCategories);
  }, [codes]);

  // Group codes by category for tab-wise display
  const groupedByCategory = useMemo(() => {
    return Object.entries(categories).reduce((acc, [code, category]) => {
      if (!acc[category]) acc[category] = [];
      acc[category].push(code);
      return acc;
    }, {});
  }, [categories]);

  // Set the first tab as active when the component mounts
  useEffect(() => {
    const firstCategory = Object.keys(groupedByCategory)[0];
    setActiveTab(firstCategory);
  }, [groupedByCategory]);

  // Emit compact summary (convert back to numbers)
  useEffect(() => {
    const summary = Object.entries(selection).map(([code, scoreStr]) => {
      const s = Number(scoreStr);
      const label = (scales[code] || []).find(o => Number(o.score) === s)?.label || "";
      return { icf_child_code: code, score: s, label };
    });
    onSummaryChange?.(summary);
  }, [selection, scales, onSummaryChange]);

  return (
    <div className="pad">
      <div className="buttonbar" style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {Object.keys(groupedByCategory).map((category) => (
          <button
            key={category}
            className={`btn ${activeTab === category ? "active" : ""}`}
            onClick={() => setActiveTab(category)}
          >
            {category} ({groupedByCategory[category].length})
          </button>
        ))}
      </div>

      <div className="cardheading">
        <h2 className="title">GAS Goals</h2>
        {codes.length === 0 && <div className="hint">No ICF child codes selected yet.</div>}
      </div>
      {/* Display selected category's child codes */}
      <div style={{ padding: "25px" }}>
        {activeTab && groupedByCategory[activeTab]?.map(code => {
          const opts = scales[code] || [];
          const value = selection[code] ?? "";
          const busy = !!loading[code];
          const category = categories[code];

          return (
            <div key={code} style={{ display: "grid", gridTemplateColumns: "140px 320px 1fr", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontWeight: 600 }}>
                {code} <span style={{ fontWeight: 'normal', fontSize: '14px' }}></span>
              </div>

              <select
                className="input"
                value={value}
                disabled={busy || !opts.length}
                onChange={e => setSelection(s => ({ ...s, [code]: e.target.value }))}>
                <option value="">{busy ? "Loading…" : "— Select Rating —"}</option>
                {opts.map(o => {
                  const v = String(Number(o.score)); // Store as string in <option>
                  const name = (o.label || "").trim();
                  return (
                    <option key={v} value={v}>
                      {scoreText(v)}&nbsp;&nbsp;&nbsp;{name || "Unnamed goal"}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </div>
      {/* Display Pie Chart for improvement analytics */}
      {/* <div style={{ display: 'flex', gap: 20, marginBottom: 40 , justifyContent:'center'}}>
        {pieChartData.map((data, index) => (
          <div key={index} >
            <h5>Improvement on {staticAnalytics[index].date}</h5>
            <Pie data={data} />
            <p style={{display:'flex',justifyContent:'center'}}>{staticAnalytics[index].value}% Improvement</p>
          </div>
        ))}
      </div> */}

      {/* Display Bar Chart for comparative analysis */}
      {/* <div style={{display:'flex',justifyContent:'center'}}>
      <div style={{ width: '600px', height: '400px', margin: '50', }}>
        <h4>Comparative Bar Chart</h4>
        <Bar data={barChartData} />
      </div>
</div> */}

    </div>
  );
}
export default GasGoalsNATab;