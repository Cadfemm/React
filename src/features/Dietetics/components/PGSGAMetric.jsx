import React, { useState, useMemo } from "react";

/* ===================== REUSABLE COMPONENTS ===================== */

function SectionHeader({ boxNumber, title, color = "#0F172A" }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 16,
      borderBottom: `2px solid ${color}`,
      paddingBottom: 8,
    }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 14,
      }}>
        {boxNumber}
      </div>
      <span style={{ fontWeight: 700, fontSize: 16, color }}>{title}</span>
    </div>
  );
}

function CheckItem({ label, points, checked, onChange, indent = false }) {
  return (
    <label style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 14,
      marginBottom: 8,
      marginLeft: indent ? 24 : 0,
      cursor: "pointer",
      padding: "6px 8px",
      borderRadius: 4,
      background: checked ? "#e8f4fd" : "transparent",
      border: checked ? "1px solid #3b82f6" : "1px solid transparent",
      transition: "all 0.2s ease",
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: 18, height: 18, accentColor: "#0F172A" }}
      />
      <span style={{ flex: 1, color: "#374151" }}>{label}</span>
      {points && (
        <span style={{
          padding: "2px 8px",
          borderRadius: 4,
          background: checked ? "#0F172A" : "#e5e7eb",
          color: checked ? "#fff" : "#6b7280",
          fontSize: 12,
          fontWeight: 600,
        }}>
          {points}
        </span>
      )}
    </label>
  );
}

function RadioGroup({ name, options, value, onChange }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", // ✅ 3 per row
        gap: 20,
      }}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
            cursor: "pointer",
            padding: "8px 10px",
            borderRadius: 6,
            background: value === opt.value ? "#e8f4fd" : "#fff",

          }}
        >
          <input
            type="radio"
            name={name}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            style={{ width: 18, height: 18, accentColor: "#0F172A" }}
          />

          <span style={{ flex: 1, lineHeight: 1.4 }}>
            {opt.label}
          </span>

          {opt.points !== undefined && (
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 4,
                background: value === opt.value ? "#0F172A" : "#e5e7eb",
                color: value === opt.value ? "#fff" : "#6b7280",
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {opt.points}
            </span>
          )}
        </label>
      ))}
    </div>
  );
}


function ScoreBox({ label, value, maxValue, color = "#0F172A" }) {
  return (
    <div style={{
      marginTop: 12,
      padding: "10px 14px",
      background: `linear-gradient(135deg, ${color}15, ${color}08)`,
      border: `1px solid ${color}40`,
      borderRadius: 6,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <span style={{ fontSize: 13, color: "#4b5563", fontWeight: 500 }}>
        {label}
      </span>
      <div style={{
        background: color,
        color: "#fff",
        padding: "4px 12px",
        borderRadius: 4,
        fontWeight: 700,
        fontSize: 15,
      }}>
        {value}{maxValue ? ` / ${maxValue}` : ""}
      </div>
    </div>
  );
}

function SliderInput({ label, value, onChange, max = 3 }) {
  const labels = ["None (0)", "Mild (1)", "Moderate (2)", "Severe (3)"];
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
        fontSize: 14,
      }}>
        <span style={{ fontWeight: 500 }}>{label}</span>
        <span style={{
          background: value > 0 ? "#0F172A" : "#22c55e",
          color: "#fff",
          padding: "2px 10px",
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 600,
        }}>
          {labels[value]}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        style={{
          width: "100%",
          height: 8,
          borderRadius: 4,
          accentColor: "#0F172A",
        }}
      />
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 11,
        color: "#9ca3af",
        marginTop: 4,
      }}>
        {labels.map((l, i) => (
          <span key={i}>{i}</span>
        ))}
      </div>
    </div>
  );
}

