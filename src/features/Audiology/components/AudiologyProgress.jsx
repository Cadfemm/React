import React, { useState, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import { localDateTimeString } from "../../../shared/utils/dateFormatter";
import PatientCard from "../../../shared/cards/PatientCard";

const TAB_ORDER = ["subjective", "objective", "assessment", "plan"];

export default function AudiologyProgressAssessmentForm({ patient, onSubmit, onBack }) {
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
            type: "checkbox-group",
            options: [
              { label: "Auditory",    value: "auditory"    },
              { label: "Tinnitus",    value: "tinnitus"    },
              { label: "Hyperacusis", value: "hyperacusis" },
              { label: "Vestibular",  value: "vestibular"  },
            ],
          },
          {
            name: "consent",
            label: "Consent",
            type: "checkbox-group",
            options: [{
              label: "Consultation has been given based on findings. Client was in his/her best interest.",
              value: "yes",
            }],
          },
          { name: "new_complaints", label: "New Complaint(s)", type: "textarea" },
           {
            name: "audio_session",
            label: "Session(s)",
            type: "custom",
            render: ({ values, onChange }) => (
                <input
                min="1"
                max="1000"
                type="number"
                name="audio_session"
                value={values.audio_session || "1"}
                onChange={(e) => onChange("audio_session", e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8
                }}
                />
            )
            },
        ],
      }],
    },

    objective: {
      actions: ACTIONS,
      sections: [{
        fields: [
          { name: "case_overview", label: "Case Overview", type: "textarea" },
          {
            name: "modalities",
            label: "Modalities",
            type: "checkbox-group",
            options: [
              { label: "Home Exercise",       value: "home_exercise"   },
              { label: "In Office Training",  value: "office_training" },
              { label: "Both",                value: "both"            },
              { label: "Device-Based Therapy",value: "device_based"   },
            ],
          },
         {
            name: "strategy_category",
            label: "Strategies Category",
            type: "radio",
            options: [
                { label: "Auditory", value: "auditory" },
                { label: "Tinnitus", value: "tinnitus" },
                { label: "Hyperacusis", value: "hyperacusis" },
                { label: "Vestibular", value: "vestibular" },
            ],
            },

            {
            name: "strategies_auditory",
            label: "Strategies",
            type: "checkbox-group",
            showIf: {
                field: "strategy_category",
                equals: "auditory",
            },
            options: [
                { label: "Hearing Aid Trial", value: "hearing_aid_trial" },
                { label: "Hearing Aid Fitting", value: "hearing_aid_fitting" },
                { label: "Hearing Aid Verification", value: "hearing_aid_verification" },
                { label: "Hearing Aid Validation", value: "hearing_aid_validation" },
                { label: "Auditory Training", value: "auditory_training" },
            ],
            },

            {
            name: "strategies_tinnitus",
            label: "Strategies",
            type: "checkbox-group",
            showIf: {
                field: "strategy_category",
                equals: "tinnitus",
            },
            options: [
                { label: "Tinnitus Retraining Therapy", value: "trt" },
                { label: "Sound Therapy", value: "sound_therapy" },
                {
                label: "Hearing Aids or Assistive Devices",
                value: "assistive_devices",
                },
                { label: "Counselling", value: "counselling" },
            ],
            },

            {
            name: "strategies_hyperacusis",
            label: "Strategies",
            type: "checkbox-group",
            showIf: {
                field: "strategy_category",
                equals: "hyperacusis",
            },
            options: [
                {
                label: "Sound Desensitisation or Sound Tolerance Training",
                value: "sound_desensitisation",
                },
                {
                label: "Hearing Aids or Assistive Devices",
                value: "assistive_devices",
                },
                {
                label: "Environmental Modification",
                value: "environmental_modification",
                },
                { label: "Counselling", value: "counselling" },
            ],
            },

            {
            name: "strategies_vestibular",
            label: "Strategies",
            type: "checkbox-group",
            showIf: {
                field: "strategy_category",
                equals: "vestibular",
            },
            options: [
                {
                label: "Vestibular Rehabilitation Exercises",
                value: "vestibular_rehab",
                },
                {
                label: "Canalith Repositioning Maneuver",
                value: "crm",
                },
                {
                label: "Gaze Stability Training",
                value: "gaze_stability",
                },
                {
                label: "Fall Prevention Education",
                value: "fall_prevention",
                },
                {
                label: "Psychosocial Counseling",
                value: "psychosocial_counselling",
                },
            ],
            },
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
      sections: [{
        fields: [
         
          {
            name: "tasks",
            type: "dynamic-section",
            fields: [
              { name: "task",        label: "Task",             type: "input"    },
              {
                name: "achievement",
                label: "Achievement",
                type: "radio",
                labelAbove: true,
                options: [
                  { label: "Excellent", value: "excellent" },
                  { label: "Good",      value: "good"      },
                  { label: "Fair",      value: "fair"      },
                  { label: "Poor",      value: "poor"      },
                ],
              },
              { name: "comment", label: "Comment / Remark", type: "input" },
            ],
          },
        ],
      }],
    },

    plan: {
      actions: ACTIONS,
      sections: [{
        fields: [
          { name: "plan",    label: "Plan",    type: "textarea" },
          { name: "comment", label: "Comment", type: "textarea" },
          { name: "remark",  label: "Remark",  type: "textarea" },
        ],
      }],
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
