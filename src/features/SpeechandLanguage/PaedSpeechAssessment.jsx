

import React, { useState, useMemo } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";
import CurrentDietIntake from "./CurrentDietIntake";
import VoiceAssessment from "./VoiceAssessment";
import ThacheostomyAssessment from "./Tracheostomy";
import CommunicationAssessment from "./CommunicationAssessmnet";

const YES_NO_OPTIONS = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" }
];

/* ================= ASSESSMENT COMPONENTS ================= */

const assessmentComponents = {
  swallow_subjective: (p) => <CurrentDietIntake {...p} mode="subjective" />,
  swallow_objective: (p) => <CurrentDietIntake {...p} mode="objective" />,
  swallow_assessment: (p) => <CurrentDietIntake {...p} mode="assessment" />,
  swallow_plan: (p) => <CurrentDietIntake {...p} mode="plan" />,

  voice_subjective: (p) => <VoiceAssessment {...p} mode="subjective" />,
  voice_objective: (p) => <VoiceAssessment {...p} mode="objective" />,
  voice_assessment: (p) => <VoiceAssessment {...p} mode="assessment" />,
  voice_plan: (p) => <VoiceAssessment {...p} mode="plan" />,

  trach_subjective: (p) => <ThacheostomyAssessment {...p} mode="subjective" />,
  trach_objective: (p) => <ThacheostomyAssessment {...p} mode="objective" />,
  trach_assessment: (p) => <ThacheostomyAssessment {...p} mode="assessment" />,
  trach_plan: (p) => <ThacheostomyAssessment {...p} mode="plan" />,

  comm_subjective: (p) => <CommunicationAssessment {...p} mode="subjective" />,
  comm_objective: (p) => <CommunicationAssessment {...p} mode="objective" />,
  comm_assessment: (p) => <CommunicationAssessment {...p} mode="assessment" />,
  comm_plan: (p) => <CommunicationAssessment {...p} mode="plan" />
};

export default function PaedIASpeechLanguage({ patient = {}, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  const today = new Date();

  /* ================= HELPERS ================= */

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "-");

  const calculateDuration = (onset) => {
    if (!onset) return "-";
    const diff = today - new Date(onset);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
  };

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Submitted:", values);
  };

  /* ================= PATIENT INFO ================= */

  const PatientInfoBlock = () => (
    <div style={patientGrid}>
      <div><b>Name:</b> {patient.name || "-"}</div>
      <div><b>IC:</b> {patient.id || "-"}</div>
      <div><b>DOB:</b> {formatDate(patient.dob)}</div>
      <div><b>Age / Gender:</b> {patient.age || "-"} / {patient.sex || "-"}</div>
      <div><b>ICD:</b> {patient.icd || "-"}</div>
      <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
      <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
      <div><b>Duration:</b> {calculateDuration(patient.date_of_onset)}</div>
      <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
      <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
      <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
      <div><b>Language:</b> {patient.language_preference || "-"}</div>
      <div><b>Education:</b> {patient.education_background || "-"}</div>
      <div><b>Occupation:</b> {patient.occupation || "-"}</div>
      <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
      <div><b>Marital Status:</b> {patient.marital_status || "-"}</div>
    </div>
  );

  /* ================= PATIENT SCHEMA ================= */

  const PATIENT_INFORMATION_SCHEMA = {
    title: "Patient Information",
    sections: [
      {
        fields: [
          { type: "custom", render: () => <PatientInfoBlock /> },

          { type: "subheading", label: "Patient History" },

          {
            name: "pastMedicalHistory",
            label: "Past Medical History",
            type: "textarea"
          },
          {
            name: "familyHistory",
            label: "Family History",
            type: "textarea"
          },
          {
            name: "allergies",
            label: "Allergies",
            type: "textarea"
          },
          {
            type: "custom",
            render: () => (
              <button style={alertBtn}>🚨 Alerts</button>
            )
          }
        ]
      }
    ]
  };

  /* ================= SUBJECTIVE ================= */

 
