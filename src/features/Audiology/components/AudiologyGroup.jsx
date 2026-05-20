import React, { useState, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import { localDateTimeString } from "../../../shared/utils/dateFormatter";
import PatientCard from "../../../shared/cards/PatientCard";

const TAB_ORDER = ["subjective", "objective", "assessment", "plan"];

export default function AudiologyGroupAssessmentForm({ patient, onSubmit, onBack }) {
  const [form,      setForm]      = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  const storageKey = patient ? `audiology_progress_draft_${patient.id}` : null;

  const setField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleAction = (type) => {
    if (type === "back")  { onBack?.(); return; }
    if (type === "clear") {
      if (window.confirm("Clear all form data?")) {
        setForm({});
        if (storageKey) localStorage.removeItem(storageKey);
      }
      return;
    }
    if (type === "save") {
      if (storageKey) localStorage.setItem(storageKey, JSON.stringify({ values: form, updatedAt: new Date() }));
      alert("Progress draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(form);
    alert("Audiology progress assessment submitted");
  };

  const ACTIONS = [
    { type: "back",  label: "Back"  },
    { type: "clear", label: "Clear" },
    { type: "save",  label: "Save"  },
  ];

  const schemaMap = useMemo(() => ({
    subjective: {
      actions: ACTIONS,
      sections: [{
        fields: [
          {
            name: "session_for",
            label: "Session For",
            type: "radio",
            options: [
              { label: "Education Program ",    value: "education_program"    },
              { label: "Leisure Activities",    value: "leisure_activities"    },
              { label: "Group Support", value: "group_support" },
            ],
          },
          {
            name: "consent",
            label: "Consent",
            type: "checkbox-group",
            options: [{
              label: "Client was in his/her best interest.",
              value: "yes",
            }],
          },
        ],
      }],
    },

    objective: {
      actions: ACTIONS,
      sections: [{
        fields: [
          { name: "topics", label: "Topics", type: "textarea" },
          { name: "strategies", label: "Strategies", type: "textarea" },
          {
            name: "objectives",
            label: "Objective(s)",
            type: "dynamic-section",
            fields: [{ name: "objective", label: "Objective", type: "input" }],
          },
        ],
      }],
    },

  assessment: {
  actions: ACTIONS,
  sections: [
    {
      fields: [
        {
          name: "activities",
          label: "",
          type: "dynamic-section",
          fields: [
            {
              name: "activity",
              label: "Activity",
              type: "input",
            },
            {
              name: "remark",
              label: "Comment / Remark",
              type: "input",
            },
          ],
        },
      ],
    },
  ],
},

    plan: {
  actions: ACTIONS,
  sections: [
    {
      fields: [
        { name: "plan", label: "Plan", type: "textarea" },
        { name: "comment", label: "Comment", type: "textarea" },
        { name: "remark", label: "Remark", type: "textarea" },
        {
          name: "participants",
          label: "Participants",
          type: "dynamic-section",
          addMoreText: "This entry will be link directly to all client’s records",
          fields: [
            {
              name: "clientName",
              label: "Client’s Name",
              type: "input",
            },
            {
              name: "idNo",
              label: "ID No",
              type: "input",
            },
            {
              name: "mrnNo",
              label: "MRN No",
              type: "input",
            },
          ],
        },
      ],
    },
  ],
},
  }), []);

  /* ── Render ── */
  return (
    <div style={mainContent}>
      {/* Patient Information Card */}
      <PatientCard patient={patient} />

      {/* SOAP Tabs */}
      <div style={tabBar}>
        {TAB_ORDER.map(tab => (
          <div
            key={tab}
            style={activeTab === tab ? tabActive : tabBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Active tab form */}
      <CommonFormBuilder
        schema={schemaMap[activeTab]}
        values={form}
        onChange={setField}
        submitted={submitted}
        onAction={handleAction}
      >
        <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button
              type="button"
              style={submitBtn}
              onClick={() => {
                const idx = TAB_ORDER.indexOf(activeTab);
                if (idx < TAB_ORDER.length - 1) setActiveTab(TAB_ORDER[idx + 1]);
              }}
            >
              Next
            </button>
          ) : (
            <button type="button" style={submitBtn} onClick={handleSubmit}>
              Submit Audiology Progress
            </button>
          )}
        </div>
      </CommonFormBuilder>
    </div>
  );
}

/* ── Styles — identical to AudiologyAdultIA ── */
const mainContent = { margin: "0 auto", width: "100%" };

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12,
};

const tabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#0f172a",
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2451b3",
  color: "#2451b3",
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 20,
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
};
