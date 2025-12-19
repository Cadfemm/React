import React from "react";

export default function CommonFormBuilder({
  schema,
  values,
  onChange,
  submitted,
  onAction,
  children
}) {
  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <div style={styles.card}>

          {/* ================= HEADER ================= */}
          <div style={styles.header}>
            <div>
              <div style={styles.title}>{schema.title}</div>
              {schema.subtitle && (
                <div style={styles.subtitle}>{schema.subtitle}</div>
              )}
            </div>

            {schema.actions && schema.actions.length > 0 && (
              <div style={styles.actions}>
                {schema.actions.map((action) => (
                  <button
                    key={action.type}
                    style={styles.mstBtn}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#2563eb";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.borderColor = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#ffffff";
                      e.currentTarget.style.color = "#111827";
                      e.currentTarget.style.borderColor = "#111827";
                    }}
                    onClick={() => onAction?.(action.type)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>

            )}
          </div>

          {/* ================= BODY ================= */}
          <div style={styles.body}>
            {schema.fields.map((field) => {
              const value = values[field.name];
              const error = submitted
                ? validateField(value, field.validation)
                : null;

              return (
                <div key={field.name} style={styles.field}>
                  <label style={styles.label}>
                    {field.label}
                  </label>

                  {renderField(field, value, onChange)}

                  {field.helper && (
                    <div style={styles.helper}>
                      {field.helper}
                    </div>
                  )}

                  {error && (
                    <div style={styles.error}>
                      {error}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ================= FOOTER ================= */}
          {children && (
            <div style={styles.footer}>
              {children}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ================= FIELD RENDERER ================= */

function renderField(field, value, onChange) {
  switch (field.type) {
    case "single-select":
      return (
        <select
          style={styles.select}
          value={value ?? ""}

          onChange={(e) =>
            onChange(field.name, e.target.value)
          }
        >
          <option value="">Select</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "input":
      return (
        <input
          style={styles.input}
          value={value || ""}
          onChange={(e) =>
            onChange(field.name, e.target.value)
          }
        />
      );

    case "textarea":
      return (
        <textarea
          style={styles.textarea}
          value={value || ""}
          onChange={(e) =>
            onChange(field.name, e.target.value)
          }
        />
      );

    default:
      return null;
  }
}

/* ================= VALIDATION ================= */

function validateField(value, rules) {
  if (!rules) return null;
  if (rules.required && !value) {
    return rules.message || "This field is required";
  }
  return null;
}

/* ================= HOSPITAL UI STYLES ================= */

const styles = {
  /* PAGE = content area only (sidebar excluded by layout) */
  page: {
    minHeight: "100vh",
    fontFamily: "Inter, system-ui",
    // padding: "24px 0"
  },

  /* Centers card */
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },

  /* MAIN CARD */
  card: {
    width: "100%",                 // ✅ 90% as requested
    background: "#ffffff",
    border: "1px solid #e6e9ee",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 4px 14px rgba(15,23,42,0.03)"
  },

  /* HEADER */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20
  },

  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a"
  },

  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4
  },

  /* ACTION BUTTONS */
  actions: {
    display: "flex",
    gap: 8
  },

  btnPrimary: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer"
  },

  btnOutline: {
    background: "#fff",
    color: "#111827",
    border: "1px solid #111827",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer"
  },

  /* BODY */
  body: {
    marginTop: 12
  },

  field: {
    marginBottom: 18
  },

  label: {
    fontSize: "15px",
    fontWeight: 600,
    marginBottom: "6px",
    color: "#0F172A",
    display: "block"
  },

  helper: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14
  },
  mstBtn: {
    background: "#ffffff",
    color: "#111827",
    border: "1.5px solid #111827",
    padding: "8px 14px",
    borderRadius: 999,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },


  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
    background: "#fff"
  },

  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
    minHeight: 90
  },

  error: {
    fontSize: 12,
    color: "#dc2626",
    marginTop: 4
  },

  footer: {
    marginTop: 20
  }
};