const SUBJECTIVE_SCHEMA = {
    sections: [
      {
        title: "Subjective",
        fields: [
          {
            name: "accompaniedBy",
            label: "Patient was seen",
            type: "radio",
            options: [
              { label: "Unaccompanied", value: "unaccompanied" },
              { label: "Accompanied", value: "accompanied" }
            ]
          },

          { type: "heading", label: "Presenting Complaints" },
          /* ================= PRESENTING COMPLAINTS ================= */



/* ================= SWALLOWING ================= */
{ type: "subheading", label: "Patient/family reported" },
{
  name: "swallowingProblems",
  label: "Swallowing problems",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "swallowingDetails",
  type: "checkbox-group",
  options: [
    { label: "Drooling", value: "drooling" },
    { label: "Coughing with drink", value: "coughing" },
    { label: "Choking on food", value: "choking" },
    { label: "Food/pills stuck in throat", value: "stuck" },
    { label: "Pain on swallowing (odynophagia)", value: "pain" }
  ],
  showIf: {
    field: "swallowingProblems",
    equals: "YES"
  }
},

/* ================= COMMUNICATION ================= */
{
  name: "communicationProblems",
  label: "Communication problems",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "communicationDetails",
  type: "checkbox-group",
  options: [
    { label: "Understanding spoken language", value: "understanding" },
    { label: "Expressing thoughts verbally", value: "expressing" },
    { label: "Reading comprehension", value: "reading" },
    { label: "Written expression", value: "writing" },
    { label: "Speech clarity / intelligibility", value: "clarity" },
    { label: "Voice quality", value: "voice_quality" }
  ],
  showIf: {
    field: "communicationProblems",
    equals: "YES"
  }
},

/* ================= VOICE ================= */
{
  name: "voiceProblems",
  label: "Voice problems",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "voiceDetails",
  type: "checkbox-group",
  options: [
    { label: "Hoarse / weak / strained voice", value: "hoarse" },
    { label: "Reduced vocal loudness", value: "low_voice" },
    { label: "Voice fatigue", value: "fatigue" },
    { label: "Pain when speaking (odynophonia)", value: "pain" },
    { label: "Shortness of breath while speaking", value: "breathless" }
  ],
  showIf: {
    field: "voiceProblems",
    equals: "YES"
  }
},

/* ================= TRACHEOSTOMY ================= */
{
  name: "tracheostomyProblems",
  label: "Tracheostomy",
  type: "radio",
  options: YES_NO_OPTIONS
},

{
  name: "tracheostomyDetails",
  type: "checkbox-group",
  options: [
    { label: "Poor secretion management", value: "secretion" },
    { label: "Absent or weak voice", value: "weak_voice" },
    { label: "Difficulty tolerating cuff deflation", value: "cuff" },
    { label: "Unable to wean / decannulate", value: "wean" },
    { label: "Increased coughing during oral intake", value: "coughing" }
  ],
  showIf: {
    field: "tracheostomyProblems",
    equals: "YES"
  }
},

/* ================= OTHER ================= */
{
  name: "otherProblems",
  label: "Other complaints",
  type: "radio",
  options: YES_NO_OPTIONS
},
{
  name: "otherDetails",
  label: "Remarks",
  type: "textarea",
  showIf: {
    field: "otherProblems",
    equals: "YES"
  }
},
{
  name: "swallowingLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    { label: "CSE", value: "swallow_subjective"}

  ],
  showIf: {
    field: "swallowingProblems",
    equals: "YES"
  }
},

{
  name: "communicationLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    // { label: "Voice", value: "comm_subjective" }
    { 
  label: "Communication Assessment", 
  value: "comm_subjective" 
}
  ],
  showIf: {
    field: "communicationProblems",
    equals: "YES"
  }
},
{
  name: "voiceLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    { label: "Voice", value: "voice_subjective" }
  ],
  showIf: {
    field: "voiceProblems",
    equals: "YES"
  }
},
{
  name: "tracheostomyLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    { label: "Tracheostomy", value: "trach_subjective" }
  ],
  showIf: {
    field: "tracheostomyProblems",
    equals: "YES"
  }
},


        ]
      }
    ]
  };

