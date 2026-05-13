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
const PROGNOSIS_OPTIONS = [
  { label: "Excellent", value: "excellent" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" }
];

const SPINAL_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

const CONSENT_AND_REFERRAL_SCHEMA = {
  title: "",
  sections: [
    {
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "consent_obtained",
              type: "checkbox-group",
              options: [{ label: "Consent obtained", value: "yes" }]
            },
            {
              name: "consent_upload",
              label: "Upload",
              type: "file-upload",
              showIf: { field: "consent_obtained", includes: "yes" }
            }
          ]
        },
        {
          name: "hep_reviewed",
          type: "checkbox-group",
          options: [{ label: "Home Exercise Program (HEP) reviewed and demonstrated", value: "yes" }]
        },
        {
          name: "current_diagnosis",
          label: "Current Diagnosis",
          type: "multi-select-dropdown",
          options: [
            { label: "Stroke", value: "stroke" },
            { label: "Traumatic Brain Injury", value: "tbi" },
            { label: "Parkinson Disease", value: "parkinson" },
            { label: "Spinal Cord Injury", value: "sci" },
            { label: "Peripheral Neuropathy", value: "peripheral_neuropathy" },
            { label: "Ligament injuries", value: "ligament_injuries" },
            { label: "Ataxia", value: "ataxia" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "current_diagnosis_other",
          label: "Other Diagnosis (specify)",
          type: "textarea",
          showIf: { field: "current_diagnosis", includes: "others" }
        },
        {
          name: "equipment_owned",
          label: "List of Equipment Owned",
          type: "checkbox-group",
          options: [
            { label: "PERKESO", value: "perkeso" },
            { label: "NGO", value: "ngo" },
            { label: "Self-purchased", value: "self" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "equipment_perkeso",
          label: "PERKESO Equipment Details",
          type: "input",
          showIf: { field: "equipment_owned", includes: "perkeso" }
        },
        {
          name: "equipment_ngo",
          label: "NGO Equipment Details",
          type: "input",
          showIf: { field: "equipment_owned", includes: "ngo" }
        },
        {
          name: "equipment_self",
          label: "Self-purchased Equipment Details",
          type: "input",
          showIf: { field: "equipment_owned", includes: "self" }
        },
        {
          name: "equipment_others",
          label: "Other Equipment Details",
          type: "input",
          showIf: { field: "equipment_owned", includes: "others" }
        }
        ,
        { type: "subheading", label: "Referral Information" },
        {
          name: "referred_by",
          label: "Referred by",
          type: "input",
          readOnly: true
        },
        {
          name: "referral_reasons",
          label: "Referral Reasons",
          type: "input",
          readOnly: true
        }
      ]
    }
  ]
};

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
        name: "pain_score",
        label: "Pain Score(Visual Analog Scale)",
        type: "scale-slider",

        min: 0,
        max: 10,
        ranges: [
          {
            min: 0,
            max: 1,
            label: "Mild",
            color: "#22c55e"   // green
          },
          {
            min: 1,
            max: 5,
            label: "Moderate",
            color: "#facc15"   // yellow
          },
          {
            min: 5,
            max: 10,
            label: "Severe",
            color: "#ef4444"   // red
          }
        ],
        showValue: true
      },
      {
        name: "medication",
        label: "Current Medication",
        type: "input"
      },
      {
        name: "social_history",
        label: "Social History",
        type: "subheading"
      },
      {
        name: "house_type",
        label: "Type of House",
        type: "radio",
        options: [
          { label: "Single storey", value: "single" },
          { label: "Double storey", value: "double" },
          { label: "Apartment with lift", value: "apartment" },
          { label: "Others", value: "others" }
        ]
      },
      {
        name: "house_type_other",
        label: "Specify",
        type: "input",
        showIf: { field: "house_type", equals: "others" }
      },
      {
        name: "toilet_type",
        label: "Toilet type",
        type: "radio",
        options: [
          { label: "Sitting", value: "sitting" },
          { label: "Squatting", value: "squatting" }
        ]
      },
      {
        name: "marital_status",
        label: "Marital Status",
        type: "radio",
        options: [
          { label: "Single", value: "single" },
          { label: "Married", value: "married" },
          { label: "Divorced", value: "divorced" }
        ]
      },
      {
        name: "care_giver",
        label: "Care Giver",
        type: "radio",
        options: [
          { label: "Live Alone", value: "live_alone" },
          { label: "Lives With Family", value: "live_with_family" }
        ]
      },
      {
        name: "employement_status",
        label: "Employement Status",
        type: "radio",
        options: [
          { label: "Employed", value: "employed" },
          { label: "Unemployed", value: "unemployed" }
        ]
      },
      {
        name: "patient_goals",
        label: "Patient Goals",
        type: "subheading"
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
      {
        name: "bowel",
        label: "Bowel",
        type: "radio",
        options: [
          { label: "Continence", value: "continence" },
          { label: "Incontinence", value: "incontinence" }
        ]
      },
      {
        name: "bladder",
        label: "Bladder",
        type: "radio",
        options: [
          { label: "Continence", value: "continence" },
          { label: "Incontinence", value: "incontinence" }
        ]
      },
    ]
}

