import React, { useState, useEffect } from "react";
import PatientReports from "../../PatientReports"; // ⬅ adjust path if needed
import { BoldIcon } from "lucide-react";


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
    pu: "",
    pu_details: "",
    sleep: "",
    nausea: "",
    vomiting: "",
    other_complaints: "",
    breakfast_diet: "", breakfast_time: "",
    morning_tea_diet: "", morning_tea_time: "",
    lunch_diet: "", lunch_time: "",
    afternoon_tea_diet: "", afternoon_tea_time: "",
    dinner_diet: "", dinner_time: "",
    supper_diet: "", supper_time: "",
    from_date: "", to_date: "",
    diagnosis_problem: "",
    diet_breakfast: "",
diet_morning_tea: "",
diet_lunch: "",
diet_afternoon_tea: "",
diet_supper: "",
ons_regime: "",
    diagnosis_etiology: "",
    diagnosis_signs: "",
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
      label: "Vitamin A",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin C",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin D",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin E",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin K",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Thiamin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Riboflavin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Niacin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Folate",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin B6",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin B12",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Pantothenic acid",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Biotin",
      etiology: "related to poor protein food choices",
    },
],

"5.9 Excessive vitamin intake": [
  {
      label: "Vitamin A",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin C",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin D",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin E",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin K",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Thiamin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Riboflavin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Niacin",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Folate",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin B6",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Vitamin B12",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Pantothenic acid",
      etiology: "related to poor protein food choices",
    },
    {
      label: "Biotin",
      etiology: "related to poor protein food choices",
    },
]

};

