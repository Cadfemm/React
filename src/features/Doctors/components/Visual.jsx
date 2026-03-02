import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder"


export default function VisualAssessment() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("Visual Assessment Data:", values);
    }
  };
  const yesNo = [
  { label: "YES", value: "YES" },
  { label: "NO", value: "NO" }
];
 const VISUAL_SCHEMA ={
  title: "Vision Assessment",

  sections: [

    /* =====================================================
       VISION STATUS
    ===================================================== */
    {
      title: "Vision Issue",
      fields: [
        {
          type: "radio",
          name: "vision_status",
          label: "Vision",
          options: [
            { label: "Intact", value: "intact" },
            { label: "Impaired", value: "impaired" }
          ]
        },

        /* ================================
           b210 VISION ISSUE
        ================================= */
        {
          type: "multi-select-dropdown",
          name: "vision_issues",
          label: "Vision Issue",
          showIf: { field: "vision_status", equals: "impaired" },
          options: [
            { label: "No issue", value: "no_issue" },
            { label: "Eye pain", value: "eye_pain" },
            { label: "Redness or swelling", value: "redness_swelling" },
            { label: "Blurring of vision", value: "blurred_vision" },
            { label: "Dry eye", value: "dry_eye" },
            { label: "Flashes and floaters", value: "flashes_floaters" },
            { label: "Near-sightedness (Myopia)", value: "myopia" },
            { label: "Far-sightedness (Hyperopia)", value: "hyperopia" },
            { label: "Vision loss", value: "vision_loss" },
            { label: "Colour blindness", value: "colour_blindness" },
            { label: "Ptosis", value: "ptosis" },
            { label: "Proptosis", value: "proptosis" },
            { label: "Foreign body", value: "foreign_body" }
          ]
        },

        /* Dynamic Elaboration (Like Hearing) */
        ...[
          "eye_pain",
          "redness_swelling",
          "blurred_vision",
          "dry_eye",
          "flashes_floaters",
          "myopia",
          "hyperopia",
          "vision_loss",
          "colour_blindness",
          "ptosis",
          "proptosis",
          "foreign_body"
        ].map(issue => ({
          type: "textarea",
          name: `vision_issue_${issue}_notes`,
          label: `Elaboration – ${issue.replace(/_/g, " ")}`,
          showIf: {
            field: "vision_issues",
            includes: issue
          }
        }))
      ]
    },

    /* =====================================================
       USE OF VISUAL AID
    ===================================================== */
    {
      title: "Use of Visual Aid",
      showIf: { field: "vision_status", equals: "impaired" },
      fields: [
        {
          type: "multi-select-dropdown",
          name: "visual_aid_use",
          label: "Use of visual aid",
          options: [
            { label: "No", value: "no" },
            { label: "Spectacles", value: "spectacles" },
            { label: "Contact lens", value: "contact_lens" },
            { label: "Others", value: "other" }
          ]
        },
        {
          type: "input",
          name: "visual_aid_other",
          label: "Other (Specify)",
          showIf: { field: "visual_aid_use", includes: "other" }
        }
      ]
    },

    /* =====================================================
       VISUAL ACUITY & FIELD
    ===================================================== */
{
  title: "Visual Examination",
  showIf: { field: "vision_status", equals: "impaired" },
  fields: [

    /* =========================
       VISUAL ACUITY – RIGHT
    ========================== */
    {
      type: "single-select",
      name: "right_visual_acuity",
      label: "Visual Acuity – Right Eye",
      options: [
        { label: "Snellen Chart", value: "snellen" },
        { label: "Counting Finger", value: "counting_finger" },
        { label: "Hand Movement", value: "hand_movement" },
        { label: "Perception of Light", value: "pol" },
        { label: "Blind", value: "blind" }
      ]
    },
    {
      type: "textarea",
      name: "right_visual_acuity_notes",
      label: "Elaboration – Right Eye",
      showIf: {
        field: "right_visual_acuity",
        exists: true
      }
    },

    /* =========================
       VISUAL ACUITY – LEFT
    ========================== */
    {
      type: "single-select",
      name: "left_visual_acuity",
      label: "Visual Acuity – Left Eye",
      options: [
        { label: "Snellen Chart", value: "snellen" },
        { label: "Counting Finger", value: "counting_finger" },
        { label: "Hand Movement", value: "hand_movement" },
        { label: "Perception of Light", value: "pol" },
        { label: "Blind", value: "blind" }
      ]
    },
    {
      type: "textarea",
      name: "left_visual_acuity_notes",
      label: "Elaboration – Left Eye",
      showIf: {
        field: "left_visual_acuity",
        exists: true
      }
    },

    /* =========================
       VISUAL FIELD – RIGHT
    ========================== */
    {
      type: "single-select",
      name: "right_visual_field",
      label: "Visual Field – Right Eye",
      options: [
        { label: "Intact", value: "intact" },
        { label: "Visual Field Defect", value: "defect" }
      ]
    },
    {
      type: "textarea",
      name: "right_visual_field_notes",
      label: "Elaboration – Right Eye (Visual Field)",
      showIf: {
        field: "right_visual_field",
        exists: true
      }
    },

    /* =========================
       VISUAL FIELD – LEFT
    ========================== */
    {
      type: "single-select",
      name: "left_visual_field",
      label: "Visual Field – Left Eye",
      options: [
        { label: "Intact", value: "intact" },
        { label: "Visual Field Defect", value: "defect" }
      ]
    },
    {
      type: "textarea",
      name: "left_visual_field_notes",
      label: "Elaboration – Left Eye (Visual Field)",
      showIf: {
        field: "left_visual_field",
        exists: true
      }
    }

    
  ]
},
{
  title: "Pupil & Ocular Examination",
  showIf: { field: "vision_status", equals: "impaired" },
  fields: [

{
  type: "row",
  fields: [
    {
      type: "single-select",
      name: "right_pupil_size",
      label: "Pupil Size (mm) – Right Eye",
      options: [1,2,3,4,5,6,7,8,9].map(v => ({
        label: v.toString() + " mm" ,
        value: v
      }))
    },
    {
      type: "single-select",
      name: "left_pupil_size",
      label: "Pupil Size (mm) – Left Eye",
      options: [1,2,3,4,5,6,7,8,9].map(v => ({
        label: v.toString() + " mm" ,
        value: v
      }))
    }
  ]
},

    /* =========================
       DIRECT PUPILLARY REFLEX (Yes/No → radio)
    ========================== */
    {
      type: "radio",
      name: "right_direct_reflex",
      label: "Direct Pupillary Reflex – Right Eye",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      type: "textarea",
      name: "right_direct_reflex_notes",
      label: "Elaboration – Right Eye",
      showIf: { field: "right_direct_reflex", equals: "yes" }
    },

    {
      type: "radio",
      name: "left_direct_reflex",
      label: "Direct Pupillary Reflex – Left Eye",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      type: "textarea",
      name: "left_direct_reflex_notes",
      label: "Elaboration – Left Eye",
      showIf: { field: "left_direct_reflex", equals: "yes" }
    },

    /* =========================
       INDIRECT PUPILLARY REFLEX
    ========================== */
    {
      type: "radio",
      name: "right_indirect_reflex",
      label: "Indirect Pupillary Reflex – Right Eye",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      type: "textarea",
      name: "right_indirect_reflex_notes",
      label: "Elaboration – Right Eye",
      showIf: { field: "right_indirect_reflex", equals: "yes" }
    },

    {
      type: "radio",
      name: "left_indirect_reflex",
      label: "Indirect Pupillary Reflex – Left Eye",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      type: "textarea",
      name: "left_indirect_reflex_notes",
      label: "Elaboration – Left Eye",
      showIf: { field: "left_indirect_reflex", equals: "yes" }
    },

    /* =========================
       RAPD (2 options → radio)
    ========================== */
    {
      type: "radio",
      name: "right_rapd",
      label: "Defects (RAPD) – Right Eye",
      options: [
        { label: "Positive", value: "positive" },
        { label: "Negative (Normal)", value: "negative" }
      ]
    },

    {
      type: "radio",
      name: "left_rapd",
      label: "Defects (RAPD) – Left Eye",
      options: [
        { label: "Positive", value: "positive" },
        { label: "Negative (Normal)", value: "negative" }
      ]
    },

    /* =========================
       EYE MOVEMENT (EOM)
    ========================== */
    {
      type: "radio",
      name: "right_eom",
      label: "Eye Movement (EOM) – Right Eye",
      options: [
        { label: "Full", value: "full" },
        { label: "Limited", value: "limited" }
      ]
    },
    {
      type: "textarea",
      name: "right_eom_notes",
      label: "Elaboration – Right Eye",
      showIf: { field: "right_eom", equals: "limited" }
    },

    {
      type: "radio",
      name: "left_eom",
      label: "Eye Movement (EOM) – Left Eye",
      options: [
        { label: "Full", value: "full" },
        { label: "Limited", value: "limited" }
      ]
    },
    {
      type: "textarea",
      name: "left_eom_notes",
      label: "Elaboration – Left Eye",
      showIf: { field: "left_eom", equals: "limited" }
    },

    /* =========================
       ACCOMMODATION REFLEX
    ========================== */
    {
      type: "radio",
      name: "right_accommodation",
      label: "Accommodation Reflex – Right Eye",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      type: "textarea",
      name: "right_accommodation_notes",
      label: "Elaboration – Right Eye",
      showIf: { field: "right_accommodation", equals: "yes" }
    },

    {
      type: "radio",
      name: "left_accommodation",
      label: "Accommodation Reflex – Left Eye",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      type: "textarea",
      name: "left_accommodation_notes",
      label: "Elaboration – Left Eye",
      showIf: { field: "left_accommodation", equals: "yes" }
    },

    /* =========================
       DIPLOPIA (More than 2 → single-select)
    ========================== */
    {
      type: "radio",
      name: "right_diplopia",
      label: "Diplopia – Right Eye",
      options: [
        { label: "Monocular", value: "monocular" },
        { label: "Binocular", value: "binocular" }
      ]
    },
    {
      type: "radio",
      name: "left_diplopia",
      label: "Diplopia – Left Eye",
      options: [
        { label: "Monocular", value: "monocular" },
        { label: "Binocular", value: "binocular" }
      ]
    },

    /* =========================
       NYSTAGMUS
    ========================== */
    {
      type: "radio",
      name: "right_nystagmus",
      label: "Nystagmus – Right Eye",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      type: "single-select",
      name: "right_nystagmus_type",
      label: "Type – Right Eye",
      options: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
        { label: "Rotary (Torsional)", value: "torsional" },
        { label: "Mixed", value: "mixed" }
      ],
      showIf: { field: "right_nystagmus", equals: "yes" }
    },

    {
      type: "radio",
      name: "left_nystagmus",
      label: "Nystagmus – Left Eye",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ]
    },
    {
      type: "single-select",
      name: "left_nystagmus_type",
      label: "Type – Left Eye",
      options: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
        { label: "Rotary (Torsional)", value: "torsional" },
        { label: "Mixed", value: "mixed" }
      ],
      showIf: { field: "left_nystagmus", equals: "yes" }
    },

    /* =========================
       FUNDOSCOPY
    ========================== */
    {
      type: "textarea",
      name: "fundoscopy_findings",
      label: "Fundoscopy examination finding"
    }

  ]
},
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
      schema={VISUAL_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    >
    </CommonFormBuilder>
  );
}
