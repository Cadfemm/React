import React, { useState, useMemo } from "react";

export default function DoctorsDashboard({
  patients = [],
  onSelectPatient,         // when user clicks a patient card
  onOpenPatients,          // NAV: PATIENTS
  onOpenAppointments       // NAV: APPOINTMENTS
}) {
  const [search, setSearch] = useState("");
  const [selectedDropdown, setSelectedDropdown] = useState("");

  // --------- BASIC STATS FROM PATIENTS ----------
  const totalPatients = patients.length;

  const uniqueICDs = useMemo(
    () => new Set(patients.map(p => p.icd).filter(Boolean)).size,
    [patients]
  );

  const avgAge = useMemo(() => {
    const ages = patients
      .map(p => Number(p.age))
      .filter(v => !Number.isNaN(v));
    if (!ages.length) return "-";
    const sum = ages.reduce((a, b) => a + b, 0);
    return (sum / ages.length).toFixed(1);
  }, [patients]);

  // Use id as timestamp for “recent” (you used Date.now() as id)
const recentPatients = useMemo(
  () =>
    [...patients].sort((a, b) => (b.id || 0) - (a.id || 0)),
  [patients]
);


const filteredPatients = useMemo(() => {
  if (!search.trim()) return patients;
  const q = search.toLowerCase();
  return patients.filter(
    p =>
      p.name?.toLowerCase().includes(q) ||
      p.icd?.toLowerCase().includes(q)
  );
}, [patients, search]);


  // Dropdown options (from your excel sheet)
  const dropdownOptions = [
    "Total Active Patients",
    "New Admissions",
    "Upcoming Appointments",
    "Private Payers",
    "Others"
  ];

  return (
    <div style={{ padding: 20 }}>
      {/* HEADER */}
      <header style={{ marginBottom: 24 }}>
      </header>

      {/* NAVIGATION TILES */}
      <section style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: 14
          }}
        >
          {navItems(onOpenPatients, onOpenAppointments).map(tile => (
            <button
              key={tile.label}
              onClick={tile.onClick}
              style={{
                padding: "14px 10px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "#fafafa",
                cursor: tile.onClick ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                gap: 8,
                justifyContent: "flex-start",
                fontWeight: 500
              }}
            >
              <span style={{ fontSize: 20 }}>{tile.icon}</span>
              <span style={{ color: "#0050ff"}}>{tile.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* DROPDOWN SELECTION */}
      <section style={{ marginBottom: 32 }}>
        <h3>Select a Metric</h3>
        <select
          value={selectedDropdown}
          onChange={e => setSelectedDropdown(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            width: "100%"
          }}
        >
          <option value="">Select Metric</option>
          {dropdownOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </section>

      {/* STATS CARDS */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 12 }}>Dashboard Summary</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 16
          }}
        >
          <StatCard title="Total Patients" value={totalPatients} icon="👥" />
          <StatCard title="Unique ICDs" value={uniqueICDs} icon="📂" />
          <StatCard title="Average Age" value={avgAge} icon="📊" />
          <StatCard title="Diet Plans (placeholder)" value="—" icon="🍽️" />
        </div>
      </section>

      {/* RECENT / QUICK PATIENT ACCESS */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10
          }}
        >
          <h3 style={{ margin: 0 }}>Recent Patients</h3>
          <input
            placeholder="Search by name or ICD…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #ccc",
              minWidth: 220
            }}
          />
        </div>

        {filteredPatients.length === 0 ? (
          <p style={{ color: "#888", marginTop: 8 }}>No matching patients.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 10,
              marginTop: 6
            }}
          >
            {filteredPatients.map(p => (
              <div
                key={p.id}
                onClick={() => onSelectPatient && onSelectPatient(p)}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4
                }}
              >
                <strong>{p.name}</strong>
                <span style={{ fontSize: 13, color: "#555" }}>
                  ICD: {p.icd || "-"}
                </span>
                <span style={{ fontSize: 13, color: "#777" }}>
                  Age: {p.age || "-"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ------------- helper components / data -------------

function StatCard({ title, value, icon }) {
  return (
    <div
      style={{
        padding: 14,
        background:
          "linear-gradient(135deg, rgba(0,123,255,0.04), rgba(0,0,0,0.02))",
        borderRadius: 12,
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 6
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontSize: 13, color: "#555 !important" }}>{title}</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: "bold", marginTop: 4 }}>
        {value}
      </div>
    </div>
  );
}

function navItems(onOpenPatients, onOpenAppointments) {
  return [
    { label: "HOME", icon: "🏠", onClick: null },
    { label: "PATIENTS", icon: "👤", onClick: onOpenPatients },
    { label: "APPOINTMENTS", icon: "📅", onClick: onOpenAppointments },
    { label: "CODING", icon: "💾", onClick: null },
    { label: "EDUCATION", icon: "📚", onClick: null },
    { label: "NUTRITION DIAGNOSIS", icon: "🧬", onClick: null },
    { label: "ASSESSMENTS", icon: "📝", onClick: null },
    { label: "OUTCOME MEASURES", icon: "📈", onClick: null },
    { label: "MEAL PLANNING", icon: "🍽️", onClick: null },
    { label: "INTERVENTIONS", icon: "🩺", onClick: null },
    { label: "FOLLOW-UP NOTES", icon: "🔁", onClick: null },
    { label: "REPORTS", icon: "📑", onClick: null }
  ];
}
