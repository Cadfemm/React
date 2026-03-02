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
import FACForm from "./FunctionalAmbulationCategory"
export const NEURO_ASSESSMENT_REGISTRY = {
  rom: ROMForm,
  mmt: MMTForm,
  tug: TUG,
  mas: MASForm,
  sara: SARAForm,
  bbs: BergBalanceScale,
  fma_le: FMALEForm,
fac:FACForm
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
const CONSENT_AND_REFERRAL_SCHEMA = {
  title: "",
  sections: [
    {
      fields: [
        {
          name: "consent_risks_benefits",
          type: "checkbox-group",
          options: [{ label: "Risks/benefits explained", value: "yes" }]
        },
        {
          name: "consent_verbalized",
          type: "checkbox-group",
          options: [{ label: "Patient verbalized understanding", value: "yes" }]
        },
        {
          type: "row",
          fields: [
            {
              name: "consent_obtained",
              type: "checkbox-group",
              options: [{ label: "Consent obtained", value: "yes" }]
            },
            {
              name: "consent_upload",
              label: "Upload",
              type: "file-upload",
              showIf: { field: "consent_obtained", includes: "yes" }
            }
          ]
        },
        {
          name: "hep_reviewed",
          type: "checkbox-group",
          options: [{ label: "Home Exercise Program (HEP) reviewed and demonstrated", value: "yes" }]
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
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "current_diagnosis_other",
          label: "Other Diagnosis (specify)",
          type: "textarea",
          showIf: { field: "current_diagnosis", includes: "others" }
        },
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
        }
        ,
        { type: "subheading", label: "Referral Information" },
        {
          name: "referred_by",
          label: "Referred by",
          type: "input",
          readOnly: true
        },
        {
          name: "referral_reasons",
          label: "Referral Reasons",
          type: "textarea",
          readOnly: true
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
      patient.diagnosis_history || "No data available",
    referred_by: patient.case_manager || "",
    referral_reasons: patient.diagnosis_history || patient.icd || ""
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
  /* =========================
     CHIEF COMPLAINT
  ========================= */
  {
    name: "chief_complaint",
    label: "Chief Complaint",
    type: "textarea"
  },

  /* =========================
     HISTORY OF PRESENT ILLNESS
  ========================= */
  {
    type: "subheading",
    label: "History of Present Illness"
  },
  {
    name: "mechanism_of_injury",
    label: "Mechanism of injury / Event",
    type: "input"
  },
  {
    name: "hpi_progression",
    label: "Progression",
    type: "radio",
    options: [
      { label: "Improving", value: "improving" },
      { label: "Static", value: "static" },
      { label: "Worsening", value: "worsening" }
    ]
  },
  {
    name: "previous_treatment",
    label: "Previous treatment received",
    type: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" }
    ]
  },
  {
    name: "previous_treatment_details",
    label: "If yes, specify",
    type: "textarea",
    showIf: { field: "previous_treatment", equals: "yes" }
  },

  /* =========================
     PRIOR LEVEL OF FUNCTION (PLOF)
  ========================= */
  {
    type: "subheading",
    label: "Prior Level of Function (PLOF)"
  },
  {
    name: "plof_mobility",
    label: "Mobility prior to current condition",
    labelAbove: true,
    type: "radio",
    options: [
      { label: "Independent community ambulation", value: "community" },
      { label: "Independent household ambulation", value: "household" },
      { label: "Ambulated with aid", value: "aid" },
      { label: "Wheelchair dependent", value: "wheelchair" },
      { label: "Bedbound", value: "bedbound" }
    ]
  },
  {
    name: "plof_mobility_aid",
    label: "Specify aid used",
    type: "input",
    showIf: { field: "plof_mobility", equals: "aid" }
  },
  {
    name: "plof_transfers",
    label: "Transfers prior to current condition",
    labelAbove: true,
    type: "radio",
    options: [
      { label: "Independent", value: "independent" },
      { label: "Supervision", value: "supervision" },
      { label: "Assistance", value: "assistance" }
    ]
  },
  {
    name: "plof_adl",
    label: "ADL status prior to current condition",
    labelAbove: true,
    type: "radio",
    options: [
      { label: "Independent", value: "independent" },
      { label: "Minimal assistance", value: "minimal" },
      { label: "Moderate assistance", value: "moderate" },
      { label: "Dependent", value: "dependent" }
    ]
  },
  {
    name: "plof_work_role",
    label: "Work / role participation prior to condition",
    labelAbove: true,
    type: "radio",
    options: [
      { label: "Full-time work", value: "full_time" },
      { label: "Part-time work", value: "part_time" },
      { label: "Homemaker", value: "homemaker" },
      { label: "Student", value: "student" },
      { label: "Retired", value: "retired" }
    ]
  },
  {
    name: "plof_recreation",
    label: "Recreational / social participation",
    type: "radio",
    options: [
      { label: "Independent", value: "independent" },
      { label: "Limited", value: "limited" },
      { label: "None", value: "none" }
    ]
  },
  {
    name: "plof_remarks",
    label: "Remarks",
    type: "textarea"
  },

  /* =========================
     CURRENT PROGRESSION
  ========================= */
  {
    name: "current_progression",
    label: "Progression",
    type: "radio",
    options: [
      { label: "Improving", value: "improving" },
      { label: "Declined from baseline", value: "declined" },
      { label: "Static", value: "static" }
    ]
  },

  /* =========================
     PAST MEDICAL / FAMILY HISTORY
  ========================= */
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

  /* =========================
     WORK HISTORY
  ========================= */
  {
    name: "work_history",
    label: "Work History",
    type: "textarea"
  },

  /* =========================
     RETURN TO WORK
  ========================= */
  {
    name: "rtw_status",
    label: "Return to Work (RTW) Status",
    type: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
      { label: "Planned", value: "planned" }
    ]
  },

  /* =========================
     CLIENT EXPECTATIONS
  ========================= */
  {
    name: "client_expectations",
    label: "Client Expectations",
    type: "textarea"
  },

  /* =========================
     SPECIAL QUESTIONS
  ========================= */
  {
    type: "subheading",
    label: "Special Questions (Red Flag Screen)"
  },
  {
    name: "special_questions",
    label: "Clinical Considerations",
    type: "checkbox-group",
    options: [
      { label: "History of falls", value: "fall" },
      { label: "Shoulder pain", value: "shoulder_pain" },
      { label: "Incontinence (Bowel / Bladder)", value: "incontinence" },
      { label: "Seizures", value: "seizure" },
      { label: "Uses pampers", value: "pampers" }
    ]
  },

  {
    name: "subjective_remark",
    label: "Remarks",
    type: "textarea"
  },

  /* =========================
     ENVIRONMENTAL CONTEXT
  ========================= */
  {
    type: "subheading",
    label: "Environmental Context"
  },
  {
    name: "house_type",
    label: "Type of House",
    type: "radio",
    options: [
      { label: "Single storey", value: "single" },
      { label: "Double storey", value: "double" },
      { label: "Apartment with lift", value: "apartment" },
      { label: "Others", value: "others" }
    ]
  },
  {
    name: "house_type_other",
    label: "Specify",
    type: "input",
    showIf: { field: "house_type", equals: "others" }
  },
  {
    name: "toilet_type",
    label: "Toilet type",
    type: "radio",
    options: [
      { label: "Sitting", value: "sitting" },
      { label: "Squatting", value: "squatting" }
    ]
  },
  {
    name: "stairs_at_home",
    label: "Stairs at home",
    type: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" }
    ]
  }
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
                { type: "subheading", label: "Vital Signs" },
          { type: "row", fields: [
            { name: "obj_body_temp", label: "Body Temperature (°C)", type: "input", placeholder: "°C" },
            { name: "obj_heart_rate", label: "Heart Rate (/min)", type: "input", placeholder: "/min" },
            { name: "obj_resp_rate", label: "Respiratory Rate (/min)", type: "input", placeholder: "/min" }
          ]},
          { type: "row", fields: [
            { name: "obj_bp", label: "Blood Pressure (mmHg)", type: "input", placeholder: "e.g. 120/80" },
            { name: "obj_spo2", label: "Oxygen Saturation (SpO₂) (%)", type: "input", placeholder: "%" }
          ]},
                {
  name: "pain_va_scale",
  label: "Pain (Visual Analog Scale)",
  type: "scale-slider",

  min: 0,
  max: 100,
  step: 10,

  ranges: [
    {
      min: 0,
      max: 30,
      label: "Mild",
      color: "#22c55e"   // green
    },
    {
      min: 40,
      max: 60,
      label: "Moderate",
      color: "#facc15"   // yellow
    },
    {
      min: 70,
      max: 100,
      label: "Severe",
      color: "#ef4444"   // red
    }
  ],

  showValue: true
},
          { type: "subheading", label: "Functional & Mobility Status" },
      {
        name: "dominant_side",
        label: "Dominant",
        type: "radio",
        options: [
          { label: "Right", value: "right" },
          { label: "Left", value: "left" }
        ]
      },
      
      {
        name: "affected_limbs",
        label: "Affected Limbs",
        type: "checkbox-group",
        options: [
          { label: "Left Upper Extremity", value: "lue" },
          { label: "Right Upper Extremity", value: "rue" },
          { label: "Left Lower Extremity", value: "lle" },
          { label: "Right Lower Extremity", value: "rle" }
        ]
      },
      {
        type: "row",
        columns: 2,
          fields: [ 
    {
        name: "short_distance",
        label: "Ambulatory Status – Short Distance",
        type: "single-select",
        options: AMBULATORY_OPTIONS
      },
           
      {
        name: "long_distance",
        label: "Ambulatory Status – Long Distance",
        type: "single-select",
        options: AMBULATORY_OPTIONS
      },
                 ]},
       {
        name: "short_distance_others",
        label: "Specify Others",
        type: "textarea",
 showIf: { field: "short_distance", equals: "others" }},
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
          type: "radio",
          labelAbove:true,
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
  type: "input",
  showIf: { field: "gait_pattern", equals: "others" }
},


{
  name: "weight_shifting",
  label: "Weight Shifting",
          type: "radio",
      options: 
[
  { label: "Symmetrical", value: "symmetrical" },
  { label: "Reduced", value: "reduced" },
{ label: "Absent", value: "absent" }]
},

{
  name: "foot_clearence ",
  label: "Foot Clearence",
          type: "radio",
      options: 
[
  { label: "Adequate", value: "adequatefootclearence" },
  { label: "Reduced", value: "reducedfootclearence" },
{ label: "Dragging", value: "draggingfootclearence" }]
},


{
  name: "reduced_specify",
  label: "Specify Reduced",
          type: "radio",
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
          type: "radio",
      options: 
[
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
{ label: "Bilateral", value: "bilateral" },

],  showIf: 
  { field: "weight_shifting", equals: "absent" }
},
{type:"row",
  fields:[
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
}]},
{
  name: "swing_phase",
  label: "Swing Phase (Foot–Ground Clearance)",
  type: "radio",
   options: 
[
  { label: "Normal", value: "normal" },
  { label: "Reduced", value: "reduced" },]
  
},
{
  type: "subheading",
  label: "Neurological Examination"
},
{
  name: "strength(MMT_grading)",
  label: "Strength (MMT grading)",
  type: "input"},
  {
  name: "sensation",
  label: "Sensation",
  type: "radio",
  options: 
[
  { label: "Intact ", value: "intact " },
  { label: "Reduced", value: "reduced" },
  { label: "Absent", value: "absent" }
]},

