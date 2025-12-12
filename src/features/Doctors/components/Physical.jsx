import React, { useState } from "react";
import SpasmSpasticity from "./SpasmSpasticity";
import SpinalcordInjury from "./SpinalcordInjury";
export default function Physical() {
  const [activeTab, setActiveTab] = useState("tab1");

  /* -------------------------
        INTERNAL CSS
  -------------------------- */
  const styles = {
    container: {
      width: "100%",
     
      margin: "0 auto",
     
      fontFamily: "Arial, sans-serif",
    },
    tabHeaderContainer: {
      display: "flex",
      borderBottom: "2px solid #ddd",
      marginBottom: 20,
    },
    tabButton: {
      flex: 1,
      padding: "10px 15px",
      textAlign: "center",
      cursor: "pointer",
      fontWeight: 600,
      borderBottom: "3px solid transparent",
    },
    activeTabButton: {
      borderBottom: "3px solid #007bff",
      color: "#007bff",
    },
    tabContent: {
      background: "#fff",
    
      border: "1px solid #ddd",
      borderRadius: 8,
    },
  };

  /* -------------------------
        COMPONENT CONTENT
  -------------------------- */

const ComponentOne = () => (
  <div>
    <SpasmSpasticity/>
  </div>
);


  const ComponentTwo = () => (
    <div>
<SpinalcordInjury/>
    </div>
  );

  const ComponentThree = () => (
    <div>
      <h3>Tab 3 – Progress Notes</h3>
      <p>This section contains SOAP notes and daily progress updates.</p>
    </div>
  );

  const ComponentFour = () => (
    <div>
      <h3>Tab 4 – Summary</h3>
      <p>This section contains overall summary and discharge plans.</p>
    </div>
  );

  /* -------- CONTENT SWITCHING -------- */

  const renderTabContent = () => {
    switch (activeTab) {
      case "tab1":
        return <ComponentOne />;
      case "tab2":
        return <ComponentTwo />;
      case "tab3":
        return <ComponentThree />;
      case "tab4":
        return <ComponentFour />;
      default:
        return null;
    }
  };

  /* -------------------------
        MAIN RETURN
  -------------------------- */

  return (
    <div style={styles.container}>
      {/* TAB HEADERS */}
      <div style={styles.tabHeaderContainer}>
        {["tab1", "tab2", "tab3", "tab4", "tab5"].map((tab, index) => {
          const labels = ["Spasm & Spasticity", "Spinalcord Injury", "Neuro", "Amputee", "Pain"];
          return (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.tabButton,
                ...(activeTab === tab ? styles.activeTabButton : {}),
              }}
            >
              {labels[index]}
            </div>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      <div style={styles.tabContent}>{renderTabContent()}</div>
    </div>
  );
}
