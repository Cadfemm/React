import React from 'react';
import Logo from "../assets/CADFEM_NEW_Logo.png";
import Logo2 from "../assets/strategic-ventures-logo-dark.png";

import "../styles/Signin.css"; // Import your CSS file for styling if needed

function Loginnav() {
  return (
    <>
    
 
    <div style={{display: "flex",alignItems: "center",justifyContent: "left", width:"100%",backgroundColor:"#fff"}} className="bar">
    <img src={Logo} alt="Logo 1" className="logo" />
        {/* <img src={Logo2} alt="Logo 2" className="logo2" /> */}
    </div>
    

    </>
  );
}

export default Loginnav;