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
  BVDQ: BVDQAdapter
};

/* ===================== COMPONENT ===================== */

export default function OptometryAssessment({ patient, onSubmit, onBack, savedValues = null, readOnly = false, mode = "initial" }) {
  const [values, setValues] = useState(readOnly && savedValues ? savedValues : {});
  const [submitted, setSubmitted] = useState(readOnly);
  const [activeTab, setActiveTab] = useState("subjective");

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

  const handleSubmit = () => {
    if (readOnly) return;
    setSubmitted(true);
    onSubmit?.(values);
    alert("Optometry assessment submitted");
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
  const ACTIONS_PLAN_ONLY = [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ];

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
                  { label: "Patient Vision & Care History", value: "patient_vision_care" },
                  { label: "External Eye Symptoms", value: "external_eye_symptoms" },
                  { label: "Ocular History & Eye Conditions", value: "ocular_history" },
                  { label: "Binocular Vision", value: "binocular_vision" },
                  { label: "Questionnaires", value: "questionnaires" }
                ]
              }
            ]
            : []),
          // Patient Vision & Care History (always visible in IA; in follow-up only when selected)
          {
            type: "subheading",
            label: "Patient Vision & Care History",
            ...(sectionShowIf("patient_vision_care") && { showIf: sectionShowIf("patient_vision_care") })
          },
          {
            type: "date",
            name: "last_eye_exam",
            label: "Date of last eye examination",
            ...(sectionShowIf("patient_vision_care") && { showIf: sectionShowIf("patient_vision_care") })
          },
          {
            type: "radio",
            name: "spectacles_use",
            label: "Spectacles use",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ],
            ...(sectionShowIf("patient_vision_care") && { showIf: sectionShowIf("patient_vision_care") })
          },
          {
            type: "input",
            name: "spectacle_prescription",
            label: "Prescription",
            showIf: sectionShowIfAnd("patient_vision_care", { field: "spectacles_use", equals: "yes" }) || { field: "spectacles_use", equals: "yes" }
          },
          {
            type: "radio",
            name: "contact_lens_use",
            label: "Contact lens use",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ],
            ...(sectionShowIf("patient_vision_care") && { showIf: sectionShowIf("patient_vision_care") })
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
            showIf: sectionShowIfAnd("patient_vision_care", { field: "contact_lens_use", equals: "yes" }) || { field: "contact_lens_use", equals: "yes" }
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
            showIf: sectionShowIfAnd("patient_vision_care", { field: "contact_lens_use", equals: "yes" }) || { field: "contact_lens_use", equals: "yes" }
          },
          {
            type: "input",
            name: "others_specify",
            label: "Specify",
            ...(sectionShowIf("patient_vision_care") && { showIf: sectionShowIf("patient_vision_care") })
          },
          {
            name: "pmh_from_registration",
            label: "Medical History",
            type: "input",
            readOnly: true,
            ...(sectionShowIf("patient_vision_care") && { showIf: sectionShowIf("patient_vision_care") })
          },
          {
            name: "family_history_from_registration",
            label: "Family History",
            type: "input",
            readOnly: true,
            ...(sectionShowIf("patient_vision_care") && { showIf: sectionShowIf("patient_vision_care") })
          },
          {
            name: "allergies_from_registration",
            label: "Allergies",
            type: "input",
            readOnly: true,
            ...(sectionShowIf("patient_vision_care") && { showIf: sectionShowIf("patient_vision_care") })
          },
          // Binocular Vision Section (follow-up: content till Ocular Signs)
          {
            type: "subheading",
            label: "Binocular Vision",
            ...(sectionShowIf("binocular_vision") && { showIf: sectionShowIf("binocular_vision") })
          },
          {
            type: "radio",
            name: "bv_onset",
            label: "Onset",
            options: [
              { label: "Sudden", value: "sudden" },
              { label: "Gradual", value: "gradual" }
            ],
            ...(sectionShowIf("binocular_vision") && { showIf: sectionShowIf("binocular_vision") })
          },
          {
            type: "radio",
            name: "bv_frequency",
            label: "Frequency",
            options: [
              { label: "Constant", value: "constant" },
              { label: "Intermittent", value: "intermittent" },
              { label: "Alternating", value: "alternating" }
            ],
            ...(sectionShowIf("binocular_vision") && { showIf: sectionShowIf("binocular_vision") })
          },
          {
            type: "radio",
            name: "bv_was_he_been",
            label: "Neurological disease",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ],
            ...(sectionShowIf("binocular_vision") && { showIf: sectionShowIf("binocular_vision") })
          },
          {
            type: "input",
            name: "bv_was_he_been_specify",
            label: "Neurologica – specify",
            showIf: { field: "bv_was_he_been", equals: "yes" }
          },
          {
            type: "row",
            fields: [
              { type: "input", name: "bv_type_of_birth", label: "Type of Birth" },
              { type: "input", name: "bv_birth_term", label: "Birth Term" }
            ],
            ...(sectionShowIf("binocular_vision") && { showIf: sectionShowIf("binocular_vision") })
          },
          {
            type: "input",
            name: "bv_previous_treatment",
            label: "Previous Treatment",
            ...(sectionShowIf("binocular_vision") && { showIf: sectionShowIf("binocular_vision") })
          },
          {
            type: "input",
            name: "bv_subjective_Remarks",
            label: "Remarks",
            ...(sectionShowIf("binocular_vision") && { showIf: sectionShowIf("binocular_vision") })
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
            ],
            ...(sectionShowIf("binocular_vision") && { showIf: sectionShowIf("binocular_vision") })
          },
          {
            type: "input",
            name: "bv_ocular_signs_other",
            label: "Other – Specify",
            showIf: { field: "bv_ocular_signs", includes: "Other" }
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
              { label: "Infection", value: "infection" }
            ],
            ...(sectionShowIf("external_eye_symptoms") && { showIf: sectionShowIf("external_eye_symptoms") })
          },
          {
            type: "radio",
            name: "ext_grittiness_location",
            label: "Grittiness - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "external_eye_symptoms_checkboxes",
              includes: "grittiness"
            }
          },
          {
            type: "radio",
            name: "ext_burning_location",
            label: "Burning - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "external_eye_symptoms_checkboxes",
              includes: "burning"
            }
          },
          {
            type: "radio",
            name: "ext_itchiness_location",
            label: "Itchiness - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "external_eye_symptoms_checkboxes",
              includes: "itchiness"
            }
          },
          {
            type: "radio",
            name: "ext_dryness_location",
            label: "Dryness - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "external_eye_symptoms_checkboxes",
              includes: "dryness"
            }
          },
          {
            type: "radio",
            name: "ext_tearing_location",
            label: "Tearing - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "external_eye_symptoms_checkboxes",
              includes: "tearing"
            }
          },
          {
            type: "radio",
            name: "ext_infection_location",
            label: "Infection - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "external_eye_symptoms_checkboxes",
              includes: "infection"
            }
          },
          {
            type: "input",
            name: "external_eye_symptoms_specify",
            label: "Specify",
            ...(sectionShowIf("external_eye_symptoms") && { showIf: sectionShowIf("external_eye_symptoms") })
          },
          // Refraction Section (below External Eye Symptoms; in follow-up shown when External Eye Symptoms is selected)
          {
            type: "subheading",
            label: "Refraction / Vision-Specific Questions (Symptoms)",
            ...(sectionShowIf("external_eye_symptoms") && { showIf: sectionShowIf("external_eye_symptoms") })
          },
          {
            name: "visual_ocular_symptoms",
            type: "checkbox-group",
            options: [
              { label: "Vision screening issues", value: "vision_screening" },
              { label: "Blurry vision", value: "blurry_vision" },
              { label: "Double vision (Diplopia)", value: "double_vision" },
              { label: "Night vision difficulty", value: "night_vision" },
              { label: "Flash of light", value: "flash_light" },
              { label: "Floaters/spots in vision", value: "floaters" },
              { label: "Eye pain", value: "eye_pain" },
              { label: "Headaches", value: "headaches" },
              { label: "Squinting", value: "squinting" },
              { label: "Emmetropia (Normal Vision)", value: "emmetropia" }
            ],
            ...(sectionShowIf("external_eye_symptoms") && { showIf: sectionShowIf("external_eye_symptoms") })
          },
          {
            type: "radio",
            name: "vision_screening_location",
            label: "Vision screening issues - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "visual_ocular_symptoms",
              includes: "vision_screening"
            }
          },
          {
            type: "radio",
            name: "blurry_vision_location",
            label: "Blurry vision - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "visual_ocular_symptoms",
              includes: "blurry_vision"
            }
          },
          {
            type: "radio",
            name: "double_vision_location",
            label: "Double vision (Diplopia) - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "visual_ocular_symptoms",
              includes: "double_vision"
            }
          },
          {
            type: "radio",
            name: "night_vision_location",
            label: "Night vision difficulty - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "visual_ocular_symptoms",
              includes: "night_vision"
            }
          },
          {
            type: "radio",
            name: "flash_light_location",
            label: "Flash of light - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "visual_ocular_symptoms",
              includes: "flash_light"
            }
          },
          {
            type: "radio",
            name: "floaters_location",
            label: "Floaters/spots in vision - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "visual_ocular_symptoms",
              includes: "floaters"
            }
          },
          {
            type: "radio",
            name: "eye_pain_location",
            label: "Eye pain - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "visual_ocular_symptoms",
              includes: "eye_pain"
            }
          },
          {
            type: "radio",
            name: "headaches_location",
            label: "Headaches - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "visual_ocular_symptoms",
              includes: "headaches"
            }
          },
          {
            type: "radio",
            name: "squinting_location",
            label: "Squinting - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "visual_ocular_symptoms",
              includes: "squinting"
            }
          },
          {
            type: "radio",
            name: "emmetropia_location",
            label: "Emmetropia (Normal Vision) - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "visual_ocular_symptoms",
              includes: "emmetropia"
            }
          },
          {
            type: "input",
            name: "refraction_questions_specify",
            label: "Specify",
            ...(sectionShowIf("external_eye_symptoms") && { showIf: sectionShowIf("external_eye_symptoms") })
          },
          // OCULAR HISTORY & EYE CONDITIONS Section
          {
            type: "subheading",
            label: "Ocular History & Eye Conditions",
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          {
            type: "subheading",
            label: "A. Ocular Symptoms",
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
              { label: "Eye pain", value: "eye_pain" }
            ],
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          {
            type: "radio",
            name: "grittiness_location",
            label: "Grittiness - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "ocular_symptoms",
              includes: "grittiness"
            }
          },
          {
            type: "radio",
            name: "burning_location",
            label: "Burning - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "ocular_symptoms",
              includes: "burning"
            }
          },
          {
            type: "radio",
            name: "itchiness_location",
            label: "Itchiness - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "ocular_symptoms",
              includes: "itchiness"
            }
          },
          {
            type: "radio",
            name: "dryness_location",
            label: "Dryness - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "ocular_symptoms",
              includes: "dryness"
            }
          },
          {
            type: "radio",
            name: "tearing_location",
            label: "Tearing - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "ocular_symptoms",
              includes: "tearing"
            }
          },
          {
            type: "radio",
            name: "infection_location",
            label: "Infection - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "ocular_symptoms",
              includes: "infection"
            }
          },
          {
            type: "radio",
            name: "eye_pain_location",
            label: "Eye pain - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "ocular_symptoms",
              includes: "eye_pain"
            }
          },
          {
            type: "input",
            name: "ocular_symptoms_specify",
            label: "Specify",
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          {
            type: "subheading",
            label: "B. Past Ocular History",
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
              { label: "Other eye disease", value: "other_eye_disease" }
            ],
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          {
            type: "radio",
            name: "cataract_location",
            label: "Cataract - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "cataract"
            }
          },
          {
            type: "radio",
            name: "corneal_abrasion_location",
            label: "Corneal abrasion - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "corneal_abrasion"
            }
          },
          {
            type: "radio",
            name: "dry_eye_location",
            label: "Dry eye - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "dry_eye"
            }
          },
          {
            type: "radio",
            name: "eye_turn_location",
            label: "Eye turn - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "eye_turn"
            }
          },
          {
            type: "radio",
            name: "glaucoma_location",
            label: "Glaucoma - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "glaucoma"
            }
          },
          {
            type: "radio",
            name: "injury_location",
            label: "Injury - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "injury"
            }
          },
          {
            type: "radio",
            name: "iritis_location",
            label: "Iritis/Uveitis - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "iritis"
            }
          },
          {
            type: "radio",
            name: "lazy_eye_location",
            label: "Lazy eye - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "lazy_eye"
            }
          },
          {
            type: "radio",
            name: "macular_degeneration_location",
            label: "Macular degeneration - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "macular_degeneration"
            }
          },
          {
            type: "radio",
            name: "retinal_defect_location",
            label: "Retinal defect/hole/tear - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "retinal_defect"
            }
          },
          {
            type: "radio",
            name: "retinal_detachment_location",
            label: "Retinal detachment - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "retinal_detachment"
            }
          },
          {
            type: "input",
            name: "other_eye_disease_specify",
            label: "Other eye disease (specify)",
            showIf: {
              field: "past_ocular_history",
              includes: "other_eye_disease"
            }
          },
          {
            type: "radio",
            name: "other_eye_disease_location",
            label: "Other eye disease - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "past_ocular_history",
              includes: "other_eye_disease"
            }
          },
          {
            type: "input",
            name: "past_ocular_history_specify",
            label: "Specify",
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          {
            type: "subheading",
            label: "C. Family Ocular History",
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
              { label: "Other eye disease", value: "other_family_eye_disease" }
            ],
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
          },
          {
            type: "radio",
            name: "family_cataracts_location",
            label: "Cataract - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "family_ocular_history",
              includes: "cataracts"
            }
          },
          {
            type: "radio",
            name: "family_eye_turn_location",
            label: "Eye turn - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "family_ocular_history",
              includes: "eye_turn"
            }
          },
          {
            type: "radio",
            name: "family_glaucoma_location",
            label: "Glaucoma - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "family_ocular_history",
              includes: "glaucoma"
            }
          },
          {
            type: "radio",
            name: "family_iritis_location",
            label: "Iritis/Uveitis - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "family_ocular_history",
              includes: "iritis"
            }
          },
          {
            type: "radio",
            name: "family_lazy_eye_location",
            label: "Lazy eye - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "family_ocular_history",
              includes: "lazy_eye"
            }
          },
          {
            type: "radio",
            name: "family_macular_degeneration_location",
            label: "Macular degeneration - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "family_ocular_history",
              includes: "macular_degeneration"
            }
          },
          {
            type: "radio",
            name: "family_retinal_detachment_location",
            label: "Retinal detachment - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "family_ocular_history",
              includes: "retinal_detachment"
            }
          },
          {
            type: "radio",
            name: "family_retinitis_pigmentosa_location",
            label: "Retinitis pigmentosa - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "family_ocular_history",
              includes: "retinitis_pigmentosa"
            }
          },
          {
            type: "radio",
            name: "family_colour_vision_location",
            label: "Colour vision defect - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "family_ocular_history",
              includes: "colour_vision"
            }
          },
          {
            type: "input",
            name: "other_family_eye_disease_specify",
            label: "Other eye disease (specify)",
            showIf: {
              field: "family_ocular_history",
              includes: "other_family_eye_disease"
            }
          },
          {
            type: "radio",
            name: "other_family_eye_disease_location",
            label: "Other eye disease - Location",
            options: [
              { label: "Right (R)", value: "right" },
              { label: "Left (L)", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ],
            showIf: {
              field: "family_ocular_history",
              includes: "other_family_eye_disease"
            }
          },
          {
            type: "input",
            name: "family_ocular_history_specify",
            label: "Specify",
            ...(sectionShowIf("ocular_history") && { showIf: sectionShowIf("ocular_history") })
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
              { label: "Binocular Vision Dysfunction Questionnaire (BVDQ)", value: "BVDQ" }
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
            type: "assessment-launcher",
            name: "optometry_assessments",
            options: [
              { label: "Binocular Vision", value: "BINOCULAR_VISION" },
              { label: "Refraction Assessment", value: "REFRACTION" },
              { label: "Vision For Driving", value: "VISION_DRIVING" },
              { label: "Ocular Health / Structure", value: "OCULAR_HEALTH" },
              { label: "Special Diagnostic", value: "SPECIAL_DIAGNOSTIC" }
            ]
          },
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
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1mm", "HM at 1mm", "LP", "NPL"] },
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
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1mm", "HM at 1mm", "LP", "NPL"] },
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
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1mm", "HM at 1mm", "LP", "NPL"], },
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
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1mm", "HM at 1mm", "LP", "NPL"] },
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
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1mm", "HM at 1mm", "LP", "NPL"] },
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
                  { type: "select", options: ["6/3", "6/4.5", "6/6", "6/7.5", "6/9", "6/12", "6/15", "6/18", "6/24", "6/30", "6/45", "6/60", "6/120", "CF at 1mm", "HM at 1mm", "LP", "NPL"] },
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
              { type: "single-select", options: ["PERL", "Anisocoria R>L", "Anisocoria L>R"] },
              { type: "single-select", options: ["PERL", "Anisocoria R>L", "Anisocoria L>R"] },
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
          { type: "input", name: "analysis_remark", label: "Remark" }
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
            type: "radio",
            name: "functional_vision_status",
            label: "Functional Vision Status",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Abnormal", value: "abnormal" }
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
          {
            type: "input",
            name: "short_term_goals",
            label: "Short Term Goals"
          },
          {
            type: "date",
            name: "short_term_goals_date",
            label: "Target Date (Short Term)",
            format: "DD/MM/YYYY"
          },
          {
            type: "input",
            name: "long_term_goals",
            label: "Long Term Goals"
          },
          {
            type: "date",
            name: "long_term_goals_date",
            label: "Target Date (Long Term)",
            format: "DD/MM/YYYY"
          },
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
              "Ocular Coherent Tomography",
              "Hess Chart",
              "Visual Evoked Potential / Electroretinogram",
              "Right Eye Vision System",
              "Corneal Topography",
              "Ocular Efficiency Test",
              "DEM Test",
              "Visual Field Assessment",
              "Microperimeter",
              "Neuroptix Pupillometer",
              "Color Vision Test"
            ].map(v => ({ label: v, value: v }))
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

  const OPTOMETRY_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: []
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const today = new Date();

  function OptometryPatientInfo({ patient }) {
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
