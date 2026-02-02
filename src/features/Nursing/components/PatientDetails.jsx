import React from "react";
import NursingAssessment from "./NursingAssessment";

export default function PatientDetails({ patient, department, onBack }) {
  return (
    <div style={container}>
      <NursingAssessment
        patient={patient}
        onSubmit={(values) => {
          console.log("Nursing assessment submitted:", values);
        }}
        onBack={onBack}
      />
    </div>
  );
}

const container = {
  padding: 0,
  background: "#f8fafc",
  minHeight: "100vh"
};
