import MMTForm from "./MMTForm";
import ROMForm from "./ROMForm";
import { useState, useEffect } from "react";
import PainAssessmentForm from "./PainForm";
import StumpAssessmentForm from "./StumpForm"
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PatientCard from "../../../shared/cards/PatientCard";


const AMPUTEE_CONTAINER_SCHEMA = {
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
        name: "amuptation_level",
        label: "Level of amputation",
        type: "checkbox-group",
        options: [
            { label: "Partial Foot", value: "partial_foot" },
            { label: "Ankle Disarticulation", value:"ankle_disarticulation" },
            { label: "Transtibial", value: "transtibial" },
            { label: "Knee Disarticulation", value: "knee_disarticulation" },
            { label: "Transfemoral", value: "transfemoral" },
            { label: "Hip Disarticulation", value: "hip_disarticulation" },
            { label: "Hemipelvectomy", value: "hemipelvectomy" },
            { label: "Partial Hand", value: "partial_hand" },
            { label: "Wrist Disarticulation", value: "wrist_disarticulation" },
            { label: "Transradial", value: "transradial" },
            { label: "Elbow Disarticulation", value: "elbow_disarticulation" },
            { label: "Transhumeral", value: "transhumeral" },
            { label: "Shoulder Disarticulation", value:"shoulder_disarticulation" },
            { label: "Forequater", value:"forequater"},
            { label: "Bilateral Transtibial", value:"bilateral_transtibial"},
            { label: "Bilateral Transfemoral", value: "bilateral_transfemoral" },
            { label: "Bilateral Lower Limb", value: "bilateral_lower_limb" },
            { label: "Bilateral Upper Limb", value: "bilateral_upper_limb" },
            { label: "Quadruple", value:"quadruple"}
        ]
      },
      {
        name: "involved_side",
        label: "Involved side",
        type: "radio",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
          { label: "Bilateral", value: "bilateral" }
        ]
      },
      {
        name: "amputation_reason",
        label: "Reason for amputation",
        labelAbove:"true",
        type: "radio",
        options: [
          { label: "Diabetes Mellitus", value: "diabetes_mellitus" },
          { label: "Traumatic Injury", value: "traumatic_injury" },
          { label: "Cancer", value: "cancer" },
          { label: "Necrotizing Fasciitis (Non-DM)", value: "necrotizing_fasciitis" },
          { label: "Vascular Disease", value: "vascular_disease" },
          { label: "Vascular Injury", value: "vascular_injury" },
          { label: "Tumour (Benign)", value: "tumour" },
          { label: "Aneurysm", value: "aneurysm" },
          { label: "Infection", value :"infection" }
        ]
      },
      {
        name: "assessment_date",
        label: "Date of Assessment",
        type: "date"
      },
      {
        name: "therapist",
        label: "Therapist",
        type: "textarea"
      },
      {
        name: "current_history",
        label: "Current History",
        type: "textarea"
      },
      {
        name: "comorbids",
        label: "Comorbids",
        type: "textarea"
      },
      {
        label: "Social History",
        type: "subheading"
      },
      {
        name: "home_environment",
        label: "Home Environment/access",
        type: "textarea"
      },
      {
        name: "lifestyle",
        label: "Lifestyle/Hobbies",
        type: "textarea"
      },
      {
        label: "Employment Status",
        type: "subheading"
      },
      {
        name: "employment_status",
        label: "",
        type: "radio",
        labelAbove: "true",
        options: [
          { label: "Employed", value: "employed" },
          { label: "Unemployed", value: "unemployed" },
          { label: "Self Employed", value: "self_employed" }
        ]
      },
      {
        name: "job_comment",
        label: "Job",
        type: "textarea"
      },
      {
        name: "hypoglycemic_awarness",
        label: "Hypoglycemic Awarness",
        type: "radio",
        options: [
          { label: "Yes", value:"yes" },
          { label: "No", value: "no"}
        ]
      },
      {
        name: "frequency",
        label: "Frequency",
        type: "input",
        showIf: {
          field: "hypoglycemic_awarness",
          equals: "yes"
        }
      },
      {
        name: "last_episode",
        label: "Last episode",
        type: "input",
        showIf: {
          field: "hypoglycemic_awarness",
          equals: "yes"
        }
      },
      {
        name: "common_symptoms",
        label: "Common symptoms",
        type: "input",
        showIf: {
          field: "hypoglycemic_awarness",
          equals: "yes"
        }
      },
      {
        label: "History of previous fall",
        type: "subheading"
      },
      {
        name: "last_6_months_incident",
        label: "Any incident of fall in last 6 months",
        type: "radio",
        labelAbove: "true",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no"}
        ]
      },
      {
        name: "fall_time_activity",
        label: "Activity at the time of fall",
        type: "textarea"
      },
      {
        name: "get_up_ability_from_floor",
        label: "Ability to get up from the floor",
        labelAbove: "true",
        type: "radio",
        options: [
          { label: "With help", value: "with_help" },
          { label: "Without help", value: "without_help"}
        ]
      }
    ]
}

