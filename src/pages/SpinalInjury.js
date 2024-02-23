import React, { useState } from "react";
import Health from "../assets/outputimage2.jpg";
import "../styles/Monoplegia.css";
import { useHistory,Link } from "react-router-dom";
import axios from 'axios';
const Dropdowns = () => {
  const [cType, setCType] = useState("");
  const [tType, setTType] = useState("");
  const [isCTypeDisabled, setIsCTypeDisabled] = useState(false);
  const [isTTypeDisabled, setIsTTypeDisabled] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showC1Inputs, setShowC1Inputs] = useState(false);
  const [showC2Inputs, setShowC2Inputs] = useState(false);
  const [showC3Inputs, setShowC3Inputs] = useState(false);
  const [inputFields, setInputFields] = useState({
    MMT: "",
    MAS: "",
    Bowel: "",
    Bladder: "",
    Gas: "",
    Test: "",
    Boss: "",
    Lady: ""

  });
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
      setTType(""); // Reset T-Type value
      setIsTTypeDisabled(true);
      setIsCTypeDisabled(false); // Enable C-Type dropdown
    } else {
      setIsTTypeDisabled(false);
    }
    if (value === "C1") {
      // If "C1" is selected, set showButtons state to true
      setShowButtons(true);
    } else {
      // If another option is selected, hide the buttons
      setShowButtons(false);
    }

    setCType(value);

    // Reset input fields when C-Type changes
    setInputFields({
      MMT: "",
      MAS: "",
      Bowel: "",
      Bladder: "",
      Gas: "",
      Test: "",
      Boss: "",
      Lady: ""
    });
  };

  const handleTTypeChange = (e) => {
    const value = e.target.value;
    setTType(value);

    // Disable T-Type dropdown when C-Type is selected
    if (value) {
      setCType(""); // Reset C-Type value
      setIsCTypeDisabled(true);
      setIsTTypeDisabled(false); // Enable T-Type dropdown
    } else {
      setIsCTypeDisabled(false);
    }

    setTType(value);

    // Reset input fields when T-Type changes
    setInputFields({
      MMT: "",
      MAS: "",
      Bowel: "",
      Bladder: "",
      Gas: "",
      Test: "",
      Boss: "",
      Lady: ""
    });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };
  const handleRedirect = () => {

    console.log('Sending data to Flask server:', inputValues);
    axios.post('http://localhost:5000/process_data', { data: inputValues })
      .then(response => {
        console.log('Server response:', response.data);
        history.push({
          pathname: '/treatment/Subtreatments',
          state: { updatedData: response.data },
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const [inputValues, setInputValues] = useState({
Left_Shoulder_Flexion:'',
Left_Shoulder_Flexion_Progress:'',
Left_Shoulder_Extension:'',
Left_Shoulder_Extension_Progress:'',
Left_Shoulder_Abduction:'',
Left_Shoulder_Abduction_Progress:'',
Left_Shoulder_Adduction:'',
Left_Shoulder_Adduction_Progress:'',
Left_Shoulder_Internal_Rotation:'',
Left_Shoulder_Internal_Rotation_Progress:'',
Left_Shoulder_External_Rotation:'',
Left_Shoulder_External_Rotation_Progress:'',
Left_Elbow_Joint_Flexion:'',
Left_Elbow_Joint_Flexion_Progress:'',
Left_Elbow_Joint_Extension:'',
Left_Elbow_Joint_Extension_Progress:'',
Left_Wrist_Joint_Flexion:'',
Left_Wrist_Joint_Flexion_Progress:'',
Left_Wrist_Joint_Extension:'',
Left_Wrist_Joint_Extension_Progress:'',
Left_Fingers_Flexion:'',
Left_Fingers_Flexion_Progress:'',
Left_Fingers_Extension:'',
Left_Fingers_Extension_Progress:'',
Left_Fingers_Abduction:'',
Left_Fingers_Abduction_Progress:'',
Left_Fingers_Adduction:'',
Left_Fingers_Adduction_Progress:'',
Right_Shoulder_Flexion:'',
Right_Shoulder_Flexion_Progress:'',
Right_Shoulder_Extension:'',
Right_Shoulder_Extension_Progress:'',
Right_Shoulder_Abduction:'',
Right_Shoulder_Abduction_Progress:'',
Right_Shoulder_Adduction:'',
Right_Shoulder_Adduction_Progress:'',
Right_Shoulder_Internal_Rotation:'',
Right_Shoulder_Internal_Rotation_Progress:'',
Right_Shoulder_External_Rotation:'',
Right_Shoulder_External_Rotation_Progress:'',
Right_Elbow_Joint_Flexion:'',
Right_Elbow_Joint_Flexion_Progress:'',
Right_Elbow_Joint_Extension:'',
Right_Elbow_Joint_Extension_Progress:'',
Right_Wrist_Joint_Flexion:'',
Right_Wrist_Joint_Flexion_Progress:'',
Right_Wrist_Joint_Extension:'',
Right_Wrist_Joint_Extension_Progress:'',
Right_Fingers_Flexion:'',
Right_Fingers_Flexion_Progress:'',
Right_Fingers_Extension:'',
Right_Fingers_Extension_Progress:'',
Right_Fingers_Abduction:'',
Right_Fingers_Abduction_Progress:'',
Right_Fingers_Adduction:'',
Right_Fingers_Adduction_Progress:'',
Fist_Score:'',
Fist_Progress:'',
WISCI:'',
WISCI_Progress:'',
NBD:'',
NBD_Progress:'',
Incontinence:'',
Incontinence_Progress:'',
Storage_And_Voiding:'',
Storage_Progress:'',
Consequences:'',
Consequences_Progress:'',
Quality_Of_Life:'',
Quality_Progress:'',
Bladder_Management:'',
Bladder_Management_Progress:'',
Days_Of_Treatment:''



  });


  return (
    <div>
      <div className="center">
        <label htmlFor="cType">C-Type:</label>
        <select id="cType" value={cType} onChange={handleCTypeChange} disabled={isCTypeDisabled}>
          <option value="">Select C-Type</option>
          <option value="C1">C3C4</option>
          <option value="C2">C6C7(ASIA-A)</option>
          <option value="C3">C6C7</option>
          <option value="C4">C3C4(ASIA-A)</option>
        </select>

        <label htmlFor="tType">T-Type:</label>
        <select id="tType" value={tType} onChange={handleTTypeChange} disabled={isTTypeDisabled}>
          <option value="">Select T-Type</option>
          <option value="T1">T10T11T12</option>
          <option value="T2">T10T11T12(ASIA-A)</option>
          <option value="T3">T6T7</option>
          <option value="T4">T6T7(ASIA-A)</option>
        </select>



      </div>
      {showButtons && (
        <div className="center">
          <button onClick={() => handleButtonClick("B1")}>Left Upper Limb</button>
          <button onClick={() => handleButtonClick("B2")}>Right Upper Limb</button>
          <button onClick={() => handleButtonClick("B3")}>Bowl & Bladder</button>
        </div>
      )}

      <div>

        {showC1Inputs && (
          <div style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Left Shoulder Flexion</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Flexion" type="number" value={inputValues.Left_Shoulder_Flexion} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Flexion_Progress" type="number" value={inputValues.Left_Shoulder_Flexion_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Left Shoulder Extension</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Extension" type="number" value={inputValues.Left_Shoulder_Extension} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Extension_Progress" type="number" value={inputValues.Left_Shoulder_Extension_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Left Shoulder Abduction</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Abduction" type="number" value={inputValues.Left_Shoulder_Abduction} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Abduction_Progress" type="number" value={inputValues.Left_Shoulder_Abduction_Progress} onChange={handleChange} />
                  </td>

                </tr>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Left Shoulder Adduction</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Adduction" type="number" value={inputValues.Left_Shoulder_Adduction} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="Left_Shoulder_Adduction_Progress" type="number" value={inputValues.Left_Shoulder_Adduction_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Initial_Velocity">Left Shoulder Internal Rotation</label>
                    <input name="Left_Shoulder_Internal_Rotation" value={inputValues.Left_Shoulder_Internal_Rotation} onChange={handleChange} id="Initial_Velocity" type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Cadence">Progress Expecting</label>
                    <input id="Initial_Cadence" name="Left_Shoulder_Internal_Rotation_Progress" value={inputValues.Left_Shoulder_Internal_Rotation_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Stride_Length">Left Shoulder External Rotation</label>
                    <input id="Initial_Stride_Length" name="Left_Shoulder_External_Rotation" value={inputValues.Left_Shoulder_External_Rotation} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Stride_Length">Progress Expecting</label>
                    <input id="Initial_Stride_Length" name="Left_Shoulder_External_Rotation_Progress" value={inputValues.Left_Shoulder_External_Rotation_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Left">Left Elbow Joint Flexion</label>
                    <input id="Initial_Deviation_From_Ideal_Stance_Phase_Left" name="Left_Elbow_Joint_Flexion" value={inputValues.Left_Elbow_Joint_Flexion} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Right">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Stance_Phase_Right" name="Left_Elbow_Joint_Flexion_Progress" value={inputValues.Left_Elbow_Joint_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Left">Left Elbow Joint Extension</label>
                    <input id="Initial_Deviation_From_Ideal_Loading_Response_Left" name="Left_Elbow_Joint_Extension" value={inputValues.Left_Elbow_Joint_Extension} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Right">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Loading_Response_Right" name="Left_Elbow_Joint_Extension_Progress" value={inputValues.Left_Elbow_Joint_Extension_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Left">Left Wrist Joint Flexion</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Left" name="Left_Wrist_Joint_Flexion" value={inputValues.Left_Wrist_Joint_Flexion} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Left">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Left" name="Left_Wrist_Joint_Flexion_Progress" value={inputValues.Left_Wrist_Joint_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Left Wrist Joint Extension</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Wrist_Joint_Extension" value={inputValues.Left_Wrist_Joint_Extension} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Wrist_Joint_Extension_Progress" value={inputValues.Left_Wrist_Joint_Extension_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Left Fingers Flexion</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Flexion" value={inputValues.Left_Fingers_Flexion} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Flexion_Progress" value={inputValues.Left_Fingers_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Right">Left Fingers Extension</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Right" name="Left_Fingers_Extension" value={inputValues.Left_Fingers_Extension} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Right">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Right" name="Left_Fingers_Extension_Progress" value={inputValues.Left_Fingers_Extension_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Left Fingers Abduction</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Left_Fingers_Abduction" value={inputValues.Left_Fingers_Abduction} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Left_Fingers_Abduction_Progress" value={inputValues.Left_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Left Fingers Adduction</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Left_Fingers_Adduction" value={inputValues.Left_Fingers_Adduction} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Left_Fingers_Adduction_Progress" value={inputValues.Left_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        )}
        {showC2Inputs && (
          <div style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}>
        
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Right Shoulder Flexion</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Flexion" type="number" value={inputValues.Right_Shoulder_Flexion} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Flexion_Progress" type="number" value={inputValues.Right_Shoulder_Flexion_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Right Shoulder Extension</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Extension" type="number" value={inputValues.Right_Shoulder_Extension} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Extension_Progress" type="number" value={inputValues.Right_Shoulder_Extension_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Right Shoulder Abduction</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Abduction" type="number" value={inputValues.Right_Shoulder_Abduction} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Abduction_Progress" type="number" value={inputValues.Right_Shoulder_Abduction_Progress} onChange={handleChange} />
                  </td>

                </tr>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Right Shoulder Adduction</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Adduction" type="number" value={inputValues.Right_Shoulder_Adduction} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="Right_Shoulder_Adduction_Progress" type="number" value={inputValues.Right_Shoulder_Adduction_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Initial_Velocity">Right Shoulder Internal Rotation</label>
                    <input name="Right_Shoulder_Internal_Rotation" value={inputValues.Right_Shoulder_Internal_Rotation} onChange={handleChange} id="Initial_Velocity" type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Cadence">Progress Expecting</label>
                    <input id="Initial_Cadence" name="Right_Shoulder_Internal_Rotation_Progress" value={inputValues.Right_Shoulder_Internal_Rotation_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Stride_Length">Right Shoulder External Rotation</label>
                    <input id="Initial_Stride_Length" name="Right_Shoulder_External_Rotation" value={inputValues.Right_Shoulder_External_Rotation} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Stride_Length">Progress Expecting</label>
                    <input id="Initial_Stride_Length" name="Right_Shoulder_External_Rotation_Progress" value={inputValues.Right_Shoulder_External_Rotation_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Right">Right Elbow Joint Flexion</label>
                    <input id="Initial_Deviation_From_Ideal_Stance_Phase_Right" name="Right_Elbow_Joint_Flexion" value={inputValues.Right_Elbow_Joint_Flexion} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Right">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Stance_Phase_Right" name="Right_Elbow_Joint_Flexion_Progress" value={inputValues.Right_Elbow_Joint_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Left">Right Elbow Joint Extension</label>
                    <input id="Initial_Deviation_From_Ideal_Loading_Response_Left" name="Right_Elbow_Joint_Extension" value={inputValues.Right_Elbow_Joint_Extension} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Right">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Loading_Response_Right" name="Right_Elbow_Joint_Extension_Progress" value={inputValues.Right_Elbow_Joint_Extension_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Left">Right Wrist Joint Flexion</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Left" name="Right_Wrist_Joint_Flexion" value={inputValues.Right_Wrist_Joint_Flexion} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Left">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Left" name="Right_Wrist_Joint_Flexion_Progress" value={inputValues.Right_Wrist_Joint_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Right Wrist Joint Extension</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Right_Wrist_Joint_Extension" value={inputValues.Right_Wrist_Joint_Extension} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Right_Wrist_Joint_Extension_Progress" value={inputValues.Right_Wrist_Joint_Extension_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Right Fingers Flexion</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Right_Fingers_Flexion" value={inputValues.Right_Fingers_Flexion} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Right_Fingers_Flexion_Progress" value={inputValues.Right_Fingers_Flexion_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Right">Right Fingers Extension</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Right" name="Right_Fingers_Extension" value={inputValues.Right_Fingers_Extension} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Right">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Right" name="Right_Fingers_Extension_Progress" value={inputValues.Right_Fingers_Extension_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Right Fingers Abduction</label>
                    <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Right_Fingers_Abduction" value={inputValues.Right_Fingers_Abduction} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Right_Fingers_Abduction_Progress" value={inputValues.Right_Fingers_Abduction_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Right Fingers Adduction</label>
                    <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right" name="Right_Fingers_Adduction" value={inputValues.Right_Fingers_Adduction} onChange={handleChange} type="number" />
                  </td>

                  <td>
                    <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Progress Expecting</label>
                    <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Right_Fingers_Adduction_Progress" value={inputValues.Right_Fingers_Adduction_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        )}
        {showC3Inputs && (
          <div style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}>
    
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Fist Score</label>
                    <input id="Time_Between_Tests" name="Fist_Score" type="number" value={inputValues.Fist_Score} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="Fist_Progress" type="number" value={inputValues.Fist_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">WISCI II</label>
                    <input id="Time_Between_Tests" name="WISCI" type="number" value={inputValues.WISCI} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="WISCI_Progress" type="number" value={inputValues.WISCI_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">NBD Score</label>
                    <input id="Time_Between_Tests" name="NBD" type="number" value={inputValues.NBD} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="NBD_Progress" type="number" value={inputValues.NBD_Progress} onChange={handleChange} />
                  </td>

                </tr>
                <tr>
                  <td>
                    <label htmlFor="Time_Between_Tests">Incontinence</label>
                    <input id="Time_Between_Tests" name="Incontinence" type="number" value={inputValues.Incontinence} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Time_Between_Tests">Progress Expecting</label>
                    <input id="Time_Between_Tests" name="Incontinence_Progress" type="number" value={inputValues.Incontinence_Progress} onChange={handleChange} />
                  </td>
                  <td>
                    <label htmlFor="Initial_Velocity">Storage And Voiding</label>
                    <input id="Storage" name="Storage_And_Voiding" value={inputValues.Storage_And_Voiding} onChange={handleChange}  type="number" />
                  </td>
                  <td>
                    <label htmlFor="Initial_Cadence">Progress Expecting</label>
                    <input id="Initial_Cadence" name="Storage_Progress" value={inputValues.Storage_Progress} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="Consequences">Consequences</label>
                    <input id="Consequences" name="Consequences" value={inputValues.Consequences} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="ConsequencesProgress">Progress Expecting</label>
                    <input id="ConsequencesProgress" name="Consequences_Progress" value={inputValues.Consequences_Progress} onChange={handleChange} type="number" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Quality">Quality Of Life</label>
                    <input id="Quality" name="Quality_Of_Life" value={inputValues.Quality_Of_Life} onChange={handleChange} type="number" />
                  </td>
                  <td>
                    <label htmlFor="QualityProgress">Progress Expecting</label>
                    <input id="QualityProgress" name="Quality_Progress" value={inputValues.Quality_Progress} onChange={handleChange} type="number" />
                  </td>


                  <td>
                    <label htmlFor="Bladder">Bladder Management</label>
                    <input id="Bladder" name="Bladder_Management" value={inputValues.Bladder_Management} onChange={handleChange} type="text" />
                  </td>
                  <td>
                    <label htmlFor="BladderProgress">Progress Expecting</label>
                    <input id="BladderProgress" name="Bladder_Management_Progress" value={inputValues.Bladder_Management_Progress} onChange={handleChange} type="number" />
                  </td>


                </tr>
                <tr>

                  <td>
                    <label htmlFor="DaysForTreatment">Days Of Treatment</label>
                    <input id="DaysForTreatment" name="Days_Of_Treatment" value={inputValues.Days_Of_Treatment} onChange={handleChange} type="number" />
                  </td>


                </tr>

              </tbody>
            </table>
            <button  onClick={handleRedirect}>
              Submit Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdowns;
