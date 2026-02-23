import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== MMT OPTIONS ===================== */

const MMT_OPTIONS = [
  { label: "0 – Nothing, no muscle contraction", value: "0" },
  { label: "1 – Flicker (palpable contraction, no movement)", value: "1" },
  { label: "2− – Part ROM with gravity counterbalanced ", value: "2-" },
  { label: "2 – Full ROM with gravity counterbalanced", value: "2" },
  { label: "2+ – Full ROM with gravity counterbalanced and a little resistance, no antigravity moment", value: "2+" },
  { label: "3− – Antigravity movement through part (most of range) ", value: "3-" },
  { label: "3 – Full range antigravity movement", value: "3" },
  { label: "3+ – Full antigravity ROM with some resistance through part of range", value: "3+" },
  { label: "4 – Full antigravity ROM with some resistance through the whole range", value: "4" },
  { label: "4+ – Full antigravity ROM with normal power in part of range", value: "4+" },
  { label: "5 – Full ROM with full normal resistance throughout range", value: "5" }
];

/* ===================== SCHEMA ===================== */

const MMT_SCHEMA = {
  title: "Manual Muscle Testing (MMT)",
  sections: [
    {
      title: "Upper Extremities",
      fields: [
                { type: "subheading", label: "Shoulder" },
{
  type: "paired-select",
  left: {
    name: "mmt_sh_flex_l",
    title: "Shoulder Flexion Left"
  },
  right: {
    name: "mmt_sh_flex_r",
    title: "Shoulder Flexion Right"
  },
  options: MMT_OPTIONS
},

{
  type: "paired-select",
  left: {
    name: "mmt_se_flex_l",
    title: "Shoulder Extension Left"
  },
  right: {
    name: "mmt_se_flex_r",
    title: "Shoulder Extension Right"
  },
  options: MMT_OPTIONS
},

{
  type: "paired-select",
  left: {
    name: "mmt_sa_flex_l",
    title: "Shoulder Abduction Left"
  },
  right: {
    name: "mmt_sa_flex_r",
    title: "Shoulder Abduction Right"
  },
  options: MMT_OPTIONS
},

{
  type: "paired-select",
  left: {
    name: "mmt_sad_flex_l",
    title: "Shoulder Adduction Left"
  },
  right: {
    name: "mmt_sad_flex_r",
    title: "Shoulder Adduction Right"
  },
  options: MMT_OPTIONS
},

{
  type: "paired-select",
  left: {
    name: "mmt_ir_flex_l",
    title: "Internal rotation Left"
  },
  right: {
    name: "mmt_ir_flex_r",
    title: "Internal rotation Right"
  },
  options: MMT_OPTIONS
},

{
  type: "paired-select",
  left: {
    name: "mmt_er_flex_l",
    title: "External rotation Left"
  },
  right: {
    name: "mmt_er_flex_r",
    title: "External rotation Right"
  },
  options: MMT_OPTIONS
},




        { type: "subheading", label: "Elbow" },
{
  type: "paired-select",
  left: {
    name: "mmt_el_flex_l",
    title: "Elbow Flexion Left"
  },
  right: {
    name: "mmt_el_flex_r",
    title: "Elbow Flexion Right"
  },
  options: MMT_OPTIONS
},

{
  type: "paired-select",
  left: {
    name: "mmt_el_ext_l",
    title: "Elbow Extension Left"
  },
  right: {
    name: "mmt_el_ext_r",
    title: "Elbow Extension Right"
  },
  options: MMT_OPTIONS
},

        { type: "subheading", label: "Wrist" },
{
  type: "paired-select",
  left: {
    name: "mmt_wr_flex_l",
    title: "Wrist Flexion Left"
  },
  right: {
    name: "mmt_wr_flex_r",
    title: "Wrist Flexion Right"
  },
  options: MMT_OPTIONS
},
{
  type: "paired-select",
  left: {
    name: "mmt_wr_ext_l",
    title: "Wrist Extension Left"
  },
  right: {
    name: "mmt_wr_ext_r",
    title: "Wrist Extension Right"
  },
  options: MMT_OPTIONS
},
      ]
    },

    {
      title: "Lower Extremities",
      fields: [
        { type: "subheading", label: "Hip" },

{
  type: "paired-select",
  left: {
    name: "mmt_hip_flex_l",
    title: "Hip Flexion Left"
  },
  right: {
    name: "mmt_hip_flex_r",
    title: "Hip Flexion Right"
  },
  options: MMT_OPTIONS
},

{
  type: "paired-select",
  left: {
    name: "mmt_hip_ext_l",
    title: "Hip Extension Left"
  },
  right: {
    name: "mmt_hip_ext_r",
    title: "Hip Extension Right"
  },
  options: MMT_OPTIONS
},
{
  type: "paired-select",
  left: {
    name: "mmt_hip_abd_l",
    title: "Hip Abduction Left"
  },
  right: {
    name: "mmt_hip_abd_r",
    title: "Hip Abduction Right"
  },
  options: MMT_OPTIONS
},
{
  type: "paired-select",
  left: {
    name: "mmt_hip_add_l",
    title: "Hip Adduction Left"
  },
  right: {
    name: "mmt_hip_add_r",
    title: "Hip Adduction Right"
  },
  options: MMT_OPTIONS
},
{
  type: "paired-select",
  left: {
    name: "mmt_hir_add_l",
    title: "Hip Internal rotation Left"
  },
  right: {
    name: "mmt_hir_add_r",
    title: "Hip Internal rotation Right"
  },
  options: MMT_OPTIONS
},
{
  type: "paired-select",
  left: {
    name: "mmt_her_add_l",
    title: "Hip External rotation Left"
  },
  right: {
    name: "mmt_her_add_r",
    title: "Hip External rotation Right"
  },
  options: MMT_OPTIONS
},






        { type: "subheading", label: "Knee" },

{
  type: "paired-select",
  left: {
    name: "mmt_knee_flex_l",
    title: "Knee Flexion Left"
  },
  right: {
    name: "mmt_knee_flex_r",
    title: "Knee Flexion Right"
  },
  options: MMT_OPTIONS
},
{
  type: "paired-select",
  left: {
    name: "mmt_knee_ext_l",
    title: "Knee Extension Left"
  },
  right: {
    name: "mmt_knee_ext_r",
    title: "Knee Extension Right"
  },
  options: MMT_OPTIONS
},
        { type: "subheading", label: "Ankle" },

        {
  type: "paired-select",
  left: {
    name: "mmt_ank_df_l",
    title: "Ankle Dorsiflexion Left"
  },
  right: {
    name: "mmt_ank_df_r",
    title: "Ankle Dorsiflexion Right"
  },
  options: MMT_OPTIONS
},

        {
  type: "paired-select",
  left: {
    name: "mmt_ank_pf_l",
    title: "Ankle Plantarflexion Left"
  },
  right: {
    name: "mmt_ank_pf_r",
    title: "Ankle Plantarflexion Right"
  },
  options: MMT_OPTIONS
},
                {
  type: "paired-select",
  left: {
    name: "mmt_ank_inv_l",
    title: "Ankle Inversion Left"
  },
  right: {
    name: "mmt_ank_inv_r",
    title: "Ankle Inversion Right"
  },
  options: MMT_OPTIONS
},

        {
  type: "paired-select",
  left: {
    name: "mmt_ank_evr_l",
    title: "Ankle Eversion Left"
  },
  right: {
    name: "mmt_ank_evr_r",
    title: "Ankle Eversion Right"
  },
  options: MMT_OPTIONS
},

      ]
    }
  ]
};

/* ===================== COMPONENT ===================== */

export default function MMTForm({ values, onChange }) {
  return (
    <CommonFormBuilder
      schema={MMT_SCHEMA}
      values={values}
      onChange={onChange}
       layout="nested"   // 👈 THIS is the key
    />
  );
}
