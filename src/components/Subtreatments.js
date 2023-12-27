import React from "react";
import { Link } from "react-router-dom";

function Subtreatments({ image, title, text, to }) {
  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: '#EC595B', // Set text color to #000
  };

  return (
    <Link to={to} style={linkStyle} className="menuCard">
      <div className="menuItem">
        <div style={{ backgroundImage: `url(${image})` }}> </div>
        <p style={{ color: '#EC595B' }}>{title}</p>
       
      </div>
    </Link>
  );
}

export default Subtreatments;