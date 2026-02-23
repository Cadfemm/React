import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
 // features/neuro/assessments/registry.js
import MMTForm from "./MMTForm";
import TUG from "./TUGForm";
import MASForm from "./MASForm";
import SARAForm from "./SARAForm";
import BergBalanceScale from "./BBS";
import FMALEForm from "./FMALEForm";
import ROMForm from "./ROMForm";

export const NEURO_ASSESSMENT_REGISTRY = {
  rom: ROMForm,
  mmt: MMTForm,
  tug: TUG,
  mas: MASForm,
  sara: SARAForm,
  bbs: BergBalanceScale,
  fma_le: FMALEForm,

};

/* ===================== OPTIONS ===================== */
 
const YES_NO = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];
const Static_Dynamic = [
  { label: "Static", value: "static" },
  { label: "Dynamic", value: "dynamic" }
];
 const  Functional_assessment  = [
  { label: "Independent", value: "independent" },
  { label: "Supervision", value: "supervision" },
  { label: "Minimal Assistance", value: "mia" },
  { label: "Moderate Assistance", value: "moa" },
  { label: "Maximal Assistance", value: "maa" },
  { label: "Dependent", value: "dependent" },
  { label: "Not Assessed / NotApplicable", value: "NA" },

];
const PROGNOSIS_OPTIONS = [
  { label: "Excellent", value: "excellent" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" }
];
 
const AMBULATORY_OPTIONS = [
  { label: "Independent walking", value: "independent" },
  { label: "Wheelchair", value: "wheelchair" },
  { label: "Quadripod narrowbase", value: "Quadripodnarrowbase" },
    { label: "Quadripod wide base", value: "Quadripodwidebase" },
  { label: "Walking stick", value: "stick" },
  { label: "Walking frame", value: "frame" },
  { label: "Elbow crutches", value: "crutches" },
  { label: "Others", value: "others" }
];
const PATIENT_ENVIRONMENT_SCHEMA = {
  title: "Patient Environment",
  sections: [
    {
      fields: [
 
        /* ================= EQUIPMENT OWNED ================= */
        {
          name: "equipment_owned",
          label: "List of Equipment Owned",
          type: "checkbox-group",
          options: [
            { label: "PERKESO", value: "perkeso" },
            { label: "NGO", value: "ngo" },
            { label: "Self-purchased", value: "self" },
            { label: "Others", value: "others" }
          ]
        },
 
        /* ===== CONDITIONAL TEXT AREAS ===== */
        {
          name: "equipment_perkeso",
          label: "PERKESO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "perkeso" }
        },
        {
          name: "equipment_ngo",
          label: "NGO Equipment Details",
          type: "textarea",
 showIf: { field: "equipment_owned", includes: "ngo" }
        },
        {
          name: "equipment_self",
          label: "Self-purchased Equipment Details",
          type: "textarea",
 showIf: { field: "equipment_owned", includes: "self" }
        },
        {
          name: "equipment_others",
          label: "Other Equipment Details",
          type: "textarea",
 showIf: { field: "equipment_owned", includes: "others" }
        },
 
        /* ================= HOME ENVIRONMENT ================= */
        {
          name: "home_environment",
          label: "Home Environment",
          type: "textarea"
        },
 
        /* ================= TYPE OF HOUSE ================= */
        {
          name: "house_type",
          label: "Type of House",
          type: "single-select",
          options: [
            { label: "Single-storey", value: "single" },
            { label: "Double-storey", value: "double" },
            { label: "Apartment with elevator", value: "apartment" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "house_type_other",
          label: "If Others, specify",
          type: "textarea",
          showIf: { field: "house_type", equals: "others" }
        },
 
        /* ================= TYPE OF TOILET ================= */
        {
          name: "toilet_type",
          label: "Toilet Type",
          type: "checkbox-group",
          options: [
            { label: "Sitting", value: "sitting" },
            { label: "Squatting", value: "squatting" }
          ]
        },
 
        /* ================= EDUCATION LEVEL ================= */
        {
          name: "education_level",
          label: "Education Level",
          type: "single-select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Diploma", value: "diploma" },
            { label: "Degree", value: "degree" },
            { label: "Master", value: "master" },
            { label: "PhD", value: "phd" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "education_other",
          label: "If Others, specify",
          type: "textarea",
          showIf: { field: "education_level", equals: "others" }
        }
 
      ]
    }
  ]
};
 
 
 
 
export default function NeuroAssessment({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");
 
  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `neuro_assessment_draft_${patient.id}`
    : null;
 
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
    pmh_from_registration:
      patient.medical_history || "No data available",
 
    family_social_from_registration:
      patient.diagnosis_history || "No data available"
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
      alert("Neuro draft saved");
    }
  };
 
  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Neuro assessment submitted");
  };
 
  /* ===================== SCHEMAS ===================== */
 
  const SUBJECTIVE_SCHEMA = {
    actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
    fields: [
      { name: "chief_complaint", label: "Chief Complaint", type: "textarea" },
      { name: "hpi", label: "History of Present Illness", type: "textarea" },
{
  name: "pmh_from_registration",
  label: "Past Medical History",
  type: "textarea",
  readOnly: true
},
{
  name: "family_social_from_registration",
  label: "Family & Social History",
  type: "textarea",
  readOnly: true
},
 
      { name: "work_history", label: "Work History", type: "textarea" },
 
      {
        name: "work_status",
        label: "Work Status",
        type: "radio",
        options: [
          { label: "Employed", value: "employed" },
          { label: "Unemployed", value: "unemployed" }
        ]
      },
 
      {
        name: "rtw_status",
        label: "Return to Work",
        type: "radio",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
          { label: "Others", value: "others" }
        ]
      },
        {
          name: "rtw_status_other",
          label: "Others (specify)",
          type: "textarea",
 showIf: { field: "rtw_status", equals: "others" }
        },
 
            {
        name: "Client_Expectations",
        label: "Client Goals",
        type: "textarea",
      },
 
      {
        name: "special_questions",
        label: "Clinical Considerations",
        type: "checkbox-group",
        options: [
          { label: "Fall risks", value: "fall" },
          { label: "Shoulder pain (Hemiplegic shoulder)", value: "shoulder_pain" },
          { label: "Incontinence (Bowel /Bladder)", value: "incontinence" },
          { label: "Uses Diapers", value: "pampers" },
          { label: "Seizure History", value: "seizure" }
        ]
      },
      { name: "subjective_remark", label: "Remarks", type: "textarea" }
    ]
  };
const NEURO_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: [
 
  ]
};
  const OBJECTIVE_SCHEMA = {
title:"Functional and Mobility Status",
    actions: SUBJECTIVE_SCHEMA.actions,
     sections: [
      {
    fields: [
      {
        name: "dominant_side",
        label: "Dominant",
        type: "single-select",
        options: [
          { label: "Right", value: "right" },
          { label: "Left", value: "left" }
        ]
      },
      
      {
        name: "affected_limbs",
        label: "Affected",
        type: "multi-select-dropdown",
        options: [
          { label: "Left Upper Extremity", value: "lue" },
          { label: "Right Upper Extremity", value: "rue" },
          { label: "Left Lower Extremity", value: "lle" },
          { label: "Right Lower Extremity", value: "rle" }
        ]
      },
      {
        name: "short_distance",
        label: "Ambulatory Status – Short Distance",
        type: "single-select",
        options: AMBULATORY_OPTIONS
      },
            {
        name: "short_distance_others",
        label: "Specify Others",
        type: "textarea",
 showIf: { field: "short_distance", equals: "others" }
      },
      {
        name: "long_distance",
        label: "Ambulatory Status – Long Distance",
        type: "single-select",
        options: AMBULATORY_OPTIONS
      },
                  {
        name: "long_distance_others",
        label: "Specify Others",
        type: "textarea",
 showIf: { field: "long_distance", equals: "others" }
      },
      {
      type: "subheading",
      label: "Scales / Outcome Measures"
    },

    {
      name: "neuro_scales",
      type: "assessment-launcher",
      options: [
        { label: "Range of Motion (ROM)", value: "rom" },
        { label: "Manual Muscle Test (MMT)", value: "mmt" },
        { label: "Muscle Tone (MAS)", value: "mas" },
        { label: "Functional Ambulation Category (FAC)", value: "fac" },
        { label: "Motor Assessment Scale", value: "motor_mas" },
        { label: "Fugl Meyer Assessment – Lower Extremity (FMA-LE)", value: "fma_le" },
        { label: "Stand and Reposition Aids (SARA)", value: "sara" },
        { label: "10 Meter Walk Test", value: "10mwt" },
        { label: "Berg Balance Scale (BBS)", value: "bbs" },
        { label: "Visual Analog Scale (VAS)", value: "vas" },
        { label: "Timed Up and Go (TUG)", value: "tug" },
        { label: "6 Minutes Walk Test (6MWT)", value: "6mwt" },
        {label: "Upper Extremity Assessment (Flug)", value: "flug" },
        {label: "Trunk Impairment Scale (TIS)", value: "tsi" }
      ]
    },

{
  type: "subheading",
  label: "Functional Assessment"
},

{
  name: "fa_transfer",
  label: "Transfer",
  type: "radio",
  options: YES_NO
},
{
  name: "fa_bed_mobility",
  label: "Bed Mobility",
  type: "radio",
  options: YES_NO
},

{
  name: "fa_sit_to_stand",
  label: "Sit to Stand",
  type: "radio",
  options: YES_NO
},
{
  name: "fa_stairs",
  label: "Climbing Up & Down Stairs",
  type: "radio",
  options: YES_NO
},
{
  name: "fa_floor_to_stand",
  label: "Floor to Stand",
  type: "radio",
  options: YES_NO
},
{
  name: "fa_stand_to_floor",
  label: "Stand to Floor",
  type: "radio",
  options: YES_NO
},
{
  name: "fa_sitting_balance_static",
  label: "Sitting Balance",
  type: "radio",
  options: Static_Dynamic
},
{
  name: "fa_standing_balance_static",
  label: "Standing Balance",
  type: "radio",
  options: Static_Dynamic
},

{
  type: "subheading",
  label: "Gait Assessment"
},

{
  name: "gait_pattern",
  label: "Gait Pattern",
          type: "single-select",
      options: 
[
  { label: "Normal", value: "normal" },
  { label: "Antalgic", value: "antalgic" },
  { label: "Hemiplegic", value: "hemiplegic" },
  { label: "Spastic (scissoring)", value: "spastic_scissoring" },
  { label: "Ataxic", value: "ataxic" },
  { label: "Parkinsonian", value: "parkinsonian" },
  { label: "Steppage (high-stepping)", value: "steppage" },
  { label: "Trendelenburg", value: "trendelenburg" },
  { label: "Circumduction", value: "circumduction" },
  { label: "Crouch gait", value: "crouch_gait" },
  { label: "Others", value: "others" }
]},
{
  name: "Gait_Other",
  label: "Other",
  type: "textarea",
  showIf: { field: "gait_pattern", equals: "others" }
},


{
  name: "weight_shifting",
  label: "Weight Shifting",
          type: "single-select",
      options: 
[
  { label: "Symmetrical", value: "symmetrical" },
  { label: "Reduced", value: "reduced" },
{ label: "Absent", value: "absent" }]
},
{
  name: "reduced_specify",
  label: "Specify Reduced",
          type: "single-select",
      options: 
[
  { label: "Left", value: "Rleft" },
  { label: "Right", value: "Rright" },
{ label: "Bilateral", value: "Rbilateral" },

],  showIf: 
  { field: "weight_shifting", equals: "reduced" }
},

{
  name: "absent_specify",
  label: "Specify Absent",
          type: "single-select",
      options: 
[
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
{ label: "Bilateral", value: "bilateral" },

],  showIf: 
  { field: "weight_shifting", equals: "absent" }
},
{
  name: "stance_phase_left",
  label: "Stance Phase Left",
  type: "single-select",
  options: 
[
  { label: "Normal", value: "normal" },
  { label: "Prolonged", value: "prolonged" },
{ label: "Reduced", value: "reduced" },
{ label: "Instability noted", value: "instabilitynoted" },

], 
},
{
  name: "stance_phase_right",
  label: "Stance Phase Right",
  type: "single-select",
  options: 
[
  { label: "Normal", value: "Rnormal" },
  { label: "Prolonged", value: "Rprolonged" },
{ label: "Reduced", value: "Rreduced" },
{ label: "Instability noted", value: "Rinstabilitynoted" },

], 
},
{
  name: "swing_phase",
  label: "Swing Phase (Foot–Ground Clearance)",
  type: "textarea",
  helper: "foot-ground clearance / without"
},

{
  type: "subheading",
  label: "Observations / Tests"
},

{
  name: "observation_tests",
  type: "assessment-launcher",
  options: [
    { label: "Strength Test", value: "strength" },
    { label: "Sensation Test", value: "sensation" },
    { label: "Coordination Assessment", value: "coordination" },
    { label: "Proprioception Assessment", value: "proprioception" }
  ]
},

{
  name: "sulcus_sign",
  label: "Sulcus Sign",
  type: "radio",
  options: [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ]
}
    ]},
  {
      
      fields: [
        
        { type: "radio-matrix", name: "rolling", label: "Rolling", options: Functional_assessment,info: {
    title: "Functional Assessment",
    content: [
      "0 – Unable",
      "1 – Needs assistance",
      "2 – Independent"
    ]
  } },
        { type: "radio-matrix", name: "supinetosit", label: "Supine ↔ Sit", options: Functional_assessment }
      ],
    },
    {
      title: "Transfers",
      fields: [
        { type: "radio-matrix", name: "bedtochair", label: "Bed ↔ Chair", options: Functional_assessment },
        { type: "radio-matrix", name: "sittostand", label: "Sit ↔ Stand", options: Functional_assessment },
         { type: "radio-matrix", name: "floortostand", label: "Floor ↔ Stand", options: Functional_assessment }
      ]
    },

  
    
  ]
  };
 
  const ASSESSMENT_SCHEMA = {

    actions: SUBJECTIVE_SCHEMA.actions,
    fields: [
      { name: "problem_list", label: "Problem Listing", type: "textarea" },
      {
        name: "clinical_impression",
        label: "Clinical Impression",
        type: "textarea"
      },
      {
        name: "prognosis",
        label: "Rehab Prognosis",
        type: "single-select",
        options: PROGNOSIS_OPTIONS
      },
{
  name: "short_term_goals",
  label: "Short Term Goals",
  type: "textarea"
},
{
  name: "short_term_goals_date",
  label: "Target Date (Short Term)",
  type: "date"
},
 
{
  name: "long_term_goals",
  label: "Long Term Goals",
  type: "textarea"
},
{
  name: "long_term_goals_date",
  label: "Target Date (Long Term)",
  type: "date"
}

 
    ]
  };
 
  const PLAN_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    fields: [
 
       
 
      { name: "referrals", label: "Referrals", type: "checkbox-group",
         options: [
          { label: "Refer Cyberdyne ", value: "cyberdyne " },
          { label: "Refer Vicon ", value: "vicon" },
          { label: "Refer Hydro", value: "hydro" },
        { label: "Refer Gym", value: "gym" },
        { label: "Refer MSD  ", value: "msd" },
        ]
       },
             {
        name: "treatment_plan",
        label: "Treatment Plan",
        type: "multi-select-dropdown",
        options: [
          { label: "Bed mobility training", value: "bed_mobility" },
          { label: "Transfer training", value: "transfer" },
          { label: "Muscle tone management", value: "MTM" },
        { label: "Sitting balance training ", value: "SBT" },
        { label: "Standing balance training ", value: "StBT" },
         { label: "Functional ROM Exercise", value: "FRE" },
         { label: "Functional strengthening exercise", value: "strength" },
          { label: "Endurance training", value: "endurance" },
        { label: "Functional training", value: "FT" },
          { label: "Gait training", value: "gait" },
          { label: "Walking aid prescription", value: "WAP" },
          { label: "Bobath / NDT", value: "bobath" },
          { label: "Others", value: "others" }
        ]
      },
 
        {
          name: "treatment_plan_others",
          label: "Specify Others",
          type: "textarea",
          showIf: { field: "treatment_plan", includes: "others" }
        },
    ]
  };