const OBJECTIVE_SCHEMA = {
  title: "OBJECTIVE",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
        { type: "subheading", label: "General Observation" },
        {
          name: "body_size",
          label: "Body Size",
          type: "single-select",
          options: [
            { label: "Ectomorph",  value: "ectomorph"  },
            { label: "Mesomorph",  value: "mesomorph"  },
            { label: "Endomorph",  value: "endomorph"  },
          ],
        },
        {
          name: "ambulation",
          label: "Ambulation",
          type: "single-select",
          options: [
            { label: "Wheelchair (self propel)",      value: "wheelchair_self"   },
            { label: "Wheelchair (motorized)",        value: "wheelchair_motor"  },
            { label: "Wheelchair (assist by carer)",  value: "wheelchair_carer"  },
            { label: "Walking aids",                  value: "walking_aids"      },
            { label: "Walk independently",                value: "independent"       },
          ],
        },
        {
          name: "walking_aids_type",
          label: "Walking Aids (specify)",
          type: "input",
          placeholder: "e.g. elbow crutches, walking frame...",
          showIf: { field: "ambulation", equals: "walking_aids" },
        },
        {
          name: "accompanied_by",
          label: "Accompanied By",
          type: "single-select",
          options: [
            { label: "With carer",    value: "with_carer"    },
            { label: "Without carer", value: "without_carer" },
          ],
        },
        {
          name: "generated_observation_display",
          label: "Generated Observation",
          type: "input",
          readOnly: true,
          showIf: { field: "generated_observation_display", notEmpty: true },
        },
        {
          name: "local_observations",
          label: "Local Observations",
          type: "input"
        },
        {
          name: "palpation",
          label: "Palpation",
          type: "input"
        },
        {
          type: "subheading",
          label: "Scales / Outcome Measures"
        },
        {
          name: "spinal_scales",
          type: "assessment-launcher",
          options: [
            { label: "Range of Motion (ROM)", value: "rom" },
            { label: "Manual Muscle Test (MMT)", value: "mmt" },
            { label: "Muscle Tone (MAS)", value: "mas" },
            { label: "10 Meter Walk Test", value: "tenmwt" },
            { label: "Berg Balance Scale (BBS)", value: "bbs" },
            { label: "Timed Up and Go (TUG)", value: "tug" },
            { label: "6 Minutes Walk Test (6MWT)", value: "sixmwt" },
            { label: "6 Minutes Wheelchair Pust Test", value: "sixmwpt"},
            { label: "Wheelchair Skills Test", value: "wst"},
            { label: "Walking Index for Spinal Cord Injury", value: "wisci"},
            { label: "Modified Functional Reach Test", value: "mfrt"}
          ]
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
  type: "subheading",
  label: "Problem List"
},
            {
  name: "problem_list",
  type: "checkbox-group",
  options: [
    { label: "Reduced muscle strength", value: "reduced_muscle_strength" },
    { label: "Reduced muscle endurance", value: "reduced_muscle_endurance" },
    { label: "Reduced cardiovascular endurance", value: "reduced_cardiovascular_endurance" },
    { label: "Reduced ROM", value: "reduced_rom" },
    { label: "Poor wheelchair skills", value: "poor_wheelchair_skills" },
    { label: "Reduced standing balance", value: "reduced_standing_balance" },
    { label: "Reduced sitting balance", value: "reduced_sitting_balance" },
    { label: "Poor trunk control", value: "poor_trunk_control" },
    { label: "Unable to walk", value: "unable_to_walk" },
    { label: "Poor walking endurance", value: "poor_walking_endurance" },
    { label: "Poor wheelchair endurance", value: "poor_wheelchair_endurance" },
    { label: "Others", value: "other" }
  ]
},
{
  name: "problem_list_other_text",
  label: "Other Problem (Specify)",
  type: "input",
  placeholder: "Enter additional problems...",
  showIf: {
    field: "problem_list",
    includes: "other"
  }
},
//              {
//   type: "subheading",
//   label: "Functional Limitations"
// },

//       {name:"functional_limitations", type:"checkbox-group",
//         options: [
//     { label: "Gait Impairment", value: "gaitimpairment" },
//     { label: "Unsafe Transfers", value: "unsafetransfers" },
//     { label: "Reduced Endurance", value: "reducedendurance" },
//     { label: "Balance Deficit", value: "balancedeficit" },
//     { label: "ADL Dependency", value: "adldependency" },
//     { label: "No Functional Limitations", value: "nofunctionallimitations" },
//     { label: "Others", value: "others" }
//   ]
//       },
//       {
//           name: "functional_limitations_others",
//           label: "Specify Others",
//           type: "input",
//           showIf: { field: "functional_limitations", includes: "others" }
//         },
      {
        name: "clinical_impression",
        label: "Clinical Impression",
        type: "input"
      },
      {
        name: "prognosis",
        label: "Rehab Prognosis",
        type: "radio",
        options: PROGNOSIS_OPTIONS
      },
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
           { type: "subheading", label: "Interventions and Plan" },     
          {
  name: "interventions_plan",
  type: "checkbox-group",
  options: [
    { label: "Bed mobility training", value: "bed_mobility_training" },
    { label: "Transfer training", value: "transfer_training" },
    { label: "Muscle tone management", value: "muscle_tone_management" },
    { label: "Sitting balance training", value: "sitting_balance_training" },
    { label: "Standing balance training", value: "standing_balance_training" },
    { label: "Functional ROM exercise", value: "functional_rom_exercise" },
    { label: "Functional strengthening exercise", value: "functional_strengthening_exercise" },
    { label: "Endurance training", value: "endurance_training" },
    { label: "Functional training", value: "functional_training" },
    { label: "Gait training", value: "gait_training" },
    { label: "Bobath / NDT therapy", value: "bobath_ndt_therapy" },
    { label: "Walking aid prescription", value: "walking_aid_prescription" },
    { label: "Others", value: "other" }
  ]
},
{
  name: "interventions_plan_other",
  label: "Specify Other Intervention",
  type: "input",
  placeholder: "Enter other rehabilitation intervention",
  showIf: {
    field: "interventions_plan",
    includes: "other"
  }
},
        // {
        //   name: "home_exercise-program",
        //   label: "Home Exercise Program",
        //   type: "textarea"
        // },
        { type: "subheading", label: "HEP (home exercise program)" },
        {
  name: "hep_home_exercise_program",
  type: "checkbox-group",
  options: [
    { label: "Strengthening exercises", value: "strengthening_exercises" },
    { label: "Stretching exercises", value: "stretching_exercises" },
    { label: "Standing / sitting balance training", value: "balance_training" },
    { label: "Endurance training", value: "endurance_training" },
    { label: "Fitness regime", value: "fitness_regime" },
    { label: "Mobilization", value: "mobilization" },
    { label: "ROM exercise", value: "rom_exercise" },
    { label: "Patient & carer education", value: "patient_carer_education" },
    { label: "Others", value: "other" }
  ]
},
   { type: "subheading", label: " Follow-up plans" },     
{
  name: "follow_up_plan",
  type: "checkbox-group",
  options: [
    {
      label: "Reassessment scheduled in 2–4 weeks",
      value: "reassessment_2_4_weeks"
    },
    {
      label: "Track progress via outcome measures",
      value: "track_progress_outcome_measures"
    }
  ]
},
// { 
//           name: "referrals", 
//           label: "Referrals", 
//           type: "checkbox-group",
//           options: [
//             { label: "Neuro-Robotic ", value: "neuro_robotic" },
//             { label: "Hydrotherapy ", value: "hydrotherapy" },
//             { label: "Pain Management", value: "pain_management" },
//           ]
//         },
//         {
//           name: "remarks",
//           label: "Remarks",
//           type: "textarea"
//         }
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
};


