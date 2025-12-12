import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

function TopToolbar({
  showProfileMenu,
  toggleProfileMenu,
  onBook,
  onOrder,
  onSaveAll,
  onLogout,
}) {
  return (
    <>
      {/* ---- First row: Home, Files, Upload, Notifications, Profile ---- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: "1px solid #ccc",
          backgroundColor: "#f8f8f8",
        }}
      >
        {/* Left side - menu buttons */}
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            style={{ padding: "0px", background: "none", color: "#343FAC" }}
            className="Globalmenu"
          >
            Home
          </button>
          <button
            style={{ padding: "0px", background: "none", color: "#343FAC" }}
            className="Globalmenu"
          >
            Files
          </button>
          <button
            style={{ padding: "0px", background: "none", color: "#343FAC" }}
            className="Globalmenu"
          >
            Upload
          </button>
        </div>

        {/* Right side - notifications & profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            position: "relative",
          }}
        >
          {/* Notifications Icon */}
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              padding: "0px",
              position: "relative",
            }}
            title="Notifications"
          >
            <FaBell />
            {/* Red dot for unread notifications */}
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "8px",
                height: "8px",
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            ></span>
          </button>

          {/* Profile Icon */}
          <div style={{ position: "relative" }}>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0px",
                fontSize: "24px",
              }}
              onClick={toggleProfileMenu}
              title="Profile"
            >
              <FaUserCircle />
            </button>

            {/* Dropdown menu */}
            {showProfileMenu && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "35px",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  zIndex: 100,
                  minWidth: "120px",
                }}
              >
                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "none",
                    color: "#000",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---- Second row: Action buttons ---- */}
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "2px 12px" }}>
        {/* <button className="btn topbtn" onClick={onBook}>
          Book Appointment
        </button> */}

        <button className="btn topbtn" onClick={onOrder}>
          Submit
        </button>

        <button className="btn topbtn" style={{backgroundColor:"#615c5cff"}} onClick={onSaveAll}>
          AI Prediction
        </button>
      </div>
    </>
  );
}

export default TopToolbar;
