import {
  lazy, Suspense,
  useEffect, useState, useCallback, useMemo, useRef,
  createContext, useContext, memo
} from "react";

// Common Form Builder
import CommonFormBuilder from "../features/CommonComponenets/FormBuilder.jsx";

// Utils
import { localDateTimeString } from "../shared/utils/dateFormatter";

// Patient Card
import PatientCard from "../shared/cards/PatientCard";

// UI
import Toast from "../shared/ui/Toast";
import EmptyState from "../shared/ui/EmptyState";
import { ShimmerForm } from "../shared/ui/Shimmer";
import ConfirmModal from "../shared/ui/ConfirmModal";
import ReferralModal from "../shared/ui/ReferralModal";

// API 
import api from "../shared/api/apiClient";
import { API_URL } from "../platform/config/api.config";

// Schema Load
import schemas from "../schema/optometry"
import actions from "../schema/actions.js";

// API calls
import fetchForms from "./fetchForms.js";


// ── Lazy-loaded assessment components ──────────────────────────────────────
const BinocularVisionAssessment   = lazy(() => import("../features/Optometry/BinocularVisionAssessment"));
const RefractionAssessment        = lazy(() => import("../features/Optometry/RefractionAssessment"));
const VisionAssessment            = lazy(() => import("../features/Optometry/VisionAssessment"));
const OcularHealthAssessment      = lazy(() => import("../features/Optometry/OcularHealthAssessment"));
const SpecialDiagnosticAssessment = lazy(() => import("../features/Optometry/SpecialDiagnostic"));
const LVQoLForm                   = lazy(() => import("../features/Optometry/LowVisionQualityAssessment"));
const BrainVisionInjury           = lazy(() => import("../features/Optometry/BrainVisionInjury"));
const VisualFunctionForm          = lazy(() => import("../features/Optometry/VisionFunctionalAssessment"));
const BVDAssessment               = lazy(() => import("../features/Optometry/BvdqAssessment"));
const LowVisionAssessment         = lazy(() => import("../features/Optometry/LowVisionAssessment"));

const AssessmentFallback = <ShimmerForm rows={6} />;

// ── Context ────────────────────────────────────────────────────────────────
// Carries patient + the questionaire FormData ID map + save helper
const PatientContext = createContext(null);

// Registry key → exact name as returned in assessment_ids from the backend
const REGISTRY_KEY_TO_NAME = {
  BINOCULAR_VISION:      "Binocular Vision",
  REFRACTION:            "Refraction Assessment",
  VISION_DRIVING:        "Vision for Driving",
  OCULAR_HEALTH:         "Ocular Health / Structure",
  SPECIAL_DIAGNOSTIC:    "Special Diagnostic",
  LOW_VISION_ASSESSMENT: "Low Vision Assessment",
  VISUAL_FUNCTION:       "Visual Function Questionnaire",
  LVQOL:                 "Low Vision Quality of Life Questionnaire (LVQoL)",
  BRAIN_VISION:          "Brain Injury Vision Symptoms Survey (BIVSS)",
  BVDQ:                  "Binocular Vision Dysfunction Questionnaire (BVDQ)",
  BV_QUESTIONNAIRE: "Binocular Vision Questionnaire",
};

