import * as React from "react";
import { User, Layers, ShieldCheck, FileText ,FileStack, Briefcase, ChevronRight , CircleCheckBig } from "lucide-react";
function SidebarNav({ tab, setTab, userType, icdCode, icfCode, rapPercent, username, userRole }) {
 
 
const [showDeptMenu, setShowDeptMenu] = React.useState(false);
 
const departments =
[
    "Customer Service",
    "Nursing",
    "Medical Assistant",
    "Doctor",
    "Physio Therapy",
    "Vocational + Work Rehab",
    "Occupational Therapy",
    "Optometry",
    "Prosthetics & Orthotics",
    "Audiology",
    "Dietetics",
    "Speech & Language Therapy",
    "Psychology"
  ];
 
 
  return (
    <aside className="rail">
      <div className="scroll-area" style={{height:"100%",overflowY:"clip",overflowX:"visible",  flex: "1"}}>
      <nav className="tabs">
{/* --- SPEECH ASSESSMENT WITH HOVER SUBMENU --- */}
<div
  className="tab parent-tab"
  onMouseEnter={() => setShowDeptMenu(true)}
  onMouseLeave={() => setShowDeptMenu(false)}
  style={{
    position: "relative",
    overflow: "visible",
    zIndex: 999,
    cursor: "pointer"
  }}
>
  <User className="icon" size={25} /> Departments
  <ChevronRight size={20} style={{ marginLeft: "auto" }} />
 
  {showDeptMenu && (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "100%",
        background: "#1e293b",
        padding: "6px 0",
        borderRadius: "8px",
        minWidth: "240px",
        zIndex: 9999,
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        overflow: "visible"
      }}
    >
      {departments.map((dept) => (
        <div
          key={dept}
          onClick={() => setTab(dept)}
          style={{
            padding: "10px 14px",
            fontSize: "14px",
            color: "#fff",
            whiteSpace: "nowrap",
            cursor: "pointer"
          }}
          onMouseEnter={(e) =>
            (e.target.style.background = "#334155")
          }
          onMouseLeave={(e) =>
            (e.target.style.background = "transparent")
          }
        >
          {dept}
        </div>
      ))}
    </div>
  )}
</div>
            <button
      className={`tab ${tab === "PERSONAL" ? "active" : ""}`}
      onClick={() => setTab("PERSONAL")}
    >
      <User className="icon" size={25} /> Patient Demographics{" "}
      <ChevronRight size={20} style={{ marginLeft: "auto" }} />
    </button>
 <button className={`tab ${tab==="PHARMACY"?"active":""}`} onClick={()=>setTab("PHARMACY")} >
           <Layers className="icon" size={25} /> Pharmacy <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
          <button className={`tab ${tab==="TPS" ? "active" : ""}`} onClick={()=>setTab("TPS")}>
           <CircleCheckBig className="icon" size={25} /> Task Performance Simulation <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
         <button className={`tab ${tab==="RAP" ? "active" : ""}`} onClick={()=>setTab("RAP")}>
         <Briefcase className="icon" size={25} /> RTW
         {/* small percent bubble at the right */}
         <span className="nav-badge">{rapPercent}%</span>
         <ChevronRight size={20} style={{ marginLeft: "auto" }}
         />
       </button>
          <button className={`tab ${tab==="DOCUMENTS" ? "active" : ""}`} onClick={()=>setTab("DOCUMENTS")} >
           <FileStack className="icon" size={25} /> Documents<ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
       
         <button className={`tab ${tab==="SUMMARY"?"active":""}`} onClick={()=>setTab("SUMMARY")}>
           <FileText className="icon" size={25} /> Patient Summary <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
               <button className={`tab ${tab==="RAPFINAL" ? "active" : ""}`} onClick={()=>setTab("RAPFINAL")}>
         <Briefcase className="icon" size={25} /> RAP • Case
         <ChevronRight size={20} style={{ marginLeft: "auto" }}
         />
       </button>
           <button className={`tab ${tab==="AUDIT"?"active":""}`} onClick={()=>setTab("AUDIT")} >
           <ShieldCheck className="icon" size={25} /> Audit Trial <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
 
 
      </nav>
</div>
 
    </aside>
  );
}
 
export default SidebarNav;