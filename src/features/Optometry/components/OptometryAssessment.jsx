import React, { useEffect, useState, createContext, useContext } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import BinocularVisionAssessment from "../BinocularVisionAssessment";
import RefractionAssessment from "../RefractionAssessment";
import VisionAssessment from "../VisionAssessment";
import OcularHealthAssessment from "../OcularHealthAssessment";
import SpecialDiagnosticAssessment from "../SpecialDiagnostic";
import LVQoLForm from "../LowVisionQualityAssessment";
import BrainVisionInjury from "../BrainVisionInjury";
import VisualFunctionForm from "../VisionFunctionalAssessmenmt";
import BVDAssessment from "../BvdqAssessment";
import LowVisionAssessment from "../LowVisionAssessment";
import { localDateTimeString } from "../../../shared/utils/dateFormatter";
import api from "../../../shared/api/apiClient";
import { API_URL } from "../../../platform/config/api.config";

// Create context to pass patient to assessment components
const PatientContext = createContext(null);

// Adapter components that bridge values/onChange to patient/onSubmit/onBack
function BinocularVisionAdapter({ values, onChange, layout }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`binocular_vision_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "optometry_assessments_active";
    onChange(activeKey, null);
  };
  return <BinocularVisionAssessment patient={patient} onSubmit={handleSubmit} onBack={handleBack} layout={layout} />;
}

function LowVisionAssessmentAdapter({values, onChange, layout}) {
  const patient = useContext(PatientContext)
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`low_vision_assessment_${key}`, payload.values[key])
      })
    }
  }
  const handleBack = ()=> {
    const activeKey = "low_vision_assessment_active"
    onChange(activeKey, null)
  }
  return <LowVisionAssessment 
            patient={patient}
            onSubmit={handleSubmit}
            onBack={handleBack}
            layout={layout}
        />
}


function RefractionAdapter({ values, onChange, layout }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`refraction_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "optometry_assessments_active";
    onChange(activeKey, null);
  };
  return <RefractionAssessment patient={patient} onSubmit={handleSubmit} onBack={handleBack} layout={layout} />;
}

function VisionAdapter({ values, onChange, layout }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`vision_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "optometry_assessments_active";
    onChange(activeKey, null);
  };
  return <VisionAssessment patient={patient} onSubmit={handleSubmit} onBack={handleBack} layout={layout} />;
}

function OcularHealthAdapter({ values, onChange, layout }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`ocular_health_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "optometry_assessments_active";
    onChange(activeKey, null);
  };
  return <OcularHealthAssessment patient={patient} onSubmit={handleSubmit} onBack={handleBack} layout={layout} />;
}

function SpecialDiagnosticAdapter({ values, onChange, layout }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`special_diagnostic_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "optometry_assessments_active";
    onChange(activeKey, null);
  };
  return <SpecialDiagnosticAssessment patient={patient} onSubmit={handleSubmit} onBack={handleBack} layout={layout} />;
}

function LVQoLAdapter({ values, onChange, layout }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`lvqol_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "optometry_assessments_active";
    onChange(activeKey, null);
  };
  return <LVQoLForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} layout={layout} />;
}

function BrainVisionAdapter({ values, onChange, layout }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`brain_vision_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "optometry_assessments_active";
    onChange(activeKey, null);
  };
  return <BrainVisionInjury patient={patient} onSubmit={handleSubmit} onBack={handleBack} layout={layout} />;
}

function VisualFunctionAdapter({ values, onChange, layout }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`visual_function_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "optometry_assessments_active";
    onChange(activeKey, null);
  };
  return <VisualFunctionForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} layout={layout} />;
}

