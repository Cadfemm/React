import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import first from "../assets/first.webp"
import second from "../assets/second.webp"
import third from "../assets/third.webp"
import BannerImage from "../assets/banner1.jpg";
import BannerImage2 from "../assets/banner2.jpg";
import BannerImage3 from "../assets/banner3.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Home.css";
import Contact from "../pages/Contact.js";

const carouselImages = [
  BannerImage3,
  BannerImage2,
  BannerImage,

  // Add more image URLs as needed
];

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    
  };

  return (
    <div className="test">
      <div className="home-carousel">
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index} style={{ position: "relative" }}>
              <div className="banner"
                style={{
                  backgroundImage: `url(${image})`,
                  height: "100vh",
                 
                          }}
              >
               
              </div>

            </div>
           
          ))}
        </Slider>

        <div
                  className="headerContainer"
                  // style={{
                  //   width: "auto",
                  //   marginLeft: "50px",
                  // }}
                >
                 
              
                  <Link to="/contact">
                    <button style={{alignItems: "center", marginTop:'20px',marginBottom:'40px'}}>Book</button>
                  </Link>
                </div>

      </div>
      
    

 <div class="container">
  <div class="image-container1">
 
    <img src={first} alt="Description of the image"></img>
  </div>
  <div className="content-container" style={{ alignItems: "flex-start" }}>
  <h1 style={{ marginBottom: "10px" }}>Personalized Rehabilitation Programs</h1>
  <p style={{ lineHeight: "2.0em" }}>Machine learning algorithms can analyze vast amounts of data from patient histories, therapy sessions, and recovery outcomes to tailor rehabilitation programs to individual needs. By identifying patterns and correlations in data, these algorithms can recommend the most effective exercises, intensity levels, and therapy durations for each patient, potentially leading to faster and more effective recovery periods.</p>
</div>

</div>
<div class="container" style={{backgroundColor:'transparent'}}>
  <div className="content-container" style={{ alignItems: "flex-start" }}>
    <h1 style={{ marginBottom: "10px" }}>Predictive Analytics for Recovery</h1>
    <p style={{ lineHeight: "2.0em" }}>One of the most promising aspects of machine learning in rehabilitation is its ability to predict patient recovery trajectories. By inputting data such as patient age, injury type, and initial therapy outcomes, machine learning models can forecast the expected progress of a patient. This not only helps in setting realistic goals but also in adjusting treatment plans proactively to address anticipated challenges.</p>
  </div>
  <div class="image-container1">
    <img src={second} alt="Description of the image"></img>
  </div>
</div>
<div class="container">
  <div class="image-container1">
 
    <img src={third} alt="Description of the image"></img>
  </div>
  <div className="content-container" style={{ alignItems: "flex-start" }}>
  <h1 style={{ marginBottom: "10px" }}>Enhancing Clinical Decision-Making</h1>
  <p style={{ lineHeight: "2.0em" }}>Machine learning can support clinicians in making more informed decisions by providing insights derived from data analysis. For example, by analyzing trends across numerous cases, machine learning can help identify which treatments are most likely to be effective for specific conditions or patient demographics, thereby informing clinical strategies and improving patient outcomes.</p>
</div>

</div>
 <Contact />
    </div>
  );
}

export default Home;
