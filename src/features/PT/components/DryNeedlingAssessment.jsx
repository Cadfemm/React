

import React, { useState, useEffect, useRef } from "react";
import PatientCard, { DIET_FIELDS } from "../../../shared/cards/PatientCard";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import ATVConsentForm from "./ATVConsentForm";
import DryNeedlingConsent from "../../OT/components/DryNeedling";



const SOAP_TABS = ["subjective", "objective", "assessment", "plan"];

const ACTIONS = [
  { type: "back",  label: "Back"  },
  { type: "clear", label: "Clear" },
  { type: "save",  label: "Save"  },
];

const SUBJECTIVE_SCHEMA = {
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  
    sections: [
    {
      fields: [
      
        {
          name: "chief_complaint",
          label: "Chief Complaint",
          type: "input",
          placeholder: "Enter patient complaint..."
        },
        
      {
            name: "hpi",
            label: "History of Presenting Illness (HPI)",
            type: "input"
          },
        {
        name: "consent_type",
        label: " Consent",
        type: "single-select",
        options: [
          { label: "Dry Needling",  value: "dry_needling"  },
         { label: "ATV Form", value: "atv" },

        ],
      },
        {
          name: "aggravating_factors",
          label: "Aggravating Factors",
          type: "input",
          placeholder: "What increases the pain?"
        },
        {
          name: "relieving_factors",
          label: "Relieving Factors",
          type: "input",
          placeholder: "What reduces the pain?"
        }
      ]
    }
  ]
};

const OBJECTIVE_SCHEMA= {
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
      sections: [
    {
      fields: [
        { type: "subheading", label: "Objective — Trigger Points" },

        {
          name: "trigger_points",
          label: "Trigger Points Identified",
          type: "checkbox-group",
          options: [
            { label: "Cervical", value: "cervical" },
            { label: "Thoracic", value: "thoracic" },
            { label: "Lumbar", value: "lumbar" },
            { label: "Upper Limb", value: "upper_limb" },
            { label: "Lower Limb", value: "lower_limb" }
          ]
        },

        // Cervical
        {
          name: "cervical_region",
          label: "Cervical Region Details",
          type: "input",
          placeholder: "Enter cervical region details...",
          showIf: { field: "trigger_points", includes: "cervical" }
        },

        // Thoracic
        {
          name: "thoracic_region",
          label: "Thoracic Region Details",
          type: "input",
          placeholder: "Enter thoracic region details...",
          showIf: { field: "trigger_points", includes: "thoracic" }
        },

        // Lumbar
        {
          name: "lumbar_region",
          label: "Lumbar Region Details",
          type: "input",
          placeholder: "Enter lumbar region details...",
          showIf: { field: "trigger_points", includes: "lumbar" }
        },

        // Upper Limb
        {
          name: "upper_limb_region",
          label: "Upper Limb Region Details",
          type: "input",
          placeholder: "Enter upper limb details...",
          showIf: { field: "trigger_points", includes: "upper_limb" }
        },

        // Lower Limb
        {
          name: "lower_limb_region",
          label: "Lower Limb Region Details",
          type: "input",
          placeholder: "Enter lower limb details...",
          showIf: { field: "trigger_points", includes: "lower_limb" }
        }
      ]
    }
  ]
};


const ASSESSMENT_SCHEMA = {
 actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [
    {
      fields: [
       
{ name: "clinical_impression", label: "Clinical Impression", type: "input" },
        {
          name: "assessment_diagnosis",
          label: "Diagnosis",
          type: "checkbox-group",
          options: [
            { label: "Myofascial Pain Syndrome", value: "myofascial_pain" },
            { label: "Muscle Tightness / Spasm", value: "muscle_tightness" },
            { label: "Postural Related Pain", value: "postural_pain" },
            { label: "Other", value: "other" }
          ]
        },

        {
          name: "assessment_other",
          label: "Specify Other",
          type: "input",
          placeholder: "Enter details...",
          showIf: { field: "assessment_diagnosis", includes: "other" }
        }
      ]
    }
  ]
};
// const PLAN_SCHEMA = {
//   actions: ACTIONS,
//   sections: [{
//     fields: [
//       { name: "next_session",      label: "Next Session Date",                  type: "date"     },
//       { name: "frequency",         label: "Frequency",                          type: "input", placeholder: "e.g. 2× per week" },
//       { name: "home_advice",       label: "Home Advice / Self-Care",            type: "input" },
//       { name: "referral",          label: "Referral / Further Investigation",   type: "input" },
//       { name: "goals",             label: "Short-Term Goals",                   type: "input" },
//     ]
//   }]
// };

