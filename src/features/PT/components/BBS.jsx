import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== BBS SCALE ===================== */
const BBS_SCALE = [
  { label: "0", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 }
];

/* ===================== SCHEMA ===================== */
const BBS_SCHEMA = {
  title: "Berg Balance Scale (BBS)",
  subtitle: "Balance Assessment – Maximum Score 56",
  sections: [
    {
      fields: [
        {
          name: "bbs_1",
          label: "1. Sitting to Standing",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "BBS Scale",
            content: [
              "4 – Independent / No assistance needed",
              "3 – Independent with supervision",
              "2 – Minimal assistance",
              "1 – Moderate assistance",
              "0 – Maximal assistance / Unable"
            ]
          },
          rowInfo: {
            title: "Scoring – Sitting to Standing",
            content: [
              "4 – Able to stand without using hands independently",
              "3 – Able to stand using hands independently",
              "2 – Able to stand using hands after >1 attempt",
              "1 – Needs assistance to stand or stabilize",
              "0 – Needs moderate or maximal assistance"
            ]
          },
          showInfoInRow: true
        },
        {
          name: "bbs_2",
          label: "2. Standing Unsupported",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Standing Unsupported",
            content: [
              "4 – Able to stand safely for 2 minutes",
              "3 – Able to stand 2 minutes with supervision",
              "2 – Able to stand 30 seconds unsupported",
              "1 – Needs >1 attempt to stand 30 seconds unsupported",
              "0 – Unable to stand 30 seconds unsupported"
            ]
          }
        },
        {
          name: "bbs_3",
          label: "3. Sitting with No Back Support (Feet Supported)",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Sitting Unsupported",
            content: [
              "4 – Able to sit safely for 2 minutes",
              "3 – Able to sit 2 minutes under supervision",
              "2 – Able to sit 30 seconds",
              "1 – Able to sit 10 seconds",
              "0 – Unable to sit without support for 10 seconds"
            ]
          }
        },
        {
          name: "bbs_4",
          label: "4. Standing to Sitting",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Standing to Sitting",
            content: [
              "4 – Sits safely with minimal use of hands",
              "3 – Controls descent using hands",
              "2 – Uses back of legs against chair",
              "1 – Sits independently but uncontrolled",
              "0 – Needs assistance"
            ]
          }
        },
        {
          name: "bbs_5",
          label: "5. Pivot Transfers",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Transfers",
            content: [
              "4 – Transfers safely with minimal use of hands",
              "3 – Transfers safely but needs hands",
              "2 – Transfers with verbal cues or supervision",
              "1 – Needs one person assist",
              "0 – Needs two person assist or supervision"
            ]
          }
        },
        {
          name: "bbs_6",
          label: "6. Standing Unsupported – Eyes Closed",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Eyes Closed",
            content: [
              "4 – Stands safely for 10 seconds",
              "3 – Stands 10 seconds with supervision",
              "2 – Stands for 3 seconds",
              "1 – Unable to keep eyes closed for 3 seconds but stands safely",
              "0 – Needs assistance"
            ]
          }
        },
        {
          name: "bbs_7",
          label: "7. Standing Unsupported – Feet Together",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Feet Together",
            content: [
              "4 – Places feet together independently and stands 1 minute safely",
              "3 – Stands 1 minute with supervision",
              "2 – Unable to hold position for 30 seconds",
              "1 – Needs assistance to attain position, holds 15 seconds",
              "0 – Needs assistance and unable to hold 15 seconds"
            ]
          }
        },
        {
          name: "bbs_8",
          label: "8. Reaching Forward with Outstretched Arm",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Forward Reach",
            content: [
              "4 – Reaches forward confidently ≥10 inches",
              "3 – Reaches forward ≥5 inches",
              "2 – Reaches forward ≥2 inches",
              "1 – Reaches but needs supervision",
              "0 – Loses balance or needs assistance"
            ]
          }
        },
        {
          name: "bbs_9",
          label: "9. Pick Up Object From Floor",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Pick Up Object",
            content: [
              "4 – Able to pick up object safely",
              "3 – Picks up object with supervision",
              "2 – Unable but reaches 1–2 inches from object safely",
              "1 – Unable and needs supervision",
              "0 – Unable and needs assistance"
            ]
          }
        },
        {
          name: "bbs_10",
          label: "10. Turn to Look Over Shoulders",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Look Over Shoulders",
            content: [
              "4 – Looks behind from both sides with good weight shift",
              "3 – Looks behind from one side only",
              "2 – Turns sideways but maintains balance",
              "1 – Needs supervision",
              "0 – Needs assistance"
            ]
          }
        },
        {
          name: "bbs_11",
          label: "11. Turn 360 Degrees",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Turn 360°",
            content: [
              "4 – Turns safely in 4 seconds or less",
              "3 – Turns safely one side only in 4 seconds or less",
              "2 – Turns safely but slowly",
              "1 – Needs supervision or verbal cues",
              "0 – Needs assistance"
            ]
          }
        },
        {
          name: "bbs_12",
          label: "12. Place Foot on Stool",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Foot on Stool",
            content: [
              "4 – Completes 8 steps independently in 20 seconds",
              "3 – Completes 8 steps in >20 seconds",
              "2 – Completes 4 steps with supervision",
              "1 – Completes >2 steps with minimal assistance",
              "0 – Needs assistance to prevent fall"
            ]
          }
        },
        {
          name: "bbs_13",
          label: "13. Standing Unsupported – One Foot in Front",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Tandem Standing",
            content: [
              "4 – Holds tandem stance independently for 30 seconds",
              "3 – Places foot ahead independently and holds 30 seconds",
              "2 – Small step independently for 30 seconds",
              "1 – Needs assistance to step but holds 15 seconds",
              "0 – Loses balance"
            ]
          }
        },
        {
          name: "bbs_14",
          label: "14. Standing on One Leg",
          type: "radio-matrix",
          options: BBS_SCALE,
          info: {
            title: "Scoring – Single Leg Stance",
            content: [
              "4 – Lifts leg independently and holds >10 seconds",
              "3 – Holds 5–10 seconds",
              "2 – Holds ≥3 seconds",
              "1 – Attempts to lift but unable to hold 3 seconds",
              "0 – Unable"
            ]
          }
        },

        /* ===== TOTAL SCORE ===== */
        {
          name: "bbs_total",
          label: "Total BBS Score",
          type: "score-box"
        }
      ]
    }
  ]
};


/* ===================== COMPONENT ===================== */
export default function BergBalanceScale({ values, onChange }) {

  /* ===== AUTO TOTAL ===== */
  React.useEffect(() => {
    const total = Array.from({ length: 14 }, (_, i) =>
      Number(values[`bbs_${i + 1}`] || 0)
    ).reduce((a, b) => a + b, 0);

    if (values.bbs_total !== total) {
      onChange("bbs_total", total);
    }
  }, [values, onChange]);

  return (
    <CommonFormBuilder
      schema={BBS_SCHEMA}
      values={values}
      layout="nested"
      onChange={onChange}
    />
  );
}
