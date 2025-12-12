import { AlignVerticalSpaceBetween } from "lucide-react";
import React, { useState } from "react";

export default function NRS({
  onSave,
  assessmentName = "NRS",
  initialFormData = null,
}) {
  const [form, setForm] = useState(
    initialFormData || {
      // Table 1
      bmiBelow20_5: "",
      weightLoss3Months: "",
      reducedIntake: "",
      severeIllness: "",

      // Table 2 – nutritional impairment
      nutStatus: "",
      diseaseSeverity: "",
      age: "",
    }
  );

  const setField = (name, value) =>
    setForm((p) => ({ ...p, [name]: value }));

  /* ---------------------------------------------------------
     TABLE 1 LOGIC
  --------------------------------------------------------- */
  const anyTable1Yes =
    form.bmiBelow20_5 === "yes" ||
    form.weightLoss3Months === "yes" ||
    form.reducedIntake === "yes" ||
    form.severeIllness === "yes";

  /* ---------------------------------------------------------
     TABLE 2 SCORING (from PDF)
     Nutritional Status Score:
     0 = absent
     1 = mild
     2 = moderate
     3 = severe

     Disease Severity Score:
     0 = normal
     1 = mild
     2 = moderate
     3 = severe
  --------------------------------------------------------- */

  const nutScore = Number(form.nutStatus || 0);
  const diseaseScore = Number(form.diseaseSeverity || 0);
  const baseScore = nutScore + diseaseScore;

  // Age adjustment
  const ageScore = Number(form.age) >= 70 ? 1 : 0;
  const finalScore = anyTable1Yes ? baseScore + ageScore : 0;

  const riskStatus =
    finalScore >= 3
      ? "Nutritionally At-Risk — Care Plan Required"
      : "Not At-Risk — Weekly Re-Screening";

  /* ---------------------------------------------------------
     SUBMIT HANDLER (follows PatientDetails onSave logic)
  --------------------------------------------------------- */
  const handleSubmit = () => {
    if (onSave) onSave(assessmentName, form);
  };

  /* ---------------------------------------------------------
     STYLING (Clean, Lean, Professional)
  --------------------------------------------------------- */
  const sec = {
    background: "#fff",
    border: "1px solid #e5e5e5",
    padding: "14px 16px",
    borderRadius: 8,
    marginBottom: 16,
  };

  const label = {
    fontWeight: 600,
    marginBottom: 6,
    display: "block",
    fontSize: 14,
  };

  const row = { marginBottom: 10, fontSize: 14,display:"flex",justifyContent:"space-between" };

  return (
    <div style={{ padding: 16, fontFamily: "Inter, Arial", }}>
      <h2 style={{ marginBottom: 12 }}>NRS-2002 Screening Tool</h2>

      {/* ------------------- TABLE 1 ------------------- */}
      <div style={sec}>
        <h3 style={{ marginTop: 0 }}>Table 1 — Initial Screening</h3>

        {[
          ["bmiBelow20_5", "Is BMI < 20.5?"],
          ["weightLoss3Months", "Has the patient lost weight in last 3 months?"],
          ["reducedIntake", "Reduced dietary intake in last week?"],
          ["severeIllness", "Is patient severely ill (e.g., ICU)?"],
        ].map(([key, text]) => (
          <div key={key} style={row}>
            <span>{text}</span>
            <div style={{ marginTop: 4, justifyContent:"space-around",display:"flex" }}>
              <label>
                <input
                  type="radio"
                  checked={form[key] === "yes"}
                  onChange={() => setField(key, "yes")}
                />{" "}
                Yes
              </label>
              <label style={{ marginLeft: 16 }}>
                <input
                  type="radio"
                  checked={form[key] === "no"}
                  onChange={() => setField(key, "no")}
                />{" "}
                No
              </label>
            </div>
          </div>
        ))}

        {!anyTable1Yes && (
          <p style={{ marginTop: 10, color: "#666", fontSize: 13 }}>
            All answers are “No” → Re-screen weekly.
          </p>
        )}
      </div>

      {/* ------------------- TABLE 2 ------------------- */}
      {anyTable1Yes && (
        <div style={sec}>
          <h3 style={{ marginTop: 0 }}>Table 2 — Final Screening</h3>

          <label style={label}>Impaired Nutritional Status</label>
          <select
            style={{ width: "100%", padding: 8, borderRadius: 6 }}
            value={form.nutStatus}
            onChange={(e) => setField("nutStatus", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="0">0 — Normal</option>
            <option value="1">1 — Mild impairment</option>
            <option value="2">2 — Moderate impairment</option>
            <option value="3">3 — Severe impairment</option>
          </select>

          <label style={{ ...label, marginTop: 14 }}>
            Severity of Disease (↑ nutritional requirements)
          </label>
          <select
            style={{ width: "100%", padding: 8, borderRadius: 6 }}
            value={form.diseaseSeverity}
            onChange={(e) => setField("diseaseSeverity", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="0">0 — Normal</option>
            <option value="1">1 — Mild</option>
            <option value="2">2 — Moderate</option>
            <option value="3">3 — Severe</option>
          </select>

          <label style={{ ...label, marginTop: 14 }}>Patient Age</label>
          <input
            type="number"
            value={form.age}
            onChange={(e) => setField("age", e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
          />

          <div
            style={{
              marginTop: 16,
              padding: 12,
              background: "#f7f9ff",
              borderRadius: 6,
              border: "1px solid #d8e2ff",
            }}
          >
            <div>
              <strong>Total Score: </strong> {finalScore}
            </div>
            <div style={{ marginTop: 4 }}>
              <strong>Status:</strong> {riskStatus}
            </div>
          </div>
        </div>
      )}

      {/* ------------------- SUBMIT ------------------- */}
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          background: "#0c3161",
          color: "white",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
          marginTop: 12,
          fontSize: 15,
        }}
      >
        Save NRS-2002 Assessment
      </button>
    </div>
  );
}
