import { useEffect, useMemo, useState } from "react";
import * as React from "react";
// Font Awesome icons
import { useParams } from "react-router-dom";
import DashboardTab from "../components/DashboardTab";
import ClinicalSwallowEvaluation from "../components/ClinicalSwallowEvaluation";
import DietDepartmentPage from "../features/Dietetics/pages/DietPatientspage";
import ICDExisting from "../components/ICDExisting";
import PatientsToDepartments from "../components/PatientsToDepartments";
import PatientsByDepartment from "../components/PatientsByDepartment";
import VitalsTab from "../components/VitalsTab";
import AssessmentsPanel from "../components/AssessmentsPanel";
import DepartmentPage from "../features/PT/pages/Patientspage";
import AudiologyDepartmentPage from "../features/Audiology/pages/AudioDashboard";
import PatientRegister from "../features/CustomerService/pages/PatientRegistration"
import BASEASSESSMENT from "../components/BASEASSESSMENT";
import RAPTab from "../components/RAPTab";
import TaskPerformanceSimulationTab from "../components/TaskPerformanceSimulationTab";
import AssessmentEncounterTab from "../components/AssessmentEncounterTab";
import NewAssessmentTab from "../components/NewAssessmentTab";
import MultiSelect from "../components/MultiSelect";
import SidebarNav from "../components/SidebarNav";
import DocumentsTab from "../components/DocumentsTab";
import PablotList from "../components/Pablot"
import ICFTab from "../components/ICFTab";
import ICDNormal from "../components/ICDNormal";
import ICFNormal from "../components/ICFNormal";
import PharmacyDetailsCaptureTab from "../components/PharmacyDetailsCaptureTab";
import ICHITab from "../components/ICHITab";
import TopToolbar from "../components/TopToolbar";
import ICDInfinite from "../components/ICDInfinite";
import RAPFinal from "../components/RAPFinal"
import ICDAD from "../components/ICDAssignDoctor";
import "chart.js/auto";
import DoctorsDepartmentPage from "../features/Doctors/pages/DoctorsPatientspage";
import AuditTrailTab from "../components/AuditTrailTab";
import StyleBlock from "../components/StyleBlock";
import AsyncPatientSearch from "../components/AsyncPatientSearch";
import EmploymentDetailsForm from "../components/EmploymentDetailsForm";
import FinancialDetailsForm from "../components/FinancialDetailsForm";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import PatientSummary from "../components/PatientSummary";
import NurseBaseAssessment from "../components/NurseBaseAssessment";
import GasGoalsNATab from "../components/GasGoalsNATab";
import RowCard from "../components/RowCard";
import { sx } from "../components/RowCard";
import InvestigationsChecklist from "../components/InvestigationsChecklist";
import BookAppointmentTab from "../components/BookAppointmentTab";
import GasGoalsTab from "../components/GasGoalsTab";
import PsychologyDashboard from "../features/Psychology/components/PychologyDashboard";
import GlobalVitalsOverlay from "../components/GlobalVitalsOverlay";
import SpeechAndLanguage from "../features/SpeechandLanguage/SpeechandlanguageDashboard"
import OptometryDashboard from "../features/Optometry/OptometryDashboard";
import ProstheticsAndOrthoticsDashboard from "../features/Prosthetics & Orthotics/ProstheticsAndOrthoticsDashboard";
import NursingDepartmentPage from "../features/Nursing/pages/NursingPatientspage";
import OtDepartmentPage from "../features/OT/pages/Patientspage";
import MedicalAssistantPatientspage from "../features/MedicalAssistant/pages/MedicalAssistantPatientspage";
const username = localStorage.getItem("username");
const userRole = localStorage.getItem("userRole");

/* If CRA proxy set to http://127.0.0.1:5000 keep API="". Otherwise set REACT_APP_API. */
const API = process.env.REACT_APP_API || "";

