import "../styles/formFields.css";

export default function RadioField({ label, value, options, onChange })
 {
  return (
    <div className="form-field">
      <label className="form-label">{field.label}</label>
      <div className="form-options">
        {field.options.map((opt) => (
          <label key={opt.value} className="form-option">
            <input
              type="radio"
              name={field.name}
              checked={value === opt.value}
              onChange={() => onChange(field.name, opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
