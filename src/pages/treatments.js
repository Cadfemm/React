// Menu.js
import React, { useState, useEffect } from "react";
import { MenuList1 } from "../helpers/MenuList";
import MenuItem from "../components/Subtreatments";
import { useHistory } from "react-router-dom";

import "../styles/Menu.css";

function Menu() {
  const history = useHistory();
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    // Retrieve updated data from the history state
    const data = history.location.state?.updatedData;
    console.log(data)
    if (data) {
      setUpdatedData(data);
    }
  }, [history.location.state]);

  const handleCardClick = (path) => {
    history.push(path);
  };

  const handleRedirect = () => {
    history.push("/");
  };

  return (
    <div>
      <div className="menu">
        <h1 className="menuTitle">Modalities</h1>
        <div className="menuList">
          {MenuList1.map((menuItem, index) => {
            const isVisible = updatedData[index] === 1;
            return (
              isVisible && (
                <MenuItem
                  key={index}
                  image={menuItem.image}
                  title={menuItem.title}
                  text={menuItem.text}
                  to={`/treatment/${menuItem.to}`} // Corrected the template literal
                  onClick={() => handleCardClick(`/treatment/${menuItem.to}`)} // Corrected the template literal
                />
              )
            );
          })}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "40px" }}>
        <button onClick={handleRedirect}>Back</button>
      </div>
    </div>
  );
}

export default Menu;