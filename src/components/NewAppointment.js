import React, { useState, useEffect } from "react";

export default function NewAppointment({ patientId }) {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Ratan", department: "Neurology" },
    { id: 2, name: "Dr. Meera Raghavan", department: "Cardiology" },
    { id: 3, name: "Dr. Madhavan", department: "Physical Therapy" },
    { id: 4, name: "Dr. Arvind Rao", department: "Occupational Therapy" },
    // Add more doctors as needed
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState(""); // Selected doctor
  const [department, setDepartment] = useState(""); // Selected department
  const [appointmentDate, setAppointmentDate] = useState(""); // Appointment date and time
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Confirmation message after booking
  const [loading, setLoading] = useState(false); // Loading state for button

  // Handle appointment booking
  const handleBookAppointment = () => {
    if (!selectedDoctor || !department || !appointmentDate) {
      alert("Please fill in all the details!");
      return;
    }

    console.log("Booking Appointment with:", {
      doctor_name: selectedDoctor,
      department: department,
      appointment_date: appointmentDate,
    });

    setLoading(true);

    fetch(`/book_appointment/${patientId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctor_name: selectedDoctor,
        department: department,
        appointment_date: appointmentDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setConfirmationMessage(data.message);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error booking appointment:", err);
      });
  };

  return (
    <div style={{ padding: 20 }} >
      <h3>Book Appointment for Patient ID: {patientId}</h3>
<div style={{ marginBottom: "10px", display:"flex", gap:50 }}>
      <div style={{ marginBottom: "10px"}}>
        <label>Doctor: </label>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          <option value="">Select Doctor</option>
          {/* Map through the random doctors data */}
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name} ({doctor.department})
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Department: </label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="Neurology">Neurology</option>
          <option value="Cardiology">Cardiology</option>
          <option value="PT">Physical Therapy</option>
          <option value="OT">Occupational Therapy</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Appointment Date: </label>
        <input
          type="datetime-local"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={handleBookAppointment}
          disabled={loading}
          style={{
            backgroundColor: "#3A3FAD",
            color: "#fff",
            padding: "6px 6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
</div>
      {confirmationMessage && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <strong>{confirmationMessage}</strong>
        </div>
      )}
    </div>
  );
}