const AMPUTEE_SCALE = [
  { label: "Complete independent", value: "complete_independent" },
  { label: "Moderate assistance", value: "moderate_assistance" },
  { label: "Maximal assistance", value: "maximal_assistance" },
];

const OBJECTIVE_SCHEMA = {
  title: "",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
        {
          label: "Current functional mobility and transfer",
          type: "subheading"
        },
        {
          name: "assistive_devices",
          label: "Assistive devices",
          type: "radio",
          labelAbove: "true",
          options: [
            { label: "Wheelchair", value: "wheelchair" },
            { label: "Frame", value: "frame" },
            { label: "Crutches", value: "crutches" },
            { label: "Cane", value: "cane" },
            { label: "None", value: "none"}
          ]
        },
        {
          name: "mobility",
          label: "Mobility",
          type: "radio-matrix",
          options: AMPUTEE_SCALE,
        },
        {
          name: "Bed_mobility",
          label: "Bed Mobility",
          type: "radio-matrix",
          options: AMPUTEE_SCALE,
        },
        {
          name: "toilet_transfer",
          label: "Toilet transfer",
          type: "radio-matrix",
          options: AMPUTEE_SCALE,
        },
        {
          name: "sit_to_stand",
          label: "Sit-to-stand",
          type: "radio-matrix",
          options: AMPUTEE_SCALE,
        },
        {
          name: "standing",
          label: "Standing",
          type: "radio-matrix",
          options: AMPUTEE_SCALE,
        },
        {
          name: "stairs",
          label: "Stairs",
          type: "radio-matrix",
          options: AMPUTEE_SCALE,
        },
        {
          label: "Sensory",
          type: "subheading"
        },
        {
          name: "vision",
          label: "Vision",
          type: "textarea"
        },
        {
          name: "hearing",
          label: "Hearing",
          type: "textarea"
        },
        {
          type: "subheading",
          label: "Scales / Outcome Measures"
        },
        {
          name: "Spinal_scales",
          type: "assessment-launcher",
          options: [
            { label: "Pain Assessment ", value: "pain" },
            { label: "Stump Assessment", value: "stump" },
            { label: "Range of Motion (ROM)", value: "rom" },
            { label: "Manual Muscle Test (MMT)", value: "mmt" },
          ]
        },
        {
          name: "intact_limb_condition",
          label: "Condition of intact limb",
          type: "checkbox-group",
          options: [
            { label: "History of fracture", value: "fracture_history" },
            { label: "Hallux valgus", value: "hallux_valgus" },
            { label: "Calluses", value: "calluses" },
            { label: "Lower limb oedema", value: "lower_limb_oedema" },
            { label: "Hammer toe deformity", value: "hammer_toe_deformity" },
            { label: "Dry cracked foot", value: "dry_cracked_foot" },
            { label: "Thickened toenail", value: "thickened_toenail" },
            { label: "Claw toe deformity", value: "claw_toe_deformity" },
            { label: "Charcot foot", value: "charcot_foot" },
            { label: "Flat foot", value: "flat_foot" },
            { label: "Varicose vein", value: "varicose_vein" }
          ]
        }
      ]
    }
  ]
};

