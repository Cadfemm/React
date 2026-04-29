import React, { useState } from "react";
import DepartmentDashboard from "./DepartmentDashboard";
import DepartmentPatients from "./DepartmentPatients";
import {
  FaUserInjured, FaCalendarCheck, FaCalendarTimes, FaClock,
  FaStethoscope, FaShareSquare, FaFileInvoiceDollar, FaExclamationTriangle,
  FaUserMd, FaClipboardCheck, FaSignOutAlt, FaUserClock,
} from "react-icons/fa";
import { MdVisibility } from "react-icons/md";

/* ── Department → Assessment component map ─────────────── */
import NursingPatientDetails    from "../Nursing/components/PatientDetails";
import PTPatientDetails         from "../PT/components/PatientDetails";
import OTPatientDetails         from "../OT/components/PatientDetails";
import AudiologyAdultIA         from "../Audiology/components/AudiologyAdultIA";import DietAssessment           from "../Dietetics/pages/DietPatientspage";
import PsychologyAssessment     from "../Psychology/components/PsychologyAssessment";
import SpeechAssessment         from "../SpeechandLanguage/SpeechAssessment";
import ProstheticsAssessment    from "../Prosthetics & Orthotics/ProstheticsAndOrthoticsAssessments";
import ProstheticsAndOrthoticsPatients from "../Prosthetics & Orthotics/ProstheticsAndOrthoticsPatients";
import VocationalAssessment     from "../VocationalRehab/components/PatientDetails";
import MedicalAssistantDetails  from "../MedicalAssistant/components/PatientDetails";
import { DoctorsInitialAssessmentForm as DoctorsAssessment } from "../Doctors/components/DoctorsInitialAssessment";

const ASSESSMENT_MAP = {
  "Nursing":                  NursingPatientDetails,
  "Physiotherapy":            PTPatientDetails,
  "Integrated Rehab":         PTPatientDetails,
  "Occupational Therapy":     OTPatientDetails,
  "Audiology":                AudiologyAdultIA,
  "Dietetics":                DietAssessment,
  "Psychology":               PsychologyAssessment,
  "Speech & Language Therapy":SpeechAssessment,
  "Prosthetics & Orthotics":  ProstheticsAssessment,
  "Work & Vocational Rehab":  VocationalAssessment,
  "Medical Assistant":        MedicalAssistantDetails,
  "Doctor":                   DoctorsAssessment,
};

/* ── P&O specific card → assessment map ────────────────── */

