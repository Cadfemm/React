import React, { useState, useEffect } from "react";
import "../styles/NurseLedSwallowScreen.css";

export default function NurseBaseAssessment() {
  const [form, setForm] = useState({
    alert: "",
    upright: "",
    voice: "",
    secretions: "",
    swallowDelayed: "",
    cough: "",
    choking: "",
    voiceChange: "",
    breathingChange: "",
    swallowDelayed2: "",
    cough2: "",
    choking2: "",
    voiceChange2: "",
    breathingChange2: "",
  });

  const [timestamp, setTimestamp] = useState({
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp({
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const [remarks, setRemarks] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (
      form.alert === "No" ||
      form.upright === "No" ||
      form.voice === "Yes" ||
      form.secretions === "Yes"
    ) {
      setForm((prev) => ({
        ...prev,
        swallowDelayed: "",
        cough: "",
        choking: "",
        voiceChange: "",
        breathingChange: "",
        swallowDelayed2: "",
        cough2: "",
        choking2: "",
        voiceChange2: "",
        breathingChange2: "",
      }));
    }
  }, [form.alert, form.upright, form.voice, form.secretions]);

  const getStopMessage = () => {
    if (form.alert === "No" || form.upright === "No")
      return "STOP ❌ — Record NIL BY MOUTH. Repeat daily until condition improves.";
    if (form.voice === "Yes" || form.secretions === "Yes")
      return "STOP ❌ — Record NIL BY MOUTH and refer to Speech & Language Therapy (SLT).";
    if (
      ["swallowDelayed", "cough", "choking", "voiceChange", "breathingChange"].some(
        (key) => form[key] === "Yes"
      )
    )
      return "STOP ❌ — Record NIL BY MOUTH and refer to SLT.";
    if (
      ["swallowDelayed2", "cough2", "choking2", "voiceChange2", "breathingChange2"].some(
        (key) => form[key] === "Yes"
      )
    )
      return "STOP ❌ — Record NIL BY MOUTH and refer to SLT.";

    if (
      form.alert === "Yes" &&
      form.upright === "Yes" &&
      form.voice === "No" &&
      form.secretions === "No"
    )
      return "✅ Patient safe to proceed to Water Swallow Test.";

    return "Proceeding...";
  };

  const renderYesNo = (field) => (
    <div className="yn-group">
      <label>
        <input
          type="radio"
          name={field}
          value="Yes"
          checked={form[field] === "Yes"}
          onChange={(e) => handleChange(field, e.target.value)}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name={field}
          value="No"
          checked={form[field] === "No"}
          onChange={(e) => handleChange(field, e.target.value)}
        />
        No
      </label>
    </div>
  );

  const showWaterTests =
    form.alert === "Yes" &&
    form.upright === "Yes" &&
    form.voice === "No" &&
    form.secretions === "No";

  const handleSave = () => {
    alert("✅ Swallow Screen Assessment saved successfully!");
    console.log("Assessment Data:", { form, timestamp });
  };

  return (
    <div className="swallow-form">
      <div className="header-tag">
        <h2 className="form-title">
          🩺 Patient Swallow Screen Protocol (Water Swallow Test)
        </h2>
        <span className="icf-tag">ICF: b510 — Ingestion functions</span>
      </div>

      {/* ========= PART 1 ========= */}
      <section className="form-section">
        <h3>Part 1 — Pre-Assessment Criteria</h3>

        <div className="question">
          <label>1️⃣ Is the patient consistently alert for 10 minutes?</label>
          {renderYesNo("alert")}
        </div>

        <div className="question">
          <label>2️⃣ Is the patient able to be supported in an upright position?</label>
          {renderYesNo("upright")}
        </div>

        <div className="question">
          <label>3️⃣ Does the patient have a hoarse, wet, weak, or absent voice?</label>
          {renderYesNo("voice")}
        </div>

        <div className="question">
          <label>4️⃣ Is the patient unable to manage their own oral secretions?</label>
          {renderYesNo("secretions")}
        </div>
      </section>

      {/* ========= CONDITIONAL PARTS ========= */}
      {showWaterTests && (
        <>
          <section className="form-section">
            <h3>Part 2 — Water Swallow Test (Teaspoon Trials ×3)</h3>
            {["swallowDelayed", "cough", "choking", "voiceChange", "breathingChange"].map(
              (key, idx) => (
                <div className="question" key={idx}>
                  <label>
                    {[
                      "No or delayed swallow?",
                      "Immediate or delayed coughing?",
                      "Choking?",
                      "Change in voice quality (ask to say “aaah”)?",
                      "Change in breathing pattern or increased breathlessness while sipping?",
                    ][idx]}
                  </label>
                  {renderYesNo(key)}
                </div>
              )
            )}
          </section>

          <section className="form-section">
            <h3>Part 3 — Controlled Glass Sips (≥3 sips)</h3>
            {[
              "swallowDelayed2",
              "cough2",
              "choking2",
              "voiceChange2",
              "breathingChange2",
            ].map((key, idx) => (
              <div className="question" key={idx}>
                <label>
                  {[
                    "No or delayed swallow?",
                    "Immediate or delayed coughing?",
                    "Choking?",
                    "Change in voice quality (ask to say “aaah”)?",
                    "Change in breathing pattern or increased breathlessness while sipping?",
                  ][idx]}
                </label>
                {renderYesNo(key)}
              </div>
            ))}
          </section>
        </>
      )}

      {/* ========= RESULT ========= */}
      <div className="remarks">
        <h4>📝 Result & Recommendation</h4>
        <p className={getStopMessage().startsWith("STOP") ? "stop-msg" : "ok-msg"}>
          {getStopMessage()}
        </p>
      </div>

      {/* ========= RECORD SUMMARY ========= */}
      <div className="summary-table">
        <h4>🧾 Record Summary</h4>
        <table>
          <tbody>
            <tr>
              <td>Initials</td>
              <td>
                <input
                  type="text"
                  placeholder="Enter"
                  onChange={(e) =>
                    setRemarks((r) => ({ ...r, initials: e.target.value }))
                  }
                />
              </td>
              <td>Time</td>
              <td>
                <input type="time" value={timestamp.time} readOnly />
              </td>
              <td>Date</td>
              <td>
                <input type="date" value={timestamp.date} readOnly />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="timestamp-note">
          ⏱️ Recorded automatically at {timestamp.date} {timestamp.time}
        </div>
      </div>

      {/* ========= SAVE BUTTON ========= */}
      <div className="save-button-wrapper">
        <button className="save-button" onClick={handleSave}>
          💾 Save Assessment
        </button>

                <button className="save-button" onClick={handleSave}>
          Assign to SLT
        </button>
      </div>
    </div>
  );
}
