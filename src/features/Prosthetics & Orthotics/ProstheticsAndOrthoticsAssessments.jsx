// OrthoticsAssessment.jsx
import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";
import LowerExtremityOrthoticsPrescription from "./LowerExtremityorthoticsAssessment";
import UpperExtremityOrthoticsPrescription from "./UpperExtremityorthoticsAssessment";
import AboveKneeMeasurementForm from "./AboveKneeMeasurementForm";
import AnkleFootOrthosisMeasurementForm from "./AnkleFootOrthosisMeasurementForm";
import BelowKneeMeasurementForm from "./BelowKneeMeasurementForm";
import CorrectiveAccommodativeFootOrthosisForm from "./CorrectiveAccommodativeFootOrthosisForm";
import ScoliosisBraceMeasurementForm from "./ScoliosisBraceMeasurementForm";
/* ===================== OPTIONS ===================== */

const YES_NO = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];

const CLASSIFICATION = [
  { label: "Neuro", value: "neuro" },
  { label: "SCI", value: "sci" },
  { label: "MSD", value: "msd" },
  { label: "Others", value: "others" }
];

const ORTHOTICS_ASSESSMENT_REGISTRY = {
  lower_extremity_orthotics: LowerExtremityOrthoticsPrescription,
  upper_extremity_orthotics: UpperExtremityOrthoticsPrescription,
  above_knee_measurement: AboveKneeMeasurementForm,
  ankle_foot_orthosis_measurement: AnkleFootOrthosisMeasurementForm,
  below_knee_measurement: BelowKneeMeasurementForm,
  corrective_accommodative_foot_orthosis: CorrectiveAccommodativeFootOrthosisForm,
  scoliosis_brace_measurement: ScoliosisBraceMeasurementForm
};


const PROGNOSIS = [
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" }
];

const WALKING_AID = [
  { label: "None", value: "none" },
  { label: "SPC", value: "spc" },
  { label: "Quadripod", value: "quadripod" },
  { label: "Walking Frame", value: "wf" },
  { label: "Wheelchair", value: "wheelchair" }
];

const WALKING_PATTERN = [
  { label: "Normal", value: "normal" },
  { label: "Hemiplegic", value: "hemiplegic" },
  { label: "Antalgic", value: "antalgic" },
  { label: "Ataxic", value: "ataxic" },
  { label: "Trendelenburg", value: "trendelenburg" }
];

const FOOT_CLEARANCE = [
  { label: "Normal", value: "normal" },
  { label: "Reduced", value: "reduced" },
  { label: "Dragging", value: "dragging" },
  { label: "Foot Drop", value: "foot_drop" }
];

const STEP_LENGTH = [
  { label: "Normal", value: "normal" },
  { label: "Shortened (affected side)", value: "short_affected" }
];

const STANCE_PHASE = [
  { label: "Normal", value: "normal" },
  { label: "Knee collapse", value: "knee_collapse" },
  { label: "Genu recurvatum", value: "genu_recurvatum" },
  { label: "Hip instability", value: "hip_instability" }
];

const SWING_PHASE = [
  { label: "Normal", value: "normal" },
  { label: "Circumduction", value: "circumduction" },
  { label: "Hip hiking", value: "hip_hiking" },
  { label: "Reduced flexion", value: "reduced_flexion" }
];

const WEIGHT_BEARING = [
  { label: "Symmetrical", value: "symmetrical" },
  { label: "Asymmetrical", value: "asymmetrical" }
];

const GAIT_BALANCE = [
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" }
];

const ENDURANCE = [
  { label: "Good", value: "good" },
  { label: "Limited distance", value: "limited" },
  { label: "Fatigue early", value: "fatigue" }
];

const INDICATIONS = [
  { label: "Improve stability", value: "stability" },
  { label: "Improve foot clearance", value: "clearance" },
  { label: "Reduce pain", value: "pain" },
  { label: "Prevent deformity", value: "deformity" },
  { label: "Support weak limb", value: "support" }
];

const ORTHOSIS_TYPES = [
  "FO",
  "AFO Rigid",
  "AFO Hinged",
  "AFO PLS",
  "GRAFO",
  "KO",
  "KAFO",
  "WHO Functional",
  "WHO Resting",
  "WHO Anti-spastic",
  "Elbow ROM",
  "Shoulder Support",
  "LSO",
  "TLSO",
  "Cervical Collar"
].map(v => ({ label: v, value: v }));

/* ===================== SCHEMAS ===================== */

const ORTHOTICS_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

