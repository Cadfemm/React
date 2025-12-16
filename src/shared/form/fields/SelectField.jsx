// src/shared/fields/SelectField.jsx
import React from "react";
import "../styles/formFields.css";

export default function SelectField({
  label,
  value,
  options = [],
  onChange,
  disabled = false,
  helperText
}) {
  return (
    <div className="form-field">
      {label && <label className="form-label">{label}</label>}

      <select
        className="form-input"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {helperText && (
        <div className="form-helper">{helperText}</div>
      )}
    </div>
  );
}
