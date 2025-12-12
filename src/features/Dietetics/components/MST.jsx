// PatientMST.jsx
// MST form with patient auto-details (read-only), calendar re-screen, professional layout,
// Back + Submit Assessment button that calls onSubmit(payload) or onSave(payload).
// Parser-safe (no optional chaining / nullish coalescing).

import React, { useEffect, useMemo, useState } from "react";

export default function MST(props , onSave, assessmentName = "MST", initialFormData = null) {
  var patientProp = props && props.patient ? props.patient : {};
  var onSave = props && typeof props.onSave === "function" ? props.onSave : null;
  var onSubmit = props && typeof props.onSubmit === "function" ? props.onSubmit : null;
  var onBack = props && typeof props.onBack === "function" ? props.onBack : null;
  var department = props && props.department ? props.department : null;

  // Patient info prefill
  var [patientName, setPatientName] = useState(patientProp && patientProp.name ? patientProp.name : "");
  var [patientId, setPatientId] = useState(patientProp && patientProp.id ? patientProp.id : "");
  var [patientAge, setPatientAge] = useState(patientProp && patientProp.age ? patientProp.age : "");
  var [patientSex, setPatientSex] = useState(patientProp && patientProp.sex ? patientProp.sex : "");
  var [patientRace, setPatientRace] = useState(patientProp && patientProp.race ? patientProp.race : "");
  var [patientAccommodation, setPatientAccommodation] = useState(patientProp && patientProp.accommodation ? patientProp.accommodation : "");
  var [patientNkfa, setPatientNkfa] = useState(patientProp && patientProp.nkfa ? patientProp.nkfa : "");
  var [patientResidence, setPatientResidence] = useState(patientProp && patientProp.residence ? patientProp.residence : "");
  var [patientOccupation, setPatientOccupation] = useState(patientProp && patientProp.occupation ? patientProp.occupation : "");
  var [patientMaritalStatus, setPatientMaritalStatus] = useState(patientProp && patientProp.marital_status ? patientProp.marital_status : "");
  var [patientIcd, setPatientIcd] = useState(patientProp && patientProp.icd ? patientProp.icd : "");
  var [patientUl, setPatientUl] = useState(patientProp && patientProp.ul ? patientProp.ul : "");
  var [patientWeight, setPatientWeight] = useState(patientProp && patientProp.weight ? patientProp.weight : "");
  var [patientHeight, setPatientHeight] = useState(patientProp && patientProp.height ? patientProp.height : "");

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
  if (patientWeight && patientHeight) {
    try {
      var h = parseFloat(patientHeight);
      var w = parseFloat(patientWeight);
      if (!isNaN(h) && h > 0 && !isNaN(w)) {
        bmi = (w / ((h / 100) * (h / 100))).toFixed(1);
      }
    } catch (err) { bmi = "-"; }
  }

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
        age: patientAge,
        sex: patientSex,
        race: patientRace,
        accommodation: patientAccommodation,
        nkfa: patientNkfa,
        residence: patientResidence,
        occupation: patientOccupation,
        marital_status: patientMaritalStatus,
        icd: patientIcd,
        ul: patientUl,
        weight: patientWeight,
        height: patientHeight,
        bmi: bmi
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

  function handleExportJSON() {
    var payload = buildPayload();
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
    var a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", "MST_" + (patientId || "patient") + "_" + (new Date().toISOString().slice(0, 10)) + ".json");
    document.body.appendChild(a);
    a.click();
    a.remove();
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
          <div style={styles.title}>Malnutrition Screening Tool (MST)</div>
          <div style={styles.subtitle}>Professional analysis sheet — bedside screening</div>
        </div>

        <div className="no-print" style={{ textAlign: "right" }}>
          <div style={{ marginBottom: 8 }}>
            <button onClick={handlePrint} style={{ ...styles.btnNeutral, marginRight: 8 }}>Print</button>
            <button onClick={handleExportJSON} style={{ ...styles.btnNeutral, marginRight: 8 }}>Export JSON</button>
            <button onClick={handleSave} style={styles.btnPrimary}>Save</button>
          </div>
          <div style={styles.small}>Date: {new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* AUTO-GENERATED PATIENT DETAILS (read-only like InitialAssessmentForm) */}


      {/* MST Screening */}
      <section style={styles.card}>
        <div style={styles.label}>Step 1 — MST screening</div>

        {/* Weight loss question */}
        <div style={{ marginTop: 8, marginBottom: 12 }}>
          <div style={{ fontWeight: 700 }}>1. Have you recently lost weight without trying?</div>
          <div style={styles.small}>Select 'Yes' to reveal amount options.</div>

          <div style={{ marginTop: 10, width: 320 }}>
            <select style={styles.dropdown} value={weightLostYN} onChange={function (e) { setWeightLostYN(e.target.value); if (e.target.value !== "yes") { setWeightBand(""); setCustomPounds(""); } }}>
              <option value="">Select</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {weightLostYN === "yes" && (
            <div style={{ marginTop: 12 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 700 }}>If yes — select weight lost (lbs):</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <select style={{ ...styles.dropdown, width: 240 }} value={weightBand} onChange={function (e) { setWeightBand(e.target.value); }}>
                  <option value="">Select amount</option>
                  <option value="2-13">2–13 lbs — 1 point</option>
                  <option value="14-23">14–23 lbs — 2 points</option>
                  <option value="24-33">24–33 lbs — 3 points</option>
                  <option value=">=34">≥ 34 lbs — 4 points</option>
                  <option value="unsure">Unsure — 2 points</option>
                </select>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <label style={{ fontSize: 13 }}>Or exact lbs (optional)</label>
                  <input type="number" min="0" style={{ width: 110, padding: "8px 10px", borderRadius: 8, border: "1px solid #d1d5db" }} value={customPounds} onChange={function (e) { setCustomPounds(e.target.value); }} />
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
          <div style={{ fontWeight: 700 }}>2. Have you been eating poorly because of decreased appetite?</div>
          <div style={styles.small}>Choose the appropriate answer.</div>

          <div style={{ marginTop: 10, width: 220 }}>
            <select style={styles.dropdown} value={appetiteStatus} onChange={function (e) { setAppetiteStatus(e.target.value); }}>
              <option value="">Select</option>
              <option value="no">No — 0 points</option>
              <option value="yes">Yes — 1 point</option>
            </select>
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
      </section>

      {/* Clinical actions */}
      {/* <section style={styles.card}>
        <div style={styles.label}>Step 3 — Clinical actions</div>

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
      </section> */}

      {/* Clinician & notes */}
      {/* <section style={styles.card}>
        <div style={styles.label}>Follow-up & clinician notes</div>
        <div style={styles.grid2}>
          <div>
            <label style={{ display: "block", marginBottom: 6 }}>Clinician</label>
            <input style={styles.input} value={clinician} onChange={function (e) { setClinician(e.target.value); }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 6 }}>Next re-screen (if LOS &gt; 7 days)</label>
            <input
              type="date"
              style={styles.input}
              value={nextRescreen}
              onChange={function (e) { setNextRescreen(e.target.value); }}
            />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Clinical notes</label>
          <textarea style={{ width: "100%", minHeight: 90, padding: 10, borderRadius: 8, border: "1px solid #e6e9ee" }} value={notes} onChange={function (e) { setNotes(e.target.value); }} />
        </div>
      </section> */}

      {/* Footer actions including Back + Submit Assessment */}
      <div className="no-print" style={{ display: "flex", gap: 8, justifyContent: "space-between", marginTop: 12, alignItems: "center" }}>
        <div>
          <button onClick={function() { if (onBack) { try { onBack(); } catch (err) {} } }} style={{ padding: "10px 18px", borderRadius: 6, background: "#ddd", color: "#000", cursor: "pointer", border: "1px solid #999" }}>
            ← Back
          </button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handleClear} style={styles.btnNeutral}>Clear</button>
         
          <button onClick={handleSubmit} style={styles.btnPrimary}>Submit Assessment →</button>
        </div>
      </div>
    </div>
  );
}
