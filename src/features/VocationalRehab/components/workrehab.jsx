import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import Part2MainSection from "../components/worq";
import WorkHardeningModalities from "../components/workhardeningmodalities";
import WorkHardeningScreening from "../components/workhardeningscreening";
import ReadinessReturnToWorkScale from "../components/returntowork";
import FunctionalCapacityEvaluation from "../components/functioncapacityevaluation";
import BeckerWorkAdjustmentProfile from "../components/beckerwork";

export const WORK_REHAB_REGISTRY = {
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
      alert("Neuro draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Neuro assessment submitted");
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
          type: "",
          label: "Which best describes your current work status, or if currently not working your last work status"
        },
        {
          type: "radio",
          name: "work_status",
          label: "",
          options: [
            { value: "employed", label: "Employed" },
            { value: "self_employed", label: "Self-employed" },
            { value: "non_paid_work", label: "Non-paid work such as volunteer" },
            { value: "student", label: "Student or in training" },
            { value: "homemaker", label: "Homemaker" },
            { value: "retired", label: "Retired" },
            { value: "not_applicable", label: "Not applicable" }
          ]
        },

        {
          type: "radio",
          name: "current_status",
          label: "Which of the following describes your current work status best",
          options: [
            { value: "working", label: "Working" },
            { value: "not_working", label: "Not working" }
          ]
        },
        {
          type: "radio",
          name: "current_work_type",
          label: "If currently working, are you",
          options: [
            { value: "full_time", label: "Full time" },
            { value: "part_time", label: "Part time" },
            { value: "modified_duty", label: "On modified or light duty" }
          ],
          showIf: { field: "work_status", equals: "working" }
        },
        {
          type: "radio",
          name: "not_working_reason",
          label: "If currently not working, are you",
          labelAbove: true,
          options: [
            { value: "health_reason", label: "Not working due to health reason" },
            { value: "vocational_rehab", label: "Not working due to ongoing vocational rehabilitation" },
            { value: "other", label: "Not working due to other reasons" }
          ],
          showIf: { field: "work_status", equals: "not_working" }
        },
        {
          type: "input",
          name: "not_working_other_specify",
          label: "Please specify:",
          placeholder: "Enter reason",
          showIf: { 
            field: "not_working_reason", 
            equals: "other" 
          }
        },
        {
          type: "input",
          name: "off_work_since",
          label: "If currently not working, since when have you been off from work",
          placeholder: "Enter date or duration",
          showIf: { field: "work_status", equals: "not_working" }
        },

        {
          type: "",
          label: "When thinking about your work or vocational rehabilitation program: Are you currently:"
        },
        {
          type: "radio",
          name: "vocational_status",
          label: "",
          options: [
            { value: "training", label: "Engaging in vocational training activities such as in acquiring knowledge and skills for a job, including school training" },
            { value: "employment_prep", label: "Engaging in programs related to preparation for employment such as apprenticeship or internship" },
            { value: "securing_job", label: "Engaging in activities to secure or maintain your current job" },
            { value: "looking_for_job", label: "Looking for a (new) job or work" }
          ]
        },

        {
          type: "",
          label: "What is the highest level of education that you have completed"
        },
        {
          type: "radio",
          name: "education_level",
          label: "",
          options: [
            { value: "no_formal", label: "No formal schooling" },
            { value: "less_than_primary", label: "Less than primary school" },
            { value: "primary", label: "Primary school" },
            { value: "secondary", label: "Secondary school" },
            { value: "college", label: "College / university" },
            { value: "post_graduate", label: "Post-graduate degree" }
          ]
        },

        {
          type: "input",
          name: "job_title",
          label: "What is your current job or profession or if currently not working, what is the last job or profession you worked in (job title)"
        },

        {
          type: "input",
          name: "business_industry",
          label: "What kind of business, industry or service is (or was) your job in",
          placeholder: "e.g., cardboard box manufacturing, road maintenance, retail shoe store, secondary school, dairy farm, municipal government"
        },

        {
          type: "input",
          name: "work_type",
          label: "What kind of work are (or were) you doing",
          placeholder: "e.g., driving trucks, operating machines, writing letters, answering telephone calls"
        },

        {
          type: "radio",
          name: "job_change_planned",
          label: "If a change of job is planned, what future job are you aiming for",
          options: [
            { value: "yes", label: "Yes" },
            { value: "not_applicable", label: "Not Applicable" }
          ]
        },
        {
          type: "input",
          name: "future_job",
          placeholder: "Specify future job",
          showIf: { field: "job_change_planned", equals: "yes" }
        },

        {
          type: "radio",
          name: "medical_treatment",
          label: "Are you in medical or therapeutic treatment (e.g. with physician, therapists, etc.)",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "not_applicable", label: "Not Applicable" }
          ]
        },
        {
          type: "input",
          name: "medical_treatment_specify",
          label: "If yes, please specify:",
          placeholder: "Enter details",
          showIf: { field: "medical_treatment", equals: "yes" }
        },

       {
        type: "radio",
        name: "current_restrictions",
        label: "Do you have current restrictions",
        info: "e.g. lifting limited to 5kg, limited weight bearing on your leg or arm",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "not_applicable", label: "Not Applicable" }
        ]
      },
        {
          type: "input",
          name: "restrictions_specify",
          label: "If yes, please specify:",
          placeholder: "Enter restrictions",
          showIf: { field: "current_restrictions", equals: "yes" }
        },

        {
          type: "input",
          name: "vocational_intervention",
          label: "What kind of work or vocational intervention are you receiving now (list all you know)",
          placeholder: "e.g. physical training, cognitive training, case management, vocational training, work place adaptation, work evaluation etc."
        },

        {
          type: "radio",
          name: "family_support",
          label: "In your current situation, do you get the support you need from your family",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "not_applicable", label: "Not Applicable" }
          ]
        },
        {
          type: "input",
          name: "family_support_specify",
          label: "If yes, please specify what kind of support you get:",
          placeholder: "Enter details",
          showIf: { field: "family_support", equals: "yes" }
        },

        {
          type: "radio",
          name: "supervisor_support",
          label: "If still employed, do you get the support you need from your supervisor or boss",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "not_applicable", label: "Not Applicable" }
          ]
        },
        {
          type: "input",
          name: "supervisor_support_specify",
          label: "If yes, please specify what kind of support you get:",
          placeholder: "Enter details",
          showIf: { field: "supervisor_support", equals: "yes" }
        },

        {
          type: "radio",
          name: "government_support",
          label: "Outside of your current work or vocational rehabilitation program, do you get the support you need from government or private employment agencies to find suitable work, or looking for different work",
          labelAbove: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "not_applicable", label: "Not Applicable" }
          ]
        },
        {
          type: "input",
          name: "government_support_specify",
          label: "If yes, please specify what kind of support you get:",
          placeholder: "Enter details",
          showIf: { field: "government_support", equals: "yes" }
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

  const NEURO_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: []
  };

 const OBJECTIVE_SCHEMA = {
  title: "",

  sections: [
    {
      fields: [

        {
          name: "neuro_scales",
          type: "assessment-launcher",
          options: [
            { label: "WORQ", value: "Part2MainSection" },
            { label: "WORK HARDENING MODALITIES", value: "WorkHardeningModalities" },
            { label: "WORK HARDENING SCREENING TEMPLATE", value: "WorkHardeningScreening" },
            { label: "READINESS FOR RETURN-TO-WORK SCALE", value: "ReadinessReturnToWorkScale" },
            { label: "FUNCTIONAL CAPACITY EVALUATION", value: "FunctionalCapacityEvaluation" },
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
      type: "checkbox-group",
      name: "work_hardening_issues",
      label: "Problem List",
      options: [
        {
          label: "Chronic / recurrent pain issues",
          value: "chronic_recurrent_pain"
        },
        {
          label: "Limited physical strength",
          value: "limited_physical_strength"
        },
        {
          label: "Limited manual material handling ability (lifting, carrying, pushing, pulling)",
          value: "limited_material_handling"
        },
        {
          label: "Limited endurance",
          value: "limited_endurance"
        },
        {
          label: "Limited repetitive tasks performance",
          value: "limited_repetitive_tasks"
        },
        {
          label: "Limited fine motor / dexterity function",
          value: "limited_fine_motor"
        },
        {
          label: "Postural dysfunction",
          value: "postural_dysfunction"
        },
        {
          label: "Impaired balance",
          value: "impaired_balance"
        },
        {
          label: "Walking and gait impairments",
          value: "walking_gait_impairment"
        },
        {
          label: "Limited cognitive capabilities",
          value: "limited_cognitive"
        },
        {
          label: "Limited communication ability",
          value: "limited_communication"
        },
        {
          label: "Psychosocial issues",
          value: "psychosocial_issues"
        },
        {
          label: "Ergonomics risk factors",
          value: "ergonomics_risk"
        },
        {
          label: "Rate of perceived exertion (RPE)",
          value: "rpe"
        },
        {
          label: "Others",
          value: "others"
        }
      ]
    },
    {
      type: "textarea",
      name: "work_hardening_issues_other",
      label: "Specify",
      showIf: {
        field: "work_hardening_issues",
        includes: "others"
      }
    },

    { type: "subheading", label: "Progress Since Last Session" },
    {
      type: "grid-table-flat",
      name: "hydro_progress",
      headers: ["Baseline", "Progress", "Final"],
      rows: [
        { key: "worq", label: "WORQ" },
        { key: "work_scale", label: "Readiness for Return to Work Scale" },
      ]
    },
    {
      name: "hydro_prognosis",
      label: "Prognosis",
      type: "radio",
      options: [
        { label: "Good", value: "good" },
        { label: "Fair", value: "fair" },
        { label: "Guarded", value: "guarded" }
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
          type: "checkbox-group",
          name: "intervention_plan",
          label: "Intervention Plan",
          options: [
            {
              label: "Physical Conditioning",
              value: "physical_conditioning"
            },
            {
              label: "Work Hardening",
              value: "work_hardening"
            },
            {
              label: "Work Simulation",
              value: "work_simulation"
            },
            {
              label: "Ergonomics Education",
              value: "ergonomics_education"
            },
            {
              label: "Job Modifications",
              value: "job_modifications"
            },
            {
              label: "Workplace Assessments & Adaptations",
              value: "workplace_assessment_adaptation"
            },
            {
              label: "Functional Capacity Evaluation",
              value: "functional_capacity_evaluation"
            },
            {
              label: "Vocational Rehabilitation",
              value: "vocational_rehabilitation"
            },
            {
              label: "Job Coaching",
              value: "job_coaching"
            },
            {
              label: "Psychosocial Adaptation",
              value: "psychosocial_adaptation"
            },
            {
              label: "Cognitive Rehabilitation",
              value: "cognitive_rehabilitation"
            },
            {
              label: "Others",
              value: "others"
            }
          ]
        },
        {
          type: "textarea",
          name: "intervention_plan_other",
          label: "Specify",
          showIf: {
            field: "intervention_plan",
            includes: "others"
          }
        },
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
        schema={NEURO_CONTAINER_SCHEMA}
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
        assessmentRegistry={WORK_REHAB_REGISTRY}
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