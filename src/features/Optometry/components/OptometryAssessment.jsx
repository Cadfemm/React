import {
  lazy, Suspense,
  useEffect, useState, useCallback, useMemo,
  createContext, useContext, memo
} from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import { localDateTimeString } from "../../../shared/utils/dateFormatter";
import api from "../../../shared/api/apiClient";
import { API_URL } from "../../../platform/config/api.config";
import { ShimmerForm } from "../../../shared/ui/Shimmer";
import EmptyState from "../../../shared/ui/EmptyState";
import ConfirmModal from "../../../shared/ui/ConfirmModal";
import Toast from "../../../shared/ui/Toast";
import ReferralModal from "../../../shared/ui/ReferralModal";

// ── Lazy-loaded assessment components ──────────────────────────────────────
const BinocularVisionAssessment   = lazy(() => import("../BinocularVisionAssessment"));
const RefractionAssessment        = lazy(() => import("../RefractionAssessment"));
const VisionAssessment            = lazy(() => import("../VisionAssessment"));
const OcularHealthAssessment      = lazy(() => import("../OcularHealthAssessment"));
const SpecialDiagnosticAssessment = lazy(() => import("../SpecialDiagnostic"));
const LVQoLForm                   = lazy(() => import("../LowVisionQualityAssessment"));
const BrainVisionInjury           = lazy(() => import("../BrainVisionInjury"));
const VisualFunctionForm          = lazy(() => import("../VisionFunctionalAssessment"));
const BVDAssessment               = lazy(() => import("../BvdqAssessment"));
const LowVisionAssessment         = lazy(() => import("../LowVisionAssessment"));

const AssessmentFallback = <ShimmerForm rows={6} />;

// ── Context ────────────────────────────────────────────────────────────────
const PatientContext = createContext(null);

const SUB_SCHEMA = {};
const OBJ_SCHEMA = {};

// ── Adapter factory ────────────────────────────────────────────────────────
function makeAdapter(Component, prefix, activeKey, getSchema) {
  const Adapter = memo(function Adapter({ onChange, layout }) {
    const patient = useContext(PatientContext);
    const handleBack = useCallback(() => { onChange(activeKey, null); }, [onChange]);
    const schema = getSchema();
    // Guard: never render with undefined schema — avoids hooks count mismatch
    if (!schema) return <ShimmerForm rows={4} />;
    return (
      <Suspense fallback={AssessmentFallback}>
        <Component schema={schema} patient={patient} onBack={handleBack} layout={layout} />
      </Suspense>
    );
  });
  Adapter.displayName = `${prefix}Adapter`;
  return Adapter;
}

const BinocularVisionAdapter    = makeAdapter(BinocularVisionAssessment,  "binocular_vision",    "optometry_assessments_active", () => OBJ_SCHEMA.BINOCULAR_VISION);
const RefractionAdapter         = makeAdapter(RefractionAssessment,        "refraction",          "optometry_assessments_active", () => OBJ_SCHEMA.REFRACTION);
const VisionAdapter             = makeAdapter(VisionAssessment,            "vision",              "optometry_assessments_active", () => OBJ_SCHEMA.VISION_DRIVING);
const OcularHealthAdapter       = makeAdapter(OcularHealthAssessment,      "ocular_health",       "optometry_assessments_active", () => OBJ_SCHEMA.OCULAR_HEALTH);
const SpecialDiagnosticAdapter  = makeAdapter(SpecialDiagnosticAssessment, "special_diagnostic",  "optometry_assessments_active", () => OBJ_SCHEMA.SPECIAL_DIAGNOSTIC);
const LVQoLAdapter              = makeAdapter(LVQoLForm,                   "lvqol",               "optometry_assessments_active", () => SUB_SCHEMA.LVQOL);
const BrainVisionAdapter        = makeAdapter(BrainVisionInjury,           "brain_vision",        "optometry_assessments_active", () => SUB_SCHEMA.BRAIN_VISION);
const VisualFunctionAdapter     = makeAdapter(VisualFunctionForm,           "visual_function",     "optometry_assessments_active", () => SUB_SCHEMA.VISUAL_FUNCTION);
const BVDQAdapter               = makeAdapter(BVDAssessment,               "bvdq",                "optometry_assessments_active", () => SUB_SCHEMA.BVDQ);
const LowVisionAdapter          = makeAdapter(LowVisionAssessment,         "low_vision",          "low_vision_assessment_active", () => OBJ_SCHEMA.LOW_VISION_ASSESSMENT);

