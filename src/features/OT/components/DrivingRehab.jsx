import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import DryNeedling from "./DryNeedling";
import WallClimbing from "./WallClimbing";
import PatientCard from "../../../shared/cards/PatientCard";

const CONTAINER_SCHEMA = { title: "Patient Information", sections: [] };

const CONSENT_AND_REFERRAL_SCHEMA = {
  title: "",
  sections: [{
    fields: [
      {
        name: "consent_obtained",
        label: "Consent",
        type: "single-select",
        options: [
          { label: "Dry Needling",  value: "dry_needling"  },
          { label: "Wall Climbing", value: "wall_climbing" }
        ]
      },
      {
        type: "custom",
        name: "_open_saved_consent",
        render: ({ values, onChange: _onChange }) => {
          const hasDry  = !!values.dry_needling_consent;
          const hasWall = !!values.wall_climbing_consent;
          if (!hasDry && !hasWall) return null;
          return (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A", marginBottom: 8 }}>Open Saved Consent</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {hasDry  && <button type="button" style={savedBtn} onClick={() => _onChange("_open_consent_trigger", "dry_needling")}>Open Dry Needling Consent</button>}
                {hasWall && <button type="button" style={savedBtn} onClick={() => _onChange("_open_consent_trigger", "wall_climbing")}>Open Wall Climbing Consent</button>}
              </div>
            </div>
          );
        }
      },
      { name: "dr_hep_reviewed",      type: "checkbox-group", options: [{ label: "Home Exercise Program (HEP) reviewed and demonstrated", value: "yes" }] },
      { type: "subheading", label: "Referral Information" },
      { name: "referred_by",     label: "Referred by",     type: "input",    readOnly: true },
      { name: "referral_reasons",label: "Referral Reasons",type: "textarea", readOnly: true },
    ]
  }]
};

const ACTIONS = [
  { type: "back",  label: "Back"  },
  { type: "clear", label: "Clear" },
  { type: "save",  label: "Save"  },
];

const GFP = [
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" },
];

const SUBJECTIVE_SCHEMA = {
  title: "SUBJECTIVE",
  actions: ACTIONS,
  sections: [{
    fields: [
      {
        name: "dr_steering_control",
        label: "Steering Control",
        type: "radio",
        options: [
          { label: "Right", value: "right" },
          { label: "Left",  value: "left"  },
        ]
      },
      {
        name: "dr_accel_brake",
        label: "Accelerator/Brake Control",
        type: "radio",
        options: [
          { label: "Right", value: "right" },
          { label: "Left",  value: "left"  },
        ]
      },
      { type: "subheading", label: "Vision" },
      {
        name: "dr_right_eye_acuity",
        label: "Right Eye Visual Acuity",
        type: "radio",
        options: [
          { label: "Good", value: "good" },
          { label: "Fair", value: "fair" },
          { label: "Poor", value: "poor" },
        ]
      },
      {
        name: "dr_left_eye_acuity",
        label: "Left Eye Visual Acuity",
        type: "radio",
        options: [
          { label: "Good", value: "good" },
          { label: "Fair", value: "fair" },
          { label: "Poor", value: "poor" },
        ]
      },
      {
        name: "dr_right_eye_fields",
        label: "Right Eye Visual Fields",
        type: "radio",
        options: [
          { label: "Good", value: "good" },
          { label: "Fair", value: "fair" },
          { label: "Poor", value: "poor" },
        ]
      },
      {
        name: "dr_left_eye_fields",
        label: "Left Eye Visual Fields",
        type: "radio",
        options: [
          { label: "Good", value: "good" },
          { label: "Fair", value: "fair" },
          { label: "Poor", value: "poor" },
        ]
      },
    ]
  }]
};

