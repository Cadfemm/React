import React, { useState, useEffect } from 'react';
import Health from "../assets/Brain.jpg";
import "../styles/Monoplegia.css";
const Dropdown = () => {
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [visibleInput, setVisibleInput] = useState(null);
  const [cType, setCType] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [showInputsFor, setShowInputsFor] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCTypeDisabled, setIsCTypeDisabled] = useState(false);
  const [isTTypeDisabled, setIsTTypeDisabled] = useState(false);
  const [tType, setTType] = useState("");
  const [visibleCategory, setVisibleCategory] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [daysOfTreatment, setDaysOfTreatment] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSource, setVideoSource] = useState('60per.mp4');
  const [isPopupModalOpen, setIsPopupModalOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [inputFields, setInputFields] = useState({});
  const [showInputFields, setShowInputFields] = useState([]); // 

  const [optionFieldsMap, setOptionFieldsMap] = useState({
    Strength: {
      MMT: {
        HipFlexor: ['Hip Flexor Right', 'Hip Flexor Left'],
        KneeExtensor: ['Knee Extensor Right', 'Knee Extensor Left'],
        AnkleDorsalFlexor: ['Ankle Dorsal Flexor Right','Ankle Dorsal Flexor Left'],
        UpperLimbLongToe: ['Upper Limb Long Toe Extensor Right','Upper Limb Long Toe Extensor Left'],
        UpperLimbAnklePlantar:['Upper Limb Ankle Plantar Flexor Right','Upper Limb Ankle Plantar Flexor Left'],
        UpperLimbShoulder:['Upper Limb Shoulder Flexion Right','Upper Limb Shoulder Flexion Left','Upper Limb Shoulder Extension Right','Upper Limb Shoulder Extension Left','Upper Limb Shoulder Abduction Right','Upper Limb Shoulder Abduction Left','Upper Limb Shoulder Adduction Right','Upper Limb Shoulder Adduction Left','Upper Limb Shoulder Internal Rotation Right','Upper Limb Shoulder Internal Rotation Left','Upper Limb Shoulder External Rotation Right','Upper Limb Shoulder External Rotation Left'],
        UpperLimbElbow:['Upper Limb Elbow Flexion Right','Upper Limb Elbow Flexion Left','Upper Limb Elbow Extension Right','Upper Limb Elbow Extension Left'],
        UpperLimbWrist:['Upper Limb Wrist Flexion Right','Upper Limb Wrist Flexion Left','Upper Limb Wrist Extension Right','Upper Limb Wrist Extension Left'],
        UpperLimbFinger:['Upper Limb Finger Flexion Right','Upper Limb Finger Flexion Left','Upper Limb Finger Extension Right','Upper Limb Finger Extension Left','Upper Limb Finger Abduction Right','Upper Limb Finger Abduction Left','Upper Limb Finger Adduction Right','Upper Limb Finger Adduction Left'],
        LowerLimb:['Lower Limb Internal Rotation Right','Lower Limb Internal Rotation Left','Lower Limb External Rotation Right','Lower Limb External Rotation Left','Lower Limb Inversion Right','Lower Limb Inversion Left','Lower Limb Eversion Right','Lower Limb Eversion Left'],
        LowerLimbHip:['Lower Limb Hip Flexion Right','Lower Limb Hip Flexion Left','Lower Limb Hip Extension Right','Lower Limb Hip Extension Left','Lower Limb Hip Abduction Right','Lower Limb Hip Abduction Left','Lower Limb Hip Adduction Right','Lower Limb Hip Adduction Left'],
        LowerLimbKnee:['Lower Limb Knee Flexion Right','Lower Limb Knee Flexion Left','Lower Limb Knee Extension Right','Lower Limb Knee Extension Left'],
        LowerLimbAnkle:['Lower Limb Ankle Plantar Flexion Right','Lower Limb Ankle Plantar Flexion Left','Lower Limb Ankle Dorsal Flexion Right','Lower Limb Ankle Dorsal Flexion Left'],
        LowerLimbToe:['Lower Limb Toe Flexion Right','Lower Limb Toe Flexion Left','Lower Limb Toe Abduction Right','Lower Limb Toe Abduction Left','Lower Limb Toe Adduction Right','Lower Limb Toe Adduction Left']
      }
    },
    Balance: {
      BBG: {
        MedioLateral: ['Medio Lateral Unstable Surface Eyes Open','Medio Lateral Unstable Surface Eyes Closed','Medio Lateral stable Surface Eyes Open','Medio Lateral stable Surface Eyes Closed'],
        AnteriorPosterior: ['Anterior Posterior Unstable Surface Eyes Open','Anterior Posterior Unstable Surface Eyes Closed','Anterior Posterior stable Surface Eyes Open','Anterior Posterior stable Surface Eyes Closed'],
        BBS: ['BBS'],
        BBG: ['BBG']
      },
      FIST: {
        FIST: ['FIST'],
      }
    },
    Spasticity: {
      MAS: {
        AnklePlantar: ['Ankle Plantar Right', 'Ankle Plantar Right Left'],
        Hamstring: ['Hamstring Right', 'Hamstring Left'],
        HipAdductor:['HipAdductor Right','HipAdductor Right'],
        ElbowFlexor:['Elbow Flexor Right','Elbow Flexor Left'],
        WristFlexor:['Wrist Flexor Right','WristFlexor Left'],
        PectoralisMajor:['Pectoralis Major Right','Pectoralis Major Left'],
        Biceps:['Biceps'],
        Pronator:['Pronator'],
        KneeExtensors:['Knee Extensors Right','Knee Extensors Left'],
        PlantarFlexors:['Plantar Flexors Right','Plantar Flexors Left'],
        HipFlexion:['Hip Flexion Right','Hip Flexion Left'],
        InternalRotation:['Internal Rotation Right','Internal Rotation Left'],
        ExternalRotation:['External Rotation Right','External Rotation Left'],
        HipExtensor:['Hip Extensor Right','Hip Extensor Left'],
        KneeFlexor:['Knee Flexor Right','Knee Flexor Left'],
        FingerFlexor:['Finger Flexor Right','Finger Flexor Left']
      }
    },
    Ambulation: {
      TUG: {
        TUG: ['TUG With Walker','TUG Without Walker'],
      },
      TenMeterWalkTest: {
        TenMeterWalk: ['Ten Meter Walk With Walker', 'Ten Meter Walk Without Walker'],
      },
      SixMeterWalkTest: {
        SixMeterWalk: ['Six Meter Walk With Walker', 'Six Meter Walk Without Walker'],
      },
      WISCII: {
        WISCII: ['WISCII'],
      },
    },
    FIS: {
      FunctionalIndependenceMeasure: {
        FIM: ['FIM'],
      },
      SpinalcordInjuryIndependenceMeasure: {
        SCIM: ['SCIM'],
      }
    },
    Ataxia: {
      SARA: {
        SARA:['SARA']
      }
    },
    Sensory: {
      FuglMeyer: {
        FMAUE:['MotorFunction','Sensation','PassiveJointMotion','JointPain','Upper Extremity','Wrist','Hand','Coordination']
      },
      ASIAscale: {
        Sensory: ['Light Touch Sensory,Pin Prick Sensory'],
        PinchGrip:['Pinch Grip Index Left','Pinch Grip Index Right','Pinch Grip Middle Right','Pinch Grip Middle Left','Pinch Grip Ring Right','Pinch Grip Ring Left','Pinch Grip Little Right','Pinch Grip Little Left'],
        VolutaryAnalContraction:['VolutaryAnalContraction'],
        DeepAnalPressure:['Deep Anal Pressure']
      }
    },
    BBA: {
      NeurogenicBladderSymptomsScore: {
        NBSS: ['Incontinence','Storage & Voiding','Consequences','Quality Of Life','Bladder Management'],
      },
      NBD: {
        NeurogenicBowelDysfunction:['Neurogenic Bowel Dysfunction Score']}
    },
    Cognitive: {
      MontrealCognitiveAssessment: {
        MOCA:['Montreal Cognitive Assessment']
      },
      CASP: {
        CASP:['CASP']
      },
    },
    LUNA: {
      LUNA: {
       Hip: ['Hip Flexion Right','Hip Flexion Left','Hip Extension Right','Hip Extension Left'],
       Knee: ['Knee Flexion Right','Knee Flexion Left','Knee Extension Right','Knee Extension Left'],
       Ankle: ['Ankle Flexion Right','Ankle Flexion Left','Ankle Extension Right','Ankle Extension Left'],
       Shoulder: ['Shoulder Flexion Right','Shoulder Flexion Left'],
       Elbow: ['Elbow Flexion Right','Elbow Flexion Left'],
       Wrist:['Wrist Supination Right','Wrist Supination Left','Wrist Pronation Right','Wrist Pronation Left'],
      }
    },
    GMF: {
      GrossMotorFunctionMeasure: {
       GMF:['Lying','Rolling','Sitting','Crawling','Kneeling','Standing','Walking','Running','Jumping']
      }
    },
    JoinPositionTest: {
      Proprioception: {
       Hip: ['Proprioception Hip Right','Proprioception Hip Left'],
       Knee: ['Proprioception Knee Right','Proprioception Knee Left'],
       Ankle: ['Proprioception Ankle Right','Proprioception Ankle Left'],
       BigToe: ['Proprioception BigToe Right','Proprioception BigToe Left']
      }
    },
    PELMA: {
      PELMA: {
       BothLegAndEyeOpen: ['Both Leg & Eye Open Frontal Speed','Both Leg & Eye Open Lateral Speed','Both Leg & Eye Open Remark'],
       BothLegAndEyeClosed: ['Both Leg & Eye Closed Frontal Speed','Both Leg & Eye Closed Lateral Speed','Both Leg & Eye Closed Remark'],
       OneLegAndEyeOpen: ['One Leg & Eye Open Unstable Surface Frontal Speed','One Leg & Eye Open Unstable Surface Lateral Speed','One Leg & Eye Open Unstable Surface Remark'],
       OneLegAndEyeClosed: ['One Leg & Eye Closed Unstable Surface Frontal Speed','One Leg & Eye Closed Unstable Surface Lateral Speed','One Leg & Eye Closed Unstable Surface Remark'],
      }
    },
    Tymo: {
      COPParameters: {
       Disatance: ['Eye Open Stable Surface','Eye Closed Stable Surface','Eye Open Unstable Surface','Eye Closed Unstable Surface'],
       MedioLateralDisplacement: ['Eye Open Stable Surface','Eye Closed Stable Surface','Eye Open Unstable Surface','Eye Closed Unstable Surface'],
       AnteriorPosteriorDisplacement: ['Eye Open Stable Surface','Eye Closed Stable Surface','Eye Open Unstable Surface','Eye Closed Unstable Surface'],
       SwayArea: ['Eye Open Stable Surface','Eye Closed Stable Surface','Eye Open Unstable Surface','Eye Closed Unstable Surface'],
       AverageVelocity: ['Eye Open Stable Surface','Eye Closed Stable Surface','Eye Open Unstable Surface','Eye Closed Unstable Surface'],
       WeightDistribution: ['Eye Open Stable Surface','Eye Closed Stable Surface','Eye Open Unstable Surface','Eye Closed Unstable Surface'],
       FrequencyAnalysis: ['Eye Open Stable Surface','Eye Closed Stable Surface','Eye Open Unstable Surface','Eye Closed Unstable Surface'],
       RombergIndex: ['Eye Open Stable Surface','Eye Closed Stable Surface','Eye Open Unstable Surface','Eye Closed Unstable Surface'],
       FeedBackPaths: ['Visual','Vestibular','Somato Sensory','Central Reflex'],
      }
    },
    Pablo: {
      PabloGripAssessment: {
       CylindricalGrip: ['Cylindrical Grip Flexion Right','Cylindrical Grip Flexion Left','Cylindrical Grip Extension Right','Cylindrical Grip Extension Left'],
       LateralGrip: ['Lateral Grip Right','Lateral Grip Left'],
       PinchGrip: ['Pinch Grip Index Right','Pinch Grip Index Left','Pinch Grip Middle Right','Pinch Grip Middle Left','Pinch Grip Ring Right','Pinch Grip Ring Left','Pinch Grip Little Right','Pinch Grip Little Left'],
       IntegralGrip: ['First','Second','Third'],
       ThreePointGrip:['Three Point Grip'],
      }
    },
    MMSE: {
      MiniMentalStateExamination: {
        MMSE:['MMSE'],
      }
    },
    // Add other diseases and their categories with fields here...
  });

  useEffect(() => {
    // Reset allFieldsFilled to false whenever selectedDiseases, visibleInput, or visibleCategory changes
    setAllFieldsFilled(false);
  
    // Automatically trigger the modal if a visible category is selected
    if (visibleCategory) {
      setIsPopupModalOpen(true);
    }
  }, [selectedDiseases, visibleInput, visibleCategory]);
  useEffect(() => {
    console.log('Updated input values in useEffect:', inputValues);
  }, [inputValues]);
  

  const handleButtonPress = () => {
    const newInputValues = {};
  
    for (const disease in optionFieldsMap) {
      for (const category in optionFieldsMap[disease]) {
        for (const selectField in optionFieldsMap[disease][category]) {
          const fields = optionFieldsMap[disease][category][selectField];
          fields.forEach((field) => {
            let value = generateRandomValue();
            if (value === 0) {
              value = '0'; // Set zero explicitly as a string
            }
            console.log(`Setting value for field ${field}: ${value}`);
            newInputValues[field] = value.toString();
          });
        }
      }
    }
  
    console.log('New input values:', newInputValues);
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      ...newInputValues
    }));
  };
  
  const handleDiseaseChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedDiseases(selectedValues);
    setVisibleInput(null);
    setVisibleCategory(null);
    setInputValues({});
    setDaysOfTreatment('');
    setAllFieldsFilled(false);
    setIsModified(false);
    setVideoSource('60per.mp4'); // Reset video source on disease change
  };
