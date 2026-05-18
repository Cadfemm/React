import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const ACTIONS = [
  { type: "back", label: "Back" },
  { type: "clear", label: "Clear" },
  { type: "save", label: "Save" }
];
const SIMPLE_INTERVENTION_SCHEMA = {
  title: "Intervention",

//   actions: [
//     { type: "back", label: "Back" },
//     { type: "clear", label: "Clear" },
//     { type: "save", label: "Save" }
//   ],

  sections: [
    {
   
      fields: [
        {
          name: "simple_interventions",
          label: "Select Intervention",
          type: "checkbox-group",

          options: [
            {
              label: "Chattanooga",
              value: "chattanooga"
            },
            {
              label: "Fitmi Music",
              value: "fitmi_music"
            },
            {
              label: "Hand Cycling",
              value: "hand_cycling"
            },
            {
              label: "LEGA (Chest Percussion)",
              value: "lega_chest_percussion"
            },
            {
              label: "Magnethoterapy",
              value: "magnethoterapy"
            },
            {
              label: "Motomed",
              value: "motomed"
            },
            {
              label: "Saebo Stim",
              value: "saebo_stim"
            },
            {
              label: "Tilt Table",
              value: "tilt_table"
            },
            {
              label: "High Frequency Chest Wall Oscillation",
              value: "high_frequency_chest_wall_oscillation"
            },
            {
              label: "Others",
              value: "others"
            }
          ]
        },

        {
          name: "simple_intervention_others",
          label: "Specify",
          type: "textarea",

          showIf: {
            field: "simple_interventions",
            includes: "others"
          }
        },
        {
            name: "observation_during_procedure",
            label: "Observation During Procedure",
            type: "textarea",
            },

            {
            name: "adverse_reaction",
            label: "Adverse Reaction",
            type: "radio",
            options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" }
            ]
            },

            {
            name: "adverse_reaction_details",
            label: "Specify",
            type: "textarea",
            showIf: {
                field: "adverse_reaction",
                equals: "yes"
            }
            },
            {
            name: "plan",
            label: "Plan",
            type: "textarea",
            },
      ]
    }
  ]
}
const TABS = ["rTMS", "tDCS", "NESA"];

/* ================= rTMS ================= */

const RTMS_SCHEMA = {
    title: "Repetitive Transcranial Magnetic Stimulation (rTMS)",
    actions: ACTIONS,
    sections: [
        {
            fields: [
                {
                    name: "rtms_consent",
                    type: "checkbox-group",
                    options: [{label: 'Consent/Checklist', value: 'yes'}]
                },
                {
                    name: "rtms_document_upload",
                    label: "Upload",
                    type: "file-upload-modal",
                    showIf: {
                        field: "rtms_consent",
                        includes: "yes"
                    }
                },
                {
                    name: "rtms_protocol",
                    label: "Protocol",
                    type: "radio",
                    labelAbove: true,
                    options: [
                        { label: "Motor Stroke", value: "motor_stoke"},
                        { label: "Aphasia", value: "aphasia"},
                        { label: "Cognitive", value: "cognitive"},
                        { label: "Neuropathic Pain", value: "neuropathic_pain"},
                        { label: "Others", value: "others"}
                    ]
                },
                {
                    name: "rtms_specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "rtms_protocol",
                        equals: "others"
                    }
                },
                {
                    name: "rtms_stimulation_site",
                    label: "Stimulation Site",
                    type: "single-select",
                    options: [
                        { label: "Right", value: "right"},
                        { label: "Left", value: "left"}
                    ]
                },
                {
                    name: "rtms_frequency",
                    label: "Frequency",
                    type: "radio",
                    options: [
                        { label: "1Hz", value: "1hz"},
                        { label: "10Hz", value: "10hz"},
                        { label: "Teta Burst", value: "teta_burst"},
                        { label: "Others", value: "others"}
                    ]
                },
                {
                    name: "rtms_intensity",
                    label: "Intensity (MEP)",
                    type: "textarea"
                },
               {
                name: "complication",
                label: "Complication",
                type: "radio",
                options: [
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" }
                ]
            },
            {
                name: "complication_details",
                label: "Please specify complication",
                type: "textarea",
                showIf: {
                    field: "complication",
                    equals: "yes"
                }
            },
            {
            name: "observation_during_procedure_rtms",
            label: "Observation During Procedure",
            type: "textarea",
            },

            {
            name: "adverse_reaction_rtms",
            label: "Adverse Reaction",
            type: "radio",
            options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" }
            ]
            },

            {
            name: "adverse_reaction_details",
            label: "Specify",
            type: "textarea",
            showIf: {
                field: "adverse_reaction_rtms",
                equals: "yes"
            }
            },
            /* ========== GOALS & PLAN ========== */
            {
                type: "subheading",
                label: "Goals"
            },
            {
                name: "rtms_goals",
                type: "textarea",
                placeholder: "Enter goals"
            },

            {
                type: "subheading",
                label: "Plan"
            },
            {
                name: "rtms_plan",
                type: "textarea",
                placeholder: "Enter plan"
            },
            ]
        }
    ]
}

