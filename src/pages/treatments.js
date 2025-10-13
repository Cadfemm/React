import React, { useState, useEffect } from "react";
import axios from "axios";

// Use a base URL so every request hits Django on :8000
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export default function IcdDropdown() {
  const [level1, setLevel1] = useState([]);
  const [level2, setLevel2] = useState([]);
  const [level3, setLevel3] = useState([]);
  const [level4, setLevel4] = useState([]);

  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");
  const [selected3, setSelected3] = useState("");

// Load Level 1 (parents)
useEffect(() => {
  api.get("/api/icd/roots/")
    .then((res) => setLevel1(res.data))
    .catch((err) => console.error("Level 1 error:", err));
}, []);

// Load children dynamically
useEffect(() => {
  if (selected1) {
    api.get(`/api/icd/children/${selected1}/`)
      .then((res) => setLevel2(res.data))
      .catch((err) => console.error("Level 2 error:", err));
  }
}, [selected1]);

useEffect(() => {
  if (selected2) {
    api.get(`/api/icd/children/${selected2}/`)
      .then((res) => setLevel3(res.data))
      .catch((err) => console.error("Level 3 error:", err));
  }
}, [selected2]);

useEffect(() => {
  if (selected3) {
    api.get(`/api/icd/children/${selected3}/`)
      .then((res) => setLevel4(res.data))
      .catch((err) => console.error("Level 4 error:", err));
  }
}, [selected3]);



  return (
    <div style={{ display: "flex", gap: 8 }}>
      {/* Level 1 */}
<select value={selected1} onChange={(e) => setSelected1(e.target.value)}>
  <option value="">-- Select from Level 1 --</option>
  {level1.map((item) => (
    <option key={item.key} value={item.key}>
      {item.label}
    </option>
  ))}
</select>

{/* Level 2 */}
<select
  value={selected2}
  onChange={(e) => setSelected2(e.target.value)}
  disabled={!level2.length}
>
  <option value="">-- Select from Level 2 --</option>
  {level2.map((item) => (
    <option key={item.key} value={item.key}>
      {item.label}
    </option>
  ))}
</select>

{/* Level 3 */}
<select
  value={selected3}
  onChange={(e) => setSelected3(e.target.value)}
  disabled={!level3.length}
>
  <option value="">-- Select from Level 3 --</option>
  {level3.map((item) => (
    <option key={item.key} value={item.key}>
      {item.label}
    </option>
  ))}
</select>

{/* Level 4 */}
<select disabled={!level4.length}>
  <option value="">-- Select from Level 4 --</option>
  {level4.map((item) => (
    <option key={item.key} value={item.key}>
      {item.label}
    </option>
  ))}
</select>

    </div>
  );
}
