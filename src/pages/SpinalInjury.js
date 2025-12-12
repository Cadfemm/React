import React, { useState, useEffect } from 'react';
import Health from "../assets/spino.jpg";
import "../styles/Monoplegia.css";

const optionFieldsMap = {
  Strength: {
    MMT: ['Hip Flexor Right', 'Hip Flexor Left', 'Knee Extensor Right', 'Knee Extensor Left', 'Ankle Dorsal Flexor Right', 'Ankle Dorsal Flexor Left','Long Toe Extensor Left','Long Toe Extensor Right','Ankle Plantar Flexor Right','Ankle Plantar Flexor Left','Upper Limb Shoulder Flexion Right','Upper Limb Shoulder Flexion Left','Upper Limb Shoulder Extension Right','Upper Limb Shoulder Extension Left','Upper Limb Shoulder Abduction Right','Upper Limb Shoulder Abduction Left','Upper Limb Shoulder Adduction Right','Upper Limb Shoulder Adduction Left','Upper Limb Shoulder Internal Rotation Left','Upper Limb Shoulder Internal Rotation Right','Upper Limb Shoulder External Rotation Right','Upper Limb Shoulder External Rotation Left','Upper Limb Elbow Flexion Right','Upper Limb Elbow Flexion Left','Upper Limb Elbow Extension Right','Upper Limb Elbow Extension Left','Upper Limb Wrist Flexion Right','Upper Limb Wrist Flexion Left','Upper Limb Wrist Extension Right','Upper Limb Wrist Extension Left','Upper Limb Finger Flexion Right','Upper Limb Finger Flexion Left','Upper Limb Finger Extension Right','Upper Limb Finger Extension Left','Upper Limb Finger Abduction Right','Upper Limb Finger Abduction Left','Upper Limb Finger Adduction Right','Upper Limb Finger Adduction Left','Lower Limb Hip Flexion Right','Lower Limb Hip Flexion Left','Lower Limb Hip Extension Right','Lower Limb Hip Extension Left','Lower Limb Hip Abduction Right','Lower Limb Hip Abduction Left','Lower Limb Hip Adduction Right','Lower Limb Hip Adduction Left','Lower Limb Internal Rotation Right','Lower Limb Internal Rotation Left','Lower Limb External Rotation Right','Lower Limb External Rotation Left','Lower Limb Knee Flexion Right','Lower Limb Knee Flexion Left','Lower Limb Knee Extension Right','Lower Limb Knee Extension Left','Lower Limb Ankle Plantar Flexion Right','Lower Ankle Plantar Flexion Left','Lower Limb Ankle Dorsal Flexion Right','Lower Ankle Dorsal Flexion Left','Lower Limb Inversion Right','Lower Limb Inversion Left','Lower Limb Eversion Right','Lower Limb Eversion Left','Lower Limb Toe Flexion Right','Lower Limb Toe Flexion Left','Lower Limb Toe Abduction Right','Lower Limb Toe Abduction Left','Lower Limb Toe Adduction Right','Lower Limb Toe Adduction Left'], 
  },
  Balance: {
    BBG: ['Berg Balance Scale'],
    FIST: ['FIST Score'],
  },
  Spasticity: {
    MAS: ['Ankle Plantar Left','Ankle Plantar Right','Hamstring Left','Hamstring Right','Adductor Right','Adductor Left','Elbow Flexor Right','Elbow Flexor Left','Wrist Flexor Right','Wrist Flexor Left','Pectoralis Major Right','Pectoralis Major Left','Biceps','Pronator','Knee Extensors','Plantar Flexors','Hip Flexion Right','Hip Flexion Left','Hip Extension Right','Hip Extension Left','Hip Abduction Right','Hip Abduction Left','Hip Adduction Right','Hip Adduction Left','Internal Rotation Left','Internal Rotation Right','External Rotation Right','External Rotation Left'],
  },
  // Add other diseases and their categories with fields here...
};

