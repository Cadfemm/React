

import React, { useEffect, useState, createContext, useContext } from "react";
import { localDateTimeString, calculateDuration } from "../../../shared/utils/dateFormatter";

import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
// Import original assessment components
import DASSFormBuilder from "./DassForm";
import PSSFormBuilder from "./PssForm";
import PHQ9FormBuilder from "./PhqForm";
import GAD7FormBuilder from "./GadForm";
import HAMDFormBuilder from "./HamdForm";
import HAM_A_FormBuilder from "./HamaForm";
// import { localDateTimeString } from "../../../shared/utils/dateFormatter";
// import PsychologyFollowUpAssessment from "./PsychologyFollowupAssessment";
// import PatientCard from "../../../shared/cards/PatientCard";



// import PediatricPsychologyAssessment from "./PediatricPsychologyAssessment";
// import PsychologyProgress from "./PsychologyProgress";


// Create context to pass patient to assessment components
const PatientContext = createContext(null);



// Adapter components that bridge values/onChange to patient/onSubmit/onBack
function DASS21Adapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    // Store in parent values using namespace
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`dass21_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    // Close the assessment by clearing the active key
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <DASSFormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}


function PSSAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`pss_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <PSSFormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function PHQ9Adapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`phq9_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <PHQ9FormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function GAD7Adapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`gad7_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <GAD7FormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function HAMDAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`hamd_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <HAMDFormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function HAMAAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`hama_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <HAM_A_FormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

// Assessment Registry - using original components with adapters
export const PSYCHOLOGY_ASSESSMENT_REGISTRY = {
  dass21: DASS21Adapter,
  pss: PSSAdapter,
  phq9: PHQ9Adapter,
  gad7: GAD7Adapter,
  hamd: HAMDAdapter,
  hama: HAMAAdapter
};

/* ===================== OPTIONS ===================== */

const YES_NO = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];

/* ===================== COMPONENT ===================== */

export default function PsychologyAssessment({ patient, onSubmit, onBack,mode }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");
  const [formData, setFormData] = React.useState({
  doctor_note: "",
  medical_drug_history: ""
});
  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: "",
    past_family_history: "",
    alerts_and_allergies: ""
  });
  
  const storageKey = patient
    ? `psychology_assessment_draft_${patient.id}`
    : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setValues(JSON.parse(saved).values || {});
  }, [storageKey]);

  // useEffect(() => {
  //   if (!patient) return;
  //   setValues(v => ({
  //     ...v,
  //     psychiatric_history_autogenerated:
  //       patient.psychiatric_history || patient.medical_history || "No data available",
  //     family_medical_history_autogenerated:
  //       patient.family_history || patient.diagnosis_history || "No data available",
  //     drug_history_autogenerated:
  //       patient.medications || patient.drug_history || "No data available"
  //   }));
  // }, [patient]);

  useEffect(() => {
        if (!patient) return;
        setPatientHistory({
          past_medical_history: patient.medical_history || "",
          past_family_history: patient.family_medical_history || "",
          alerts_and_allergies: patient.alerts_and_allergies_history || ""
        });
      }, [patient]);
  useEffect(() => {
      if (!patient) return;
      setValues(v => ({
        ...v,
        psychiatric_history_autogenerated:
          patient.psychiatric_history || patient.medical_history || "No data available",
        medical_history_autogenerated:
          patient.medical_history || "No data available",
        family_history_autogenerated:
          patient.family_history || patient.family_medical_history || "No data available",
        drug_history_autogenerated:
          patient.medications?.join(", ") || patient.drug_history || "No data available"
      }));
    }, [patient]); 

  // useEffect(() => {
  //     if (!patient) return;
  //     setValues(v => ({
  //       ...v,
  //       psychiatric_history_autogenerated:
  //         patient.psychiatric_history || patient.medical_history || "No data available",
  //       medical_history_autogenerated:
  //         patient.medical_history || "No data available",
  //       family_history_autogenerated:
  //         patient.family_history || patient.family_medical_history || "No data available",
  //       drug_history_autogenerated:
  //         patient.medications?.join(", ") || patient.drug_history || "No data available"
  //     }));
  //   }, [patient]);


    useEffect(() => {
          if (!storageKey) return;
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            try {
              setValues(JSON.parse(saved).values || {});
            } catch {}
          }
        }, [storageKey]);

  

  // const onChange = (name, value) => {
  //   setValues(v => ({ ...v,  [name]: value }));
  // };
