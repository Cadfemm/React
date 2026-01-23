import React, { useMemo, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== OPTIONS ===================== */

const OPT_0_8 = Array.from({ length: 9 }, (_, i) => ({
  label: String(i),
  value: i
}));

const OPT_0_6 = Array.from({ length: 7 }, (_, i) => ({
  label: String(i),
  value: i
}));

const OPT_0_4 = Array.from({ length: 5 }, (_, i) => ({
  label: String(i),
  value: i
}));

/* ===================== SCHEMA ===================== */

const SARA_SCHEMA = {
  title: "Scale for the Assessment and Rating of Ataxia (SARA)",
  subtitle: "Neurological Ataxia Assessment",

  sections: [
    /* ---------------- Q1–Q4 ---------------- */

    {
      title: "1. Gait",
      fields: [
        {
          type: "single-select",
          name: "gait",
          label: "Gait (0–8)",
          options: OPT_0_8
        }
      ]
    },

    {
      title: "2. Stance",
      fields: [
        {
          type: "single-select",
          name: "stance",
          label: "Stance (0–6)",
          options: OPT_0_6
        }
      ]
    },

    {
      title: "3. Sitting",
      fields: [
        {
          type: "single-select",
          name: "sitting",
          label: "Sitting (0–4)",
          options: OPT_0_4
        }
      ]
    },

    {
      title: "4. Speech Disturbance",
      fields: [
        {
          type: "single-select",
          name: "speech",
          label: "Speech (0–6)",
          options: OPT_0_6
        }
      ]
    },

    /* ---------------- Q5–Q8 (RADIO MATRIX) ---------------- */

    {
      title: "5. Finger Chase",
      fields: [
        {
          type: "radio-matrix",
          name: "finger_chase_right",
          label: "Finger Chase Right",
          options: OPT_0_4,
          info: {
            content: [
              "4 – Unable to perform 5 pointing movements ",
              "3 – Dysmetria, under/ overshooting target > 15 cm",
              "2 – Dysmetria, under/ overshooting target < 15 cm",
              "1 – Dysmetria, under/ overshooting target <5 cm ",
              "0 – No dysmetria"
            ]
          }
        },
        {
          type: "radio-matrix",
          name: "finger_chase_left",
          label: "Finger Chase Left",
          options: OPT_0_4,
          info: {
            content: [
              "4 – Unable to perform 5 pointing movements ",
              "3 – Dysmetria, under/ overshooting target > 15 cm",
              "2 – Dysmetria, under/ overshooting target < 15 cm",
              "1 – Dysmetria, under/ overshooting target <5 cm ",
              "0 – No dysmetria"
            ]
          }
        },
        {
          type: "score-box",
          name: "finger_chase_mean",
          label: "Finger Chase Mean"
        },
         {
          type: "radio-matrix",
          name: "nose_finger_right",
          label: "Nose-finger Right",
          options: OPT_0_4,
                    info: {
            content: [
              "4 – Unable to perform 5 pointing movements ",
              "3 – Dysmetria, under/ overshooting target > 15 cm",
              "2 – Dysmetria, under/ overshooting target < 15 cm",
              "1 – Tremor with an amplitude < 2 cm",
              "0 – No tremor"
            ]
          }
        },
        {
          type: "radio-matrix",
          name: "nose_finger_left",
          label: "Nose-finger Left",
          options: OPT_0_4,
                    info: {
            content: [
              "4 – Unable to perform 5 pointing movements ",
              "3 – Dysmetria, under/ overshooting target > 15 cm",
              "2 – Dysmetria, under/ overshooting target < 15 cm",
              "1 – Dysmetria, under/ overshooting target <5 cm ",
              "0 – No dysmetria"
            ]
          }
        },
        {
          type: "score-box",
          name: "nose_finger_mean",
          label: "Mean (R+L)/2"
        }
      ]
    },

    {
      title: "6. Nose–Finger Test",
      fields: [
        {
          type: "radio-matrix",
          name: "nose_finger_right",
          label: "Right",
          options: OPT_0_4
        },
        {
          type: "radio-matrix",
          name: "nose_finger_left",
          label: "Left",
          options: OPT_0_4
        },
        {
          type: "score-box",
          name: "nose_finger_mean",
          label: "Mean (R+L)/2"
        }
      ]
    },

    {
      title: "7. Fast Alternating Hand Movements",
      fields: [
        {
          type: "radio-matrix",
          name: "fast_hand_right",
          label: "Right",
          options: OPT_0_4
        },
        {
          type: "radio-matrix",
          name: "fast_hand_left",
          label: "Left",
          options: OPT_0_4
        },
        {
          type: "score-box",
          name: "fast_hand_mean",
          label: "Mean (R+L)/2"
        }
      ]
    },

    {
      title: "8. Heel–Shin Slide",
      fields: [
        {
          type: "radio-matrix",
          name: "heel_shin_right",
          label: "Right",
          options: OPT_0_4
        },
        {
          type: "radio-matrix",
          name: "heel_shin_left",
          label: "Left",
          options: OPT_0_4
        },
        {
          type: "score-box",
          name: "heel_shin_mean",
          label: "Mean (R+L)/2"
        }
      ]
    },

    /* ---------------- TOTAL ---------------- */

    {
      title: "Final SARA Score",
      fields: [
        {
          type: "score-box",
          name: "sara_total",
          label: "Total SARA Score (0–40)"
        }
      ]
    }
  ]
};

/* ===================== COMPONENT ===================== */

export default function SARAForm() {
  const [values, setValues] = useState({});

  const num = (v) => (v === "" || v == null ? 0 : Number(v));

  const mean = (r, l) =>
    Number(((num(r) + num(l)) / 2).toFixed(1));

  /* ===================== CALCULATIONS ===================== */

  const computed = useMemo(() => {
    const finger_chase_mean = mean(
      values.finger_chase_right,
      values.finger_chase_left
    );

    const nose_finger_mean = mean(
      values.nose_finger_right,
      values.nose_finger_left
    );

    const fast_hand_mean = mean(
      values.fast_hand_right,
      values.fast_hand_left
    );

    const heel_shin_mean = mean(
      values.heel_shin_right,
      values.heel_shin_left
    );

    const sara_total = Number(
      (
        num(values.gait) +
        num(values.stance) +
        num(values.sitting) +
        num(values.speech) +
        finger_chase_mean +
        nose_finger_mean +
        fast_hand_mean +
        heel_shin_mean
      ).toFixed(1)
    );

    return {
      finger_chase_mean,
      nose_finger_mean,
      fast_hand_mean,
      heel_shin_mean,
      sara_total
    };
  }, [values]);

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <CommonFormBuilder
      schema={SARA_SCHEMA}
      values={{ ...values, ...computed }}
       layout="nested"
      onChange={onChange}
    />
  );
}