/* ===================== MAIN COMPONENT ===================== */
export default function PGSGAProfessional({ onSave, patientInfo = {} }) {
  const [form, setForm] = useState({
    // Patient Info
    patientName: patientInfo.name || "",
    mrn: patientInfo.mrn || "",
    dob: patientInfo.dob || "",
    assessmentDate: new Date().toISOString().split("T")[0],

    // BOX 1 - Weight
    weightCurrent: "",
    weightMonthAgo: "",
    weightSixMonthsAgo: "",
    weightChange2Weeks: "unchanged", // decreased, unchanged, increased
 w1_weightLoss2Weeks: "no",
 // WORKSHEET 5 – Global PG-SGA Category
pgsgaStage: "", // "A" | "B" | "C"
// WORKSHEET 5 – Global PG-SGA Categories
w5: {
  weight: "",
  intake: "",
  nis: "",
  functioning: "",
  physical: "",
},

 // WORKSHEET 3 – Metabolic Demand
feverLevel: "none",        // none | low | moderate | high
feverDuration: "none",     // none | over72
corticosteroids: "none",   // none | low | moderate | high
// Muscle sites
muscleSites: {
  temples: 0,
  clavicles: 0,
  shoulders: 0,
  interosseous: 0,
  scapula:0,
  thighs: 0,
  calves: 0,
},
muscleGlobal: 0,

// Fat sites
fatSites: {
  orbital: 0,
  triceps: 0,
  ribs: 0,
},
fatGlobal: 0,

// Fluid sites
fluidSites: {
  ankle: 0,
  sacral: 0,
  ascites: 0,
},
fluidGlobal: 0,

 // WORKSHEET 1 – Weight Loss
w1_period: "1m",              // "1m" | "6m"
w1_weightLossBand: "",        // "0" | "1" | "2" | "3" | "4"
w1_weightLoss2Weeks: "no",    // "yes" | "no"

    // BOX 2 - Food Intake
    intakeStatus: "unchanged", // unchanged, more, less
    intakeType: "normal", // normal, little_solid, liquid_only, supplements, very_little, nothing

    // BOX 3 - Symptoms (past 2 weeks)
    symptoms: {
      noProblems: false,
      noAppetite: false,
      nausea: false,
      vomiting: false,
      constipation: false,
      diarrhea: false,
      mouthSores: false,
      dryMouth: false,
      thingsTasteFunny: false,
      thingsSmellTasteBad: false,
      swallowingProblems: false,
      fullquickly: false,
  fatigue: false,
      painLocation: "",
      otherpainLocation:"",
      other: "",
    },

    // BOX 4 - Activities & Function
    activityLevel: "normal", // normal, not_normal, not_feeling_up, little_activity, bedridden

    // WORKSHEETS - Disease & Condition
    diagnosis: [],
    diagnosisOther: "",
    
    // Metabolic Demand
    noFever: true,
    feverLevel: "none", // none, low, moderate, high
    feverDuration: "",
    corticosteroids: "none", // none, low, moderate, high

    // PHYSICAL EXAM
    muscleLoss: 0,
    fatLoss: 0,
    ankleEdema: 0,
    sacralEdema: 0,
    ascites: 0,

    // Global Assessment
    globalAssessment: "", // A, B, C
  });

  const updateForm = (key, value) => {
    setForm({ ...form, [key]: value });
  };


const worksheet1Score = useMemo(() => {
  let score = Number(form.w1_weightLossBand || 0);

  // +1 rule (only if some weight loss exists)
  if (form.w1_weightLoss2Weeks === "yes" && score > 0) {
    score += 1;
  }

  return score;
}, [form.w1_weightLossBand, form.w1_weightLoss2Weeks]);


  const toggleSymptom = (symptom) => {
    setForm({
      ...form,
      symptoms: { ...form.symptoms, [symptom]: !form.symptoms[symptom] },
    });
  };

  const toggleDiagnosis = (diag) => {
    const newDiag = form.diagnosis.includes(diag)
      ? form.diagnosis.filter((d) => d !== diag)
      : [...form.diagnosis, diag];
    updateForm("diagnosis", newDiag);
  };

  /* ===================== SCORING ===================== */

  // Box 1 Score - Weight
  const box1Score = useMemo(() => {
    const weightChangeScores = { decreased: 1, unchanged: 0, increased: 0 };
    return weightChangeScores[form.weightChange2Weeks] || 0;
  }, [form.weightChange2Weeks]);

  // Box 2 Score - Food Intake
  const box2Score = useMemo(() => {
    if (form.intakeStatus === "unchanged" || form.intakeStatus === "more") return 0;
    const intakeScores = {
      normal: 0,
      little_solid: 2,
      liquid_only: 3,
      supplements: 3,
      very_little: 4,
      nothing: 0,
    };
    return 1 + (intakeScores[form.intakeType] || 0);
  }, [form.intakeStatus, form.intakeType]);

  // Box 3 Score - Symptoms
const box3Score = useMemo(() => {
  const symptomPoints = {
    noProblems: 0,
    noAppetite: 3,
    nausea: 1,
    vomiting: 3,
    constipation: 1,
    diarrhea: 3,
    mouthSores: 2,
    dryMouth: 1,
    thingsTasteFunny: 1,
    thingsSmellTasteBad: 1,
    swallowingProblems: 2,
    fullquickly: 1,
    fatigue: 1,
  };


  let score = 0;

  // Checkbox-based symptoms
  Object.entries(symptomPoints).forEach(([key, pts]) => {
    if (form.symptoms[key]) {
      score += pts;
    }
  });

  // Pain location adds +3
  if (form.symptoms.painLocation?.trim()) {
    score += 3;
  }

  // Other symptoms adds +1
  if (form.symptoms.otherpainLocation?.trim()) {
    score += 1;
  }

  return score;
}, [form.symptoms]);

  // Box 4 Score - Activity
  const box4Score = useMemo(() => {
    const activityScores = {
      normal: 0,
      not_normal: 1,
      not_feeling_up: 2,
      little_activity: 2,
      bedridden: 3,
    };
    return activityScores[form.activityLevel] || 0;
  }, [form.activityLevel]);

  // Additive Score (Boxes 1-4)
  const additiveScore = box1Score + box2Score + box3Score + box4Score;

  // Worksheet 2 - Disease Score
  const diseaseScore = useMemo(() => {
    const diseasePoints = {
      cancer: 1,
      aids: 1,
      pulmonary_cachexia: 1,
      cardiac_cachexia: 1,
      open_wound: 1,
      pressure_ulcer: 1,
      major_surgery: 1,
      trauma: 1,
      diagnosis: [],               // already present
diagnosisOther: "",          // NEW – free text
primaryDiseaseStage: "", 
      age_65_plus: 1,
    };

    return form.diagnosis.reduce(
      (sum, diag) => sum + (diseasePoints[diag] || 0),
      0
    );
  }, [form.diagnosis]);

  // Worksheet 3 - Metabolic Stress Score
const metabolicScore = useMemo(() => {
  const feverIntensityScores = {
    none: 0,
    low: 1,
    moderate: 2,
    high: 3,
  };

  const feverDurationScores = {
    none: 0,
    below72: 1,
    "72": 2,
    over72: 3,
  };

  const steroidScores = {
    none: 0,
    low: 1,
    moderate: 2,
    high: 3,
  };

  const feverScore = Math.max(
    feverIntensityScores[form.feverLevel] ?? 0,
    feverDurationScores[form.feverDuration] ?? 0
  );

  const steroidScore = steroidScores[form.corticosteroids] ?? 0;

  return feverScore + steroidScore;
}, [
  form.feverLevel,
  form.feverDuration,
  form.corticosteroids,
]);


const functionalScore = box4Score;


  // Worksheet 4 - Physical Exam Score
const physicalExamScore = useMemo(() => {
  if (form.muscleGlobal > 0) return form.muscleGlobal;
  if (form.fatGlobal > 0) return form.fatGlobal;
  if (form.fluidGlobal > 0) return form.fluidGlobal;
  return 0;
}, [form.muscleGlobal, form.fatGlobal, form.fluidGlobal]);



  // Total Score
  const totalScore = additiveScore + diseaseScore + metabolicScore + physicalExamScore;

  // Triage Recommendation
  const getTriageRecommendation = () => {
    if (totalScore >= 9) {
      return {
        level: "CRITICAL",
        color: "red",
        text: "Indicates a critical need for improved symptom management and/or nutrient intervention options.",
      };
    } else if (totalScore >= 4) {
      return {
        level: "MODERATE",
        color: "#f59e0b",
        text: "Requires intervention by dietitian, in conjunction with nurse or physician as indicated by symptoms (Box 3).",
      };
    } else if (totalScore >=2) {
      return {
        level: "LOW",
        color: "#3b82f6",
        text: "Patient & family education by dietitian, nurse, or other clinician with pharmacologic intervention as indicated by symptom survey (Box 3) and lab values as appropriate.",
      };
    }
    return {
      level: "MINIMAL",
      color: "#22c55e",
      text: "No intervention required at this time. Re-assessment on routine and regular basis during treatment.",
    };
  };

  const triage = getTriageRecommendation();
const pgStage = useMemo(() => {
  // Stage C (severe)
  if (
    worksheet1Score >= 4 ||
    box3Score >= 6 ||
    functionalScore >= 3 ||
    physicalExamScore >= 3
  ) {
    return "C";
  }

  // Stage B (moderate/suspected)
  if (
    worksheet1Score >= 2 ||
    box3Score >= 2 ||
    functionalScore >= 1 ||
    physicalExamScore >= 1
  ) {
    return "B";
  }

  return "A";
}, [worksheet1Score, box3Score, functionalScore, physicalExamScore]);

  /* ===================== RENDER ===================== */
  return (
    <div style={styles.container}>




      {/* Section Divider */}
      <div style={styles.sectionDivider}>
        <span style={styles.dividerText}>Patient-Generated Portion</span>
        <span style={styles.dividerNote}>Boxes 1-4 to be completed by patient</span>
      </div>

      <div style={styles.mainGrid}>
        {/* Column 1 */}
        <div style={styles.column}>
          {/* BOX 1 - Weight */}
          <div style={styles.card}>
            <SectionHeader boxNumber="1" title="Weight" />
            
<div style={styles.weightInputs}>

  {/* HEIGHT */}
  <div style={styles.weightField}>
    <label>Height</label>
    <div style={styles.inputWithUnit}>
      <input
        type="number"
        value={form.height}
        onChange={(e) => updateForm("height", e.target.value)}
        style={styles.numberInput}
        placeholder="0.0"
      />
      <span style={styles.unit}>cm</span>
    </div>
  </div>

  {/* CURRENT WEIGHT */}
  <div style={styles.weightField}>
    <label>Current Weight</label>
    <div style={styles.inputWithUnit}>
      <input
        type="number"
        value={form.weightCurrent}
        onChange={(e) => updateForm("weightCurrent", e.target.value)}
        style={styles.numberInput}
        placeholder="0.0"
      />
      <span style={styles.unit}>kg</span>
    </div>
  </div>

  {/* 1 MONTH AGO */}
  <div style={styles.weightField}>
    <label>weight 1 Month Ago</label>
    <div style={styles.inputWithUnit}>
      <input
        type="number"
        value={form.weightMonthAgo}
        onChange={(e) => updateForm("weightMonthAgo", e.target.value)}
        style={styles.numberInput}
        placeholder="0.0"
      />
      <span style={styles.unit}>kg</span>
    </div>
  </div>

  {/* 6 MONTHS AGO */}
  <div style={styles.weightField}>
    <label>6 Months Ago</label>
    <div style={styles.inputWithUnit}>
      <input
        type="number"
        value={form.weightSixMonthsAgo}
        onChange={(e) => updateForm("weightSixMonthsAgo", e.target.value)}
        style={styles.numberInput}
        placeholder="0.0"
      />
      <span style={styles.unit}>kg</span>
    </div>
  </div>

</div>


            <div style={styles.subsection}>
              <p style={styles.questionText}>
                During the past two weeks my weight has:
              </p>
              <RadioGroup
                name="weightChange"
                options={[
                  { label: "Decreased", value: "decreased", points: "1" },
                  { label: "Stayed the same", value: "unchanged", points: "0" },
                  { label: "Increased", value: "increased", points: "0" },
                ]}
                value={form.weightChange2Weeks}
                onChange={(v) => updateForm("weightChange2Weeks", v)}
              />
            </div>

            <ScoreBox label="Box 1 Score" value={box1Score} />
          </div>

          {/* BOX 2 - Food Intake */}
          <div style={styles.card}>
            <SectionHeader boxNumber="2" title="Food Intake" />

            <p style={styles.questionText}>
              As compared to my normal intake, I would rate my food intake during the past month as:
            </p>

            <RadioGroup
              name="intakeStatus"
              options={[
                { label: "Unchanged", value: "unchanged", points: "0" },
                { label: "More than usual", value: "more", points: "0" },
                { label: "Less than usual", value: "less", points: "1" },
              ]}
              value={form.intakeStatus}
              onChange={(v) => updateForm("intakeStatus", v)}
            />

            {form.intakeStatus === "less" && (
              <div style={styles.nestedSection}>
                <p style={styles.questionText}>I am now eating:</p>
                <RadioGroup
                  name="intakeType"
                  options={[
                    { label: "Normal food but less than normal amount", value: "normal", points: "1" },
                    { label: "Little solid food", value: "little_solid", points: "2" },
                    { label: "Only liquids", value: "liquid_only", points: "3" },
                    { label: "Only nutritional supplements", value: "supplements", points: "3" },
                    { label: "Very little of anything", value: "very_little", points: "4" },
                    { label: "Only tube feedings or only nutrition by vein", value: "nothing", points: "0" },
                  ]}
                  value={form.intakeType}
                  onChange={(v) => updateForm("intakeType", v)}
                />
              </div>
            )}

            <ScoreBox label="Box 2 Score" value={box2Score} />
          </div>
        </div>

        {/* Column 2 */}
        <div style={styles.column}>
          {/* BOX 3 - Symptoms */}
          <div style={styles.card}>
            <SectionHeader boxNumber="3" title="Symptoms" />
            <p style={styles.questionText}>
              I have had the following problems that have kept me from eating enough during the past two weeks (check all that apply):
            </p>

            <div style={styles.symptomGrid}>
              <CheckItem
                label="No problems eating"
                checked={form.symptoms.noProblems}
                onChange={() => toggleSymptom("noProblems")}
                points="0"
              />
              <CheckItem
                label="No appetite, just did not feel like eating"
                checked={form.symptoms.noAppetite}
                onChange={() => toggleSymptom("noAppetite")}
                points="3"
              />
              <CheckItem
                label="Nausea"
                checked={form.symptoms.nausea}
                onChange={() => toggleSymptom("nausea")}
                points="1"
              />
              <CheckItem
                label="Vomiting"
                checked={form.symptoms.vomiting}
                onChange={() => toggleSymptom("vomiting")}
                points="3"
              />
              <CheckItem
                label="Constipation"
                checked={form.symptoms.constipation}
                onChange={() => toggleSymptom("constipation")}
                points="1"
              />
              <CheckItem
                label="Diarrhea"
                checked={form.symptoms.diarrhea}
                onChange={() => toggleSymptom("diarrhea")}
                points="3"
              />
              <CheckItem
                label="Mouth sores"
                checked={form.symptoms.mouthSores}
                onChange={() => toggleSymptom("mouthSores")}
                points="2"
              />
              <CheckItem
                label="Dry mouth"
                checked={form.symptoms.dryMouth}
                onChange={() => toggleSymptom("dryMouth")}
                points="1"
              />
              <CheckItem
                label="Things taste funny or have no taste"
                checked={form.symptoms.thingsTasteFunny}
                onChange={() => toggleSymptom("thingsTasteFunny")}
                points="1"
              />
              <CheckItem
                label="Smells bother me "
                checked={form.symptoms.thingsSmellTasteBad}
                onChange={() => toggleSymptom("thingsSmellTasteBad")}
                points="1"
              />
              <CheckItem
                label="Problems swallowing"
                checked={form.symptoms.swallowingProblems}
                onChange={() => toggleSymptom("swallowingProblems")}
                points="2"
              />
              <CheckItem
                label="Feel full quickly"
                checked={form.symptoms.fullquickly}
                onChange={() => toggleSymptom("fullquickly")}
                points="1"
              />
                            <CheckItem
                label="Fatigue"
                checked={form.symptoms.fatigue}
                onChange={() => toggleSymptom("fatigue")}
                points="1"
              />
            </div>

            <div style={styles.painSection}>
              <label style={styles.painLabel}>Pain - Where?</label>
              <input
                type="text"
                value={form.symptoms.painLocation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    symptoms: { ...form.symptoms, painLocation: e.target.value },
                  })
                }
                placeholder="Describe location..."
                style={styles.textInput}
              />
              {form.symptoms.painLocation && (
                <span style={styles.painPoints}>3</span>
              )}
            </div>
            <div style={styles.painSection}>
              <label style={styles.painLabel}>Others</label>
              <input
                type="text"
                value={form.symptoms.otherpainLocation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    symptoms: { ...form.symptoms, otherpainLocation: e.target.value },
                  })
                }
                placeholder="Describe ..."
                style={styles.textInput}
              />
              {form.symptoms.otherpainLocation && (
                <span style={styles.painPoints}>1</span>
              )}
            </div>
            <ScoreBox label="Box 3 Score" value={box3Score} />
          </div>
        </div>

        {/* Column 3 */}
        <div style={styles.column}>
          {/* BOX 4 - Activities */}
          <div style={styles.card}>
            <SectionHeader boxNumber="4" title="Activities & Function" />
            <p style={styles.questionText}>
              Over the past month, I would generally rate my activity as:
            </p>

            <RadioGroup
              name="activity"
              options={[
                { label: "Normal with no limitations", value: "normal", points: "0" },
                { label: "Not my normal self, but able to be up and about with fairly normal activities", value: "not_normal", points: "1" },
                { label: "Not feeling up to most things, but in bed or chair less than half the day", value: "not_feeling_up", points: "2" },
                { label: "Able to do little activity and spend most of the day in bed or chair", value: "little_activity", points: "3" },
                { label: "Pretty much bedridden, rarely out of bed", value: "bedridden", points: "3" },
              ]}
              value={form.activityLevel}
              onChange={(v) => updateForm("activityLevel", v)}
            />

            <ScoreBox label="Box 4 Score" value={box4Score} />
          </div>
