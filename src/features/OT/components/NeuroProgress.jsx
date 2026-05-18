import { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PatientCard from "../../../shared/cards/PatientCard";

/* ── Shared actions ── */
const ACTIONS = [
  { type: "clear", label: "Clear" },
  { type: "save",  label: "Save"  },
];

/* ══════════════════════════════════════════════════════════
   SCHEMAS
══════════════════════════════════════════════════════════ */

const SUBJECTIVE_SCHEMA = {
  
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [{
    fields: [
      { name: "complaint", label: "Cheif Complaint", type: "input", placeholder: "Therapist assessment..." },
      { name: "History of Present", label: "History of Present Illnes", type: "input" },
      
    ],
  }],
};
const OBJECTIVE_SCHEMA = {
  actions: [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ],

  sections: [
    {
      fields: [
        /* =========================================================
           THERAPEUTIC INTERVENTIONS
        ========================================================= */
                { type: "subheading", label: "Therapeutic Interventions" },




        /* =========================================================
           THERAPEUTIC EXERCISES
        ========================================================= */
           { type: "subheading", label: "Therapeutic Exercises" },
        {
          name: "therapeutic_exercises_items",
         
          type: "checkbox-group",
          options: [
            {
              label: "Functional ROM Exercise",
              value: "functional_rom_exercise"
            },
            {
              label: "Functional Strengthening Exercise",
              value: "functional_strengthening_exercise"
            },
            {
              label: "Muscle Tone Management",
              value: "muscle_tone_management"
            },
            {
              label: "Weight Bearing Exercise",
              value: "weight_bearing_exercise"
            },
            {
              label: "Fine Motor and Dexterity Training",
              value: "fine_motor_and_dexterity_training"
            },
            {
              label: "Coordination Training",
              value: "coordination_training"
            },
            {
              label: "Balance Training - Sitting",
              value: "balance_training_sitting"
            },
            {
              label: "Balance Training - Standing",
              value: "balance_training_standing"
            },
            {
              label: "Bobath/NDT Therapy",
              value: "bobath_ndt_therapy"
            },
            {
              label: "Constraint Induced Movement Therapy (CIMT)",
              value: "cimt"
            },
            {
              label: "Graded Motor Imagery (GMI)",
              value: "gmi"
            }
          ],
         
        },

        /* ---------- Functional ROM Exercise ---------- */
        {
          name: "functional_rom_exercise_remarks",
          label: "Functional ROM Exercise Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "functional_rom_exercise"
          }
        },

        /* ---------- Functional Strengthening Exercise ---------- */
        {
          name: "functional_strengthening_exercise_type",
          label: "Functional Strengthening Exercise Type",
          type: "radio",
          options: [
            { label: "Passive", value: "passive" },
            { label: "Active", value: "active" },
            { label: "Assisted", value: "assisted" }
          ],
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "functional_strengthening_exercise"
          }
        },
        {
          name: "functional_strengthening_exercise_remarks",
          label: "Functional Strengthening Exercise Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "functional_strengthening_exercise"
          }
        },

        /* ---------- Muscle Tone Management ---------- */
        {
          name: "muscle_tone_management_remarks",
          label: "Muscle Tone Management Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "muscle_tone_management"
          }
        },

        /* ---------- Weight Bearing Exercise ---------- */
        {
          name: "weight_bearing_exercise_remarks",
          label: "Weight Bearing Exercise Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "weight_bearing_exercise"
          }
        },

        /* ---------- Fine Motor and Dexterity Training ---------- */
        {
          name: "fine_motor_and_dexterity_training_remarks",
          label: "Fine Motor and Dexterity Training Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "fine_motor_and_dexterity_training"
          }
        },

        /* ---------- Coordination Training ---------- */
        {
          name: "coordination_training_remarks",
          label: "Coordination Training Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "coordination_training"
          }
        },

        /* ---------- Balance Training - Sitting ---------- */
        {
          name: "balance_training_sitting_type",
          label: "Balance Training - Sitting",
          type: "radio",
          options: [
            { label: "Static", value: "static" },
            { label: "Dynamic", value: "dynamic" }
          ],
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "balance_training_sitting"
          }
        },
        {
          name: "balance_training_sitting_remarks",
          label: "Balance Training - Sitting Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "balance_training_sitting"
          }
        },

        /* ---------- Balance Training - Standing ---------- */
        {
          name: "balance_training_standing_type",
          label: "Balance Training - Standing",
          type: "radio",
          options: [
            { label: "Static", value: "static" },
            { label: "Dynamic", value: "dynamic" }
          ],
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "balance_training_standing"
          }
        },
        {
          name: "balance_training_standing_remarks",
          label: "Balance Training - Standing Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "balance_training_standing"
          }
        },

        /* ---------- Bobath/NDT Therapy ---------- */
        {
          name: "bobath_ndt_therapy_type",
          label: "Bobath/NDT Therapy",
          type: "radio",
          options: [
            {
              label: "Trunk & Pelvis Facilitation",
              value: "trunk_pelvis_facilitation"
            },
            {
              label: "Lower Limb Facilitation",
              value: "lower_limb_facilitation"
            },
            {
              label: "Upper Limb & Hand Facilitation",
              value: "upper_limb_hand_facilitation"
            },
            {
              label: "Neck Facilitation",
              value: "neck_facilitation"
            }
          ],
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "bobath_ndt_therapy"
          }
        },
        {
          name: "bobath_ndt_therapy_remarks",
          label: "Bobath/NDT Therapy Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "bobath_ndt_therapy"
          }
        },

        /* ---------- CIMT ---------- */
        {
          name: "cimt_remarks",
          label: "Constraint Induced Movement Therapy (CIMT) Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "cimt"
          }
        },

        /* ---------- GMI ---------- */
        {
          name: "gmi_remarks",
          label: "Graded Motor Imagery (GMI) Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "therapeutic_exercises_items",
            includes: "gmi"
          }
        },

        /* =========================================================
           FUNCTIONAL MOBILITY TRAINING
        ========================================================= */
         { type: "subheading", label: "Functional Mobility Training" },
        {
          name: "functional_mobility_training_items",
        
          type: "checkbox-group",
          options: [
            {
              label: "Balance Training - Sitting",
              value: "balance_training_sitting"
            },
            {
              label: "Balance Training - Standing",
              value: "balance_training_standing"
            },
            {
              label: "Bobath/NDT Therapy",
              value: "bobath_ndt_therapy"
            },
            {
              label: "Constraint Induced Movement Therapy (CIMT)",
              value: "cimt"
            },
            {
              label: "Graded Motor Imagery (GMI)",
              value: "gmi"
            }
          ],
          // showIf: {
          //   field: "therapeutic_interventions",
          //   includes: "functional_mobility_training"
          // }
        },

        /* ---------- FMT Balance Training - Sitting ---------- */
        {
          name: "fmt_balance_training_sitting_type",
          label: "Balance Training - Sitting",
          type: "radio",
          options: [
            { label: "Static", value: "static" },
            { label: "Dynamic", value: "dynamic" }
          ],
          showIf: {
            field: "functional_mobility_training_items",
            includes: "balance_training_sitting"
          }
        },
        {
          name: "fmt_balance_training_sitting_remarks",
          label: "Balance Training - Sitting Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "functional_mobility_training_items",
            includes: "balance_training_sitting"
          }
        },

        /* ---------- FMT Balance Training - Standing ---------- */
        {
          name: "fmt_balance_training_standing_type",
          label: "Balance Training - Standing",
          type: "radio",
          options: [
            { label: "Static", value: "static" },
            { label: "Dynamic", value: "dynamic" }
          ],
          showIf: {
            field: "functional_mobility_training_items",
            includes: "balance_training_standing"
          }
        },
        {
          name: "fmt_balance_training_standing_remarks",
          label: "Balance Training - Standing Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "functional_mobility_training_items",
            includes: "balance_training_standing"
          }
        },

        /* ---------- FMT Bobath/NDT Therapy ---------- */
        {
          name: "fmt_bobath_ndt_therapy_type",
          label: "Bobath/NDT Therapy",
          type: "radio",
          options: [
            {
              label: "Trunk & Pelvis Facilitation",
              value: "trunk_pelvis_facilitation"
            },
            {
              label: "Lower Limb Facilitation",
              value: "lower_limb_facilitation"
            },
            {
              label: "Upper Limb & Hand Facilitation",
              value: "upper_limb_hand_facilitation"
            },
            {
              label: "Neck Facilitation",
              value: "neck_facilitation"
            }
          ],
          showIf: {
            field: "functional_mobility_training_items",
            includes: "bobath_ndt_therapy"
          }
        },
        {
          name: "fmt_bobath_ndt_therapy_remarks",
          label: "Bobath/NDT Therapy Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "functional_mobility_training_items",
            includes: "bobath_ndt_therapy"
          }
        },

        /* ---------- FMT CIMT ---------- */
        {
          name: "fmt_cimt_remarks",
          label: "Constraint Induced Movement Therapy (CIMT) Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "functional_mobility_training_items",
            includes: "cimt"
          }
        },

        /* ---------- FMT GMI ---------- */
        {
          name: "fmt_gmi_remarks",
          label: "Graded Motor Imagery (GMI) Remarks",
          type: "input",
          rows: 3,
          placeholder: "Enter remarks",
          showIf: {
            field: "functional_mobility_training_items",
            includes: "gmi"
          }
        },
        { type: "subheading", label: "Sensory Reeducation Remarks" },
        {
  name: "sensory_reeducation_remarks",
 
  type: "input",
  rows: 3,
  placeholder: "Enter sensory reeducation remarks",
  // showIf: {
  //   field: "therapeutic_interventions",
  //   includes: "sensory_reeducation"
  // }
},
/* ===================== PAIN MANAGEMENT ===================== */

