import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function SocialHistory() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("Social History Data:", values);
    }
  };

  const SOCIAL_HISTORY_SCHEMA = {
    title: "Social History",
    sections: [
      {
        title: "Home Situation",
        fields: [
          {
            type: "row",
            fields: [
              { name: "home_where_live", label: "Where do you live?", type: "input" },
              { name: "home_who_lives_with", label: "Who lives with you?", type: "input" }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "home_accommodation_type",
                label: "Type of accommodation (house, flat, care home, etc.)",
                type: "input"
              },
              {
                name: "home_stairs_mobility_issues",
                label: "Any stairs or mobility issues at home?",
                type: "input"
              }
            ]
          }
        ]
      },
      {
        title: "Occupation / Education",
        fields: [
          { name: "occupation_current", label: "Current job", type: "input" },
          { name: "occupation_previous", label: "Previous job", type: "input" }
        ]
      },
      {
        title: "Family / Marital Status",
        fields: [
          {
            name: "family_marital_status",
            label: "Marital status",
            type: "radio",
            options: [
              { label: "Single", value: "single" },
              { label: "Married", value: "married" },
              { label: "Divorced", value: "divorced" },
              { label: "Widowed", value: "widowed" }
            ]
          },
          {
            name: "family_children_dependents",
            label: "Any children or dependents?",
            type: "input"
          },
          {
            name: "family_main_support",
            label: "Who is your main support person?",
            type: "input"
          },
          {
            name: "family_medical_history",
            label: "Family medical history (stroke / heart attack / seizure, etc.)",
            type: "textarea"
          }
        ]
      },
      {
        title: "Lifestyle Habits",
        fields: [
          {
            type: "subheading",
            label: "Smoking"
          },
          {
            name: "smoking_status",
            label: "Do you smoke or have you ever smoked?",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "smoking_pack_years",
            label: "How much and for how long? (pack-years)",
            type: "input",
            showIf: { field: "smoking_status", equals: "yes" }
          },
          {
            name: "smoking_quit_interest",
            label: "Interested in quitting?",
            type: "input",
            showIf: { field: "smoking_status", equals: "yes" }
          },

          {
            type: "subheading",
            label: "Alcohol"
          },
          {
            name: "alcohol_status",
            label: "Do you drink alcohol?",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            type: "row",
            fields: [
              { name: "alcohol_type", label: "Type", type: "input" },
              { name: "alcohol_quantity", label: "Quantity", type: "input" },
              { name: "alcohol_frequency", label: "Frequency", type: "input" }
            ],
            showIf: { field: "alcohol_status", equals: "yes" }
          },
          {
            name: "alcohol_cage_note",
            label: "CAGE questions (Cut down, Annoyed, Guilty, Eye-opener) – notes",
            type: "textarea",
            showIf: { field: "alcohol_status", equals: "yes" }
          },

          {
            type: "subheading",
            label: "Drugs"
          },
          {
            name: "drug_use",
            label: "Any recreational or illicit drug use?",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "drug_use_details",
            label: "Drug use details",
            type: "textarea",
            showIf: { field: "drug_use", equals: "yes" }
          },

          {
            type: "subheading",
            label: "Financial and Social Support"
          },
          {
            name: "financial_difficulties",
            label: "Any financial difficulties?",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "financial_difficulties_details",
            label: "Financial difficulties – details",
            type: "textarea",
            showIf: { field: "financial_difficulties", equals: "yes" }
          },
          {
            name: "benefits_pension",
            label: "Receive any benefits or pension?",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "benefits_pension_details",
            label: "Benefits / pension – details",
            type: "textarea",
            showIf: { field: "benefits_pension", equals: "yes" }
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={SOCIAL_HISTORY_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    />
  );
}