const OBJECTIVE_SCHEMA = {
  title: "OBJECTIVE",
  actions: ACTIONS,
  sections: [{
    fields: [

      /* ── Physical / Motor ── */
      { type: "subheading", label: "Physical / Motor" },
      {
        name: "dr_dominant_hand",
        label: "Dominant Hand",
        type: "radio",
        options: [{ label: "Right", value: "right" }, { label: "Left", value: "left" }]
      },
      { name: "dr_dominant_hand_specify", label: "Specify", type: "input",
        showIf: { or: [{ field: "dr_dominant_hand", equals: "right" }, { field: "dr_dominant_hand", equals: "left" }] }
      },
      {
        name: "dr_hand_function", label: "Hand Function / Dexterity Test", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_rom", label: "ROM", type: "radio",
        options: [{ label: "Full AROM", value: "full_arom" }, { label: "Limited AROM", value: "limited_arom" }]
      },
      {
        name: "dr_strength", label: "Strength / MMT / Power", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_mas", label: "Modified Ashworth Scale (MAS)", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_sensation", label: "Sensation", type: "radio",
        options: [{ label: "Intact", value: "intact" }, { label: "Impaired", value: "impaired" }]
      },
      {
        name: "dr_coordination", label: "Coordination", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },

      /* ── Proprioception Test ── */
      { type: "subheading", label: "Proprioception Test" },
      {
        name: "dr_prop_upper", label: "Upper Limb", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_prop_lower", label: "Lower Limb", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },

      /* ── Balance ── */
      { type: "subheading", label: "Balance" },
      { name: "dr_berg_balance", label: "Berg Balance Scale", type: "input", placeholder: "Score" },

      /* ── General Physical Endurance ── */
      { type: "subheading", label: "General Physical Endurance" },
      { name: "dr_6mwt",          label: "6MWT",                type: "input", placeholder: "metres" },
      { name: "dr_wheelchair_mgmt",label: "W/Chair Management", type: "input" },
      {
        name: "dr_cabin_control", label: "Arms enough movement and strength to control all features and gadgets at cabin",
        type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_brake_reaction", label: "Brake Reaction Time (s)",
        info: { title: "Brake Reaction Time", content: ["0.35–0.65 seconds — Good", "0.66–1.0 seconds — Fair", "More than 1.0 second — Poor"] },
        type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_heel_pivot", label: "Right Heel Pivot Test", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },

      /* ── Cognitive And Perceptual ── */
      { type: "subheading", label: "Cognitive And Perceptual" },
      {
        name: "dr_moca", label: "Montreal Cognitive Assessment (MoCA)",
        info: { title: "MoCA Interpretation", content: ["27 and above — Good", "16–26 — Fair", "0–15 — Poor"] },
        type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_rdb", label: "Rookwood Driving Battery (RDB)",
        type: "scale-slider",
        min: 0,
        max: 22,
        step: 1,
        showValue: true,
        tickMajorValues: [0, 5, 10, 15, 20, 22],
        tickMinorStep: 1,
        showMinorTicks: true,
        showMinorLabels: false,
        ranges: [
          { min: 0,  max: 5,  label: "Pass On Road Test",                          color: "#22c55e" },
          { min: 6,  max: 10, label: "Reduced Ability but Appropriate For On Road", color: "#f59e0b" },
          { min: 11, max: 22, label: "Not Indicated For On Road Test",              color: "#ef4444" },
        ]
      },
      {
        name: "dr_cotnab", label: "Chessington Occupational Therapy Neurological Assessment Battery (COTNAB)",
        type: "radio", labelAbove: true,
        options: [
          { label: "Within Normal Limit",          value: "normal"          },
          { label: "Below Average",                value: "below_average"   },
          { label: "Borderline",                   value: "borderline"      },
          { label: "Impaired",                     value: "impaired"        },
          { label: "Severely Impaired",            value: "severely_impaired"},
          { label: "Unable To Perform / Affected Side", value: "unable"     },
        ]
      },
      {
        name: "dr_others_cog",
        label: "Others",
        type: "checkbox-group",
        options: [
          { label: "Digital Cognitive Assessment (DCOG)",                    value: "dcog" },
          { label: "RPAB (Rivermead Perceptual Assessment Battery)",         value: "rpab" },
        ]
      },
      { name: "dr_dcog_result", label: "DCOG Result", type: "input",
        showIf: { field: "dr_others_cog", includes: "dcog" }
      },
      { name: "dr_rpab_result", label: "RPAB Result", type: "input",
        showIf: { field: "dr_others_cog", includes: "rpab" }
      },
      {
        name: "dr_memory", label: "Memory", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_road_rules", label: "Knowledge of Road Rules and Signs", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_judgement", label: "Judgement", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_decision_making", label: "Decision Making", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_vehicle_knowledge", label: "Knowledge of Basic Vehicle Components", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },
      {
        name: "dr_visual_understanding", label: "Understand What He/She Sees", type: "radio",
        options: [{ label: "Good", value: "good" }, { label: "Fair", value: "fair" }, { label: "Poor", value: "poor" }]
      },

      /* ── Behavioral And Psychosocial ── */
      { type: "subheading", label: "Behavioral And Psychosocial" },
      { name: "dr_anger_mgmt",    label: "Anger Management",      type: "input" },
      { name: "dr_stress_tolerance",label: "Stress Tolerance",    type: "input" },
      { name: "dr_reckless_driving",label: "Reckless Driving Attitude", type: "input" },

    ]
  }]
};

const ASSESSMENT_SCHEMA = {
  title: "ASSESSMENT",
  actions: ACTIONS,
  sections: [{
    fields: [
      { type: "subheading", label: "On Road Driving Summary" },

      /* ── Hand Control ── */
      { type: "subheading", label: "Hand Control" },
      { name: "dr_pre_drive_check",  label: "Pre-Drive Check",   type: "radio", options: GFP },
      { name: "dr_seat_position",    label: "Seat Position",     type: "radio", options: GFP },
      { name: "dr_seat_belt",        label: "Seat Belt",         type: "radio", options: GFP },
      { name: "dr_rear_view_mirrors",label: "Rear View Mirrors", type: "radio", options: GFP },
      { name: "dr_hand_control_specify", label: "Specify", type: "textarea" },

      /* ── Posture ── */
      { type: "subheading", label: "Posture" },
      { name: "dr_leg_length",       label: "Leg Length",         type: "radio", options: GFP },
      { name: "dr_arms_length",      label: "Arm's Length",       type: "radio", options: GFP },
      { name: "dr_right_foot_brace", label: "Right Foot Bracing", type: "radio", options: GFP },
      { name: "dr_posture_specify",  label: "Specify", type: "textarea" },

      /* ── Steering ── */
      { type: "subheading", label: "Steering" },
      { name: "dr_hand_contact",     label: "Hand Contact",  type: "radio", options: GFP },
      { name: "dr_hand_position",    label: "Hand Position", type: "radio", options: GFP },
      { name: "dr_technique",        label: "Technique",     type: "radio", options: GFP },
      { name: "dr_steering_specify", label: "Specify", type: "textarea" },

      /* ── Vehicle Control Skills ── */
      { type: "subheading", label: "Vehicle Control Skills" },
      { name: "dr_obs_to_rear",      label: "Observation to Rear", type: "radio", options: GFP },
      { name: "dr_appropriate_speed",label: "Appropriate Speed",   type: "radio", options: GFP },
      { name: "dr_accuracy",         label: "Accuracy",            type: "radio", options: GFP },
      { name: "dr_vcs_specify",      label: "Specify", type: "textarea" },
      { name: "dr_vcs_overall",      label: "Vehicle Control Skills (Overall)", type: "radio", options: GFP },

      /* ── Shutdown ── */
      { type: "subheading", label: "Shutdown" },
      {
        name: "dr_shutdown",
        label: "When stopped, apply handbrake first, then release footbrake, then 'P' and switch engine off",
        type: "radio", options: GFP
      },

      /* ── Clinical Impression & Rehab Potential ── */
      { name: "dr_clinical_impression", label: "Clinical Impression", type: "textarea" },
      
    ]
  }]
};

const PLAN_SCHEMA = {
  title: "PLAN",
  actions: ACTIONS,
  sections: [{
    fields: [


      /* ── Therapeutic Intervention ── */
      { type: "subheading", label: "Therapeutic Intervention" },

      /* Shifting Gear */
      {
        name: "dr_shifting_gear",
        label: "Shifting Gear",
        type: "checkbox-group",
        options: [
          { label: "Floor Manual",     value: "floor_manual"     },
          { label: "Automatic",        value: "automatic"        },
          { label: "Extended Clutch",  value: "extended_clutch"  },
        ]
      },
      { name: "dr_shifting_gear_specify", label: "Specify", type: "input",
        showIf: { field: "dr_shifting_gear", notEmpty: true }
      },

      /* Accelerator */
      {
        name: "dr_accelerator",
        label: "Accelerator",
        type: "checkbox-group",
        options: [
          { label: "Hand Control Right",    value: "hand_right"      },
          { label: "Hand Control Left",     value: "hand_left"       },
          { label: "Foot Control Right",    value: "foot_right"      },
          { label: "Foot Control Left",     value: "foot_left"       },
          { label: "Foot Control-Extended", value: "foot_extended"   },
        ]
      },
      { name: "dr_accelerator_specify", label: "Specify", type: "input",
        showIf: { field: "dr_accelerator", notEmpty: true }
      },

      /* Brake */
      {
        name: "dr_brake",
        label: "Brake",
        type: "checkbox-group",
        options: [
          { label: "Power",                value: "power"           },
          { label: "Hand Control",         value: "hand_control"    },
          { label: "Hand Control-Extended",value: "hand_extended"   },
        ]
      },
      { name: "dr_brake_specify", label: "Specify", type: "input",
        showIf: { field: "dr_brake", notEmpty: true }
      },

      /* Steering Knob */
      {
        name: "dr_steering_knob",
        label: "Steering Knob",
        type: "checkbox-group",
        options: [
          { label: "Swivel Knob",   value: "swivel_knob"  },
          { label: "Palmar Cuff",   value: "palmar_cuff"  },
          { label: "Amputee Ring",  value: "amputee_ring" },
        ]
      },
      { name: "dr_steering_knob_specify", label: "Specify", type: "input",
        showIf: { field: "dr_steering_knob", notEmpty: true }
      },

      /* Plan free text */
      { type: "subheading", label: "Summary" },
      { name: "dr_plan", type: "textarea" },

    ]
  }]
};

const COMBINED_SCHEMA = {
  title: "DRIVING REHABILITATION ASSESSMENT",
  actions: ACTIONS,
  sections: [{
    fields: [
      ...SUBJECTIVE_SCHEMA.sections[0].fields,
      ...OBJECTIVE_SCHEMA.sections[0].fields,
      ...ASSESSMENT_SCHEMA.sections[0].fields,
      ...PLAN_SCHEMA.sections[0].fields,
    ]
  }]
};

export default function DrivingRehab({ patient, onSubmit, onBack }) {
  const [values, setValues]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const dryNeedlingRef  = React.useRef({});
  const wallClimbingRef = React.useRef({});

  const storageKey = patient ? `ot_driving_rehab_draft_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setValues(JSON.parse(saved).values || {});
  }, [storageKey]);

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      referred_by:      patient.case_manager || "",
      referral_reasons: patient.diagnosis_history || patient.icd || "",
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
    if (name === "consent_obtained" && value && value !== values.consent_obtained) {
      setShowConsentModal(true);
    }
    if (name === "_open_consent_trigger" && value) {
      setValues(v => ({ ...v, consent_obtained: value }));
      setShowConsentModal(true);
    }
  };

  const handleAction = (type) => {
    if (type === "back")  { onBack?.(); return; }
    if (type === "clear") { setValues({}); setSubmitted(false); if (storageKey) localStorage.removeItem(storageKey); return; }
    if (type === "save" && storageKey) {
      localStorage.setItem(storageKey, JSON.stringify({ values, updatedAt: new Date() }));
      alert("Driving Rehab draft saved");
    }
  };

  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: patient?.medical_history || "",
    past_family_history:  patient?.family_medical_history || "",
    alerts_and_allergies: patient?.alerts_and_allergies_history || "",
  });

  function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
    if (!patient) return null;
    const formatDate = (dateStr) => {
      if (!dateStr) return "-";
      try { return new Date(dateStr).toLocaleDateString(); } catch { return "-"; }
    };
    return (
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, fontSize: 14 }}>
          <div><b>Name:</b> {patient.name}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {formatDate(patient.dob)}</div>
          <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
          <div><b>ICD:</b> {patient.icd}</div>
          <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>
          <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
          <div><b>Duration of Diagnosis:</b> -</div>
          <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
          <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
          <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
          <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
          <div><b>Education Level:</b> {patient.education_background || "-"}</div>
          <div><b>Occupation:</b> {patient.occupation || "-"}</div>
          <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
          <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
          <div><b>Marital Status:</b> {patient.marital_status || "-"}</div>
          <div><b>PP/OB:</b> {patient.pp_ob || "-"}</div>
          <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
            <h3>Patient History</h3>
            <div>
              <b>Past Medical History</b>
              <textarea style={taStyle} value={patientHistory.past_medical_history}
                onChange={e => setPatientHistory(p => ({ ...p, past_medical_history: e.target.value }))} />
            </div>
            <div>
              <b>Family History</b>
              <textarea style={taStyle} value={patientHistory.past_family_history}
                onChange={e => setPatientHistory(p => ({ ...p, past_family_history: e.target.value }))} />
            </div>
            <div>
              <b>Allergies</b>
              <textarea style={taStyle} value={patientHistory.alerts_and_allergies}
                onChange={e => setPatientHistory(p => ({ ...p, alerts_and_allergies: e.target.value }))} />
            </div>
            <button style={alertBtn}>🚨 Alerts</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      {/* Patient Info */}
      <CommonFormBuilder schema={CONTAINER_SCHEMA} values={{}} onChange={() => {}}>
        <PatientInformationBlock patient={patient} patientHistory={patientHistory} setPatientHistory={setPatientHistory} />
      </CommonFormBuilder>

      {/* Consent & Referral */}
      <CommonFormBuilder schema={CONSENT_AND_REFERRAL_SCHEMA} values={values} onChange={onChange} />

      {/* ===== CONSENT MODAL ===== */}
      {showConsentModal && values.consent_obtained && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <button style={modalClose} onClick={() => setShowConsentModal(false)}>×</button>
            <div style={{ maxHeight: "75vh", overflowY: "auto", paddingRight: 6 }}>
              {values.consent_obtained === "dry_needling" && (
                <DryNeedling key={`dry-${values.dry_needling_consent?.submittedAt || "new"}`} patient={patient} initialValues={values.dry_needling_consent || {}} onBack={() => setShowConsentModal(false)} onValuesChange={(l) => { dryNeedlingRef.current = l; }} onSubmit={(v) => { onChange("dry_needling_consent", { ...v, submittedAt: new Date().toISOString(), saved: true, consent_type: "Dry Needling" }); setShowConsentModal(false); }} />
              )}
              {values.consent_obtained === "wall_climbing" && (
                <WallClimbing key={`wall-${values.wall_climbing_consent?.submittedAt || "new"}`} patient={patient} initialValues={values.wall_climbing_consent || {}} onBack={() => setShowConsentModal(false)} onValuesChange={(l) => { wallClimbingRef.current = l; }} onSubmit={(v) => { onChange("wall_climbing_consent", { ...v, submittedAt: new Date().toISOString(), saved: true, consent_type: "Wall Climbing" }); setShowConsentModal(false); }} />
              )}
            </div>
            <div style={{ textAlign: "right", marginTop: 16 }}>
              <button style={saveCloseBtn} onClick={() => {
                const t = values.consent_obtained?.trim();
                const lv = t === "dry_needling" ? dryNeedlingRef.current : wallClimbingRef.current;
                if (t === "dry_needling") onChange("dry_needling_consent", { ...lv, submittedAt: new Date().toISOString(), saved: true, consent_type: "Dry Needling" });
                else if (t === "wall_climbing") onChange("wall_climbing_consent", { ...lv, submittedAt: new Date().toISOString(), saved: true, consent_type: "Wall Climbing" });
                setShowConsentModal(false);
              }}>Save & Close</button>
            </div>
          </div>
        </div>
      )}
 
      {/* Combined Scrollable Report (Subjective, Objective, Assessment, Plan) */}
      <CommonFormBuilder
        schema={COMBINED_SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button
            type="button"
            style={submitBtn}
            onClick={() => {
              setSubmitted(true);
              onSubmit?.(values);
              alert("Driving Rehab assessment submitted");
            }}
          >
            Submit
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}

const submitBtn = { padding: "12px 32px", background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" };
const taStyle   = { width: "100%", minHeight: 90, marginTop: 6, marginBottom: 12, padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, resize: "vertical" };
const alertBtn  = { marginTop: 10, padding: "10px 20px", borderRadius: 6, border: "1.5px solid #007bff", background: "#007bff", color: "#fff", fontWeight: 600, cursor: "pointer" };

const modalOverlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 };
const modalBox     = { background: "#fff", width: "95%", maxWidth: 1100, maxHeight: "92vh", borderRadius: 14, padding: 24, position: "relative", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" };
const modalClose   = { position: "absolute", top: 1, right: 4, border: "none", background: "#ef4444", color: "#fff", width: 29, height: 30, borderRadius: "50%", cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 };
const saveCloseBtn = { padding: "10px 18px", border: "none", borderRadius: 8, background: "#2563eb", color: "#fff", fontWeight: 700, cursor: "pointer" };
const savedBtn     = { padding: "10px 14px", borderRadius: 8, border: "1px solid #2563eb", background: "#eff6ff", color: "#2563eb", fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" };
