import React, { useState, useEffect } from "react";
import { BoldIcon } from "lucide-react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import { DIET_ASSESSMENT_REGISTRY } from "./DietAssessmentWrapper";

export default function InitialAssessmentForm({ patient, onSubmit, onBack }) {
  const [form, setForm] = useState({
    chief_complaint: "",
    additional_allergic_conditions: "",
    medical_history: patient.medical_history || "",
    family_history: patient.family_history || "",  // NEW FIELD PREFILLED
    oral_intake: "",
    tube_type: "",
    swallowing_issue: "",
    chewing_issue: "",
    dentition_issue: "",
    appetite: "",
    bo: "",
    bo_details: "",
    bo_pattern_details: "",
    pu: "",
    pu_details: "",
    voiding_method: "",
    voiding_method_other: "",
    sleep: "",
    nausea: "",
    vomiting: "",
    other_complaints: "",
    breakfast_diet: [], breakfast_time: "",
    morning_tea_diet: [], morning_tea_time: "",
    lunch_diet: [], lunch_time: "",
    afternoon_tea_diet: [], afternoon_tea_time: "",
    dinner_diet: [], dinner_time: "",
    supper_diet: [], supper_time: "",
    meal_plan_feeding_type: [],
    meal_plan_enteral_details: "",
    meal_plan_mixed_details: "",
    meal_plan_fluid_details: "",
    from_date: "", to_date: "",
    diagnosis_problems: [], // Array of {problem, etiology, signs}
    diet_breakfast: "",
diet_morning_tea: "",
diet_lunch: "",
diet_afternoon_tea: "",
diet_supper: "",
diet_dinner: "",
feeding_type: "",
    enteral_feeding_details: "",
    enteral_feeding_table_rows: [{ time: "", scoops: "", water: "", flushing: "" }],
    mixed_feeding_details: "",
    mixed_feeding_table_rows: [{ time: "", scoops: "", water: "", flushing: "" }],
    iddsi_level: "",
fluid_intake_details: "",
    ffq: "",
    ons_regime: "",
    weight_record_date: "",
    wheelchair_weight: patient.wheelchair_weight || "30",
    wheelchair_type: patient.wheelchair_type || "light",
    diet_assessment_data: {},
    diet_prognosis: "",
    diet_intervention: [],
    diet_intervention_initiate_nutrition: "",
    diet_intervention_monitor_intake: "",
    diet_intervention_document_plan: "",
    diet_intervention_order_consult: "",
    diet_intervention_supplements_enteral: "",
    diet_intervention_others: "",
    plan_short_term_goals: "",
    plan_long_term_goals: "",
    plan_review_date: "",
    plan_referral_type: "",
    plan_referral_internal: [],
    plan_referral_internal_others: "",
    plan_referral_internal_memo: null,
    plan_referral_external_memo: null,
  });
// ----------------------------------------------
// DOCTOR REPORTS STATE + LOAD
// ----------------------------------------------
const [doctorReports, setDoctorReports] = useState([]);
const [showProblemChart, setShowProblemChart] = useState(false);

const IDNT_PROBLEM_CHART = {
  "1. Energy Balance": [
    {
      label: "Increased energy expenditure",
      etiology: "related to insufficient energy consumption",
    },
    {
      label: "Inadequate energy intake",
      etiology: "related to excessive caloric consumption",
    },
    {
      label: "Excessive energy intake",
      etiology: "related to prolonged inadequate intake",
    },
    {
      label: "Predicted suboptimal energy intake",
      etiology: "related to insufficient protein and energy intake",
    },
        {
      label: "Predicted excessive energy intake",
      etiology: "related to insufficient protein and energy intake",
    },
  ],

  "2. Oral or Nutrition Support Intake": [
    {
      label: "Inadequate oral intake",
      etiology: "related to swallowing difficulty",
    },
    {
      label: "Excessive oral intake",
      etiology: "related to excessive oral nutrition support",
    },
    {
      label: "Inadequate enteral nutrition infusion",
      etiology: "related to interruption of enteral feeding",
    },
    {
      label: "Excessive enternal nutrition infusion",
      etiology: "related to inadequate parenteral delivery",
    },
        {
      label: "Less than optimal enteral nutrition composition or modality",
      etiology: "related to inadequate parenteral delivery",
    },
            {
      label: "Inadequate parenteral nutrition infusion",
      etiology: "related to inadequate parenteral delivery",
    },
            {
      label: "Excessive parenteral nutrition infusion",
      etiology: "related to inadequate parenteral delivery",
    },
            {
      label: "Less than optimal parenteral nutrition composition or modality",
      etiology: "related to inadequate parenteral delivery",
    },        {
      label: "Limited food acceptance",
      etiology: "related to inadequate parenteral delivery",
    },
  ],

  "3. Fluid Intake": [
    {
      label: "Inadequate fluid intake",
      etiology: "related to reduced fluid consumption",
    },
    {
      label: "Excessive fluid intake",
      etiology: "related to excessive fluid administration",
    },
  ],

  "4. Bioactive Substances": [
    {
      label: "Suboptimal bioactive substance intake",
      etiology: "related to inadequate intake of functional food components",
    },
    {
      label: "Excessive bioactive substance intake",
      etiology: "related to excessive supplement consumption",
    },
    {
      label: "Excessive alcohol intake",
      etiology: "related to habitual alcohol consumption",
    },
  ],

  "5. Nutrient": [
    {
      label: "Increased nutrient needs",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Malnutrition",
      etiology: "related to reduced carbohydrate consumption",
    },
    {
      label: "Inadequate protein-energy intake",
      etiology: "related to excessive carbohydrate intake",
    },
    {
      label: "Decreased nutrient needs",
      etiology: "related to insufficient fat consumption",
    },
    {
      label: "Imbalance of nutrients",
      etiology: "related to insufficient vitamin intake",
    },

  ],

  "5.6 Fat & Cholesterol": [
    {
      label: "Inadequate fat intake",
      etiology: "related to poor protein food choices",
    },
      {
      label: "Excessive fat intake",
      etiology: "related to poor protein food choices",
    },
        {
      label: "Less than optimal intake of types of fats",
      etiology: "related to poor protein food choices",
    },
  ],

"5.7 Protein": [
    {
      label: "Inadequate protein intake",
      etiology: "related to poor protein food choices",
    },
      {
      label: "Excessive protein intake",
      etiology: "related to poor protein food choices",
    },
        {
      label: "Less than optimal intake of types of proteins or amino acids",
      etiology: "related to poor protein food choices",
    },
  ],

  "5.8 Carbohydrate and Fiber": [
    {
      label: "Inadequate carbohydrate intake",
      etiology: "related to poor protein food choices",
    },
      {
      label: "Excessive carbohydrate intake",
      etiology: "related to poor protein food choices",
    },
        {
      label: "Less than optimal intake of types of carbohydrate",
      etiology: "related to poor protein food choices",
    },
{
      label: "Inconsistent carbohydrate intake",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate fiber intake",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive fiber intake",
      etiology: "related to poor protein food choices",
    },
    

  ],

"5.9 Inadequate vitamin intake": [
  {
      label: "Inadequate - Vitamin A",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Vitamin C",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Vitamin D",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Vitamin E",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Vitamin K",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Thiamin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Riboflavin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Niacin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Folate",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Vitamin B6",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Vitamin B12",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Pantothenic acid",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Inadequate - Biotin",
      etiology: "related to poor protein food choices",
    },
],

"5.10 Excessive vitamin intake": [
  {
      label: "Excessive - Vitamin A",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Vitamin C",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Vitamin D",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Vitamin E",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Vitamin K",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Thiamin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Riboflavin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Niacin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Folate",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Vitamin B6",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Vitamin B12",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Pantothenic acid",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Excessive - Biotin",
      etiology: "related to poor protein food choices",
    },
]

};

const vitals = {
  bp: "120 / 80 mmHg",
  pulse: "78 bpm",
  rr: "18 / min",
  temp: "36.6 °C",
  spo2: "98 %",
  rbs: "5.4 mmol/L",
  pain: "2 / 10",
};

useEffect(() => {
  const key = `patient_${patient.id}_reports`;
  const saved = JSON.parse(localStorage.getItem(key) || "[]");
  setDoctorReports(saved);
}, [patient.id]);


  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const [submittedRows, setSubmittedRows] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective"); // subjective | objective | assessment | plan

  /* ----------------------------------------
     SAVE ONLY (NO SUBMIT)
  -----------------------------------------*/
  const saveOnly = () => {
    const timestamp = new Date().toLocaleString();

    if (form.swallowing_issue?.toUpperCase() === "Yes") {
      const newRow = {
        time: timestamp,
        assessment: "IA",
        icf: "b510",
        ichi: [
"SMF.AN.ZZ - Interview in relation to eating", 
"VEA.AN.ZZ Interview in relation to eating behaviours",
"KTC.AN.ZZ Interview in relation to swallowing",
"ATI.AN.ZZ Interview in relation to energy and drive functions", 

          "KTC.AN.ZZ Interview in relation to swallowing",
        ].join(", "),
      };

      setSubmittedRows((prev) => [...prev, newRow]);
    }
  };

  /* ----------------------------------------
     SUBMIT + SAVE
  -----------------------------------------*/
const submitAndSave = () => {
  saveOnly();

  // ✅ Save as an "initial diet" report for this patient
  if (patient && patient.id) {
    const key = `patient_${patient.id}_reports`;
    const existing = JSON.parse(localStorage.getItem(key) || "[]");

    const initialReport = {
      reportId: "diet_initial_" + Date.now(),
      patientId: patient.id,
      createdBy: "Dietitian",
      type: "diet_initial",
      timestamp: new Date().toISOString(),

      // snapshot of patient info
      patientSnapshot: {
        id: patient.id,
        name: patient.name,
        age: patient.age,
        sex: patient.gender || patient.sex,
        ward: patient.ward,
        diagnosis: patient.diagnosis,
      },

      // full initial diet form – all fields you filled
      form: { ...form },
    };

    localStorage.setItem(key, JSON.stringify([...existing, initialReport]));
  }

  // existing callback
  onSubmit(form);
};

  /* ----------------------------------------
     HANDLE ACTION (Back, Clear, Save) - Psychology style
  -----------------------------------------*/
  const storageKey = patient ? `diet_initial_draft_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const draft = localStorage.getItem(storageKey);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.form) setForm(prev => ({ ...prev, ...parsed.form }));
        if (Array.isArray(parsed.submittedRows)) setSubmittedRows(parsed.submittedRows);
      } catch (e) { /* ignore */ }
    }
  }, [storageKey]);

  const handleAction = (type) => {
    if (type === "back") onBack?.();

    if (type === "clear") {
      if (window.confirm("Clear all form data?")) {
        setForm({
          chief_complaint: "",
          additional_allergic_conditions: "",
          medical_history: patient?.medical_history || "",
          family_history: patient?.family_history || "",
          oral_intake: "", tube_type: "", swallowing_issue: "", chewing_issue: "",
          dentition_issue: "", appetite: "", bo: "", bo_details: "", bo_pattern_details: "",
          pu: "", pu_details: "", voiding_method: "", voiding_method_other: "", sleep: "", nausea: "", vomiting: "", other_complaints: "",
          breakfast_diet: [], breakfast_time: "", morning_tea_diet: [], morning_tea_time: "",
          lunch_diet: [], lunch_time: "", afternoon_tea_diet: [], afternoon_tea_time: "",
          dinner_diet: [], dinner_time: "", supper_diet: [], supper_time: "",
          meal_plan_feeding_type: [], meal_plan_enteral_details: "", meal_plan_mixed_details: "",
          meal_plan_fluid_details: "", from_date: "", to_date: "",
          diagnosis_problems: [],
          diet_breakfast: "", diet_morning_tea: "", diet_lunch: "", diet_afternoon_tea: "",
          diet_supper: "", diet_dinner: "", feeding_type: "",
          enteral_feeding_details: "", enteral_feeding_table_rows: [{ time: "", scoops: "", water: "", flushing: "" }], mixed_feeding_details: "", mixed_feeding_table_rows: [{ time: "", scoops: "", water: "", flushing: "" }], iddsi_level: "", fluid_intake_details: "",
          ons_regime: "", weight_record_date: "",
          wheelchair_weight: patient?.wheelchair_weight || "30",
          wheelchair_type: patient?.wheelchair_type || "light",
          diet_assessment_data: {},
          diet_prognosis: "",
          diet_intervention: [],
          diet_intervention_initiate_nutrition: "",
          diet_intervention_monitor_intake: "",
          diet_intervention_document_plan: "",
          diet_intervention_order_consult: "",
          diet_intervention_supplements_enteral: "",
          diet_intervention_others: "",
          meal_plan_mod_feeding_type: "",
          meal_plan_mod_oral: [],
          meal_plan_mod_oral_others: "",
          plan_enteral_feeding_table_rows: [{ time: "", scoops: "", water: "", flushing: "" }],
          plan_enteral_feeding_details: "",
          plan_mixed_feeding_table_rows: [{ time: "", scoops: "", water: "", flushing: "" }],
          plan_mixed_feeding_details: "",
          plan_oral_fluid_intake: "",
          plan_enteral_fluid_intake: "",
          plan_mixed_fluid_intake: "",
          plan_short_term_goals: "",
          plan_long_term_goals: "",
          plan_review_date: "",
          plan_referral_type: "",
          plan_referral_internal: [],
          plan_referral_internal_others: "",
          plan_referral_internal_memo: null,
          plan_referral_external_memo: null
        });
        setSubmittedRows([]);
        if (storageKey) localStorage.removeItem(storageKey);
      }
    }

    if (type === "save") {
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify({ form, submittedRows, updatedAt: new Date() }));
      }
      submitAndSave();
    }
  };

  // clinician + notes + actions
  var [clinician, setClinician] = useState("");
  var [notes, setNotes] = useState("");
  var [actionInitiateNutrition, setActionInitiateNutrition] = useState(false);
  var [actionOrderConsult, setActionOrderConsult] = useState(false);
  var [actionMonitorIntake, setActionMonitorIntake] = useState(false);
  var [actionSupplements, setActionSupplements] = useState(false);
  var [actionDocumentPlan, setActionDocumentPlan] = useState(false);

  var [actionInitiateTNutrition, setActionInitiateTNutrition] = useState(false);
  var [actionTOrderConsult, setActionTOrderConsult] = useState(false);
  var [actionTMonitorIntake, setActionTMonitorIntake] = useState(false);
  var [actionTSupplements, setActionTSupplements] = useState(false);
  var [actionTDocumentPlan, setActionTDocumentPlan] = useState(false);
  /* ----------------------------------------
     BASIC VALUES
  -----------------------------------------*/
  const bmi =
    patient.weight && patient.height
      ? (patient.weight / (patient.height / 100) ** 2).toFixed(1)
      : "-";

  const weightRecordDate = (() => {
    const dateStr = patient.weight_record_date || patient.weight_height_date;
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch (e) {
      return dateStr;
    }
  })();

  /* ===================== DIET SCHEMAS (Psychology style) ===================== */
  const DIET_ACTIONS = [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ];

  const DIET_SUBJECTIVE_SCHEMA = {
    actions: DIET_ACTIONS,
    sections: [
      {
        fields: [
          { type: "subheading", label: "Nutrition Assessment" },
          { name: "chief_complaint", label: "Chief Complaint", type: "textarea" },
          { name: "medical_history", label: "History of Presenting Illness (HPI)", type: "textarea" },
          { type: "subheading", label: "Past Medical & Family History" },
          { name: "pmh_from_registration", label: "Medical History (From Doctor)", type: "textarea", readOnly: true },
          { name: "family_social_from_registration", label: "Family History (From Doctor)", type: "textarea", readOnly: true },
          { name: "allergic_history", label: "Allergic History", type: "input", readOnly: true },
          { name: "additional_allergic_conditions", label: "Additional Allergic Conditions", type: "input" },
          { type: "subheading", label: "Initial Evaluation - Screening" },
          { name: "oral_intake", label: "Oral Intake", type: "radio", options: [{ label: "Normal", value: "Yes" }, { label: "Impaired", value: "No" }] },
          { name: "tube_type", label: "NG / PEG / Others", type: "input", showIf: { field: "oral_intake", equals: "No" } },
          { name: "swallowing_issue", label: "Swallowing", type: "radio", options: [{ label: "Normal", value: "No" }, { label: "Impaired", value: "Yes" }] },
          { name: "chewing_issue", label: "Chewing", type: "radio", options: [{ label: "Normal", value: "No" }, { label: "Impaired", value: "Yes" }] },
          { name: "dentition_issue", label: "Dentition", type: "radio", options: [{ label: "Normal", value: "No" }, { label: "Impaired", value: "Yes" }] },
          { name: "appetite", label: "Appetite", type: "radio", options: [{ label: "Good", value: "Good" }, { label: "Poor", value: "Poor" }] },
          { name: "nausea", label: "Nausea", type: "radio", options: [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }] },
          { name: "vomiting", label: "Vomiting", type: "radio", options: [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }] },
          { type: "subheading", label: "Bowel Status" },
          { type: "row", fields: [
            { name: "bo", label: "Bowel Control", type: "radio", options: [{ label: "Continent", value: "CONTINENT" }, { label: "Incontinent", value: "INCONTINENT" }], readOnly: true },
            { name: "bo_details", label: "Bowel Pattern", type: "single-select", options: [{ label: "Normal", value: "NORMAL" }, { label: "Constipation", value: "CONSTIPATION" }, { label: "Diarrhea", value: "DIARRHEA" }, { label: "Others", value: "OTHERS" }] }
          ]},
          { name: "bo_pattern_details", label: "Details", type: "textarea", showIf: { field: "bo_details", oneOf: ["CONSTIPATION", "DIARRHEA", "OTHERS"] } },
          { type: "subheading", label: "Bladder Status" },
          { type: "row", fields: [
            { name: "pu", label: "Bladder Control", type: "radio", options: [{ label: "Continent", value: "CONTINENT" }, { label: "Incontinent", value: "INCONTINENT" }], readOnly: true },
            { name: "voiding_method", label: "Voiding Method", type: "single-select", options: [{ label: "Spontaneous", value: "Spontaneous" }, { label: "Condom catheter", value: "Condom" }, { label: "CIC", value: "CIC" }, { label: "CBD", value: "CBD" }, { label: "Other", value: "Other" }] }
          ]},
          { name: "voiding_method_other", label: "Specify other", type: "input", showIf: { field: "voiding_method", equals: "Other" } },
          { name: "sleep", label: "Sleeping Pattern", type: "single-select", options: [{ label: "Good", value: "Good" }, { label: "Difficulty in sleeping due to Pain", value: "PAIN" }, { label: "Difficulty in sleeping due to other reason", value: "OTHER" }, { label: "Difficulty in sleeping", value: "NOREASON" }] },
          { name: "hypoglycemic_episode", label: "Hypoglycemic Episode", type: "single-select", options: [{ label: "Never", value: "Never" }, { label: "Occasional", value: "Occasional" }, { label: "Frequent", value: "Frequent" }, { label: "Unknown", value: "UNKNOWN" }, { label: "Not Relevant", value: "NOT_RELEVANT" }] },
          { name: "other_complaints", label: "Other Nutrition-Related Complaints", type: "textarea" },
          { type: "subheading", label: "Food / Nutrition Related History" },
          { name: "medications", label: "List of Medication", type: "textarea", readOnly: true },
          { name: "feeding_type", label: "Feeding Type", type: "radio", options: [{ label: "Oral Feeding", value: "oral" }, { label: "Enteral Feeding", value: "enteral" }, { label: "Mixed Feeding", value: "mixed" }] },
          { type: "row", fields: [
            { name: "diet_breakfast", label: "Breakfast", type: "textarea" },
            { name: "diet_morning_tea", label: "Morning Tea", type: "textarea" },
            { name: "diet_lunch", label: "Lunch", type: "textarea" },
            { name: "diet_afternoon_tea", label: "Afternoon Tea", type: "textarea" },
            { name: "diet_supper", label: "Supper", type: "textarea" },
            { name: "diet_dinner", label: "Dinner", type: "textarea" }
          ], showIf: { field: "feeding_type", equals: "oral" }},
          { name: "enteral_feeding_table", label: "Enteral Feeding", type: "enteral-feeding-table", showIf: { field: "feeding_type", equals: "enteral" } },
          { name: "enteral_feeding_details", label: "Enteral Feeding Notes", type: "textarea", showIf: { field: "feeding_type", equals: "enteral" } },
          { name: "mixed_feeding_table", label: "Mixed Feeding", type: "enteral-feeding-table", showIf: { field: "feeding_type", equals: "mixed" } },
          { name: "mixed_feeding_details", label: "Mixed Feeding Notes", type: "textarea", showIf: { field: "feeding_type", equals: "mixed" } },
          { name: "iddsi_level", label: "IDDSI Level", type: "input", readOnly: true, showIf: { field: "feeding_type", equals: "mixed" } },
          { name: "fluid_intake_details", label: "Fluid Intake", type: "input", showIf: { field: "feeding_type", oneOf: ["oral", "enteral", "mixed"] } },
          { name: "ffq", label: "Food Frequency Questionnaire (FFQ)", type: "input", readOnly: true, placeholder: "List will be coming soon" },
          { name: "ons_regime", label: "Oral Nutrition Supplement Regime", type: "textarea" }
        ]
      }
    ]
  };

  const DIET_OBJECTIVE_SCHEMA = {
    actions: DIET_ACTIONS,
    sections: [
      {
        fields: [
          {
            name: "diet_assessments",
            type: "assessment-launcher",
            options: [
              { label: "NRS", value: "NRS" },
              { label: "Growth Chart", value: "Growth Chart" },
              { label: "PG-SGA", value: "PG-SGA-Metric-version" },
              { label: "SGA", value: "SGA" },
              { label: "MST", value: "MST" },
              { label: "BIA", value: "BIA" }
            ]
          },
          { type: "subheading", label: "Anthropometric Measurement" },
          { type: "row", columns: 2, fields: [
            { name: "weight", label: "Weight (kg)", type: "input", readOnly: true },
            { name: "height", label: "Height (cm)", type: "input", readOnly: true },
            { name: "bmi", label: "BMI", type: "input", readOnly: true }
          ]},
          { name: "weight_record_date", label: "Date of Weight/Height Record", type: "input", readOnly: true },
          { name: "weight_change", label: "Weight Changes", type: "radio", options: [{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }] },
          { name: "previous_weight", label: "Previous Weight (kg)", type: "input", showIf: { field: "weight_change", equals: "Yes" } },
          { type: "row", fields: [
            { name: "wheelchair_weight", label: "Wheelchair Weight", type: "input" },
            { name: "wheelchair_type", label: "Wheelchair Type", type: "single-select", options: [{ label: "Heavy", value: "heavy" }, { label: "Light", value: "light" }, { label: "Overloaded", value: "overloaded" }] }
          ]},
          { name: "anthro_remarks", label: "Remarks", type: "textarea" },
          { type: "subheading", label: "Vital Signs & Measurements" },
          { type: "row", fields: [
            { name: "bp", label: "Blood Pressure", type: "input", readOnly: true },
            { name: "pulse", label: "Heart Rate", type: "input", readOnly: true },
            { name: "rr", label: "Respiratory Rate", type: "input", readOnly: true },
            { name: "temp", label: "Temperature", type: "input", readOnly: true },
            { name: "spo2", label: "SpO₂", type: "input", readOnly: true },
            { name: "rbs", label: "Random Blood Sugar", type: "input", readOnly: true },
            { name: "pain", label: "Pain Score", type: "input", readOnly: true }
          ]},
          { name: "diet_prognosis", label: "Diet Prognosis", type: "single-select", options: [
            { label: "Excellent", value: "excellent" },
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" }
          ]}
        ]
      }
    ]
  };

  const DIET_ASSESSMENT_SCHEMA = {
    actions: DIET_ACTIONS,
    sections: [{ fields: [{ type: "subheading", label: "Nutrition Diagnosis" }] }]
  };

  const DIET_MEAL_PLAN_OPTIONS = [
    { label: "Diabetic", value: "Diabetic" },
    { label: "Low Salt", value: "Low Salt" },
    { label: "Low Fat", value: "Low Fat" },
    { label: "Low Purine", value: "Low Purine" },
    { label: "High Protein", value: "High Protein" },
    { label: "Low Protein", value: "Low Protein" },
    { label: "RTF Regime", value: "RTF Regime" },
    { label: "Addons (Supplements)", value: "Addons (Supplements)" },
    { label: "Others", value: "Others" },
    { label: "Special Diet", value: "Special Diet" },
    { label: "Special Request", value: "Special Request" }
  ];

  const DIET_PLAN_SCHEMA = {
    actions: DIET_ACTIONS,
    sections: [
      {
        fields: [
          {
            name: "diet_intervention",
            label: "Intervention",
            type: "checkbox-group",
            options: [
              { label: "Initiate nutritional Intervention", value: "initiate_nutrition" },
              { label: "Monitor Oral Intake", value: "monitor_intake" },
              { label: "Document follow-up plan", value: "document_plan" },
              { label: "Order Nutrition consult", value: "order_consult" },
              { label: "Start supplements/considering enteral", value: "supplements_enteral" },
              { label: "Others", value: "others" }
            ]
          },
          { name: "diet_intervention_initiate_nutrition", label: "Initiate nutritional Intervention – Details", type: "input", showIf: { field: "diet_intervention", includes: "initiate_nutrition" } },
          { name: "diet_intervention_monitor_intake", label: "Monitor Oral Intake – Details", type: "input", showIf: { field: "diet_intervention", includes: "monitor_intake" } },
          { name: "diet_intervention_document_plan", label: "Document follow-up plan – Details", type: "input", showIf: { field: "diet_intervention", includes: "document_plan" } },
          { name: "diet_intervention_order_consult", label: "Order Nutrition consult – Details", type: "input", showIf: { field: "diet_intervention", includes: "order_consult" } },
          { name: "diet_intervention_supplements_enteral", label: "Start supplements/considering enteral – Details", type: "input", showIf: { field: "diet_intervention", includes: "supplements_enteral" } },
          { name: "diet_intervention_others", label: "Others – Details", type: "input", showIf: { field: "diet_intervention", includes: "others" } },
          { type: "subheading", label: "Meal-plan modifications" },
          { name: "meal_plan_mod_feeding_type", label: "Feeding Type", type: "radio", options: [{ label: "Oral Feeding", value: "oral" }, { label: "Enteral Feeding", value: "enteral" }, { label: "Mixed Feeding", value: "mixed" }] },
          { name: "meal_plan_mod_oral", label: "Meal Plan", type: "multi-select-dropdown", options: DIET_MEAL_PLAN_OPTIONS, showIf: { field: "meal_plan_mod_feeding_type", equals: "oral" } },
          { name: "meal_plan_mod_oral_others", label: "Others – Please specify", type: "input", showIf: { field: "meal_plan_mod_oral", includes: "Others" } },
          { name: "plan_oral_fluid_intake", label: "Fluid Intake", type: "input", showIf: { field: "meal_plan_mod_feeding_type", equals: "oral" } },
          { name: "plan_enteral_feeding_table", label: "Enteral Feeding", type: "enteral-feeding-table", showIf: { field: "meal_plan_mod_feeding_type", equals: "enteral" } },
          { name: "plan_enteral_feeding_details", label: "Enteral Feeding Notes", type: "textarea", showIf: { field: "meal_plan_mod_feeding_type", equals: "enteral" } },
          { name: "plan_enteral_fluid_intake", label: "Fluid Intake", type: "input", showIf: { field: "meal_plan_mod_feeding_type", equals: "enteral" } },
          { name: "plan_mixed_feeding_table", label: "Mixed Feeding", type: "enteral-feeding-table", showIf: { field: "meal_plan_mod_feeding_type", equals: "mixed" } },
          { name: "plan_mixed_feeding_details", label: "Mixed Feeding Notes", type: "textarea", showIf: { field: "meal_plan_mod_feeding_type", equals: "mixed" } },
          { name: "plan_mixed_fluid_intake", label: "Fluid Intake", type: "input", showIf: { field: "meal_plan_mod_feeding_type", equals: "mixed" } },
          { type: "subheading", label: "Goals" },
          { name: "plan_short_term_goals", label: "Short-Term Goals", type: "input" },
          { name: "plan_long_term_goals", label: "Long-Term Goals", type: "input" },
          { type: "subheading", label: "Follow-Up Plan" },
          { name: "plan_review_date", label: "Review in (select date)", type: "date" },
          { name: "plan_referral_type", label: "Referral", type: "radio", options: [{ label: "Internal", value: "internal" }, { label: "External", value: "external" }] },
          { name: "plan_referral_internal", label: "Internal Referral", type: "multi-select-dropdown", options: [{ label: "Optometry", value: "Optometry" }, { label: "Psychology", value: "Psychology" }, { label: "Doctors", value: "Doctors" }, { label: "Audiology", value: "Audiology" }, { label: "Speech", value: "Speech" }, { label: "Others", value: "Others" }], showIf: { field: "plan_referral_type", equals: "internal" } },
          { name: "plan_referral_internal_others", label: "Others – Please specify", type: "input", showIf: { field: "plan_referral_internal", includes: "Others" } },
          { name: "plan_referral_internal_memo", label: "Upload Memo", type: "file-upload", showIf: { field: "plan_referral_type", equals: "internal" } },
          { name: "plan_referral_external_memo", label: "Upload Memo", type: "file-upload", showIf: { field: "plan_referral_type", equals: "external" } }
        ]
      }
    ]
  };

  const schemaMap = {
    subjective: DIET_SUBJECTIVE_SCHEMA,
    objective: DIET_OBJECTIVE_SCHEMA,
    assessment: DIET_ASSESSMENT_SCHEMA,
    plan: DIET_PLAN_SCHEMA
  };

  // Bladder Control: from Doctor's Bladder Assessment - patient.bladder_control or latest report
  const bladderControlValue = patient.bladder_control || (() => {
    try {
      const reports = JSON.parse(localStorage.getItem(`patient_${patient.id}_reports`) || "[]");
      const withBladder = [...reports].reverse().find(r => r.summary?.bladder?.urinaryProblem);
      return withBladder?.summary?.bladder?.urinaryProblem || "";
    } catch { return ""; }
  })() || form.pu || "";

  // Bowel Control: from Doctor's Bowel Assessment - patient.bowel_control or latest report (control: Yes→CONTINENT, No→INCONTINENT)
  const bowelControlValue = patient.bowel_control || (() => {
    try {
      const reports = JSON.parse(localStorage.getItem(`patient_${patient.id}_reports`) || "[]");
      const withBowel = [...reports].reverse().find(r => r.summary?.bowel?.control);
      const c = withBowel?.summary?.bowel?.control;
      return c === "Yes" ? "CONTINENT" : c === "No" ? "INCONTINENT" : "";
    } catch { return ""; }
  })() || form.bo || "";

  const dietValues = {
    ...form,
    pmh_from_registration: patient.medical_history || "No data",
    family_social_from_registration: patient.diagnosis_history || "No data",
    allergic_history: patient.nkfa || "-",  // NKFA (Allergies) from Customer Service
    bo: bowelControlValue,  // From Doctor Bowel Assessment (read-only)
    pu: bladderControlValue,  // From Doctor Bladder Assessment (read-only)
    weight: patient.weight || "-",
    height: patient.height || "-",
    bmi,
    weight_record_date: weightRecordDate,
    medications: patient.medications ? patient.medications.join(", ") : "Dolo 650, Aspirin",
    iddsi_level: patient.iddsi_level || form.iddsi_level || "",
    bp: vitals.bp,
    pulse: vitals.pulse,
    rr: vitals.rr,
    temp: vitals.temp,
    spo2: vitals.spo2,
    rbs: vitals.rbs,
    pain: vitals.pain
  };

  const dietOnChange = (name, value) => {
    const readonly = ["weight", "height", "bmi", "weight_record_date", "pmh_from_registration", "family_social_from_registration", "allergic_history", "bo", "pu", "medications", "ffq", "iddsi_level", "bp", "pulse", "rr", "temp", "spo2", "rbs", "pain"];
    if (readonly.includes(name)) return;
    setField(name, value);
  };

  return (
    <div style={dietOuterWrap}>
      <div style={dietFormBox}>
        {/* ===== PATIENT INFORMATION - top (Psychology style) ===== */}
        <CommonFormBuilder
          schema={{ title: "Patient Information", sections: [] }}
          values={{}}
          onChange={() => {}}
        >
          <div style={dietSection}>
            <div style={dietPatientGrid}>
              <div><b>Name:</b> {patient.name || "-"}</div>
              <div><b>IC/MRN:</b> {patient.id || patient.mrn || patient.ic || "-"}</div>
              <div><b>Age/Gender:</b> {patient.age != null ? patient.age : "-"} / {patient.sex || patient.gender || "-"}</div>
              <div><b>Accommodation:</b> {patient.accommodation || "-"}</div>
              <div><b>Residence:</b> {patient.residence || "-"}</div>
              <div><b>Place of Residence:</b> {patient.residence || patient.place_of_residence || "-"}</div>
              <div><b>Occupation:</b> {patient.occupation || "-"}</div>
              <div><b>Marital Status:</b> {patient.marital_status || patient.marital || "-"}</div>
              <div><b>ICD Group:</b> {patient.icd || "-"}</div>
            </div>
          </div>
        </CommonFormBuilder>

        {/* ===== TABS - middle (Psychology style) ===== */}
        <div style={dietTabBar}>
          {["subjective", "objective", "assessment", "plan"].map(tab => (
            <div
              key={tab}
              style={activeTab === tab ? dietTabActive : dietTabBtn}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </div>
          ))}
        </div>

        {/* ===== TAB CONTENT - Single CommonFormBuilder (Psychology style) ===== */}
        <CommonFormBuilder
          schema={schemaMap[activeTab]}
          values={dietValues}
          onChange={dietOnChange}
          onAction={handleAction}
          assessmentRegistry={DIET_ASSESSMENT_REGISTRY}
        >
          {/* Know more for Vitals (Objective tab) - same as Resus Bay */}
          {activeTab === "objective" && (
            <div style={{ textAlign: "right", marginTop: -40, marginBottom: 20 }}>
              <span
                style={{
                  color: "#0050ff",
                  fontSize: 13,
                  cursor: "pointer",
                  fontWeight: 600
                }}
                onClick={() => typeof window?.openVitals === "function" && window.openVitals(patient)}
              >
                Know more →
              </span>
            </div>
          )}
          {/* Assessment: Problem Chart + diagnosis list */}
          {activeTab === "assessment" && (
            <>
              <div style={{ textAlign: "center", padding: 10 }}>
                <button type="button" style={btnBlue} onClick={() => setShowProblemChart(true)}>📋 Problem Chart</button>
              </div>
              {form.diagnosis_problems && form.diagnosis_problems.length > 0 ? (
                form.diagnosis_problems.map((diagnosis, index) => (
                  <div key={index} style={{ marginBottom: 24 }}>
                    <CommonFormBuilder
                      schema={{ title: `Nutrition Diagnosis ${index + 1}`, sections: [{ fields: [
                        { name: `diagnosis_problem_${index}`, label: "Problem", type: "input", readOnly: true },
                        { name: `diagnosis_etiology_${index}`, label: "Etiology", type: "input", readOnly: true },
                        { name: `diagnosis_signs_${index}`, label: "Signs & Symptoms", type: "textarea" },
                        { name: `nutrition_diagnosis_${index}`, label: "Nutrition Diagnosis", type: "textarea", readOnly: true }
                      ]}]}}
                      values={{
                        [`diagnosis_problem_${index}`]: diagnosis.problem,
                        [`diagnosis_etiology_${index}`]: diagnosis.etiology,
                        [`diagnosis_signs_${index}`]: diagnosis.signs,
                        [`nutrition_diagnosis_${index}`]: diagnosis.problem && diagnosis.etiology && diagnosis.signs ? `${diagnosis.problem} ${diagnosis.etiology} as evidenced by ${diagnosis.signs}` : ""
                      }}
                      onChange={(name, value) => {
                        if (name.startsWith(`diagnosis_signs_`)) {
                          const idx = parseInt(name.split("_")[2], 10);
                          const updated = [...form.diagnosis_problems];
                          if (updated[idx]) updated[idx] = { ...updated[idx], signs: value };
                          setField("diagnosis_problems", updated);
                        }
                      }}
                    />
                    <button type="button" onClick={() => setField("diagnosis_problems", form.diagnosis_problems.filter((_, i) => i !== index))} style={{ marginTop: 10, padding: "6px 12px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}>Remove</button>
                  </div>
                ))
              ) : (
                <div style={{ padding: 20, textAlign: "center", color: "#6b7280" }}>No nutrition diagnosis selected. Click "Problem Chart" to add one.</div>
              )}
            </>
          )}
          {/* Plan: Send alert + Submit button + table */}
          {activeTab === "plan" && (
            <>
              <div style={{ marginTop: 20, marginBottom: 16 }}>
                <button
                  type="button"
                  style={btnOrange}
                  onClick={() => alert("Alert sent to kitchen!")}
                >
                  Send alert to kitchen
                </button>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
                <button style={btnSave} onClick={saveOnly}>Save →</button>
                <button style={btnSubmit} onClick={submitAndSave}>Submit →</button>
              </div>
              {submittedRows.length > 0 && (
                <div className="card" style={{ marginTop: 30 }}>
                  <h3>Generated ICF / ICHI Recommendations</h3>
                  <table style={{ width: "100%", marginTop: 15, borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#0b6685", color: "white" }}>
                        <th style={th}>Time</th>
                        <th style={th}>Assessment</th>
                        <th style={th}>ICF</th>
                        <th style={th}>ICHI</th>
                        <th style={th}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submittedRows.map((row, index) => (
                        <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                          <td style={td}>{row.time}</td>
                          <td style={td}>{row.assessment}</td>
                          <td style={td}>{row.icf}</td>
                          <td style={{ ...td, whiteSpace: "pre-wrap" }}>{row.ichi}</td>
                          <td style={td}><button style={btnBlue}>View</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </CommonFormBuilder>

        {showProblemChart && (
  <div style={modalOverlay}>
    <div style={modalBoxLarge}>
      <h4>Nutrition Diagnostic Terminology</h4>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  }}
>
  {Object.entries(IDNT_PROBLEM_CHART).map(
    ([sectionTitle, problems]) => (
      <div
        key={sectionTitle}
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 6,
          padding: 12,
        }}
      >
        <h5 style={{ marginBottom: 8 }}>{sectionTitle}</h5>

        {problems.map((item) => (
          <label
            key={item.label}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              marginBottom: 6,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            <input
              type="checkbox"
              checked={form.diagnosis_problems.some(p => p.problem === item.label)}
              onChange={(e) => {
                const currentProblems = form.diagnosis_problems || [];
                if (e.target.checked) {
                  // Add the problem
                  setField("diagnosis_problems", [
                    ...currentProblems,
                    { problem: item.label, etiology: item.etiology, signs: "" }
                  ]);
                } else {
                  // Remove the problem
                  setField("diagnosis_problems", currentProblems.filter(p => p.problem !== item.label));
                }
              }}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    )
  )}
</div>


      <button
        style={{ marginTop: 10 }}
        onClick={() => setShowProblemChart(false)}
      >
        Close
      </button>
    </div>
  </div>
)}


        {/* <div className="card"> */}
          {/* <h3 style={{padding:20}}>Plan / Intervention</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 8 }}>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionInitiateNutrition} onChange={function () { setActionInitiateNutrition(!actionInitiateNutrition); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Initiate nutritional intervention</div>
              <div style={styles.small}>Start targeted interventions (meals, supplements)</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionOrderConsult} onChange={function () { setActionOrderConsult(!actionOrderConsult); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Order nutrition consult</div>
              <div style={styles.small}>Within 24–72 hours</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionMonitorIntake} onChange={function () { setActionMonitorIntake(!actionMonitorIntake); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Monitor oral intake</div>
              <div style={styles.small}>Record intake daily</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionSupplements} onChange={function () { setActionSupplements(!actionSupplements); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Start supplements / consider enteral</div>
              <div style={styles.small}>If intake insufficient</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", gridColumn: "1 / -1" }}>
            <input type="checkbox" checked={actionDocumentPlan} onChange={function () { setActionDocumentPlan(!actionDocumentPlan); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Document follow-up plan</div>
              <div style={styles.small}>Include re-screen schedule & responsible clinician</div>
            </div>
          </label>
        </div>

                  <h3 style={{padding:20}}>Short Term Goals</h3> */}
                  {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 8 }}>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionInitiateNutrition} onChange={function () { setActionInitiateNutrition(!actionInitiateNutrition); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Initiate nutritional intervention</div>
              <div style={styles.small}>Start targeted interventions (meals, supplements)</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionOrderConsult} onChange={function () { setActionOrderConsult(!actionOrderConsult); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Order nutrition consult</div>
              <div style={styles.small}>Within 24–72 hours</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionMonitorIntake} onChange={function () { setActionMonitorIntake(!actionMonitorIntake); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Monitor oral intake</div>
              <div style={styles.small}>Record intake daily</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionSupplements} onChange={function () { setActionSupplements(!actionSupplements); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Start supplements / consider enteral</div>
              <div style={styles.small}>If intake insufficient</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", gridColumn: "1 / -1" }}>
            <input type="checkbox" checked={actionDocumentPlan} onChange={function () { setActionDocumentPlan(!actionDocumentPlan); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Document follow-up plan</div>
              <div style={styles.small}>Include re-screen schedule & responsible clinician</div>
            </div>
          </label>
        </div> */}
{/* 
          <textarea
            style={styles.textarea}
            value={form.diagnosis_signs}
            onChange={(e) => setField("diagnosis_signs", e.target.value)}
          />

  <h3 style={{paddingTop:40}}>Long Term Goals</h3> */}
                          {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 8 }}>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionInitiateTNutrition} onChange={function () { setActionInitiateTNutrition(!actionInitiateTNutrition); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Initiate nutritional intervention</div>
              <div style={styles.small}>Start targeted interventions (meals, supplements)</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionTOrderConsult} onChange={function () { setActionTOrderConsult(!actionTOrderConsult); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Order nutrition consult</div>
              <div style={styles.small}>Within 24–72 hours</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionTMonitorIntake} onChange={function () { setActionTMonitorIntake(!actionTMonitorIntake); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Monitor oral intake</div>
              <div style={styles.small}>Record intake daily</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionTSupplements} onChange={function () { setActionTSupplements(!actionTSupplements); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Start supplements / consider enteral</div>
              <div style={styles.small}>If intake insufficient</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", gridColumn: "1 / -1" }}>
            <input type="checkbox" checked={actionTDocumentPlan} onChange={function () { setActionTDocumentPlan(!actionTDocumentPlan); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Document follow-up plan</div>
              <div style={styles.small}>Include re-screen schedule & responsible clinician</div>
            </div>
          </label>
        </div> */}


          {/* <textarea
            style={styles.textarea}
            value={form.diagnosis_signs}
            onChange={(e) => setField("diagnosis_signs", e.target.value)}
          /> */}

           {/* <p style={{paddingTop:40}}>Any Additions</p>
          <textarea
            style={styles.textarea}
            value={form.diagnosis_signs}
            onChange={(e) => setField("diagnosis_signs", e.target.value)}
          /> */}

{/* <div style={{ border: '1px solid #ddd', padding: '20px', width: '80%', margin: 'auto', backgroundColor: '#f9f9f9' }}>
    <h3>Interventions</h3>
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><input type="checkbox" /> Initiate nutritional intervention (Start targeted interventions: meals, supplements)</li>
        <li><input type="checkbox" /> Monitor oral intake (Record intake daily)</li>
        <li><input type="checkbox" /> Document follow-up plan (Include re-screen schedule & responsible clinician)</li>
        <li><input type="checkbox" /> Order nutrition consult (Within 24-72 hours)</li>
        <li><input type="checkbox" /> Start supplements / consider enteral (If intake insufficient)</li>
    </ul>
</div> */}


        {/* </div> */}
        {/* MENU RECOMMENDATION */}






      </div>

      <style jsx>{`
        .card {
          margin-bottom: 20px;
        }
      `}</style>

    </div>

  );
}

/* --------------------------------- STYLES --------------------------------- */

const styles = {
  input: {
    width: "100%",
    padding: "7px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  readonlyInput: {
    width: "100%",
    padding: "7px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    background: "#eee",
    color: "#333",
  },
  textarea: {
    width: "100%",
    padding: "7px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  select:{
    marginBottom:"5px",
  }
};

const th = { padding: 10, textAlign: "left", fontWeight: 600 };
const td = { padding: 10, verticalAlign: "top" };

const btnBack = {
  padding: "8px 16px",
  background: "#5640d3",
  color: "white",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
};

const btnSave = {
  padding: "12px 28px",
  background: "#444",
  color: "white",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
};

const btnSubmit = {
  padding: "12px 28px",
  background: "#0050ff",
  color: "white",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
};

const btnOrange = {
  padding: "10px 22px",
  background: "#ff7a00",
  color: "white",
  borderRadius: 6,
  cursor: "pointer",
  marginTop: 12,
  border: "none",
};

const btnBlue = {
  padding: "6px 12px",
  background: "#047bff",
  color: "white",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 12,
};

/* Layout - full width, plain */
const dietOuterWrap = { width: "100%" };
const dietFormBox = {};
const dietSection = { marginBottom: 24 };
const dietPatientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};
const dietTabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
};
const dietTabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#0f172a"
};
const dietTabActive = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  borderBottom: "3px solid #2451b3",
  color: "#2451b3"
};
const dietContentBox = {};
const dietContentWrapper = { marginTop: 16 };
const dietActionRow = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  marginBottom: 16
};
const dietActionBtn = {
  padding: "8px 18px",
  background: "transparent",
  border: "1px solid #999",
  cursor: "pointer",
  fontSize: 14
};

const anthroGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(197px, 1fr))",
  gap: 12,
};

const modalBoxLarge = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  width: "70vw",
  maxHeight: "85vh",
  overflowY: "auto",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalBox = {
  background: "#fff",
  padding: 20,
  borderRadius: 8,
  width: 400,
  maxHeight: "80vh",
  overflowY: "auto",
};
