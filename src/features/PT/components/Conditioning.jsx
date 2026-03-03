import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export const CONDITIONING_ASSESSMENT_REGISTRY = {};

export default function Conditioning({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

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
    title: "Subjective",
    sections: [

      /* ===================================================== */
      /* PATIENT HISTORY                                       */
      /* ===================================================== */

      {
        title: "Patient History",
        fields: [

          {
            type: "textarea",
            name: "chief_complaint",
            label: "Chief Complaint"
          },
          {
            type: "textarea",
            name: "history_present_illness",
            label: "History of Present Illness"
          },
          {
            type: "textarea",
            name: "patient_goals",
            label: "Patient's Goals / Expectations"
          },
          {
            type: "textarea",
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
            type: "textarea",
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

  const OBJECTIVE_SCHEMA = {
    title: "Objective",
    sections: [
       {
        title: "",
        fields: [
         {
      name: "neuro_scales",
      type: "assessment-launcher",
      options: [
        { label: "6MWT", value: "6mwt" },
        { label: "Muscle meter", value: "mmt" },
        { label: "Y balance", value: "y_balance" },
        { label: "Leg press symmetry", value: "fac" },
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
      /* MUSCULOSKELETAL ASSESSMENT - MMT                      */
      /* ===================================================== */

      {
        title: "Musculoskeletal Assessment - MMT",
        fields: [

          {
            type: "grid-table-flat",
            name: "mmt_table",
            headers: ["Left", "Right", "Interpretation"],
            rows: [
              { key: "hip_flexors", label: "Hip Flexors" },
              { key: "knee_extensors", label: "Knee Extensors" },
              { key: "ankle_df", label: "Ankle DF" },
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
                type: "textarea",
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
    title: "Assessment",
    sections: [

      /* ===================================================== */
      /* REHABILITATION ASSESSMENT                             */
      /* ===================================================== */

      {
        title: "Assessment",
        fields: [

          {
            type: "textarea",
            name: "problem_list",
            label: "Problem List"
          },

          {
            type: "textarea",
            name: "clinical_impression",
            label: "Clinical Impression"
          },

          {
            type: "radio",
            name: "rehabilitation_prognosis",
            label: "Rehabilitation Potential / Prognosis",
            options: ["Good", "Poor", "Excellent", "Fair"]
          }

        ]
      }

    ]
  };

  const PLAN_SCHEMA = {
    title: "Plan",
    sections: [

      /* ===================================================== */
      /* SHORT TERM GOALS                                      */
      /* ===================================================== */

      {
        title: "Short Term Goals",
        fields: [
          {
            type: "dynamic-section",
            name: "short_term_goals",
            addButtonLabel: "Add Short Term Goal",
            fields: [

              { type: "input", name: "goal", label: "Goal (Functional Task)" },

              {
                type: "single-select",
                name: "assist_level",
                label: "Assist Level",
                options: [
                  { label: "Independent", value: "Independent" },
                  { label: "Supervision", value: "Supervision" },
                  { label: "Stand-by Assist (SBA)", value: "SBA" },
                  { label: "Contact Guard Assist (CGA)", value: "CGA" },
                  { label: "Minimal Assist (Min A)", value: "MinAssist" },
                  { label: "Moderate Assist (Mod A)", value: "ModAssist" },
                  { label: "Maximum Assist (Max A)", value: "MaxAssist" }
                ]
              },

              { type: "input", name: "device", label: "Device / Prosthesis Used" },

              { type: "input", name: "context", label: "Context (Where / Condition)" },

              { type: "input", name: "target", label: "Measurable Target" },

              { type: "date", name: "target_date", label: "Target Date" }

            ]
          }
        ]
      },

      /* ===================================================== */
      /* LONG TERM GOALS                                       */
      /* ===================================================== */

      {
        title: "Long Term Goals",
        fields: [
          {
            type: "dynamic-section",
            name: "long_term_goals",
            addButtonLabel: "Add Long Term Goal",
            fields: [

              { type: "input", name: "goal", label: "Goal (Functional Task)" },

              {
                type: "single-select",
                name: "assist_level",
                label: "Assist Level",
                options: [
                  { label: "Independent", value: "Independent" },
                  { label: "Supervision", value: "Supervision" },
                  { label: "Stand-by Assist (SBA)", value: "SBA" },
                  { label: "Contact Guard Assist (CGA)", value: "CGA" },
                  { label: "Minimal Assist (Min A)", value: "MinAssist" },
                  { label: "Moderate Assist (Mod A)", value: "ModAssist" },
                  { label: "Maximum Assist (Max A)", value: "MaxAssist" }
                ]
              },

              { type: "input", name: "device", label: "Device / Prosthesis Used" },

              { type: "input", name: "context", label: "Context (Where / Condition)" },

              { type: "input", name: "target", label: "Measurable Target" },

              { type: "date", name: "target_date", label: "Target Date" }

            ]
          }
        ]
      },

      /* ===================================================== */
      /* STRENGTH CONDITIONING                                 */
      /* ===================================================== */

      {
        title: "Strength Conditioning",
        fields: [

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

          {
            type: "textarea",
            name: "strength_notes",
            label: "Strength Conditioning Notes"
          }

        ]
      },

      /* ===================================================== */
      /* ENDURANCE                                              */
      /* ===================================================== */

      {
        title: "Endurance Training",
        fields: [

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

          { type: "textarea", name: "endurance_notes", label: "Endurance Notes" }

        ]
      },

      /* ===================================================== */
      /* BALANCE                                                */
      /* ===================================================== */

      {
        title: "Balance Training",
        fields: [

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

          { type: "textarea", name: "balance_notes", label: "Balance Notes" }

        ]
      },

      /* ===================================================== */
      /* HOME PROGRAM                                           */
      /* ===================================================== */

      {
        title: "Home Program",
        fields: [

          {
            type: "checkbox-group",
            name: "home_program_exercises",
            label: "Select Home Exercises",
            options: [
              { label: "Heel Raises × 15 reps × 3 sets", value: "heel_raises" },
              { label: "Sit-to-Stand × 10 reps × 3 sets", value: "sit_to_stand" },
              { label: "15 min Walking Daily", value: "walking" },
              { label: "Stair Climbing (If Available)", value: "stairs" },
              { label: "Quadriceps Sets × 15 reps × 3 sets", value: "quad_sets" },
              { label: "Gluteal Sets × 15 reps × 3 sets", value: "glute_sets" }
            ]
          },

          { type: "textarea", name: "home_instructions", label: "Home Program Instructions" },

          { type: "input", name: "home_frequency", label: "Frequency (e.g., 3×/week)" }

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
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const today = new Date();

  const calculateDuration = (onset) => {
    if (!onset) return "-";
    const onsetDate = new Date(onset);
    const diffMs = today - onsetDate;

    if (diffMs < 0) return "-";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  function ConditioningPatientInfo({ patient }) {
    if (!patient) return null;

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


  return (
    <div style={mainContent}>

      {/* ===== PATIENT INFORMATION CARD ===== */}
      <CommonFormBuilder
        schema={CONDITIONING_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => { }}
      >
        <ConditioningPatientInfo patient={patient} />
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