const OBJECTIVE_SCHEMA = {
  sections: [
    {
      title: "Objective",
      fields: [
        {
          type: "subheading",
          label: "General Observation"
        },
        {
          name: "arousalLevel",
          label: "Arousal level",
          type: "radio",
          options: ["Alert", "Fleeting alertness", "Drowsy"]
        },
        {
          name: "sittingIn",
          label: "Sitting in",
          type: "radio",
          options: ["Chair", "Wheelchair", "Bed"]
        },
        {
          name: "position",
          label: "Position",
          type: "radio",
          options: [
            "Upright (90 degrees)",
            "Slightly reclined",
            "60 degrees",
            "45 degrees"
          ]
        },
        {
          name: "spo2",
          label: "SpO2 (%)",
          type: "textarea"
        },
        {
          name: "oralHygiene",
          label: "Oral hygiene",
          type: "radio",
          options: ["Poor", "Fair", "Good"]
        },

        {
          type: "subheading",
          label: "Oral-motor structure observation"
        },

        {
          name: "teeth",
          label: "Teeth",
          type: "radio",
          options: ["Complete", "Incomplete", "Dentures", "Edentulous"]
        },
        {
          name: "hardPalate",
          label: "Hard palate",
          type: "radio",
          options: ["No Abnormality Detected", "High arch", "Cleft"]
        },
        {
          name: "hardPalateRemarks",
          label: "Hard palate Remarks",
          type: "textarea"
        },
        {
          name: "softPalate",
          label: "Soft palate",
          type: "radio",
          options: [
            "No Abnormality Detected",
            "Reduced elevation",
            "Bifid uvula",
            "Scarring"
          ]
        },
        {
          name: "tongue",
          label: "Tongue",
          type: "radio",
          options: [
            "No Abnormality Detected",
            "Deviation",
            "Fasciculations",
            "Thrush",
            "Reduced ROM"
          ]
        },
        {
          name: "lips",
          label: "Lips",
          type: "radio",
          options: [
            "No Abnormality Detected",
            "Reduced seal",
            "Asymmetry",
            "Cleft",
            "Scarring"
          ]
        },
        {
  name: "objectiveLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    // { label: "", value: "swallow_objective" }
    { 
  label: "CSE", 
  value: "swallow_objective" 
}
  ],
  showIf: {
    field: "swallowingProblems",
    equals: "YES"
  }
},
{
  name: "communicationLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    // { label: "Voice", value: "comm_objective" }
    { 
  label: "Communication Assessment", 
  value: "comm_objective" 
}
  ],
  showIf: {
    field: "communicationProblems",
    equals: "YES"
  }
},
{
  name: "voiceLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    { label: "Voice", value: "voice_objective" }
  ],
  showIf: {
    field: "voiceProblems",
    equals: "YES"
  }
},
{
  name: "tracheostomyLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    { label: "Tracheostomy", value: "trach_objective" }
  ],
  showIf: {
    field: "tracheostomyProblems",
    equals: "YES"
  }
},
        
        
      ]
    }
  ]
};
 const ASSESSMENT_SCHEMA = {
  sections: [
    {
      title: "Assessment",
      fields: [
        {
          type: "label",
          label: "Clinical Impression"
        },
        {
          name: "clinicalImpression",
          type: "textarea",
          placeholder: "Enter clinical impression...",
          rows: 4
        },
        {
  name: "assessmentLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    { label: "CSE", value: "swallow_plan" }
  ],
  showIf: {
    field: "swallowingProblems",
    equals: "YES"
  }
},
{
  name: "communicationLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    // { label: "Voice", value: "comm_assessment" }
    { 
  label: "Communication Assessment", 
  value: "comm_assessment" 
}
  ],
  showIf: {
    field: "communicationProblems",
    equals: "YES"
  }
},
{
  name: "voiceLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    { label: "Voice", value: "voice_assessment" }
  ],
  showIf: {
    field: "voiceProblems",
    equals: "YES"
  }
},
{
  name: "tracheostomyLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    { label: "Tracheostomy", value: "trach_assessment" }
  ],
  showIf: {
    field: "tracheostomyProblems",
    equals: "YES"
  }
},
      ]
    }
  ]
};
  const PLAN_SCHEMA = {
    sections: [
      {
        title: "Plan",
        fields: [
          {
            name: "others",
            label: "Others",
            type: "textarea"
          },
          {
  name: "planLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    { label: "CSE", value: "swallow_plan" }
  ],
  showIf: {
    field: "swallowingProblems",
    equals: "YES"
  }
},
{
  name: "communicationLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    // { label: "Voice", value: "comm_plan" }
    { 
  label: "Communication", 
  value: "comm_plan" 
}
  ],
  showIf: {
    field: "communicationProblems",
    equals: "YES"
  }
},
{
  name: "voiceLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    { label: "Voice", value: "voice_plan" }
  ],
  showIf: {
    field: "voiceProblems",
    equals: "YES"
  }
},
{
  name: "tracheostomyLauncher",
  type: "assessment-launcher",
  label: "",
  options: [
    { label: "Tracheostomy", value: "trach_plan" }
  ],
  showIf: {
    field: "tracheostomyProblems",
    equals: "YES"
  }
},
        ]
      }
    ]
  };

  const schemaMap = useMemo(() => ({
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  }), []);

  const tabOrder = ["subjective", "objective", "assessment", "plan"];





  /* ================= UI ================= */

  return (
    <div style={mainContainer}>

      {/* ===== PATIENT INFO ===== */}
      <div style={card}>
        <CommonFormBuilder
          schema={PATIENT_INFORMATION_SCHEMA}
          values={values}
          onChange={onChange}
        />
      </div>

      {/* ===== TABS ===== */}
      <div style={tabWrapper}>
        {tabOrder.map((tab) => (
          <div
            key={tab}
            style={activeTab === tab ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* ===== FORM ===== */}
      <div style={card}>
        <CommonFormBuilder
          schema={schemaMap[activeTab]}
          values={values}
          onChange={onChange}
          submitted={submitted}
          assessmentRegistry={assessmentComponents}
        />

        <div style={buttonRow}>
         

          <button style={primaryBtn} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const mainContainer = { maxWidth: 1200, margin: "0 auto" };
const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: 20
};

const card = {
  background: "#fff",
  borderRadius: 12,
  padding: 20,
  marginBottom: 20,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
};

const title = {
  fontSize: 24,
  fontWeight: 700,
  marginBottom: 10
};

const divider = {
  height: 1,
  background: "#e5e7eb",
  marginBottom: 16
};

  const patientGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
    fontSize: 14,
  };



const tabWrapper = {
  display: "flex",
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 16,
  gap: 40
};

const tabStyle = {
  padding: "12px 10px",
  cursor: "pointer",
  fontWeight: 600,
  color: "#444"
};


const activeTabStyle = {
  ...tabStyle,
  color: "#2563EB",
  borderBottom: "3px solid #2563EB"
};

const buttonRow = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 12,
  marginTop: 20
};

const outlineBtn = {
  padding: "10px 20px",
  border: "1px solid #ccc",
  borderRadius: 20,
  background: "#fff",
  cursor: "pointer"
};

const primaryBtn = {
  padding: "10px 20px",
  borderRadius: 20,
  background: "#2563EB",
  color: "#fff",
  border: "none",
  cursor: "pointer"
};

const alertBtn = {
  marginTop: 10,
  padding: "10px 20px",
  borderRadius: 6,
  border: "1px solid #007bff",
  background: "#007bff",
  color: "#fff"
};

