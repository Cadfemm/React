import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function WorkHardeningScreening({
  values = {},
  onChange,
}) {
  const taskFields = (title, key) => [
    {
      type: "radio",
      name: `${key}_status`,
      label: title,
      options: [
        { label: "Able", value: "able" },
        { label: "Unable", value: "unable" },
        {
          label: "Never perform after injury",
          value: "never_after_injury",
        },
      ],
    },

        {
        type: "scale-slider",
        name: `${key}_scale`,
        label: "Pain Scale",
        min: 0,
        max: 10,
        showValue: true,
        ranges: [
            {
            min: 0,
            max: 1,
            label: "Mild",
            color: "#22c55e"
            },
            {
            min: 1,
            max: 5,
            label: "Moderate",
            color: "#facc15"
            },
            {
            min: 5,
            max: 10,
            label: "Severe",
            color: "#ef4444"
            }
        ],
        showIf: {
            field: `${key}_status`,
            equals: "able",
        },
        },

    {
      type: "input",
      name: `${key}_remark`,
      label: "Remark",
    },
  ];

  const schema = {
    title: "Work Hardening Screening Form",
    sections: [
      {
        fields: [
          ...taskFields("Lift - Right Hand", "lift_right"),
          ...taskFields("Lift - Left Hand", "lift_left"),
          ...taskFields("Carry - Right Hand", "carry_right"),
          ...taskFields("Carry - Left Hand", "carry_left"),
          ...taskFields("Push - Right Hand", "push_right"),
          ...taskFields("Push - Left Hand", "push_left"),
          ...taskFields("Pull - Right Hand", "pull_right"),
          ...taskFields("Pull - Left Hand", "pull_left"),
          ...taskFields("Stand", "stand"),
          ...taskFields("Sit", "sit"),
          ...taskFields("Squat", "squat"),
          ...taskFields("Kneel", "kneel"),
          ...taskFields("Walk", "walk"),

         {
            type: "radio",
            name: "wheelchair_type",
            label: "Wheelchair",
            options: [
              { label: "Not related", value: "not_related" },
              { label: "Self-manoeuvre", value: "self_manoeuvre" },
              { label: "Assisted", value: "assisted" },
            ],
          },
          ...taskFields("Wheelchair Difficulty", "wheelchair").map((field) => ({
            ...field,
            showIf: {
              field: "wheelchair_type",
              oneOf: ["self_manoeuvre", "assisted"],
            },
          })),
          ...taskFields("Stairs", "stairs"),
          ...taskFields("Ladder", "ladder"),
        ],
      },
    ],
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}