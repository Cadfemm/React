import React from "react";
import AssessmentRenderer from "./AssessmentRenderer";

/**
 * Creates a wrapper component for Diet assessments that adapts them to the
 * assessment-launcher interface (values, onChange) used by Physiotherapy.
 * Stores data in values.diet_assessment_data[key].
 */
function createDietAssessmentWrapper(assessmentKey) {
  return function DietAssessmentWrapper({ values = {}, onChange }) {
    const assessmentData = values.diet_assessment_data || {};
    const initialFormData = assessmentData[assessmentKey] || {};

    const handleSave = (name, data) => {
      const next = {
        ...assessmentData,
        [assessmentKey]: data
      };
      onChange?.("diet_assessment_data", next);
    };

    return (
      <AssessmentRenderer
        selected={assessmentKey}
        initialFormData={initialFormData}
        onSave={handleSave}
        onBack={undefined}
      />
    );
  };
}

export const DIET_ASSESSMENT_REGISTRY = {
  NRS: createDietAssessmentWrapper("NRS"),
  "Growth Chart": createDietAssessmentWrapper("Growth Chart"),
  "PG-SGA-Metric-version": createDietAssessmentWrapper("PG-SGA-Metric-version"),
  MST: createDietAssessmentWrapper("MST"),
  BIA: createDietAssessmentWrapper("BIA"),
  SGA: createDietAssessmentWrapper("SGA")
};
