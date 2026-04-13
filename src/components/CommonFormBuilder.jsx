// src/components/CommonFormBuilder.jsx

import React from "react";

export default function CommonFormBuilder({ schema, values, onChange }) {
  return (
    <div>
      {schema.sections.map((section, i) => (
        <div key={i}>
          {section.fields.map((field, idx) => {
            if (field.type === "subheading") {
              return <h3 key={idx}>{field.label}</h3>;
            }

            if (field.type === "input") {
              return (
                <input
                  key={idx}
                  placeholder={field.label}
                  value={values[field.name] || ""}
                  onChange={(e) => onChange(field.name, e.target.value)}
                />
              );
            }

            if (field.type === "radio") {
              return (
                <div key={idx}>
                  <p>{field.label}</p>
                  {field.options.map((opt) => (
                    <label key={opt.value}>
                      <input
                        type="radio"
                        name={field.name}
                        value={opt.value}
                        checked={values[field.name] === opt.value}
                        onChange={() => onChange(field.name, opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              );
            }

            return null;
          })}
        </div>
      ))}
    </div>
  );
}