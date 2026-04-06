import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";


export default function CardioRespiratoryAssessment() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) =>
    setValues(v => ({ ...v, [name]: value }));

  const stopBangScoreRaw = values.stop_bang_score_display;
  const stopBangScore = Number.isFinite(Number(stopBangScoreRaw))
    ? Number(stopBangScoreRaw)
    : null;

 
const showIfYes = (field) => ({ field, equals: "Yes" });

const SCHEMA = {
  title: "Cardiovascular & Respiratory Assessment",
  sections: [
    {
      title: "",
      fields: [
        // { type: "heading", label: "Symptoms" },

        // =========================
        // RESPIRATORY
        // =========================
       {
          ...yn("respiratory_section", "Respiratory Symptoms"),
          options: [
            { label: "Issue", value: "Yes" },
            { label: "No Issue", value: "No" }
          ]
        },

        { ...yn("cough", "Cough"), showIf: showIfYes("respiratory_section") },
        {
          type: "radio",
          name: "cough_type",
          label: "Cough Type",
          options: [
            { label: "Productive", value: "productive" },
            { label: "Non-Productive", value: "non_productive" }
          ],
          showIf: {
            field: "cough",
            equals: "Yes",
            and: showIfYes("respiratory_section")
          }
        },

        { ...yn("sputum", "Sputum"), showIf: showIfYes("respiratory_section") },
        {
          type: "checkbox-group",
          name: "sputum_color",
          label: "Sputum Color",
          options: [
            { label: "Whitish", value: "whitish" },
            { label: "Yellowish", value: "yellowish" },
            { label: "Greenish", value: "greenish" },
            { label: "Pinkish", value: "pinkish" },
            { label: "Reddish", value: "reddish" }
          ],
          showIf: {
            field: "sputum",
            equals: "Yes",
            and: showIfYes("respiratory_section")
          }
        },
        {
          type: "checkbox-group",
          name: "sputum_quantity",
          label: "Sputum Quantity",
          options: [
            { label: "Minimal", value: "minimal" },
            { label: "Moderate", value: "moderate" },
            { label: "Large", value: "large" }
          ],
          showIf: {
            field: "sputum",
            equals: "Yes",
            and: showIfYes("respiratory_section")
          }
        },

        { ...yn("wheeze", "Wheeze"), showIf: showIfYes("respiratory_section") },
        { ...yn("chest_pain", "Chest Pain"), showIf: showIfYes("respiratory_section") },
        { ...yn("dyspnoea", "Dyspnoea"), showIf: showIfYes("respiratory_section") },

        {
          type: "checkbox-group",
          name: "dyspnoea_type",
          label: "Dyspnoea Type",
          options: [
            { label: "At rest", value: "at_rest" },
            { label: "On exertion", value: "on_exertion" }
          ],
          showIf: {
            field: "dyspnoea",
            equals: "Yes",
            and: showIfYes("respiratory_section")
          }
        },

        { ...yn("orthopnoea", "Orthopnoea"), showIf: showIfYes("respiratory_section") },
        { ...yn("paroxysmal_nocturnal_dyspnoea", "Paroxysmal Nocturnal Dyspnoea"), showIf: showIfYes("respiratory_section") },
        { ...yn("fatigue", "Fatigue"), showIf: showIfYes("respiratory_section") },
        { ...yn("weight_loss", "Weight Loss"), showIf: showIfYes("respiratory_section") },

        { ...yn("oxygen_requirement", "Oxygen Requirement"), showIf: showIfYes("respiratory_section") },
        {
          type: "radio",
          name: "oxygen_mode",
          label: "Oxygen Mode",
          options: [
            { label: "Nasal Prong", value: "nasal_prong" },
            { label: "Face Mask", value: "face_mask" },
            { label: "High Flow", value: "high_flow" },
            { label: "Others", value: "others" }
          ],
          showIf: {
            field: "oxygen_requirement",
            equals: "Yes",
            and: showIfYes("respiratory_section")
          }
        },
        {
          type: "input",
          name: "oxygen_free_text",
          label: "Oxygen Free text",
          showIf: {
            field: "oxygen_requirement",
            equals: "Yes",
            and: {
              field: "oxygen_mode",
              equals: "others"
            }
          }
        },

        // =========================
        // CARDIOVASCULAR (NOW SAME STYLE ✅)
        // =========================
        {
            ...yn("cardio_section", "Cardiovascular Symptoms"),
            options: [
              { label: "Issue", value: "Yes" },
              { label: "No Issue", value: "No" }
            ]
          },

        { ...yn("palpitations", "Palpitations"), showIf: showIfYes("cardio_section") },
        { ...yn("syncope_presyncope", "Syncope / Pre-syncope"), showIf: showIfYes("cardio_section") },
        { ...yn("ankle_swelling", "Ankle Swelling"), showIf: showIfYes("cardio_section") },
        { ...yn("exercise_intolerance", "Exercise Intolerance"), showIf: showIfYes("cardio_section") },
        { ...yn("fluid_restriction", "Fluid Restriction"), showIf: showIfYes("cardio_section") },

        {
          type: "textarea",
          name: "other_symptoms",
          label: "Other Symptoms",
          showIf: showIfYes("cardio_section")
        },

          { type: "heading", label: "Past Medical History" },
          yn("pmh_copd", "COPD"),
          yn("pmh_asthma", "Asthma"),
          yn("pmh_osa", "Obstructive Sleep Apnea (OSA)"),
          yn("pmh_recent_infections", "Recent Infections"),
          {
            type: "input",
            name: "pmh_recent_infections_specify",
            label: "Recent Infections (Specify)",
            showIf: { field: "pmh_recent_infections", equals: "Yes" }
          },
          yn("pmh_tracheostomy", "Tracheostomy"),
          {
            type: "date",
            name: "pmh_tracheostomy_last_change_date",
            label: "Last change date",
            showIf: { field: "pmh_tracheostomy", equals: "Yes" }
          },
          { type: "input", name: "pmh_prior_mi", label: "Prior Myocardial Infarction" },
          { type: "input", name: "pmh_heart_failure", label: "Heart Failure" },
          { type: "input", name: "pmh_arrhythmias", label: "Arrhythmias" },
          yn("pmh_hypertension", "Hypertension"),
          yn("pmh_dyslipidaemia", "Dyslipidaemia"),
          yn("pmh_diabetes_mellitus", "Diabetes Mellitus"),
          {
            type: "radio",
            name: "pmh_valve_disease",
            label: "Valve Disease",
            options: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" }
            ]
          },
          {
            type: "input",
            name: "pmh_valve_disease_details",
            label: "Specify",
            showIf: { field: "pmh_valve_disease", equals: "Yes" }
          },

          {
            type: "radio",
            name: "pmh_previous_surgery",
            label: "Previous Surgery",
            options: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" }
            ]
          },
          {
            type: "input",
            name: "pmh_previous_surgery_details",
            label: "Specify",
            showIf: { field: "pmh_previous_surgery", equals: "Yes" }
          },
          yn("pmh_echo_done", "Echo Done"),
          {
            type: "checkbox-group",
            name: "echo_details",
            label: "Echo Details",
            options: [
              { label: "Ejection Fraction (%)", value: "ejection_fraction" },
              { label: "Regional Wall Motion Abnormality (RWMA)", value: "rwma" },
              { label: "Tricuspid Regurgitation (TR)", value: "tr" },
              { label: "Mitral Regurgitation (MR)", value: "mr" },
              { label: "Other", value: "other" }
            ],
            showIf: { field: "pmh_echo_done", equals: "Yes" }
          },
          {
            type: "input",
            name: "echo_details_specify",
            label: "Specify",
            showIf: {
              field: "pmh_echo_done",
              equals: "Yes",
              and: {
                or: [
                  { field: "echo_details", includes: "ejection_fraction" },
                  { field: "echo_details", includes: "rwma" },
                  { field: "echo_details", includes: "tr" },
                  { field: "echo_details", includes: "mr" },
                  { field: "echo_details", includes: "other" }
                ]
              }
            }
          },

          { type: "heading", label: "Risk Factors" },
          yn("risk_smoking", "Smoking"),
          yn("pmh_environment_exposure", "Environmental / Occupational Exposure"),
          yn("risk_stress", "Stress"),
          {
            type: "input",
            name: "risk_stress_specify",
            label: "Stress (Specify)",
            showIf: { field: "risk_stress", equals: "Yes" }
          },
          yn("risk_exercise", "Exercise"),
          {
            type: "input",
            name: "risk_exercise_specify",
            label: "Exercise (Specify)",
            showIf: { field: "risk_exercise", equals: "Yes" }
          },
          yn("risk_physical_activity", "Physical Activity"),
          {
            type: "input",
            name: "risk_physical_activity_specify",
            label: "Physical Activity (Specify)",
            showIf: { field: "risk_physical_activity", equals: "Yes" }
          },
          {
            type: "row",
            fields: [
              { type: "input", name: "height", label: "Height", readOnly: true, placeholder: "Auto-populated from registration" },
              { type: "input", name: "weight", label: "Weight", readOnly: true, placeholder: "Auto-populated from registration" },
              { type: "input", name: "bmi", label: "BMI", readOnly: true, placeholder: "Auto-populated from registration" }
            ]
          },

          { type: "heading", label: "Examination" },
          { type: "subheading", label: "General & Respiratory Examination" },
          {
            type: "radio",
            name: "speaking_ability",
            label: "Speaking Ability",
            options: [
              { label: "Full sentences", value: "full_sentences" },
              { label: "Short phrases", value: "short_phrases" },
              { label: "Words", value: "words" },
              { label: "Unable", value: "unable" }
            ]
          },
          yn("cyanosis", "Cyanosis"),
          yn("clubbing", "Clubbing"),
          yn("accessory_muscles", "Use of Accessory Muscles"),
          {
            type: "radio",
            name: "cough_effort",
            label: "Cough Effort",
            options: [
              { label: "Good", value: "good" },
              { label: "Poor", value: "poor" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            type: "input",
            name: "cough_effort_specify",
            label: "Cough Effort (Specify)",
            showIf: { field: "cough_effort", oneOf: ["poor", "absent"] }
          },
          {
            type: "radio",
            name: "respiratory_auscultation",
            label: "Auscultation (Respiratory)",
            labelAbove: true,
            options: [
              { label: "Clear", value: "clear" },
              { label: "Reduced Air Entry", value: "reduced_air_entry" },
              { label: "Absent", value: "absent" },
              { label: "Crepitations", value: "crepitations" },
              { label: "Rhonchi", value: "rhonchi" },
              { label: "Transmitted sounds", value: "transmitted_sounds" }
            ]
          },
          {
            type: "input",
            name: "respiratory_auscultation_specify",
            label: "Auscultation (Respiratory) (Specify)",
            showIf: {
              field: "respiratory_auscultation",
              oneOf: ["reduced_air_entry", "absent", "crepitations", "rhonchi", "transmitted_sounds"]
            }
          },

          { type: "subheading", label: "Cardiovascular Examination" },
          { type: "input", name: "heart_rate", label: "Heart Rate (bpm)", readOnly: true, placeholder: "Auto-populated" },
          {
            type: "row",
            fields: [
              { type: "input", name: "blood_pressure", label: "Blood Pressure" },
              {
                type: "radio",
                name: "bp_position",
                label: "Position",
                options: [
                  { label: "Lying", value: "lying" },
                  { label: "Sitting", value: "sitting" },
                  { label: "Standing", value: "standing" }
                ]
              }
            ]
          },
          {
            type: "row",
            fields: [
              { type: "input", name: "respiratory_rate", label: "Respiratory Rate", readOnly: true, placeholder: "Auto-populated" },
              { type: "input", name: "spo2", label: "SpO2 (%)", readOnly: true, placeholder: "Auto-populated" },
              { type: "input", name: "temperature", label: "Temperature (°C)", readOnly: true, placeholder: "Auto-populated" }
            ]
          },
          {
            type: "radio",
            name: "capillary_refill_time",
            label: "Capillary Refill Time",
            options: [
              { label: "<3 sec", value: "lt_3_sec" },
              { label: ">3 sec", value: "gt_3_sec" }
            ]
          },
          {
            type: "radio",
            name: "skin_colour",
            label: "Skin Colour",
            options: [
              { label: "Pink", value: "pink" },
              { label: "Pale", value: "pale" },
              { label: "Cyanosed", value: "cyanosed" },
              { label: "Others", value: "others" }
            ]
          },
          {
            type: "input",
            name: "skin_colour_specify",
            label: "Skin Colour (Specify)",
            showIf: { field: "skin_colour", equals: "others" }
          },
          {
            type: "radio",
            name: "pulse_volume",
            label: "Pulse Volume",
            options: [
              { label: "Strong", value: "strong" },
              { label: "Feeble", value: "feeble" },
              { label: "Not palpable", value: "not_palpable" }
            ]
          },
          {
            type: "radio",
            name: "pulse_rhythm",
            label: "Pulse Rhythm",
            options: [
              { label: "Regular", value: "regular" },
              { label: "Irregular", value: "irregular" }
            ]
          },
          {
            type: "radio",
            name: "dorsalis_pedis",
            label: "Dorsalis Pedis",
            options: [
              { label: "Strong", value: "strong" },
              { label: "Feeble", value: "feeble" },
              { label: "Not palpable", value: "not_palpable" }
            ]
          },
          {
            type: "radio",
            name: "posterior_tibial",
            label: "Posterior Tibial",
            options: [
              { label: "Strong", value: "strong" },
              { label: "Feeble", value: "feeble" },
              { label: "Not palpable", value: "not_palpable" }
            ]
          },
          yn("raised_jvp", "Raised Jugular Venous Pressure"),
          yn("oedema", "Oedema"),
          {
            type: "radio",
            name: "oedema_type",
            label: "Oedema Type",
            options: [
              { label: "Pitting", value: "pitting" },
              { label: "Non-pitting", value: "non_pitting" }
            ],
            showIf: { field: "oedema", equals: "Yes" }
          },
          {
            type: "radio",
            name: "cardiac_auscultation",
            label: "Cardiac Auscultation",
            labelAbove: true,
            options: [
              { label: "No Abnormality Detected", value: "no_abnormality_detected" },
              { label: "Murmurs", value: "murmurs" },
              { label: "S3", value: "s3" },
              { label: "S4", value: "s4" },
              { label: "Rubs", value: "rubs" },
              { label: "Gallops", value: "gallops" }
            ]
          },
          {
            type: "input",
            name: "cardiac_auscultation_specify",
            label: "Cardiac Auscultation (Specify)",
            showIf: {
              field: "cardiac_auscultation",
              oneOf: ["murmurs", "s3", "s4", "rubs", "gallops"]
            }
          },
          { type: "textarea", name: "examination_others", label: "Others" },

          { type: "heading", label: "Scoring & Classification" },
          {
            type: "assessment-launcher",
            name: "cardio_scoring_assessments",
            label: "",
            options: [
              { label: "NYHA Classification", value: "nyha" },
              { label: "STOP-BANG Questionnaire", value: "stopbang" }
            ]
          },
          {
            type: "input",
            name: "nyha_classification",
            label: "NYHA Classification",
            readOnly: true
          },
          {
            type: "input",
            name: "stop_bang_score_display",
            label: "STOP-BANG Score",
            readOnly: true
          },
          {
            type: "info-text",
            heading: "STOP-BANG Interpretation",
            text:
              stopBangScore === null
                ? "Enter STOP-BANG score using questionnaire."
                : stopBangScore >= 3
                  ? ">=3 → High Risk of OSA"
                  : "<3 → Low Risk of OSA"
          },

          { type: "heading", label: "Investigations" },
          {
            type: "input",
            name: "ecg_data",
            label: "ECG",
            readOnly: true,
            placeholder: "No reports are attached till now"
          },
          { type: "subheading", label: "Goals" },
          {
            type: "textarea",
            name: "cardiovascular_goals",
            placeholder: "Enter goals"
          },
          { type: "heading", label: "Plan" },
          {
            type: "checkbox-group",
            name: "plan_options",
            label: "",
            options: [
              { label: "Suction", value: "suction" },
              { label: "Nebuliser", value: "nebuliser" },
              { label: "Oxygen Supplement", value: "oxygen_supplement" },
              { label: "Incentive Spirometry", value: "incentive_spirometry" },
              { label: "High Frequency Chest Wall Oscillation (HFCWO)", value: "hfcwo" },
              { label: "Fluid Restriction Monitoring", value: "fluid_restriction_monitoring" },
              { label: "Serial ECG", value: "serial_ecg" },
              { label: "ABI Assessment", value: "abi_assessment" },
              { label: "BP Monitoring", value: "bp_monitoring" },
              { label: "Others", value: "others" }
            ]
          },
          {
              type: "input",
              name: "plan_specify",
              label: "Specify",
              showIf: {
                or: [
                  { field: "plan_options", includes: "suction" },
                  { field: "plan_options", includes: "nebuliser" },
                  { field: "plan_options", includes: "oxygen_supplement" },
                  { field: "plan_options", includes: "incentive_spirometry" },
                  { field: "plan_options", includes: "hfcwo" },
                  { field: "plan_options", includes: "fluid_restriction_monitoring" },
                  { field: "plan_options", includes: "serial_ecg" },
                  { field: "plan_options", includes: "abi_assessment" },
                  { field: "plan_options", includes: "bp_monitoring" },
                  { field: "plan_options", includes: "others" }
                ]
              }
            },
          {
            type: "radio",
            name: "bp_monitoring",
            label: "BP Monitoring",
            options: [
              { label: "Lying", value: "lying" },
              { label: "Upright", value: "upright" }
            ],
            showIf: { field: "plan_options", includes: "bp_monitoring" }
          }
        ]
      }
    ]
  };

  return (
    <>
      <CommonFormBuilder
        schema={SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        assessmentRegistry={CARDIO_SCORING_ASSESSMENT_REGISTRY}
      />
    </>
  );
}