/* Add this option to the "therapeutic_interventions" checkbox-group:
{
  label: "Pain Management",
  value: "pain_management"
}
*/
{ type: "subheading", label: "Pain Management" },
{
  name: "pain_management_items",
  
  type: "checkbox-group",
  options: [
    {
      label: "Cold Therapy",
      value: "cold_therapy"
    },
    {
      label: "Heat Therapy",
      value: "heat_therapy"
    },
    {
      label: "Fluidotherapy",
      value: "fluidotherapy"
    },
    {
      label: "EMS (Electrical Muscle Stimulation)",
      value: "ems"
    },
    {
      label: "Saebo Stim",
      value: "saebo_stim"
    },
    {
      label: "Others",
      value: "others"
    }
  ],
  // showIf: {
  //   field: "therapeutic_interventions",
  //   includes: "pain_management"
  // }
},

/* ===================== COLD THERAPY ===================== */
{
  name: "cold_therapy_remarks",
  label: "Cold Therapy Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_items",
    includes: "cold_therapy"
  }
},

/* ===================== HEAT THERAPY ===================== */
{
  name: "heat_therapy_remarks",
  label: "Heat Therapy Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_items",
    includes: "heat_therapy"
  }
},

/* ===================== FLUIDOTHERAPY ===================== */
{
  name: "pain_fluidotherapy_remarks",
  label: "Fluidotherapy Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_items",
    includes: "fluidotherapy"
  }
},

/* ===================== EMS ===================== */
{
  name: "pain_ems_remarks",
  label: "EMS (Electrical Muscle Stimulation) Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_items",
    includes: "ems"
  }
},

/* ===================== SAEBO STIM ===================== */
{
  name: "pain_saebo_stim_remarks",
  label: "Saebo Stim Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_items",
    includes: "saebo_stim"
  }
},

