import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";


function calculateLVQoL(values) {
  const nums = Object.values(values).filter(v => typeof v === "number");
  const total = nums.reduce((a, b) => a + b, 0);

  let category = "Severe";
  if (total >= 94) category = "Normal";
  else if (total >= 63) category = "Mild";
  else if (total >= 32) category = "Moderate";

  return { total, category };
}

export default function LVQoLForm({schema, layout = "root" }) {
  const [values, setValues] = React.useState({});
  const [language, setLanguage] = React.useState("en");

  const handleChange = (name, value) => {
    const normalized =
      typeof value === "string" && !isNaN(value) ? Number(value) : value;

    const next = { ...values, [name]: normalized };
    const { total, category } = calculateLVQoL(next);

    next.lvqol_total = total;
    next.lvqol_category = category;

    setValues(next);
  };

  const handleAction = (type) => {
    if (type === "toggle-language") {
      setLanguage(l => (l === "en" ? "ms" : "en"));
    }
  };
  return (
    <>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={handleChange}
        onAction={handleAction}
        layout={layout}
        language={language}
      />

      {/* Summary */}
      <div style={{ width: "90%", margin: "24px auto", display: "flex", gap: 16 }}>
        <div style={pill("#E0F2FE", "#38BDF8", "#075985")}>
          Total Score: {values.lvqol_total ?? 0}
        </div>
        <div style={pill("#FFF7ED", "#FDBA74", "#9A3412")}>
          Severity: {values.lvqol_category ?? "-"}
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
