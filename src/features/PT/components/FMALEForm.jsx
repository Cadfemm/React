import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== SCORING OPTIONS ===================== */

const NONE_PARTIAL_FULL = [
  { label: "None", value: 0 },
  { label: "Partial", value: 1 },
  { label: "Full", value: 2 }
];

const NONE_CAN = [
  { label: "None", value: 0 },
  { label: "Can be elicited", value: 2 }
];

const MARKED_SLIGHT_NONE = [
  { label: "Marked", value: 0 },
  { label: "Slight", value: 1 },
  { label: "None", value: 2 }
];

const ANESTHESIA_NORMAL = [
  { label: "Anesthesia", value: 0 },
  { label: "Hypoesthesia / Dysesthesia", value: 1 },
  { label: "Normal", value: 2 }
];

const POSITION_SENSE = [
  { label: "less than 3/4correct or absence", value: 0 },
  { label: "3/4 correct or considerable difference", value: 1 },
  { label: "3/4 correct or considerable difference", value: 2 }
];

const PASSIVE_MOTION = [
  { label: "Only few degrees", value: 0 },
  { label: "Decreased", value: 1 },
  { label: "Normal", value: 2 },
];

const JOINT_PAIN = [
  { label: "Pronounced pain during movement", value: 0 },
  { label: "Some pain", value: 1 },
  { label: "No pain", value: 2 }
];



/* ===================== SCHEMA ===================== */

