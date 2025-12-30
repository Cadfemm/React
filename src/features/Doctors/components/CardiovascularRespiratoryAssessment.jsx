import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";


export default function CardioRespiratoryAssessment() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [openNYHA, setOpenNYHA] = useState(false);
  const [openSTOP, setOpenSTOP] = useState(false);

  const [nyhaClass, setNyhaClass] = useState("");
  const [stopBangScore, setStopBangScore] = useState(null);

  const onChange = (name, value) =>
    setValues(v => ({ ...v, [name]: value }));

 
  const SCHEMA = {
    title: "Cardiovascular & Respiratory Assessment",
    sections: [
      {
        title: "Respiratory – Symptoms",
        fields: [
          yn("dyspnoea_rest", "Dyspnoea at rest"),
          yn("dyspnoea_exertion", "Dyspnoea on exertion"),
          yn("orthopnoea", "Orthopnoea"),
          yn("pnd", "Paroxysmal nocturnal dyspnoea"),
          yn("cough", "Cough"),
          yn("sputum", "Sputum"),
          yn("wheeze", "Wheeze"),
          yn("chest_pain_resp", "Chest pain"),
          yn("fatigue_resp", "Fatigue"),
          yn("weight_loss", "Weight loss")
        ]
      },

      /* ================= RESPIRATORY – PAST HISTORY ================= */
      {
        title: "Respiratory – Past History",
        fields: [
          yn("copd", "COPD"),
          yn("asthma", "Asthma"),
          yn("pneumonia", "Pneumonia"),
          yn("smoking_resp", "Smoking"),
          yn("environment_exposure", "Exposure to environmental pollutants"),
          yn("recent_infections", "Recent infections"),
          yn("aspiration_risk", "Aspiration risk"),
          yn("tracheostomy", "Tracheostomy"),
          yn("ventilation", "Ventilation")
        ]
      },

      /* ================= RESPIRATORY – EXAMINATION ================= */
      {
        title: "Respiratory – Examination",
        fields: [
          yn("cyanosis", "Cyanosis"),
          yn("clubbing", "Clubbing"),
          yn("oedema_resp", "Oedema"),
          yn("accessory_muscles", "Use of accessory muscles"),
          yn("symmetry_expansion", "Symmetry of expansion"),
          yn("auscultation_resp", "Auscultation"),
          {
            type: "textarea",
            label: "Please specify",
            name: "resp_ausc_notes"
          },
          yn("cough_strength", "Cough strength")
        ]
      },

      {
        title: "Cardiovascular – Symptoms",
        fields: [
          yn("chest_pain_cardio", "Chest pain"),
          yn("palpitations", "Palpitations"),
          yn("syncope", "Syncope / Pre syncope"),
          yn("dyspnoea_exertion_cardio", "Dyspnoea on exertion"),
          yn("orthopnea_cardio", "Orthopnea"),
          yn("ankle_swelling", "Ankle swelling"),
          yn("fatigue_cardio", "Fatigue"),
          yn("exercise_tolerance", "Exercise tolerance")
        ]
      },

      {
        title: "Cardiovascular – Past History",
        fields: [
          yn("prior_mi", "Prior MI"),
          yn("heart_failure", "Heart failure"),
          yn("arrhythmias", "Arrhythmias"),
          yn("hypertension", "Hypertension"),
          yn("dyslipidaemia", "Dyslipidaemia"),
          yn("valve_disease", "Valve disease"),
          yn("echo_done", "ECHO done")
        ]
      },

      {
        title: "Cardiovascular – Risk Factors",
        fields: [
          yn("smoking_cardio", "Smoking"),
          yn("dm", "DM"),
          yn("dyslipidemia", "Dyslipidemia"),
          yn("family_hx_cvd", "Family H/O CVD")
        ]
      },

      {
        title: "Vital Signs",
        fields: [
          {
            type: "input",
            label: "HEART RATE (beats/min)",
            name: "heart_rate"
          },
          {
            type: "input",
            label: "ECG",
            name: "ecg"
          },
          {
            type: "input",
            label: "BLOOD PRESSURE SITTING (mmHg)",
            name: "bp_sitting"
          },
          {
            type: "input",
            label: "BLOOD PRESSURE STANDING (mmHg)",
            name: "bp_standing"
          },
          {
            type: "input",
            label: "RESPIRATORY RATE (breath/min)",
            name: "resp_rate"
          },
          yn("crt", "CRT <2SEC"),
          {
            type: "input",
            label: "SKIN COLOUR",
            name: "skin_colour"
          },
          yn("radial_pulse", "RADIAL PULSE"),
          yn("dorsalis_pedis", "DORSALIS PEDIS"),
          yn("posterior_tibialis", "POSTERIOR TIBIALIS"),
          yn("jvp_raised", "JVP RAISED"),
          yn("oedema", "OEDEMA"),
          {
            type: "single-select",
            label: "PITTING / NON PITTING",
            name: "oedema_type",
            options: [
              { label: "PITTING", value: "PITTING" },
              { label: "NON PITTING", value: "NON PITTING" }
            ]
          }
        ]
      },

      {
        title: "Auscultation",
        fields: [
          yn("s1s2", "S1, S2"),
          yn("extra_sounds", "EXTRA SOUNDS"),
          yn("crepitations", "CREPITATIONS"),
          yn("carotid_bruits", "CAROTID BRUITS"),
          yn("abi_assessment", "FOR ABI ASSESSMENT")
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
      >
        <div style={btnRow}>
          <button style={pillBtn} onClick={() => setOpenNYHA(true)}>
            NYHA Classification
          </button>
          <button style={pillBtn} onClick={() => setOpenSTOP(true)}>
            STOP-BANG Questionnaire
          </button>
        </div>

        {nyhaClass && <Score label="NYHA Class" value={nyhaClass} />}
        {stopBangScore !== null && (
          <Score label="STOP-BANG Score" value={stopBangScore} />
        )}

       
      </CommonFormBuilder>

      {openNYHA && (
        <NYHAModal
          onSave={setNyhaClass}
          onClose={() => setOpenNYHA(false)}
        />
      )}

      {openSTOP && (
        <STOPBangModal
          onSave={setStopBangScore}
          onClose={() => setOpenSTOP(false)}
        />
      )}
    </>
  );
}

const yn = (name, label) => ({
  type: "radio",
  name,
  label,
  options: [
    { label: "YES", value: "YES" },
    { label: "NO", value: "NO" }
  ]
});

const Score = ({ label, value }) => (
  <div style={scoreBox}>
    <strong>{label}:</strong> {value}
  </div>
);

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
          style={{ ...nyhaRow, background: selected === o[0] ? "#eef6ff" : "#fafafa" }}
          onClick={() => setSelected(o[0])}
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

const btnRow = { display: "flex", gap: 12, marginTop: 20 };
const pillBtn = { padding: "8px 16px", borderRadius: 999, border: "1px solid #c7d2fe", background: "#eef2ff", fontWeight: 600 };
const saveBtn = { marginTop: 20, padding: "10px 18px", background: "#111827", color: "#fff", borderRadius: 8 };
const scoreBox = { marginTop: 12, padding: 12, background: "#eef6ff", borderRadius: 8 };

const overlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", justifyContent: "center", alignItems: "center" };
const modal = { background: "#fff", padding: 24, borderRadius: 16, width: "90%", maxWidth: 800 };
const modalFooter = { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 };
const cancelBtn = { padding: "10px 18px", borderRadius: 999, border: "1px solid #c7d2fe", background: "#eef2ff", fontWeight: 600 };
const saveBtnModal = { padding: "10px 22px", borderRadius: 999, border: "none", background: "#2563eb", color: "#fff", fontWeight: 600 };

const stopRow = { display: "grid", gridTemplateColumns: "1fr 90px 90px", alignItems: "center", marginBottom: 12 };
const radioLabel = { display: "flex", alignItems: "center", gap: 6 };
const nyhaRow = { padding: 12, border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 10, cursor: "pointer" };
