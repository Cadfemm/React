import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function BoxAndBlockTest() {

  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateResult = (vals) => {

    const dominant = Number(vals.dominant_blocks || 0);
    const nondominant = Number(vals.nondominant_blocks || 0);

    return {
      dominant,
      nondominant,
      total: dominant + nondominant
    };
  };

  useEffect(() => {

    const scores = calculateResult(values);

    setValues(prev => {

      if (
        prev.total_blocks === scores.total
      ) return prev;

      return {
        ...prev,
        total_blocks: scores.total
      };

    });

  }, [values]);

  const BBT_SCHEMA = {

    title: "BOX AND BLOCK TEST",

    titleInfo: {
      title: "Instructions",
      content: [
        "The patient is allowed a 15-second trial period prior to testing",
        "Before testing begins, patient places hands on the sides of the box",
        "Patient grasps one block at a time with the dominant hand",
        "Transport the block over the partition",
        "Release it into the opposite compartment",
        "Continue for one minute",
        "Repeat procedure with the nondominant hand",
        "Examiner counts the blocks",
        "If patient transports multiple blocks simultaneously, subtract them",
        "No penalty if blocks fall outside the box"
      ]
    },
    sections: [
      {
        title: "Patient Details",
        fields: [

          {
            type: "date",
            name: "date",
            label: "Date"
          },

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
          }

        ]
      },

      {
        title: "Record number of blocks transported in one minute",
        fields: [

          {
            type: "input",
            name: "dominant_blocks",
            label: "Dominant Hand Blocks",
            inputType: "number"
          },

          {
            type: "input",
            name: "nondominant_blocks",
            label: "Non-Dominant Hand Blocks",
            inputType: "number"
          }

        ]
      },

      {
        title: "Results",
        fields: [

          {
            type: "score-box",
            name: "total_blocks",
            label: "Total Blocks Transported"
          }

        ]
      }

    ]

  };

  return (

    <CommonFormBuilder
      schema={BBT_SCHEMA}
      values={values}
      onChange={handleChange}
      showScores
      layout="nested"
    />

  );

}