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

                    if (field.showIf) {
                      const depVal = values[field.showIf.field];

                      // equals (works for single-select / radio)
                      if ("equals" in field.showIf) {
                        if (Array.isArray(depVal)) {
                          if (!depVal.includes(field.showIf.equals)) return null;
                        } else {
                          if (depVal !== field.showIf.equals) return null;
                        }
                      }

                      // includes (works for multi-select / checkbox-group)
                      if ("includes" in field.showIf) {
                        if (!Array.isArray(depVal) || !depVal.includes(field.showIf.includes)) {
                          return null;
                        }
                      }

                      // exists
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

                        {/* RADIO stays special (side layout) */}
                        {field.type === "radio" && !field.inRow ? (
                          <div style={styles.radioRow}>
                            <div style={styles.radioLabel}>{field.label}</div>
                            {renderField(field, value, onChange, onAction, values)}
                          </div>
                        ) : field.type === "subheading" ? (

                          renderField(field)
                        ) : (
                          /* ✅ NORMAL FIELDS → LABEL ON TOP */
                          <div style={{ marginBottom: 16 }}>

                            {field.label && field.type !== "inline-input" && (
                              <label
                                style={{
                                  display: "block",
                                  fontWeight: 600,
                                  marginBottom: 6
                                }}
                              >
                                {field.label}
                              </label>
                            )}

                            {renderField(field, value, onChange, onAction, values)}

                            {field.helper && (
                              <div
                                style={{
                                  fontSize: 12,
                                  color: "#6b7280",
                                  marginTop: 4
                                }}
                              >
                                {field.helper}
                              </div>
                            )}

                          </div>
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

function MultiSelectDropdown({ field, value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleValue = (val) => {
    const next = value.includes(val)
      ? value.filter(v => v !== val)
      : [...value, val];
    onChange(field.name, next);
  };

  const selectedLabels =
    value.length === 0
      ? "Select"
      : field.options
        .filter(o => value.includes(o.value))
        .map(o => o.label)
        .join(", ");

  return (
    <div ref={ref} style={styles.multiSelectWrap}>
      <div
        style={styles.multiSelectControl}
        onClick={() => setOpen(o => !o)}
      >
        <span style={{ color: value.length ? "#111827" : "#9ca3af" }}>
          {selectedLabels}
        </span>
        <span style={styles.caret}>▾</span>
      </div>

      {open && (
        <div style={styles.multiSelectMenu}>
          {field.options.map(opt => (
            <label key={opt.value} style={styles.multiSelectItem}>
              <input
                type="checkbox"
                checked={value.includes(opt.value)}
                onChange={() => toggleValue(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}


function renderField(field, value, onChange, onAction, values) {
  switch (field.type) {
    case "input":
      return (
        <input
          style={styles.input}
          value={value || ""}
          onChange={e => onChange(field.name, e.target.value)}
        />
      );
    case "milestone-grid":
      return (
        <div>
          <div style={styles.subheading}>{field.heading}</div>

          {field.rows.map((row, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: row.right ? "1fr 1fr" : "1fr",
                gap: 24,
                marginBottom: 16
              }}
            >
              {/* LEFT */}
              <div>
                <div style={styles.milestoneLabel}>{row.left.label}</div>
                <input
                  style={styles.input}
                  value={values[row.left.name] || ""}
                  placeholder={row.left.placeholder}
                  onChange={e =>
                    onChange(row.left.name, e.target.value)
                  }
                />
              </div>

              {/* RIGHT (only if present) */}
              {row.right && (
                <div>
                  <div style={styles.milestoneLabel}>{row.right.label}</div>
                  <input
                    style={styles.input}
                    value={values[row.right.name] || ""}
                    placeholder={row.right.placeholder}
                    onChange={e =>
                      onChange(row.right.name, e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      );


    case "multi-select-details": {
      const selected = values[field.sourceField] || [];

      if (!Array.isArray(selected) || selected.length === 0) {
        return null;
      }

      return (
        <div style={{ marginTop: 12 }}>
          {selected.map(option => (
            <div key={option} style={{ marginBottom: 14 }}>
              <label
                style={{
                  display: "block",
                  fontWeight: 600,
                  marginBottom: 6
                }}
              >
                {field.labelPrefix} {option}
              </label>

              <input
                style={styles.textarea}
                value={values[`${field.namePrefix}_${option}`] || ""}
                onChange={e =>
                  onChange(
                    `${field.namePrefix}_${option}`,
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      );
    }
    case "row":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {field.fields.map(f => {
            const v = values[f.name];
            return (
              <div key={f.name}>
                {f.label && (
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                    {f.label}
                  </label>
                )}
                {renderField(f, v, onChange, onAction)}
              </div>
            );
          })}
        </div>
      );
    case "multi-notes":
      const selected = values[field.source] || [];
      if (!selected.length) return null;

      return (
        <div style={{ display: "grid", gap: 12 }}>
          {selected.map(val => (
            <div key={val}>
              <label style={{ fontWeight: 600, display: "block", marginBottom: 4 }}>
                {val} – Notes
              </label>
              <textarea
                style={styles.textarea}
                value={(value || {})[val] || ""}
                onChange={e =>
                  onChange(field.name, {
                    ...(value || {}),
                    [val]: e.target.value
                  })
                }
              />
            </div>
          ))}
        </div>
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
        <div style={{ marginTop: 6 }}>
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
    case "subheading":
      return (
        <div style={styles.subheading}>
          {field.label}
        </div>
      );

    case "multi-select-dropdown":
      return (
        <MultiSelectDropdown
          field={field}
          value={value || []}
          onChange={onChange}
        />
      );
    case "inline-input":
      return (
        <div style={styles.inlineRow}>
          <div style={styles.inlineLabel}>{field.inlineLabel}</div>
          <input
            style={styles.inlineInput}
            value={value || ""}
            onChange={e => onChange(field.name, e.target.value)}
            placeholder={field.placeholder || ""}
          />
        </div>
      );

    case "dual-radio-row":
      return (
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 200px",
          alignItems: "center",
          gap: 16
        }}>
          <div style={{ fontWeight: 600 }}>{field.label}</div>

          {/* Right Ear */}
          <div style={styles.inlineGroup}>
            {["yes", "no"].map(v => (
              <label key={v} style={styles.inlineItem}>
                <input
                  type="radio"
                  name={field.rightName}
                  checked={value?.right === v}
                  onChange={() =>
                    onChange(field.name, { ...(value || {}), right: v })
                  }
                />
                {v === "yes" ? "Yes" : "No"}
              </label>
            ))}
          </div>

          {/* Left Ear */}
          <div style={styles.inlineGroup}>
            {["yes", "no"].map(v => (
              <label key={v} style={styles.inlineItem}>
                <input
                  type="radio"
                  name={field.leftName}
                  checked={value?.left === v}
                  onChange={() =>
                    onChange(field.name, { ...(value || {}), left: v })
                  }
                />
                {v === "yes" ? "Yes" : "No"}
              </label>
            ))}
          </div>
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
  milestoneLabel: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 6,
    color: "#0F172A"
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
    cursor: "pointer",
    color: "#111827"
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
  subheading: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 700,
    fontSize: 15,
    color: "#0F172A",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 4
  },

  multiSelectWrap: {
    position: "relative",
    width: "100%"
  },

  multiSelectControl: {
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "10px 12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff"
  },

  caret: {
    fontSize: 12,
    color: "#6b7280"
  },

  multiSelectMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    zIndex: 20,
    background: "#fff",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    marginTop: 4,
    maxHeight: 220,
    overflowY: "auto",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
  },
  inlineRow: {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    alignItems: "center",
    gap: 12,
    marginBottom: 12
  },

  inlineLabel: {
    fontWeight: 500,
    color: "#111827"
  },

  inlineInput: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db"
  },



  multiSelectItem: {
    display: "flex",
    gap: 8,
    padding: "8px 12px",
    cursor: "pointer",
    alignItems: "center"
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
