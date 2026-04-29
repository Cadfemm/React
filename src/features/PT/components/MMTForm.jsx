import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const MMT_GRADE_OPTIONS = [
  { label: "0 – No Movement", value: "0" },
  { label: "1 – Flickering of contraction", value: "1" },
  { label: "2 – Full ROM with eliminating gravity", value: "2" },
  { label: "3 – Full ROM against gravity", value: "3" },
  { label: "4 – Full ROM against gravity with min resistance", value: "4" },
  { label: "5 – Full ROM against gravity with max resistance", value: "5" },
];

const MMT_GROUPS = [
  { label: "Right", columns: [{ key: "", type: "select", options: MMT_GRADE_OPTIONS }] },
  { label: "Left",  columns: [{ key: "", type: "select", options: MMT_GRADE_OPTIONS }] },
];

/** Build a single mmt-table row */
const r = (value, label) => ({
  value,
  label,
  columns: [
    { type: "select", options: MMT_GRADE_OPTIONS },
    { type: "select", options: MMT_GRADE_OPTIONS },
  ],
});

const MMT_SECTIONS = {
  Shoulder: [
    r("sh_flex",  "Flexion"),
    r("sh_ext",   "Extension"),
    r("sh_abd",   "Abduction"),
    r("sh_add",   "Adduction"),
    r("sh_ir",    "Internal Rotation"),
    r("sh_er",    "External Rotation"),
  ],
  Elbow: [
    r("el_flex",  "Flexion"),
    r("el_ext",   "Extension"),
    r("el_pro",   "Pronation"),
    r("el_sup",   "Supination"),
  ],
  Wrist: [
    r("wr_flex",  "Flexion"),
    r("wr_ext",   "Extension"),
    r("wr_rad",   "Radial Deviation"),
    r("wr_uln",   "Ulnar Deviation"),
  ],
  Hip: [
    r("hip_flex", "Flexion"),
    r("hip_ext",  "Extension"),
    r("hip_abd",  "Abduction"),
    r("hip_add",  "Adduction"),
    r("hip_ir",   "Internal Rotation"),
    r("hip_er",   "External Rotation"),
  ],
  Knee: [
    r("kn_flex",  "Flexion"),
    r("kn_ext",   "Extension"),
  ],
  Ankle: [
    r("ank_df",   "Dorsiflexion"),
    r("ank_pf",   "Plantarflexion"),
    r("ank_inv",  "Inversion"),
    r("ank_evr",  "Eversion"),
  ],
};

const ALL_SECTION_ORDER = ["Shoulder", "Elbow", "Wrist", "Hip", "Knee", "Ankle"];

/**
 * Build MMT accordion fields.
 * @param {string[]|null} filterSections - which joint sections to include (null = all)
 * @param {Object} sectionSides - optional per-section side override
 *   e.g. { Ankle: { right: true, left: false } }
 *   If omitted, both sides shown for all sections.
 */
export function buildMmtAccordionFields(filterSections, sectionSides = {}) {
  const sections = filterSections
    ? ALL_SECTION_ORDER.filter(s => filterSections.includes(s))
    : ALL_SECTION_ORDER;

  return sections.map((label, idx) => {
    const sides = sectionSides[label] || { right: true, left: true };

    // Build groups — always keep both Right and Left, mark disabled when needed
    const groups = [
      { label: "Right", columns: [{ key: "", type: "select", options: MMT_GRADE_OPTIONS, disabled: !sides.right }] },
      { label: "Left",  columns: [{ key: "", type: "select", options: MMT_GRADE_OPTIONS, disabled: !sides.left  }] },
    ];

    // Build rows with both columns, marking disabled ones
    const rows = (MMT_SECTIONS[label] || []).map(row => ({
      ...row,
      columns: [
        { type: "select", options: MMT_GRADE_OPTIONS, disabled: !sides.right },
        { type: "select", options: MMT_GRADE_OPTIONS, disabled: !sides.left  },
      ],
    }));

    return {
      type: "accordion",
      name: `mmt_section_${label.toLowerCase()}`,
      label,
      defaultOpen: idx === 0,
      children: [
        {
          type: "refraction-12col",
          name: `mmt_${label.toLowerCase()}`,
          cornerLabel: "Movement",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups,
          rows,
        },
      ],
    };
  });
}

export default function MMTForm({ values, onChange, filterSections, sectionSides }) {
  const schema = {
    title: "Manual Muscle Testing (MMT)",
    fields: buildMmtAccordionFields(filterSections ?? undefined, sectionSides ?? {}),
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}
