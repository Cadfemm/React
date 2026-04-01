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
        title: "Swallowing",
        fields: [
          {
            type: "radio",
            name: "swallowing_difficulty",
            label: "Swallowing",
            options: swallowingIntactImpaired
          },

          /* ===== PROCEED ONLY IF IMPAIRED ===== */
          {
            name: "current_mode_feeding",
            label: "Current mode of feeding:",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Oral feeding", value: "oral" },
              { label: "Enteral feeding (NGT or PEG)", value: "enteral" },
              { label: "Mixed oral and enteral feeding", value: "mixed" }
            ],
            showIf: { field: "swallowing_difficulty", equals: "Impaired" }
          },

          {
            name: "current_feeding_regime",
            label: "Current feeding regime",
            type: "input",
            showIf: {
              field: "swallowing_difficulty",
              equals: "Impaired",
              and: {
                field: "current_mode_feeding",
                oneOf: ["enteral", "mixed"]
              }
            }
          },

          {
            name: "last_tube_changed_on",
            label: "Last tube changed on",
            type: "date",
            showIf: {
              field: "swallowing_difficulty",
              equals: "Impaired",
              and: {
                field: "current_mode_feeding",
                oneOf: ["enteral", "mixed"]
              }
            }
          },

          /* ================= FEEDING ISSUE ================= */
          {
            name: "feeding_issue",
            label: "Feeding issue",
            type: "radio",
            options: [
              { label: "No issue", value: "no_issue" },
              { label: "Oral feeding", value: "oral_feeding" },
              { label: "Enteral feeding", value: "enteral_feeding" }
            ],
            showIf: { field: "swallowing_difficulty", equals: "Impaired" }
          },

          {
            name: "oral_feeding_issues",
            label: "Oral feeding",
            type: "checkbox-group",
            showIf: {
              field: "swallowing_difficulty",
              equals: "Impaired",
              and: { field: "feeding_issue", equals: "oral_feeding" }
            },
            options: [
              {
                label: "Coughing or throat clearing",
                value: "coughing_throat_clear"
              },
              { label: "Nausea or vomiting", value: "nausea_vomiting" },
              {
                label: "Drooling or food spillage",
                value: "drooling_food_spillage"
              },
              { label: "Wet or gurgly voice", value: "wet_gurgly_voice" },
              {
                label: "Nasal regurgitation",
                value: "nasal_regurgitation"
              },
              { label: "Choking", value: "choking" },
              { label: "Slow eating", value: "slow_eating" }
            ]
          },
          {
            name: "oral_feeding_issue_specify",
            label: "Specify",
            type: "input",
            showIf: {
              field: "swallowing_difficulty",
              equals: "Impaired",
              and: {
                or: [
                  { field: "oral_feeding_issues", includes: "coughing_throat_clear" },
                  { field: "oral_feeding_issues", includes: "nausea_vomiting" },
                  { field: "oral_feeding_issues", includes: "drooling_food_spillage" },
                  { field: "oral_feeding_issues", includes: "wet_gurgly_voice" },
                  { field: "oral_feeding_issues", includes: "nasal_regurgitation" },
                  { field: "oral_feeding_issues", includes: "choking" },
                  { field: "oral_feeding_issues", includes: "slow_eating" }
                ]
              }
            }
          },

          {
            name: "enteral_feeding_issues",
            label: "Enteral feeding",
            type: "checkbox-group",
            showIf: {
              field: "swallowing_difficulty",
              equals: "Impaired",
              and: { field: "feeding_issue", equals: "enteral_feeding" }
            },
            options: [
              { label: "Aspiration", value: "aspiration" },
              { label: "Nausea or vomiting", value: "nausea_vomiting_enteral" },
              { label: "Diarrhoea", value: "diarrhoea" },
              { label: "Constipation", value: "constipation" },
              {
                label: "Abdominal distension or bloating",
                value: "abdominal_distension"
              },
              {
                label: "Coughing or chocking during feeding",
                value: "coughing_choking_during_feeding"
              },
              {
                label: "Skin irritation around the insertion site",
                value: "skin_irritation_insertion_site"
              }
            ]
          },
         {
          name: "enteral_feeding_issue_specify",
          label: "Specify",
          type: "input",
          showIf: {
            field: "swallowing_difficulty",
            equals: "Impaired",
            and: {
              or: [
                { field: "enteral_feeding_issues", includes: "aspiration" },
                { field: "enteral_feeding_issues", includes: "nausea_vomiting_enteral" },
                { field: "enteral_feeding_issues", includes: "diarrhoea" },
                { field: "enteral_feeding_issues", includes: "constipation" },
                { field: "enteral_feeding_issues", includes: "abdominal_distension" },
                { field: "enteral_feeding_issues", includes: "coughing_choking_during_feeding" },
                { field: "enteral_feeding_issues", includes: "skin_irritation_insertion_site" }
              ]
            }
          }
          },

          /* ================= TEXTURES ================= */
          {
            name: "current_food_texture",
            label: "Current food texture:",
            type: "radio",
            showIf: {
              field: "swallowing_difficulty",
              equals: "Impaired",
              and: {
                field: "feeding_issue",
                oneOf: ["oral_feeding", "enteral_feeding"]
              }
            },
            options: [
              { label: "Pureed", value: "pureed" },
              { label: "Minced and moist", value: "minced_moist" },
              { label: "Soft", value: "soft" },
              { label: "Solids", value: "solids" }
            ]
          },
          {
            name: "current_liquid_texture",
            label: "Current liquid texture:",
            type: "radio",
            showIf: {
              field: "swallowing_difficulty",
              equals: "Impaired",
              and: {
                field: "feeding_issue",
                oneOf: ["oral_feeding", "enteral_feeding"]
              }
            },
            options: [
              { label: "Normal", value: "normal" },
              { label: "Modified", value: "modified" }
            ]
          },
          {
            name: "current_liquid_texture_modified_specify",
            label: "Modified liquid texture (Specify)",
            type: "input",
            showIf: {
              field: "swallowing_difficulty",
              equals: "Impaired",
              and: { field: "current_liquid_texture", equals: "modified" }
            }
          },

          /* ================= DIETARY MODIFICATIONS ================= */
          {
            name: "dietary_modifications",
            label: "Dietary Modifications",
            type: "radio",
            labelAbove: true,
            showIf: { field: "swallowing_difficulty", equals: "Impaired" },
            options: [
              { label: "Normal diet", value: "normal_diet" },
              { label: "Soft or minced diet", value: "soft_minced_diet" },
              { label: "Pureed diet", value: "pureed_diet" },
              { label: "Thickened liquids", value: "thickened_liquids" },
              { label: "Assisted feeding", value: "assisted_feeding" }
            ]
          },

          /* ================= OTHER RELATED ISSUES ================= */
          {
            name: "other_related_issues",
            label: "Other related issue",
            type: "checkbox-group",
            showIf: { field: "swallowing_difficulty", equals: "Impaired" },
            options: [
              { label: "Malnutrition", value: "malnutrition" },
              { label: "Dehydration", value: "dehydration" },
              { label: "Weight loss", value: "weight_loss" },
              { label: "Avoidance of eating", value: "avoidance_eating" },
              { label: "Fatigue", value: "fatigue" },
              { label: "History of lung infection", value: "lung_infection_history" }
            ]
          },
          {
          name: "other_related_issue_specify",
          label: "Specify",
          type: "input",
          showIf: {
            field: "swallowing_difficulty",
            equals: "Impaired",
            and: {
              or: [
                { field: "other_related_issues", includes: "malnutrition" },
                { field: "other_related_issues", includes: "dehydration" },
                { field: "other_related_issues", includes: "weight_loss" },
                { field: "other_related_issues", includes: "avoidance_eating" },
                { field: "other_related_issues", includes: "fatigue" },
                { field: "other_related_issues", includes: "lung_infection_history" }
              ]
            }
          }
          },

          /* ================= PREVIOUS PROCEDURES ================= */
          {
            name: "previous_swallowing_procedures",
            label: "Previous swallowing related procedures",
            type: "radio",
            showIf: { field: "swallowing_difficulty", equals: "Impaired" },
            options: [
              { label: "Nil", value: "nil" },
              { label: "FEES", value: "fees" },
              { label: "VFSS", value: "vfss" }
            ]
          },
          {
            name: "fees_date",
            label: "FEES date",
            type: "date",
            showIf: {
              field: "swallowing_difficulty",
              equals: "Impaired",
              and: { field: "previous_swallowing_procedures", equals: "fees" }
            }
          },
          {
            name: "vfss_date",
            label: "VFSS date",
            type: "date",
            showIf: {
              field: "swallowing_difficulty",
              equals: "Impaired",
              and: { field: "previous_swallowing_procedures", equals: "vfss" }
            }
          },

          {
            type: "subheading",
            label: "Goals",
            showIf: { field: "swallowing_difficulty", equals: "Impaired" }
          },
          {
            type: "textarea",
            name: "swallowing_goals",
            placeholder: "Enter goals",
            showIf: { field: "swallowing_difficulty", equals: "Impaired" }
          },

          /* ================= PLAN ================= */
          {
            type: "subheading",
            label: "Plan",
            showIf: { field: "swallowing_difficulty", equals: "Impaired" }
          },
          {
            name: "swallowing_plan",
            // label: "Plan",
            type: "multi-select-dropdown",
            showIf: { field: "swallowing_difficulty", equals: "Impaired" },
            options: [
              {
                label: "For further swallowing evaluation by Speech Therapist",
                value: "speech_therapist_evaluation"
              },
              {
                label: "For bedside swallowing assessment (water test)",
                value: "bedside_water_test"
              },
              {
                label: "For safe swallowing strategy / manoeuvre / posture",
                value: "safe_strategy_posture"
              },
              {
                label: "For nourishing fluids prescription / modification by Dietician",
                value: "dietician_fluids_modification"
              },
              {
                label: "To change Ryle's Tube on the next scheduled due date",
                value: "change_ryles_tube_due_date"
              },
              {
                label: "To monitor input / output chart",
                value: "monitor_io_chart"
              },
              { label: "Others", value: "others" }
            ]
          },
          {
            name: "swallowing_plan_others",
            label: "Others (free text)",
            type: "textarea",
            showIf: {
              field: "swallowing_difficulty",
              equals: "Impaired",
              and: { field: "swallowing_plan", includes: "others" }
            }
          }
        ]
      },

      {
        title: "Speech and Language",
        fields: [
          {
            type: "radio",
            name: "language_speech_intact_impaired",
            label: "Language / Speech",
            options: swallowingIntactImpaired
          },

          /* ================= COMPREHENSION ================= */
          {
            type: "radio",
            name: "language_comprehension",
            label: "Comprehension",
            options: goodPoor,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            name: "language_comprehension_specify",
            label: "Comprehension (Specify)",
            type: "input",
            showIf: {
              field: "language_comprehension",
              equals: "Poor",
              and: { field: "language_speech_intact_impaired", equals: "Impaired" }
            }
          },

          /* ================= FLUENCY ================= */
          {
            type: "radio",
            name: "speech_fluency",
            label: "Fluency",
            options: fluentNonFluent,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            name: "speech_fluency_specify",
            label: "Fluency (Specify)",
            type: "input",
            showIf: {
              field: "speech_fluency",
              equals: "Non fluent",
              and: { field: "language_speech_intact_impaired", equals: "Impaired" }
            }
          },

          /* ================= PARAPHASIA ================= */
          {
            type: "radio",
            name: "speech_paraphasia",
            label: "Paraphasia",
            options: presentAbsent,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            name: "speech_paraphasia_specify",
            label: "Paraphasia (Specify)",
            type: "input",
            showIf: {
              field: "speech_paraphasia",
              equals: "Present",
              and: { field: "language_speech_intact_impaired", equals: "Impaired" }
            }
          },

          /* ================= REPETITION ================= */
          {
            type: "radio",
            name: "speech_repetition",
            label: "Repetition",
            options: goodPoor,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            name: "speech_repetition_specify",
            label: "Repetition (Specify)",
            type: "input",
            showIf: {
              field: "speech_repetition",
              equals: "Poor",
              and: { field: "language_speech_intact_impaired", equals: "Impaired" }
            }
          },

          /* ================= NAMING / READING / WRITING ================= */
          {
            type: "radio",
            name: "naming",
            label: "Naming",
            options: yesNo,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            type: "radio",
            name: "reading",
            label: "Reading",
            options: yesNo,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            type: "radio",
            name: "writing",
            label: "Writing",
            options: yesNo,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },

          /* ================= VOICE FUNCTIONS ================= */
          {
            type: "radio",
            name: "voice_functions",
            label: "Voice functions",
            options: normalImpaired,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            name: "voice_functions_specify",
            label: "Voice functions (Specify)",
            type: "input",
            showIf: {
              field: "voice_functions",
              equals: "Impaired",
              and: { field: "language_speech_intact_impaired", equals: "Impaired" }
            }
          },

          /* ================= ARTICULATION FUNCTIONS ================= */
          {
            type: "radio",
            name: "articulation_functions",
            label: "Articulation functions",
            options: normalImpaired,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            name: "articulation_functions_specify",
            label: "Articulation functions (Specify)",
            type: "input",
            showIf: {
              field: "articulation_functions",
              equals: "Impaired",
              and: { field: "language_speech_intact_impaired", equals: "Impaired" }
            }
          },

          /* ================= COMMUNICATING - RECEIVING ================= */
          {
            type: "radio",
            name: "communication_receiving_able",
            label: "Communicating - Receiving",
            options: ableNotAble,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            type: "radio",
            name: "communicating_receiving_message_type",
            label: "Message type (Receiving)",
            labelAbove: true,
            options: [
              { label: "Spoken message", value: "spoken_message" },
              { label: "Non verbal message", value: "non_verbal_message" },
              { label: "Sign language", value: "sign_language" },
              { label: "Written message", value: "written_message" }
            ],
            showIf: {
              field: "language_speech_intact_impaired",
              equals: "Impaired",
              and: { field: "communication_receiving_able", equals: "Able" }
            }
          },
          {
            name: "communicating_receiving_message_type_specify",
            label: "Specify",
            type: "input",
            showIf: {
              field: "language_speech_intact_impaired",
              equals: "Impaired",
              and: { field: "communication_receiving_able", equals: "Able" }
            }
          },

          /* ================= COMMUNICATING - PRODUCING ================= */
          {
            type: "radio",
            name: "communicating_producing",
            label: "Communicating - Producing",
            options: ableNotAble,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            type: "radio",
            name: "communicating_producing_message_type",
            label: "Message type (Producing)",
            labelAbove: true,
            options: [
              { label: "Speaking", value: "speaking" },
              { label: "Non-speech vocal expression", value: "non_speech_vocal_expression" },
              { label: "Singing", value: "singing" },
              { label: "Non verbal message", value: "non_verbal_message_producing" },
              { label: "Formal sign language", value: "formal_sign_language" },
              { label: "Writing message", value: "writing_message" }
            ],
            showIf: {
              field: "language_speech_intact_impaired",
              equals: "Impaired",
              and: { field: "communicating_producing", equals: "Able" }
            }
          },
          {
            name: "communicating_producing_message_type_specify",
            label: "Specify",
            type: "input",
            showIf: {
              field: "language_speech_intact_impaired",
              equals: "Impaired",
              and: { field: "communicating_producing", equals: "Able" }
            }
          },

          /* ================= ASSISTIVE DEVICE ================= */
          {
            type: "radio",
            name: "communication_assistive_device",
            label: "Use of assistive device and technology for communication",
            options: yesNo,
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            name: "communication_assistive_device_specify",
            label: "Specify",
            type: "input",
            showIf: {
              field: "communication_assistive_device",
              equals: "Yes",
              and: { field: "language_speech_intact_impaired", equals: "Impaired" }
            }
          },
          {
            type: "subheading",
            label: "Goals",
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            type: "textarea",
            name: "swallowing_goals",
            placeholder: "Enter goals",
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            type: "subheading",
            label: "Plan",
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },
          {
            type: "textarea",
            name: "swallowing_plans",
            placeholder: "Enter goals",
            showIf: { field: "language_speech_intact_impaired", equals: "Impaired" }
          },          
        ]
      },

      /* Removed extra Activities/Environmental sections per requirement */
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

const swallowingIntactImpaired = [
  { label: "Intact", value: "Intact" },
  { label: "Impaired", value: "Impaired" }
];

const goodPoor = [
  { label: "Good", value: "Good" },
  { label: "Poor", value: "Poor" }
];

const fluentNonFluent = [
  { label: "Fluent", value: "Fluent" },
  { label: "Non fluent", value: "Non fluent" }
];

const presentAbsent = [
  { label: "Present", value: "Present" },
  { label: "Absent", value: "Absent" }
];

const normalImpaired = [
  { label: "Normal", value: "Normal" },
  { label: "Impaired", value: "Impaired" }
];

const ableNotAble = [
  { label: "Able", value: "Able" },
  { label: "Not able", value: "Not able" }
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