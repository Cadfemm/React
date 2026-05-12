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
  title: "Progress Note",
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [{
    fields: [
      { name: "complaint", label: "Cheif Complaint", type: "input", placeholder: "Therapist assessment..." },
      { name: "History of Present", label: "History of Present Illnes", type: "input" },
      
    ],
  }],
};
const OBJECTIVE_SCHEMA = {
  title: "Objective",
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
          name: "treatment_given",
          label: "Therapeutic Exercise ",
          type: "checkbox-group",
          options: [
            { label: "Therapeutic Exercise", value: "therapeutic_exercise" },
            { label: "Group Exercise", value: "group_exercise" },
            { label: "Water Specific Therapy", value: "water_specific_therapy" },
            { label: "Bad Ragaz", value: "bad_ragaz" },
            { label: "Ai-Chi", value: "ai_chi" },
            { label: "Halliwick", value: "halliwick" },
            { label: "Watsu", value: "watsu" },
            { label: "Others", value: "others" }
          ]
        },

        // =========================
        // THERAPEUTIC EXERCISE
        // =========================
        {
          type: "subheading",
          label: "Therapeutic Exercise",
          showIf: {
            field: "treatment_given",
            includes: "therapeutic_exercise"
          }
        },

        {
          name: "therapeutic_exercises",
          label: "Select Therapeutic Exercises",
          type: "checkbox-group",
          showIf: {
            field: "treatment_given",
            includes: "therapeutic_exercise"
          },
          options: [
            { label: "ROM exercise", value: "rom_exercise" },
            { label: "Strengthening exercise", value: "strengthening_exercise" },
            { label: "Warm-up / Aquatic Gait", value: "warmup_gait" },
            { label: "Resistance (Buoyancy)", value: "resistance_buoyancy" },
            { label: "Weight-bearing", value: "weight_bearing" },
            { label: "Balance & Stability", value: "balance_stability" },
            { label: "Stretching in water", value: "stretching_water" },
            { label: "Back exercise", value: "back_exercise" },
            { label: "Endurance training", value: "endurance_training" }
          ]
        },

        // ROM
        {
          name: "rom_type",
          label: "ROM Type",
          type: "radio",
          options: [
            { label: "Passive", value: "passive" },
            { label: "Active", value: "active" },
            { label: "Assisted", value: "assisted" }
          ],
          showIf: { field: "therapeutic_exercises", includes: "rom_exercise" }
        },
        { type: "row", showIf: { field: "therapeutic_exercises", includes: "rom_exercise" }, fields: [
          { name: "rom_remarks", label: "ROM Remarks", type: "input" },
        ]},

        // Strength
        {
          name: "strength_area",
          label: "Strengthening Area",
          type: "radio",
          options: [
            { label: "Upper Limb", value: "ul" },
            { label: "Lower Limb", value: "ll" }
          ],
          showIf: { field: "therapeutic_exercises", includes: "strengthening_exercise" }
        },
        { type: "row", showIf: { field: "therapeutic_exercises", includes: "strengthening_exercise" }, fields: [
          { name: "strength_remarks", label: "Strengthening Remarks", type: "input" },
        ]},

        // Gait
        {
          name: "gait_type",
          label: "Gait Training Type",
          type: "radio",
          options: [
            { label: "With BWS", value: "with_bws" },
            { label: "Without BWS", value: "without_bws" },
            { label: "Parallel Bar", value: "parallel_bar" }
          ],
          showIf: { field: "therapeutic_exercises", includes: "warmup_gait" }
        },
        { type: "row", showIf: { field: "therapeutic_exercises", includes: "warmup_gait" }, fields: [
          { name: "gait_remarks", label: "Gait Remarks", type: "input" },
        ]},

        // Other exercises
        { type: "row", showIf: { field: "therapeutic_exercises", includes: "resistance_buoyancy" }, fields: [
          { name: "resistance_remarks", label: "Resistance Remarks", type: "input" },
        ]},
        { type: "row", showIf: { field: "therapeutic_exercises", includes: "weight_bearing" }, fields: [
          { name: "weight_bearing_remarks", label: "Weight Bearing Remarks", type: "input" },
        ]},
        { type: "row", showIf: { field: "therapeutic_exercises", includes: "balance_stability" }, fields: [
          { name: "balance_remarks", label: "Balance Remarks", type: "input" },
        ]},
        { type: "row", showIf: { field: "therapeutic_exercises", includes: "stretching_water" }, fields: [
          { name: "stretching_remarks", label: "Stretching Remarks", type: "input" },
        ]},
        { type: "row", showIf: { field: "therapeutic_exercises", includes: "back_exercise" }, fields: [
          { name: "back_remarks", label: "Back Remarks", type: "input" },
        ]},
        { type: "row", showIf: { field: "therapeutic_exercises", includes: "endurance_training" }, fields: [
          { name: "endurance_remarks", label: "Endurance Remarks", type: "input" },
        ]},

        // Group + Water + Others
        { type: "row", showIf: { field: "treatment_given", includes: "group_exercise" }, fields: [
          { name: "group_exercise_remarks", label: "Group Exercise Remarks", type: "input" },
        ]},
        { type: "row", showIf: { field: "treatment_given", includes: "water_specific_therapy" }, fields: [
          { name: "water_specific_therapy_remarks", label: "Water Specific Therapy Remarks", type: "input" },
        ]},
        { type: "row", showIf: { field: "treatment_given", includes: "bad_ragaz" }, fields: [
          { name: "bad_ragaz_remarks", label: "Bad Ragaz Remarks", type: "input" },
        ]},
        { type: "row", showIf: { field: "treatment_given", includes: "ai_chi" }, fields: [
          { name: "ai_chi_remarks", label: "Ai-Chi Remarks", type: "input" },
        ]},
        { type: "row", showIf: { field: "treatment_given", includes: "halliwick" }, fields: [
          { name: "halliwick_remarks", label: "Halliwick Remarks", type: "input" },
        ]},
        { type: "row", showIf: { field: "treatment_given", includes: "watsu" }, fields: [
          { name: "watsu_remarks", label: "Watsu Remarks", type: "input" },
        ]},
        { type: "row", showIf: { field: "treatment_given", includes: "others" }, fields: [
          { name: "treatment_given_others", label: "Others", type: "input" },
        ]},
        
         