<i><p>The remainder of this form is to be completed by your doctor, nurse, dietitian, or therapist. Thank you.</p></i>
          {/* Additive Score Summary */}
          <div style={styles.summaryCard}>


            <div style={styles.summaryTotal}>
              <span>Additive Score of 1-4 </span>
              <span style={styles.scoreValue}>{additiveScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Section Divider */}
      <div style={styles.sectionDivider}>
        <span style={styles.dividerText}>Professional Worksheets</span>
        <span style={styles.dividerNote}>To be completed by healthcare professional</span>
      </div>

      <div style={styles.worksheetGrid}>
        {/* Worksheet 2 - Diagnosis */}

<div style={styles.card}>
  <SectionHeader
    boxNumber="W1"
    title="Worksheet 1 – Scoring Weight Loss"
    color="#0F172A"
  />

  <p style={styles.questionText}>
    To determine score, use <b>1-month weight data</b> if available.
    Use <b>6-month data only if 1-month data is unavailable</b>.
    Add <b>+1 point</b> if patient has lost weight during the past 2 weeks.
  </p>

  <p style={styles.questionText}>Select weight-loss period:</p>

<RadioGroup
  name="w1_period"
  options={[
    { label: "1 Month", value: "1m" },
    { label: "6 Months", value: "6m" },
  ]}
  value={form.w1_period}
  onChange={(v) => updateForm("w1_period", v)}
