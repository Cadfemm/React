import React, { useState } from "react";
import { GROUPED_ICD_TO_DEPT } from "../../../data/masterData";

export default function PatientRegister({ addPatient }) {

  const [form, setForm] = useState({
    name: "",
    dob: "", 
    age: "",
    sex: "",
    phone: "",
    race: "",
    accommodation: "",
    nkfa: "",
    residence: "",
    occupation: "",
    marital_status: "",
    employment_status: "",
    education_background: "",
    education_background_other: "",
    living_environment: "",
    living_environment_other: "",
    icd: "",
    date_of_onset: "",
    weight: "",
    height: "",
    neck_circumference: "",
    weight_record_date: "",  // Auto-captured when weight/height is entered
    remarks: "",
    diagnosis_history: "",     // NEW FIELD
    medical_history: "",       // NEW FIELD
    lmp_date: "",              // Last Menstrual Date (female, age > 8)
    case_manager: "",          // Case Manager - flows to CM in Resus Bay
    main_caregiver: ""         // Main caregiver (in Carer Information)
  });

  const ICD_LIST = Object.keys(GROUPED_ICD_TO_DEPT);
const [carerCount, setCarerCount] = useState(0);
const [carers, setCarers] = useState([]);
const generateCarers = (count) => {
  const list = Array.from({ length: count }, (_, i) => ({
    id: "CARER-" + (i + 1) + "-" + Date.now(),
    name: "",
    phone: ""
  }));
  setCarers(list);
};

const updateCarer = (index, key, value) => {
  setCarers(prev =>
    prev.map((c, i) =>
      i === index ? { ...c, [key]: value } : c
    )
  );
};
const calculateAge = (dob) => {
  if (!dob) return "";
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

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
      dob: form.dob,
  age: form.age,  
      age: form.age,
      sex: form.sex,
      phone: form.phone,
      race: form.race,
      accommodation: form.accommodation,
      nkfa: form.nkfa,
      residence: form.residence,
      occupation: form.occupation,
      marital_status: form.marital_status,
      employment_status: form.employment_status,
      education_background: form.education_background,
      education_background_other: form.education_background_other,
      living_environment: form.living_environment,
      living_environment_other: form.living_environment_other,
      icd: form.icd,
      date_of_onset: form.date_of_onset,
      ul: "-",
      weight: form.weight,
      height: form.height,
      neck_circumference: form.neck_circumference,
      bmi: bmi,
      weight_record_date: form.weight_record_date,  // Date when weight/height was recorded
      remarks: form.remarks,

      // NEWLY ADDED FIELDS STORED HERE
      diagnosis_history: form.diagnosis_history,
      medical_history: form.medical_history,
      lmp_date: form.lmp_date,
      case_manager: form.case_manager,
      main_caregiver: form.main_caregiver,
      carers: carers,
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

      <label>Date of Birth</label>
<input
  type="date"
  value={form.dob}
  onChange={(e) => {
    const dob = e.target.value;
    setForm(prev => ({
      ...prev,
      dob,
      age: calculateAge(dob)
    }));
  }}
  style={{ width: "100%" }}
/>

<label>Age</label>
<input
  value={form.age}
  readOnly
  style={{
    width: "100%",
    background: "#eee",
    fontWeight: "bold"
  }}
/>


      <label>Gender</label>
      <select value={form.sex} onChange={e => setField("sex", e.target.value)} style={{ width:"100%" }}>
        <option value="">Select</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <label>Phone Number</label>
      <input
        type="tel"
        value={form.phone}
        onChange={e => setField("phone", e.target.value)}
        style={{ width: "100%" }}
        placeholder="Enter phone number"
      />

      <label>Case Manager</label>
      <select value={form.case_manager} onChange={e => setField("case_manager", e.target.value)} style={{ width: "100%" }}>
        <option value="">Select</option>
        <option value="Misni">Misni</option>
        <option value="Lasya">Lasya</option>
        <option value="Dean">Dean</option>
      </select>

      {(form.sex?.toLowerCase() === "female" && parseInt(form.age, 10) > 8) && (
        <>
          <label>Last Menstrual Date</label>
          <input
            type="date"
            value={form.lmp_date}
            onChange={e => setField("lmp_date", e.target.value)}
            style={{ width: "100%" }}
          />
        </>
      )}

      <label>Race</label>
      <input value={form.race} onChange={e => setField("race", e.target.value)} style={{ width:"100%" }}/>

      <label>Accommodation</label>
      <select value={form.accommodation} onChange={e => setField("accommodation", e.target.value)} style={{ width:"100%" }}>
        <option value="">Select</option>
        <option>Ward</option>
        <option>Hostel</option>
      </select>

      <label>Allergic History</label>
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

      <label>Employment Status</label>
      <select value={form.employment_status} onChange={e => setField("employment_status", e.target.value)} style={{ width:"100%" }}>
        <option value="">Select</option>
        <option value="Employed">Employed</option>
        <option value="Unemployed">Unemployed</option>
      </select>

      <label>Education Background</label>
      <select value={form.education_background} onChange={e => setField("education_background", e.target.value)} style={{ width: "100%" }}>
        <option value="">Select</option>
        <option value="Primary">Primary</option>
        <option value="Secondary">Secondary</option>
        <option value="Tertiary (Diploma/Degree)">Tertiary (Diploma/Degree)</option>
        <option value="Postgraduate">Postgraduate</option>
        <option value="Other">Other</option>
      </select>
      {form.education_background === "Other" && (
        <>
          <label>Education Background – Other (please specify)</label>
          <input
            value={form.education_background_other}
            onChange={e => setField("education_background_other", e.target.value)}
            style={{ width: "100%" }}
            placeholder="Please specify"
          />
        </>
      )}

      <label>Living Environment</label>
      <select value={form.living_environment} onChange={e => setField("living_environment", e.target.value)} style={{ width: "100%" }}>
        <option value="">Select</option>
        <option value="Single home">Single home</option>
        <option value="Apartment/condominium">Apartment/condominium</option>
        <option value="Old folks home">Old folks home</option>
        <option value="Nursing home">Nursing home</option>
        <option value="Other">Other</option>
      </select>
      {form.living_environment === "Other" && (
        <>
          <label>Living Environment – Other (please specify)</label>
          <input
            value={form.living_environment_other}
            onChange={e => setField("living_environment_other", e.target.value)}
            style={{ width: "100%" }}
            placeholder="Please specify"
          />
        </>
      )}

      <label>Grouping ICD</label>
      <select value={form.icd} onChange={e => setField("icd", e.target.value)} style={{ width:"100%" }}>
        <option value="">Select ICD</option>
        {ICD_LIST.map(i => <option key={i} value={i}>{i}</option>)}
      </select>
      <label>Date of Onset</label>
<input
  type="date"
  value={form.date_of_onset}
  onChange={e => setField("date_of_onset", e.target.value)}
  style={{ width: "100%" }}
/>

<h3 style={{ marginTop: 20 }}>Carer Information</h3>

<label>Main Caregiver</label>
<select value={form.main_caregiver} onChange={e => setField("main_caregiver", e.target.value)} style={{ width: "100%" }}>
  <option value="">Select</option>
  <option value="Husband/wife">Husband/wife</option>
  <option value="Father/mother">Father/mother</option>
  <option value="Son/daughter">Son/daughter</option>
  <option value="Maid">Maid</option>
  <option value="Hired caregiver">Hired caregiver</option>
</select>

<label>Number of Carers</label>
<select
  value={carerCount}
  onChange={(e) => {
    const count = Number(e.target.value);
    setCarerCount(count);
    generateCarers(count);
  }}
  style={{ width: "100%" }}
>
  <option value={0}>Select</option>
  <option value={1}>1</option>
  <option value={2}>2</option>
  <option value={3}>3</option>
</select>
{carers.map((carer, index) => (
  <div
    key={carer.id}
    style={{
      border: "1px solid #ddd",
      padding: 12,
      borderRadius: 6,
      marginTop: 12
    }}
  >
    <strong>Carer {index + 1}</strong>

    <label>Carer ID</label>
    <input
      value={carer.id}
      readOnly
      style={{ width: "100%", background: "#eee" }}
    />

    <label>Carer Name</label>
    <input
      value={carer.name}
      onChange={(e) =>
        updateCarer(index, "name", e.target.value)
      }
      style={{ width: "100%" }}
    />

    <label>Carer Phone</label>
    <input
      value={carer.phone}
      onChange={(e) =>
        updateCarer(index, "phone", e.target.value)
      }
      style={{ width: "100%" }}
    />
  </div>
))}

      {/* NEW FIELDS */}
      <h3 style={{ marginTop: 20 }}>Clinical Information</h3>

      <label>Clinical Diagnosis</label>
      <textarea
        value={form.diagnosis_history}
        onChange={(e) => setField("diagnosis_history", e.target.value)}
        style={{ width: "100%" }}
        placeholder="Enter diagnosis..."
      />

      <label>Past Medical & Family History</label>
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
        onChange={e => {
          setField("weight", e.target.value);
          // Auto-capture date when weight is entered
          if (e.target.value && !form.weight_record_date) {
            setField("weight_record_date", new Date().toISOString().split('T')[0]);
          }
        }}
        style={{ width:"100%" }}
      />

      <label>Height (cm)</label>
      <input
        type="number"
        value={form.height}
        onChange={e => {
          setField("height", e.target.value);
          // Auto-capture date when height is entered
          if (e.target.value && !form.weight_record_date) {
            setField("weight_record_date", new Date().toISOString().split('T')[0]);
          }
        }}
        style={{ width:"100%" }}
      />

      <label>Neck Circumference (cm)</label>
      <input
        type="number"
        value={form.neck_circumference}
        onChange={e => setField("neck_circumference", e.target.value)}
        style={{ width:"100%" }}
        placeholder="Enter neck circumference"
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
