import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import Part2MainSection from "../components/worq";
import WorkHardeningModalities from "../components/workhardeningmodalities";
import WorkHardeningScreening from "../components/workhardeningscreening";
import ReadinessReturnToWorkScale from "../components/returntowork";
import FunctionalCapacityEvaluation from "../components/functioncapacityevaluation";
import BeckerWorkAdjustmentProfile from "../components/beckerwork";

export const VOCATIONAL_REHAB_REGISTRY = {
  Part2MainSection,
  WorkHardeningModalities,
  WorkHardeningScreening,
  ReadinessReturnToWorkScale,
  FunctionalCapacityEvaluation,
  BeckerWorkAdjustmentProfile
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

export default function VocationalRehab({ patient, onUpdatePatient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  /* --------- Patient History State --------- */
  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: patient?.medical_history || "",
    past_family_history: patient?.family_medical_history || "",
    alerts_and_allergies: patient?.alerts_and_allergies_history || "",
  });

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `work_assessment_draft_${patient.id}`
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

  /* --------- Keep patient history in sync --------- */
  useEffect(() => {
    setPatientHistory({
      past_medical_history: patient?.medical_history || "",
      past_family_history: patient?.family_medical_history || "",
      alerts_and_allergies: patient?.alerts_and_allergies_history || "",
    });
  }, [patient?.id]);

  /* --------- Persist patient history changes --------- */
  useEffect(() => {
    if (!patient?.id) return;
    const updated = {
      ...patient,
      medical_history: patientHistory.past_medical_history,
      family_medical_history: patientHistory.past_family_history,
      alerts_and_allergies_history: patientHistory.alerts_and_allergies,
    };
    localStorage.setItem("patient_" + patient.id, JSON.stringify(updated));
    onUpdatePatient?.(updated);
  }, [patient?.id, patientHistory.past_medical_history, patientHistory.past_family_history, patientHistory.alerts_and_allergies]);

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
      alert("draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("assessment submitted");
  };

  const today = new Date();
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return "-";
    }
  };
  const calculateDuration = (onset) => {
    if (!onset) return "-";
    const onsetDate = new Date(onset);
    const diffMs = today - onsetDate;
    if (Number.isNaN(diffMs) || diffMs < 0) return "-";
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
  };

