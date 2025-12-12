import React from "react";

// Import your assessment components
import PGSGAMetric from "../components/PGSGAMetric";


// Map assessment names → Components
const AssessmentComponents = {
  "PG-SGA-Metric-version": PGSGAMetric,

};

export default function AssessmentRenderer({ selected }) {
  if (!selected) return <p>Select an assessment</p>;

  const Component = AssessmentComponents[selected];

  if (!Component) return <p>No component found for: {selected}</p>;

  return <Component />;
}
