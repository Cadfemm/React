import { useState } from "react";

export default function useFormState(initialData = {}, onSubmit) {
  const [values, setValues] = useState(initialData || {});

  function handleChange(name, value) {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(values);
    }
  }

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
  };
}