const BV_QUESTIONNAIRE_SCHEMA = {
  title: "Binocular Vision Questionnaire",

  sections: [
    {
      fields: [
        {
          type: "subheading",
          label: "Binocular Vision"
        },

        {
          type: "radio",
          name: "bv_onset",
          label: "Onset",
          options: [
            { label: "Sudden", value: "sudden" },
            { label: "Gradual", value: "gradual" }
          ]
        },

        {
          type: "radio",
          name: "bv_frequency",
          label: "Frequency",
          options: [
            { label: "Constant", value: "constant" },
            { label: "Intermittent", value: "intermittent" },
            { label: "Alternating", value: "alternating" }
          ]
        },

        {
          type: "radio",
          name: "bv_was_he_been",
          label: "Neurological disease",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },

        {
          type: "input",
          name: "bv_was_he_been_specify",
          label: "Neurological – specify",
          showIf: {
            field: "bv_was_he_been",
            equals: "yes"
          }
        },

        {
          type: "row",
          fields: [
            {
              type: "input",
              name: "bv_type_of_birth",
              label: "Type of Birth"
            },
            {
              type: "input",
              name: "bv_birth_term",
              label: "Birth Term"
            }
          ]
        },

        {
          type: "input",
          name: "bv_previous_treatment",
          label: "Previous Treatment"
        },

        {
          type: "input",
          name: "bv_subjective_Remarks",
          label: "Remarks"
        },

        {
          type: "multi-select-dropdown",
          name: "bv_ocular_signs",
          label: "Ocular Signs",
          options: [
            { label: "Squint / turn of eyes", value: "Squint" },
            { label: "Defective eye movement", value: "Defective eye movement" },
            { label: "Nystagmus (wobbling eyes)", value: "Nystagmus" },
            { label: "Visual inattention / neglect", value: "Visual inattention" },
            { label: "Closing one eye", value: "Closing one eye" },
            { label: "Suspected visual problem", value: "Suspected visual problem" },
            { label: "Ptosis (lid drop)", value: "Ptosis" },
            { label: "Abnormal pupils", value: "Abnormal pupils" },
            { label: "Head turn", value: "Head turn" },
            { label: "Family concern", value: "Family concern" },
            { label: "Misjudging distance", value: "Misjudging distance" },
            { label: "Other (Specify)", value: "Other" }
          ]
        },

        {
          type: "input",
          name: "bv_ocular_signs_other",
          label: "Other – Specify",
          showIf: {
            field: "bv_ocular_signs",
            includes: "Other"
          }
        }
      ]
    }
  ]
};
const BVQuestionnaire = memo(function BVQuestionnaire({
  values,
  onChange,
  onBack,
  layout = "root"
}) {
  const [submitted, setSubmitted] = useState(false);

  const onAction = useCallback((type) => {
    if (type === "submit") setSubmitted(true);
    if (type === "back") onBack?.();
  }, [onBack]);

  return (
    <CommonFormBuilder
      schema={BV_QUESTIONNAIRE_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
      layout={layout}
    />
  );
});
// ── Adapter factory ────────────────────────────────────────────────────────
// Each adapter: reads its FormData ID from context, loads existing data,
// auto-saves on every field change (1 s debounce).
function makeAdapter(Component, activeKey, registryKey) {
  const Adapter = memo(function Adapter({ onChange: outerOnChange, layout }) {
    const ctx = useContext(PatientContext);
    const patient          = ctx?.patient   ?? ctx;   // backward-compat
    const questionaireIds  = ctx?.questionaireIds ?? {};
    const formDataId       = questionaireIds[registryKey] ?? null;

    const [values,  setValues]  = useState({});
    const [loading, setLoading] = useState(false);
    const saveTimer = useRef(null);

    // Load existing data when the sub-assessment opens
    useEffect(() => {
      if (!formDataId) return;
      setLoading(true);
      api.get(API_URL.ASSESSMENT + `data/${formDataId}/`)
        .then(res => {
          const existing = res.data?.data;
          if (existing && typeof existing === 'object' && Object.keys(existing).length > 0) {
            setValues(existing);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, [formDataId]);

    const handleChange = useCallback((name, value) => {
      setValues(v => {
        const next = { ...v, [name]: value };
        // Debounced PATCH
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
          if (formDataId) {
            api.patch(API_URL.ASSESSMENT + `data/${formDataId}/`, { data: next })
              .catch(() => {});
          }
        }, 1000);
        return next;
      });
    }, [formDataId]);

    const handleBack = useCallback(() => {
      outerOnChange(activeKey, null);
    }, [outerOnChange]);

    if (loading) return <ShimmerForm rows={5} />;

    return (
      <Suspense fallback={AssessmentFallback}>
        <Component
          patient={patient}
          values={values}
          onChange={handleChange}
          onBack={handleBack}
          layout={layout}
        />
      </Suspense>
    );
  });
  return Adapter;
}

const BinocularVisionAdapter    = makeAdapter(BinocularVisionAssessment,  "optometry_assessments_active", "BINOCULAR_VISION");
const RefractionAdapter         = makeAdapter(RefractionAssessment,        "optometry_assessments_active", "REFRACTION");
const VisionAdapter             = makeAdapter(VisionAssessment,            "optometry_assessments_active", "VISION_DRIVING");
const OcularHealthAdapter       = makeAdapter(OcularHealthAssessment,      "optometry_assessments_active", "OCULAR_HEALTH");
const SpecialDiagnosticAdapter  = makeAdapter(SpecialDiagnosticAssessment, "optometry_assessments_active", "SPECIAL_DIAGNOSTIC");
const LVQoLAdapter              = makeAdapter(LVQoLForm,                   "optometry_assessments_active", "LVQOL");
const BrainVisionAdapter        = makeAdapter(BrainVisionInjury,           "optometry_assessments_active", "BRAIN_VISION");
const VisualFunctionAdapter     = makeAdapter(VisualFunctionForm,          "optometry_assessments_active", "VISUAL_FUNCTION");
const BVDQAdapter               = makeAdapter(BVDAssessment,               "optometry_assessments_active", "BVDQ");
const LowVisionAdapter          = makeAdapter(LowVisionAssessment,         "low_vision_assessment_active", "LOW_VISION_ASSESSMENT");
const BVQuestionnaireAdapter =
  makeAdapter(
    BVQuestionnaire,
    "optometry_assessments_active",
    "BV_QUESTIONNAIRE"
  );

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
  BV_QUESTIONNAIRE: BVQuestionnaireAdapter,
};

/** 
 * This component is responsible for fetching the assessment forms
 * for the given department and rendering the appropriate tab
 * content based on the active tab. It also manages the state of the 
 * assessment values, loading state, any errors, retry logic, toast notifications,
 * starting the assessment session, end session, submission of the assessment
 * and also for the referral management, equipments booking, and mapping codes to the session.
 * @param {Object} patient - The patient object containing patient details
 * @param {String} department - The department for which the assessment forms are to be fetched
*/

export default function AssessmentLoader({
  patient, 
  department
}) 
{
  // Extract Tab
  const TABS = actions.ASSESSMENT_TABS
  // Set up state to track which assessment is active and its values
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(false);  //formsError, setFormsError
  const [templates, setTemplates] = useState([]);   //[forms, setForms]
  const [isLoading, setIsLoading] = useState(true); // formsLoading,  setFormsLoading
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [assessmentId, setAssessmentId] = useState(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isReferralModal, setIsReferralModal] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [assessmentsValues, setAssessmentsValues] = useState({});
  
  // Mapping template to the schema registry
  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoading(true)
      const map = {}
      const data = await fetchForms(department)
      if(!data || data.length === 0) {
        setError(true)
      }
      data.forEach(template => {
        const key = template.assessment_type?.toLowerCase();
        if(TABS.includes(key)){
          map[key] = { ...template.body, actions: actions.ACTIONS_BUTTON}
        }
      })
      setTemplates(map)
      setIsLoading(false)
    }
    loadTemplates()
  }, [department])

  // UI Components for rendering the assessment forms and sub assessments tab-wise will go here
  return (
    <PatientContext.Provider value={{ patient}} >
      {/* Referral Modal */}
      {
        isReferralModal && (
          <ReferralModal
            patient={patient}
            // onSubmit={handleReferralSubmit}
            onClose={() => setIsReferralModal(false)}
          />
        )
      }
      {/* Toast Notifications */}
      {
        toast && (
          <Toast
            message={toast.message}
            variant={toast.variant}
            onClose={() => setToast(null)}
          />
        )
      }
      {/* Confirmation Modal  */}
      {
        isConfirmModal && (
          <ConfirmModal
            variant="submit"
            title="Submit Assessment?"
            confirmLabel="Submit Assessment"
            // onConfirm={handleConfirmedSubmit}
            onCancel={() => setIsConfirmModal(false)}
            message="You are about to finalise and submit this assessment."
            meta= {
              patient?[
                { label: "Patient", value: patient.email || patient.name || "—" },
                { label: "Visit Type", value: templates?[0]?.assessment_type.upperCase() : "—" },
                { label: "Date", value: localDateTimeString(new Date()) }
              ] : []
            }
            checklist={
              [
                "All SOAP sections have been reviewed",
                "Assessment data is accurate and complete",
                "Submission cannot be edited after confirmation",
              ]
            }
          />
        )
      }
      <div style={S.page}>
        {/* Referral and Start Assessment Button UI */}
        <div style={S.actionBar}>
          {/* Session Start Button UI */}
          <button
            style={{
              opacity: isSessionActive ? 0.7 : 1,
              transition: "background .15s, opacity .15s",
              color: assessmentId ? "#0369a1" : "#fff",
              cursor: isSessionActive ? "not-allowed" : "pointer",
              display: "inline-flex", alignItems: "center", gap: 5,
              background: assessmentId ? "#e0f2fe" : "#0284c7",
              border: assessmentId ? "1.5px solid #bae6fd" : "none",
              borderRadius: 6, padding: "6px 16px", fontSize: 12, fontWeight: 700,
            }}
            disabled={isSessionActive || !!assessmentId}
            onClick={!assessmentId && !isSessionActive ? 'handleStart': undefined} //handleStart
            onMouseEnter={e => { if (!assessmentId) e.currentTarget.style.background = "#0369a1"; }}
            onMouseLeave={e => { if (!assessmentId) e.currentTarget.style.background = "#0284c7"; }}
            title={assessmentId ? `Session active: ${assessmentId}` : "Start a new assessment session"}
          >
            { isSessionActive ? "Starting…": assessmentId ? "✓ Started" : "Start" }
          </button>
          {/* Referral Button UI */}
          <button
            style={{
              display: "inline-flex", alignItems: "center",
              borderRadius: 6, padding: "6px 14px", fontSize: 12,
              background: "#0284c7", border: "none", color: "#fff",
              fontWeight: 600, cursor: "pointer", transition: "background .15s",
            }}
            onClick={() => setIsReferralModal(true)}     
            onMouseLeave={e => e.currentTarget.style.background = "#0284c7"}  
            onMouseEnter={e => e.currentTarget.style.background = "#0369a1"}  
          >
            Referral
          </button>
        </div>
        {/* Patient Details in top of the page */}
        <div style={S.patientCardWrap}><PatientCard patient={patient}/></div>
        {/* Assessment Tabs */}
        <div style={S.soapShell}>
          {/* Tab Buttons UI */}
          <div style={S.tabBar}>
            {
              TABS.map((tab, idx) => {
                const isActive  = activeTab === tab;
                const isDone    = idx < TABS.indexOf(activeTab);
                const hasData   = '' //= !!formDataIds[tab]; 
                // Tab Button
                return (
                  <button
                    key={tab}
                    onClick={ ()=> setActiveTab(tab)}
                    style={{ ...S.tab, ...(isActive ? S.tabActive : isDone ? S.tabDone : {}) }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {
                      hasData && (
                        <span
                          title="Template data linked"
                          style={{
                            display: "inline-block", flexShrink: 0,
                            background: isActive ? "#2563eb" : "#10b981",
                            marginLeft: 6, width: 7, height: 7, borderRadius: "50%",
                          }}
                        />
                      )
                    }
                  </button>
                )
              })
            }
          </div>
          {/* Tab Content UI */}
          <div style={S.tabContent}>
            {
              isLoading ? (<div style={S.contentPad}><ShimmerForm rows={6} /></div>) :
              error ? (
                <div style={S.contentPad}>
                   <EmptyState
                      icon="⚠️"
                      title="Failed to load form"
                      message="Could not fetch the assessment form. Please check your connection and try again."
                      // action={{ label: "Retry", onClick: retryForms }}
                />
                </div>
              ) : !templates[activeTab] ? (
                <div style={S.contentPad}>
                  <EmptyState
                    icon="📋"
                    title="No form available"
                    message={`The ${activeTab} section hasn't been configured yet.`}
                  />
                </div>
              ) : (
                <CommonFormBuilder
                  // readOnly={readOnly}
                  // onChange={onChange}
                  // submitted={submitted}
                  // onAction={handleAction}
                  schema={templates[activeTab]}
                  values={assessmentsValues[activeTab] || {}}
                  assessmentRegistry={OPTOMETRY_ASSESSMENT_REGISTRY}
                >
                  <div style={S.actionRow}>
                    <button
                      style={activeTab === "plan"? S.submitBtn : S.nextBtn}
                      onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                      onMouseEnter={e => e.currentTarget.style.background = 
                        activeTab === "plan"? "#1d4ed8" : "#1a6fc4"}
                      onClick={() => activeTab === "plan" ? setIsConfirmModal(true) : undefined } //handleAction("next")
                    >
                      {
                        activeTab === "plan" ? "Submit Assessment" :
                        "Next :" + activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + "→"
                      }
                    </button>
                  </div>
                </CommonFormBuilder>
              )
            }
          </div>
          
        </div>
      </div>
    </PatientContext.Provider>
  )



}
/* ===================== MAIN COMPONENT ===================== */

