
import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

function calculateVF(values) {
  const nums = Object.keys(values)
    .filter(k => k.startsWith("vf_tasks_"))
    .map(k => Number(values[k]))
    .filter(v => !isNaN(v));

  const sum = nums.reduce((s, v) => s + v, 0);

  let impairment = "";
  if (sum <= 5) impairment = "Very severe impairment";
  else if (sum <= 16) impairment = "Severe impairment";
  else if (sum <= 41) impairment = "Moderate impairment";
  else if (sum <= 51) impairment = "Mild impairment";
  else impairment = "No visual impairment";

  const vfScore = Math.round((sum / 55) * 100);

  return { sum, impairment, vfScore };
}




export default function VisualFunctionForm( layout = "root") {
  const [values, setValues] = React.useState({});

  const handleChange = (name, value) => {
    const next = { ...values, [name]: value };

    const { sum, impairment, vfScore } = calculateVF(next);
    next.vf_sum = sum;
    next.vf_impairment = impairment;
    next.vf_score = vfScore;

    setValues(next);
  };

  const DIFFICULTY_OPTIONS = [
  { label: "No difficulty", value: 4 },
  { label: "A little difficulty", value: 3 },
  { label: "Moderate difficulty", value: 2 },
  { label: "A great deal of difficulty", value: 1 },
  { label: "Unable to do this activity", value: 0 }
];

 const visualFunctionSchema = {
  title: "Visual Function Questionnaire",
  sections: [
    {
      title: "Daily Visual Tasks",
      fields: [
        {
          type: "scale-table",
          name: "vf_tasks",
          columns: DIFFICULTY_OPTIONS,
          rows: [
            "Do you have any difficulty, even with glasses, reading small print, such as labels on medicine bottles, a telephone book, or food labels?",
            "Do you have any difficulty, even with glasses, reading a newspaper or a book?",
            "Do you have any difficulty, even with glasses, reading a large-print book or numbers on a telephone?",
            "Do you have any difficulty, even with glasses, recognizing people when they are close to you?",
            "Do you have any difficulty, even with glasses, seeing steps, stairs, or curbs?",
            "Do you have any difficulty, even with glasses, reading traffic signs, street signs, or store signs?",
            "Do you have any difficulty, even with glasses, doing fine handwork like sewing, knitting, crocheting, or carpentry?",
            "Do you have any difficulty, even with glasses, writing checks or filling out forms?",
            "Do you have any difficulty, even with glasses, playing games such as bingo, dominoes, card games, or mahjong?",
            "Do you have any difficulty, even with glasses, taking part in sports like bowling, handball, tennis, golf?",
            "Do you have any difficulty, even with glasses, cooking?",
            "Do you have any difficulty, even with glasses, watching television?"
          ]
        }
      ]
    },

{
  title: "Driving",
  fields: [
    {
      type: "radio",
      name: "drive_now",
      label: "Do you currently drive a car?",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ]
    },

    {
      type: "single-select",
      name: "drive_day",
      label: "How much difficulty do you have driving during the day because of your vision?",
      showIf: {
        field: "drive_now",
        equals: "Yes"
      },
      options: [
        { label: "None", value: 4 },
        { label: "A little", value: 3 },
        { label: "Moderate amount", value: 2 },
        { label: "A great deal", value: 1 }
      ]
    },

    {
      type: "single-select",
      name: "drive_night",
      label: "How much difficulty do you have driving at night because of your vision?",
      showIf: {
        field: "drive_now",
        equals: "Yes"
      },
      options: [
        { label: "None", value: 4 },
        { label: "A little", value: 3 },
        { label: "Moderate amount", value: 2 },
        { label: "A great deal", value: 1 }
      ]
    },

    {
      type: "radio",
      name: "drive_stopped",
      label: "Have you previously driven a car but since stopped?",
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" }
      ]
    },

    {
      type: "single-select",
      name: "drive_stop_when",
      label: "When did you stop driving?",
      showIf: {
        field: "drive_stopped",
        equals: "Yes"
      },
      options: [
        { label: "Less than 6 months ago", value: "lt6" },
        { label: "6 to 12 months ago", value: "6to12" },
        { label: "More than 12 months ago", value: "gt12" }
      ]
    },

    {
      type: "single-select",
      name: "drive_stop_why",
      label: "Why did you stop driving?",
      showIf: {
        field: "drive_stopped",
        equals: "Yes"
      },
      options: [
        { label: "Poor vision", value: "vision" },
        { label: "Other illness", value: "illness" },
        { label: "Other reason", value: "other" }
      ]
    }
  ]
}



  ]
};

  return (
    <>
      <CommonFormBuilder
        schema={visualFunctionSchema}
        values={values}
        onChange={handleChange}
        layout={layout}
      />

      <div style={{ display: "flex", gap: 16, margin: 24 }}>
        <div style={pill}>Sum of Points: {values.vf_sum || 0}</div>
        <div style={pill}>Impairment: {values.vf_impairment || "-"}</div>
        <div style={pill}>VF Score: {values.vf_score || 0}</div>
      </div>
    </>
  );
}

const pill = {
  padding: "14px 18px",
  borderRadius: 12,
  border: "1px solid #CBD5E1",
  fontWeight: 700,
  minWidth: 200
};
