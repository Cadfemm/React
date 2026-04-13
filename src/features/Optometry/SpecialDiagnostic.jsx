import { useState, useCallback, memo } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

const SpecialDiagnosticAssessment = memo(function SpecialDiagnosticAssessment({ schema, onBack, layout = "root" }) {
  const [values,    setValues]    = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = useCallback((name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  }, []);

  const onAction = useCallback((type) => {
    if (type === "submit") setSubmitted(true);
    if (type === "back")   onBack?.();
  }, [onBack]);

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
      layout={layout}
    />
  );
});

export default SpecialDiagnosticAssessment;
