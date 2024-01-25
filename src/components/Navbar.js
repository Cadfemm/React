import React, { useState } from "react";
import Logo from "../assets/cadfem-logo-white.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
         
      <Link to="/Home">
        
        <img
          src={Logo}
          alt="Description of the image"
          style={{ width: '100%', height: '40px' }}
        />
      </Link>
       
        <div className="hiddenLinks">
          <Link to="/Home"> Home </Link>
          <Link to="/menu"> Treatments </Link>
          <Link to="/about"> About </Link>
          <Link to="/contact"> Contact </Link>

        </div>
      </div>
      <div className="rightSide">
        <Link to="/Home"> Home </Link>
          <Link to="/menu"> Treatments </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