const PLAN_SCHEMA = {
  actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [
    {
      fields: [
           {
  type: "subheading",
  label: "Short-Term Goals (2–4 weeks)"
},
{
  type: "dynamic-goals",
  name: "shortterm_blocks"
},

               {
  type: "subheading",
  label: "Long-Term Goals (6–12 weeks)"
},
{
  type: "dynamic-goals",
  name: "longterm_blocks"
},
        { type: "subheading", label: "Plan" },
        {
          name: "treatment_plan",
          label: "Select Treatment Plan",
          type: "checkbox-group",
          options: [
            { label: "Dry Needling", value: "dry_needling" },
            { label: "Stretching", value: "stretching" },
            { label: "Strengthening", value: "strengthening" },
            { label: "Postural Correction", value: "postural_correction" },
            { label: "Home Exercise Program", value: "hep" },
            { label: "Other", value: "other" }
          ]
        },
        {
          name: "plan_other",
          label: "Specify Other",
          type: "input",
          placeholder: "Enter additional plan...",
          showIf: { field: "treatment_plan", includes: "other" }
        },
        
        { type: "subheading", label: "Evaluation" },
        {
          name: "immediate_response",
          label: "Immediate Response",
          type: "radio",
          options: [
            { label: "Improved", value: "improved" },
            { label: "No Change", value: "no_change" },
            { label: "Worse", value: "worse" }
          ]
        },
        { type: "subheading", label: "Reassessment / Review" },
        { name: "progress",          label: "Progress",          type: "input", placeholder: "Describe patient progress..." },
        { name: "remaining_issues",  label: "Remaining Issues",  type: "input", placeholder: "Enter remaining problems or concerns..." },
        { name: "next_session_plan", label: "Plan Next Session", type: "input", placeholder: "Outline next session plan..." },
        {
  name: "post_treatment_advice",
  label: "Post-Treatment Advice",
  type: "checkbox-group",
  options: [
    { label: "Soreness 24–48 hours is normal", value: "soreness" },
    { label: "Hydrate well", value: "hydrate" },
    { label: "Gentle stretching", value: "stretching" },
    { label: "Report adverse symptoms", value: "report" },
    { label: "Others", value: "other" }
  ]
},
{
  name: "post_treatment_other",
  label: "Others",
  type: "input",
  placeholder: "Enter other advice...",
  showIf: { field: "post_treatment_advice", includes: "other" }
},
{
        name: "pain_score",
        label: "Pain Score(Visual Analog Scale)",
        type: "scale-slider",

        min: 0,
        max: 10,
        ranges: [
          {
            min: 0,
            max: 1,
            label: "Mild",
            color: "#22c55e"   // green
          },
          {
            min: 1,
            max: 5,
            label: "Moderate",
            color: "#facc15"   // yellow
          },
          {
            min: 5,
            max: 10,
            label: "Severe",
            color: "#ef4444"   // red
          }
        ],
        showValue: true
      },
      ]
    }
  ]
};

const SCHEMA_MAP = {
  subjective:  SUBJECTIVE_SCHEMA,
  objective:   OBJECTIVE_SCHEMA,
  assessment:  ASSESSMENT_SCHEMA,
  plan:        PLAN_SCHEMA,
};

export default function DryNeedlingAssessment({ patient, sharedAtvValues = {}, sharedAtvSubmitted = false, onAtvSubmit, onBack }) {
  const [values, setValues]       = useState({});
  const [activeTab, setActiveTab] = useState("subjective");
  const [openConsent, setOpenConsent] = useState(null);
   const [submitted, setSubmitted] = useState(false);

  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: patient?.medical_history || "",
    past_family_history:  patient?.family_medical_history || "",
    alerts_and_allergies: patient?.alerts_and_allergies_history || "",
  });
   const tabOrder = ["subjective", "objective", "assessment", "plan"];
  const activeTabIdx = tabOrder.indexOf(activeTab);
  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Submitted:", values);
    alert("Assessment submitted");
  };
  const dryNeedlingRef = useRef({});

  useEffect(() => {
    if (!patient) return;
    setPatientHistory({
      past_medical_history: patient.medical_history              || "",
      past_family_history:  patient.family_medical_history       || "",
      alerts_and_allergies: patient.alerts_and_allergies_history || "",
    });
  }, [patient]);

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // When consent dropdown selected → open popup
    if (name === "consent_type" && value) {
      setOpenConsent(value);
    }
  };
  const storageKey = patient
  ? `dry_needling_assessment_${patient.id}`
  : "dry_needling_assessment";
  // const storageKey = patient ? `amputee_progress_${patient.id}` : null;

