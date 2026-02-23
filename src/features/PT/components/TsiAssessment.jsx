import React, { useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function TISAssessment({
  values,
  onChange,
  submitted
}) {

  /* ================= TOTAL CALCULATION ================= */

  const totalScore = useMemo(() => {
    const keys = Object.keys(values || {});
    return keys
      .filter(k => k.startsWith("tis_"))
      .map(k => Number(values[k]) || 0)
      .reduce((a, b) => a + b, 0);
  }, [values]);

  /* ================= SCHEMA ================= */

  const schema = {
    title: "Trunk Impairment Scale (TIS) Assessment",
    sections: [

   

      {
        title: "Part 1: Static Sitting Balance",
        fields: [

          { type: "grid-header", cols: ["Cannot Perform (0)", "Partially (1)", "Fully (2)"] },

          {
            type: "radio-matrix",
            name: "tis_static_sitting",
            label: "1. Sitting Without Support",
            options: [{value:0},{value:1},{value:2}]
          },

          { type: "textarea", name: "tis_static_sitting_notes", label: "Notes" },

          {
            type: "radio-matrix",
            name: "tis_eyes_closed",
            label: "2. Maintaining Sitting Balance (Eyes Closed)",
            options: [{value:0},{value:1},{value:2}]
          },

          { type: "textarea", name: "tis_eyes_closed_notes", label: "Notes" }

        ]
      },

      /* ================================================= */
      /* PART 2 – DYNAMIC SITTING BALANCE                  */
      /* ================================================= */

      {
        title: "Part 2: Dynamic Sitting Balance",
        fields: [

          { type: "subheading", label: "1. Lateral Flexion" },

          { type: "grid-header", cols: ["Cannot (0)", "Partial (1)", "Full (2)"] },

          {
            type: "radio-matrix",
            name: "tis_lateral_right",
            label: "Right",
            options: [{value:0},{value:1},{value:2}]
          },

          {
            type: "radio-matrix",
            name: "tis_lateral_left",
            label: "Left",
            options: [{value:0},{value:1},{value:2}]
          },

          { type: "textarea", name: "tis_lateral_notes", label: "Notes" },

          { type: "subheading", label: "2. Rotation" },

          {
            type: "radio-matrix",
            name: "tis_rotation_right",
            label: "Right",
            options: [{value:0},{value:1},{value:2}]
          },

          {
            type: "radio-matrix",
            name: "tis_rotation_left",
            label: "Left",
            options: [{value:0},{value:1},{value:2}]
          },

          { type: "textarea", name: "tis_rotation_notes", label: "Notes" }

        ]
      },

      /* ================================================= */
      /* PART 3 – COORDINATION                              */
      /* ================================================= */

      {
        title: "Part 3: Coordination",
        fields: [

          { type: "grid-header", cols: ["Cannot (0)", "Partial (1)", "Full (2)"] },

          {
            type: "radio-matrix",
            name: "tis_pick_object",
            label: "1. Picking Up an Object from the Floor",
            options: [{value:0},{value:1},{value:2}]
          },

          { type: "textarea", name: "tis_pick_notes", label: "Notes" },

          {
            type: "radio-matrix",
            name: "tis_sit_to_lying",
            label: "2. Moving from Sitting to Lying and Back",
            options: [{value:0},{value:1},{value:2}]
          },

          { type: "textarea", name: "tis_sit_lying_notes", label: "Notes" }

        ]
      },

      /* ================================================= */
      /* TOTAL + COMMENTS                                   */
      /* ================================================= */

      {
        title: "Summary",
        fields: [

          {
            type: "score-box",
            name: "tis_total",
            label: "Total Score (out of 14)",
            value: totalScore
          },

          {
            type: "textarea",
            name: "tis_overall_comments",
            label: "Assessor's Overall Observations and Comments"
          }

        ]
      }

    ]
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      submitted={submitted}
      layout="nested"
    />
  );
}
