import React, { useState, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function DLOTCA_G_Full() {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

 /* =====================================================
   HELPER FUNCTIONS
====================================================== */

const round2 = num =>
  Number.isFinite(num) ? Number(num.toFixed(2)) : 0;

const sum = arr =>
  arr.reduce((acc, val) => acc + (val || 0), 0);

const countMediated = arr =>
  arr.filter(Boolean).length;

/* =====================================================
   ORIENTATION
====================================================== */

const orientationPlace = round2(
  sum([
    values.orientation_place_0,
    values.orientation_place_1,
    values.orientation_place_2,
    values.orientation_place_3
  ]) / 4
);

const orientationTime = round2(
  sum([
    values.orientation_time_0,
    values.orientation_time_1,
    values.orientation_time_2,
    values.orientation_time_3
  ]) / 4
);

const orientationDomain = round2(
  (orientationPlace + orientationTime) / 2
);

/* =====================================================
   VISUAL PERCEPTION
====================================================== */

const visualBefore = sum([
  values.object_identification_0,
  values.figure_ground_0,
  values.object_constancy_0
]);

const visualAfter = sum([
  values.object_identification_1,
  values.figure_ground_1,
  values.object_constancy_1
]);

const visualMediated = countMediated([
  values.object_identification_2,
  values.figure_ground_2,
  values.object_constancy_2
]);

const visualDomainBefore = round2(visualBefore / 3);
const visualDomainAfter =
  visualMediated > 0 ? round2(visualAfter / visualMediated) : 0;

/* =====================================================
   SPATIAL – BODY (8)
====================================================== */

const bodyBefore = sum([
  values.directions_body_a_0,
  values.directions_body_b_0,
  values.directions_body_c_0,
  values.directions_body_d_0
]);

const bodyAfter = sum([
  values.directions_body_a_1,
  values.directions_body_b_1,
  values.directions_body_c_1,
  values.directions_body_d_1
]);

const bodyMediated = countMediated([
  values.directions_body_a_2,
  values.directions_body_b_2,
  values.directions_body_c_2,
  values.directions_body_d_2
]);

const bodyDomainBefore = round2(bodyBefore / 4);
const bodyDomainAfter =
  bodyMediated > 0 ? round2(bodyAfter / bodyMediated) : 0;

/* =====================================================
   SPATIAL – EXAMINER (9)
====================================================== */

const examinerBefore = sum([
  values.examiner_spatial_a_0,
  values.examiner_spatial_b_0,
  values.examiner_spatial_c_0,
  values.examiner_spatial_d_0
]);

const examinerAfter = sum([
  values.examiner_spatial_a_1,
  values.examiner_spatial_b_1,
  values.examiner_spatial_c_1,
  values.examiner_spatial_d_1
]);

const examinerMediated = countMediated([
  values.examiner_spatial_a_2,
  values.examiner_spatial_b_2,
  values.examiner_spatial_c_2,
  values.examiner_spatial_d_2
]);

const examinerDomainBefore = round2(examinerBefore / 4);
const examinerDomainAfter =
  examinerMediated > 0 ? round2(examinerAfter / examinerMediated) : 0;

/* =====================================================
   SPATIAL – ENVIRONMENT (10)
====================================================== */

const environmentBefore = sum([
  values.environment_spatial_a_0,
  values.environment_spatial_b_0,
  values.environment_spatial_c_0,
  values.environment_spatial_d_0
]);

const environmentAfter = sum([
  values.environment_spatial_a_1,
  values.environment_spatial_b_1,
  values.environment_spatial_c_1,
  values.environment_spatial_d_1
]);

const environmentMediated = countMediated([
  values.environment_spatial_a_2,
  values.environment_spatial_b_2,
  values.environment_spatial_c_2,
  values.environment_spatial_d_2
]);

const environmentDomainBefore = round2(environmentBefore / 4);
const environmentDomainAfter =
  environmentMediated > 0
    ? round2(environmentAfter / environmentMediated)
    : 0;

/* =====================================================
   PRAXIS (11–13)
====================================================== */

const motorBefore = sum([
  values.motor_imitation_a_0,
  values.motor_imitation_b_0,
  values.motor_imitation_c_0,
  values.motor_imitation_d_0
]);

const utilizationBefore = sum([
  values.utilization_objects_a_0,
  values.utilization_objects_b_0,
  values.utilization_objects_c_0,
  values.utilization_objects_d_0
]);

const symbolicBefore = sum([
  values.symbolic_actions_a_0,
  values.symbolic_actions_b_0,
  values.symbolic_actions_c_0,
  values.symbolic_actions_d_0
]);

const praxisDomainBefore = round2(
  (motorBefore / 4 +
    utilizationBefore / 4 +
    symbolicBefore / 4) / 3
);

/* =====================================================
   VISUOMOTOR CONSTRUCTION (14–20)
====================================================== */

const visuomotorBefore = sum([
  values.copy_geometric_0,
  values.two_dimensional_model_0,
  values.pegboard_0,
  values.colored_block_0,
  values.plain_block_0,
  values.puzzle_0,
  values.clock_drawing_0
]);

const visuomotorDomainBefore = round2(visuomotorBefore / 7);

/* =====================================================
   THINKING OPERATIONS (21–27)
====================================================== */

const thinkingBefore = sum([
  values.categorization_0,
  values.roc_unstructured_0,
  values.pictorial_sequence_a_0,
  values.pictorial_sequence_b_0,
  values.geometric_sequence_a_0,
  values.geometric_sequence_b_0,
  values.roc_structured_0
]);

const thinkingDomainBefore = round2(thinkingBefore / 7);

/* =====================================================
   MEMORY (22–24)
====================================================== */

const memoryTotal = sum([
  values.famous_personality,
  values.personal_possessions,
  values.everyday_objects
]);

const memoryDomain = round2(memoryTotal / 3);

/* =====================================================
   TOTAL SCORE
====================================================== */

const totalScore = round2(
  orientationDomain +
  visualDomainBefore +
  bodyDomainBefore +
  examinerDomainBefore +
  environmentDomainBefore +
  praxisDomainBefore +
  visuomotorDomainBefore +
  thinkingDomainBefore +
  memoryDomain
);

/* =====================================================
   COMPUTED VALUES (SEND TO FORM)
====================================================== */

const computedValues = {
  ...values,

  orientation_domain_score: orientationDomain,

  visual_domain_before: visualDomainBefore,
  visual_domain_after: visualDomainAfter,

  directions_body_total: bodyDomainBefore,
  examiner_spatial_total_before: examinerDomainBefore,
  environment_spatial_total_before: environmentDomainBefore,

  praxis_domain_before: praxisDomainBefore,

  visuomotor_domain_before: visuomotorDomainBefore,
  thinking_domain_before: thinkingDomainBefore,

  memory_average: memoryDomain,

  total_score: totalScore
};
  /* =====================================================
     SCHEMA (Core Example — Extend Same Pattern)
  ====================================================== */

const schema = {
  title: "DLOTCA-G – Full Cognitive Assessment",

  sections: [

    /* =====================================================
       ORIENTATION
    ====================================================== */

    {
      title: "ORIENTATION",
      fields: [

        {
          type: "grid-header",
          template: "240px repeat(4,80px) 120px",
          cols: ["A", "B", "C", "D", "Total / 4"]
        },

        {
          type: "grid-row",
          name: "orientation_place",
          label: "1. Orientation for place",
          cols: [
            { type: "single-select", options: [0,1,2] },
            { type: "single-select", options: [0,1,2] },
            { type: "single-select", options: [0,1,2] },
            { type: "single-select", options: [0,1,2] },
            { type: "static", name: "orientation_place_total" }
          ]
        },

        {
          type: "grid-row",
          name: "orientation_time",
          label: "2. Orientation for time",
          cols: [
            { type: "single-select", options: [0,1,2] },
            { type: "single-select", options: [0,1,2] },
            { type: "single-select", options: [0,1,2] },
            { type: "single-select", options: [0,1,2] },
            { type: "static", name: "orientation_time_total" }
          ]
        },

        {
          type: "score-box",
          name: "orientation_domain_score",
          label: "Domain score total divided by 2"
        }
      ]
    },

    /* =====================================================
       AWARENESS
    ====================================================== */

    {
      title: "AWARENESS",
      fields: [

        {
          type: "radio",
          name: "awareness_reason",
          label: "3. Awareness of reason for hospitalization",
          options: [1,2,3]
        },

        {
          type: "radio",
          name: "awareness_before",
          label: "4a. Awareness of cognitive disabilities before testing",
          options: [1,2,3]
        },

        {
          type: "radio",
          name: "awareness_after",
          label: "4b. Awareness of cognitive disabilities after testing",
          options: [1,2,3]
        },

        {
          type: "info-text",
          text: "Note: No domain is calculated; compare 4b to 4a."
        }
      ]
    },

    /* =====================================================
       VISUAL PERCEPTION
    ====================================================== */

  {
  title: "VISUAL PERCEPTION",
  fields: [

    {
      type: "grid-header",
    //   template: "260px 180px 180px 240px",
      cols: [
        "Before Mediation (Static Score)",
        "After Mediation (Static Score)",
        "Mediation Score"
      ]
    },

    /* =====================================================
       5. OBJECT IDENTIFICATION
    ====================================================== */

    {
      type: "grid-row",
      name: "object_identification",
      label: "5. Object Identification",
      cols: [
        { type: "single-select", options: [1, 2, 3, 4] },
        { type: "single-select", options: [1, 2, 3, 4] },
        {
          type: "single-select",
          options: [
            { label: "1 - General Intervention", value: 1 },
            { label: "2 - General Feedback", value: 2 },
            { label: "3 - Specific Feedback", value: 3 },
            { label: "4 - Structured Category", value: 4 }
          ]
        }
      ]
    },

    /* =====================================================
       6. FIGURE-GROUND
    ====================================================== */

    {
      type: "grid-row",
      name: "figure_ground",
      label: "6. Figure-ground",
      cols: [
        { type: "single-select", options: [1, 2, 3, 4] },
        { type: "single-select", options: [1, 2, 3, 4] },
        {
          type: "single-select",
          options: [
            { label: "1 - General Intervention", value: 1 },
            { label: "2 - General Feedback", value: 2 },
            { label: "3 - Specific Feedback", value: 3 },
            { label: "4 - Structured Category", value: 4 }
          ]
        }
      ]
    },

    /* =====================================================
       7. OBJECT CONSTANCY
    ====================================================== */

    {
      type: "grid-row",
      name: "object_constancy",
      label: "7. Object Constancy",
      cols: [
        { type: "single-select", options: [1, 2, 3, 4] },
        { type: "single-select", options: [1, 2, 3, 4] },
        {
          type: "single-select",
          options: [
            { label: "1 - General Intervention", value: 1 },
            { label: "2 - General Feedback", value: 2 },
            { label: "3 - Specific Feedback", value: 3 },
            { label: "4 - Structured Category", value: 4 }
          ]
        }
      ]
    },

    /* =====================================================
       DOMAIN SCORES
    ====================================================== */

    {
      type: "score-box",
      name: "visual_domain_before",
      label: "Domain score before mediation total divided by 3"
    },

    {
      type: "score-box",
      name: "visual_domain_after",
      label: "After mediation divide by number of items mediated"
    }

  ]
},

    /* =====================================================
       SPATIAL PERCEPTION – BODY
    ====================================================== */

    {
      title: "8 .SPATIAL PERCEPTION – Directions on Client’s Body (a–d)",
      fields: [

        {
          type:"grid-header",
          template:"240px 140px 140px 220px",
          cols:["Before","After","Mediation Score"]
        },

        ...["a","b","c","d"].map(letter=>({
          type:"grid-row",
          name:`directions_body_${letter}`,
          label:`${letter}.`,
          cols:[
            {type:"single-select",options:[0,1]},
            {type:"single-select",options:[0,1]},
            {
              type:"single-select",
              options:[
                {label:"1 - General Intervention",value:1},
                {label:"2 - General Feedback",value:2},
                {label:"3 - Specific Feedback",value:3},
                {label:"4 - Structured Category",value:4}
              ]
            }
          ]
        })),

        { type:"score-box", name:"directions_body_total", label:"Total / 4" },
        { type:"score-box", name:"directions_body_after_avg", label:"Total / No. items mediated" }
      ]
    },
{
  title: "9. Spatial Relations on the Examiner (questions a–d)",
  fields: [

    {
      type: "grid-header",
      cols: [
        "Before (0–1)",
        "After (0–1)",
        "Mediation Score"
      ]
    },

    {
      type: "grid-row",
      name: "examiner_spatial_a",
      label: "a.",
      cols: [
        { type: "single-select", options: [0,1] },
        { type: "single-select", options: [0,1] },
        {
          type: "single-select",
          options: [
            { label:"1 - General Intervention", value:1 },
            { label:"2 - General Feedback", value:2 },
            { label:"3 - Specific Feedback", value:3 },
            { label:"4 - Structured Category", value:4 }
          ]
        }
      ]
    },

    {
      type: "grid-row",
      name: "examiner_spatial_b",
      label: "b.",
      cols: [
        { type: "single-select", options: [0,1] },
        { type: "single-select", options: [0,1] },
        {
          type: "single-select",
          options: [
            { label:"1 - General Intervention", value:1 },
            { label:"2 - General Feedback", value:2 },
            { label:"3 - Specific Feedback", value:3 },
            { label:"4 - Structured Category", value:4 }
          ]
        }
      ]
    },

    {
      type: "grid-row",
      name: "examiner_spatial_c",
      label: "c.",
      cols: [
        { type: "single-select", options: [0,1] },
        { type: "single-select", options: [0,1] },
        {
          type: "single-select",
          options: [
            { label:"1 - General Intervention", value:1 },
            { label:"2 - General Feedback", value:2 },
            { label:"3 - Specific Feedback", value:3 },
            { label:"4 - Structured Category", value:4 }
          ]
        }
      ]
    },

    {
      type: "grid-row",
      name: "examiner_spatial_d",
      label: "d.",
      cols: [
        { type: "single-select", options: [0,1] },
        { type: "single-select", options: [0,1] },
        {
          type: "single-select",
          options: [
            { label:"1 - General Intervention", value:1 },
            { label:"2 - General Feedback", value:2 },
            { label:"3 - Specific Feedback", value:3 },
            { label:"4 - Structured Category", value:4 }
          ]
        }
      ]
    },

    { type:"score-box", name:"examiner_spatial_total_before", label:"Total / by 4" },
    { type:"score-box", name:"examiner_spatial_total_after", label:"Total / by No items" }

  ]
},
{
  title: "10. Spatial Relations in the Near Environment (questions a–d)",
  fields: [

    {
      type: "grid-header",
      cols: [
        "Before (0–1)",
        "After (0–1)",
        "Mediation Score"
      ]
    },

    {
      type: "grid-row",
      name: "environment_spatial_a",
      label: "a.",
      cols: [
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4},
            {label:"5 - Reduced Amount", value:5}
          ]
        }
      ]
    },

    {
      type: "grid-row",
      name: "environment_spatial_b",
      label: "b.",
      cols: [
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4},
            {label:"5 - Reduced Amount", value:5}
          ]
        }
      ]
    },

    {
      type: "grid-row",
      name: "environment_spatial_c",
      label: "c.",
      cols: [
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4},
            {label:"5 - Reduced Amount", value:5}
          ]
        }
      ]
    },

    {
      type: "grid-row",
      name: "environment_spatial_d",
      label: "d.",
      cols: [
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4},
            {label:"5 - Reduced Amount", value:5}
          ]
        }
      ]
    },

    { type:"score-box", name:"environment_spatial_total_before", label:"Total / by 4" },
    { type:"score-box", name:"environment_spatial_total_after", label:"Total / by No items" },

    {
      type:"score-box",
      name:"environment_spatial_domain_before",
      label:"Domain score before mediation total divided by 3"
    },

    {
      type:"score-box",
      name:"environment_spatial_domain_after",
      label:"After mediation divide by number of items mediated"
    },

    {
      type:"textarea",
      name:"environment_spatial_comments",
      label:"Comments"
    }

  ]
},
    /* =====================================================
       PRAXIS
    ====================================================== */

 {
  title: "11. Motor Imitation (questions a–d)",
  fields: [

    {
      type: "grid-header",
      cols: [
        "Before (0–1)",
        "After (0–1)",
        "Mediation Score"
      ]
    },

    {
      type: "grid-row",
      name: "motor_imitation_a",
      label: "a.",
      cols: [
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4}
          ]
        }
      ]
    },

    {
      type: "grid-row",
      name: "motor_imitation_b",
      label: "b.",
      cols: [
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4}
          ]
        }
      ]
    },

    {
      type: "grid-row",
      name: "motor_imitation_c",
      label: "c.",
      cols: [
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4}
          ]
        }
      ]
    },

    {
      type: "grid-row",
      name: "motor_imitation_d",
      label: "d.",
      cols: [
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4}
          ]
        }
      ]
    },

    { type:"score-box", name:"motor_imitation_total_before", label:"Total / by 4" },
    { type:"score-box", name:"motor_imitation_total_after", label:"Total / by No items" }

  ]
},