/>

<p style={styles.questionText}>
  Weight loss percentage:
</p>

<RadioGroup
  name="w1_weightLossBand"
  options={
    form.w1_period === "1m"
      ? [
          { label: "≥10%", value: "4", points: "4" },
          { label: "5–9.9%", value: "3", points: "3" },
          { label: "3–4.9%", value: "2", points: "2" },
          { label: "2–2.9%", value: "1", points: "1" },
          { label: "0-1.9% ", value: "0", points: "0" },
        ]
      : [
          { label: "≥20%", value: "4", points: "4" },
          { label: "10–19.9%", value: "3", points: "3" },
          { label: "6–9.9%", value: "2", points: "2" },
          { label: "2–5.9%", value: "1", points: "1" },
          { label: "0-1.9% ", value: "0", points: "0" },
        ]
  }
  value={form.w1_weightLossBand}
  onChange={(v) => updateForm("w1_weightLossBand", v)}
/>


  {/* WEIGHT LOSS IN LAST 2 WEEKS */}
  <div style={styles.subsection}>
    <p style={styles.questionText}>Weight loss in past 2 weeks?</p>
    <RadioGroup
      name="w1_weightLoss2Weeks"
      options={[
        { label: "No", value: "no", points: "0" },
        { label: "Yes", value: "yes", points: "1" },
      ]}
      value={form.w1_weightLoss2Weeks}
      onChange={(v) => updateForm("w1_weightLoss2Weeks", v)}
    />
  </div>



  {/* FINAL SCORE */}
  <ScoreBox
    label="Numerical Score from Worksheet 1"
    value={worksheet1Score}
    color="#0F172A"
  />
