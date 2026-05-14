
import { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PatientCard from "../../../shared/cards/PatientCard";

const ACTIONS = [
  { type: "clear", label: "Clear" },
  { type: "save",  label: "Save"  },
];

const DIFFICULTY = [
  { label: "Easy",   value: "easy"   },
  { label: "Medium", value: "medium" },
  { label: "Hard",   value: "hard"   },
];

const WEATHER = [
  { label: "Sunny",        value: "sunny"       },
  { label: "Overcast",     value: "overcast"    },
  { label: "Foggy",        value: "foggy"       },
  { label: "Rain",         value: "rain"        },
  { label: "Thunderstorm", value: "thunderstorm"},
  { label: "Snow",         value: "snow"        },
  { label: "Blizzard",     value: "blizzard"    },
  { label: "Sanddust",     value: "sanddust"    },
];

/* ── helper: scenario sub-fields (duration + difficulty + optional extras + remarks) ── */
function sf(prefix, { weather = false, coins = false } = {}) {
  const fields = [
    { name: `${prefix}_duration`,   label: "Duration (min)",   type: "input",         placeholder: "e.g. 10" },
    { name: `${prefix}_difficulty`, label: "Difficulty Level", type: "single-select", options: DIFFICULTY    },
  ];
  if (coins)   fields.push({ name: `${prefix}_coins`,   label: "Coins Collected",  type: "input",         placeholder: "e.g. 5" });
  if (weather) fields.push({ name: `${prefix}_weather`, label: "Weather Selected", type: "single-select", options: WEATHER });
  fields.push({ name: `${prefix}_remarks`, label: "Remarks", type: "input", placeholder: "Free text..." });
  return fields;
}

/* ══════════════════════════════════════════════════════════
   SCHEMAS
══════════════════════════════════════════════════════════ */

const INDICATION_SCHEMA = {
  title: "MetaMotus™ Galileo — Initial Assessment",
  sections: [{
    title: "Indication Category (tick which is applicable)",
    fields: [{
      name: "indication_category",
      label: "",
      type: "checkbox-group",
      options: [
        { label: "Musculoskeletal",           value: "musculoskeletal" },
        { label: "Neurological",              value: "neurological"    },
        { label: "Amputation",                value: "amputation"      },
        { label: "Spinal Cord Injury",        value: "sci"             },
        { label: "Psychological / Cognitive", value: "psych_cog"       },
      ],
    }],
  }],
};

const SUBJECTIVE_SCHEMA = {
  // title: "Subjective",
  // actions: ACTIONS,
   actions: [
    { type: "back",  label: "Back"  },
    { type: "clear", label: "Clear" },
    { type: "save",  label: "Save"  }
  ],
  sections: [{
    fields: [
      { type: "subheading", label: "Chief Complaint" },
      { name: "chief_complaint", label: "", type: "input", placeholder: "Free text..." },

      {
            name: "hpi",
            label: "History of Presenting Illness (HPI)",
            type: "input"
          },
      { type: "subheading", label: "Pain Assessment" },
      {
        name: "vas_score",
        label: "VAS Score (≤5 required)",
        type: "scale-slider",
        min: 0, max: 10, step: 1,
        ranges: [
          { from: 0, to: 2,  color: "#22c55e", label: "No Pain"    },
          { from: 3, to: 4,  color: "#84cc16", label: "Mild"       },
          { from: 5, to: 5,  color: "#f59e0b", label: "Moderate"   },
          { from: 6, to: 8,  color: "#f97316", label: "Severe"     },
          { from: 9, to: 10, color: "#ef4444", label: "Worst Pain" },
        ],
      },
      { name: "pain_remarks", label: "Pain Remarks", type: "input", placeholder: "Free text..." },

      { type: "subheading", label: "Functional Limitations" },
      {
        name: "walking_tolerance",
        label: "Walking Tolerance",
        type: "radio",
        
        options: [
          { label: "≥10 minutes", value: "gte10" },
          { label: "<10 minutes", value: "lt10"  },
        ],
      },
      {
        name: "assistive_devices",
        label: "Assistive Devices",
        type: "checkbox-group",
        options: [
          { label: "None",              value: "none"             },
          { label: "Walking stick",     value: "walking_stick"    },
          { label: "Elbow crutches",    value: "elbow_crutches"   },
          { label: "Axillary crutches", value: "axillary_crutches"},
          { label: "Others",            value: "others"           },
        ],
      },
      {
        name: "assistive_others",
        label: "Specify Others",
        type: "input",
        placeholder: "Specify...",
        showIf: { field: "assistive_devices", includes: "others" },
      },

      // { type: "subheading", label: " Vital Signs" },
      // {
      //   type: "row",
      //   fields: [
      //     { name: "bp_systolic",  label: "BP Systolic (mmHg)",  type: "input", placeholder: "120"  },
      //     { name: "bp_diastolic", label: "BP Diastolic (mmHg)", type: "input", placeholder: "80"   },
      //     { name: "heart_rate",   label: "Heart Rate (bpm)",    type: "input", placeholder: "72"   },
      //     { name: "temperature",  label: "Temperature (°C)",    type: "input", placeholder: "36.5" },
      //     { name: "spo2",         label: "SpO₂ (%)",            type: "input", placeholder: "98"   },
      //   ],
      // },

      { type: "subheading", label: "Safety / Hygiene Checks" },
      {
        name: "safety_checks",
        label: "",
        type: "checkbox-group",
        options: [
          { label: "Hx of seizure",                          value: "seizure"     },
          { label: "Unstable fracture",                      value: "fracture"    },
          { label: "Moderate / severe cognitive impairment", value: "cognitive"   },
          { label: "Skin issue (wound, dry skin)",           value: "skin"        },
          { label: "Incontinence",                           value: "incontinence"},
        ],
      },
    ],
  }],
};

const OBJECTIVE_SCHEMA = {
  // title: "O – Objective",
  // actions: ACTIONS,
   actions: [
    { type: "back",  label: "Back"  },
    { type: "clear", label: "Clear" },
    { type: "save",  label: "Save"  }
  ],
  sections: [{
    fields: [
      /* 1. Motion Sickness */
      { type: "subheading", label: "Motion Sickness Screening (1-minute screen exposure)" },
      {
        name: "motion_sickness",
        label: "Result",
        type: "radio",
       
        options: [
          { label: "Pass", value: "pass" },
          { label: "Fail", value: "fail" },
        ],
      },

      /* 2. Basic Functional Screening */
      { type: "subheading", label: "Basic Functional Screening" },
      {
        name: "standing_ability",
        label: "Standing Ability",
        type: "radio",
        
        options: [
          { label: "Independent",     value: "independent"     },
          { label: "With assistance", value: "with_assistance" },
          { label: "Unable",          value: "unable"          },
        ],
      },
      {
        name: "balance",
        label: "Balance",
        type: "radio",
       
        options: [
          { label: "Stable",           value: "stable"           },
          { label: "Mild instability", value: "mild_instability" },
          { label: "High fall risk",   value: "high_fall_risk"   },
        ],
      },

      /* 3. Scenario Test */
      { type: "subheading", label: "Scenario Test" },
      {
        name: "scenario_types",
        label: "Select applicable scenarios",
        type: "checkbox-group",
        options: [
          { label: "Static standing (Transportation scenario)",  value: "static"       },
          { label: "Dynamic standing (Transportation scenario)", value: "dynamic"      },
          { label: "Walking",                                    value: "walking"      },
          { label: "Slope / Stairs",                             value: "slope"        },
          { label: "Cognitive",                                  value: "cognitive"    },
          { label: "Psychological",                              value: "psychological"},
        ],
      },

      /* ── Static standing ── */
      { type: "subheading", label: "Static — a. Bus",    showIf: { field: "scenario_types", includes: "static" } },
      ...sf("bus").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "static" } })),
      { type: "subheading", label: "Static — b. Train",  showIf: { field: "scenario_types", includes: "static" } },
      ...sf("train").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "static" } })),
      { type: "subheading", label: "Static — c. Others", showIf: { field: "scenario_types", includes: "static" } },
      ...sf("static_others").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "static" } })),

      /* ── Dynamic standing ── */
      { type: "subheading", label: "Dynamic — a. Rowboat",      showIf: { field: "scenario_types", includes: "dynamic" } },
      ...sf("rowboat").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "dynamic" } })),
      { type: "subheading", label: "Dynamic — b. Balance Boat", showIf: { field: "scenario_types", includes: "dynamic" } },
      ...sf("balance_boat", { weather: true, coins: true }).map(f => ({ ...f, showIf: { field: "scenario_types", includes: "dynamic" } })),
      { type: "subheading", label: "Dynamic — c. Others",       showIf: { field: "scenario_types", includes: "dynamic" } },
      ...sf("dynamic_others").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "dynamic" } })),

      /* ── Walking ── */
      { type: "subheading", label: "Walking — a. Chinatown",    showIf: { field: "scenario_types", includes: "walking" } },
      ...sf("chinatown").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "walking" } })),
      { type: "subheading", label: "Walking — b. Park 1",       showIf: { field: "scenario_types", includes: "walking" } },
      ...sf("park1").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "walking" } })),
      { type: "subheading", label: "Walking — c. KLCC Park 1",  showIf: { field: "scenario_types", includes: "walking" } },
      ...sf("klcc_park1").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "walking" } })),
      { type: "subheading", label: "Walking — d. Century Park", showIf: { field: "scenario_types", includes: "walking" } },
      ...sf("century_park").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "walking" } })),
      { type: "subheading", label: "Walking — e. Lian Temple",  showIf: { field: "scenario_types", includes: "walking" } },
      ...sf("lian_temple", { weather: true, coins: true }).map(f => ({ ...f, showIf: { field: "scenario_types", includes: "walking" } })),
      { type: "subheading", label: "Walking — f. Others",       showIf: { field: "scenario_types", includes: "walking" } },
      ...sf("walking_others").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "walking" } })),

      /* ── Slope / Stairs ── */
      { type: "subheading", label: "Slope — a. Fountain",           showIf: { field: "scenario_types", includes: "slope" } },
      ...sf("fountain").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "slope" } })),
      { type: "subheading", label: "Slope — b. Food Market",        showIf: { field: "scenario_types", includes: "slope" } },
      ...sf("food_market").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "slope" } })),
      { type: "subheading", label: "Slope — c. Wild Adventure",     showIf: { field: "scenario_types", includes: "slope" } },
      ...sf("wild_adventure").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "slope" } })),
      { type: "subheading", label: "Slope — d. Outdoor Track",      showIf: { field: "scenario_types", includes: "slope" } },
      ...sf("outdoor_track").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "slope" } })),
      { type: "subheading", label: "Slope — e. Lian Temple Climb",  showIf: { field: "scenario_types", includes: "slope" } },
      ...sf("lian_temple_climb", { weather: true }).map(f => ({ ...f, showIf: { field: "scenario_types", includes: "slope" } })),
      { type: "subheading", label: "Slope — f. Others",             showIf: { field: "scenario_types", includes: "slope" } },
      ...sf("slope_others").map(f => ({ ...f, showIf: { field: "scenario_types", includes: "slope" } })),

      /* ── Cognitive ── */
      { type: "subheading", label: "Cognitive — a. Grocery",     showIf: { field: "scenario_types", includes: "cognitive" } },
      { name: "cognitive_grocery",     label: "Remarks", type: "input", placeholder: "Free text...", showIf: { field: "scenario_types", includes: "cognitive" } },
      { type: "subheading", label: "Cognitive — b. Food Market", showIf: { field: "scenario_types", includes: "cognitive" } },
      { name: "cognitive_food_market", label: "Remarks", type: "input", placeholder: "Free text...", showIf: { field: "scenario_types", includes: "cognitive" } },

      /* ── Psychological ── */
      { type: "subheading", label: "Psychological — a. Glass Trestle", showIf: { field: "scenario_types", includes: "psychological" } },
      { name: "psych_glass_trestle", label: "Remarks", type: "input", placeholder: "Free text...", showIf: { field: "scenario_types", includes: "psychological" } },
      { type: "subheading", label: "Psychological — b. Earthquake",    showIf: { field: "scenario_types", includes: "psychological" } },
      { name: "psych_earthquake",    label: "Remarks", type: "input", placeholder: "Free text...", showIf: { field: "scenario_types", includes: "psychological" } },

      /* 4. Galileo Report */
      { type: "subheading", label: "4. MetaMotus Galileo Evaluation Report" },
      { name: "gait_pdf",     label: "Upload Gait Parameter PDF", type: "file-upload" },
      { name: "gait_remarks", label: "Remarks",                   type: "input",   placeholder: "Free text..." },
    { type: "subheading", label: " Vital Signs" },
      {
        type: "row",
        fields: [
          { name: "bp_systolic",  label: "BP Systolic (mmHg)",  type: "input", placeholder: "120"  },
          { name: "bp_diastolic", label: "BP Diastolic (mmHg)", type: "input", placeholder: "80"   },
          { name: "heart_rate",   label: "Heart Rate (bpm)",    type: "input", placeholder: "72"   },
          { name: "temperature",  label: "Temperature (°C)",    type: "input", placeholder: "36.5" },
          { name: "spo2",         label: "SpO₂ (%)",            type: "input", placeholder: "98"   },
        ],
      },

    ],
    
  }],
};

