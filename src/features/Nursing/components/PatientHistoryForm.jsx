import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function PatientHistoryForm({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const storageKey = patient?.id
    ? `nursing_patient_history_draft_${patient.id}`
    : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues(parsed.values || {});
      setSubmitted(false);
    }
  }, [storageKey]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    switch (type) {
      case "back":
        onBack?.();
        break;
      case "clear":
        setValues({});
        setSubmitted(false);
        if (storageKey) localStorage.removeItem(storageKey);
        break;
      case "save":
        if (!storageKey) return;
        localStorage.setItem(
          storageKey,
          JSON.stringify({ values, updatedAt: new Date().toISOString() })
        );
        alert("Patient History draft saved successfully");
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = {
      patientId: patient.id,
      scale: "Patient History",
      values,
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify({ values }));
    alert("Patient History submitted successfully");
    onSubmit?.(payload);
  };

  // Check if patient is female
  const isFemale = patient?.sex?.toLowerCase() === "female" || 
                   patient?.sex?.toLowerCase() === "f" || 
                   patient?.gender?.toLowerCase() === "female";

  const baseFields = [
    {
      name: "primary_diagnosis",
      label: "Primary & Secondary Diagnosis",
      type: "textarea",
      placeholder: "Key in from previous medical report"
    },
    {
      type: "subheading",
      label: "Allergies"
    },
    {
      name: "allergy_drug",
      label: "Drug",
      type: "textarea",
      placeholder: "Enter drug allergies"
    },
    {
      name: "allergy_food",
      label: "Food",
      type: "textarea",
      placeholder: "Enter food allergies"
    },
    {
      name: "allergy_environmental",
      label: "Environmental",
      type: "textarea",
      placeholder: "Enter environmental allergies"
    },
    {
      name: "marital_status",
      label: "Marital Status",
      type: "single-select",
      options: [
        { label: "Married", value: "married" },
        { label: "Single", value: "single" },
        { label: "Widowed", value: "widowed" },
        { label: "Divorced", value: "divorced" },
        { label: "Prefer not to say", value: "prefer_not_to_say" }
      ]
    }
  ];

  // Add LMP field only if patient is female
  if (isFemale) {
    baseFields.push({
      name: "lmp",
      label: "Last Menstrual Period (LMP)",
      type: "date",
      showIf: { field: "marital_status", equals: "single" }
    });
  }

  const allFields = [
    ...baseFields,
    {
      name: "employment_status",
      label: "Employment Status",
      type: "single-select",
      options: [
        { label: "Employed", value: "employed" },
        { label: "Unemployed", value: "unemployed" }
      ]
    },
    {
      name: "occupation",
      label: "Occupation",
      type: "textarea",
      placeholder: "Enter occupation"
    },
    {
      name: "education_background",
      label: "Education Background",
      type: "single-select",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Tertiary (Diploma/Degree)", value: "tertiary" },
        { label: "Postgraduate", value: "postgraduate" },
        { label: "Other", value: "other" }
      ]
    },
    {
      name: "living_environment",
      label: "Living Environment",
      type: "single-select",
      options: [
        { label: "Single home", value: "single_home" },
        { label: "Apartment/condominium", value: "apartment" },
        { label: "Old folks home", value: "old_folks_home" },
        { label: "Nursing home", value: "nursing_home" },
        { label: "Other", value: "other" }
      ]
    },
    {
      name: "living_environment_other",
      label: "If Other, specify",
      type: "textarea",
      showIf: { field: "living_environment", equals: "other" }
    },
    {
      name: "main_caregiver",
      label: "Main Caregiver",
      type: "single-select",
      options: [
        { label: "Husband/wife", value: "husband_wife" },
        { label: "Father/mother", value: "father_mother" },
        { label: "Son/daughter", value: "son_daughter" },
        { label: "Maid", value: "maid" },
        { label: "Hired caregiver", value: "hired_caregiver" }
      ]
    },
    {
      type: "subheading",
      label: "Biological Status"
    },
    {
      name: "biological_status",
      label: "Biological Status",
      type: "checkbox-group",
      options: [
        { label: "Comorbidities & Medical history", value: "comorbidities" },
        { label: "Physical limitation", value: "physical_limitation" },
        { label: "Chronic pain / sleep issue", value: "chronic_pain_sleep" }
      ]
    },
    {
      type: "subheading",
      label: "Psychological"
    },
    {
      name: "psychological",
      label: "Psychological",
      type: "checkbox-group",
      options: [
        { label: "Emotional status (anxiety, depression, coping)", value: "emotional_status" },
        { label: "Cognitive Function", value: "cognitive_function" },
        { label: "Stressor", value: "stressor" }
      ]
    },
    {
      type: "subheading",
      label: "Social"
    },
    {
      name: "social",
      label: "Social",
      type: "checkbox-group",
      options: [
        { label: "Family & Caregiver support", value: "family_caregiver_support" },
        { label: "Financial / Insurance status", value: "financial_insurance" },
        { label: "Language/communication barriers", value: "language_communication" },
        { label: "Cultural / religious considerations", value: "cultural_religious" }
      ]
    }
  ];

  const PATIENT_HISTORY_SCHEMA = {
    title: "Patient History",
    sections: [
      {
        fields: allFields
      }
    ]
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={PATIENT_HISTORY_SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        layout="nested"
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <button
            style={{
              padding: "12px 34px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}