const SUBJECTIVE_SCHEMA = {
  actions: [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ],
  fields: [
    { name: "pain_score", label: "Pain Score (0–10)", type: "input" },
    { name: "patient_complaint", label: "Patient Complaint", type: "textarea" },
    {
      name: "functional_difficulty",
      label: "Functional Difficulty (ADL / Mobility / Work)",
      type: "textarea"
    },
    {
      name: "patient_goals",
      label: "Patient Goals / Expectations",
      type: "textarea"
    }
  ]
};

const OBJECTIVE_SCHEMA = {
  title: "Objective",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
        {
      title: "Orthotics Prescription Forms",
      fields: [
        {
          name: "orthotics_objective_forms",
          type: "assessment-launcher",
          options: [
            {
              label: "Lower Extremity Orthotics Prescription",
              value: "lower_extremity_orthotics"
            },
            {
              label: "Upper Extremity Orthotics Prescription",
              value: "upper_extremity_orthotics"
            },
            {
              label: "Above Knee Measurement Form",
              value: "above_knee_measurement"
            },
            {
              label: "Ankle Foot Orthosis Measurement Form",
              value: "ankle_foot_orthosis_measurement"
            },
            {
              label: "Below Knee Measurement Form",
              value: "below_knee_measurement"
            },
            {
              label: "Corrective / Accommodative Foot Orthosis Measurement Form",
              value: "corrective_accommodative_foot_orthosis"
            },
            {
              label: "Scoliosis Brace Measurement Form",
              value: "scoliosis_brace_measurement"
            }
          ]
        }
      ]
    },

    {
      title: "Physical Examination (Auto from MDT)",
      fields: [
        { name: "ul_mmt_r", label: "UL MMT Right", type: "textarea", readOnly: true },
        { name: "ul_mmt_l", label: "UL MMT Left", type: "textarea", readOnly: true },
        { name: "ll_mmt_r", label: "LL MMT Right", type: "textarea", readOnly: true },
        { name: "ll_mmt_l", label: "LL MMT Left", type: "textarea", readOnly: true },
        { name: "rom_auto", label: "ROM", type: "textarea", readOnly: true },
        { name: "tone_auto", label: "Tone", type: "textarea", readOnly: true },
        { name: "sensation_auto", label: "Sensation", type: "textarea", readOnly: true },
        { name: "skin_auto", label: "Skin Condition", type: "textarea", readOnly: true },
        {
          name: "po_picture",
          label: "Upload Picture (P&O)",
          type: "file-upload-modal"
        },
        {
          name: "functional_problems",
          label: "Functional Problems (editable)",
          type: "textarea"
        }
      ]
    },
    {
      title: "Gait Assessment",
      fields: [
        { name: "walking_aid", label: "Walking Aid Used", type: "radio", options: WALKING_AID },
        { name: "walking_pattern", label: "Walking Pattern", type: "radio", options: WALKING_PATTERN },
        { name: "foot_clearance", label: "Foot Clearance", type: "radio", options: FOOT_CLEARANCE },
        { name: "step_length", label: "Step Length", type: "radio", options: STEP_LENGTH },
        { name: "stance_phase", label: "Stance Phase", type: "radio", options: STANCE_PHASE },
        { name: "swing_phase", label: "Swing Phase", type: "radio", options: SWING_PHASE },
        { name: "weight_bearing", label: "Weight Bearing", type: "radio", options: WEIGHT_BEARING },
        { name: "gait_balance", label: "Balance During Gait", type: "radio", options: GAIT_BALANCE },
        { name: "endurance", label: "Endurance", type: "radio", options: ENDURANCE }
      ]
    }
  ]
};

const ASSESSMENT_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  fields: [
    { name: "orthotic_need", label: "Orthotic Need", type: "input" },
    {
      name: "indications",
      label: "Indication for Orthosis",
      type: "multi-select-dropdown",
      options: INDICATIONS
    },
    { name: "clinical_impression", label: "Clinical Impression", type: "textarea" },
    { name: "prognosis", label: "Prognosis", type: "single-select", options: PROGNOSIS }
  ]
};

