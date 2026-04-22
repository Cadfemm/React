import React, { useMemo, useState, useRef, useEffect } from "react";
import Girls02 from "../../../assets/Girls0-2.png";
import Girls05 from "../../../assets/Girls0-5.png";
import Girls25 from "../../../assets/Girls2-5.png";
import Girls510 from "../../../assets/Girls5-10.png";
import Girls519 from "../../../assets/Girls5-19.png";
import Girls05w from "../../../assets/Girls0-5w.png";
import Girls05h from "../../../assets/Girls0-5h.png";
import Girls519h from "../../../assets/Girls5-19h.png";

import Boys02 from "../../../assets/Boys0-2.png";
import Boys05 from "../../../assets/Boys0-5.png";

import Boys25 from "../../../assets/Boys2-5.png";
import Boys510 from "../../../assets/Boys5-10.png";
import Boys519 from "../../../assets/Boys5-19.png";
import Boys05w from "../../../assets/Boys0-5w.png";
import Boys05h from "../../../assets/Boys0-5h.png";
import Boys519h from "../../../assets/Boys5-19h.png";

/* Percentile Options */
const PERCENTILE_OPTIONS = [
  { value: "3", label: "3rd" },
  { value: "15", label: "15th" },
  { value: "50", label: "50th" },
  { value: "85", label: "85th" },
  { value: "97", label: "97th" }
];

function getInterpretationFromPercentile(p) {
  if (!p) return "";
  const val = Number(p);
  if (val < 3) return "Severe underweight";
  if (val >= 3 && val < 15) return "Underweight / At risk";
  if (val >= 15 && val <= 85) return "Normal growth";
  if (val > 85 && val <= 97) return "Overweight";
  return "Obese";
}

