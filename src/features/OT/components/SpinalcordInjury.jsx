import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import ROMForm from "./RomForm";
import FIMAssessment from "./Fim";
import IADLAssessment from "./IADL";
import SCIMaleSexualFunctionAssessment from "./SciMaleSexualAssessment"
import SCIFemaleSexualFunctionAssessment from "./SciFeMaleSexualAssessment"
import MoCAAssessment from "./MocA";
import MMTForm from "../../PT/components/MMTForm";
import masForm from "../../PT/components/MASForm";
import CUEQAssessment from "./CUEQ";
import StrengthTest from "./Strengthtest";
import PatientCard from "../../../shared/cards/PatientCard";


export const NEURO_ASSESSMENT_REGISTRY = {
  rom: ROMForm,
  mmt: MMTForm,
  mas: masForm,
  FIM: FIMAssessment,
  moca: MoCAAssessment,
  scifemale: SCIFemaleSexualFunctionAssessment,
  scimale: SCIMaleSexualFunctionAssessment,
  iadl:IADLAssessment,
  cueq: CUEQAssessment,
  strength: StrengthTest
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
const Functional_assessment = [
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
const SUBJECTIVE_SCHEMA = {
  title: "",

  sections: [
    {
      fields: [

        {
          type: "textarea",
          name: "chief_complaint",
          label: "Chief Complaint"
        },

        {
          type: "textarea",
          name: "history_present_illness",
          label: "History of Present Illness"
        },

        {
          type: "textarea",
          name: "work_history",
          label: "Work History"
        },

        {
          type: "radio",
          name: "work_status",
          label: "Work Status",
          options: [
            { label: "Employed", value: "employed" },
            { label: "Unemployed", value: "unemployed" }
          ]
        },

        {
          type: "radio",
          name: "rtw_status",
          label: "Return to Work (RTW) Status",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
            { label: "Others", value: "others" }
          ]
        },

        {
          type: "input",
          name: "rtw_status_other",
          label: "Specify RTW Status",
          showIf: {
            field: "rtw_status",
            equals: "others"
          }
        },

        {
          type: "radio",
          name: "keen_to_rtw",
          label: "If No, Keen to RTW",
          showIf: {
            field: "rtw_status",
            equals: "no"
          },
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
            { label: "NIL", value: "nil" }
          ]
        },

        {
          type: "textarea",
          name: "client_expectations",
          label: "Client Expectations"
        },

        {
          type: "textarea",
          name: "driving_history",
          label: "Driving History"
        },

     {
  type: "radio",
  name: "driving_license_type",
  label: "Driving License Type",
  labelAbove: true,
  options: [
    { label: "None", value: "none" },
    { label: "B2 – Motor Car", value: "b2" },
    { label: "D – Heavy Motor Vehicle", value: "d" },
    { label: "E – Heavy Trailer Vehicle", value: "e" },
    { label: "GDL – Goods Driving License", value: "gdl" },
    { label: "PSV – Public Service Vehicle", value: "psv" },
    { label: "Others", value: "others" }
  ]
},

{
  type: "input",
  name: "license_other",
  label: "Other License Type",
  showIf: {
    field: "driving_license_type",
    equals: "others"
  }
},

        {
          type: "radio",
          name: "license_status",
          label: "License Status",
          options: [
            { label: "Active", value: "active" },
            { label: "Not active", value: "not_active" }
          ]
        },

        {
          type: "radio",
          name: "return_to_drive_post_injury",
          label: "Have You Returned to Drive Post Injury",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },

        {
          type: "textarea",
          name: "riding_details",
          label: "If Yes – Riding Duration, Distance, Modification",
          showIf: {
            field: "return_to_drive_post_injury",
            equals: "yes"
          }
        },

        {
          type: "radio",
          name: "keen_to_rtd",
          label: "If No, Keen to Return to Driving (RTD)",
          showIf: {
            field: "return_to_drive_post_injury",
            equals: "no"
          },
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
            { label: "NIL", value: "nil" }
          ]
        }

      ]
    }
  ]
};


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
  const NEURO_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: [

    ]
  };
 const OBJECTIVE_SCHEMA = {
  title: "",

  sections: [
    {
      fields: [

        {
          type: "subheading",
          label: "Physical Status"
        },

        {
          type: "radio",
          name: "dominant_hand",
          label: "Dominant",
          options: [
            { label: "Right", value: "right" },
            { label: "Left", value: "left" }
          ]
        },

        {
          type: "subheading",
          label: "Standardized Outcome Measures"
        },

        // {
        //   type: "checkbox-group",
        //   name: "standardized_outcome_measures",
        //   label: "Outcome Measures",
        //   options: [

        //     {
        //       label: "American Spinal Injury Association (ASIA) Impairment Scale",
        //       value: "asia"
        //     },

        //     {
        //       label: "Spinal Cord Independence Measure (SCIM)",
        //       value: "scim"
        //     },

        //     {
        //       label: "Functional Independence Measure (FIM)",
        //       value: "fim"
        //     },

        //     {
        //       label: "Lawton Instrumental Activities of Daily Living Scale (IADL)",
        //       value: "iadl"
        //     },

        //     {
        //       label: "Range of Motion (Active/Passive)",
        //       value: "rom"
        //     },

        //     {
        //       label: "Manual Muscle Testing (MMT)",
        //       value: "mmt"
        //     },

        //     {
        //       label: "Modified Ashworth Scale (MAS)",
        //       value: "mas"
        //     },

        //     {
        //       label: "Hand Grip Strength Test",
        //       value: "grip_strength"
        //     },

        //     {
        //       label: "Pinch Strength Test",
        //       value: "pinch_strength"
        //     },

        //     {
        //       label: "Function in Sitting Test (FIST)",
        //       value: "fist"
        //     },

        //     {
        //       label: "Capabilities of Upper Extremity Questionnaire (CUE-Q)",
        //       value: "cueq"
        //     },

        //     {
        //       label: "Cognitive Screening (MoCA)",
        //       value: "moca"
        //     },

        //     {
        //       label: "International Spinal Cord Injury Male Sexual Function",
        //       value: "sci_male_sexual_function"
        //     },

        //     {
        //       label: "International Spinal Cord Injury Female Sexual and Reproductive Function",
        //       value: "sci_female_sexual_function"
        //     }

        //   ]
        // },
 {
          name: "neuro_scales",
          type: "assessment-launcher",
          options: [
            { label: "Range of Motion (ROM)", value: "rom" },
            { label: "Manual Muscle Test (MMT)", value: "mmt" },
            { label: "Muscle Tone (MAS)", value: "mas" },
            { label: "Functional Independence Measure (FIM)", value: "FIM" },
            { label: "Montreal Cognitive Assessment (MoCA)", value: "moca" },
            { label: "International Spinal Cord Injury Female Sexual and Reproductive Function", value: "scifemale" },
            { label: "International Spinal Cord Injury Male Sexual Function", value: "scimale" },
            { label: "Lawton Instrumental Activities of Daily Living Scale (IADL)", value: "iadl" },
             {
              label: "Capabilities of Upper Extremity Questionnaire (CUE-Q)",
              value: "cueq"
            }
          ]
        },
        {
          type: "subheading",
          label: "Additional Observation / Tests"
        },

        {
          type: "checkbox-group",
          name: "additional_tests",
          label: "Tests",
          options: [

            {
              label: "Sensation Testing",
              value: "sensation_testing"
            },

            {
              label: "Pain Scale",
              value: "pain_scale"
            },

            {
              label: "Fine Motor and Dexterity Assessment",
              value: "fine_motor"
            }

          ]
        }

      ]
    }
  ]
}

