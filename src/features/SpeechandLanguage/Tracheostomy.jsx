


import { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

/* ================= CONSTANTS ================= */

const YES_NO_OPTIONS = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" }
];

const ONSET_OPTIONS = ["Gradual", "Sudden"];
const PROGRESSION_OPTIONS = ["Better", "Worse", "No change"];

const MISUSE_OPTIONS = [
  { label: "Screaming", value: "screaming" },
  { label: "Shouting", value: "shouting" },
  { label: "Excessive throat clearing", value: "throat_clearing" }
];

const DEMAND_OPTIONS = ["Low", "Moderate", "High", "Elite Voice User"];
const HOURS_OPTIONS = ["<1", "1-3", "3-5", ">5"];

const WATER_OPTIONS = ["<0.5L", "0.5-1.0L", "1-1.5L", "1.5-2.0L", ">2.0L"];

const HYDRATION_OPTIONS = [
  { label: "Sips frequently", value: "sips" },
  { label: "Long gaps without drinking", value: "gaps" }
];

const ALCOHOL_OPTIONS = ["Never", "Occasionally", "Daily"];
const CAFFEINE_OPTIONS = ["None", "1-2 cups/day", ">2 cups/day"];
const FREQUENCY_OPTIONS = ["Rare", "Regular"];

/* ================= COMPONENT ================= */

