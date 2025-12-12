import React, { useState, useEffect } from "react";
import axios from "axios";
 
const API = "http://127.0.0.1:5000"; // backend base URL
 
const api = axios.create({
  baseURL: API,
});
 
function ICFTab({ icdCode, onSummaryChange, onSelectICF }) {
  const [groups, setGroups] = useState({});
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Store selected patient ID
  const [personal, setPersonal] = useState({
    name: "",
    age: "",
    // Add other fields for the new patient
  });
  const [patient, setPatient] = useState({ patient_id: null }); // Store patient ID
 
  const [active, setActive] = useState("");
  const [childOpts, setChildOpts] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [doctorSel, setDoctorSel] = useState({});
  const [childSel, setChildSel] = useState({});
  const [qualOpts, setQualOpts] = useState({});
  const [qualSel, setQualSel] = useState({});
  const [scoreSel, setScoreSel] = useState({});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
 
  const order = ["PT", "OT", "Neuropsych", "Other", "Uncategorized"];
 
  const getJSON = async (u) => {
    const r = await fetch(u);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  };
 
  // ✅ Load doctors dynamically based on department
  const loadDoctors = async (department) => {
    if (!department) return;
    try {
      const r = await fetch(`${API}/doctors_list?department=${encodeURIComponent(department)}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const rows = await r.json();
      setDoctors(rows || []);
    } catch (e) {
      setMsg(`Failed to load doctors for ${department}: ${e.message}`);
    }
  };
 
const handleAssignDoctor = async (doctorName, department) => {
    let pid = selectedPatientId; // patientId passed here
 
    // If patient is not already created, create patient first
    if (!pid) {
      const r = await fetch(`${API}/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personal), // 'personal' contains the patient data
      });
 
      if (!r.ok) {
        throw new Error(`Personal create failed (${r.status})`);
      }
 
      const out = await r.json();
      pid = out.patient_id;  // Get the generated patient_id
      setPatient((p) => ({ ...p, patient_id: pid })); // Update the patient state with new patient_id
      setSelectedPatientId(pid); // Update the selected patient ID state
    }
 
    // Check if selectedPatientId is valid before proceeding with doctor assignment
    if (!pid) {
        setMsg("Patient creation failed, please try again.");
        return;
    }
 
    // Now assign the doctor using the newly fetched patient_id
    try {
      const res = await fetch(`${API}/patients/${pid}/assign_doctor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctor_name: doctorName, department: department}),
      });
 
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const msg = await res.json();
      console.log("✅", msg);
      alert("Doctor assigned successfully!");
    } catch (e) {
      console.error("Booking failed:", e.message);
    }
};
 
 
  // Parse numeric range (no change)
  const rangeToNumbers = (rangeStr) => {
    if (!rangeStr) return [];
    const s = (rangeStr || "").trim().replace(/^0+/, (m) => (m === "0" ? "0" : ""));
    const m = s.match(/^(\d+)\s*-\s*(\d+)$/);
    if (!m) return [];
    const lo = parseInt(m[1], 10);
    const hi = parseInt(m[2], 10);
    if (isNaN(lo) || isNaN(hi) || lo > hi) return [];
    const out = [];
    for (let n = lo; n <= hi; n++) out.push(n);
    return out;
  };
 
  // Load grouped parent ICFs
// Load grouped parent ICFs
  useEffect(() => {
    setGroups({});
    setActive("");
    setChildOpts({});
    setChildSel({});
    setQualOpts({});
    setQualSel({});
    setScoreSel({});
    setMsg("");
    onSummaryChange?.([]);
    onSelectICF?.("");
    if (!icdCode) {
      setMsg("Pick an ICD first in the ICD tab.");
      return;
    }
 
    (async () => {
      try {
        setBusy(true);
        const d = await getJSON(`${API}/map/icdcode-to-icf/${encodeURIComponent(icdCode)}/grouped`);
        const allGroups = d.groups || {};
        
        // 🔹 Filter to show only Neurophysics (or Neuropsych)
        const filtered = {};
        if (allGroups["Neuropsych"]) {
          filtered["Neuropsych"] = allGroups["Neuropsych"];
        }
        if (allGroups["Neurophysics"]) {
          filtered["Neurophysics"] = allGroups["Neurophysics"];
        }
        
        const keys = Object.keys(filtered);
        setGroups(filtered);
        setActive(keys[0] || "");
        if (keys[0]) loadDoctors(keys[0]); // 🔹 Load doctors for first dept
      } catch (e) {
        setMsg(`Failed to load ICF: ${e.message}`);
      } finally {
        setBusy(false);
      }
    })();
  }, [icdCode]);
 
  // Load child ICFs
  const loadChildren = async (parentCode) => {
    if (childOpts[parentCode]) return;
    try {
      const rows = await getJSON(`${API}/icf/children/${encodeURIComponent(parentCode)}`);
      setChildOpts((prev) => ({ ...prev, [parentCode]: rows }));
    } catch (e) {
      setMsg(`Failed to load child ICFs for ${parentCode}: ${e.message}`);
    }
  };
 
  // Handle department tab switch
  const handleDepartmentChange = (dept) => {
    setActive(dept);
    loadDoctors(dept); // 🔹 Change doctor list per department
  };
 
  const chooseChild = async (parentCode, childCode) => {
    setChildSel((prev) => ({ ...prev, [parentCode]: childCode }));
    onSelectICF?.(childCode || "");
    setQualSel((prev) => ({ ...prev, [childCode]: "" }));
    const updatedScores = { ...scoreSel };
    Object.keys(updatedScores).forEach((k) => {
      if (k.startsWith(childCode + "|")) delete updatedScores[k];
    });
    setScoreSel(updatedScores);
    if (!childCode) {
      emitSummary();
      return;
    }
    try {
      const rows = await getJSON(`${API}/icf/qualifiers/${encodeURIComponent(childCode)}`);
      setQualOpts((prev) => ({ ...prev, [childCode]: rows }));
      setQualSel((prev) => ({ ...prev, [childCode]: rows[0]?.key || "" }));
      const firstRange = rows[0]?.range || "";
      const nums = rangeToNumbers(firstRange);
      if (nums.length)
        setScoreSel((s) => ({ ...s, [childCode + "|" + rows[0].key]: nums[0] }));
    } catch (e) {
      setMsg(`Failed to load qualifiers for ${childCode}: ${e.message}`);
    }
  };
 
  const chooseQualifier = (childCode, qualId, qualRange) => {
    setQualSel((prev) => ({ ...prev, [childCode]: qualId }));
    const key = `${childCode}|${qualId}`;
    const nums = rangeToNumbers(qualRange);
    setScoreSel((prev) => {
      const clone = { ...prev };
      Object.keys(clone).forEach((k) => {
        if (k.startsWith(childCode + "|")) delete clone[k];
      });
      if (nums.length) clone[key] = nums[0];
      return clone;
    });
  };
 
  // Build & emit summary (unchanged)
  const emitSummary = () => {
    const out = [];
    Object.values(groups)
      .flat()
      .forEach((parent) => {
        const parent_icf = parent.icf_code;
        const parent_name = parent.name;
        const childCode = childSel[parent_icf] || "";
        if (!childCode) return;
        const childLabel =
          (childOpts[parent_icf] || []).find((x) => x.key === childCode)?.label || childCode;
        const qid = qualSel[childCode] || "";
        const qrec = (qualOpts[childCode] || []).find((x) => x.key === qid);
        const qualifier_label = qrec?.label || qid;
        const range = qrec?.range || "";
        const score = scoreSel[`${childCode}|${qid}`];
        const assigned_doctor = doctorSel[active] || "";
        out.push({
          parent_icf,
          parent_name,
          child_icf: childCode,
          child_name: childLabel,
          qualifier_id: qid,
          qualifier_label,
          range,
          score,
          assigned_doctor,
        });
      });
    onSummaryChange?.(out);
  };
 
  useEffect(() => {
    emitSummary();
  }, [groups, childOpts, childSel, qualOpts, qualSel, scoreSel, doctorSel, active]);
 
  const keys = Object.keys(groups).sort(
    (a, b) =>
      (order.indexOf(a) === -1
        ? 99
        : order.indexOf(b) === -1
        ? 99
        : order.indexOf(a) - order.indexOf(b)) || a.localeCompare(b)
  );
 
  return (
    <section className="card">
      {/* 🔹 Department Tabs */}
      <div className="buttonbar" style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {keys.map((k) => (
          <button
            key={k}
            className={`btn ${active === k ? "active" : ""}`}
            onClick={() => handleDepartmentChange(k)}
            disabled={busy}
          >
            {k} ({groups[k]?.length || 0})
          </button>
        ))}
      </div>
 
      <div className="cardheading">
        <h2 className="title">ICF</h2>
        <p className="subtitle">
          ICD selected: <strong>{icdCode || "—"}</strong>
        </p>
      </div>
 
      {msg && <div className="note">{msg}</div>}
 
      {/* Your ICF mapping logic */}
      {(groups[active] || []).map((p) => {
        const parentCode = p.icf_code;
        const childList = childOpts[parentCode] || [];
        const chosenChild = childSel[parentCode] || "";
        const rangeList = chosenChild ? qualOpts[chosenChild] || [] : [];
        const chosenQual = chosenChild ? qualSel[chosenChild] || "" : "";
        const selectedRangeObj = rangeList.find((r) => r.key === chosenQual);
        const selectedRangeStr = selectedRangeObj?.range || "";
        const nums = (() => {
          if (!selectedRangeStr) return [];
          const m = selectedRangeStr.match(/^(\d+)\s*-\s*(\d+)$/);
          if (!m) return [];
          const lo = parseInt(m[1], 10),
            hi = parseInt(m[2], 10);
          return Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
        })();
        const scoreKey = `${chosenChild}|${chosenQual}`;
        const chosenScore = scoreSel[scoreKey] ?? "";
 
        return (
          <div key={parentCode} className="row" style={{ alignItems: "center" }}>
            <div className="label">
              {parentCode} — {p.name}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <select
                className="input"
                onFocus={() => loadChildren(parentCode)}
                value={chosenChild}
                onChange={(e) => chooseChild(parentCode, e.target.value)}
                style={{ minWidth: 280 }}
              >
                <option value="">
                  {childList.length ? "— Choose Child ICF —" : "— Loading / None —"}
                </option>
                {childList.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
 
              <select
                className="input"
                disabled={!chosenChild || !rangeList.length}
                value={chosenQual}
                onChange={(e) => {
                  const newQual = e.target.value;
                  const ro = rangeList.find((r) => r.key === newQual);
                  chooseQualifier(chosenChild, newQual, ro?.range || "");
                }}
                style={{ minWidth: 280 }}
              >
                <option value="">
                  {rangeList.length ? "— Choose Range —" : "— No Ranges —"}
                </option>
                {rangeList.map((r) => (
                  <option key={r.key} value={r.key}>
                    {r.label}
                    {r.range ? ` (${r.range})` : ""}
                  </option>
                ))}
              </select>
 
              {nums.length > 0 && (
                <>
                  <div className="pill">
                    Range: <strong>{selectedRangeStr}</strong>
                  </div>
                  <select
                    className="input"
                    value={chosenScore}
                    onChange={(e) =>
                      setScoreSel((prev) => ({
                        ...prev,
                        [scoreKey]: Number(e.target.value),
                      }))
                    }
                    style={{ minWidth: 120 }}
                  >
                    {nums.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>
        );
      })}
 
      {/* ✅ Assign To button and dropdown ONCE per department */}
      {/* {active && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <button
            type="button"
            className="btn"
            onClick={() => loadDoctors(active)}
            style={{ background: "#eef", border: "1px solid #99f" }}
          >
            Assign To ({active})
          </button>
          <select
            className="input"
            value={doctorSel[active] || ""}
            onChange={(e) => {
              const doctorName = e.target.value;
              setDoctorSel((prev) => ({ ...prev, [active]: doctorName }));
              handleAssignDoctor(selectedPatientId, doctorName, active); // <-- call the POST
            }}
            style={{ minWidth: 220 }}
          >
            <option value="">— Select Doctor —</option>
            {doctors.map((d) => (
              <option key={d.id || d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      )} */}
 
      {/* ✅ Show Booked Patients Table below ICF */}
 
    </section>
  );
}
 
export default ICFTab;