</div>



<div style={styles.card}>
  <SectionHeader
    boxNumber="W2"
    title="Disease and its relation to nutritional requirements:"
    color="#0F172A"
  />

  {/* CHECKLIST */}
  <div style={styles.diagnosisGrid}>
    {[
      { key: "cancer", label: "Cancer" },
      { key: "aids", label: "AIDS" },
      { key: "pulmonary_cachexia", label: "Pulmonary or cardiac cachexia" },
      { key: "renal_insufficiency", label: "Chronic renal insufficiency" },
      { key: "open_wound", label: "Presence of decubitus, open wound or fistula" },
      { key: "trauma", label: "Presence of trauma" },
      { key: "age_65_plus", label: "Age greater than 65" },
    ].map((item) => (
      <CheckItem
        key={item.key}
        label={item.label}
        checked={form.diagnosis.includes(item.key)}
        onChange={() => toggleDiagnosis(item.key)}
        points="1"
      />
    ))}
  </div>

  {/* OTHER RELEVANT DIAGNOSIS (FREE TEXT) */}
  <div style={{ marginTop: 16 }}>
    <label style={styles.questionText}>
      Other relevant diagnoses (specify):
    </label>
    <input
      type="text"
      value={form.diagnosisOther}
      onChange={(e) => updateForm("diagnosisOther", e.target.value)}
      placeholder="Enter diagnosis..."
      style={styles.textInput}
    />
  </div>

  {/* PRIMARY DISEASE STAGING */}
  <div style={{ marginTop: 16 }}>
    <label style={styles.questionText}>
      Primary disease staging (if known or appropriate):
    </label>
    <select
      value={form.primaryDiseaseStage}
      onChange={(e) => updateForm("primaryDiseaseStage", e.target.value)}
      style={{
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #d1d5db",
        borderRadius: 6,
        fontSize: 14,
      }}
    >
      <option value="">Select stage</option>
      <option value="I">Stage I</option>
      <option value="II">Stage II</option>
      <option value="III">Stage III</option>
      <option value="IV">Stage IV</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <ScoreBox
    label="Disease Score (B)"
    value={diseaseScore}
    color="#0F172A"
  />
</div>


        {/* Worksheet 3 - Metabolic Stress */}
<div style={styles.card}>
  <SectionHeader boxNumber="W3" title="Metabolic Demand" color="#0F172A" />

  {/* FEVER INTENSITY */}
  <div style={styles.subsection}>
    <p style={styles.questionText}>Fever (intensity):</p>
    <RadioGroup
      name="feverLevel"
      options={[
        { label: "No fever", value: "none", points: "0" },
        { label: ">37.2 & <38.3°C", value: "low", points: "1" },
        { label: "≥38.3–38.8°C", value: "moderate", points: "2" },
        { label: "≥38.8°C", value: "high", points: "3" },
      ]}
      value={form.feverLevel}
      onChange={(v) => updateForm("feverLevel", v)}
    />
  </div>

  {/* FEVER DURATION */}
  <div style={styles.subsection}>
    <p style={styles.questionText}>Fever duration:</p>
    <RadioGroup
      name="feverDuration"
      options={[
        { label: "No fever", value: "none", points: "0" },
         { label: "<72 hours", value: "below72", points: "1" },
          { label: "72 hours", value: "72", points: "2" },
        { label: ">72 hours", value: "over72", points: "3" },
      ]}
      value={form.feverDuration}
      onChange={(v) => updateForm("feverDuration", v)}
    />
  </div>

  {/* CORTICOSTEROIDS */}
  <div style={styles.subsection}>
    <p style={styles.questionText}>Corticosteroid use:</p>
    <RadioGroup
      name="steroids"
      options={[
        { label: "No corticosteroids", value: "none", points: "0" },
        { label: "Low dose (<10 mg prednisone equivalents/day)", value: "low", points: "1" },
        { label: "Moderate dose (≥10 & <30 mg prednisone equivalents/day)", value: "moderate", points: "2" },
        { label: "High dose (≥30 mg prednisone equivalents/day)", value: "high", points: "3" },
      ]}
      value={form.corticosteroids}
      onChange={(v) => updateForm("corticosteroids", v)}
    />
  </div>

  <ScoreBox label="Metabolic Score (C)" value={metabolicScore} color="#0F172A" />
