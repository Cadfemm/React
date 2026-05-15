import React, { useMemo, useState } from "react";

const SECTION_TABS = [
  "Overview",
  "Departments",
  "Assessments",
  "Goals",
  "Therapy Sessions",
  "Lab Reports",
  "Imaging",
  "Devices & Data",
  "Timeline",
  "Notes",
];

function Pill({ children }) {
  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: 999,
        background: "#eef6ff",
        border: "1px solid #cfe1ff",
        color: "#000332",
        fontWeight: 600,
        fontSize: 12,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function Card({ title, children }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e6eef7",
        borderRadius: 12,
        padding: 14,
      }}
    >
      {title && (
        <div style={{ fontWeight: 800, fontSize: 14, color: "#0f172a", marginBottom: 10 }}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

function Table({ columns, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                style={{
                  textAlign: "left",
                  padding: "10px 8px",
                  background: "#f7fafc",
                  borderBottom: "1px solid #eef3fb",
                  color: "#334155",
                  fontWeight: 800,
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
              {r.map((cell, idx) => (
                <td key={idx} style={{ padding: "10px 8px", color: "#334155" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function RAPCaseDashboardView() {
  const [activeTab, setActiveTab] = useState("Overview");

  const patient = useMemo(
    () => ({
      name: "Mr. Arvind Kumar",
      patientId: "RAP-2024-000145",
      diagnosis: "Stroke (L hemiparesis)",
      ageGender: "67Y / Male",
      admissionDate: "12 Mar 2024",
      rehabStage: "Sub-Acute",
      status: "Improving",
      nextReview: "28 May 2024",
      primaryPhysician: "Dr. Rajiv Mehta",
    }),
    []
  );

  const kpis = useMemo(
    () => [
      { label: "Departments Involved", value: "5", sub: "View all" },
      { label: "Goals", value: "12", sub: "All" },
      { label: "Assessments", value: "18", sub: "All" },
      { label: "Therapy Sessions", value: "24", sub: "View all" },
      { label: "Lab Reports", value: "7", sub: "View all" },
      { label: "Alerts", value: "2", sub: "View all" },
    ],
    []
  );

  const overview = (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card title="Progress Overview">
          <div style={{ height: 10, border: "1px solid #dbe6f3", borderRadius: 999, background: "#eef2ff", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "68%", background: "#3A3FAD" }} />
          </div>
          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", color: "#0f172a", fontWeight: 800 }}>
            <span>Overall Progress</span>
            <span>68%</span>
          </div>
          <div style={{ marginTop: 10, color: "#64748b", fontSize: 12 }}>
            Mobility · Strength · Function
          </div>
        </Card>

        <Card title="Therapy Session Summary">
          <Table
            columns={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            rows={[
              ["07", "04", "07", "08", "09", "11", "12"],
              ["4", "6", "4", "3", "2", "1", "0"],
            ]}
          />
          <div style={{ marginTop: 10, color: "#64748b", fontSize: 12 }}>Today’s sessions (approx.)</div>
        </Card>
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        <Card title="Goals (Department Wise)">
          <Table
            columns={["Department", "Goal", "Progress"]}
            rows={[
              ["Physiotherapy", "Improve gait and balance to walk 100 meters", "70%"],
              ["Occupational Therapy", "Improve clarity and safety for daily activities", "65%"],
              ["Speech Therapy", "Improve speech clarity and communication", "60%"],
              ["Neurology", "Reduce spasticity and improve motor control", "80%"],
            ]}
          />
        </Card>

        <Card title="Recent Assessments">
          <Table
            columns={["Assessment", "Date", "Status"]}
            rows={[
              ["Complete Blood Count (CBC)", "06 May 2024", "Normal"],
              ["Blood Sugar (Fasting)", "05 May 2024", "Normal"],
              ["Vitamin D", "02 May 2024", "Low"],
            ]}
          />
        </Card>
      </div>
    </div>
  );

  const departments = (
    <Table
      columns={["Department", "Lead Clinician", "Last Activity", "Status"]}
      rows={[
        ["Physiotherapy", "Dr. Sneha Kapoor", "Today, 10:30 AM", "Active"],
        ["Occupational Therapy", "Dr. Pooja Singh", "Today, 09:15 AM", "Active"],
        ["Neurology", "Dr. Rajiv Mehta", "Yesterday, 04:45 PM", "Active"],
        ["Speech Therapy", "Dr. Meena Joshi", "Yesterday, 11:30 AM", "Active"],
      ]}
    />
  );

  const assessments = (
    <Table
      columns={["Assessment", "Department", "Date", "Score/Result"]}
      rows={[
        ["Fugl-Meyer Assessment", "Physiotherapy", "07 May 2024", "45 / 66"],
        ["Barthel Index", "Occupational Therapy", "06 May 2024", "65 / 100"],
        ["Modified Ashworth Scale", "Neurology", "05 May 2024", "2 / 4"],
        ["10 Meter Walk Test", "Physiotherapy", "03 May 2024", "0.65 m/s"],
      ]}
    />
  );

  const goals = (
    <Table
      columns={["Department", "Goal", "Target Date", "Progress", "Status"]}
      rows={[
        ["Physiotherapy", "Walk with cane for 100 meters", "30 May 2024", "70%", "In Progress"],
        ["Occupational Therapy", "Independent dressing", "15 Jun 2024", "60%", "In Progress"],
        ["Speech Therapy", "Sentence fluency", "30 Jun 2024", "40%", "In Progress"],
        ["Neurology", "Reduce spasticity grade", "25 May 2024", "80%", "On Track"],
      ]}
    />
  );

  const sessions = (
    <Table
      columns={["Date & Time", "Department", "Session Type", "Therapist", "Status"]}
      rows={[
        ["07 May 2024, 09:00", "Physiotherapy", "Gait Training", "Dr. Sneha Kapoor", "Completed"],
        ["07 May 2024, 11:00", "Occupational Therapy", "Hand Function", "Dr. Pooja Singh", "Completed"],
        ["07 May 2024, 14:00", "Speech Therapy", "Speech & Language", "Dr. Meena Joshi", "Completed"],
        ["07 May 2024, 16:00", "Physiotherapy", "Balance Training", "Dr. Sneha Kapoor", "Scheduled"],
      ]}
    />
  );

  const labReports = (
    <Table
      columns={["Test", "Date", "Result", "Reference"]}
      rows={[
        ["Complete Blood Count (CBC)", "06 May 2024", "Normal", "Normal range"],
        ["Blood Sugar (Fasting)", "05 May 2024", "Normal", "Normal range"],
        ["Vitamin D", "02 May 2024", "Low", "30-100 ng/mL"],
        ["Lipid Profile", "01 May 2024", "Normal", "Normal range"],
      ]}
    />
  );

  const imaging = (
    <Table
      columns={["Imaging", "Date", "Findings", "Status"]}
      rows={[
        ["MRI Brain", "03 May 2024", "Old ischemic changes", "Reviewed"],
        ["X-Ray Shoulder", "01 May 2024", "No acute findings", "Reviewed"],
      ]}
    />
  );

  const devices = (
    <Table
      columns={["Device", "Metric", "Last Sync", "Status"]}
      rows={[
        ["Gait Sensor", "Step symmetry 0.82", "Today, 08:10 AM", "Connected"],
        ["Grip Dynamometer", "Right hand 14kg", "Today, 08:30 AM", "Connected"],
        ["ROM Tracker", "Shoulder flexion 110°", "Yesterday, 05:10 PM", "Connected"],
      ]}
    />
  );

  const timeline = (
    <Table
      columns={["Date", "Event", "Owner"]}
      rows={[
        ["12 Mar 2024", "Admitted to RAP program", "Care Team"],
        ["15 Mar 2024", "Initial multidisciplinary assessment complete", "Doctor"],
        ["20 Apr 2024", "Interim review and goals reset", "Rehab Team"],
        ["07 May 2024", "Current status marked improving", "Primary Physician"],
      ]}
    />
  );

  const notes = (
    <Table
      columns={["Date", "Author", "Note", "Visibility"]}
      rows={[
        ["07 May 2024", "Dr. Rajiv Mehta", "Continue progressive gait training this week.", "Internal"],
        ["06 May 2024", "Dr. Pooja Singh", "UE hand coordination improving; ADL tasks now assisted.", "Internal"],
        ["05 May 2024", "Dr. Meena Joshi", "Speech clarity improved with pacing cues.", "Shared"],
      ]}
    />
  );

  const tabContent = () => {
    switch (activeTab) {
      case "Overview":
        return overview;
      case "Departments":
        return departments;
      case "Assessments":
        return assessments;
      case "Goals":
        return goals;
      case "Therapy Sessions":
        return sessions;
      case "Lab Reports":
        return labReports;
      case "Imaging":
        return imaging;
      case "Devices & Data":
        return devices;
      case "Timeline":
        return timeline;
      case "Notes":
        return notes;
      default:
        return overview;
    }
  };

  return (
    <div
      style={{
        padding: 14,
     
        minHeight: "100%",
        height: "100%",
        overflowY: "auto",
        color: "#0f172a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
        
          padding: "8px 0 10px",
          fontWeight: 900,
          color: "#2563eb",
          borderBottom: "2px solid #e6eef7",
        }}
      >
        RAP Case Dashboard View Loaded
      </div>
      {/* Patient header */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e6eef7",
          borderRadius: 14,
          padding: 14,
          display: "flex",
          gap: 14,
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "#0f172a",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontWeight: 900,
            }}
          >
            AK
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a" }}>{patient.name}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>
              Patient ID <b>{patient.patientId}</b>
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{patient.ageGender}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{patient.diagnosis}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{`Admission Date: ${patient.admissionDate}`}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <Pill>{`Rehab Stage\n${patient.rehabStage}`}</Pill>
          <Pill>{`Current Status\n${patient.status}`}</Pill>
          <Pill>{`Next Review\n${patient.nextReview}`}</Pill>
          <Pill>{`Primary Physician\n${patient.primaryPhysician}`}</Pill>
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 12 }}>
        {kpis.map((k) => (
          <div
            key={k.label}
            style={{
              background: "#fff",
              border: "1px solid #e6eef7",
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>{k.label}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginTop: 2 }}>{k.value}</div>
            <div style={{ fontSize: 12, color: "#2563eb", marginTop: 2 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 10, borderBottom: "2px solid #e6eef7", marginBottom: 12 }}>
        {SECTION_TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveTab(t)}
            style={{
              flexShrink: 0,
              padding: "10px 14px",
              borderRadius: 10,
              border: activeTab === t ? "2px solid #2563eb" : "1px solid rgba(255,255,255,0)",
              background: activeTab === t ? "#2563eb" : "transparent",
              color: activeTab === t ? "#fff" : "#000",
              fontWeight: 800,
              cursor: "pointer",
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>{tabContent()}</div>
    </div>
  );
}