const vitals = {
  bp: "120 / 80 mmHg",
  pulse: "78 bpm",
  rr: "18 / min",
  temp: "98.6 °F",
  spo2: "98 %",
  rbs: "110 mg/dL",
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

    if (form.swallowing_issue?.toUpperCase() === "YES") {
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
    <div style={{ minHeight: "100vh", background: "#f7f9fc", fontFamily: "'Inter', sans-serif" }}>
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

        {/* PATIENT INFO */}
        <div className="card">
          <h3>Patient Information</h3>

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
        </div>

        {/* NEW SECTION — AUTO-FETCHED HISTORY */}
        <div className="card">
          <h3>Past Medical & Family History</h3>

          <label>Medical History (From Registration)</label>
          <textarea
            style={styles.readonlyInput}
            value={patient.medical_history || "No data"}
            readOnly
          />

          <label style={{ marginTop: 10 }}>Family History (From Registration)</label>
          <textarea
            style={styles.readonlyInput}
            value={patient.diagnosis_history || "No data"}
            readOnly
          />
        </div>
          <h2 style={{textAlign:"left"}}>Nutrition Assessment</h2>
        {/* A. MEDICAL HISTORY (editable for dietitian notes) */}
        <div className="card">
          <h3>History of Presenting Illness</h3>
       

          {/* <label>History of Presenting illness (HPI)</label> */}
          <textarea
            style={styles.textarea}
            value={form.medical_history}
            onChange={(e) => setField("medical_history", e.target.value)}
          />
        </div>

        {/* ANTHROPOMETRY */}
<div className="card">
  <h5>Anthropometric Measurement</h5>

  <div style={anthroGrid}>
    {/* WEIGHT */}
    <div>
      <label>Weight (kg) – Auto filled from Nursing</label>
      <input
        style={styles.readonlyInput}
        value={patient.weight || "-"}
        readOnly
      />
    </div>

    {/* HEIGHT */}
    <div>
      <label>Height (cm) – Auto filled from Nursing</label>
      <input
        style={styles.readonlyInput}
        value={patient.height || "-"}
        readOnly
      />
    </div>

    {/* BMI */}
    <div>
      <label>BMI – Auto calculated</label>
      <input
        style={styles.readonlyInput}
        value={bmi}
        readOnly
      />
    </div>

    {/* WHEELCHAIR WEIGHT */}



    {/* WEIGHT CHANGE */}
    <div>
      <label>Weight Changes</label>
      <select
        style={styles.input}
        value={form.weight_change}
        onChange={(e) => setField("weight_change", e.target.value)}
      >
        <option value="">Select…</option>
        <option value="YES">Yes</option>
        <option value="NO">No</option>
      </select>
    </div>

    {/* PREVIOUS WEIGHT (CONDITIONAL) */}
    {form.weight_change === "YES" && (
      <div>
        <label>Previous Weight (kg)</label>
        <input
          style={styles.input}
          value={form.previous_weight}
          onChange={(e) => setField("previous_weight", e.target.value)}
          placeholder="Enter previous weight"
        />
      </div>
    )}
{/* WHEELCHAIR WEIGHT – DISPLAY ONLY */}
<div style={{ gridColumn: "1 / -1", marginTop: 6 }}>
  <strong>Wheelchair Weight:</strong>{" "}
  {patient.wheelchair_weight
    ? `${patient.wheelchair_weight} kg`
    : "Not Applicable"}
</div>
    {/* REMARKS – FULL WIDTH */}
    <div style={{ gridColumn: "1 / -1" }}>
      <label>Remarks</label>
      <textarea
        style={styles.textarea}
        value={form.anthro_remarks}
        onChange={(e) => setField("anthro_remarks", e.target.value)}
        placeholder="Add remarks if any…"
      />
    </div>
  </div>
</div>

{/* VITALS INFORMATION */}
<div className="card">
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    }}
  >
    <h5 style={{ margin: 0 }}>VItal Signs & Measurements</h5>

    {/* KNOW MORE LINK */}
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

  <div style={anthroGrid}>
    <div>
      <label>Blood Pressure</label>
      <input
        style={styles.readonlyInput}
        value="120 / 80 mmHg"
        readOnly
      />
    </div>

    <div>
      <label>Heart Rate (Pulse)</label>
      <input
        style={styles.readonlyInput}
        value="78 bpm"
        readOnly
      />
    </div>

    <div>
      <label>Respiratory Rate</label>
      <input
        style={styles.readonlyInput}
        value="18 / min"
        readOnly
      />
    </div>

    <div>
      <label>Temperature</label>
      <input
        style={styles.readonlyInput}
        value="98.6 °F"
        readOnly
      />
    </div>

    <div>
      <label>SpO₂</label>
      <input
        style={styles.readonlyInput}
        value="98 %"
        readOnly
      />
    </div>

    <div>
      <label>Random Blood Sugar</label>
      <input
        style={styles.readonlyInput}
        value="110 mg/dL"
        readOnly
      />
    </div>

    <div>
      <label>Pain Score</label>
      <input
        style={styles.readonlyInput}
        value="2 / 10"
        readOnly
      />
    </div>
  </div>
