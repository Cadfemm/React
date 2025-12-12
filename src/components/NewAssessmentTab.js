import React from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000";
const api = axios.create({ baseURL: API });

function NewAssessmentTab({
  patientId,
  value,
  onChange,
  onSaved,
  icfOptions = [],
  ichiOptions = [],
  icdContext = "",
}) {
  const [form, setForm] = React.useState(
    value || { subjective: "", objective: "", assessment: "", plan: "", goals: [] }
  );
  const NOTE_MAX = 2000;
  const [recordingField, setRecordingField] = React.useState(null);

  const startListening = (field) => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => setRecordingField(field);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setForm((prev) => ({
        ...prev,
        [field]: prev[field] + " " + transcript,
      }));
      setRecordingField(null);
    };

    recognition.onerror = () => setRecordingField(null);
    recognition.onend = () => setRecordingField(null);
    recognition.start();
  };

  const micStyle = (isActive) => ({
    position: "absolute",
    right: "10px",
    bottom: "10px",
    background: "none",
    border: "none",
    color: isActive ? "#ef4444" : "#3b82f6",
    cursor: "pointer",
    fontSize: "1.2rem",
    transition: "0.2s ease",
  });

  return (
    <section
      className="card"
      style={{
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="soap-head"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div className="soap-title" style={{ fontSize: "1.3rem", fontWeight: 600 }}>
          Initial Assessment — <b>SOAP</b>
        </div>
        <span
          className="chip soft"
          style={{
            background: "#e2e8f0",
            padding: "4px 12px",
            borderRadius: "20px",
            color: "#334155",
          }}
        >
          Clinical
        </span>
      </div>

      <div
        className="soap-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {["subjective", "objective", "assessment", "plan"].map((field) => (
          <div
            key={field}
            style={{
              position: "relative",
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: "8px",
                color: "#1e3a8a",
                textTransform: "capitalize",
              }}
            >
              {field}
            </div>

            <textarea
              rows={5}
              maxLength={NOTE_MAX}
              placeholder={
                field === "subjective"
                  ? "Patient complaint / history…"
                  : field === "objective"
                  ? "Exam findings, vitals, measurements…"
                  : field === "assessment"
                  ? "Diagnosis / clinical impression…"
                  : "ICHI, education, reviews, follow-up…"
              }
              value={form[field]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [field]: e.target.value }))
              }
              style={{
                resize: "none",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "10px 35px 10px 10px", // space for icon
                fontSize: "0.9rem",
                color: "#334155",
                backgroundColor: "#fff",
                outline: "none",
              }}
            />

            {/* 🎤 Mic icon */}
            <button
              onClick={() => startListening(field)}
              title="Voice input"
              style={micStyle(recordingField === field)}
            >
              <i className="fa fa-microphone"></i>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewAssessmentTab;