const handlePopupSubmit = () => {
  console.log('Selected Checkboxes:', selectedCheckboxes); // Debugging line
  console.log('Visible Input:', visibleInput); // Debugging line
  console.log('Visible Category:', visibleCategory); // Debugging line

  // Ensure optionFieldsMap, visibleInput, and visibleCategory exist before accessing them
  if (!optionFieldsMap[visibleInput] || !optionFieldsMap[visibleInput][visibleCategory]) {
    console.error("Option fields not available for the current selection");
    return;
  }

  // Use selectedCheckboxes to filter and flatMap the relevant fields
  const inputsToShow = selectedCheckboxes
    .filter(option => optionFieldsMap[visibleInput][visibleCategory]?.[option]) // Ensures valid options are selected
    .flatMap(option => optionFieldsMap[visibleInput][visibleCategory][option]);

  console.log('Inputs To Show:', inputsToShow); // Debugging line

  // Update state with the selected fields
  setShowInputFields(inputsToShow);
  // Close the popup modal
  setIsPopupModalOpen(false);
};

  
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCheckboxes((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };
  const generateRandomValue = () => {
    return Math.floor(Math.random() * 11) - 5; // Generates a number between 1 and 7 inclusive
  };
  const handleCloseModal = () => {
    setIsPopupModalOpen(false);
  };
  const handleCTypeChange = (e) => {
    const value = e.target.value;
    setCType(value);

    // Disable T-Type dropdown when C-Type is selected
    if (value) {
      setIsTTypeDisabled(true);
      setIsCTypeDisabled(false); // Enable C-Type dropdown
    } else {
      setIsTTypeDisabled(false);
    }
    if (value === "C1" || value === "C2") {
      setShowInputsFor(true);
    } else {
      setShowButtons(false);
    }
  };
  const handleTTypeChange = (e) => {
    const value = e.target.value;
    setTType(value);
    // Disable T-Type dropdown when C-Type is selected
    if (value) {
      setIsCTypeDisabled(true);
      setIsTTypeDisabled(false); // Enable T-Type dropdown
    } else {
      setIsCTypeDisabled(false);
    }
  };
  useEffect(() => {
    const fieldsToShow = {};
    selectedCheckboxes.forEach((checkbox) => {
      const fields = optionFieldsMap.Strength.MMT[checkbox];
      if (fields) {
        fieldsToShow[checkbox] = fields;
      }
    });
    setInputFields(fieldsToShow);
  }, [selectedCheckboxes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Ensure the state is updated with the correct field and value
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value, // Update the specific field based on its 'name'
    }));
  };
  
  
  
  useEffect(() => {
  if (visibleCategory === 'MMT') {
    setIsPopupModalOpen(true);  // Ensure the popup opens when 'MMT' is selected
  }
}, [visibleCategory]); // Trigger whenever the visibleCategory changes