//          {
//           name: "hydropool_water_level",
//           label: "Hydropool Water Level",
//           type: "input",
//           showIf: { field: "therapeutic_modalities", includes: "hydropool" }
//         },

//         {
//           name: "infrared_programme",
//           label: "Infrared Programme",
//           type: "input",
//           showIf: { field: "therapeutic_modalities", includes: "infrared_sauna" }
//         },
//         {
//           name: "infrared_temp",
//           label: "Temperature",
//           type: "input",
//           showIf: { field: "therapeutic_modalities", includes: "infrared_sauna" }
//         },
//         {
//           name: "infrared_minutes",
//           label: "Minutes",
//           type: "input",
//           showIf: { field: "therapeutic_modalities", includes: "infrared_sauna" }
//         },
//         {
//           name: "infrared_remarks",
//           label: "Remarks",
//           type: "input",
//           showIf: { field: "therapeutic_modalities", includes: "infrared_sauna" }
//         },
//         {
//   name: "upper_whirlpool_minutes",
//   label: "Minutes",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "upper_whirlpool" }
// },
// {
//   name: "upper_whirlpool_temp",
//   label: "Temperature (°C)",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "upper_whirlpool" }
// },
// {
//   name: "upper_whirlpool_remarks",
//   label: "Remarks",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "upper_whirlpool" }
// },

// // =========================
// // LOWER LIMB WHIRLPOOL
// // =========================
// {
//   name: "lower_whirlpool_minutes",
//   label: "Minutes",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "lower_whirlpool" }
// },
// {
//   name: "lower_whirlpool_temp",
//   label: "Temperature (°C)",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "lower_whirlpool" }
// },
// {
//   name: "lower_whirlpool_remarks",
//   label: "Remarks",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "lower_whirlpool" }
// },

