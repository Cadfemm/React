import React, { useState } from "react";
import PatientDetails from "../components/PatientDetails";

export default function DepartmentPage({ patients = [], department }) {
  const [view, setView] = useState("dashboard"); // dashboard | patients | details
  const [selectedPatient, setSelectedPatient] = useState(null);

  /* ================= SAFETY GUARD ================= */
  if (!department) {
    return <div style={{ padding: 20 }}>Department not assigned</div>;
  }

  const departmentPatients = patients.filter(
    p => p.departments?.includes(department)
  );

  /* ================= PATIENT DETAILS ================= */
  if (view === "details" && selectedPatient) {
    return (
      <PatientDetails
        patient={selectedPatient}
        department={department}
        onBack={() => setView("patients")}
      />
    );
  }

  /* ================= PATIENT LIST ================= */
  if (view === "patients") {
    return (
      <div style={page}>
        <Header title="Patients List" onBack={() => setView("dashboard")} />

        {departmentPatients.length === 0 ? (
          <div style={muted}>No patients assigned</div>
        ) : (
          departmentPatients.map(p => (
            <div
              key={p.id}
              style={patientRow}
              onClick={() => {
                setSelectedPatient(p);
                setView("details");
              }}
            >
              <div style={{ fontWeight: 600 }}>{p.name}</div>
              <div style={muted}>ICD: {p.icd}</div>
            </div>
          ))
        )}
      </div>
    );
  }

  /* ================= DASHBOARD ================= */
  return (
    <div style={page}>

      {/* ================= HEADER ================= */}
      <div style={header}>
        <div>
          <h2 style={title}>Therapist Dashboard</h2>
          <div style={subtitle}>Rehabilitation EMR</div>
        </div>

        <div style={searchWrap}>
          <input placeholder="Search Patient" style={searchInput} />
          <div style={caseInfo}>
            <div><b>My Active Cases:</b> {departmentPatients.length}</div>
            <div><b>Scheduled Today:</b> 5</div>
          </div>
        </div>
      </div>

      {/* ================= GRID ================= */}
      <div style={grid}>

        {/* -------- APPOINTMENTS -------- */}
        <Card title="Today's Appointments">
          <Appointment time="09:00" name="John Lim" tag="PT" />
          <Appointment time="10:00" name="Amina B" tag="OT" />
          <Appointment time="11:00" name="Ravi K" tag="PT" />
          <div style={muted}>+ more</div>
        </Card>

        {/* -------- QUEUE -------- */}
        <Card title="Patient Queue">
          <div style={queueBox}>
            <div style={queueCount}>Waiting: 3 patients</div>
            <ul style={queueList}>
              <li>Farah A</li>
              <li>Mohd Razif</li>
              <li>Ong Wen</li>
            </ul>
          </div>
        </Card>

        {/* -------- TASKS -------- */}
        <Card title="My Tasks">
          <ul style={taskList}>
            <li>📝 3 Notes Pending</li>
            <li>📄 1 Progress Report Due</li>
          </ul>
        </Card>

        {/* -------- QUICK ACCESS -------- */}
        <Card title="Quick Access">
          <div style={moduleGrid}>
            <Module label="Patients List" onClick={() => setView("patients")} />
            <Module label="Tickets" />
            <Module label="Policies" />
            <Module label="360° View" />
            <Module label="Billing" />
            <Module label="Inventory" />
            <Module label="Prescription" />
            <Module label="My RAP" />
          </div>
        </Card>

      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Header({ title, onBack }) {
  return (
    <div style={headerRow}>
      <button onClick={onBack} style={backBtn}>← Back</button>
      <h3>{title}</h3>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div style={card}>
      <div style={cardTitle}>{title}</div>
      {children}
    </div>
  );
}

function Module({ label, onClick }) {
  return (
    <div style={moduleCard} onClick={onClick}>
      {label}
    </div>
  );
}

function Appointment({ time, name, tag }) {
  return (
    <div style={listItem}>
      <span>{time}</span>
      <span>{name}</span>
      <span style={tag === "PT" ? tagPT : tagOT}>{tag}</span>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: 24,
  fontFamily: "Inter, system-ui",
  background: "#f8fafc",
  minHeight: "100vh"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 24
};

const title = { margin: 0, fontSize: 22 };
const subtitle = { fontSize: 13, color: "#6b7280" };

const searchWrap = { display: "flex", gap: 16, alignItems: "center" };
const searchInput = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  width: 220
};

const caseInfo = { fontSize: 13 };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 20
};

const card = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 18,
  boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
};

const cardTitle = { fontWeight: 700, marginBottom: 12 };

const listItem = {
  display: "grid",
  gridTemplateColumns: "60px 1fr 50px",
  alignItems: "center",
  padding: "8px 0",
  fontSize: 14,
  borderBottom: "1px solid #f1f5f9"
};

const tagPT = {
  background: "#e0f2fe",
  color: "#0369a1",
  borderRadius: 999,
  fontSize: 12,
  padding: "2px 8px",
  textAlign: "center"
};

const tagOT = {
  background: "#fef3c7",
  color: "#92400e",
  borderRadius: 999,
  fontSize: 12,
  padding: "2px 8px",
  textAlign: "center"
};

const moduleGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 10
};

const moduleCard = {
  background: "#f1f5f9",
  padding: "12px 10px",
  borderRadius: 8,
  textAlign: "center",
  fontWeight: 600,
  fontSize: 13,
  cursor: "pointer"
};

const patientRow = {
  padding: 14,
  border: "1px solid #e5e7eb",
  background:"#fff",
  borderRadius: 8,
  marginBottom: 10,
  cursor: "pointer"
};

const muted = { fontSize: 12, color: "#9ca3af" };

const headerRow = { display: "flex", gap: 12, alignItems: "center" };
const backBtn = { background: "none", border: "none", cursor: "pointer", color: "#2563eb" };

const queueBox = { background: "#f9fafb", padding: 12, borderRadius: 8 };
const queueCount = { fontWeight: 600 };
const queueList = { paddingLeft: 18, fontSize: 14 };
const taskList = { paddingLeft: 18, fontSize: 14 };