</div>


        {/* PHYSICAL FINDINGS */}
        <div className="card">
          <h3 style={{ textAlign: "center" }}>       Initial Evaluation - Screening</h3>
       <h3>     Nutrition-Focused Physical Findings</h3>
          <label>Oral Intake</label>
          <select
            style={styles.input}
            value={form.oral_intake}
            onChange={(e) => setField("oral_intake", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="YES">Normal</option>
            <option value="NO">Impaired</option>
          </select>

          {form.oral_intake === "NO" && (
            <>
              <label>NG / PEG / Others</label>
              <input
                style={styles.input}
                value={form.tube_type}
                onChange={(e) => setField("tube_type", e.target.value)}
              />
            </>
          )}

          {/* SWALLOWING ISSUE */}
          <label style={{ marginTop: 14 }}>Swallowing</label>
          <select
            style={styles.input}
            value={form.swallowing_issue}
            onChange={(e) => setField("swallowing_issue", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="NO">Normal</option>
            <option value="YES">Impaired</option>
          </select>

          {/* CHEWING ISSUE */}
          <label>Chewing</label>
          <select
            style={styles.input}
            value={form.chewing_issue}
            onChange={(e) => setField("chewing_issue", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="NO">Normal</option>
            <option value="YES">Impaired</option>
          </select>

          <label>Dentition</label>
          <select
            style={styles.input}
            value={form.chewing_issue}
            onChange={(e) => setField("chewing_issue", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="NO">Normal</option>
            <option value="YES">Impaired</option>
          </select>


          {/* REST FIELDS SAME… */}
          <label>Appetite</label>
          <select
            style={styles.input}
            value={form.appetite}
            onChange={(e) => setField("appetite", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="GOOD">GOOD</option>
            <option value="POOR">POOR</option>
          </select>
<label style={{paddingTop:10}}>Bowel Status:</label>
     <div style={{display :"flex", gap:20}}>  
      <div style={{width: "50%"}}>
         <label style={{fontSize:"13px"}}>Bowel Control</label>
          <select
            style={styles.input}
            value={form.bo}
            onChange={(e) => setField("bo", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="CONTINENT">Continent</option>
            <option value="INCONTINENT">Incontinent</option>
          </select></div> 
<div style={{width: "50%"}}><label style={{fontSize:"13px"}}>Bowel Pattern</label>
          <select
            style={styles.input}
            value={form.bo}
            onChange={(e) => setField("bo", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="NORMAL">Normal</option>
            <option value="CONSTIPATION">Constipation</option>
            <option value="DIARRHEA">Diarrhea</option>
          </select></div></div>
<label style={{paddingTop:10}}>Bladder Status:</label>
<div style={{display :"flex", gap:20}}>
          <div style={{width: "50%"}}><label style={{fontSize:"13px"}}>Bladder Control</label>
          <select
            style={styles.input}
            value={form.pu}
            onChange={(e) => setField("pu", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="CONTINENT">Continent</option>
            <option value="INCONTINENT">Incontinent</option>
          </select></div>
          <div style={{width: "50%"}}><label style={{fontSize:"13px"}}>Voiding Pattern</label>
          <select
            style={styles.input}
            value={form.pu}
            onChange={(e) => setField("pu", e.target.value)}
          >
            <option value="">Select...</option>
             <option value="NORMAL">Normal</option>
            <option value="FREQUENCY">Frequency</option>
            <option value="RETENTION">Retention</option>
          </select></div>
</div>
          <label style={{paddingTop:10}}>Sleeping Pattern</label>
          <select
            style={styles.input}
            value={form.sleep}
            onChange={(e) => setField("sleep", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="GOOD">GOOD</option>
            <option value="PAIN">Difficulty in sleeping due to Pain</option>
            <option value="OTHER">Difficulty in sleeping due to other reason</option>
            <option value="NOREASON">Difficulty in sleeping</option>
          </select>

          <label>Nausea</label>
          <select
            style={styles.input}
            value={form.nausea}
            onChange={(e) => setField("nausea", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>

          <label>Vomiting</label>
          <select
            style={styles.input}
            value={form.vomiting}
            onChange={(e) => setField("vomiting", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>

          <label>Hypoglycemic Episode</label>
          <select
            style={styles.input}
            value={form.vomiting}
            onChange={(e) => setField("vomiting", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Never">Never</option>
            <option value="Occasional">Occasional</option>
            <option value="Frequent">Frequent</option>
            <option value="UNKNOWN">Unknown</option>
          </select>

          <label>Other Complaints</label>
          <textarea
            style={styles.textarea}
            value={form.other_complaints}
            onChange={(e) => setField("other_complaints", e.target.value)}
          />
        </div>

        {/* FOOD / NUTRITION RELATED HISTORY */}
<div className="card">
  <h5>Food / Nutrition Related History</h5>

  {/* LIST OF MEDICATION – READ ONLY */}
  <div style={{ marginBottom: 14 }}>
    <label>List of Medication</label>
    <textarea
      style={styles.readonlyInput}
      value={
        patient.medications
          ? patient.medications.join(", ")
          : "Dolo 650, Aspirin"
      }
      readOnly
    />
  </div>

  {/* DIET RECALL / HISTORY */}
  <h6 style={{ marginTop: 10 }}>Diet Recall / History</h6>

  <div style={anthroGrid}>
    <div>
      <label>Breakfast</label>
      <textarea
        style={styles.textarea}
        value={form.diet_breakfast}
        onChange={(e) => setField("diet_breakfast", e.target.value)}
        placeholder="Enter breakfast details…"
      />
    </div>

    <div>
      <label>Morning Tea</label>
      <textarea
        style={styles.textarea}
        value={form.diet_morning_tea}
        onChange={(e) => setField("diet_morning_tea", e.target.value)}
        placeholder="Enter morning tea details…"
      />
    </div>

    <div>
      <label>Lunch</label>
      <textarea
        style={styles.textarea}
        value={form.diet_lunch}
        onChange={(e) => setField("diet_lunch", e.target.value)}
        placeholder="Enter lunch details…"
      />
    </div>

    <div>
      <label>Afternoon Tea</label>
      <textarea
        style={styles.textarea}
        value={form.diet_afternoon_tea}
        onChange={(e) => setField("diet_afternoon_tea", e.target.value)}
        placeholder="Enter afternoon tea details…"
      />
    </div>

    <div>
      <label>Dinner/Supper</label>
      <textarea
        style={styles.textarea}
        value={form.diet_supper}
        onChange={(e) => setField("diet_supper", e.target.value)}
        placeholder="Enter supper details…"
      />
    </div>
  </div>

  {/* FFQ – PLACEHOLDER */}
  <div style={{ marginTop: 14 }}>
    <label>Food Frequency Questionnaire (FFQ)</label>
    <div
      style={{
        padding: "10px 12px",
        border: "1px dashed #bbb",
        borderRadius: 6,
        background: "#fafafa",
        color: "#555",
        fontSize: 14,
      }}
    >
      List will be coming soon 
    </div>
  </div>

  {/* ORAL NUTRITION SUPPLEMENT */}
  <div style={{ marginTop: 14 }}>
    <label>Oral Nutrition Supplement Regime (If relevant)</label>
    <textarea
      style={styles.textarea}
      value={form.ons_regime}
      onChange={(e) => setField("ons_regime", e.target.value)}
      placeholder="Enter supplement details, dosage, frequency…"
    />
  </div>
</div>


                {/* B. NUTRITION DIAGNOSIS */}
<div className="card">
  <h5>Nutrition Diagnosis</h5>
<button
  type="button"
  style={btnBlue}
  onClick={() => setShowProblemChart(true)}
>
  📋 Problem Chart
</button>

  <label>Problem</label>
  <input
    style={styles.readonlyInput}
    value={form.diagnosis_problem}
    readOnly
  />

  <label>Etiology</label>
  <input
    style={styles.readonlyInput}
    value={form.diagnosis_etiology}
    readOnly
  />

  <label>Signs & Symptoms</label>
  <textarea
    style={styles.textarea}
    value={form.diagnosis_signs}
    onChange={(e) => setField("diagnosis_signs", e.target.value)}
  />

  <label>Nutrition Diagnosis</label>
  <textarea
    style={styles.readonlyInput}
    readOnly
    value={
      form.diagnosis_problem &&
      form.diagnosis_etiology &&
      form.diagnosis_signs
        ? `${form.diagnosis_problem} ${form.diagnosis_etiology} ${form.diagnosis_signs}`
        : ""
    }
  />
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
              type="radio"
              name="nutrition_problem"
              checked={form.diagnosis_problem === item.label}
              onChange={() => {
                setField("diagnosis_problem", item.label);
                setField("diagnosis_etiology", item.etiology);
                setShowProblemChart(false);
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
