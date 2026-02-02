import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function ADLForm({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const storageKey = patient?.id
    ? `nursing_adl_draft_${patient.id}`
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
        alert("ADL draft saved successfully");
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = {
      patientId: patient.id,
      scale: "ADL",
      values,
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify({ values }));
    alert("ADL submitted successfully");
    onSubmit?.(payload);
  };

  const ADL_SCHEMA = {
    title: "Activities of Daily Living (ADL)",
    sections: [
      {
        fields: [
          {
            name: "personal_hygiene",
            label: "Personal Hygiene",
            type: "single-select",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Supervision", value: "supervision" },
              { label: "Minimal Assistance", value: "minimal" },
              { label: "Moderate Assistance", value: "moderate" },
              { label: "Maximal Assistance", value: "maximal" },
              { label: "Dependent", value: "dependent" }
            ]
          },
          {
            name: "bathing",
            label: "Bathing",
            type: "single-select",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Supervision", value: "supervision" },
              { label: "Minimal Assistance", value: "minimal" },
              { label: "Moderate Assistance", value: "moderate" },
              { label: "Maximal Assistance", value: "maximal" },
              { label: "Dependent", value: "dependent" }
            ]
          },
          {
            name: "dressing",
            label: "Dressing",
            type: "single-select",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Supervision", value: "supervision" },
              { label: "Minimal Assistance", value: "minimal" },
              { label: "Moderate Assistance", value: "moderate" },
              { label: "Maximal Assistance", value: "maximal" },
              { label: "Dependent", value: "dependent" }
            ]
          },
          {
            name: "toileting",
            label: "Toileting",
            type: "single-select",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Supervision", value: "supervision" },
              { label: "Minimal Assistance", value: "minimal" },
              { label: "Moderate Assistance", value: "moderate" },
              { label: "Maximal Assistance", value: "maximal" },
              { label: "Dependent", value: "dependent" }
            ]
          },
          {
            name: "transfer",
            label: "Transfer",
            type: "single-select",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Supervision", value: "supervision" },
              { label: "Minimal Assistance", value: "minimal" },
              { label: "Moderate Assistance", value: "moderate" },
              { label: "Maximal Assistance", value: "maximal" },
              { label: "Dependent", value: "dependent" }
            ]
          },
          {
            name: "mobility",
            label: "Mobility",
            type: "single-select",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Supervision", value: "supervision" },
              { label: "Minimal Assistance", value: "minimal" },
              { label: "Moderate Assistance", value: "moderate" },
              { label: "Maximal Assistance", value: "maximal" },
              { label: "Dependent", value: "dependent" }
            ]
          },
          {
            name: "feeding",
            label: "Feeding",
            type: "single-select",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Supervision", value: "supervision" },
              { label: "Minimal Assistance", value: "minimal" },
              { label: "Moderate Assistance", value: "moderate" },
              { label: "Maximal Assistance", value: "maximal" },
              { label: "Dependent", value: "dependent" }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={ADL_SCHEMA}
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
