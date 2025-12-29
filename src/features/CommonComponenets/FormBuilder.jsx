import React from "react";
export default function CommonFormBuilder({
  schema,
  values,
  onChange,
  submitted,
  onAction,
  children
}) {
  const sections = schema.sections || [
    { title: null, fields: schema.fields }
  ];

  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <div style={styles.card}>

          <div style={styles.header}>
            <div>
              <div style={styles.title}>{schema.title}</div>
              {schema.subtitle && (
                <div style={styles.subtitle}>{schema.subtitle}</div>
              )}
            </div>

            {schema.actions?.length > 0 && (
              <div style={styles.actions}>
                {schema.actions.map(action => (
                  <button
                    key={action.type}
                    style={styles.mstBtn}
                    onClick={() => onAction?.(action.type)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

         <div style={styles.body}>
  {sections.map((section, sIdx) => {

    /* ===== SECTION-LEVEL VISIBILITY ===== */
    if (section.showIf) {
      const depVal = values[section.showIf.field];

      if ("equals" in section.showIf && depVal !== section.showIf.equals) {
        return null;
      }

      if ("exists" in section.showIf && !depVal) {
        return null;
      }
    }

    return (
      <div key={sIdx} style={styles.sectionCard}>

        {section.title && (
          <div style={styles.sectionTitle}>
            {section.title}
          </div>
        )}

        {section.fields.map(field => {

          /* ===== FIELD-LEVEL VISIBILITY ===== */
          if (field.showIf) {
            const depVal = values[field.showIf.field];

            if ("equals" in field.showIf && depVal !== field.showIf.equals) {
              return null;
            }

            if ("exists" in field.showIf && !depVal) {
              return null;
            }
          }

          const value = values[field.name];
          const error = submitted
            ? validateField(value, field.validation)
            : null;

          return (
            <div key={field.name} style={styles.field}>

              {field.type === "radio" ? (
                <div style={styles.radioRow}>
                  <div style={styles.radioLabel}>
                    {field.label}
                  </div>
                  {renderField(field, value, onChange, onAction)}
                </div>
              ) : (
                <>
                  {field.type !== "button" && (
                    <label style={styles.label}>
                      {field.label}
                    </label>
                  )}
                  {renderField(field, value, onChange, onAction)}
                </>
              )}

              {field.helper && (
                <div style={styles.helper}>{field.helper}</div>
              )}

              {error && (
                <div style={styles.error}>{error}</div>
              )}

            </div>
          );
        })}
      </div>
    );
  })}
</div>


          {/* ================= FOOTER ================= */}
          {children && <div style={styles.footer}>{children}</div>}

        </div>
      </div>
    </div>
  );
}



function renderField(field, value, onChange, onAction) {
  switch (field.type) {
    case "input":
      return (
        <input
          style={styles.input}
          value={value || ""}
          onChange={e => onChange(field.name, e.target.value)}
        />
      );

    case "textarea":
      return (
        <textarea
          style={styles.textarea}
          value={value || ""}
          onChange={e => onChange(field.name, e.target.value)}
        />
      );

    case "single-select":
      return (
        <select
          style={styles.select}
          value={value ?? ""}
          onChange={e => onChange(field.name, e.target.value)}
        >
          <option value="">Select</option>
          {(field.options || []).map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "radio":
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div /> 
          <div style={styles.inlineGroup}>
            {(field.options || []).map(opt => (
              <label key={opt.value} style={styles.inlineItem}>
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

    case "checkbox-group":
      return (
        <div style={styles.inlineGroup}>
          {(field.options || []).map(opt => (
            <label key={opt.value} style={styles.inlineItem}>
              <input
                type="checkbox"
                checked={(value || []).includes(opt.value)}
                onChange={() => {
                  const next = value?.includes(opt.value)
                    ? value.filter(v => v !== opt.value)
                    : [...(value || []), opt.value];
                  onChange(field.name, next);
                }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      );

    case "button":
      return (
        <button
          style={styles.btnOutline}
          onClick={() => onAction?.(field.action)}
        >
          {field.label}
        </button>
      );

    default:
      return null;
  }
}


function validateField(value, rules) {
  if (!rules) return null;
  if (rules.required && !value) {
    return rules.message || "This field is required";
  }
  return null;
}


const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Inter, system-ui"
  },

  content: {
    display: "flex",
    justifyContent: "center"
  },

  card: {
    width: "90%",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 4px 14px rgba(15,23,42,0.04)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20
  },

  title: {
    fontSize: 20,
    fontWeight: 700
  },

  subtitle: {
    fontSize: 13,
    color: "#6b7280"
  },

  actions: {
    display: "flex",
    gap: 8
  },

  mstBtn: {
    background: "#fff",
    border: "1.5px solid #111827",
    padding: "8px 14px",
    borderRadius: 999,
    fontWeight: 600,
    cursor: "pointer"
  },

  body: {
    marginTop: 10
  },

  sectionCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    background: "#fafafa"
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12
  },

  field: {
    marginBottom: 18
  },

  label: {
    fontWeight: 600,
    marginBottom: 6,
    display: "block"
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db"
  },

  textarea: {
    width: "100%",
    minHeight: 90,
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db"
  },

  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db"
  },

  inlineGroup: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap"
  },
  radiofield: {
    marginBottom: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },

  radioRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    gap: 20
  },

  radioLabel: {
    fontWeight: 600,
    fontSize: 15,
    color: "#0F172A"
  },


  inlineItem: {
    display: "flex",
    gap: 6,
    alignItems: "center"
  },

  helper: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4
  },

  error: {
    fontSize: 12,
    color: "#dc2626",
    marginTop: 4
  },

  btnOutline: {
    padding: "8px 14px",
    borderRadius: 999,
    border: "1.5px solid #111827",
    background: "#fff",
    fontWeight: 600,
    cursor: "pointer"
  },

  footer: {
    marginTop: 20
  }
};
