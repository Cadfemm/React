import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== MAS OPTIONS (Modified Ashworth Scale) ===================== */

const MAS_OPTIONS = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "1+", value: "1+" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" }
];

const MAS_INFO = {
  title: "Modified Ashworth Scale (MAS)",
  content: [
    "0 – No increase in tone",
    "1 – Slight increase in tone, catch/release at end ROM",
    "1+ – Slight increase in tone, catch/release and resistance through rest ROM (½ ROM)",
    "2 – More marked increase in tone through ROM, but affected part moved easily",
    "3 – Considerable increase in tone, passive movement difficult",
    "4 – Affected part in rigid flexion and extension"
  ]
};

const mas = (name, label) => ({
  type: "radio-matrix",
  name,
  label,
  options: MAS_OPTIONS,
  info: MAS_INFO,
  matrixHeaderLabel: "MAS Grade",
  showInfoInRow: false
});

function splitMasGroupsBySubheading(fields) {
  const groups = [];
  let current = null;
  (fields || []).forEach((f) => {
    if (f?.type === "subheading") {
      current = { label: f.label, children: [] };
      groups.push(current);
    } else if (current) {
      current.children.push(f);
    }
  });
  return groups;
}

const MAS_FIELDS_FLAT = [
  { type: "subheading", label: "Shoulder" },
  mas("mas_sh_flex_l", "Shoulder Flexion Left"),
  mas("mas_sh_flex_r", "Shoulder Flexion Right"),
  mas("mas_se_flex_l", "Shoulder Extension Left"),
  mas("mas_se_flex_r", "Shoulder Extension Right"),
  mas("mas_sa_flex_l", "Shoulder Abduction Left"),
  mas("mas_sa_flex_r", "Shoulder Abduction Right"),
  { type: "subheading", label: "Elbow" },
  mas("mas_el_flex_l", "Elbow Flexion Left"),
  mas("mas_el_flex_r", "Elbow Flexion Right"),
  mas("mas_el_ext_l", "Elbow Extension Left"),
  mas("mas_el_ext_r", "Elbow Extension Right"),
  { type: "subheading", label: "Forearm" },
  mas("mas_fa_flex_l", "Forearm supination/pronation Left"),
  mas("mas_fa_flex_r", "Forearm supination/pronation Right"),
  { type: "subheading", label: "Wrist" },
  mas("mas_wr_flex_l", "Wrist Flexion Left"),
  mas("mas_wr_flex_r", "Wrist Flexion Right"),
  mas("mas_wr_ext_l", "Wrist Extension Left"),
  mas("mas_wr_ext_r", "Wrist Extension Right"),
];

/* ===================== SCHEMA ===================== */

const MAS_SCHEMA = {
  title: "Modified Ashworth Scale (MAS)",
  titleInfo: MAS_INFO,
  fields: splitMasGroupsBySubheading(MAS_FIELDS_FLAT).map((g, idx) => ({
    type: "accordion",
    name: `mas_section_${String(g.label).replace(/[^a-z0-9]+/gi, "_").toLowerCase()}_${idx}`,
    label: g.label,
    defaultOpen: idx === 0,
    children: g.children,
  })),
};

/* ===================== COMPONENT ===================== */

export default function MASForm({ values, onChange }) {
  return (
    <CommonFormBuilder
      schema={MAS_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}