const handleAction = (type) => {
    if (type === "back") onBack?.();
    if (type === "clear") {
      setValues({});
      setSubmitted(false);
      localStorage.removeItem(storageKey);
    }
    if (type === "save") {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ values, updatedAt: new Date() })
      );
      alert("Spinal draft saved");
    }
  };

  const closeModal = () => {
    setOpenConsent(null);
    setValues(prev => ({ ...prev, consent_type: "" }));
  };

  const dryNeedlingSaved = !!values.dry_needling_consent?.saved;

  return (
    <div>
      {/* ===== PATIENT INFORMATION CARD ===== */}
      <CommonFormBuilder
        schema={{ title: "Patient Information", sections: [] }}
        values={{}}
        onChange={() => {}}
      >
        <PatientCard patient={patient} />
        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Patient History</div>
          {[
            { key: "past_medical_history", label: "Past Medical History" },
            { key: "past_family_history",  label: "Family History"       },
            { key: "alerts_and_allergies", label: "Allergies"            },
          ].map(({ key, label }) => (
            <div key={key} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
              <input
                value={patientHistory[key]}
                onChange={e => setPatientHistory(p => ({ ...p, [key]: e.target.value }))}
                style={historyinput}
              />
            </div>
          ))}
          <button type="button" style={alertBtn}>🚨 Alerts</button>
        </div>
        <button style={doctorsReportBtn}>Doctors Reports</button>
      </CommonFormBuilder>

      {/* ===== SOAP TABS ===== */}
      <div style={tabBar}>
        {SOAP_TABS.map(tab => (
          <div
            key={tab}
            style={activeTab === tab ? tabActive : tabBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* ===== SOAP FORM ===== */}
      <CommonFormBuilder
        schema={activeTab === "subjective" ? SUBJECTIVE_SCHEMA : SCHEMA_MAP[activeTab]}
        values={values}
        onChange={onChange}
        onAction={handleAction}
      >
        {activeTab === "plan" && (
          <InterventionTable
            rows={values.intervention_rows || defaultRows()}
            onChange={(rows) => onChange("intervention_rows", rows)}
          />
        )}
      </CommonFormBuilder>

      {/* Consent status badges */}
      {activeTab === "subjective" && (dryNeedlingSaved || sharedAtvSubmitted) && (
        <div style={consentStatusBar}>
          {dryNeedlingSaved   && <span style={savedBadge}>✅ Dry Needling Consent Signed</span>}
          {sharedAtvSubmitted && <span style={savedBadge}>✅ ATV Consent Signed</span>}
        </div>
      )}

      {/* Pain Location Marker */}
      {activeTab === "subjective" && (
        <div style={painLocationWrap}>
          <div style={painLocationTitle}>Pain Score (VAS)</div>
          <PainLocationMarker
            value={values.body_chart || {}}
            onChange={(val) => onChange("body_chart", val)}
          />
        </div>
      )}
       <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button style={submitBtn} onClick={() => setActiveTab(tabOrder[activeTabIdx + 1])}>
              Next
            </button>
          ) : (
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Assessment
            </button>
          )}
        </div>

      {/* ===== CONSENT MODALS ===== */}

      {/* Dry Needling Consent Modal */}
      {openConsent === "dry_needling" && (
        <ConsentModal title="Dry Needling Consent" onClose={closeModal}>
          {dryNeedlingSaved && (
            <div style={submittedBanner}>
              <span>✅</span>
              <span>Dry Needling Consent already submitted. You can review or re-save below.</span>
            </div>
          )}
          <DryNeedlingConsent
            key={`dry-${values.dry_needling_consent?.submittedAt || "new"}`}
            patient={patient}
            initialValues={values.dry_needling_consent || {}}
            onBack={closeModal}
            onValuesChange={(latest) => { dryNeedlingRef.current = latest; }}
            onSubmit={(consentData) => {
              onChange("dry_needling_consent", {
                ...consentData,
                submittedAt: new Date().toISOString(),
                saved: true,
              });
              closeModal();
            }}
          />
          <div style={{ marginTop: 20, textAlign: "right" }}>
            <button onClick={closeModal} style={closeBtnStyle}>Close</button>
          </div>
          {/* ATV appears after Dry Needling is saved */}
          {dryNeedlingSaved && (
            <AtvSection patient={patient} sharedAtvValues={sharedAtvValues} sharedAtvSubmitted={sharedAtvSubmitted} onAtvSubmit={onAtvSubmit} />
          )}
        </ConsentModal>
      )}
      {openConsent === "atv" && (
        <ConsentModal title="ATV Rehabilitation Therapy Consent" onClose={closeModal}>
          <AtvSection patient={patient} sharedAtvValues={sharedAtvValues} sharedAtvSubmitted={sharedAtvSubmitted} onAtvSubmit={onAtvSubmit} />
          <div style={{ marginTop: 20, textAlign: "right" }}>
            <button onClick={closeModal} style={closeBtnStyle}>Close</button>
          </div>
        </ConsentModal>
      )}
    </div>
  );
}

