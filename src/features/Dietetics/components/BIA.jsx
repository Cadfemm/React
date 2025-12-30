import React from "react";

/* ======================================================
   MAIN COMPONENT
====================================================== */
export default function BIA({ data = {}, onChange }) {
  const set = (k, v) => onChange?.({ ...data, [k]: v });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Body Composition Assessment (SECA mBCA)</h2>

      {/* ================= PDF REPORT UPLOAD ================= */}
      <Card title="Attached SECA / Body Composition Report">
        <label style={styles.label}>
          Upload SECA mBCA PDF Report
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => set("uploadedReport", e.target.files?.[0] || null)}
          style={styles.fileInput}
        />
        {data.uploadedReport && (
          <div style={styles.filePreview}>
            📄 {data.uploadedReport.name}
          </div>
        )}
      </Card>

      {/* ================= ANTHROPOMETRY ================= */}
      <Card title="Anthropometry">
        <Grid>
          <Input label="Weight (kg)" value={data.weight} onChange={(v) => set("weight", v)} />
          <Input label="Height (cm)" value={data.height} onChange={(v) => set("height", v)} />
          <Input label="BMI (kg/m²)" value={data.bmi} onChange={(v) => set("bmi", v)} />
        </Grid>
      </Card>

      {/* ================= FAT COMPOSITION ================= */}
      <Card title="Fat Composition">
        <Grid>
          <Input label="Fat Mass (kg)" value={data.fatMass} onChange={(v) => set("fatMass", v)} />
          <Input label="Fat Mass Percentage (FM%)" value={data.fatMassPercent} onChange={(v) => set("fatMassPercent", v)} />
          <Input label="Fat Mass Index (FMI kg/m²)" value={data.fmi} onChange={(v) => set("fmi", v)} />
           <Input label="Fat Free Mass Index (FFMI kg/m²)" value={data.fmi} onChange={(v) => set("fmi", v)} />
            <Input label="Fat Free Mass (kg)" value={data.fmi} onChange={(v) => set("fmi", v)} />
          <Input label="Visceral Adipose Tissue (VAT L)" value={data.vat} onChange={(v) => set("vat", v)} />
          <Input label="Waist Circumference (cm)" value={data.waistCircumference} onChange={(v) => set("waistCircumference", v)} />
        </Grid>
      </Card>

      {/* ================= MUSCLE COMPOSITION ================= */}
      <Card title="Muscle Composition">
        <Grid>
          <Input label="Skeletal Muscle Mass (SMM kg)" value={data.smm} onChange={(v) => set("smm", v)} />
          <Input label="Skeletal Muscle Mass Percentage(%)" value={data.smmPercent} onChange={(v) => set("smmPercent", v)} />
          <Input label="Skeletal Muscle Index by MRI (SMI kg/m²)" value={data.smi} onChange={(v) => set("smi", v)} />
          <Input label="Skeletal Muscle Mss Over Age (SMM)" value={data.smi} onChange={(v) => set("smi", v)} />
          <Input label="Phase Angle (PhA)" value={data.smi} onChange={(v) => set("smi", v)} />
          <Input label="Appendicular Skeletal Muscle Mass (kg)" value={data.appendicularSmm} onChange={(v) => set("appendicularSmm", v)} />
          <Input label="Appendicular Skeletal Muscle Index by DXA - ASMI (kg/m²)" value={data.asmi} onChange={(v) => set("asmi", v)} />
        </Grid>
      </Card>

      {/* ================= WATER BALANCE ================= */}
      <Card title="Water Balance">
        <Grid>
          <Input label="Total Body Water (TBW %)" value={data.tbwPercent} onChange={(v) => set("tbwPercent", v)} />
          <Input label="Extracellular Water (ECW %)" value={data.ecwPercent} onChange={(v) => set("ecwPercent", v)} />
          <Input label="Water Ratio (ECW/TBW%)" value={data.ecwTbwRatio} onChange={(v) => set("ecwTbwRatio", v)} />
        </Grid>
      </Card>

      {/* ================= PHASE ANGLE ================= */}
      <Card title="Segmental Skeletal Muscle Mass">
        <Grid>
          <Input label="Right Arm (kg)" value={data.phaseAngle} onChange={(v) => set("phaseAngle", v)} />
          <Input label="Left Arm (kg)" value={data.phaseAnglePercentile} onChange={(v) => set("phaseAnglePercentile", v)} />
          <Input label="Torso (kg)" value={data.resistance} onChange={(v) => set("resistance", v)} />
          <Input label="Right leg (kg)" value={data.reactance} onChange={(v) => set("reactance", v)} />
          <Input label="Left leg (kg)" value={data.reactance} onChange={(v) => set("reactance", v)} />
                    <Input label="Total Skeletal Muscle Mass(kg)" value={data.reactance} onChange={(v) => set("reactance", v)} />
        </Grid>
      </Card>

      <Card title="Bioelectrical Impedance Vector Analysis - BIVA">
        <Grid>
          <Input label="Resistance" value={data.phaseAngle} onChange={(v) => set("phaseAngle", v)} />
          <Input label="Reactance:" value={data.phaseAnglePercentile} onChange={(v) => set("phaseAnglePercentile", v)} />
        </Grid>
      </Card>


      {/* ================= ENERGY EXPENDITURE ================= */}
      <Card title="Energy Expenditure">
        <Grid>
          <Input label="Resting Energy Expenditure-REE (kcal/day)" value={data.ree} onChange={(v) => set("ree", v)} />
          <Input label="Total Energy Expenditure-TEE (kcal/day)" value={data.tee} onChange={(v) => set("tee", v)} />
          <Input label="Energy expenditure - REE / TEE" value={data.tee} onChange={(v) => set("tee", v)} />
          <Input label="Physical Activity Level (PAL)" value={data.pal} onChange={(v) => set("pal", v)} />
        </Grid>
      </Card>

      {/* ================= TRU BODY SCORE ================= */}
      <Card title="TRU Body Score">
        <Grid>
          <Input label="Muscle Score" value={data.muscleScore} onChange={(v) => set("muscleScore", v)} />
          <Input label="Fat Score" value={data.fatScore} onChange={(v) => set("fatScore", v)} />
          <Input label="Overall TRU Body Score" value={data.truBodyScore} onChange={(v) => set("truBodyScore", v)} />

        </Grid>
      </Card>


    </div>
  );
}

