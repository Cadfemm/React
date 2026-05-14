import React from "react";
import {
  SaveRow,
  ProximalTable,
  PerformTable,
  TableHeading,
} from "./NeuracShared";

/* -------------------------------------------------------------------------- */
/*                               Configuration                                */
/* -------------------------------------------------------------------------- */

const KNEE_PROXIMAL = [
  {
    group: null,
    tests: [
      "Supine Pelvic Lift",
      "Side-lying Hip Adduction",
      "Side-lying Hip Abduction",
      "Supine Knee Flexion",
      "Prone Knee Extension",
    ],
  },
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

/* -------------------------------------------------------------------------- */
/*                           Knee Neurac Assessment                           */
/* -------------------------------------------------------------------------- */

export default function KneeNeuracAssessment({
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
          prefix="knee"
          rows={PERFORM_ROWS}
          values={values}
          onChange={onChange}
        />

        {/* Myofascial Chain Tests */}
        <TableHeading
          title="Myofascial Chain Tests for Knee Examination"
          tooltip={PROXIMAL_TOOLTIP}
        />

        <ProximalTable
          title=""
          prefix="knee_px"
          groups={KNEE_PROXIMAL}
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