import React, { useState } from "react";
import Slider from "react-slick";
import "../styles/Slider.css"; // Import your slider CSS file
import image1 from "../assets/Brain.jpg";
import image2 from "../assets/gait.jpg";
import { Link } from "react-router-dom";    

// Sample data for the cards
const cardsData = [
  { id: 1, title: "ADHD", imageUrl: image1, backgroundColor: "White" },
  { id: 2, title: "ALZHEIMER", imageUrl: image2, backgroundColor: "white" },
  { id: 3, title: "ANXIETY", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#d9d9d9" },
  { id: 4, title: "ATAXIA", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#cccccc" },
  { id: 5, title: "AUTISM", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#bfbfbf" },
  { id: 6, title: "CEREBRAL PALSY", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#b3b3b3" },
  { id: 7, title: "DEPRESSION", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#a6a6a6" },
  { id: 8, title: "MUSCULAR DYSTROPHY", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#999999" },
  { id: 9, title: "MUSCULAR SCLEROSIS", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#8c8c8c" },
  { id: 10, title: "OCD", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#8c8c8c" },
  { id: 11, title: "PARKINSONISM", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#8c8c8c" },
  { id: 12, title: "SCHIZOPHRENIA", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#8c8c8c" },
  { id: 13, title: "SPINAL CORD INJURY", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#8c8c8c" },
  { id: 14, title: "STROKE", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#8c8c8c" },
  { id: 15, title: "TRAUMATIC BRAIN INJURY", imageUrl: "https://via.placeholder.com/150", backgroundColor: "#8c8c8c" }
];


const Card = ({ title, imageUrl, backgroundColor, buttonLink = "/treatment/Subtreatments",onCardClick }) => (
    <div className="card" style={{ backgroundColor, width: "300px", height: "330px" }}onClick={onCardClick}>
      <img src={imageUrl} alt={title} style={{ width: "100%", height: "65%" }} />
      <p style={{ height: "35%", margin: 0, overflow: "hidden", textAlign: "center" }}>{title}</p>
      <Link to={buttonLink}>
        <button>Know More</button>
      </Link>
    </div>
  );

  const CardsSlider = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCardTitle, setSelectedCardTitle] = useState("");
    const [cType, setCType] = useState(""); // State for C-Type dropdown value
    const [tType, setTType] = useState(""); // State for T-Type dropdown value
    const [inputFields, setInputFields] = useState({
      MMT: "",
      MAS: "",
      FIST: "",
      Wiscii: "",
      Bowel: "",
      Bladder: "",
      Shoulder: "",
      Anal: ""
    });

  const sliderSettings = {
    dots: true,
    speed: 3000,
    infinite: true,
 
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust autoplay speed as needed
    pauseOnHover: true // Pause autoplay on hover
  };
  const handleCardClick = (title) => {
    if (title === "ADHD") {
      setShowPopup(true);
      setSelectedCardTitle(title);
    }
  };

  const handleCTypeChange = (e) => {
    const value = e.target.value;
    setCType(value);

    // Reset input fields when C-Type changes
    setInputFields({
      MMT: "",
      MAS: "",
      FIST: "",
      Wiscii: ""
    });

    // Show input fields based on C-Type selection
    if (value === "C1") {
      setInputFields({
        MMT: "",
        MAS: ""
      });
    } else if (value === "C3") {
      setInputFields({
        FIST: "",
        Wiscii: ""
      });
    }
  };

  const handleTTypeChange = (e) => {
    const value = e.target.value;
    setTType(value);

    // Reset input fields when T-Type changes
    setInputFields({
      Bowel: "",
      Bladder: "",
      Shoulder: "",
      Anal: ""
    });

    // Show input fields based on T-Type selection
    if (value === "T1") {
      setInputFields({
        Bowel: "",
        Bladder: ""
      });
    } else if (value === "T3") {
      setInputFields({
        Shoulder: "",
        Anal: ""
      });
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputFields((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  return (
    <div className="slider-container">
      <Slider {...sliderSettings}>
        {cardsData.map((card) => (
          <div key={card.id}>
            <Card
              title={card.title}
              imageUrl={card.imageUrl}
              backgroundColor={card.backgroundColor}
              onCardClick={() => handleCardClick(card.title)}
            />
          </div>
        ))}
      </Slider>
      {showPopup && selectedCardTitle === "ADHD" && (
        <div className="popup">
          <h2>Spinal Cord Injury Popup</h2>
          <label htmlFor="cType">C-Type:</label>
          <select id="cType" value={cType} onChange={handleCTypeChange}>
            <option value="">Select C-Type</option>
            <option value="C1">C6,C7</option>
            <option value="C2">C6,C7(ASIA-A)</option>
            <option value="C3">C3,C4</option>
            <option value="C4">C6,C7(ASIA-A)</option>
          </select>
          <label htmlFor="tType">T-Type:</label>
          <select id="tType" value={tType} onChange={handleTTypeChange}>
            <option value="">Select T-Type</option>
            <option value="T1">T10,T11,T12</option>
            <option value="T2">T10,T11,T12(ASIA-A)</option>
            <option value="T3">T6,T7</option>
            <option value="T4">T6,T7</option>
          </select>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CardsSlider;
