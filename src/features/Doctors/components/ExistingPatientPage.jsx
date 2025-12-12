import React, { useState, useRef } from "react";
import VisualAssessment  from "../components/Visual";
import SwallowingAssessment from "./SwallowingAssessment";
import PatientReports from "../../PatientReports"; // 🔹 NEW

/* -------------------------------------------------------------
   MULTISELECT CHECKBOX DROPDOWN  (UI ONLY - NO BUSINESS LOGIC)
------------------------------------------------------------- */
function MultiSelectDropdown({ options, selected, setSelected }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
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
export function ExaminationDAssessmentForm({ patient, onUpdatePatient }) {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef(null);

  /* --------- Store Assessment Data for Report --------- */
  const [swallowingData, setSwallowingData] = useState(null);
  const [visualData, setVisualData] = useState(null);

  /* 🔹 NEW: show/hide report panels */
  const [showDoctorReports, setShowDoctorReports] = useState(false);
  const [showDietReports, setShowDietReports] = useState(false);

  /* --------- Tabs --------- */
  const tabs = [
    "Cognitive",
    "Swallowing",
    "Speech & Language",
    "Visual",
    "Hearing",
    "Cardiovascular & Respiratory System",
    "Spasm & Spasticity",
    "Pain",
    "Bowel Issue",
    "Bladder Issue",
    "Skin",
    "Neuro",
    "Spinal Cord Injury",
    "Amputee",
    "ADL & IADL",
    "Mobility",
    "Social History",
    "Work History",
  ];

  /* --------- Referral Department Options --------- */
  const departmentOptions = [
    "Dietetics",
    "Physiotherapy",
    "Occupational Therapy",
    "Speech Therapy",
    "Psychology",
    "Medical",
    "Nursing",
    "Orthotics & Prosthetics",
    "Social Work",
  ];

  const [selectedDepartments, setSelectedDepartments] = useState([]);

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

    const updated = {
      ...patient,
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
      },
      // human-readable summary text (same as bottom UI)
      summaryText: {
        swallowing: buildSwallowingSummaryText(swallowingData),
        visual: buildVisualSummaryText(visualData),
      },
    };

    localStorage.setItem(key, JSON.stringify([...existingReports, report]));

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

      {/* 🔹 BUTTON ROW FOR REPORTS */}
      <div
        style={{
          marginBottom: 12,
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <button
          style={btnReport}
          onClick={() => setShowDoctorReports(true)}
        >
          🩺 Doctor Reports
        </button>
        <button
          style={btnReport}
          onClick={() => setShowDietReports(true)}
        >
          🍽️ Diet Progress
        </button>
      </div>

      {/* 🔹 DOCTOR REPORTS PANEL */}
      {showDoctorReports && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <h3 style={{ margin: 0 }}>Doctor Reports</h3>
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

          <PatientReports patient={patient} mode="doctor" />
        </div>
      )}

      {/* 🔹 DIET PROGRESS REPORTS PANEL */}
      {showDietReports && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <h3 style={{ margin: 0 }}>Diet Progress Reports</h3>
            <button
              onClick={() => setShowDietReports(false)}
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

          {/* This expects your PatientReports to handle mode="progress" */}
          <PatientReports patient={patient} mode="progress" />
        </div>
      )}

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
            width: "100%",
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 20,
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
            width: "100%",
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          Generate Report
        </button>

        {/* TAB CONTENT (only once now) */}
        {tabs[activeTab] === "Visual" ? (
          <VisualAssessment onChange={setVisualData} />
        ) : tabs[activeTab] === "Swallowing" ? (
          <SwallowingAssessment onChange={setSwallowingData} />
        ) : (
          <div style={{ padding: "20px 0" }}>
            <h3 style={{ textAlign: "center" }}>{tabs[activeTab]} Module</h3>
            <p>
              Content for <strong>{tabs[activeTab]}</strong> tab goes here.
            </p>
          </div>
        )}

        {/* ===================== LIVE SUMMARY AT BOTTOM ===================== */}
        <div
          style={{
            marginTop: 24,
            padding: 16,
            borderRadius: 8,
            background: "#f8f9fa",
            border: "1px solid #e2e6ea",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>
            Summary of Assessments
          </h3>

          {!swallowingData && !visualData ? (
            <p style={{ fontSize: 14, color: "#666" }}>
              No assessment data entered yet. Start filling Swallowing or Visual
              tabs to see a summary here.
            </p>
          ) : (
            <>
              {/* Swallowing summary */}
              {swallowingData && (
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
                      <>
                        <li>
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
                        </li>
                        <li>
                          Symptoms during meals:{" "}
                          <strong>
                            {swallowingData.symptoms || "Not recorded"}
                          </strong>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}

              {/* Visual summary */}
              {visualData && (
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
                          ? visualData.notes
                          : "None"}
                      </strong>
                    </li>
                  </ul>
                </div>
              )}

              <p style={{ marginTop: 10, fontSize: 12, color: "#777" }}>
                This summary is what will be stored when you click{" "}
                <strong>Generate Report</strong>.
              </p>
            </>
          )}
        </div>
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

/* ---------------------- Styles ---------------------- */

const btnReport = {
  padding: "8px 16px",
  background: "#0277bd",
  color: "white",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
};
