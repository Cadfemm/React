import { useState } from "react";

const BEHAVIORS = [
  "Short attention span, easy distractibility, inability to concentrate.",
  "Impulsive, impatient, low tolerance for pain or frustration.",
  "Uncooperative, resistant to care, demanding.",
  "Violent and or threatening violence toward people or property.",
  "Explosive and/or unpredictable anger.",
  "Rocking, rubbing, moaning or other self-stimulating behavior.",
  "Pulling at tubes, restraints, etc.",
  "Wandering from treatment areas.",
  "Restlessness, pacing, excessive movement.",
  "Repetitive behaviors, motor and/or verbal.",
  "Rapid, loud or excessive talking.",
  "Sudden changes of mood.",
  "Easily initiated or excessive crying and/or laughter.",
  "Self-abusiveness, physical and/or verbal.",
];

const SCORE_OPTIONS = ["1","2","3","4"];
const NUM_SESSIONS = 6;

function emptySession() {
  return { date: "", time: "", to: "", scores: Array(BEHAVIORS.length).fill("") };
}

function getInterpretation(total) {
  if (!total) return null;
  if (total <= 21) return { label: "Within Normal Limits", color: "#166534", bg: "#dcfce7" };
  if (total <= 28) return { label: "Mild Agitation",       color: "#92400e", bg: "#fef9c3" };
  if (total <= 35) return { label: "Moderate Agitation",   color: "#c2410c", bg: "#ffedd5" };
  return             { label: "Severe Agitation",          color: "#991b1b", bg: "#fee2e2" };
}