/** Initial optometry SOAP assessment only (follow-up uses OptometryFollowUpAssessment.jsx). */
// export default function OptometryAssessment({
//   patient,
//   onSubmit,
//   onBack,
//   savedValues          = null,
//   readOnly             = false,
//   initialSessionId     = null,   // pre-seeded when opened via direct link
//   initialAssessmentIds = [],     // pre-seeded assessment_ids array
// }) {
//   const [values,        setValues]        = useState(readOnly && savedValues ? savedValues : {});
//   const [submitted,     setSubmitted]     = useState(readOnly);
//   const [activeTab,     setActiveTab]     = useState("subjective");
//   const [forms,         setForms]         = useState([]);  // kept for future API integration
//   const [formsLoading,  setFormsLoading]  = useState(false);
//   const [formsError,    setFormsError]    = useState(false);
//   const [showConfirm,   setShowConfirm]   = useState(false);
//   const [isDirty,       setIsDirty]       = useState(false);
//   const [toast,         setToast]         = useState(null);
//   const [assessmentId,  setAssessmentId]  = useState(initialSessionId);
//   const [formDataIds,   setFormDataIds]   = useState(() => {
//     const idMap = {};
//     (initialAssessmentIds || []).forEach(fd => {
//       if ((fd.form_type || '').toUpperCase() === 'INITIAL') {
//         const key = (fd.type || '').toLowerCase();
//         if (key) idMap[key] = fd.id;
//       }
//     });
//     return idMap;
//   });
//   const [questionaireIds, setQuestionaireIds] = useState(() => {
//     const qMap = {};
//     (initialAssessmentIds || []).forEach(fd => {
//       if ((fd.form_type || '').toUpperCase() === 'QUESTIONNAIRE' || (fd.form_type || '').toUpperCase() === 'QUESTIONAIRE') {
//         const regKey = Object.keys(REGISTRY_KEY_TO_NAME).find(
//           k => REGISTRY_KEY_TO_NAME[k] === fd.name
//         );
//         if (regKey) qMap[regKey] = fd.id;
//       }
//     });
//     return qMap;
//   });
//   const [starting,      setStarting]      = useState(false);
//   const [tabLoading,    setTabLoading]    = useState(false);
//   const autoSaveTimer = useRef(null);