// When closing the popup, reset state but keep the trigger condition active
const handleClosePopup = () => {
  setIsPopupModalOpen(false);
  // Keep this logic intact so that it can re-trigger when 'MMT' is clicked again
};
  const handleDaysOfTreatmentChange = (event) => {
    setDaysOfTreatment(event.target.value);
  };

  const handleDiseaseButtonClick = (disease) => {
    setVisibleInput(disease);
    setVisibleCategory(null);
  };
  const handleCategoryButtonClick = (category) => {
    // Categories that require a popup modal
    const categoriesWithPopup = ['MMT', 'BBG','FIST', 'MAS'];
  
    // Set the visible category
    setVisibleCategory(category);
  
    // Open the popup if the category is one that requires it
    if (categoriesWithPopup.includes(category)) {
      setIsPopupModalOpen(true);
    } else {
      setIsPopupModalOpen(false); // Ensure the popup is closed if the category does not require it
    }
  };
  const handleSubmit = () => {
    const updatedInputValues = { ...inputValues };
    let allFieldsFilled = true;
  
    // Object to hold the fields that need to be updated based on selected diseases
    const fieldsToUpdate = {};
  
    // Iterate over selected diseases and gather fields to update based on selected values
    selectedDiseases.forEach((disease) => {
      if (optionFieldsMap[disease]) {
        Object.keys(optionFieldsMap[disease]).forEach((category) => {
          const categoryFields = optionFieldsMap[disease][category];
  
          // Process only the categories that have input values
          Object.keys(categoryFields).forEach((selectField) => {
            categoryFields[selectField].forEach((field) => {
              if (inputValues[field]) { // Only consider fields that are filled or selected
                fieldsToUpdate[field] = true; // Mark this field for update
              }
            });
          });
        });
      }
    });
  
    // Validate and update only the selected fields that are being updated
    Object.keys(fieldsToUpdate).forEach((field) => {
      const fieldValue = inputValues[field]; // Get the manually entered value
  
      // Check if the field is filled
      if (!fieldValue || (typeof fieldValue === 'string' && fieldValue.trim() === '')) {
        alert(`Please fill in the required field for ${field}.`);
        allFieldsFilled = false;
      } else {
        let value = parseInt(fieldValue, 10); // Convert the value to an integer
        if (!isNaN(value)) {
          // Modify the values by adding +2, ensuring no value exceeds 6
          if (value < 4) {
            value += 2;
            updatedInputValues[field] = value > 5 ? '5' : value.toString(); // Ensure the value doesn't exceed 6
          } else if (value === 4) {
            updatedInputValues[field] = '5'; // If it's 5, set it to 6
          }
        }
      }
    });
  
    // If all required fields are filled, update input values and modify categories
    if (allFieldsFilled) {
      const modifiedCategoryMap = {
        MMT: 'Modified MMT',
        BBG: 'Modified BBG',
        FIST: 'Modified FIST',
        MAS: 'Modified MAS'
      };
  
      const updatedOptionFieldsMap = { ...optionFieldsMap };
  
      // Update the categories to their "Modified" versions
      selectedDiseases.forEach((disease) => {
        if (updatedOptionFieldsMap[disease]) {
          Object.keys(updatedOptionFieldsMap[disease]).forEach((category) => {
            if (modifiedCategoryMap[category]) {
              updatedOptionFieldsMap[disease][modifiedCategoryMap[category]] =
                updatedOptionFieldsMap[disease][category];
  
              delete updatedOptionFieldsMap[disease][category];
            }
          });
        }
      });
  
      // Set the updated values in the state
      setOptionFieldsMap(updatedOptionFieldsMap);
      setInputValues(updatedInputValues); // Update the input values
      setIsModified(true);
      setVideoSource('Normal.mp4');
      alert('Submit The Data');
      setIsVisible(false); // Close the popup or modal
      setIsSubmitted(true); // Disable the dropdown
    }
  };
  
  
  
  
  
  
  
  
  
  // Ensure the component re-renders when inputValues changes
  useEffect(() => {
    console.log('Updated input values in useEffect:', inputValues);
  }, [inputValues]);
  
  // Ensure the component re-renders when optionFieldsMap changes
  useEffect(() => {
    console.log('Updated option fields map in useEffect:', optionFieldsMap);
  }, [optionFieldsMap]);
  
  
  
  
  useEffect(() => {
    console.log('Updated input values in useEffect:', inputValues);
  }, [inputValues]);
  
    const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="banner" style={{ backgroundImage: `url(${Health})` }}>
        STROKE
      </div>
      <div className="center">
        {/* <b><label htmlFor="cType">Types: </label></b>
        <select id="cType" value={cType} onChange={handleCTypeChange}>
          <option value="">Select Type</option>
          <option value="C1">Ischemic</option>
          <option value="C2">Hemorrhagic</option>
          <option value="C3">Lumbar</option>
          <option value="C4">C3C4(ASIA-A)</option>
        </select> */}

        <b><label htmlFor="tType">Type:</label></b>
        <select id="tType" value={tType} onChange={handleTTypeChange}>
          <option value="">Select Disease Type</option>
          <option value="T1">Cerebral Palsy</option>
          <option value="T2">Motor Neuron Disease</option>
          <option value="T3">Right Side Hemiparesis</option>
          <option value="T4">Pontine Bleed</option>
          <option value="T5">Parapersis</option>
          <option value="T6">Post Stroke</option>
          <option value="T7">Balance & Coordination Impairment</option>
          <option value="T8">Right Brain Tumor</option>
          <option value="T9">Left Side Hemiparesis</option>
          <option value="T10">Right Side Hemiparesis</option>
          <option value="T11">Left MCA Infarct</option>
          <option value="T12">Right MCA Infarct</option>
          <option value="T13">Spino Cerebellar Ataxia</option>
          <option value="T14">Rcurrent Stroke</option>
          <option value="T15">Old Pontine Infarct</option>
          <option value="T16">Ataxia</option>
          <option value="T17">TBI</option>
          <option value="T18">Left Epidural Hemorrhage</option>
          <option value="T19">Left Frontoparietal Intraparenchymal Bleed</option>
          <option value="T20">Right Parietal Haemorrhage</option>
          <option value="T21">Right Parietal Lobe Ischemic Stroke</option>
          <option value="T22">Right BG Bleed</option>
          <option value="T23">Posterior Circulation Infarct</option>
          <option value="T24">Left Basal Ganglia Bleed</option>
          <option value="T25">Left Posterior Cerebellar Infarct</option>
          <option value="T26">CVA</option>
          <option value="T27">Left Posterior Internal Capsule Infarct</option>
        </select>

        <label htmlFor="disease">Impairments:</label>
        <select
          id="disease"
          style={{ height: '65px' }}
          multiple
          value={selectedDiseases}
          onChange={handleDiseaseChange}
          disabled={!(tType) || isSubmitted} // Disable the dropdown after submit
        >
          <option value="Strength">Strength</option>
          <option value="Balance">Balance</option>
          <option value="Spasticity">Spasticity</option>
          <option value="Ambulation">Ambulation</option>
          <option value="FIS">Functional Independent Scale</option>
          <option value="Ataxia">Ataxia</option>
          <option value="Sensory">Sensorimotor Function</option>
          <option value="BBA">Bowel & Bladder Assessment</option>
          <option value="Cognitive">Cognitive Assessment</option>
          <option value="LUNA">LUNA Assessment</option>
          <option value="GMF">Gross Motor Function Measure</option>
          <option value="JoinPositionTest">Join Position Test</option>
          <option value="PELMA">PELMA Assessment</option>
          <option value="Tymo">Tymo Balance Test</option>
          <option value="Pablo">Pablo Test</option>
          <option value="MMSE">Mini Mental State Examination</option>
        </select>
      </div>
      <div className="selected-diseases-container">
        {selectedDiseases.map((disease) => (
          <button key={disease} onClick={() => handleDiseaseButtonClick(disease)}>
            {disease}
          </button>
        ))}
      </div>

      {visibleInput && (
  <div>
    {Object.keys(optionFieldsMap[visibleInput] || {}).map((category) => (
      <button key={category} onClick={() => handleCategoryButtonClick(category)}>
        {category}
      </button>
    ))}
  </div>
)}
{isPopupModalOpen && (
  <div className={`popup ${isPopupModalOpen ? 'show' : ''}`}>
    <div className="popup-content">
     <div> <h3>Select Options</h3></div>
     <div className="options">
      {visibleCategory && optionFieldsMap[visibleInput] && optionFieldsMap[visibleInput][visibleCategory] && (
        Object.keys(optionFieldsMap[visibleInput][visibleCategory] || {}).map((option) => (
          <div key={option}>
            <label>
              <input
                type="checkbox"
                name={option}
                checked={selectedCheckboxes.includes(option)}
                onChange={handleCheckboxChange}
              />
              {option}
            </label>
          </div>
        ))
      )}</div>
      <button onClick={handlePopupSubmit}>Generate Fields</button>
    </div>
  </div>
)}

