import React, { useState } from "react";
import DepartmentDashboard from "../../common/DepartmentDashboard";
import DepartmentPage from "./Patientspage";
import { FaUserInjured, FaCalendarCheck, FaCalendarTimes, FaClock, FaStethoscope, FaShareSquare, FaFileInvoiceDollar, FaExclamationTriangle, FaEye, FaUserMd, FaClipboardCheck, FaSignOutAlt, FaUserClock } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";

export default function PTDashboard({ patients = [], department = "Physiotherapy", updatePatientInMainList }) {
  const [showPatients, setShowPatients] = useState(false);
  if (showPatients) return <DepartmentPage patients={patients} department={department} updatePatientInMainList={updatePatientInMainList} onBack={() => setShowPatients(false)} />;
  return (
    <DepartmentDashboard
      departmentName={`${department} Department`}
      onViewAllPatients={() => setShowPatients(true)}
      kpiCards={[
        { label: "Today's Patients",    value: "18", sub: "8 new · 10 follow-up", icon: <FaUserInjured size={16} />,       accent: "#2563eb", trend: "up",   trendVal: "+2", onClick: () => setShowPatients(true) },
        { label: "Appointments Booked", value: "22", sub: "3 slots remaining",    icon: <FaCalendarCheck size={16} />,     accent: "#10b981", trend: "up",   trendVal: "+4" },
        { label: "No-Show Rate",        value: "6%", sub: "1 no-show today",      icon: <FaCalendarTimes size={16} />,     accent: "#ef4444", trend: "down", trendVal: "-1%" },
        { label: "Avg. Wait Time",      value: "12 min", sub: "Target: ≤ 15 min", icon: <FaClock size={16} />,            accent: "#f59e0b" },
        { label: "Consultations Done",  value: "14", sub: "4 remaining",          icon: <FaStethoscope size={16} />,       accent: "#8b5cf6", trend: "up",   trendVal: "+3" },
        { label: "Referrals Today",     value: "5",  sub: "3 in · 2 out",         icon: <FaShareSquare size={16} />,       accent: "#06b6d4" },
        { label: "Pending Billing",     value: "RM 1,920", sub: "8 invoices",     icon: <FaFileInvoiceDollar size={16} />, accent: "#f97316" },
        { label: "Follow-ups Overdue",  value: "3",  sub: "Requires attention",   icon: <FaExclamationTriangle size={16} />, accent: "#dc2626" },
      ]}
      donutCards={[{ title: "Condition Distribution", total: 100, segments: [{ label: "Back Pain", value: 35, color: "#2563eb" }, { label: "Knee", value: 25, color: "#10b981" }, { label: "Shoulder", value: 20, color: "#f59e0b" }, { label: "Neck", value: 12, color: "#8b5cf6" }, { label: "Other", value: 8, color: "#6b7280" }] }]}
      appointments={[
        { time: "08:00", name: "Ahmad Razali",  type: "Lower Back Rehabilitation", status: "Completed",   va: "—" },
        { time: "08:30", name: "Siti Norzahra", type: "Knee Strengthening",        status: "In Progress", va: "—" },
        { time: "09:00", name: "Lim Wei Jian",  type: "Post-Op Shoulder",          status: "Waiting",     va: "—" },
        { time: "09:30", name: "Priya Devi",    type: "Gait Training",             status: "Waiting",     va: "—" },
        { time: "10:00", name: "Mohd Faiz",     type: "Cervical Traction",         status: "Scheduled",   va: "—" },
      ]}
      pendingActions={[
        { label: "Follow-up overdue",        count: 3, color: "#ef4444", icon: <FaExclamationTriangle size={13} /> },
        { label: "Reports pending sign-off", count: 2, color: "#f59e0b", icon: <FaClipboardCheck size={13} /> },
        { label: "Referrals awaiting reply", count: 2, color: "#8b5cf6", icon: <FaUserInjured size={13} /> },
      ]}
      patientFlowLabels={["Mon","Tue","Wed","Thu","Fri","Sat","Today"]}
      patientFlowDatasets={[
        { label: "New Patients", data: [5,8,6,10,9,4,7], borderColor: "#2563eb", backgroundColor: "#2563eb18", fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: "#fff", pointBorderWidth: 2 },
        { label: "Follow-ups",   data: [10,12,11,14,13,8,11], borderColor: "#10b981", backgroundColor: "#10b98118", fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: "#fff", pointBorderWidth: 2 },
      ]}
      referralIncoming={[{ source: "General Practitioner", count: 12 }, { source: "Orthopaedics", count: 8 }, { source: "Neurology", count: 4 }]}
      referralOutgoing={[{ dest: "Orthopaedics", count: 5 }, { dest: "Pain Clinic", count: 3 }]}
      trendMetrics={{ referrals: { label: "Referral Requests", data: [15,18,14,22,20,25], color: "#f59e0b" }, attendance: { label: "Patient Attendance", data: [80,85,78,88,90,92], color: "#10b981" } }}
      trendLabels={["Day -5","Day -4","Day -3","Day -2","Day -1","Today"]}
      recordingsCount={8}
      monthlyStats={[
        { label: "Total Patients Seen",  value: "248", icon: <FaUserInjured size={13} />,   color: "#2563eb" },
        { label: "Avg Session Time",     value: "45 min", icon: <FaClock size={13} />,      color: "#10b981" },
        { label: "Treatment Plans",      value: "156", icon: <FaClipboardCheck size={13} />, color: "#8b5cf6" },
        { label: "Staff-to-Patient",     value: "1 : 5", icon: <FaUserMd size={13} />,      color: "#f59e0b" },
        { label: "New Diagnoses",        value: "62",  icon: <FaStethoscope size={13} />,   color: "#06b6d4" },
        { label: "Referrals Out",        value: "28",  icon: <FaSignOutAlt size={13} />,    color: "#f97316" },
        { label: "Follow-up Rate",       value: "72%", icon: <FaUserClock size={13} />,     color: "#10b981" },
        { label: "Patient Satisfaction", value: "4.6/5", icon: <MdVisibility size={13} />, color: "#2563eb" },
      ]}
    />
  );
}
