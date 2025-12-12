import React, { useState, useEffect } from 'react';

const PharmacyTab = () => {
  const [medications, setMedications] = useState([
    { id: 1, drug: 'Aspirin', time: 'Post lunch', date: '2025-10-22', progress: 0 },
    { id: 2, drug: 'Paracetamol', time: 'Pre lunch', date: '2025-10-21', progress: 0 },
    { id: 3, drug: 'Ibuprofen', time: 'Post dinner', date: '2025-10-23', progress: 0 },
  ]);
  
  const [currentDate, setCurrentDate] = useState('');

  // Set current date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];  // Get current date in YYYY-MM-DD format
    setCurrentDate(today);
  }, []);

  const handleProgressChange = (id, value) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, progress: value } : med
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '15px', fontSize: '2rem', color: 'rgb(42, 101, 146)' }}>Pharmacy Schedule</h2>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyles}>Date</th>
            <th style={tableHeaderStyles}>Drug Name</th>
            <th style={tableHeaderStyles}>Time</th>
            <th style={tableHeaderStyles}>Action</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((med) => (
            <tr key={med.id} style={{ textAlign: 'center' }}>
              <td style={tableCellStyles}>{med.date}</td>
              <td style={tableCellStyles}>{med.drug}</td>
              <td style={tableCellStyles}>{med.time}</td>
              <td style={tableCellStyles}>
                {/* Only allow progress input for today's date */}
                {med.date === currentDate && (
                  <>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={med.progress}
                      onChange={(e) => handleProgressChange(med.id, e.target.value)}
                      style={{ width: '100px' }}
                    />
                    <span style={{ marginLeft: '10px' }}>{med.progress}%</span>
                  </>
                )}
                {/* Disable input for other dates */}
                {med.date !== currentDate && <span> — </span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles for the table
const tableHeaderStyles = {
  backgroundColor: '#F1F1F1',
  border: '1px solid #000',
  color: '#3A3FAD',
  padding: '12px',
  fontWeight: 'bold',
};

const tableCellStyles = {
  padding: '12px',
  border: '1px solid #353333ff',
};

export default PharmacyTab;
