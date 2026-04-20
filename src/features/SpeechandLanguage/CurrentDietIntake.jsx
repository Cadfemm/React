import { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

/* ================= CONSTANTS ================= */

const DIET_TYPE_OPTIONS = [
  { label: "Oral", value: "oral" },
  { label: "Enteral feeding", value: "enteral" }
];

const FOOD_CONSISTENCY_OPTIONS = [
  { label: "Level 3 - Liquidised", value: "3" },
  { label: "Level 4 - Pureed", value: "4" },
  { label: "Level 5 - Minced & Moist", value: "5" },
  { label: "Level 6 - Soft & Bite-sized", value: "6" },
  { label: "Level 7EC - Easy to chew", value: "7EC" },
  { label: "Level 7 - Regular", value: "7" }
];

const FLUID_CONSISTENCY_OPTIONS = [
  { label: "Level 0 - Thin", value: "0" },
  { label: "Level 1 - Slightly Thick", value: "1" },
  { label: "Level 2 - Mildly Thick", value: "2" },
  { label: "Level 3 - Moderately Thick", value: "3" },
  { label: "Level 4 - Extremely Thick", value: "4" }
];

const AMOUNT_OPTIONS = [
  { label: "Half portion", value: "half" },
  { label: "Full portion", value: "full" }
];

const FEEDING_SCHEDULE_OPTIONS = [
  { label: "3-hourly", value: "3h" },
  { label: "4-hourly", value: "4h" },
  { label: "Continuous", value: "continuous" }
];


/* ================= COMPONENT ================= */

// export default function CurrentDietIntake() {
export default function CurrentDietIntake({ mode = "objective" }) {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => {
      let updated = { ...prev, [name]: value };

      // reset logic
      if (name === "dietType") {
        if (value === "oral") {
          delete updated.type;
          delete updated.regimen;
          delete updated.feedingSchedule;
          delete updated.iddsiLevel;
          delete updated.fluids;
          delete updated.food;
        } else {
          delete updated.foodConsistency;
          delete updated.fluidConsistency;
          delete updated.amount;
          delete updated.frequency;
        }
      }

      // 🔥 IDDSI AUTO MAP
      if (name === "iddsiLevel") {
        const map = {
          "0": { fluids: "Thin", food: "" },
          "1": { fluids: "Slightly Thick", food: "" },
          "2": { fluids: "Mildly Thick", food: "" },
          "3": { fluids: "Moderately Thick", food: "Liquidised" },
          "4": { fluids: "Extremely Thick", food: "Pureed" },
          "5": { fluids: "", food: "Minced & Moist" },
          "6": { fluids: "", food: "Soft & Bite-sized" },
          "7EC": { fluids: "", food: "Regular - Easy to chew" },
          "7": { fluids: "", food: "Regular" }
        };

        updated.fluids = map[value]?.fluids || "";
        updated.food = map[value]?.food || "";
      }

      return updated;
    });
  };

  const SCHEMA = {
    sections: [
      {
        fields: [
                            { type: "subheading", label: "CSE (Clinical Swallowing Evaluation)"},

          {
            name: "dietType",
            label: "Current Diet Intake",
            type: "radio",
            options: DIET_TYPE_OPTIONS
          },

          // ===== ORAL =====
          {
            name: "foodConsistency",
            label: "Food consistency",
            type: "radio",
            options: FOOD_CONSISTENCY_OPTIONS,
            visibleIf: { dietType: "oral" }
          },
          {
            name: "fluidConsistency",
            label: "Fluids consistency",
            type: "radio",
            options: FLUID_CONSISTENCY_OPTIONS,
            visibleIf: { dietType: "oral" }
          },
          {
            name: "amount",
            label: "Amount",
            type: "radio",
            options: AMOUNT_OPTIONS,
            visibleIf: { dietType: "oral" }
          },
          {
            name: "frequency",
            label: "Frequency (times/day)",
            type: "textarea",
            visibleIf: { dietType: "oral" }
          },

          // ===== ENTERAL =====
          {
            name: "type",
            label: "Type",
            type: "radio",
            options: ["OGT", "NGT", "NJT", "G-tube", "J-tube"],
            visibleIf: { dietType: "enteral" }
          },
          {
            name: "regimen",
            label: "Regimen",
            type: "textarea",
            visibleIf: { dietType: "enteral" }
          },
          {
            name: "scoops",
            label: "Scoops",
            type: "textarea",
            visibleIf: { dietType: "enteral" }
          },
          {
            name: "water",
            label: "Water (ml)",
            type: "input",
            visibleIf: { dietType: "enteral" }
          },
          {
            name: "feedingSchedule",
            label: "Feeding schedule",
            type: "radio",
            options: FEEDING_SCHEDULE_OPTIONS,
            visibleIf: { dietType: "enteral" }
          },

          // ===== IDDSI =====
          {
            name: "iddsiLevel",
            label: "IDDSI Level",
            type: "radio",
            options: ["0","1","2","3","4","5","6","7EC","7"],
            visibleIf: { dietType: "enteral" }
          },
          {
  type: "row",
  visibleIf: { dietType: "enteral" },
  fields: [
    {
      name: "fluids",
      label: "Fluids",
      type: "input",
      readOnly: true,
      visibleIf: (data) =>
        ["0","1","2","3","4"].includes(data.iddsiLevel),
      style: { flex: 1 }
    },
    {
      name: "food",
      label: "Food",
      type: "input",
      readOnly: true,
      visibleIf: (data) =>
        ["3","4","5","6","7EC","7"].includes(data.iddsiLevel),
      style: { flex: 1 }
    }
  ]
},

         
        ]
      }
    ]
  };

