import React, { useEffect, useState } from "react";

export default function PatientsToDepartments({ setTab }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("/patients_icd_existing")
      .then((res) => res.json())
      .then(setRows)
      .catch((err) => console.error("Error loading ICD list", err));
  }, []);

  const handleView = (id) => {
    alert(`✅ Patient ID ${id} viewed.`);
    setTab("ICD"); // 🔥 Switch to ICD tab after clicking View
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Existing Patients Data
      </h2>

      <div
        style={{
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead
            style={{
              backgroundColor: "#374151",
              color: "white",
              textAlign: "left",
            }}
          >
            <tr>
              <th style={{ padding: "12px 16px", width: "80px" }}>ID</th>
              <th style={{ padding: "12px 16px" }}>Main ICD</th>
              <th style={{ padding: "12px 16px" }}>ICD Code</th>
              <th style={{ padding: "12px 16px", textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "16px" }}>
                  No patient records found
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr
                  key={r.id}
                  style={{
                    backgroundColor: i % 2 === 0 ? "#f9fafb" : "#ffffff",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <td style={{ padding: "12px 16px" }}>{r.id}</td>
                  <td style={{ padding: "12px 16px" }}>{r.main_icd}</td>
                  <td style={{ padding: "12px 16px" }}>{r.icd_code}</td>
                  <td style={{ textAlign: "center", padding: "12px 16px" }}>
                    <button
                      onClick={() => handleView(r.id)}
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 14px",
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
