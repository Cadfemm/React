import React, { useState } from "react";
import Health from "../assets/outputimage2.jpg";
import "../styles/Monoplegia.css";
import { useHistory,Link } from "react-router-dom";
import axios from 'axios';


function Tymo() {
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

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  
  const history = useHistory();
  const handleRedirect = () => {

    console.log('Sending data to Flask server:', inputValues);
    axios.post('http://localhost:5000/process_data', { data: inputValues })
      .then(response => {
        console.log('Server response:', response.data);
        history.push({
          pathname: '/Output',
          state: { updatedData: response.data.updatedData,timeBetweenTests: inputValues.Time_Between_Tests,  },
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const handleBack = () => {
    history.push("/treatment/pablotests");
  };

  return (
    <div className="Cyberdyne">
      <div className="BannerTop" style={{ backgroundImage: `url(${Health})` }}></div>

      <div className="Input_Area">
      <h2 style={{ textAlign: "center",padding:"10px",textDecoration:"underline" }}>Please Fill Out The Details</h2>

        {/* Personal Info */}
        <div style={{ padding:"10px" }}>
          <h3>Gait Assessment Inputs</h3>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" value={inputValues.name}  onChange={handleChange}/>
                </td>
                <td>
                  <label htmlFor="Age">Age</label>
                  <input type="number" name="Age"  id="Age" value={inputValues.Age} onChange={handleChange}/>
                </td>
                
                <td>
                  <label htmlFor="Gender">Gender</label>
                  <div>
                  <select name="Gender" value={inputValues.Gender} onChange={handleChange} id="Gender" style={{borderRadius: "4px",border: "0.6px solid #00345f",height: "30px"}} >
                  <option value="" disabled>Select</option>
                    <option name="gender"  value="male">Male</option>
                    <option name="gender"  value="female">Female</option>
                  </select></div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Diseases Enquiry */}
        <div style={{ marginBottom: "20px",padding:"10px" }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>     
                <td>
                <label htmlFor="Diabetic">Diabetic</label>
                <div>
                  <select id="Diabetic" name="Diabetic" value={inputValues.Diabetic} onChange={handleChange} style={{borderRadius: "4px",border: "0.6px solid #00345f",height: "30px",width: "100%"}}  >
                  <option name="Diabetic" value="" disabled>Select</option>
                    <option name="Diabetic" value="yes">Yes</option>
                    <option name="Diabetic" value="no">No</option>
                    
                  </select>
                </div>
                </td>
                <td>
                <label htmlFor="Smoking">Smoking</label>
                <div>
                  <select name="Smoking"   style={{borderRadius: "4px",border: "0.6px solid #00345f",height: "30px", width: "100%"}} value={inputValues.Smoking} onChange={handleChange}>
                  <option  value="" disabled >Select</option>
                    <option name="Smoking" value="yes">Yes</option>
                    <option name="Smoking"  value="no">No</option>
                    
                  </select>
                </div>
                </td>
                <td>
                <label htmlFor="Alcoholic">Alcoholic</label>
                <div>
                 
               <select id="Alcoholic" name="Alcoholic" onChange = {handleChange} value = {inputValues.Alcoholic} style={{borderRadius: "4px",border: "0.6px solid #00345f",height: "30px",width: "100%"}}  >
               <option  value="" disabled >Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    
                  </select>
                </div>
                </td>
                <td>
                <label htmlFor="Additional_Support">Additional Support</label>
                <div>
                  <select id="Additional_Support" name="Additional_Support" value = {inputValues.Additional_Support} onChange = {handleChange}  style={{borderRadius: "4px",border: "0.6px solid #00345f",height: "30px",width: "100%"}}  >
                  <option  value="" disabled >Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                </td>
                <td>
                <label htmlFor="Additional_Condition">Additional Condition</label>
                <div>
                  <select id="Additional_Condition"  name="Additional_Condition" value = {inputValues.Additional_Condition} onChange = {handleChange}  style={{borderRadius: "4px",border: "0.6px solid #00345f",height: "30px",width: "100%"}} >
                  <option  value="" disabled >Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                </td>
                

                </tr>
                <tr>
                <td>
                <label htmlFor="Additional_Treatment_Given">Additional Treatment Given</label>
                <div>
                  <select id="Additional_Treatment_Given" name='Additional_Treatment_Given'  style={{borderRadius: "4px",border: "0.6px solid #00345f",height: "30px",width: "100%"}}  value={inputValues.Additional_Treatment_Given} onChange={handleChange}>
                  <option  value="" disabled >Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
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


        
        <div style={{  marginTop: "20px",marginBottom: "40px", display: "flex",alignItems: "center",justifyContent: "space-between" }}>

  <button onClick={handleBack}>Back</button>
  <button onClick={handleRedirect}>Process Inputs</button>
  <div>
      <button onClick={openModal}>Animate</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <video width="700" height="500" controls autoPlay >
              <source src="/90per.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
        </div>
       
      </div>
    </div>
  );
}

export default Tymo;