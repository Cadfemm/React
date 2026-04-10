import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function BrainVisionInjury ({ schema, onBack, layout = "root" }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [language, setLanguage] = useState("en");

  const calculateScore = (values) => {
      let total = 0
      Object.entries(values).forEach(([k, v]) => {
        if (k!=="brain_vision_score"){
          total += parseInt(v)
        }
      })
      return total
    }
  
  const handleAction = (type) => {
    if (type === "toggle-language") {
      setLanguage(l => (l === "en" ? "ms" : "en"));
    }
  };

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("PAED IA Speech & Language", values);
    }

    if (type === "back") {
      onBack?.();   
    }
  };
  return (
    <>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={onChange}
        submitted={submitted}
          onAction={handleAction}
          layout={layout}
                  language={language}

      />
      <div style={{ width: "90%", margin: "24px auto", display: "flex", gap: 16 }}>
        <div style={pill("#E0F2FE", "#38BDF8", "#075985")}>
          Total Score: {calculateScore(values) ?? 0}
        </div>
      </div>
    </>
  );
}

const pill = (bg, border, color) => ({
  flex: 1,
  background: bg,
  border: `1px solid ${border}`,
  borderRadius: 10,
  padding: "14px 18px",
  fontSize: 16,
  fontWeight: 700,
  color
});
 