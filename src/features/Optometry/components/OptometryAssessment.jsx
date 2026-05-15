import {
  lazy, Suspense,
  useEffect, useState, useCallback, useMemo, useRef,
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

const ACTIONS_PLAN_ONLY = [
  { type: "back", label: "Back" },
  { type: "clear", label: "Clear" },
  { type: "save", label: "Save" }
];


const OPTOMETRY_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
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
const OptometryPatientInfo = memo(function OptometryPatientInfo({ patient, onReferral, isFollowup, onStart, starting, assessmentId, onCopyLink }) {
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
            onMouseEnter={e => e.currentTarget.style.background = "#0369a1"}
            onMouseLeave={e => e.currentTarget.style.background = "#0284c7"}
            onClick={() => alert("Report will be generating soon")}
          >
            Doctors Report
          </button>
          {/* ── Start button ── */}
          <button
            style={{
              ...PI.startBtn,
              opacity: starting ? 0.7 : 1,
              cursor: starting ? "not-allowed" : "pointer",
              background: assessmentId ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.92)",
              color: assessmentId ? "#fff" : "#0369a1",
              border: assessmentId ? "1.5px solid rgba(255,255,255,0.5)" : "none",
            }}
            onMouseEnter={e => { if (!assessmentId) e.currentTarget.style.background = "rgba(255, 255, 255, 0.75)"; }}
            onMouseLeave={e => { if (!assessmentId) e.currentTarget.style.background = "rgba(255,255,255,0.92)"; }}
            onClick={!assessmentId && !starting ? onStart : undefined}
            disabled={starting || !!assessmentId}
            title={assessmentId ? `Session active: ${assessmentId}` : "Start a new assessment session"}
          >
            {starting ? "Starting…" : assessmentId ? "✓ Started" : "Start"}
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

      {/* ── Session ID banner (shown only after Start) ── */}
      {assessmentId && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "6px 20px",
          background: "#f0fdf4",
          borderBottom: "1px solid #bbf7d0",
          flexWrap: "wrap",
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Session ID
          </span>
          <span style={{
            fontFamily: "monospace", fontSize: 12, fontWeight: 600,
            color: "#166534", background: "#dcfce7",
            border: "1px solid #bbf7d0", borderRadius: 4,
            padding: "2px 8px", letterSpacing: "0.3px",
            userSelect: "all",
          }}>
            {assessmentId}
          </span>
          <button
            title="Copy shareable link with your token — recipient opens directly without login"
            style={{
              marginLeft: 4,
              padding: "2px 10px", borderRadius: 4,
              background: "#16a34a", color: "#fff",
              border: "none", fontSize: 11, fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => {
              const token     = localStorage.getItem("access_token") || "";
              const patientId = patient?.id || "";
              const url = `${window.location.origin}/optometry/assessment/${assessmentId}?patient_id=${patientId}&token=${token}`;
              navigator.clipboard.writeText(url).then(() => onCopyLink?.());
            }}
          >
            Copy Link
          </button>
          <span style={{ fontSize: 11, color: "#86efac" }}>— share this link; recipient opens directly</span>
        </div>
      )}

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
  savedValues          = null,
  readOnly             = false,
  mode                 = "initial",
  initialSessionId     = null,   // pre-seeded when opened via direct link
  initialAssessmentIds = [],     // pre-seeded assessment_ids array
}) {
  const [values,        setValues]        = useState(() => {
    const initial = { subjective: {}, objective: {}, assessment: {}, plan: {} };
    return readOnly && savedValues ? savedValues : initial;
  });
  const [submitted,     setSubmitted]     = useState(readOnly);
  const [activeTab,     setActiveTab]     = useState("subjective");
  const [forms,         setForms]         = useState([]);  // kept for future API integration
  const [formsLoading,  setFormsLoading]  = useState(false);
  const [formsError,    setFormsError]    = useState(false);
  const [showConfirm,   setShowConfirm]   = useState(false);
  const [isDirty,       setIsDirty]       = useState(false);
  const [toast,         setToast]         = useState(null);
  const [showReferral,  setShowReferral]  = useState(false);
  const [assessmentId,  setAssessmentId]  = useState(initialSessionId);
  const [formDataIds,   setFormDataIds]   = useState(() => {
    const idMap = {};
    (initialAssessmentIds || []).forEach(fd => {
      if ((fd.form_type || '').toUpperCase() === 'INITIAL') {
        const key = (fd.type || '').toLowerCase();
        if (key) idMap[key] = fd.id;
      }
    });
    return idMap;
  });
  const [questionaireIds, setQuestionaireIds] = useState(() => {
    const qMap = {};
    (initialAssessmentIds || []).forEach(fd => {
      if ((fd.form_type || '').toUpperCase() === 'QUESTIONNAIRE' || (fd.form_type || '').toUpperCase() === 'QUESTIONAIRE') {
        const regKey = Object.keys(REGISTRY_KEY_TO_NAME).find(
          k => REGISTRY_KEY_TO_NAME[k] === fd.name
        );
        if (regKey) qMap[regKey] = fd.id;
      }
    });
    return qMap;
  });
  const [starting,      setStarting]      = useState(false);
  const [tabLoading,    setTabLoading]    = useState(false);
  const autoSaveTimer = useRef(null);

  const isFollowup = mode === "followup";

  const storageKey = useMemo(() => {
    if (!patient || readOnly) return null;
    return isFollowup
      ? `optometry_followup_draft_${patient.id}`
      : `optometry_assessment_draft_${patient.id}`;
  }, [patient, readOnly, isFollowup]);

  useEffect(() => {
    const formDataId = formDataIds[activeTab];
    if (!formDataId || !assessmentId) return;

    setTabLoading(true);
    api.get(API_URL.ASSESSMENT + `data/${formDataId}/`)
      .then(res => {
        const existing = res.data?.data;
        if (existing && typeof existing === 'object' && Object.keys(existing).length > 0) {
          setValues(v => ({
            ...v,
            [activeTab]: {
              ...v[activeTab],
              ...existing
            }
          }));
        }
      })
      .catch(() => {/* silently ignore — form stays editable */})
      .finally(() => setTabLoading(false));
  }, [activeTab, formDataIds, assessmentId]);

  const sectionShowIf = (key) => (isFollowup ? { field: "general_questions", includes: key } : undefined);
  const sectionShowIfAnd = (key, andCond) =>
  isFollowup ? { field: "general_questions", includes: key, and: andCond } : (andCond || undefined);

  const SUBJECTIVE_SCHEMA = {
    actions: ACTIONS_WITH_NEXT,
    sections: [
      {
        fields: [
          {
            name: "chief_complaint",
            label: "Chief Complaint",
            type: "input"
          },
          {
            name: "hpi",
            label: "History of Present Illness",
            type: "input"
          },
          ...(isFollowup
            ? [
              {
                name: "general_questions",
                type: "checkbox-group",
                options: [
                  { label: "Patient Vision & Case History", value: "patient_vision_case" },
                  { label: "External Eye Symptoms", value: "external_eye_symptoms" },
                  { label: "Ocular History & Eye Conditions", value: "ocular_history" },
                  { label: "Binocular Vision", value: "binocular_vision" },
                  { label: "Questionnaires", value: "questionnaires" }
                ]
              }
            ]
            : []),
            {
            type: "subheading",
            label: "Presenting Symptoms",
          },
                    // External Eye Symptoms Section
          {
            type: "subheading",
            label: "External Eye Symptoms",
            ...(sectionShowIf("external_eye_symptoms") && { showIf: sectionShowIf("external_eye_symptoms") })
          },
          {
            name: "external_eye_symptoms_checkboxes",
            type: "checkbox-group",
            options: [
              { label: "Grittiness", value: "grittiness" },
              { label: "Burning", value: "burning" },
              { label: "Itchiness", value: "itchiness" },
              { label: "Dryness", value: "dryness" },
              { label: "Tearing", value: "tearing" },
              { label: "Infection", value: "infection" },
              { label: "Others", value: "other_external_eye_symptoms" }
            ],
            ...(sectionShowIf("external_eye_symptoms") && { showIf: sectionShowIf("external_eye_symptoms") })
          },

          {
            type: "input",
            name: "external_eye_symptoms_specify",
            label: "Specify",
            showIf: {
              ...(sectionShowIf("external_eye_symptoms") || {}),
              and: {
                field: "external_eye_symptoms_checkboxes",
                includes: "other_external_eye_symptoms"
              }
            }
          },
          {
            type: "subheading",
            label: "Visual Symptoms",
            ...(sectionShowIf("external_eye_symptoms") && { showIf: sectionShowIf("external_eye_symptoms") })
          },
          {
            name: "visual_ocular_symptoms",
            type: "checkbox-group",
            options: [
              { label: "Vision screening", value: "vision_screening" },
              { label: "Blurry vision", value: "blurry_vision" },
              { label: "Double vision (Diplopia)", value: "double_vision" },
              { label: "Night vision difficulty", value: "night_vision" },
              { label: "Flash of light", value: "flash_light" },
              { label: "Floaters/spots in vision", value: "floaters" },
              { label: "Eye pain", value: "eye_pain" },
              { label: "Headaches", value: "headaches" },
              { label: "Squinting", value: "squinting" },
              { label: "Emmetropia (Normal Vision)", value: "emmetropia" },
              { label: "Others", value: "other_visual_ocular_symptoms" }
            ],
            ...(sectionShowIf("external_eye_symptoms") && { showIf: sectionShowIf("external_eye_symptoms") })
          },

          {
            type: "input",
            name: "refraction_questions_specify",
            label: "Specify",
            showIf: {
              ...(sectionShowIf("external_eye_symptoms") || {}),
              and: {
                field: "visual_ocular_symptoms",
                includes: "other_visual_ocular_symptoms"
              }
            }
          },
          {
            type: "subheading",
            label: "Ocular Symptoms",
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          {
            name: "ocular_symptoms",
            type: "checkbox-group",
            options: [
              { label: "Grittiness", value: "grittiness" },
              { label: "Burning", value: "burning" },
              { label: "Itchiness", value: "itchiness" },
              { label: "Dryness", value: "dryness" },
              { label: "Tearing", value: "tearing" },
              { label: "Infection", value: "infection" },
              { label: "Eye pain", value: "eye_pain" },
              { label: "Others", value: "other_ocular_symptoms" }
            ],
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },

          {
            type: "input",
            name: "ocular_symptoms_specify",
            label: "Specify",
            showIf: {
              ...(sectionShowIf("ocular_history") || {}),
              and: {
                field: "ocular_symptoms",
                includes: "other_ocular_symptoms"
              }
            }
          },
          // Patient Vision & Case History (always visible in IA; in follow-up only when selected)
          {
            type: "subheading",
            label: "Patient Vision & Case History",
            ...(sectionShowIf("patient_vision_case") && { showIf: sectionShowIf("patient_vision_case") })
          },
          {
            type: "date",
            name: "last_eye_exam",
            label: "Date of last eye examination",
            ...(sectionShowIf("patient_vision_case") && { showIf: sectionShowIf("patient_vision_case") })
          },
          {
            type: "radio",
            name: "spectacles_use",
            label: "Spectacles use",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ],
            ...(sectionShowIf("patient_vision_case") && { showIf: sectionShowIf("patient_vision_case") })
          },
          {
            type: "input",
            name: "spectacle_prescription",
            label: "Prescription",
            showIf: sectionShowIfAnd("patient_vision_case", { field: "spectacles_use", equals: "yes" }) || { field: "spectacles_use", equals: "yes" }
          },
          {
            type: "radio",
            name: "contact_lens_use",
            label: "Contact lens use",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ],
            ...(sectionShowIf("patient_vision_case") && { showIf: sectionShowIf("patient_vision_case") })
          },
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "contact_prescription",
                label: "Prescription",
                showIf: { field: "contact_lens_use", equals: "yes" }
              },
              {
                type: "input",
                name: "contact_type",
                label: "Type",
                showIf: { field: "contact_lens_use", equals: "yes" }
              }
            ],
            showIf: sectionShowIfAnd("patient_vision_case", { field: "contact_lens_use", equals: "yes" }) || { field: "contact_lens_use", equals: "yes" }
          },
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "contact_wearing_frequency",
                label: "Wearing frequency",
                showIf: { field: "contact_lens_use", equals: "yes" }
              },
              {
                type: "input",
                name: "contact_modalities",
                label: "Modalities",
                showIf: { field: "contact_lens_use", equals: "yes" }
              }
            ],
            showIf: sectionShowIfAnd("patient_vision_case", { field: "contact_lens_use", equals: "yes" }) || { field: "contact_lens_use", equals: "yes" }
          },
          {
            type: "input",
            name: "others_specify",
            label: "Specify",
            ...(sectionShowIf("patient_vision_case") && { showIf: sectionShowIf("patient_vision_case") })
          },
          {
            name: "pmh_from_registration",
            label: "Medical History",
            type: "input",
            readOnly: true,
            ...(sectionShowIf("patient_vision_case") && { showIf: sectionShowIf("patient_vision_case") })
          },
          {
            name: "family_history_from_registration",
            label: "Family History",
            type: "input",
            readOnly: true,
            ...(sectionShowIf("patient_vision_case") && { showIf: sectionShowIf("patient_vision_case") })
          },
          {
            name: "allergies_from_registration",
            label: "Allergies",
            type: "input",
            readOnly: true,
            ...(sectionShowIf("patient_vision_case") && { showIf: sectionShowIf("patient_vision_case") })
          },
          // Binocular Vision Section (follow-up: content till Ocular Signs)          
          // OCULAR HISTORY & EYE CONDITIONS Section
          {
            type: "subheading",
            label: "Ocular History & Eye Conditions",
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          
          {
            type: "subheading",
            label: "Past Ocular History",
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          {
            name: "past_ocular_history",
            type: "checkbox-group",
            options: [
              { label: "Cataract", value: "cataract" },
              { label: "Corneal abrasion", value: "corneal_abrasion" },
              { label: "Dry eye", value: "dry_eye" },
              { label: "Eye turn", value: "eye_turn" },
              { label: "Glaucoma", value: "glaucoma" },
              { label: "Injury", value: "injury" },
              { label: "Iritis/Uveitis", value: "iritis" },
              { label: "Lazy eye", value: "lazy_eye" },
              { label: "Macular degeneration", value: "macular_degeneration" },
              { label: "Retinal defect/hole/tear", value: "retinal_defect" },
              { label: "Retinal detachment", value: "retinal_detachment" },
              { label: "Others", value: "other_eye_disease" }
            ],
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          {
            type: "input",
            name: "past_ocular_history_specify",
            label: "Specify",
            showIf: {
              ...(sectionShowIf("ocular_history") || {}),
              and: {
                field: "past_ocular_history",
                includes: "other_eye_disease"
              }
            }
          },
          {
            type: "subheading",
            label: "Family Ocular History",
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          {
            name: "family_ocular_history",
            type: "checkbox-group",
            options: [
              { label: "Cataract", value: "cataracts" },
              { label: "Eye turn", value: "eye_turn" },
              { label: "Glaucoma", value: "glaucoma" },
              { label: "Iritis/Uveitis", value: "iritis" },
              { label: "Lazy eye", value: "lazy_eye" },
              { label: "Macular degeneration", value: "macular_degeneration" },
              { label: "Retinal detachment", value: "retinal_detachment" },
              { label: "Retinitis pigmentosa", value: "retinitis_pigmentosa" },
              { label: "Colour vision defect", value: "colour_vision" },
              { label: "Others", value: "other_family_eye_disease" }
            ],
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          {
            type: "input",
            name: "family_ocular_history_specify",
            label: "Specify",
            showIf: {
              ...(sectionShowIf("ocular_history") || {}),
              and: {
                field: "family_ocular_history",
                includes: "other_family_eye_disease"
              }
            }
          },
          // In follow-up: form buttons show directly when "Questionnaires" checkbox is selected. In IA: button toggles the launcher.
          ...(!isFollowup
            ? [
                {
                  type: "button",
                  label: "Questionnaires",
                  name: "show_questionnaires",
                  toggleValue: true
                }
              ]
            : []),
          {
            type: "assessment-launcher",
            name: "subjective_questionnaires",
            showIf: isFollowup
              ? { field: "general_questions", includes: "questionnaires" }
              : { field: "show_questionnaires", equals: true },
            options: [
              { label: "Visual Function Questionnaire", value: "VISUAL_FUNCTION" },
              { label: "Low Vision Quality of Life Questionnaire (LVQoL)", value: "LVQOL" },
              { label: "Brain Injury Vision Symptoms Survey (BIVSS)", value: "BRAIN_VISION" },
              { label: "Binocular Vision Dysfunction Questionnaire (BVDQ)", value: "BVDQ" },
              { label: "Binocular Vision Questionnaire",value: "BV_QUESTIONNAIRE"},
            ]
          }
        ]
      }
    ]
  };

  const OBJECTIVE_SCHEMA = {
    actions: ACTIONS_WITH_NEXT,
    sections: [
      {
        fields: [
          {
            type: "input",
            name: "general_observation",
            label: "General Observation"
          },
          {
            name: "objective_sections",
            type: "checkbox-group",
            options: [
              { label: "Entrance Test", value: "entrance_test" }
            ]
          },
          {
            type: "subheading",
            label: "Visual Acuity",
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },

          {
            type: "checkbox-group",
            name: "visual_acuity_eyes",
            label: "Visual Acuity",
            inlineWithLabel: true,
            options: [
              { value: "RE", label: "Right Eye" },
              { value: "LE", label: "Left Eye" },
              { value: "BE", label: "Both Eye" }
            ],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },

          /* ================= RIGHT EYE ================= */
          {
            type: "refraction-12col",
            name: "visual_acuity_re",
            showIf: {
              field: "visual_acuity_eyes",
              includes: "RE",
              and: {
                field: "objective_sections",
                includes: "entrance_test"
              }
            },

            groups: [
              {
                label: "Right Eye (RE)",
                columns: [{ key: "D" }, { key: "N" }, { key: "P" }]
              }
            ],

            rows: [
              {
                label: "Habitual / Aided – Distance",
                value: "ha_dist",
                columns: [
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1m", "HM at 1m", "LP", "NPL"] },
                  { type: "select", options: ["+", "-"] },
                  { type: "select", options: [1, 2, 3, 4, 5] }
                ]
              },
              {
                label: "Habitual / Aided – Near",
                value: "ha_near",
                columns: [
                  {
                    type: "select",
                    options: [
                      "N5 at 40cm", "N6 at 40cm", "N8 at 40cm",
                      "N10 at 40cm", "N12 at 40cm", "N14 at 40cm",
                      "N24 at 40cm", "N36 at 40cm", "Poorer than N36"
                    ]
                  },
                  { type: "input" },
                  { type: "input" }
                ]
              },
              { label: "Habitual / Aided – Pinhole", value: "ha_pin", remark: true },
              { label: "Habitual / Aided – Remark", value: "ha_remark", remark: true },

              {
                label: "Unaided – Distance",
                value: "ua_dist",
                columns: [
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1m", "HM at 1m", "LP", "NPL"] },
                  { type: "select", options: ["+", "-"] },
                  { type: "select", options: [1, 2, 3, 4, 5] }
                ]
              },
              {
                label: "Unaided – Near",
                value: "ua_near",
                columns: [
                  {
                    type: "select",
                    options: [
                      "N5 at 40cm", "N6 at 40cm", "N8 at 40cm",
                      "N10 at 40cm", "N12 at 40cm", "N14 at 40cm",
                      "N24 at 40cm", "N36 at 40cm", "Poorer than N36"
                    ]
                  },
                  { type: "input" },
                  { type: "input" }
                ]
              },
              { label: "Unaided – Pinhole", value: "ua_pin", remark: true },
              { label: "Unaided – Remark", value: "ua_remark", remark: true }
            ]
          },

          /* ================= LEFT EYE ================= */
          {
            type: "refraction-12col",
            name: "visual_acuity_le",
            showIf: {
              field: "visual_acuity_eyes",
              includes: "LE",
              and: {
                field: "objective_sections",
                includes: "entrance_test"
              }
            },

            groups: [
              {
                label: "Left Eye (LE)",
                columns: [{ key: "D" }, { key: "N" }, { key: "P" }]
              }
            ],


            rows: [
              {
                label: "Habitual / Aided – Distance",
                value: "ha_dist",
                columns: [
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1m", "HM at 1m", "LP", "NPL"], },
                  { type: "select", options: ["+", "-"] },
                  { type: "select", options: [1, 2, 3, 4, 5] }
                ]
              },
              {
                label: "Habitual / Aided – Near",
                value: "ha_near",
                columns: [
                  {
                    type: "select",
                    options: [
                      "N5 at 40cm", "N6 at 40cm", "N8 at 40cm",
                      "N10 at 40cm", "N12 at 40cm", "N14 at 40cm",
                      "N24 at 40cm", "N36 at 40cm", "Poorer than N36"
                    ]
                  },
                  { type: "input" },
                  { type: "input" }
                ]
              },
              { label: "Habitual / Aided – Pinhole", value: "ha_pin", remark: true },
              { label: "Habitual / Aided – Remark", value: "ha_remark", remark: true },

              {
                label: "Unaided – Distance",
                value: "ua_dist",
                columns: [
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1m", "HM at 1m", "LP", "NPL"] },
                  { type: "select", options: ["+", "-"] },
                  { type: "select", options: [1, 2, 3, 4, 5] }
                ]
              },
              {
                label: "Unaided – Near",
                value: "ua_near",
                columns: [
                  {
                    type: "select",
                    options: [
                      "N5 at 40cm", "N6 at 40cm", "N8 at 40cm",
                      "N10 at 40cm", "N12 at 40cm", "N14 at 40cm",
                      "N24 at 40cm", "N36 at 40cm", "Poorer than N36"
                    ]
                  },
                  { type: "input" },
                  { type: "input" }
                ]
              },
              { label: "Unaided – Pinhole", value: "ua_pin", remark: true },
              { label: "Unaided – Remark", value: "ua_remark", remark: true }
            ]
          },

          /* ================= BOTH EYE ================= */
          {
            type: "refraction-12col",
            name: "visual_acuity_be",
            showIf: {
              field: "visual_acuity_eyes",
              includes: "BE",
              and: {
                field: "objective_sections",
                includes: "entrance_test"
              }
            },

            groups: [
              {
                label: "Both Eye (BE)",
                columns: [{ key: "D" }, { key: "N" }, { key: "P" }]
              }
            ],

            rows: [
              {
                label: "Habitual / Aided – Distance",
                value: "ha_dist",
                columns: [
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1m", "HM at 1m", "LP", "NPL"] },
                  { type: "select", options: ["+", "-"] },
                  { type: "select", options: [1, 2, 3, 4, 5] }
                ]
              },
              {
                label: "Habitual / Aided – Near",
                value: "ha_near",
                columns: [
                  {
                    type: "select",
                    options: [
                      "N5 at 40cm", "N6 at 40cm", "N8 at 40cm",
                      "N10 at 40cm", "N12 at 40cm", "N14 at 40cm",
                      "N24 at 40cm", "N36 at 40cm", "Poorer than N36"
                    ]
                  },
                  { type: "input" },
                  { type: "input" }
                ]
              },
              { label: "Habitual / Aided – Pinhole", value: "ha_pin", remark: true },
              { label: "Habitual / Aided – Remark", value: "ha_remark", remark: true },

              {
                label: "Unaided – Distance",
                value: "ua_dist",
                columns: [
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1m", "HM at 1m", "LP", "NPL"] },
                  { type: "select", options: ["+", "-"] },
                  { type: "select", options: [1, 2, 3, 4, 5] }
                ]
              },
              {
                label: "Unaided – Near",
                value: "ua_near",
                columns: [
                  {
                    type: "select",
                    options: [
                      "N5 at 40cm", "N6 at 40cm", "N8 at 40cm",
                      "N10 at 40cm", "N12 at 40cm", "N14 at 40cm",
                      "N24 at 40cm", "N36 at 40cm", "Poorer than N36"
                    ]
                  },
                  { type: "input" },
                  { type: "input" }
                ]
              },
              { label: "Unaided – Pinhole", value: "ua_pin", remark: true },
              { label: "Unaided – Remark", value: "ua_remark", remark: true }
            ]
          },
          {
            type: "subheading",
            label: "Binocular & Ocular Function",
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "grid-header",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Remarks"],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "grid-row",
            name: "bruckner",
            label: "Bruckner Test",
            cols: [
              { type: "single-select", options: ["Full", "Dull", "Defective"] },
              { type: "single-select", options: ["Full", "Dull", "Defective"] },
              "input"
            ],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "grid-row",
            name: "color_vision",
            label: "Color Vision Test",
            cols: [
              { type: "single-select", options: ["Passed", "Failed"] },
              { type: "single-select", options: ["Passed", "Failed"] },
              "input"
            ],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "grid-row",
            name: "pupil_response",
            label: "Pupil Response",
            cols: [
              { type: "single-select", options: ["PERRL", "Anisocoria R>L", "Anisocoria L>R"] },
              { type: "single-select", options: ["PERRL", "Anisocoria R>L", "Anisocoria L>R"] },
              "input"
            ],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "grid-row",
            name: "marcus_gunn",
            label: "Marcus Gunn Test",
            cols: [
              { type: "single-select", options: ["Normal", "Abnormal"] },
              { type: "single-select", options: ["Normal", "Abnormal"] },
              "input"
            ],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "grid-row",
            name: "cover_distance",
            label: "Cover Test – Distance",
            cols: ["input", "input", "input"],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "grid-row",
            name: "cover_near",
            label: "Cover Test – Near",
            cols: ["input", "input", "input"],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "grid-row",
            name: "stereopsis",
            label: "Stereopsis",
            cols: [
              { type: "single-select", options: ["Presented", "Not presented"] },
              { type: "single-select", options: ["Presented", "Not presented"] },
              "input"
            ],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "grid-row",
            name: "hirschberg",
            label: "Hirschberg Test",
            cols: [
              { type: "single-select", options: ["Centered", "Nasal", "Temporal", "Superior", "Inferior"] },
              { type: "single-select", options: ["Centered", "Nasal", "Temporal", "Superior", "Inferior"] },
              "input"
            ],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "grid-row",
            name: "eom",
            label: "EOM Test",
            cols: [
              { type: "single-select", options: ["Normal", "Impaired"] },
              { type: "single-select", options: ["Normal", "Impaired"] },
              "input"
            ],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "grid-row",
            name: "vor",
            label: "VOR Test",
            cols: [
              { type: "single-select", options: ["Normal", "Impaired"] },
              { type: "single-select", options: ["Normal", "Impaired"] },
              "input"
            ],
            showIf: {
              field: "objective_sections",
              includes: "entrance_test"
            }
          },
          {
            type: "row",
            fields: [
              {
                type: "radio",
                name: "confrontation_re",
                label: "Confrontational Test Right Eye",
                options: [
                  { label: "Full", value: "full" },
                  { label: "Restricted", value: "restricted" }
                ]
              },
              {
                type: "radio",
                name: "confrontation_le",
                label: "Confrontational Test Left Eye",
                options: [
                  { label: "Full", value: "full" },
                  { label: "Restricted", value: "restricted" }
                ]
              }
            ]
          },
          {
            type: "input",
            name: "confrontation_clinical_findings",
            label: "Clinical Findings"
          },
          {
            type: "row",
            fields: [
              { type: "input", name: "tonometry_re", label: "Tonometry Right Eye (RE) (mmHg @ time)" },
              { type: "input", name: "tonometry_le", label: "Tonometry Left Eye (LE) (mmHg @ time)" }
            ]
          },
          { type: "input", name: "additional_test", label: "Additional Test" },
          { type: "input", name: "analysis_remark", label: "Remark" },
                    {
            type: "assessment-launcher",
            name: "optometry_assessments",
            options: [
              { label: "Binocular Vision Profile", value: "BINOCULAR_VISION" },
              { label: "Refraction Analysis", value: "REFRACTION" },
              { label: "Vision For Driving", value: "VISION_DRIVING" },
              { label: "Ocular Health Profile", value: "OCULAR_HEALTH" },
              { label: "Special Diagnostic", value: "SPECIAL_DIAGNOSTIC" },
              { label: "Low Vision/Blind Profile", value: "LOW_VISION_ASSESSMENT"}
            ]
          },
        ]
      }
    ]
  };

  const ASSESSMENT_SCHEMA = {
    actions: ACTIONS_WITH_NEXT,
    sections: [
      {
        fields: [
          {
            type: "input",
            name: "clinical_impression",
            label: "Clinical Impression"
          },
          { 
            type: "subheading",
            label: "Problem Listing"
          },

          {
            name: "problem_listing",
            type: "checkbox-group",
            options: [
              { label: "Ammetropia", value: "ammetropia" },
              { label: "Emmetropia", value: "emmetropia" },
              { label: "Presbyopia", value: "presbyopia" },
              { label: "Others", value: "others" },
              ]
            },

            {
              name: "problem_listing_others",
              label: "Specify",
              type: "input",
              showIf: {
                field: "problem_listing",
                includes: "others"
              }
            },
          {
            type: "radio",
            name: "functional_vision_status",
            label: "Functional Vision Status",
            options: [
              { label: "Within normal limit(s)", value: "within_normal_limits" },
              { label: "Red-flag", value: "red_flag" },
              { label: "Normal", value: "normal" },
              { label: "Abnormal", value: "abnormal" },
            ]
          },
          {
            type: "textarea",
            name: "functional_vision_details",
            label: "Details",
            showIf: {
              field: "functional_vision_status",
              equals: "abnormal"
            }
          }
        ]
      }
    ]
  };

  const PLAN_SCHEMA = {
    actions: ACTIONS_PLAN_ONLY,
    sections: [
      {
        fields: [
        { type: "subheading", label: "Short Term Goals (2–4 Weeks)" },
        { type: "dynamic-goals", name: "short_term_goals" },
        
        { type: "subheading", label: "Long Term Goals (6–12 Weeks)" },
        { type: "dynamic-goals", name: "long_term_goals" },
          {
            type: "textarea",
            name: "intervention_plan",
            label: "Intervention Plan"
          },
          {
            type: "radio",
            name: "need_further_assessment",
            label: "Required Further Assessments",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            type: "multi-select-dropdown",
            name: "assessment_list",
            label: "Further Assessments",
            showIf: {
              field: "need_further_assessment",
              equals: "yes"
            },
            options: [
              "Refraction",
              "Ocular Health Assessment",
              "Ocular Coherence Tomography",
              "Hess Chart",
              "Visual Evoked Potential / Electroretinogram",
              "Right Eye Vision System",
              "Corneal Topography",
              "Ocular Efficiency Test",
              "DEM Test",
              "Visual Field Assessment",
              "Microperimeter",
              "Neuroptix Pupillometer",
              "Color Vision Test",
              "Binocular Vision Assessment",
              "Low Vision Assessment",
              "Others"
            ].map(v => ({ label: v, value: v }))
          },
          {
            type: "input",
            name: "assessment_list_other",
            label: "Specify Other Assessment",
            showIf: {
              field: "assessment_list",
              includes: "Others"
            }
          },
          {
            type: "date",
            name: "next_follow_up",
            label: "Next Follow-Up",
            format: "DD/MM/YYYY"
          },
          {
            type: "radio",
            name: "required_referral",
            label: "Required Referral",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            type: "textarea",
            name: "referral_text",
            label: "Referral",
            showIf: {
              field: "required_referral",
              equals: "yes"
            }
          }
        ]
      }
    ]
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  useEffect(() => {
    if (!isDirty || readOnly) return;
    const fn = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", fn);
    return () => window.removeEventListener("beforeunload", fn);
  }, [isDirty, readOnly]);

  const onChange = useCallback((name, value) => {
    if (readOnly) return;
    setIsDirty(true);
    setValues(v => {
      const next = {
        ...v,
        [activeTab]: {
          ...v[activeTab],
          [name]: value
        }
      };

      // Debounced auto-save to API (1.5 s after last keystroke)
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
      autoSaveTimer.current = setTimeout(() => {
        const formDataId = formDataIds[activeTab];
        if (formDataId && assessmentId) {
          api.patch(API_URL.ASSESSMENT + `data/${formDataId}/`, { data: next[activeTab] })
            .catch(() => {/* silent — user can still hit Save manually */});
        }
        // Always persist draft locally too
        if (storageKey) {
          localStorage.setItem(storageKey, JSON.stringify({ values: next, updatedAt: new Date() }));
        }
      }, 1500);

      return next;
    });
  }, [readOnly, activeTab, formDataIds, assessmentId, storageKey]);

  // ── Start assessment session ──────────────────────────────────────────────
  const handleStart = useCallback(async () => {
    if (!patient) return;

    // Get the logged-in doctor's id from localStorage
    let doctorId = null;
    try {
      const me = JSON.parse(localStorage.getItem("user") || "{}");
      doctorId = me.id || null;
    } catch {}

    if (!doctorId) {
      setToast({ message: 'Could not identify logged-in doctor. Please re-login.', variant: 'error' });
      return;
    }

    setStarting(true);
    try {
      const res = await api.post(
        API_URL.ASSESSMENT + 'optometry/start',
        {
          doctor:       doctorId,
          patient:      patient.id,
          visit_type:   mode === 'followup' ? 'FOLLOW_UP' : 'INITIAL',
          is_completed: false,
          total_score:  0,
        }
      );
      const data = res.data;
      setAssessmentId(data.id);

      // Map FormData ids — only INITIAL form_type gives one record per SOAP tab
      const idMap = {};
      const qMap  = {};   // QUESTIONAIRE sub-assessments keyed by registry key
      (data.assessment_ids || []).forEach(fd => {
        const ft = (fd.form_type || '').toUpperCase();
        if (ft === 'INITIAL') {
          const key = (fd.type || '').toLowerCase();
          if (key) idMap[key] = fd.id;
        } else if (ft === 'QUESTIONNAIRE' || ft === 'QUESTIONAIRE') {
          // Match by name to registry key
          const regKey = Object.keys(REGISTRY_KEY_TO_NAME).find(
            k => REGISTRY_KEY_TO_NAME[k] === fd.name
          );
          if (regKey) qMap[regKey] = fd.id;
        }
      });
      setFormDataIds(idMap);
      setQuestionaireIds(qMap);
      setToast({ message: 'Assessment session started', variant: 'success' });
    } catch (err) {
      const detail = err?.response?.data;
      const msg = typeof detail === 'object'
        ? Object.values(detail).flat().join(' ')
        : 'Failed to start assessment. Please try again.';
      setToast({ message: msg, variant: 'error' });
    } finally {
      setStarting(false);
    }
  }, [patient, mode]);

  const handleAction = useCallback((type) => {
    if (type === "back") { onBack?.(); return; }
    if (readOnly) return;
    if (type === "next") {
      const idx = TAB_ORDER.indexOf(activeTab);
      if (idx < TAB_ORDER.length - 1) setActiveTab(TAB_ORDER[idx + 1]);
      return;
    }
    if (type === "clear") { 
      setValues({ subjective: {}, objective: {}, assessment: {}, plan: {} }); 
      setSubmitted(false); 
      localStorage.removeItem(storageKey); 
    }
    if (type === "save") {
      // Persist draft locally
      localStorage.setItem(storageKey, JSON.stringify({ values, updatedAt: new Date() }));

      // Push to API immediately on explicit Save click
      if (assessmentId) {
        const formDataId = formDataIds[activeTab];
        if (formDataId) {
          api.patch(API_URL.ASSESSMENT + `data/${formDataId}/`, { data: values[activeTab] })
            .then(() => setToast({ message: 'Saved successfully', variant: 'success' }))
            .catch(() => setToast({ message: 'Save failed. Draft kept locally.', variant: 'error' }));
        } else {
          setToast({ message: 'Draft saved locally', variant: 'success' });
        }
      } else {
        setToast({ message: 'Draft saved locally (start a session to sync)', variant: 'success' });
      }
    }
  }, [readOnly, activeTab, storageKey, values, onBack, assessmentId, formDataIds]);

  const handleConfirmedSubmit = useCallback(async () => {
    setShowConfirm(false);
    if (readOnly) return;

    // End the session if one is active
    if (assessmentId) {
      try {
        await api.patch(API_URL.ASSESSMENT + `session/${assessmentId}/end/`);
        setToast({ message: "Assessment submitted and session ended", variant: "success" });
      } catch {
        setToast({ message: "Submission failed. Please try again.", variant: "error" });
        return;
      }
    } else {
      setToast({ message: "Assessment submitted (no active session)", variant: "success" });
    }

    setSubmitted(true);
    setIsDirty(false);
    // Merge all tab values for submission
    const allValues = Object.values(values).reduce((acc, tab) => ({ ...acc, ...tab }), {});
    onSubmit?.(allValues);
  }, [readOnly, values, onSubmit, assessmentId]);

  // const schemaMap = useMemo(() => {
  //   const map = {};
  //   forms.forEach(form => {
  //     const key = form.assessment_type?.toLowerCase();
  //     if (key && TAB_ORDER.includes(key)) {
  //       map[key] = { ...form.body, actions: ACTIONS_WITH_NEXT };
  //     }
  //   });
  //   return map;
  // }, [forms]);

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

  // const retryForms = useCallback(() => {
  //   setFormsError(false);
  //   setFormsLoading(true);
  //   api.get(API_URL.FORM + "department/optometry/")
  //     .then(res => setForms(res.data.results))
  //     .catch(() => setFormsError(true))
  //     .finally(() => setFormsLoading(false));
  // }, []);

  const activeTabIdx = TAB_ORDER.indexOf(activeTab);

  /* ===================== RENDER ===================== */
  return (
    <PatientContext.Provider value={{ patient, questionaireIds }}>
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
          <OptometryPatientInfo
            patient={patient}
            onReferral={() => setShowReferral(true)}
            isFollowup={isFollowup}
            onStart={handleStart}
            starting={starting}
            assessmentId={assessmentId}
            onCopyLink={() => setToast({ message: "Shareable link copied to clipboard", variant: "success" })}
          />
        </div>

        {/* SOAP tab shell */}
        <div style={S.soapShell}>
          {/* Tab bar — full width equal columns */}
          <div style={S.tabBar}>
            {TAB_ORDER.map((tab, idx) => {
              const isActive  = activeTab === tab;
              const isDone    = idx < activeTabIdx;
              const hasData   = !!formDataIds[tab];   // linked to a FormData record
              return (
                <button
                  key={tab}
                  style={{ ...S.tab, ...(isActive ? S.tabActive : isDone ? S.tabDone : {}) }}
                  onClick={() => setActiveTab(tab)}
                >
                  {TAB_META[tab].label}
                  {hasData && (
                    <span style={{
                      marginLeft: 6, width: 7, height: 7, borderRadius: "50%",
                      background: isActive ? "#2563eb" : "#10b981",
                      display: "inline-block", flexShrink: 0,
                    }} title="FormData linked" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab content — full width */}
          <div style={S.tabContent}>
            {tabLoading ? (
              <div style={S.contentPad}><ShimmerForm rows={6} /></div>
            ) : formsLoading ? (
              <div style={S.contentPad}><ShimmerForm rows={6} /></div>
            ) : formsError ? (
              <div style={S.contentPad}>
                <EmptyState
                  icon="⚠️"
                  title="Failed to load form"
                  message="Could not fetch the assessment form. Please check your connection and try again."
                  // action={{ label: "Retry", onClick: retryForms }}
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
                values={values[activeTab] || {}}
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
    background: "#0284c7",
    border: "1.5px solid rgba(255,255,255,0.6)",
    color: "#fff",
    borderRadius: 6,
    padding: "6px 14px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background .15s",
  },
  startBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    borderRadius: 6,
    padding: "6px 16px",
    fontSize: 12,
    fontWeight: 700,
    transition: "background .15s, opacity .15s",
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