//   useEffect(() => {
//     if (!patient || readOnly) return;
//     setValues(v => ({
//       ...v,
//       pmh_from_registration:           patient.medical_history   || "No data available",
//       family_history_from_registration: patient.diagnosis_history || "No data available",
//       allergies_from_registration:      patient.allergies         || "No data available",
//     }));
//   }, [patient, readOnly]);

//   // ── Fetch FormData for the active tab whenever the session is active ──────
//   useEffect(() => {
//     const formDataId = formDataIds[activeTab];
//     if (!formDataId || !assessmentId) return;

//     setTabLoading(true);
//     api.get(API_URL.ASSESSMENT + `data/${formDataId}/`)
//       .then(res => {
//         const existing = res.data?.data;
//         if (existing && typeof existing === 'object' && Object.keys(existing).length > 0) {
//           setValues(v => ({ ...v, ...existing }));
//         }
//       })
//       .catch(() => {/* silently ignore — form stays editable */})
//       .finally(() => setTabLoading(false));
//   }, [activeTab, formDataIds, assessmentId]);

//   const schemaMap = {
//     plan: schemas.PLAN,
//     objective: schemas.OBJECTIVE,
//     subjective: schemas.SUBJECTIVE,
//     assessment: schemas.ASSESSMENT,
//   };

