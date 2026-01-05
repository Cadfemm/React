import React, { useMemo, useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== OPTIONS ===================== */

const DEPENDENCE_OPTIONS = [
  { label: "Independent", value: 0 },
  { label: "Minimal dependence", value: 1 },
  { label: "Moderate dependence", value: 2 },
  { label: "Maximum dependence", value: 3 },
  { label: "Total dependence", value: 4 }
];

export default function FunctionalAssessment({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("adl");

  /* ---------------- STORAGE KEY ---------------- */
  const storageKey = patient
    ? `functional_assessment_draft_${patient.name}`
    : null;

  /* ---------------- LOAD DRAFT ---------------- */
  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues(parsed.values || {});
    }
  }, [storageKey]);

  /* ---------------- CHANGE ---------------- */
const onChange = (name, value) => {
  setValues(v => ({
    ...v,
    [name]: isNaN(value) ? value : Number(value)
  }));
};


  /* ---------------- ACTION HANDLER ---------------- */
  const handleAction = (type) => {
    switch (type) {
      case "back":
        onBack?.();
        break;

      case "clear":
        setValues({});
        setSubmitted(false);
        localStorage.removeItem(storageKey);
        break;

      case "save":
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            values,
            updatedAt: new Date().toISOString()
          })
        );
        alert("Functional assessment draft saved");
        break;

      case "print":
        window.print();
        break;

      default:
        break;
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Functional Assessment submitted");
  };

  /* ===================== SCHEMAS ===================== */

  const ADL_SCHEMA = {
    title: "Functional Assessment",
    subtitle: "ADL & IADL",
    actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
    fields: [
      { name: "washing", label: "Washing oneself", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "body_care", label: "Caring for body parts", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "toileting", label: "Toileting", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "dressing", label: "Dressing", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "eating", label: "Eating", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "drinking", label: "Drinking", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "health_mgmt", label: "Looking after one’s health", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "other_selfcare", label: "Other self-care activities", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      {
        name: "overall_selfcare",
        label: "Overall self-care",
        type: "radio-matrix",
        options: DEPENDENCE_OPTIONS
      },
            {
        name: "other_selfcare_specify",
        label: "Remarks",
        type: "textarea",
      },
    ]
  };

const MOBILITY_SCHEMA = {
  title: "Functional Assessment",
  subtitle: "Mobility – Walking and moving",
  actions: ADL_SCHEMA.actions,

  fields: [
    /* ================= PRIMARY SELECTION ================= */
    {
      name: "mobility_category",
      label: "Mobility Type",
      type: "single-select",
      options: [
        { label: "1. Walking – Unaided", value: 1 },
        { label: "2. Walking – Using walking aids", value: 2 },
        { label: "3. Wheelchair mobility", value: 3 },
        { label: "4. Dependent mobility", value: 4 }
      ],
      validation: { required: true }
    },

    /* ================= 1. WALKING – UNAIDED ================= */

    {
      
name:"Walking_Unaided",
      label: "Walking – Unaided",
      helper:
        "Walks independently without assistive device",
      showIf: { field: "mobility_category", equals: 1 }
    },

    /* ================= 2. WALKING – USING AIDS ================= */

    {
      name: "walking_aid_used",
      label: "Walking aid used",
      type: "single-select",
      options: [
        { label: "Walking stick / cane", value: "cane" },
        { label: "Elbow crutches – Single", value: "elbow_single" },
        { label: "Elbow crutches – Bilateral", value: "elbow_bilateral" },
        { label: "Axillary crutches – Single", value: "axillary_single" },
        { label: "Axillary crutches – Bilateral", value: "axillary_bilateral" },
        { label: "Platform – Single", value: "platform_single" },
        { label: "Platform – Bilateral", value: "platform_bilateral" },
        { label: "Quadripod / quad cane", value: "quad" },
        { label: "Walking frame", value: "frame" },
        { label: "Wheeled walker", value: "wheeled" },
        { label: "Rollator / reverse rollator", value: "rollator" },
        { label: "Other (specify)", value: "other" }
      ],
      showIf: { field: "mobility_category", equals: 2 }
    },
    {
      name: "walking_aid_other",
      label: "Other Walking Aid",
      type: "textarea",
      showIf: { field: "walking_aid_used", equals: "other" }
    },

    /* ================= 3. WHEELCHAIR MOBILITY ================= */

    {
      name: "wheelchair_mobility_type",
      label: "Wheelchair Mobility",
      type: "single-select",
      options: [
        {
          label: "Able to self-propel (short distances)",
          value: "short"
        },
        {
          label: "Able to self-propel (long distances)",
          value: "long"
        },
        {
          label: "Unable to self-propel",
          value: "unable"
        }
      ],
      showIf: { field: "mobility_category", equals: 3 }
    },

    /* ================= 4. DEPENDENT MOBILITY ================= */

    {name:"dependent_mobility",
      label: "Dependent mobility",
      helper:
        "Dependent on another person for mobility",
      showIf: { field: "mobility_category", equals: 4 }
    }
  ]
};



  /* ===================== UI ===================== */

  return (
    <div style={mainContent}>
      {/* ---------- TAB BAR ---------- */}
      <div style={tabBar}>
        <div
          style={activeTab === "adl" ? tabActive : tabBtn}
          onClick={() => setActiveTab("adl")}
        >
          ADL & IADL
        </div>
        <div
          style={activeTab === "mobility" ? tabActive : tabBtn}
          onClick={() => setActiveTab("mobility")}
        >
          Mobility
        </div>
      </div>

      <CommonFormBuilder
        schema={activeTab === "adl" ? ADL_SCHEMA : MOBILITY_SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
      >
        <div style={submitRow}>
          <button style={submitBtn} onClick={handleSubmit}>
            Submit Functional Assessment
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}

/* ===================== STYLES ===================== */

const mainContent = { margin: "0 auto" };

const tabBar = {
  display: "flex",
  gap: 10,
  justifyContent: "center",
  borderBottom: "1px solid #cccccc",
  marginBottom: 12
};

const tabBtn = {
  padding: "10px 22px",
border:"none !important",
  background: "#ffffff07",
  fontWeight: 600,
  color:"#0f172a",
  cursor: "pointer"
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2451b3ff",
  color: "#2451b3ff"
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
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700
};
