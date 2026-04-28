



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

/* ================= PATIENT INFO HELPERS ================= */

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString();
};

const today = new Date();

const calculateDuration = (onset) => {
  if (!onset) return "-";
  const diff = today - new Date(onset);
  if (diff < 0) return "-";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (years > 0) return `${years} yr ${months % 12} mo`;
  if (months > 0) return `${months} mo`;
  return `${days} days`;
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};

function AdultPatientInfo({ patient }) {
  if (!patient) return null;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={infoGrid}>
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
    </div>
  );
}

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

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
    if (type === "clear") { setValues({}); setSubmitted(false); }
    if (type === "save") { console.log("Saved:", values); alert("Draft saved"); }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Submitted:", values);
    alert("Assessment submitted");
  };

  const tabOrder = ["subjective", "objective", "assessment", "plan"];
  const activeTabIdx = tabOrder.indexOf(activeTab);

  /* ================= PATIENT INFO ================= */

  const PATIENT_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: []
  };

  const PATIENT_HISTORY_SCHEMA = {
    sections: [
      {
        fields: [
          { type: "subheading", label: "Patient History" },
          { name: "pastMedicalHistory", label: "Past Medical History", type: "textarea" },
          { name: "familyHistory", label: "Family History", type: "textarea" },
          { name: "allergies", label: "Allergies", type: "textarea" },
          { type: "custom", render: () => <button style={alertBtn}>🚨 Alerts</button> }
        ]
      }
    ]
  };

const SOAP_ACTIONS = [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ];

  /* ================= SUBJECTIVE ================= */

const SUBJECTIVE_SCHEMA = {
    title: "Subjective",
    actions: SOAP_ACTIONS,
    sections: [
      {
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

          { type: "subheading", label: "Presenting Complaints" },
          /* ================= PRESENTING COMPLAINTS ================= */



/* ================= SWALLOWING ================= */
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
  name: "subjectiveLauncher",
  type: "assessment-launcher",
  label: "Assessments",
  options: [
    { label: "CSE", value: "swallow_subjective", visibleIf: { field: "swallowingProblems", equals: "YES" } },
    { label: "Communication", value: "comm_subjective", visibleIf: { field: "communicationProblems", equals: "YES" } },
    { label: "Voice", value: "voice_subjective", visibleIf: { field: "voiceProblems", equals: "YES" } },
    { label: "Tracheostomy", value: "trach_subjective", visibleIf: { field: "tracheostomyProblems", equals: "YES" } }
  ],
  showIf: {
    or: [
      { field: "swallowingProblems", equals: "YES" },
      { field: "communicationProblems", equals: "YES" },
      { field: "voiceProblems", equals: "YES" },
      { field: "tracheostomyProblems", equals: "YES" }
    ]
  }
},


        ]
      }
    ]
  };

