import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import DryNeedling from "./DryNeedling";
import WallClimbing from "./WallClimbing";

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
          { label: "Dry Needling", value: "dry_needling" },
          { label: "Wall Climbing", value: "wall_climbing" }
        ]
      },
      {
        type: "custom",
        name: "_open_saved_consent",
        render: ({ values, onChange: _onChange }) => {
          const hasDry = !!values.dry_needling_consent;
          const hasWall = !!values.wall_climbing_consent;
          if (!hasDry && !hasWall) return null;
          return (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A", marginBottom: 8 }}>
                Open Saved Consent
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {hasDry && (
                  <button
                    type="button"
                    style={savedBtn}
                    onClick={() => _onChange("_open_consent_trigger", "dry_needling")}
                  >
                    Open Dry Needling Consent
                  </button>
                )}
                {hasWall && (
                  <button
                    type="button"
                    style={savedBtn}
                    onClick={() => _onChange("_open_consent_trigger", "wall_climbing")}
                  >
                    Open Wall Climbing Consent
                  </button>
                )}
              </div>
            </div>
          );
        }
      },
      {
        name: "dr_hep_reviewed",
        type: "checkbox-group",
        options: [{ label: "Home Exercise Program (HEP) reviewed and demonstrated", value: "yes" }]
      },
      { type: "subheading", label: "Referral Information" },
      { name: "referred_by", label: "Referred by", type: "input", readOnly: true },
      { name: "referral_reasons", label: "Referral Reasons", type: "textarea", readOnly: true }
    ]
  }]
};

const FUNCTIONAL_STATUS_OPTIONS = [
  { label: "Independent", value: "independent" },
  { label: "Supervision", value: "supervision" },
  { label: "Assist", value: "assist" },
  { label: "Dependent", value: "dependent" }
];

const HOME_ASSESSMENT_SCHEMA = {
  title: "Home Assessment",
  sections: [{
    fields: [
      { type: "subheading", label: "Occupational Profile" },
      {
        name: "ha_pre_morbid_function",
        label: "Pre-morbid function",
        type: "radio",
        options: [
          { label: "Independent", value: "independent" },
          { label: "Semi-dependent", value: "semi_dependent" },
          { label: "Dependent", value: "dependent" }
        ]
      },
      {
        name: "ha_current_main_concerns",
        label: "Current main concerns (patient/caregiver report)",
        type: "textarea"
      },
      { type: "subheading", label: "Patient Goals" },
      { name: "ha_short_term_goals", label: "Short term goals", type: "input" },
      { name: "ha_long_term_goals", label: "Long term goals", type: "input" },
      {
        name: "ha_roles",
        label: "Roles",
        type: "radio",
        options: [
          { label: "Worker", value: "worker" },
          { label: "Caregiver", value: "caregiver" },
          { label: "Retired", value: "retired" }
        ]
      },

      { type: "subheading", label: "Home Environment Overview" },
      {
        name: "ha_residence_type",
        label: "Type of residence",
        type: "radio",
        options: [
          { label: "Terrace house", value: "terrace_house" },
          { label: "Flat", value: "flat" },
          { label: "Apartment", value: "apartment" },
          { label: "Others", value: "others" }
        ]
      },
      {
        name: "ha_residence_type_others",
        label: "Others (specify)",
        type: "input",
        showIf: { field: "ha_residence_type", equals: "others" }
      },
      {
        name: "ha_living_arrangement",
        label: "Living arrangement",
        type: "radio",
        options: [
          { label: "Alone", value: "alone" },
          { label: "With family", value: "with_family" },
          { label: "Paid caregiver", value: "paid_caregiver" }
        ]
      },
      { name: "ha_number_of_storeys", label: "Number of storeys", type: "input" },
      {
        name: "ha_bedroom_location",
        label: "Bedroom location",
        type: "radio",
        options: [
          { label: "Ground floor", value: "ground_floor" },
          { label: "Upstairs", value: "upstairs" }
        ]
      },

      { type: "subheading", label: "Access to Home" },
      {
        name: "ha_access_to_home",
        label: "Access to home",
        type: "checkbox-group",
        options: [
          { label: "Steps", value: "steps" },
          { label: "Ramp present", value: "ramp_present" },
          { label: "Lift access", value: "lift_access" }
        ]
      },
      {
        name: "ha_steps_number",
        label: "Steps (number)",
        type: "input",
        showIf: { field: "ha_access_to_home", includes: "steps" }
      },
      {
        name: "ha_steps_handrail",
        label: "Handrail",
        type: "radio",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ],
        showIf: { field: "ha_access_to_home", includes: "steps" }
      },
      {
        name: "ha_surface_condition",
        label: "Surface condition",
        type: "radio",
        options: [
          { label: "Even", value: "even" },
          { label: "Uneven", value: "uneven" }
        ]
      },

      { type: "subheading", label: "Functional Status (ADL / IADL)" },
      { type: "subheading", label: "Basic ADL" },
      { type: "grid-header", cols: ["Task", "Independent", "Supervision", "Assist", "Dependent"] },
      { name: "ha_adl_bathing", label: "Bathing", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_adl_dressing", label: "Dressing", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_adl_toileting", label: "Toileting", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_adl_feeding", label: "Feeding", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_adl_mobility", label: "Mobility", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },

      { type: "subheading", label: "Instrumental ADL (IADL)" },
      { type: "grid-header", cols: ["Task", "Independent", "Supervision", "Assist", "Dependent"] },
      { name: "ha_iadl_cooking", label: "Cooking", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_iadl_medication_management", label: "Medication management", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_iadl_housekeeping", label: "Housekeeping", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_iadl_shopping", label: "Shopping", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_iadl_driving", label: "Driving", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS }
    ]
  }]
};

