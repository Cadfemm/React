import * as React from "react";
import { User, ClipboardList, Layers, Stethoscope, Target,ShieldCheck, FileText ,FileStack, Briefcase, ChevronRight , LayoutDashboard ,CircleCheckBig, ChartCandlestick ,Calendar, FlaskConical, Settings, SquareCheckBig,SquareActivity } from "lucide-react";
import { MainContent } from "../pages/Menu";
function SidebarNav({ tab, setTab, userType, icdCode, icfCode, rapPercent, username, userRole }) {

React.useEffect(() => {
  if (username === "D01Neurophysics" && userType === "NEW_USER") {
    setTab("NEWPATIENTS");
  } else if (username === "D01Neurophysics" && userType === "EXISTING_USER") {
    setTab("SUMMARY");
  } else if (username === "AdTherapist" && userType === "NEW_USER") {
    setTab("PERSONAL");
  } else if (username === "AdTherapist" && userType === "EXISTING_USER") {
    setTab("ICD_EXISTING");
  } else if (username === "CMO") {
    setTab("PTD");
  } else if (username === "HOD") {
    setTab("PatientsByDepartment");
  } else {
    // fallback default
    setTab("DASHBOARD");
  }
}, [username, userType, setTab]);
const [showDeptMenu, setShowDeptMenu] = React.useState(false);

const departments = [
  "Customer Service",
  "Nursing / Medical Assistant",
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


          {userType === "EXISTING_USER" && username === "AdTherapist" &&(<>
         {/* <button className={`tab ${tab==="DASHBOARD"?"active":""}`} onClick={()=>setTab("DASHBOARD")}>
           <LayoutDashboard className="icon" size={25} /> Dashboard <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button> */}

         <button
  className={`tab ${tab === "ICD_EXISTING" ? "active" : ""}`}
  onClick={() => setTab("ICD_EXISTING")}
>
  <SquareCheckBig className="icon" size={25} />
  Patients Existing
  <ChevronRight size={20} style={{ marginLeft: "auto" }} />
</button>
                </>
       )}
       
          {/* <button className={`tab ${tab==="ASSESSMENT"?"active":""}`} onClick={()=>setTab("ASSESSMENT")}>
           <ChartCandlestick className="icon" size={25} /> Assessment & Encounter <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
         <button className={`tab ${tab==="ASSESSMENT"?"active":""}`} onClick={() => setTab("VITALS")}>
           <SquareActivity className="icon" size={25} />Vitals<ChevronRight size={20} style={{ marginLeft: "auto" }} /></button>
        
 */}
         


         {/* <button className={`tab ${tab==="ICF"?"active":""}`} onClick={()=>setTab("ICF")} >
           <Layers className="icon" size={25} /> ICF <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
         
         <button className={`tab ${tab==="ICHI"?"active":""}`} onClick={()=>setTab("ICHI")} disabled={!icfCode}>
           <Stethoscope className="icon" size={25} /> ICHI <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
        
          */}



{userType === "NEW_USER" && username === "AdTherapist" && (
  <>
    <button
      className={`tab ${tab === "PERSONAL" ? "active" : ""}`}
      onClick={() => setTab("PERSONAL")}
    >
      <User className="icon" size={25} /> Patient Demographics{" "}
      <ChevronRight size={20} style={{ marginLeft: "auto" }} />
    </button>
    <button
      className={`tab ${tab === "NEWASSESSMENT" ? "active" : ""}`}
      onClick={() => setTab("NEWASSESSMENT")}
    >
      <ChartCandlestick className="icon" size={25} /> Assessment
      <ChevronRight size={20} style={{ marginLeft: "auto" }} />
    </button>
    <button
      className={`tab ${tab === "VITALS" ? "active" : ""}`}
      onClick={() => setTab("VITALS")}
    >
      <SquareActivity className="icon" size={25} /> Vitals
      <ChevronRight size={20} style={{ marginLeft: "auto" }} />
    </button>
    <button
      className={`tab ${tab === "ICD" ? "active" : ""}`}
      onClick={() => setTab("ICD")}
      disabled={!userType}
    >
      <ClipboardList className="icon" size={25} /> ICD
      <ChevronRight size={20} style={{ marginLeft: "auto" }} />
    </button>
  </>
)}

{username === "CMO" && (<>
<button className={`tab ${tab==="PTD"?"active":""}`} onClick={()=>setTab("PTD")}  >
           <Layers className="icon" size={25} /> PatientsToDepartments <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
         
          <button className={`tab ${tab==="ICD"?"active":""}`} onClick={()=>setTab("ICD")} disabled={!userType}>
           <ClipboardList className="icon" size={25} /> ICD <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
         </>)}
{username === "D01Neurophysics"  && userType === "NEW_USER" &&(<>
         <button className={`tab ${tab==="NEWPATIENTS"?"active":""}`} onClick={()=>setTab("NEWPATIENTS")} >
           <Layers className="icon" size={25} /> NEW PATIENTS <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>

         <button className={`tab ${tab==="ICF"?"active":""}`} onClick={()=>setTab("ICF")}  >
           <Layers className="icon" size={25} /> ICF <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
         {/* <button className={`tab ${tab==="GAS" ? "active" : ""}`} onClick={()=>setTab("GAS")} >
           <Target className="icon" size={25} /> GAS Goals <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button> */}

         {/* <button className={`tab ${tab==="ICHI"?"active":""}`} onClick={()=>setTab("ICHI")} disabled={!icfCode}>
           <Stethoscope className="icon" size={25} /> ICHI <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button> */}
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
          <button className={`tab ${tab==="DOCUMENTS" ? "active" : ""}`} onClick={()=>setTab("DOCUMENTS")} disabled={!icdCode}>
           <FileStack className="icon" size={25} /> Documents<ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
       
         <button className={`tab ${tab==="SUMMARY"?"active":""}`} onClick={()=>setTab("SUMMARY")} disabled={!icdCode}>
           <FileText className="icon" size={25} /> Patient Summary <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
               <button className={`tab ${tab==="RAPFINAL" ? "active" : ""}`} onClick={()=>setTab("RAPFINAL")}>
         <Briefcase className="icon" size={25} /> RAP • Case
         <ChevronRight size={20} style={{ marginLeft: "auto" }} 
         />
       </button>
           <button className={`tab ${tab==="AUDIT"?"active":""}`} onClick={()=>setTab("AUDIT")} disabled={!icdCode}>
           <ShieldCheck className="icon" size={25} /> Audit Trial <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
        </>)}


        {username === "SystemAdmin"  && userType === "NEW_USER" &&(<>
            <button
      className={`tab ${tab === "PERSONAL" ? "active" : ""}`}
      onClick={() => setTab("PERSONAL")}
    >
      <User className="icon" size={25} /> Patient Demographics{" "}
      <ChevronRight size={20} style={{ marginLeft: "auto" }} />
    </button>

             {/* <button className={`tab ${tab==="ICDNormal"?"active":""}`} onClick={()=>setTab("ICDNormal")} >
           <Layers className="icon" size={25} /> ICD<ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button> */}
                {/* <button
      className={`tab ${tab === "BASEASSESSMENT" ? "active" : ""}`}
      onClick={() => setTab("BASEASSESSMENT")}
    >
      <User className="icon" size={25} /> Initial Assessment{" "}
      <ChevronRight size={20} style={{ marginLeft: "auto" }} />
    </button> */}
                {/* <button
      className={`tab ${tab === "NurseBaseAssessment" ? "active" : ""}`}
      onClick={() => setTab("NurseBaseAssessment")}
    >
      <User className="icon" size={25} /> Nursing Assessment{" "}
      <ChevronRight size={20} style={{ marginLeft: "auto" }} />
    </button> */}

                {/* <button
      className={`tab ${tab === "ClinicalSwallowEvaluation" ? "active" : ""}`}
      onClick={() => setTab("ClinicalSwallowEvaluation")}
    >
      <User className="icon" size={25} /> Speech Assessment {" "}
      <ChevronRight size={20} style={{ marginLeft: "auto" }} />
    </button> */}

        {/* <button
      className={`tab ${tab === "NEWASSESSMENT" ? "active" : ""}`}
      onClick={() => setTab("NEWASSESSMENT")}
    >
      <ChartCandlestick className="icon" size={25} /> Assessment
      <ChevronRight size={20} style={{ marginLeft: "auto" }} />
    </button> */}
    {/* <button
      className={`tab ${tab === "VITALS" ? "active" : ""}`}
      onClick={() => setTab("VITALS")}
    >
      <SquareActivity className="icon" size={25} /> Vitals
      <ChevronRight size={20} style={{ marginLeft: "auto" }} />
    </button> */}


         {/* <button className={`tab ${tab==="ICFNormal"?"active":""}`} onClick={()=>setTab("ICFNormal")}  >
           <Layers className="icon" size={25} /> ICF <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button> */}
         {/* <button className={`tab ${tab==="GASNA" ? "active" : ""}`} onClick={()=>setTab("GASNA")} >
           <Target className="icon" size={25} /> GAS Goals <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button> */}

         {/* <button className={`tab ${tab==="ICHI"?"active":""}`} onClick={()=>setTab("ICHI")}>
           <Stethoscope className="icon" size={25} /> ICHI <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button> */}
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
        </>)}


        {username === "HOD" && (<>
        <button className={`tab ${tab==="PatientsByDepartment" ? "active" : ""}`} onClick={()=>setTab("PatientsByDepartment")} >
           <Target className="icon" size={25} /> PatientsByDepartment <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
         <button className={`tab ${tab==="ICDAD"?"active":""}`} onClick={()=>setTab("ICDAD")} >
           <ClipboardList className="icon" size={25} /> ICD Assign Doctor <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
        </>)}

{username === "D01Neurophysics"  && userType === "EXISTING_USER" && (<>

         <button className={`tab ${tab==="GASNA" ? "active" : ""}`} onClick={()=>setTab("GASNA")} >
           <Target className="icon" size={25} /> GAS Goals <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
 <button className={`tab ${tab==="TPS" ? "active" : ""}`} onClick={()=>setTab("TPS")}>
           <CircleCheckBig className="icon" size={25} /> Task Performance Simulation <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
         <button className={`tab ${tab==="RAP" ? "active" : ""}`} onClick={()=>setTab("RAP")}>
         <Briefcase className="icon" size={25} /> RAP • Case & RTW
         {/* small percent bubble at the right */}
         <span className="nav-badge">{rapPercent}%</span>
         <ChevronRight size={20} style={{ marginLeft: "auto" }} 
         />
       </button>
        <button className={`tab ${tab==="DOCUMENTS" ? "active" : ""}`} onClick={()=>setTab("DOCUMENTS")} >
           <FileStack className="icon" size={25} /> Documents<ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>
       
         <button className={`tab ${tab==="SUMMARY"?"active":""}`} onClick={()=>setTab("SUMMARY")} >
           <FileText className="icon" size={25} /> Patient Summary <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>

           <button className={`tab ${tab==="AUDIT"?"active":""}`} onClick={()=>setTab("AUDIT")} >
           <ShieldCheck className="icon" size={25} /> Audit Trial <ChevronRight size={20} style={{ marginLeft: "auto" }} />
         </button>


</>)}


      </nav>
</div>

    </aside>
  );
}

export default SidebarNav;