/* ======================================================
   REUSABLE COMPONENTS
====================================================== */

function Card({ title, children }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>{title}</div>
      <div style={styles.cardBody}>{children}</div>
    </div>
  );
}

function Grid({ children }) {
  return <div style={styles.grid}>{children}</div>;
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <input
        style={styles.input}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <textarea
        style={styles.textarea}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* ======================================================
   STYLES
====================================================== */

const styles = {
  container: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: 24,
    fontFamily: "Inter, Arial, sans-serif",
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 20,
    color: "#0F172A",
  },
  card: {
    background: "#fff",
    borderRadius: 10,
    marginBottom: 18,
    border: "1px solid #e2e8f0",
  },
  cardHeader: {
    padding: "12px 16px",
    fontWeight: 700,
    fontSize: 15,
    background: "#eef2ff",
    borderBottom: "1px solid #e2e8f0",
    color: "#0F172A",
  },
  cardBody: {
    padding: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 4,
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #cbd5e1",
    fontSize: 14,
  },
  textarea: {
    width: "100%",
    minHeight: 90,
    padding: 12,
    borderRadius: 6,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    marginBottom: 12,
  },
  fileInput: {
    width: "100%",
    padding: 10,
    border: "1px dashed #94a3b8",
    borderRadius: 6,
    background: "#f8fafc",
  },
  filePreview: {
    marginTop: 8,
    fontSize: 13,
    color: "#0F172A",
  },
};
