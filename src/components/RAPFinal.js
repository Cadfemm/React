import React, { useState } from "react";
import "../styles/RehabFinal.css"; // 👈 Import the CSS file

import RAPPatientRegistration from "./RAPPatientRegistration";
import RAPInitialAssessment from "./RAPInitialAssessment";
import RAPGoalSetting from "./RAPGoalSetting";
import RAPTherapyPlan from "./RAPTherapyPlan";
import RAPSessions from "./RAPSessions";
import RAPReviewAdjust from "./RAPReviewAdjust";
import RAPDischargeSummary from "./RAPDischargeSummary";
import RAPReports from "./RAPReports";
import RAPFollowUp from "./RAPFollowUp";

export default function RAPFinal() {
    const [activeSection, setActiveSection] = useState(null);
  const sections = [
    {id: 1,
      title: "1) Patient Registration",
      desc: "Create patient master; start Episode (New/Follow-up/Readmission). Capture referrer and primary diagnosis.",
      buttons: ["ICD-10/11", "Episode ID (auto)", "Referrer"],
      footer: "Departments",
      component: RAPPatientRegistration
    },
    {id: 2,
      title: "2) Initial Assessment",
      desc: "Dept-specific intake: PT/OT/Speech/Psych. Map ICD → ICF, capture baselines (ROM, FIM, DASH, etc). Optional ICHI capture.",
      buttons: ["ICD", "ICF", "ICHI (optional)", "Scores / Scales"],
      footer: "Specialties",
      component: RAPInitialAssessment
    },
    {id: 3,
      title: "3) Goal Setting (GAS)",
      desc: "Define SMART goals; set attainment levels; choose outcome measures.",
      buttons: ["GAS", "Outcome Measures"],
      component: RAPGoalSetting
    },
    {id: 4,
      title: "4) Therapy Plan (TPS)",
      desc: "Select interventions/modalities and schedule: frequency × duration × weeks; assign therapist; approvals as needed.",
      buttons: ["Plan Builder", "Therapist Assignment", "Schedule", "Equipment"],
      footer: "Examples",
      component: RAPTherapyPlan
    },
    {id: 5,
      title: "5) Sessions",
      desc: "Daily session log: vitals, exercises, device data (local adapters); attendance and notes.",
      buttons: ["Session Log", "Device Data", "Progress Graphs"],
      component: RAPSessions
    },
    {id: 6,
      title: "6) Budget & Interim Report",
      desc: "Mid-term review; compare progress vs goals; modify plan if needed.",
      buttons: ["Re-Assessment", "Plan Adjustment"],
      component: RAPReviewAdjust
    },
    {id: 7,
      title: "7) Discharge Summary",
      desc: "Auto-generate clinical summary with pre/post scores; attach reports.",
      buttons: ["Report", "PDF Export"],
      component: RAPDischargeSummary
    },
    {id: 8,
      title: "8) RAP & RTW",
      desc: "Create WHO-aligned RAP and RTW readiness report; recommendations for employer/insurer.",
      buttons: ["RAP", "RTW", "Recommendations"],
      component: RAPReports
    },
    {id: 9,
      title: "9) Approvals",
      desc: "Schedule follow-up; capture patient feedback; outcome monitoring.",
      buttons: ["Follow-Up", "Feedback"],
      component: RAPFollowUp
    },
  ];
const handleCardClick = (section) => {
    setActiveSection(section);
  };

  const handleBack = () => {
    setActiveSection(null);
  };

  // Render selected section
  if (activeSection) {
    const ActiveComponent = activeSection.component;
    return (
      <div className="rehab-detail">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
        <ActiveComponent />
      </div>
    );
  }

  return (
   <div style={{display:'flex',justifyContent:'center'}}>
    <div className="rehab-container">
      <div className="rehab-grid">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className="rehab-card"
            onClick={() => handleCardClick(sec)}
          >
            <h2 className="rehab-title">{sec.title}</h2>
            <p className="rehab-desc">{sec.desc}</p>
            <div className="rehab-buttons">
              {sec.buttons.map((b, i) => (
                <button className="rehab-btn" key={i}>
                  {b}
                </button>
              ))}
            </div>
            {sec.footer && <div className="rehab-footer">{sec.footer}</div>}
          </div>
        ))}
      </div>

      <div className="rehab-note">
       RAP Report
      </div>
    </div>
    </div>
  );
}