const PLAN_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  fields: [
    {
      name: "orthosis_category",
      label: "Orthosis Category",
      type: "single-select",
      options: [
        { label: "Ready-Made", value: "ready" },
        { label: "Custom-Made", value: "custom" }
      ]
    },

    /* READY-MADE */
    {
      name: "ready_model",
      label: "Orthosis Model",
      type: "input",
      showIf: { field: "orthosis_category", equals: "ready" }
    },
    {
      name: "ready_size",
      label: "Size",
      type: "single-select",
      options: ["S", "M", "L", "XL"].map(v => ({ label: v, value: v })),
      showIf: { field: "orthosis_category", equals: "ready" }
    },
    {
      name: "ready_adjustment",
      label: "Adjustment Required",
      type: "radio",
      options: YES_NO,
      showIf: { field: "orthosis_category", equals: "ready" }
    },

    /* CUSTOM-MADE */
    {
      name: "custom_casting",
      label: "Casting Required",
      type: "radio",
      options: YES_NO,
      showIf: { field: "orthosis_category", equals: "custom" }
    },
    {
      name: "custom_modification",
      label: "Modification Notes",
      type: "textarea",
      showIf: { field: "orthosis_category", equals: "custom" }
    },
    {
      name: "custom_material",
      label: "Material Type",
      type: "single-select",
      options: [
        { label: "Soft", value: "soft" },
        { label: "Semi-rigid", value: "semi" },
        { label: "Rigid", value: "rigid" }
      ],
      showIf: { field: "orthosis_category", equals: "custom" }
    },
    {
      name: "custom_features",
      label: "Custom Features",
      type: "checkbox-group",
      options: [
        { label: "Straps", value: "straps" },
        { label: "Padding", value: "padding" },
        { label: "Hinges", value: "hinges" },
        { label: "Others", value: "others" }
      ],
      showIf: { field: "orthosis_category", equals: "custom" }
    },

    { type: "subheading", label: "Orthosis Details" },

    {
      name: "orthosis_type",
      label: "Orthosis Type",
      type: "single-select",
      options: ORTHOSIS_TYPES
    },
    {
      name: "orthosis_material",
      label: "Material",
      type: "single-select",
      options: [
        { label: "Soft", value: "soft" },
        { label: "Semi-rigid", value: "semi" },
        { label: "Rigid", value: "rigid" }
      ]
    },
    { name: "orthosis_notes", label: "Additional Notes", type: "input" },
    { name: "measurement_date", label: "Measurement Date", type: "date" },
    { name: "casting_required", label: "Casting Required", type: "radio", options: YES_NO },
    { name: "casting_date", label: "Casting Date", type: "date" },
    {
      name: "follow_up",
      label: "Follow-up",
      type: "single-select",
      options: [
        { label: "2 weeks", value: "2w" },
        { label: "4 weeks", value: "4w" },
        { label: "Others", value: "others" }
      ]
    }
  ]
};

/* ===================== COMPONENT ===================== */

export default function OrthoticsAssessment({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  const storageKey = patient ? `orthotics_draft_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setValues(JSON.parse(saved).values || {});
    }
  }, [storageKey]);

  useEffect(() => {
    if (!patient) return;

    setValues(v => ({
      ...v,
      ul_mmt_r: patient.ul_mmt_r,
      ul_mmt_l: patient.ul_mmt_l,
      ll_mmt_r: patient.ll_mmt_r,
      ll_mmt_l: patient.ll_mmt_l,
      rom_auto: patient.rom,
      tone_auto: patient.tone,
      sensation_auto: patient.sensation,
      skin_auto: patient.skin
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

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
      alert("Orthotics draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Orthotics assessment submitted");
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  function PatientInfo({ patient }) {
    if (!patient) return null;
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          fontSize: 14
        }}>
          <div><b>Name:</b> {patient.name}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {patient.dob}</div>
          <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
          <div><b>Primary Diagnosis:</b> {patient.icd}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={ORTHOTICS_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => { }}
      >
        <PatientInfo patient={patient} />
      </CommonFormBuilder>

      <div style={{
        display: "flex",
        gap: 12,
        justifyContent: "center",
        borderBottom: "1px solid #ddd",
        marginBottom: 12
      }}>
        {["subjective", "objective", "assessment", "plan"].map(tab => (
          <div
            key={tab}
            style={{
              padding: "10px 22px",
              fontWeight: 600,
              cursor: "pointer",
              color: activeTab === tab ? "#2451b3" : "#0f172a",
              borderBottom: activeTab === tab ? "3px solid #2451b3" : "none"
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

     <CommonFormBuilder
  schema={schemaMap[activeTab]}
  values={values}
  onChange={onChange}
  submitted={submitted}
  onAction={handleAction}
  assessmentRegistry={ORTHOTICS_ASSESSMENT_REGISTRY}
>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button
            style={{
              padding: "12px 32px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700
            }}
            onClick={handleSubmit}
          >
            Submit Orthotics Assessment
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}
