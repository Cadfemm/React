import React from "react";
import axios from "axios";
import { Calendar, FlaskConical, Settings, SquareCheckBig,SquareActivity } from "lucide-react";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});
function AssessmentEncounterTab({
  patientId,
  value,
  onChange,
  onSaved,
  /* NEW: fed from App() */
  icfOptions = [],
  ichiOptions = [],
  icdContext = ""
}) {
  const [form, setForm] = React.useState(
    value || { subjective: "", objective: "", assessment: "", plan: "", goals: [] }
  );
  const [history, setHistory] = React.useState([]);           // ← NEW
  const [status, setStatus] = React.useState("idle");         // ← was useState; fix hook
  const NOTE_MAX = 2000;
const LAST_UPDATED = "2025-08-21 09:45";
  // ---- STATIC GAS GOALS (read-only display) ----
  const GAS_GOALS = [
    {
      goal: "Occasional lapses (weekly)",
      icf_target: "b1101",
      ichi_action: "MUB.AA.ZZ · Assessment of muscle power functions",
      expected: "Muscle power stability"
    },
    {
      goal: "Smooth movement in ADL's",
      icf_target: "b749",
      ichi_action: "MUD.AA.ZZ · Assessment of muscle endurance",
      expected: "Smooth Muscle movements"
    },
    {
      goal: "MAS 2 marked increase",
      icf_target: "b7350",
      ichi_action: "MU2.AA.ZZ · Assessment of muscle functions",
      expected: "Proper Muscle movements"
    }
  ];
// ---- DUMMY PREVIOUS ASSESSMENTS ----
const PREVIOUS_ASSESSMENTS = [
  {
    date: "2025-08-10",
    subjective: "Patient reported occasional spasms after exertion.",
    objective: "MAS 1+ UE; vitals stable; ROM mildly restricted.",
    assessment: "Spasticity-related inefficiency; fair endurance.",
    plan: "Continue endurance training; review in 2 weeks.",
    goals: [
      { goal: "Reduce spasm frequency", icf_target: "b7350", ichi_action: "MU2.AA.ZZ", expected: "Fewer daily disruptions" }
    ]
  },
  {
    date: "2025-07-20",
    subjective: "Difficulty with ADLs in mornings.",
    objective: "Grip strength 24kg; 6MWT 380m.",
    assessment: "Strength improved; endurance moderate.",
    plan: "Home exercise + clinic sessions 3x/week.",
    goals: [
      { goal: "Independent dressing", icf_target: "d540", ichi_action: "VBA.AA.ZZ", expected: "No caregiver help 5/7 days" }
    ]
  }
];

  // Fallback sample history if API has no history endpoint
  const SAMPLE_HISTORY = [
    {
      id: "enc-2025-08-10",
      created_at: "2025-08-10T10:15:00Z",
      subjective: "C/o occasional spasms after exertion.",
      objective: "MAS 1+ UE; vitals stable; ROM mildly restricted.",
      assessment: "Spasticity-related movement inefficiency; fair endurance.",
      plan: "ICHI: MUD.AA.ZZ endurance training; review in 2 wks.",
      goals: [
        { goal: "Reduce spasm frequency", icf_target: "b7350", ichi_action: "MU2.AA.ZZ", expected: "Less daily disruption" }
      ]
    },
    {
      id: "enc-2025-07-20",
      created_at: "2025-07-20T09:40:00Z",
      subjective: "Difficulty with ADLs in mornings.",
      objective: "Grip strength 24kg; 6MWT 380m.",
      assessment: "Strength improved; endurance moderate.",
      plan: "Home exercise + clinic sessions 3x/week.",
      goals: [
        { goal: "Independent dressing", icf_target: "d540", ichi_action: "VBA.AA.ZZ", expected: "No caregiver help 5/7 days" }
      ]
    }
  ];

  // keep App state in sync
  React.useEffect(() => onChange?.(form), [form, onChange]);

  // load existing SOAP (+goals if present)
  React.useEffect(() => {
    if (!patientId) return;
    (async () => {
      try {
        const r = await fetch(`${API}/encounters/${encodeURIComponent(patientId)}`);
        if (r.ok) {
          const d = await r.json();
          setForm({
            subjective: d.subjective || "",
            objective: d.objective || "",
            assessment: d.assessment || "",
            plan: d.plan || "",
            goals: Array.isArray(d.goals) ? d.goals : []
          });
        }
      } catch {}
    })();
  }, [patientId]);

  // ← NEW: load previous assessments for this patient (if your API supports it)
  React.useEffect(() => {
    if (!patientId) return;
    (async () => {
      try {
        const r = await fetch(`${API}/encounters/${encodeURIComponent(patientId)}/history`);
        if (r.ok) {
          const arr = await r.json(); // expect array of past encounters (latest first or last)
          // Defensive: drop any object that looks identical to current form
          const past = Array.isArray(arr) ? arr.filter(e =>
            e.subjective !== form.subjective ||
            e.objective !== form.objective ||
            e.assessment !== form.assessment ||
            e.plan !== form.plan
          ) : [];
          setHistory(past.length ? past : SAMPLE_HISTORY);
        } else {
          setHistory(SAMPLE_HISTORY);
        }
      } catch {
        setHistory(SAMPLE_HISTORY);
      }
    })();
  }, [patientId]); // don't include `form` here to avoid looping

  // persist SOAP + goals
  const save = async () => {
    if (!patientId) return;
    try {
      await fetch(`${API}/encounters/${encodeURIComponent(patientId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      onSaved?.();
    } catch {}
  };

  // local helpers to mutate goals (if you later make them editable)
  const addGoal = () =>
    setForm(f => ({
      ...f,
      goals: [...(f.goals || []), { goal: "", icf_target: "", ichi_action: "", expected: "" }]
    }));

  const delGoal = (idx) =>
    setForm(f => ({ ...f, goals: (f.goals || []).filter((_, i) => i !== idx) }));

  const setGoalCell = (idx, patch) =>
    setForm(f => ({
      ...f,
      goals: (f.goals || []).map((g, i) => (i === idx ? { ...g, ...patch } : g))
    }));

  const labelFor = (val, list) => list.find(o => o.value === val)?.label || val || "—";

  // save button UX (kept your 2s minimum delay)
  const handleSave = async (e) => {
    e.preventDefault();
    if (status === "saving") return;

    setStatus("saving");
    const MIN_DELAY = 2000;
    const start = Date.now();

    try {
      await fetch(`${API}/encounters/${encodeURIComponent(patientId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const elapsed = Date.now() - start;
      if (elapsed < MIN_DELAY) {
        await new Promise(r => setTimeout(r, MIN_DELAY - elapsed));
      }
      setStatus("saved");
      onSaved?.();
    } catch {
      setStatus("idle");
    }
  };

  // Small helper to render a SOAP card (read-only for history)
  const ReadonlySoap = ({ enc, idx }) => {
    const [open, setOpen] = React.useState(idx === 0 ? true : false); // expand the most recent by default
    const dt = enc.created_at ? new Date(enc.created_at) : null;
    const title = dt
      ? `Previous Assessment — ${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`
      : `Previous Assessment`;

    return (
      <section className="card" style={{ opacity: 0.95 }}>
        <div className="soap-head" style={{ cursor: "pointer" }} onClick={() => setOpen(o => !o)}>
          <div className="soap-title">{title}</div>
          <span className="chip">{open ? "Hide" : "Show"}</span>
        </div>
        {open && (
          <>
            <div className="soap-grid">
              <div className="box soft">
                <div className="box-title">Subjective</div>
                <textarea className="input ta" rows={5} value={enc.subjective || ""} readOnly />
              </div>
              <div className="box soft">
                <div className="box-title">Objective</div>
                <textarea className="input ta" rows={5} value={enc.objective || ""} readOnly />
              </div>
              <div className="box soft">
                <div className="box-title">Assessment</div>
                <textarea className="input ta" rows={5} value={enc.assessment || ""} readOnly />
              </div>
              <div className="box soft">
                <div className="box-title">Plan</div>
                <textarea className="input ta" rows={5} value={enc.plan || ""} readOnly />
              </div>
            </div>

            {/* Goals snapshot if present */}
            {(enc.goals && enc.goals.length > 0) && (
              <div className="box soft" style={{ marginTop: 12, margin: "20px 25px" }}>
                <div className="box-title">GAS Goals (snapshot)</div>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{width:"32%"}}>Goal</th>
                      <th style={{width:"18%"}}>ICF target</th>
                      <th style={{width:"34%"}}>ICHI action</th>
                      <th>Expected outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enc.goals.map((g, i) => (
                      <tr key={i}>
                        <td>{g.goal || "—"}</td>
                        <td>{g.icf_target || "—"}</td>
                        <td>{g.ichi_action || "—"}</td>
                        <td>{g.expected || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </section>
    );
  };

  return (
    <section className="card">
      <div className="soap-head">

        <div className="soap-title">Assessment — <b>SOAP</b></div>
        <span className="chip soft">Clinical</span>
      </div>

      {/* SOAP fields (current) */}
      <div className="soap-grid">
        <div className="box soft">
          <div className="box-title">Subjective</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="Patient Complaint / History…" value={form.subjective}
            onChange={e => setForm(s => ({ ...s, subjective: e.target.value }))} />
        </div>

        <div className="box soft">
          <div className="box-title">Objective</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="Exam Findings, Vitals, Measurements…" value={form.objective}
            onChange={e => setForm(s => ({ ...s, objective: e.target.value }))} />
        </div>

        <div className="box soft">
          <div className="box-title">Assessment</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="Diagnosis / Clinical Impression…" value={form.assessment}
            onChange={e => setForm(s => ({ ...s, assessment: e.target.value }))} />
        </div>

        <div className="box soft">
          <div className="box-title">Plan</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="ICHI, Education, Reviews, Follow-up…" value={form.plan}
            onChange={e => setForm(s => ({ ...s, plan: e.target.value }))} />
        </div>
      </div>

      {/* ===== STATIC GAS GOALS (read-only) ===== */}
      <div className="box soft" style={{ marginTop: 12 , margin:"20px 25px" }}>
        <div className="box-title">Present GAS Goals</div>
        <table className="table">
          <thead>
            <tr>
              <th style={{width:"32%"}}>Goal</th>
              <th style={{width:"18%"}}>ICF target</th>
              <th style={{width:"34%"}}>ICHI action</th>
              <th>Expected outcome</th>
            </tr>
          </thead>
          <tbody>
            {GAS_GOALS.map((g, i) => (
              <tr key={i}>
                <td>{g.goal}</td>
                <td>{g.icf_target}</td>
                <td>{g.ichi_action}</td>
                <td>{g.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="muted" style={{marginTop:6}}>
          Note: These are fixed reference goals for quick review; they are not editable here.
        </div>
      </div>
      {/* ===== END STATIC GAS GOALS ===== */}
        <div
  className="actionbar"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    margin: "0 20px 8px 20px",
  }}
>
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <button
      className="btn topbtn"
      style={{
       
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
      onClick={() => {/* TODO: open follow-up booking */}}
    >
      <Calendar className="svg-icon "size={16} />
      Book Follow-up
    </button>

    <button className="btn topbtn" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <FlaskConical className="svg-icon" size={16} />
      Order Investigations
    </button>

    <button className="btn topbtn" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Settings  className="svg-icon" size={16} />
      Start TPS
    </button>

    <button className="btn topbtn" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <SquareCheckBig className="svg-icon" size={16} />
      Add to RAP
    </button>
  </div>

  <div className="dim" style={{ fontSize: 12 }}>
    Chart last updated: <b>{LAST_UPDATED}</b>
  </div>
</div>
      <div className="actions">

<button
  className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`}
  style={{ margin: "20px" }}
  type="button"
  onClick={handleSave}
  disabled={status === "saving"}   // ← removed `|| !patientId`
  aria-busy={status === "saving"}
>
  {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save"}
</button>

      </div>

{/* ===== PREVIOUS ASSESSMENTS (dummy) ===== */}
{PREVIOUS_ASSESSMENTS.map((enc, idx) => (
  <section key={idx} className="card" style={{ marginTop: 16, opacity: 0.95 }}>
    <div className="soap-head">
      <div className="soap-title">
        Assessment — {enc.date}
      </div>
      <span className="chip soft">Read-only</span>
    </div>

    <div className="soap-grid">
      <div className="box soft">
        <div className="box-title">Subjective</div>
        <textarea className="input ta" rows={4} value={enc.subjective} readOnly />
      </div>
      <div className="box soft">
        <div className="box-title">Objective</div>
        <textarea className="input ta" rows={4} value={enc.objective} readOnly />
      </div>
      <div className="box soft">
        <div className="box-title">Assessment</div>
        <textarea className="input ta" rows={4} value={enc.assessment} readOnly />
      </div>
      <div className="box soft">
        <div className="box-title">Plan</div>
        <textarea className="input ta" rows={4} value={enc.plan} readOnly />
      </div>
    </div>

    {enc.goals?.length > 0 && (
      <div className="box soft" style={{ margin: "12px 25px" }}>
        <div className="box-title">GAS Goals (snapshot)</div>
        <table className="table">
          <thead>
            <tr>
              <th style={{width:"32%"}}>Goal</th>
              <th style={{width:"18%"}}>ICF target</th>
              <th style={{width:"34%"}}>ICHI action</th>
              <th>Expected outcome</th>
            </tr>
          </thead>
          <tbody>
            {enc.goals.map((g, i) => (
              <tr key={i}>
                <td>{g.goal}</td>
                <td>{g.icf_target}</td>
                <td>{g.ichi_action}</td>
                <td>{g.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
))}

    </section>
  );
}
export default AssessmentEncounterTab;