import React, { useState, useEffect, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const BARTHEL_ACTIVITIES = [
  {
    name: "feeding",
    label: "Feeding",
    info: { content: ["0 = unable", "5 = needs help cutting, spreading butter, etc., or requires modified diet", "10 = independent"] },
    options: [{ value: 0, label: "0" }, { value: 5, label: "5" }, { value: 10, label: "10" }]
  },
  {
    name: "bathing",
    label: "Bathing",
    info: { content: ["0 = dependent", "5 = independent (or in shower)"] },
    options: [{ value: 0, label: "0" }, { value: 5, label: "5" }]
  },
  {
    name: "grooming",
    label: "Grooming",
    info: { content: ["0 = needs to help with personal care", "5 = independent face/hair/teeth/shaving (implements provided)"] },
    options: [{ value: 0, label: "0" }, { value: 5, label: "5" }]
  },
  {
    name: "dressing",
    label: "Dressing",
    info: { content: ["0 = dependent", "5 = needs help but can do about half unaided", "10 = independent (including buttons, zips, laces, etc.)"] },
    options: [{ value: 0, label: "0" }, { value: 5, label: "5" }, { value: 10, label: "10" }]
  },
  {
    name: "bowel_control",
    label: "Bowels",
    info: { content: ["0 = incontinent (or needs to be given enemas)", "5 = occasional accident", "10 = continent"] },
    options: [{ value: 0, label: "0" }, { value: 5, label: "5" }, { value: 10, label: "10" }]
  },
  {
    name: "bladder_control",
    label: "Bladder",
    info: { content: ["0 = incontinent, or catheterized and unable to manage alone", "5 = occasional accident", "10 = continent"] },
    options: [{ value: 0, label: "0" }, { value: 5, label: "5" }, { value: 10, label: "10" }]
  },
  {
    name: "toilet_use",
    label: "Toilet Use",
    info: { content: ["0 = dependent", "5 = needs some help, but can do something alone", "10 = independent (on and off, dressing, wiping)"] },
    options: [{ value: 0, label: "0" }, { value: 5, label: "5" }, { value: 10, label: "10" }]
  },
  {
    name: "transfers",
    label: "Transfers (bed to chair and back)",
    info: { content: ["0 = unable, no sitting balance", "5 = major help (one or two people, physical), can sit", "10 = minor help (verbal or physical)", "15 = independent"] },
    options: [{ value: 0, label: "0" }, { value: 5, label: "5" }, { value: 10, label: "10" }, { value: 15, label: "15" }]
  },
  {
    name: "mobility",
    label: "Mobility (on level surfaces)",
    info: { content: ["0 = immobile or < 50 yards", "5 = wheelchair independent, including corners, > 50 yards", "10 = walks with help of one person (verbal or physical) > 50 yards", "15 = independent (but may use any aid; e.g. stick) > 50 yards"] },
    options: [{ value: 0, label: "0" }, { value: 5, label: "5" }, { value: 10, label: "10" }, { value: 15, label: "15" }]
  },
  {
    name: "stairs",
    label: "Stairs",
    info: { content: ["0 = unable", "5 = needs help (verbal, physical, carrying aid)", "10 = independent"] },
    options: [{ value: 0, label: "0" }, { value: 5, label: "5" }, { value: 10, label: "10" }]
  }
];

const BARTHEL_KEYS = BARTHEL_ACTIVITIES.map(a => a.name);

function buildSchema() {
  const fields = BARTHEL_ACTIVITIES.map(activity => ({
    name: activity.name,
    label: activity.label,
    type: "radio",
    info: activity.info,
    options: activity.options.map(opt => ({ value: opt.value, label: opt.label }))
  }));
  fields.push({
    name: "barthel_total",
    label: "Total Score",
    type: "score-box"
  });
  return {
    title: "Barthel Index",
    sections: [
      {
        fields
      }
    ]
  };
}

const BARTHEL_SCHEMA = buildSchema();

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

  const total = useMemo(() => {
    const sum = BARTHEL_KEYS.reduce(
      (acc, key) => acc + (Number(values[key]) || 0),
      0
    );
    return sum;
  }, [values]);

  const valuesWithTotal = useMemo(
    () => ({ ...values, barthel_total: total }),
    [values, total]
  );

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
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify({ values }));
    }
    alert("Barthel Index submitted successfully");
    onSubmit?.(payload);
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={BARTHEL_SCHEMA}
        values={valuesWithTotal}
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
