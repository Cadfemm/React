import React, { useMemo, useState } from "react";
import Girls02 from "../../../assets/Girls0-2.png";
import Girls25 from "../../../assets/Girls2-5.png";
import Girls510 from "../../../assets/Girls5-10.png";
import Girls519 from "../../../assets/Girls5-19.png";
import Girls05w from "../../../assets/Girls0-5w.png";
import Girls05 from "../../../assets/Girls0-5.png";
import Girls05h from "../../../assets/Girls0-5h.png";
import Girls519h from "../../../assets/Girls5-19h.png";
import Boys02 from "../../../assets/Boys0-2.png";
import Boys25 from "../../../assets/Boys2-5.png";
import Boys510 from "../../../assets/Boys5-10.png";
import Boys519 from "../../../assets/Boys5-19.png";
import Boys05w from "../../../assets/Boys0-5w.png";
import Boys05 from "../../../assets/Boys0-5.png";
import Boys05h from "../../../assets/Boys0-5h.png";
import Boys519h from "../../../assets/Boys5-19h.png";

/* ===================== PERCENTILE OPTIONS ===================== */

const PERCENTILE_OPTIONS = [
  { value: "3", label: "3rd" },
  { value: "15", label: "15th" },
  { value: "50", label: "50th" },
  { value: "85", label: "85th" },
  { value: "97", label: "97th" }
];

/* ===================== INTERPRETATION LOGIC ===================== */

function getInterpretationFromPercentile(p) {
  if (!p) return "";
  const val = Number(p);

  if (val < 3) return "Severe underweight";
  if (val >= 3 && val < 15) return "Underweight / At risk";
  if (val >= 15 && val <= 85) return "Normal growth";
  if (val > 85 && val <= 97) return "Overweight";
  return "Obese";
}

/**
 * Props:
 * - ageMonths
 * - weightKg
 * - percentile
 * - interpretation
 * - onChange(field, value)
 */
export default function GrowthChartAssessment({
  ageMonths: ageMonthsProp,
  weightKg: weightKgProp,
  percentile: percentileProp,
  interpretation: interpretationProp,
  onChange,
  values = {},
  patient,
}) {
  const [showReferenceImages, setShowReferenceImages] = useState(false);

  const ageMonths = values.ageMonths ?? ageMonthsProp ?? "";
  const weightKg = values.weightKg ?? weightKgProp ?? "";
  const percentile = values.percentile ?? percentileProp ?? "";
  const interpretation = values.interpretation ?? interpretationProp ?? "";

  const setValue = (name, value) => {
    if (typeof onChange === "function") {
      onChange(name, value);
    }
  };

  const genderValue = String(patient?.gender || patient?.sex || "").toLowerCase();
  const isFemale = genderValue.includes("female") || genderValue === "f";
  const ageYears = Number(patient?.age ?? 0);

  const referenceImages = useMemo(() => {
    const allFemale = [
      { src: Girls02, label: "Girls 0-2" },
      { src: Girls25, label: "Girls 2-5" },
      { src: Girls510, label: "Girls 5-10" },
      { src: Girls519, label: "Girls 5-19" },
      { src: Girls05w, label: "Girls 0-5 (Weight-for-age)" },
      { src: Girls05, label: "Girls 0-5" },
      { src: Girls05h, label: "Girls 0-5 (Height-for-age)" },
      { src: Girls519h, label: "Girls 5-19 (Height-for-age)" },
    ];
    const allMale = [
      { src: Boys02, label: "Boys 0-2" },
      { src: Boys25, label: "Boys 2-5" },
      { src: Boys510, label: "Boys 5-10" },
      { src: Boys519, label: "Boys 5-19" },
      { src: Boys05w, label: "Boys 0-5 (Weight-for-age)" },
      { src: Boys05, label: "Boys 0-5" },
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

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        Growth Monitoring – Weight for Age (Girls)
      </div>

      {/* INPUT CARD */}
      <div style={styles.inputCard}>
        <div style={styles.grid}>
          <Field
            label="Age (months)"
            value={ageMonths}
            onChange={(v) => setValue("ageMonths", v)}
          />

          <Field
            label="Weight (kg)"
            value={weightKg}
            onChange={(v) => setValue("weightKg", v)}
          />

          {/* PERCENTILE DROPDOWN */}
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
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* INTERPRETATION (READ ONLY) */}
          <div style={styles.field}>
            <label style={styles.label}>Interpretation</label>
            <input
              style={{
                ...styles.input,
                background: "#eef2ff",
                fontWeight: 600,
                color: "#1e3a8a",
              }}
              value={interpretation || ""}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* GRAPH CARD */}
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
              <div style={{ fontWeight: 700 }}>Growth Chart Reference Images</div>
              <button type="button" onClick={() => setShowReferenceImages(false)} style={styles.closeButton}>Close</button>
            </div>
            <div style={styles.modalBody}>
              {referenceImages.map((img) => (
                <div key={img.label} style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>{img.label}</div>
                  <img src={img.src} alt={img.label} style={styles.modalImage} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== SMALL FIELD COMPONENT ===================== */

function Field({ label, value, onChange }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input
        style={styles.input}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* ===================== STYLES (HOSPITAL EMR LOOK) ===================== */

const styles = {
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 24,
    fontFamily: "Inter, Arial, sans-serif",
    background: "#f4f6fb",
  },

  header: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0c3161",
    marginBottom: 16,
  },

  inputCard: {
    background: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
  },

  field: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#334155",
    marginBottom: 6,
  },

  input: {
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    background: "#f9fafb",
  },

  graphCard: {
    background: "#ffffff",
    borderRadius: 10,
    padding: 16,
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  graphHeader: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 12,
    color: "#0f172a",
  },
  referenceButton: {
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #1d4ed8",
    background: "#1d4ed8",
    color: "#ffffff",
    cursor: "pointer",
    marginBottom: 12,
    fontWeight: 600,
  },

  graphImage: {
    width: "100%",
    borderRadius: 6,
    border: "1px solid #ddd",
  },

  caption: {
    marginTop: 8,
    fontSize: 12,
    color: "#64748b",
    textAlign: "right",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.45)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    width: "min(1000px, 96vw)",
    maxHeight: "90vh",
    overflow: "auto",
    background: "#fff",
    borderRadius: 10,
    padding: 14,
    border: "1px solid #e2e8f0",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  closeButton: {
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    cursor: "pointer",
  },
  modalBody: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 8,
  },
  modalImage: {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: 6,
  },
};