{/* Render Input Fields Based on Selections */}
{!isPopupModalOpen && showInputFields.length > 0 && (
  <div className="input-fields-container">
    <h4 className="input-fields-heading">Related Input Fields</h4>
    <div className="input-fields">
      {showInputFields.map((field) => (
        <div key={field} className="input-field">
       <div> <label htmlFor={field}>
            {field}: </label></div>
           <div>
           <input 
  type="number" 
  id={field}
  name={field} // Use the field name to match the state
  value={inputValues[field] || ''} // Bind value to state
  onChange={handleInputChange} // Call the handler on every input change
  style={{ borderRadius: '5px' }}
  min={-5} // Set minimum value
  max={5}  // Set maximum value
/>


            </div> 
        </div>
      ))}
    </div>
  </div>
)}

     {selectedDiseases[selectedDiseases.length - 1] === visibleInput && 
            // visibleCategory === Object.keys(optionFieldsMap[visibleInput]).slice(-1)[0] && (
              <div className="treatment-container">
                <div>
                  <label htmlFor="daysOfTreatment">Days of Treatment</label>
                  <input
                    id="daysOfTreatment"
                    name="daysOfTreatment"
                    type="text"
                    value={daysOfTreatment}
                    onChange={handleDaysOfTreatmentChange}
                  />
                </div>
                <div>
                  <label htmlFor="improvement">Expected Improvement %</label>
                  <input
                    
                    type="number"
                    
                    
                  />
                </div>
               
                {isVisible && (
       <button onClick={handleSubmit} disabled={!daysOfTreatment || daysOfTreatment === '0'}>
       Submit
     </button>
      )}
                <button style={{ float: 'right' }} onClick={openModal}>
                  Animate
                </button>
              
                {isModalOpen && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <span className="close-button" onClick={closeModal}>
                        &times;
                      </span>
                      <video width="700" height="500" controls autoPlay>
                        <source src={videoSource} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
              </div>
            }
      {selectedDiseases.length > 0 && (
        <button className="B1" onClick={handleButtonPress}>
          Auto Fill
        </button>
      )}
    </div>
  );
};

export default Dropdown;
