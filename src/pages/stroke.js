import React, { useState, useEffect } from "react";
import Health from "../assets/Brain.jpg";
import "../styles/Monoplegia.css";
import Luna from "../assets/luna_emg.jpg"
import pablo from "../assets/pablo.jpg"
import gait from "../assets/gait.jpg"

const DualPredictionForm = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const [assistivedevice, setAssistivedevice] = useState("");
  const [warning, setWarning] = useState(""); // State to store the warning message
  const [tenMwarning, settenMWarning] = useState(""); // State to store the warning message
  const [tugWarning, setTugWarning] = useState(""); // State to store the warning message
  const [tenMBwarning, setTenMBwarning] = useState(""); // State to store the warning message
  const [assistive10mdevice, setAssistive10mdevice] = useState("");
  const [showLimbButtons, setShowLimbButtons] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showMMTVideo, setShowMMTVideo] = useState(false);
  const [showMMTLAVideo, setShowMMTLAVideo] = useState(false);
  const [showMMTLBVideo, setShowMMTLBVideo] = useState(false);
  const [showTUGVideo, setShowTUGVideo] = useState(false);
  const [show10MVideo, setShow10MVideo] = useState(false);
  const [showTUGBVideo, setShowTUGBVideo] = useState(false);
  const [show10BVideo, setShow10BVideo] = useState(false);
  const [daysOfTreatment, setDaysOfTreatment] = useState("");
  const [isDaysOfTreatmentActive, setIsDaysOfTreatmentActive] = useState(false);
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const [tugField1, setTugField1] = useState("");
  const [tugField2, setTugField2] = useState(null);
  const [tugField3, setTugField3] = useState("");
  const [tugField4, setTugField4] = useState("");
  const [showTugFields, setShowTugFields] = useState(false);
  const [show10MFields, setShow10MFields] = useState(false);
  const [showImprovement, setShowImprovemnt] = useState(false);
  const [hideLowerInputs, setHideLowerInputs] = useState(false);
  const [hideUpperInputs, setHideUpperInputs] = useState(false);
  const [showLowerImprovement, setShowLowerImprovemnt] = useState(false);
  const [show10MImprovement, setShow10MImprovemnt] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showLowerPopup, setShowLowerPopup] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLowerCategories, setSelectedLowerCategories] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [LowerinputValues, setLowerInputValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImprovedValues, setShowImprovedValues] = useState(false);
  const [showImprovedLowerValues, setShowImprovedLowerValues] = useState(false);
  const [improvedValues, setImprovedValues] = useState({});
  const [improvedLowerValues, setImprovedLowerValues] = useState({});
  const [manuallyEnteredFields, setManuallyEnteredFields] = useState(new Set());
  const [manuallyEnteredLowerFields, setManuallyEnteredLowerFields] = useState(new Set());
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const predefinedValues = ["0", "1", "2-", "2", "2+","3-", "3", "3+", "4-","4", "4+", "5"];
  const [hideContent, setHideContent] = useState(false);
  const [hideTUGContent, setHideTUGContent] = useState(false);
  const [isInputsValid, setIsInputsValid] = useState(false);
  const [isLowerInputsValid, setIsLowerInputsValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const checkboxOptions = ["Shoulder", "Elbow", "Wrist", "Finger"];
  const lowercheckboxOptions = ["Hip", "Knee", "Ankle", "Toes"];
    const [showImages, setShowImages] = useState(false);
    const [showTUGImages, setShowTUGImages] = useState(false);
    const [show10MImages, setShow10MImages] = useState(false);
   
    const handleClick = () => {
      setShowImages(true);
    };
    const handleTUGClick = () => {
      setShowTUGImages(true);
    };
    const handle10MClick = () => {
      setShow10MImages(true);
    };
    const getVideoSource = () => {
      if (tugField2 >= 0 && tugField2 < 2) {
        return "/movement100.mp4";
      } else if (tugField2 >= 2 && tugField2 < 6) {
        return "/movement60.mp4";
      } else if (tugField2 >= 6 && tugField2 < 14) {
        return "/movement20.mp4";
      } else if (tugField2 >= 14 && tugField2 < 100) {
        return "/Perturbedgait.mp4";
      } else {
        return "/Perturbedgait.mp4"; // Default fallback video
      }
    };
    const getMessage = (value) => {
      if (value >= 0 && value < 2) {
        return "Very High Movement (100%)";
      } else if (value >= 2 && value < 6) {
        return "Moderate Movement (60%)";
      } else if (value >= 6 && value < 14) {
        return "Low Movement (20%)";
      } else if (value >= 14 && value < 100) {
        return "Perturbed Gait Detected";
      } else {
        return "Perturbed Gait (Default)"; // Default fallback message
      }
    };
    const getVideo10MSource = () => {
      if (tugField4 >= 0.8 && tugField4 < 5) {
        return "/movement100.mp4";
      } else if (tugField4 >= 0.4 && tugField4 < 0.8) {
        return "/movement60.mp4";
      } else if (tugField4 >= 0 && tugField4 < 0.4) {
        return "/movement20.mp4";
      
      } else {
        return "/movement20.mp4"; // Default fallback video
      }
    };
    const getVideoTUGSource = () => {
      if (tugField1 >= 0 && tugField1 < 2) {
        return "/movement100.mp4";
      } else if (tugField1 >= 2 && tugField1 < 6) {
        return "/movement60.mp4";
      } else if (tugField1 >= 6 && tugField1 < 14) {
        return "/movement20.mp4";
      } else if (tugField1 >= 14 && tugField1 < 100) {
        return "/Perturbedgait.mp4";
      
      } else {
        return "/movement20.mp4"; // Default fallback video
      }
    };
    
    const getVideoMMTSource = () => {
      const averageValue = parseFloat(calculateUserEnteredAverage()); // Convert to number
    
      if (averageValue >= 0 && averageValue < 2) {
        return "/movement20.mp4";
      } else if (averageValue >= 2 && averageValue < 3) {
        return "/movement40.mp4";
      } else if (averageValue >= 3 && averageValue < 4) {
        return "/movement60.mp4";
      } else if (averageValue >= 4 && averageValue < 5) {
        return "/movement80.mp4";
      } else if (averageValue >= 5) {
        return "/movement100.mp4";
      } else {
        return "/movement100.mp4"; // Default fallback video
      }
    };

    const getVideoMMTASource = () => {
      const averageAValue = parseFloat(calculateAverage()); // Convert to number
    
      if (averageAValue >= 0 && averageAValue < 2) {
        return "/movement20.mp4";
      } else if (averageAValue >= 2 && averageAValue < 3) {
        return "/movement40.mp4";
      } else if (averageAValue >= 3 && averageAValue < 4) {
        return "/movement60.mp4";
      } else if (averageAValue >= 4 && averageAValue < 5) {
        return "/movement80.mp4";
      } else if (averageAValue >= 5) {
        return "/movement100.mp4";
      } else {
        return "/movement100.mp4"; // Default fallback video
      }
    };
    const getVideoMMTLBSource = () => {
      const averageLValue = parseFloat(calculateUserEnteredLowerAverage()); // Convert to number
    
      if (averageLValue >= 0 && averageLValue < 2) {
        return "/movement100.mp4";
      } else if (averageLValue >= 2 && averageLValue < 5) {
        return "/movement80.mp4";
      } else if (averageLValue >= 5 && averageLValue < 10) {
        return "/movement60.mp4";
      } else if (averageLValue >= 60 && averageLValue < 80) {
        return "/movement40.mp4";
      } else if (averageLValue >= 80 && averageLValue <= 100) {
        return "/movement20.mp4";
      } else {
        return "/movement20.mp4"; // Default fallback video
      }
    };
    const getVideoMMTLASource = () => {
      const averageLAValue = parseFloat(calculateLowerAverage()); // Convert to number
    
      if (averageLAValue >= 0 && averageLAValue < 2) {
        return "/movement100.mp4";
      } else if (averageLAValue >= 2 && averageLAValue < 5) {
        return "/movement80.mp4";
      } else if (averageLAValue >= 5 && averageLAValue < 10) {
        return "/movement60.mp4";
      } else if (averageLAValue >= 60 && averageLAValue < 80) {
        return "/movement40.mp4";
      } else if (averageLAValue >= 80 && averageLAValue <= 100) {
        return "/movement20.mp4";
      } else {
        return "/movement20.mp4"; // Default fallback video
      }
    };
    const getVideo10MBSource = () => {
      if (tugField3 >= 0 && tugField3 < 12) {
        return "/movement100.mp4";
      } else if (tugField3 >= 12 && tugField3 < 25) {
        return "/movement60.mp4";
      } else if (tugField3 >= 25 && tugField3 < 100) {
        return "/movement20.mp4";
      }  else {
        return "/movement20.mp4"; // Default fallback video
      }
    };
    
  const categoryInputs = {
    Shoulder: {
      Left: ["Flexion", "Extension", "Abduction", "Adduction", "Internal Rotation", "External Rotation"],
      Right: ["Flexion", "Extension", "Abduction", "Adduction", "Internal Rotation", "External Rotation"]
    },
    Elbow: {
      Left: ["Flexion", "Extension"],
      Right: ["Flexion", "Extension"]
    },
    Wrist: {
      Left: ["Flexion", "Extension"],
      Right: ["Flexion", "Extension"]
    },
    Finger: {
      Left: ["Flexion", "Extension", "Abduction", "Adduction"],
      Right: ["Flexion", "Extension", "Abduction", "Adduction"]
    }
  };
  const categoryLowerInputs = {
    Hip: {
      Left: ["Flexion", "Extension", "Abduction", "Adduction", "Internal Rotation", "External Rotation"],
      Right: ["Flexion", "Extension", "Abduction", "Adduction", "Internal Rotation", "External Rotation"]
    },
    Knee: {
      Left: ["Flexion", "Extension"],
      Right: ["Flexion", "Extension"]
    },
    Ankle: {
      Left: ["Plantar Flexion", "Dorsiflexion", "Inversion", "Eversion"],
      Right: ["Plantar Flexion", "Dorsiflexion", "Inversion", "Eversion"]
    },
    Toes: {
      Left: ["Flexion", "Extension", "Abduction", "Adduction"],
      Right: ["Flexion", "Extension", "Abduction", "Adduction"]
    }
  };
  
  const handleDaysInput = (e) => {
    setDaysOfTreatment(e.target.value);
  };
  const handleCheckboxChange = (option) => {
    setSelectedCategories((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };
  const handleCheckboxLowerChange = (option) => {
    setSelectedLowerCategories((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };
  const calculateUserEnteredAverage = () => {
    let selectedValues = [];
  
    manuallyEnteredFields.forEach((key) => {
      const [category, side, field] = key.split("-"); // Extract category, side, field from stored key
  
      // Get the value from inputValues
      let value = inputValues?.[category]?.[side]?.[field];
  
      // Convert value to number and add to array if valid
      let numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        selectedValues.push(numValue);
      }
    });
  
    // Calculate the average only if there are valid numeric values
    return selectedValues.length > 0
      ? (selectedValues.reduce((sum, val) => sum + val, 0) / selectedValues.length).toFixed(2)
      : "N/A";
  };
  const calculateUserEnteredLowerAverage = () => {
    let selectedLowerValues = [];
  
    manuallyEnteredLowerFields.forEach((key) => {
      const [category, side, field] = key.split("-"); // Extract category, side, field from stored key
  
      // Get the value from inputValues
      let value = LowerinputValues?.[category]?.[side]?.[field];
  
      // Convert value to number and add to array if valid
      let numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        selectedLowerValues.push(numValue);
      }
    });
  
    // Calculate the average only if there are valid numeric values
    return selectedLowerValues.length > 0
      ? (selectedLowerValues.reduce((sum, val) => sum + val, 0) / selectedLowerValues.length).toFixed(2)
      : "N/A";
  };
  const calculateAverage = () => {
    let selectedValues = [];
  
    selectedCategories.forEach((category) => {
      ["Left", "Right"].forEach((side) => {
        if (improvedValues[category]?.[side]) {
          Object.values(improvedValues[category][side]).forEach((value) => {
            // Convert values to numbers and ignore non-numeric values (like "1+")
            let numValue = parseFloat(value);
            if (!isNaN(numValue)) {
              selectedValues.push(numValue);
            }
          });
        }
      });
    });
  
    // Calculate the average only if there are valid numeric values
    return selectedValues.length > 0
      ? (selectedValues.reduce((sum, val) => sum + val, 0) / selectedValues.length).toFixed(2)
      : "N/A";
  };
  const calculateLowerAverage = () => {
    let selectedLowerValues = [];
  
    selectedLowerCategories.forEach((category) => {
      ["Left", "Right"].forEach((side) => {
        if (improvedLowerValues[category]?.[side]) {
          Object.values(improvedLowerValues[category][side]).forEach((value) => {
            // Convert values to numbers and ignore non-numeric values (like "1+")
            let numValue = parseFloat(value);
            if (!isNaN(numValue)) {
              selectedLowerValues.push(numValue);
            }
          });
        }
      });
    });
  
    // Calculate the average only if there are valid numeric values
    return selectedLowerValues.length > 0
      ? (selectedLowerValues.reduce((sum, val) => sum + val, 0) / selectedLowerValues.length).toFixed(2)
      : "N/A";
  };
  
  const handleTugInput = (e, setValue) => {
    let value = e.target.value;
  
    if (value === "") {
      setValue(""); // Allow empty input
      
    } else {
      let num = Number(value);
      
      if (!isNaN(num) && num >= 0 && num <= 1000) {
        setValue(value);
  
        // Update warning messages dynamically
        if (num >= 15) {
          setWarning("Note: High Risk of falling");
        } else {
          setWarning(""); // No warning if within the valid range
        }
      }
    }
  };
  const handle10MInput = (e, setValue) => {
    let value = e.target.value;
  
    if (value === "") {
      setValue(""); // Allow empty input
      settenMWarning(""); // Clear warning if input is empty
    } else {
      let num = Number(value);
  
      if (!isNaN(num) && num >= 0 && num <= 1000) {
        setValue(value);
  
        // Update warning messages dynamically
        if (num >= 0 && num < 12) {
          settenMWarning("Note: Community Ambulators");
        } else if (num >= 12 && num < 25) {
          settenMWarning("Note: Limited Community Ambulators");
        } else if (num >= 25 && num < 100) {
          settenMWarning("Note: Household Ambulators");
        } else {
          settenMWarning(""); // No warning if within the valid range
        }
      }
    }
  };
  
  
  useEffect(() => {
    const randomValue = Math.floor(Math.random() * 101); // Generate 0-100
    setTugField2(randomValue);
  
    // Set warning based on the random value
    if (randomValue >= 14) {
      setTugWarning(" Note: High Risk Of Falling");
    } else 
      setTugWarning(" Note:Good Mobility");
    
  }, []);

  useEffect(() => {
    const randomValue = (Math.random() * 5).toFixed(2); // Generate between 0 and 5
    setTugField4(parseFloat(randomValue));
  
    // Set warning based on the random value
    if (parseFloat(randomValue) >= 0.8) {
      setTenMBwarning(" Note: Community Ambulators");
    } else if (parseFloat(randomValue) >= 0.4 && parseFloat(randomValue) < 0.8) {
      setTenMBwarning(" Note: Limited Community Ambulators ");
    } else {
      setTenMBwarning("Note: Household Ambulators");
    }
  }, []);
  const handleInputChange = (category, side, field, value) => {
    // Track manually entered fields
    setManuallyEnteredFields(prev => {
      const key = `${category}-${side}-${field}`;
      const newSet = new Set(prev);
      newSet.add(key);
      return newSet;
    });

    setInputValues(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [side]: {
          ...prev[category]?.[side],
          [field]: value
        }
      }
    }));
  };
  const handleLowerInputChange = (category, side, field, value) => {
    // Track manually entered fields
    setManuallyEnteredLowerFields(prev => {
      const key = `${category}-${side}-${field}`;
      const newSet = new Set(prev);
      newSet.add(key);
      return newSet;
    });

    setLowerInputValues(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [side]: {
          ...prev[category]?.[side],
          [field]: value
        }
      }
    }));
  };

  const setNormalValues = (category, side) => {
    // Remove fields from manually entered set when using "Normal" button
    categoryInputs[category][side].forEach(field => {
      setManuallyEnteredFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(`${category}-${side}-${field}`);
        return newSet;
      });
    });


    const normalValues = {};
    categoryInputs[category][side].forEach(field => {
      normalValues[field] = "5";
    });

    setInputValues(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [side]: normalValues
      }
    }));
  };
  const setLowerNormalValues = (category, side) => {
    // Remove fields from manually entered set when using "Normal" button
    categoryLowerInputs[category][side].forEach(field => {
      setManuallyEnteredLowerFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(`${category}-${side}-${field}`);
        return newSet;
      });
    });


    const normalValues = {};
    categoryLowerInputs[category][side].forEach(field => {
      normalValues[field] = "5";
    });

    setLowerInputValues(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [side]: normalValues
      }
    }));
  };
  const handleTUGSubmit = () => {
    setIsOpen(!isOpen);
  };

  const getRandomPredefinedValue = () => {
    const randomIndex = Math.floor(Math.random() * predefinedValues.length);
    return predefinedValues[randomIndex];
  };

  const isDiseaseEnabled = gender !== "" && age !== "";
  const handleSubmit = () => {
    setIsSubmitting(true);
    setHasSubmitted(true);
    
    // Generate improved values for upper body
    const newImprovedValues = {};
    selectedCategories.forEach(category => {
      newImprovedValues[category] = { Left: {}, Right: {} };
      
      ["Left", "Right"].forEach(side => {
        categoryInputs[category][side].forEach(field => {
          const key = `${category}-${side}-${field}`;
          if (manuallyEnteredFields.has(key) && inputValues[category]?.[side]?.[field]) {
            newImprovedValues[category][side][field] = getRandomPredefinedValue();
          }
        });
      });
    });
  
    // Generate improved values for lower body
    const newImprovedLowerValues = {};
    selectedLowerCategories.forEach(category => {
      newImprovedLowerValues[category] = { Left: {}, Right: {} };
      
      ["Left", "Right"].forEach(side => {
        categoryLowerInputs[category][side].forEach(field => {
          const key = `${category}-${side}-${field}`;
          if (manuallyEnteredLowerFields.has(key) && LowerinputValues[category]?.[side]?.[field]) {
            newImprovedLowerValues[category][side][field] = getRandomPredefinedValue();
          }
        });
      });
    });
  
    // Helper function to check if there are any values
    const hasValues = (obj) => {
      return Object.keys(obj).some(category => 
        Object.keys(obj[category].Left).length > 0 || 
        Object.keys(obj[category].Right).length > 0
      );
    };
  
    setTimeout(() => {
      // Update both sets of values
      setImprovedValues(newImprovedValues);
      setImprovedLowerValues(newImprovedLowerValues);
      
      // Only show sections that have values
      setShowImprovedValues(hasValues(newImprovedValues));
      setShowImprovedLowerValues(hasValues(newImprovedLowerValues));
      
      setIsSubmitting(false);
      setHideContent(true);
    }, 2000);
  };
  
  // Make handleMMTSubmit do the same thing
  const handleMMTSubmit = handleSubmit;
  useEffect(() => {
    setIsDaysOfTreatmentActive(tugField1 !== "");
    setIsSubmitActive(tugField1 !== "" && daysOfTreatment !== "");
  }, [tugField1, daysOfTreatment]);
  const handleTreatChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and limit to 3 digits
    if (/^\d{0,3}$/.test(value)) {
      setDaysOfTreatment(value);
    }
  };
  const handleAnimateClick = () => {
    setShowVideo(true); // Show video on clicking "Animate"
  };
  const handleMMTAnimateClick = () => {
    setShowMMTVideo(true); // Show video on clicking "Animate"
  };
  const handleMMTLBAnimateClick = () => {
    setShowMMTLBVideo(true); // Show video on clicking "Animate"
  };
  const handleMMTLAAnimateClick = () => {
    setShowMMTLAVideo(true); // Show video on clicking "Animate"
  };
  const handleTUGAnimateClick = () => {
    setShowTUGVideo(true); // Show video on clicking "Animate"
  };
  const handle10MAnimateClick = () => {
    setShow10MVideo(true); // Show video on clicking "Animate"
  };
  const handleTUGBAnimateClick = () => {
    setShowTUGBVideo(true); // Show video on clicking "Animate"
  };
  const handle10BAnimateClick = () => {
    setShow10BVideo(true); // Show video on clicking "Animate"
  };
   // Function to close video modal
   const handleCloseVideo = () => {
    setShowVideo(false);
  };
  const handleMMTCloseVideo = () => {
    setShowMMTVideo(false);
  };
  const handleCloseMMTLBVideo = () => {
    setShowMMTLBVideo(false);
  };
  const handleCloseMMTLAVideo = () => {
    setShowMMTLAVideo(false);
  };
  const handleTUGCloseVideo = () => {
    setShowTUGVideo(false);
  };
  const handleTUGBCloseVideo = () => {
    setShowTUGBVideo(false);
  };
  const handle10BCloseVideo = () => {
    setShow10BVideo(false);
  };
  const handle10MCloseVideo = () => {
    setShow10MVideo(false);
  };
  const isAllInputsFilled = () => {
    return selectedCategories.every(category =>
      ["Left", "Right"].every(side =>
        categoryInputs[category]?.[side]?.every(inputField =>
          inputValues[category]?.[side]?.[inputField]
        )
      )
    );
  };
  const checkInputsValidity = () => {
    let isValid = true;
    
    selectedCategories.forEach(category => {
      ["Left", "Right"].forEach(side => {
        categoryInputs[category][side].forEach(field => {
          if (!inputValues[category]?.[side]?.[field]) {
            isValid = false;
          }
        });
      });
    });

    // Only set valid if there are any categories selected and all their inputs are filled
    setIsInputsValid(selectedCategories.length > 0 && isValid);
   
  };
  const checkLowerInputsValidity = () => {
    let isValid = true;
    
    selectedLowerCategories.forEach(category => {
      ["Left", "Right"].forEach(side => {
        categoryLowerInputs[category][side].forEach(field => {
          if (!LowerinputValues[category]?.[side]?.[field]) {
            isValid = false;
          }
        });
      });
    });

    // Only set valid if there are any categories selected and all their inputs are filled
    setIsInputsValid(selectedCategories.length > 0 && isValid);
    setIsLowerInputsValid(selectedLowerCategories.length > 0 && isValid);
  };

  // Check inputs validity whenever input values or selected categories change
  useEffect(() => {
    checkInputsValidity();
  }, [inputValues, selectedCategories]);
  useEffect(() => {
    checkLowerInputsValidity();
  }, [LowerinputValues, selectedLowerCategories]);
  
  return (
    <div>
      <div className="banner" style={{ backgroundImage: `url(${Health})` }}>
        STROKE
      </div>
      {!hideContent && (
<div className="close">
      <div className="inputsone" style={{ display: "flex", flexDirection: "row" }}>
        <label>
          Gender
          <select name="gender" style={{ display: "block" }} onChange={(e) => setGender(e.target.value)}>
            <option value="selectgender">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label>
  Age
  <input
    type="number"
    name="age"
    placeholder="Enter Age"
    min="0"
    max="999"
    style={{ display: "block" }}
    onChange={(e) => {
      const value = e.target.value;
      // Only allow non-negative numbers up to 3 digits
      if (value >= 0 && value <= 999) {
        setAge(value);
      } else if (value < 0) {
        setAge(0); // Reset to 0 if negative
      } else if (value > 999) {
        setAge(999); // Cap at 999
      }
    }}/>
</label>

        <label>
          Diagnosis
          <select name="disease" style={{ display: "block" }}
            onChange={(e) => setSelectedDisease(e.target.value)}
            disabled={!isDiseaseEnabled}
          >
            <option value="selectdisease">Select Disease</option>
            <option value="hemiparesis">Hemorrhagic</option>
          </select>
        </label>
      </div>

      {selectedDisease === "hemiparesis" && (
        <div >
       {!hideTUGContent &&(
          <div className="section-buttons" style={{ justifyContent: "center", display: "flex", gap: "10px", marginTop: "20px" }}>
          <button onClick={() => { setShowTugFields(true); setShow10MFields(false); setShowLimbButtons(false);setHideLowerInputs(true);setHideUpperInputs(true); }}>TUG</button>
        <button onClick={() => { setShow10MFields(true); setShowTugFields(false);setHideLowerInputs(true);setHideUpperInputs(true); setShowLimbButtons(false) }}>10M</button>
          <button onClick={() =>{ setShowLimbButtons(true); setShow10MFields(false); setShowTugFields(false);} }>MMT</button>
          </div>)}
          {showLimbButtons && (
          <div>
          <button onClick={() => {setShowPopup(true);setHideUpperInputs(false);}}>Upper Limb</button>
          <button onClick={() => {setShowLowerPopup(true);setHideLowerInputs(false)}}>Lower Limb</button></div>)}
        </div>
      )}
      {/*TUG and 10M code starts here*/}
{/* TUG Input Fields */}
{showTugFields && (
       <div style={{backgroundColor:"#f3f6f9", boxShadow:"0 4px 10px rgba(0, 0, 0, 0.1)"}}> 
        <div className="tug" style={{display:"flex",gap:"40px", padding:"20px",margin:"20px"}}>
          
          <label>
             Time In Seconds:
            <input type="text" placeholder="Time In Seconds" style={{width:"100%"}} value={tugField1}
          onChange={(e) => handleTugInput(e, setTugField1)}/>
          </label>
          <label>
         Assistive Device Used
          <select name="disease" style={{ display: "block" }}
            onChange={(e) => setAssistivedevice(e.target.value)}
            disabled={!isDiseaseEnabled}
          >
            <option value="selectdevice">Select Device</option>
            <option value="none">None</option>
            <option value="Walkingstick">Walking stick</option>
            <option value="Quadripod">Quadripod</option>
            <option value="Walkingframe">Walking frame</option>
            <option value="Other">Other</option>

          </select>
        </label>
       <div className="inputsone"> <label>
            Days of Treatment
            <input type="text" placeholder="Enter value"  style={{width:"100%"}} value={daysOfTreatment}
                onChange={handleDaysInput}
                disabled={!tugField1} // Disabled until TUG Field 1 has a value
           />
          </label>
          <button  onClick={() => { setShowImprovemnt(true);setHideTUGContent(true); setShowTugFields(false)}}disabled={!daysOfTreatment} >TUG Submit</button>
          
          <button onClick={handleTUGBAnimateClick} disabled={!daysOfTreatment}>TUG Avatar</button>
          
          {showTUGBVideo && (
        <div style={{
          position: "fixed",top: 0,left: 0,width: "100%",height: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",zIndex: 1000
        }}>
          <div style={{
            position: "relative", maxWidth: "800px",background: "#000",padding: "20px", borderRadius: "8px"
          }}>
            <button
              onClick={handleTUGBCloseVideo}
              style={{
                position: "absolute",top: "-40px",right: "0",backgroundColor: "white", border: "none", borderRadius: "50%",
                width: "30px",height: "30px",cursor: "pointer", display: "flex",alignItems: "center",
                justifyContent: "center",fontSize: "18px"
              }}
            >
              x
            </button>
            <video
             
              controls
              autoPlay
              style={{ borderRadius: "4px",height:"500px",width:"600px" }}
            >
              <source src={getVideoTUGSource()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

)}
        </div></div><div className="warning">{warning}</div></div>
      )}
{showImprovement && (
          <div> 
             <div >
              <h3 style={{padding:"20px"}}>Improved TUG Results</h3>
              <div className="inputsone" style={{display:"flex",justifyContent:"flex-start", padding:"30px", backgroundColor:"#f3f6f9", boxShadow:"0 4px 10px rgba(0, 0, 0, 0.1)"}}>
              <label>
            Improved TUG:
            <input
        type="text"
        style={{ width: "100%" }}
        value={tugField2 !== null ? tugField2 : ""}
        readOnly
      />
          </label>
              <button onClick={handleTUGClick}> Modalities</button>
              <button onClick={handleTUGAnimateClick}>Avatar</button>
              <button onClick={() => window.location.reload()}>Reset</button></div></div><div className="warning">{tugWarning}</div></div>
              )}
              {showTUGImages && (
  <div 
    style={{
      marginTop: "20px",
      padding: "20px",
      border: "2px solid #ddd",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      background: "#f9f9f9",
      textAlign: "center"
    }}
  >
    {/* Image 1 */}
    <div>
      <img 
        src={gait} 
        alt="gait" 
        style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "6px" }} 
      />
      <p style={{ marginTop: "8px", fontSize: "16px", fontWeight: "bold" }}>Vicon Gait Analysis
</p>
    </div>

    {/* Image 2 */}
    <div>
      <img 
        src={pablo} 
        alt="Pablo" 
        style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "6px" }} 
      />
      <p style={{ marginTop: "8px", fontSize: "16px", fontWeight: "bold" }}>Pablo Motus</p>
    </div>
  </div>
)}
      {showTUGVideo && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            position: "relative",
           
            maxWidth: "800px",
            background: "#000",
            padding: "20px",
            borderRadius: "8px"
          }}>
            <button
              onClick={handleTUGCloseVideo}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                backgroundColor: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px"
              }}
            >
              x
            </button>
            <video
             
              controls
              autoPlay
              style={{ borderRadius: "4px",height:"500px",width:"600px" }}
            >
              <source src={getVideoSource()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

)}
      {/* 10M Input Fields */}
      {show10MFields && (
      <div style={{backgroundColor:"#f3f6f9", boxShadow:"0 4px 10px rgba(0, 0, 0, 0.1)"}}> 
         <div className="tug" style={{display:"flex",gap:"40px", padding:"20px", margin:"20px"}}>
          <label>
             Time In Seconds:
            <input type="text" placeholder="Time In Seconds" style={{width:"100%"}} value={tugField3}
          onChange={(e) => handle10MInput(e, setTugField3)}/>
          </label>
          <label>
         Assistive Device Used
          <select name="disease" style={{ display: "block" }}
            onChange={(e) => setAssistive10mdevice(e.target.value)}
            disabled={!isDiseaseEnabled}
          >
            <option value="select10mdevice">Select Device</option>
            <option value="none10m">None</option>
            <option value="Walkingstick10m">Walking stick</option>
            <option value="Quadripod10m">Quadripod</option>
            <option value="Walkingframe10m">Walking frame</option>
            <option value="Other10m">Other</option>

          </select>
        </label>
       <div className="inputsone"> <label>
            Days of Treatment
            <input type="text" placeholder="Enter value"  style={{width:"100%"}} value={daysOfTreatment}
                onChange={handleDaysInput}
                disabled={!tugField3} // Disabled until TUG Field 1 has a value
           />
          </label>
          <button  onClick={() => { setShow10MImprovemnt(true);setHideTUGContent(true); setShow10MFields(false)}}disabled={!daysOfTreatment} >10M Submit</button>
          
          <button onClick={handle10BAnimateClick} disabled={!daysOfTreatment}>10M Avatar</button>
          {show10BVideo && (
        <div style={{position: "fixed",top: 0,left: 0,width: "100%",height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",display: "flex",flexDirection: "column",justifyContent: "center",
          alignItems: "center",zIndex: 1000
        }}>
          <div style={{
            position: "relative",maxWidth: "800px",background: "#000",padding: "20px", borderRadius: "8px"
          }}>
            <button
              onClick={handle10BCloseVideo}
              style={{ position: "absolute", top: "-40px",right: "0",backgroundColor: "white",border: "none",
                borderRadius: "50%",width: "30px",height: "30px",cursor: "pointer",display: "flex", alignItems: "center",
                justifyContent: "center",fontSize: "18px"
              }}
            >
              x
            </button>
            <video
             
              controls
              autoPlay
              style={{ borderRadius: "4px",height:"500px",width:"600px" }}
            >
              <source src={getVideo10MBSource()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

)}
        </div></div><div className="warning">{tenMwarning}</div></div>
      )}
{show10MImprovement && (
          <div>
              <div >
              <h3 style={{padding:"20px"}}>Improved 10M Results</h3>
              <div className="inputsone" style={{display:"flex",justifyContent:"flex-start",padding:"30px", backgroundColor:"#f3f6f9", boxShadow:"0 4px 10px rgba(0, 0, 0, 0.1)"}}>
              <label>
            Improved 10M (m/s):
            <input
        type="text"
        style={{ width: "100%" }}
        value={tugField4 !== null ? tugField4 : ""}
        readOnly
      />
          </label>
              <button onClick={handle10MClick}> Modalities</button>
              <button onClick={handle10MAnimateClick}>Avatar</button>
              <button onClick={() => window.location.reload()}>Reset</button></div></div><div className="warning">{tenMBwarning}</div></div>
              )}
              {show10MImages && (
  <div 
    style={{
      marginTop: "20px",
      padding: "20px",
      border: "2px solid #ddd",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      background: "#f9f9f9",
      textAlign: "center"
    }}
  >
    {/* Image 1 */}
    <div>
      <img 
        src={gait} 
        alt="gait" 
        style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "6px" }} 
      />
      <p style={{ marginTop: "8px", fontSize: "16px", fontWeight: "bold" }}>Vicon Gait Analysis
</p>
    </div>

    {/* Image 2 */}
    <div>
      <img 
        src={pablo} 
        alt="Pablo" 
        style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "6px" }} 
      />
      <p style={{ marginTop: "8px", fontSize: "16px", fontWeight: "bold" }}>Pablo Motus</p>
    </div>
  </div>
)}
      {show10MVideo && (
        <div style={{position: "fixed",top: 0,left: 0,width: "100%",height: "100%",backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex", flexDirection: "column",justifyContent: "center",alignItems: "center", zIndex: 1000
        }}>
          <div style={{
            position: "relative", maxWidth: "800px", background: "#000", padding: "20px", borderRadius: "8px"
          }}>
            <button
              onClick={handle10MCloseVideo}
              style={{position: "absolute", top: "-40px",right: "0", backgroundColor: "white",border: "none",
                borderRadius: "50%",width: "30px",height: "30px",cursor: "pointer",display: "flex",alignItems: "center",
                justifyContent: "center",fontSize: "18px"
              }}
            >
              x
            </button>
            <video
             
              controls
              autoPlay
              style={{ borderRadius: "4px",height:"500px",width:"600px" }}
            >
              <source src={getVideo10MSource()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

)}
  {/*TUG and 10M code ends here*/}
    {/*MMT code starts here*/}
{showPopup && (
        <div className="popup-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="popup-content" style={{ background: "#fff", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
            <h3>Select Upper Limb Condition</h3>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
              {checkboxOptions.map((option) => (
                <label key={option} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedCategories.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <button onClick={() => setShowPopup(false)} style={{ marginTop: "25px" }}>Submit</button>
          </div>
        </div>
      )}
{showLowerPopup && (
        <div className="popup-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="popup-content" style={{ background: "#fff", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
            <h3>Select Lower Limb Condition</h3>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
              {lowercheckboxOptions.map((option) => (
                <label key={option} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={selectedLowerCategories.includes(option)}
                    onChange={() => handleCheckboxLowerChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            <button onClick={() => setShowLowerPopup(false)} style={{ marginTop: "25px" }}>Submit</button>
          </div>
        </div>
      )}
      {/*Main DND starts here*/}
{selectedCategories.length > 0 && !hideUpperInputs &&(
  <div className="input-section" style={{ marginTop: "20px" }}>
    {selectedCategories.map((category, index) => (
      <div key={category} className="input-card" style={{ marginBottom: "15px" }}>
        <div><h3> Upper {category} Inputs:</h3></div>
        <div>
          <div style={{ paddingBottom: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Left</h4>
              <button onClick={() => setNormalValues(category, "Left")}>Normal</button>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {categoryInputs[category]?.Left.map((inputField) => (
                <label key={inputField}>
                  {inputField}
                  <select
                    value={inputValues[category]?.Left?.[inputField] || ""}
                    onChange={(e) => handleInputChange(category, "Left", inputField, e.target.value)}
                    style={{  border: "1px solid #ccc" }}
                  >
                    <option value="">Select</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2-">2-</option>
                    <option value="2">2</option>
                    <option value="2+">2+</option>
                    <option value="3-">3-</option>
                    <option value="3">3</option>
                    <option value="3+">3+</option>
                    <option value="4-">4-</option>
                    <option value="4">4</option>
                    <option value="4+">4+</option>
                    <option value="5">5</option>
                  </select>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Right</h4>
              <button onClick={() => setNormalValues(category, "Right")}>Normal</button>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {categoryInputs[category]?.Right.map((inputField) => (
                <label key={inputField}>
                  {inputField}
                  <select
                    value={inputValues[category]?.Right?.[inputField] || ""}
                    onChange={(e) => handleInputChange(category, "Right", inputField, e.target.value)}
                    style={{ border: "1px solid #ccc" }}
                  >
                    <option value="">Select</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2-">2-</option>
                    <option value="2">2</option>
                    <option value="2+">2+</option>
                    <option value="3-">3-</option>
                    <option value="3">3</option>
                    <option value="3+">3+</option>
                    <option value="4-">4-</option>
                    <option value="4">4</option>
                    <option value="4+">4+</option>
                    <option value="5">5</option>
                  </select>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}

<div style={{ marginTop: "20px", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontWeight: "bold", marginRight: "8px" }}>
            Days of Treatment:
          </label>
          <input
            type="text"
            value={daysOfTreatment}
            onChange={handleTreatChange}
            placeholder="Enter days (0-999)"
            disabled={!isInputsValid}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              textAlign: "center",
              backgroundColor: !isInputsValid ? "#f5f5f5" : "white",
              cursor: !isInputsValid ? "not-allowed" : "text"
            }}
          />
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !daysOfTreatment || !isInputsValid}
          style={{
            padding: "8px 16px",
            backgroundColor: isSubmitting || !daysOfTreatment || !isInputsValid ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isSubmitting || !daysOfTreatment || !isInputsValid ? "not-allowed" : "pointer",
            transition: "background-color 0.3s"
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Upper Limb Results"}
        </button>
        
        {!hasSubmitted && (
          <button
            onClick={handleAnimateClick}
            disabled={!daysOfTreatment || !isInputsValid}
            style={{
              padding: "8px 16px",
              backgroundColor: !daysOfTreatment || !isInputsValid ? "#ccc" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: !daysOfTreatment || !isInputsValid ? "not-allowed" : "pointer",
              transition: "background-color 0.3s"
            }}
          >
           MMT Upper Limb Avatar
          </button>
          
        )}
      </div>
        </div>
      )}
      {/*Main DND ends here*/}
{selectedLowerCategories.length > 0 && !hideLowerInputs && (
  <div className="input-section" style={{ marginTop: "20px" }}>
    {selectedLowerCategories.map((category, index) => (
      <div key={category} className="input-card" style={{ marginBottom: "15px" }}>
        <div><h3> Lower {category} Inputs:</h3></div>
        <div>
          <div style={{ paddingBottom: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Left</h4>
              <button onClick={() => setLowerNormalValues(category, "Left")}>Normal</button>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {categoryLowerInputs[category]?.Left.map((inputField) => (
                <label key={inputField}>
                  {inputField}
                  <select
                    value={LowerinputValues[category]?.Left?.[inputField] || ""}
                    onChange={(e) => handleLowerInputChange(category, "Left", inputField, e.target.value)}
                    style={{  border: "1px solid #ccc" }}
                  >
                    <option value="">Select</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2-">2-</option>
                    <option value="2">2</option>
                    <option value="2+">2+</option>
                    <option value="3-">3-</option>
                    <option value="3">3</option>
                    <option value="3+">3+</option>
                    <option value="4-">4-</option>
                    <option value="4">4</option>
                    <option value="4+">4+</option>
                    <option value="5">5</option>
                  </select>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Right</h4>
              <button onClick={() => setLowerNormalValues(category, "Right")}>Normal</button>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {categoryLowerInputs[category]?.Right.map((inputField) => (
                <label key={inputField}>
                  {inputField}
                  <select
                    value={LowerinputValues[category]?.Right?.[inputField] || ""}
                    onChange={(e) => handleLowerInputChange(category, "Right", inputField, e.target.value)}
                    style={{  border: "1px solid #ccc" }}
                  >
                    <option value="">Select</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2-">2-</option>
                    <option value="2">2</option>
                    <option value="2+">2+</option>
                    <option value="3-">3-</option>
                    <option value="3">3</option>
                    <option value="3+">3+</option>
                    <option value="4-">4-</option>
                    <option value="4">4</option>
                    <option value="4+">4+</option>
                    <option value="5">5</option>
                  </select>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}

<div style={{ marginTop: "20px", textAlign: "center", display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ fontWeight: "bold", marginRight: "8px" }}>
            Days of Treatment:
          </label>
          <input
            type="text"
            value={daysOfTreatment}
            onChange={handleTreatChange}
            placeholder="Enter days (0-999)"
            disabled={!isLowerInputsValid}
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              textAlign: "center",
              backgroundColor: !isLowerInputsValid ? "#f5f5f5" : "white",
              cursor: !isLowerInputsValid ? "not-allowed" : "text"
            }}
          />
        </div>
        
        <button
          onClick={handleMMTSubmit}
          disabled={isSubmitting || !daysOfTreatment || !isLowerInputsValid}
          style={{
            padding: "8px 16px",
            backgroundColor: isSubmitting || !daysOfTreatment || !isLowerInputsValid ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isSubmitting || !daysOfTreatment || !isLowerInputsValid ? "not-allowed" : "pointer",
            transition: "background-color 0.3s"
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Lower Limb Results"}
        </button>
        
        {!hasSubmitted && (
          <button
            onClick={handleMMTLBAnimateClick}
            disabled={!daysOfTreatment || !isLowerInputsValid}
            style={{
              padding: "8px 16px",
              backgroundColor: !daysOfTreatment || !isLowerInputsValid ? "#ccc" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: !daysOfTreatment || !isLowerInputsValid ? "not-allowed" : "pointer",
              transition: "background-color 0.3s"
            }}
          >
           MMT LowerLimb Avatar
          </button>
          
        )}
      </div>
        </div>
      )}

      {/* Video Modal with Close Button */}
      {showVideo && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            position: "relative",
           
            maxWidth: "800px",
            background: "#000",
            padding: "20px",
            borderRadius: "8px"
          }}>
            <button
              onClick={handleCloseVideo}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                backgroundColor: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px"
              }}
            >
              x
            </button>
            <video
             
              controls
              autoPlay
              style={{ borderRadius: "4px",height:"500px",width:"600px" }}
            >
              <source src={getVideoMMTSource()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

)}
{showMMTLBVideo && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            position: "relative",
           
            maxWidth: "800px",
            background: "#000",
            padding: "20px",
            borderRadius: "8px"
          }}>
            <button
              onClick={handleCloseMMTLBVideo}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                backgroundColor: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px"
              }}
            >
              x
            </button>
            <video
             
              controls
              autoPlay
              style={{ borderRadius: "4px",height:"500px",width:"600px" }}
            >
              <source src={getVideoMMTLBSource()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

)}
</div>)}
{/*DND Main code starts here*/}
{showImprovedValues && (
  <div
    className="improved-values"
    style={{
      marginTop: "20px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      background: "#f9f9f9"
    }}
  >
    <h3>Improved Upper Limb Values</h3>
    
    {selectedCategories.map((category) => (
      <div key={category}>
        {(Object.keys(improvedValues[category]?.Left || {}).length > 0 ||
          Object.keys(improvedValues[category]?.Right || {}).length > 0) && (
          <div style={{ marginBottom: "20px" }}>
            <h4>{category}</h4>
            {["Left", "Right"].map(
              (side) =>
                Object.keys(improvedValues[category]?.[side] || {}).length >
                  0 && (
                  <div key={side} style={{ marginBottom: "10px" }}>
                    <h5>{side}</h5>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "20px",
                        alignItems: "center"
                      }}
                    >
                      {Object.entries(improvedValues[category][side]).map(
                        ([field, value]) => (
                          <div key={field}>
                            <label style={{ fontWeight: "bold" }}>{field}</label>
                            <input
                              type="text"
                              value={value}
                              readOnly
                              title={getMessage(value)} // Tooltip on hover
                              style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                background: "#fff"
                              }}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    ))}
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
      <div>
        <button onClick={handleClick}>Modalities</button>
        <button onClick={handleMMTAnimateClick}>Avatar</button>
      </div>
      <div>
        <button onClick={() => window.location.reload()}>Reset</button>
      </div></div>
{/* Video Modal with
 Close Button */}
{showMMTVideo && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            position: "relative",
            width: "80%",
            maxWidth: "800px",
            background: "#000",
            padding: "20px",
            borderRadius: "8px"
          }}>
            <button
              onClick={handleMMTCloseVideo}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                backgroundColor: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px"
              }}
            >
              ×
            </button>
            <video
             
              controls
              autoPlay
              style={{ borderRadius: "4px",height:"500px",width:"600px" }}
            >
              <source src={getVideoMMTASource()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

)}
{showImages && (
  <div 
    style={{
      marginTop: "20px",
      padding: "20px",
      border: "2px solid #ddd",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      background: "#f9f9f9",
      textAlign: "center"
    }}
  >
    {/* Image 1 */}
    <div>
      <img 
        src={Luna} 
        alt="Luna EMG" 
        style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "6px" }} 
      />
      <p style={{ marginTop: "8px", fontSize: "16px", fontWeight: "bold" }}>Luna EMG</p>
    </div>

    {/* Image 2 */}
    <div>
      <img 
        src={pablo} 
        alt="Pablo" 
        style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "6px" }} 
      />
      <p style={{ marginTop: "8px", fontSize: "16px", fontWeight: "bold" }}>Pablo</p>
    </div>
  </div>
)}

        </div>
      )}
      {/*DND main code ends here*/}
      {showImprovedLowerValues && (
  <div
    className="improved-values"
    style={{
      marginTop: "20px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      background: "#f9f9f9"
    }}
  >
    <h3>Improved Lower Limb Values</h3>
   
    {selectedLowerCategories.map((category) => (
      <div key={category}>
        {(Object.keys(improvedLowerValues[category]?.Left || {}).length > 0 ||
          Object.keys(improvedLowerValues[category]?.Right || {}).length > 0) && (
          <div style={{ marginBottom: "20px" }}>
            <h4>{category}</h4>
            {["Left", "Right"].map(
              (side) =>
                Object.keys(improvedLowerValues[category]?.[side] || {}).length >
                  0 && (
                  <div key={side} style={{ marginBottom: "10px" }}>
                    <h5>{side}</h5>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "20px",
                        alignItems: "center"
                      }}
                    >
                      {Object.entries(improvedLowerValues[category][side]).map(
                        ([field, value]) => (
                          <div key={field}>
                            <label style={{ fontWeight: "bold" }}>{field}</label>
                            <input
                              type="text"
                              value={value}
                              readOnly
                              style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                background: "#fff"
                              }}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    ))}
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
      <div>
        <button onClick={handleClick}>Modalities</button>
        <button onClick={handleMMTLAAnimateClick}>Avatar</button>
      </div>
      <div>
        <button onClick={() => window.location.reload()}>Reset</button>
      </div></div>
{/* Video Modal with
 Close Button */}
{showMMTLAVideo && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            position: "relative",
            width: "80%",
            maxWidth: "800px",
            background: "#000",
            padding: "20px",
            borderRadius: "8px"
          }}>
            <button
              onClick={handleCloseMMTLAVideo}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                backgroundColor: "white",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px"
              }}
            >
              ×
            </button>
            <video
             
              controls
              autoPlay
              style={{ borderRadius: "4px",height:"500px",width:"600px" }}
            >
              <source src={getVideoMMTLASource()} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

)}
{showImages && (
  <div 
    style={{
      marginTop: "20px",
      padding: "20px",
      border: "2px solid #ddd",
      borderRadius: "8px",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      background: "#f9f9f9",
      textAlign: "center"
    }}
  >
    {/* Image 1 */}
    <div>
      <img 
        src={Luna} 
        alt="Luna EMG" 
        style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "6px" }} 
      />
      <p style={{ marginTop: "8px", fontSize: "16px", fontWeight: "bold" }}>Luna EMG</p>
    </div>

    {/* Image 2 */}
    <div>
      <img 
        src={pablo} 
        alt="Pablo" 
        style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "6px" }} 
      />
      <p style={{ marginTop: "8px", fontSize: "16px", fontWeight: "bold" }}>Pablo</p>
    </div>
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default DualPredictionForm;