const OBJECTIVE_SCHEMA = {
  title: "Objective",
  actions: SOAP_ACTIONS,
  sections: [
    {

      fields: [

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
        { type: "subheading", label: "Vitals" },
        {
          type: "row",
          fields: [
            { name: "spo2",        label: "SpO2 (%)",       type: "input", placeholder: "e.g. 98" },
            { name: "rr",          label: "RR (breaths/min)", type: "input", placeholder: "e.g. 18" },
            { name: "hr",          label: "HR (bpm)",        type: "input", placeholder: "e.g. 72" },
            { name: "bp",          label: "BP (mmHg)",       type: "input", placeholder: "e.g. 120/80" },
            { name: "temperature", label: "Temp (°C)",       type: "input", placeholder: "e.g. 37.0" }
          ]
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
        // {
        //   type: "subheading",
        //   label: "Cranial Nerve Examination"
        // },
        {
          name: "cranial_nerve",
          label: "Cranial Nerve Examination",
          type: "checkbox-group",
          options: [
            { label: "CN V", value: "cn_v" },
            { label: "CN VII", value: "cn_vii" },
            { label: "CN IX & X", value: "cn_ix_x" },
            { label: "CN XII", value: "cn_xii" }
          ]
        },

        // CN V
        {  label: "CN V", showIf: { field: "cranial_nerve", includes: "cn_v" } },
        { name: "cn5_motor", label: "Motor (Jaw ROM/strength)", type: "radio", showIf: { field: "cranial_nerve", includes: "cn_v" }, options: [
          { label: "Within Normal Limit", value: "wnl" },
          { label: "Impaired", value: "impaired" },
          { label: "Not Tested", value: "not_tested" }
        ]},
        { name: "cn5_sensory", label: "Sensory (Facial sensation)", type: "radio", showIf: { field: "cranial_nerve", includes: "cn_v" }, options: [
          { label: "Within Normal Limit", value: "wnl" },
          { label: "Impaired", value: "impaired" },
          { label: "Not Tested", value: "not_tested" }
        ]},

        // CN VII
        { label: "CN VII", showIf: { field: "cranial_nerve", includes: "cn_vii" } },
        { name: "cn7_motor", label: "Motor (Facial movements)", type: "radio", showIf: { field: "cranial_nerve", includes: "cn_vii" }, options: [
          { label: "Within Normal Limit", value: "wnl" },
          { label: "Impaired", value: "impaired" },
          { label: "Not Tested", value: "not_tested" }
        ]},
        { name: "cn7_symmetry", label: "Facial Symmetry", type: "radio", showIf: { field: "cranial_nerve", includes: "cn_vii" }, options: [
          { label: "Symmetry", value: "symmetry" },
          { label: "Asymmetrical", value: "asymmetrical" },
          { label: "Left Facial Droop", value: "left_droop" },
          { label: "Right Facial Droop", value: "right_droop" }
        ]},
        { name: "cn7_sensory", label: "Sensory (Taste - ant 2/3 tongue)", type: "radio", showIf: { field: "cranial_nerve", includes: "cn_vii" }, options: [
          { label: "Within Normal Limit", value: "wnl" },
          { label: "Impaired", value: "impaired" },
          { label: "Not Tested", value: "not_tested" }
        ]},

        // CN IX & X
        { label: "CN IX & X", showIf: { field: "cranial_nerve", includes: "cn_ix_x" } },
        { name: "cn9_10_motor", label: "Motor (SP, Cough)", type: "radio", showIf: { field: "cranial_nerve", includes: "cn_ix_x" }, options: [
          { label: "Within Normal Limit", value: "wnl" },
          { label: "Impaired", value: "impaired" },
          { label: "Not Tested", value: "not_tested" }
        ]},
        { name: "cn9_10_sensory", label: "Sensory (Gag)", type: "radio", showIf: { field: "cranial_nerve", includes: "cn_ix_x" }, options: [
          { label: "Within Normal Limit", value: "wnl" },
          { label: "Reduced", value: "reduced" },
          { label: "Not Tested", value: "not_tested" }
        ]},
        { name: "cn9_10_voice", label: "Voice quality", type: "radio", showIf: { field: "cranial_nerve", includes: "cn_ix_x" }, options: [
          { label: "No Abnormality Detected", value: "nad" },
          { label: "Impaired", value: "impaired" },
          { label: "Not Tested", value: "not_tested" }
        ]},

        // CN XII
        { label: "CN XII", showIf: { field: "cranial_nerve", includes: "cn_xii" } },
        { name: "cn12_motor", label: "Motor (Tongue ROM/strength)", type: "radio", showIf: { field: "cranial_nerve", includes: "cn_xii" }, options: [
          { label: "Within Normal Limit", value: "wnl" },
          { label: "Impaired", value: "impaired" },
          { label: "Not Tested", value: "not_tested" }
        ]},



        {
  name: "objectiveLauncher",
  type: "assessment-launcher",
  label: "Assessments",
  options: [
    { label: "CSE", value: "swallow_objective", visibleIf: { field: "swallowingProblems", equals: "YES" } },
    { label: "Communication", value: "comm_objective", visibleIf: { field: "communicationProblems", equals: "YES" } },
    { label: "Voice", value: "voice_objective", visibleIf: { field: "voiceProblems", equals: "YES" } },
    { label: "Tracheostomy", value: "trach_objective", visibleIf: { field: "tracheostomyProblems", equals: "YES" } }
  ],
  showIf: {
    or: [
      { field: "swallowingProblems", equals: "YES" },
      { field: "communicationProblems", equals: "YES" },
      { field: "voiceProblems", equals: "YES" },
      { field: "tracheostomyProblems", equals: "YES" }
    ]
  }
},


        
        
      ]
    }
  ]
};
 const ASSESSMENT_SCHEMA = {
  title: "Assessment",
  actions: SOAP_ACTIONS,
  sections: [
    {
      fields: [
        // {
        //   type: "label",
        //   label: "Clinical Impression"
        // },
        // {
        //   name: "clinicalImpression",
        //   type: "textarea",
        //   placeholder: "Enter clinical impression...",
        //   rows: 4
        // },
        {
  name: "assessmentLauncher",
  type: "assessment-launcher",
  label: "Assessments",
  options: [
    { label: "CSE", value: "swallow_assessment", visibleIf: { field: "swallowingProblems", equals: "YES" } },
    { label: "Communication", value: "comm_assessment", visibleIf: { field: "communicationProblems", equals: "YES" } },
    { label: "Voice", value: "voice_assessment", visibleIf: { field: "voiceProblems", equals: "YES" } },
    { label: "Tracheostomy", value: "trach_assessment", visibleIf: { field: "tracheostomyProblems", equals: "YES" } }
  ],
  showIf: {
    or: [
      { field: "swallowingProblems", equals: "YES" },
      { field: "communicationProblems", equals: "YES" },
      { field: "voiceProblems", equals: "YES" },
      { field: "tracheostomyProblems", equals: "YES" }
    ]
  }
},
      ]
    }
  ]
};
  const PLAN_SCHEMA = {
    title: "Plan",
    actions: SOAP_ACTIONS,
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
  label: "Assessments",
  options: [
    { label: "CSE", value: "swallow_plan", visibleIf: { field: "swallowingProblems", equals: "YES" } },
    { label: "Communication", value: "comm_plan", visibleIf: { field: "communicationProblems", equals: "YES" } },
    { label: "Voice", value: "voice_plan", visibleIf: { field: "voiceProblems", equals: "YES" } },
    { label: "Tracheostomy", value: "trach_plan", visibleIf: { field: "tracheostomyProblems", equals: "YES" } }
  ],
  showIf: {
    or: [
      { field: "swallowingProblems", equals: "YES" },
      { field: "communicationProblems", equals: "YES" },
      { field: "voiceProblems", equals: "YES" },
      { field: "tracheostomyProblems", equals: "YES" }
    ]
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

  /* ================= UI ================= */

  return (
    <div>

      {/* ===== PATIENT INFO ===== */}
      <CommonFormBuilder
        schema={PATIENT_CONTAINER_SCHEMA}
        layout="nested"
        values={{}}
        onChange={() => {}}
      >
        <AdultPatientInfo patient={patient} />
      </CommonFormBuilder>
      <CommonFormBuilder
        schema={PATIENT_HISTORY_SCHEMA}
        layout="nested"
        values={values}
        onChange={onChange}
      />

      {/* ===== TABS ===== */}
      <div style={tabBar}>
        {tabOrder.map((tab) => (
          <div
            key={tab}
            style={activeTab === tab ? tabActive : tabBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* ===== FORM ===== */}
      <CommonFormBuilder
        schema={schemaMap[activeTab]}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        assessmentRegistry={assessmentComponents}
      >
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
      </CommonFormBuilder>

    </div>
  );
}

/* ================= STYLES ================= */

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
};

const tabBtn = {
  padding: "12px 10px",
  cursor: "pointer",
  fontWeight: 600,
  color: "#444"
};

const tabActive = {
  ...tabBtn,
  color: "#2563EB",
  borderBottom: "3px solid #2563EB"
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

const alertBtn = {
  marginTop: 10,
  padding: "10px 20px",
  borderRadius: 6,
  border: "1px solid #007bff",
  background: "#007bff",
  color: "#fff"
};

