 
import React, { useState, useEffect } from "react";
import PatientCard from "../../../shared/cards/PatientCard";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

// 🌐 Translation helper
const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object") return text[lang] || text.en || "";
  return String(text);
};

// ✅ OPTIONS
const YES_NO_OPTIONS = [
  { value: "yes", label: { en: "Yes", ms: "Ya" } },
  { value: "no", label: { en: "No", ms: "Tidak" } }
];

const STOP_BANG_OPTIONS = [
  { value: "1_3", label: { en: "1-3 Items", ms: "1-3 Item" } },
  { value: "3_8", label: { en: "3-8 Items", ms: "3-8 Item" } }
];

const NIGHT_OPTIONS = [
  { value: "1", label: { en: "1 Night", ms: "1 Malam" } },
  { value: "2", label: { en: "2 Night", ms: "2 Malam" } },
  { value: "3", label: { en: "3 Night", ms: "3 Malam" } }
];

const TECHNICAL_AIRFLOW_OPTIONS = [
  { value: "rip_belts", label: { en: "Respiratory Effort: Thoracic and abdominal RIP belts", ms: "Usaha Pernafasan: Tali RIP toraks dan abdomen" } },
  { value: "spo2_pr", label: { en: "Oxygen saturation and Pulse Rate", ms: "Ketepuan oksigen dan Kadar Nadi" } },
  { value: "snoring", label: { en: "Snoring", ms: "Dengkuran" } }
];

const SCORING_TABLE_OPTIONS = [
  { value: "normal", label: { en: "0-5 Apnoea + hypopnoea events per hour / Normal", ms: "0-5 kejadian apnoea + hipopnoea sejam / Normal" } },
  { value: "mild", label: { en: "6-15 Apnoea + hypopnoea events per hour / Mild sleep apnoea", ms: "6-15 kejadian apnoea + hipopnoea sejam / Apnoea tidur ringan" } },
  { value: "moderate", label: { en: "16-29 Apnoea + hypopnoea events per hour / Moderate sleep apnoea", ms: "16-29 kejadian apnoea + hipopnoea sejam / Apnoea tidur sederhana" } },
  { value: "severe", label: { en: "30 Or greater apnoea + hypopnoea events per hour / Severe sleep apnoea", ms: "30 atau lebih kejadian apnoea + hipopnoea sejam / Apnoea tidur teruk" } }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: { en: "Medical Assistant", ms: "Pembantu Perubatan" } },
  { value: "sleep_technologist", label: { en: "Sleep Technologist", ms: "Teknologis Tidur" } },
  { value: "neurologist", label: { en: "Neurologist", ms: "Pakar Neurologi" } },
  { value: "respiratory_therapist", label: { en: "Respiratory Therapist", ms: "Ahli Terapi Respiratori" } }
];

const FINAL_REPORT_OPTIONS = [
  { value: "normal", label: { en: "Normal", ms: "Normal" } },
  { value: "abnormal", label: { en: "Abnormal", ms: "Tidak Normal" } },
  { value: "others", label: { en: "Others", ms: "Lain-Lain" } }
];

// 📅 Helpers
function formatToday() {
  return new Date().toISOString().split("T")[0];
}

function computeBmi(height, weight) {
  const h = parseFloat(height);
  const w = parseFloat(weight);
  if (isNaN(h) || isNaN(w) || h <= 0) return "";
  const hm = h / 100;
  return (w / (hm * hm)).toFixed(1);
}


function getBmiConclusion(bmi) {
  const n = parseFloat(bmi);
  if (isNaN(n) || bmi === "" || bmi == null) return "-";
  if (n < 16) return "Less than 16.0 – Severely Underweight";
  if (n <= 18.5) return "16.0 to 18.5 – Underweight";
  if (n <= 25) return "18.6 to 25.0 – Normal Weight";
  if (n <= 30) return "25.1 to 30.0 – Overweight";
  if (n <= 35) return "30.1 to 35.0 – Moderately Obese";
  return "Greater than 35.0 – Severely Obese";
}



