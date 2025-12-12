import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

export default function PablotList({ onSelectPatient }) {
  const [patientsData, setPatientsData] = useState([]);
  const [department, setDepartment] = useState("Neurophysics");

  useEffect(() => {
    const doctor = "Dr. Arvind Rao";
    axios
      .get(`${API}/api/patients/departments/${department}/${doctor}`)
      .then((res) => setPatientsData(res.data))
      .catch((err) => console.error("Error fetching patients:", err));
  }, [department]);

  const formatDate = (d) => new Date(d).toLocaleString();

  const handleEditClick = async (patient) => {
    try {
      const res = await axios.get(`${API}/api/patient_icd_path/${patient.patient_id}`);
      const icd = res.data?.icd_code || "";
      onSelectPatient(patient.patient_id, icd);
    } catch (e) {
      console.error("Error fetching ICD:", e);
      onSelectPatient(patient.patient_id, "");
    }
  };

  return (
    <div style={{ padding: "10px 20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#1f2937" }}>
        Existing Patients Data
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
              <th style={{ padding: "12px 16px", textAlign: "center" }}>
                Action
              </th>
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
                  <td
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                    }}
                  >
                    <button
                      onClick={() => handleEditClick(p)}
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 14px",
                        fontSize: "14px",
                        cursor: "pointer",
                        transition: "background 0.2s ease",
                      }}
                      onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
                      onMouseOut={(e) => (e.target.style.background = "#2563eb")}
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