/* ================= tDCS ================= */

const TDCS_SCHEMA = {
    title: "Transcranial Direct Current Stimulation (tDCS)",
    actions: ACTIONS,
    sections: [
        {
            fields: [
                {
                    name: "consent",
                    type: "checkbox-group",
                    options: [{label: 'Consent/Checklist', value: 'yes'}]
                },
                {
                    name: "document_upload",
                    label: "Upload",
                    type: "file-upload-modal",
                    showIf: {
                        field: "consent",
                        includes: "yes"
                    }
                },
                {
                    name: "tdcs_protocol",
                    label: "Protocol",
                    type: "radio",
                    labelAbove: true,
                    options: [
                        { label: "Motor Stroke", value: "motor_stoke"},
                        { label: "Aphasia", value: "aphasia"},
                        { label: "Cognitive", value: "cognitive"},
                        { label: "Neuropathic Pain", value: "neuropathic_pain"},
                        { label: "Others", value: "others"}
                    ]
                },
                {
                    name: "specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "protocol",
                        equals: "others"
                    }
                },
                {
                    name: "location",
                    label: "Location",
                    type: "single-select",
                    options: [
                        { label: "Right", value: "right"},
                        { label: "Left", value: "left"}
                    ]
                },
                {
                    name: "location_select",
                    type: "single-select",
                    options: [
                        { label: "M1", value: "m1"},
                        { label: "DLPFC", value: "dlpfc"},
                        { label: "BROCA", value: "broca"},
                        { label: "Others", value: "others"}
                    ],
                    showIf: {
                        field: "location",
                        oneOf: ["right", "left"]
                    }
                },
                {
                    name: "specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "location_select",
                        equals: "others"
                    }
                },
                {
                    name: "current",
                    label: "Current (mA)",
                    type: "radio",
                    options: [
                        { label: "2000", value: 2000},
                        { label: "1500", value: 1500},
                        { label: "1000", value: 1000}
                    ]
                },
                {
                name: "complication",
                label: "Complication",
                type: "radio",
                options: [
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" }
                ]
            },
            {
                name: "complication_details",
                label: "Please specify complication",
                type: "textarea",
                showIf: {
                    field: "complication",
                    equals: "yes"
                }
            },
            {
            name: "observation_during_procedure_tdcs",
            label: "Observation During Procedure",
            type: "textarea",
            },

            {
            name: "adverse_reaction_tdcs",
            label: "Adverse Reaction",
            type: "radio",
            options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" }
            ]
            },

            {
            name: "adverse_reaction_details",
            label: "Specify",
            type: "textarea",
            showIf: {
                field: "adverse_reaction_tdcs",
                equals: "yes"
            }
            },
            /* ========== GOALS & PLAN ========== */
            {
                type: "subheading",
                label: "Goals"
            },
            {
                name: "tdcs_goals",
                type: "textarea",
                placeholder: "Enter goals"
            },

            {
                type: "subheading",
                label: "Plan"
            },
            {
                name: "tdcs_plan",
                type: "textarea",
                placeholder: "Enter plan"
            },
            ]
        }
    ]
}

