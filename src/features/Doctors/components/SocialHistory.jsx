import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function SocialHistory() {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
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
              { name: "home_location_state_district", label: "Location (state and district)", type: "input" },
              { name: "home_household_members", label: "Household member(s)", type: "input" }
            ]
          },
          {
            type: "row",
            fields: [
              { name: "home_accommodation_type", label: "Type of accommodation (house, flat, care home, etc.)", type: "input" },
              { name: "home_stairs_mobility_issues", label: "Stairs or mobility issues at home", type: "input" }
            ]
          }
        ]
      },
      {
        title: "Occupation / Education",
        fields: [
          {
            type: "row",
            fields: [
              { name: "occupation_education_level", label: "Education level", type: "input" },
              { name: "occupation_previous_job", label: "Previous job", type: "input" },
            ]
          },
          {
            type: "row",
            fields: [
              { name: "occupation_current_job", label: "Current job", type: "input" },
              { name: "occupation_placeholder", label: "", type: "input", readOnly: true }
            ]
          }
        ]
      },
      {
        title: "Family / Marital Status",
        fields: [
          {
            name: "family_marital_status",
            label: "Marital status",
            type: "radio",
            options: ["single", "married", "divorced", "widowed"]
          },
          {
            type: "row",
            fields: [
              { name: "family_children_dependents", label: "Children or dependents", type: "input" },
              { name: "family_main_support", label: "Main support person", type: "input" },
            ]
          },
          {
            name: "family_medical_history",
            label: "Family medical history",
            type: "radio",
            options: ["stroke", "heart attack", "seizure", "others"]
          },
          {
            name: "family_medical_history_others",
            label: "Family medical history - Others",
            type: "input",
            showIf: { field: "family_medical_history", equals: "others" }
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
            name: "smoking_cigarette",
            label: "Cigarette",
            type: "radio",
            options: ["yes", "no"]
          },
          {
            name: "smoking_vape",
            label: "Vape / Electronic Cigarette",
            type: "radio",
            options: ["yes", "no"]
          },
          {
            type: "row",
            showIf: {
              or: [
                { field: "smoking_cigarette", equals: "yes" },
                { field: "smoking_vape", equals: "yes" }
              ]
            },
            fields: [
              { name: "smoking_sticks_packs_per_day", label: "Sticks/Packs per day", type: "input" },
              { name: "smoking_duration_years", label: "Duration (in years)", type: "input" }
            ]
          },
          {
            name: "smoking_quit_interest",
            label: "Interested in quitting?",
            type: "radio",
            options: ["yes", "no"],
            showIf: {
              or: [
                { field: "smoking_cigarette", equals: "yes" },
                { field: "smoking_vape", equals: "yes" }
              ]
            }
          },

          {
            type: "subheading",
            label: "Alcoholic Drinker"
          },
          {
            name: "alcohol_status",
            label: "Alcoholic Drinker",
            type: "radio",
            options: ["yes", "no"]
          },
          {
            type: "row",
            fields: [
              { name: "alcohol_type", label: "Type of alcoholic beverage", type: "input" },
              { name: "alcohol_quantity", label: "Quantity", type: "input" },
            ],
            showIf: { field: "alcohol_status", equals: "yes" },
          },
          {
            type: "row",
            fields: [
              { name: "alcohol_frequency", label: "Frequency", type: "input" },
              { name: "alcohol_cage_questions", label: "CAGE questions (if appropriate)", type: "input" },
            ],
            showIf: { field: "alcohol_status", equals: "yes" },
          },
          {
            name: "alcohol_cage_radio",
            label: "Cut down, Annoyed, Guilty, Eye-opener",
            type: "radio",
            options: ["yes", "no"],
            showIf: { field: "alcohol_status", equals: "yes" },
          },

          {
            type: "subheading",
            label: "Recreational / Illicit Drugs Use"
          },
          {
            name: "drug_use",
            label: "Recreational / Illicit Drugs Use",
            type: "radio",
            options: ["yes", "no"]
          },
          {
            type: "row",
            fields: [
              { name: "drug_types", label: "Types of drug", type: "input" },
              { name: "drug_quantity", label: "Quantity", type: "input" },
            ],
            showIf: { field: "drug_use", equals: "yes" }
          },
          {
            type: "row",
            fields: [
              { name: "drug_frequency", label: "Frequency", type: "input" },
              { name: "drug_additional_info", label: "Additional info", type: "textarea" },
            ],
            showIf: { field: "drug_use", equals: "yes" }
          },

          {
            type: "subheading",
            label: "Financial and Social Support"
          },
          {
            name: "financial_difficulties",
            label: "Financial difficulties",
            type: "radio",
            options: ["yes", "no"]
          },
          {
            name: "financial_difficulties_details",
            label: "Financial difficulties – details",
            type: "textarea",
            showIf: { field: "financial_difficulties", equals: "yes" },
          },
          {
            name: "benefits_pension",
            label: "Benefits or pension receive",
            type: "radio",
            options: ["yes", "no"]
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
      submitted={false}
    />
  );
}

