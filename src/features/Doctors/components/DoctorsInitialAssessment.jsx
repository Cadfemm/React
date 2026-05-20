import React, { useState, useRef, useEffect } from "react";
import  VisualAssessment from "../components/Visual";
import SocialHistory from "./SocialHistory";
import WorkHistory from "./WorkHistory";
import SwallowingAssessment from "./SwallowingAssessment";
import CognitiveAssessmentForm from "./CognitiveAssessment";
import Physical from "./Physical";
import SpasmSpasticity from "./SpasmSpasticity";
import HearingAssessment from "./HearingAssessment";
import CardiovascularRespiratoryAssessment from "./CardiovascularRespiratoryAssessment";
import BowelAssessment from "./BowelAssessment";
import BladderAssessment from "./BladderAssessment";
import SexualAssessment from "./SexualAssessment";
import FunctionalAssessment from "./Functional";
import SkinAssessment from "./SkinAssessment";
import ProcedureAssessment from "./ProcedureAssessment";
import MedicationAssessment from "./MedicationAssessment";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PatientCard from "../../../shared/cards/PatientCard";

/* -------------------------------------------------------------
   MULTISELECT CHECKBOX DROPDOWN  (UI ONLY - NO BUSINESS LOGIC)
------------------------------------------------------------- */
function MultiSelectDropdown({ options, selected, setSelected }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
const icdOptions = [
  "Stroke Comprehensive",
  "Traumatic Brain Injury Comprehensive",
  "Spinal Cord Injury Long-Term Comprehensive",
  "Multiple Sclerosis Comprehensive",
  "Musculoskeletal post-Acute Comprehensive",
  "Low Back Pain Comprehensive",
  "Osteoarthritis Comprehensive",
  "Cardiopulmonary post-acute Comprehensive",
  "Diabetes Mellitus Comprehensive",
  "Children / Youth with Cerebral Palsy Comprehensive",
  "Vertigo Comprehensive",
  "Hearing Loss Comprehensive",
  "Vocational Rehabilitation Comprehensive",
  "Hand Condition Comprehensive",
  "Depression Comprehensive",
  "Bipolar Disorders Comprehensive"
];

const [primaryICD, setPrimaryICD] = useState("");
const [secondaryICD, setSecondaryICD] = useState("");
const [showSecondary, setShowSecondary] = useState(false);
  return (
    <div>
      {/* PRIMARY ICD */}
     
      {/* <div><h3>Assessment</h3><textarea></textarea></div>
      <div><h3>Plan</h3><textarea></textarea></div> */}
<div style={{ marginBottom: 20 }}>
  <label style={{ fontWeight: 600 }}>Primary ICD</label>
  <select
    value={primaryICD}
    onChange={(e) => setPrimaryICD(e.target.value)}
    style={{
      width: "100%",
      padding: 10,
      borderRadius: 6,
      border: "1px solid #ccc",
      marginTop: 6,
    }}
  >
    <option value="">Select Primary ICD</option>
    {icdOptions.map((code) => (
      <option key={code} value={code}>
        {code}
      </option>
    ))}
  </select>

  {/* PLUS BUTTON TO ADD SECONDARY ICD */}
  {!showSecondary && (
    <button
      onClick={() => setShowSecondary(true)}
      style={{
        marginTop: 8,
        padding: "6px 10px",
        borderRadius: 6,
        background: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      + Add Secondary ICD
    </button>
  )}
</div>

{/* SECONDARY ICD (appears only after + is clicked) */}
{showSecondary && (
  <div style={{ marginBottom: 20 }}>
    <label style={{ fontWeight: 600 }}>Secondary ICD</label>
    <select
      value={secondaryICD}
      onChange={(e) => setSecondaryICD(e.target.value)}
      style={{
        width: "100%",
        padding: 10,
        borderRadius: 6,
        border: "1px solid #ccc",
        marginTop: 6,
      }}
    >
      <option value="">Select Secondary ICD</option>
      {icdOptions.map((code) => (
        <option key={code} value={code}>
          {code}
        </option>
      ))}
    </select>
  </div>
)}
    <div
      ref={dropdownRef}
      style={{ width: "100%", marginBottom: 20, position: "relative" }}
    >
      <label style={{ fontWeight: 600 }}>Refer to Departments</label>

      <div
        onClick={() => setOpen(!open)}
        style={{
          border: "1px solid #ccc",
          padding: 10,
          borderRadius: 6,
          background: "#fff",
          cursor: "pointer",
        }}
      >
        {selected.length ? selected.join(", ") : "Select departments"}
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 6,
            width: "100%",
            marginTop: 4,
            zIndex: 999,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {options.map((opt) => (
            <label
              key={opt}
              style={{ display: "flex", alignItems: "center", padding: 8 }}
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() =>
                  setSelected(
                    selected.includes(opt)
                      ? selected.filter((o) => o !== opt)
                      : [...selected, opt]
                  )
                }
                style={{ marginRight: 10 }}
              />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

/* -------------------------------------------------------------
   HELPERS: SAME SUMMARY TEXT FOR UI + REPORT
------------------------------------------------------------- */

function buildSwallowingSummaryText(data) {
  if (!data) return "No swallowing assessment recorded.";

  const parts = [];

  if (data.hasDifficulty === "yes") {
    parts.push("Swallowing difficulty: Yes.");
  } else if (data.hasDifficulty === "no") {
    parts.push("Swallowing difficulty: No.");
  } else {
    parts.push("Swallowing difficulty: Not recorded.");
  }

  if (data.hasDifficulty === "yes") {
    parts.push(
      `Onset & progression: ${
        data.onset && data.onset.trim() ? data.onset : "Not recorded"
      }.`
    );
    parts.push(
      `Food / liquid difficulties: ${
        data.foodDifficulty && data.foodDifficulty.trim()
          ? data.foodDifficulty
          : "Not recorded"
      }.`
    );
    parts.push(
      `Diet modification: ${
        data.dietModification && data.dietModification.trim()
          ? data.dietModification
          : "Not recorded"
      }.`
    );
    parts.push(
      `Symptoms during meals: ${
        data.symptoms && data.symptoms.trim()
          ? data.symptoms
          : "Not recorded"
      }.`
    );
  }

  return parts.join(" ");
}

function buildVisualSummaryText(data) {
  if (!data) return "No visual assessment recorded.";

  const parts = [];

  parts.push(
    `Visual acuity: ${
      data.acuity && data.acuity.trim() ? data.acuity : "Not recorded"
    }.`
  );
  parts.push(
    `Field defect: ${
      data.fieldDefect && data.fieldDefect.trim()
        ? data.fieldDefect
        : "Not recorded"
    }.`
  );
  parts.push(
    `Notes: ${
      data.notes && data.notes.trim() ? data.notes : "None"
    }.`
  );

  return parts.join(" ");
}

/* -------------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------------- */
export function DoctorsInitialAssessmentForm({ patient, onUpdatePatient }) {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef(null);

  /* --------- Store Assessment Data for Report --------- */
  const [swallowingData, setSwallowingData] = useState(null);
  const [visualData, setVisualData] = useState(null);
  const [CognitiveData, setCognitiveData] = useState(null);
  const [PhysicalData, setPhysicalData] = useState(null);
const [CardiovascularRespiratoryAssessmentData, setCardiovascularRespiratoryAssessmentData] = useState(null);
const [HearingAssessmentData, setHearingAssessmentData] = useState(null);
const [BowelAssessmentData, setBowelAssessmentData] = useState(null);
const [BladderAssessmentData, setBladderAssessmentData] = useState(null);
const [FunctionalAssessmentData,setFunctionalAssessmentData] = useState(null);
const [SkinAssessmentData, setSkinAssessmentData] = useState(null);

  // Patient history fields (stored back on the patient record).
  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: patient?.medical_history || "",
    past_family_history: patient?.family_medical_history || "",
    alerts_and_allergies: patient?.alerts_and_allergies_history || "",
  });

  // Keep in sync when the selected patient changes.
  useEffect(() => {
    setPatientHistory({
      past_medical_history: patient?.medical_history || "",
      past_family_history: patient?.family_medical_history || "",
      alerts_and_allergies: patient?.alerts_and_allergies_history || "",
    });
  }, [patient?.id]);

  // Persist changes so other department forms can see them.
  useEffect(() => {
    if (!patient?.id) return;
    const updated = {
      ...patient,
      medical_history: patientHistory.past_medical_history,
      family_medical_history: patientHistory.past_family_history,
      alerts_and_allergies_history: patientHistory.alerts_and_allergies,
    };
    localStorage.setItem("patient_" + patient.id, JSON.stringify(updated));
    onUpdatePatient?.(updated);
  }, [patient?.id, patientHistory.past_medical_history, patientHistory.past_family_history, patientHistory.alerts_and_allergies]);

  // Doctor Goals / Plan (below tabs).
  const [doctorGoals, setDoctorGoals] = useState(patient?.doctor_goals || "");
  const [doctorPlan, setDoctorPlan] = useState(patient?.doctor_plan || "");

  useEffect(() => {
    setDoctorGoals(patient?.doctor_goals || "");
    setDoctorPlan(patient?.doctor_plan || "");
  }, [patient?.id]);

  useEffect(() => {
    if (!patient?.id) return;
    const updated = {
      ...patient,
      doctor_goals: doctorGoals,
      doctor_plan: doctorPlan,
    };
    localStorage.setItem("patient_" + patient.id, JSON.stringify(updated));
    onUpdatePatient?.(updated);
  }, [patient?.id, doctorGoals, doctorPlan]);
  /* --------- Tabs --------- */
  const tabs = [
    "Cognitive",
    "Swallowing , Speech & Language",
    "Visual",
    "Hearing",
    "Cardiovascular & Respiratory System",
    "Physical",
    "Bowel Issue",
    "Bladder Issue",
    "Sexual",
    "Spasm & Spasticity",
    "Skin",
    "Functional",
    "Social History",
    "Work History",
    "Medication"
  ];

  const today = new Date();
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return "-";
    }
  };
  const calculateDuration = (onset) => {
    if (!onset) return "-";
    const onsetDate = new Date(onset);
    const diffMs = today - onsetDate;
    if (Number.isNaN(diffMs) || diffMs < 0) return "-";
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
  };

  const section = {
    marginBottom: 24
  };

  /* --------- Referral Department Options --------- */
  const departmentOptions = [
    "Dietetics",
    "Physiotherapy",
    "Occupational Therapy",
    "Speech Therapy",
    "Psychology",
    "Medical",
    "Nursing",
    "Medical Assistant",
    "Orthotics & Prosthetics",
    "Social Work",
  ];

  const [selectedDepartments, setSelectedDepartments] = useState([]);

  /* --------- Persist bladder_control and bowel_control when doctor fills assessments --------- */
  useEffect(() => {
    if (!patient) return;
    const bladderControl = BladderAssessmentData?.urinaryProblem || "";
    const bowelControl = BowelAssessmentData?.control === "Yes" ? "CONTINENT" : BowelAssessmentData?.control === "No" ? "INCONTINENT" : "";
    if (bladderControl || bowelControl) {
      const updated = { ...patient, bladder_control: bladderControl || patient.bladder_control, bowel_control: bowelControl || patient.bowel_control };
      localStorage.setItem("patient_" + patient.id, JSON.stringify(updated));
      onUpdatePatient?.(updated);
    }
  }, [patient?.id, BladderAssessmentData?.urinaryProblem, BowelAssessmentData?.control]);

  /* --------- Scroll tab into view --------- */
  const handleTabClick = (index) => {
    setActiveTab(index);
    if (scrollRef.current && scrollRef.current.children[index]) {
      scrollRef.current.children[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };
const markDoctorExisting = (patientId) => {
  const key = `patient_${patientId}_doctor_existing`;
  const info = {
    existing: true,
    at: new Date().toISOString(),
  };
  localStorage.setItem(key, JSON.stringify(info));
};

/* --------- SUBMIT REFERRAL --------- */
const handleSubmitReferral = () => {
  if (!patient) return;

  const bladderControl = BladderAssessmentData?.urinaryProblem || patient.bladder_control || "";
  const bowelControl = BowelAssessmentData?.control === "Yes" ? "CONTINENT" : BowelAssessmentData?.control === "No" ? "INCONTINENT" : patient.bowel_control || "";
  const updated = {
    ...patient,
    bladder_control: bladderControl,
    bowel_control: bowelControl,
    // keep existing departments, always include "Doctor", plus newly selected ones
    departments: Array.from(
      new Set([
        ...(patient.departments || []),
        "Doctor",
        ...selectedDepartments,
      ])
    ),
  };

  localStorage.setItem("patient_" + patient.id, JSON.stringify(updated));

  // 🔹 Mark this patient as an “existing” patient for Doctor
  markDoctorExisting(patient.id);

  if (onUpdatePatient) {
    onUpdatePatient(updated);
  }

  alert("Referral submitted successfully!");
};





  /* ----------------------------------------------------
     GENERATE REPORT  → saved to localStorage
     (NOW WITH SAME SUMMARY TEXT)
  ---------------------------------------------------- */
  const handleGenerateReport = () => {
    if (!patient) return alert("No patient found!");

    const key = `patient_${patient.id}_reports`;
    const existingReports = JSON.parse(localStorage.getItem(key) || "[]");

    const report = {
      reportId: "doctor_assessment_" + Date.now(),
      patientId: patient.id,
      createdBy: "Doctor",
      allowedDepartments: selectedDepartments.length
        ? selectedDepartments
        : ["Doctor"],
      timestamp: Date.now(),
      // raw data (so other modules can still use it)
      summary: {
        swallowing: swallowingData,
        visual: visualData,
        bladder: BladderAssessmentData,
        bowel: BowelAssessmentData,
      },
      // human-readable summary text (same as bottom UI)
      summaryText: {
        swallowing: buildSwallowingSummaryText(swallowingData),
        visual: buildVisualSummaryText(visualData),
      },
    };

    localStorage.setItem(key, JSON.stringify([...existingReports, report]));

    // Persist bladder_control and bowel_control to patient so Diet can display (read-only)
    const bladderControl = BladderAssessmentData?.urinaryProblem || "";
    const bowelControl = BowelAssessmentData?.control === "Yes" ? "CONTINENT" : BowelAssessmentData?.control === "No" ? "INCONTINENT" : "";
    const updatedPatient = { ...patient, bladder_control: bladderControl, bowel_control: bowelControl };
    localStorage.setItem("patient_" + patient.id, JSON.stringify(updatedPatient));
    if (onUpdatePatient) onUpdatePatient(updatedPatient);

    alert("Report generated and shared with referred departments!");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        padding: 15,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ===== PATIENT INFORMATION CARD (above all Doctors tabs) ===== */}
      <PatientCard
        patient={patient}
        patientHistory={patientHistory}
        setPatientHistory={setPatientHistory}
        showDoctorsReport={false}
      />

      {/* ------------------ TABS ------------------ */}
      <div style={{ flexShrink: 0, width: "100%", marginBottom: 20 }}>
        <div
          ref={scrollRef}
          className="custom-scrollbar"
          style={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            gap: 12,
            paddingBottom: 12,
            borderBottom: "2px solid #ccc",
          }}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              style={{
                flexShrink: 0,
                padding: "10px 16px",
                borderRadius: 6,
                border:
                  activeTab === index
                    ? "2px solid #007bff"
                    : "1px solid rgba(255,255,255,0)",
                background: activeTab === index ? "#007bff" : "transparent",
                color: activeTab === index ? "#fff" : "#000",
                fontWeight: activeTab === index ? 700 : 500,
                cursor: "pointer",
                fontSize: 14,
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ------------------ CONTENT ------------------ */}
      <div
        className="content-scrollbar"
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          width: "100%",
          minHeight: 0,
       
        }}
      >
{/* <h2>Objective</h2> */}

        {/* TAB CONTENT (only once now) */}
        {tabs[activeTab] === "Visual" ? (
          <VisualAssessment onChange={setVisualData} />
        ) : tabs[activeTab] === "Swallowing , Speech & Language" ? (
          <SwallowingAssessment onChange={setSwallowingData} />
        ) : tabs[activeTab] === "Cognitive" ? (
          <CognitiveAssessmentForm onChange={setCognitiveData} />
        ) :
        tabs[activeTab] === "Physical" ? (
          <Physical onChange={setPhysicalData} />
        ) :
         tabs[activeTab] === "Cardiovascular & Respiratory System" ? (
          <CardiovascularRespiratoryAssessment onChange={setCardiovascularRespiratoryAssessmentData} />
        ) :
        tabs[activeTab] === "Hearing" ? (
          <HearingAssessment onChange={setHearingAssessmentData} />
        ) :
                tabs[activeTab] === "Functional" ? (
          <FunctionalAssessment onChange={setFunctionalAssessmentData} />
        ) :
        tabs[activeTab] === "Bowel Issue" ? (
          <BowelAssessment
            onChange={setBowelAssessmentData}
            department="doctors"
          />
        ) :
         tabs[activeTab] === "Bladder Issue" ? (
          <BladderAssessment
          onChange={setBladderAssessmentData}
          department="doctors"
        />
        ) :
         tabs[activeTab] === "Sexual" ? (
          <SexualAssessment patient={patient} />
        ) :
        tabs[activeTab] === "Spasm & Spasticity" ? (
          <SpasmSpasticity />
        ) :
        tabs[activeTab] === "Skin" ? (
          <SkinAssessment onChange={setSkinAssessmentData} />
        ) :
         tabs[activeTab] === "Social History" ? (
          <SocialHistory />
        ) :
         tabs[activeTab] === "Work History" ? (
          <WorkHistory />
        ) :
        tabs[activeTab] === "Procedure" ? (
          <ProcedureAssessment patient={patient}/>
        ) : 
        tabs[activeTab] === "Medication" ? (
          <MedicationAssessment patient={patient}/>
        ) :
         (
          <div style={{ padding: "20px 0" }}>
            <h3 style={{ textAlign: "center" }}>{tabs[activeTab]} Module</h3>
            <p>
              Content for <strong>{tabs[activeTab]}</strong> tab goes here.
            </p>
          </div>
        )}
       
        {/* ===== Doctor Goals & Plan (below tabs) ===== */}
        {/* <div
          style={{
            width: "90%",
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 4px 14px rgba(15,23,42,0.04)",
            marginBottom: 20,
          }}
        > */}
          {/* <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 10 }}>Goals</div> */}
          {/* <textarea
            value={doctorGoals}
            onChange={(e) => setDoctorGoals(e.target.value)}
            style={{
              width: "100%",
              minHeight: 90,
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              fontSize: 14,
              fontFamily: "inherit",
              resize: "vertical",
              marginBottom: 18,
            }}
          /> */}

          {/* <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 10 }}>Plan</div> */}
          {/* <textarea
            value={doctorPlan}
            onChange={(e) => setDoctorPlan(e.target.value)}
            style={{
              width: "100%",
              minHeight: 90,
              padding: "10px 12px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              fontSize: 14,
              fontFamily: "inherit",
              resize: "vertical",
            }}
          /> */}
        {/* </div> */}
        {/* REFER TO DEPARTMENTS DROPDOWN */}
        <MultiSelectDropdown
          options={departmentOptions}
          selected={selectedDepartments}
          setSelected={setSelectedDepartments}
        />

        {/* SUBMIT REFERRAL */}
        <button
          onClick={handleSubmitReferral}
          style={{
            padding: "10px 12px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          
            fontSize: 14,
            fontWeight: 600,
            marginRight: 20,
          }}
        >
          Submit Referral
        </button>

        {/* GENERATE REPORT BUTTON */}
        <button
          onClick={handleGenerateReport}
          style={{
            padding: "10px 12px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
     
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          Generate Report
        </button>


        {/* ===================== LIVE SUMMARY AT BOTTOM ===================== */}
        {/* <div
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 8,
            background: "#f8f9fa",
            border: "1px solid #e2e6ea",
          }}
        > */}
          {/* <h3 style={{ marginTop: 0, marginBottom: 12 }}>
            Summary of Assessments
          </h3>

          {!swallowingData && !visualData ? (
            <p style={{ fontSize: 14, color: "#666" }}>
              No assessment data entered yet. Start filling Swallowing or Visual
              tabs to see a summary here.
            </p>
          ) : (
            <> */}
              {/* Swallowing summary */}
              {/* {swallowingData && (
                <div style={{ marginBottom: 12 }}>
                  <h4 style={{ margin: "0 0 6px" }}>Swallowing</h4>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
                    <li>
                      Swallowing difficulty:{" "}
                      <strong>
                        {swallowingData.hasDifficulty === "yes"
                          ? "Yes"
                          : swallowingData.hasDifficulty === "no"
                          ? "No"
                          : "Not recorded"}
                      </strong>
                    </li>
                    {swallowingData.hasDifficulty === "yes" && (
                      <> */}
                        {/* <li>
                          Onset &amp; progression:{" "}
                          <strong>
                            {swallowingData.onset || "Not recorded"}
                          </strong>
                        </li>
                        <li>
                          Food / liquid difficulties:{" "}
                          <strong>
                            {swallowingData.foodDifficulty || "Not recorded"}
                          </strong>
                        </li>
                        <li>
                          Diet modification:{" "}
                          <strong>
                            {swallowingData.dietModification ||
                              "Not recorded"}
                          </strong>
                        </li> */}
                        {/* <li>
                          Symptoms during meals:{" "}
                          <strong>
                            {swallowingData.symptoms || "Not recorded"}
                          </strong>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )} */}

              {/* Visual summary */}
              {/* {visualData && (
                <div style={{ marginBottom: 4 }}>
                  <h4 style={{ margin: "0 0 6px" }}>Visual</h4>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14 }}>
                    <li>
                      Visual acuity:{" "}
                      <strong>{visualData.acuity || "Not recorded"}</strong>
                    </li>
                    <li>
                      Field defect:{" "}
                      <strong>
                        {visualData.fieldDefect || "Not recorded"}
                      </strong>
                    </li>
                    <li>
                      Notes:{" "}
                      <strong>
                        {visualData.notes && visualData.notes.trim()
                          ? visualData.notes */}
                          {/* : "None"}
                      </strong>
                    </li>
                  </ul>
                </div>
              )} */}

              {/* <p style={{ marginTop: 10, fontSize: 12, color: "#777" }}>
                This summary is what will be stored when you click{" "}
                <strong>Generate Report</strong>.
              </p>
            </>
          )}
        </div> */}
        {/* =================== END LIVE SUMMARY =================== */}
      </div>

      {/* Hide scrollbars */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar,
        .content-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar,
        .content-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}
