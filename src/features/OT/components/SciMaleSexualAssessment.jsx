import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function SCIMaleSexualFunctionAssessment() {

  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const SEXUAL_FUNCTION_OPTIONS = [
    { label: "Normal", value: "normal" },
    { label: "Reduced / Altered", value: "reduced" },
    { label: "Absent", value: "absent" },
    { label: "Unknown / Not applicable", value: "unknown" }
  ];

  const SCI_SEXUAL_FUNCTION_SCHEMA = {
    title: "International Spinal Cord Injury Male Sexual Function",

    sections: [
      {
        fields: [

          {
            type: "date",
            name: "data_collection_date",
            label: "Date of Data Collection"
          },

          {
            type: "radio",
            name: "interest_discussion",
            label: "Interest in Discussing Sexual Issues",
            labelAbove: true,
            options: [
              { label: "Yes", value: "yes" },
              {
                label: "Yes, but only willing to provide information for medical record",
                value: "medical_record_only"
              },
              {
                label: "No, prefers the discussion is stopped",
                value: "no"
              }
            ]
          },

          {
            type: "radio",
            name: "sexual_orientation",
            label: "Sexual Orientation",
            labelAbove: true,
            options: [
              { label: "Heterosexual", value: "heterosexual" },
              { label: "Bisexual", value: "bisexual" },
              { label: "Homosexual (Gay)", value: "homosexual" },
              { label: "Asexual", value: "asexual" },
              { label: "Prefer not to say", value: "prefer_not" },
              { label: "Do not know", value: "unknown" }
            ]
          },

          {
            type: "radio",
            name: "sexual_problem_prior",
            label: "Sexual Problems Prior or Unrelated to Spinal Cord Lesion",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
              { label: "Unknown / Not applicable", value: "unknown" }
            ]
          },

          {
            type: "textarea",
            name: "sexual_problem_prior_remarks",
            label: "Remarks",
            showIf: {
              field: "sexual_problem_prior",
              equals: "yes"
            }
          },

          {
            type: "radio",
            name: "sexual_dysfunction_related",
            label: "Sexual Dysfunction Related to Spinal Cord Lesion",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
              { label: "Unknown / Not applicable", value: "unknown" }
            ]
          },

          {
            type: "radio",
            name: "psychogenic_erection",
            label: "Psychogenic Erection",
            options: SEXUAL_FUNCTION_OPTIONS
          },

          {
            type: "radio",
            name: "reflex_erection",
            label: "Reflex Erection",
            options: SEXUAL_FUNCTION_OPTIONS
          },

          {
            type: "radio",
            name: "ejaculation",
            label: "Ejaculation",
            options: SEXUAL_FUNCTION_OPTIONS
          },

          {
            type: "radio",
            name: "orgasm_function",
            label: "Orgasm Function",
            options: SEXUAL_FUNCTION_OPTIONS
          }

        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={SCI_SEXUAL_FUNCTION_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      layout="nested"
    >
    </CommonFormBuilder>
  );
}