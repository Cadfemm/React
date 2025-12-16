import "../styles/formFields.css";

export default function MultiSelectField({ field, value = [], onChange }) {
  const selectedValues = Array.isArray(value) ? value : [];

  function toggleOption(optionValue) {
    let updated;

    if (selectedValues.includes(optionValue)) {
      updated = selectedValues.filter(v => v !== optionValue);
    } else {
      updated = [...selectedValues, optionValue];
    }

    onChange(field.name, updated);
  }

  return (
    <div className="form-field">
      <label className="form-label">{field.label}</label>

      <div className="form-options">
        {field.options.map(opt => (
          <label key={opt.value} className="form-option">
            <input
              type="checkbox"
              checked={selectedValues.includes(opt.value)}
              onChange={() => toggleOption(opt.value)}
              disabled={field.disabled}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {field.helperText && (
        <div className="form-helper">{field.helperText}</div>
      )}
    </div>
  );
}
