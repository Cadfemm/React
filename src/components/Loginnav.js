import React from 'react';
import Logo from "../assets/cadfem-logo.png";
import Logo2 from "../assets/strategic-ventures-logo-dark.png";

import "../styles/Signin.css"; // Import your CSS file for styling if needed

function Loginnav() {
  return (
    <>
    <h1 className="heading">
Advancing Rehabitative Care With Custom AI/ML Prognostic Integration</h1>
    <div className="logo-container">
    <div style={{display: "flex",alignItems: "center",justifyContent: "space-between", width:"100%"}} className="bar">
    <img src={Logo} alt="Logo 1" className="logo" />
        <img src={Logo2} alt="Logo 2" className="logo2" />
    </div>
    
    </div>
    </>
  );
}

export default Loginnav;