const ASSESSMENT_SCHEMA = {
  // title: "A – Analysis",
  // actions: ACTIONS,
   actions: [
    { type: "back",  label: "Back"  },
    { type: "clear", label: "Clear" },
    { type: "save",  label: "Save"  }
  ],
  sections: [{
    fields: [
      {
        name: "suitability",
        label: "Suitability",
        type: "radio",
       
        options: [
          { label: "Suitable",                            value: "suitable"        },
          { label: "Suitable with adaptation/assistance", value: "suitable_adapted"},
          { label: "Not suitable",                        value: "not_suitable"    },
        ],
      },
      { type: "subheading", label: "Problem Identifications" },
      {
        name: "problems",
        label: "",
        type: "checkbox-group",
        options: [
          { label: "Balance",                                                              value: "balance"       },
          { label: "Core stability",                                                       value: "core_stability"},
          { label: "Gait & walking",                                                       value: "gait"          },
          { label: "Weight distribution",                                                  value: "weight_dist"   },
          { label: "Coordination",                                                         value: "coordination"  },
          { label: "Perturbation",                                                         value: "perturbation"  },
          { label: "Righting Reaction",                                                    value: "righting"      },
          { label: "Reaction Time",                                                        value: "reaction_time" },
          { label: "Strength",                                                             value: "strength"      },
          { label: "Endurance",                                                            value: "endurance"     },
          { label: "ROM and flexibility",                                                  value: "rom"           },
          { label: "Cognitive deficits (attention / concentration / following instructions)", value: "cognitive"  },
          { label: "Psychological issues (fear, anxiety, hypersensitive, PTSD)",           value: "psychological" },
          { label: "Others",                                                               value: "others"        },
        ],
      },
      {
        name: "problems_others",
        label: "Specify Others",
        type: "input",
        placeholder: "Describe...",
        showIf: { field: "problems", includes: "others" },
      },
      { type: "subheading", label: "Clinical Reasoning" },
      { name: "clinical_reasoning", label: "", type: "input", placeholder: "Free text..." },
    ],
  }],
};

