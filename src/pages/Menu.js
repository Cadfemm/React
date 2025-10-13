import { useEffect, useMemo, useState, useCallback } from "react";
import * as React from "react";
import axios from "axios";
import { FaBell, FaUserCircle } from "react-icons/fa"; // Font Awesome icons
import { jsPDF } from "jspdf";
import { useParams } from "react-router-dom";
import { User, ClipboardList, Layers, Stethoscope, Target,ShieldCheck, FileText ,FileStack, Briefcase, ChevronRight , LayoutDashboard ,CircleCheckBig, ChartCandlestick ,Calendar, FlaskConical, Settings, SquareCheckBig,SquareActivity } from "lucide-react";
import NewUser from "../assets/screen.jpg"
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from "chart.js";
import ExistingUser from "../assets/exist.png"
 
/* If CRA proxy set to http://127.0.0.1:5000 keep API="". Otherwise set REACT_APP_API. */
const API = process.env.REACT_APP_API || "";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
const GAS_BASE = `${API}/gas`; 
export default function App() {
  const [tab, setTab] = useState("");        // "PERSONAL" | "ICD" | "ICF" | "ICHI" | "SUMMARY"
  const { mode } = useParams(); 
  const [userType, setUserType] = useState("");
  const [icdCode, setIcdCode] = useState("");   // deepest ICD from ICD tab
  const [icdPath, setIcdPath] = useState([]);   // [{ depth, table, key, label }]
  const [financialState, setFinancialState] = useState(null);
const [employmentState, setEmploymentState] = useState(null);
  const [icfCode, setIcfCode] = useState("");   // optional single ICF child context for ICHI
   // inside App()
const [soap, setSoap] = useState({});                 // Assessment & Encounter (SOAP)

const [tps, setTps]   = useState({});                 // TPS
const [rap, setRap]   = useState({});                 // RAP
const [rapPercent, setRapPercent] = useState(0);      // show "60%" in left rail
const handleUserSelection = (type) => {
    setUserType(type);
    if (type === "NEW_USER") {
      // Show the Patient Details tab for New User
      setTab("PERSONAL" );
    } else {
      // Show the Dashboard tab for Existing User
      setTab("DASHBOARD");
    }
  };
useEffect(() => {
    if (mode === "new") {
      handleUserSelection("NEW_USER");
    } else if (mode === "existing") {
      handleUserSelection("EXISTING_USER");
    }
    // if mode is undefined, your normal landing stays
  }, [mode]);
  // Patient controlled form state in App (for summary & persistence)
  const [patient, setPatient] = useState({
    patient_id: "",
    patient_name: "",
    reg_day: "", reg_month: "", reg_year: "",
    dob_day: "", dob_month: "", dob_year: "",
    gender: "", marital: "", nationality: "", occupation: ""
  });
 
  // Summaries emitted from sub-tabs
  const [icfSummary, setIcfSummary]   = useState([]); // array of normalized records
  const [ichiSummary, setIchiSummary] = useState({ selected: [], modalities: [], note: "" });
// Compute RAP % centrally and show in left rail
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const [gasSummary, setGasSummary] = useState([]);
// If your ICF tab already returns a summary, derive the selected ICF child codes from it.
// --- RAP + Audit (layout only) ---
const [rapData, setRapData] = useState({
  checks: {
    tps: true,
    workplace: false,
    family: true,
    med: false,
    vocational: false,
    employer: false
  },
  start_date: "",
  duration_weeks: 4,
  placement: "Light assembly / QC",
  restrictions: "No lifting >10kg; avoid ladder work; adjustable workstation"
});
useEffect(() => {
  const total = 6;
  const done = Object.values(rapData.checks || {}).filter(Boolean).length;
  setRapPercent(Math.round((done / total) * 100));
}, [rapData]);
const [auditItems, setAuditItems] = useState([]); // [{date:'YYYY-MM-DD', text:'...'}]
const addAudit = (text) =>
  setAuditItems(prev => [
    { date: new Date().toISOString().slice(0,10), text },
    ...prev
  ]);

// Adapt the selector to your icfSummary shape.
const icfChildren = useMemo(() => {
  // accept either array from ICFTab, or an object that holds an array in `.selected`
  const rows =
    Array.isArray(icfSummary) ? icfSummary :
    (Array.isArray(icfSummary?.selected) ? icfSummary.selected : []);

  // map both possible key names & make unique
  const codes = rows
    .map(r => r.child_icf || r.icf_child_code)
    .filter(Boolean);

  return Array.from(new Set(codes));
}, [icfSummary]);

// Save all key selections for the current patient
// Put this near where you have access to `form` (personal),
// `financialState`, `employmentState`, and your ICD/ICF/ICHI/GAS state.
async function saveEverything() {
  try {
    // 1) Personal — create if missing, else update
    let pid = patient.patient_id;
    const personal = {
      patient_name: patient.patient_name || "",
      gender: patient.gender || "",
      marital_status: patient.marital || "",
      nationality: patient.nationality || "",
      occupation: patient.occupation || "",
      // if you have split day/month/year, compose them before saving
      date_of_birth: patient.date_of_birth || null,
      date_register_otc: patient.date_register_otc || null
    };

    if (!pid) {
  const r = await fetch(`${API}/patients`, {
    method: "POST", headers: {"Content-Type":"application/json"},
    body: JSON.stringify(personal)
  });
  if (!r.ok) throw new Error(`Personal create failed (${r.status})`);
  const out = await r.json();
  pid = out.patient_id;
  setPatient(p => ({ ...p, patient_id: pid })); // <-- this MUST happen
} else {
      const r = await fetch(`${API}/patients/${encodeURIComponent(pid)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(personal)
      });
      if (!r.ok) throw new Error(`Personal update failed (${r.status})`);
    }

    // 2) Financial (if that tab provided data)
    if (financialState) {
      const fin = { ...financialState };
      const amt = parseFloat(String(fin.amount_rm ?? "").replace(/,/g, ""));
      fin.amount_rm = Number.isFinite(amt) ? amt : null;
      if (fin.oku_holder !== "Yes") fin.oku_id = "";
      const r = await fetch(`${API}/patients/${encodeURIComponent(pid)}/financial`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fin)
      });
      if (!r.ok) throw new Error(`Financial save failed (${r.status})`);
    }

    // 3) Employment (if that tab provided data)
    if (employmentState) {
      const emp = {
        ...employmentState,
        last_drawn_salary_rm:
          employmentState.last_drawn_salary_rm === "" ? 0.0 : Number(employmentState.last_drawn_salary_rm)
      };
      const r = await fetch(`${API}/patients/${encodeURIComponent(pid)}/employment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emp)
      });
      if (!r.ok) throw new Error(`Employment save failed (${r.status})`);
    }

    // 4) Clinical selections (ICD/ICF/ICHI/GAS)
    const clinicalPayload = {
      icd_path: icdPath,
      icf_summary: icfSummary,
      ichi_summary: ichiSummary,
      gas_summary: gasSummary
    };
    const r4 = await fetch(`${API}/patients/${encodeURIComponent(pid)}/save_summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clinicalPayload)
    });
    if (!r4.ok) throw new Error(`Clinical save failed (${r4.status})`);

    addAudit("Saved: Personal + Financial + Employment + ICD/ICF/ICHI/GAS");
    alert("All details saved");
  } catch (e) {
    alert(e.message);
  }
}
const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Function to toggle the profile dropdown
  const toggleProfileMenu = () => {
    setShowProfileMenu(prev => !prev);};


const [showAllergy, setShowAllergy] = React.useState(false);

React.useEffect(() => {
  let t;
  if (mode === "existing") {
    t = setTimeout(() => setShowAllergy(true), 3000); // show after 3s
  } else {
    setShowAllergy(false);
  }
  return () => clearTimeout(t);
}, [mode]);

  return (
    <>
      <StyleBlock />
         {/* Home interface when no user is selected */}





      <div className="page">
        {/* Left rail */}
        <aside className="rail">
          
<nav className="tabs">
   {userType === "EXISTING_USER" && (<>
  <button className={`tab ${tab==="DASHBOARD"?"active":""}`} onClick={()=>setTab("DASHBOARD")}>
    <LayoutDashboard className="icon" size={25} /> Dashboard <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>

   <button className={`tab ${tab==="ASSESSMENT"?"active":""}`} onClick={()=>setTab("ASSESSMENT")}>
    <ChartCandlestick className="icon" size={25} /> Assessment & Encounter <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
  <button className="btn" onClick={() => setTab("VITALS")}>
    <SquareActivity className="icon" size={25} />Vitals<ChevronRight size={20} style={{ marginLeft: "auto" }} /></button>
  <button className={`tab ${tab==="ICD"?"active":""}`} onClick={()=>setTab("ICD")} disabled={!userType}>
    <ClipboardList className="icon" size={25} /> ICD <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
  <button className={`tab ${tab==="ICF"?"active":""}`} onClick={()=>setTab("ICF")} disabled={!icdCode}>
    <Layers className="icon" size={25} /> ICF <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
  <button className={`tab ${tab==="GAS" ? "active" : ""}`} onClick={()=>setTab("GAS")} disabled={!icfCode}>
    <Target className="icon" size={25} /> GAS Goals <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
  <button className={`tab ${tab==="ICHI"?"active":""}`} onClick={()=>setTab("ICHI")} disabled={!icfCode}>
    <Stethoscope className="icon" size={25} /> ICHI <ChevronRight size={20} style={{ marginLeft: "auto" }} />
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
 <button className={`tab ${tab==="DOCUMENTS" ? "active" : ""}`} onClick={()=>setTab("DOCUMENTS")} disabled={!icdCode}>
    <FileStack className="icon" size={25} /> Documents<ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>

  <button className={`tab ${tab==="SUMMARY"?"active":""}`} onClick={()=>setTab("SUMMARY")} disabled={!icdCode}>
    <FileText className="icon" size={25} /> Patient Summary <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>

    <button className={`tab ${tab==="AUDIT"?"active":""}`} onClick={()=>setTab("AUDIT")} disabled={!icdCode}>
    <ShieldCheck className="icon" size={25} /> Audit Trial <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
  </>
)}
   {userType === "NEW_USER" && (
    <>
  <button className={`tab ${tab==="PERSONAL"?"active":""}`} onClick={()=>setTab("PERSONAL")}>
    <User className="icon" size={25} /> Patient Demographics <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
   <button className={`tab ${tab==="NEWASSESSMENT"?"active":""}`} onClick={()=>setTab("NEWASSESSMENT")}>
    <ChartCandlestick className="icon" size={25} /> Assessment<ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
    <button className={`tab ${tab==="VITALS"?"active":""}`} onClick={() => setTab("VITALS")}>
    <SquareActivity className="icon" size={25} />Vitals<ChevronRight size={20} style={{ marginLeft: "auto" }} /></button>
  <button className={`tab ${tab==="ICD"?"active":""}`} onClick={()=>setTab("ICD")} disabled={!userType}>
    <ClipboardList className="icon" size={25} /> ICD <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
  <button className={`tab ${tab==="ICF"?"active":""}`} onClick={()=>setTab("ICF")} disabled={!icdCode}>
    <Layers className="icon" size={25} /> ICF <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
  <button className={`tab ${tab==="GASNA" ? "active" : ""}`} onClick={()=>setTab("GASNA")} disabled={!icfCode}>
    <Target className="icon" size={25} /> GAS Goals <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
  <button className={`tab ${tab==="ICHI"?"active":""}`} onClick={()=>setTab("ICHI")} disabled={!icfCode}>
    <Stethoscope className="icon" size={25} /> ICHI <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
   <button className={`tab ${tab==="DOCUMENTS" ? "active" : ""}`} onClick={()=>setTab("DOCUMENTS")} disabled={!icdCode}>
    <FileStack className="icon" size={25} /> Documents<ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>

  <button className={`tab ${tab==="SUMMARY"?"active":""}`} onClick={()=>setTab("SUMMARY")} disabled={!icdCode}>
    <FileText className="icon" size={25} /> Patient Summary <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>

    <button className={`tab ${tab==="AUDIT"?"active":""}`} onClick={()=>setTab("AUDIT")} disabled={!icdCode}>
    <ShieldCheck className="icon" size={25} /> Audit Trial <ChevronRight size={20} style={{ marginLeft: "auto" }} />
  </button>
  </>
   )}     
</nav> 

        </aside>
 
        {/* Main area */}
        <main className="main">
{/* /* Global toolbar */}

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
        <button style={{ padding: "0px", background:"none", color:"#343FAC"}} className="Globalmenu">Home</button>
        <button style={{ padding: "0px",  background:"none", color:"#343FAC"}} className="Globalmenu">Files</button>
         <button style={{ padding: "0px",  background:"none", color:"#343FAC"}} className="Globalmenu">Upload</button>
      </div>

      {/* Right side - notifications & profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative", }}>
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
          {/* Optional red dot for unread notifications */}
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
  onClick={() => {
    // Redirect to home page on logout
    window.location.href = "http://localhost:3000/";
  }}
>
  Logout
</button>

            </div>
          )}
        </div>
      </div>
    </div>
  
   <div style={{display:"flex", justifyContent:"flex-end", margin: "2px 12px"}}>
<button 
  className="btn topbtn" 
  onClick={() => setTab("BOOK_APPOINTMENT")}
>
  Book Appointment
</button>

  <button className="btn topbtn" onClick={() => setTab("ORDER_INVESTIGATIONS")}>
  Order Investigation
</button>
   <button className="btn topbtn" onClick={saveEverything}>
  Save All
</button>


  </div> 




          {/* PERSONAL */}
         {/* DASHBOARD */}

<section style={{display: tab==="DASHBOARD" ? "block" : "none"}}>
  <DashboardTab
    patient={patient}
    icdPath={icdPath}
    icdCode={icdCode}
    icfSummary={icfSummary}
    ichiSummary={ichiSummary}
    rapPercent={rapPercent}
    rapData={rapData}
  />
</section>
          
         
<section style={{display: tab==="PERSONAL" ? "block" : "none"}}>
            <PersonalDetailsForm
  value={patient}
  onChange={setPatient}
  onFinancialChange={setFinancialState}
  onEmploymentChange={setEmploymentState}
/>
          </section>
          
<section style={{ display: tab === "VITALS" ? "block" : "none" }}>
  <VitalsTab patientId={patient?.id} onSaved={() => {}} />
</section>
          {/* ICD */}
          <section style={{display: tab==="ICD" ? "block" : "none"}}>
            <ICDInfinite
              onDeepestICDChange={(code) => { setIcdCode(code); setIcfCode(""); }}
              onPathChange={setIcdPath}
            />
          </section>
 
          {/* ICF */}
          <section style={{display: tab==="ICF" ? "block" : "none"}}>
            <ICFTab
              icdCode={icdCode}
              onSummaryChange={setIcfSummary}
              onSelectICF={setIcfCode}   // keep a single ICF child context for ICHI (optional)
            />
          </section>
 
          {/* ICHI */}
          <section style={{display: tab==="ICHI" ? "block" : "none"}}>
            <ICHITab
              icdCode={icdCode}
              icfCode={icfCode}
              onSummaryChange={setIchiSummary}
            />
          </section>
          {/* GAS */}
    <section style={{display: tab==="GAS" ? "block" : "none"}}>
      <GasGoalsTab
        icfChildren={icfChildren}
        onSummaryChange={setGasSummary}
      />
    </section>
<section style={{display: tab==="BOOK_APPOINTMENT" ? "block" : "none"}}>
  <BookAppointmentTab patient={patient} />
</section>
<section style={{ display: tab === "ORDER_INVESTIGATIONS" ? "block" : "none" }}>
  <InvestigationsChecklist
    variant="inline"
    patient={{ id: "PT-0001", name: "Jhon Doe" }}
    // initialRows={[{ item: "Lumbar spine X-ray (AP/Lateral)", type: "Radiology", test: "X-ray" }]}
    onSave={(rows) => console.log("Saved rows:", rows)}
  />
</section>
<section style={{display: tab==="GASNA" ? "block" : "none"}}>
      <GasGoalsNATab
        icfChildren={icfChildren}
        onSummaryChange={setGasSummary}
      />
    </section>


    <section style={{display: tab==="NEWASSESSMENT" ? "block" : "none"}}>
    <NewAssessmentTab/>
    </section>
 
          {/* SUMMARY */}
          <section style={{display: tab==="SUMMARY" ? "block" : "none"}}>
            <PatientSummary
              patient={patient}
              icdPath={icdPath}
              icdCode={icdCode}
              icfSummary={icfSummary}
              ichiSummary={ichiSummary}
              gasSummary={gasSummary} 
            />
          </section>
{/* Assessment & Encounter (SOAP) */}
<section style={{display: tab==="ASSESSMENT" ? "block" : "none"}}>
  <AssessmentEncounterTab
    patientId={patient.patient_id}
    value={soap}
    onChange={setSoap}
    onSaved={() => addAudit("SOAP saved — Assessment/Encounter updated")}
    /* NEW: options for the goals table */
    icfOptions={(icfSummary || []).map(x => ({
      value: x.child_icf,
      label: `${x.child_icf} — ${x.child_name}` + (Number.isFinite(x.score) ? ` (GAS ${x.score})` : "")
    }))}
    ichiOptions={Array.isArray(ichiSummary?.selected) ? ichiSummary.selected.map(s => ({
      value: s.ichi_code,
      label: `${s.ichi_code} — ${s.ichi_name}`
    })) : []}
    icdContext={icdCode || ""}
  />
</section>


{/* Task Performance Simulation (TPS) */}
<section style={{display: tab==="TPS" ? "block" : "none"}}>
  <TaskPerformanceSimulationTab
    patientId={patient.patient_id}
    value={tps}
    onChange={setTps}
    onSaved={() => addAudit("TPS saved — Task performance data updated")}
  />
</section>

{/* RAP • Case & RTW */}
<section style={{display: tab==="RAP" ? "block" : "none"}}>
  <RAPTab
    data={rapData}
    onChange={setRapData}
    onSave={() => addAudit("RAP saved — RTW/Light-Duty proposal updated")}
  />
</section>

{/* Documents */}
<section style={{display: tab==="DOCUMENTS" ? "block" : "none"}}>
  <DocumentsTab patientId={patient.patient_id} />
</section>

{/* Audit Trail */}
<section style={{display: tab==="AUDIT" ? "block" : "none"}}>
  <AuditTrailTab items={auditItems} />
</section>
{showAllergy && (
  <div style={{
    position: "fixed", left: 16, right: 16, bottom: 16, zIndex: 9999,
    display: "flex", justifyContent: "center", pointerEvents: "none"
  }}>
    <div style={{
      pointerEvents: "auto",
      background: "#fff", border: "1px solid #fca5a5", borderRadius: 12,
      padding: "14px 18px", boxShadow: "0 12px 30px rgba(0,0,0,.12)", maxWidth: 720, width: "100%"
    }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#991b1b" }}>
        Allergic reactions
      </h2>
      <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
        <li>Allergic to brinjal</li>
        <li>Allergic to riboflavin drug</li>
      </ul>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button className="btn" onClick={() => setShowAllergy(false)}>Dismiss</button>
      </div>
    </div>
  </div>
)}

        </main>
      </div>
    </>
  );
}
 
/* ---------------- ICD CASCADE (N-level) ---------------- */
// function ICDInfinite({ onDeepestICDChange, onPathChange }) {
//   // remove the hard cap – start with 4 placeholders but allow growth
//   const [levels, setLevels] = React.useState(
//     Array.from({ length: 4 }, (_, i) => ({
//       table: "",
//       label: `Level ${i + 1}`,
//       options: [],            // each option: { key, label, table }
//       value: "",
//       disabled: i !== 0,
//       parentKey: null,
//     }))
//   );
//   const [busy, setBusy] = React.useState(false);
//   const [msg, setMsg] = React.useState("");

//   const getJSON = async (url) => {
//     const r = await fetch(url);
//     if (!r.ok) throw new Error(`HTTP ${r.status}`);
//     return r.json();
//   };

//   // init L1
//   React.useEffect(() => {
//     (async () => {
//       try {
//         setBusy(true); setMsg("");
//         const data = await getJSON(`${API}/nsd`); // [{key,label}]
//         setLevels(prev => {
//           const next = [...prev];
//           next[0] = {
//             table: "nervous_system_diseases",
//             label: "Nervous system",
//             options: data.map(d => ({ ...d, table: "nervous_system_diseases" })),
//             value: "",
//             disabled: false,
//             parentKey: null
//           };
//           for (let i = 1; i < next.length; i++) {
//             next[i] = { ...next[i], options: [], value: "", disabled: true, parentKey: null, table: "" };
//           }
//           return next;
//         });
//         onDeepestICDChange?.("");
//         onPathChange?.([]);
//       } catch (e) {
//         setMsg(`Failed to load NSD: ${e.message}`);
//       } finally { setBusy(false); }
//     })();
//   }, []);

//   const deepestSelected = (lvls) => {
//     for (let d = lvls.length - 1; d >= 0; d--) if (lvls[d].value) return lvls[d].value;
//     return "";
//   };

//   const computePath = (lvls) => {
//     const out = [];
//     lvls.forEach((L, depth) => {
//       if (L.value) {
//         const opt = L.options.find(o => o.key === L.value);
//         out.push({ depth, table: opt?.table || L.table, key: L.value, label: opt?.label || L.value });
//       }
//     });
//     return out;
//   };

//   // Utility: ensure we have at least (idx+1) levels in state
//   const ensureLevel = (idx) => {
//     setLevels(prev => {
//       if (idx < prev.length) return prev;
//       const extra = Array.from({ length: idx - prev.length + 1 }, (_, j) => ({
//         table: "", label: `Level ${prev.length + j + 1}`, options: [],
//         value: "", disabled: true, parentKey: null
//       }));
//       return [...prev, ...extra];
//     });
//   };

//   const onPick = async (depth, value) => {
//     // update selection + clear deeper levels
//     setLevels(prev => {
//       const next = prev.map(x => ({ ...x }));
//       next[depth].value = value;
//       for (let d = depth + 1; d < next.length; d++) {
//         next[d] = { ...next[d], options: [], value: "", disabled: true, parentKey: null, table: "" };
//       }
//       onDeepestICDChange?.(deepestSelected(next));
//       onPathChange?.(computePath(next));
//       return next;
//     });

//     if (!value) return;

//     try {
//       setBusy(true); setMsg("");

//       // IMPORTANT: use the selected option’s own table
//       const L = levels[depth];
//       const selOpt = (L?.options || []).find(o => o.key === value);
//       const parentTable = selOpt?.table || L?.table || "";

//       const children = await getJSON(
//         `${API}/tree/children/${encodeURIComponent(parentTable)}/${encodeURIComponent(value)}`
//       );
//       if (!children.length) return;

//       // Prepare next level (depth+1). Grow array if needed.
//       ensureLevel(depth + 1);

//       setLevels(prev => {
//         const next = prev.map(x => ({ ...x }));
//         // options must carry their own table
//         const nextOptions = children.map(c => ({ key: c.key, label: c.label, table: c.table || parentTable }));
//         next[depth + 1] = {
//           table: children[0].table || parentTable,
//           label: `Level ${depth + 2}`,
//           options: nextOptions,
//           value: "",
//           disabled: false,
//           parentKey: value
//         };
//         // keep any deeper ones disabled
//         for (let d = depth + 2; d < next.length; d++) {
//           next[d] = { ...next[d], options: [], value: "", disabled: true, parentKey: null, table: "" };
//         }
//         onDeepestICDChange?.(deepestSelected(next));
//         onPathChange?.(computePath(next));
//         return next;
//       });
//     } catch (e) {
//       setMsg(`Failed to load children: ${e.message}`);
//     } finally { setBusy(false); }
//   };
// // utils
// const toTitleCase = (s = "") =>
//   s
//     .replace(/[_-]+/g, " ")   // underscores/dashes -> spaces
//     .replace(/\s+/g, " ")     // collapse spaces
//     .trim()
//     .toLowerCase()
//     .replace(/\b[a-z]/g, c => c.toUpperCase()); // cap each word

//   return (
//     <section className="card">
//       <div className="cardheading"><h2 className="title">ICD Cascade</h2></div>

//       {levels.map((L, depth) => (
//         <div key={depth} className="row">
//           <div className="label">{L.label}</div>
//           <select
//             className="input"
//             disabled={L.disabled}
//             value={L.value}
//             onChange={e => onPick(depth, e.target.value)}
//           >
// <option value="">
//   {L.disabled
//     ? "— Disabled —"
//     : `— Select from ${toTitleCase(L?.label || "")} —`}
// </option>

//             {L.options.map(o => (
//               <option key={o.key} value={o.key}>{o.label}</option>
//             ))}
//           </select>
//         </div>
//       ))}

//       {busy && <div className="note">Loading…</div>}
//       {msg && <div className="note">{msg}</div>}
//     </section>
//   );
// }




function ICDInfinite({ onDeepestICDChange, onPathChange }) {
  const [levels, setLevels] = React.useState([
    { label: "Admission Level", options: [], value: "", disabled: false, parentKey: null },
    { label: "Level 2", options: [], value: "", disabled: true, parentKey: null },
    { label: "Level 3", options: [], value: "", disabled: true, parentKey: null },
    { label: "Level 4", options: [], value: "", disabled: true, parentKey: null },
  ]);

  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  // Helper for pretty labels
  const toTitleCase = (s = "") =>
    s
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .replace(/\b[a-z]/g, (c) => c.toUpperCase());

  // Load Level 1 (roots)
  React.useEffect(() => {
    (async () => {
      try {
        setBusy(true);
        setMsg("");
        const res = await api.get("/api/icd/roots/");
        setLevels((prev) => {
          const next = [...prev];
          next[0].options = res.data;
          next[0].disabled = false;
          for (let i = 1; i < next.length; i++) {
            next[i] = { ...next[i], options: [], value: "", disabled: true, parentKey: null };
          }
          return next;
        });
        onDeepestICDChange?.("");
        onPathChange?.([]);
      } catch (err) {
        setMsg(`Failed to load ICD root data: ${err.message}`);
      } finally {
        setBusy(false);
      }
    })();
  }, []);

  // Utility to extend array if deeper levels are needed dynamically
  const ensureLevel = (idx) => {
    setLevels((prev) => {
      if (idx < prev.length) return prev;
      const extra = Array.from({ length: idx - prev.length + 1 }, (_, j) => ({
        label: `Level ${prev.length + j + 1}`,
        options: [],
        value: "",
        disabled: true,
        parentKey: null,
      }));
      return [...prev, ...extra];
    });
  };

  // Compute path
  const computePath = (lvls) => {
    return lvls
      .map((L, depth) => {
        if (!L.value) return null;
        const opt = L.options.find((o) => o.key === L.value);
        return { depth, key: L.value, label: opt?.label || L.value };
      })
      .filter(Boolean);
  };

  const deepestSelected = (lvls) => {
    for (let d = lvls.length - 1; d >= 0; d--) if (lvls[d].value) return lvls[d].value;
    return "";
  };

  // When user picks something in any level
  const onPick = async (depth, value) => {
    setLevels((prev) => {
      const next = prev.map((x) => ({ ...x }));
      next[depth].value = value;

      // Clear deeper levels
      for (let d = depth + 1; d < next.length; d++) {
        next[d] = { ...next[d], options: [], value: "", disabled: true, parentKey: null };
      }

      onDeepestICDChange?.(deepestSelected(next));
      onPathChange?.(computePath(next));
      return next;
    });

    if (!value) return;

    try {
      setBusy(true);
      setMsg("");
      // Fetch children dynamically from Django
      const res = await api.get(`/api/icd/children/${encodeURIComponent(value)}/`);
      const children = res.data || [];

      if (!children.length) return;

      // Grow state if deeper level not present
      ensureLevel(depth + 1);

      // Populate next level with children
      setLevels((prev) => {
        const next = [...prev];
        const nextLvl = depth + 1;
        next[nextLvl] = {
          ...next[nextLvl],
          options: children,
          value: "",
          disabled: false,
          parentKey: value,
        };
        // Disable deeper ones beyond next
        for (let d = nextLvl + 1; d < next.length; d++) {
          next[d] = { ...next[d], options: [], value: "", disabled: true, parentKey: null };
        }
        onDeepestICDChange?.(deepestSelected(next));
        onPathChange?.(computePath(next));
        return next;
      });
    } catch (err) {
      setMsg(`Failed to load ICD children: ${err.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="card">
      <div className="cardheading">
        <h2 className="title">ICD Cascade</h2>
      </div>

      {levels.map((L, depth) => (
        <div key={depth} className="row" style={{ marginBottom: 8 }}>
          <div className="label" >{L.label}</div>
          <select
            className="input"
            disabled={L.disabled}
            value={L.value}
            onChange={(e) => onPick(depth, e.target.value)}
          >
            <option value="">
              {L.disabled
                ? "— Disabled —"
                : `— Select from ${toTitleCase(L.label)} —`}
            </option>
            {L.options.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      {busy && <div className="note">Loading…</div>}
      {msg && <div className="note">{msg}</div>}
    </section>
  );
}




function DashboardTab({ patient, icdPath, icdCode, icfSummary, ichiSummary, rapPercent, rapData }) {
  const [upcoming, setUpcoming] = React.useState([]);

  // Static "Active standards" chips
  const chips = React.useMemo(() => ([
    { k: "ICD-11", v: "8B00.0" },
    { k: "ICF",   v: "b1108, b7401, b749, b303" },
    { k: "ICHI",  v: "MUB.AA.ZZ, MUC.AA.ZZ" },
    { k: "CARF RTW", v: "30/60/90 day" }
  ]), []);

  // Helper
  const addDays = (dt, n) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n);

  // Build Upcoming list (kept as-is, still uses rapData)
  React.useEffect(() => {
    const base = [
      { date: addDays(new Date(), 1), event: "Workplace Ergonomics Visit" },
      { date: addDays(new Date(), 3), event: "TPS Session #2" },
      { date: addDays(new Date(), 6), event: "Medical Review — Fitness to Work update" }
    ];
    if (rapData?.start_date) {
      base.unshift({ date: new Date(rapData.start_date), event: "Light-duty placement start" });
    }
    const sorted = base
      .filter(x => x.date && !isNaN(x.date))
      .sort((a, b) => a.date - b.date)
      .map(x => ({ date: x.date.toISOString().slice(0, 10), event: x.event }));
    setUpcoming(sorted.slice(0, 5));
  }, [rapData?.start_date]);

  return (
    <section className="dash-wrap">
      {/* At a glance card */}
      <div className="dash-card">
        <div className="glance-head">
          <div className="glance-l">
            <div className="g-title">At a Glance</div>

            <div className="g-row">
              <div className="g-label">PATIENT</div>
              <div className="g-block">
                <div className="g-name">John Doe</div>
                <div className="g-meta">
                  ID: IND0001 · DoB: 13-07-1982 · Male
                </div>
                <div className="g-meta">
                  Employer: Kilang Sdn Bhd · Payor: PERKESO RTW
                </div>
              </div>
            </div>

            <div className="g-row">
              <div className="g-label">ACTIVE STANDARDS</div>
              <div className="g-tags">
                {chips.map((c, i) => (
                  <span className="tag" key={i}>
                    <b>{c.k}:</b>&nbsp;{c.v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glance-r">
            <div className="rtw-title">RTW Readiness</div>
            <div className="rtw-bar">
              <div
                className="rtw-fill"
                style={{ width: `${Math.max(0, Math.min(100, rapPercent))}%` }}
              />
            </div>
            <div className="rtw-note">
              {rapPercent}% ready
              <span className="dim">
                {" "}
                (computed from TPS, medical, workplace, family, employer, vocational)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming card */}
      <div className="dash-card">
        <div className="g-title">Upcoming</div>
        <table className="dash-table">
          <thead>
            <tr><th style={{ width: "24%" }}>Date</th><th>Event</th></tr>
          </thead>
          <tbody>
            {upcoming.length === 0 ? (
              <tr><td colSpan={2} className="muted">No events scheduled.</td></tr>
            ) : upcoming.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}



 
/* ---------------- ICF Tab: parent ICF -> child ICF -> ranges ---------------- */
function ICFTab({ icdCode, onSummaryChange, onSelectICF }) {
  const [groups, setGroups] = useState({});
  const [active, setActive] = useState("");
  const [childOpts, setChildOpts] = useState({}); // { 'b730': [ {key,label} ] }
  const [childSel, setChildSel]   = useState({}); // { 'b730': 'b7300' }
  const [qualOpts, setQualOpts]   = useState({}); // { 'b7300': [ {key,label,range,name} ] }
  const [qualSel, setQualSel]     = useState({}); // { 'b7300': 'qm1' }
  const [scoreSel, setScoreSel]   = useState({}); // { 'b7300|qm1': 7 }
  const [busy, setBusy] = useState(false);
  const [msg, setMsg]   = useState("");
 
  const order = ["PT","OT","Neuropsych","Other","Uncategorized"];
  const getJSON = async (u) => { const r = await fetch(u); if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); };
 
  // Parse "0-4", "005-24", "25-49", "96-100" → [0..4], [5..24], etc.
  const rangeToNumbers = (rangeStr) => {
    if (!rangeStr) return []; // e.g., qm8/qm9 → hide
    const s = (rangeStr || "").trim().replace(/^0+/, (m)=> (m==="0" ? "0" : "")); // keep a single 0; strip other leading zeros
    const m = s.match(/^(\d+)\s*-\s*(\d+)$/);
    if (!m) return [];
    const lo = parseInt(m[1],10);
    const hi = parseInt(m[2],10);
    if (isNaN(lo) || isNaN(hi) || lo>hi) return [];
    const out = [];
    for (let n=lo;n<=hi;n++) out.push(n);
    return out;
  };
 
  // Load grouped parent ICFs
  useEffect(() => {
    setGroups({}); setActive("");
    setChildOpts({}); setChildSel({});
    setQualOpts({}); setQualSel({});
    setScoreSel({});
    setMsg("");
    onSummaryChange?.([]);  // reset summary
    onSelectICF?.("");      // reset ICF context for ICHI
    if (!icdCode) { setMsg("Pick an ICD first in the ICD tab."); return; }
 
    (async () => {
      try {
        setBusy(true);
        const d = await getJSON(`${API}/map/icdcode-to-icf/${encodeURIComponent(icdCode)}/grouped`);
        const g = d.groups || {};
        const keys = Object.keys(g).sort((a,b) =>
          (order.indexOf(a)===-1?99:order.indexOf(b)===-1?99:order.indexOf(a)-order.indexOf(b)) || a.localeCompare(b)
        );
        setGroups(g);
        setActive(keys[0] || "");
      } catch (e) { setMsg(`Failed to load ICF: ${e.message}`); }
      finally { setBusy(false); }
    })();
  }, [icdCode]);
 
  const loadChildren = async (parentCode) => {
    if (childOpts[parentCode]) return;
    try {
      const rows = await getJSON(`${API}/icf/children/${encodeURIComponent(parentCode)}`);
      setChildOpts(prev => ({...prev, [parentCode]: rows}));
    } catch (e) { setMsg(`Failed to load child ICFs for ${parentCode}: ${e.message}`); }
  };
 
  const chooseChild = async (parentCode, childCode) => {
    setChildSel(prev => ({...prev, [parentCode]: childCode}));
    onSelectICF?.(childCode || "");  // keep single selected ICF context for ICHI tab
 
    // Reset any qualifier/score tied to this child
    setQualSel(prev => ({...prev, [childCode]: ""}));
    const updatedScores = {...scoreSel};
    Object.keys(updatedScores).forEach(k => { if (k.startsWith(childCode + "|")) delete updatedScores[k]; });
    setScoreSel(updatedScores);
 
    if (!childCode) { emitSummary(); return; }
 
    try {
      const rows = await getJSON(`${API}/icf/qualifiers/${encodeURIComponent(childCode)}`);
      setQualOpts(prev => ({...prev, [childCode]: rows}));
      setQualSel(prev => ({...prev, [childCode]: rows[0]?.key || ""}));
      // also set an initial score if that first qualifier has a valid range
      const firstRange = rows[0]?.range || "";
      const nums = rangeToNumbers(firstRange);
      if (nums.length) setScoreSel(s => ({...s, [childCode + "|" + (rows[0].key)]: nums[0]}));
    } catch (e) { setMsg(`Failed to load qualifiers for ${childCode}: ${e.message}`); }
  };
 
  const chooseQualifier = (childCode, qualId, qualRange) => {
    setQualSel(prev => ({...prev, [childCode]: qualId}));
    // reset score for this (child|qual) pair
    const key = `${childCode}|${qualId}`;
    const nums = rangeToNumbers(qualRange);
    setScoreSel(prev => {
      const clone = {...prev};
      // remove any scores belonging to this child but a previous qualifier
      Object.keys(clone).forEach(k => { if (k.startsWith(childCode + "|")) delete clone[k]; });
      if (nums.length) clone[key] = nums[0]; // default to first
      return clone;
    });
  };
 
  // Build & emit normalized summary whenever driving states change
  useEffect(() => { emitSummary(); }, [groups, childOpts, childSel, qualOpts, qualSel, scoreSel]);
 
  const emitSummary = () => {
    const out = [];
    Object.values(groups).flat().forEach(parent => {
      const parent_icf = parent.icf_code;
      const parent_name = parent.name;
      const childCode = childSel[parent_icf] || "";
      if (!childCode) return; // only include if doctor picked a child
 
      const childLabel = (childOpts[parent_icf]||[]).find(x => x.key === childCode)?.label || childCode;
 
      const qid = qualSel[childCode] || "";
      const qrec = (qualOpts[childCode]||[]).find(x => x.key === qid);
      const qualifier_label = qrec?.label || qid;
      const range = qrec?.range || "";
      const score = scoreSel[`${childCode}|${qid}`];
 
      out.push({
        parent_icf, parent_name,
        child_icf: childCode, child_name: childLabel,
        qualifier_id: qid, qualifier_label, range, score
      });
    });
    onSummaryChange?.(out);
  };
 
  const keys = Object.keys(groups).sort((a,b) =>
    (order.indexOf(a)===-1?99:order.indexOf(b)===-1?99:order.indexOf(a)-order.indexOf(b)) || a.localeCompare(b)
  );
 
  return (
    <section className="card">
            <div className="buttonbar"style={{display:"flex", gap:8, marginBottom:12, flexWrap:"wrap"}}>
        {keys.map(k => (
          <button key={k} className={`btn ${active===k?"active":""}`} onClick={()=>setActive(k)} disabled={busy}>
            {k} ({groups[k]?.length||0})
          </button>
        ))}
      </div>
      <div className="cardheading"><h2 className="title">ICF</h2>
      <p className="subtitle">ICD selected: <strong>{icdCode || "—"}</strong></p>
 </div>

 
      {msg && <div className="note">{msg}</div>}
 
      {(groups[active]||[]).map(p => {
        const parentCode = p.icf_code;
        const childList  = childOpts[parentCode] || [];
        const chosenChild= childSel[parentCode] || "";
        const rangeList  = chosenChild ? (qualOpts[chosenChild] || []) : [];
        const chosenQual = chosenChild ? (qualSel[chosenChild] || "") : "";
 
        const selectedRangeObj = rangeList.find(r => r.key === chosenQual);
        const selectedRangeStr = selectedRangeObj?.range || "";
        const nums = (() => {
          if (!selectedRangeStr) return [];
          const m = selectedRangeStr.match(/^(\d+)\s*-\s*(\d+)$/);
          if (!m) return [];
          const lo = parseInt(m[1],10), hi=parseInt(m[2],10);
          return Array.from({length:(hi-lo+1)}, (_,i)=>lo+i);
        })();
        const scoreKey = `${chosenChild}|${chosenQual}`;
        const chosenScore = scoreSel[scoreKey] ?? "";
 
        return (
          <div key={parentCode} className="row" style={{alignItems:"center"}}>
            <div className="label">{parentCode} — {p.name}</div>
            <div style={{display:"flex", gap:8, flexWrap:"wrap", alignItems:"center"}}>
              {/* Child ICF dropdown */}
              <select className="input"
                      onFocus={()=>loadChildren(parentCode)}
                      value={chosenChild}
                      onChange={e=>chooseChild(parentCode, e.target.value)}
                      style={{minWidth:280}}>
                <option value="">{childList.length ? "— Choose Child ICF —" : "— Loading / None —"}</option>
                {childList.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
 
              {/* Range dropdown */}
              <select className="input" disabled={!chosenChild || !rangeList.length}
                      value={chosenQual}
                      onChange={e=>{
                        const newQual = e.target.value;
                        const ro = rangeList.find(r => r.key === newQual);
                        chooseQualifier(chosenChild, newQual, ro?.range || "");
                      }}
                      style={{minWidth:280}}>
                <option value="">{rangeList.length ? "— Choose Range —" : "— No Ranges —"}</option>
                {rangeList.map(r => (
                  <option key={r.key} value={r.key}>
                    {r.label}{r.range ? ` (${r.range})` : ""}
                  </option>
                ))}
              </select>
 
              {/* Number dropdown: only when range is valid (hide for qm8/qm9) */}
              {nums.length > 0 && (
                <>
                  <div className="pill">Range: <strong>{selectedRangeStr}</strong></div>
                  <select className="input" value={chosenScore}
                          onChange={e=>setScoreSel(prev=>({...prev, [scoreKey]: Number(e.target.value)}))}
                          style={{minWidth:120}}>
                    {nums.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
 
/* ---------------- ICHI Tab: multi-select, modalities, note ---------------- */
function ICHITab({ icdCode, icfCode, onSummaryChange }) {
  const [rows, setRows] = useState([]);           // [{ icf_code, ichi_code, ichi_name }]
  const [catMap, setCatMap] = useState({});       // { icf_code: category }
  const [busy, setBusy] = useState(false);
  const [msg, setMsg]   = useState("");

  // single selection across all categories
  const [selected, setSelected] = useState(new Set());

  // modalities + note
  const [modsOptions, setModsOptions]   = useState([]);        // [{value,label}]
  const [modsSelected, setModsSelected] = useState(new Set()); // Set<string>
  const [note, setNote] = useState("");
const [assessSummary, setAssessSummary] = useState([]); // [{assessment, items:[{input,score}]}]

  // active tab/category
  const [activeCat, setActiveCat] = useState("");
// options
const [rangeOpts, setRangeOpts] = useState([]);      // [{value,label}]
const [durationOpts, setDurationOpts] = useState([]);

// selections per modalityId string
const [rangeSelByMod, setRangeSelByMod] = useState({});     // { '7': 2, ... }
const [durSelByMod, setDurSelByMod]     = useState({});     // { '7': 8, ... }

  const API = process.env.REACT_APP_API || "";
  const NOTE_MAX = 1000;

  const getJSON = async (u) => {
    const r = await fetch(u);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  };

  // ────────────────────────────────────────────────────────────────────────────
  // 1) Load ICHI list (by ICD only) and ICF→Category map (from your grouped API)
  // ────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    setRows([]);
    setSelected(new Set());
    setModsSelected(new Set());
    setNote("");
    setActiveCat("");
    setMsg("");
    onSummaryChange?.({ selected: [], modalities: [], note: "" });

    if (!icdCode) { setMsg("Pick an ICD first."); return; }

    (async () => {
      try {
        setBusy(true);

        // ICHI list for this ICD (grouped by ICF → flatten)
        const dataIchi = await getJSON(`${API}/map/icdcode-to-ichi/${encodeURIComponent(icdCode)}`);
        const flat = [];
        Object.entries(dataIchi.by_icf || {}).forEach(([icf, arr]) => {
          (arr || []).forEach(x => flat.push({ icf_code: icf, ichi_code: x.ichi_code, ichi_name: x.ichi_name }));
        });
        setRows(flat);

        // ICF → Category mapping (no heuristics, use DB categories)
        const dataCats = await getJSON(`${API}/map/icdcode-to-icf/${encodeURIComponent(icdCode)}/grouped`);
        const g = dataCats.groups || {};
        const map = {};
        Object.entries(g).forEach(([category, arr]) => {
          (arr || []).forEach(p => { map[p.icf_code] = (category || "Other"); });
        });
        setCatMap(map);

        if (flat.length === 0) setMsg("No ICHI mapped for this ICD.");
      } catch (e) {
        setMsg(`Failed to load ICHI / ICF categories: ${e.message}`);
      } finally {
        setBusy(false);
      }
    })();
  }, [icdCode]);

  // ──────────────────────────────────────
  // 2) Load modalities once (or per ICD)
  // ──────────────────────────────────────
  useEffect(() => {
    setModsOptions([]); setModsSelected(new Set());
    (async () => {
      try {
        const opts = await getJSON(`${API}/modalities`);
        setModsOptions(opts || []);
      } catch (e) {
        setMsg(m => (m ? m + " | " : "") + `Failed to load modalities: ${e.message || e}`);
      }
    })();
  }, [API]);

  // ──────────────────────────────────────────────────────────────
  // 3) Build per-category options (only categories with options)
  // ──────────────────────────────────────────────────────────────
  const optsByCat = useMemo(() => {
    const buckets = {};
    rows.forEach(r => {
      const cat = catMap[r.icf_code] || "Other";
      const value = `${r.icf_code}::${r.ichi_code}`;
      const label = `${r.ichi_code} — ${r.ichi_name}  [${r.icf_code}]`;
      if (!buckets[cat]) buckets[cat] = new Map();
      if (!buckets[cat].has(value)) buckets[cat].set(value, { value, label });
    });

    const out = {};
    Object.entries(buckets).forEach(([k, m]) => {
      out[k] = Array.from(m.values()).sort((a,b)=>a.value.localeCompare(b.value));
    });
    return out;
  }, [rows, catMap]);

  // Order tabs: your preferred first, then alpha for any others present
  const catOrder = ["Neuropsych", "PT", "OT", "Other"];
  const tabKeys = useMemo(() => {
    const keys = Object.keys(optsByCat);
    return keys.sort((a,b) =>
      ((catOrder.indexOf(a) === -1 ? 99 : catOrder.indexOf(a)) -
       (catOrder.indexOf(b) === -1 ? 99 : catOrder.indexOf(b))) || a.localeCompare(b)
    );
  }, [optsByCat]);

  // Keep active tab valid
  useEffect(() => {
    if (!tabKeys.length) { setActiveCat(""); return; }
    setActiveCat(prev => (tabKeys.includes(prev) ? prev : tabKeys[0]));
  }, [tabKeys]);

  const msOptions = useMemo(
    () => (activeCat ? (optsByCat[activeCat] || []) : []),
    [activeCat, optsByCat]
  );

  // ────────────────────────────────────────────
  // 4) Emit summary when selections / note change
  // ────────────────────────────────────────────
useEffect(() => {
  const sel = rows
    .filter(r => selected.has(`${r.icf_code}::${r.ichi_code}`))
    .map(r => ({ icf_code: r.icf_code, ichi_code: r.ichi_code, ichi_name: r.ichi_name }));

  const mods = Array.from(modsSelected).map(v => {
    const o = modsOptions.find(x => x.value === v);
    const rangeId = rangeSelByMod[v] ?? null;
    const durId   = durSelByMod[v]   ?? null;
    const rangeLabel = rangeOpts.find(x => x.value === rangeId)?.label ?? "";
    const durLabel   = durationOpts.find(x => x.value === durId)?.label ?? "";
    return {
      value: v,
      label: o?.label ?? v,
      range_id: rangeId,
      range_label: rangeLabel,
      duration_id: durId,
      duration_label: durLabel
    };
  });

  // If your linter chokes on func?.(args), use the fallback below.
  if (typeof onSummaryChange === "function") {
    onSummaryChange({
      selected: sel,
      modalities: mods,
      note,
      assessments: assessSummary
    });
  }
}, [
  rows,
  selected,
  modsSelected,
  note,
  modsOptions,
  assessSummary,
  onSummaryChange,
  rangeSelByMod,
  durSelByMod,
  rangeOpts,
  durationOpts
]);

useEffect(() => {
  (async () => {
    try {
      const r = await getJSON(`${API}/treatment/ranges`);
      const d = await getJSON(`${API}/treatment/durations`);
      setRangeOpts(r || []);
      setDurationOpts(d || []);
    } catch (e) {
      setMsg(m => (m? m+" | " : "") + `Failed to load treatment lookups: ${e.message}`);
    }
  })();
}, [API]);
useEffect(() => {
  const ids = new Set(Array.from(modsSelected)); // modality_id strings
  setRangeSelByMod(prev => {
    const n = {...prev}; Object.keys(n).forEach(k => { if (!ids.has(k)) delete n[k]; }); return n;
  });
  setDurSelByMod(prev => {
    const n = {...prev}; Object.keys(n).forEach(k => { if (!ids.has(k)) delete n[k]; }); return n;
  });
}, [modsSelected]);


  // helpers
  const onNoteChange = (e) => setNote(e.target.value.slice(0, NOTE_MAX));
  const removeIchiChip = (val) => { const n = new Set(selected); n.delete(val); setSelected(n); };
  const removeModChip  = (val) => { const n = new Set(modsSelected); n.delete(val); setModsSelected(n); };

  return (
    <section className="card">
      {/* Header */}
            {/* Tabs */}
      {tabKeys.length > 0 ? (
        <div style={{display:"flex", gap:8, marginBottom:10, flexWrap:"wrap",backgroundColor:"#EEF6FF"}}>
          {tabKeys.map(k => (
            <button
              key={k}
              className={`btn ${activeCat===k ? "active" : ""}`}
              onClick={()=>setActiveCat(k)}
              disabled={busy}
            >
              {k} ({optsByCat[k]?.length || 0})
            </button>
          ))}
        </div>
      ) : (
        <div className="muted">No ICHI options available for this ICD.</div>
      )}
      <div className="cardheading">
      <div className="card-head">
        <h2 className="title">ICHI</h2>
        <button className="btn ai" title="AI mode (coming soon)" disabled>AI mode</button>
      </div>

      <p className="subtitle">
        ICD: <strong>{icdCode || "—"}</strong>
        {" · "}
        ICF (context): <strong>{icfCode || "— all relevant ICFs —"}</strong>
      </p>
</div>
      {msg && <div className="note">{msg}</div>}



      {/* Active tab's dropdown */}
      {activeCat && (
        <div className="row" style={{alignItems:"center"}}>
          <div className="label">ICHI — {activeCat}</div>
          <div>
            <MultiSelect
              options={msOptions}
              selected={selected}
              onChange={setSelected}
              placeholder={busy ? "Loading…" : `Select ${activeCat} ICHI…`}
              width={560}
            />
          </div>
        </div>
      )}

      {/* Selected ICHI chips */}
      {selected.size > 0 && (
        <div style={{display:"flex", gap:6, flexWrap:"wrap", margin:"8px 30px 6px"}}>
          {Array.from(selected).map(v => (
            <span key={v} className="chip">
              {v.split("::")[1]}
              <button className="chip-x" onClick={() => removeIchiChip(v)}>×</button>
            </span>
          ))}
          <button className="btn" onClick={()=>setSelected(new Set())}>Clear All</button>
        </div>
      )}
{/* NEW: Assessments driven by selected ICHI */}
<AssessmentsPanel
  apiBase={API}
  selectedIchiCodes={Array.from(selected).map(v => v.split("::")[1])}
  onSummaryChange={setAssessSummary}
/>
      {/* Modalities */}
      <div className="row" style={{alignItems:"center", marginTop: 8}}>
        <div className="label" style={{fontWeight:600}}>Pick Modalities</div>
        <div>
          <MultiSelect
            options={modsOptions}
            selected={modsSelected}
            onChange={setModsSelected}
            placeholder="Select Modalities…"
            width={560}
          />
        </div>
      </div>

      {/* Modalities chips */}
      {modsSelected.size > 0 && (
        <div style={{display:"flex", gap:6, flexWrap:"wrap", margin:"6px 0 6px",paddingLeft:"30px"}}>
          {Array.from(modsSelected).map(v => {
            const o = modsOptions.find(x => x.value === v);
            return (
              <span key={v} className="chip">
                {o?.label || v}
                <button className="chip-x" onClick={() => removeModChip(v)}>×</button>
              </span>
            );
          })}
          <button className="btn" onClick={()=>setModsSelected(new Set())}>Clear</button>
        </div>
      )}
{modsSelected.size > 0 && (
  <div className="box" style={{marginTop:8,paddingLeft:"30px",width:"50%",paddingBottom:40}}>
    <div className="box-title" style={{fontWeight:600}}>Treatment plan per modality</div>
    <div style={{display:"grid", gridTemplateColumns:"1fr 220px 240px", gap:8, alignItems:"center" , paddingTop:"20px"}}>
      <div className="label" style={{fontSize:14}}>Modality</div>
      <div className="label" style={{fontSize:14}}>Treatment Range</div>
      <div className="label" style={{fontSize:14}}>Treatment Duration</div>

      {Array.from(modsSelected).map(mid => {
        const m = modsOptions.find(x => x.value === mid);
        return (
          <React.Fragment key={mid}>
            <div><span className="badge">{mid}</span> {m?.label || mid}</div>

            <select className="input"
              value={rangeSelByMod[mid] ?? ""}
              onChange={e => setRangeSelByMod(s=>({...s, [mid]: e.target.value? Number(e.target.value): undefined}))}>
              <option value="">— Select —</option>
              {rangeOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            <select className="input"
              value={durSelByMod[mid] ?? ""}
              onChange={e => setDurSelByMod(s=>({...s, [mid]: e.target.value? Number(e.target.value): undefined}))}>
              <option value="">— Select —</option>
              {durationOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </React.Fragment>
        );
      })}
    </div>
  </div>
)}

      {/* Notes */}
      <div className="row" style={{alignItems:"flex-start"}}>
        <div className="label" style={{fontWeight:600}}>Clinical Note / Plan</div>
        <div>
          <textarea
            className="input ta"
            rows={5}
            placeholder="Write Notes, Rationale, Plan, or Observations…"
            value={note}
            onChange={onNoteChange}
            maxLength={NOTE_MAX}
            style={{minWidth: "560px"}}
          />
          <div className="hint">{note.length}/{NOTE_MAX}</div>
        </div>
      </div>

      {/* Optional compact list of selected ICHI */}
      {selected.size > 0 && (
        <ul className="flat" style={{marginTop:8}}>
          {rows
            .filter(r => selected.has(`${r.icf_code}::${r.ichi_code}`))
            .map((r, i) => (
              <li key={`${r.icf_code}-${r.ichi_code}-${i}`}>
                <strong>{r.ichi_code}</strong> — {r.ichi_name} <span className="dim">[{r.icf_code}]</span>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}

/* ---------------- Assessment & Encounter (SOAP) ---------------- */
function AssessmentEncounterTab({
  patientId,
  value,
  onChange,
  onSaved,
  /* NEW: fed from App() */
  icfOptions = [],
  ichiOptions = [],
  icdContext = ""
}) {
  const [form, setForm] = React.useState(
    value || { subjective: "", objective: "", assessment: "", plan: "", goals: [] }
  );
  const [history, setHistory] = React.useState([]);           // ← NEW
  const [status, setStatus] = React.useState("idle");         // ← was useState; fix hook
  const NOTE_MAX = 2000;
const LAST_UPDATED = "2025-08-21 09:45";
  // ---- STATIC GAS GOALS (read-only display) ----
  const GAS_GOALS = [
    {
      goal: "Occasional lapses (weekly)",
      icf_target: "b1101",
      ichi_action: "MUB.AA.ZZ · Assessment of muscle power functions",
      expected: "Muscle power stability"
    },
    {
      goal: "Smooth movement in ADL's",
      icf_target: "b749",
      ichi_action: "MUD.AA.ZZ · Assessment of muscle endurance",
      expected: "Smooth Muscle movements"
    },
    {
      goal: "MAS 2 marked increase",
      icf_target: "b7350",
      ichi_action: "MU2.AA.ZZ · Assessment of muscle functions",
      expected: "Proper Muscle movements"
    }
  ];
// ---- DUMMY PREVIOUS ASSESSMENTS ----
const PREVIOUS_ASSESSMENTS = [
  {
    date: "2025-08-10",
    subjective: "Patient reported occasional spasms after exertion.",
    objective: "MAS 1+ UE; vitals stable; ROM mildly restricted.",
    assessment: "Spasticity-related inefficiency; fair endurance.",
    plan: "Continue endurance training; review in 2 weeks.",
    goals: [
      { goal: "Reduce spasm frequency", icf_target: "b7350", ichi_action: "MU2.AA.ZZ", expected: "Fewer daily disruptions" }
    ]
  },
  {
    date: "2025-07-20",
    subjective: "Difficulty with ADLs in mornings.",
    objective: "Grip strength 24kg; 6MWT 380m.",
    assessment: "Strength improved; endurance moderate.",
    plan: "Home exercise + clinic sessions 3x/week.",
    goals: [
      { goal: "Independent dressing", icf_target: "d540", ichi_action: "VBA.AA.ZZ", expected: "No caregiver help 5/7 days" }
    ]
  }
];

  // Fallback sample history if API has no history endpoint
  const SAMPLE_HISTORY = [
    {
      id: "enc-2025-08-10",
      created_at: "2025-08-10T10:15:00Z",
      subjective: "C/o occasional spasms after exertion.",
      objective: "MAS 1+ UE; vitals stable; ROM mildly restricted.",
      assessment: "Spasticity-related movement inefficiency; fair endurance.",
      plan: "ICHI: MUD.AA.ZZ endurance training; review in 2 wks.",
      goals: [
        { goal: "Reduce spasm frequency", icf_target: "b7350", ichi_action: "MU2.AA.ZZ", expected: "Less daily disruption" }
      ]
    },
    {
      id: "enc-2025-07-20",
      created_at: "2025-07-20T09:40:00Z",
      subjective: "Difficulty with ADLs in mornings.",
      objective: "Grip strength 24kg; 6MWT 380m.",
      assessment: "Strength improved; endurance moderate.",
      plan: "Home exercise + clinic sessions 3x/week.",
      goals: [
        { goal: "Independent dressing", icf_target: "d540", ichi_action: "VBA.AA.ZZ", expected: "No caregiver help 5/7 days" }
      ]
    }
  ];

  // keep App state in sync
  React.useEffect(() => onChange?.(form), [form, onChange]);

  // load existing SOAP (+goals if present)
  React.useEffect(() => {
    if (!patientId) return;
    (async () => {
      try {
        const r = await fetch(`${API}/encounters/${encodeURIComponent(patientId)}`);
        if (r.ok) {
          const d = await r.json();
          setForm({
            subjective: d.subjective || "",
            objective: d.objective || "",
            assessment: d.assessment || "",
            plan: d.plan || "",
            goals: Array.isArray(d.goals) ? d.goals : []
          });
        }
      } catch {}
    })();
  }, [patientId]);

  // ← NEW: load previous assessments for this patient (if your API supports it)
  React.useEffect(() => {
    if (!patientId) return;
    (async () => {
      try {
        const r = await fetch(`${API}/encounters/${encodeURIComponent(patientId)}/history`);
        if (r.ok) {
          const arr = await r.json(); // expect array of past encounters (latest first or last)
          // Defensive: drop any object that looks identical to current form
          const past = Array.isArray(arr) ? arr.filter(e =>
            e.subjective !== form.subjective ||
            e.objective !== form.objective ||
            e.assessment !== form.assessment ||
            e.plan !== form.plan
          ) : [];
          setHistory(past.length ? past : SAMPLE_HISTORY);
        } else {
          setHistory(SAMPLE_HISTORY);
        }
      } catch {
        setHistory(SAMPLE_HISTORY);
      }
    })();
  }, [patientId]); // don't include `form` here to avoid looping

  // persist SOAP + goals
  const save = async () => {
    if (!patientId) return;
    try {
      await fetch(`${API}/encounters/${encodeURIComponent(patientId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      onSaved?.();
    } catch {}
  };

  // local helpers to mutate goals (if you later make them editable)
  const addGoal = () =>
    setForm(f => ({
      ...f,
      goals: [...(f.goals || []), { goal: "", icf_target: "", ichi_action: "", expected: "" }]
    }));

  const delGoal = (idx) =>
    setForm(f => ({ ...f, goals: (f.goals || []).filter((_, i) => i !== idx) }));

  const setGoalCell = (idx, patch) =>
    setForm(f => ({
      ...f,
      goals: (f.goals || []).map((g, i) => (i === idx ? { ...g, ...patch } : g))
    }));

  const labelFor = (val, list) => list.find(o => o.value === val)?.label || val || "—";

  // save button UX (kept your 2s minimum delay)
  const handleSave = async (e) => {
    e.preventDefault();
    if (status === "saving") return;

    setStatus("saving");
    const MIN_DELAY = 2000;
    const start = Date.now();

    try {
      await fetch(`${API}/encounters/${encodeURIComponent(patientId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const elapsed = Date.now() - start;
      if (elapsed < MIN_DELAY) {
        await new Promise(r => setTimeout(r, MIN_DELAY - elapsed));
      }
      setStatus("saved");
      onSaved?.();
    } catch {
      setStatus("idle");
    }
  };

  // Small helper to render a SOAP card (read-only for history)
  const ReadonlySoap = ({ enc, idx }) => {
    const [open, setOpen] = React.useState(idx === 0 ? true : false); // expand the most recent by default
    const dt = enc.created_at ? new Date(enc.created_at) : null;
    const title = dt
      ? `Previous Assessment — ${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`
      : `Previous Assessment`;

    return (
      <section className="card" style={{ opacity: 0.95 }}>
        <div className="soap-head" style={{ cursor: "pointer" }} onClick={() => setOpen(o => !o)}>
          <div className="soap-title">{title}</div>
          <span className="chip">{open ? "Hide" : "Show"}</span>
        </div>
        {open && (
          <>
            <div className="soap-grid">
              <div className="box soft">
                <div className="box-title">Subjective</div>
                <textarea className="input ta" rows={5} value={enc.subjective || ""} readOnly />
              </div>
              <div className="box soft">
                <div className="box-title">Objective</div>
                <textarea className="input ta" rows={5} value={enc.objective || ""} readOnly />
              </div>
              <div className="box soft">
                <div className="box-title">Assessment</div>
                <textarea className="input ta" rows={5} value={enc.assessment || ""} readOnly />
              </div>
              <div className="box soft">
                <div className="box-title">Plan</div>
                <textarea className="input ta" rows={5} value={enc.plan || ""} readOnly />
              </div>
            </div>

            {/* Goals snapshot if present */}
            {(enc.goals && enc.goals.length > 0) && (
              <div className="box soft" style={{ marginTop: 12, margin: "20px 25px" }}>
                <div className="box-title">GAS Goals (snapshot)</div>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{width:"32%"}}>Goal</th>
                      <th style={{width:"18%"}}>ICF target</th>
                      <th style={{width:"34%"}}>ICHI action</th>
                      <th>Expected outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enc.goals.map((g, i) => (
                      <tr key={i}>
                        <td>{g.goal || "—"}</td>
                        <td>{g.icf_target || "—"}</td>
                        <td>{g.ichi_action || "—"}</td>
                        <td>{g.expected || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </section>
    );
  };

  return (
    <section className="card">
      <div className="soap-head">

        <div className="soap-title">Assessment — <b>SOAP</b></div>
        <span className="chip soft">Clinical</span>
      </div>

      {/* SOAP fields (current) */}
      <div className="soap-grid">
        <div className="box soft">
          <div className="box-title">Subjective</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="Patient Complaint / History…" value={form.subjective}
            onChange={e => setForm(s => ({ ...s, subjective: e.target.value }))} />
        </div>

        <div className="box soft">
          <div className="box-title">Objective</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="Exam Findings, Vitals, Measurements…" value={form.objective}
            onChange={e => setForm(s => ({ ...s, objective: e.target.value }))} />
        </div>

        <div className="box soft">
          <div className="box-title">Assessment</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="Diagnosis / Clinical Impression…" value={form.assessment}
            onChange={e => setForm(s => ({ ...s, assessment: e.target.value }))} />
        </div>

        <div className="box soft">
          <div className="box-title">Plan</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="ICHI, Education, Reviews, Follow-up…" value={form.plan}
            onChange={e => setForm(s => ({ ...s, plan: e.target.value }))} />
        </div>
      </div>

      {/* ===== STATIC GAS GOALS (read-only) ===== */}
      <div className="box soft" style={{ marginTop: 12 , margin:"20px 25px" }}>
        <div className="box-title">Present GAS Goals</div>
        <table className="table">
          <thead>
            <tr>
              <th style={{width:"32%"}}>Goal</th>
              <th style={{width:"18%"}}>ICF target</th>
              <th style={{width:"34%"}}>ICHI action</th>
              <th>Expected outcome</th>
            </tr>
          </thead>
          <tbody>
            {GAS_GOALS.map((g, i) => (
              <tr key={i}>
                <td>{g.goal}</td>
                <td>{g.icf_target}</td>
                <td>{g.ichi_action}</td>
                <td>{g.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="muted" style={{marginTop:6}}>
          Note: These are fixed reference goals for quick review; they are not editable here.
        </div>
      </div>
      {/* ===== END STATIC GAS GOALS ===== */}
        <div
  className="actionbar"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    margin: "0 20px 8px 20px",
  }}
>
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <button
      className="btn topbtn"
      style={{
       
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
      onClick={() => {/* TODO: open follow-up booking */}}
    >
      <Calendar className="svg-icon "size={16} />
      Book Follow-up
    </button>

    <button className="btn topbtn" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <FlaskConical className="svg-icon" size={16} />
      Order Investigations
    </button>

    <button className="btn topbtn" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Settings  className="svg-icon" size={16} />
      Start TPS
    </button>

    <button className="btn topbtn" style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <SquareCheckBig className="svg-icon" size={16} />
      Add to RAP
    </button>
  </div>

  <div className="dim" style={{ fontSize: 12 }}>
    Chart last updated: <b>{LAST_UPDATED}</b>
  </div>
</div>
      <div className="actions">

<button
  className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`}
  style={{ margin: "20px" }}
  type="button"
  onClick={handleSave}
  disabled={status === "saving"}   // ← removed `|| !patientId`
  aria-busy={status === "saving"}
>
  {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save"}
</button>

      </div>

{/* ===== PREVIOUS ASSESSMENTS (dummy) ===== */}
{PREVIOUS_ASSESSMENTS.map((enc, idx) => (
  <section key={idx} className="card" style={{ marginTop: 16, opacity: 0.95 }}>
    <div className="soap-head">
      <div className="soap-title">
        Assessment — {enc.date}
      </div>
      <span className="chip soft">Read-only</span>
    </div>

    <div className="soap-grid">
      <div className="box soft">
        <div className="box-title">Subjective</div>
        <textarea className="input ta" rows={4} value={enc.subjective} readOnly />
      </div>
      <div className="box soft">
        <div className="box-title">Objective</div>
        <textarea className="input ta" rows={4} value={enc.objective} readOnly />
      </div>
      <div className="box soft">
        <div className="box-title">Assessment</div>
        <textarea className="input ta" rows={4} value={enc.assessment} readOnly />
      </div>
      <div className="box soft">
        <div className="box-title">Plan</div>
        <textarea className="input ta" rows={4} value={enc.plan} readOnly />
      </div>
    </div>

    {enc.goals?.length > 0 && (
      <div className="box soft" style={{ margin: "12px 25px" }}>
        <div className="box-title">GAS Goals (snapshot)</div>
        <table className="table">
          <thead>
            <tr>
              <th style={{width:"32%"}}>Goal</th>
              <th style={{width:"18%"}}>ICF target</th>
              <th style={{width:"34%"}}>ICHI action</th>
              <th>Expected outcome</th>
            </tr>
          </thead>
          <tbody>
            {enc.goals.map((g, i) => (
              <tr key={i}>
                <td>{g.goal}</td>
                <td>{g.icf_target}</td>
                <td>{g.ichi_action}</td>
                <td>{g.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
))}

    </section>
  );
}

function VitalsTab({ patientId, encounterId, onSaved }) {
  const NOTE_MAX = 1000;

  // --- helpers ---
  const toLocalDT = (d = new Date()) =>
    new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  const n = (v) => (v === "" || v === null ? "" : Number(v));
  const calcMAP = (sys, dia) =>
    sys !== "" && dia !== "" ? Math.round((Number(sys) + 2 * Number(dia)) / 3) : "";
  const calcBMI = (cm, kg) => {
    if (cm === "" || kg === "") return "";
    const m = Number(cm) / 100;
    return m > 0 ? Number(kg) / (m * m) : "";
  };

  // --- state (single form) ---
  const [v, setV] = React.useState({
    // baseline
    ts: toLocalDT(),
    position: "sitting",
    hr_bpm: "",
    bp_sys: "",
    bp_dia: "",
    map: "",
    rr_bpm: "",
    spo2_pct: "",
    o2_flow_lpm: "",
    temp_c: "",
    temp_method: "oral",
    pain_0_10: "",
    rpe_0_10: "",
    // orthostatics
    o_sup_hr: "", o_sup_sys: "", o_sup_dia: "",
    o_sit_hr: "", o_sit_sys: "", o_sit_dia: "",
    o_std_hr: "", o_std_sys: "", o_std_dia: "",
    // exercise peak/recovery
    peak_hr: "", peak_spo2: "", peak_rpe: "",
    rec1_hr: "", rec1_spo2: "",
    rec3_hr: "", rec3_spo2: "",
    // anthropometrics
    height_cm: "", weight_kg: "", bmi: "",
    // device/quality
    device: "", site_bp: "", cuff_size: "", site_spo2: "",
    notes: ""
  });

  // --- derived fields ---
  React.useEffect(() => {
    setV((p) => ({ ...p, map: calcMAP(p.bp_sys, p.bp_dia) }));
  }, [v.bp_sys, v.bp_dia]);

  React.useEffect(() => {
    setV((p) => ({ ...p, bmi: calcBMI(p.height_cm, p.weight_kg) }));
  }, [v.height_cm, v.weight_kg]);

  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));

  // --- save ---
  const [status, setStatus] = React.useState("idle");
  const save = async () => {
    if (!patientId) return;
    setStatus("saving");

    const payload = {
      patient_id: patientId,
      encounter_id: encounterId || null,
      vitals: {
        ts: new Date(v.ts).toISOString(),
        position: v.position,
        hr_bpm: n(v.hr_bpm),
        bp: { sys: n(v.bp_sys), dia: n(v.bp_dia), map: n(v.map), site: v.site_bp, cuff: v.cuff_size },
        rr_bpm: n(v.rr_bpm),
        spo2_pct: n(v.spo2_pct),
        o2_flow_lpm: v.o2_flow_lpm === "" ? null : n(v.o2_flow_lpm),
        temp_c: v.temp_c === "" ? null : n(v.temp_c),
        temp_method: v.temp_method,
        pain_0_10: v.pain_0_10 === "" ? null : n(v.pain_0_10),
        rpe_0_10: v.rpe_0_10 === "" ? null : n(v.rpe_0_10)
      },
      orthostatics: {
        supine:   { hr_bpm: n(v.o_sup_hr), sys: n(v.o_sup_sys), dia: n(v.o_sup_dia) },
        sitting:  { hr_bpm: n(v.o_sit_hr), sys: n(v.o_sit_sys), dia: n(v.o_sit_dia) },
        standing: { hr_bpm: n(v.o_std_hr), sys: n(v.o_std_sys), dia: n(v.o_std_dia) }
      },
      exercise: {
        peak: { hr_bpm: n(v.peak_hr), spo2_pct: n(v.peak_spo2), rpe_0_10: v.peak_rpe === "" ? null : n(v.peak_rpe) },
        recovery: {
          t1m: { hr_bpm: n(v.rec1_hr), spo2_pct: n(v.rec1_spo2) },
          t3m: { hr_bpm: n(v.rec3_hr), spo2_pct: n(v.rec3_spo2) }
        }
      },
      anthro: {
        height_cm: v.height_cm === "" ? null : n(v.height_cm),
        weight_kg: v.weight_kg === "" ? null : n(v.weight_kg),
        bmi: v.bmi === "" ? null : Number(v.bmi.toFixed ? v.bmi : n(v.bmi))
      },
      device: v.device,
      site_spo2: v.site_spo2,
      notes: v.notes
    };

    try {
      // Adjust endpoint to your API; following your pattern of using global `API`
      const r = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/vitals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error("save failed");
      setStatus("saved");
      onSaved?.();
      setTimeout(() => setStatus("idle"), 1500);
    } catch (e) {
      console.error(e);
      setStatus("idle");
      alert("Failed to save vitals.");
    }
  };

return (
  <section className="card vitals">
    <div className="cardheading"><h2 className="title">Vitals — Rehab Capture</h2></div>

    {/* BASELINE */}
    <div className="section" style={{margin:"12px 20px"}}>
      <div className="grid" style={{alignItems:"end"}}>
        <div className="field" style={{gridColumn:"span 3"}}>
          <div className="label-sm">Time</div>
          <div className="control">
            <input type="datetime-local" className="input-sm" value={v.ts} onChange={set("ts")} />
          </div>
        </div>

        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Position</div>
          <select className="select-sm" value={v.position} onChange={set("position")}>
            <option>sitting</option><option>standing</option><option>supine</option>
          </select>
        </div>

        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">HR (bpm)</div>
          <div className="control">
            <input type="number" className="input-sm num" value={v.hr_bpm} onChange={set("hr_bpm")} />
          </div>
        </div>

        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">RR (bpm)</div>
          <input type="number" className="input-sm num" value={v.rr_bpm} onChange={set("rr_bpm")} />
        </div>

        <div className="field" style={{gridColumn:"span 1"}}>
          <div className="label-sm">SpO₂ (%)</div>
          <input type="number" className="input-sm num" value={v.spo2_pct} onChange={set("spo2_pct")} />
        </div>

        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">O₂ flow (L/min)</div>
          <input type="number" step="0.1" className="input-sm num" value={v.o2_flow_lpm} onChange={set("o2_flow_lpm")} />
        </div>
      </div>

      <div className="grid" style={{marginTop:10, alignItems:"end"}}>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">BP systolic</div>
          <input type="number" className="input-sm num" value={v.bp_sys} onChange={set("bp_sys")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">BP diastolic</div>
          <input type="number" className="input-sm num" value={v.bp_dia} onChange={set("bp_dia")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">MAP (auto)</div>
          <input className="input-sm num" value={v.map} readOnly />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">BP site</div>
          <input className="input-sm" placeholder="Left Arm" value={v.site_bp} onChange={set("site_bp")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">BP cuff</div>
          <input className="input-sm" placeholder="Adult / Large" value={v.cuff_size} onChange={set("cuff_size")} />
        </div>

        <div className="right" style={{gridColumn:"span 2"}}>
          <button className="btn btn-link" onClick={() => setV(p => ({...p, ts: toLocalDT()}))}>Now</button>
          <div className="chip-info">Last edited auto-saves on Save</div>
        </div>
      </div>

      <div className="grid" style={{marginTop:10}}>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Temp (°C)</div>
          <input type="number" step="0.1" className="input-sm num" value={v.temp_c} onChange={set("temp_c")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Method</div>
          <select className="select-sm" value={v.temp_method} onChange={set("temp_method")}>
            <option>Oral</option><option>Tympanic</option><option>Axillary</option><option>Rectal</option>
          </select>
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Pain (0–10)</div>
          <input type="number" min="0" max="10" className="input-sm num" value={v.pain_0_10} onChange={set("pain_0_10")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">RPE (0–10)</div>
          <input type="number" min="0" max="10" className="input-sm num" value={v.rpe_0_10} onChange={set("rpe_0_10")} />
        </div>
      </div>
    </div>

    {/* ORTHOSTATICS */}
    <div className="section" style={{margin:"12px 20px"}}>
      <div className="box-title" style={{marginBottom:6}}>Orthostatics (HR & BP)</div>

      <table className="vtable">
        <thead>
          <tr>
            <th className="right" style={{textAlign:"left"}}>Position</th>
            <th>HR (bpm)</th><th>Sys</th><th>Dia</th>
          </tr>
        </thead>
      </table>

      <div className="vrow">
        <div className="pos">Supine</div>
        <input type="number" className="input-sm num" value={v.o_sup_hr} onChange={set("o_sup_hr")} />
        <input type="number" className="input-sm num" value={v.o_sup_sys} onChange={set("o_sup_sys")} />
        <input type="number" className="input-sm num" value={v.o_sup_dia} onChange={set("o_sup_dia")} />
      </div>
      <div className="vrow">
        <div className="pos">Sitting</div>
        <input type="number" className="input-sm num" value={v.o_sit_hr} onChange={set("o_sit_hr")} />
        <input type="number" className="input-sm num" value={v.o_sit_sys} onChange={set("o_sit_sys")} />
        <input type="number" className="input-sm num" value={v.o_sit_dia} onChange={set("o_sit_dia")} />
      </div>
      <div className="vrow">
        <div className="pos">Standing</div>
        <input type="number" className="input-sm num" value={v.o_std_hr} onChange={set("o_std_hr")} />
        <input type="number" className="input-sm num" value={v.o_std_sys} onChange={set("o_std_sys")} />
        <input type="number" className="input-sm num" value={v.o_std_dia} onChange={set("o_std_dia")} />
      </div>
    </div>

    {/* EXERCISE SESSION */}
    <div className="section" style={{margin:"12px 20px"}}>
      <div className="box-title" style={{marginBottom:6}}>Exercise Session — Peak & Recovery</div>
      <div className="grid">
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Peak HR</div>
          <input type="number" className="input-sm num" value={v.peak_hr} onChange={set("peak_hr")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Peak SpO₂</div>
          <input type="number" className="input-sm num" value={v.peak_spo2} onChange={set("peak_spo2")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Peak RPE</div>
          <input type="number" min="0" max="10" className="input-sm num" value={v.peak_rpe} onChange={set("peak_rpe")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">HR @ 1 min</div>
          <input type="number" className="input-sm num" value={v.rec1_hr} onChange={set("rec1_hr")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">SpO₂ @ 1 min</div>
          <input type="number" className="input-sm num" value={v.rec1_spo2} onChange={set("rec1_spo2")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}} />
      </div>

      <div className="grid" style={{marginTop:10}}>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">HR @ 3 min</div>
          <input type="number" className="input-sm num" value={v.rec3_hr} onChange={set("rec3_hr")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">SpO₂ @ 3 min</div>
          <input type="number" className="input-sm num" value={v.rec3_spo2} onChange={set("rec3_spo2")} />
        </div>
      </div>
    </div>

    {/* ANTHROPOMETRICS + NOTES */}
    <div className="section" style={{margin:"12px 20px"}}>
      <div className="box-title" style={{marginBottom:6}}>Anthropometrics & Notes</div>
      <div className="grid">
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Height (cm)</div>
          <input type="number" step="0.1" className="input-sm num" value={v.height_cm} onChange={set("height_cm")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">Weight (kg)</div>
          <input type="number" step="0.1" className="input-sm num" value={v.weight_kg} onChange={set("weight_kg")} />
        </div>
        <div className="field" style={{gridColumn:"span 2"}}>
          <div className="label-sm">BMI (auto)</div>
          <input className="input-sm num" value={v.bmi === "" ? "" : Number(v.bmi).toFixed(1)} readOnly />
        </div>
        <div className="field" style={{gridColumn:"span 3"}}>
          <div className="label-sm">Device</div>
          <input className="input-sm" value={v.device} onChange={set("device")} placeholder="Welch Allyn Connex 6000" />
        </div>
        <div className="field" style={{gridColumn:"span 3"}}>
          <div className="label-sm">SpO₂ site</div>
          <input className="input-sm" value={v.site_spo2} onChange={set("site_spo2")} placeholder="finger / ear" />
        </div>
        <div className="field" style={{gridColumn:"span 12"}}>
          <div className="label-sm">Notes</div>
          <textarea className="ta-sm" rows={3} maxLength={NOTE_MAX} value={v.notes} onChange={set("notes")}
            placeholder="e.g., arrhythmia detected, movement artifact, cuff mismatch" />
        </div>
      </div>
    </div>
<div className="cardheading"><h2 className="title">
  Allergic To </h2></div>
    {/* Allergy allerts*/}
    <div className="section" style={{margin:"12px 20px"}}>
      <div className="box-title" style={{marginBottom:6}}>Allergic Reactions to </div>
      <div className="grid">



        <div className="field" style={{gridColumn:"span 12"}}>
          <div className="label-sm">Mention to which the Patient feels allergic reactions for </div>
          <textarea className="ta-sm" rows={3} maxLength={NOTE_MAX} value={v.notes} onChange={set("notes")}
            placeholder="e.g., Eating Brinjal" />
        </div>
      </div>
    </div>




    {/* ACTIONS */}
    <div className="actions" style={{ display:"flex", gap:10, margin:"10px 20px 20px", justifyContent:"flex-end" }}>
      <button className="btn" onClick={() => setV(p => ({...p, ts: toLocalDT()}))}>Set time to Now</button>
      <button className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`} onClick={save} disabled={status === "saving"}>
        {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save"}
      </button>
    </div>
  </section>
);
}


function NewAssessmentTab({
  patientId,
  value,
  onChange,
  onSaved,
  /* NEW: fed from App() */
  icfOptions = [],
  ichiOptions = [],
  icdContext = ""
}) {
  const [form, setForm] = React.useState(
    value || { subjective: "", objective: "", assessment: "", plan: "", goals: [] }
  );
  const NOTE_MAX = 2000;

  // ---- STATIC GAS GOALS (read-only display) ----
  // ---- STATIC GAS GOALS (read-only display) ----
  return (      
    <section className="card">
    <div className="soap-head">
        <div className="soap-title">Initial Assessment — <b>SOAP</b></div>
        <span className="chip soft">Clinical</span>
      </div>
<div className="soap-grid">
        <div className="box soft">
          <div className="box-title">Subjective</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="Patient complaint / history…" value={form.subjective}
            onChange={e => setForm(s => ({ ...s, subjective: e.target.value }))} />
        </div>

        <div className="box soft">
          <div className="box-title">Objective</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="Exam findings, vitals, measurements…" value={form.objective}
            onChange={e => setForm(s => ({ ...s, objective: e.target.value }))} />
        </div>

        <div className="box soft">
          <div className="box-title">Assessment</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="Diagnosis / clinical impression…" value={form.assessment}
            onChange={e => setForm(s => ({ ...s, assessment: e.target.value }))} />
        </div>
<div className="box soft">
          <div className="box-title">Plan</div>
          <textarea className="input ta" rows={5} maxLength={NOTE_MAX}
            placeholder="ICHI, education, reviews, follow-up…" value={form.plan}
            onChange={e => setForm(s => ({ ...s, plan: e.target.value }))} />
        </div>
        
      </div> </section>)}



/* ---------------- Task Performance Simulation (TPS) ---------------- */
function TaskPerformanceSimulationTab({ patientId, value, onChange, onSaved }) {
  const DEMANDS = ["Seldom", "Occasional", "Frequent"];
  const [status, setStatus] = useState("idle"); // idle | saving | saved
  const [jobDemandBased, setJobDemandBased] = React.useState(value?.jobDemandBased ?? true);
  const [rows, setRows] = React.useState(
    value?.rows || [
      { task: "Lift 10 kg crate (floor-table)", demand: "Occasional", result: "Completed with mild pain", pass: "Yes" },
      { task: "Overhead reach 1 min", demand: "Frequent", result: "Requires pacing / brief rest", pass: "Yes" },
      { task: "Climb ladder 3 rungs", demand: "Seldom", result: "Not attempted — safety", pass: "No" }
    ]
  );
  const [evidence, setEvidence] = React.useState(
    value?.evidence || "Video evidence attached for lift task; HR to review for fit-to-task mapping."
  );

  React.useEffect(() => {
    if (!patientId) return;
    (async () => {
      try {
        const r = await fetch(`${API}/tps/${encodeURIComponent(patientId)}`);
        if (r.ok) {
          const d = await r.json();
          setJobDemandBased(!!d.jobDemandBased);
          setRows(d.rows || []);
          setEvidence(d.evidence || "");
        }
      } catch {}
    })();
  }, [patientId]);

  React.useEffect(() => onChange?.({ jobDemandBased, rows, evidence }), [jobDemandBased, rows, evidence, onChange]);

  const addRow = () => setRows(r => [...r, { task: "", demand: "Occasional", result: "", pass: "Yes" }]);
  const delRow = (i) => setRows(r => r.filter((_, idx) => idx !== i));
  const setCell = (i, patch) => setRows(r => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)));

  const save = async () => {
    if (!patientId) return;
    try {
      await fetch(`${API}/tps/${encodeURIComponent(patientId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDemandBased, rows, evidence })
      });
      onSaved?.(); // add to audit trail
    } catch {
      // optionally toast
    }
  };
const handleSave = async (e) => {
    e.preventDefault();
    if (status === "saving") return;

    setStatus("saving");

    const MIN_DELAY = 2000; // 2s (set 3000 for ~3s)
    const start = Date.now();

    try {
      // TODO: call your real API here
      // await api.save(payload);
      await new Promise(r => setTimeout(r, 300)); // simulated fast save

      const elapsed = Date.now() - start;
      if (elapsed < MIN_DELAY) {
        await new Promise(r => setTimeout(r, MIN_DELAY - elapsed));
      }

      setStatus("saved");
      
    } catch (e2) {
      setStatus("idle"); // or keep saved/error as you prefer
    }
  };
  return (
    <section className="card">
      <div className="tps-head">
        <div className="soap-title">Task Performance Simulation (TPS)</div>
        <span className="btn tiny" title="toggle">{jobDemandBased ? "Job-demand based" : "Not job-demand based"}</span>
      </div>

      <div className="box soft">
        <table className="table">
          <thead>
            <tr>
              <th style={{width:"38%"}}>Task</th>
              <th style={{width:"16%"}}>Job demand</th>
              <th>Observed result</th>
              <th style={{width:"10%"}}>Pass</th>
              <th style={{width:"6%"}}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>
                  <input className="input" value={r.task} onChange={e=>setCell(i,{task:e.target.value})} />
                </td>
                <td>
                  <select className="input" value={r.demand} onChange={e=>setCell(i,{demand:e.target.value})}>
                    {DEMANDS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </td>
                <td>
                  <input className="input" value={r.result} onChange={e=>setCell(i,{result:e.target.value})} />
                </td>
                <td>
                  <select className="input" value={r.pass} onChange={e=>setCell(i,{pass:e.target.value})}>
                    <option>Yes</option><option>No</option>
                  </select>
                </td>
                <td><button className="ms-mini" onClick={()=>delRow(i)} title="Remove">✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="actions">
          <button className="btn" onClick={addRow}>Add task</button>
        </div>
      </div>

      <div className="box soft">
        <div className="box-title">Summary & Evidence</div>
        <textarea
          className="input ta"
          rows={4}
          value={evidence}
          onChange={e=>setEvidence(e.target.value)}
          placeholder="Notes, links to videos, HR review points…"
        />
      </div>

<div className="actions">
      <button
        className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`}
        style={{ margin: "20px" }}
        type="button"          // use "button" so form doesn't auto-submit
        onClick={handleSave}
        disabled={status === "saving"}
        aria-busy={status === "saving"}
      >
        {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save"}
      </button>
    </div>
    </section>
  );
}


/* ---------------- RAP • Case & RTW ---------------- */
function RAPTab({ data, onChange, onSave }) {
  const toggle = (k) =>
    onChange({
      ...data,
      checks: { ...data.checks, [k]: !data.checks[k] }
    });

  const setField = (k, v) => onChange({ ...data, [k]: v });
const [status, setStatus] = useState("idle"); // idle | saving | saved
  const total = 6;
  const done = Object.values(data.checks).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);
const handleSave = async (e) => {
    e.preventDefault();
    if (status === "saving") return;

    setStatus("saving");

    const MIN_DELAY = 2000; // 2s (set 3000 for ~3s)
    const start = Date.now();

    try {
      // TODO: call your real API here
      // await api.save(payload);
      await new Promise(r => setTimeout(r, 300)); // simulated fast save

      const elapsed = Date.now() - start;
      if (elapsed < MIN_DELAY) {
        await new Promise(r => setTimeout(r, MIN_DELAY - elapsed));
      }

      setStatus("saved");
      
    } catch (e2) {
      setStatus("idle"); // or keep saved/error as you prefer
    }
  };
  return (
    <section className="card rap-wrap">
      <div className="rap-header">
        <h2 className="title">RAP • Case & RTW</h2>
        <span className="pill right">CARF aligned</span>
      </div>

      {/* Readiness checklist */}
      <div className="box rap-card">
        <div className="box-title">Readiness to Work (RTW)</div>

        <div className="check-grid">
          <label className="check"><input type="checkbox" checked={data.checks.tps} onChange={()=>toggle("tps")}/> TPS completed (evidence)</label>
          <label className="check"><input type="checkbox" checked={data.checks.med} onChange={()=>toggle("med")}/> Medical clearance</label>
          <label className="check"><input type="checkbox" checked={data.checks.workplace} onChange={()=>toggle("workplace")}/> Workplace modification plan</label>
          <label className="check"><input type="checkbox" checked={data.checks.vocational} onChange={()=>toggle("vocational")}/> Vocational retraining plan</label>
          <label className="check"><input type="checkbox" checked={data.checks.family} onChange={()=>toggle("family")}/> Family readiness/support</label>
          <label className="check"><input type="checkbox" checked={data.checks.employer} onChange={()=>toggle("employer")}/> Employer commitment/placement</label>
        </div>

        <div className="progress-row">
          <div className="label">Computed Readiness</div>
          <div className="progress">
            <div className="bar" style={{width: `${pct}%`}} />
          </div>
          <div className="pct">{pct}%</div>
        </div>
      </div>

      {/* Light-Duty Proposal */}
      <div className="box rap-card">
        <div className="box-title">Light-Duty Proposal</div>

        <div className="rap-form">
          <div className="row">
            <div className="label">Start date</div>
            <input className="input" type="date"
              value={data.start_date}
              onChange={e=>setField("start_date", e.target.value)}
            />
          </div>

          <div className="row">
            <div className="label">Duration (weeks)</div>
            <select className="input"
              value={data.duration_weeks}
              onChange={e=>setField("duration_weeks", Number(e.target.value))}>
              {Array.from({length:12}, (_,i)=>i+1).map(n=>(
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="label">Placement</div>
            <select className="input"
              value={data.placement}
              onChange={e=>setField("placement", e.target.value)}>
              <option>Light assembly / QC</option>
              <option>Clerical / front desk</option>
              <option>Inventory (no lifting)</option>
              <option>Adjusted workstation</option>
            </select>
          </div>

          <div className="row" style={{alignItems:"start"}}>
            <div className="label">Restrictions & accommodations</div>
            <textarea
              className="input ta"
              rows={4}
              value={data.restrictions}
              onChange={e=>setField("restrictions", e.target.value)}
              placeholder="e.g., No lifting >10kg; avoid ladder work; adjustable workstation"
            />
          </div>
        </div>

        {/* <div className="actions">
          <button className="btn savebtn" onClick={onSave}>Save</button>
        </div> */}
<div className="actions">
      <button
        className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`}
        style={{ margin: "20px" }}
        type="button"          // use "button" so form doesn't auto-submit
        onClick={handleSave}
        disabled={status === "saving"}
        aria-busy={status === "saving"}
      >
        {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save"}
      </button>
    </div>

      </div>

      {/* CARF - Closure Criteria */}
      <div className="box rap-card">
        <div className="box-title">CARF-Closure Criteria</div>

        <li>Suitable employment secured / return to original job with accommodations</li>
        <li>30/60/90 day sustainability checks documented</li>
        <li>Residual barriers addressed; follow-up plan in place</li>
      </div>






    </section>
  );
}


/* ---------------- Documents ---------------- */
function DocumentsTab({ patientId }) {
  const [rows, setRows] = React.useState([]); // [{name,date,url}]

  // Place these three files under: frontend /public/docs/
  // e.g., public/docs/Intial Assessment.pdf
  const STATIC_DOCS = React.useMemo(() => ([
    {
      name: "Intial Assessment.pdf",
      date: "25-08-2025",
      url: "/docs/Intial%20Assessment.pdf"
    },
    {
      name: "Petient-Flow_EMR_TPS.docs",
      date: "22-08-2025",
      url: "/docs/Petient-Flow_EMR_TPS.pdf"
    },
    {
      name: "TPS Session.mp4",
      date: "20-08-2025",
      url: "/docs/TPS%20Session.mkv"
    }
  ]), []);

  const dedupeByName = React.useCallback((list) => {
    const seen = new Set();
    return list.filter(r => {
      const key = (r?.name || "").toLowerCase().trim();
      if (!key) return false;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const load = React.useCallback(async () => {
    let dynamic = [];
    if (patientId) {
      try {
        const r = await fetch(`${API}/documents/${encodeURIComponent(patientId)}`);
        if (r.ok) {
          const data = await r.json();
          // normalize dynamic rows to always have name/date/url fields
          dynamic = (Array.isArray(data) ? data : []).map(it => ({
            name: it.name || it.filename || "file",
            date: it.date || it.created || "—",
            url: it.url || it.link || ""
          }));
        }
      } catch {}
    }
    // Merge static + dynamic and de-dupe by filename
    setRows(dedupeByName([...STATIC_DOCS, ...dynamic]));
  }, [patientId, STATIC_DOCS, dedupeByName]);

  React.useEffect(() => { load(); }, [load]);

  const onDrop = async (e) => {
    e.preventDefault();
    if (!patientId) return;
    const files = e.dataTransfer.files;
    if (!files?.length) return;
    const fd = new FormData();
    [...files].forEach(f => fd.append("files", f));
    await fetch(`${API}/documents/${encodeURIComponent(patientId)}/upload`, { method:"POST", body: fd }).catch(()=>{});
    load();
  };

  const onPick = async (e) => {
    if (!patientId) return;
    const files = e.target.files;
    if (!files?.length) return;
    const fd = new FormData();
    [...files].forEach(f => fd.append("files", f));
    await fetch(`${API}/documents/${encodeURIComponent(patientId)}/upload`, { method:"POST", body: fd }).catch(()=>{});
    load();
  };

  const sample = async () => {
    // optional helper to seed demo files from API (static docs stay regardless)
    if (!patientId) return;
    await fetch(`${API}/documents/${encodeURIComponent(patientId)}/sample`, { method:"POST" }).catch(()=>{});
    load();
  };

  return (
    <section className="card">
      <div className="box soft" style={{margin:"20px"}}>
        <div className="doc-head">
          <div className="box-title">Documents</div>
          <button className="ms-mini" onClick={sample} disabled={!patientId}>Sample Files</button>
        </div>

        <table className="table doc" style={{marginTop:"20px"}}>
          <thead>
            <tr>
              <th>File</th>
              <th style={{width:"18%"}}>Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}>
                <td>
                  {r.url
                    ? <a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a>
                    : r.name}
                </td>
                <td>{r.date || "—"}</td>
              </tr>
            ))}
            {rows.length===0 && (
              <tr><td colSpan={2} className="muted">No files yet.</td></tr>
            )}
          </tbody>
        </table>

        <div className="dropzone"
             onDragOver={e=>e.preventDefault()}
             onDrop={onDrop}>
          Drop files here to upload
          <input type="file" multiple onChange={onPick} style={{display:"none"}} id="doc-pick"/>
          <label htmlFor="doc-pick" className="ms-mini" style={{marginLeft:8, cursor:"pointer"}}>or Choose</label>
        </div>
      </div>
    </section>
  );
}


/* ---------------- Audit Trail ---------------- */
/* ---------------- Audit Trail (STATIC, always show fixed entries) ---------------- */
function AuditTrailTab() {
  // Helper: parse "DD-MM-YY HH:mm" into a Date (assumes 20YY)
  const parseDMYhm = (s) => {
    const m = s.match(/^(\d{2})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/);
    if (!m) return new Date(NaN);
    const [, dd, mm, yy, HH, MM] = m;
    const year = 2000 + Number(yy);
    return new Date(year, Number(mm) - 1, Number(dd), Number(HH), Number(MM));
  };

  // Static, fixed entries (order will be re-sorted desc by time)
  const staticRows = [
    { ts: parseDMYhm("25-08-25 12:15"), action: "Patient New Scanned Documents Added" },
    { ts: parseDMYhm("25-08-25 10:25"), action: "RTW/Light-Duty proposal updated" },
    { ts: parseDMYhm("25-08-25 10:06"), action: "GAS Goals Updated" },
    { ts: parseDMYhm("25-08-25 09:57"), action: "New Task Performance Created" },
    { ts: parseDMYhm("25-08-25 09:45"), action: "ICF Goals Updated" },
  ]
  // sort desc (newest first)
  .filter(r => !isNaN(r.ts))
  .sort((a, b) => b.ts - a.ts);

  // group by day for timeline
  const byDay = staticRows.reduce((acc, r) => {
    const key = r.ts.toLocaleDateString();
    (acc[key] ||= []).push(r);
    return acc;
  }, {});

  const fmt = (d) =>
    d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section className="card audit-wrap">
      <div className="cardheading">
        <h2 className="title">Audit Trail</h2>
        
        {/* Mode toggle removed intentionally to force timeline forever */}
      </div>

      {/* Always show timeline */}
      <div className="audit-timeline">
        {Object.entries(byDay).map(([day, list]) => (
          <div className="audit-day" key={day}>
            <span className="date-badge">{day}</span>
            {list.map((r, i) => (
              <div className="audit-item" key={i}>
                <span className="dot" />
                <div className="when">{fmt(r.ts)}</div>
                <div className="what">{r.action}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}





function AssessmentsPanel({ apiBase, selectedIchiCodes, onSummaryChange }) {
  // assessments available for the selected ICHI (deduped by name)
  const [assessments, setAssessments] = React.useState([]);           // ["MMT", ...]
  // inputs per assessment
  const [inputsByAssess, setInputsByAssess] = React.useState({});     // { "MMT": [ {input, range, min, max} ] }
  // selected inputs per assessment
  const [selInputs, setSelInputs] = React.useState({});               // { "MMT": Set(["Right Upper Limb", ...]) }
  // score chosen per (assessment|input)
  const [scores, setScores] = React.useState({});                     // { "MMT|Right Upper Limb": 3 }
  const [msg, setMsg] = React.useState("");

  const getJSON = async (u) => {
    const r = await fetch(u);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  };

  // dedupe + load assessments whenever ICHI selection changes
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setMsg("");
        const names = new Set();
        for (const code of selectedIchiCodes) {
          const list = await getJSON(`${apiBase}/assessments/by-ichi/${encodeURIComponent(code)}`);
          list.forEach(n => names.add(n));
        }
        if (cancelled) return;
        const arr = Array.from(names).sort();
        setAssessments(arr);

        // preload inputs for each assessment (once)
        const nextInputs = {};
        for (const name of arr) {
          const items = await getJSON(`${apiBase}/assessments/inputs/${encodeURIComponent(name)}`);
          nextInputs[name] = items;
        }
        if (cancelled) return;
        setInputsByAssess(nextInputs);
      } catch (e) {
        setMsg(`Failed to load assessments: ${e.message}`);
        setAssessments([]);
        setInputsByAssess({});
      }
    })();
    return () => { cancelled = true; };
  }, [apiBase, selectedIchiCodes.join("|")]);

  // helper: range "a-b" -> [a..b]
  const numsFromRange = (rangeStr, min, max) => {
    if (Number.isFinite(min) && Number.isFinite(max) && min <= max) {
      return Array.from({length:(max-min+1)}, (_,i)=>min+i);
    }
    const m = (rangeStr || "").match(/^(\d+)\s*-\s*(\d+)$/);
    if (!m) return [];
    const a = parseInt(m[1],10), b = parseInt(m[2],10);
    if (isNaN(a) || isNaN(b) || a>b) return [];
    return Array.from({length:(b-a+1)}, (_,i)=>a+i);
  };

  // emit normalized summary up
  React.useEffect(() => {
    const summary = assessments.map(name => {
      const selected = Array.from(selInputs[name] || []);
      return {
        assessment: name,
        items: selected.map(label => ({
          input: label,
          score: scores[`${name}|${label}`]
        }))
      };
    }).filter(x => x.items.length > 0);
    onSummaryChange?.(summary);
  }, [assessments, selInputs, scores, onSummaryChange]);

  const toggleInput = (name, label) => {
    setSelInputs(prev => {
      const s = new Set(prev[name] || []);
      if (s.has(label)) s.delete(label); else s.add(label);
      return { ...prev, [name]: s };
    });
  };

  return (
    <div className="box" style={{marginTop:12, paddingLeft:"40px"}}>
      <div className="box-title" style={{fontWeight:600}}>Assessments</div>
      {msg && <div className="note">{msg}</div>}
      {assessments.length === 0 ? (
        <div className="muted">No Assessments for the Selected ICHI.</div>
      ) : (
        <>
          {assessments.map(name => {
            const inputs = inputsByAssess[name] || [];
            const chosen = selInputs[name] || new Set();

            return (
              <div key={name} style={{marginBottom:12}}>
                <div className="row" style={{alignItems:"center"}}>
                  <div className="label">{name}</div>
                  <div>
                    {/* Inputs dropdown (no duplicates because server already dedupes per assessment) */}
                    <MultiSelect
                      options={inputs.map(it => ({ value: it.input, label: it.input }))}
                      selected={chosen}
                      onChange={(setVal)=>setSelInputs(prev=>({ ...prev, [name]: setVal }))}
                      placeholder={`Select ${name} Inputs…`}
                      width={560}
                    />
                  </div>
                </div>

                {/* Rows for selected inputs with score dropdown */}
                {Array.from(chosen).map(label => {
                  const info = inputs.find(it => it.input === label) || {};
                  const numbers = numsFromRange(info.range, info.min, info.max);
                  const key = `${name}|${label}`;
                  const value = scores[key] ?? (numbers.length ? numbers[0] : "");
                  return (
                    <div key={key} className="row" style={{alignItems:"center"}}>
                      <div className="label" style={{fontWeight:500}}>{label}</div>
                      <div style={{display:"flex", gap:8, alignItems:"center"}}>
                        <span className="pill">range: <b>{info.range || (Number.isFinite(info.min)&&Number.isFinite(info.max)?`${info.min}-${info.max}`:"—")}</b></span>
                        {numbers.length > 0 ? (
                          <select className="input" value={value}
                                  onChange={e=>setScores(prev=>({ ...prev, [key]: Number(e.target.value) }))} style={{maxWidth:160}}>
                            {numbers.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                        ) : <span className="muted">No numeric range</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}


function GasGoalsTab({ icfChildren = [], onSummaryChange }) {
  const codes = useMemo(() => Array.from(new Set(icfChildren)), [icfChildren]);

  // Define the ICF Parent to ICF Category mapping (based on Table 1)
  const parentCategoryMapping = {
    'b730': 'PT',  // Example: b730 -> PT
    'b110': 'Neurophysics', 
    'b740': 'PT',
    'b735': 'PT',
    'b749': 'PT', // Example: b110 -> Neurophysics
    // Add more mappings here
  };

  const [scales, setScales] = useState({});   // { code: [{score, label}] }
  const [selection, setSelection] = useState({}); // { code: "2" | "0" | "-1" | "" }
  const [loading, setLoading] = useState({});   // { code: boolean }
  const [categories, setCategories] = useState({}); // { code: category }
  const [activeTab, setActiveTab] = useState(""); // To track which tab is active

  const scoreText = (v) => {
    const n = Number(v);
    return Number.isNaN(n) ? "" : (n > 0 ? `+${n}` : String(n));
  };

  // Generate static analytics data for pie charts and bar chart
  const staticAnalytics = [
    { label: "Improvement", value: 2, date: "2025-07-10" }, // Diagram 1
    { label: "Improvement", value: 20, date: "2025-08-20" }, // Diagram 2
    { label: "Improvement", value: 45, date: new Date().toISOString().slice(0, 10) }, // Diagram 3 (current date)
  ];

  const pieChartData = staticAnalytics.map(item => ({
    labels: ["Improvement", "Remaining"],
    datasets: [{
      data: [item.value, 100 - item.value],
      backgroundColor: ["green", "gray"],
    }]
  }));

  const barChartData = {
    labels: ["2025-07-10", "2025-08-20", new Date().toISOString().slice(0, 10)],
    datasets: [
      {
        label: "Improvement (%)",
        data: [2, 20, 45], // Example improvements
        backgroundColor: "green",
      },
      {
        label: "Decrement (%)",
        data: [0, 0, 0], // No decrement for now, but you can add values
        backgroundColor: "red",
      }
    ]
  };

  // Prune selections if a code disappears
  useEffect(() => {
    setSelection(prev =>
      Object.fromEntries(Object.entries(prev).filter(([c]) => codes.includes(c)))
    );
  }, [codes]);

  // Fetch scales for missing codes (in parallel)
  useEffect(() => {
    const missing = codes.filter(c => !scales[c]);
    if (!missing.length) return;

    let alive = true;
    (async () => {
      setLoading(p => ({ ...p, ...Object.fromEntries(missing.map(c => [c, true])) })); 
      try {
        const entries = await Promise.all(
          missing.map(async c => {
            try {
              const res = await fetch(`${GAS_BASE}/scale/${encodeURIComponent(c)}`);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const json = await res.json();
              return [c, json?.options || []];
            } catch (e) {
              console.error("GAS fetch failed for", c, e);
              return [c, []];
            }
          })
        );
        if (!alive) return;
        setScales(p => ({ ...p, ...Object.fromEntries(entries) }));
      } finally {
        if (alive) setLoading(p => ({ ...p, ...Object.fromEntries(missing.map(c => [c, false])) }));
      }
    })();

    return () => { alive = false; };
  }, [codes, scales]);

  // Fetch ICF categories based on ICF parent codes
  useEffect(() => {
    const newCategories = {};
    codes.forEach(code => {
      const parentCode = code.substring(0, 4); // Assuming parent code is the first 4 characters
      newCategories[code] = parentCategoryMapping[parentCode] || 'Unknown';
    });
    setCategories(newCategories);
  }, [codes]);

  // Group codes by category for tab-wise display
  const groupedByCategory = useMemo(() => {
    return Object.entries(categories).reduce((acc, [code, category]) => {
      if (!acc[category]) acc[category] = [];
      acc[category].push(code);
      return acc;
    }, {});
  }, [categories]);

  // Set the first tab as active when the component mounts
  useEffect(() => {
    const firstCategory = Object.keys(groupedByCategory)[0];
    setActiveTab(firstCategory);
  }, [groupedByCategory]);

  // Emit compact summary (convert back to numbers)
  useEffect(() => {
    const summary = Object.entries(selection).map(([code, scoreStr]) => {
      const s = Number(scoreStr);
      const label = (scales[code] || []).find(o => Number(o.score) === s)?.label || "";
      return { icf_child_code: code, score: s, label };
    });
    onSummaryChange?.(summary);
  }, [selection, scales, onSummaryChange]);

  return (
    <div className="pad">
      <div className="buttonbar" style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {Object.keys(groupedByCategory).map((category) => (
          <button
            key={category}
            className={`btn ${activeTab === category ? "active" : ""}`}
            onClick={() => setActiveTab(category)}
          >
            {category} ({groupedByCategory[category].length})
          </button>
        ))}
      </div>

      <div className="cardheading">
        <h2 className="title">GAS Goals</h2>
        {codes.length === 0 && <div className="hint">No ICF child codes selected yet.</div>}
      </div>
      {/* Display selected category's child codes */}
      <div style={{ padding: "25px" }}>
        {activeTab && groupedByCategory[activeTab]?.map(code => {
          const opts = scales[code] || [];
          const value = selection[code] ?? "";
          const busy = !!loading[code];
          const category = categories[code];

          return (
            <div key={code} style={{ display: "grid", gridTemplateColumns: "140px 320px 1fr", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontWeight: 600 }}>
                {code} <span style={{ fontWeight: 'normal', fontSize: '14px' }}></span>
              </div>

              <select
                className="input"
                value={value}
                disabled={busy || !opts.length}
                onChange={e => setSelection(s => ({ ...s, [code]: e.target.value }))}>
                <option value="">{busy ? "Loading…" : "— Select Rating —"}</option>
                {opts.map(o => {
                  const v = String(Number(o.score)); // Store as string in <option>
                  const name = (o.label || "").trim();
                  return (
                    <option key={v} value={v}>
                      {scoreText(v)}&nbsp;&nbsp;&nbsp;{name || "Unnamed goal"}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </div>
      {/* Display Pie Chart for improvement analytics */}
      <div style={{ display: 'flex', gap: 40, marginBottom: 40 ,marginTop:40, justifyContent:'center'}}>
        {pieChartData.map((data, index) => (
          <div key={index} >
            <h5>Improvement on {staticAnalytics[index].date}</h5>
            <Pie data={data} />
            <p style={{display:'flex',justifyContent:'center'}}>{staticAnalytics[index].value}% Improvement</p>
          </div>
        ))}
      </div>

      {/* Display Bar Chart for comparative analysis */}
      <div style={{display:'flex',justifyContent:'center'}}>
      <div style={{ width: '600px', height: '400px', margin: '50', }}>
        <h4>Comparative Bar Chart</h4>
        <Bar data={barChartData} />
      </div>
</div>

    </div>
  );
}
function BookAppointmentTab({ patient }) {
  // simple local state for demo behavior
  const [subjective, setSubjective] = React.useState("Low back pain after manual handling incident.");
  const [objective, setObjective] = React.useState("SLR 70° R; core weakness; no neuro deficit.");

  return (
    <div style={{ padding: "12px" }}>
      {/* PAGE TITLE */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Integrated EMR · RAP · TPS</div>
        <div className="dim" style={{ fontSize: 12 }}>
          This version explicitly includes “Book Appointment” and “Order Investigations” buttons at all key workflow locations.
        </div>
      </div>

      {/* Patient Registry */}
      <section className="card" style={{ marginBottom: 12 }}>
        <div className="cardheading"><h2 className="title">Patient Registry</h2></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 ,margin: "0px 25px"}}>
          {/* Patient card 1 */}
          <div className="box soft" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>Jhon Doe — <span className="dim">PT-0001</span></div>
              <div className="dim" style={{ fontSize: 12 }}>PERKESO RTW</div>
            </div>
            <div style={{ display: "flex", gap: 8 , marginTop:20}}>
              <button className="btn ba">Book Appointment</button>
              <button className="btn oi">Order Investigations</button>
            </div>
          </div>

          {/* Patient card 2 */}
          <div className="box soft" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>Siti Nur H — <span className="dim">PT-0002</span></div>
              <div className="dim" style={{ fontSize: 12 }}>Self / PERKESO</div>
            </div>
            <div style={{ display: "flex", gap: 8 ,marginTop:20}}>
              <button className="btn ba">Book Appointment</button>
              <button className="btn oi">Order Investigations</button>
            </div>
          </div>
        </div>
      </section>

      {/* Encounter / Assessment (SOAP-lite) */}
      <section className="card" style={{ marginBottom: 12 }}>
        <div className="cardheading">
          <h2 className="title">Encounter / Assessment</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignItems: "start" ,margin: "0px 25px"}}>
          <div>
            <div className="label">Subjective</div>
            <textarea className="input ta" rows={3} value={subjective} onChange={e=>setSubjective(e.target.value)} />
          </div>
          <div>
            <div className="label">Objective</div>
            <textarea className="input ta" rows={3} value={objective} onChange={e=>setObjective(e.target.value)} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "flex-end" ,margin: "0px 25px"}}>
          <button className="btn ba">Schedule Follow-up</button>
          <button className="btn oi">Order Investigations</button>
        </div>
      </section>

      {/* Problem List (ICD-11) */}
      <section className="card" style={{ marginBottom: 12, position: "relative" }}>
        <div className="cardheading"><h2 className="title">Problem List (ICD-11)</h2></div>

        <div style={{ display: "grid", gap: 8 , margin:"0px 20px"}}>
          {/* Row 1 */}
          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>MG30.01 — Lumbar disc protrusion</div>
              <div className="dim" style={{ fontSize: 12 }}>Onset: 2025-07-02</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book related session</button>
              <button className="btn oi">Order X-ray</button>
              <button className="btn oi">Order Investigations</button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>FA11 — Low back pain</div>
              <div className="dim" style={{ fontSize: 12 }}>Onset: 2025-06-20</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Plan session</button>
              <button className="btn oi">Order Labs</button>
            </div>
          </div>
        </div>

        {/* floating actions (mimic +New Appointment / +Order Investigations) */}
        <div style={{ position: "fixed", right: 16, bottom: 16 , zIndex: 9999,              // <-- keep above all cards
    display: "flex",
    flexDirection: "column",
    gap: 12}}>
          <div style={{  marginBottom:20 }}>
            <button style={{  backgroundColor:"green" , color:"#fff" ,marginBottom:20 ,padding:"7px 15px"}}className="btn ba">+ New Appointment</button>
            <button style={{  backgroundColor:"#fff", border:"2px solid green" }}className="btn oi">+ Order Investigations</button>
          </div>
        </div>
      </section>

      {/* Interventions (ICHI) */}
      <section className="card" style={{ marginBottom: 12 }}>
        <div className="cardheading"><h2 className="title">Interventions (ICHI)</h2></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12,margin:"0px 20px " }}>
          {/* Therapeutic exercise */}
          <div className="box soft" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 600 }}>7500 — Therapeutic exercise</div>
            <div className="dim" style={{ fontSize: 12 }}>3×/week • 45min</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book</button>
              <button className="btn oi">Order pre-proc labs</button>
            </div>
          </div>

          {/* Work conditioning */}
          <div className="box soft" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 600 }}>7510 — Work conditioning</div>
            <div className="dim" style={{ fontSize: 12 }}>2×/week • 60min</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book</button>
            </div>
          </div>

          {/* Ergonomics education */}
          <div className="box soft" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 600 }}>7W03 — Ergonomics education</div>
            <div className="dim" style={{ fontSize: 12 }}>1×/week</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book</button>
            </div>
          </div>
        </div>
      </section>

      {/* TPS — Task Performance */}
      <section className="card" style={{ marginBottom: 12 }}>
        <div className="cardheading"><h2 className="title">TPS — Task Performance</h2></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 ,margin:"0px 20px "}}>
          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>Lift 10kg crate</div>
              <div className="dim" style={{ fontSize: 12 }}>Result: Completed with mild pain</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book Next TPS</button>
              <button className="btn oi">Order ECG</button>
            </div>
          </div>

          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>Overhead reach 1 min</div>
              <div className="dim" style={{ fontSize: 12 }}>Result: Requires pacing</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book Retest</button>
            </div>
          </div>
        </div>
      </section>

      {/* RAP / RTW Plan */}
      <section className="card" style={{ marginBottom: 12 }}>
        <div className="cardheading"><h2 className="title">RAP / RTW Plan</h2></div>

        <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,margin:"0px 20px "}}>
          <div>
            <div style={{ fontWeight: 600 }}>RTW — Milestone: 30 days</div>
            <div className="dim" style={{ fontSize: 12 }}>Target: Light duty</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn ba">Create RTW schedule</button>
            <button className="btn oi">Order FCE</button>
          </div>
        </div>
      </section>

      {/* Discharge & Follow-up */}
      <section className="card">
        <div className="cardheading"><h2 className="title">Discharge & Follow-up</h2></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,margin:"0px 20px "}}>
            <div>
              <div style={{ fontWeight: 600 }}>30 day phone review</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book 30d</button>
            </div>
          </div>

          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>60 day onsite review</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book 60d</button>
              <button className="btn oi">Order 6-week XR</button>
            </div>
          </div>

          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>90 day sustainability check</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book 90d</button>
            </div>
          </div>
        </div>

        <div className="dim" style={{ fontSize: 12, marginTop: 8 }}>
          CARF: 30 / 60 / 90 checks
        </div>
      </section>
    </div>
  );
}
function InvestigationsChecklist({
  open,                   // only used in modal variant
  onClose,                // only used in modal variant
  patient,
  initialRows,
  title = "Order Investigations — Checklist",
  onSave,
  variant = "inline",     // "inline" | "modal"
}) {
  const emptyRow = React.useMemo(
    () => ({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
      item: "",
      type: "Lab",
      test: "",
      priority: "Routine",
      indication: "",
      icd: "",
      specimen: "",
      prereq: "",
      ordered_by: "",
      responsible: "",
      due: "",
      status: "Planned",
      results: "",
      notes: "",
    }),
    []
  );

  const [rows, setRows] = React.useState(() =>
    (initialRows && initialRows.length ? initialRows : [emptyRow]).map((r) => ({
      ...emptyRow,
      ...r,
      id: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()),
    }))
  );

  React.useEffect(() => {
    if (initialRows && initialRows.length) {
      setRows(
        initialRows.map((r) => ({
          ...emptyRow,
          ...r,
          id: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()),
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRows]);

  // Only add ESC close for modal
  React.useEffect(() => {
    if (variant !== "modal" || !open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant, open, onClose]);

  const addRow = () => setRows((rs) => [...rs, { ...emptyRow, id: guid() }]);
  const removeRow = (id) => setRows((rs) => rs.filter((r) => r.id !== id));
  const updateCell = (id, key, value) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [key]: value } : r)));

  const exportCSV = () => {
    const headers = [
      "Item","Type","Test/Panel","Priority","Clinical Indication","ICD-11","Specimen",
      "Pre-reqs/Prep","Ordering Clinician","Responsible","Due By","Status","Results Link","Notes",
    ];
    const body = rows.map((r) => [
      r.item, r.type, r.test, r.priority, r.indication, r.icd, r.specimen,
      r.prereq, r.ordered_by, r.responsible, r.due, r.status, r.results, r.notes,
    ]);
    const csv = [headers, ...body].map((line) => line.map(csvEscape).join(",")).join("\n");
    downloadBlob(csv, "order_investigations.csv", "text/csv;charset=utf-8;");
  };

  const save = () => {
    onSave?.(rows);
    if (variant === "modal") onClose?.();
  };

  // Modal hides when open = false; inline always renders
  if (variant === "modal" && !open) return null;

  const Wrapper = ({ children }) =>
    variant === "modal" ? (
      <div style={sx.backdrop} onClick={onClose}>
        <div style={sx.sheet} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
          {children}
        </div>
      </div>
    ) : (
      <div style={sx.inlineCard}>{children}</div>
    );

  return (
    <Wrapper>
      {/* Header */}
      <div style={sx.header}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={addRow}>+ Add Row</button>
          <button className="btn" onClick={exportCSV}>Export CSV</button>
          <button className="btn" onClick={save}>Save</button>
          {variant === "modal" && <button className="btn" onClick={onClose}>Close</button>}
        </div>
      </div>

      {/* Patient context (optional) */}
      {patient && (
        <div style={sx.context}>
          <span><b>Patient:</b> {patient.name ?? ""}</span>
          <span><b>ID:</b> {patient.id ?? ""}</span>
          <span><b>DoB: 13-07-1982 · Male</b></span>
          
        </div>
      )}

{/* Rows (responsive card grid) */}
<div style={{ display: "grid", gap: 12 }}>
  {rows.map((r) => (
    <RowCard
      key={r.id}
      row={r}
      onChange={updateCell}
      onDelete={() => removeRow(r.id)}
    />
  ))}
</div>

      <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
        Tip: Use Export to hand off to LIS/RIS.
      </div>
    </Wrapper>
  );
}
function RowCard({ row, onChange, onDelete }) {
  return (
    <div style={sx.cardRow}>
      <Field label="Item">
        <input style={sx.input} value={row.item} onChange={(e)=>onChange(row.id,"item",e.target.value)} />
      </Field>

      <Field label="Type">
        <select style={sx.input} value={row.type} onChange={(e)=>onChange(row.id,"type",e.target.value)}>
          {["Lab","Radiology","Cardiology","Assessment","Other"].map(o=>(
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field label="Test/Panel">
        <input style={sx.input} value={row.test} onChange={(e)=>onChange(row.id,"test",e.target.value)} />
      </Field>

      <Field label="Priority">
        <select style={sx.input} value={row.priority} onChange={(e)=>onChange(row.id,"priority",e.target.value)}>
          {["STAT","Urgent","Routine"].map(o=>(<option key={o} value={o}>{o}</option>))}
        </select>
      </Field>

      <Field label="Indication">
        <input style={sx.input} value={row.indication} onChange={(e)=>onChange(row.id,"indication",e.target.value)} />
      </Field>

      <Field label="ICD-11">
        <input style={sx.input} placeholder="e.g., FA11" value={row.icd} onChange={(e)=>onChange(row.id,"icd",e.target.value)} />
      </Field>

      <Field label="Specimen">
        <input style={sx.input} placeholder="Blood/Urine/—" value={row.specimen} onChange={(e)=>onChange(row.id,"specimen",e.target.value)} />
      </Field>

      <Field label="Pre-reqs/Prep">
        <input style={sx.input} placeholder="Fasting 8h / Remove metal…" value={row.prereq} onChange={(e)=>onChange(row.id,"prereq",e.target.value)} />
      </Field>

      <Field label="Ordering Clinician">
        <input style={sx.input} value={row.ordered_by} onChange={(e)=>onChange(row.id,"ordered_by",e.target.value)} />
      </Field>

      <Field label="Responsible">
        <input style={sx.input} value={row.responsible} onChange={(e)=>onChange(row.id,"responsible",e.target.value)} />
      </Field>

      <Field label="Due By">
        <input style={sx.input} type="date" value={row.due} onChange={(e)=>onChange(row.id,"due",e.target.value)} />
      </Field>

      <Field label="Status">
        <select style={sx.input} value={row.status} onChange={(e)=>onChange(row.id,"status",e.target.value)}>
          {["Planned","Ordered","In progress","Completed","Cancelled"].map(o=>(
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field label="Results Link">
        <input style={sx.input} placeholder="URL / ref" value={row.results} onChange={(e)=>onChange(row.id,"results",e.target.value)} />
      </Field>

      <Field label="Notes">
        <input style={sx.input} value={row.notes} onChange={(e)=>onChange(row.id,"notes",e.target.value)} />
      </Field>

      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "end" }}>
        <button className="btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={sx.field}>
      <span style={sx.fieldLabel}>{label}</span>
      {children}
    </label>
  );
}

/* ---------- helpers & styles ---------- */
function guid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}
function csvEscape(v) {
  const s = (v ?? "").toString().replace(/"/g, '""');
  return `"${s}"`;
}
function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

const sx = {
  // used only in modal variant
  backdrop: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
    display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000,
  },
  sheet: {
    width: "min(1200px, 96vw)", maxHeight: "85vh", overflow: "hidden",
    background: "#fff", borderRadius: "16px 16px 0 0", boxShadow: "0 -10px 30px rgba(0,0,0,0.2)", padding: 12,
  },
  // inline container
inlineCard: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 12,
    maxWidth: "100%",
    overflowX: "hidden",
  },
header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 4px",
    borderBottom: "1px solid #eee",
    marginBottom: 8,
  },
  cardRow: {
    display: "grid",
    gap: 10,
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    padding: 12,
    border: "1px solid #f0f0f0",
    borderRadius: 12,
    background: "#fafafa",
  },

  field: { display: "flex", flexDirection: "column", gap: 6, minWidth: 0 },
  fieldLabel: { fontSize: 12, color: "#666" },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "8px 10px",
    border: "1px solid #ddd",
    borderRadius: 8,
    outline: "none",
  },

context: {
    display: "flex",
    gap: 12,
    fontSize: 12,
    color: "#444",
    padding: "6px 4px 10px",
    borderBottom: "1px dashed #eee",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  tableWrap: { display: "grid", gap: 4, overflow: "auto", paddingBottom: 8 },
  tableHeader: {
    display: "grid",
    gridTemplateColumns:
      "220px 120px 160px 110px 220px 100px 130px 180px 160px 140px 130px 130px 150px 220px 70px",
    position: "sticky", top: 0, background: "#fafafa", zIndex: 1, borderBottom: "1px solid #eee",
  },
  tr: {
    display: "grid",
    gridTemplateColumns:
      "220px 120px 160px 110px 220px 100px 130px 180px 160px 140px 130px 130px 150px 220px 70px",
    alignItems: "center",
  },
  th: { fontSize: 12, fontWeight: 700, padding: "6px 8px" },
  td: { padding: "4px 6px" },
  input: {
    width: "100%", boxSizing: "border-box", padding: "6px 8px",
    border: "1px solid #ddd", borderRadius: 8, outline: "none",
  },
};

function GasGoalsNATab({ icfChildren = [], onSummaryChange }) {
  const codes = useMemo(() => Array.from(new Set(icfChildren)), [icfChildren]);

  // Define the ICF Parent to ICF Category mapping (based on Table 1)
  const parentCategoryMapping = {
    'b730': 'PT',  // Example: b730 -> PT
    'b110': 'Neurophysics', 
    'b740': 'PT',
    'b735': 'PT',
    'b749': 'PT', // Example: b110 -> Neurophysics
    // Add more mappings here
  };

  const [scales, setScales] = useState({});   // { code: [{score, label}] }
  const [selection, setSelection] = useState({}); // { code: "2" | "0" | "-1" | "" }
  const [loading, setLoading] = useState({});   // { code: boolean }
  const [categories, setCategories] = useState({}); // { code: category }
  const [activeTab, setActiveTab] = useState(""); // To track which tab is active

  const scoreText = (v) => {
    const n = Number(v);
    return Number.isNaN(n) ? "" : (n > 0 ? `+${n}` : String(n));
  };

  // Generate static analytics data for pie charts and bar chart
  const staticAnalytics = [
    { label: "Improvement", value: 2, date: "2025-07-10" }, // Diagram 1
    { label: "Improvement", value: 20, date: "2025-08-20" }, // Diagram 2
    { label: "Improvement", value: 45, date: new Date().toISOString().slice(0, 10) }, // Diagram 3 (current date)
  ];

  const pieChartData = staticAnalytics.map(item => ({
    labels: ["Improvement", "Remaining"],
    datasets: [{
      data: [item.value, 100 - item.value],
      backgroundColor: ["green", "gray"],
    }]
  }));

  const barChartData = {
    labels: ["2025-07-10", "2025-08-20", new Date().toISOString().slice(0, 10)],
    datasets: [
      {
        label: "Improvement (%)",
        data: [2, 20, 45], // Example improvements
        backgroundColor: "green",
      },
      {
        label: "Decrement (%)",
        data: [0, 0, 0], // No decrement for now, but you can add values
        backgroundColor: "red",
      }
    ]
  };

  // Prune selections if a code disappears
  useEffect(() => {
    setSelection(prev =>
      Object.fromEntries(Object.entries(prev).filter(([c]) => codes.includes(c)))
    );
  }, [codes]);

  // Fetch scales for missing codes (in parallel)
  useEffect(() => {
    const missing = codes.filter(c => !scales[c]);
    if (!missing.length) return;

    let alive = true;
    (async () => {
      setLoading(p => ({ ...p, ...Object.fromEntries(missing.map(c => [c, true])) })); 
      try {
        const entries = await Promise.all(
          missing.map(async c => {
            try {
              const res = await fetch(`${GAS_BASE}/scale/${encodeURIComponent(c)}`);
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const json = await res.json();
              return [c, json?.options || []];
            } catch (e) {
              console.error("GAS fetch failed for", c, e);
              return [c, []];
            }
          })
        );
        if (!alive) return;
        setScales(p => ({ ...p, ...Object.fromEntries(entries) }));
      } finally {
        if (alive) setLoading(p => ({ ...p, ...Object.fromEntries(missing.map(c => [c, false])) }));
      }
    })();

    return () => { alive = false; };
  }, [codes, scales]);

  // Fetch ICF categories based on ICF parent codes
  useEffect(() => {
    const newCategories = {};
    codes.forEach(code => {
      const parentCode = code.substring(0, 4); // Assuming parent code is the first 4 characters
      newCategories[code] = parentCategoryMapping[parentCode] || 'Unknown';
    });
    setCategories(newCategories);
  }, [codes]);

  // Group codes by category for tab-wise display
  const groupedByCategory = useMemo(() => {
    return Object.entries(categories).reduce((acc, [code, category]) => {
      if (!acc[category]) acc[category] = [];
      acc[category].push(code);
      return acc;
    }, {});
  }, [categories]);

  // Set the first tab as active when the component mounts
  useEffect(() => {
    const firstCategory = Object.keys(groupedByCategory)[0];
    setActiveTab(firstCategory);
  }, [groupedByCategory]);

  // Emit compact summary (convert back to numbers)
  useEffect(() => {
    const summary = Object.entries(selection).map(([code, scoreStr]) => {
      const s = Number(scoreStr);
      const label = (scales[code] || []).find(o => Number(o.score) === s)?.label || "";
      return { icf_child_code: code, score: s, label };
    });
    onSummaryChange?.(summary);
  }, [selection, scales, onSummaryChange]);

  return (
    <div className="pad">
      <div className="buttonbar" style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {Object.keys(groupedByCategory).map((category) => (
          <button
            key={category}
            className={`btn ${activeTab === category ? "active" : ""}`}
            onClick={() => setActiveTab(category)}
          >
            {category} ({groupedByCategory[category].length})
          </button>
        ))}
      </div>

      <div className="cardheading">
        <h2 className="title">GAS Goals</h2>
        {codes.length === 0 && <div className="hint">No ICF child codes selected yet.</div>}
      </div>
      {/* Display selected category's child codes */}
      <div style={{ padding: "25px" }}>
        {activeTab && groupedByCategory[activeTab]?.map(code => {
          const opts = scales[code] || [];
          const value = selection[code] ?? "";
          const busy = !!loading[code];
          const category = categories[code];

          return (
            <div key={code} style={{ display: "grid", gridTemplateColumns: "140px 320px 1fr", gap: 12, alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontWeight: 600 }}>
                {code} <span style={{ fontWeight: 'normal', fontSize: '14px' }}></span>
              </div>

              <select
                className="input"
                value={value}
                disabled={busy || !opts.length}
                onChange={e => setSelection(s => ({ ...s, [code]: e.target.value }))}>
                <option value="">{busy ? "Loading…" : "— Select Rating —"}</option>
                {opts.map(o => {
                  const v = String(Number(o.score)); // Store as string in <option>
                  const name = (o.label || "").trim();
                  return (
                    <option key={v} value={v}>
                      {scoreText(v)}&nbsp;&nbsp;&nbsp;{name || "Unnamed goal"}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </div>
      {/* Display Pie Chart for improvement analytics */}
      {/* <div style={{ display: 'flex', gap: 20, marginBottom: 40 , justifyContent:'center'}}>
        {pieChartData.map((data, index) => (
          <div key={index} >
            <h5>Improvement on {staticAnalytics[index].date}</h5>
            <Pie data={data} />
            <p style={{display:'flex',justifyContent:'center'}}>{staticAnalytics[index].value}% Improvement</p>
          </div>
        ))}
      </div> */}

      {/* Display Bar Chart for comparative analysis */}
      {/* <div style={{display:'flex',justifyContent:'center'}}>
      <div style={{ width: '600px', height: '400px', margin: '50', }}>
        <h4>Comparative Bar Chart</h4>
        <Bar data={barChartData} />
      </div>
</div> */}

    </div>
  );
}


 
 
 
/* ---------------- Patient Summary ---------------- */
function PatientSummary({ patient, icdPath, icdCode, icfSummary, ichiSummary, gasSummary = [], }) {
  const dob = (patient.dob_year && patient.dob_month && patient.dob_day)
    ? `${patient.dob_year}-${patient.dob_month}-${patient.dob_day}` : "";
const exportToPDF = () => {
  const doc = new jsPDF();

  const margin = 10;
  const pageHeight = doc.internal.pageSize.height;
  let yPos = margin;

  const lineHeight = 6; // Adjust line spacing
  const spaceBetweenSections = 10; // Space between different sections

  // Set Title and Patient Info
  doc.setFontSize(16);
  doc.text("Patient Summary", margin, yPos);
  yPos += lineHeight + spaceBetweenSections;

  doc.setFontSize(12);
  doc.text(`Patient ID: ${patient.patient_id || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Name: ${patient.patient_name || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Date of Birth: ${dob || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Gender: ${patient.gender || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Marital Status: ${patient.marital || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Nationality: ${patient.nationality || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Occupation: ${patient.occupation || "—"}`, margin, yPos);
  yPos += lineHeight;

  doc.text(`Register Date: ${reg || "—"}`, margin, yPos);
  yPos += spaceBetweenSections;

  // Add ICD
  doc.text("ICD:", margin, yPos);
  yPos += lineHeight;
  doc.text(breadcrumb || "—", margin, yPos);
  yPos += spaceBetweenSections;

  // Add ICF Summary
  doc.text("ICF Selections:", margin, yPos);
  yPos += lineHeight;
  if (icfSummary.length === 0) {
    doc.text("No ICF selection recorded.", margin, yPos);
    yPos += lineHeight;
  } else {
    icfSummary.forEach((x, i) => {
      doc.text(`${x.parent_icf}: ${x.parent_name}`, margin, yPos);
      yPos += lineHeight;
      doc.text(`${x.child_icf}: ${x.child_name}`, margin, yPos);
      yPos += lineHeight;
      if (x.range || x.qualifier_label) {
        doc.text(`Qualifier: ${x.qualifier_label || "—"}`, margin, yPos);
        yPos += lineHeight;
        if (x.range) doc.text(`Range: ${x.range}`, margin, yPos);
        yPos += lineHeight;
        if (Number.isFinite(x.score)) doc.text(`Score: ${x.score}`, margin, yPos);
        yPos += lineHeight;
      }
    });
  }
  yPos += spaceBetweenSections;

  // Add ICHI Summary
  doc.text("ICHI Actions:", margin, yPos);
  yPos += lineHeight;
  if (ichiSummary.selected.length === 0) {
    doc.text("No ICHI selected.", margin, yPos);
    yPos += lineHeight;
  } else {
    ichiSummary.selected.forEach((r, i) => {
      doc.text(`${r.ichi_code} — ${r.ichi_name}`, margin, yPos);
      yPos += lineHeight;
    });
  }
if (yPos > pageHeight - 20) {
  doc.addPage();
  yPos = margin;
}

  yPos += spaceBetweenSections;

  // Add Modalities
  doc.text("Modalities:", margin, yPos);
  yPos += lineHeight;
  if (ichiSummary.modalities.length === 0) {
    doc.text("No modalities selected.", margin, yPos);
    yPos += lineHeight;
  } else {
    ichiSummary.modalities.forEach((m, i) => {
      doc.text(`${m.label} — ${m.range_label || "—"} | ${m.duration_label || "—"}`, margin, yPos);
      yPos += lineHeight;
    });
  }

  yPos += spaceBetweenSections;

  // Add Clinical Note / Plan
  doc.text("Clinical Note / Plan:", margin, yPos);
  yPos += lineHeight;
  doc.text(ichiSummary.note || "No note provided.", margin, yPos);
  yPos += spaceBetweenSections;

  // Add GAS Goals
  doc.text("GAS Goals:", margin, yPos);
  yPos += lineHeight;
  if (gasSummary.length === 0) {
    doc.text("No GAS goals recorded.", margin, yPos);
    yPos += lineHeight;
  } else {
    gasSummary.forEach((g, i) => {
      doc.text(`${g.icf_child_code}: ${g.score > 0 ? `+${g.score}` : g.score} — ${g.label}`, margin, yPos);
      yPos += lineHeight;
    });
  }

  // Finalize and Download PDF
  doc.save(`patient_summary_${patient.patient_id || "unknown"}.pdf`);
};


  const reg = (patient.reg_year && patient.reg_month && patient.reg_day)
    ? `${patient.reg_year}-${patient.reg_month}-${patient.reg_day}` : "";
 
  const breadcrumb = icdPath.length
    ? icdPath.map(x => x.label).join("  ›  ")
    : (icdCode || "—");
 
  return (
    <section className="card">
      <div className="cardheading">
      <div className="card-head ">
       <h2 className="title">Patient summary</h2>
        <button className="btn ai" disabled title="AI mode (coming soon)">AI mode</button>
      </div>
      <p className="subtitle">A compact key sheet containing demographics and selections.</p>
 </div>
      {/* Patient */}
      <div className="grid2" style={{padding:25}}>
        <div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6}}>
          <div className="box-title">Patient details</div>
          <div className="kv"><span>Patient ID</span><strong>{patient.patient_id || "—"}</strong></div>
          <div className="kv"><span>Name</span><strong>{patient.patient_name || "—"}</strong></div>
          <div className="kv"><span>Register date</span><strong>{reg || "—"}</strong></div>
          <div className="kv"><span>Date of birth</span><strong>{dob || "—"}</strong></div>
          <div className="kv"><span>Gender</span><strong>{patient.gender || "—"}</strong></div>
          <div className="kv"><span>Marital status</span><strong>{patient.marital || "—"}</strong></div>
          <div className="kv"><span>Nationality</span><strong>{patient.nationality || "—"}</strong></div>
          <div className="kv"><span>Occupation</span><strong>{patient.occupation || "—"}</strong></div>
        </div>
 
        <div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6}}>
          <div className="box-title">ICD</div>
          <div style={{whiteSpace:"pre-wrap"}}>{breadcrumb}</div>
        </div>
      </div>
 
      {/* ICF */}
      <div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6,margin:"10px 25px"}}>
        <div className="box-title">ICF Selections</div>
        {icfSummary.length === 0 ? (
          <div className="muted">No ICF selection recorded.</div>
        ) : (
          <div className="icf-list">
            {icfSummary.map((x, i) => (
              <div className="icf-row" key={`${x.parent_icf}-${x.child_icf}-${i}`}>
                <div className="icf-head">
                  <span className="badge">{x.parent_icf}</span> {x.parent_name}
                </div>
                <div className="icf-sub">
                  <span className="badge soft">{x.child_icf}</span> {x.child_name}
                </div>
                {(x.range || x.qualifier_label) && (
                  <div className="icf-sub">
                    <span className="kv-inline"><b>Qualifier:</b> {x.qualifier_label || "—"}</span>
                    {x.range ? <span className="kv-inline"><b>Range:</b> {x.range}</span> : null}
                    {Number.isFinite(x.score) ? <span className="kv-inline"><b>Score:</b> {x.score}</span> : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
 
      {/* ICHI + Modalities */}
      <div className="grid2" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6, margin:"10px 25px"}}>
        <div className="box">
          <div className="box-title">ICHI Actions</div>
          {(!ichiSummary.selected || ichiSummary.selected.length===0) ? (
            <div className="muted">No ICHI selected.</div>
          ) : (
            <ul className="flat">
              {ichiSummary.selected.map((r,i)=>(
                <li key={`${r.icf_code}-${r.ichi_code}-${i}`}>
                  <strong>{r.ichi_code}</strong> — {r.ichi_name} <span className="dim">[{r.icf_code}]</span>
                </li>
              ))}
            </ul>
          )}
        </div>
 
        <div className="box">
          <div className="box-title">Modalities</div>
          {(!ichiSummary.modalities || ichiSummary.modalities.length===0) ? (
            <div className="muted">No modalities selected.</div>
          ) : (
            <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
{ichiSummary.modalities.map((m,i)=>(
  <span key={`${m.value}-${i}`} className="chip">
    {m.label}
    { (m.range_label || m.duration_label) &&
      <span className="dim"> — {m.range_label || "—"} | {m.duration_label || "—"}</span>
    }
  </span>
))}

            </div>
          )}
        </div>
      </div>
 
      {/* Notes */}
      <div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6, margin:"10px 25px"}}>
        <div className="box-title">Clinical Note / Plan</div>
        <div className="note-view">
          {ichiSummary.note ? ichiSummary.note : <span className="muted">No note provided.</span>}
        </div>
      </div>
      {/* Assessments */}
<div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6 ,margin:"10px 25px"}}>
  <div className="box-title">Assessments</div>
  {(!ichiSummary.assessments || ichiSummary.assessments.length===0) ? (
    <div className="muted">No assessments recorded.</div>
  ) : (
    <ul className="flat">
      {ichiSummary.assessments.map((a, i) => (
        <li key={`${a.assessment}-${i}`}>
          <b>{a.assessment}</b>
          <ul className="flat" style={{marginTop:6, marginLeft:10}}>
            {a.items.map((it, j) => (
              <li key={`${a.assessment}-${it.input}-${j}`}>
                {it.input}{Number.isFinite(it.score) ? ` — score: ${it.score}` : ""}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )}
</div>
<>
      {/* existing sections ... */}
     <div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6, margin:"10px 25px"}}> 
      <div className="box-title">GAS Goals</div>
      {!gasSummary.length && <div>-</div>}
      {gasSummary.map(g => (
        <div key={g.icf_child_code}>
          {g.icf_child_code}: {g.score > 0 ? `+${g.score}` : g.score} — {g.label}
        </div>
      ))}
    </div>
    <button className="btnexport" onClick={exportToPDF}>
  Export to PDF
</button>

    </>
    </section>
  );
}
 
/* ---------------- Personal details (New/Existing + Save + History) ---------------- */
// ---------------- PersonalDetailsForm ----------------
function PersonalDetailsForm({ value, onChange, onFinancialChange, onEmploymentChange }) {
  // controlled form via parent
  const form = value;
  const set = useCallback((k, v) => {
  onChange(prev => ({ ...prev, [k]: v }));
}, [onChange]);

  const [innerTab, setInnerTab]   = useState("PATIENT"); // PATIENT | FINANCIAL | EMPLOYMENT
  const [userType, setUserType]   = useState("New");     // New | Existing
  const [existingPick, setExistingPick] = useState("");
  const [history, setHistory]     = useState([]);
  const [status, setStatus]       = useState("idle");    // idle | saving | saved | error
  const [msg, setMsg]             = useState("");

  const days   = useMemo(() => Array.from({length:31}, (_,i)=>(`${i+1}`.padStart(2,"0"))), []);
  const months = useMemo(() => [
    {v:"01",n:"Jan"},{v:"02",n:"Feb"},{v:"03",n:"Mar"},{v:"04",n:"Apr"},
    {v:"05",n:"May"},{v:"06",n:"Jun"},{v:"07",n:"Jul"},{v:"08",n:"Aug"},
    {v:"09",n:"Sep"},{v:"10",n:"Oct"},{v:"11",n:"Nov"},{v:"12",n:"Dec"},
  ], []);
  const years  = useMemo(() => {
    const y = new Date().getFullYear();
    const a = [];
    for (let i = y; i >= 1900; i--) a.push(`${i}`);
    return a;
  }, []);
  const fmtDate = (d, m, y) => (d && m && y) ? `${y}-${m}-${d}` : null;

  // Load an existing patient by pick (fills demographics + history)
  useEffect(() => {
    if (userType !== "Existing" || !existingPick) return;
    (async () => {
      try {
        setMsg(""); setStatus("idle");
        set("photo_url", p.photo_url || "");
setPhotoPreview(p.photo_url || "");
setPhotoFile(null);

        // demographics
        const r1 = await fetch(`${API}/patients/${encodeURIComponent(existingPick)}`);
        if (!r1.ok) throw new Error(`HTTP ${r1.status}`);
        const p = await r1.json();
        set("patient_id", p.patient_id || "");
        set("patient_name", p.patient_name || "");
        if (p.date_of_birth) {
          const [Y,M,D] = p.date_of_birth.split("-");
          set("dob_year", Y || ""); set("dob_month", M || ""); set("dob_day", D || "");
        } else { set("dob_year",""); set("dob_month",""); set("dob_day",""); }
        if (p.date_register_otc) {
          const [RY,RM,RD] = p.date_register_otc.split("-");
          set("reg_year", RY || ""); set("reg_month", RM || ""); set("reg_day", RD || "");
        } else { set("reg_year",""); set("reg_month",""); set("reg_day",""); }
        set("gender", p.gender || "");
        set("marital", p.marital_status || "");
        set("nationality", p.nationality || "");
        set("occupation", p.occupation || "");

        // history
        const r2 = await fetch(`${API}/patients/${encodeURIComponent(existingPick)}/history`);
        const hist = r2.ok ? await r2.json() : [];
        setHistory(hist || []);
      } catch (e) {
        setMsg(`Failed to load patient: ${e.message}`);
      }
    })();
  }, [userType, existingPick]);

  // Real save for personal details (create or update)
  const handleSave = async (e) => {
    e.preventDefault();
    if (status === "saving") return;
    setStatus("saving"); setMsg("");

    try {
      const dob = fmtDate(form.dob_day, form.dob_month, form.dob_year);
      const reg = fmtDate(form.reg_day, form.reg_month, form.reg_year);

      const payload = {
        patient_name: (form.patient_name || "").trim(),
        gender: form.gender || "",
        marital_status: form.marital || "",
        nationality: form.nationality || "",
        occupation: form.occupation || "",
        date_of_birth: dob,
        date_register_otc: reg
      };

      let res;
      if (userType === "Existing" && form.patient_id) {
        // update
        res = await fetch(`${API}/patients/${encodeURIComponent(form.patient_id)}`, {
          method: "PUT",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(payload)
        });
      } else {
        // create
        res = await fetch(`${API}/patients`, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(payload)
        });
      }

      const errBody = await (res.ok ? null : res.json().catch(()=>null));
      if (!res.ok) throw new Error(`${res.status} ${errBody?.error || res.statusText}`);

      const out = await res.json();
      // VERY IMPORTANT: put returned id into parent state so other tabs can save
      if (out.patient_id) set("patient_id", out.patient_id);

      setStatus("saved");
      setMsg(out.message || "Saved.");
    } catch (e2) {
      setStatus("error");
      setMsg(`Save failed: ${e2.message}`);
    }
  };

// Max size: 50 MB
const MAX_PHOTO_BYTES = 50 * 1024 * 1024;

// NEW: photo upload state
const [photoFile, setPhotoFile]       = useState(null);
const [photoPreview, setPhotoPreview] = useState(""); // objectURL or existing URL
const [photoStatus, setPhotoStatus]   = useState("idle"); // idle|saving|saved|error
const [photoMsg, setPhotoMsg]         = useState("");

// revoke object URLs when preview changes
useEffect(() => {
  return () => {
    if (photoPreview && photoPreview.startsWith("blob:")) {
      try { URL.revokeObjectURL(photoPreview); } catch {}
    }
  };
}, [photoPreview]);

// Pick file handler
const onPickPhoto = (e) => {
  const f = e.target.files?.[0];
  if (!f) return;
  if (!f.type.startsWith("image/")) {
    setPhotoMsg("Please choose an image file."); setPhotoFile(null); return;
  }
  if (f.size > MAX_PHOTO_BYTES) {
    setPhotoMsg("Max size is 50 MB."); setPhotoFile(null); return;
  }
  setPhotoMsg(""); setPhotoFile(f);
  const url = URL.createObjectURL(f);
  setPhotoPreview(url);
};

// Clear selection (does not delete server copy)
const clearPhoto = () => {
  setPhotoFile(null);
  setPhotoMsg("");
  // keep preview if it is the existing server URL; clear if it's a blob
  if (photoPreview.startsWith("blob:")) setPhotoPreview("");
};

// Upload to backend (adjust endpoint if needed)
async function uploadProfilePhoto(patientId) {
  if (!photoFile || !patientId) return;
  setPhotoStatus("saving"); setPhotoMsg("");
  try {
    const fd = new FormData();
    fd.append("file", photoFile);
    // Example endpoint: PUT /patients/:id/photo  (use POST if your API expects it)
    const res = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/photo`, {
      method: "PUT",
      body: fd,
    });
    const errBody = await (res.ok ? null : res.json().catch(()=>null));
    if (!res.ok) throw new Error(`${res.status} ${errBody?.error || res.statusText}`);

    const out = await res.json().catch(()=>({}));
    // If your API returns the stored URL:
    if (out.photo_url) {
      set("photo_url", out.photo_url);
      setPhotoPreview(out.photo_url);
    }
    setPhotoStatus("saved");
    setPhotoMsg("Photo uploaded.");
  } catch (e) {
    setPhotoStatus("error");
    setPhotoMsg(`Upload failed: ${e.message}`);
  }
}





  return (
    <section className="card">
      {/* Inner tabs */}

      <div className="innerTabs">
        
        <button type="button"
          className={`innerTab ${innerTab==="PATIENT"?"active":""}`}
          onClick={()=>setInnerTab("PATIENT")}
        >Patient Details</button>
        <button type="button"
          className={`innerTab ${innerTab==="FINANCIAL"?"active":""}`}
          onClick={()=>setInnerTab("FINANCIAL")}
        >Financial Details</button>
        <button type="button"
          className={`innerTab ${innerTab==="EMPLOYMENT"?"active":""}`}
          onClick={()=>setInnerTab("EMPLOYMENT")}
        >Employment Details</button>
      </div>
{/* Profile Photo (max 50 MB) */}
<div className="row" style={{ padding: "10px",  gap: 16, alignItems: "center", flexWrap: "wrap" }}>
  <div style={{
    width: 104, height: 104, borderRadius: "6px", overflow: "hidden",
    border: "1px solid #ddd", background: "#f6f6f6", display: "flex",
    alignItems: "center", justifyContent: "center"
  }}>
    {photoPreview ? (
      <img
        src={photoPreview}
        alt="Profile"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : (
      <span style={{ fontSize: 12, color: "#999", textAlign: "center", padding: 8 }}>
        No photo
      </span>
    )}
  </div>

  <div style={{ display: "grid", gap: 8, minWidth: 240 }}>
    <input
      type="file"
      accept="image/*"
      onChange={onPickPhoto}
      style={{ maxWidth: 280 }}
    />
    <div style={{ gap: 8,display:"flex", flexWrap: "wrap" }}>
      <button type="button" className="btn" onClick={() => uploadProfilePhoto(form.patient_id || "")}
        disabled={!photoFile || photoStatus === "saving"}>
        {photoStatus === "saving" ? "Uploading…" : "Photo Uploaded"}
      </button>
      <button type="button" className="btn" onClick={clearPhoto} disabled={!photoFile && !photoPreview}>
        Clear
      </button>
    </div>
    <div className="hint" style={{ fontSize: 12, color: "#666" }}>
      Max size: 50&nbsp;MB. Accepted: images only.
    </div>
    {photoMsg && (
      <div className="hint" style={{ color: photoStatus === "error" ? "#b00020" : "#2f6f2f" }}>
        {photoMsg}
      </div>
    )}
  </div>
</div>

      {/* Employment Tab */}
      <div style={{display: innerTab==="EMPLOYMENT" ? "block" : "none"}}>
       <EmploymentDetailsForm
      patientId={form.patient_id}          // ⬅️ was patient.patient_id (undefined here)
      onChangeData={onEmploymentChange}    // ⬅️ pass parent setter from App
    />
      </div>

      {/* Patient Tab */}
      <div style={{display: innerTab==="PATIENT" ? "block" : "none"}}>
        <div className="row" style={{padding:"40px 10px 10px 10px"}}>
          <div className="label">User type</div>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <select className="input" value={userType}
              onChange={e=>{ setUserType(e.target.value); setExistingPick(""); }}>
              <option value="New">Private</option>
              <option value="Existing">SOCSO</option>
            </select>

            <input className="input" style={{maxWidth:200}}
              placeholder="Patient ID - IND0002"
              value={form.patient_id || ""}
              onChange={e=>set("patient_id", e.target.value)}
              readOnly={userType==="Existing"}
            />
          </div>
        </div>

        {userType === "Existing" && (
          <div className="row">
            <div className="label" style={{margin:"12px"}}>Find patient</div>
            <div>
              <AsyncPatientSearch value={existingPick} onSelect={(pid)=>setExistingPick(pid)} />
              <div className="hint" style={{marginTop:6}}>
                Search by ID or name. Picking one will auto-fill the form and show history.
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSave} className="form">
          <Row label="Patient name">
            <input className="input" placeholder="Enter Full Name"
              value={form.patient_name || ""}
              onChange={e=>set("patient_name", e.target.value)} />
          </Row>

          <Row label="Date Register OTC">
            <DateTriple form={form} onChange={set} pfx="reg" days={days} months={months} years={years} />
          </Row>

          <Row label="Date of Birth">
            <DateTriple form={form} onChange={set} pfx="dob" days={days} months={months} years={years} />
          </Row>

          <Row label="Gender">
            <select className="input" value={form.gender || ""} onChange={e=>set("gender", e.target.value)}>
              <option value="">— Select Gender —</option>
              <option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option>
            </select>
          </Row>

          <Row label="Marital Status">
            <select className="input" value={form.marital || ""} onChange={e=>set("marital", e.target.value)}>
              <option value="">— Select Status —</option>
              <option>Single</option><option>Married</option><option>Separated</option>
              <option>Divorced</option><option>Widowed</option>
            </select>
          </Row>

          <Row label="Nationality">
            <input className="input" placeholder="e.g., Indian"
              value={form.nationality || ""} onChange={e=>set("nationality", e.target.value)} />
          </Row>

          <Row label="Occupation">
            <input className="input" placeholder="e.g., Engineer"
              value={form.occupation || ""} onChange={e=>set("occupation", e.target.value)} />
          </Row>

          <div className="actions">
            {/* <button
              className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`}
              style={{ margin: "20px" }}
              type="submit"
              disabled={status === "saving"}
              aria-busy={status === "saving"}
            >
              {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save"}
            </button> */}
            {msg && <span className="hint" style={{marginLeft:10}}>{msg}</span>}
          </div>
        </form>

        {userType === "Existing" && (
          <div className="box" style={{marginTop:12}}>
            <div className="box-title">Past visits / improvements</div>
            {history.length === 0 ? (
              <div className="muted">No prior records found.</div>
            ) : (
              <ul className="flat">
                {history.map((h, i)=>(
                  <li key={i}><b>{h.date || h.timestamp || "—"}</b> — {h.summary || h.note || h.detail || "Entry"}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Financial Tab */}
      <div style={{display: innerTab==="FINANCIAL" ? "block" : "none"}}>
        <FinancialDetailsForm
      patientId={form.patient_id}          // ⬅️ use form.patient_id
      onChangeData={onFinancialChange}     // ⬅️ pass parent setter from App
    />
      </div>
    </section>
  );
}


// ---------------- FinancialDetailsForm ----------------
function FinancialDetailsForm({ patientId, onChangeData }) {
  const [data, setData]   = useState({
    payer_type: "Self-pay",
    insurer_existing: "",
    create_new_insurer: "No",
    pricing_policy: "",
    contact_no: "",
    email: "",
    gl_from: "",
    gl_to: "",
    amount_rm: "",
    policy_ref: "",
    oku_holder: "No",
    oku_id: "",
    upload_copy_of_gl: "No change of File",
  });
  const [status, setStatus] = useState("idle");
  const [msg, setMsg]       = useState("");
useEffect(() => {
    onChangeData?.(data);
  }, [data, onChangeData]);
  const set = (k,v)=>setData(prev=>({...prev,[k]:v}));

  const INSURERS = ["AXA","Cigna","Allianz","William Russell","AIA","Bupa","GeoBlue","IMG","MSIG"];
  const PRICING_POLICIES = [
    "Systematic approach",
    "Standing answer to recurring questions",
    "Alignment with business objectives",
    "Consideration of various factors"
  ];

  // Load existing
  useEffect(()=>{
    if (!patientId) return;
    (async ()=>{
      try{
        setMsg("");
        const r = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/financial`);
        if (r.ok){
          const d = await r.json();
          if (d && d.patient_id) {
            setData(prev=>({
              ...prev, ...d,
              amount_rm: d.amount_rm ?? "", // keep editable
              oku_holder: d.oku_holder || "No",
              oku_id: d.oku_id || ""
            }));
          }
        }
      } catch(e){ setMsg(`Load failed: ${e.message}`); }
    })();
  }, [patientId]);

  // Save
  const save = async () => {
    try{
      if (!patientId) { alert("Save Patient Details first to get a Patient ID."); return; }
      setStatus("saving"); setMsg("");

      const payload = { ...data };
      // numeric & conditional cleanup
      const amt = parseFloat(String(payload.amount_rm).replace(/,/g, ""));
      payload.amount_rm = Number.isFinite(amt) ? amt : null;
      if (payload.oku_holder !== "Yes") payload.oku_id = "";

      const r = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/financial`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      const errBody = await (r.ok ? null : r.json().catch(()=>null));
      if (!r.ok) throw new Error(`${r.status} ${errBody?.error || r.statusText}`);

      const out = await r.json();
      setStatus("saved");
      setMsg(out.message || "Financial details saved");
    }catch(e){
      setStatus("idle");
      setMsg(`Save failed: ${e.message}`);
    }
  };

  return (
    <div>
      <div className="barTitle">Financial Details</div>

      <Row label="Payer Type">
        <select className="input" value={data.payer_type} onChange={e=>set("payer_type", e.target.value)}>
          <option>Self-pay</option><option>Insurance</option><option>Corporate</option><option>Government</option><option>Other</option>
        </select>
      </Row>

      <Row label="Create New Insurer / Company?">
        <select className="input" value={data.create_new_insurer} onChange={e=>set("create_new_insurer", e.target.value)}>
          <option>No</option><option>Yes</option>
        </select>
      </Row>

      <div className="barTitle soft">Payer Information</div>

      <Row label="Select Existing Payer">
        <select className="input" value={data.insurer_existing} onChange={e=>set("insurer_existing", e.target.value)}>
          <option value="">— Select Insurer —</option>
          {INSURERS.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </Row>

      <Row label="Pricing Policy">
        <select className="input" value={data.pricing_policy} onChange={e=>set("pricing_policy", e.target.value)}>
          <option value="">— Select Policy —</option>
          {PRICING_POLICIES.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </Row>

      <Row label="Contact No">
        <input className="input" placeholder="e.g., +91-XXXXXXXXXX"
               value={data.contact_no} onChange={e=>set("contact_no", e.target.value)} />
      </Row>

      <Row label="e-Mail">
        <input className="input" placeholder="payer@example.com"
               value={data.email} onChange={e=>set("email", e.target.value)} />
      </Row>

      <Row label="GL Date From">
        <input className="input" type="date" value={data.gl_from} onChange={e=>set("gl_from", e.target.value)} style={{maxWidth:220}} />
      </Row>

      <Row label="To">
        <input className="input" type="date" value={data.gl_to} onChange={e=>set("gl_to", e.target.value)} style={{maxWidth:220}} />
      </Row>

      <Row label="Amount (RM)">
        <input className="input" type="number" step="0.01"
               value={data.amount_rm} onChange={e=>set("amount_rm", e.target.value)} />
      </Row>

      <Row label="Policy Reference">
        <input className="input" placeholder="Policy Reference"
               value={data.policy_ref} onChange={e=>set("policy_ref", e.target.value)} />
      </Row>

      <Row label="OKU Card Holder">
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <select className="input" style={{maxWidth:220}} value={data.oku_holder} onChange={e=>{
            const v = e.target.value; set("oku_holder", v); if (v !== "Yes") set("oku_id", "");
          }}>
            <option>No</option><option>Yes</option>
          </select>
          {data.oku_holder === "Yes" && (
            <input className="input" style={{maxWidth:260}} placeholder="Enter OKU ID"
                   value={data.oku_id} onChange={e=>set("oku_id", e.target.value)} />
          )}
        </div>
      </Row>

      <Row label="Upload Copy of GL">
        <select className="input" value={data.upload_copy_of_gl} onChange={e=>set("upload_copy_of_gl", e.target.value)}>
          <option>No change of file</option>
          <option>Upload now (coming soon)</option>
        </select>
      </Row>

      <div className="actions">
        <button
          className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`}
          style={{ margin: "20px" }}
          type="button"
          onClick={save}
          disabled={status === "saving" || !patientId}
          aria-busy={status === "saving"}
        >
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save Financial"}
        </button>
        {msg && <span className="hint" style={{marginLeft:10}}>{msg}</span>}
        {!patientId && <span className="hint" style={{marginLeft:10}}>Save Patient Details first to get a Patient ID.</span>}
      </div>
    </div>
  );
}


// ---------------- EmploymentDetailsForm ----------------
function EmploymentDetailsForm({ patientId , onChangeData }) {
  const [data, setData] = useState({
    employment_status: "Unemployed",
    occupation: "",
    industry: "Others",
    last_drawn_salary_rm: "0.00",
    osi_code: "U",
    osi_label: "Unemployed",
  });
  const [status, setStatus] = useState("idle");
  const [msg, setMsg]       = useState("");

  const set = (k,v)=>setData(prev=>({...prev,[k]:v}));

  const EMPLOYMENT_STATUSES = [
    "Unemployed","Employed - Full-time","Employed - Part-time",
    "Self-employed","Student","Retired","Homemaker","Unable to work","Other"
  ];
  const INDUSTRIES = [
    "Healthcare","Information Technology","Education","Finance",
    "Manufacturing","Retail","Hospitality","Construction","Public Sector","Others"
  ];
  const OSI_OPTIONS = [
    { code:"U", label:"Unemployed (U)" },
    { code:"R", label:"Realistic (R)" },
    { code:"I", label:"Investigative (I)" },
    { code:"A", label:"Artistic (A)" },
    { code:"S", label:"Social (S)" },
    { code:"E", label:"Enterprising (E)" },
    { code:"C", label:"Conventional (C)" },
  ];
useEffect(() => {
    onChangeData?.(data);
  }, [data, onChangeData]);

  // Load existing
  useEffect(()=>{
    if (!patientId) return;
    (async ()=>{
      try{
        setMsg("");
        const r = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/employment`);
        if (r.ok){
          const d = await r.json();
          if (d && d.patient_id) {
            setData(prev=>({
              ...prev,
              ...d,
              last_drawn_salary_rm: (d.last_drawn_salary_rm ?? "0.00").toString(),
              osi_code: d.osi_code || "U",
              osi_label: d.osi_label || "Unemployed"
            }));
          }
        }
      } catch(e){ setMsg(`Load failed: ${e.message}`); }
    })();
  }, [patientId]);

  // Save
  const save = async () => {
    try{
      if (!patientId) { alert("Save Patient Details first to get a Patient ID."); return; }
      setStatus("saving"); setMsg("");

      const payload = {
        ...data,
        last_drawn_salary_rm: data.last_drawn_salary_rm === "" ? 0.0 : Number(data.last_drawn_salary_rm),
      };

      const r = await fetch(`${API}/patients/${encodeURIComponent(patientId)}/employment`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      const errBody = await (r.ok ? null : r.json().catch(()=>null));
      if (!r.ok) throw new Error(`${r.status} ${errBody?.error || r.statusText}`);

      const out = await r.json();
      setStatus("saved");
      setMsg(out.message || "Employment details saved");
    }catch(e){
      setStatus("idle");
      setMsg(`Save failed: ${e.message}`);
    }
  };

  return (
    <div>
      <div className="barTitle">Employment Details</div>

      <Row label="Current Employment Status *">
        <select className="input" value={data.employment_status} onChange={e=>set("employment_status", e.target.value)}>
          {EMPLOYMENT_STATUSES.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </Row>

      <Row label="Occupation">
        <input className="input" placeholder="e.g., Teacher / Engineer / NA"
               value={data.occupation} onChange={e=>set("occupation", e.target.value)} />
      </Row>

      <Row label="Industry">
        <select className="input" value={data.industry} onChange={e=>set("industry", e.target.value)}>
          {INDUSTRIES.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
      </Row>

      <Row label="Last Drawn Salary (RM) *">
        <input className="input" type="number" step="0.01"
               value={data.last_drawn_salary_rm}
               onChange={e=>set("last_drawn_salary_rm", e.target.value)} />
      </Row>

      <Row label="Occupational Search Inventory (OSI)">
        <select className="input"
                value={data.osi_code}
                onChange={e=>{
                  const code = e.target.value;
                  const opt = OSI_OPTIONS.find(o=>o.code===code);
                  set("osi_code", code);
                  set("osi_label", opt?.label || "");
                }}>
          {OSI_OPTIONS.map(o => <option key={o.code} value={o.code}>{o.label}</option>)}
        </select>
      </Row>

      <div className="actions">
        <button
          className={`btn savebtn ${status === "saving" ? "is-busy" : ""}`}
          style={{ margin: "20px" }}
          type="button"
          onClick={save}
          disabled={status === "saving" || !patientId}
          aria-busy={status === "saving"}
        >
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save Employment"}
        </button>
        {msg && <span className="hint" style={{marginLeft:10}}>{msg}</span>}
        {!patientId && <span className="hint" style={{marginLeft:10}}>Save Patient Details first to get a Patient ID.</span>}
      </div>
    </div>
  );
}



 
function AsyncPatientSearch({ value, onSelect }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState([]);
  const [busy, setBusy] = useState(false);
 
  useEffect(() => {
    if (!q || q.length < 2) { setOpts([]); return; }
    const t = setTimeout(async () => {
      try {
        setBusy(true);
        const r = await fetch(`${API}/patients/search?q=${encodeURIComponent(q)}`);
        if (r.ok) {
          const a = await r.json(); // [{patient_id, patient_name, date_of_birth}]
          const mapped = a.map(p => ({
            value: p.patient_id,
            label: `${p.patient_id} — ${p.patient_name || ""}${p.date_of_birth ? ` (${p.date_of_birth})` : ""}`
          }));
          setOpts(mapped);
          setOpen(true);
        }
      } finally { setBusy(false); }
    }, 280);
    return () => clearTimeout(t);
  }, [q]);
 
  return (
    <div className="ms" style={{width: 420, position:"relative",paddingRight:"20px"}}>
      <input
        className="input"
        placeholder="Type patient ID or name…"
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        onFocus={()=>q && setOpen(true)}
      />
      {open && opts.length>0 && (
        <div className="ms-pop" style={{position:"absolute", width:"100%"}}>
          <div className="ms-list">
            {opts.map(o => (
              <div key={o.value} className="ms-item"
                   onClick={() => { onSelect(o.value); setQ(o.label); setOpen(false); }}>
                {o.label}
              </div>
            ))}
          </div>
        </div>
      )}
      {busy && <div className="hint" style={{marginTop:6}}>Searching…</div>}
    </div>
  );
}
 
/* ---------------- Reusable MultiSelect ---------------- */
function MultiSelect({ options, selected, onChange, placeholder="Select…", width=420 }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
 
  const filtered = useMemo(() => {
    const s = (q || "").toLowerCase();
    if (!s) return options;
    return options.filter(o =>
      o.value.toLowerCase().includes(s) ||
      (o.label || "").toLowerCase().includes(s)
    );
  }, [q, options]);
 
  const toggle = (val) => {
    const next = new Set(selected);
    if (next.has(val)) next.delete(val); else next.add(val);
    onChange(next);
  };
  const allVisibleSelected = filtered.length > 0 && filtered.every(o => selected.has(o.value));
  const selectAllVisible = () => {
    const next = new Set(selected);
    filtered.forEach(o => next.add(o.value));
    onChange(next);
  };
  const clearVisible = () => {
    const next = new Set(selected);
    filtered.forEach(o => next.delete(o.value));
    onChange(next);
  };
 
  return (
    <div className="ms" style={{width}}>
      <button type="button" className="ms-btn" onClick={()=>setOpen(o=>!o)}>
        {selected.size ? `${selected.size} selected` : placeholder}
        <span className="ms-caret">▾</span>
      </button>
 
      {open && (
        <div className="ms-pop">
          <div className="ms-hdr">
            <input className="ms-search" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)} />
            <div className="ms-actions">
              <button className="ms-mini" onClick={selectAllVisible} disabled={filtered.length===0 || allVisibleSelected}>Select All</button>
              <button className="ms-mini" onClick={clearVisible} disabled={filtered.length===0}>Clear</button>
              <button className="ms-mini" onClick={()=>setOpen(false)}>Apply</button>
            </div>
          </div>
          <div className="ms-list">
            {filtered.length===0 ? (
              <div className="ms-empty">No matches</div>
            ) : filtered.map(o => (
              <label key={o.value} className="ms-item">
                <input type="checkbox" checked={selected.has(o.value)} onChange={()=>toggle(o.value)} />
                <span>{o.label || o.value}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
 
/* ---------------- Common Rows ---------------- */
function Row({label, children, icon}) {
  return (
    <div className="row">
      <div className="label">
        <div>{label}</div>
        {icon && <span className="icon" title="visibility">{icon}</span>}
      </div>
      <div>{children}</div>
    </div>
  );
}
function DateTriple({form, onChange, pfx, days, months, years}) {
  return (
    <div className="triple">
      <select className="input" value={form[`${pfx}_day`]} onChange={e=>onChange(`${pfx}_day`, e.target.value)}>
        <option value="">DD</option>{days.map(d=><option key={d} value={d}>{d}</option>)}
      </select>
      <select className="input" value={form[`${pfx}_month`]} onChange={e=>onChange(`${pfx}_month`, e.target.value)}>
        <option value="">MM</option>{months.map(m=><option key={m.v} value={m.v}>{m.n}</option>)}
      </select>
      <select className="input" value={form[`${pfx}_year`]} onChange={e=>onChange(`${pfx}_year`, e.target.value)}>
        <option value="">YYYY</option>{years.map(y=><option key={y} value={y}>{y}</option>)}
      </select>
      <span className="calendar" title="calendar">📅</span>
    </div>
  );
}
 
/* ---------------- Styles ---------------- */
function StyleBlock() {
  return (
    <style>{`
      :root { --bg:#f6fbff; --ink:#000332; --ink2:#5a6b85; --stroke:#e6eef7; --focus:#2563eb; }
      * { box-sizing:border-box; }
      body { margin:0; background:var(--bg); font-family:system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
      .page { display:grid; grid-template-columns:300px 1fr; min-height:100vh;background-color:#F1F4F4 !important; }
      .rail { background:#fff; box-shadow: 2px 0 8px rgb(0 0 0 / 3%);color:#cbd5e1;gap:12px; 
               position:sticky; top:0; padding-top:45px; height:100vh; display:flex; flex-direction:column;  overflow-y:auto;}
      .brand { color:#e2e8f0; font-weight:900; letter-spacing:.2px; padding:10px 12px; border-radius:12px;
               background:rgba(255,255,255,.04); box-shadow:inset 0 0 0 1px rgba(255,255,255,.05); }
      .tabs { display:flex; flex-direction:column;  }
      .tab {
  appearance:none;
  padding:16px 10px;
  font-size:14px;
  width:100%;
  text-align:left;
  background:#fff;
  color:#000332 !important;
  border:0;
  border-radius:12px;
  cursor:pointer;
  transition:background .18s, color .18s, box-shadow .18s, transform .02s;
  display:flex; align-items:center; gap:8px; /* NEW */
}

      .tab:hover { background:rgb(190 205 207 / 22%); color:#fff; }
      .tab:active { transform:translateY(1px); }
      .tab.active { color:#fff; background:rgb(190 205 207 / 22%);
                    box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), 0 10px 24px rgba(2,132,199,.18); }
      .tab:focus-visible { outline:none; box-shadow:0 0 0 3px rgba(56,189,248,.45); }
 
      // .main { padding:24px; }
      .card { background:transparent; border:none; }
      .title { margin:0 0 6px; color:#3A3FAD; font-size:1.5rem; line-height:1.8em}
      .subtitle { margin:0 0 14px; color:var(--ink2); }
      .note { margin-top:10px; border:1px solid #e0e7ff; background:#f6f9ff; padding:10px; border-radius:10px; color:#3b5bcc; }
 /* Inner top tabs (image-2 style) */
.innerTabs { display:flex; gap:16px; flex-wrap:wrap;background:#EEF6FF;font-weight:500; color:#000332; border-bottom:1px solid #EEF6FF; }
.innerTab { appearance:none; background:transparent; border:0; padding:8px 10px; font-weight:500; color:#000332; border-radius:8px; }
.innerTab.active {  color:#000332; border-bottom:3px solid #3A3FAD;border-radius:0; }
.innerTab:disabled {  cursor:not-allowed;font-weight:500; color:#000332; }
.innerTab:hover { background:rgb(190 205 207 / 22%);  }

/* Blue strip titles like the screenshot */
.barTitle { font-weight:600; color:#000332; padding:40px 10px 20px 10px;  }
/* Outer panel to mimic the bordered card in the screenshot */
.landing-frame {


  padding: 24px 24px 32px;
  background: #ffffff;
 
  border-radius: 4px;
}

/* Title + subtitle centered */
.landing-header {
  text-align: center;
  margin-bottom: 12px;
}
.landing-header h1 {
  margin: 0 0 4px 0;
  font-weight: 700;
  font-size: 50px; /* adjust if needed */
  color: #3A3FAD;
}
.landing-header p {
  margin: 0;
  color: #000;
  font-size: 25px;
}

/* Two-column body: image left, buttons right */
.landing-body {
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 32px;
  align-items: center;
  margin-top: 56px;
}

/* Illustration */
.landing-hero img {
  display: block;
  width: 650px;
  height: 400px;
  margin: 0 auto;
  border-radius: 4px; /* optional */
}

/* Buttons column */
.landing-actions {
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
}

/* Outline buttons (rounded, orange border like screenshot) */
.cta-btn {
  width: 100%;
  padding: 16px 20px;
  background: #fff;
  border: 0.8px solid #3A3FAD;         /* orange outline */
  border-left:4px solid #f14f2c;
  color: #111827;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: box-shadow .15s ease, transform .05s ease, background .15s ease;
}
.cta-btn:hover {
  background: #fff8f5;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}
.cta-btn:active {
  transform: translateY(1px);
}

/* Responsive: stack on small screens */
@media (max-width: 820px) {
  .landing-body { grid-template-columns: 1fr; }
  .landing-actions { max-width: 320px; margin: 0 auto; width: 100%; }
}


      .row { display:grid; grid-template-columns:260px 1fr; gap:14px; align-items:center; margin:12px 25px; }
      .label { font-weight:500; color:#000332;font-size:16px; display:flex; align-items:center; gap:8px; }
      .input { width:100%; padding:0px 10px; border-radius:12px; border:1px solid #dbe6f3; background:#fff;height:40px;font-size:15px;  }
      .input:focus { outline:none; border-color:var(--focus); box-shadow:0 0 0 3px rgba(37,99,235,.12); }
      .triple { display:flex; gap:8px; align-items:center; }
      .form { margin:0; padding:5px 10px 10px 10px; border-radius:10px; box-shadow:0 !important; display:block; }
      .actions { display:flex; gap:10px; padding-top:10px; }
      .btn {
    appearance: none;
    background: transparent;
    border: 0;
    padding: 8px 10px;
    
    font-weight: 500;
    color: #000332;
    border-radius: 8px;
}

/* --- VITALS UI --- */
.vitals { --bg:#fbfdff; --bd:#e6eef6; --text:#0f172a; --muted:#6b7a90; --ring:#90b4ff; }
.vitals .section { background: var(--bg); border: 1px solid var(--bd); border-radius: 12px; padding: 12px 16px; }
.vitals .grid { display:grid; grid-template-columns: repeat(12, minmax(0,1fr)); gap: 10px; }
.vitals .field { display:flex; flex-direction:column; }
.vitals .label-sm { font-size:13px; color:#323e4e; margin:2px 0 4px; }
.vitals .control { position:relative; }
.vitals .input-sm, .vitals .select-sm, .vitals .ta-sm {
  width:100%; height:34px; padding:6px 10px; border:1px solid #9daab7; border-radius:6px;
  background:#fff; outline:0; font-size:13px;
}
.vitals .ta-sm { height:auto; resize:vertical; }
.vitals .input-sm:focus, .vitals .select-sm:focus, .vitals .ta-sm:focus {
  background:#fff; border-color:var(--ring); box-shadow:0 0 0 3px rgba(59,130,246,.15);
}
.vitals .num { text-align:right; }
.vitals .addon { position:absolute; right:8px; top:7px; font-size:12px; color:#9aa4b2; pointer-events:none; }
.vitals .right { text-align:right; }
.vitals .chip-info { font-size:12px; color:#94a3b8; }
.vitals .btn-link { border:0; background:transparent; color:#2563eb; cursor:pointer; padding:0 4px; height:auto; }
.vitals .vtable { width:100%; border-collapse:separate; border-spacing:0 8px; }
.vitals .vtable th { font-size:12px; color:var(--muted); font-weight:600; padding:0 6px 2px;  }
.vitals .vrow { display:grid; grid-template-columns: 120px repeat(3, 1fr); gap:10px;row-gap: 20px;margin-bottom:20px;  align-items:center; }
.vitals .vrow .pos { color:var(--text); font-size:13px; padding-left:6px; }


      .btn.active {
    color: #000332;
    border-bottom: 3px solid #3A3FAD;
    border-radius: 0;
}
 .ba{
    border: 2px solid #1a1c1a;
    background-color: #fff;
    color: #343fac;
    padding: 0px 5px;
}
    .oi {
    border: 2px solid #2c2828;
}
      /* chips */
      .chip { display:inline-flex; align-items:center; gap:6px; padding:4px 8px;
               border:1px solid #cfe1ff; border-radius:10px;  }
      .chip-x { border:0; background:transparent; cursor:pointer; font-weight:800;
    color: #000332 !important;
    margin: 0px !important; }
 
      /* multiselect */
      .ms { position:relative; }
      .catTabs {
  display:flex; gap:8px; flex-wrap:wrap; margin:4px 0 10px;
}
  .buttonbar{
    display: flex
;
    gap: 16px;
   
    flex-wrap: wrap;
    background: #EEF6FF;
    font-weight: 500;
    color: #000332;
    border-bottom: 1px solid #EEF6FF;
}
.catTab {
  padding:8px 12px; border-radius:10px;
  border:1px solid #dbe6f3; background:#fff; cursor:pointer;
  font-weight:700; color:#000332;
}
.catTab.active {
  background:#000332; border-color:#000332; color:#fff;
}
  /* RAP layout — airy, not congested */
.rap-wrap { padding: 0 10px 10px; }
.rap-header { display:flex; align-items:center; justify-content:space-between; margin: 20px 25px 10px; }
.pill.right { padding:6px 10px; border-radius:999px; background:#eef6ff; border:1px solid #cfe1ff; color:#000332; font-weight:500; }

.rap-card { margin: 12px 5px; padding: 16px; background:#fff; border-radius:10px; border:1px solid #e6eef7; }
.check-grid {
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 18px;
  margin-top: 8px;
}
.check { display:flex; gap:10px; align-items:center; color:#000332; }
.check input { transform: translateY(1px); }
/* Dashboard */
.dash-wrap { padding: 0 10px 10px; }
.dash-card {
  background:#fff; border:1px solid #e6eef7; border-radius:12px;
  padding:16px; margin: 12px 25px;
}
  
  .user{
  cursor: pointer; 
      
      height: 250px; 
      border: 1px solid #ddd; 
      border-radius: 8px; 
      padding: 20px; 
      textAlign: center; 
      boxShadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background: #fff;}
.glance-head { display:flex; gap:20px; align-items:flex-start; justify-content:space-between; }
.g-title { font-weight:600; color:#000332; margin-bottom:10px; }
.g-row { display:grid; grid-template-columns: 160px 1fr; gap:12px; margin:10px 0; }
.g-label { font-size:12px; color:#6b7280; letter-spacing:.2px; font-weight:600; }
.g-name { font-weight:700; color:#0f172a; }
.g-meta { color:#475569; font-size:13px; margin-top:2px; }
.g-tags { display:flex; gap:6px; flex-wrap:wrap; }
.tag {
  display:inline-flex; gap:6px; padding:4px 8px;
  border-radius:9999px; background:#f7fafc; border:1px solid #e6eef7; color:#0f172a;
}
.topbtn{
padding: 5px 15px;
    background-color: #3A3FAD;
    color: #fff;
    margin: 5px;
}
.glance-r { min-width: 280px; max-width: 360px; }
.rtw-title { font-weight:600; color:#000332; margin-bottom:6px; text-align:right; }
.rtw-bar { height:10px; border-radius:999px; background:#eef2ff; border:1px solid #dbe6f3; overflow:hidden; }
.rtw-fill { height:100%; background:#3A3FAD; }
.rtw-note { margin-top:6px; font-size:12px; color:#374151; text-align:right; }

.dash-table { width:100%; border-collapse:separate; border-spacing:0; margin-top:6px; }
.dash-table th, .dash-table td { border-bottom:1px solid #eef3fb; padding:10px; text-align:left; font-size:14px; }
.dash-table thead th { background:#f7fafc; color:#334155; font-weight:600; }

.progress-row { display:grid; grid-template-columns: 160px 1fr 60px; gap:12px; align-items:center; margin-top:14px; }
.progress { position:relative; height:10px; border-radius:8px; background:#eef2ff; overflow:hidden; border:1px solid #dbe6f3; }
.progress .bar { position:absolute; top:0; left:0; bottom:0; background:#3A3FAD; }
.pct { font-weight:600; color:#000332; text-align:right; }

.rap-form .row { display:grid; grid-template-columns: 220px 1fr; gap:14px; align-items:center; margin:10px 0; }
@media (max-width: 900px) {
  .rap-form .row { grid-template-columns: 1fr; }
  .check-grid { grid-template-columns: 1fr; }
  .progress-row { grid-template-columns: 1fr; }
  .pct { text-align:left; }
}
.audit-wrap .cardheading { display:flex; align-items: baseline; gap:16px; }
.audit-wrap .subtitle { color:#708090; margin-left:auto; font-size:12px; }
.audit-mode button { margin-left:6px; padding:4px 10px; border-radius:9999px; border:1px solid #ddd; background:#fff; cursor:pointer; }
.audit-mode .on { background:#eef2ff; border-color:#c7d2fe; }

.audit-timeline { position:relative; padding-left: 12px; }
.audit-timeline::before { content:""; position:absolute; left: 21px; top: 0; bottom: 0; width: 2px; background:#e6e8eb; }
.audit-day { padding-left: 36px; margin: 14px 0; }
.date-badge { display:inline-block; padding:2px 10px; border-radius:9999px; background:#f3f4f6; font-weight:600; font-size:12px; margin-bottom:8px; }
.audit-item { position:relative; background:#fff; border:1px solid #eee; border-radius:10px; padding:10px 12px; margin:10px 0; box-shadow:0 1px 2px rgba(0,0,0,0.03); }
.audit-item .dot { position:absolute; left:-30px; top:14px; width:10px; height:10px; border-radius:50%; background:#4f46e5; box-shadow:0 0 0 4px #eef2ff; }
.audit-item .when { font-size:12px; color:#6b7280; margin-bottom:4px; }
.audit-item .what { font-weight:500; }

.audit-table table { width:100%; border-collapse: collapse; }
.audit-table thead th { text-align:left; padding:10px; background:#15803d; color:#fff; }
.audit-table tbody td { padding:10px; border-bottom:1px solid #eee; vertical-align: top; }
.audit-table tbody tr:hover { background:#fafafa; }

/* Audit Trail */
.audit-wrap { padding-bottom: 10px; }
.audit-list { list-style:none; margin: 10px 25px; padding:0; }
.audit-list li { display:flex; gap:12px; align-items:flex-start; padding:10px 0; position:relative; }
.audit-list li + li { border-top: 1px dashed #e8eef8; }
.audit-list .dot { width:10px; height:10px; border-radius:50%; background:#3A3FAD; margin-top:8px; }
.audit-list .entry .when { font-weight:600; color:#000332; }
.audit-list .entry .what { color:#374151; margin-top:2px; }

.catTab:disabled { opacity:.5; cursor:not-allowed; }
      .ms-btn { width:100%; text-align:left; padding:10px 12px; border-radius:12px; border:1px solid #dbe6f3; background:#fff;color:#00345f; }
      .ms-caret { float:right; opacity:.6; }
      .ms-pop { position:absolute; z-index:20; margin-top:6px; width:100%; background:#fff; border:1px solid #dbe6f3;
                border-radius:12px; box-shadow:0 10px 28px rgba(12,46,87,.08); }
      .ms-hdr { padding:10px; border-bottom:1px solid #eef3fb; display:flex; gap:8px; align-items:center; }
      .ms-search { flex:1; padding:8px 10px; border-radius:8px; border:1px solid #dbe6f3; }
      .ms-actions { display:flex; gap:6px; }
      .ms-mini { padding:6px 8px; border-radius:8px; border:1px solid #dbe6f3; background:#f9fbff; cursor:pointer; color:#00345f; }
      .ms-list { max-height:260px; overflow:auto; padding:8px 10px; }
      .ms-item { display:flex; gap:8px; align-items:center; padding:6px 4px;font-size: 14px; }
      .ms-empty { padding:12px; color:#6b7280; }
 .savebtn{
 border:1px solid #000;background:#fff;color:#000;}
      /* Summary page */
      .grid2 { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
      // .box { border:1px solid var(--stroke); background:#fff; border-radius:12px; padding:12px; }
      .box-title { font-weight:500; color:#000332; margin-bottom:8px; font-size:16px;}
 .cardheading {
    background-color: white;
    padding: 25px;
    margin: 10px 25px;
    border-radius: 6px;
    border-left: 4px solid #3A3FAD;
}
    .savebtn:hover{
    background:#000;
    color:#fff;}
    .ms-btn:hover { background: transparent !important; }
    h2{font-size:1.5rem !important;  }
      .kv { display:flex; justify-content:space-between; gap:14px; padding:6px 0; border-bottom:1px dashed #edf2fb; }
      .kv:last-child { border-bottom:0; }
      .kv > span { color:#4b5563; }
      .kv-inline { margin-right:12px; color:#374151; }
 
      .icf-list { display:flex; flex-direction:column; gap:10px; }
      .icf-row { padding:10px; border:1px solid #e9eef7; border-radius:10px;  }
      .icf-head { margin-bottom:4px; }
      .icf-sub { color:#334155; }
      .badge { display:inline-flex; align-items:center; gap:6px; padding:2px 8px; border-radius:12px; background:#eef6ff; border:1px solid #cfe1ff;color:#000332; font-size:12px; }
      .badge.soft { background:#f7fafc; border-color:#e5edf7; }
 
      .pill { padding:8px 12px; border:1px solid #dbe6f3; border-radius:12px; background:#fff; }
     ul.flat { list-style:none; margin:0; padding-left:25px; }
      ul.flat li { margin:6px 0; }
      .dim { color:#6b7280; }
      .muted { color:#6b7280; }
 
      /* Top bar inside card */
      .card-head { display:flex !important; align-items:center; justify-content:space-between; margin-bottom: 6px; }
      .btn.ai { opacity:.7; cursor:not-allowed; background:#f5f7fb; border-color:#dbe6f3; }

/* SOAP / TPS / RAP visuals to match your screenshots */
.soap-head, .tps-head, .rap-head {
  display:flex; align-items:center; justify-content:space-between;
  padding: 10px 25px 0 25px;
}
.soap-title { font-weight:600; color:#000332; font-size:16px; }

.soap-grid {
  display:grid; grid-template-columns: 1fr 1fr; gap:12px; padding: 10px 25px 0 25px;
}
.box.soft { background:#fff; border:1px solid #e9eef7; border-radius:12px; padding:12px; }

/* compact “tiny” button used in TPS head */
.btn.tiny { border:1px solid #dbe6f3; padding:6px 8px; border-radius:8px; background:#f6f9ff; }

/* tables */
.table { width:100%; border-collapse:separate; border-spacing:0; }
.table th, .table td { border-bottom:1px solid #eef3fb; padding:10px; text-align:left; font-size:14px; }
.table thead th { background:#f7fafc; color:#334155; font-weight:600; }

/* progress bar (RAP) */
.progress { display:grid; grid-template-columns: 1fr auto; gap:10px; align-items:center; padding:10px 0 0 0; }
.progress-label { grid-column:1 / 3; color:#000332; font-weight:600; margin-bottom:2px; }
.meter { height:10px; border-radius:999px; background:#eef3fb; overflow:hidden; }
.meter-fill { height:100%; background:#3A3FAD; }

/* left-rail percent bubble for RAP */
.nav-badge {
  margin-left:auto; margin-right:8px;
  padding:2px 8px; border-radius:999px; background:#eef6ff; border:1px solid #cfe1ff; color:#000332; font-size:12px;
}

/* documents */
.doc-head { display:flex; align-items:center; justify-content:space-between; }
.table.doc td, .table.doc th { padding-left:16px; padding-right:16px; }
.dropzone {
  margin-top:12px; border:2px dashed #dbe6f3; background:#f9fbff; color:#6b7280;
  border-radius:12px; padding:18px; text-align:center;
}
.svg-icon{color:#fff}
/* audit trail */
.timeline { margin: 10px 25px; position:relative; padding-left:16px; }
.t-item { display:flex; gap:12px; margin:14px 0; }
.t-dot { width:10px; height:10px; background:#3A3FAD; border-radius:50%; margin-top:6px; }
.t-body { }
.t-date { font-weight:600; color:#000332; margin-bottom:4px; }
.t-text { color:#334155; }

.btnexport{
    color: #3a3fad;
    background-color: #fff;
    padding: 10px;
    width: 150px;
    border: 1px solid #3a3fad;
    margin: 20px;
}
.icon{
  color: #fff;
  margin-right: 8px;
  background-color: #3a3fad;
  border-radius: 50px;
  padding: 4px;
}
svg { color: #3a3fad; }

    svg{color: #3a3fad;
    }
      /* Textarea visual */
      .input.ta { resize: vertical; min-height: 100px; }
 
      /* Tiny gray helper text */
      .hint { font-size: 12px; color: #6b7280; margin-top: 6px; }
 
      .preview { margin-top:12px; background:#0b1f3a; color:#e8f0ff; padding:12px; border-radius:12px; overflow:auto; }
      @media (max-width:900px){ .row{ grid-template-columns:1fr; } }
    `}</style>
  );
}