const FMA_LE_SCHEMA = {
  title: "Fugl–Meyer Assessment – Lower Extremity (FMA-LE)",
  subtitle: "Assessment of Sensorimotor Function",
  sections: [

    {
      title: "I. Reflex Activity (Supine)",
      fields: [
        { type: "radio-matrix", name: "reflex_knee_flexors", label: "Knee flexors", options: NONE_CAN },
        { type: "radio-matrix", name: "reflex_extensors", label: "Extensors (Patellar / Achilles (≥1))", options: NONE_CAN },
        { type: "score-box", name: "subtotal_I", label: "Subtotal I (Max 4)", readOnly: true }
      ]
    },

    {
      title: "II. Volitional Movement within Synergies (Supine)",
      fields: [
        { type: "radio-matrix", name: "flexor_hip", label: "Hip flexion", options: NONE_PARTIAL_FULL },
        { type: "radio-matrix", name: "flexor_knee", label: "Knee flexion", options: NONE_PARTIAL_FULL },
        { type: "radio-matrix", name: "flexor_ankle", label: "Ankle dorsiflexion", options: NONE_PARTIAL_FULL },
        { type: "radio-matrix", name: "extensor_hipe", label: "Hip extension", options: NONE_PARTIAL_FULL },
        { type: "radio-matrix", name: "extensor_hipa", label: "Hip adduction", options: NONE_PARTIAL_FULL },
        { type: "radio-matrix", name: "extensor_knee", label: "Knee extension", options: NONE_PARTIAL_FULL },
        { type: "radio-matrix", name: "extensor_ankle", label: "Ankle plantarflexion", options: NONE_PARTIAL_FULL },
        { type: "score-box", name: "subtotal_II", label: "Subtotal II (Max 14)", readOnly: true }
      ]
    },

    {
      title: "III. Volitional Movement Mixing Synergies (Sitting)",
      fields: [
        { type: "radio-matrix", name: "mix_knee", label: "Knee flexion", options: NONE_PARTIAL_FULL },
        { type: "radio-matrix", name: "mix_ankle", label: "Ankle dorsiflexion", options: NONE_PARTIAL_FULL },
        { type: "score-box", name: "subtotal_III", label: "Subtotal III (Max 4)", readOnly: true }
      ]
    },

    {
      title: "IV. Volitional Movement with Little or No Synergy (Standing)",
      fields: [
        { type: "radio-matrix", name: "nosyn_knee", label: "Knee flexion to 90°", options: NONE_PARTIAL_FULL },
        { type: "radio-matrix", name: "nosyn_ankle", label: "Ankle dorsiflexion", options: NONE_PARTIAL_FULL },
        { type: "score-box", name: "subtotal_IV", label: "Subtotal IV (Max 4)", readOnly: true }
      ]
    },

    {
      title: "V. Normal Reflex Activity",
        showIf: {
    field: "subtotal_IV",
    equals: 4
  },
      fields: [
        {
          type: "radio-matrix",
          name: "normal_reflex",
          label: "Reflex activity",
          options: [
            { label: "Hyper", value: 0 },
            { label: "Lively", value: 1 },
            { label: "Normal", value: 2 }
          ]
        },
        { type: "textarea", name: "subtotal_V", label: "Subtotal V (Max 2)", readOnly: true }
      ]
    },

{
  title: "F. Coordination / Speed – Movement Quality",
  fields: [
    {
      type: "radio-matrix",
      name: "coord_tremor",
      label: "Tremor",
      options: MARKED_SLIGHT_NONE
    },
    {
      type: "radio-matrix",
      name: "coord_dysmetria",
      label: "Dysmetria",
      options: MARKED_SLIGHT_NONE
    }
  ]
},

{
 
  fields: [
    {
      type: "radio-matrix",
      name: "coord_time",
      label: "Time difference",
      options: [
        { label: "≥ 6s", value: 0 },
        { label: "2–5s", value: 1 },
        { label: "< 2s", value: 2 }
      ]
    },
    {
      type: "core-box",
      name: "subtotal_F",
      readOnly: true
    }
  ]
},

    {
     
      fields: [
        { type: "score-box", name: "total_EF", label: "TOTAL E – F (Motor Function) /34", readOnly: true }
      ]
    },

{
  title: "H. Sensation (Lower Extremity)",
  fields: [
    { type: "radio-matrix", name: "sens_light_leg", label: "Light touch – Leg", options: ANESTHESIA_NORMAL },
    { type: "radio-matrix", name: "sens_light_foot", label: "Light touch – Foot (sole)", options: ANESTHESIA_NORMAL },
  ]},
  {
    
  fields: [
    { type: "radio-matrix", name: "pos_hip", label: "Position Hip", options: POSITION_SENSE },
    { type: "radio-matrix", name: "pos_knee", label: "Position Knee", options: POSITION_SENSE },
    { type: "radio-matrix", name: "pos_ankle", label: "Position Ankle", options: POSITION_SENSE },
    { type: "radio-matrix", name: "pos_toe", label: "Position Great toe", options: POSITION_SENSE },

    { type: "score-box", name: "subtotal_H", label: "Total H (Max 12)", readOnly: true }
  ]
},

{
  title: "I. Passive Joint Motion (Lower Extremity)",
  fields: [
    { type: "radio-matrix", name: "pm_hip_flex", label: "Hip Flexion", options: PASSIVE_MOTION },
    { type: "radio-matrix", name: "pm_hip_abd", label: "Hip Abduction", options: PASSIVE_MOTION },
    { type: "radio-matrix", name: "pm_hip_er", label: "Hip External rotation", options: PASSIVE_MOTION },
    { type: "radio-matrix", name: "pm_hip_ir", label: "Hip Internal rotation", options: PASSIVE_MOTION },

    { type: "radio-matrix", name: "pm_knee_flex", label: "Knee Flexion", options: PASSIVE_MOTION },
    { type: "radio-matrix", name: "pm_knee_ext", label: "Knee Extension", options: PASSIVE_MOTION },

    { type: "radio-matrix", name: "pm_ankle_df", label: "Ankle Dorsiflexion", options: PASSIVE_MOTION },
    { type: "radio-matrix", name: "pm_ankle_pf", label: "Ankle Plantarflexion", options: PASSIVE_MOTION },

    { type: "radio-matrix", name: "pm_foot_pro", label: "Foot Pronation", options: PASSIVE_MOTION },
    { type: "radio-matrix", name: "pm_foot_sup", label: "Foot Supination", options: PASSIVE_MOTION },

    { type: "score-box", name: "subtotal_I_motion", label: "Total I (Max 20)", readOnly: true }
  ]
},

{
  title: "J. Joint Pain during Passive Motion",
  fields: [
{ type: "radio-matrix", name: "jp_hip_flex", label: "Hip Flexion", options: JOINT_PAIN },
    { type: "radio-matrix", name: "jp_hip_abd", label: "Hip Abduction", options: JOINT_PAIN },
    { type: "radio-matrix", name: "jp_hip_er", label: "Hip External rotation", options: JOINT_PAIN },
    { type: "radio-matrix", name: "jp_hip_ir", label: "Hip Internal rotation", options: JOINT_PAIN },

    { type: "radio-matrix", name: "jp_knee_flex", label: "Knee Flexion", options: JOINT_PAIN },
    { type: "radio-matrix", name: "jp_knee_ext", label: "Knee Extension", options: JOINT_PAIN },

    { type: "radio-matrix", name: "jp_ankle_df", label: "Ankle Dorsiflexion", options: JOINT_PAIN },
    { type: "radio-matrix", name: "jp_ankle_pf", label: "Ankle Plantarflexion", options: JOINT_PAIN },

    { type: "radio-matrix", name: "jp_foot_pro", label: "Foot Pronation", options: JOINT_PAIN },
    { type: "radio-matrix", name: "jp_foot_sup", label: "Foot Supination", options: JOINT_PAIN },

    { type: "score-box", name: "subtotal_J", label: "Total J (Max 20)", readOnly: true }
  ]
},


    {
  title: "Final Scores",
  fields: [
    { type: "score-box", name: "score_E", label: "E. Lower Extremity /28", readOnly: true },
    { type: "score-box", name: "score_F", label: "F. Coordination /6", readOnly: true },
    { type: "score-box", name: "score_EF", label: "TOTAL E–F (Motor) /34", readOnly: true },

    { type: "score-box", name: "score_H", label: "H. Sensation /12", readOnly: true },
    { type: "score-box", name: "score_I", label: "I. Passive Joint Motion /20", readOnly: true },
    { type: "score-box", name: "score_J", label: "J. Joint Pain /20", readOnly: true }
  ]
},
  ]
};