/* ── Shared ATV section ── */
function AtvSection({ patient, sharedAtvValues, sharedAtvSubmitted, onAtvSubmit }) {
  const [localValues, setLocalValues] = React.useState(sharedAtvValues || {});
  React.useEffect(() => { setLocalValues(sharedAtvValues || {}); }, [sharedAtvValues]);

  return (
    <>
      <div style={{ borderTop: "2px dashed #e5e7eb", margin: "28px 0" }} />
      <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 12 }}>
        ATV Rehabilitation Therapy Consent
      </div>
      {sharedAtvSubmitted && (
        <div style={submittedBanner}><span>✅</span><span>ATV Consent already submitted on {new Date().toLocaleDateString()}.</span></div>
      )}
      <ATVConsentForm
        patient={patient}
        values={localValues}
        onChange={(name, val) => setLocalValues(prev => ({ ...prev, [name]: val }))}
        submitted={sharedAtvSubmitted}
        onSubmit={(data) => { onAtvSubmit?.(data); }}
      />
    </>
  );
}

/* ===================== STYLES ===================== */

const tabBar = {
  display: "flex", gap: 12, justifyContent: "center",
  borderBottom: "1px solid #ddd", marginBottom: 12,
};
const tabBtn    = { padding: "10px 22px", fontWeight: 600, cursor: "pointer", color: "#0f172a" };
const tabActive = { ...tabBtn, borderBottom: "3px solid #2451b3", color: "#2451b3" };

const historyinput = {
  width: "100%", minHeight: 90, padding: "10px 12px",
  borderRadius: 6, border: "1px solid #d1d5db",
  fontSize: 14, fontFamily: "inherit", resize: "vertical",
};

const alertBtn = {
  marginTop: 10, padding: "10px 20px", borderRadius: 6,
  border: "1.5px solid #007bff", background: "#007bff",
  color: "#fff", fontWeight: 600, fontSize: 14,
  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
};

const doctorsReportBtn = {
  padding: "10px 20px", background: "#2563EB", color: "#fff",
  border: "none", borderRadius: 6, fontSize: 14,
  fontWeight: 600, cursor: "pointer", marginTop: 8,
};

/* ── Default empty rows ── */
function defaultRows() {
  return Array.from({ length: 4 }, () => ({
    muscle: "",
    side: [],
    no_trps: "",
    needle_length: "",
    technique: [],
    twitch_response: ""
  }));
}

