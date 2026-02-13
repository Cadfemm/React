import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== MMT OPTIONS (numbers as column headers) ===================== */

const MMT_OPTIONS = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2-", value: "2-" },
  { label: "2", value: "2" },
  { label: "2+", value: "2+" },
  { label: "3-", value: "3-" },
  { label: "3", value: "3" },
  { label: "3+", value: "3+" },
  { label: "4", value: "4" },
  { label: "4+", value: "4+" },
  { label: "5", value: "5" }
];

const MMT_INFO = {
  title: "MMT Scale",
  content: [
    "0 – Nothing, no muscle contraction",
    "1 – Flicker (palpable contraction, no movement)",
    "2− – Part ROM with gravity counterbalanced",
    "2 – Full ROM with gravity counterbalanced",
    "2+ – Full ROM with gravity counterbalanced and a little resistance, no antigravity moment",
    "3− – Antigravity movement through part (most of range)",
    "3 – Full range antigravity movement",
    "3+ – Full antigravity ROM with some resistance through part of range",
    "4 – Full antigravity ROM with some resistance through the whole range",
    "4+ – Full antigravity ROM with normal power in part of range",
    "5 – Full ROM with full normal resistance throughout range"
  ]
};

const mmt = (name, label) => ({ type: "radio-matrix", name, label, options: MMT_OPTIONS, info: MMT_INFO, showInfoInRow: false });

/* ===================== SCHEMA ===================== */

const MMT_SCHEMA = {
  title: "Manual Muscle Testing (MMT)",
  sections: [
    {
      title: "Upper Extremities",
      fields: [
        { type: "subheading", label: "Shoulder" },
        mmt("mmt_sh_flex_l", "Shoulder Flexion Left"),
        mmt("mmt_sh_flex_r", "Shoulder Flexion Right"),
        mmt("mmt_se_flex_l", "Shoulder Extension Left"),
        mmt("mmt_se_flex_r", "Shoulder Extension Right"),
        mmt("mmt_sa_flex_l", "Shoulder Abduction Left"),
        mmt("mmt_sa_flex_r", "Shoulder Abduction Right"),
        mmt("mmt_sad_flex_l", "Shoulder Adduction Left"),
        mmt("mmt_sad_flex_r", "Shoulder Adduction Right"),
        mmt("mmt_ir_flex_l", "Internal rotation Left"),
        mmt("mmt_ir_flex_r", "Internal rotation Right"),
        mmt("mmt_er_flex_l", "External rotation Left"),
        mmt("mmt_er_flex_r", "External rotation Right"),
        { type: "subheading", label: "Elbow" },
        mmt("mmt_el_flex_l", "Elbow Flexion Left"),
        mmt("mmt_el_flex_r", "Elbow Flexion Right"),
        mmt("mmt_el_ext_l", "Elbow Extension Left"),
        mmt("mmt_el_ext_r", "Elbow Extension Right"),
        { type: "subheading", label: "Wrist" },
        mmt("mmt_wr_flex_l", "Wrist Flexion Left"),
        mmt("mmt_wr_flex_r", "Wrist Flexion Right"),
        mmt("mmt_wr_ext_l", "Wrist Extension Left"),
        mmt("mmt_wr_ext_r", "Wrist Extension Right")
      ]
    },
    {
      title: "Lower Extremities",
      fields: [
        { type: "subheading", label: "Hip" },
        mmt("mmt_hip_flex_l", "Hip Flexion Left"),
        mmt("mmt_hip_flex_r", "Hip Flexion Right"),
        mmt("mmt_hip_ext_l", "Hip Extension Left"),
        mmt("mmt_hip_ext_r", "Hip Extension Right"),
        mmt("mmt_hip_abd_l", "Hip Abduction Left"),
        mmt("mmt_hip_abd_r", "Hip Abduction Right"),
        mmt("mmt_hip_add_l", "Hip Adduction Left"),
        mmt("mmt_hip_add_r", "Hip Adduction Right"),
        mmt("mmt_hir_add_l", "Hip Internal rotation Left"),
        mmt("mmt_hir_add_r", "Hip Internal rotation Right"),
        mmt("mmt_her_add_l", "Hip External rotation Left"),
        mmt("mmt_her_add_r", "Hip External rotation Right"),
        { type: "subheading", label: "Knee" },
        mmt("mmt_knee_flex_l", "Knee Flexion Left"),
        mmt("mmt_knee_flex_r", "Knee Flexion Right"),
        mmt("mmt_knee_ext_l", "Knee Extension Left"),
        mmt("mmt_knee_ext_r", "Knee Extension Right"),
        { type: "subheading", label: "Ankle" },
        mmt("mmt_ank_df_l", "Ankle Dorsiflexion Left"),
        mmt("mmt_ank_df_r", "Ankle Dorsiflexion Right"),
        mmt("mmt_ank_pf_l", "Ankle Plantarflexion Left"),
        mmt("mmt_ank_pf_r", "Ankle Plantarflexion Right"),
        mmt("mmt_ank_inv_l", "Ankle Inversion Left"),
        mmt("mmt_ank_inv_r", "Ankle Inversion Right"),
        mmt("mmt_ank_evr_l", "Ankle Eversion Left"),
        mmt("mmt_ank_evr_r", "Ankle Eversion Right")
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
      layout="nested"
    />
  );
}