// // =========================
// // AQUATIC TREADMILL
// // =========================
// {
//   name: "aquatic_minutes",
//   label: "Minutes",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "aquatic_treadmill" }
// },
// {
//   name: "aquatic_speed",
//   label: "Speed",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "aquatic_treadmill" }
// },
// {
//   name: "aquatic_water_level",
//   label: "Water Level",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "aquatic_treadmill" }
// },
// {
//   name: "aquatic_remarks",
//   label: "Remarks",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "aquatic_treadmill" }
// },

// // =========================
// // BUTTERFLY BATH
// // =========================
// {
//   name: "butterfly_minutes",
//   label: "Minutes",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "butterfly_bath" }
// },
// {
//   name: "butterfly_temp",
//   label: "Temperature (°C)",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "butterfly_bath" }
// },
// {
//   name: "butterfly_remarks",
//   label: "Remarks",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "butterfly_bath" }
// },

// // =========================
// // UNDERWATER BICYCLE (EWAC)
// // =========================
// {
//   name: "underwater_bike_minutes",
//   label: "Minutes",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "underwater_bicycle" }
// },
// {
//   name: "underwater_bike_remarks",
//   label: "Remarks",
//   type: "input",
//   showIf: { field: "therapeutic_modalities", includes: "underwater_bicycle" }
// },

// =========================
// SELF-PROPELLED TREADMILL (EWAC)
// =========================

{
  name: "therapeutic_modalities",
  label: "Therapeutic Modalities",
  type: "checkbox-group",
  options: [
    { label: "Hydropool", value: "hydropool" },
    { label: "Infrared Sauna", value: "infrared_sauna" },
    { label: "Upper Limb Whirlpool", value: "upper_whirlpool" },
    { label: "Lower Limb Whirlpool", value: "lower_whirlpool" },
    { label: "Aquatic Treadmill", value: "aquatic_treadmill" },
    { label: "Butterfly Shape Hydrotherapy Bath", value: "butterfly_bath" },
    { label: "Underwater Bicycle (EWAC)", value: "underwater_bicycle" },
    { label: "Self-Propelled Treadmill (EWAC)", value: "self_treadmill" },
    { label: "Water Jet Massage", value: "water_jet_massage" },
    { label: "Others", value: "others" }
  ]
},

    

// =========================
// HYDROPOOL
// =========================
{ type: "row", showIf: { field: "therapeutic_modalities", includes: "hydropool" }, fields: [
  { name: "hydropool_water_level", label: "Water Level (meters)", type: "input" },
]},

