import React, { useEffect, useState } from "react";
import SixMWTForm from "./SixMWTForm";
import MMTForm from "./MMTForm";
import YBalanceTestForm from "./YBalanceTestForm";
import LegPressForm from "./LegPressForm";
import SPADIForm from "./SPADIForm";
import HOOSForm from "./HOOSForm";
import KOOSForm from "./KOOSForm";
import FAOSForm from "./FAOSForm";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PatientCard from "../../../shared/cards/PatientCard";

export const CONDITIONING_ASSESSMENT_REGISTRY = {
  sixmwt: SixMWTForm,
  mmt: MMTForm,
  y_balance: YBalanceTestForm,
  fac: LegPressForm,
  spadi: SPADIForm,
  hoos: HOOSForm,
  koos: KOOSForm,
  faos: FAOSForm,
};
const PROGNOSIS_OPTIONS = [
  { label: "Excellent", value: "excellent" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" }
];
export default function Conditioning({ patient, onSubmit, onBack }) {
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
            }, [patient])

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `conditioning_assessment_draft_${patient.id}`
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
      alert("Conditioning draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Conditioning assessment submitted");
  };

  /* ===================== SCHEMAS ===================== */

  const SUBJECTIVE_SCHEMA = {
   
    sections: [

      /* ===================================================== */
      /* PATIENT HISTORY                                       */
      /* ===================================================== */

      {
       
        fields: [

          {
            type: "input",
            name: "chief_complaint",
            label: "Chief Complaint"
          },
          {
            type: "input",
            name: "history_present_illness",
            label: "History of Present Illness"
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
            type: "input",
            name: "prior_level_function",
            label: "Prior Level of Function"
          }

        ]
      },

      /* ===================================================== */
      /* OCCUPATIONAL & ACTIVITY STATUS                        */
      /* ===================================================== */

      {
        title: "Occupational & Activity Status",
        fields: [

          {
            type: "input",
            name: "occupation",
            label: "Occupation"
          },
          {
            type: "radio",
            name: "activity_level_before_illness",
            label: "Activity Level Before Illness",
            options: [
              { label: "Sedentary", value: "Sedentary" },
              { label: "Moderate", value: "Moderate" },
              { label: "Active", value: "Active" }
            ]
          }

        ]
      },

      /* ===================================================== */
      /* PAIN & SYMPTOMS                                       */
      /* ===================================================== */

      {
        title: "Pain & Symptoms",
        fields: [

          {
            type: "scale-slider",
            name: "pain_nrs",
            label: "Pain (NRS 0–10)",
            min: 0,
            max: 10,
            step: 1,
            showValue: true,
            ranges: [
              { min: 0, max: 3, color: "#16a34a", label: "Mild" },
              { min: 4, max: 6, color: "#f59e0b", label: "Moderate" },
              { min: 7, max: 10, color: "#dc2626", label: "Severe" }
            ]
          },
          {
            type: "scale-slider",
            name: "fatigue_scale",
            label: "Fatigue (0–10)",
            min: 0,
            max: 10,
            step: 1,
            showValue: true,
            ranges: [
              { min: 0, max: 3, color: "#16a34a", label: "Mild" },
              { min: 4, max: 6, color: "#f59e0b", label: "Moderate" },
              { min: 7, max: 10, color: "#dc2626", label: "Severe" }
            ]
          },
          {
            type: "scale-slider",
            name: "borg_scale",
            label: "Borg Scale (Dyspnea / Exertion)",
            min: 1,
            max: 10,
            step: 1,
            showValue: true,
            ranges: [
              { min: 0, max: 3, color: "#16a34a", label: "Mild" },
              { min: 4, max: 6, color: "#f59e0b", label: "Moderate" },
              { min: 7, max: 10, color: "#dc2626", label: "Severe" }
            ]
          }

        ]
      },

      /* ===================================================== */
      /* MEDICAL HISTORY & SAFETY                              */
      /* ===================================================== */

      {
        title: "Medical History & Safety",
        fields: [

          {
            type: "radio",
            name: "falls_history",
            label: "Falls History",
            options: ["Yes", "No"]
          },
          {
            type: "input",
            name: "assistive_device",
            label: "Assistive Device"
          },
          {
            type: "input",
            name: "premorbid_activity",
            label: "Pre-morbid Activity Level"
          }

        ]
      }

    ]
  };


  const CONDITIONING_CONTAINER_SCHEMA = {
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
            options: [
              {
                label: "Home Exercise Program (HEP) reviewed and demonstrated",
                value: "yes"
              }
            ]
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
          },
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

  const OBJECTIVE_SCHEMA = {
   
    sections: [
       {
        title: "",
        fields: [
         {
      name: "neuro_scales",
      type: "assessment-launcher",
      options: [
        { label: "6MWT", value: "sixmwt" },
        { label: "Manual Muscle Test (MMT)", value: "mmt" },
        { label: "Y balance", value: "y_balance" },
        { label: "Leg press symmetry", value: "fac" },
        { label: "Shoulder Pain & Disability Index (SPADI)", value: "spadi" },
        { label: "HOOS", value: "hoos" },
        { label: "Knee Injury and Osteoarthritis", value: "koos" },
        { label: "FAOS", value: "faos" },
      ]
    },
        ]
      },

      /* ===================================================== */
      /* VITALS                                                */
      /* ===================================================== */

      {
        title: "Vitals",
        fields: [
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "bp_systolic",
                label: "BP (Systolic)",
                placeholder: "mmHg"
              },
              {
                type: "input",
                name: "bp_diastolic",
                label: "BP (Diastolic)",
                placeholder: "mmHg"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "heart_rate",
                label: "HR",
                placeholder: "bpm"
              },
              {
                type: "input",
                name: "respiratory_rate",
                label: "RR",
                placeholder: "/min"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "spo2",
                label: "SpO2",
                placeholder: "%"
              },
              {
                type: "input",
                name: "temperature",
                label: "Temperature",
                placeholder: "°C"
              }
            ]
          }
        ]
      },

      /* ===================================================== */
      /* ISOMETRIC STRENGTH - MUSCLE METER                     */
      /* ===================================================== */

      {
        title: "Isometric Strength (Muscle Meter)",
        fields: [
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "quadriceps_left",
                label: "Quadriceps Left (N)",
                placeholder: "Newton"
              },
              {
                type: "input",
                name: "quadriceps_right",
                label: "Quadriceps Right (N)",
                placeholder: "Newton"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "hamstring_left",
                label: "Hamstring Left (N)",
                placeholder: "Newton"
              },
              {
                type: "input",
                name: "hamstring_right",
                label: "Hamstring Right (N)",
                placeholder: "Newton"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "muscle_interpretation",
                label: "Interpretation Formula: (Force / Body weight) × 100"
              }
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
   
    sections: [
      {
        fields: [
          { type: "subheading", label: "Short-Term Goals (2–4 weeks)" },
          { type: "dynamic-goals", name: "short_term_goals" },

          { type: "subheading", label: "Long-Term Goals (6–12 weeks)" },
          { type: "dynamic-goals", name: "long_term_goals" },
          {
  type: "subheading",
  label: "Interventions and Plan"
},

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
    {
      label: "Functional strengthening exercise",
      value: "functional_strengthening_exercise"
    },
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
{
  type: "subheading",
  label: "HEP (Home Exercise Program)"
},

{
  name: "home_exercise_program",
 
  type: "checkbox-group",
  options: [
    {
      label: "Strengthening exercises",
      value: "strengthening_exercises"
    },
    {
      label: "Stretching exercises",
      value: "stretching_exercises"
    },
    {
      label: "Standing / Sitting balance training",
      value: "balance_training"
    },
    {
      label: "Endurance training",
      value: "endurance_training"
    },
    {
      label: "Fitness regime",
      value: "fitness_regime"
    },
    {
      label: "Mobilization",
      value: "mobilization"
    },
    {
      label: "ROM exercise",
      value: "rom_exercise"
    },
    {
      label: "Patient & Carer education",
      value: "patient_carer_education"
    },
    {
      label: "Others",
      value: "other"
    }
  ]
},

{
  name: "home_exercise_program_other",
  label: "Specify Other HEP",
  type: "input",
  placeholder: "Enter other home exercise program",
  showIf: {
    field: "home_exercise_program",
    includes: "other"
  }
},

          { type: "subheading", label: "Strength Conditioning" },
          
          {
            type: "checkbox-group",
            name: "strength_exercises",
            label: "Select Strength Exercises",
            options: [
              { label: "Leg Press Progression (40–60% 1RM)", value: "leg_press" },
              { label: "Closed Chain Strengthening", value: "closed_chain" },
              { label: "Core Stabilization", value: "core_stabilization" },
              { label: "Hip Abduction / Adduction", value: "hip_abd_add" },
              { label: "Knee Flexion / Extension", value: "knee_flex_ext" },
              { label: "Ankle Dorsiflexion / Plantarflexion", value: "ankle_flex_ext" }
            ]
          },

          { type: "input", name: "strength_notes", label: "Strength Conditioning Notes" },

          { type: "subheading", label: "Endurance Training" },
          {
            type: "checkbox-group",
            name: "endurance_activities",
            label: "Select Endurance Activities",
            options: [
              { label: "Treadmill (10–20 min, HR 60–70%)", value: "treadmill" },
              { label: "Cycling (10 min)", value: "cycling" },
              { label: "Stair Climbing", value: "stairs" },
              { label: "Recumbent Bike", value: "recumbent_bike" }
            ]
          },

          { type: "input", name: "endurance_duration", label: "Duration (Minutes)" },

          { type: "input", name: "endurance_notes", label: "Endurance Notes" },

          { type: "subheading", label: "Balance Training" },
          {
            type: "checkbox-group",
            name: "balance_exercises",
            label: "Select Balance Exercises",
            options: [
              { label: "Single Leg Stance", value: "single_leg" },
              { label: "Tandem Stance", value: "tandem_stance" },
              { label: "Dynamic Stepping Drills", value: "dynamic_stepping" },
              { label: "Turn & Look", value: "turn_look" },
              { label: "Reach Exercises", value: "reach" },
              { label: "Weight Shifting", value: "weight_shift" }
            ]
          },

          { type: "input", name: "balance_notes", label: "Balance Notes" },

         

          { type: "input", name: "home_frequency", label: "Frequency (e.g., 3×/week)" },
          {
  type: "subheading",
  label: "Follow-up Plan"
},

{
  name: "follow_up_plan",
 
  type: "checkbox-group",
  options: [
    {
      label: "Reassessment scheduled in 2–4 weeks",
      value: "reassessment_2_4_weeks"
    },
    {
      label: "Track progress via Outcome measures",
      value: "track_progress_outcome_measures"
    }
  ]
},
          

        ]
      }
    ]
  };

  const TREATMENT_PLAN_LABEL_MAP = {
    bed_mobility: "Bed mobility training",
    transfer: "Transfer training",
    MTM: "Muscle tone management",
    SBT: "Sitting balance training",
    StBT: "Standing balance training",
    FRE: "Functional ROM Exercise",
    strength: "Functional strengthening exercise",
    endurance: "Endurance training",
    FT: "Functional training",
    gait: "Gait training",
    WAP: "Walking aid prescription",
    bobath: "Bobath / NDT",
    others: "Others"
  };

  /* ===================== UI ===================== */
  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

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

      {/* ===== PATIENT INFORMATION CARD ===== */}
      <CommonFormBuilder
        schema={CONDITIONING_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => { }}
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
        assessmentRegistry={CONDITIONING_ASSESSMENT_REGISTRY}
      >

        {/* ADD MATRIX ONLY IN PLAN TAB */}
        {activeTab === "plan" &&
          Array.isArray(values.treatment_plan) &&
          values.treatment_plan.length > 0 && (

            <div style={{ marginTop: 20 }}>
              <h3>Treatment Plan Schedule</h3>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9" }}>
                    <th style={th}>Treatment</th>
                    <th style={th}>Frequency</th>
                    <th style={th}>Duration</th>
                  </tr>
                </thead>

                <tbody>
                  {values.treatment_plan.map(plan => (
                    <tr key={plan}>
                      <td style={td}>
                        <b>{TREATMENT_PLAN_LABEL_MAP[plan] || plan}</b>
                      </td>


                      <td style={td}>
                        <input
                          type="text"
                          placeholder="e.g. 5 days/week"
                          value={values[`freq_${plan}`] || ""}
                          onChange={e =>
                            onChange(`freq_${plan}`, e.target.value)
                          }
                        />
                      </td>

                      <td style={td}>
                        <input
                          type="text"
                          placeholder="e.g. 30 mins / 6 weeks"
                          value={values[`dur_${plan}`] || ""}
                          onChange={e =>
                            onChange(`dur_${plan}`, e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        <div style={submitRow}>
          <button style={submitBtn} onClick={handleSubmit}>
            Submit Conditioning Assessment
          </button>
        </div>

      </CommonFormBuilder>


    </div>
  );
}

/* ===================== STYLES ===================== */

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