import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder"


export default function VisualAssessment() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    // If "No issue" is selected in Vision Issue, clear all other selections
    if (name === "vision_issues") {
      const next = Array.isArray(value) ? value : [];
      const hasNoIssue = next.includes("no_issue");
      const sanitized = hasNoIssue ? ["no_issue"] : next.filter(v => v !== "no_issue");
      setValues(prev => ({
        ...prev,
        [name]: sanitized,
        ...(hasNoIssue ? { vision_issues_notes: "" } : null)
      }));
      return;
    }

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
const VISUAL_SECTIONS = [

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

        /* Single Specify field for all selected issues */
        {
          type: "input",
          name: "vision_issues_notes",
          label: "Specify",
          showIf: { field: "vision_issues", notEmpty: true }
        }
      ]
    },

    /* =====================================================
       USE OF VISUAL AID
    ===================================================== */
    {
      title: "",
      showIf: { field: "vision_status", equals: "impaired" },
      fields: [
        {
          type: "checkbox-group",
          name: "visual_aid_use",
          label: "Use of Visual Aid",
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
  title: "",
  showIf: { field: "vision_status", equals: "impaired" },
  fields: [

    /* =========================
       VISUAL ACUITY – RIGHT
    ========================== */
    {
      type: "row",
      fields: [
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
        }
      ]
    },
    {
      type: "row",
      fields: [
        {
          type: "input",
          name: "right_visual_acuity_notes",
          label: "Elaboration – Right Eye",
          showIf: {
            field: "right_visual_acuity",
            exists: true
          }
        },
        {
          type: "input",
          name: "left_visual_acuity_notes",
          label: "Elaboration – Left Eye",
          showIf: {
            field: "left_visual_acuity",
            exists: true
          }
        }
      ]
    },

    /* =========================
       VISUAL ACUITY – LEFT
    ========================== */
    /* =========================
       VISUAL FIELD – RIGHT
    ========================== */
    {
      type: "row",
      fields: [
        {
          type: "radio",
          name: "right_visual_field",
          label: "Visual Field – Right Eye",
          options: [
            { label: "Intact", value: "intact" },
            { label: "Visual Field Defect", value: "defect" }
          ]
        },
        {
          type: "radio",
          name: "left_visual_field",
          label: "Visual Field – Left Eye",
          options: [
            { label: "Intact", value: "intact" },
            { label: "Visual Field Defect", value: "defect" }
          ]
        }
      ]
    },
    {
      type: "row",
      fields: [
        {
          type: "input",
          name: "right_visual_field_notes",
          label: "Elaboration – Right Eye (Visual Field)",
          showIf: {
            field: "right_visual_field",
            equals: "defect"
          }
        },
        {
          type: "input",
          name: "left_visual_field_notes",
          label: "Elaboration – Left Eye (Visual Field)",
          showIf: {
            field: "left_visual_field",
            equals: "defect"
          }
        },

      ]
    } ,
    {
    type: "visual-field",
    name: "left_visual_field_map",
    label: "Eye image",
  },
  ]
},

{
  title: "",
  showIf: { field: "vision_status", equals: "impaired" },
  fields: [
    {
      type: "refraction-12col",
      name: "ocular_exam_table",
      cornerLabel: "",
      showColumnHeaders: false,
      groups: [
        {
          label: "Right Eye",
          columns: [{ key: "Value" }]
        },
        {
          label: "Left Eye",
          columns: [{ key: "Value" }]
        }
      ],
      rows: [
        {
          label: "Pupil Size (mm)",
          value: "pupil_size",
          columns: [
            { type: "select", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
            { type: "select", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] }
          ]
        },
        {
          label: "Direct pupillary reflex",
          value: "direct_pupillary_reflex",
          columns: [
            { type: "select", options: ["Yes", "No"] },
            { type: "select", options: ["Yes", "No"] }
          ]
        },
        {
          label: "Indirect pupillary reflex",
          value: "indirect_pupillary_reflex",
          columns: [
            { type: "select", options: ["Yes", "No"] },
            { type: "select", options: ["Yes", "No"] }
          ]
        },
        {
          label: "Pupillary Defects",
          value: "pupillary_defects",
          columns: [
            { type: "select", options: ["Positive", "Negative (Normal)"] },
            { type: "select", options: ["Positive", "Negative (Normal)"] }
          ]
        },
        {
          label: "Eye movement (EOM)",
          value: "eye_movement_eom",
          columns: [
            { type: "select", options: ["Full", "Limited"] },
            { type: "select", options: ["Full", "Limited"] }
          ]
        },
        {
          label: "EOM - Specify",
          value: "eye_movement_eom_notes",
          showIf: {
            or: [
              { field: "ocular_exam_table_eye_movement_eom_0", equals: "Limited" },
              { field: "ocular_exam_table_eye_movement_eom_1", equals: "Limited" }
            ]
          },
          columns: [{ type: "input" }, { type: "input" }]
        },
        {
          label: "Accomodation reflex",
          value: "accomodation_reflex",
          columns: [
            { type: "select", options: ["Yes", "No"] },
            { type: "select", options: ["Yes", "No"] }
          ]
        },
        {
          label: "Diplopia",
          value: "diplopia",
          columns: [
            { type: "select", options: ["Nil", "Monocular", "Binocular"] },
            { type: "select", options: ["Nil", "Monocular", "Binocular"] }
          ]
        },
        {
          label: "Nystagmus",
          value: "nystagmus",
          columns: [
            { type: "select", options: ["Yes", "No"] },
            { type: "select", options: ["Yes", "No"] }
          ]
        },
        {
          label: "Nystagmus Type",
          value: "nystagmus_type",
          showIf: {
            or: [
              { field: "ocular_exam_table_nystagmus_0", equals: "Yes" },
              { field: "ocular_exam_table_nystagmus_1", equals: "Yes" }
            ]
          },
          columns: [
            { type: "select", options: ["Horizontal", "Vertical", "Rotary (Torsional)", "Mixed"] },
            { type: "select", options: ["Horizontal", "Vertical", "Rotary (Torsional)", "Mixed"] }
          ]
        },
        {
          label: "Fundoscopy examination finding (if applicable)",
          value: "fundoscopy",
          columns: [{ type: "input" }, { type: "input" }]
        }
      ]
    }

  ]
},
{
  title: "Goals",
  showIf: { field: "vision_status", equals: "impaired" },
  fields: [
    {
      type: "textarea",
      name: "vision_goals",
      placeholder: "Enter goals"
    }
  ]
},
{
      title: "Plan",
      showIf: { field: "vision_status", equals: "impaired" },
      fields: [
        {
          type: "checkbox-group",
          name: "vision_plan",
          // label: "Plan",
          options: [
            {
              label: "For further evaluation by Optometrist - (notify Optometrist)",
              value: "optometrist_evaluation"
            },
            { label: "Others", value: "others" }
          ]
        },
        {
          type: "input",
          name: "vision_plan_others",
          label: "Others (free text)",
          showIf: { field: "vision_plan", includes: "others" }
        }
      ]
    }
];

const combineShowIf = (sectionShowIf, fieldShowIf) => {
  if (!sectionShowIf) return fieldShowIf;
  if (!fieldShowIf) return sectionShowIf;
  return { ...sectionShowIf, and: fieldShowIf };
};

const VISUAL_SCHEMA = {
  title: "Vision Assessment",
  sections: [
    {
      title: null,
      fields: VISUAL_SECTIONS.flatMap((section) => {
        const sectionTitleFields = section.title
          ? [{ type: "subheading", label: section.title, showIf: section.showIf }]
          : [];

        const sectionFields = (section.fields || []).map((f) => ({
          ...f,
          showIf: combineShowIf(section.showIf, f.showIf)
        }));

        return [...sectionTitleFields, ...sectionFields];
      })
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