export default function GrowthChartAssessment({ patient, values = {}, onChange }) {
  const [showReferenceImages, setShowReferenceImages] = useState(false);
  const [markers, setMarkers] = useState({});
  const [activeInput, setActiveInput] = useState(null);
  const inputRefs = useRef({});

  const ageMonths = values.ageMonths || "";
  const weightKg = values.weightKg || "";
  const percentile = values.percentile || "";
  const interpretation = values.interpretation || "";

  const setValue = (name, value) => {
    if (typeof onChange === "function") onChange(name, value);
  };

  const genderValue = String(patient?.gender || patient?.sex || "").toLowerCase();
  const isFemale = genderValue.includes("female") || genderValue === "f";
  const ageYears = Number(patient?.age ?? 0);

  const referenceImages = useMemo(() => {
    const allFemale = [
      { src: Girls02, label: "Girls 0-2" },
      { src: Girls05, label: "Girls 0-5" },
      { src: Girls25, label: "Girls 2-5" },
      { src: Girls510, label: "Girls 5-10" },
      { src: Girls519, label: "Girls 5-19" },
      { src: Girls05w, label: "Girls 0-5 (Weight-for-age)" },
      { src: Girls05h, label: "Girls 0-5 (Height-for-age)" },
      { src: Girls519h, label: "Girls 5-19 (Height-for-age)" },
    ];
    const allMale = [
      { src: Boys02, label: "Boys 0-2" },
      { src: Boys05, label: "Boys 0-5" },
      { src: Boys25, label: "Boys 2-5" },
      { src: Boys510, label: "Boys 5-10" },
      { src: Boys519, label: "Boys 5-19" },
      { src: Boys05w, label: "Boys 0-5 (Weight-for-age)" },
      { src: Boys05h, label: "Boys 0-5 (Height-for-age)" },
      { src: Boys519h, label: "Boys 5-19 (Height-for-age)" },
    ];
    const pool = isFemale ? allFemale : allMale;
    if (!Number.isFinite(ageYears) || ageYears <= 0) return pool;
    if (ageYears <= 2) return pool.filter((i) => i.label.includes("0-2") || i.label.includes("0-5"));
    if (ageYears <= 5) return pool.filter((i) => i.label.includes("2-5") || i.label.includes("0-5"));
    if (ageYears <= 10) return pool.filter((i) => i.label.includes("5-10") || i.label.includes("5-19"));
    return pool.filter((i) => i.label.includes("5-19"));
  }, [isFemale, ageYears]);

  const addMarker = (imageLabel, x, y) => {
    setMarkers((prev) => {
      const current = prev[imageLabel] || [];
      return { ...prev, [imageLabel]: [...current, { x, y, value: "" }] };
    });
  };

  const removeMarker = (imageLabel, index) => {
    setMarkers((prev) => {
      const updated = [...(prev[imageLabel] || [])];
      updated.splice(index, 1);
      return { ...prev, [imageLabel]: updated };
    });
    if (activeInput?.imageLabel === imageLabel && activeInput.index === index) {
      setActiveInput(null);
    }
  };

  const updateMarkerValue = (imageLabel, index, value) => {
    setMarkers((prev) => {
      const updated = [...(prev[imageLabel] || [])];
      updated[index].value = value;
      return { ...prev, [imageLabel]: updated };
    });
  };

  useEffect(() => {
    if (activeInput) {
      const key = `${activeInput.imageLabel}-${activeInput.index}`;
      setTimeout(() => {
        inputRefs.current[key]?.focus();
      }, 0);
    }
  }, [activeInput]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>Growth Monitoring – Weight for Age</div>

      <div style={styles.inputCard}>
        <div style={styles.grid}>
          <Field label="Age (months)" value={ageMonths} onChange={(v) => setValue("ageMonths", v)} />
          <Field label="Weight (kg)" value={weightKg} onChange={(v) => setValue("weightKg", v)} />
          <div style={styles.field}>
            <label style={styles.label}>Percentile</label>
            <select
              style={styles.input}
              value={percentile || ""}
              onChange={(e) => {
                const val = e.target.value;
                setValue("percentile", val);
                setValue("interpretation", getInterpretationFromPercentile(val));
              }}
            >
              <option value="">Select percentile</option>
              {PERCENTILE_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Interpretation</label>
            <input
              style={{ ...styles.input, background: "#eef2ff", fontWeight: 600, color: "#1e3a8a" }}
              value={interpretation || ""}
              readOnly
            />
          </div>
        </div>
      </div>

           <div style={styles.graphCard}>
        <div style={styles.graphHeader}>
          WHO Child Growth Standards
        </div>
        <button type="button" onClick={() => setShowReferenceImages(true)} style={styles.referenceButton}>
          Reference Images
        </button>

        <div style={styles.caption}>
          Source: World Health Organization – Child Growth Standards
        </div>
      </div>

      {showReferenceImages && (
        <div style={styles.modalOverlay} onClick={() => setShowReferenceImages(false)}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>📈 Growth Chart Reference Images</div>
              <button type="button" onClick={() => setShowReferenceImages(false)} style={styles.closeButton}>
                ✕
              </button>
            </div>

            <div style={styles.modalContent}>
              {referenceImages.map((img) => {
                const currentMarkers = markers[img.label] || [];
                
                return (
                  <div key={img.label} style={styles.imageSection}>
                    <div style={styles.leftPanel}>
                      <div style={styles.imageTitle}>{img.label}</div>
                      <div style={styles.imageContainer}>
                        <img
                          src={img.src}
                          alt={img.label}
                          style={styles.modalImage}
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                            addMarker(img.label, x, y);
                          }}
                        />
                        {currentMarkers.map((m, idx) => (
                          <div
                            key={idx}
                            style={{
                              position: "absolute",
                              top: `${m.y}%`,
                              left: `${m.x}%`,
                              transform: "translate(-50%, -50%)",
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              background: activeInput?.imageLabel === img.label && activeInput.index === idx 
                                ? "#10b981" : "#ef4444",
                              border: "3px solid white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: 12,
                              cursor: "pointer",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                              zIndex: 10
                            }}
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setActiveInput({ imageLabel: img.label, index: idx }); 
                            }}
                          >
                            {idx + 1} {/* Marker number on image */}
                          </div>
                        ))}
                      </div>
                      <div style={styles.markerCount}>
                        {currentMarkers.length} marker{currentMarkers.length !== 1 ? 's' : ''}
                      </div>
                    </div>

                    <div style={styles.rightPanel}>
                      <div style={styles.inputsTitle}>
                        Measurements {currentMarkers.length > 0 && `(${currentMarkers.length})`}
                      </div>
                      <div style={styles.inputsContainer}>
                        {currentMarkers.length === 0 ? (
                          <div style={styles.noMarkersMsg}>👆 Click on the chart to add markers</div>
                        ) : (
                          currentMarkers.map((m, idx) => {
                            const key = `${img.label}-${idx}`;
                            return (
                              <div
                                key={idx}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 12,
                                  padding: "4px 6px",
                                  marginBottom: 2,
                                  
                                  borderRadius: 12,
                                 
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                }}
                                onClick={() => setActiveInput({ imageLabel: img.label, index: idx })}
                              >
                                {/* Plain number instead of circle */}
                                <span style={{ fontWeight: 600, minWidth: 18 }}>{idx + 1}.</span>
                                <input
                                  type="text"
                                  ref={(el) => (inputRefs.current[key] = el)}
                                  value={m.value}
                                  onChange={(e) => updateMarkerValue(img.label, idx, e.target.value)}
                                  placeholder={`Value`}
                                  style={styles.markerInput}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeMarker(img.label, idx);
                                  }}
                                  style={styles.removeBtn}
                                >
                                  ✕
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input style={styles.input} value={value || ""} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

// --- Styles ---
const styles = {
  container: { maxWidth: 1200, margin: "0 auto", padding: 24, fontFamily: "Inter, Arial, sans-serif", background: "#f8fafc" },
  header: { fontSize: 24, fontWeight: 700, color: "#1e293b", marginBottom: 24, textAlign: "center" },
  inputCard: { background: "#fff", borderRadius: 16, padding: 24, marginBottom: 24, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
  // grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 },
  grid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20
},
  field: { display: "flex", flexDirection: "column" },
  label: { fontSize: 14, fontWeight: 600, color: "#475569", marginBottom: 8 },
  input: { padding: "12px 16px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15, background: "#fff", transition: "border-color 0.2s ease" },
  graphCard: { background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "left" },
  graphHeader: { fontSize: 18, fontWeight: 600, marginBottom: 16, color: "#1e293b" },
  referenceButton: { padding: "12px 24px", borderRadius: 12, border: "none", background: "#3b82f6", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 15, boxShadow: "0 4px 12px rgba(59,130,246,0.3)" },
  caption: { marginTop: 12, fontSize: 13, color: "#64748b" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modalCard: { width: "95vw", maxWidth: 1400, maxHeight: "90vh", background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" },
  modalHeader: { padding: "24px 32px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: 700, color: "#1e293b" },
  closeButton: { padding: "10px 14px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#4d4b4a", cursor: "pointer", fontWeight: 600, fontSize: 16 },
  modalContent: { padding: 32, maxHeight: "calc(90vh - 100px)", overflowY: "auto" },
  imageSection: { display: "flex", gap: 32, marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid #f9f5f1" },
  leftPanel: { flex: 3, minWidth: 0 },
  rightPanel: { flex: 1, minWidth: 250 },
  imageTitle: { fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 16 },
  imageContainer: { position: "relative", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 25px rgba(0,0,0,0.1)" },
  modalImage: { width: "100%", height: 600, objectFit: "cover", cursor: "crosshair" },
  markerCount: { marginTop: 12, fontSize: 14, color: "#64748b", fontWeight: 500 },
  inputsTitle: { fontSize: 16, fontWeight: 600, color: "#1e293b", marginBottom: 16 },
  inputsContainer: { maxHeight: 420, overflowY: "auto" },
  noMarkersMsg: { padding: "40px 20px", textAlign: "center", color: "#64748b", fontSize: 15, background: "#f8fafc", borderRadius: 12, border: "2px dashed #cbd5e1" },
  markerInput: { flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 15 },
  removeBtn: { padding: "6px 10px", borderRadius: 8, border: "none", background: "#ef4444", color: "#fff", fontWeight: 600, cursor: "pointer" },
};