const ASSESSMENT_SCHEMA = {
  title: "",

  sections: [
    {
      fields: [

        /* ================= PROBLEM LIST ================= */
        {
          type: "subheading",
          label: "Problem List"
        },
        {
          type: "textarea",
          name: "problem_list",
          placeholder: "Enter problem list...",
        },

        /* ================= CLINICAL IMPRESSION ================= */
        {
          type: "subheading",
          label: "Clinical Impression"
        },

        {
          type: "textarea",
          name: "functional_limitations",
          label: "Functional limitations",
          placeholder: "e.g. gait impairment, unsafe transfers"
        },

        {
          type: "textarea",
          name: "underlying_cause",
          label: "Underlying cause",
          placeholder: "e.g. CVA, fracture, neuropathy, TBI"
        },

        /* ================= REHAB PROGNOSIS ================= */
        {
          type: "subheading",
          label: "Rehab Prognosis"
        },

        {
          type: "radio",
          name: "rehab_prognosis",
          label: "Select prognosis",
          options: [
            { label: "Excellent", value: "excellent" },
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" }
          ]
        },

        {
          type: "info-text",
          text: "Based on cognition, motivation, severity, comorbidities"
        }

      ]
    }
  ]
};

const PLAN_SCHEMA = {
  title: "",
  
  sections: [
    {
      fields: [
        { type: "subheading", label: "Short Term Goals (2–4 Weeks)" },
        { type: "dynamic-goals", name: "short_term_goals" },
        
        { type: "subheading", label: "Long Term Goals (6–12 Weeks)" },
        { type: "dynamic-goals", name: "long_term_goals" },

        {
          label: "Therapeutic Exercises",
          type: "checkbox-group",
          name: "therapeutic_exercises",
          options: [
            { label: "Functional ROM Exercise", value: "rom" },
            { label: "Functional Strengthening Exercise", value: "strength" },
            { label: "Muscle Tone Management", value: "tone" },
            { label: "Fine Motor & Dexterity Training", value: "fine_motor" },
            { label: "Bobath/NDT Therapy", value: "ndt" },
            { label: "Trunk & Core Control Training", value: "core" },
            { label: "Lower Limb Activity Training", value: "lower_limb" },
            { label: "Endurance / Cardiovascular Training", value: "cardio" },
            { label: "Others", value: "others" }
          ]
        },

        /* OPTIONAL DETAIL FOR NDT */
        {
          type: "checkbox-group",
          name: "ndt_focus",
          label: "NDT Focus Area",
          options: [
            { label: "Trunk & Pelvis", value: "trunk" },
            { label: "Lower Limb", value: "lower" },
            { label: "Upper Limb & Hand", value: "upper" },
            { label: "Neck", value: "neck" }
          ],
          showIf: { field: "therapeutic_exercises", includes: "ndt" }
        },

        /* OTHER TEXT */
        {
          type: "textarea",
          name: "therapeutic_other",
          label: "Other Exercises",
          showIf: { field: "therapeutic_exercises", includes: "others" }
        },

    
        {
          label: "ADL Training",
          type: "checkbox-group",
          name: "adl_training",
          options: [
            { label: "Eating / Feeding", value: "eating" },
            { label: "Bathing / Showering", value: "bathing" },
            { label: "Dressing", value: "dressing" },
            { label: "Grooming", value: "grooming" },
            { label: "Toileting", value: "toileting" },
            { label: "Sphincter Control", value: "sphincter" },
            { label: "Bed Mobility", value: "bed" },
            { label: "Transfers (Bed)", value: "transfer_bed" },
            { label: "Transfers (Toilet)", value: "transfer_toilet" },
            { label: "Advanced Transfer (Car)", value: "car" },
            { label: "Advanced Transfer (Ground)", value: "ground" },
            { label: "Locomotion / Mobility", value: "mobility" },
            { label: "Stair Management", value: "stairs" }
          ]
        },

    
        {
          label: "IADL Training",
          type: "checkbox-group",
          name: "iadl_training",
          options: [
            { label: "Telephone Use", value: "phone" },
            { label: "Shopping", value: "shopping" },
            { label: "Food Preparation", value: "cooking" },
            { label: "Housekeeping", value: "housekeeping" },
            { label: "Laundry", value: "laundry" },
            { label: "Transportation", value: "transport" },
            { label: "Medication Management", value: "medication" },
            { label: "Financial Management", value: "finance" }
          ]
        },

    
        {
          type: "radio",
          label: "Driving Rehabilitation",
          name: "driving",
          options: [
            { label: "Off-road Driving", value: "offroad" },
            { label: "On-road Driving", value: "onroad" }
          ]
        },

  
        {
          type: "radio",
          label: "Riding Rehabilitation",
          name: "riding",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },

        /* ================= ASSISTIVE DEVICES ================= */
    
        {
            label: "Assistive & Adaptive Devices",
            type: "checkbox-group",
          name: "assistive_devices",
          options: [
            { label: "Splint", value: "splint" },
            { label: "Pressure Garment", value: "pressure" },
            { label: "Tubigrip", value: "tubigrip" },
            { label: "Adaptive Nail Clipper", value: "clipper" },
            { label: "Lightweight Wheelchair", value: "lw_wc" },
            { label: "Ultralight Wheelchair", value: "ul_wc" },
            { label: "Motorised Wheelchair", value: "motor_wc" },
            { label: "Commode Chair", value: "commode" },
            { label: "Cushion (Air/Foam/Gel)", value: "cushion" },
            { label: "Palmar Pocket", value: "palmar" },
            { label: "Transfer Board", value: "board" },
            { label: "Others", value: "others" }
          ]
        },

        {
          type: "textarea",
          name: "assistive_other",
          label: "Other Devices",
          showIf: { field: "assistive_devices", includes: "others" }
        }

      ]
    }
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

  const tabOrder = ["subjective", "objective", "assessment", "plan"];

  const [patientHistory, setPatientHistory] = useState({
  past_medical_history: patient?.medical_history || "",
  past_family_history: patient?.family_medical_history || "",
  alerts_and_allergies: patient?.alerts_and_allergies_history || ""
});
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
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        fontSize: 14
      }}>
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

        {/* ===== HISTORY ===== */}
        <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
          <h3>Patient History</h3>

          <div>
            <b>Past Medical History</b>
            <textarea
              style={textarea}
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
            <textarea
              style={textarea}
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
            <textarea
              style={textarea}
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
const textarea = {
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
  return (
    <div style={mainContent}>

      {/* ===== PATIENT INFORMATION CARD ===== */}
      <CommonFormBuilder
        schema={NEURO_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => { }}
      >
        <PatientInformationBlock patient={patient} patientHistory={patientHistory} setPatientHistory={setPatientHistory}/>
      </CommonFormBuilder>

      {/* ===== NEW ENVIRONMENT CARD ===== */}
   <CommonFormBuilder
      schema={CONSENT_AND_REFERRAL_SCHEMA}
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
          {activeTab !== "plan" ? (
            <button
              style={submitBtn}
              onClick={() => {
                const idx = tabOrder.indexOf(activeTab);
                const next = tabOrder[Math.min(tabOrder.length - 1, idx + 1)];
                setActiveTab(next);
              }}
            >
              Next
            </button>
          ) : (
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Neuro Assessment
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