import React, { useState, useEffect } from "react";
import PatientReports from "../../PatientReports"; // ⬅ adjust path if needed
import { BoldIcon } from "lucide-react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";


export default function InitialAssessmentForm({ patient, onSubmit, onBack }) {
  const [form, setForm] = useState({
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
feeding_type: [],
enteral_feeding_details: "",
mixed_feeding_details: "",
fluid_intake_details: "",
ons_regime: "",
    weight_record_date: "",
    wheelchair_weight: patient.wheelchair_weight || "30",
    wheelchair_type: patient.wheelchair_type || "light",
  });
// ----------------------------------------------
// DOCTOR REPORTS STATE + LOAD
// ----------------------------------------------
const [doctorReports, setDoctorReports] = useState([]);
const [showDoctorReports, setShowDoctorReports] = useState(false);
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

const btnReport = {
  padding: "8px 16px",
  background: "#0277bd",
  color: "white",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  marginLeft: 10,
  fontWeight: 600,
};


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



  return (
    <div >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>

        {/* HEADER */}
{/* HEADER */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  }}
>
  <button onClick={onBack} style={btnBack}>← Back</button>

  <div style={{ display: "flex", gap: 10 }}>
    {/* Existing Diet Report Button */}
    {/* <button
      style={btnReport}
      onClick={() => setShowReport(true)}
    >
      📄 Diet Reports
    </button> */}

    {/* ⭐ New Doctor Report Button */}
    <button
      style={btnReport}
      onClick={() => setShowDoctorReports(true)}
    >
      🩺 Doctor Reports
    </button>
  </div>
</div>



{/* DOCTOR REPORTS PANEL */}
{showDoctorReports && (
  <div className="card" style={{ marginBottom: 20 }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
     
      <button
        onClick={() => setShowDoctorReports(false)}
        style={{
          padding: "4px 10px",
          background: "#ccc",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 12,
        }}
      >
        ✖ Close
      </button>
    </div>

    {/* This component will read doctor reports from localStorage by patient.id */}
    <PatientReports patient={patient} />
  </div>
)}

        {/* PATIENT INFO - Using FormBuilder */}
        <CommonFormBuilder
          schema={{
            title: "Patient Information",
            sections: []
          }}
          values={{}}
          onChange={() => {}}
        >
          <div style={patientGrid}>
            <div><strong>Name:</strong> {patient.name}</div>
            <div><strong>IC/MRN:</strong> {patient.id}</div>
            <div><strong>Age/Gender:</strong> {patient.age} / {patient.sex}</div>
            <div><strong>Accommodation:</strong> {patient.accommodation}</div>
            <div><strong>Residence:</strong> {patient.residence}</div>
            <div><strong>NKFA:</strong> {patient.nkfa}</div>
            
            <div><strong>Place of Residence:</strong> {patient.residence || "-"}</div>
    <div><strong>Occupation:</strong> {patient.occupation || "-"}</div>
    <div><strong>Marital Status:</strong> {patient.marital_status || "-"}</div>
    <div><strong>ICD Group:</strong> {patient.icd}</div>
            {/* CARER INFORMATION */}
{patient.carers && patient.carers.length > 0 && (
  <div style={{ gridColumn: "1 / -1" }}>
    <strong>Carer Details:</strong>

    <div style={{ marginTop: 8 }}>
      {patient.carers.map((carer, index) => (
        <div
          key={carer.id}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: 6,
            marginBottom: 6,
            background: "#f9fafb",
          }}
        >
          <div><strong>Carer {index + 1} ID:</strong> {carer.id}</div>
          <div><strong>Name:</strong> {carer.name || "-"}</div>
          <div><strong>Phone:</strong> {carer.phone || "-"}</div>
        </div>
      ))}
    </div>
  </div>
)}
          </div>
        </CommonFormBuilder>

        {/* PAST MEDICAL & FAMILY HISTORY - Using FormBuilder */}
        <CommonFormBuilder
          schema={{
            title: "Past Medical & Family History",
            sections: [
              {
                fields: [
                  {
                    name: "pmh_from_registration",
                    label: "Medical History (From Doctor)",
                    type: "textarea",
                    readOnly: true
                  },
                  {
                    name: "family_social_from_registration",
                    label: "Family History (From Doctor)",
                    type: "textarea",
                    readOnly: true
                  }
                ]
              }
            ]
          }}
          values={{
            pmh_from_registration: patient.medical_history || "No data",
            family_social_from_registration: patient.diagnosis_history || "No data"
          }}
          onChange={() => {}}
        />
        {/* A. MEDICAL HISTORY (editable for dietitian notes) - Using FormBuilder */}
        <div style={{ width: "100%" }}>
          <CommonFormBuilder
            schema={{
              title: "Nutrition Assessment",
              sections: [
                {
                  fields: [
                    {
                      name: "medical_history",
                      label: "History of Presenting illness (HPI)",
                      type: "textarea"
                    }
                  ]
                }
              ]
            }}
            values={{ medical_history: form.medical_history }}
            onChange={(name, value) => setField(name, value)}
          />
        </div>

        {/* ANTHROPOMETRY - Using FormBuilder */}
  <div style={{ width: "100%" }}>
    <CommonFormBuilder
      schema={{
        title: "Anthropometric Measurement",
        sections: [
        {
          fields: [
            {
              type: "row",
              columns: 2,
              fields: [
                {
                  name: "weight",
                  label: "Weight (kg) – Auto filled from Nursing",
                  type: "input",
                  readOnly: true
                },
                {
                  name: "height",
                  label: "Height (cm) – Auto filled from Nursing",
                  type: "input",
                  readOnly: true
                },
                {
                  name: "bmi",
                  label: "BMI – Auto calculated",
                  type: "input",
                  readOnly: true
                }
              ]
            },
            {
              name: "weight_record_date",
              label: "Date of Weight/Height Record",
              type: "input",
              readOnly: true
            },
            {
              name: "weight_change",
              label: "Weight Changes",
              type: "radio",
              options: [
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" }
              ]
            },
            {
              name: "previous_weight",
              label: "Previous Weight (kg)",
              type: "input",
              placeholder: "Enter previous weight",
              showIf: {
                field: "weight_change",
                equals: "Yes"
              }
            },
            {
              type: "row",
              fields: [
                {
                  name: "wheelchair_weight",
                  label: "Wheelchair Weight",
                  type: "input",
                  placeholder: "Enter weight in kg"
                },
                {
                  name: "wheelchair_type",
                  label: "Wheelchair Type",
                  type: "single-select",
                  options: [
                    { label: "Heavy", value: "heavy" },
                    { label: "Light", value: "light" },
                    { label: "Overloaded", value: "overloaded" }
                  ]
                }
              ]
            },
            {
              name: "anthro_remarks",
              label: "Remarks",
              type: "textarea",
              placeholder: "Add remarks if any…"
            }
          ]
        }
      ]
    }}
    values={{
      weight: patient.weight || "-",
      height: patient.height || "-",
      bmi: bmi,
      weight_record_date: (() => {
        const dateStr = patient.weight_record_date || patient.weight_height_date;
        if (!dateStr) return "-";
        try {
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return dateStr; // Return as-is if invalid date
          return date.toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
          });
        } catch (e) {
          return dateStr; // Return as-is if parsing fails
        }
      })(),
      weight_change: form.weight_change,
      previous_weight: form.previous_weight,
      wheelchair_weight: form.wheelchair_weight || patient.wheelchair_weight || "30",
      wheelchair_type: form.wheelchair_type || patient.wheelchair_type || "light",
      anthro_remarks: form.anthro_remarks
    }}
    onChange={(name, value) => {
      if (name === "weight" || name === "height" || name === "bmi" || name === "weight_record_date") {
        // These are readonly, don't update
        return;
      }
      setField(name, value);
    }}
          />
        </div>

