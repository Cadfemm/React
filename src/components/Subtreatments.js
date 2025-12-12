import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import "../styles/Menu.css";

function Subtreatments({ image, title, text, to, backgroundColor }) {
  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: '#00345f', // Set text color to #000
  };

  return (
  
    <Link to={to} style={linkStyle} className="menuCard">
      <div className="menuItem" style={{height:"300px",justifyContent:"center",backgroundColor:{backgroundColor}}}>
        <div style={{ backgroundImage: `url(${image})` }}> </div>
        <p style={{ color: '#00345f' }}>{title}</p>
        {/* <p style={{ color: '#EC595B' }}>{text}</p> */}

      
      </div>
     
    </Link>





    
  );
 
}

export default Subtreatments;
