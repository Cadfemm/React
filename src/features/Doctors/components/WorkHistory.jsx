import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function WorkHistory() {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const WORK_HISTORY_SCHEMA = {
    title: "Work History",
    sections: [
      {
        title: "",
        fields: [
          { type: "input", name: "current_occupation", label: "Current occupation" },
          { type: "input", name: "working_at", label: "Working at" },
          { type: "date", name: "employed_since", label: "Employed since" },
          { type: "textarea", name: "main_duties", label: "Main duties" },
          { type: "input", name: "physical_demands", label: "Physical demands" },
          { type: "input", name: "mental_demands", label: "Mental demands" },
          { type: "input", name: "work_schedule", label: "Work schedule" },
          { type: "input", name: "occupational_exposures", label: "Occupational exposures" },
          { type: "input", name: "effect_of_condition_on_work", label: "Effect of medical condition on work" },
          {
            type: "radio",
            name: "workplace_accommodations",
            label: "Workplace accommodations",
            options: ["Modified duties", "Reduced hours", "None"],
          },
          {
            type: "radio",
            name: "history_work_related_injury",
            label: "History of work-related injury",
            options: ["Yes", "No"],
          },
          {
            type: "textarea",
            name: "history_work_related_injury_details",
            label: "Work-related injury details",
            showIf: { field: "history_work_related_injury", equals: "Yes" },
          },
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={WORK_HISTORY_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={false}
    />
  );
}

