import React, { useEffect, useState } from "react";

const API = "http://127.0.0.1:5000";

function BookedPatients() {
  const [patients, setPatients] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/patients/<pid>/assigned_doctors`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setPatients(data);
      } catch (e) {
        setMsg(`Failed to load booked patients: ${e.message}`);
      }
    })();
  }, []);

  return (
    <section className="card">
      <h2 className="title">Booked Patients List</h2>
      {msg && <div className="note">{msg}</div>}

      <table className="table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Department</th>
            <th>Appointment Date</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, i) => (
            <tr key={i}>
              <td>{p.patient_id}</td>
              <td>{p.patient_name}</td>
              <td>{p.doctor_name || "—"}</td>
              <td>{p.department || "—"}</td>
              <td>{p.appointment_date || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default BookedPatients;
