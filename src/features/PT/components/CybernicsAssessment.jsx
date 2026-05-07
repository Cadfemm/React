import TUG from "./TUGForm";
import MMTForm from "./MMTForm";
import ROMForm from "./ROMForm";
import MASForm from "./MASForm";
import WSTForm from "./WSTForm";
import MFRTForm from "./MFRTForm";
import BergBalanceScale from "./BBS";
import WISCIForm from "./WISCIForm"
import SixMWTForm from "./SixMWTForm";
import SixMWPTForm from "./SixMWPTForm";
import { useState, useEffect } from "react";
import TenMWTForm from "./TenMWTForm";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PatientCard from "../../../shared/cards/PatientCard";
import FMALEForm from "./FMALEForm";
// import BoxAndBlockTest from "./BoxBlockTest";
import SARAForm from "./SARAForm";
// import MoCAAssessment from "./MocA";
import BoxAndBlockTest from "../../OT/components/BoxBlockTest";
import MoCAAssessment from "../../OT/components/MocA";
// import FIMAssessment from "./Fim";
import FIMAssessment from "../../OT/components/Fim";
import SCIMForm from "../../PT/components/SCIMForm";
import FACForm from "./FunctionalAmbulationCategory"










const SPINAL_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

// const CONSENT_AND_REFERRAL_SCHEMA = {
//   title: "",
//   sections: [
//     {
//       fields: [
//         {
//           type: "row",
//           fields: [
//             {
//               name: "consent_obtained",
//               type: "checkbox-group",
//               options: [{ label: "Consent obtained", value: "yes" }]
//             },
//             {
//               name: "consent_upload",
//               label: "Upload",
//               type: "file-upload",
//               showIf: { field: "consent_obtained", includes: "yes" }
//             }
//           ]
//         },
//         {
//           name: "hep_reviewed",
//           type: "checkbox-group",
//           options: [{ label: "Home Exercise Program (HEP) reviewed and demonstrated", value: "yes" }]
//         },
//         {
//           name: "current_diagnosis",
//           label: "Current Diagnosis",
//           type: "multi-select-dropdown",
//           options: [
//             { label: "Stroke", value: "stroke" },
//             { label: "Traumatic Brain Injury", value: "tbi" },
//             { label: "Parkinson Disease", value: "parkinson" },
//             { label: "Spinal Cord Injury", value: "sci" },
//             { label: "Peripheral Neuropathy", value: "peripheral_neuropathy" },
//             { label: "Ligament injuries", value: "ligament_injuries" },
//             { label: "Ataxia", value: "ataxia" },
//             { label: "Others", value: "others" }
//           ]
//         },
//         {
//           name: "current_diagnosis_other",
//           label: "Other Diagnosis (specify)",
//           type: "textarea",
//           showIf: { field: "current_diagnosis", includes: "others" }
//         },
//         {
//           name: "equipment_owned",
//           label: "List of Equipment Owned",
//           type: "checkbox-group",
//           options: [
//             { label: "PERKESO", value: "perkeso" },
//             { label: "NGO", value: "ngo" },
//             { label: "Self-purchased", value: "self" },
//             { label: "Others", value: "others" }
//           ]
//         },
//         {
//           name: "equipment_perkeso",
//           label: "PERKESO Equipment Details",
//           type: "textarea",
//           showIf: { field: "equipment_owned", includes: "perkeso" }
//         },
//         {
//           name: "equipment_ngo",
//           label: "NGO Equipment Details",
//           type: "textarea",
//           showIf: { field: "equipment_owned", includes: "ngo" }
//         },
//         {
//           name: "equipment_self",
//           label: "Self-purchased Equipment Details",
//           type: "textarea",
//           showIf: { field: "equipment_owned", includes: "self" }
//         },
//         {
//           name: "equipment_others",
//           label: "Other Equipment Details",
//           type: "textarea",
//           showIf: { field: "equipment_owned", includes: "others" }
//         }
//         ,
//         { type: "subheading", label: "Referral Information" },
//         {
//           name: "referred_by",
//           label: "Referred by",
//           type: "input",
//           readOnly: true
//         },
//         {
//           name: "referral_reasons",
//           label: "Referral Reasons",
//           type: "textarea",
//           readOnly: true
//         }
//       ]
//     }
//   ]
// };

