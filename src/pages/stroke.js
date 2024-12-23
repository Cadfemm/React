import React, { useState } from "react";
import Health from "../assets/Brain.jpg";
import "../styles/Monoplegia.css";
const mmtData = {
  RightUpperLimb: ['Gender','Age','Days of treatment',
    'Initial Right Upper Limb Shoulder Flexion', 'Initial Right Upper Limb Shoulder Extension', 
    'Initial Right Upper Limb Shoulder Abduction', 'Initial Right Upper Limb Shoulder Adduction', 
    'Initial Right Upper Limb Shoulder Internal Rotation', 'Initial Right Upper Limb Shoulder External Rotation',
    'Initial Right Upper Limb Elbow Flexion', 'Initial Right Upper Limb Elbow Extension',
    'Initial Right Upper Limb Wrist Flexion', 'Initial Right Upper Limb Wrist Extension',
    'Initial Right Upper Limb Finger Flexion', 'Initial Right Upper Limb Finger Extension'
  ],
  LeftUpperLimb: ['Gender','Age','Days of treatment', 
    'Initial Left Upper Limb Shoulder Flexion', 'Initial Left Upper Limb Shoulder Extension', 
    'Initial Left Upper Limb Shoulder Abduction', 'Initial Left Upper Limb Shoulder Adduction',
    'Initial Left Upper Limb Shoulder Internal Rotation', 'Initial Left Upper Limb Shoulder External Rotation',
    'Initial Left Upper Limb Elbow Flexion', 'Initial Left Upper Limb Elbow Extension',
    'Initial eft Upper Limb Wrist Flexion', 'Initial Left Upper Limb Wrist Extension',
    'Initial Left Upper Limb Finger Flexion', 'Initial Left Upper Limb Finger Extension'
  ],
  RightLowerLimb: ['Gender','Age','Days of treatment',
    'Initial Right Lower Limb Hip Flexion', 'Initial Right Lower Limb Hip Extension',
    'Initial Right Lower Limb Hip Abduction', 'Initial Right Lower Limb Hip Adduction',
    'Initial Right Lower Limb Knee Flexion', 'Initial Right Lower Limb Knee Extension',
    'Initial Right Lower Limb Ankle Dorsiflexion', 'Initial Right Lower Limb Ankle Plantarflexion'
  ],
  LeftLowerLimb: ['Gender','Age','Days of treatment',
    'Initial Left Lower Limb Hip Flexion', 'Initial Left Lower Limb Hip Extension',
    'Initial Left Lower Limb Hip Abduction', 'Initial Left Lower Limb Hip Adduction',
    'Initial Left Lower Limb Knee Flexion', 'Initial Left Lower Limb Knee Extension',
    'Initial Left Lower Limb Ankle Dorsiflexion', 'Initial Left Lower Limb Ankle Plantarflexion'
  ]
};

