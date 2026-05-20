import { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PatientCard from "../../../shared/cards/PatientCard";

/* ── Shared actions ── */
const ACTIONS = [
  { type: "clear", label: "Clear" },
  { type: "save",  label: "Save"  },
];

/* ══════════════════════════════════════════════════════════
   SCHEMAS
══════════════════════════════════════════════════════════ */

const SUBJECTIVE_SCHEMA = {
  
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [{
    fields: [
      { name: "complaint", label: "Cheif Complaint", type: "input", placeholder: "Therapist assessment..." },
      { name: "History of Present", label: "History of Present Illnes", type: "input" },
        {
          name: "observation",
          label: "Observation",
          type: "input",
          placeholder: "Enter observation",
          enableVoiceToText: true,
          enableOCR: true
        },
        {
          name: "any_complaints",
          label: "Any Complaints",
          type: "input",
          placeholder: "Enter any complaints",
          enableVoiceToText: true,
          enableOCR: true
        },
        // {
        //   name: "pain_scale",
        //   label: "Pain Scale",
        //   type: "input",
        //   placeholder: "Enter pain scale",
        //   enableVoiceToText: true,
        //   enableOCR: true
        // },
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
          name: "new_finding_issue",
          label: "New Finding / Issue",
          type: "input",
          placeholder: "Enter new finding or issue",
          enableVoiceToText: true,
          enableOCR: true
        }
      
    ],
  }],
};
const OBJECTIVE_SCHEMA = {

actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [
    {
      title: "Therapeutic Interventions",
      fields: [

        // =========================
        // MASTER TREATMENT SELECTION
        // =========================
       {
              name: "objective_interventions",
       
          type: "checkbox-group",
          options: [
            { label: "Work Hardening", value: "work_hardening" },
            { label: "Work Simulation", value: "work_simulation" },
            { label: "Ergonomics Education", value: "ergonomics_education" },
            { label: "Job Modifications", value: "job_modifications" },
            { label: "Workplace Assessments & Adaptations", value: "workplace_assessments_adaptations" },
            { label: "Functional Capacity Evaluation", value: "functional_capacity_evaluation" },
            { label: "Vocational Rehabilitation", value: "vocational_rehabilitation" },
            { label: "Job Coaching", value: "job_coaching" },
            { label: "Psychosocial Adaptation", value: "psychosocial_adaptation" },
            { label: "Cognitive Training", value: "cognitive_training" },
            { label: "Pain Management", value: "pain_management" },
            { label: "Others", value: "others" }
          ]
        },

        /* ───────────── WORK HARDENING ───────────── */
        {
          name: "work_hardening_components",
          label: "Work Hardening Components",
          type: "checkbox-group",
          options: [
            { label: "BTE Primus", value: "bte_primus" },
            { label: "Positional Tolerance Training", value: "positional_tolerance_training" },
            { label: "Fine Motor Training", value: "fine_motor_training" },
            { label: "Strength and Endurance Training", value: "strength_endurance_training" }
          ],
          showIf: {
            field: "objective_interventions",
            includes: "work_hardening"
          }
        },

        {
          name: "work_hardening_bte_primus_remarks",
          label: "BTE Primus Remarks",
          type: "input",
          showIf: {
            field: "work_hardening_components",
            includes: "bte_primus"
          }
        },
        {
          name: "positional_tolerance_training_remarks",
          label: "Positional Tolerance Training Remarks",
          type: "input",
          showIf: {
            field: "work_hardening_components",
            includes: "positional_tolerance_training"
          }
        },
        {
          name: "fine_motor_training_remarks",
          label: "Fine Motor Training Remarks",
          type: "input",
          showIf: {
            field: "work_hardening_components",
            includes: "fine_motor_training"
          }
        },

        /* ───── Strength and Endurance Training ───── */
        {
          name: "strength_endurance_training_items",
          label: "Strength and Endurance Training",
          type: "checkbox-group",
          options: [
            { label: "Pushing", value: "pushing" },
            { label: "Pulling", value: "pulling" },
            { label: "Walking", value: "walking" },
            { label: "Tread Climber", value: "tread_climber" },
            { label: "Wheelchair Manoeuvre", value: "wheelchair_manoeuvre" },
            { label: "Stairs", value: "stairs" },
            { label: "Stair Mill", value: "stair_mill" },
            { label: "Industrial Ladder", value: "industrial_ladder" },
            { label: "Jacob’s Ladder", value: "jacobs_ladder" },
            { label: "Microprocessor Upper and Limb Exerciser (MULE)", value: "mule" },
            { label: "HIIT UBE", value: "hiit_ube" },
            { label: "HIIT MILL", value: "hiit_mill" },
            { label: "Eccentron", value: "eccentron" },
            { label: "BTE Multi-Cervical Unit (MCU)", value: "bte_mcu" },
            { label: "BTE Primus", value: "strength_bte_primus" },
            { label: "Con-Trex", value: "con_trex" },
            { label: "HUMAC NORM", value: "humac_norm" },
            { label: "Others", value: "others" }
          ],
          showIf: {
            field: "work_hardening_components",
            includes: "strength_endurance_training"
          }
        },

        {
          name: "pushing_remarks",
          label: "Pushing Remarks",
          type: "input",
          showIf: {
            field: "strength_endurance_training_items",
            includes: "pushing"
          }
        },
        {
          name: "pulling_remarks",
          label: "Pulling Remarks",
          type: "input",
          showIf: {
            field: "strength_endurance_training_items",
            includes: "pulling"
          }
        },
        {
          name: "walking_remarks",
          label: "Walking Remarks",
          type: "input",
          showIf: {
            field: "strength_endurance_training_items",
            includes: "walking"
          }
        },
        {
          name: "strength_endurance_others",
          label: "Other Strength and Endurance Training Remarks",
          type: "input",
          showIf: {
            field: "strength_endurance_training_items",
            includes: "others"
          }
        },

        /* ───────────── OTHER INTERVENTIONS ───────────── */
        {
          name: "work_simulation_remarks",
          label: "Work Simulation Remarks",
          type: "input",
          showIf: {
            field: "objective_interventions",
            includes: "work_simulation"
          }
        },
        {
          name: "ergonomics_education_remarks",
          label: "Ergonomics Education Remarks",
          type: "input",
          showIf: {
            field: "objective_interventions",
            includes: "ergonomics_education"
          }
        },
        {
          name: "job_modifications_remarks",
          label: "Job Modifications Remarks",
          type: "input",
          showIf: {
            field: "objective_interventions",
            includes: "job_modifications"
          }
        },
        {
          name: "workplace_assessments_adaptations_remarks",
          label: "Workplace Assessments & Adaptations Remarks",
          type: "input",
          showIf: {
            field: "objective_interventions",
            includes: "workplace_assessments_adaptations"
          }
        },

        /* ───────────── Functional Capacity Evaluation ───────────── */
        {
          name: "fce_components",
          label: "Functional Capacity Evaluation",
          type: "radio",
          options: [
            { label: "BTE Evaltech", value: "bte_evaltech" },
            { label: "BTE Primus", value: "bte_primus" },
            { label: "Valpar Joule", value: "valpar_joule" },
            { label: "Others", value: "others" }
          ],
          showIf: {
            field: "objective_interventions",
            includes: "functional_capacity_evaluation"
          }
        },
        {
  name: "bte_evaltech_remarks",
  label: "BTE Evaltech Remarks",
  type: "input",
  placeholder: "Enter BTE Evaltech remarks",
  showIf: {
    field: "fce_components",
    equals: "bte_evaltech"
  }
},
{
  name: "fce_bte_primus_remarks",
  label: "BTE Primus Remarks",
  type: "input",
  placeholder: "Enter BTE Primus remarks",
  showIf: {
    field: "fce_components",
    equals: "bte_primus"
  }
},
{
  name: "valpar_joule_remarks",
  label: "Valpar Joule Remarks",
  type: "input",
  placeholder: "Enter Valpar Joule remarks",
  showIf: {
    field: "fce_components",
    equals: "valpar_joule"
  }
},
        {
  name: "fce_components_other_details",
  label: "Other Functional Capacity Evaluation",
  type: "input",
  placeholder: "Enter other functional capacity evaluation",
  showIf: {
    field: "fce_components",
    equals: "others"
  }
},
        {
          name: "bte_evaltech_remarks",
          label: "BTE Evaltech Remarks",
          type: "input",
          showIf: {
            field: "fce_components",
            includes: "bte_evaltech"
          }
        },
        {
          name: "fce_bte_primus_remarks",
          label: "BTE Primus Remarks",
          type: "input",
          showIf: {
            field: "fce_components",
            includes: "bte_primus"
          }
        },
        {
          name: "valpar_joule_remarks",
          label: "Valpar Joule Remarks",
          type: "input",
          showIf: {
            field: "fce_components",
            includes: "valpar_joule"
          }
        },
        {
          name: "fce_others_remarks",
          label: "Other Functional Capacity Evaluation Remarks",
          type: "input",
          showIf: {
            field: "fce_components",
            includes: "others"
          }
        },

        /* ───────────── Remaining Remarks ───────────── */
        {
          name: "vocational_rehabilitation_remarks",
          label: "Vocational Rehabilitation Remarks",
          type: "input",
          showIf: {
            field: "objective_interventions",
            includes: "vocational_rehabilitation"
          }
        },
        {
          name: "job_coaching_remarks",
          label: "Job Coaching Remarks",
          type: "input",
          showIf: {
            field: "objective_interventions",
            includes: "job_coaching"
          }
        },
        {
          name: "psychosocial_adaptation_remarks",
          label: "Psychosocial Adaptation Remarks",
          type: "input",
          showIf: {
            field: "objective_interventions",
            includes: "psychosocial_adaptation"
          }
        },
        {
          name: "cognitive_training_remarks",
          label: "Cognitive Training Remarks",
          type: "input",
          showIf: {
            field: "objective_interventions",
            includes: "cognitive_training"
          }
        },

        /* ───────────── Pain Management ───────────── */
        {
          name: "pain_management_items",
          label: "Pain Management",
          type: "checkbox-group",
          options: [
            { label: "Hot Pack", value: "hot_pack" },
            { label: "Cold Pack", value: "cold_pack" },
            { label: "Others", value: "others" }
          ],
          showIf: {
            field: "objective_interventions",
            includes: "pain_management"
          }
        },
        {
  name: "hot_pack_remarks",
  label: "Hot Pack Remarks",
  type: "input",
  placeholder: "Enter hot pack remarks",
  showIf: {
    field: "pain_management_items",
    includes: "hot_pack"
  }
},
{
  name: "cold_pack_remarks",
  label: "Cold Pack Remarks",
  type: "input",
  placeholder: "Enter cold pack remarks",
  showIf: {
    field: "pain_management_items",
    includes: "cold_pack"
  }
},
        {
          name: "pain_management_others_remarks",
          label: "Other Pain Management Remarks",
          type: "input",
          showIf: {
            field: "pain_management_items",
            includes: "others"
          }
        },

        /* ───────────── Overall Others ───────────── */
        {
          name: "objective_others",
          label: "Others",
          type: "input",
          showIf: {
            field: "objective_interventions",
            includes: "others"
          }
        }
  

      ]
    },

    // =========================
    // THERAPEUTIC MODALITIES (FIXED AS SEPARATE SECTION)
    // =========================
    
  ]
};


