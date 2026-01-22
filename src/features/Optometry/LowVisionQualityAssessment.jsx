import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

const lvqolOptions = [
  { label: "None (5)", value: 5 },
  { label: "A little / Moderate (4)", value: 4 },
  { label: "Moderate (3)", value: 3 },
  { label: "Great (2)", value: 2 },
  { label: "Very great (1)", value: 1 },
  { label: "Not related", value: "not_related" },
  { label: "Not available", value: "na" }
];


const questions = [
  // Distance, Mobility & Lighting
  "General vision",
  "Doing tasks for a short period (e.g., reading)",
  "Vision in low light at home",
  "Seeing enough to see the TV",
  "Glare (car lights or sun)",
  "Seeing street signs",
  "Watching television",
  "Seeing moving objects (cars)",
  "Judging depth / reaching for objects",
  "Recognizing faces",
  "Walking outdoors (uneven ground)",
  "Crossing roads",

  // Adjustment
  "Unhappy with your situation in life",
  "Frustrated by vision-related tasks",
  "Restricted in visiting friends or family",

  // Reading & Fine Work
  "Reading print",
  "Reading a newspaper",
  "Reading books",
  "Reading labels (e.g., medicine bottles)",
  "Reading letters and mail",
  "Fine tasks (e.g., threading a needle)",

  // Daily Activities
  "Filling out forms",
  "Writing checks or cards",
  "Reading your own handwriting",
  "Household chores"
];


const schema ={
  title: "Low Vision Quality of Life Questionnaire (LVQoL)",
  sections: [
    {
      title: "Distance, Mobility & Lighting",
      fields: [
        { type: "subheading", label: "How much of a problem do you have:" },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "dml_q1",
              label: "With your vision in general",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "dml_q2",
              label: "With your eyes getting tired",
              options: lvqolOptions
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "dml_q3",
              label: "With your vision at night inside the house",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "dml_q4",
              label: "Getting the right amount of light to be able to see",
              options: lvqolOptions
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "dml_q5",
              label: "With glare (e.g., dazzled by car light or the sun)",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "dml_q6",
              label: "Seeing street signs",
              options: lvqolOptions
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "dml_q7",
              label: "Seeing the television (appreciating the pictures)",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "dml_q8",
              label: "Seeing moving objects (e.g., cars on the road)",
              options: lvqolOptions
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "dml_q9",
              label: "With judging the depth or distance of items ",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "dml_q10",
              label: "Seeing steps or curbs",
              options: lvqolOptions
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "dml_q11",
              label: "Getting around outdoors  because of your vision",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "dml_q12",
              label: "Crossing a road with traffic because of your vision",
              options: lvqolOptions
            }
          ]
        }
      ]
    },

    {
      title: "Adjustment",
      fields: [
        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "adj_q1",
              label: "Unhappy with your situation in life",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "adj_q2",
              label: "Frustrated at not being able to do certain tasks",
              options: lvqolOptions
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "adj_q3",
              label: "Restricted in visiting friends or family",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "adj_q4",
              label: "How well has your eye condition been explained to you",
              options: lvqolOptions
            }
          ]
        }
      ]
    },

    {
      title: "Reading & Fine Work",
      fields: [
        { type: "subheading", label: "With your reading glasses, if used, how much of a problem do you have:" },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "rfw_q1",
              label: "Reading large print (e.g., newspaper headlines)",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "rfw_q2",
              label: "Reading newspapers and books",
              options: lvqolOptions
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "rfw_q3",
              label: "Reading labels (e.g., on medicine bottles)",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "rfw_q4",
              label: "Reading your letters and mail",
              options: lvqolOptions
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "rfw_q5",
              label: "Having problems using tools (e.g., threading a needle or cutting)",
              options: lvqolOptions
            }
          ]
        }
      ]
    },

    {
      title: "Daily Activities",
      fields: [
        { type: "subheading", label: "With your reading glasses, if used, how much of a problem do you have:" },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "da_q1",
              label: "Finding the time for yourself",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "da_q2",
              label: "Writing (e.g., cheques or cards)",
              options: lvqolOptions
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              type: "single-select",
              name: "da_q3",
              label: "Reading your own handwriting",
              options: lvqolOptions
            },
            {
              type: "single-select",
              name: "da_q4",
              label: "With your everyday activities (e.g., house-hold chores)",
              options: lvqolOptions
            }
          ]
        },



      ]
    }
  ]
};

function calculateLVQoL(values) {
  const keys = Object.keys(values).filter(k =>
    k.startsWith("dml_") ||
    k.startsWith("adj_") ||
    k.startsWith("rfw_") ||
    k.startsWith("da_")
  );

  const nums = keys
    .map(k => values[k])
    .filter(v => typeof v === "number");

  const total = nums.reduce((a, b) => a + b, 0);

  let category = "";
  if (total >= 94) category = "Normal";
  else if (total >= 63) category = "Mild";
  else if (total >= 32) category = "Moderate";
  else category = "Severe";

  return { total, category };
}


export default function LVQoLForm( layout = "root") {
  const [values, setValues] = React.useState({});

 const handleChange = (name, value) => {
  // convert "5" -> 5, keep non-numeric like "na", "not_related" as-is
  const normalized =
    typeof value === "string" && !isNaN(value)
      ? Number(value)
      : value;

  const next = { ...values, [name]: normalized };

  const { total, category } = calculateLVQoL(next);
  next.lvqol_total = total || "";
  next.lvqol_category = category || "";

  setValues(next);
};


  return (
    <>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={handleChange}
        submitted={false}
          layout={layout}
      />

      {/* ===== SUMMARY (Outside Schema) ===== */}
      <div style={summaryWrap}>
        <div style={scoreRow}>
          <div style={scorePill}>
            Total Score: {values.lvqol_total || 0}
          </div>

          <div style={severityPill}>
            Severity: {values.lvqol_category || "-"}
          </div>
        </div>
      </div>
    </>
  );
}
const summaryWrap = {
  width: "90%",
  margin: "24px auto",
  padding: 20
};

const scoreRow = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap"
};

const scorePill = {
  flex: 1,
  background: "#E0F2FE",
  border: "1px solid #38BDF8",
  borderRadius: 10,
  padding: "14px 18px",
  fontSize: 16,
  fontWeight: 700,
  color: "#075985",
  minWidth: 260
};

const severityPill = {
  flex: 1,
  background: "#FFF7ED",
  border: "1px solid #FDBA74",
  borderRadius: 10,
  padding: "14px 18px",
  fontSize: 16,
  fontWeight: 700,
  color: "#9A3412",
  minWidth: 260
};