//   useEffect(() => {
//     if (!isDirty || readOnly) return;
//     const fn = (e) => { e.preventDefault(); e.returnValue = ""; };
//     window.addEventListener("beforeunload", fn);
//     return () => window.removeEventListener("beforeunload", fn);
//   }, [isDirty, readOnly]);

//   const onChange = useCallback((name, value) => {
//     if (readOnly) return;
//     setIsDirty(true);
//     setValues(v => {
//       const next = { ...v, [name]: value };

//       // Debounced auto-save to API (1.5 s after last keystroke)
//       if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
//       autoSaveTimer.current = setTimeout(() => {
//         const formDataId = formDataIds[activeTab];
//         if (formDataId && assessmentId) {
//           api.patch(API_URL.ASSESSMENT + `data/${formDataId}/`, { data: next })
//             .catch(() => {/* silent — user can still hit Save manually */});
//         }
//         // Always persist draft locally too
//         if (storageKey) {
//           localStorage.setItem(storageKey, JSON.stringify({ values: next, updatedAt: new Date() }));
//         }
//       }, 1500);

//       return next;
//     });
//   }, [readOnly, activeTab, formDataIds, assessmentId, storageKey]);

//   // ── Start assessment session ──────────────────────────────────────────────
//   const handleStart = useCallback(async () => {
//     if (!patient) return;

