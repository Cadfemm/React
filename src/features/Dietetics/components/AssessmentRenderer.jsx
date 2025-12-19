// AssessmentRenderer.jsx
import React from "react";
import PGSGAMetric from "../components/PGSGAMetric";
import MST from "../components/MST";
import NRS from "../components/NRS"

const AssessmentComponents = {
  "PG-SGA-Metric-version": PGSGAMetric,
  "MST": MST,
  "NRS": NRS
  // ... other assessments
};

export default function AssessmentRenderer({ selected, onSave,onBack, initialFormData }) {
  if (!selected) return <p>Select an assessment</p>;
  const Component = AssessmentComponents[selected];
  if (!Component) return <p>No component for {selected}</p>;

  // provide both onSave and onSubmit for the inner component (some components call onSubmit)
  const handleOnSubmit = (payload) => {
    // If the component gives a full payload, convert to the (assessmentName, formData) contract expected by PatientDetails:
    // keep the payload object as formData (you can adapt later if you want to extract notes/score)
    if (onSave) onSave(selected, payload);
  };

  return <Component
           onSave={(name, data) => onSave && onSave(name, data)}
           onSubmit={handleOnSubmit}
           assessmentName={selected}
           initialFormData={initialFormData}
            onBack={onBack} 
         />;
}