const PLAN_SCHEMA = {
  // title: "P/I – Plan & Intervention",
  // actions: ACTIONS,
   actions: [
    { type: "back",  label: "Back"  },
    { type: "clear", label: "Clear" },
    { type: "save",  label: "Save"  }
  ],
  sections: [{
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
      { type: "subheading", label: "Training Components" },
      {
        name: "training_components",
        label: "",
        type: "checkbox-group",
        options: [
          { label: "Balance Training",       value: "balance"       },
          { label: "Gait Training",          value: "gait"          },
          { label: "Endurance Training",     value: "endurance"     },
          { label: "Cognitive Training",     value: "cognitive"     },
          { label: "ADL Training",           value: "adl"           },
          { label: "Psychological Training", value: "psychological" },
        ],
      },
      { type: "subheading", label: "Initial Setup" },
      {
        name: "harness",
        label: "Harness",
        type: "radio",
     
        options: [
          { label: "Yes", value: "yes" },
          { label: "No",  value: "no"  },
        ],
      },
      {
        name: "support_level",
        label: "Support Level",
        type: "radio",
       
        options: [
          { label: "Full",    value: "full"    },
          { label: "Partial", value: "partial" },
          { label: "Minimal", value: "minimal" },
        ],
      },
      { name: "session_duration", label: "Session Duration", type: "input", placeholder: "e.g. 30 minutes" },
      { type: "subheading", label: "Post-Session Evaluation" },
      {
        name: "post_session",
        label: "Post session",
        type: "radio",
        
        options: [
          { label: "No adverse effects", value: "no_adverse" },
          { label: "Adverse effects",    value: "adverse"    },
        ],
      },
      {
        name: "adverse_details",
        label: "Describe Adverse Effects",
        type: "input",
        placeholder: "Free text...",
        showIf: { field: "post_session", equals: "adverse" },
      },
    ],
  }],
};