const SUBJECTIVE_SCHEMA = {
    actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
    fields: [
      {
        name: "chief_complaint",
        label: "Chief Complaint",
        type: "input"
      },
      {
        name: "hopi",
        label: "History of Presenting Illness",
        type: "input"
      },
     {
          type: "subheading",
          label: "Patient Goals"
        },
      {
        name: "short_term_goals",
        label: "Short Term Goals",
        type: "input"
      },
      {
        name: "long_term_goals",
        label: "Long Term Goals",
        type: "input"
      },
      // {
      //   name: "bowel",
      //   label: "Bowel",
      //   type: "radio",
      //   options: [
      //     { label: "Continence", value: "continence" },
      //     { label: "Incontinence", value: "incontinence" }
      //   ]
      // },
      // {
      //   name: "bladder",
      //   label: "Bladder",
      //   type: "radio",
      //   options: [
      //     { label: "Continence", value: "continence" },
      //     { label: "Incontinence", value: "incontinence" }
      //   ]
      // },
      
    ]
}

const OBJECTIVE_SCHEMA = {
  title: "OBJECTIVE",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
       
          { type: "subheading", label: "Functional & Mobility Status" },

        {
          name: "hand_dominance",
          label: "Hand Dominance",
          type: "radio",
          options: [
            { label: "Right", value: "right" },
            { label: "Left", value: "left" }
          ]
        },

        {
          name: "affected_region",
          label: "Affected Side / Region",
          type: "checkbox-group",
          options: [
            { label: "Left Upper Limb", value: "left_upper_limb" },
            { label: "Right Upper Limb", value: "right_upper_limb" },
            { label: "Left Lower Limb", value: "left_lower_limb" },
            { label: "Right Lower Limb", value: "right_lower_limb" },
            { label: "Others", value: "other" }
          ]
        },

        {
          name: "affected_other",
          label: "Specify Other",
          type: "input",
          placeholder: "Enter other affected region...",
          showIf: { field: "affected_region", includes: "other" }
        },
         { type: "subheading", label: "Ambulatory Status" },

        // Short Distance
        {
          name: "short_distance_mobility",
          label: "Short Distance Mobility",
          type: "checkbox-group",
          options: [
            { label: "Independent ambulation", value: "independent" },
            { label: "Wheelchair-dependent", value: "wheelchair" },
            { label: "Quadripod (narrow base)", value: "quad_narrow" },
            { label: "Quadripod (wide base)", value: "quad_wide" },
            { label: "Walking stick", value: "walking_stick" },
            { label: "Walking frame", value: "walking_frame" },
            { label: "Elbow crutches", value: "elbow_crutches" },
            { label: "Others", value: "other" }
          ]
        },

        {
          name: "short_distance_other",
          label: "Specify Other (Short Distance)",
          type: "input",
          placeholder: "Enter details...",
          showIf: { field: "short_distance_mobility", includes: "other" }
        },

        // Long Distance
        {
          name: "long_distance_mobility",
          label: "Long Distance Mobility",
          type: "checkbox-group",
          options: [
            { label: "Independent ambulation", value: "independent" },
            { label: "Wheelchair-dependent", value: "wheelchair" },
            { label: "Quadripod (narrow base)", value: "quad_narrow" },
            { label: "Quadripod (wide base)", value: "quad_wide" },
            { label: "Walking stick", value: "walking_stick" },
            { label: "Walking frame", value: "walking_frame" },
            { label: "Elbow crutches", value: "elbow_crutches" },
            { label: "Others", value: "other" }
          ]
        },

        {
          name: "long_distance_other",
          label: "Specify Other (Long Distance)",
          type: "input",
          placeholder: "Enter details...",
          showIf: { field: "long_distance_mobility", includes: "other" }
        },
        {
          type: "subheading",
          label: "Outcome Measures"
        },
        {
          name: "neuro_scales",
          type: "assessment-launcher",
          options: [
            { label: "Range of Motion (ROM)", value: "rom" },
            { label: "Manual Muscle Test (MMT)", value: "mmt" },
            { label: "Muscle Tone (MAS)", value: "mas" },
            { label: "Muscle Girth", value: "Girth" },
            { label: "Functional Ambulation Category (FAC)", value: "fac" },
            { label: "Functional Independence Measure (FIM)", value: "FIM" },
        { label: "Fugl Meyer Assessment – Lower Extremity (FMA-LE)", value: "fma_le" },
            { label: "Scale for the Assessment and Rating of Ataxia (SARA)", value: "sara" },
            { label: "Berg Balance Scale (BBS)", value: "bbs" },
            { label: "Tinetti Performance-Oriented Mobility Assessment", value: "tinetti" },
            { label: "10 Meter Walk Test (10MWT)", value: "tenmwt" },
            { label: "Timed Up and Go (TUG)", value: "tug" },
            { label: "6 Minutes Walk Test (6MWT)", value: "sixmwt" },
            { label: "Box & Block", value: "bbt" },
            { label: "9-Hole Peg Test", value: "9-hole" },
            { label: "Montreal Cognitive Assessment (MoCA)", value: "moca" },
            { label: "Function in Sitting Test (FIST)", value: "FIST" },
            { label: "Walking Index for Spinal Cord Injury II (WISCI II)", value: "wisci" },
            { label: "Spinal Cord Independence Measure (SCIM)", value: "scim" },
          ]
        },
//         {
//   name: "neuro_scales",
//   type: "assessment-launcher",
//   options: [
//     { label: "Range of Motion (ROM)", value: "rom" },
//     { label: "Manual Muscle Test (MMT)", value: "mmt" },
//     { label: "Muscle Tone (MAS)", value: "mas" },
//     { label: "Muscle Girth", value: "girth" },

//     { label: "Functional Ambulation Category (FAC)", value: "fac" },
//     { label: "Functional Independence Measure (FIM)", value: "fim" },

//     { label: "Fugl-Meyer Assessment – Lower Extremity (FMA-LE)", value: "fma_le" },
//     { label: "Scale for the Assessment and Rating of Ataxia (SARA)", value: "sara" },

//     { label: "Berg Balance Scale (BBS)", value: "bbs" },
//     { label: "Tinetti Performance-Oriented Mobility Assessment", value: "tinetti" },

//     { label: "10 Meter Walk Test (10MWT)", value: "tenmwt" },
//     { label: "Timed Up and Go (TUG)", value: "tug" },
//     { label: "6 Minute Walk Test (6MWT)", value: "sixmwt" },

//     { label: "Box and Block Test", value: "bbt" },
//     { label: "9-Hole Peg Test", value: "nine_hole_peg" },

//     { label: "Montreal Cognitive Assessment (MoCA)", value: "moca" },
//     { label: "Function in Sitting Test (FIST)", value: "fist" },

//     { label: "Walking Index for Spinal Cord Injury II (WISCI II)", value: "wisci_ii" },
//     { label: "Spinal Cord Independence Measure (SCIM)", value: "scim" }
//   ]
// },
         {
          type: "subheading",
          label: "Neurorobotic Rehabilitation & Neuromodulation Modalities Assessment"
        },

        {
          name: "cyberdyne_hal",
          label: "Cyberdyne (HAL) Assessment",
          type: "attach-file",
          helperText:
            "Upload: Trend report, HAL communication sheet, voluntary drive detection, gait symmetry, assist level, EMG response"
        },

        {
          name: "luna_emg",
          label: "LUNA EMG Analysis",
          type: "attach-file"
        },

        {
          name: "tymo_balance",
          label: "TYMO Balance System",
          type: "textarea",
          placeholder: "Enter assessment findings..."
        },

        {
          name: "pablo_system",
          label: "PABLO System (Upper Limb / Gait)",
          type: "textarea",
          placeholder: "Enter assessment findings..."
        },

        {
          name: "pelma_motus",
          label: "Pelma Motus Balance Assessment",
          type: "textarea",
          placeholder: "Enter assessment findings..."
        },

        {
          name: "vicon_motion",
          label: "Vicon Motion Analysis",
          type: "attach-file"
        },

      ]
    }
  ]
};

