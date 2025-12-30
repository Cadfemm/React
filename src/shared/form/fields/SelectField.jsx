// src/shared/fields/SelectField.jsx
import React from "react";
import "../styles/formFields.css";

export default function SelectField({
  label,
  value,
  options = [],
  onChange,
  disabled = false,
  helperText,
  labelPosition = "inline" // inline | block
}) {
  return (
    <div className="form-field">
      {label && (
        <label
          className="form-label"
          style={
            labelPosition === "block"
              ? { display: "block", width: "100%", marginBottom: 6 }
              : {}
          }
        >
          {label}
        </label>
      )}

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

      {helperText && <div className="form-helper">{helperText}</div>}
    </div>
  );
}

