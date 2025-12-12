import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../styles/Menu.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MenuItem({ image, title, text, to, backgroundColor }) {
  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: '#00345f', // Set text color
  };
  const history = useHistory();

  const handleCardClick = (path) => {
    history.push(path);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...sliderSettings}>
      <div>
        <Link to={to} style={linkStyle} className="menuCard">
          <div className="menuItem" style={{ backgroundColor }}>
            <div className="imageContainer" style={{ backgroundImage: `url(${image})` }}></div>
            <p className="title">{title}</p>
            <div className="learnMoreLink" style={{ border: "none" }}>
              <p>
                Know More{" "}
                <span
                  className="arrowSymbol"
                  onClick={() => handleCardClick(`/treatment/Subtreatments`)}
                >
                  &#8594;
                </span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </Slider>
  );
}

export default MenuItem;
