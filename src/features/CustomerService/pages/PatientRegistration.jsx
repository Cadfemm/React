import React, { useState } from "react";
import { GROUPED_ICD_TO_DEPT } from "../../../data/masterData";

export default function PatientRegister({ addPatient }) {

  const [form, setForm] = useState({
    name: "",
    age: "",
    sex: "",
    race: "",
    accommodation: "",
    nkfa: "",
    residence: "",
    occupation: "",
    marital_status: "",
    icd: "",
    weight: "",
    height: "",
    remarks: "",
    diagnosis_history: "",     // NEW FIELD
    medical_history: ""        // NEW FIELD
  });

  const ICD_LIST = Object.keys(GROUPED_ICD_TO_DEPT);

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  // AUTO BMI CALCULATION
  const bmi =
    form.weight && form.height
      ? (form.weight / ((form.height / 100) ** 2)).toFixed(1)
      : "";

  const handleSubmit = () => {
    const depts = GROUPED_ICD_TO_DEPT[form.icd] || [];

    const newPatient = {
      id: "MRN" + Date.now(),
      name: form.name,
      age: form.age,
      sex: form.sex,
      race: form.race,
      accommodation: form.accommodation,
      nkfa: form.nkfa,
      residence: form.residence,
      occupation: form.occupation,
      marital_status: form.marital_status,
      icd: form.icd,
      ul: "-",
      weight: form.weight,
      height: form.height,
      bmi: bmi,
      remarks: form.remarks,

      // NEWLY ADDED FIELDS STORED HERE
      diagnosis_history: form.diagnosis_history,
      medical_history: form.medical_history,

      departments: depts
    };

    addPatient(newPatient);
    alert("Patient Registered Successfully!");
  };

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h2>Customer Service</h2>

      {/* BASIC INFO */}
      <label>Name</label>
      <input value={form.name} onChange={e => setField("name", e.target.value)} style={{ width:"100%" }}/>

      <label>Age</label>
      <input value={form.age} onChange={e => setField("age", e.target.value)} style={{ width:"100%" }}/>

      <label>Sex</label>
      <select value={form.sex} onChange={e => setField("sex", e.target.value)} style={{ width:"100%" }}>
        <option value="">Select</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <label>Race</label>
      <input value={form.race} onChange={e => setField("race", e.target.value)} style={{ width:"100%" }}/>

      <label>Accommodation</label>
      <select value={form.accommodation} onChange={e => setField("accommodation", e.target.value)} style={{ width:"100%" }}>
        <option value="">Select</option>
        <option>Ward</option>
        <option>Hostel</option>
      </select>

      <label>NKFA (Allergies)</label>
      <input value={form.nkfa} onChange={e => setField("nkfa", e.target.value)} style={{ width:"100%" }}/>

      <label>Place of Residence</label>
      <input value={form.residence} onChange={e => setField("residence", e.target.value)} style={{ width:"100%" }}/>

      <label>Occupation</label>
      <input value={form.occupation} onChange={e => setField("occupation", e.target.value)} style={{ width:"100%" }}/>

      <label>Marital Status</label>
      <select value={form.marital_status} onChange={e => setField("marital_status", e.target.value)} style={{ width:"100%" }}>
        <option value="">Select</option>
        <option>Married</option>
        <option>Single</option>
      </select>

      <label>Grouping ICD</label>
      <select value={form.icd} onChange={e => setField("icd", e.target.value)} style={{ width:"100%" }}>
        <option value="">Select ICD</option>
        {ICD_LIST.map(i => <option key={i} value={i}>{i}</option>)}
      </select>

      {/* NEW FIELDS */}
      <h3 style={{ marginTop: 20 }}>Clinical Information</h3>

      <label>Diagnosis History</label>
      <textarea
        value={form.diagnosis_history}
        onChange={(e) => setField("diagnosis_history", e.target.value)}
        style={{ width: "100%" }}
        placeholder="Enter diagnosis history..."
      />

      <label>Medical History</label>
      <textarea
        value={form.medical_history}
        onChange={(e) => setField("medical_history", e.target.value)}
        style={{ width: "100%" }}
        placeholder="Enter medical history..."
      />

      {/* ANTHROPOMETRIC SECTION */}
      <h3 style={{ marginTop: 20 }}>Anthropometric Measurement</h3>

      <label>Weight (kg)</label>
      <input
        type="number"
        value={form.weight}
        onChange={e => setField("weight", e.target.value)}
        style={{ width:"100%" }}
      />

      <label>Height (cm)</label>
      <input
        type="number"
        value={form.height}
        onChange={e => setField("height", e.target.value)}
        style={{ width:"100%" }}
      />

      <label>BMI (Auto)</label>
      <input
        value={bmi}
        readOnly
        style={{
          width:"100%",
          background:"#eee",
          fontWeight:"bold"
        }}
      />

      <label>Remarks</label>
      <textarea
        value={form.remarks}
        onChange={e => setField("remarks", e.target.value)}
        style={{ width:"100%" }}
      />

      {/* SUBMIT BUTTON */}
      <button 
        onClick={handleSubmit}
        style={{
          marginTop:20,
          width:"100%",
          padding:12,
          background:"#0050ff",
          border:"none",
          borderRadius:6,
          color:"white",
          cursor:"pointer"
        }}
      >
        Save Patient
      </button>

    </div>
  );
}
