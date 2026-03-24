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
    {
      name: "mobility_present",
      label: "Mobility",
      type: "radio",
      options: ["Walking", "Walking & moving"],
    },
    {
      type: "subheading",
      label: "Walking and moving",
      showIf: { field: "mobility_present", oneOf: ["Walking", "Walking & moving"] },
    },
    {
      type: "subheading",
      label: "Walking",
      showIf: { field: "mobility_present", oneOf: ["Walking", "Walking & moving"] },
    },
    {
      name: "mobility_walking_level",
      label: "",
      type: "radio",
      options: [
        "Independent",
        "Minimal assistance",
        "Moderate assistance",
        "Maximum assistance",
        "Total Dependent",
      ],
      showIf: { field: "mobility_present", oneOf: ["Walking", "Walking & moving"] },
    },
    {
      name: "mobility_support_modes",
      label: "",
      type: "radio",
      options: [
        { label: "Mobility Aid", value: "mobility_aid" },
        { label: "Wheel Chair", value: "wheel_chair" },
        { label: "Others", value: "others" },
      ],
      showIf: {
        field: "mobility_walking_level",
        oneOf: ["Minimal assistance", "Moderate assistance", "Maximum assistance", "Total Dependent"],
      },
    },
    {
      name: "mobility_aid_type",
      label: "Mobility Aid",
      type: "radio",
      labelAbove: true,
      options: [
        "Using walking aids",
        "Walking stick/cane",
        "Elbow crutches",
        "Axillary crutches",
        "Platform crutches",
        "Quadripod",
        "Walking frame",
        "Wheeled walker",
        "Rollator/reverse rollator",
      ],
      showIf: { field: "mobility_support_modes", equals: "mobility_aid" },
    },
    {
      name: "mobility_aid_elbow_crutches",
      label: "Elbow crutches",
      type: "radio",
      options: ["single", "bilateral"],
      showIf: { field: "mobility_aid_type", equals: "Elbow crutches" },
    },
    {
      name: "mobility_aid_axillary_crutches",
      label: "Axillary crutches",
      type: "radio",
      options: ["single", "bilateral"],
      showIf: { field: "mobility_aid_type", equals: "Axillary crutches" },
    },
    {
      name: "mobility_aid_platform_crutches",
      label: "Platform crutches",
      type: "radio",
      options: ["single", "bilateral"],
      showIf: { field: "mobility_aid_type", equals: "Platform crutches" },
    },
    {
      name: "mobility_wheelchair_type",
      label: "Wheelchair",
      type: "radio",
      options: [
        "Manual wheelchair",
        "Electric wheelchair",
      ],
      showIf: { field: "mobility_support_modes", equals: "wheel_chair" },
    },
    {
      name: "mobility_others",
      label: "Others",
      type: "textarea",
      showIf: { field: "mobility_support_modes", equals: "others" },
    },
    {
      name: "mobility_orthosis_prosthesis",
      label: "Orthosis / Prosthesis",
      type: "radio",
      options: ["Orthosis", "Prosthesis"],
      showIf: { field: "mobility_present", oneOf: ["Walking", "Walking & moving"] },
    },
    {
      name: "mobility_orthosis_type",
      label: "Orthosis",
      type: "radio",
      options: ["AFO", "KAFO", "HKAFO", "Brace", "Others"],
      showIf: { field: "mobility_orthosis_prosthesis", equals: "Orthosis" },
    },
    {
      name: "mobility_orthosis_brace_specify",
      label: "Brace (Specify)",
      type: "input",
      showIf: { field: "mobility_orthosis_type", equals: "Brace" },
    },
    {
      name: "mobility_orthosis_others_specify",
      label: "Orthosis - Others (Specify)",
      type: "input",
      showIf: { field: "mobility_orthosis_type", equals: "Others" },
    },
    {
      name: "mobility_prosthesis_type",
      label: "Prosthesis",
      type: "radio",
      options: ["Below knee prosthesis", "Above knee prosthesis", "Others"],
      showIf: { field: "mobility_orthosis_prosthesis", equals: "Prosthesis" },
    },
    {
      name: "mobility_prosthesis_others_specify",
      label: "Prosthesis - Others (Specify)",
      type: "input",
      showIf: { field: "mobility_prosthesis_type", equals: "Others" },
    },
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