// export default function ThacheostomyAssessment(mode = "objective") {
export default function ThacheostomyAssessment({ mode = "objective" }) {

  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /* ================= SCHEMA ================= */

  const SCHEMA_TRACHEOSTOMY = {
    sections: [
      {
  title: "Thacheostomy",
  fields: [

    {
      type: "row",
      fields: [
        {
          type: "subheading",
          label: "Suction needs frequency (airway clearance function)"
        },
      ]
    },
{
  name: "suction_required",
  label: "Suction Need",
  type: "radio",
  options: [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" }
  ],
  direction: "row"   // or inline: true (depending on your builder)
},
    {
      name: "suction_frequency",
      label: "Frequency (every ___ hours)",
      type: "textarea",
      showIf: { field: "suction_required", equals: "Yes" }
    },

    {
      name: "secretion_amount",
      label: "Secretion amount",
      type: "radio",
      options: ["Small", "Moderate", "Large"],
      showIf: { field: "suction_required", equals: "Yes" }
    },

    {
      name: "secretion_colour",
      label: "Colour",
      type: "radio",
      options: ["Whitish", "Yellowish", "Greenish", "Blood-tinged"],
      showIf: { field: "suction_required", equals: "Yes" }
    },

    {
      name: "secretion_consistency",
      label: "Consistency",
      type: "radio",
      options: ["Thick", "Loose"],
      showIf: { field: "suction_required", equals: "Yes" }
    },

    /* ===== TRACHEOSTOMY ===== */

    {
      type: "subheading",
      label: "Tracheostomy Status"
    },

    {
      name: "trach_date",
      label: "Date of tracheostomy insertion",
      type: "date"
    },

    {
      name: "trach_change_date", // ⚠️ FIX duplicate name
      label: "Last tracheostomy change",
      type: "date"
    },

/* ===== SIZE ===== */
{
  name: "trach_size",
  label: "Size (mm)",
  type: "radio",
  options: ["5.0", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"]
},

/* ===== TYPE ===== */
{
  name: "trach_type",
  label: "Type",
  type: "radio",
  options: ["Fenestrated", "Non-fenestrated"]
},

/* ===== LUMEN ===== */
{
  name: "trach_lumen",
  label: "Lumen",
  type: "radio",
  options: ["Single-lumen", "Double-lumen"]
},

/* ===== BRAND ===== */
{
  name: "trach_brand",
  label: "Brand",
  type: "radio",
  options: ["Portex", "Rusch", "Shiley", "Other"]
},

{
  name: "trach_brand_other",
  label: "Other (specify)",
  type: "input",
  showIf: { field: "trach_brand", equals: "Other" }
},

/* ===== CUFF ===== */
{
  name: "cuff_status",
  label: "Cuff status",
  type: "radio",
  options: ["Inflated", "Deflated", "Cuffless"]
},

/* ===== INNER CANNULA ===== */
{
  name: "inner_cannula",
  label: "Inner cannula",
  type: "radio",
  options: ["Present", "Absent"]
},

{
  name: "inner_cannula_type",
  label: "If present",
  type: "radio",
  options: ["Fenestrated", "Non-fenestrated"],
  showIf: { field: "inner_cannula", equals: "Present" }
},

/* ===== VENTILATION ===== */
{
  name: "ventilation",
  label: "Ventilation",
  type: "radio",
  options: [
    "Room air",
    "O2 via trache mask",
    "O2 via Swedish nose",
    "N/A"
  ]
},

/* ===== FLOW RATE ===== */
{
  name: "flow_rate",
  label: "Flow rate (L of O2)",
  type: "input"
},

/* ===== HUMIDIFICATION ===== */
{
  name: "humidification",
  label: "Humidification method",
  type: "radio",
  options: ["HME", "Nebuliser", "Heated humidifier", "None"]
},
        ]
      }
    ]
  };
const SCHEMA_PLAN_TRACHEOSTOMY = {
  form_name: "Tracheostomy Weaning Recommendations",

  sections: [
    {
      // title: "Tracheostomy weaning recommendations",

      fields: [

        // Tracheostomy Weaning Recommendations
        {
          type: "subheading",
          label: "Tracheostomy Weaning Recommendations"
        },

        {
          name: "capping_duration",
          label: "Suggested capping duration (hours)",
          type: "input"
        },

        {
          name: "frequency",
          label: "Frequency (times/day)",
          type: "input"
        },

        {
          name: "monitoring",
          label: "Monitoring parameters",
          type: "checkbox-group",
          options: [
            { label: "Monitor SpO₂", value: "spo2" },
            { label: "Respiratory Rate", value: "rr" },
            { label: "Work of Breathing", value: "wob" }
          ]
        },

        // Oral Care
        {
          type: "subheading",
          label: "Oral Care"
        },

        {
          name: "oral_care_method",
          label: "Method",
          type: "checkbox-group",
          options: [
            { label: "Brush teeth", value: "brush_teeth" },
            { label: "Gauze stick", value: "gauze_stick" },
            { label: "Gargle", value: "gargle" }
          ]
        },

        {
          name: "oral_care_frequency",
          label: "Frequency",
          type: "checkbox-group",
          options: [
            { label: "3–4x/day", value: "3_4_day" },
            { label: "Before meals", value: "before_meals" },
            { label: "After meals", value: "after_meals" },
            { label: "Before oral trials", value: "before_trials" },
            { label: "After oral trials", value: "after_trials" }
          ]
        },

        // Therapy
        {
          type: "subheading",
          label: "Therapy"
        },

        {
          name: "therapy",
          label: "",
          type: "checkbox-group",
          options: [
            {
              label: "Observation of breathing functions",
              value: "breathing_observation"
            },
            {
              label: "Voice facilitation intervention",
              value: "voice_facilitation"
            },
            {
              label: "Assessment of swallowing",
              value: "swallowing_assessment"
            },
            {
              label: "Training about swallowing / airway clearance",
              value: "swallowing_training"
            },
            {
              label: "Advising about swallowing / airway management",
              value: "airway_advising"
            }
          ]
        },

        // Exercises
        {
          name: "exercises",
          label: "Exercises",
          type: "textarea",
        },

        // Other Management
        {
          type: "subheading",
          label: "Other Management"
        },

        {
          name: "other_management",
          label: "",
          type: "checkbox-group",
          options: [
            {
              label: "Referral for medical management",
              value: "referral"
            },
            {
              label: "Further Assessment",
              value: "further"
            }
          ]
        },

        // Further Assessment
        {
          name: "further_assessment",
          label: "Further Assessment",
          type: "checkbox-group",
          showIf: {
            field: "other_management",
            includes: "further"
          },
          options: [
            {
              label: "Video endoscopic evaluation of swallowing",
              value: "fees"
            },
            {
              label: "Voice facilitation intervention",
              value: "advanced_voice"
            }
          ]
        }

      ]
    }
  ]
};

const SCHEMA_OBJECTIVE_TRACHEOSTOMY = {
  sections: [
    {
      title: "Tracheostomy Weaning Evaluation",
      fields: [
        { type: "subheading", label: "Pre-evaluation Vitals" },
        {
          type: "row",
          fields: [
            { name: "pre_spo2", label: "SpO2 (%)", type: "input", placeholder: "%" },
            { name: "pre_rr", label: "RR (breaths/min)", type: "input", placeholder: "bpm" },
            { name: "pre_hr", label: "HR (bpm)", type: "input", placeholder: "bpm" }
          ]
        },

        { type: "subheading", label: "Pre-evaluation Suction" },
        { name: "pre_suction_performed", label: "Suction Performed", type: "radio", options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ]},
        { name: "secretion_colour", label: "Colour", type: "radio", options: [
          { label: "Whitish", value: "whitish" },
          { label: "Yellowish", value: "yellowish" },
          { label: "Greenish", value: "greenish" },
          { label: "Blood-tinged", value: "blood_tinged" }
        ], showIf: { field: "pre_suction_performed", equals: "yes" }},
        { name: "secretion_consistency", label: "Consistency", type: "radio", options: [
          { label: "Thick", value: "thick" },
          { label: "Loose", value: "loose" }
        ], showIf: { field: "pre_suction_performed", equals: "yes" }},
        { name: "secretion_amount", label: "Secretion amount", type: "radio", options: [
          { label: "Small", value: "small" },
          { label: "Moderate", value: "moderate" },
          { label: "Large", value: "large" }
        ], showIf: { field: "pre_suction_performed", equals: "yes" }},

        // ===== TRIALS SELECTOR =====
        { type: "subheading", label: "Trials / Clinical Observations" },
        {
          name: "tracheostomy_trials",
          label: "Select trials performed",
          type: "checkbox-group",
          options: [
            { label: "Cuff deflation trial", value: "cuff_deflation" },
            { label: "Digital Occlusion trial", value: "digital_occlusion" },
            { label: "Speaking valve trial", value: "speaking_valve" },
            { label: "Capping trial", value: "capping" },
            { label: "Clinical Observations", value: "clinical_observations" },
            { label: "Modified Evan's Blue Dye Test", value: "blue_dye_test" }
          ]
        },

        // ===== CUFF DEFLATION =====
        { type: "subheading", label: "Cuff deflation trial  – Respiration functions", showIf: { field: "tracheostomy_trials", includes: "cuff_deflation" } },
        { name: "cuff_deflation", label: "Deflation", type: "radio", options: [{ label: "Partial", value: "partial" }, { label: "Complete", value: "complete" }], showIf: { field: "tracheostomy_trials", includes: "cuff_deflation" } },
        { name: "cuff_tolerated", label: "Tolerated", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }], showIf: { field: "tracheostomy_trials", includes: "cuff_deflation" } },
        {
          type: "row",
          showIf: { field: "tracheostomy_trials", includes: "cuff_deflation" },
          fields: [
            { name: "cuff_spo2", label: "SpO2 (%)", type: "input" },
            { name: "cuff_rr", label: "RR (bpm)", type: "input" },
            { name: "cuff_hr", label: "HR (breaths/min)", type: "input" }
          ]
        },

        // ===== DIGITAL OCCLUSION =====
        { type: "subheading", label: "Digital Occlusion trial  –  Speaking", showIf: { field: "tracheostomy_trials", includes: "digital_occlusion" } },
        { name: "dig_duration", label: "Duration tolerated (minutes)", type: "input", showIf: { field: "tracheostomy_trials", includes: "digital_occlusion" } },
        { name: "dig_voice", label: "Voice quality", type: "radio", options: [{ label: "Clear", value: "clear" }, { label: "Wet", value: "wet" }, { label: "Breathy", value: "breathy" }, { label: "Strained", value: "strained" }, { label: "Absent", value: "absent" }], showIf: { field: "tracheostomy_trials", includes: "digital_occlusion" } },
        { name: "dig_wob", label: "Work of breathing", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Increased", value: "increased" }], showIf: { field: "tracheostomy_trials", includes: "digital_occlusion" } },
        {
          type: "row",
          showIf: { field: "tracheostomy_trials", includes: "digital_occlusion" },
          fields: [
            { name: "dig_spo2", label: "SpO2 (%)", type: "input" },
            { name: "dig_rr", label: "RR (bpm)", type: "input" },
            { name: "dig_hr", label: "HR (breaths/min)", type: "input" }
          ]
        },

        // ===== SPEAKING VALVE =====
        { type: "subheading", label: "Speaking valve trial  –  Speaking", showIf: { field: "tracheostomy_trials", includes: "speaking_valve" } },
        { name: "sv_duration", label: "Duration tolerated (minutes)", type: "input", showIf: { field: "tracheostomy_trials", includes: "speaking_valve" } },
        { name: "sv_voice", label: "Voice quality", type: "radio", options: [{ label: "Clear", value: "clear" }, { label: "Wet", value: "wet" }, { label: "Breathy", value: "breathy" }, { label: "Strained", value: "strained" }, { label: "Absent", value: "absent" }], showIf: { field: "tracheostomy_trials", includes: "speaking_valve" } },
        { name: "sv_wob", label: "Work of breathing", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Increased", value: "increased" }], showIf: { field: "tracheostomy_trials", includes: "speaking_valve" } },
        {
          type: "row",
          showIf: { field: "tracheostomy_trials", includes: "speaking_valve" },
          fields: [
            { name: "sv_spo2", label: "SpO2 (%)", type: "input" },
            { name: "sv_rr", label: "RR (bpm)", type: "input" },
            { name: "sv_hr", label: "HR (breaths/min)", type: "input" }
          ]
        },

        // ===== CAPPING =====
        { type: "subheading", label: "Capping trial  –  Respiration functions", showIf: { field: "tracheostomy_trials", includes: "capping" } },
        { name: "cap_duration", label: "Duration tolerated (minutes)", type: "input", showIf: { field: "tracheostomy_trials", includes: "capping" } },
        { name: "cap_voice", label: "Voice quality", type: "radio", options: [{ label: "Clear", value: "clear" }, { label: "Wet", value: "wet" }, { label: "Breathy", value: "breathy" }, { label: "Strained", value: "strained" }, { label: "Absent", value: "absent" }], showIf: { field: "tracheostomy_trials", includes: "capping" } },
        { name: "cap_wob", label: "Work of breathing", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Increased", value: "increased" }], showIf: { field: "tracheostomy_trials", includes: "capping" } },
        {
          type: "row",
          showIf: { field: "tracheostomy_trials", includes: "capping" },
          fields: [
            { name: "cap_spo2", label: "SpO2 (%)", type: "input" },
            { name: "cap_rr", label: "RR (bpm)", type: "input" },
            { name: "cap_hr", label: "HR (breaths/min)", type: "input" }
          ]
        },

        // ===== CLINICAL OBSERVATIONS =====
        { type: "subheading", label: "Clinical Observations", showIf: { field: "tracheostomy_trials", includes: "clinical_observations" } },
        {
          name: "clinical_obs",
          label: "Observations (tick all that apply)",
          type: "checkbox-group",
          showIf: { field: "tracheostomy_trials", includes: "clinical_observations" },
          options: [
            { label: "Stable SpO₂ (≥ 95% on room air)", value: "stable_spo2" },
            { label: "Stable RR/HR during capping or speaking valve trial", value: "stable_rr_hr" },
            { label: "Adequate cough reflex and secretion clearance", value: "adequate_cough" },
            { label: "Phonation achieved with speaking valve", value: "phonation_achieved" },
            { label: "No significant desaturation (>3% drop) or respiratory distress", value: "no_desaturation" }
          ]
        },

        // ===== MODIFIED EVAN'S BLUE DYE TEST =====
        { type: "subheading", label: "Modified Evan's Blue Dye Test  –  Ingestion functions", showIf: { field: "tracheostomy_trials", includes: "blue_dye_test" } },
        { name: "blue_cough", label: "Cough", type: "radio", options: [{ label: "Immediate", value: "immediate" }, { label: "Delayed", value: "delayed" },{ label: "None", value: "none" }], showIf: { field: "tracheostomy_trials", includes: "blue_dye_test" } },
        // { name: "blue_cough_none_remarks", label: "Cough – None (specify)", type: "input", showIf: { field: "blue_cough", equals: "none", and: { field: "tracheostomy_trials", includes: "blue_dye_test" } } },
        { name: "blue_wet_voice", label: "Wet voice", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }], showIf: { field: "tracheostomy_trials", includes: "blue_dye_test" } },
        { name: "blue_wob", label: "Increased work of breathing", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }], showIf: { field: "tracheostomy_trials", includes: "blue_dye_test" } },
        {
          type: "row",
          showIf: { field: "tracheostomy_trials", includes: "blue_dye_test" },
          fields: [
            { name: "blue_spo2_baseline", label: "SPO2 Baseline (%)", type: "input" },
            { name: "blue_spo2_post", label: "SPO2 Post test (%)", type: "input" }
          ]
        },
        { name: "blue_spo2_drop", label: "Drop in SPO2 (≥ 3%)", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }], showIf: { field: "tracheostomy_trials", includes: "blue_dye_test" } },
        { name: "blue_dye_suction", label: "Presence of blue dye upon suction", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }], showIf: { field: "tracheostomy_trials", includes: "blue_dye_test" } }
      ]
    }
  ]
};


