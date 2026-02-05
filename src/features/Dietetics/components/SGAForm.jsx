import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export const sgaSchema = {
  title: "Subjective Global Assessment (SGA)",
  subtitle: "Nutritional status assessment",
  sections: [
    {
      title: "Medical History",
      fields: [
        { type: "input", name: "patient_name", label: "Patient Name" },
        { type: "date", name: "assessment_date", label: "Date" }
      ]
    },
    {
      title: "Nutrient Intake",
      fields: [
        {
          type: "radio",
          name: "intake_status",
          label: "Current Intake",
          options: [
            { label: "No change; adequate", value: "adequate" },
            { label: "Inadequate", value: "inadequate" }
          ]
        },
        {
          type: "radio",
          name: "intake_pattern",
          label: "If inadequate",
          showIf: { field: "intake_status", equals: "inadequate" },
          options: [
            { label: "Suboptimal solid diet", value: "suboptimal" },
            { label: "Full fluids / supplements", value: "fluids" },
            { label: "Minimal intake / starvation", value: "minimal" }
          ]
        },
        {
          type: "radio",
          name: "intake_last_2_weeks",
          label: "Nutrient Intake in past 2 weeks",
          options: [
            { label: "Adequate", value: "adequate" },
            { label: "Improved but not adequate", value: "improving" },
            { label: "No improvement / inadequate", value: "poor" }
          ]
        }
      ]
    },
    {
      title: "Weight",
      fields: [
        {
          type: "row",
          fields: [
            { type: "input", name: "usual_weight", label: "Usual Weight (kg)" },
            { type: "input", name: "current_weight", label: "Current Weight (kg)" }
          ]
        },
        {
          type: "radio",
          name: "weight_change_6_months",
          label: "Non-fluid weight change past 6 months",
          options: [
            { label: "< 5% or stable", value: "stable" },
            { label: "5–10% loss", value: "moderate_loss" },
            { label: "> 10% loss ongoing", value: "severe_loss" }
          ]
        },
        {
          type: "radio",
          name: "weight_change_2_weeks",
          label: "Weight change past 2 weeks",
          options: [
            { label: "Increased", value: "increased" },
            { label: "No change", value: "no_change" },
            { label: "Decreased", value: "decreased" }
          ]
        }
      ]
    },
    {
      title: "Symptoms Affecting Intake",
      fields: [
        {
          type: "checkbox-group",
          name: "symptoms",
          label: "Symptoms present",
          options: [
            { label: "Pain on eating", value: "pain" },
            { label: "Anorexia", value: "anorexia" },
            { label: "Nausea", value: "nausea" },
            { label: "Vomiting", value: "vomiting" },
            { label: "Dysphagia", value: "dysphagia" },
            { label: "Diarrhea", value: "diarrhea" },
            { label: "Constipation", value: "constipation" },
            { label: "Feels full quickly", value: "early_satiety" }
          ]
        },
        {
          type: "radio",
          name: "symptom_severity",
          label: "Severity",
          options: [
            { label: "None", value: "none" },
            { label: "Intermittent / mild", value: "mild" },
            { label: "Constant / severe", value: "severe" }
          ]
        }
      ]
    },
    {
      title: "Functional Capacity",
      fields: [
        {
          type: "radio",
          name: "functional_status",
          label: "Functional capacity",
          options: [
            { label: "No dysfunction", value: "normal" },
            { label: "Reduced capacity", value: "reduced" },
            { label: "Bed / chair ridden", value: "bedridden" }
          ]
        },
        {
          type: "radio",
          name: "functional_change_2_weeks",
          label: "Change in past 2 weeks",
          options: [
            { label: "Improved", value: "improved" },
            { label: "No change", value: "no_change" },
            { label: "Decreased", value: "decreased" }
          ]
        }
      ]
    },
    {
      title: "Metabolic Requirement",
      fields: [
        {
          type: "radio",
          name: "high_metabolic_demand",
          label: "High metabolic requirement",
          options: [
            { label: "No", value: "no" },
            { label: "Yes", value: "yes" }
          ]
        }
      ]
    },
    {
      title: "Physical Examination",
      fields: [
        {
          type: "radio-matrix",
          name: "fat_loss",
          label: "Loss of body fat",
          options: [
            { label: "None", value: "none" },
            { label: "Mild / Moderate", value: "moderate" },
            { label: "Severe", value: "severe" }
          ]
        },
        {
          type: "radio-matrix",
          name: "muscle_loss",
          label: "Loss of muscle mass",
          options: [
            { label: "None", value: "none" },
            { label: "Mild / Moderate", value: "moderate" },
            { label: "Severe", value: "severe" }
          ]
        },
        {
          type: "radio-matrix",
          name: "edema",
          label: "Edema / Ascites",
          options: [
            { label: "None", value: "none" },
            { label: "Mild / Moderate", value: "moderate" },
            { label: "Severe", value: "severe" }
          ]
        }
      ]
    },
    {
      title: "SGA Rating",
      fields: [
        {
          type: "radio",
          name: "sga_rating",
          options: [
            { label: "A – Well nourished", value: "A" },
            { label: "B – Mild / Moderate malnutrition", value: "B" },
            { label: "C – Severe malnutrition", value: "C" }
          ]
        }
      ]
    },
    {
      title: "Contributing Factors",
      fields: [
        {
          type: "checkbox-group",
          name: "contributing_factors",
          options: [
            { label: "Cachexia", value: "cachexia" },
            { label: "Sarcopenia", value: "sarcopenia" }
          ]
        }
      ]
    }
  ]
};

const initialValues = {
  patient_name: "",
  assessment_date: "",
  intake_status: "",
  intake_pattern: "",
  intake_last_2_weeks: "",
  usual_weight: "",
  current_weight: "",
  weight_change_6_months: "",
  weight_change_2_weeks: "",
  symptoms: [],
  symptom_severity: "",
  functional_status: "",
  functional_change_2_weeks: "",
  high_metabolic_demand: "",
  fat_loss: "",
  muscle_loss: "",
  edema: "",
  sga_rating: "",
  contributing_factors: []
};

export default function SGAForm({
  onSave,
  onSubmit,
  assessmentName = "SGA",
  initialFormData = null,
  onBack
}) {
  const [values, setValues] = useState(() => ({ ...initialValues, ...(initialFormData || {}) }));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = values;
    if (onSave) onSave(assessmentName, payload);
    if (onSubmit) onSubmit(payload);
  };

  return (
    <div>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          style={{
            marginBottom: 16,
            padding: "8px 16px",
            background: "#6b7280",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          ← Back
        </button>
      )}
      <CommonFormBuilder
        schema={sgaSchema}
        values={values}
        onChange={handleChange}
        submitted={submitted}
      />
      <button
        type="button"
        onClick={handleSubmit}
        style={{
          marginTop: 16,
          padding: "12px 24px",
          background: "#0c3161",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: 600
        }}
      >
        Save SGA Assessment
      </button>
    </div>
  );
}