const SOAP_TABS = [
  { key: "subjective", label: "Subjective"            },
  { key: "objective",  label: "Objective"             },
  { key: "assessment", label: "Assessment"              },
  { key: "plan",       label: "Plan" },
];

const SCHEMA_MAP = {
  subjective: SUBJECTIVE_SCHEMA,
  objective:  OBJECTIVE_SCHEMA,
  assessment: ASSESSMENT_SCHEMA,
  plan:       PLAN_SCHEMA,
};

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function MetaMotusGalileoAssessment({ patient,onBack }) {
  const [values, setValues]       = useState({});
  const [activeTab, setActiveTab] = useState("subjective");
  const [submitted, setSubmitted] = useState(false);
  

  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: "",
    past_family_history:  "",
    alerts_and_allergies: "",
  });
  const storageKey = patient
    ? `Metamotus_assessment_draft_${patient.id}`
    : null;
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

  useEffect(() => {
    if (!patient) return;
    setPatientHistory({
      past_medical_history: patient.medical_history              || "",
      past_family_history:  patient.family_medical_history       || "",
      alerts_and_allergies: patient.alerts_and_allergies_history || "",
    });
  }, [patient]);

  const onChange = (name, value) => setValues(prev => ({ ...prev, [name]: value }));

  // const handleAction = (type) => {
  //   if (type === "clear") setValues({});
  //   if (type === "save")  alert("MetaMotus Galileo assessment saved.");
  // };

  return (
    <div>
      {/* Patient Information */}
      <CommonFormBuilder
        schema={{ title: "Patient Information", sections: [] }}
        values={{}}
        onChange={() => {}}
      >
        <PatientCard patient={patient} />
        <div style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Patient History</div>
          {[
            { key: "past_medical_history", label: "Past Medical History" },
            { key: "past_family_history",  label: "Family History"       },
            { key: "alerts_and_allergies", label: "Allergies"            },
          ].map(({ key, label }) => (
            <div key={key} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
              <input
                value={patientHistory[key]}
                onChange={e => setPatientHistory(p => ({ ...p, [key]: e.target.value }))}
                style={historyTextarea}
              />
            </div>
          ))}
          <button type="button" style={alertBtn}>🚨 Alerts</button>
        </div>
        <button style={doctorsReportBtn}>Doctors Reports</button>
      </CommonFormBuilder>

      {/* Indication Category */}
      <CommonFormBuilder
        schema={INDICATION_SCHEMA}
        values={values}
        onChange={onChange}
      />

      {/* SOAP Tabs */}
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

      {/* Tab content */}
      <CommonFormBuilder
        schema={SCHEMA_MAP[activeTab]}
        values={values}
        onChange={onChange}
        onAction={handleAction}
      />
    </div>
  );
}

/* ── Styles ── */
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
const historyTextarea = {
  width: "100%", minHeight: 90, padding: "10px 12px",
  borderRadius: 6, border: "1px solid #d1d5db",
  fontSize: 14, fontFamily: "inherit", resize: "vertical",
};
const alertBtn = {
  marginTop: 10, padding: "10px 20px", borderRadius: 6,
  border: "1.5px solid #007bff", background: "#007bff",
  color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
};
const doctorsReportBtn = {
  padding: "10px 20px", background: "#2563EB", color: "#fff",
  border: "none", borderRadius: 6, fontSize: 14,
  fontWeight: 600, cursor: "pointer", marginTop: 8,
};