{
  type: "subheading",
  label: "Sensory Examination"
},
{
  type: "heading",
  label: "Superficial Sensation"
},

{type:"row",
  fields:[
{
  name: "light_touch",
  label: "Light Touch",
  type: "radio",
  options: 
[
  { label: "Intact", value: "intact" },
{ label: "Reduced", value: "reduced" },
{ label: "Absent", value: "absent" },

], 
},
{
  name: "pin_prick",
  label: "Pin Prick",
  type: "radio",
  options: 
[
  { label: "Intact", value: "intact" },
{ label: "Reduced", value: "reduced" },
{ label: "Absent", value: "absent" },

], 
},]},

{
  type: "heading",
  label: "Deep Sensation"
},

{
  name: "proprioception",
  label: "Proprioception (Joint Position Sense)",
  type: "radio",
  options: 
[
  { label: "Intact", value: "intact" },
{ label: "Impaired", value: "impaired" },
{ label: "Absent", value: "absent" },

], 
},
{
  name: "joint_tested",
  label: "Joint Tested",
  type: "radio",
  options: 
[
  { label: "Shoulder", value: "shoulder" },
{ label: "Elbow", value: "elbow" },
{ label: "Wrist", value: "wrist" },
{ label: "Hip", value: "Hip" },
{ label: "Knee", value: "knee" },
{ label: "Ankle", value: "ankle" },
{ label: "Toe", value: "toe" },
] 
},
      {
        name:"coordination",
        label:"Coordination",
        type:"radio",
        options:[
          {label:"Inatct", value:"intact"},
          {label:"Impaired", value:"impaired"},
        ]
      },{
        name:"sulcussign",
        label:"Sulcus Sign",
        type:"radio",
        options:[
          {label:"Positive", value:"positive"},
          {label:"Negative", value:"negative"},
        ]
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
      {name:"functional_limitations", label:"Functional Limitations",type:"checkbox-group",
        options: [
    { label: "Gait Impairment", value: "gaitimpairment" },
    { label: "Unsafe Transfers", value: "unsafetransfers" },
    { label: "Reduced Endurance", value: "reducedendurance" },
    { label: "Balance Deficit", value: "balancedeficit" },
    { label: "ADL Dependency", value: "adldependency" },
    { label: "No Functional Limitations", value: "nofunctionallimitations" },
    { label: "Others", value: "others" }
  ]
      },
      {
          name: "functional_limitations_others",
          label: "Specify Others",
          type: "input",
          showIf: { field: "functional_limitations", includes: "others" }
        },
      {
        name: "clinical_impression",
        label: "Clinical Impression",
        type: "textarea"
      },
      {
        name: "prognosis",
        label: "Rehab Prognosis",
        type: "radio",
        options: PROGNOSIS_OPTIONS
      },

 
    ]
  };
 
  const PLAN_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    fields: [
 
       {
  type: "subheading",
  label: "Short Term Goals"
},
 {
      type: "dynamic-section",
      name: "shortterm_blocks",
      fields: [
        {name: "shorttermgoals", label: "Goals (Functional Task)", type: "input"},
       {name: "shorttermassistlevel", label: "Assist Level", type: "radio",labelAbove:true,options:[
        { label: "Independent", value: "shorttermindependent" },
         { label: "Supervision", value: "shorttermsupervision" },
          { label: "Stand-by Assist", value: "shorttermsba" },
           { label: "Contact Guard Assist", value: "shorttermcga"},
          { label: "Minimal Assist", value: "shorttermmina"},
          { label: "Moderate Assist", value: "shorttermmoda"},
          { label: "Maximum Assist", value: "shorttermmaxa"},
       ]},
           {name: "shorttermdevice", label: "Device/Prosthesis Used", type: "input"},
          {name: "shorttermcontext", label: "Context(Where/Condition)", type: "input"},
             {name: "shorttermtarget", label: "Measurable Target", type: "input"},
               {name: "shorttermtarget_date", label: "Target Date", type: "date"},
        ]},

               {
  type: "subheading",
  label: "Long Term Goals"
},
 {
      type: "dynamic-section",
      name: "longterm_blocks",
      fields: [
        {name: "longtermgoals", label: "Goals (Functional Task)", type: "input"},
       {name: "longtermassistlevel", label: "Assist Level", type: "radio",labelAbove:true,options:[
        { label: "Independent", value: "longtermindependent" },
         { label: "Supervision", value: "longtermsupervision" },
          { label: "Stand-by Assist", value: "longtermsba" },
           { label: "Contact Guard Assist", value: "longtermcga"},
          { label: "Minimal Assist", value: "longtermmina"},
          { label: "Moderate Assist", value: "longtermmoda"},
          { label: "Maximum Assist", value: "longtermmaxa"},
       ]},
           {name: "longtermdevice", label: "Device/Prosthesis Used", type: "input"},
          {name: "longtermcontext", label: "Context(Where/Condition)", type: "input"},
             {name: "longtermtarget", label: "Measurable Target", type: "input"},
               {name: "longtermtarget_date", label: "Target Date", type: "date"},
        ]},

      
             {
        name: "intervention_plan",
        label: "Intervention Plan",
        type: "checkbox-group",
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
          name: "intervention_plan_others",
          label: "Specify Others",
          type: "textarea",
          showIf: { field: "intervention_plan", includes: "others" }
        },

                {
          name: "home_exercise-program",
          label: "Home Exercise Program",
          type: "textarea"},


                       {
        name: "patient_education",
        label: "Patient Education",
        type: "checkbox-group",
        options: [
          { label: "Fall Prevention", value: "fall_prevention" },
          { label: "Safe Transfer Techniques", value: "safe_transfer_techniques" },
          { label: "Energy Conservation", value: "energy_conservation" },
        { label: "Assistive Device Training", value: "assistive_device_training" },
        { label: "Caregiver Training", value: "caregiver_training" },
        ]
      },

        { name: "referrals", label: "Referrals", type: "checkbox-group",
         options: [
          { label: "Cyberdyne ", value: "cyberdyne " },
          { label: "Vicon ", value: "vicon" },
          { label: "Refer Hydro", value: "hydro" },
        { label: "Gym", value: "gym" },
        { label: "MSD  ", value: "msd" },
        ]
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
      <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
      <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
      <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
      <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
      <div><b>Education Level:</b> {patient.education_background || "-"}</div>
      <div><b>Occupation:</b> {patient.occupation || "-"}</div>
      <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
      <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
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

    {/* ===== CONSENT & REFERRAL (above Patient Environment) ===== */}
    <CommonFormBuilder
      schema={CONSENT_AND_REFERRAL_SCHEMA}
      values={values}
      onChange={onChange}
    />

    {/* ===== PATIENT ENVIRONMENT CARD ===== */}

 
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