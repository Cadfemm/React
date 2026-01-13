import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== OPTIONS ===================== */

const Right_Left = [
  { label: "No", value: "0" },
  { label: "Right", value: "1" },
  { label: "Left", value: "2" },
  { label: "Bilateral", value: "3" }
];

/* ===================== COMPONENT ===================== */

export default function AudiologyDepartmentAdultPage({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `audiology_assessment_draft_${patient.id}`
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
        patient.diagnosis_history || "No data available"
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
      alert("Audiology draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Audiology assessment submitted");
  };

  /* ===================== SCHEMAS ===================== */

const SUBJECTIVE_SCHEMA = {
  actions: [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ],
  sections: [
    /* ===================== A. OTOLOGY ===================== */
    {
      title: "A. Otology",
      fields: [
        {
          name: "ear_infection",
          label: "Ear Infection",
          type: "radio",
          options: Right_Left
        },
        {
          name: "ear_infection_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "ear_infection", exists: true }
        },

        {
          name: "ear_fullness",
          label: "Echo or Ear Fullness",
          type: "radio",
          options: Right_Left
        },
        {
          name: "ear_fullness_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "ear_fullness", exists: true }
        },

        {
          name: "head_neck_injury",
          label: "Head or Neck Injury",
          type: "textarea"
        },

        {
          name: "ear_pain",
          label: "Ear Pain",
          type: "radio",
          options: Right_Left
        },
        {
          name: "ear_pain_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "ear_pain", exists: true }
        },

        {
          name: "otorrhea",
          label: "Otorrhea",
          type: "radio",
          options: Right_Left
        },
        {
          name: "otorrhea_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "otorrhea", exists: true }
        },

        {
          name: "otology_others",
          label: "Others",
          type: "textarea"
        }
      ]
    },

    /* ===================== B. HEARING ===================== */
    {
      title: "B. Hearing",
      fields: [
        {
          name: "tinnitus",
          label: "Tinnitus",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Right", value: "1" },
            { label: "Left", value: "2" },
            { label: "Bilateral", value: "3" },
            { label: "In the Head", value: "4" }
          ]
        },
        {
          name: "tinnitus_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "tinnitus", exists: true }
        },

        {
          name: "loudness_discomfort",
          label: "Loudness Discomfort",
          type: "radio",
          options: Right_Left
        },
        {
          name: "loudness_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "loudness_discomfort", exists: true }
        },

        {
          name: "hearing_difficulties",
          label: "Hearing Difficulties",
          type: "radio",
          options: Right_Left
        },
        {
          name: "hearing_difficulties_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "hearing_difficulties", exists: true }
        },

        {
          name: "better_hearing",
          label: "Better Hearing",
          type: "radio",
          options: [
            { label: "Right", value: "0" },
            { label: "Left", value: "1" },
            { label: "Bilateral", value: "2" }
          ]
        },
        {
          name: "better_hearing_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "better_hearing", exists: true }
        },

        {
          name: "communication_difficulties",
          label: "Communication Difficulties",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "In quiet", value: "1" },
            { label: "In noise", value: "2" },
            { label: "Group", value: "3" },
            { label: "Telephone", value: "4" }
          ]
        },
        {
          name: "communication_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "communication_difficulties", exists: true }
        },

        {
          name: "exposure_loud_sounds",
          label: "Exposure to Loud Sounds",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Occupational", value: "1" },
            { label: "Recreational", value: "2" }
          ]
        },
        {
          name: "exposure_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "exposure_loud_sounds", exists: true }
        },

        {
          name: "family_history",
          label: "Family History",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Yes", value: "1" }
          ]
        },
        {
          name: "family_history_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "family_history", exists: true }
        },

        {
          name: "psychosocial_impact",
          label: "Psychosocial Impact",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Withdrawal", value: "1" },
            { label: "Stress", value: "2" },
            { label: "Anxiety", value: "3" },
            { label: "Low self-confidence", value: "4" }
          ]
        },
        {
          name: "psychosocial_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "psychosocial_impact", exists: true }
        },

        {
          name: "environmental_context",
          label: "Environmental Context",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Noisy environment", value: "1" },
            { label: "Supportive family", value: "2" },
            { label: "Uses assistive device", value: "3" }
          ]
        },
        {
          name: "environmental_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "environmental_context", exists: true }
        },

        {
          name: "presence_amplification",
          label: "Presence of Amplification",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Yes", value: "1" }
          ]
        },
        {
          name: "amplification_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "presence_amplification", exists: true }
        }
      ]
    },

    /* ===================== C. VESTIBULAR ===================== */
    {
      title: "C. Vestibular",
      fields: [
        {
          name: "vestibular_symptoms",
          label: "Symptoms",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Vertigo", value: "1" },
            { label: "Imbalance", value: "2" },
            { label: "Dizziness", value: "3" },
            { label: "Oscillopsia", value: "4" }
          ]
        },
        {
          name: "vestibular_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "vestibular_symptoms", exists: true }
        },

        {
          name: "duration_frequency",
          label: "Duration / Frequency",
          type: "textarea"
        },

        {
          name: "triggers",
          label: "Triggers",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Positional", value: "1" },
            { label: "Head movement", value: "2" },
            { label: "Visual stimuli", value: "3" },
            { label: "Spontaneous", value: "4" }
          ]
        },
        {
          name: "trigger_notes",
          label: "Additional Information",
          type: "textarea",
          showIf: { field: "triggers", exists: true }
        },

        {
          name: "falls_history",
          label: "Falls History",
          type: "textarea"
        },

        {
          name: "vestibular_others",
          label: "Others",
          type: "textarea"
        }
      ]
    }
  ]
};