</div>


        {/* Worksheet 4 - Physical Exam */}
<div style={styles.card}>
  <SectionHeader
    boxNumber="W4"
    title="Physical Examination"
    color="#0F172A"
  />

  {/* ================= MUSCLE STATUS ================= */}
  <h4 style={{ marginBottom: 8 }}>Muscle Status</h4>

  <div style={styles.threeColGrid}>
    {[
      ["temples", "Temples (temporalis)"],
      ["clavicles", "Clavicles (pectoralis & deltoids)"],
      ["shoulders", "Shoulders (deltoids)"],
      ["interosseous", "Interosseous muscles"],
        ["scapula", "scapula (latissimus dorsi, trapezius, deltoids)"],
      ["thighs", "Thighs (quadriceps)"],
      ["calf", "Calf (gastrocnemius)"],
    ].map(([key, label]) => (
      <div key={key} style={styles.fieldBox}>
        <label>{label}</label>
        <select
          value={form.muscleSites[key]}
          onChange={(e) =>
            updateForm("muscleSites", {
              ...form.muscleSites,
              [key]: Number(e.target.value),
            })
          }
        >
          <option value={0}>None (0) </option>
          <option value={1}>Mild (1+)</option>
          <option value={2}>Moderate (2+)</option>
          <option value={3}>Severe (3+)</option>
        </select>
      </div>
    ))}
  </div>

  <div style={styles.globalRow}>
    <label><strong>Global Muscle Status</strong></label>
    <select
      value={form.muscleGlobal}
      onChange={(e) =>
        updateForm("muscleGlobal", Number(e.target.value))
      }
    >
      <option value={0}>0 – No deficit</option>
      <option value={1}>1 – Mild deficit</option>
      <option value={2}>2 – Moderate deficit</option>
      <option value={3}>3 – Severe deficit</option>
    </select>
  </div>

  <hr style={styles.divider} />

  {/* ================= FAT STORES ================= */}
  <h4 style={{ marginBottom: 8 }}>Fat Stores</h4>

  <div style={styles.threeColGrid}>
    {[
      ["orbital", "Orbital fat pads"],
      ["triceps", "Triceps skinfold"],
      ["ribs", "Fat overlying lower ribs"],
    ].map(([key, label]) => (
      <div key={key} style={styles.fieldBox}>
        <label>{label}</label>
        <select
          value={form.fatSites[key]}
          onChange={(e) =>
            updateForm("fatSites", {
              ...form.fatSites,
              [key]: Number(e.target.value),
            })
          }
        >
          <option value={0}>None (0) </option>
          <option value={1}>Mild (1+)</option>
          <option value={2}>Moderate (2+)</option>
          <option value={3}>Severe (3+)</option>
        </select>
      </div>
    ))}
  </div>

  <div style={styles.globalRow}>
    <label><strong>Global Fat Status</strong></label>
    <select
      value={form.fatGlobal}
      onChange={(e) =>
        updateForm("fatGlobal", Number(e.target.value))
      }
    >
      <option value={0}>0 – No deficit</option>
      <option value={1}>1 – Mild deficit</option>
      <option value={2}>2 – Moderate deficit</option>
      <option value={3}>3 – Severe deficit</option>
    </select>
  </div>

  <hr style={styles.divider} />

  {/* ================= FLUID STATUS ================= */}
  <h4 style={{ marginBottom: 8 }}>Fluid Status</h4>

  <div style={styles.threeColGrid}>
    {[
      ["ankle", "Ankle edema"],
      ["sacral", "Sacral edema"],
      ["ascites", "Ascites"],
    ].map(([key, label]) => (
      <div key={key} style={styles.fieldBox}>
        <label>{label}</label>
        <select
          value={form.fluidSites[key]}
          onChange={(e) =>
            updateForm("fluidSites", {
              ...form.fluidSites,
              [key]: Number(e.target.value),
            })
          }
        >
          <option value={0}>None (0) </option>
          <option value={1}>Mild (1+)</option>
          <option value={2}>Moderate (2+)</option>
          <option value={3}>Severe (3+)</option>
        </select>
      </div>
    ))}
  </div>

  <div style={styles.globalRow}>
    <label><strong>Global Fluid Status</strong></label>
    <select
      value={form.fluidGlobal}
      onChange={(e) =>
        updateForm("fluidGlobal", Number(e.target.value))
      }
    >
      <option value={0}>0 – No excess</option>
      <option value={1}>1 – Mild excess</option>
      <option value={2}>2 – Moderate excess</option>
      <option value={3}>3 – Severe excess</option>
    </select>
  </div>

  <ScoreBox
    label="Physical Exam Score (D)"
    value={physicalExamScore}
    color="#0F172A"
  />
</div>

