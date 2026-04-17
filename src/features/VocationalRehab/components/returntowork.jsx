import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function ReadinessReturnToWorkScale({
  values = {},
  onChange,
}) {
  const notBackQuestions = [
    "You don’t think you will ever be able to go back to work.",
    "As far as you’re concerned, there is no point in thinking about returning to work.",
    "You are actively doing things now to get back to work.",
    "Physically, you are starting to feel ready to go back to work.",
    "You have been increasing your activities at home in order to build up your strength to go back to work.",
    "You are getting help from others to return to work.",
    "You are not ready to go back to work.",
    "You have found strategies to make your work manageable so you can return to work.",
    "You have been wondering if there is something you could do to return to work.",
    "You have a date for your first day back at work.",
    "You wish you had more ideas about how to get back to work.",
    "You would like to have some advice about how to go back to work.",
    "As far as you are concerned, you don’t need to go back to work ever.",
  ];

  const backQuestions = [
    "You are doing everything you can to stay at work.",
    "You have learned different ways to cope with your pain so that you can stay at work.",
    "You are taking steps to prevent having to go off work again due to your injury.",
    "You have found strategies to make your work manageable so you can stay at work.",
    "You are back at work but not sure you can keep up the effort.",
    "You worry about having to stop working again due to your injury.",
    "You still find yourself struggling to stay at work due to the effects of your injury.",
    "You are back at work and it is going well.",
    "You feel you may need help in order to stay at work.",
  ];

  const scaleOptions = [
    { label: "Strongly Disagree", value: "1" },
    { label: "Disagree", value: "2" },
    { label: "Neither Disagree Nor Agree", value: "3" },
    { label: "Agree", value: "4" },
    { label: "Strongly Agree", value: "5" },
  ];

  const isBackAtWork = values.back_at_work;

  const totalScore =
    isBackAtWork === "no"
      ? notBackQuestions.reduce((sum, _, i) => {
          return sum + Number(values[`rtw_q${i + 1}`] || 0);
        }, 0)
      : isBackAtWork === "yes"
      ? backQuestions.reduce((sum, _, i) => {
          return sum + Number(values[`rtw_q${i + 14}`] || 0);
        }, 0)
      : 0;

  const makeField = (label, no) => ({
    type: "radio-matrix",
    name: `rtw_q${no}`,
    label: `${label}`,
    options: scaleOptions,
    matrixHeaderLabel: "Scale",

    // CRITICAL FIX FOR ALIGNMENT
    wideLabel: true, // uses 400px question column in FormBuilder
  });
values.rtw_total = totalScore;
  const schema = {
    title: "Readiness For Return-To-Work Scale",
    sections: [
      {
        fields: [
          {
            type: "radio",
            name: "back_at_work",
            label: "Are you currently back at work?",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" },
            ],
          },

          ...(isBackAtWork
            ? [
                {
                  type: "grid-header",
                  label: "",

                  // EXACT SAME WIDTH AS wideLabel rows
                  wideLabel: true,

                  cols: [
                    "Strongly Disagree",
                    "Disagree",
                    "Neither Disagree Nor Agree",
                    "Agree",
                    "Strongly Agree",
                  ],

                  // force perfect alignment
                  template: "400px repeat(5, 1fr)",
                },
              ]
            : []),

          ...(isBackAtWork === "no"
            ? [
                {
                  type: "subheading",
                  label: "For Those Not Back At Work",
                },
                ...notBackQuestions.map((q, i) => makeField(q, i + 1)),
              ]
            : []),

          ...(isBackAtWork === "yes"
            ? [
                {
                  type: "subheading",
                  label: "For Those Not Back At Work",
                },
                ...backQuestions.map((q, i) => makeField(q, i + 14)),
              ]
            : []),

          {
            type: "score-box",
            name: "rtw_total", label: "TOTAL PROFILE SCORE",
            text: `Total Score (auto-calculated): ${totalScore}`,
          },
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