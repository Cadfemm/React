import React, { useState, useEffect } from "react";
import Health from "../assets/output11.jpg";
import "../styles/Monoplegia.css";
import { useHistory, Link } from "react-router-dom";

const Output1 = ({ location }) => {
  const [output1, setOutput1] = useState('');
  const [output2, setOutput2] = useState('');
  const [output3, setOutput3] = useState('');
  const [output4, setOutput4] = useState('');
  const [output5, setOutput5] = useState('');
  const [output6, setOutput6] = useState('');
  const [output7, setOutput7] = useState('');
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
    }
  }, [location.state.updatedData, location.state.timeBetweenTests]);

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
      <div className="BannerTop" style={{ backgroundImage: `url(${Health})`, height: "70vh" }}></div>
      <div className="Input_Area">
        <h2 style={{ textAlign: "center", padding: "10px", textDecoration: "underline" }}>Processed Outputs</h2>
        <div style={{ marginBottom: "20px", padding: "10px", marginTop: "20px" }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="diabetic">Change In Velocity (KM/H)</label>
                  <input id="diabetic" type="text" value={output1} />
                </td>
                {/* Add a condition to render the card based on the value of output1 */}
                {output1 === '1.0' &&
                  <td>
                    <div className="card">
                      <h3>Card Heading</h3>
                      <img src="Health" alt="Card Image" />
                    </div>
                  </td>
                }
                <td>
                  <label htmlFor="geneticDiseases">Change In Cadence (Steps/Min)</label>
                  <input id="geneticDiseases" type="text" value={output2} />
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
                  <input id="Additional_Support" type="text" value={output6} />
                </td>
                <td>
                  <label htmlFor="Condition">Change In Stance Phase Right</label>
                  <input id="Condition" type="text" value={output7} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Output1;
