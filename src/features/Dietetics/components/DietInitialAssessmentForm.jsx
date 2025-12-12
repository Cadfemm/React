import React, { useState, useEffect } from "react";
import PatientReports from "../../PatientReports"; // ⬅ adjust path if needed

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
    diagnosis_etiology: "",
    diagnosis_signs: "",
  });
// ----------------------------------------------
// DOCTOR REPORTS STATE + LOAD
// ----------------------------------------------
const [doctorReports, setDoctorReports] = useState([]);
const [showDoctorReports, setShowDoctorReports] = useState(false);

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
            <div><strong>ID/MRN:</strong> {patient.id}</div>
            <div><strong>Age/Sex:</strong> {patient.age} / {patient.sex}</div>
            <div><strong>Accommodation:</strong> {patient.accommodation}</div>
            <div><strong>Residence:</strong> {patient.residence}</div>
            <div><strong>NKFA:</strong> {patient.nkfa}</div>
            <div><strong>ICD Group:</strong> {patient.icd}</div>
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
          <h5>Anthropometry</h5>
          <div style={anthroGrid}>
            <div>
              <label>Weight (kg)</label>
              <input style={styles.readonlyInput} value={patient.weight} readOnly />
            </div>
            <div>
              <label>Height (cm)</label>
              <input style={styles.readonlyInput} value={patient.height} readOnly />
            </div>
            <div>
              <label>BMI</label>
              <input style={styles.readonlyInput} value={bmi} readOnly />
            </div>
          </div>
        </div>

        {/* PHYSICAL FINDINGS */}
        <div className="card">
          <h3 style={{ textAlign: "center" }}>       Initial Evaluation - Screening</h3>

          <label>Oral Intake</label>
          <select
            style={styles.input}
            value={form.oral_intake}
            onChange={(e) => setField("oral_intake", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="YES">Normal Diet</option>
            <option value="NO">Other Type</option>
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
            <option value="YES">Impaired</option>
            <option value="NO">Normal</option>
          </select>

          {/* CHEWING ISSUE */}
          <label>Chewing</label>
          <select
            style={styles.input}
            value={form.chewing_issue}
            onChange={(e) => setField("chewing_issue", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="YES">Normal</option>
            <option value="NO">Impaired</option>
          </select>

          {/* DENTITION */}
          <label>Dentition</label>
          <input
            style={styles.input}
            value={form.dentition_issue}
            onChange={(e) => setField("dentition_issue", e.target.value)}
          />

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

          <label>Bowel</label>
          <select
            style={styles.input}
            value={form.bo}
            onChange={(e) => setField("bo", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="GOOD">GOOD</option>
            <option value="BAD">BAD</option>
          </select>

          {form.bo === "BAD" && (
            <input
              style={styles.input}
              placeholder="Describe BO issue..."
              value={form.bo_details}
              onChange={(e) => setField("bo_details", e.target.value)}
            />
          )}

          <label>Bladder</label>
          <select
            style={styles.input}
            value={form.pu}
            onChange={(e) => setField("pu", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="GOOD">GOOD</option>
            <option value="BAD">BAD</option>
          </select>

          {form.pu === "BAD" && (
            <input
              style={styles.input}
              placeholder="Describe PU issue..."
              value={form.pu_details}
              onChange={(e) => setField("pu_details", e.target.value)}
            />
          )}

          <label>Sleeping Pattern</label>
          <select
            style={styles.input}
            value={form.sleep}
            onChange={(e) => setField("sleep", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="GOOD">GOOD</option>
            <option value="DIFFICULTY">Difficulty in sleeping</option>
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

          <label>Other Complaints</label>
          <textarea
            style={styles.textarea}
            value={form.other_complaints}
            onChange={(e) => setField("other_complaints", e.target.value)}
          />
        </div>

                {/* B. NUTRITION DIAGNOSIS */}
        <div className="card">


          <label>Nutrition Diagnosis</label>
          <input
            style={styles.input}
            value={form.diagnosis_problem}
            onChange={(e) => setField("diagnosis_problem", e.target.value)}
          />

          <label>Etiology</label>
          <input
            style={styles.input}
            value={form.diagnosis_etiology}
            onChange={(e) => setField("diagnosis_etiology", e.target.value)}
          />

          <label>Signs & Symptoms</label>
          <textarea
            style={styles.textarea}
            value={form.diagnosis_signs}
            onChange={(e) => setField("diagnosis_signs", e.target.value)}
          />
        </div>

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
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  readonlyInput: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    background: "#eee",
    color: "#333",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
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
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 12,
};