function BVDQAdapter({ values, onChange, layout }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`bvdq_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "optometry_assessments_active";
    onChange(activeKey, null);
  };
  return <BVDAssessment patient={patient} onSubmit={handleSubmit} onBack={handleBack} layout={layout} />;
}

// Assessment Registry
export const OPTOMETRY_ASSESSMENT_REGISTRY = {
  BINOCULAR_VISION: BinocularVisionAdapter,
  REFRACTION: RefractionAdapter,
  VISION_DRIVING: VisionAdapter,
  OCULAR_HEALTH: OcularHealthAdapter,
  SPECIAL_DIAGNOSTIC: SpecialDiagnosticAdapter,
  LVQOL: LVQoLAdapter,
  BRAIN_VISION: BrainVisionAdapter,
  VISUAL_FUNCTION: VisualFunctionAdapter,
  BVDQ: BVDQAdapter,
  LOW_VISION_ASSESSMENT :LowVisionAssessmentAdapter
};

/* ===================== COMPONENT ===================== */

export default function OptometryAssessment({ patient, onSubmit, onBack, savedValues = null, readOnly = false, mode = "initial" }) {
  const [values, setValues] = useState(readOnly && savedValues ? savedValues : {});
  const [submitted, setSubmitted] = useState(readOnly);
  const [activeTab, setActiveTab] = useState("subjective");
  const [forms, setForms] = useState([]);

  const isFollowup = mode === "followup";

  /* ---------------- STORAGE (follow-up uses separate key so it stays fresh; never loads initial data) ---------------- */
  const storageKey = patient && !readOnly
    ? (isFollowup ? `optometry_followup_draft_${patient.id}` : `optometry_assessment_draft_${patient.id}`)
    : null;

  useEffect(() => {
    if (readOnly && savedValues) {
      setValues(savedValues);
      setSubmitted(true);
      return;
    }
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setValues(JSON.parse(saved).values || {});
    }
  }, [storageKey, readOnly, savedValues]);

  useEffect(() => {
    if (!patient || readOnly) return;
    setValues(v => ({
      ...v,
      pmh_from_registration: patient.medical_history || "No data available",
      family_history_from_registration: patient.diagnosis_history || "No data available",
      allergies_from_registration: patient.allergies || "No data available"
    }));
  }, [patient, readOnly]);


  const onChange = (name, value) => {
    if (readOnly) return;
    setValues(v => ({ ...v, [name]: value }));
  };

  const tabOrder = ["subjective", "objective", "assessment", "plan"];

  const handleAction = (type) => {
    if (type === "back") onBack?.();
    if (readOnly) return;

    if (type === "next") {
      const idx = tabOrder.indexOf(activeTab);
      if (idx >= 0 && idx < tabOrder.length - 1) {
        setActiveTab(tabOrder[idx + 1]);
      }
      return;
    }

    if (type === "clear") {
      setValues({});
      setSubmitted(false);
      localStorage.removeItem(storageKey);
    }

    if (type === "save") {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ values, updatedAt: new Date() })
      );
      alert("Optometry draft saved");
    }
  };

  const handleSubmit = async() => {
    try{
      const res = await api.post(
        API_URL.FORM + 'optometry/',
        {
          "form_id": 1,
          "visit_type": "IN",
          "data": values?.data || {},
          "score": values?.score || {},
          "total_score": values?.total_score || 0
        }
      )
      alert(res.data.message || "Optometry assessment submitted successfully")
    } catch(err){
        alert("Error submitting optometry assessment"); 
    }
    if (readOnly) return;
    setSubmitted(true);
    onSubmit?.(values);
  };

  /* ===================== SCHEMAS ===================== */
  // Follow-up: show sections only when user selects the checkbox. Initial assessment: all sections always open.
  const sectionShowIf = (key) => (isFollowup ? { field: "general_questions", includes: key } : undefined);
  const sectionShowIfAnd = (key, andCond) =>
    isFollowup ? { field: "general_questions", includes: key, and: andCond } : (andCond || undefined);

  const ACTIONS_WITH_NEXT = [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ];

  const OPTOMETRY_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: []
  };

  useEffect(() => {
    const getSOAPForm = async () => {
      try {
        const res = await api.get(API_URL.FORM + 'optometry/')
        setForms(res.data)
      } catch (err) {
        setForms([])
      }
    }
    getSOAPForm()
  }, [])

  const schemaMap = {}

  if (forms.length > 0) {
    forms.forEach((form) => {
      if (form.assessment_type === "Subjective") {
        schemaMap.subjective = form.body
        schemaMap.subjective.actions = ACTIONS_WITH_NEXT
      } else if (form.assessment_type === "Objective") {
        schemaMap.objective = form.body
        schemaMap.objective.actions = ACTIONS_WITH_NEXT
      } else if (form.assessment_type === "Assessment") {
        schemaMap.assessment = form.body
        schemaMap.assessment.actions = ACTIONS_WITH_NEXT
      } else if (form.assessment_type === "Plan") {
        schemaMap.plan = form.body
        schemaMap.plan.actions = ACTIONS_WITH_NEXT
      }
  })}

  function OptometryPatientInfo({ patient }) {
    if (!patient) return null;

    const handleDoctorsReport = () => {
      alert("Report will be generating soon");
    };

    return (
      <div style={section}>
        <div style={patientGrid}>
          <div><b>Name:</b> {patient.email}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {localDateTimeString(patient.date_of_birth)}</div>
          <div><b>Age / Gender:</b> {patient.age} / {patient.gender}</div>
          <div><b>ICD:</b> {patient.icd}</div>
          <div><b>Date of Assessment:</b> {localDateTimeString('', true)}</div>
          <div style={{ gridColumn: "1 / -1" }}>
            <button style={doctorsReportBtn} onClick={handleDoctorsReport}>
              Doctors Reports
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ===================== RENDER ===================== */

  return (
    <PatientContext.Provider value={patient}>
      <div style={mainContent}>
        {/* ===== PATIENT INFORMATION CARD ===== */}
        <CommonFormBuilder
          schema={OPTOMETRY_CONTAINER_SCHEMA}
          values={{}}
          onChange={() => { }}
        >
          <OptometryPatientInfo patient={patient} />
        </CommonFormBuilder>

        {isFollowup && (
          <h2 style={{
            width: "100%",
            textAlign: "center",
            margin: "0 0 12px 0",
            fontSize: 20,
            fontWeight: 700,
            color: "#059669"
          }}
          >
            Follow-up Visit
          </h2>
        )}

        {/* ===== TABS ===== */}
        <div style={tabBar}>
          {["subjective", "objective", "assessment", "plan"].map(tab => (
            <div
              key={tab}
              style={activeTab === tab ? tabActive : tabBtn}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </div>
          ))}
        </div>

        {/* ===== TAB CONTENT ===== */}
        <CommonFormBuilder
          schema={schemaMap[activeTab]}
          values={values}
          onChange={onChange}
          submitted={submitted}
          onAction={handleAction}
          assessmentRegistry={OPTOMETRY_ASSESSMENT_REGISTRY}
          readOnly={readOnly}
        >
          {/* Next button at bottom for Subjective, Objective, Assessment */}
          {!readOnly && activeTab !== "plan" && (
            <div style={submitRow}>
              <button
                style={{
                  padding: "12px 32px",
                  background: "#2451b3",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
                onClick={() => handleAction("next")}
              >
                Next
              </button>
            </div>
          )}
          {/* Final approval / Submit - only on Plan tab */}
          {!readOnly && activeTab === "plan" && (
            <div style={submitRow}>
              <button style={submitBtn} onClick={handleSubmit}>
                {isFollowup ? "Submit Follow-up Visit" : "Submit Optometry Assessment"}
              </button>
            </div>
          )}
        </CommonFormBuilder>
      </div>
    </PatientContext.Provider>
  );
}

/* ===================== STYLES ===================== */

const mainContent = { margin: "0 auto", width: "100%" };

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
};

const tabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#0f172a"
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2451b3",
  color: "#2451b3"
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 20
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700
};

const section = {
  marginBottom: 24
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};

const doctorsReportBtn = {
  padding: "10px 20px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 8
};