const SCHEMA_ASSESSMENT_TRACHEOSTOMY = {
  form_name: "Tracheostomy Management",
  sections: [
    {
      section_name: "Tracheostomy",
      fields: [

        // ===== SUBHEADING =====
        { type: "subheading", label: "Clinical Impression" },

        // ===== WEANING STATUS =====
        // {
        //   name: "weaning_status",
        //   label: "Weaning Status",
        //   type: "radio",
        //   direction: "column",
        //   options: [
        //     {
        //       label: "No difficulties observed during tracheostomy weaning. Suitable to proceed with weaning programme",
        //       value: "no_difficulty"
        //     },
        //     {
        //       label: "Poor tolerance to tracheostomy capping; requires full dependence",
        //       value: "poor_tolerance"
        //     }
        //   ]
        // },
        {
  name: "weaning_status",
  label: "",
  type: "radio",
  labelAbove: true,
  options: [
    {
      label: "No difficulties observed during tracheostomy weaning. The patient is a suitable candidate to proceed with the tracheostomy weaning programme.",
      value: "no_difficulty"
    },
    {
      label: "The patient presents with poor tolerance to tracheostomy capping and currently requires full tracheostomy dependence.",
      value: "poor_tolerance"
    }
  ]
},

        // ===== SYMPTOMS =====
        {
          name: "symptoms",
          label: "Patient also exhibits",
          type: "checkbox-group",
          options: [
            { label: "Dysphonia", value: "dysphonia" },
            { label: "Dysphagia ", value: "dysphagia" }
          ]
        },

        // ===== REMARKS =====
        {
          name: "remarks",
          type: "textarea",
          label: "Remarks",
          placeholder: "Enter remarks..."
        },

        // ===== CLINICAL INTERPRETATION =====
        {
          name: "clinical_interpretation",
          label: "Clinical Interpretation",
          type: "checkbox-group",
          options: [
            {
              label: "Reduced physiological tolerance (desaturation, respiratory distress, ↑ work of breathing)",
              value: "physio_reduced"
            },
            {
              label: "Reduced tolerance to upper airway airflow (stridor, backpressure, noisy breathing)",
              value: "airway_reduced"
            },
            {
              label: "Inadequate secretion management / airway clearance",
              value: "secretion_issue"
            },
            {
              label: "Reduced phonation or voice quality during occlusion",
              value: "phonation_issue"
            },
            {
              label: "Behavioural / psychological factors limiting trial",
              value: "behavioral"
            },
            {
              label: "Other",
              value: "other",
              hasTextInput: true
            }
          ]
        },
      {
  name: "clinical_interpretation_other",
  label: "Other (specify)",
  type: "textarea",
  placeholder: "Enter details",
  showIf: {
    field: "clinical_interpretation",
    includes: "other"   // ✅ important
  }
},

        // ===== WEANING DECISION =====
        {
          name: "weaning_candidate",
          label: "Candidate for tracheostomy weaning",
          type: "radio",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
            { label: "Requires further evaluation (FEES / VFSS)", value: "further_eval" }
          ]
        },
                  { type: "subheading", label: "Tolerance level [based on monitoring]:" },
                  {
              name: "cuff_deflation",
              label: "Cuff deflation",
              type: "radio",
              options: [
                { label: "Tolerated", value: "tolerated" },
                { label: "Not tolerated", value: "not_tolerated" },
                { label: "N/A", value: "na" }
              ]
            },
            {
              name: "digital_occlusion",
              label: "Digital occlusion",
              type: "radio",
              options: [
                { label: "Tolerated", value: "tolerated" },
                { label: "Not tolerated", value: "not_tolerated" },
                { label: "N/A", value: "na" }
              ]
            },
            {
              name: "speaking_valve",
              label: "Speaking valve",
              type: "radio",
              options: [
                { label: "Tolerated", value: "tolerated" },
                { label: "Not tolerated", value: "not_tolerated" },
                { label: "N/A", value: "na" }
              ]
            },

                  {
              name: "tolerance_capping",
              label: "Capping trial",
              type: "radio",
              options: [
                { label: "Tolerated", value: "tolerated" },
                { label: "Not tolerated", value: "not_tolerated" },
                { label: "N/A", value: "na" }
              ]
            },

        // ===== TOLERANCE =====
        

      ]
    }
  ]
};