/* ===================== OTHERS ===================== */
{
  name: "pain_management_others",
  label: "Others",
  type: "input",
  placeholder: "Specify other pain management intervention",
  showIf: {
    field: "pain_management_items",
    includes: "others"
  }
},
{
  name: "pain_management_others_remarks",
  label: "Others Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "pain_management_items",
    includes: "others"
  }
},
/* ===================== ADL AND FUNCTIONAL TRAINING ===================== */

/* Add this option to the "therapeutic_interventions" checkbox-group:
{
  label: "ADL and Functional Training",
  value: "adl_functional_training"
}
*/
{ type: "subheading", label: "ADL and Functional Training" },

{
  name: "adl_functional_training_items",
 
  type: "checkbox-group",
  options: [
    {
      label: "ADL Training",
      value: "adl_training"
    }
  ],
  // showIf: {
  //   field: "therapeutic_interventions",
  //   includes: "adl_functional_training"
  // }
},

/* ===================== ADL TRAINING ===================== */
{
  name: "adl_training_items",
  label: "ADL Training",
  type: "checkbox-group",
  options: [
    {
      label: "Dressing",
      value: "dressing"
    },
    {
      label: "Toileting",
      value: "toileting"
    },
    {
      label: "Eating/Feeding",
      value: "eating_feeding"
    },
    {
      label: "Grooming",
      value: "grooming"
    },
    {
      label: "Sphincter Control",
      value: "sphincter_control"
    },
    {
      label: "Transfers",
      value: "transfers"
    },
    {
      label: "Locomotion - Wheelchair Propelling, Walking with Aids",
      value: "locomotion"
    }
  ],
  showIf: {
    field: "adl_functional_training_items",
    includes: "adl_training"
  }
},

/* ===================== DRESSING ===================== */
{
  name: "adl_dressing_type",
  label: "Dressing Type",
  type: "radio",
  options: [
    {
      label: "Upper Garment",
      value: "upper_garment"
    },
    {
      label: "Lower Garment",
      value: "lower_garment"
    },
    {
      label: "Inner Garment",
      value: "inner_garment"
    }
  ],
  showIf: {
    field: "adl_training_items",
    includes: "dressing"
  }
},
{
  name: "adl_dressing_remarks",
  label: "Dressing Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "adl_training_items",
    includes: "dressing"
  }
},

/* ===================== TOILETING ===================== */
{
  name: "adl_toileting_remarks",
  label: "Toileting Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "adl_training_items",
    includes: "toileting"
  }
},

/* ===================== EATING / FEEDING ===================== */
{
  name: "adl_eating_feeding_remarks",
  label: "Eating/Feeding Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "adl_training_items",
    includes: "eating_feeding"
  }
},

/* ===================== GROOMING ===================== */
{
  name: "adl_grooming_remarks",
  label: "Grooming Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "adl_training_items",
    includes: "grooming"
  }
},

/* ===================== SPHINCTER CONTROL ===================== */
{
  name: "adl_sphincter_control_remarks",
  label: "Sphincter Control Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "adl_training_items",
    includes: "sphincter_control"
  }
},

/* ===================== TRANSFERS ===================== */
{
  name: "adl_transfers_type",
  label: "Transfers Type",
  type: "radio",
  options: [
    {
      label: "Wheelchair to Bed vice versa",
      value: "wheelchair_to_bed"
    },
    {
      label: "Wheelchair into Car vice versa",
      value: "wheelchair_into_car"
    },
    {
      label: "Bed to Commode vice versa",
      value: "bed_to_commode"
    },
    {
      label: "Others",
      value: "others"
    }
  ],
  showIf: {
    field: "adl_training_items",
    includes: "transfers"
  }
},
{
  name: "adl_transfers_other",
  label: "Other Transfer Type",
  type: "input",
  placeholder: "Specify other transfer type",
  showIf: {
    field: "adl_transfers_type",
    equals: "others"
  }
},
{
  name: "adl_transfers_remarks",
  label: "Transfers Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "adl_training_items",
    includes: "transfers"
  }
},

/* ===================== LOCOMOTION ===================== */
{
  name: "adl_locomotion_remarks",
  label: "Locomotion Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "adl_training_items",
    includes: "locomotion"
  }
},
/* ===================== IADL TRAINING ===================== */

/* Add this option to the "therapeutic_interventions" checkbox-group:
{
  label: "IADL Training",
  value: "iadl_training"
}
*/
{ type: "subheading", label: "IADL Training" },
{
  name: "iadl_training_items",
 
  type: "checkbox-group",
  options: [
    {
      label: "Telephone / Communication Aide Training",
      value: "telephone_communication_aide_training"
    },
    {
      label: "Food Preparation & Kitchen Simulation Training",
      value: "food_preparation_kitchen_simulation_training"
    },
    {
      label: "Home Management Training",
      value: "home_management_training"
    },
    {
      label: "Medication Management",
      value: "medication_management"
    },
    {
      label: "Financial Management",
      value: "financial_management"
    },
    {
      label: "Driving Rehabilitation",
      value: "driving_rehabilitation"
    },
    {
      label: "Riding Rehabilitation",
      value: "riding_rehabilitation"
    }
  ],
  // showIf: {
  //   field: "therapeutic_interventions",
  //   includes: "iadl_training"
  // }
},

/* ===================== TELEPHONE / COMMUNICATION AIDE TRAINING ===================== */
{
  name: "telephone_communication_aide_training_remarks",
  label: "Telephone / Communication Aide Training Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "iadl_training_items",
    includes: "telephone_communication_aide_training"
  }
},

/* ===================== FOOD PREPARATION & KITCHEN SIMULATION TRAINING ===================== */
{
  name: "food_preparation_kitchen_simulation_training_remarks",
  label: "Food Preparation & Kitchen Simulation Training Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "iadl_training_items",
    includes: "food_preparation_kitchen_simulation_training"
  }
},

/* ===================== HOME MANAGEMENT TRAINING ===================== */
{
  name: "home_management_training_remarks",
  label: "Home Management Training Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "iadl_training_items",
    includes: "home_management_training"
  }
},

