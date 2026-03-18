import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function PaedIASpeechLanguage({ patient, onBack }) {

  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Paediatric Speech Assessment", values);
  };

  /* ================= SUBJECTIVE ================= */

  const SUBJECTIVE_SCHEMA = {
    title: "",
    sections: [
      {
        title: "Subjective",
        fields: [

          {
            name: "accompaniedBy",
            label: "Patient was seen",
            type: "radio",
            options: [
              { label: "Unaccompanied", value: "unaccompanied" },
              { label: "Accompanied by parent(s)/guardian(s)", value: "accompanied" }
            ]
          },

          {
            name: "consent",
            label: "Consent (Verbal)",
            type: "textarea",
            placeholder:
              "Verbal consent was obtained from the caregiver."
          },

          { type: "subheading", label: "Chief Complaint" },

          {
            name: "chiefComplaint",
            label: "Family / caregiver reported",
            type: "multi-select-dropdown",
            options: [
              { label: "Understanding spoken language", value: "receptive" },
              { label: "Expressive language", value: "expressive" },
              { label: "Speech clarity", value: "speech" },
              { label: "Social communication", value: "social" },
              { label: "Fluency", value: "fluency" },
              { label: "Voice quality", value: "voice" },
              { label: "Feeding / swallowing", value: "feeding" }
            ]
          },

          { type: "subheading", label: "Birth History" },

          {
            type: "row",
            fields: [
              {
                name: "pregnancy",
                label: "Pregnancy",
                type: "single-select",
                options: [
                  { label: "Term", value: "term" },
                  { label: "Preterm", value: "preterm" }
                ]
              },
              {
                name: "delivery",
                label: "Type of delivery",
                type: "single-select",
                options: [
                  { label: "SVD", value: "svd" },
                  { label: "C-section", value: "csection" },
                  { label: "Forceps", value: "forceps" },
                  { label: "Vacuum", value: "vacuum" }
                ]
              }
            ]
          },

          {
            name: "birthComplication",
            label: "Birth complication",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },

          {
            name: "birthRemarks",
            label: "Remarks",
            type: "textarea",
            showIf: {
              field: "birthComplication",
              equals: "YES"
            }
          },

          { type: "subheading", label: "Medical History" },

          {
            name: "medicalHistory",
            type: "multi-select-dropdown",
            options: [
              "Tonsillitis",
              "Adenoidectomy",
              "Sleeping difficulties",
              "Snoring",
              "Breathing difficulties",
              "Frequent colds",
              "Chronic ear infections",
              "Hearing loss"
            ].map(v => ({ label: v, value: v }))
          }

        ]
      }
    ]
  };

  /* ================= OBJECTIVE ================= */

  const OBJECTIVE_SCHEMA = {
    title: "",
    sections: [
      {
        title: "Objective",
        fields: [

          { type: "subheading", label: "General Observation" },

          {
            type: "row",
            fields: [
              {
                name: "sitting",
                label: "Sitting in",
                type: "single-select",
                options: [
                  { label: "Chair", value: "chair" },
                  { label: "Wheel chair", value: "wheelchair" }
                ]
              },
              {
                name: "behaviouralRegulation",
                label: "Behavioural regulation",
                type: "single-select",
                options: [
                  { label: "Calm", value: "calm" },
                  { label: "Active", value: "active" },
                  { label: "Easily distracted", value: "distracted" }
                ]
              }
            ]
          },

          {
            name: "eyeContact",
            label: "Eye contact",
            type: "single-select",
            options: [
              { label: "Appropriate", value: "appropriate" },
              { label: "Reduced", value: "reduced" },
              { label: "Avoids", value: "avoids" }
            ]
          },

          { type: "subheading", label: "Communication Screening" },

          {
            name: "jointAttention",
            label: "Joint attention",
            type: "single-select",
            options: ["Intact", "Reduced", "Absent"]
          },

          {
            name: "expressiveLanguage",
            label: "Expressive language",
            type: "single-select",
            options: [
              { label: "WNL", value: "wnl" },
              { label: "Reduced", value: "reduced" }
            ]
          }

        ]
      }
    ]
  };

  /* ================= ASSESSMENT ================= */

  const ASSESSMENT_SCHEMA = {
    title: "",
    sections: [
      {
        title: "Assessment",
        fields: [

          {
            name: "noDisorder",
            label: "No speech and language disorders observed",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },

          {
            name: "diagnoses",
            label: "The child presents with",
            type: "multi-select-dropdown",
            options: [
              "Specific speech articulation disorder",
              "Receptive language disorder",
              "Expressive language disorder",
              "Mixed receptive-expressive language disorder",
              "Stuttering",
              "Cluttering"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "analysisRemarks",
            label: "Remarks",
            type: "textarea"
          },

          {
            name: "overallSeverity",
            label: "Overall severity",
            type: "single-select",
            options: [
              { label: "Mild", value: "mild" },
              { label: "Moderate", value: "moderate" },
              { label: "Severe", value: "severe" }
            ]
          }

        ]
      }
    ]
  };

  /* ================= PLAN ================= */

  const PLAN_SCHEMA = {
    title: "",
    sections: [
      {
        title: "Plan",
        fields: [
          {
            name: "others",
            label: "Others",
            type: "textarea"
          }
        ]
      }
    ]
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  const tabOrder = ["subjective", "objective", "assessment", "plan"];

  return (
    <div>

      {/* ===== TABS ===== */}

      <div style={tabBar}>
        {tabOrder.map(tab => (
          <div
            key={tab}
            style={activeTab === tab ? tabActive : tabBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* ===== FORM ===== */}

      <CommonFormBuilder
        schema={schemaMap[activeTab]}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
      />

      {/* ===== NAVIGATION ===== */}

      <div style={submitRow}>
        {activeTab !== "plan" ? (
          <button
            style={submitBtn}
            onClick={() => {
              const idx = tabOrder.indexOf(activeTab);
              const next = tabOrder[idx + 1];
              setActiveTab(next);
            }}
          >
            Next
          </button>
        ) : (
          <button style={submitBtn} onClick={handleSubmit}>
            Submit Assessment
          </button>
        )}
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
};

const tabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer"
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2563EB",
  color: "#2563EB"
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 20
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600
};