//     // Get the logged-in doctor's id from localStorage
//     let doctorId = null;
//     try {
//       const me = JSON.parse(localStorage.getItem("user") || "{}");
//       doctorId = me.id || null;
//     } catch {}

//     if (!doctorId) {
//       setToast({ message: 'Could not identify logged-in doctor. Please re-login.', variant: 'error' });
//       return;
//     }

//     setStarting(true);
//     try {
//       const res = await api.post(
//         API_URL.ASSESSMENT + 'optometry/start',
//         {
//           doctor:       doctorId,
//           patient:      patient.id,
//           visit_type:   'INITIAL',
//           is_completed: false,
//           total_score:  0,
//         }
//       );
//       const data = res.data;
//       setAssessmentId(data.id);

//       // Map FormData ids — only INITIAL form_type gives one record per SOAP tab
//       const idMap = {};
//       const qMap  = {};   // QUESTIONAIRE sub-assessments keyed by registry key
//       (data.assessment_ids || []).forEach(fd => {
//         const ft = (fd.form_type || '').toUpperCase();
//         if (ft === 'INITIAL') {
//           const key = (fd.type || '').toLowerCase();
//           if (key) idMap[key] = fd.id;
//         } else if (ft === 'QUESTIONNAIRE' || ft === 'QUESTIONAIRE') {
//           // Match by name to registry key
//           const regKey = Object.keys(REGISTRY_KEY_TO_NAME).find(
//             k => REGISTRY_KEY_TO_NAME[k] === fd.name
//           );
//           if (regKey) qMap[regKey] = fd.id;
//         }
//       });
//       setFormDataIds(idMap);
//       setQuestionaireIds(qMap);
//       setToast({ message: 'Assessment session started', variant: 'success' });
//     } catch (err) {
//       const detail = err?.response?.data;
//       const msg = typeof detail === 'object'
//         ? Object.values(detail).flat().join(' ')
//         : 'Failed to start assessment. Please try again.';
//       setToast({ message: msg, variant: 'error' });
//     } finally {
//       setStarting(false);
//     }
//   }, [patient]);

