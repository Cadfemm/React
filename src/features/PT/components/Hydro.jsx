import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import BergBalanceScale from "./BBS";

/* ===================== CONTAINER SCHEMA (SAME AS NEURO) ===================== */

const HYDRO_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

/* ===================== CONSENT & REFERRAL (REUSED) ===================== */

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
          name: "consent_obtained",
          type: "checkbox-group",
          options: [{ label: "Consent obtained", value: "yes" }]
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

/* ===================== PATIENT INFO (COPIED FROM NEURO) ===================== */

function HydroPatientInfo({ patient }) {
  if (!patient) return null;

  const today = new Date();

  const formatDate = d => (d ? new Date(d).toLocaleDateString() : "-");

  const calculateDuration = onset => {
    if (!onset) return "-";
    const diff = today - new Date(onset);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
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
        <div><b>Duration of Diagnosis:</b> {calculateDuration(patient.date_of_onset)}</div>
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

/* ===================== DUMMY HYDRO SCHEMAS ===================== */

const SUBJECTIVE_SCHEMA = {
  title: "Subjective",
  actions: [
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ],
  sections: [
    {
      fields: [
        /* ================= CHIEF COMPLAINT ================= */
        {
          name: "chief_complaint",
          label: "Chief Complaint",
          type: "textarea"
        },

        /* ================= HISTORY OF PRESENT ILLNESS ================= */
        {
          type: "subheading",
          label: "History of Present Illness"
        },

        {
          name: "onset",
          label: "Onset",
          type: "radio",
          options: [
            { label: "Acute", value: "acute" },
            { label: "Subacute", value: "subacute" },
            { label: "Chronic", value: "chronic" }
          ]
        },

        {
          type: "row",
          fields: [
            {
              name: "mechanism_of_injury",
              label: "Mechanism of Injury",
              type: "input"
            },
            {
              name: "duration",
              label: "Duration",
              type: "input"
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              name: "aggravating_factors",
              label: "Aggravating Factors",
              type: "input"
            },
            {
              name: "relieving_factors",
              label: "Relieving Factors",
              type: "input"
            }
          ]
        },

        /* ================= PAIN ASSESSMENT ================= */
        {
          type: "subheading",
          label: "Pain Assessment"
        },

        {
          name: "nprs_land",
          label: "NPRS (Land)",
          type: "scale-slider",
          min: 0,
          max: 10,
          step: 1,
          showValue: true
        },

        {
          name: "nprs_water",
          label: "NPRS (Water)",
          type: "scale-slider",
          min: 0,
          max: 10,
          step: 1,
          showValue: true
        },

        {
          name: "pain_type",
          label: "Type",
          type: "radio",
          options: [
            { label: "Burning", value: "burning" },
            { label: "Dull", value: "dull" },
            { label: "Sharp", value: "sharp" },
            { label: "Neuropathic", value: "neuropathic" }
          ]
        },

        /* ================= FUNCTIONAL LIMITATIONS ================= */
        {
          type: "subheading",
          label: "Functional Limitations"
        },

        {
          name: "functional_limitations",
          type: "checkbox-group",
          options: [
            { label: "Walking", value: "walking" },
            { label: "Squatting", value: "squatting" },
            { label: "Stair climbing", value: "stair_climbing" },
            { label: "Transfers", value: "transfers" },
            { label: "Endurance", value: "endurance" },
            { label: "ADL limitation", value: "adl_limitation" }
          ]
        },

        /* ================= PATIENT GOALS ================= */
        {
          name: "patient_goals",
          label: "Patient Goals / Expectations",
          type: "textarea"
        },

        /* ================= RELEVANT MEDICAL HISTORY ================= */
        {
          type: "subheading",
          label: "Relevant Medical History"
        },

        {
          name: "relevant_medical_history",
          type: "checkbox-group",
          options: [
            { label: "Cardiac condition", value: "cardiac" },
            { label: "Seizure disorder", value: "seizure" },
            { label: "Respiratory disorder", value: "respiratory" },
            { label: "Diabetes", value: "diabetes" },
            { label: "Open wound", value: "open_wound" },
            { label: "Skin condition", value: "skin_condition" },
            { label: "Infection", value: "infection" }
          ]
        }
      ]
    }
  ]
};

const OBJECTIVE_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  fields: [
    {
      type: "subheading",
      label: "Pre-Session Safety Screening"
    },
    {
      name: "pre_session_safety_screening",
      type: "checkbox-group",
      options: [
        { label: "No fever", value: "no_fever" },
        { label: "No open infected wound", value: "no_open_infected_wound" },
        { label: "No incontinence", value: "no_incontinence" },
        { label: "No uncontrolled hypertension", value: "no_uncontrolled_hypertension" },
        { label: "No unstable cardiac condition", value: "no_unstable_cardiac_condition" }
      ]
    },
    { type: "subheading", label: "Pre-Session Vitals" },
    {
      type: "row",
      fields: [
        { name: "obj_body_temp", label: "Body Temperature (°C)", type: "input", placeholder: "°C" },
        { name: "obj_heart_rate", label: "Heart Rate (/min)", type: "input", placeholder: "/min" },
        { name: "obj_resp_rate", label: "Respiratory Rate (/min)", type: "input", placeholder: "/min" }
      ]
    },
    {
      type: "row",
      fields: [
        { name: "obj_bp", label: "Blood Pressure (mmHg)", type: "input", placeholder: "e.g. 120/80" },
        { name: "obj_spo2", label: "Oxygen Saturation (SpO₂) (%)", type: "input", placeholder: "%" }
      ]
    },

    {
      name: "hydro_cleared_for_session",
      label: "Patient cleared for aquatic session",
      type: "radio",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      name: "hydro_cleared_for_session_reason",
      label: "If No, specify",
      type: "textarea",
      showIf: { field: "hydro_cleared_for_session", equals: "no" }
    },

    {
      name: "hydro_observation",
      label: "Observation",
      type: "checkbox-group",
      options: [
        { label: "Posture", value: "posture" },
        { label: "Swelling / edema", value: "swelling_edema" },
        { label: "Skin changes", value: "skin_changes" },
        { label: "Atrophy", value: "atrophy" },
        { label: "Deformity", value: "deformity" }
      ]
    },
    {
      name: "hydro_gait_assessment",
      label: "Gait Assessment",
      type: "checkbox-group",
      options: [
        { label: "Antalgic", value: "antalgic" },
        { label: "Reduced step length", value: "reduced_step_length" },
        { label: "Reduced cadence", value: "reduced_cadence" },
        { label: "Assistive device", value: "assistive_device" }
      ]
    },
    {
      name: "hydro_gait_assistive_device",
      label: "Assistive device (specify)",
      type: "input",
      showIf: { field: "hydro_gait_assessment", includes: "assistive_device" }
    },
    {
      name: "hydro_cognitive_status",
      label: "Cognitive Status",
      type: "radio",
      options: [
        { label: "Able to follow commands", value: "able" },
        { label: "Unable to follow commands", value: "unable" },
        { label: "Requires supervision", value: "supervision" }
      ]
    },
    {
      name: "hydro_wound_assessment",
      label: "Wound Assessment (if applicable)",
      type: "radio",
      options: [
        { label: "Present", value: "present" },
        { label: "Healed", value: "healed" },
        { label: "Covered appropriately", value: "covered" }
      ]
    },

    { type: "subheading", label: "ROM (Goniometry)" },
    {
      type: "dynamic-section",
      name: "hydro_rom_blocks",
      fields: [
        {
          type: "row",
          fields: [
            { name: "joint", label: "Joint", type: "input", placeholder: "e.g. Knee flexion" },
            { name: "baseline", label: "Baseline (°)", type: "input", placeholder: "e.g. 90°" },
            { name: "current", label: "Current (°)", type: "input", placeholder: "e.g. 110°" }
          ]
        }
      ]
    },

    { type: "subheading", label: "Manual Muscle Testing (MMT)" },
    {
      type: "dynamic-section",
      name: "hydro_mmt_blocks",
      fields: [
        {
          type: "row",
          fields: [
            { name: "muscle_group", label: "Muscle Group", type: "input", placeholder: "e.g. Quadriceps" },
            { name: "baseline", label: "Baseline (/5)", type: "input", placeholder: "e.g. 3/5" },
            { name: "current", label: "Current (/5)", type: "input", placeholder: "e.g. 4/5" }
          ]
        }
      ]
    },

    { type: "subheading", label: "Balance & Functional Tests" },
    {
      type: "row",
      fields: [
        { name: "test_sls", label: "Single Leg Stand (SLS) – seconds", type: "input", placeholder: "sec" },
        { name: "test_tug", label: "TUG – seconds", type: "input", placeholder: "sec" },
        { name: "test_30s_sit_to_stand", label: "30-sec Sit-to-Stand – reps", type: "input", placeholder: "reps" }
      ]
    },

    { type: "subheading", label: "Outcome Measures (Standardized)" },
    {
      name: "hydro_outcome_measures",
      type: "assessment-launcher",
      options: [
        { label: "WOMAC – pain, stiffness, physical function", value: "womac" },
        { label: "LEFS – lower extremity functional scale", value: "lefs" },
        { label: "Berg Balance Scale", value: "berg" },
        { label: "DASH – upper limb disability", value: "dash" },
        { label: "6-Minute Walk Test (6MWT)", value: "six_mwt" }
      ]
    },

    { type: "subheading", label: "Hydrotherapy Environmental Parameters" },
    {
      name: "hydro_pool_type",
      label: "Pool Type",
      type: "radio",
      options: [
        { label: "Therapeutic", value: "therapeutic" },
        { label: "Underwater treadmill", value: "underwater_treadmill" }
      ]
    },
    {
      name: "hydro_water_temp",
      label: "Water Temperature (°C)",
      type: "input",
      placeholder: "e.g. 32"
    },
    {
      name: "hydro_water_depth",
      label: "Water Depth",
      type: "radio",
      options: [
        { label: "Waist", value: "waist" },
        { label: "Chest", value: "chest" },
        { label: "Neck", value: "neck" }
      ]
    },
    {
      name: "hydro_buoyancy_equipment",
      label: "Buoyancy Equipment",
      type: "radio",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      name: "hydro_resistance_equipment",
      label: "Resistance Equipment",
      type: "radio",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      name: "hydro_therapist_assist_level",
      label: "Therapist Assistance Level",
      type: "radio",
      labelAbove: true,
      options: [
        { label: "Independent", value: "independent" },
        { label: "Supervision", value: "supervision" },
        { label: "Stand-By Assist", value: "sba" },
        { label: "Contact Guard Assist", value: "cga" },
        { label: "Minimal Assistance", value: "min_a" },
        { label: "Moderate Assistance", value: "mod_a" },
        { label: "Maximal Assistance", value: "max_a" }
      ]
    },

    { type: "subheading", label: "Hydrotherapy Treatment Provided Today" },
    {
      name: "hydro_treatment_today",
      type: "checkbox-group",
      options: [
        { label: "Warm-up / aquatic gait", value: "warmup_gait" },
        { label: "Resistance exercises with buoyancy equipment", value: "resistance_buoyancy" },
        { label: "Balance & stability activities", value: "balance_stability" },
        { label: "Bad Ragaz Ring Method (BRRM)", value: "brrm" },
        { label: "Water Specific Therapy (WST)", value: "wst" },
        { label: "Ai Chi", value: "ai_chi" },
        { label: "Back exercises", value: "back_exercises" },
        { label: "Stretching in water", value: "stretching" },
        { label: "Pain management techniques", value: "pain_management" },
        { label: "Proprioceptive training", value: "proprioceptive" },
        { label: "Endurance training", value: "endurance_training" }
      ]
    },
    {
      name: "hydro_duration_minutes",
      label: "Duration (minutes)",
      type: "input",
      placeholder: "e.g. 30"
    },

    { type: "subheading", label: "Response During Session" },
    {
      name: "hydro_pain_reduced_to",
      label: "Pain reduced to (0–10)",
      type: "scale-slider",
      min: 0,
      max: 10,
      step: 1,
      ranges: [
        { min: 0, max: 10, label: "Pain scale", color: "#22c55e" }
      ],
      showValue: true
    },
    {
      name: "hydro_response_improvements",
      type: "checkbox-group",
      options: [
        { label: "Improved ROM", value: "improved_rom" },
        { label: "Improved gait symmetry", value: "improved_gait" },
        { label: "Improved balance", value: "improved_balance" },
        { label: "Improved endurance", value: "improved_endurance" }
      ]
    },
    {
      name: "hydro_adverse_event",
      label: "Adverse Event",
      type: "radio",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      name: "hydro_adverse_event_details",
      label: "Adverse Event Details",
      type: "textarea",
      showIf: { field: "hydro_adverse_event", equals: "yes" }
    },

    { type: "subheading", label: "Post-Session Vitals" },
    {
      type: "row",
      fields: [
        { name: "post_bp", label: "BP (mmHg)", type: "input", placeholder: "e.g. 120/80" },
        { name: "post_hr", label: "HR (/min)", type: "input", placeholder: "/min" },
        { name: "post_spo2", label: "SpO₂ (%)", type: "input", placeholder: "%" }
      ]
    },
    {
      name: "patient_stable_post_session",
      label: "Patient stable post-session",
      type: "radio",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      name: "patient_stable_post_session_reason",
      label: "If No, specify",
      type: "textarea",
      showIf: { field: "patient_stable_post_session", equals: "no" }
    }
  ]
};

const ASSESSMENT_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  fields: [
    {
      name: "hydro_clinical_impression",
      label: "Clinical Impression",
      type: "textarea"
    },

    {
      name: "hydro_problem_list",
      label: "Problem List",
      type: "checkbox-group",
      options: [
        { label: "Pain on weight-bearing", value: "pain_weight_bearing" },
        { label: "Decreased ROM", value: "decreased_rom" },
        { label: "Muscle weakness", value: "muscle_weakness" },
        { label: "Balance deficits", value: "balance_deficits" },
        { label: "Proprioception deficit", value: "proprioception_deficit" },
        { label: "Reduced endurance", value: "reduced_endurance" }
      ]
    },

    { type: "subheading", label: "Progress Since Last Session" },
    {
      type: "grid-table-flat",
      name: "hydro_progress",
      headers: ["Baseline", "Current", "% Change"],
      rows: [
        { key: "pain", label: "Pain" },
        { key: "rom", label: "ROM" },
        { key: "tug", label: "TUG" },
        { key: "sts", label: "STS" }
      ]
    },

    {
      name: "hydro_prognosis",
      label: "Prognosis",
      type: "radio",
      options: [
        { label: "Good", value: "good" },
        { label: "Fair", value: "fair" },
        { label: "Guarded", value: "guarded" }
      ]
    }
  ]
};

