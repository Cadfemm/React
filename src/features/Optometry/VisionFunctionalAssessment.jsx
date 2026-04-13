import { useCallback, useMemo, memo, useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";
import ScorePill from "../../shared/ui/ScorePill";

function calculateVF(values) {
  const nums = Object.keys(values)
    .filter(k => k.startsWith("vf_tasks_"))
    .map(k => Number(values[k]))
    .filter(v => !isNaN(v));
  const sum = nums.reduce((s, v) => s + v, 0);
  let impairment = "No visual impairment";
  if      (sum <= 5)  impairment = "Very severe impairment";
  else if (sum <= 16) impairment = "Severe impairment";
  else if (sum <= 41) impairment = "Moderate impairment";
  else if (sum <= 51) impairment = "Mild impairment";
  return { sum, impairment, vfScore: Math.round((sum / 55) * 100) };
}

const VisualFunctionForm = memo(function VisualFunctionForm({ schema, onBack, layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = useCallback((name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  }, []);

  const onAction = useCallback((type) => {
    if (type === "back") onBack?.();
  }, [onBack]);

  const summary = useMemo(() => calculateVF(values), [values]);

  return (
    <>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={onChange}
        onAction={onAction}
        layout={layout}
      />
      <div className="opto-score-row">
        <ScorePill label="Sum of Points" value={summary.sum}              color="blue"  />
        <ScorePill label="Impairment"    value={summary.impairment}       color="amber" />
        <ScorePill label="VF Score"      value={`${summary.vfScore}%`}   color="green" />
      </div>
    </>
  );
});

export default VisualFunctionForm;
