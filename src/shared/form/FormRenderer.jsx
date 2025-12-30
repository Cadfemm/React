import React from "react";
import FieldRenderer from "./FieldRenderer";
import useFormState from "./hooks/useFormState";

export function FormRenderer({ config, initialData = {}, onSubmit }) {
  const { values, handleChange, handleSubmit } =
    useFormState(initialData, onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <h2>{config.title}</h2>

      {config.sections.map((section) => (
        <div key={section.sectionId}>
          <h3>{section.title}</h3>

          {section.fields.map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={values[field.name]}
              values={values}
              onChange={handleChange}
            />
          ))}
        </div>
      ))}

      <button type="submit">Save</button>
    </form>
  );
}
