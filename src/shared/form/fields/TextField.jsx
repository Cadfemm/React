// src/shared/fields/TextField.jsx
import React from "react";
import "../styles/formFields.css";

export default function TextField({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  helperText,
  placeholder = ""
}) {
  return (
    <div className="form-field">
      {label && <label className="form-label">{label}</label>}

      <input
        type={type}
        className="form-input"
        value={value || ""}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />

      {helperText && (
        <div className="form-helper">{helperText}</div>
      )}
    </div>
  );
}