/* ================= NESA ================= */

const NESA_SCHEMA = {
    title: "NESA",
    actions: ACTIONS,
    sections: [
        {
            fields: [
                {
                    name: "consent",
                    type: "checkbox-group",
                    options: [{label: 'Consent/Checklist', value: 'yes'}]
                },
                {
                    name: "document_upload",
                    label: "Upload",
                    type: "file-upload-modal",
                    showIf: {
                        field: "consent",
                        includes: "yes"
                    }
                },
                {
                    name: "protocol",
                    label: "Protocol",
                    type: "radio",
                    labelAbove: true,
                   options: [
                        { label: "Generalized Pain", value: "generalized_pain" },
                        { label: "Neuropathic Pain", value: "neuropathic_pain" },
                        { label: "Nerve Damage", value: "nerve_damage" },
                        { label: "Trigeminal Neuralgia", value: "trigeminal_neuralgia" },
                        { label: "Chronic Non-Specific Back Pain", value: "chronic_non_specific_back_pain" },
                        { label: "Phantom Limb Syndrome Lower Limb", value: "phantom_limb_lower_limb" },
                        { label: "Phantom Limb Syndrome Upper Limb", value: "phantom_limb_upper_limb" },
                        { label: "Sleep", value: "sleep" },
                        { label: "Anxiety and Non-Specific Mood Disorder", value: "anxiety_mood_disorder" },
                        { label: "Generalized Fatigue", value: "generalized_fatigue" },
                        { label: "Non-Specific Headache and Migraines", value: "headache_migraines" },
                        { label: "Stroke", value: "stroke" },
                        { label: "Acquired Brain Injury", value: "acquired_brain_injury" },
                        { label: "Central Dizziness", value: "central_dizziness" },
                        { label: "Parkinson's Disease", value: "parkinsons_disease" },
                        { label: "Multiple Sclerosis", value: "multiple_sclerosis" },
                        { label: "Others", value: "others" }
                    ]
                },
                {
                    name: "specify",
                    label: "Other Protocol",
                    type: "textarea",
                    showIf: {
                        field: "protocol",
                        equals: "others"
                    }
                },
                {
                    type: "subheading",
                    label: "Protocol Settings"
                },

                {
                    type: "custom-image",
                    src: "/generalized_pain.png",
                    showIf: { field: "protocol", equals: "generalized_pain" }
                },
                {
                    type: "custom-image",
                    src: "/neuropathic_pain.png",
                    showIf: { field: "protocol", equals: "neuropathic_pain" }
                },
                {
                    type: "custom-image",
                    src: "/nerve_damage.png",
                    showIf: { field: "protocol", equals: "nerve_damage" }
                },
                {
                    type: "custom-image",
                    src: "/trigeminal_neuralgia.png",
                    showIf: { field: "protocol", equals: "trigeminal_neuralgia" }
                },
                {
                    type: "custom-image",
                    src: "/chronic_non_specific_back_pain.png",
                    showIf: { field: "protocol", equals: "chronic_non_specific_back_pain" }
                },
                {
                    type: "custom-image",
                    src: "/phantom_limb_lower_limb.png",
                    showIf: { field: "protocol", equals: "phantom_limb_lower_limb" }
                },
                {
                    type: "custom-image",
                    src: "/phantom_limb_upper_limb.png",
                    showIf: { field: "protocol", equals: "phantom_limb_upper_limb" }
                },
                {
                    type: "custom-image",
                    src: "/sleep.png",
                    showIf: { field: "protocol", equals: "sleep" }
                },
                {
                    type: "custom-image",
                    src: "/anxiety_mood_disorder.png",
                    showIf: { field: "protocol", equals: "anxiety_mood_disorder" }
                },
                {
                    type: "custom-image",
                    src: "/generalized_fatigue.png",
                    showIf: { field: "protocol", equals: "generalized_fatigue" }
                },
                {
                    type: "custom-image",
                    src: "/headache_migraines.png",
                    showIf: { field: "protocol", equals: "headache_migraines" }
                },
                {
                    type: "custom-image",
                    src: "/stroke.png",
                    showIf: { field: "protocol", equals: "stroke" }
                },
                {
                    type: "custom-image",
                    src: "/acquired_brain_injury.png",
                    showIf: { field: "protocol", equals: "acquired_brain_injury" }
                },
                {
                    type: "custom-image",
                    src: "/central_dizziness.png",
                    showIf: { field: "protocol", equals: "central_dizziness" }
                },
                {
                    type: "custom-image",
                    src: "/parkinsons_disease.png",
                    showIf: { field: "protocol", equals: "parkinsons_disease" }
                },
                {
                    type: "custom-image",
                    src: "/multiple_sclerosis.png",
                    showIf: { field: "protocol", equals: "multiple_sclerosis" }
                },
                {
                    name: "complication",
                    label: "Complication",
                    type: "radio",
                    options: [
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" }
                    ]
                },
                {
                    name: "complication_details",
                    label: "Please specify complication",
                    type: "textarea",
                    showIf: {
                        field: "complication",
                        equals: "yes"
                    }
                },
                {
                    name: "observation_during_procedure_nesa",
                    label: "Observation During Procedure",
                    type: "textarea",
                    },

                    {
                    name: "adverse_reaction_nesa",
                    label: "Adverse Reaction",
                    type: "radio",
                    options: [
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" }
                    ]
                    },

                    {
                    name: "adverse_reaction_details",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "adverse_reaction_nesa",
                        equals: "yes"
                    }
                    },
                 /* ========== GOALS & PLAN ========== */
                {
                    type: "subheading",
                    label: "Goals"
                },
                {
                    name: "nesa_goals",
                    type: "textarea",
                    placeholder: "Enter goals"
                },

                {
                    type: "subheading",
                    label: "Plan"
                },
                {
                    name: "nesa_plan",
                    type: "textarea",
                    placeholder: "Enter plan"
                }
            ]
        }
    ]
}