export const OPTOMETRY_ASSESSMENT_REGISTRY = {
  BINOCULAR_VISION:      BinocularVisionAdapter,
  REFRACTION:            RefractionAdapter,
  VISION_DRIVING:        VisionAdapter,
  OCULAR_HEALTH:         OcularHealthAdapter,
  SPECIAL_DIAGNOSTIC:    SpecialDiagnosticAdapter,
  LVQOL:                 LVQoLAdapter,
  BRAIN_VISION:          BrainVisionAdapter,
  VISUAL_FUNCTION:       VisualFunctionAdapter,
  BVDQ:                  BVDQAdapter,
  LOW_VISION_ASSESSMENT: LowVisionAdapter,
};

const ACTIONS_WITH_NEXT = [
  { type: "back",  label: "Back"  },
  { type: "clear", label: "Clear" },
  { type: "save",  label: "Save"  },
];
const TAB_ORDER = ["subjective", "objective", "assessment", "plan"];

const TAB_META = {
  subjective:  { label: "Subjective"  },
  objective:   { label: "Objective"   },
  assessment:  { label: "Assessment"  },
  plan:        { label: "Plan"        },
};

// ── Patient Header Card (light blue hospital grade) ────────────────────────
const OptometryPatientInfo = memo(function OptometryPatientInfo({ patient, onReferral, isFollowup }) {
  if (!patient) return null;
  const initial = (patient.name || patient.email || "P")[0].toUpperCase();
  const fields = [
    { label: "Date of Birth",      value: localDateTimeString(patient.date_of_birth) || "—" },
    { label: "Age / Gender",       value: `${patient.age || "—"} / ${patient.gender || "—"}` },
    { label: "ICD Code",           value: patient.icd || "—" },
    { label: "Date of Assessment", value: new Date().toLocaleDateString("en-GB") },
    { label: "Medical History",    value: patient.medical_history || "No data" },
    { label: "Allergies",          value: patient.allergies || "None recorded" },
  ];

  return (
    <div style={PI.card}>
      {/* Blue header strip */}
      <div style={PI.header}>
        <div style={PI.headerLeft}>
          <div style={PI.avatar}>{initial}</div>
          <div>
            <div style={PI.name}>{patient.name || patient.email || "Patient"}</div>
            <div style={PI.metaRow}>
              <span style={PI.metaChip}>
                <span style={PI.metaDot} />
                IC: {patient.id || "—"}
              </span>
              <span style={PI.metaDivider} />
              <span style={PI.metaChip}>
                <span style={PI.metaDot} />
                Optometry
              </span>
              <span style={PI.metaDivider} />
              <span style={PI.metaChip}>
                <span style={PI.metaDot} />
                {new Date().toLocaleDateString("en-GB")}
              </span>
              {isFollowup && (
                <>
                  <span style={PI.metaDivider} />
                  <span style={{ ...PI.metaChip, background: "rgba(255,255,255,0.25)", color: "#fff", fontWeight: 700, borderRadius: 999, padding: "2px 10px" }}>
                    Follow-up Visit
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div style={PI.headerActions}>
          <button
            style={PI.reportBtn}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.65)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.45)"}
            onClick={() => alert("Report will be generating soon")}
          >
            Doctors Report
          </button>
          <button
            style={PI.referralBtn}
            onMouseEnter={e => e.currentTarget.style.background = "#0369a1"}
            onMouseLeave={e => e.currentTarget.style.background = "#0284c7"}
            onClick={onReferral}
          >
            Referral
          </button>
        </div>
      </div>

      <div style={PI.grid}>
        {fields.map((f, i) => (
          <div
            key={f.label}
            style={{
              ...PI.field,
              borderRight: (i + 1) % 3 !== 0 ? "1px solid #f1f5f9" : "none",
              borderBottom: i < 3 ? "1px solid #f1f5f9" : "none",
            }}
          >
            <div style={PI.fieldLabel}>{f.label}</div>
            <div style={PI.fieldValue}>{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

/* ===================== MAIN COMPONENT ===================== */

export default function OptometryAssessment({
  patient,
  onSubmit,
  onBack,
  savedValues = null,
  readOnly    = false,
  mode        = "initial",
}) {
  const [values,       setValues]       = useState(readOnly && savedValues ? savedValues : {});
  const [submitted,    setSubmitted]    = useState(readOnly);
  const [activeTab,    setActiveTab]    = useState("subjective");
  const [forms,        setForms]        = useState([]);
  const [formsLoading, setFormsLoading] = useState(true);
  const [formsError,   setFormsError]   = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [isDirty,      setIsDirty]      = useState(false);
  const [toast,        setToast]        = useState(null);
  const [showReferral, setShowReferral] = useState(false);

  const isFollowup = mode === "followup";

  const storageKey = useMemo(() => {
    if (!patient || readOnly) return null;
    return isFollowup
      ? `optometry_followup_draft_${patient.id}`
      : `optometry_assessment_draft_${patient.id}`;
  }, [patient, readOnly, isFollowup]);

  useEffect(() => {
    if (readOnly && savedValues) { setValues(savedValues); setSubmitted(true); return; }
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setValues(JSON.parse(saved).values || {});
  }, [storageKey, readOnly, savedValues]);

  useEffect(() => {
    if (!patient || readOnly) return;
    setValues(v => ({
      ...v,
      pmh_from_registration:           patient.medical_history   || "No data available",
      family_history_from_registration: patient.diagnosis_history || "No data available",
      allergies_from_registration:      patient.allergies         || "No data available",
    }));
  }, [patient, readOnly]);

  useEffect(() => {
    setFormsLoading(true);
    setFormsError(false);
    api.get(API_URL.FORM + "department/optometry/")
      .then(res => setForms(res.data.results))
      .catch(() => setFormsError(true))
      .finally(() => setFormsLoading(false));
  }, []);

  useEffect(() => {
    api.get(API_URL.FORM + "department/optometry/?assessment=subjective")
      .then(res => {
        res.data.results.forEach(form => {
          if (form.name === "Brain Injury Vision Symptoms Survey (BIVSS)")             SUB_SCHEMA.BRAIN_VISION    = form.body;
          else if (form.name === "Visual Function Questionnaire")                      SUB_SCHEMA.VISUAL_FUNCTION = form.body;
          else if (form.name === "Binocular Vision Dysfunction Questionnaire (BVDQ)")  SUB_SCHEMA.BVDQ            = form.body;
          else if (form.name === "Low Vision Quality of Life Questionnaire (LVQoL)")   SUB_SCHEMA.LVQOL           = form.body;
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    api.get(API_URL.FORM + "department/optometry/?assessment=objective")
      .then(res => {
        res.data.results.forEach(form => {
          if (form.name === "Binocular Vision")               OBJ_SCHEMA.BINOCULAR_VISION      = form.body;
          else if (form.name === "Refraction Assessment")     OBJ_SCHEMA.REFRACTION             = form.body;
          else if (form.name === "Special Diagnostic")        OBJ_SCHEMA.SPECIAL_DIAGNOSTIC     = form.body;
          else if (form.name === "Vision For Driving")        OBJ_SCHEMA.VISION_DRIVING          = form.body;
          else if (form.name === "Ocular Health / Structure") OBJ_SCHEMA.OCULAR_HEALTH           = form.body;
          else if (form.name === "Low Vision Assessment")     OBJ_SCHEMA.LOW_VISION_ASSESSMENT   = form.body;
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!isDirty || readOnly) return;
    const fn = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", fn);
    return () => window.removeEventListener("beforeunload", fn);
  }, [isDirty, readOnly]);

  const onChange = useCallback((name, value) => {
    if (readOnly) return;
    setIsDirty(true);
    setValues(v => ({ ...v, [name]: value }));
  }, [readOnly]);

  const handleAction = useCallback((type) => {
    if (type === "back") { onBack?.(); return; }
    if (readOnly) return;
    if (type === "next") {
      const idx = TAB_ORDER.indexOf(activeTab);
      if (idx < TAB_ORDER.length - 1) setActiveTab(TAB_ORDER[idx + 1]);
      return;
    }
    if (type === "clear") { setValues({}); setSubmitted(false); localStorage.removeItem(storageKey); }
    if (type === "save") {
      localStorage.setItem(storageKey, JSON.stringify({ values, updatedAt: new Date() }));
      setToast({ message: "Draft saved successfully", variant: "success" });
    }
  }, [readOnly, activeTab, storageKey, values, onBack]);

  const handleConfirmedSubmit = useCallback(async () => {
    setShowConfirm(false);
    try {
      const res = await api.post(API_URL.FORM + forms[0].id + "/assessment/", {
        patient: patient.id, visit_type: "IN",
        data: values || {}, score: values?.score || {}, total_score: values?.total_score || 0,
      });
      setToast({ message: res.data.message || "Assessment submitted successfully", variant: "success" });
    } catch {
      setToast({ message: "Submission failed. Please try again.", variant: "error" });
    }
    if (readOnly) return;
    setSubmitted(true);
    setIsDirty(false);
    onSubmit?.(values);
  }, [readOnly, values, onSubmit]);

  const schemaMap = useMemo(() => {
    const map = {};
    forms.forEach(form => {
      const key = form.assessment_type?.toLowerCase();
      if (key && TAB_ORDER.includes(key)) {
        map[key] = { ...form.body, actions: ACTIONS_WITH_NEXT };
      }
    });
    return map;
  }, [forms]);

  const handleReferralSubmit = useCallback(async ({ departments, notes, urgency }) => {
    try {
      await api.post(API_URL.PATIENT + "referral/", {
        patient_id: patient?.id, departments, notes, urgency, referred_by: "Optometry",
      });
      setToast({ message: `Referral sent to ${departments.length} department${departments.length > 1 ? "s" : ""}`, variant: "success" });
    } catch {
      setToast({ message: "Failed to send referral. Please try again.", variant: "error" });
    }
  }, [patient]);

  const retryForms = useCallback(() => {
    setFormsError(false);
    setFormsLoading(true);
    api.get(API_URL.FORM + "department/optometry/")
      .then(res => setForms(res.data.results))
      .catch(() => setFormsError(true))
      .finally(() => setFormsLoading(false));
  }, []);

  const activeTabIdx = TAB_ORDER.indexOf(activeTab);

  /* ===================== RENDER ===================== */
  return (
    <PatientContext.Provider value={patient}>
      {showReferral && (
        <ReferralModal patient={patient} onSubmit={handleReferralSubmit} onClose={() => setShowReferral(false)} />
      )}
      {toast && (
        <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />
      )}
      {showConfirm && (
        <ConfirmModal
          variant="submit"
          title={isFollowup ? "Submit Follow-up Visit?" : "Submit Assessment?"}
          message={isFollowup ? "You are about to submit this follow-up visit record." : "You are about to finalise and submit this optometry assessment."}
          meta={patient ? [
            { label: "Patient",    value: patient.email || patient.name || "—" },
            { label: "Visit Type", value: isFollowup ? "Follow-up" : "Initial Assessment" },
            { label: "Date",       value: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) },
          ] : []}
          checklist={[
            "All SOAP sections have been reviewed",
            "Assessment data is accurate and complete",
            "Submission cannot be edited after confirmation",
          ]}
          confirmLabel={isFollowup ? "Submit Follow-up" : "Submit Assessment"}
          onConfirm={handleConfirmedSubmit}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <div style={S.page}>
        {/* Patient header */}
        <div style={S.patientCardWrap}>
          <OptometryPatientInfo patient={patient} onReferral={() => setShowReferral(true)} isFollowup={isFollowup} />
        </div>

        {/* SOAP tab shell */}
        <div style={S.soapShell}>
          {/* Tab bar — full width equal columns */}
          <div style={S.tabBar}>
            {TAB_ORDER.map((tab, idx) => {
              const isActive = activeTab === tab;
              const isDone   = idx < activeTabIdx;
              return (
                <button
                  key={tab}
                  style={{ ...S.tab, ...(isActive ? S.tabActive : isDone ? S.tabDone : {}) }}
                  onClick={() => setActiveTab(tab)}
                >
                  {TAB_META[tab].label}
                </button>
              );
            })}
          </div>

          {/* Tab content — full width */}
          <div style={S.tabContent}>
            {formsLoading ? (
              <div style={S.contentPad}><ShimmerForm rows={6} /></div>
            ) : formsError ? (
              <div style={S.contentPad}>
                <EmptyState
                  icon="⚠️"
                  title="Failed to load form"
                  message="Could not fetch the assessment form. Please check your connection and try again."
                  action={{ label: "Retry", onClick: retryForms }}
                />
              </div>
            ) : !schemaMap[activeTab] ? (
              <div style={S.contentPad}>
                <EmptyState
                  icon="📋"
                  title="No form available"
                  message={`The ${activeTab} section hasn't been configured yet.`}
                />
              </div>
            ) : (
              <CommonFormBuilder
                schema={schemaMap[activeTab]}
                values={values}
                onChange={onChange}
                submitted={submitted}
                onAction={handleAction}
                assessmentRegistry={OPTOMETRY_ASSESSMENT_REGISTRY}
                readOnly={readOnly}
              >
                {!readOnly && activeTab !== "plan" && (
                  <div style={S.actionRow}>
                    <button
                      style={S.nextBtn}
                      onMouseEnter={e => e.currentTarget.style.background = "#1a6fc4"}
                      onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                      onClick={() => handleAction("next")}
                    >
                      Next: {TAB_META[TAB_ORDER[activeTabIdx + 1]]?.label} →
                    </button>
                  </div>
                )}
                {!readOnly && activeTab === "plan" && (
                  <div style={S.actionRow}>
                    <button
                      style={S.submitBtn}
                      onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                      onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                      onClick={() => setShowConfirm(true)}
                    >
                      {isFollowup ? "Submit Follow-up Visit" : "Submit Assessment"}
                    </button>
                  </div>
                )}
              </CommonFormBuilder>
            )}
          </div>
        </div>
      </div>
    </PatientContext.Provider>
  );
}

/* ===================== STYLES ===================== */
const S = {
  page: {
    background: "#f0f4f8",
    minHeight: "100vh",
    fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
    padding: "16px",
  },

  patientCardWrap: {
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
    marginBottom: 14,
    border: "1px solid #e0f2fe",
  },

  soapShell: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  },

  /* Tab bar — full width, equal columns */
  tabBar: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    background: "#fff",
    borderBottom: "1px solid #f1f5f9",
  },
  tab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 8px",
    background: "none",
    border: "none",
    borderBottom: "3px solid transparent",
    marginBottom: -1,
    fontSize: 13,
    fontWeight: 500,
    color: "#64748b",
    cursor: "pointer",
    transition: "color .15s",
    whiteSpace: "nowrap",
    letterSpacing: "0.01em",
  },
  tabActive: {
    color: "#2563eb",
    fontWeight: 700,
    borderBottomColor: "transparent",
    background: "none",
  },
  tabDone: {
    color: "#16a34a",
  },

  /* Tab content — full width */
  tabContent: {
    width: "100%",
  },
  contentPad: {
    padding: "24px",
  },

  /* Action row */
  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    padding: "16px 24px",
    borderTop: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  nextBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "9px 24px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background .15s",
    boxShadow: "0 1px 4px rgba(37,99,235,0.2)",
  },
  submitBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "9px 24px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background .15s",
    boxShadow: "0 1px 4px rgba(37,99,235,0.2)",
  },
};

/* ── Patient header card styles ─────────────────────────────────────────── */
const PI = {
  card: {
    background: "#fff",
    overflow: "hidden",
  },

  /* Sky blue clinical header */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background: "#dbeafe",
    borderBottom: "1px solid #bae6fd",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: "#0284c7",
    border: "2px solid #bae6fd",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: 800,
    flexShrink: 0,
  },
  name: {
    fontSize: 15,
    fontWeight: 700,
    color: "#0c4a6e",
    marginBottom: 2,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  metaChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    color: "#0369a1",
    fontWeight: 500,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "#0284c7",
    display: "inline-block",
  },
  metaDivider: {
    width: 1,
    height: 11,
    background: "#bae6fd",
    display: "inline-block",
  },
  headerActions: {
    display: "flex",
    gap: 8,
  },
  reportBtn: {
    display: "inline-flex",
    alignItems: "center",
    background: "#fff",
    border: "1px solid #bae6fd",
    color: "#0369a1",
    borderRadius: 6,
    padding: "6px 14px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background .15s",
  },
  referralBtn: {
    display: "inline-flex",
    alignItems: "center",
    background: "#0284c7",
    border: "none",
    color: "#fff",
    borderRadius: 6,
    padding: "6px 14px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background .15s",
  },

  /* Info grid — clean white, clinical */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    background: "#fff",
  },
  field: {
    padding: "10px 20px",
    minHeight: 52,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    marginBottom: 3,
  },
  fieldValue: {
    fontSize: 13,
    fontWeight: 500,
    color: "#1e293b",
  },
};
