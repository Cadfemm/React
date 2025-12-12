import React, { useState } from "react";
import "../styles/Baseassessment.css";
import SwallowingAssessment from "./SwallowingAssessment"; // import your swallowing UI

function BASEASSESSMENT() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Swallowing",
    "Nurse Swallowing",
    "Speech",
    "Language",
    "Visual",
    "Cardiovascular System",
    "Respiratory",
  ];

  return (
    <div className="base-container">
      {/* === Tab Header === */}
      <div
        className="tab-header"
        style={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          scrollBehavior: "smooth",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* === Tab Content === */}
      <div className="tab-content">
        {tabs[activeTab] === "Swallowing" ? (
          <SwallowingAssessment />
        ) : (
          <>
            <h3>{tabs[activeTab]} Module</h3>
            <p>
              Content for <strong>{tabs[activeTab]}</strong> tab goes here. You
              can add forms, charts, or any other components here.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default BASEASSESSMENT;
