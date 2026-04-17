import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const questions = [
  "Not feeling rested and refreshed during the day?",
  "Sleeping, such as falling asleep, waking up frequently during the night or waking up too early in the morning?",
  "Remembering to do important things?",
  "Your usual daily activities because you felt sad or depressed?",
  "Your usual daily activities because you felt worried or anxious?",
  "Being irritable?",
  "Your temper?",
  "Your self-confidence?",
  "Thinking clearly?",
  "Analyzing and finding solutions to problems in day to day life?",
  "Hearing?",
  "Keeping your balance while maintaining a position or during movement?",
  "Bodily aches or pains?",
  "General endurance when performing physical activities?",
  "Muscle strength?",
  "Skin problems, such as broken skin, ulcers, bedsores and thinning of skin?",
  "Learning a new task (e.g., learning a new game, learning how to use the computer, learning how to use a tool, etc.)?",
  "Focusing attention on a specific task or e.g. filtering out distractions such as noise?",
  "Reading?",
  "Making decisions?",
  "Starting and completing a single task such as making your bed or cleaning up your desk or workplace?",
  "Carrying out your daily routine or day to day activities?",
  "Handling stress, crises, or conflict?",
  "Understanding body gestures, symbols and drawings?",
  "Starting and maintaining a conversation?",
  "Using communication devices such as using a telephone, telecommunication devices, and computers?",
  "Lifting and carrying objects weighing up to 5kg?",
  "Lifting and carrying objects weighing more than 5kg?",
  "Fine hand use such as handling objects, picking up, manipulating and releasing objects using the hand, fingers, and thumb?",
  "Walking a short distance (less than 1 km)?",
  "Walking a long distance (more than 1 km)?",
  "Moving around including crawling, climbing, and running?",
  "Using transportation as a passenger?",
  "Driving a car or any form of transportation?",
  "Getting dressed?",
  "Looking after your health such as maintaining a balanced diet, getting enough physical activity and seeing your doctor as needed?",
  "Your relationships with people?",
  "Having sufficient money to cover your cost of living?"
];

const options = Array.from({ length: 10 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1),
}));

export default function Part2MainSection({
  values = {},
  onChange,
}) {
  const totalScore = questions.reduce((sum, _, i) => {
    return sum + Number(values[`q${i + 1}`] || 0);
  }, 0);

  const reassessmentScore = questions.reduce((sum, _, i) => {
    return sum + Number(values[`rq${i + 1}`] || 0);
  }, 0);
values.grand_total = totalScore;
  const schema = {
    title: "Worq",
    sections: [
      {
        fields: [
        
          ...questions.map((q, i) => ({
            type: "radio",
            name: `q${i + 1}`,
            label: `${i + 1}. ${q}`,
            labelAbove: true,
            options,
          })),

{
  type: "score-box",
  name: "grand_total",
  label: "TOTAL PROFILE SCORE",
},

          {
            type: "radio",
            name: "glasses",
            label: "Do you wear glasses or contact lenses?",
            labelAbove: true,
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ],
          },

          {
            type: "radio",
            name: "q39",
            label:
              "39. Seeing and recognizing an object at arm’s length?",
            labelAbove: true,
            options,
          },

          {
            type: "radio",
            name: "q40",
            label:
              "40. Seeing and recognizing a person you know across the road (distance of about 20 meters or 66 feet)?",
            labelAbove: true,
            options,
          },

          {
            type: "subheading",
            label:
              "Overall in the past week, how long did it take you…",
          },

          {
            type: "textarea",
            name: "q41",
            label:
              "41. In the morning to get up and get ready (washed, dressed, have breakfast) to leave the house?",
          },

          {
            type: "textarea",
            name: "q42",
            label:
              "42. To do all the necessary things required throughout the whole week for your health, such as attending therapy, or medical consultations, or doing your exercises?",
          },

          // {
          //   type: "subheading",
          //   label: "REASSESSMENT",
          // },

          // {
          //   type: "date",
          //   name: "reassessment_date",
          //   label: "Date",
          //   placeholder: "Select date",
          // },

          // {
          //   type: "info-text",
          //   text: "Overall in the past week, to what extent did you have problems with…",
          // },

          // ...questions.map((q, i) => ({
          //   type: "radio",
          //   name: `rq${i + 1}`,
          //   label: `${i + 1}. ${q}`,
          //   labelAbove: true,
          //   options,
          // })),

          // {
          //   type: "info-text",
          //   text: `Reassessment score from Q1-Q38 : ${reassessmentScore}`,
          // },
        ],
      },
    ],
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