const SCHEMAS = {
  rTMS: RTMS_SCHEMA,
  tDCS: TDCS_SCHEMA,
  NESA: NESA_SCHEMA
};

export default function Intervention({
  onBack
}) {

  const [values, setValues] = useState({});
  const [activeTab, setActiveTab] = useState("rTMS");

  const onChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAction = (type) => {
    switch (type) {
      case "back":
        onBack?.();
        break;

      case "clear":
        setValues({});
        break;

      case "save":
        alert("Intervention draft saved");
        break;

      default:
        break;
    }
  };

return (
  <div style={mainContent}>

    {/* SIMPLE INTERVENTION */}
    <CommonFormBuilder
      schema={SIMPLE_INTERVENTION_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
    />

    {/* TABS */}
    <div style={tabBar}>
      {TABS.map((tab) => (
        <div
          key={tab}
          style={activeTab === tab ? tabActive : tabBtn}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </div>
      ))}
    </div>

    {/* TAB CONTENT */}
    <CommonFormBuilder
      schema={SCHEMAS[activeTab]}
      values={values}
      onChange={onChange}
      onAction={handleAction}
    />

  </div>
);
}

const mainContent = {
  width: "100%",
  padding: 15,
  boxSizing: "border-box"
};

const tabBar = {
  display: "flex",
  gap: 10,
  justifyContent: "center",
  borderBottom: "1px solid #cccccc",
  marginBottom: 12
};

const tabBtn = {
  padding: "10px 22px",
  background: "#ffffff07",
  fontWeight: 600,
  color: "#0f172a",
  cursor: "pointer"
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2451b3ff",
  color: "#2451b3ff"
};