// =========================
// INFRARED SAUNA
// =========================
{
  type: "row",
  showIf: { field: "therapeutic_modalities", includes: "infrared_sauna" },
  fields: [
    {
      name: "infrared_programme",
      label: "Programme",
      type: "input"
    },
    {
      name: "infrared_temp",
      label: "Temperature",
      type: "input"
    },
    {
      name: "infrared_minutes",
      label: "Minutes",
      type: "input"
    },
    {
      name: "infrared_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},

// =========================
// UPPER LIMB WHIRLPOOL
// =========================
{
  type: "row",
  showIf: { field: "therapeutic_modalities", includes: "upper_whirlpool" },
  fields: [
    {
      name: "upper_whirlpool_minutes",
      label: "Minutes",
      type: "input"
    },
    {
      name: "upper_whirlpool_temp",
      label: "Temperature",
      type: "input"
    },
    {
      name: "upper_whirlpool_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},

// =========================
// LOWER LIMB WHIRLPOOL
// =========================
{
  type: "row",
  showIf: { field: "therapeutic_modalities", includes: "lower_whirlpool" },
  fields: [
    {
      name: "lower_whirlpool_minutes",
      label: "Minutes",
      type: "input"
    },
    {
      name: "lower_whirlpool_temp",
      label: "Temperature",
      type: "input"
    },
    {
      name: "lower_whirlpool_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},

// =========================
// AQUATIC TREADMILL
// =========================
{
  type: "row",
  showIf: { field: "therapeutic_modalities", includes: "aquatic_treadmill" },
  fields: [
    {
      name: "aquatic_minutes",
      label: "Minutes",
      type: "input"
    },
    {
      name: "aquatic_speed",
      label: "Speed",
      type: "input"
    },
    {
      name: "aquatic_water_level",
      label: "Water Level",
      type: "input"
    },
    {
      name: "aquatic_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},

// =========================
// BUTTERFLY BATH
// =========================
{
  type: "row",
  showIf: { field: "therapeutic_modalities", includes: "butterfly_bath" },
  fields: [
    {
      name: "butterfly_minutes",
      label: "Minutes",
      type: "input"
    },
    {
      name: "butterfly_temp",
      label: "Temperature",
      type: "input"
    },
    {
      name: "butterfly_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},


{
  type: "row",
  showIf: { field: "therapeutic_modalities", includes: "underwater_bicycle" },
  fields: [
    {
      name: "underwater_bike_minutes",
      label: "Minutes",
      type: "input"
    },
    {
      name: "underwater_bike_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},
{
  type: "row",
  showIf: { field: "therapeutic_modalities", includes: "self_treadmill" },
  fields: [
    {
      name: "self_treadmill_minutes",
      label: "Minutes",
      type: "input"
    },
    {
      name: "self_treadmill_remarks",
      label: "Remarks",
      type: "input"
    }
  ]
},
// =========================
// WATER JET MASSAGE
// =========================
{
  name: "waterjet_intensity",
  label: "Intensity",
  type: "radio",
  options: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" }
  ],
  showIf: { field: "therapeutic_modalities", includes: "water_jet_massage" }
},
{ type: "row", showIf: { field: "therapeutic_modalities", includes: "water_jet_massage" }, fields: [
  { name: "waterjet_remarks", label: "Remarks", type: "input" },
]},

{ type: "row", showIf: { field: "therapeutic_modalities", includes: "others" }, fields: [
  { name: "modalities_others", label: "Others", type: "input" },
]},
{
  name: "pain_management",
  label: "Pain Management",
  type: "checkbox-group",
  options: [
    { label: "Heat Therapy", value: "heat_therapy" }
  ]
},

{ type: "row", showIf: { field: "pain_management", includes: "heat_therapy" }, fields: [
  { name: "heat_therapy_remarks", label: "Heat Therapy Remarks", type: "input" },
]},
  

      ]
    },

    // =========================
    // THERAPEUTIC MODALITIES (FIXED AS SEPARATE SECTION)
    // =========================
    
  ]
};


const ASSESSMENT_SCHEMA = {
  title: "Assessment & Response",
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
  title: "Plan",
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
  name: "plan_therapist_notes",
  label: "Therapist Notes",
  type: "checkbox-group",
  options: [
    { label: "Continue exercise program", value: "continue_exercise_program" },
    { label: "Improve strength", value: "improve_strength" },
    { label: "Increase ROM", value: "increase_rom" },
    { label: "Improve balance", value: "improve_balance" },
    { label: "Progress gait training", value: "progress_gait_training" },
    { label: "Improve endurance", value: "improve_endurance" },
    { label: "Improve postural and core control", value: "improve_postural_core_control" },
    { label: "Improve water confidence", value: "improve_water_confidence" },
    { label: "Improve swimming modification", value: "improve_swimming_modification" },
    { label: "Progress with specialized aquatic therapy program", value: "aquatic_therapy_progress" },
    { label: "Requires ongoing supervision for safety", value: "requires_supervision" },
    { label: "Monitor vital signs during exercise", value: "monitor_vitals" },
    { label: "Patient education", value: "patient_education" },
    { label: "Others", value: "others" }
  ]
},

{
  name: "plan_therapist_notes_others",
  label: "Others (Specify)",
  type: "input",
  showIf: {
    field: "plan_therapist_notes",
    includes: "others"
  }
},

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
export default function HydroProgress({ patient, onBack }) {
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