const SCHEMA_Objective = {
  sections: [
    {
      title: "Consistencies & amount trialled",
      fields: [
                  { type: "subheading", label: "CSE (Clinical Swallowing Evaluation)"},

       {
  name: "consistencyType",
  label: "Select Type",
  type: "radio",
  options: [
    { label: "Fluids", value: "fluids" },
    { label: "Food", value: "food" }
  ]
},

// ===== FLUIDS (checkbox + ml input per level) =====
{
  name: "fluid_iddsi_level",
  type: "checkbox-group",
  label: "Fluids: IDDSI Level",
  options: [
    { label: "0 - Thin", value: "0" },
    { label: "1 - Slightly Thick", value: "1" },
    { label: "2 - Mildly Thick", value: "2" },
    { label: "3 - Moderately Thick", value: "3" },
    { label: "4 - Extremely Thick", value: "4" }
  ],
  showIf: {
    field: "consistencyType",
    equals: "fluids"
  }
},
// ===== FOOD (checkbox + ml input per level) =====
{
  name: "food_iddsi_level",
  type: "checkbox-group",
  label: "Food: IDDSI Level",
  options: [
    { label: "3 - Liquidised", value: "3" },
    { label: "4 - Pureed", value: "4" },
    { label: "5 - Minced & Moist", value: "5" },
    { label: "6 - Soft & Bite-sized", value: "6" },
    { label: "7EC - Easy to chew", value: "7EC" },
    { label: "7 - Regular", value: "7" }
  ],
  showIf: {
    field: "consistencyType",
    equals: "food"
  }
},

// ===== FOOD (simple checkbox selection) =====

      ]
    },

    // ===== ORAL PHASE =====
    {
      title: "Oral Phase Observations",
      fields: [
        {
          name: "lipSeal",
          label: "Lip seal",
          type: "radio",
          options: [
            "Adequate",
            "Lt anterior spillage",
            "Rt anterior spillage"
          ]
        },
        {
          name: "mastication",
          label: "Mastication",
          type: "radio",
          options: ["Functional", "Impaired"]
        },
        {
          name: "oralResidue",
          label: "Oral residue",
          type: "radio",
          options: ["None", "Mild", "Moderate", "Severe"]
        }
      ]
    },

    // ===== PHARYNGEAL =====
    {
      title: "Pharyngeal Phase Observations",
      fields: [
        {
          name: "nasalRegurgitation",
          label: "Nasal regurgitation",
          type: "radio",
          options: ["Yes", "No"]
        },
        {
          name: "coughThroatClear",
          label: "Cough / throat clear",
          type: "radio",
          options: ["Yes", "No"]
        },
        {
          name: "voicePostSwallow",
          label: "Voice post-swallow",
          type: "radio",
          options: ["Clear", "Wet", "Aphonia"]
        },
        {
          name: "cervicalAuscultation",
          label: "Cervical auscultation",
          type: "radio",
          options: ["Normal", "Reduced", "Wet", "Gurgly", "N/A"]
        }
      ]
    }
  ]
};
//   const SCHEMA_Objective = {
//     sections: [
//       {
//         title: "Current Diet Intake",
//         fields: [
//           {
//   title: "Consistencies & amount trialled",
//   fields: [
//     {
//       type: "group",
//       name: "fluids",
//       label: "Fluids (tick all that apply)",
//       fields: [
//         {
//           type: "row",
//           fields: [
//             {
//               name: "fluids_0_checked",
//               type: "checkbox",
//               label: "0 - Thin"
//             },
//             {
//               name: "fluids_0_amount",
//               type: "input",
//               placeholder: "ml",
//               visibleIf: (data) => data.fluids_0_checked,
//               style: { width: 100 }
//             }
//           ]
//         },
//         {
//           type: "row",
//           fields: [
//             {
//               name: "fluids_1_checked",
//               type: "checkbox",
//               label: "1 - Slightly Thick"
//             },
//             {
//               name: "fluids_1_amount",
//               type: "input",
//               placeholder: "ml",
//               visibleIf: (data) => data.fluids_1_checked
//             }
//           ]
//         },
//         {
//           type: "row",
//           fields: [
//             {
//               name: "fluids_2_checked",
//               type: "checkbox",
//               label: "2 - Mildly Thick"
//             },
//             {
//               name: "fluids_2_amount",
//               type: "input",
//               placeholder: "ml",
//               visibleIf: (data) => data.fluids_2_checked
//             }
//           ]
//         },
//         {
//           type: "row",
//           fields: [
//             {
//               name: "fluids_3_checked",
//               type: "checkbox",
//               label: "3 - Moderately Thick"
//             },
//             {
//               name: "fluids_3_amount",
//               type: "input",
//               placeholder: "ml",
//               visibleIf: (data) => data.fluids_3_checked
//             }
//           ]
//         },
//         {
//           type: "row",
//           fields: [
//             {
//               name: "fluids_4_checked",
//               type: "checkbox",
//               label: "4 - Extremely Thick"
//             },
//             {
//               name: "fluids_4_amount",
//               type: "input",
//               placeholder: "ml",
//               visibleIf: (data) => data.fluids_4_checked
//             }
//           ]
//         }
//       ]
//     }
//   ]
// },
//  {
//           name: "lipSeal",
//           label: "Lip seal",
//           type: "radio",
//           options: [
//             "Adequate",
//             "Lt anterior spillage",
//             "Rt anterior spillage"
//           ]
//         },
//         {
//           name: "mastication",
//           label: "Mastication",
//           type: "radio",
//           options: ["Functional", "Impaired"]
//         },
//         {
//           name: "oralResidue",
//           label: "Oral residue",
//           type: "radio",
//           options: ["None", "Mild", "Moderate", "Severe"]
//         }
//       ]
//     },

