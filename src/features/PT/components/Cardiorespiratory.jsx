// Cardio respiratory form 
import { useState, useEffect } from "react"
import CommonFormBuilder from "../../CommonComponenets/FormBuilder"
import { PATIENT_SCHEMA, SCHEMA_MAPPING } from "../schema/CardioRespiratorySchema"


const todayDate = new Date()

// Calculate duration of diagonse
// ToDo:- Move this to in helpers
const calculateDuration = ({ date }) => {
  if (!date) return "-";
  const setDate = new Date(date);
  const diffMs = todayDate - setDate;

  if (diffMs < 0) return "-";
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) {
    return `${years} yr ${months % 12} mo`
  } else if (months > 0) {
    return `${months} mo`
  } else {
    return days + 'days'
  }
}

// Local Date time
const localDateTimeString = (date) => {
  if (!date) return "-"
  return new Date(date).toLocaleDateString()
}

// Function for patient information
// ToDo:- Need to be centralize function, schema, and cards 
function PatientInformation({ patient }) {
  if (!patient) return null
  return (
    <div style={section}>
      <div style={patientGrid}>
        <div><b>Name:</b> {patient.name}</div>
        <div><b>IC:</b> {patient.id}</div>
        <div><b>DOB:</b> {localDateTimeString(patient.dob)}</div>
        <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
        <div><b>ICD:</b> {patient.icd}</div>
        <div><b>Date of Assessment:</b> {todayDate.toLocaleDateString()}</div>
        <div><b>Date of Onset:</b> {localDateTimeString(patient.date_of_onset)}</div>
        <div><b>Referring Physician:</b> {patient.refer_physician_name}</div>
        <div>
          <b>Duration of Diagnosis:</b>{" "}
          {calculateDuration(patient.date_of_onset)}
        </div>
        {/* <div>
          <b>Surgery Date:</b>{" "}
          {calculateDuration(patient.surgery_date)}
        </div> */}
      </div>
    </div>
  )
}

// CardioRespiratory assessment plan
export default function CardioRespiratoryAssessment({
  patient,
  onSubmit,
  onBack
}) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");
  const storageKey = patient ? "cardio_draft" + patient.id : null

  // Forms handle actions
  // On change logic
  const onChange = (name, value)=> {
    setValues(v => ({ ...v, [name]: value }));
  }

  // Handle actions ex:- back, clear, and etc
  const handleAction = (type, storageKey, setValues, setSubmitted, onBack)=> {
    if (type === "back") onBack?.()
    if (type === "clear") {
      setValues({})
      setSubmitted(false);
      localStorage.removeItem(storageKey)
    }
    if(type === "save") {
      localStorage.setItem(
        storageKey,
        JSON.stringify({values, updatedAt: new Date()})
      )
      alert("Cardio Draft Saved!")
    }
  } 

  const handleSubmit = (onSubmit)=> {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Cardio Assessment Submitted");
  }

  return (
    <div>
      {/* Patient information UI compoment */}
      <CommonFormBuilder 
        schema={PATIENT_SCHEMA}
      >
        <PatientInformation 
          patient={patient}
        />
      </CommonFormBuilder>

      {/* Tab bars */}
      <div style={tabBar}>
        {[
          "subjective",
          "objective",
          "assessment",
          "plan"
        ].map(tab => (
          <div
            key={tab}
            onClick={()=>setActiveTab(tab)}
            style={activeTab === tab ? tabActive:tabBtn}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>
      
      {/* Tab content */}
      <CommonFormBuilder
        schema={SCHEMA_MAPPING[activeTab]}
        values={values}
        onChange={onChange}
        submitted={submitted}
        // onAction={handleAction}
        // assessmentRegistry={NEURO_ASSESSMENT_REGISTRY}
      >
        {/* Submit button */}
        <div style={submitRow}>
          <button style={submitBtn} >
            Submit
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  )
}

// CSS 
// Todo:- Separate file for common css

// Patient css card
const section = {
  marginBottom: 24
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};

// Tab bars css
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

// Submit button css
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