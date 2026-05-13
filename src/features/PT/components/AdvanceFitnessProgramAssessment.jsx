import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PatientCard from "../../../shared/cards/PatientCard";
import ATVConsentForm from "./ATVConsentForm";
import { loadAtvConsent, saveAtvConsent } from "./atvConsentStorage";

const SOAP_TABS = ["subjective", "objective", "assessment", "plan"];

const SUBJECTIVE_SCHEMA = {
  title: "SUBJECTIVE",
  sections: [
    {
      fields: [
        {
          name: "route_selection",
          label: "Route Selection",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Adaptive Wall", value: "adaptive_wall" },
            { label: "Curved Wall", value: "curved_wall" },
            { label: "Bouldering Wall", value: "bouldering_wall" },
          ],
        },
      ],
    },
  ],
};

// Pre-SOAP block (matches what you see above SOAP in Neuromodulation/Neurac flow)
const SPINAL_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: [],
};

const CONSENT_AND_REFERRAL_SCHEMA = {
  title: "",
  sections: [
    {
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "consent_obtained",
              type: "checkbox-group",
              options: [{ label: "Consent obtained", value: "yes" }],
            },
            {
              name: "consent_upload",
              label: "Upload",
              type: "file-upload",
              showIf: { field: "consent_obtained", includes: "yes" },
            },
          ],
        },
        {
          name: "hep_reviewed",
          type: "checkbox-group",
          options: [{ label: "Home Exercise Program (HEP) reviewed and demonstrated", value: "yes" }],
        },
        {
          name: "current_diagnosis",
          label: "Current Diagnosis",
          type: "multi-select-dropdown",
          options: [
            { label: "Stroke", value: "stroke" },
            { label: "Traumatic Brain Injury", value: "tbi" },
            { label: "Parkinson Disease", value: "parkinson" },
            { label: "Spinal Cord Injury", value: "sci" },
            { label: "Peripheral Neuropathy", value: "peripheral_neuropathy" },
            { label: "Ligament injuries", value: "ligament_injuries" },
            { label: "Ataxia", value: "ataxia" },
            { label: "Others", value: "others" },
          ],
        },
        {
          name: "current_diagnosis_other",
          label: "Other Diagnosis (specify)",
          type: "textarea",
          showIf: { field: "current_diagnosis", includes: "others" },
        },
        {
          name: "equipment_owned",
          label: "List of Equipment Owned",
          type: "checkbox-group",
          options: [
            { label: "PERKESO", value: "perkeso" },
            { label: "NGO", value: "ngo" },
            { label: "Self-purchased", value: "self" },
            { label: "Others", value: "others" },
          ],
        },
        {
          name: "equipment_perkeso",
          label: "PERKESO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "perkeso" },
        },
        {
          name: "equipment_ngo",
          label: "NGO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "ngo" },
        },
        {
          name: "equipment_self",
          label: "Self-purchased Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "self" },
        },
        {
          name: "equipment_others",
          label: "Other Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "others" },
        },
        { type: "subheading", label: "Referral Information" },
        {
          name: "referred_by",
          label: "Referred by",
          type: "input",
          readOnly: true,
        },
        {
          name: "referral_reasons",
          label: "Referral Reasons",
          type: "textarea",
          readOnly: true,
        },
      ],
    },
  ],
};

const OBJECTIVE_SUB_TABS = [
  { key: "cervical", label: "Cervical"  },
  { key: "shoulder", label: "Shoulder"  },
  { key: "elbow",    label: "Elbow"     },
  { key: "lumbar",   label: "Lumbar"    },
  { key: "knee",     label: "Knee"      },
  { key: "hip",      label: "Hip"       },
];