const ASSESSMENT_SCHEMA = {
 
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [{
    fields: [
    
      { name: "assessment_notes", label: "Clinical Impression / Notes", type: "input", placeholder: "Therapist assessment..." },


      
    ],
  }],
};

const PLAN_SCHEMA = {
  
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [{
    fields: [
       { type: "subheading", label: "Short-Term Goals (2–4 weeks)" },
        {
            type: "dynamic-goals",
            name: "short_term_goals"
          },
          { type: "subheading", label: "Long-Term Goals (6–12 weeks)" },
          {
            type: "dynamic-goals",
            name: "long_term_goals"
          },  
           {
          name: "plan_items",
          label: "Plan",
          type: "checkbox-group",
          options: [
            {
              label: "Continue work hardening targeting / focusing on",
              value: "continue_work_hardening"
            },
            {
              label: "Continue assessment targeting / focusing on",
              value: "continue_fce_assessment"
            },
            {
              label: "Introduce work adaptation / modification strategies",
              value: "introduce_work_adaptation_modification"
            },
           
            {
              label: "Others",
              value: "others"
            }
          ]
        },

        {
          name: "continue_work_hardening_remarks",
          label: "Work Hardening Target / Focus",
          type: "input",
          placeholder: "Enter work hardening target / focus",
          showIf: {
            field: "plan_items",
            includes: "continue_work_hardening"
          }
        },

        {
          name: "continue_fce_assessment_remarks",
          label: "FCE Assessment Target / Focus",
          type: "input",
          placeholder: "Enter FCE assessment target / focus",
          showIf: {
            field: "plan_items",
            includes: "continue_fce_assessment"
          }
        },

        {
          name: "introduce_work_adaptation_modification_remarks",
          label: "Work Adaptation / Modification Strategies",
          type: "input",
          placeholder: "Enter strategies to introduce",
          showIf: {
            field: "plan_items",
            includes: "introduce_work_adaptation_modification"
          }
        },

        
        {
          name: "plan_other_details",
          label: "Other Plan Item",
          type: "input",
          placeholder: "Enter other plan item",
          showIf: {
            field: "plan_items",
            includes: "others"
          }
        },

        {
          name: "plan_other_remarks",
          label: "Other Plan Remarks",
          type: "input",
          placeholder: "Enter other plan details",
          showIf: {
            field: "plan_items",
            includes: "others"
          }
        }

    ],
  }],
};

