import React, { useState } from "react";

const C = {
  primary: "#1a6b8a",
  primaryDark: "#0d3d52",
  primaryLight: "#e8f4f8",
  subHeader: "#d0e9f7",
  border: "#b2c8d8",
  danger: "#dc2626",
  dangerBg: "#fef2f2",
  dangerBorder: "#fca5a5",
  success: "#16a34a",
  successBg: "#f0fdf4",
  successBorder: "#86efac",
  warning: "#d97706",
  warningBg: "#fffbeb",
  text: "#0f172a",
  muted: "#475569",
  white: "#fff",
};

const SIGNS = [
  "No or delayed swallow?",
  "Immediate or delayed coughing?",
  "Choking?",
  'Change in voice quality? (Check by asking patient to say "aaah")',
  "Change in breathing pattern, or increased breathlessness whilst sipping?",
];

function YNBox({ value, onChange, disabled }) {
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      {["YES", "NO"].map((opt) => (
        <label key={opt} style={{ display: "flex", alignItems: "center", gap: 6, cursor: disabled ? "default" : "pointer", fontWeight: 700, fontSize: 13 }}>
          <div
            onClick={() => !disabled && onChange(opt)}
            style={{
              width: 20, height: 20, border: `2px solid ${value === opt ? (opt === "YES" ? C.danger : C.success) : C.border}`,
              borderRadius: 3, background: value === opt ? (opt === "YES" ? C.danger : C.success) : C.white,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: disabled ? "default" : "pointer",
              transition: "all 0.15s",
            }}
          >
            {value === opt && <span style={{ color: "#fff", fontSize: 13, lineHeight: 1 }}>✓</span>}
          </div>
          <span style={{ color: value === opt ? (opt === "YES" ? C.danger : C.success) : C.muted }}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

function Section({ label, sublabel, children, accent }) {
  return (
    <div style={{ border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 18 }}>
      <div style={{ background: accent || C.primary, padding: "10px 18px" }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: C.white }}>{label}</div>
        {sublabel && <div style={{ fontSize: 11, color: "#cce4f5", marginTop: 2, fontStyle: "italic" }}>{sublabel}</div>}
      </div>
      <div style={{ padding: "16px 18px", background: C.white }}>{children}</div>
    </div>
  );
}

function AlertBox({ type, children }) {
  const map = {
    danger:  { bg: C.dangerBg,  border: C.dangerBorder,  color: C.danger },
    success: { bg: C.successBg, border: C.successBorder, color: C.success },
    warning: { bg: C.warningBg, border: "#fcd34d",       color: C.warning },
    info:    { bg: C.primaryLight, border: C.border,     color: C.primaryDark },
  };
  const s = map[type] || map.info;
  return (
    <div style={{ padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${s.border}`, background: s.bg, color: s.color, fontSize: 13, marginTop: 10 }}>
      {children}
    </div>
  );
}

function SignsTable({ values, onChange, disabled, prefix }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
      <thead>
        <tr>
          <th style={{ background: C.subHeader, color: C.primaryDark, padding: "8px 14px", fontSize: 12, fontWeight: 700, border: `1px solid ${C.border}`, textAlign: "left", width: "60%" }}>
            Sign
          </th>
          <th style={{ background: C.subHeader, color: C.primaryDark, padding: "8px 14px", fontSize: 12, fontWeight: 700, border: `1px solid ${C.border}`, textAlign: "center" }}>
            Response
          </th>
        </tr>
      </thead>
      <tbody>
        {SIGNS.map((sign, i) => {
          const key = `${prefix}_sign_${i}`;
          const isYes = values[key] === "YES";
          return (
            <tr key={i} style={{ background: isYes ? C.dangerBg : i % 2 === 0 ? C.white : "#f7fbfd" }}>
              <td style={{ padding: "10px 14px", border: `1px solid ${C.border}`, fontSize: 13, color: C.text }}>{sign}</td>
              <td style={{ padding: "10px 14px", border: `1px solid ${C.border}`, textAlign: "center" }}>
                <YNBox value={values[key]} onChange={(v) => onChange(key, v)} disabled={disabled} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function WaterSwallowTest({ patient, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => setValues((p) => ({ ...p, [k]: v }));

  // Part 1A logic
  const a1 = values.a1; // alert 10 min
  const a2 = values.a2; // upright
  const partAFail = a1 === "NO" || a2 === "NO";
  const partAPass = a1 === "YES" && a2 === "YES";

  // Part 1B logic
  const b1 = values.b1; // hoarse/wet/weak/absent voice
  const b2 = values.b2; // unable to deal with oral secretions
  const partBFail = b1 === "YES" || b2 === "YES";
  const partBPass = b1 === "NO" && b2 === "NO";

  const canProceedPart2 = partAPass && partBPass;

  // Part 2 — teaspoon signs
  const tspAnyYes = SIGNS.some((_, i) => values[`tsp_sign_${i}`] === "YES");
  const tspAllAnswered = SIGNS.every((_, i) => values[`tsp_sign_${i}`] !== undefined);

  // Part 2 — sips signs
  const sipAnyYes = SIGNS.some((_, i) => values[`sip_sign_${i}`] === "YES");
  const sipAllAnswered = SIGNS.every((_, i) => values[`sip_sign_${i}`] !== undefined);

  const canProceedSips = canProceedPart2 && tspAllAnswered && !tspAnyYes;
  const testComplete = tspAnyYes || (tspAllAnswered && sipAllAnswered);

  const outcome = tspAnyYes || sipAnyYes ? "refer" : testComplete ? "pass" : null;

  const handleSubmit = () => {
    if (!testComplete) return alert("Please complete all sections before submitting.");
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 40px", fontFamily: "Segoe UI, sans-serif", color: C.text }}>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: C.primary, letterSpacing: 0.5 }}>Water Swallow Test</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4, maxWidth: 700, margin: "6px auto 0" }}>
          To be carried out with patients admitted with acute Stroke or Transient Ischemic Attack symptoms
          within <strong>4 hours</strong> of admission to ED / CAU by a nurse trained in the procedure.
        </div>
        {patient?.name && (
          <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>
            Patient: <strong>{patient.name}</strong>
            {patient.id && <span style={{ marginLeft: 12 }}>ID: {patient.id}</span>}
          </div>
        )}
      </div>

      {/* ── PART 1A ── */}
      <Section label="Part 1A — Pre-Assessment Criteria" sublabel="Patient alertness and positioning">
        <CriteriaRow
          label="A1) Is the patient consistently alert for 10 minutes?"
          value={a1} onChange={(v) => set("a1", v)} disabled={submitted}
        />
        <CriteriaRow
          label="A2) Is the patient able to be supported in an upright position?"
          value={a2} onChange={(v) => set("a2", v)} disabled={submitted}
        />
        {partAFail && (
          <AlertBox type="danger">
            <strong>STOP.</strong> If NO to either — Record the patient <strong>NIL BY MOUTH</strong>. Repeat daily until the patient's clinical condition improves.
          </AlertBox>
        )}
        {partAPass && (
          <AlertBox type="info">
            <strong>Before proceeding:</strong> Check the patient's mouth and perform and maintain oral hygiene as required.
          </AlertBox>
        )}
      </Section>

      {/* ── PART 1B ── */}
      {partAPass && (
        <Section label="Part 1B — Voice & Secretion Check" sublabel="Does the patient show any sign of:">
          <CriteriaRow
            label="B1) A hoarse, wet, weak or absent voice?"
            value={b1} onChange={(v) => set("b1", v)} disabled={submitted}
          />
          <CriteriaRow
            label="B2) Being unable to deal with own oral secretions?"
            value={b2} onChange={(v) => set("b2", v)} disabled={submitted}
          />
          {partBFail && (
            <AlertBox type="danger">
              <strong>STOP.</strong> If YES to either — Record the patient <strong>NIL BY MOUTH</strong> and refer to Speech and Language Therapy.
            </AlertBox>
          )}
          {partBPass && (
            <AlertBox type="success">
              Criteria met — proceed to Part 2: Water Swallow Test.
            </AlertBox>
          )}
        </Section>
      )}

      {/* ── PART 2: TEASPOON ── */}
      {canProceedPart2 && (
        <Section
          label="Part 2 — Teaspoon Water Test"
          sublabel="Give the patient a teaspoon of water, watch for swallow and observe. (Do this 3 times.)"
        >
          <p style={{ fontSize: 13, color: C.muted, margin: "0 0 8px" }}>
            Does the patient show any signs of the following?
          </p>
          <SignsTable values={values} onChange={set} disabled={submitted} prefix="tsp" />
          {tspAnyYes && (
            <AlertBox type="danger">
              <strong>STOP.</strong> If YES to any of the above — Record the patient <strong>NIL BY MOUTH</strong> and refer to Speech and Language Therapy (SLT).
            </AlertBox>
          )}
          {tspAllAnswered && !tspAnyYes && (
            <AlertBox type="success">
              No signs observed — proceed to the controlled sips test.
            </AlertBox>
          )}
        </Section>
      )}

      {/* ── PART 2: SIPS ── */}
      {canProceedSips && (
        <Section
          label="Part 2 — Controlled Sips Test"
          sublabel="Observe the patient taking several controlled sips (minimum of 3) from a glass of water."
        >
          <p style={{ fontSize: 13, color: C.muted, margin: "0 0 8px" }}>
            Does the patient show signs of any of the following?
          </p>
          <SignsTable values={values} onChange={set} disabled={submitted} prefix="sip" />
          {sipAnyYes && (
            <AlertBox type="danger">
              <strong>STOP.</strong> If YES to any of the above — Record the patient <strong>NIL BY MOUTH</strong> and refer to Speech and Language Therapy (SLT).
            </AlertBox>
          )}
          {sipAllAnswered && !sipAnyYes && (
            <AlertBox type="success">
              No difficulties observed — patient may proceed with diet and fluids.
            </AlertBox>
          )}
        </Section>
      )}

      {/* ── PASS OUTCOME ── */}
      {canProceedSips && sipAllAnswered && !sipAnyYes && (
        <Section label="If there are no difficulties:" accent={C.success}>
          {[
            "Allow the patient to commence with diet and thin fluids (Level 0).",
            "Ensure the patient initially selects Level 6 diet from the normal menu.",
            "Supervise the patient with a Level 6 main course. If the patient is managing to chew and swallow fully then resume Regular / Level 7 diet. If any difficulties are observed refer to Speech and Language Therapy for a full clinical swallowing assessment.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: C.success, fontWeight: 700, marginTop: 1 }}>›</span>
              <span>{item}</span>
            </div>
          ))}
        </Section>
      )}

      {/* ── SIGN OFF ── */}
      {testComplete && !submitted && (
        <Section label="Sign Off">
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-end" }}>
            <Field label="Initials" name="initials" value={values.initials || ""} onChange={(v) => set("initials", v)} width={200} />
            <Field label="Time" name="time" type="time" value={values.time || ""} onChange={(v) => set("time", v)} width={160} />
            <Field label="Date" name="date" type="date" value={values.date || ""} onChange={(v) => set("date", v)} width={180} />
          </div>
        </Section>
      )}

      {/* ── OUTCOME ── */}
      {submitted && outcome && (
        <Section label="Test Outcome">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
            <OutcomeBox label="PASS — Proceed with diet" active={outcome === "pass"} color={C.success} bg={C.successBg} />
            <OutcomeBox label="REFER to SLT — NIL BY MOUTH" active={outcome === "refer"} color={C.danger} bg={C.dangerBg} />
          </div>
          {outcome === "pass" && (
            <AlertBox type="success">Patient <strong>PASSED</strong> the Water Swallow Test. Commence diet as per protocol.</AlertBox>
          )}
          {outcome === "refer" && (
            <AlertBox type="danger">Patient <strong>FAILED</strong>. Keep NIL BY MOUTH and refer to Speech and Language Therapy immediately.</AlertBox>
          )}
        </Section>
      )}

      {/* ── NB ── */}
      <div style={{ border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "14px 18px", background: "#f8fafc", marginBottom: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>N.B.</div>
        <p style={{ fontSize: 12, color: C.muted, margin: "0 0 6px" }}>
          The water swallow test is used to identify new Stroke patients who are at risk of aspiration and require a full clinical assessment by an SLT before commencing oral intake.
        </p>
        <p style={{ fontSize: 12, color: C.muted, margin: "0 0 4px", fontWeight: 600 }}>Therefore it must NOT be:</p>
        <div style={{ fontSize: 12, color: C.muted }}>• Repeated <u>after</u> assessment by an SLT.</div>
        <div style={{ fontSize: 12, color: C.muted }}>• Carried out on patients who show symptoms of dysphagia but are not being investigated for Stroke i.e. are not under Stroke protocol.</div>
      </div>

      {/* ── ACTIONS ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        {onBack && <button onClick={onBack} style={btnSecondary}>Back</button>}
        {!submitted && testComplete && (
          <button onClick={handleSubmit} style={btnPrimary}>Submit Test</button>
        )}
        {submitted && (
          <button onClick={() => { setValues({}); setSubmitted(false); }} style={btnSecondary}>New Test</button>
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function CriteriaRow({ label, value, onChange, disabled }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 14px", borderRadius: 8, marginBottom: 8,
      border: `1px solid ${value === "YES" ? (label.startsWith("A") ? C.successBorder : C.dangerBorder) : value === "NO" ? (label.startsWith("A") ? C.dangerBorder : C.successBorder) : C.border}`,
      background: value ? (value === "YES" ? C.successBg : C.dangerBg) : "#f7fbfd",
    }}>
      <span style={{ fontSize: 13, color: C.text, flex: 1, paddingRight: 20 }}>{label}</span>
      <YNBox value={value} onChange={onChange} disabled={disabled} />
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, width = 180 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>{label}</label>
      <input
        type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width, padding: "7px 10px", border: `1.5px solid ${C.border}`, borderRadius: 6, fontSize: 13, color: C.text }}
      />
    </div>
  );
}

function OutcomeBox({ label, active, color, bg }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, padding: "12px 20px",
      border: `2px solid ${active ? color : C.border}`, borderRadius: 10,
      background: active ? bg : C.white, minWidth: 240,
    }}>
      <div style={{
        width: 22, height: 22, border: `2px solid ${active ? color : C.border}`,
        borderRadius: 4, background: active ? color : C.white,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {active && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✓</span>}
      </div>
      <span style={{ fontWeight: 700, fontSize: 13, color: active ? color : C.muted }}>{label}</span>
    </div>
  );
}

const btnPrimary = {
  background: C.primary, color: "#fff", border: "none",
  borderRadius: 7, padding: "9px 24px", fontWeight: 700, fontSize: 13, cursor: "pointer",
};

const btnSecondary = {
  background: C.white, color: C.primary, border: `2px solid ${C.primary}`,
  borderRadius: 7, padding: "9px 24px", fontWeight: 700, fontSize: 13, cursor: "pointer",
};
