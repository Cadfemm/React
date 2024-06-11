import React, { useState } from 'react';
import Health from "../assets/Brain.jpg";
import "../styles/Monoplegia.css";
import { useHistory,Link } from "react-router-dom";
import axios from 'axios';

const YourComponent = () => {
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [showAnuButton, setShowAnuButton] = useState(false);
  const [showAnuOptions, setShowAnuOptions] = useState(false);
  const [showDeepuInputs, setShowDeepuInputs] = useState(false);
  const [showNagInputs, setShowNagInputs] = useState(false);
  const [showRamaInputs, setShowRamaInputs] = useState(false);

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setSelectedDropdown(value);
    setShowAnuButton(value === 'drop1'); // Show Anu button only when drop1 is selected
    setShowAnuOptions(false); // Reset Anu options when a new dropdown item is selected
    setShowDeepuInputs(false); // Reset inputs when a new dropdown item is selected
    setShowNagInputs(false);
    setShowRamaInputs(false);
  };

  const handleAnuButtonClick = () => {
    setShowAnuOptions(true);
  };

  const handleOptionButtonClick = (option) => {
    if (option === 'Deepu') {
      setShowDeepuInputs(true);
      setShowNagInputs(false);
      setShowRamaInputs(false);
    } else if (option === 'Nag') {
      setShowDeepuInputs(false);
      setShowNagInputs(true);
      setShowRamaInputs(false);
    } else if (option === 'Rama') {
      setShowDeepuInputs(false);
      setShowNagInputs(false);
      setShowRamaInputs(true);
    }
  };

  return (
    <div>
    
      <div class="banner"  style={{ backgroundImage: `url(${Health})` }}>
  STROKE
</div>
<h2 className="Heading"> Type Of Injury</h2>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedDropdown} onChange={handleDropdownChange}>
        <option value="">--Select--</option>
        <option value="drop1">Drop1</option>
        <option value="drop2">Drop2</option>
        <option value="drop3">Drop3</option>
      </select>
      <label htmlFor="dropdown1">Select an option:</label>
      <select id="dropdown" value={selectedDropdown} onChange={handleDropdownChange}>
        <option value="">--Select--</option>
        <option value="drop1">Drop1</option>
        <option value="drop2">Drop2</option>
        <option value="drop3">Drop3</option>
      </select>
      <label htmlFor="dropdown2">Select an option:</label>
      <select id="dropdown" value={selectedDropdown} onChange={handleDropdownChange}>
        <option value="">--Select--</option>
        <option value="drop1">Drop1</option>
        <option value="drop2">Drop2</option>
        <option value="drop3">Drop3</option>
      </select>

      {showAnuButton && (
        <button onClick={handleAnuButtonClick}>Anu</button>
      )}

      {showAnuOptions && (
        <div>
          <button onClick={() => handleOptionButtonClick('Deepu')}>Deepu</button>
          <button onClick={() => handleOptionButtonClick('Nag')}>Nag</button>
          <button onClick={() => handleOptionButtonClick('Rama')}>Rama</button>
        </div>
      )}

      {showDeepuInputs && (
        <div>
          <input type="text" placeholder="Input1" />
          <input type="text" placeholder="Input2" />
          <input type="text" placeholder="Input3" />
        </div>
      )}

      {showNagInputs && (
        <div>
          <input type="text" placeholder="Input4" />
          <input type="text" placeholder="Input5" />
          <input type="text" placeholder="Input6" />
        </div>
      )}

      {showRamaInputs && (
        <div>
          <input type="text" placeholder="Input7" />
          <input type="text" placeholder="Input8" />
          <input type="text" placeholder="Input9" />
        </div>
      )}
    </div>
  );
};

export default YourComponent;