const ASSESSMENT_SCHEMA = {
  title: "ASSESSMENT",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
       

        {
          name: "problem_list",
          label: "Problem List",
          type: "checkbox-group",
          options: [
            { label: "Reduced muscle strength", value: "muscle_strength" },
            { label: "Reduced muscular endurance", value: "muscular_endurance" },
            { label: "Reduced cardiovascular endurance", value: "cardio_endurance" },
            { label: "Limited range of motion (ROM)", value: "rom" },
            { label: "Impaired sitting balance", value: "sitting_balance" },
            { label: "Impaired standing balance", value: "standing_balance" },
            { label: "Poor trunk control", value: "trunk_control" },
            { label: "Impaired gait / non-ambulatory", value: "gait_impairment" },
            { label: "Reduced gait endurance", value: "gait_endurance" },
            { label: "Impaired wheelchair mobility skills", value: "wheelchair_skills" },
            { label: "Reduced wheelchair endurance", value: "wheelchair_endurance" },
            { label: "Others", value: "other" }
          ]
        },

        {
          name: "problem_list_other",
          label: "Specify Other",
          type: "input",
          placeholder: "Enter other problems...",
          showIf: { field: "problem_list", includes: "other" }
        },

       

        {
          name: "clinical_impression",
          label: "Clinical Impression",
          type: "textarea",
          placeholder: "Enter clinical findings and summary..."
        },

        

        {
          name: "rehab_prognosis",
          label: "Rehabilitation Prognosis",
          type: "radio",
          options: [
            { label: "Excellent", value: "excellent" },
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" }
          ]
        }
      ]
    }
  ]
};

