
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

      // clear opposite type's checkboxes + ml inputs when switching Select Type
      if (name === "consistencyType") {
        if (value === "fluids") {
          delete updated.food_iddsi_level;
          delete updated.liquidised_ml;
          delete updated.pureed_ml;
          delete updated.minced_tsp;
          delete updated.soft_tsp;
          delete updated.easy_chew_piece;
          delete updated.regular_piece;
        } else if (value === "food") {
          delete updated.fluid_iddsi_level;
          delete updated.thin_ml;
          delete updated.slightly_thick_ml;
          delete updated.mildly_thick_ml;
          delete updated.moderately_thick_ml;
          delete updated.extremely_thick_ml;
        }
      }

      // 🔥 IDDSI AUTO MAP (subjective)
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

      // 🔥 IDDSI AUTO MAP (plan)
      if (name === "plan_iddsi_level") {
        const map = {
          "0": { plan_fluids: "Thin", plan_food: "" },
          "1": { plan_fluids: "Slightly Thick", plan_food: "" },
          "2": { plan_fluids: "Mildly Thick", plan_food: "" },
          "3": { plan_fluids: "Moderately Thick", plan_food: "Liquidised" },
          "4": { plan_fluids: "Extremely Thick", plan_food: "Pureed" },
          "5": { plan_fluids: "", plan_food: "Minced & Moist" },
          "6": { plan_fluids: "", plan_food: "Soft & Bite-sized" },
          "7EC": { plan_fluids: "", plan_food: "Regular - Easy to chew" },
          "7": { plan_fluids: "", plan_food: "Regular" }
        };
        updated.plan_fluids = map[value]?.plan_fluids || "";
        updated.plan_food = map[value]?.plan_food || "";
      }

      return updated;
    });
  };

  const SCHEMA = {
    sections: [
      {
        fields: [
          { type: "subheading", label: " Swallowing" },

          {
            name: "dietType",
            label: "Current Diet Intake",
            type: "checkbox-group",
            options: DIET_TYPE_OPTIONS
          },

          // ===== ORAL =====
          {
            name: "foodConsistency",
            label: "Food consistency",
            type: "radio",
            options: FOOD_CONSISTENCY_OPTIONS,
            showIf: { field: "dietType", equals: "oral" }
          },
          {
            name: "fluidConsistency",
            label: "Fluids consistency",
            type: "radio",
            options: FLUID_CONSISTENCY_OPTIONS,
            showIf: { field: "dietType", equals: "oral" }
          },
          {
            name: "amount",
            label: "Amount",
            type: "radio",
            options: AMOUNT_OPTIONS,
            showIf: { field: "dietType", equals: "oral" }
          },
          {
            name: "frequency",
            label: "Frequency (times/day)",
            type: "textarea",
            showIf: { field: "dietType", equals: "oral" }
          },

          // ===== ENTERAL =====
          {
            name: "type",
            label: "Type",
            type: "radio",
            options: [
              { label: "OGT", value: "OGT" },
              { label: "NGT", value: "NGT" },
              { label: "NJT", value: "NJT" },
              { label: "G-tube", value: "G-tube" },
              { label: "J-tube", value: "J-tube" }
            ],
            showIf: { field: "dietType", equals: "enteral" }
          },
          {
            name: "regimen",
            label: "Regimen",
            type: "",
            showIf: { field: "dietType", equals: "enteral" }
          },
          {
            name: "scoops",
            label: "Scoops",
            type: "textarea",
            showIf: { field: "dietType", equals: "enteral" }
          },
          {
            name: "water",
            label: "Water (ml)",
            type: "input",
            showIf: { field: "dietType", equals: "enteral" }
          },
          // {
          //   name: "feedingSchedule",
          //   label: "Feeding schedule",
          //   type: "radio",
          //   options: FEEDING_SCHEDULE_OPTIONS,
          //   showIf: { field: "dietType", equals: "enteral" }
          // },
          {
            name: "feedingSchedule",
            label: "Feeding schedule",
            type: "radio",
            options: FEEDING_SCHEDULE_OPTIONS,
            showIf: { field: "dietType", equals: "enteral" }
          },
          {
            name: "continuous_input",
            label: "Enter Continuous Feeding Details",
            type: "input",
            placeholder: "e.g., 50 ml/hr",
            showIf: {
              field: "feedingSchedule",
              equals: "continuous"
            }
          },

          // ===== IDDSI (enteral) =====
          // {
          //   name: "iddsiLevel",
          //   label: "IDDSI Level",
          //   type: "radio",
          //   options: [
          //     { label: "0", value: "0" },
          //     { label: "1", value: "1" },
          //     { label: "2", value: "2" },
          //     { label: "3", value: "3" },
          //     { label: "4", value: "4" },
          //     { label: "5", value: "5" },
          //     { label: "6", value: "6" },
          //     { label: "7EC", value: "7EC" },
          //     { label: "7", value: "7" }
          //   ],
          //   showIf: { field: "dietType", equals: "enteral" }
          // },
          // {
          //   name: "fluids",
          //   label: "Fluids",
          //   type: "input",
          //   readOnly: true,
          //   showIf: { field: "iddsiLevel", oneOf: ["0","1","2","3","4"] }
          // },
          // {
          //   name: "food",
          //   label: "Food",
          //   type: "input",
          //   readOnly: true,
          //   showIf: { field: "iddsiLevel", oneOf: ["3","4","5","6","7EC","7"] }
          // }
        ]
      }
    ]
  };