//     {
//       title: "Pharyngeal Phase Observations",
//       fields: [
//         {
//           name: "nasalRegurgitation",
//           label: "Nasal regurgitation",
//           type: "radio",
//           options: ["Yes", "No"]
//         },
//         {
//           name: "coughThroatClear",
//           label: "Cough / throat clear",
//           type: "radio",
//           options: ["Yes", "No"]
//         },
//         {
//           name: "voicePostSwallow",
//           label: "Voice post-swallow",
//           type: "radio",
//           options: ["Clear", "Wet", "Aphonia"]
//         },
//         {
//           name: "cervicalAuscultation",
//           label: "Cervical auscultation",
//           type: "radio",
//           options: ["Normal", "Reduced", "Wet", "Gurgly", "N/A"]
//         },
         
//         ]
//       }
//     ]
//   };

const SCHEMA_ASSESSMENT = {
  sections: [
    {
      title: "CSE",
      fields: [

                          { type: "subheading", label: "CSE (Clinical Swallowing Evaluation)"},


         {
        name: "swallowing_status",
        type: "radio",
        label: "Swallowing",
        options: [
          { label: "No swallowing impairment", value: "none" },
          { label: "Signs and symptoms of dysphagia present (ICD-10: R13)", value: "dysphagia" }
        ]
      },
      { type: "subheading", label: "Characteristics"},

      {
        type: "checkbox-group",
        label: "Characteristics ",
        options: [
          { label: "Anterior spillage", value: "anterior_spillage" },
          { label: "Slow/ineffective mastication", value: "mastication" },
          { label: "Oral residue post swallow", value: "residue" },
          { label: "Overt signs of aspiration (coughing, wet voice, increased work of breathing)", value: "overt_aspiration" },
          { label: "Suspected silent aspiration (reduced cough response)", value: "silent_aspiration" },
          { label: "Other(s)", value: "other", hasTextInput: true }
        ]
      },

        // ===== FOIS SCALE =====
                  { type: "subheading", label: "Functional Oral Intake Scale (FOIS)"},

        {
          name: "fois",
          type: "radio",
          fullWidth: true,              // ✅ makes it take full row
          direction: "column",
          options: [
            { label: "1 - No oral intake", value: "1" },
            { label: "2 - Tube dependent with minimal/inconsistent oral intake", value: "2" },
            { label: "3 - Tube supplements with consistent oral intake", value: "3" },
            { label: "4 - Total oral intake of a single consistency", value: "4" },
            { label: "5 - Total oral intake of multiple consistencies requiring special preparation", value: "5" },
            { label: "6 - Total oral intake with no special preparation, but must avoid specific foods/liquids", value: "6" },
            { label: "7 - Total oral intake with no restrictions", value: "7" }
          ]
        }
      ]
    }
  ]
};
const SCHEMA_PLAN = {
  sections: [
    {
      title: "Swallowing Recommendations",
      fields: [
                          { type: "subheading", label: "CSE (Clinical Swallowing Evaluation)"},

        // ===== FOOD =====
    //     {
    //       type: "group",
    //       label: "Food",
    //       fields: [
    //         {
    //           name: "foodMode",
    //           type: "radio",
    //           options: ["NPO", "Allow orally"]
    //         },
    //         {
    //           name: "foodIddsi",
    //           label: "IDDSI Level",
    //           type: "checkbox-group=",
    //           options: ["3","4","5","6","7EC","7"]
    //         },
    //         {
    //           name: "foodAmount",
    //           label: "Amount",
    //           type: "radio",
    //           options: ["Oral trials", "Half portion", "Full portion"]
    //         },
    //         {
    //           name: "foodFrequency",
    //           label: "Frequency (times/day)",
    //           type: "input"
    //         }
    //       ]
    //     },

    //     // ===== FLUIDS =====
    //     {
    //       type: "group",
    //       label: "Fluids",
    //       fields: [
    //         {
    //           name: "fluidMode",
    //           type: "radio",
    //           options: ["NPO", "Allow orally"]
    //         },
    //         {
    //           name: "fluidIddsi",
    //           label: "IDDSI Level",
    //           type: "checkbox-group",
    //           options: ["0","1","2","3","4"]
    //         },
    //         {
    //           name: "fluidAmount",
    //           label: "Amount",
    //           type: "radio",
    //           options: ["50 ml", "100 ml", "No restriction"]
    //         },
    //         {
    //           name: "fluidFrequency",
    //           label: "Frequency",
    //           type: "radio",
    //           options: ["Every feeding time", "As & when"]
    //         }
    //       ]
    //     },

    //     // ===== NON ORAL =====
    //     {
    //       name: "nonOralFeeding",
    //       label: "Non-Oral Feeding",
    //       type: "radio",
    //       options: [
    //         "Continue enteral feeding as per dietitian’s order",
    //         "N/A"
    //       ]
    //     },
    //     {
    //       name: "referral",
    //       type: "radio",
    //       label: "Referral for medical management"
    //     },
    //     {
    //       name: "furtherAssessment",
    //       type: "radio",
    //       label: "Further Assessment",
         
    //     },
    //   ]
    // },

    // // ===== SAFE STRATEGIES =====
    // {
    //   title: "Safe Swallowing Strategies",
    //   fields: [
    //     {
    //       name: "strategies",
    //       type: "checkbox-group",
    //       options: [
    //         "Upright fully during intake & 30 min post",
    //         "Feed via spoon only",
    //         "Small sips/bites",
    //         "Slow rate",
    //         "Provide verbal cue to swallow",
    //         "Double/multiple swallows",
    //         "Voluntary cough",
    //         "Head turn to weak side",
    //         "Head tilt to strong side",
    //         "Chin tuck",
    //         "Cyclic ingestion"
    //       ]
    //     }
    {
    name: "food_route",
    type: "radio",
    label: "Food: Route",
    options: ["NPO", "Allow orally"]
  },
    {
    name: "food_iddsi_level",
    type: "radio",
    label: "Food: IDDSI Level",
    options: ["3", "4", "5", "6", "7EC", "7"]
  },
   {
    name: "food_amount",
    type: "radio",
    label: "Food: Amount",
    options: ["Oral trials", "Half portion", "Full portion"]
  },
  {
    name: "food_frequency",
    type: "input",
    label: "Food: Frequency (times/day)"
  },

  {
    name: "fluid_route",
    type: "radio",
    label: "Fluids: Route",
    options: ["NPO", "Allow orally"]
  },
  {
    name: "fluid_iddsi_level",
    type: "radio",
    label: "Fluids: IDDSI Level",
    options: ["0", "1", "2", "3", "4"]
  },
  {
    name: "fluid_amount",
    type: "radio",
    label: "Fluids: Amount",
    options: ["50 ml", "100 ml", "No restriction"]
  },
  {
    name: "fluid_frequency",
    type: "radio",
    label: "Fluids: Frequency",
    options: ["Every feeding time", "As & when"]
  },
   {
    name: "Non-Oral Feeding",
    type: "radio",
    label: "Non-Oral Feeding",
    options: ["Continue enteral feeding as per dietition's order", "N/A"]
  },
  {
            name: "iddsiLevel",
            label: "IDDSI Level",
            type: "radio",
            options: ["0","1","2","3","4","5","6","7EC","7"],
            visibleIf: { dietType: "enteral" }
          },
          {
  type: "row",
  visibleIf: { dietType: "enteral" },
  fields: [
    {
      name: "fluids",
      label: "Fluids",
      type: "input",
      readOnly: true,
      visibleIf: (data) =>
        ["0","1","2","3","4"].includes(data.iddsiLevel),
      style: { flex: 1 }
    },
    {
      name: "food",
      label: "Food",
      type: "input",
      readOnly: true,
      visibleIf: (data) =>
        ["3","4","5","6","7EC","7"].includes(data.iddsiLevel),
      style: { flex: 1 }
    },
  ]
},
            { type: "subheading", label: "Safe Swallowing Strategies"},


    {
  name: "safe_swallowing_strategies",
  type: "checkbox-group",
  options: [
    { label: "Upright fully during intake & 30 min post", value: "upright_during_and_post" },
    { label: "Feed via spoon only", value: "feed_via_spoon_only" },
    { label: "Small sips/bites", value: "small_sips_bites" },
    { label: "Slow rate", value: "slow_rate" },
    { label: "Provide verbal cue to swallow", value: "verbal_cue_to_swallow" },
    { label: "Double/multiple swallows", value: "double_multiple_swallows" },
    { label: "Voluntary cough", value: "voluntary_cough" },
    { label: "Head turn to the weak side", value: "head_turn_weak_side" },
    { label: "Head tilt to the strong side", value: "head_tilt_strong_side" },
    { label: "Chin tuck", value: "chin_tuck" },
    { label: "Cyclic ingestion", value: "cyclic_ingestion" }
  ]
},

          { type: "subheading", label: "Monitoring During Oral Intake" },
{
  name: "monitoring_during_oral_intake",
  type: "radio",
  options: ["Monitor for overt signs of aspiration (coughing, throat clearing, wet/gurgly voice, increased respiratory effort, desaturation)", "Stop oral intake if overt aspiration occurs or patient fatigues", "Document tolerance and clinical signs post-intake",    "Document tolerance and clinical signs post-intake",
    "Stop oral intake if overt aspiration occurs or patient fatigues"
  ],
   
  
},
          { type: "subheading", label: "ORAL CARE" },


 {
    name: "oral_care_method",
    type: "radio",
    label: "Oral Care: Method",
    options: [
      { label: "Brush teeth", value: "brush_teeth" },
      { label: "Gauze stick", value: "gauze_stick" },
      { label: "Gargle", value: "gargle" }
    ]
  },
  {
    name: "oral_care_frequency",
    type: "radio",
    label: "Oral Care: Frequency",
    options: [
      { label: "3-4 times/day", value: "3_4_times_per_day" },
      { label: "Before & after meals/oral trials", value: "before_after_meals" }
    ]
  },
   {
  name: "therapy",
  type: "radio",
  label: "Therapy",
  options: [
    {
      label: "KTC.PH.ZZ Training about swallowing",
      value: "ktc_ph_zz_training_swallowing"
    },
    {
      label: "KTC.PM.ZZ Education about swallowing",
      value: "ktc_pm_zz_education_swallowing"
    },
    {
      label: "KTC.PN.ZZ Advising about swallowing",
      value: "ktc_pn_zz_advising_swallowing"
    }
  ]
},
{
  name: "swallow_exercises",
  type: "textarea",
  label: "Swallow Exercises",
  placeholder: "Enter exercises details",
  rows: 3
},
{
  name: "other_management",
  type: "radio",
  label: "Other Management",
  options: [
    {
      label: "Referral for medical management",
      value: "referral_medical_management"
    },
    {
      label: "Further Assessment",
      value: "further_assessment"
    }
  ]
},
  

  
      ]
    },

    // ===== MONITORING =====
 
  ]
};
const SCHEMA_MAP = {
  subjective: SCHEMA,
  objective: SCHEMA_Objective,
  assessment: SCHEMA_ASSESSMENT,
  plan: SCHEMA_PLAN
};
  return (

    
    <div style={{ padding: 20 }}>
    <CommonFormBuilder
      schema={SCHEMA_MAP[mode]}
      values={values}
      onChange={handleChange}
    />
  </div>
  );
}