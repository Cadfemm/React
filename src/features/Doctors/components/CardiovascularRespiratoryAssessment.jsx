import React, { useState } from "react";

export default function CardiovascularRespiratoryAssessment() {
  /* -------------------------------------------------------
     INTERNAL CSS (Modern Card-Based, No Tables)
  ------------------------------------------------------- */
  const styles = {
    container: {
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      background: "#fff",
      borderRadius: 10,
      border: "1px solid #ddd",
      padding: 16,
      marginBottom: 22,
      boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
    },
    title: {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: 700,
      marginTop: 12,
      marginBottom: 8,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      gap: 12,
      marginBottom: 10,
      flexWrap: "wrap",
    },
    col: {
      flex: 1,
      minWidth: "48%",
    },
    label: {
      fontWeight: 600,
      fontSize: 13,
      marginBottom: 4,
      display: "block",
    },
    select: {
      width: "100%",
      padding: 8,
      borderRadius: 6,
      border: "1px solid #bbb",
      fontSize: 14,
    },
    input: {
      width: "100%",
      padding: 8,
      borderRadius: 6,
      border: "1px solid #bbb",
      fontSize: 14,
    },
    textarea: {
      width: "100%",
      padding: 8,
      borderRadius: 6,
      border: "1px solid #bbb",
      resize: "vertical",
      minHeight: 70,
      fontSize: 14,
    },
    note: {
      padding: 10,
      background: "#fff4d8",
      borderLeft: "4px solid #f0a100",
      marginBottom: 16,
      fontSize: 13,
      borderRadius: 6,
    },
    sectionHeader: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: 700,
    },
  };

  const yesNo = ["", "Yes", "No"];

  /* -------------------------------------------------------
     FORM STATE
  ------------------------------------------------------- */
  const [symptom, setSymptom] = useState({
    dyspRest: "",
    dyspExertion: "",
    orthopnoea: "",
    pnd: "",
    cough: "",
    sputum: "",
    sputumColour: "",
    sputumAmount: "",
    wheeze: "",
    chestPain: "",
    fatigue: "",
    weightLoss: "",
  });

  const [respPast, setRespPast] = useState({
    copd: "",
    asthma: "",
    pneumonia: "",
    smoking: "",
    hazards: "",
    infection: "",
    aspiration: "",
    tracheostomy: "",
    ventilation: "",
  });

  const [nyha, setNyha] = useState("");
  const [stopBang, setStopBang] = useState("");

  const [respExam, setRespExam] = useState({
    cyanosis: "",
    clubbing: "",
    oedema: "",
    accessory: "",
    symmetry: "",
    ausc: "",
    auscNotes: "",
    coughStrength: "Good",
  });

  const [cardioSymptoms, setCardioSymptoms] = useState({
    chestPain: "",
    palpitations: "",
    syncope: "",
    dyspneaExertion: "",
    orthopnea: "",
    ankle: "",
    fatigue: "",
    exercise: "",
  });

  const [vitals, setVitals] = useState({
    hr: "",
    ecg: "",
    bpSit: "",
    bpStand: "",
    rr: "",
    crt: "",
    skin: "",
    radial: "",
    dorsalis: "",
    tibial: "",
    jvp: "",
    oedema: "",
    oedemaType: "",
  });

  const [summary, setSummary] = useState({
    breathing: "",
    cough: "",
    env: "",
    vitals: "",
    mechanics: "",
    ausc: "",
    pft: "",
    exercise: "",
    adl: "",
    prelim: "",
  });

  /* Helper */
  const update = (setter, field, value) =>
    setter((prev) => ({ ...prev, [field]: value }));

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */
  return (
    <div style={styles.container}>


      {/* -----------------------------------------
          SECTION 1 — SYMPTOMS
      ------------------------------------------ */}
      <div style={styles.card}>
        <h2 style={styles.title}>Cardiovascular & Respiratory System</h2>

        {/* Dyspnoea */}
        {[
          ["Dyspnoea at rest", "dyspRest"],
          ["Dyspnoea on exertion", "dyspExertion"],
          ["Orthopnoea", "orthopnoea"],
          ["Paroxysmal nocturnal dyspnoea", "pnd"],
          ["Cough", "cough"],
          ["Wheeze", "wheeze"],
          ["Chest pain", "chestPain"],
          ["Fatigue", "fatigue"],
          ["Weight loss", "weightLoss"],
        ].map(([label, field]) => (
          <div key={field} style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>{label}</label>
              <select
                style={styles.select}
                value={symptom[field]}
                onChange={(e) => update(setSymptom, field, e.target.value)}
              >
                {yesNo.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {/* Sputum special logic */}
        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Sputum</label>
            <select
              style={styles.select}
              value={symptom.sputum}
              onChange={(e) => update(setSymptom, "sputum", e.target.value)}
            >
              {yesNo.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        {symptom.sputum === "Yes" && (
          <>
            <div style={styles.row}>
              <div style={styles.col}>
                <label style={styles.label}>Sputum Colour</label>
                <input
                  style={styles.input}
                  value={symptom.sputumColour}
                  onChange={(e) =>
                    update(setSymptom, "sputumColour", e.target.value)
                  }
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.col}>
                <label style={styles.label}>Sputum Amount</label>
                <input
                  style={styles.input}
                  value={symptom.sputumAmount}
                  onChange={(e) =>
                    update(setSymptom, "sputumAmount", e.target.value)
                  }
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* -----------------------------------------
          SECTION 2 — RESPIRATORY PAST HISTORY
      ------------------------------------------ */}
      <div style={styles.card}>
        <div style={styles.title}>Respiratory Past History</div>

        {[
          ["COPD", "copd"],
          ["Asthma", "asthma"],
          ["Pneumonia", "pneumonia"],
          ["Smoking", "smoking"],
          ["Environmental / occupational hazards", "hazards"],
          ["Recent infections", "infection"],
          ["Aspiration risk", "aspiration"],
          ["Tracheostomy", "tracheostomy"],
          ["Ventilation", "ventilation"],
        ].map(([label, key]) => (
          <div key={key} style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>{label}</label>
              <select
                style={styles.select}
                value={respPast[key]}
                onChange={(e) => update(setRespPast, key, e.target.value)}
              >
                {yesNo.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* -----------------------------------------
          SECTION 3 — NYHA & STOP-BANG
      ------------------------------------------ */}
      <div style={styles.card}>
        <div style={styles.title}>Classification Scales</div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>NYHA Class</label>
            <select
              style={styles.select}
              value={nyha}
              onChange={(e) => setNyha(e.target.value)}
            >
              <option value="">Select</option>
              <option>I</option>
              <option>II</option>
              <option>III</option>
              <option>IV</option>
            </select>
          </div>

          <div style={styles.col}>
            <label style={styles.label}>STOP-BANG Score (1–8)</label>
            <input
              style={styles.input}
              value={stopBang}
              onChange={(e) => setStopBang(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* -----------------------------------------
          SECTION 4 — RESPIRATORY EXAM
      ------------------------------------------ */}
      <div style={styles.card}>
        <div style={styles.title}>Respiratory Examination</div>

        {[
          ["Cyanosis", "cyanosis"],
          ["Clubbing", "clubbing"],
          ["Oedema", "oedema"],
          ["Use of accessory muscles", "accessory"],
          ["Symmetry of chest expansion", "symmetry"],
        ].map(([label, key]) => (
          <div key={key} style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>{label}</label>
              <select
                style={styles.select}
                value={respExam[key]}
                onChange={(e) => update(setRespExam, key, e.target.value)}
              >
                {yesNo.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Auscultation</label>
            <input
              style={styles.input}
              placeholder="Clear / Wheeze / Rhonchi..."
              value={respExam.ausc}
              onChange={(e) => update(setRespExam, "ausc", e.target.value)}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>Auscultation Notes</label>
            <textarea
              style={styles.textarea}
              value={respExam.auscNotes}
              onChange={(e) => update(setRespExam, "auscNotes", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* -----------------------------------------
          SECTION 5 — CARDIOVASCULAR SYMPTOMS
      ------------------------------------------ */}
      <div style={styles.card}>
        <div style={styles.title}>Cardiovascular Symptoms</div>

        {[
          ["Chest pain", "chestPain"],
          ["Palpitations", "palpitations"],
          ["Syncope / pre-syncope", "syncope"],
          ["Dyspnoea on exertion", "dyspneaExertion"],
          ["Orthopnea", "orthopnea"],
          ["Ankle swelling", "ankle"],
          ["Fatigue", "fatigue"],
          ["Exercise intolerance", "exercise"],
        ].map(([label, key]) => (
          <div key={key} style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>{label}</label>
              <select
                style={styles.select}
                value={cardioSymptoms[key]}
                onChange={(e) =>
                  update(setCardioSymptoms, key, e.target.value)
                }
              >
                {yesNo.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* -----------------------------------------
          SECTION 6 — VITAL SIGNS
      ------------------------------------------ */}
      <div style={styles.card}>
        <div style={styles.title}>Vital Signs</div>

        {[
          ["Heart rate (bpm)", "hr"],
          ["ECG", "ecg"],
          ["BP Sitting (mmHg)", "bpSit"],
          ["BP Standing (mmHg)", "bpStand"],
          ["Respiratory rate", "rr"],
          ["CRT < 2 sec (Y/N)", "crt"],
          ["Skin colour", "skin"],
        ].map(([label, key]) => (
          <div key={key} style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>{label}</label>

              {key === "crt" ? (
                <select
                  style={styles.select}
                  value={vitals[key]}
                  onChange={(e) => update(setVitals, key, e.target.value)}
                >
                  {yesNo.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              ) : (
                <input
                  style={styles.input}
                  value={vitals[key]}
                  onChange={(e) => update(setVitals, key, e.target.value)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* -----------------------------------------
          SECTION 7 — RESPIRATORY SUMMARY
      ------------------------------------------ */}
{/* -----------------------------------------
   SECTION — RESPIRATORY HISTORY & EXAM
------------------------------------------ */}
<div style={styles.card}>
  <div style={styles.title}>Respiratory – Structured Summary</div>

  {/* ---------- HISTORY ---------- */}
  <div style={styles.subtitle}>History</div>

  {[
    {
      label: "Breathing symptoms",
      key: "breathing",
      options: [
        "Shortness of breath",
        "Dyspnoea on exertion",
        "Orthopnoea",
        "Nocturnal dyspnoea",
      ],
    },
    {
      label: "Cough and sputum",
      key: "cough",
      options: [
        "Productive",
        "Non-productive",
        "Frequent cough",
        "Coloured sputum",
        "Thick / viscous sputum",
      ],
    },
    {
      label: "Environmental factors",
      key: "env",
      options: [
        "Exposure to pollutants",
        "Poor home ventilation",
        "Occupational hazards",
        "Limited home support",
        "Poor access to rehab",
      ],
    },
  ].map((item) => (
    <div key={item.key} style={styles.row}>
      <div style={styles.col}>
        <label style={styles.label}>{item.label}</label>

        {/* DROPDOWN FOR DETAILS */}
        <select
          style={styles.select}
          value={summary[item.key]}
          onChange={(e) => update(setSummary, item.key, e.target.value)}
        >
          <option value="">Select</option>
          {item.options.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>
    </div>
  ))}

  {/* ---------- EXAMINATION ---------- */}
  <div style={styles.subtitle}>Examination</div>

  {[
    {
      label: "Vital signs",
      key: "vitals",
      options: ["RR", "HR", "SpO₂", "BP"],
    },
    {
      label: "Respiratory mechanics",
      key: "mechanics",
      options: [
        "Chest expansion normal",
        "Asymmetry present",
        "Use of accessory muscles",
      ],
    },
    {
      label: "Lung auscultation",
      key: "ausc",
      options: [
        "Wheezes",
        "Crackles",
        "Reduced breath sounds",
        "Normal breath sounds",
      ],
    },
    {
      label: "Pulmonary function tests",
      key: "pft",
      options: [
        "Spirometry (FVC)",
        "Spirometry (FEV1)",
        "Peak flow measurement",
      ],
    },
    {
      label: "Exercise tolerance / endurance",
      key: "exercise",
      options: [
        "6-minute walk test",
        "Timed up-and-go test",
        "Oxygen desaturation on exertion",
      ],
    },
    {
      label: "Functional ADL assessment",
      key: "adl",
      options: [
        "Independent ADLs",
        "Reduced self-care ability",
        "Difficulty in housework",
      ],
    },
    {
      label: "Preliminary Tests",
      key: "prelim",
      options: ["Chest X-ray", "ABG", "SpO₂ trend"],
    },
  ].map((item) => (
    <div key={item.key} style={styles.row}>
      <div style={styles.col}>
        <label style={styles.label}>{item.label}</label>

        {/* DROPDOWN FOR DETAILS */}
        <select
          style={styles.select}
          value={summary[item.key]}
          onChange={(e) => update(setSummary, item.key, e.target.value)}
        >
          <option value="">Select</option>
          {item.options.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}
