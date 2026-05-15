import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import ROMForm from "./ROMForm";
import MMTForm from "./MMTForm";
import SixMWTForm from "./SixMWTForm"
import SitToStandForm from "./SitToStandForm";
import RPEForm from "./RPEForm";
import ChestExpansionForm from "./ChestExpansionForm";
import PeakFlowForm from "./PeakFlowForm";
import PeakCoughForm from "./PeakCoughForm";
import IncentiveSpirometryForm from "./IncentiveSpirometryForm";
import PatientCard from "../../../shared/cards/PatientCard";

const YES_NO_OPTIONS = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];

// Match Neuro consent & referral card so the UI is identical
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

const CARDIO_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

// Registry for assessment-launcher buttons in Cardiorespiratory
const CARDIO_ASSESSMENT_REGISTRY = {
  rom: ROMForm,
  mmt: MMTForm,
  sixmwt: SixMWTForm,
  sit_stand_30s: SitToStandForm,
  rpe: RPEForm,
  chest_expansion: ChestExpansionForm,
  peak_flow_meter: PeakFlowForm,
  peak_cough_meter: PeakCoughForm,
  incentive_spirometry: IncentiveSpirometryForm,
};

export default function Cardiorespiratory({ patient, onSubmit, onBack }) {
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

  const storageKey = patient ? `pt_cardio_assessment_draft_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setValues(JSON.parse(saved).values || {});
    }
  }, [storageKey]);

  // Preload PMH and referral info from registration (same pattern as Neuro)
  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      pmh_from_registration: patient.medical_history || "No data available",
      referred_by: patient.case_manager || "",
      referral_reasons: patient.diagnosis_history || patient.icd || "",
      sts_age:    patient.age    || "",
      sts_gender: patient.sex?.toLowerCase().includes("f") ? "female" : "male",
      iso_gender: patient.sex?.toLowerCase().includes("f") ? "female" : "male",
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
      if (storageKey) localStorage.removeItem(storageKey);
    }

    if (type === "save" && storageKey) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ values, updatedAt: new Date() })
      );
      alert("Cardiorespiratory draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Cardiorespiratory assessment submitted");
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
        name: "hpi",
        label: "History of Present Illness",
        type: "input"
      },
      {
        name: "associated_symptoms",
        label: "Associated Symptoms",
        type: "checkbox-group",
        options: [
          { label: "Fever", value: "fever" },
          { label: "Chest pain", value: "chest_pain" },
          { label: "Orthopnea", value: "orthopnea" },
          { label: "PND", value: "pnd" },
          { label: "Hemoptysis", value: "hemoptysis" },
          { label: "Wheezing", value: "wheezing" }
        ]
      },
      { type: "subheading", label: "Pain Assessment" },
      {
        name: "pain_nrs",
        label: "NRS (0–10)",
        type: "scale-slider",
        min: 0,
        max: 10,
        showValue: true,
        ranges: [
          {
            min: 0,
            max: 1,
            label: "Mild",
            color: "#22c55e"
          },
          {
            min: 1,
            max: 5,
            label: "Moderate",
            color: "#facc15"
          },
          {
            min: 5,
            max: 10,
            label: "Severe",
            color: "#ef4444"
          }
        ]
      },
      {
        type: "row",
        fields: [
          {
            name: "pain_location",
            label: "Pain Location",
            type: "input"
          },
          {
            name: "pain_type",
            label: "Pain Type",
            type: "input"
          }
        ]
      },
      {
        type: "row",
        fields: [
          {
            name: "pain_aggravating",
            label: "Aggravating factors",
            type: "input"
          },
          {
            name: "pain_relieving",
            label: "Relieving factors",
            type: "input"
          }
        ]
      },
      // {
      //   name: "patient_goals",
      //   label: "Patient Goals / Expectations",
      //   type: "textarea"
      // },
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
        type: "subheading",
        label: "Prior Level of Function (PLOF)"
      },
      {
        name: "plof_status",
        label: "PLOF",
        type: "radio",
        labelAbove: true,
        options: [
          { label: "Independent", value: "independent" },
          { label: "Independent with aid", value: "independent_with_aid" },
          { label: "Dependent", value: "dependent" },
          { label: "Sedentary", value: "sedentary" },
          { label: "Active", value: "active" },
          { label: "Employed", value: "employed" }
        ]
      },
      {
        name: "plof_employed_details",
        label: "Employed – details",
        type: "input",
        showIf: { field: "plof_status", equals: "employed" }
      },
      {
        name: "functional_limitations",
        label: "Functional Limitations",
        type: "checkbox-group",
        options: [
          { label: "Bed mobility difficulty", value: "bed_mobility" },
          { label: "Reduced ambulation tolerance", value: "ambulation" },
          { label: "ADL limitation", value: "adl" },
          { label: "Reduced stair climbing", value: "stairs" },
          { label: "Work limitation", value: "work" }
        ]
      },

      {
        name: "pmh_comorbid",
        label: "Past Medical History",
        type: "checkbox-group",
        options: [
          { label: "HTN - Hypertension", value: "htn" },
          { label: "DM - Diabetes Mellitus", value: "dm" },
          { label: "COPD - Chronic Obstructive Pulmonary Disease", value: "copd" },
          { label: "Asthma", value: "asthma" },
          { label: "CAD - Coronary Artery Disease", value: "cad" },
          { label: "Previous Myocardial Infarction", value: "previous_mi" },
          { label: "Smoking", value: "smoking" },
          { label: "Obesity", value: "obesity" },
          { label: "Others", value: "others" }
        ]
      },
      {
        name: "pmh_comorbid_other",
        label: "Others – specify",
        type: "input",
        showIf: { field: "pmh_comorbid", includes: "others" }
      },
      {
        name: "red_flag_screening",
        label: "Red Flags",
        type: "checkbox-group",
        options: [
          { label: "Unstable angina", value: "unstable_angina" },
          { label: "Recent Deep Vein Thrombosis", value: "dvt" },
          { label: "Pulmonary Embolism", value: "pe" },
          { label: "Severe desaturation <88%", value: "desaturation" },
          { label: "Syncope", value: "syncope" },
          { label: "Active infection", value: "infection" },
          { label: "None", value: "none" }
        ]
      }
    ]
  };

  const OBJECTIVE_SCHEMA = {
    
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: [
          { type: "subheading", label: "Baseline Vitals" },
          {
            type: "row",
            fields: [
              {
                name: "baseline_bp",
                label: "BP (mmHg)",
                type: "input",
                placeholder: "e.g. 120/80"
              },
              {
                name: "baseline_hr",
                label: "HR (/min)",
                type: "input",
                placeholder: "/min"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "baseline_rr",
                label: "RR (/min)",
                type: "input",
                placeholder: "/min"
              },
              {
                name: "baseline_spo2",
                label: "SpO\u2082 (%)",
                type: "input",
                placeholder: "%"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "baseline_oxygen_support",
                label: "Oxygen Support",
                type: "radio",
                options: [
                  { label: "Room Air", value: "room_air" },
                  { label: "Nasal Cannula", value: "nasal_cannula" },
                  { label: "Mask", value: "mask" }
                ]
              },
              {
                name: "baseline_flow_rate",
                label: "Flow Rate (L/min)",
                type: "input",
                placeholder: "L/min"
              }
            ]
          },

          { type: "subheading", label: "Pre-Exercise Vitals" },
          {
            type: "row",
            fields: [
              {
                name: "pre_bp",
                label: "BP (mmHg)",
                type: "input",
                placeholder: "e.g. 120/80"
              },
              {
                name: "pre_hr",
                label: "HR (/min)",
                type: "input",
                placeholder: "/min"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "pre_rr",
                label: "RR (/min)",
                type: "input",
                placeholder: "/min"
              },
              {
                name: "pre_spo2",
                label: "SpO\u2082 (%)",
                type: "input",
                placeholder: "%"
              }
            ]
          },

          { type: "subheading", label: "During Exercise (Peak)" },
          {
            type: "row",
            fields: [
              {
                name: "peak_bp",
                label: "BP (mmHg)",
                type: "input",
                placeholder: "e.g. 150/90"
              },
              {
                name: "peak_hr",
                label: "HR (/min)",
                type: "input",
                placeholder: "/min"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "peak_rr",
                label: "RR (/min)",
                type: "input",
                placeholder: "/min"
              },
              {
                name: "peak_spo2",
                label: "SpO\u2082 (%)",
                type: "input",
                placeholder: "%"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "peak_rpe",
                label: "RPE - Rate of Perceived Exertion",
                type: "input",
                placeholder: "e.g. 6–20 or 0–10"
              }
            ]
          },

          { type: "subheading", label: "Post-Exercise (Immediate)" },
          {
            type: "row",
            fields: [
              {
                name: "post_bp",
                label: "BP (mmHg)",
                type: "input",
                placeholder: "e.g. 130/80"
              },
              {
                name: "post_hr",
                label: "HR (/min)",
                type: "input",
                placeholder: "/min"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "post_rr",
                label: "RR (/min)",
                type: "input",
                placeholder: "/min"
              },
              {
                name: "post_spo2",
                label: "SpO\u2082 (%)",
                type: "input",
                placeholder: "%"
              }
            ]
          },

          { type: "subheading", label: "Recovery & Abnormal Response" },
          {
            name: "recovery_time_minutes",
            label: "Recovery Time (Return to Baseline) (minutes)",
            type: "input",
            placeholder: "minutes"
          },
          {
            name: "abnormal_response",
            label: "Abnormal Response",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "abnormal_response_details",
            label: "If Yes, specify",
            type: "checkbox-group",
            showIf: { field: "abnormal_response", equals: "yes" },
            options: [
              { label: "Excess HR rise", value: "hr_rise" },
              { label: "BP drop", value: "bp_drop" },
              { label: "Desaturation >4%", value: "desaturation_4" },
              { label: "Dizziness", value: "dizziness" },
              { label: "Chest pain", value: "chest_pain" },
              { label: "Arrhythmia", value: "arrhythmia" },
              { label: "Other", value: "other" }
            ]
          },
          {
            name: "abnormal_response_other",
            label: "Other – specify",
            type: "input",
            showIf: { field: "abnormal_response_details", includes: "other" }
          },

          { type: "subheading", label: "Observation" },
          {
            name: "breathing_pattern",
            label: "Breathing Pattern",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Normal", value: "normal" },
              { label: "Paradoxical", value: "paradoxical" },
              { label: "Apical dominant", value: "apical_dominant" }
            ]
          },
          {
            name: "accessory_muscle_use",
            label: "Accessory Muscle Use",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "posture_observation",
            label: "Posture",
            type: "radio",
            options: [
              { label: "Kyphosis", value: "kyphosis" },
              { label: "Scoliosis", value: "scoliosis" },
              { label: "Forward head", value: "forward_head" }
            ]
          },
          {
            name: "chest_deformity",
            label: "Chest Deformity",
            type: "radio",
            options: [
              { label: "Barrel chest", value: "barrel_chest" },
              { label: "Pectus", value: "pectus" }
            ]
          },
          {
            name: "cyanosis",
            label: "Cyanosis",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "auscultation_findings",
            label: "Auscultation",
            type: "checkbox-group",
            options: [
              { label: "Crackles", value: "crackles" },
              { label: "Wheeze", value: "wheeze" },
              { label: "Reduced air entry", value: "reduced_air_entry" },
              { label: "Bronchial breath sounds", value: "bronchial" },
              { label: "Clear", value: "clear" }
            ]
          },
          {
            name: "auscultation_crackles_location",
            label: "Crackles – Location",
            type: "input",
            showIf: { field: "auscultation_findings", includes: "crackles" }
          },

          { type: "subheading", label: "Functional Capacity & Outcome Measures" },
          {
            name: "functional_measures",
            label: "",
            type: "assessment-launcher",
            options: [
              { label: "ROM (Active/Passive)", value: "rom" },
              { label: "MMT (Manual Muscle Testing)", value: "mmt" },
              { label: "6-Minute Walking Test", value: "sixmwt" },
              { label: "1.6 Treadmill Test", value: "treadmill_1_6" },
              { label: "30 Seconds Sit-Stand Test", value: "sit_stand_30s" },
              { label: "RPE", value: "rpe" },
              { label: "Chest Expansion", value: "chest_expansion" },
              { label: "Peak Flow Meter", value: "peak_flow_meter" },
              { label: "Peak Cough Meter", value: "peak_cough_meter" },
              { label: "Incentive Spirometry", value: "incentive_spirometry" }
            ]
          },

          { type: "subheading", label: "Chest Expansion" },
          {
            type: "grid-header",
            label: "Level",
            cols: ["Baseline", "Reassessment", "% Change"]
          },
          {
            type: "grid-row",
            name: "ce_apical",
            label: "Apical",
            cols: ["input", "input", "input"]
          },
          {
            type: "grid-row",
            name: "ce_upper_costal",
            label: "Upper Costal",
            cols: ["input", "input", "input"]
          },
          {
            type: "grid-row",
            name: "ce_lower_costal",
            label: "Lower Costal",
            cols: ["input", "input", "input"]
          },

          { type: "subheading", label: "Cough & Sputum" },
          {
            name: "cough_effectiveness",
            label: "Cough",
            type: "radio",
            options: [
              { label: "Effective", value: "effective" },
              { label: "Weak", value: "weak" },
              { label: "Assisted required", value: "assisted" }
            ]
          },
          {
            type: "row",
            fields: [
              { name: "sputum_color", label: "Sputum Color", type: "input" },
              { name: "sputum_amount", label: "Amount", type: "input" }
            ]
          },
          {
            type: "row",
            fields: [
              { name: "sputum_consistency", label: "Consistency", type: "input" },
              { name: "sputum_odor", label: "Odor", type: "input" }
            ]
          },
          {
            name: "peak_cough_flow",
            label: "Peak Cough Flow (L/min)",
            type: "input",
            placeholder: "L/min"
          },

          { type: "subheading", label: "Precautions" },
          {
            name: "precautions",
            label: "Precautions",
            type: "checkbox-group",
            options: [
              { label: "Sternal", value: "sternal" },
              { label: "Pacemaker", value: "pacemaker" },
              { label: "Oxygen therapy", value: "oxygen_therapy" },
              { label: "Fall risk", value: "fall_risk" },
              { label: "Infection control", value: "infection_control" },
              { label: "None", value: "none" }
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
          // {
          //   name: "problem_list",
          //   label: "Problem List",
          //   type: "input"
          // },
          { type: "subheading", label: "Problem List" },
          {
  name: "problem_list",
  type: "checkbox-group",
  options: [
    { label: "Sputum retention", value: "sputum_retention" },
    { label: "Reduced cough effort", value: "reduced_cough_effort" },

    {
      label: "Reduced chest expansion (Apical)",
      value: "reduced_chest_expansion_apical"
    },
    {
      label: "Reduced chest expansion (Upper Lateral Costal)",
      value: "reduced_chest_expansion_upper_lateral_costal"
    },
    {
      label: "Reduced chest expansion (Lower Lateral Costal)",
      value: "reduced_chest_expansion_lower_lateral_costal"
    },

    {
      label: "Reduced cardiopulmonary endurance (6-Minute Walk Test, 1.6 Treadmill Test, 30 Sec Sit to Stand Test)",
      value: "reduced_cardiopulmonary_endurance"
    },

    { label: "Others", value: "other" }
  ]
},
{ type: "subheading", label: "Clinical Impression" },
{
  name: "clinical_impression",
  type: "checkbox-group",
  options: [
    {
      label: "Sputum retention (reduced cough effort, chest infection, immobility, secondary lung complications)",
      value: "sputum_retention"
    },
    {
      label: "Reduced air entry (reduced chest expansion, chest deformity, posture)",
      value: "reduced_air_entry"
    },

    {
      label: "Underlying cause: Tracheostomy",
      value: "tracheostomy"
    },
    {
      label: "Underlying cause: Stroke",
      value: "stroke"
    },
    {
      label: "Underlying cause: Spinal Cord Injury (SCI)",
      value: "sci"
    },
    {
      label: "Underlying cause: Traumatic Brain Injury (TBI)",
      value: "tbi"
    },
    {
      label: "Underlying cause: CABG",
      value: "cabg"
    },
    {
      label: "Underlying cause: Myocardial Infarction (MI)",
      value: "mi"
    },
    {
      label: "Underlying cause: Pacemaker",
      value: "pacemaker"
    },
    {
      label: "Underlying cause: Heart Failure",
      value: "heart_failure"
    },

    { label: "Others", value: "other" }
  ]
},
{
  name: "clinical_impression_other",
  label: "Specify Other Clinical Impression",
  type: "input",
  placeholder: "Enter other clinical impression",
  showIf: {
    field: "clinical_impression",
    includes: "other"
  }
},

          // {
          //   name: "clinical_impression",
          //   label: "Clinical Impression",
          //   type: "input"
          // },
          {
            name: "underlying_cause",
            label: "Underlying Cause",
            type: "checkbox-group",
            options: [
              { label: "Stroke", value: "stroke" },
              { label: "SCI - Spinal Cord Injury", value: "sci" },
              { label: "TBI - Traumatic Brain Injury", value: "tbi" },
              { label: "CABG - Coronary Artery Bypass Grafting", value: "cabg" },
              { label: "MI - Myocardial Infarction", value: "mi" },
              { label: "Pacemaker Implanted Cardiac Pacemaker", value: "pacemaker" },
              { label: "Heart failure", value: "heart_failure" },
              { label: "Tracheostomy", value: "tracheostomy" },
              { label: "Others", value: "others" }
            ]
          },
          {
            name: "underlying_cause_other",
            label: "Others – specify",
            type: "input",
            showIf: { field: "underlying_cause", includes: "others" }
          },
          {
            name: "nyha_class",
            label: "NYHA (New York Heart Association Functional Classification) (if cardiac)",
            type: "input"
          },
          {
            name: "gold_stage",
            label: "Global Initiative for Chronic Obstructive Lung Disease (GOLD) Stage (if COPD)",
            type: "input"
          },
          {
            name: "rehab_potential",
            label: "Rehab Potential",
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
   
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: [
          { type: "subheading", label: "Short-Term Goals (2–4 weeks)" },
          {
  name: "short_term_goals",
  label: "Short-Term Goals (2–4 weeks)",
  type: "checkbox-group",
  options: [
    {
      label: "Clear airway within 14/7",
      value: "clear_airway_14_days"
    },
    {
      label: "Improve cough effort within 14/7",
      value: "improve_cough_effort_14_days"
    },
    {
      label: "Improve chest expansion (poor → good)",
      value: "improve_chest_expansion"
    }
  ]
},
          { type: "dynamic-goals", name: "short_term_goals" },
          { type: "subheading", label: "Long-Term Goals (6–12 weeks)" },
          {
  name: "long_term_goals",
  label: "Long-Term Goals (6–12 weeks)",
  type: "checkbox-group",
  options: [
    {
      label: "Maintain clear airway",
      value: "maintain_clear_airway"
    },
    {
      label: "Prevent secondary lung complications",
      value: "prevent_secondary_lung_complications"
    },
    {
      label: "Return to daily activity without SOB or fatigue",
      value: "return_daily_activity_without_sob_fatigue"
    },
    {
      label: "Improve cardiovascular endurance",
      value: "improve_cardiovascular_endurance"
    },
    {
      label: "Return to work",
      value: "return_to_work"
    }
  ]
},
          { type: "dynamic-goals", name: "long_term_goals" },
          { type: "subheading", label: "Interventions" },

/* ---------------- AIRWAY CLEARANCE ---------------- */
{
  name: "airway_clearance",
  label: "Airway Clearance",
  type: "checkbox-group",
  options: [
    { label: "Active Cycle of Breathing Technique (ACBT)", value: "acbt" },
    { label: "Percussion", value: "percussion" },
    { label: "Vibration", value: "vibration" },
    { label: "Postural drainage", value: "postural_drainage" },
    { label: "Huffing / coughing techniques", value: "huffing_coughing" },
    { label: "Suctioning", value: "suctioning" },
    { label: "Others", value: "other" }
  ]
},
{
  name: "airway_clearance_other",
  label: "Specify Other Airway Clearance",
  type: "input",
  placeholder: "Enter other airway clearance technique",
  showIf: {
    field: "airway_clearance",
    includes: "other"
  }
},

/* ---------------- BREATHING EXERCISES ---------------- */
{
  name: "breathing_exercises",
  label: "Breathing Exercises",
  type: "checkbox-group",
  options: [
    { label: "Diaphragmatic breathing", value: "diaphragmatic_breathing" },
    { label: "Segmental breathing", value: "segmental_breathing" },
    { label: "Incentive spirometry", value: "incentive_spirometry" },
    { label: "Others", value: "other" }
  ]
},
{
  name: "breathing_exercises_other",
  label: "Specify Other Breathing Exercise",
  type: "input",
  placeholder: "Enter other breathing exercise",
  showIf: {
    field: "breathing_exercises",
    includes: "other"
  }
},

/* ---------------- MOBILISATION / EXERCISE ---------------- */
{
  name: "mobilisation_exercise",
  label: "Mobilisation / Exercise",
  type: "checkbox-group",
  options: [
    { label: "Bed mobility", value: "bed_mobility" },
    { label: "Sitting / standing exercise", value: "sitting_standing_exercise" },
    { label: "Ambulation training", value: "ambulation_training" },
    { label: "Endurance training (treadmill / walking)", value: "endurance_training" },
    { label: "Others", value: "other" }
  ]
},
{
  name: "mobilisation_exercise_other",
  label: "Specify Other Mobilisation/Exercise",
  type: "input",
  placeholder: "Enter other mobilisation/exercise",
  showIf: {
    field: "mobilisation_exercise",
    includes: "other"
  }
},

/* ---------------- EDUCATION ---------------- */
{
  name: "education",
  label: "Education",
  type: "checkbox-group",
  options: [
    { label: "Energy conservation", value: "energy_conservation" },
    { label: "Breathing control", value: "breathing_control" },
    { label: "Home exercise program", value: "hep" },
    { label: "Others", value: "other" }
  ]
},
{
  name: "education_other",
  label: "Specify Other Education",
  type: "input",
  placeholder: "Enter other education component",
  showIf: {
    field: "education",
    includes: "other"
  }
},

/* ---------------- FREQUENCY & DURATION ---------------- */
{
  name: "frequency_duration",
  label: "Frequency & Duration",
  type: "input",
  placeholder: "e.g., 45–60 minutes × 5 sessions/week × 4 weeks"
},
{
  type: "subheading",
  label: "Follow-up Plan"
},

{
  name: "follow_up_plan",
  label: "Follow-up Plan",
  type: "checkbox-group",
  options: [
    {
      label: "Reassessment scheduled in 2–4 weeks",
      value: "reassessment_2_4_weeks"
    },

    {
      label: "Track progress via Auscultation",
      value: "auscultation"
    },
    {
      label: "Track progress via Chest Expansion",
      value: "chest_expansion"
    },
    {
      label: "Track progress via RPE",
      value: "rpe"
    },
    {
      label: "Track progress via 6MWT",
      value: "six_minute_walk_test"
    },
    {
      label: "Track progress via Incentive Spirometry",
      value: "incentive_spirometry"
    },
    {
      label: "Track progress via Peak Flow Meter",
      value: "peak_flow_meter"
    },
    {
      label: "Track progress via Peak Cough Meter",
      value: "peak_cough_meter"
    },
    {
      label: "Track progress via ROM",
      value: "rom"
    },
    {
      label: "Track progress via MMT",
      value: "mmt"
    },
    {
      label: "Track progress via 1.6 Treadmill Test",
      value: "treadmill_1_6_test"
    },
    {
      label: "Track progress via 30 Sec Sit to Stand Test",
      value: "sit_to_stand_30sec"
    },

    {
      label: "Others",
      value: "other"
    }
  ]
},
{
  name: "follow_up_plan_other",
  label: "Specify Other Follow-up Method",
  type: "input",
  placeholder: "Enter other follow-up / outcome measure",
  showIf: {
    field: "follow_up_plan",
    includes: "other"
  }
},
          {
            name: "interventions_referrals",
            label: "Referrals",
            type: "checkbox-group",
            options: [
              { label: "Dietitian", value: "dietitian" },
              { label: "OT", value: "ot" },
              { label: "SLT", value: "slt" },
              { label: "Neuropsychology", value: "neuropsychology" },
              { label: "Vocational therapy", value: "vocational_therapy" }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "referral_reason_dietitian",
                label: "Dietitian – Referral Reason",
                type: "input",
                showIf: { field: "interventions_referrals", includes: "dietitian" }
              },
              {
                name: "referral_reason_ot",
                label: "OT – Referral Reason",
                type: "input",
                showIf: { field: "interventions_referrals", includes: "ot" }
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "referral_reason_slt",
                label: "SLT – Referral Reason",
                type: "input",
                showIf: { field: "interventions_referrals", includes: "slt" }
              },
              {
                name: "referral_reason_neuropsych",
                label: "Neuropsychology – Referral Reason",
                type: "input",
                showIf: { field: "interventions_referrals", includes: "neuropsychology" }
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "referral_reason_vocational",
                label: "Vocational therapy – Referral Reason",
                type: "input",
                showIf: { field: "interventions_referrals", includes: "vocational_therapy" }
              }
            ]
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

  //   const [patientHistory, setPatientHistory] = useState({
  //   past_medical_history: patient?.medical_history || "",
  //   past_family_history: patient?.family_medical_history || "",
  //   alerts_and_allergies: patient?.alerts_and_allergies_history || ""
  // });
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
        schema={CARDIO_CONTAINER_SCHEMA}
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
        assessmentRegistry={CARDIO_ASSESSMENT_REGISTRY}
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
              Submit Cardiorespiratory Assessment
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