import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useHistory } from "react-router-dom";

const icfTrendData = [
  { month: "Apr", value: 65 },
  { month: "May", value: 59 },
  { month: "Jun", value: 80 },
  { month: "Jul", value: 81 },
  { month: "Aug", value: 56 },
  { month: "Sep", value: 55 },
];

const ICFTrendBarChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={icfTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis dataKey="month" tick={{ fill: "#475569" }} />
      <YAxis tick={{ fill: "#475569" }} />
      <Tooltip
        cursor={{ fill: "rgba(0,0,0,0.03)" }}
        contentStyle={{ background: "#ffffff", borderRadius: 8, border: "1px solid #e2e8f0" }}
      />
      <defs>
        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A3FAD" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.9} />
        </linearGradient>
      </defs>
      <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={45} fill="url(#barGradient)">
        <LabelList dataKey="value" position="top" fill="#334155" fontSize={13} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

const TherapistDashboard = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const history = useHistory();

  const styles = {
    dashboard: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      padding: "30px",
      backgroundColor: "#f8fafc",
      color: "#0f172a",
      minHeight: "100vh",
    },
    headerActions: { display: "flex", justifyContent: "flex-end", marginBottom: "15px" },
    newPatientBtn: {
      backgroundColor: "#3a3fad",
      color: "#fff",
      padding: "8px 18px",
      border: "none",
      borderRadius: "6px",
      fontWeight: 500,
      cursor: "pointer",
    },
    tabButtons: { display: "flex", gap: "10px", marginBottom: "25px" },
    tabBtn: (isActive) => ({
      backgroundColor: isActive ? "#3a3fad" : "#f1f5f9",
      color: isActive ? "#ffffff" : "#1e3a8a",
      border: `1px solid ${isActive ? "#3a3fad" : "#cbd5e1"}`,
      borderRadius: "6px",
      padding: "8px 18px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
    title: { fontSize: "1.4rem", fontWeight: 600, marginBottom: "20px", color: "#1e3a8a" },
    statsContainer: { display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "25px" },
    statCard: {
      flex: "1 1 180px",
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      padding: "15px 10px",
    },
    statTitle: { color: "#475569", fontSize: "0.9rem", fontWeight: 500 },
    statValue: { color: "#0f172a", fontSize: "1.4rem", fontWeight: 600, marginTop: "6px" },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "#ffffff",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      marginBottom: "25px",
    },
    th: {
      backgroundColor: "#f1f5f9",
      color: "#1e293b",
      fontWeight: 600,
      fontSize: "0.9rem",
      padding: "12px 16px",
      textAlign: "left",
    },
    td: { borderTop: "1px solid #f1f5f9", fontSize: "0.9rem", color: "#334155", padding: "12px 16px" },
    sectionHeader: { color: "#1e3a8a", marginTop: "25px", marginBottom: "10px", fontWeight: 600 },
  };

  const StatCard = ({ title, value }) => (
    <div style={styles.statCard}>
      <h3 style={styles.statTitle}>{title}</h3>
      <p style={styles.statValue}>{value}</p>
    </div>
  );

  // 📅 Table Data
  const scheduleData = [
    { time: "EP-0001", patient: "Neurorehab", episode: "d450", dept: "In Progress", status: "2025-10-10",next:"2025-10-21" },
    { time: "EP-0002", patient: "Hand Therapy", episode: "d445", dept: "Planned", status: "—",next:"2025-10-22" },
    { time: "EP-0003", patient: "Dysphagia", episode: "d550", dept: "Completed", status: "2025-09-29",next:"FU 2025-11-01" },
    { time: "EP-0004", patient: "Ortho Rehab", episode: "d410", dept: "In Progress", status: "2025-10-15",next:"2025-10-25" },
  ];

  const progressData = [
    { patient: "PT-001", episode: "EP-0001", start: 45, current: 70, change: "+25" },
    { patient: "PT-002", episode: "EP-0002", start: 50, current: 68, change: "+18" },
    { patient: "PT-003", episode: "EP-0003", start: 40, current: 85, change: "+45" },
    { patient: "PT-004", episode: "EP-0004", start: 55, current: 65, change: "+19" },
    { patient: "PT-005", episode: "EP-0005", start: 60, current: 75, change: "+15" },
  ];

  const docsData = [
    { id: "DOC-001", patient: "PT-001", type: "RAP Plan", status: "Pending", due: "2025-10-20" },
    { id: "DOC-002", patient: "PT-002", type: "Session Note", status: "Overdue", due: "2025-10-18" },
    { id: "DOC-003", patient: "PT-003", type: "Discharge Summary", status: "Completed", due: "2025-10-15" },
    { id: "DOC-004", patient: "PT-004", type: "Assessment", status: "Pending", due: "2025-10-22" },
  ];

  // 🧩 Reusable Table Renderer
  const RenderTable = ({ headers, rows, renderRow }) => (
    <table style={styles.table}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} style={styles.th}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows.map(renderRow)}</tbody>
    </table>
  );

  // 🗓 MySchedule Tab
  const MySchedule = () => (
    <div>
      <h2 style={styles.title}>My Schedule</h2>
      <div style={styles.statsContainer}>
        <StatCard title="New Episodes (30d)" value="92" />
        <StatCard title="Utilization" value="78%" />
        <StatCard title="ICF Improved %" value="69%" />
        <StatCard title="Protocol Adherence %" value="95%" />
        <StatCard title="Adverse Events %" value="0.5%" />
      </div>

      <h3 style={styles.sectionHeader}>Department Episodes</h3>
      <RenderTable
        headers={["Episode", "Spec", "ICF", "	Status", "Last Session","Next"]}
        rows={scheduleData}
        renderRow={(r, i) => (
          <tr key={i}>
            <td style={styles.td}>{r.time}</td>
            <td style={styles.td}>{r.patient}</td>
            <td style={styles.td}>{r.episode}</td>
            <td style={styles.td}>{r.dept}</td>
           
            <td style={{ ...styles.td, color: "#2563eb", fontWeight: 600 }}>{r.status}</td>
             <td style={styles.td}>{r.next}</td>
          </tr>
        )}
      />

      <h3 style={styles.sectionHeader}>ICF Improvement Trend (Monthly %)</h3>
      <ICFTrendBarChart />
    </div>
  );

  // 📈 Patient Progress Tab
  const PatientProgress = () => (
    <div>
      <h2 style={styles.title}>Patient Progress</h2>
      <div style={styles.statsContainer}>
        <StatCard title="Staff Utilization %" value="82%" />
        <StatCard title="Training Hours (30d)" value="150" />
        <StatCard title="Leave Requests Pending" value="7" />
        <StatCard title="Performance Score Avg" value="4.5/5" />
        <StatCard title="Staff Count" value="25" />
      </div>

      <h3 style={styles.sectionHeader}>Progress Details</h3>
      <RenderTable
        headers={["Patient", "Episode", "ICF Score Start", "Current", "Change"]}
        rows={progressData}
        renderRow={(r, i) => (
          <tr key={i}>
            <td style={styles.td}>{r.patient}</td>
            <td style={styles.td}>{r.episode}</td>
            <td style={styles.td}>{r.start}</td>
            <td style={styles.td}>{r.current}</td>
            <td style={{ ...styles.td, color: "#15803d", fontWeight: 600 }}>{r.change}</td>
          </tr>
        )}
      />

      <h3 style={styles.sectionHeader}>ICF Improvement Trend (Monthly %)</h3>
      <ICFTrendBarChart />
    </div>
  );

  // 🧾 Documentation Tab
  const Documentation = () => (
    <div>
      <h2 style={styles.title}>Documentation</h2>
      <div style={styles.statsContainer}>
        <StatCard title="Pending Signatures" value="5 (Urgent)" />
        <StatCard title="Completed Docs" value="18 (On Time)" />
        <StatCard title="Compliance Rate %" value="98%" />
        <StatCard title="Overdue Docs" value="2 (Action Needed)" />
        <StatCard title="Total Docs Handled" value="45 (Last 30d)" />
      </div>

      <h3 style={styles.sectionHeader}>Documentation List</h3>
      <RenderTable
        headers={["Doc ID", "Patient", "Type", "Status", "Due Date"]}
        rows={docsData}
        renderRow={(r, i) => (
          <tr key={i}>
            <td style={styles.td}>{r.id}</td>
            <td style={styles.td}>{r.patient}</td>
            <td style={styles.td}>{r.type}</td>
            <td style={{ ...styles.td, color: "#b45309", fontWeight: 600 }}>{r.status}</td>
            <td style={styles.td}>{r.due}</td>
          </tr>
        )}
      />

      <h3 style={styles.sectionHeader}>Documentation Compliance Trend (Monthly %)</h3>
      <ICFTrendBarChart />
    </div>
  );

  return (
    <div style={styles.dashboard}>


            <div style={{display:"flex", justifyContent:"flex-end", margin: "2px 12px"}}>
<button onClick={() => history.push("/menu/new")}
  className="btn topbtn" style={{padding: "5px 15px",marginBottom:15,
    backgroundColor: "#3A3FAD",
    color:" #fff",
    margin: "5px",}}>
  HOD New Patient
</button>
 
  <button onClick={() => history.push("/menu/existing")} className="btn topbtn" style={{padding: "5px 15px",marginBottom:15,
    backgroundColor: "#3A3FAD",
    color:" #fff",
    margin: "5px",}} >
  Existing Patient
</button>
 
 
 
  </div>

      <div style={styles.tabButtons}>
        {["schedule", "progress", "documentation"].map((tab) => (
          <button
            key={tab}
            style={styles.tabBtn(activeTab === tab)}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "schedule"
              ? "Overview"
              : tab === "progress"
              ? "Staff Performance"
              : "Reports"}
          </button>
        ))}
      </div>

      {activeTab === "schedule" && <MySchedule />}
      {activeTab === "progress" && <PatientProgress />}
      {activeTab === "documentation" && <Documentation />}
    </div>
  );
};

export default TherapistDashboard;
