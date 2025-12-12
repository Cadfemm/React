import React, { useState, useMemo } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function ExaminationAssessmentForm({
  patient,
  icfList = [],
  ichiSelected = [],
  previousProgress = [],
  onSubmit,
  onBack,
}) {
  // ---- REGISTRATION ANTHROPOMETRY (from Customer Service) ----
  const regWeight = Number(patient.weight) || 0;
  const regHeight = Number(patient.height) || 0;
  const regBMI =
    regWeight && regHeight
      ? (regWeight / (regHeight / 100) ** 2).toFixed(1)
      : "-";

  // ---- FORM STATE (include current anthropometry) ----
  const [form, setForm] = useState({
    intake_type: "",
    intake_text: "",
    texture_modification: "",
    texture_food: "",
    texture_drink: "",
    texture_free_text: "",
    intake_vs_requirement: "",
    intake_vs_text: "",
    nutrition_goal: "",
    ichi_intervention: ichiSelected.join(", "),
    diet_prescription: "",
    counselling: "",
    monitoring_params: [],
    progress: "",
    action: "",
    next_review: "",
    // New: current anthropometry (editable)
    current_weight: patient.weight || "",
    current_height: patient.height || "",
  });

  const setField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleMonitoringParam = (param) => {
    setForm((prev) => ({
      ...prev,
      monitoring_params: prev.monitoring_params.includes(param)
        ? prev.monitoring_params.filter((p) => p !== param)
        : [...prev.monitoring_params, param],
    }));
  };

  // ---- CURRENT BMI (derived from editable fields) ----
  const currentBMI = useMemo(() => {
    const w = Number(form.current_weight);
    const h = Number(form.current_height);
    if (!w || !h) return "";
    return (w / (h / 100) ** 2).toFixed(1);
  }, [form.current_weight, form.current_height]);

  // ---- HANDLE SUBMIT (keep your flow) ----
  const handleSubmit = () => {
    const entry = {
      date: new Date().toLocaleString(),
      ...form,
      current_bmi: currentBMI,
    };
    onSubmit(entry);
  };

  // ---- MONITORING OPTIONS ----
  const monitoringOptions = [
    "Weight",
    "Intake %",
    "Bowel Pattern",
    "Muscle Loss",
    "Appetite",
    "GM",
    "BP",
    "Sleep",
    "Others",
  ];

  // ---- TREND DATA (Initial vs Current) ----
  const trendData = useMemo(() => {
    const points = [];

    if (regWeight && regHeight) {
      points.push({
        label: "Initial",
        weight: regWeight,
        bmi: Number(regBMI) || null,
      });
    }

    const currW = Number(form.current_weight);
    const currH = Number(form.current_height);
    const currBMI = currW && currH ? currW / (currH / 100) ** 2 : null;

    if (currW && currH) {
      points.push({
        label: "Current",
        weight: currW,
        bmi: currBMI ? Number(currBMI.toFixed(1)) : null,
      });
    }

    return points;
  }, [regWeight, regHeight, regBMI, form.current_weight, form.current_height]);

  return (
    <div
      style={{
        maxWidth: 950,
        margin: "0 auto",
        padding: 20,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h2>Follow-Up Nutrition Assessment</h2>
        <button style={btnBack} onClick={onBack}>
          ← Back
        </button>
      </div>

      {/* -------------------- ASSESSMENT SUMMARY -------------------- */}
      <div className="card">
        <h3>Assessment Summary</h3>

        {/* Current Nutrition Intake */}
        <label>Current Nutrition Intake</label>
        <select
          style={input}
          value={form.intake_type}
          onChange={(e) => setField("intake_type", e.target.value)}
        >
          <option value="">Select...</option>
          <option value="ORAL">ORAL</option>
          <option value="EN">EN (Enteral)</option>
          <option value="COMBINATION">Combination</option>
        </select>

        <textarea
          style={textarea}
          placeholder="Enter intake description..."
          value={form.intake_text}
          onChange={(e) => setField("intake_text", e.target.value)}
        />

        {/* Texture Modification */}
        <label style={sectionLabel}>Texture Modification @ IDDSI Level</label>
        <select
          style={input}
          value={form.texture_modification}
          onChange={(e) => setField("texture_modification", e.target.value)}
        >
          <option value="">Select...</option>
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>

        {form.texture_modification === "YES" && (
          <>
            <label>Food Texture Level</label>
            <select
              style={input}
              value={form.texture_food}
              onChange={(e) => setField("texture_food", e.target.value)}
            >
              <option value="">Select...</option>
              <option value="3">Level 3 – Liquidised</option>
              <option value="4">Level 4 – Puréed</option>
              <option value="5">Level 5 – Soft & Bite Sized</option>
              <option value="6">Level 6 – Easy to Chew</option>
              <option value="7">Level 7 – Regular</option>
            </select>

            <label>Drink Texture Level</label>
            <select
              style={input}
              value={form.texture_drink}
              onChange={(e) => setField("texture_drink", e.target.value)}
            >
              <option value="">Select...</option>
              <option value="0">Level 0 – Thin</option>
              <option value="1">Level 1 – Slightly Thick</option>
              <option value="2">Level 2 – Mildly Thick</option>
              <option value="3">Level 3 – Moderately Thick</option>
              <option value="4">Level 4 – Extremely Thick</option>
            </select>

            <textarea
              style={textarea}
              placeholder="Additional texture notes..."
              value={form.texture_free_text}
              onChange={(e) => setField("texture_free_text", e.target.value)}
            />
          </>
        )}

        {/* Intake vs Requirement */}
        <label style={sectionLabel}>Intake vs Requirement</label>
        <select
          style={input}
          value={form.intake_vs_requirement}
          onChange={(e) => setField("intake_vs_requirement", e.target.value)}
        >
          <option value="">Select...</option>
          <option value="Adequate">Adequate</option>
          <option value="Inadequate">Inadequate</option>
          <option value="Excessive">Excessive</option>
          <option value="Not Relevant">Not Relevant</option>
        </select>

        <textarea
          style={textarea}
          placeholder="Explain intake vs requirement..."
          value={form.intake_vs_text}
          onChange={(e) => setField("intake_vs_text", e.target.value)}
        />

        {/* Registration Anthropometry (read only) */}
        <h4 style={{ marginTop: 18 }}>Anthropometry (Registration / Initial)</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <label>Weight (kg)</label>
            <input style={readonlyInput} value={regWeight || ""} readOnly />
          </div>
          <div>
            <label>Height (cm)</label>
            <input style={readonlyInput} value={regHeight || ""} readOnly />
          </div>
          <div>
            <label>BMI</label>
            <input style={readonlyInput} value={regBMI} readOnly />
          </div>
        </div>

        {/* ICF List */}
        <label style={{ marginTop: 18 }}>ICF List (auto-generated)</label>
        <textarea style={textarea} value={icfList.join(", ")} readOnly />
      </div>

      {/* -------------------- CURRENT ANTHROPOMETRY (EDITABLE) -------------------- */}
      <div className="card">
        <h3>Anthropometry (Current Follow-Up)</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div>
            <label>Current Weight (kg)</label>
            <input
              type="number"
              style={input}
              value={form.current_weight}
              onChange={(e) => setField("current_weight", e.target.value)}
            />
          </div>
          <div>
            <label>Current Height (cm)</label>
            <input
              type="number"
              style={input}
              value={form.current_height}
              onChange={(e) => setField("current_height", e.target.value)}
            />
          </div>
          <div>
            <label>Current BMI (Auto)</label>
            <input style={readonlyInput} value={currentBMI} readOnly />
          </div>
        </div>

        {/* Quick text comparison */}
        {regWeight && regHeight && currentBMI && (
          <div style={{ marginTop: 10, fontSize: 13 }}>
            <strong>Change from Initial:</strong>{" "}
            <span>
              ΔWeight ={" "}
              {(
                Number(form.current_weight || 0) - Number(regWeight || 0)
              ).toFixed(1)}{" "}
              kg, ΔBMI ={" "}
              {(
                Number(currentBMI || 0) - Number(regBMI || 0)
              ).toFixed(1)}
            </span>
          </div>
        )}
      </div>
      {/* -------------------- TREND ANALYSIS (OPTION C) -------------------- */}
{/* -------------------- TREND ANALYSIS (COMBINED GRAPH) -------------------- */}
<div className="card">
  <h3>Trend Analysis (Anthropometry)</h3>

  {trendData.length >= 2 ? (
    <div style={{ height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis yAxisId="left" label={{ value: "Weight (kg)", angle: -90, position: "insideLeft" }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: "BMI", angle: 90, position: "insideRight" }} />
          <Tooltip />
          <Legend />

          {/* WEIGHT LINE */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="weight"
            name="Weight (kg)"
            stroke="#0067ff"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

          {/* BMI LINE */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bmi"
            name="BMI"
            stroke="#ff7a00"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <p style={{ fontSize: 13, color: "#666" }}>
      Enter current weight and height to see trend compared with initial registration.
    </p>
  )}
</div>
      {/* -------------------- NUTRITION INTERVENTION -------------------- */}
      <div className="card">
        <h3>Nutrition Intervention</h3>

        <label>Nutrition Goals / Plan</label>
        <textarea
          style={textarea}
          value={form.nutrition_goal}
          onChange={(e) => setField("nutrition_goal", e.target.value)}
        />

        <label>ICHI Intervention</label>
        <textarea style={textarea} value={form.ichi_intervention} readOnly />

        <label>Type of Diet @ Diet Prescription</label>
        <input
          style={input}
          value={form.diet_prescription}
          onChange={(e) => setField("diet_prescription", e.target.value)}
        />

        <label>Education / Counselling</label>
        <textarea
          style={textarea}
          value={form.counselling}
          onChange={(e) => setField("counselling", e.target.value)}
        />

        {/* Monitoring Parameters */}
        <label style={sectionLabel}>Monitoring Parameters</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {monitoringOptions.map((opt) => (
            <label key={opt} style={{ display: "flex", gap: 6 }}>
              <input
                type="checkbox"
                checked={form.monitoring_params.includes(opt)}
                onChange={() => toggleMonitoringParam(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      {/* -------------------- MONITORING -------------------- */}
      <div className="card">
        <h3>Monitoring</h3>

        <label>Progress</label>
        <textarea
          style={textarea}
          value={form.progress}
          onChange={(e) => setField("progress", e.target.value)}
        />

        <label>Action</label>
        <textarea
          style={textarea}
          value={form.action}
          onChange={(e) => setField("action", e.target.value)}
        />

        <label>Next Review</label>
        <input
          style={input}
          type="date"
          value={form.next_review}
          onChange={(e) => setField("next_review", e.target.value)}
        />
      </div>




      {/* -------------------- PROGRESS TABLE -------------------- */}
      <div className="card">
        <h3>Patient Summary</h3>

<table style={{ width: "100%", borderCollapse: "collapse" }}>
  <thead>
    <tr style={{ background: "#0b6685", color: "white" }}>
      <th style={{ padding: 10 }}>Time</th>
      <th style={{ padding: 10 }}>Assessment</th>
      <th style={{ padding: 10 }}>ICF</th>
      <th style={{ padding: 10 }}>ICHI</th>
      <th style={{ padding: 10 }}>Actions</th>
    </tr>
  </thead>

  <tbody>
    {/* ---- ROW 1 ---- */}
    <tr>
      <td style={{ padding: 10 }}>4/12/2025, 11:24:43 am</td>
      <td style={{ padding: 10 }}>MST</td>
      <td style={{ padding: 10 }}>b440</td>
      <td style={{ padding: 10, whiteSpace: "pre-wrap" }}>
        PZA.AB.ZZ - Whole-body measurement, ATI.AN.ZZ - Interview in relation to energy 
        & drive functions, SMF.AN.ZZ - Interview in relation to eating, SDG.AN.ZZ - 
        Interview in relation to daily routine, PZA.DA.ZZ - Administering nutritional 
        requirements, UAB.DA.ZZ - Food modification, UAB.PM.ZZ - Education about food, 
        KT2.PP.ZZ - Counselling for digestive system functions
      </td>
      <td style={{ padding: 10 }}>
        <button style={{ padding: "6px 12px", background: "#047bff", color: "white",
                         borderRadius: 6 }}>View</button>
      </td>
    </tr>

    {/* ---- ROW 2 ---- */}
    <tr>
      <td style={{ padding: 10 }}>4/12/2025, 11:30:01 am</td>
      <td style={{ padding: 10 }}>IA</td>
      <td style={{ padding: 10 }}>b510</td>
      <td style={{ padding: 10, whiteSpace: "pre-wrap" }}>
        KTC.AA.ZZ Assessment of swallowing, KTC.AC.ZZ Test of swallowing, KTC.AE.AD Video 
        endoscopic evaluation of swallowing, KTC.AM.ZZ Observation of swallowing, 
        KTC.AN.ZZ Interview in relation to swallowing, KTC.BA.BB Video fluoroscopy 
        to evaluate swallowing, KTC.PG.ZZ Assisting and leading exercise in relation 
        to swallowing, KTC.PH.ZZ Training about swallowing, KTC.PM.ZZ Education 
        about swallowing, KTC.PN.ZZ Advising about swallowing, KTC.RB.ZZ Practical 
        support with swallowing, KTC.RC.ZZ Emotional support in relation to swallowing, 
        KTC.SC.ZZ Facilitating swallowing
      </td>
      <td style={{ padding: 10 }}>
        <button style={{ padding: "6px 12px", background: "#047bff", color: "white",
                         borderRadius: 6 }}>View</button>
      </td>
    </tr>
  </tbody>
</table>

      </div>

      {/* SUBMIT BUTTON */}
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <button style={btnSubmit} onClick={handleSubmit}>
          Save Follow-Up →
        </button>
      </div>

      {/* CARD CSS */}
      <style jsx>{`
        .card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 25px;
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
}

/* ---------------------- Styles ---------------------- */

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: 6,
  border: "1px solid #ccc",
  marginBottom: 10,
};

const readonlyInput = {
  ...input,
  background: "#f1f1f1",
};

const textarea = {
  ...input,
  minHeight: 60,
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 10,
};

const th = {
  padding: 10,
  background: "#004e6b",
  color: "white",
  textAlign: "left",
};

const td = {
  padding: 10,
  borderBottom: "1px solid #ddd",
};

const sectionLabel = {
  fontWeight: 600,
  marginTop: 12,
  display: "block",
};

const btnBack = {
  padding: "8px 16px",
  background: "#444",
  color: "white",
  borderRadius: 6,
  cursor: "pointer",
  border: "none",
};

const btnSubmit = {
  padding: "12px 24px",
  background: "#0067ff",
  color: "white",
  borderRadius: 6,
  cursor: "pointer",
  border: "none",
  fontSize: 16,
};
