import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";


export default function VoiceIndices() {
    const [values, setValues] = React.useState({});
    const VHI_COLUMNS = [
  { label: "Never", value: 0 },
  { label: "Almost never", value: 1 },
  { label: "Sometimes", value: 2 },
  { label: "Almost always", value: 3 },
  { label: "Always", value: 4 }
];

const RSI_COLUMNS = [
  { label: "No problem", value: 0 },
  { label: "1", value: 1,required: true },
  { label: "2", value: 2,required: true },
  { label: "3", value: 3,required: true },
  { label: "4", value: 4 ,required: true },
  { label: "5\nSevere", value: 5 }
];

    const VoiceIndicesSchema = {
  title: "Voice Indices",
  sections: [
    {
      title: "Voice Handicap Index (VHI-10)",
      fields: [
        {
          type: "info-text",
          text: [
            "These statements describe how people feel about their voices.",
            "Select the response that indicates how frequently you have the same experience."
          ]
        },
        {
          type: "scale-table",
          name: "vhi",
          columns: VHI_COLUMNS,
          rows: [
            "My voice makes it difficult for people to hear me.",
            "People have difficulty understanding me in a noisy room.",
            "My voice difficulties restrict my personal and social life.",
            "I feel left out of conversations because of my voice.",
            "My voice problem causes me to lose income.",
            "I feel as though I have to strain to produce voice.",
            "The clarity of my voice is unpredictable.",
            "My voice problem upsets me.",
            "My voice makes me feel handicapped.",
            "People ask, “What’s wrong with your voice?”"
          ]
        }
      ]
    },

    {
      title: "Reflux Symptom Index (RSI)",
      fields: [
        {
          type: "info-text",
          text: [
            "Within the last month, how did the following problems affect you?",
            "0 = No problem, 5 = Severe problem"
          ]
        },
        {
          type: "scale-table",
          name: "rsi",
          columns: RSI_COLUMNS,
          rows: [
            "Hoarseness or a problem with your voice",
            "Clearing your throat",
            "Excess throat mucus or postnasal drip",
            "Difficulty swallowing food, liquids, or pills",
            "Coughing after you eat or after lying down",
            "Breathing difficulties or choking episodes",
            "Troublesome or annoying cough",
            "Sensations of something sticking in your throat or a lump in your throat",
            "Heartburn, chest pain, indigestion, or stomach acid coming up"
          ]
        }
      ]
    }
  ]
};

    function sumScale(values, prefix) {
      return Object.entries(values || {}).reduce((acc, [key, val]) => {
        const isAnswerKey = key.startsWith(`${prefix}_`) && /\d+$/.test(key);
        if (!isAnswerKey) return acc;
        const n = Number(val);
        return acc + (Number.isFinite(n) ? n : 0);
      }, 0);
    }
    const handleChange = (name, payload) => {
    const next = { ...values };

    // scale-table emits: { row, value }
    if (payload && typeof payload === "object" && "row" in payload) {
      const prev = Array.isArray(values[name]) ? values[name] : [];
      const updated = [...prev];
      updated[payload.row] = payload.value;
      next[name] = updated;
    } else {
      next[name] = payload;
    }

    next.vhi_total = sumScale(next, "vhi");
    next.rsi_total = sumScale(next, "rsi");

    setValues(next);
  };

  return (
    <>
      <CommonFormBuilder
        schema={VoiceIndicesSchema}
        values={values}
        onChange={handleChange}
      />

      <div style={{ display: "flex", gap: 16, margin: 24, flexWrap: "wrap" }}>
        <div style={pill}>VHI-10 Total: {values.vhi_total || 0}</div>
        <div style={pill}>RSI Total: {values.rsi_total || 0}</div>
      </div>
    </>
  );
}

const pill = {
  padding: "14px 18px",
  borderRadius: 12,
  border: "1px solid #CBD5E1",
  fontWeight: 700,
  minWidth: 220
};
