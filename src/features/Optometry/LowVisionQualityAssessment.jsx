import { useState, useCallback, useMemo, memo } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";
import ScorePill from "../../shared/ui/ScorePill";

function calculateLVQoL(values) {
  const nums = Object.values(values).filter(v => typeof v === "number");
  const total = nums.reduce((a, b) => a + b, 0);
  let category = "Severe";
  if (total >= 94) category = "Normal";
  else if (total >= 63) category = "Mild";
  else if (total >= 32) category = "Moderate";
  return { total, category };
}

const LVQoLForm = memo(function LVQoLForm({ schema, layout = "root" }) {
  const [values,   setValues]   = useState({});
  const [language, setLanguage] = useState("en");

  const handleChange = useCallback((name, value) => {
    setValues(prev => {
      const normalized = typeof value === "string" && !isNaN(value) ? Number(value) : value;
      const next = { ...prev, [name]: normalized };
      const { total, category } = calculateLVQoL(next);
      next.lvqol_total    = total;
      next.lvqol_category = category;
      return next;
    });
  }, []);

  const handleAction = useCallback((type) => {
    if (type === "toggle-language") setLanguage(l => (l === "en" ? "ms" : "en"));
  }, []);

  const summary = useMemo(() => ({
    total:    values.lvqol_total    ?? 0,
    category: values.lvqol_category ?? "-",
  }), [values.lvqol_total, values.lvqol_category]);

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
      <div className="opto-score-row">
        <ScorePill label="Total Score" value={summary.total}    color="blue"  />
        <ScorePill label="Severity"    value={summary.category} color="amber" />
      </div>
    </>
  );
});

export default LVQoLForm;
