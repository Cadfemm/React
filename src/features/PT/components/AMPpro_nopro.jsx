import React, { useState, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* =========================================
   COMPONENT 1 : AMPPro (WITH PROSTHESIS)
========================================= */
export function AMPProAssessment() {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const score = Number(values.score || 0);

  const kLevel = useMemo(() => {
    if (score <= 8) return "K0";
    if (score <= 20) return "K1";
    if (score <= 28) return "K2";
    if (score <= 36) return "K3";
    return "K4";
  }, [score]);

  const schema = {
    title: "AMP with Prosthesis (AMPPro)",
    sections: [
      {
        fields: [
          {
            name: "score",
            label: "Score",
            type: "input",
            helper: "Enter total score /43"
          },
          {
            name: "k_level",
            label: "K-Level",
            type: "input",
            readOnly: true
          },
          {
            type: "info-text",
            text: [
              "K0 (0-8)",
              "K1 (9-20)",
              "K2 (21-28)",
              "K3 (29-36)",
              "K4 (37-43)"
            ]
          }
        ]
      }
    ]
  };

  values.k_level = kLevel;

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={handleChange}
    />
  );
}

/* =========================================
   COMPONENT 2 : AMPnoPro (WITHOUT PROSTHESIS)
========================================= */
export function AMPNoProAssessment() {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const score = Number(values.score || 0);

  const kLevel = useMemo(() => {
    if (score === 0) return "";
    if (score <= 14) return "K0";
    if (score <= 26) return "K1";
    if (score <= 36) return "K2";
    if (score <= 42) return "K3";
    return "K4";
  }, [score]);

  const schema = {
    title: "AMP without Prosthesis (AMPnoPro)",
    sections: [
      {
        fields: [
          {
            name: "score",
            label: "Score",
            type: "input",
            helper: "Enter total score /47"
          },
          {
            name: "k_level",
            label: "K-Level",
            type: "input",
            readOnly: true
          },
          {
            type: "info-text",
            text: [
              "K0 (n/a)",
              "K1 (15-26)",
              "K2 (27-36)",
              "K3 (37-42)",
              "K4 (43-47)"
            ]
          }
        ]
      }
    ]
  };

  values.k_level = kLevel;

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={handleChange}
    />
  );
}