/* ── Intervention Table ── */
function InterventionTable({ rows, onChange }) {
  const update = (idx, field, value) => {
    const next = rows.map((r, i) => i === idx ? { ...r, [field]: value } : r);
    onChange(next);
  };

  const toggleCheck = (idx, field, val) => {
    const current = Array.isArray(rows[idx][field]) ? rows[idx][field] : [];
    const next = current.includes(val)
      ? current.filter(v => v !== val)
      : [...current, val];
    update(idx, field, next);
  };

  const addRow = () => onChange([...rows, { muscle: "", side: [], no_trps: "", needle_length: "", technique: [], twitch_response: "" }]);
  const removeRow = (idx) => onChange(rows.filter((_, i) => i !== idx));

  return (
    <div style={{ marginTop: 24, marginBottom: 16 }}>
      <div style={interventionTitle}>I — Intervention (Dry Needling Details)</div>

      <div style={{ overflowX: "auto" }}>
        <table style={tbl}>
          <thead>
            <tr style={tblHead}>
              <th style={th}>Muscle</th>
              <th style={th}>Side (L/R)</th>
              <th style={th}>No. of TrPs</th>
              <th style={th}>Needle Length</th>
              <th style={th}>Technique (✓)</th>
              <th style={th}>Twitch Response (✓)</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} style={idx % 2 === 0 ? tblRowEven : tblRowOdd}>
                {/* Muscle */}
                <td style={td}>
                  <input
                    type="text"
                    value={row.muscle}
                    onChange={e => update(idx, "muscle", e.target.value)}
                    style={cellInput}
                    placeholder="Muscle name"
                  />
                </td>

                {/* Side L/R */}
                <td style={td}>
                  <div style={checkGroup}>
                    {["L", "R"].map(s => (
                      <label key={s} style={checkLabel}>
                        <input
                          type="checkbox"
                          checked={Array.isArray(row.side) && row.side.includes(s)}
                          onChange={() => toggleCheck(idx, "side", s)}
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </td>

                {/* No. of TrPs */}
                <td style={td}>
                  <input
                    type="number"
                    min="0"
                    value={row.no_trps}
                    onChange={e => update(idx, "no_trps", e.target.value)}
                    style={{ ...cellInput, width: 60 }}
                    placeholder="—"
                  />
                </td>

                {/* Needle Length */}
                <td style={td}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <input
                      type="number"
                      min="0"
                      value={row.needle_length}
                      onChange={e => update(idx, "needle_length", e.target.value)}
                      style={{ ...cellInput, width: 70 }}
                      placeholder="—"
                    />
                    <span style={{ fontSize: 13, color: "#6b7280" }}>mm</span>
                  </div>
                </td>

                {/* Technique */}
                <td style={td}>
                  <div style={checkGroup}>
                    {["Static", "Pistoning"].map(t => (
                      <label key={t} style={checkLabel}>
                        <input
                          type="checkbox"
                          checked={Array.isArray(row.technique) && row.technique.includes(t)}
                          onChange={() => toggleCheck(idx, "technique", t)}
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                </td>

                {/* Twitch Response */}
                <td style={td}>
                  <div style={checkGroup}>
                    {["Yes", "No"].map(v => (
                      <label key={v} style={checkLabel}>
                        <input
                          type="radio"
                          name={`twitch_${idx}`}
                          value={v}
                          checked={row.twitch_response === v}
                          onChange={() => update(idx, "twitch_response", v)}
                        />
                        {v}
                      </label>
                    ))}
                  </div>
                </td>

                {/* Remove */}
                <td style={td}>
                  <button
                    type="button"
                    onClick={() => removeRow(idx)}
                    style={removeBtn}
                    title="Remove row"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button type="button" onClick={addRow} style={addRowBtn}>
        + Add Row
      </button>
    </div>
  );
}

/* ── Intervention table styles ── */
const interventionTitle = {
  fontWeight: 700,
  fontSize: 15,
  marginBottom: 12,
  color: "#111827"
};

const tbl = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
  minWidth: 700,

};

const tblHead = {
  // background: "#fff"
};

const th = {
  padding: "10px 12px",
  textAlign: "left",
  fontWeight: 700,
  borderBottom: "2px solid #d1d5db",
  color: "#111827",        // dark text
  whiteSpace: "nowrap",
  background: "#f1f5f9",   // light bg
};

const td = {
  padding: "8px 10px",
  verticalAlign: "middle",
  borderBottom: "1px solid #e5e7eb"
};

const tblRowEven = { background: "#fff" };
const tblRowOdd  = { background: "#fff" };

const cellInput = {
  padding: "5px 8px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
  fontSize: 14,
  width: "100%",
  minWidth: 100
};

const checkGroup = {
  display: "flex",
  flexDirection: "column",
  gap: 4
};

const checkLabel = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 13,
  cursor: "pointer"
};

const removeBtn = {
  background: "none",
  border: "none",
  color: "#ef4444",
  fontSize: 16,
  cursor: "pointer",
  padding: "2px 6px"
};

const addRowBtn = {
  marginTop: 10,
  padding: "8px 18px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer"
};

/* ── Pain Location Marker styles ── */
const painLocationWrap = {
  margin: "0 0 4px",
  border: "1.5px solid #e5e7eb",
  borderRadius: 10,
  background: "#fff",
  padding: 20,
};
const painLocationTitle = {
  fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 16,
};
const painLocationBody = {
  display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start",
};
const vasWrap = {
  flex: 1, minWidth: 240, display: "flex", flexDirection: "column", gap: 10,
};
const vasTitle = {
  fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 4,
};

/* ── PainLocationMarker (same pattern as WoundLocationMarker) ── */
const PAIN_BODY_VIEWS = [
  { key: "body",  label: "Body (Front/Back)", src: "/body_high.png"  },
];
const PAIN_PIN_COLOR = "#dc2626";

function PainPinMarker({ pin, readOnly, onRemove }) {
  const [hovered, setHovered] = useState(false);
  const MAX = 4;
  const truncated = pin.label.length > MAX ? pin.label.slice(0, MAX) + "…" : pin.label;

  return (
    <div
      style={{
        position: "absolute",
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        transform: "translate(-50%, -100%)",
        pointerEvents: "auto",
        zIndex: hovered ? 10 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            background: PAIN_PIN_COLOR,
            color: "#fff",
            borderRadius: "50% 50% 50% 0",
            transform: "rotate(-45deg)",
            width: 28, height: 28,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, fontWeight: 700,
            boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
            cursor: readOnly ? "default" : "pointer",
            overflow: "hidden",
          }}
          onClick={(e) => { e.stopPropagation(); if (!readOnly) onRemove(); }}
        >
          <span style={{ transform: "rotate(45deg)", whiteSpace: "nowrap" }}>{truncated}</span>
        </div>
      </div>
      {pin.label.length > MAX && hovered && (
        <div style={{
          position: "absolute", bottom: "110%", left: "50%",
          transform: "translateX(-50%)",
          background: "#1e293b", color: "#fff",
          fontSize: 11, fontWeight: 500,
          padding: "4px 8px", borderRadius: 5,
          whiteSpace: "nowrap", pointerEvents: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)", zIndex: 20,
        }}>
          {pin.label}
        </div>
      )}
    </div>
  );
}

/* ── Shared gradient pain scale (0–100) ── */
const PAIN_SEGMENTS = [
  { min: 0,  max: 10,  color: "#22c55e", bg: "#dcfce7", label: "No Pain"       },
  { min: 11, max: 30,  color: "#84cc16", bg: "#ecfccb", label: "Mild"           },
  { min: 31, max: 60,  color: "#f97316", bg: "#ffedd5", label: "Moderate"       },
  { min: 61, max: 100, color: "#ef4444", bg: "#fee2e2", label: "Severe / Worst" },
];
const PAIN_TRACK_GRADIENT =
  "linear-gradient(to right, #22c55e 0%, #22c55e 10%, #84cc16 10%, #84cc16 30%, #f97316 30%, #f97316 60%, #ef4444 60%, #ef4444 100%)";
const PAIN_TICKS = [0, 10, 11, 30, 31, 60, 61, 100];

function getPainSegment(s) {
  return PAIN_SEGMENTS.find(seg => s >= seg.min && s <= seg.max) || PAIN_SEGMENTS[0];
}

function GradientPainScale({ title, score = 0, onChange, readOnly = false }) {
  const seg = getPainSegment(score);

  return (
    <div style={{
      border: "1px solid #e5e7eb", borderRadius: 12,
      background: "#fff", padding: "14px 16px",
    }}>
      {/* Title */}
      {title && (
        <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 12 }}>
          {title}
        </div>
      )}

      {/* Legend pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {PAIN_SEGMENTS.map(s => {
          const active = seg.label === s.label;
          return (
            <div key={s.label} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "4px 14px", borderRadius: 999,
              border: `1.5px solid ${s.color}`,
              background: active ? s.color : "#fff",
              color: active ? "#fff" : s.color,
              fontWeight: active ? 700 : 500,
              fontSize: 12, transition: "all 0.15s",
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: active ? "#fff" : s.color,
                display: "inline-block", flexShrink: 0,
              }} />
              {s.label}
            </div>
          );
        })}
      </div>

      {/* Tick labels */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontSize: 11, color: "#6b7280", marginBottom: 2,
      }}>
        {PAIN_TICKS.map(t => <span key={t}>{t}</span>)}
      </div>

      {/* Gradient track + slider */}
      <div style={{ position: "relative", height: 24, marginBottom: 4 }}>
        <div style={{
          position: "absolute", top: "50%", left: 0, right: 0,
          height: 10, borderRadius: 6,
          background: PAIN_TRACK_GRADIENT,
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }} />
        {!readOnly ? (
          <input
            type="range" min={0} max={100} step={1}
            value={score}
            onChange={e => onChange(Number(e.target.value))}
            className="pain-slider"
            style={{
              position: "absolute", top: "50%", left: 0,
              width: "100%", margin: 0,
              transform: "translateY(-50%)",
              appearance: "none", WebkitAppearance: "none",
              background: "transparent",
              cursor: "pointer", height: 24, zIndex: 2,
            }}
          />
        ) : (
          <div style={{
            position: "absolute", top: "50%",
            left: `calc(${score}% - 9px)`,
            transform: "translateY(-50%)",
            width: 18, height: 18, borderRadius: "50%",
            background: "#2563eb",
            border: "2px solid #fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            zIndex: 2,
          }} />
        )}
      </div>

      {/* Score pill */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        marginTop: 6, padding: "6px 16px", borderRadius: 8,
        background: seg.color, color: "#fff",
        fontWeight: 700, fontSize: 13,
      }}>
        Score: {score} — {seg.label}
      </div>
    </div>
  );
}