const SOAP_TABS = [
  { key: "subjective",     label: "Subjective"     },
  { key: "objective", label: "Objective" },
  { key: "assessment",   label: "Assessment"   },
  { key: "plan",         label: "Plan"         },
];

const SCHEMA_MAP = {
  subjective:     SUBJECTIVE_SCHEMA,
  objective: OBJECTIVE_SCHEMA,
  assessment:   ASSESSMENT_SCHEMA,
  plan:         PLAN_SCHEMA,
};

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function WorkhareningProgress({ patient, onBack }) {
  const [values, setValues]       = useState({});
  const [activeTab, setActiveTab] = useState("subjective");
  const [submitted, setSubmitted] = useState(false);
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
        }, [patient]);

  const storageKey = patient ? `amputee_progress_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setValues(JSON.parse(saved).values || {});
  }, [storageKey]);
   useEffect(() => {
          if (!storageKey) return;
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            try {
              setValues(JSON.parse(saved).values || {});
            } catch {}
          }
        }, [storageKey]);

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      session_date: v.session_date || new Date().toISOString().split("T")[0],
    }));
  }, [patient]);

  const onChange = (name, value) => setValues(v => ({ ...v, [name]: value }));
const handleSubmit = () => {
    setSubmitted(true);
    console.log("Submitted:", values);
    alert("Assessment submitted");
  };

  const tabOrder = ["subjective", "objective", "assessment", "plan"];
  const activeTabIdx = tabOrder.indexOf(activeTab);
  // const handleAction = (type) => {
  //   if (type === "clear") setValues({});
  //   if (type === "save") {
  //     if (storageKey) localStorage.setItem(storageKey, JSON.stringify({ values, updatedAt: new Date() }));
  //     alert("Progress & Intervention saved.");
  //   }
  // };
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
    <div>
      {/* Patient Information */}
         <CommonFormBuilder
                schema={{ title: "Patient Information", sections: [] }}
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
              </CommonFormBuilder>
      

      {/* SOAP-style Tabs */}
      <div style={tabBar}>
        {SOAP_TABS.map(tab => (
          <div
            key={tab.key}
            style={activeTab === tab.key ? tabActive : tabBtn}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <CommonFormBuilder
        schema={SCHEMA_MAP[activeTab]}
        values={values}
        onChange={onChange}
        onAction={handleAction}
      />
      <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button style={submitBtn} onClick={() => setActiveTab(tabOrder[activeTabIdx + 1])}>
              Next
            </button>
          ) : (
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Assessment
            </button>
          )}
        </div>

    </div>
  );
}

/* ── Styles ── */
const tabBar    = { display: "flex", gap: 12, justifyContent: "center", borderBottom: "1px solid #ddd", marginBottom: 12 };
const tabBtn    = { padding: "10px 22px", fontWeight: 600, cursor: "pointer", color: "#0f172a" };
const tabActive = { ...tabBtn, borderBottom: "3px solid #2451b3", color: "#2451b3" };
const backBtn   = { marginTop: 10, padding: "8px 18px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", color: "#374151", fontWeight: 600, cursor: "pointer" };
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
const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 16
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer"
};