const Dropdown = () => {
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [visibleInput, setVisibleInput] = useState(null);
  const [cType, setCType] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [showInputsFor, setShowInputsFor] = useState(null);
  const [isCTypeDisabled, setIsCTypeDisabled] = useState(false);
  const [isTTypeDisabled, setIsTTypeDisabled] = useState(false);
  const [tType, setTType] = useState("");
  const [visibleCategory, setVisibleCategory] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [daysOfTreatment, setDaysOfTreatment] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSource, setVideoSource] = useState('60per.mp4');

  useEffect(() => {
    setAllFieldsFilled(false);
  }, [selectedDiseases, visibleInput, visibleCategory]);

  const handleButtonPress = () => {
    const newInputValues = {};

    for (const disease in optionFieldsMap) {
      for (const category in optionFieldsMap[disease]) {
        optionFieldsMap[disease][category].forEach((field) => {
          newInputValues[field] = generateRandomValue();
        });
      }
    }

    setInputValues(newInputValues);
  };

  const handleDiseaseChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedDiseases(selectedValues);
    setVisibleInput(null);
    setVisibleCategory(null);
    setInputValues({});
    setDaysOfTreatment('');
    setAllFieldsFilled(false);
    setIsModified(false);
    setVideoSource('60per.mp4'); // Reset video source on disease change
  };

  const generateRandomValue = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1; // Generates random number between 0 and 7
    return randomNumber.toString();
  };

  const handleCTypeChange = (e) => {
    const value = e.target.value;
    setCType(value);

    // Disable T-Type dropdown when C-Type is selected
    if (value) {
      setIsTTypeDisabled(true);
      setIsCTypeDisabled(false); // Enable C-Type dropdown
    } else {
      setIsTTypeDisabled(false);
    }

    if (value === "C1" || value === "C2") {
      setShowInputsFor(true);
    } else {
      setShowButtons(false);
    }
  };

  const handleTTypeChange = (e) => {
    const value = e.target.value;
    setTType(value);

    // Disable T-Type dropdown when C-Type is selected
    if (value) {
      setIsCTypeDisabled(true);
      setIsTTypeDisabled(false); // Enable T-Type dropdown
    } else {
      setIsCTypeDisabled(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleDaysOfTreatmentChange = (event) => {
    setDaysOfTreatment(event.target.value);
  };

  const handleDiseaseButtonClick = (disease) => {
    setVisibleInput(disease);
    setVisibleCategory(null);
  };

  const handleCategoryButtonClick = (category) => {
    setVisibleCategory(category);
  };

  const handleSubmit = () => {
    const isAnyFieldEmpty = Object.values(inputValues).some((value) => !value.trim()) || !daysOfTreatment.trim();

    if (isAnyFieldEmpty) {
      alert('Please fill in all required fields.');
    } else {
      const updatedInputValues = {};
      for (const key in inputValues) {
        let value = parseInt(inputValues[key]);
      
        if (value < 5) {
          value += 2;
          updatedInputValues[key] = (value > 6 ? 6 : value).toString();  // Ensure the value doesn't exceed 6
        } else if (value === 5) {
          updatedInputValues[key] = '6';  // Directly set to 6
        } else {
          updatedInputValues[key] = value.toString();  // No change for values greater than 5
        }
      }
      setInputValues(updatedInputValues);
      setIsModified(true);
      setVideoSource('Normal.mp4'); // Set video source to issue.mp4 after submit
      alert('Submit The Data');
      setIsVisible(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="banner" style={{ backgroundImage: `url(${Health})` }}>
        SPINAL CORD INJURY
      </div>
      <div className="center">
        <b><label htmlFor="cType">Level:</label></b>
        <select id="cType" value={cType} onChange={handleCTypeChange}>
          <option value="">Select Type</option>
          <option value="C1">Cervical</option>
          <option value="C2">Thoracic</option>
          <option value="C3">Lumbar</option>
          {/* <option value="C4">C3C4(ASIA-A)</option> */}
        </select>

        <b><label htmlFor="tType">Completeness Of Injury:</label></b>
        <select id="tType" value={tType} onChange={handleTTypeChange}>
          <option value="">Select Location</option>
          <option value="T1">ASIA-A</option>
          <option value="T2">ASIA-B</option>
          <option value="T3">ASIA-C</option>
          <option value="T4">ASIA-D</option>
        </select>

        <label htmlFor="disease">Impairments:</label>
        <select
          id="disease"
          style={{ height: '65px' }}
          multiple
          value={selectedDiseases}
          onChange={handleDiseaseChange}
          disabled={!(cType && tType)}
        >
          <option value="Strength">Strength</option>
          <option value="Balance">Balance</option>
          <option value="Spasticity">Spasticity</option>
          {/* Add other disease options here */}
        </select>
      </div>
      <div className="selected-diseases-container">
        {selectedDiseases.map((disease) => (
          <button key={disease} onClick={() => handleDiseaseButtonClick(disease)}>
            {disease}
          </button>
        ))}
      </div>

      {visibleInput && (
        <div>
          {Object.keys(optionFieldsMap[visibleInput]).map((category) => (
            <button key={category} onClick={() => handleCategoryButtonClick(category)}>
              {isModified ? `Modified ${category}` : category}
            </button>
          ))}
        </div>
      )}

      {visibleInput && visibleCategory && (
        <div className="input-group">
          <div style={{ marginBottom: '20px', padding: '10px', marginTop: '20px' }} className="input-grid">
            {optionFieldsMap[visibleInput][visibleCategory].map((field) => (
              <div key={field} className="input-container">
                <label htmlFor={field}>{field}</label>
                <input
                  id={field}
                  name={field}
                  type="text"
                  value={inputValues[field] || ''}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
          {selectedDiseases[selectedDiseases.length - 1] === visibleInput &&
            visibleCategory === Object.keys(optionFieldsMap[visibleInput]).slice(-1)[0] && (
              <div className="treatment-container">
                <div>
                  <label htmlFor="daysOfTreatment">Days of Treatment</label>
                  <input
                    id="daysOfTreatment"
                    name="daysOfTreatment"
                    type="text"
                    value={daysOfTreatment}
                    onChange={handleDaysOfTreatmentChange}
                  />
                </div>
               
                {isVisible && (
        <button onClick={handleSubmit} disabled={daysOfTreatment === '0'}>
        Submit
      </button>
      )}
                <button style={{ float: 'right' }} onClick={openModal}>
                  Animate
                </button>
                
                {isModalOpen && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <span className="close-button" onClick={closeModal}>
                        &times;
                      </span>
                      <video width="700" height="500" controls autoPlay>
                        <source src={videoSource} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      )}

      {selectedDiseases.length > 0 && (
        <button className="B1" onClick={handleButtonPress}>
          Auto Fill
        </button>
      )}
    </div>
  );
};

export default Dropdown;