import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function SCIFemaleSexualFunctionAssessment() {

  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const FUNCTION_OPTIONS = [
    { label: "Normal", value: "normal" },
    { label: "Reduced / Altered", value: "reduced" },
    { label: "Absent", value: "absent" },
    { label: "Unknown / Not applicable", value: "unknown" }
  ];

  const MENSTRUATION_OPTIONS = [
    { label: "Normal", value: "normal" },
    { label: "Reduced / Altered", value: "reduced" },
    { label: "Absent", value: "absent" },
    { label: "Not applicable", value: "na" },
    { label: "Unknown", value: "unknown" }
  ];

  const FEMALE_SCI_SCHEMA = {
    title: "International Spinal Cord Injury Female Sexual and Reproductive Function",

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
                label: "Yes, but only willing to provide information for the medical record",
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
              { label: "Homosexual (Lesbian)", value: "homosexual" },
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
            name: "sexual_problem_prior_remark",
            label: "Remarks",
            showIf: {
              field: "sexual_problem_prior",
              equals: "yes"
            }
          },

          {
            type: "radio",
            name: "sexual_dysfunction_related",
            label: "Sexual Dysfunction Related to the Spinal Cord Lesion",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
              { label: "Unknown / Not applicable", value: "unknown" }
            ]
          },

          {
            type: "radio",
            name: "psychogenic_arousal",
            label: "Psychogenic Arousal",
            options: FUNCTION_OPTIONS
          },

          {
            type: "radio",
            name: "reflex_genital_arousal",
            label: "Reflex Genital Arousal",
            options: FUNCTION_OPTIONS
          },

          {
            type: "radio",
            name: "orgasm_function",
            label: "Orgasmic Function",
            options: FUNCTION_OPTIONS
          },

          {
            type: "radio",
            name: "menstruation",
            label: "Menstruation",
            options: MENSTRUATION_OPTIONS
          }

        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={FEMALE_SCI_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      layout="nested"
    >
    </CommonFormBuilder>
  );
}