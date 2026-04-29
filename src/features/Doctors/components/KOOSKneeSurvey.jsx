import { useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function KOOSKneeSurvey({ values, onChange }) {
  const schema = useMemo(() => {
    return {
      title: "KOOS Knee Survey",
      sections: [
        {
          title: "Symptoms",
          fields: [
            {
              name: "koos_s1",
              label: "Do you have swelling in your knee?",
              type: "radio",
              position: "below",
              options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
            },
            {
              name: "koos_s2",
              label: "Do you feel grinding, hear clicking or any other type of noise when your knee moves?",
              type: "radio",
              position: "below",
              options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
            },
            {
              name: "koos_s3",
              label: "Does your knee catch or hang up when moving?",
              type: "radio",
              position: "below",
              options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
            },
            {
              name: "koos_s4",
              label: "Can you straighten your knee fully?",
              type: "radio",
              position: "below",
              options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
            },
            {
              name: "koos_s5",
              label: "Can you bend your knee fully?",
              type: "radio",
              position: "below",
              options: ["Always", "Often", "Sometimes", "Rarely", "Never"]
            },
            {
              name: "koos_s6",
              label: "How severe is your knee joint stiffness after first wakening in the morning?",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_s7",
              label: "How severe is your knee stiffness after sitting, lying or resting later in the day?",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            }
          ]
        },
        {
          title: "Pain",
          fields: [
            {
              name: "koos_p1",
              label: "How often do you experience knee pain?",
              type: "radio",
              position: "below",
              options: ["Never", "Monthly", "Weekly", "Daily", "Always"]
            },
            {
              name: "koos_p2",
              label: "Twisting/pivoting on your knee",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_p3",
              label: "Straightening knee fully",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_p4",
              label: "Bending knee fully",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_p5",
              label: "Walking on flat surface",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_p6",
              label: "Going up or down stairs",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_p7",
              label: "At night while in bed",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_p8",
              label: "Sitting or lying",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_p9",
              label: "Standing upright",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            }
          ]
        },
        {
          title: "Function, Daily Living",
          fields: [
            {
              name: "koos_a1",
              label: "Descending stairs",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a2",
              label: "Ascending stairs",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a3",
              label: "Rising from sitting",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a4",
              label: "Standing",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a5",
              label: "Bending to floor/pick up an object",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a6",
              label: "Walking on flat surface",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a7",
              label: "Getting in/out of car",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a8",
              label: "Going shopping",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a9",
              label: "Putting on socks/stockings",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a10",
              label: "Rising from bed",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a11",
              label: "Taking off socks/stockings",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a12",
              label: "Lying in bed (turning over, maintaining knee position)",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a13",
              label: "Getting in/out of bath",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a14",
              label: "Sitting",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a15",
              label: "Getting on/off toilet",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a16",
              label: "Heavy domestic duties (moving heavy boxes, scrubbing floors, etc)",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_a17",
              label: "Light domestic duties (cooking, dusting, etc)",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            }
          ]
        },
        {
          title: "Function, Sports and Recreational Activities",
          fields: [
            {
              name: "koos_sp1",
              label: "Squatting",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_sp2",
              label: "Running",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_sp3",
              label: "Jumping",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_sp4",
              label: "Twisting/pivoting on your injured knee",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            },
            {
              name: "koos_sp5",
              label: "Kneeling",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            }
          ]
        },
        {
          title: "Quality of Life",
          fields: [
            {
              name: "koos_q1",
              label: "How often are you aware of your knee problem?",
              type: "radio",
              position: "below",
              options: ["Never", "Monthly", "Weekly", "Daily", "Constantly"]
            },
            {
              name: "koos_q2",
              label: "Have you modified your life style to avoid potentially damaging activities to your knee?",
              type: "radio",
              position: "below",
              options: ["Not at all", "Mildly", "Moderately", "Severely", "Totally"]
            },
            {
              name: "koos_q3",
              label: "How much are you troubled with lack of confidence in your knee?",
              type: "radio",
              position: "below",
              options: ["Not at all", "Mildly", "Moderately", "Severely", "Extremely"]
            },
            {
              name: "koos_q4",
              label: "In general, how much difficulty do you have with your knee?",
              type: "radio",
              position: "below",
              options: ["None", "Mild", "Moderate", "Severe", "Extreme"]
            }
          ]
        }
      ]
    };
  }, []);

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}