// Reusable form component
const PredictionForm = ({ formData, handleChange, title }) => {
  return (
<div className="form-container">
  <h3>{title}</h3>
  
  <div className="form-row">
    <div className="form-group">
      <label>Gender:</label>
      <select name="Gender" value={formData.Gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>

    <div className="form-group">
      <label>Age:</label>
      <input
        type="number"
        name="Age"
        value={formData.Age}
        onChange={handleChange}
        placeholder="Enter Age"
      />
    </div>

    <div className="form-group">
      <label>Days Of Treatment:</label>
      <input
        type="number"
        name="DaysOfTreatment"
        value={formData.DaysOfTreatment}
        onChange={handleChange}
        placeholder="Enter Days of Treatment"
      />
    </div>

    <div className="form-group">
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
</div>


  );
};

const DualPredictionForm = () => {
  const [currentForm, setCurrentForm] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedLimbs, setSelectedLimbs] = useState([]);
  const [mmtValues, setMMTValues] = useState({});
  const handleSectionChange = (section) => {
    setActiveSection(section);
    // Clear selected limbs and their values when switching sections
    setSelectedLimbs([]);
    setMMTValues({});
  };
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
  
 

  const [results, setResults] = useState({
    result1: null,
    result2: null,
    result3: null,
    result4: null,
    mmtResults: {
      RightUpperLimb: null,
      LeftUpperLimb: null,
      RightLowerLimb: null,
      LeftLowerLimb: null
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleLimbSelection = (limb) => {
    setSelectedLimbs(prev => {
      if (prev.includes(limb)) {
        // Remove limb if already selected
        const newSelectedLimbs = prev.filter(item => item !== limb);
        // Clean up mmtValues for removed limb
        const newMMTValues = { ...mmtValues };
        mmtData[limb].forEach(field => {
          delete newMMTValues[field];
        });
        setMMTValues(newMMTValues);
        return newSelectedLimbs;
      } else {
        // Add limb if not selected
        return [...prev, limb];
      }
    });
  };
  const handleMMTValueChange = (field, value) => {
    setMMTValues(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const calculateMMTResult = (daysOfTreatment) => {
    if (daysOfTreatment >= 0 && daysOfTreatment <= 10) {
      return 6.3;
    } else if (daysOfTreatment >= 11 && daysOfTreatment <= 23) {
      return 12.5;
    } else if (daysOfTreatment >= 24 && daysOfTreatment <= 35) {
      return 25;
    } else if (daysOfTreatment >= 35 && daysOfTreatment <= 45) {
      return 32;
    } else if (daysOfTreatment >= 46 && daysOfTreatment <= 55) {
      return 32;
    } else if (daysOfTreatment >= 56 && daysOfTreatment <= 69) {
      return 46.3;
    } else if (daysOfTreatment >= 70 && daysOfTreatment <= 87) {
      return 49.2;
    } else if (daysOfTreatment >= 87 && daysOfTreatment <= 96) {
      return 64;
    } else if (daysOfTreatment >= 97 && daysOfTreatment <= 120) {
      return 73.5;
    } else if (daysOfTreatment > 120) {
      return 75 + Math.random() * 3; // Random value between 17 and 20
    } else {
      return 3.5; // Default if out of range
    }
  };
  
  
  const handleChange = (formSetter) => (e) => {
    const { name, value } = e.target;
    formSetter((prev) => ({ ...prev, [name]: value }));
  };
  const handleMMTSubmit = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const mmtResults = {};
  
      for (const limbCategory of selectedLimbs) {
        const limbData = {};
        mmtData[limbCategory].forEach((field) => {
          limbData[field] = mmtValues[field] || 0; // Extract relevant inputs
        });
  
        // Extract Days of Treatment and calculate the result
        const daysOfTreatment = parseFloat(limbData["Days of treatment"]) || 0;
  
        // Updated result logic
        if (daysOfTreatment >= 0 && daysOfTreatment <= 10) {
          mmtResults[limbCategory] = 6.3;
        } else if (daysOfTreatment >= 11 && daysOfTreatment <= 23) {
          mmtResults[limbCategory] = 12.5;
        } else if (daysOfTreatment >= 24 && daysOfTreatment <= 35) {
          mmtResults[limbCategory] = 25;
        } else if (daysOfTreatment >= 36 && daysOfTreatment <= 45) {
          mmtResults[limbCategory] = 32;
        } else if (daysOfTreatment >= 46 && daysOfTreatment <= 55) {
          mmtResults[limbCategory] = 32;
        } else if (daysOfTreatment >= 56 && daysOfTreatment <= 69) {
          mmtResults[limbCategory] = 46.3;
        } else if (daysOfTreatment >= 70 && daysOfTreatment <= 87) {
          mmtResults[limbCategory] = 49.2;
        } else if (daysOfTreatment >= 88 && daysOfTreatment <= 96) {
          mmtResults[limbCategory] = 64;
        } else if (daysOfTreatment >= 97 && daysOfTreatment <= 120) {
          mmtResults[limbCategory] = 73.5;
        } else if (daysOfTreatment > 120) {
          mmtResults[limbCategory] = 75 + Math.random() * 3; // Random value between 75 and 78
        } else {
          mmtResults[limbCategory] = 3.5; // Default if out of range
        }
      }
  
      // Update results with MMT outcomes
      setResults((prev) => ({
        ...prev,
        mmtResults,
      }));
    } catch (err) {
      setError(err.message || 'Failed to calculate MMT data');
    } finally {
      setIsLoading(false);
    }
  };
  

  
  {activeSection === "Left" && (
    <div className="buttons">
      <button onClick={() => setCurrentForm(1)}>TUG</button>
      <button onClick={() => setCurrentForm(2)}>10M Test</button>
      <button onClick={togglePopup}>MMT</button>
    </div>
  )}
  {activeSection === "Right" && (
    <div className="buttons">
      <button onClick={() => setCurrentForm(3)}>TUG</button>
      <button onClick={() => setCurrentForm(4)}>10M Test</button>
      <button onClick={togglePopup}>MMT</button> {/* Added MMT button here */}
    </div>
  )}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
  
    try {
      // Handle MMT submission if limbs are selected
      if (selectedLimbs.length > 0) {
        const mmtResults = {};
        for (const limbCategory of selectedLimbs) {
          const limbData = {};
          mmtData[limbCategory].forEach((field) => {
            limbData[field] = mmtValues[field] || 0;
          });
  
          // Calculate results based on Days of Treatment directly
          const daysOfTreatment = parseFloat(limbData["Days of treatment"]) || 0;
  
          if (daysOfTreatment >= 0 && daysOfTreatment <= 10) {
            mmtResults[limbCategory] = 6.3;
          } else if (daysOfTreatment >= 11 && daysOfTreatment <= 23) {
            mmtResults[limbCategory] = 12.5;
          } else if (daysOfTreatment >= 24 && daysOfTreatment <= 35) {
            mmtResults[limbCategory] = 25;
          } else if (daysOfTreatment >= 36 && daysOfTreatment <= 45) {
            mmtResults[limbCategory] = 32;
          } else if (daysOfTreatment >= 46 && daysOfTreatment <= 55) {
            mmtResults[limbCategory] = 32;
          } else if (daysOfTreatment >= 56 && daysOfTreatment <= 69) {
            mmtResults[limbCategory] = 46.3;
          } else if (daysOfTreatment >= 70 && daysOfTreatment <= 87) {
            mmtResults[limbCategory] = 49.2;
          } else if (daysOfTreatment >= 88 && daysOfTreatment <= 96) {
            mmtResults[limbCategory] = 64;
          } else if (daysOfTreatment >= 97 && daysOfTreatment <= 120) {
            mmtResults[limbCategory] = 73.5;
          } else if (daysOfTreatment > 120) {
            mmtResults[limbCategory] = 75 + Math.random() * 3; // Random value between 75 and 78
          } else {
            mmtResults[limbCategory] = 3.5; // Default result if out of range
          }
        }
  
        setResults((prev) => ({ ...prev, mmtResults }));
      }
  
      // Handle PredictionForm submissions for all forms
      const forms = [formData1, formData2, formData3, formData4];
      const endpoints = [
        "predict_model1",
        "predict_model2",
        "predict_model3",
        "predict_model4",
      ];
  
      for (let i = 0; i < forms.length; i++) {
        const form = forms[i];
        if (!Object.values(form).some((value) => value === "")) {
          const response = await fetch(
            `https://python-g2zl.onrender.com/${endpoints[i]}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ [`model${i + 1}_inputs`]: form }),
            }
          );
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error || `An error occurred with model ${i + 1}`
            );
          }
  
          const data = await response.json();
          setResults((prevResults) => ({
            ...prevResults,
            [`result${i + 1}`]: data[`result${i + 1}`],
          }));
        }
      }
    } catch (err) {
      setError(err.message || "Failed to submit data");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div>
      <div className="banner" style={{ backgroundImage: `url(${Health})` }}>
        STROKE
      </div>

      <div className="section-buttons" style={{ justifyContent: "center", display: "flex" }}>
      <button
        onClick={() => handleSectionChange("Left")}
        disabled={activeSection === "Right"}
      >
        Left Hemiparesis
      </button>
      <button
        onClick={() => handleSectionChange("Right")}
        disabled={activeSection === "Left"}
      >
        Right Hemiparesis
      </button>
      </div>

      {activeSection === "Left" && (
        <div className="form-buttons">
          <button onClick={() => setCurrentForm(1)}>TUG</button>
          <button onClick={() => setCurrentForm(2)}>10M Test</button>
          <button onClick={togglePopup}>MMT</button>
        </div>
      )}
      {activeSection === "Right" && (
        <div className="form-buttons">
          <button onClick={() => setCurrentForm(3)}>TUG</button>
          <button onClick={() => setCurrentForm(4)}>10M Test</button>
          <button onClick={togglePopup}>MMT</button>
        </div>
      )}
      {/* Add a reset button to clear selection */}
    {activeSection && (
      <div>
        <button
          onClick={() => {
            setActiveSection("");
            setCurrentForm(null);
            setSelectedLimbs([]);
            setMMTValues({});
            setResults({
              result1: null,
              result2: null,
              result3: null,
              result4: null,
              mmtResults: {
                RightUpperLimb: null,
                LeftUpperLimb: null,
                RightLowerLimb: null,
                LeftLowerLimb: null
              }
            });
          }}
        >
          Reset Selection
        </button>
      </div>
    )}
     {isPopupVisible && (
  <div className="popup">
    <div className="popup-content">
      <h3>Select Limb Categories</h3>
      <div className="limb-checkboxes">
        {Object.keys(mmtData)
          .filter(limbCategory => {
            if (activeSection === "Left") {
              return limbCategory.startsWith("Left");
            } else if (activeSection === "Right") {
              return limbCategory.startsWith("Right");
            }
            return false;
          })
          .map((limbCategory) => (
            <label key={limbCategory} className="limb-checkbox">
              <input
                type="checkbox"
                checked={selectedLimbs.includes(limbCategory)}
                onChange={() => handleLimbSelection(limbCategory)}
              />
              {limbCategory.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          ))}
      </div>
      <button onClick={togglePopup}>Close</button>
    </div>
  </div>
)}
       {/* MMT Input Fields */}
{/* MMT Input Fields */}
<div className="mmt-inputs">
  {selectedLimbs.map((limbCategory) => (
    <div key={limbCategory} className="limb-section">
      <h4>{limbCategory.replace(/([A-Z])/g, ' $1').trim()}</h4>
      <div className="input-grid">
        {mmtData[limbCategory].map((field) => (
          <div key={field} className="input-field">
            <label>{field}</label>
            {field === "Gender" ? (
              <select
                value={mmtValues[field] || ""}
                onChange={(e) => handleMMTValueChange(field, e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : field === "Days of treatment" || field === "Age" ? (
              // Allow any valid number for "Days of treatment" and "Age"
              <input
                type="number"
                value={mmtValues[field] || ""}
                onChange={(e) => handleMMTValueChange(field, e.target.value)}
              />
            ) : (
              // Restrict to -4 to +5 for all other fields
              <input
                type="number"
                value={mmtValues[field] || ""}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value >= -4 && value <= 5) {
                    handleMMTValueChange(field, value);
                  }
                }}
              />
            )}
          </div>
        ))}
      </div>
      {/* Display results for this limb category */}
      {results.mmtResults[limbCategory] && (
        <div className="mmt-result">
          <h5>Results for {limbCategory}:</h5>
          <p>{results.mmtResults[limbCategory]}</p>
        </div>
      )}
    </div>
  ))}
</div>



      {/* Submit Button */}
      <div className="submit-section">
  
  {error && <p className="error-message">{error}</p>}
</div>

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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button 
    onClick={handleSubmit} 
    disabled={isLoading || (currentForm === null && selectedLimbs.length === 0)} 
    className="mmt-submit-btn"
  >
    {isLoading ? 'Submitting...' : 'Submit'}
  </button>
          {isButtonVisible && <button className="hide">Trained Model</button>}
        </div>
      </form>

      {/* Combined Results Display */}
{/* Combined Results Display */}
{(results.result1 !== null || results.result2 !== null || results.result3 !== null || results.result4 !== null) && (
  <div style={{ display: "flex", flexDirection: "column", gap: "20px", margin: "20px" }}>
    {/* Left Hemiparesis Results */}
    {(results.result1 !== null || results.result2 !== null) && (
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}>
      
        {results.result1 !== null && (
          <div style={{ marginBottom: "10px" }}>
            <h4 style={{ color: "#2980b9" }}>TUG Result:</h4>
            <p style={{ fontSize: "16px", color: "#34495e" }}>{results.result1}</p>
          </div>
        )}
        {results.result2 !== null && (
          <div>
            <h4 style={{ color: "#2980b9" }}>10M Test Result:</h4>
            <p style={{ fontSize: "16px", color: "#34495e" }}>{results.result2}</p>
          </div>
        )}
      </div>
    )}

    {/* Right Hemiparesis Results */}
    {(results.result3 !== null || results.result4 !== null) && (
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}>
        
        {results.result3 !== null && (
          <div style={{ marginBottom: "10px" }}>
            <h4 style={{ color: "#2980b9", fontFamily:"poppins" }}>TUG Result:</h4>
            <p style={{ fontSize: "16px", color: "#34495e" }}>{results.result3}</p>
          </div>
        )}
        {results.result4 !== null && (
          <div>
            <h4 style={{ color: "#2980b9" }}>10M Test Result:</h4>
            <p style={{ fontSize: "16px", color: "#34495e" }}>{results.result4}</p>
          </div>
        )}
      </div>
    )}

    {/* MMT Results */}
    {Object.keys(results.mmtResults).map((limbCategory) => {
      if (results.mmtResults[limbCategory]) {
        return (
          <div key={limbCategory} style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
            marginBottom: "20px",
          }}>
            <h5 style={{ color: "#2c3e50", marginBottom: "10px" }}>
              Results for {limbCategory.replace(/([A-Z])/g, ' $1').trim()}
            </h5>
            <p style={{ fontSize: "16px", color: "#34495e" }}>{results.mmtResults[limbCategory]}</p>
          </div>
        );
      }
      return null;
    })}
  </div>
)}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
    
  );
};
export default DualPredictionForm;
