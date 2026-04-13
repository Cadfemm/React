import { useState, useCallback } from "react";

/**
 * Shared hook for schema-driven assessment forms across all departments.
 * Handles the identical useState + onChange + onAction boilerplate.
 *
 * @param {object} options
 * @param {function} options.onBack   – called when action type === "back"
 * @param {function} options.onSubmit – called with current values when action type === "submit"
 */
export function useAssessmentForm({ onBack, onSubmit } = {}) {
  const [values,    setValues]    = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = useCallback((name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  }, []);

  const onAction = useCallback((type) => {
    if (type === "submit") {
      setSubmitted(true);
      onSubmit?.(values);
    }
    if (type === "back") {
      onBack?.();
    }
  }, [onBack, onSubmit, values]);

  return { values, submitted, onChange, onAction };
}
