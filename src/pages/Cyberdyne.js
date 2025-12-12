import React, { useState } from 'react';
import TasksTab from '../components/TasksTab';
import PharmacyTab from '../components/PharmacyTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  const handleSave = () => {
    alert('Your data has been saved!');
  };

  const [extraInfo, setExtraInfo] = useState({
    advice: '',
    pastHistory: '',
    nextVisit: '',
  });

  const handleExtraInfoChange = (e) => {
    const { name, value } = e.target;
    setExtraInfo({ ...extraInfo, [name]: value });
  };

  return (
    <div style={containerStyle}>
      {/* ======== Patient Details ======== */}
      <div style={patientCard}>
        <h2 style={{ color: '#2a6592', marginBottom: '10px' }}>Patient Details</h2>
        <div style={gridLayout}>
          <div><strong>Name:</strong> MR. Jhon Eve (56y, Male)</div>
          <div><strong>Phone:</strong> +60 32445 2242</div>
          <div><strong>ID:</strong> 1162</div>
          <div><strong>Date:</strong> 17-Oct-2025</div>
          <div><strong>#Visit:</strong> 6</div>
          <div><strong>Height:</strong> 163 cm</div>
          <div><strong>Weight:</strong> 70.30 kg</div>
          <div><strong>BMI:</strong> 26.46 Kg/m²</div>
        </div>
        <div style={{ marginTop: '10px' }}>
          <strong>General Examination:</strong> Mild Deviation
          <br />
          <strong>Recent Investigations:</strong> X-ray shows mild scoliosis with 5° lumbar deviation
        </div>
      </div>

      {/* ======== Tab Navigation ======== */}
      <div style={tabNavStyles}>
        <button
          onClick={() => setActiveTab('tasks')}
          style={activeTab === 'tasks' ? activeTabButtonStyles : tabButtonStyles}
        >
          Tasks
        </button>
        <button
          onClick={() => setActiveTab('pharmacy')}
          style={activeTab === 'pharmacy' ? activeTabButtonStyles : tabButtonStyles}
        >
          Pharmacy
        </button>
      </div>

      {/* ======== Tab Content ======== */}
      {activeTab === 'tasks' && <TasksTab />}
      {activeTab === 'pharmacy' && <PharmacyTab />}

      {/* ======== Additional Details ======== */}
{/* ======== Additional Details (View-only) ======== */}

<div style={title}>
  <h3>Additional Details</h3>
  <div>
    <div >
      <label>Advice:</label>
      <div style={readonlyBox}>
        Home glucose readings<br />
        Low GI diet<br />
        Regular exercise – at least 30 mins walk daily<br />
        No added sugar in diet
      </div>
    </div>

    <div style={title}>
      <label>Past Medical History:</label>
      <div style={readonlyBox}>
        Type 2 DM 13 yrs<br />
        Family history of diabetes<br />
        CAD – stable
      </div>
    </div>

    <div style={title}>
      <label>Next Visit:</label>
      <div style={readonlyBox}>18-Oct-2025 (Saturday)</div>
    </div>
  </div>
</div>


      {/* ======== Save Button ======== */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleSave} style={saveButtonStyles}>
          Save
        </button>
      </div>
    </div>
  );
}

// ===================== STYLES =====================

const containerStyle = {
  padding: '20px',
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
};

const patientCard = {

  borderRadius: '8px',
  padding: '15px 20px',
  marginBottom: '20px',
};

const gridLayout = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '8px',
  marginBottom: '10px',
};

const tabNavStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
};

const tabButtonStyles = {
  padding: '10px 20px',
  margin: '0 10px',
  backgroundColor: '#f1f1f1',
  border: '1px solid #3A3FAD',
  cursor: 'pointer',
  fontSize: '16px',
  color: '#3A3FAD',
  borderRadius: '5px',
};

const activeTabButtonStyles = {
  ...tabButtonStyles,
  backgroundColor: '#3A3FAD',
  color: 'white',
};

const extraSection = {
  marginTop: '30px',
  background: '#eef2f5',
  padding: '15px',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

const title ={
  color:' rgb(42, 101, 146)',
  fontSize: '2rem',
}




const saveButtonStyles = {
  padding: '12px 25px',
  margin: '25px',
  backgroundColor: '#3A3FAD',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  textAlign: 'center',
};
const readonlyBox = {
  backgroundColor: '#fff',
 
  borderRadius: '4px',
  padding: '10px',
  minHeight: '60px',
  lineHeight: '1.4',
  fontSize: '14px',
  color: '#333',
};