<div style={styles.card}>
  <SectionHeader
    boxNumber="W5"
    title="PG-SGA Global Assessment Categories"
    color="#0F172A"
  />

  <div style={styles.w5Grid}>
    {/* ================= WEIGHT ================= */}
    <div style={styles.w5Row}>
      <label><strong>Category Weight</strong></label>
      <select style={{width:"100%"}}
        value={form.w5.weight}
        onChange={(e) =>
          updateForm("w5", { ...form.w5, weight: e.target.value })
        }
      >
        <option value="">Select…</option>
        <option value="A">Stage A – No weight loss OR recent non-fluid weight gain</option>
        <option value="B">Stage B – ≤5% loss in 1 month (&lt;10% in 6 months) OR progressive loss</option>
        <option value="C">Stage C – &gt;5% loss in 1 month (&gt;10% in 6 months) OR progressive loss</option>
      </select>
    </div>

    {/* ================= NUTRIENT INTAKE ================= */}
    <div style={styles.w5Row}>
      <label><strong>Nutrient Intake</strong></label>
      <select style={{width:"100%"}}
        value={form.w5.intake}
        onChange={(e) =>
          updateForm("w5", { ...form.w5, intake: e.target.value })
        }
      >
        <option value="">Select…</option>
        <option value="A">Stage A – No deficit OR significant recent improvement</option>
        <option value="B">Stage B – Definite decrease in intake</option>
        <option value="C">Stage C – Severe deficit in intake</option>
      </select>
    </div>

    {/* ================= NIS ================= */}
    <div style={styles.w5Row}>
      <label><strong>Nutrition Impact Symptoms (NIS)</strong></label>
      <select style={{width:"100%"}}
        value={form.w5.nis}
        onChange={(e) =>
          updateForm("w5", { ...form.w5, nis: e.target.value })
        }
      >
        <option value="">Select…</option>
        <option value="A">Stage A – No NIS OR significant recent improvement</option>
        <option value="B">Stage B – Presence of NIS (Box 3 PG-SGA)</option>
        <option value="C">Stage C – Presence of NIS (Box 3 PG-SGA)</option>
      </select>
    </div>

    {/* ================= FUNCTIONING ================= */}
    <div style={styles.w5Row}>
      <label><strong>Functioning</strong></label>
      <select style={{width:"100%"}}
        value={form.w5.functioning}
        onChange={(e) =>
          updateForm("w5", { ...form.w5, functioning: e.target.value })
        }
      >
        <option value="">Select…</option>
        <option value="A">Stage A – No deficit OR significant recent improvement</option>
        <option value="B">Stage B – Moderate functional deficit OR recent deterioration</option>
        <option value="C">Stage C – Severe functional deficit OR recent significant deterioration</option>
      </select>
    </div>

    {/* ================= PHYSICAL EXAM ================= */}
    <div style={styles.w5Row}>
      <label><strong>Physical Exam</strong></label>
      <select style={{width:"100%"}}
        value={form.w5.physical}
        onChange={(e) =>
          updateForm("w5", { ...form.w5, physical: e.target.value })
        }
      >
        <option value="">Select…</option>
        <option value="A">Stage A – No deficit OR chronic deficit with recent improvement</option>
        <option value="B">Stage B – Mild to moderate loss of muscle/fat</option>
        <option value="C">Stage C – Severe loss of muscle/fat ± edema</option>
      </select>
    </div>

        <div style={styles.w5Row}>
      <label><strong>Global PG-SGA Category Rating</strong></label>
      <select style={{justifyContent:"space-between"}}
        value={form.w5.global}
        onChange={(e) =>
          updateForm("w5", { ...form.w5, global: e.target.value })
        }
      >
        <option value="">Select…</option>
        <option value="A">Stage A</option>
        <option value="B">Stage B</option>
        <option value="C">Stage C</option>
      </select>
    </div>
  </div>
</div>



      </div>

      {/* Global Assessment */}



      {/* Total Score & Triage */}
      <div style={styles.totalSection}>
        <div style={styles.totalCard}>
          <div style={styles.totalHeader}>TOTAL PG-SGA SCORE</div>
          <div style={styles.scoreBreakdown}>
            <div style={styles.breakdownItem}>
              <span>A (Boxes 1-4)</span>
              <span>{additiveScore}</span>
            </div>
            <div style={styles.breakdownItem}>
              <span>B (Disease)</span>
              <span>{diseaseScore}</span>
            </div>
            <div style={styles.breakdownItem}>
              <span>C (Metabolic)</span>
              <span>{metabolicScore}</span>
            </div>
            <div style={styles.breakdownItem}>
              <span>D (Physical)</span>
              <span>{physicalExamScore}</span>
            </div>
          </div>
          <div style={styles.totalValue}>{totalScore}</div>
        </div>

        <div
          style={{
            ...styles.triageCard,
            background: `linear-gradient(135deg, ${triage.color}20, ${triage.color}10)`,
            borderColor: triage.color,
          }}
        >
          <div style={styles.triageHeader}>NUTRITIONAL TRIAGE RECOMMENDATION</div>
          <div style={{ ...styles.triageLevel, color: triage.color }}>
            {triage.level}
          </div>
          <div style={styles.triageText}>{triage.text}</div>
          <div style={styles.triageScale}>
            <div style={styles.scaleBar}>
              <div style={styles.scaleGreen}>0-1</div>
              <div style={styles.scaleBlue}>2-3</div>
              <div style={styles.scaleYellow}>4-8</div>
              <div style={styles.scaleRed}>≥9</div>
            </div>
            <div
              style={{
                ...styles.scaleIndicator,
                left: `${Math.min(totalScore * 5, 95)}%`,
              }}
            >
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionBar}>

        <button
          style={styles.primaryBtn}
          onClick={() =>
            onSave({
              ...form,
              scores: {
                box1: box1Score,
                box2: box2Score,
                box3: box3Score,
                box4: box4Score,
                additive: additiveScore,
                disease: diseaseScore,
                metabolic: metabolicScore,
                physical: physicalExamScore,
                total: totalScore,
              },
              triage: triage.level,
            })
          }
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12l5 5L20 7" />
          </svg>
          Save Assessment
        </button>
      </div>

      {/* Footer */}

    </div>
  );
}

/* ===================== STYLES ===================== */
const styles = {
  container: {
    maxWidth: 1400,
    margin: "0 auto",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "#f0f4f8",
    minHeight: "100vh",
    padding: 24,
  },
  headerBar: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    background: "linear-gradient(135deg, #0F172A 0%, #2d5a87 100%)",
    padding: "20px 24px",
    borderRadius: "12px 12px 0 0",
    color: "#fff",
  },
  logo: {
    flexShrink: 0,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 400,
    margin: 0,
    opacity: 0.9,
  },
  formVersion: {
    marginLeft: "auto",
    textAlign: "right",
    fontSize: 12,
    opacity: 0.8,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  patientBar: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    background: "#fff",
    padding: 20,
    borderBottom: "1px solid #e5e7eb",
  },
  patientField: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  },
  sectionDivider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0px",
    borderRadius: 6,
  },
  dividerText: {
    fontWeight: 700,
    fontSize: 20,
    letterSpacing: 1,
    color:"#0f172a"
  },
  dividerNote: {
    fontSize: 12,
    opacity: 0.8,
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr ",
    gap: 20,
  },
  stageGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 16,
  marginTop: 12,
},