/* Inject range thumb styles once */
if (typeof document !== "undefined" && !document.getElementById("pain-slider-style")) {
  const s = document.createElement("style");
  s.id = "pain-slider-style";
  s.textContent = `
    input[type=range].pain-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px; height: 18px;
      border-radius: 50%;
      background: #2563eb;
      border: 2px solid #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.35);
      cursor: pointer;
    }
    input[type=range].pain-slider::-moz-range-thumb {
      width: 18px; height: 18px;
      border-radius: 50%;
      background: #2563eb;
      border: 2px solid #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.35);
      cursor: pointer;
    }
  `;
  document.head.appendChild(s);
}

function PainLocationMarker({ value = {}, onChange, readOnly = false }) {
  const [activeView, setActiveView] = useState(PAIN_BODY_VIEWS[0].key);
  const imgRef = useRef(null);

  const viewData = PAIN_BODY_VIEWS.find(v => v.key === activeView) || PAIN_BODY_VIEWS[0];
  const pins = value[activeView] || [];

  const addPin = (e) => {
    if (readOnly) return;
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const id = Date.now();
    // each pin carries its own score, default 0
    const newPin = { id, x, y, label: `P${pins.length + 1}`, score: 0 };
    onChange({ ...value, [activeView]: [...pins, newPin] });
  };

  const removePin = (id) => {
    onChange({ ...value, [activeView]: pins.filter(p => p.id !== id) });
  };

  const updatePin = (id, field, val) => {
    onChange({
      ...value,
      [activeView]: pins.map(p => p.id === id ? { ...p, [field]: val } : p),
    });
  };

  const clearAll = () => onChange({ ...value, [activeView]: [] });

  const totalPins = Object.values(value).flat().length;

  return (
    <div style={{ fontFamily: "Inter, system-ui" }}>

      {/* View tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {PAIN_BODY_VIEWS.map(v => (
          <button key={v.key} type="button" onClick={() => setActiveView(v.key)}
            style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              cursor: "pointer", border: "1px solid",
              background: activeView === v.key ? "#1e40af" : "#f1f5f9",
              color:      activeView === v.key ? "#fff"    : "#374151",
              borderColor: activeView === v.key ? "#1e40af" : "#d1d5db",
            }}
          >
            {v.label}
            {(value[v.key] || []).length > 0 && (
              <span style={{
                marginLeft: 6, background: "#ef4444", color: "#fff",
                borderRadius: 999, padding: "1px 6px", fontSize: 10,
              }}>
                {(value[v.key] || []).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Image + pins side by side with pin cards */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>

        {/* Body image */}
        <div style={{ position: "relative", display: "inline-block", flexShrink: 0 }}>
          <img
            ref={imgRef}
            src={viewData.src}
            alt={viewData.label}
            onClick={addPin}
            style={{
              width: 300, height: "auto", display: "block",
              border: "1px solid #e5e7eb", borderRadius: 8,
              cursor: readOnly ? "default" : "crosshair",
              userSelect: "none",
            }}
            draggable={false}
          />
          {pins.map(pin => (
            <PainPinMarker
              key={pin.id}
              pin={pin}
              readOnly={readOnly}
              onRemove={() => removePin(pin.id)}
            />
          ))}
          {!readOnly && (
            <div style={{ marginTop: 6, fontSize: 11, color: "#6b7280" }}>
              Click on image to mark pain location. Click pin to remove.
            </div>
          )}
        </div>

        {/* Per-pin cards — each with its own VAS scale */}
        {pins.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, minWidth: 280 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>
              Marked Pain Points
            </div>
            {pins.map(pin => (
              <PinScaleCard
                key={pin.id}
                pin={pin}
                readOnly={readOnly}
                onLabelChange={v => updatePin(pin.id, "label", v)}
                onScoreChange={v => updatePin(pin.id, "score", v)}
                onRemove={() => removePin(pin.id)}
              />
            ))}
            {!readOnly && (
              <button type="button" onClick={clearAll}
                style={{
                  fontSize: 11, color: "#6b7280", background: "none",
                  border: "none", cursor: "pointer",
                  textDecoration: "underline", padding: 0, textAlign: "left",
                }}
              >
                Clear all on this view
              </button>
            )}
          </div>
        )}
      </div>

      {totalPins > 0 && (
        <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
          Total pain markers: {totalPins} across all views
        </div>
      )}
    </div>
  );
}