export default function GenericDepartmentDashboard({
  departmentName,
  patients = [],
  PatientsComponent,   // optional override — used by Optometry which has its own patients page
  updatePatientInMainList,
}) {
  const [showPatients, setShowPatients] = useState(false);
  const [poSelectedCard, setPoSelectedCard] = useState(null); // tracks which P&O card was clicked
  const dept = departmentName.replace(" Department", "");
  const AssessmentComponent = ASSESSMENT_MAP[dept] || null;
  const isPO = dept === "Prosthetics & Orthotics";

  /* ── P&O: render the correct patients page based on selected card ── */
  if (isPO && showPatients) {
    return (
      <ProstheticsAndOrthoticsPatients
        selectedCard={poSelectedCard || "My Appointments"}
        onBack={() => { setShowPatients(false); setPoSelectedCard(null); }}
      />
    );
  }

  if (showPatients) {
    // Optometry (and any dept with PatientsComponent override) uses its own page
    if (PatientsComponent) {
      const Comp = PatientsComponent;
      return (
        <Comp
          patients={patients}
          Patients={patients}
          department={dept}
          updatePatientInMainList={updatePatientInMainList}
          initialView="patients"
          onBack={() => setShowPatients(false)}
        />
      );
    }
    // All other departments use the common DepartmentPatients page
    return (
      <DepartmentPatients
        patients={patients}
        department={dept}
        onBack={() => setShowPatients(false)}
        AssessmentComponent={AssessmentComponent}
      />
    );
  }

  /* ── P&O dashboard: intercept card clicks for Wheelchair & 3D ── */
  const handlePOCardClick = (cardTitle) => {
    setPoSelectedCard(cardTitle);
    setShowPatients(true);
  };

  return (
    <DepartmentDashboard
      departmentName={departmentName}
      onViewAllPatients={() => {
        if (isPO) { setPoSelectedCard("My Appointments"); }
        setShowPatients(true);
      }}
      /* Pass P&O card click handler so dashboard can wire up Wheelchair / 3D cards */
      onPOCardClick={isPO ? handlePOCardClick : undefined}
      kpiCards={[
        { label: "Today's Patients",    value: "20", sub: "10 new · 10 follow-up", icon: <FaUserInjured size={16} />,         accent: "#2563eb", trend: "up",   trendVal: "+2", onClick: () => setShowPatients(true) },
        { label: "Appointments Booked", value: "24", sub: "4 slots remaining",     icon: <FaCalendarCheck size={16} />,       accent: "#10b981", trend: "up",   trendVal: "+3" },
        { label: "No-Show Rate",        value: "7%", sub: "1–2 no-shows today",    icon: <FaCalendarTimes size={16} />,       accent: "#ef4444", trend: "down", trendVal: "-1%" },
        { label: "Avg. Wait Time",      value: "13 min", sub: "Target: ≤ 15 min", icon: <FaClock size={16} />,               accent: "#f59e0b" },
        { label: "Consultations Done",  value: "16", sub: "4 remaining",           icon: <FaStethoscope size={16} />,         accent: "#8b5cf6", trend: "up",   trendVal: "+3" },
        { label: "Referrals Today",     value: "6",  sub: "3 in · 3 out",          icon: <FaShareSquare size={16} />,         accent: "#06b6d4" },
        { label: "Pending Billing",     value: "RM 2,100", sub: "9 invoices",      icon: <FaFileInvoiceDollar size={16} />,   accent: "#f97316" },
        { label: "Follow-ups Overdue",  value: "4",  sub: "Requires attention",    icon: <FaExclamationTriangle size={16} />, accent: "#dc2626" },
      ]}
      donutCards={[{
        title: "Patient Distribution",
        total: 100,
        segments: [
          { label: "New",       value: 40, color: "#2563eb" },
          { label: "Ongoing",   value: 35, color: "#10b981" },
          { label: "Discharged",value: 15, color: "#f59e0b" },
          { label: "Inactive",  value: 10, color: "#6b7280" },
        ],
      }]}
      appointments={[
        { time: "08:30", name: "Ahmad Razali",  type: "Initial Assessment",  status: "Completed",   va: "—" },
        { time: "09:00", name: "Siti Norzahra", type: "Follow-up Session",   status: "In Progress", va: "—" },
        { time: "09:30", name: "Lim Wei Jian",  type: "Progress Review",     status: "Waiting",     va: "—" },
        { time: "10:00", name: "Priya Devi",    type: "Group Session",       status: "Waiting",     va: "—" },
        { time: "10:30", name: "Mohd Faiz",     type: "Discharge Planning",  status: "Scheduled",   va: "—" },
      ]}
      pendingActions={[
        { label: "Follow-up overdue",        count: 4, color: "#ef4444", icon: <FaExclamationTriangle size={13} /> },
        { label: "Reports pending sign-off", count: 3, color: "#f59e0b", icon: <FaClipboardCheck size={13} /> },
        { label: "Referrals awaiting reply", count: 2, color: "#8b5cf6", icon: <FaUserInjured size={13} /> },
      ]}
      patientFlowLabels={["Mon","Tue","Wed","Thu","Fri","Sat","Today"]}
      patientFlowDatasets={[
        { label: "New Patients", data: [6,9,7,12,10,5,8],     borderColor: "#2563eb", backgroundColor: "#2563eb18", fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: "#fff", pointBorderWidth: 2 },
        { label: "Follow-ups",   data: [11,14,12,16,14,9,12], borderColor: "#10b981", backgroundColor: "#10b98118", fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: "#fff", pointBorderWidth: 2 },
      ]}
      referralIncoming={[{ source: "General Practitioner", count: 14 }, { source: "Specialist", count: 8 }, { source: "Self / Walk-in", count: 6 }]}
      referralOutgoing={[{ dest: "Specialist Clinic", count: 6 }, { dest: "Hospital", count: 3 }]}
      trendMetrics={{ referrals: { label: "Referral Requests", data: [18,22,16,28,24,30], color: "#f59e0b" }, attendance: { label: "Patient Attendance", data: [82,86,80,90,88,93], color: "#10b981" } }}
      trendLabels={["Day -5","Day -4","Day -3","Day -2","Day -1","Today"]}
      recordingsCount={10}
      monthlyStats={[
        { label: "Total Patients Seen",  value: "280", icon: <FaUserInjured size={13} />,    color: "#2563eb" },
        { label: "Avg Session Time",     value: "30 min", icon: <FaClock size={13} />,       color: "#10b981" },
        { label: "Treatment Plans",      value: "180", icon: <FaClipboardCheck size={13} />, color: "#8b5cf6" },
        { label: "Staff-to-Patient",     value: "1 : 6", icon: <FaUserMd size={13} />,       color: "#f59e0b" },
        { label: "New Diagnoses",        value: "75",  icon: <FaStethoscope size={13} />,    color: "#06b6d4" },
        { label: "Referrals Out",        value: "30",  icon: <FaSignOutAlt size={13} />,     color: "#f97316" },
        { label: "Follow-up Rate",       value: "70%", icon: <FaUserClock size={13} />,      color: "#10b981" },
        { label: "Patient Satisfaction", value: "4.5/5", icon: <MdVisibility size={13} />,  color: "#2563eb" },
      ]}
    />
  );
}