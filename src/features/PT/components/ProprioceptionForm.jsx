import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const SENSATION_GROUPS = [
  { label: "Right",  columns: [{ key: "" }] },
  { label: "Left",   columns: [{ key: "" }] },
  { label: "Notes",  columns: [{ key: "" }] },
];

const IIA_OPTIONS = [
  { label: "Intact",   value: "intact"   },
  { label: "Impaired", value: "impaired" },
  { label: "Absent",   value: "absent"   },
];

const IRA_OPTIONS = [
  { label: "Intact",  value: "intact"  },
  { label: "Reduced", value: "reduced" },
  { label: "Absent",  value: "absent"  },
];

const row = (value, label, options) => ({
  value,
  label,
  columns: [
    { type: "select", options },
    { type: "select", options },
    { type: "input"  },
  ],
});

const PROPRIOCEPTION_SCHEMA = {
  title: "Proprioception Assessment",
  fields: [
    {
      type: "refraction-12col",
      name: "prop_table",
      cornerLabel: "Test",
      cornerLikeGroupHeader: true,
      showColumnHeaders: true,
      groups: SENSATION_GROUPS,
      rows: [
        row("joint_position", "Joint Position Sense", IIA_OPTIONS),
        row("vibration",      "Vibration (128 Hz)",   IRA_OPTIONS),
      ],
    },
  ],
};

export default function ProprioceptionForm({ values, onChange }) {
  return (
    <CommonFormBuilder
      schema={PROPRIOCEPTION_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={false}
      layout="nested"
    />
  );
}