const yn = (name, label) => ({
  type: "radio",
  name,
  label,
  options: [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" }
  ]
});

const cardioMatrix = (name, label) => ({
  type: "radio-matrix",
  name,
  label,
  matrixHeaderLabel: "",
  options: [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" }
  ]
});

function NYHAAssessmentLauncher({ onChange }) {
  return (
    <NYHAModal
      onSave={(selected) => {
        onChange("nyha_classification", selected);
        onChange("cardio_scoring_assessments_active", null);
      }}
      onClose={() => onChange("cardio_scoring_assessments_active", null)}
    />
  );
}

function STOPBangAssessmentLauncher({ onChange }) {
  return (
    <STOPBangModal
      onSave={(score) => {
        onChange("stop_bang_score_display", score);
        onChange("cardio_scoring_assessments_active", null);
      }}
      onClose={() => onChange("cardio_scoring_assessments_active", null)}
    />
  );
}

const CARDIO_SCORING_ASSESSMENT_REGISTRY = {
  nyha: NYHAAssessmentLauncher,
  stopbang: STOPBangAssessmentLauncher
};

function NYHAModal({ onSave, onClose }) {
  const options = [
    ["I", "Structural myocardial changes (e.g. left ventricular hypertrophy)"],
    ["II", "Small decrease in exercise tolerance"],
    ["III", "Significant decrease in exercise tolerance"],
    ["IV", "Symptoms of heart failure at rest or during small exercise"]
  ];
  const [selected, setSelected] = useState("");

  return (
    <Modal title="NYHA Classification">
      {options.map(o => (
        <div
          key={o[0]}
          style={{ ...nyhaRow, background: selected === o[0]+o[1] ? "#eef6ff" : "#fafafa" }}
          onClick={() => setSelected(o[0]+o[1])}
        >
          <strong>{o[0]}</strong> – {o[1]}
        </div>
      ))}
      <ModalFooter onCancel={onClose} onSave={() => { onSave(selected); onClose(); }} />
    </Modal>
  );
}

