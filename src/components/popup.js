// Popup.js
import React from "react";
import "../styles/Popup.css"; // Style for the popup (you can adjust this as needed)

const popup = ({ Footer }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        {Footer} {/* Render children components inside the popup */}
      </div>
    </div>
  );
};

export default popup;
