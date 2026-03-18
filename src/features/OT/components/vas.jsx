import React, { useState, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function ScarAssessmentForm() {

  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues(v => ({
      ...v,
      [name]: Number(value) || value
    }));
  };

  /* ================= TOTAL ================= */

  const totalScore = useMemo(() => {
    return [
      "pigmentation",
      "vascularity",
      "pliability",
      "height",
      "pain",
      "itchiness"
    ].reduce((sum, key) => sum + (Number(values[key]) || 0), 0);
  }, [values]);

  /* ================= COMMON OPTIONS ================= */

  const OPTIONS = {
    pigmentation: [
      { label: "Normal (0)", value: 0 },
      { label: "Hypopigmentation (1)", value: 1 },
      { label: "Hyperpigmentation (2)", value: 2 }
    ],

    vascularity: [
      { label: "Normal (0)", value: 0 },
      { label: "Pink (1)", value: 1 },
      { label: "Red (2)", value: 2 },
      { label: "Purple (3)", value: 3 }
    ],

    pliability: [
      { label: "Normal (0)", value: 0 },
      { label: "Supple (1)", value: 1 },
      { label: "Firm (2)", value: 2 },
      { label: "Bending (3)", value: 3 },
      { label: "Contracture (4)", value: 4 }
    ],

    height: [
      { label: "Flat (0)", value: 0 },
      { label: "< 2 mm (1)", value: 1 },
      { label: "< 5 mm (2)", value: 2 },
      { label: "> 5 mm (3)", value: 3 }
    ],

    pain: [
      { label: "None (0)", value: 0 },
      { label: "Occasional (1)", value: 1 },
      { label: "Medication (2)", value: 2 }
    ],

    itchiness: [
      { label: "None (0)", value: 0 },
      { label: "Occasional (1)", value: 1 },
      { label: "Medication (2)", value: 2 }
    ]
  };

  /* ================= SCHEMA ================= */
const SCHEMA = {
  title: " Visual Analogue Scale (VAS)",

  fields: [
    {
      type: "grid-table-advanced",
      name: "scar",

      headers: [
        "Scar Condition",
        "Indicator",
        "Date 1",
        "Date 2",
        "Date 3"
      ],
  dateColumns: 3,
  dateType: "date",  
  

      rows: [
        {
          key: "pigmentation",
          label: "Pigmentation",
          options: [
            { label: "Normal (0)", value: 0 },
            { label: "Hypopigmentation (1)", value: 1 },
            { label: "Hyperpigmentation (2)", value: 2 }
          ]
        },
        {
          key: "vascularity",
          label: "Vascularity",
          options: [
            { label: "Normal (0)", value: 0 },
            { label: "Pink (1)", value: 1 },
            { label: "Red (2)", value: 2 },
            { label: "Purple (3)", value: 3 }
          ]
        },
        {
          key: "pliability",
          label: "Pliability",
          options: [
            { label: "Normal (0)", value: 0 },
            { label: "Supple (1)", value: 1 },
            { label: "Firm (2)", value: 2 },
            { label: "Banding (3)", value: 3 },
            { label: "Contracture (4)", value: 4 }
          ]
        },
        {
          key: "height",
          label: "Height",
          options: [
            { label: "Flat (0)", value: 0 },
            { label: "< 2mm (1)", value: 1 },
            { label: "< 5mm (2)", value: 2 },
            { label: "> 5mm (3)", value: 3 }
          ]
        },
        {
          key: "pain",
          label: "Pain",
          options: [
            { label: "None (0)", value: 0 },
            { label: "Occasional (1)", value: 1 },
            { label: "Medication (2)", value: 2 }
          ]
        },
        {
          key: "itchiness",
          label: "Itchiness",
          options: [
            { label: "None (0)", value: 0 },
            { label: "Occasional (1)", value: 1 },
            { label: "Medication (2)", value: 2 }
          ]
        }
      ]
    }
  ]
};

  return (
    <div>

      <CommonFormBuilder
        schema={SCHEMA}
        values={values}
        onChange={onChange}
        layout="nested"
      />

      <div
        style={{
          marginTop: 20,
          padding: 12,
          background: "#f1f5f9",
          borderRadius: 8,
          fontWeight: 600
        }}
      >
        Total Score: {totalScore}
      </div>

    </div>
  );
}