// 🧠 COMPONENT
export default function PSGForm({ patient, onBack }) {
  const [language, setLanguage] = useState("en");
  const gender = patient?.sex || patient?.gender || "-";
  const height = patient?.height ?? "";
  const weight = patient?.weight ?? "";
  const neckCircumference = patient?.neck_circumference ?? patient?.neck_cm ?? "-";
  const diagnosis = patient?.icd ?? patient?.diagnosis ?? "-";
  const bmiRaw = patient?.bmi ?? computeBmi(height, weight);
  const bmiConclusion = getBmiConclusion(bmiRaw);


  const [values, setValues] = useState({
    date_of_appointment: formatToday(),
    show_stop_bang: false,

    // STOP BANG
    sb_snoring: "",
    sb_tired: "",
    sb_observed: "",
    sb_bp: "",
    sb_bmi: "",
    sb_age: "",
    sb_neck: "",
    sb_gender: "",
    osa_result: "",

    // Patient
    gender,
    height,
    weight,
    neck_circumference: neckCircumference,
    bmi: bmiRaw,
    bmi_conclusion: bmiConclusion,
    diagnosis,
    stop_bang: "",
    high_risk_osa: "",
    low_risk_osa: "",
    night_procedure: "",
    technical_airflow: [],
    cpap: "",
    bpap: "",
    snoring: "",
    scoring_table: "",
    previous_psg: "",
    final_report: "",
    final_report_others: "",
    graf: null,
    emr_technical_report: ""
  });

  // 👤 Load patient
  useEffect(() => {
    if (!patient) return;

    const bmi = patient?.bmi || computeBmi(patient.height, patient.weight);

    setValues(v => ({
      ...v,
      gender: patient.gender || "-",
      height: patient.height || "",
      weight: patient.weight || "",
      neck_circumference: patient.neck_cm || "",
      bmi,
      bmi_conclusion: getBmiConclusion(bmi),
      diagnosis: patient.diagnosis || "-"
    }));
  }, [patient]);
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


 useEffect(() => {
        if (!patient) return;
        setPatientHistory({
          past_medical_history: patient.medical_history || "",
          past_family_history: patient.family_medical_history || "",
          alerts_and_allergies: patient.alerts_and_allergies_history || ""
        });
      }, [patient]);

  // 🔄 Change handler
  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
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
  // 🔘 Actions
  const handleAction = (type) => {
    if (type === "toggle-language") {
      setLanguage(l => (l === "en" ? "ms" : "en"));
    }

    if (type === "back") onBack?.();

    if (type === "start-stop-bang") {
      setValues(v => ({
        ...v,
        show_stop_bang: !v.show_stop_bang
      }));
    }
  };




  // 🧮 OSA Calculation
  useEffect(() => {
    const fields = [
      values.sb_snoring,
      values.sb_tired,
      values.sb_observed,
      values.sb_bp,
      values.sb_bmi,
      values.sb_age,
      values.sb_neck,
      values.sb_gender
    ];

    const yesCount = fields.filter(v => v === "yes").length;

    let result = "";
    if (yesCount >= 3) result = "High Risk of OSA";
    else if (yesCount > 0) result = "Low Risk of OSA";

    setValues(v => ({ ...v, osa_result: result }));
  }, [
    values.sb_snoring,
    values.sb_tired,
    values.sb_observed,
    values.sb_bp,
    values.sb_bmi,
    values.sb_age,
    values.sb_neck,
    values.sb_gender
  ]);


  // 🧾 FORM SCHEMA
  const PSG_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "PSG (Polysomnogram)" },

    actions: [
      { type: "toggle-language" },
      { type: "back", label: { en: "Back" } }
    ],

    sections: [
      {
        fields: [
{
            name: "date_of_appointment",
            label: { en: "Date of Appointment", ms: "Tarikh Temujanji" },
            type: "date",
            placeholder: { en: "Select date", ms: "Pilih tarikh" }
          },

          {
            type: "row",
            fields: [
              { name: "neck_circumference", label: { en: "Neck Circumference (Cm)", ms: "Lilitan Leher (Cm)" }, type: "input" },
              { name: "bmi_conclusion", label: { en: "BMI Conclusion", ms: "Kesimpulan BMI" }, type: "input", readOnly: true }
            ]
          },

          { type: "subheading", label: { en: "Sleep Assessment", ms: "Penilaian Tidur" } },
          {
            name: "stop_bang",
            label: { en: "Stop Bang Sleep Score", ms: "Skor Tidur Stop Bang" },
            type: "radio",
            options: STOP_BANG_OPTIONS
          },
          {
            type: "row",
            fields: [
              {
                name: "high_risk_osa",
                label: { en: "High Risk Of OSA", ms: "Risiko Tinggi OSA" },
                type: "radio",
                options: YES_NO_OPTIONS
              },
              {
                name: "low_risk_osa",
                label: { en: "Low Risk Of OSA", ms: "Risiko Rendah OSA" },
                type: "radio",
                options: YES_NO_OPTIONS
              }
            ]
          },
          {
            name: "night_procedure",
            label: { en: "Night / Procedure", ms: "Malam / Prosedur" },
            type: "radio",
            options: NIGHT_OPTIONS
          },


       
         {
            type: "button",
            action: "start-stop-bang",
            label: {
            en: "Stop Band Questionnaire"
          },
  
},

          
          ...(values.show_stop_bang
  ? [
      {
        type: "subheading",
        label: { en: "STOP-BANG Questionnaire" }
      },

      // 1️⃣ SNORING
      {
        type: "subheading",
        label: { en: "1. Snoring" }
      },
      {
        name: "sb_snoring",
        label: {
          en: "Do you snore loudly (louder than talking or loud enough to be heard through closed doors)?"
        },
        type: "radio",
        options: YES_NO_OPTIONS
      },

      // 2️⃣ TIRED
      {
        type: "subheading",
        label: { en: "2. Tired" }
      },
      {
        name: "sb_tired",
        label: {
          en: "Do you often feel tired, fatigued, or sleepy during daytime?"
        },
        type: "radio",
        options: YES_NO_OPTIONS
      },

      // 3️⃣ OBSERVED
      {
        type: "subheading",
        label: { en: "3. Observed" }
      },
      {
        name: "sb_observed",
        label: {
          en: "Has anyone observed you stop breathing during your sleep?"
        },
        type: "radio",
        options: YES_NO_OPTIONS
      },

      // 4️⃣ BLOOD PRESSURE
      {
        type: "subheading",
        label: { en: "4. Blood Pressure" }
      },
      {
        name: "sb_bp",
        label: {
          en: "Do you have or are you being treated for high blood pressure?"
        },
        type: "radio",
        options: YES_NO_OPTIONS
      },

      // 5️⃣ BMI
      {
        type: "subheading",
        label: { en: "5. BMI" }
      },
      {
        name: "sb_bmi",
        label: { en: "BMI more than 35 kg/m²?" },
        type: "radio",
        options: YES_NO_OPTIONS
      },

      // 6️⃣ AGE
      {
        type: "subheading",
        label: { en: "6. Age" }
      },
      {
        name: "sb_age",
        label: { en: "Age over 50 years old?" },
        type: "radio",
        options: YES_NO_OPTIONS
      },

      // 7️⃣ NECK
      {
        type: "subheading",
        label: { en: "7. Neck Circumference" }
      },
      {
        name: "sb_neck",
        label: { en: "Neck circumference greater than 40 cm?" },
        type: "radio",
        options: YES_NO_OPTIONS
      },

      // 8️⃣ GENDER
      {
        type: "subheading",
        label: { en: "8. Gender" }
      },
      {
        name: "sb_gender",
        label: { en: "Gender male?" },
        type: "radio",
        options: YES_NO_OPTIONS
      },

      // 📌 NOTE
      {
        type: "note",
        label: { en: "* Neck circumference is measured by staff" }
      },

      // RESULT
      {
        name: "osa_result",
        label: { en: "OSA Risk Result" },
        type: "input",
        readOnly: true
      },

      // 📊 RESULT INFO
      {
        type: "note",
        label: {
          en: "High risk of OSA: answering YES to 3 or more items"
        }
      },
      {
        type: "note",
        label: {
          en: "Low risk of OSA: answering YES to less than 3 items"
        }
      }
    ]
  : []),


          { type: "subheading", label: { en: "Technical Airflow", ms: "Aliran Udara Teknikal" } },
          {
            name: "technical_airflow",
            label: { en: "Technical Airflow", ms: "Aliran Udara Teknikal" },
            type: "checkbox-group",
            options: TECHNICAL_AIRFLOW_OPTIONS
          },
          {
            type: "row",
            fields: [
              { name: "cpap", label: { en: "CPAP", ms: "CPAP" }, type: "radio", options: YES_NO_OPTIONS },
              { name: "bpap", label: { en: "BPAP", ms: "BPAP" }, type: "radio", options: YES_NO_OPTIONS },
              { name: "snoring", label: { en: "Snoring", ms: "Dengkuran" }, type: "radio", options: YES_NO_OPTIONS }
            ]
          },
          {
            name: "scoring_table",
            label: { en: "Scoring Table", ms: "Jadual Skor" },
            type: "radio",
            options: SCORING_TABLE_OPTIONS,
            labelAbove: true
          },
          {
            name: "previous_psg",
            label: { en: "Previous PSG", ms: "PSG Sebelumnya" },
            type: "radio",
            options: YES_NO_OPTIONS
          },
                 
          {
  name: "previous_study_upload",
  label: { en: "Upload Previous PSG", ms: "Muat naik PSG Sebelumnya" },
  type: "attach-file",
  accept: "image/*,.pdf",
  showIf: { field: "previous_study", equals: "yes" }
},
          {
            name: "previous_psg_image",
            label: "Upload Report",
            type: "attach-file",
            showIf: {
              field: "previous_psg",
              equals: "yes"
            }
          },
          { type: "subheading", label: { en: "Report", ms: "Laporan" } },
          {
            name: "graf",
            title: { en: "Graph", ms: "Graph" },
            type: "attach-file",
            accept: "image/*,.pdf,video/*"
          },
       
          {
            name: "final_report",
            label: { en: "Final Report", ms: "Laporan Akhir" },
            type: "radio",
            options: FINAL_REPORT_OPTIONS
          },
          {
            name: "final_report_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Free text", ms: "Teks bebas" },
            showIf: { field: "final_report", equals: "others" }
          },

        ]
      }
    ]
  };

  return (
    <div>
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


      <CommonFormBuilder
        schema={PSG_SCHEMA}
        values={values}
        onChange={onChange}
        onAction={handleAction}
        language={language}
      />
    </div>
  );
}

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


