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
import SixMWTForm from "./SixMWTForm"
import TenMWTForm from "./TenMWTForm";
import StrengthTestForm from "./StrengthTestForm";
import FACForm from "./FunctionalAmbulationCategory"
import ScarAssessmentForm from "../../OT/components/vas";
import PatientCard from "../../../shared/cards/PatientCard";


import MotorAssessmentScaleForm from "./MotorAssessmentScaleForm";
import SensationTestForm from "./SensationTestForm";
import ProprioceptionForm from "./ProprioceptionForm";

export const NEURO_ASSESSMENT_REGISTRY = {
  rom: ROMForm,
  mmt: MMTForm,
  tug: TUG,
  mas: MASForm,
  motor_mas: MotorAssessmentScaleForm,
  sensation: SensationTestForm,
  proprioception: ProprioceptionForm,
  sara: SARAForm,
  bbs: BergBalanceScale,
  vas: ScarAssessmentForm,
  fma_le: FMALEForm,
  fac:FACForm,
  sixmwt: SixMWTForm,
  tenmwt: TenMWTForm,
  strength: StrengthTestForm
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
          type: "input",
          showIf: { field: "equipment_owned", includes: "perkeso" }
        },
        {
          name: "equipment_ngo",
          label: "NGO Equipment Details",
          type: "input",
          showIf: { field: "equipment_owned", includes: "ngo" }
        },
        {
          name: "equipment_self",
          label: "Self-purchased Equipment Details",
          type: "input",
          showIf: { field: "equipment_owned", includes: "self" }
        },
        {
          name: "equipment_others",
          label: "Other Equipment Details",
          type: "input",
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
          type: "input",
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
  const [patientHistory, setPatientHistory] = useState({
      past_medical_history: "",
      past_family_history: "",
      alerts_and_allergies: ""
    });
    useEffect(() => {
          if (!patient) return;
          setPatientHistory({
            past_medical_history: patient.medical_history || "",
            past_family_history: patient.family_medical_history || "",
            alerts_and_allergies: patient.alerts_and_allergies_history || ""
          });
        }, [patient])
 
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
    type: "input"
  },

  /* =========================
     HISTORY OF PRESENT ILLNESS
  ========================= */
  // {
  //   type: "subheading",
  //   label: "History of Present Illness"
  // },
  {
    name: "history_of_illness",
    label: "History of Present Illness"
,
    type: "input"
  },
  // {
  //   name: "hpi_progression",
  //   label: "Progression",
  //   type: "radio",
  //   options: [
  //     { label: "Improving", value: "improving" },
  //     { label: "Static", value: "static" },
  //     { label: "Worsening", value: "worsening" }
  //   ]
  // },
  // {
  //   name: "previous_treatment",
  //   label: "Previous treatment received",
  //   type: "radio",
  //   options: [
  //     { label: "Yes", value: "yes" },
  //     { label: "No", value: "no" }
  //   ]
  // },
  // {
  //   name: "previous_treatment_details",
  //   label: "If yes, specify",
  //   type: "textarea",
  //   showIf: { field: "previous_treatment", equals: "yes" }
  // },

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
    type: "input"
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
     WORK HISTORY
  ========================= */
  // {
  //   name: "work_history",
  //   label: "Work History",
  //   type: "textarea"
  // },

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
    type: "input"
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
    type: "input"
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
    actions: SUBJECTIVE_SCHEMA.actions,
     sections: [
      {
    fields: [
       { type: "subheading", label: "Functional and Mobility Status" },
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
        { label: "Scale for the Assessment and Rating of Ataxia (SARA)", value: "sara" },
        { label: "10 Meter Walk Test", value: "tenmwt" },
        { label: "Berg Balance Scale (BBS)", value: "bbs" },
        { label: "Visual Analog Scale (VAS)", value: "vas" },
        { label: "Timed Up and Go (TUG)", value: "tug" },
        { label: "6 Minutes Walk Test (6MWT)", value: "sixmwt" },
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
             {
  type: "subheading",
  label: "Problem List"
},
     
      {
  name: "problem_list",
  type: "checkbox-group",
  options: [
    { label: "Reduced muscle strength", value: "reduced_muscle_strength" },
    { label: "Reduced muscle endurance", value: "reduced_muscle_endurance" },
    { label: "Reduced cardiovascular endurance", value: "reduced_cardiovascular_endurance" },
    { label: "Reduced ROM", value: "reduced_rom" },
    { label: "Poor wheelchair skills", value: "poor_wheelchair_skills" },
    { label: "Reduced standing balance", value: "reduced_standing_balance" },
    { label: "Reduced sitting balance", value: "reduced_sitting_balance" },
    { label: "Poor trunk control", value: "poor_trunk_control" },
    { label: "Unable to walk", value: "unable_to_walk" },
    { label: "Poor walking endurance", value: "poor_walking_endurance" },
    { label: "Poor wheelchair endurance", value: "poor_wheelchair_endurance" },
    { label: "Others", value: "other" }
  ]
},
{
  name: "problem_list_other_text",
  label: "Other Problem (Specify)",
  type: "input",
  placeholder: "Enter additional problems...",
  showIf: {
    field: "problem_list",
    includes: "other"
  }
},
//              {
//   type: "subheading",
//   label: "Functional Limitations"
// },

//       {name:"functional_limitations", type:"checkbox-group",
//         options: [
//     { label: "Gait Impairment", value: "gaitimpairment" },
//     { label: "Unsafe Transfers", value: "unsafetransfers" },
//     { label: "Reduced Endurance", value: "reducedendurance" },
//     { label: "Balance Deficit", value: "balancedeficit" },
//     { label: "ADL Dependency", value: "adldependency" },
//     { label: "No Functional Limitations", value: "nofunctionallimitations" },
//     { label: "Others", value: "others" }
//   ]
//       },
//       {
//           name: "functional_limitations_others",
//           label: "Specify Others",
//           type: "input",
//           showIf: { field: "functional_limitations", includes: "others" }
//         },
      {
        name: "clinical_impression",
        label: "Clinical Impression",
        type: "input"
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
        {
  type: "subheading",
  label: "Intervention Plan"
},
      
             {
        name: "intervention_plan",
        
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
  type: "subheading",
  label: "HEP (Home Exercise Program)"
},

{
  name: "home_exercise_program",
  label: "Home Exercise Program",
  type: "checkbox-group",
  options: [
    {
      label: "Strengthening exercises",
      value: "strengthening_exercises"
    },
    {
      label: "Stretching exercises",
      value: "stretching_exercises"
    },
    {
      label: "Standing / Sitting balance training",
      value: "balance_training"
    },
    {
      label: "Endurance training",
      value: "endurance_training"
    },
    {
      label: "Fitness regime",
      value: "fitness_regime"
    },
    {
      label: "Mobilization",
      value: "mobilization"
    },
    {
      label: "ROM exercise",
      value: "rom_exercise"
    },
    {
      label: "Patient & Carer education",
      value: "patient_carer_education"
    },
    {
      label: "Others",
      value: "other"
    }
  ]
},

{
  name: "home_exercise_program_other",
  label: "Specify Other HEP",
  type: "input",
  placeholder: "Enter other home exercise program",
  showIf: {
    field: "home_exercise_program",
    includes: "other"
  }
},
{
  type: "subheading",
  label: "Follow-up Plan"
},

{
  name: "follow_up_plan",
  label: "Follow-up Plan",
  type: "checkbox-group",
  options: [
    {
      label: "Reassessment scheduled in 2–4 weeks",
      value: "reassessment_2_4_weeks"
    },
    {
      label: "Track progress via Outcome measures",
      value: "track_progress_outcome_measures"
    }
  ]
},

          //       {
          // name: "home_exercise-program",
          // label: "Home Exercise Program",
          // type: "textarea"},


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
const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

        function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
  if (!patient) return null;

  const safe = (v) => v ?? "-";
  const formatDate = (d) => d ? new Date(d).toLocaleDateString() : "-";

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        fontSize: 14
      }}>
        <div><b>Name:</b> {safe(patient.name)}</div>
        <div><b>IC:</b> {safe(patient.id)}</div>
        <div><b>DOB:</b> {formatDate(patient.dob)}</div>

        <div><b>Age / Gender:</b> {safe(patient.age)} / {safe(patient.sex)}</div>
        <div><b>ICD:</b> {safe(patient.icd)}</div>
        <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>

        <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
        <div><b>Duration of Diagnosis:</b> -</div>
        <div><b>Primary Diagnosis:</b> {safe(patient.diagnosis_history)}</div>

        <div><b>Secondary Diagnosis:</b> {safe(patient.medical_history)}</div>
        <div><b>Dominant Side:</b> {safe(patient.dominant_side)}</div>
        <div><b>Language Preference:</b> {safe(patient.language_preference)}</div>

        <div><b>Education Level:</b> {safe(patient.education_background)}</div>
        <div><b>Occupation:</b> {safe(patient.occupation)}</div>
        <div><b>Work Status:</b> {safe(patient.employment_status)}</div>

        <div><b>Driving Status:</b> {safe(patient.driving_status)}</div>
        <div><b>PP/OB:</b> {safe(patient.pp_ob)}</div>
        <div><b>Weight:</b> {patient.weight ? `${patient.weight} kg` : "-"}</div>

        {/* ===== HISTORY ===== */}
        <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
        
           <h3>Patient History</h3>
        
                  <div>
                    <b>Past Medical History</b>
                    <input
                      style={input}
                      value={patientHistory.past_medical_history}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          past_medical_history: e.target.value
                        }))
                      }
                    />
                  </div>

          
          <div>
                    <b>Family History</b>
                    <input
                      style={input}
                      value={patientHistory.past_family_history}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          past_family_history: e.target.value
                        }))
                      }
                    />
                  </div>

        
           <div>
                    <b>Allergies</b>
                    <input
                      style={input}
                      value={patientHistory.alerts_and_allergies}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          alerts_and_allergies: e.target.value
                        }))
                      }
                    />
                  </div>

          <button style={alertBtn}>🚨 Alerts</button>
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
      <PatientInformationBlock
                  patient={patient}
                  patientHistory={patientHistory}
                  setPatientHistory={setPatientHistory}
                />
              
                <button style={doctorsReportBtn}>
                  Doctors Reports
                </button>
      {/* <PatientInformationBlock patient={patient} patientHistory={patientHistory} setPatientHistory={setPatientHistory}/> */}
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
        {activeTab !== "plan" ? (
          <button
            type="button"
            style={submitBtn}
            onClick={() => {
              if (activeTab === "subjective") setActiveTab("objective");
              else if (activeTab === "objective") setActiveTab("assessment");
              else if (activeTab === "assessment") setActiveTab("plan");
            }}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            style={submitBtn}
            onClick={handleSubmit}
          >
            Submit Neurology Assessment
          </button>
        )}
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

const input = {
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
const doctorsReportBtn = {
  padding: "10px 20px", background: "#2563EB", color: "#fff",
  border: "none", borderRadius: 6, fontSize: 14,
  fontWeight: 600, cursor: "pointer", marginTop: 8
};