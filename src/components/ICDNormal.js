import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default function ICDNormal({ onDeepestICDChange, onPathChange }) {
  const [levels, setLevels] = React.useState([
    { label: "Admission Level", options: [], value: "", disabled: false, parentKey: null },
    { label: "Level 2", options: [], value: "", disabled: true, parentKey: null },
    { label: "Level 3", options: [], value: "", disabled: true, parentKey: null },
    { label: "Level 4", options: [], value: "", disabled: true, parentKey: null },
  ]);

  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const departments = [
    "Neurology",
    "Orthopedics",
    "Cardiology",
    "Physiotherapy",
    "Occupational Therapy",
    "Psychiatry",
  ];

  const doctors = [
    "Dr. Asha Menon",
    "Dr. Rajesh Kumar",
    "Dr. Priya Sharma",
    "Dr. Anil Verma",
    "Dr. Kavitha Rao",
  ];

  const toTitleCase = (s = "") =>
    s
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .replace(/\b[a-z]/g, (c) => c.toUpperCase());

  // Load Level 1
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

  const lastSelectedICD = deepestSelected(levels);

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

      {/* --- New Section: Assign Department and Doctor --- */}
      {lastSelectedICD && (
        <div
          className="assign-section"
          style={{
            marginTop: "20px",
            padding: "15px",
            borderTop: "1px solid #ddd",
            background: "#fafafa",
            borderRadius: "8px",
          }}
        >
          <div style={{ marginBottom: "10px", fontWeight: "bold", color: "#333" }}>
            Assign Department & Doctor
          </div>

          <div className="row" style={{ marginBottom: 10 }}>
            <div className="label" style={{ width: "160px" }}>
              Assign Department
            </div>
            <select
              className="input"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">— Select Department —</option>
              {departments.map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="label" style={{ width: "160px" }}>
              Assign Doctor
            </div>
            <select
              className="input"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">— Select Doctor —</option>
              {doctors.map((doc, i) => (
                <option key={i} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {busy && <div className="note">Loading…</div>}
      {msg && <div className="note">{msg}</div>}
    </section>
  );
}
