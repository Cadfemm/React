import React from "react";

export default function PsychologyDashboard({ 
  patients = [], 
  onSelectPatient, 
  onOpenPatients, 
  onOpenFollowUps 
}) {

  const total = patients.length;
  const pending = patients.filter(p => !p.psychologyInitialDone).length;
  const completed = patients.filter(p => p.psychologyInitialDone).length;

  return (
    <div style={{ padding: 20, fontFamily: "Segoe UI, sans-serif" }}>

      {/* HEADER */}
      <h2 style={{ marginBottom: 10, color: "#0047ab" }}>
        Psychology Department Dashboard
      </h2>

      {/* METRIC CARDS */}
      <div style={{
        display: "flex",
        gap: 20,
        marginBottom: 25,
        flexWrap: "wrap"
      }}>
        {[
          { label: "Total Patients", value: total, color: "#0047ab" },
          { label: "Pending Assessments", value: pending, color: "#d9534f" },
          { label: "Completed Assessments", value: completed, color: "#5cb85c" }
        ].map((c, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 200px",
              padding: 20,
              borderRadius: 10,
              background: "#fff",
              border: "1px solid #ddd",
              boxShadow: "0 0 8px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ fontSize: 32, fontWeight: "bold", color: c.color }}>
              {c.value}
            </div>
            <div style={{ fontSize: 15, marginTop: 5 }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div style={{
        display: "flex",
        gap: 10,
        marginBottom: 25,
        flexWrap: "wrap"
      }}>
        <button
          onClick={onOpenPatients}
          style={{
            padding: "10px 20px",
            background: "#0047ab",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          View Patients
        </button>

        <button
          onClick={onOpenFollowUps}
          style={{
            padding: "10px 20px",
            background: "#5cb85c",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Follow-Up List
        </button>

        <button
          style={{
            padding: "10px 20px",
            background: "#f0ad4e",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          ICF / ICHI Mapping
        </button>
      </div>

      {/* RECENT PATIENTS */}
      <div style={{
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 10,
        background: "#fff",
        boxShadow: "0 0 8px rgba(0,0,0,0.05)",
        marginBottom: 25
      }}>
        <h3 style={{ margin: 0, marginBottom: 15 }}>Recent Patients</h3>
        {patients.slice(0, 5).map(p => (
          <div
            key={p.id}
            onClick={() => onSelectPatient(p)}
            style={{
              padding: 12,
              borderBottom: "1px solid #eee",
              cursor: "pointer"
            }}
          >
            <b>{p.name}</b> — {p.icd}
          </div>
        ))}
        {patients.length === 0 && <p>No patients assigned.</p>}
      </div>

      {/* RECENT ASSESSMENTS */}
      <div style={{
        border: "1px solid #ddd",
        padding: 20,
        borderRadius: 10,
        background: "#fff",
        boxShadow: "0 0 8px rgba(0,0,0,0.05)"
      }}>
        <h3 style={{ margin: 0, marginBottom: 15 }}>Recent Assessments</h3>
        {patients
          .filter(p => p.psychologyInitialDone)
          .slice(0, 5)
          .map(p => (
            <div
              key={p.id}
              style={{
                padding: 12,
                borderBottom: "1px solid #eee"
              }}
            >
              <b>{p.name}</b> — Assessment Completed
            </div>
          ))}

        {patients.filter(p => p.psychologyInitialDone).length === 0 && (
          <p>No completed assessments.</p>
        )}
      </div>

    </div>
  );
}
