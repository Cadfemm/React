import React from "react";

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
  ageMonths,
  weightKg,
  percentile,
  interpretation,
  onChange,
}) {
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
            onChange={(v) => onChange("ageMonths", v)}
          />

          <Field
            label="Weight (kg)"
            value={weightKg}
            onChange={(v) => onChange("weightKg", v)}
          />

          {/* PERCENTILE DROPDOWN */}
          <div style={styles.field}>
            <label style={styles.label}>Percentile</label>
            <select
              style={styles.input}
              value={percentile || ""}
              onChange={(e) => {
                const val = e.target.value;
                onChange("percentile", val);
                onChange("interpretation", getInterpretationFromPercentile(val));
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
          WHO Child Growth Standards – Weight-for-Age (Girls, 0–5 years)
        </div>

        <img
          src="../../../five.png"
          alt="WHO Weight for Age Girls 0-5 years"
          style={styles.graphImage}
        />

        <div style={styles.caption}>
          Source: World Health Organization – Child Growth Standards
        </div>
      </div>
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
};
