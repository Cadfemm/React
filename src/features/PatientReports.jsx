import React, { useEffect, useState } from "react";

export default function PatientReports({ patient, mode }) {

  const [reports, setReports] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); // which report is expanded

  useEffect(() => {
    if (!patient?.id) return;

    const key = `patient_${patient.id}_reports`;
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    setReports(saved);
  }, [patient?.id]);
const filteredReports =
  mode === "progress"
    ? reports.filter((r) => r.type === "progress")
    : mode === "doctor"
    ? reports.filter((r) => r.createdBy === "Doctor" && r.type !== "progress")
    : reports;

  if (!patient) return null;

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "";
    const d = new Date(timestamp);
    return d.toLocaleString();
  };

const getTitle = (r) => {
  if (r.type === "progress") return "Diet Progress Report";  // 💡 or "Diet Progress Assessment"
  if (r.createdBy === "Doctor") return "Doctor Assessment";
  if (r.type) return `${r.type} Report`;
  return "Report";
};


const renderDoctorReportDetails = (r) => {
  const swallowing = r.summary?.swallowing || {};
  const visual = r.summary?.visual || {};

  const difficultyLabel =
    swallowing.hasDifficulty === "yes"
      ? "Yes"
      : swallowing.hasDifficulty === "no"
      ? "No"
      : "Not recorded";

  const onsetLabel = swallowing.onset || "Not recorded";
  const foodLabel = swallowing.foodDifficulty || "Not recorded";
  const dietLabel = swallowing.dietModification || "Not recorded";
  const symptomsLabel = swallowing.symptoms || "Not recorded";

  const acuityLabel = visual.acuity || "Not recorded";
  const fieldDefectLabel = visual.fieldDefect || "Not recorded";
  const notesLabel =
    visual.notes && visual.notes.trim() ? visual.notes : "None";

  return (
    <div
      style={{
        marginTop: 10,
        padding: 12,
        borderRadius: 8,
        background: "#f8f9fa",
        border: "1px solid #ddd",
        fontSize: 14,
      }}
    >

      {/* ================= Swallowing Section ================= */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            background: "#005b82",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: 6,
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Swallowing
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <th style={rowHead}>Swallowing difficulty</th>
              <td style={rowData}>{difficultyLabel}</td>
            </tr>
            <tr>
              <th style={rowHead}>Onset & progression</th>
              <td style={rowData}>{onsetLabel}</td>
            </tr>
            <tr>
              <th style={rowHead}>Food / liquid difficulties</th>
              <td style={rowData}>{foodLabel}</td>
            </tr>
            <tr>
              <th style={rowHead}>Diet modification</th>
              <td style={rowData}>{dietLabel}</td>
            </tr>
            <tr>
              <th style={rowHead}>Symptoms during meals</th>
              <td style={rowData}>{symptomsLabel}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= Visual Section ================= */}
      {/* <div>
        <div
          style={{
            background: "#005b82",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: 6,
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Visual
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <th style={rowHead}>Visual acuity</th>
              <td style={rowData}>{acuityLabel}</td>
            </tr>
            <tr>
              <th style={rowHead}>Field defect</th>
              <td style={rowData}>{fieldDefectLabel}</td>
            </tr>
            <tr>
              <th style={rowHead}>Notes</th>
              <td style={rowData}>{notesLabel}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: 12, color: "#777", marginTop: 10 }}>
        * This is the same summary the doctor saw in their assessment screen.
      </div> */}
    </div>
  );
};

  const renderProgressReportDetails = (r) => {
    const p = r.patientSnapshot || {};

    const initial = r.dietInitial; // comes from saveProgressReport()

    return (
      <div style={{ padding: 12 }}>
        {/* PATIENT HEADER */}
        <div style={rowHead}>Patient Details</div>
        <div style={rowData}>
          <div>
            <strong>Name:</strong> {p.name || patient?.name || "—"}
          </div>
          <div>
            <strong>ID:</strong> {p.id || patient?.id || "—"}
          </div>
          <div>
            <strong>Age / Sex:</strong>{" "}
            {(p.age || patient?.age || "—") +
              " / " +
              (p.sex || patient?.gender || patient?.sex || "—")}
          </div>
          {p.ward && (
            <div>
              <strong>Ward:</strong> {p.ward}
            </div>
          )}
          {p.diagnosis && (
            <div>
              <strong>Diagnosis:</strong> {p.diagnosis}
            </div>
          )}
        </div>

        {/* INITIAL DIET ASSESSMENT */}
        <div style={{ marginTop: 12 }}>
          <div style={rowHead}>Diet Initial Assessment</div>
          <div style={rowData}>
            {!initial ? (
              <div style={{ color: "#666" }}>
                No initial diet assessment found for this patient.
              </div>
            ) : (
              <>
                {/* These keys depend on your form field names – adjust as needed */}
                <div>
                  <strong>Nutrition diagnosis:</strong>{" "}
                  {initial.form?.nutrition_diagnosis || "—"}
                </div>
                <div>
                  <strong>Food preferences:</strong>{" "}
                  {initial.form?.food_preference || "—"}
                </div>
                <div>
                  <strong>Meal pattern:</strong>{" "}
                  {initial.form?.meal_pattern || "—"}
                </div>

                {/* Optional: see everything in raw form */}
                <button
                  style={{
                    marginTop: 6,
                    padding: "4px 8px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    background: "#f7f7f7",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                  onClick={() =>
                    alert(
                      "Full initial assessment:\n\n" +
                        JSON.stringify(initial.form, null, 2)
                    )
                  }
                >
                  View full initial assessment
                </button>
              </>
            )}
          </div>
        </div>

        {/* PROGRESS – PLAN / INTERVENTION */}
        <div style={{ marginTop: 12 }}>
          <div style={rowHead}>Progress Plan / Intervention</div>
          <div style={rowData}>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {r.plan?.initiateNutrition && (
                <li>
                  <strong>Initiate nutrition:</strong> {r.plan.initiateNutrition}
                </li>
              )}
              {r.plan?.orderConsult && (
                <li>
                  <strong>Order nutrition consult:</strong> {r.plan.orderConsult}
                </li>
              )}
              {r.plan?.monitorIntake && (
                <li>
                  <strong>Monitor oral intake:</strong> {r.plan.monitorIntake}
                </li>
              )}
              {r.plan?.supplements && (
                <li>
                  <strong>Supplements / enteral:</strong> {r.plan.supplements}
                </li>
              )}
              {r.plan?.documentPlan && (
                <li>
                  <strong>Follow-up plan:</strong> {r.plan.documentPlan}
                </li>
              )}
              {r.plan?.otherPlan && (
                <li>
                  <strong>Other plan:</strong> {r.plan.otherPlan}
                </li>
              )}
              {!r.plan && (
                <li style={{ color: "#666" }}>No plan recorded in this report.</li>
              )}
            </ul>
          </div>
        </div>

        {/* PROGRESS GOALS */}
        <div style={{ marginTop: 12 }}>
          <div style={rowHead}>Goals</div>
          <div style={rowData}>
            <div>
              <strong>Short term:</strong>{" "}
              {r.goals?.shortTerm || "Not specified"}
            </div>
            <div>
              <strong>Long term:</strong>{" "}
              {r.goals?.longTerm || "Not specified"}
            </div>
          </div>
        </div>
      </div>
    );
  };


  const renderDietReportDetails = (r) => {
    const text = r.content || "No detailed content available.";
    return (
      <div
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 6,
          background: "#f8f9fa",
          border: "1px solid #e2e6ea",
          fontSize: 14,
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </div>
    );
  };

const renderDetails = (r) => {
  // 🔹 Progress reports (Diet) – use the progress layout
  if (r.type === "progress") {
    return renderProgressReportDetails(r);
  }

  // 🔹 Doctor-type reports
  if (r.createdBy === "Doctor" || r.summaryText) {
    return renderDoctorReportDetails(r);
  }

  // 🔹 Other diet reports
  return renderDietReportDetails(r);
};


return (
  <div style={{ padding: 15 }}>
    <h3 style={{ marginBottom: 12 }}>Reports</h3>

    {filteredReports.length === 0 ? (
      <div style={{ color: "#666", fontSize: 14 }}>
        {mode === "progress"
          ? "No progress reports generated yet."
          : "No reports generated yet."}
      </div>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filteredReports.map((r, index) => {
          const isOpen = openIndex === index;
          const hasDoctorSummary = r.createdBy === "Doctor" || r.summaryText;

          return (
            <div
              key={index}
              style={{
                padding: 12,
                border: "1px solid #ccc",
                borderRadius: 6,
                background: "#fafafa",
              }}
            >
              <strong>{getTitle(r)}</strong>

              <div style={{ fontSize: 13, color: "#444", marginTop: 4 }}>
                {r.timestamp
                  ? formatDateTime(r.timestamp)
                  : r.date && r.time
                  ? `${r.date} — ${r.time}`
                  : ""}
              </div>

              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                style={{
                  marginTop: 8,
                  padding: "6px 10px",
                  fontSize: 13,
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                {isOpen ? "Hide Report" : "View Report"}
              </button>

              {/* ⬇️ this is the snippet you asked about */}
              {isOpen && (
                <div style={{ marginTop: 8 }}>
                  {r.type === "progress" ? (
                    renderProgressReportDetails(r)
                  ) : hasDoctorSummary ? (
                    renderDoctorReportDetails(r)
                  ) : (
                    <div style={{ fontSize: 13, color: "#555" }}>
                      No detailed summary stored for this report.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    )}
  </div>
);

}
const rowHead = {
  textAlign: "left",
  padding: "8px 10px",
  border: "1px solid #ddd",
  background: "rgb(50 95 122 / 0%)",
  color:"#000",
  width: "220px",
};

const rowData = {
  padding: "8px 10px",
  border: "1px solid #ddd",
  whiteSpace: "pre-wrap",
};