// const onChange = (name, value) => {
//   setValues(prev => {
//     let updatedValue = value;

//     // Apply "None" logic only for specific fields
//     if (
//       name === "perceptual_disturbance" ||
//       name === "thought_content_patient_reported"
//     ) {
//       if (Array.isArray(value)) {
//         // If "none" is selected → keep only "none"
//         if (value.includes("none")) {
//           updatedValue = ["none"];
//         } else {
//           // If other options selected → remove "none"
//           updatedValue = value.filter(v => v !== "none");
//         }
//       }
//     }

//     return {
//       ...prev,
//       [name]: updatedValue   // ✅ IMPORTANT: correct key assignment
//     };
//   });
// };
const onChange = (name, value) => {
  setValues(prev => {
    let updatedValue = value;

    if (Array.isArray(value)) {

      // ---- CASE 1: "None" logic ----
      if (
        name === "perceptual_disturbance" ||
        name === "thought_content_patient_reported"
      ) {
        if (value.includes("none")) {
          updatedValue = ["none"];
        } else {
          updatedValue = value.filter(v => v !== "none");
        }
      }

      // ---- CASE 2: "N/A" logic ----
      if (name === "cognition_orientation") {
        if (value.includes("na")) {
          updatedValue = ["na"];
        } else {
          updatedValue = value.filter(v => v !== "na");
        }
      }

      // ---- CASE 3: "No Risk" logic ----
      if (name === "risk_assessment") {
        if (value.includes("no_current_risk")) {
          updatedValue = ["no_current_risk"];
        } else {
          updatedValue = value.filter(v => v !== "no_current_risk");
        }
      }
    }

    return {
      ...prev,
      [name]: updatedValue
    };
  });
};

  const problemList = (values) => {
    var text = ''
    if(values.perceptual_disturbance){
      values.perceptual_disturbance.forEach(v => {
        text += v.charAt(0).toUpperCase() + v.slice(1).replaceAll('_', ' ') + '\n'
      })
    }
    if(values.thought_content_patient_reported){
      values.thought_content_patient_reported.forEach(v => {
        text += v.charAt(0).toUpperCase() + v.slice(1).replaceAll('_', ' ') + '\n'
      })
    }
    return text
  }

  const computedValues = {
    ...values,
    problem_listings: problemList(values) || ''
  }

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
      alert("Psychology draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Psychology assessment submitted");
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
        fields: [
          {
            name: "chief_complaint",
            label: "Chief Complaint",
            type: "input"
          },
          {
            name: "hpi",
            label: "History of Presenting Illness (HPI)",
            type: "input"
          },
          {
            type: "subheading",
            label: "Autogenerated History"
          },
          {
            name: "psychiatric_history_autogenerated",
            label: "Psychiatric History",
            type: "input",
          },
          // {
          //   name: "psychiatric_history_specify",
          //   label: "Specify",
          //   type: "input"
          // },
          // {
          //   name: "medical_history_autogenerated",
          //   label: "Medical History",
          //   type: "input",
          // },
          // {
          //   name: "family_history_autogenerated",
          //   label: "Family History",
          //   type: "input",
          // },
          {
            name: "drug_history_autogenerated",
            label: "Drug History",
            type: "input",
          },
          // {
          //   name: "drug_history_specify",
          //   label: "Specify",
          //   type: "input"
          // },
          {
            name: "mood_patient_description",
            label: "Mood (patient description)",
            type: "input",
            
          },
          {
            name: "perceptual_disturbance",
            label: "Perceptual Disturbance (if reported)",
            type: "checkbox-group",
            
            options: [
              { label: "Auditory hallucinations", value: "auditory_hallucinations" },
              { label: "Visual hallucinations", value: "visual_hallucinations" },
              { label: "Derealization", value: "derealization" },
              { label: "Depersonalization", value: "depersonalization" },
              { label: "Illusions", value: "illusions" },
              { label: "None", value: "none" },
              {label:'Others',value:'others'}
              
            ]
          },
          {
  name: "perceptual_disturbance_other",
  label: "Specify other perceptual disturbance",
  type: "input",
  showIf: { field: "perceptual_disturbance", includes: "others" } // ✅ must match value
},
          
          {
            name: "thought_content_patient_reported",
            label: "Thought content (patient-reported)",
            type: "checkbox-group",
            options: [
              { label: "Suicidal ideation", value: "suicidal_ideation" },
              { label: "Homicidal ideation", value: "homicidal_ideation" },
              { label: "Self-harm thoughts", value: "self_harm_thoughts" },
              { label: "Paranoia", value: "paranoia" },
              { label: "Obsessions/Compulsions", value: "obsessions_compulsions" },
              { label: "Phobias", value: "phobias" },
              { label: "Rumination", value: "rumination" },
              { label: "Overvalued ideas", value: "overvalued_ideas" },
              { label: "None", value: "none" },
              { label: "Other", value: "other" } 

            ]
          },
          {
  name: "thought_content_other",
  label: "Specify other thought content",
  type: "input",
  showIf: { field: "thought_content_patient_reported", includes: "other" } // ✅ show when selected
},
          
        ]
      }
    ]
  };

  const PSYCHOLOGY_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: [


    ]
  };

  
  const OBJECTIVE_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: [
          {
            type: "subheading",
            label: "Psychology Assessments’"
          },
          {
            name: "psychology_assessments",
            type: "assessment-launcher",
            options: [
              { label: "Depression Anxiety Stress Scale (DASS-21)", value: "dass21" },
              { label: "Perceived Stress Scale (PSS)", value: "pss" },
              { label: "Patient Health Questionnaire (PHQ-9)", value: "phq9" },
              { label: "Generalized Anxiety Disorder (GAD-7)", value: "gad7" },
              { label: "Hamilton Depression Rating Scale (HAM-D)", value: "hamd" },
              { label: "Hamilton Anxiety Rating Scale (HAM-A)", value: "hama" }
            ]
          },
          {
            type: "subheading",
            label: "Appearance & Behaviour"
          },
          {
            type: "subheading",
            label: "Appearance"
          },
          {
            name: "appearance_grooming",
            label: "Grooming",
            type: "radio",
            options: [
              { label: "Well-groomed", value: "well_groomed" },
              { label: "Adequate", value: "adequate" },
              { label: "Poor", value: "poor" },
              { label: "Not Applicable", value: "na" }
            ]
          },
          {
            name: "appearance_dress",
            label: "Dress",
            type: "radio",
            options: [
              { label: "Appropriate", value: "appropriate" },
              { label: "Inappropriate", value: "inappropriate" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "appearance_hygiene",
            label: "Hygiene",
            type: "radio",
            options: [
              { label: "Clean", value: "clean" },
              { label: "Poor", value: "poor" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "appearance_build_posture",
            label: "Build/Posture",
            type: "radio",
            options: [
              { label: "Thin", value: "thin" },
              { label: "Average", value: "average" },
              { label: "Overweight", value: "overweight" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "appearance_visible_marks",
            label: "Visible Marks",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: [
              { label: "Scars", value: "scars" },
              { label: "Bruises", value: "bruises" },
              { label: "Tattoos", value: "tattoos" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            type: "subheading",
            label: "Behaviour"
          },
          {
            name: "behavior_cooperation",
            label: "Cooperation",
            type: "radio",
            options: [
              { label: "Cooperative", value: "cooperative" },
              { label: "Guarded", value: "guarded" },
              { label: "Uncooperative", value: "uncooperative" },
              { label: "Hostile", value: "hostile" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "behavior_eye_contact",
            label: "Eye contact",
            type: "radio",
            options: [
              { label: "Good", value: "good" },
              { label: "Poor", value: "poor" },
              { label: "Avoidant", value: "avoidant" },
              { label: "Intense", value: "intense" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "behavior_psychomotor_activity",
            label: "Psychomotor activity",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Agitated", value: "agitated" },
              { label: "Retarded", value: "retarded" },
              { label: "Restless", value: "restless" }
            ]
          },
          {
            name: "behavior_impulse_control",
            label: "Impulse control",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Impaired", value: "impaired" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "behavior_attention",
            label: "Attention",
            type: "radio",
            options: [
              { label: "Alert", value: "alert" },
              { label: "Distracted", value: "distracted" },
              { label: "Focused", value: "focused" }
            ]
          },
          {
            name: "behavior_engagement_attitude",
            label: "Engagement/Attitude",
            type: "radio",
            options: [
              { label: "Open", value: "open" },
              { label: "Defensive", value: "defensive" },
              { label: "Withdrawn", value: "withdrawn" },
              { label: "Evasive", value: "evasive" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "behavior_affect_behavioral_state",
            label: "Affect/behavioral state",
            type: "radio",
            options: [
              { label: "Calm", value: "calm" },
              { label: "Anxious", value: "anxious" },
              { label: "Tearful", value: "tearful" },
              { label: "Agitated", value: "agitated" },
              { label: "Tense", value: "tense" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "behavior_activity_level",
            label: "Activity level",
            type: "radio",
            options: [
              { label: "Relaxed", value: "relaxed" },
              { label: "Restless", value: "restless" },
              { label: "Fidgety", value: "fidgety" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            type: "subheading",
            label: "Speech"
          },
          {
            name: "speech_rate",
            label: "Rate",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Rapid/Pressured", value: "rapid_pressured" },
              { label: "Slow", value: "slow" },
              { label: "Disorganized", value: "disorganized" },
              { label: "Poverty", value: "poverty" },
              { label: "Variable", value: "variable" },
              { label: "Mute", value: "mute" },
              { label: "Echolalia", value: "echolalia" }
            ]
          },
          {
            name: "speech_volume",
            label: "Volume",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Loud", value: "loud" },
              { label: "Soft", value: "soft" },
              { label: "Whispered", value: "whispered" }
            ]
          },
          {
            name: "speech_fluency",
            label: "Fluency",
            type: "radio",
            options: [
              { label: "Fluent/Coherent", value: "fluent_coherent" },
              { label: "Hesitant", value: "hesitant" },
              { label: "Slurred", value: "slurred" },
              { label: "Dysarthric", value: "dysarthric" },
              { label: "Stammering", value: "stammering" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "speech_quantity",
            label: "Quantity",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Talkative", value: "talkative" },
              { label: "Poverty of speech", value: "poverty_of_speech" },
              { label: "Spontaneous expansive", value: "spontaneous_expansive" }
            ]
          },
          {
            name: "speech_tone_prosody",
            label: "Tone/Prosody",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Dull", value: "dull" },
              { label: "Monotonous/Flat", value: "monotonous_flat" },
              { label: "Flat", value: "flat" },
              { label: "Loud", value: "loud" },
              { label: "Whispered", value: "whispered" }
            ]
          },
          {
            type: "subheading",
            label: "Mood & Affect"
          },
          {
            name: "mood_observed",
            label: "Mood",
            type: "input"
          },
          {
            name: "affect_observed",
            label: "Affect",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: [
              { label: "Euthymic", value: "euthymic" },
              { label: "Constricted", value: "constricted" },
              { label: "Flat", value: "flat" },
              { label: "Blunted", value: "blunted" },
              { label: "Labile", value: "labile" },
              { label: "Congruent", value: "congruent" },
              { label: "Incongruent", value: "incongruent" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            type: "subheading",
            label: "Thought"
          },
          {
            name: "thought_form_process",
            label: "Form/Process",
            type: "checkbox-group",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Loose associations", value: "loose_associations" },
              { label: "Clang associations", value: "clang_associations" },
              { label: "Tangential", value: "tangential" },
              { label: "Circumstantial", value: "circumstantial" },
              { label: "Flight of ideas", value: "flight_of_ideas" },
              { label: "Word salad", value: "word_salad" },
              { label: "Poverty of thought", value: "poverty_of_thought" },
              { label: "Pressure of thought", value: "pressure_of_thought" },
              { label: "Thought blocking", value: "thought_blocking" },
              { label: "Spontaneous", value: "spontaneous" }
            ]
          },
          {
            name: "thought_content_observed",
            label: "Content (observed/reported)",
            type: "checkbox-group",
            options: [
              { label: "Delusions (Grandiose, Erotomanic, Somatic, Referential, Persecutory, Control, Religious)", value: "delusions" },
              { label: "Hallucinations", value: "hallucinations" },
              { label: "Illusions", value: "illusions" },
              { label: "Suicidal/Homicidal ideation", value: "suicidal_homicidal_ideation" },
              { label: "Paranoia", value: "paranoia" },
              { label: "Obsessions", value: "obsessions" },
              { label: "Compulsions", value: "compulsions" },
              { label: "Thought insertion", value: "thought_insertion" },
              { label: "Thought broadcasting", value: "thought_broadcasting" },
              { label: "Thought withdrawal", value: "thought_withdrawal" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            type: "subheading",
            label: "Cognition"
          },
          {
            name: "cognition_orientation",
            label: "Orientation",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: [
              { label: "Person", value: "person" },
              { label: "Place", value: "place" },
              { label: "Time", value: "time" },
              { label: "Situation", value: "situation" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "cognition_attention_concentration",
            label: "Attention/Concentration",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Mildly impaired", value: "mildly_impaired" },
              { label: "Severely impaired", value: "severely_impaired" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "cognition_memory_immediate",
            label: "Memory",
            type: "radio",
            options: [
              { label: "Immediate", value: "immediate" },
              { label: "Intact", value: "intact" },
              { label: "Impaired", value: "impaired" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "cognition_memory_recent",
            label: "Recent",
            type: "radio-matrix",
            matrixHeaderLabel: "Category",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Impaired", value: "impaired" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "cognition_memory_remote",
            label: "Remote",
            type: "radio-matrix",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Impaired", value: "impaired" },
              { label: "N/A", value: "na" }
            ]
          },
          {
            name: "cognition_abstract_thinking",
            label: "Abstract thinking",
            type: "radio-matrix",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Impaired", value: "impaired" },
              { label: "N/A", value: "na" }
            ]
          },
//           {
//   type: "subheading",
//   label: "Additional Comments"
// },
{
  name: "additional_comments",
  label: "Additional comments",
  type: "input",
  placeholder: "Enter any overall observations, notes, or summary..."
},
        ]
      }
    ]
  };

  const ASSESSMENT_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: [
          
          {
            name: "diagnosis_icd10",
            label: "Clinical Impression",
            type: "input"
          },
          {
            name: "problem_listings",
            label: "Problem Listings",
            type: "input"
          },
          // {
          //   name: "severity",
          //   label: "Severity",
          //   type: "radio",
          //   options: [
          //     { label: "Mild", value: "mild" },
          //     { label: "Moderate", value: "moderate" },
          //     { label: "Severe", value: "severe" }
          //   ]
          // },
          {
            name: "risk_assessment",
            label: "Behavioural Risk Assessment",
            type: "multi-select-dropdown",
            options: [
              { label: "No current risk", value: "no_current_risk" },
              { label: "Suicidal ideation", value: "suicidal_ideation" },
              { label: "Homicidal ideation", value: "homicidal_ideation" },
              { label: "Self-harm risk", value: "self_harm_risk" },
              { label: "Risk to others", value: "risk_to_others" }
            ]
          },
          {
            name: "protective_factors",
            label: "Protective factors",
            type: "input"
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
          //   {
          //   name: "Short term goal",
          //   label: "Short term goal",
          //   type: "input"
          // },
          //   {
          //   name: "Long term goal",
          //   label: "Long term goal",
          //   type: "input"
          // },
           { type: "subheading", label: "Short-Term Goals (2–4 weeks)" },
        {
            type: "dynamic-goals",
            name: "short_term_goals"
          },
          { type: "subheading", label: "Long-Term Goals (6–12 weeks)" },
          {
            type: "dynamic-goals",
            name: "long_term_goals"
          },
          
          {
            name: "follow_up_visit_scheduled",
            label: "Follow-up visit scheduled",
            type: "date"
          },
          {type:'input',label:'Additional Comments',name:'additional_comments'}
          // {
          //   name: "psychiatric_referral",
          //   label: "Psychiatric referral",
          //   type: "radio",
          //   options: [
          //     { label: "Yes", value: "yes" },
          //     { label: "No", value: "no" }
          //   ]
          // },
          // {
          //   name: "psychiatric_referral_specify",
          //   label: "Specify",
          //   type: "input",
          //   placeholder: "Specify",
          //   showIf: { field: "psychiatric_referral", equals: "yes" }
          // },
          // {
          //   name: "plan_specify",
          //   label: "Specify",
          //   type: "input",
          //   placeholder: "Specify"
          // }
        ]
      }
    ]
  };
  const tabOrder = ["subjective", "objective", "assessment", "plan"];
  const activeTabIdx = tabOrder.indexOf(activeTab);

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  const numAge = Number(patient?.age || 0);

  /* ===================== PATIENT INFO ===================== */
  // function PsychologyPatientInfo({ patient }) {
  //   if (!patient) return null;

  //   return (
  //     <div style={section}>
  //       <div style={patientGrid}>
  //         <div><b>Name:</b> {patient.name}</div>
  //         <div><b>IC:</b> {patient.id}</div>
  //         <div><b>DOB:</b> {
  // (patient.dob)}</div>
  //         <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
  //         <div><b>ICD:</b> {patient.icd}</div>
  //         <div><b>Accommodation:</b> {patient.accommodation || "-"}</div>
  //         <div><b>Occupation:</b> {patient.occupation || "-"}</div>
  //         <div><b>Case Manager:</b> {patient.case_manager || patient.cm || "-"}</div>
  //         <div><b>Date of Assessment:</b> {localDateTimeString('', true)}</div>
  //       </div>
  //     </div>
  //   );
  // }
//   function PsychologyPatientInfo({
//   patient,
//   formData = {},          // ✅ default to avoid undefined
//   setFormData = () => {}  // ✅ safe default function
// }) {
//   if (!patient) return null;

//   const handleDoctorNoteChange = (e) => {
//     const value = e.target.value;

//     setFormData((prev = {}) => ({
//       ...prev,
//       doctor_note: value,
//       medical_drug_history: value // ✅ auto-generate
//     }));
//   };

//   return (
//     <div style={section}>
      
//       {/* ---------------- PATIENT INFO ---------------- */}
//       <div style={patientGrid}>
//         <div><b>Name:</b> {patient?.name}</div>
//         <div><b>IC:</b> {patient?.id}</div>
//         <div><b>DOB:</b> {localDateTimeString(patient?.dob)}</div>
//         <div><b>Age / Gender:</b> {patient?.age} / {patient?.sex}</div>
//         <div><b>ICD:</b> {patient?.icd}</div>
//         <div><b>Accommodation:</b> {patient?.accommodation || "-"}</div>
//         <div><b>Occupation:</b> {patient?.occupation || "-"}</div>
//         <div>
//           <b>Case Manager:</b>{" "}
//           {patient?.case_manager || patient?.cm || "-"}
//         </div>
//         <div>
//           <b>Date of Assessment:</b> {localDateTimeString("", true)}
//         </div>
//       </div>

//       {/* ---------------- DOCTOR NOTE ---------------- */}
//       <div style={{ marginTop: "20px" }}>
//         <b>Doctor's Note</b>
//         <input
//           value={formData?.doctor_note || ""}
//           onChange={handleDoctorNoteChange}
//           placeholder="Enter clinical notes..."
//           // style={{ width: "100%", minHeight: "100px" }}
//         />
//       </div>

//       {/* ---------------- AUTO GENERATED HISTORY ---------------- */}
//       <div style={{ marginTop: "20px" }}>
//         <b>Medical / Drug History</b>
//         <input
//           value={formData?.medical_drug_history || ""}
//           readOnly
//           placeholder="Auto-generated from doctor's note..."
//           // style={{
//           //   width: "100%",
//           //   minHeight: "100px",
//           //   background: "#f5f5f5"
//           // }}
//         />
//       </div>

//       {/* ❌ No free text below history (removed as required) */}

//     </div>
//   );
// }

const today = new Date();

const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "-");

// const PsychologyPatientInfo = ({ patient, patientHistory, setPatientHistory }) => {
//     if (!patient) return null;
//     return (
//       <div style={section}>
//         <div style={patientGrid}>
//           <div><b>Name:</b> {patient.name}</div>
//           <div><b>IC:</b> {patient.id}</div>
//           <div><b>DOB:</b> {formatDate(patient.dob)}</div>
//           <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
//           <div><b>ICD:</b> {patient.icd}</div>
//           <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
//           <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
//           <div><b>Duration of Diagnosis:</b> {calculateDuration(patient.date_of_onset)}</div>
//           <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
//           <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
//           <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
//           <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
//           <div><b>Education Level:</b> {patient.education_background || "-"}</div>
//           <div><b>Occupation:</b> {patient.occupation || "-"}</div>
//           <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
//           <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
//           <div><b>Marital Status:</b> {patient.marital_status || patient.marital || "-"}</div>

//           <div style={{ gridColumn: "1 / -1", marginTop: 8 }}>
//             <div style={{ fontWeight: 800, marginBottom: 8 }}>Patient History</div>

//             <div style={{ marginBottom: 10 }}>
//               <div style={{ fontWeight: 600, marginBottom: 6 }}>Past Medical History</div>
//               <input
//                 value={patientHistory?.past_medical_history ?? ""}
//                 onChange={(e) => setPatientHistory((prev) => ({ ...prev, past_medical_history: e.target.value }))}
//                 style={{ width: "100%", minHeight: 90, padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, fontFamily: "inherit", resize: "vertical" }}
//               />
//             </div>

//             <div style={{ marginBottom: 10 }}>
//               <div style={{ fontWeight: 600, marginBottom: 6 }}>Family History</div>
//               <input
//                 value={patientHistory?.past_family_history ?? ""}
//                 onChange={(e) => setPatientHistory((prev) => ({ ...prev, past_family_history: e.target.value }))}
//                 style={{ width: "100%", minHeight: 90, padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, fontFamily: "inherit", resize: "vertical" }}
//               />
//             </div>

//             <div style={{ marginBottom: 10 }}>
//               <div style={{ fontWeight: 600, marginBottom: 6 }}>Allergies</div>
//               <input
//                 value={patientHistory?.alerts_and_allergies ?? ""}
//                 onChange={(e) => setPatientHistory((prev) => ({ ...prev, alerts_and_allergies: e.target.value }))}
//                 style={{ width: "100%", minHeight: 90, padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, fontFamily: "inherit", resize: "vertical" }}
//               />
//             </div>

//             <div style={{ marginBottom: 10 }}>
//               <button
//                 type="button"
//                 onClick={() => { console.log("Alerts button clicked!"); }}
//                 style={{ marginTop: "10px", padding: "10px 20px", borderRadius: 6, border: "1.5px solid rgb(0, 123, 255)", background: "rgb(0, 123, 255)", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}
//               >
//                 🚨 Alerts
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
  if (!patient) return null;

  const safe = (v) => v ?? "-";
  const formatDate = (d) => d ? new Date(d).toLocaleDateString() : "-";

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
        fontSize: 14
      }}>
        <div><b>Name:</b> {safe(patient.name)}</div>
        <div><b>IC:</b> {safe(patient.id)}</div>
        <div><b>DOB:</b> {formatDate(patient.dob)}</div>

        <div><b>Age / Gender:</b> {safe(patient.age)} / {safe(patient.sex)}</div>
        <div><b>ICD:</b> {safe(patient.icd)}</div>
        <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>

        <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
        <div><b>Duration of Diagnosis:</b> -</div>
        <div><b>Primary Diagnosis:</b> {safe(patient.diagnosis_history)}</div>

        <div><b>Secondary Diagnosis:</b> {safe(patient.medical_history)}</div>
        <div><b>Dominant Side:</b> {safe(patient.dominant_side)}</div>
        <div><b>Language Preference:</b> {safe(patient.language_preference)}</div>

        <div><b>Education Level:</b> {safe(patient.education_background)}</div>
        <div><b>Occupation:</b> {safe(patient.occupation)}</div>
        <div><b>Work Status:</b> {safe(patient.employment_status)}</div>

        <div><b>Driving Status:</b> {safe(patient.driving_status)}</div>
        <div><b>PP/OB:</b> {safe(patient.pp_ob)}</div>
        <div><b>Weight:</b> {patient.weight ? `${patient.weight} kg` : "-"}</div>

        {/* ===== HISTORY ===== */}
        <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
        
           <h3>Patient History</h3>
        
                  <div>
                    <b>Past Medical History</b>
                    <input
                      style={input}
                      value={patientHistory.past_medical_history}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          past_medical_history: e.target.value
                        }))
                      }
                    />
                  </div>

          
          <div>
                    <b>Family History</b>
                    <input
                      style={input}
                      value={patientHistory.past_family_history}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          past_family_history: e.target.value
                        }))
                      }
                    />
                  </div>

        
           <div>
                    <b>Allergies</b>
                    <input
                      style={input}
                      value={patientHistory.alerts_and_allergies}
                      onChange={(e) =>
                        setPatientHistory(prev => ({
                          ...prev,
                          alerts_and_allergies: e.target.value
                        }))
                      }
                    />
                  </div>

          <button style={alertBtn}>🚨 Alerts</button>
        </div>
      </div>
    </div>
  );
}
 


// const INFORMANT_SCHEMA = {
//     title: "",
//     sections: [
//       {
//         fields: [
//           {
//             name: "informant",
//             label: "Informant",
//             type: "radio",
//             options: [
//               { label: "Mother",    value: "mother"    },
//               { label: "Father",    value: "father"    },
//               { label: "Caregiver", value: "caregiver" },
//               { label: "Teacher",   value: "teacher"   },
//               { label: "Other",     value: "other"     }
//             ]
//           },
//           {
//             name: "informant_other",
//             label: "Specify Other",
//             type: "input",
//             placeholder: "Enter informant",
//             showIf: { field: "informant", equals: "other" }
//           },
//           {
//             name: "reliability",
//             label: "Reliability of informant",
//             type: "radio",
//             options: [
//               { label: "Good", value: "Good" },
//               { label: "Fair", value: "Fair" },
//               { label: "Poor", value: "Poor" }
//             ]
//           },
//           {
//             name: "discrepancy",
//             label: "Discrepancy noted",
//             type: "input",
//             placeholder: "Enter details"
//           }
//         ]
//       }
//     ]
//   };



  /* ===================== RENDER ===================== */

  return (
    <PatientContext.Provider value={patient}>
      <div style={mainContent}>
        {/* ===== PATIENT INFORMATION CARD ===== */}
        {/* <CommonFormBuilder
          schema={PSYCHOLOGY_CONTAINER_SCHEMA}
          values={{}}
          onChange={() => {}}
        >
          <PsychologyPatientInfo patient={patient} />
        </CommonFormBuilder> */}
         <CommonFormBuilder
          schema={{ title: "Patient Information", sections: [] }}
          values={{}}
          onChange={() => {}}
        >
          <PatientInformationBlock
            patient={patient}
            patientHistory={patientHistory}
            setPatientHistory={setPatientHistory}
          />
        
          <button style={doctorsReportBtn}>
            Doctors Reports
          </button>
        </CommonFormBuilder>
         {/* <CommonFormBuilder
                    schema={INFORMANT_SCHEMA}
                    values={values}
                    onChange={onChange}
                  /> */}

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
          values={computedValues}
          onChange={onChange}
          submitted={submitted}
          onAction={handleAction}
          assessmentRegistry={PSYCHOLOGY_ASSESSMENT_REGISTRY}
        >
          
          {/* Submit button */}
          {/* <div style={submitRow}>
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Psychology Assessment
            </button>
          </div> */}
          <div style={submitRow}>
            {activeTab !== "plan" ? (
              <button style={submitBtn} onClick={() => setActiveTab(tabOrder[activeTabIdx + 1])}>
                Next
              </button>
            ) : (
              <button style={submitBtn} onClick={handleSubmit}>
                Submit Psychology Assessment
              </button>
            )}
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


const input = {
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
const doctorsReportBtn = {
  padding: "10px 20px", background: "#2563EB", color: "#fff",
  border: "none", borderRadius: 6, fontSize: 14,
  fontWeight: 600, cursor: "pointer", marginTop: 8
};