export default function HomeAssessment({ patient }) {
  const [values, setValues] = useState({});
  const [showConsentModal, setShowConsentModal] = useState(false);
  const dryNeedlingRef = React.useRef({});
  const wallClimbingRef = React.useRef({});

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      referred_by: patient.case_manager || "",
      referral_reasons: patient.diagnosis_history || patient.icd || ""
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

  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: patient?.medical_history || "",
    past_family_history: patient?.family_medical_history || "",
    alerts_and_allergies: patient?.alerts_and_allergies_history || ""
  });

  function PatientInformationBlock({ patient: currentPatient, history, setHistory }) {
    if (!currentPatient) return null;
    const formatDate = (dateStr) => {
      if (!dateStr) return "-";
      try {
        return new Date(dateStr).toLocaleDateString();
      } catch {
        return "-";
      }
    };

    return (
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, fontSize: 14 }}>
          <div><b>Name:</b> {currentPatient.name}</div>
          <div><b>IC:</b> {currentPatient.id}</div>
          <div><b>DOB:</b> {formatDate(currentPatient.dob)}</div>
          <div><b>Age / Gender:</b> {currentPatient.age} / {currentPatient.sex}</div>
          <div><b>ICD:</b> {currentPatient.icd}</div>
          <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>
          <div><b>Date of Onset:</b> {formatDate(currentPatient.date_of_onset)}</div>
          <div><b>Duration of Diagnosis:</b> -</div>
          <div><b>Primary Diagnosis:</b> {currentPatient.diagnosis_history || "-"}</div>
          <div><b>Secondary Diagnosis:</b> {currentPatient.medical_history || "-"}</div>
          <div><b>Dominant Side:</b> {currentPatient.dominant_side || "-"}</div>
          <div><b>Language Preference:</b> {currentPatient.language_preference || "-"}</div>
          <div><b>Education Level:</b> {currentPatient.education_background || "-"}</div>
          <div><b>Occupation:</b> {currentPatient.occupation || "-"}</div>
          <div><b>Work Status:</b> {currentPatient.employment_status || "-"}</div>
          <div><b>Driving Status:</b> {currentPatient.driving_status || "-"}</div>
          <div><b>Marital Status:</b> {currentPatient.marital_status || "-"}</div>
          <div><b>PP/OB:</b> {currentPatient.pp_ob || "-"}</div>
          <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
            <h3>Patient History</h3>
            <div>
              <b>Past Medical History</b>
              <textarea
                style={taStyle}
                value={history.past_medical_history}
                onChange={e => setHistory(p => ({ ...p, past_medical_history: e.target.value }))}
              />
            </div>
            <div>
              <b>Family History</b>
              <textarea
                style={taStyle}
                value={history.past_family_history}
                onChange={e => setHistory(p => ({ ...p, past_family_history: e.target.value }))}
              />
            </div>
            <div>
              <b>Allergies</b>
              <textarea
                style={taStyle}
                value={history.alerts_and_allergies}
                onChange={e => setHistory(p => ({ ...p, alerts_and_allergies: e.target.value }))}
              />
            </div>
            <button style={alertBtn}>🚨 Alerts</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <CommonFormBuilder schema={CONTAINER_SCHEMA} values={{}} onChange={() => {}}>
        <PatientInformationBlock
          patient={patient}
          history={patientHistory}
          setHistory={setPatientHistory}
        />
      </CommonFormBuilder>

      <CommonFormBuilder schema={CONSENT_AND_REFERRAL_SCHEMA} values={values} onChange={onChange} />
      <CommonFormBuilder schema={HOME_ASSESSMENT_SCHEMA} values={values} onChange={onChange} />

      {showConsentModal && values.consent_obtained && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <button style={modalClose} onClick={() => setShowConsentModal(false)}>x</button>
            <div style={{ maxHeight: "75vh", overflowY: "auto", paddingRight: 6 }}>
              {values.consent_obtained === "dry_needling" && (
                <DryNeedling
                  key={`dry-${values.dry_needling_consent?.submittedAt || "new"}`}
                  patient={patient}
                  initialValues={values.dry_needling_consent || {}}
                  onBack={() => setShowConsentModal(false)}
                  onValuesChange={(localValues) => { dryNeedlingRef.current = localValues; }}
                  onSubmit={(submittedValues) => {
                    onChange("dry_needling_consent", {
                      ...submittedValues,
                      submittedAt: new Date().toISOString(),
                      saved: true,
                      consent_type: "Dry Needling"
                    });
                    setShowConsentModal(false);
                  }}
                />
              )}

              {values.consent_obtained === "wall_climbing" && (
                <WallClimbing
                  key={`wall-${values.wall_climbing_consent?.submittedAt || "new"}`}
                  patient={patient}
                  initialValues={values.wall_climbing_consent || {}}
                  onBack={() => setShowConsentModal(false)}
                  onValuesChange={(localValues) => { wallClimbingRef.current = localValues; }}
                  onSubmit={(submittedValues) => {
                    onChange("wall_climbing_consent", {
                      ...submittedValues,
                      submittedAt: new Date().toISOString(),
                      saved: true,
                      consent_type: "Wall Climbing"
                    });
                    setShowConsentModal(false);
                  }}
                />
              )}
            </div>
            <div style={{ textAlign: "right", marginTop: 16 }}>
              <button
                style={saveCloseBtn}
                onClick={() => {
                  const consentType = values.consent_obtained?.trim();
                  const latestValues = consentType === "dry_needling" ? dryNeedlingRef.current : wallClimbingRef.current;
                  if (consentType === "dry_needling") {
                    onChange("dry_needling_consent", {
                      ...latestValues,
                      submittedAt: new Date().toISOString(),
                      saved: true,
                      consent_type: "Dry Needling"
                    });
                  } else if (consentType === "wall_climbing") {
                    onChange("wall_climbing_consent", {
                      ...latestValues,
                      submittedAt: new Date().toISOString(),
                      saved: true,
                      consent_type: "Wall Climbing"
                    });
                  }
                  setShowConsentModal(false);
                }}
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const taStyle = {
  width: "100%",
  minHeight: 90,
  marginTop: 6,
  marginBottom: 12,
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 14,
  resize: "vertical"
};
const alertBtn = {
  marginTop: 10,
  padding: "10px 20px",
  borderRadius: 6,
  border: "1.5px solid #007bff",
  background: "#007bff",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer"
};
const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20
};
const modalBox = {
  background: "#fff",
  width: "95%",
  maxWidth: 1100,
  maxHeight: "92vh",
  borderRadius: 14,
  padding: 24,
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
};
const modalClose = {
  position: "absolute",
  top: 1,
  right: 4,
  border: "none",
  background: "#ef4444",
  color: "#fff",
  width: 29,
  height: 30,
  borderRadius: "50%",
  cursor: "pointer",
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
};
const saveCloseBtn = {
  padding: "10px 18px",
  border: "none",
  borderRadius: 8,
  background: "#2563eb",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};
const savedBtn = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #2563eb",
  background: "#eff6ff",
  color: "#2563eb",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  whiteSpace: "nowrap"
};