function ObjectiveWithSubTabs({ values, onChange, onSave, onClear }) {
  const [activeSub, setActiveSub] = useState("cervical");
  const saveProps = { onSave, onClear };

  return (
    <div>
      <div style={subTabRowStyle}>
        {OBJECTIVE_SUB_TABS.map(tab => (
          <div
            key={tab.key}
            onClick={() => setActiveSub(tab.key)}
            style={{ ...subTabItemStyle, ...(activeSub === tab.key ? subTabActiveStyle : {}) }}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {activeSub === "cervical" && <CervicalNeuracAssessment values={values} onChange={onChange} {...saveProps} />}
      {activeSub === "shoulder" && <ShoulderNeuracAssessment values={values} onChange={onChange} {...saveProps} />}
      {activeSub === "elbow"    && <ElbowNeuracAssessment    values={values} onChange={onChange} {...saveProps} />}
      {activeSub === "lumbar"   && <LumbarNeuracAssessment   values={values} onChange={onChange} {...saveProps} />}
      {activeSub === "knee"     && <KneeNeuracAssessment     values={values} onChange={onChange} {...saveProps} />}
      {activeSub === "hip"      && <HipNeuracAssessment      values={values} onChange={onChange} {...saveProps} />}
    </div>
  );
}

const subTabRowStyle = {
  display: "flex", gap: 0,
  borderBottom: "2px solid #e5e7eb",
  background: "#f1f5f9", padding: "0 16px",
};
const subTabItemStyle = {
  padding: "10px 24px", fontWeight: 600, fontSize: 14,
  cursor: "pointer", color: "#475569",
  borderBottom: "3px solid transparent", marginBottom: -2,
};
const subTabActiveStyle = {
  color: "#2563eb", borderBottom: "3px solid #2563eb", background: "#fff",
};

const OBJECTIVE_SCHEMA = {
  title: "OBJECTIVE",
  sections: [
    {
      fields: [
        {
          name: "overall_climbing_performance",
          label: "1) Overall Climbing Performance",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Pass with assistance & adaptation", value: "pass_with_assistance" },
            { label: "Unable to complete", value: "unable_to_complete" },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "overall_time_min", label: "Time (min)", type: "input" },
            { name: "overall_time_sec", label: "Time (sec)", type: "input" },
          ],
        },
        { type: "subheading", label: "2) Strength and Power" },
        {
          name: "grip_strength",
          label: "a) Grip",
          info: "Grip types (open, half-crimp) and endurance on smaller edges.",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },
        {
          name: "upper_body_pulling_power",
          label: "b) Upper Body Pulling Power",
          info: "Latissimus dorsi, biceps, and shoulders are critical for pulling the body up, especially on overhanging terrain.",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },

        { type: "subheading", label: "3) Core Stability and Tension" },
        {
          name: "body_tension",
          label: "a) Body Tension",
          info: "The ability to keep the body close to the wall and maintain tension across the core to prevent the feet from slipping (popping) or cutting on overhangs.",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },
        {
          name: "core_endurance",
          label: "b) Core Endurance",
          info: "The ability to maintain this tension throughout a long route.",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },
        {
          name: "postural_control",
          label: "c) Postural Control",
          info: "Maintaining balance and controlling the center of mass while moving between holds.",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },

        { type: "subheading", label: "4) Lower Body and Footwork" },
        {
          name: "foot_precision",
          label: "a) Foot Precision",
          info: "The ability to place feet accurately and silently on footholds, which conserves energy and reduces reliance on arm strength.",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },
        {
          name: "lower_limb_strength",
          label: "b) Lower Limb Strength",
          info: "Essential for pushing off on vertical walls and driving upward on steep terrain.",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },
        {
          name: "mobility_hip_flexibility",
          label: "c) Mobility (Hip Flexibility)",
          info: "High steps and the ability to turn hips into the wall (e.g., drop-knees) require significant hip flexibility.",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },

        { type: "subheading", label: "5) Mobility and Movement Efficiency" },
        {
          name: "hip_shoulder_flexibility",
          label: "a) Hip and Shoulder Flexibility",
          info: "Allows for greater reach and better positioning, often required in end-range movements.",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },
        {
          name: "movement_coordination",
          label: "b) Movement Coordination",
          info: "The ability to move smoothly and integrate limbs, often tested by observing whether the climber is scrappy or graceful.",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },
        {
          name: "weight_transfer",
          label: "c) Weight Transfer",
          info: "Efficiently shifting weight onto the legs, allowing the arms to rest.",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },

        {
          name: "endurance",
          label: "6) Endurance",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },
        {
          name: "attention_concentration",
          label: "7) Attention & Concentration",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },
      ],
    },
  ],
};

const ASSESSMENT_SCHEMA = {
  title: "ASSESSMENT",
  sections: [
    {
      fields: [
        {
          name: "clinical_impression",
          label: "Clinical Impression",
          type: "textarea",
        },
      ],
    },
  ],
};

const PLAN_SCHEMA = {
  title: "PLAN",
  sections: [
    {
      fields: [
        {
          name: "plan",
          label: "Plan",
          type: "textarea",
        },
      ],
    },
  ],
};

const SCHEMA_MAP = {
  subjective: SUBJECTIVE_SCHEMA,
  objective: OBJECTIVE_SCHEMA,
  assessment: ASSESSMENT_SCHEMA,
  plan: PLAN_SCHEMA,
};

export default function AdvanceFitnessProgramAssessment({ patient }) {
  const [values, setValues] = useState({});
  const [consentValues, setConsentValues] = useState({});
  const [activeTab, setActiveTab] = useState("subjective");
  const [atvSubmitted, setAtvSubmitted] = useState(false);

  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: patient?.medical_history || "",
    past_family_history: patient?.family_medical_history || "",
    alerts_and_allergies: patient?.alerts_and_allergies_history || "",
  });

  useEffect(() => {
    setPatientHistory({
      past_medical_history: patient?.medical_history || "",
      past_family_history: patient?.family_medical_history || "",
      alerts_and_allergies: patient?.alerts_and_allergies_history || "",
    });
  }, [patient]);

  const onChange = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));
  const onConsentChange = (name, value) => setConsentValues((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    if (!patient) return;
    setValues((prev) => ({
      ...prev,
      referred_by: patient?.case_manager || "",
      referral_reasons: patient?.diagnosis_history || patient?.icd || "",
    }));
  }, [patient]);

  // Load persisted ATV consent so "already submitted" shows everywhere
  useEffect(() => {
    if (!patient) return;
    const saved = loadAtvConsent(patient);
    if (!saved) {
      setAtvSubmitted(false);
      return;
    }
    setConsentValues(saved);
    setAtvSubmitted(!!saved.saved);
  }, [patient]);

  return (
    <div>
      {/* ===== PATIENT INFORMATION CARD ===== */}
      <CommonFormBuilder
        schema={SPINAL_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => {}}
      >
        <PatientCard patient={patient} />

        {/* Patient History */}
        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Patient History</div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Past Medical History</div>
            <textarea
              value={patientHistory.past_medical_history}
              onChange={(e) => setPatientHistory(p => ({ ...p, past_medical_history: e.target.value }))}
              style={historyTextarea}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Family History</div>
            <textarea
              value={patientHistory.past_family_history}
              onChange={(e) => setPatientHistory(p => ({ ...p, past_family_history: e.target.value }))}
              style={historyTextarea}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Allergies</div>
            <textarea
              value={patientHistory.alerts_and_allergies}
              onChange={(e) => setPatientHistory(p => ({ ...p, alerts_and_allergies: e.target.value }))}
              style={historyTextarea}
            />
          </div>

          <button type="button" style={alertBtn}>🚨 Alerts</button>
        </div>

        <button style={doctorsReportBtn}>Doctors Reports</button>
      </CommonFormBuilder>

      {/* ===== CONSENT & REFERRAL ===== */}
      <CommonFormBuilder
        schema={CONSENT_AND_REFERRAL_SCHEMA}
        values={values}
        onChange={onChange}
      />

      {/* ===== ATV CONSENT FORM ===== */}
      <ATVConsentForm
        patient={patient}
        values={consentValues}
        onChange={onConsentChange}
        submitted={atvSubmitted}
        onSubmit={(data) => {
          const saved = saveAtvConsent(patient, data);
          setConsentValues(saved || data);
          setAtvSubmitted(true);
        }}
      />

      {/* ===== SOAP TABS ===== */}
      <div>
        <div style={tabBar}>
          {SOAP_TABS.map((tab) => (
            <div
              key={tab}
              style={activeTab === tab ? tabActive : tabBtn}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </div>
          ))}
        </div>

        <CommonFormBuilder
          schema={SCHEMA_MAP[activeTab]}
          values={values}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12,
};

const tabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#0f172a",
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2451b3",
  color: "#2451b3",
};

function InfoRow({ label, value }) {
  return (
    <div style={infoItem}>
      <strong>{label}:</strong> {value}
    </div>
  );
}

const patientInfoMain = {
  padding: "0 2px 10px",
};

const patientInfoTitle = {
  margin: "0 0 12px",
  fontSize: 20,
  color: "#0f172a",
};

const patientInfoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "10px 16px",
  borderTop: "1px solid #e5e7eb",
  paddingTop: 12,
};

const infoItem = {
  fontSize: 14,
  color: "#1f2937",
};

function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
  if (!patient) return null;

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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          fontSize: 14,
        }}
      >
        <div>
          <b>Name:</b> {patient.name}
        </div>
        <div>
          <b>IC:</b> {patient.id}
        </div>
        <div>
          <b>DOB:</b> {formatDate(patient.dob)}
        </div>

        <div>
          <b>Age / Gender:</b> {patient.age} / {patient.sex}
        </div>
        <div>
          <b>ICD:</b> {patient.icd}
        </div>
        <div>
          <b>Date of Assessment:</b> {new Date().toLocaleDateString()}
        </div>
        <div>
          <b>Date of Onset:</b> {formatDate(patient.date_of_onset)}
        </div>
        <div>
          <b>Duration of Diagnosis:</b> -
        </div>
        <div>
          <b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}
        </div>
        <div>
          <b>Secondary Diagnosis:</b> {patient.medical_history || "-"}
        </div>
        <div>
          <b>Dominant Side:</b> {patient.dominant_side || "-"}
        </div>
        <div>
          <b>Language Preference:</b> {patient.language_preference || "-"}
        </div>

        <div>
          <b>Education Level:</b> {patient.education_background || "-"}
        </div>
        <div>
          <b>Occupation:</b> {patient.occupation || "-"}
        </div>
        <div>
          <b>Work Status:</b> {patient.employment_status || "-"}
        </div>
        <div>
          <b>Driving Status:</b> {patient.driving_status || "-"}
        </div>

        <div>
          <b>Marital Status:</b> {patient.marital_status || "-"}
        </div>
        <div>
          <b>PP/OB:</b> {patient.pp_ob || "-"}
        </div>

        {/* ===== HISTORY ===== */}
        <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
          <h3 style={{ margin: "0 0 10px" }}>Patient History</h3>

          <div style={{ marginBottom: 12 }}>
            <b>Past Medical History</b>
            <textarea
              style={textarea}
              value={patientHistory.past_medical_history}
              onChange={(e) =>
                setPatientHistory((prev) => ({
                  ...prev,
                  past_medical_history: e.target.value,
                }))
              }
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <b>Family History</b>
            <textarea
              style={textarea}
              value={patientHistory.past_family_history}
              onChange={(e) =>
                setPatientHistory((prev) => ({
                  ...prev,
                  past_family_history: e.target.value,
                }))
              }
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <b>Allergies</b>
            <textarea
              style={textarea}
              value={patientHistory.alerts_and_allergies}
              onChange={(e) =>
                setPatientHistory((prev) => ({
                  ...prev,
                  alerts_and_allergies: e.target.value,
                }))
              }
            />
          </div>

          <button style={alertBtn} type="button">
            🚨 Alerts
          </button>
        </div>
      </div>
    </div>
  );
}

const textarea = {
  width: "100%",
  minHeight: 90,
  marginTop: 6,
  marginBottom: 12,
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 14,
  resize: "vertical",
};

const alertBtn = {
  marginTop: 10,
  padding: "10px 20px",
  borderRadius: 6,
  border: "1.5px solid #007bff",
  background: "#007bff",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};

const historyTextarea = {
  width: "100%",
  minHeight: 90,
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 14,
  fontFamily: "inherit",
  resize: "vertical",
};

const doctorsReportBtn = {
  padding: "10px 20px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 8,
};