const SCHEMA_Objective = {
  sections: [
   {
    fields: [
      { type: "subheading", label: " Swallowing" },

      {
        name: "consistencyType",
        label: "Consistencies & amount trialled",
        type: "checkbox-group",
        defaultValue: [],
        options: [
          { label: "Fluids", value: "fluids" },
          { label: "Food", value: "food" }
        ]
      },

      // ===== FLUIDS =====
      {
        name: "fluid_iddsi_level",
        label: "Fluids: IDDSI Level",
        type: "checkbox-group",
        defaultValue: [],
        options: [
          { label: "0 - Thin", value: "thin" },
          { label: "1 - Slightly Thick", value: "slightly_thick" },
          { label: "2 - Mildly Thick", value: "mildly_thick" },
          { label: "3 - Moderately Thick", value: "moderately_thick" },
          { label: "4 - Extremely Thick", value: "extremely_thick" }
        ],
        showIf: {
          field: "consistencyType",
          includes: "fluids"
        }
      },

      {
        name: "thin_ml",
        label: "0 - Thin (ml)",
        type: "input",
        showIf: {
          field: "consistencyType",
          includes: "fluids",
          and: { field: "fluid_iddsi_level", includes: "thin" }
        }
      },
      {
        name: "slightly_thick_ml",
        label: "1 - Slightly Thick (ml)",
        type: "input",
        showIf: {
          field: "consistencyType",
          includes: "fluids",
          and: { field: "fluid_iddsi_level", includes: "slightly_thick" }
        }
      },
      {
        name: "mildly_thick_ml",
        label: "2 - Mildly Thick (ml)",
        type: "input",
        showIf: {
          field: "consistencyType",
          includes: "fluids",
          and: { field: "fluid_iddsi_level", includes: "mildly_thick" }
        }
      },
      {
        name: "moderately_thick_ml",
        label: "3 - Moderately Thick (ml)",
        type: "input",
        showIf: {
          field: "consistencyType",
          includes: "fluids",
          and: { field: "fluid_iddsi_level", includes: "moderately_thick" }
        }
      },
      {
        name: "extremely_thick_ml",
        label: "4 - Extremely Thick (ml)",
        type: "input",
        showIf: {
          field: "consistencyType",
          includes: "fluids",
          and: { field: "fluid_iddsi_level", includes: "extremely_thick" }
        }
      },

      // ===== FOOD =====
      {
        name: "food_iddsi_level",
        label: "Food: IDDSI Level",
        type: "checkbox-group",
        defaultValue: [],
        options: [
          { label: "3 - Liquidised", value: "liquidised" },
          { label: "4 - Pureed", value: "pureed" },
          { label: "5 - Minced & Moist", value: "minced" },
          { label: "6 - Soft & Bite-sized", value: "soft" },
          { label: "7EC - Easy to chew", value: "easy_chew" },
          { label: "7 - Regular", value: "regular" }
        ],
        showIf: {
          field: "consistencyType",
          includes: "food"
        }
      },

      {
        name: "liquidised_ml",
        label: "3 - Liquidised (ml)",
        type: "input",
        placeholder: "Enter ml",
        showIf: {
          field: "consistencyType",
          includes: "food",
          and: { field: "food_iddsi_level", includes: "liquidised" }
        }
      },
      {
        name: "pureed_ml",
        label: "4 - Pureed (ml)",
        type: "input",
        placeholder: "Enter ml",
        showIf: {
          field: "consistencyType",
          includes: "food",
          and: { field: "food_iddsi_level", includes: "pureed" }
        }
      },
      {
        name: "minced_tsp",
        label: "5 - Minced & Moist (tsp)",
        type: "input",
        placeholder: "Enter tsp",
        showIf: {
          field: "consistencyType",
          includes: "food",
          and: { field: "food_iddsi_level", includes: "minced" }
        }
      },
      {
        name: "soft_tsp",
        label: "6 - Soft & Bite-sized (tsp)",
        type: "input",
        placeholder: "Enter tsp",
        showIf: {
          field: "consistencyType",
          includes: "food",
          and: { field: "food_iddsi_level", includes: "soft" }
        }
      },
      {
        name: "easy_chew_piece",
        label: "7EC - Easy to chew (piece)",
        type: "input",
        placeholder: "Enter pieces",
        showIf: {
          field: "consistencyType",
          includes: "food",
          and: { field: "food_iddsi_level", includes: "easy_chew" }
        }
      },
      {
        name: "regular_piece",
        label: "7 - Regular (piece)",
        type: "input",
        placeholder: "Enter pieces",
        showIf: {
          field: "consistencyType",
          includes: "food",
          and: { field: "food_iddsi_level", includes: "regular" }
        }
      }
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
            "Left",
            "Right"
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
      title: "",
      fields: [

        { type: "subheading", label: "Clinical Impression"},


         {
        name: "swallowing_status",
        type: "radio",
        label: "",
        options: [
          { label: "No swallowing impairment", value: "none" },
          { label: "The patient presents with signs and symptoms of dysphagia", value: "dysphagia" }
        ]
      },
      { type: "subheading", label: "Characteristics", showIf: { field: "swallowing_status", equals: "dysphagia" } },

      {
        name: "characteristics",
        type: "checkbox-group",
        label: "Characteristics",
        showIf: { field: "swallowing_status", equals: "dysphagia" },
        options: [
          { label: "Anterior spillage", value: "anterior_spillage" },
          { label: "Slow/ineffective mastication", value: "mastication" },
          { label: "Oral residue post swallow", value: "residue" },
          { label: "Overt signs of aspiration (coughing, wet voice, increased work of breathing)", value: "overt_aspiration" },
          { label: "Suspected silent aspiration (reduced cough response)", value: "silent_aspiration" },
          { label: "Other(s)", value: "other" }
        ]
      },
      {
        name: "characteristics_other",
        label: "Other(s) - please specify",
        type: "input",
        placeholder: "Enter details",
        showIf: {
          field: "characteristics",
          includes: "other",
          and: { field: "swallowing_status", equals: "dysphagia" }
        }
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
            { label: "2 - Tube dependent with minimal / inconsistent oral intake", value: "2" },
            { label: "3 - Tube supplements with consistent oral intake", value: "3" },
            { label: "4 - Total oral intake of a single consistency", value: "4" },
            { label: "5 - Total oral intake of multiple consistencies requiring special preparation", value: "5" },
            { label: "6 - Total oral intake with no special preparation, but must avoid specific foods / liquids", value: "6" },
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
        // { type: "subheading", label: " Swallowing" },

        // ── Food Route ──
        {
          name: "food_route",
          type: "radio",
          label: "Food: Route",
          options: [
            { label: "NPO", value: "NPO" },
            { label: "Allow orally", value: "allow_orally" }
          ]
        },

        // ── Food fields: only when NOT NPO ──
        {
          name: "food_iddsi_level",
          type: "radio",
          label: "Food: IDDSI Level",
          options: ["3", "4", "5", "6", "7EC", "7"],
          showIf: { field: "food_route", equals: "allow_orally" }
        },
        {
          name: "food_amount",
          type: "radio",
          label: "Food: Amount",
          options: ["Oral trials", "Half portion", "Full portion"],
          showIf: { field: "food_route", equals: "allow_orally" }
        },
        {
          name: "food_frequency",
          type: "input",
          label: "Food: Frequency (times/day)",
          showIf: { field: "food_route", equals: "allow_orally" }
        },

        // ── Fluids Route ──
        {
          name: "fluid_route",
          type: "radio",
          label: "Fluids: Route",
          options: [
            { label: "NPO", value: "NPO" },
            { label: "Allow orally", value: "allow_orally" }
          ]
        },

        // ── Fluids fields: only when NOT NPO ──
        {
          name: "fluid_iddsi_level",
          type: "radio",
          label: "Fluids: IDDSI Level",
          options: ["0", "1", "2", "3", "4"],
          showIf: { field: "fluid_route", equals: "allow_orally" }
        },
        {
          name: "fluid_amount",
          type: "radio",
          label: "Fluids: Amount",
          options: ["50 ml", "100 ml", "No restriction"],
          showIf: { field: "fluid_route", equals: "allow_orally" }
        },
        {
          name: "fluid_frequency",
          type: "radio",
          label: "Fluids: Frequency",
          options: ["Every feeding time", "As & when"],
          showIf: { field: "fluid_route", equals: "allow_orally" }
        },

        // ── Non-Oral Feeding ──
        {
          name: "non_oral_feeding",
          type: "radio",
          label: "Non-Oral Feeding",
          options: [
            { label: "Continue enteral feeding as per dietitian's order", value: "enteral" },
            { label: "N/A", value: "na" }
          ]
        },
        {
          name: "plan_iddsi_level",
          label: "IDDSI Level",
          type: "radio",
          options: ["0", "1", "2", "3", "4", "5", "6", "7EC", "7"],
          labelAbove: true,
          showIf: { field: "non_oral_feeding", equals: "enteral" }
        },
        {
          type: "row",
          showIf: { field: "non_oral_feeding", equals: "enteral" },
          fields: [
            {
              name: "plan_fluids",
              label: "Fluids",
              type: "input",
              readOnly: true,
              showIf: { field: "plan_iddsi_level", oneOf: ["0","1","2","3","4"] }
            },
            {
              name: "plan_food",
              label: "Food",
              type: "input",
              readOnly: true,
              showIf: { field: "plan_iddsi_level", oneOf: ["3","4","5","6","7EC","7"] }
            }
          ]
        },

        { type: "subheading", label: "Safe Swallowing Strategies" },
        {
          name: "safe_swallowing_strategies",
          type: "checkbox-group",
          options: [
            { label: "Upright fully during intake & 30 min post", value: "upright_during_and_post" },
            { label: "Feed via spoon only", value: "feed_via_spoon_only" },
            { label: "Small sips / bites", value: "small_sips_bites" },
            { label: "Slow rate", value: "slow_rate" },
            { label: "Provide verbal cue to swallow", value: "verbal_cue_to_swallow" },
            { label: "Double / multiple swallows", value: "double_multiple_swallows" },
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
          type: "checkbox-group",
          options: [
            { label: "Monitor for overt signs of aspiration (coughing, throat clearing, wet / gurgly voice, increased respiratory effort, desaturation)", value: "monitor_aspiration" },
            { label: "Stop oral intake if overt aspiration occurs or patient fatigues", value: "stop_oral_intake" },
            { label: "Document tolerance and clinical signs post-intake", value: "document_tolerance" }
          ]
        },

        { type: "subheading", label: "Oral Care" },
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
            { label: "Referral for medical management", value: "referral_medical_management" },
            { label: "Further Assessment", value: "further_assessment" }
          ]
        }
      ]
    }
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
      layout="nested"
      onChange={handleChange}
    />
  </div>
  );
}