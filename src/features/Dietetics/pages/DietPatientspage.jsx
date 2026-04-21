import React from "react";
import InitialAssessmentForm from "../components/DietInitialAssessmentForm";
import DietFollowupAssessmentForm from "../components/DietFollowupAssessmentForm";
import DietProgressAssessmentForm from "../components/DietProgressAssessmentForm";

export default function DietPatientspage({
  patient,
  mode,
  onBack,
  onSubmit
}) {
  switch (mode) {
    case "followup":
      return (
        <DietFollowupAssessmentForm
          patient={patient}
          onBack={onBack}
          onSubmit={onSubmit}
        />
      );

    case "progress":
      return (
        <DietProgressAssessmentForm
          patient={patient}
          onBack={onBack}
          onSubmit={onSubmit}
        />
      );

    case "group":
      return (
        <div style={{ padding: 40 }}>
          <h2>Group Intervention</h2>
          <button onClick={onBack}>← Back</button>
        </div>
      );

    default:
      return (
        <InitialAssessmentForm
          patient={patient}
          onBack={onBack}
          onSubmit={onSubmit}
        />
      );
  }
}