function STOPBangModal({ onSave, onClose }) {
  const questions = [
    "Snoring (Do you snore loudly?)",
    "Tiredness (Do you often feel tired, fatigued, or sleepy during the daytime?)",
    "Observed Apnea (Has anyone observed that you stop breathing during sleep?)",
    "High Blood Pressure (Being treated for hypertension?)",
    "BMI (Is your body mass index more than 35 kg per m²?)",
    "Age (Are you older than 50 years?)",
    "Neck Circumference (Is your neck circumference greater than 40 cm [15.75 inches]?)",
    "Gender (Are you male?)"
  ];

  const [answers, setAnswers] = useState(Array(8).fill(null));
  const score = answers.filter(v => v === true).length;

  return (
    <Modal title="STOP-BANG Questionnaire">
      {questions.map((q, i) => (
        <div key={i} style={stopRow}>
          <span>{q}</span>
          <label style={radioLabel}>
            <input type="radio" checked={answers[i] === true} onChange={() => setAnswers(a => a.map((v, x) => x === i ? true : v))} /> YES
          </label>
          <label style={radioLabel}>
            <input type="radio" checked={answers[i] === false} onChange={() => setAnswers(a => a.map((v, x) => x === i ? false : v))} /> NO
          </label>
        </div>
      ))}
      <ModalFooter onCancel={onClose} onSave={() => { onSave(score); onClose(); }} />
    </Modal>
  );
}

