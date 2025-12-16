import React from "react";
import TextField from "./fields/TextField";
import SelectField from "./fields/SelectField";
import RadioField from "./fields/RadioField";
import MultiSelectField from "./fields/MultiSelectField";

export default function FieldRenderer({ field, value, values, onChange }) {
  if (!field) return null;

  // optional conditional visibility
  if (field.showWhen) {
    const { field: dep, equals } = field.showWhen;
    if (values?.[dep] !== equals) return null;
  }

  switch (field.type) {
    case "text":
      return (
        <TextField
          field={field}
          value={value}
          onChange={onChange}
        />
      );

    case "select":
      return (
        <SelectField
          field={field}
          value={value}
          onChange={onChange}
        />
      );

    case "radio":
      return (
        <RadioField
          field={field}
          value={value}
          onChange={onChange}
        />
      );

    case "multiselect":
      return (
        <MultiSelectField
          field={field}
          value={value}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
}
