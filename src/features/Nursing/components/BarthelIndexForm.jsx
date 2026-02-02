import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function BarthelIndexForm({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const storageKey = patient?.id
    ? `nursing_barthel_draft_${patient.id}`
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
        alert("Barthel Index draft saved successfully");
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = {
      patientId: patient.id,
      scale: "Barthel Index",
      values,
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify({ values }));
    alert("Barthel Index submitted successfully");
    onSubmit?.(payload);
  };

  const BARTHEL_SCHEMA = {
    title: "Barthel Index",
    sections: [
      {
        fields: [
          {
            name: "feeding",
            label: "Feeding",
            type: "single-select",
            options: [
              { label: "0 - Unable", value: 0 },
              { label: "5 - Needs help", value: 5 },
              { label: "10 - Independent", value: 10 }
            ]
          },
          {
            name: "bathing",
            label: "Bathing",
            type: "single-select",
            options: [
              { label: "0 - Unable", value: 0 },
              { label: "5 - Independent", value: 5 }
            ]
          },
          {
            name: "grooming",
            label: "Grooming",
            type: "single-select",
            options: [
              { label: "0 - Needs help", value: 0 },
              { label: "5 - Independent", value: 5 }
            ]
          },
          {
            name: "dressing",
            label: "Dressing",
            type: "single-select",
            options: [
              { label: "0 - Unable", value: 0 },
              { label: "5 - Needs help", value: 5 },
              { label: "10 - Independent", value: 10 }
            ]
          },
          {
            name: "bowel_control",
            label: "Bowel Control",
            type: "single-select",
            options: [
              { label: "0 - Incontinent", value: 0 },
              { label: "5 - Occasional accident", value: 5 },
              { label: "10 - Continent", value: 10 }
            ]
          },
          {
            name: "bladder_control",
            label: "Bladder Control",
            type: "single-select",
            options: [
              { label: "0 - Incontinent", value: 0 },
              { label: "5 - Occasional accident", value: 5 },
              { label: "10 - Continent", value: 10 }
            ]
          },
          {
            name: "toilet_use",
            label: "Toilet Use",
            type: "single-select",
            options: [
              { label: "0 - Unable", value: 0 },
              { label: "5 - Needs help", value: 5 },
              { label: "10 - Independent", value: 10 }
            ]
          },
          {
            name: "transfers",
            label: "Transfers (bed to chair and back)",
            type: "single-select",
            options: [
              { label: "0 - Unable", value: 0 },
              { label: "5 - Major help", value: 5 },
              { label: "10 - Minor help", value: 10 },
              { label: "15 - Independent", value: 15 }
            ]
          },
          {
            name: "mobility",
            label: "Mobility",
            type: "single-select",
            options: [
              { label: "0 - Immobile", value: 0 },
              { label: "5 - Wheelchair independent", value: 5 },
              { label: "10 - Walks with help", value: 10 },
              { label: "15 - Independent", value: 15 }
            ]
          },
          {
            name: "stairs",
            label: "Stairs",
            type: "single-select",
            options: [
              { label: "0 - Unable", value: 0 },
              { label: "5 - Needs help", value: 5 },
              { label: "10 - Independent", value: 10 }
            ]
          }
        ]
      }
    ]
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={BARTHEL_SCHEMA}
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
