// Menu.js
import React from "react";
import { MenuList2 } from "../helpers/MenuList";
import MenuItem from "../components/Subtreatments";
import { useHistory,Link } from "react-router-dom";

import "../styles/Menu.css";


function Menu() {
  const history = useHistory();

  const handleCardClick = (path) => {
    history.push(path);
  };

  const handleRedirect = () => {
    history.push("/treatment/Subtreatments");
  };


  return (
    <div >
        <div className="menu">
      <h1 className="menuTitle">Modalities</h1>
      <div className="menuList">
        {MenuList2.map((menuItem, key) => {
          return (
            <MenuItem
              key={key}
              image={menuItem.image}
              title={menuItem.title}
              text={menuItem.text}
              to={`/treatment/${menuItem.to}`} // Provide the path to redirect to
              onClick={() => handleCardClick(`/treatment/${menuItem.to}`)} // You can also use onClick for custom behavior
            />
          );
        })}
      </div>
      <div style={{ textAlign: "center",padding:"10px",  borderColor: "#00345f",borderRadius:" 6px",color:" white",
    paddingLeft:"15px",
    paddingRight:"15px"
    

  }}>

  <button onClick={handleRedirect}>Back</button>

 
        </div>
      </div>

    </div>
    

  );
}

export default Menu;
