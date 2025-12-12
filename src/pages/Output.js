import React, { useState,useEffect } from "react";
import Health from "../assets/output11.jpg";
import "../styles/Monoplegia.css";
import {useHistory , Link} from "react-router-dom";

  const Output = ({ location }) => {
    const [output1, setOutput1] = useState('');
    const [output2, setOutput2] = useState('');
    const [output3, setOutput3] = useState('');
    const [output4, setOutput4] = useState('');
    const [output5, setOutput5] = useState('');
    const [output6, setOutput6] = useState('');
    const [output7, setOutput7] = useState('');
    const [output8, setOutput8] = useState('');
    const [output9, setOutput9] = useState('');
    const [output10, setOutput10] = useState('');
    const [output11, setOutput11] = useState('');
    const [output12, setOutput12] = useState('');
    const [output13, setOutput13] = useState('');
    const [output14, setOutput14] = useState('');
    const [output15, setOutput15] = useState('');
    const [output16, setOutput16] = useState('');
    const [output17, setOutput17] = useState('');
    const [output18, setOutput18] = useState('');
    const [output19, setOutput19] = useState('');
    const [output20, setOutput20] = useState('');
    const [output21, setOutput21] = useState('');
    const [output22, setOutput22] = useState('');
    const [output23, setOutput23] = useState('');
    const [output24, setOutput24] = useState('');
    const [output25, setOutput25] = useState('');
    const [output26, setOutput26] = useState('');
    const [output27, setOutput27] = useState('');
    const [output28, setOutput28] = useState('');


    const [timeBetweenTests, setTimeBetweenTests] = useState('');
    useEffect(() => {
      const receivedData = location.state.updatedData;
      const receivedTimeBetweenTests = location.state.timeBetweenTests;
      console.log('Received Time Between Tests:', receivedTimeBetweenTests);
      setTimeBetweenTests(parseInt(receivedTimeBetweenTests))
  
      console.log('Received Data:', receivedData);
  
      if (receivedData && receivedData.length >= 3) {
        console.log('Updating State:', receivedData);
        setOutput1(String(receivedData[0]));
        setOutput2(String(receivedData[1]));
        setOutput3(String(receivedData[2]));
        setOutput4(String(receivedData[3]));
        setOutput5(String(receivedData[4]));
        setOutput6(String(receivedData[5]));
        setOutput7(String(receivedData[6]));
        setOutput8(String(receivedData[7]));
        setOutput9(String(receivedData[8]));
        setOutput10(String(receivedData[9]));
        setOutput11(String(receivedData[10]));
        setOutput12(String(receivedData[11]));
        setOutput13(String(receivedData[12]));
        setOutput14(String(receivedData[13]));
        setOutput15(String(receivedData[14]));
        setOutput16(String(receivedData[15]));
        setOutput17(String(receivedData[16]));
        setOutput18(String(receivedData[17]));
        setOutput19(String(receivedData[18]));
        setOutput20(String(receivedData[19]));
        setOutput21(String(receivedData[20]));
        setOutput22(String(receivedData[21]));
        setOutput23(String(receivedData[22]));
        setOutput24(String(receivedData[23]));
        setOutput25(String(receivedData[24]));
        setOutput26(String(receivedData[25]));
        setOutput27(String(receivedData[26]));
        setOutput28(String(receivedData[27]));
        
        


      }
    }, [location.state.updatedData,location.state.timeBetweenTests]);


    const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  

 
  const history = useHistory();
  const handleRedirect = () => {
    history.push("/treatment/Tymo");
  };

  return (
    <div className="Cyberdyne">
      <div className="BannerTop" style={{ backgroundImage: `url(${Health})`, height:"70vh" }}></div>

      <div className="Input_Area">
      <h2 style={{ textAlign: "center",padding:"10px",textDecoration:"underline" }}>Processed Outputs</h2>
        {/* Diseases Enquiry */}
        <div style={{ marginBottom: "20px",padding:"10px",marginTop:"20px" }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="diabetic">Change In Velocity (KM/H)</label>
                  <input id="diabetic" type="text" value={output1} />
                </td>
                <td>
                  <label htmlFor="geneticDiseases">Change In Cadence (Steps/Min)</label>
                  <input id="geneticDiseases" type="text" value={output2}/>
                </td>
                <td>
                  <label htmlFor="existingDiseases">Change In Stride Length(CM)</label>
                  <input id="existingDiseases" type="text" value={output3} />
                </td>
                <td>
                  <label htmlFor="therapist">Change In Cycle Duration Left</label>
                  <input id="therapist" type="text" value={output4} />
                </td>
                <td>
                  <label htmlFor="testDuration">Change In Cycle Duration Right</label>
                  <input id="testDuration" type="text" value={output5} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="Additional_Support">Change In Stance Phase Left</label>
                  <input id="Additional_Support" type="text" value={output6}/>
                </td>
                <td>
                  <label htmlFor="Condition">Change In Stance Phase Right</label>
                  <input id="Condition" type="text" value={output7} />
                </td>
                <td>
                  <label htmlFor="Additional_Condition">Change In Loading Response Left</label>
                  <input id="Additional_Condition" type="text" value={output8} />
                </td>
                <td>
                  <label htmlFor="Additional_Treatment">Change In Loading Response Right</label>
                  <input id="Additional_Treatment" type="text" value={output9} />
                </td>
                <td>
                  <label htmlFor="Initial_Stride_length">Change In Single Support Left</label>
                  <input id="Initial_Stride_length" type="text" value={output10} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="ideal_support_left">Change In Single Support Right</label>
                  <input id="ideal_support_left" type="text" value={output11}/>
                </td>
                <td>
                  <label htmlFor="load_res_right">Change In Pre Swing Left</label>
                  <input id="load_res_right" type="text" value={output12} />
                </td>
                <td>
                  <label htmlFor="ideal_stance_phase_left">Change In Pre Swing Right</label>
                  <input id="ideal_stance_phase_left" type="text" value={output13}/>
                </td>
                <td>
                  <label htmlFor="ideal_stance_phase_right">Change In Swing Phase Left</label>
                  <input id="ideal_stance_phase_right" type="text" value={output14} />
                </td>
                <td>
                  <label htmlFor="ideal_swing_left">Change In Swing Phase Right</label>
                  <input id="ideal_swing_left" type="text" value={output15} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="ideal_pre_swing_left">Change In Double Support</label>
                  <input id="ideal_pre_swing_left" type="text" value={output16}/>
                </td>
                <td>
                  <label htmlFor="ideal_single_support_right">Change In Angle Foot/Floor Maximum Sagittal Left</label>
                  <input id="ideal_single_support_right" type="text" value={output17}/>
                </td>
                <td>
                  <label htmlFor="ideal_loading_response_left">Change In Angle Foot/Floor Maximum Sagittal Right</label>
                  <input id="ideal_loading_response_left" type="text" value={output18} />
                </td>
                <td>
                  <label htmlFor="ideal_pre_swing_right">Change In Angle Foot/Floor Minimum Sagittal Left</label>
                  <input id="ideal_pre_swing_right" type="text" value={output19} />
                </td>
                <td>
                  <label htmlFor="Time between tests (days)">Change In Angle Foot/Floor Minimum Sagittal Right</label>
                  <input id="Time between tests (days)" type="text" value={output20} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor=",Initial_Cadence">Change In Angle Foot/Floor Maximum Frontal Left</label>
                  <input id="Initial_Cadence" type="text" value={output21}/>
                </td>
                <td>
                  <label htmlFor="Initial_Velocity">Change In Angle Foot/Floor Maximum Frontal Right</label>
                  <input id="Initial_Velocity" type="text" value={output22} />
                </td>
                <td>
                  <label htmlFor="ideal_swing_right">Change In Angle Foot/Floor Minimum Frontal Left</label>
                  <input id="ideal_swing_right" type="text" value={output23}/>
                </td>
                <td>
                  <label htmlFor="ideal_swing_right">Change In Angle Foot/Floor Minimum Frontal Right</label>
                  <input id="ideal_swing_right" type="text" value={output24}/>
                </td>
                <td>
                  <label htmlFor="ideal_swing_right">Change In Vertical Lift Maximum Left</label>
                  <input id="ideal_swing_right" type="text" value={output25}/>
                </td>
              </tr>
              <tr>
              <td>
                  <label htmlFor="ideal_swing_right">Change In Vertical Lift Maximum Right</label>
                  <input id="ideal_swing_right" type="text" value={output26} />
                </td>
                <td>
                  <label htmlFor="ideal_swing_right">Change In Lateral Deviation Maximum Left</label>
                  <input id="ideal_swing_right" type="text" value={output27} />
                </td>
                <td>
                  <label htmlFor="ideal_swing_right">Change In Lateral Deviation Maximum Right</label>
                  <input id="ideal_swing_right" type="text" value={output28} />
                </td>

              </tr>

            </tbody>
          </table>
        </div>
        
        <div style={{  marginTop: "20px",marginBottom: "40px", display: "flex",alignItems: "center",justifyContent: "space-between" }}>

<button onClick={handleRedirect}>Back</button>
<div>
<button onClick={openModal}>Animate</button>

{isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <span className="close-button" onClick={closeModal}>
        &times;
      </span>
      <video width="700" height="500" controls autoPlay>
        <source
          src={
            parseInt(timeBetweenTests) >= 0 && parseInt(timeBetweenTests) <=15
              ? "/90per.mp4"
              : parseInt(timeBetweenTests) >15 && parseInt(timeBetweenTests) <=30
                ? "/60per.mp4"
                : parseInt(timeBetweenTests) >30
                  ? "/Normal.mp4"
                  : (() => {
                    // Display an alert for invalid input values
                    alert("Please give input values within the specified ranges.");
                  })()
          }
          type="video/mp4"
        />
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

export default Output;