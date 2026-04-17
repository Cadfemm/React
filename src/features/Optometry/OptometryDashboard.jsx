import React, { useState } from "react";
import DepartmentDashboard from "../common/DepartmentDashboard";
import OptometryPatients from "./OptometryPatients";
import {
  FaUserInjured, FaCalendarCheck, FaCalendarTimes, FaClock,
  FaStethoscope, FaShareSquare, FaFileInvoiceDollar, FaExclamationTriangle,
  FaEye, FaUserMd, FaClipboardCheck, FaSignOutAlt, FaUserClock,
  FaHourglassHalf,
} from "react-icons/fa";
import { MdVisibility } from "react-icons/md";

export default function OptometryDashboard({ patients = [] }) {
  const [showPatients, setShowPatients] = useState(false);

  if (showPatients) {
    return <OptometryPatients Patients={patients} onBack={() => setShowPatients(false)} />;
  }

  return (
    <DepartmentDashboard
      departmentName="Optometry Department"
      onViewAllPatients={() => setShowPatients(true)}

      kpiCards={[
        { label: "Today's Patients",     value: "24",      sub: "12 new · 12 follow-up",  icon: <FaUserInjured size={16} />,         accent: "#2563eb", trend: "up",   trendVal: "+3",  onClick: () => setShowPatients(true) },
        { label: "Appointments Booked",  value: "28",      sub: "4 slots remaining",       icon: <FaCalendarCheck size={16} />,       accent: "#10b981", trend: "up",   trendVal: "+5"  },
        { label: "No-Show Rate",         value: "8.3%",    sub: "2 no-shows today",        icon: <FaCalendarTimes size={16} />,       accent: "#ef4444", trend: "down", trendVal: "-2%" },
        { label: "Avg. Wait Time",       value: "14 min",  sub: "Target: ≤ 15 min",        icon: <FaClock size={16} />,               accent: "#f59e0b", trend: "up",   trendVal: "+2m" },
        { label: "Consultations Done",   value: "18",      sub: "6 remaining",             icon: <FaStethoscope size={16} />,         accent: "#8b5cf6", trend: "up",   trendVal: "+4"  },
        { label: "Referrals Today",      value: "7",       sub: "4 in · 3 out",            icon: <FaShareSquare size={16} />,         accent: "#06b6d4" },
        { label: "Pending Billing",      value: "RM 2,840",sub: "11 invoices",             icon: <FaFileInvoiceDollar size={16} />,   accent: "#f97316", trend: "down", trendVal: "-3"  },
        { label: "Follow-ups Overdue",   value: "6",       sub: "Requires attention",      icon: <FaExclamationTriangle size={16} />, accent: "#dc2626" },
      ]}

      donutCards={[
        {
          title: "Diagnosis Distribution",
          total: 100,
          segments: [
            { label: "Myopia",      value: 38, color: "#2563eb" },
            { label: "Hyperopia",   value: 14, color: "#10b981" },
            { label: "Astigmatism", value: 22, color: "#f59e0b" },
            { label: "Presbyopia",  value: 11, color: "#8b5cf6" },
            { label: "Dry Eye",     value: 9,  color: "#ef4444" },
            { label: "Other",       value: 6,  color: "#6b7280" },
          ],
        },
      ]}

      appointments={[
        { time: "08:30", name: "Ahmad Razali",  type: "Comprehensive Eye Exam",  status: "Completed",   va: "6/6" },
        { time: "09:00", name: "Siti Norzahra", type: "Contact Lens Fitting",    status: "In Progress", va: "6/9" },
        { time: "09:30", name: "Lim Wei Jian",  type: "Low Vision Assessment",   status: "Waiting",     va: "—"   },
        { time: "10:00", name: "Priya Devi",    type: "Binocular Vision",        status: "Waiting",     va: "—"   },
        { time: "10:30", name: "Mohd Faiz",     type: "Refraction Assessment",   status: "No Show",     va: "—"   },
        { time: "11:00", name: "Tan Mei Ling",  type: "Ocular Health Check",     status: "Scheduled",   va: "—"   },
      ]}

      pendingActions={[
        { label: "Follow-up overdue",        count: 6, color: "#ef4444", icon: <FaExclamationTriangle size={13} /> },
        { label: "Reports pending sign-off", count: 4, color: "#f59e0b", icon: <FaClipboardCheck size={13} />     },
        { label: "Prescriptions to issue",   count: 3, color: "#2563eb", icon: <FaEye size={13} />                },
        { label: "Referrals awaiting reply", count: 2, color: "#8b5cf6", icon: <FaHourglassHalf size={13} />      },
      ]}

      patientFlowLabels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"]}
      patientFlowDatasets={[
        { label: "New Patients", data: [8, 12, 7, 15, 11, 6, 9],  borderColor: "#2563eb", backgroundColor: "#2563eb18", fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: "#fff", pointBorderWidth: 2 },
        { label: "Follow-ups",   data: [14, 18, 16, 22, 19, 10, 17], borderColor: "#10b981", backgroundColor: "#10b98118", fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: "#fff", pointBorderWidth: 2 },
      ]}

      referralIncoming={[
        { source: "General Practitioner", count: 18 },
        { source: "Neurology Dept",       count: 7  },
        { source: "Paediatrics",          count: 5  },
        { source: "Self / Walk-in",       count: 12 },
      ]}
      referralOutgoing={[
        { dest: "Ophthalmology",     count: 9 },
        { dest: "Neurology",         count: 4 },
        { dest: "Low Vision Clinic", count: 3 },
      ]}

      trendMetrics={{
        referrals:  { label: "Referral Requests",  data: [20, 24, 18, 30, 28, 35], color: "#f59e0b" },
        attendance: { label: "Patient Attendance",  data: [85, 88, 82, 90, 92, 95], color: "#10b981" },
        cases:      { label: "Total Cases",         data: [980, 1020, 1080, 1150, 1210, 1250], color: "#2563eb" },
      }}
      trendLabels={["Day -5", "Day -4", "Day -3", "Day -2", "Day -1", "Today"]}

      recordingsCount={15}

      monthlyStats={[
        { label: "Total Patients Seen",  value: "312",    icon: <FaUserInjured size={13} />,    color: "#2563eb" },
        { label: "Avg Consult Time",     value: "22 min", icon: <FaClock size={13} />,           color: "#10b981" },
        { label: "Prescriptions Issued", value: "198",    icon: <FaEye size={13} />,             color: "#8b5cf6" },
        { label: "Staff-to-Patient",     value: "1 : 6",  icon: <FaUserMd size={13} />,          color: "#f59e0b" },
        { label: "New Diagnoses",        value: "87",     icon: <FaClipboardCheck size={13} />,  color: "#06b6d4" },
        { label: "Referrals Out",        value: "34",     icon: <FaSignOutAlt size={13} />,      color: "#f97316" },
        { label: "Follow-up Rate",       value: "68%",    icon: <FaUserClock size={13} />,       color: "#10b981" },
        { label: "Patient Satisfaction", value: "4.7/5",  icon: <MdVisibility size={13} />,      color: "#2563eb" },
      ]}
    />
  );
}