const PLAN_SCHEMA = {
  title: "",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
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
      
       

        { type: "subheading", label: "Interventions" },

        
        {
          name: "treatment_frequency",
          label: "Frequency & Duration",
          type: "input",
          placeholder: "e.g., 3x/week for 6 weeks"
        },

        // { type: "subheading", label: "Interventions" },

        {
          name: "interventions",
          label: "Interventions",
          type: "checkbox-group",
          options: [
            { label: "Bed mobility training", value: "bed_mobility" },
            { label: "Transfer training", value: "transfer_training" },
            { label: "Muscle tone management (stretching, positioning, neuromodulation)", value: "muscle_tone" },
            { label: "Sitting balance training", value: "sitting_balance" },
            { label: "Standing balance training", value: "standing_balance" },
            { label: "Functional ROM exercises", value: "functional_rom" },
            { label: "Task-specific strengthening exercises", value: "strengthening" },
            { label: "Cardiovascular / endurance training", value: "cardio" },
            { label: "Task-oriented functional training", value: "task_functional" },
            { label: "Conventional Exercise", value: "conventional" },
            { label: "Neurodevelopmental Treatment (Bobath/NDT)", value: "ndt" },
            { label: "Prescription & training of assistive devices", value: "assistive_devices" },
            { label: "Others", value: "other" }
          ]
        },

        {
          name: "interventions_other",
          label: "Others (Specify)",
          type: "input",
          placeholder: "Enter other interventions...",
          showIf: { field: "interventions", includes: "other" }
        },
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

const SPINAL_ASSESSMENT_REGISTRY = {
  tug: TUG,
  rom: ROMForm,
  mmt: MMTForm,
  mas: MASForm,
  wst: WSTForm,
  mfrt: MFRTForm,
  wisci: WISCIForm,
  tenmwt: TenMWTForm,
  sixmwt: SixMWTForm,
  sixmwpt: SixMWPTForm,
  bbs: BergBalanceScale,
  wst: WSTForm,
  mfrt: MFRTForm,
  sixmwpt: SixMWPTForm,
  fma_le: FMALEForm,
bbt: BoxAndBlockTest,
  moca: MoCAAssessment,
  sara: SARAForm,
  FIM: FIMAssessment,
  scim: SCIMForm,
  fac:FACForm,
  
  
  
  
  
   
  


};


export default function CybernicsAssessment({patient, onSubmit, onBack}) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `spinal_assessment_draft_${patient.id}`
    : null;
   
  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setValues(JSON.parse(saved).values || {});
    }
  }, [storageKey]);

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      pmh_from_registration:
        patient.medical_history || "No data available",
  
      family_social_from_registration:
        patient.diagnosis_history || "No data available",
      referred_by: patient.case_manager || "",
      referral_reasons: patient.diagnosis_history || patient.icd || ""
    }));
  }, [patient]);

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
      alert("Spinal draft saved");
    }
  };
 
  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Spinal assessment submitted");
  };
  
    const [patientHistory, setPatientHistory] = useState({
    past_medical_history: "",
    past_family_history: "",
    alerts_and_allergies: ""
  });

  
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
                    <textarea
                      style={textarea}
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
                    <textarea
                      style={textarea}
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
                    <textarea
                      style={textarea}
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
  return (
    <div style={mainContent}>
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
      {/* ===== CONSENT & REFERRAL ===== */}
      
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
        assessmentRegistry={SPINAL_ASSESSMENT_REGISTRY}
      >
        <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button
              type="button"
              style={submitBtn}
              onClick={() => {
                if (activeTab === "subjective") setActiveTab("objective");
                else if (activeTab === "objective") setActiveTab("assessment");
                else if (activeTab === "assessment") setActiveTab("plan");
              }}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              style={submitBtn}
              onClick={handleSubmit}
            >
              Submit Spinal Cord Assessment
            </button>
          )}
        </div>
      </CommonFormBuilder>
    </div>
  );
}


const mainContent = { margin: "0 auto" };
 
const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
};
const section = {
  marginBottom: 24
};
 
const sectionTitle = {
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 12,
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: 6,
  color: "#0F172A"
};
 
const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
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
const th = {
  border: "1px solid #ccc",
  padding: 10,
  textAlign: "left"
};
 
const td = {
  border: "1px solid #ccc",
  padding: 10
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
