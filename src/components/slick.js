import React, { useState } from "react";
import Slider from "react-slick";
import "../styles/Slider.css"; // Import your slider CSS file
import image1 from "../assets/SPI.jpg";
import image2 from "../assets/MD.webp";
import image3 from "../assets/mca.png";
import image4 from "../assets/cerebralpalsy.jpg";
import image5 from "../assets/MND.jpg";
import image7 from "../assets/paraperisis.jpg";
import image8 from "../assets/MS.webp";
import image9 from "../assets/AM.webp";
import image10 from "../assets/gbs.jpg";
import image6 from "../assets/old_recurrent.jpg";
import image11 from "../assets/SCA.jpg";
import { Link } from "react-router-dom";    

// Sample data for the cards
const cardsData = [
  { id: 1, title: "SPINAL CORD INJURY", imageUrl: image1},
  { id: 2, title: "MUSCULAR DYSTROPHY", imageUrl: image2},
  { id: 3, title: "MCA INFARCT", imageUrl: image3},
  { id: 4, title: "CEREBRAL PALSY", imageUrl: image4 },
  { id: 5, title: "MOTOR NEURON DISEASE", imageUrl:image5},
  { id: 6, title: "STROKE", imageUrl: image6 },
  { id: 7, title: "PARAPARESIS", imageUrl: image7},
  { id: 8, title: "MULTIPLE SCLEROSIS", imageUrl: image8},
  { id: 9, title: "ACUTE MYELITIS", imageUrl: image9},
  { id: 10, title: "GBS", imageUrl: image10 },
  { id: 11, title: "SPINO CEREBELLAR ATAXIA", imageUrl: image11},
];


const Card = ({ title, imageUrl, backgroundColor="WHITE", buttonLink="/Spinalinjury",onCardClick }) => (
    <div className="card" style={{ backgroundColor, width: "300px", height: "330px" }}onClick={onCardClick}>
      <img className="image"src={imageUrl} alt={title}  />
      <p style={{ height: "35%", margin: "10px", overflow: "hidden", textAlign: "center" }}>{title}</p>
      <Link to={buttonLink}>
        <button className="Knowmore">Know More</button>
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
    speed: 4000,
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
  const HiddenArrow = () => <></>;

  const settings = {
    // Other settings...
    prevArrow: <HiddenArrow />, // Hide the previous arrow
    nextArrow: <HiddenArrow />, // Hide the next arrow
  };
  const handleCTypeChange = (e) => {
    const value = e.target.value;
    setCType(value);

    // Reset input fields when C-Type changes
    setInputFields({
      MMT: "",
      MAS: "",
      FIST: "",
      Wiscii: "",
      Bowel: "",
      Bladder: "",
      Shoulder: "",
      Anal: ""
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
      <div>
        <p className="Heading">DIAGNOSIS</p>
      </div>
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
          {(cType === "C1" || cType === "C2") && (
            <div>
              <label htmlFor="MMT">MMT:</label>
              <input type="text" id="MMT" name="MMT" value={inputFields.MMT} onChange={handleInputChange} />
              <label htmlFor="MAS">MAS:</label>
              <input type="text" id="MAS" name="MAS" value={inputFields.MAS} onChange={handleInputChange} />
              </div>
          )}
          {(cType === "C3" || cType === "C4") && (
             <div>
             <label htmlFor="FIST">FIST:</label>
             <input type="text" id="FIST" name="FIST" value={inputFields.FIST} onChange={handleInputChange} />
             <label htmlFor="Wiscii">Wiscii:</label>
             <input type="text" id="Wiscii" name="Wiscii" value={inputFields.Wiscii} onChange={handleInputChange} />
           </div>
          )}
          <label htmlFor="tType">T-Type:</label>
          <select id="tType" value={tType} onChange={handleTTypeChange}>
            <option value="">Select T-Type</option>
            <option value="T1">T10,T11,T12</option>
            <option value="T2">T10,T11,T12(ASIA-A)</option>
            <option value="T3">T6,T7</option>
            <option value="T4">T6,T7</option>
          </select>
          {(tType === "T1" || tType === "T2") && (
            <div>
              <label htmlFor="Bowel">Bowel:</label>
              <input type="text" id="Bowel" name="Bowel" value={inputFields.Bowel} onChange={handleInputChange} />
              <label htmlFor="Bladder">Bladder:</label>
              <input type="text" id="Bladder" name="Bladder" value={inputFields.Bladder} onChange={handleInputChange} />
              </div>
          )}
          {(tType === "T3" || tType === "T4") && (
            <div>
              <label htmlFor="Bowel">Bowel:</label>
              <input type="text" id="Bowel" name="Bowel" value={inputFields.Bowel} onChange={handleInputChange} />
              <label htmlFor="Bladder">Bladder:</label>
              <input type="text" id="Bladder" name="Bladder" value={inputFields.Bladder} onChange={handleInputChange} />
              </div>
          )}
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CardsSlider;
