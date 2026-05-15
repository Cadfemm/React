import React from "react";
import {
  SaveRow,
  ProximalTable,
  SettingsTable,
  PerformTable,
  TableHeading,
} from "./NeuracShared";

/* -------------------------------------------------------------------------- */
/*                               Configuration                                */
/* -------------------------------------------------------------------------- */

const LUMBAR_PROXIMAL = [
  {
    group: null,
    tests: [
      "Supine Pelvic Lift",
      "Supine Bridging",
      "Prone Bridging",
      "Side-lying Hip Adduction",
      "Side-lying Hip Abduction",
    ],
  },
];

const LUMBAR_SETTINGS = [
  "Supine Lumbar Setting",
  "Prone Lumbar Setting",
  "Left Side-lying Lumbar Setting",
  "Right Side-lying Lumbar Setting",
];

const PERFORM_ROWS = [
  "Core Brace",
  "Abduction",
  "Heel Raise",
  "Scapula Assist",
];

const PROXIMAL_TOOLTIP = [
  "0 = Weak Link (Neurac treatment indicated)",
  "Decide:",
  "P = Pain",
  "D = Dysfunctional Movement",
  "F = Functional Movement",
];

const SETTINGS_TOOLTIP = [
  "0 = Not satisfactory (Neurac treatment indicated)",
  "1 = Satisfactory",
];

/* -------------------------------------------------------------------------- */
/*                          Lumbar Neurac Assessment                          */
/* -------------------------------------------------------------------------- */

export default function LumbarNeuracAssessment({
  values = {},
  onChange,
  onSave,
  onClear,
}) {
  return (
    <div style={wrapper}>
      {/* Section Header */}
    

      {/* Content */}
      <div style={content}>
        {/* Perform Test */}
        <PerformTable
          prefix="lumbar"
          rows={PERFORM_ROWS}
          values={values}
          onChange={onChange}
        />

        {/* Myofascial Chain Tests */}
        <TableHeading
          title="Myofascial Chain Tests"
          tooltip={PROXIMAL_TOOLTIP}
        />

        <ProximalTable
          title=""
          prefix="lumbar_px"
          groups={LUMBAR_PROXIMAL}
          values={values}
          onChange={onChange}
        />

        {/* Lumbar Settings */}
        <TableHeading
          title="Lumbar Settings"
          tooltip={SETTINGS_TOOLTIP}
        />

        <SettingsTable
          title=""
          prefix="ls"
          rows={LUMBAR_SETTINGS}
          values={values}
          onChange={onChange}
        />

        {/* Save / Clear */}
        <SaveRow onSave={onSave} onClear={onClear} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const wrapper = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  overflow: "hidden",
};

const sectionHeader = {
  padding: "12px 16px",
  fontSize: 16,
  fontWeight: 700,
  color: "#111827",
  background: "#f9fafb",
  borderBottom: "1px solid #e5e7eb",
  textTransform: "uppercase",
};

const content = {
  padding: "16px 20px",
};