import React from "react";

/**
 * ATV Rehabilitation Therapy: Informed Consent & Release Form
 * Compliance: Malaysian Medical Council (MMC) Guidelines & PDPA 2010
 * Used by both Wall Climbing and Dry Needling assessments.
 */
export default function ATVConsentForm({ patient, values = {}, onChange, onSubmit, submitted = false }) {
  const set = (name, value) => onChange?.(name, value);
  const check = (name) => Array.isArray(values[name]) ? values[name] : [];
  const toggle = (name, val) => {
    const current = check(name);
    const next = current.includes(val)
      ? current.filter(v => v !== val)
      : [...current, val];
    set(name, next);
  };

  const handleSubmit = () => {
    if (!values.patient_sig_name) {
      alert("Please fill in the patient / legal guardian name before submitting.");
      return;
    }
    onSubmit?.(values);
  };

  return (
    <div style={wrap}>
      <h2 style={title}>ATV REHABILITATION THERAPY: INFORMED CONSENT &amp; RELEASE FORM</h2>
      <p style={subtitle}>
        <b>Compliance: Malaysian Medical Council (MMC) Guidelines &amp; Personal Data Protection Act (PDPA) 2010</b>
      </p>
      <hr style={divider} />

      {/* ── PATIENT INFORMATION ── */}
      {/* <section style={section}>
        <h3 style={sectionTitle}>PATIENT INFORMATION</h3>
        <div style={grid}>
          <Field label="Full Name (as per IC/Passport)" value={patient?.name || ""} readOnly />
          <Field label="IC No." value={patient?.id || ""} readOnly />
          <Field label="Passport No. (if applicable)" value={patient?.passport_no || ""} readOnly />
          <Field label="Age" value={patient?.age || ""} readOnly />
          <Field label="Primary Diagnosis" value={patient?.diagnosis_history || ""} readOnly />
        </div>
      </section> */}
      <hr style={divider} />

      {/* ── NATURE OF REHABILITATION ACTIVITY ── */}
      <section style={section}>
        <h3 style={sectionTitle}>NATURE OF REHABILITATION ACTIVITY</h3>
        <p style={para}>
          I understand that the All-Terrain Vehicle (ATV) activity is part of a structured rehabilitation
          program designed to improve my motor coordination, balance, and cognitive processing.
        </p>
        <p style={para}>
          I acknowledge that this activity will be supervised by a qualified therapist or healthcare
          professional, with appropriate safety measures and standard operating procedures (SOPs) in place.
        </p>
      </section>
      <hr style={divider} />

      {/* ── CLINICAL ASSESSMENT & RISKS ── */}
      <section style={section}>
        <h3 style={sectionTitle}>CLINICAL ASSESSMENT &amp; RISKS</h3>
        <p style={para}>I acknowledge that I have been informed of the following:</p>
        <ul style={list}>
          <li><b>Benefits:</b> Potential improvement in core stability, reaction time, and therapeutic engagement.</li>
          <li><b>Inherent Risks:</b> Including but not limited to falls, muscle strain, collisions, loss of control, or injury due to terrain conditions or mechanical factors.</li>
          <li><b>Medical Clearance:</b> A pre-activity clinical assessment has been conducted, and I have been deemed fit to participate.</li>
          <li>
            <b>Specific Complications:</b> Risks related to my condition include:
            <input
              type="text"
              value={values.specific_complications || ""}
              onChange={e => set("specific_complications", e.target.value)}
              style={inlineInput}
              placeholder="Specify..."
            />
          </li>
        </ul>
        <p style={para}>I confirm that:</p>
        <CheckItem name="confirm_explanation"  label="I have received adequate explanation"          values={values} toggle={toggle} />
        <CheckItem name="confirm_understand"   label="I understand the information provided"         values={values} toggle={toggle} />
        <CheckItem name="confirm_questions"    label="I have had the opportunity to ask questions"   values={values} toggle={toggle} />
      </section>
      <hr style={divider} />

      {/* ── SAFETY COMPLIANCE ── */}
      <section style={section}>
        <h3 style={sectionTitle}>SAFETY COMPLIANCE</h3>
        <p style={para}>I agree to:</p>
        <CheckItem name="safety_instructions" label="Follow all instructions given by the therapist"                              values={values} toggle={toggle} />
        <CheckItem name="safety_equipment"    label="Use all required safety equipment (e.g., helmet, protective gear)"           values={values} toggle={toggle} />
        <CheckItem name="safety_inform"       label="Inform staff immediately if I feel unwell or unsafe during the activity"     values={values} toggle={toggle} />
      </section>
      <hr style={divider} />

      {/* ── PDPA CONSENT ── */}
      <section style={section}>
        <h3 style={sectionTitle}>PDPA CONSENT (PERSONAL DATA PROTECTION ACT 2010)</h3>
        <p style={para}>
          I hereby consent to the collection, use, storage, and processing of my personal and medical
          data by Pusat Rehabilitasi PERKESO for purposes including treatment, rehabilitation planning,
          monitoring, audit, and clinical documentation in accordance with the PDPA 2010.
        </p>
        <p style={para}>
          I understand that my information may be disclosed to authorised healthcare personnel or
          relevant authorities where required by law.
        </p>
        <CheckItem name="pdpa_consent" label="I consent to the above PDPA terms" values={values} toggle={toggle} />
      </section>
      <hr style={divider} />

      {/* ── VOLUNTARY PARTICIPATION & RELEASE ── */}
      <section style={section}>
        <h3 style={sectionTitle}>VOLUNTARY PARTICIPATION &amp; RELEASE</h3>
        <CheckItem name="voluntary_withdraw"  label="I am participating voluntarily and may withdraw at any time without affecting my access to standard care."                                                                                values={values} toggle={toggle} />
        <CheckItem name="voluntary_risks"     label="I acknowledge and accept the inherent risks associated with this activity."                                                                                                              values={values} toggle={toggle} />
        <CheckItem name="voluntary_liability" label="To the extent permitted by law, I agree that Pusat Rehabilitasi PERKESO and its staff shall not be held liable for any injury sustained, except in cases of proven negligence or misconduct." values={values} toggle={toggle} />
      </section>
      <hr style={divider} />

      {/* ── SIGNATURES ── */}
      <section style={section}>
        <h3 style={sectionTitle}>SIGNATURES</h3>

        <div style={sigBlock}>
          <p style={sigLabel}><b>Patient / Legal Guardian:</b></p>
          <div style={sigRow}>
            <SigField label="Name"        name="patient_sig_name"  values={values} set={set} />
            <SigField label="Date"        name="patient_sig_date"  values={values} set={set} type="date" />
            <SigField label="Time"        name="patient_sig_time"  values={values} set={set} type="time" />
          </div>
          <p style={{ ...para, fontStyle: "italic", marginTop: 4 }}>
            (If minor or lacking capacity in accordance with applicable law)
          </p>
        </div>

        <div style={{ ...sigBlock, marginTop: 20 }}>
          <p style={sigLabel}><b>Therapist / Medical Officer:</b></p>
          <div style={sigRow}>
            <SigField label="Name"        name="therapist_sig_name"        values={values} set={set} />
            <SigField label="Designation" name="therapist_sig_designation" values={values} set={set} />
            <SigField label="Date"        name="therapist_sig_date"        values={values} set={set} type="date" />
            <SigField label="Time"        name="therapist_sig_time"        values={values} set={set} type="time" />
          </div>
          <p style={{ ...para, marginTop: 8 }}>
            I certify that I have explained the nature, benefits, and risks of the activity to the patient/guardian.
          </p>
        </div>
      </section>

      <hr style={divider} />

      {/* ── SUBMIT / SUBMITTED ── */}
      {submitted ? (
        <div style={submittedBanner}>
          <span style={{ fontSize: 22 }}>✅</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#166534" }}>ATV Consent Submitted</div>
            <div style={{ fontSize: 13, color: "#166534", marginTop: 2 }}>
              This form has been signed and submitted successfully.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
          <button type="button" style={submitBtn} onClick={handleSubmit}>
            Submit ATV Consent
          </button>
        </div>
      )}
    </div>
  );
}