export default function SpinalCordInjury({patient, onSubmit, onBack}) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");
   const [patientHistory, setPatientHistory] = useState({
      past_medical_history: "",
      past_family_history: "",
      alerts_and_allergies: ""
    });
    useEffect(() => {
          if (!patient) return;
          setPatientHistory({
            past_medical_history: patient.medical_history || "",
            past_family_history: patient.family_medical_history || "",
            alerts_and_allergies: patient.alerts_and_allergies_history || ""
          });
        }, [patient]);

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
          if (!storageKey) return;
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            try {
              setValues(JSON.parse(saved).values || {});
            } catch {}
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
    setValues(v => {
      const updated = { ...v, [name]: value };

      // Auto-generate the observation sentence when relevant fields change
      if (["body_size","ambulation","walking_aids_type","accompanied_by"].includes(name)) {
        const bs = name === "body_size"       ? value : updated.body_size;
        const am = name === "ambulation"      ? value : updated.ambulation;
        const wt = name === "walking_aids_type" ? value : updated.walking_aids_type;
        const ac = name === "accompanied_by"  ? value : updated.accompanied_by;

        const bodySize = bs ? bs.charAt(0).toUpperCase() + bs.slice(1) : null;

        let ambulation = null;
        if (am === "wheelchair_self")   ambulation = "via wheelchair (self propel)";
        else if (am === "wheelchair_motor") ambulation = "via wheelchair (motorized)";
        else if (am === "wheelchair_carer") ambulation = "via wheelchair (assisted by carer)";
        else if (am === "walking_aids")     ambulation = `via walking aids${wt ? ` (${wt})` : ""}`;
        else if (am === "independent")      ambulation = "walking independently";

        const accompanied = ac === "with_carer" ? "carer" : ac === "without_carer" ? "without carer" : null;

        if (bodySize && ambulation && accompanied) {
          updated.generated_observation_display =
            `Patient with ${bodySize} body size came into SCI Unit ${ambulation} accompanied by ${accompanied}.`;
        } else {
          updated.generated_observation_display = "";
        }
      }

      return updated;
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
      alert("Spinal draft saved");
    }
  };
 
  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Spinal assessment submitted");
  };
  
        //  const [patientHistory, setPatientHistory] = useState({
        //   past_medical_history: patient?.medical_history || "",
        //   past_family_history: patient?.family_medical_history || "",
        //   alerts_and_allergies: patient?.alerts_and_allergies_history || ""
        // });
        // function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
        //   if (!patient) return null;
        
        //   const formatDate = (dateStr) => {
        //     if (!dateStr) return "-";
        //     try {
        //       return new Date(dateStr).toLocaleDateString();
        //     } catch {
        //       return "-";
        //     }
        //   };
        
        //   return (
        //     <div style={{ marginBottom: 24 }}>
                      
        //       <div style={{
        //         display: "grid",
        //         gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        //         gap: 12,
        //         fontSize: 14
        //       }}>
        //         <div><b>Name:</b> {patient.name}</div>
        //         <div><b>IC:</b> {patient.id}</div>
        //         <div><b>DOB:</b> {formatDate(patient.dob)}</div>
        
        //         <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
        //         <div><b>ICD:</b> {patient.icd}</div>
        //         <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>
        
        //         <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
        //         <div><b>Duration of Diagnosis:</b> -</div>
        //         <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
        
        //         <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
        //         <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
        //         <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
        
        //         <div><b>Education Level:</b> {patient.education_background || "-"}</div>
        //         <div><b>Occupation:</b> {patient.occupation || "-"}</div>
        //         <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
        
        //         <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
        //         <div><b>Marital Status:</b> {patient.marital_status || "-"}</div>
        //         <div><b>PP/OB:</b> {patient.pp_ob || "-"}</div>
        
        //         {/* ===== HISTORY ===== */}
        //         <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
        //           <h3>Patient History</h3>

        //           <div>
        //             <b>Past Medical History</b>
        //             <textarea
        //               style={textarea}
        //               value={patientHistory.past_medical_history}
        //               onChange={(e) =>
        //                 setPatientHistory(prev => ({
        //                   ...prev,
        //                   past_medical_history: e.target.value
        //                 }))
        //               }
        //             />
        //           </div>

        //           <div>
        //             <b>Family History</b>
        //             <textarea
        //               style={textarea}
        //               value={patientHistory.past_family_history}
        //               onChange={(e) =>
        //                 setPatientHistory(prev => ({
        //                   ...prev,
        //                   past_family_history: e.target.value
        //                 }))
        //               }
        //             />
        //           </div>

        //           <div>
        //             <b>Allergies</b>
        //             <textarea
        //               style={textarea}
        //               value={patientHistory.alerts_and_allergies}
        //               onChange={(e) =>
        //                 setPatientHistory(prev => ({
        //                   ...prev,
        //                   alerts_and_allergies: e.target.value
        //                 }))
        //               }
        //             />
        //           </div>

        //           <button style={alertBtn}>🚨 Alerts</button>
        //         </div>
        //       </div>
        //     </div>
        //   );
        // }
        // const textarea = {
        //   width: "100%",
        //   minHeight: 90,
        //   marginTop: 6,
        //   marginBottom: 12,
        //   padding: "10px 12px",
        //   borderRadius: 6,
        //   border: "1px solid #d1d5db",
        //   fontSize: 14,
        //   resize: "vertical"
        // };
        
        // const alertBtn = {
        //   marginTop: 10,
        //   padding: "10px 20px",
        //   borderRadius: 6,
        //   border: "1.5px solid #007bff",
        //   background: "#007bff",
        //   color: "#fff",
        //   fontWeight: 600,
        //   cursor: "pointer"
        // };
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
  return (
    <div style={mainContent}>
      <CommonFormBuilder
        schema={SPINAL_CONTAINER_SCHEMA}
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
        {/* <PatientInformationBlock patient={patient} patientHistory={patientHistory} setPatientHistory={setPatientHistory}/> */}
      </CommonFormBuilder>
      {/* ===== CONSENT & REFERRAL ===== */}
      <CommonFormBuilder
        schema={CONSENT_AND_REFERRAL_SCHEMA}
        values={values}
        onChange={onChange}
      />
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
        {/* Generated Observation — shown inside the card on Objective tab, only when all 3 fields selected */}
        {/* {activeTab === "objective" && values.body_size && values.ambulation && values.accompanied_by && (
          <GeneratedObservationBanner values={values} />
        )} */}

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


/* ── Generated Observation Banner ── */
function GeneratedObservationBanner({ values }) {
  const bodySize = values.body_size
    ? values.body_size.charAt(0).toUpperCase() + values.body_size.slice(1)
    : null;

  let ambulation = null;
  if (values.ambulation === "wheelchair_self")   ambulation = "via wheelchair (self propel)";
  else if (values.ambulation === "wheelchair_motor") ambulation = "via wheelchair (motorized)";
  else if (values.ambulation === "wheelchair_carer") ambulation = "via wheelchair (assisted by carer)";
  else if (values.ambulation === "walking_aids")
    ambulation = `via walking aids${values.walking_aids_type ? ` (${values.walking_aids_type})` : ""}`;
  else if (values.ambulation === "independent")  ambulation = "walking independently";

  const accompanied = values.accompanied_by === "with_carer"
    ? "carer"
    : values.accompanied_by === "without_carer"
    ? "without carer"
    : null;

  if (!bodySize || !ambulation || !accompanied) return null;

  const Tag = ({ children }) => (
    <strong style={{ color: "#1d4ed8", background: "#dbeafe", borderRadius: 4, padding: "1px 6px", fontStyle: "italic" }}>
      {children}
    </strong>
  );

  return (
    <div style={{
      margin: "8px 0 16px",
      padding: "14px 18px",
      background: "#f0f9ff",
      border: "1px solid #bae6fd",
      borderRadius: 10,
      fontSize: 14,
      lineHeight: 2,
      color: "#0c4a6e",
    }}>
      <div style={{ fontWeight: 700, fontSize: 13, color: "#0369a1", marginBottom: 8 }}>
        Generated Observation
      </div>
      <div style={{ fontSize: 14, color: "#1e3a5f", lineHeight: 1.8 }}>
        Patient with <Tag>{bodySize}</Tag> body size came into SCI Unit{" "}
        <Tag>{ambulation}</Tag> accompanied by <Tag>{accompanied}</Tag>.
      </div>
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