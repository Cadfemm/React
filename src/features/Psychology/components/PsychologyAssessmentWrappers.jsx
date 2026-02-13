import React, { useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

// Wrapper for DASS-21
export function DASS21Wrapper({ values, onChange }) {
  const DEPRESSION = ["q3", "q5", "q10", "q13", "q16", "q17", "q21"];
  const ANXIETY = ["q2", "q4", "q7", "q9", "q15", "q19", "q20"];
  const STRESS = ["q1", "q6", "q8", "q11", "q12", "q14", "q18"];

  // Extract DASS values from parent values using namespace
  const dassValues = useMemo(() => {
    const result = {};
    for (let i = 1; i <= 21; i++) {
      const key = `dass21_q${i}`;
      if (values[key] !== undefined) {
        result[`q${i}`] = values[key];
      }
    }
    return result;
  }, [values]);

  const handleChange = (name, value) => {
    onChange(`dass21_${name}`, value);
  };

  const calc = (keys) =>
    keys.reduce((sum, k) => sum + (dassValues[k] ?? 0), 0);

  const scores = useMemo(() => ({
    depression: calc(DEPRESSION),
    anxiety: calc(ANXIETY),
    stress: calc(STRESS)
  }), [dassValues]);

  const severity = (score, type) => {
    const ranges = {
      depression: [[9, "Normal"], [13, "Mild"], [20, "Moderate"], [27, "Severe"], [Infinity, "Extremely Severe"]],
      anxiety: [[7, "Normal"], [9, "Mild"], [14, "Moderate"], [19, "Severe"], [Infinity, "Extremely Severe"]],
      stress: [[14, "Normal"], [18, "Mild"], [25, "Moderate"], [33, "Severe"], [Infinity, "Extremely Severe"]]
    };
    return ranges[type].find(r => score <= r[0])[1];
  };

  const DASS_SCHEMA = {
    title: "Depression Anxiety Stress Scale (DASS-21)",
    sections: [
      {
        fields: [
          { name: "q1", label: "1. I found it hard to wind down." },
          { name: "q2", label: "2. I was aware of dryness of my mouth." },
          { name: "q3", label: "3. I couldn't seem to experience any positive feeling at all." },
          { name: "q4", label: "4. I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)." },
          { name: "q5", label: "5. I found it difficult to work up the initiative to do things." },
          { name: "q6", label: "6. I tended to over-react to situations." },
          { name: "q7", label: "7. I experienced trembling (e.g. in the hands)." },
          { name: "q8", label: "8. I felt that I was using a lot of nervous energy." },
          { name: "q9", label: "9. I was worried about situations in which I might panic and make a fool of myself." },
          { name: "q10", label: "10. I felt that I had nothing to look forward to." },
          { name: "q11", label: "11. I found myself getting agitated." },
          { name: "q12", label: "12. I found it difficult to relax." },
          { name: "q13", label: "13. I felt down-hearted and blue." },
          { name: "q14", label: "14. I was intolerant of anything that kept me from getting on with what I was doing." },
          { name: "q15", label: "15. I felt I was close to panic." },
          { name: "q16", label: "16. I was unable to become enthusiastic about anything." },
          { name: "q17", label: "17. I felt I wasn't worth much as a person." },
          { name: "q18", label: "18. I felt that I was rather touchy." },
          { name: "q19", label: "19. I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)." },
          { name: "q20", label: "20. I felt scared without any good reason." },
          { name: "q21", label: "21. I felt that life was meaningless." }
        ].map(f => ({
          ...f,
          type: "single-select",
          options: [
            { label: "Did not apply to me at all (0)", value: 0 },
            { label: "Applied some of the time (1)", value: 1 },
            { label: "Applied a good part of time (2)", value: 2 },
            { label: "Applied most of the time (3)", value: 3 }
          ]
        }))
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={DASS_SCHEMA}
      values={dassValues}
      onChange={handleChange}
      layout="nested"
    >
      <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
        {["depression", "anxiety", "stress"].map((type) => (
          <div key={type} style={{
            flex: 1,
            minWidth: 150,
            background: "#f1f5ff",
            border: "1px solid #d6e2ff",
            borderRadius: 10,
            padding: "8px 12px",
            fontSize: 15,
            fontWeight: 600,
            color: "#1f2937"
          }}>
            {type.toUpperCase()} SCORE: {scores[type]} ({severity(scores[type], type)})
          </div>
        ))}
      </div>
    </CommonFormBuilder>
  );
}

// Wrapper for PSS
export function PSSWrapper({ values, onChange }) {
  const REVERSED = ["q4", "q5", "q7", "q8"];

  const pssValues = useMemo(() => {
    const result = {};
    for (let i = 1; i <= 10; i++) {
      const key = `pss_q${i}`;
      if (values[key] !== undefined) {
        result[`q${i}`] = values[key];
      }
    }
    return result;
  }, [values]);

  const handleChange = (name, value) => {
    onChange(`pss_${name}`, value);
  };

  const totalScore = useMemo(() => {
    return Object.keys(pssValues).reduce((sum, key) => {
      const val = pssValues[key] ?? 0;
      return sum + (REVERSED.includes(key) ? (4 - val) : val);
    }, 0);
  }, [pssValues]);

  const severity = totalScore <= 13 ? "Low" : totalScore <= 26 ? "Moderate" : "High";

  const PSS_SCHEMA = {
    title: "Perceived Stress Scale (PSS)",
    sections: [
      {
        fields: [
          { name: "q1", label: "1. In the last month, how often have you been upset because of something that happened unexpectedly?" },
          { name: "q2", label: "2. In the last month, how often have you felt that you were unable to control the important things in your life?" },
          { name: "q3", label: "3. In the last month, how often have you felt nervous and stressed?" },
          { name: "q4", label: "4. In the last month, how often have you felt confident about your ability to handle your personal problems?" },
          { name: "q5", label: "5. In the last month, how often have you felt that things were going your way?" },
          { name: "q6", label: "6. In the last month, how often have you found that you could not cope with all the things that you had to do?" },
          { name: "q7", label: "7. In the last month, how often have you been able to control irritations in your life?" },
          { name: "q8", label: "8. In the last month, how often have you felt that you were on top of things?" },
          { name: "q9", label: "9. In the last month, how often have you been angered because of things that were outside of your control?" },
          { name: "q10", label: "10. In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?" }
        ].map(f => ({
          ...f,
          type: "single-select",
          options: [
            { label: "Never (0)", value: 0 },
            { label: "Almost never (1)", value: 1 },
            { label: "Sometimes (2)", value: 2 },
            { label: "Fairly often (3)", value: 3 },
            { label: "Very often (4)", value: 4 }
          ]
        }))
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={PSS_SCHEMA}
      values={pssValues}
      onChange={handleChange}
      layout="nested"
    >
      <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
        <div style={{
          background: "#f1f5ff",
          border: "1px solid #d6e2ff",
          borderRadius: 10,
          padding: "8px 12px",
          fontSize: 15,
          fontWeight: 600,
          color: "#1f2937"
        }}>
          Total Score: {totalScore} - {severity} Stress
        </div>
      </div>
    </CommonFormBuilder>
  );
}

// Wrapper for PHQ-9
export function PHQ9Wrapper({ values, onChange }) {
  const phqValues = useMemo(() => {
    const result = {};
    for (let i = 1; i <= 9; i++) {
      const key = `phq9_q${i}`;
      if (values[key] !== undefined) {
        result[`q${i}`] = values[key];
      }
    }
    return result;
  }, [values]);

  const handleChange = (name, value) => {
    onChange(`phq9_${name}`, value);
  };

  const totalScore = useMemo(() => {
    return Object.values(phqValues).reduce((sum, val) => sum + (val ?? 0), 0);
  }, [phqValues]);

  const severity = totalScore <= 4 ? "Minimal" : totalScore <= 9 ? "Mild" : totalScore <= 14 ? "Moderate" : totalScore <= 19 ? "Moderately Severe" : "Severe";

  const PHQ9_SCHEMA = {
    title: "Patient Health Questionnaire (PHQ-9)",
    sections: [
      {
        fields: [
          "Little interest or pleasure in doing things.",
          "Feeling down, depressed, or hopeless.",
          "Trouble falling or staying asleep, or sleeping too much.",
          "Feeling tired or having little energy.",
          "Poor appetite or overeating.",
          "Feeling bad about yourself — or that you are a failure or have let yourself or your family down.",
          "Trouble concentrating on things, such as reading the newspaper or watching television.",
          "Moving or speaking so slowly that other people could have noticed? Or being so fidgety or restless that you have been moving more than usual.",
          "Thoughts that you would be better off dead or of hurting yourself in some way."
        ].map((text, index) => ({
          name: `q${index + 1}`,
          label: `${index + 1}. ${text}`,
          type: "single-select",
          options: [
            { label: "Not at all (0)", value: 0 },
            { label: "Several days (1)", value: 1 },
            { label: "More than half the days (2)", value: 2 },
            { label: "Nearly every day (3)", value: 3 }
          ]
        }))
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={PHQ9_SCHEMA}
      values={phqValues}
      onChange={handleChange}
      layout="nested"
    >
      <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
        <div style={{
          background: "#f1f5ff",
          border: "1px solid #d6e2ff",
          borderRadius: 10,
          padding: "8px 12px",
          fontSize: 15,
          fontWeight: 600,
          color: "#1f2937"
        }}>
          Total Score: {totalScore} - {severity} Depression
        </div>
      </div>
    </CommonFormBuilder>
  );
}

// Wrapper for GAD-7
export function GAD7Wrapper({ values, onChange }) {
  const gadValues = useMemo(() => {
    const result = {};
    for (let i = 1; i <= 7; i++) {
      const key = `gad7_q${i}`;
      if (values[key] !== undefined) {
        result[`q${i}`] = values[key];
      }
    }
    return result;
  }, [values]);

  const handleChange = (name, value) => {
    onChange(`gad7_${name}`, value);
  };

  const totalScore = useMemo(() => {
    return Object.values(gadValues).reduce((sum, val) => sum + (val ?? 0), 0);
  }, [gadValues]);

  const severity = totalScore <= 4 ? "Minimal" : totalScore <= 9 ? "Mild" : totalScore <= 14 ? "Moderate" : "Severe";

  const GAD7_SCHEMA = {
    title: "Generalized Anxiety Disorder (GAD-7)",
    sections: [
      {
        fields: [
          "Feeling nervous, anxious, or on edge.",
          "Not being able to stop or control worrying.",
          "Worrying too much about different things.",
          "Trouble relaxing.",
          "Being so restless that it is hard to sit still.",
          "Becoming easily annoyed or irritable.",
          "Feeling afraid, as if something awful might happen."
        ].map((text, index) => ({
          name: `q${index + 1}`,
          label: `${index + 1}. ${text}`,
          type: "single-select",
          options: [
            { label: "Not at all (0)", value: 0 },
            { label: "Several days (1)", value: 1 },
            { label: "More than half the days (2)", value: 2 },
            { label: "Nearly every day (3)", value: 3 }
          ]
        }))
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={GAD7_SCHEMA}
      values={gadValues}
      onChange={handleChange}
      layout="nested"
    >
      <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
        <div style={{
          background: "#f1f5ff",
          border: "1px solid #d6e2ff",
          borderRadius: 10,
          padding: "8px 12px",
          fontSize: 15,
          fontWeight: 600,
          color: "#1f2937"
        }}>
          Total Score: {totalScore} - {severity} Anxiety
        </div>
      </div>
    </CommonFormBuilder>
  );
}

// Wrapper for HAM-D
export function HAMDWrapper({ values, onChange }) {
  const hamdValues = useMemo(() => {
    const result = {};
    for (let i = 1; i <= 17; i++) {
      const key = `hamd_q${i}`;
      if (values[key] !== undefined) {
        result[`q${i}`] = values[key];
      }
    }
    return result;
  }, [values]);

  const handleChange = (name, value) => {
    onChange(`hamd_${name}`, value);
  };

  const totalScore = useMemo(() => {
    return Object.values(hamdValues).reduce((sum, val) => sum + (val ?? 0), 0);
  }, [hamdValues]);

  const severity = totalScore <= 7 ? "Normal" : totalScore <= 13 ? "Mild" : totalScore <= 18 ? "Mild to Moderate" : totalScore <= 24 ? "Moderate to Severe" : "Severe";

  const HAMD_SCHEMA = {
    title: "Hamilton Depression Rating Scale (HAM-D)",
    sections: [
      {
        fields: [
          { name: "q1", label: "1. Depressed Mood", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Indicated only on questioning", value: 1 },
            { label: "Spontaneously reported verbally", value: 2 },
            { label: "Communicates feeling states non-verbally", value: 3 },
            { label: "Virtually only these feeling states", value: 4 }
          ]},
          { name: "q2", label: "2. Feelings of Guilt", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Self-reproach, feels he/she has let people down", value: 1 },
            { label: "Ideas of guilt or rumination over past errors", value: 2 },
            { label: "Present illness is a punishment", value: 3 },
            { label: "Hears accusatory or denunciatory voices and/or experiences threatening visual hallucinations", value: 4 }
          ]},
          { name: "q3", label: "3. Suicide", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Feels life is not worth living", value: 1 },
            { label: "Wishes he/she were dead or any thoughts of possible death to self", value: 2 },
            { label: "Suicidal ideas or gestures", value: 3 },
            { label: "Attempts at suicide", value: 4 }
          ]},
          { name: "q4", label: "4. Insomnia Early", type: "single-select", options: [
            { label: "No difficulty falling asleep", value: 0 },
            { label: "Complains of occasional difficulty falling asleep", value: 1 },
            { label: "Complains of nightly difficulty falling asleep", value: 2 }
          ]},
          { name: "q5", label: "5. Insomnia Middle", type: "single-select", options: [
            { label: "No difficulty", value: 0 },
            { label: "Patient complains of being restless and disturbed during the night", value: 1 },
            { label: "Waking during the night", value: 2 }
          ]},
          { name: "q6", label: "6. Insomnia Late", type: "single-select", options: [
            { label: "No difficulty", value: 0 },
            { label: "Waking in early hours of the morning but goes back to sleep", value: 1 },
            { label: "Unable to fall asleep again if he/she gets out of bed", value: 2 }
          ]},
          { name: "q7", label: "7. Work and Activities", type: "single-select", options: [
            { label: "No difficulty", value: 0 },
            { label: "Thoughts and feelings of incapacity, fatigue or weakness related to activities, work or hobbies", value: 1 },
            { label: "Loss of interest in activity, hobbies or work", value: 2 },
            { label: "Decrease in actual time spent in activities or decrease in productivity", value: 3 },
            { label: "Stopped working because of present illness", value: 4 }
          ]},
          { name: "q8", label: "8. Retardation", type: "single-select", options: [
            { label: "Normal speech and thought", value: 0 },
            { label: "Slight retardation at interview", value: 1 },
            { label: "Obvious retardation at interview", value: 2 },
            { label: "Interview difficult", value: 3 },
            { label: "Complete stupor", value: 4 }
          ]},
          { name: "q9", label: "9. Agitation", type: "single-select", options: [
            { label: "None", value: 0 },
            { label: "Fidgetiness", value: 1 },
            { label: "Playing with hands, hair, etc.", value: 2 },
            { label: "Moving about, can't sit still", value: 3 },
            { label: "Hand wringing, nail biting, hair-pulling, biting of lips", value: 4 }
          ]},
          { name: "q10", label: "10. Anxiety Psychic", type: "single-select", options: [
            { label: "No difficulty", value: 0 },
            { label: "Subjective tension and irritability", value: 1 },
            { label: "Worrying about minor matters", value: 2 },
            { label: "Apprehensive attitude apparent in face or speech", value: 3 },
            { label: "Fears expressed without questioning", value: 4 }
          ]},
          { name: "q11", label: "11. Anxiety Somatic", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Incapacitating", value: 4 }
          ]},
          { name: "q12", label: "12. Somatic Symptoms Gastrointestinal", type: "single-select", options: [
            { label: "None", value: 0 },
            { label: "Loss of appetite but eating without encouragement", value: 1 },
            { label: "Difficulty eating without encouragement", value: 2 }
          ]},
          { name: "q13", label: "13. Somatic Symptoms General", type: "single-select", options: [
            { label: "None", value: 0 },
            { label: "Heaviness in limbs, back or head", value: 1 },
            { label: "Loss of energy, fatigability or weakness", value: 2 }
          ]},
          { name: "q14", label: "14. Genital Symptoms", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Severe", value: 2 }
          ]},
          { name: "q15", label: "15. Hypochondriasis", type: "single-select", options: [
            { label: "Not present", value: 0 },
            { label: "Self-absorption (bodily)", value: 1 },
            { label: "Preoccupation with health", value: 2 },
            { label: "Frequent complaints, requests for help, etc.", value: 3 },
            { label: "Hypochondriacal delusions", value: 4 }
          ]},
          { name: "q16", label: "16. Loss of Weight", type: "single-select", options: [
            { label: "No weight loss", value: 0 },
            { label: "Probable weight loss associated with present illness", value: 1 },
            { label: "Definite (according to patient) weight loss", value: 2 },
            { label: "Not assessed", value: 3 }
          ]},
          { name: "q17", label: "17. Insight", type: "single-select", options: [
            { label: "Acknowledges being depressed and ill", value: 0 },
            { label: "Acknowledges illness but attributes cause to bad food, climate, overwork, virus, need for rest, etc.", value: 1 },
            { label: "Denies being ill at all", value: 2 }
          ]}
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={HAMD_SCHEMA}
      values={hamdValues}
      onChange={handleChange}
      layout="nested"
    >
      <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
        <div style={{
          background: "#f1f5ff",
          border: "1px solid #d6e2ff",
          borderRadius: 10,
          padding: "8px 12px",
          fontSize: 15,
          fontWeight: 600,
          color: "#1f2937"
        }}>
          Total Score: {totalScore} - {severity} Depression
        </div>
      </div>
    </CommonFormBuilder>
  );
}

// Wrapper for HAM-A
export function HAMAWrapper({ values, onChange }) {
  const hamaValues = useMemo(() => {
    const result = {};
    for (let i = 1; i <= 14; i++) {
      const key = `hama_q${i}`;
      if (values[key] !== undefined) {
        result[`q${i}`] = values[key];
      }
    }
    return result;
  }, [values]);

  const handleChange = (name, value) => {
    onChange(`hama_${name}`, value);
  };

  const totalScore = useMemo(() => {
    return Object.values(hamaValues).reduce((sum, val) => sum + (val ?? 0), 0);
  }, [hamaValues]);

  const severity = totalScore <= 17 ? "Mild" : totalScore <= 24 ? "Moderate" : "Severe";

  const HAMA_SCHEMA = {
    title: "Hamilton Anxiety Rating Scale (HAM-A)",
    sections: [
      {
        fields: [
          { name: "q1", label: "1. Anxious mood - Worries, anticipation of the worst, fearful anticipation, irritability", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q2", label: "2. Tension - Feelings of tension, fatigability, startle response, moved to tears easily, trembling, feelings of restlessness, inability to relax", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q3", label: "3. Fears - Of dark, of strangers, of being left alone, of animals, of traffic, of crowds", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q4", label: "4. Insomnia - Difficulty in falling asleep, broken sleep, unsatisfying sleep and fatigue on waking, dreams, nightmares, night terrors", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q5", label: "5. Intellectual - Difficulty concentrating, poor memory", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q6", label: "6. Depressed mood - Loss of interest, lack of pleasure in hobbies, depression, early waking, diurnal swing", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q7", label: "7. Somatic (muscular) - Pains and aches, twitching, stiffness, myoclonic jerks, grinding of teeth, unsteady voice, increased muscular tone", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q8", label: "8. Somatic (sensory) - Tinnitus, blurring of vision, hot and cold flushes, feelings of weakness, pricking sensation", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q9", label: "9. Cardiovascular symptoms - Tachycardia, palpitations, pain in chest, throbbing of vessels, fainting feelings, missed beat", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q10", label: "10. Respiratory symptoms - Pressure or constriction in chest, choking feelings, sighing, dyspnoea", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q11", label: "11. Gastro-intestinal symptoms - Difficulty in swallowing, wind, abdominal pain, burning sensations, abdominal fullness, nausea, vomiting, borborygmi, looseness of bowels, loss of weight, constipation", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q12", label: "12. Genito-urinary symptoms - Frequency of micturition, urgency of micturition, amenorrhoea, menorrhagia, development of frigidity, premature ejaculation, loss of libido, erectile dysfunction", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q13", label: "13. Autonomic symptoms - Dry mouth, flushing, pallor, tendency to sweat, giddiness, tension headache, raising of hair", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]},
          { name: "q14", label: "14. Behaviour at interview - Fidgeting, restlessness or pacing, tremor of hands and forehead, strained face, sighing or rapid respiration, facial pallor, swallowing, etc.", type: "single-select", options: [
            { label: "Absent", value: 0 },
            { label: "Mild", value: 1 },
            { label: "Moderate", value: 2 },
            { label: "Severe", value: 3 },
            { label: "Very severe or grossly disabling", value: 4 }
          ]}
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={HAMA_SCHEMA}
      values={hamaValues}
      onChange={handleChange}
      layout="nested"
    >
      <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
        <div style={{
          background: "#f1f5ff",
          border: "1px solid #d6e2ff",
          borderRadius: 10,
          padding: "8px 12px",
          fontSize: 15,
          fontWeight: 600,
          color: "#1f2937"
        }}>
          Total Score: {totalScore} - {severity} Anxiety
        </div>
      </div>
    </CommonFormBuilder>
  );
}
