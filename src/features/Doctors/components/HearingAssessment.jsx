import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function HearingAssessment() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };
 const HEARING_SCHEMA = {
  title: "Hearing Assessment",

  sections: [
    /* =====================================================
       EAR ISSUE
    ===================================================== */
    {
      title: "Ear Issue",
      fields: [
        {
          type: "radio",
          name: "ear_status",
          label: "Ear Issue",
          options: [
            { label: "Intact", value: "intact" },
            { label: "Impaired", value: "impaired" }
          ]
        },

        {
          type: "multi-select-dropdown",
          name: "b230_hearing_issue",
          label: "b230 Hearing Issue",
          showIf: { field: "ear_status", equals: "impaired" },
          options: [
            { label: "No issue", value: "no_issue" },
            { label: "Ear pain", value: "ear_pain" },
            { label: "Hearing loss", value: "hearing_loss" },
            { label: "Tinnitus", value: "tinnitus" },
            { label: "Feeling of fullness", value: "fullness" },
            { label: "Ear discharge", value: "ear_discharge" },
            { label: "Dizziness", value: "dizziness" },
            { label: "Vertigo", value: "vertigo" },
            { label: "Nausea", value: "nausea" },
            { label: "Itching", value: "itching" },
            { label: "Hyperacusis", value: "hyperacusis" },
            { label: "Deformity", value: "deformity" }
          ]
        },
        {
          type: "textarea",
          name: "b230_hearing_issue_notes",
          label: "Elaboration of issues (if present)",
          showIf: { field: "ear_status", equals: "impaired" }
        }
      ]
    },

    /* =====================================================
       HEARING DEVICE
    ===================================================== */
    {
      title: "Use of Hearing Device",
      showIf: { field: "ear_status", equals: "impaired" },
      fields: [
        {
          type: "radio",
          name: "hearing_device",
          label: "Use of Hearing Device",
          options: [
            { label: "No", value: "no" },
            { label: "Hearing aid", value: "hearing_aid" },
            { label: "Cochlear implant", value: "cochlear_implant" },
            { label: "Other", value: "other" }
          ]
        },
        {
          type: "input",
          name: "hearing_device_other",
          label: "Other (specify)",
          showIf: { field: "hearing_device", equals: "other" }
        }
      ]
    },

    /* =====================================================
       EXTERNAL EAR EXAMINATION
    ===================================================== */
    {
      title: "External Ear Examination",
      showIf: { field: "ear_status", equals: "impaired" },
      fields: [
        { type: "subheading", label: "Right Ear" },

        ...["deformity", "redness", "swelling", "tenderness", "discharge"].flatMap(item => [
          {
            type: "radio",
            name: `right_external_${item}`,
            label: item.charAt(0).toUpperCase() + item.slice(1),
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            type: "textarea",
            name: `right_external_${item}_notes`,
            label: `Elaboration for ${item} (Right Ear)`,
            showIf: {
              field: `right_external_${item}`,
              equals: "yes"
            }
          }
        ]),

        { type: "subheading", label: "Left Ear" },

        ...["deformity", "redness", "swelling", "tenderness", "discharge"].flatMap(item => [
          {
            type: "radio",
            name: `left_external_${item}`,
            label: item.charAt(0).toUpperCase() + item.slice(1),
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            type: "textarea",
            name: `left_external_${item}_notes`,
            label: `Elaboration for ${item} (Left Ear)`,
            showIf: {
              field: `left_external_${item}`,
              equals: "yes"
            }
          }
        ])
      ]
    },

    /* =====================================================
       OTOSCOPY – EAR CANAL
    ===================================================== */
    {
      title: "Otoscopy – Ear Canal",
      showIf: { field: "ear_status", equals: "impaired" },
      fields: [
        { type: "subheading", label: "Right Ear" },

        ...["wax", "redness", "swelling", "foreign_body", "discharge"].flatMap(item => [
          {
            type: "radio",
            name: `right_canal_${item}`,
            label: item.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()),
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            type: "textarea",
            name: `right_canal_${item}_notes`,
            label: `Elaboration for ${item.replace("_", " ")} (Right Ear)`,
            showIf: {
              field: `right_canal_${item}`,
              equals: "yes"
            }
          }
        ]),

        { type: "subheading", label: "Left Ear" },

        ...["wax", "redness", "swelling", "foreign_body", "discharge"].flatMap(item => [
          {
            type: "radio",
            name: `left_canal_${item}`,
            label: item.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()),
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            type: "textarea",
            name: `left_canal_${item}_notes`,
            label: `Elaboration for ${item.replace("_", " ")} (Left Ear)`,
            showIf: {
              field: `left_canal_${item}`,
              equals: "yes"
            }
          }
        ])
      ]
    },

    /* =====================================================
       TYMPANIC MEMBRANE
    ===================================================== */
    {
      title: "Tympanic Membrane (TM)",
      showIf: { field: "ear_status", equals: "impaired" },
      fields: [
        { type: "subheading", label: "Right Ear" },

        {
          type: "radio",
          name: "right_tm_color",
          label: "Color: Pearly Grey (Normal)",
          options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
        },
        {
          type: "radio",
          name: "right_tm_position",
          label: "Position",
          options: [
            { label: "Neutral", value: "neutral" },
            { label: "Bulging", value: "bulging" },
            { label: "Retracted", value: "retracted" }
          ]
        },
        ...["handle_malleus", "cone_light", "perforation_scarring"].flatMap(item => [
          {
            type: "radio",
            name: `right_tm_${item}`,
            label: item.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()),
            options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
          },
          {
            type: "textarea",
            name: `right_tm_${item}_notes`,
            label: `Elaboration for ${item.replace("_", " ")} (Right Ear)`,
            showIf: {
              field: `right_tm_${item}`,
              equals: "yes"
            }
          }
        ]),

        { type: "subheading", label: "Left Ear" },

        {
          type: "radio",
          name: "left_tm_color",
          label: "Color: Pearly Grey (Normal)",
          options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
        },
        {
          type: "radio",
          name: "left_tm_position",
          label: "Position",
          options: [
            { label: "Neutral", value: "neutral" },
            { label: "Bulging", value: "bulging" },
            { label: "Retracted", value: "retracted" }
          ]
        },
        ...["handle_malleus", "cone_light", "perforation_scarring"].flatMap(item => [
          {
            type: "radio",
            name: `left_tm_${item}`,
            label: item.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()),
            options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]
          },
          {
            type: "textarea",
            name: `left_tm_${item}_notes`,
            label: `Elaboration for ${item.replace("_", " ")} (Left Ear)`,
            showIf: {
              field: `left_tm_${item}`,
              equals: "yes"
            }
          }
        ])
      ]
    },

    /* =====================================================
       HEARING TEST
    ===================================================== */
    {
      title: "Hearing Test",
      showIf: { field: "ear_status", equals: "impaired" },
      fields: [
        {
          type: "radio",
          name: "right_whisper_test",
          label: "Right Ear – Whisper Test",
          options: [
            { label: "Passed", value: "passed" },
            { label: "Failed", value: "failed" }
          ]
        },
        {
          type: "radio",
          name: "left_whisper_test",
          label: "Left Ear – Whisper Test",
          options: [
            { label: "Passed", value: "passed" },
            { label: "Failed", value: "failed" }
          ]
        },
        {
          type: "radio",
          name: "right_dix_hallpike",
          label: "Right Ear – Dix-Hallpike Test",
          options: [
            { label: "Positive", value: "positive" },
            { label: "Negative", value: "negative" }
          ]
        },
        {
          type: "radio",
          name: "left_dix_hallpike",
          label: "Left Ear – Dix-Hallpike Test",
          options: [
            { label: "Positive", value: "positive" },
            { label: "Negative", value: "negative" }
          ]
        }
      ]
    },

    /* =====================================================
       PLAN
    ===================================================== */
    {
      title: "Plan",
      showIf: { field: "ear_status", equals: "impaired" },
      fields: [
         {
            type: "textarea",
            name: `hearing_plan`,
            label: `For further evaluation by Audiologist`,
           
          },
            {
            type: "textarea",
            name: `Others`,
            label: `Others`,
           
          }
      ]
    }
  ]
};


  return (
    <CommonFormBuilder
      schema={HEARING_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
    >
    
    </CommonFormBuilder>
  );
}