/* ===================== MEDICATION MANAGEMENT ===================== */
{
  name: "iadl_medication_management_remarks",
  label: "Medication Management Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "iadl_training_items",
    includes: "medication_management"
  }
},

/* ===================== FINANCIAL MANAGEMENT ===================== */
{
  name: "iadl_financial_management_remarks",
  label: "Financial Management Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "iadl_training_items",
    includes: "financial_management"
  }
},

/* ===================== DRIVING REHABILITATION ===================== */
{
  name: "iadl_driving_rehabilitation_type",
  label: "Driving Rehabilitation",
  type: "radio",
  options: [
    {
      label: "Off Road",
      value: "off_road"
    },
    {
      label: "On Road",
      value: "on_road"
    }
  ],
  showIf: {
    field: "iadl_training_items",
    includes: "driving_rehabilitation"
  }
},
{
  name: "iadl_driving_rehabilitation_remarks",
  label: "Driving Rehabilitation Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "iadl_training_items",
    includes: "driving_rehabilitation"
  }
},

/* ===================== RIDING REHABILITATION ===================== */
{
  name: "iadl_riding_rehabilitation_remarks",
  label: "Riding Rehabilitation Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "iadl_training_items",
    includes: "riding_rehabilitation"
  }
},
/* ===================== ASSISTIVE & ADAPTIVE DEVICES USAGE TRAINING ===================== */

/* Add this option to the "therapeutic_interventions" checkbox-group:
{
  label: "Assistive & Adaptive Devices Usage Training",
  value: "assistive_adaptive_devices_usage_training"
}
*/
 { type: "subheading", label: "Assistive & Adaptive Devices Usage Training" },

{
  name: "assistive_adaptive_devices_usage_training_items",
 
  type: "checkbox-group",
  options: [
    {
      label: "Splint Usage and Care",
      value: "splint_usage_and_care"
    },
    {
      label: "Pressure Garment Usage and Care",
      value: "pressure_garment_usage_and_care"
    },
    {
      label: "Tubigrip Usage and Care",
      value: "tubigrip_usage_and_care"
    },
    {
      label: "Adaptive Nail Clipper",
      value: "adaptive_nail_clipper"
    },
    {
      label: "Wheelchair Assemble Disassemble",
      value: "wheelchair_assemble_disassemble"
    },
    {
      label: "Self Propel Shower Commode Chair Assemble Disassemble",
      value: "self_propel_shower_commode_chair_assemble_disassemble"
    },
    {
      label: "Air Cushion Usage and Care",
      value: "air_cushion_usage_and_care"
    },
    {
      label: "SYSTAM Cushion Usage and Care",
      value: "systam_cushion_usage_and_care"
    },
    {
      label: "ROHO Quadtro Usage and Care",
      value: "roho_quadtro_usage_and_care"
    },
    {
      label: "Molift Raiser Usage and Care",
      value: "molift_raiser_usage_and_care"
    },
    {
      label: "Pro Turner Usage and Care",
      value: "pro_turner_usage_and_care"
    },
    {
      label: "Electric Hoist with Sling Usage and Care",
      value: "electric_hoist_with_sling_usage_and_care"
    },
    {
      label: "Others",
      value: "others"
    }
  ],
  // showIf: {
  //   field: "therapeutic_interventions",
  //   includes: "assistive_adaptive_devices_usage_training"
  // }
},

/* ===================== REMARKS FIELDS ===================== */
{
  name: "splint_usage_and_care_remarks",
  label: "Splint Usage and Care Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "splint_usage_and_care"
  }
},
{
  name: "pressure_garment_usage_and_care_remarks",
  label: "Pressure Garment Usage and Care Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "pressure_garment_usage_and_care"
  }
},
{
  name: "tubigrip_usage_and_care_remarks",
  label: "Tubigrip Usage and Care Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "tubigrip_usage_and_care"
  }
},
{
  name: "adaptive_nail_clipper_remarks",
  label: "Adaptive Nail Clipper Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "adaptive_nail_clipper"
  }
},
{
  name: "wheelchair_assemble_disassemble_remarks",
  label: "Wheelchair Assemble Disassemble Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "wheelchair_assemble_disassemble"
  }
},
{
  name: "self_propel_shower_commode_chair_assemble_disassemble_remarks",
  label: "Self Propel Shower Commode Chair Assemble Disassemble Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "self_propel_shower_commode_chair_assemble_disassemble"
  }
},
{
  name: "air_cushion_usage_and_care_remarks",
  label: "Air Cushion Usage and Care Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "air_cushion_usage_and_care"
  }
},
{
  name: "systam_cushion_usage_and_care_remarks",
  label: "SYSTAM Cushion Usage and Care Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "systam_cushion_usage_and_care"
  }
},
{
  name: "roho_quadtro_usage_and_care_remarks",
  label: "ROHO Quadtro Usage and Care Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "roho_quadtro_usage_and_care"
  }
},
{
  name: "molift_raiser_usage_and_care_remarks",
  label: "Molift Raiser Usage and Care Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "molift_raiser_usage_and_care"
  }
},
{
  name: "pro_turner_usage_and_care_remarks",
  label: "Pro Turner Usage and Care Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "pro_turner_usage_and_care"
  }
},
{
  name: "electric_hoist_with_sling_usage_and_care_remarks",
  label: "Electric Hoist with Sling Usage and Care Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "electric_hoist_with_sling_usage_and_care"
  }
},

/* ===================== OTHERS ===================== */
{
  name: "assistive_adaptive_devices_usage_training_other",
  label: "Others",
  type: "input",
  placeholder: "Specify other device training",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "others"
  }
},
{
  name: "assistive_adaptive_devices_usage_training_other_remarks",
  label: "Others Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "assistive_adaptive_devices_usage_training_items",
    includes: "others"
  }
},
/* ===================== EDUCATION ===================== */