//   const handleAction = useCallback((type) => {
//     if (type === "back") { onBack?.(); return; }
//     if (readOnly) return;
//     if (type === "next") {
//       const idx = actions.ASSESSMENT_TABS.indexOf(activeTab);
//       if (idx < actions.ASSESSMENT_TABS.length - 1) setActiveTab(actions.ASSESSMENT_TABS[idx + 1]);
//       return;
//     }
//     if (type === "clear") { setValues({}); setSubmitted(false); localStorage.removeItem(storageKey); }
//     if (type === "save") {
//       // Persist draft locally
//       localStorage.setItem(storageKey, JSON.stringify({ values, updatedAt: new Date() }));

//       // Push to API immediately on explicit Save click
//       if (assessmentId) {
//         const formDataId = formDataIds[activeTab];
//         if (formDataId) {
//           api.patch(API_URL.ASSESSMENT + `data/${formDataId}/`, { data: values })
//             .then(() => setToast({ message: 'Saved successfully', variant: 'success' }))
//             .catch(() => setToast({ message: 'Save failed. Draft kept locally.', variant: 'error' }));
//         } else {
//           setToast({ message: 'Draft saved locally', variant: 'success' });
//         }
//       } else {
//         setToast({ message: 'Draft saved locally (start a session to sync)', variant: 'success' });
//       }
//     }
//   }, [readOnly, activeTab, storageKey, values, onBack, assessmentId, formDataIds]);

//   const handleConfirmedSubmit = useCallback(async () => {
//     setShowConfirm(false);
//     if (readOnly) return;

//     // End the session if one is active
//     if (assessmentId) {
//       try {
//         await api.patch(API_URL.ASSESSMENT + `session/${assessmentId}/end/`);
//         setToast({ message: "Assessment submitted and session ended", variant: "success" });
//       } catch {
//         setToast({ message: "Submission failed. Please try again.", variant: "error" });
//         return;
//       }
//     } else {
//       setToast({ message: "Assessment submitted (no active session)", variant: "success" });
//     }

//     setSubmitted(true);
//     setIsDirty(false);
//     onSubmit?.(values);
//   }, [readOnly, values, onSubmit, assessmentId]);

//   // const schemaMap = useMemo(() => {
//   //   const map = {};
//   //   forms.forEach(form => {
//   //     const key = form.assessment_type?.toLowerCase();
//   //     if (key && TAB_ORDER.includes(key)) {
//   //       map[key] = { ...form.body, actions: ACTIONS_WITH_NEXT };
//   //     }
//   //   });
//   //   return map;
//   // }, [forms]);

//   const handleReferralSubmit = useCallback(async ({ departments, notes, urgency }) => {
//     try {
//       await api.post(API_URL.PATIENT + "referral/", {
//         patient_id: patient?.id, departments, notes, urgency, referred_by: "Optometry",
//       });
//       setToast({ message: `Referral sent to ${departments.length} department${departments.length > 1 ? "s" : ""}`, variant: "success" });
//     } catch {
//       setToast({ message: "Failed to send referral. Please try again.", variant: "error" });
//     }
//   }, [patient]);

//   // const retryForms = useCallback(() => {
//   //   setFormsError(false);
//   //   setFormsLoading(true);
//   //   api.get(API_URL.FORM + "department/optometry/")
//   //     .then(res => setForms(res.data.results))
//   //     .catch(() => setFormsError(true))
//   //     .finally(() => setFormsLoading(false));
//   // }, []);

//   const activeTabIdx = actions.ASSESSMENT_TABS.indexOf(activeTab);


/* ===================== STYLES ===================== */
const S = {
  page: {
    background: "#f0f4f8",
    minHeight: "100vh",
    fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
    padding: "16px",
  },

  actionBar: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
    marginBottom: 10,
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
// end of file
