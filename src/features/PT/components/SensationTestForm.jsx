import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* Column groups: Right (select) | Left (select) | Notes (input) */
const SENSATION_GROUPS = [
  { label: "Right",  columns: [{ key: "" }] },
  { label: "Left",   columns: [{ key: "" }] },
  { label: "Notes",  columns: [{ key: "" }] },
];

const IRA_OPTIONS = [
  { label: "Intact",  value: "intact"  },
  { label: "Reduced", value: "reduced" },
  { label: "Absent",  value: "absent"  },
];

const IIA_OPTIONS = [
  { label: "Intact",   value: "intact"   },
  { label: "Impaired", value: "impaired" },
  { label: "Absent",   value: "absent"   },
];

const NR_OPTIONS = [
  { label: "Normal",  value: "normal"  },
  { label: "Reduced", value: "reduced" },
];

/* Helper — col 0 & 1 are selects, col 2 is input */
const row = (value, label, options) => ({
  value,
  label,
  columns: [
    { type: "select", options },
    { type: "select", options },
    { type: "input"  },
  ],
});

const SENSATION_SCHEMA = {
  title: "Sensation Test",
  fields: [
    /* ── 1. Superficial Sensation ── */
    {
      type: "accordion",
      name: "sensation_superficial",
      label: "1. Superficial Sensation",
      defaultOpen: true,
      children: [
        {
          type: "refraction-12col",
          name: "sens_superficial",
          cornerLabel: "Test",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: SENSATION_GROUPS,
          rows: [
            row("light_touch",    "Light Touch",       IRA_OPTIONS),
            row("pain_sharp_dull","Pain (Sharp/Dull)", IRA_OPTIONS),
            row("temperature",    "Temperature",       IRA_OPTIONS),
          ],
        },
      ],
    },

    /* ── 2. Proprioception ── */
    {
      type: "accordion",
      name: "sensation_proprioception",
      label: "2. Proprioception",
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: "sens_proprioception",
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
    },

    /* ── 3. Cortical Sensation ── */
    {
      type: "accordion",
      name: "sensation_cortical",
      label: "3. Cortical Sensation",
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: "sens_cortical",
          cornerLabel: "Test",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: SENSATION_GROUPS,
          rows: [
            row("stereognosis",       "Stereognosis",              IIA_OPTIONS),
            row("graphesthesia",      "Graphesthesia",             IIA_OPTIONS),
            row("two_point_discrim",  "Two-Point Discrimination",  NR_OPTIONS),
          ],
        },
      ],
    },
  ],
};

export default function SensationTestForm({ values, onChange }) {
  return (
    <CommonFormBuilder
      schema={SENSATION_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={false}
      layout="nested"
    />
  );
}