const DB_HL_OPTIONS = [
  { label: "-20", value: -20 },
  { label: "-15", value: -15 },
  { label: "-10", value: -10 },
  { label: "-5", value: -5 },
  { label: "0", value: 0 },
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
  { label: "30", value: 30 },
  { label: "35", value: 35 },
  { label: "40", value: 40 },
  { label: "45", value: 45 },
  { label: "50", value: 50 },
  { label: "55", value: 55 },
  { label: "60", value: 60 },
  { label: "65", value: 65 },
  { label: "70", value: 70 },
  { label: "75", value: 75 },
  { label: "80", value: 80 },
  { label: "85", value: 85 },
  { label: "90", value: 90 },
  { label: "95", value: 95 },
  { label: "100", value: 100 },
  { label: "105", value: 105 },
  { label: "110", value: 110 },
  { label: "115", value: 115 },
  { label: "120", value: 120 }
];
const AUDIO_FREQUENCIES = [250, 500, 1000, 2000, 3000, 4000, 6000, 8000];

const OBJECTIVE_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    /* ===================== TYMPANOMETRY ===================== */
    {
      title: "Tympanometry (Attach PDF)",
      fields: [

{
  type: "attach-file",
  name: "audiology_report",
  accept: "application/pdf,image/*",
  multiple: false
},        { type: "subheading", label: "Tympanogram Type" },
        {
          type: "paired-select",
          left: { name: "tymp_type_r", title: "Right Ear" },
          right: { name: "tymp_type_l", title: "Left Ear" },
          options: [
            { label: "Type A", value: "A" },
            { label: "Type As", value: "As" },
            { label: "Type Ad", value: "Ad" },
            { label: "Type B (Normal ECV)", value: "B_normal" },
            { label: "Type B (Small ECV)", value: "B_small" },
            { label: "Type B (Large ECV)", value: "B_large" },
            { label: "Type C", value: "C" }
          ]
        },

        {
          type: "paired-text",
          pairs: [
          { name: "peak_pressure_r", title: "Peak Pressure (daPa) – Right" },
          { name: "peak_pressure_l", title: "Peak Pressure (daPa) – Left" }
      ]},

        {
          type: "paired-text",
          pairs: [
          { name: "static_compliance_r", title: "Static Compliance (ml / cm³) – Right" },
        { name: "static_compliance_l", title: "Static Compliance (ml / cm³) – Left" }]
        },

        {
          type: "paired-text",
          pairs: [
            { name: "ecv_r", title: "Ear Canal Volume (ml / cm³) – Right" },
          { name: "ecv_l", title: "Ear Canal Volume (ml / cm³) – Left" }]
        }
      ]
    },

    /* ===================== OAE ===================== */
    {
      
      fields: [
        {
  type: "attach-file",
  name: "OAEaudiology_report",
  title: "OAE Screening (Attach PDF)",
  accept: "application/pdf,image/*",
  multiple: false
}, 
        {
          name: "oae_right",
          label: "OAE – Right Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
            { label: "Could not test (CNT)", value: "cnt" }
          ]
        },
        {
          name: "oae_left",
          label: "OAE – Left Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
            { label: "Could not test (CNT)", value: "cnt" }
          ]
        },

        {
          name: "dpoae_right",
          label: "DPOAE – Right Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
            { label: "Could not test (CNT)", value: "cnt" }
          ]
        },
        {
          name: "dpoae_left",
          label: "DPOAE – Left Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
            { label: "Could not test (CNT)", value: "cnt" }
          ]
        },

        {
          name: "teoae_right",
          label: "TEOAE – Right Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
            { label: "Could not test (CNT)", value: "cnt" }
          ]
        },
        {
          name: "teoae_left",
          label: "TEOAE – Left Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
            { label: "Could not test (CNT)", value: "cnt" }
          ]
        }
      ]
    },

    /* ===================== A – ANALYSIS ===================== */
    {
      fields: [
        {
  type: "attach-file",
  name: "audiology_report",
  accept: "application/pdf,image/*",
  title: "Otoscopic Examination (Attach PDF)",
  multiple: false
}, 
        {
          type: "paired-select",
          left: { name: "external_canal_r", title: "External Ear Canal – Right" },
          right: { name: "external_canal_l", title: "External Ear Canal – Left" },
          options: [
            { label: "Clear", value: "clear" },
            { label: "Inflamed", value: "inflamed" },
            { label: "Minimal cerumen", value: "minimal_cerumen" },
            { label: "Impacted cerumen", value: "impacted_cerumen" },
            { label: "Discharge present", value: "discharge" },
            { label: "Swelling", value: "swelling" }
          ]
        },

        {
          type: "paired-select",
          left: { name: "tm_appearance_r", title: "Tympanic Membrane (TM) Appearance – Right" },
          right: { name: "tm_appearance_l", title: "Tympanic Membrane (TM) Appearance – Left" },
          options: [
            { label: "Intact", value: "intact" },
            { label: "Perforated", value: "perforated" },
            { label: "Dull", value: "dull" },
            { label: "Retracted", value: "retracted" },
            { label: "Bulging", value: "bulging" },
            { label: "Opaque", value: "opaque" }
          ]
        },

        {
          type: "paired-select",
          left: { name: "tm_colour_r", title: "TM Colour – Right" },
          right: { name: "tm_colour_l", title: "TM Colour – Left" },
          options: [
            { label: "Pearly grey", value: "pearly_grey" },
            { label: "Reddened", value: "red" },
            { label: "Yellowish", value: "yellow" },
            { label: "Bluish", value: "blue" },
            { label: "White patches", value: "white_patches" }
          ]
        },

        {
          type: "paired-text",
          pairs: [
          { name: "otoscopy_other_r", title: "Other Findings – Right" },
          { name: "otoscopy_other_l", title: "Other Findings – Left" }]
        }
      ]
    },

    /* ===================== AUDIOMETRY ===================== */
    {
      
      fields: [
{
  type: "attach-file",
  name: "audiometry_audiology_report",
  title: "Audiometry (Attach PDF)",
  accept: "application/pdf,image/*",
  multiple: false
}, 

        {
          name: "audiometry_type",
          label: "Type of Audiometry",
          type: "radio",
          options: [
            { label: "Screening", value: "screening" },
            { label: "Diagnostic Pure Tone", value: "pta" },
            { label: "Play", value: "play" },
            { label: "Visual Reinforcement (VR)", value: "vra" }
          ]
        },

        {
          name: "masking",
          label: "Masking",
          type: "radio",
          options: [
            { label: "Unmasked", value: "unmasked" },
            { label: "Masking", value: "masked" }
          ]
        },
      ]
    }
  ]
};


  const ASSESSMENT_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    fields: [
      {
        name: "problem_list",
        label: "Problem Listing",
        type: "textarea"
      },
      {
        name: "clinical_impression",
        label: "Clinical Impression",
        type: "textarea"
      }
    ]
  };

  const PLAN_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
 fields: [
      {
        name: "plan_list",
        label: "Plan",
        type: "textarea"
      },]
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };
function AudiometryFrequencyTable({ value = {}, onChange }) {
  const frequencies = [250, 500, 1000, 2000, 3000, 4000, 6000, 8000];

  const columns = [
    { key: "ac_right", label: "Air Conduction Right (dB HL)" },
    { key: "ac_left", label: "Air Conduction Left (dB HL)" },
    { key: "bc_right", label: "Bone Conduction Right (dB HL)" },
    { key: "bc_left", label: "Bone Conduction Left (dB HL)" }
  ];

  const options = [
    -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
    65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120
  ].map(v => ({ label: String(v), value: v }));

  return (
    <div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px repeat(4, 170px)",
          fontSize: 14,
          fontWeight: 600,
          gap:20,
          marginBottom: 8
        }}
      >
        <div>Frequency (Hz)</div>
        {columns.map(c => (
          <div key={c.key}>{c.label}</div>
        ))}
      </div>

      {frequencies.map(freq => (
        <div
          key={freq}
          style={{
            display: "grid",
            gridTemplateColumns: "120px repeat(4, 170px)",
            gap:20,
            gap: 12,
            marginBottom: 6
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 500 }}>{freq}</div>

          {columns.map(col => (
            <select
              key={col.key}
              value={value?.[freq]?.[col.key] ?? ""}
              style={{
                width: 170,
                gap:20,
                padding: "6px 8px",
                fontSize: 14
              }}
              onChange={e =>
                onChange("pta_matrix", {
                  ...value,
                  [freq]: {
                    ...value[freq],
                    [col.key]: Number(e.target.value)
                  }
                })
              }
            >
              <option value="">–</option>
              {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      ))}
    </div>
  );
}



  /* ===================== RENDER ===================== */

  return (
<div style={mainContent}>
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
  >

    {activeTab === "objective" && (
  <AudiometryFrequencyTable
    value={values.pta_matrix}
    onChange={onChange}
  />
)}

    {/* 👇 ADD THIS BLOCK HERE */}
{activeTab === "objective" && (
  <>
    {/* IMPRESSION */}
    <div style={{ marginTop: 20 }}>
      <label>Impression – Right Ear</label>
      <textarea
        value={values.impression_r || ""}
        onChange={e => onChange("impression_r", e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <label>Impression – Left Ear</label>
      <textarea
        value={values.impression_l || ""}
        onChange={e => onChange("impression_l", e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />
    </div>

    {/* RELIABILITY */}
    <div style={{ marginTop: 12 }}>
      <label>Reliability</label>
      <div style={{ display: "flex", gap: 12 }}>
        {["Good", "Fair", "Poor"].map(opt => (
          <label key={opt}>
            <input
              type="radio"
              checked={values.reliability === opt}
              onChange={() => onChange("reliability", opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  </>
)}


    {/* Submit button stays */}
    <div style={submitRow}>
      <button style={submitBtn} onClick={handleSubmit}>
        Submit Audiology Assessment
      </button>
    </div>
  </CommonFormBuilder>
</div>

  );
}

/* ===================== STYLES ===================== */

const mainContent = { margin: "0 auto",width:"100%" };

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
