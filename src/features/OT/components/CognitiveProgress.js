
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
      {
  name: "complaints_pain_fatigue_stress",
  label: "Any Complaints (Pain/Fatigue/Stress)",
  type: "input",
  rows: 3,
  placeholder: "Enter complaints"
},
      // { name: "complaint", label: "Cheif Complaint", type: "input", placeholder: "Therapist assessment..." },
      { name: "History of Present", label: "History of Present Illnes", type: "input" },
      /* ===================== OBSERVATION ===================== */

{
  name: "appearance_mood",
  label: "Observation: Appearance/Mood",
  type: "input",
  rows: 3,
  placeholder: "Enter appearance and mood"
},
{
  name: "client_carer_report",
  label: "Client / Carer Report Of",
  type: "input",
  rows: 3,
  placeholder: "Enter client/carer report"
},
{
  name: "concern_to",
  label: "Concern To",
  type: "input",
  rows: 3,
  placeholder: "Enter concerns"
},
// {
//   name: "complaints_pain_fatigue_stress",
//   label: "Any Complaints (Pain/Fatigue/Stress)",
//   type: "input",
//   rows: 3,
//   placeholder: "Enter complaints"
// },
{
  name: "new_finding_issue_related",
  label: "New Finding / Issue Related",
  type: "input",
  rows: 3,
  placeholder: "Enter new findings or issues"
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
     
      fields: [


// =========================
// THERAPEUTIC EXERCISES
// =========================
{
  type: "subheading",
  label: "Addressed Cognitive issue & targeted"
},

/* ===================== COGNITIVE FUNCTIONS ===================== */

{
  name: "cognitive_functions",
  label: "Cognitive Functions",
  type: "checkbox-group",
  options: [
    {
      label: "Attention",
      value: "attention"
    },
    {
      label: "Concentration",
      value: "concentration"
    },
    {
      label: "Orientation",
      value: "orientation"
    },
    {
      label: "Memory Function",
      value: "memory_function"
    },
    {
      label: "Visual Perception",
      value: "visual_perception"
    },
    {
      label: "Constructional Ability",
      value: "constructional_ability"
    },
    {
      label: "Comprehension Ability",
      value: "comprehension_ability"
    },
    {
      label: "Executive Functioning",
      value: "executive_functioning"
    },
    {
      label: "Information Processing Ability & Speed",
      value: "information_processing_ability_speed"
    },
    {
      label: "Other",
      value: "other"
    }
  ]
},
{
  name: "cognitive_functions_other",
  label: "Other Cognitive Function",
  type: "input",
  placeholder: "Specify other cognitive function",
  showIf: {
    field: "cognitive_functions",
    includes: "other"
  }
},
/* ===================== COGNITIVE INTERVENTIONS USED ===================== */
         { type: "subheading", label: "Interventions Used" },

{
  name: "cognitive_interventions_used",
  
  type: "checkbox-group",
  options: [
    {
      label: "Reality Orientation to Place, Time, and People",
      value: "reality_orientation"
    },
    {
      label: "Attention and Concentration Training",
      value: "attention_concentration_training"
    },
    {
      label: "Memory Restorative/Retraining and Compensatory Strategies Training",
      value: "memory_restorative_training"
    },
    {
      label: "Sensory Stimulation",
      value: "sensory_stimulation"
    },
    {
      label: "Higher Cognitive / Executive Function Training",
      value: "higher_cognitive_executive_function_training"
    },
    {
      label: "Communication / Social Techniques",
      value: "communication_social_techniques"
    },
    {
      label: "Cognitive Group Therapy",
      value: "cognitive_group_therapy"
    },
    {
      label: "Cognitive Remediation Therapy (CRT)",
      value: "cognitive_remediation_therapy"
    },
    {
      label: "Visuospatial & Constructional Skills Training",
      value: "visuospatial_constructional_skills_training"
    },
    {
      label: "Visual Perception Skills Training",
      value: "visual_perception_skills_training"
    },
    {
      label: "Visual Scanning",
      value: "visual_scanning"
    },
    {
      label: "Praxis Skills Training",
      value: "praxis_skills_training"
    },
    {
      label: "Functional Cognitive Training",
      value: "functional_cognitive_training"
    },
    {
      label: "Activities of Daily Living (ADL) Training",
      value: "adl_training"
    },
    {
      label: "Instrumental Activities of Daily Living (IADL) Training",
      value: "iadl_training"
    },
    {
      label: "Carer and Patient Education & Training",
      value: "carer_patient_education_training"
    },
    {
      label: "Home Program",
      value: "home_program"
    },
    {
      label: "Others",
      value: "others"
    }
  ]
},

/* ===================== FREE TEXT FIELDS ===================== */

{
  name: "functional_cognitive_training_details",
  label: "Functional Cognitive Training",
  type: "input",
  rows: 3,
  placeholder: "Enter details",
  showIf: {
    field: "cognitive_interventions_used",
    includes: "functional_cognitive_training"
  }
},
{
  name: "adl_training_details",
  label: "Activities of Daily Living (ADL) Training",
  type: "input",
  rows: 3,
  placeholder: "Enter details",
  showIf: {
    field: "cognitive_interventions_used",
    includes: "adl_training"
  }
},
{
  name: "iadl_training_details",
  label: "Instrumental Activities of Daily Living (IADL) Training",
  type: "input",
  rows: 3,
  placeholder: "Enter details",
  showIf: {
    field: "cognitive_interventions_used",
    includes: "iadl_training"
  }
},
{
  name: "others_details",
  label: "Others",
  type: "input",
  rows: 3,
  placeholder: "Specify other interventions",
  showIf: {
    field: "cognitive_interventions_used",
    includes: "others"
  }
},
 { type: "subheading", label: "Modalities used" },
        /* ===================== MODALITIES USED ===================== */

{
  name: "modalities_used",
  
  type: "checkbox-group",
  options: [
    {
      label: "Eyas Digital Cognitive Training System",
      value: "eyas_digital_cognitive_training_system"
    },
    {
      label: "Vienna Test System",
      value: "vienna_test_system"
    },
    {
      label: "Rehacom",
      value: "rehacom"
    },
    {
      label: "Neofect Smart Pegboard",
      value: "neofect_smart_pegboard"
    },
    {
      label: "Grolier Cognitive Training Set",
      value: "grolier_cognitive_training_set"
    },
    {
      label: "Multi-sensory / Snoezelen Room",
      value: "multi_sensory_snoezelen_room"
    },
    {
      label: "Brain Training Game Apps",
      value: "brain_training_game_apps"
    },
    {
      label: "General Puzzle, Card Games & Board Games",
      value: "general_puzzle_card_games_board_games"
    },
    {
      label: "Paper-and-Pencil",
      value: "paper_and_pencil"
    },
    {
      label: "Pegboards Sets",
      value: "pegboards_sets"
    },
    {
      label: "Block Sets",
      value: "block_sets"
    },
    {
      label: "Puzzles Sets",
      value: "puzzles_sets"
    }
  ]
},

/* ===================== CONDITIONAL FREE TEXT FIELDS ===================== */

{
  name: "brain_training_game_apps_details",
  label: "Brain Training Game Apps",
  type: "input",
  rows: 3,
  placeholder: "Enter app names or details",
  showIf: {
    field: "modalities_used",
    includes: "brain_training_game_apps"
  }
},
{
  name: "general_puzzle_card_games_board_games_details",
  label: "General Puzzle, Card Games & Board Games",
  type: "input",
  rows: 3,
  placeholder: "Enter details",
  showIf: {
    field: "modalities_used",
    includes: "general_puzzle_card_games_board_games"
  }
},
{
  name: "paper_and_pencil_details",
  label: "Paper-and-Pencil",
  type: "input",
  rows: 3,
  placeholder: "Enter details",
  showIf: {
    field: "modalities_used",
    includes: "paper_and_pencil"
  }
},
 { type: "subheading", label: "Performance measures" },
 /* ===================== PERFORMANCE MEASURES ===================== */

{
  name: "performance_measures",
 
  type: "checkbox-group",
  options: [
    {
      label: "Task Complexity",
      value: "task_complexity"
    },
    {
      label: "Level of Cueing",
      value: "level_of_cueing"
    },
    {
      label: "Task Completion Time / Response Time / Endurance",
      value: "task_completion_time"
    },
    {
      label: "Completed Task / Accuracy (%)",
      value: "completed_task_accuracy"
    }
  ]
},

/* ===================== TASK COMPLEXITY ===================== */
{
  name: "task_complexity",
  label: "Task Complexity",
  type: "radio",
  options: [
    { label: "Simple", value: "simple" },
    { label: "Moderate", value: "moderate" },
    { label: "Complex", value: "complex" }
  ],
  showIf: {
    field: "performance_measures",
    includes: "task_complexity"
  }
},

/* ===================== LEVEL OF CUEING ===================== */
{
  name: "level_of_cueing",
  label: "Level of Cueing",
  type: "radio",
  options: [
    { label: "Independent", value: "independent" },
    { label: "Minimum", value: "minimum" },
    { label: "Moderate", value: "moderate" },
    { label: "Maximum", value: "maximum" }
  ],
  showIf: {
    field: "performance_measures",
    includes: "level_of_cueing"
  }
},

/* ===================== TASK COMPLETION TIME / RESPONSE TIME / ENDURANCE ===================== */
{
  name: "task_completion_time_details",
  label: "Task Completion Time / Response Time / Endurance",
  type: "input",
  rows: 3,
  placeholder: "Enter details",
  showIf: {
    field: "performance_measures",
    includes: "task_completion_time"
  }
},

/* ===================== COMPLETED TASK / ACCURACY (%) ===================== */
{
  name: "completed_task_accuracy",
  label: "Completed Task / Accuracy (%)",
  type: "input",
  placeholder: "Enter accuracy percentage",
  showIf: {
    field: "performance_measures",
    includes: "completed_task_accuracy"
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

/* ===================== CLIENT RESPONSE / PROGRESS ===================== */

{
  name: "client_cognitive_progress",
  label: "Client Demonstrates",
  type: "radio",
  options: [
    {
      label: "Improvement",
      value: "improvement"
    },
    {
      label: "No Change",
      value: "no_change"
    },
    {
      label: "Decline",
      value: "decline"
    }
  ]
},

{
  name: "strengths_client_benefited",
  label: "Strength / Client Benefited (Increased Independence) Using",
  type: "input",
  rows: 3,
  placeholder: "Enter strengths and strategies that improved independence"
},

{
  name: "barriers_to_performance",
  label: "Barriers to Performance / Areas of Difficulty",
  type: "input",
  rows: 3,
  placeholder: "Enter barriers or areas of difficulty"
},

{
  name: "overall_client_response_feedback",
  label: "Overall Client Response, Impression or Feedback to Strategies",
  type: "input",
  rows: 3,
  placeholder: "Enter client's response, impression, or feedback"
}
      
    ],
  }],
};
const PLAN_SCHEMA = {

actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  sections: [
    {
      title: "Therapist Notes",
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
        // =========================
        // THERAPIST NOTES
        // =========================
       /* ===================== COGNITIVE REHABILITATION PLAN ===================== */

{
  name: "continue_cognitive_rehabilitation_focus",
  label: "Continue Cognitive Rehabilitation Targeting / Focus On",
  type: "input",
  rows: 3,
  placeholder: "Enter targeted domains or focus areas"
},

{
  name: "modify_interventions_by",
  label: "Modify Interventions By",
  type: "input",
  rows: 3,
  placeholder: "Enter modifications to interventions"
},

{
  name: "compensatory_strategies",
  label: "Introduce / Continue Compensatory Strategies",
  type: "input",
  rows: 3,
  placeholder: "Enter compensatory strategies"
},

{
  name: "frequency_duration",
  label: "Frequency / Duration",
  type: "input",
  rows: 3,
  placeholder: "Enter treatment frequency and duration"
},

{
  name: "home_exercise_program",
  label: "Home Exercise Program / Carryover Activities Assigned",
  type: "input",
  rows: 3,
  placeholder: "Enter home exercise program or carryover activities"
},


        
      ]
    }
  ]
};



const SOAP_TABS = [
  { key: "subjective",    label: "Subjective"    },
  { key: "objective",     label: "Objective"     },
 
  { key: "assessment",    label: "Assessment"    },
  { key: "plan",          label: "Plan"          },
];

const SCHEMA_MAP = {
  subjective:   SUBJECTIVE_SCHEMA,
  objective:    OBJECTIVE_SCHEMA,
 
  assessment:   ASSESSMENT_SCHEMA,
  plan:         PLAN_SCHEMA,
};

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function Cognitiveprogress({ patient, onBack }) {
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