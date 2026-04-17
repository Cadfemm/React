import React, { useState, useEffect } from "react";
import { FaChevronRight, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaCalendarAlt, FaEye, FaHeartbeat } from "react-icons/fa";

/* pull previous assessment from localStorage */
function usePrev(id) {
  const [d, setD] = useState(null);
  useEffect(() => {
    try {
      const r = localStorage.getItem(`optometry_assessment_draft_${id}`);
      if (r) setD(JSON.parse(r)?.values || null);
    } catch {}
  }, [id]);
  return d;
}

/* previous visit data (mock — replace with real API when available) */
const PREV_VISITS = [
  { no: 1, date: "15 Jan 2026", type: "Initial Assessment", vaR: "6/18", vaL: "6/12", iopR: 16, iopL: 15, status: "Completed" },
  { no: 2, date: "18 Feb 2026", type: "Follow-up #1",       vaR: "6/12", vaL: "6/9",  iopR: 15, iopL: 14, status: "Completed" },
  { no: 3, date: "20 Mar 2026", type: "Follow-up #2",       vaR: "6/9",  vaL: "6/7.5",iopR: 14, iopL: 13, status: "Completed" },
];

export default function OptometryFollowUpDashboard({ patient, onStartSOAP, onBack }) {
  const prev    = usePrev(patient?.id);
  const today   = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const initials = ((patient?.name || "P").split(" ").map(w => w[0]).join("").slice(0, 2)).toUpperCase();
  const allergy  = prev?.allergies_from_registration || patient?.allergies;
  const lastVisit = PREV_VISITS[PREV_VISITS.length - 1];

  return (
    <div style={{ minHeight: "100%", background: "#f0f7ff", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={onBack} className="dash-btn-outline"
            style={{ padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            ← Back
          </button>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg,#0f766e,#14b8a6)", color: "#fff", fontSize: 16, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {initials}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 19, fontWeight: 800, color: "#0f172a" }}>{patient?.name || patient?.email}</span>
              <span style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>Follow-up Visit</span>
              {allergy && <span style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>⚠ Allergy on file</span>}
            </div>
            <div style={{ fontSize: 12, color: "#64748b", display: "flex", gap: 16 }}>
              {patient?.mrn    && <span>MRN: <strong style={{ color: "#334155" }}>{patient.mrn}</strong></span>}
              {patient?.age    && <span>Age: <strong style={{ color: "#334155" }}>{patient.age} yrs</strong></span>}
              {patient?.gender && <span>Gender: <strong style={{ color: "#334155" }}>{patient.gender}</strong></span>}
              {patient?.icd    && <span>ICD: <strong style={{ color: "#334155" }}>{patient.icd}</strong></span>}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>Visit Date</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>{today}</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>Follow-up #{PREV_VISITS.length + 1}</div>
          </div>
          {/* <button onClick={onStartSOAP}
            onMouseEnter={e => e.currentTarget.style.background = "#0f766e"}
            onMouseLeave={e => e.currentTarget.style.background = "#0d9488"}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, background: "#0d9488", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 12px rgba(13,148,136,0.25)" }}>
            Start SOAP Assessment <FaChevronRight size={12} />
          </button> */}
        </div>
      </div>

      {/* ── Summary bar ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", display: "grid", gridTemplateColumns: "repeat(5,1fr)" }}>
        {[
          { k: "Total Visits",  v: String(PREV_VISITS.length + 1),                    c: "#2563eb" },
          { k: "Last Visit",    v: lastVisit.date,                                     c: "#0d9488" },
          { k: "Last VA (R/L)", v: `${lastVisit.vaR} / ${lastVisit.vaL}`,             c: "#7c3aed" },
          { k: "Last IOP (R/L)",v: `${lastVisit.iopR} / ${lastVisit.iopL} mmHg`,      c: "#ea580c" },
          { k: "Allergies",     v: allergy ? "⚠ On File" : "✓ None",                 c: allergy ? "#dc2626" : "#16a34a" },
        ].map((f, i) => (
          <div key={i} style={{ padding: "11px 22px", borderRight: i < 4 ? "1px solid #f1f5f9" : "none" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 3 }}>{f.k}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: f.c }}>{f.v}</div>
          </div>
        ))}
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "20px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Visit history table */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ padding: "13px 20px", borderBottom: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>Visit History & Clinical Measurements</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                {["#", "Visit Type", "Date", "VA Right Eye", "VA Left Eye", "IOP Right (mmHg)", "IOP Left (mmHg)", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", background: "#dbeafe" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PREV_VISITS.map((v, i) => (
                <tr key={v.no} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
                  <td style={{ padding: "11px 16px", color: "#94a3b8", fontSize: 12 }}>{v.no}</td>
                  <td style={{ padding: "11px 16px", fontWeight: 600, color: "#1e293b" }}>{v.type}</td>
                  <td style={{ padding: "11px 16px", color: "#64748b" }}>{v.date}</td>
                  <td style={{ padding: "11px 16px", color: "#1e293b" }}>{v.vaR}</td>
                  <td style={{ padding: "11px 16px", color: "#1e293b" }}>{v.vaL}</td>
                  <td style={{ padding: "11px 16px", color: v.iopR > 21 ? "#dc2626" : "#1e293b" }}>{v.iopR}</td>
                  <td style={{ padding: "11px 16px", color: v.iopL > 21 ? "#dc2626" : "#1e293b" }}>{v.iopL}</td>
                  <td style={{ padding: "11px 16px", color: "#64748b", fontSize: 12 }}>Completed</td>
                </tr>
              ))}
              <tr style={{ borderTop: "2px solid #e2e8f0", background: "#fff" }}>
                <td style={{ padding: "11px 16px", color: "#64748b", fontSize: 12 }}>{PREV_VISITS.length + 1}</td>
                <td style={{ padding: "11px 16px", fontWeight: 600, color: "#1e293b" }}>Follow-up #{PREV_VISITS.length + 1}</td>
                <td style={{ padding: "11px 16px", fontWeight: 600, color: "#1e293b" }}>Today</td>
                <td style={{ padding: "11px 16px", color: "#94a3b8", fontStyle: "italic" }}>—</td>
                <td style={{ padding: "11px 16px", color: "#94a3b8", fontStyle: "italic" }}>—</td>
                <td style={{ padding: "11px 16px", color: "#94a3b8", fontStyle: "italic" }}>—</td>
                <td style={{ padding: "11px 16px", color: "#94a3b8", fontStyle: "italic" }}>—</td>
                <td style={{ padding: "11px 16px", color: "#2563eb", fontSize: 12, fontWeight: 600 }}>In Progress</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Previous complaint + diagnosis */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { title: "Previous Complaint", accent: "#7c3aed", rows: [
              ["Chief Complaint",            prev?.chief_complaint],
              ["History of Present Illness", prev?.history_of_present_illness],
            ]},
            { title: "Previous Diagnosis & Plan", accent: "#ea580c", rows: [
              ["Diagnosis",        prev?.diagnosis || prev?.assessment_diagnosis],
              ["Management Plan",  prev?.plan_notes || prev?.management_plan],
              ["Medication",       prev?.prescribed_medication],
            ]},
          ].map(({ title, accent, rows }) => (
            <div key={title} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ padding: "13px 20px", borderBottom: "1px solid #f1f5f9", borderLeft: `4px solid ${accent}`, background: "#fafbfc" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: "0.7px" }}>{title}</span>
              </div>
              <div style={{ padding: "4px 20px 16px" }}>
                {rows.map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid #f8fafc" }}>
                    <span style={{ fontSize: 13, color: "#64748b", flexShrink: 0, marginRight: 16 }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: val ? "#1e293b" : "#cbd5e1", fontStyle: val ? "normal" : "italic", textAlign: "right" }}>{val || "Not recorded"}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Medical background */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ padding: "13px 20px", borderBottom: "1px solid #f1f5f9", borderLeft: "4px solid #dc2626", background: "#fafbfc" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: "0.7px" }}>Medical Background & Compliance</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
            <div style={{ padding: "14px 20px", borderRight: "1px solid #f1f5f9" }}>
              {[["Past Medical History", prev?.pmh_from_registration || patient?.medical_history], ["Prescribed Medication", prev?.prescribed_medication]].map(([l, v]) => (
                <div key={l} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{l}</div>
                  <div style={{ fontSize: 13, color: v ? "#1e293b" : "#cbd5e1", fontStyle: v ? "normal" : "italic" }}>{v || "Not recorded"}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 20px", borderRight: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Known Allergies</div>
              {allergy
                ? <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px" }}>
                    <FaExclamationTriangle size={13} color="#dc2626" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#dc2626" }}>{allergy}</span>
                  </div>
                : <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 14px" }}>
                    <FaCheckCircle size={13} color="#16a34a" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a" }}>No known allergies</span>
                  </div>
              }
            </div>
            <div style={{ padding: "14px 20px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Treatment Compliance</div>
              {[["Spectacles", prev?.spectacles_use], ["Contact Lens", prev?.contact_lens_use]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f8fafc" }}>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{l}</span>
                  {v === "yes" ? <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: "#16a34a" }}><FaCheckCircle size={11} /> Yes</span>
                    : v === "no" ? <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: "#dc2626" }}><FaTimesCircle size={11} /> No</span>
                    : <span style={{ fontSize: 12, color: "#cbd5e1" }}>—</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", borderLeft: "4px solid #0d9488", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Ready to begin today's assessment?</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 3 }}>Previous clinical data is summarised above. The SOAP form will open for today's documentation.</div>
          </div>
          <button onClick={onStartSOAP}
            onMouseEnter={e => e.currentTarget.style.background = "#0f766e"}
            onMouseLeave={e => e.currentTarget.style.background = "#0d9488"}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 24px", borderRadius: 10, background: "#0d9488", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", flexShrink: 0 }}>
            Begin Follow-up SOAP <FaChevronRight size={12} />
          </button>
        </div>

      </div>
    </div>
  );
}
