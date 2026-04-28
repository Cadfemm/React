import { useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function BCTQAssessment({ values, onChange }) {
  const scaleColumns = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 }
  ];

  const schema = useMemo(() => {
    return {
      title: "Boston Carpal Tunnel Syndrome Questionnaire (BCTQ)",
      sections: [
        {
          title: "Part 1: Symptom Severity Scale (1 = Normal, 5 = Very Serious)",
          fields: [
            {
              type: "scale-table",
              name: "bctq_sss",
              label: "Symptom Severity Questions",
              columns: scaleColumns,
              rows: [
                "1. How severe is the hand/wrist pain that you have at night?",
                "2. How often did hand/wrist pain wake you up during a typical night in the past two weeks?",
                "3. Do you typically have pain in your hand/wrist during the daytime?",
                "4. How often do you have hand/wrist pain during daytime?",
                "5. How long on average does an episode of pain last during the daytime?",
                "6. Do you have numbness in your hand/wrist?",
                "7. Do you have weakness in your hand/wrist?",
                "8. Do you have tingling sensations in your hand?",
                "9. How severe is numbness (loss of sensation) or tingling at night?",
                "10. How often did hand weakness or tingling wake you up during a typical night in the past two weeks?",
                "11. Do you have difficulty with the grasping and use of small objects such as keys or pens?"
              ]
            }
          ]
        }
      ]
    };
  }, []);

  const calculateScores = () => {
    const sssValues = [];

    for (let i = 0; i < 11; i++) {
      const val = values[`bctq_sss_${i}`];
      if (val !== undefined) sssValues.push(Number(val));
    }

    const sssMean = sssValues.length > 0 ? (sssValues.reduce((a, b) => a + b, 0) / sssValues.length).toFixed(2) : 0;

    return { sssMean, sssAnswered: sssValues.length };
  };

  const { sssMean, sssAnswered } = calculateScores();

  const getInterpretation = (score) => {
    const num = parseFloat(score);
    if (num >= 1.0 && num <= 1.9) return "Minimal symptoms / No difficulty";
    if (num >= 2.0 && num <= 2.9) return "Mild symptoms / Mild difficulty";
    if (num >= 3.0 && num <= 3.9) return "Moderate symptoms / Moderate difficulty";
    if (num >= 4.0 && num <= 5.0) return "Severe symptoms / Severe difficulty";
    return "Not yet scored";
  };

  return (
    <div>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={onChange}
        layout="nested"
      />
      <div style={{ background: "#eff6ff", border: "2px solid #3b82f6", borderRadius: 10, padding: "16px 20px", marginTop: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#1e40af", marginBottom: 12 }}>Symptom Severity Score</div>
        <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.8 }}>
          <div style={{ marginBottom: 10 }}>
            <strong>Score:</strong> {sssMean} {sssAnswered === 11 && `(${getInterpretation(sssMean)})`}
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: "#6b7280", fontStyle: "italic" }}>
            Interpretation: 1.0–1.9 = Minimal, 2.0–2.9 = Mild, 3.0–3.9 = Moderate, 4.0–5.0 = Severe
          </div>
        </div>
      </div>
    </div>
  );
}