const TREATMENT_PLAN_LABEL_MAP = {
  bed_mobility: "Bed mobility training",
  transfer: "Transfer training",
  MTM: "Muscle tone management",
  SBT: "Sitting balance training",
  StBT: "Standing balance training",
  FRE: "Functional ROM Exercise",
  strength: "Functional strengthening exercise",
  endurance: "Endurance training",
  FT: "Functional training",
  gait: "Gait training",
  WAP: "Walking aid prescription",
  bobath: "Bobath / NDT",
  others: "Others"
};
 
  /* ===================== UI ===================== */
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString();
};
 
const today = new Date();
 
const calculateDuration = (onset) => {
  if (!onset) return "-";
  const onsetDate = new Date(onset);
  const diffMs = today - onsetDate;
 
  if (diffMs < 0) return "-";
 
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
 
  if (years > 0) return `${years} yr ${months % 12} mo`;
  if (months > 0) return `${months} mo`;
  return `${days} days`;
};
 
  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };
function NeuroPatientInfo({ patient }) {
  if (!patient) return null;
 
return (
  <div style={section}>
    <div style={patientGrid}>
 
      <div><b>Name:</b> {patient.name}</div>
      <div><b>IC:</b> {patient.id}</div>
      <div><b>DOB:</b> {formatDate(patient.dob)}</div>
      <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
            <div><b>ICD:</b> {patient.icd}</div>
      <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
      <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
      <div>
        <b>Duration of Diagnosis:</b>{" "}
        {calculateDuration(patient.date_of_onset)}
      </div>
 
 
 
    </div>
  </div>
);
 
}
 
  return (
<div style={mainContent}>
 
    {/* ===== PATIENT INFORMATION CARD ===== */}
    <CommonFormBuilder
      schema={NEURO_CONTAINER_SCHEMA}
      values={{}}
      onChange={() => {}}
    >
      <NeuroPatientInfo patient={patient} />
    </CommonFormBuilder>
 
    {/* ===== NEW ENVIRONMENT CARD ===== */}
    <CommonFormBuilder
      schema={PATIENT_ENVIRONMENT_SCHEMA}
      values={values}
      onChange={onChange}
    />
 
    {/* ===== TABS ===== */}
    <div style={tabBar}>
      {["subjective", "objective", "assessment", "plan"].map(tab => (
        <div
          key={tab}
          style={activeTab === tab ? tabActive : tabBtn}
          onClick={() => setActiveTab(tab)}
        >
          {tab.toUpperCase()}
        </div>
      ))}
    </div>
 
    {/* ===== TAB CONTENT ===== */}
{/* ===== TAB CONTENT ===== */}
<CommonFormBuilder
  schema={schemaMap[activeTab]}
  values={values}
  onChange={onChange}
  submitted={submitted}
  onAction={handleAction}
  assessmentRegistry={NEURO_ASSESSMENT_REGISTRY}
>
 
  {/* 🔹 ADD MATRIX ONLY IN PLAN TAB */}
  {activeTab === "plan" &&
    Array.isArray(values.treatment_plan) &&
    values.treatment_plan.length > 0 && (
 
    <div style={{ marginTop: 20 }}>
      <h3>Treatment Plan Schedule</h3>
 
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th style={th}>Treatment</th>
            <th style={th}>Frequency</th>
            <th style={th}>Duration</th>
          </tr>
        </thead>
 
        <tbody>
          {values.treatment_plan.map(plan => (
            <tr key={plan}>
             <td style={td}>
  <b>{TREATMENT_PLAN_LABEL_MAP[plan] || plan}</b>
</td>
 
 
              <td style={td}>
                <input
                  type="text"
                  placeholder="e.g. 5 days/week"
                  value={values[`freq_${plan}`] || ""}
                  onChange={e =>
                    onChange(`freq_${plan}`, e.target.value)
                  }
                />
              </td>
 
              <td style={td}>
                <input
                  type="text"
                  placeholder="e.g. 30 mins / 6 weeks"
                  value={values[`dur_${plan}`] || ""}
                  onChange={e =>
                    onChange(`dur_${plan}`, e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
 
  <div style={submitRow}>
    <button style={submitBtn} onClick={handleSubmit}>
      Submit Neuro Assessment
    </button>
  </div>
 
</CommonFormBuilder>
 
 
  </div>
  );
}
 
/* ===================== STYLES ===================== */
 
const mainContent = { margin: "0 auto" };
 
const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
};
const section = {
  marginBottom: 24
};
 
const sectionTitle = {
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 12,
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: 6,
  color: "#0F172A"
};
 
const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};
 
const tabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#0f172a"
};
 
const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2451b3",
  color: "#2451b3"
};
 
const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 20
};
 
const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700
};
const th = {
  border: "1px solid #ccc",
  padding: 10,
  textAlign: "left"
};
 
const td = {
  border: "1px solid #ccc",
  padding: 10
};