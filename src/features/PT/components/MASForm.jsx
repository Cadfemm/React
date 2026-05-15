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
  mas("mas_sh_flex_l", "Flexion Left"),
  mas("mas_sh_flex_r", "Flexion Right"),
  mas("mas_se_flex_l", "Extension Left"),
  mas("mas_se_flex_r", "Extension Right"),
  mas("mas_sa_flex_l", "Abduction Left"),
  mas("mas_sa_flex_r", " Abduction Right"),
  { type: "subheading", label: "Elbow" },
  mas("mas_el_flex_l", "Flexion Left"),
  mas("mas_el_flex_r", "Flexion Right"),
  mas("mas_el_ext_l", "Extension Left"),
  mas("mas_el_ext_r", "Extension Right"),
  { type: "subheading", label: "Forearm" },
  mas("mas_fa_flex_l", "Supination/pronation Left"),
  mas("mas_fa_flex_r", "Supination/pronation Right"),
  { type: "subheading", label: "Wrist" },
  mas("mas_wr_flex_l", "Flexion Left"),
  mas("mas_wr_flex_r", "Flexion Right"),
  mas("mas_wr_ext_l", "Extension Left"),
  mas("mas_wr_ext_r", "Extension Right"),

   { type: "subheading", label: "Hip" },
  mas("mas_hip_flex_l", "Flexion Left"),
  mas("mas_hip_flex_r", "Flexion Right"),
  mas("mas_hip_ext_l", "Extension Left"),
  mas("mas_hip_ext_r", "Extension Right"),
  mas("mas_hip_abd_l", "Abduction Left"),
  mas("mas_hip_abd_r", "Abduction Right"),
  mas("mas_hip_add_l", "Adduction Left"),
  mas("mas_hip_add_r", "Adduction Right"),
  mas("mas_hip_ir_l", "Internal Rotation Left"),
  mas("mas_hip_ir_r", "Internal Rotation Right"),
  mas("mas_hip_er_l", "External Rotation Left"),
  mas("mas_hip_er_r", "External Rotation Right"),

  // ===================== KNEE =====================
  { type: "subheading", label: "Knee" },
  mas("mas_knee_flex_l", "Flexion Left"),
  mas("mas_knee_flex_r", "Flexion Right"),
  mas("mas_knee_ext_l", "Extension Left"),
  mas("mas_knee_ext_r", "Extension Right"),

  // ===================== ANKLE =====================
  { type: "subheading", label: "Ankle" },
  mas("mas_ankle_pf_l", "Plantar Flexion Left"),
  mas("mas_ankle_pf_r", "Plantar Flexion Right"),
  mas("mas_ankle_df_l", "Dorsiflexion Left"),
  mas("mas_ankle_df_r", "Dorsiflexion Right"),
  mas("mas_ankle_inv_l", "Inversion Left"),
  mas("mas_ankle_inv_r", "Inversion Right"),
  mas("mas_ankle_eve_l", "Eversion Left"),
  mas("mas_ankle_eve_r", "Eversion Right"),
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