/* Add this option to the "therapeutic_interventions" checkbox-group:
{
  label: "Education",
  value: "education"
}
*/

{
  name: "education_items",
  label: "Education",
  type: "checkbox-group",
  options: [
    {
      label: "Patient Education (Theraband Exercise, Theraputty Exercise)",
      value: "patient_education"
    },
    {
      label: "Carer Training",
      value: "carer_training"
    },
    {
      label: "Others",
      value: "others"
    }
  ],
  showIf: {
    field: "therapeutic_interventions",
    includes: "education"
  }
},

/* ===================== PATIENT EDUCATION ===================== */
{
  name: "patient_education_remarks",
  label: "Patient Education Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "education_items",
    includes: "patient_education"
  }
},

/* ===================== CARER TRAINING ===================== */
{
  name: "carer_training_remarks",
  label: "Carer Training Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "education_items",
    includes: "carer_training"
  }
},

/* ===================== OTHERS ===================== */
{
  name: "education_other",
  label: "Others",
  type: "input",
  placeholder: "Specify other education topics",
  showIf: {
    field: "education_items",
    includes: "others"
  }
},
{
  name: "education_other_remarks",
  label: "Others Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "education_items",
    includes: "others"
  }
},
/* ===================== FUNCTIONAL EXERCISES (EXERCISE MODALITIES) ===================== */
 { type: "subheading", label: "Functional Exercises (Exercise Modalities)" },

{
  name: "functional_exercises_items",
 
  type: "checkbox-group",
  options: [
    { label: "Motomed", value: "motomed" },
    { label: "Cycle Motus", value: "cycle_motus" },
    { label: "Fourier Wrist Motus", value: "fourier_wrist_motus" },
    { label: "Meissa OT", value: "meissa_ot" },
    { label: "Fesia Grasp", value: "fesia_grasp" },
    { label: "Fesia Bike", value: "fesia_bike" },
    { label: "Robotic Glove Hand Exerciser", value: "robotic_glove_hand_exerciser" },
    { label: "Flint Rehab - FITMI", value: "flint_rehab_fitmi" },
    { label: "Flint Rehab - Music Glove", value: "flint_rehab_music_glove" },
    { label: "Rapael Neofect Smart Pegboard", value: "rapael_neofect_smart_pegboard" },
    { label: "Lusio Mate", value: "lusio_mate" },
    { label: "Fluidotherapy", value: "fluidotherapy" },
    { label: "EMS", value: "ems" },
    { label: "Saebo Stim", value: "saebo_stim" },
    { label: "Driving Simulator", value: "driving_simulator" },
    { label: "FES", value: "fes" },
    {label: "Others",value: "others"},
  ],
  // showIf: {
  //   field: "therapeutic_interventions",
  //   includes: "functional_exercises"
  // }
},
{
  name: "motomed_mode",
  label: "Motomed - Mode",
  type: "radio",
  options: [
    { label: "Arm Trainer", value: "arm_trainer" },
    { label: "Leg Trainer", value: "leg_trainer" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "motomed"
  }
},
{
  name: "motomed_duration",
  label: "Motomed - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "20 Minutes", value: "20" },
    { label: "30 Minutes", value: "30" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "motomed"
  }
},
{
  name: "motomed_remarks",
  label: "Motomed Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "motomed"
  }
},
{
  name: "cycle_motus_mode",
  label: "Cycle Motus - Mode",
  type: "radio",
  options: [
    { label: "Active", value: "active" },
    { label: "Passive", value: "passive" },
    { label: "Intelligence", value: "intelligence" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "cycle_motus"
  }
},
{
  name: "cycle_motus_duration",
  label: "Cycle Motus - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "20 Minutes", value: "20" },
    { label: "30 Minutes", value: "30" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "cycle_motus"
  }
},
{
  name: "cycle_motus_remarks",
  label: "Cycle Motus Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "cycle_motus"
  }
},
{
  name: "fourier_wrist_motus_mode",
  label: "Fourier Wrist Motus - Mode",
  type: "radio",
  options: [
    { label: "Passive", value: "passive" },
    { label: "Active Assisted", value: "active_assisted" },
    { label: "Active", value: "active" },
    { label: "Resistive", value: "resistive" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "fourier_wrist_motus"
  }
},
{
  name: "fourier_wrist_motus_duration",
  label: "Fourier Wrist Motus - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "20 Minutes", value: "20" },
    { label: "30 Minutes", value: "30" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "fourier_wrist_motus"
  }
},
{
  name: "fourier_wrist_motus_remarks",
  label: "Fourier Wrist Motus Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "fourier_wrist_motus"
  }
},
{
  name: "meissa_ot_type_of_exercise",
  label: "Meissa OT - Type of Exercise",
  type: "input",
  placeholder: "Enter type of exercise",
  showIf: {
    field: "functional_exercises_items",
    includes: "meissa_ot"
  }
},
{
  name: "meissa_ot_duration",
  label: "Meissa OT - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "5 Minutes", value: "5" },
    { label: "10 Minutes", value: "10" },
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "meissa_ot"
  }
},
{
  name: "meissa_ot_remarks",
  label: "Meissa OT Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "meissa_ot"
  }
},
{
  name: "fesia_grasp_protocol",
  label: "Fesia Grasp - Protocol",
  type: "radio",
  options: [
    { label: "Habituation", value: "habituation" },
    { label: "Tone Reduction", value: "tone_reduction" },
    { label: "Repetitive Task Training", value: "repetitive_task_training" },
    {
      label: "Senso: Motion Triggered Stimulation",
      value: "senso_motion_triggered_stimulation"
    },
    { label: "ADL's Training", value: "adls_training" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "fesia_grasp"
  }
},
{
  name: "fesia_grasp_duration",
  label: "Fesia Grasp - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "5 Minutes", value: "5" },
    { label: "10 Minutes", value: "10" },
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "fesia_grasp"
  }
},
{
  name: "fesia_grasp_remarks",
  label: "Fesia Grasp Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "fesia_grasp"
  }
},
{
  name: "fesia_bike_duration",
  label: "Fesia Bike - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "5 Minutes", value: "5" },
    { label: "10 Minutes", value: "10" },
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "fesia_bike"
  }
},
{
  name: "fesia_bike_remarks",
  label: "Fesia Bike Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "fesia_bike"
  }
},
{
  name: "robotic_glove_hand_exerciser_type_of_exercise",
  label: "Robotic Glove Hand Exerciser - Type of Exercise",
  type: "radio",
  options: [
    { label: "CPM", value: "cpm" },
    { label: "Air Compression", value: "air_compression" },
    { label: "Mirror Therapy/Training", value: "mirror_therapy_training" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "robotic_glove_hand_exerciser"
  }
},
{
  name: "robotic_glove_hand_exerciser_duration",
  label: "Robotic Glove Hand Exerciser - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "robotic_glove_hand_exerciser"
  }
},
{
  name: "robotic_glove_hand_exerciser_remarks",
  label: "Robotic Glove Hand Exerciser Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "robotic_glove_hand_exerciser"
  }
}, 
/* ===================== FLINT REHAB - FITMI ===================== */

