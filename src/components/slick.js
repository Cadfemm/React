import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/Slider.css";
import image1 from "../assets/SPI.jpg";
import image6 from "../assets/cerebralpalsy.jpg";

// Sample data for the cards
const cardsData = [
  { id: 1, title: "STROKE", imageUrl: image6, link: "/stroke" },
  { id: 2, title: "SPINAL CORD INJURY", imageUrl: image1, link: "/spinalcord" },
];

const Card = ({ title, imageUrl, buttonLink = "/Spinalinjury", onCardClick }) => (
  <div className="card" onClick={onCardClick}>
    <img className="image" src={imageUrl} alt={title} />
    <p className="title">{title}</p>
    <Link to={buttonLink}>
      <button className="know-more">Know More</button>
    </Link>
  </div>
);

const CardsSlider = () => {
  const history = useHistory();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCardTitle, setSelectedCardTitle] = useState("");
  const [cType, setCType] = useState("");
  const [tType, setTType] = useState("");
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

  const handleCardClick = (title) => {
    if (title === "STROKE") {
      history.push("/stroke");
    } else if (title === "SPINAL CORD INJURY") {
      history.push("/Spinalinjury");
    } else if (title === "ADHD") {
      setShowPopup(true);
      setSelectedCardTitle(title);
    }
  };

  const handleCTypeChange = (e) => {
    const value = e.target.value;
    setCType(value);

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

    if (value === "C1") {
      setInputFields({ MMT: "", MAS: "" });
    } else if (value === "C3") {
      setInputFields({ FIST: "", Wiscii: "" });
    }
  };

  const handleTTypeChange = (e) => {
    const value = e.target.value;
    setTType(value);

    setInputFields({
      Bowel: "",
      Bladder: "",
      Shoulder: "",
      Anal: ""
    });

    if (value === "T1") {
      setInputFields({ Bowel: "", Bladder: "" });
    } else if (value === "T3") {
      setInputFields({ Shoulder: "", Anal: "" });
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
      <div className="cards-container">
        {cardsData.slice(0, 2).map((card) => (
          <Card
            key={card.id}
            title={card.title}
            imageUrl={card.imageUrl}
            onCardClick={() => handleCardClick(card.title)}
          />
        ))}
      </div>
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