{/* VITALS INFORMATION - Using FormBuilder */}
<div style={{ width: "100%" }}>
  <CommonFormBuilder
    schema={{
      title: "Vital Signs & Measurements",
      sections: [
        {
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "bp",
                  label: "Blood Pressure",
                  type: "input",
                  readOnly: true
                },
                {
                  name: "pulse",
                  label: "Heart Rate (Pulse)",
                  type: "input",
                  readOnly: true
                },
                {
                  name: "rr",
                  label: "Respiratory Rate",
                  type: "input",
                  readOnly: true
                },
                {
                  name: "temp",
                  label: "Temperature",
                  type: "input",
                  readOnly: true
                },
                {
                  name: "spo2",
                  label: "SpO₂",
                  type: "input",
                  readOnly: true
                },
                {
                  name: "rbs",
                  label: "Random Blood Sugar",
                  type: "input",
                  readOnly: true
                },
                {
                  name: "pain",
                  label: "Pain Score",
                  type: "input",
                  readOnly: true
                }
              ]
            }
          ]
        }
      ]
    }}
    values={{
      bp: vitals.bp,
      pulse: vitals.pulse,
      rr: vitals.rr,
      temp: vitals.temp,
      spo2: vitals.spo2,
      rbs: vitals.rbs,
      pain: vitals.pain
    }}
    onChange={() => {}}
  >
    <div style={{ textAlign: "right", marginTop: -40, marginBottom: 20 }}>