{
  name: "flint_rehab_fitmi_intervention_mode",
  label: "Flint Rehab - FITMI Intervention Mode",
  type: "radio",
  options: [
    {
      label: "Music Touch",
      value: "music_touch"
    },
    {
      label: "Rehab Studio",
      value: "rehab_studio"
    }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "flint_rehab_fitmi"
  }
},

/* ===================== MUSIC TOUCH PARAMETERS ===================== */
{
  name: "flint_rehab_fitmi_body_part",
  label: "Body Part",
  type: "radio",
  options: [
    { label: "Left Arm", value: "left_arm" },
    { label: "Right Arm", value: "right_arm" },
    { label: "Left Leg", value: "left_leg" },
    { label: "Right Leg", value: "right_leg" }
  ],
  showIf: {
    field: "flint_rehab_fitmi_intervention_mode",
    equals: "music_touch"
  }
},
{
  name: "flint_rehab_fitmi_type_of_exercise",
  label: "Type of Exercise",
  type: "radio",
  options: [
    { label: "Single Puck", value: "single_puck" },
    {
      label: "Double Puck Horizontal",
      value: "double_puck_horizontal"
    },
    {
      label: "Double Puck Vertical",
      value: "double_puck_vertical"
    }
  ],
  showIf: {
    field: "flint_rehab_fitmi_intervention_mode",
    equals: "music_touch"
  }
},
{
  name: "flint_rehab_fitmi_difficulty_level",
  label: "Difficulty Level",
  type: "radio",
  options: [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" }
  ],
  showIf: {
    field: "flint_rehab_fitmi_intervention_mode",
    equals: "music_touch"
  }
},
{
  name: "flint_rehab_fitmi_music_touch_duration",
  label: "Duration (Minutes)",
  type: "radio",
  options: [
    { label: "5 Minutes", value: "5" },
    { label: "10 Minutes", value: "10" },
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "flint_rehab_fitmi_intervention_mode",
    equals: "music_touch"
  }
},

/* ===================== REHAB STUDIO PARAMETERS ===================== */
{
  name: "flint_rehab_fitmi_rehab_studio_mode",
  label: "Rehab Studio Mode",
  type: "radio",
  options: [
    { label: "Rep Mode", value: "rep_mode" },
    { label: "Timed Mode", value: "timed_mode" }
  ],
  showIf: {
    field: "flint_rehab_fitmi_intervention_mode",
    equals: "rehab_studio"
  }
},
{
  name: "flint_rehab_fitmi_rehab_studio_duration",
  label: "Duration (Minutes)",
  type: "radio",
  options: [
    { label: "5 Minutes", value: "5" },
    { label: "10 Minutes", value: "10" },
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "flint_rehab_fitmi_intervention_mode",
    equals: "rehab_studio"
  }
},

/* ===================== REMARKS ===================== */
{
  name: "flint_rehab_fitmi_remarks",
  label: "Flint Rehab - FITMI Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "flint_rehab_fitmi"
  }
},
{
  name: "flint_rehab_music_glove_phalanx",
  label: "Flint Rehab - Music Glove Phalanx",
  type: "radio",
  options: [
    {
      label: "Opposition to IF",
      value: "opposition_to_if"
    },
    {
      label: "Opposition to MF",
      value: "opposition_to_mf"
    },
    {
      label: "Opposition to RF",
      value: "opposition_to_rf"
    },
    {
      label: "Opposition to LF",
      value: "opposition_to_lf"
    }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "flint_rehab_music_glove"
  }
},
{
  name: "flint_rehab_music_glove_difficulty_level",
  label: "Flint Rehab - Music Glove Difficulty Level",
  type: "radio",
  options: [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "flint_rehab_music_glove"
  }
},
{
  name: "flint_rehab_music_glove_duration",
  label: "Flint Rehab - Music Glove Duration (Minutes)",
  type: "radio",
  options: [
    { label: "5 Minutes", value: "5" },
    { label: "10 Minutes", value: "10" },
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "flint_rehab_music_glove"
  }
},
{
  name: "flint_rehab_music_glove_remarks",
  label: "Flint Rehab - Music Glove Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "flint_rehab_music_glove"
  }
},
{
  name: "rapael_neofect_smart_pegboard_mode",
  label: "Rapael Neofect Smart Pegboard - Mode",
  type: "radio",
  options: [
    {
      label: "Mixed Shape",
      value: "mixed_shape"
    },
    {
      label: "Cylinder (Large)",
      value: "cylinder_large"
    },
    {
      label: "Cylinder (Small)",
      value: "cylinder_small"
    }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "rapael_neofect_smart_pegboard"
  }
},
{
  name: "rapael_neofect_smart_pegboard_duration",
  label: "Rapael Neofect Smart Pegboard - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "5 Minutes", value: "5" },
    { label: "10 Minutes", value: "10" },
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "rapael_neofect_smart_pegboard"
  }
},
{
  name: "rapael_neofect_smart_pegboard_remarks",
  label: "Rapael Neofect Smart Pegboard Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "rapael_neofect_smart_pegboard"
  }
},
/* ===================== LUSIO MATE ===================== */
{
  name: "lusio_mate_difficulty_level",
  label: "Lusio Mate - Difficulty Level",
  type: "radio",
  options: [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "lusio_mate"
  }
},
{
  name: "lusio_mate_duration",
  label: "Lusio Mate - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "5 Minutes", value: "5" },
    { label: "10 Minutes", value: "10" },
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "lusio_mate"
  }
},
{
  name: "lusio_mate_remarks",
  label: "Lusio Mate Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "lusio_mate"
  }
},

