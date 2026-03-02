import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import ROMForm from "./ROMForm";
import MMTForm from "./MMTForm";

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
          name: "consent_risks_benefits",
          type: "checkbox-group",
          options: [{ label: "Risks/benefits explained", value: "yes" }]
        },
        {
          name: "consent_verbalized",
          type: "checkbox-group",
          options: [{ label: "Patient verbalized understanding", value: "yes" }]
        },
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
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "perkeso" }
        },
        {
          name: "equipment_ngo",
          label: "NGO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "ngo" }
        },
        {
          name: "equipment_self",
          label: "Self-purchased Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "self" }
        },
        {
          name: "equipment_others",
          label: "Other Equipment Details",
          type: "textarea",
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
          type: "textarea",
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
  mmt: MMTForm
};

function CardioPatientInfo({ patient }) {
  if (!patient) return null;

  const today = new Date();

  const formatDate = (d) => {
    if (!d) return "-";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return "-";
    return dt.toLocaleDateString();
  };

  const calculateDuration = (onset) => {
    if (!onset) return "-";
    const onsetDate = new Date(onset);
    const diffMs = today - onsetDate;
    if (diffMs < 0 || Number.isNaN(onsetDate.getTime())) return "-";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
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
        <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
        <div>
          <b>Duration of Diagnosis:</b>{" "}
          {calculateDuration(patient.date_of_onset)}
        </div>
        <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
        <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
        <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
        <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
        <div><b>Education Level:</b> {patient.education_background || "-"}</div>
        <div><b>Occupation:</b> {patient.occupation || "-"}</div>
        <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
        <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
      </div>
    </div>
  );
}

export default function Cardiorespiratory({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

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
        type: "textarea"
      },
      {
        name: "hpi",
        label: "History of Present Illness",
        type: "textarea"
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
        step: 1,
        showValue: true
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
      {
        name: "patient_goals",
        label: "Patient Goals / Expectations",
        type: "textarea"
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
        name: "pmh_from_registration",
        label: "Past Medical History (from registration)",
        type: "input",
        readOnly: true
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
    title: "OBJECTIVE",
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
              { label: "6-Minute Walking Test", value: "six_mwt" },
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
    title: "ASSESSMENT",
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        fields: [
          {
            name: "problem_list",
            label: "Problem List",
            type: "input"
          },
          {
            name: "clinical_impression",
            label: "Clinical Impression",
            type: "input"
          },
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
    title: "PLAN",
    actions: SUBJECTIVE_SCHEMA.actions,
    sections: [
      {
        title: "Short-Term Goals (2–4 weeks)",
        fields: [
          {
            type: "dynamic-goals",
            name: "short_term_goals"
          }
        ]
      },
      {
        title: "Long-Term Goals (6–12 weeks)",
        fields: [
          {
            type: "dynamic-goals",
            name: "long_term_goals"
          }
        ]
      },
      {
        title: "Interventions",
        fields: [
          {
            name: "interventions_airway_clearance",
            label: "Airway Clearance",
            type: "checkbox-group",
            options: [
              { label: "Percussion", value: "percussion" },
              { label: "Vibration", value: "vibration" },
              { label: "Suctioning", value: "suctioning" },
              { label: "ACBT", value: "acbt" },
              { label: "Huffing", value: "huffing" },
              { label: "Postural Drainage", value: "postural_drainage" },
              { label: "Assisted Cough", value: "assisted_cough" }
            ]
          },
          {
            name: "interventions_breathing",
            label: "Breathing Exercises",
            type: "checkbox-group",
            options: [
              { label: "Diaphragmatic", value: "diaphragmatic" },
              { label: "Segmental", value: "segmental" },
              { label: "Incentive Spirometry", value: "incentive_spirometry" }
            ]
          },
          {
            name: "interventions_mobility",
            label: "Mobility & Conditioning",
            type: "checkbox-group",
            options: [
              { label: "Thoracic mobility", value: "thoracic_mobility" },
              { label: "Circuit", value: "circuit" },
              { label: "Treadmill", value: "treadmill" },
              { label: "Static bicycle", value: "static_bicycle" },
              { label: "Step training", value: "step_training" },
              { label: "Elliptical", value: "elliptical" }
            ]
          },
          {
            name: "interventions_education",
            label: "Education",
            type: "checkbox-group",
            options: [
              { label: "HEP", value: "hep" },
              { label: "Energy conservation", value: "energy_conservation" },
              { label: "Postural correction", value: "postural_correction" },
              { label: "Airway clearance", value: "airway_clearance" },
              { label: "Safety precautions", value: "safety_precautions" }
            ]
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

  return (
    <div style={mainContent}>
      {/* ===== PATIENT INFORMATION CARD ===== */}
      <CommonFormBuilder
        schema={CARDIO_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => {}}
      >
        <CardioPatientInfo patient={patient} />
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

