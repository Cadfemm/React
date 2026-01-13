import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function ClinicalSwallowingEvaluation({onBack}) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const CSE_SCHEMA = {
    title: "Clinical Swallowing Evaluation (CSE)",

  actions: [
    { type: "back", label: "Back" },
  ],
    sections: [

      /* ======================================================
         S – SUBJECTIVE
      ====================================================== */
      {
        title: "Subjective",
        fields: [

          {
            name: "patient_seen",
            label: "Patient was seen",
            type: "radio",
            options: [
              { label: "Unaccompanied", value: "Unaccompanied" },
              { label: "Accompanied by caregiver", value: "Accompanied by caregiver" }
            ]
          },

          {
            name: "consent",
            label: "Consent (Verbal)",
            type: "textarea",

          },

         { type: "subheading", label: "Presenting Complaints" },

{
  name: "presenting_complaints",
  label: "Patient/family reported",
  type: "multi-select-dropdown",
  options: [
    "Drooling",
    "Coughing with drink",
    "Choking on food",
    "Food/pills stuck in throat",
    "Pain on swallowing (odynophagia)",
    "Other(s)"
  ].map(v => ({ label: v, value: v }))
},

{
  name: "presenting_complaints_other",
  label: "Other (please specify)",
  type: "textarea",
  showIf: {
    field: "presenting_complaints",
    includes: "Other(s)"
  }
},


   { type: "subheading", label: "Current Diet Intake" },

{
  name: "dietMode",
  label: "Current intake type",
  type: "checkbox-group",
  options: ["Oral", "Enteral"].map(v => ({ label: v, value: v }))
},

/* ================= ORAL ================= */

{
  type: "subheading",
  label: "Oral",
  showIf: {
    field: "dietMode",
    includes: "Oral"
  }
},

{
  type: "row",
  showIf: {
    field: "dietMode",
    includes: "Oral"
  },
  fields: [
    {
      name: "oral_food_consistency",
      label: "Food consistency",
      type: "single-select",
      options: [
                "Level 3 – Moderately thick",
        "Level 4 – Extremely thick",
        "Level 5 – Minced & moist",
        "Level 6 – Soft & bite-sized",
        "Level 7 EC – Regular Easy to chew",
        "Level 7 – Regular"
      ].map(v => ({ label: v, value: v }))
    },
    {
      name: "oral_fluid_consistency",
      label: "Fluids consistency",
      type: "single-select",
      options: [
        "Level 0 – Thin",
        "Level 1 – Slightly thick",
        "Level 2 – Mildly thick",
        "Level 3 – Moderately thick",
        "Level 4 – Extremely thick"
      ].map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  showIf: {
    field: "dietMode",
    includes: "Oral"
  },
  fields: [
    {
      name: "oral_amount",
      label: "Amount",
      type: "single-select",
      options: ["Half portion", "Full portion"].map(v => ({ label: v, value: v }))
    },
  ]
},
{
  name: "oral_frequency",
  type: "textarea",
  label: "Frequency(times/day)",
  placeholder: "times/day"
},

/* ================= ENTERAL ================= */

{
  type: "subheading",
  label: "Enteral feeding",
  showIf: {
    field: "dietMode",
    includes: "Enteral"
  }
},

{
  name: "enteral_type",
  label: "Type",
  type: "single-select",
  options: [
    "Orogastric Tube (OGT)",
    "Nasogastric Tube (NGT)",
    "Nasojejunal Tube (NJT)",
    "Gastrostomy Tube (G-tube)",
    "Jejunostomy Tube (J-tube)"
  ].map(v => ({ label: v, value: v })),
  showIf: {
    field: "dietMode",
    includes: "Enteral"
  }
},

{
  name: "enteral_regimen",
  label: "Regimen",
  type: "textarea",
  showIf: {
    field: "dietMode",
    includes: "Enteral"
  }
},

{
  name: "enteral_other",
  label: "Other(s)",
  type: "textarea",
  showIf: {
    field: "dietMode",
    includes: "Enteral"
  }
},

{
  name: "enteral_schedule",
  label: "Feeding schedule",
  type: "single-select",
  options: ["3-hourly", "4-hourly", "Continuous"]
    .map(v => ({ label: v, value: v })),
  showIf: {
    field: "dietMode",
    includes: "Enteral"
  }
}

        ]
      },

      /* ======================================================
         O – OBJECTIVE
      ====================================================== */
      {
        title: "Objective",
        fields: [

          { type: "subheading", label: "General Observation" },
{
  type: "row",
  fields: [
    {
      name: "arousal_level",
      label: "Arousal level",
      type: "single-select",
      options: ["Alert", "Fleeting alertness", "Drowsy"]
        .map(v => ({ label: v, value: v }))
    },
    {
      name: "sitting_in",
      label: "Sitting in",
      type: "single-select",
      options: ["Chair", "Wheelchair", "Bed"]
        .map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "position",
      label: "Position",
      type: "single-select",
      options: [
        "Upright (90 degrees)",
        "Slightly reclined",
        "60 degrees",
        "45 degrees"
      ].map(v => ({ label: v, value: v }))
    },
    {
      name: "oral_hygiene",
      label: "Oral hygiene",
      type: "single-select",
      options: ["Poor", "Fair", "Good"]
        .map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  fields: [
    { name: "spo2", type: "input", label: "SpO₂ (Oxygen Saturation):", placeholder: "" },
    { name: "hr", type: "input", label: "HR (Heart Rate)", placeholder: "" }
  ]
},

{
  type: "row",
  fields: [
    { name: "rr", type: "input", label: "RR (Respiratory Rate)", placeholder: "breaths/min" },
    { type: "subheading", label: "" } // empty placeholder to keep 2-column balance
  ]
},


          { type: "subheading", label: "Oral-motor Structure Observation" },

        {
  type: "row",
  fields: [
    {
      name: "teeth",
      label: "Teeth",
      type: "single-select",
      options: ["Complete", "Incomplete", "Dentures", "Edentulous"]
        .map(v => ({ label: v, value: v }))
    },
    {
      name: "hard_palate",
      label: "Hard palate",
      type: "single-select",
      options: ["No Abnormality Detected (NAD)", "High arch", "Cleft"]
        .map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "soft_palate",
      label: "Soft palate",
      type: "single-select",
      options: ["No Abnormality Detected (NAD)", "Reduced elevation", "Bifid uvula", "Scarring"]
        .map(v => ({ label: v, value: v }))
    },
    {
      name: "tongue",
      label: "Tongue",
      type: "single-select",
      options: ["No Abnormality Detected (NAD)", "Deviation", "Fasciculations", "Thrush", "Reduced ROM"]
        .map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "lips",
      label: "Lips",
      type: "single-select",
      options: ["No Abnormality Detected (NAD)", "Reduced seal", "Asymmetry", "Cleft", "Scarring"]
        .map(v => ({ label: v, value: v }))
    },
  ]
},
{
  name: "hard_palate_remarks",
  label: "Remarks",
  type: "textarea"
},


{ type: "subheading", label: "Cranial Nerve Examination" },

{
  type: "row",
  fields: [
    {
      name: "cn5_motor",
      label: "CN V: Motor (Jaw ROM/strength)",
      type: "single-select",
      options: ["Within Normal Limits (WNL)", "Reduced"].map(v => ({ label: v, value: v }))
    },
    {
      name: "cn5_sensory",
      label: "CN V: Sensory (Facial sensation)",
      type: "single-select",
      options: ["Within Normal Limits (WNL)", "Reduced"].map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "cn7_motor",
      label: "CN VII: Motor (Facial movements)",
      type: "single-select",
      options: ["Within Normal Limits (WNL)", "Reduced"].map(v => ({ label: v, value: v }))
    },
    {
      name: "cn7_symmetry",
      label: "Facial symmetry",
      type: "single-select",
      options: ["Symmetry", "Asymmetrical", "Lt Facial Droop", "Rt Facial Droop"]
        .map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "cn7_sensory",
      label: "CN VII: Sensory (Taste – ant 2/3 tongue)",
      type: "single-select",
      options: ["Within Normal Limits (WNL)", "Reduced", "Not Tested"]
        .map(v => ({ label: v, value: v }))
    },
    {
      name: "cn9_10_motor",
      label: "CN IX & X: Motor (SP, Cough)",
      type: "single-select",
      options: ["Within Normal Limits (WNL)", "Reduced"].map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "cn9_10_sensory",
      label: "CN IX & X: Sensory (Gag)",
      type: "single-select",
      options: ["Within Normal Limits (WNL)", "Reduced", "Not Tested"]
        .map(v => ({ label: v, value: v }))
    },
    {
      name: "voice_quality",
      label: "Voice quality",
      type: "single-select",
      options: ["No Abnormality Detected (NAD)", "Impaired"].map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "cn12_motor",
      label: "CN XII: Motor (Tongue ROM/strength)",
      type: "single-select",
      options: ["Within Normal Limits (WNL)", "Reduced"].map(v => ({ label: v, value: v }))
    },
   
  ]
},


          /* ================= CLINICAL SWALLOWING EVALUATION ================= */

          { type: "subheading", label: "Clinical Swallowing Evaluation (CSE)" },



          /* ---------- Fluids ---------- */

          {
            name: "cseFluids",
            label: "Fluids ",
            type: "multi-select-dropdown",
            options: [
              "Level 0 – Thin",
              "Level 1 – Slightly Thick",
              "Level 2 – Mildly Thick",
              "Level 3 – Moderately Thick"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "cseFluidsNotes",
            type: "multi-notes",
            source: "cseFluids"
          },

          /* ---------- Foods ---------- */

          {
            name: "cseFoods",
            label: "Foods ",
            type: "multi-select-dropdown",
            options: [
              "Level 4 – Extremely Thick / Pureed",
              "Level 5 – Minced & Moist",
              "Level 6 – Soft & Bite-sized",
              "Level 7 EC – Regular Easy to Chew",
              "Level 7 – Regular"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "cseFoodsNotes",
            type: "multi-notes",
            source: "cseFoods"
          },

          /* ---------- Oral Phase Observations ---------- */

      { type: "subheading", label: "Oral Phase Observations" },

{
  type: "row",
  fields: [
    {
      name: "cseLipSeal",
      label: "Lip seal",
      type: "single-select",
      options: [
        { label: "Adequate", value: "adequate" },
        { label: "Left anterior spillage", value: "left_spillage" },
        { label: "Right anterior spillage", value: "right_spillage" }
      ]
    },
    {
      name: "cseMastication",
      label: "Mastication",
      type: "single-select",
      options: [
        { label: "Functional", value: "functional" },
        { label: "Impaired", value: "impaired" }
      ]
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "cseOralResidue",
      label: "Oral residue",
      type: "single-select",
      options: [
        { label: "None", value: "none" },
        { label: "Mild", value: "mild" },
        { label: "Moderate", value: "moderate" },
        { label: "Severe", value: "severe" }
      ]
    },
  
  ]
},


          /* ---------- Pharyngeal Phase Observations ---------- */

          { type: "subheading", label: "Pharyngeal Phase Observations" },

          {
            name: "cseNasalRegurgitation",
            label: "Nasal regurgitation",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },

          {
            name: "cseCough",
            label: "Cough / Throat clear",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },

          {
            name: "cseVoicePost",
            label: "Voice post-swallow",
            type: "single-select",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Wet", value: "wet" },
              { label: "Aphonia", value: "aphonia" }
            ]
          },

          {
            name: "cseCervicalAusc",
            label: "Cervical auscultation",
            type: "single-select",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Reduced", value: "reduced" },
              { label: "Wet / gurgly", value: "wet" },
              { label: "N/A", value: "na" }
            ]
          }

        ]
      },

      /* ======================================================
         A – ANALYSIS / ASSESSMENT
      ====================================================== */
      {
        title: "Analysis / Assessment",
        fields: [


          {
            name: "dysphagia_characteristics",
            label: "The patient presents with dysphagia",
            type: "multi-select-dropdown",
            options: [
              "Anterior spillage",
              "Slow / ineffective mastication",
              "Oral residue post swallow",
              "Overt signs of aspiration",
              "Suspected silent aspiration",
              "Other(s)"
            ].map(v => ({ label: v, value: v }))
          },
              {
            name: "Others",
            label: "Others",
            type: "textarea"
          },
          { type: "subheading", label: "Functional Oral Intake Scale (FOIS)" },

/* -------- TUBE DEPENDENT (Levels 1–3) -------- */
{
  name: "fois_tube_dependent",
  label: "Tube Dependent (Levels 1–3)",
  type: "single-select",
  options: [
    { label: "Level 1 – No oral intake", value: "1" },
    { label: "Level 2 – Tube dependent with minimal / inconsistent oral intake", value: "2" },
    { label: "Level 3 – Tube dependent with consistent oral intake", value: "3" }
  ]
},

/* -------- TOTAL ORAL INTAKE (Levels 4–7) -------- */
{
  name: "fois_total_oral",
  label: "Total Oral Intake (Levels 4–7)",
  type: "single-select",
  options: [
    { label: "Level 4 – Total oral intake of a single consistency", value: "4" },
    { label: "Level 5 – Total oral intake of multiple consistencies requiring special preparation", value: "5" },
    {
      label:
        "Level 6 – Total oral intake with no special preparation, but must avoid specific foods or liquid items",
      value: "6"
    },
    { label: "Level 7 – Total oral intake with no restrictions", value: "7" }
  ]
},
        ]
      },

      /* ======================================================
         P – PLAN
      ====================================================== */
     {
  title: "P – Plan",
  fields: [

    { type: "subheading", label: "Swallowing Recommendations" },

    {
      type: "row",
      fields: [
        {
          name: "plan_food_iddsi",
          label: "Food – IDDSI level",
          type: "multi-select-dropdown",
          options: [
              "Level 3 – Moderately thick",
        "Level 4 – Extremely thick",
        "Level 5 – Minced & moist",
        "Level 6 – Soft & bite-sized",
        "Level 7 EC – Regular Easy to chew",
        "Level 7 – Regular"
          ].map(v => ({ label: v, value: v }))
        },
        {
          name: "plan_food_amount",
          label: "Amount",
          type: "single-select",
          options: ["Oral-trails","Half portion", "Full portion"].map(v => ({ label: v, value: v }))
        }
      ]
    },

    {
      type: "row",
      fields: [
                {
          name: "plan_oral_frequency",
          label: "Frequency (times/day)",
          type: "input",
          placeholder: "times/day"
        },
        {
          name: "plan_fluids_iddsi",
          label: "Fluids – IDDSI level",
          type: "multi-select-dropdown",
          options: [  "Level 0 – Thin",
        "Level 1 – Slightly thick",
        "Level 2 – Mildly thick",
        "Level 3 – Moderately thick",
        "Level 4 – Extremely thick"]
            .map(v => ({ label: v, value: v }))
        },
      
      ]
    },

    {
      type: "row",
      fields: [
  {
          name: "plan_fluid_amount",
          label: "Amount (e.g. 50 ml / 100 ml)",
          type: "input",
          placeholder: "e.g. 50 ml / 100 ml"
        },
        {
          name: "plan_enteral_frequency",
          label: "Frequency (as & when / every feed)",
          type: "input",
          placeholder: "as & when / every feed"
        }
      ]
    },



    { type: "subheading", label: "Safe Swallowing Strategies" },

    {
      name: "safe_strategies",
      type: "multi-select-dropdown",
      options: [
        "Upright fully during intake & 30 min post",
        "Feed via spoon only",
        "Small sips / bites",
        "Slow rate",
        "Provide verbal cue to swallow",
        "Double / multiple swallows",
        "Voluntary cough",
        "Head turn to the weak side",
        "Head tilt to the strong side",
        "Chin tuck",
        "Cyclic ingestion"
      ].map(v => ({ label: v, value: v }))
    },

    { type: "subheading", label: "Monitoring During Oral Intake" },

    {
      name: "monitoring",
      type: "multi-select-dropdown",
      options: [
        "Monitor for overt signs of aspiration (coughing, throat clearing, wet/gurgly voice, increased respiratory effort, desaturation)",
        "Stop oral intake if overt aspiration occurs or patient fatigues",
        "Document tolerance and clinical signs post-intake"
      ].map(v => ({ label: v, value: v }))
    },

    { type: "subheading", label: "Oral Care" },

    {
      name: "oral_care_method",
      label: "Method",
      type: "multi-select-dropdown",
      options: ["Brush teeth", "Gauze stick", "Gargle"]
        .map(v => ({ label: v, value: v }))
    },

    {
      name: "oral_care_frequency",
      label: "Frequency",
      type: "single-select",
      options: [
        "Once daily",
        "Twice daily",
        "3–4 times/day",
        "Before & after meals"
      ].map(v => ({ label: v, value: v }))
    },

    { type: "subheading", label: "Therapy" },

    {
      name: "therapy_plan",
      type: "multi-select-dropdown",
      options: [
        "Training about swallowing",
        "Education about swallowing",
        "Advising about swallowing"
      ].map(v => ({ label: v, value: v }))
    },

    { type: "subheading", label: "Other Management" },

    {
      name: "referral_specialist",
      label: "Referral – Specialist",
      type: "textarea",
      placeholder: "Free text"
    }
  ]
}

    ]
  };

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

const onAction = (type) => {
  if (type === "submit") {
    setSubmitted(true);
    console.log("PAED IA Speech & Language", values);
  }

  if (type === "back") {
    onBack?.();   // go back to Patients page
  }
};


  return (
    <CommonFormBuilder
      schema={CSE_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    />
  );
}
