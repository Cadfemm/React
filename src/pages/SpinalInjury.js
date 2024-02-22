import React, { useState } from "react";
import "../styles/Monoplegia.css";
const Dropdowns = () => {
  const [cType, setCType] = useState("");
  const [tType, setTType] = useState("");
  const [isCTypeDisabled, setIsCTypeDisabled] = useState(false);
  const [isTTypeDisabled, setIsTTypeDisabled] = useState(false);
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
  const C1 = [
    "Name", "Diagnosis", "Date", "Age", "Gender", 
    "Fist Score", "WISCII", "ASIA Scale", "Light Touch Sensory", "Pin Prick Sensory", 
    "Volutary Anal Contraction", "Deep Anal Pressure", "Hip Flexor", "Knee Extensor", "Ankle Dorsiflexor", 
    "InputField16", "InputField17", "InputField18", "InputField19", "InputField20", 
    "InputField21", "InputField22", "InputField23", "InputField24", "InputField25", 
    "InputField26", "InputField27", "InputField28", "InputField29", "InputField30"
  ];
  const C2 = [
    "InputC2", "InputField2", "InputField3", "InputField4", "InputField5", 
    "InputField6", "InputField7", "InputField8", "InputField9", "InputField10", 
    "InputField11", "InputField12", "InputField13", "InputField14", "InputField15", 
    "InputField16", "InputField17", "InputField18", "InputField19", "InputField20", 
    "InputField21", "InputField22", "InputField23", "InputField24", "InputField25", 
    "InputField26", "InputField27", "InputField28", "InputField29", "InputField30"
  ];
  const C3 = [
    "InputC3", "InputField2", "InputField3", "InputField4", "InputField5", 
    "InputField6", "InputField7", "InputField8", "InputField9", "InputField10", 
    "InputField11", "InputField12", "InputField13", "InputField14", "InputField15", 
    "InputField16", "InputField17", "InputField18", "InputField19", "InputField20", 
    "InputField21", "InputField22", "InputField23", "InputField24", "InputField25", 
    "InputField26", "InputField27", "InputField28", "InputField29", "InputField30"
  ];
  const C4 = [
    "InputC4", "InputField2", "InputField3", "InputField4", "InputField5", 
    "InputField6", "InputField7", "InputField8", "InputField9", "InputField10", 
    "InputField11", "InputField12", "InputField13", "InputField14", "InputField15", 
    "InputField16", "InputField17", "InputField18", "InputField19", "InputField20", 
    "InputField21", "InputField22", "InputField23", "InputField24", "InputField25", 
    "InputField26", "InputField27", "InputField28", "InputField29", "InputField30"
  ];
  const T1 = [
    "InputT1", "InputField2", "InputField3", "InputField4", "InputField5", 
    "InputField6", "InputField7", "InputField8", "InputField9", "InputField10", 
    "InputField11", "InputField12", "InputField13", "InputField14", "InputField15", 
    "InputField16", "InputField17", "InputField18", "InputField19", "InputField20", 
    "InputField21", "InputField22", "InputField23", "InputField24", "InputField25", 
    "InputField26", "InputField27", "InputField28", "InputField29", "InputField30"
  ];
  const T2 = [
    "InputT2", "InputField2", "InputField3", "InputField4", "InputField5", 
    "InputField6", "InputField7", "InputField8", "InputField9", "InputField10", 
    "InputField11", "InputField12", "InputField13", "InputField14", "InputField15", 
    "InputField16", "InputField17", "InputField18", "InputField19", "InputField20", 
    "InputField21", "InputField22", "InputField23", "InputField24", "InputField25", 
    "InputField26", "InputField27", "InputField28", "InputField29", "InputField30"
  ];
  const T3 = [
    "InputT3", "InputField2", "InputField3", "InputField4", "InputField5", 
    "InputField6", "InputField7", "InputField8", "InputField9", "InputField10", 
    "InputField11", "InputField12", "InputField13", "InputField14", "InputField15", 
    "InputField16", "InputField17", "InputField18", "InputField19", "InputField20", 
    "InputField21", "InputField22", "InputField23", "InputField24", "InputField25", 
    "InputField26", "InputField27", "InputField28", "InputField29", "InputField30"
  ];
  const [inputValues, setInputValues] = useState({
    Diabetic:'',
    Smoking:'',
    Alcoholic:'',
    Additional_Support:'',
    Additional_Condition:'',
    Additional_Treatment_Given:'',
    Gender:'',
    Age:'',
    Time_Between_Tests:'',
    Initial_Velocity:'',
    Initial_Cadence:'',
    Initial_Stride_Length:'',
    Initial_Deviation_From_Ideal_Stance_Phase_Left:'',
    Initial_Deviation_From_Ideal_Stance_Phase_Right:'',
    Initial_Deviation_From_Ideal_Loading_Response_Left:'',
    Initial_Deviation_From_Ideal_Loading_Response_Right:'',
    Initial_Deviation_From_Ideal_Single_Support_Left:'',
    Initial_Deviation_From_Ideal_Single_Support_Right:'',
    Initial_Deviation_From_Ideal_Pre_Swing_Left:'',
    Initial_Deviation_From_Ideal_Pre_Swing_Right:'',
    Initial_Deviation_From_Ideal_Swing_Left:'',
    Initial_Deviation_From_Ideal_Swing_Right:''


  }); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const T4 = [
    "InputT4", "InputField2", "InputField3", "InputField4", "InputField5", 
    "InputField6", "InputField7", "InputField8", "InputField9", "InputField10", 
    "InputField11", "InputField12", "InputField13", "InputField14", "InputField15", 
    "InputField16", "InputField17", "InputField18", "InputField19", "InputField20", 
    "InputField21", "InputField22", "InputField23", "InputField24", "InputField25", 
    "InputField26", "InputField27", "InputField28", "InputField29", "InputField30"
  ];
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
      <div>
        
        {cType === "C1" && (
        <div style={{ marginBottom: "20px",padding:"10px",marginTop:"40px" }}>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>     
            <td>
                <label htmlFor="Time_Between_Tests">Time Between Tests</label>
                <input id="Time_Between_Tests" name = "Time_Between_Tests" type="number" value={inputValues.Time_Between_Tests}   onChange={handleChange}/>
              </td>
              <td>
                <label htmlFor="Time_Between_Tests">Time Between Tests</label>
                <input id="Time_Between_Tests" name = "Time_Between_Tests" type="number" value={inputValues.Time_Between_Tests}   onChange={handleChange}/>
              </td>
              <td>
                <label htmlFor="Time_Between_Tests">Time Between Tests</label>
                <input id="Time_Between_Tests" name = "Time_Between_Tests" type="number" value={inputValues.Time_Between_Tests}   onChange={handleChange}/>
              </td>
              <td>
                <label htmlFor="Time_Between_Tests">Time Between Tests</label>
                <input id="Time_Between_Tests" name = "Time_Between_Tests" type="number" value={inputValues.Time_Between_Tests}   onChange={handleChange}/>
              </td>
              <td>
                <label htmlFor="Time_Between_Tests">Time Between Tests</label>
                <input id="Time_Between_Tests" name = "Time_Between_Tests" type="number" value={inputValues.Time_Between_Tests}   onChange={handleChange}/>
              </td>
              

              </tr>
              <tr>
              <td>
                <label htmlFor="Time_Between_Tests">Time Between Tests</label>
                <input id="Time_Between_Tests" name = "Time_Between_Tests" type="number" value={inputValues.Time_Between_Tests}   onChange={handleChange}/>
              </td>
              <td>
                <label htmlFor="Time_Between_Tests">Time Between Tests</label>
                <input id="Time_Between_Tests" name = "Time_Between_Tests" type="number" value={inputValues.Time_Between_Tests}   onChange={handleChange}/>
              </td>
              <td>
                <label htmlFor="Initial_Velocity">Initial Velocity</label>
                <input name="Initial_Velocity" value={inputValues.Initial_Velocity} onChange={handleChange}  id="Initial_Velocity" type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Cadence">Initial Cadence</label>
                <input id="Initial_Cadence" name="Initial_Cadence" value={inputValues.Initial_Cadence} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Stride_Length">Initial Stride Length</label>
                <input id="Initial_Stride_Length" name="Initial_Stride_Length" value={inputValues.Initial_Stride_Length} onChange={handleChange} type="number"/>
              </td>
              </tr>
              <tr>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Left">Initial Deviation From Ideal Stance Phase Left</label>
                <input id="Initial_Deviation_From_Ideal_Stance_Phase_Left" name="Initial_Deviation_From_Ideal_Stance_Phase_Left" value={inputValues.Initial_Deviation_From_Ideal_Stance_Phase_Left} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Stance_Phase_Right">Initial Deviation From Ideal Stance Phase Right</label>
                <input id="Initial_Deviation_From_Ideal_Stance_Phase_Right" name="Initial_Deviation_From_Ideal_Stance_Phase_Right" value={inputValues.Initial_Deviation_From_Ideal_Stance_Phase_Right} onChange={handleChange} type="number" />
              </td>
              
           
            <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Left">Initial Deviation From Ideal Loading Response Left</label>
                <input id="Initial_Deviation_From_Ideal_Loading_Response_Left" name="Initial_Deviation_From_Ideal_Loading_Response_Left" value={inputValues.Initial_Deviation_From_Ideal_Loading_Response_Left} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Loading_Response_Right">Initial Deviation From Ideal Loading Response Right</label>
                <input id="Initial_Deviation_From_Ideal_Loading_Response_Right" name="Initial_Deviation_From_Ideal_Loading_Response_Right" value={inputValues.Initial_Deviation_From_Ideal_Loading_Response_Right} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Left">Initial Deviation From Ideal Single Support Left</label>
                <input id="Initial_Deviation_From_Ideal_Single_Support_Left" name="Initial_Deviation_From_Ideal_Single_Support_Left" value={inputValues.Initial_Deviation_From_Ideal_Single_Support_Left} onChange={handleChange} type="number"/>
              </td>
              </tr>
              <tr>

              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Single_Support_Right">Initial Deviation From Ideal Single Support Right</label>
                <input id="Initial_Deviation_From_Ideal_Single_Support_Right" name="Initial_Deviation_From_Ideal_Single_Support_Right" value={inputValues.Initial_Deviation_From_Ideal_Single_Support_Right} onChange={handleChange} type="number"/>
              </td>
              
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Left">Initial Deviation From Ideal Pre Swing Left</label>
                <input id="Initial_Deviation_From_Ideal_Pre_Swing_Left" name="Initial_Deviation_From_Ideal_Pre_Swing_Left" value={inputValues.Initial_Deviation_From_Ideal_Pre_Swing_Left} onChange={handleChange} type="number"/>
              </td>
             
             
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Pre_Swing_Right">Initial Deviation From Ideal Pre Swing Right</label>
                <input id="Initial_Deviation_From_Ideal_Pre_Swing_Right"name="Initial_Deviation_From_Ideal_Pre_Swing_Right" value={inputValues.Initial_Deviation_From_Ideal_Pre_Swing_Right} onChange={handleChange} type="number" />
              </td>
              
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Swing_Left">Initial Deviation From Ideal Swing Left</label>
                <input id="Initial_Deviation_From_Ideal_Swing_Left" name="Initial_Deviation_From_Ideal_Swing_Left" value={inputValues.Initial_Deviation_From_Ideal_Swing_Left} onChange={handleChange} type="number" />
              </td>
              <td>
                <label htmlFor="Initial_Deviation_From_Ideal_Swing_Right">Initial Deviation From Ideal Swing Right</label>
                <input id="Initial_Deviation_From_Ideal_Swing_Right" name="Initial_Deviation_From_Ideal_Swing_Right" value={inputValues.Initial_Deviation_From_Ideal_Swing_Right} onChange={handleChange} type="number" />
              </td>
            </tr>
           

          </tbody>
        </table>
      </div>
        )}
        {cType === "C2" && (
                               <div style={{ display: "flex", flexDirection: "column" }}>
                               {[...Array(6)].map((_, rowIndex) => (
                                 <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>
                                   {C2.slice(rowIndex * 5, (rowIndex + 1) * 5).map((fieldName, index) => (
                                     <div key={index} style={{ marginRight: "10px" }}>
                                       <label htmlFor={fieldName}>{fieldName}</label>
                                       <input
                                         type="text"
                                         id={fieldName}
                                         name={fieldName}
                                         value={inputFields[fieldName]}
                                         onChange={handleInputChange}
                                         
                                       />
                                     </div>
                                   ))}
                                 </div>
                               ))}
                             </div>
        )}
        {cType === "C3" && (
                               <div style={{ display: "flex", flexDirection: "column" }}>
                               {[...Array(6)].map((_, rowIndex) => (
                                 <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>
                                   {C3.slice(rowIndex * 5, (rowIndex + 1) * 5).map((fieldName, index) => (
                                     <div key={index} style={{ marginRight: "10px" }}>
                                       <label htmlFor={fieldName}>{fieldName}</label>
                                       <input
                                         type="text"
                                         id={fieldName}
                                         name={fieldName}
                                         value={inputFields[fieldName]}
                                         onChange={handleInputChange}
                                         
                                       />
                                     </div>
                                   ))}
                                 </div>
                               ))}
                             </div>
        )}
        {cType === "C4" && (
                              <div style={{ display: "flex", flexDirection: "column" }}>
                              {[...Array(6)].map((_, rowIndex) => (
                                <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>
                                  {C4.slice(rowIndex * 5, (rowIndex + 1) * 5).map((fieldName, index) => (
                                    <div key={index} style={{ marginRight: "10px" }}>
                                      <label htmlFor={fieldName}>{fieldName}</label>
                                      <input
                                        type="text"
                                        id={fieldName}
                                        name={fieldName}
                                        value={inputFields[fieldName]}
                                        onChange={handleInputChange}
                                        
                                      />
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
        )}
        {tType === "T1" && (
                     <div style={{ display: "flex", flexDirection: "column" }}>
                     {[...Array(6)].map((_, rowIndex) => (
                       <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>
                         {T1.slice(rowIndex * 5, (rowIndex + 1) * 5).map((fieldName, index) => (
                           <div key={index} style={{ marginRight: "10px" }}>
                             <label htmlFor={fieldName}>{fieldName}</label>
                             <input
                               type="text"
                               id={fieldName}
                               name={fieldName}
                               value={inputFields[fieldName]}
                               onChange={handleInputChange}
                               
                             />
                           </div>
                         ))}
                       </div>
                     ))}
                   </div>
        )}
        {tType === "T2" && (
           <div style={{ display: "flex", flexDirection: "column" }}>
           {[...Array(6)].map((_, rowIndex) => (
             <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>
               {T2.slice(rowIndex * 5, (rowIndex + 1) * 5).map((fieldName, index) => (
                 <div key={index} style={{ marginRight: "10px" }}>
                   <label htmlFor={fieldName}>{fieldName}</label>
                   <input
                     type="text"
                     id={fieldName}
                     name={fieldName}
                     value={inputFields[fieldName]}
                     onChange={handleInputChange}
                     
                   />
                 </div>
               ))}
             </div>
           ))}
         </div>
        )}
                {tType === "T3" && (
           <div style={{ display: "flex", flexDirection: "column" }}>
           {[...Array(6)].map((_, rowIndex) => (
             <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>
               {T3.slice(rowIndex * 5, (rowIndex + 1) * 5).map((fieldName, index) => (
                 <div key={index} style={{ marginRight: "10px" }}>
                   <label htmlFor={fieldName}>{fieldName}</label>
                   <input
                     type="text"
                     id={fieldName}
                     name={fieldName}
                     value={inputFields[fieldName]}
                     onChange={handleInputChange}
                     
                   />
                 </div>
               ))}
             </div>
           ))}
         </div>
        )}
                {tType === "T4" && (
           <div style={{ display: "flex", flexDirection: "column" }}>
           {[...Array(6)].map((_, rowIndex) => (
             <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>
               {T4.slice(rowIndex * 5, (rowIndex + 1) * 5).map((fieldName, index) => (
                 <div key={index} style={{ marginRight: "10px" }}>
                   <label htmlFor={fieldName}>{fieldName}</label>
                   <input
                     type="text"
                     id={fieldName}
                     name={fieldName}
                     value={inputFields[fieldName]}
                     onChange={handleInputChange}
                     
                   />
                 </div>
               ))}
             </div>
           ))}
         </div>
        )}
      </div>
    </div>
  );
};

export default Dropdowns;
