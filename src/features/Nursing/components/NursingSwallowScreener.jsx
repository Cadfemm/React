import React, { useState } from "react";

const C = {
  headerBg: "#1e6fa5",
  headerText: "#fff",
  subHeaderBg: "#d0e9f7",
  subHeaderText: "#0c3d5e",
  sectionBg: "#f0f7fc",
  border: "#b2c8d8",
  danger: "#dc2626",
  dangerBg: "#fef2f2",
  dangerBorder: "#fca5a5",
  warning: "#d97706",
  warningBg: "#fffbeb",
  success: "#16a34a",
  successBg: "#f0fdf4",
  successBorder: "#86efac",
  text: "#0f172a",
  muted: "#475569",
  white: "#fff",
  stepBg: "#e8f4f8",
  stepBorder: "#2589c7",
  yesBg: "#fef2f2",
  noBg: "#f0fdf4",
};

const PRE_CRITERIA = [
  "The patient is drowsy and unable to sit upright.",
  "The patient is having chest infection or chesty cough.",
  "The patient's mouth is not clean and has oral thrush.",
];

const OBSERVED_PROBLEMS = [
  "Absent swallow",
  "Water leaks out of mouth",
  "Coughing",
  "Choking",
  "Breathlessness",
  "Wet/gurgly voice",
  "Delayed swallow",
];

const STEPS = [
  { id: 1, label: "Give 1st tsp of water.", bold: "Any problems?" },
  { id: 2, label: "Give 2nd tsp of water.", bold: "Any problems?" },
  { id: 3, label: "Give 3rd tsp of water.", bold: "Any problems?" },
  {
    id: 4,
    label: "Give 90ml of water. No straw. Observe the patient drink ½ glass of water continuously.",
    bold: "Any problems?",
  },
];

const PASS_ACTIONS = [
  "Commence oral diet",
  "Supervise first mealtime and note any swallowing issues",
  "Refer to SLT if any concerns",
  "Repeat screening test if any deterioration in condition",
  "Record oral diet intake",
];

const FAIL_ACTIONS = [
  "Keep patient NBM.",
  "Inform the medical officer (if available)",
  "Refer to SLT.",
  "Continue regular oral care.",
];

const LEGEND = [
  { abbr: "NBM", full: "Nil-by-mouth" },
  { abbr: "SLT", full: "Speech-Language Therapist" },
  { abbr: "tsp", full: "teaspoon" },
];

