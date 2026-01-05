import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== SCHEMA ===================== */

const TUG_SCHEMA = {
  title: "Assistive Device & Mobility",
  subtitle: "Functional Mobility Assessment",
  sections: [
    {
      fields: [
        {
          type: "textarea",
          name: "assistive_device",
          label: "Assistive Device and/or Bracing Used",
          helper: "Example: Walker, Cane, AFO, Knee brace, None"
        },
        {
          type: "input",
          name: "tug_time",
          label: "Timed Up and Go (TUG) – Time",
          helper: "Enter time in seconds (e.g., 12.4 s)"
        }
      ]
    }
  ]
};

/* ===================== COMPONENT ===================== */

export default function TUG() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  return (
    <CommonFormBuilder
      schema={ASSISTIVE_TUG_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      layout="nested"
    >
      <button
        style={{ padding: "10px 16px", fontWeight: 600 }}
        onClick={() => setSubmitted(true)}
      >
        Save
      </button>
    </CommonFormBuilder>
  );
}
