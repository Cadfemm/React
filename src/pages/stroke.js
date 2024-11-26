import React, { useState } from "react";
import Health from "../assets/Brain.jpg";
import "../styles/Monoplegia.css";

// Reusable form component
const PredictionForm = ({ formData, handleChange, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <label>Gender:</label>
        <select name="Gender" value={formData.Gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="Age"
          value={formData.Age}
          onChange={handleChange}
          placeholder="Enter Age"
        />
      </div>
      <div>
        <label>Days Of Treatment:</label>
        <input
          type="number"
          name="DaysOfTreatment"
          value={formData.DaysOfTreatment}
          onChange={handleChange}
          placeholder="Enter Days of Treatment"
        />
      </div>
      <div>
        <label>Initial Assessment:</label>
        <input
          type="number"
          name="InitialAssesment"
          value={formData.InitialAssesment}
          onChange={handleChange}
          placeholder="Enter Initial Assessment"
        />
      </div>
    </div>
  );
};

const DualPredictionForm = () => {
  const [currentForm, setCurrentForm] = useState(null); // To track which form is displayed
  const [activeSection, setActiveSection] = useState(""); // Initially no section is selected
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");  // State to store the popup message
  const [isPopupVisible, setIsPopupVisible] = useState(false);  // State to control popup visibility

  const [formData1, setFormData1] = useState({
    Gender: "",
    Age: "",
    DaysOfTreatment: "",
    InitialAssesment: "",
  });
  const [formData2, setFormData2] = useState({
    Gender: "",
    Age: "",
    DaysOfTreatment: "",
    InitialAssesment: "",
  });
  const [formData3, setFormData3] = useState({
    Gender: "",
    Age: "",
    DaysOfTreatment: "",
    InitialAssesment: "",
  });
  const [formData4, setFormData4] = useState({
    Gender: "",
    Age: "",
    DaysOfTreatment: "",
    InitialAssesment: "",
  });

  const [results, setResults] = useState({ result1: null, result2: null, result3: null, result4: null });
  const [error, setError] = useState(null);

  const handleChange = (formSetter) => (e) => {
    const { name, value } = e.target;
    formSetter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsButtonVisible(false);
    // Check if fields for model 1 are filled
    const validateModel = (modelData) => {
      return Object.values(modelData).some((value) => value === "");
    };
  
    // Handle submission for Model 1
    if (formData1 && !validateModel(formData1)) {
      try {
        const response1 = await fetch("http://127.0.0.1:5000/predict_model1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model1_inputs: formData1 }),
        });
  
        if (!response1.ok) {
          const errorData = await response1.json();
          setError(errorData.error || "An error occurred while fetching model 1 predictions.");
          return;
        }
  
        const data1 = await response1.json();
        setResults((prevResults) => ({ ...prevResults, result1: data1.result1 }));
      } catch (err) {
        setError("Failed to connect to the server.");
      }
    }
  
    // Handle submission for Model 2
    if (formData2 && !validateModel(formData2)) {
      try {
        const response2 = await fetch("http://127.0.0.1:5000/predict_model2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model2_inputs: formData2 }),
        });
  
        if (!response2.ok) {
          const errorData = await response2.json();
          setError(errorData.error || "An error occurred while fetching model 2 predictions.");
          return;
        }
  
        const data2 = await response2.json();
        setResults((prevResults) => ({ ...prevResults, result2: data2.result2 }));
      } catch (err) {
        setError("Failed to connect to the server.");
      }
    }
  
    // Handle submission for Model 3 (same process as above)
    if (formData3 && !validateModel(formData3)) {
      try {
        const response3 = await fetch("http://127.0.0.1:5000/predict_model3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model3_inputs: formData3 }),
        });
  
        if (!response3.ok) {
          const errorData = await response3.json();
          setError(errorData.error || "An error occurred while fetching model 3 predictions.");
          return;
        }
  
        const data3 = await response3.json();
        setResults((prevResults) => ({ ...prevResults, result3: data3.result3 }));
      } catch (err) {
        setError("Failed to connect to the server.");
      }
    }
  
    // Handle submission for Model 4 (same process as above)
    if (formData4 && !validateModel(formData4)) {
      try {
        const response4 = await fetch("http://127.0.0.1:5000/predict_model4", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model4_inputs: formData4 }),
        });
  
        if (!response4.ok) {
          const errorData = await response4.json();
          setError(errorData.error || "An error occurred while fetching model 4 predictions.");
          return;
        }
  
        const data4 = await response4.json();
        setResults((prevResults) => ({ ...prevResults, result4: data4.result4 }));
      } catch (err) {
        setError("Failed to connect to the server.");
      }
    }
  };
  
  
  

  return (
    <div>
      <div className="banner" style={{ backgroundImage: `url(${Health})` }}>
        STROKE
      </div>

      {/* Buttons to toggle between Left and Right sections */}
      <div className="section-buttons" style={{justifyContent:"center",display:"flex"}}>
        <button onClick={() => setActiveSection("Left")}>Left Hemiparesis</button>
        <button onClick={() => setActiveSection("Right")}>Right Hemiparesis</button>
      </div>

      {/* Conditionally render form buttons based on the active section */}
      {activeSection === "Left" && (
        <div className="form-buttons">
          <button onClick={() => setCurrentForm(1)}>TUG</button>
          <button onClick={() => setCurrentForm(2)}>10M Test</button>
        </div>
      )}
      {activeSection === "Right" && (
        <div className="form-buttons">
          <button onClick={() => setCurrentForm(3)}>TUG</button>
          <button onClick={() => setCurrentForm(4)}>10M Test</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {currentForm === 1 && (
          <PredictionForm
            formData={formData1}
            handleChange={handleChange(setFormData1)}
            title="Inputs for TUG"
          />
        )}
        {currentForm === 2 && (
          <PredictionForm
            formData={formData2}
            handleChange={handleChange(setFormData2)}
            title="Inputs for 10M"
          />
        )}
        {currentForm === 3 && (
          <PredictionForm
            formData={formData3}
            handleChange={handleChange(setFormData3)}
            title="Inputs for TUG"
          />
        )}
        {currentForm === 4 && (
          <PredictionForm
            formData={formData4}
            handleChange={handleChange(setFormData4)}
            title="Inputs for 10M"
          />
        )}
<div style={{display:"flex",justifyContent:"space-between"}}>
        <button type="submit">Submit</button>
        {isButtonVisible && (
        <button className="hide">Trained Model</button>
      )}
        </div>
      </form>

      {/* Display Results */}
      {results.result1 !== null && (
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <div>
          <h3>Result Of TUG:</h3>
          <p>{results.result1}</p>
          </div><div>
          <button className="Result" >Trained Model</button></div>
        </div>
      )}
      {results.result2 !== null && (
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <div>
          <h3>Result Of 10M:</h3>
          <p>{results.result2}</p>
          </div><div>
          <button className="Result" >Trained Model</button></div>
        </div>
      )}
      {results.result3 !== null && (
       <div style={{display:"flex",justifyContent:"space-between"}}>
        <div>
          <h3>Result Of TUG:</h3>
          <p>{results.result3}</p>
          </div><div>
          <button className="Result" >Trained Model</button></div>
        </div>
      )}
      {results.result4 !== null && (
       <div style={{display:"flex",justifyContent:"space-between"}}>
        <div>
          <h3>Result Of 10M:</h3>
          <p>{results.result4}</p>
          </div><div>
          <button className="Result" >Trained Model</button></div>
        </div>
      )}

      {/* Display Errors */}
      {error && (
        <div>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default DualPredictionForm;