/* ── Per-pin card with its own gradient slider scale ── */
function PinScaleCard({ pin, readOnly, onLabelChange, onScoreChange, onRemove }) {
  const score = pin.score ?? 0;
  const seg   = getPainSegment(score);

  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      background: "#fff",
      padding: "14px 16px",
    }}>
      {/* Header: pin dot + label + remove */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{
          width: 12, height: 12, borderRadius: "50%",
          background: PAIN_PIN_COLOR, flexShrink: 0,
        }} />
        {readOnly ? (
          <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{pin.label}</span>
        ) : (
          <input
            value={pin.label}
            onChange={e => onLabelChange(e.target.value)}
            style={{
              border: "1px solid #d1d5db", borderRadius: 6,
              padding: "4px 8px", fontSize: 13, width: 80,
              color: "#111827", fontWeight: 700,
            }}
            placeholder="Label"
          />
        )}
        <div style={{ flex: 1 }} />
        {!readOnly && (
          <button type="button" onClick={onRemove}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#ef4444", fontSize: 16, padding: "0 2px", lineHeight: 1,
            }}
          >✕</button>
        )}
      </div>

      {/* Legend pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
        {PAIN_SEGMENTS.map(s => {
          const active = seg.label === s.label;
          return (
            <div key={s.label} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "4px 12px", borderRadius: 999,
              border: `1.5px solid ${s.color}`,
              background: active ? s.color : "#fff",
              color: active ? "#fff" : s.color,
              fontWeight: active ? 700 : 500,
              fontSize: 12,
              transition: "all 0.15s",
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: active ? "#fff" : s.color,
                display: "inline-block", flexShrink: 0,
              }} />
              {s.label}
            </div>
          );
        })}
      </div>

      {/* Tick labels */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontSize: 11, color: "#6b7280",
        marginBottom: 2, paddingLeft: 0, paddingRight: 0,
      }}>
        {PAIN_TICKS.map(t => <span key={t}>{t}</span>)}
      </div>

      {/* Gradient track + slider */}
      <div style={{ position: "relative", height: 24, marginBottom: 4 }}>
        {/* Gradient bar */}
        <div style={{
          position: "absolute", top: "50%", left: 0, right: 0,
          height: 10, borderRadius: 6,
          background: PAIN_TRACK_GRADIENT,
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }} />
        {/* Range input */}
        {!readOnly ? (
          <input
            type="range"
            min={0} max={100} step={1}
            value={score}
            onChange={e => onScoreChange(Number(e.target.value))}
            className="pain-slider"
            style={{
              position: "absolute", top: "50%", left: 0,
              width: "100%", margin: 0,
              transform: "translateY(-50%)",
              appearance: "none", WebkitAppearance: "none",
              background: "transparent",
              cursor: "pointer", height: 24, zIndex: 2,
            }}
          />
        ) : (
          /* Read-only thumb */
          <div style={{
            position: "absolute", top: "50%",
            left: `calc(${score}% - 9px)`,
            transform: "translateY(-50%)",
            width: 18, height: 18, borderRadius: "50%",
            background: "#2563eb",
            border: "2px solid #fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            zIndex: 2,
          }} />
        )}
      </div>

      {/* Score pill below slider */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        marginTop: 6,
        padding: "6px 14px", borderRadius: 8,
        background: seg.color, color: "#fff",
        fontWeight: 700, fontSize: 13,
      }}>
        Score: {score} — {seg.label}
      </div>
    </div>
  );
}