<span
  style={{
    color: "#0050ff",
    fontSize: 13,
    cursor: "pointer",
    fontWeight: 600,
  }}
  onClick={() => window.openVitals?.(patient)}
>
  Know more →
</span>
  </div>
  </CommonFormBuilder>
    </div>


        {/* PHYSICAL FINDINGS - Using FormBuilder */}
        <div style={{ width: "100%" }}>
          <CommonFormBuilder
            schema={{
              title: "Initial Evaluation - Screening",
              subtitle: "Nutrition-Focused Physical Findings",
              sections: [
                {
                  fields: [
                    {
                      name: "oral_intake",
                      label: "Oral Intake",
                      type: "radio",
                      options: [
                        { label: "Normal", value: "Yes" },
                        { label: "Impaired", value: "No" }
                      ]
                    },
                    {
                      name: "tube_type",
                      label: "NG / PEG / Others",
                      type: "input",
                      showIf: {
                        field: "oral_intake",
                        equals: "NO"
                      }
                    },
                    {
                      name: "swallowing_issue",
                      label: "Swallowing",
                      type: "radio",
                      options: [
                        { label: "Normal", value: "No" },
                        { label: "Impaired", value: "Yes" }
                      ]
                    },
                    {
                      name: "chewing_issue",
                      label: "Chewing",
                      type: "radio",
                      options: [
                        { label: "Normal", value: "No" },
                        { label: "Impaired", value: "Yes" }
                      ]
                    },
                    {
                      name: "dentition_issue",
                      label: "Dentition",
                      type: "radio",
                      options: [
                        { label: "Normal", value: "No" },
                        { label: "Impaired", value: "Yes" }
                      ]
                    },
                    {
                      name: "appetite",
                      label: "Appetite",
                      type: "radio",
                      options: [
                        { label: "Good", value: "Good" },
                        { label: "Poor", value: "Poor" }
                      ]
                    },
                    {
                      type: "subheading",
                      label: "Bowel Status"
                    },
                    {
                      type: "row",
                      fields: [
                        {
                          name: "bo",
                          label: "Bowel Control",
                          type: "radio",
                          options: [
                            { label: "Continent", value: "CONTINENT" },
                            { label: "Incontinent", value: "INCONTINENT" }
                          ]
                        },
                        {
                          name: "bo_details",
                          label: "Bowel Pattern",
                          type: "single-select",
                          options: [
                            { label: "Normal", value: "NORMAL" },
                            { label: "Constipation", value: "CONSTIPATION" },
                            { label: "Diarrhea", value: "DIARRHEA" },
                            { label: "Others", value: "OTHERS" }
                          ]
                        }
                      ]
                    },
                    {
                      name: "bo_pattern_details",
                      label: "Details",
                      type: "textarea",
                      placeholder: "Please provide details...",
                      showIf: {
                        field: "bo_details",
                        oneOf: ["CONSTIPATION", "DIARRHEA", "OTHERS"]
                      }
                    },
                    {
                      name: "pu",
                      label: "Bladder Control",
                      type: "radio",
                      options: [
                        { label: "Continent", value: "CONTINENT" },
                        { label: "Incontinent", value: "INCONTINENT" }
                      ]
                    },
                    {
                      name: "sleep",
                      label: "Sleeping Pattern",
                      type: "single-select",
                      options: [
                        { label: "Good", value: "Good" },
                        { label: "Difficulty in sleeping due to Pain", value: "PAIN" },
                        { label: "Difficulty in sleeping due to other reason", value: "OTHER" },
                        { label: "Difficulty in sleeping", value: "NOREASON" }
                      ]
                    },
                    {
                      name: "nausea",
                      label: "Nausea",
                      type: "radio",
                      options: [
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" }
                      ]
                    },
                    {
                      name: "vomiting",
                      label: "Vomiting",
                      type: "radio",
                      options: [
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" }
                      ]
                    },
                    {
                      name: "hypoglycemic_episode",
                      label: "Hypoglycemic Episode",
                      type: "single-select",
                      options: [
                        { label: "Never", value: "Never" },
                        { label: "Occasional", value: "Occasional" },
                        { label: "Frequent", value: "Frequent" },
                        { label: "Unknown", value: "UNKNOWN" },
                        { label: "Not Relevant", value: "NOT_RELEVANT" }
                      ]
                    },
                    {
                      name: "other_complaints",
                      label: "Other Complaints",
                      type: "textarea"
                    }
                  ]
                }
              ]
            }}
            values={{
              oral_intake: form.oral_intake,
              tube_type: form.tube_type,
              swallowing_issue: form.swallowing_issue,
              chewing_issue: form.chewing_issue,
              dentition_issue: form.dentition_issue,
              appetite: form.appetite,
              bo: form.bo,
              bo_details: form.bo_details,
              bo_pattern_details: form.bo_pattern_details,
              pu: form.pu,
              sleep: form.sleep,
              nausea: form.nausea,
              vomiting: form.vomiting,
              hypoglycemic_episode: form.hypoglycemic_episode || "",
              other_complaints: form.other_complaints
            }}
            onChange={(name, value) => setField(name, value)}
      />
    </div>

        {/* FOOD / NUTRITION RELATED HISTORY - Using FormBuilder */}
        <div style={{ width: "100%" }}>
          <CommonFormBuilder
            schema={{
              title: "Food / Nutrition Related History",
              sections: [
                {
                  fields: [
                    {
                      name: "medications",
                      label: "List of Medication",
                      type: "textarea",
                      readOnly: true
                    },
                    {
                      type: "subheading",
                      label: "Diet Recall / History"
                    },
                    {
                      name: "feeding_type",
                      label: "Feeding Type",
                      type: "checkbox-group",
                      inlineWithLabel: true,
                      options: [
                        { label: "Oral Feeding", value: "oral" },
                        { label: "Enteral Feeding", value: "enteral" },
                        { label: "Mixed Feeding", value: "mixed" },
                        { label: "Fluid Intake", value: "fluid" }
                      ]
                    },
                    {
                      type: "subheading",
                      label: "Oral Feeding",
                      showIf: {
                        field: "feeding_type",
                        includes: "oral"
                      }
                    },
                    {
                      type: "row",
                      fields: [
                        {
                          name: "diet_breakfast",
                          label: "Breakfast",
                          type: "textarea",
                          placeholder: "Enter breakfast details…"
                        },
                        {
                          name: "diet_morning_tea",
                          label: "Morning Tea",
                          type: "textarea",
                          placeholder: "Enter morning tea details…"
                        },
                        {
                          name: "diet_lunch",
                          label: "Lunch",
                          type: "textarea",
                          placeholder: "Enter lunch details…"
                        },
                        {
                          name: "diet_afternoon_tea",
                          label: "Afternoon Tea",
                          type: "textarea",
                          placeholder: "Enter afternoon tea details…"
                        },
                        {
                          name: "diet_supper",
                          label: "Supper",
                          type: "textarea",
                          placeholder: "Enter supper details…"
                        },
                        {
                          name: "diet_dinner",
                          label: "Dinner",
                          type: "textarea",
                          placeholder: "Enter dinner details…"
                        }
                      ],
                      showIf: {
                        field: "feeding_type",
                        includes: "oral"
                      }
                    },
                    {
                      name: "enteral_feeding_details",
                      label: "Enteral Feeding Details",
                      type: "textarea",
                      placeholder: "Enter enteral feeding details…",
                      showIf: {
                        field: "feeding_type",
                        includes: "enteral"
                      }
                    },
                    {
                      name: "mixed_feeding_details",
                      label: "Mixed Feeding Details",
                      type: "textarea",
                      placeholder: "Enter mixed feeding details…",
                      showIf: {
                        field: "feeding_type",
                        includes: "mixed"
                      }
                    },
                    {
                      name: "fluid_intake_details",
                      label: "Fluid Intake Details",
                      type: "textarea",
                      placeholder: "Enter fluid intake details…",
                      showIf: {
                        field: "feeding_type",
                        includes: "fluid"
                      }
                    },
                    {
                      name: "ffq",
                      label: "Food Frequency Questionnaire (FFQ)",
                      type: "textarea",
                      readOnly: true,
                      placeholder: "List will be coming soon"
                    },
                    {
                      name: "ons_regime",
                      label: "Oral Nutrition Supplement Regime (If relevant)",
                      type: "textarea",
                      placeholder: "Enter supplement details, dosage, frequency…"
                    }
                  ]
                }
              ]
            }}
            values={{
              medications: patient.medications
          ? patient.medications.join(", ")
                : "Dolo 650, Aspirin",
              feeding_type: form.feeding_type || [],
              diet_breakfast: form.diet_breakfast,
              diet_morning_tea: form.diet_morning_tea,
              diet_lunch: form.diet_lunch,
              diet_afternoon_tea: form.diet_afternoon_tea,
              diet_supper: form.diet_supper,
              diet_dinner: form.diet_dinner,
              enteral_feeding_details: form.enteral_feeding_details,
              mixed_feeding_details: form.mixed_feeding_details,
              fluid_intake_details: form.fluid_intake_details,
              ffq: "List will be coming soon",
              ons_regime: form.ons_regime
            }}
            onChange={(name, value) => {
              if (name === "medications" || name === "ffq") {
                return; // readonly
              }
              setField(name, value);
            }}
    />
