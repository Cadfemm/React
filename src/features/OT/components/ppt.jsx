import React, { useState, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function PurduePegboardTest() {

  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues(v => ({
      ...v,
      [name]: Number(value) || value
    }));
  };

  /* ================= SCORE CALCULATION ================= */

  const totalScore = useMemo(() => {
    return (
      (values.right_hand || 0) +
      (values.left_hand || 0) +
      (values.both_hands || 0) +
      (values.assembly_trial1 || 0) +
      (values.assembly_trial2 || 0)
    );
  }, [values]);

  /* ================= SCHEMA ================= */

  const PPT_SCHEMA = {
    title: "Purdue Pegboard Test (PPT) – OT Documentation",

    sections: [

      /* ================= 1. SCORE ================= */

      {
        title: "1. Borang Skor Purdue Pegboard Test (PPT)",
        fields: [

     {
  type: "grid-table-flat",
  name: "ppt_scores",

  headers: ["Score"],

  labelWidth: "180px",
  labelGap: "440px",   // 👈 control spacing here
  inputWidth: "120px",

  rows: [
    { key: "right_hand", label: "Right Hand (30s)" },
    { key: "left_hand", label: "Left Hand (30s)" },
    { key: "both_hands", label: "Both Hands (30s)" },
    { key: "assembly_trial1", label: "Assembly Trial 1 (60s)" },
    { key: "assembly_trial2", label: "Assembly Trial 2 (60s)" }
  ]
},

          {
            type: "input",
            name: "total_assembly",
            label: "Total Assembly",
            value: totalScore,
            readOnly: true
          }

        ]
      },

      /* ================= 2. NORMATIVE VALUES ================= */

      {
        title: "2. Normative Values (Contoh Ringkas)",
        fields: [

          {
            type: "grid-table-flat",
            name: "normative_values",
            headers: ["Male RH", "Female RH", "Male LH", "Female LH"],

            rows: [
              { key: "age_20_24", label: "20–24" },
              { key: "age_25_34", label: "25–34" },
              { key: "age_35_44", label: "35–44" },
              { key: "age_45_54", label: "45–54" },
              { key: "age_55_plus", label: "55+" }
            ],

            readOnly: true
          }

        ]
      },

      /* ================= 3. INTERPRETATION ================= */

      {
        title: "3. Template OT Report with Interpretation",
        fields: [

          {
            type: "subheading",
            label: "PPT Report Summary"
          },

          {
            type: "input",
            name: "summary_right",
            label: "Right Hand (pins)"
          },
          {
            type: "input",
            name: "summary_left",
            label: "Left Hand (pins)"
          },
          {
            type: "input",
            name: "summary_both",
            label: "Both Hands (pairs)"
          },
          {
            type: "input",
            name: "summary_assembly",
            label: "Assembly Total (parts)"
          },

          {
            type: "textarea",
            name: "interpretation",
            label: "Interpretation"
          },

          {
            type: "textarea",
            name: "clinical_notes",
            label: "Clinical Notes"
          },

          {
            type: "textarea",
            name: "recommendations",
            label: "OT Recommendations"
          }

        ]
      }

    ]
  };

  return (
    <div>

      <CommonFormBuilder
        schema={PPT_SCHEMA}
        values={values}
        onChange={onChange}
        layout="nested"
      />

      {/* AUTO TOTAL DISPLAY */}

      <div
        style={{
          marginTop: 20,
          padding: 16,
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