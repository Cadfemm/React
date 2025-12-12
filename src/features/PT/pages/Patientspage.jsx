import React, { useState } from "react";
import PatientDetails from "../components/PatientDetails";

export default function DepartmentPage({ patients, department }) {

  const [selectedPatient, setSelectedPatient] = useState(null);

  const list = patients.filter(p => p.departments.includes(department));

  // If a patient is selected → show full details
  if (selectedPatient) {
    return (
      <PatientDetails
        patient={selectedPatient}
        department={department}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  // Else → show the list
  return (
    <div style={{ padding: 20 }}>
      <h2>{department} Department</h2>

      {list.length === 0 ? (
        <p>No patients assigned</p>
      ) : (
        list.map(p => (
          <div
            key={p.id}
            onClick={() => setSelectedPatient(p)}
            style={{
              padding: 10,
              marginBottom: 10,
              border: "1px solid #999",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            <strong>{p.name}</strong> — ICD: {p.icd}
          </div>
        ))
      )}
    </div>
  );
}
