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

const SHOULDER_PROXIMAL = [
  {
    group: null,
    tests: [
      "Supine Pelvic Lift",
      "Scapular Protraction",
      "Scapular Retraction",
      "Shoulder Abd/ER",
      "Shoulder Abd/IR",
    ],
  },
  {
    group: "Additional Tests*",
    tests: [
      "Side-lying Hip Adduction",
      "Side-lying Hip Abduction",
    ],
  },
];

const PERFORM_ROWS = [
  "Core Brace",
  "Abduction",
  "Heel Raise",
  "Adduction",
  "Scapula Assist",
  "Scapula Retraction",
  "Scapula Stabilization",
];

const PROXIMAL_TOOLTIP = [
  "0 = Weak Link (Neurac treatment indicated)",
  "Decide:",
  "P = Pain",
  "D = Dysfunctional Movement",
  "F = Functional Movement",
];

/* -------------------------------------------------------------------------- */
/*                         Shoulder Neurac Assessment                         */
/* -------------------------------------------------------------------------- */

export default function ShoulderNeuracAssessment({
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
          prefix="shoulder"
          rows={PERFORM_ROWS}
          values={values}
          onChange={onChange}
        />

        {/* Proximal / Myofascial Chain Tests */}
        <TableHeading
          title="Myofascial Chain Tests for Shoulder Examination"
          tooltip={PROXIMAL_TOOLTIP}
        />

        <ProximalTable
          title=""
          prefix="shoulder_px"
          groups={SHOULDER_PROXIMAL}
          values={values}
          onChange={onChange}
        />

        {/* Save / Clear Buttons */}
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