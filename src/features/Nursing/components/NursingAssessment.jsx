import React, { useEffect, useState, createContext, useContext } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import BarthelIndexForm from "./BarthelIndexForm";
import ADLForm from "./ADLForm";
import PatientHistoryForm from "./PatientHistoryForm";
import MorseFallScaleForm from "./MorseFallScaleForm";
import BradenScaleForm from "./BradenScaleForm";
import WoundTreatmentFlowsheetForm from "./WoundTreatmentFlowsheetForm";
import NumericPainRatingScaleForm from "./NumericPainRatingScaleForm";
import DiabeticFootAssessmentForm from "./DiabeticFootAssessmentForm";

// Create context to pass patient to assessment components
const PatientContext = createContext(null);

// Adapter components that bridge values/onChange to patient/onSubmit/onBack
function BarthelIndexAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`barthel_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <BarthelIndexForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function ADLAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`adl_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <ADLForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function PatientHistoryAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`patient_history_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <PatientHistoryForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function MorseFallScaleAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`morse_fall_scale_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <MorseFallScaleForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function BradenScaleAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`braden_scale_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <BradenScaleForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function WoundTreatmentFlowsheetAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`wound_flowsheet_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <WoundTreatmentFlowsheetForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function NumericPainRatingScaleAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`numeric_pain_scale_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <NumericPainRatingScaleForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function DiabeticFootAssessmentAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`diabetic_foot_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "nursing_assessments_active";
    onChange(activeKey, null);
  };
  return <DiabeticFootAssessmentForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

// Assessment Registry
export const NURSING_ASSESSMENT_REGISTRY = {
  barthel: BarthelIndexAdapter,
  adl: ADLAdapter,
  patient_history: PatientHistoryAdapter,
  morse_fall_scale: MorseFallScaleAdapter,
  braden_scale: BradenScaleAdapter,
  wound_treatment_flowsheet: WoundTreatmentFlowsheetAdapter,
  numeric_pain_rating_scale: NumericPainRatingScaleAdapter,
  diabetic_foot_assessment: DiabeticFootAssessmentAdapter
};

/* ===================== COMPONENT ===================== */

export default function NursingAssessment({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `nursing_assessment_draft_${patient.id}`
    : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setValues(JSON.parse(saved).values || {});
    }
  }, [storageKey]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();

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
      alert("Nursing draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Nursing assessment submitted");
  };

  /* ===================== SCHEMAS ===================== */

  const SUBJECTIVE_SCHEMA = {
    actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
    sections: [
      {
        fields: []
      }
    ]
  };

  const OBJECTIVE_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: [
          {
            type: "subheading",
            label: "Forms"
          },
          {
            name: "nursing_assessments",
            type: "assessment-launcher",
            options: [
              { label: "Barthel Index", value: "barthel" },
              { label: "ADL", value: "adl" },
              { label: "Patient History", value: "patient_history" },
              { label: "Morse Fall Scale", value: "morse_fall_scale" },
              { label: "Braden Scale", value: "braden_scale" },
              { label: "Wound Treatment Flowsheet", value: "wound_treatment_flowsheet" },
              { label: "Numeric Pain Rating Scale", value: "numeric_pain_rating_scale" },
              { label: "Diabetic Foot Assessment", value: "diabetic_foot_assessment" }
            ]
          }
        ]
      }
    ]
  };

  const ASSESSMENT_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: []
      }
    ]
  };

  const PLAN_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: []
      }
    ]
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  const NURSING_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: []
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const today = new Date();

  function NursingPatientInfo({ patient }) {
    if (!patient) return null;

    const handleDoctorsReport = () => {
      alert("Report will be generating soon");
    };

    return (
      <div style={section}>
        <div style={patientGrid}>
          <div><b>Name:</b> {patient.name}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {formatDate(patient.dob)}</div>
          <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
          <div><b>ICD:</b> {patient.icd}</div>
          <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
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
          schema={NURSING_CONTAINER_SCHEMA}
          values={{}}
          onChange={() => {}}
        >
          <NursingPatientInfo patient={patient} />
        </CommonFormBuilder>

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
          assessmentRegistry={NURSING_ASSESSMENT_REGISTRY}
        >
          {/* Submit button */}
          <div style={submitRow}>
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Nursing Assessment
            </button>
          </div>
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
