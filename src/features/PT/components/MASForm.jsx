import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== mas OPTIONS ===================== */

const MAS_OPTIONS = [
  { label: "0 – No increase in tone", value: "0" },
  { label: "1 – Slight increase in tone, catch/ release at end ROM", value: "1" },
  { label: "1+ – Slight increase in tone, catch/ release and resistance through rest ROM (½ ROM) ", value: "2-" },
  { label: "2 – More marked increase in tone through ROM, but affected part moved easily", value: "2" },
  { label: "3 – Considerable increase in tone, passive movement difficult", value: "2+" },
  { label: "4 – Affected part in rigid flexion and extension", value: "3-" },
];

/* ===================== SCHEMA ===================== */

const MAS_SCHEMA = {
  title: "Modified Ashworth Scale (MAS) ",
  sections: [
    {
      fields: [
                { type: "subheading", label: "Shoulder" },
{
  type: "paired-select",
  left: {
    name: "mas_sh_flex_l",
    title: "Shoulder Flexion Left"
  },
  right: {
    name: "mas_sh_flex_r",
    title: "Shoulder Flexion Right"
  },
  options: MAS_OPTIONS
},

{
  type: "paired-select",
  left: {
    name: "mas_se_flex_l",
    title: "Shoulder Extension Left"
  },
  right: {
    name: "mas_se_flex_r",
    title: "Shoulder Extension Right"
  },
  options: MAS_OPTIONS
},

{
  type: "paired-select",
  left: {
    name: "mas_sa_flex_l",
    title: "Shoulder Abduction Left"
  },
  right: {
    name: "mas_sa_flex_r",
    title: "Shoulder Abduction Right"
  },
  options: MAS_OPTIONS
},

        { type: "subheading", label: "Elbow" },
{
  type: "paired-select",
  left: {
    name: "mas_el_flex_l",
    title: "Elbow Flexion Left"
  },
  right: {
    name: "mas_el_flex_r",
    title: "Elbow Flexion Right"
  },
  options: MAS_OPTIONS
},

{
  type: "paired-select",
  left: {
    name: "mas_el_ext_l",
    title: "Elbow Extension Left"
  },
  right: {
    name: "mas_el_ext_r",
    title: "Elbow Extension Right"
  },
  options: MAS_OPTIONS
},
 { type: "subheading", label: "Forearm" },
{
  type: "paired-select",
  left: {
    name: "mas_fa_flex_l",
    title: "Forearm supination/pronation Left"
  },
  right: {
    name: "mas_fa_flex_r",
    title: "Forearm supination/pronation Right"
  },
  options: MAS_OPTIONS
},
        { type: "subheading", label: "Wrist" },
{
  type: "paired-select",
  left: {
    name: "mas_wr_flex_l",
    title: "Wrist Flexion Left"
  },
  right: {
    name: "mas_wr_flex_r",
    title: "Wrist Flexion Right"
  },
  options: MAS_OPTIONS
},
{
  type: "paired-select",
  left: {
    name: "mas_wr_ext_l",
    title: "Wrist Extension Left"
  },
  right: {
    name: "mas_wr_ext_r",
    title: "Wrist Extension Right"
  },
  options: MAS_OPTIONS
},
      ]
    }
  ]
};

/* ===================== COMPONENT ===================== */

export default function masForm({ values, onChange }) {
  return (
    <CommonFormBuilder
      schema={MAS_SCHEMA}
      values={values}
      onChange={onChange}
       layout="nested"   // 👈 THIS is the key
    />
  );
}