/* ── helpers ── */
function CheckItem({ name, label, values, toggle }) {
  const checked = Array.isArray(values[name]) && values[name].includes("yes");
  return (
    <label style={checkRow}>
      <input type="checkbox" checked={checked} onChange={() => toggle(name, "yes")} />
      <span style={{ fontSize: 14 }}>{label}</span>
    </label>
  );
}

function Field({ label, value, readOnly }) {
  return (
    <div style={fieldWrap}>
      <div style={fieldLabel}>{label}</div>
      <input
        type="text"
        value={value}
        readOnly={readOnly}
        style={{ ...fieldInput, background: readOnly ? "#f3f4f6" : "#fff" }}
      />
    </div>
  );
}

function SigField({ label, name, values, set, type = "text" }) {
  return (
    <div style={fieldWrap}>
      <div style={fieldLabel}>{label}</div>
      <input
        type={type}
        value={values[name] || ""}
        onChange={e => set(name, e.target.value)}
        style={fieldInput}
      />
    </div>
  );
}

/* ── styles ── */
const wrap = {
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: "24px 28px",
  background: "#fff",
  marginBottom: 16,
};

const title = { fontSize: 18, fontWeight: 800, margin: "0 0 6px", color: "#111827" };
const subtitle = { fontSize: 13, margin: "0 0 12px", color: "#374151" };
const divider = { border: "none", borderTop: "1px solid #d1d5db", margin: "16px 0" };
const section = { marginBottom: 8 };
const sectionTitle = { fontSize: 15, fontWeight: 700, margin: "0 0 10px", color: "#111827", textTransform: "uppercase" };
const para = { fontSize: 14, color: "#374151", margin: "0 0 8px", lineHeight: 1.6 };
const list = { fontSize: 14, color: "#374151", paddingLeft: 20, margin: "0 0 10px", lineHeight: 1.8 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 };
const fieldWrap = { display: "flex", flexDirection: "column", gap: 4 };
const fieldLabel = { fontSize: 12, fontWeight: 600, color: "#6b7280" };
const fieldInput = { padding: "7px 10px", borderRadius: 5, border: "1px solid #d1d5db", fontSize: 14, width: "100%" };
const checkRow = { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8, cursor: "pointer" };
const inlineInput = { marginLeft: 8, padding: "3px 8px", borderRadius: 4, border: "1px solid #d1d5db", fontSize: 14, width: 260 };
const sigBlock = {};
const sigLabel = { fontSize: 14, margin: "0 0 8px" };
const sigRow = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 };

const submitBtn = {
  padding: "11px 28px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 7,
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  letterSpacing: 0.2,
};

const submittedBanner = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: "14px 18px",
  background: "#f0fdf4",
  border: "1px solid #86efac",
  borderRadius: 8,
  marginTop: 8,
};