/* ================= MODAL BASE & STYLES ================= */
function Modal({ title, children }) {
  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ textAlign: "center" }}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function ModalFooter({ onCancel, onSave }) {
  return (
    <div style={modalFooter}>
      <button style={cancelBtn} onClick={onCancel}>Cancel</button>
      <button style={saveBtnModal} onClick={onSave}>Save</button>
    </div>
  );
}

const saveBtn = { marginTop: 20, padding: "10px 18px", background: "#111827", color: "#fff", borderRadius: 8 };

const overlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", justifyContent: "center", alignItems: "center" };
const modal = { background: "#fff", padding: 24, borderRadius: 16, width: "90%", maxWidth: 800 };
const modalFooter = { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 };
const cancelBtn = { padding: "10px 18px", borderRadius: 999, border: "1px solid #c7d2fe", background: "#eef2ff", fontWeight: 600 };
const saveBtnModal = { padding: "10px 22px", borderRadius: 999, border: "none", background: "#2563eb", color: "#fff", fontWeight: 600 };

const stopRow = { display: "grid", gridTemplateColumns: "1fr 90px 90px", alignItems: "center", marginBottom: 12 };
const radioLabel = { display: "flex", alignItems: "center", gap: 6 };
const nyhaRow = { padding: 12, border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 10, cursor: "pointer" };
