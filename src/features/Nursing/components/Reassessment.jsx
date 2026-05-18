
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
import RespiratoryAssessment from "../FocusedAssessment/RespiratoryAssessment";
import CardiacAssessment from "../FocusedAssessment/CardiacAssessment";
import GIOrGUAssessment from "../FocusedAssessment/GIOrGUAssessment";
import SkinAssessment from "../FocusedAssessment/SkinAssessment";
import EyeAssessment from "../FocusedAssessment/EyeAssessment";
import HeadNeckAssessment from "../FocusedAssessment/HeadNeckAssessment";
import RenalAssessment from "../FocusedAssessment/RenalAssessment";
import MusculoskeletalAssessment from "../FocusedAssessment/MusculoskeletalAssessment";
import { localDateTimeString } from "../../../shared/utils/dateFormatter";
import MedicationAdministrationChart from "./MedicationAdministrationChart";
import BladderDiaryChart from "./BladderDiaryChart";
import AgitatedBehaviourScale from "./AgitatedBehaviourScale";
import GlucoseMonitorChart from "./GlucoseMonitorChart";
import NursingRehabChecklist from "./NursingRehabChecklist";
import SeizureChart from "./SeizureChart";
import NursingSwallowScreener from "./NursingSwallowScreener";
import WaterSwallowTest from "./WaterSwallowTest";
import RepositioningSkinChart from "./RepositioningSkinChart";
import PatientCard from "../../../shared/cards/PatientCard";
import SpasmSpasticity from "../../Doctors/components/SpasmSpasticity";
import BladderAssessment from "../../Doctors/components/BladderAssessment";
import BowelAssessmentForm from "../../Doctors/components/BowelAssessment";
import PainAssessmentForm from "../../Doctors/components/PainAssessmentForm";
import BristolChartAssessment  from "../../Doctors/components/BowelAssessment";
import WoundAssessment from "../pages/WoundAssessment";

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
    const activeKey = "nursing_reassessments_active";
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
    const activeKey = "nursing_reassessments_active";
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
    const activeKey = "nursing_reassessments_active";
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
    const activeKey = "nursing_reassessments_active";
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
    const activeKey = "nursing_reassessments_active";
    onChange(activeKey, null);
  };
  return <BradenScaleForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function WoundAssessmentAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);

  const handleSubmit = (payload) => {
    if (payload?.values) {
      Object.keys(payload.values).forEach((key) => {
        onChange(`wound_assessment_${key}`, payload.values[key]);
      });
    }
  };

  const handleBack = () => {
    onChange("nursing_reassessments_active", null);
  };

  return (
    <WoundAssessment
      patient={patient}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
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
    const activeKey = "nursing_reassessments_active";
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
    const activeKey = "nursing_reassessments_active";
    onChange(activeKey, null);
  };
  
  return (
    <NumericPainRatingScaleForm 
      patient={patient} 
      onSubmit={handleSubmit} 
      onBack={handleBack}
      onChange={onChange}
    />
  );
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
    const activeKey = "nursing_reassessments_active";
    onChange(activeKey, null);
  };
  return <DiabeticFootAssessmentForm patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function RespiratoryAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("respiratory_assessment_launcher_active", null);
  return (
    <div>
      <RespiratoryAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function CardiacAssessmentAdapter({ values, onChange }) {
  const handleBack = () => {
    onChange("cardiac_assessment_launcher_active", null);
    onChange("cardiac_assessment_launcher_heart_vascular_active", null);
  };
  return (
    <div>
      <CardiacAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function GIOrGUAssessmentAdapter({ values, onChange }) {
  const handleBack = () => {
    onChange("gi_gu_assessment_launcher_active", null);
    onChange("gi_gu_assessment_launcher_gu_active", null);
  };
  return (
    <div>
      <GIOrGUAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function SkinAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("skin_assessment_launcher_active", null);
  return (
    <div>
      <SkinAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function EyeAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("eye_assessment_launcher_active", null);
  return (
    <div>
      <EyeAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function HeadNeckAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("head_neck_assessment_launcher_active", null);
  return (
    <div>
      <HeadNeckAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function RenalAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("renal_assessment_launcher_active", null);
  return (
    <div>
      <RenalAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function MusculoskeletalAssessmentAdapter({ values, onChange }) {
  const handleBack = () => onChange("musculoskeletal_assessment_launcher_active", null);
  return (
    <div>
      <MusculoskeletalAssessment layout="nested" />
      <button type="button" onClick={handleBack} style={{ marginTop: 16, padding: "8px 16px" }}>Back</button>
    </div>
  );
}

function MedicationChartAdapter({ onChange }) {
  const patient = useContext(PatientContext);
  return <MedicationAdministrationChart patient={patient} />;
}

function BladderDiaryAdapter({ onChange }) {
  const patient = useContext(PatientContext);
  return <BladderDiaryChart patient={patient} />;
}

function AgitatedBehaviourAdapter({ onChange }) {
  const patient = useContext(PatientContext);
  return <AgitatedBehaviourScale patient={patient} />;
}

function GlucoseMonitorAdapter({ onChange }) {
  const patient = useContext(PatientContext);
  return <GlucoseMonitorChart patient={patient} />;
}

function RehabChecklistAdapter({ onChange }) {
  const patient = useContext(PatientContext);
  const handleBack = () => onChange("nursing_reassessments_active", null);
  return <NursingRehabChecklist patient={patient} onBack={handleBack} />;
}

function SeizureChartAdapter({ onChange }) {
  const patient = useContext(PatientContext);
  return <SeizureChart patient={patient} />;
}

function shouldShowRespiratoryLauncher(data = {}) {
  const hasAbnormalBreathingPattern = ["labored", "shallow"].includes(data.resp_breathing_pattern);
  const hasAsymmetricalChestExpansion = data.resp_chest_expansion === "asymmetrical";
  const breathSounds = Array.isArray(data.resp_breath_sounds) ? data.resp_breath_sounds : [];
  const hasAbnormalBreathSound = ["wheeze", "crackles", "diminished"].some((sound) => breathSounds.includes(sound));
  const hasRespiratoryDistress = ["retractions", "nasal_flaring", "cyanosis"].includes(data.resp_distress_signs);
  const spo2 = Number.parseFloat(data.obj_spo2 ?? data.resp_o2_saturation);
  const respiratoryRate = Number.parseFloat(data.obj_resp_rate);
  const hasLowSpo2 = Number.isFinite(spo2) && spo2 < 94;
  const hasHighRespiratoryRate = Number.isFinite(respiratoryRate) && respiratoryRate > 30;

  return hasAbnormalBreathingPattern
    || hasAsymmetricalChestExpansion
    || hasAbnormalBreathSound
    || hasRespiratoryDistress
    || hasLowSpo2
    || hasHighRespiratoryRate;
}

function shouldShowGiGuLauncher(data = {}) {
  const isInspectionDistended = data.gi_inspection === "distended";
  const hasAbnormalPalpation = ["tender", "guarding", "masses"].includes(data.gi_palpation);
  const hasNauseaVomiting = data.gi_nausea_vomiting === "yes";
  const isIncontinent = data.gi_continence === "incontinent";

  return isInspectionDistended
    || hasAbnormalPalpation
    || hasNauseaVomiting
    || isIncontinent;
}
function SwallowScreenerAdapter({ onChange }) {
  const patient = useContext(PatientContext);
  const handleBack = () => onChange("nursing_reassessments_active", null);
  return <NursingSwallowScreener patient={patient} onBack={handleBack} />;
}

function WaterSwallowTestAdapter({ onChange }) {
  const patient = useContext(PatientContext);
  const handleBack = () => onChange("nursing_reassessments_active", null);
  return <WaterSwallowTest patient={patient} onBack={handleBack} />;
}

function RepositioningSkinChartAdapter({ onChange }) {
  const patient = useContext(PatientContext);
  const handleBack = () => onChange("nursing_reassessments_active", null);
  return <RepositioningSkinChart patient={patient} onBack={handleBack} />;
}

// Assessment Registry
export const NURSING_REASSESSMENT_REGISTRY = {
  barthel: BarthelIndexAdapter,
  adl: ADLAdapter,
  patient_history: PatientHistoryAdapter,
  morse_fall_scale: MorseFallScaleAdapter,
  braden_scale: BradenScaleAdapter,
  wound_treatment_flowsheet: WoundTreatmentFlowsheetAdapter,
  numeric_pain_rating_scale: NumericPainRatingScaleAdapter,
  diabetic_foot_assessment: DiabeticFootAssessmentAdapter,
  respiratory_assessment: RespiratoryAssessmentAdapter,
  cardiac_assessment: CardiacAssessmentAdapter,
  gi_gu_assessment: GIOrGUAssessmentAdapter,
  skin_assessment: SkinAssessmentAdapter,
  eye_assessment: EyeAssessmentAdapter,
  head_neck_assessment: HeadNeckAssessmentAdapter,
  renal_assessment: RenalAssessmentAdapter,
  musculoskeletal_assessment: MusculoskeletalAssessmentAdapter,
  medication_chart: MedicationChartAdapter,
  bladder_diary: BladderDiaryAdapter,
  agitated_behaviour_scale: AgitatedBehaviourAdapter,
  glucose_monitor: GlucoseMonitorAdapter,
  rehab_checklist: RehabChecklistAdapter,
  seizure_chart: SeizureChartAdapter,
  swallow_screener: SwallowScreenerAdapter,
  water_swallow_test: WaterSwallowTestAdapter,
  repositioning_skin_chart: RepositioningSkinChartAdapter,
  spasticity_assessment: SpasmSpasticity,
  spasm_assessment: SpasmSpasticity,
  pain_assessment: PainAssessmentForm,
  bristol_chart: BristolChartAssessment,
  wound_assessment: WoundAssessmentAdapter,
  bladder_issue: (props) => (
  <BladderAssessment {...props} department="nursing" />
  ),
  bowel_assessment: (props) => (
    <BowelAssessmentForm {...props} department="nursing" />
  ),
};

/* ===================== COMPONENT ===================== */

export default function NursingReAssessment({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");
    const [patientHistory, setPatientHistory] = useState({
    past_medical_history: "",
    past_family_history: "",
    alerts_and_allergies: ""
  });

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `nursing_reassessment_draft_${patient.id}`
    : null;
   useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setValues(JSON.parse(saved).values || {});
  }, [storageKey]);


 useEffect(() => {
        if (!patient) return;
        setPatientHistory({
          past_medical_history: patient.medical_history || "",
          past_family_history: patient.family_medical_history || "",
          alerts_and_allergies: patient.alerts_and_allergies_history || ""
        });
      }, [patient]);

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const loaded = JSON.parse(saved).values || {};
      const h = parseFloat(loaded.obj_height);
      const w = parseFloat(loaded.obj_weight);
      if (h > 0 && w > 0) loaded.obj_bmi = (w / Math.pow(h / 100, 2)).toFixed(1);
      const hasSubjectiveCardiacConcern = loaded.chest_pain === "yes"
        || loaded.dyspnea === "yes"
        || loaded.palpitations === "yes";
      loaded.show_cardiac_launcher = !!hasSubjectiveCardiacConcern;
      loaded.show_gi_gu_launcher = shouldShowGiGuLauncher(loaded);
      const renalUo = parseFloat(loaded.gu_urine_output);
      loaded.show_renal_launcher = Number.isFinite(renalUo) && renalUo < 0.5;
      const mskAbnormal = loaded.msk_rom === "limited" || loaded.msk_strength === "decreased"
        || ["unsteady", "assistive_device"].includes(loaded.msk_gait)
        || loaded.msk_joint_swelling_deformity === "present"
        || loaded.msk_pain_with_movement === "yes"
        || ["weak", "edematous"].includes(loaded.msk_lower_extremity);
      loaded.show_msk_launcher = !!mskAbnormal;
      loaded.show_respiratory_launcher = shouldShowRespiratoryLauncher(loaded);
      setValues(loaded);
    }
  }, [storageKey]);

  const onChange = (name, value) => {
    setValues(v => {
      const next = { ...v, [name]: value };
      if (name === "obj_height" || name === "obj_weight") {
        const h = parseFloat(name === "obj_height" ? value : v.obj_height);
        const w = parseFloat(name === "obj_weight" ? value : v.obj_weight);
        if (h > 0 && w > 0) next.obj_bmi = (w / Math.pow(h / 100, 2)).toFixed(1);
      }
      if (name === "numeric_pain_scale_current_pain") {
        const painValue = parseFloat(value);
        next.show_motor_pain_assessment = Number.isFinite(painValue) && painValue > 1;
    }
      // Show Cardiac Assessment launcher when subjective cardio-respiratory symptoms are present
      const cardiacSubjectiveNames = ["chest_pain", "dyspnea", "palpitations"];
      if (cardiacSubjectiveNames.includes(name)) {
        const hasSubjectiveCardiacConcern = next.chest_pain === "yes"
          || next.dyspnea === "yes"
          || next.palpitations === "yes";
        next.show_cardiac_launcher = !!hasSubjectiveCardiacConcern;
      }
      // Show GI/GU Assessment launcher when any selected GI/GU abnormal criterion is present
      const giGuNames = ["gi_inspection", "gi_palpation", "gi_nausea_vomiting", "gi_continence"];
      if (giGuNames.includes(name)) {
        next.show_gi_gu_launcher = shouldShowGiGuLauncher(next);
      }
      // Show Renal Assessment launcher when urine output < 0.5 mL/hr (Genitourinary)
      if (name === "gu_urine_output") {
        const renalUo = parseFloat(next.gu_urine_output);
        next.show_renal_launcher = Number.isFinite(renalUo) && renalUo < 0.5;
      }
      // Show Musculoskeletal Assessment launcher when any MSK finding is abnormal
      const mskNames = ["msk_rom", "msk_strength", "msk_gait", "msk_joint_swelling_deformity", "msk_pain_with_movement", "msk_lower_extremity"];
      if (mskNames.includes(name)) {
        const mskAbnormal = next.msk_rom === "limited" || next.msk_strength === "decreased"
          || ["unsteady", "assistive_device"].includes(next.msk_gait)
          || next.msk_joint_swelling_deformity === "present"
          || next.msk_pain_with_movement === "yes"
          || ["weak", "edematous"].includes(next.msk_lower_extremity);
        next.show_msk_launcher = !!mskAbnormal;
      }
      // Show Respiratory Assessment launcher when respiratory findings are abnormal
      const respNames = ["resp_breathing_pattern", "resp_chest_expansion", "resp_breath_sounds", "resp_distress_signs", "obj_spo2", "obj_resp_rate", "resp_o2_saturation"];
      if (respNames.includes(name)) {
        next.show_respiratory_launcher = shouldShowRespiratoryLauncher(next);
      }
      return next;
    });
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
      alert("Nursing reassessment draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Nursing reassessment submitted");
  };
// function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
//   if (!patient) return null;

//   const safe = (v) => v ?? "-";
//   const formatDate = (d) => d ? new Date(d).toLocaleDateString() : "-";

//   return (
//     <div style={{ marginBottom: 24 }}>
//       <div style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//         gap: 12,
//         fontSize: 14
//       }}>
//         <div><b>Name:</b> {safe(patient.name)}</div>
//         <div><b>IC:</b> {safe(patient.id)}</div>
//         <div><b>DOB:</b> {formatDate(patient.dob)}</div>

//         <div><b>Age / Gender:</b> {safe(patient.age)} / {safe(patient.sex)}</div>
//         <div><b>ICD:</b> {safe(patient.icd)}</div>
//         <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>

//         <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
//         <div><b>Duration of Diagnosis:</b> -</div>
//         <div><b>Primary Diagnosis:</b> {safe(patient.diagnosis_history)}</div>

//         <div><b>Secondary Diagnosis:</b> {safe(patient.medical_history)}</div>
//         <div><b>Dominant Side:</b> {safe(patient.dominant_side)}</div>
//         <div><b>Language Preference:</b> {safe(patient.language_preference)}</div>

//         <div><b>Education Level:</b> {safe(patient.education_background)}</div>
//         <div><b>Occupation:</b> {safe(patient.occupation)}</div>
//         <div><b>Work Status:</b> {safe(patient.employment_status)}</div>

//         <div><b>Driving Status:</b> {safe(patient.driving_status)}</div>
//         <div><b>PP/OB:</b> {safe(patient.pp_ob)}</div>
//         <div><b>Weight:</b> {patient.weight ? `${patient.weight} kg` : "-"}</div>
//         <div><b>Accommodation:</b> {safe(patient.accommodation)}</div>
//         <div><b>Attending Case Manager:</b> {safe(patient.attending_case_manager)}</div>
//         <div><b>Doctor Incharge for Initial Assessment:</b> {safe(patient.doctor_incharge_initial_assessment)}</div>
//         <div><b>Attending Therapist:</b> {safe(patient.attending_therapist)}</div>
//         {/* ===== HISTORY ===== */}
//         <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
        
//            <h3>Patient History</h3>
        
//                   <div>
//                     <b>Past Medical History</b>
//                     <textarea
//                       style={textarea}
//                       value={patientHistory.past_medical_history}
//                       onChange={(e) =>
//                         setPatientHistory(prev => ({
//                           ...prev,
//                           past_medical_history: e.target.value
//                         }))
//                       }
//                     />
//                   </div>

          
//           <div>
//                     <b>Family History</b>
//                     <textarea
//                       style={textarea}
//                       value={patientHistory.past_family_history}
//                       onChange={(e) =>
//                         setPatientHistory(prev => ({
//                           ...prev,
//                           past_family_history: e.target.value
//                         }))
//                       }
//                     />
//                   </div>

        
//            <div>
//                     <b>Allergies</b>
//                     <textarea
//                       style={textarea}
//                       value={patientHistory.alerts_and_allergies}
//                       onChange={(e) =>
//                         setPatientHistory(prev => ({
//                           ...prev,
//                           alerts_and_allergies: e.target.value
//                         }))
//                       }
//                     />
//                   </div>

//           <button style={alertBtn}> 🚨 Alerts</button>
//         </div>
//       </div>
//     </div>
//   );
// }

  /* ===================== SCHEMAS ===================== */

  const YES_NO_OPTIONS = [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }];

  const SUBJECTIVE_SCHEMA = {
    actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
    sections: [
    //   {
    //     fields: [
    //       { name: "chief_complaint", label: "Chief Complaint", type: "input" },
    //       { name: "history_present_illness", label: "History of Present Illness", type: "input" },
    //       { name: "past_medical_surgical", label: "Past Medical/Surgical", type: "textarea" },
    //       { name: "past_family_medical_history ", label: "Past Family Medical History ", type: "textarea" }
    //     ]
    //   },
            {
        title: "Allergies & Alerts",
        fields: [
          { name: "drug_allergies", label: "Drug allergies", type: "radio", options: YES_NO_OPTIONS },
          { name: "drug_allergies_specify", label: "Specify", type: "input", showIf: { field: "drug_allergies", equals: "yes" } },
          { name: "food_allergies", label: "Food allergies", type: "radio", options: YES_NO_OPTIONS },
          { name: "food_allergies_specify", label: "Specify", type: "input", showIf: { field: "food_allergies", equals: "yes" } },
          { name: "latex_allergy", label: "Other allergy", type: "radio", options: YES_NO_OPTIONS },
          { name: "latex_allergy_specify", label: "Specify", type: "input", showIf: { field: "latex_allergy", equals: "yes" } },
          { name: "environmental_allergies", label: "Environmental allergies", type: "radio", options: YES_NO_OPTIONS },
          { name: "environmental_allergies_specify", label: "Specify", type: "input", showIf: { field: "environmental_allergies", equals: "yes" } },
          { name: "reaction_type", label: "Reaction type", type: "checkbox-group", options: [
            { label: "Rash", value: "rash" },
            { label: "Anaphylaxis", value: "anaphylaxis" },
            { label: "GI upset", value: "gi_upset" },
            { label: "Respiratory", value: "respiratory" },
            { label: "Other", value: "other" }
          ]},
          { name: "reaction_type_other", label: "Specify", type: "input", showIf: { field: "reaction_type", includes: "other" } }
        ]
      },
      {
        title: "Pain Assessment",
        fields: [
          { name: "pain_present", label: "Pain present", type: "radio", options: YES_NO_OPTIONS },
          { type: "subheading", label: "Full pain panel (OPQRST)", showIf: { field: "pain_present", equals: "yes" } },
          { type: "row", fields: [
            { name: "pain_onset", label: "O â€” Onset", type: "date" },
            {
              type: "subheading",
              label: "P â€” Provocation/Palliation",
              showIf: {
                field: "pain_present",
                equals: "yes"
              }
            },

            {
              name: "pain_provocation",
              label: "Provocation",
              type: "input",
              showIf: {
                field: "pain_present",
                equals: "yes"
              }
            },

            {
              name: "pain_palliation",
              label: "Palliation",
              type: "input",
              showIf: {
                field: "pain_present",
                equals: "yes"
              }
            }
          ], showIf: { field: "pain_present", equals: "yes" } },
          { name: "pain_provocation_relieved_by", label: "Specify relieved by", type: "input", showIf: { field: "pain_provocation", equals: "relieved_by" } },
          { type: "row", fields: [
            { name: "pain_quality", label: "Q â€” Quality", type: "input" },
            { name: "pain_region", label: "R â€” Region/Radiation", type: "input" }
          ], showIf: { field: "pain_present", equals: "yes" } },
          { type: "row", fields: [
            { name: "pain_severity_at_rest", label: "S â€” Severity At rest (0â€“10)", type: "single-select", options: [0,1,2,3,4,5,6,7,8,9,10].map(n => ({ label: String(n), value: String(n) })) },
            { name: "pain_severity_with_movement", label: "S â€” Severity With movement (0â€“10)", type: "single-select", options: [0,1,2,3,4,5,6,7,8,9,10].map(n => ({ label: String(n), value: String(n) })) }
          ], showIf: { field: "pain_present", equals: "yes" }},
          { name: "pain_assessment_form", label: "", type: "assessment-launcher", options: [{ label: "Numeric Rating Scale", value: "numeric_pain_rating_scale" }], showIf: { field: "pain_present", equals: "yes" } },
          { name: "pain_timing", label: "T â€” Timing", type: "input", showIf: { field: "pain_present", equals: "yes" } },
         {
            name: "pain_type",
            label: "Pain Type",
            type: "checkbox-group",
            options: [
              { label: "Burning", value: "burning" },
              { label: "Tingling", value: "tingling" },
              { label: "Numbness", value: "numbness" },
              { label: "Sharp", value: "sharp" },
              { label: "Cramping", value: "cramping" },
              { label: "Others", value: "others" }
            ],
            showIf: {
              field: "pain_present",
              equals: "yes"
            }
          },

          {
            type: "input",
            name: "pain_type_other",
            label: "Specify",
            showIf: {
              field: "pain_type",
              includes: "others"
            }
          },
          
          { name: "pain_at_rest_night", label: "Pain at Rest/ Night Pain", type: "radio", options: YES_NO_OPTIONS, showIf: { field: "pain_present", equals: "yes" } },
          { name: "pain_free_text", label: "Specify", type: "textarea", showIf: { field: "pain_present", equals: "yes" } }
        ]
      },
                // ---------------- EMOTIONAL STATUS ----------------
      {
        title: "Emotional Status",
        fields: [
          {
            name: "mood_status",
            label: "Mood Status",
            type: "radio",
            options: [
              { label: "Euthymic", value: "euthymic" },
              { label: "Depressed", value: "depressed" },
              { label: "Anxious", value: "anxious" },
              { label: "Irritable", value: "irritable" },
              { label: "Other", value: "other" }
            ]
          },

          {
            name: "mood_status_other",
            label: "Specify",
            type: "input",
            showIf: {
              field: "mood_status",
              equals: "other"
            }
          },

          {
            name: "emotional_status",
            label: "Emotional Status",
            type: "radio",
            options: [
              { label: "Good", value: "good" },
              { label: "Mild emotional distress", value: "mild_distress" },
              { label: "Moderate emotional distress", value: "moderate_distress" },
              { label: "Severe emotional distress", value: "severe_distress" }
            ]
          },

          // ---------------- CONDITIONAL QUESTIONS ----------------

          {
            type: "subheading",
            label: "Mental Health Screening",
            showIf: {
              or: [
                {
                  field: "mood_status",
                  oneOf: ["depressed", "anxious", "irritable", "other"]
                },
                {
                  field: "emotional_status",
                  oneOf: ["mild_distress", "moderate_distress", "severe_distress"]
                }
              ]
            }
          },

          {
            name: "anxiety_stress_depression",
            label: "Anxiety/stress/depression symptoms",
            type: "radio",
            options: YES_NO_OPTIONS,
            showIf: {
              or: [
                {
                  field: "mood_status",
                  oneOf: ["depressed", "anxious", "irritable", "other"]
                },
                {
                  field: "emotional_status",
                  oneOf: ["mild_distress", "moderate_distress", "severe_distress"]
                }
              ]
            }
          },

          {
            name: "restlessness_pacing",
            label: "Restlessness/pacing",
            type: "radio",
            options: YES_NO_OPTIONS,
            showIf: {
              or: [
                {
                  field: "mood_status",
                  oneOf: ["depressed", "anxious", "irritable", "other"]
                },
                {
                  field: "emotional_status",
                  oneOf: ["mild_distress", "moderate_distress", "severe_distress"]
                }
              ]
            }
          },

          {
            name: "aggression",
            label: "Aggression (verbal/physical)",
            type: "radio",
            options: YES_NO_OPTIONS,
            showIf: {
              or: [
                {
                  field: "mood_status",
                  oneOf: ["depressed", "anxious", "irritable", "other"]
                },
                {
                  field: "emotional_status",
                  oneOf: ["mild_distress", "moderate_distress", "severe_distress"]
                }
              ]
            }
          },

          {
            name: "hallucinations_delusions",
            label: "Hallucinations/delusions reported",
            type: "radio",
            options: YES_NO_OPTIONS,
            showIf: {
              or: [
                {
                  field: "mood_status",
                  oneOf: ["depressed", "anxious", "irritable", "other"]
                },
                {
                  field: "emotional_status",
                  oneOf: ["mild_distress", "moderate_distress", "severe_distress"]
                }
              ]
            }
          },

          {
            name: "suicidal_ideation",
            label: "Suicidal ideation/self-harm thoughts",
            type: "radio",
            options: YES_NO_OPTIONS,
            showIf: {
              or: [
                {
                  field: "mood_status",
                  oneOf: ["depressed", "anxious", "irritable", "other"]
                },
                {
                  field: "emotional_status",
                  oneOf: ["mild_distress", "moderate_distress", "severe_distress"]
                }
              ]
            }
          },

          {
            name: "psychiatric_diagnosis_history",
            label: "Current psychiatric diagnosis/history",
            type: "radio",
            options: YES_NO_OPTIONS,
            showIf: {
              or: [
                {
                  field: "mood_status",
                  oneOf: ["depressed", "anxious", "irritable", "other"]
                },
                {
                  field: "emotional_status",
                  oneOf: ["mild_distress", "moderate_distress", "severe_distress"]
                }
              ]
            }
          },

          {
            name: "psychiatric_diagnosis_specify",
            label: "Specify",
            type: "textarea",
            showIf: {
              field: "psychiatric_diagnosis_history",
              equals: "yes"
            }
          },
        ]
      },
      {
        title: "Nutrition & Hydration",
        fields: [
          { name: "appetite_level", label: "Appetite level", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Poor", value: "poor" }, { label: "Increased", value: "increased" }] },
          { name: "dietary_intake_adequate", label: "Food intake adequate", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "swallowing_difficulty", label: "Swallowing difficulty", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "daily_fluid_intake_adequate", label: "Daily fluid intake adequate", type: "radio-matrix", options: YES_NO_OPTIONS },
          { name: "significant_weight_change", label: "Significant weight change in past year", type: "radio-matrix", options: YES_NO_OPTIONS },
          // { name: "weight_change_specify", label: "Specify", type: "textarea", showIf: { field: "significant_weight_change", equals: "yes" } },
          { name: "nutrition_hydration_specify", label: "Specify", type: "textarea" }
        ]
      },
            {
        title: "Cardiorespiratory & Autonomic Symptoms",
        fields: [
          {
            name: "activity_tolerance",
            label: "Activity Tolerance",
            type: "radio",
            options: [
              { label: "Full", value: "full" },
              { label: "Mild limitation", value: "mild_limitation" },
              { label: "Moderate limitation", value: "moderate_limitation" },
              { label: "Severe", value: "severe" },
              { label: "Unable", value: "unable" }
            ]
          },

          {
            name: "adl_performance",
            label: "ADL Performance",
            type: "radio",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Pacing required", value: "pacing_required" },
              { label: "Rest breaks", value: "rest_breaks" },
              { label: "Assistance needed", value: "assistance_needed" },
              { label: "Dependent", value: "dependent" }
            ]
          },
          { name: "chest_pain", label: "Chest pain", type: "radio", options: YES_NO_OPTIONS },
          { name: "dyspnea", label: "Dyspnea at rest/exertion", type: "radio", options: YES_NO_OPTIONS },
          { name: "palpitations", label: "Palpitations", type: "radio", options: YES_NO_OPTIONS },
          {
            name: "cardiac_assessment_launcher_subjective",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Cardiac Assessment", value: "cardiac_assessment" }],
            showIf: { field: "show_cardiac_launcher", equals: true }
          },
          { name: "dizziness_syncope", label: "Dizziness/syncope", type: "radio", options: YES_NO_OPTIONS },
          { name: "orthostatic_symptoms", label: "Orthostatic symptoms", type: "radio", options: YES_NO_OPTIONS },
          { name: "exercise_intolerance", label: "Exercise intolerance/fatigue", type: "radio", options: YES_NO_OPTIONS },
          { name: "cardiorespiratory_specify", label: "Specify", type: "textarea" }
        ]
      },
            {
        title: "Bowel and Bladder",
        fields: [

          {
            name: "bowel_pattern",
            label: "Bowel pattern",
            type: "radio",
            options: [
              { label: "Continence", value: "continence" },
              { label: "Incontinence", value: "incontinence" }
            ]
          },

          {
            type: "assessment-launcher",
            name: "bowel_assessment_inline",
            autoOpen: true,
            hideRemarks: true,
            showIf: {
              field: "bowel_pattern",
              equals: "incontinence"
            },
            options: [
              {
                label: "Bowel Assessment",
                value: "bowel_assessment"
              }
            ]
          },

          {
            name: "bladder_pattern",
            label: "Bladder pattern",
            type: "radio",
            options: [
              { label: "Continence", value: "continence" },
              { label: "Incontinence", value: "incontinence" }
            ]
          },

          {
            type: "assessment-launcher",
            name: "bladder_assessment_inline",
            autoOpen: true,
            hideRemarks: true,
            showIf: {
              field: "bladder_pattern",
              equals: "incontinence"
            },
            options: [
              {
                label: "Bladder Issue",
                value: "bladder_issue"
              }
            ]
          }
        ]
      },
      {
        title: "Functional Status",
        fields: [
              {
                name: "difficulty_mobility_transfers",
                label: "Difficulty with mobility/transfers",
                type: "radio",
                options: YES_NO_OPTIONS
              },

              {
                type: "row",
                fields: [
                  {
                    name: "mobility_short_distance",
                    label: "Short Distance",
                    type: "input"
                  },
                  {
                    name: "mobility_long_distance",
                    label: "Long Distance",
                    type: "input"
                  }
                ],
                showIf: {
                  field: "difficulty_mobility_transfers",
                  equals: "yes"
                }
              },     
               {
              name: "history_of_falls",
              label: "History of falls/near-falls",
              type: "radio",
              options: YES_NO_OPTIONS
            },

            {
              type: "subheading",
              label: "History of Fall (Within 3 Months)",
              showIf: {
                field: "history_of_falls",
                equals: "yes"
              }
            },

            {
              type: "row",
              cols: 3,
              fields: [
                {
                  name: "last_fall",
                  label: "Last Fall",
                  type: "input"
                },
                {
                  name: "mechanism_of_fall",
                  label: "Mechanism of Fall",
                  type: "input"
                },
                {
                  name: "fall_impact",
                  label: "Fall Impact",
                  type: "input"
                }
              ],
              showIf: {
                field: "history_of_falls",
                equals: "yes"
              }
            },   
            {
              name: "adl_limitations",
              label: "ADL limitations",
              type: "radio",
              options: YES_NO_OPTIONS
            },

            {
              name: "time_same_position",
              label: "Time in same position",
              type: "radio",
              options: [
                { label: "< 2 hours", value: "lt_2_hours" },
                { label: "â‰¥ 2 hours", value: "gte_2_hours" }
              ],
              showIf: {
                field: "adl_limitations",
                equals: "yes"
              }
            },

            {
              name: "pressure_areas",
              label: "Pressure areas (sacrum, coccyx, heels, elbows)",
              type: "radio",
              options: [
                { label: "Intact", value: "intact" },
                { label: "Reddened", value: "reddened" },
                { label: "Breakdown", value: "breakdown" }
              ],
              showIf: {
                field: "adl_limitations",
                equals: "yes"
              }
            },

            {
              name: "pressure_areas_stage",
              label: "Stage",
              type: "input",
              showIf: {
                field: "pressure_areas",
                equals: "breakdown"
              }
            },

            {
              name: "skin_moisture",
              label: "Skin moisture",
              type: "radio",
              options: [
                { label: "Dry", value: "dry" },
                { label: "Occasionally moist", value: "occasionally_moist" },
                { label: "Frequently moist", value: "frequently_moist" },
                { label: "Constantly moist", value: "constantly_moist" }
              ],
              showIf: {
                field: "adl_limitations",
                equals: "yes"
              }
            },
            {
              name: "functional_status_other",
              label: "Others",
              type: "radio",
              options: YES_NO_OPTIONS
            },

            {
              name: "sleep_pattern",
              label: "Sleep pattern",
              type: "radio",
              options: [
                { label: "Normal", value: "normal" },
                { label: "Disturbed", value: "disturbed" }
              ],
              showIf: {
                field: "functional_status_other",
                equals: "yes"
              }
            },

            {
              name: "appetite_functional",
              label: "Appetite",
              type: "radio",
              options: [
                { label: "Normal", value: "normal" },
                { label: "Decreased", value: "decreased" },
                { label: "Increased", value: "increased" }
              ],
              showIf: {
                field: "functional_status_other",
                equals: "yes"
              }
            },

            {
              name: "fatigue_reduced_endurance",
              label: "Fatigue/reduced endurance",
              type: "radio",
              options: YES_NO_OPTIONS,
              showIf: {
                field: "functional_status_other",
                equals: "yes"
              }
            },
          { name: "functional_status_specify", label: "Specify", type: "textarea" }
        ]
      },
            {
        title: "Safety & Comfort Concerns",
        fields: [
          { name: "morse_fall_scale_launcher", label: "", type: "assessment-launcher", options: [{ label: "Morse Fall Scale", value: "morse_fall_scale" }], showIf: { field: "history_of_falls", equals: "yes" } },
          {
            name: "dizziness_balance_issues",
            label: "Dizziness/balance issues",
            type: "radio",
            options: YES_NO_OPTIONS
          },

          {
            name: "dizziness_type",
            label: "",
            type: "radio",
            options: [
              { label: "Continuous", value: "continuous" },
              { label: "Upon change of postures", value: "change_of_postures" },
              { label: "Others", value: "others" }
            ],
            showIf: {
              field: "dizziness_balance_issues",
              equals: "yes"
            }
          },

          {
            name: "dizziness_type_other",
            label: "Others",
            type: "input",
            showIf: {
              field: "dizziness_balance_issues",
              equals: "yes",
              and: {
                field: "dizziness_type",
                equals: "others"
              }
            }
          },
          // { type: "subheading", label: "Orthostatic vitals", showIf: { field: "dizziness_balance_issues", equals: "yes" } },
          // { type: "row", fields: [
          //   { name: "ortho_supine_bp", label: "Supine: BP", type: "input" },
          //   { name: "ortho_supine_hr", label: "Supine: HR", type: "input" }
          // ], showIf: { field: "dizziness_balance_issues", equals: "yes" } },
          // { type: "row", fields: [
          //   { name: "ortho_sitting_bp", label: "Sitting: BP", type: "input" },
          //   { name: "ortho_sitting_hr", label: "Sitting: HR", type: "input" }
          // ], showIf: { field: "dizziness_balance_issues", equals: "yes" } },
          // { type: "row", fields: [
          //   { name: "ortho_stand1_bp", label: "Standing (1 min): BP", type: "input" },
          //   { name: "ortho_stand1_hr", label: "Standing (1 min): HR", type: "input" }
          // ], showIf: { field: "dizziness_balance_issues", equals: "yes" } },
          // { type: "row", fields: [
          //   { name: "ortho_stand3_bp", label: "Standing (3 min): BP", type: "input" },
          //   { name: "ortho_stand3_hr", label: "Standing (3 min): HR", type: "input" }
          // ], showIf: { field: "dizziness_balance_issues", equals: "yes" } },
          { name: "pain_with_movement", label: "Pain with movement/positioning", type: "radio", options: YES_NO_OPTIONS },
          { name: "fear_hesitation_mobility", label: "Fear/hesitation with mobility", type: "radio", options: YES_NO_OPTIONS },
          { name: "safety_comfort_specify", label: "Specify", type: "textarea" }
        ]
      },
      {
        title: "Infection Risk & Exposure Screening",
        fields: [
          { name: "fever_infection_14days", label: "Fever/infection in past 14 days", type: "radio", options: YES_NO_OPTIONS },
          { name: "fever_infection_specify", label: "Specify", type: "input", showIf: { field: "fever_infection_14days", equals: "yes" } },
          { name: "tb_exposure_history", label: "TB exposure/history", type: "radio", options: YES_NO_OPTIONS },
          { name: "tb_exposure_specify", label: "Specify", type: "input", showIf: { field: "tb_exposure_history", equals: "yes" } },
          { name: "mrsa_vre_mdro_history", label: "MRSA/VRE/MDRO history", type: "radio", options: YES_NO_OPTIONS },
          { name: "mrsa_vre_mdro_specify", label: "Specify", type: "input", showIf: { field: "mrsa_vre_mdro_history", equals: "yes" } },
          { name: "recent_international_travel", label: "Recent international travel", type: "radio", options: YES_NO_OPTIONS },
          { name: "recent_travel_specify", label: "Specify", type: "input", showIf: { field: "recent_international_travel", equals: "yes" } }
        ]
      },
            {
        title: "Psychosocial",
        fields: [
          // ---------------- PSYCHOSOCIAL ----------------
          {
            name: "family_social_support",
            label: "Family/social support available",
            type: "radio",
            options: YES_NO_OPTIONS
          },
        ]
      },
      {
        title: "Medication Reconciliation",
        fields: [
          { name: "recent_medication_changes", label: "Recent medication changes", type: "radio", options: YES_NO_OPTIONS },
          { name: "recent_medication_changes_specify", label: "Specify", type: "input", showIf: { field: "recent_medication_changes", equals: "yes" } },
        ]
      },
      {
        title: "Discharge Readiness",
        fields: [
          { name: "caregiver_available_discharge", label: "Caregiver available at discharge", type: "radio", options: YES_NO_OPTIONS },
          { name: "home_environment_safe", label: "Home environment safe", type: "radio", options: YES_NO_OPTIONS },
          { name: "barriers_to_discharge", label: "Barriers to discharge", type: "checkbox-group", options: [
            { label: "Financial", value: "financial" },
            { label: "Mobility", value: "mobility" },
            { label: "Housing", value: "housing" },
            { label: "Transport", value: "transport" },
            { label: "None", value: "none" }
          ]}
        ]
      },
      {
        title: "Endocrine / Metabolic",
        fields: [
          {
            name: "hypoglycemia_symptoms",
            label: "Hypoglycemia symptoms",
            type: "radio",
            options: YES_NO_OPTIONS
          },

          {
            name: "hyperglycemia_symptoms",
            label: "Hyperglycemia symptoms",
            type: "radio",
            options: YES_NO_OPTIONS
          },

          {
            name: "steroid_therapy",
            label: "Steroid therapy",
            type: "radio",
            options: YES_NO_OPTIONS
          }
        ]
      },
      {
        title: "Spasticity / Spasm",
        fields: [
          {
            type: "assessment-launcher",
            name: "spasticity_inline",
            autoOpen: true,
            hideRemarks: true,
            options: [
              {
                label: "Spasticity Assessment",
                value: "spasticity_assessment"
              }
            ]
          },
        ]
      },
    ]
  };

  const OBJECTIVE_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: [
          { type: "subheading", label: "Vital Signs" },
          { type: "row", fields: [
            { name: "obj_body_temp", label: "Body Temperature (Â°C)", type: "input", placeholder: "Â°C" },
            { name: "obj_heart_rate", label: "Heart Rate (/min)", type: "input", placeholder: "/min" },
            { name: "obj_resp_rate", label: "Respiratory Rate (/min)", type: "input", placeholder: "/min" }
          ]},
          { type: "row", fields: [
            { name: "obj_bp", label: "Blood Pressure (mmHg)", type: "input", placeholder: "e.g. 120/80" },
            { name: "obj_spo2", label: "Oxygen Saturation (SpOâ‚‚) (%)", type: "input", placeholder: "%" }
          ]},
          {
            name: "objective_pain_assessment_form",
            label: "",
            type: "assessment-launcher",
            options: [
              {
                label: "Numeric Rating Scale",
                value: "numeric_pain_rating_scale"
              }
            ]
          },
          {
              name: "wound_location_pins", label: "Mark Wound Location on Body Diagram",
              type: "wound-location-marker",
              views: [
                { key: "body",  label: "Body (Front/Back)", src: "/body_high.png" },
                { key: "feet",  label: "Feet",             src: "/feet_high.png" },
                { key: "handsfeet", label: "Hands",              src: "/palm.png" }
              ],
            showIf: { 
              field: "show_motor_pain_assessment", 
              equals: true
            },
          },
          {
          name: "wound_location_notes",
          label: "Wound Location Notes",
          type: "textarea",
          placeholder: "Enter wound location details...",
          showIf: {
            field: "show_motor_pain_assessment",
            equals: true
          }
        },
          // {
          //   name: "motor_pain_assessment",
          //   label: "",
          //   type: "assessment-launcher",
          //   autoOpen: true,
          //   options: [{ label: "Pain Assessment", value: "pain_assessment" }],
          //   showIf: { 
          //     field: "show_motor_pain_assessment", 
          //     equals: true
          //   },
          // },
          {
            type: "subheading",
            label: "Glucose Monitoring"
          },

          {
            name: "glucose_monitoring",
            label: "",
            type: "input",
            placeholder: "To include CGM report if present"
          },
          {
            name: "cardiac_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Cardiac Assessment", value: "cardiac_assessment" }],
            showIf: { field: "show_cardiac_launcher", equals: true }
          },
          { type: "subheading", label: "Anthropometry" },
          { type: "row", fields: [
            { name: "obj_height", label: "Height (cm)", type: "input" },
            { name: "obj_weight", label: "Weight (kg)", type: "input", placeholder: "kg" }
          ]},
          { name: "obj_bmi", label: "BMI (kg/mÂ²)", type: "score-box" },
          { type: "subheading", label: "Devices / Lines / Tubes" },
          { name: "iv_access", label: "IV access", type: "radio", options: [
            { label: "None", value: "none" },
            { label: "Peripheral", value: "peripheral" },
            { label: "Central", value: "central" }
          ]},
          { name: "iv_access_site", label: "Site", type: "input", showIf: { field: "iv_access", oneOf: ["peripheral", "central"] } },
          { name: "oxygen_device", label: "Oxygen device", type: "radio", options: [
            { label: "Room air", value: "room_air" },
            { label: "NC", value: "nc" },
            { label: "Mask", value: "mask" },
            { label: "Vent", value: "vent" }
          ]},
          { name: "urinary_catheter", label: "Urinary catheter", type: "radio", options: YES_NO_OPTIONS },
          { name: "feeding_tube", label: "Feeding tube", type: "radio", options: [
            { label: "NG", value: "ng" },
            { label: "PEG", value: "peg" },
            { label: "None", value: "none" }
          ]},
          { name: "drains_wound_vac", label: "Drains/wound VAC", type: "radio", options: YES_NO_OPTIONS }
        ]
      },
      {
        title: "On Admission: Head-to-Toe Physical Assessment",
        fields: [
          { type: "subheading", label: "Neurological" },
          {
            name: "neuro_loc",
            label: "Level of consciousness",
            type: "radio",
            options: [
              { label: "Alert", value: "alert" },
              { label: "Drowsy", value: "drowsy" },
              { label: "Lethargic", value: "lethargic" },
              { label: "Unresponsive", value: "unresponsive" }
            ]
          },
          {
            name: "neuro_cognition_orientation",
            label: "Cognition / Orientation",
            type: "checkbox-group",
            options: [
              { label: "Person", value: "person" },
              { label: "Place", value: "place" },
              { label: "Time", value: "time" },
              { label: "Situation", value: "situation" }
            ]
          },
          {
            name: "neuro_communication",
            label: "Communication",
            type: "checkbox-group",
            options: [
              { label: "Normal speech", value: "normal_speech" },
              { label: "Dysarthria", value: "dysarthria" },
              { label: "Expressive aphasia", value: "expressive_aphasia" },
              { label: "Receptive aphasia", value: "receptive_aphasia" },
              { label: "Global aphasia", value: "global_aphasia" },
              { label: "Uses Alternative Communication Strategies (AAC / writing / gestures / device)", value: "aac" }
            ]
          },
          {
            name: "neuro_pupils",
            label: "Pupils",
            type: "radio",
            options: [
              { label: "Equal", value: "equal" },
              { label: "Reactive", value: "reactive" },
              { label: "Non-reactive", value: "non_reactive" }
            ]
          },
          {
            name: "neuro_motor_strength",
            label: "Motor strength",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Weak (specify side)", value: "weak" }
            ]
          },
          {
            name: "neuro_motor_strength_specify",
            label: "Motor strength â€“ weak (specify side)",
            type: "input",
            showIf: { field: "neuro_motor_strength", equals: "weak" }
          },
          {
            name: "neuro_sensory_function",
            label: "Sensory function",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Impaired (specify)", value: "impaired" }
            ]
          },
          {
            name: "neuro_sensory_function_specify",
            label: "Sensory function â€“ impaired (specify)",
            type: "input",
            showIf: { field: "neuro_sensory_function", equals: "impaired" }
          },
          {
            name: "neuro_reflexes",
            label: "Reflexes",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Hypoactive", value: "hypoactive" },
              { label: "Hyperactive", value: "hyperactive" }
            ]
          },
          {
            name: "neuro_coordination_gait",
            label: "Coordination / gait",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Unsteady", value: "unsteady" }
            ]
          },
          {
            name: "neuro_deficits",
            label: "Neurological deficits",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Present (specify)", value: "present" }
            ]
          },
          {
            name: "neuro_deficits_specify",
            label: "Neurological deficits â€“ specify",
            type: "textarea",
            showIf: { field: "neuro_deficits", equals: "present" }
          },
          {
            name: "neuro_overall_specify",
            label: "Specify",
            type: "textarea"
          },

          { type: "subheading", label: "Head and Neck" },
          {
            name: "hn_head",
            label: "Head",
            type: "radio",
            options: [
              { label: "Normocephalic", value: "normocephalic" },
              { label: "Abnormal (specify)", value: "abnormal" }
            ]
          },
          {
            name: "hn_head_specify",
            label: "Head â€“ abnormal (specify)",
            type: "input",
            showIf: { field: "hn_head", equals: "abnormal" }
          },
          {
            name: "hn_eyes",
            label: "Eyes",
            type: "checkbox-group",
            options: [
              { label: "PERRLA", value: "perrla" },
              { label: "Redness", value: "redness" },
              { label: "Discharge", value: "discharge" },
              { label: "Visual deficit", value: "visual_deficit" }
            ]
          },
          {
            name: "eye_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Eye Assessment", value: "eye_assessment" }],
            showIf: {
              or: [
                { field: "hn_eyes", includes: "redness" },
                { field: "hn_eyes", includes: "discharge" },
                { field: "hn_eyes", includes: "visual_deficit" }
              ]
            }
          },
          {
            name: "hn_ears",
            label: "Ears",
            type: "checkbox-group",
            options: [
              { label: "Clear canals", value: "clear_canals" },
              { label: "Discharge", value: "discharge" },
              { label: "Hearing deficit", value: "hearing_deficit" }
            ]
          },
          {
            name: "hn_ears_audiology_referral",
            label: "Audiology referral indicated",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ],
            showIf: { field: "hn_ears", includes: "hearing_deficit" }
          },
          {
            name: "hn_nose",
            label: "Nose",
            type: "radio",
            options: [
              { label: "Patent", value: "patent" },
              { label: "Congestion", value: "congestion" },
              { label: "Discharge", value: "discharge" }
            ]
          },
          {
            name: "hn_mouth",
            label: "Mouth / oral mucosa",
            type: "checkbox-group",
            options: [
              { label: "Moist", value: "moist" },
              { label: "Dry", value: "dry" },
              { label: "Pale", value: "pale" },
              { label: "Lesions", value: "lesions" }
            ]
          },
          {
            name: "hn_throat",
            label: "Throat / swallowing",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Dysphagia", value: "dysphagia" }
            ]
          },
          {
            name: "hn_neck",
            label: "Neck",
            type: "checkbox-group",
            options: [
              { label: "Supple", value: "supple" },
              { label: "Masses", value: "masses" },
              { label: "Lymphadenopathy", value: "lymphadenopathy" }
            ]
          },
          {
            name: "hn_jvd",
            label: "Jugular venous distension (JVD)",
            type: "radio",
            options: [
              { label: "Absent", value: "absent" },
              { label: "Present", value: "present" }
            ]
          },
          {
            name: "head_neck_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Head & Neck Assessment", value: "head_neck_assessment" }],
            showIf: {
              or: [
                { field: "hn_head", equals: "abnormal" },
                { field: "hn_neck", includes: "masses" },
                { field: "hn_neck", includes: "lymphadenopathy" }
              ]
            }
          },
          { type: "subheading", label: "Chest & Lungs / Respiratory System" },
          {
            name: "resp_breathing_pattern",
            label: "Breathing pattern",
            type: "radio",
            options: [
              { label: "Regular", value: "regular" },
              { label: "Labored", value: "labored" },
              { label: "Shallow", value: "shallow" }
            ]
          },
          {
            name: "resp_chest_expansion",
            label: "Chest expansion",
            type: "radio",
            options: [
              { label: "Symmetrical", value: "symmetrical" },
              { label: "Asymmetrical", value: "asymmetrical" }
            ]
          },
          {
            name: "resp_breath_sounds",
            label: "Breath sounds",
            type: "checkbox-group",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Wheeze", value: "wheeze" },
              { label: "Crackles", value: "crackles" },
              { label: "Diminished", value: "diminished" }
            ]
          },
          {
            name: "resp_o2_saturation",
            label: "Oxygen saturation (%)",
            type: "input",
            placeholder: "%"
          },
          {
            name: "resp_o2_mode",
            label: "Oxygen delivery",
            type: "radio",
            options: [
              { label: "Room air (RA)", value: "ra" },
              { label: "Oâ‚‚", value: "o2" }
            ]
          },
          {
            name: "resp_distress_signs",
            label: "Signs of respiratory distress",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Retractions", value: "retractions" },
              { label: "Nasal flaring", value: "nasal_flaring" },
              { label: "Cyanosis", value: "cyanosis" }
            ]
          },
          {
            name: "respiratory_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Respiratory Assessment", value: "respiratory_assessment" }],
            showIf: { field: "show_respiratory_launcher", equals: true }
          },
          {
            name: "resp_work_of_breathing",
            label: "Work of breathing",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Increased", value: "increased" }
            ]
          },
          {
            name: "resp_lung_auscultation",
            label: "Lung auscultation",
            type: "radio",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Abnormal (specify)", value: "abnormal" }
            ]
          },
          {
            name: "resp_lung_auscultation_specify",
            label: "Lung auscultation â€“ abnormal (specify)",
            type: "textarea",
            showIf: { field: "resp_lung_auscultation", equals: "abnormal" }
          },
          { type: "subheading", label: "Heart & Vascular System" },
          {
            name: "hv_rhythm",
            label: "Rhythm",
            type: "radio",
            options: [
              { label: "Regular", value: "regular" },
              { label: "Irregular", value: "irregular" }
            ]
          },
          {
            name: "hv_heart_sounds",
            label: "Heart sounds",
            type: "radio",
            options: [
              { label: "S1 S2 normal", value: "normal" },
              { label: "Murmur", value: "murmur" },
              { label: "Extra sounds", value: "extra_sounds" }
            ]
          },
          {
            name: "hv_radial_quality",
            label: "Peripheral pulses â€” Radial",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Weak", value: "weak" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "hv_dorsalis_pedis_quality",
            label: "Peripheral pulses â€” Dorsalis pedis",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Weak", value: "weak" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "hv_posterior_tibial_quality",
            label: "Peripheral pulses â€” Posterior tibial",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Weak", value: "weak" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "cardiac_assessment_launcher_heart_vascular",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Cardiac Assessment", value: "cardiac_assessment" }],
            showIf: { field: "show_cardiac_launcher", equals: true }
          },
          {
            name: "hv_cap_refill",
            label: "Capillary refill (seconds)",
            type: "input",
            placeholder: "e.g. 2"
          },
          {
            name: "hv_edema",
            label: "Edema",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "+1", value: "1" },
              { label: "+2", value: "2" },
              { label: "+3", value: "3" },
              { label: "+4", value: "4" }
            ]
          },
          {
            name: "hv_edema_location",
            label: "Edema location",
            type: "input",
            placeholder: "Location",
            showIf: { field: "hv_edema", oneOf: ["1", "2", "3", "4"] }
          },
          {
            name: "hv_skin_temp_color",
            label: "Skin temperature / colour",
            type: "radio",
            options: [
              { label: "Warm", value: "warm" },
              { label: "Cool", value: "cool" },
              { label: "Pale", value: "pale" },
              { label: "Cyanotic", value: "cyanotic" }
            ]
          },
          { type: "subheading", label: "Abdomen / Gastrointestinal System" },
          {
            type: "assessment-launcher",
            name: "gi_bowel_assessments_launcher",
            label: "Related Assessments",
            options: [
              { label: "Bladder Diary", value: "bladder_diary" },
              { label: "Bristol Chart", value: "bristol_chart" }
            ]
          },
          {
            name: "gi_inspection",
            label: "Inspection",
            type: "radio",
            options: [
              { label: "Flat", value: "flat" },
              { label: "Distended", value: "distended" },
              { label: "Symmetrical", value: "symmetrical" }
            ]
          },
          {
            name: "gi_palpation",
            label: "Palpation",
            type: "radio",
            options: [
              { label: "Soft", value: "soft" },
              { label: "Tender", value: "tender" },
              { label: "Guarding", value: "guarding" },
              { label: "Masses", value: "masses" }
            ]
          },
          {
            name: "gi_bowel_sounds",
            label: "Bowel sounds",
            type: "radio",
            options: [
              { label: "Normoactive", value: "normoactive" },
              { label: "Hypoactive", value: "hypoactive" },
              { label: "Hyperactive", value: "hyperactive" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "gi_nausea_vomiting",
            label: "Nausea / vomiting",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gi_gu_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "GI or GU Assessment", value: "gi_gu_assessment" }],
            showIf: { field: "show_gi_gu_launcher", equals: true }
          },
          {
            name: "gi_last_bm",
            label: "Last bowel movement",
            type: "input"
          },
          {
            name: "gi_continence",
            label: "Continence",
            type: "radio",
            options: [
              { label: "Continent", value: "continent" },
              { label: "Incontinent", value: "incontinent" }
            ]
          },
          {
            name: "gi_frequency",
            label: "Frequency",
            type: "radio",
            options: [
              { label: "Daily", value: "daily" },
              { label: "Every ___ days", value: "every_x_days" },
              { label: "Irregular", value: "irregular" }
            ]
          },
          {
            name: "gi_frequency_specify",
            label: "Frequency â€“ every ___ days",
            type: "input",
            placeholder: "e.g. every 3 days",
            showIf: { field: "gi_frequency", equals: "every_x_days" }
          },
          {
            name: "gi_ease_defecation",
            label: "Ease of defecation",
            type: "radio",
            options: [
              { label: "No straining", value: "no_straining" },
              { label: "Straining", value: "straining" },
              { label: "Painful", value: "painful" }
            ]
          },
          {
            name: "gi_ostomy_present",
            label: "Ostomy present",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gi_ostomy_type",
            label: "Ostomy type",
            type: "input",
            placeholder: "Type",
            showIf: { field: "gi_ostomy_present", equals: "yes" }
          },
          {
            name: "gi_abdominal_distension_bowel",
            label: "Abdominal distension related to bowel",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gi_bowel_function",
            label: "Bowel Function",
            type: "radio",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Needs some help", value: "needs_help" },
              { label: "Dependent", value: "dependent" }
            ]
          },
          {
            name: "gi_bowel_method_needs_help",
            label: "Method (Needs some help)",
            type: "radio",
            options: [
              { label: "Toilet", value: "toilet" },
              { label: "Diaper", value: "diaper" }
            ],
            showIf: { field: "gi_bowel_function", equals: "needs_help" }
          },
          {
            name: "gi_bowel_method_dependent",
            label: "Method (Dependent)",
            type: "radio",
            options: [
              { label: "Digital rectal stimulation", value: "digital_stimulation" },
              { label: "Manual evacuation", value: "manual_evacuation" },
              { label: "Suppository", value: "suppository" },
              { label: "Enema", value: "enema" },
              { label: "Lactulose", value: "lactulose" }
            ],
            showIf: { field: "gi_bowel_function", equals: "dependent" }
          },
          { type: "subheading", label: "Genitourinary System" },
          {
            name: "gu_voiding",
            label: "Voiding",
            type: "radio",
            options: [
              { label: "Spontaneous", value: "spontaneous" },
              { label: "Assisted", value: "assisted" },
              { label: "Catheterized", value: "catheterized" }
            ]
          },
          {
            name: "gu_urine_output",
            label: "Urine output (mL/hr)",
            type: "input",
            placeholder: "mL/hr"
          },
          {
            name: "gu_urine_appearance",
            label: "Urine colour / clarity",
            type: "radio",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Cloudy", value: "cloudy" },
              { label: "Dark", value: "dark" },
              { label: "Hematuria", value: "hematuria" }
            ]
          },
          {
            name: "gu_dysuria",
            label: "Dysuria",
            type: "radio",
            options: [
              { label: "Absent", value: "absent" },
              { label: "Present", value: "present" }
            ]
          },
          {
            name: "renal_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Renal Assessment", value: "renal_assessment" }],
            showIf: { field: "show_renal_launcher", equals: true }
          },
          {
            name: "gu_incontinence",
            label: "Incontinence",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gu_bladder_function",
            label: "Bladder Function",
            type: "radio",
            options: [
              { label: "Independent", value: "independent" },
              { label: "Needs some help", value: "needs_help" },
              { label: "Full dependent", value: "full_dependent" }
            ]
          },
          {
            name: "gu_bladder_method_full_dependent",
            label: "Bladder management method (Full dependent)",
            type: "radio",
            options: [
              { label: "Intermittent catheterization", value: "intermittent_catheter" },
              { label: "Indwelling (Foley) catheter", value: "indwelling_foley" },
              { label: "Suprapubic catheter", value: "suprapubic_catheter" },
              { label: "Condom (external) catheter", value: "condom_catheter" }
            ],
            showIf: { field: "gu_bladder_function", equals: "full_dependent" }
          },

          // { type: "subheading", label: "Endocrine / Metabolic" },
          // {
          //   name: "endo_diabetes",
          //   label: "Diabetes",
          //   type: "radio",
          //   options: [
          //     { label: "No", value: "no" },
          //     { label: "Type 1", value: "type1" },
          //     { label: "Type 2", value: "type2" },
          //     { label: "Gestational", value: "gestational" }
          //   ]
          // },
          // {
          //   name: "endo_hypoglycemia_symptoms",
          //   label: "Hypoglycemia symptoms",
          //   type: "radio",
          //   options: YES_NO_OPTIONS
          // },
          // {
          //   name: "endo_hyperglycemia_symptoms",
          //   label: "Hyperglycemia symptoms",
          //   type: "radio",
          //   options: YES_NO_OPTIONS
          // },
          // {
          //   name: "endo_steroid_therapy",
          //   label: "Steroid therapy",
          //   type: "radio",
          //   options: YES_NO_OPTIONS
          // },
          // {
          //   name: "endo_hba1c",
          //   label: "HbA1c (if available)",
          //   type: "input"
          // },

          { type: "subheading", label: "Nutrition & Hydration" },
          {
            name: "nut_oral_intake",
            label: "Oral intake",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Reduced", value: "reduced" },
              { label: "Minimal / NPO", value: "minimal_npo" }
            ]
          },
          {
            name: "nut_weight_change",
            label: "Weight change",
            type: "radio",
            options: [
              { label: "Stable", value: "stable" },
              { label: "Loss >5% in 30 days", value: "loss_5_30" },
              { label: "Loss >10% in 6 months", value: "loss_10_6" }
            ]
          },
          {
            name: "nut_appetite",
            label: "Appetite",
            type: "radio",
            options: [
              { label: "Good", value: "good" },
              { label: "Fair", value: "fair" },
              { label: "Poor", value: "poor" }
            ]
          },
          {
            name: "nut_albumin",
            label: "Albumin / prealbumin (if available)",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Low", value: "low" }
            ]
          },
          {
            name: "nut_swallow_difficulty",
            label: "Swallow difficulty",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            type: "subheading",
            label: "",
            showIf: { field: "nut_swallow_difficulty", equals: "yes" }
          },
          {
            name: "swallow_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [
              { label: "Swallow Screener", value: "swallow_screener" },
              { label: "Water Swallow Test", value: "water_swallow_test" }
            ],
            showIf: { field: "nut_swallow_difficulty", equals: "yes" }
          },

          // Replace the conditional block with this (for testing):

          { type: "subheading", label: "Safety & Comfort Concerns" },
          { type: "subheading", label: "Orthostatic vitals" },

          { 
            type: "row", 
            fields: [
              { name: "ortho_supine_bp", label: "Supine: BP", type: "input" },
              { name: "ortho_supine_hr", label: "Supine: HR", type: "input" }
            ]
          },
          { 
            type: "row", 
            fields: [
              { name: "ortho_sitting_bp", label: "Sitting: BP", type: "input" },
              { name: "ortho_sitting_hr", label: "Sitting: HR", type: "input" }
            ]
          },
          { 
            type: "row", 
            fields: [
              { name: "ortho_stand1_bp", label: "Standing (1 min): BP", type: "input" },
              { name: "ortho_stand1_hr", label: "Standing (1 min): HR", type: "input" }
            ]
          },
          { 
            type: "row", 
            fields: [
              { name: "ortho_stand3_bp", label: "Standing (3 min): BP", type: "input" },
              { name: "ortho_stand3_hr", label: "Standing (3 min): HR", type: "input" }
            ]
          },

          { type: "subheading", label: "Musculoskeletal System" },
          {
            name: "msk_rom",
            label: "Range of motion (ROM)",
            type: "radio",
            options: [
              { label: "Full", value: "full" },
              { label: "Limited (specify joint)", value: "limited" }
            ]
          },
          {
            name: "msk_rom_specify",
            label: "ROM limited â€“ specify joint",
            type: "input",
            showIf: { field: "msk_rom", equals: "limited" }
          },
          {
            name: "msk_strength",
            label: "Muscle strength",
            type: "radio",
            options: [
              { label: "5/5", value: "5_5" },
              { label: "â†“ strength (location)", value: "decreased" }
            ]
          },
          {
            name: "msk_strength_specify",
            label: "Muscle strength â†“ â€“ location",
            type: "input",
            showIf: { field: "msk_strength", equals: "decreased" }
          },
          {
            name: "msk_gait",
            label: "Gait",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Unsteady", value: "unsteady" },
              { label: "Uses assistive device", value: "assistive_device" }
            ]
          },
          {
            name: "msk_joint_swelling_deformity",
            label: "Joint swelling / deformity",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Present", value: "present" }
            ]
          },
          {
            name: "msk_pain_with_movement",
            label: "Pain with movement",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes (location)", value: "yes" }
            ]
          },
          {
            name: "msk_pain_with_movement_location",
            label: "Pain with movement â€“ location",
            type: "input",
            showIf: { field: "msk_pain_with_movement", equals: "yes" }
          },
          {
            name: "msk_lower_extremity",
            label: "Lower extremity assessment",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Weak", value: "weak" },
              { label: "Edematous", value: "edematous" }
            ]
          },
          {
            name: "musculoskeletal_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Musculoskeletal Assessment", value: "musculoskeletal_assessment" }],
            showIf: { field: "show_msk_launcher", equals: true }
          },

          { type: "subheading", label: "Integumentary System / Skin Integrity" },
          {
            name: "skin_colour",
            label: "Skin colour",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Pale", value: "pale" },
              { label: "Cyanotic", value: "cyanotic" },
              { label: "Jaundiced", value: "jaundiced" }
            ]
          },
          {
            name: "skin_assessment_launcher",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Skin Focused Assessment", value: "skin_assessment" }],
            showIf: { field: "skin_colour", equals: "pale" }
          },
          {
            name: "skin_temperature",
            label: "Temperature",
            type: "radio",
            options: [
              { label: "Warm", value: "warm" },
              { label: "Cool", value: "cool" }
            ]
          },
          {
            name: "skin_moisture",
            label: "Moisture",
            type: "radio",
            options: [
              { label: "Dry", value: "dry" },
              { label: "Moist", value: "moist" },
              { label: "Diaphoretic", value: "diaphoretic" }
            ]
          },
          {
            name: "skin_turgor",
            label: "Turgor",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Poor", value: "poor" }
            ]
          },
          {
            name: "skin_integrity",
            label: "Integrity",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Dry", value: "dry" },
              { label: "Cracks", value: "cracks" },
              { label: "Callus", value: "callus" },
              { label: "Fissures", value: "fissures" }
            ]
          },
          {
            name: "pi_time_same_position",
            label: "Time in same position",
            type: "radio",
            options: [
              { label: "<2 hours", value: "lt_2h" },
              { label: "â‰¥2 hours", value: "gte_2h" }
            ]
          },
          {
            name: "pi_pressure_areas",
            label: "Pressure areas (sacrum, coccyx, heels, elbows)",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Reddened", value: "reddened" },
              { label: "Breakdown (stage ___)", value: "breakdown" }
            ]
          },
          {
            name: "pi_breakdown_stage",
            label: "Breakdown stage",
            type: "input",
            placeholder: "Stage",
            showIf: { field: "pi_pressure_areas", equals: "breakdown" }
          },
          {
            name: "pi_skin_moisture",
            label: "Skin moisture",
            type: "radio",
            options: [
              { label: "Dry", value: "dry" },
              { label: "Occasionally moist", value: "occasionally_moist" },
              { label: "Frequently moist", value: "frequently_moist" },
              { label: "Constantly moist", value: "constantly_moist" }
            ]
          },
          {
            name: "pi_incontinence_type",
            label: "Incontinence",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Urinary", value: "urinary" },
              { label: "Fecal", value: "fecal" },
              { label: "Dual", value: "dual" }
            ]
          },
          {
            name: "pi_perspiration",
            label: "Perspiration / diaphoresis",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "pi_devices_moisture",
            label: "Devices causing moisture (diapers, catheters, drains)",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          { type: "subheading", label: "Wounds / Pressure Injury" },
          {
            name: "pi_ulcer_wound_present",
            label: "Ulcer / wound present",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "pi_braden_scale",
            label: "",
            type: "assessment-launcher",
            options: [{ label: "Braden Scale", value: "braden_scale" }],
            showIf: { field: "pi_ulcer_wound_present", equals: "yes" }
          },
          {
            name: "pi_wound_assessment",
            label: "Wound Assessment (WATFS)",
            type: "assessment-launcher",
            autoOpen: false,
            hideRemarks: true,
            showIf: {
              field: "pi_ulcer_wound_present",
              equals: "yes"
            },
            options: [
              {
                label: "Wound Assessment (WATFS)",
                value: "wound_assessment"
              }
            ]
          },
          {
            name: "pi_drainage",
            label: "Drainage",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Serous", value: "serous" },
              { label: "Purulent", value: "purulent" },
              { label: "Bloody", value: "bloody" }
            ]
          },
          {
            name: "pi_dressing_status",
            label: "Dressing status",
            type: "radio",
            options: [
              { label: "Clean/dry/intact", value: "clean_dry_intact" },
              { label: "Soiled", value: "soiled" },
              { label: "Loose", value: "loose" }
            ]
          },

          { type: "subheading", label: "Functional Status" },
          {
            name: "pi_position_tolerance",
            label: "Current position tolerance",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Independent repositioning", value: "independent_repositioning" },
              { label: "Requires assistance to reposition", value: "requires_assistance" },
              { label: "Bedbound / Chairbound", value: "bedbound_chairbound" }
            ]
          },
          {
            name: "pi_transfers",
            label: "Transfers",
            type: "radio",
            options: [
              { label: "Independent", value: "independent" },
              { label: "One assist", value: "one_assist" },
              { label: "Two assist / mechanical lift", value: "two_assist_mech_lift" }
            ]
          },


    // ---------------- WALKING AID ----------------

    {
      type: "subheading",
      label: "Mobility Aid"
    },

    {
      name: "walking_aid_type",
      label: "Walking Aid Type",
      type: "radio",
      options: [
        { label: "Walking stick/cane", value: "walking_stick" },
        { label: "Elbow crutches (single/bilateral)", value: "elbow_crutches" },
        { label: "Axillary crutches (single/bilateral)", value: "axillary_crutches" },
        { label: "Platform crutches (single/bilateral)", value: "platform_crutches" },
        { label: "Quadripod", value: "quadripod" },
        { label: "Walking Frame", value: "walking_frame" },
        { label: "Wheeled Walker", value: "wheeled_walker" },
        { label: "Rollator / Reverse Rollator", value: "rollator" }
      ]
    },

        {
          name: "walking_aid_assistance",
          label: "Assistance Level",
          type: "radio",
          options: [
            { label: "Independent", value: "independent" },
            { label: "Minimal Assistance", value: "minimal_assistance" },
            { label: "Moderate Assistance", value: "moderate_assistance" },
            { label: "Maximum Assistance", value: "maximum_assistance" },
            { label: "Total Dependent", value: "total_dependent" }
          ]
        },

        {
          name: "walking_aid_distance",
          label: "Distance",
          type: "radio",
          options: [
            { label: "Short Distance", value: "short_distance" },
            { label: "Long Distance", value: "long_distance" }
          ]
        },
      

    // ---------------- WHEELCHAIR ----------------

    // {
    //   type: "subheading",
    //   label: "Wheelchair"
    // },

    {
      name: "wheelchair_type",
      label: "Wheelchair Type",
      type: "radio",
      options: [
        { label: "Manual Wheelchair", value: "manual_wheelchair" },
        { label: "Electrical Wheelchair", value: "electrical_wheelchair" }
      ]
    },

   
        {
          name: "wheelchair_assistance",
          label: "Assistance Level",
          type: "radio",
          options: [
            { label: "Independent", value: "independent" },
            { label: "Minimal Assistance", value: "minimal_assistance" },
            { label: "Moderate Assistance", value: "moderate_assistance" },
            { label: "Maximum Assistance", value: "maximum_assistance" },
            { label: "Total Dependent", value: "total_dependent" }
          ]
        },

        {
          name: "wheelchair_distance",
          label: "Distance",
          type: "radio",
          options: [
            { label: "Short Distance", value: "short_distance" },
            { label: "Long Distance", value: "long_distance" }
          ]
        },
     

    // ---------------- OTHERS ----------------

    {
      type: "subheading",
      label: "Others"
    },

    {
      name: "mobility_aid_other",
      label: "Specify",
      type: "textarea"
    },
          // {
          //   name: "pi_ambulation",
          //   label: "Ambulation",
          //   type: "radio",
          //   options: [
          //     { label: "Independent", value: "independent" },
          //     { label: "With assistive device", value: "assistive_device" },
          //     { label: "Unable to ambulate", value: "unable" }
          //   ]
          // },
          // {
          //   name: "pi_time_same_position",
          //   label: "Time in same position",
          //   type: "radio",
          //   options: [
          //     { label: "<2 hours", value: "lt_2h" },
          //     { label: "â‰¥2 hours", value: "gte_2h" }
          //   ]
          // },
          // {
          //   name: "pi_pressure_areas",
          //   label: "Pressure areas (sacrum, coccyx, heels, elbows)",
          //   type: "radio",
          //   options: [
          //     { label: "Intact", value: "intact" },
          //     { label: "Reddened", value: "reddened" },
          //     { label: "Breakdown (stage ___)", value: "breakdown" }
          //   ]
          // },
          // {
          //   name: "pi_breakdown_stage",
          //   label: "Breakdown stage",
          //   type: "input",
          //   placeholder: "Stage",
          //   showIf: { field: "pi_pressure_areas", equals: "breakdown" }
          // },
          // {
          //   name: "pi_skin_moisture",
          //   label: "Skin moisture",
          //   type: "radio",
          //   options: [
          //     { label: "Dry", value: "dry" },
          //     { label: "Occasionally moist", value: "occasionally_moist" },
          //     { label: "Frequently moist", value: "frequently_moist" },
          //     { label: "Constantly moist", value: "constantly_moist" }
          //   ]
          // },
          // {
          //   name: "pi_incontinence_type",
          //   label: "Incontinence",
          //   type: "radio",
          //   options: [
          //     { label: "None", value: "none" },
          //     { label: "Urinary", value: "urinary" },
          //     { label: "Fecal", value: "fecal" },
          //     { label: "Dual", value: "dual" }
          //   ]
          // },
          // {
          //   name: "pi_perspiration",
          //   label: "Perspiration / diaphoresis",
          //   type: "radio",
          //   options: [
          //     { label: "No", value: "no" },
          //     { label: "Yes", value: "yes" }
          //   ]
          // },
          // {
          //   name: "pi_devices_moisture",
          //   label: "Devices causing moisture (diapers, catheters, drains)",
          //   type: "radio",
          //   options: [
          //     { label: "No", value: "no" },
          //     { label: "Yes", value: "yes" }
          //   ]
          // },

          { type: "subheading", label: "Psychosocial  & Emotional Status" },
          {
            name: "beh_appearance",
            label: "Appearance",
            type: "radio",
            options: [
              { label: "Well-groomed", value: "well_groomed" },
              { label: "Disheveled", value: "disheveled" },
              { label: "Neglected", value: "neglected" }
            ]
          },
          {
            name: "beh_behavior",
            label: "Behavior",
            type: "radio",
            options: [
              { label: "Calm", value: "calm" },
              { label: "Cooperative", value: "cooperative" },
              { label: "Agitated", value: "agitated" },
              { label: "Aggressive", value: "aggressive" },
              { label: "Withdrawn", value: "withdrawn" }
            ]
          },
          {
            name: "beh_psychomotor",
            label: "Psychomotor activity",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Increased", value: "increased" },
              { label: "Decreased", value: "decreased" }
            ]
          },
          {
            name: "beh_eye_contact",
            label: "Eye contact",
            type: "radio",
            options: [
              { label: "Appropriate", value: "appropriate" },
              { label: "Poor", value: "poor" },
              { label: "Avoidant", value: "avoidant" }
            ]
          },
          {
            name: "beh_speech",
            label: "Speech",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Pressured", value: "pressured" },
              { label: "Slow", value: "slow" },
              { label: "Incoherent", value: "incoherent" }
            ]
          },
          {
            name: "beh_mood",
            label: "Mood",
            type: "radio",
            options: [
              { label: "Euthymic", value: "euthymic" },
              { label: "Anxious", value: "anxious" },
              { label: "Depressed", value: "depressed" },
              { label: "Irritable", value: "irritable" }
            ]
          },
          {
            name: "beh_affect",
            label: "Affect",
            type: "radio",
            options: [
              { label: "Appropriate", value: "appropriate" },
              { label: "Flat", value: "flat" },
              { label: "Labile", value: "labile" }
            ]
          },
          {
            name: "beh_thought_process",
            label: "Thought process",
            type: "radio",
            options: [
              { label: "Logical", value: "logical" },
              { label: "Disorganized", value: "disorganized" }
            ]
          },
          {
            name: "beh_thought_content",
            label: "Thought content",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Delusions", value: "delusions" },
              { label: "Hallucinations", value: "hallucinations" }
            ]
          },
          {
            name: "beh_orientation_person",
            label: "Oriented to person",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "beh_orientation_place",
            label: "Oriented to place",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "beh_orientation_time",
            label: "Oriented to time",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "beh_obeys_3_step",
            label: "Obeys 3-step command",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "beh_insight_judgment",
            label: "Insight / judgment",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Impaired", value: "impaired" }
            ]
          },
          {
            name: "beh_risk_behaviors",
            label: "Risk behaviors observed",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Self-harm", value: "self_harm" },
              { label: "Harm to others", value: "harm_others" },
              { label: "Wandering", value: "wandering" }
            ]
          }
        ]
      },
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
              { label: "Morse Fall Scale", value: "morse_fall_scale" },
              { label: "Braden Scale", value: "braden_scale" },
              { label: "Wound Treatment Flowsheet", value: "wound_treatment_flowsheet" },
              { label: "Numeric Rating Scale (NRS) 0-10", value: "numeric_pain_rating_scale" },
              { label: "Diabetic Foot Assessment", value: "diabetic_foot_assessment" },
              { label: "Medication Chart", value: "medication_chart" },
              { label: "Bladder Diary", value: "bladder_diary" },
              { label: "Agitated Behaviour Scale", value: "agitated_behaviour_scale" },
              { label: "Glucose Monitor", value: "glucose_monitor" },
              // { label: "Rehab Checklist", value: "rehab_checklist" },
              { label: "Seizure Chart", value: "seizure_chart" },
              { label: "Swallow Screener", value: "swallow_screener" },
              { label: "Water Swallow Test", value: "water_swallow_test" },
              { label: "Repositioning & Skin Inspection", value: "repositioning_skin_chart" }
            ]
          }
        ]
      }
    ]
  };

  // ── Nursing Diagnosis Data ──
  const NURSING_DIAGNOSES = [
    { id:"cognitive", label:"1. Cognitive", issues: [
      { issue:"Attention Deficit", interventions:["Environmental modifications (quiet room, minimal distractions)","Structured routines (set daily schedules, checklist tasks)","Attention training (brain games, cognitive therapy)","Medication review (adjust dosage of sedatives if needed)"] },
      { issue:"Memory Loss", interventions:["Memory aids (calendars, alarms, reminders)","Cognitive stimulation (puzzles, storytelling, mental exercises)","Repetition and reinforcement (Consistently reviewing information)","Healthy lifestyle (balanced diet, regular exercise)"] },
      { issue:"Impaired Problem-Solving & Decision-Making", interventions:["Step-by-step guidance (break tasks into simple steps)","Supervised decision-making (caregiver support)","Executive function training (problem-solving activities)"] },
      { issue:"Communication Disorders", interventions:["Speech therapy (Speech-language pathologists for training)","Alternative communication tools (picture boards, devices)","Slow, clear speech practice (Encourage simple, direct sentences)"] },
      { issue:"Disorientation & Confusion", interventions:["Reality orientation therapy Frequent reminders of time, place, date)","Visual aids (large clocks, labeled rooms)","Monitor medications","Adjust sedative or opioid dosage"] },
      { issue:"Lack of Awareness", interventions:["Gentle redirection (Encourage safe activities without confrontation)","Education and counseling (Help families understand the condition)","Safety modifications (bed alarms, fall prevention measures)"] },
      { issue:"Impaired Spatial Awareness", interventions:["Visual scanning therapy (Training to notice the neglected side)","Marked pathways and objects (Use bright-colored tape on furniture)","Mirror therapy (Encouraging movement of the affected side)"] },
      { issue:"Poor Judgment & Risk-Taking Behavior", interventions:["Behavior modification therapy (Structured reinforcement of safe measures","Supervised activities (Reduce risk-taking behavior)","Safety planning (restrict access to unsafe areas)"] }
    ]},
    { id:"bladder", label:"2. Bladder Issues", issues: [
      { issue:"Urinary Retention", interventions:["Intermittent catheterization (CIC) for complete bladder drainage","Timed voiding (Encourage urination every 2–3 hours)","Double voiding technique (Urinate, wait, try again)","Medications (Alpha-blockers to relax bladder neck muscles)"] },
      { issue:"Urinary Incontinence", interventions:["Pelvic floor exercises (Kegels) to strengthen muscles","Bladder training (gradual increase in time between urination)","Absorbent pads for protection","Medications(Anticholinergics,mirabegron for OAB)"] },
      { issue:"Neurogenic Bladder", interventions:["Scheduled voiding (Set urination times every 2-3 hours)","Clean intermittent catheterization (CIC)","Botox injections (for severe overactivity)","Sacral nerve stimulation (implant device for bladder control)"] },
      { issue:"Overactive Bladder", interventions:["Bladder retraining (Delay urination to improve control)","Pelvic floor exercises (Kegels)","Avoid bladder irritants (caffeine, alcohol, acidic foods)","Medications (oxybutynin, solifenacin, mirabegron)"] },
      { issue:"Urinary Tract Infections", interventions:["Increase fluid intake (Promote natural urine flushing)","Proper catheter care (sterile technique, regular replacement)","Monitor for early symptoms (Prompt antibiotic treatment)","Cranberry supplements (May help reduce UTI risk in some cases)"] }
    ]},
    { id:"bowel", label:"3. Bowel Issues", issues: [
      { issue:"Neurogenic Bowel", interventions:["Bowel program (scheduled toileting) to establish routine","Digital stimulation (manual technique to trigger bowel reflex)","High-fiber diet and hydration to regulate stool consistency","Use of stool softeners or suppositories for regular emptying"] },
      { issue:"Constipation", interventions:["Increase fiber intake (whole grains, fruits, vegetables)","Encourage hydration (1.5-2L water daily)","Abdominal massage and bowel training to stimulate movement","Laxatives (osmotic, stimulant) if lifestyle changes fail"] },
      { issue:"Fecal Impaction", interventions:["Manual disimpaction (if severe)","Enema or suppositories to soften stool","Bowel training to prevent recurrence","Increase dietary fiber and fluids"] },
      { issue:"Fecal Incontinence", interventions:["Pelvic floor therapy to strengthen sphincter muscles","Scheduled toileting (timed defecation) to establish routine","Use of anti-diarrheal medications (if needed)","Protective skin barriers to prevent irritation"] },
      { issue:"Irritable Bowel Syndrome", interventions:["Low FODMAP diet (avoiding fermentable)"]},
      { issue:"Bowel Obstruction", interventions:["Nasogastric tube decompression (if severe)","IV fluids and electrolyte management","Bowel rest (Nil by Mouth – NPO)","Surgical intervention if obstruction does not resolve"] }
    ]},
    { id:"skin", label:"4. Skin Integrity Issues in Rehabilitation", issues: [
      { issue:"Pressure Injuries", interventions:["Regular Reposition (every 2 hours in bed, every 30 mins in wheelchair)","Pressure-relieving devices (air mattresses, foam cushions)","Wound care (dressings, debridement if needed)","Adequate nutrition (high protein, vitamin C, zinc)"] },
      { issue:"Skin Tears", interventions:["Gentle handling of skin (avoid adhesive tapes, use non-traumatic dressings)","Keep skin moisturized (emollients, barrier creams)","Use long-sleeved clothing or skin protectors"] },
      { issue:"Moisture-Associated Skin Damage", interventions:["Frequent skin cleansing with pH-balanced cleansers","Moisture barriers (zinc oxide, petrolatum creams)","Absorbent pads or incontinence briefs","Keep skin dry (adequate air circulation)"] },
      { issue:"Diabetic Foot Ulcers", interventions:["Daily foot inspections (checking for cuts, blisters","Proper footwear (orthopedic shoes, offloading devices)","Debridement of necrotic tissue","Blood sugar control (diet, insulin therapy if needed)"] },
      { issue:"Surgical Wound Dehiscence", interventions:["Adequate protein intake for wound healing","Wound monitoring for signs of infection","Minimize strain (using abdominal binders, avoiding heavy lifting)"] },
      { issue:"Burns", interventions:["Immediate cooling with lukewarm water (not ice)","Topical antimicrobial dressings (silver sulfadiazine)","Pain management (NSAIDs, opioids if severe)","Physical therapy to prevent contractures in severe burns"] },
      { issue:"Venous Stasis Ulcers", interventions:["Compression therapy (compression stockings, leg elevation)","Regular wound care and debridement","Exercise to improve circulation","Avoid prolonged sitting or standing"] },
      { issue:"Radiation Dermatitis", interventions:["Use of mild, fragrance-free skin cleansers","Avoid sun exposure on treated areas","Hydration with emollient creams","Steroid creams (if severe inflammation occurs)"]}
    ]},
    { id: "life", label: "6. Life Expectancy in Rehabilitation", issues: [
      { issue: "Neurological Conditions", interventions: ["Early rehabilitation to improve functional outcomes", "Prevent aspiration pneumonia (swallowing therapy, modified diets)", "DVT prophylaxis (compression stockings, anticoagulants)", "Physical therapy for mobility and muscle strength"]},
      { issue: "Cardiovascular Health", interventions: ["Manage blood pressure and cholesterol (medications, diet)", "Encourage physical activity (adapted exercises for disabled patients)", "Monitor for signs of heart failure (shortness of breath, swelling)"]},
      { issue: "Respiratory Function", interventions: ["Pulmonary rehabilitation (breathing exercises, oxygen therapy)", "Positioning and secretion management (chest physiotherapy)", "Encourage smoking cessation and healthy lifestyle changes"]},
      {  issue: "Nutrition and Metabolism", interventions: ["Dietary assessment and modifications (high-protein diet for wound healing)", "Glycemic control in diabetics (insulin, low-carb diet)", "Encourage weight management programs (exercise, meal planning)"]},
      { issue: "Cancer and Chronic Illnesses", interventions: ["Early palliative care referrals (pain and symptom management)", "Nutrition and hydration support", "Psychosocial support for patients and families"]},
      { issue: "Mental Health and Cognitive Function", interventions: ["Cognitive therapy and social engagement programs", "Psychiatric support (counseling, antidepressants if needed)", "Fall prevention strategies (home safety modifications)"]},
      { issue: "Mobility and Physical Activity", interventions: ["Weight-bearing exercises and resistance training", "Fall prevention strategies (assistive devices, home modifications)", "Osteoporosis management (calcium, bisphosphonates)"]},
      { issue: "Quality of Life and Social Factors", interventions: ["Community programs for social reintegration", "Financial assistance and healthcare advocacy", "Support groups and caregiver training"]}
    ]},
    { id:"community", label:"5. Community Reintegration", issues: [
      { issue:"Physical Mobility Limitations", interventions:["Physical and occupational therapy","Home modifications (ramps, grab bars)","Community accessibility programs"] },
      { issue:"Cognitive Impairment", interventions:["Cognitive rehabilitation therapy","Memory aids (reminders, alarms)","Structured daily routines"] },
      { issue:"Transportation Barriers", interventions:["Accessible transportation services","Community volunteer driving programs","Telehealth options"] },
      { issue:"Employment Challenges", interventions:["Job coaching and vocational rehabilitation","Workplace accommodations","Remote work opportunities"] },
      { issue:"Social Isolation and Loneliness", interventions:["Support groups and peer mentorship","Social skills training","Technology use (video calls, online communities)"] },
      { issue:"Mental Health Issues", interventions:["Psychological counseling","Antidepressants / anxiety medication if needed","Community engagement programs"] },
      { issue:"Lack of Caregiver Support", interventions:["Caregiver education programs","Respite care services","Financial support for caregivers"] },
      { issue:"Stigma and Discrimination", interventions:["Public awareness campaigns","Advocacy for disability rights","Inclusion policies in workplaces and schools"]},
      { issue:"Financial Difficulties", interventions:["Financial counseling and assistance programs","Access to grants and social welfare","Job training for people with disabilities"] },
      { issue:"Healthcare Access Issues", interventions:["Expansion of telemedicine services","Healthcare navigation support programs","Community outreach health clinics"]}
    ]},
    { id:"pain", label:"6. Pain", issues: [
      { issue:"Neuropathic Pain", interventions:["Medications (gabapentin, pregabalin, amitriptyline)","TENS therapy","Physical therapy and desensitization techniques"] },
      { issue:"Musculoskeletal Pain", interventions:["Physical therapy (stretching, strengthening)","Heat/cold therapy","NSAIDs and muscle relaxants"] },
      { issue:"Spasticity-Related Pain", interventions:["Botulinum toxin (Botox) injections","Stretching and positioning strategies","Antispasmodic medications (baclofen, diazepam, tizanidine)"] },
      { issue:"Phantom Limb Pain", interventions:["Mirror therapy","Neuromodulation (TENS, spinal cord stimulation)","Anticonvulsants, NMDA receptor antagonists"] },
      { issue: "Visceral Pain", interventions: ["Bladder and bowel management programs", "Anticholinergic medications for bladder spasticity", "Regular stool softeners and fiber intake"]},
      { issue:"Post-Surgical Pain", interventions:["Multimodal pain management (NSAIDs, opioids, regional anesthesia)","Early mobilization","Scar massage and desensitization therapy"] },
      { issue:"Central Pain Syndrome", interventions:["Tricyclic antidepressants, SNRIs","Cognitive-behavioral therapy (CBT)","Gradual exposure to sensory stimulation"] },
      { issue: "Headaches and Migraines", interventions: ["Migraine prophylaxis (beta-blockers, calcium channel blockers)", "Relaxation techniques (biofeedback, deep breathing)", "Avoiding known triggers (caffeine, dehydration, stress)"]},
      { issue: "Psychogenic or Psychosomatic Pain", interventions: ["Cognitive-behavioral therapy (CBT)", "Mindfulness-based stress reduction", "Non-opioid analgesics, antidepressants"]}
    ]},
    { id:"cardio", label:"7. Cardiovascular, Autonomic & Pulmonary", issues: [
      { issue:"Orthostatic Hypotension", interventions:["Gradual position changes (tilt table, slow transitions)","Compression stockings and abdominal binders","Increased salt and fluid intake","Midodrine or fludrocortisone for severe cases"] },
      { issue:"Autonomic Dysreflexia", interventions:["Immediate removal of noxious stimuli (empty bladder, treat constipation)","Sit patient upright to lower BP","Fast-acting antihypertensives if needed"] },
      { issue:"Deep Vein Thrombosis & Pulmonary Embolism", interventions:["Early mobilization, passive/active ROM","Compression devices (SCDs, TED stockings)","Anticoagulants (heparin, warfarin, DOACs)"] },
      { issue:"Cardiovascular Deconditioning", interventions:["Gradual structured cardiovascular training","Monitor vital signs during exercise","Beta-blockers or ACE inhibitors if needed"] },
      { issue: "Heart Failure Exacerbation", interventions: ["Fluid and sodium restriction", "Diuretics, ACE inhibitors, beta-blockers", "Daily weight monitoring and early symptom detection"]},
      { issue:"Respiratory Muscle Weakness", interventions:["Diaphragmatic and incentive spirometry exercises","Non-invasive ventilation (BiPAP, CPAP) if needed","Assisted cough techniques and secretion management"] },
      { issue:"Aspiration Pneumonia", interventions:["Swallowing assessments (MBSS, FEES)","Aspiration precautions (upright positioning, thickened liquids)","Oral hygiene protocols"] },
      { issue: "Sleep Apnea & Hypoventilation Syndrome", interventions: ["CPAP or BiPAP therapy", "Weight loss interventions", "Avoidance of sedatives and alcohol before sleep"]},
      { issue: "Chronic Hypoxia & Pulmonary Hypertension", interventions: ["Supplemental oxygen therapy (maintain SpO2 > 90%)", "Pulmonary rehabilitation (breathing exercises, endurance training)", "Diuretics, vasodilators (for pulmonary hypertension)"]}
    ]},
    { id:"dysphagia", label:"8. Dysphagia", issues: [
      { issue:"Oropharyngeal Dysphagia", interventions:["Swallowing assessments (MBSS, FEES)","Diet modification (thickened liquids, pureed food)","Swallow therapy (exercises, compensatory strategies)","Aspiration precautions"] },
      { issue:"Esophageal Dysphagia", interventions:["Esophageal dilation for strictures","Proton pump inhibitors (PPIs) for GERD","Small frequent meals, avoid triggers"] },
      { issue:"Neurogenic Dysphagia", interventions:["Neuromuscular stimulation (VitalStim therapy)","Chin tuck and head turn maneuvers","PEG tube placement in severe cases"] },
      { issue: "Obstructive Dysphagia", interventions: ["Endoscopic removal of obstruction", "Surgical intervention (resection of tumors or strictures)", "Soft diet or liquid diet until resolution"]},
      { issue:"Aspiration Pneumonia", interventions:["Strict aspiration precautions","Swallow therapy and compensatory strategies","PEG tube if oral intake is unsafe"] }
    ]},
    { id:"communication", label:"9. Communication Issues", issues: [
      { issue:"Aphasia", interventions:["Speech therapy with SLP","Alternative communication methods (picture boards, AAC devices)","Encouraging slow, clear speech with yes/no questions"] },
      { issue:"Dysarthria", interventions:["Oral motor exercises for strengthening speech muscles","Voice amplification devices","Slow, deliberate speech with short phrases"] },
      { issue:"Apraxia of Speech", interventions:["Motor speech therapy (repetition, cueing techniques)","Encouraging automatic speech (singing, counting)","AAC devices for severe cases"] },
      { issue: "Cognitive-Communication Deficits", interventions: ["Cognitive therapy (memory aids, structured conversations)", "Training in social communication skills", "Encouraging repetition and simplifying instructions"]},
      { issue:"Hearing Impairment", interventions:["Hearing aids or cochlear implants","Speech-to-text apps or written communication","Good lighting and face visibility for lip reading"] },
      { issue:"Mutism", interventions:["AAC devices (speech-generating devices, text-to-speech apps)","Encouraging nonverbal communication (gestures, writing)","Psychological support for anxiety-related mutism"] }
    ]},
    { id:"cognitive2", label:"10. Cognitive Issues", issues: [
      { issue:"Memory Impairment", interventions:["Memory aids (notebooks, alarms, digital reminders)","Cognitive therapy (repetition, chunking information)","Structured routines and familiar environments"] },
      { issue:"Attention Deficits", interventions:["Reducing distractions in the environment","Task breakdown (short, simple steps)","Encouraging mindfulness and structured breaks"] },
      { issue:"Executive Dysfunction", interventions:["Step-by-step guidance for tasks","Cognitive rehabilitation therapy","Encouraging use of planners and visual schedules"] },
      { issue: "Impaired Judgment & Safety Awareness", interventions: ["Supervision in high-risk activities", "Safety modifications (grab bars, reminders for stove usage)", "Caregiver education on managing impulsivity"]},
      { issue: "Aphasia-Related Cognitive Deficits", interventions: ["Speech-language therapy (alternative communication methods)", "Encouraging slow and clear communication", "Using visual aids and gesture-based communication"]},
      { issue:"Delirium", interventions:["Frequent reorientation (clocks, familiar objects)","Hydration and correction of electrolyte imbalances","Reducing sedative use when possible"] },
      { issue:"Impaired Social Cognition", interventions:["Social skills training (role-playing, therapy groups)","Encouraging structured social interactions","CBT for emotional regulation"] }
    ]},
    { id:"selfcare", label:"11. Self-Care Issues", issues: [
      { issue:"Hygiene", interventions:["Adaptive tools (long-handled sponges, electric toothbrushes)","Step-by-step prompting for cognitively impaired patients","Encouraging daily hygiene routines with caregiver assistance"] },
      { issue:"Dressing and Grooming", interventions:["Adaptive clothing (Velcro, elastic waistbands)","Occupational therapy to improve dressing techniques","Structured choices for clothing selection"] },
      { issue:"Toileting", interventions:["Scheduled toileting programs","Bedside commodes, grab bars, incontinence products","Pelvic floor exercises for mild incontinence"] },
      { issue:"Feeding and Eating", interventions:["Modified diet (soft foods, thickened liquids)","Adaptive utensils (built-up handles, non-slip plates)","Supervised feeding and swallowing therapy"] },
      { issue:"Mobility and Transfers", interventions:["Mobility aids (walkers, wheelchairs, transfer boards)","Physical therapy for strength and balance","Home modifications (grab bars, ramps, non-slip mats)"] },
      { issue: "Medication Management", interventions: ["Pill organizers, medication reminders (alarms, phone apps)", "Caregiver assistance or pharmacy blister packs", "Regular medication reviews to simplify regimens"]},
      { issue:"Fatigue and Energy Conservation", interventions:["Energy conservation techniques (pacing, prioritizing tasks)","Adaptive equipment (shower chairs, dressing aids)","Encouraging rest periods between activities"] },
    ]},
    { id:"mobility", label:"12. Mobility Issues", issues: [
      { issue:"Muscle Weakness & Deconditioning", interventions:["Physical therapy for strengthening","Gradual progressive exercise programs","Mobility aids (walkers, canes, wheelchairs)"] },
      { issue:"Balance Impairments", interventions:["Balance training and coordination exercises","Vestibular therapy for inner ear disorders","Environmental modifications (grab bars, non-slip mats)"] },
      { issue:"Gait Abnormalities", interventions:["Gait retraining with physical therapy","Assistive devices (orthotics, prosthetics, walkers)","Fall prevention strategies"] },
      { issue:"Joint Stiffness & Contractures", interventions:["Passive and active ROM exercises","Splinting and positioning techniques","Pain management (medications, heat therapy, massage)"] },
      { issue:"Spasticity & Hypertonia", interventions:["Stretching and muscle relaxation exercises","Botox or muscle relaxants (Baclofen, Diazepam)","Orthotics or braces to prevent deformities"] },
      { issue:"Paralysis", interventions:["Assistive technology (wheelchairs, exoskeletons, FES)","Physical therapy to maximize residual function","Caregiver training for safe transfers and positioning"] },
      { issue: "Pain-Related Mobility Limitations", interventions: ["Multimodal pain management (medications, heat/cold therapy, acupuncture)", "Exercise programs focusing on low-impact activities (swimming, stretching, Tai Chi)", "Joint protection techniques (proper body mechanics, braces, orthotics)"]},
      { issue: "Fatigue-Related Mobility Limitations", interventions: ["Energy conservation strategies (pacing, prioritizing activities, rest breaks)", "Use of assistive devices to reduce energy expenditure", "Nutritional support and hydration management"]}
    ]},
    { id:"metabolic", label:"13. Metabolic Syndrome", issues: [
      { issue:"Obesity", interventions:["Nutritional counseling & weight management programs","Supervised physical activity (aerobic & resistance training)","Behavioral therapy for lifestyle changes"] },
      { issue:"Insulin Resistance & Type 2 Diabetes", interventions:["Blood sugar monitoring & diabetic education","Medication management (metformin, insulin)","Low-glycemic index diet & carbohydrate control"] },
      { issue:"Hypertension", interventions:["DASH diet","Blood pressure monitoring & medication adherence","Relaxation techniques (meditation, breathing exercises)"] },
      { issue:"Dyslipidemia", interventions:["Lipid-lowering medications (statins, fibrates)","Heart-healthy diet (low saturated fat, high fiber)","Regular cardiovascular exercise"] },
      { issue: "Inflammation & Endothelial Dysfunction", interventions: ["Anti-inflammatory diet (rich in omega-3s, antioxidants)", "Smoking cessation & alcohol moderation", "Regular physical activity & weight control"]},
      { issue: "Increased Risk of Cardiovascular Events", interventions: ["Aggressive cardiovascular risk management", "Medications (aspirin, statins, antihypertensives)", "Regular follow-ups & lifestyle modifications"]}
    ]},
    { id:"intimacy", label:"14. Intimacy & Sexuality Issues", issues: [
      { issue:"Erectile Dysfunction", interventions:["Medications (Viagra, Cialis)","Penile implants, vacuum erection devices","Psychosexual counseling"] },
      { issue:"Decreased Libido", interventions:["Hormonal therapy (testosterone, estrogen)","Couples therapy, sex therapy","Fatigue management & pain control"] },
      { issue: "Vaginal Dryness & Pain During Intercourse", interventions: ["Lubricants and vaginal moisturizers", "Pelvic floor therapy", "Hormonal treatments (vaginal estrogen creams, DHEA)"]},
      { issue: "Orgasmic Dysfunction", interventions: ["Sensate focus therapy (non-penetrative intimacy exercises)", "Medication adjustments","Use of vibratory stimulation for nerve reactivation"]},
      { issue:"Body Image and Self-Esteem Issues", interventions:["CBT for body image","Support groups for patients with visible disabilities","Encouraging open partner communication"] },
      { issue:"Spasticity and Physical Limitations Affecting Sex", interventions:["Supportive pillows, adaptive sexual positions","Pain management before intimacy","Partner education and involvement"] },
      { issue: "Fear of Pregnancy & Fertility Concerns", interventions: ["Pre-conception counseling", "Fertility preservation techniques (egg/sperm freezing)", "Safe pregnancy planning with medical guidance"]},
      { issue: "Sexual Identity & Orientation Concerns Post-Injury", interventions: ["Sexual health counseling with an inclusive approach", "Support groups for LGBTQ+ individuals with disabilities", "Exploration of new forms of intimacy (sensate therapy, mutual touch exercises)"]}
    ]},
    { id:"nutrition", label:"15. Nutrition Issues", issues: [
      { issue:"Malnutrition", interventions:["Nutritional assessment and monitoring (BMI, albumin)","High-protein, high-calorie diet","Enteral or parenteral nutrition if needed","Appetite stimulants if appropriate"] },
      { issue:"Obesity & Overnutrition", interventions:["Calorie-controlled, nutrient-dense diet","Behavioral therapy for emotional eating","Encouraging physical activity as tolerated"] },
      { issue:"Dysphagia", interventions:["Swallowing therapy with SLP","Modified diet (pureed foods, thickened liquids)","Feeding tubes if needed (NG tube, PEG tube)"] },
      { issue: "Micronutrient Deficiencies", interventions: ["Nutrient-rich diet with variety of foods", "Supplementation if needed (B12, iron, Vitamin D, Omega-3s)", "Lab monitoring for deficiencies (CBC, ferritin, Vitamin D levels)"]},
      { issue:"Dehydration", interventions:["Encourage frequent fluid intake","IV hydration if needed","Monitoring urine output and electrolytes"] },
      { issue: "Pressure Ulcers & Poor Wound Healing Due to Malnutrition", interventions: ["High-protein, high-calorie diet", "Vitamin and mineral supplementation", "Hydration optimization"]},
      { issue:"Diabetes & Blood Sugar Control Issues", interventions:["Blood sugar monitoring","Balanced carbohydrate intake (low GI foods)","Exercise as tolerated"] }
    ]},
    { id:"safety", label:"16. Safety Issues", issues: [
      { issue:"Falls & Fall-Related Injuries", interventions:["Fall risk assessment (Morse Fall Scale, Berg Balance Test)","Mobility aids (walkers, canes, grab bars)","Physical therapy for strength & balance","Adjust medications causing dizziness"] },
      { issue:"Aspiration & Choking Risk", interventions:["Swallowing assessment by SLP","Modified diet (thickened liquids, pureed foods)","Supervised feeding & upright positioning"] },
      { issue:"Medication Errors & Adverse Drug Reactions", interventions:["Medication reconciliation during transitions","Electronic medication administration records (eMARs)","Patient & caregiver education on medication use"] },
      { issue:"Pressure Ulcers & Skin Integrity", interventions:["Frequent repositioning (every 2 hours in bed)","Skin assessments & pressure-relieving mattresses","Proper nutrition & hydration"] },
      { issue: "Wandering & Elopement in Cognitive Impaired Patients", interventions: ["Use of monitoring systems (door alarms, GPS trackers)", "Behavioral interventions & environmental modifications", "Supervised activities & engagement programs"]},
      { issue: "Burns & Thermal Injuries", interventions: ["Educating patients on safe temperature settings for water & devices", "Avoiding unsupervised use of heating pads or electric blankets", "Regular skin checks for patients with neuropathy"]},
      { issue:"Seizure Safety Concerns", interventions:["Seizure precautions (padded bedrails, avoid sharp objects)","Medication adherence & monitoring levels","Patient & caregiver education on seizure first aid"] },
      { issue:"Self-Harm & Suicide Risk", interventions:["Routine mental health screenings","Crisis intervention & suicide prevention programs","Psychological counseling & support groups"] },
      { issue: "Workplace & Caregiver Safety", interventions: ["Use of mechanical lifts & transfer aids", "Proper ergonomics & staff education on body mechanics", "Workplace wellness programs for staff"]}
    ]},
    { id:"energy", label:"17. Energy Conservation & Sleep", issues: [
      { issue:"Fatigue & Low Energy Levels", interventions:["Energy conservation techniques (pacing, planning)","Adequate nutrition & hydration","Physical therapy to improve endurance","Medication review to reduce drowsiness"] },
      { issue:"Post-Stroke or Neurological Fatigue", interventions:["Frequent rest breaks between activities","Cognitive pacing strategies","Mindfulness & relaxation techniques"] },
      { issue:"Sleep Disturbances", interventions:["Consistent sleep schedule","Pain management before bedtime","Minimizing screen time & stimulants before sleep"] },
      { issue:"Obstructive Sleep Apnea", interventions:["CPAP therapy","Weight management strategies","Avoiding alcohol & sedatives before sleep"] },
      { issue: "Circadian Rhythm Disruptions", interventions: ["Light therapy for circadian realignment", "Maintaining a structured daily routine", "Encouraging outdoor activity in daylight"]},
      { issue:"Restless Legs Syndrome & Nocturnal Spasms", interventions:["Iron supplementation if deficient","Stretching exercises before sleep","Medications (dopamine agonists, muscle relaxants)"] },
      { issue:"Excessive Daytime Sleepiness", interventions:["Promoting better nighttime sleep habits","Adjusting medications causing drowsiness","Encouraging brief naps (20-30 min)"] }
    ]}
  ];

  // ── Nursing Diagnosis Panel Component ──
  function NursingDiagnosisPanel({ values, onChange }) {
    // activeCategory stored in values so it survives parent re-renders
    const activeCategories =
      values.nd_active_categories || [];

    const toggleCategory = (id) => {
      const exists = activeCategories.includes(id);

      const next = exists
        ? activeCategories.filter(c => c !== id)
        : [...activeCategories, id];

      onChange("nd_active_categories", next);
    };
    const visibleCategories =
      NURSING_DIAGNOSES.filter(c =>
        activeCategories.includes(c.id)
      );
    const selectedIssues = values.nd_selected_issues || [];
    const toggleIssue = (issue) => {
      const isSelected = selectedIssues.includes(issue);
      const next = isSelected ? selectedIssues.filter(i => i !== issue) : [...selectedIssues, issue];
      if (isSelected) {
        const nextInterv = { ...(values.nd_selected_interventions || {}) };
        delete nextInterv[issue];
        onChange("nd_selected_interventions", nextInterv);
      }
      onChange("nd_selected_issues", next);
    };
    const cbIssueStyle = { marginRight: 8, accentColor: "#1d4ed8", width: 15, height: 15, flexShrink: 0, cursor: "pointer" };
    return (
      <div style={{ fontFamily: "inherit" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {NURSING_DIAGNOSES.map(c => {
            const active =
              activeCategories.includes(c.id);

            return (
              <button
                key={c.id}
                onClick={() => toggleCategory(c.id)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "1.5px solid",
                  borderColor: active
                    ? "#1d4ed8"
                    : "#d1d5db",
                  background: active
                    ? "#1d4ed8"
                    : "#fff",
                  color: active
                    ? "#fff"
                    : "#374151",
                  transition: "all .15s"
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        {visibleCategories.map(cat => (
          <div style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 18px", marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Select Issue — {cat.label}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "8px 16px" }}>
              {cat.issues.map(iss => {
                const isSelected = selectedIssues.includes(iss.issue);
                return (
                  <label key={iss.issue} style={{ display: "flex", alignItems: "center", cursor: "pointer", padding: "7px 10px", borderRadius: 6, fontSize: 13, fontWeight: isSelected ? 600 : 400, background: isSelected ? "#eff6ff" : "transparent", border: "1px solid " + (isSelected ? "#93c5fd" : "transparent"), color: isSelected ? "#1d4ed8" : "#374151", transition: "all .12s" }}>
                    <input type="checkbox" checked={isSelected} onChange={() => toggleIssue(iss.issue)} style={cbIssueStyle} />
                    {iss.issue}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
        {selectedIssues.length > 0 && (
          <div style={{ marginBottom: 14, padding: "10px 14px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, fontSize: 12, color: "#065f46" }}>
            <b>{selectedIssues.length} issue{selectedIssues.length > 1 ? "s" : ""} selected:</b>{" "}
            {selectedIssues.join(" · ")}
            <span style={{ marginLeft: 8, color: "#6b7280" }}>— Go to Plan tab to select specific interventions</span>
          </div>
        )}
        {/* <div style={{ marginTop: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#4b5563", display: "block", marginBottom: 6 }}>Nursing Diagnosis (free text)</label>
          <textarea rows={3} value={values.assessment_nursing_diagnosis || ""} onChange={e => onChange("assessment_nursing_diagnosis", e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
        </div> */}
      </div>
    );
  }

  // ── Plan panel: intervention checkboxes + summary grouped by issue ──
function NursingPlanPanel({ values, onChange }) {
  const selectedIssues = values.nd_selected_issues || [];
  const selectedInterventions =
    values.nd_selected_interventions || {};

  // active issue
  const activeIssue =
    values.nd_plan_active_issue ||
    selectedIssues[0] ||
    null;

  const setActiveIssue = (issue) => {
    onChange("nd_plan_active_issue", issue);
  };

  // empty state
  if (selectedIssues.length === 0) {
    return (
      <div
        style={{
          padding: "14px 18px",
          background: "#f8fafc",
          borderRadius: 8,
          border: "1px dashed #d1d5db",
          color: "#9ca3af",
          fontSize: 13
        }}
      >
        No issues selected yet.
        Go to Assessment tab first to select.
      </div>
    );
  }

  // group selected issues by category
  const groupedIssues = NURSING_DIAGNOSES
    .map(category => ({
      category: category.label,
      issues: selectedIssues.filter(issue =>
        category.issues.some(
          i => i.issue === issue
        )
      )
    }))
    .filter(group => group.issues.length > 0);

  // active issue data
  let issueData = null;
  let activeCategory = null;

  for (const cat of NURSING_DIAGNOSES) {
    const found = cat.issues.find(
      i => i.issue === activeIssue
    );

    if (found) {
      issueData = found;
      activeCategory = cat;
      break;
    }
  }

  if (!issueData) return null;

  const selectedForIssue =
    selectedInterventions[activeIssue] || [];

  const allChecked =
    issueData.interventions.every(iv =>
      selectedForIssue.includes(iv)
    );

  const toggleIntervention = (
    issue,
    intervention
  ) => {
    const current =
      selectedInterventions[issue] || [];

    const next = current.includes(intervention)
      ? current.filter(iv => iv !== intervention)
      : [...current, intervention];

    onChange(
      "nd_selected_interventions",
      {
        ...selectedInterventions,
        [issue]: next
      }
    );
  };

  // category colors
  const getCategoryColor = (label) => {
    const lower = label.toLowerCase();

    if (lower.includes("cognitive"))
      return "#2563eb";

    if (lower.includes("bladder"))
      return "#059669";

    if (lower.includes("bowel"))
      return "#d97706";

    if (lower.includes("pain"))
      return "#dc2626";

    if (lower.includes("mobility"))
      return "#7c3aed";

    return "#0f766e";
  };

  const activeColor =
    getCategoryColor(
      activeCategory?.label || ""
    );

  return (
    <div style={{ fontFamily: "inherit" }}>

      {/* CATEGORY GROUPS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          marginBottom: 22
        }}
      >
        {groupedIssues.map(group => {
          const groupColor =
            getCategoryColor(group.category);

          return (
            <div key={group.category}>

              {/* CATEGORY TITLE */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: groupColor,
                  textTransform: "uppercase",
                  letterSpacing: ".6px",
                  marginBottom: 8
                }}
              >
                {group.category}
              </div>

              {/* ISSUE CHIPS */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8
                }}
              >
                {group.issues.map(issue => {
                  const active =
                    issue === activeIssue;

                  return (
                    <button
                      key={issue}
                      onClick={() =>
                        setActiveIssue(issue)
                      }
                      style={{
                        padding: "8px 14px",
                        borderRadius: 20,
                        border: "1px solid",
                        borderColor: active
                          ? groupColor
                          : "#d1d5db",
                        background: active
                          ? groupColor
                          : "#fff",
                        color: active
                          ? "#fff"
                          : "#374151",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all .15s"
                      }}
                    >
                      {issue}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE ISSUE PANEL */}
      <div
        style={{
          background: "#fff",
          border: `1.5px solid ${activeColor}`,
          borderRadius: 12,
          padding: "18px"
        }}
      >

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: 16
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: activeColor,
                textTransform: "uppercase",
                letterSpacing: ".5px",
                marginBottom: 4
              }}
            >
              {activeCategory?.label}
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#111827"
              }}
            >
              {activeIssue}
            </div>
          </div>

          {/* SELECT ALL */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: activeColor,
              cursor: "pointer"
            }}
          >
            <input
              type="checkbox"
              checked={allChecked}
              onChange={() => {
                const next = allChecked
                  ? []
                  : [
                      ...issueData.interventions
                    ];

                onChange(
                  "nd_selected_interventions",
                  {
                    ...selectedInterventions,
                    [activeIssue]: next
                  }
                );
              }}
              style={{
                accentColor: activeColor,
                width: 14,
                height: 14
              }}
            />

            Select all
          </label>
        </div>

        {/* INTERVENTIONS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 12
          }}
        >
          {issueData.interventions.map(
            (intervention, index) => {
              const checked =
                selectedForIssue.includes(
                  intervention
                );

              return (
                <label
                  key={index}
                  style={{
                    display: "flex",
                    alignItems:
                      "flex-start",
                    gap: 10,
                    cursor: "pointer",
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: checked
                      ? `1px solid ${activeColor}`
                      : "1px solid #e5e7eb",
                    background: checked
                      ? `${activeColor}10`
                      : "#fff",
                    transition:
                      "all .15s ease",
                    lineHeight: 1.5
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      toggleIntervention(
                        activeIssue,
                        intervention
                      )
                    }
                    style={{
                      marginTop: 2,
                      accentColor:
                        activeColor,
                      width: 15,
                      height: 15,
                      flexShrink: 0,
                      cursor: "pointer"
                    }}
                  />

                  <span
                    style={{
                      fontSize: 14,
                      color: "#374151",
                      fontWeight: checked
                        ? 600
                        : 400
                    }}
                  >
                    {intervention}
                  </span>
                </label>
              );
            }
          )}
        </div>

        {/* FOOTER */}
        <div
          style={{
            marginTop: 16,
            fontSize: 13,
            fontWeight: 600,
            color: activeColor
          }}
        >
          {selectedForIssue.length} of{" "}
          {issueData.interventions.length}
          {" "}selected
        </div>
      </div>
    </div>
  );
}
  const ASSESSMENT_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: [
          {
            name: "assessment_problem_summary",
            label: "Problem Summary",
            type: "textarea"
          },
          {
            type: "subheading",
            label: "Problem List — Nursing Diagnosis"
          },
          {
            type: "custom",
            name: "nursing_diagnosis_panel",
            render: ({ values, onChange }) => <NursingDiagnosisPanel values={values} onChange={onChange} />
          },
          {
            name: "assessment_problem_other",
            label: "Other problem (free text)",
            type: "input"
          },
          {
            type: "subheading",
            label: "Severity / Status"
          },
          {
            name: "assessment_severity",
            label: "Severity",
            type: "checkbox-group",
            options: [
              { label: "Mild", value: "mild" },
              { label: "Moderate", value: "moderate" },
              { label: "Severe", value: "severe" },
              { label: "Improving", value: "improving" },
              { label: "Stable", value: "stable" },
              { label: "Deteriorating", value: "deteriorating" }
            ]
          },
          {
            type: "subheading",
            label: "Functional Impact"
          },
          {
            name: "assessment_functional_impact",
            label: "",
            type: "checkbox-group",
            options: [
              { label: "Affects ambulation", value: "affects_ambulation" },
              { label: "Affects transfers", value: "affects_transfers" },
              { label: "Affects self-care", value: "affects_self_care" },
              { label: "Affects continence", value: "affects_continence" },
              { label: "Affects communication", value: "affects_communication" },
              { label: "Affects swallowing", value: "affects_swallowing" }
            ]
          },
          {
            name: "assessment_other_notes",
            label: "Others",
            type: "input"
          },
          {
            name: "assessment_risk_level",
            label: "Risk Level (related to falls, skin, aspiration, infection)",
            type: "radio",
            options: [
              { label: "Low", value: "low" },
              { label: "Moderate", value: "moderate" },
              { label: "High", value: "high" }
            ]
          },
          {
            name: "assessment_clinical_impression",
            label: "Nursing Diagnosis",
            type: "textarea"
          },
          {
            name: "assessment_rehab_interpretation",
            label: "Rehab-Specific Interpretation (participation tolerance, endurance, therapy readiness)",
            type: "textarea"
          }
        ]
      }
    ]
  };

  const PLAN_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: [
           { type: "subheading", label: "Short Term Goals (2–4 Weeks)" },
        { type: "dynamic-goals", name: "short_term_goals" },
        
        { type: "subheading", label: "Long Term Goals (6–12 Weeks)" },
        { type: "dynamic-goals", name: "long_term_goals" },
          {
            type: "subheading",
            label: "Nursing Diagnosis & Interventions Plan"
          },
          {
            type: "custom",
            name: "nursing_plan_panel",
            render: ({ values, onChange }) => <NursingPlanPanel values={values} onChange={onChange} />
          },
          {
            name: "plan_nursing_interventions",
            label: "Additional Nursing Interventions",
            type: "textarea"
          },
          {
            name: "plan_monitoring",
            label: "Monitoring Plan",
            type: "textarea"
          },
          {
            name: "plan_safety_measures",
            label: "Safety Measures / Precautions implemented",
            type: "textarea"
          },
          // {
          //   name: "plan_therapy_coordination",
          //   label: "Therapy Coordination (PT / OT / SLP involvement)",
          //   type: "textarea"
          // },
          // {
          //   name: "plan_patient_family_education",
          //   label: "Patient and family Education",
          //   type: "textarea"
          // },
          {
            name: "plan_reassessment_timeline",
            label: "Reassessment Timeline",
            type: "date"
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

//   const NURSING_PATIENT_INFO_SCHEMA = {
//     // title: "Patient Information",
//     sections: [
//       {
//         fields: [
//           { type: "row", fields: [
//             { name: "patient_name", label: "Name", type: "input", readOnly: true },
//             { name: "patient_ic", label: "IC", type: "input", readOnly: true },
//             { name: "patient_dob", label: "DOB", type: "input", readOnly: true },
//             { name: "patient_age_gender", label: "Age / Gender", type: "input", readOnly: true }
//           ]},
//           { type: "subheading", label: "Diagnosis" },
//           { type: "row", fields: [
//             { name: "primary_diagnosis", label: "Primary Diagnosis", type: "input", readOnly: true },
//             { name: "secondary_diagnosis", label: "Secondary Diagnosis", type: "input", readOnly: true }
//           ]},
//           { type: "subheading", label: "Allergies" },
//           { name: "allergy_drug", label: "Drug", type: "input" },
//           { name: "allergy_food", label: "Food", type: "input" },
//           { name: "allergy_environmental", label: "Environmental", type: "input" },
//           { type: "subheading", label: "General Information" },
//           { type: "row", fields: [
//             { name: "marital_status", label: "Marital Status", type: "input", readOnly: true },
//             { name: "employment_status", label: "Employment Status", type: "input", readOnly: true }
//           ]},
//           { type: "row", fields: [
//             { name: "occupation", label: "Occupation", type: "input", readOnly: true },
//             { name: "education_background", label: "Education Background", type: "input", readOnly: true }
//           ]},
//           { type: "row", fields: [
//             { name: "living_environment", label: "Living Environment", type: "input", readOnly: true },
//             { name: "main_caregiver", label: "Main Caregiver", type: "input", readOnly: true }
//           ]},
//           { type: "subheading", label: "Biological Status" },
//           { name: "biological_status", type: "checkbox-group", options: [
//             { label: "Comorbidities & Medical history", value: "comorbidities" },
//             { label: "Physical limitation", value: "physical_limitation" },
//             { label: "Chronic pain / sleep issue", value: "chronic_pain_sleep" }
//           ]},
//           { type: "subheading", label: "Psychological" },
//           { name: "psychological", type: "checkbox-group", options: [
//             { label: "Emotional status (anxiety, depression, coping)", value: "emotional_status" },
//             { label: "Cognitive Function", value: "cognitive_function" },
//             { label: "Stressor", value: "stressor" }
//           ]},
//           { type: "subheading", label: "Social" },
//           { name: "social", type: "checkbox-group", options: [
//             { label: "Family & Caregiver support", value: "family_caregiver" },
//             { label: "Financial / Insurance status", value: "financial_insurance" },
//             { label: "Language/communication barriers", value: "language_barriers" },
//             { label: "Cultural / religious considerations", value: "cultural_religious" }
//           ]},
//           { type: "row", fields: [
//             { name: "unit_ward", label: "Unit/Ward", type: "input" },
//             { name: "attending_physician", label: "Attending Physician", type: "checkbox-group", options: [
//               { label: "Dr. Liyana", value: "Dr.Liyana" },
//               { label: "Mr. Tan", value: "Mr.Tan" },
//               { label: "Dr. Hussain", value: "Dr.Hussain" },
//               { label: "Dr. Naz", value: "Dr.Naz" }
//             ]}
//           ]},
//           { type: "row", fields: [
//             { name: "date_of_admission", label: "Date of Admission", type: "date" },
//             { name: "reason_for_admission", label: "Reason for Admission", type: "input" }
//           ]}
//         ]
//       }
//     ]
//   };

  const nursingPatientInfoValues = {
    ...values,
    patient_name: patient?.name || "-",
    patient_ic: patient?.id || "-",
    patient_dob: localDateTimeString(patient?.dob),
    patient_age_gender: `${patient?.age ?? "-"} / ${patient?.sex || "-"}`,
    primary_diagnosis: patient?.icd || patient?.diagnosis_history || "-",
    secondary_diagnosis: patient?.secondary_diagnosis || "-",
    marital_status: patient?.marital_status || "-",
    employment_status: patient?.employment_status || "-",
    occupation: patient?.occupation || "-",
    education_background: (patient?.education_background === "Other" && patient?.education_background_other)
      ? patient.education_background_other
      : (patient?.education_background || "-"),
    living_environment: (patient?.living_environment === "Other" && patient?.living_environment_other)
      ? patient.living_environment_other
      : (patient?.living_environment || "-"),
    main_caregiver: patient?.main_caregiver || "-"
  };

    // const handleDoctorsReport = () => {
    //   alert("Report will be generating soon");
    // };

  /* ===================== RENDER ===================== */

  return (
    <PatientContext.Provider value={patient}>
      <div style={mainContent}>
        <CommonFormBuilder
          schema={{ title: "Re-Assessment", sections: [] }}
          values={{}}
          onChange={() => {}}
        >
          {/* <PatientInformationBlock
            patient={patient}
            patientHistory={patientHistory}
            setPatientHistory={setPatientHistory}
          />
        
          <button style={doctorsReportBtn}>
            Doctors Reports
          </button> */}
        </CommonFormBuilder>

        {/* ===== PATIENT INFORMATION CARD ===== */}
        <CommonFormBuilder
        //   schema={NURSING_PATIENT_INFO_SCHEMA}
          values={nursingPatientInfoValues}
          onChange={onChange}
        >
          {/* <div style={{ ...section, marginTop: 16 }}>
            <button style={doctorsReportBtn} onClick={handleDoctorsReport}>
              Doctors Reports
            </button>
          </div> */}
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
          assessmentRegistry={NURSING_REASSESSMENT_REGISTRY}
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


const textarea = {
          width: "100%",
          minHeight: 90,
          marginTop: 6,
          marginBottom: 12,
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid #d1d5db",
          fontSize: 14,
          resize: "vertical"
};
const alertBtn = {
  marginTop: 10,
          padding: "10px 20px",
          borderRadius: 6,
          border: "1.5px solid #007bff",
          background: "#007bff",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer"
};