/* ===================== FLUIDOTHERAPY ===================== */
{
  name: "functional_fluidotherapy_duration",
  label: "Fluidotherapy - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "10 Minutes", value: "10" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "fluidotherapy"
  }
},
{
  name: "functional_fluidotherapy_remarks",
  label: "Fluidotherapy Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "fluidotherapy"
  }
},
/* ===================== EMS ===================== */
{
  name: "functional_ems_body_region",
  label: "EMS - Body Region",
  type: "input",
  placeholder: "Enter body region",
  showIf: {
    field: "functional_exercises_items",
    includes: "ems"
  }
},
{
  name: "functional_ems_duration",
  label: "EMS - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "ems"
  }
},
{
  name: "functional_ems_remarks",
  label: "EMS Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "ems"
  }
},

/* ===================== SAEBO STIM ===================== */
{
  name: "functional_saebo_stim_body_region",
  label: "Saebo Stim - Body Region",
  type: "input",
  placeholder: "Enter body region",
  showIf: {
    field: "functional_exercises_items",
    includes: "saebo_stim"
  }
},
{
  name: "functional_saebo_stim_duration",
  label: "Saebo Stim - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "saebo_stim"
  }
},
{
  name: "functional_saebo_stim_remarks",
  label: "Saebo Stim Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "saebo_stim"
  }
},
/* Add this option to the "functional_exercises_items" checkbox-group */
/* Add this option to the "functional_exercises_items" checkbox-group */


/* ===================== OTHERS ===================== */
{
  name: "functional_exercises_other",
  label: "Others",
  type: "input",
  placeholder: "Specify other functional exercise modality",
  showIf: {
    field: "functional_exercises_items",
    includes: "others"
  }
},
{
  name: "functional_exercises_other_remarks",
  label: "Others Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "others"
  }
},

/* ===================== DRIVING SIMULATOR ===================== */
{
  name: "driving_simulator_setting",
  label: "Driving Simulator - Setting",
  type: "radio",
  options: [
    { label: "Auto Transmission", value: "auto_transmission" },
    { label: "Manual Transmission", value: "manual_transmission" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "driving_simulator"
  }
},
{
  name: "driving_simulator_mode",
  label: "Driving Simulator - Mode",
  type: "input",
  placeholder: "Enter mode",
  showIf: {
    field: "functional_exercises_items",
    includes: "driving_simulator"
  }
},
{
  name: "driving_simulator_duration",
  label: "Driving Simulator - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" },
    { label: "25 Minutes", value: "25" },
    { label: "30 Minutes", value: "30" },
    { label: "35 Minutes", value: "35" },
    { label: "40 Minutes", value: "40" },
    { label: "45 Minutes", value: "45" },
    { label: "50 Minutes", value: "50" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "driving_simulator"
  }
},
{
  name: "driving_simulator_remarks",
  label: "Driving Simulator Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "driving_simulator"
  }
},

/* ===================== FES ===================== */
{
  name: "fes_body_region",
  label: "FES - Body Region",
  type: "input",
  placeholder: "Enter body region",
  showIf: {
    field: "functional_exercises_items",
    includes: "fes"
  }
},
{
  name: "fes_duration",
  label: "FES - Duration (Minutes)",
  type: "radio",
  options: [
    { label: "15 Minutes", value: "15" },
    { label: "20 Minutes", value: "20" }
  ],
  showIf: {
    field: "functional_exercises_items",
    includes: "fes"
  }
},
{
  name: "fes_remarks",
  label: "FES Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks",
  showIf: {
    field: "functional_exercises_items",
    includes: "fes"
  }
}

/* ===================== OTHERS ===================== */



/* ===================== DRIVING SIMULATOR ===================== */


/* ===================== FES ===================== */

      ]
    }
  ]
};


const ASSESSMENT_SCHEMA = {
 
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [{
    fields: [
    
      { name: "assessment_notes", label: "Clinical Impression / Notes", type: "input", placeholder: "Therapist assessment..." },


      
    ],
  }],
};