/* ===================== CALCULATION ===================== */

const sum = (vals, keys) =>
  keys.reduce((t, k) => t + (Number(vals[k]) || 0), 0);

/* ===================== COMPONENT ===================== */

export default function FMALEAssessment() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) =>
    setValues(v => ({ ...v, [name]: value }));

  useEffect(() => {
    const subtotal_I = sum(values, ["reflex_knee_flexors", "reflex_extensors"]);
    const subtotal_II = sum(values, [
      "flexor_hip", "flexor_knee", "flexor_ankle","extensor_hipe",
      "extensor_hipa", "extensor_knee", "extensor_ankle"
    ]);
    const subtotal_III = sum(values, ["mix_knee", "mix_ankle"]);
    const subtotal_IV = sum(values, ["nosyn_knee", "nosyn_ankle"]);
    const subtotal_V = values.normal_reflex ?? 0;
    const subtotal_F = sum(values, ["coord_tremor", "coord_dysmetria", "coord_time"]);
const subtotal_H = sum(values, [
  "sens_light_leg", "sens_light_foot",
  "pos_hip", "pos_knee", "pos_ankle", "pos_toe"
]);

const subtotal_I_motion = sum(values, [
  "pm_hip_flex","pm_hip_abd","pm_hip_er","pm_hip_ir",
  "pm_knee_flex","pm_knee_ext",
  "pm_ankle_df","pm_ankle_pf",
  "pm_foot_pro","pm_foot_sup"
]);

const subtotal_J = sum(values, [
  "jp_hip_flex","jp_hip_abd","jp_hip_er","jp_hip_ir",
  "jp_knee_flex","jp_knee_ext",
  "jp_ankle_df","jp_ankle_pf",
  "jp_foot_pro","jp_foot_sup"
]);

setValues(v => ({
  ...v,
  subtotal_H,
  subtotal_I_motion,
  subtotal_J,

  score_E: subtotal_I + subtotal_II + subtotal_III + subtotal_IV + subtotal_V,
  score_F: subtotal_F,
  score_EF: total_EF,
  score_H: subtotal_H,
  score_I: subtotal_I_motion,
  score_J: subtotal_J
}));

    const total_EF =
      subtotal_I +
      subtotal_II +
      subtotal_III +
      subtotal_IV +
      subtotal_V +
      subtotal_F;

    setValues(v => ({
      ...v,
      subtotal_I,
      subtotal_II,
      subtotal_III,
      subtotal_IV,
      subtotal_V,
      subtotal_F,
      total_EF
    }));
  }, [values.reflex_knee_flexors,
      values.reflex_extensors,
      values.flexor_hip,
      values.flexor_knee,
      values.flexor_ankle,
      values.extensor_hipe,
      values.extensor_hipa,
      values.extensor_knee,
      values.extensor_ankle,
      values.mix_knee,
      values.mix_ankle,
      values.nosyn_knee,
      values.nosyn_ankle,
      values.normal_reflex,
      values.coord_tremor,
      values.coord_dysmetria,
      values.coord_time,
    values.sens_light_leg,
  values.sens_light_foot,
 values.pos_hip,
 values.pos_knee,
 values.pos_ankle,
 values.pos_toe,
  values.pm_hip_flex,values.pm_hip_abd,values.pm_hip_er,values.pm_hip_ir,
  values.pm_knee_flex,values.pm_knee_ext,
  values.pm_ankle_df,values.pm_ankle_pf,
  values.pm_foot_pro,values.pm_foot_sup,
  values.jp_hip_flex,values.jp_hip_abd,values.jp_hip_er,values.jp_hip_ir,
  values.jp_knee_flex,values.jp_knee_ext,
  values.jp_ankle_df,values.jp_ankle_pf,
  values.jp_foot_pro,values.jp_foot_sup
  ]);

  return (
    <CommonFormBuilder
      schema={FMA_LE_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
      submitted={submitted}
    >
      <button
        style={{ padding: "10px 16px", fontWeight: 600 }}
        onClick={() => setSubmitted(true)}
      >
        Save Assessment
      </button>
    </CommonFormBuilder>
  );
}
