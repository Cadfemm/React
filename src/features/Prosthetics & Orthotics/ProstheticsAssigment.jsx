
import React, { useState } from "react";
import CommonFormBuilder from "./CommonFormBuilder";

 const ProstheticsInitialAssessmentSchema = {
  title: "Prosthetics Initial Assessment",
  enableLanguageToggle: false,

  sections: [
    /* ===================== ADMIN / HEADER ===================== */
    {
      title: "Administrative Details",
      fields: [
        {
          type: "radio",
          name: "prosthesis_restoration",
          label: "Prosthesis Restoration",
          options: [
            { label: "New", value: "new" },
            { label: "Repair", value: "repair" }
          ],
          validation: { required: true }
        },
        {
          type: "radio",
          name: "inspire_scheme",
          label: "INSPIRE Scheme",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },
        {
          type: "input",
          name: "supplier_name",
          label: "Supplier Name",
          showIf: { field: "inspire_scheme", equals: "yes" }
        },
        {
          type: "date",
          name: "po_date",
          label: "PO Date"
        }
      ]
    },

    /* ===================== SUBJECTIVE ===================== */
    {
      title: "Subjective (Patient Reported)",
      fields: [
        {
          type: "textarea",
          name: "chief_complaint",
          label: "Chief Complaint"
        },
        {
          type: "textarea",
          name: "history_present_illness",
          label: "History of Present Illness"
        },
        {
          type: "textarea",
          name: "stump_pain_description",
          label: "Stump Pain Description"
        },
        {
          type: "input",
          name: "pain_score",
          label: "Pain Score (1–10)"
        }
      ]
    },

    /* ===================== FUNCTIONAL ===================== */
    {
      title: "Functional Classification",
      fields: [
        {
          type: "radio",
          name: "k_level",
          label: "K-Level (PT Input)",
          options: [
            { label: "K0", value: "k0" },
            { label: "K1", value: "k1" },
            { label: "K2", value: "k2" },
            { label: "K3", value: "k3" },
            { label: "K4", value: "k4" }
          ]
        }
      ]
    },

    /* ===================== OBJECTIVE ===================== */
    {
      title: "Objective Assessment",
      fields: [
        {
          type: "row",
          fields: [
            { type: "input", name: "grip_strength_right", label: "Grip Strength Right (kg)" },
            { type: "input", name: "grip_strength_left", label: "Grip Strength Left (kg)" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "input", name: "mmt_ll_right", label: "MMT Lower Limb Right (/5)" },
            { type: "input", name: "mmt_ll_left", label: "MMT Lower Limb Left (/5)" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "input", name: "mmt_ul_right", label: "MMT Upper Limb Right (/5)" },
            { type: "input", name: "mmt_ul_left", label: "MMT Upper Limb Left (/5)" }
          ]
        }
      ]
    },

    /* ===================== AMPUTATION DETAILS ===================== */
    {
      title: "Residual Limb Details",
      fields: [
        {
          type: "checkbox-group",
          name: "amputation_level_lower",
          label: "Lower Limb",
          options: [
            { label: "Above Knee (AK)", value: "AK" },
            { label: "Below Knee (BK)", value: "BK" },
            { label: "Hip Disarticulation", value: "hip" },
            { label: "Rays Amputation", value: "rays" }
          ]
        },
        {
          type: "checkbox-group",
          name: "amputation_level_upper",
          label: "Upper Limb",
          options: [
            { label: "Above Elbow (AE)", value: "AE" },
            { label: "Below Elbow (BE)", value: "BE" },
            { label: "Shoulder Disarticulation", value: "shoulder" }
          ]
        },
        {
          type: "date",
          name: "date_of_amputation",
          label: "Date of Amputation"
        },
        {
          type: "checkbox-group",
          name: "cause_of_amputation",
          label: "Cause",
          options: [
            { label: "Trauma", value: "trauma" },
            { label: "Vascular", value: "vascular" },
            { label: "Infection", value: "infection" },
            { label: "Tumour", value: "tumour" },
            { label: "Congenital", value: "congenital" }
          ]
        }
      ]
    },

    /* ===================== MEASUREMENTS ===================== */
    {
      title: "Residual Limb Measurements",
      fields: [
        {
          type: "grid-table-flat",
          name: "circumference",
          headers: ["cm"],
          rows: [
            { key: "proximal", label: "Proximal" },
            { key: "middle", label: "Middle" },
            { key: "distal", label: "Distal" }
          ]
        },
        {
          type: "row",
          fields: [
            { type: "input", name: "residual_length", label: "Residual Limb Length (cm)" },
            { type: "input", name: "contralateral_reference", label: "Contralateral Limb Reference (cm)" }
          ]
        }
      ]
    },

    /* ===================== SKIN & STUMP ===================== */
    {
      title: "Skin Integrity & Stump Condition",
      fields: [
        {
          type: "checkbox-group",
          name: "skin_condition",
          label: "Skin Condition",
          options: [
            { label: "Intact", value: "intact" },
            { label: "Dry", value: "dry" },
            { label: "Fragile", value: "fragile" },
            { label: "Wound", value: "wound" }
          ]
        },
        {
          type: "checkbox-group",
          name: "edema",
          label: "Edema",
          options: [
            { label: "None", value: "none" },
            { label: "Mild", value: "mild" },
            { label: "Moderate", value: "moderate" },
            { label: "Severe", value: "severe" }
          ]
        },
        {
          type: "radio",
          name: "phantom_pain",
          label: "Phantom Sensation / Pain",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        }
      ]
    },

    /* ===================== CASTING ===================== */
    {
      title: "Casting Readiness",
      fields: [
        {
          type: "radio",
          name: "ready_for_casting",
          label: "Ready for Casting",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },
        {
          type: "textarea",
          name: "casting_plan",
          label: "If No – Plan / Reason",
          showIf: { field: "ready_for_casting", equals: "no" }
        },
        {
          type: "date",
          name: "next_review_date",
          label: "Next Review Date"
        }
      ]
    }
  ]
};
/* ================= COMPONENT ================= */

export default function ProstheticsInitialAssessment({ onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleAction = (action) => {
    switch (action) {
      case "back":
        onBack?.();
        break;

      case "clear":
        setValues({});
        setSubmitted(false);
        break;

      case "save":
        setSubmitted(true);
        console.log("PROSTHETICS ASSESSMENT DATA:", values);
        // 🔹 API call here
        break;

      default:
        break;
    }
  };

  return (
    <CommonFormBuilder
      schema={ProstheticsInitialAssessmentSchema}
      values={values}
      onChange={handleChange}
      submitted={submitted}
      onAction={handleAction}
    />
  );
}
