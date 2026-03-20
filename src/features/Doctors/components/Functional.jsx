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

  /* ---------------- IADL (Lawton-Brody) scoring ---------------- */
  const iadlScoreMap = {
    telephone: { a: 1, b: 1, c: 1, d: 0 },
    shopping: { a: 1, b: 0, c: 0, d: 0 },
    food: { a: 1, b: 0, c: 0, d: 0 },
    housekeeping: { a: 1, b: 1, c: 0, d: 0 },
    laundry: { a: 1, b: 1, c: 0 },
    transport: { a: 1, b: 1, c: 1, d: 0 },
    medication: { a: 1, b: 0, c: 0 },
    finance: { a: 1, b: 1, c: 0 }
  };

  const calculateIadlTotal = (vals) => {
    const keys = ["telephone", "shopping", "food", "housekeeping", "laundry", "transport", "medication", "finance"];
    return keys.reduce((sum, k) => {
      const value = vals?.[k];
      return sum + (iadlScoreMap[k] && iadlScoreMap[k][value] != null ? iadlScoreMap[k][value] : 0);
    }, 0);
  };

  // Keep `iadl_total` in sync with selected Lawton IADL options.
  useEffect(() => {
    const total = calculateIadlTotal(values);
    setValues((prev) => {
      if (prev.iadl_total === total) return prev;
      return { ...prev, iadl_total: total };
    });
  }, [values]);

  /* ===================== SCHEMAS ===================== */

  const ACTIONS = [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ];

  const ADL_SCHEMA = {
    title: "Functional Assessment",
    subtitle: "ADL",
    actions: ACTIONS,
    fields: [
      { name: "adl_washing", label: "Washing oneself", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "adl_body_care", label: "Caring for body parts", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "adl_toileting", label: "Toileting", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "adl_dressing", label: "Dressing", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "adl_eating", label: "Eating", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "adl_drinking", label: "Drinking", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "adl_health_mgmt", label: "Looking after one’s health", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      { name: "adl_other_selfcare", label: "Other self-care activities", type: "radio-matrix", options: DEPENDENCE_OPTIONS },
      {
        name: "adl_overall_selfcare",
        label: "Overall self-care",
        type: "radio-matrix",
        options: DEPENDENCE_OPTIONS
      },
      {
        name: "adl_other_selfcare_specify",
        label: "Remarks",
        type: "textarea",
      },
    ]
  };

  const IADL_SCHEMA = {
    title: "Lawton - Brody Instrumental Activities of Daily Living (IADL) Scale",
    actions: ACTIONS,
    sections: [
      {
        title: "A. Ability to Use Telephone",
        fields: [
          {
            type: "radio",
            name: "telephone",
            options: [
              { label: "Operates telephone on own initiative", value: "a" },
              { label: "Dials a few well known numbers", value: "b" },
              { label: "Answers telephone but does not dial", value: "c" },
              { label: "Does not use telephone at all", value: "d" }
            ]
          }
        ]
      },
      {
        title: "B. Shopping",
        fields: [
          {
            type: "radio",
            name: "shopping",
            options: [
              { label: "Takes care of all shopping independently", value: "a" },
              { label: "Shops independently for small purchases", value: "b" },
              { label: "Needs to be accompanied on shopping", value: "c" },
              { label: "Unable to shop", value: "d" }
            ]
          }
        ]
      },
      {
        title: "C. Food Preparation",
        fields: [
          {
            type: "radio",
            name: "food",
            options: [
              { label: "Plans and prepares meals independently", value: "a" },
              { label: "Prepares meals if supplied ingredients", value: "b" },
              { label: "Heats and serves prepared meals only", value: "c" },
              { label: "Needs meals prepared", value: "d" }
            ]
          }
        ]
      },
      {
        title: "D. Housekeeping",
        fields: [
          {
            type: "radio",
            name: "housekeeping",
            options: [
              { label: "Maintains house alone with occasional assistance", value: "a" },
              { label: "Performs light daily tasks", value: "b" },
              { label: "Needs help with housekeeping", value: "c" },
              { label: "Does not participate in housekeeping", value: "d" }
            ]
          }
        ]
      },
      {
        title: "E. Laundry",
        fields: [
          {
            type: "radio",
            name: "laundry",
            options: [
              { label: "Does personal laundry completely", value: "a" },
              { label: "Launders small items only", value: "b" },
              { label: "Laundry must be done by others", value: "c" }
            ]
          }
        ]
      },
      {
        title: "F. Mode of Transportation",
        fields: [
          {
            type: "radio",
            name: "transport",
            options: [
              { label: "Travels independently", value: "a" },
              { label: "Arranges own travel via taxi", value: "b" },
              { label: "Travels on public transport when accompanied", value: "c" },
              { label: "Does not travel at all", value: "d" }
            ]
          }
        ]
      },
      {
        title: "G. Responsibility for Medication",
        fields: [
          {
            type: "radio",
            name: "medication",
            options: [
              { label: "Responsible for taking medication correctly", value: "a" },
              { label: "Medication prepared in advance", value: "b" },
              { label: "Not capable of dispensing medication", value: "c" }
            ]
          }
        ]
      },
      {
        title: "H. Ability to Handle Finances",
        fields: [
          {
            type: "radio",
            name: "finance",
            options: [
              { label: "Manages financial matters independently", value: "a" },
              { label: "Manages small purchases but needs help", value: "b" },
              { label: "Incapable of handling money", value: "c" }
            ]
          }
        ]
      },
      {
        title: "Results",
        fields: [
          {
            type: "score-box",
            name: "iadl_total",
            label: "Total IADL Score"
          },
          {
            type: "textarea",
            name: "comments",
            label: "Comments"
          }
        ]
      }
    ]
  };

const MOBILITY_SCHEMA = {
  title: "Functional Assessment",
  subtitle: "Mobility – Walking and moving",
  actions: ACTIONS,

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
          ADL
        </div>
        <div
          style={activeTab === "iadl" ? tabActive : tabBtn}
          onClick={() => setActiveTab("iadl")}
        >
          IADL
        </div>
        <div
          style={activeTab === "mobility" ? tabActive : tabBtn}
          onClick={() => setActiveTab("mobility")}
        >
          Mobility
        </div>
      </div>

      <CommonFormBuilder
        schema={activeTab === "adl" ? ADL_SCHEMA : activeTab === "iadl" ? IADL_SCHEMA : MOBILITY_SCHEMA}
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