export default function App() {
  const [tab, setTab] = useState(""); // "PERSONAL" | "ICD" | "ICF" | "ICHI" | "SUMMARY"

  const { mode } = useParams();
  const [userType, setUserType] = useState("");
  const [icdCode, setIcdCode] = useState(""); // deepest ICD from ICD tab
  const [showVitals, setShowVitals] = useState(false);
  const [vitalsPatient, setVitalsPatient] = useState(null);
  const [icdPath, setIcdPath] = useState([]); // [{ depth, table, key, label }]
  const [financialState, setFinancialState] = useState(null);
  const [employmentState, setEmploymentState] = useState(null);
  const [icfCode, setIcfCode] = useState(""); // optional single ICF child context for ICHI
  // inside App()
  const [soap, setSoap] = useState({}); // Assessment & Encounter (SOAP)

  const [tps, setTps] = useState({}); // TPS
  // RAP state removed (unused)
  const [rapPercent, setRapPercent] = useState(0); // show "60%" in left rail
  const handleUserSelection = (type) => {
    setUserType(type);
    if (type === "NEW_USER") {
      // Show the Patient Details tab for New User
      setTab("PERSONAL");
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
    reg_day: "",
    reg_month: "",
    reg_year: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    gender: "",
    marital: "",
    nationality: "",
    occupation: "",
  });
  const [patients, setPatients] = useState([]);
  function updatePatientInMainList(updatedPatient) {
    setPatients(prev =>
      prev.map(p => p.id === updatedPatient.id ? updatedPatient : p)
    );
  }


  // Summaries emitted from sub-tabs
  const [icfSummary, setIcfSummary] = useState([]); // array of normalized records
  const [ichiSummary, setIchiSummary] = useState({
    selected: [],
    modalities: [],
    note: "",
  });
  // Compute RAP % centrally and show in left rail


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
      employer: false,
    },
    start_date: "",
    duration_weeks: 4,
    placement: "Light assembly / QC",
    restrictions: "No lifting >10kg; avoid ladder work; adjustable workstation",
  });
  useEffect(() => {
    const total = 6;
    const done = Object.values(rapData.checks || {}).filter(Boolean).length;
    setRapPercent(Math.round((done / total) * 100));
  }, [rapData]);
  const [auditItems, setAuditItems] = useState([]); // [{date:'YYYY-MM-DD', text:'...'}]
  const addAudit = (text) =>
    setAuditItems((prev) => [
      { date: new Date().toISOString().slice(0, 10), text },
      ...prev,
    ]);

  // Adapt the selector to your icfSummary shape.
  const icfChildren = useMemo(() => {
    // accept either array from ICFTab, or an object that holds an array in `.selected`
    const rows = Array.isArray(icfSummary)
      ? icfSummary
      : Array.isArray(icfSummary?.selected)
        ? icfSummary.selected
        : [];

    // map both possible key names & make unique
    const codes = rows
      .map((r) => r.child_icf || r.icf_child_code)
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
        date_register_otc: patient.date_register_otc || null,
      };

      if (!pid) {
        const r = await fetch(`${API}/patients`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(personal),
        });
        if (!r.ok) throw new Error(`Personal create failed (${r.status})`);
        const out = await r.json();
        pid = out.patient_id;
        setPatient((p) => ({ ...p, patient_id: pid })); // <-- this MUST happen
      } else {
        const r = await fetch(`${API}/patients/${encodeURIComponent(pid)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(personal),
        });
        if (!r.ok) throw new Error(`Personal update failed (${r.status})`);
      }

      // 2) Financial (if that tab provided data)
      if (financialState) {
        const fin = { ...financialState };
        const amt = parseFloat(String(fin.amount_rm ?? "").replace(/,/g, ""));
        fin.amount_rm = Number.isFinite(amt) ? amt : null;
        if (fin.oku_holder !== "Yes") fin.oku_id = "";
        const r = await fetch(
          `${API}/patients/${encodeURIComponent(pid)}/financial`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fin),
          }
        );
        if (!r.ok) throw new Error(`Financial save failed (${r.status})`);
      }

      // 3) Employment (if that tab provided data)
      if (employmentState) {
        const emp = {
          ...employmentState,
          last_drawn_salary_rm:
            employmentState.last_drawn_salary_rm === ""
              ? 0.0
              : Number(employmentState.last_drawn_salary_rm),
        };
        const r = await fetch(
          `${API}/patients/${encodeURIComponent(pid)}/employment`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emp),
          }
        );
        if (!r.ok) throw new Error(`Employment save failed (${r.status})`);
      }

      // 4) Clinical selections (ICD/ICF/ICHI/GAS)
      const clinicalPayload = {
        icd_path: icdPath,
        icf_summary: icfSummary,
        ichi_summary: ichiSummary,
        gas_summary: gasSummary,
      };
      const r4 = await fetch(
        `${API}/patients/${encodeURIComponent(pid)}/save_summary`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clinicalPayload),
        }
      );
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
    setShowProfileMenu((prev) => !prev);
  };
          function addPatient(p) {
  setPatients(prev => [...prev, p]);
}
  
useEffect(() => {
  window.openVitals = (patient) => {
    setVitalsPatient(patient);
    setShowVitals(true);
  };

    return () => {
      delete window.openVitals;
    };
  }, []);

  return (
    <>
      <StyleBlock />
      {/* Home interface when no user is selected */}

      <div className="page">
        {/* Left rail */}
        <SidebarNav
          tab={tab}
          setTab={setTab}
          userType={userType}
          icdCode={icdCode}
          icfCode={icfCode}
          rapPercent={rapPercent}
          username={username}
          userRole={userRole}
        />

        {/* Main area */}
        <main className="main">
          {/* /* Global toolbar */}

          <TopToolbar
            showProfileMenu={showProfileMenu}
            toggleProfileMenu={toggleProfileMenu}
            onBook={() => setTab("BOOK_APPOINTMENT")}
            onOrder={() => setTab("ORDER_INVESTIGATIONS")}
            onSaveAll={saveEverything}
            onLogout={() => {
              window.location.href = "http://localhost:3000/";
            }}
          />



          <MainContent
            tab={tab}
            addPatient={addPatient}
            patients={patients}
            updatePatientInMainList={updatePatientInMainList}
          />


          {/* PERSONAL */}
          {/* DASHBOARD */}

          <section style={{ display: tab === "DASHBOARD" ? "block" : "none" }}>
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

          <GlobalVitalsOverlay
            open={showVitals}
            patient={vitalsPatient}
            onClose={() => setShowVitals(false)}
          />

          <section style={{ display: tab === "ICD_EXISTING" ? "block" : "none" }}>
            <ICDExisting patientId={patient.patient_id} />
          </section>

          <section style={{ display: tab === "NurseBaseAssessment" ? "block" : "none" }}>
            <NurseBaseAssessment />
          </section>

          <section style={{ display: tab === "ClinicalSwallowEvaluation" ? "block" : "none" }}>
            <ClinicalSwallowEvaluation />
          </section>

          <section style={{ display: tab === "ICDNormal" ? "block" : "none" }}>
            <ICDNormal
              onDeepestICDChange={(code) => { setIcdCode(code); setIcfCode(""); }}
              onPathChange={setIcdPath}
            />
          </section>

          <section style={{ display: tab === "ICFNormal" ? "block" : "none" }}>
            <ICFNormal
              icdCode={icdCode}
              onSummaryChange={setIcfSummary}
              onSelectICF={setIcfCode}   // keep a single ICF child context for ICHI (optional)
            />
          </section>
          <section style={{ display: tab === "PTD" ? "block" : "none" }}>
            <PatientsToDepartments patientId={patient.patient_id} setTab={setTab} />
          </section>

          <section style={{ display: tab === "BASEASSESSMENT" ? "block" : "none" }}>
            <BASEASSESSMENT />
          </section>

          <section style={{ display: tab === "PatientsByDepartment" ? "block" : "none" }}>
            <PatientsByDepartment setTab={setTab} department="Neurophysics" />
          </section>
          <section style={{ display: tab === "NEWPATIENTS" ? "block" : "none" }}>
            {/* Only the patient list shown here */}
            <div style={{ padding: 16 }}>
              <PablotList
                onSelectPatient={(pid, icd) => {
                  setPatient((p) => ({ ...p, patient_id: pid }));
                  setIcdCode(icd);
                  setTab("ICF"); // ✅ after clicking "Edit", go directly to ICF tab
                }}
              />
            </div>
          </section>


          <section style={{ display: tab === "PERSONAL" ? "block" : "none" }}>
            <PersonalDetailsForm
              value={patient}
              onChange={setPatient}
              onFinancialChange={setFinancialState}
              onEmploymentChange={setEmploymentState}
            />
          </section>

          <section style={{ display: tab === "VITALS" ? "block" : "none" }}>
            <VitalsTab patientId={patient?.id} onSaved={() => { }} />
          </section>
          {/* ICD */}
          <section style={{ display: tab === "ICD" ? "block" : "none" }}>
            <ICDInfinite
              onDeepestICDChange={(code) => {
                setIcdCode(code);
                setIcfCode("");
              }}
              onPathChange={setIcdPath}
            />
          </section>
          <section style={{ display: tab === "ICDAD" ? "block" : "none" }}>
            <ICDAD
              onDeepestICDChange={(code) => {
                setIcdCode(code);
                setIcfCode("");

              }}
              onPathChange={setIcdPath}
            />
          </section>

          {/* ICF */}
          <section style={{ display: tab === "ICF" ? "block" : "none" }}>
            <ICFTab
              patientId={patient.patient_id}  // ✅ Use existing patient state
              icdCode={icdCode}
              onSummaryChange={setIcfSummary}
              onSelectICF={setIcfCode}
            />
          </section>

          {/* ICHI */}
          <section style={{ display: tab === "ICHI" ? "block" : "none" }}>
            <ICHITab
              icdCode={icdCode}
              icfCode={icfCode}
              onSummaryChange={setIchiSummary}
            />
          </section>
          {/* GAS */}
          <section style={{ display: tab === "GAS" ? "block" : "none" }}>
            <GasGoalsTab
              icfChildren={icfChildren}
              onSummaryChange={setGasSummary}
            />
          </section>
          <section
            style={{ display: tab === "BOOK_APPOINTMENT" ? "block" : "none" }}
          >
            <BookAppointmentTab patient={patient} />
          </section>
          <section
            style={{
              display: tab === "ORDER_INVESTIGATIONS" ? "block" : "none",
            }}
          >
            <InvestigationsChecklist
              variant="inline"
              patient={{ id: "PT-0001", name: "Jhon Doe" }}
              // initialRows={[{ item: "Lumbar spine X-ray (AP/Lateral)", type: "Radiology", test: "X-ray" }]}
              onSave={(rows) => console.log("Saved rows:", rows)}
            />
          </section>
          <section style={{ display: tab === "GASNA" ? "block" : "none" }}>
            <GasGoalsNATab
              icfChildren={icfChildren}
              onSummaryChange={setGasSummary}
            />
          </section>

          <section
            style={{ display: tab === "NEWASSESSMENT" ? "block" : "none" }}
          >
            <NewAssessmentTab />
          </section>
          <section
            style={{ display: tab === "RAPFINAL" ? "block" : "none" }}
          >
            <RAPFinal />
          </section>
          {/* SUMMARY */}
          <section style={{ display: tab === "SUMMARY" ? "block" : "none" }}>
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
          <section style={{ display: tab === "ASSESSMENT" ? "block" : "none" }}>
            <AssessmentEncounterTab
              patientId={patient.patient_id}
              value={soap}
              onChange={setSoap}
              onSaved={() =>
                addAudit("SOAP saved — Assessment/Encounter updated")
              }
              /* NEW: options for the goals table */
              icfOptions={(icfSummary || []).map((x) => ({
                value: x.child_icf,
                label:
                  `${x.child_icf} — ${x.child_name}` +
                  (Number.isFinite(x.score) ? ` (GAS ${x.score})` : ""),
              }))}
              ichiOptions={
                Array.isArray(ichiSummary?.selected)
                  ? ichiSummary.selected.map((s) => ({
                    value: s.ichi_code,
                    label: `${s.ichi_code} — ${s.ichi_name}`,
                  }))
                  : []
              }
              icdContext={icdCode || ""}
            />
          </section>

          {/* Task Performance Simulation (TPS) */}
          <section style={{ display: tab === "TPS" ? "block" : "none" }}>
            <TaskPerformanceSimulationTab
              patientId={patient.patient_id}
              value={tps}
              onChange={setTps}
              onSaved={() =>
                addAudit("TPS saved — Task performance data updated")
              }
            />
          </section>
          <section style={{ display: tab === "PHARMACY" ? "block" : "none" }}>
            <PharmacyDetailsCaptureTab />
          </section>
          {/* RAP • Case & RTW */}
          <section style={{ display: tab === "RAP" ? "block" : "none" }}>
            <RAPTab
              data={rapData}
              onChange={setRapData}
              onSave={() =>
                addAudit("RAP saved — RTW/Light-Duty proposal updated")
              }
            />
          </section>

          {/* Documents */}
          <section style={{ display: tab === "DOCUMENTS" ? "block" : "none" }}>
            <DocumentsTab patientId={patient.patient_id} />
          </section>

          {/* Audit Trail */}
          <section style={{ display: tab === "AUDIT" ? "block" : "none" }}>
            <AuditTrailTab items={auditItems} />
          </section>

          {/* {showAllergy && (
            <div
              style={{
                position: "fixed",
                left: 16,
                right: 16,
                bottom: 16,
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  pointerEvents: "auto",
                  background: "#fff",
                  border: "1px solid #fca5a5",
                  borderRadius: 12,
                  padding: "14px 18px",
                  boxShadow: "0 12px 30px rgba(0,0,0,.12)",
                  maxWidth: 720,
                  width: "100%",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#991b1b",
                  }}
                >
                  Allergic reactions
                </h2>
                <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
                  <li>Allergic to brinjal</li>
                  <li>Allergic to riboflavin drug</li>
                </ul>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 8,
                  }}
                >
                  <button className="btn" onClick={() => setShowAllergy(false)}>
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </main>
      </div>
    </>
  );
}

<ICDInfinite />;
<DashboardTab />;

/* ---------------- ICF Tab: parent ICF -> child ICF -> ranges ---------------- */
<PablotList />;
<ICFTab />;

/* ---------------- ICHI Tab: multi-select, modalities, note ---------------- */
<ICHITab />;

/* ---------------- Assessment & Encounter (SOAP) ---------------- */
<AssessmentEncounterTab />;

<VitalsTab />;

<NewAssessmentTab />;

/* ---------------- Task Performance Simulation (TPS) ---------------- */
<TaskPerformanceSimulationTab />;

/* ---------------- RAP • Case & RTW ---------------- */
<RAPTab />;

/* ---------------- Documents ---------------- */
<DocumentsTab />;

/* ---------------- Audit Trail ---------------- */
/* ---------------- Audit Trail (STATIC, always show fixed entries) ---------------- */

<AuditTrailTab />;

<AssessmentsPanel />;

<GasGoalsTab />;

<BookAppointmentTab />;
<InvestigationsChecklist />;

<RowCard />;

export function Field({ label, children }) {
  return (
    <label style={sx.field}>
      <span style={sx.fieldLabel}>{label}</span>
      {children}
    </label>
  );
}

/* ---------- helpers & styles ---------- */
export function guid() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}
export function csvEscape(v) {
  const s = (v ?? "").toString().replace(/"/g, '""');
  return `"${s}"`;
}
export function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}



export function MainContent({

  tab,
  addPatient,
  patients,
  updatePatientInMainList
}) {

  switch (tab) {
    case "Customer Service":
      return <PatientRegister addPatient={addPatient} />;

    case "Physio Therapy":
      return <DepartmentPage patients={patients} department="Physio Therapy" />;
     case "Occupational Therapy":
      return <OtDepartmentPage patients={patients} department="Occupational Therapy" />;

    case "Psychology":
      return <PsychologyDashboard />;
    case "Optometry":
      return <OptometryDashboard patients={patients} />;
     case "Prosthetics & Orthotics":
      return <ProstheticsAndOrthoticsDashboard patients={patients} />;
    case "Speech & Language Therapy":
      return <SpeechAndLanguage patients={patients} />;

    case "Dietetics":
      return <DietDepartmentPage patients={patients} department="Dietetics" />;

    case "Audiology":
      return <AudiologyDepartmentPage patients={patients} department="Audiology" />;


    case "Doctor":
      return <DoctorsDepartmentPage
        patients={patients}
        department="Doctor"
        updatePatientInMainList={updatePatientInMainList}
      />
        ;

    case "Nursing":
      return <NursingDepartmentPage patients={patients} department="Nursing" />;

    case "Medical Assistant":
      return <MedicalAssistantPatientspage patients={patients} department="Medical Assistant" />;

    default:
      return <div>Select a department</div>;
  }
}


<GasGoalsNATab />;

/* ---------------- Patient Summary ---------------- */
<PatientSummary />;

/* ---------------- Personal details (New/Existing + Save + History) ---------------- */
// ---------------- PersonalDetailsForm ----------------
<PersonalDetailsForm />;

// ---------------- FinancialDetailsForm ----------------
<FinancialDetailsForm />;

// ---------------- EmploymentDetailsForm ----------------
<EmploymentDetailsForm />;

<AsyncPatientSearch />;

/* ---------------- Reusable MultiSelect ---------------- */
<MultiSelect />;

/* ---------------- Common Rows ---------------- */
export function Row({ label, children, icon }) {
  return (
    <div className="row">
      <div className="label">
        <div>{label}</div>
        {icon && (
          <span className="icon" title="visibility">
            {icon}
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
export function DateTriple({ form, onChange, pfx, days, months, years }) {
  return (
    <div className="triple">
      <select
        className="input"
        value={form[`${pfx}_day`]}
        onChange={(e) => onChange(`${pfx}_day`, e.target.value)}
      >
        <option value="">DD</option>
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
      <select
        className="input"
        value={form[`${pfx}_month`]}
        onChange={(e) => onChange(`${pfx}_month`, e.target.value)}
      >
        <option value="">MM</option>
        {months.map((m) => (
          <option key={m.v} value={m.v}>
            {m.n}
          </option>
        ))}
      </select>
      <select
        className="input"
        value={form[`${pfx}_year`]}
        onChange={(e) => onChange(`${pfx}_year`, e.target.value)}
      >
        <option value="">YYYY</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <span className="calendar" title="calendar">
        📅
      </span>
    </div>
  );
}

/* ---------------- Styles ---------------- */
<StyleBlock />;
