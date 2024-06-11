import React, { useState,useEffect } from "react";
import Health from "../assets/Brain.jpg";
import "../styles/Monoplegia.css";
import { useHistory,Link } from "react-router-dom";
import axios from 'axios';
const Droperdowns = () => {
  const [cType, setCType] = useState("");
  const [tType, setTType] = useState("");
  const [showInputsFor, setShowInputsFor] = useState(null);
  const [isCTypeDisabled, setIsCTypeDisabled] = useState(false);
  const [showMMTInputs, setShowInputs] = useState(false);
  const [showMASInputs, setShowMASInputs] = useState(false);
  const [showBBGInputs, setShowBBGInputs] = useState(false);
  const [showFISTInputs, setShowFISTInputs] = useState(false);
  const [isTTypeDisabled, setIsTTypeDisabled] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showC1Inputs, setShowC1Inputs] = useState(false);
  const [showC2Inputs, setShowC2Inputs] = useState(false);
  const [showC3Inputs, setShowC3Inputs] = useState(false);
  const [showRiskButton, setShowRiskButton] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [maxOptionWidth, setMaxOptionWidth] = useState(0);
  
  useEffect(() => {
    // Calculate the maximum width of the option text
    const options = Array.from(document.getElementById("disease").options);
    const maxWidth = options.length;
    const fontSize = parseFloat(window.getComputedStyle(document.getElementById("disease")).fontSize);
    setMaxOptionWidth(maxWidth * 20); // Multiply by font size to get the width in pixels
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };
  
   
  const handleClick = () => {
    setShowInputs(true);
};
const handleClick2 = () => {
  setShowBBGInputs(true);
  setShowFISTInputs(false);
};
const handleClick3 = () => {
  setShowFISTInputs(true);
  setShowBBGInputs(false);
};
const handleClick4 = () => {
  setShowMASInputs(true);
  setShowBBGInputs(false);
};

  const closeModal = () => {
    setModalOpen(false);
  };
  const history = useHistory();
  
  const handleButtonClick = (buttonValue) => {
    if (buttonValue === "B1") {
      setShowC1Inputs(true);
      setShowC2Inputs(false);
      setShowC3Inputs(false);
    } else if (buttonValue === "B2") {
      setShowC1Inputs(false);
      setShowC2Inputs(true);
      setShowC3Inputs(false);
    } else if (buttonValue === "B3") {
      setShowC1Inputs(false);
      setShowC2Inputs(false);
      setShowC3Inputs(true);
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleCTypeChange = (e) => {
    const value = e.target.value;
    setCType(value);

    // Disable T-Type dropdown when C-Type is selected
    if (value) {
       // Reset T-Type value
      setIsTTypeDisabled(true);
      setIsCTypeDisabled(false); // Enable C-Type dropdown
    } else {
      setIsTTypeDisabled(false);
    }
    if (value === "C1"||value === "C2") {
      // If "C1" is selected, set showButtons state to true
      setShowInputsFor(true);
      
    } else {
      // If another option is selected, hide the buttons
      setShowButtons(false);
    }

    
  };

  const handleTTypeChange = (e) => {
    const value = e.target.value;
    setTType(value);

    // Disable T-Type dropdown when C-Type is selected
    if (value) {
      // Reset C-Type value
      setIsCTypeDisabled(true);
      setIsTTypeDisabled(false); // Enable T-Type dropdown
    } else {
      setIsCTypeDisabled(false);
    }

   
  };



  const handleRedirect = () => {
    console.log('Sending data to Flask server:', inputValues);
    axios.post('http://localhost:5000/process_data', { data: inputValues })
      .then(response => {
        console.log('Server response:', response.data);
        const { updatedData } = response.data; // Extracting updatedData from the response
        history.push({
          pathname: '/treatment/Subtreatments',
          state: { updatedData }, // Passing updatedData directly to the state
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  

  const [inputValues, setInputValues] = useState({
    Left_Shoulder_Flexion: '',
    Left_Shoulder_Flexion_Progress: '',
    Left_Shoulder_Extension: '',
    Left_Shoulder_Extension_Progress: '',
    Left_Shoulder_Abduction: '',
    Left_Shoulder_Abduction_Progress: '',
    Left_Shoulder_Adduction: '',
    Left_Shoulder_Adduction_Progress: '',
    Left_Shoulder_Internal_Rotation: '',
    Left_Shoulder_Internal_Rotation_Progress: '',
    Left_Shoulder_External_Rotation: '',
    Left_Shoulder_External_Rotation_Progress: '',
    Left_Elbow_Joint_Flexion: '',
    Left_Elbow_Joint_Flexion_Progress: '',
    Left_Elbow_Joint_Extension: '',
    Left_Elbow_Joint_Extension_Progress: '',
    Left_Wrist_Joint_Flexion: '',
    Left_Wrist_Joint_Flexion_Progress: '',
    Left_Wrist_Joint_Extension: '',
    Left_Wrist_Joint_Extension_Progress: '',
    Left_Fingers_Flexion: '',
    Left_Fingers_Flexion_Progress: '',
    Left_Fingers_Extension: '',
    Left_Fingers_Extension_Progress: '',
    Left_Fingers_Abduction: '',
    Left_Fingers_Abduction_Progress: '',
    Left_Fingers_Adduction: '',
    Left_Fingers_Adduction_Progress: '',
    Right_Shoulder_Flexion: '',
    Right_Shoulder_Flexion_Progress: '',
    Right_Shoulder_Extension: '',
    Right_Shoulder_Extension_Progress: '',
    Right_Shoulder_Abduction: '',
    Right_Shoulder_Abduction_Progress: '',
    Right_Shoulder_Adduction: '',
    Right_Shoulder_Adduction_Progress: '',
    Right_Shoulder_Internal_Rotation: '',
    Right_Shoulder_Internal_Rotation_Progress: '',
    Right_Shoulder_External_Rotation: '',
    Right_Shoulder_External_Rotation_Progress: '',
    Right_Elbow_Joint_Flexion: '',
    Right_Elbow_Joint_Flexion_Progress: '',
    Right_Elbow_Joint_Extension: '',
    Right_Elbow_Joint_Extension_Progress: '',
    Right_Wrist_Joint_Flexion: '',
    Right_Wrist_Joint_Flexion_Progress: '',
    Right_Wrist_Joint_Extension: '',
    Right_Wrist_Joint_Extension_Progress: '',
    Right_Fingers_Flexion: '',
    Right_Fingers_Flexion_Progress: '',
    Right_Fingers_Extension: '',
    Right_Fingers_Extension_Progress: '',
    Right_Fingers_Abduction: '',
    Right_Fingers_Abduction_Progress: '',
    Right_Fingers_Adduction: '',
    Right_Fingers_Adduction_Progress: '',
    Fist_Score: '',
    Fist_Progress: '',
    WISCI: '',
    WISCI_Progress: '',
    NBD: '',
    NBD_Progress: '',
    Incontinence: '',
    Incontinence_Progress: '',
    Storage_And_Voiding: '',
    Storage_Progress: '',
    Consequences: '',
    Consequences_Progress: '',
    Quality_Of_Life: '',
    Quality_Progress: '',
    Bladder_Management: '',
    Bladder_Management_Progress: '',
    Days_Of_Treatment: ''
  });
  const handleButtonPress = () => {
    const newInputValues = {};
    for (const key in inputValues) {
      if (key === 'Bladder_Management') {
        newInputValues[key] = 'a';
      } else {
        newInputValues[key] = generateRandomValue(); 
      }
    }
    setInputValues(newInputValues);
  };
  
  const generateRandomValue = () => {
    const randomNumber = Math.floor(Math.random() * 16); // Generates random number between 0 and 15
    return randomNumber.toString();
};

const [selectedDiseases, setSelectedDiseases] = useState([]); // Define selectedDiseases state
const handleDiseaseChange = (event) => {
  const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
  setSelectedDiseases(selectedOptions);
  setShowInputsFor(false);
}; // Define handleDiseaseChange function to manage state
const handleShowInputs = (disease) => {
  setShowInputsFor(disease);
};
  

  return (
    <div>
      <div class="banner"  style={{ backgroundImage: `url(${Health})` }}>
  STROKE
</div>
<h2 className="Heading"> Type Of Injury</h2>
<div className="center">
  
  <b><label htmlFor="cType">Types: </label></b>
        <select id="cType" value={cType} onChange={handleCTypeChange}>
          <option value="">Select Type</option>
          <option value="C1">Ischemic</option>
          <option value="C2">Hemorrhagic</option>
          {/* <option value="C3">Lumbar</option> */}
          {/* <option value="C4">C3C4(ASIA-A)</option> */}
        </select>

   <b><label htmlFor="tType">Location: </label></b>
        <select id="tType" value={tType} onChange={handleTTypeChange}>
          <option value="">Select Location</option>
          <option value="T1">Cerebral Hemipe</option>
          <option value="T2">Brainsteam / Cerebellar</option>
          
        </select>

 

      <b><label htmlFor="disease">Impairments: </label></b>
      <select id="disease" style={{ height: '65px' }}multiple value={selectedDiseases} onChange={handleDiseaseChange}>
        {/* List of diseases */}
        <option value="Strength">Strength</option>
        <option value="Balance">Balance</option>
        <option value="Spasticity">Spasticity</option>
        <option value="Ambulation">Ambulation</option>
        <option value="Functional">Functional Independent Scale</option>
        <option value="Ataxia">Ataxia</option>
        <option value="Sensorimotor">Sensorimotor Function</option>
        <option value="Bowl&Bladder">Bowl & Bladder</option>
        <option value="Cognitive">Cognitive Assessment</option>
      </select>
      
</div>
<div className="center">
{selectedDiseases.map(disease => (
        <button key={disease} onClick={() => handleShowInputs(disease)}>
          {disease}
        </button>
      ))}</div>
{showInputsFor === 'Strength' && (
         <div style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}>
         <button onClick={handleClick}>MMT</button>
         {showMMTInputs && (
            <div id="input-container"style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }} >
                 <table style={{ width: "100%" }}>
                        <tbody>
            <tr>
              <td>
                <label htmlFor="Time_Between_Tests">Hip Flexor Right</label>
                <input id="Time_Between_Tests" name="Left_Shoulder_Flexion" type="number" value={inputValues.Left_Shoulder_Flexion} onChange={handleChange} />
              </td>
              <td>
                <label htmlFor="Time_Between_Tests">Hip Flexor Left</label>
                <input id="Time_Between_Tests" name="Left_Shoulder_Flexion_Progress" type="number" value={inputValues.Left_Shoulder_Flexion_Progress} onChange={handleChange} />
              </td>
              <td>
                <label htmlFor="Time_Between_Tests">Knee Extensor Right</label>
                <input id="Time_Between_Tests" name="Left_Shoulder_Extension" type="number" value={inputValues.Left_Shoulder_Extension} onChange={handleChange} />
              </td>
              <td>
                <label htmlFor="Time_Between_Tests">Knee Extensor Left</label>
                <input id="Time_Between_Tests" name="Left_Shoulder_Extension_Progress" type="number" value={inputValues.Left_Shoulder_Extension_Progress} onChange={handleChange} />
              </td>
              <td>
                <label htmlFor="Time_Between_Tests">Ankle Dorsal Flexor Right</label>
                <input id="Time_Between_Tests" name="Left_Shoulder_Abduction" type="number" value={inputValues.Left_Shoulder_Abduction} onChange={handleChange} />
              </td>
              <td>
                <label htmlFor="Time_Between_Tests">Ankle Dorsal Flexor Left</label>
                <input id="Time_Between_Tests" name="Left_Shoulder_Abduction_Progress" type="number" value={inputValues.Left_Shoulder_Abduction_Progress} onChange={handleChange} />
              </td>

            </tr>
            <tr>
              <td>
                <label htmlFor="Time_Between_Tests">Long Toe Extensor Left</label>
                <input id="Time_Between_Tests" name="Left_Shoulder_Adduction" type="number" value={inputValues.Left_Shoulder_Adduction} onChange={handleChange} />
              </td>
              <td>
                <label htmlFor="Time_Between_Tests">Long Toe Extensor Right</label>
                <input id="Time_Between_Tests" name="Left_Shoulder_Adduction_Progress" type="number" value={inputValues.Left_Shoulder_Adduction_Progress} onChange={handleChange} />
              </td>
              <td>
                <label htmlFor="Initial_Velocity">Ankle Plantar Flexor Right</label>
                <input name="Left_Shoulder_Internal_Rotation" value={inputValues.Left_Shoulder_Internal_Rotation} onChange={handleChange} id="Initial_Velocity" type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Cadence">Ankle Plantar Flexor Left</label>
                <input id="Initial_Cadence" name="Left_Shoulder_Internal_Rotation_Progress" value={inputValues.Left_Shoulder_Internal_Rotation_Progress} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Stride_Length">Upper Limb Shoulder Flexion Right</label>
                <input id="Initial_Stride_Length" name="Left_Shoulder_External_Rotation" value={inputValues.Left_Shoulder_External_Rotation} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Stride_Length">Upper Limb Shoulder Flexion Left</label>
                <input id="Initial_Stride_Length" name="Left_Shoulder_External_Rotation_Progress" value={inputValues.Left_Shoulder_External_Rotation_Progress} onChange={handleChange} type="number" />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Left">Upper Limb Shoulder Extension Right</label>
                <input id="Initial_Deviation_From_Ideal_Stance_Phase_Left" name="Left_Elbow_Joint_Flexion" value={inputValues.Left_Elbow_Joint_Flexion} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Right">Upper Limb Shoulder Extension Left</label>
                <input id="Initial_Deviation_From_Ideal_Stance_Phase_Right" name="Left_Elbow_Joint_Flexion_Progress" value={inputValues.Left_Elbow_Joint_Flexion_Progress} onChange={handleChange} type="number" />
              </td>


              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Left">Upper Limb Shoulder Abduction Right</label>
                <input id="Initial_Deviation_From_Ideal_Loading_Response_Left" name="Left_Elbow_Joint_Extension" value={inputValues.Left_Elbow_Joint_Extension} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Right">Upper Limb Shoulder Abduction Left</label>
                <input id="Initial_Deviation_From_Ideal_Loading_Response_Right" name="Left_Elbow_Joint_Extension_Progress" value={inputValues.Left_Elbow_Joint_Extension_Progress} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Left">Upper Limb Shoulder Adduction Right</label>
                <input id="Initial_Deviation_From_Ideal_Single_Support_Left" name="Left_Wrist_Joint_Flexion" value={inputValues.Left_Wrist_Joint_Flexion} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Left">Upper Limb Shoulder Adduction Left</label>
                <input id="Initial_Deviation_From_Ideal_Single_Support_Left" name="Left_Wrist_Joint_Flexion_Progress" value={inputValues.Left_Wrist_Joint_Flexion_Progress} onChange={handleChange} type="number" />
              </td>
            </tr>
            <tr>

              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Upper Limb Shoulder Internal Rotation Left</label>
                <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Wrist_Joint_Extension" value={inputValues.Left_Wrist_Joint_Extension} onChange={handleChange} type="number" />
              </td>

              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Upper Limb Shoulder Internal Rotation Right</label>
                <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Wrist_Joint_Extension_Progress" value={inputValues.Left_Wrist_Joint_Extension_Progress} onChange={handleChange} type="number" />
              </td>


              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Upper Limb Shoulder External Rotation Right</label>
                <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Flexion" value={inputValues.Left_Fingers_Flexion} onChange={handleChange} type="number" />
              </td>

              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Shoulder External Rotation Left</label>
                <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Flexion_Progress" value={inputValues.Left_Fingers_Flexion_Progress} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Swing_Right">Upper Limb Elbow Flexion Right</label>
                <input id="Initial_Deviation_From_Ideal_Swing_Right" name="Left_Fingers_Extension" value={inputValues.Left_Fingers_Extension} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Swing_Right">Upper Limb Elbow Flexion Left</label>
                <input id="Initial_Deviation_From_Ideal_Swing_Right" name="Left_Fingers_Extension_Progress" value={inputValues.Left_Fingers_Extension_Progress} onChange={handleChange} type="number" />
              </td>
            </tr>
            <tr>

              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Upper Limb Elbow Extension Right</label>
                <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
              </td>

              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Upper Limb Elbow Extension Left</label>
                <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
              </td>


              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Upper Limb Wrist Flexion Right</label>
                <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
              </td>

              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Wrist Flexion Left</label>
                <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Wrist Extension Right</label>
                <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Wrist Extension Left</label>
                <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
              </td>
            </tr>

            <tr>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Upper Limb Finger Flexion Right</label>
<input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Upper Limb Finger Flexion Left</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Upper Limb Finger Extension Right</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Finger Extension Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Finger Abduction Right</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Finger Abduction Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Upper Limb Finger Adduction Right</label>
<input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Upper Limb Finger Adduction Left</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Hip Flexion Right</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Hip Flexion Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Hip Extension Right</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Hip Extension Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Lower Limb Hip Abduction Right</label>
<input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Lower Limb Hip Abduction Left</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Hip Adduction Right</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Hip Adduction Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Internal Rotation Right</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Internal Rotation Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Lower Limb External Rotation Right</label>
<input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Lower Limb External Rotation Left</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Knee Flexion Right</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Knee Flexion Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Knee Extension Right</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Knee Extension Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Lower Limb Ankle Plantar Flexion Right</label>
<input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Lower Limb Ankle Plantar Flexion Left</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Ankle Dorsal Flexion Right</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Ankle Dorsal Flexion Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Inversion Right</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Inversion Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Lower Limb Eversion Right</label>
<input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Lower Limb Eversion Left</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Toe Flexion Right</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Toe Flexion Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Toe Extension Right</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Toe Extension Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Lower Limb Toe Abduction Right</label>
<input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Lower Limb Toe Abduction Left</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
<label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Toe Adduction Right</label>
<input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Toe Adduction Left</label>
<input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>

</tr>
          </tbody>
        </table>
            </div>
        )}
      </div>
      )}
{showInputsFor === 'Balance' && (
  <div style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}>
    <button onClick={handleClick2}>BBG</button>
    <button onClick={handleClick3}>FIST</button>
    {showBBGInputs && (
            <div id="input-container"style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }} >
                 <table style={{ width: "100%" }}>
                        <tbody>
                                  <tr>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Berg Balance Scale</label>
<input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

                            </tr>
          </tbody>
        </table>
            </div>
        )}
    
    {showFISTInputs && (
            <div id="input-container"style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }} >
                 <table style={{ width: "100%" }}>
                        <tbody>
                                  <tr>

<td>
<label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">FIST Score</label>
<input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

                            </tr>
          </tbody>
        </table>
            </div>
        )}
        <button>SUBMIT DATA</button>
      </div>
      )}
{showInputsFor === 'Spasticity' && (
         <div style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}>
         <button onClick={handleClick4}>MAS</button>
         {showMASInputs && (
            <div id="input-container"style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }} >
  <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Ankle Plantar Left</label>
                    <input id="Time_Between_Tests" name="Fist_Score" type="number" value={inputValues.Fist_Score} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Ankle Plantar Right</label>
                    <input id="Time_Between_Tests" name="Fist_Progress" type="number" value={inputValues.Fist_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Hamstring Left</label>
                    <input id="Time_Between_Tests" name="WISCI" type="number" value={inputValues.WISCI} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Hamstring Right</label>
                    <input id="Time_Between_Tests" name="WISCI_Progress" type="number" value={inputValues.WISCI_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Adductor Right</label>
                    <input id="Time_Between_Tests" name="NBD" type="number" value={inputValues.NBD} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Adductor Left</label>
                    <input id="Time_Between_Tests" name="NBD_Progress" type="number" value={inputValues.NBD_Progress} onChange={handleChange} />
                  </td>

                </tr>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Elbow Flexor Right</label>
                    <input id="Time_Between_Tests" name="Incontinence" type="number" value={inputValues.Incontinence} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Elbow Flexor Left</label>
                    <input id="Time_Between_Tests" name="Incontinence_Progress" type="number" value={inputValues.Incontinence_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Initial_Velocity">Wrist Flexor Left</label>
                    <input id="Storage" name="Storage_And_Voiding" value={inputValues.Storage_And_Voiding} onChange={handleChange}  type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Cadence">Wrist Flexor Right</label>
                    <input id="Initial_Cadence" name="Storage_Progress" value={inputValues.Storage_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Consequences">Pectoralis Major Right</label>
                    <input id="Consequences" name="Consequences" value={inputValues.Consequences} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="ConsequencesProgress">Pectoralis Major Left</label>
                    <input id="ConsequencesProgress" name="Consequences_Progress" value={inputValues.Consequences_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Quality">Biceps</label>
                    <input id="Quality" name="Quality_Of_Life" value={inputValues.Quality_Of_Life} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="QualityProgress">Pronator</label>
                    <input id="QualityProgress" name="Quality_Progress" value={inputValues.Quality_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Bladder">Knee Extensors</label>
                    <input id="Bladder" name="Bladder_Management" value={inputValues.Bladder_Management} onChange={handleChange} type="text" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Plantar Flexors</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Hip Flexion Right</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Hip Flexion Left</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>


                </tr>
                <tr>
                  <td>
                    <label htmlFor="Quality">Hip Extension Right</label>
                    <input id="Quality" name="Quality_Of_Life" value={inputValues.Quality_Of_Life} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="QualityProgress">Hip Extension Left</label>
                    <input id="QualityProgress" name="Quality_Progress" value={inputValues.Quality_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Bladder">Hip Abduction Right</label>
                    <input id="Bladder" name="Bladder_Management" value={inputValues.Bladder_Management} onChange={handleChange} type="text" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Hip Abduction Left</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Hip Adduction Right</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Hip Adduction Left</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>


                </tr>
                <tr>
                  <td>
                    <label htmlFor="Quality">Internal Rotation Left</label>
                    <input id="Quality" name="Quality_Of_Life" value={inputValues.Quality_Of_Life} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="QualityProgress">Internal Rotation Right</label>
                    <input id="QualityProgress" name="Quality_Progress" value={inputValues.Quality_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Bladder">External Rotation Right</label>
                    <input id="Bladder" name="Bladder_Management" value={inputValues.Bladder_Management} onChange={handleChange} type="text" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">External Rotation Left</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>
                 


                </tr>
                <tr>

                <td  colSpan={6} style={{textAlign:'center', justifyContent: 'center',marginTop:'10px'}}> 
                    <label className="treat" htmlFor="DaysForTreatment">Days Of Treatment</label>
                    <input style={{width:'30%',marginLeft:'10px'}} id="DaysForTreatment" name="Days_Of_Treatment" value={inputValues.Days_Of_Treatment} onChange={handleChange} type="number" />
                  </td>


                </tr>

              </tbody>
            </table>
            </div>
        )}
      </div>
      )}

{showButtons && (
        <div className="center">
          {selectedDiseases.map((disease, index) => (
            <button key={index} className={`B${index + 1}`} onClick={() => handleButtonClick(`B${index + 1}`)}>
              {disease.split(' ')[0]}
            </button>
          ))}
          
          {/* <button className="B1" onClick={handleButtonPress}>
            Auto Fill
          </button> */}
        </div>
      )}
 
      <div>

        {/* {showC1Inputs && (
          <div style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}>
             <button onClick={handleClick}>Run</button>
             {showInputs && (
                <div id="input-container"style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }} >
                     <table style={{ width: "100%" }}>
                            <tbody>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Hip Flexor Right</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Flexion" type="number" value={inputValues.Left_Shoulder_Flexion} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Hip Flexor Left</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Flexion_Progress" type="number" value={inputValues.Left_Shoulder_Flexion_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Knee Extensor Right</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Extension" type="number" value={inputValues.Left_Shoulder_Extension} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Knee Extensor Left</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Extension_Progress" type="number" value={inputValues.Left_Shoulder_Extension_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Ankle Dorsal Flexor Right</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Abduction" type="number" value={inputValues.Left_Shoulder_Abduction} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Ankle Dorsal Flexor Left</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Abduction_Progress" type="number" value={inputValues.Left_Shoulder_Abduction_Progress} onChange={handleChange} />
                  </td>

                </tr>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Long Toe Extensor Left</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Adduction" type="number" value={inputValues.Left_Shoulder_Adduction} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Long Toe Extensor Right</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Adduction_Progress" type="number" value={inputValues.Left_Shoulder_Adduction_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Initial_Velocity">Ankle Plantar Flexor Right</label>
                    <input name="Left_Shoulder_Internal_Rotation" value={inputValues.Left_Shoulder_Internal_Rotation} onChange={handleChange} id="Initial_Velocity" type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Cadence">Ankle Plantar Flexor Left</label>
                    <input id="Initial_Cadence" name="Left_Shoulder_Internal_Rotation_Progress" value={inputValues.Left_Shoulder_Internal_Rotation_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Stride_Length">Upper Limb Shoulder Flexion Right</label>
                    <input id="Initial_Stride_Length" name="Left_Shoulder_External_Rotation" value={inputValues.Left_Shoulder_External_Rotation} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Stride_Length">Upper Limb Shoulder Flexion Left</label>
                    <input id="Initial_Stride_Length" name="Left_Shoulder_External_Rotation_Progress" value={inputValues.Left_Shoulder_External_Rotation_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Left">Upper Limb Shoulder Extension Right</label>
                    <input id="Initial_Deviation_From_Ideal_Stance_Phase_Left" name="Left_Elbow_Joint_Flexion" value={inputValues.Left_Elbow_Joint_Flexion} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Right">Upper Limb Shoulder Extension Left</label>
                    <input id="Initial_Deviation_From_Ideal_Stance_Phase_Right" name="Left_Elbow_Joint_Flexion_Progress" value={inputValues.Left_Elbow_Joint_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Left">Upper Limb Shoulder Abduction Right</label>
                    <input id="Initial_Deviation_From_Ideal_Loading_Response_Left" name="Left_Elbow_Joint_Extension" value={inputValues.Left_Elbow_Joint_Extension} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Right">Upper Limb Shoulder Abduction Left</label>
                    <input id="Initial_Deviation_From_Ideal_Loading_Response_Right" name="Left_Elbow_Joint_Extension_Progress" value={inputValues.Left_Elbow_Joint_Extension_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Left">Upper Limb Shoulder Adduction Right</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Left" name="Left_Wrist_Joint_Flexion" value={inputValues.Left_Wrist_Joint_Flexion} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Left">Upper Limb Shoulder Adduction Left</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Left" name="Left_Wrist_Joint_Flexion_Progress" value={inputValues.Left_Wrist_Joint_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Upper Limb Shoulder Internal Rotation Left</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Wrist_Joint_Extension" value={inputValues.Left_Wrist_Joint_Extension} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Upper Limb Shoulder Internal Rotation Right</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Wrist_Joint_Extension_Progress" value={inputValues.Left_Wrist_Joint_Extension_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Upper Limb Shoulder External Rotation Right</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Flexion" value={inputValues.Left_Fingers_Flexion} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Shoulder External Rotation Left</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Flexion_Progress" value={inputValues.Left_Fingers_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Right">Upper Limb Elbow Flexion Right</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Right" name="Left_Fingers_Extension" value={inputValues.Left_Fingers_Extension} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Right">Upper Limb Elbow Flexion Left</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Right" name="Left_Fingers_Extension_Progress" value={inputValues.Left_Fingers_Extension_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Upper Limb Elbow Extension Right</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Upper Limb Elbow Extension Left</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Upper Limb Wrist Flexion Right</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Wrist Flexion Left</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Wrist Extension Right</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Wrist Extension Left</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
  
                <tr>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Upper Limb Finger Flexion Right</label>
  <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Upper Limb Finger Flexion Left</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Upper Limb Finger Extension Right</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Finger Extension Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Finger Abduction Right</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Upper Limb Finger Abduction Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Upper Limb Finger Adduction Right</label>
  <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Upper Limb Finger Adduction Left</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Hip Flexion Right</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Hip Flexion Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Hip Extension Right</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Hip Extension Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Lower Limb Hip Abduction Right</label>
  <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Lower Limb Hip Abduction Left</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Hip Adduction Right</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Hip Adduction Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Internal Rotation Right</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Internal Rotation Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Lower Limb External Rotation Right</label>
  <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Lower Limb External Rotation Left</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Knee Flexion Right</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Knee Flexion Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Knee Extension Right</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Knee Extension Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Lower Limb Ankle Plantar Flexion Right</label>
  <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Lower Limb Ankle Plantar Flexion Left</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Ankle Dorsal Flexion Right</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Ankle Dorsal Flexion Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Inversion Right</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Inversion Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Lower Limb Eversion Right</label>
  <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Lower Limb Eversion Left</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Toe Flexion Right</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Toe Flexion Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Toe Extension Right</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Toe Extension Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>
</tr>
<tr>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Lower Limb Toe Abduction Right</label>
  <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Lower Limb Toe Abduction Left</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
</td>


<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Lower Limb Toe Adduction Right</label>
  <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
</td>

<td>
  <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Lower Limb Toe Adduction Left</label>
  <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
</td>

</tr>
              </tbody>
            </table>
                </div>
            )}
          </div>
        )} */}
        {/* {showC2Inputs && (
          <div style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}>
        
            <table style={{ width: "100%" }}>
                            <tbody>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Hip Flexor Right</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Flexion" type="number" value={inputValues.Right_Shoulder_Flexion} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Observed</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Flexion_Progress" type="number" value={inputValues.Right_Shoulder_Flexion_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Hip Flexor Left</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Extension" type="number" value={inputValues.Right_Shoulder_Extension} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Observed</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Extension_Progress" type="number" value={inputValues.Right_Shoulder_Extension_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Knee Extensor Right</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Abduction" type="number" value={inputValues.Right_Shoulder_Abduction} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Observed</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Abduction_Progress" type="number" value={inputValues.Right_Shoulder_Abduction_Progress} onChange={handleChange} />
                  </td>

                </tr>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Knee Extensor Left</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Adduction" type="number" value={inputValues.Right_Shoulder_Adduction} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Observed</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Adduction_Progress" type="number" value={inputValues.Right_Shoulder_Adduction_Progress} onChange={handleChange} />
                  </td>
                  
                  <td>
                    <label htmlFor="Initial_Velocity">Ankle Dorsal Flexor Right</label>
                    <input name="Right_Shoulder_Internal_Rotation" value={inputValues.Right_Shoulder_Internal_Rotation} onChange={handleChange} id="Initial_Velocity" type="number" />
                  </td>
                  
                  <td>
                    <label htmlFor="Initial_Cadence">Progress Observed</label>
                    <input id="Initial_Cadence" name="Right_Shoulder_Internal_Rotation_Progress" value={inputValues.Right_Shoulder_Internal_Rotation_Progress} onChange={handleChange} type="number" />
                  </td>
                 
                  <td>
                    <label htmlFor="Initial_Stride_Length">Ankle Dorsal Flexor Left</label>
                    <input id="Initial_Stride_Length" name="Right_Shoulder_External_Rotation" value={inputValues.Right_Shoulder_External_Rotation} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Stride_Length">Progress Observed</label>
                    <input id="Initial_Stride_Length" name="Right_Shoulder_External_Rotation_Progress" value={inputValues.Right_Shoulder_External_Rotation_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Right">Long Toe Extensor Right</label>
                    <input id="Initial_Deviation_From_Ideal_Stance_Phase_Right" name="Right_Elbow_Joint_Flexion" value={inputValues.Right_Elbow_Joint_Flexion} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Right">Progress Observed</label>
                    <input id="Initial_Deviation_From_Ideal_Stance_Phase_Right" name="Right_Elbow_Joint_Flexion_Progress" value={inputValues.Right_Elbow_Joint_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Left">Long Toe Extensor Left</label>
                    <input id="Initial_Deviation_From_Ideal_Loading_Response_Left" name="Right_Elbow_Joint_Extension" value={inputValues.Right_Elbow_Joint_Extension} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Right">Progress Observed</label>
                    <input id="Initial_Deviation_From_Ideal_Loading_Response_Right" name="Right_Elbow_Joint_Extension_Progress" value={inputValues.Right_Elbow_Joint_Extension_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Left">Ankle Planter Flexor Right</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Left" name="Right_Wrist_Joint_Flexion" value={inputValues.Right_Wrist_Joint_Flexion} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Left">Progress Observed</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Left" name="Right_Wrist_Joint_Flexion_Progress" value={inputValues.Right_Wrist_Joint_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>
               </tr>
               <tr>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Ankle Planter Flexor Left</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Right_Wrist_Joint_Extension" value={inputValues.Right_Wrist_Joint_Extension} onChange={handleChange} type="number" />
                  </td>
                 
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Progress Observed</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Right_Wrist_Joint_Extension_Progress" value={inputValues.Right_Wrist_Joint_Extension_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Right Fingers Flexion</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Right_Fingers_Flexion" value={inputValues.Right_Fingers_Flexion} onChange={handleChange} type="number" />
                  </td>
                 
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Progress Observed</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Right_Fingers_Flexion_Progress" value={inputValues.Right_Fingers_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Right">Right Fingers Extension</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Right" name="Right_Fingers_Extension" value={inputValues.Right_Fingers_Extension} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Right">Progress Observed</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Right" name="Right_Fingers_Extension_Progress" value={inputValues.Right_Fingers_Extension_Progress} onChange={handleChange} type="number" />
                  </td>
               </tr>
<tr>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Right Fingers Abduction</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Right_Fingers_Abduction" value={inputValues.Right_Fingers_Abduction} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Progress Observed</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Right_Fingers_Abduction_Progress" value={inputValues.Right_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Right Fingers Adduction</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Right_Fingers_Adduction" value={inputValues.Right_Fingers_Adduction} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Progress Observed</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Right_Fingers_Adduction_Progress" value={inputValues.Right_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        )} */}
        {/* {showC3Inputs && (
          <div style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}>
    
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Ankle Plantar Left</label>
                    <input id="Time_Between_Tests" name="Fist_Score" type="number" value={inputValues.Fist_Score} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Ankle Plantar Right</label>
                    <input id="Time_Between_Tests" name="Fist_Progress" type="number" value={inputValues.Fist_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Hamstring Left</label>
                    <input id="Time_Between_Tests" name="WISCI" type="number" value={inputValues.WISCI} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Hamstring Right</label>
                    <input id="Time_Between_Tests" name="WISCI_Progress" type="number" value={inputValues.WISCI_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Adductor Right</label>
                    <input id="Time_Between_Tests" name="NBD" type="number" value={inputValues.NBD} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Adductor Left</label>
                    <input id="Time_Between_Tests" name="NBD_Progress" type="number" value={inputValues.NBD_Progress} onChange={handleChange} />
                  </td>

                </tr>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Elbow Flexor Right</label>
                    <input id="Time_Between_Tests" name="Incontinence" type="number" value={inputValues.Incontinence} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Elbow Flexor Left</label>
                    <input id="Time_Between_Tests" name="Incontinence_Progress" type="number" value={inputValues.Incontinence_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Initial_Velocity">Wrist Flexor Left</label>
                    <input id="Storage" name="Storage_And_Voiding" value={inputValues.Storage_And_Voiding} onChange={handleChange}  type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Cadence">Wrist Flexor Right</label>
                    <input id="Initial_Cadence" name="Storage_Progress" value={inputValues.Storage_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Consequences">Pectoralis Major Right</label>
                    <input id="Consequences" name="Consequences" value={inputValues.Consequences} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="ConsequencesProgress">Pectoralis Major Left</label>
                    <input id="ConsequencesProgress" name="Consequences_Progress" value={inputValues.Consequences_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Quality">Biceps</label>
                    <input id="Quality" name="Quality_Of_Life" value={inputValues.Quality_Of_Life} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="QualityProgress">Pronator</label>
                    <input id="QualityProgress" name="Quality_Progress" value={inputValues.Quality_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Bladder">Knee Extensors</label>
                    <input id="Bladder" name="Bladder_Management" value={inputValues.Bladder_Management} onChange={handleChange} type="text" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Plantar Flexors</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Hip Flexion Right</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Hip Flexion Left</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>


                </tr>
                <tr>
                  <td>
                    <label htmlFor="Quality">Hip Extension Right</label>
                    <input id="Quality" name="Quality_Of_Life" value={inputValues.Quality_Of_Life} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="QualityProgress">Hip Extension Left</label>
                    <input id="QualityProgress" name="Quality_Progress" value={inputValues.Quality_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Bladder">Hip Abduction Right</label>
                    <input id="Bladder" name="Bladder_Management" value={inputValues.Bladder_Management} onChange={handleChange} type="text" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Hip Abduction Left</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Hip Adduction Right</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Hip Adduction Left</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>


                </tr>
                <tr>
                  <td>
                    <label htmlFor="Quality">Internal Rotation Left</label>
                    <input id="Quality" name="Quality_Of_Life" value={inputValues.Quality_Of_Life} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="QualityProgress">Internal Rotation Right</label>
                    <input id="QualityProgress" name="Quality_Progress" value={inputValues.Quality_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Bladder">External Rotation Right</label>
                    <input id="Bladder" name="Bladder_Management" value={inputValues.Bladder_Management} onChange={handleChange} type="text" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">External Rotation Left</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>
                 


                </tr>
                <tr>

                <td  colSpan={6} style={{textAlign:'center', justifyContent: 'center',marginTop:'10px'}}> 
                    <label className="treat" htmlFor="DaysForTreatment">Days Of Treatment</label>
                    <input style={{width:'30%',marginLeft:'10px'}} id="DaysForTreatment" name="Days_Of_Treatment" value={inputValues.Days_Of_Treatment} onChange={handleChange} type="number" />
                  </td>


                </tr>

              </tbody>
            </table>
            <div style={{  marginTop: "20px",marginBottom: "40px", display: "flex",alignItems: "center",justifyContent: "space-between" }}>
            <button  onClick={handleRedirect}>
              Submit Data
            </button>
            <div>
      <button onClick={openModal}>Process</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <video width="700" height="500" controls autoPlay>
              <source src="/90per.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
           
          </div>
        </div>
      )}
    </div>
</div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Droperdowns;