/* ── VasScale kept for standalone use ── */
function VasScale({ score = 0, onChange }) {
  const getInfo = (s) => {
    if (s <= 2) return { color: "#22c55e", label: "No Pain",    bg: "#f0fdf4" };
    if (s <= 4) return { color: "#84cc16", label: "Mild",       bg: "#f7fee7" };
    if (s <= 6) return { color: "#f59e0b", label: "Moderate",   bg: "#fffbeb" };
    if (s <= 8) return { color: "#f97316", label: "Severe",     bg: "#fff7ed" };
    return              { color: "#ef4444", label: "Worst Pain", bg: "#fef2f2" };
  };
  const { color, label, bg } = getInfo(score);
  const pct = (score / 10) * 100;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{
        display: "inline-flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        width: 80, height: 80, borderRadius: "50%",
        border: `3px solid ${color}`, background: bg, alignSelf: "flex-start",
      }}>
        <span style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: 10, fontWeight: 600, color, marginTop: 2 }}>{label}</span>
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {[0,1,2,3,4,5,6,7,8,9,10].map(n => {
          const { color: c } = getInfo(n);
          const active = n === score;
          return (
            <button key={n} type="button" onClick={() => onChange(n)}
              style={{
                width: 32, height: 32, borderRadius: "50%",
                border: `2px solid ${active ? c : "#e5e7eb"}`,
                background: active ? c : "#f9fafb",
                color: active ? "#fff" : "#374151",
                fontWeight: active ? 800 : 500,
                fontSize: 12, cursor: "pointer",
              }}
            >{n}</button>
          );
        })}
      </div>
      <div style={{ width: "100%", height: 10, background: "#e5e7eb", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 6, transition: "width 0.2s" }} />
      </div>
    </div>
  );
}

/* ── Consent Modal ── */
function ConsentModal({ title, children, onClose }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff", borderRadius: 12,
          width: "100%", maxWidth: 860, maxHeight: "92vh",
          display: "flex", flexDirection: "column",
          boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
        }}
        onClick={e => e.stopPropagation()}
      >
        
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 22px", borderBottom: "1px solid #e5e7eb", flexShrink: 0,
        }}>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#111827" }}>{title}</span>
          <button type="button" onClick={onClose}
            style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#6b7280", padding: "2px 6px" }}>
            ✕
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: "20px 24px", flex: 1 }}>
          {children}
        </div>
        
      </div>
      
    </div>
    
  );
}

const consentStatusBar = {
  display: "flex", gap: 10, flexWrap: "wrap",
  padding: "10px 16px", margin: "0 0 8px",
  background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8,
};
const savedBadge = {
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "5px 12px", borderRadius: 20,
  background: "#dcfce7", border: "1px solid #86efac",
  color: "#166534", fontWeight: 600, fontSize: 12,
};
const submittedBanner = {
  display: "flex", alignItems: "center", gap: 10,
  padding: "10px 16px", marginBottom: 14,
  background: "#f0fdf4", border: "1px solid #86efac",
  borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#166534",
};
const closeBtnStyle = {
  padding: "9px 24px", borderRadius: 6,
  background: "#2563eb", color: "#fff",
  border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
};
const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 16
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer"
};
