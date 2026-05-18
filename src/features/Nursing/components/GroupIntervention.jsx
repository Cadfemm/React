import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const schema = {
  title: "Group Intervention",

  actions: [
    {
      type: "back",
      label: "Back"
    }
  ],

  sections: [
    {
      title: "SESSION",

      fields: [
        {
          type: "checkbox-group",
          name: "session_types",
          label: "Select Session Type",
          options: [
            {
              label: "Health Education",
              value: "health_education"
            },
            {
              label: "Social Integration Activities",
              value: "social_integration"
            }
          ]
        },

        /* ================= HEALTH EDUCATION ================= */

        {
          type: "subheading",
          label: "HEALTH EDUCATION",
          showIf: {
            field: "session_types",
            includes: "health_education"
          }
        },

        {
          type: "textarea",
          name: "health_topic_programme",
          label: "Topic & Programme",
          showIf: {
            field: "session_types",
            includes: "health_education"
          }
        },

        {
          type: "radio",
          name: "health_objective_achieved",
          label: "Objective Achieved",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ],
          showIf: {
            field: "session_types",
            includes: "health_education"
          }
        },

        {
          type: "radio",
          name: "health_tolerance",
          label: "Tolerance",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" }
          ],
          showIf: {
            field: "session_types",
            includes: "health_education"
          }
        },

        {
          type: "textarea",
          name: "health_nursing_notes",
          label: "Nursing Notes",
          showIf: {
            field: "session_types",
            includes: "health_education"
          }
        },

        /* ================= SOCIAL INTEGRATION ================= */

        {
          type: "subheading",
          label: "SOCIAL INTEGRATION ACTIVITIES",
          showIf: {
            field: "session_types",
            includes: "social_integration"
          }
        },

        {
          type: "textarea",
          name: "social_topic_programme",
          label: "Topic & Programme",
          showIf: {
            field: "session_types",
            includes: "social_integration"
          }
        },

        {
          type: "radio",
          name: "social_objective_achieved",
          label: "Objective Achieved",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ],
          showIf: {
            field: "session_types",
            includes: "social_integration"
          }
        },

        {
          type: "radio",
          name: "social_tolerance",
          label: "Tolerance",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" }
          ],
          showIf: {
            field: "session_types",
            includes: "social_integration"
          }
        },

        {
          type: "textarea",
          name: "social_nursing_notes",
          label: "Nursing Notes",
          showIf: {
            field: "session_types",
            includes: "social_integration"
          }
        }
      ]
    }
  ]
};

export default function GroupIntervention({
  onBack,
}) {

  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAction = (type) => {
    if (type === "back") {
      onBack?.();
    }
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      onAction={handleAction}
      layout="nested"
    />
  );
}