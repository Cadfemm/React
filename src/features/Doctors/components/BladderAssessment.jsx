import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";


const BLADDER_SCHEMA = {
  title: "Bladder Issue",

  sections: [
    {
      title: null,
      fields: [
        /* -------------------------------------------------
           Q0: Any urinary problem?
        ------------------------------------------------- */
        {
          name: "urinaryProblem",
          label: "Any urinary problem?",
          type: "radio",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" }
          ],
          validation: { required: true }
        },

        /* -------------------------------------------------
           CURRENT METHOD
        ------------------------------------------------- */
        {
          name: "currentMethod",
          label: "Currently on",
          type: "single-select",
          showIf: {
            field: "urinaryProblem",
            equals: "Yes"
          },
          options: [
            { label: "Spontaneous", value: "Spontaneous" },
            { label: "Continuous Bladder Drainage (CBD)", value: "CBD" },
            { label: "Condom catheter", value: "Condom" },
            { label: "Clean Intermittent Self-Catheterization (CISC)", value: "CISC" },
            { label: "Clean Intermittent Catheterization (CIC)", value: "CIC" },
            { label: "Supra Pubic Catheterization (SPC)", value: "SPC" },
            { label: "Others", value: "Others" }
          ]
        },
        {
          name: "currentMethodOther",
          label: "Please specify",
          type: "input",
          showIf: {
            field: "currentMethod",
            equals: "Others"
          }
        },

        /* -------------------------------------------------
           YES / NO QUESTIONS WITH CONDITIONAL NOTES
        ------------------------------------------------- */
        ...[
          { key: "sensate", label: "1. Able to sensate?" },
          { key: "control", label: "2. Able to control?" },
          { key: "hold", label: "3. Able to hold?" },
          { key: "urgency", label: "4. Any urgency?" },
          { key: "hesitancy", label: "5. Hesitancy?" },
          { key: "history", label: "6. History of bladder stone / UTI / other problem?" },
          { key: "imaging", label: "7. Any imaging / procedure / surgery done? (UDS / SCC / USG)" }
        ].flatMap(q => ([
          {
            name: q.key,
            label: q.label,
            type: "radio",
            showIf: {
              field: "urinaryProblem",
              equals: "Yes"
            },
            options: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" }
            ]
          },
          {
            name: `${q.key}Notes`,
            label: "Please specify",
            type: "input",
            showIf: {
              field: q.key,
              equals: "Yes"
            }
          }
        ])),

        /* -------------------------------------------------
           ADDITIONAL NOTES
        ------------------------------------------------- */
        {
          name: "additional",
          label: "8. Other additional information",
          type: "textarea",
          showIf: {
            field: "urinaryProblem",
            equals: "Yes"
          }
        }
      ]
    }
  ]
};
// bladder assesments
const initialValues = {
  urinaryProblem: "",
  currentMethod: "",
  currentMethodOther: "",
  sensate: "",
  sensateNotes: "",
  control: "",
  controlNotes: "",
  hold: "",
  holdNotes: "",
  urgency: "",
  urgencyNotes: "",
  hesitancy: "",
  hesitancyNotes: "",
  history: "",
  historyNotes: "",
  imaging: "",
  imagingNotes: "",
  additional: ""
};



export default function BladderAssessment() {
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Bladder Assessment Data:", values);
  };

  return (
    <CommonFormBuilder
      schema={BLADDER_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
    >
    
    </CommonFormBuilder>
  );
}
