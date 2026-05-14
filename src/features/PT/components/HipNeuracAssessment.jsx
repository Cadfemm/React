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

const HIP_PROXIMAL = [
  {
    group: null,
    tests: [
      "Supine Pelvic Lift",
      "Supine Bridge",
      "Side-lying Hip Adduction",
      "Side-lying Hip Abduction",
      "Prone Hip Extension",
    ],
  },
  {
    group: "Additional Tests*",
    tests: [
      "Scapular Protraction",
      "Scapular Retraction",
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
/*                            Hip Neurac Assessment                           */
/* -------------------------------------------------------------------------- */

export default function HipNeuracAssessment({
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
          prefix="hip"
          rows={PERFORM_ROWS}
          values={values}
          onChange={onChange}
        />

        {/* Myofascial Chain Tests */}
        <TableHeading
          title="Myofascial Chain Tests for Hip Examination"
          tooltip={PROXIMAL_TOOLTIP}
        />

        <ProximalTable
          title=""
          prefix="hip_px"
          groups={HIP_PROXIMAL}
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