function YNToggle({ value, onChange, disabled }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {["Y", "N"].map((opt) => (
        <button
          key={opt}
          disabled={disabled}
          onClick={() => !disabled && onChange(opt)}
          style={{
            width: 40,
            height: 32,
            borderRadius: 6,
            border: `2px solid ${
              value === opt
                ? opt === "Y"
                  ? C.danger
                  : C.success
                : C.border
            }`,
            background:
              value === opt
                ? opt === "Y"
                  ? C.dangerBg
                  : C.successBg
                : C.white,
            color:
              value === opt
                ? opt === "Y"
                  ? C.danger
                  : C.success
                : C.muted,
            fontWeight: 700,
            fontSize: 13,
            cursor: disabled ? "default" : "pointer",
            transition: "all 0.15s",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function NursingSwallowScreener({ patient, onBack }) {
  const [pre, setPre] = useState({});
  const [steps, setSteps] = useState({});
  const [problems, setProblems] = useState({});
  const [otherProblem, setOtherProblem] = useState("");
  const [outcome, setOutcome] = useState(null); // "pass" | "refer"
  const [submitted, setSubmitted] = useState(false);

  const preAnswered = PRE_CRITERIA.every((_, i) => pre[i] !== undefined);
  const anyPreYes = PRE_CRITERIA.some((_, i) => pre[i] === "Y");

  // Determine if screening can proceed
  const canScreen = preAnswered && !anyPreYes;

  // Determine if any step has problems
  const anyStepYes = STEPS.some((s) => steps[s.id] === "Y");

  // Auto-determine outcome when all steps answered or a YES hit
  const allStepsAnswered = STEPS.every((s) => steps[s.id] !== undefined);
  const screeningComplete = anyStepYes || allStepsAnswered;
  const autoOutcome = anyStepYes ? "refer" : allStepsAnswered ? "pass" : null;

  const handleSubmit = () => {
    if (!preAnswered) return alert("Please complete all pre-assessment criteria.");
    if (anyPreYes) return alert("Patient does not meet criteria. Keep NBM and refer to SLT.");
    if (!screeningComplete) return alert("Please complete all water swallow steps.");
    setOutcome(autoOutcome);
    setSubmitted(true);
  };

  const handleReset = () => {
    setPre({});
    setSteps({});
    setProblems({});
    setOtherProblem("");
    setOutcome(null);
    setSubmitted(false);
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 40px", fontFamily: "Segoe UI, sans-serif", color: C.text }}>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.headerBg, letterSpacing: 0.5 }}>
          Nursing Swallow Screener
        </div>
        {patient?.name && (
          <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
            Patient: <strong>{patient.name}</strong>
            {patient.id && <span style={{ marginLeft: 12 }}>ID: {patient.id}</span>}
          </div>
        )}
      </div>

      {/* ── PRE-ASSESSMENT CRITERIA ── */}
      <Section title="PRE-ASSESSMENT CRITERIA">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th("left", "70%")}>Criteria</th>
              <th style={th("center", "30%")}>Response</th>
            </tr>
          </thead>
          <tbody>
            {PRE_CRITERIA.map((crit, i) => (
              <tr key={i} style={{ background: pre[i] === "Y" ? C.dangerBg : pre[i] === "N" ? C.noBg : C.white }}>
                <td style={td("left")}>{crit}</td>
                <td style={{ ...td("center") }}>
                  <YNToggle value={pre[i]} onChange={(v) => setPre((p) => ({ ...p, [i]: v }))} disabled={submitted} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {preAnswered && anyPreYes && (
          <AlertBox type="danger">
            <strong>NOT SAFE to proceed.</strong> If you answer YES to any statement, keep the patient NBM, refer to SLT, and continue with regular oral care.
          </AlertBox>
        )}
        {preAnswered && !anyPreYes && (
          <AlertBox type="success">
            All criteria answered NO — you may proceed with the water swallow screening.
          </AlertBox>
        )}
      </Section>

      {/* ── WATER SWALLOW SCREENING ── */}
      {canScreen && (
        <Section title="WATER SWALLOW SCREENING" subtitle="Please tick [✓] the boxes accordingly.">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>

            {/* Left: Steps */}
            <div style={{ flex: "1 1 580px" }}>
              {STEPS.map((step, idx) => {
                const prevBlocked = idx > 0 && steps[STEPS[idx - 1].id] === "Y";
                const isBlocked = prevBlocked || (idx > 0 && steps[STEPS[idx - 1].id] === undefined);
                const isActive = !isBlocked;
                const answered = steps[step.id] !== undefined;

                return (
                  <div key={step.id} style={{ marginBottom: 10 }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 14px", borderRadius: 8,
                      border: `2px solid ${answered ? (steps[step.id] === "Y" ? C.danger : C.stepBorder) : C.border}`,
                      background: answered ? (steps[step.id] === "Y" ? C.dangerBg : C.stepBg) : isActive ? C.white : "#f8fafc",
                      opacity: isActive ? 1 : 0.45,
                    }}>
                      <input
                        type="checkbox"
                        checked={answered}
                        readOnly
                        style={{ width: 16, height: 16, accentColor: C.headerBg }}
                      />
                      <div style={{ flex: 1, fontSize: 13 }}>
                        {step.label} <strong>{step.bold}</strong>
                      </div>
                      <YNToggle
                        value={steps[step.id]}
                        onChange={(v) => !submitted && isActive && setSteps((s) => ({ ...s, [step.id]: v }))}
                        disabled={submitted || !isActive}
                      />
                    </div>
                    {idx < STEPS.length - 1 && steps[step.id] === "N" && (
                      <div style={{ textAlign: "center", fontSize: 11, color: C.muted, margin: "2px 0", fontStyle: "italic" }}>↓ NO</div>
                    )}
                    {steps[step.id] === "Y" && (
                      <div style={{ textAlign: "right", fontSize: 11, color: C.danger, margin: "2px 0", fontStyle: "italic" }}>YES →</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Observed Problems + Actions */}
            <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Observed problems box */}
              <div style={{
                border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px",
                background: C.white, minHeight: 180,
              }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: C.headerBg, marginBottom: 8 }}>
                  Observed Problem(s):
                </div>
                {OBSERVED_PROBLEMS.map((p) => (
                  <label key={p} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, fontSize: 12, cursor: submitted ? "default" : "pointer" }}>
                    <input
                      type="checkbox"
                      checked={!!problems[p]}
                      disabled={submitted || !anyStepYes}
                      onChange={(e) => setProblems((prev) => ({ ...prev, [p]: e.target.checked }))}
                      style={{ width: 13, height: 13, accentColor: C.danger }}
                    />
                    {p}
                  </label>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                  <input
                    type="checkbox"
                    checked={!!problems["other"]}
                    disabled={submitted || !anyStepYes}
                    onChange={(e) => setProblems((prev) => ({ ...prev, other: e.target.checked }))}
                    style={{ width: 13, height: 13, accentColor: C.danger }}
                  />
                  <span style={{ fontSize: 12 }}>Other:</span>
                  <input
                    type="text"
                    value={otherProblem}
                    disabled={submitted || !anyStepYes}
                    onChange={(e) => setOtherProblem(e.target.value)}
                    placeholder="Please indicate"
                    style={{ flex: 1, fontSize: 11, border: `1px solid ${C.border}`, borderRadius: 4, padding: "2px 6px" }}
                  />
                </div>
              </div>

              {/* Fail actions */}
              <div style={{
                border: `1.5px solid ${C.dangerBorder}`, borderRadius: 8, padding: "10px 14px",
                background: C.dangerBg,
              }}>
                <div style={{ fontWeight: 700, fontSize: 12, color: C.danger, marginBottom: 6 }}>If YES to any step:</div>
                {FAIL_ACTIONS.map((a, i) => (
                  <div key={i} style={{ fontSize: 12, color: C.text, marginBottom: 3 }}>• {a}</div>
                ))}
              </div>

              {/* Legend */}
              <div style={{
                border: `1.5px dashed ${C.border}`, borderRadius: 8, padding: "8px 12px",
                background: "#fafcfe",
              }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: C.muted, marginBottom: 4 }}>LEGEND:</div>
                {LEGEND.map((l, i) => (
                  <div key={i} style={{ fontSize: 11, color: C.muted }}>{i + 1}. <strong>{l.abbr}</strong>: {l.full}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Pass actions */}
          {allStepsAnswered && !anyStepYes && (
            <div style={{
              marginTop: 12, border: `1.5px solid ${C.successBorder}`, borderRadius: 8,
              padding: "12px 16px", background: C.successBg,
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.success, marginBottom: 8 }}>
                ✓ All steps passed — NO problems observed:
              </div>
              {PASS_ACTIONS.map((a, i) => (
                <div key={i} style={{ fontSize: 13, color: C.text, marginBottom: 4 }}>• {a}</div>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* ── OUTCOME ── */}
      {canScreen && screeningComplete && !submitted && (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
          <button onClick={handleReset} style={btnSecondary}>Reset</button>
          <button onClick={handleSubmit} style={btnPrimary}>Submit Screening</button>
        </div>
      )}

      {submitted && outcome && (
        <Section title="Screening Outcome">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
            <OutcomeBox label="PASS screening" active={outcome === "pass"} color={C.success} activeBg={C.successBg} />
            <OutcomeBox label="REFER to SLT" active={outcome === "refer"} color={C.danger} activeBg={C.dangerBg} />
          </div>
          {outcome === "pass" && (
            <AlertBox type="success" style={{ marginTop: 12 }}>
              Patient <strong>PASSED</strong> the swallow screening. Commence oral diet and supervise first mealtime.
            </AlertBox>
          )}
          {outcome === "refer" && (
            <AlertBox type="danger" style={{ marginTop: 12 }}>
              Patient <strong>FAILED</strong> swallow screening. Keep NBM, notify MO, and refer to SLT immediately.
            </AlertBox>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
            <button onClick={handleReset} style={btnSecondary}>New Screening</button>
            {onBack && <button onClick={onBack} style={btnPrimary}>Back</button>}
          </div>
        </Section>
      )}
    </div>
  );
}

/* ── Helpers ── */
function Section({ title, subtitle, children }) {
  return (
    <div style={{ marginBottom: 20, border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
      <div style={{ background: C.headerBg, color: C.headerText, padding: "10px 16px" }}>
        <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 0.3 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, fontStyle: "italic", marginTop: 2, color: "#cce4f5" }}>{subtitle}</div>}
      </div>
      <div style={{ padding: "14px 16px", background: C.white }}>{children}</div>
    </div>
  );
}

function AlertBox({ type, children }) {
  const styles = {
    danger: { bg: C.dangerBg, border: C.dangerBorder, color: C.danger },
    success: { bg: C.successBg, border: C.successBorder, color: C.success },
    warning: { bg: C.warningBg, border: "#fcd34d", color: C.warning },
  };
  const s = styles[type] || styles.warning;
  return (
    <div style={{
      marginTop: 10, padding: "10px 14px", borderRadius: 8,
      border: `1.5px solid ${s.border}`, background: s.bg, color: s.color, fontSize: 13,
    }}>
      {children}
    </div>
  );
}

function OutcomeBox({ label, active, color, activeBg }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, padding: "12px 20px",
      border: `2px solid ${active ? color : C.border}`, borderRadius: 10,
      background: active ? activeBg : C.white, minWidth: 200,
    }}>
      <div style={{
        width: 22, height: 22, border: `2px solid ${active ? color : C.border}`,
        borderRadius: 4, background: active ? color : C.white,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {active && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✓</span>}
      </div>
      <span style={{ fontWeight: 700, fontSize: 14, color: active ? color : C.muted }}>{label}</span>
    </div>
  );
}

function th(align, width) {
  return {
    background: C.subHeaderBg, color: C.subHeaderText, fontWeight: 700,
    fontSize: 12, padding: "8px 12px", border: `1px solid ${C.border}`,
    textAlign: align, width,
  };
}

function td(align) {
  return {
    padding: "8px 12px", border: `1px solid ${C.border}`,
    fontSize: 13, textAlign: align, verticalAlign: "middle",
  };
}

const btnPrimary = {
  background: C.headerBg, color: "#fff", border: "none",
  borderRadius: 7, padding: "9px 22px", fontWeight: 700,
  fontSize: 13, cursor: "pointer",
};

const btnSecondary = {
  background: C.white, color: C.headerBg, border: `2px solid ${C.headerBg}`,
  borderRadius: 7, padding: "9px 22px", fontWeight: 700,
  fontSize: 13, cursor: "pointer",
};
