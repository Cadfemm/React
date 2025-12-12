// PGSGAMetric.jsx  (COMBINED CODE1 + CODE2 WITH SAVE LOGIC FROM CODE1)
import React, { useState, useEffect } from "react";

/* ===================== GENERIC DROPDOWNS ===================== */

function SingleSelect({ label, name, value, options, onChange }) {
  const [open, setOpen] = useState(false);

  const wrapperStyle = { marginBottom: 50, position: "relative" };
  const labelStyle = { display: "block", marginBottom: 4, fontWeight: 600, fontSize: 14 };
  const controlStyle = {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "6px 8px",
    backgroundColor: "#fff",
    cursor: "pointer",
    minWidth: 260,
    fontSize: 14,
  };

  const menuStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: 4,
    border: "1px solid #ccc",
    borderRadius: 4,
    backgroundColor: "#fff",
    zIndex: 40,
    maxHeight: 140,
    overflowY: "auto",
    minWidth: 260,
    boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
  };

  const optionStyle = (selected) => ({
    padding: "6px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 14,
    backgroundColor: selected ? "#e8f2ff" : "#fff",
  });

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "Select...";

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setOpen(false);
  };

  return (
    <div style={wrapperStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={controlStyle} onClick={() => setOpen((o) => !o)}>{selectedLabel}</div>

      {open && (
        <div style={menuStyle}>
          {options.map((opt) => (
            <div
              key={opt.value}
              style={optionStyle(value === opt.value)}
              onClick={() => handleSelect(opt.value)}
            >
              <span>{opt.label}</span>
              {value === opt.value && <span>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// MULTISELECT
function MultiSelectDropdown({ label, name, values, options, onChange }) {
  const [open, setOpen] = useState(false);

  const wrapperStyle = { marginBottom: 32, position: "relative" };
  const labelStyle = { display: "block", marginBottom: 4, fontWeight: 600, fontSize: 14 };
  const controlStyle = {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "6px 8px",
    backgroundColor: "#fff",
    cursor: "pointer",
    minWidth: 300,
    fontSize: 14,
  };

  const menuStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: 4,
    border: "1px solid #ccc",
    borderRadius: 4,
    backgroundColor: "#fff",
    zIndex: 40,
    maxHeight: 160,
    overflowY: "auto",
    minWidth: 300,
    boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
  };

  const optionStyle = {
    padding: "6px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 14,
  };

  const selectedLabels = options.filter((o) => values.includes(o.value)).map((o) => o.label);

  const toggleValue = (val) => {
    const newValues = values.includes(val)
      ? values.filter((v) => v !== val)
      : [...values, val];
    onChange({ target: { name, value: newValues } });
  };

  return (
    <div style={wrapperStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={controlStyle} onClick={() => setOpen((o) => !o)}>
        {selectedLabels.length ? selectedLabels.join(", ") : "Select..."}
      </div>

      {open && (
        <div style={menuStyle}>
          {options.map((opt) => {
            const checked = values.includes(opt.value);
            return (
              <div
                key={opt.value}
                style={optionStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleValue(opt.value);
                }}
              >
                <span>{opt.label}</span>
                <input type="checkbox" readOnly checked={checked} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ===================== SCORING HELPERS ===================== */
function getPercentLoss(current, past) {
  if (!past || past <= 0 || !current || current <= 0) return 0;
  const pct = ((past - current) / past) * 100;
  return pct > 0 ? pct : 0;
}

function scoreLossOneMonth(p) {
  if (p >= 10) return 4;
  if (p >= 5) return 3;
  if (p >= 3) return 2;
  if (p >= 2) return 1;
  return 0;
}

function scoreLossSixMonths(p) {
  if (p >= 20) return 4;
  if (p >= 10) return 3;
  if (p >= 6) return 2;
  if (p >= 2) return 1;
  return 0;
}

function calcBox1Score({ currentWeight, weightOneMonthAgo, weightSixMonthsAgo, weightChangeTwoWeeks }) {
  const cw = Number(currentWeight);
  const w1 = Number(weightOneMonthAgo);
  const w6 = Number(weightSixMonthsAgo);

  let basePoints = 0;
  if (w1 > 0) basePoints = scoreLossOneMonth(getPercentLoss(cw, w1));
  else if (w6 > 0) basePoints = scoreLossSixMonths(getPercentLoss(cw, w6));

  const extra = weightChangeTwoWeeks === "decreased" ? 1 : 0;
  return basePoints + extra;
}

/* ===================== OPTIONS ===================== */

const weightChangeOptions = [
  { value: "decreased", label: "decreased (add 1 point)", points: 1 },
  { value: "notChanged", label: "not changed (0)", points: 0 },
  { value: "increased", label: "increased (0)", points: 0 },
];

const foodIntakeComparedOptions = [
  { value: "unchanged", label: "unchanged (0)", points: 0 },
  { value: "moreThanUsual", label: "more than usual (0)", points: 0 },
  { value: "lessThanUsual", label: "less than usual (1)", points: 1 },
];

const currentIntakeOptions = [
  { value: "normalLessAmount", label: "normal food but less than normal amount (1)", points: 1 },
  { value: "littleSolid", label: "little solid food (2)", points: 2 },
  { value: "onlyLiquids", label: "only liquids (3)", points: 3 },
  { value: "onlySupplements", label: "only nutritional supplements (3)", points: 3 },
  { value: "veryLittle", label: "very little of anything (4)", points: 4 },
  { value: "onlyTubeOrIV", label: "only tube feedings or only nutrition by vein (0)", points: 0 },
];

const symptomOptions = [
  { value: "noProblems", label: "no problems eating (0)", points: 0 },
  { value: "noAppetite", label: "no appetite.. (3)", points: 3 },
  { value: "nausea", label: "nausea (1)", points: 1 },
  { value: "vomiting", label: "vomiting (3)", points: 3 },
  { value: "constipation", label: "constipation (1)", points: 1 },
  { value: "diarrhea", label: "diarrhea (3)", points: 3 },
  { value: "mouthSores", label: "mouth sores (2)", points: 2 },
  { value: "dryMouth", label: "dry mouth (1)", points: 1 },
  { value: "tasteChange", label: "taste change (1)", points: 1 },
  { value: "swallowing", label: "problems swallowing (2)", points: 2 },
  { value: "feelFull", label: "feel full quickly (1)", points: 1 },
  { value: "smellsBother", label: "smells bother me (1)", points: 1 },
  { value: "fatigue", label: "fatigue (1)", points: 1 },
  { value: "pain", label: "pain (3)", points: 3 },
  { value: "other", label: "other (1)**", points: 1 },
];

const activityOptions = [
  { value: "normal", label: "normal (0)", points: 0 },
  { value: "notMyNormal", label: "not my normal self (1)", points: 1 },
  { value: "lessThanHalfDayInBed", label: "< half day in bed (2)", points: 2 },
  { value: "mostDayInBed", label: "most day in bed (3)", points: 3 },
  { value: "bedRidden", label: "bed ridden (3)", points: 3 },
];

const diseaseOptions = [
  { value: "cancer", label: "Cancer (1)", points: 1 },
  { value: "openWound", label: "Decubitus / wound (1)", points: 1 },
  { value: "aids", label: "AIDS (1)", points: 1 },
  { value: "trauma", label: "Trauma (1)", points: 1 },
  { value: "cachexia", label: "Cachexia (1)", points: 1 },
  { value: "ageOver65", label: "Age > 65 (1)", points: 1 },
  { value: "renal", label: "Renal insufficiency (1)", points: 1 },
  { value: "other", label: "Other diagnoses (1)", points: 1 },
];

const feverOptions = [
  { value: "none", label: "no fever (0)", points: 0 },
  { value: "low", label: ">37.2–<38.3°C (1)", points: 1 },
  { value: "moderate", label: "≥38.3–<38.8°C (2)", points: 2 },
  { value: "high", label: "≥38.8°C (3)", points: 3 },
];

const feverDurationOptions = [
  { value: "none", label: "no fever (0)", points: 0 },
  { value: "low", label: "<72 hr (1)", points: 1 },
  { value: "moderate", label: "72 hr (2)", points: 2 },
  { value: "high", label: ">72 hr (3)", points: 3 },
];

const steroidOptions = [
  { value: "none", label: "None (0)", points: 0 },
  { value: "low", label: "<10 mg (1)", points: 1 },
  { value: "moderate", label: "10–30 mg (2)", points: 2 },
  { value: "high", label: ">30 mg (3)", points: 3 },
];

const examSiteOptions = [
  { value: "0", label: "0 normal", points: 0 },
  { value: "1", label: "1+ mild", points: 1 },
  { value: "2", label: "2+ moderate", points: 2 },
  { value: "3", label: "3+ severe", points: 3 },
];

/* ===================== MAIN COMBINED COMPONENT ===================== */
export default function PGSGAMetric({ onSave, assessmentName = "PG-SGA-Metric-version", initialFormData = null }) {
  const [form, setForm] = useState(initialFormData || {});

  // Load initial saved data when switching back
  useEffect(() => {
    if (initialFormData) setForm(initialFormData);
  }, [initialFormData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // scoring helpers
  const scoreSingle = (opts, val) => opts.find((o) => o.value === val)?.points || 0;
  const scoreMulti = (opts, vals = []) =>
    vals.reduce((sum, v) => sum + (opts.find((o) => o.value === v)?.points || 0), 0);

  // SCORE CALCULATIONS
  const box1Score = calcBox1Score({
    currentWeight: form.currentWeight,
    weightOneMonthAgo: form.weightOneMonthAgo,
    weightSixMonthsAgo: form.weightSixMonthsAgo,
    weightChangeTwoWeeks: form.box1_weightChange,
  });

  const box2Score =
    scoreSingle(foodIntakeComparedOptions, form.box2_foodIntakeCompared) +
    scoreSingle(currentIntakeOptions, form.box2_currentIntake);

  const box3Score = scoreMulti(symptomOptions, form.box3_symptoms || []);
  const box4Score = scoreSingle(activityOptions, form.box4_activity);
  const additiveA = box1Score + box2Score + box3Score + box4Score;

  const box5Score = scoreMulti(diseaseOptions, form.box5_diseases || []);

  const feverIntensity = scoreSingle(feverOptions, form.box6_fever);
  const feverDuration = scoreSingle(feverDurationOptions, form.box6_feverDuration);
  const steroidScore = scoreSingle(steroidOptions, form.box6_steroids);
  const box6Score = Math.max(feverIntensity, feverDuration) + steroidScore;

  const gMuscle = scoreSingle(examSiteOptions, form.m_global);
  const gFat = scoreSingle(examSiteOptions, form.f_global);
  const gFluid = scoreSingle(examSiteOptions, form.fl_global);
  const box7Score = Math.max(gMuscle, gFat, gFluid);

  const totalScore = additiveA + box5Score + box6Score + box7Score;

  /* =============== IMPORTANT — COMBINED SUBMIT BUTTON LOGIC FROM CODE1 =============== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSave) {
      onSave(assessmentName, { ...form, totalScore });
    } else {
      console.error("onSave not provided");
    }
  };

  /* ---------------- UI STYLE ---------------- */
  const containerStyle = { fontFamily: "Arial", padding: 24, maxWidth: 900, margin: "auto" };
  const titleStyle = { fontSize: 22, fontWeight: 700, marginBottom: 16 };
  const innerBoxStyle = {
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  };
  const innerHeaderStyle = {
    background: "#0d6efd",
    color: "white",
    padding: "10px 16px",
    fontSize: 16,
    fontWeight: "bold",
  };
  const innerBodyStyle = { padding: 16, fontSize: 14 };
  const scoreSquareStyle = { width: 40, height: 32, borderRadius: 4, border: "1px solid #333", textAlign: "center" };

  return (
    <form style={containerStyle} onSubmit={handleSubmit}>
      <div style={titleStyle}>Scored PG-SGA Assessment</div>

      {/* ================= BOXES SAME AS CODE2 ================= */}

      {/* ----- BOX 1 ----- */}
      <div style={innerBoxStyle}>
        <div style={innerHeaderStyle}>1. Weight</div>
        <div style={innerBodyStyle}>
          <div>Current Weight</div>
          <input name="currentWeight" onChange={handleChange} type="number" />

          <div>Weight 1 month ago</div>
          <input name="weightOneMonthAgo" onChange={handleChange} type="number" />

          <div>Weight 6 months ago</div>
          <input name="weightSixMonthsAgo" onChange={handleChange} type="number" />

          <SingleSelect
            name="box1_weightChange"
            value={form.box1_weightChange}
            options={weightChangeOptions}
            onChange={handleChange}
          />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <input readOnly value={box1Score} style={scoreSquareStyle} />
          </div>
        </div>
      </div>

      {/* ----- BOX 2 ----- */}
      <div style={innerBoxStyle}>
        <div style={innerHeaderStyle}>2. Food Intake</div>
        <div style={innerBodyStyle}>
          <SingleSelect
            name="box2_foodIntakeCompared"
            value={form.box2_foodIntakeCompared}
            options={foodIntakeComparedOptions}
            onChange={handleChange}
          />

          <SingleSelect
            name="box2_currentIntake"
            value={form.box2_currentIntake}
            options={currentIntakeOptions}
            onChange={handleChange}
          />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <input readOnly value={box2Score} style={scoreSquareStyle} />
          </div>
        </div>
      </div>

      {/* ----- BOX 3 ----- */}
      <div style={innerBoxStyle}>
        <div style={innerHeaderStyle}>3. Symptoms</div>
        <div style={innerBodyStyle}>
          <MultiSelectDropdown
            name="box3_symptoms"
            values={form.box3_symptoms || []}
            options={symptomOptions}
            onChange={handleChange}
          />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <input readOnly value={box3Score} style={scoreSquareStyle} />
          </div>
        </div>
      </div>

      {/* ----- BOX 4 ----- */}
      <div style={innerBoxStyle}>
        <div style={innerHeaderStyle}>4. Activity</div>
        <div style={innerBodyStyle}>
          <SingleSelect
            name="box4_activity"
            value={form.box4_activity}
            options={activityOptions}
            onChange={handleChange}
          />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <input readOnly value={box4Score} style={scoreSquareStyle} />
          </div>
        </div>
      </div>

      <div style={{ fontWeight: "bold", marginBottom: 16 }}>
        Additive Score A = {additiveA}
      </div>

      {/* ----- BOX 5 ----- */}
      <div style={innerBoxStyle}>
        <div style={innerHeaderStyle}>5. Disease</div>
        <div style={innerBodyStyle}>
          <MultiSelectDropdown
            name="box5_diseases"
            values={form.box5_diseases || []}
            options={diseaseOptions}
            onChange={handleChange}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <input readOnly value={box5Score} style={scoreSquareStyle} />
          </div>
        </div>
      </div>

      {/* ----- BOX 6 ----- */}
      <div style={innerBoxStyle}>
        <div style={innerHeaderStyle}>6. Metabolic Demand</div>
        <div style={innerBodyStyle}>
          <SingleSelect name="box6_fever" value={form.box6_fever} options={feverOptions} onChange={handleChange} />
          <SingleSelect name="box6_feverDuration" value={form.box6_feverDuration} options={feverDurationOptions} onChange={handleChange} />
          <SingleSelect name="box6_steroids" value={form.box6_steroids} options={steroidOptions} onChange={handleChange} />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <input readOnly value={box6Score} style={scoreSquareStyle} />
          </div>
        </div>
      </div>

      {/* ----- BOX 7 ----- */}
      <div style={innerBoxStyle}>
        <div style={innerHeaderStyle}>7. Physical Exam</div>

        <div style={innerBodyStyle}>
          <div>Muscle</div>
          <SingleSelect name="m_global" value={form.m_global} options={examSiteOptions} onChange={handleChange} />

          <div>Fat</div>
          <SingleSelect name="f_global" value={form.f_global} options={examSiteOptions} onChange={handleChange} />

          <div>Fluid</div>
          <SingleSelect name="fl_global" value={form.fl_global} options={examSiteOptions} onChange={handleChange} />

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <input readOnly value={box7Score} style={scoreSquareStyle} />
          </div>
        </div>
      </div>

      {/* TOTAL SCORE */}
      <div style={{ fontWeight: "bold", marginTop: 20, fontSize: 18 }}>
        TOTAL PG-SGA SCORE = {totalScore}
      </div>

      {/* ================= SAVE BUTTON (FROM CODE1) ================= */}
      <button
        type="submit"
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "#0c3161",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 16
        }}
      >
        Save PG-SGA Assessment
      </button>
    </form>
  );
}
