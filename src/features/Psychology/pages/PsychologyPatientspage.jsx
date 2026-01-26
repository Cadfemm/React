import React, { useState } from "react";
import PsychologyAssessment from "../components/PsychologyAssessment";
import { useHistory } from "react-router-dom";



export default function PsychologyDepartmentPage({ patients, department }) {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const list = patients.filter(p => p.departments.includes(department));

  // If patient is selected → show PsychologyAssessment as FULL component
  if (selectedPatient) {
    return (
      <PsychologyAssessment 
        patient={selectedPatient} 
        onSubmit={(values) => {
          console.log("Psychology assessment submitted:", values);
        }}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  // Else show list only
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
              marginBottom: 10,
              padding: 10,
              border: "1px solid #888",
              borderRadius: 8,
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

