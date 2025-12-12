import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default function ICDInfinite({ onDeepestICDChange, onPathChange }) {
  const [levels, setLevels] = React.useState([
    { label: "Admission Level", options: [], value: "", disabled: false, parentKey: null },
    { label: "Level 2", options: [], value: "", disabled: true, parentKey: null },
    { label: "Level 3", options: [], value: "", disabled: true, parentKey: null },
    { label: "Level 4", options: [], value: "", disabled: true, parentKey: null },
    { label: "Level 5", options: [], value: "", disabled: true, parentKey: null }, // Add Level 5
  ]);
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState(""); // State for department selection

  const toTitleCase = (s = "") =>
    s
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .replace(/\b[a-z]/g, (c) => c.toUpperCase());

  React.useEffect(() => {
    (async () => {
      try {
        setBusy(true);
        setMsg("");
        const res = await api.get("/api/icd/roots/");
        setLevels((prev) => {
          const next = [...prev];
          next[0].options = res.data;
          next[0].disabled = false;
          for (let i = 1; i < next.length; i++) {
            next[i] = { ...next[i], options: [], value: "", disabled: true, parentKey: null };
          }
          return next;
        });
        onDeepestICDChange?.("");
        onPathChange?.([]);
      } catch (err) {
        setMsg(`Failed to load ICD root data: ${err.message}`);
      } finally {
        setBusy(false);
      }
    })();
  }, []);

  const ensureLevel = (idx) => {
    setLevels((prev) => {
      if (idx < prev.length) return prev;
      const extra = Array.from({ length: idx - prev.length + 1 }, (_, j) => ({
        label: `Level ${prev.length + j + 1}`,
        options: [],
        value: "",
        disabled: true,
        parentKey: null,
      }));
      return [...prev, ...extra];
    });
  };

  const computePath = (lvls) =>
    lvls
      .map((L, depth) => {
        if (!L.value) return null;
        const opt = L.options.find((o) => o.key === L.value);
        return { depth, key: L.value, label: opt?.label || L.value };
      })
      .filter(Boolean);

  const deepestSelected = (lvls) => {
    for (let d = lvls.length - 1; d >= 0; d--) if (lvls[d].value) return lvls[d].value;
    return "";
  };

  const onPick = async (depth, value) => {
    setLevels((prev) => {
      const next = prev.map((x) => ({ ...x }));
      next[depth].value = value;
      for (let d = depth + 1; d < next.length; d++) {
        next[d] = { ...next[d], options: [], value: "", disabled: true, parentKey: null };
      }
      onDeepestICDChange?.(deepestSelected(next));
      onPathChange?.(computePath(next));
      return next;
    });

    if (!value) return;

    try {
      setBusy(true);
      setMsg("");
      const res = await api.get(`/api/icd/children/${encodeURIComponent(value)}/`);
      const children = res.data || [];
      if (!children.length) return;

      ensureLevel(depth + 1);
      setLevels((prev) => {
        const next = [...prev];
        const nextLvl = depth + 1;
        next[nextLvl] = {
          ...next[nextLvl],
          options: children,
          value: "",
          disabled: false,
          parentKey: value,
        };
        for (let d = nextLvl + 1; d < next.length; d++) {
          next[d] = { ...next[d], options: [], value: "", disabled: true, parentKey: null };
        }
        onDeepestICDChange?.(deepestSelected(next));
        onPathChange?.(computePath(next));
        return next;
      });
    } catch (err) {
      setMsg(`Failed to load ICD children: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  // Dummy list of departments (this can be fetched from your API)
  const departments = [
    { id: "1", name: "Cardiology" },
    { id: "2", name: "Neurology" },
    { id: "3", name: "Orthopedics" },
    { id: "4", name: "Pediatrics" },
    { id: "5", name: "Dermatology" },
  ];

  // Function to handle department assignment and show alert
  const handleAssignDepartment = () => {
    if (!selectedDepartment) {
      alert("Please select a department.");
      return;
    }

    // Find the department name based on the selected ID
    const department = departments.find((dept) => dept.id === selectedDepartment);

    // Show alert with a message like "Assigned to Neurophysics"
    alert(`Assigned to ${department?.name}`);

    // Clear the selected department after assignment
    setSelectedDepartment("");
  };

  return (
    <section className="card">
      <div className="cardheading">
        <h2 className="title">ICD Cascade</h2>
      </div>

      {levels.map((L, depth) => (
        <div key={depth} className="row" style={{ marginBottom: 8 }}>
          <div className="label">{L.label}</div>
          <select
            className="input"
            disabled={L.disabled}
            value={L.value}
            onChange={(e) => onPick(depth, e.target.value)}
          >
            <option value="">
              {L.disabled ? "— Disabled —" : `— Select from ${toTitleCase(L.label)} —`}
            </option>
            {L.options.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Show Assign to Department dropdown only after Level 5 */}
      {levels[4]?.value && (
        <div className="row" style={{ marginBottom: 8 }}>
          <div className="label">Assign to Department</div>
          <select
            className="input"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">— Select a Department —</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAssignDepartment}
            style={{
              marginLeft: "10px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "6px 14px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Assign Department
          </button>
        </div>
      )}

      {busy && <div className="note">Loading…</div>}
      {msg && <div className="note">{msg}</div>}
    </section>
  );
}
