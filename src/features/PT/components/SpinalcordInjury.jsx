import TUG from "./TUGForm";
import MMTForm from "./MMTForm";
import ROMForm from "./ROMForm";
import MASForm from "./MASForm";
import WSTForm from "./WSTForm";
import MFRTForm from "./MFRTForm";
import BergBalanceScale from "./BBS";
import WISCIForm from "./WISCIForm"
import SixMWTForm from "./SixMWTForm";
import SixMWPTForm from "./SixMWPTForm";
import { useState, useEffect } from "react";
import TenMWTForm from "./TenMWTForm";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";


function SpinalCordPatient({patient}) {
  if (!patient) return null;
  const today = new Date();

  const formatDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return "-";
    return dt.toLocaleDateString();
  };

  const calculateDuration = (onset) => {
    if (!onset) return "-";
    const onsetDate = new Date(onset);
    const diffMs = today - onsetDate;
    if (diffMs < 0 || Number.isNaN(onsetDate.getTime())) return "-";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
  };

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

const SPINAL_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
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

const SUBJECTIVE_SCHEMA = {
    actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
    fields: [
      {
        name: "chief_complaint",
        label: "Chief Complaint",
        type: "textarea"
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
      {
        name: "present_history",
        label: "Present History",
        type: "textarea"
      },
      {
        name: "past_history",
        label: "Past History",
        type: "textarea"
      },
      {
        name: "past_medical_history",
        label: "Past Medical History",
        type: "textarea"
      },
      {
        name: "past_surgical_history",
        label: "Past Surgical History",
        type: "textarea"
      },
      {
        name: "medication",
        label: "Medication",
        type: "textarea"
      },
      {
        name: "social_history",
        label: "Social History",
        type: "subheading"
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
        name: "marital_status",
        label: "Marital Status",
        type: "radio",
        options: [
          { label: "Single", value: "single" },
          { label: "Married", value: "married" },
          { label: "Divorced", value: "divorced" }
        ]
      },
      {
        name: "care_giver",
        label: "Care Giver",
        type: "radio",
        options: [
          { label: "Live Alone", value: "live_alone" },
          { label: "Lives With Family", value: "live_with_family" }
        ]
      },
      {
        name: "employement_status",
        label: "Employement Status",
        type: "radio",
        options: [
          { label: "Employed", value: "employed" },
          { label: "Unemployed", value: "unemployed" }
        ]
      },
      {
        name: "goals",
        label: "Goals",
        type: "subheading"
      },
      {
        name: "short_term_goals",
        label: "Short Term Goals",
        type: "textarea"
      },
      {
        name: "long_term_goals",
        label: "Long Term Goals",
        type: "textarea"
      },
      {
        name: "bowel",
        label: "Bowel",
        type: "radio",
        options: [
          { label: "Continence", value: "continence" },
          { label: "Incontinence", value: "incontinence" }
        ]
      },
      {
        name: "bladder",
        label: "Bladder",
        type: "radio",
        options: [
          { label: "Continence", value: "continence" },
          { label: "Incontinence", value: "incontinence" }
        ]
      },
    ]
}

const OBJECTIVE_SCHEMA = {
  title: "OBJECTIVE",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
        {
          name: "general_observations",
          label: "General Observations",
          type: "textarea"
        },
        {
          name: "local_observations",
          label: "Local Observations",
          type: "textarea"
        },
        {
          name: "palpation",
          label: "Palpation",
          type: "textarea"
        },
        {
          type: "subheading",
          label: "Scales / Outcome Measures"
        },
        {
          name: "spinal_scales",
          type: "assessment-launcher",
          options: [
            { label: "Range of Motion (ROM)", value: "rom" },
            { label: "Manual Muscle Test (MMT)", value: "mmt" },
            { label: "Muscle Tone (MAS)", value: "mas" },
            { label: "10 Meter Walk Test", value: "tenmwt" },
            { label: "Berg Balance Scale (BBS)", value: "bbs" },
            { label: "Timed Up and Go (TUG)", value: "tug" },
            { label: "6 Minutes Walk Test (6MWT)", value: "sixmwt" },
            { label: "6 Minutes Wheelchair Pust Test", value: "sixmwpt"},
            { label: "Wheelchair Skills Test", value: "wst"},
            { label: "Walking Index for Spinal Cord Injury", value: "wisci"},
            { label: "Modified Functional Reach Test", value: "mfrt"}
          ]
        },

      ]
    }
  ]
};

const ASSESSMENT_SCHEMA = {
  title: "ASSESSMENT",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
        {
          name: "problem_listing",
          label: "Problem Listing",
          type: "textarea"
        }
      ]
    }
  ]
};

const PLAN_SCHEMA = {
  title: "",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
          {
            type: "textarea",
            name: "short_term_goals",
            label: "Short Term Goals"
          },
          {
            type: "textarea",
            name: "long_term_goals",
            label: "Long Term Goals"
          },      
          {
            name: "intervention_plan",
            label: "Intervention Plan",
            type: "checkbox-group",
            options: [
                { label: "Stretching", value: "stretching" },
                { label: "Strengthening", value: "strengthening" },
                { label: "Sitting balance training ", value: "SBT" },
                { label: "Standing balance training ", value: "StBT" },
                { label: "Endurance training", value: "endurance" },
                { label: "Gait training", value: "gait" },
                { label: "Transfer training", value: "transfer_training" },
                { label: "Wheelchair skills training", value: "wheelchair_training" },
                { label: "Walking aids prescription", value: "walking_ais_prescription" }
            ]
        },
        {
          name: "home_exercise-program",
          label: "Home Exercise Program",
          type: "textarea"
        },
        { 
          name: "referrals", 
          label: "Referrals", 
          type: "checkbox-group",
          options: [
            { label: "Neuro-Robotic ", value: "neuro_robotic" },
            { label: "Hydrotherapy ", value: "hydrotherapy" },
            { label: "Pain Management", value: "pain_management" },
          ]
        },
        {
          name: "remarks",
          label: "Remarks",
          type: "textarea"
        }
      ]
    }
  ]
};

const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
};

const SPINAL_ASSESSMENT_REGISTRY = {
  tug: TUG,
  rom: ROMForm,
  mmt: MMTForm,
  mas: MASForm,
  wst: WSTForm,
  mfrt: MFRTForm,
  wisci: WISCIForm,
  tenmwt: TenMWTForm,
  sixmwt: SixMWTForm,
  sixmwpt: SixMWPTForm,
  bbs: BergBalanceScale,
};


export default function SpinalCordInjury({patient, onSubmit, onBack}) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `spinal_assessment_draft_${patient.id}`
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
      alert("Spinal draft saved");
    }
  };
 
  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Spinal assessment submitted");
  };
  
  return (
    <div style={mainContent}>
      <CommonFormBuilder
        schema={SPINAL_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => {}}
      >
        <SpinalCordPatient patient={patient} />
      </CommonFormBuilder>
      {/* ===== CONSENT & REFERRAL ===== */}
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
      <CommonFormBuilder
        schema={schemaMap[activeTab]}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        assessmentRegistry={SPINAL_ASSESSMENT_REGISTRY}
      >
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
              Submit Spinal Cord Assessment
            </button>
          )}
        </div>
      </CommonFormBuilder>
    </div>
  );
}


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