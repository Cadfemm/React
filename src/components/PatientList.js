import React, { useEffect, useState } from "react";

export default function PatientList({ selectedPatientId }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("/patients_list")
      .then((res) => res.json())
      .then(setPatients)
      .catch((err) => console.error("Error loading patient list", err));
  }, []);

  // Filter the patients based on the selected patient ID
  const filteredPatient = patients.find((p) => p.id === selectedPatientId);

  return (
    <div style={{ padding: "20px" }}>
      {filteredPatient ? (
        <div>
         
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#F1F1F1",
                  border:'1px solid #353333ff',
                  color: "#3A3FAD",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                <th style={{ padding: "10px",border: "1px solid #000" }}>Name</th>
                <th style={{ padding: "10px" ,border: "1px solid #000"}}>Gender</th>
                <th style={{ padding: "10px",border: "1px solid #000" }}>Marital Status</th>
                <th style={{ padding: "10px",border: "1px solid #000" }}>Nationality</th>
                <th style={{ padding: "10px" ,border: "1px solid #000"}}>Occupation</th>
                <th style={{ padding: "10px" ,border: "1px solid #000"}}>Date of Birth</th>
                <th style={{ padding: "10px",border: "1px solid #000" }}>Registered Date</th>
                <th style={{ padding: "10px" ,border: "1px solid #000"}}>Created Date</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td style={{ padding: "10px",border: "1px solid #000" }}>{filteredPatient.name}</td>
                <td style={{ padding: "10px",border: "1px solid #000" }}>{filteredPatient.sex}</td>
                <td style={{ padding: "10px" ,border: "1px solid #000"}}>{filteredPatient.marital}</td>
                <td style={{ padding: "10px",border: "1px solid #000" }}>{filteredPatient.nationality}</td>
                <td style={{ padding: "10px",border: "1px solid #000" }}>{filteredPatient.occupation}</td>
                <td style={{ padding: "10px" ,border: "1px solid #000"}}>{filteredPatient.dob}</td>
                <td style={{ padding: "10px",border: "1px solid #000" }}>
                  {filteredPatient.registered_date}
                </td>
                <td style={{ padding: "10px",border: "1px solid #000" }}>
                  {filteredPatient.created_date}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading patient details...</p>
      )}
    </div>
  );
}