stageCard: {
  display: "flex",
  gap: 12,
  padding: 16,
  border: "2px solid #E5E7EB",
  borderRadius: 10,
  cursor: "pointer",
  fontSize: 14,
},


  column: {
    display: "grid",
    flexDirection: "column",
    gap: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    marginTop:20,
    padding: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  weightInputs: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginBottom: 16,
  },
  weightField: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  inputWithUnit: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    overflow: "hidden",
  },
  numberInput: {
    flex: 1,
    padding: "10px 12px",
    border: "none",
    fontSize: 14,
    outline: "none",
    width: "100%",
  },
  unit: {
    padding: "10px 12px",
    background: "#f3f4f6",
    color: "#6b7280",
    fontSize: 13,
    fontWeight: 500,
  },
  subsection: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px solid #e5e7eb",
  },
  nestedSection: {
    marginTop: 12,
    marginLeft: 24,
    paddingLeft: 16,
    borderLeft: "3px solid #3b82f6",
  },
  questionText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 12,
    fontWeight: 500,
  },
  symptomGrid: {
        display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
   
  },
  painSection: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
    padding: "10px 12px",
    borderRadius: 6,
  },
  painLabel: {
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
w5Grid: {
  display: "flex",
  flexDirection: "column",
  gap: 14,
  marginTop: 12,
},

w5Row: {
  display: "grid",
  gridTemplateColumns: "220px 1fr",
  gap: 16,
  alignItems: "center",
},



w5Stage: {
  border: "2px solid",
  borderRadius: 8,
  padding: 12,
  fontSize: 14,
},

w5Result: {
  marginTop: 16,
  padding: 12,
  background: "#F1F5F9",
  borderRadius: 6,
  fontSize: 15,
  display: "flex",
  alignItems: "center",
  gap: 8,
},

w5Badge: {
  padding: "4px 10px",
  borderRadius: 6,
  background: "#0F172A",
  color: "#fff",
  fontWeight: 700,
},

  textInput: {
    flex: 1,
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 4,
    fontSize: 14,
  },
  painPoints: {
    background: "#0F172A",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
  },
  summaryCard: {
    background: "linear-gradient(135deg, #0F172A 0%, #2d5a87 100%)",
    borderRadius: 10,
    padding: 20,
    color: "#fff",
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    fontSize: 14,
  },
  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 12,

    fontSize: 16,
    fontWeight: 700,
  },
  scoreValue: {
    background: "#fff",
    color: "#0F172A",
    padding: "4px 16px",
    borderRadius: 6,
    fontSize: 18,
    fontWeight: 700,
  },
  worksheetGrid: {
    display:"block",
    gap: 20,
  },
  diagnosisGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 4,
  },
  fluidSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px solid #e5e7eb",
  },
  globalSection: {
    background: "#fff",
    borderRadius: 10,
    padding: 24,
    marginBottom: 24,
  },
  globalOptions: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
  },
  globalOption: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    border: "2px solid #e5e7eb",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "center",
  },
  globalBadge: {
    color: "#fff",
    padding: "8px 20px",
    borderRadius: 20,
    fontWeight: 700,
    fontSize: 14,
    marginBottom: 12,
  },
  globalLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: "#1f2937",
    marginBottom: 6,
  },
  globalDesc: {
    fontSize: 13,
    color: "#6b7280",
  },
  totalSection: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: 24,
    marginBottom: 24,
    marginTop:20,
  },
  totalCard: {
    background: "linear-gradient(135deg, #0F172A 0%, #0f172a 100%)",
    borderRadius: 12,
    padding: 24,
    color: "#fff",
    textAlign: "center",
  },
  totalHeader: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 1,
    marginBottom: 16,
    opacity: 0.9,
  },
  scoreBreakdown: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    marginBottom: 20,
    fontSize: 13,
    opacity: 0.8,
  },
  breakdownItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "4px 8px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: 4,
  },
  totalValue: {
    fontSize: 64,
    fontWeight: 700,
    lineHeight: 1,
  },
  triageCard: {
    borderRadius: 12,
    border: "2px solid",
    padding: 24,
  },
  triageHeader: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1,
    color: "#6b7280",
    marginBottom: 8,
  },
  triageLevel: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 8,
  },
  triageText: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 20,
    lineHeight: 1.5,
  },
  triageScale: {
    position: "relative",
    height: 50,
  },
  scaleBar: {
    display: "flex",
    height: 24,
    borderRadius: 4,
    overflow: "hidden",
    fontSize: 11,
    fontWeight: 600,
    color: "#fff",
  },
  scaleGreen: {
    flex: 1,
    background: "#22c55e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scaleBlue: {
    flex: 1,
    background: "#3b82f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scaleYellow: {
    flex: 2,
    background: "#f59e0b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scaleRed: {
    flex: 2,
    background: "#0F172A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scaleIndicator: {
    position: "absolute",
    top: 26,
    fontSize: 16,
    color: "#0F172A",
    transform: "translateX(-50%)",
    transition: "left 0.3s ease",
  },
  actionBar: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    padding: "20px 0",
    borderTop: "1px solid #e5e7eb",
  },
  threeColGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 12,
  marginBottom: 12,
},

fieldBox: {
  display: "flex",
  flexDirection: "column",
  gap: 4,
},

globalRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 10,
},

divider: {
  margin: "16px 0",
},

  secondaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 20px",
    background: "#fff",
    color: "#0F172A",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  primaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 24px",
    background: "linear-gradient(135deg, #0F172A 0%, #2d5a87 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  footer: {
    textAlign: "center",
    padding: "16px 0",
    fontSize: 12,
    color: "#9ca3af",
  },
};
