// PatientMST.jsx
// MST form with patient auto-details (read-only), calendar re-screen, professional layout,
// Back + Submit Assessment button that calls onSubmit(payload) or onSave(payload).
// Parser-safe (no optional chaining / nullish coalescing).

import React, { useEffect, useMemo, useState } from "react";
import SelectField from "../../../shared/form/fields/SelectField";
import TextField from "../../../shared/form/fields/TextField";
import FormCard from "../../../shared/form/fields/FormCard";

export default function MST(props , onSave, assessmentName = "MST", initialFormData = null) {
  var patientProp = props && props.patient ? props.patient : {};
  var onSave = props && typeof props.onSave === "function" ? props.onSave : null;
  var onSubmit = props && typeof props.onSubmit === "function" ? props.onSubmit : null;
  var onBack = props && typeof props.onBack === "function" ? props.onBack : null;
  var department = props && props.department ? props.department : null;

  // Patient info prefill
  var [patientName, setPatientName] = useState(patientProp && patientProp.name ? patientProp.name : "");
  var [patientId, setPatientId] = useState(patientProp && patientProp.id ? patientProp.id : "");


  // Weight loss controls
  var [weightLostYN, setWeightLostYN] = useState("");
  var [weightBand, setWeightBand] = useState("");
  var [customPounds, setCustomPounds] = useState("");

  // Appetite
  var [appetiteStatus, setAppetiteStatus] = useState("");

  // clinician + notes + actions
  var [clinician, setClinician] = useState("");
  var [notes, setNotes] = useState("");
  var [actionInitiateNutrition, setActionInitiateNutrition] = useState(false);
  var [actionOrderConsult, setActionOrderConsult] = useState(false);
  var [actionMonitorIntake, setActionMonitorIntake] = useState(false);
  var [actionSupplements, setActionSupplements] = useState(false);
  var [actionDocumentPlan, setActionDocumentPlan] = useState(false);

  // NEXT re-screen date (YYYY-MM-DD)
  var [nextRescreen, setNextRescreen] = useState("");

  // BMI derived (read-only)
  var bmi = "-";


  function computeWeightScore(band, poundsStr, yn) {
    if (!yn || yn !== "yes") return 0;
    if (!band || band === "") {
      var p = parseFloat(poundsStr);
      if (isNaN(p)) return 0;
      if (p >= 34) return 4;
      if (p >= 24) return 3;
      if (p >= 14) return 2;
      if (p >= 2) return 1;
      return 0;
    }
    if (band === "unsure") return 2;
    if (band === "2-13") return 1;
    if (band === "14-23") return 2;
    if (band === "24-33") return 3;
    if (band === ">=34") return 4;
    return 0;
  }

  function computeAppetiteScore(appStatus) {
    if (!appStatus || appStatus !== "yes") return 0;
    return 1;
  }

  var weightScore = computeWeightScore(weightBand, customPounds, weightLostYN);
  var appetiteScore = computeAppetiteScore(appetiteStatus);
  var totalScore = weightScore + appetiteScore;
  var riskCategory = totalScore >= 2 ? "AT RISK" : "NOT AT RISK";

  // Build payload for submit/save/export
  function buildPayload() {
    return {
      patient: {
        id: patientId,
        name: patientName,
      },
      screeningDate: new Date().toISOString(),
      weightLostYN: weightLostYN,
      weightBand: weightBand,
      customPounds: customPounds,
      weightScore: weightScore,
      appetiteStatus: appetiteStatus,
      appetiteScore: appetiteScore,
      totalScore: totalScore,
      riskCategory: riskCategory,
      actions: {
        initiateNutrition: actionInitiateNutrition,
        orderConsult: actionOrderConsult,
        monitorIntake: actionMonitorIntake,
        supplements: actionSupplements,
        documentPlan: actionDocumentPlan
      },
      clinician: clinician,
      notes: notes,
      nextRescreen: nextRescreen
    };
  }
const [data, setData] = useState(() => initialFormData || {});
const handleSave = () => {
    if (onSave) onSave(assessmentName, data);
  };

  function handleSubmit() {
    var payload = buildPayload();
    if (onSubmit) {
      try {
        onSubmit(payload);
        return;
      } catch (err) { /* fall back */ }
    }
    // fallback to onSave if onSubmit not provided
    handleSave();
  }



  function handlePrint() {
    window.print();
  }

  function handleClear() {
    if (!window.confirm("Clear the form?")) return;
    setWeightLostYN("");
    setWeightBand("");
    setCustomPounds("");
    setAppetiteStatus("");
    setClinician("");
    setNotes("");
    setActionInitiateNutrition(false);
    setActionOrderConsult(false);
    setActionMonitorIntake(false);
    setActionSupplements(false);
    setActionDocumentPlan(false);
    setNextRescreen("");
  }

  // Focus first input
  useEffect(function () {
    var el = document.getElementById("mst-patient-name");
    if (el) el.focus();
  }, []);

  // Styles
  var styles = {
    container: { fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", color: "#0f172a", maxWidth: 980, margin: "0 auto", padding: 18 },
    headerRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
    titleBlock: {},
    title: { fontSize: 20, fontWeight: 700 },
    subtitle: { color: "#6b7280", marginTop: 4, fontSize: 13 },
    card: { background: "#fff", border: "1px solid #e6e9ee", borderRadius: 10, padding: 16, marginBottom: 12, boxShadow: "0 4px 14px rgba(15,23,42,0.03)" },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
    label: { fontSize: 13, fontWeight: 700, marginBottom: 6 },
    input: { width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, background: "#fff" },
    readOnly: { width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #e6e9ee", background: "#f3f4f6", fontSize: 14, cursor: "not-allowed" },
    small: { fontSize: 12, color: "#6b7280" },
    scoreBox: { display: "flex", gap: 12, alignItems: "center", padding: 12, borderRadius: 8, background: "#fafafa", border: "1px solid #eef2f6" },
    actionsRow: { display: "flex", gap: 8 },
    btnPrimary: { background: "#0f172a", color: "#fff", border: "none", padding: "10px 14px", borderRadius: 8, cursor: "pointer" },
    btnNeutral: { background: "#f3f4f6", color: "#0f172a", border: "none", padding: "8px 12px", borderRadius: 8, cursor: "pointer" },
    dropdown: { width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff" }
  };

  // Print CSS
  var printCSS = "\n@media print { body * { visibility: hidden; } #mst-root, #mst-root * { visibility: visible; } #mst-root { position: absolute; left: 0; top: 0; width: 100%; } .no-print { display: none !important; } }\n";

  return (
    <div id="mst-root" style={styles.container}>
      <style>{printCSS}</style>

      <div style={styles.headerRow}>
        <div style={styles.titleBlock}>

        </div>


      </div>

      {/* AUTO-GENERATED PATIENT DETAILS (read-only like InitialAssessmentForm) */}


      {/* MST Screening */}
<FormCard
  title="Malnutrition Screening Tool (MST)"
  onBack={onBack}
  onSave={handleSave}
  onClear={handleClear}
  onSubmit={handleSubmit}
  onPrint={handlePrint}
>


        {/* Weight loss question */}
        <div style={{ marginTop: 8, marginBottom: 12 }}>

          <div style={{ marginTop: 10 }}>
<SelectField
  label="Have you recently lost weight without trying?"
  value={weightLostYN}
  options={[
    { label: "Select", value: "" },
    { label: "No", value: "no" },
    { label: "Yes", value: "yes" }
  ]}
  onChange={(val) => {
    setWeightLostYN(val);
    if (val !== "yes") {
      setWeightBand("");
      setCustomPounds("");
    }
  }}
/>
          </div>

          {weightLostYN === "yes" && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
<SelectField
  label="If yes — select weight lost (lbs)"
  value={weightBand}
  options={[
    { label: "Select amount", value: "" },
    { label: "2–13 lbs / 1-5 kg — 1 point", value: "2-13" },
    { label: "14–23 lbs / 6-10 kg— 2 points", value: "14-23" },
    { label: "24–33 lbs / 11- 15 kg — 3 points", value: "24-33" },
    { label: "≥ 34 lbs / > 15 kg — 4 points", value: ">=34" },
    { label: "Unsure — 2 points", value: "unsure" }
  ]}
  onChange={setWeightBand}
/>


                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <label style={{ fontSize: 13 }}>Or exact lbs (optional)</label>
                 <TextField
  type="number"
  label="Exact weight lost (lbs)"
  value={customPounds}
  onChange={setCustomPounds}
/>

                </div>

                <div style={{ marginLeft: "auto", fontSize: 13, color: "#6b7280" }}>
                  Weight score: <strong>{weightScore}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #eef2f6", margin: "12px 0" }} />

        {/* Appetite */}
        <div style={{ marginTop: 8, marginBottom: 12 }}>

          <div style={{ marginTop: 10 }}>
<SelectField
  label="Have you been eating poorly because of decreased appetite?"
  value={appetiteStatus}
  options={[
    { label: "Select", value: "" },
    { label: "No — 0 points", value: "no" },
    { label: "Yes — 1 point", value: "yes" }
  ]}
  onChange={setAppetiteStatus}
/>

          </div>

          <div style={{ marginTop: 10, fontSize: 13, color: "#6b7280" }}>
            Appetite score: <strong>{appetiteScore}</strong>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #eef2f6", margin: "12px 0" }} />

        {/* Total */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <div style={styles.scoreBox}>
            <div style={{ color: "#6b7280", fontSize: 13 }}>Total MST Score</div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{totalScore}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: totalScore >= 2 ? "#b91c1c" : "#065f46" }}>{riskCategory}</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Recommended action</div>
            <div style={{ marginTop: 8, fontWeight: 700, color: totalScore >= 2 ? "#b91c1c" : "#065f46" }}>
              {totalScore >= 2 ? "AT RISK — action required" : "NOT AT RISK"}
            </div>
          </div>
        </div>
        <div>
          <div>
  <label style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>
   Clinical Notes
  </label>
  <textarea
  
    placeholder="Enter additional clinical notes here…"
    style={{
      width: "100%",
      minHeight: 80,
      padding: "10px 12px",
      borderRadius: 6,
      border: "1px solid #d1d5db",
      fontSize: 14,
      resize: "vertical",
    }}
  />
</div>

        </div>
</FormCard>


    </div>
  );
}
