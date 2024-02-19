import React from "react";
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


const Card = ({ title, imageUrl, backgroundColor, buttonLink = "/treatment/Subtreatments" }) => (
    <div className="card" style={{ backgroundColor, width: "300px", height: "330px" }}>
      <img src={imageUrl} alt={title} style={{ width: "100%", height: "65%" }} />
      <p style={{ height: "35%", margin: 0, overflow: "hidden", textAlign: "center" }}>{title}</p>
      <Link to={buttonLink}>
        <button>Know More</button>
      </Link>
    </div>
  );
  

const CardsSlider = () => {
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

  return (
    <div className="slider-container">
      <Slider {...sliderSettings}>
        {cardsData.map((card) => (
          <div key={card.id}>
            <Card
              title={card.title}
              imageUrl={card.imageUrl}
              backgroundColor={card.backgroundColor}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardsSlider;
