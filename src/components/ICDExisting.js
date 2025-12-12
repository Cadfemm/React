import React, { useEffect, useState } from "react";
import PatientList from "./PatientList"; // Importing the PatientList component
import NewAppointment from "./NewAppointment"; // Import the NewAppointment component

export default function ICDExisting() {
  const [rows, setRows] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null); // State to hold the selected patient ID
  const [showPatientDetails, setShowPatientDetails] = useState(false); // Flag to show patient details section
  const [appointments, setAppointments] = useState([]); // State for patient's previous appointments

  // Fetch ICD data for patients
  useEffect(() => {
    fetch("/patients_icd_existing")
      .then((res) => res.json())
      .then(setRows)
      .catch((err) => console.error("Error loading ICD list", err));
  }, []);

  // Handle the patient edit action (showing patient details)
  const handleEdit = (id) => {
    setSelectedPatientId(id); // Store the selected patient ID
    setShowPatientDetails(true); // Show the details view

    // Fetch previous appointments for the selected patient
    fetch(`/patient_appointments/${id}`)
      .then((res) => res.json())
      .then(setAppointments)
      .catch((err) => console.error("Error fetching patient appointments", err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Patient ICD Summary Section */}
      {!showPatientDetails && (
        <>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Existing Patients Data</h2>
          <table
            border="1"
            cellPadding="8"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#606468ff", color: "white", fontWeight: "bold" }}>
                <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Main ICD</th>
                <th style={{ padding: "10px", textAlign: "left" }}>ICD Code</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{r.id}</td>
                  <td style={{ padding: "10px" }}>{r.main_icd}</td>
                  <td style={{ padding: "10px" }}>{r.icd_code}</td>
                  <td style={{ padding: "10px" }}>
                    <button
                      onClick={() => handleEdit(r.id)} // Trigger edit
                      style={{
                        border: "none",
                        backgroundColor: "#3a40ad00",
                        color: "#3A3FAD",
                        padding: "6px 12px",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Show filtered patient details */}
      {showPatientDetails && selectedPatientId && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Patient Details (ID: {selectedPatientId})</h2>
          <PatientList selectedPatientId={selectedPatientId} />
          <h3 style={{ marginTop: "20px", fontSize: "20px" }}>Previous Appointments</h3>
          <ul>
            {appointments.map((appt) => (
              <li key={appt.appointment_id} style={{ marginBottom: "10px" }}>
                <button
                  onClick={() => {
                    // Action when clicking on previous appointments (e.g., reschedule)
                    console.log(`Rescheduling appointment with ${appt.doctor_name}`);
                  }}
                  style={{
                    border: "1px solid #007bff",
                    backgroundColor: "white",
                    color: "#007bff",
                    padding: "10px 20px",
                    cursor: "pointer",
                    marginBottom: "5px",
                    textAlign: "left",
                    width: "100%",
                    borderRadius: "5px",
                  }}
                >
                  <strong>Doctor:</strong> {appt.doctor_name} |{" "}
                  <strong>Department:</strong> {appt.department} |{" "}
                  <strong>Time:</strong> {appt.appointment_time}
                </button>
              </li>
            ))}
          </ul>

          {/* Book New Appointment */}
          <NewAppointment patientId={selectedPatientId} /> {/* Render NewAppointment Component here */}

          {/* Back to ICD List Button */}
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "#222121ff",
              cursor: "pointer",
            }}
            onClick={() => setShowPatientDetails(false)}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
