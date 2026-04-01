import { useState } from "react"

export default function MedicationAssessment({patient, onSubmit, onBack}) {
    const [formData, setFormData] = useState({})
    const [medications, setMedications] = useState([])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const calculateCompletionDate = (prescribedDate, duration) => {
        if (!prescribedDate || !duration) return "—"
        const date = new Date(prescribedDate)
        date.setDate(date.getDate() + parseInt(duration))
        return date.toISOString().split('T')[0]
    }

    const handleAddMedication = () => {
        if (!formData.medication_name || !formData.dose || !formData.unit || !formData.frequency || !formData.prescribed_date || !formData.duration) {
            alert("Please fill all fields")
            return
        }

        const newMedication = {
            id: Date.now(),
            ...formData,
            completed_date: calculateCompletionDate(formData.prescribed_date, formData.duration)
        }

        setMedications(prev => [...prev, newMedication])
        setFormData({})
    }

    const handleDeleteMedication = (id) => {
        setMedications(prev => prev.filter(med => med.id !== id))
    }

    const getMedicationName = (value) => {
        const medications = {
            "metformin": "Tab Metformin",
            "gliclazide": "Tab Gliclazide",
            "perindopril": "Tab Perindopril",
            "amlodipine": "Tab Amlodipine",
            "cardiprin": "Tab Cardiprin",
            "gabapentin": "Gabapentin",
            "lactulose": "Sy Lactulose",
            "pcm": "Tab PCM",
            "tramadol": "Cap Tramadol",
            "ravin_enema": "Ravin Enema",
            "cloxacillin": "Tab Cloxacillin",
            "celebrex": "Cap Celebrex"
        }
        return medications[value] || value
    }

    return (
        <div style={containerStyle}>
            <div style={tableWrapperFullStyle}>
                <div style={headerStyle}>
                    <h3 style={sectionTitleStyle}>Add Medication</h3>
                </div>
                
                <div style={formTableContainer}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Medication Name</th>
                                <th style={thStyle}>Dose</th>
                                <th style={thStyle}>Unit</th>
                                <th style={thStyle}>Frequency</th>
                                <th style={thStyle}>Prescribed Date</th>
                                <th style={thStyle}>Duration (Days)</th>
                                <th style={thStyle}>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={tdStyle}>
                                    <select 
                                        style={selectStyle} 
                                        name="medication_name" 
                                        value={formData.medication_name || ""}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="metformin">Tab Metformin</option>
                                        <option value="gliclazide">Tab Gliclazide</option>
                                        <option value="perindopril">Tab Perindopril</option>
                                        <option value="amlodipine">Tab Amlodipine</option>
                                        <option value="cardiprin">Tab Cardiprin</option>
                                        <option value="gabapentin">Gabapentin</option>
                                        <option value="lactulose">Sy Lactulose</option>
                                        <option value="pcm">Tab PCM</option>
                                        <option value="tramadol">Cap Tramadol</option>
                                        <option value="ravin_enema">Ravin Enema</option>
                                        <option value="cloxacillin">Tab Cloxacillin</option>
                                        <option value="celebrex">Cap Celebrex</option>
                                    </select>
                                </td>
                                <td style={tdStyle}>
                                    <select 
                                        style={selectStyle} 
                                        name="dose" 
                                        value={formData.dose || ""}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="4">4</option>
                                        <option value="8">8</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                        <option value="300">300</option>
                                        <option value="600">600</option>
                                    </select>
                                </td>
                                <td style={tdStyle}>
                                    <select 
                                        style={selectStyle} 
                                        name="unit" 
                                        value={formData.unit || ""}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="g">g</option>
                                        <option value="ml">ml</option>
                                        <option value="mg">mg</option>
                                    </select>
                                </td>
                                <td style={tdStyle}>
                                    <select 
                                        style={selectStyle} 
                                        name="frequency" 
                                        value={formData.frequency || ""}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="PRN">As Required</option>
                                        <option value="STAT">Immediately</option>
                                        <option value="OD">Once Per Day</option>
                                        <option value="BD">Twice Per Day</option>
                                        <option value="TDS">3 Times Per Day</option>
                                        <option value="ON">In The Night</option>
                                        <option value="OM">In The Morning</option>
                                        <option value="EOD">Every Other Day</option>
                                        <option value="QID">Every 6 Hours</option>
                                    </select>
                                </td>
                                <td style={tdStyle}>
                                    <input 
                                        type="date" 
                                        style={inputStyle} 
                                        name="prescribed_date" 
                                        value={formData.prescribed_date || ""}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td style={tdStyle}>
                                    <input 
                                        type="number" 
                                        style={inputStyle} 
                                        name="duration" 
                                        placeholder="Days" 
                                        value={formData.duration || ""}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td style={tdStyle}>
                                    <input 
                                        type="text" 
                                        style={inputStyle} 
                                        name="remark" 
                                        placeholder="Notes" 
                                        value={formData.remark || ""}
                                        onChange={handleInputChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div style={footerStyle}>
                    <button style={buttonStyle} onClick={handleAddMedication}>Add More</button>
                </div>
            </div>

            {medications.length > 0 && (
                <div style={tableWrapperFullStyle}>
                    <div style={headerStyle}>
                        <h3 style={sectionTitleStyle}>Medications List</h3>
                    </div>
                    
                    <div style={formTableContainer}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Medication Name</th>
                                    <th style={thStyle}>Dose</th>
                                    <th style={thStyle}>Frequency</th>
                                    <th style={thStyle}>Prescribed Date</th>
                                    <th style={thStyle}>Duration</th>
                                    <th style={thStyle}>Date Completed</th>
                                    <th style={thStyle}>Remark</th>
                                    <th style={thStyle}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medications.map((med) => (
                                    <tr key={med.id}>
                                        <td style={tdStyle}>{getMedicationName(med.medication_name)}</td>
                                        <td style={tdStyle}>{med.dose} {med.unit}</td>
                                        <td style={tdStyle}>{med.frequency}</td>
                                        <td style={tdStyle}>{med.prescribed_date}</td>
                                        <td style={tdStyle}>{med.duration} days</td>
                                        <td style={tdStyle}><strong>{med.completed_date}</strong></td>
                                        <td style={tdStyle}>{med.remark || "—"}</td>
                                        <td style={tdStyle}>
                                            <button 
                                                style={deleteButtonStyle} 
                                                onClick={() => handleDeleteMedication(med.id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

const containerStyle = {
    padding: "20px",
    width: "100%",
    backgroundColor: "#f9f9f9"
}

const tableWrapperFullStyle = {
    marginBottom: "30px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
    display: "flex",
    flexDirection: "column",
    height: "100%"
}

const headerStyle = {
    padding: "20px",
    borderBottom: "1px solid #eee"
}

const sectionTitleStyle = {
    marginTop: "0",
    marginBottom: "0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333"
}

const formTableContainer = {
    width: "100%",
    overflowX: "auto",
    overflowY: "visible",
    flex: "1",
    padding: "0"
}

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    fontSize: "13px"
}

const thStyle = {
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    fontWeight: "600",
    fontSize: "12px",
    color: "#000002",
    backgroundColor: "#F1F1F1"
}

const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #eee",
    fontSize: "12px"
}

const selectStyle = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    fontFamily: "inherit"
}

const inputStyle = {
    width: "100%",
    padding: "6px 8px",
    fontSize: "12px",
    border: "1px solid #ccc",
    borderRadius: "3px",
    boxSizing: "border-box",
    fontFamily: "inherit"
}

const footerStyle = {
    padding: "16px 20px",
    borderTop: "1px solid #eee",
    textAlign: "left"
}

const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500"
}

const deleteButtonStyle = {
    padding: "4px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "500"
}