export default function AgitatedBehaviourScale({ patient }) {
  const [sessions, setSessions] = useState(
    Array.from({ length: NUM_SESSIONS }, emptySession)
  );

  const updateSession = (si, field, val) =>
    setSessions((p) => p.map((s, i) => (i === si ? { ...s, [field]: val } : s)));

  const updateScore = (si, bi, val) =>
    setSessions((p) =>
      p.map((s, i) => {
        if (i !== si) return s;
        const scores = [...s.scores];
        scores[bi] = val;
        return { ...s, scores };
      })
    );

  const addSession    = () => setSessions((p) => [...p, emptySession()]);
  const removeSession = (si) => setSessions((p) => p.filter((_, i) => i !== si));

  const sessionTotal = (s) =>
    s.scores.reduce((sum, v) => sum + (parseInt(v) || 0), 0);

  return (
    <div style={page}>
      <div style={pageHeader}>
        <div>
          <div style={pageTitle}>Agitated Behaviour Scale (ABS)</div>
          {/* <div style={pageSubtitle}>Nursing · Behavioural Assessment</div> */}
        </div>
        {patient && (
          <div style={patientBadge}>
            <div style={badgeName}>{patient.name}</div>
            {patient.id && <div style={badgeId}>MRN: {patient.id}</div>}
          </div>
        )}
      </div>

      <div style={instrBox}>
        <div style={instrTitle}>Instructions</div>
        <p style={instrPara}>
          At the end of the observation period indicate whether the behavior described in each item was present and, if so, to what degree: slight, moderate or extreme.
        </p>
        <div style={instrGrid}>
          {[
            ["1 = Absent",   "The behavior is not present."],
            ["2 = Slight",   "Present but does not prevent appropriate behavior. The individual may redirect spontaneously."],
            ["3 = Moderate", "The individual needs to be redirected from an agitated to an appropriate behavior, but benefits from such cueing."],
            ["4 = Extreme",  "The individual is not able to engage in appropriate behavior due to the interference of the agitated behavior, even when external cueing or redirection is provided."],
          ].map(([k, v]) => (
            <div key={k} style={instrItem}>
              <span style={instrKey}>{k}</span>
              <span style={instrVal}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={tableCard}>
        <div style={tableWrap}>
          <table style={table}>
            <colgroup>
              <col style={{ width: 32, minWidth: 32 }} />
              <col style={{ width: 340, minWidth: 280 }} />
              {sessions.map((_, i) => <col key={i} style={{ width: 108, minWidth: 108 }} />)}
            </colgroup>
            <thead>
              <tr>
                <th style={{ ...th, ...thSticky0 }} colSpan={2}>BEHAVIOR</th>
                {sessions.map((s, si) => (
                  <th key={si} style={thSession}>
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 3 }}>
                      {sessions.length > 1 && (
                        <button style={sessionRemoveBtn} onClick={() => removeSession(si)} title="Remove session">✕</button>
                      )}
                    </div>
                    <div style={sHdr}>
                      <div style={sRow}><span style={sLbl}>DATE:</span><input type="date" style={sInput} value={s.date} onChange={(e) => updateSession(si, "date", e.target.value)} /></div>
                      <div style={sRow}><span style={sLbl}>TIME:</span><input type="time" style={sInput} value={s.time} onChange={(e) => updateSession(si, "time", e.target.value)} /></div>
                      <div style={sRow}><span style={sLbl}>TO:</span><input type="time" style={sInput} value={s.to} onChange={(e) => updateSession(si, "to", e.target.value)} /></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BEHAVIORS.map((beh, bi) => (
                <tr key={bi} style={bi % 2 === 0 ? trEven : trOdd}>
                  <td style={{ ...td, ...tdNum }}>{bi + 1}.</td>
                  <td style={{ ...td, ...tdBeh }}>{beh}</td>
                  {sessions.map((s, si) => (
                    <td key={si} style={{ ...td, textAlign: "center", padding: "4px 3px" }}>
                      <div style={scoreGroup}>
                        {SCORE_OPTIONS.map((opt) => {
                          const active = s.scores[bi] === opt;
                          return (
                            <label key={opt} title={`${opt} – ${["Absent","Slight","Moderate","Extreme"][parseInt(opt)-1]}`} style={{ cursor: "pointer" }}>
                              <input type="radio" name={`abs_${si}_${bi}`} value={opt}
                                checked={active} onChange={() => updateScore(si, bi, opt)}
                                style={{ display: "none" }} />
                              <span style={{ ...scorePill, ...(active ? scorePillOn : {}) }}>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td style={totalLabelTd} colSpan={2}>Total Score</td>
                {sessions.map((s, si) => {
                  const total = sessionTotal(s);
                  const interp = getInterpretation(total);
                  return (
                    <td key={si} style={totalScoreTd}>
                      {total > 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                          <span style={totalNum}>{total}</span>
                          {interp && <span style={{ ...interpChip, background: interp.bg, color: interp.color }}>{interp.label}</span>}
                        </div>
                      ) : <span style={{ color: "#cbd5e1" }}>—</span>}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={addSessionBar}>
        <button style={addSessionBtn} onClick={addSession}>＋ Add Session</button>
        <span style={addSessionHint}>Sessions scroll horizontally — behavior column stays fixed</span>
      </div>

      <div style={scoreKey}>
        <span style={scoreKeyTitle}>Score Interpretation</span>
        {[
          ["≤ 21","Within Normal Limits","#166534","#dcfce7"],
          ["22–28","Mild Agitation","#92400e","#fef9c3"],
          ["29–35","Moderate Agitation","#c2410c","#ffedd5"],
          ["> 35","Severe Agitation","#991b1b","#fee2e2"],
        ].map(([range, label, color, bg]) => (
          <div key={range} style={scoreKeyItem}>
            <span style={{ ...scoreKeyRange, background: bg, color }}>{range}</span>
            <span style={{ fontSize: 12, color }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const page         = { width: "100%", boxSizing: "border-box", padding: "24px 28px", fontFamily: "'Inter', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" };
const pageHeader   = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 };
const pageTitle    = { fontSize: 20, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px" };
const pageSubtitle = { fontSize: 12, color: "#64748b", marginTop: 2 };
const patientBadge = { background: "#dbeafe", color: "#1e3a8a", borderRadius: 10, padding: "8px 16px", textAlign: "right", border: "1px solid #c7d9fb" };
const badgeName    = { fontWeight: 700, fontSize: 14 };
const badgeId      = { fontSize: 11, opacity: 0.7, marginTop: 2 };

const instrBox   = { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 18px", marginBottom: 18 };
const instrTitle = { fontWeight: 700, fontSize: 13, color: "#1e3a8a", marginBottom: 8 };
const instrPara  = { fontSize: 12, color: "#475569", margin: "0 0 10px", lineHeight: 1.6 };
const instrGrid  = { display: "flex", flexDirection: "column", gap: 6 };
const instrItem  = { display: "flex", gap: 10, fontSize: 12, color: "#374151" };
const instrKey   = { fontWeight: 700, whiteSpace: "nowrap", color: "#1e3a8a", minWidth: 90 };
const instrVal   = { lineHeight: 1.5 };

const tableCard = { background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden", marginBottom: 16 };
const tableWrap = { overflowX: "auto" };
const table     = { borderCollapse: "collapse", fontSize: 11 };

const th       = { border: "1px solid #c7d9fb", padding: "8px 10px", fontWeight: 700, fontSize: 11, background: "#e8f0fe", color: "#1e3a8a", textAlign: "left" };
const thSticky0= { position: "sticky", left: 0, zIndex: 4, background: "#e8f0fe" };
const thSession= { border: "1px solid #2d4f8a", padding: "6px 8px", background: "#3b5fa0", verticalAlign: "top" };

const sHdr   = { display: "flex", flexDirection: "column", gap: 4 };
const sRow   = { display: "flex", alignItems: "center", gap: 4 };
const sLbl   = { fontSize: 9, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", minWidth: 30 };
const sInput = { flex: 1, border: "none", borderBottom: "1px solid rgba(255,255,255,0.4)", background: "transparent", color: "#fff", fontSize: 9, outline: "none", padding: "1px 2px", minWidth: 0, colorScheme: "dark" };

const td     = { border: "1px solid #e2e8f0", padding: "5px 6px", verticalAlign: "middle" };
const tdNum  = { color: "#64748b", fontWeight: 600, textAlign: "right", whiteSpace: "nowrap", background: "#f8fafc", position: "sticky", left: 0, zIndex: 2, width: 32, borderRight: "none" };
const tdBeh  = { fontSize: 12, color: "#1e293b", background: "#fff", position: "sticky", left: 32, zIndex: 2, borderLeft: "none", boxShadow: "2px 0 4px rgba(0,0,0,0.06)" };
const trEven = { background: "#f8fafc" };
const trOdd  = { background: "#fff" };

const scoreGroup  = { display: "flex", gap: 3, justifyContent: "center" };
const scorePill   = { display: "inline-block", padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 700, background: "#f1f5f9", color: "#64748b", border: "1px solid #e2e8f0", userSelect: "none" };
const scorePillOn = { background: "#3b5fa0", color: "#fff", border: "1px solid #2d4f8a" };

const totalLabelTd = { border: "1px solid #c7d9fb", padding: "8px 12px", background: "#e8f0fe", fontWeight: 700, fontSize: 12, color: "#1e3a8a", textAlign: "right", position: "sticky", left: 0, zIndex: 2, boxShadow: "2px 0 4px rgba(0,0,0,0.06)" };
const totalScoreTd = { border: "1px solid #c7d9fb", padding: "8px 6px", background: "#e8f0fe", textAlign: "center" };
const totalNum     = { fontWeight: 800, fontSize: 16, color: "#1e3a8a" };
const interpChip   = { fontSize: 9, fontWeight: 700, borderRadius: 10, padding: "2px 7px", whiteSpace: "nowrap" };

const scoreKey      = { display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 16px" };
const scoreKeyTitle = { fontWeight: 700, fontSize: 12, color: "#475569", marginRight: 4 };
const scoreKeyItem  = { display: "flex", gap: 6, alignItems: "center" };
const scoreKeyRange = { fontWeight: 700, fontSize: 11, borderRadius: 4, padding: "2px 8px" };

const addSessionBar  = { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 };
const addSessionBtn  = { padding: "9px 22px", background: "#3b5fa0", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 6px rgba(59,95,160,0.3)" };
const addSessionHint = { fontSize: 11, color: "#94a3b8" };
const sessionRemoveBtn = { background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", borderRadius: 4, fontSize: 10, fontWeight: 700, padding: "1px 6px", cursor: "pointer", lineHeight: 1.4 };
