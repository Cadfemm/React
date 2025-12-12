import React from "react";
import Health from "../assets/Brain.jpg";
import "../styles/Monoplegia.css";

function Hemiplegia() {
  return (
    <div className="Monoplegia">
      <div className="BannerTop" style={{ backgroundImage: `url(${Health})` }}></div>
      <div className="Input_Area">
        <h2>Please Fill Out The Details</h2>
        <table style={{ width: "1140px", margin: "0 auto" }}>
          <tbody>
            <tr>
              <td>
                <label htmlFor="input1">Initial Left Stance Phase</label>
                <input id="input1" type="text" />
              </td>
              <td>
                <label htmlFor="input2">Initial Right Stance Phase</label>
                <input id="input2" type="text" />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="input3">Initial BBG Test Score</label>
                <input id="input3" type="text" />
              </td>
              <td>
                <label htmlFor="input4">Percentage Of Improvement Required In Left Stance</label>
                <input id="input4" type="text" />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ width: "100%" }}>
                <label htmlFor="input5">Percentage Of Improvement Required In Right Stance</label>
                <input id="input5" type="text" style={{ width: "100%" }} />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
               
              </td>
            </tr>
            <button type="submit">Submit</button>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Hemiplegia;