</div>

                {/* B. NUTRITION DIAGNOSIS - Using FormBuilder */}
<div style={{ width: "100%" }}>
  <div style={{ textAlign: "center", padding: 10 }}>
<button
  type="button"
  style={btnBlue}
  onClick={() => setShowProblemChart(true)}
>
  📋 Problem Chart
</button>
  </div>
  
  {form.diagnosis_problems && form.diagnosis_problems.length > 0 ? (
    form.diagnosis_problems.map((diagnosis, index) => (
      <div key={index} style={{ marginBottom: 24, borderRadius: 8 }}>
        <CommonFormBuilder
          schema={{
            title: `Nutrition Diagnosis ${index + 1}`,
            sections: [
              {
                fields: [
                  {
                    name: `diagnosis_problem_${index}`,
                    label: "Problem",
                    type: "input",
                    readOnly: true
                  },
                  {
                    name: `diagnosis_etiology_${index}`,
                    label: "Etiology",
                    type: "input",
                    readOnly: true
                  },
                  {
                    name: `diagnosis_signs_${index}`,
                    label: "Signs & Symptoms",
                    type: "textarea"
                  },
                  {
                    name: `nutrition_diagnosis_${index}`,
                    label: "Nutrition Diagnosis",
                    type: "textarea",
                    readOnly: true
                  }
                ]
              }
            ]
          }}
          values={{
            [`diagnosis_problem_${index}`]: diagnosis.problem,
            [`diagnosis_etiology_${index}`]: diagnosis.etiology,
            [`diagnosis_signs_${index}`]: diagnosis.signs,
            [`nutrition_diagnosis_${index}`]: diagnosis.problem &&
              diagnosis.etiology &&
              diagnosis.signs
              ? `${diagnosis.problem} ${diagnosis.etiology} as evidenced by ${diagnosis.signs}`
              : ""
          }}
          onChange={(name, value) => {
            if (name.startsWith(`diagnosis_signs_${index}`)) {
              const updatedProblems = [...form.diagnosis_problems];
              updatedProblems[index].signs = value;
              setField("diagnosis_problems", updatedProblems);
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            const updatedProblems = form.diagnosis_problems.filter((_, i) => i !== index);
            setField("diagnosis_problems", updatedProblems);
          }}
          style={{
            marginTop: 10,
            padding: "6px 12px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer"
          }}
        >
          Remove
        </button>
</div>
    ))
  ) : (
    <div style={{ padding: 20, textAlign: "center", color: "#6b7280" }}>
      No nutrition diagnosis selected. Click "Problem Chart" to add one.
    </div>
  )}
</div>



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






        {/* BUTTONS */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 25 }}>
          <button style={btnSave} onClick={saveOnly}>Save →</button>
          <button style={btnSubmit} onClick={submitAndSave}>Submit →</button>
        </div>

        {/* GENERATED TABLE */}
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
                    <td style={td}>
                      <button style={btnBlue}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* CARD CSS */}
      <style jsx>{`
        .card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #ddd;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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
