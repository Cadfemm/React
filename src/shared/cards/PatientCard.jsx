import { localDateTimeString } from "../utils/dateFormatter";

export default function PatientCard({
  patient,
  patientHistory,
  setPatientHistory,
  showDoctorsReport = true
}) {

  if (!patient) return "-";

  return (
    <div style={section}>

      {/* ================= HEADER ================= */}

      <div style={title}>
        Patient Information
      </div>

      <div style={divider} />

      {/* ================= GRID ================= */}

      <div style={patientGrid}>

  <div className="form-label mb-0"><b>Name:</b> {patient.name || "-"}</div>

  <div className="form-label mb-0">
    <b>Primary Diagnosis:</b>{" "}
    {patient.diagnosis_history || "-"}
  </div>

  <div className="form-label mb-0">
    <b>Living Environment:</b>{" "}
    {patient.living_environment || "-"}
  </div>

  <div className="form-label mb-0"><b>IIC:</b> {patient.id || "-"}</div>

  <div className="form-label mb-0">
    <b>Secondary Diagnosis:</b>{" "}
    {patient.medical_history || "-"}
  </div>

  <div className="form-label mb-0">
    <b>Main Caregiver:</b>{" "}
    {patient.main_caregiver || "-"}
  </div>

  <div className="form-label mb-0">
    <b>DOB:</b>{" "}
    {localDateTimeString(patient.dob) || "-"}
  </div>

  <div className="form-label mb-0">
    <b>Marital Status:</b>{" "}
    {patient.marital_status || "-"}
  </div>

  <div className="form-label mb-0">
    <b>Next of Kin:</b>{" "}
    {patient.next_of_kin || "-"}
  </div>

  <div className="form-label mb-0">
    <b>Employment Status:</b>{" "}
    {patient.employment_status || "-"}
  </div>

  <div className="form-label mb-0">
    <b>MC Date:</b>{" "}
    {patient.mc_date || "-"}
  </div>

  <div className="form-label mb-0">
    <b>Age / Gender:</b>{" "}
    {patient.sex || "-"}
  </div>

  <div className="form-label mb-0">
    <b>Scheme:</b>{" "}
    {patient.scheme || "-"}
  </div>

  <div className="form-label mb-0">
    <b>GL Duration:</b>{" "}
    {patient.gl_date || "-"}
  </div>

  <div className="form-label mb-0">
    <b>Dominant Side:</b>{" "}
    {patient.dominant_side || "-"}
  </div>

  <div className="form-label mb-0">
    <b>Language Preference:</b>{" "}
    {patient.language_preference || "-"}
  </div>

  <div className="form-label mb-0">
    <b>Education Level:</b>{" "}
    {patient.education_background || "-"}
  </div>

  <div className="form-label mb-0">
    <b>Driving Status:</b>{" "}
    {patient.driving_status || "-"}
  </div>

</div>

{/* ================= HISTORY ================= */}

<div style={historyTitle} className="form-label mb-0">
  Patient History
</div>

<div style={fieldBlock} className="form-label mb-0">
  <div style={label} className="form-label mb-0">
    Past Medical History
  </div>
  <input
    type="text"
    value={patientHistory?.past_medical_history || ""}
    onChange={(e) =>
      setPatientHistory(prev => ({
        ...prev,
        past_medical_history: e.target.value
      }))
    }
    className="form-control"
  />
</div>

<div style={fieldBlock} className="form-label mb-0">
  <div style={label} className="form-label mb-0">
    Family History
  </div>
  <input
    type="text"
    value={patientHistory?.past_family_history || ""}
    onChange={(e) =>
      setPatientHistory(prev => ({
        ...prev,
        past_family_history: e.target.value
      }))
    }
    className="form-control"
  />
</div>

<div style={fieldBlock} className="form-label mb-0">
  <div style={label} className="form-label mb-0">
    Allergies
  </div>
  <input
    type="text"
    value={patientHistory?.alerts_and_allergies || ""}
    onChange={(e) =>
      setPatientHistory(prev => ({
        ...prev,
        alerts_and_allergies: e.target.value
      }))
    }
    className="form-control"
  />
</div>

<div style={fieldBlock} className="form-label mb-0">
  <div style={label} className="form-label mb-0">
    Work History
  </div>
  <input
    type="text"
    value={patientHistory?.work_history || ""}
    onChange={(e) =>
      setPatientHistory(prev => ({
        ...prev,
        work_history: e.target.value
      }))
    }
    className="form-control"
  />
</div>

      <div style={buttonRow}>
        <button
          type="button"
          onClick={() => alert("Alerts will be generating soon")}
          style={alertBtn}
        >
          🚨 Alerts
        </button>
        {showDoctorsReport && (
          <button
            type="button"
            onClick={() => alert("Report will be generating soon")}
            style={reportBtn}
          >
            Doctors Reports
          </button>
        )}
      </div>

    </div>
  );
}

const section = {
  marginBottom: 24,
  padding: 28,
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 18,
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  margin: 15
};

const title = {
  fontSize: 22,
  fontWeight: 700,
  marginBottom: 16
};

const divider = {
  borderBottom: "1px solid #e5e7eb",
  marginBottom: 24
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "14px 28px",
  fontSize: 15,
  marginBottom: 28
};

const historyTitle = {
  fontWeight: 800,
  fontSize: 24,
  marginTop: 12,
  marginBottom: 18
};

const fieldBlock = {
  marginBottom: 22
};

const label = {
  fontWeight: 500,
  marginBottom: 8,
  fontSize: 15
};

const buttonRow = {
  display: "flex",
  gap: 12,
  marginTop: 12,
  flexWrap: "wrap"
};

const alertBtn = {
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
};

const reportBtn = {
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
};
