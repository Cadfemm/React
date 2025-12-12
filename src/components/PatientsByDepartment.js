import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function PatientsByDepartment({ department, setTab }) {
  const [patientsData, setPatientsData] = useState([]);
  const [removedPatients, setRemovedPatients] = useState([]); // Track removed patients temporarily

  useEffect(() => {
    // Fetching patients based only on department, no doctor filter
    axios
      .get(`${API}/api/patients/departments/${department}`)
      .then((res) => {
        // Filter out the removed patients from the server data
        const updatedData = res.data.filter((patient) => 
          !removedPatients.includes(patient.patient_id)
        );
        setPatientsData(updatedData);
      })
      .catch((err) => console.error("Error fetching patients:", err));
  }, [department, removedPatients]); // Re-fetch when department or removedPatients changes

  const formatDate = (d) => new Date(d).toLocaleString();

  const handleView = (patientId) => {
    alert(`✅ Patient ID ${patientId} viewed.`);

    // Remove the patient from the list temporarily
    setRemovedPatients((prev) => [...prev, patientId]);

    // After removing the patient from view, switch to ICDAD tab
    setTab("ICDAD"); // 🔥 Switch to ICD tab after clicking View
  };

  return (
    <div style={{ padding: "10px 20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#1f2937" }}>
        Patients in {department} Department
      </h2>

      <div
        style={{
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead
            style={{
              backgroundColor: "#374151",
              color: "white",
              textAlign: "left",
            }}
          >
            <tr>
              <th style={{ padding: "12px 16px", width: "80px" }}>Token</th>
              <th style={{ padding: "12px 16px" }}>Patient ID</th>
              <th style={{ padding: "12px 16px" }}>Name</th>
              <th style={{ padding: "12px 16px" }}>Departments</th>
              <th style={{ padding: "12px 16px" }}>Appointment</th>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {patientsData.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "16px",
                    color: "#6b7280",
                    fontStyle: "italic",
                  }}
                >
                  No patient records found
                </td>
              </tr>
            ) : (
              patientsData.map((p, i) => (
                <tr
                  key={p.patient_id}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#f9fafb" : "#ffffff",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <td style={{ padding: "12px 16px" }}>{i + 1}</td>
                  <td style={{ padding: "12px 16px" }}>{p.patient_id}</td>
                  <td style={{ padding: "12px 16px" }}>{p.patient_name}</td>
                  <td style={{ padding: "12px 16px" }}>
                    {p.departments?.join(", ") || "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {formatDate(p.appointment_date)}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <button
                      onClick={() => handleView(p.patient_id)}
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 14px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