const ASSESSMENT_SCHEMA = {
  title: "",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
        { type: "subheading", label: "Outcome Measures" },
        {
          type: "grid-table-flat",
          name: "balance_table",
          headers: ["Score", "K_Level"],
          rows: [
            { key: "amputee_mobility_predictor_p", label: "AMPPro", info: "Amputee Mobility Predictor (AMP) with Prosthesis (AMPPro)" },
            { key: "amputee_mobility_predictor_np", label: "AMPnoPro", info: "Amputee Mobility Predictor (AMP) without Prosthesis (AMPnoPro)"},
            { key: "five_time_sit_stand", label: "5xSTS", isFullRow: "true", info: "5 Time Sit-to-stand Test (5xSTS)" },
            { key: "six_min_walk_test", label: "6MWT", isFullRow: "true", info: "6 Minutes Walk Test (6MWT)"},
            { key: "functional_gait_assessment", label: "FGA", isFullRow: "true", info: "Functional Gait Assessment"},
            { key: "locomotor_capabilities_index_5", label: "LCI-5", isFullRow: "true", info: "Locomotor Capabilities Index-5"},
            { key: "tapes", label: "TAPES", isFullRow: "true", info: "Trinity Amputation and Prosthesis Experience Scales (TAPES)"},
            { key: "tug", label: "TUG", isFullRow: "true", info: "Time Up and Go (TUG)"},
            { key: "l_test", label: "L-Test", isFullRow: "true", info: "L-Test"},
            { key: "berg_balance_scale", label: "BBS", info: "Berg Balance Scale (BBS)"}
          ]
        },
        {
          name: "assistive_devices",
          label: "Assistive devices",
          type: "radio",
          labelAbove: "true",
          options: [
            { label: "Wheelchair", value: "wheelchair" },
            { label: "Frame", value: "frame" },
            { label: "Crutches", value: "crutches" },
            { label: "Cane", value: "cane" },
            { label: "None", value: "none"}
          ]
        },
        {
          name: "problem_listing",
          label: "Problem Listing",
          type: "textarea"
        },
        {
          name: "clinical_impression",
          label: "Clinical Impression",
          type: "textarea"
        },
        {
          name: "rehab_potential",
          label: "Rehab Potential",
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
      fields:  [
          {
            type: "textarea",
            name: "rehabilitation_plan",
            label: "Plan of rehabilitation/treament"
          },
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
            name: "referrals", 
            label: "Referrals", 
            type: "checkbox-group",
            options: [
              { label: "Cyberdyne", value: "cyverdyne" },
              { label: "Advance Robotic", value: "advance_robotic" },
              { label: "Metamotus Galileo", value: "metamotus_galileo" },
              { label: "Hydrotherapy", value: "hydrotherapy" },
              { label: "MSD ", value: "msd" },
              { label: "Neuro ", value: "neuro" },
              { label: "SCI ", value: "sci" },
              { label: "GYM", value: "gym" },
              { label: "Vocational", value: "vocational" },
              { label: "Nursing", value: "nursing" },
              { label: "TDCS", value: "tdcs" },
              { label: "RTMS", value: "rtms" },
              { label: "Gait Analysis", value: "gait_analysis" },
            ]
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

const AMPUTEE_ASSESSMENT_REGISTRY = {
  rom: ROMForm,
  mmt: MMTForm,
  pain: PainAssessmentForm,
  stump: StumpAssessmentForm
};


export default function Amputee({patient, onSubmit, onBack}) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `amputee_assessment_draft_${patient.id}`
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
      alert("amputee draft saved");
    }
  };

  const bergScoreCalculate = (score) => {
    score = parseInt(score)
    if (score >= 0 && score <=20){
      return "High Fall Risk"
    } else if(score >= 21 && score <= 40){
      return "Medium Fall Risk"
    } else if (score >= 41 && score <= 56){
      return "Low Fall Risk"
    } else {
      return ''
    }
  }

  const AmputeeWithProScoreCalculate = (score) => {
    score = parseInt(score)
    if (score >= 0 && score <=8){
      return "K0"
    } else if(score >= 9 && score <= 20){
      return "K1"
    } else if (score >= 21 && score <= 28){
      return "K2"
    } else if (score >= 29 && score <= 36){
      return "K3"
    } else if (score >= 37 && score <= 43){
      return "K4"
    } else {
      return ''
    }
  }

  const AmputeeWithoutProScoreCalculate = (score) => {
    score = parseInt(score)
    if (score >= 0 && score <=14){
      return "K0"
    } else if(score >= 15 && score <= 26){
      return "K1"
    } else if (score >= 27 && score <= 36){
      return "K2"
    } else if (score >= 37 && score <= 42){
      return "K3"
    } else if (score >= 43 && score <= 47){
      return "K4"
    } else {
      return ''
    }
  }
  
  const computedValues = {
    ...values,
    balance_table_berg_balance_scale_K_Level: bergScoreCalculate(values.balance_table_berg_balance_scale_Score),
    balance_table_amputee_mobility_predictor_p_K_Level: AmputeeWithProScoreCalculate(values.balance_table_amputee_mobility_predictor_p_Score),
    balance_table_amputee_mobility_predictor_np_K_Level: AmputeeWithoutProScoreCalculate(values.balance_table_amputee_mobility_predictor_np_Score)
  }

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("amputee assessment submitted");
  };
  console.log(values, 'hjkhjjklk')

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
      <CommonFormBuilder
        schema={AMPUTEE_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => {}}
      >
        <PatientInformationBlock patient={patient} patientHistory={patientHistory} setPatientHistory={setPatientHistory}/>
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
        values={computedValues}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        assessmentRegistry={AMPUTEE_ASSESSMENT_REGISTRY}
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
              Submit Amputee Assessment
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