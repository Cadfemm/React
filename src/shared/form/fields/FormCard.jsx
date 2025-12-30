// src/shared/form/fields/FormCard.jsx
import React from "react";
import "../styles/formFields.css";

export default function FormCard({
  title,
  subtitle,
  children,

  onBack,
  onSave,
  onClear,
  onSubmit,
  onPrint,

  // ✅ single config object
  buttonClassNames = {}
}) {
  const {
    back = "badge",
    save = "badge",
    clear = "badge",
    print = "badge",
    submit = "button"
  } = buttonClassNames;

  return (
    <section className="form-card">

      {/* HEADER */}
      <div className="form-card-header">
        <div>
          {title && <div className="form-card-title">{title}</div>}
          {subtitle && <div className="form-card-subtitle">{subtitle}</div>}
        </div>

        <div className="form-card-actions">
          {onBack && (
            <button onClick={onBack} className={`form-btn ${back}`}>
              ← Back
            </button>
          )}

          {onClear && (
            <button onClick={onClear} className={`form-btn ${clear}`}>
              Clear
            </button>
          )}

          {onPrint && (
            <button onClick={onPrint} className={`form-btn ${print}`}>
              Print
            </button>
          )}

          {onSave && (
            <button onClick={onSave} className={`form-btn ${save}`}>
              Save
            </button>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="form-card-body">
        {children}
      </div>

      {/* FOOTER */}
      <div className="form-card-footer">
        <div className="form-card-footer-actions">
          {onSubmit && (
            <button onClick={onSubmit} className={`form-btn ${submit}`}>
              Submit
            </button>
          )}
        </div>
      </div>

    </section>
  );
}
