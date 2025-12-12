import React, { useState } from "react";
import "../styles/Monoplegia.css"; // optional CSS for table styling

export default function PharmacyDetailsCaptureTab() {
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "", timing: "", duration: "" },
  ]);

  const [extraInfo, setExtraInfo] = useState({
    advice: "",
    pastHistory: "",
    nextVisit: "",
  });

  // --- Dropdown Options ---
  const medicineOptions = [
    "Metformin 500mg",
    "Glimepiride 2mg",
    "Atorvastatin 10mg",
    "Losartan 50mg",
    "Pantoprazole 40mg",
    "Vitamin D3 60000 IU",
    "Clopidogrel 75mg",
    "Telmisartan 40mg",
    "Multivitamin Tab",
    "Hydrochlorothiazide 12.5mg",
    "Sitagliptin 100mg",
    "Folic Acid 5mg",
  ];

  const frequencyOptions = [
    "1-0-0",
    "0-1-0",
    "0-0-1",
    "1-0-1",
    "1-1-0",
    "1-1-1",
    "0-0-1 (Weekly)",
  ];

  const timingOptions = [
    "Before Breakfast",
    "After Breakfast",
    "Before Lunch",
    "After Lunch",
    "Before Dinner",
    "After Dinner",
    "Morning",
    "Night",
    "Once a Week",
  ];

  const durationOptions = [
    "1 Week",
    "2 Weeks",
    "1 Month",
    "2 Months",
    "3 Months",
    "6 Months",
  ];

  // --- Handlers ---
  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...medicines];
    updated[index][name] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { name: "", dosage: "", frequency: "", timing: "", duration: "" },
    ]);
  };

  const removeMedicine = (index) => {
    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated);
  };

  const handleExtraInfoChange = (e) => {
    const { name, value } = e.target;
    setExtraInfo({ ...extraInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const record = { medicines, ...extraInfo };
    console.log("Captured Record:", record);
    alert("Pharmacy and patient details saved successfully!");
  };

  return (
    <div className="pharmacy-container">
      <h3>Pharmacy Information</h3>
      <form onSubmit={handleSubmit}>
        <table className="pharmacy-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Timing</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med, i) => (
              <tr key={i}>
                <td>
                  <select
                    name="name"
                    value={med.name}
                    onChange={(e) => handleMedicineChange(i, e)}
                  >
                    <option value="">Select Medicine</option>
                    {medicineOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
<td>
  <input
    type="text"
    name="dosage"
    placeholder="Custom dosage"
    value={med.dosage}
    onChange={(e) => handleMedicineChange(i, e)}
    className="dosage-input"
  />
</td>
                <td>
                  <select
                    name="frequency"
                    value={med.frequency}
                    onChange={(e) => handleMedicineChange(i, e)}
                  >
                    <option value="">Select Frequency</option>
                    {frequencyOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    name="timing"
                    value={med.timing}
                    onChange={(e) => handleMedicineChange(i, e)}
                  >
                    <option value="">Select Timing</option>
                    {timingOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    name="duration"
                    value={med.duration}
                    onChange={(e) => handleMedicineChange(i, e)}
                  >
                    <option value="">Select Duration</option>
                    {durationOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeMedicine(i)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="button" className="add-btn" onClick={addMedicine}>
          + Add Medicine
        </button>

        {/* --- Extra Fields Section --- */}
<div className="extra-section" style={{marginTop:"50px"}}>
  <h3>Additional Details</h3>

  <div className="extra-grid">
    <div className="extra-field">
      <label>Advice:</label>
      <textarea
        name="advice"
        rows="2"
        placeholder="Enter general advice (e.g., maintain diet, daily walk)"
        value={extraInfo.advice}
        onChange={handleExtraInfoChange}
      />
    </div>

    <div className="extra-field">
      <label>Past Medical History:</label>
      <textarea
        name="pastHistory"
        rows="2"
        placeholder="Enter any previous medical history"
        value={extraInfo.pastHistory}
        onChange={handleExtraInfoChange}
      />
    </div>

<div className="extra-field">
  <label>Next Visit:</label>
  <input
    type="date"
    name="nextVisit"
    value={extraInfo.nextVisit}
    onChange={handleExtraInfoChange}
    className="next-visit-input"
    style={{
      height: "70px",
      marginTop: "15px",
    }}
  />
</div>

  </div>
</div>

        <br />
        <button type="submit" className="save-btn">
          Save Record
        </button>
      </form>
    </div>
  );
}
