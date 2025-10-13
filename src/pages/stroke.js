import React, { useState, useEffect } from "react";
import axios from 'axios';
import Health from "../assets/Brain.jpg";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis,PieChart,Pie, Tooltip, Legend, Cell, ReferenceLine } from 'recharts';
import "../styles/Monoplegia.css";
import Luna from "../assets/luna_emg.jpg"
import pablo from "../assets/pablo.jpg"
import gait from "../assets/gait.jpg"
import vibra from "../assets/VIBRAMOOV.jpg"
import tymo from "../assets/rtms.jpg"
import rtms from "../assets/rtms.jpg"
import hoh from "../assets/grip.jpg"
import cyberdyne from "../assets/cyberdyna.jpg"
import balance from "../assets/advance_neuro.jpg"


const DualPredictionForm = () => {
  const [gender, setGender] = useState("");
  const [totalSumMap, setTotalSumMap] = useState({});
  const [age, setAge] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const [assistivedevice, setAssistivedevice] = useState("");
  const [warning, setWarning] = useState(""); // State to store the warning message
  const [tenMwarning, settenMWarning] = useState(""); // State to store the warning message
  const [tugWarning, setTugWarning] = useState(""); // State to store the warning message
  const [tenMBwarning, setTenMBwarning] = useState(""); // State to store the warning message
  const [assistive10mdevice, setAssistive10mdevice] = useState("");
  const [showLimbButtons, setShowLimbButtons] = useState(false);
  const [TbChartData, setTbChartData] = useState([]);
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
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const [tugField1, setTugField1] = useState("");
  const [tugField2, setTugField2] = useState(null);
  const [tugField3, setTugField3] = useState("");
  const [tugField4, setTugField4] = useState("");
  const [showTugFields, setShowTugFields] = useState(false);
  const [show10MFields, setShow10MFields] = useState(false);
  const [ShowTymoFields, setShowTymoFields] = useState(false);
  const [showImprovement, setShowImprovemnt] = useState(false);
  const [hideLowerInputs, setHideLowerInputs] = useState(false);
  const [hideUpperInputs, setHideUpperInputs] = useState(false);
  const [showLowerImprovement, setShowLowerImprovemnt] = useState(false);
  const [show10MImprovement, setShow10MImprovemnt] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [categorySums, setCategorySums] = useState({});
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
    const [TchartData, setTChartData] = useState([]);
    const [tenchartData, settenChartData] = useState([]);
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
// Updated getMessage function to ensure numeric comparison
const getMessage = (value) => {
  // First check if the value is a string that shouldn't be converted to number
  if (typeof value === 'string') {
    // Handle specific string values - add your string cases here
    switch (value.toLowerCase()) {
      case '2+':
        return "Moves Through partial ROM against gravity";
      case '2-':
        return "Moves through partial ROM gravity eliminated";
      case '3-':
        return "Gradual Release from test positon";
      case '3+':
        return "Holds test position against slight resistance";
      case '4+':
        return "Holds test position against moderate to strong pressure";
        case '4-':
        return "Holds test position against slight to moderate pressure";
      // Add more string cases as needed
      default:
        // If it's not one of our known strings, try to convert to number
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          // Handle numeric values
          switch (numValue) {
            case 0:
              return "No Palpable";
            case 1:
              return "No Visible Movement";
            case 2:
              return "Able to move through full ROM";
            case 3:
              return "Holds test position against gravity";
            case 4:
              return "Holds test position against moderate resistance";
            case 5:
              return "Holds test position against maximal resistance";
            default:
              return "Invalid Grade";
          }
        }
        // If it's neither a known string nor a valid number
        return value; // Return the original value as the message
    }
  }
  
  // If the value is already a number
  const numValue = parseFloat(value);
  if (!isNaN(numValue)) {
    switch (numValue) {
      case 0:
              return "No Palpable";
            case 1:
              return "No Visible Movement";
            case 2:
              return "Able to move through full ROM";
            case 3:
              return "Holds test position against gravity";
            case 4:
              return "Holds test position against moderate resistance";
            case 5:
              return "Holds test position against maximal resistance";
            default:
        return "Invalid Grade";
    }
  }
  
  return "Invalid Value";
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
    const fields = [
      'Medio Lateral Displacement',
      'Anterior Posterior Displacement',
      'Medio Lateral Displacement',
      'Anterior Posterior Displacement',
      'Medio Lateral Displacement',
      'Anterior Posterior Displacement',
      'Medio Lateral Displacement',
      'Anterior Posterior Displacement',
      'Visual Feedback Path',
      'Vestibular Feedback Path',
      'Somatosensory Feedback Path',
      'Central',
      'Reflex',
      'M1 Frequency Analysis',
      'M2 Frequency Analysis',
      'M3 Frequency Analysis',
      'M4 Frequency Analysis',
      'Romberg Index (M1/M2)',
      'Romberg Index (M3/M4)',
      'Sitting To Standing',
      'Standing Unsupported',
      'Sitting With Back Unsupported But Feet Supported On Floor Or On A Stool',
      'Standing To Sitting',
      'Transfers',
      'Standing Unsupported With Eye Closed',
      'Standing Unsupported With Feet Together',
      'Reaching Forward With Outstretched Arm While Standing',  
'Pick Up Object From The Floor From A Standing Position',  
'Turning To Look Behind Over Left And Right Shoulders While Standing',  
'Turn 360 Degrees',  
'Placing Alternate Foot On Step Or Stool While Standing Unsupported',  
'Standing Unsupported One Foot In Front',  
'Standing On One Leg'
    ];
    const headingMap = {
      0: "Eye Open Stable Surface",
      2: "Eye Close Stable Surface",
      4: "Eye Open Unstable Surface",
      6:"Eye Close Unstable Surface",
      19:"BBG" // Add more if needed
    };
    
    const [values, setValues] = useState(Array(fields.length).fill(""));
// Updated fetchTymoValues function
const fetchTymoValues = async () => {
  try {
    const response = await axios.post('http://localhost:5000/get-tymo-values');
    
    // Check if the response has the new structure with a "values" property
    const valuesArray = response.data.values || response.data;
    
    // Update your state with the values
    setValues(valuesArray);
    
    // Optionally, you can also display which file was processed
    // if (response.data.source_file) {
    //   console.log(`Data from: ${response.data.source_file} (${response.data.timestamp})`);
    // }
  } catch (error) {
    console.error('Error fetching Tymo values:', error);
    // Handle the error appropriately in your UI
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
    const convertMMTValue = (value) => {
      const mmtMap = {
        "0": 0, "1": 1, "2-": 1.67, "2": 2, "2+": 2.33,
        "3-": 2.67, "3": 3, "3+": 3.33, "4-": 3.67, 
        "4": 4, "4+": 4.33, "5": 5
      };
      return mmtMap[value] ?? 0; // Default to 0 if value is missing
    };
    
    const getVideoMMTLBSource = () => {
      const averageLValue = parseFloat(calculateUserEnteredLowerAverage()); // Convert to number
    
      if (averageLValue >= 0 && averageLValue < 2) {
        return "/movement20.mp4";
      } else if (averageLValue >= 2 && averageLValue < 3) {
        return "/movement40.mp4";
      } else if (averageLValue >= 3 && averageLValue < 4) {
        return "/movement60.mp4";
      } else if (averageLValue >= 4 && averageLValue < 5) {
        return "/movement80.mp4";
      } else if (averageLValue >= 5 ) {
        return "/movement100.mp4";
      } else {
        return "/movement100.mp4"; // Default fallback video
      }
    };
    const getVideoMMTLASource = () => {
      const averageLAValue = parseFloat(calculateLowerAverage()); // Convert to number
    
      if (averageLAValue >= 0 && averageLAValue < 2) {
        return "/movement20.mp4";
      } else if (averageLAValue >= 2 && averageLAValue < 3) {
        return "/movement40.mp4";
      } else if (averageLAValue >= 3 && averageLAValue < 4) {
        return "/movement60.mp4";
      } else if (averageLAValue >= 4 && averageLAValue < 5) {
        return "/movement80.mp4";
      } else if (averageLAValue >= 5 ) {
        return "/movement100.mp4";
      } else {
        return "/movement100.mp4"; // Default fallback video
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
    const updatedSums = {};
    selectedCategories.forEach((category) => {
      const leftValues = Object.values(improvedValues[category]?.Left || {}).map(convertMMTValue);
      const rightValues = Object.values(improvedValues[category]?.Right || {}).map(convertMMTValue);
      const totalSum = [...leftValues, ...rightValues].reduce((sum, num) => sum + num, 0);
      updatedSums[category] = totalSum; // Store sum for each category
    });
    setTotalSumMap(updatedSums);
  }, [improvedValues, selectedCategories]);
  
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
    // Create a copy of the current manuallyEnteredFields and add the new field
    const updatedManualFields = new Set(manuallyEnteredFields);
    updatedManualFields.add(`${category}-${side}-${field}`);
    
    // Create a copy of current inputValues and update with the new value
    const updatedInputValues = {
      ...inputValues,
      [category]: {
        ...inputValues[category],
        [side]: {
          ...inputValues[category]?.[side],
          [field]: value
        }
      }
    };
    
    // Update states
    setManuallyEnteredFields(updatedManualFields);
    setInputValues(updatedInputValues);
    
    // Calculate sum with the updated values immediately
    const sum = calculateSumWithValues(category, updatedInputValues, updatedManualFields);
    
    // Update the sum
    setCategorySums(prev => ({
      ...prev,
      [category]: sum
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

// Similarly update the setNormalValues function
const setNormalValues = (category, side) => {
  // Create a copy of current manuallyEnteredFields
  const updatedManualFields = new Set(manuallyEnteredFields);
  
  // Remove fields for this category and side
  categoryInputs[category][side].forEach(field => {
    updatedManualFields.delete(`${category}-${side}-${field}`);
  });
  
  // Create normal values
  const normalValues = {};
  categoryInputs[category][side].forEach(field => {
    normalValues[field] = "5";
  });
  
  // Create updated inputValues
  const updatedInputValues = {
    ...inputValues,
    [category]: {
      ...inputValues[category],
      [side]: normalValues
    }
  };
  
  // Update states
  setManuallyEnteredFields(updatedManualFields);
  setInputValues(updatedInputValues);
  
  // Calculate sum with the updated values immediately
  const sum = calculateSumWithValues(category, updatedInputValues, updatedManualFields);
  
  // Update the sum
  setCategorySums(prev => ({
    ...prev,
    [category]: sum
  }));
};

// Function to calculate sum using provided values rather than state
const calculateSumWithValues = (category, values, manualFields) => {
  let sum = 0;
  
  // Go through both sides (Left and Right)
  ["Left", "Right"].forEach(side => {
    if (values[category]?.[side]) {
      // Go through each field in this category and side
      Object.entries(values[category][side]).forEach(([field, value]) => {
        // Check if this field was manually entered
        const key = `${category}-${side}-${field}`;
        
        if (manualFields.has(key) && value) {
          // Convert the MMT values to numbers
          if (value === "0") sum += 0;
          else if (value === "1") sum += 1;
          else if (value === "2-") sum += 1.67;
          else if (value === "2") sum += 2;
          else if (value === "2+") sum += 2.33;
          else if (value === "3-") sum += 2.67;
          else if (value === "3") sum += 3;
          else if (value === "3+") sum += 3.33;
          else if (value === "4-") sum += 3.67;
          else if (value === "4") sum += 4;
          else if (value === "4+") sum += 4.33;
          else if (value === "5") sum += 5;
        }
      });
    }
  });
  
  return Math.round(sum * 100) / 100; // Round to 2 decimal places
};

  
  // Add this new function to calculate sums for manually entered values only
  const calculateManualSum = (category) => {
    let sum = 0;
    
    // Go through both sides (Left and Right)
    ["Left", "Right"].forEach(side => {
      if (inputValues[category]?.[side]) {
        // Go through each field in this category and side
        Object.entries(inputValues[category][side]).forEach(([field, value]) => {
          // Check if this field was manually entered
          const key = `${category}-${side}-${field}`;
          
          if (manuallyEnteredFields.has(key) && value) {
            // Convert the MMT values to numbers
            if (value === "0") sum += 0;
            else if (value === "1") sum += 1;
            else if (value === "2-") sum += 1.67;
            else if (value === "2") sum += 2;
            else if (value === "2+") sum += 2.33;
            else if (value === "3-") sum += 2.67;
            else if (value === "3") sum += 3;
            else if (value === "3+") sum += 3.33;
            else if (value === "4-") sum += 3.67;
            else if (value === "4") sum += 4;
            else if (value === "4+") sum += 4.33;
            else if (value === "5") sum += 5;
          }
        });
      }
    });
    
    // Update the sum state
    setCategorySums(prev => ({
      ...prev,
      [category]: Math.round(sum * 100) / 100 // Round to 2 decimal places
    }));
  };
  
  // Make sure to call this function when component mounts to initialize sums
  useEffect(() => {
    // Initialize sums for all categories
    if (selectedCategories.length > 0) {
      selectedCategories.forEach(category => {
        calculateManualSum(category);
      });
    }
  }, [selectedCategories]);
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
  const calculateDifference = (timeInSeconds, improvedTUG) => {
    return timeInSeconds - improvedTUG;
  };
  const handleTUGSubmit = () => {
   
    if (tugField1 && tugField2) {
      const difference = calculateDifference(parseFloat(tugField1), parseFloat(tugField2));
      setTbChartData([
        { category: "Initial TUG", value: parseFloat(tugField1) },
        { category: "Improved TUG", value: parseFloat(tugField2) },
        { category: "Difference", value: difference }
      ]);
      setShowImprovemnt(true);
    }
  };
  const barChartData = TbChartData.filter(item => 
    item.category === "Initial TUG" || item.category === "Improved TUG"
  );

  // Get difference data for pie chart
  const differenceData = TbChartData.find(item => item.category === "Difference");
  const roundedDifference = differenceData ? Math.round(differenceData.value * 10) / 10 : 0;
  
  // Data for difference pie chart
  const pieData = differenceData ? [
    { name: "Difference", value: Math.abs(roundedDifference) },
    { name: "Baseline", value: 100 - Math.abs(roundedDifference) } 
  ] : [];
  
  // Determine if improvement or decrement
  const isImprovement = differenceData ? differenceData.value >= 0 : false;
  const differenceColor = isImprovement ? "#28a745" : "#dc3545";
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
    setShowImages(false);
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
  const chartData = selectedCategories.map((category) => {
    const initialValue = categorySums[category] || 0;
    const improvedValue = totalSumMap[category] || 0;
    const difference = improvedValue - initialValue; // Compute improvement or decrement
  
    return {
      category,
      difference, // Improvement or decrement
    };
  });
  const handleFetchValues = () => {
    const updatedValues = { ...inputValues };
    setIsButtonClicked(true);
    const updatedManualFields = new Set(manuallyEnteredFields); // Create a copy of manuallyEnteredFields
  
    selectedCategories.forEach((category) => {
      updatedValues[category] = {
        Left: {},
        Right: {},
      };
  
      // Process Left side
      categoryInputs[category]?.Left.forEach((inputField) => {
        const randomValue = predefinedValues[Math.floor(Math.random() * predefinedValues.length)];
        updatedValues[category].Left[inputField] = randomValue;
  
        // Add the field to manuallyEnteredFields
        updatedManualFields.add(`${category}-Left-${inputField}`);
      });
  
      // Process Right side
      categoryInputs[category]?.Right.forEach((inputField) => {
        const randomValue = predefinedValues[Math.floor(Math.random() * predefinedValues.length)];
        updatedValues[category].Right[inputField] = randomValue;
  
        // Add the field to manuallyEnteredFields
        updatedManualFields.add(`${category}-Right-${inputField}`);
      });
    });
  
    // Update both inputValues and manuallyEnteredFields
    setInputValues(updatedValues);
    setManuallyEnteredFields(updatedManualFields);
  
    // Recalculate sums for all categories
    selectedCategories.forEach((category) => {
      const sum = calculateSumWithValues(category, updatedValues, updatedManualFields);
      setCategorySums((prev) => ({
        ...prev,
        [category]: sum,
      }));
    });
  };
  const images = [
    { src: Luna, alt: "Luna EMG", label: "Luna EMG" },
    { src: pablo, alt: "Pablo", label: "Pablo" },
    { src: vibra, alt: "vibra", label: "Vibramoov" },
    { src: tymo, alt: "tymo", label: "Tymo" },
    { src: rtms, alt: "rtms", label: "RTMS" },
    { src: hoh, alt: "hoh", label: "Hands Of Hope" },
    { src: cyberdyne, alt: "cyberdyne", label: "Cyberdyne" },
    { src: balance, alt: "balance", label: "Balance Motus" }
  ];
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  // Generate a random number of images between 1 and 8
  const randomNumberOfImages = Math.floor(Math.random() * 8) + 1; // Random number between 1 and 8
  const shuffledImages = shuffleArray([...images]).slice(0, randomNumberOfImages);
  const handleResetAndReload = () => {
    setIsButtonClicked(false); // Reset the state
    setShowImages(false);
    window.location.reload(); // Reload the page

  };

  const handle10MSubmit = () => {
    if (tugField3 && tugField4) {
      const improvement = calculateImprovement(parseFloat(tugField3), parseFloat(tugField4));
      settenChartData([
        { category: "Time In Seconds", value: parseFloat(tugField3) },
        { category: "Improved 10M (m/s)", value: parseFloat(tugField4) },
        { category: "Improvement", value: improvement }
      ]);
      setShow10MImprovemnt(true);
    }
  };
  const calculateImprovement = (timeInSeconds, improved10M) => {
    return improved10M - (10/timeInSeconds);
  };
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
          <button onClick={() => { setShowTugFields(true); setShow10MFields(false); setShowLimbButtons(false);setHideLowerInputs(true);setHideUpperInputs(true);setShowTymoFields(false) }}>TUG</button>
        <button onClick={() => { setShow10MFields(true); setShowTugFields(false);setHideLowerInputs(true);setHideUpperInputs(true); setShowLimbButtons(false); setShowTymoFields(false) }}>10M</button>
          <button onClick={() =>{ setShowLimbButtons(true); setShow10MFields(false); setShowTugFields(false); setShowTymoFields(false)} }>MMT</button>
          <button onClick={() =>{ setShowTymoFields(true); setShow10MFields(false); setShowTugFields(false); setShowLimbButtons(false); setHideLowerInputs(true);setHideUpperInputs(true);} }>Tymo</button>
          </div>)}
          {showLimbButtons && (
          <div style={{backgroundColor:"#f3f6f9",margin:"20px 0px 20px 0px"}}>
          <button className="tab" onClick={() => {setShowPopup(true);setHideUpperInputs(false);}}>Upper Limb</button>
          <button  className="tab" onClick={() => {setShowLowerPopup(true);setHideLowerInputs(false)}}>Lower Limb</button></div>)}
        </div>
      )}
{ShowTymoFields && (
  <div style={{ marginBottom: '30px',margin:'10px' }}>
   
    <div style={{ marginTop: '20px',display:'flex' ,justifyContent:'space-between'}}>
    <h3 style={{ fontWeight:'bold'}}>Tymo</h3>
      <button
        onClick={fetchTymoValues}
        style={{
          backgroundColor: '#003366',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '5px',
        }}
      >
        Fetch Tymo Values
      </button>
    </div>
    {/* First 8 fields in 4 vertical boxes */}
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px', marginBottom: '30px' }}>
      {["Eye Open Stable Surface", "Eye Close Stable Surface", "Eye Open Unstable Surface", "Eye Close Unstable Surface"].map((heading, groupIndex) => (
        <div key={heading} style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1',
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ color: '#003366', marginBottom: '15px' }}>{heading}</h4>
          {[0, 1].map(offset => {
            const index = groupIndex * 2 + offset;
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <label style={{ fontWeight: 'bold' }}>{fields[index]}</label>
                <input
                  type="text"
                  readOnly
                  placeholder="Enter value"
                  value={values[index]}
                  onChange={(e) => {
                    const newValues = [...values];
                    newValues[index] = e.target.value;
                    setValues(newValues);
                  }}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>

{/* Remaining fields (BBG and more) */}
<div style={{
  display: 'flex',
  flexWrap: 'wrap',

  marginTop: '20px'
}}>
  {fields.slice(8).map((field, index) => {
    const actualIndex = index + 8;
    const isDropdown = actualIndex >= 19;
    const isFirstDropdown = actualIndex === 19;

    return (
      <React.Fragment key={field}>
        {/* Add section heading only once before the first BBG dropdown */}
        {headingMap[actualIndex] && (
          <div style={{ width: '100%' }}>
            <h4 style={{ margin: '30px 0 20px 0', color: '#003366' }}>{headingMap[actualIndex]}</h4>
          </div>
        )}

        {/* For BBG dropdowns - use grid layout */}
        {isDropdown ? (
          <div
            style={{
              width: 'calc(25% - 20px)', // roughly 4 columns, adjust as needed
              minWidth: '250px',
              marginBottom: '20px',
              marginRight: '20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label style={{ fontWeight: 'bold', marginBottom: '6px',height:'45px' }}>{field}</label>
            <select 
              value={values[actualIndex]}
              onChange={(e) => {
                const newValues = [...values];
                newValues[actualIndex] = e.target.value;
                setValues(newValues);
              }}
              style={{
                padding: '8px 10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                width:'100%'
              }}
            >
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        ) : (
          // Regular input fields (before index 19)
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: '250px',
              marginRight: '20px',
              marginBottom: '20px',
            }}
          >
            <label style={{ fontWeight: 'bold' }}>{field}</label>
            <input
              type="text"
              readOnly
              placeholder="Enter value"
              value={values[actualIndex]}
              onChange={(e) => {
                const newValues = [...values];
                newValues[actualIndex] = e.target.value;
                setValues(newValues);
              }}
              style={{
                padding: '6px 10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
          </div>
        )}
      </React.Fragment>
    );
  })}
</div>


    {/* Button */}

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
          <button
  onClick={() => {
    setShowImprovemnt(true);
    setHideTUGContent(true);
    setShowTugFields(false);
    handleTUGSubmit(); // Call handleTUGSubmit here
  }}
  disabled={!daysOfTreatment || !tugField1 || !tugField2} // Combined disabled condition
>
  TUG Submit
</button>
          
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
              <button onClick={() => window.location.reload()}>Reset</button>

        </div></div><div className="warning">{tugWarning}
        <div style={{ marginTop: "20px", padding: "20px", textAlign: "center" }}>
          <h3>Improvement/Decrement in TUG Results</h3>
          <div style={{display:"flex",}}> 
          <ResponsiveContainer width="50%" height={400}>
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="category" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="50%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  label={({ name }) => name === "Difference" ? `${Math.abs(roundedDifference)}` : ''}
                  labelLine={false}
                >
                  <Cell key="cell-0" fill={differenceColor} />
                  <Cell key="cell-1" fill="#e0e0e0" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            </div>
        </div> 
</div>   
    
</div>
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
          <button
              onClick={() => {
                setShow10MImprovemnt(true);
                setHideTUGContent(true);
                setShow10MFields(false);
                handle10MSubmit(); // Call handle10MSubmit here
              }}
              disabled={!tugField3 || !tugField4} // Disabled if either field is empty
            >
              10M Submit
            </button>
          
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
              <button onClick={() => window.location.reload()}>Reset</button></div></div><div className="warning">{tenMBwarning}
              <div style={{ marginTop: "20px", padding: "20px", textAlign: "center" }}>
          <h3>Improvement in 10M Results</h3>
          <ResponsiveContainer width="30%" height={400}>
            <BarChart data={tenchartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="category" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="value" fill="#8884d8">
                {tenchartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.category === "Improvement" ? (entry.value >= 0 ? "#28a745" : "#dc3545") : "#8884d8"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div></div></div>
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
  <div className="input-section" style={{ marginTop: "20px" }}>      <button onClick={handleFetchValues} disabled={isButtonClicked}>
  Fetch Values
</button>
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
          {/* <div style={{ fontWeight: "bold", marginTop: "10px" }}>
        Total Sum for {category}: {categorySums[category] || 0}
      </div> */}
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
    
    {selectedCategories.map((category) => {
  // Calculate sum for the category
  const leftValues = Object.values(improvedValues[category]?.Left || {}).map(convertMMTValue);
  const rightValues = Object.values(improvedValues[category]?.Right || {}).map(convertMMTValue);
  
  // Compute total sum


      
  return (
    <div key={category}>



      {(Object.keys(improvedValues[category]?.Left || {}).length > 0 ||
        Object.keys(improvedValues[category]?.Right || {}).length > 0) && (
        <div style={{ marginBottom: "20px" }}>
         {/* <h4>{category} - Total Sum: {totalSumMap[category]?.toFixed(2) || "0.00"}</h4> */}
<h4>{category}</h4>
          {["Left", "Right"].map(
            (side) =>
              Object.keys(improvedValues[category]?.[side] || {}).length > 0 && (
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
                    {Object.entries(improvedValues[category][side]).map(([field, value]) => (
                      <div key={field}>
                        <label style={{ fontWeight: "bold" }}>{field}</label>
                        <div 
                          style={{ 
                            position: 'relative',
                            width: '100%' 
                          }}
                        >
                          <input
                            type="text"
                            value={value}
                            readOnly
                            title={getMessage(value)}
                            style={{
                              width: "100%",
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              background: "#fff",
                              cursor: "help"
                            }}
                          />
                          <span 
                            style={{ 
                              position: 'absolute', 
                              right: '10px', 
                              top: '50%', 
                              transform: 'translateY(-50%)',
                              fontSize: '12px',
                              color: '#666'
                            }}
                          >
                            ℹ️
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
})}
<div>
  {/* Display Bar Graph Only If There Are Values */}
  {chartData.length > 0 && (
    <div style={{ marginTop: "20px", padding: "20px", textAlign: "center" }}>
      <h3>Improvement/Decrement in Percentage</h3>

      <ResponsiveContainer width="30%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          {/* Set Y-axis domain to start from 0 */}
          <YAxis domain={[0, 'auto']} />

          {/* Add a reference line at y=0 */}
          <ReferenceLine y={0} stroke="#000" strokeWidth={2} />

          {/* Position XAxis at y=0 instead of bottom */}
          <XAxis dataKey="category" axisLine={false} tickLine={false} />

          {/* Format Tooltip to show whole numbers */}
          <Tooltip formatter={(value) => Math.round(value)} />
          <Legend />

          <Bar dataKey="difference" name="Improvement">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.difference >= 0 ? "#28a745" : "#dc3545"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )}
</div>

    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
      <div>
        <button onClick={handleClick}>Modalities</button>
        <button onClick={handleMMTAnimateClick}>Avatar</button>
      </div>
      <div>
      <button onClick={handleResetAndReload} style={{ marginLeft: "10px" }}>
        Reset
      </button>
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
      flexWrap:"wrap",
      justifyContent: "center",
      gap: "40px",
      background: "#f9f9f9",
      textAlign: "center"
    }}
  >
    {shuffledImages.map((image, index) => (
      <div key={index}>
        <img 
          src={image.src} 
          alt={image.alt} 
          style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "6px" }} 
        />
        <p style={{ marginTop: "8px", fontSize: "16px", fontWeight: "bold" }}>{image.label}</p>
      </div>
    ))}
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
      gap: "40px",
      background: "#f9f9f9",
      textAlign: "center"
    }}
  >
    {shuffledImages.map((image, index) => (
      <div key={index}>
        <img 
          src={image.src} 
          alt={image.alt} 
          style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "6px" }} 
        />
        <p style={{ marginTop: "8px", fontSize: "16px", fontWeight: "bold" }}>{image.label}</p>
      </div>
    ))}
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default DualPredictionForm;