const SUBJECTIVE_SCHEMA = {
  title: "",
  sections: [
    {
      fields: [
        {
          name: "driving_license",
          label: "Driving License",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Did not posses any", value: "none" },
            { label: "D, DA (Motorcar below 3500 kg)", value: "d_da" },
            {
              label: "B, B1, B2 (Motocycle 500 cc, below 500 cc, below 250 cc)",
              value: "b_b1_b2"
            },
            {
              label: "A, A1 (Invalid Carriage Motocycle, Motorcar)",
              value: "a_a1"
            },
            {
              label: "E, F, G, H, I (Heavy Motorcar, Tractor, Machinery)",
              value: "e_f_g_h_i"
            },
            {
              label: "PSV, GDL (Vocational Driving License)",
              value: "psv_gdl"
            }
          ]
        },

        {
          name: "client_interest",
          label: "Client Interest",
          type: "checkbox-group",
          options: [
            { label: "Sewing", value: "sewing" },
            { label: "Bakery", value: "bakery" },
            { label: "Urban farming", value: "urban_farming" },
            { label: "Design", value: "design" },
            { label: "Hands On", value: "hands_on" },
            { label: "Electrical", value: "electrical" },
            { label: "Electronics", value: "electronics" },
            { label: "Office Administration", value: "office_admin" },
            { label: "Short Course", value: "short_course" },
            { label: "Entrepreneurship", value: "entrepreneurship" },
            { label: "Barista", value: "barista" },
            { label: "Hairstyling", value: "hairstyling" },
            { label: "Culinary", value: "culinary" },
            { label: "Automotive", value: "automotive" },
            { label: "Innovart", value: "innovart" },
            { label: "Florist", value: "florist" }
          ]
        },

        {
          name: "environment_limitation",
          label: "Environment and Limitation",
          type: "checkbox-group",
          options: [
            { label: "Standing", value: "standing" },
            { label: "Walking", value: "walking" },
            { label: "Sitting", value: "sitting" },
            { label: "Stretching", value: "stretching" },
            { label: "Squatting or Crouching", value: "squatting_crouching" },
            { label: "Twisting body or neck", value: "twisting_body_neck" },
            {
              label: "Lifting and carrying weight",
              value: "lifting_carrying_weight"
            },
            { label: "Repetitive movement", value: "repetitive_movement" },
            { label: "Driving", value: "driving" },
            { label: "Using hand equipment", value: "using_hand_equipment" },
            { label: "Stooping", value: "stooping" },
            {
              label: "Memory of concentration activity",
              value: "memory_concentration"
            },
            { label: "Visual Impaired", value: "visual_impaired" },
            { label: "Hearing Impaired", value: "hearing_impaired" },
            { label: "Speech Impaired", value: "speech_impaired" }
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

  const VOCATIONAL_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: []
  };

 const OBJECTIVE_SCHEMA = {
  title: "",

  sections: [
    {
      fields: [

        {
          name: "vocational_scales",
          type: "assessment-launcher",
          options: [
            // { label: "WORQ", value: "Part2MainSection" },
            // { label: "WORK HARDENING MODALITIES", value: "WorkHardeningModalities" },
            // { label: "WORK HARDENING SCREENING TEMPLATE", value: "WorkHardeningScreening" },
            // { label: "READINESS FOR RETURN-TO-WORK SCALE", value: "ReadinessReturnToWorkScale" },
            // { label: "FUNCTIONAL CAPACITY EVALUATION", value: "FunctionalCapacityEvaluation" },
             { label: "BECKER WORK ADJUSTMENT PROFILE", value: "BeckerWorkAdjustmentProfile" },
          ]
        },
      ]
    }
  ]
}

const ASSESSMENT_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  fields: [
      {
        name: "hydro_clinical_impression",
        label: "Clinical Impression",
        type: "textarea"
      },
      {
          type: "textarea",
          name: "problem_list",
          label: "Problem List"
        },

       {
          type: "radio",
          name: "vocational_potential",
          label: "Potential",
          options: [
            { label: "Excellent", value: "excellent" },
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" }
          ]
        },
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
          type: "textarea",
          name: "vocational_intervention",
          label: "Intervention",
        },
        {
          type: "checkbox-group",
          name: "vocational_plan",
          label: "Plan",
          options: [
            { label: "Splint", value: "splint" },
            { label: "Mobility aid", value: "mobility_aid" },
            { label: "Home modification", value: "home_modification" },
            { label: "Nil", value: "nil" }
          ]
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

  function VocationalRehabPatientInfo({ patient, patientHistory, setPatientHistory }) {
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
          <div><b>Duration of Diagnosis:</b> {calculateDuration(patient.date_of_onset)}</div>
          <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
          <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
          <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
          <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
          <div><b>Education Level:</b> {patient.education_background || "-"}</div>
          <div><b>Occupation:</b> {patient.occupation || "-"}</div>
          <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
          <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
          <div><b>Marital Status:</b> {patient.marital_status || patient.marital || "-"}</div>

          <div style={{ gridColumn: "1 / -1", marginTop: 8 }}>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>Patient History</div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Past Medical History</div>
              <textarea
                value={patientHistory.past_medical_history}
                onChange={(e) => setPatientHistory((prev) => ({ ...prev, past_medical_history: e.target.value }))}
                style={{
                  width: "100%",
                  minHeight: 90,
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Family History</div>
              <textarea
                value={patientHistory.past_family_history}
                onChange={(e) => setPatientHistory((prev) => ({ ...prev, past_family_history: e.target.value }))}
                style={{
                  width: "100%",
                  minHeight: 90,
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Allergies</div>
              <textarea
                value={patientHistory.alerts_and_allergies}
                onChange={(e) => setPatientHistory((prev) => ({ ...prev, alerts_and_allergies: e.target.value }))}
                style={{
                  width: "100%",
                  minHeight: 90,
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                  fontSize: 14,
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div> 
            <div style={{ marginBottom: 10 }}>
              <button
                type="button"
                onClick={() => {
                  console.log("Alerts button clicked!");
                }}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  borderRadius: 6,
                  border: "1.5px solid rgb(0, 123, 255)",
                  background: "rgb(0, 123, 255)",
                  color: "rgb(255, 255, 255)",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.06)"
                }}
              >
                🚨 Alerts
              </button>
            </div>           
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={mainContent}>

      {/* ===== PATIENT INFORMATION CARD ===== */}
      <CommonFormBuilder
        schema={VOCATIONAL_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => { }}
      >
        <VocationalRehabPatientInfo patient={patient} patientHistory={patientHistory} setPatientHistory={setPatientHistory} />
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
      <CommonFormBuilder
        schema={schemaMap[activeTab]}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        assessmentRegistry={VOCATIONAL_REHAB_REGISTRY}
      >
      </CommonFormBuilder>
    </div>
  );
}

/* ===================== STYLES ===================== */

const mainContent = { margin: "0 auto" };

const section = {
  marginBottom: 24
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
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