const PLAN_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  fields: [
    {
      type: "subheading",
      label: "Short Term Goals"
    },
    {
      type: "dynamic-section",
      name: "hydro_shortterm_blocks",
      fields: [
        { name: "shortterm_goals", label: "Goals (Functional Task)", type: "input" },
        {
          name: "shortterm_assist_level",
          label: "Assist Level",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Independent", value: "independent" },
            { label: "Supervision", value: "supervision" },
            { label: "Stand-by Assist", value: "sba" },
            { label: "Contact Guard Assist", value: "cga" },
            { label: "Minimal Assist", value: "min_a" },
            { label: "Moderate Assist", value: "mod_a" },
            { label: "Maximum Assist", value: "max_a" }
          ]
        },
        { name: "shortterm_device", label: "Device/Prosthesis Used", type: "input" },
        { name: "shortterm_context", label: "Context (Where/Condition)", type: "input" },
        { name: "shortterm_target", label: "Measurable Target", type: "input" },
        { name: "shortterm_target_date", label: "Target Date", type: "date" }
      ]
    },

    {
      type: "subheading",
      label: "Long Term Goals"
    },
    {
      type: "dynamic-section",
      name: "hydro_longterm_blocks",
      fields: [
        { name: "longterm_goals", label: "Goals (Functional Task)", type: "input" },
        {
          name: "longterm_assist_level",
          label: "Assist Level",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Independent", value: "independent" },
            { label: "Supervision", value: "supervision" },
            { label: "Stand-by Assist", value: "sba" },
            { label: "Contact Guard Assist", value: "cga" },
            { label: "Minimal Assist", value: "min_a" },
            { label: "Moderate Assist", value: "mod_a" },
            { label: "Maximum Assist", value: "max_a" }
          ]
        },
        { name: "longterm_device", label: "Device/Prosthesis Used", type: "input" },
        { name: "longterm_context", label: "Context (Where/Condition)", type: "input" },
        { name: "longterm_target", label: "Measurable Target", type: "input" },
        { name: "longterm_target_date", label: "Target Date", type: "date" }
      ]
    },

    {
      type: "subheading",
      label: "Intervention Plan"
    },
    {
      name: "hydro_intervention_plan",
      type: "checkbox-group",
      options: [
        { label: "Increase resistance", value: "increase_resistance" },
        { label: "Reduce water depth", value: "reduce_water_depth" },
        { label: "Progress balance", value: "progress_balance" },
        { label: "Reassess ROM/MMT", value: "reassess_rom_mmt" },
        { label: "Advance endurance", value: "advance_endurance" }
      ]
    },

    {
      type: "subheading",
      label: "Informed Consent"
    },
    {
      name: "hydro_patient_education",
      label: "Patient Education",
      type: "checkbox-group",
      options: [
        { label: "Risks explained", value: "risks" },
        { label: "Benefits explained", value: "benefits" },
        { label: "Alternatives explained", value: "alternatives" }
      ]
    },
    {
      name: "hydro_approval",
      label: "Approval",
      type: "checkbox-group",
      options: [
        {
          label: "Patient verbalized understanding and consented to aquatic therapy.",
          value: "patient_consented"
        }
      ]
    }
  ]
};

const HYDRO_ASSESSMENT_REGISTRY = {
  berg: BergBalanceScale
};

/* ===================== MAIN HYDRO ===================== */

export default function Hydro({ patient }) {
  const [values, setValues] = useState({});
  const [activeTab, setActiveTab] = useState("subjective");

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      referred_by: patient.case_manager || "",
      referral_reasons: patient.diagnosis_history || patient.icd || ""
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  return (
    <div style={mainContent}>

      {/* ===== PATIENT INFO ===== */}
      <CommonFormBuilder
        schema={HYDRO_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => {}}
      >
        <HydroPatientInfo patient={patient} />
      </CommonFormBuilder>

      {/* ===== CONSENT ===== */}
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
        assessmentRegistry={HYDRO_ASSESSMENT_REGISTRY}
      />
    </div>
  );
}

/* ===================== STYLES (SAME AS NEURO) ===================== */

const mainContent = { margin: "0 auto" };

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

const section = { marginBottom: 24 };

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};