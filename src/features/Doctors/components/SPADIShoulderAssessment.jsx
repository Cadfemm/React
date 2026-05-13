import { useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function SPADIShoulderAssessment({ values, onChange }) {
  const scaleColumns = [
    { label: "0", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 }
  ];

  const schema = useMemo(() => {
    return {
      title: "Shoulder Pain and Disability Index (SPADI)",
      sections: [
        {
          title: "Pain Scale",
          fields: [
            {
              type: "info-text",
              text: "Rate your pain level (0 = no pain, 10 = worst pain imaginable)"
            },
            {
              type: "scale-table",
              name: "spadi_pain",
              label: "Pain Questions",
              columns: scaleColumns,
              rows: [
                "At its worst?",
                "When lying on the involved side?",
                "Reaching for something on a high shelf?",
                "Touching the back of your neck?",
                "Pushing with the involved arm?"
              ]
            }
          ]
        },
        {
          title: "Disability Scale",
          fields: [
            {
              type: "info-text",
              text: "Rate your difficulty level (0 = no difficulty, 10 = so difficult it requires help)"
            },
            {
              type: "scale-table",
              name: "spadi_disability",
              label: "Disability Questions",
              columns: scaleColumns,
              rows: [
                "Washing your hair?",
                "Washing your back?",
                "Putting on an undershirt or jumper?",
                "Putting on a shirt that buttons down the front?",
                "Putting on your pants?",
                "Placing an object on a high shelf?",
                "Carrying a heavy object of 10 pounds (4.5 kilograms)?",
                "Removing something from your back pocket?"
              ]
            }
          ]
        }
      ]
    };
  }, []);

  const calculateScores = () => {
    const painValues = [];
    const disabilityValues = [];

    for (let i = 0; i < 5; i++) {
      const val = values[`spadi_pain_${i}`];
      if (val !== undefined) painValues.push(Number(val));
    }

    for (let i = 0; i < 8; i++) {
      const val = values[`spadi_disability_${i}`];
      if (val !== undefined) disabilityValues.push(Number(val));
    }

    const painSum = painValues.reduce((a, b) => a + b, 0);
    const disabilitySum = disabilityValues.reduce((a, b) => a + b, 0);

    const painScore = painValues.length > 0 ? Math.round((painSum / (painValues.length * 10)) * 100) : 0;
    const disabilityScore = disabilityValues.length > 0 ? Math.round((disabilitySum / (disabilityValues.length * 10)) * 100) : 0;
    const totalScore = Math.round((painScore + disabilityScore) / 2);

    return { painScore, disabilityScore, totalScore };
  };

  const scores = calculateScores();

  return (
    <div>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={onChange}
        layout="nested"
      />
      <div style={{ background: "#eff6ff", border: "2px solid #3b82f6", borderRadius: 10, padding: "16px 20px", marginTop: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#1e40af", marginBottom: 12 }}>Interpretation of Scores</div>
        <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>
          <div style={{ marginBottom: 8 }}>Total pain score: <strong>{scores.painScore}%</strong></div>
          <div style={{ marginBottom: 8 }}>Total disability score: <strong>{scores.disabilityScore}%</strong></div>
          <div style={{ marginBottom: 8 }}>Total SPADI score: <strong>{scores.totalScore}%</strong></div>
          <div style={{ marginTop: 12, fontSize: 11, color: "#6b7280", fontStyle: "italic" }}>
            The means of the two subscales are averaged to produce a total score ranging from 0 (best) to 100 (worst).
          </div>
        </div>
      </div>
    </div>
  );
}
