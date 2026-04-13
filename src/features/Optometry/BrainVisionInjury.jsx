import { useState, useCallback, useMemo, memo } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";
import ScorePill from "../../shared/ui/ScorePill";

// Pure calculation — outside component so it's never recreated
function calculateScore(values) {
  return Object.entries(values).reduce((total, [k, v]) => {
    if (k === "brain_vision_score") return total;
    const n = parseInt(v);
    return total + (isNaN(n) ? 0 : n);
  }, 0);
}

const BrainVisionInjury = memo(function BrainVisionInjury({ schema, onBack, layout = "root" }) {
  const [values,    setValues]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [language,  setLanguage]  = useState("en");

  const onChange = useCallback((name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  }, []);

  const onAction = useCallback((type) => {
    if (type === "toggle-language") setLanguage(l => (l === "en" ? "ms" : "en"));
    if (type === "submit") setSubmitted(true);
    if (type === "back")   onBack?.();
  }, [onBack]);

  const score = useMemo(() => calculateScore(values), [values]);

  return (
    <>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={onAction}
        layout={layout}
        language={language}
      />
      <div className="opto-score-row">
        <ScorePill label="Total Score" value={score} color="blue" />
      </div>
    </>
  );
});

export default BrainVisionInjury;
