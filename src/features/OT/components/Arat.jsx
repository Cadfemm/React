import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function ARATAssessment() {

  const [values, setValues] = useState({});

  const ARAT_SCALE = [
    { label: "0", value: "0",   required: true },
    { label: "1", value: "1",   required: true },
    { label: "2", value: "2" ,required: true},
    { label: "3", value: "3",required: true },
  ];

  const ARAT_SCHEMA = {
    title: "Action Research Arm Test",

    sections: [

      {
        title: "",
        fields: [
          {
            type: "radio",
            name: "hand_tested",
            label: "Dominant Hand",
            options: [
              { label: "Right", value: "R" },
              { label: "Left", value: "L" }
            ]
          },
           {
            type: "radio",
            name: "affected_tested",
            label: "Affected Hand",
            options: [
              { label: "Right", value: "R" },
              { label: "Left", value: "L" }
            ]
          }
        ]
      },

      {
        title: "Grasp",
        fields: [
          {
            type: "scale-table",
            name: "grasp",
            columns: ARAT_SCALE,
            rows: [
              "Block (wood) 10 cm",
              "Block (wood) 2.5 cm",
              "Block (wood) 5 cm",
              "Block (wood) 7.5 cm",
              "Cricket ball",
              "Sharpening stone"
            ]
          },
          { type: "score-box", name: "grasp_score", label: "Grasp Score" }
        ]
      },

      {
        title: "Grip",
        fields: [
          {
            type: "scale-table",
            name: "grip",
            columns: ARAT_SCALE,
            rows: [
              "Pour water",
              "Transfer 2.25 cm tube",
              "Transfer 1 cm tube",
              "Place washer"
            ]
          },
          { type: "score-box", name: "grip_score", label: "Grip Score" }
        ]
      },

      {
        title: "Pinch",
        fields: [
          {
            type: "scale-table",
            name: "pinch",
            columns: ARAT_SCALE,
            rows: [
              "Ball bearing (thumb & third finger)",
              "Marble (thumb & first finger)",
              "Ball bearing (thumb & second finger)",
              "Ball bearing (thumb & first finger)",
              "Marble (thumb & third finger)",
              "Marble (thumb & second finger)"
            ]
          },
          { type: "score-box", name: "pinch_score", label: "Pinch Score" }
        ]
      },

      {
        title: "Gross Movement",
        fields: [
          {
            type: "scale-table",
            name: "gross",
            columns: ARAT_SCALE,
            rows: [
              "Hand behind head",
              "Hand on top of head",
              "Hand to mouth"
            ]
          },
          { type: "score-box", name: "gross_score", label: "Gross Movement Score" }
        ]
      },

      {
        title: "Final Score",
        fields: [
          { type: "score-box", name: "total_score", label: "Total Score" },
          { type: "score-box", name: "interpretation", label: "Interpretation" }
        ]
      }

    ]
  };


  const handleChange = (name, value) => {

    setValues(prev => ({
      ...prev,
      [name]: value
    }));

  };


  const calculateARAT = (values) => {

    const sumTable = (prefix, rows) => {
      let total = 0;

      for (let i = 0; i < rows; i++) {
        const key = `${prefix}_${i}`;
        total += Number(values[key] || 0);
      }

      return total;
    };

    const grasp = sumTable("grasp", 6);
    const grip = sumTable("grip", 4);
    const pinch = sumTable("pinch", 6);
    const gross = sumTable("gross", 3);

    const total = grasp + grip + pinch + gross;

    let interpretation = "";

    if (total <= 9) interpretation = "No dexterity";
    else if (total <= 56) interpretation = "Some dexterity";
    else interpretation = "Full recovery";

    return {
      grasp,
      grip,
      pinch,
      gross,
      total,
      interpretation
    };
  };


  useEffect(() => {

    const scores = calculateARAT(values);

    setValues(prev => {

      if (
        prev.grasp_score === scores.grasp &&
        prev.grip_score === scores.grip &&
        prev.pinch_score === scores.pinch &&
        prev.gross_score === scores.gross &&
        prev.total_score === scores.total &&
        prev.interpretation === scores.interpretation
      ) {
        return prev;
      }

      return {
        ...prev,
        grasp_score: scores.grasp,
        grip_score: scores.grip,
        pinch_score: scores.pinch,
        gross_score: scores.gross,
        total_score: scores.total,
        interpretation: scores.interpretation
      };

    });

  }, [values]);


  return (
    <CommonFormBuilder
      schema={ARAT_SCHEMA}
      values={values}
      onChange={handleChange}
      showScores={true}
      layout="nested"
    />
  );

}