{
  title: "12. Utilization of Objects (questions a–d)",
  fields: [

    {
      type:"grid-header",
      template:"260px 120px 120px 260px",
      cols:["Before (0–1)", "After (0–1)", "Mediation Score"]
    },

    {
      type:"grid-row",
      name:"utilization_objects_a",
      label:"a.",
      cols:[
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4}
          ]
        }
      ]
    },

    {
      type:"grid-row",
      name:"utilization_objects_b",
      label:"b.",
      cols:[
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4}
          ]
        }
      ]
    },

    {
      type:"grid-row",
      name:"utilization_objects_c",
      label:"c.",
      cols:[
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4}
          ]
        }
      ]
    },

    {
      type:"grid-row",
      name:"utilization_objects_d",
      label:"d.",
      cols:[
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4}
          ]
        }
      ]
    },

    { type:"score-box", name:"utilization_objects_total_before", label:"Total / by 4" },
    { type:"score-box", name:"utilization_objects_total_after", label:"Total / by No items" }

  ]
},
{
  title: "13. Symbolic Actions (questions a–d)",
  fields: [

    {
      type:"grid-header",
      template:"260px 120px 120px 300px",
      cols:["Before (0–1)", "After (0–1)", "Mediation Score"]
    },

    {
      type:"grid-row",
      name:"symbolic_actions_a",
      label:"a.",
      cols:[
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4},
            {label:"5 - Reduced Amount", value:5}
          ]
        }
      ]
    },

    {
      type:"grid-row",
      name:"symbolic_actions_b",
      label:"b.",
      cols:[
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4},
            {label:"5 - Reduced Amount", value:5}
          ]
        }
      ]
    },

    {
      type:"grid-row",
      name:"symbolic_actions_c",
      label:"c.",
      cols:[
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4},
            {label:"5 - Reduced Amount", value:5}
          ]
        }
      ]
    },

    {
      type:"grid-row",
      name:"symbolic_actions_d",
      label:"d.",
      cols:[
        { type:"single-select", options:[0,1] },
        { type:"single-select", options:[0,1] },
        {
          type:"single-select",
          options:[
            {label:"1 - General Intervention", value:1},
            {label:"2 - General Feedback", value:2},
            {label:"3 - Specific Feedback", value:3},
            {label:"4 - Structured Category", value:4},
            {label:"5 - Reduced Amount", value:5}
          ]
        }
      ]
    },

    { type:"score-box", name:"symbolic_actions_total_before", label:"Total / by 4" },
    { type:"score-box", name:"symbolic_actions_total_after", label:"Total / by No items" },

    {
      type:"score-box",
      name:"praxis_domain_before",
      label:"Domain score before mediation total divided by 3"
    },

    {
      type:"score-box",
      name:"praxis_domain_after",
      label:"After mediation divide by number of items mediated"
    },

    {
      type:"textarea",
      name:"praxis_comments",
      label:"Comments"
    }

  ]
},
    /* =====================================================
       VISUOMOTOR CONSTRUCTION
    ====================================================== */

    {
      title:"VISUOMOTOR CONSTRUCTION",
      fields:[

        {
          type:"grid-header",
          cols:["Before (1–5)","After (1–5)","T*","Mediation Score"]
        },

        ...[
          {name:"copy_geometric",label:"14. Copy Geometric Forms"},
          {name:"two_dimensional_model",label:"15. Two-Dimensional Model"},
          {name:"pegboard",label:"16. Pegboard Construction"},
          {name:"colored_block",label:"17. Colored Block Design"},
          {name:"plain_block",label:"18. Plain Block Design"},
          {name:"puzzle",label:"19. Puzzle"},
          {name:"clock_drawing",label:"20. Clock Drawing"}
        ].map(item=>({
          type:"grid-row",
          name:item.name,
          label:item.label,
          cols:[
            {type:"single-select",options:[1,2,3,4,5]},
            {type:"single-select",options:[1,2,3,4,5]},
            {type:"time-input"},
            {type:"single-select",options:[1,2,3,4,5]}
          ]
        })),

        {
          type:"score-box",
          name:"visuomotor_domain_before",
          label:"Domain score before mediation total divided by 7"
        }
      ]
    },

    /* =====================================================
       THINKING OPERATIONS
    ====================================================== */

    {
      title:"THINKING OPERATIONS",
      fields:[

        {
          type:"grid-header",
          cols:["Before (1–5)","After (1–5)","T*","Mediation Score"]
        },

        ...[
          "categorization",
          "roc_unstructured",
          "pictorial_sequence_a",
          "pictorial_sequence_b",
          "geometric_sequence_a",
          "geometric_sequence_b",
          "roc_structured"
        ].map(key=>({
          type:"grid-row",
          name:key,
          label:key.replace(/_/g," ").toUpperCase(),
          cols:[
            {type:"single-select",options:[1,2,3,4,5]},
            {type:"single-select",options:[1,2,3,4,5]},
            {type:"time-input"},
            {type:"single-select",options:[1,2,3,4,5]}
          ]
        })),

        {
          type:"score-box",
          name:"thinking_domain_before",
          label:"Domain score before mediation total divided by 7"
        }
      ]
    },

    /* =====================================================
       MEMORY
    ====================================================== */

   {
  title: "MEMORY",
  fields: [

    {
      type: "radio",
      name: "famous_personality",
      label: "22. Famous Personality",
      options: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 }
      ]
    },

    {
      type: "radio",
      name: "personal_possessions",
      label: "23. Personal Possessions",
      options: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 }
      ]
    },

    {
      type: "radio",
      name: "everyday_objects",
      label: "24. Everyday Objects",
      options: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 }
      ]
    },

    {
      type: "textarea",
      name: "memory_comments",
      label: "Comments"
    }

  ]
}
  ]
};

  return (
    <CommonFormBuilder
      schema={schema}
      values={computedValues}
      onChange={handleChange}
      layout="nested"
    />
  );
}