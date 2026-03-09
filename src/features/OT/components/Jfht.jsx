import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function JHFTAssessment() {

  const [values, setValues] = useState({});

  const rows = [
    "WRITING (NON DOMINANT)",
    "WRITING (DOMINANT HAND)",
    "CARD TURNING (NON DOMINANT)",
    "CARD TURNING (DOMINANT HAND)",
    "SMALL COMMON OBJECTS (NON DOMINANT)",
    "SMALL COMMON OBJECTS (DOMINANT HAND)",
    "SIMULATED FEEDING (NON DOMINANT)",
    "SIMULATED FEEDING (DOMINANT HAND)",
    "CHECKERS FEEDING (NON DOMINANT)",
    "CHECKERS (DOMINANT HAND)",
    "LARGE LIGHT OBJECT (NON DOMINANT)",
    "LARGE LIGHT OBJECT (DOMINANT HAND)",
    "LARGE HEAVY OBJECT (NON DOMINANT)",
    "LARGE HEAVY OBJECT (DOMINANT HAND)"
  ];

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotals = (vals) => {

    let right = 0;
    let left = 0;

    rows.forEach((_, i) => {
      right += Number(vals[`right_${i}`] || 0);
      left += Number(vals[`left_${i}`] || 0);
    });

    return {
      right,
      left,
      total: right + left
    };
  };

  useEffect(() => {

    const scores = calculateTotals(values);

    setValues(prev => {

      if (
        prev.right_total === scores.right &&
        prev.left_total === scores.left &&
        prev.overall_total === scores.total
      ) return prev;

      return {
        ...prev,
        right_total: scores.right,
        left_total: scores.left,
        overall_total: scores.total
      };

    });

  }, [values]);

  const JHFT_SCHEMA = {

    title: "Jebsen Hand Function Test",

    sections: [
      {
        fields: [

          {
            type: "radio",
            name: "dominant_hand",
            label: "Dominant Hand",
            options: [
              { label: "Right", value: "R" },
              { label: "Left", value: "L" }
            ]
          },

          {
            type: "radio",
            name: "affected_hand",
            label: "Affected Hand",
            options: [
              { label: "Right", value: "R" },
              { label: "Left", value: "L" }
            ]
          },

          {
            type: "grid-header",
            label: "",
            cols: ["RIGHT (SECONDS)", "LEFT (SECONDS)"],
            template: "1fr 100px 100px"
          },

          ...rows.map((label, i) => ({
            type: "grid-row",
            label: label,
            template: "1fr 100px 100px",
            cols: [
              {
                type: "input",
                name: `right_${i}`,
                inputType: "number"
              },
              {
                type: "input",
                name: `left_${i}`,
                inputType: "number"
              }
            ]
          })),

          {
            type: "grid-row",
            label: "Right Hand Total",
            cols: [
              { type: "score-box", name: "right_total" }
            ]
          },

          {
            type: "grid-row",
            label: "Left Hand Total",
            cols: [
              { type: "score-box", name: "left_total" }
            ]
          },

          {
            type: "grid-row",
            label: "Overall Time",
            cols: [
              { type: "score-box", name: "overall_total" }
            ]
          }

        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={JHFT_SCHEMA}
      values={values}
      onChange={handleChange}
      showScores
      layout="grid"
    />
  );
}