const PLAN_SCHEMA = {
 
actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],  sections: [{
    fields: [
        { type: "subheading", label: "Short-Term Goals (2–4 weeks)" },
        {
            type: "dynamic-goals",
            name: "short_term_goals"
          },
          { type: "subheading", label: "Long-Term Goals (6–12 weeks)" },
          {
            type: "dynamic-goals",
            name: "long_term_goals"
          }, 
          {
  name: "plan_therapist_notes",
  label: "Therapist Notes",
  type: "checkbox-group",
  options: [
    {
      label: "Therapeutic Exercise",
      value: "therapeutic_exercise"
    },
    {
      label: "Functional Mobility Training",
      value: "functional_mobility_training"
    },
    {
      label: "ADL Training",
      value: "adl_training"
    },
    {
      label: "IADL Training",
      value: "iadl_training"
    },
    {
      label: "Pain Management",
      value: "pain_management"
    },
    {
      label: "Education",
      value: "education"
    },
    {
      label: "Others",
      value: "others"
    }
  ]
},

/* ===================== THERAPEUTIC EXERCISE ===================== */
{
  name: "therapeutic_exercise_remarks",
  label: "Therapeutic Exercise Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks for therapeutic exercise",
  showIf: {
    field: "plan_therapist_notes",
    includes: "therapeutic_exercise"
  }
},

/* ===================== FUNCTIONAL MOBILITY TRAINING ===================== */
{
  name: "functional_mobility_training_remarks",
 
  type: "input",
  rows: 3,
  placeholder: "Enter remarks for functional mobility training",
  showIf: {
    field: "plan_therapist_notes",
    includes: "functional_mobility_training"
  }
},

/* ===================== ADL TRAINING ===================== */
{
  name: "adl_training_remarks",
  label: "ADL Training Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks for ADL training",
  showIf: {
    field: "plan_therapist_notes",
    includes: "adl_training"
  }
},

/* ===================== IADL TRAINING ===================== */
{
  name: "iadl_training_remarks",
  label: "IADL Training Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks for IADL training",
  showIf: {
    field: "plan_therapist_notes",
    includes: "iadl_training"
  }
},

/* ===================== PAIN MANAGEMENT ===================== */
{
  name: "pain_management_remarks",
  label: "Pain Management Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks for pain management",
  showIf: {
    field: "plan_therapist_notes",
    includes: "pain_management"
  }
},

/* ===================== EDUCATION ===================== */
{
  name: "education_remarks",
  label: "Education Remarks",
  type: "input",
  rows: 3,
  placeholder: "Enter remarks for education",
  showIf: {
    field: "plan_therapist_notes",
    includes: "education"
  }
},

/* ===================== OTHERS ===================== */
{
  name: "plan_therapist_notes_others",
  label: "Others (Specify)",
  type: "input",
  rows: 3,
  placeholder: "Enter other therapist notes",
  showIf: {
    field: "plan_therapist_notes",
    includes: "others"
  }
},
        
    ],
  }],
};

const SOAP_TABS = [
  { key: "subjective",     label: "Subjective"     },
  { key: "objective", label: "Objective" },
  { key: "assessment",   label: "Assessment"   },
  { key: "plan",         label: "Plan"         },
];

const SCHEMA_MAP = {
  subjective:     SUBJECTIVE_SCHEMA,
  objective: OBJECTIVE_SCHEMA,
  assessment:   ASSESSMENT_SCHEMA,
  plan:         PLAN_SCHEMA,
};

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function NeuroProgress({ patient, onBack }) {
  const [values, setValues]       = useState({});
  const [activeTab, setActiveTab] = useState("subjective");
  const [submitted, setSubmitted] = useState(false);
  const [patientHistory, setPatientHistory] = useState({
      past_medical_history: "",
      past_family_history: "",
      alerts_and_allergies: ""
    });
    useEffect(() => {
          if (!patient) return;
          setPatientHistory({
            past_medical_history: patient.medical_history || "",
            past_family_history: patient.family_medical_history || "",
            alerts_and_allergies: patient.alerts_and_allergies_history || ""
          });
        }, [patient]);

  const storageKey = patient ? `amputee_progress_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) setValues(JSON.parse(saved).values || {});
  }, [storageKey]);
   useEffect(() => {
          if (!storageKey) return;
          const saved = localStorage.getItem(storageKey);
          if (saved) {
            try {
              setValues(JSON.parse(saved).values || {});
            } catch {}
          }
        }, [storageKey]);

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      session_date: v.session_date || new Date().toISOString().split("T")[0],
    }));
  }, [patient]);

  const onChange = (name, value) => setValues(v => ({ ...v, [name]: value }));
const tabOrder = ["subjective", "objective", "assessment", "plan"];
  const activeTabIdx = tabOrder.indexOf(activeTab);
 
 const handleSubmit = () => {
    setSubmitted(true);
    console.log("Submitted:", values);
    alert("Assessment submitted");
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
      alert("Spinal draft saved");
    }
  };
  // const handleAction = (type) => {
  //   if (type === "clear") setValues({});
  //   if (type === "save") {
  //     if (storageKey) localStorage.setItem(storageKey, JSON.stringify({ values, updatedAt: new Date() }));
  //     alert("Progress & Intervention saved.");
  //   }
  // };
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
                    <input
                      style={input}
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
                    <input
                      style={input}
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
                    <input
                      style={input}
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
  return (
    <div>
      {/* Patient Information */}
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
      

      {/* SOAP-style Tabs */}
      <div style={tabBar}>
        {SOAP_TABS.map(tab => (
          <div
            key={tab.key}
            style={activeTab === tab.key ? tabActive : tabBtn}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <CommonFormBuilder
        schema={SCHEMA_MAP[activeTab]}
        values={values}
        onChange={onChange}
        onAction={handleAction}
      />
       <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button style={submitBtn} onClick={() => setActiveTab(tabOrder[activeTabIdx + 1])}>
              Next
            </button>
          ) : (
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Assessment
            </button>
          )}
        </div>

    </div>
  );
}

/* ── Styles ── */
const tabBar    = { display: "flex", gap: 12, justifyContent: "center", borderBottom: "1px solid #ddd", marginBottom: 12 };
const tabBtn    = { padding: "10px 22px", fontWeight: 600, cursor: "pointer", color: "#0f172a" };
const tabActive = { ...tabBtn, borderBottom: "3px solid #2451b3", color: "#2451b3" };
const backBtn   = { marginTop: 10, padding: "8px 18px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", color: "#374151", fontWeight: 600, cursor: "pointer" };
const input = {
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
const doctorsReportBtn = {
  padding: "10px 20px", background: "#2563EB", color: "#fff",
  border: "none", borderRadius: 6, fontSize: 14,
  fontWeight: 600, cursor: "pointer", marginTop: 8
};
const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 16
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 15,
  cursor: "pointer"
};