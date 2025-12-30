import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";



export default function SwallowingAndSpeechAssessment() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) =>
    setValues(v => ({ ...v, [name]: value }));

  const SCHEMA = {
    title: "Swallowing and Speech Assessment",
    sections: [
      {
        title: "SWALLOWING",
        fields: [
          {
            type: "radio",
            name: "swallowing_difficulty",
            label: "Is there any swallowing difficulty?",
            options: yesNo
          }
        ]
      },

      /* ===== PROCEED ONLY IF YES ===== */
      {
        title: "",
        showIf: { field: "swallowing_difficulty", equals: "Yes" },
        fields: [
          {
            type: "single-select",
            name: "onset",
            label: "Onset",
            options: select([
              "Sudden onset",
              "Gradual onset"
            ])
          },

          /* ---- PROGRESSION (SEPARATE QUESTION) ---- */
          {
            type: "single-select",
            name: "progression",
            label: "Progression",
             options: select([
              "Sudden onset",
              "Gradual onset"
            ])
          },

          /* ---- FOOD / LIQUID DIFFICULTIES (MULTISELECT) ---- */
          {
            type: "checkbox-group",
            name: "food_liquid_difficulty",
            label: "Food / Liquid Difficulties",
            options: [
              { label: "Thin liquids", value: "Thin liquids" },
              { label: "Thick liquids", value: "Thick liquids" },
              { label: "Solids", value: "Solids" },
              { label: "All textures", value: "All textures" }
            ]
          },
          {
            type: "single-select",
            name: "dietary_modifications",
            label: "Dietary Modifications",
            options: select([
              "Normal diet",
              "Soft/minced diet",
              "Pureed diet",
              "Thickened liquids",
              "Assisted feeding",
              "Enteral feeding (NGT/PEG)"
            ])
          },
          {
            type: "single-select",
            name: "symptoms_during_meals",
            label: "Symptoms During Meals",
            options: select([
              "No symptoms",
              "Mild coughing/throat clearing",
              "Drooling/food spillage",
              "Wet or gurgly voice",
              "Nasal regurgitation",
              "Fatigue/prolonged mealtime",
              "Choking/aspiration",
              "Avoidance of eating"
            ])
          }
        ]
      },

      {
        title: "SPEECH AND LANGUAGE",
        fields: [
          { type: "radio", name: "voice_clear", label: "Voice functions – Clear", options: yesNo },
          { type: "radio", name: "voice_hoarseness", label: "Hoarseness", options: yesNo },
          { type: "radio", name: "voice_aphonia", label: "Aphonia", options: yesNo },

          { type: "radio", name: "articulation_dysarthria", label: "Articulation functions – Dysarthria", options: yesNo },
          { type: "radio", name: "articulation_repetition", label: "Repetition", options: yesNo },

          { type: "radio", name: "fluency_smoothness", label: "Fluency of speech – Smoothness", options: yesNo },
          { type: "radio", name: "fluency_continuity", label: "Continuity", options: yesNo },
          {
            type: "single-select",
            name: "fluency_rate",
            label: "Rate",
            options: select(["APPROPRIATE"])
          },
          {
            type: "textarea",
            name: "fluency_others",
            label: "Others"
          },

          { type: "radio", name: "language_comprehension", label: "Language comprehension", options: yesNo },
          { type: "radio", name: "naming_through_speech", label: "Naming through speech", options: yesNo },
          { type: "radio", name: "alternative_voice", label: "Alternative voice/speech functions", options: yesNo }
        ]
      },

      /* ================= ACTIVITIES & PARTICIPATION ================= */
      {
        title: "2) Activities and Participation",
        fields: [
          { type: "radio", name: "communicating_receiving", label: "Communicating – Receiving", options: yesNo },
          { type: "radio", name: "speaking", label: "Speaking", options: yesNo },
          { type: "radio", name: "producing_sound", label: "Producing meaningful sound", options: yesNo },
          { type: "radio", name: "simple_message", label: "Producing simple message", options: yesNo },
          { type: "radio", name: "complex_message", label: "Producing complex message", options: yesNo }
        ]
      },

      /* ================= ENVIRONMENTAL FACTORS ================= */
      {
        title: "3) Environmental Factors",
        fields: [
          {
            type: "radio",
            name: "assistive_device",
            label: "Assistive device and technology",
            options: yesNo
          },
          {
            type: "textarea",
            name: "environment_notes",
            label: "Please specify"
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
    >
     
    </CommonFormBuilder>
  );
}

/* =========================================================
   HELPERS
========================================================= */

const yesNo = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" }
];

const select = (arr) =>
  arr.map(v => ({ label: v, value: v }));

const saveBtn = {
  marginTop: 20,
  padding: "10px 18px",
  background: "#111827",
  color: "#fff",
  borderRadius: 8,
  border: "none",
  fontWeight: 600,
  cursor: "pointer"
};
