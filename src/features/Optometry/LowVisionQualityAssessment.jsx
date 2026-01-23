import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

const LVQOL_SCALE = [
  { label: "None", value: 5 ,},
  { label: "little", value: 4 },
  { label: "Moderate", value: 3 },
  { label: "Great", value: 2 },
  { label: "Very great", value: 1 },
  { label: "Not related", value: "not_related", required: true },
  { label: "Not available", value: "na", required: true }
];




const schema = {
  title: "Low Vision Quality of Life Questionnaire (LVQoL)",
  sections: [
    {
      title: "Distance, Mobility & Lighting",
      fields: [
        {
          type: "scale-table",
          name: "dml",
          columns: LVQOL_SCALE,
          rows: [
            "With your vision in general",
            "Doing tasks for a short period (e.g., reading)",
            "Vision in low light at home",
            "Getting the right amount of light to be able to see",
            "With glare (e.g., dazzled by car light or the sun)",
            "Seeing street signs",
            "Seeing the television (appreciating the pictures)",
            "Seeing moving objects (e.g., cars on the road)",
            "Judging the depth or distance of items",
            "Recognizing faces",
            "Getting around outdoors because of your vision",
            "Crossing a road with traffic because of your vision"
          ]
        }
      ]
    },

    {
      title: "Adjustment",
      fields: [
        {
          type: "scale-table",
          name: "adjustment",
          columns: LVQOL_SCALE,
          rows: [
            "Unhappy with your situation in life",
            "Frustrated at not being able to do certain tasks",
            "Restricted in visiting friends or family",
            "How well has your eye condition been explained to you"
          ]
        }
      ]
    },

    {
      title: "Reading & Fine Work",
      fields: [
        {
          type: "scale-table",
          name: "reading_fine_work",
          columns: LVQOL_SCALE,
          rows: [
            "Reading large print (e.g., newspaper headlines)",
            "Reading newspapers and books",
            "Reading labels (e.g., on medicine bottles)",
            "Reading your letters and mail",
            "Having problems using tools (e.g., threading a needle or cutting)"
          ]
        }
      ]
    },

    {
      title: "Daily Activities",
      fields: [
        {
          type: "scale-table",
          name: "daily_activities",
          columns: LVQOL_SCALE,
          rows: [
            "Finding the time for yourself",
            "Writing (e.g., cheques or cards)",
            "Reading your own handwriting",
            "With your everyday activities (e.g., household chores)"
          ]
        }
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

