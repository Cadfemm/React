import { calculateDuration, localDateTimeString } from "../utils/dateFormatter";

export default function PatientCard({ patient }) {
    if (!patient) return '-'
    console.log(patient)
    return (
        <div style={section}>
            <div style={patientGrid}>
                <div><b>Name:</b> {patient.name}</div>
                <div><b>IC:</b> {patient.id}</div>
                <div><b>DOB:</b> {localDateTimeString(patient.dob)}</div>
                <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
                <div><b>ICD:</b> {patient.icd}</div>
                <div><b>Date of Assessment:</b> {localDateTimeString('', true)}</div>
                <div><b>Date of Onset:</b> {localDateTimeString(patient.date_of_onset)}</div>
                <div>
                <b>Duration of Diagnosis:</b>{" "}
                {calculateDuration(patient.date_of_onset)}
                </div>
                <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
                <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
                <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
                <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
                <div><b>Education Level:</b> {patient.education_background || "-"}</div>
                <div><b>Occupation:</b> {patient.occupation || "-"}</div>
                <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
                <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>

                {/* Display all items of patient if its not empty */}
                {/* {Object.entries(patient).map(([key, item]) => {
                    if (!item) return null
                    return (
                        <div><b>{key}: </b>{item}</div>
                    )
                })} */}
            </div>
        </div>
    )
}

const section = {
  marginBottom: 24
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};
 