const tracheostomySchemas = {
  subjective: SCHEMA_TRACHEOSTOMY,
  objective: SCHEMA_OBJECTIVE_TRACHEOSTOMY,
  assessment: SCHEMA_ASSESSMENT_TRACHEOSTOMY,
  plan: SCHEMA_PLAN_TRACHEOSTOMY
};


  /* ================= UI ================= */

  return (
    // <div>
    //   <h2>Thacheostomy Assessment</h2>

    //   <CommonFormBuilder
    //     schema={SCHEMA_TRACHEOSTOMY}
    //     values={values}
    //     onChange={handleChange}
    //   />
    //    <CommonFormBuilder
    //     schema={SCHEMA_PLAN_TRACHEOSTOMY}
    //     values={values}
    //     onChange={handleChange}
    //   />
    //   <CommonFormBuilder
    //     schema={SCHEMA_ASSESSMENT_TRACHEOSTOMY}
    //     values={values}
    //     onChange={handleChange}
    //   />
    //   <CommonFormBuilder
    //     schema={SCHEMA_OBJECTIVE_TRACHEOSTOMY}
    //     values={values}
    //     onChange={handleChange}
    //   />
    // </div>
    <div style={{ padding: 20 }}>
      <CommonFormBuilder
        schema={tracheostomySchemas[mode] ?? { sections: [] }}
        values={values}
        layout="nested"
        onChange={handleChange}
      />
    </div>
  );
}